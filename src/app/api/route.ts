import { NextResponse, NextRequest } from "next/server"

/**
 * HEALTH CHECK route for the API
 * @returns a JSON message indicating the API server is running
 */

export async function GET(req: NextRequest) {
    try {
        // return successful healthcheck response
        return NextResponse.json({message:`API is Running on port ${process.env.PORT}`}, {status:200})
    } catch (err) {
        // handle error
        return NextResponse.json({message:err.message}, {status:400})
    }
    
}