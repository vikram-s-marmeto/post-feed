import { useEffect, useState } from "react";
import { usePostContext } from "../context/PostContext";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import Badge from "./Badge";
import { FaX } from "react-icons/fa6";

const Searchbar = ({ className, ...props }) => {
  const { selectedHashtag, clearHashtag } = usePostContext();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);

  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearch === "" || !debouncedSearch) {
      return navigate("/");
    }

    navigate(`/search/${debouncedSearch}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <div className={`w-full max-w-[548px] bg-white dark:bg-black ${className}`} {...props}>
      <div className='bg-gray my-4 flex w-full items-center rounded-full border border-gray-300 bg-white focus-within:border-gray-200/60 dark:border-gray-200/20 dark:bg-black'>
        {selectedHashtag && <Badge text={selectedHashtag} onClick={clearHashtag} />}
        {!selectedHashtag && (
          <>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value?.replaceAll("#", ""))}
              className='w-full rounded-full py-1.5 pl-4 focus:outline-0 md:py-2 dark:text-white'
              placeholder='react'
            />
            {debouncedSearch !== "" && debouncedSearch && (
              <button className='cursor-pointer px-4' onClick={() => setSearchQuery("")}>
                <FaX color='white' size={12} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
