import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// GET — Patient's appointments
export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Please login to view appointments",
        },
        { status: 401 }
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return Response.json(
        {
          success: false,
          message: "Your session has expired",
        },
        { status: 401 }
      );
    }

    if (decoded.role !== "patient") {
      return Response.json(
        {
          success: false,
          message: "Only patients can view patient appointments",
        },
        { status: 403 }
      );
    }

    const appointments = await Appointment.find({
      patientId: decoded.userId,
    })
      .populate(
        "doctorId",
        "fullName specialization qualification hospital location consultationFee profileImage rating"
      )
      .sort({ appointmentDate: 1, createdAt: -1 });

    return Response.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Get Appointments Error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to load appointments",
      },
      { status: 500 }
    );
  }
}


// POST — Create appointment
export async function POST(request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Please login to book an appointment",
        },
        { status: 401 }
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return Response.json(
        {
          success: false,
          message: "Your session has expired. Please login again.",
        },
        { status: 401 }
      );
    }

    if (decoded.role !== "patient") {
      return Response.json(
        {
          success: false,
          message: "Only patients can book appointments",
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    const {
      doctorId,
      appointmentDate,
      appointmentTime,
      reason,
    } = body;

    if (
      !doctorId ||
      !appointmentDate ||
      !appointmentTime ||
      !reason?.trim()
    ) {
      return Response.json(
        {
          success: false,
          message: "All appointment details are required",
        },
        { status: 400 }
      );
    }

    const patient = await User.findById(decoded.userId);

    if (!patient || patient.role !== "patient") {
      return Response.json(
        {
          success: false,
          message: "Patient account not found",
        },
        { status: 404 }
      );
    }

    const doctor = await Doctor.findOne({
      _id: doctorId,
      isApproved: true,
    });

    if (!doctor) {
      return Response.json(
        {
          success: false,
          message: "Doctor not found or unavailable",
        },
        { status: 404 }
      );
    }

    const selectedDate = new Date(`${appointmentDate}T23:59:59`);
    const today = new Date();

    if (selectedDate < today) {
      return Response.json(
        {
          success: false,
          message: "Please select a future date",
        },
        { status: 400 }
      );
    }

    // Check whether doctor is available on selected day
const appointmentDay = new Date(
  `${appointmentDate}T00:00:00`
).toLocaleDateString("en-US", {
  weekday: "long",
});

if (
  doctor.availableDays?.length > 0 &&
  !doctor.availableDays.includes(appointmentDay)
) {
  return Response.json(
    {
      success: false,
      message: `${doctor.fullName} is not available on ${appointmentDay}. Please choose one of the available days.`,
      availableDays: doctor.availableDays,
    },
    { status: 400 }
  );
}

    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime,
      status: {
        $in: ["pending", "confirmed"],
      },
    });

    if (existingAppointment) {
      return Response.json(
        {
          success: false,
          message: "This time slot is already booked",
        },
        { status: 409 }
      );
    }

    const appointment = await Appointment.create({
      patientId: patient._id,
      doctorId: doctor._id,
      appointmentDate,
      appointmentTime,
      reason: reason.trim(),
      status: "pending",
    });

    return Response.json(
      {
        success: true,
        message: "Appointment booked successfully!",
        appointment: {
          id: appointment._id,
          doctorId: appointment.doctorId,
          doctorName: doctor.fullName,
          specialization: doctor.specialization,
          appointmentDate: appointment.appointmentDate,
          appointmentTime: appointment.appointmentTime,
          reason: appointment.reason,
          status: appointment.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Appointment Error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong while booking appointment",
      },
      { status: 500 }
    );
  }
}