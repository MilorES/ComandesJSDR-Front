export default function DashboardCard({ title, items = [] }) {
  return (
    <div className="bg-white p-5 rounded shadow h-full">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>

      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">Sense dades.</p>
      ) : (
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={i} className="border-b pb-1 text-sm">
              {item.nom}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
