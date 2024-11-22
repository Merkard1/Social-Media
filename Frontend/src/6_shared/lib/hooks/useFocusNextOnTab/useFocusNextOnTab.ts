import { useCallback, RefObject } from "react";

export const useFocusNextOnTab = (nextElementRef: RefObject<HTMLElement>, isDisabled = false) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Tab" && !isDisabled) {
        e.preventDefault();
        nextElementRef.current?.focus();
      }
    },
    [nextElementRef, isDisabled],
  );

  return handleKeyDown;
};
