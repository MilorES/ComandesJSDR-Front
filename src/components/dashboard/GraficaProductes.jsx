import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function GraficaProductes({ data }) {
  if (!data) {
    return (
      <div className="bg-white p-2 md:p-6 rounded-lg shadow h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Carregant gràfica...</p>
      </div>
    );
  }

  // Preparar datos para el gráfico
  const chartData = [
    { name: "Productes Actius", value: data.productesActius || 0 },
    { name: "Productes Inhabilitats", value: data.productesInhabilitats || 0 },
    { name: "Productes Sense Stock", value: data.productesSenseStock || 0 },
  ].filter((item) => item.value > 0);

  const COLORS = [
    "#34D399", // Verde - Actius
    "#F87171", // Rojo - Inhabilitats
    "#FCD34D", // Amarillo - Sense Stock
  ];

  return (
    <div className="bg-white p-2 md:p-6 rounded-lg shadow">
      <h3 className="text-lg md:text-xl font-semibold mb-4">Estats dels Productes</h3>

      <div className="mb-4 text-xs md:text-sm text-gray-600">
        <strong>Total Productes:</strong> {data.totalProductes || 0}
      </div>

      {chartData.length === 0 ? (
        <div className="h-[320px] flex items-center justify-center">
          <p className="text-gray-500">No hi ha dades per mostrar</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) =>
                `${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}