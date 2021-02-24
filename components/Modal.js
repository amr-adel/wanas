import { useStore } from "../hooks/useStore";

export default function Modal({ children }) {
  const showModal = useStore((state) => state.modal);
  const hideModal = useStore((state) => state.hideModal);

  if (!showModal) return null;

  const handleHide = (e) => {
    if (e.target.id === "backdrop") hideModal();
  };

  return (
    <div
      id="backdrop"
      onClick={handleHide}
      className="fixed h-inner w-screen p-4 bg-gray-900 bg-opacity-80 z-50 flex justify-center items-center"
    >
      <div className="p-4 w-full max-w-xl bg-gray-50 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
}
