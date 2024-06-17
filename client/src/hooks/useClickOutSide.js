import { useEffect, useRef } from "react";

const useClickOutside = (handlers, refsArray) => {
  useEffect(() => {
    const listeners = refsArray.map((ref) => {
      return (event) => {
        // Check if the ref's.current property is defined and if the event target exists
        if (
          ref.current &&
          event.target &&
          !ref.current.contains(event.target)
        ) {
          handlers.forEach((handler) => handler());
        }
      };
    });

    const eventListener = (...args) =>
      listeners.some((listener) => listener(...args));

    document.addEventListener("mousedown", eventListener);

    return () => {
      document.removeEventListener("mousedown", eventListener);
    };
  }, [handlers, refsArray]);
};

export default useClickOutside;
