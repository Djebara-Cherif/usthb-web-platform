import { useState } from 'react';
import { Plus, Search, Mail, Phone, Clock, Pencil, Trash2, ChevronDown } from 'lucide-react';
import Modal from '../../components/Modal';

// ── Constants ──────────────────────────────────────────────────────
const GRADES = [
  'Professeur',
  'Maître de conférences A',
  'Maître de conférences B',
  'Maître assistant A',
  'Maître assistant B',
];

const ALL_MODULES = [
  'INF101','INF102','INF103','INF104','INF105','INF201','INF202','INF203',
  'INF301','INF302','INF303','INF401','INF402','INF403','INF404','INF405',
  'INF501','INF502','INF601','MAT101','MAT102','MAT201','LAN101',
];

const ALL_CLASSES = [
  'L1-G01','L1-G02','L1-G03','L1-G04',
  'L2-ACAD-G01','L2-ACAD-G02','L2-ISIL-G01','L2-ISIL-G02',
  'L3-ACAD-G01','L3-ACAD-G02','L3-ISIL-G01','L3-ISIL-G02',
  'M1-IA','M1-Cyber','M1-GL','M1-DS',
  'M2-IA','M2-Cyber','M2-GL','M2-DS',
];

const AVATAR_BG = [
  'bg-purple-100 text-purple-700','bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700','bg-orange-100 text-orange-700',
  'bg-pink-100 text-pink-700','bg-teal-100 text-teal-700',
];
const SPEC_COLOR = [
  'text-purple-600 bg-purple-50','text-blue-600 bg-blue-50',
  'text-green-600 bg-green-50','text-orange-600 bg-orange-50',
  'text-pink-600 bg-pink-50','text-teal-600 bg-teal-50',
];

// ── Mock data ──────────────────────────────────────────────────────
const INITIAL = [
  { id:1, prenom:'Karim',   nom:'Meziani',  grade:'Maître de conférences A', specialite:'Algorithmique',           modules:['INF401','INF501'], classes:['L3-ACAD-G01','L3-ISIL-G01'], email:'k.meziani@usthb.dz',  phone:'+213 555 001', heures:12 },
  { id:2, prenom:'Sara',    nom:'Amrani',   grade:'Maître de conférences B', specialite:'Bases de Données',         modules:['INF402','INF302'], classes:['L2-ACAD-G01','L3-ACAD-G01'], email:'s.amrani@usthb.dz',   phone:'+213 555 002', heures:10 },
  { id:3, prenom:'Rachid',  nom:'Kaci',     grade:'Maître assistant A',      specialite:'Réseaux',                  modules:['INF403'],          classes:['L2-ISIL-G01'],               email:'r.kaci@usthb.dz',     phone:'+213 555 003', heures:9  },
  { id:4, prenom:'Mohamed', nom:'Belarbi',  grade:'Professeur',              specialite:'Génie Logiciel',           modules:['INF404','INF601'], classes:['M1-GL','M2-GL'],             email:'m.belarbi@usthb.dz',  phone:'+213 555 004', heures:8  },
  { id:5, prenom:'Lynda',   nom:'Boufama',  grade:'Maître de conférences A', specialite:'Intelligence Artificielle',modules:['INF405','INF502'], classes:['M1-IA','M1-Cyber'],          email:'l.boufama@usthb.dz',  phone:'+213 555 005', heures:11 },
  { id:6, prenom:'Omar',    nom:'Bouziane', grade:'Maître assistant B',      specialite:'Sécurité Informatique',    modules:['INF601'],          classes:['M1-Cyber'],                  email:'o.bouziane@usthb.dz', phone:'+213 555 006', heures:8  },
];

const EMPTY_FORM = { prenom:'', nom:'', grade:GRADES[0], specialite:'', modules:[], classes:[], email:'', phone:'', heures:6 };

// ── Sub-components ─────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
    {children}
  </div>
);
const Input = (props) => (
  <input {...props} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition" />
);

const TeacherCard = ({ teacher, index, onEdit, onDelete }) => {
  const initials = `${teacher.prenom[0]}${teacher.nom[0]}`;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${AVATAR_BG[index % AVATAR_BG.length]}`}>
            {initials}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">{teacher.prenom} {teacher.nom}</p>
            <p className="text-xs text-gray-400">{teacher.grade}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button onClick={() => onEdit(teacher)} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-300 hover:text-blue-500 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
          <button onClick={() => onDelete(teacher)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start ${SPEC_COLOR[index % SPEC_COLOR.length]}`}>{teacher.specialite}</span>
      <div className="flex flex-wrap gap-1.5">
        {teacher.modules.map(m => (
          <span key={m} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-mono">{m}</span>
        ))}
      </div>
      <div className="space-y-1 text-xs text-gray-500">
        <div className="flex items-center gap-2"><Mail className="w-3 h-3 shrink-0" />{teacher.email}</div>
        <div className="flex items-center gap-2"><Phone className="w-3 h-3 shrink-0" />{teacher.phone}</div>
        <div className="flex items-center gap-2"><Clock className="w-3 h-3 shrink-0" />{teacher.heures}h / semaine</div>
      </div>
    </div>
  );
};

