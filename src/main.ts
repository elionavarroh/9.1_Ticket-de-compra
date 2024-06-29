import {
  calcularPrecioConIva,
  precioTotalSinIva,
} from "./motor"

import {
  LineaTicket,
  TicketFinal,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  ivaTasas,
} from "./model";

export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  const lineasResultado: ResultadoLineaTicket[] = lineasTicket.map((linea) => {
    const { nombre, precio, tipoIva } = linea.producto;
    const cantidad = linea.cantidad;
    const precioSinIva = precio * cantidad;
    const precioConIva = precioSinIva * (1 + ivaTasas[tipoIva]);

    return {
      nombre,
      cantidad,
      precioSinIva: Number(precioSinIva.toFixed(2)),
      tipoIva,
      precioConIva: Number(precioConIva.toFixed(2)),
    };
  });

  const totalSinIva = precioTotalSinIva(lineasTicket);
  const desgloseIva = calcularPrecioConIva(lineasTicket);

  const totalIva = desgloseIva.reduce((acc, item) => acc + item.cuantia, 0);
  const totalConIva = totalSinIva + totalIva;

  const total: ResultadoTotalTicket = {
    totalSinIva: Number(totalSinIva.toFixed(2)),
    totalConIva: Number(totalConIva.toFixed(2)),
    totalIva: Number(totalIva.toFixed(2)),
  };

  return {
    lineas: lineasResultado,
    total,
    desgloseIva,
  };
};