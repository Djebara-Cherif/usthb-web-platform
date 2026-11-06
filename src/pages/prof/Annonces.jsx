import React, { useState } from "react";
import { createPortal } from "react-dom"; // <-- AJOUTÉ
import { Plus, X, Edit2, Trash2, Megaphone, ChevronDown, CheckSquare, Square, Calendar, Users, Info } from "lucide-react";

// ─── Placeholder classes ──────────────
const MY_CLASSES = [
  { id: "c1", label: "M1 GL — Groupe 01" },
  { id: "c2", label: "M1 GL — Groupe 02" },
  { id: "c3", label: "M2 GL — Groupe 01" },
  { id: "c4", label: "L3 Info — Groupe 02" },
];

const STATUS_CONFIG = {
  Publié:   { style: "bg-green-100 text-green-600",  dot: "bg-green-500"  },
  Brouillon:{ style: "bg-yellow-100 text-yellow-600",dot: "bg-yellow-500" },
  Archivé:  { style: "bg-gray-100 text-gray-500",    dot: "bg-gray-400"   },
};

function ClassMultiSelect({ selected, onChange }) {
  const [open, setOpen] = useState(false);

  const toggle = (cls) => {
    if (cls === "Toutes les classes") {
      onChange(selected.length === MY_CLASSES.length ? [] : MY_CLASSES.map((c) => c.label));
      return;
    }
    onChange(
      selected.includes(cls)
        ? selected.filter((s) => s !== cls)
        : [...selected, cls]
    );
  };

  const allSelected = selected.length === MY_CLASSES.length;
  const displayLabel =
    selected.length === 0              ? "Choisir les classes"   :
    allSelected                        ? "Toutes les classes"    :
    selected.length === 1              ? selected[0]             :
                                         `${selected.length} classes`;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-blue-300 transition bg-white"
      >
        <span className={`truncate ${selected.length === 0 ? "text-gray-400" : "text-gray-700"}`}>
          {displayLabel}
        </span>
        <ChevronDown size={14} className={`text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-12 left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1.5">
            <button onClick={() => toggle("Toutes les classes")} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition text-sm">
              {allSelected ? <CheckSquare size={16} className="text-blue-600 flex-shrink-0" /> : <Square size={16} className="text-gray-300 flex-shrink-0" />}
              <span className={allSelected ? "text-blue-600 font-semibold" : "text-gray-700"}>Toutes les classes</span>
            </button>
            <div className="border-t border-gray-100 my-1" />
            {MY_CLASSES.map((c) => {
              const checked = selected.includes(c.label);
              return (
                <button key={c.id} onClick={() => toggle(c.label)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition text-sm">
                  {checked ? <CheckSquare size={16} className="text-blue-600 flex-shrink-0" /> : <Square size={16} className="text-gray-300 flex-shrink-0" />}
                  <span className={checked ? "text-blue-600 font-medium" : "text-gray-700"}>{c.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function AnnonceModal({ annonce, onClose, onSave }) {
  const isEdit = Boolean(annonce);
  const [titre,   setTitre]   = useState(annonce?.titre   ?? "");
  const [contenu, setContenu] = useState(annonce?.contenu ?? "");
  const [classes, setClasses] = useState(annonce?.classes ?? []);
  const [statut,  setStatut]  = useState(annonce?.statut  ?? "Publié");
  const [errors,  setErrors]  = useState({});

  const validate = () => {
    const e = {};
    if (!titre.trim())   e.titre   = "Le titre est requis.";
    if (!contenu.trim()) e.contenu = "Le contenu est requis.";
    if (classes.length === 0) e.classes = "Sélectionnez au moins une classe.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({
      id:      annonce?.id ?? Date.now(),
      titre:   titre.trim(),
      contenu: contenu.trim(),
      classes,
      statut,
      date:    annonce?.date ?? new Date().toLocaleDateString("fr-FR"),
    });
    onClose();
  };

  // <-- ICI LE CORRECTIF CREATEPORTAL -->
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-blue-600">
          <h3 className="text-sm font-bold text-white">{isEdit ? "Modifier l'annonce" : "Nouvelle annonce"}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/20 text-white/80 transition"><X size={18} /></button>
        </div>

        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Titre <span className="text-red-400">*</span></label>
            <input type="text" placeholder="Ex : Examen de rattrapage — Algorithmique" value={titre} onChange={(e) => { setTitre(e.target.value); setErrors((p) => ({ ...p, titre: "" })); }} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
            {errors.titre && <p className="text-red-500 text-xs mt-1">{errors.titre}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Contenu <span className="text-red-400">*</span></label>
            <textarea placeholder="Rédigez le contenu de l'annonce..." value={contenu} onChange={(e) => { setContenu(e.target.value); setErrors((p) => ({ ...p, contenu: "" })); }} rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300" />
            {errors.contenu && <p className="text-red-500 text-xs mt-1">{errors.contenu}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Destinataires <span className="text-red-400">*</span></label>
            <ClassMultiSelect selected={classes} onChange={setClasses} />
            {errors.classes && <p className="text-red-500 text-xs mt-1">{errors.classes}</p>}
            {classes.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {classes.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                    {c} <button type="button" onClick={() => setClasses((p) => p.filter((x) => x !== c))}><X size={10} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Statut</label>
            <div className="flex gap-2">
              {["Publié", "Brouillon"].map((s) => {
                const cfg = STATUS_CONFIG[s];
                return (
                  <button key={s} type="button" onClick={() => setStatut(s)} className={`flex-1 py-2 rounded-xl text-sm font-medium border-2 transition ${statut === s ? `${cfg.style} border-current` : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 text-gray-600 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition">Annuler</button>
          <button onClick={handleSubmit} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 shadow-sm transition">{isEdit ? "Enregistrer" : "Publier"}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function AnnoncesProf() {
  const [annonces,    setAnnonces]    = useState([]);
  const [showModal,   setShowModal]   = useState(false);
  const [editTarget,  setEditTarget]  = useState(null);
  const [filterStat,  setFilterStat]  = useState("Tous");

  const statusFilters = ["Tous", "Publié", "Brouillon", "Archivé"];
  const displayed = annonces.filter((a) => filterStat === "Tous" || a.statut === filterStat);

  const handleSave = (ann) => {
    setAnnonces((prev) => prev.some((a) => a.id === ann.id) ? prev.map((a) => (a.id === ann.id ? ann : a)) : [ann, ...prev]);
  };
  const handleDelete = (id) => setAnnonces((prev) => prev.filter((a) => a.id !== id));
  const openEdit = (ann) => { setEditTarget(ann); setShowModal(true); };
  const openAdd  = ()    => { setEditTarget(null); setShowModal(true); };

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Annonces</h2>
          <p className="text-sm text-gray-400">Publications destinées à vos étudiants</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-sm"><Plus size={16} /> Nouvelle annonce</button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {statusFilters.map((s) => (
          <button key={s} onClick={() => setFilterStat(s)} className={`px-4 py-1.5 rounded-full text-xs font-medium border transition ${filterStat === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"}`}>{s}</button>
        ))}
      </div>

      {annonces.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Megaphone size={36} className="text-gray-200 mb-3" />
          <p className="text-sm text-gray-400">Aucune annonce publiée</p>
          <button onClick={openAdd} className="mt-5 flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition"><Plus size={15} /> Créer une annonce</button>
        </div>
      ) : displayed.length === 0 ? (
        <div className="py-12 text-center text-sm text-gray-400 bg-white rounded-2xl border border-gray-100">Aucune annonce avec ce statut</div>
      ) : (
        <div className="space-y-3">
          {displayed.map((ann) => {
            const cfg = STATUS_CONFIG[ann.statut] || STATUS_CONFIG.Brouillon;
            return (
              <div key={ann.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.style}`}><span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />{ann.statut}</span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{ann.titre}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{ann.contenu}</p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400"><Users size={12} /><span>{ann.classes?.length === MY_CLASSES.length ? "Toutes les classes" : ann.classes?.join(", ")}</span></div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400"><Calendar size={12} /><span>{ann.date}</span></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => openEdit(ann)} className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"><Edit2 size={15} /></button>
                    <button onClick={() => handleDelete(ann.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"><Trash2 size={15} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && <AnnonceModal annonce={editTarget} onClose={() => { setShowModal(false); setEditTarget(null); }} onSave={handleSave} />}
    </div>
  );
}