export default function DashboardCard({ title, items = [], showStock = false }) {
  return (
    <div className="bg-white p-5 rounded shadow h-full">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>

      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">Sense dades.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="border-b pb-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.nom}</span>
                {showStock && (
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      item.estoc === 0
                        ? "bg-red-100 text-red-700"
                        : item.estoc <= 5
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    Stock: {item.estoc}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}