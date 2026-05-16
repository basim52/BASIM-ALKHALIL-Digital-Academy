import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { CREDIT_PACKAGES, CreditCost, GIFT_PACKAGE, CHILDHOOD_PACKAGES, MASTER_ADMINS } from '../types';
import { 
  Wallet, 
  CreditCard, 
  History, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  Gem,
  ArrowUpRight,
  TrendingDown,
  ShieldAlert,
  Baby,
  Star,
  Zap
} from 'lucide-react';
import { auth, db, buyChildhoodSubscription } from '../lib/firebase';
import { 
  doc, 
  getDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  serverTimestamp,
  increment,
  writeBatch,
  limit
} from 'firebase/firestore';

export const CreditSystem = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [voucherCode, setVoucherCode] = useState('');
  const [redeeming, setRedeeming] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    fetchUserData();
    fetchHistory();
  }, []);

  const handleRedeem = async () => {
    if (!auth.currentUser || !voucherCode.trim()) return;
    setRedeeming(true);
    setMessage(null);

    try {
      let code = voucherCode.trim().toUpperCase();
      
      // If user provided no dashes but it's the right length (9 alpha-numeric chars after AK)
      // or 11 total chars (AK + 9), normalize it to AK-XXXX-XXXXX
      const clean = code.replace(/[^A-Z0-9]/g, '');
      if (clean.length === 11 && clean.startsWith('AK')) {
        code = `AK-${clean.substring(2, 6)}-${clean.substring(6, 11)}`;
      } else if (clean.length === 9 && !clean.startsWith('AK')) {
        code = `AK-${clean.substring(0, 4)}-${clean.substring(4, 9)}`;
      }

      const voucherRef = doc(db, 'vouchers', code);
      const voucherSnap = await getDoc(voucherRef);

      if (!voucherSnap.exists()) {
        setMessage({ type: 'error', text: t.invalidCode });
        return;
      }

      const voucherData = voucherSnap.data();
      if (voucherData.status !== 'active') {
        setMessage({ type: 'error', text: t.codeUsed });
        return;
      }

      const batch = writeBatch(db);

      // 1. Mark voucher as used
      batch.update(voucherRef, {
        status: 'used',
        usedBy: auth.currentUser.uid,
        usedAt: serverTimestamp()
      });

      // 2. Create transaction record
      const timestamp = new Date().getTime();
      const transactionId = `${auth.currentUser.uid}_redeem_${timestamp}`;
      const transRef = doc(db, 'transactions', transactionId);
      batch.set(transRef, {
        id: transactionId,
        userId: auth.currentUser.uid,
        amount: voucherData.credits,
        type: 'redeem',
        description: `تفعيل قسيمة: ${code}`,
        timestamp: serverTimestamp()
      });

      // 3. Update User Credits
      const userRef = doc(db, 'users', auth.currentUser.uid);
      batch.update(userRef, {
        credits: increment(voucherData.credits),
        lastSeen: serverTimestamp()
      });

      await batch.commit();
      setCredits(prev => prev + voucherData.credits);
      const successTemplate = t.redeemSuccess || (isRtl ? 'تم شحن {n} رصيد بنجاح' : 'Successfully redeemed {n} credits');
      setMessage({ type: 'success', text: successTemplate.replace('{n}', voucherData.credits.toString()) });
      setVoucherCode('');
    } catch (err) {
      console.error("Redeem error:", err);
      setMessage({ type: 'error', text: t.invalidVoucher });
    } finally {
      setRedeeming(false);
    }
  };

  const fetchUserData = async () => {
    if (!auth.currentUser) return;
    try {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        setCredits(userDoc.data().credits || 0);
      }
    } catch (err) {
      console.error("Error fetching credits:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    if (!auth.currentUser) return;
    try {
      const q = query(
        collection(db, 'transactions'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc'),
        limit(20)
      );
      const snap = await getDocs(q);
      setHistory(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  // Re-writing with better implementation
  const purchasePackage = async (pkg: any) => {
    if (!auth.currentUser) return;
    setBuying(pkg.id);
    
    try {
      if (pkg.dailyMinutes) {
        // Childhood subscription
        await buyChildhoodSubscription(auth.currentUser.uid, pkg);
      } else {
        // Regular credits
        const timestamp = new Date().getTime();
        const transactionId = `${auth.currentUser.uid}_${timestamp}`;
        const batch = writeBatch(db);

        // Create transaction
        const transRef = doc(db, 'transactions', transactionId);
        batch.set(transRef, {
          id: transactionId,
          userId: auth.currentUser.uid,
          amount: pkg.credits,
          type: 'purchase',
          description: `شراء ${pkg.label}`,
          timestamp: serverTimestamp()
        });

        // Update user credits
        const userRef = doc(db, 'users', auth.currentUser.uid);
        batch.update(userRef, {
          credits: increment(pkg.credits),
          lastSeen: serverTimestamp()
        });

        await batch.commit();
        setCredits(prev => prev + pkg.credits);
      }
      setMessage({ type: 'success', text: isRtl ? 'تم تفعيل الباقة بنجاح!' : 'Package activated successfully!' });
    } catch (err) {
      console.error("Purchase error:", err);
      setMessage({ type: 'error', text: isRtl ? 'حدث خطأ في عملية الشراء' : 'Purchase error occurred' });
    } finally {
      setBuying(null);
    }
  };

  const isAdmin = MASTER_ADMINS.includes(auth.currentUser?.email?.toLowerCase() || '');

  return (
    <div className={`p-4 md:p-10 max-w-7xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="mb-8 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-2 h-8 bg-[#C49E3A] rounded-full" />
              <h2 className="text-3xl md:text-4xl font-black text-[#002147]">{t.creditSystemTitle}</h2>
            </div>
            <p className="text-slate-400 mt-1 font-medium text-sm md:text-base">{t.creditDescription}</p>
          </div>
          {isAdmin ? (
            <div className="bg-[#002147] border border-[#C49E3A] rounded-2xl px-6 py-3 flex items-center gap-3 shadow-xl">
               <ShieldAlert className="text-[#C49E3A]" size={20} />
               <span className="text-xs md:text-sm font-black text-white uppercase tracking-widest">
                  {isRtl ? 'وضع الآدمن: وصول غير محدود' : 'Admin Mode: Unlimited Access'}
               </span>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-6 py-3 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-xs md:text-sm font-black text-emerald-700">{t.creditsNeverExpire}</span>
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {/* Balance Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-[#002147] to-[#003366] rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C49E3A]/10 rounded-full -mr-24 -mt-24 transition-transform duration-700 group-hover:scale-125" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-inner border border-white/20">
                  <Wallet className="text-[#C49E3A]" size={32} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest block mb-1">{t.currentBalance}</span>
                  <h3 className="text-4xl md:text-5xl font-black tabular-nums">{isAdmin ? (isRtl ? 'غير محدود' : 'Unlimited') : credits}</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <span className="text-[9px] font-black text-blue-200 uppercase tracking-widest block mb-1">Reading</span>
                  <span className="text-sm font-black">{CreditCost.READING_LESSON} Credits</span>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <span className="text-[9px] font-black text-blue-200 uppercase tracking-widest block mb-1">AI Chat</span>
                  <span className="text-sm font-black">{CreditCost.AI_CONVERSATION} Credits</span>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <span className="text-[9px] font-black text-blue-200 uppercase tracking-widest block mb-1">Video</span>
                  <span className="text-sm font-black">{CreditCost.VIDEO_LESSON} Credits</span>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <span className="text-[9px] font-black text-blue-200 uppercase tracking-widest block mb-1">Audio Story</span>
                  <span className="text-sm font-black">{CreditCost.AUDIO_STORY} Credits</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-100/50">
             <h4 className="text-lg font-black text-[#002147] mb-4 flex items-center gap-3">
               <Plus size={20} className="text-[#C49E3A]" />
               {t.redeemVoucher}
             </h4>
             
             <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                    onPaste={(e) => {
                      // Allow default paste, but normalization will happen in redeem
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleRedeem();
                      }
                    }}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="AK-XXXX-XXXX"
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 font-black text-[#002147] text-center tracking-widest placeholder:text-slate-300 placeholder:tracking-normal focus:border-[#C49E3A] focus:bg-white outline-none transition-all"
                  />
                  {redeeming && (
                    <div className="absolute inset-y-0 right-4 flex items-center">
                      <Plus className="animate-spin text-[#C49E3A]" size={20} />
                    </div>
                  )}
                </div>
               
               <button 
                onClick={handleRedeem}
                disabled={redeeming || !voucherCode}
                className="w-full bg-[#C49E3A] hover:bg-[#002147] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-100/50 transition-all disabled:opacity-50 active:scale-95"
               >
                 {t.activateCode}
               </button>

               <AnimatePresence>
                 {message && (
                   <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl text-[10px] font-bold text-center border ${message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'}`}
                   >
                     {message.text}
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>
        </div>

        {/* Purchase Packages */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl relative overflow-hidden mb-8 group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg">
                    <Gem size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">{t.giftPackage}</h3>
                    <p className="text-emerald-50 font-medium opacity-80">{isRtl ? 'احصل على دروس مجانية عبر تفعيل كود الهدية الخاص بك' : 'Get free lessons by redeeming your unique gift code'}</p>
                  </div>
               </div>
               <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-4 text-center min-w-[200px]">
                  <span className="text-[10px] font-black uppercase tracking-widest block mb-1 opacity-70">{isRtl ? 'الرصيد' : 'Value'}</span>
                  <span className="text-3xl font-black">+{GIFT_PACKAGE.credits} Credits</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CREDIT_PACKAGES.map((pkg) => (
              <motion.div 
                key={pkg.id}
                whileHover={{ y: -8 }}
                className={`bg-white rounded-[2.5rem] p-8 border-2 ${buying === pkg.id ? 'border-[#C49E3A]' : 'border-slate-50'} shadow-sm flex flex-col items-center text-center relative overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/50 transition-all`}
              >
                {pkg.id === 'pro' && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                    Best Value
                  </div>
                )}
                
                <div className={`w-20 h-20 ${pkg.id === 'starter' ? 'bg-blue-50 text-blue-600' : pkg.id === 'standard' ? 'bg-[#C49E3A]/10 text-[#C49E3A]' : 'bg-indigo-50 text-indigo-600'} rounded-3xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                  <Gem size={36} />
                </div>
                
                <h3 className="text-xl font-black text-[#002147] mb-2">{pkg.label}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-[#002147]">{pkg.credits}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Credits</span>
                </div>

                <div className="w-full bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100 group-hover:bg-white transition-colors">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{isRtl ? 'القيمة الإجمالية' : 'Total Price'}</span>
                  <span className="text-2xl font-black text-[#002147]">{pkg.priceSAR} SAR</span>
                </div>

                <button 
                  onClick={() => purchasePackage(pkg)}
                  disabled={buying !== null}
                  className="w-full bg-[#002147] hover:bg-[#C49E3A] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-900/10 disabled:opacity-50"
                >
                  {buying === pkg.id ? <Plus className="animate-spin mx-auto" /> : t.buyCredits}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Baby className="text-indigo-600" size={32} />
              <h3 className="text-3xl font-black text-[#002147]">{isRtl ? 'باقات الطفولة المبكرة' : 'Early Childhood Packages'}</h3>
            </div>
            <p className="text-slate-500 font-medium mb-8">
              {isRtl ? 'باقات تعتمد على دقائق التفاعل الصوتي اليومية مع الميكروفون المذكي.' : 'Packages based on daily voice interaction minutes via smart microphone.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CHILDHOOD_PACKAGES.map((pkg) => (
                <motion.div 
                  key={pkg.id}
                  whileHover={{ x: 8 }}
                  className="bg-white border-2 border-slate-50 rounded-[2rem] p-6 flex items-center justify-between group hover:border-indigo-100 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      pkg.id.includes('bronze') ? 'bg-orange-50 text-orange-600' :
                      pkg.id.includes('silver') ? 'bg-slate-50 text-slate-400' :
                      'bg-yellow-50 text-yellow-600'
                    }`}>
                      {pkg.dailyMinutes === 10 ? <Zap size={24} /> : pkg.dailyMinutes === 20 ? <Star size={24} /> : <Gem size={24} />}
                    </div>
                    <div>
                      <h4 className="font-black text-[#002147] text-sm md:text-base leading-tight">{pkg.label}</h4>
                      <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {pkg.dailyMinutes} {isRtl ? 'دقيقة يومياً' : 'Mins daily'} • {pkg.priceSAR} SAR
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => purchasePackage(pkg)}
                    disabled={buying !== null}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest group-hover:bg-indigo-700 transition-all disabled:opacity-50"
                  >
                    {buying === pkg.id ? '...' : (isRtl ? 'اشترك' : 'Subscribe')}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <h4 className="text-lg font-black text-[#002147] mb-6 flex items-center gap-3">
                  <History size={24} className="text-[#C49E3A]" />
                  {isRtl ? 'سجل العمليات الأخير' : 'Recent Transactions'}
                </h4>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {history.length > 0 ? history.map((h) => (
                    <div key={h.id} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 ${h.amount > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'} rounded-xl flex items-center justify-center shrink-0`}>
                            {h.amount > 0 ? <ArrowUpRight size={18} /> : <TrendingDown size={18} />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-black text-[#002147] truncate">{h.description}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                               {h.timestamp?.toDate ? h.timestamp.toDate().toLocaleDateString() : 'Just now'}
                            </p>
                          </div>
                        </div>
                        <span className={`text-sm font-black ${h.amount > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {h.amount > 0 ? '+' : ''}{h.amount}
                        </span>
                    </div>
                  )) : (
                    <div className="text-center py-10">
                       <Wallet className="mx-auto text-slate-200 mb-4" size={48} />
                       <p className="text-slate-400 font-bold">لا يوجد سجل عمليات حتى الآن</p>
                    </div>
                  )}
                </div>
             </div>

             <div className="bg-[#002147] rounded-[2.5rem] p-8 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-10 translate-y-10" />
                <div>
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <CreditCard className="text-[#C49E3A]" size={28} />
                  </div>
                  <h4 className="text-xl font-black mb-4">نظام دفع آمن وسريع</h4>
                  <p className="text-blue-100 text-sm font-medium leading-relaxed">المنصة تدعم الدفع المباشر عبر تفعيل الأكواد مسبقة الدفع. يمكنك الحصول عليها من إدارة الأكاديمية أو وكلائنا المعتمدين.</p>
                </div>
                <div className="mt-8 flex gap-3">
                   <div className="h-1 w-12 bg-[#C49E3A] rounded-full" />
                   <div className="h-1 w-4 bg-white/20 rounded-full" />
                   <div className="h-1 w-4 bg-white/20 rounded-full" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
