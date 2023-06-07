import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка страницы вверх при изменении маршрута
  }, [pathname]);

  return null;
};

export default ScrollToTop;