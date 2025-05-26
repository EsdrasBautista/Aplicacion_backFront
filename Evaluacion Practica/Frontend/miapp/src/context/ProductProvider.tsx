'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { Producto } from '@/types/productTypes';
import { ProductContextType } from '@/types/auth';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProviderContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [filteredProducts, setFilteredProducts] = useState<Producto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [lengthProductos, setLengthProductos] = useState<number>(0);



    const ErrorMessage = (titulo: string, contenido: string) => {
        Swal.fire({
            title: titulo,
            text: contenido,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        })
    }

    const SuccesMessage = (titulo: string, contenido: string) => {
        Swal.fire({
            title: titulo,
            text: contenido,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        })
    }

    //Crear un nuevo producto
    const handleRegisterProduct = async (newArticle: Partial<Producto>): Promise<{ success: boolean, message: string }> => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:5000/products/addProducto`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                credentials: 'include',
                body: JSON.stringify({
                    marca: newArticle.marca,
                    Ean_number: newArticle.Ean_number,
                    Oem: newArticle.Oem,
                    imagen: newArticle.imagen,
                    especificaciones: newArticle.especificaciones,
                    descripcion: newArticle.descripcion
                }),
            });

            if (!response.ok) {
                ErrorMessage('Error', 'Error al crear el producto');
                return { success: false, message: 'Error al crear el producto' };
            }

            const data = await response.json();
            setFilteredProducts([...filteredProducts, data]);
            SuccesMessage('Éxito', 'Producto creado con éxito');
            return { success: true, message: 'Producto creado con éxito' };
        } catch (error) {
            ErrorMessage('Error', 'Error al crear el producto');
            console.error('Error en fetchCreateProduct: ', error);
            return { success: false, message: 'Error al crear el producto' };
        }finally{
                setLoading(false);
        }
    };

    //obtener productos filtrados por codigo y marca
    const getfilterProductos = async (code: string, marca: string, order: string): Promise<void> => {
        const token = localStorage.getItem("token");
        try{
            const response = await fetch(`http://localhost:5000/products/filterProduct`, {
                method: 'POST',
                headers: {'Content-type': 'application/json','Authorization': `Bearer ${token}`},
                credentials: 'include',
                body: JSON.stringify({
                    code,
                    marca,
                    order
                })
            });
            if (!response.ok) {
                ErrorMessage('Error', 'Error al obtener los registros por codigo y marca');
                return;
            }
            const data = await response.json();
            if (data.filtracion.length === 0) {
                ErrorMessage('Error', 'No se encontraron registros para el codigo y marca proporcionado.');
                return;
            }
            setFilteredProducts(data.filtracion);
            setLengthProductos(data.filtracion.length);
            SuccesMessage('Exito', 'Registros encontrados!');
            return;

        }catch(error){
            console.error('Error al obtener los registros por codigo y marca:', error);
            ErrorMessage('Error', 'Error al obtener los registros por codigo y marca.');
            return;
        }
    }



    return (
        <ProductContext.Provider value={{ filteredProducts, setFilteredProducts, loading, handleRegisterProduct , getfilterProductos, lengthProductos}}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProductAuth = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProductAuth debe de usarse dentro de un ProductProvider');
    }
    return context;
};

