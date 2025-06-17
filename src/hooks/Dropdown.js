import { useEffect } from "react";

export default function Dropdown(refs, setters) {
  useEffect(() => {
    function handleClickOutside(event) {
      refs.forEach((ref, index) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setters[index](false);
        }
      });
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [refs, setters]);
}
