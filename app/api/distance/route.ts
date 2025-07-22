// app/api/distance/route.ts
import { NextResponse } from "next/server";

const GOOGLE_MAPS_SERVER_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLOUDE_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origins = searchParams.get("origins");
  const destinations = searchParams.get("destinations");

  if (!origins || !destinations) {
    return NextResponse.json(
      { message: "Missing origins or destinations parameters" },
      { status: 400 }
    );
  }

  if (!GOOGLE_MAPS_SERVER_API_KEY) {
    console.error(
      "Server-side Google Maps API Key is not defined. Please ensure GOOGLE_CLOUDE_KEY is set in your .env file and accessible on the server."
    );
    return NextResponse.json(
      { message: "Server configuration error: API Key missing." },
      { status: 500 }
    );
  }

  const encodedOrigins = encodeURIComponent(origins);
  const encodedDestinations = encodeURIComponent(destinations);

  const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigins}&destinations=${encodedDestinations}&key=${GOOGLE_MAPS_SERVER_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status !== "OK") {
      console.error(
        "Google Maps API returned non-OK status on server:",
        data.status,
        data.error_message
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(
      "Error fetching distance from Google Maps API on server:",
      error
    );
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
