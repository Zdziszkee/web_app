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

  // Initially disable the submit button
  submitButton.disabled = true;

  var isNameValid: boolean = false;
  // Attach event listeners for real-time validation
  fullNameInput.addEventListener("input", () => {
    isNameValid = validateFullName(
      fullNameInput,
      fullNameInput.nextElementSibling as HTMLElement,
    );
  });

  var isEmailValid: boolean = false;
  emailInput.addEventListener("input", () => {
    isEmailValid = validateEmail(
      emailInput,
      emailInput.nextElementSibling as HTMLElement,
    );
  });

  var isPasswordValid: boolean = false;
  passwordInput.addEventListener("input", () => {
    isPasswordValid = validatePassword(
      passwordInput,
      passwordInput.nextElementSibling as HTMLElement,
    );
  });

  var isConfirmPasswordValid: boolean = false;
  confirmPasswordInput.addEventListener("input", () => {
    isConfirmPasswordValid = validateConfirmPassword(
      confirmPasswordInput,
      confirmPasswordInput.nextElementSibling as HTMLElement,
      passwordInput,
    );
  });

  document.addEventListener("input", () => {
    if (
      isConfirmPasswordValid &&
      isPasswordValid &&
      isEmailValid &&
      isNameValid
    ) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
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
    input.classList.remove("input-error");
    return false;
  } else if (!validator()) {
    showError(input, errorElement, errorMessage);
    return false;
  } else {
    hideError(input, errorElement);
    input.classList.remove("input-error");
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
