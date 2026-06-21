"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Package, Clock, CheckCircle, ChevronRight, MapPin, Search, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/I18nContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import api from "@/utils/api";

export default function MyOrdersPage() {
  const { user } = useAuth();
  const { t, lang } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders"); 
      setOrders(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Orders fetch error:", err);
      // Fail gracefully if endpoint doesn't exist yet, show empty/error
      setError(lang === 'ar' ? "فشل تحميل طلباتك." : "Failed to load your orders.");
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
       <Loader2 size={48} className="text-cyber-cyan animate-spin" />
    </div>
  );

  if (!user) return (
    <div className="container mx-auto px-4 py-32 text-center">
       <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-8">{lang === 'ar' ? 'سجل دخولك لمشاهدة طلباتك' : 'Login to view your orders'}</h1>
       <Link href="/login" className="px-10 py-4 rounded-2xl bg-cyber-gradient font-black uppercase tracking-widest shadow-neon-pink">
          {t("nav_login")}
       </Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-20 min-h-[90vh]">
      <div className="mb-12">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">
          {t("orders_title")}
        </h1>
        <p className="text-white/40 text-lg leading-relaxed max-w-2xl italic border-r-4 border-cyber-pink pr-6">
          {t("orders_subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {orders.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass p-8 rounded-[40px] border-white/5 group hover:border-cyber-cyan/30 transition-all flex items-center gap-8 relative overflow-hidden"
              >
                 <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyber-cyan/5 rounded-full blur-[40px]"></div>
                 
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                  {(order.restaurant?.name || "").includes("Burger") ? "🍔" : "🍕"}
                </div>
                
                <div className="flex-1 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-2xl italic uppercase tracking-tight text-white group-hover:text-cyber-cyan transition-colors">
                      {order.restaurant?.name || (lang === 'ar' ? 'مطعم' : 'Restaurant')}
                    </h3>
                    <span className="text-[10px] font-black text-white/20 tracking-widest uppercase">#{order._id.slice(-8)}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-6">
                     <div className="flex items-center gap-2"><Package size={14} className="text-cyber-cyan" /> {order.items?.length || 0} {t("label_items")}</div>
                     <div className="flex items-center gap-2"><Clock size={14} className="text-cyber-pink" /> 
                        {new Date(order.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                     </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      order.status === 'delivered' 
                        ? 'bg-cyber-lime/10 text-cyber-lime shadow-neon-lime border border-cyber-lime/20' 
                        : 'bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-neon-amber'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${order.status === 'delivered' ? 'bg-cyber-lime' : 'bg-amber-500'}`}></div>
                      {t(`status_${order.status}`)}
                    </div>
                    <span className="font-black text-2xl text-white italic tracking-tighter">
                      {order.totalAmount} <span className="text-[10px] text-white/40 not-italic uppercase">{t("currency")}</span>
                    </span>
                  </div>
                </div>
                
                <div className={`p-3 rounded-2xl bg-white/5 text-white/20 group-hover:bg-cyber-gradient group-hover:text-white transition-all ${lang === 'ar' ? 'rotate-180' : ''}`}>
                   <ChevronRight size={20} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {orders.length === 0 && (
            <div className="glass p-24 rounded-[50px] text-center border-dashed border-white/10">
               <Package className="mx-auto text-white/5 mb-8 animate-bounce" size={64} />
               <p className="text-2xl font-black text-white/20 uppercase italic tracking-tighter mb-8">{t("no_orders")}</p>
               <Link href="/restaurants" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyber-gradient font-black uppercase tracking-widest shadow-neon-pink hover:scale-105 transition-all text-sm">
                 {t("btn_order_now")}
               </Link>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-32 h-fit">
           <div className="glass p-10 rounded-[48px] border-white/10 relative overflow-hidden">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyber-pink/5 rounded-full blur-[80px]"></div>
              
              <h3 className="font-black text-xs uppercase tracking-[0.3em] mb-10 text-cyber-cyan flex items-center gap-3">
                <MapPin size={18} className="animate-pulse" />
                {t("label_address")}
              </h3>
              
              <div className="space-y-6 mb-10">
                <p className="text-sm text-white/60 font-bold leading-relaxed italic border-l-4 border-cyber-cyan/30 pl-6">
                  {lang === 'ar' ? 'القاهرة، مدينة نصر، شارع النصر' : 'Cairo, Nasr City, Al Nasr St.'}
                  <br />
                  <span className="text-white/30 text-xs mt-2 block">{lang === 'ar' ? 'عمارة 24، الدور الرابع' : 'Bldg 24, 4th Floor'}</span>
                </p>
              </div>
              
              <button className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all font-black text-[10px] uppercase tracking-[0.2em] border border-white/5">
                {lang === 'ar' ? 'تعديل العنوان' : 'Edit Address'}
              </button>
           </div>
           
           <div className="glass mt-8 p-8 rounded-[40px] border-white/5 bg-cyber-gradient opacity-50 flex items-center justify-between">
              <div className="font-black text-[10px] uppercase tracking-widest text-white/60">
                 {lang === 'ar' ? 'دعم فني 24/7' : '24/7 Support'}
              </div>
              <button className="px-4 py-2 rounded-xl bg-white/20 text-white font-black text-[10px] uppercase hover:bg-white/30 transition-all">
                {lang === 'ar' ? 'دردشة' : 'Chat'}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
