import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email) => {
    // On convertit tout en minuscule pour éviter les bugs si on tape "Prof@usthb.dz"
    const mailStr = email.toLowerCase();

    if (mailStr.includes("chef@usthb.dz")) {
      setUser({ role: "chef", roleLabel: "Chef de Département", name: "Pr. Hadj", email, initiales: "PH" });
    } else if (mailStr.includes("prof@usthb.dz")) {
      setUser({ role: "prof", roleLabel: "Professeur", name: "Dr. Meziane", email, initiales: "KM" });
    } else if (mailStr.includes("admin@usthb.dz")) {
      setUser({ role: "admin", roleLabel: "Administrateur", name: "Admin", email, initiales: "AD" });
    } else {
      setUser({ role: "etudiant", roleLabel: "Étudiant", name: "Amina Benali", email, initiales: "AB" });
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}