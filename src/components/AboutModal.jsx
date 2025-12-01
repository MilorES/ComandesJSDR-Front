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
            <h2 className="text-2xl font-bold">Quant a</h2>
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
                <span>Grup 7 (Aula 01)</span>
              </div>
              <div className="flex">
                <span className="font-medium min-w-[120px]">Professora:</span>
                <span>Laura Villalba Guerrero</span>
              </div>
            </div>
          </section>

          {/* Repositoris GitHub */}
          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Codi font</h3>
            <div className="space-y-2">
              {[
                { label: "Frontend", repo: "ComandesJSDR-Front" },
                { label: "Backend", repo: "ComandesJSDR-Back" }
              ].map(({ label, repo }) => (
                <a
                  key={repo}
                  href={`https://github.com/MilorES/${repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-blue-600 hover:text-blue-800 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-700">{label}</div>
                    <div className="font-mono text-xs text-gray-500">{repo}</div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Footer del modal */}
          <div className="pt-4 border-t space-y-3">
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-4">
                <span className="font-medium">UI</span>
                <span className="font-mono text-xs">v{__APP_VERSION__}</span>
                <span className="text-gray-400">·</span>
                <span className="font-mono text-xs">{__BUILD_DATE__}</span>
              </div>
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
