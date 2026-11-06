import React, { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext"; // <-- CORRIGÉ ICI AUSSI
import { useNavigate } from "react-router-dom";
import {
  Camera, Eye, EyeOff, Save, LogOut, CheckCircle,
  User, Mail, GraduationCap, Lock, ClipboardList,
  BookOpen, Star, Info, Shield,
} from "lucide-react";

// ─── Champ info (lecture seule) ───────────────────────────────────────────────
function InfoField({ icon: Icon, label, value, iconColor = "text-blue-500" }) {
  return (
    <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50`}>
        <Icon size={17} className={iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-800 truncate">{value || "—"}</p>
      </div>
      <Lock size={14} className="text-gray-200 flex-shrink-0" />
    </div>
  );
}

// ─── Champ mot de passe ───────────────────────────────────────────────────────
function PwdField({ label, value, onChange, show, onToggle, error, placeholder = "••••••••" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Lock size={15} />
        </div>
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white transition"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function ProfilProf() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const fileRef          = useRef();

  // Photo
  const [photo,       setPhoto]       = useState(null);
  const [photoSaved,  setPhotoSaved]  = useState(false);

  // Mot de passe
  const [currentPwd,  setCurrentPwd]  = useState("");
  const [newPwd,      setNewPwd]      = useState("");
  const [confirmPwd,  setConfirmPwd]  = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwdErrors,   setPwdErrors]   = useState({});
  const [pwdSaved,    setPwdSaved]    = useState(false);

  // Données profil depuis le contexte / API
  const nom       = user?.name?.split(" ").slice(1).join(" ") || "Meziani";
  const prenom    = user?.name?.split(" ")[0]                 || "Karim";
  const email     = user?.email                               || "karim.meziani@usthb.dz";
  const role      = user?.roleLabel                           || "Professeur";
  const grade     = user?.grade                               || "Maître de Conférences A";
  const dept      = user?.department                          || "Département Informatique";
  const matricule = user?.matricule                           || "ENS-2021-0042";
  const initials  = `${prenom[0] || ""}${nom[0] || ""}`.toUpperCase();

  // Changement photo
  const handlePhotoChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { alert("Taille max : 3 Mo"); return; }
    const reader = new FileReader();
    reader.onload = ev => { setPhoto(ev.target.result); setPhotoSaved(false); };
    reader.readAsDataURL(file);
  };

  const handlePhotoSave = () => {
    setPhotoSaved(true);
    setTimeout(() => setPhotoSaved(false), 2500);
  };

  // Validation mot de passe
  const validatePwd = () => {
    const e = {};
    if (!currentPwd)                     e.current = "Mot de passe actuel requis.";
    if (!newPwd)                         e.new     = "Nouveau mot de passe requis.";
    else if (newPwd.length < 8)          e.new     = "Minimum 8 caractères.";
    if (newPwd !== confirmPwd)           e.confirm = "Les mots de passe ne correspondent pas.";
    if (newPwd && newPwd === currentPwd) e.new     = "Le nouveau mot de passe doit être différent.";
    setPwdErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePwdSave = () => {
    if (!validatePwd()) return;
    setPwdSaved(true);
    setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
    setTimeout(() => setPwdSaved(false), 3000);
  };

  // Force mot de passe
  const strength = (() => {
    let s = 0;
    if (newPwd.length >= 8)              s++;
    if (/[A-Z]/.test(newPwd))           s++;
    if (/[0-9]/.test(newPwd))           s++;
    if (/[^A-Za-z0-9]/.test(newPwd))   s++;
    return s;
  })();
  const strengthColors = ["bg-gray-200", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];
  const strengthLabels = ["", "Faible", "Moyen", "Bien", "Fort"];
  const strengthText   = ["", "text-red-500", "text-orange-500", "text-yellow-500", "text-green-600"];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">

      {/* ── CARTE PROFIL ─────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="h-28 bg-gradient-to-r from-blue-500 to-blue-700 relative">
          <div className="absolute -bottom-12 left-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-blue-600 flex items-center justify-center">
                {photo
                  ? <img src={photo} alt="avatar" className="w-full h-full object-cover" />
                  : <span className="text-white text-3xl font-bold select-none">{initials}</span>
                }
              </div>
              <button
                onClick={() => fileRef.current.click()}
                className="absolute bottom-1 right-1 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition border border-gray-100"
                title="Changer la photo"
              >
                <Camera size={13} className="text-blue-600" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-start justify-between pt-14 mb-6">

            <div>
              <h2 className="text-xl font-bold text-gray-900">{prenom} {nom}</h2>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                  {role}
                </span>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-gray-500 font-medium">{matricule}</span>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-gray-500">{dept}</span>
              </div>
            </div>

            {photo && (
              <button
                onClick={handlePhotoSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition
                  ${photoSaved ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                {photoSaved ? <CheckCircle size={14} /> : <Save size={14} />}
                {photoSaved ? "Photo sauvegardée ✓" : "Sauvegarder la photo"}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoField icon={User}          label="Nom"               value={nom}      />
            <InfoField icon={User}          label="Prénom"            value={prenom}   iconColor="text-purple-500" />
            <InfoField icon={ClipboardList} label="Matricule"         value={matricule} iconColor="text-orange-500" />
            <InfoField icon={Mail}          label="Adresse e-mail"    value={email}    iconColor="text-green-500"  />
            <InfoField icon={GraduationCap} label="Grade"             value={grade}    iconColor="text-blue-500"   />
            <InfoField icon={Shield}        label="Rôle"              value={role}     iconColor="text-indigo-500" />
            <InfoField icon={BookOpen}      label="Département"       value={dept}     iconColor="text-teal-500"   />
            <InfoField icon={Star}          label="Spécialité"        value="Génie Logiciel" iconColor="text-yellow-500" />
          </div>

          <div className="flex items-center gap-2 mt-4 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
            <Info size={14} className="text-gray-400 flex-shrink-0" />
            <p className="text-xs text-gray-400">
              Ces informations sont gérées par l'administration. Pour toute modification, contactez le secrétariat.
            </p>
          </div>
        </div>
      </div>

      {/* ── CHANGER MOT DE PASSE ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
            <Lock size={18} className="text-orange-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Changer le mot de passe</h3>
            <p className="text-xs text-gray-400 mt-0.5">Modifiez votre mot de passe de connexion</p>
          </div>
        </div>

        <div className="px-6 py-6 space-y-4">
          <PwdField
            label="Mot de passe actuel"
            value={currentPwd}
            onChange={v => { setCurrentPwd(v); setPwdErrors(p => ({ ...p, current: "" })); }}
            show={showCurrent}
            onToggle={() => setShowCurrent(!showCurrent)}
            error={pwdErrors.current}
          />

          <PwdField
            label="Nouveau mot de passe"
            value={newPwd}
            onChange={v => { setNewPwd(v); setPwdErrors(p => ({ ...p, new: "" })); }}
            show={showNew}
            onToggle={() => setShowNew(!showNew)}
            error={pwdErrors.new}
            placeholder="Minimum 8 caractères"
          />

          {newPwd && (
            <div className="space-y-1.5 -mt-1">
              <div className="flex gap-1.5">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= strength ? strengthColors[strength] : "bg-gray-200"}`} />
                ))}
              </div>
              <p className={`text-xs font-medium ${strengthText[strength]}`}>{strengthLabels[strength]}</p>
            </div>
          )}

          <PwdField
            label="Confirmer le nouveau mot de passe"
            value={confirmPwd}
            onChange={v => { setConfirmPwd(v); setPwdErrors(p => ({ ...p, confirm: "" })); }}
            show={showConfirm}
            onToggle={() => setShowConfirm(!showConfirm)}
            error={pwdErrors.confirm}
          />

          {confirmPwd && newPwd === confirmPwd && (
            <p className="text-green-500 text-xs flex items-center gap-1 -mt-1">
              <CheckCircle size={12} /> Mots de passe identiques
            </p>
          )}

          <button
            onClick={handlePwdSave}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition mt-2
              ${pwdSaved ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            {pwdSaved ? <CheckCircle size={16} /> : <Save size={16} />}
            {pwdSaved ? "Mot de passe modifié ✓" : "Modifier le mot de passe"}
          </button>
        </div>
      </div>

      {/* ── DÉCONNEXION ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-red-100 shadow-sm px-6 py-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Déconnexion</h3>
          <p className="text-xs text-gray-400 mt-0.5">Vous serez redirigé vers la page de connexion.</p>
        </div>
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium hover:bg-red-100 transition"
        >
          <LogOut size={15} /> Se déconnecter
        </button>
      </div>

    </div>
  );
}
