import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import ResumComandes from "../components/dashboard/ResumComandes";
import TripleCardGrid from "../components/dashboard/TripleCardGrid";
import GraficaComandes from "../components/dashboard/GraficaComandes";
import GraficaProductes from "../components/dashboard/GraficaProductes";
import Toast from "../components/Toast";
import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
  const { user, isAdmin, getToken, logout } = useAuth();

  // Estats
  const [resumComandes, setResumComandes] = useState(null);
  const [comandesMensuals, setComandesMensuals] = useState([]);
  const [resumProductes, setResumProductes] = useState(null);
  const [novetats, setNovetats] = useState([]);
  const [ultimsStocks, setUltimsStocks] = useState([]);
  const [sobrePeticio, setSobrePeticio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "error") => {
    setToast({ message, type });
  };

  
  const fetchResumComandes = async () => {
    try {
      const token = getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Dashboard/comandes/resum`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          throw new Error("Sessió expirada");
        }
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      setResumComandes(data);
    } catch (error) {
      showToast(error.message || "Error al carregar resum de comandes");
    }
  };

  
  const fetchComandesMensuals = async () => {
    try {
      const token = getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Dashboard/comandes/mensual?mesos=12`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          throw new Error("Sessió expirada");
        }
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      setComandesMensuals(data);
    } catch (error) {
      showToast(error.message || "Error al carregar comandes mensuals");
    }
  };

  // (SOLO admin)
  const fetchResumProductes = async () => {
    if (!isAdmin()) return;

    try {
      const token = getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Dashboard/productes/resum`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          throw new Error("Sessió expirada");
        }
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      setResumProductes(data);
    } catch (error) {
      showToast(error.message || "Error al carregar resum de productes");
    }
  };

  const fetchNovetats = async () => {
    
    try {
      const token = getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Dashboard/productes/novetats?limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          throw new Error("Sessió expirada");
        }
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      setNovetats(data);
    } catch (error) {
      showToast(error.message || "Error al carregar novetats");
    }
  };

  const fetchUltimsStocks = async () => {
    
    try {
      const token = getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Dashboard/productes/baix-stock?quantitat=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          throw new Error("Sessió expirada");
        }
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      console.log("Resposta baix-stock (<=10):", data);
      
      const productsWithLowStock = data.filter(p => p.estoc > 0);
      console.log("Últims Stocks (estoc > 0):", productsWithLowStock);
      setUltimsStocks(productsWithLowStock);
    } catch (error) {
      console.error("Error fetchUltimsStocks:", error);
      showToast(error.message || "Error al carregar stocks");
    }
  };

  const fetchSobrePeticio = async () => {
    

    try {
      const token = getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Dashboard/productes/baix-stock?quantitat=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          throw new Error("Sessió expirada");
        }
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      console.log("Resposta baix-stock per sobre petició:", data);
      
      const productsWithoutStock = data.filter(p => p.estoc === 0);
      console.log("Sobre petició (estoc === 0):", productsWithoutStock);
      setSobrePeticio(productsWithoutStock);
    } catch (error) {
      console.error("Error fetchSobrePeticio:", error);
      showToast(error.message || "Error al carregar sobre petició");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchResumComandes(),
        fetchComandesMensuals(), 
        fetchResumProductes(),
        fetchNovetats(),
        fetchUltimsStocks(),
        fetchSobrePeticio(),
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin h-10 w-10 border-2 border-b-transparent border-slate-700 mx-auto rounded-full"></div>
        <p className="mt-3 text-gray-600">Carregant Dashboard...</p>
      </div>
    );
  }

  return (
    <MainLayout>
    <div className="p-6 space-y-10">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <ResumComandes data={resumComandes} isAdmin={isAdmin()} />
      
        <TripleCardGrid
          novetats={novetats}
          ultimsStocks={ultimsStocks}
          sobrePetició={sobrePeticio}
        />
      
      <GraficaComandes data={comandesMensuals} isAdmin={isAdmin()} />

      {isAdmin() && <GraficaProductes data={resumProductes} />}
    </div>
     </MainLayout>
  );
 
}