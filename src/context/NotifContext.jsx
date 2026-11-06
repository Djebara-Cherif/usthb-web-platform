import React, { createContext, useContext, useState } from "react";

export const NotifContext = createContext(null);

/* ── MOCK DATA GLOBALE POUR LES NOTIFICATIONS ── */
const NOTIFS_INIT = [
  { 
    id: 1, 
    type: "notes", 
    titre: "Notes TP publiées", 
    desc: "Notes de TP — Base de données disponibles", 
    lu: false, 
    ts: Date.now() - 2 * 3600000 
  },
  { 
    id: 2, 
    type: "cours", 
    titre: "Nouveau support de cours", 
    desc: "Chap. 3 — Arbres AVL ajouté en Algorithmique", 
    lu: false, 
    ts: Date.now() - 5 * 3600000 
  },
  { 
    id: 3, 
    type: "stages", 
    titre: "Nouveaux thèmes PFE", 
    desc: "7 nouveaux thèmes Licence 2025-2026 disponibles", 
    lu: false, 
    ts: Date.now() - 86400000 
  },
  { 
    id: 4, 
    type: "emploi", 
    titre: "Modification emploi du temps", 
    desc: "TD Réseaux déplacé au Mercredi 11h30 — Salle 08", 
    lu: false, 
    ts: Date.now() - 2 * 86400000 
  },
];

export function NotifProvider({ children }) {
  const [notifs, setNotifs] = useState(NOTIFS_INIT);

  // Calcule dynamiquement le nombre de notifications non lues
  const unreadCount = notifs.filter(n => !n.lu).length;

  // Marquer une seule notification comme lue
  const markNotifRead = (id) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, lu: true } : n));
  };

  // Tout marquer comme lu (bouton de la Dropdown)
  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, lu: true })));
  };

  // Optionnel : si tu veux déclencher l'ajout d'une notification depuis un composant
  const addNotif = (notif) => {
    setNotifs(prev => [{ ...notif, id: Date.now(), lu: false, ts: Date.now() }, ...prev]);
  };

  return (
    <NotifContext.Provider value={{ notifs, unreadCount, markNotifRead, markAllRead, addNotif }}>
      {children}
    </NotifContext.Provider>
  );
}

export function useNotifs() {
  const context = useContext(NotifContext);
  if (!context) {
    throw new Error("useNotifs doit être utilisé à l'intérieur d'un NotifProvider");
  }
  return context;
}