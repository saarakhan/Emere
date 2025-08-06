import React, { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLogOut,
  FiShoppingBag,
  FiSettings,
} from "react-icons/fi";
import CopyButton from "./CopyButton";
import { FaPlus } from "react-icons/fa6";
import { toast } from "sonner";

const navigationLinks = [
  { name: "Your Orders", icon: <FiShoppingBag /> },
  { name: "Your Account", icon: <FiUser /> },
  { name: "Update Account", icon: <FiSettings /> },
];

const UserPage = () => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatarUrl");
    if (savedAvatar) setUrl(savedAvatar);
  }, []);
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "Emere_Avatar");
    const API_URL = "https://api.cloudinary.com/v1_1/dke9wsm49/image/upload";
    try {
      const res = await fetch(API_URL, { method: "POST", body: formData });
      const data = await res.json();
      setUrl(data.secure_url);
      localStorage.setItem("avatarUrl", data.secure_url);
      toast.success("Avatar uploaded successfully!");
    } catch (error) {
      toast.error("Upload failed: " + error.message);
    }
  };

  const { user, logoutUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 text-neutral-400">
        <FiUser size={64} className="mb-4" />
        <p className="text-2xl font-medium">No user logged in.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-gray-800">
      <section className="flex max-w-4xl mx-auto border rounded-2xl shadow-lg overflow-hidden bg-white mt-12">
        {/* Sidebar */}
        <aside className="w-56 bg-neutral-100 py-8 px-4 border-r">
          <ul className="space-y-2">
            {navigationLinks.map((link, idx) => (
              <li
                key={idx}
                className="
                  flex items-center gap-3 px-3 py-2 font-medium rounded-lg
                  text-neutral-700 hover:bg-blue-100 hover:text-blue-600
                  transition cursor-pointer"
              >
                <span className="text-xl">{link.icon}</span>{link.name}
              </li>
            ))}
          </ul>
        </aside>
        {/* Main Content */}
        <section className="flex-1 p-10 flex flex-col gap-8">
          <div className="relative w-20 h-20 mb-3">
            {url ? (
              <img
                src={url}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-blue-200"
              />
            ) : (
              <div className="w-full h-full bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-4xl">
                <FiUser size={38} />
              </div>
            )}
            <label
              htmlFor="fileInput"
              className="
                absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow
                cursor-pointer hover:bg-blue-600 transition"
              title="Change Avatar"
            >
              <FaPlus size={12} />
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div>
            <div className="text-2xl font-bold">{user.name}</div>
            <span className="inline-block text-green-600 text-xs font-semibold mt-1">Active User</span>
          </div>

          <div className="mb-2 flex items-center gap-3">
            <FiMail className="text-blue-500" />
            <span className="font-medium">Email:</span>
            <span className="text-neutral-600">{user.email}</span>
          </div>
          <div className="mb-2 flex items-center gap-3">
            <span className="font-medium">Account Created:</span>
            <span className="text-neutral-600">{user.createdAt || "N/A"}</span>
          </div>

          <div>
            <div className="font-semibold mb-1 text-neutral-700">Account Token</div>
            <div className="flex items-center justify-between gap-2 bg-neutral-100 p-3 rounded-lg border text-xs flex-wrap">
              <span className="font-mono text-gray-600 break-all max-w-xs">{user.token || "No Token"}</span>
              <CopyButton textToCopy={user.token || ""} />
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-semibold shadow text-white hover:bg-red-600 active:bg-red-700 transition"
          >
            <FiLogOut className="text-lg" /> Logout
          </button>
        </section>
      </section>
    </main>
  );
};

export default UserPage;
  