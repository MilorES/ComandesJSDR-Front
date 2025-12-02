// productes.jsx
import { useState } from "react";
import ProductList from "../components/ProductList";
import MainLayout from "../layouts/MainLayout";

export default function Productes() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <MainLayout>
      <div className="p-2">
        <div className="mb-6 w-full max-w-md mx-auto">
          <label htmlFor="search" className="sr-only">Cercar producte</label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Cercar producte..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600"
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* 🚨 ICONO LUPA ACTUALIZADO 🚨 */}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
              <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 2048 2048" style={{ shapeRendering:"geometricPrecision",textRendering:"geometricPrecision",imageRendering:"optimizeQuality",fillRule:"nonzero",clipRule:"nonzero" }}><defs><style>{`.fil1,.fil3{fill:#003761;fill-rule:nonzero}.fil1{fill:#01579b}`}</style></defs><g id="Layer_x0020_1"><g id="_220499688"><circle cx="767" cy="769" r="452" style={{ fill:"#b3e5fc",stroke:"#373435",strokeWidth:"2.08347" }}/><path className="fil1" d="M405 407c100-100 231-150 362-150s262 50 362 150 150 231 150 362-50 262-150 362-231 150-362 150-262-50-362-150-150-231-150-362 50-262 150-362zm362-86c-115 0-229 44-317 131-87 87-131 202-131 317s44 229 131 317c87 87 202 131 317 131s229-44 317-131c87-87 131-202 131-317s-44-229-131-317c-87-87-202-131-317-131z"/><path d="M578 1006c14 11 16 31 5 45s-31 16-45 5c-6-5-11-9-16-14-6-5-11-10-15-14-72-72-108-166-108-260s36-188 108-260c2-2 6-6 12-11 13-12 33-11 45 2s11 33-2 45c-2 1-5 5-9 9-59 59-89 137-89 214 0 78 30 155 89 214 4 4 9 8 13 12 5 4 9 8 13 11z" style={{ fill:"#e1f5fe",fillRule:"nonzero" }}/><path className="fil1" d="m1115 1066 222 222-46 45-222-222z"/><path className="fil3" d="m1262 1355 93-93c10-10 23-15 36-15s26 5 36 15l352 349c10 10 15 23 15 36s-5 26-15 36l-93 93c-10 10-23 15-36 15s-26-5-36-15l-352-349c-10-10-15-23-15-36s5-26 15-36z"/><path d="m1309 1308 46-46c10-10 23-15 36-15s26 5 36 15l352 349c10 10 15 23 15 36s-5 26-15 36l-47 47-422-422z" style={{ fill:"#00406f",fillRule:"nonzero" }}/><path className="fil3" d="m1262 1355 47-47 422 422-46 46c-10 10-23 15-36 15s-26-5-36-15l-352-349c-10-10-15-23-15-36s5-26 15-36z"/></g><path style={{ fill:"none" }} d="M0 0h2048v2048H0z"/></g></svg>
            </span>
          </div>
        </div>

        <ProductList searchTerm={searchTerm} />
      </div>
    </MainLayout>
  );
}