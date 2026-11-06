import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Outlet représente les pages publiques (Accueil, Contact, etc.) */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
