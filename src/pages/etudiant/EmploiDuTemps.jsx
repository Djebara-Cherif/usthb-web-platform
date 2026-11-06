import React, { useState } from "react";
import { Icon } from "../../components/Icon";

/* ════════════════════════════════════════════
   DONNÉES (remplacer par API)
════════════════════════════════════════════ */
const JOURS    = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"];
const CRENEAUX = ["08:00–09:30", "09:45–11:15", "11:30–13:00", "13:30–15:00", "15:15–16:45"];

const GROUPES = ["G01", "G02", "G03", "G04", "G05"];

/* Emplois par groupe */
const EMPLOIS_PAR_GROUPE = {
  G01: {
    Dimanche: [
      { creneau: "08:00–09:30", type: "Cours", matiere: "Algorithmique Avancée",   salle: "Amphi B",   enseignant: "Dr. Meziane"  },
      { creneau: "09:45–11:15", type: "TD",    matiere: "Base de Données",          salle: "Salle 11",  enseignant: "Dr. Boudiaf"  },
      { creneau: "13:30–15:00", type: "Cours", matiere: "Réseaux Informatiques",   salle: "Amphi A",   enseignant: "Dr. Aoudia"   },
    ],
    Lundi: [
      { creneau: "08:00–09:30", type: "TP",    matiere: "Base de Données",          salle: "Labo 03",   enseignant: "Dr. Boudiaf"  },
      { creneau: "09:45–11:15", type: "Cours", matiere: "Génie Logiciel",           salle: "Amphi C",   enseignant: "Dr. Khelifa"  },
      { creneau: "11:30–13:00", type: "TD",    matiere: "Mathématiques Discrètes",  salle: "Salle 08",  enseignant: "Dr. Bensalem" },
    ],
    Mardi: [
      { creneau: "08:00–09:30", type: "TP",    matiere: "Algorithmique Avancée",   salle: "Labo 01",   enseignant: "Dr. Meziane"  },
      { creneau: "13:30–15:00", type: "Cours", matiere: "Mathématiques Discrètes", salle: "Amphi B",   enseignant: "Dr. Bensalem" },
      { creneau: "15:15–16:45", type: "TD",    matiere: "Génie Logiciel",           salle: "Salle 06",  enseignant: "Dr. Khelifa"  },
    ],
    Mercredi: [
      { creneau: "09:45–11:15", type: "Cours", matiere: "Anglais Technique",        salle: "Salle 02",  enseignant: "M. Larbi"     },
      { creneau: "11:30–13:00", type: "TP",    matiere: "Réseaux Informatiques",   salle: "Labo 02",   enseignant: "Dr. Aoudia"   },
    ],
    Jeudi: [
      { creneau: "08:00–09:30", type: "TD",    matiere: "Algorithmique Avancée",   salle: "Salle 10",  enseignant: "Dr. Meziane"  },
      { creneau: "09:45–11:15", type: "TP",    matiere: "Génie Logiciel",           salle: "Labo 04",   enseignant: "Dr. Khelifa"  },
      { creneau: "13:30–15:00", type: "TD",    matiere: "Anglais Technique",        salle: "Salle 02",  enseignant: "M. Larbi"     },
    ],
  },
  G02: {
    Dimanche: [
      { creneau: "08:00–09:30", type: "Cours", matiere: "Algorithmique Avancée",   salle: "Amphi B",   enseignant: "Dr. Meziane"  },
      { creneau: "11:30–13:00", type: "TD",    matiere: "Base de Données",          salle: "Salle 14",  enseignant: "Dr. Boudiaf"  },
      { creneau: "13:30–15:00", type: "Cours", matiere: "Réseaux Informatiques",   salle: "Amphi A",   enseignant: "Dr. Aoudia"   },
    ],
    Lundi: [
      { creneau: "09:45–11:15", type: "TP",    matiere: "Base de Données",          salle: "Labo 05",   enseignant: "Dr. Boudiaf"  },
      { creneau: "11:30–13:00", type: "Cours", matiere: "Génie Logiciel",           salle: "Amphi C",   enseignant: "Dr. Khelifa"  },
      { creneau: "13:30–15:00", type: "TD",    matiere: "Mathématiques Discrètes",  salle: "Salle 09",  enseignant: "Dr. Bensalem" },
    ],
    Mardi: [
      { creneau: "09:45–11:15", type: "TP",    matiere: "Algorithmique Avancée",   salle: "Labo 02",   enseignant: "Dr. Meziane"  },
      { creneau: "13:30–15:00", type: "Cours", matiere: "Mathématiques Discrètes", salle: "Amphi B",   enseignant: "Dr. Bensalem" },
    ],
    Mercredi: [
      { creneau: "08:00–09:30", type: "Cours", matiere: "Anglais Technique",        salle: "Salle 03",  enseignant: "M. Larbi"     },
      { creneau: "09:45–11:15", type: "TD",    matiere: "Génie Logiciel",           salle: "Salle 07",  enseignant: "Dr. Khelifa"  },
      { creneau: "11:30–13:00", type: "TP",    matiere: "Réseaux Informatiques",   salle: "Labo 02",   enseignant: "Dr. Aoudia"   },
    ],
    Jeudi: [
      { creneau: "08:00–09:30", type: "TD",    matiere: "Algorithmique Avancée",   salle: "Salle 11",  enseignant: "Dr. Meziane"  },
      { creneau: "13:30–15:00", type: "TD",    matiere: "Anglais Technique",        salle: "Salle 04",  enseignant: "M. Larbi"     },
    ],
  },
  G03: {
    Dimanche: [
      { creneau: "08:00–09:30", type: "Cours", matiere: "Algorithmique Avancée",   salle: "Amphi B",   enseignant: "Dr. Meziane"  },
      { creneau: "09:45–11:15", type: "TD",    matiere: "Mathématiques Discrètes",  salle: "Salle 05",  enseignant: "Dr. Bensalem" },
      { creneau: "13:30–15:00", type: "Cours", matiere: "Réseaux Informatiques",   salle: "Amphi A",   enseignant: "Dr. Aoudia"   },
    ],
    Lundi: [
      { creneau: "08:00–09:30", type: "TP",    matiere: "Algorithmique Avancée",   salle: "Labo 03",   enseignant: "Dr. Meziane"  },
      { creneau: "11:30–13:00", type: "Cours", matiere: "Génie Logiciel",           salle: "Amphi C",   enseignant: "Dr. Khelifa"  },
    ],
    Mardi: [
      { creneau: "09:45–11:15", type: "TP",    matiere: "Base de Données",          salle: "Labo 04",   enseignant: "Dr. Boudiaf"  },
      { creneau: "13:30–15:00", type: "TD",    matiere: "Base de Données",          salle: "Salle 12",  enseignant: "Dr. Boudiaf"  },
      { creneau: "15:15–16:45", type: "Cours", matiere: "Mathématiques Discrètes", salle: "Amphi B",   enseignant: "Dr. Bensalem" },
    ],
    Mercredi: [
      { creneau: "08:00–09:30", type: "TP",    matiere: "Réseaux Informatiques",   salle: "Labo 01",   enseignant: "Dr. Aoudia"   },
      { creneau: "11:30–13:00", type: "TD",    matiere: "Anglais Technique",        salle: "Salle 02",  enseignant: "M. Larbi"     },
    ],
    Jeudi: [
      { creneau: "08:00–09:30", type: "Cours", matiere: "Anglais Technique",        salle: "Salle 03",  enseignant: "M. Larbi"     },
      { creneau: "09:45–11:15", type: "TD",    matiere: "Génie Logiciel",           salle: "Salle 10",  enseignant: "Dr. Khelifa"  },
      { creneau: "13:30–15:00", type: "TP",    matiere: "Génie Logiciel",           salle: "Labo 05",   enseignant: "Dr. Khelifa"  },
    ],
  },
  G04: {
    Dimanche: [
      { creneau: "08:00–09:30", type: "Cours", matiere: "Algorithmique Avancée",   salle: "Amphi B",   enseignant: "Dr. Meziane"  },
      { creneau: "11:30–13:00", type: "TP",    matiere: "Base de Données",          salle: "Labo 06",   enseignant: "Dr. Boudiaf"  },
      { creneau: "15:15–16:45", type: "Cours", matiere: "Génie Logiciel",           salle: "Amphi C",   enseignant: "Dr. Khelifa"  },
    ],
    Lundi: [
      { creneau: "08:00–09:30", type: "TD",    matiere: "Algorithmique Avancée",   salle: "Salle 13",  enseignant: "Dr. Meziane"  },
      { creneau: "09:45–11:15", type: "Cours", matiere: "Réseaux Informatiques",   salle: "Amphi A",   enseignant: "Dr. Aoudia"   },
      { creneau: "13:30–15:00", type: "TD",    matiere: "Base de Données",          salle: "Salle 15",  enseignant: "Dr. Boudiaf"  },
    ],
    Mardi: [
      { creneau: "08:00–09:30", type: "TP",    matiere: "Réseaux Informatiques",   salle: "Labo 02",   enseignant: "Dr. Aoudia"   },
      { creneau: "11:30–13:00", type: "Cours", matiere: "Mathématiques Discrètes", salle: "Amphi B",   enseignant: "Dr. Bensalem" },
    ],
    Mercredi: [
      { creneau: "09:45–11:15", type: "Cours", matiere: "Anglais Technique",        salle: "Salle 04",  enseignant: "M. Larbi"     },
      { creneau: "13:30–15:00", type: "TD",    matiere: "Mathématiques Discrètes",  salle: "Salle 09",  enseignant: "Dr. Bensalem" },
    ],
    Jeudi: [
      { creneau: "09:45–11:15", type: "TP",    matiere: "Algorithmique Avancée",   salle: "Labo 01",   enseignant: "Dr. Meziane"  },
      { creneau: "11:30–13:00", type: "TD",    matiere: "Génie Logiciel",           salle: "Salle 06",  enseignant: "Dr. Khelifa"  },
      { creneau: "13:30–15:00", type: "TD",    matiere: "Anglais Technique",        salle: "Salle 02",  enseignant: "M. Larbi"     },
    ],
  },
  G05: {
    Dimanche: [
      { creneau: "08:00–09:30", type: "Cours", matiere: "Algorithmique Avancée",   salle: "Amphi B",   enseignant: "Dr. Meziane"  },
      { creneau: "13:30–15:00", type: "TD",    matiere: "Réseaux Informatiques",   salle: "Salle 16",  enseignant: "Dr. Aoudia"   },
    ],
    Lundi: [
      { creneau: "08:00–09:30", type: "TP",    matiere: "Algorithmique Avancée",   salle: "Labo 05",   enseignant: "Dr. Meziane"  },
      { creneau: "09:45–11:15", type: "Cours", matiere: "Base de Données",          salle: "Amphi C",   enseignant: "Dr. Boudiaf"  },
      { creneau: "13:30–15:00", type: "Cours", matiere: "Génie Logiciel",           salle: "Amphi D",   enseignant: "Dr. Khelifa"  },
    ],
    Mardi: [
      { creneau: "08:00–09:30", type: "TD",    matiere: "Base de Données",          salle: "Salle 14",  enseignant: "Dr. Boudiaf"  },
      { creneau: "09:45–11:15", type: "TP",    matiere: "Réseaux Informatiques",   salle: "Labo 03",   enseignant: "Dr. Aoudia"   },
      { creneau: "13:30–15:00", type: "Cours", matiere: "Mathématiques Discrètes", salle: "Amphi B",   enseignant: "Dr. Bensalem" },
    ],
    Mercredi: [
      { creneau: "11:30–13:00", type: "Cours", matiere: "Anglais Technique",        salle: "Salle 01",  enseignant: "M. Larbi"     },
      { creneau: "15:15–16:45", type: "TD",    matiere: "Mathématiques Discrètes",  salle: "Salle 07",  enseignant: "Dr. Bensalem" },
    ],
    Jeudi: [
      { creneau: "08:00–09:30", type: "TD",    matiere: "Génie Logiciel",           salle: "Salle 12",  enseignant: "Dr. Khelifa"  },
      { creneau: "09:45–11:15", type: "TP",    matiere: "Base de Données",          salle: "Labo 06",   enseignant: "Dr. Boudiaf"  },
      { creneau: "13:30–15:00", type: "TD",    matiere: "Anglais Technique",        salle: "Salle 03",  enseignant: "M. Larbi"     },
    ],
  },
};

