import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    message: "",
    isError: false,
    show: false,
  });
  const timerRef = useRef(null);

  const showToast = useCallback((message, isError = false) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setToast({ message, isError, show: true });
    timerRef.current = setTimeout(() => {
      setToast((current) => ({ ...current, show: false }));
    }, 2500);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        className={`toast${toast.show ? " show" : ""}${toast.isError ? " error" : ""}`}
      >
        {toast.message}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
