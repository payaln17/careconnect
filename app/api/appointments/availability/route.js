import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const doctorId = searchParams.get("doctorId");
    const date = searchParams.get("date");

    if (!doctorId || !date) {
      return Response.json(
        {
          success: false,
          message: "Doctor and date are required.",
        },
        { status: 400 }
      );
    }

    // Check doctor
    const doctor = await Doctor.findOne({
      _id: doctorId,
      isApproved: true,
    });

    if (!doctor) {
      return Response.json(
        {
          success: false,
          message: "Doctor not found or unavailable.",
        },
        { status: 404 }
      );
    }

    // Check selected day
    const selectedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(selectedDate.getTime())) {
      return Response.json(
        {
          success: false,
          message: "Invalid appointment date.",
        },
        { status: 400 }
      );
    }

    const dayName = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const availableDays = doctor.availableDays || [];

    if (
      availableDays.length > 0 &&
      !availableDays.includes(dayName)
    ) {
      return Response.json({
        success: true,
        available: false,
        day: dayName,
        availableDays,
        bookedSlots: [],
        message: `${doctor.fullName} is not available on ${dayName}.`,
      });
    }

    // Find already booked appointments
    const appointments = await Appointment.find({
      doctorId,
      appointmentDate: date,
      status: {
        $in: ["pending", "confirmed"],
      },
    }).select("appointmentTime");

    const bookedSlots = appointments.map(
      (appointment) => appointment.appointmentTime
    );

    return Response.json({
      success: true,
      available: true,
      day: dayName,
      availableDays,
      availableTime: doctor.availableTime || "",
      bookedSlots,
      message: "Doctor is available on this date.",
    });
  } catch (error) {
    console.error("Appointment Availability Error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to check appointment availability.",
      },
      { status: 500 }
    );
  }
}