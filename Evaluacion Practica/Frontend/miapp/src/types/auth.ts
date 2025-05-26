import { Producto, User } from "./productTypes";

export interface ProductContextType{
    filteredProducts: Producto[];
    setFilteredProducts: React.Dispatch<React.SetStateAction<Producto[]>>; // el dispatch hace que se actualice el estado
    loading: boolean;
    handleRegisterProduct: (newArticle: Partial<Producto>) => Promise<{success: boolean, message: string}>;
    getfilterProductos: (code: string, marca: string, order: string) => Promise<void>;
    lengthProductos: number;
    
}

export interface AuthContextType{
    isAuthenticated: boolean;
    loading: boolean;
    login: (name: string) => void;
    logout: () => void;
    nameUser: string;
    userId: number | null;
    handleRegisterUsuario: (newUser: Partial<User>) => Promise<{success: boolean, message: string}>;
    handleLogin: (email:string, password: string) => Promise<{success: boolean, message: string}>;
    getFilterUsuarios: (fecha_nacimiento: string, order: string) => Promise<void>;
    filterUsers: User[];
    lengthuSers: number;
    setFilterUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export interface CardUsuarioProps {
  username: string;
  email: string;
  fecha_nacimiento: string;
  fecha_creacion: string;
};

export interface CarProductoProps {
  imagen: string;
  descripcion: string;
  especificaciones: string;
  marca: string;
  ean_number: string;
  oem: string;
}