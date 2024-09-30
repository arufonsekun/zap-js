import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request, context) {
    cookies().delete('token');

    return NextResponse.json({}, { status: 200 });
}
