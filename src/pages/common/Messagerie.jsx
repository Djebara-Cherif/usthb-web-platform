import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "../../components/Icon";

/* ════════════════════════════════════════════
   CONTACTS AUTORISÉS (@usthb.dz uniquement)
════════════════════════════════════════════ */
const CONTACTS_USTHB = [
  { id: 1, nom: "Dr. Meziane Ahmed",      role: "Enseignant",         email: "meziane@usthb.dz",      avatar: "MA" },
  { id: 2, nom: "Dr. Boudiaf Salim",      role: "Enseignant",         email: "boudiaf@usthb.dz",      avatar: "BS" },
  { id: 3, nom: "Dr. Khelifa Nadia",      role: "Enseignant",         email: "khelifa@usthb.dz",      avatar: "KN" },
  { id: 4, nom: "Dr. Aoudia Rachid",      role: "Enseignant",         email: "aoudia@usthb.dz",       avatar: "AR" },
  { id: 5, nom: "Dr. Bensalem Fatima",    role: "Enseignant",         email: "bensalem@usthb.dz",     avatar: "BF" },
  { id: 6, nom: "Pr. Hamidi Kamel",       role: "Encadrant PFE",      email: "hamidi@usthb.dz",       avatar: "HK" },
  { id: 7, nom: "Pr. Slimane Omar",       role: "Encadrant PFE",      email: "slimane@usthb.dz",      avatar: "SO" },
  { id: 8, nom: "Pr. Amrani Leila",       role: "Encadrant PFE",      email: "amrani@usthb.dz",       avatar: "AL" },
  { id: 9, nom: "Chef de Département",    role: "Chef de Département",email: "chef.dept@usthb.dz",    avatar: "CD" },
  { id: 10,nom: "Secrétariat FI",         role: "Administration",     email: "secretariat@usthb.dz",  avatar: "SF" },
];

/* ════════════════════════════════════════════
   EMAILS MOCK
════════════════════════════════════════════ */
const now = Date.now();
const H = 3600000; const D = 86400000;

let _id = 100;
const makeId = () => ++_id;

const EMAILS_INIT = [
  {
    id: 1, dossier: "recu", lu: false, etoile: false,
    de: { nom: "Dr. Meziane Ahmed", email: "meziane@usthb.dz", avatar: "MA" },
    a: "a.benali@etu.usthb.dz",
    objet: "Support de cours — Algorithmique Avancée (Chap. 3)",
    corps: `Bonjour Mme Benali,\n\nJe vous informe que le support du chapitre 3 sur les arbres AVL est maintenant disponible sur la plateforme.\n\nVous y trouverez :\n- Le cours complet (PDF)\n- Des exercices corrigés\n- Un exemple d'implémentation en C\n\nBonne lecture.\n\nCordialement,\nDr. Meziane`,
    date: now - 2 * H, pieces: [],
  },
  {
    id: 2, dossier: "recu", lu: false, etoile: true,
    de: { nom: "Chef de Département", email: "chef.dept@usthb.dz", avatar: "CD" },
    a: "a.benali@etu.usthb.dz",
    objet: "Convocation — Réunion d'information PFE Licence 2025-2026",
    corps: `Chère étudiante,\n\nVous êtes convoquée à la réunion d'information concernant les modalités du PFE Licence pour l'année 2025-2026.\n\nDate : Jeudi 15 Mai 2026\nHeure : 10h00\nSalle : Amphithéâtre A\n\nVotre présence est obligatoire.\n\nLe Chef de Département\nDépartement d'Informatique — USTHB`,
    date: now - 5 * H, pieces: [],
  },
  {
    id: 3, dossier: "recu", lu: true, etoile: false,
    de: { nom: "Dr. Boudiaf Salim", email: "boudiaf@usthb.dz", avatar: "BS" },
    a: "a.benali@etu.usthb.dz",
    objet: "Résultats TP — Base de Données (Groupe 03)",
    corps: `Bonjour,\n\nLes notes du TP de Base de Données ont été saisies. Vous pouvez consulter vos résultats dans l'espace \"Mes Notes\".\n\nMoyenne du groupe : 13.2/20\n\nPour toute réclamation, merci de me contacter avant le 20 Mai 2026.\n\nDr. Boudiaf`,
    date: now - D, pieces: [],
  },
  {
    id: 4, dossier: "recu", lu: true, etoile: false,
    de: { nom: "Pr. Hamidi Kamel", email: "hamidi@usthb.dz", avatar: "HK" },
    a: "a.benali@etu.usthb.dz",
    objet: "RE : Demande d'encadrement PFE — Deep Learning",
    corps: `Bonjour Mme Benali,\n\nSuite à votre demande, je suis disponible pour vous encadrer sur le thème :\n« Deep Learning pour la reconnaissance faciale »\n\nMerci de passer à mon bureau (D401) jeudi entre 10h et 12h pour discuter des détails du projet et signer la fiche d'encadrement.\n\nCordialement,\nPr. Hamidi Kamel`,
    date: now - 3 * D, pieces: [],
  },
  {
    id: 5, dossier: "recu", lu: true, etoile: false,
    de: { nom: "Secrétariat FI", email: "secretariat@usthb.dz", avatar: "SF" },
    a: "a.benali@etu.usthb.dz",
    objet: "Votre certificat de scolarité est disponible",
    corps: `Bonjour,\n\nVotre certificat de scolarité pour l'année universitaire 2025-2026 est prêt.\n\nVous pouvez le retirer au secrétariat (Bureau B01) pendant les heures d'ouverture :\nDimanche – Jeudi : 8h00 – 15h30\n\nMerci de présenter votre carte d'étudiant.\n\nLe Secrétariat\nFaculté d'Informatique — USTHB`,
    date: now - 5 * D, pieces: [],
  },
];

