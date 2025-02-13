import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const previousHistoryIdx = useRef(0);

  useEffect(() => {
    if (history?.state?.idx > previousHistoryIdx.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    previousHistoryIdx.current = history?.state?.idx;
  }, [pathname]);
  return <></>;
};

export default ScrollToTop;
