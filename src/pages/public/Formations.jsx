import { useState } from "react";
import {
  BookOpen, GitBranch, GraduationCap,
  Network, Code2, Bot, ShieldCheck, Settings, BarChart2,
} from "lucide-react";

// ─── Data Licence ─────────────────────────────────────────────────────────────
const licenceYears = [
  {
    level: "L1",
    icon: <BookOpen className="w-4 h-4" />,
    iconBg: "bg-blue-600",
    title: "Tronc Commun",
    subtitle: "1ère année — Socle commun à toutes les spécialités",
    description:
      "La première année pose les bases fondamentales de l'informatique : algorithmique, mathématiques, architecture des ordinateurs, programmation structurée et introduction aux systèmes.",
    modules: [
      "Algorithmique & Structures de données",
      "Mathématiques discrètes",
      "Architecture des ordinateurs",
      "Programmation (C / Python)",
      "Systèmes d'exploitation — introduction",
      "Anglais scientifique",
    ],
  },
  {
    level: "L2",
    icon: <GitBranch className="w-4 h-4" />,
    iconBg: "bg-indigo-600",
    title: "Choix de spécialité",
    subtitle: "2ème année — Orientation ACAD ou ISIL",
    description:
      "À partir de la deuxième année, les étudiants s'orientent selon leurs résultats entre deux parcours complémentaires.",
    specialites: [
      {
        code: "ACAD",
        color: "blue",
        name: "Architecture & Conception des Applications Distribuées",
        modules: [
          "Réseaux informatiques",
          "Systèmes d'exploitation avancés",
          "Bases de données",
          "Programmation orientée objet",
          "Architecture logicielle",
          "Protocoles & sécurité réseau",
        ],
      },
      {
        code: "ISIL",
        color: "indigo",
        name: "Ingénierie des Systèmes d'Information et du Logiciel",
        modules: [
          "Génie logiciel",
          "Conception UML",
          "Développement web",
          "Bases de données avancées",
          "Méthodes agiles",
          "Tests & qualité logicielle",
        ],
      },
    ],
  },
  {
    level: "L3",
    icon: <GraduationCap className="w-4 h-4" />,
    iconBg: "bg-blue-700",
    title: "Approfondissement",
    subtitle: "3ème année — Finalisation de la Licence",
    description:
      "La troisième année approfondit la spécialité choisie et prépare l'étudiant à l'insertion professionnelle ou à la poursuite en Master.",
    specialites: [
      {
        code: "ACAD",
        color: "blue",
        name: "Architecture & Conception des Applications Distribuées",
        modules: [
          "Cloud Computing",
          "Systèmes distribués",
          "Virtualisation",
          "Sécurité avancée",
          "Projet de fin de licence",
          "Stage en entreprise",
        ],
      },
      {
        code: "ISIL",
        color: "indigo",
        name: "Ingénierie des Systèmes d'Information et du Logiciel",
        modules: [
          "Architecture micro-services",
          "DevOps & CI/CD",
          "Big Data — introduction",
          "Projet de fin de licence",
          "Stage en entreprise",
          "Entrepreneuriat numérique",
        ],
      },
    ],
  },
];

// ─── Data Master ──────────────────────────────────────────────────────────────
const masterSpecs = [
  {
    code: "AI",
    icon: <Bot className="w-5 h-5 text-white" />,
    iconBg: "bg-violet-600",
    name: "Intelligence Artificielle",
    color: "violet",
    modules: [
      "Machine Learning avancé",
      "Deep Learning & réseaux de neurones",
      "Traitement du langage naturel",
      "Vision par ordinateur",
      "Optimisation & IA symbolique",
      "Projet de recherche IA",
    ],
    debouches: ["Data Scientist", "ML Engineer", "AI Researcher"],
  },
  {
    code: "CS",
    icon: <ShieldCheck className="w-5 h-5 text-white" />,
    iconBg: "bg-red-600",
    name: "Cybersécurité",
    color: "red",
    modules: [
      "Cryptographie avancée",
      "Sécurité des réseaux",
      "Ethical hacking & Pentest",
      "Forensique numérique",
      "Sécurité des systèmes embarqués",
      "Normes et conformité",
    ],
    debouches: ["Ingénieur sécurité", "Analyste SOC", "Pentesteur"],
  },
  {
    code: "GL",
    icon: <Settings className="w-5 h-5 text-white" />,
    iconBg: "bg-green-600",
    name: "Génie Logiciel",
    color: "green",
    modules: [
      "Architecture logicielle avancée",
      "Patterns de conception",
      "Qualité & tests avancés",
      "DevOps & automatisation",
      "Systèmes temps-réel",
      "Gestion de projet logiciel",
    ],
    debouches: ["Software Architect", "Tech Lead", "DevOps Engineer"],
  },
  {
    code: "DS",
    icon: <BarChart2 className="w-5 h-5 text-white" />,
    iconBg: "bg-orange-500",
    name: "Data Science",
    color: "orange",
    modules: [
      "Statistiques avancées",
      "Big Data — Spark & Hadoop",
      "Visualisation des données",
      "Bases de données NoSQL",
      "Analyse prédictive",
      "Projet data appliqué",
    ],
    debouches: ["Data Analyst", "Data Engineer", "BI Consultant"],
  },
];

