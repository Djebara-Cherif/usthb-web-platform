import { Users, BookOpen, Award, Globe, Target, Microscope } from "lucide-react";

const stats = [
  { value: "5 000+", label: "Étudiants inscrits" },
  { value: "300+", label: "Enseignants & chercheurs" },
  { value: "1974", label: "Année de création" },
  { value: "12+", label: "Laboratoires de recherche" },
];

const values = [
  {
    icon: <Target className="w-6 h-6 text-blue-600" />,
    bg: "bg-blue-50",
    title: "Excellence académique",
    desc: "Des programmes rigoureux alignés sur les standards internationaux pour former des ingénieurs compétents.",
  },
  {
    icon: <Microscope className="w-6 h-6 text-purple-600" />,
    bg: "bg-purple-50",
    title: "Recherche scientifique",
    desc: "Des laboratoires actifs en intelligence artificielle, sécurité, réseaux et génie logiciel.",
  },
  {
    icon: <Globe className="w-6 h-6 text-green-600" />,
    bg: "bg-green-50",
    title: "Ouverture internationale",
    desc: "Partenariats avec des universités étrangères et programmes d'échange pour nos étudiants.",
  },
  {
    icon: <Users className="w-6 h-6 text-orange-500" />,
    bg: "bg-orange-50",
    title: "Vie étudiante",
    desc: "Un cadre bienveillant, des clubs étudiants et des activités parascolaires pour s'épanouir.",
  },
];

const departements = [
  { name: "Informatique Fondamentale et Ses Applications", code: "DIFA" },
  { name: "Informatique Médicale et Génie Biomédical", code: "IMGB" },
  { name: "Systèmes et Réseaux de Communication", code: "SRC" },
  { name: "Génie des Systèmes d'Information", code: "GSI" },
];

const Presentation = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-200 text-sm font-medium mb-2">À propos</p>
          <h1 className="text-4xl font-bold mb-4">Présentation de la Faculté</h1>
          <p className="text-blue-100 max-w-2xl leading-relaxed">
            La Faculté d'Informatique de l'USTHB est l'une des plus grandes et des plus
            réputées d'Algérie dans le domaine des sciences et technologies du numérique.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-3xl font-extrabold text-blue-600 mb-1">{s.value}</p>
              <p className="text-gray-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Histoire */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre histoire</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Fondée en <strong>1974</strong> au sein de l'Université des Sciences et de la
              Technologie Houari Boumédiène (USTHB), la Faculté d'Informatique a accompagné
              depuis sa création l'essor du numérique en Algérie.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Elle propose des formations de Licence, Master et Doctorat, réparties dans
              plusieurs départements spécialisés, avec un ancrage fort dans la recherche
              scientifique et l'innovation technologique.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-800">Licence · Master · Doctorat</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-800">Système LMD</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-800">Formation initiale & continue</span>
            </div>
          </div>
        </div>

        {/* Mission & Valeurs */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos valeurs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex gap-4 p-5 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`${v.bg} p-3 rounded-lg flex-shrink-0 h-fit`}>{v.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Départements */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos départements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {departements.map((d) => (
              <div
                key={d.code}
                className="flex items-center gap-4 border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="bg-blue-600 text-white font-bold text-xs px-3 py-1 rounded-lg flex-shrink-0">
                  {d.code}
                </span>
                <span className="text-gray-700 text-sm font-medium">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Presentation;
