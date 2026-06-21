"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, CheckCircle, Clock, Truck, XCircle, ChevronDown, ListFilter, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "@/context/I18nContext";
import api from "@/utils/api";

export default function AdminOrders() {
  const { t, lang } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      setOrders(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Orders fetch error:", err);
      setError(lang === 'ar' ? "فشل تحميل الطلبات." : "Failed to load orders.");
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      
      // Update local state
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      setUpdatingId(null);
    } catch (err) {
      console.error("Status update error:", err);
      setUpdatingId(null);
    }
  };

  const STATUS_MAP = {
    pending: { label: t("status_pending"), color: "text-amber-500 bg-amber-500/10 shadow-neon-amber border-amber-500/20", icon: Clock },
    confirmed: { label: t("status_confirmed"), color: "text-blue-500 bg-blue-500/10 shadow-neon-blue border-blue-500/20", icon: CheckCircle },
    delivered: { label: t("status_delivered"), color: "text-cyber-lime bg-cyber-lime/10 shadow-neon-lime border-cyber-lime/20", icon: CheckCircle },
    cancelled: { label: t("status_cancelled"), color: "text-red-500 bg-red-500/10 shadow-neon-red border-red-500/20", icon: XCircle },
  };

  if (loading && orders.length === 0) return (
    <div className="min-h-screen flex items-center justify-center">
       <Loader2 size={48} className="text-cyber-cyan animate-spin" />
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">
            {t("admin_orders_title")}
          </h1>
          <p className="text-white/40 text-lg italic border-l-4 border-cyber-cyan pl-6">
            {t("admin_orders_subtitle")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-6 no-scrollbar relative z-10 font-black text-[10px] uppercase tracking-[0.2em]">
        <div className="flex items-center gap-3 glass p-2 rounded-2xl border-white/5">
           <ListFilter size={14} className="ml-4 text-cyber-cyan" />
           {["all", "pending", "confirmed", "delivered", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-8 py-3 rounded-xl transition-all ${
                filter === s 
                  ? "bg-white/10 text-white shadow-inner border border-white/10" 
                  : "text-white/30 hover:text-white"
              }`}
            >
              {s === "all" ? t("filter_all") : t(`status_${s}`)}
            </button>
           ))}
        </div>
      </div>

      {error && (
        <div className="glass p-6 rounded-3xl border-red-500/20 text-red-500 flex items-center gap-4 bg-red-400/5 italic font-black uppercase tracking-widest text-[10px]">
           <AlertCircle size={20} />
           {error}
        </div>
      )}

      <div className="glass rounded-[50px] overflow-hidden border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
          <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <thead>
              <tr className="text-white/20 text-[10px] uppercase font-black tracking-[0.3em] border-b border-white/5 bg-white/[0.02]">
                <th className="px-10 py-6">{t("table_order")}</th>
                <th className="px-10 py-6">{t("table_customer")}</th>
                <th className="px-10 py-6">{t("table_restaurant")}</th>
                <th className="px-10 py-6">{t("table_amount")}</th>
                <th className="px-10 py-6">{t("table_status")}</th>
                <th className="px-10 py-6 text-center">{lang === 'ar' ? "الإجراءات" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold">
              <AnimatePresence mode="popLayout">
                {orders.filter(o => filter === "all" || o.status === filter).map((order) => {
                  const status = STATUS_MAP[order.status] || STATUS_MAP.pending;
                  const isUpdating = updatingId === order._id;
                  
                  return (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={order._id} 
                      className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="px-10 py-8 font-black text-white italic tracking-widest text-xs uppercase">
                        #{order._id.slice(-8)}
                      </td>
                      <td className="px-10 py-8 text-white/60">
                        <div className="font-bold">{order.user?.name || (lang === 'ar' ? 'مستعمل' : 'User')}</div>
                        <div className="text-[10px] text-white/20 mt-1 uppercase tracking-widest">
                          {new Date(order.createdAt).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                        </div>
                      </td>
                      <td className="px-10 py-8 text-cyber-cyan uppercase tracking-tighter italic">
                        {order.restaurant?.name || (lang === 'ar' ? 'غير معروف' : 'Unknown')}
                      </td>
                      <td className="px-10 py-8 font-black text-white italic">
                        {order.totalAmount} <span className="text-[10px] text-white/30 not-italic uppercase ml-1">{t("currency")}</span>
                      </td>
                      <td className="px-10 py-8">
                        <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center justify-center gap-4">
                          <button 
                            className="p-3 bg-white/5 hover:bg-cyber-gradient hover:text-white rounded-2xl transition-all border border-white/5 group/eye shadow-lg"
                            title={lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                          >
                            <Eye size={18} className="text-white/40 group-hover/eye:scale-110 transition-transform" />
                          </button>
                          
                          <div className="relative group/select">
                            {isUpdating ? (
                              <div className="px-6 py-3 bg-white/5 rounded-2xl flex items-center justify-center">
                                <Loader2 size={14} className="animate-spin text-cyber-cyan" />
                              </div>
                            ) : (
                              <select 
                                value={order.status}
                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                className="appearance-none bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-cyber-cyan transition-all cursor-pointer pr-10"
                              >
                                 <option value="pending" className="bg-background">{t("status_pending")}</option>
                                 <option value="confirmed" className="bg-background">{t("status_confirmed")}</option>
                                 <option value="delivered" className="bg-background">{t("status_delivered")}</option>
                                 <option value="cancelled" className="bg-background">{t("status_cancelled")}</option>
                              </select>
                            )}
                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
