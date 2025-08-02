import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const PaymentSuccessModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full relative animate-fade-in-up">
        <div className="text-green-500 text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-4">Thank you for your purchase 🎉</p>
        <button
          onClick={() => {
            onClose();
            navigate("/");
          }}
          className="mt-2 bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900 cursor-pointer">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
