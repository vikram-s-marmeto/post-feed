import { createContext, useContext, useEffect, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [selectedHashtag, setSelectedHashtag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/mockData.json");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedPosts")) || {};
    setLikedPosts(storedLikes);
  }, []);

  useEffect(() => {
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
        searchQuery,
        setSearchQuery
      }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
