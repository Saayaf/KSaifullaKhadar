document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your public key
    emailjs.init("30sQlJCSg7idT291J");

    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Collect form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate form fields
        if (!name || !email || !message) {
            alert('Please fill in all fields before sending.');
            return;
        }

        // Disable submit button to prevent multiple submissions
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // EmailJS template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message
        };

        // Send email using EmailJS
        emailjs.send('service_1rfdaut', 'template_79aheo4', templateParams)
            .then((response) => {
                // Success message
                console.log('Full EmailJS Response:', JSON.stringify(response, null, 2));
                alert('Message sent successfully! I will get back to you soon.');
                contactForm.reset(); // Clear the form
            }, (error) => {
                // Detailed error logging
                console.error('Full EmailJS Error Object:', JSON.stringify(error, null, 2));
                console.error('Error Status:', error.status);
                console.error('Error Text:', error.text);
                
                // More informative error alert
                alert(`Failed to send message. 
Possible reasons:
- Check your internet connection
- Verify EmailJS configuration
- Contact website administrator

Detailed Error: ${error.text || 'Unknown error'}`);
            })
            .finally(() => {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});