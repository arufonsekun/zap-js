import { NextResponse } from 'next/server';

export async function POST(request, context) {

    const body = await request.json();
    const response = await fetch('http://localhost:5000/api/v1/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const apiResponseBody = await response.json();

    return NextResponse.json(apiResponseBody, { status: response.status });
}
