import {
    calcularPrecioConIva,
    calcularPrecioPorCantidad,
    precioTotalSinIva,
} from "./motor"

import {
    LineaTicket,
    TipoIva, 
    TotalPorTipoIva,
} from "./model";

describe('calcularPrecioPorCantidad ', () => {
    it('debería devolver el precio por cantidad del producto legumbres', () => {
        //Arrange
        const precio: number[] = [2, 2];
        const cantidad: number[] = [1, 1];

        //Act
        const resultado = calcularPrecioPorCantidad(precio, cantidad);

        //Assert
        const precioTotal = 4;

        expect(resultado).toEqual(precioTotal);
    });

    it('debería devolver el precio por cantidad del producto perfume', () => {
        //Arrange
        const precio: number[] = [20, 20, 20];
        const cantidad: number[] = [1, 1, 1];

        //Act
        const resultado = calcularPrecioPorCantidad(precio, cantidad);

        //Assert
        const precioTotal = 60;

        expect(resultado).toEqual(precioTotal);
    });

    it('debería devolver el precio por cantidad del producto leche', () => {
        //Arrange
        const precio: number[] = [1];
        const cantidad: number[] = [1];

        //Act
        const resultado = calcularPrecioPorCantidad(precio, cantidad);

        //Assert
        const precioTotal = 1;

        expect(resultado).toEqual(precioTotal);
    });

    it('debería devolver el precio por cantidad del producto lasaña', () => {
        //Arrange
        const precio: number[] = [5];
        const cantidad: number[] = [1];

        //Act
        const resultado = calcularPrecioPorCantidad(precio, cantidad);

        //Assert
        const precioTotal = 5;

        expect(resultado).toEqual(precioTotal);
    });

    it('debería devolver el precio por cantidad del producto paracetamol', () => {
        //Arrange
        const precio: number[] = [3];
        const cantidad: number[] = [1];

        //Act
        const resultado = calcularPrecioPorCantidad(precio, cantidad);

        //Assert
        const precioTotal = 3;

        expect(resultado).toEqual(precioTotal);
    });
});

describe('precioTotalSinIva', () => {
    it('debería devolver el precio de todos los productos juntos sin IVA', () => {
        //Arrange
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

        //Act
        const resultado = precioTotalSinIva(productos);

        //Assert
        const precioSinIva = 2 * 2 + 20 * 3 + 1 * 6 + 5 * 1 + 3 * 1;

        expect(resultado).toEqual(precioSinIva);
    });
});

describe('calcularPrecioConIva', () => {
    it('debería devolver el desglose del IVA por tipo', () => {
        //Arrange
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

        //Act
        const resultado = calcularPrecioConIva(productos);

        //Assert
        const esperado: TotalPorTipoIva[] = [
            { tipoIva: "general", cuantia: Number((2 * 2 * 0.21 + 20 * 3 * 0.21).toFixed(2)) },
            { tipoIva: "reducido", cuantia: 0 },
            { tipoIva: "superreducidoA", cuantia: Number((5 * 1 * 0.04).toFixed(2)) },
            { tipoIva: "superreducidoB", cuantia: Number((3 * 1 * 0.07).toFixed(2)) },
            { tipoIva: "superreducidoC", cuantia: Number((1 * 6 * 0.02).toFixed(2)) },
            { tipoIva: "sinIva", cuantia: 0 },
        ];

        expect(resultado).toEqual(esperado);
    });
});
