import { useState } from "react";
import { ChevronDown, CalendarDays, Users, UserCheck, Info } from "lucide-react";

// ─── Constantes de la grille ──────────────────────────────────────────────────
const DAYS        = ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu."];
const TIME_SLOTS  = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];
const START_MIN   = 8 * 60;   // 08:00 en minutes
const SLOT_PX     = 80;       // hauteur en px par heure

function toMin(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
const toPx = (min) => (min / 60) * SLOT_PX;

// ─── Placeholder : classes enseignées (à remplacer par GET /api/prof/classes) ─
const MY_CLASSES = [
  { id: "c1", label: "M1 GL — Groupe 01", level: "Master 1" },
  { id: "c2", label: "M1 GL — Groupe 02", level: "Master 1" },
  { id: "c3", label: "M2 GL — Groupe 01", level: "Master 2" },
  { id: "c4", label: "L3 Info — Groupe 02", level: "Licence 3" },
];

// ─── Placeholder : collègues du département ───────────────────────────────────
const COLLEAGUES = ["Dr. Belkadi", "Pr. Chaouchi", "Pr. Amrani"];

// ─── Couleurs par type de séance ─────────────────────────────────────────────
const TYPE_COLORS = {
  Cours: { bg: "bg-blue-50",   border: "border-l-blue-500",   title: "text-blue-700",   sub: "text-blue-400",   badge: "bg-blue-100 text-blue-600"   },
  TD:    { bg: "bg-green-50",  border: "border-l-green-500",  title: "text-green-700",  sub: "text-green-400",  badge: "bg-green-100 text-green-600"  },
  TP:    { bg: "bg-orange-50", border: "border-l-orange-500", title: "text-orange-700", sub: "text-orange-400", badge: "bg-orange-100 text-orange-600" },
};

// ─── EventCard ────────────────────────────────────────────────────────────────
function EventCard({ ev }) {
  const top    = toPx(toMin(ev.startTime) - START_MIN);
  const height = toPx(ev.duration) - 6;
  const c      = TYPE_COLORS[ev.type] || TYPE_COLORS.Cours;

  return (
    <div
      className={`absolute left-1 right-1 ${c.bg} border-l-4 ${c.border} rounded-lg px-2 py-1.5 overflow-hidden shadow-sm cursor-pointer hover:brightness-95 transition`}
      style={{ top: `${top}px`, height: `${height}px` }}
    >
      <p className={`text-xs font-semibold leading-tight truncate ${c.title}`}>{ev.subject}</p>
      {ev.prof   && <p className={`text-[11px] truncate ${c.sub}`}>{ev.prof}</p>}
      {ev.classe && <p className={`text-[11px] truncate ${c.sub}`}>{ev.classe}</p>}
      {ev.room   && <p className={`text-[11px] truncate ${c.sub}`}>{ev.room}</p>}
      <span className={`inline-block mt-0.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${c.badge}`}>
        {ev.type}
      </span>
    </div>
  );
}

// ─── WeekGrid ─────────────────────────────────────────────────────────────────
function WeekGrid({ events }) {
  const totalH = toPx(toMin("18:00") - START_MIN);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[680px]">
        {/* En-têtes jours */}
        <div className="grid grid-cols-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="py-3" />
          {DAYS.map((d) => (
            <div key={d} className="py-3 text-center text-xs font-semibold text-gray-500 border-l border-gray-100 uppercase tracking-wide">
              {d}
            </div>
          ))}
        </div>

        {/* Corps */}
        <div className="grid grid-cols-6 relative" style={{ height: `${totalH}px` }}>
          {/* Colonne horaires */}
          <div className="relative border-r border-gray-100">
            {TIME_SLOTS.map((t) => (
              <div key={t}>
                <div
                  className="absolute right-2 text-[11px] text-gray-400 select-none"
                  style={{ top: `${toPx(toMin(t) - START_MIN) - 7}px` }}
                >
                  {t}
                </div>
                <div
                  className="absolute border-t border-gray-100"
                  style={{ top: `${toPx(toMin(t) - START_MIN)}px`, left: 0, right: "-9999px", zIndex: 0 }}
                />
              </div>
            ))}
          </div>
          {/* Colonnes jours */}
          {DAYS.map((d) => (
            <div key={d} className="relative border-l border-gray-100">
              {events
                .filter((e) => e.day === d)
                .map((ev, i) => <EventCard key={i} ev={ev} />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Dropdown générique ───────────────────────────────────────────────────────
function Dropdown({ label, options, selected, onSelect, renderOption }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-300 shadow-sm transition min-w-[220px] justify-between"
      >
        <span className="truncate">{label}</span>
        <ChevronDown size={14} className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-12 left-0 bg-white border border-gray-100 rounded-xl shadow-xl z-50 w-64 py-1.5">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => { onSelect(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 transition text-sm
                  ${selected === opt ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"}`}
              >
                {renderOption ? renderOption(opt) : opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyGrid() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-300">
      <CalendarDays size={40} className="mb-3" />
      <p className="text-sm font-medium text-gray-400">Aucune séance planifiée</p>
      <p className="text-xs text-gray-300 mt-1">Les données seront chargées depuis le serveur</p>
    </div>
  );
}

// ─── Tabs config ──────────────────────────────────────────────────────────────
const TABS = [
  { key: "mine",       label: "Mon planning",           icon: CalendarDays },
  { key: "classes",    label: "Plannings des classes",   icon: Users        },
  { key: "colleagues", label: "Plannings des collègues", icon: UserCheck    },
];

// ─── Composant principal ──────────────────────────────────────────────────────
export default function Planning() {
  const [activeTab,         setActiveTab]         = useState("mine");
  const [selectedClass,     setSelectedClass]     = useState(MY_CLASSES[0]);
  const [selectedColleague, setSelectedColleague] = useState(COLLEAGUES[0]);

  // TODO: remplacer par des appels API
  // GET /api/prof/planning/mine
  // GET /api/prof/planning/class/:classId
  // GET /api/prof/planning/colleague/:colleagueName
  const myEvents          = [];   // → state depuis API
  const classEvents       = [];   // → state depuis API
  const colleagueEvents   = [];   // → state depuis API

  const activeEvents =
    activeTab === "mine"       ? myEvents        :
    activeTab === "classes"    ? classEvents      :
                                 colleagueEvents;

  return (
    <div className="w-full space-y-5">

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Planning</h2>
        <p className="text-sm text-gray-400">Semaine courante</p>
      </div>

      {/* Onglets */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition
              ${activeTab === t.key
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-gray-500 border border-gray-200 hover:border-blue-300"}`}
          >
            <t.icon size={15} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Filtres */}
      {activeTab === "classes" && (
        <div className="flex items-center gap-4 flex-wrap">
          <Dropdown
            label={selectedClass.label}
            options={MY_CLASSES}
            selected={selectedClass}
            onSelect={setSelectedClass}
            renderOption={(c) => (
              <div>
                <p className="font-medium">{c.label}</p>
                <p className="text-xs text-gray-400">{c.level}</p>
              </div>
            )}
          />
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-4 h-4 rounded border-2 border-blue-500 bg-blue-50" />
            Vos séances encadrées
          </div>
        </div>
      )}

      {activeTab === "colleagues" && (
        <Dropdown
          label={selectedColleague}
          options={COLLEAGUES}
          selected={selectedColleague}
          onSelect={setSelectedColleague}
        />
      )}

      {/* Grille */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {activeEvents.length === 0
          ? <EmptyGrid />
          : <WeekGrid events={activeEvents} />
        }
      </div>

      {/* Info placeholder */}
      <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
        <Info size={14} className="flex-shrink-0" />
        Les séances sont chargées depuis le serveur — connectez l'API pour afficher les données réelles.
      </div>
    </div>
  );
}
