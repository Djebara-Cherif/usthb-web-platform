import React, { useState } from "react";
import { createPortal } from "react-dom"; // <-- AJOUTÉ

// ─── Mock Data ────────────────────────────────────────────────────────────────
const initialUsers = [
  { id: 1,  nom: "Benali",     prenom: "Amine",      email: "a.benali@usthb.dz",    role: "Étudiant",          matricule: "ETU-2021-001", statut: "actif",   createdAt: "2021-09-01" },
  { id: 2,  nom: "Cherif",     prenom: "Sara",       email: "s.cherif@usthb.dz",    role: "Étudiant",          matricule: "ETU-2021-002", statut: "actif",   createdAt: "2021-09-01" },
  { id: 3,  nom: "Meziane",    prenom: "Karim",      email: "k.meziane@usthb.dz",   role: "Professeur",        matricule: "PRF-2018-010", statut: "actif",   createdAt: "2018-03-15" },
  { id: 4,  nom: "Hadj",       prenom: "Nadia",      email: "n.hadj@usthb.dz",      role: "Professeur",        matricule: "PRF-2015-007", statut: "inactif", createdAt: "2015-09-01" },
  { id: 5,  nom: "Boukhalfa",  prenom: "Youcef",     email: "y.boukhalfa@usthb.dz", role: "Chef de département",matricule: "CHF-2019-003", statut: "actif",   createdAt: "2019-01-10" },
  { id: 6,  nom: "Aissaoui",   prenom: "Meriem",     email: "m.aissaoui@usthb.dz",  role: "Étudiant",          matricule: "ETU-2022-099", statut: "inactif", createdAt: "2022-09-15" },
  { id: 7,  nom: "Rahmani",    prenom: "Sofiane",    email: "s.rahmani@usthb.dz",   role: "Professeur",        matricule: "PRF-2020-014", statut: "actif",   createdAt: "2020-09-01" },
  { id: 8,  nom: "Khelifi",    prenom: "Amina",      email: "a.khelifi@usthb.dz",   role: "Étudiant",          matricule: "ETU-2023-044", statut: "actif",   createdAt: "2023-09-05" },
];

const ROLES = ["Tous les rôles", "Étudiant", "Professeur", "Chef de département"];

// ─── Icons ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);
const EditIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);
const ToggleIcon = ({ active }) => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    {active
      ? <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      : <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    }
  </svg>
);
const TrashIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const ChevronDown = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const RoleBadge = ({ role }) => {
  const styles = {
    "Étudiant":           "bg-blue-100 text-blue-700",
    "Professeur":         "bg-violet-100 text-violet-700",
    "Chef de département":"bg-amber-100 text-amber-700",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[role] || "bg-gray-100 text-gray-600"}`}>
      {role}
    </span>
  );
};

const StatusBadge = ({ statut }) => (
  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full
    ${statut === "actif" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${statut === "actif" ? "bg-emerald-500" : "bg-gray-400"}`} />
    {statut === "actif" ? "Actif" : "Inactif"}
  </span>
);

const UserModal = ({ user, onClose, onSave }) => {
  const isEdit = !!user?.id;
  const [form, setForm] = useState(
    user || { nom: "", prenom: "", email: "", role: "Étudiant", matricule: "", statut: "actif" }
  );
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, id: user?.id || Date.now(), createdAt: user?.createdAt || new Date().toISOString().split("T")[0] });
    onClose();
  };

  // <-- ICI LE CORRECTIF CREATEPORTAL -->
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-blue-600">
          <h2 className="text-white font-semibold text-sm">{isEdit ? "Modifier l'utilisateur" : "Créer un utilisateur"}</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white transition"><CloseIcon /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Nom</label>
              <input name="nom" value={form.nom} onChange={handleChange} required placeholder="Ex: Benali" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Prénom</label>
              <input name="prenom" value={form.prenom} onChange={handleChange} required placeholder="Ex: Amine" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="prenom.nom@usthb.dz" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Matricule</label>
            <input name="matricule" value={form.matricule} onChange={handleChange} required placeholder="Ex: ETU-2024-001" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Rôle</label>
            <div className="relative">
              <select name="role" value={form.role} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>Étudiant</option><option>Professeur</option><option>Chef de département</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"><ChevronDown /></div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50">Annuler</button>
            <button type="submit" className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200">{isEdit ? "Enregistrer" : "Créer"}</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default function Utilisateurs() {
  const [users, setUsers]           = useState(initialUsers);
  const [search, setSearch]         = useState("");
  const [roleFilter, setRoleFilter] = useState("Tous les rôles");
  const [modal, setModal]           = useState(null);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = u.nom.toLowerCase().includes(q) || u.prenom.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.matricule.toLowerCase().includes(q);
    const matchRole = roleFilter === "Tous les rôles" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const saveUser = (user) => setUsers((prev) => prev.find((u) => u.id === user.id) ? prev.map((u) => (u.id === user.id ? user : u)) : [...prev, user]);
  const toggleStatus = (id) => setUsers((prev) => prev.map((u) => u.id === id ? { ...u, statut: u.statut === "actif" ? "inactif" : "actif" } : u));
  const deleteUser = (id) => { if (window.confirm("Supprimer cet utilisateur ?")) setUsers((prev) => prev.filter((u) => u.id !== id)); };

  return (
    <div className="max-w-7xl mx-auto space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Gestion des Utilisateurs</h1>
          <p className="text-sm text-gray-400">{users.length} utilisateurs au total</p>
        </div>
        <button onClick={() => setModal({})} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200">
          <PlusIcon /> Nouvel utilisateur
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon /></div>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher par nom, email, matricule…" className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="relative">
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="appearance-none pl-3 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium text-gray-600">
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"><ChevronDown /></div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Utilisateur</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Matricule</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Rôle</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Créé le</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400 text-sm">Aucun utilisateur trouvé.</td></tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{u.prenom[0]}{u.nom[0]}</div>
                        <p className="font-semibold text-gray-800">{u.prenom} {u.nom}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 font-mono text-xs">{u.matricule}</td>
                    <td className="px-4 py-3.5 text-gray-500 hidden md:table-cell">{u.email}</td>
                    <td className="px-4 py-3.5"><RoleBadge role={u.role} /></td>
                    <td className="px-4 py-3.5"><StatusBadge statut={u.statut} /></td>
                    <td className="px-4 py-3.5 text-gray-400 text-xs hidden lg:table-cell">{u.createdAt}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setModal({ user: u })} className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50"><EditIcon /></button>
                        <button onClick={() => toggleStatus(u.id)} className={`p-1.5 rounded-lg ${u.statut === "actif" ? "text-amber-500 hover:bg-amber-50" : "text-emerald-500 hover:bg-emerald-50"}`}><ToggleIcon active={u.statut === "actif"} /></button>
                        <button onClick={() => deleteUser(u.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50"><TrashIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex justify-between text-xs text-gray-400">
            <p>{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</p>
            <p>{users.filter(u => u.statut === "actif").length} actifs · {users.filter(u => u.statut === "inactif").length} inactifs</p>
          </div>
        )}
      </div>
      {modal !== null && <UserModal user={modal.user || null} onClose={() => setModal(null)} onSave={saveUser} />}
    </div>
  );
}