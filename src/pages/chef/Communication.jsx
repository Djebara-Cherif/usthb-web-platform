import { useState } from 'react';
import { Send, Bell, Users, Calendar, Megaphone, X, Plus } from 'lucide-react';

/* ══ CONSTANTES ══ */
const CLASSES_LIST = [
  'Toutes les classes','L1-G01','L1-G02','L1-G03','L1-G04',
  'L2-ACAD','L2-ISIL','L3-ACAD','L3-ISIL',
  'M1-AI','M1-Cyber','M1-GL','M1-Data',
  'M2-AI','M2-Cyber','M2-GL','M2-Data',
];
const PROFS_LIST = [
  'Tous les enseignants','Pr. Meziani K.','Dr. Amrani S.','Dr. Kaci R.',
  'Pr. Belarbi M.','Dr. Boufama L.','Dr. Bouziane O.',
];

/* ══ MOCK DATA — à remplacer par API ══ */
const INIT_ANNONCES = [
  {
    id:1, type:'annonce', titre:'Résultats S1 disponibles', message:'Les résultats du Semestre 1 sont disponibles sur la plateforme. Merci de les vérifier avant le 15/05.',
    cible:'Toutes les classes', date:'2026-05-08', heure:'10:30', auteur:'Chef de Département',
  },
  {
    id:2, type:'reunion', titre:'Réunion pédagogique — Semestre 2', message:'Réunion de planification du Semestre 2. Présence obligatoire pour tous les enseignants.',
    cible:'Tous les enseignants', date:'2026-05-12', heure:'09:00', lieu:'Salle de réunion A', auteur:'Chef de Département',
  },
  {
    id:3, type:'annonce', titre:'Modification emplois du temps L2', message:'Suite aux travaux de maintenance, l\'emploi du temps de L2-ACAD est modifié à partir du lundi 11/05.',
    cible:'L2-ACAD', date:'2026-05-07', heure:'14:00', auteur:'Chef de Département',
  },
];

const TYPE_STYLE = {
  annonce: { bg:'bg-blue-50', border:'border-blue-200',  icon:Megaphone, iconCls:'text-blue-500', badgeBg:'bg-blue-100',  badgeText:'text-blue-700',  label:'Annonce' },
  reunion: { bg:'bg-purple-50',border:'border-purple-200',icon:Calendar, iconCls:'text-purple-500',badgeBg:'bg-purple-100',badgeText:'text-purple-700',label:'Réunion' },
};

const SALLES_REUNION = ['Salle de réunion A','Salle de réunion B','Amphi A','Amphi B'];

/* ── Pill selector ── */
const PillSelector = ({ label, options, selected, onChange }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 mb-2">{label}</label>
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt} type="button"
          onClick={() => onChange(selected.includes(opt) ? selected.filter(s=>s!==opt) : [...selected, opt])}
          className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-colors
            ${selected.includes(opt) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
          {opt}
        </button>
      ))}
    </div>
  </div>
);

