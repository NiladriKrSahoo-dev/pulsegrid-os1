'use client';
import './globals.css';
import TopBar from '@/components/dashboard/TopBar';
import ChatWidget from '@/components/chat/ChatWidget';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/data/store';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const token = useAppStore((s) => s.token);
  const connectWebSocket = useAppStore((s) => s.connectWebSocket);

  useEffect(() => {
    setMounted(true);
    if (token) connectWebSocket();
  }, [token]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-bg-primary min-h-screen flex flex-col">
        {mounted ? (
          <>
            <TopBar />
            <main className="flex-1 p-4 overflow-auto">{children}</main>
            {token && <ChatWidget />}
          </>
        ) : (
          <header className="glass border-b border-gray-700/50 px-6 py-3 shadow-lg">
            <span className="text-accent-green text-2xl font-mono font-bold">
              PULSE GRID OS
            </span>
          </header>
        )}
      </body>
    </html>
  );
}