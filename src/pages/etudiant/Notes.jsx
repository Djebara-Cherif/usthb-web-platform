import React, { useState } from "react";
import { Icon } from "../../components/Icon";

/* ════════════════════════════════════════════
   DONNÉES (remplacer par API)
════════════════════════════════════════════ */

/* ── Semestre en cours S5 (pas de moyenne affichée) ── */
const S5_MODULES = [
  { id: 1, code: "INF301", nom: "Algorithmique Avancée",    coeff: 6, examen: 14.5, td: 15,   tp: 16   },
  { id: 2, code: "INF302", nom: "Base de Données",           coeff: 5, examen: 13,   td: 14,   tp: 13.5 },
  { id: 3, code: "INF303", nom: "Réseaux Informatiques",     coeff: 5, examen: 11.5, td: 13,   tp: 12   },
  { id: 4, code: "INF304", nom: "Génie Logiciel",            coeff: 4, examen: 15,   td: 16,   tp: 15.5 },
  { id: 5, code: "MAT301", nom: "Mathématiques Discrètes",   coeff: 4, examen: 12,   td: 13,   tp: null },
  { id: 6, code: "ANG301", nom: "Anglais Technique",         coeff: 2, examen: 14,   td: 15,   tp: null },
];

/* ── Anciens semestres ── */
const HISTORIQUE = [
  {
    annee: "L2 — 2024–2025",
    semestres: [
      {
        label: "Semestre 4",
        modules: [
          { id: 1, code: "INF201", nom: "Systèmes d'exploitation",    coeff: 6, examen: 13,   td: 14,   tp: 13   },
          { id: 2, code: "INF202", nom: "Programmation Web",           coeff: 4, examen: 15,   td: 15.5, tp: 16   },
          { id: 3, code: "INF203", nom: "Architecture des ordinateurs",coeff: 5, examen: 9,    td: 10,   tp: 9.5  },
          { id: 4, code: "MAT201", nom: "Probabilités & Statistiques", coeff: 4, examen: 12,   td: 12.5, tp: null },
          { id: 5, code: "ANG201", nom: "Anglais 2",                   coeff: 2, examen: 14,   td: 15,   tp: null },
        ],
      },
      {
        label: "Semestre 3",
        modules: [
          { id: 1, code: "INF101", nom: "Structures de données",       coeff: 6, examen: 11,   td: 12,   tp: 11.5 },
          { id: 2, code: "INF102", nom: "Prog. orientée objet",        coeff: 5, examen: 14,   td: 14.5, tp: 15   },
          { id: 3, code: "INF103", nom: "Bases de données 1",          coeff: 5, examen: 8,    td: 9,    tp: 8.5  },
          { id: 4, code: "MAT101", nom: "Algèbre linéaire",            coeff: 4, examen: 10,   td: 11,   tp: null },
          { id: 5, code: "ANG101", nom: "Anglais 1",                   coeff: 2, examen: 13,   td: 14,   tp: null },
        ],
      },
    ],
  },
  {
    annee: "L1 — 2023–2024",
    semestres: [
      {
        label: "Semestre 2",
        modules: [
          { id: 1, code: "INF002", nom: "Algorithmique 2",             coeff: 6, examen: 12,   td: 13,   tp: 12.5 },
          { id: 2, code: "MAT002", nom: "Analyse 2",                   coeff: 5, examen: 9,    td: 10,   tp: null },
          { id: 3, code: "PHY001", nom: "Physique 1",                  coeff: 4, examen: 11,   td: 11.5, tp: 12   },
          { id: 4, code: "INF003", nom: "Électronique numérique",      coeff: 4, examen: 13,   td: 13.5, tp: 14   },
          { id: 5, code: "ANG001", nom: "Anglais",                     coeff: 2, examen: 15,   td: 15.5, tp: null },
        ],
      },
      {
        label: "Semestre 1",
        modules: [
          { id: 1, code: "INF001", nom: "Algorithmique 1",             coeff: 6, examen: 14,   td: 14.5, tp: 15   },
          { id: 2, code: "MAT001", nom: "Analyse 1",                   coeff: 5, examen: 8,    td: 9,    tp: null },
          { id: 3, code: "MAT003", nom: "Algèbre 1",                   coeff: 4, examen: 10,   td: 10.5, tp: null },
          { id: 4, code: "INF004", nom: "Architecture machine",        coeff: 4, examen: 12,   td: 13,   tp: 13.5 },
          { id: 5, code: "FRN001", nom: "Français",                    coeff: 2, examen: 13,   td: 14,   tp: null },
        ],
      },
    ],
  },
];

/* ════════════════════════════════════════════
   UTILITAIRES
════════════════════════════════════════════ */
function calcMoyModule(m) {
  if (m.tp !== null)
    return parseFloat((m.examen * 0.6 + m.td * 0.2 + m.tp * 0.2).toFixed(2));
  return parseFloat((m.examen * 0.67 + m.td * 0.33).toFixed(2));
}

function calcMoySemestre(modules) {
  const totalCoeff = modules.reduce((a, m) => a + m.coeff, 0);
  const total      = modules.reduce((a, m) => a + calcMoyModule(m) * m.coeff, 0);
  return parseFloat((total / totalCoeff).toFixed(2));
}

function calcMoyAnnee(sem1, sem2) {
  return parseFloat(((calcMoySemestre(sem1.modules) + calcMoySemestre(sem2.modules)) / 2).toFixed(2));
}

/* Vert si >= 10, rouge si < 10 */
function noteColor(note) {
  if (note === null || note === undefined) return "text-gray-400";
  return note >= 10 ? "text-green-600 font-semibold" : "text-red-500 font-semibold";
}

