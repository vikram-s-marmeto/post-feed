import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import { FaHeart } from "react-icons/fa";

const PostCard = ({ post, onHashtagClick }) => {
  const { likedPosts, toggleLike } = useContext(PostContext);

  const formatContent = (content) => {
    return content.split(/(\s+)/).map((word, index) => {
      if (word.startsWith("#")) {
        return (
          <span
            key={index}
            aria-label={word.substring(1)}
            tabIndex='0'
            role='button'
            className='cursor-pointer text-blue-500'
            onClick={() => onHashtagClick(word.substring(1))}>
            {word}
          </span>
        );
      }
      return word;
    });
  };

  return (
    <div className='mx-auto mb-4 w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-200/20 dark:bg-black'>
      <div className='mb-2 flex items-center'>
        <img
          src={post.profilePic}
          alt={post.username}
          className='mr-3 h-10 w-10 rounded-full object-contain'
        />
        <div>
          <p className='font-semibold text-gray-900 dark:text-white'>{post.name}</p>
          <p className='text-sm text-gray-500'>
            @{post.username} · {post.timestamp}
          </p>
        </div>
      </div>

      <p className='text-gray-900 dark:text-gray-300'>{formatContent(post.content)}</p>

      {post.image && (
        <img
          src={post.image}
          alt='Post'
          className='mt-2 max-h-[516px] w-full max-w-[516px] rounded-lg object-cover'
        />
      )}

      <div className='mt-3 flex items-center'>
        <button onClick={() => toggleLike(post.id)} className='flex items-center'>
          <FaHeart
            className={`text-xl transition ${likedPosts[post.id] ? "text-red-500" : "text-gray-400"}`}
          />
          <span className='ml-2 text-gray-700 dark:text-gray-300'>
            {likedPosts[post.id] ? post.reactions?.likes + 1 : post.reactions?.likes}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
