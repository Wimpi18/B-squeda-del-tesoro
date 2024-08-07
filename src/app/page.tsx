"use client";

import { useState } from "react";
import Treasure from "./treasure";

export default function Home() {
  const patrullas = [
    "Águilas",
    "Escorpiones",
    "Gatas Andinas",
    "Jaguares",
    "Kobras",
    "Leones",
    "Leopardos",
    "Pumas",
    "Tiburones",
    "Tigres Dientes de Sable",
  ];

  const [selectedPatrulla, setSelectedPatrulla] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handlePatrullaSelect = (patrulla: string) => {
    setSelectedPatrulla(patrulla);
    setMessage("");
  };

  const handleCodeChange = (index: number, value: string) => {
    if (/^[a-zA-Z]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value.toUpperCase();
      setCode(newCode);
    }
  };

  const verifyCode = () => {
    if (!selectedPatrulla) {
      setMessage("Por favor, seleccione una patrulla.");
      return;
    }

    const correctCode = "AAAAAA";
    const enteredCode = code.join("");

    if (enteredCode === correctCode) {
      setMessage(`¡Código correcto para la patrulla ${selectedPatrulla}!`);
      setIsActive(true);
      setIsShaking(false);
    } else {
      setMessage("Código incorrecto. Inténtalo de nuevo.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }

    setTimeout(() => setIsActive(false), 5000);
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-5xl md:text-7xl font-bold text-sky-600 mb-6 text-center">
        La Búsqueda del Tesoro
      </h1>
      <Treasure isActive={isActive} isShaking={isShaking} />
      <form
        className="flex flex-col items-center mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          verifyCode();
        }}
      >
        <div className="flex space-x-2 mb-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={code[index]}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              className="w-12 md:w-16 h-16 md:h-20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 text-center text-lg"
              placeholder="?"
            />
          ))}
        </div>
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition duration-200"
          >
            Verificar Código
          </button>
          {message && (
            <p
              className={`mt-4 text-xl ${
                isActive ? "text-green-500" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full max-w-3xl">
        {patrullas.map((patrulla, index) => (
          <button
            key={index}
            onClick={() => handlePatrullaSelect(patrulla)}
            className={`px-4 py-2 ${
              selectedPatrulla === patrulla ? "bg-blue-800" : "bg-sky-600"
            } text-white rounded-lg hover:bg-sky-800 transition duration-200`}
          >
            {patrulla}
          </button>
        ))}
      </div>
    </main>
  );
}
