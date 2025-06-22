import { SnackbarProps } from "@/app/types/types";

const Snackbar: React.FC<SnackbarProps> = ({ message, type }) => {
  const bgColor =
    type === 'success'
      ? 'bg-green-600'
      : type === 'info'
      ? 'bg-teal-500'
      : type === 'warning'
      ? 'bg-amber-500' 
      : 'bg-red-600'; 

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md text-white ${bgColor}`}
    >
      {message}
    </div>
  );
};

export default Snackbar;