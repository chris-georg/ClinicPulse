import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.substring(1);

    const scroll = () => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return true;
      }

      return false;
    };

    // Try immediately
    if (scroll()) return;

    // Retry until Landing has rendered
    let attempts = 0;

    const interval = setInterval(() => {
      attempts++;

      if (scroll() || attempts > 20) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [pathname, hash]);

  return null;
}