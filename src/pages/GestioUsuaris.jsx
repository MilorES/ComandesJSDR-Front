import UsuarisTable from "../components/gestio-usuaris/UsuarisTable";
import UsuariForm from "../components/gestio-usuaris/UsuariForm";

export default function GestioUsuaris() {
  return (
    <div className="flex flex-col p-6">
      <h1 className="text-3xl font-semibold mb-6 text-left">
        Gestió d'Usuaris
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <UsuariForm />

        <UsuarisTable />
      </div>
    </div>
  );
}
