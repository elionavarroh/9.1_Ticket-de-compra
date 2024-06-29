import {
    LineaTicket,
    TotalPorTipoIva,
    ivaTasasTipo,
    ivaTasas,
    TipoIva,
} from "./model"

//Precio de cada producto por su cantidad sin IVA
export const calcularPrecioPorCantidad = (precio: number[], cantidad: number[]): number => {
    const sumarPrecio = precio.reduce((acc, precios, index) => acc + precios * cantidad[index], 0);
    const precioTotalRedondeado = Number(sumarPrecio.toFixed(2));
    return precioTotalRedondeado;
};

//Precio total sin IVA
export const precioTotalSinIva = (lineasTicket: LineaTicket[]): number => {
    const precios = lineasTicket.map(linea => linea.producto.precio);
    const cantidades = lineasTicket.map(linea => linea.cantidad);
    return calcularPrecioPorCantidad(precios, cantidades);
};

export const calcularPrecioConIva = (lineasTicket: LineaTicket[]): TotalPorTipoIva[] => {
    // Calcula la cuantia de cada uno de los tipos 
    const cuantiaPorTipo: ivaTasasTipo = {
        general: 0.0,
        reducido: 0.0,
        superreducidoA: 0.0,
        superreducidoB: 0.0,
        superreducidoC: 0.0,
        sinIva: 0.0,
    };

    lineasTicket.forEach((linea) => {
        const { tipoIva, precio } = linea.producto;
        const cantidad = linea.cantidad;
        const cuantia = precio * cantidad * ivaTasas[tipoIva];
        cuantiaPorTipo[tipoIva] += cuantia;
    });

    const desgloseIva: TotalPorTipoIva[] = [];

    Object.keys(cuantiaPorTipo).forEach((tipo) => {
        const tipoIva: TipoIva = tipo as TipoIva;
        desgloseIva.push({
            tipoIva: tipoIva,
            cuantia: Number(cuantiaPorTipo[tipoIva].toFixed(2)),
        })
    });

    return desgloseIva;
}