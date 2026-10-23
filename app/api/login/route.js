import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { email, password } = body;

    // Check required fields
    if (!email || !password) {
      return Response.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return Response.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const token = jwt.sign(
  {
    userId: user._id.toString(),
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

const response = Response.json({
  success: true,
  message: "Login successful!",
  user: {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  },
});

response.headers.set(
  "Set-Cookie",
  `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax${
    process.env.NODE_ENV === "production" ? "; Secure" : ""
  }`
);

return response;
  } catch (error) {
    console.error("Login Error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong during login",
      },
      { status: 500 }
    );
  }
}