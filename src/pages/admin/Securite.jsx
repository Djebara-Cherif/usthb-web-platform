import React, { useState } from "react";

const Ico = ({ d, size = 16 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const D = {
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  eye:    "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  key:    "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
  lock:   "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  ban:    "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",
  warn:   "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  info:   "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  check:  "M5 13l4 4L19 7",
};

const LOG_DATA = [
  { id:1, time:"09/05 01:44", ip:"196.200.x.x",  event:"Tentative de connexion échouée (×5)", type:"danger",  user:"—"          },
  { id:2, time:"09/05 04:00", ip:"192.168.1.1",  event:"Sauvegarde automatique déclenchée",   type:"info",    user:"Système"    },
  { id:3, time:"08/05 22:10", ip:"196.100.x.x",  event:"Connexion depuis un nouvel appareil", type:"warning", user:"k.meziane"  },
  { id:4, time:"08/05 18:33", ip:"192.168.1.45", event:"Compte étudiant créé avec succès",    type:"success", user:"SA"         },
];

const TYPE_STYLE = {
  danger:  { badge:"bg-red-50 text-red-700",       dot:"bg-red-500",     iconD: D.ban  },
  warning: { badge:"bg-amber-50 text-amber-700",   dot:"bg-amber-400",   iconD: D.warn },
  info:    { badge:"bg-blue-50 text-blue-700",     dot:"bg-blue-400",    iconD: D.info },
  success: { badge:"bg-emerald-50 text-emerald-700",dot:"bg-emerald-500",iconD: D.check },
};
const TYPE_LABEL = { danger:"Critique", warning:"Avertissement", info:"Info", success:"Succès" };

const Toggle = ({ enabled, onChange }) => (
  <button onClick={() => onChange(!enabled)} className="relative flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ width: 44, height: 24, backgroundColor: enabled ? "#2563eb" : "#d1d5db" }}>
    <span className="absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-md" style={{ left: enabled ? 23 : 3, transition: "left 0.2s ease" }} />
  </button>
);

const SettingRow = ({ label, description, enabled, onChange }) => (
  <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0 gap-4">
    <div className="min-w-0">
      <p className="text-sm font-semibold text-gray-700 leading-snug">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5 leading-snug">{description}</p>
    </div>
    <Toggle enabled={enabled} onChange={onChange} />
  </div>
);

const LogRow = ({ entry }) => {
  const s = TYPE_STYLE[entry.type];
  return (
    <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-xs text-gray-400 font-mono">{entry.time}</td>
      <td className="px-4 py-3 text-xs text-gray-500 font-mono hidden sm:table-cell">{entry.ip}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2"><span className={`p-1 rounded-full ${s.badge}`}><Ico d={s.iconD} size={13} /></span><span className="text-sm text-gray-700">{entry.event}</span></div>
      </td>
      <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">{entry.user}</td>
      <td className="px-4 py-3"><span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${s.badge}`}><span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{TYPE_LABEL[entry.type]}</span></td>
    </tr>
  );
};

const PermRow = ({ role, perms }) => (
  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
    <td className="px-4 py-3.5 text-sm font-semibold text-gray-700">{role}</td>
    {perms.map((p, i) => (
      <td key={i} className="px-2 py-3.5 text-center">{p ? <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600"><Ico d={D.check} size={13} /></span> : <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-300">—</span>}</td>
    ))}
  </tr>
);

export default function Securite() {
  const [filter, setFilter] = useState("tous");
  const [settings, setSettings] = useState({ twoFactor: true, bruteForce: true, sessionExpiry: false, auditLog: true, ipWhitelist: false });
  const toggleSet = (key) => (val) => setSettings((s) => ({ ...s, [key]: val }));
  const filteredLogs = filter === "tous" ? LOG_DATA : LOG_DATA.filter((l) => l.type === filter);
  const blocked = [{ ip:"196.200.x.x", since:"09/05/2026", reason:"5 tentatives échouées" }];

  return (
    <div className="max-w-7xl mx-auto space-y-6 w-full">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Sécurité</h1>
        <p className="text-sm text-gray-400">Monitoring du système, gestion des accès et droits utilisateurs.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { value:"2",  label:"Alertes actives",   color:"text-red-500",    bg:"bg-red-50"    },
          { value:"7",  label:"Évènements (24h)",  color:"text-blue-600",   bg:"bg-blue-50"   },
          { value:"2",  label:"IP bloquées",       color:"text-amber-600",  bg:"bg-amber-50"  },
          { value:"4",  label:"Rôles configurés",  color:"text-violet-600", bg:"bg-violet-50" },
        ].map(({ value, label, color, bg }) => (
          <div key={label} className={`rounded-xl p-4 ${bg} border border-gray-100`}>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Ico d={D.eye} /> Journal d'activité</h2>
              <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
                {[["tous","Tous"],["danger","Critiques"],["warning","Alertes"],["info","Info"]].map(([v, l]) => (
                  <button key={v} onClick={() => setFilter(v)} className={`px-2.5 py-1 rounded-md text-xs font-medium ${filter === v ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>{l}</button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 border-b border-gray-100">{["Heure","IP","Évènement","Utilisateur","Type"].map((h, i) => <th key={h} className={`text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase ${i===1?"hidden sm:table-cell":""} ${i===3?"hidden md:table-cell":""}`}>{h}</th>)}</tr></thead>
                <tbody>{filteredLogs.map((e) => <LogRow key={e.id} entry={e} />)}</tbody>
              </table>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100"><Ico d={D.key} /><h2 className="text-sm font-semibold text-gray-700">Droits d'accès par rôle</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 border-b border-gray-100"><th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase">Rôle</th>{["Cours","Notes","Utilisateurs","Emplois du temps","Statistiques","Config"].map((h) => <th key={h} className="text-center px-2 py-2.5 text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
                <tbody>
                  <PermRow role="Étudiant"             perms={[true, true, false,true, false,false]} />
                  <PermRow role="Professeur"           perms={[true, true, false,true, false,false]} />
                  <PermRow role="Chef de département"  perms={[true, true, true, true, true, false]} />
                  <PermRow role="Administrateur"       perms={[true, true, true, true, true, true ]} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-1"><Ico d={D.lock} /> Paramètres de sécurité</h2>
            <SettingRow label="Auth. 2 facteurs" description="Obligatoire pour admins" enabled={settings.twoFactor} onChange={toggleSet("twoFactor")} />
            <SettingRow label="Blocage brute-force" description="Bloquer après 5 tentatives" enabled={settings.bruteForce} onChange={toggleSet("bruteForce")} />
            <SettingRow label="Expiration de session" description="Déconnecter après inactivité" enabled={settings.sessionExpiry} onChange={toggleSet("sessionExpiry")} />
            <SettingRow label="Journal d'audit" description="Enregistrer les actions" enabled={settings.auditLog} onChange={toggleSet("auditLog")} />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3"><Ico d={D.shield} /> IP bloquées</h2>
            <div className="space-y-2.5">
              {blocked.map((b) => (
                <div key={b.ip} className="flex justify-between bg-red-50 rounded-lg px-3 py-2.5">
                  <div><p className="text-xs font-bold text-red-700 font-mono">{b.ip}</p><p className="text-xs text-red-500 mt-0.5">{b.reason}</p></div>
                  <button className="text-red-400 hover:text-red-600"><Ico d={D.ban} size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}