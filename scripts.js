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

// Enhanced Rent Agreement Calculator with real-time updates
function calculateRent() {
    console.log('calculateRent called');
    
    // Get form values
    const propertyArea = document.getElementById('propertyArea');
    const licensePeriod = document.getElementById('licensePeriod');
    const monthlyRent = document.getElementById('monthlyRent');
    const deposit = document.getElementById('deposit');
    
    console.log('Form elements found:', {
        propertyArea: !!propertyArea,
        licensePeriod: !!licensePeriod, 
        monthlyRent: !!monthlyRent,
        deposit: !!deposit
    });
    
    if (!propertyArea || !licensePeriod || !monthlyRent || !deposit) {
        console.log('Some form elements not found');
        return;
    }
    
    const propertyAreaValue = propertyArea.value;
    const licensePeriodValue = parseInt(licensePeriod.value) || 0;
    const monthlyRentValue = parseInt(monthlyRent.value.replace(/[^\d]/g, '')) || 0;
    const depositValue = parseInt(deposit.value.replace(/[^\d]/g, '')) || 0;
    
    console.log('Form values:', {
        propertyArea: propertyAreaValue,
        licensePeriod: licensePeriodValue,
        monthlyRent: monthlyRentValue,
        deposit: depositValue
    });

    // Validation - silently return if values are incomplete
    if (!propertyAreaValue || licensePeriodValue <= 0 || monthlyRentValue <= 0) {
        console.log('Validation failed - incomplete values');
        // Clear displays when invalid
        const stampDutyEl = document.getElementById('stampDutyDisplay');
        const totalAmountEl = document.getElementById('finalTotalAmount');
        if (stampDutyEl) stampDutyEl.textContent = '₹0';
        if (totalAmountEl) totalAmountEl.textContent = '0';
        return;
    }

    // Fixed charges
    const govtRegFee = 1000;
    const dhcFee = 300;
    const serviceFee = 599;

    // Calculate stamp duty (0.25% of total rent)
    const totalRent = monthlyRentValue * licensePeriodValue;
    const stampDuty = Math.round(totalRent * 0.0025);

    // Calculate add-ons
    let addonsTotal = 0;
    const addonCheckboxes = document.querySelectorAll('.addon-checkbox:checked');
    addonCheckboxes.forEach(checkbox => {
        addonsTotal += parseInt(checkbox.getAttribute('data-price')) || 0;
    });

    // Calculate total
    const totalAmount = govtRegFee + dhcFee + serviceFee + stampDuty + addonsTotal;

    // Update displays
    const stampDutyEl = document.getElementById('stampDutyDisplay');
    const totalAmountEl = document.getElementById('finalTotalAmount');
    
    if (stampDutyEl) stampDutyEl.textContent = `₹${stampDuty.toLocaleString()}`;
    if (totalAmountEl) totalAmountEl.textContent = totalAmount.toLocaleString();

    console.log('Calculation complete:', {
        totalRent,
        stampDuty,
        addonsTotal,
        totalAmount
    });
}

// Real-time calculation on input change
function setupRealTimeCalculation() {
    const inputs = ['licensePeriod', 'monthlyRent', 'deposit'];
    const checkboxes = document.querySelectorAll('.addon-checkbox');
    
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', calculateRent);
        }
    });
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateRent);
    });
}

// Service Modal Functions
function showServiceModal(serviceName, requiredDocs, description = null) {
    // Set modal title
    document.getElementById('serviceModalTitle').textContent = serviceName;

    // Clear previous content
    const docsList = document.getElementById('requiredDocuments');
    const modalBody = docsList.parentNode;
    
    // Remove any existing description
    const existingDescription = modalBody.querySelector('.alert-primary');
    if (existingDescription) {
        existingDescription.remove();
    }
    
    // Clear documents list
    docsList.innerHTML = '';
    
    requiredDocs.forEach(doc => {
        const li = document.createElement('li');
        li.textContent = doc;
        docsList.appendChild(li);
    });

    // Add description if provided
    if (description) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'alert alert-primary mb-3';
        descriptionDiv.innerHTML = `<i class="bi bi-info-circle me-2"></i><strong>Service Details:</strong> ${description}`;
        docsList.parentNode.insertBefore(descriptionDiv, docsList);
    }

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('serviceModal'));
    modal.show();

    // Log service request
    console.log('Service modal opened for:', serviceName);
}

// Form Submission Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Setup real-time calculation
    setupRealTimeCalculation();
    
    // Initial calculation
    calculateRent();

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

    // Prepare email data
    const emailData = {
        service: serviceName,
        name: formData.get('name') || form.querySelector('input[placeholder="Your Name"]').value,
        mobile: formData.get('mobile') || form.querySelector('input[placeholder="Mobile Number"]').value,
        message: formData.get('message') || form.querySelector('textarea').value,
        timestamp: new Date().toISOString()
    };

    // Simulate API call to send email to vwadekar753@gmail.com
    setTimeout(() => {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Show success message
        showNotification(`Your request for ${serviceName} has been submitted successfully. Our team will contact you shortly at ${emailData.mobile}.`, 'success');
        
        // Reset form and close modal
        form.reset();
        bootstrap.Modal.getInstance(document.getElementById('serviceModal')).hide();

        // Log submission (in real implementation, this would send email to vwadekar753@gmail.com)
        console.log('Service request submitted to vwadekar753@gmail.com:', emailData);
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
