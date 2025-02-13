import { createContext, useContext, useEffect, useState, useRef } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(() => {
    return JSON.parse(localStorage.getItem("likedPosts")) || {};
  });
  const [selectedHashtag, setSelectedHashtag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/mockData.json");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  const toggleLike = (postId) => {
    setLikedPosts((prevLikes) => {
      const updatedLikes = { ...prevLikes };
      if (updatedLikes[postId]) {
        delete updatedLikes[postId];
      } else {
        updatedLikes[postId] = true;
      }
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  const selectHashtag = (hashtag) => {
    setSelectedHashtag(hashtag);
    setCurrentPage(1);
  };

  const clearHashtag = () => {
    setSelectedHashtag(null);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        likedPosts,
        selectedHashtag,
        currentPage,
        toggleLike,
        selectHashtag,
        clearHashtag,
        goToPage,
        postsLoading: loading
      }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
