// Simple Toast notification trigger function for beginner-friendly alerts
export function showToast(message, isError = false) {
  const toast = document.querySelector(".toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.toggle("error", Boolean(isError));
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Toast provider component to mount the toast container on screen
export function ToastProvider({ children }) {
  return (
    <>
      {children}
      <div className="toast" aria-live="polite"></div>
    </>
  );
}
