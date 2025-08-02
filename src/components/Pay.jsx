import { useState, useEffect } from "react";
import BreadCrumb from "./BreadCrumb";
import { useCart } from "../context/CartContext";
import PaymentSuccessModal from "./PaymentSuccessModal";
const Pay = () => {
  const [status, setStatus] = useState("pending");
  const [showSuccess, setShowSuccess] = useState(false);
  const { clearCart } = useCart();
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("success");
      setShowSuccess(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => {
    setShowSuccess(false);
    clearCart();
  };
  return (
    <div className="mt-10 flex flex-col items-center justify-center p-6">
      <BreadCrumb />
      <h1 className="text-2xl font-semibold mb-4">Scan to Pay with PhonePe</h1>

      <div className="border p-4 rounded-lg bg-white shadow mb-6">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=phonepeuser@upi&pn=PhonePe%20Test" loading="lazy" alt="QR Code" className="w-48 h-48" />
      </div>

      {status === "pending" && <p className="text-yellow-600 font-medium animate-pulse">Waiting for payment...</p>}

      {showSuccess && <PaymentSuccessModal onClose={handleCloseModal} />}
    </div>
  );
};
export default Pay;