// ── Main component ─────────────────────────────────────────────────
const Enseignants = () => {
  const [teachers, setTeachers]     = useState(INITIAL);
  const [search, setSearch]         = useState('');
  const [filterGrade, setFilter]    = useState('Tous');
  const [modalOpen, setModalOpen]   = useState(false);
  const [editing, setEditing]       = useState(null);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [deleteTarget, setDelTarget] = useState(null);

  const filtered = teachers.filter(t => {
    const q = search.toLowerCase();
    const matchQ = `${t.prenom} ${t.nom} ${t.specialite}`.toLowerCase().includes(q);
    const matchG = filterGrade === 'Tous' || t.grade === filterGrade;
    return matchQ && matchG;
  });

  const openAdd = () => { setEditing(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = t => { setEditing(t); setForm({...t}); setModalOpen(true); };

  const f = key => e => setForm(p => ({...p, [key]: e.target.value}));
  const toggle = (key, val) => setForm(p => ({
    ...p, [key]: p[key].includes(val) ? p[key].filter(x => x !== val) : [...p[key], val]
  }));

  const handleSubmit = () => {
    if (!form.prenom || !form.nom || !form.email) return;
    if (editing) {
      setTeachers(p => p.map(t => t.id === editing.id ? {...form, id: editing.id} : t));
    } else {
      setTeachers(p => [...p, {...form, id: Date.now()}]);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    setTeachers(p => p.filter(t => t.id !== deleteTarget.id));
    setDelTarget(null);
  };

  const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition";

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Corps Enseignant</h2>
          <p className="text-sm text-gray-400 mt-0.5">{teachers.length} enseignants — Département IF</p>
        </div>
        <button onClick={openAdd} className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-200 transition">
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
        </div>
        <div className="relative">
          <select value={filterGrade} onChange={e => setFilter(e.target.value)}
            className="appearance-none w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
            <option value="Tous">Tous</option>
            {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t, i) => <TeacherCard key={t.id} teacher={t} index={i} onEdit={openEdit} onDelete={setDelTarget} />)}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16 text-gray-400 text-sm">Aucun enseignant trouvé.</div>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Modifier l'enseignant" : "Ajouter un enseignant"} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Prénom *">
              <input value={form.prenom} onChange={f('prenom')} placeholder="Prénom" className={inputCls} />
            </Field>
            <Field label="Nom *">
              <input value={form.nom} onChange={f('nom')} placeholder="Nom" className={inputCls} />
            </Field>
          </div>

          <Field label="Grade *">
            <select value={form.grade} onChange={f('grade')} className={inputCls}>
              {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </Field>

          <Field label="Spécialité">
            <input value={form.specialite} onChange={f('specialite')} placeholder="Ex: Algorithmique, IA…" className={inputCls} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Email *">
              <input type="email" value={form.email} onChange={f('email')} placeholder="x.nom@usthb.dz" className={inputCls} />
            </Field>
            <Field label="Téléphone">
              <input value={form.phone} onChange={f('phone')} placeholder="+213 XXX XXX" className={inputCls} />
            </Field>
          </div>

          <Field label="Volume horaire (h/semaine)">
            <input type="number" min={1} max={30} value={form.heures} onChange={f('heures')} className={inputCls} />
          </Field>

          <Field label="Modules enseignés">
            <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-100">
              {ALL_MODULES.map(m => (
                <button key={m} type="button" onClick={() => toggle('modules', m)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-mono transition-colors ${form.modules.includes(m) ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'}`}>
                  {m}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Classes assignées">
            <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-100">
              {ALL_CLASSES.map(c => (
                <button key={c} type="button" onClick={() => toggle('classes', c)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors ${form.classes.includes(c) ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'}`}>
                  {c}
                </button>
              ))}
            </div>
          </Field>

          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition">Annuler</button>
            <button onClick={handleSubmit} className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition">
              {editing ? 'Enregistrer' : 'Ajouter'}
            </button>
          </div>
        </div>
      </Modal>

      {/* ── Delete Confirm ── */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDelTarget(null)} title="Supprimer l'enseignant" size="sm">
        <p className="text-sm text-gray-600 mb-5">
          Supprimer <strong>{deleteTarget?.prenom} {deleteTarget?.nom}</strong> ? Cette action est irréversible.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDelTarget(null)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition">Annuler</button>
          <button onClick={handleDelete} className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition">Supprimer</button>
        </div>
      </Modal>
    </div>
  );
};

export default Enseignants;
