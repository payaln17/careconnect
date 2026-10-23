import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const emergencyKeywords = [
  "chest pain",
  "severe chest pain",
  "difficulty breathing",
  "can't breathe",
  "cannot breathe",
  "breathing difficulty",
  "unconscious",
  "fainted",
  "severe bleeding",
  "heavy bleeding",
  "severe allergic reaction",
];

const symptomRules = [
  {
    keywords: ["fever", "high temperature", "temperature"],
    advice:
      "Stay hydrated, rest, and monitor your temperature. Consider consulting a doctor if the fever is persistent or worsening.",
  },

  {
    keywords: ["weakness", "tired", "fatigue"],
    advice:
      "Rest, maintain hydration and regular meals. If weakness is severe, persistent, or associated with other concerning symptoms, consult a doctor.",
  },

  {
    keywords: ["headache", "head pain"],
    advice:
      "Rest in a quiet environment, stay hydrated and monitor the symptoms. Consider medical consultation if the headache is severe, persistent, or unusual for you.",
  },

  {
    keywords: ["cough", "cold", "runny nose", "sore throat"],
    advice:
      "Rest, stay hydrated and monitor your symptoms. Consult a doctor if symptoms become severe or continue to worsen.",
  },

  {
    keywords: ["stomach pain", "abdominal pain", "stomach ache"],
    advice:
      "Take adequate rest and stay hydrated. Avoid foods that worsen the symptoms and consider a doctor consultation if pain is persistent or severe.",
  },

  {
    keywords: ["vomiting", "vomit"],
    advice:
      "Take small amounts of fluids frequently to avoid dehydration. Seek medical advice if vomiting is persistent, severe, or associated with other concerning symptoms.",
  },

  {
    keywords: ["dizziness", "dizzy"],
    advice:
      "Sit or lie down safely, hydrate yourself and avoid sudden movements. Consult a doctor if dizziness is severe, recurrent, or associated with other concerning symptoms.",
  },
];

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Please login to use Smart Health Navigator.",
        },
        { status: 401 }
      );
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return Response.json(
        {
          success: false,
          message: "Your session has expired. Please login again.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const symptoms = body.symptoms?.trim();
    const severity = body.severity;
    const duration = body.duration;

    if (!symptoms) {
      return Response.json(
        {
          success: false,
          message: "Please describe your symptoms.",
        },
        { status: 400 }
      );
    }

    const normalizedSymptoms = symptoms.toLowerCase();

    // Emergency check
    const emergencyFound = emergencyKeywords.some((keyword) =>
      normalizedSymptoms.includes(keyword)
    );

    if (emergencyFound || severity === "Severe") {
      return Response.json({
        success: true,
        priority: "Emergency",
        title: "Please seek urgent medical help",
        message:
          "Your symptoms may require urgent medical attention. Please contact emergency services or go to the nearest emergency department.",
        action: "Call emergency services",
        emergency: true,
        disclaimer:
          "This tool provides general health guidance and is not a medical diagnosis.",
      });
    }

    // Find matching symptom guidance
    const matchedRules = symptomRules.filter((rule) =>
      rule.keywords.some((keyword) =>
        normalizedSymptoms.includes(keyword)
      )
    );

    let priority = "Low";
    let title = "Monitor your symptoms";
    let action = "Monitor and take general self-care measures.";
    let message =
      "Your symptoms do not appear to indicate an immediate emergency based on the information provided.";

    if (
      severity === "Moderate" ||
      duration === "3-7 days" ||
      duration === "More than a week"
    ) {
      priority = "Moderate";
      title = "Doctor consultation recommended";
      action = "Consider booking a consultation with a doctor.";
      message =
        "Because of the severity or duration you selected, speaking with a healthcare professional would be a good next step.";
    }

    if (severity === "Mild" && duration === "Today") {
      priority = "Low";
    }

    const guidance = matchedRules.map(
      (rule) => rule.advice
    );

    if (guidance.length === 0) {
      guidance.push(
        "Monitor your symptoms and consider consulting a healthcare professional if they persist, worsen, or become concerning."
      );
    }

    return Response.json({
      success: true,
      priority,
      title,
      message,
      action,
      emergency: false,
      guidance,
      symptoms,
      severity,
      duration,
      disclaimer:
        "This tool provides general health guidance and is not a medical diagnosis.",
    });
  } catch (error) {
    console.error("Health Navigator Error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to analyze symptoms right now.",
      },
      { status: 500 }
    );
  }
}