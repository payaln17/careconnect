import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// GET — Doctor's appointments
export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Please login first",
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

    if (decoded.role !== "doctor") {
      return Response.json(
        {
          success: false,
          message: "Only doctors can access this page",
        },
        { status: 403 }
      );
    }

    // Find doctor profile connected to logged-in user
    const doctor = await Doctor.findOne({
      userId: decoded.userId,
      isApproved: true,
    });

    if (!doctor) {
      return Response.json(
        {
          success: false,
          message: "Doctor profile not found",
        },
        { status: 404 }
      );
    }

    // Get appointments for this doctor
    const appointments = await Appointment.find({
      doctorId: doctor._id,
    })
      .populate(
        "patientId",
        "fullName email phone"
      )
      .sort({
        appointmentDate: 1,
        appointmentTime: 1,
      });

    return Response.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Doctor Appointments Error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to load appointments",
      },
      { status: 500 }
    );
  }
}