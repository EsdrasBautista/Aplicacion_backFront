import { CarProductoProps } from "@/types/auth";
import React from "react";

const CardProducto: React.FC<CarProductoProps> = ({ imagen, descripcion, especificaciones, marca, ean_number, oem }) => {
    return (
        <div className="bg-white rounded-3xl shadow-2xl p-6 text-base flex flex-col justify-between h-full cursor-pointer hover:shadow-3xl transition duration-200">
            <div className="flex justify-center mb-4">
                <img src={imagen} alt={"imagen del producto"} className="h-32 object-contain" />
                {/*<Image src={imagen} alt="imagen del producto" width={128}  height={128} className="object-contain h-32 w-auto"/>*/}
            </div>

            <h2 className="font-semibold text-indigo-700 text-lg">{descripcion}</h2>
            <p className="text-gray-600 font-medium mb-2">{marca}</p>

            <div className="text-sm text-gray-700">
                <p><strong>Especificaciones:</strong> {especificaciones}</p>
                <p><strong>EAN Number:</strong> {ean_number}</p>
                <p><strong>OEM:</strong> {oem}</p>
            </div>
        </div>
    );
};

export default CardProducto;
