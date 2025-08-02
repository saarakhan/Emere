import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import bcrypt from "bcryptjs";
//create a context
const UserContext = createContext();

//use context
export const useUser = () => useContext(UserContext);

// provide context

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem("loginData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const addUser = async newUser => {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const userWithMeta = {
      ...newUser,
      password: hashedPassword,
      createdAt: new Date().toLocaleDateString(),
    };
    setUser(userWithMeta);
    localStorage.setItem("loginData", JSON.stringify(userWithMeta));
    toast.success("Account Created successfully! Now Login");
  };

  const verifyUser = async (email, password) => {
    const storedUser = localStorage.getItem("loginData");
    if (storedUser) {
      const storedUserData = JSON.parse(storedUser);
      if (storedUserData.email === email) {
        const isPasswordCorrect = await bcrypt.compare(password, storedUserData.password);
        if (isPasswordCorrect) {
          const fakeToken = Math.random().toString(36).substring(2);
          const loggedInUser = { ...storedUserData, token: fakeToken };
          setUser(loggedInUser);
          localStorage.setItem("loginData", JSON.stringify(loggedInUser));
          toast.success("Logged in successfully!");
          return true;
        } else {
          toast.error("Incorrect password");
          return false;
        }
      } else {
        toast.error("Wrong credentials");
        return false;
      }
    } else {
      toast.error("No account found, please register first!");
      return false;
    }
  };

  const isAuthenticated = user?.token ? true : false;

  const logoutUser = () => {
    const storedUser = localStorage.getItem("loginData");
    if (storedUser) {
      const storedUserData = JSON.parse(storedUser);
      const { token, ...rest } = storedUserData;
      localStorage.setItem("loginData", JSON.stringify(rest));
    }
    setUser(null);
    toast.error("Bye! We will miss you, you logged out!");
  };

  return <UserContext.Provider value={{ user, addUser, verifyUser, logoutUser, isAuthenticated, loading }}>{children}</UserContext.Provider>;
};
