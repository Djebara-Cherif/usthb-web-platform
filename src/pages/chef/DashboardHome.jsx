import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Icon } from "../../components/Icon";

const STATS = [
  { label: "Enseignants",     value: "24",  bg: "bg-blue-50",   text: "text-blue-600"   },
  { label: "Modules actifs",  value: "18",  bg: "bg-green-50",  text: "text-green-600"  },
  { label: "Étudiants dept.", value: "620", bg: "bg-orange-50", text: "text-orange-500" },
  { label: "Salles gérées",   value: "8",   bg: "bg-purple-50", text: "text-purple-600" },
];

const QUICK_ACCESS = [
  { label: "Corps enseignant",    to: "/chef/enseignants",      icon: "users",    color: "text-blue-500   bg-blue-50"   },
  { label: "Gérer les étudiants", to: "/chef/etudiants",        icon: "users",    color: "text-indigo-500 bg-indigo-50" },
  { label: "Modules",             to: "/chef/modules",          icon: "book",     color: "text-green-500  bg-green-50"  },
  { label: "Emplois du temps",    to: "/chef/emplois-du-temps", icon: "calendar", color: "text-purple-500 bg-purple-50" },
  { label: "Infrastructures",     to: "/chef/infrastructures",  icon: "building", color: "text-orange-500 bg-orange-50" },
  { label: "Communication",       to: "/chef/communication",    icon: "radio",    color: "text-rose-500   bg-rose-50"   },
];

const ACTIVITES = [
  { temps: "Urgent",         couleur: "bg-red-100 text-red-700",       texte: "Planning S2 en attente de validation finale" },
  { temps: "Aujourd'hui",    couleur: "bg-blue-100 text-blue-700",     texte: "Pr. Amrani a soumis ses notes — BDD Avancée" },
  { temps: "Il y a 2 jours", couleur: "bg-purple-100 text-purple-700", texte: "Taux de réussite S1 : 72% — rapport disponible" },
];

function StatCard({ label, value, bg, text }) {
  return (
    <div className={`${bg} rounded-2xl p-5 border border-gray-50`}>
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

export default function DashboardHome() {
  const { user } = useAuth();
  
  const prenom    = user?.name?.split(" ")[0] || "Pr.";
  const nom       = user?.name?.split(" ").slice(1).join(" ") || "Hadj";
  const initiales = user?.initiales || "PH";

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Bonjour, {prenom} {nom}&nbsp;!</h1>
        <p className="text-sm text-gray-400 mt-1">Vue d'ensemble du département {user?.department || "Informatique"}.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Accès rapides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUICK_ACCESS.map(item => <QuickCard key={item.to} {...item} />)}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Activité récente</h2>
          <ul className="space-y-4 flex-1">
            {ACTIVITES.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${a.couleur}`}>
                  {a.temps}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed">{a.texte}</p>
              </li>
            ))}
          </ul>

          {/* Mini profil en bas */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
              {initiales}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">{prenom} {nom}</p>
              <p className="text-[11px] text-gray-400">{user?.roleLabel || "Chef de Département"}</p>
              <p className="text-[11px] text-gray-400">{user?.department || "Département Informatique"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}