import {LoginUserResult, UserQueryResult} from "../services/userService";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form") as HTMLFormElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

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
                body: JSON.stringify(formDataObject),
            });

            console.log("Response status:", response.status);

            const result: UserQueryResult = await response.json();

            if (!result.success) {
                showError(passwordInput, passwordInput.nextElementSibling as HTMLElement, result.message);
                return;
            }

            console.log("Form submitted successfully");
            window.location.href = "/"; // Redirect to login page after successful registration
        } catch (error) {
            console.error("Form submission error:", error);
        }
    });
})
function showError(
    input: HTMLInputElement,
    errorElement: HTMLElement,
    message: string,
) {
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
    input.classList.add("input-error");
}