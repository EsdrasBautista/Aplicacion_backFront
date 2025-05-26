import {agregarProducto, filterProductos, verificarDuplicadoProducto} from '../models/Product'
import { Request, Response } from 'express';


export const getfilterProductos = async (req: Request, res:Response) =>{
    try{
        const {code, marca, order} = req.body;
        const filtracion = await filterProductos({
            code: code,
            marca: marca,
            order: order === 'DESC'? 'DESC': 'ASC'
        });

        if (filtracion.length === 0 || !filtracion) {
            res.status(404).json({ message: 'No se encontraron registros para el codigo y marca proporcionado.' });
            return;
        }

        res.status(200).json({ message:"Registros encontrados!", filtracion: filtracion });
        return;
  }catch (error) {
    console.error('Error al obtener los registros por codigo y marca:', error);
    res.status(500).json({ message: 'Error al obtener los registros por codigo y marca.', error });
    return;
  }  
};

export const addProduct = async(req:Request, res: Response) => {
    try{
        const {marca, Ean_number,Oem,imagen, especificaciones, descripcion} = req.body;
        const verificar = await verificarDuplicadoProducto(Ean_number,Oem);
        if(!verificar){
            res.status(404).json({ message: 'Error!, Ean number o Oem ya existen.' });
            return;
        }
        
        const crearProducto = await agregarProducto({
            marca: marca,
            Ean_number: Ean_number,
            Oem: Oem,
            imagen: imagen,
            especificaciones: especificaciones,
            descripcion: descripcion
        }) 
        if(crearProducto.length === 0){
            res.status(404).json({ message: 'Error!, no se pudo agregar el producto.' });
            return;
        }
        res.status(201).json({ message: 'Producto agregado exitosamente.', producto: crearProducto });
        return;
  }catch (error) {
    console.error('Error al agregar el producto:', error);
    res.status(500).json({ message: 'Error al agregar el producto.', error });
    return;
  }
}