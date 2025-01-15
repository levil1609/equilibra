import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
    const cookieStore = cookies(); // Obtén el objeto Promise de cookies
    const allCookies = await cookieStore; // Resuelve el Promise para obtener las cookies

    // Obtén el token de sesión
    const sessionToken = allCookies.get('next-auth.session-token') || allCookies.get('__Secure-next-auth.session-token');

    if (!sessionToken) {
        // Redirige a la página de login si no hay sesión activa
        redirect('/login');
    }

    // Redirige al dashboard si hay sesión activa
    redirect('/dashboard');
}
