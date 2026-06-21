"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/utils/api";

export default function ImageUpload({ onUploadSuccess, currentImage = null, label = "Upload Image" }) {
  const [preview, setPreview] = useState(currentImage);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large (max 5MB)");
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload
    await uploadFile(file);
  };

  const uploadFile = async (file) => {
    try {
      setUploading(true);
      setError(null);
      setSuccess(false);

      const formData = new FormData();
      formData.append("image", file);

      const res = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const imageUrl = res.data.data;
        onUploadSuccess(imageUrl);
        setSuccess(true);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    setPreview(null);
    onUploadSuccess("");
    setSuccess(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-6">
        {label}
      </label>
      
      <div 
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative h-48 rounded-[32px] border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-4 group ${
          preview ? "border-cyber-cyan/50 bg-white/5" : "border-white/10 hover:border-cyber-cyan/30 bg-white/[0.02]"
        } ${uploading ? "opacity-50 cursor-wait" : ""}`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div 
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
               <img src={preview} alt="Preview" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white">{uploading ? "Uploading..." : "Change Image"}</p>
               </div>
            </motion.div>
          ) : (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                 <Upload size={24} className="text-white/20 group-hover:text-cyber-cyan transition-colors" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-tighter text-white/20">{uploading ? "Processing..." : "Select File"}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
             <Loader2 size={32} className="text-cyber-cyan animate-spin" />
          </div>
        )}

        {success && !uploading && (
           <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="absolute bottom-4 right-4 bg-cyber-lime text-black p-2 rounded-full shadow-neon-lime"
           >
              <CheckCircle2 size={16} />
           </motion.div>
        )}
      </div>

      {error && (
        <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest text-center px-4">
          {error}
        </p>
      )}

      {preview && !uploading && (
        <button 
          onClick={(e) => { e.stopPropagation(); clearImage(); }}
          className="mx-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-red-500 transition-colors"
        >
          <X size={14} />
          <span>Remove Photo</span>
        </button>
      )}
    </div>
  );
}
