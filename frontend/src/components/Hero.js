"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Rocket, Zap, Shield, ChevronRight } from "lucide-react";
import { useTranslation } from "@/context/I18nContext";

export default function Hero() {
  const { t, lang } = useTranslation();

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyber-pink/5 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-cyber-cyan/5 rounded-full blur-[140px] animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={lang === 'ar' ? 'text-right' : 'text-left'}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border-white/5 text-cyber-cyan text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Zap size={14} className="fill-current" />
              <span>{t("hero_tagline") || "Next Generation Delivery"}</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter italic uppercase text-white">
              {t("hero_title_line1") || "Experience"} <br />
              <span className="text-cyber-gradient text-transparent bg-clip-text uppercase">{t("hero_title_line2") || "The Future"}</span>
            </h1>
            
            <p className="text-lg text-white/50 mb-12 max-w-lg leading-relaxed font-medium">
              {t("hero_subtitle")}
            </p>

            <div className={`flex flex-wrap items-center gap-6 ${lang === 'ar' ? 'justify-end' : 'justify-start'}`}>
              <button className="group px-10 py-5 rounded-2xl bg-cyber-gradient font-black text-lg hover:scale-105 transition-all flex items-center gap-3 shadow-neon-pink overflow-hidden relative">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                <span className="relative z-10">{t("btn_order_now")}</span>
                {lang === 'ar' ? <ArrowLeft size={22} className="relative z-10" /> : <ChevronRight size={22} className="relative z-10" />}
              </button>
              
              <button className="px-10 py-5 rounded-2xl glass font-black text-lg hover:bg-white/5 transition-all text-white/60 hover:text-white border-white/5">
                {t("nav_restaurants")}
              </button>
            </div>

            <div className={`mt-16 flex items-center gap-10 text-white/30 font-bold text-[10px] uppercase tracking-widest ${lang === 'ar' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-cyber-lime" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-3">
                <Rocket size={18} className="text-cyber-pink" />
                <span>Global Standards</span>
              </div>
            </div>
          </motion.div>

          {/* Visual - Cleaned up Floaties */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hidden md:block relative"
          >
            <div className="aspect-square relative flex items-center justify-center">
              {/* Decorative Rings */}
              <div className="absolute w-[90%] h-[90%] border border-white/5 rounded-full"></div>
              <div className="absolute w-full h-full border border-dashed border-white/5 rounded-full animate-[spin_60s_linear_infinite]"></div>
              
              {/* Main Content */}
              <div className="w-[75%] h-[75%] relative z-10 group">
                <div className="absolute inset-0 bg-cyber-pink/20 blur-[80px] group-hover:bg-cyber-cyan/20 transition-colors duration-500"></div>
                <div className="glass rounded-[60px] w-full h-full overflow-hidden border-white/10 flex items-center justify-center relative">
                   {/* Abstract Cyber Shape instead of Emojis */}
                   <div className="w-48 h-48 bg-cyber-gradient rounded-[40px] opacity-20 blur-2xl animate-pulse"></div>
                   <Zap size={100} className="text-white absolute text-glow-pink animate-neon" />
                </div>
              </div>

              {/* Professional Floating Labels instead of Emojis */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 right-10 glass px-6 py-3 rounded-2xl border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyber-pink animate-ping"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyber-pink">System Live</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-10 glass px-6 py-3 rounded-2xl border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyber-cyan">Verified Quality</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
