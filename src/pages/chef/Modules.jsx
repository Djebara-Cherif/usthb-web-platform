import { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, Layers } from 'lucide-react';
import Modal from '../../components/Modal';

// ── Config ─────────────────────────────────────────────────────────
const LEVELS = ['L1','L2','L3','M1','M2'];
const LEVEL_LABEL = { L1:'Licence 1', L2:'Licence 2', L3:'Licence 3', M1:'Master 1', M2:'Master 2' };
const LEVEL_CONFIG = {
  L1: { type:'groups',     groups:['G01','G02','G03','G04'] },
  L2: { type:'specialties',specialties:['ACAD','ISIL'],                           groups:['G01','G02'] },
  L3: { type:'specialties',specialties:['ACAD','ISIL'],                           groups:['G01','G02'] },
  M1: { type:'specialties',specialties:['IA','Cybersécurité','Génie Logiciel','Data Science'], groups:['G01','G02'] },
  M2: { type:'specialties',specialties:['IA','Cybersécurité','Génie Logiciel','Data Science'], groups:['G01'] },
};
const TYPES = ['Cours+TD','Cours+TP','Cours','TD','TP'];
const TYPE_CLS = {
  'Cours+TD':'bg-blue-100 text-blue-700',
  'Cours+TP':'bg-orange-100 text-orange-700',
  'Cours':'bg-gray-100 text-gray-600',
  'TD':'bg-green-100 text-green-700',
  'TP':'bg-purple-100 text-purple-700',
};
const CODE_CLS = { INF:'text-blue-600', MAT:'text-blue-500', LAN:'text-gray-500', PHY:'text-green-600' };
const codeColor = code => CODE_CLS[code.slice(0,3)] || 'text-gray-700';

const getKey = (level, spec, grp) => level === 'L1' ? `${level}-${grp}` : `${level}-${spec}-${grp}`;

// ── Seed data ───────────────────────────────────────────────────────
const seed = (id) => ({
  S1:[
    { id:id+1,  code:'INF101', intitule:'Algorithmique & Structures de Données 1', type:'Cours+TD', coeff:6, credits:6, responsable:'Pr. Ouali L.'   },
    { id:id+2,  code:'INF102', intitule:'Architecture des Ordinateurs',            type:'Cours+TP', coeff:5, credits:5, responsable:'Dr. Benaissa T.' },
    { id:id+3,  code:'INF103', intitule:'Programmation Impérative (C)',            type:'Cours+TP', coeff:5, credits:5, responsable:'Dr. Kara Y.'     },
    { id:id+4,  code:'MAT101', intitule:'Analyse 1',                               type:'Cours+TD', coeff:4, credits:4, responsable:'Pr. Zerrouk F.'  },
    { id:id+5,  code:'MAT102', intitule:'Algèbre 1',                               type:'Cours+TD', coeff:4, credits:4, responsable:'Dr. Hadjadj M.'  },
    { id:id+6,  code:'LAN101', intitule:'Anglais Scientifique',                    type:'Cours',    coeff:2, credits:2, responsable:'Mme. Bouzid N.'  },
  ],
  S2:[
    { id:id+7,  code:'INF104', intitule:'Logique Mathématique',                    type:'Cours+TD', coeff:3, credits:3, responsable:'Dr. Amari S.'    },
    { id:id+8,  code:'INF105', intitule:'Algorithmique & Structures de Données 2', type:'Cours+TD', coeff:5, credits:5, responsable:'Pr. Ouali L.'    },
    { id:id+9,  code:'INF106', intitule:'Programmation Orientée Objet',            type:'Cours+TP', coeff:5, credits:5, responsable:'Dr. Kara Y.'     },
    { id:id+10, code:'MAT103', intitule:'Analyse 2',                               type:'Cours+TD', coeff:4, credits:4, responsable:'Pr. Zerrouk F.'  },
    { id:id+11, code:'MAT104', intitule:'Probabilités & Statistiques',             type:'Cours+TD', coeff:3, credits:3, responsable:'Dr. Hadjadj M.'  },
  ],
});

