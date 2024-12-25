document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const confirmPasswordInput = document.getElementById(
    "confirmPassword",
  ) as HTMLInputElement;
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-message");

  const checkPasswordsMatch = () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      errorMessage.textContent = "Passwords do not match.";
      confirmPasswordInput.parentElement?.appendChild(errorMessage);
    } else {
      errorMessage.textContent = "";
    }
  };

  passwordInput.addEventListener("input", checkPasswordsMatch);
  confirmPasswordInput.addEventListener("input", checkPasswordsMatch);

  form?.addEventListener("submit", (event) => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      event.preventDefault();
      errorMessage.textContent = "Passwords do not match.";
      confirmPasswordInput.parentElement?.appendChild(errorMessage);
    } else {
      errorMessage.textContent = "";
    }
  });
});
