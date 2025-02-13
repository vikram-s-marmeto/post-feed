import { createContext, useContext, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [light, setLight] = useState(false);

  function toggleTheme() {
    setLight((prev) => {
      const newTheme = !prev;
      localStorage.setItem("post-feed-color-scheme", newTheme);
      return newTheme;
    });
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem("post-feed-color-scheme");
    if (storedTheme !== null) {
      setLight(storedTheme === "true");
    } else {
      setLight(window.matchMedia("(prefers-color-scheme: light)").matches);
    }
  }, []);

  useEffect(() => {
    if (light) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  }, [light]);

  return (
    <ThemeContext.Provider
      value={{
        isLight: light,
        toggleTheme
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeToggle = (props) => {
  const { toggleTheme, isLight } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme} {...props}>
      {!isLight ? (
        <FaMoon className='size-4.5 text-gray-200 md:size-5' />
      ) : (
        <FaSun className='size-4.5 text-gray-800 md:size-5' />
      )}
    </button>
  );
};