/* ── Annonce Card ── */
const AnnonceCard = ({ annonce, onDelete }) => {
  const s = TYPE_STYLE[annonce.type] || TYPE_STYLE.annonce;
  const Icon = s.icon;
  return (
    <div className={`rounded-2xl border p-5 ${s.bg} ${s.border} flex gap-4`}>
      <div className={`w-9 h-9 rounded-xl bg-white/60 flex items-center justify-center shrink-0`}>
        <Icon className={`w-4.5 h-4.5 ${s.iconCls}`}/>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.badgeBg} ${s.badgeText}`}>{s.label}</span>
              <span className="text-[10px] text-gray-400">{annonce.date} · {annonce.heure}</span>
            </div>
            <h3 className="font-bold text-gray-800 text-sm">{annonce.titre}</h3>
          </div>
          <button onClick={()=>onDelete(annonce.id)} className="p-1 rounded-lg hover:bg-white/60 text-gray-400 hover:text-red-500 transition-colors shrink-0">
            <X className="w-3.5 h-3.5"/>
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{annonce.message}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[11px] text-gray-500 flex items-center gap-1"><Users className="w-3 h-3"/>{annonce.cible}</span>
          {annonce.lieu && <span className="text-[11px] text-gray-500">📍 {annonce.lieu}</span>}
        </div>
      </div>
    </div>
  );
};

/* ══ PAGE ══ */
const Communication = () => {
  const [annonces, setAnnonces]   = useState(INIT_ANNONCES);
  const [type, setType]           = useState('annonce');
  const [titre, setTitre]         = useState('');
  const [message, setMessage]     = useState('');
  const [cibleClasses, setCibleClasses] = useState([]);
  const [cibleProfs, setCibleProfs]     = useState([]);
  const [date, setDate]           = useState('');
  const [heure, setHeure]         = useState('');
  const [lieu, setLieu]           = useState('');
  const [sending, setSending]     = useState(false);
  const [sent, setSent]           = useState(false);

  const handleSubmit = () => {
    if (!titre.trim() || !message.trim()) return;
    setSending(true);
    setTimeout(() => {
      const cibleArr = [...(cibleClasses.length?cibleClasses:[]), ...(cibleProfs.length?cibleProfs:[])];
      const cible = cibleArr.length > 0 ? cibleArr.join(', ') : (type==='reunion' ? 'Tous les enseignants' : 'Toutes les classes');
      const now = new Date();
      setAnnonces(prev=>[{
        id: Date.now(), type, titre, message, cible,
        date: date || now.toISOString().slice(0,10),
        heure: heure || `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`,
        lieu: lieu || undefined,
        auteur: 'Chef de Département',
      }, ...prev]);
      setTitre(''); setMessage(''); setCibleClasses([]); setCibleProfs([]);
      setDate(''); setHeure(''); setLieu('');
      setSending(false); setSent(true);
      setTimeout(()=>setSent(false), 3000);
    }, 800);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Communication</h1>
        <p className="text-sm text-gray-400 mt-0.5">Diffuser des annonces et organiser des réunions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── Formulaire (2/5) ── */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 space-y-4 h-fit">
          <h2 className="font-bold text-gray-700 text-sm">Nouvelle communication</h2>

          {/* Type toggle */}
          <div className="flex gap-2">
            {[{id:'annonce',icon:Megaphone,label:'Annonce'},{id:'reunion',icon:Calendar,label:'Réunion'}].map(t=>(
              <button key={t.id} onClick={()=>setType(t.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition-all
                  ${type===t.id?'bg-blue-600 text-white shadow-sm':'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                <t.icon className="w-4 h-4"/>{t.label}
              </button>
            ))}
          </div>

          {/* Titre */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Titre *</label>
            <input value={titre} onChange={e=>setTitre(e.target.value)} placeholder="Titre de l'annonce..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"/>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Message *</label>
            <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={4}
              placeholder="Contenu du message..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 resize-none"/>
          </div>

          {/* Cible classes */}
          <PillSelector label="Destinataires — Classes" options={CLASSES_LIST} selected={cibleClasses} onChange={setCibleClasses}/>

          {/* Cible profs */}
          <PillSelector label="Destinataires — Enseignants" options={PROFS_LIST} selected={cibleProfs} onChange={setCibleProfs}/>

          {/* Champs réunion */}
          {type === 'reunion' && (
            <div className="space-y-3 border-t border-gray-100 pt-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Détails de la réunion</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Date</label>
                  <input type="date" value={date} onChange={e=>setDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Heure</label>
                  <input type="time" value={heure} onChange={e=>setHeure(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Lieu</label>
                <select value={lieu} onChange={e=>setLieu(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">— Choisir une salle —</option>
                  {SALLES_REUNION.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Bouton envoyer */}
          <button onClick={handleSubmit} disabled={sending||!titre||!message}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all
              ${sent ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed'}`}>
            {sent ? <><Bell className="w-4 h-4"/>Envoyé ✓</> : sending ? 'Envoi en cours...' : <><Send className="w-4 h-4"/>Envoyer</>}
          </button>
        </div>

        {/* ── Historique (3/5) ── */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-700 text-sm">Historique ({annonces.length})</h2>
          </div>
          {annonces.length === 0
            ? <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 text-gray-400"><Megaphone className="w-8 h-8 mx-auto mb-2 opacity-30"/><p className="text-sm">Aucune communication envoyée</p></div>
            : annonces.map(a=><AnnonceCard key={a.id} annonce={a} onDelete={id=>setAnnonces(prev=>prev.filter(x=>x.id!==id))}/>)
          }
        </div>
      </div>
    </div>
  );
};
export default Communication;
