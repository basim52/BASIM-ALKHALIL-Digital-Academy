import React, { useState, useEffect, useRef } from 'react';
import { translations, Language } from '../lib/translations';
import { Send, User, MessageCircle, Sparkles } from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile } from '../types';

interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  avatar: string;
  createdAt: any;
}

export const PeerChat = ({ lang, profile }: { lang: Language, profile: UserProfile }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'global_chat'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs.reverse());
      
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const text = input;
    setInput('');

    try {
      await addDoc(collection(db, 'global_chat'), {
        text,
        userId: profile.uid,
        userName: profile.displayName,
        avatar: profile.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.displayName}`,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <MessageCircle size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#002147] tracking-tight">{isRtl ? 'غرفة التواصل الكبرى' : 'Global Creative Lounge'}</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{isRtl ? 'تواصل مع زملائك المبدعين' : 'Connect with fellow creative students'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-100">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          {isRtl ? 'متصل الآن' : 'Live Now'}
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-4 ${msg.userId === profile.uid ? 'flex-row-reverse text-right' : ''}`}
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
              <img src={msg.avatar} alt="avatar" />
            </div>
            <div className={`max-w-[70%] ${msg.userId === profile.uid ? 'items-end' : 'items-start'} flex flex-col`}>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 mx-1">
                {msg.userName}
              </span>
              <div className={`p-4 rounded-2xl text-sm font-medium shadow-sm ${
                msg.userId === profile.uid 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-[#002147] border border-slate-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-slate-100 flex items-center gap-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isRtl ? 'اكتب رسالتك لزملائك...' : 'Type a message to your peers...'}
          className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 transition-all outline-none"
        />
        <button 
          type="submit"
          disabled={!input.trim()}
          className="w-12 h-12 bg-[#002147] text-white rounded-2xl flex items-center justify-center hover:bg-black transition-all shadow-lg shadow-slate-200 disabled:opacity-30"
        >
          <Send size={20} className={isRtl ? 'rotate-180' : ''} />
        </button>
      </form>
    </div>
  );
};
