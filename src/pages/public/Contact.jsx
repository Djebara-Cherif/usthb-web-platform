import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const infos = [
  {
    icon: <MapPin className="w-5 h-5 text-blue-600" />,
    bg: "bg-blue-50",
    title: "Adresse",
    lines: ["BP 32, El Alia, Bab Ezzouar", "16111 Alger, Algérie"],
  },
  {
    icon: <Phone className="w-5 h-5 text-green-600" />,
    bg: "bg-green-50",
    title: "Téléphone",
    lines: ["+213 (0)23 24 79 15", "+213 (0)23 24 79 16"],
  },
  {
    icon: <Mail className="w-5 h-5 text-purple-600" />,
    bg: "bg-purple-50",
    title: "Email",
    lines: ["informatique@usthb.dz", "scolarite.fi@usthb.dz"],
  },
  {
    icon: <Clock className="w-5 h-5 text-orange-500" />,
    bg: "bg-orange-50",
    title: "Heures d'accueil",
    lines: ["Dim – Jeu : 8h – 16h", "Samedi : 8h – 12h"],
  },
];

const inputClass =
  "border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition w-full bg-gray-50";

const Contact = () => {
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ nom: "", email: "", sujet: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contactez-nous</h1>
          <p className="text-gray-500">
            Pour toute question ou demande d'information, n'hésitez pas à nous contacter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── Gauche : cartes info ─────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {infos.map((info) => (
              <div
                key={info.title}
                className="flex items-start gap-4 p-5 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <div className={`${info.bg} p-3 rounded-xl flex-shrink-0`}>{info.icon}</div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">{info.title}</p>
                  {info.lines.map((line) => (
                    <p key={line} className="text-gray-500 text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Droite : formulaire blanc avec cadre rond ────────────── */}
          <div className="border border-gray-100 rounded-3xl shadow-lg p-8 bg-white">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Envoyer un message</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-gray-600 font-medium">Nom complet</label>
                  <input
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-gray-600 font-medium">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-gray-600 font-medium">Sujet</label>
                <input
                  name="sujet"
                  value={form.sujet}
                  onChange={handleChange}
                  placeholder="Objet de votre message"
                  required
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-gray-600 font-medium">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                  rows={5}
                  required
                  className={`${inputClass} resize-none`}
                />
              </div>

              {sent && (
                <div className="text-green-700 text-sm font-medium bg-green-50 border border-green-200 rounded-xl px-4 py-2">
                  ✓ Message envoyé avec succès !
                </div>
              )}

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors mt-1 shadow-md shadow-blue-100 w-fit"
              >
                <Send className="w-4 h-4" />
                Envoyer le message
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Contact;
