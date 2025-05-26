import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, getAllUsers, filterByFechaNac } from '../models/User';


const JWT_SECRET = process.env.JWT_SECRET as string; // obtenemos la clave secreta del entorno

export const registrarUsuario = async (req: Request, res: Response) => {
  const { username, email, password, fecha_nacimiento } = req.body;

  try {
    const existeUsuario = await findUserByEmail(email);
    if (existeUsuario) {
        res.status(400).json({ message: 'El correo ya está registrado.' });
        return;
    }

    const hashContra = await bcrypt.hash(password, 10);
    const userId = await createUser(username, email, hashContra,fecha_nacimiento);
    if(userId.length === 0){
        res.status(400).json({ message: 'Error al registrar usuario.' });
        return;
    }
    const token = jwt.sign({ userId: userId, username: username }, JWT_SECRET);

    res.status(201).json({ message: 'Usuario registrado correctamente.', userId , token: token, username: username});
    return;
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar usuario.', error: err });
    return;
  }
};

export const iniciarSesion = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
        res.status(401).json({ message: 'Credenciales inválidas.' });
        return;
    }
    const compararContra = await bcrypt.compare(password, user.password_Hash);
    if (!compararContra) {
        res.status(401).json({ message: 'Credenciales inválidas.' });
        return;
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET);
    
    res.status(200).json({ message: `Bienvenido, ${user.username}`, token: token, user: user , autenticado: true });
    return;
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión.', error: err });
    return;
  }
};

export const cerrarSesion = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'Sesión cerrada correctamente.', autenticado: false });
    return;
  } catch (err) {
    res.status(500).json({ message: 'Error al cerrar sesión.', error: err });
    return;
  }
}

export const obtenerUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await getAllUsers();
        res.status(200).json({ usuarios });
        return;
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener usuarios.', error: err });
        return;
    }
};

export const getfilterByFechaNac = async (req: Request, res: Response) => {
  try{
    const { fecha_nacimiento,order} = req.body;
    const registros = await filterByFechaNac({
      fecha_nacimiento: fecha_nacimiento,
      order: order === 'DESC' ? 'DESC' : 'ASC' 
    });

    if (registros.length === 0 || !registros) {
      res.status(404).json({ message: 'No se encontraron registros para la fecha de nacimiento proporcionada.' });
      return;
    }
    res.status(200).json({ message:"Registros encontrados!", registros: registros, lengthUser: registros.length });
    return;
  }catch (error) {
    console.error('Error al obtener los registros por fecha de nacimiento:', error);
    res.status(500).json({ message: 'Error al obtener los registros por fecha de nacimiento.', error });
    return;
  }
}
