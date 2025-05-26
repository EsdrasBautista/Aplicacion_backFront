import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt, faUser, faUserPlus, faBox, faUsers, faBoxOpen, faComputer } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { NavbarProps } from "@/types/productTypes";
import { useAuth } from "@/context/AuthProvider";
import { useProductAuth } from "@/context/ProductProvider";


const Navbar: React.FC<NavbarProps> = ({ handleOpenModalUser, handleOpenModalProduct }) => {
  const router = useRouter();
  const { isAuthenticated, logout, nameUser, login, setFilterUsers } = useAuth();
  const { setFilteredProducts } = useProductAuth();

  const [serverIP, setServerIP] = useState(typeof window !== "undefined" ? localStorage.getItem("serverIP") || "" : "localhost:5000");
  const baseURL = `http://${serverIP}:5000`;

  useEffect(() => {
    localStorage.setItem("serverIP", serverIP);
  }, [serverIP]);


  useEffect(() => {
    const IsAuthenticated = localStorage.getItem("isAuthenticated");
    const nameUserLocalStorage = localStorage.getItem("username") || "";
    if (IsAuthenticated === "true") {
      login(nameUserLocalStorage);

    }
  }, [isAuthenticated,login])

  const clearArrays = () => {
    setFilterUsers([]);
    setFilteredProducts([]);

  }


  const handleLogout = async () => {
    try {
      await fetch(`${baseURL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      logout();
      router.push("/");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "No se pudo cerrar la sesión", "error");
    }
  };

  const confirmLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión se cerrará en este dispositivo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sesión cerrada",
          icon: "success",
          showConfirmButton: false,
          timer: 1300,
        }).then(() => {
          handleLogout()
          localStorage.setItem("isAuthenticated", "false");
        });
      }
    });
  };

  return (
    <>

      <nav className="bg-gray-600 text-white py-4 px-6 shadow-md sticky top-0 z-50">

        <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold"><FontAwesomeIcon icon={faComputer} className="mr-4" />MiApp</Link>
            <div className="flex-shrink-0 flex items-center gap-2">
              <label htmlFor="serverIP" className="text-sm font-medium whitespace-nowrap">
                IP del servidor
              </label>
              <input id="serverIP" type="text" value={serverIP} onChange={(e) => setServerIP(e.target.value)} className="bg-gray-700 border border-gray-500 rounded px-2 py-1 w-40 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"/>
            </div>
          


          <ul className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <li>
                  <button onClick={clearArrays} className="flex items-center gap-2 hover:text-gray-300">
                    <Link href="/usuarios" className="flex items-center gap-2 hover:text-gray-300">
                      <FontAwesomeIcon icon={faUsers} />
                      Usuarios
                    </Link>
                  </button>
                </li>
                <li>
                  <button onClick={clearArrays} className="flex items-center gap-2 hover:text-gray-300">
                    <Link href="/productos" className="flex items-center gap-2 hover:text-gray-300">
                      <FontAwesomeIcon icon={faBox} />
                      Productos
                    </Link>
                  </button>
                </li>
                <li>
                  <button onClick={handleOpenModalProduct} className="flex items-center gap-2 hover:text-gray-300">
                    <FontAwesomeIcon icon={faBoxOpen} />
                    Agregar Producto
                  </button>
                </li>
                <li>
                  <button
                    onClick={confirmLogout}
                    className="flex items-center gap-2 hover:text-gray-300"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    Cerrar sesión
                  </button>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <FontAwesomeIcon icon={faUser} />
                  {nameUser?.toUpperCase()}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/" className="flex items-center gap-2 hover:text-gray-300">
                    <FontAwesomeIcon icon={faSignInAlt} />
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <button onClick={handleOpenModalUser} className="flex items-center gap-2 hover:text-gray-300">
                    <FontAwesomeIcon icon={faUserPlus} />
                    Registrarse
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

      </nav>
    </>

  );
};

export default Navbar;
