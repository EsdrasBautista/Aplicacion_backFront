import { CardUsuarioProps } from "@/types/auth";
import React from "react";

const CardUsuario: React.FC<CardUsuarioProps> = ({ username, email, fecha_nacimiento, fecha_creacion }) => {
    return (
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-base flex flex-col justify-between h-full cursor-pointer hover:shadow-3xl transition duration-200 w-30 min-h-50">
            
                <h2 className="font-semibold text-indigo-700">{username}</h2>
                <p className="text-gray-600">{email}</p>
            <div className="mt-4 text-gray-500">
                <p>
                    <strong>Nacimiento:</strong>{" "}
                    {new Date(fecha_nacimiento).toLocaleDateString()}
                </p>
                <p>
                    <strong>Creación:</strong>{" "}
                    {new Date(fecha_creacion).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default CardUsuario;
