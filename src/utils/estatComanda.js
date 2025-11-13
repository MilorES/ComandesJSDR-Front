// Utilitats per gestionar els estats de comandes del Backend

export const EstatComanda = {
  Esborrany: 0,
  PendentAprovacio: 1,
  Aprovada: 2,
  EnProces: 3,
  Enviada: 4,
  Finalitzada: 5,
  Cancellada: 6
};

export const getEstatText = (estat) => {
  switch (estat) {
    case EstatComanda.Esborrany:
      return "Esborrany";
    case EstatComanda.PendentAprovacio:
      return "Pendent aprovació";
    case EstatComanda.Aprovada:
      return "Aprovada";
    case EstatComanda.EnProces:
      return "En procés";
    case EstatComanda.Enviada:
      return "Enviada";
    case EstatComanda.Finalitzada:
      return "Finalitzada";
    case EstatComanda.Cancellada:
      return "Cancel·lada";
    default:
      return "Desconegut";
  }
};

export const getEstatColor = (estat) => {
  switch (estat) {
    case EstatComanda.Esborrany:
      return "bg-gray-500 md:bg-gray-100 md:text-gray-800";
    case EstatComanda.PendentAprovacio:
      return "bg-yellow-500 md:bg-yellow-100 md:text-yellow-800";
    case EstatComanda.Aprovada:
      return "bg-blue-500 md:bg-blue-100 md:text-blue-800";
    case EstatComanda.EnProces:
      return "bg-purple-500 md:bg-purple-100 md:text-purple-800";
    case EstatComanda.Enviada:
      return "bg-indigo-500 md:bg-indigo-100 md:text-indigo-800";
    case EstatComanda.Finalitzada:
      return "bg-green-500 md:bg-green-100 md:text-green-800";
    case EstatComanda.Cancellada:
      return "bg-red-500 md:bg-red-100 md:text-red-800";
    default:
      return "bg-gray-500 md:bg-gray-100 md:text-gray-800";
  }
};