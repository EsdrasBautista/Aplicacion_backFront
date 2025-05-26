'use client';
import CardProducto from '@/app/Components/cardProducto';
import Layout from '@/app/Components/layout';
import { useProductAuth } from '@/context/ProductProvider';
import React, { useState } from 'react';
import { CreateModalProduct } from '../Components/CreateProductModal';
import { Producto } from '@/types/productTypes';

const FiltroProductos: React.FC = () => {
    const [codigo, setCodigo] = useState('');
    const [marca, setMarca] = useState('');
    const [order, setOrder] = useState('ASC');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isModalProduct, SetisModalProduct] = useState(false);
    const { handleRegisterProduct } = useProductAuth();

    const closeModalProduct = () => SetisModalProduct(false);
    const openeModalProduct = () => SetisModalProduct(true);

    const { getfilterProductos, filteredProducts } = useProductAuth();

    const productosPaginados = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

    const handleFiltrar = () => {
        setPage(1);
        getfilterProductos(codigo, marca, order);
    };

    return (
        <Layout openeModalUser={() => { }} openeModalProduct={openeModalProduct}>
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-700">Filtrar productos por marca y codigo</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Marca del producto:</label>
                    <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Ejemplo: Samsung" />

                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Código del producto:</label>
                    <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Ejemplo: 123456789" />
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Página:</label>
                        <input
                            disabled
                            type="number"
                            value={page}
                            min={1}
                            onChange={(e) => setPage(Number(e.target.value))}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Resultados por página:</label>
                        <input
                            type="number"
                            value={pageSize}
                            min={1}
                            max={10}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Orden:</label>
                    <select
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="ASC">Ascendente</option>
                        <option value="DESC">Descendente</option>
                    </select>
                </div>

                <button
                    onClick={handleFiltrar}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-200"
                >
                    Filtrar productos
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {productosPaginados.map((producto: Producto) => (
                    <CardProducto
                        key={producto.id}
                        imagen={producto.imagen}
                        descripcion={producto.descripcion}
                        especificaciones={producto.especificaciones}
                        marca={producto.marca}
                        ean_number={producto.Ean_number}
                        oem={producto.Oem}
                    />
                ))}
            </div>

            {filteredProducts.length > 0 && (
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded-md ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                    >
                        ← Anterior
                    </button>

                    <span className="text-gray-700 font-medium">Página {page}</span>

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page * pageSize >= filteredProducts.length}
                        className={`px-4 py-2 rounded-md ${(page * pageSize >= filteredProducts.length) ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                    >
                        Siguiente →
                    </button>
                </div>
            )}

            <div
                className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-00 ${isModalProduct ? "opacity-100 visible" : "opacity-0 invisible"}`}
                aria-hidden={!isModalProduct}>
                {isModalProduct && (
                    <CreateModalProduct onCloseProduct={closeModalProduct} onSubmitProduct={handleRegisterProduct} />
                )}
            </div>
        </Layout>
    );
};

export default FiltroProductos;