function StatusBadge({ moy }) {
  const m = parseFloat(moy);
  if (m >= 10) return <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 whitespace-nowrap">✓ Validé — session normale</span>;
  if (m >= 8)  return <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-600 whitespace-nowrap">⚠ Rattrapage</span>;
  return             <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-600 whitespace-nowrap">✗ Dettes</span>;
}

/* ════════════════════════════════════════════
   TABLE D'UN SEMESTRE
   showMoyenne=false pour S5 (en cours)
════════════════════════════════════════════ */
function SemestreTable({ modules, showMoyenne }) {
  const moyS = calcMoySemestre(modules);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[520px]">
        <thead>
          <tr className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase tracking-wide border-b border-gray-100">
            <th className="px-4 py-3 text-left">Module</th>
            <th className="px-3 py-3 text-center">Coeff.</th>
            <th className="px-3 py-3 text-center">Examen</th>
            <th className="px-3 py-3 text-center">TD</th>
            <th className="px-3 py-3 text-center">TP</th>
            {showMoyenne && <th className="px-3 py-3 text-right pr-5">Moy. Module</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {modules.map(m => {
            const moy = calcMoyModule(m);
            return (
              <tr key={m.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-gray-100 text-gray-600 flex-shrink-0">{m.code}</span>
                    <span className="text-xs text-gray-700 font-medium">{m.nom}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-center text-xs text-gray-500 font-medium">{m.coeff}</td>
                <td className={`px-3 py-3 text-center text-sm ${noteColor(m.examen)}`}>{m.examen}</td>
                <td className={`px-3 py-3 text-center text-sm ${noteColor(m.td)}`}>{m.td}</td>
                <td className={`px-3 py-3 text-center text-sm ${m.tp !== null ? noteColor(m.tp) : "text-gray-300"}`}>
                  {m.tp !== null ? m.tp : "—"}
                </td>
                {showMoyenne && (
                  <td className={`px-3 py-3 text-right pr-5 text-sm font-bold ${noteColor(moy)}`}>{moy} / 20</td>
                )}
              </tr>
            );
          })}
        </tbody>
        {showMoyenne && (
          <tfoot>
            <tr className="border-t-2 border-gray-200 bg-gray-50">
              <td className="px-4 py-3 text-xs font-bold text-gray-600" colSpan={5}>
                Moyenne du semestre
              </td>
              <td className={`px-3 py-3 text-right pr-5 text-sm font-extrabold ${noteColor(moyS)}`}>
                {moyS} / 20
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

/* ════════════════════════════════════════════
   BLOC ANNÉE (2 semestres + moy annuelle)
════════════════════════════════════════════ */
function AnneeBloc({ anneeData }) {
  const [openSem, setOpenSem] = useState(null);
  // semestres[0] = plus récent (S4 ou S2), semestres[1] = plus ancien (S3 ou S1)
  const [semRecent, semAncien] = anneeData.semestres;
  const moyAnnee = calcMoyAnnee(semRecent, semAncien);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Entête année */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-5 py-4 bg-gray-50 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-bold text-gray-800">{anneeData.annee}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">Moyenne annuelle :</span>
            <span className={`text-sm font-extrabold ${noteColor(moyAnnee)}`}>{moyAnnee} / 20</span>
            <StatusBadge moy={moyAnnee} />
          </div>
        </div>
      </div>

      {/* Chaque semestre */}
      {anneeData.semestres.map((sem, idx) => {
        const moySem = calcMoySemestre(sem.modules);
        const isOpen = openSem === idx;
        return (
          <div key={sem.label} className="border-b border-gray-100 last:border-b-0">
            {/* Toggle */}
            <button
              onClick={() => setOpenSem(isOpen ? null : idx)}
              className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-all text-left"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">{sem.label}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${moySem >= 10 ? "bg-green-100 text-green-700" : moySem >= 8 ? "bg-orange-100 text-orange-600" : "bg-red-100 text-red-600"}`}>
                  {moySem} / 20
                </span>
                <StatusBadge moy={moySem} />
              </div>
              <Icon name="chevron" className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Table détail */}
            {isOpen && (
              <div className="border-t border-gray-100">
                <SemestreTable modules={sem.modules} showMoyenne={true} />
                {/* Pied récap */}
                <div className="px-5 py-3 bg-gray-50/50 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    {sem.modules.filter(m => calcMoyModule(m) >= 10).length} / {sem.modules.length} modules validés
                    &nbsp;·&nbsp;
                    {sem.modules.reduce((a, m) => a + m.coeff, 0)} coefficients
                  </span>
                  <StatusBadge moy={moySem} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════
   PAGE PRINCIPALE
════════════════════════════════════════════ */
export default function Notes() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Mes Notes</h1>
        <p className="text-sm text-gray-400 mt-0.5">Relevé académique complet — L3 Informatique</p>
      </div>

      {/* ══ SEMESTRE EN COURS S5 ══ */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 bg-blue-600 text-white">
          <div>
            <h2 className="text-sm font-bold">Semestre 5 — En cours</h2>
            <p className="text-xs text-blue-200 mt-0.5">L3 Informatique · 2025–2026</p>
          </div>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-medium border border-white/30">
            Notes provisoires
          </span>
        </div>
        <SemestreTable modules={S5_MODULES} showMoyenne={false} />
        <div className="px-5 py-3 border-t border-gray-100 bg-blue-50/40">
          <p className="text-xs text-blue-600 flex items-center gap-1.5">
            <Icon name="info" className="w-3.5 h-3.5" />
            La moyenne sera calculée après la délibération finale.
          </p>
        </div>
      </div>

      {/* ══ HISTORIQUE ══ */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Historique académique</h2>
        {HISTORIQUE.map(annee => (
          <AnneeBloc key={annee.annee} anneeData={annee} />
        ))}
      </div>

    </div>
  );
}
