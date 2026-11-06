import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotifProvider } from "./context/NotifContext";

// ── LAYOUTS ──
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// ── PAGES PUBLIQUES ──
import AccueilPage  from "./pages/public/AccueilPage";
import LoginPage    from "./pages/public/LoginPage";


 import Presentation from "./pages/public/Presentation";
 import Formations   from "./pages/public/Formations";
 import Scolarite    from "./pages/public/Scolarite";
 import Bibliotheque from "./pages/public/Bibliotheque";
 import Contact      from "./pages/public/Contact";

// ── PAGES ÉTUDIANT ──
import DashboardEtudiant from "./pages/etudiant/Dashboard";
import Cours             from "./pages/etudiant/Cours";
import Notes             from "./pages/etudiant/Notes";
import EmploiDuTemps     from "./pages/etudiant/EmploiDuTemps";
import Stages            from "./pages/etudiant/Stages";
import Documents         from "./pages/etudiant/Documents";
import ProfilEtudiant    from "./pages/etudiant/Profil";

// ── PAGES PROFESSEUR ──
import DashboardProf from "./pages/prof/DashboardProf";
import GestionCours  from "./pages/prof/GestionCours";
import GestionNotes  from "./pages/prof/GestionNotes";
import MesEtudiants  from "./pages/prof/MesEtudiants";
import Planning      from "./pages/prof/Planning";
import Salles        from "./pages/prof/Salles";
import AnnoncesProf  from "./pages/prof/Annonces";
import ProfilProf    from "./pages/prof/Profil";

// ── PAGES CHEF DE DÉPARTEMENT ──
import DashboardChef        from "./pages/chef/DashboardHome";
import Enseignants          from "./pages/chef/Enseignants";
import GestionEtudiantsChef from "./pages/chef/GestionEtudiants"; // <-- NOUVEAU
import Modules              from "./pages/chef/Modules";
import EmploisDuTempsC      from "./pages/chef/EmploisDuTemps";
import Infrastructures      from "./pages/chef/Infrastructures";
import Communication        from "./pages/chef/Communication";
import ProfilChef           from "./pages/chef/Profil";

// ── PAGES ADMIN ──
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import Utilisateurs   from "./pages/admin/Utilisateurs";
import Securite       from "./pages/admin/Securite";
import Maintenance    from "./pages/admin/Maintenance";
import ProfilAdmin    from "./pages/admin/ProfilAdmin";

// ── PAGE COMMUNE ──
import Messagerie from "./pages/common/Messagerie"; 

// ── COMPOSANT DE PROTECTION DES ROUTES ──
function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotifProvider>
          <Routes>
            {/* ══ ROUTES PUBLIQUES ══ */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<AccueilPage />} />
              { <Route path="/presentation" element={<Presentation />} /> }
              { <Route path="/formations"   element={<Formations />} /> }
              { <Route path="/scolarite"    element={<Scolarite />} /> }
              { <Route path="/bibliotheque" element={<Bibliotheque />} /> }
              { <Route path="/contact"      element={<Contact />} /> }
            </Route>

            <Route path="/login" element={<LoginPage />} />

            {/* ══ ESPACE ÉTUDIANT ══ */}
            <Route path="/etudiant" element={<ProtectedRoute allowedRole="etudiant"><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard"       element={<DashboardEtudiant />} />
              <Route path="cours"           element={<Cours />} />
              <Route path="notes"           element={<Notes />} />
              <Route path="emploi-du-temps" element={<EmploiDuTemps />} />
              <Route path="stages"          element={<Stages />} />
              <Route path="documents"       element={<Documents />} />
              <Route path="profil"          element={<ProfilEtudiant />} />
              <Route path="messagerie"      element={<Messagerie />} />
            </Route>

            {/* ══ ESPACE PROFESSEUR ══ */}
            <Route path="/prof" element={<ProtectedRoute allowedRole="prof"><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardProf />} />
              <Route path="cours"     element={<GestionCours />} />
              <Route path="notes"     element={<GestionNotes />} />
              <Route path="etudiants" element={<MesEtudiants />} />
              <Route path="planning"  element={<Planning />} />
              <Route path="salles"    element={<Salles />} />
              <Route path="annonces"  element={<AnnoncesProf />} />
              <Route path="profil"    element={<ProfilProf />} />
              <Route path="messagerie" element={<Messagerie />} />
            </Route>

            {/* ══ ESPACE CHEF DE DÉPARTEMENT ══ */}
            <Route path="/chef" element={<ProtectedRoute allowedRole="chef"><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard"        element={<DashboardChef />} />
              <Route path="enseignants"      element={<Enseignants />} />
              <Route path="etudiants"        element={<GestionEtudiantsChef />} /> {/* <-- NOUVEAU */}
              <Route path="modules"          element={<Modules />} />
              <Route path="emplois-du-temps" element={<EmploisDuTempsC />} />
              <Route path="infrastructures"  element={<Infrastructures />} />
              <Route path="communication"    element={<Communication />} />
              <Route path="profil"           element={<ProfilChef />} />
              <Route path="messagerie"       element={<Messagerie />} />
            </Route>

            {/* ══ ESPACE ADMIN ══ */}
            <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard"    element={<DashboardAdmin />} />
              <Route path="utilisateurs" element={<Utilisateurs />} />
              <Route path="securite"     element={<Securite />} />
              <Route path="maintenance"  element={<Maintenance />} />
              <Route path="profil"       element={<ProfilAdmin />} />
              <Route path="messagerie"   element={<Messagerie />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </NotifProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}