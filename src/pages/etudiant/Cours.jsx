import React, { useState } from "react";
import { Icon } from "../../components/Icon";

/* ── Mock data (remplacer par API) ── */
const MODULES = [
  {
    id: 1, code: "INF301", nom: "Algorithmique Avancée", credit: 6,
    enseignant: "Dr. Meziane", semestre: "S5", couleur: "blue",
    ressources: [
      { type: "Cours",  titre: "Chap 1 — Introduction aux graphes",    date: "02/05/2026", taille: "1.2 Mo" },
      { type: "Cours",  titre: "Chap 2 — Algorithmes de tri avancés",   date: "09/05/2026", taille: "850 Ko" },
      { type: "TD",     titre: "TD 1 — Arbres et parcours",             date: "05/05/2026", taille: "320 Ko" },
      { type: "TD",     titre: "TD 2 — Programmation dynamique",        date: "12/05/2026", taille: "410 Ko" },
      { type: "TP",     titre: "TP 1 — Implémentation BFS/DFS en C",    date: "07/05/2026", taille: "280 Ko" },
      { type: "TP",     titre: "TP 2 — Tri rapide et comparaison",      date: "14/05/2026", taille: "340 Ko" },
    ],
  },
  {
    id: 2, code: "INF302", nom: "Base de Données", credit: 5,
    enseignant: "Dr. Boudiaf", semestre: "S5", couleur: "green",
    ressources: [
      { type: "Cours",  titre: "Chap 1 — Modèle relationnel",           date: "01/05/2026", taille: "1.5 Mo" },
      { type: "Cours",  titre: "Chap 2 — SQL avancé",                   date: "08/05/2026", taille: "980 Ko" },
      { type: "TD",     titre: "TD 1 — Conception MCD/MLD",             date: "04/05/2026", taille: "290 Ko" },
      { type: "TP",     titre: "TP 1 — MySQL : création de BD",         date: "06/05/2026", taille: "430 Ko" },
      { type: "TP",     titre: "TP 2 — Requêtes imbriquées",            date: "13/05/2026", taille: "310 Ko" },
    ],
  },
  {
    id: 3, code: "INF303", nom: "Réseaux Informatiques", credit: 5,
    enseignant: "Dr. Aoudia", semestre: "S5", couleur: "purple",
    ressources: [
      { type: "Cours",  titre: "Chap 1 — Modèle OSI",                   date: "03/05/2026", taille: "1.1 Mo" },
      { type: "TD",     titre: "TD 1 — Adressage IP et sous-réseaux",   date: "06/05/2026", taille: "380 Ko" },
      { type: "TP",     titre: "TP 1 — Simulation Cisco Packet Tracer", date: "08/05/2026", taille: "520 Ko" },
    ],
  },
  {
    id: 4, code: "INF304", nom: "Génie Logiciel", credit: 4,
    enseignant: "Dr. Khelifa", semestre: "S5", couleur: "orange",
    ressources: [
      { type: "Cours",  titre: "Chap 1 — Cycle de vie du logiciel",     date: "02/05/2026", taille: "900 Ko" },
      { type: "TD",     titre: "TD 1 — Diagrammes UML",                 date: "05/05/2026", taille: "440 Ko" },
      { type: "TP",     titre: "TP 1 — Conception avec StarUML",        date: "09/05/2026", taille: "600 Ko" },
    ],
  },
  {
    id: 5, code: "MAT301", nom: "Mathématiques Discrètes", credit: 4,
    enseignant: "Dr. Bensalem", semestre: "S5", couleur: "teal",
    ressources: [
      { type: "Cours",  titre: "Chap 1 — Logique propositionnelle",     date: "01/05/2026", taille: "770 Ko" },
      { type: "TD",     titre: "TD 1 — Graphes et arbres",              date: "04/05/2026", taille: "350 Ko" },
    ],
  },
  {
    id: 6, code: "ANG301", nom: "Anglais Technique", credit: 2,
    enseignant: "M. Larbi", semestre: "S5", couleur: "rose",
    ressources: [
      { type: "Cours",  titre: "Lesson 1 — Technical Writing",          date: "03/05/2026", taille: "640 Ko" },
      { type: "TD",     titre: "TD 1 — Reading comprehension",          date: "07/05/2026", taille: "290 Ko" },
    ],
  },
];

