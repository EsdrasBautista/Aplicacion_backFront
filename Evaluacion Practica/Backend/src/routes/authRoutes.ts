
import { registrarUsuario, iniciarSesion, cerrarSesion } from '../controllers/authController';
import { Router } from 'express';


const router = Router();

router.post('/register', registrarUsuario);
router.post('/login', iniciarSesion);
router.post('/logout', cerrarSesion);

export default router;
