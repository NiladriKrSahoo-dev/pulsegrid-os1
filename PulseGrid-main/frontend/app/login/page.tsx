'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/data/store';

// Unique role cards (no duplicates)
const roleCards = [
  { role: 'patient', label: 'Patient', icon: '👤' },
  { role: 'ambulance_driver', label: 'Ambulance Driver', icon: '🚑' },
  { role: 'hospital_staff', label: 'Hospital Staff', icon: '🏥' },
  { role: 'emergency', label: 'Emergency Doctor', icon: '🚨' },
  { role: 'admin', label: 'Administrator', icon: '🔐' },
];

// Map backend roles to the correct starting route
const roleRoutes: Record<string, string> = {
  patient: '/patient',
  ambulance_driver: '/ambulance',
  hospital_staff: '/hospital',
  emergency: '/emergency',
  admin: '/admin',
};

export default function LoginPage() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAppStore((s) => s.login);

  const handleLogin = async () => {
    if (!selectedCard || !username || !password) return;
    setLoading(true);
    const success = await login(username, password);
    setLoading(false);

    if (success) {
      // After a successful login, the store contains the authenticated user
      const user = useAppStore.getState().user;
      const route = user?.role ? roleRoutes[user.role] || '/login' : '/login';
      router.push(route);
    } else {
      setError('Invalid credentials. Check admin panel for users.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
      <div className="glass p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700/50 animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center animate-pulse-green">
              <span className="text-4xl">⚡</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-accent-green font-mono tracking-wider glow-text">
            PULSE GRID OS
          </h1>
          <p className="text-text-secondary mt-2">&quot;Save Lives. Anywhere. Anytime.&quot;</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-text-secondary mb-3">
            SELECT YOUR ROLE
          </label>
          <div className="grid grid-cols-2 gap-3">
            {roleCards.map((card) => (
              <button
                key={card.role}
                onClick={() => setSelectedCard(card.role)}
                className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  selectedCard === card.role
                    ? 'border-accent-green bg-accent-green/10 shadow-lg shadow-accent-green/20'
                    : 'border-gray-700 hover:border-gray-500 bg-bg-tertiary/50'
                }`}
              >
                <div className="text-3xl mb-1">{card.icon}</div>
                <div className="font-bold text-sm">{card.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-bg-tertiary/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-bg-tertiary/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
          />
          {error && <p className="text-accent-red text-sm animate-fade-in">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading || !selectedCard || !username || !password}
            className={`w-full bg-accent-green text-black font-bold py-3 rounded-lg transition transform hover:scale-105 active:scale-95 ${
              loading ? 'opacity-70 cursor-wait' : 'hover:bg-green-400'
            }`}
          >
            {loading ? '⏳ Logging in...' : '🔓 LOGIN'}
          </button>
        </div>
        <p className="text-text-secondary text-xs text-center mt-4">
          Demo: admin / admin123 (all roles)
        </p>
      </div>
    </div>
  );
}