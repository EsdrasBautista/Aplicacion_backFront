export interface Producto{
    marca: string;
    Ean_number: string;
    Oem: string;
    imagen: string;
    especificaciones: string;
    descripcion: string; // o nombre del producto
}

export interface User{
  username:string;
  email:string;
  password:string;
  fecha_nac: string;
}

export interface LayoutProps {
    children: React.ReactNode;
    openeModalUser: () => void;
    openeModalProduct: () => void;
}

export interface NavbarProps{
  handleOpenModalUser: () => void;
  handleOpenModalProduct: () => void;
}


export interface CreateProductModalProps{
  onCloseProduct: () => void;
  onSubmitProduct: (newProduct: Partial<Producto>) => Promise<{success:boolean, message:string}>;
}

export interface CreateUserModalProps{
  onCloseUser: () => void;
  onSubmitUser: (newUser: Partial<User>) => Promise<{success:boolean, message:string}>;  
}