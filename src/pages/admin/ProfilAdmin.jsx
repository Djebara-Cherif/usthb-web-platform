import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Ico = ({ d, size = 18, stroke = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const P = {
  user:   "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  lock:   "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  eye:    "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  eyeOff: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22",
  camera: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  id:     "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  mail2:  "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",
  phone:  "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  star2:  "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  info:   "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  check:  "M5 13l4 4L19 7",
  logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
};

const InfoCard = ({ iconPath, label, value }) => (
  <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3.5">
    <div className="text-blue-500 flex-shrink-0"><Ico d={iconPath} size={17} /></div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{label}</p>
      <p className="text-sm font-semibold text-gray-800 mt-1 leading-tight truncate">{value}</p>
    </div>
    <div className="text-gray-300 flex-shrink-0"><Ico d={P.lock} size={14} /></div>
  </div>
);

export default function ProfilAdmin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [pw,      setPw]      = useState({ current:"", next:"", confirm:"" });
  const [showPw,  setShowPw]  = useState({ current:false, next:false, confirm:false });
  const [pwDone,  setPwDone]  = useState(false);

  const handlePw  = (e) => setPw({ ...pw, [e.target.name]: e.target.value });
  const togglePw  = (f)  => setShowPw((s) => ({ ...s, [f]: !s[f] }));
  const pwValid   = pw.next.length >= 8 && pw.next === pw.confirm && pw.current.length > 0;

  const savePw = () => {
    if (!pwValid) return;
    setPwDone(true);
    setPw({ current:"", next:"", confirm:"" });
    setTimeout(() => setPwDone(false), 4000);
  };

  const PwField = ({ name, label }) => (
    <div>
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Ico d={P.lock} size={16} /></div>
        <input
          type={showPw[name] ? "text" : "password"} name={name} value={pw[name]} onChange={handlePw} placeholder="••••••••"
          className="w-full pl-11 pr-11 py-3.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <button type="button" onClick={() => togglePw(name)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
          <Ico d={showPw[name] ? P.eyeOff : P.eye} size={16} />
        </button>
      </div>
      {name === "next" && pw.next.length > 0 && pw.next.length < 8 && <p className="text-xs text-amber-500 mt-1.5 ml-1">Minimum 8 caractères.</p>}
      {name === "confirm" && pw.confirm && pw.confirm !== pw.next && <p className="text-xs text-red-500 mt-1.5 ml-1">Les mots de passe ne correspondent pas.</p>}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-10">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="h-28 relative" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 60%, #60a5fa 100%)" }} />
        <div className="px-6 pb-5">
          <div className="relative -mt-12 mb-4 inline-block">
            <div className="w-20 h-20 rounded-2xl bg-blue-700 border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold tracking-wide">{user?.initiales || "AD"}</span>
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-gray-500 hover:text-blue-600 transition">
              <Ico d={P.camera} size={13} />
            </button>
          </div>

          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">{user?.name || "Système Administrateur"}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">{user?.roleLabel || "Administrateur"}</span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-500 font-medium">ADM-2020-001</span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-500 font-medium">Faculté d'Informatique</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoCard iconPath={P.user}  label="Nom"        value="Administrateur" />
            <InfoCard iconPath={P.user}  label="Prénom"     value="Système"    />
            <InfoCard iconPath={P.id}    label="Matricule"  value="ADM-2020-001" />
            <InfoCard iconPath={P.mail2} label="Adresse e-mail" value={user?.email || "admin@usthb.dz"} />
            <InfoCard iconPath={P.phone} label="Téléphone"  value="+213 555 000 001"       />
            <InfoCard iconPath={P.star2} label="Rôle"       value={user?.roleLabel || "Administrateur"} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
            <Ico d={P.lock} size={18} stroke={2} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">Changer le mot de passe</p>
            <p className="text-xs text-gray-400 mt-0.5">Modifiez votre mot de passe de connexion</p>
          </div>
        </div>
        <div className="px-6 py-5 space-y-4">
          {pwDone ? (
            <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <Ico d={P.check} size={15} />
              </div>
              <p className="text-sm font-semibold text-emerald-700">Mot de passe modifié avec succès !</p>
            </div>
          ) : (
            <>
              <PwField name="current" label="Mot de passe actuel" />
              <PwField name="next"    label="Nouveau mot de passe" />
              <PwField name="confirm" label="Confirmer le nouveau mot de passe" />
              <button disabled={!pwValid} onClick={savePw}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: pwValid ? "linear-gradient(135deg,#1d4ed8,#3b82f6)" : "#93c5fd" }}>
                Mettre à jour le mot de passe
              </button>
            </>
          )}
        </div>
      </div>

      <button onClick={() => { logout(); navigate("/login"); }} className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-bold text-red-500 bg-white border-2 border-red-100 hover:bg-red-50 hover:border-red-300 transition shadow-sm">
        <Ico d={P.logout} size={18} /> Se déconnecter
      </button>
    </div>
  );
}