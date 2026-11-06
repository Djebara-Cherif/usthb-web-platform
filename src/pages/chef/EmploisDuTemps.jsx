import { useState } from 'react';
import { CheckCircle, Clock, Pencil, Plus, ChevronDown } from 'lucide-react';
import Modal from '../../components/Modal';

// ── Constants ──────────────────────────────────────────────────────
const DAYS     = ['Dim','Lun','Mar','Mer','Jeu'];
const SLOTS    = ['08:00–09:30','09:30–11:00','11:00–12:30','13:30–15:00','15:00–16:30','16:30–18:00'];
const CLASSES  = ['L1-G01','L1-G02','L1-G03','L1-G04','L2-ACAD-G01','L2-ACAD-G02','L2-ISIL-G01','L2-ISIL-G02','L3-ACAD-G01','L3-ISIL-G01','M1-IA','M1-Cyber','M1-GL','M1-DS','M2-IA'];
const PROFS    = ['Pr. Ouali L.','Dr. Benaissa T.','Dr. Kara Y.','Pr. Zerrouk F.','Dr. Amrani S.','Pr. Belarbi M.','Dr. Boufama L.','Dr. Bouziane O.'];
const ROOMS    = ['Amphi A','Amphi B','Salle 101','Salle 102','Salle 201','Labo Info 1','Labo Info 2'];
const MODULES  = ['Algorithmique 1','Architecture des Ord.','Programmation (C)','Analyse 1','Algèbre 1','BDD Avancée','Réseaux','IA','Génie Logiciel'];
const TYPES    = ['Cours','TD','TP'];
const TYPE_CLS = { Cours:'bg-blue-100 text-blue-700', TD:'bg-green-100 text-green-700', TP:'bg-orange-100 text-orange-700' };

// ── Mock schedule ─────────────────────────────────────────────────
const buildSchedule = () => {
  const s = {};
  CLASSES.forEach(cl => {
    s[cl] = {};
    DAYS.forEach(d => { s[cl][d] = {}; });
    // Seed a few sessions
    const sessions = [
      { day:'Dim', slot:'08:00–09:30', module:'Algorithmique 1', prof:'Pr. Ouali L.',    room:'Amphi A',    type:'Cours' },
      { day:'Dim', slot:'09:30–11:00', module:'Analyse 1',       prof:'Pr. Zerrouk F.', room:'Salle 101',  type:'TD'    },
      { day:'Lun', slot:'08:00–09:30', module:'Architecture des Ord.', prof:'Dr. Benaissa T.', room:'Labo Info 1', type:'TP' },
      { day:'Lun', slot:'13:30–15:00', module:'Programmation (C)', prof:'Dr. Kara Y.',  room:'Labo Info 2', type:'TP'   },
      { day:'Mar', slot:'08:00–09:30', module:'Algèbre 1',        prof:'Dr. Hadjadj M.','room':'Salle 201', type:'TD'   },
      { day:'Mer', slot:'11:00–12:30', module:'Algorithmique 1',  prof:'Pr. Ouali L.', room:'Salle 102',   type:'TD'   },
    ];
    sessions.forEach(ses => {
      s[cl][ses.day][ses.slot] = { ...ses, id: `${cl}-${ses.day}-${ses.slot}` };
    });
  });
  return s;
};

const buildProfSchedule = () => {
  const s = {};
  PROFS.forEach(p => {
    s[p] = {};
    DAYS.forEach(d => { s[p][d] = {}; });
    const sessions = [
      { day:'Dim', slot:'08:00–09:30', module:'Algorithmique 1', classe:'L1-G01', room:'Amphi A',    type:'Cours' },
      { day:'Lun', slot:'08:00–09:30', module:'Algorithmique 1', classe:'L1-G02', room:'Amphi A',    type:'Cours' },
      { day:'Mer', slot:'11:00–12:30', module:'Algorithmique 1', classe:'L1-G01', room:'Salle 102',  type:'TD'    },
    ];
    if (p === 'Pr. Ouali L.') {
      sessions.forEach(ses => { s[p][ses.day][ses.slot] = { ...ses, id: `${p}-${ses.day}-${ses.slot}` }; });
    }
  });
  return s;
};

const EMPTY_SES = { module:'', prof:PROFS[0], room:ROOMS[0], type:'Cours', classe:CLASSES[0] };

