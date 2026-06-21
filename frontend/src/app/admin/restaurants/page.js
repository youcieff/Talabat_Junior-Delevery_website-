"use client";

import { Plus, Search, MoreVertical, Edit2, Trash2, MapPin, Star, Loader2, AlertCircle, Utensils, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "@/context/I18nContext";
import api from "@/utils/api";
import ImageUpload from "@/components/ImageUpload";

export default function AdminRestaurants() {
  const { t, lang } = useTranslation();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    description: "",
    cuisine: "",
    location: "",
    image: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const res = await api.get("/restaurants");
      setRestaurants(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Restaurants fetch error:", err);
      setError(lang === 'ar' ? "فشل تحميل قائمة المطاعم." : "Failed to load restaurants.");
      setLoading(false);
    }
  };

  const handleCreateRestaurant = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.post("/restaurants", newRestaurant);
      setShowAddModal(false);
      setNewRestaurant({ name: "", description: "", cuisine: "", location: "", image: "" });
      fetchRestaurants();
    } catch (err) {
      console.error("Create error:", err);
      setError(lang === 'ar' ? "فشل إضافة المطعم. تأكد من إكمال جميع البيانات." : "Failed to add restaurant. Ensure all fields are filled.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    if (!confirm(lang === 'ar' ? "هل أنت متأكد من حذف هذا المطعم؟" : "Are you sure you want to delete this restaurant?")) return;
    try {
      await api.delete(`/restaurants/${id}`);
      fetchRestaurants();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredRestaurants = restaurants.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && restaurants.length === 0) return (
    <div className="min-h-screen flex items-center justify-center">
       <Loader2 size={48} className="text-cyber-cyan animate-spin" />
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">
            {t("admin_restaurants_title")}
          </h1>
          <p className="text-white/40 text-lg italic border-l-4 border-cyber-pink pl-6">
            {t("admin_restaurants_subtitle")}
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-cyber-gradient px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-neon-pink hover:scale-[1.02] transition-all shrink-0 italic shadow-xl"
        >
          <Plus size={20} className="text-white" />
          {t("btn_add_restaurant")}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 pb-4">
        <div className="relative flex-1 group">
          <input 
            type="text" 
            placeholder={t("search_restaurant_placeholder")} 
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

      {/* Restaurant Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredRestaurants.length === 0 ? (
          <div className="lg:col-span-2 glass p-20 rounded-[40px] text-center border-dashed border-white/10 italic text-white/20 font-black uppercase tracking-[0.3em]">
             {lang === 'ar' ? 'لا توجد مطاعم مطابقة' : 'No restaurants found'}
          </div>
        ) : (
          <AnimatePresence>
            {filteredRestaurants.map((res, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                key={res._id || res.id}
                className="glass flex items-center gap-10 p-10 rounded-[40px] border-white/5 group hover:border-cyber-cyan/30 transition-all relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/5 rounded-full blur-[30px]"></div>
                
                <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 transition-transform font-bold shadow-inner border border-white/5 overflow-hidden relative">
                   {res.image && res.image !== 'no-photo.jpg' ? (
                     <img src={res.image.startsWith('http') ? res.image : `${api.defaults.baseURL.replace('/api', '')}${res.image}`} className="w-full h-full object-cover" />
                   ) : (
                     <Utensils size={36} className="text-white/10" />
                   )}
                </div>
                
                <div className="flex-1 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-2xl group-hover:text-cyber-cyan transition-colors italic uppercase tracking-tight">
                      {res.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest mb-8">
                     <MapPin size={12} className="text-cyber-pink" />
                     <span>{res.location || (lang === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt')}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="flex-1 flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-white/5 group/edit">
                      <Edit2 size={14} className="group-hover/edit:text-cyber-cyan transition-colors" />
                      {t("btn_edit")}
                    </button>
                    <button 
                      onClick={() => handleDeleteRestaurant(res._id)}
                      className="w-14 h-14 flex items-center justify-center bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all border border-transparent hover:border-red-500/20 group/del"
                    >
                      <Trash2 size={18} className="group-hover/del:scale-110 transition-transform" />
                    </button>
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
               className="absolute inset-0 bg-black/80 backdrop-blur-md"
             />
             <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="glass w-full max-w-2xl p-10 rounded-[50px] relative z-10 border-white/10 max-h-[90vh] overflow-y-auto custom-scrollbar"
             >
                <div className="flex items-center justify-between mb-10">
                   <h2 className="text-3xl font-black italic uppercase tracking-tighter">{t("btn_add_restaurant")}</h2>
                   <button onClick={() => setShowAddModal(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors">
                      <X size={24} />
                   </button>
                </div>

                <form onSubmit={handleCreateRestaurant} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Restaurant Name</label>
                         <input 
                           required
                           type="text" 
                           className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none"
                           value={newRestaurant.name}
                           onChange={(e) => setNewRestaurant({...newRestaurant, name: e.target.value})}
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Cuisine Type</label>
                         <input 
                           required
                           type="text" 
                           placeholder="e.g. Italian, Burger"
                           className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none"
                           value={newRestaurant.cuisine}
                           onChange={(e) => setNewRestaurant({...newRestaurant, cuisine: e.target.value})}
                         />
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Description</label>
                      <textarea 
                        required
                        className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-pink outline-none h-32 resize-none"
                        value={newRestaurant.description}
                        onChange={(e) => setNewRestaurant({...newRestaurant, description: e.target.value})}
                      />
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Location</label>
                      <input 
                        required
                        type="text" 
                        className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none"
                        value={newRestaurant.location}
                        onChange={(e) => setNewRestaurant({...newRestaurant, location: e.target.value})}
                      />
                   </div>

                   <ImageUpload 
                     onUploadSuccess={(url) => setNewRestaurant({...newRestaurant, image: url})}
                     label="Restaurant Profile Photo"
                   />

                   <button 
                     disabled={submitting}
                     className="w-full py-6 rounded-2xl bg-cyber-gradient font-black text-xs uppercase tracking-[0.3em] italic shadow-neon-pink hover:scale-[1.02] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                   >
                      {submitting ? <Loader2 size={18} className="animate-spin" /> : (
                         <>
                            <span>Confirm & Add Restaurant</span>
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
