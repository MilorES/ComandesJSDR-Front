import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AboutModal({ isOpen, onClose }) {
  const { getToken } = useAuth();
  const [apiHealth, setApiHealth] = useState(null);

  useEffect(() => {
    const fetchApiHealth = async () => {
      try {
        const token = getToken();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/health`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setApiHealth(data);
        }
      } catch (error) {
        console.error("Error fetching API health:", error);
      }
    };

    if (isOpen) {
      fetchApiHealth();
    }
  }, [isOpen, getToken]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-slate-800 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">ComandesJSDR</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition"
              aria-label="Tancar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contingut */}
        <div className="p-6 space-y-6">
          {/* Descripció */}
          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Descripció</h3>
            <p className="text-gray-700 leading-relaxed">
              ComandesJSDR és una plataforma que centralitza la gestió de comandes, automatitzant processos que normalment són manuals. Gràcies a XML-UBL, permet interoperabilitat amb altres sistemes i compliment normatiu sense complicacions.
            </p>
          </section>

          {/* Equip de desenvolupament */}
          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Equip de desenvolupament</h3>
            <div className="space-y-2 text-gray-700">
              <div className="border-l-4 border-blue-500 pl-3 py-1">
                <p className="font-medium">Jose Antonio Rojo González</p>
                <p className="text-sm text-gray-600">Gestió d'infraestructures</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3 py-1">
                <p className="font-medium">David Acuña Guzmán</p>
                <p className="text-sm text-gray-600">Desenvolupador Senior</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3 py-1">
                <p className="font-medium">Sergi Mases Solé</p>
                <p className="text-sm text-gray-600">Desenvolupador Front-End</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3 py-1">
                <p className="font-medium">Ricard Marinas i Ferrer</p>
                <p className="text-sm text-gray-600">Desenvolupador Front-End</p>
              </div>
            </div>
          </section>

          {/* Informació acadèmica */}
          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Informació acadèmica</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-gray-700">
              <div className="flex">
                <span className="font-medium min-w-[120px]">Institució:</span>
                <span>Institut Obert de Catalunya (IOC)</span>
              </div>
              <div className="flex">
                <span className="font-medium min-w-[120px]">Assignatura:</span>
                <span>DAW - Desenvolupament d'aplicacions web</span>
              </div>
              <div className="flex">
                <span className="font-medium min-w-[120px]">Grup:</span>
                <span>Grup 7, Aula 01</span>
              </div>
              <div className="flex">
                <span className="font-medium min-w-[120px]">Professora:</span>
                <span>Laura Villalba Guerrero</span>
              </div>
            </div>
          </section>

          {/* Footer del modal */}
          <div className="pt-4 border-t space-y-3">
            <div className="text-sm text-gray-600 space-y-2">
              {/* <div className="flex items-center gap-4">
                <span className="font-medium">Frontend:</span>
                <span className="font-mono text-xs">v{__APP_VERSION__}</span>
                <span className="text-gray-400">·</span>
                <span className="font-mono text-xs">{__BUILD_DATE__}</span>
              </div> */}
              {apiHealth && (
                <div className="flex items-center gap-4">
                  <span className="font-medium">API</span>
                  <span className="font-mono text-xs">v{apiHealth.version}</span>
                  <span className="text-gray-400">·</span>
                  <span className="font-mono text-xs">{apiHealth.build}</span>
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                    apiHealth.status === "Servei actiu" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {apiHealth.status}
                  </span>
                </div>
              )}
            </div>
            <p className="text-center text-sm text-gray-500">© 2025 ComandesJSDR. Tots els drets reservats.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
