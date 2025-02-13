import { FaX } from "react-icons/fa6";

const Badge = ({ text, onClick }) => {
  return (
    <div className='flex gap-4 px-2 py-2.5'>
      <div className='flex items-center gap-2 rounded-full border border-gray-300 py-1 pl-2 text-xs dark:border-gray-200/15 dark:text-white'>
        {text}
        <button onClick={onClick} className='cursor-pointer pr-2 pl-0'>
          <FaX size={8} />
        </button>
      </div>
    </div>
  );
};

export default Badge;
