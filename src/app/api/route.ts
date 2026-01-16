import { NextResponse, NextRequest } from "next/server"

/**
 * Health check route for the API
 * @returns a JSON message indicating the API server is running
 */

export async function GET(request: NextRequest) {
    return NextResponse.json({message:"API Running on Port 3000"})
}