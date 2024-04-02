import { useEffect } from "react";

export const useFitMobileBrowserHeight = () => {
  useEffect(() => {
    const documentHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
    };

    window.addEventListener("resize", documentHeight);

    documentHeight();

    return () => {
      window.removeEventListener("resize", documentHeight);
    };
  }, []);

  return null;
};
