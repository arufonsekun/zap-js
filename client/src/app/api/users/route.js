import { NextResponse } from 'next/server';

export async function GET(request, context) {

    const response = await fetch('http://localhost:5000/api/v1/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const users = await response.json();

    return NextResponse.json(users, { status: response.status });
}
