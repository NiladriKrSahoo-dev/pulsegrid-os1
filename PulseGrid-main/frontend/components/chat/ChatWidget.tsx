'use client';
import { useState } from 'react';
import { useAppStore } from '@/lib/data/store';

export default function ChatWidget() {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const chatHistory = useAppStore(s => s.chatHistory);
  const addChatMessage = useAppStore(s => s.addChatMessage);
  const chatbotOpen = useAppStore(s => s.chatbotOpen);
  const setChatbotOpen = useAppStore(s => s.setChatbotOpen);

  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    const userMsg = { role: 'user' as const, content: input };
    addChatMessage(userMsg);
    setInput('');
    setSending(true);
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [...chatHistory, userMsg] }) });
      const data = await res.json();
      addChatMessage({ role: 'assistant', content: data.reply || 'Unable to respond.' });
    } catch { addChatMessage({ role: 'assistant', content: 'Chatbot offline.' }); }
    setSending(false);
  };

  return (
    <>
      <button onClick={() => setChatbotOpen(!chatbotOpen)} className="fixed bottom-6 right-6 w-14 h-14 bg-accent-green rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition z-50 animate-pulse-green">
        <span className="text-2xl">💬</span>
      </button>
      {chatbotOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 glass rounded-2xl shadow-2xl flex flex-col z-50 animate-slide-up">
          <div className="flex items-center justify-between p-3 border-b border-gray-700">
            <span className="font-bold text-accent-green">AI ASSISTANT</span>
            <button onClick={() => setChatbotOpen(false)} className="text-text-secondary hover:text-white">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.role === 'user' ? 'bg-accent-green/20 text-white' : 'bg-bg-tertiary text-text-primary'}`}>{msg.content}</div>
              </div>
            ))}
            {sending && <div className="text-text-secondary text-sm animate-pulse">Assistant typing...</div>}
          </div>
          <div className="p-3 border-t border-gray-700">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Ask about patients..." className="flex-1 bg-bg-tertiary border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none" />
              <button onClick={sendMessage} disabled={sending} className="bg-accent-green text-black px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-green-400 transition">SEND</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
