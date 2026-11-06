import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../components/Icon";

/* ════════════════════════════════════════════
   DONNÉES (remplacer par API)
════════════════════════════════════════════ */
const THEMES_LICENCE_ACTUELS = [
  { id: 1, titre: "Système de gestion des stages en ligne",           encadrant: "Dr. Meziane",   specialite: "GL" },
  { id: 2, titre: "Application mobile de gestion d'emploi du temps",  encadrant: "Dr. Boudiaf",   specialite: "SI" },
  { id: 3, titre: "Plateforme e-learning pour la faculté",            encadrant: "Dr. Khelifa",   specialite: "GL" },
  { id: 4, titre: "Détection d'anomalies réseau par ML",              encadrant: "Dr. Aoudia",    specialite: "RS" },
  { id: 5, titre: "Chatbot académique basé sur NLP",                  encadrant: "Dr. Bensalem",  specialite: "IA" },
  { id: 6, titre: "Système de reconnaissance faciale pour l'accès",  encadrant: "Dr. Meziane",   specialite: "IA" },
  { id: 7, titre: "Application de suivi pédagogique en temps réel",  encadrant: "Dr. Khelifa",   specialite: "GL" },
];

const THEMES_LICENCE_ANCIENS = [
  { id: 8,  annee: "2024–2025", titre: "Système de vote électronique sécurisé",         encadrant: "Dr. Meziane",  specialite: "SI" },
  { id: 9,  annee: "2024–2025", titre: "Application de gestion de bibliothèque",         encadrant: "Dr. Boudiaf",  specialite: "GL" },
  { id: 10, annee: "2024–2025", titre: "Réseau de capteurs IoT pour campus intelligent", encadrant: "Dr. Aoudia",   specialite: "RS" },
  { id: 11, annee: "2023–2024", titre: "Système de détection de plagiat",                encadrant: "Dr. Khelifa",  specialite: "IA" },
  { id: 12, annee: "2023–2024", titre: "Plateforme de recrutement universitaire",        encadrant: "Dr. Bensalem", specialite: "GL" },
  { id: 13, annee: "2022–2023", titre: "Analyse Big Data des résultats académiques",     encadrant: "Dr. Meziane",  specialite: "BD" },
];

const THEMES_MASTER_ACTUELS = [
  { id: 1, titre: "Deep Learning pour la reconnaissance faciale",     encadrant: "Pr. Hamidi",   specialite: "IA" },
  { id: 2, titre: "Sécurité des réseaux SDN",                         encadrant: "Pr. Slimane",  specialite: "RS" },
  { id: 3, titre: "Blockchain pour la traçabilité académique",        encadrant: "Dr. Meziane",  specialite: "SI" },
  { id: 4, titre: "Optimisation par algorithmes évolutionnaires",     encadrant: "Pr. Amrani",   specialite: "IA" },
  { id: 5, titre: "Federated Learning pour données médicales",        encadrant: "Pr. Hamidi",   specialite: "IA" },
  { id: 6, titre: "Analyse de séries temporelles par LSTM",           encadrant: "Pr. Amrani",   specialite: "IA" },
];

const THEMES_MASTER_ANCIENS = [
  { id: 7,  annee: "2024–2025", titre: "Cloud computing pour systèmes distribués",       encadrant: "Pr. Hamidi",  specialite: "SI" },
  { id: 8,  annee: "2024–2025", titre: "Analyse de sentiments sur réseaux sociaux",      encadrant: "Pr. Amrani",  specialite: "IA" },
  { id: 9,  annee: "2023–2024", titre: "Cyber-sécurité et tests d'intrusion",            encadrant: "Pr. Slimane", specialite: "RS" },
  { id: 10, annee: "2022–2023", titre: "Vision par ordinateur pour véhicules autonomes", encadrant: "Pr. Amrani",  specialite: "IA" },
];

const ENCADRANTS = [
  { nom: "Dr. Meziane",   grade: "Maître de conférences A", dep: "Génie Logiciel",     email: "meziane@fi.usthb.dz",  bureau: "B204" },
  { nom: "Dr. Boudiaf",   grade: "Maître de conférences B", dep: "Systèmes Info.",     email: "boudiaf@fi.usthb.dz",  bureau: "A110" },
  { nom: "Dr. Khelifa",   grade: "Maître de conférences A", dep: "Génie Logiciel",     email: "khelifa@fi.usthb.dz",  bureau: "B212" },
  { nom: "Dr. Aoudia",    grade: "Maître de conférences B", dep: "Réseaux",             email: "aoudia@fi.usthb.dz",   bureau: "C305" },
  { nom: "Dr. Bensalem",  grade: "Maître de conférences B", dep: "Mathématiques",      email: "bensalem@fi.usthb.dz", bureau: "A218" },
  { nom: "Pr. Hamidi",    grade: "Professeur",               dep: "Intelligence Art.", email: "hamidi@fi.usthb.dz",   bureau: "D401" },
  { nom: "Pr. Slimane",   grade: "Professeur",               dep: "Réseaux",             email: "slimane@fi.usthb.dz",  bureau: "C310" },
  { nom: "Pr. Amrani",    grade: "Professeur",               dep: "Intelligence Art.", email: "amrani@fi.usthb.dz",   bureau: "D408" },
];

const SPEC_COLORS = {
  GL: "bg-blue-50 text-blue-700",
  SI: "bg-indigo-50 text-indigo-700",
  RS: "bg-teal-50 text-teal-700",
  IA: "bg-purple-50 text-purple-700",
  BD: "bg-green-50 text-green-700",
};