// ── Session Card ──────────────────────────────────────────────────
const SessionCard = ({ session, onEdit }) => (
  <div className={`p-2 rounded-lg text-xs border-l-2 ${
    session.type==='Cours' ? 'bg-blue-50 border-blue-400' :
    session.type==='TD'    ? 'bg-green-50 border-green-400' :
                             'bg-orange-50 border-orange-400'
  }`}>
    <p className="font-bold text-gray-700 leading-tight truncate">{session.module}</p>
    <p className="text-gray-500 mt-0.5 truncate">{session.prof || session.classe}</p>
    <div className="flex items-center justify-between mt-1">
      <span className="text-gray-400">{session.room}</span>
      <button onClick={() => onEdit(session)} className="p-0.5 hover:bg-white rounded transition">
        <Pencil className="w-2.5 h-2.5 text-gray-400" />
      </button>
    </div>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────
const EmploisDuTemps = () => {
  const [viewMode, setViewMode]     = useState('classe');
  const [selClass, setSelClass]     = useState(CLASSES[0]);
  const [selProf, setSelProf]       = useState(PROFS[0]);
  const [schedules, setSchedules]   = useState(buildSchedule);
  const [profSched, setProfSched]   = useState(buildProfSchedule);
  const [validated, setValidated]   = useState({});
  const [modal, setModal]           = useState(false);
  const [editing, setEditing]       = useState(null);
  const [editCtx, setEditCtx]       = useState({ day:'', slot:'' });
  const [form, setForm]             = useState(EMPTY_SES);

  const currentKey = viewMode === 'classe' ? selClass : selProf;
  const currentData = viewMode === 'classe' ? schedules : profSched;
  const isValidated = validated[currentKey];

  const getSession = (day, slot) => currentData[currentKey]?.[day]?.[slot];

  const openEdit = (ses) => {
    setEditing(ses);
    setEditCtx({ day: ses.day, slot: ses.slot });
    setForm({ module: ses.module, prof: ses.prof || '', room: ses.room, type: ses.type, classe: ses.classe || selClass });
    setModal(true);
  };

  const openAdd = (day, slot) => {
    setEditing(null);
    setEditCtx({ day, slot });
    setForm({ ...EMPTY_SES, classe: selClass });
    setModal(true);
  };

  const handleSubmit = () => {
    if (!form.module) return;
    const { day, slot } = editCtx;
    const newSession = { ...form, day, slot, id: `${currentKey}-${day}-${slot}` };
    if (viewMode === 'classe') {
      setSchedules(prev => ({
        ...prev, [selClass]: { ...prev[selClass], [day]: { ...prev[selClass]?.[day], [slot]: newSession } }
      }));
    } else {
      setProfSched(prev => ({
        ...prev, [selProf]: { ...prev[selProf], [day]: { ...prev[selProf]?.[day], [slot]: newSession } }
      }));
    }
    setModal(false);
  };

  const handleValidate = () => setValidated(p => ({...p, [currentKey]: !p[currentKey]}));

  const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition";
  const f = k => e => setForm(p => ({...p, [k]: e.target.value}));

  return (
    <div className="max-w-full space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Emplois du Temps</h2>
          <p className="text-sm text-gray-400 mt-0.5">Consultation et validation des plannings</p>
        </div>
        <button
          onClick={handleValidate}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition shadow-sm ${
            isValidated ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          {isValidated ? 'Planning validé ✓' : 'Valider le planning'}
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Mode tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            {['classe','prof'].map(m => (
              <button key={m} onClick={() => setViewMode(m)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all capitalize ${viewMode===m ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {m === 'classe' ? 'Par Classe' : 'Par Enseignant'}
              </button>
            ))}
          </div>

          {/* Selector */}
          <div className="relative flex-1 max-w-xs">
            <select
              value={viewMode === 'classe' ? selClass : selProf}
              onChange={e => viewMode === 'classe' ? setSelClass(e.target.value) : setSelProf(e.target.value)}
              className="appearance-none w-full pl-3 pr-8 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
            >
              {(viewMode === 'classe' ? CLASSES : PROFS).map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Status badge */}
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${isValidated ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {isValidated ? 'Validé' : 'Brouillon'}
          </span>
        </div>
      </div>

      {/* Schedule grid */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="w-28 px-3 py-3 text-xs font-semibold text-gray-500 text-left">
                  <Clock className="w-3.5 h-3.5 inline mr-1" />Horaire
                </th>
                {DAYS.map(d => (
                  <th key={d} className="px-2 py-3 text-xs font-bold text-gray-600 text-center">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SLOTS.map((slot, si) => (
                <tr key={slot} className={`border-b border-gray-50 ${si === 2 ? 'border-b-4 border-gray-100' : ''}`}>
                  <td className="px-3 py-2 text-xs text-gray-400 font-medium whitespace-nowrap align-top pt-3">{slot}</td>
                  {DAYS.map(day => {
                    const ses = getSession(day, slot);
                    return (
                      <td key={day} className="p-1.5 align-top h-20">
                        {ses ? (
                          <SessionCard session={ses} onEdit={openEdit} />
                        ) : (
                          <button
                            onClick={() => openAdd(day, slot)}
                            className="w-full h-full min-h-[60px] rounded-lg border-2 border-dashed border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors flex items-center justify-center group"
                          >
                            <Plus className="w-3 h-3 text-gray-200 group-hover:text-blue-400 transition-colors" />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="font-semibold">Légende :</span>
        {Object.entries(TYPE_CLS).map(([type, cls]) => (
          <span key={type} className={`px-2 py-0.5 rounded-full font-semibold ${cls}`}>{type}</span>
        ))}
      </div>

      {/* Session Modal */}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Modifier la séance' : 'Ajouter une séance'} size="md">
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-700 font-medium">
            {editCtx.day} — {editCtx.slot}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Module *</label>
            <select value={form.module} onChange={f('module')} className={inputCls}>
              <option value="">Choisir un module…</option>
              {MODULES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          {viewMode === 'classe' && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Enseignant</label>
              <select value={form.prof} onChange={f('prof')} className={inputCls}>
                {PROFS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          )}
          {viewMode === 'prof' && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Classe</label>
              <select value={form.classe} onChange={f('classe')} className={inputCls}>
                {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
              <select value={form.type} onChange={f('type')} className={inputCls}>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Salle</label>
              <select value={form.room} onChange={f('room')} className={inputCls}>
                {ROOMS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button onClick={() => setModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition">Annuler</button>
            <button onClick={handleSubmit} className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition">
              {editing ? 'Enregistrer' : 'Ajouter'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmploisDuTemps;
