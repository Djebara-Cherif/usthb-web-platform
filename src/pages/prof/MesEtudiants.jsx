import { useState } from "react";
import { Search, ChevronDown, X, MessageSquare, Save, User, Users, Info } from "lucide-react";

// ─── Placeholder classes (à remplacer par GET /api/prof/classes) ──────────────
const MY_CLASSES = [
  "Toutes les classes",
  "M1 GL — Groupe 01",
  "M1 GL — Groupe 02",
  "M2 GL — Groupe 01",
  "L3 Info — Groupe 02",
];

// ─── Dropdown générique ───────────────────────────────────────────────────────
function Dropdown({ value, options, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-300 shadow-sm transition min-w-[230px] justify-between"
      >
        <span className="truncate">{value}</span>
        <ChevronDown size={14} className={`text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-12 left-0 bg-white border border-gray-100 rounded-xl shadow-xl z-50 w-64 py-1.5">
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

// ─── Modal profil étudiant ───────────────────────────────────────────────────
function StudentModal({ student, onClose, onSave }) {
  const [absences, setAbsences] = useState(student.absences ?? 0);
  const [message,  setMessage]  = useState("");
  const [saved,    setSaved]    = useState(false);

  const initials = `${student.prenom?.[0] ?? ""}${student.nom?.[0] ?? ""}`.toUpperCase();
  const absColor =
    absences === 0 ? "text-green-600 bg-green-50"  :
    absences <= 3  ? "text-yellow-600 bg-yellow-50" :
                     "text-red-600 bg-red-50";

  const handleSave = () => {
    onSave({ ...student, absences });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>

        {/* Header dégradé */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition">
            <X size={18} />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 text-white text-xl font-bold flex items-center justify-center select-none">
              {initials || <User size={22} />}
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-tight">
                {student.prenom} {student.nom}
              </p>
              <p className="text-blue-100 text-sm">{student.matricule}</p>
              <p className="text-blue-100 text-sm">{student.groupe}</p>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Infos */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Spécialité</p>
              <p className="text-sm font-semibold text-gray-800">{student.specialite ?? "—"}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Groupe</p>
              <p className="text-sm font-semibold text-gray-800">
                {student.groupe?.split("—")[1]?.trim() ?? student.groupe ?? "—"}
              </p>
            </div>
          </div>

          {/* Absences */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-3">Nombre d'absences</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAbsences(Math.max(0, absences - 1))}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-100 flex items-center justify-center shadow-sm text-lg transition"
              >−</button>
              <span className={`text-3xl font-bold px-4 py-1.5 rounded-xl ${absColor}`}>{absences}</span>
              <button
                onClick={() => setAbsences(absences + 1)}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-100 flex items-center justify-center shadow-sm text-lg transition"
              >+</button>
              <input
                type="number"
                min={0}
                value={absences}
                onChange={(e) => setAbsences(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-300 ml-1"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 flex items-center gap-1">
              <MessageSquare size={12} /> Envoyer un message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrire un message à l'étudiant..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {message.trim() && (
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition">
                <MessageSquare size={15} /> Envoyer
              </button>
            )}
            <button
              onClick={handleSave}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition
                ${saved ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              <Save size={15} />
              {saved ? "Sauvegardé ✓" : "Sauvegarder"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function MesEtudiants() {
  // TODO: remplacer par GET /api/prof/students?classe=...
  const [students,  setStudents]  = useState([]);   // [] → chargé depuis API
  const [search,    setSearch]    = useState("");
  const [classFilt, setClassFilt] = useState("Toutes les classes");
  const [selected,  setSelected]  = useState(null);

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch =
      s.nom?.toLowerCase().includes(q)      ||
      s.prenom?.toLowerCase().includes(q)   ||
      s.matricule?.includes(q)              ||
      s.groupe?.toLowerCase().includes(q);
    const matchClass =
      classFilt === "Toutes les classes" || s.groupe === classFilt;
    return matchSearch && matchClass;
  });

  const handleSave = (updated) => {
    setStudents((prev) =>
      prev.map((s) => s.matricule === updated.matricule ? updated : s)
    );
    // TODO: PUT /api/prof/students/:matricule/absences
  };

  const absTag = (n) =>
    n === 0 ? "bg-green-100 text-green-600"  :
    n <= 3   ? "bg-yellow-100 text-yellow-600" :
               "bg-red-100 text-red-600";

  return (
    <div className="w-full space-y-5">

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Mes étudiants</h2>
        <p className="text-sm text-gray-400">
          {filtered.length > 0 ? `${filtered.length} étudiant(s) affiché(s)` : "Liste des étudiants"}
        </p>
      </div>

      {/* Filtres */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, prénom ou matricule..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
          />
        </div>
        <Dropdown value={classFilt} options={MY_CLASSES} onChange={setClassFilt} />
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
            <tr>
              <th className="px-5 py-3 text-left">Matricule</th>
              <th className="px-5 py-3 text-left">Nom</th>
              <th className="px-5 py-3 text-left">Prénom</th>
              <th className="px-5 py-3 text-left hidden md:table-cell">Spécialité</th>
              <th className="px-5 py-3 text-left hidden lg:table-cell">Groupe</th>
              <th className="px-5 py-3 text-center">Absences</th>
              <th className="px-5 py-3 text-center">Profil</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center">
                  <Users size={32} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">Aucun étudiant chargé</p>
                  <p className="text-xs text-gray-300 mt-1">Connectez l'API pour afficher la liste</p>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-sm text-gray-400">
                  Aucun résultat pour cette recherche
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.matricule} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-400">{s.matricule}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-800">{s.nom}</td>
                  <td className="px-5 py-3.5 text-gray-700">{s.prenom}</td>
                  <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">{s.specialite ?? "—"}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-400 hidden lg:table-cell">{s.groupe}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${absTag(s.absences ?? 0)}`}>
                      {s.absences ?? 0} abs.
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <button
                      onClick={() => setSelected(s)}
                      className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition"
                    >
                      <User size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Info */}
      <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
        <Info size={14} className="flex-shrink-0" />
        Liste chargée depuis <code className="text-blue-400 ml-1">GET /api/prof/students</code>
      </div>

      {/* Modal profil */}
      {selected && (
        <StudentModal
          student={selected}
          onClose={() => setSelected(null)}
          onSave={(updated) => {
            handleSave(updated);
            setSelected(updated);
          }}
        />
      )}
    </div>
  );
}
