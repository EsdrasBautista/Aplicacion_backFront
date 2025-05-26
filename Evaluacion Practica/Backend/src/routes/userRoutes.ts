import { Router } from 'express';
import { obtenerUsuarios, getfilterByFechaNac } from '../controllers/authController';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.get('/', verifyToken, obtenerUsuarios); // Ruta protegida para ver todos los usuarios
router.post('/filter', verifyToken, getfilterByFechaNac); // Ruta protegida para filtrar por fecha de nacimiento a los usuarios

export default router;
