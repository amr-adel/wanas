import { useEffect } from "react";

export default function FullHeight() {
  useEffect(() => {
    const updateVh = () => {
      let vh = window.innerHeight;
      document.documentElement.style.setProperty("--inner-height", `${vh}px`);
    };

    updateVh();

    window.addEventListener("resize", updateVh);

    return () => {
      window.removeEventListener("resize", updateVh);
    };
  }, []);

  return null;
}
