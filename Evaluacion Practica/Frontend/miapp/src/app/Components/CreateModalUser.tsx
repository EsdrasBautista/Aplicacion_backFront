import React from "react";
import { CreateUserModalProps } from "@/types/productTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faUser, faEnvelope, faLock, faPaperPlane, faTimes, faCalendar } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export const CreateModalUser: React.FC<CreateUserModalProps> = ({ onCloseUser, onSubmitUser }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fecha_nacimiento, setfecha_nac] = useState("");
    const router = useRouter();

    const formatFechaNacimiento = (fecha: string): string => {
        const [day, month, year] = fecha.split("/");
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const fechaFormateada = fecha_nacimiento.includes('/') ? formatFechaNacimiento(fecha_nacimiento) : fecha_nacimiento;
            const result = await onSubmitUser({ username, email, password, fecha_nacimiento: fechaFormateada });
            if (result.success) {
                onCloseUser();
                router.push('/');
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error al crear",
                text: "Hubo un problema al crear el Usuario.",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-black-100">
                <div className="flex justify-end">
                    <button onClick={onCloseUser} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                    </button>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-700 text-center">
                    Crear Cuenta
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-black-700 font-medium mb-1">
                            <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
                            Nombre de Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-black-700 font-medium mb-1">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-500" />
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-black-700 font-medium mb-1">
                            <FontAwesomeIcon icon={faLock} className="mr-2 text-gray-500" />
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="birthDate" className="block text-black-700 font-medium mb-1">
                            <FontAwesomeIcon icon={faCalendar} className="mr-2 text-gray-500" />
                            Fecha de Nacimiento
                        </label>
                        <input
                            type="date"
                            id="birthDate"
                            value={fecha_nacimiento}
                            onChange={(e) => setfecha_nac(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center gap-2 transition">
                            <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5" />
                            Registrarse
                        </button>
                        <button onClick={onCloseUser} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center gap-2 transition ml-2">
                            <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                            Cancelar
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6 text-gray-600">
                    ¿Ya tienes una cuenta?{" "}
                    <button onClick={onCloseUser} className="text-indigo-600 hover:underline font-medium">
                        Inicia Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};
