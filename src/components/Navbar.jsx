import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch, CiUser, CiShoppingCart, CiMenuFries } from "react-icons/ci";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <nav className="p-4">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-playfair italic cursor-pointer" onClick={() => navigate("/")}>
            Emere
          </h2>
          <p className="text-lg font-playfair italic mt-1">A French Inspired Boutique.</p>
        </div>

        <div className="flex justify-end items-center mb-4 md:mb-6">
          <div className="hidden md:flex text-2xl gap-5 cursor-pointer">
            <CiSearch className="hover:text-gray-400 transition" />
            <CiUser className="hover:text-gray-400 transition" onClick={() => navigate("/user")} />
            <CiShoppingCart className="hover:text-gray-400 transition" onClick={() => navigate("/cart")} />
          </div>

          <div className="md:hidden text-3xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            <CiMenuFries />
          </div>
        </div>

        {menuOpen && (
          <div className="flex flex-row items-center text-2xl gap-5 mt-2 md:hidden">
            <CiSearch className="hover:text-gray-400 transition" />
            <CiUser className="hover:text-gray-400 transition" onClick={() => navigate("/user")} />
            <CiShoppingCart className="hover:text-gray-400 transition" onClick={() => navigate("/cart")} />
          </div>
        )}

        <ul className={`font-playfair flex-col md:flex md:flex-row justify-center gap-6 text-lg italic mt-4 ${menuOpen ? "flex" : "hidden"} md:flex`}>
          <li className="hover:text-gray-400 transition cursor-pointer">Summer Sale</li>
          <li className="hover:text-gray-400 transition cursor-pointer">Dresses</li>
          <li className="hover:text-gray-400 transition cursor-pointer">Apparel</li>
          <li className="hover:text-gray-400 transition cursor-pointer">Accessories</li>
          <li className="hover:text-gray-400 transition cursor-pointer">Sundrie</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
