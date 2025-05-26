import { conectarDB } from '../config/db';
import { UserFilter } from '../types/userTypes';

export const findUserByEmail = async (email: string) => {
  const [rows]: any = await conectarDB.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows[0];
};

export const getAllUsers = async() =>{
    const [rows]: any = await conectarDB.query('SELECT * FROM usuarios');
    return rows;
}

export const createUser = async (username: string, email: string, hashedPassword: string, fecha_nac: string) => {
  const [result]: any = await conectarDB.query(
    'INSERT INTO usuarios (username, email, password_Hash, fecha_nacimiento) VALUES (?, ?, ?, ?)',
    [username, email, hashedPassword, fecha_nac]
  );

 return result;
};


export const filterByFechaNac = async (options: UserFilter) => {
  const {fecha_nacimiento, order = 'ASC'} = options;
  let query = 'SELECT * FROM usuarios WHERE 1=1';
  const params: any[] = [];

  if (fecha_nacimiento) {
    query += ' AND MONTH(fecha_nacimiento) = ?';
    params.push(fecha_nacimiento);
  }

  if (order) {
    query += ` ORDER BY username ${order}`;
  }

  const [registers]: any = await conectarDB.query(query, params);
  return registers; // todos los usuarios que cumplen con el filtro
}



