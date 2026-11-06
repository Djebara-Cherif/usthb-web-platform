import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Icon } from "../../components/Icon";

export default function ProfilEtudiant() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const fileRef  = useRef(null);
  
  const [photo,    setPhoto]    = useState(null);
  const [pwForm,   setPwForm]   = useState({ actuel: "", nouveau: "", confirmer: "" });
  const [showPw,   setShowPw]   = useState({ actuel: false, nouveau: false, confirmer: false });
  const [pwStatus, setPwStatus] = useState(null);
  const [pwMsg,    setPwMsg]    = useState("");

  // Variables dynamiques basées sur l'utilisateur connecté
  const prenom    = user?.name?.split(" ")[0] || "Amina";
  const nom       = user?.name?.split(" ").slice(1).join(" ") || "Benali";
  const email     = user?.email || "a.benali@etu.usthb.dz";
  const initiales = user?.initiales || "AB"; // La variable s'appelle "initiales"
  const role      = user?.roleLabel || "Étudiant";
  
  // Fausses données pour l'affichage
  const matricule  = "202131045";
  const niveau     = "L3 Informatique";
  const specialite = "Informatique";
  const groupe     = "G03";
  const section    = "Section B — Groupe 03";

  const CHAMPS_INFO = [
    { label: "Nom",                value: nom,        icon: "user"      },
    { label: "Prénom",             value: prenom,     icon: "user"      },
    { label: "Matricule",          value: matricule,  icon: "clipboard" },
    { label: "Adresse e-mail",     value: email,      icon: "message"   },
    { label: "Niveau académique",  value: niveau,     icon: "book"      },
    { label: "Spécialité",         value: specialite, icon: "star"      },
    { label: "Groupe",             value: groupe,     icon: "calendar"  },
    { label: "Section",            value: section,    icon: "info"      },
  ];

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmitPw = (e) => {
    e.preventDefault();
    if (!pwForm.actuel)                      { setPwStatus("error"); setPwMsg("Saisissez votre mot de passe actuel."); return; }
    if (pwForm.nouveau.length < 8)           { setPwStatus("error"); setPwMsg("Le nouveau mot de passe doit faire au moins 8 caractères."); return; }
    if (pwForm.nouveau !== pwForm.confirmer) { setPwStatus("error"); setPwMsg("Les mots de passe ne correspondent pas."); return; }
    setPwStatus("success"); setPwMsg("Mot de passe modifié avec succès !");
    setPwForm({ actuel: "", nouveau: "", confirmer: "" });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">

      <div>
        <h1 className="text-xl font-bold text-gray-800">Mon Profil</h1>
        <p className="text-sm text-gray-400 mt-0.5">Informations de votre compte étudiant</p>
      </div>

      {/* ══ CARTE IDENTITÉ ══ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-16 bg-gradient-to-br from-blue-700 via-blue-500 to-blue-400" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-8 mb-5">
            <div className="relative w-fit">
              <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-blue-600 flex items-center justify-center">
                {photo
                  ? <img src={photo} alt="Photo profil" className="w-full h-full object-cover" />
                  // CORRECTION ICI : "initiales" au lieu de "initials"
                  : <span className="text-white text-3xl font-extrabold">{initiales}</span>
                }
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm"
                title="Changer la photo"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </div>

            <div className="mb-1">
              <h2 className="text-xl font-bold text-gray-800">{prenom} {nom}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">{role}</span>
                <span className="text-xs text-gray-500">{matricule}</span>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-500">{niveau}</span>
              </div>
              {photo && (
                <button onClick={() => setPhoto(null)} className="text-xs text-red-400 hover:text-red-600 mt-1.5 hover:underline">
                  Supprimer la photo
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHAMPS_INFO.map(champ => (
              <div key={champ.label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Icon name={champ.icon} className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{champ.label}</p>
                  <p className="text-sm font-semibold text-gray-800 truncate mt-0.5">{champ.value}</p>
                </div>
                <Icon name="lock" className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
              </div>
            ))}
          </div>

          <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-4">
            <Icon name="info" className="w-3.5 h-3.5 flex-shrink-0" />
            Ces informations sont gérées par l'administration. Pour toute modification, contactez le secrétariat.
          </p>
        </div>
      </div>

      {/* ══ CHANGEMENT MOT DE PASSE ══ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/60">
          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
            <Icon name="lock" className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">Changer le mot de passe</h3>
            <p className="text-xs text-gray-400">Modifiez votre mot de passe de connexion</p>
          </div>
        </div>
        <form onSubmit={handleSubmitPw} className="px-6 py-5 space-y-4">
          {[
            { name: "actuel",    label: "Mot de passe actuel"              },
            { name: "nouveau",   label: "Nouveau mot de passe"             },
            { name: "confirmer", label: "Confirmer le nouveau mot de passe" },
          ].map(field => (
            <div key={field.name}>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">{field.label}</label>
              <div className="relative">
                <Icon name="lock" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPw[field.name] ? "text" : "password"}
                  name={field.name}
                  value={pwForm[field.name]}
                  onChange={e => { setPwForm(p => ({ ...p, [e.target.name]: e.target.value })); setPwStatus(null); }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white transition-all"
                />
                <button type="button" onClick={() => setShowPw(p => ({ ...p, [field.name]: !p[field.name] }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
                  <Icon name={showPw[field.name] ? "eyeoff" : "eye"} className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {pwStatus && (
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border
              ${pwStatus === "success" ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-600 border-red-100"}`}>
              <Icon name={pwStatus === "success" ? "check" : "info"} className="w-4 h-4 flex-shrink-0" />
              {pwMsg}
            </div>
          )}
          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-gray-400">Minimum 8 caractères requis</p>
            <button type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm">
              <Icon name="check" className="w-4 h-4" />Enregistrer
            </button>
          </div>
        </form>
      </div>

      {/* ══ DÉCONNEXION ══ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-800">Se déconnecter</p>
          <p className="text-xs text-gray-400 mt-0.5">Mettre fin à votre session actuelle</p>
        </div>
        <button onClick={() => { logout(); navigate("/login"); }}
          className="flex items-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
          <Icon name="logout" className="w-4 h-4" />Déconnexion
        </button>
      </div>

    </div>
  );
}