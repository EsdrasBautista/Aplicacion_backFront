import { conectarDB } from '../config/db';
import { ProductFilter, Producto } from '../types/productTypes';

export const filterProductos = async(opciones: ProductFilter) => {
    const { code, marca, order = 'ASC' } = opciones;
    let query = 'SELECT * FROM productos WHERE 1=1 ';
    const params: any[] = [];

    if (code) {
        query += ' AND Ean_number LIKE ?';
        params.push(`%${code}%`);
    }

    if (marca) {
        query += ' AND marca LIKE ?';
        params.push(`%${marca}%`);
    }

    if (order) {
        query += ` ORDER BY marca ${order}`;
    }

    const [products]: any = await conectarDB.query(query, params);
    return products;
};

export const agregarProducto = async(products: Producto) =>{
    console.log('agregarProducto', products);
    const query = 'INSERT INTO productos(marca,Ean_number,Oem,imagen,especificaciones,descripcion) VALUES(?, ?, ?, ?, ?, ?)';
    const params : any[] = [];
    params.push(products.marca,products.Ean_number,products.Oem,products.imagen,products.especificaciones,products.descripcion);

    const[product] : any = await conectarDB.query(query,params);
    return product;

}

export const verificarDuplicadoProducto = async (Ean_number: string, Oem:string)=>{
    const [result]: any = await conectarDB.query(
    'SELECT Ean_number, Oem FROM productos WHERE Ean_number = ? OR Oem = ?',
    [Ean_number, Oem]
  );
  return result.length > 0;
}