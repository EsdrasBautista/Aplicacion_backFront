import { verifyToken } from '../middlewares/verifyToken';
import { Router } from 'express';
import { getfilterProductos, addProduct } from '../controllers/productController';

const router = Router();

router.post('/filterProduct',verifyToken, getfilterProductos);
router.post('/addProducto',verifyToken,addProduct);


export default router;