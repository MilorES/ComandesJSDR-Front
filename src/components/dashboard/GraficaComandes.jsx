import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const ChartDataList = ({ data, COLORS }) => (
  <div className="flex flex-wrap justify-center md:justify-start text-sm mb-4 border-b pb-2 border-gray-100">
    {data.map((item, index) => (
      <div key={item.name} className="flex items-center space-x-1 my-1 px-2">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: COLORS[index % COLORS.length] }}>
        </span>
        <span className="text-gray-700 font-medium whitespace-nowrap">
          {`${item.name}: ${item.value} (${item.import.toFixed(2)}€)`}
        </span>
      </div>
    ))}
  </div>
);

export default function GraficaComandes({ data, isAdmin }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-2 md:p-6 rounded-lg shadow h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Carregant gràfica...</p>
      </div>
    );
  }


  const chartData = data.map((item) => ({
    name: `${item.nomMes.charAt(0).toUpperCase() + item.nomMes.slice(1)}`,
    value: item.quantitatComandes,
    import: item.totalImport,
  })).filter((item) => item.value > 0);

  const COLORS = [
    "#3B82F6", "#10B981", "#F59E0B", "#EF4444",
    "#8B5CF6", "#EC4899", "#14B8A6", "#F97316",
    "#6366F1", "#84CC16", "#06B6D4", "#A855F7"
  ];

  return (
    <div className="bg-white p-2 md:p-6 rounded-lg shadow">
      <h3 className="text-lg md:text-xl font-semibold mb-4">
        {isAdmin
          ? "Comandes dels últims 12 mesos (tots els usuaris)"
          : "Comandes dels últims 12 mesos"}
      </h3>

      {chartData.length === 0 ? (
        <div className="h-[400px] flex items-center justify-center">
          <p className="text-gray-500">No hi ha dades per mostrar</p>
        </div>
      ) : (
        <>
          <ChartDataList data={chartData} COLORS={COLORS} />

          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => {
                  if (name === "value") {
                    const dataItem = props.payload;
                    return [
                      `${value} comandes (${dataItem.import.toFixed(2)}€)`,
                      "Total"
                    ];
                  }
                  return [value, name];
                }}
                labelFormatter={(label) => `Mes: ${label}`}
              />

              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                layout="horizontal"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}