"use client";

import { useState } from "react";
import Treasure from "./treasure";

export default function Home() {
  let patrullas: Map<string, string> = new Map();
  patrullas.set("Águilas", "MGLWOZ");
  patrullas.set("Escorpiones", "MSLWOZ");
  patrullas.set("Gatas Andinas", "NATWOZ");
  patrullas.set("Jaguares", "NANWOZ");
  patrullas.set("Kobras", "NOCWOZ");
  patrullas.set("Leones - Marie Curie", "MEHWOZ");
  patrullas.set("Leones - Stan Lee", "SENWOZ");
  patrullas.set("Leopardos", "SELWOZ");
  patrullas.set("Pumas", "SUBWOZ");
  patrullas.set("Tiburones", "MINWOZ");
  patrullas.set("Tigres Dientes de Sable", "NICWOZ");

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

  const verifyCode = async () => {
    if (!selectedPatrulla) {
      setMessage("Por favor, seleccione una patrulla.");
      return;
    }

    const correctCode = patrullas.get(selectedPatrulla);
    const enteredCode = code.join("");

    if (enteredCode === correctCode) {
      setMessage(`¡Código correcto para la patrulla ${selectedPatrulla}!`);
      setIsActive(true);
      setIsShaking(false);

      // Enviar datos al servidor
      try {
        const getTimeInTimezone = (timezoneOffset: number) => {
          const now = new Date();
          const offset = timezoneOffset * 60; // Convertir horas a minutos
          const localOffset = now.getTimezoneOffset(); // Obtener el offset local en minutos
          const timeInGMT = new Date(
            now.getTime() + (offset - localOffset) * 60000
          );
          return timeInGMT.toISOString();
        };

        // GMT-4
        const timestamp = getTimeInTimezone(0);
        await fetch("/api/save-verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patrulla: selectedPatrulla,
            code: enteredCode,
            timestamp,
          }),
        });
      } catch (error) {
        console.error("Failed to save data", error);
      }
    } else {
      setMessage("Código incorrecto. Inténtalo de nuevo.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }

    setTimeout(() => setIsActive(false), 5000);
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-cover bg-center">
      <h1 className="text-5xl md:text-7xl font-bold text-sky-600 mb-6 text-center font-pirata">
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
        <div
          className="flex space-x-2 mb-4 p-4 border-4 border-yellow-700 rounded-lg shadow-lg"
          style={{
            backgroundImage:
              "url('/vintage-grungy-textured-paper-background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={code[index]}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              className="w-12 md:w-16 h-16 md:h-20 border border-yellow-700 bg-yellow-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-center text-lg placeholder-yellow-900"
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full max-w-4xl">
        {Array.from(patrullas.keys()).map((patrulla, index) => (
          <button
            key={index}
            onClick={() => handlePatrullaSelect(patrulla)}
            className={`px-4 py-2 ${
              selectedPatrulla === patrulla ? "bg-blue-800" : "bg-sky-600"
            } text-white rounded-lg hover:bg-sky-800 transition duration-200 font-pirata`}
          >
            {patrulla}
          </button>
        ))}
      </div>
    </main>
  );
}
