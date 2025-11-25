import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import ResumComandes from "../components/dashboard/ResumComandes";
import TripleCardGrid from "../components/dashboard/TripleCardGrid";
import GraficaComandes from "../components/dashboard/GraficaComandes";

export default function Dashboard() {
  const { user, isAdmin } = useAuth();

  // Estats
  const [resumComandes, setResumComandes] = useState([]);
  const [novetats, setNovetats] = useState([]);
  const [ultimsStocks, setUltimsStocks] = useState([]);
  const [sobrePetició, setSobrePetició] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // On es conecten les dades
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin h-10 w-10 border-2 border-b-transparent mx-auto rounded-full"></div>
        <p className="mt-3 text-gray-600">Carregant Dashboard...</p>
      </div>
    );
  }

  const dadesFiltrades = resumComandes.filter(c =>
    isAdmin ? true : c.userId === user.id
  );

  return (
    <div className="p-6 space-y-10">
      <ResumComandes comandes={dadesFiltrades} isAdmin={isAdmin()} />

      <TripleCardGrid
        novetats={novetats}
        ultimsStocks={ultimsStocks}
        sobrePetició={sobrePetició}
      />

      <GraficaComandes data={dadesFiltrades} isAdmin={isAdmin()} />
    </div>
  );
}
