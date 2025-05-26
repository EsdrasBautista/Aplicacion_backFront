'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';
import Layout from '@/app/Components/layout';

const main: React.FC = () => {
  const { nameUser } = useAuth();
  const router = useRouter();

  return (
    <Layout openeModalUser={() => {}} openeModalProduct={ () => {}}>
        <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white text-center px-6">
        <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            ¡Bienvenido, {nameUser?.toUpperCase() || 'Usuario'}! 🎉
            </h1>
            <p className="text-lg md:text-xl font-medium mb-8">
            Nos alegra tenerte de vuelta. Prepárate para explorar nuevas funcionalidades y gestionar tus productos y usuarios.
            </p>
            <motion.button
            onClick={() => router.push('/dashboard')}
            className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-gray-100 transition duration-300"
            whileHover={{ scale: 1.05 }}
            >
            Ir al Panel de Control
            </motion.button>
        </motion.div>
        </main>
    </Layout>
  );
};

export default main;
