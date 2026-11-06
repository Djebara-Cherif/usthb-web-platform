import React, { useState } from "react";
import { createPortal } from "react-dom"; // <-- Ajouté pour corriger la modale
import { Icon } from "../../components/Icon";

const NIVEAUX = ["L1", "L2", "L3", "M1", "M2"];

const getSpecialites = (niveau) => {
  if (niveau === "L1") return ["Tronc Commun"];
  if (niveau === "L2" || niveau === "L3") return ["ACAD", "ISIL"];
  if (niveau === "M1" || niveau === "M2") return ["Cybersécurité", "Génie Logiciel", "IA", "Data Science"];
  return ["Non affecté"];
};

const getGroupes = (niveau) => {
  if (niveau === "L1") return ["G01", "G02", "G03", "G04"];
  return ["G01", "G02"];
};

const INITIAL_STUDENTS = [
  { id: 1, matricule: "202131001", nom: "Benali", prenom: "Amina", niveau: "L3", specialite: "ISIL", groupe: "G01", email: "a.benali@etu.usthb.dz" },
  { id: 2, matricule: "202131002", nom: "Cherif", prenom: "Yanis", niveau: "M1", specialite: "Génie Logiciel", groupe: "G01", email: "y.cherif@etu.usthb.dz" },
  { id: 3, matricule: "202131003", nom: "Ait", prenom: "Lina", niveau: "M2", specialite: "IA", groupe: "G02", email: "l.ait@etu.usthb.dz" },
  { id: 4, matricule: "202131004", nom: "Slimani", prenom: "Karim", niveau: "L1", specialite: "Tronc Commun", groupe: "G03", email: "k.slimani@etu.usthb.dz" },
  { id: 5, matricule: "202131005", nom: "Mansouri", prenom: "Sarah", niveau: "L2", specialite: "ACAD", groupe: "G02", email: "s.mansouri@etu.usthb.dz" },
];

