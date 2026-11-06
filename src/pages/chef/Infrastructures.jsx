import { useState } from 'react';
import { Plus, Pencil, Trash2, Lock, Wrench, CalendarCheck, CheckCircle, Building2 } from 'lucide-react';
import Modal from '../../components/Modal';

/* ══ CONSTANTES ══ */
const STATUS = {
  disponible:  { label:'Disponible',   bg:'bg-green-100',  text:'text-green-700',  ring:'ring-green-300'  },
  reservee:    { label:'Réservée',     bg:'bg-blue-100',   text:'text-blue-700',   ring:'ring-blue-300'   },
  maintenance: { label:'Maintenance',  bg:'bg-orange-100', text:'text-orange-700', ring:'ring-orange-300' },
  fermee:      { label:'Fermée',       bg:'bg-red-100',    text:'text-red-700',    ring:'ring-red-300'    },
};
const TYPES_SALLE = ['Amphi','Salle TD','Laboratoire','Salle de réunion'];
const BATIMENTS    = ['Bâtiment A','Bâtiment B','Bâtiment C','Bâtiment D'];
const ETAGES       = ['RDC','1er étage','2ème étage','3ème étage'];
const MODULES_LIST = ['INF101','INF102','INF201','INF301','INF401','MAT101'];
const PROFS_LIST   = ['Pr. Meziani K.','Dr. Amrani S.','Dr. Kaci R.','Pr. Belarbi M.'];

/* ══ MOCK DATA — à remplacer par API ══ */
const INIT_SALLES = [
  { id:1, numero:'Amphi A',    type:'Amphi',          capacite:250, batiment:'Bâtiment A', etage:'RDC',        status:'disponible',  note:'' },
  { id:2, numero:'Amphi B',    type:'Amphi',          capacite:200, batiment:'Bâtiment A', etage:'RDC',        status:'reservee',    note:'INF101 · L1-G01 · Pr. Meziani' },
  { id:3, numero:'TD-01',      type:'Salle TD',       capacite:35,  batiment:'Bâtiment B', etage:'1er étage',  status:'disponible',  note:'' },
  { id:4, numero:'TD-02',      type:'Salle TD',       capacite:35,  batiment:'Bâtiment B', etage:'1er étage',  status:'maintenance', note:'Climatisation en panne' },
  { id:5, numero:'TD-03',      type:'Salle TD',       capacite:40,  batiment:'Bâtiment B', etage:'2ème étage', status:'disponible',  note:'' },
  { id:6, numero:'TD-04',      type:'Salle TD',       capacite:35,  batiment:'Bâtiment C', etage:'RDC',        status:'fermee',      note:'Fermeture exceptionnelle' },
  { id:7, numero:'Labo Info 1',type:'Laboratoire',    capacite:30,  batiment:'Bâtiment C', etage:'1er étage',  status:'disponible',  note:'' },
  { id:8, numero:'Labo Info 2',type:'Laboratoire',    capacite:30,  batiment:'Bâtiment C', etage:'2ème étage', status:'reservee',    note:'INF103 · L1-G02 · Dr. Benaissa' },
];
const EMPTY_FORM = { numero:'', type:TYPES_SALLE[0], capacite:'', batiment:BATIMENTS[0], etage:ETAGES[0], status:'disponible', note:'' };

/* ── Status Badge ── */
const StatusBadge = ({ status }) => {
  const s = STATUS[status] || STATUS.disponible;
  return <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>{s.label}</span>;
};

