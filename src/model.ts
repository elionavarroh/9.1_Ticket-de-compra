export type TipoIva =
    | "general"
    | "reducido"
    | "superreducidoA"
    | "superreducidoB"
    | "superreducidoC"
    | "sinIva";

export interface Producto {
        nombre: string;
        precio: number;
        tipoIva: TipoIva;
    }

export interface LineaTicket {
        producto: Producto;
        cantidad: number;
    }

export const productos: LineaTicket[] = [
        {
        producto: {
            nombre: "Legumbres",
            precio: 2,
            tipoIva: "general",
        },
        cantidad: 2,
        },
        {
        producto: {
            nombre: "Perfume",
            precio: 20,
            tipoIva: "general",
        },
        cantidad: 3,
        },
        {
        producto: {
            nombre: "Leche",
            precio: 1,
            tipoIva: "superreducidoC",
        },
        cantidad: 6,
        },
        {
        producto: {
            nombre: "Lasaña",
            precio: 5,
            tipoIva: "superreducidoA",
        },
        cantidad: 1,
        },
        {
        producto: {
            nombre: "Paracetamol",
            precio: 3,
            tipoIva: "superreducidoB",
        },
        cantidad: 1,
        },
    ];

export  interface ResultadoLineaTicket {
        nombre: string;
        cantidad: number;
        precioSinIva: number;
        tipoIva: TipoIva;
        precioConIva: number
    }

export   interface ResultadoTotalTicket {
        totalSinIva: number;
        totalConIva: number;
        totalIva: number;
    }
  
export interface TotalPorTipoIva {
        tipoIva: TipoIva;
        cuantia : number;
    }
  
export  interface TicketFinal {
        lineas: ResultadoLineaTicket[];
        total: ResultadoTotalTicket;
        desgloseIva: TotalPorTipoIva[];
    }

export type ivaTasasTipo = {
    [key in TipoIva]: number;
};

export const ivaTasas: ivaTasasTipo = {
    general: 0.21,
    reducido: 0.10,
    superreducidoA: 0.04,
    superreducidoB: 0.07,
    superreducidoC: 0.02,
    sinIva: 0.0,
};