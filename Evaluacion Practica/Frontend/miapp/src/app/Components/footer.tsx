import React from "react";

const Footer = () => {
    return(
        <footer className="bg-gray-600 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy;{new Date().getFullYear()} My App. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}
export default Footer;