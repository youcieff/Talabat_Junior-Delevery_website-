"use client";

import { motion } from "framer-motion";
import { UserPlus, User, Mail, Phone, Lock, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/I18nContext";

export default function RegisterPage() {
  const { t, lang } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError(t("error_password_mismatch"));
    }
    
    setLoading(true);
    setError("");
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
    } catch (err) {
      setError(err.response?.data?.error || t("error_register"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-2xl p-10 md:p-14 rounded-[40px] border-white/5 relative overflow-hidden"
      >
        {/* Glow Decor */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyber-cyan/10 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyber-pink/10 rounded-full blur-[80px]"></div>

        <div className="text-center mb-12 relative z-10">
          <div className="w-20 h-20 bg-cyber-gradient rounded-[28px] mx-auto mb-8 flex items-center justify-center shadow-neon-cyan group">
             <UserPlus size={40} className="text-white group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
            {t("register_title_1")} <span className="text-cyber-pink">{t("register_title_2")}</span>
          </h1>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest leading-relaxed"
            >
              {error}
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-3 md:col-span-2">
            <label className={`block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ${lang === 'ar' ? 'mr-6' : 'ml-6'}`}>
              {t("placeholder_name")}
            </label>
            <div className="relative group">
              <input
                type="text"
                required
                className={`w-full glass bg-white/5 border-white/10 rounded-2xl py-5 focus:border-cyber-cyan outline-none transition-all font-medium ${lang === 'ar' ? 'pr-14 pl-6' : 'pl-14 pr-6'}`}
                placeholder="Ahmed Ali"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <User className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyber-cyan transition-colors`} size={20} />
            </div>
          </div>

          <div className="space-y-3">
            <label className={`block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ${lang === 'ar' ? 'mr-6' : 'ml-6'}`}>
              {t("placeholder_email")}
            </label>
            <div className="relative group">
              <input
                type="email"
                required
                className={`w-full glass bg-white/5 border-white/10 rounded-2xl py-5 focus:border-cyber-cyan outline-none transition-all font-medium ${lang === 'ar' ? 'pr-14 pl-6' : 'pl-14 pr-6'}`}
                placeholder="user@talabat.jr"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Mail className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyber-cyan transition-colors`} size={20} />
            </div>
          </div>

          <div className="space-y-3">
            <label className={`block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ${lang === 'ar' ? 'mr-6' : 'ml-6'}`}>
              {t("placeholder_phone")}
            </label>
            <div className="relative group">
              <input
                type="tel"
                required
                className={`w-full glass bg-white/5 border-white/10 rounded-2xl py-5 focus:border-cyber-cyan outline-none transition-all font-medium ${lang === 'ar' ? 'pr-14 pl-6' : 'pl-14 pr-6'}`}
                placeholder="+20 123 456 7890"
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <Phone className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyber-cyan transition-colors`} size={20} />
            </div>
          </div>

          <div className="space-y-3">
            <label className={`block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ${lang === 'ar' ? 'mr-6' : 'ml-6'}`}>
              {t("placeholder_password")}
            </label>
            <div className="relative group">
              <input
                type="password"
                required
                className={`w-full glass bg-white/5 border-white/10 rounded-2xl py-5 focus:border-cyber-pink outline-none transition-all font-medium ${lang === 'ar' ? 'pr-14 pl-6' : 'pl-14 pr-6'}`}
                placeholder="••••••••"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <Lock className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyber-pink transition-colors`} size={20} />
            </div>
          </div>

          <div className="space-y-3">
            <label className={`block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ${lang === 'ar' ? 'mr-6' : 'ml-6'}`}>
              {t("placeholder_confirm_password")}
            </label>
            <div className="relative group">
              <input
                type="password"
                required
                className={`w-full glass bg-white/5 border-white/10 rounded-2xl py-5 focus:border-cyber-pink outline-none transition-all font-medium ${lang === 'ar' ? 'pr-14 pl-6' : 'pl-14 pr-6'}`}
                placeholder="••••••••"
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              <Lock className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyber-pink transition-colors`} size={20} />
            </div>
          </div>



          <div className="md:col-span-2 pt-6">
            <button 
              disabled={loading}
              className="w-full py-5 rounded-2xl bg-cyber-gradient font-black text-lg shadow-neon-pink hover:scale-[1.02] transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:scale-100 uppercase italic tracking-tighter"
            >
               {loading ? <Loader2 className="animate-spin" /> : (
                 <>
                   <span>{t("btn_register")}</span>
                   {lang === 'ar' ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
                 </>
               )}
            </button>
          </div>
        </form>

        <div className="mt-12 text-center relative z-10 border-t border-white/5 pt-10">
          <p className="text-white/40 text-[11px] font-black uppercase tracking-widest leading-relaxed">
            {t("footer_have_account")}{" "}
            <Link href="/login" className="text-cyber-cyan hover:text-white transition-colors border-b border-cyber-cyan/30 pb-0.5 ml-2">
              {t("footer_login_link")}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
