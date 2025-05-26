import React, { useState } from "react";
import { CreateProductModalProps } from "@/types/productTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faBarcode, faInfoCircle, faIndustry, faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export const CreateModalProduct: React.FC<CreateProductModalProps> = ({ onCloseProduct, onSubmitProduct }) => {
    const [descripcion, setDescripcion] = useState("");
    const [marca, setMarca] = useState("");
    const [especificaciones, setEspecificaciones] = useState("");
    const [Ean_number, setEanNumber] = useState("");
    const [imagen, setImagen] = useState("");
    const [Oem, setOem] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await onSubmitProduct({ descripcion, imagen, marca, especificaciones, Ean_number, Oem });
            if (result.success) {
                onCloseProduct();
                //router.push("/");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al crear",
                text: "Hubo un problema al crear el producto.",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-black-100">
                <div className="flex justify-end">
                    <button onClick={onCloseProduct} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                    </button>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-700 text-center">
                    Crear Producto
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Fila principal de inputs (lado izquierdo y derecho) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Columna izquierda con inputs */}
                        <div className="space-y-4">
                            <div>
                                <label className="block font-medium mb-1">
                                    <FontAwesomeIcon icon={faTag} className="mr-2 text-gray-500" />
                                    Descripción (o nombre del producto)
                                </label>
                                <input
                                    type="text"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                            <div>
                                
                                <label className="block font-medium mb-1">
                                    <FontAwesomeIcon icon={faIndustry} className="mr-2 text-gray-500" />
                                    Marca
                                </label>
                                <input
                                    type="text"
                                    value={marca}
                                    onChange={(e) => setMarca(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">
                                    <FontAwesomeIcon icon={faBarcode} className="mr-2 text-gray-500" />
                                    EAN Number
                                </label>
                                <input
                                    type="text"
                                    value={Ean_number}
                                    onChange={(e) => setEanNumber(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">
                                    OEM
                                </label>
                                <input
                                    type="text"
                                    value={Oem}
                                    onChange={(e) => setOem(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">
                                    Imagen (URL)
                                </label>
                                <input
                                    type="text"
                                    value={imagen}
                                    onChange={(e) => setImagen(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                        </div>


                        <div className="p-4">
                            <label className="block font-medium mb-1">
                                <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-500" />
                                Especificaciones
                            </label>
                            <textarea
                                value={especificaciones}
                                onChange={(e) => setEspecificaciones(e.target.value)}
                                required
                                rows={10}
                                className="w-full h-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            ></textarea>
                        </div>
                    </div>


                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center gap-2 transition"
                        >
                            <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5" />
                            Crear Producto
                        </button>
                        <button
                            type="button"
                            onClick={onCloseProduct}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center gap-2 transition"
                        >
                            <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                            Cancelar
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};
