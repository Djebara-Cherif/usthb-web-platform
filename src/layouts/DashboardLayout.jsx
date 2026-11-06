import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotifs } from "../context/NotifContext";
import { Icon } from "../components/Icon";

const NAV_CONFIG = {
  etudiant: [
    { label: "Tableau de bord", to: "/etudiant/dashboard",       icon: "home" },
    { label: "Cours & Modules", to: "/etudiant/cours",           icon: "book" },
    { label: "Notes",           to: "/etudiant/notes",           icon: "clipboard" },
    { label: "Emploi du temps", to: "/etudiant/emploi-du-temps", icon: "calendar" },
    { label: "Stages / PFE",    to: "/etudiant/stages",          icon: "briefcase" },
    { label: "Documents",       to: "/etudiant/documents",       icon: "download" },
  ],
  prof: [
    { label: "Tableau de bord",   to: "/prof/dashboard",     icon: "home" },
    { label: "Gestion des cours", to: "/prof/cours",         icon: "book" },
    { label: "Gestion des notes", to: "/prof/notes",         icon: "clipboard" },
    { label: "Mes étudiants",     to: "/prof/etudiants",     icon: "users" },
    { label: "Planning",          to: "/prof/planning",      icon: "calendar" },
    { label: "Salles",            to: "/prof/salles",        icon: "door" },
    { label: "Annonces",          to: "/prof/annonces",      icon: "bell" },
  ],
  chef: [
    { label: "Tableau de bord",  to: "/chef/dashboard",       icon: "home" },
    { label: "Corps enseignant", to: "/chef/enseignants",     icon: "users" },
    // ── NOUVELLE LIGNE POUR LE CHEF ──
    { label: "Gérer les étudiants", to: "/chef/etudiants",    icon: "users" },
    { label: "Modules",          to: "/chef/modules",         icon: "book" },
    { label: "Emplois du temps", to: "/chef/emplois-du-temps",icon: "calendar" },
    { label: "Infrastructures",  to: "/chef/infrastructures", icon: "building" },
    { label: "Communication",    to: "/chef/communication",   icon: "radio" },
  ],
  admin: [
    { label: "Tableau de bord",  to: "/admin/dashboard",    icon: "home" },
    { label: "Utilisateurs",     to: "/admin/utilisateurs", icon: "users" },
    { label: "Sécurité",         to: "/admin/securite",     icon: "lock" },
    { label: "Maintenance",      to: "/admin/maintenance",  icon: "settings" },
  ]
};

function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const items = user ? (NAV_CONFIG[user.role] || NAV_CONFIG.etudiant) : [];

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 cursor-pointer" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-white shadow-xl z-40 flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}>
        
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Icon name="home" className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-gray-800">FI — USTHB</p>
              <p className="text-xs text-gray-400">Espace Privé</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
            <Icon name="close" className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {items.map((item) => {
            const active = location.pathname.includes(item.to);
            return (
              <Link key={item.to} to={item.to} onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative
                  ${active ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"}`}>
                <Icon name={item.icon} className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 px-3 py-4 space-y-1">
          <Link to="/" onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-100">
            <Icon name="globe" className="w-4 h-4" />Site public
          </Link>
          <button onClick={() => { logout(); navigate("/login"); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50">
            <Icon name="logout" className="w-4 h-4" />Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ onMenuToggle }) {
  const { user } = useAuth();
  const { notifs, unreadCount, markNotifRead, markAllRead } = useNotifs();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const formatTime = (ts) => {
    const diff = Date.now() - ts;
    if (diff < 3600000) return `Il y a ${Math.floor(diff/60000)} min`;
    if (diff < 86400000) return `Il y a ${Math.floor(diff/3600000)} h`;
    return `Il y a ${Math.floor(diff/86400000)} j`;
  };

  const getTypeStyle = (type) => {
    if (type === "notes") return "bg-green-100 text-green-600";
    if (type === "cours") return "bg-blue-100 text-blue-600";
    if (type === "stages") return "bg-orange-100 text-orange-600";
    if (type === "emploi") return "bg-purple-100 text-purple-600";
    if (type === "securite") return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  const getTypeIcon = (type) => {
    if (type === "notes") return "clipboard";
    if (type === "cours") return "book";
    if (type === "stages") return "briefcase";
    if (type === "emploi") return "calendar";
    if (type === "securite") return "lock";
    return "bell";
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-100 h-16 flex items-center px-6 gap-4">
      <button onClick={onMenuToggle} className="text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50">
        <Icon name="menu" className="w-5 h-5" />
      </button>
      
      <div className="flex-1 font-semibold text-gray-800">{user?.roleLabel || "Espace Privé"}</div>

      <div className="flex items-center gap-1">
        
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifs(!showNotifs)} 
            className={`relative p-2 rounded-xl transition-all ${showNotifs ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"}`}
          >
            <Icon name="bell" className="w-5 h-5" />
            {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />}
          </button>
          
          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-800">Notifications</p>
                  <p className="text-xs text-gray-400 mt-0.5">{unreadCount} non lue{unreadCount > 1 ? "s" : ""}</p>
                </div>
                {unreadCount > 0 && <button onClick={markAllRead} className="text-xs text-blue-600 hover:underline font-medium">Tout marquer lu</button>}
              </div>
              <ul className="max-h-72 overflow-y-auto">
                {notifs.length === 0 && <li className="px-4 py-6 text-center text-xs text-gray-400">Aucune notification</li>}
                {notifs.map(n => (
                  <li key={n.id} onClick={() => markNotifRead(n.id)}
                    className={`flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 border-b border-gray-50 transition-colors cursor-pointer ${!n.lu ? "bg-blue-50/40" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getTypeStyle(n.type)}`}><Icon name={getTypeIcon(n.type)} className="w-3.5 h-3.5" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-xs font-semibold ${!n.lu ? "text-gray-900" : "text-gray-700"}`}>{n.titre}</p>
                        {!n.lu && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">{n.desc}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{formatTime(n.ts)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button onClick={() => navigate(`/${user?.role}/messagerie`)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl">
          <Icon name="message" className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <button onClick={() => navigate(`/${user?.role}/profil`)} className="flex items-center gap-3 pl-2 hover:opacity-80">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
            {user?.initiales || "???"}
          </div>
          <div className="hidden sm:block leading-tight text-left">
            <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
            <p className="text-xs text-blue-600 font-medium">{user?.roleLabel}</p>
          </div>
        </button>
      </div>
    </header>
  );
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col min-h-screen">
        <Topbar onMenuToggle={() => setSidebarOpen(o => !o)} />
        <main className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${sidebarOpen ? "blur-sm brightness-75 pointer-events-none select-none" : ""}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}