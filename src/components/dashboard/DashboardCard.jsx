export default function DashboardCard({ title, items = [], showStock = false }) {
  return (
    <div className="bg-white p-2 sm:p-3 md:p-5 rounded-lg shadow h-full">
      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
      {items.length === 0 ? (
        <p className="text-gray-500 text-xs md:text-sm">Sense dades.</p>
      ) : (
        <ul className="space-y-2 text-xs md:text-sm">
          {items.map((item, i) => (
            <li key={i} className="border-b pb-2 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start space-x-2">
                <span className="font-medium truncate block flex-1">{item.nom}</span>
                {showStock && (
                  <span
                    className={`text-[10px] md:text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                      item.estoc === 0
                        ? "bg-red-100 text-red-700"
                        : item.estoc <= 5
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    St: {item.estoc}
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