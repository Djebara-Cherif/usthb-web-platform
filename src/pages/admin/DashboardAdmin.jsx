import React from "react";
import { useNavigate } from "react-router-dom";

const Ico = ({ d, size = 18, stroke = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const P = {
  users:  "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  wrench: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
  arrow:  "M9 5l7 7-7 7",
};

const StatCard = ({ value, label, color, bg }) => (
  <div className={`rounded-xl p-5 ${bg} border border-gray-100`}>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
    <p className="text-sm text-gray-500 mt-1">{label}</p>
  </div>
);

const QuickCard = ({ iconPath, label, onClick }) => (
  <button onClick={onClick}
    className="flex items-center justify-between w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all group">
    <div className="flex items-center gap-3 text-gray-600 group-hover:text-blue-600">
      <Ico d={iconPath} size={18} /><span className="font-medium text-sm">{label}</span>
    </div>
    <Ico d={P.arrow} size={16} />
  </button>
);

export default function DashboardAdmin() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord Admin</h1>
        <p className="text-sm text-gray-400 mt-0.5">Contrôle global du système d'information de la faculté.</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="4 380"  label="Utilisateurs actifs"  color="text-blue-600"    bg="bg-blue-50" />
        <StatCard value="+47"    label="Comptes créés (mois)" color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard value="2"      label="Alertes système"       color="text-red-500"     bg="bg-red-50" />
        <StatCard value="99.8%"  label="Uptime"                color="text-violet-600"  bg="bg-violet-50" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Accès rapides</h2>
          <div className="space-y-2.5">
            <QuickCard iconPath={P.users}  label="Utilisateurs" onClick={() => navigate("/admin/utilisateurs")} />
            <QuickCard iconPath={P.shield} label="Sécurité"     onClick={() => navigate("/admin/securite")} />
            <QuickCard iconPath={P.wrench} label="Maintenance"  onClick={() => navigate("/admin/maintenance")} />
            {/* Messagerie retirée d'ici ! */}
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Activité récente</h2>
          <div className="space-y-4">
            {[
              { time:"Il y a 15 min", tc:"text-red-600",  tb:"bg-red-50",   msg:"Tentative de connexion échouée (×5) — IP 196.x.x.x" },
              { time:"Aujourd'hui",   tc:"text-blue-600", tb:"bg-blue-50",  msg:"Sauvegarde automatique effectuée — 04h00" },
              { time:"Hier",          tc:"text-gray-600", tb:"bg-gray-100", msg:"47 nouveaux comptes étudiants créés" },
              { time:"Hier",          tc:"text-gray-600", tb:"bg-gray-100", msg:"Mise à jour du système v2.4.1 appliquée" },
            ].map((a,i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap ${a.tb} ${a.tc}`}>{a.time}</span>
                <p className="text-sm text-gray-600 leading-snug">{a.msg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}