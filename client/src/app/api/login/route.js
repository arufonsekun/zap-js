import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request, context) {

    const body = await request.json();

    const response = await fetch('http://localhost:5000/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const loginResponse = await response.json();
    if (response.ok) {
        const { token } = loginResponse;

        cookies().set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            age: 60 * 60 * 24 * 7, // uma semana)
        });
    }

    return NextResponse.json(loginResponse, { status: response.status });
}
