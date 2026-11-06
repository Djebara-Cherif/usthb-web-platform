import React, { useState } from "react";

const Ico = ({ d, size = 20 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);
const D = {
  db:     "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
  refresh:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  cloud:  "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12",
  trash:  "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  check:  "M5 13l4 4L19 7",
  clock:  "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
};

const BackupItem = ({ name, date, size, status }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0"><Ico d={D.db} size={18} /></div>
      <div>
        <p className="text-sm font-semibold text-gray-700 truncate">{name}</p>
        <div className="flex items-center gap-1 mt-0.5 text-gray-400"><Ico d={D.clock} size={12} /><p className="text-xs">{date}</p></div>
      </div>
    </div>
    <div className="flex items-center gap-3 flex-shrink-0">
      <span className="text-xs text-gray-400 hidden sm:block">{size}</span>
      <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${status === "Réussi" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
        {status === "Réussi" && <Ico d={D.check} size={12} />}{status}
      </span>
    </div>
  </div>
);

const ActionCard = ({ icon, iconBg, iconColor, title, description, buttonLabel, btnClass, onClick, loading }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
    <div className="flex items-start gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg} ${iconColor}`}>{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
    <button onClick={onClick} disabled={loading} className={`w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all shadow-sm disabled:opacity-60 ${btnClass}`}>
      {loading ? "En cours…" : buttonLabel}
    </button>
  </div>
);

const StorageBar = ({ label, used, total, color }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-xs"><span className="font-medium text-gray-600">{label}</span><span className="text-gray-400">{used} Go / {total} Go</span></div>
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${(used/total)*100}%` }} /></div>
  </div>
);

export default function Maintenance() {
  const [loadingBackup, setLoadingBackup] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingCache,  setLoadingCache]  = useState(false);
  const [toast,         setToast]         = useState(null);

  const showToast = (msg) => { setToast({ msg }); setTimeout(() => setToast(null), 3000); };
  const handleBackup = () => { setLoadingBackup(true); setTimeout(() => { setLoadingBackup(false); showToast("Sauvegarde effectuée !"); }, 2000); };
  const handleUpdate = () => { setLoadingUpdate(true); setTimeout(() => { setLoadingUpdate(false); showToast("Système mis à jour !"); }, 2500); };
  const handleCache  = () => { setLoadingCache(true);  setTimeout(() => { setLoadingCache(false);  showToast("Cache vidé !"); }, 1500); };

  const backups = [
    { name:"backup_2026-05-09.sql", date:"09/05/2026", size:"842 Mo", status:"Réussi"  },
    { name:"backup_2026-05-08.sql", date:"08/05/2026", size:"840 Mo", status:"Réussi"  },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 w-full">
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white bg-emerald-600 animate-pulse">
          <Ico d={D.check} size={16} /> {toast.msg}
        </div>
      )}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Maintenance</h1>
        <p className="text-sm text-gray-400">Gestion de la base de données, sauvegardes et mises à jour du système.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:"Version", value:"v2.4.1", sub:"À jour", color:"text-blue-600", bg:"bg-blue-50" },
          { label:"Uptime", value:"99.8%", sub:"Depuis 30j", color:"text-emerald-600", bg:"bg-emerald-50" },
          { label:"Sauvegarde", value:"04h00", sub:"Aujourd'hui", color:"text-violet-600", bg:"bg-violet-50" },
          { label:"Cache", value:"1.2 Go", sub:"À vider", color:"text-amber-600", bg:"bg-amber-50" },
        ].map(({ label, value, sub, color, bg }) => (
          <div key={label} className={`rounded-xl p-4 ${bg} border border-gray-100`}><p className={`text-xl font-bold ${color}`}>{value}</p><p className="text-xs font-semibold text-gray-500 mt-0.5">{label}</p><p className="text-xs text-gray-400 mt-0.5">{sub}</p></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Actions</h2>
          <ActionCard icon={<Ico d={D.db} />} iconBg="bg-blue-100" iconColor="text-blue-600" title="Sauvegarder" description="Copie complète." buttonLabel="Lancer" btnClass="bg-blue-600 hover:bg-blue-700" onClick={handleBackup} loading={loadingBackup} />
          <ActionCard icon={<Ico d={D.refresh} />} iconBg="bg-violet-100" iconColor="text-violet-600" title="Mettre à jour" description="Appliquer MàJ." buttonLabel="Mettre à jour" btnClass="bg-violet-600 hover:bg-violet-700" onClick={handleUpdate} loading={loadingUpdate} />
          <ActionCard icon={<Ico d={D.trash} />} iconBg="bg-amber-100" iconColor="text-amber-600" title="Vider le cache" description="Libérer de l'espace." buttonLabel="Vider le cache" btnClass="bg-amber-500 hover:bg-amber-600" onClick={handleCache} loading={loadingCache} />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Historique des sauvegardes</h2>
            {backups.map((b) => <BackupItem key={b.name} {...b} />)}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Utilisation du stockage</h2>
            <div className="space-y-4">
              <StorageBar label="Base de données" used={3.8} total={10} color="bg-blue-500" />
              <StorageBar label="Fichiers & médias" used={12.4} total={50} color="bg-violet-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}