const COLOR_MAP = {
  blue:   { badge: "bg-blue-100 text-blue-700",   accent: "border-l-blue-500"   },
  green:  { badge: "bg-green-100 text-green-700", accent: "border-l-green-500"  },
  purple: { badge: "bg-purple-100 text-purple-700", accent: "border-l-purple-500" },
  orange: { badge: "bg-orange-100 text-orange-600", accent: "border-l-orange-500" },
  teal:   { badge: "bg-teal-100 text-teal-700",   accent: "border-l-teal-500"   },
  rose:   { badge: "bg-rose-100 text-rose-700",   accent: "border-l-rose-500"   },
};

const TYPE_COLORS = {
  Cours: "bg-blue-50 text-blue-700 border border-blue-100",
  TD:    "bg-amber-50 text-amber-700 border border-amber-100",
  TP:    "bg-green-50 text-green-700 border border-green-100",
};

const FILTER_TYPES = ["Tout", "Cours", "TD", "TP"];

function RessourceRow({ r }) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50 group transition-all">
      <div className="flex items-center gap-3 min-w-0">
        <Icon name="file" className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[r.type]}`}>{r.type}</span>
            <span className="text-xs font-medium text-gray-700 truncate">{r.titre}</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">{r.date} · {r.taille}</p>
        </div>
      </div>
      <button
        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100"
        onClick={() => alert(`Téléchargement de "${r.titre}" simulé`)}
      >
        <Icon name="download" className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Télécharger</span>
      </button>
    </div>
  );
}

export default function Cours() {
  const [search,     setSearch]     = useState("");
  const [filterType, setFilterType] = useState("Tout");
  const [expanded,   setExpanded]   = useState(1);

  const modulesFiltered = MODULES.filter(m =>
    m.nom.toLowerCase().includes(search.toLowerCase()) ||
    m.code.toLowerCase().includes(search.toLowerCase()) ||
    m.enseignant.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Cours &amp; Modules</h1>
          <p className="text-sm text-gray-400 mt-0.5">Semestre 5 — {MODULES.length} modules inscrits</p>
        </div>
        {/* Search + filter */}
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" placeholder="Rechercher module, enseignant…"
              value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 w-56 transition-all"
            />
          </div>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {FILTER_TYPES.map(f => (
              <button key={f} onClick={() => setFilterType(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterType === f ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Module cards */}
      <div className="space-y-3">
        {modulesFiltered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">Aucun module trouvé.</div>
        )}
        {modulesFiltered.map(m => {
          const c = COLOR_MAP[m.couleur] || COLOR_MAP.blue;
          const ressourcesFiltrees = filterType === "Tout" ? m.ressources : m.ressources.filter(r => r.type === filterType);
          const isOpen = expanded === m.id;
          return (
            <div key={m.id} className={`bg-white rounded-2xl border border-gray-100 shadow-sm border-l-4 ${c.accent} overflow-hidden`}>
              {/* Module header */}
              <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-all"
                onClick={() => setExpanded(isOpen ? null : m.id)}>
                <div className="flex items-center gap-3 text-left">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${c.badge}`}>{m.code}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{m.nom}</p>
                    <p className="text-[11px] text-gray-400">{m.enseignant} · {m.credit} crédits</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="hidden sm:flex gap-1">
                    {["Cours","TD","TP"].map(t => {
                      const n = m.ressources.filter(r => r.type === t).length;
                      return n > 0 ? (
                        <span key={t} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${TYPE_COLORS[t]}`}>{n} {t}</span>
                      ) : null;
                    })}
                  </div>
                  <Icon name="chevron" className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>
              </button>
              {/* Ressources list */}
              {isOpen && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-0.5">
                  {ressourcesFiltrees.length === 0
                    ? <p className="text-xs text-gray-400 py-2 text-center">Aucune ressource pour ce filtre.</p>
                    : ressourcesFiltrees.map((r, i) => <RessourceRow key={i} r={r} />)
                  }
                  {/* Download all */}
                  <div className="pt-3 flex justify-end border-t border-gray-50 mt-2">
                    <button
                      className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all font-medium"
                      onClick={() => alert(`Téléchargement de tous les fichiers de ${m.nom} simulé`)}>
                      <Icon name="download" className="w-3.5 h-3.5" />
                      Tout télécharger
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
