import MainLayout from "../layouts/MainLayout";

const orders = [
  { id: "#00123", description: "...", status: "En tràmit" },
  { id: "#00124", description: "...", status: "Lliurat" },
  { id: "#00125", description: "...", status: "Cancel·lat" },
];

const getStatusColor = (status) => {
  switch (status) {
    case "En tràmit":
      return "bg-yellow-500 md:bg-yellow-100 md:text-yellow-800";
    case "Lliurat":
      return "bg-green-500 md:bg-green-100 md:text-green-800";
    case "Cancel·lat":
      return "bg-red-500 md:bg-red-100 md:text-red-800";
    default:
      return "bg-gray-500 md:bg-gray-100 md:text-gray-800";
  }
};

const gridLayoutClasses = "grid grid-cols-[80px_1fr_40px] md:grid-cols-[100px_1fr_120px]";

export default function GestioComandes() {
  return (
    <MainLayout>
      <div className="p-4 sm:p-6 flex justify-center">
        <div className="bg-white shadow-lg rounded-xl border border-gray-200 w-[99%] md:w-full max-w-[1700px] p-4 md:p-6">
          
          <div className={`${gridLayoutClasses} font-bold text-gray-600 border-b pb-2 mb-3 items-center`}>
            <span>ID</span>
            <span className="md:pl-16">Descripció</span>
            <span className="text-right">Estat</span>
          </div>

          <div className="divide-y divide-gray-200 space-y-0">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`${gridLayoutClasses} items-center py-3 hover:bg-gray-50 transition`}
              >
                <span className="text-gray-700 font-medium truncate pr-2">{order.id}</span>

                <span className="text-gray-600 truncate pr-2 md:pl-16">{order.description}</span>

                <div className="flex justify-end items-center">
                  <span
                    className={`w-3 h-3 rounded-full md:hidden ${getStatusColor(order.status)}`}
                  ></span>

                  <span
                    className={`hidden md:inline-block px-3 py-1 rounded-full text-sm font-medium text-right ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
