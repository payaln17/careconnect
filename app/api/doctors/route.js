import connectDB from "@/lib/mongodb";
import Doctor from "@/models/Doctor";

export async function GET() {
  try {
    await connectDB();

    const doctors = await Doctor.find({
      isApproved: true,
    })
      .select("-__v")
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error("Get Doctors Error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to fetch doctors",
      },
      { status: 500 }
    );
  }
}