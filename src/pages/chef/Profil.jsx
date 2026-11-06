import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, GraduationCap, Building2,
  Lock, Camera, ArrowRightLeft, LogOut, Eye, EyeOff,
  FileText, Info,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/* ── Champ info compact ── */
const InfoField = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
    <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-blue-500" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">{label}</p>
      <p className="text-sm font-semibold text-gray-800 mt-0.5 truncate">{value || '—'}</p>
    </div>
    <Lock className="w-2.5 h-2.5 text-gray-300 shrink-0" />
  </div>
);

/* ── Input mot de passe ── */
const PwdField = ({ label, value, onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3
      focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all">
      <Lock className="w-3.5 h-3.5 text-gray-300 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-0.5">{label}</p>
        <input type={show ? 'text' : 'password'} value={value} onChange={onChange}
          placeholder="••••••••"
          className="w-full text-sm font-medium text-gray-800 outline-none bg-transparent placeholder:text-gray-300" />
      </div>
      <button type="button" onClick={() => setShow(v => !v)}
        className="text-gray-300 hover:text-gray-500 transition-colors shrink-0">
        {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};

/* ══ PAGE PRINCIPALE ══ */
export default function Profil() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const fileRef  = useRef(null);

  const [photo, setPhoto]                 = useState(user?.photo || null);
  const [switchConfirm, setSwitchConfirm] = useState(false);
  const [pwdActuel,  setPwdActuel]        = useState('');
  const [pwdNew,     setPwdNew]           = useState('');
  const [pwdConfirm, setPwdConfirm]       = useState('');

  const nameParts = (user?.name || 'Pr. Hadj').split(' ');
  const prenom    = nameParts[0] || '';
  const nom       = nameParts.slice(1).join(' ') || '';

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhoto(ev.target.result);
      setUser(p => ({ ...p, photo: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">

      {/* ── En-tête de la page ── */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Mon Profil</h1>
        <p className="text-sm text-gray-400 mt-0.5">Espace Chef de Département</p>
      </div>

      {/* ══ HEADER IDENTITÉ ══ */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {/* Bandeau bleu court */}
        <div className="h-20 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500" />

        <div className="px-5 pb-5">
          {/* Avatar + bouton basculement alignés */}
          <div className="flex items-start justify-between -mt-7 mb-2">
            {/* Avatar */}
            <div className="relative group shrink-0">
              <div className="w-16 h-16 rounded-xl border-4 border-white shadow-md overflow-hidden bg-blue-600 flex items-center justify-center">
                {photo
                  ? <img src={photo} alt="profil" className="w-full h-full object-cover" />
                  : <span className="text-white text-xl font-bold select-none">{user?.initiales || 'PH'}</span>
                }
              </div>
              <button onClick={() => fileRef.current?.click()}
                className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover:opacity-100
                  transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="w-5 h-5 text-white drop-shadow" />
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />

            {/* Bouton Espace Professeur */}
            <div className="mt-1.5">
              {!switchConfirm ? (
                <button onClick={() => setSwitchConfirm(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white
                    text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-md">
                  <ArrowRightLeft className="w-4 h-4" /> Espace Professeur
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-md">
                  <span className="text-xs text-gray-600 font-medium">Confirmer la bascule ?</span>
                  <button onClick={() => setSwitchConfirm(false)}
                    className="px-3 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors">Non</button>
                  <button onClick={() => { 
                      setUser(p => ({ ...p, role: 'prof', roleLabel: 'Professeur' })); 
                      navigate('/prof/dashboard'); 
                    }}
                    className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">Oui</button>
                </div>
              )}
            </div>
          </div>

          {/* Nom + badges */}
          <div className="mt-2">
            <h1 className="text-lg font-bold text-gray-900 leading-tight">{user?.name}</h1>
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">
                {user?.roleLabel || 'Chef de Département'}
              </span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-500">{user?.matricule || 'ENS-2019-042'}</span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-500">{user?.department || 'Département Informatique'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ CORPS : 2 colonnes ══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

        {/* ── Gauche : infos en grille 2×4 ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="text-sm font-bold text-gray-600 mb-4">Informations personnelles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoField icon={User}          label="Nom"         value={nom}    />
            <InfoField icon={User}          label="Prénom"      value={prenom} />
            <InfoField icon={FileText}      label="Matricule"   value={user?.matricule || 'ENS-2019-042'} />
            <InfoField icon={Mail}          label="E-mail"      value={user?.email}  />
            <InfoField icon={GraduationCap} label="Grade"       value={user?.grade || 'Professeur'}  />
            <InfoField icon={Phone}         label="Téléphone"   value={user?.phone || '+213 555 12 34 56'}  />
            <InfoField icon={Building2}     label="Département" value={user?.department || 'Informatique'} />
            <InfoField icon={Building2}     label="Faculté"     value="FI — USTHB" />
          </div>
          <div className="flex items-start gap-2 mt-4 px-4 py-3 bg-blue-50 rounded-xl border border-blue-100">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-600 leading-relaxed">
              Ces informations sont gérées par l'administration. Pour toute modification, contactez le secrétariat de la faculté.
            </p>
          </div>
        </div>

        {/* ── Droite : mot de passe ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100 shrink-0">
              <Lock className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">Changer le mot de passe</h2>
              <p className="text-xs text-gray-400">Modifiez votre mot de passe de connexion</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <PwdField label="Mot de passe actuel"       value={pwdActuel}  onChange={e => setPwdActuel(e.target.value)}  />
            <PwdField label="Nouveau mot de passe"      value={pwdNew}     onChange={e => setPwdNew(e.target.value)}     />
            <PwdField label="Confirmer le mot de passe" value={pwdConfirm} onChange={e => setPwdConfirm(e.target.value)} />
          </div>
          
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
             <p className="text-xs text-gray-400">Minimum 8 caractères requis</p>
             <button className="px-5 py-2.5 text-sm font-bold bg-blue-600 hover:bg-blue-700
              text-white rounded-xl transition-all shadow-sm flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Mettre à jour
            </button>
          </div>
        </div>
      </div>

      {/* ══ DÉCONNEXION ══ */}
      <div className="bg-white rounded-2xl border border-red-100 p-5 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center border border-red-100 shrink-0">
            <LogOut className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-800">Se déconnecter</h2>
            <p className="text-xs text-gray-400">Mettre fin à votre session actuelle</p>
          </div>
        </div>
        <button onClick={() => { logout(); navigate('/login'); }}
          className="flex items-center gap-2 px-4 py-2.5 border border-red-200 bg-white hover:bg-red-50 shrink-0
            text-red-500 font-bold text-sm rounded-xl transition-all">
          <LogOut className="w-4 h-4" /> Déconnexion
        </button>
      </div>

    </div>
  );
}