const buildInitialData = () => {
  const data = {};
  let counter = 0;
  LEVELS.forEach(lvl => {
    const cfg = LEVEL_CONFIG[lvl];
    if (cfg.type === 'groups') {
      cfg.groups.forEach(g => { data[getKey(lvl, null, g)] = seed(counter); counter += 20; });
    } else {
      cfg.specialties.forEach(sp => {
        cfg.groups.forEach(g => { data[getKey(lvl, sp, g)] = seed(counter); counter += 20; });
      });
    }
  });
  return data;
};

const EMPTY_MOD = { code:'', intitule:'', type:'Cours+TD', coeff:3, credits:3, responsable:'' };

// ── Module row ─────────────────────────────────────────────────────
const ModRow = ({ mod, onEdit, onDelete }) => (
  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
    <td className="px-4 py-3">
      <span className={`text-xs font-bold font-mono ${codeColor(mod.code)}`}>{mod.code}</span>
    </td>
    <td className="px-4 py-3 text-sm text-gray-700">{mod.intitule}</td>
    <td className="px-4 py-3">
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_CLS[mod.type] || 'bg-gray-100 text-gray-600'}`}>{mod.type}</span>
    </td>
    <td className="px-4 py-3 text-sm text-gray-600 text-center">{mod.coeff}</td>
    <td className="px-4 py-3 text-sm text-gray-600 text-center">{mod.credits}</td>
    <td className="px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[9px] font-bold text-gray-600">
          {mod.responsable.split(' ').map(w => w[0]).join('').slice(0,2)}
        </div>
        <span className="text-xs text-gray-600">{mod.responsable}</span>
      </div>
    </td>
    <td className="px-4 py-3">
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(mod)} className="p-1.5 hover:bg-blue-50 text-gray-400 hover:text-blue-500 rounded-lg transition"><Pencil className="w-3 h-3" /></button>
        <button onClick={() => onDelete(mod)} className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition"><Trash2 className="w-3 h-3" /></button>
      </div>
    </td>
  </tr>
);

// ── Main ───────────────────────────────────────────────────────────
const Modules = () => {
  const [data, setData] = useState(buildInitialData);
  const [level, setLevel]   = useState('L1');
  const [spec, setSpec]     = useState('ACAD');
  const [group, setGroup]   = useState('G01');
  const [modal, setModal]   = useState(false);
  const [editing, setEditing] = useState(null);
  const [editSem, setEditSem] = useState('S1');
  const [form, setForm]     = useState(EMPTY_MOD);
  const [delTarget, setDel] = useState(null);

  const cfg = LEVEL_CONFIG[level];
  const key = getKey(level, spec, group);
  const entry = data[key] || { S1:[], S2:[] };

  const totalCoeff   = [...(entry.S1||[]), ...(entry.S2||[])].reduce((a,m) => a+m.coeff,   0);
  const totalCredits = [...(entry.S1||[]), ...(entry.S2||[])].reduce((a,m) => a+m.credits, 0);

  const f = k => e => setForm(p => ({...p, [k]: e.target.type==='number' ? Number(e.target.value) : e.target.value}));

  const openAdd = (sem) => { setEditing(null); setEditSem(sem); setForm(EMPTY_MOD); setModal(true); };
  const openEdit = (mod, sem) => { setEditing(mod); setEditSem(sem); setForm({...mod}); setModal(true); };

  const handleSubmit = () => {
    if (!form.code || !form.intitule) return;
    setData(prev => {
      const entry = { S1:[...(prev[key]?.S1||[])], S2:[...(prev[key]?.S2||[])] };
      if (editing) {
        entry[editSem] = entry[editSem].map(m => m.id === editing.id ? {...form, id:editing.id} : m);
      } else {
        entry[editSem] = [...entry[editSem], {...form, id: Date.now()}];
      }
      return {...prev, [key]: entry};
    });
    setModal(false);
  };

  const handleDelete = () => {
    setData(prev => {
      const entry = { S1:[...(prev[key]?.S1||[])], S2:[...(prev[key]?.S2||[])] };
      ['S1','S2'].forEach(s => { entry[s] = entry[s].filter(m => m.id !== delTarget.id); });
      return {...prev, [key]: entry};
    });
    setDel(null);
  };

  // When level changes, reset spec/group
  const handleLevel = (l) => {
    setLevel(l);
    const c = LEVEL_CONFIG[l];
    setSpec(c.specialties?.[0] || '');
    setGroup(c.groups[0]);
  };

  const SemTable = ({ sem }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{sem === 'S1' ? 'Semestre 1' : 'Semestre 2'}</h4>
        <button onClick={() => openAdd(sem)} className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition">
          <Plus className="w-3.5 h-3.5" /> Ajouter un module
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Code','Intitulé du module','Type','Coeff.','Crédits','Responsable',''].map(h => (
                <th key={h} className="px-4 py-2.5 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(entry[sem]||[]).map(mod => (
              <ModRow key={mod.id} mod={mod} onEdit={m => openEdit(m, sem)} onDelete={setDel} />
            ))}
            {(entry[sem]||[]).length === 0 && (
              <tr><td colSpan={7} className="px-4 py-6 text-center text-sm text-gray-400">Aucun module</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const PillBtn = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${active ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
      {children}
    </button>
  );

  const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition";

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800">Modules</h2>

      {/* Level filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Niveau</span>
        {LEVELS.map(l => <PillBtn key={l} active={level===l} onClick={() => handleLevel(l)}>{LEVEL_LABEL[l]}</PillBtn>)}
      </div>

      {/* Specialty filter (L2+) */}
      {cfg.type === 'specialties' && (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Spécialité</span>
          {cfg.specialties.map(s => <PillBtn key={s} active={spec===s} onClick={() => { setSpec(s); setGroup(cfg.groups[0]); }}>{s}</PillBtn>)}
        </div>
      )}

      {/* Group filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Groupe</span>
        {cfg.groups.map(g => <PillBtn key={g} active={group===g} onClick={() => setGroup(g)}>{g}</PillBtn>)}
      </div>

      {/* Table header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
              <Layers className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">
                Modules — {level} {cfg.type==='specialties' ? `— ${spec}` : ''} — {group}
              </h3>
              <p className="text-xs text-gray-400">{(entry.S1?.length||0)+(entry.S2?.length||0)} modules</p>
            </div>
          </div>
          <div className="text-xs text-gray-500 flex gap-4">
            <span>Total coeff. : <strong className="text-gray-700">{totalCoeff}</strong></span>
            <span>Total crédits : <strong className="text-gray-700">{totalCredits}</strong></span>
          </div>
        </div>
        <SemTable sem="S1" />
        <SemTable sem="S2" />
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Modifier le module' : 'Ajouter un module'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Code *</label>
              <input value={form.code} onChange={f('code')} placeholder="INF101" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Type *</label>
              <select value={form.type} onChange={f('type')} className={inputCls}>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Intitulé du module *</label>
            <input value={form.intitule} onChange={f('intitule')} placeholder="Ex: Algorithmique & Structures de Données" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Coefficient</label>
              <input type="number" min={1} max={10} value={form.coeff} onChange={f('coeff')} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Crédits</label>
              <input type="number" min={1} max={15} value={form.credits} onChange={f('credits')} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Responsable du module</label>
            <input value={form.responsable} onChange={f('responsable')} placeholder="Ex: Pr. Nom P." className={inputCls} />
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button onClick={() => setModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition">Annuler</button>
            <button onClick={handleSubmit} className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition">
              <Save className="w-3.5 h-3.5" />{editing ? 'Enregistrer' : 'Ajouter'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm */}
      <Modal isOpen={!!delTarget} onClose={() => setDel(null)} title="Supprimer le module" size="sm">
        <p className="text-sm text-gray-600 mb-5">Supprimer le module <strong>{delTarget?.code} — {delTarget?.intitule}</strong> ?</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDel(null)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition">Annuler</button>
          <button onClick={handleDelete} className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition">Supprimer</button>
        </div>
      </Modal>
    </div>
  );
};

export default Modules;
