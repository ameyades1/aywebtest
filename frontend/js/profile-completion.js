// ════════════════════════════════════════════════════════════════════════════════
// AUTH GUARD
// ════════════════════════════════════════════════════════════════════════════════

// Guard: redirect if user didn't come from signup flow
if (!localStorage.getItem('signupEmail') && !localStorage.getItem('signupPhone')) {
    window.location.href = 'signup.html';
}

// ════════════════════════════════════════════════════════════════════════════════
// FORM INITIALIZATION
// ════════════════════════════════════════════════════════════════════════════════

let selectedLanguage = null;
let signupMethod = localStorage.getItem('signupMethod') || 'email'; // 'email' or 'phone'

document.addEventListener('DOMContentLoaded', function() {
    // Pre-fill name from signup
    const fullName = localStorage.getItem('signupFullName');
    if (fullName) {
        const nameParts = fullName.trim().split(/\s+/);
        if (nameParts.length === 1) {
            document.getElementById('firstName').value = nameParts[0];
        } else if (nameParts.length === 2) {
            document.getElementById('firstName').value = nameParts[0];
            document.getElementById('lastName').value = nameParts[1];
        } else {
            document.getElementById('firstName').value = nameParts[0];
            document.getElementById('middleName').value = nameParts.slice(1, -1).join(' ');
            document.getElementById('lastName').value = nameParts[nameParts.length - 1];
        }
    }

    // Determine which secondary contact field to show
    if (signupMethod === 'email') {
        // User signed up with email, needs to verify phone
        document.getElementById('secondaryContactSection').classList.remove('hidden');
        document.getElementById('phoneFieldContainer').classList.remove('hidden');
    } else {
        // User signed up with phone, needs to verify email
        document.getElementById('secondaryContactSection').classList.remove('hidden');
        document.getElementById('emailFieldContainer').classList.remove('hidden');
    }

    // Setup form submission
    document.getElementById('profileForm').addEventListener('submit', handleProfileSubmit);

    // Setup OTP form submission
    document.getElementById('secondaryOtpForm').addEventListener('submit', handleSecondaryOtpSubmit);

    // Setup OTP input behavior
    const otpInputs = document.querySelectorAll('.secondary-otp-input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value) {
                e.target.classList.add('filled');
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            } else {
                e.target.classList.remove('filled');
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

    // Setup back button
    document.getElementById('backToProfileBtn').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('secondaryOtpScreen').classList.add('hidden');
        document.getElementById('profileForm').classList.remove('hidden');
    });
});

// ════════════════════════════════════════════════════════════════════════════════
// FORM VALIDATION
// ════════════════════════════════════════════════════════════════════════════════

