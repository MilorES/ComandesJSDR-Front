import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { EstatComanda, getEstatText } from "../../utils/estatComanda";

export default function GraficaComandes({ data = [], isAdmin }) {
  
  const resum = Object.values(EstatComanda).map(estat => ({
    name: getEstatText(estat),
    value: data.filter(c => c.estat === estat).length
  }));

  return (
    <div className="bg-white p-6 rounded shadow h-[400px]">
      
      {resum.every(r => r.value === 0) ? (
        <p className="text-gray-500">Aquí va el gràfic de barres</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={resum} dataKey="value" nameKey="name" outerRadius={130}>
              {resum.map((_, i) => (
                <Cell key={i} fill={`hsl(${(i * 60) % 360}, 70%, 55%)`} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
