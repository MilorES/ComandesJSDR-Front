import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ManualModal({ isOpen, onClose }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetch("/docs/manual-usuari.md")
        .then((response) => response.text())
        .then((text) => {
          setContent(text);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error carregant manual:", error);
          setContent("# Error\n\nNo s'ha pogut carregar el manual d'usuari.");
          setLoading(false);
        });
    }
  }, [isOpen]);

  const handleDownloadPDF = () => {
    const version = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '';
    const filename = version
      ? `Manual-Usuari-ComandesJSDR-v${version}.pdf`
      : "Manual-Usuari-ComandesJSDR.pdf";
    const link = document.createElement("a");
    link.href = "/docs/manual-usuari.pdf";
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="bg-slate-800 text-white p-4 rounded-t-lg flex items-center justify-between">
          <h2 className="text-xl font-bold">Manual d&apos;Usuari</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition flex items-center gap-2"
              title="Descarregar PDF"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descarregar PDF
            </button>
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

        <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
            </div>
          ) : (
            <div className="manual-content bg-white rounded-lg shadow-sm p-8">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-slate-900 mb-4 pb-3 border-b-2 border-slate-200">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="ml-4">{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 bg-blue-50 pl-4 py-2 my-4 italic text-gray-700">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full border-collapse border border-gray-300">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-slate-700 text-white">
                      {children}
                    </thead>
                  ),
                  th: ({ children }) => (
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {children}
                    </td>
                  ),
                  tr: ({ children }) => (
                    <tr className="hover:bg-gray-50 transition">
                      {children}
                    </tr>
                  ),
                  code: ({ inline, children }) => 
                    inline ? (
                      <code className="bg-gray-200 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono">
                        {children}
                      </code>
                    ) : (
                      <code className="block bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4">
                        {children}
                      </code>
                    ),
                  hr: () => (
                    <hr className="my-8 border-t-2 border-gray-200" />
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-slate-900">{children}</strong>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
