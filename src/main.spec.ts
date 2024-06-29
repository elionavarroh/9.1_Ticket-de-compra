import {
    LineaTicket,
    ResultadoLineaTicket,
    ResultadoTotalTicket,
    ivaTasas,
    TipoIva,
    TotalPorTipoIva,
} from "./model";

import {
    calculaTicket,
} from "./main";

describe('calculaTicket', () => {
    it('debería devolver el ticket final con todas las líneas y totales correctos', () => {
        // Arrange
        const productos: LineaTicket[] = [
            {
                producto: {
                    nombre: "Legumbres",
                    precio: 2,
                    tipoIva: "general" as TipoIva,
                },
                cantidad: 2,
            },
            {
                producto: {
                    nombre: "Perfume",
                    precio: 20,
                    tipoIva: "general" as TipoIva,
                },
                cantidad: 3,
            },
            {
                producto: {
                    nombre: "Leche",
                    precio: 1,
                    tipoIva: "superreducidoC" as TipoIva,
                },
                cantidad: 6,
            },
            {
                producto: {
                    nombre: "Lasaña",
                    precio: 5,
                    tipoIva: "superreducidoA" as TipoIva,
                },
                cantidad: 1,
            },
            {
                producto: {
                    nombre: "Paracetamol",
                    precio: 3,
                    tipoIva: "superreducidoB" as TipoIva,
                },
                cantidad: 1,
            }
        ];

        // Act
        const resultado = calculaTicket(productos);

        // Assert
        const lineasEsperadas: ResultadoLineaTicket[] = [
            {
                nombre: "Legumbres",
                cantidad: 2,
                precioSinIva: 4,
                tipoIva: "general",
                precioConIva: Number((4 * (1 + ivaTasas.general)).toFixed(2)),
            },
            {
                nombre: "Perfume",
                cantidad: 3,
                precioSinIva: 60,
                tipoIva: "general",
                precioConIva: Number((60 * (1 + ivaTasas.general)).toFixed(2)),
            },
            {
                nombre: "Leche",
                cantidad: 6,
                precioSinIva: 6,
                tipoIva: "superreducidoC",
                precioConIva: Number((6 * (1 + ivaTasas.superreducidoC)).toFixed(2)),
            },
            {
                nombre: "Lasaña",
                cantidad: 1,
                precioSinIva: 5,
                tipoIva: "superreducidoA",
                precioConIva: Number((5 * (1 + ivaTasas.superreducidoA)).toFixed(2)),
            },
            {
                nombre: "Paracetamol",
                cantidad: 1,
                precioSinIva: 3,
                tipoIva: "superreducidoB",
                precioConIva: Number((3 * (1 + ivaTasas.superreducidoB)).toFixed(2)),
            }
        ];

        const totalSinIva = 4 + 60 + 6 + 5 + 3;
        const totalIva = (4 * ivaTasas.general) + (60 * ivaTasas.general) + (6 * ivaTasas.superreducidoC) + (5 * ivaTasas.superreducidoA) + (3 * ivaTasas.superreducidoB);
        const totalConIva = totalSinIva + totalIva;

        const totalEsperado: ResultadoTotalTicket = {
            totalSinIva: Number(totalSinIva.toFixed(2)),
            totalConIva: Number(totalConIva.toFixed(2)),
            totalIva: Number(totalIva.toFixed(2)),
        };

        const desgloseIvaEsperado: TotalPorTipoIva[] = [
            { tipoIva: "general", cuantia: Number((4 * ivaTasas.general + 60 * ivaTasas.general).toFixed(2)) },
            { tipoIva: "reducido", cuantia: 0 },
            { tipoIva: "superreducidoA", cuantia: Number((5 * ivaTasas.superreducidoA).toFixed(2)) },
            { tipoIva: "superreducidoB", cuantia: Number((3 * ivaTasas.superreducidoB).toFixed(2)) },
            { tipoIva: "superreducidoC", cuantia: Number((6 * ivaTasas.superreducidoC).toFixed(2)) },
            { tipoIva: "sinIva", cuantia: 0 },
        ];

        expect(resultado.lineas).toEqual(lineasEsperadas);
        expect(resultado.total).toEqual(totalEsperado);
        expect(resultado.desgloseIva).toEqual(desgloseIvaEsperado);
    });
});