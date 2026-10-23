import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function PATCH(request, { params }) {
  const { id } = await params;
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
          message: "Only doctors can update appointments",
        },
        { status: 403 }
      );
    }

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

    const body = await request.json();
    const { status } = body;

    const allowedStatuses = [
      "confirmed",
      "cancelled",
      "completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return Response.json(
        {
          success: false,
          message: "Invalid appointment status",
        },
        { status: 400 }
      );
    }

    const appointment = await Appointment.findOne({
     _id: id,
      doctorId: doctor._id,
    });

    if (!appointment) {
      return Response.json(
        {
          success: false,
          message: "Appointment not found",
        },
        { status: 404 }
      );
    }

    appointment.status = status;

    await appointment.save();

    return Response.json({
      success: true,
      message: `Appointment ${status} successfully`,
      appointment,
    });
  } catch (error) {
    console.error("Update Appointment Error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to update appointment",
      },
      { status: 500 }
    );
  }
}