// ─── Colour map ───────────────────────────────────────────────────────────────
const cm = {
  blue:   { badge: "bg-blue-100 text-blue-700",     border: "border-blue-200"   },
  indigo: { badge: "bg-indigo-100 text-indigo-700", border: "border-indigo-200" },
  violet: { badge: "bg-violet-100 text-violet-700", border: "border-violet-200" },
  red:    { badge: "bg-red-100 text-red-700",       border: "border-red-200"    },
  green:  { badge: "bg-green-100 text-green-700",   border: "border-green-200"  },
  orange: { badge: "bg-orange-100 text-orange-700", border: "border-orange-200" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const ModuleList = ({ modules }) => (
  <ul className="mt-3 space-y-1.5">
    {modules.map((m) => (
      <li key={m} className="flex items-center gap-2 text-sm text-gray-600">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
        {m}
      </li>
    ))}
  </ul>
);

const SpecCard = ({ spec }) => {
  const c = cm[spec.color];
  return (
    <div className={`border ${c.border} rounded-2xl p-5 bg-white`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${c.badge}`}>{spec.code}</span>
        <span className="text-sm font-semibold text-gray-800 leading-snug">{spec.name}</span>
      </div>
      <ModuleList modules={spec.modules} />
    </div>
  );
};

// ─── Licence ──────────────────────────────────────────────────────────────────
const LicenceSection = () => {
  const [active, setActive] = useState("L1");
  const year = licenceYears.find((y) => y.level === active);

  return (
    <section className="mb-14">
      {/* Level tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {licenceYears.map((y) => (
          <button
            key={y.level}
            onClick={() => setActive(y.level)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              active === y.level
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {/* Icon inside tab */}
            <span className={`flex items-center justify-center w-5 h-5 rounded ${active === y.level ? "bg-white/20" : y.iconBg + " text-white"} transition-all`}>
              {y.icon}
            </span>
            {y.level}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50 shadow-sm">
        {/* Title row */}
        <div className="flex items-center gap-3 mb-1">
          <div className={`${year.iconBg} text-white p-2 rounded-lg flex-shrink-0`}>
            {year.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                {year.level}
              </span>
              <h3 className="text-lg font-bold text-gray-900">{year.title}</h3>
            </div>
            <p className="text-gray-500 text-sm">{year.subtitle}</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-5">{year.description}</p>

        {year.modules ? (
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-sm font-semibold text-gray-700 mb-1">Modules principaux</p>
            <ModuleList modules={year.modules} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {year.specialites.map((s) => <SpecCard key={s.code} spec={s} />)}
          </div>
        )}
      </div>
    </section>
  );
};

// ─── Master ───────────────────────────────────────────────────────────────────
const MasterSection = () => (
  <section>
    <p className="text-gray-500 text-sm mb-7 max-w-2xl">
      Le programme de Master offre une formation avancée de 2 ans (M1 & M2) avec 4 spécialités de pointe préparant aux métiers d'ingénieur et à la recherche.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {masterSpecs.map((spec) => {
        const c = cm[spec.color];
        return (
          <div key={spec.code} className={`border ${c.border} rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow`}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`${spec.iconBg} p-2.5 rounded-xl flex-shrink-0`}>
                {spec.icon}
              </div>
              <div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${c.badge}`}>{spec.code}</span>
                <h3 className="font-bold text-gray-900 text-sm mt-0.5">{spec.name}</h3>
              </div>
            </div>
            {/* Modules */}
            <ModuleList modules={spec.modules} />
            {/* Débouchés */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Débouchés</p>
              <div className="flex flex-wrap gap-1.5">
                {spec.debouches.map((d) => (
                  <span key={d} className={`text-xs px-2.5 py-0.5 rounded-full ${c.badge}`}>{d}</span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const Formations = () => {
  const [tab, setTab] = useState("licence");

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-200 text-sm mb-2">Nos formations</p>
          <h1 className="text-4xl font-bold mb-3">Formations proposées</h1>
          <p className="text-blue-100 max-w-xl">
            Découvrez nos programmes universitaires — de la Licence au Master — conçus pour former les ingénieurs et chercheurs de demain.
          </p>
          <div className="flex gap-3 mt-7">
            {[
              { id: "licence", label: "Licence (L1 – L3)", icon: <BookOpen className="w-4 h-4" /> },
              { id: "master",  label: "Master (M1 – M2)",  icon: <GraduationCap className="w-4 h-4" /> },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  tab === t.id
                    ? "bg-white text-blue-700 shadow"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {tab === "licence" ? <LicenceSection /> : <MasterSection />}
      </div>
    </main>
  );
};

export default Formations;
