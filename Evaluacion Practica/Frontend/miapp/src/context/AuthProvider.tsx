'use client'
import React, {createContext, useContext, useEffect, useState} from 'react';
import { AuthContextType } from '@/types/auth';
import Swal from 'sweetalert2';
import { User } from '@/types/productTypes';
import { useRouter } from 'next/navigation';


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [nameUser, setNameUser]=  useState("");
    const [userId,setuserId] = useState<number | null>(null);
    const login = (name: string) => {
        setIsAuthenticated(true); 
        setNameUser(name);
    }
    const logout = () => setIsAuthenticated(false);
    const [filterUsers, setFilterUsers] = useState<User[]>([]);
    const [lengthuSers, setLengthUsers] = useState<number>(0);
    const router = useRouter();

    const serverIP = typeof window !== "undefined" ? localStorage.getItem("serverIP") || "" : "localhost:5000";
    const baseURL = `http://${serverIP}:5000`;


   useEffect(() => {
        const IsAuthenticated = localStorage.getItem("isAuthenticated");
        const nameUserLocalStorage = localStorage.getItem("username") || "";
        if (IsAuthenticated === "true") {
            login(nameUserLocalStorage);
            setTimeout(() => {
                    setLoading(false);
            }, 1000);
        }else{
            logout();
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("token");
            localStorage.removeItem("username");
        }
   }, [isAuthenticated])

    //Registrar un usuario
    const handleRegisterUsuario = async (newUser: Partial<User>): Promise<{success: boolean, message: string}> => {

        try{
            const response = await fetch(`${baseURL}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({ username: newUser.username, email: newUser.email, password: newUser.password, fecha_nacimiento: newUser.fecha_nac }),
                });
                const data = await response.json();
                if (!response.ok) {
                    ErrorMessage(data.message);
                    return {success: false, message: 'Error en el fetch'}
                } else {
                    setIsAuthenticated(true);
                    setNameUser(data.username);
                    setuserId(data.id);
                    SuccesMessage(data.message);
                    localStorage.setItem("isAuthenticated", "true");
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", data.username);
                    setTimeout(() => {
                        setLoading(false);
                    }, 2500);
                    
                    return {success: true, message:data.message}
                }

        }catch(error){
            console.error('Error registro: ', error)
            ErrorMessage("Error en la conexion");
            return {success: false, message: 'Error de conexion'}
        }
    }


    //Iniciar sesion
    const handleLogin = async (email: string, password: string): Promise<{success: boolean, message: string}> => {
        try {
            const response = await fetch(`${baseURL}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                ErrorMessage("Error al iniciar sesion, revisa tus credenciales!");
                return {success: false, message: 'Error en el fetch'}
            } else {
                const data = await response.json();
                setIsAuthenticated(data.autenticado);
                setNameUser(data.user.username);
                setuserId(data.id);
                SuccesMessage(`Inicio de sesion exitoseo! ${data.message}`);
                setTimeout(() => {
                    setLoading(false);
                }, 2500);
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.user.username);
                return {success: true, message:data.message}
            }

        } catch (error) {
            console.error('Error login: ', error)
            ErrorMessage("Error en la conexion");
            return {success: false, message: 'Error de conexion'}
        }
    }

    const ErrorMessage = (mensaje: string) => {
        Swal.fire({
            title: 'Error',
            text: mensaje,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        })
    }
    const SuccesMessage = (mensaje: string) => {
        Swal.fire({
            title: 'Exito',
            text: mensaje,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            timer: 1300
        }).then(() => {
            router.push('/');
        })
    }

    const SuccesMessage2 = (mensaje: string) => {
        Swal.fire({
            title: 'Exito',
            text: mensaje,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            timer: 1300
        })
    }

    const sinUsuarios = () => {
        Swal.fire({
            title: 'Sin usuarios',
            text: 'No hay usuarios registrados con ese mes de nacimiento',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            timer: 1300
        })
    }

    const getFilterUsuarios = async (fecha_nacimiento: string, order: string): Promise<void> => {
        const token = localStorage.getItem("token");
        try{
            const response = await fetch(`${baseURL}/users/filter`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`},
                credentials: 'include',
                body: JSON.stringify({fecha_nacimiento, order }),
            })
            const data = await response.json();
            if(!response.ok){
                ErrorMessage(data.message);
                return;
            }
            if(data.registros.length === 0){
                sinUsuarios();
                return;
            }
            setFilterUsers(data.registros);
            setLengthUsers(data.lengthUser);
            SuccesMessage2("Usuarios filtrados Correctamente");


        }catch(error){
            console.error('Error al filtrar usuarios: ', error);
            ErrorMessage("Error en la conexion");
        }
    }

    return(
        <AuthContext.Provider value= {{ isAuthenticated, loading, login, logout,nameUser, userId, handleRegisterUsuario, handleLogin, getFilterUsuarios,filterUsers,lengthuSers, setFilterUsers }}>
            {children}
        </AuthContext.Provider>
    )  

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe de usarse dentro de un AuthProvider');
    }
    return context;
};