window.validateForm = function() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const city = document.getElementById('city').value.trim();
    const country = document.getElementById('country').value;
    const referralSource = document.getElementById('referralSource').value;
    const language = selectedLanguage;

    let isValid = true;

    // Validate First Name
    if (firstName.length < 2) {
        document.getElementById('firstName-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('firstName-error').classList.add('hidden');
    }

    // Validate Last Name
    if (lastName.length < 2) {
        document.getElementById('lastName-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('lastName-error').classList.add('hidden');
    }

    // Validate City
    if (city.length < 2) {
        document.getElementById('city-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('city-error').classList.add('hidden');
    }

    // Validate Country
    if (!country) {
        document.getElementById('country-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('country-error').classList.add('hidden');
    }

    // Validate Language
    if (!language) {
        document.getElementById('language-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('language-error').classList.add('hidden');
    }

    // Validate Referral Source
    if (!referralSource) {
        document.getElementById('referralSource-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('referralSource-error').classList.add('hidden');
    }

    // Validate Referral Person if required
    const referralPersonField = document.getElementById('referralPerson-field');
    if (!referralPersonField.classList.contains('hidden')) {
        const referralPerson = document.getElementById('referralPerson').value.trim();
        if (!referralPerson) {
            document.getElementById('referralPerson-error').classList.remove('hidden');
            isValid = false;
        } else {
            document.getElementById('referralPerson-error').classList.add('hidden');
        }
    }

    // Validate secondary contact if required
    if (!document.getElementById('secondaryContactSection').classList.contains('hidden')) {
        if (!validateSecondaryContact()) {
            isValid = false;
        }
    }

    // Update submit button
    const submitBtn = document.getElementById('submit-btn');
    if (isValid) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
        submitBtn.classList.add('bg-[#B87333]', 'text-white', 'hover:bg-[#5C3010]');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
        submitBtn.classList.remove('bg-[#B87333]', 'text-white', 'hover:bg-[#5C3010]');
    }

    return isValid;
};

window.validateSecondaryContact = function() {
    const emailField = document.getElementById('emailFieldContainer');
    const phoneField = document.getElementById('phoneFieldContainer');
    let isValid = true;

    if (!emailField.classList.contains('hidden')) {
        const email = document.getElementById('secondaryEmail').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            document.getElementById('secondaryEmail-error').classList.remove('hidden');
            isValid = false;
        } else {
            document.getElementById('secondaryEmail-error').classList.add('hidden');
        }
    }

    if (!phoneField.classList.contains('hidden')) {
        const phone = document.getElementById('secondaryPhone').value.trim();

        if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            document.getElementById('secondaryPhone-error').classList.remove('hidden');
            isValid = false;
        } else {
            document.getElementById('secondaryPhone-error').classList.add('hidden');
        }
    }

    return isValid;
};

// ════════════════════════════════════════════════════════════════════════════════
// FORM HANDLERS
// ════════════════════════════════════════════════════════════════════════════════

window.selectLanguage = function(language) {
    selectedLanguage = language;

    // Update UI
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    document.querySelector(`[data-language="${language}"]`).classList.add('selected');

    validateForm();
};

window.toggleReferralField = function() {
    const referralSource = document.getElementById('referralSource').value;
    const referralPersonField = document.getElementById('referralPerson-field');

    if (referralSource === 'existing-member' || referralSource === 'friend-family') {
        referralPersonField.classList.remove('hidden');
    } else {
        referralPersonField.classList.add('hidden');
        document.getElementById('referralPerson').value = '';
        document.getElementById('referralPerson-error').classList.add('hidden');
    }
};

window.toggleIndustryField = function() {
    const occupation = document.getElementById('occupation').value;
    const industryField = document.getElementById('industry-field');

    if (occupation === 'professional' || occupation === 'business') {
        industryField.classList.remove('hidden');
    } else {
        industryField.classList.add('hidden');
        document.getElementById('industry').value = '';
    }
};

window.handleProfileSubmit = function(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    // Check if secondary contact verification is needed
    const secondaryContactSection = document.getElementById('secondaryContactSection');
    if (!secondaryContactSection.classList.contains('hidden')) {
        // Show OTP screen
        showSecondaryOtpScreen();
    } else {
        // No secondary contact needed, save profile and complete signup
        saveProfileData();
        completeSignup();
    }
};

function showSecondaryOtpScreen() {
    const emailField = document.getElementById('emailFieldContainer');
    const phoneField = document.getElementById('phoneFieldContainer');

    document.getElementById('profileForm').classList.add('hidden');
    document.getElementById('secondaryOtpScreen').classList.remove('hidden');

    if (!emailField.classList.contains('hidden')) {
        // Showing OTP for email verification
        const email = document.getElementById('secondaryEmail').value;
        const maskedEmail = email.substring(0, 1) + '****@' + email.substring(email.indexOf('@') + 1);
        document.getElementById('secondaryOtpLabel').textContent = 'Email';
        document.getElementById('secondaryMaskedIdentifier').textContent = maskedEmail;
        document.getElementById('resendSecondaryOtpBtn').disabled = true;
        startResendTimer();
    } else {
        // Showing OTP for phone verification
        const phone = document.getElementById('secondaryPhone').value;
        const maskedPhone = '****' + phone.substring(6);
        document.getElementById('secondaryOtpLabel').textContent = 'Phone';
        document.getElementById('secondaryMaskedIdentifier').textContent = maskedPhone;
        document.getElementById('resendSecondaryOtpBtn').disabled = true;
        startResendTimer();
    }
}

window.handleSecondaryOtpSubmit = function(e) {
    e.preventDefault();

    const otpInputs = document.querySelectorAll('.secondary-otp-input');
    const otp = Array.from(otpInputs).map(input => input.value).join('');

    if (otp.length !== 6) {
        document.getElementById('secondaryOtp-error').textContent = 'Please enter a 6-digit code';
        document.getElementById('secondaryOtp-error').classList.remove('hidden');
        return;
    }

    // Mock OTP verification (123456)
    if (otp === '123456') {
        document.getElementById('secondaryOtp-error').classList.add('hidden');
        saveProfileData();
        completeSignup();
    } else {
        document.getElementById('secondaryOtp-error').textContent = 'Invalid OTP. Please try again.';
        document.getElementById('secondaryOtp-error').classList.remove('hidden');

        // Shake animation on error
        otpInputs.forEach(input => {
            input.classList.add('error');
            setTimeout(() => {
                input.classList.remove('error');
                input.value = '';
                input.classList.remove('filled');
            }, 400);
        });

        otpInputs[0].focus();
    }
};

function startResendTimer() {
    let seconds = 60;
    const btn = document.getElementById('resendSecondaryOtpBtn');
    const timer = document.getElementById('secondaryOtpTimer');

    const interval = setInterval(() => {
        seconds--;
        timer.textContent = seconds;

        if (seconds === 0) {
            clearInterval(interval);
            btn.disabled = false;
        }
    }, 1000);
}

window.handleResendSecondaryOTP = function() {
    // Clear OTP inputs
    document.querySelectorAll('.secondary-otp-input').forEach(input => {
        input.value = '';
        input.classList.remove('filled', 'error');
    });

    document.getElementById('secondaryOtp-error').classList.add('hidden');
    document.getElementById('resendSecondaryOtpBtn').disabled = true;
    startResendTimer();

    // In production, would send OTP again
    alert('OTP resent successfully!');
};

// ════════════════════════════════════════════════════════════════════════════════
// PROFILE SAVE & COMPLETION
// ════════════════════════════════════════════════════════════════════════════════

function saveProfileData() {
    const profileData = {
        firstName: document.getElementById('firstName').value,
        middleName: document.getElementById('middleName').value,
        lastName: document.getElementById('lastName').value,
        country: document.getElementById('country').value,
        city: document.getElementById('city').value,
        language: selectedLanguage,
        referralSource: document.getElementById('referralSource').value,
        referralPerson: document.getElementById('referralPerson').value || '',
        occupation: document.getElementById('occupation').value || '',
        industry: document.getElementById('industry').value || '',
    };

    if (!document.getElementById('emailFieldContainer').classList.contains('hidden')) {
        profileData.email = document.getElementById('secondaryEmail').value;
    }

    if (!document.getElementById('phoneFieldContainer').classList.contains('hidden')) {
        const phoneCode = document.getElementById('secondaryPhoneCode').value;
        const phone = document.getElementById('secondaryPhone').value;
        profileData.phone = phoneCode + phone;
    }

    // Save to localStorage
    localStorage.setItem('profileData', JSON.stringify(profileData));
    localStorage.setItem('firstName', profileData.firstName);
    localStorage.setItem('userEmail', profileData.email || localStorage.getItem('signupEmail'));
    localStorage.setItem('userId', 'user_' + Date.now());

    // Clear signup data
    localStorage.removeItem('signupEmail');
    localStorage.removeItem('signupPhone');
    localStorage.removeItem('signupMethod');
}

function completeSignup() {
    // Show success message
    alert('Profile completed successfully! Welcome to AntarYog Foundation.');

    // Redirect to home or dashboard
    window.location.href = 'index.html';
}

// Initialize validation on form load
window.addEventListener('load', validateForm);
