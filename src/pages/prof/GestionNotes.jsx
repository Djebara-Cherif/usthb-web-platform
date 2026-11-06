import { useState } from "react";
import { Search, ChevronDown, Save, CheckCircle, FileEdit, Info } from "lucide-react";

// ─── Placeholders (à remplacer par API) ───────────────────────────────────────
const MY_CLASSES = [
  "Toutes les classes",
  "M1 GL — Groupe 01",
  "M1 GL — Groupe 02",
  "M2 GL — Groupe 01",
  "L3 Info — Groupe 02",
];
const MY_MODULES = [
  "Tous les modules",
  "Algorithmique Avancée",
  "Génie Logiciel",
  "Réseaux Avancés",
  "Base de Données",
];

// ─── Calcul moyenne ───────────────────────────────────────────────────────────
function calcMoy(td, tp, exam) {
  const n = parseFloat((((td + tp) / 2) * 0.4 + exam * 0.6).toFixed(2));
  return isNaN(n) ? null : n;
}

// ─── Dropdown générique ───────────────────────────────────────────────────────
function Dropdown({ value, options, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-300 shadow-sm transition min-w-[200px] justify-between"
      >
        <span className="truncate">{value}</span>
        <ChevronDown size={14} className={`text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-12 left-0 bg-white border border-gray-100 rounded-xl shadow-xl z-50 w-60 py-1.5">
            {options.map((o) => (
              <button
                key={o}
                onClick={() => { onChange(o); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition
                  ${value === o ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"}`}
              >
                {o}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Input note ───────────────────────────────────────────────────────────────
function NoteInput({ value, onChange }) {
  return (
    <input
      type="number"
      min={0}
      max={20}
      step={0.5}
      value={value ?? ""}
      onChange={(e) => onChange(Math.min(20, Math.max(0, parseFloat(e.target.value) || 0)))}
      className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-300 hover:border-blue-300 transition"
      placeholder="—"
    />
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function GestionNotes() {
  // TODO: remplacer par GET /api/prof/grades?classe=...&module=...
  const [rows,      setRows]      = useState([]);  // [] → chargé depuis API
  const [search,    setSearch]    = useState("");
  const [classFilt, setClassFilt] = useState("Toutes les classes");
  const [modFilt,   setModFilt]   = useState("Tous les modules");
  const [dirty,     setDirty]     = useState(false);
  const [saved,     setSaved]     = useState(false);

  const filtered = rows.filter((r) => {
    const q = search.toLowerCase();
    const matchQ =
      r.nom?.toLowerCase().includes(q)     ||
      r.prenom?.toLowerCase().includes(q)  ||
      r.matricule?.includes(q);
    const matchC = classFilt === "Toutes les classes" || r.groupe === classFilt;
    const matchM = modFilt   === "Tous les modules"   || r.module === modFilt;
    return matchQ && matchC && matchM;
  });

  const updateNote = (matricule, field, val) => {
    setRows((prev) =>
      prev.map((r) => r.matricule === matricule ? { ...r, [field]: val } : r)
    );
    setDirty(true);
    setSaved(false);
  };

  const handleSave = () => {
    // TODO: PUT /api/prof/grades (envoyer rows modifiés)
    setSaved(true);
    setDirty(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="w-full space-y-5">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gestion des notes</h2>
          <p className="text-sm text-gray-400">Cliquez sur une note pour la modifier</p>
        </div>
        <button
          onClick={handleSave}
          disabled={!dirty}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition shadow-sm
            ${saved  ? "bg-green-500 text-white"                     :
              dirty  ? "bg-blue-600 text-white hover:bg-blue-700"    :
                       "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
        >
          {saved ? <CheckCircle size={15} /> : <Save size={15} />}
          {saved ? "Sauvegardé ✓" : "Sauvegarder"}
        </button>
      </div>

      {/* Filtres */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou matricule..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
          />
        </div>
        <Dropdown value={classFilt} options={MY_CLASSES} onChange={setClassFilt} />
        <Dropdown value={modFilt}   options={MY_MODULES} onChange={setModFilt}   />
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Matricule</th>
              <th className="px-4 py-3 text-left">Nom</th>
              <th className="px-4 py-3 text-left">Prénom</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Module</th>
              <th className="px-4 py-3 text-center">Note TD</th>
              <th className="px-4 py-3 text-center">Note TP</th>
              <th className="px-4 py-3 text-center">Examen</th>
              <th className="px-4 py-3 text-center">Moyenne</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-16 text-center">
                  <FileEdit size={32} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">Aucune note chargée</p>
                  <p className="text-xs text-gray-300 mt-1">Connectez l'API pour afficher les notes</p>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-sm text-gray-400">
                  Aucun résultat
                </td>
              </tr>
            ) : (
              filtered.map((r) => {
                const moy = calcMoy(r.td, r.tp, r.examen);
                const admis = moy !== null && moy >= 10;
                return (
                  <tr key={r.matricule} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">{r.matricule}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{r.nom}</td>
                    <td className="px-4 py-3 text-gray-700">{r.prenom}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">{r.module}</td>
                    <td className="px-4 py-3 text-center">
                      <NoteInput value={r.td} onChange={(v) => updateNote(r.matricule, "td", v)} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <NoteInput value={r.tp} onChange={(v) => updateNote(r.matricule, "tp", v)} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <NoteInput value={r.examen} onChange={(v) => updateNote(r.matricule, "examen", v)} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      {moy !== null ? (
                        <span className={`inline-block font-bold text-sm px-2.5 py-1 rounded-lg
                          ${admis ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                          {moy}
                        </span>
                      ) : (
                        <span className="text-gray-300 text-sm">—</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Info */}
      <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
        <Info size={14} className="flex-shrink-0" />
        Notes chargées depuis <code className="text-blue-400 ml-1">GET /api/prof/grades</code>
      </div>

      {/* Save flottant */}
      {dirty && !saved && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-once">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-semibold shadow-xl hover:bg-blue-700 transition"
          >
            <Save size={16} />
            Sauvegarder les modifications
          </button>
        </div>
      )}
    </div>
  );
}
