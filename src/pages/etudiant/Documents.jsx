import React, { useState } from "react";
import { Icon } from "../../components/Icon";

/* ════════════════════════════════════════════
   DONNÉES (remplacer par API)
════════════════════════════════════════════ */
const DOCUMENTS = [
  {
    categorie: "Certificats & Attestations",
    icon: "check",
    color: "blue",
    docs: [
      { id: 1, titre: "Certificat de scolarité 2025–2026",    format: "PDF", taille: "130 Ko", date: "01/10/2025", dispo: true  },
      { id: 2, titre: "Attestation de classement",            format: "PDF", taille: "140 Ko", date: "15/02/2026", dispo: true  },
      { id: 3, titre: "Demande de réintégration",             format: "PDF", taille: "90 Ko",  date: "01/10/2025", dispo: true  },
    ],
  },
  {
    categorie: "Formulaires PFE — Licence",
    icon: "briefcase",
    color: "green",
    docs: [
      { id: 4, titre: "Demande de stage PFE Licence",         format: "DOCX", taille: "85 Ko",  date: "01/09/2025", dispo: true },
      { id: 5, titre: "Fiche de projet PFE Licence",          format: "DOCX", taille: "92 Ko",  date: "01/09/2025", dispo: true },
      { id: 6, titre: "Fiche de suivi PFE Licence",           format: "DOCX", taille: "78 Ko",  date: "01/09/2025", dispo: true },
    ],
  },
  {
    categorie: "Formulaires PFE — Master",
    icon: "star",
    color: "purple",
    docs: [
      { id: 7, titre: "Demande de stage PFE Master",          format: "DOCX", taille: "88 Ko",  date: "01/09/2025", dispo: true },
      { id: 8, titre: "Fiche de projet PFE Master",           format: "DOCX", taille: "95 Ko",  date: "01/09/2025", dispo: true },
      { id: 9, titre: "Fiche de suivi PFE Master",            format: "DOCX", taille: "80 Ko",  date: "01/09/2025", dispo: true },
    ],
  },
];

const COLOR_MAP = {
  blue:   { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-100",   icon: "bg-blue-100 text-blue-600"    },
  green:  { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-100",  icon: "bg-green-100 text-green-600"  },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-100", icon: "bg-purple-100 text-purple-600" },
};

const FORMAT_COLORS = {
  PDF:  "bg-red-50 text-red-600 border border-red-100",
  DOCX: "bg-blue-50 text-blue-600 border border-blue-100",
};

function DocRow({ doc }) {
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);

  const handleDl = () => {
    if (!doc.dispo) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); setTimeout(() => setDone(false), 2500); }, 1200);
  };

  return (
    <div className={`flex items-center justify-between px-4 py-3.5 rounded-xl border group transition-all
      ${doc.dispo ? "border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 cursor-pointer" : "border-gray-100 bg-gray-50/50 opacity-50"}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center flex-shrink-0">
          <Icon name="file" className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium text-gray-700 truncate">{doc.titre}</p>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${FORMAT_COLORS[doc.format] || "bg-gray-100 text-gray-500"}`}>
              {doc.format}
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">{doc.taille} · {doc.date}</p>
        </div>
      </div>

      {doc.dispo ? (
        <button onClick={handleDl}
          className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl transition-all flex-shrink-0 ml-3 font-medium
            ${done    ? "bg-green-100 text-green-700"
              : loading ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 opacity-0 group-hover:opacity-100"}`}>
          {done ? (
            <><Icon name="check" className="w-3.5 h-3.5" /><span className="hidden sm:inline">Téléchargé</span></>
          ) : loading ? (
            <><svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg><span className="hidden sm:inline">Chargement…</span></>
          ) : (
            <><Icon name="download" className="w-3.5 h-3.5" /><span className="hidden sm:inline">Télécharger</span></>
          )}
        </button>
      ) : (
        <span className="text-[11px] text-orange-500 bg-orange-50 px-2.5 py-1 rounded-lg flex-shrink-0 ml-3 font-medium border border-orange-100">
          Non disponible
        </span>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════
   PAGE PRINCIPALE
════════════════════════════════════════════ */
export default function Documents() {
  const [search, setSearch] = useState("");

  const totalDocs = DOCUMENTS.reduce((a, c) => a + c.docs.filter(d => d.dispo).length, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Documents</h1>
          <p className="text-sm text-gray-400 mt-0.5">{totalDocs} documents disponibles au téléchargement</p>
        </div>
        <div className="relative">
          <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Rechercher un document…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 w-56 bg-white transition-all"
          />
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3.5">
        <Icon name="info" className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 leading-relaxed">
          Les documents officiels sont générés automatiquement selon votre dossier académique. Les formulaires PFE sont à imprimer, remplir et déposer au secrétariat.
        </p>
      </div>

      {/* Catégories */}
      {DOCUMENTS.map(cat => {
        const c = COLOR_MAP[cat.color];
        const docsFiltres = cat.docs.filter(d =>
          d.titre.toLowerCase().includes(search.toLowerCase())
        );
        if (docsFiltres.length === 0 && search) return null;
        return (
          <div key={cat.categorie} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Catégorie header */}
            <div className={`flex items-center gap-3 px-5 py-4 border-b ${c.border} ${c.bg}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.icon}`}>
                <Icon name={cat.icon} className="w-4 h-4" />
              </div>
              <h2 className={`text-sm font-bold ${c.text}`}>{cat.categorie}</h2>
              <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${c.icon}`}>
                {cat.docs.filter(d => d.dispo).length} disponible{cat.docs.filter(d => d.dispo).length > 1 ? "s" : ""}
              </span>
            </div>
            {/* Docs */}
            <div className="p-4 space-y-2">
              {docsFiltres.map(d => <DocRow key={d.id} doc={d} />)}
            </div>
          </div>
        );
      })}

      {/* Message si aucun résultat */}
      {search && DOCUMENTS.every(cat =>
        cat.docs.filter(d => d.titre.toLowerCase().includes(search.toLowerCase())).length === 0
      ) && (
        <div className="text-center py-12 text-gray-400 text-sm">
          Aucun document ne correspond à « {search} »
        </div>
      )}
    </div>
  );
}
