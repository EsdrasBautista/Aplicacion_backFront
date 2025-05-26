import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { LayoutProps } from "@/types/productTypes";
import { motion } from "framer-motion";

const Layout: React.FC<LayoutProps> = ({ children, openeModalProduct, openeModalUser }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 text-gray-800">
      <Navbar handleOpenModalProduct={openeModalProduct} handleOpenModalUser={openeModalUser} />

      <motion.main
        className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "backInOut" }}
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  );
};

export default Layout;