const TABS = ["Thèmes Licence", "Thèmes Master", "Encadrants"];

/* ── Carte thème simple (sans postuler) ── */
function ThemeCard({ theme }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-3 hover:border-blue-200 hover:shadow-md transition-all">
      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon name="file" className="w-4 h-4 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <p className="text-sm font-semibold text-gray-800 leading-tight flex-1">{theme.titre}</p>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${SPEC_COLORS[theme.specialite] || "bg-gray-100 text-gray-600"}`}>
            {theme.specialite}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
          <Icon name="user" className="w-3 h-3" />{theme.encadrant}
        </p>
        {theme.annee && (
          <p className="text-[10px] text-gray-300 mt-1">{theme.annee}</p>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   PAGE PRINCIPALE
════════════════════════════════════════════ */
export default function Stages() {
  const navigate   = useNavigate();
  const [activeTab,    setActiveTab]    = useState("Thèmes Licence");
  const [showAnciens,  setShowAnciens]  = useState(false);
  const [searchTheme,  setSearchTheme]  = useState("");
  const [searchEnc,    setSearchEnc]    = useState("");

  /* Thèmes selon onglet actif */
  const actuels = activeTab === "Thèmes Licence" ? THEMES_LICENCE_ACTUELS : THEMES_MASTER_ACTUELS;
  const anciens  = activeTab === "Thèmes Licence" ? THEMES_LICENCE_ANCIENS : THEMES_MASTER_ANCIENS;

  const filterTheme = (list) =>
    list.filter(t =>
      t.titre.toLowerCase().includes(searchTheme.toLowerCase()) ||
      t.encadrant.toLowerCase().includes(searchTheme.toLowerCase())
    );

  const encFiltres = ENCADRANTS.filter(e =>
    e.nom.toLowerCase().includes(searchEnc.toLowerCase()) ||
    e.dep.toLowerCase().includes(searchEnc.toLowerCase())
  );

  /* Rediriger email → messagerie */
  const handleEmail = (enc) => {
    navigate("/etudiant/messagerie", { state: { destinataire: enc.nom, email: enc.email } });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Stages &amp; PFE</h1>
        <p className="text-sm text-gray-400 mt-0.5">Thèmes proposés et liste des encadrants</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {TABS.map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setShowAnciens(false); setSearchTheme(""); }}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* ══ THEMES LICENCE / MASTER ══ */}
      {(activeTab === "Thèmes Licence" || activeTab === "Thèmes Master") && (
        <>
          {/* Barre de recherche + bouton anciens */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-48">
              <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Rechercher thème ou encadrant…"
                value={searchTheme} onChange={e => setSearchTheme(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white transition-all"
              />
            </div>
            <button
              onClick={() => setShowAnciens(!showAnciens)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all
                ${showAnciens
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"}`}>
              <Icon name="calendar" className="w-3.5 h-3.5" />
              Anciens thèmes
            </button>
          </div>

          {/* Thèmes de l'année en cours */}
          {!showAnciens && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-600">
                  Thèmes proposés — 2025–2026
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    ({filterTheme(actuels).length} thèmes)
                  </span>
                </h2>
              </div>
              {filterTheme(actuels).length === 0
                ? <p className="text-center py-10 text-sm text-gray-400">Aucun thème trouvé.</p>
                : <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filterTheme(actuels).map(t => <ThemeCard key={t.id} theme={t} />)}
                  </div>
              }
            </>
          )}

          {/* Anciens thèmes */}
          {showAnciens && (
            <>
              <h2 className="text-sm font-bold text-gray-600">
                Anciens thèmes
                <span className="ml-2 text-xs font-normal text-gray-400">
                  ({filterTheme(anciens).length} thèmes)
                </span>
              </h2>
              {/* Regroupement par année */}
              {["2024–2025", "2023–2024", "2022–2023"].map(annee => {
                const themesAnnee = filterTheme(anciens.filter(t => t.annee === annee));
                if (themesAnnee.length === 0) return null;
                return (
                  <div key={annee} className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">{annee}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {themesAnnee.map(t => <ThemeCard key={t.id} theme={t} />)}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}

      {/* ══ ENCADRANTS ══ */}
      {activeTab === "Encadrants" && (
        <>
          <div className="relative">
            <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Rechercher un encadrant ou département…"
              value={searchEnc} onChange={e => setSearchEnc(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 w-72 bg-white transition-all"
            />
          </div>

          {encFiltres.length === 0
            ? <p className="text-center py-10 text-sm text-gray-400">Aucun encadrant trouvé.</p>
            : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {encFiltres.map((enc, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-4 hover:border-blue-200 transition-all">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {enc.nom.split(" ").map(w => w[0]).slice(0, 2).join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-800">{enc.nom}</p>
                      <p className="text-xs text-blue-600 font-medium">{enc.grade}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{enc.dep}</p>
                      <div className="flex flex-wrap gap-3 mt-2.5">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Icon name="info" className="w-3 h-3 text-gray-400" />Bureau {enc.bureau}
                        </span>
                        {/* Email → messagerie */}
                        <button
                          onClick={() => handleEmail(enc)}
                          className="text-xs text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors"
                        >
                          <Icon name="message" className="w-3 h-3" />
                          {enc.email}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          }
        </>
      )}
    </div>
  );
}
