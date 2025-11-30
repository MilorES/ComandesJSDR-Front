import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function GraficaComandes({ data, isAdmin }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded shadow h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Carregant gràfica...</p>
      </div>
    );
  }

  // Preparar datos: agrupar por mes y sumar comandas
  const chartData = data.map((item) => ({
    name: `${item.nomMes.charAt(0).toUpperCase() + item.nomMes.slice(1)}`, // Capitalizar
    value: item.quantitatComandes,
    import: item.totalImport,
  })).filter((item) => item.value > 0); // Solo meses con comandas

  const COLORS = [
    "#3B82F6", "#10B981", "#F59E0B", "#EF4444", 
    "#8B5CF6", "#EC4899", "#14B8A6", "#F97316",
    "#6366F1", "#84CC16", "#06B6D4", "#A855F7"
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">
        {isAdmin 
          ? "Comandes dels últims 12 mesos (tots els usuaris)" 
          : "Comandes dels últims 12 mesos"}
      </h3>

      {chartData.length === 0 ? (
        <div className="h-[400px] flex items-center justify-center">
          <p className="text-gray-500">No hi ha dades per mostrar</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              label={({ name, value, import: importValue }) =>
                `${name}: ${value} (${importValue.toFixed(2)}€)`
              }
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name, props) => {
                if (name === "value") {
                  return [`${value} comandes`, "Comandes"];
                }
                return [value, name];
              }}
              labelFormatter={(label) => `Mes: ${label}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}