export default function GestionEtudiantsChef() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [search, setSearch] = useState("");
  const [filterNiv, setFilterNiv] = useState("Tous");
  const [selectedIds, setSelectedIds] = useState([]);
  
  const [bulkNiv, setBulkNiv] = useState("L1");
  const [bulkSpec, setBulkSpec] = useState(getSpecialites("L1")[0]);
  const [bulkGroup, setBulkGroup] = useState(getGroupes("L1")[0]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form, setForm] = useState({ 
    matricule: "", nom: "", prenom: "", email: "", 
    niveau: "L1", specialite: "Tronc Commun", groupe: "G01" 
  });

  const filtered = students.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = s.nom.toLowerCase().includes(q) || s.prenom.toLowerCase().includes(q) || s.matricule.toLowerCase().includes(q);
    const matchNiv = filterNiv === "Tous" || s.niveau === filterNiv;
    return matchSearch && matchNiv;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length && filtered.length > 0) setSelectedIds([]);
    else setSelectedIds(filtered.map(s => s.id));
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const handleBulkNivChange = (e) => {
    const n = e.target.value;
    setBulkNiv(n);
    setBulkSpec(getSpecialites(n)[0]);
    setBulkGroup(getGroupes(n)[0]);
  };

  const applyBulkAction = () => {
    if (selectedIds.length === 0) return;
    setStudents(prev => prev.map(s => {
      if (selectedIds.includes(s.id)) return { ...s, niveau: bulkNiv, specialite: bulkSpec, groupe: bulkGroup };
      return s;
    }));
    setSelectedIds([]);
  };

  const handleFormNivChange = (e) => {
    const n = e.target.value;
    setForm({ ...form, niveau: n, specialite: getSpecialites(n)[0], groupe: getGroupes(n)[0] });
  };

  const openAdd = () => {
    setEditingStudent(null);
    setForm({ matricule: "", nom: "", prenom: "", email: "", niveau: "L1", specialite: "Tronc Commun", groupe: "G01" });
    setModalOpen(true);
  };

  const openEdit = (s) => {
    setEditingStudent(s);
    setForm(s);
    setModalOpen(true);
  };

  const saveStudent = (e) => {
    e.preventDefault();
    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? { ...form, id: s.id } : s));
    } else {
      setStudents(prev => [{ ...form, id: Date.now() }, ...prev]);
    }
    setModalOpen(false);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
      setStudents(prev => prev.filter(s => s.id !== id));
      setSelectedIds(selectedIds.filter(i => i !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Gérer les étudiants</h1>
          <p className="text-sm text-gray-400">{students.length} étudiants inscrits dans le département</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition shadow-sm">
          <Icon name="plus" className="w-4 h-4" /> Nouvel étudiant
        </button>
      </div>

      {selectedIds.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md">{selectedIds.length}</span>
            <span className="text-sm font-semibold text-blue-800">sélectionnés</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-blue-800">Affecter vers :</span>
            <select value={bulkNiv} onChange={handleBulkNivChange} className="border border-blue-200 rounded-lg px-3 py-1.5 text-sm bg-white text-blue-900 outline-none">
              {NIVEAUX.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <select value={bulkSpec} onChange={(e) => setBulkSpec(e.target.value)} className="border border-blue-200 rounded-lg px-3 py-1.5 text-sm bg-white text-blue-900 outline-none">
              {getSpecialites(bulkNiv).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={bulkGroup} onChange={(e) => setBulkGroup(e.target.value)} className="border border-blue-200 rounded-lg px-3 py-1.5 text-sm bg-white text-blue-900 outline-none">
              {getGroupes(bulkNiv).map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <button onClick={applyBulkAction} className="bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-blue-700 transition">
              Appliquer
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            value={search} onChange={(e) => setSearch(e.target.value)} 
            placeholder="Rechercher par nom, matricule..." 
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none" 
          />
        </div>
        <select value={filterNiv} onChange={(e) => setFilterNiv(e.target.value)} className="px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 bg-white font-medium text-gray-600">
          <option value="Tous">Tous les niveaux</option>
          {NIVEAUX.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 w-10 text-center">
                  <input type="checkbox" onChange={toggleSelectAll} checked={filtered.length > 0 && selectedIds.length === filtered.length} className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer" />
                </th>
                <th className="px-4 py-3 font-semibold text-gray-500 uppercase text-xs">Matricule</th>
                <th className="px-4 py-3 font-semibold text-gray-500 uppercase text-xs">Étudiant</th>
                <th className="px-4 py-3 font-semibold text-gray-500 uppercase text-xs">Email</th>
                <th className="px-4 py-3 font-semibold text-gray-500 uppercase text-xs text-center">Niveau</th>
                <th className="px-4 py-3 font-semibold text-gray-500 uppercase text-xs">Spécialité</th>
                <th className="px-4 py-3 font-semibold text-gray-500 uppercase text-xs">Groupe</th>
                <th className="px-4 py-3 font-semibold text-gray-500 uppercase text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-10 text-gray-400">Aucun étudiant trouvé</td></tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(s.id) ? "bg-blue-50/30" : ""}`}>
                    <td className="px-4 py-3 text-center">
                      <input type="checkbox" checked={selectedIds.includes(s.id)} onChange={() => toggleSelectOne(s.id)} className="w-4 h-4 text-blue-600 rounded cursor-pointer" />
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-500 text-xs">{s.matricule}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{s.prenom} {s.nom}</td>
                    <td className="px-4 py-3 text-gray-500">{s.email}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">{s.niveau}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${s.specialite === "Tronc Commun" ? "bg-amber-100 text-amber-700" : "bg-purple-100 text-purple-700"}`}>
                        {s.specialite}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-700">{s.groupe}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => openEdit(s)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition"><Icon name="edit" className="w-4 h-4" /></button>
                      <button onClick={() => deleteStudent(s.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition ml-1"><Icon name="trash" className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── MODALE AVEC CREATEPORTAL ─── */}
      {modalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-blue-600">
              <h2 className="text-white font-bold text-sm">{editingStudent ? "Modifier l'étudiant" : "Nouvel étudiant"}</h2>
              <button onClick={() => setModalOpen(false)} className="text-white/80 hover:text-white"><Icon name="close" className="w-4 h-4" /></button>
            </div>
            
            <form onSubmit={saveStudent} className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Matricule</label>
                <input required value={form.matricule} onChange={e => setForm({...form, matricule: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Nom</label>
                  <input required value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Prénom</label>
                  <input required value={form.prenom} onChange={e => setForm({...form, prenom: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
              </div>
              <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 border border-gray-100 rounded-xl">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Niveau</label>
                  <select value={form.niveau} onChange={handleFormNivChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white">
                    {NIVEAUX.map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Spécialité</label>
                  <select value={form.specialite} onChange={e => setForm({...form, specialite: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white">
                    {getSpecialites(form.niveau).map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Groupe</label>
                  <select value={form.groupe} onChange={e => setForm({...form, groupe: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white">
                    {getGroupes(form.niveau).map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition">Annuler</button>
                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}