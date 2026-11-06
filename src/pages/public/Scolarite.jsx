// ── Scolarite.jsx — fidèle au design Figma ───────────────────────────────────
import { Calendar, FileText, ShieldAlert, Info, Clock } from "lucide-react";

const calendrier = [
  { label: "Début du semestre 2",   date: "12 Fév 2025",          passed: true  },
  { label: "Période de révision",   date: "12–16 Mai 2025",       passed: false },
  { label: "Examens S2",            date: "19 Mai – 5 Juin 2025", passed: false },
  { label: "Résultats affichés",    date: "20 Juin 2025",         passed: false },
  { label: "Session de rattrapage", date: "7–20 Juil 2025",       passed: false },
  { label: "Rentrée 2025-2026",     date: "22 Sep 2025",          passed: false },
];

const procedures = [
  { doc: "Demande de certificat de scolarité",         delai: "3 jours ouvrables"  },
  { doc: "Attestation de réussite",                    delai: "5 jours ouvrables"  },
  { doc: "Relevé de notes officiel",                   delai: "7 jours ouvrables"  },
  { doc: "Demande de transfert",                       delai: "15 jours ouvrables" },
  { doc: "Equivalence de diplôme",                     delai: "21 jours ouvrables" },
  { doc: "Inscription pédagogique (changement option)",delai: "3 jours ouvrables"  },
];

const sideInfos = [
  {
    icon: <FileText className="w-5 h-5 text-blue-600" />,
    title: "Inscription pédagogique",
    desc: "Les étudiants doivent renouveler leur inscription pédagogique chaque semestre via le portail étudiant.",
  },
  {
    icon: <ShieldAlert className="w-5 h-5 text-orange-500" />,
    title: "Règlement intérieur",
    desc: "Toute absence non justifiée dans les 48h entraîne une exclusion du module concerné.",
  },
  {
    icon: <Info className="w-5 h-5 text-green-600" />,
    title: "Système d'évaluation",
    desc: "La note finale est calculée sur la base du contrôle continu (40%) et de l'examen final (60%).",
  },
];

const Scolarite = () => (
  <main className="min-h-screen bg-white">
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── Gauche 2/3 ───────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-10">

          {/* Calendrier */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Calendrier Académique 2024-2025
            </h2>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
              {calendrier.map((row) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between px-5 py-3.5 ${
                    row.passed ? "bg-gray-50" : "bg-white hover:bg-blue-50/40 transition-colors"
                  }`}
                >
                  <span className={`text-sm ${row.passed ? "line-through text-gray-400" : "text-gray-700"}`}>
                    {row.label}
                  </span>
                  <span className={`text-sm font-medium ${row.passed ? "text-gray-400" : "text-blue-600"}`}>
                    {row.date}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Procédures */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Procédures Administratives
            </h2>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="grid grid-cols-2 px-5 py-3 bg-gray-50 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Document</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">Délai</span>
              </div>
              {procedures.map((p, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-blue-50/30 transition-colors"
                >
                  <span className="text-sm text-gray-700">{p.doc}</span>
                  <span className="text-sm text-gray-500 text-right">{p.delai}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Sidebar droite 1/3 ───────────────────────────────────── */}
        <aside className="space-y-7">
          {sideInfos.map((info) => (
            <div key={info.title}>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm mb-1">
                {info.icon}
                {info.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed pl-7">{info.desc}</p>
            </div>
          ))}

          {/* Blue card heures */}
          <div className="bg-blue-600 rounded-2xl p-6 text-white">
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Heures d'ouverture
            </h3>
            <div className="space-y-2 text-sm">
              {[
                { day: "Dim – Jeu", hours: "8h – 16h" },
                { day: "Samedi",    hours: "8h – 12h" },
                { day: "Vendredi",  hours: "Fermé",   muted: true },
              ].map((r) => (
                <div key={r.day} className="flex justify-between">
                  <span className="text-blue-100">{r.day}</span>
                  <span className={r.muted ? "text-blue-300" : "font-semibold"}>{r.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  </main>
);

export default Scolarite;
