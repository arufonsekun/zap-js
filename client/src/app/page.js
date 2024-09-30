'use client';
import { redirect } from 'next/navigation';
import { useAuth } from './context/AuthContext';

export default function Home(req, context) {
    const { user } = useAuth();

    if (!user) {
        return redirect('/login');
    }

    return redirect('/chat');
}
