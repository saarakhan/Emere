import React from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLogOut, FiCopy, FiShoppingBag, FiSettings } from "react-icons/fi";
import CopyButton from "./CopyButton";

const navigationLinks = [
  { name: "Your Orders", icon: <FiShoppingBag className="inline-block mr-2" /> },
  { name: "Your Account", icon: <FiUser className="inline-block mr-2" /> },
  { name: "Update Account", icon: <FiSettings className="inline-block mr-2" /> },
];

const UserPage = () => {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-500">
        <FiUser size={64} className="mb-4" />
        <p className="text-2xl font-medium">No user logged in.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <section className="flex max-w-6xl mx-auto">
        {/* Sidebar */}
        <aside className="w-60 border-r border-gray-200 bg-gray-50 py-8 px-6 min-h-[80vh]">
          <ul className="flex flex-col gap-2">
            {navigationLinks.map((link, idx) => (
              <li key={idx} className="flex items-center cursor-pointer select-none py-2 px-2 hover:bg-gray-200 transition">
                {link.icon}
                {link.name}
              </li>
            ))}
          </ul>
        </aside>
        {/* Main Content */}
        <section className="flex-1 py-12 px-12 bg-white">
          <header className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl">
              <FiUser size={32} />
            </div>
            <div>
              <div className="text-2xl font-bold">Welcome, {user.name}</div>
              <span className="inline-block text-green-600 text-xs font-semibold mt-1">Active User</span>
            </div>
          </header>

          <section className="mb-8">
            <div className="mb-2 flex items-center gap-3">
              <FiMail className="text-blue-500" />
              <span className="font-medium">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="mb-2 flex items-center gap-3">
              <span className="font-medium">Account Created:</span>
              <span>{user.createdAt || "N/A"}</span>
            </div>
          </section>

          <section className="mb-10">
            <div className="font-semibold mb-2">Account Token</div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-gray-50 p-3 rounded-xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500">Fake Token:</span>
                <pre className="bg-gray-100 px-2 py-1 text-xs font-mono text-gray-700 break-all max-w-xs sm:max-w-md">{user.token || "No Token"}</pre>
              </div>

              <CopyButton textToCopy={user.token} />
            </div>
          </section>

          <button onClick={handleLogout} className="mt-8 flex items-center gap-2 bg-red-600 text-white px-6 py-2 font-semibold hover:bg-red-700 transition cursor-pointer">
            <FiLogOut />
            Logout
          </button>
        </section>
      </section>
    </main>
  );
};

export default UserPage;
