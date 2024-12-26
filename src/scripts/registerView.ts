import {UserQueryResult} from "../services/userService";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form") as HTMLFormElement;
    const nameInput = document.getElementById("name") as HTMLInputElement;
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

    let isNameValid: boolean = false;
    let isEmailValid: boolean = false;
    let isPasswordValid: boolean = false;
    let isConfirmPasswordValid: boolean = false;

    document.addEventListener("input", () => {
        isNameValid = validateName(
            nameInput,
            nameInput.nextElementSibling as HTMLElement,
        );
        isPasswordValid = validatePassword(
            passwordInput,
            passwordInput.nextElementSibling as HTMLElement,
        );
        isEmailValid = validateEmail(
            emailInput,
            emailInput.nextElementSibling as HTMLElement,
        );
        isConfirmPasswordValid = validateConfirmPassword(
            confirmPasswordInput,
            confirmPasswordInput.nextElementSibling as HTMLElement,
            passwordInput,
        );
        submitButton.disabled = !(isConfirmPasswordValid &&
            isPasswordValid &&
            isEmailValid &&
            isNameValid);
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("Submit button clicked");

        const formData = new FormData(form);
        const formDataObject: { [key: string]: string } = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value.toString();
        });
        console.log("Form data:", formDataObject);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({formDataObject}),
            });

            console.log("Response status:", response.status);

            const result: UserQueryResult = await response.json();

            if (!result.success) {
                showError(nameInput, nameInput.nextElementSibling as HTMLElement, result.message);
                return;
            }

            console.log("Form submitted successfully");
            window.location.href = "/login"; // Redirect to login page after successful registration
        } catch (error) {
            console.error("Form submission error:", error);
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

function validateName(
    nameInput: HTMLInputElement,
    nameError: HTMLElement,
): boolean {
    return validateInput(
        nameInput,
        nameError,
        () => nameInput.value.trim().length >= 3,
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
