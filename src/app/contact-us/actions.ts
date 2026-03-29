'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isValidAdminLogin } from '@/lib/admin-auth';

export async function login(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email === 'string' && typeof password === 'string' && isValidAdminLogin(email, password)) {
        cookies().set('admin_session', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        redirect('/admin');
    } else {
        redirect('/admin/login?error=Invalid credentials');
    }
}

export async function logout() {
    cookies().delete('admin_session');
    redirect('/admin/login');
}
