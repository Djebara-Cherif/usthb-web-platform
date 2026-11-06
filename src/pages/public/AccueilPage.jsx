import { Link } from "react-router-dom";
import imagefaculte from "../../image/image_faculté.jpg";

/* ── Icons ── */
const GraduationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TeacherIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
    <circle cx="12" cy="8" r="4" />
    <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <path d="M9 12l-2 8 5-3 5 3-2-8" />
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LoginIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

/* ── Nav links ── */
const NAV_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Présentation", to: "/presentation" },
  { label: "Formations", to: "/formations" },
  { label: "Scolarité", to: "/scolarite" },
  { label: "Bibliothèque", to: "/bibliotheque" },
  { label: "Contact", to: "/contact" },
];

/* ── Stats ── */
const STATS = [
  { icon: <UsersIcon />, value: "4 200+", label: "Étudiants inscrits" },
  { icon: <TeacherIcon />, value: "180+", label: "Enseignants" },
  { icon: <BookIcon />, value: "12", label: "Formations" },
  { icon: <StarIcon />, value: "30+", label: "Années d'expérience" },
];

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const currentPath = window.location.pathname;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white group-hover:bg-blue-700 transition-colors">
              <GraduationIcon />
            </div>
            <div className="leading-tight">
              <p className="font-bold text-gray-800 text-sm">Faculté d'Informatique</p>
              <p className="text-xs text-blue-600 font-medium">USTHB</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = currentPath === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Se connecter button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-sm shadow-blue-200"
            >
              <LoginIcon />
              Se connecter
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-600 hover:text-blue-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 mt-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl w-full justify-center"
          >
            <LoginIcon />
            Se connecter
          </Link>
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════ */
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16"
      style={{
        backgroundImage: `url(${imagefaculte})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blue overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,59,116,0.88) 0%, rgba(21,101,192,0.82) 55%, rgba(13,59,116,0.75) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-medium text-blue-100 border border-blue-300/40 bg-blue-800/30 backdrop-blur-sm">
            Université des Sciences et de la Technologie Houari Boumédiène
          </span>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
            Faculté{" "}
            <span className="text-blue-300">d'Informatique</span>
          </h1>

          {/* Subtitle */}
          <p className="text-blue-100/80 text-lg leading-relaxed mb-10 max-w-xl">
            Former les ingénieurs et chercheurs de demain dans les domaines de
            l'informatique, des systèmes et des réseaux.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/formations"
              className="flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 transition-all active:scale-95 shadow-lg"
            >
              Nos formations
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              to="/presentation"
              className="flex items-center gap-2 border border-white/40 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

/* ══════════════════════════════════════════
   STATS SECTION
══════════════════════════════════════════ */
function StatsSection() {
  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-3">
              <div className="text-blue-600">{stat.icon}</div>
              <p className="text-3xl font-extrabold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
import React from "react";

export default function AccueilPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <HeroSection />
      <StatsSection />
    </div>
  );
}
