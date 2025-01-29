import { useEffect, RefObject } from "react";

function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: () => void,
  exceptionRef?: RefObject<HTMLElement>
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the ref AND the exception ref (button)
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        (!exceptionRef || !exceptionRef.current?.contains(event.target as Node))
      ) {
        callback(); // Trigger the callback when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, exceptionRef]);
}

export default useClickOutside;