/* ── Room Card ── */
const RoomCard = ({ salle, onEdit, onDelete, onChangeStatus }) => {
  const typeIcons = { Amphi:'🏛️', 'Salle TD':'📋', Laboratoire:'🖥️', 'Salle de réunion':'👥' };
  return (
    <div className={`bg-white rounded-2xl border p-5 flex flex-col gap-3 transition-all hover:shadow-md ring-1 ${STATUS[salle.status]?.ring||'ring-gray-100'} border-transparent`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center text-xl shrink-0">
            {typeIcons[salle.type]||'🏫'}
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm leading-tight">{salle.numero}</p>
            <p className="text-xs text-gray-400 mt-0.5">{salle.type} · {salle.capacite} places</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button onClick={()=>onEdit(salle)} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"><Pencil className="w-3.5 h-3.5"/></button>
          <button onClick={()=>onDelete(salle.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">{salle.batiment} · {salle.etage}</p>
        <StatusBadge status={salle.status}/>
      </div>

      {salle.note && <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-xl">{salle.note}</p>}

      {/* Actions */}
      <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-50">
        {salle.status !== 'reservee' && salle.status !== 'fermee' && (
          <button onClick={()=>onChangeStatus(salle.id,'reservee')}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
            <CalendarCheck className="w-3 h-3"/>Réserver
          </button>
        )}
        {salle.status === 'reservee' && (
          <button onClick={()=>onChangeStatus(salle.id,'disponible')}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors">
            <CheckCircle className="w-3 h-3"/>Libérer
          </button>
        )}
        {salle.status !== 'maintenance' && salle.status !== 'fermee' && (
          <button onClick={()=>onChangeStatus(salle.id,'maintenance')}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors">
            <Wrench className="w-3 h-3"/>Maintenance
          </button>
        )}
        {salle.status !== 'fermee' && (
          <button onClick={()=>onChangeStatus(salle.id,'fermee')}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">
            <Lock className="w-3 h-3"/>Fermer
          </button>
        )}
        {(salle.status === 'maintenance' || salle.status === 'fermee') && (
          <button onClick={()=>onChangeStatus(salle.id,'disponible')}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors">
            <CheckCircle className="w-3 h-3"/>Ouvrir
          </button>
        )}
      </div>
    </div>
  );
};

/* ══ PAGE ══ */
const Infrastructures = () => {
  const [salles, setSalles]       = useState(INIT_SALLES);
  const [statusFilter, setStatusFilter] = useState('tous');
  const [typeFilter, setTypeFilter]     = useState('tous');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [editId, setEditId]       = useState(null);

  /* Stats */
  const stats = Object.entries(STATUS).map(([k,v]) => ({
    ...v, key:k, count: salles.filter(s=>s.status===k).length
  }));

  const filtered = salles.filter(s =>
    (statusFilter === 'tous' || s.status === statusFilter) &&
    (typeFilter   === 'tous' || s.type   === typeFilter)
  );

  const openAdd  = () => { setForm(EMPTY_FORM); setEditId(null); setModalOpen(true); };
  const openEdit = (s) => { setForm({...s}); setEditId(s.id); setModalOpen(true); };
  const handleSave = () => {
    if (!form.numero.trim()) return;
    if (editId) setSalles(prev=>prev.map(s=>s.id===editId?{...s,...form}:s));
    else setSalles(prev=>[...prev,{id:Date.now(),...form}]);
    setModalOpen(false);
  };
  const handleDelete = (id) => { setSalles(prev=>prev.filter(s=>s.id!==id)); setConfirmId(null); };
  const changeStatus = (id, status) => setSalles(prev=>prev.map(s=>s.id===id?{...s,status,note:status==='disponible'?'':s.note}:s));
  const upd = (k,v) => setForm(f=>({...f,[k]:v}));

  const Field = ({label,children}) => <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>{children}</div>;
  const Input = (props) => <input {...props} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"/>;
  const Select = ({opts,...props}) => (
    <select {...props} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
      {opts.map(o=><option key={o}>{o}</option>)}
    </select>
  );

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-blue-600"/>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Infrastructures</h1>
            <p className="text-sm text-gray-400 mt-0.5">{salles.length} salles gérées</p>
          </div>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm w-fit">
          <Plus className="w-4 h-4"/> Ajouter une salle
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(s => (
          <button key={s.key} onClick={()=>setStatusFilter(statusFilter===s.key?'tous':s.key)}
            className={`p-4 rounded-2xl border text-left transition-all ${statusFilter===s.key?`${s.bg} ring-2 ${s.ring}`:'bg-white border-gray-100 hover:shadow-sm'}`}>
            <p className={`text-2xl font-bold ${s.text}`}>{s.count}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </button>
        ))}
      </div>

      {/* Filtres type */}
      <div className="flex flex-wrap gap-2">
        {['tous',...TYPES_SALLE].map(t=>(
          <button key={t} onClick={()=>setTypeFilter(t)}
            className={`text-sm font-medium px-3 py-1.5 rounded-xl transition-colors
              ${typeFilter===t?'bg-blue-600 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {t==='tous'?'Tous les types':t}
          </button>
        ))}
      </div>

      {/* Grid salles */}
      {filtered.length === 0
        ? <div className="text-center py-12 bg-white rounded-2xl border border-gray-100"><p className="text-3xl mb-2">🏫</p><p className="text-sm text-gray-400">Aucune salle trouvée</p></div>
        : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(s=><RoomCard key={s.id} salle={s} onEdit={openEdit} onDelete={id=>setConfirmId(id)} onChangeStatus={changeStatus}/>)}
          </div>
      }

      {/* Modal Ajout/Édition */}
      <Modal isOpen={modalOpen} onClose={()=>setModalOpen(false)} title={editId?'Modifier la salle':'Ajouter une salle'} size="md"
        footer={<>
          <button onClick={()=>setModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl">Annuler</button>
          <button onClick={handleSave} className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl">{editId?'Sauvegarder':'Ajouter'}</button>
        </>}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Numéro / Nom *"><Input value={form.numero} onChange={e=>upd('numero',e.target.value)} placeholder="ex: TD-05"/></Field>
            <Field label="Capacité (places)"><Input type="number" value={form.capacite} onChange={e=>upd('capacite',e.target.value)} placeholder="35"/></Field>
          </div>
          <Field label="Type"><Select opts={TYPES_SALLE} value={form.type} onChange={e=>upd('type',e.target.value)}/></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Bâtiment"><Select opts={BATIMENTS} value={form.batiment} onChange={e=>upd('batiment',e.target.value)}/></Field>
            <Field label="Étage"><Select opts={ETAGES} value={form.etage} onChange={e=>upd('etage',e.target.value)}/></Field>
          </div>
          <Field label="Statut">
            <select value={form.status} onChange={e=>upd('status',e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              {Object.entries(STATUS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
            </select>
          </Field>
          <Field label="Note / Remarque"><Input value={form.note} onChange={e=>upd('note',e.target.value)} placeholder="ex: Maintenance prévue..."/></Field>
        </div>
      </Modal>

      {/* Confirmation suppression */}
      <Modal isOpen={!!confirmId} onClose={()=>setConfirmId(null)} title="Supprimer la salle" size="sm"
        footer={<>
          <button onClick={()=>setConfirmId(null)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl">Annuler</button>
          <button onClick={()=>handleDelete(confirmId)} className="px-5 py-2 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white rounded-xl">Supprimer</button>
        </>}>
        <p className="text-sm text-gray-600">Supprimer cette salle ? Cette action est irréversible.</p>
      </Modal>
    </div>
  );
};
export default Infrastructures;
