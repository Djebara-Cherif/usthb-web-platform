import React, { useState } from "react";
import { createPortal } from "react-dom"; // <-- AJOUTÉ
import { Plus, ChevronDown, X, BookOpen, FileText, FlaskConical, Trash2, Upload, Info } from "lucide-react";

const MY_CLASSES = [
  { id: "c1", label: "M1 GL — Groupe 01", level: "Master 1"  },
  { id: "c2", label: "M1 GL — Groupe 02", level: "Master 1"  },
  { id: "c3", label: "M2 GL — Groupe 01", level: "Master 2"  },
  { id: "c4", label: "L3 Info — Groupe 02", level: "Licence 3" },
];

const TYPE_CONFIG = {
  Cours: { icon: BookOpen,     color: "bg-blue-100 text-blue-600",   border: "border-blue-200"   },
  TD:    { icon: FileText,     color: "bg-green-100 text-green-600", border: "border-green-200"  },
  TP:    { icon: FlaskConical, color: "bg-orange-100 text-orange-600", border: "border-orange-200"},
};

function Dropdown({ value, options, onChange, renderOption, minWidth = "210px" }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} style={{ minWidth }} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-300 shadow-sm transition justify-between">
        <span className="truncate">{typeof value === "string" ? value : value?.label}</span>
        <ChevronDown size={14} className={`text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-12 left-0 bg-white border border-gray-100 rounded-xl shadow-xl z-50 w-64 py-1.5">
            {options.map((o, i) => {
              const key = typeof o === "string" ? o : o.id;
              const active = typeof value === "string" ? value === o : value?.id === o.id;
              return (
                <button key={key ?? i} onClick={() => { onChange(o); setOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition ${active ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"}`}>
                  {renderOption ? renderOption(o) : o}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function AddCourseModal({ onClose, onAdd }) {
  const [nom,      setNom]      = useState("");
  const [type,     setType]     = useState("Cours");
  const [classe,   setClasse]   = useState(MY_CLASSES[0]);
  const [fileName, setFileName] = useState("");
  const [error,    setError]    = useState("");

  const handleSubmit = () => {
    if (!nom.trim()) { setError("Le nom du cours est requis."); return; }
    onAdd({ nom: nom.trim(), type, classe: classe.label, fichier: fileName || "—", date: new Date().toISOString().slice(0, 10) });
    onClose();
  };

  // <-- ICI LE CORRECTIF CREATEPORTAL -->
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col z-10" onClick={(e) => e.stopPropagation()}>
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-blue-600">
          <h3 className="text-sm font-bold text-white">Ajouter un cours</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/80 hover:text-white transition"><X size={18} /></button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Nom du cours <span className="text-red-400">*</span></label>
            <input type="text" placeholder="Ex : Algorithmique — Chapitre 3" value={nom} onChange={(e) => { setNom(e.target.value); setError(""); }} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
            {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Type de séance</label>
            <div className="flex gap-2">
              {Object.entries(TYPE_CONFIG).map(([t, cfg]) => (
                <button key={t} type="button" onClick={() => setType(t)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-medium transition ${type === t ? `${cfg.color} ${cfg.border}` : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                  <cfg.icon size={15} />{t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Classe concernée</label>
            <Dropdown value={classe} options={MY_CLASSES} onChange={setClasse} minWidth="100%" renderOption={(c) => (<div><p className="font-medium">{c.label}</p><p className="text-xs text-gray-400">{c.level}</p></div>)} />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Fichier (optionnel)</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-5 hover:border-blue-300 transition cursor-pointer">
              <Upload size={22} className="text-gray-300 mb-2" />
              <p className="text-xs text-gray-400">{fileName ? <span className="text-blue-500 font-medium">{fileName}</span> : <>Glissez un fichier ou <span className="text-blue-500">parcourir</span></>}</p>
              <p className="text-[11px] text-gray-300 mt-0.5">PDF, DOCX, PPTX (max 20 Mo)</p>
              <input type="file" className="hidden" accept=".pdf,.docx,.pptx" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
            </label>
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 bg-white text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition">Annuler</button>
          <button onClick={handleSubmit} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm transition">Ajouter</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function GestionCours() {
  const [courses,   setCourses]   = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [classFilt, setClassFilt] = useState("Toutes les classes");
  const [typeFilt,  setTypeFilt]  = useState("Tous");

  const classOptions = ["Toutes les classes", ...MY_CLASSES.map((c) => c.label)];
  const typeOptions  = ["Tous", "Cours", "TD", "TP"];

  const filtered = courses.filter((c) => {
    const matchC = classFilt === "Toutes les classes" || c.classe === classFilt;
    const matchT = typeFilt  === "Tous"              || c.type   === typeFilt;
    return matchC && matchT;
  });

  const handleAdd = (newCourse) => setCourses((prev) => [{ id: Date.now(), ...newCourse }, ...prev]);
  const handleDelete = (id) => setCourses((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gestion des cours</h2>
          <p className="text-sm text-gray-400">{filtered.length} ressource(s)</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-sm"><Plus size={16} /> Ajouter un cours</button>
      </div>

      <div className="flex gap-3 flex-wrap items-center">
        <Dropdown value={classFilt} options={classOptions} onChange={setClassFilt} />
        <div className="flex gap-2">
          {typeOptions.map((t) => (
            <button key={t} onClick={() => setTypeFilt(t)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${typeFilt === t ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"}`}>{t}</button>
          ))}
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <BookOpen size={36} className="text-gray-200 mb-3" />
          <p className="text-sm text-gray-400">Aucun cours disponible</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-400">Aucun cours pour cette sélection</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => {
            const cfg = TYPE_CONFIG[c.type] || TYPE_CONFIG.Cours;
            return (
              <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-4">
                <div className="flex items-start justify-between mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.color}`}><cfg.icon size={12} />{c.type}</span>
                  <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition"><Trash2 size={14} /></button>
                </div>
                <p className="text-sm font-semibold text-gray-800 mb-1 leading-snug">{c.nom}</p>
                <p className="text-xs text-blue-500 font-medium mb-3">{c.classe}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
                  <span className="truncate max-w-[120px]">{c.fichier}</span><span>{c.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && <AddCourseModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}
    </div>
  );
}