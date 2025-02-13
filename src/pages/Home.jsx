import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePostContext } from "../context/PostContext";
import { ThemeToggle } from "../context/ThemeContext";
import { PostCard, Pagination, Searchbar, ScrollToTop } from "../components";

const POSTS_PER_PAGE = 5;

const Home = () => {
  const { posts, selectedHashtag, currentPage, goToPage, selectHashtag, clearHashtag } =
    usePostContext();

  const { hashtag, pageNumber, searchQuery } = useParams();
  const navigate = useNavigate();

  // Update selected hashtag and page based on URL
  useEffect(() => {
    if (hashtag) {
      selectHashtag(hashtag);
    } else {
      clearHashtag();
    }

    if (pageNumber) {
      goToPage(Number(pageNumber));
    } else {
      goToPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashtag, pageNumber, searchQuery]);

  // Filter posts based on selected hashtag
  const filteredPosts = (() => {
    if (selectedHashtag) {
      return posts.filter((post) => post.content.includes(`#${selectedHashtag}`));
    }

    if (searchQuery) {
      return posts.filter((post) => post.content.includes(searchQuery));
    }
    return posts;
  })();

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleHashtagClick = (tag) => {
    navigate(`/tag/${tag}`);
  };

  return (
    <div className='mt-1 flex flex-col px-4 pt-1 pb-1 md:p-4'>
      <div className='sticky top-0 mx-auto flex w-full max-w-[548px] justify-between border-b border-b-gray-200 bg-white pt-2 dark:border-b-gray-200/10 dark:bg-black'>
        <Searchbar />

        <ThemeToggle className='ml-4 cursor-pointer' />
      </div>
      <ScrollToTop />
      <div className='mx-auto flex w-full max-w-[548px] flex-col'>
        {paginatedPosts.map((post) => (
          <PostCard key={post.id} post={post} onHashtagClick={handleHashtagClick} />
        ))}
        {paginatedPosts?.length === 0 && (
          <p className='mt-20 text-center text-3xl dark:text-white'>No posts found</p>
        )}
      </div>
      <Pagination totalPosts={filteredPosts.length} />
    </div>
  );
};

export default Home;
