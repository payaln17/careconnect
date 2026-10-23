import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Doctor from "@/models/Doctor";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      password,
      specialization,
      qualification,
      experience,
      consultationFee,
      hospital,
      location,
      about,
      availableDays,
      availableTime,
      profileImage,
      rating,
    } = body;

    // Required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !specialization ||
      !qualification ||
      experience === undefined ||
      consultationFee === undefined ||
      !hospital ||
      !location
    ) {
      return Response.json(
        {
          success: false,
          message: "All required fields must be provided",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check existing account
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "An account with this email already exists",
        },
        { status: 409 }
      );
    }

    // Create doctor login account
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      phone,
      email: normalizedEmail,
      password: hashedPassword,
      role: "doctor",
    });

    // Create doctor professional profile
    const doctor = await Doctor.create({
      userId: user._id,
      fullName,
      email: normalizedEmail,
      phone,
      specialization,
      qualification,
      experience,
      consultationFee,
      hospital,
      location,
      about: about || "",
      availableDays: availableDays || [],
      availableTime: availableTime || "",
      profileImage: profileImage || "",
      rating: rating || 4.8,
      isApproved: true,
    });

    return Response.json(
      {
        success: true,
        message: "Doctor created successfully",
        doctor: {
          id: doctor._id,
          userId: doctor.userId,
          fullName: doctor.fullName,
          email: doctor.email,
          specialization: doctor.specialization,
          isApproved: doctor.isApproved,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Doctor Error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong while creating doctor",
      },
      { status: 500 }
    );
  }
}