import { useState } from "react";
import { Search, DoorOpen, CheckCircle, XCircle, Clock, Users, Info, X, Calendar } from "lucide-react";

// ─── Placeholder salles (à remplacer par GET /api/rooms) ─────────────────────
// Structure attendue depuis API :
// { id, nom, capacite, type, batiment, statut: "Disponible"|"Occupée", nextDispo, currentCours }

const BATIMENTS   = ["Tous", "Bâtiment A", "Bâtiment B", "Bâtiment C", "Laboratoires"];
const TYPES_SALLE = ["Tous", "Amphithéâtre", "Salle de cours", "Salle TP"];

// ─── Modal réservation ────────────────────────────────────────────────────────
function ReservationModal({ salle, onClose, onConfirm }) {
  const [date,    setDate]    = useState("");
  const [debut,   setDebut]   = useState("");
  const [fin,     setFin]     = useState("");
  const [motif,   setMotif]   = useState("");
  const [errors,  setErrors]  = useState({});

  const validate = () => {
    const e = {};
    if (!date)   e.date  = "La date est requise.";
    if (!debut)  e.debut = "L'heure de début est requise.";
    if (!fin)    e.fin   = "L'heure de fin est requise.";
    if (debut && fin && debut >= fin) e.fin = "L'heure de fin doit être après le début.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    onConfirm({ salleId: salle.id, date, debut, fin, motif });
    // TODO: POST /api/rooms/:id/reservation
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">Réserver une salle</h3>
            <p className="text-xs text-gray-400 mt-0.5">{salle.nom} · Capacité {salle.capacite} places</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Date */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1">
              <Calendar size={12} /> Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => { setDate(e.target.value); setErrors((p) => ({ ...p, date: "" })); }}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          {/* Horaires */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                Heure début <span className="text-red-400">*</span>
              </label>
              <input
                type="time"
                value={debut}
                onChange={(e) => { setDebut(e.target.value); setErrors((p) => ({ ...p, debut: "" })); }}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.debut && <p className="text-red-500 text-xs mt-1">{errors.debut}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                Heure fin <span className="text-red-400">*</span>
              </label>
              <input
                type="time"
                value={fin}
                onChange={(e) => { setFin(e.target.value); setErrors((p) => ({ ...p, fin: "" })); }}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.fin && <p className="text-red-500 text-xs mt-1">{errors.fin}</p>}
            </div>
          </div>

          {/* Motif */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              Motif (optionnel)
            </label>
            <textarea
              placeholder="Ex : TD Algorithmique — Groupe A"
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
            Annuler
          </button>
          <button onClick={handleConfirm} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition">
            Confirmer la réservation
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Carte salle ──────────────────────────────────────────────────────────────
function RoomCard({ salle, onReserve }) {
  const dispo = salle.statut === "Disponible";
  return (
    <div className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition p-4
      ${dispo ? "border-gray-100" : "border-gray-100 opacity-90"}`}>

      {/* Status badge */}
      <div className="flex items-start justify-between mb-3">
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full
          ${dispo ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
          {dispo
            ? <CheckCircle size={12} />
            : <XCircle     size={12} />}
          {salle.statut}
        </span>
        <span className="text-xs text-gray-400">{salle.type}</span>
      </div>

      {/* Infos */}
      <h4 className="text-sm font-bold text-gray-800 mb-0.5">{salle.nom}</h4>
      <p className="text-xs text-gray-400 mb-3">{salle.batiment}</p>

      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Users size={12} className="text-gray-400" />
          <span>Capacité : <strong className="text-gray-700">{salle.capacite}</strong> places</span>
        </div>
        {!dispo && salle.currentCours && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock size={12} className="text-red-400" />
            <span className="truncate">{salle.currentCours}</span>
          </div>
        )}
        {salle.nextDispo && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock size={12} className="text-gray-400" />
            <span>Prochaine dispo : <strong className="text-gray-700">{salle.nextDispo}</strong></span>
          </div>
        )}
      </div>

      {/* Action */}
      {dispo ? (
        <button
          onClick={() => onReserve(salle)}
          className="w-full py-2 bg-blue-50 text-blue-600 text-xs font-semibold rounded-xl hover:bg-blue-100 transition"
        >
          Réserver cette salle
        </button>
      ) : (
        <div className="w-full py-2 bg-gray-50 text-gray-400 text-xs font-medium rounded-xl text-center">
          Occupée actuellement
        </div>
      )}
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function Salles() {
  // TODO: remplacer par GET /api/rooms
  const [salles,      setSalles]      = useState([]);   // [] → chargé depuis API
  const [search,      setSearch]      = useState("");
  const [batFilt,     setBatFilt]     = useState("Tous");
  const [typeFilt,    setTypeFilt]    = useState("Tous");
  const [statFilt,    setStatFilt]    = useState("Tous");
  const [toReserve,   setToReserve]   = useState(null);

  const filtered = salles.filter((s) => {
    const q = search.toLowerCase();
    const matchQ = s.nom?.toLowerCase().includes(q) || s.batiment?.toLowerCase().includes(q);
    const matchB = batFilt  === "Tous" || s.batiment === batFilt;
    const matchT = typeFilt === "Tous" || s.type     === typeFilt;
    const matchS = statFilt === "Tous" || s.statut   === statFilt;
    return matchQ && matchB && matchT && matchS;
  });

  const handleReservationConfirm = (data) => {
    console.log("Réservation:", data);
    // TODO: POST /api/rooms/:id/reservation
  };

  return (
    <div className="w-full space-y-5">

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Disponibilité des salles</h2>
        <p className="text-sm text-gray-400">Consultation et réservation en temps réel</p>
      </div>

      {/* Filtres */}
      <div className="flex gap-3 flex-wrap">
        {/* Recherche */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une salle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
          />
        </div>

        {/* Pills filtres */}
        <div className="flex gap-2 flex-wrap">
          {/* Statut */}
          {["Tous", "Disponible", "Occupée"].map((s) => (
            <button key={s} onClick={() => setStatFilt(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition
                ${statFilt === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grille */}
      {salles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <DoorOpen size={36} className="text-gray-200 mb-3" />
          <p className="text-sm text-gray-400">Aucune salle chargée</p>
          <p className="text-xs text-gray-300 mt-1">Connectez l'API pour afficher la disponibilité</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-sm text-gray-400 bg-white rounded-2xl border border-gray-100">
          Aucune salle correspondante
        </div>
      ) : (
        <>
          {/* Stats rapides */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total",       value: filtered.length,                                     color: "text-gray-700",  bg: "bg-gray-50"    },
              { label: "Disponibles", value: filtered.filter((s) => s.statut === "Disponible").length, color: "text-green-600", bg: "bg-green-50"   },
              { label: "Occupées",    value: filtered.filter((s) => s.statut === "Occupée").length,    color: "text-red-500",   bg: "bg-red-50"     },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.bg} rounded-xl p-4 border border-gray-100`}>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((salle) => (
              <RoomCard key={salle.id} salle={salle} onReserve={setToReserve} />
            ))}
          </div>
        </>
      )}

      {/* Info */}
      <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
        <Info size={14} className="flex-shrink-0" />
        Salles chargées depuis <code className="text-blue-400 ml-1">GET /api/rooms</code>
      </div>

      {/* Modal réservation */}
      {toReserve && (
        <ReservationModal
          salle={toReserve}
          onClose={() => setToReserve(null)}
          onConfirm={handleReservationConfirm}
        />
      )}
    </div>
  );
}
