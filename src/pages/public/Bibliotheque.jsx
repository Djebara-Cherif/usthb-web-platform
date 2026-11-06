import { BookOpen, Clock, Users, Building2, FileText, CheckCircle2 } from "lucide-react";

// ─── Sections data ────────────────────────────────────────────────────────────

const historique = [
  { year: "1974", text: "Création de la bibliothèque au sein de l'Institut de Mathématique de l'USTHB." },
  { year: "1986", text: "Elle devient bibliothèque de l'Institut d'Informatique." },
  { year: "2000", text: "Rattachement à la Faculté d'Électronique et d'Informatique." },
  { year: "2006", text: "Réception d'une nouvelle construction — superficie de 500 m², composée de deux grandes salles." },
];

const structure = [
  { icon: <Users className="w-4 h-4 text-blue-600" />, bg: "bg-blue-50", label: "Salle de lecture étudiants", detail: "Réservée aux étudiants de Licence (L3) & Master (M1/M2) — 110 places, dotée du WiFi." },
  { icon: <BookOpen className="w-4 h-4 text-purple-600" />, bg: "bg-purple-50", label: "Salle enseignants & post-graduation", detail: "20 places, réservée aux enseignants et étudiants de post-graduation." },
  { icon: <Building2 className="w-4 h-4 text-green-600" />, bg: "bg-green-50", label: "Magazine des ouvrages", detail: "Fonds documentaire complet accessible selon les conditions d'emprunt." },
];

const acces = [
  "Enseignants de la faculté.",
  "Étudiants en post-graduation.",
  "Chercheurs externes munis d'une demande d'autorisation d'accès à la bibliothèque.",
];

const inscriptionInterne = [
  "Une carte de bibliothèque pour l'année en cours.",
  "Une copie d'une pièce d'identité.",
  "Une copie d'un certificat de scolarité de l'année en cours.",
];

const inscriptionExterne = [
  "Une autorisation d'accès signée par l'établissement d'origine.",
  "Une attestation de travail de l'année en cours (pour les enseignants).",
  "Une copie de la carte nationale d'identité.",
  "Une photo d'identité.",
];

const horaires = [
  { days: "Dimanche – Mercredi", hours: "8h00 – 17h00" },
  { days: "Jeudi",               hours: "8h00 – 16h00" },
  { days: "Vendredi – Samedi",   hours: "Fermé", muted: true },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const SectionTitle = ({ icon, title }) => (
  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-5">
    {icon}
    {title}
  </h2>
);

const BulletList = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
        <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
        {item}
      </li>
    ))}
  </ul>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const Bibliotheque = () => (
  <main className="min-h-screen bg-white">
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-14">

      {/* ── Mot du responsable ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-3xl p-8 shadow-xl">
        <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-3">
          Mot du responsable de la bibliothèque
        </p>
        <p className="text-white leading-relaxed text-sm">
          Nous sommes heureux d'accueillir nos distingués invités, enseignants, étudiants et
          chercheurs dans l'espace bibliothèque. Nous nous efforçons toujours de suivre le rythme
          de l'évolution technologique dans le domaine de l'information et des communications afin
          d'atteindre votre satisfaction, qui est l'objectif auquel nous aspirons en raison de la
          nécessité d'atteindre l'excellence dans nos services en connectant les bénéficiaires avec
          les informations dont ils ont besoin — selon la philosophie de fournir un service où que
          vous soyez et à tout moment. Sur cette base, nous avons pris l'initiative de relever le
          défi en créant une rubrique à laquelle les chercheurs traitent directement.
        </p>
      </section>

      {/* ── Présentation & Historique ──────────────────────────────────── */}
      <section>
        <SectionTitle
          icon={<BookOpen className="w-5 h-5 text-blue-600" />}
          title="Présentation & Historique"
        />
        <div className="relative border-l-2 border-blue-100 ml-3 space-y-0">
          {historique.map((item, i) => (
            <div key={i} className="relative pl-8 pb-7 last:pb-0">
              {/* Timeline dot */}
              <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow" />
              <span className="text-xs font-bold text-blue-600 mb-1 block">{item.year}</span>
              <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Structure ─────────────────────────────────────────────────── */}
      <section>
        <SectionTitle
          icon={<Building2 className="w-5 h-5 text-blue-600" />}
          title="Structure"
        />
        <p className="text-sm text-gray-500 mb-5">
          La bibliothèque s'étend sur une superficie de <strong>500 m²</strong> avec :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {structure.map((s) => (
            <div
              key={s.label}
              className="border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className={`${s.bg} p-2.5 rounded-xl w-fit mb-3`}>{s.icon}</div>
              <p className="font-semibold text-gray-800 text-sm mb-1">{s.label}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Accès & Inscription côte-à-côte ───────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Accès */}
        <section className="border border-gray-100 rounded-2xl p-6 shadow-sm">
          <SectionTitle
            icon={<Users className="w-5 h-5 text-blue-600" />}
            title="Accès à la bibliothèque"
          />
          <p className="text-sm text-gray-500 mb-4">
            L'accès est réservé uniquement aux :
          </p>
          <BulletList items={acces} />
        </section>

        {/* Inscription */}
        <section className="border border-gray-100 rounded-2xl p-6 shadow-sm">
          <SectionTitle
            icon={<FileText className="w-5 h-5 text-blue-600" />}
            title="Inscription"
          />
          <p className="text-sm text-gray-500 mb-3">
            L'entrée est <strong>libre et gratuite</strong>. Une inscription annuelle vous permet d'emprunter des documents et de bénéficier de tous les services.
          </p>

          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 mt-4">
            Membres de l'université
          </p>
          <BulletList items={inscriptionInterne} />

          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 mt-5">
            Usagers externes
          </p>
          <BulletList items={inscriptionExterne} />
        </section>

      </div>

      {/* ── Horaires ──────────────────────────────────────────────────── */}
      <section>
        <SectionTitle
          icon={<Clock className="w-5 h-5 text-blue-600" />}
          title="Horaires d'ouverture"
        />
        <div className="bg-blue-600 rounded-2xl p-6 text-white max-w-sm">
          <div className="space-y-3">
            {horaires.map((h) => (
              <div key={h.days} className="flex justify-between items-center text-sm">
                <span className="text-blue-100">{h.days}</span>
                <span className={`font-semibold ${h.muted ? "text-blue-300" : "text-white"}`}>
                  {h.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  </main>
);

export default Bibliotheque;