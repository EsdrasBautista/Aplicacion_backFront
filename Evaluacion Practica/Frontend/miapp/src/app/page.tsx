'use client'
import Layout from "./Components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faEnvelope, faLock, faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { AuthProvider, useAuth } from "@/context/AuthProvider";
import { ProductProviderContext, useProductAuth } from "@/context/ProductProvider";
import { CreateModalUser } from "./Components/CreateModalUser";
import { motion } from 'framer-motion';
import { CreateModalProduct } from "./Components/CreateProductModal";



export default function Home() {
    return (
        <AuthProvider>
            <ProductProviderContext>
                <HomeContent />
            </ProductProviderContext>
        </AuthProvider>
    )
}

function HomeContent() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isModalUser, SetisModalUser] = useState(false);
    const { handleRegisterUsuario, handleLogin, isAuthenticated, nameUser, loading } = useAuth();
    const { handleRegisterProduct } = useProductAuth();
    const [isModalProduct, SetisModalProduct] = useState(false);

    const closeModalUser = () => SetisModalUser(false);
    const openeModalUser = () => SetisModalUser(true);

    const closeModalProduct = () => SetisModalProduct(false);
    const openeModalProduct = () => SetisModalProduct(true);

    if (isAuthenticated) {
        if (loading) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-blue-950 text-gray-200">
                    <motion.div
                        className="text-3xl font-semibold mb-6 tracking-wide"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    >
                        Cargando...
                    </motion.div>
                    <div className="w-14 h-14 border-4 border-dashed border-gray-400 rounded-full animate-spin" />
                </div>
            );
        }
        return (
            <Layout openeModalUser={() => { }} openeModalProduct={openeModalProduct}>
                <>
                    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-blue-950 text-gray-200">
                        <motion.div
                            className="max-w-2xl"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg flex items-center gap-4">
                                ¡Bienvenido, {nameUser?.toUpperCase() || 'Usuario'}!
                            </h1>
                            <div className="flex flex-col items-center justify-center text-center">
                                <FontAwesomeIcon icon={faUser} className="text-4xl md:text-6xl text-gray mb-4" />
                                <p className="text-lg md:text-xl font-medium mb-8">
                                    Nos alegra tenerte de vuelta. Prepárate para explorar nuevas funcionalidades y gestionar tus productos y usuarios.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div
                        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-00 ${isModalProduct ? "opacity-100 visible" : "opacity-0 invisible"}`}
                        aria-hidden={!isModalProduct}>
                        {isModalProduct && (
                            <CreateModalProduct onCloseProduct={closeModalProduct} onSubmitProduct={handleRegisterProduct} />
                        )}
                    </div>
                </>
            </Layout>
        );
    }

    return (
        <Layout openeModalUser={openeModalUser} openeModalProduct={() => { }}>
            <>
                <div className="container mx-auto py-10 ">
                    <h1 className="text-4xl font-bold mb-6 text-indigo-600 text-center">Iniciar Sesion</h1>

                    <form onSubmit={(e) => { e.preventDefault(); handleLogin(email, password) }} className="max-w-2xl mx-auto bg-white p-12 rounded-2xl shadow-lg border border-gray-200">
                        <div className="mb-4">

                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="h-5 w-9 text-gray"
                                />
                                Email:
                            </label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="h-5 w-9 text-gray"
                                />
                                Contraseña:
                            </label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                        </div>
                        <div className="flex items-center justify-center py-4">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 pr-5 pl-2 rounded focus:outline-none focus:shadow-outline"
                            >
                                <FontAwesomeIcon
                                    icon={faPaperPlane}
                                    className="h-5 w-9 text-gray"
                                />
                                Iniciar Sesion
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">

                        <p className="text-gray-600">¿No tienes una cuenta? <Link href="/pages/create" className="text-indigo-600 hover:underline">Registrate</Link></p>
                    </div>
                </div>
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-00 ${isModalUser ? "opacity-100 visible" : "opacity-0 invisible"}`}
                    aria-hidden={!isModalUser}>
                    {isModalUser && (
                        <CreateModalUser onCloseUser={closeModalUser} onSubmitUser={handleRegisterUsuario} />
                    )}
                </div>
            </>
        </Layout>
    )
}