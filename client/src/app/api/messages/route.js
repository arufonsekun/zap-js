import { NextResponse } from 'next/server';

export async function GET(request, context) {
    const url = new URL(request.url)
    const senderId = url.searchParams.get("senderId")
    const recipientId = url.searchParams.get("recipientId")

    const response = await fetch(`http://localhost:5000/api/v1/messages?senderId=${senderId}&recipientId=${recipientId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const users = await response.json();

    return NextResponse.json(users, { status: response.status });
}

export async function POST(request, context) {

    const body = await request.json();

    const response = await fetch('http://localhost:5000/api/v1/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const message = await response.json();

    return NextResponse.json(message, { status: response.status });
}
