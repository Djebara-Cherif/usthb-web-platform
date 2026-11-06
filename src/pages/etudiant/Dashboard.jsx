import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // <-- AJOUT
import { Icon } from "../../components/Icon";        // <-- AJOUT

/* ── Mock data ── */
const STATS = [
  { label: "Modules inscrits", value: "6",      bg: "bg-blue-50",   text: "text-blue-600"   },
  { label: "Moyenne générale", value: "13.5",   bg: "bg-green-50",  text: "text-green-600"  },
  { label: "Absences",         value: "2",      bg: "bg-orange-50", text: "text-orange-500" },
  { label: "Prochain examen",  value: "19 Mai", bg: "bg-purple-50", text: "text-purple-600" },
];

const QUICK_ACCESS = [
  { label: "Mes cours",        to: "/etudiant/cours",           icon: "book",      color: "text-blue-500   bg-blue-50"   },
  { label: "Mes notes",        to: "/etudiant/notes",           icon: "clipboard", color: "text-green-500  bg-green-50"  },
  { label: "Emploi du temps",  to: "/etudiant/emploi-du-temps", icon: "calendar",  color: "text-purple-500 bg-purple-50" },
  { label: "PFE / Stages",     to: "/etudiant/stages",          icon: "briefcase", color: "text-orange-500 bg-orange-50" },
  { label: "Documents",        to: "/etudiant/documents",       icon: "download",  color: "text-teal-500   bg-teal-50"   },
];

const ACTIVITES = [
  { temps: "Il y a 2h",      couleur: "bg-blue-100 text-blue-700",     texte: "Nouveau support ajouté : Algorithmique Avancée" },
  { temps: "Hier",           couleur: "bg-green-100 text-green-700",   texte: "Notes de TP publiées : Base de données"          },
  { temps: "Il y a 3 jours", couleur: "bg-purple-100 text-purple-700", texte: "Rappel : Examen Réseaux le 20 Mai"               },
];

function StatCard({ label, value, bg, text }) {
  return (
    <div className={`${bg} rounded-2xl p-5`}>
      <p className={`text-3xl font-extrabold ${text}`}>{value}</p>
      <p className="text-xs text-gray-500 font-medium mt-1">{label}</p>
    </div>
  );
}

function QuickCard({ label, to, icon, color }) {
  return (
    <Link to={to}
      className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm group transition-all">
      <div className="flex items-center gap-3">
        <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon name={icon} className="w-4 h-4" />
        </span>
        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{label}</span>
      </div>
      <Icon name="arrow" className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors" />
    </Link>
  );
}

export default function DashboardEtudiant() {
  const { user } = useAuth(); // <-- Récupération du contexte
  
  const prenom    = user?.name?.split(" ")[0] || "Amina";
  const nom       = user?.name?.split(" ").slice(1).join(" ") || "Benali";
  const initiales = user?.initiales || "AB";
  const niveau    = "L3 Informatique";
  const section   = "Section B — Groupe 03";

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Bienvenue, {prenom}&nbsp;!</h1>
        <p className="text-sm text-gray-400 mt-1">Voici un résumé de votre semestre en cours.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Main 2-col */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accès rapides */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Accès rapides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUICK_ACCESS.map(item => <QuickCard key={item.to} {...item} />)}
          </div>
        </div>

        {/* Activité récente */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Activité récente</h2>
          <ul className="space-y-4">
            {ACTIVITES.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${a.couleur}`}>
                  {a.temps}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed">{a.texte}</p>
              </li>
            ))}
          </ul>
          {/* Mini profil */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
              {initiales}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">{prenom} {nom}</p>
              <p className="text-[11px] text-gray-400">{niveau}</p>
              <p className="text-[11px] text-gray-400">{section}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}