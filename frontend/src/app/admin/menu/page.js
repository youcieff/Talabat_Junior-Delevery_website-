"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter, Trash2, Edit3, ChevronDown, UtensilsCrossed, X, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "@/context/I18nContext";
import api from "@/utils/api";
import ImageUpload from "@/components/ImageUpload";

export default function AdminMenu() {
  const { t, lang } = useTranslation();
  
  const [items, setItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResFilter, setSelectedResFilter] = useState("all");

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", restaurant: "" });
  const [catSubmitting, setCatSubmitting] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    restaurant: "",
    category: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Fetch categories when restaurant is selected in Modal
  useEffect(() => {
    if (newItem.restaurant) {
      fetchCategories(newItem.restaurant);
    }
  }, [newItem.restaurant]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [resItems, resRestaurants] = await Promise.all([
        api.get("/menu-items"),
        api.get("/restaurants")
      ]);
      setItems(resItems.data.data || []);
      setRestaurants(resRestaurants.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(lang === 'ar' ? "فشل تحميل البيانات." : "Failed to load data.");
      setLoading(false);
    }
  };

  const fetchCategories = async (resId) => {
    try {
      const res = await api.get(`/categories/restaurant/${resId}`);
      setCategories(res.data.data || []);
    } catch (err) {
      console.error("Categories fetch error:", err);
    }
  };

  const handleCreateItem = async (e) => {
    e.preventDefault();
    if (!newItem.category || !newItem.restaurant) {
      alert("Please select a Restaurant and a Category");
      return;
    }
    try {
      setSubmitting(true);
      await api.post("/menu-items", newItem);
      setShowAddModal(false);
      setNewItem({ name: "", description: "", price: "", image: "", restaurant: "", category: "" });
      fetchInitialData();
    } catch (err) {
      console.error("Create error:", err);
      setError(lang === 'ar' ? "فشل إضافة الوجبة." : "Failed to add item.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/menu-items/${id}`);
      fetchInitialData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCat.restaurant) return;
    try {
      setCatSubmitting(true);
      await api.post("/categories", newCat);
      setNewCat({ ...newCat, name: "" });
      fetchCategories(newCat.restaurant);
    } catch (err) {
      console.error("Cat create error:", err);
    } finally {
      setCatSubmitting(false);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRes = selectedResFilter === "all" || item.restaurant?._id === selectedResFilter;
    return matchesSearch && matchesRes;
  });

  if (loading && items.length === 0) return (
    <div className="min-h-screen flex items-center justify-center">
       <Loader2 size={48} className="text-cyber-cyan animate-spin" />
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">
            {t("admin_menu_title")}
          </h1>
          <p className="text-white/40 text-lg italic border-l-4 border-cyber-cyan pl-6">
            {t("admin_menu_subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowCategoryModal(true)}
            className="px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-3 italic"
          >
            <Filter size={18} className="text-cyber-cyan" />
            {lang === 'ar' ? 'إدارة التصنيفات' : 'Categories'}
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-cyber-gradient px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-neon-pink hover:scale-[1.02] transition-all shrink-0 italic shadow-xl"
          >
            <Plus size={20} className="text-white" />
            {t("btn_add_item")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="relative group">
           <select 
             onChange={(e) => setSelectedResFilter(e.target.value)}
             className="appearance-none w-full glass bg-white/5 border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-cyber-cyan font-black text-[10px] uppercase tracking-widest cursor-pointer pr-10"
           >
              <option value="all" className="bg-background">{t("label_all_restaurants")}</option>
              {restaurants.map(r => (
                <option key={r._id} value={r._id} className="bg-background">{r.name}</option>
              ))}
           </select>
           <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
         </div>
         
         <div className="relative md:col-span-2 group">
            <input 
              type="text" 
              placeholder={t("search_item_placeholder")} 
              className={`w-full glass bg-white/5 border-white/10 rounded-2xl py-5 focus:border-cyber-cyan transition-all outline-none font-medium placeholder:text-white/20 ${lang === 'ar' ? 'pr-14 pl-6' : 'pl-14 pr-6'}`}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyber-cyan transition-colors`} size={20} />
         </div>
      </div>

      <div className="glass rounded-[50px] overflow-hidden border-white/5 shadow-2xl bg-white/[0.01]">
        <div className="overflow-x-auto">
          <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <thead>
              <tr className="bg-white/[0.02] text-white/20 font-black border-b border-white/5 uppercase text-[10px] tracking-[0.3em]">
                <th className="px-10 py-6">{t("table_item")}</th>
                <th className="px-10 py-6">{t("table_restaurant")}</th>
                <th className="px-10 py-6">{t("table_amount")}</th>
                <th className="px-10 py-6">{t("table_status")}</th>
                <th className="px-10 py-6 text-center">{lang === 'ar' ? "الإجراءات" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-white/60">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={item._id} 
                    className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                  >
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform overflow-hidden">
                             {item.image && item.image !== 'no-item-photo.jpg' ? (
                               <img src={item.image.startsWith('http') ? item.image : `${api.defaults.baseURL.replace('/api', '')}${item.image}`} className="w-full h-full object-cover" />
                             ) : (
                               <span>🥤</span>
                             )}
                          </div>
                          <span className="font-black text-lg italic uppercase tracking-tight text-white">{item.name}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-cyber-cyan font-black italic text-xs uppercase tracking-tighter">
                      {item.restaurant?.name || "Unknown"}
                    </td>
                    <td className="px-10 py-8 font-black text-white italic">
                      {item.price} <span className="text-[10px] text-white/30 not-italic uppercase ml-1">{t("currency")}</span>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                        item.isAvailable 
                          ? 'text-cyber-lime bg-cyber-lime/10 border-cyber-lime/20 shadow-neon-lime' 
                          : 'text-white/20 bg-white/5 border-white/10'
                      }`}>
                        {item.isAvailable ? t("status_available") : t("status_unavailable")}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center justify-center gap-4">
                        <button className="p-3 bg-white/5 hover:bg-cyber-gradient hover:text-white rounded-2xl transition-all border border-white/5 group/edit shadow-lg">
                          <Edit3 size={18} className="text-white/40 group-hover/edit:scale-110 transition-transform" />
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(item._id)}
                          className="p-3 bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all border border-white/5 group/del shadow-lg"
                        >
                          <Trash2 size={18} className="text-white/20 group-hover/del:rotate-12 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
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
                   <h2 className="text-3xl font-black italic uppercase tracking-tighter">{t("btn_add_item")}</h2>
                   <button onClick={() => setShowAddModal(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors">
                      <X size={24} />
                   </button>
                </div>

                <form onSubmit={handleCreateItem} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Select Restaurant</label>
                         <select 
                            required
                            className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none appearance-none"
                            value={newItem.restaurant}
                            onChange={(e) => setNewItem({...newItem, restaurant: e.target.value})}
                         >
                            <option value="" className="bg-background italic">Choose Restaurant...</option>
                            {restaurants.map(r => (
                              <option key={r._id} value={r._id} className="bg-background">{r.name}</option>
                            ))}
                         </select>
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Select Category</label>
                         <select 
                            required
                            disabled={!newItem.restaurant}
                            className={`w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none appearance-none ${!newItem.restaurant ? 'opacity-50 grayscale' : ''}`}
                            value={newItem.category}
                            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                         >
                            <option value="" className="bg-background italic">Choose Category...</option>
                            {categories.map(c => (
                              <option key={c._id} value={c._id} className="bg-background">{c.name}</option>
                            ))}
                         </select>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Item Name</label>
                         <input 
                           required
                           type="text" 
                           className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none"
                           value={newItem.name}
                           onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Price ({t("currency")})</label>
                         <input 
                           required
                           type="number" 
                           className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none"
                           value={newItem.price}
                           onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                         />
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">Description</label>
                      <textarea 
                        required
                        className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-pink outline-none h-24 resize-none"
                        value={newItem.description}
                        onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                      />
                   </div>

                   <ImageUpload 
                     onUploadSuccess={(url) => setNewItem({...newItem, image: url})}
                     label="Item Photo"
                   />

                   <button 
                     disabled={submitting}
                     className="w-full py-6 rounded-2xl bg-cyber-gradient font-black text-xs uppercase tracking-[0.3em] italic shadow-neon-pink hover:scale-[1.02] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                   >
                      {submitting ? <Loader2 size={18} className="animate-spin" /> : (
                         <>
                            <span>Confirm & Add Menu Item</span>
                            <Plus size={18} />
                         </>
                      )}
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Category Modal */}
      <AnimatePresence>
        {showCategoryModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowCategoryModal(false)}
               className="absolute inset-0 bg-black/80 backdrop-blur-md"
             />
             <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="glass w-full max-w-xl p-10 rounded-[50px] relative z-10 border-white/10"
             >
                <div className="flex items-center justify-between mb-10">
                   <h2 className="text-3xl font-black italic uppercase tracking-tighter">Manage Categories</h2>
                   <button onClick={() => setShowCategoryModal(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors">
                      <X size={24} />
                   </button>
                </div>

                <div className="space-y-8">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-6">1. Select Restaurant</label>
                      <select 
                        className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-cyan outline-none appearance-none"
                        value={newCat.restaurant}
                        onChange={(e) => {
                          setNewCat({...newCat, restaurant: e.target.value});
                          fetchCategories(e.target.value);
                        }}
                      >
                         <option value="" className="bg-background italic">Choose Restaurant...</option>
                         {restaurants.map(r => (
                           <option key={r._id} value={r._id} className="bg-background">{r.name}</option>
                         ))}
                      </select>
                   </div>

                   {newCat.restaurant && (
                     <>
                        <form onSubmit={handleCreateCategory} className="flex gap-4">
                           <input 
                             required
                             type="text" 
                             placeholder="New Category Name (e.g. Desserts)"
                             className="flex-1 glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 focus:border-cyber-pink outline-none"
                             value={newCat.name}
                             onChange={(e) => setNewCat({...newCat, name: e.target.value})}
                           />
                           <button 
                             disabled={catSubmitting}
                             className="bg-cyber-gradient px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-neon-pink disabled:opacity-50"
                           >
                             {catSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Add"}
                           </button>
                        </form>

                        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                           <p className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-4">Existing Categories:</p>
                           <div className="flex flex-wrap gap-3">
                              {categories.length === 0 ? (
                                <p className="text-white/40 italic text-xs">No categories yet.</p>
                              ) : categories.map(cat => (
                                <div key={cat._id} className="glass px-4 py-2 rounded-xl text-xs font-bold border-white/5 bg-white/5 flex items-center gap-3">
                                   <span>{cat.name}</span>
                                </div>
                              ))}
                           </div>
                        </div>
                     </>
                   )}
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
