export interface ProductFilter{
    code?: string;
    marca?: string;
    pagin?: number;
    pageSize?: number;
    order?: 'ASC' | 'DESC';
}
export interface Producto{
    marca: string;
    Ean_number: string;
    Oem: string;
    imagen: string;
    especificaciones: string;
    descripcion: string;
}