import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// ── IMPORT DE L'IMAGE LOCALE ──
import usthbBg from "../../image/usthb.jpg";

/* ── Icônes ── */
const GraduationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const LoginArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function LoginPage() {
  const { login }     = useAuth();
  const navigate      = useNavigate();
  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPw,      setShowPw]      = useState(false);
  const [remember,    setRemember]    = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) { 
      setError("Veuillez remplir tous les champs."); 
      return; 
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      login(email);
      const mailStr = email.toLowerCase();

      if (mailStr.includes("chef@usthb.dz")) {
        navigate("/chef/dashboard");
      } else if (mailStr.includes("prof@usthb.dz")) {
        navigate("/prof/dashboard");
      } else if (mailStr.includes("admin@usthb.dz")) {
        navigate("/admin/dashboard");
      } else {
        navigate("/etudiant/dashboard");
      }
    }, 1400);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert("Un e-mail de réinitialisation a été envoyé à votre adresse.");
  };

  return (
    <div className="min-h-screen relative flex flex-col font-sans overflow-hidden">
      
      {/* ══ FOND AVEC IMAGE LOCALE ══ */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          backgroundImage: `url(${usthbBg})`, // <-- UTILISATION DE L'IMAGE ICI
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          filter: "blur(0px) brightness(0.55)", 
          transform: "scale(1.05)" 
        }} 
      />
      
      {/* Filtre bleu par dessus */}
      <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, rgba(13,59,116,0.72) 0%, rgba(21,101,192,0.65) 55%, rgba(13,59,116,0.72) 100%)" }} />

      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white group-hover:bg-white/30 transition-all">
            <GraduationIcon />
          </div>
          <div className="leading-tight">
            <p className="font-bold text-white text-sm drop-shadow">Faculté d'Informatique</p>
            <p className="text-xs text-blue-200 font-medium">USTHB</p>
          </div>
        </Link>
        <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium border border-white/25 hover:border-white/50 px-4 py-2 rounded-xl backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all">
          ← Retour à l'accueil
        </Link>
      </nav>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">Connexion</h1>
            <p className="text-blue-200 text-sm mt-1.5">Accédez à votre espace numérique</p>
          </div>

          <div className="rounded-3xl p-8 shadow-2xl border border-white/20" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5 tracking-wide uppercase">Adresse e-mail</label>
                <div className="relative">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></svg>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="exemple@usthb.dz" className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/40 outline-none transition-all border border-white/20 focus:border-white/60 focus:ring-2 focus:ring-white/20" style={{ background: "rgba(255,255,255,0.12)" }} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5 tracking-wide uppercase">Mot de passe</label>
                <div className="relative">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-11 py-3 rounded-xl text-sm text-white placeholder-white/40 outline-none transition-all border border-white/20 focus:border-white/60 focus:ring-2 focus:ring-white/20" style={{ background: "rgba(255,255,255,0.12)" }} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
                    <EyeIcon open={showPw} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-white/70 cursor-pointer hover:text-white transition-colors">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="rounded border-white/30 bg-transparent accent-blue-400" />
                  Se souvenir de moi
                </label>
                
                <button onClick={handleForgotPassword} type="button" className="text-blue-300 hover:text-white transition-colors font-medium">
                  Mot de passe oublié ?
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-500/20 border border-red-400/40 text-red-200 rounded-xl px-4 py-3 text-xs backdrop-blur-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white text-sm font-bold transition-all active:scale-95 shadow-lg mt-2" style={{ background: loading ? "rgba(21,101,192,0.5)" : "linear-gradient(135deg, #1565c0 0%, #0d3b74 100%)", boxShadow: loading ? "none" : "0 4px 20px rgba(13,59,116,0.5)" }}>
                {loading ? (
                  <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Connexion en cours…</>
                ) : (
                  <>Se connecter <LoginArrow /></>
                )}
              </button>
            </form>
          </div>
          <p className="text-center text-xs text-white/40 mt-6">© {new Date().getFullYear()} USTHB — Faculté d'Informatique</p>
        </div>
      </div>
    </div>
  );
}