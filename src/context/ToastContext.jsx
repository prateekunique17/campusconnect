export function showToast(message, isError) {
  const toast = document.querySelector(".toast");

  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.toggle("error", Boolean(isError));
  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 2500);
}

export function ToastProvider({ children }) {
  return (
    <>
      {children}
      <div className="toast"></div>
    </>
  );
}
