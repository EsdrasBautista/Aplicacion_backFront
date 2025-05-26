'use client';
import CardUsuario from '@/app/Components/card';
import Layout from '@/app/Components/layout';
import { useAuth } from '@/context/AuthProvider';
import React, { useState } from 'react';
import { CreateModalProduct } from '../Components/CreateProductModal';
import { useProductAuth } from '@/context/ProductProvider';
import { User } from '@/types/productTypes';

const FiltroUsuarios: React.FC = () => {
    const [mesNacimiento, setMesNacimiento] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [order, setOrder] = useState('ASC');
    const { getFilterUsuarios, filterUsers } = useAuth();
    const [isModalProduct, SetisModalProduct] = useState(false);
    const { handleRegisterProduct } = useProductAuth();

    const closeModalProduct = () => SetisModalProduct(false);
    const openeModalProduct = () => SetisModalProduct(true);

    const meses = [
        { nombre: 'Enero', valor: '01' },
        { nombre: 'Febrero', valor: '02' },
        { nombre: 'Marzo', valor: '03' },
        { nombre: 'Abril', valor: '04' },
        { nombre: 'Mayo', valor: '05' },
        { nombre: 'Junio', valor: '06' },
        { nombre: 'Julio', valor: '07' },
        { nombre: 'Agosto', valor: '08' },
        { nombre: 'Septiembre', valor: '09' },
        { nombre: 'Octubre', valor: '10' },
        { nombre: 'Noviembre', valor: '11' },
        { nombre: 'Diciembre', valor: '12' },
    ];

    const usuariosPaginados = filterUsers.slice((page - 1) * pageSize, page * pageSize);

    return (
        <Layout openeModalUser={() => { }} openeModalProduct={openeModalProduct}>
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-700">Filtrar usuarios por mes de nacimiento</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Mes de nacimiento:</label>
                    <select
                        value={mesNacimiento}
                        onChange={(e) => setMesNacimiento(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="">-- Selecciona un mes --</option>
                        {meses.map((mes) => (
                            <option key={mes.valor} value={mes.valor}>
                                {mes.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Página:</label>
                        <input
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
                    onClick={() => {
                        setPage(1);
                        getFilterUsuarios(mesNacimiento, order);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-200"
                >
                    Filtrar usuarios
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {usuariosPaginados.map((user: User) => (
                    <CardUsuario
                        key={user.id}
                        username={user.username}
                        email={user.email}
                        fecha_nacimiento={user.fecha_nacimiento}
                        fecha_creacion={user.fecha_creacion}
                    />
                ))}
            </div>

            {filterUsers.length > 0 && (
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
                        disabled={page * pageSize >= filterUsers.length}
                        className={`px-4 py-2 rounded-md ${(page * pageSize >= filterUsers.length) ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
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

export default FiltroUsuarios;
