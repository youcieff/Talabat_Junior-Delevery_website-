"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, ChevronRight, ChevronLeft, Chrome, Github, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/I18nContext";

function LoginForm() {
  const { t, lang } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect") || "/";
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push(redirect);
    }
  }, [user, router, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError(err.response?.data?.error || t("error_login"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-md p-10 rounded-[40px] border-white/5 relative overflow-hidden"
      >
        {/* Glow Decor */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyber-pink/10 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-cyber-cyan/10 rounded-full blur-[80px]"></div>

        <div className="text-center mb-12 relative z-10">
          <div className="w-20 h-20 bg-cyber-gradient rounded-[28px] mx-auto mb-8 flex items-center justify-center shadow-neon-pink group">
             <LogIn size={40} className="text-white group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
            {t("login_title_1")} <span className="text-cyber-cyan">{t("login_title_2")}</span>
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

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
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

          <button 
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-cyber-gradient font-black text-lg shadow-neon-pink hover:scale-[1.02] transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:scale-100 uppercase italic tracking-tighter"
          >
             {loading ? <Loader2 className="animate-spin" /> : (
               <>
                 <span>{t("btn_login")}</span>
                 {lang === 'ar' ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
               </>
             )}
          </button>
        </form>

        <div className="mt-12 text-center relative z-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-8">{lang === 'ar' ? "أو المتابعة عبر" : "Or Continue With"}</p>
          <div className="flex gap-6 justify-center">
            <button className="glass p-4 rounded-2xl hover:bg-white/10 transition-all border-white/5 text-white/60 hover:text-white">
              <Chrome size={22} />
            </button>
            <button className="glass p-4 rounded-2xl hover:bg-white/10 transition-all border-white/5 text-white/60 hover:text-white">
              <Github size={22} />
            </button>
          </div>
          
          <div className="mt-12 pt-10 border-t border-white/5">
            <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">
              {t("footer_no_account")}{" "}
              <Link href="/register" className="text-cyber-cyan hover:text-white transition-colors border-b border-cyber-cyan/30 pb-0.5 ml-2">
                {t("footer_register_link")}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[85vh] flex items-center justify-center"><div className="text-white/40">Loading...</div></div>}>
      <LoginForm />
    </Suspense>
  );
}
