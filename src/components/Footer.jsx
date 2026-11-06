import { Link } from "react-router-dom";
import { GraduationCap, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* ── Logo & description ──────────────────────────────────── */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-white font-bold">Faculté d'Informatique</p>
              <p className="text-blue-400 text-sm">USTHB</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Former les ingénieurs et chercheurs de demain dans les domaines de
            l'informatique, des systèmes et des réseaux. Université des Sciences
            et de la Technologie Houari Boumédiène.
          </p>
        </div>

        {/* ── Coordonnées ─────────────────────────────────────────── */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
            Nous contacter
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm">
              <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-400">BP 32, El Alia, Bab Ezzouar<br />16111 Alger, Algérie</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span className="text-gray-400">+213 (0)23 24 79 15</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span className="text-gray-400">informatique@usthb.dz</span>
            </li>
          </ul>
        </div>

      </div>

      {/* ── Bottom bar ──────────────────────────────────────────────── */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        © 2026 Faculté d'Informatique — USTHB. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;