// Signup/Login form validation logic

// Select the specific form by its ID
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signupForm'); // Get the specific form

    // Add event listener for form submission
    form.addEventListener('submit', function (event) {
        // Add 'was-validated' class before checking form validity to trigger styles
        form.classList.add('was-validated');

        // Check validity of the form before submission
        if (!form.checkValidity()) {
            event.preventDefault(); // Prevent form submission if invalid
            event.stopPropagation(); // Stop the propagation of the event
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signupForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phoneNumber');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');


    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            validateField(input);
        });
    });

    //  validation logic
    function validateField(input) {
        if (input.id === 'username') {
            // Username should be at least 5 characters
            if (input.value.length >= 5) {
                markValid(input);
            } else {
                markInvalid(input);
            }
        } else if (input.id === 'email') {
            // Email must contain '@'
            if (input.value.indexOf('@') !== -1) {
                markValid(input);
            } else {
                markInvalid(input);
            }
        } else if (input.id === 'phoneNumber') {
            // Phone number must be 10 digits 
            const phoneValue = input.value;
            if (phoneValue.length === 10 && phoneValue !== '123456789') {
                let isValidPhone = true;
                // Check if each character is a digit
                for (let i = 0; i < phoneValue.length; i++) {
                    if (isNaN(phoneValue[i])) {
                        isValidPhone = false;
                        break;
                    }
                }
                if (isValidPhone) {
                    markValid(input);
                } else {
                    markInvalid(input);
                }
            } else {
                markInvalid(input);
            }
        } else if (input.id === 'password') {
            const usernameValue = usernameInput.value.toLowerCase();
            const passwordValue = input.value.toLowerCase();
            let hasLetter = false, hasNumber = false, hasSpecialChar = false;

            // Check if password is at least 8 characters and contains letters, numbers, and special symbols
            if (passwordValue.length >= 8 && passwordValue !== 'password' && passwordValue !== usernameValue) {
                for (let i = 0; i < passwordValue.length; i++) {
                    const char = passwordValue[i];
                    // Check if the character is a letter (upper or lower case)
                    if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
                        hasLetter = true;
                    }
                    // Check if the character is a number
                    else if (char >= '0' && char <= '9') {
                        hasNumber = true;
                    }
                    // Check if the character is a special symbol
                    else if (char < 'a' || (char > 'z' && char < 'A') || (char > 'Z' && char < '0') || char > '9') {
                        hasSpecialChar = true;
                    }
                }

                // Ensure password contains at least one letter, one number, and one special character
                if (hasLetter && hasNumber && hasSpecialChar) {
                    markValid(input);
                } else {
                    markInvalid(input);
                }
            } else {
                markInvalid(input);
            }
        } else if (input.id === 'confirmPassword') {
            // Confirm password should match the entered password
            if (input.value === passwordInput.value && passwordInput.value !== '') {
                input.setCustomValidity(''); // Clear custom validity
                markValid(input);
            } else {
                input.setCustomValidity('Passwords do not match');
                markInvalid(input);
            }
        }
        else if (input.type === 'file') {
            // Check if a file has been selected
            if (input.files.length > 0) {
                markValid(input);
            } else {
                markInvalid(input);
            }
        }
    }

    function markValid(input) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
    }

    function markInvalid(input) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    }

    // Handle form submission
    form.addEventListener('submit', function (event) {
        let isValid = true;
        inputs.forEach(input => {
            validateField(input);
            if (!input.classList.contains('is-valid')) {
                isValid = false;
            }
        });

        if (!isValid || !form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add('was-validated');
    });
});




// Contact us validation logic
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea, select');

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('input', () => validateField(input));
    });

    // Custom validation function
    function validateField(input) {
        if (input.type === 'email') {
            // Email validation: must include "@" symbol
            if (input.value.includes('@')) {
                markValid(input);
            } else {
                markInvalid(input);
            }
        } else if (input.type === 'text' || input.tagName === 'TEXTAREA') {
            // Text fields must not be empty
            if (input.value.trim() !== '') {
                markValid(input);
            } else {
                markInvalid(input);
            }
        } else if (input.tagName === 'SELECT') {
            // Dropdown must have a selected value
            if (input.value !== '') {
                markValid(input);
            } else {
                markInvalid(input);
            }
        }
    }

    function markValid(input) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
    }

    function markInvalid(input) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    }

    // Prevent form submission if fields are invalid
    form.addEventListener('submit', function (event) {
        let isFormValid = true;

        inputs.forEach(input => {
            validateField(input); // Validate all inputs
            if (!input.classList.contains('is-valid')) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            event.preventDefault(); // Stop form submission
            event.stopPropagation();
        }

        form.classList.add('was-validated');
    });
});
