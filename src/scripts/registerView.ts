document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form") as HTMLFormElement;
  const fullNameInput = document.getElementById("fullName") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const confirmPasswordInput = document.getElementById(
    "confirmPassword",
  ) as HTMLInputElement;

  const submitButton = form.querySelector(
    "button[type='submit']",
  ) as HTMLButtonElement;

  // Regular expression for validating email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Initially disable the submit button
  submitButton.disabled = true;

  const checkFormValidity = (): void => {
    const isFullNameValid = validateFullName(
      fullNameInput,
      fullNameInput.nextElementSibling as HTMLElement,
    );
    const isEmailValid = validateEmail(
      emailInput,
      emailInput.nextElementSibling as HTMLElement,
    );
    const isPasswordValid = validatePassword(
      passwordInput,
      passwordInput.nextElementSibling as HTMLElement,
    );
    const isConfirmPasswordValid = validateConfirmPassword(
      confirmPasswordInput,
      confirmPasswordInput.nextElementSibling as HTMLElement,
      passwordInput,
    );

    // Enable the submit button only if all validations pass
    submitButton.disabled = !(
      isFullNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    );
  };

  // Event Handlers
  const handleInput = () => {
    checkFormValidity();
  };

  // Attach event listeners for real-time validation
  fullNameInput.addEventListener("input", handleInput);
  emailInput.addEventListener("input", handleInput);
  passwordInput.addEventListener("input", handleInput);
  confirmPasswordInput.addEventListener("input", handleInput);

  // Prevent form submission if validations fail
  form.addEventListener("submit", (event) => {
    const isFormValid =
      validateFullName(
        fullNameInput,
        fullNameInput.nextElementSibling as HTMLElement,
      ) &&
      validateEmail(emailInput, emailInput.nextElementSibling as HTMLElement) &&
      validatePassword(
        passwordInput,
        passwordInput.nextElementSibling as HTMLElement,
      ) &&
      validateConfirmPassword(
        confirmPasswordInput,
        confirmPasswordInput.nextElementSibling as HTMLElement,
        passwordInput,
      );

    if (!isFormValid) {
      event.preventDefault();
      checkFormValidity();

      // Focus the first invalid input
      if (
        !validateFullName(
          fullNameInput,
          fullNameInput.nextElementSibling as HTMLElement,
        )
      ) {
        fullNameInput.focus();
      } else if (
        !validateEmail(emailInput, emailInput.nextElementSibling as HTMLElement)
      ) {
        emailInput.focus();
      } else if (
        !validatePassword(
          passwordInput,
          passwordInput.nextElementSibling as HTMLElement,
        )
      ) {
        passwordInput.focus();
      } else {
        confirmPasswordInput.focus();
      }
    }
  });
});

function showError(
  input: HTMLInputElement,
  errorElement: HTMLElement,
  message: string,
) {
  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
  input.classList.add("input-error");
}

function hideError(input: HTMLInputElement, errorElement: HTMLElement) {
  errorElement.textContent = "";
  errorElement.classList.add("hidden");
  input.classList.remove("input-error");
}

// Validation Functions
function validateInput(
  input: HTMLInputElement,
  errorElement: HTMLElement,
  validator: () => boolean,
  errorMessage: string,
): boolean {
  if (input.value.trim().length === 0) {
    hideError(input, errorElement);
    return false;
  } else if (!validator()) {
    showError(input, errorElement, errorMessage);
    return false;
  } else {
    hideError(input, errorElement);
    return true;
  }
}

function validateFullName(
  fullNameInput: HTMLInputElement,
  fullNameError: HTMLElement,
): boolean {
  return validateInput(
    fullNameInput,
    fullNameError,
    () => fullNameInput.value.trim().length >= 3,
    "Name must be at least 3 characters.",
  );
}

function validateEmail(
  emailInput: HTMLInputElement,
  emailError: HTMLElement,
): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return validateInput(
    emailInput,
    emailError,
    () => emailRegex.test(emailInput.value.trim()),
    "Please enter a valid email address.",
  );
}

function validatePassword(
  passwordInput: HTMLInputElement,
  passwordError: HTMLElement,
): boolean {
  return validateInput(
    passwordInput,
    passwordError,
    () => passwordInput.value.length >= 8,
    "Password must be at least 8 characters.",
  );
}

function validateConfirmPassword(
  confirmPasswordInput: HTMLInputElement,
  confirmPasswordError: HTMLElement,
  passwordInput: HTMLInputElement,
): boolean {
  return validateInput(
    confirmPasswordInput,
    confirmPasswordError,
    () => passwordInput.value === confirmPasswordInput.value,
    "Passwords do not match.",
  );
}
