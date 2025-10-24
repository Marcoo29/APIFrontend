import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Subir al inicio"
          className={`
            fixed bottom-6 right-6 z-50
            w-11 h-11 flex items-center justify-center
            border border-[#B91C1C]
            text-[#B91C1C]
            bg-transparent
            rounded-sm shadow-sm
            transition-all duration-300
            hover:bg-[#B91C1C] hover:text-white hover:scale-105
          `}
        >
          <span className="material-symbols-outlined text-2xl">
            arrow_upward
          </span>
        </button>
      )}
    </>
  );
}
