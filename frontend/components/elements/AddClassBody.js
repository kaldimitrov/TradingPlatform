'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AddClassBody() {
    const pathname = usePathname();

    useEffect(() => {
        const bodyElement = document.querySelector('body');

        if (bodyElement) {
            bodyElement.classList.remove('home-3', 'home-2');

            if (pathname === '/home-v2') {
                bodyElement.classList.add('home-2');
            } else if (pathname === '/home-v3') {
                bodyElement.classList.add('home-3');
            }

        }
    }, [pathname]);

    return null;
}
