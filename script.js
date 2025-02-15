document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    emailjs.init("30sQlJCSg7idT291J");

    // Create status message container
    const createStatusMessage = () => {
        const statusDiv = document.createElement('div');
        statusDiv.id = 'contact-status';
        statusDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 30px;
            background-color: rgba(0,0,0,0.8);
            color: white;
            border-radius: 5px;
            z-index: 1000;
            text-align: center;
            display: none;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(statusDiv);
        return statusDiv;
    };

    const statusMessage = createStatusMessage();

    // Show status with auto-hide
    const showStatus = (message, isSuccess = true) => {
        statusMessage.textContent = message;
        statusMessage.style.backgroundColor = isSuccess 
            ? 'rgba(40, 167, 69, 0.9)' // Green for success
            : 'rgba(220, 53, 69, 0.9)'; // Red for error
        statusMessage.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 5000);
    };

    // Email validation function
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Get contact form elements
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    // Reset input styles
    const resetInputStyles = () => {
        [nameInput, emailInput, messageInput].forEach(input => {
            input.style.borderColor = '';
        });
    };

    // Form submission handler
    contactForm.addEventListener('submit', (e) => {
        // Prevent ALL default form submission behaviors
        e.preventDefault();
        e.stopPropagation();
        
        // Prevent potential form submission redirection
        if (e.returnValue) {
            e.returnValue = false;
        }
        
        resetInputStyles(); // Reset any previous error styles

        // Trim and collect input values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Validation checks
        let isValid = true;

        // Name validation
        if (!name) {
            nameInput.style.borderColor = 'red';
            isValid = false;
        }

        // Email validation
        if (!validateEmail(email)) {
            emailInput.style.borderColor = 'red';
            isValid = false;
        }

        // Message validation
        if (!message) {
            messageInput.style.borderColor = 'red';
            isValid = false;
        }

        // Stop if validation fails
        if (!isValid) {
            showStatus('Please fill in all fields correctly', false);
            return false;
        }

        // Disable submit button and show sending state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Prepare email parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message
        };

        // Send email using EmailJS
        emailjs.send('service_v0q61cf', 'template_79aheo4', templateParams)
            .then((response) => {
                // Success handling
                showStatus('Message sent successfully! I will get back to you soon.');
                contactForm.reset(); // Clear form
                console.log('Email sent successfully:', response);
            })
            .catch((error) => {
                // Error handling
                console.error('Email sending error:', error);
                showStatus('Failed to send message. Please try again later.', false);
            })
            .finally(() => {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });

        // Explicitly return false to prevent any navigation
        return false;
    }, { passive: false });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});