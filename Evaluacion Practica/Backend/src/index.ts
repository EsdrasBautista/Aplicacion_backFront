import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import { conectarDB } from './config/db';


dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json());

// Rutas de productos
app.use('/products', productRoutes);

// Rutas de autenticación y gestión de usuarios
app.use('/auth', authRoutes); // Rutas de autenticación
app.use('/users', userRoutes); // Rutas de usuarios


//probar conexion a la base de datos 
app.get('/', (req, res) => {
  const query = conectarDB.query('SELECT * FROM bzrq3ob4opvqezk5ifue.usuarios');

  query.then((result) => {
    res.json({
      mensaje: 'API de autenticación y gestión de usuarios',
      datos: result[0]
    });
  }).catch((error) => {
    res.status(500).json({ error: 'Error al consultar la base de datos', detalle: error.message });
  });
});

const PORT =  5000; //process.env.PORT ||
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