const ETUDIANT = {
  nom: "Amina Benali",
  email: "a.benali@etu.usthb.dz",
  initiales: "AB",
};

/* ════════════════════════════════════════════
   UTILITAIRES
════════════════════════════════════════════ */
function fmtDate(ts) {
  const diff = now - ts;
  if (diff < 86400000) return new Date(ts).toLocaleTimeString("fr-DZ", { hour: "2-digit", minute: "2-digit" });
  if (diff < 604800000) return new Date(ts).toLocaleDateString("fr-DZ", { weekday: "short" });
  return new Date(ts).toLocaleDateString("fr-DZ", { day: "numeric", month: "short" });
}
function fmtDateFull(ts) {
  return new Date(ts).toLocaleString("fr-DZ", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const AVATAR_COLORS = [
  "bg-blue-600","bg-emerald-600","bg-violet-600","bg-rose-600",
  "bg-amber-600","bg-cyan-600","bg-indigo-600","bg-teal-600",
];
function avatarColor(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function AvatarCircle({ initiales, size = "md" }) {
  const s = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-10 h-10 text-sm" : "w-9 h-9 text-xs";
  return (
    <div className={`${s} ${avatarColor(initiales)} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initiales}
    </div>
  );
}

/* ════════════════════════════════════════════
   COMPOSE MODAL (style Gmail)
════════════════════════════════════════════ */
function ComposeModal({ onClose, onSend, destInit = "" }) {
  const [to,      setTo]      = useState(destInit);
  const [toObj,   setToObj]   = useState(CONTACTS_USTHB.find(c => c.email === destInit || c.nom === destInit) || null);
  const [objet,   setObjet]   = useState("");
  const [corps,   setCorps]   = useState("");
  const [drop,    setDrop]    = useState(false);
  const [mini,    setMini]    = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const h = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setDrop(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const suggestions = CONTACTS_USTHB.filter(c =>
    to.length >= 1 &&
    !toObj &&
    (c.nom.toLowerCase().includes(to.toLowerCase()) || c.email.toLowerCase().includes(to.toLowerCase()))
  );

  const canSend = (toObj || (to.endsWith("@usthb.dz") && to.includes("@"))) && corps.trim();

  const handleSend = () => {
    if (!canSend) return;
    const dest = toObj || { nom: to, email: to, avatar: to.slice(0, 2).toUpperCase() };
    onSend({ to: dest, objet: objet || "(sans objet)", corps, date: Date.now() });
    onClose();
  };

  if (mini) return (
    <div className="fixed bottom-0 right-6 z-50 w-72 bg-gray-800 text-white rounded-t-xl shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2.5 cursor-pointer" onClick={() => setMini(false)}>
        <span className="text-sm font-medium truncate">{objet || "Nouveau message"}</span>
        <div className="flex gap-2">
          <button className="hover:bg-gray-700 rounded p-0.5"><Icon name="close" className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-0 right-6 z-50 w-[560px] bg-white rounded-t-2xl shadow-2xl border border-gray-200 flex flex-col" style={{ maxHeight: "85vh" }}>
      {/* Barre de titre */}
      <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2.5 rounded-t-2xl flex-shrink-0">
        <span className="text-sm font-medium">Nouveau message</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setMini(true)} className="hover:bg-gray-700 rounded p-1" title="Réduire">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
          <button onClick={onClose} className="hover:bg-gray-700 rounded p-1" title="Fermer">
            <Icon name="close" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Champs */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* À */}
        <div className="relative border-b border-gray-100 px-4 py-2" ref={dropRef}>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-8 flex-shrink-0">À</span>
            {toObj ? (
              <div className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                <span className="font-medium">{toObj.nom}</span>
                <span className="text-blue-500 text-[10px]">&lt;{toObj.email}&gt;</span>
                <button onClick={() => { setToObj(null); setTo(""); }}
                  className="ml-1 hover:text-red-500">
                  <Icon name="close" className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <input
                autoFocus
                type="text"
                value={to}
                onChange={e => { setTo(e.target.value); setDrop(true); }}
                onFocus={() => setDrop(true)}
                placeholder="Destinataire (@usthb.dz)"
                className="flex-1 text-sm outline-none py-1 bg-transparent"
              />
            )}
          </div>
          {/* Suggestions */}
          {drop && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full bg-white border border-gray-100 shadow-xl rounded-xl z-10 overflow-hidden mt-1">
              {suggestions.map(c => (
                <button key={c.id} onClick={() => { setToObj(c); setTo(c.email); setDrop(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 text-left transition-colors">
                  <AvatarCircle initiales={c.avatar} size="sm" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800">{c.nom}</p>
                    <p className="text-[11px] text-gray-400">{c.email} · {c.role}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {/* Avertissement email hors @usthb.dz */}
          {to && !toObj && !to.endsWith("@usthb.dz") && to.includes("@") && (
            <p className="text-[11px] text-red-500 mt-1">Seules les adresses @usthb.dz sont autorisées.</p>
          )}
        </div>

        {/* Objet */}
        <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-2">
          <span className="text-xs text-gray-500 w-8 flex-shrink-0">Objet</span>
          <input
            type="text"
            value={objet}
            onChange={e => setObjet(e.target.value)}
            placeholder="Objet du message"
            className="flex-1 text-sm outline-none py-1 bg-transparent"
          />
        </div>

        {/* Corps */}
        <div className="flex-1 px-4 py-3">
          <textarea
            value={corps}
            onChange={e => setCorps(e.target.value)}
            placeholder={`Rédigez votre message…\n\nCordialement,\n${ETUDIANT.nom}`}
            className="w-full h-full min-h-[200px] text-sm outline-none resize-none bg-transparent leading-relaxed"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 flex-shrink-0 bg-gray-50 rounded-b-none">
        <button
          onClick={handleSend}
          disabled={!canSend}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all
            ${canSend ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          Envoyer
        </button>
        <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-all">
          <Icon name="close" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   VUE EMAIL DÉTAIL
════════════════════════════════════════════ */
function EmailDetail({ email, onBack, onReply, onEtoile }) {
  const [showReply, setShowReply] = useState(false);
  const [replyCorps, setReplyCorps] = useState(`\n\n---\nLe ${fmtDateFull(email.date)}, ${email.de.nom} <${email.de.email}> a écrit :\n${email.corps.split('\n').map(l => '> ' + l).join('\n')}`);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-all">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Retour
        </button>
        <div className="flex gap-1 ml-auto">
          <button onClick={() => onEtoile(email.id)}
            className={`p-2 rounded-full hover:bg-gray-100 transition-all ${email.etoile ? "text-amber-400" : "text-gray-400 hover:text-amber-400"}`}>
            <svg viewBox="0 0 24 24" fill={email.etoile ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {/* Objet */}
        <h2 className="text-xl font-bold text-gray-800 mb-5">{email.objet}</h2>

        {/* Meta */}
        <div className="flex items-start gap-3 mb-6">
          <AvatarCircle initiales={email.de.avatar} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div>
                <span className="text-sm font-bold text-gray-800">{email.de.nom}</span>
                <span className="text-xs text-gray-400 ml-2">&lt;{email.de.email}&gt;</span>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">{fmtDateFull(email.date)}</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">À : <span className="text-gray-600">{email.dossier === "envoye" ? email.a : ETUDIANT.email}</span></p>
          </div>
        </div>

        {/* Corps */}
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-white rounded-xl p-5 border border-gray-100">
          {email.corps}
        </div>

        {/* Zone réponse */}
        {showReply ? (
          <div className="mt-5 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
              À : <span className="font-medium text-gray-700">{email.de.nom} &lt;{email.de.email}&gt;</span>
            </div>
            <textarea
              value={replyCorps}
              onChange={e => setReplyCorps(e.target.value)}
              className="w-full px-4 py-3 text-sm outline-none resize-none leading-relaxed bg-white"
              rows={8}
            />
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => { onReply({ de: ETUDIANT, to: email.de, objet: "RE : " + email.objet, corps: replyCorps, date: Date.now() }); setShowReply(false); }}
                className="flex items-center gap-2 bg-blue-600 text-white text-xs font-semibold px-5 py-2 rounded-full hover:bg-blue-700 transition-all shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Envoyer
              </button>
              <button onClick={() => setShowReply(false)} className="text-xs text-gray-500 hover:text-gray-700 px-3 py-2 rounded-full hover:bg-gray-200 transition-all">
                Annuler
              </button>
            </div>
          </div>
        ) : (
          email.dossier !== "envoye" && (
            <button
              onClick={() => setShowReply(true)}
              className="mt-5 flex items-center gap-2 border border-gray-200 text-sm text-gray-600 px-5 py-2.5 rounded-full hover:bg-gray-100 hover:border-gray-300 transition-all font-medium">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
              </svg>
              Répondre
            </button>
          )
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   LISTE EMAILS (style Gmail)
════════════════════════════════════════════ */
function EmailRow({ email, onClick, onEtoile, selected }) {
  const isEnvoye = email.dossier === "envoye";
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer border-b border-gray-50 transition-all group
        ${!email.lu && !isEnvoye ? "bg-white font-semibold" : "bg-gray-50/30"}
        ${selected ? "bg-blue-50 border-l-2 border-l-blue-500" : "hover:bg-gray-100/60"}`}>

      {/* Étoile */}
      <button onClick={e => { e.stopPropagation(); onEtoile(email.id); }}
        className={`p-0.5 flex-shrink-0 transition-colors ${email.etoile ? "text-amber-400" : "text-gray-300 hover:text-amber-400"}`}>
        <svg viewBox="0 0 24 24" fill={email.etoile ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </button>

      {/* Avatar */}
      <AvatarCircle initiales={isEnvoye ? (CONTACTS_USTHB.find(c=>c.email===email.a)?.avatar || email.a?.slice(0,2).toUpperCase() || "?") : email.de.avatar} size="sm" />

      {/* Expéditeur / destinataire */}
      <span className={`w-40 flex-shrink-0 text-xs truncate ${!email.lu && !isEnvoye ? "text-gray-900 font-bold" : "text-gray-600 font-medium"}`}>
        {isEnvoye ? (CONTACTS_USTHB.find(c=>c.email===email.a)?.nom || email.a) : email.de.nom}
      </span>

      {/* Objet + extrait */}
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <span className={`text-xs truncate ${!email.lu && !isEnvoye ? "text-gray-900" : "text-gray-700"}`}>
          {email.objet}
        </span>
        <span className="text-xs text-gray-400 truncate hidden sm:inline">
          — {email.corps.split('\n')[0].slice(0, 60)}
        </span>
      </div>

      {/* Point non lu */}
      {!email.lu && !isEnvoye && (
        <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
      )}

      {/* Date */}
      <span className={`text-xs flex-shrink-0 ${!email.lu && !isEnvoye ? "text-gray-800 font-semibold" : "text-gray-400"}`}>
        {fmtDate(email.date)}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════
   PAGE PRINCIPALE — Messagerie
════════════════════════════════════════════ */
export default function Messagerie() {
  const location = useLocation();
  const [emails,       setEmails]       = useState(EMAILS_INIT);
  const [dossier,      setDossier]      = useState("recu");
  const [selectedId,   setSelectedId]   = useState(null);
  const [showCompose,  setShowCompose]  = useState(false);
  const [destInit,     setDestInit]     = useState("");
  const [searchQ,      setSearchQ]      = useState("");

  /* Ouverture depuis Stages (email passé en state) */
  useEffect(() => {
    if (location.state?.email || location.state?.destinataire) {
      const d = location.state.email || location.state.destinataire;
      setDestInit(d);
      setShowCompose(true);
    }
  }, [location.state]);

  const selectedEmail = emails.find(e => e.id === selectedId) || null;

  const nonLus = emails.filter(e => !e.lu && e.dossier === "recu").length;

  const emailsFiltres = emails
    .filter(e => {
      const matchDossier = e.dossier === dossier;
      const q = searchQ.toLowerCase();
      const matchSearch = !searchQ || e.objet.toLowerCase().includes(q) || e.de?.nom?.toLowerCase().includes(q) || e.corps.toLowerCase().includes(q);
      return matchDossier && matchSearch;
    })
    .sort((a, b) => b.date - a.date);

  const openEmail = (id) => {
    setSelectedId(id);
    setEmails(prev => prev.map(e => e.id === id ? { ...e, lu: true } : e));
  };

  const toggleEtoile = (id) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, etoile: !e.etoile } : e));
  };

  const handleSendNew = ({ to, objet, corps, date }) => {
    const newEmail = {
      id: makeId(), dossier: "envoye", lu: true, etoile: false,
      de: ETUDIANT,
      a: to.email,
      objet, corps, date: date || Date.now(), pieces: [],
    };
    setEmails(prev => [newEmail, ...prev]);
    setDossier("envoye");
    setSelectedId(newEmail.id);
  };

  const handleReply = ({ to, objet, corps, date }) => {
    const newEmail = {
      id: makeId(), dossier: "envoye", lu: true, etoile: false,
      de: ETUDIANT,
      a: to.email,
      objet, corps, date: date || Date.now(), pieces: [],
    };
    setEmails(prev => [newEmail, ...prev]);
    setDossier("envoye");
    setSelectedId(newEmail.id);
  };

  const NAV_DOSSIERS = [
    { key: "recu",    label: "Boîte de réception", icon: "bell",      count: nonLus },
    { key: "envoye",  label: "Messages envoyés",   icon: "arrow",     count: 0 },
    { key: "etoile",  label: "Messages suivis",    icon: "star",      count: emails.filter(e => e.etoile).length },
  ];

  const emailsEtoile = dossier === "etoile"
    ? emails.filter(e => e.etoile && (
        !searchQ || e.objet.toLowerCase().includes(searchQ) || e.de?.nom?.toLowerCase().includes(searchQ)
      )).sort((a,b)=>b.date-a.date)
    : emailsFiltres;

  return (
    <div className="flex h-[calc(100vh-5rem)] -m-6 font-sans">

      {/* ════ SIDEBAR GAUCHE ════ */}
      <div className="w-56 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col py-3 px-2">
        {/* Composer */}
        <button
          onClick={() => { setDestInit(""); setShowCompose(true); }}
          className="flex items-center gap-3 mx-2 mb-4 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-sm rounded-2xl transition-all shadow-sm border border-blue-100">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Nouveau message
        </button>

        {/* Navigation */}
        <nav className="space-y-0.5">
          {NAV_DOSSIERS.map(d => (
            <button key={d.key} onClick={() => { setDossier(d.key); setSelectedId(null); setSearchQ(""); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all
                ${dossier === d.key ? "bg-blue-100 text-blue-700 font-bold" : "text-gray-600 hover:bg-gray-100 font-medium"}`}>
              <div className="flex items-center gap-3">
                <Icon name={d.icon} className="w-4 h-4" />
                {d.label}
              </div>
              {d.count > 0 && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${dossier === d.key ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                  {d.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* ════ ZONE CENTRALE : liste ════ */}
      <div className={`flex flex-col bg-gray-50 border-r border-gray-100 flex-shrink-0 transition-all ${selectedEmail ? "w-80" : "flex-1"}`}>
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 bg-white flex-shrink-0 flex items-center gap-3">
          <div className="relative flex-1">
            <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Rechercher dans les messages…"
              value={searchQ} onChange={e => setSearchQ(e.target.value)}
              className="pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-gray-50 w-full transition-all"
            />
          </div>
          <h2 className="text-sm font-bold text-gray-700 flex-shrink-0">
            {NAV_DOSSIERS.find(d => d.key === dossier)?.label}
          </h2>
        </div>

        {/* Liste */}
        <div className="flex-1 overflow-y-auto">
          {emailsEtoile.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3 text-gray-400">
              <Icon name="message" className="w-10 h-10 text-gray-200" />
              <p className="text-sm">Aucun message</p>
            </div>
          ) : (
            emailsEtoile.map(email => (
              <EmailRow key={email.id} email={email}
                onClick={() => openEmail(email.id)}
                onEtoile={toggleEtoile}
                selected={email.id === selectedId}
              />
            ))
          )}
        </div>
      </div>

      {/* ════ ZONE DROITE : détail ════ */}
      {selectedEmail && (
        <div className="flex-1 bg-white overflow-hidden">
          <EmailDetail
            email={selectedEmail}
            onBack={() => setSelectedId(null)}
            onReply={handleReply}
            onEtoile={toggleEtoile}
          />
        </div>
      )}

      {/* ════ COMPOSE MODAL ════ */}
      {showCompose && (
        <ComposeModal
          onClose={() => { setShowCompose(false); setDestInit(""); }}
          onSend={handleSendNew}
          destInit={destInit}
        />
      )}
    </div>
  );
}
