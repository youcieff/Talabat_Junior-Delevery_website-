"use client";

import { Plus, Search, Trash2, Tag, Clock, Loader2, AlertCircle, X, Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "@/context/I18nContext";
import api from "@/utils/api";

export default function AdminOffers() {
  const { t, lang } = useTranslation();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [themeName, setThemeName] = useState("Pink");
  const [newOffer, setNewOffer] = useState({
    badge: "🔥 HOT",
    discount: "",
    titleEN: "",
    titleAR: "",
    descriptionEN: "",
    descriptionAR: "",
    code: "",
    expiresEN: "",
    expiresAR: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/offers");
      setOffers(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Offers fetch error:", err);
      setError(lang === 'ar' ? "فشل تحميل العروض." : "Failed to load offers.");
      setLoading(false);
    }
  };

  const handleCreateOffer = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      // Define visual styles based on selected theme
      let color = "from-cyber-pink/20 to-transparent";
      let border = "border-cyber-pink/30";
      let glow = "shadow-neon-pink";

      if (themeName === "Cyan") {
        color = "from-cyber-cyan/20 to-transparent";
        border = "border-cyber-cyan/30";
        glow = "shadow-neon-cyan";
      } else if (themeName === "Lime") {
        color = "from-cyber-lime/20 to-transparent";
        border = "border-cyber-lime/30";
        glow = "shadow-neon-lime";
      }

      const offerPayload = {
        badge: newOffer.badge,
        discount: newOffer.discount,
        title: {
          en: newOffer.titleEN,
          ar: newOffer.titleAR
        },
        description: {
          en: newOffer.descriptionEN,
          ar: newOffer.descriptionAR
        },
        code: newOffer.code.toUpperCase(),
        expires: {
          en: newOffer.expiresEN,
          ar: newOffer.expiresAR
        },
        color,
        border,
        glow
      };

      await api.post("/offers", offerPayload);
      setShowAddModal(false);
      
      // Reset form
      setNewOffer({
        badge: "🔥 HOT",
        discount: "",
        titleEN: "",
        titleAR: "",
        descriptionEN: "",
        descriptionAR: "",
        code: "",
        expiresEN: "",
        expiresAR: ""
      });
      setThemeName("Pink");
      
      fetchOffers();
    } catch (err) {
      console.error("Create offer error:", err);
      setError(
        err.response?.data?.error || 
        (lang === 'ar' ? "فشل إضافة العرض. تأكد من قيمة الكود الفريد." : "Failed to add offer. Ensure promo code is unique.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteOffer = async (id) => {
    if (!confirm(lang === 'ar' ? "هل أنت متأكد من حذف هذا العرض الترويجي؟" : "Are you sure you want to delete this promo offer?")) return;
    try {
      await api.delete(`/offers/${id}`);
      fetchOffers();
    } catch (err) {
      console.error("Delete error:", err);
      setError(lang === 'ar' ? "فشل حذف العرض." : "Failed to delete offer.");
    }
  };

  const filteredOffers = offers.filter(o => 
    o.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.title[lang] || o.title.en).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && offers.length === 0) return (
    <div className="min-h-screen flex items-center justify-center">
       <Loader2 size={48} className="text-cyber-cyan animate-spin" />
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">
            {lang === 'ar' ? "العروض وأكواد الخصم" : "PROMO CODES & OFFERS"}
          </h1>
          <p className="text-white/40 text-lg italic border-l-4 border-cyber-pink pl-6">
            {lang === 'ar' ? "إدارة الخصومات وقسائم الشراء الخاصة بالمنصة" : "Manage active discounts and promo coupons"}
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-cyber-gradient px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-neon-pink hover:scale-[1.02] transition-all shrink-0 italic shadow-xl"
        >
          <Plus size={20} className="text-white" />
          {lang === 'ar' ? "إضافة عرض جديد" : "ADD NEW OFFER"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 pb-4">
        <div className="relative flex-1 group">
          <input 
            type="text" 
            placeholder={lang === 'ar' ? "ابحث عن الكود أو اسم العرض..." : "Search by code or title..."} 
            className={`w-full glass bg-white/5 border-white/10 rounded-2xl py-5 focus:border-cyber-cyan transition-all outline-none font-medium placeholder:text-white/20 ${lang === 'ar' ? 'pr-14 pl-6' : 'pl-14 pr-6'}`}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyber-cyan transition-colors`} size={20} />
        </div>
      </div>

      {error && (
        <div className="glass p-6 rounded-3xl border-red-500/20 text-red-500 flex items-center gap-4 bg-red-400/5 italic font-black uppercase tracking-widest text-[10px]">
           <AlertCircle size={20} />
           {error}
        </div>
      )}

      {/* Offers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredOffers.length === 0 ? (
          <div className="lg:col-span-2 glass p-20 rounded-[40px] text-center border-dashed border-white/10 italic text-white/20 font-black uppercase tracking-[0.3em]">
             {lang === 'ar' ? 'لا توجد عروض ترويجية بعد' : 'No discount offers found'}
          </div>
        ) : (
          <AnimatePresence>
            {filteredOffers.map((offer, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                key={offer._id || offer.id}
                className="glass p-10 rounded-[40px] border-white/5 relative overflow-hidden group hover:border-cyber-cyan/30 transition-all flex flex-col justify-between"
              >
                {/* Visual styling indicators on card header */}
                <div className="flex items-start justify-between mb-6 z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest glass px-4 py-2 rounded-full border-white/10">
                    {offer.badge}
                  </span>
                  <div className="text-right">
                    <span className="text-4xl font-black text-cyber-pink italic">{offer.discount}</span>
                  </div>
                </div>

                <div className="mb-8 z-10">
                  <h3 className="font-black text-2xl text-white italic uppercase tracking-tight mb-2">
                    {offer.title[lang] || offer.title.en}
                  </h3>
                  <p className="text-white/40 text-xs font-semibold leading-relaxed">
                    {offer.description[lang] || offer.description.en}
                  </p>
                </div>

                <div className="flex flex-col gap-4 z-10">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 glass bg-white/5 rounded-2xl px-6 py-3 border border-dashed border-white/20 font-mono text-cyber-cyan font-black tracking-widest text-center text-xs">
                      {offer.code}
                    </div>
                    <button 
                      onClick={() => handleDeleteOffer(offer._id)}
                      className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all border border-transparent hover:border-red-500/20 group/del"
                      title={lang === 'ar' ? 'حذف العرض' : 'Delete Offer'}
                    >
                      <Trash2 size={16} className="group-hover/del:scale-115 transition-transform" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-white/30 text-[9px] font-bold uppercase tracking-widest">
                    <Clock size={11} className="text-cyber-cyan" />
                    <span>{offer.expires[lang] || offer.expires.en}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowAddModal(false)}
               className="absolute inset-0 bg-black/85 backdrop-blur-md"
             />
             <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="glass w-full max-w-2xl p-10 rounded-[50px] relative z-10 border-white/10 max-h-[90vh] overflow-y-auto custom-scrollbar"
             >
                <div className="flex items-center justify-between mb-10">
                   <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                     {lang === 'ar' ? "إضافة عرض ترويجي جديد" : "ADD NEW PROMO OFFER"}
                   </h2>
                   <button onClick={() => setShowAddModal(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors">
                      <X size={24} />
                   </button>
                </div>

                <form onSubmit={handleCreateOffer} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Promo Code</label>
                         <input 
                           required
                           type="text" 
                           placeholder="e.g. MEGA50"
                           className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none uppercase font-mono tracking-widest"
                           value={newOffer.code}
                           onChange={(e) => setNewOffer({...newOffer, code: e.target.value})}
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Discount Value</label>
                         <input 
                           required
                           type="text" 
                           placeholder="e.g. 50% or FREE"
                           className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none"
                           value={newOffer.discount}
                           onChange={(e) => setNewOffer({...newOffer, discount: e.target.value})}
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Badge</label>
                         <select 
                           className="w-full glass bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none appearance-none cursor-pointer"
                           value={newOffer.badge}
                           onChange={(e) => setNewOffer({...newOffer, badge: e.target.value})}
                         >
                            <option value="🔥 HOT">🔥 HOT</option>
                            <option value="⚡ FLASH">⚡ FLASH</option>
                            <option value="🎁 GIFT">🎁 GIFT</option>
                            <option value="🍕 COMBO">🍕 COMBO</option>
                         </select>
                      </div>
                      
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Theme Accent Color</label>
                         <select 
                           className="w-full glass bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none appearance-none cursor-pointer"
                           value={themeName}
                           onChange={(e) => setThemeName(e.target.value)}
                         >
                            <option value="Pink">Neon Pink</option>
                            <option value="Cyan">Neon Cyan</option>
                            <option value="Lime">Neon Lime</option>
                         </select>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Title (English)</label>
                         <input 
                           required
                           type="text" 
                           className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none"
                           value={newOffer.titleEN}
                           onChange={(e) => setNewOffer({...newOffer, titleEN: e.target.value})}
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Title (Arabic)</label>
                         <input 
                           required
                           type="text" 
                           className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none text-right"
                           value={newOffer.titleAR}
                           onChange={(e) => setNewOffer({...newOffer, titleAR: e.target.value})}
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Description (English)</label>
                         <textarea 
                           required
                           className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-pink outline-none h-24 resize-none"
                           value={newOffer.descriptionEN}
                           onChange={(e) => setNewOffer({...newOffer, descriptionEN: e.target.value})}
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Description (Arabic)</label>
                         <textarea 
                           required
                           className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-pink outline-none h-24 resize-none text-right"
                           value={newOffer.descriptionAR}
                           onChange={(e) => setNewOffer({...newOffer, descriptionAR: e.target.value})}
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Expiration Msg (English)</label>
                         <input 
                           required
                           type="text" 
                           placeholder="e.g. Expires in 3 days"
                           className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none"
                           value={newOffer.expiresEN}
                           onChange={(e) => setNewOffer({...newOffer, expiresEN: e.target.value})}
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Expiration Msg (Arabic)</label>
                         <input 
                           required
                           type="text" 
                           placeholder="مثال: ينتهي خلال 3 أيام"
                           className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none text-right"
                           value={newOffer.expiresAR}
                           onChange={(e) => setNewOffer({...newOffer, expiresAR: e.target.value})}
                         />
                      </div>
                   </div>

                   <button 
                     disabled={submitting}
                     className="w-full py-6 rounded-2xl bg-cyber-gradient font-black text-xs uppercase tracking-[0.3em] italic shadow-neon-pink hover:scale-[1.02] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                   >
                      {submitting ? <Loader2 size={18} className="animate-spin" /> : (
                         <>
                            <span>Confirm & Add Promo Coupon</span>
                            <Plus size={18} />
                         </>
                      )}
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
