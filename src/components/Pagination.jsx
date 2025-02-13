import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const POSTS_PER_PAGE = 5;

const Pagination = ({ totalPosts }) => {
  const { currentPage, goToPage } = useContext(PostContext);
  const navigate = useNavigate();

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  if (totalPages <= 1) return null;
  const handlePageChange = (page) => {
    goToPage(page);
    navigate(page === 1 ? "/" : `/page/${page}`);
  };

  return (
    <div className='mt-6 flex justify-center space-x-2'>
      {/* Previous Button */}
      <button
        className='cursor-pointer rounded border border-gray-400 px-4 py-1 text-gray-800 disabled:cursor-not-allowed disabled:opacity-40 hover:disabled:bg-none dark:border-gray-200/20 dark:text-gray-200 dark:hover:border-gray-200/40'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        <FaChevronLeft />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`cursor-pointer rounded border px-4 py-2 ${
            currentPage === page
              ? "bg-black text-white dark:border-blue-500/60 dark:bg-blue-500/30 dark:text-white dark:hover:border-blue-500/90"
              : "border-gray-400 text-gray-800 dark:border-gray-200/20 dark:text-gray-100 dark:hover:border-gray-200/40"
          }`}
          onClick={() => handlePageChange(page)}>
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className='cursor-pointer rounded border border-gray-400 px-4 py-1 text-gray-800 disabled:cursor-not-allowed disabled:opacity-40 hover:disabled:bg-none dark:border-gray-200/20 dark:text-gray-200 dark:hover:border-gray-200/40'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
