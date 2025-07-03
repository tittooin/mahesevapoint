
// MahesevaPoint JavaScript Functions

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Rent Agreement Calculator
function calculateRent() {
    // Get form values
    const propertyArea = document.getElementById('propertyArea').value.trim();
    const licensePeriod = parseInt(document.getElementById('licensePeriod').value) || 0;
    const monthlyRent = parseInt(document.getElementById('monthlyRent').value) || 0;
    const deposit = parseInt(document.getElementById('deposit').value) || 0;

    // Validation
    if (!propertyArea || licensePeriod <= 0 || monthlyRent <= 0) {
        alert('Please fill in all required fields with valid values.');
        return;
    }

    // Fixed charges
    const govtRegFee = 1000;
    const dhcFee = 300;
    const serviceFee = 599;

    // Calculate stamp duty (0.25% of total rent)
    const totalRent = monthlyRent * licensePeriod;
    const stampDuty = Math.round(totalRent * 0.0025);

    // Calculate add-ons
    let addonsTotal = 0;
    const addonCheckboxes = document.querySelectorAll('.addon-checkbox:checked');
    addonCheckboxes.forEach(checkbox => {
        addonsTotal += parseInt(checkbox.getAttribute('data-price'));
    });

    // Calculate total
    const totalAmount = govtRegFee + dhcFee + serviceFee + stampDuty + addonsTotal;

    // Update display
    document.getElementById('stampDuty').textContent = `₹${stampDuty.toLocaleString()}`;
    document.getElementById('addonsTotal').textContent = `₹${addonsTotal.toLocaleString()}`;
    document.getElementById('totalAmount').textContent = `₹${totalAmount.toLocaleString()}`;

    // Show results with animation
    const resultsDiv = document.getElementById('calculationResults');
    resultsDiv.style.display = 'block';
    resultsDiv.classList.add('fade-in');
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Log calculation for debugging
    console.log('Rent calculation:', {
        propertyArea,
        licensePeriod,
        monthlyRent,
        deposit,
        stampDuty,
        addonsTotal,
        totalAmount
    });
}

// Service Modal Functions
function showServiceModal(serviceName, requiredDocs) {
    // Set modal title
    document.getElementById('serviceModalTitle').textContent = serviceName;

    // Populate required documents
    const docsList = document.getElementById('requiredDocuments');
    docsList.innerHTML = '';
    
    requiredDocs.forEach(doc => {
        const li = document.createElement('li');
        li.textContent = doc;
        docsList.appendChild(li);
    });

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('serviceModal'));
    modal.show();

    // Log service request
    console.log('Service modal opened for:', serviceName);
}

// Form Submission Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Contact form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmission(this);
        });
    }

    // Service contact form handler
    const serviceContactForm = document.getElementById('serviceContactForm');
    if (serviceContactForm) {
        serviceContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleServiceRequest(this);
        });
    }

    // Add loading animation to calculation button
    const rentForm = document.getElementById('rentForm');
    if (rentForm) {
        const inputs = rentForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                // Hide results if inputs change
                const results = document.getElementById('calculationResults');
                if (results.style.display === 'block') {
                    results.style.display = 'none';
                }
            });
        });
    }

    // Initialize tooltips if needed
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Contact form submission
function handleContactSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Show success message
        showNotification('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
        
        // Reset form
        form.reset();

        // Log submission
        console.log('Contact form submitted successfully');
    }, 1500);
}

// Service request submission
function handleServiceRequest(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const serviceName = document.getElementById('serviceModalTitle').textContent;
    
    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Show success message
        showNotification(`Your request for ${serviceName} has been submitted successfully. Our team will contact you shortly.`, 'success');
        
        // Reset form and close modal
        form.reset();
        bootstrap.Modal.getInstance(document.getElementById('serviceModal')).hide();

        // Log submission
        console.log('Service request submitted for:', serviceName);
    }, 1500);
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Add animation to service cards when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });
});

// Format currency inputs
function formatCurrency(input) {
    let value = input.value.replace(/[^\d]/g, '');
    if (value) {
        input.value = parseInt(value).toLocaleString();
    }
}

// Add currency formatting to rent and deposit inputs
document.addEventListener('DOMContentLoaded', function() {
    const currencyInputs = ['monthlyRent', 'deposit'];
    currencyInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('blur', function() {
                formatCurrency(this);
            });
            
            input.addEventListener('focus', function() {
                this.value = this.value.replace(/[^\d]/g, '');
            });
        }
    });
});

// Mobile menu enhancement
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
});

// Error handling for forms
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Add phone number validation
function validatePhoneNumber(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// Initialize the application
console.log('MahesevaPoint application initialized successfully!');
