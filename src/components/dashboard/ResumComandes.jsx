import { EstatComanda, getEstatText, getEstatColor } from "../../utils/estatComanda";

export default function ResumComandes({ data, isAdmin }) {
  if (!data) {
    return (
      <div className="p-4 sm:p-6 flex justify-center">
        <div className="bg-white shadow-lg rounded-xl border border-gray-200 w-[99%] md:w-full max-w-[1700px] p-4 md:p-6">
          <p className="text-gray-500">Carregant resum...</p>
        </div>
      </div>
    );
  }

  const resum = {
    [EstatComanda.Esborrany]: data.esborranys || 0,
    [EstatComanda.PendentAprovacio]: data.pendentsAprovacio || 0,
    [EstatComanda.Aprovada]: data.aprovades || 0,
    [EstatComanda.EnProces]: data.enProces || 0,
    [EstatComanda.Enviada]: data.enviades || 0,
    [EstatComanda.Finalitzada]: data.finalitzades || 0,
    [EstatComanda.Cancellada]: data.cancellades || 0,
  };

  return (
    <div className="p-4 sm:p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 w-[99%] md:w-full max-w-[1700px] p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 text-left">
          {isAdmin
            ? "Resum global de totes les comandes"
            : "Resum de les teves comandes"}
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-center text-[0.83rem]">
            <thead>
              <tr>
                {Object.values(EstatComanda).map((estat) => (
                  <th
                    key={estat}
                    className={`px-4 py-2 ${getEstatColor(estat)} font-medium rounded-t-lg`}
                  >
                    {getEstatText(estat)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(EstatComanda).map((estat) => (
                  <td
                    key={estat}
                    className="px-4 py-2 border-t border-gray-200 font-semibold"
                  >
                    {resum[estat]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-right text-sm text-gray-600">
          <strong>Total comandes:</strong> {data.totalComandes || 0}
        </div>
      </div>
    </div>
  );
}