const TYPE_STYLES = {
  Cours: { bg: "bg-blue-50",   border: "border-l-blue-500",   badge: "bg-blue-100 text-blue-700"   },
  TD:    { bg: "bg-amber-50",  border: "border-l-amber-500",  badge: "bg-amber-100 text-amber-700" },
  TP:    { bg: "bg-green-50",  border: "border-l-green-500",  badge: "bg-green-100 text-green-700" },
};

const TODAY_INDEX = (() => {
  const map = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 };
  return map[new Date().getDay()] ?? 1;
})();

const MON_GROUPE = "G03"; // groupe de l'étudiant connecté

export default function EmploiDuTemps() {
  const [selectedGroupe, setSelectedGroupe] = useState(MON_GROUPE);
  const emploi = EMPLOIS_PAR_GROUPE[selectedGroupe] || {};

  return (
    <div className="max-w-full mx-auto space-y-5">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Emploi du temps</h1>
          <p className="text-sm text-gray-400 mt-0.5">L3 Informatique · Semestre 5</p>
        </div>
        <button
          className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all self-start sm:self-auto"
          onClick={() => alert("Téléchargement PDF simulé")}>
          <Icon name="download" className="w-3.5 h-3.5" /> Télécharger PDF
        </button>
      </div>

      {/* ── Sélecteur de groupe ── */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Groupe :</span>
        <div className="flex flex-wrap gap-2">
          {GROUPES.map(g => (
            <button
              key={g}
              onClick={() => setSelectedGroupe(g)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all border
                ${selectedGroupe === g
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                }`}
            >
              {g}
              {g === MON_GROUPE && (
                <span className={`ml-1.5 text-[9px] font-bold ${selectedGroupe === g ? "text-blue-200" : "text-blue-400"}`}>
                  (mon groupe)
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Légende ── */}
      <div className="flex gap-3 flex-wrap">
        {Object.entries(TYPE_STYLES).map(([t, s]) => (
          <span key={t} className={`text-xs px-3 py-1 rounded-full font-medium ${s.badge}`}>{t}</span>
        ))}
      </div>

      {/* ── Grille semaine ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 w-32">Horaire</th>
              {JOURS.map((j, i) => (
                <th key={j}
                  className={`px-3 py-3 text-center text-xs font-semibold
                    ${i === TODAY_INDEX ? "text-blue-600" : "text-gray-500"}`}>
                  <span className="flex flex-col items-center gap-0.5">
                    {j}
                    {i === TODAY_INDEX && (
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full inline-block" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {CRENEAUX.map(cr => (
              <tr key={cr} className="hover:bg-gray-50/40">
                <td className="px-4 py-3 text-[11px] font-mono text-gray-400 whitespace-nowrap align-middle">
                  {cr}
                </td>
                {JOURS.map((j, ji) => {
                  const s = emploi[j]?.find(x => x.creneau === cr);
                  const style = s ? TYPE_STYLES[s.type] : null;
                  return (
                    <td key={j} className={`px-2 py-2 align-middle ${ji === TODAY_INDEX ? "bg-blue-50/30" : ""}`}>
                      {s ? (
                        <div className={`${style.bg} ${style.border} border-l-4 rounded-xl p-2.5`}>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${style.badge} inline-block mb-1`}>
                            {s.type}
                          </span>
                          <p className="text-[11px] font-semibold text-gray-800 leading-tight">{s.matiere}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{s.enseignant}</p>
                          <p className="text-[10px] text-gray-400 flex items-center gap-0.5 mt-0.5">
                            <Icon name="info" className="w-3 h-3" />{s.salle}
                          </p>
                        </div>
                      ) : (
                        <div className="h-16 flex items-center justify-center">
                          <span className="text-xs text-gray-200">—</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
