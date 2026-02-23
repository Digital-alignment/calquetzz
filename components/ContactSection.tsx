
import React, { useState } from 'react';
import { Mail, Send, Github, MapPin, MessageSquare, CheckCircle } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      <header className="text-center space-y-4 font-lexend">
        <div className="inline-flex p-4 bg-emerald-900/20 rounded-full border border-emerald-500/20 mb-4">
          <Mail className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-4xl font-black text-emerald-100 uppercase tracking-widest">Contacto</h2>
        <p className="text-emerald-700 font-semibold uppercase tracking-tighter">¿Tienes dudas o deseas profundizar en tu lectura?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-[#2a2a24] stone-texture rounded-3xl p-8 border border-emerald-900/20 space-y-10">
            <h3 className="text-xl font-black text-white uppercase tracking-widest font-lexend">Hablemos</h3>
            
            <div className="space-y-6">
              <ContactInfoItem 
                icon={<MessageSquare className="w-6 h-6 text-emerald-500" />}
                title="Soporte Espiritual"
                desc="consultas@oraculomaya.art"
              />
              <ContactInfoItem 
                icon={<Github className="w-6 h-6 text-emerald-500" />}
                title="Desarrollo Open Source"
                desc="github.com/Digital-alignment/quetzal"
              />
              <ContactInfoItem 
                icon={<MapPin className="w-6 h-6 text-emerald-500" />}
                title="Ubicación"
                desc="Mesoamérica — Corazón del Mundo"
              />
            </div>

            <div className="p-6 bg-[#151510] rounded-2xl border border-emerald-900/30">
               <p className="text-xs text-gray-500 italic leading-relaxed font-normal">
                 "Agradecemos cualquier feedback técnico o corrección histórica sobre los cálculos presentados."
               </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#2a2a24] stone-texture rounded-3xl p-8 border border-emerald-900/20 shadow-2xl relative overflow-hidden">
          {submitted ? (
            <div className="py-20 text-center space-y-6 animate-in zoom-in-95 duration-500">
               <div className="w-20 h-20 bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                 <CheckCircle className="w-10 h-10 text-emerald-400" />
               </div>
               <div className="space-y-2">
                 <h4 className="text-2xl font-black text-white uppercase tracking-widest font-lexend">Mensaje Enviado</h4>
                 <p className="text-emerald-600 font-semibold uppercase text-xs tracking-widest">Agradecemos tu interés. Te contactaremos pronto.</p>
               </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest font-lexend ml-1">Tu Nombre</label>
                <input 
                  required
                  type="text"
                  className="w-full bg-[#151510] border border-emerald-900/50 rounded-2xl px-6 py-4 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-semibold"
                  placeholder="Ej: B'alam Q'uq'"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest font-lexend ml-1">Correo Electrónico</label>
                <input 
                  required
                  type="email"
                  className="w-full bg-[#151510] border border-emerald-900/50 rounded-2xl px-6 py-4 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-semibold"
                  placeholder="tu@esencia.com"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest font-lexend ml-1">Tu Mensaje</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-[#151510] border border-emerald-900/50 rounded-2xl px-6 py-4 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-semibold resize-none"
                  placeholder="Cuéntanos tus dudas..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-4 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-all shadow-xl shadow-emerald-900/40 font-black uppercase tracking-[0.2em] font-lexend group"
              >
                Enviar Ofrenda
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const ContactInfoItem: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4 group">
    <div className="p-3 bg-[#151510] rounded-xl border border-emerald-900/30 group-hover:border-emerald-500/30 transition-colors">
      {icon}
    </div>
    <div>
      <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em] font-lexend">{title}</h4>
      <p className="text-emerald-100 font-semibold truncate max-w-[200px]">{desc}</p>
    </div>
  </div>
);

export default ContactSection;
