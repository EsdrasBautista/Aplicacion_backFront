import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token no proporcionado.' });
    return;
  }

  const token = authHeader.split(' ')[1]; // Obtener el token del encabezado de autorización

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; username: string, email: string, fecha_nacimiento: string };
    (req as any).user = decoded; // Adjuntar el usuario al request
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido o expirado.' });
    return;
  }
};
