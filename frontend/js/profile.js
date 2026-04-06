// ════════════════════════════════════════════════════════════════════════════════
// AUTH GUARD (Runs synchronously before DOM load)
// ════════════════════════════════════════════════════════════════════════════════

if (!localStorage.getItem('firstName')) {
    window.location.href = 'login.html';
}

// ════════════════════════════════════════════════════════════════════════════════
// MOCK DATA
// ════════════════════════════════════════════════════════════════════════════════

const centersData = [
    {
        id: 1,
        name: 'Delhi Center',
        location: 'New Delhi',
        address: 'Sector 12, Dwarka, New Delhi',
        enrolledDate: '2024-01-15',
        nextMeeting: '2026-04-12',
        meetingFreq: 'Every Saturday',
        members: 45,
        status: 'active'
    },
    {
        id: 2,
        name: 'Mumbai Center',
        location: 'Mumbai',
        address: 'Bandra, Mumbai',
        enrolledDate: '2024-02-20',
        nextMeeting: '2026-04-13',
        meetingFreq: 'Every Sunday',
        members: 52,
        status: 'active'
    },
    {
        id: 3,
        name: 'Bangalore Center',
        location: 'Bangalore',
        address: 'Whitefield, Bangalore',
        enrolledDate: '2024-03-10',
        nextMeeting: '2026-04-14',
        meetingFreq: 'Every Monday',
        members: 38,
        status: 'active'
    },
    {
        id: 4,
        name: 'Pune Center',
        location: 'Pune',
        address: 'Viman Nagar, Pune',
        enrolledDate: '2024-01-05',
        nextMeeting: '2026-04-15',
        meetingFreq: 'Every Tuesday',
        members: 42,
        status: 'active'
    },
    {
        id: 5,
        name: 'Hyderabad Center',
        location: 'Hyderabad',
        address: 'HITEC City, Hyderabad',
        enrolledDate: '2024-02-01',
        nextMeeting: '2026-04-16',
        meetingFreq: 'Every Wednesday',
        members: 35,
        status: 'active'
    },
    {
        id: 6,
        name: 'Kolkata Center',
        location: 'Kolkata',
        address: 'Salt Lake, Kolkata',
        enrolledDate: '2024-03-20',
        nextMeeting: '2026-04-17',
        meetingFreq: 'Every Thursday',
        members: 28,
        status: 'active'
    }
];

const shibirsData = [
    {
        id: 1,
        name: 'Durga Sapta Shati Shibir',
        dates: '2024-02-10 to 2024-02-12',
        location: 'Rishikesh',
        certificateId: 'DSS-2024-001',
        status: 'completed'
    },
    {
        id: 2,
        name: 'Pitru Rin Mukti Shibir',
        dates: '2024-03-15 to 2024-03-17',
        location: 'Varanasi',
        certificateId: 'PRM-2024-001',
        status: 'completed'
    },
    {
        id: 3,
        name: 'Shree Vidya Advanced',
        dates: '2024-04-01 to 2024-04-05',
        location: 'Bangalore',
        certificateId: 'SV-2024-001',
        status: 'completed'
    },
    {
        id: 4,
        name: 'Navagraha Puja Intensive',
        dates: '2024-05-10 to 2024-05-12',
        location: 'Delhi',
        certificateId: 'NG-2024-001',
        status: 'completed'
    },
    {
        id: 5,
        name: 'Ganesh Vidya Workshop',
        dates: '2024-06-01 to 2024-06-03',
        location: 'Mumbai',
        certificateId: 'GV-2024-001',
        status: 'completed'
    },
    {
        id: 6,
        name: 'Vedic Mathematics Masterclass',
        dates: '2024-07-15 to 2024-07-20',
        location: 'Pune',
        certificateId: 'VM-2024-001',
        status: 'completed'
    },
    {
        id: 7,
        name: 'Mantra Chanting Retreat',
        dates: '2024-08-10 to 2024-08-14',
        location: 'Rishikesh',
        certificateId: 'MC-2024-001',
        status: 'completed'
    }
];

const naadiUserProfile = {
    birthDate: '1995-07-15',
    birthTime: '14:30',
    birthPlace: 'Delhi',
    nakshatra: 'Ashlesha',
    nakshatra_symbol: '♌',
    rashi: 'Cancer',
    rashi_symbol: '♋',
    zodiacSign: 'Pushya Nakshatra',
    gotra: 'Kashyapa'
};

const naadiConsultations = [
    {
        id: 1,
        type: 'Nadi Reading',
        date: '2024-06-15',
        consultant: 'Acharya Rajesh',
        duration: '60 mins',
        certificateId: 'NR-2024-001',
        materials: true
    },
    {
        id: 2,
        type: 'Life Path Consultation',
        date: '2024-07-20',
        consultant: 'Acharya Meera',
        duration: '90 mins',
        certificateId: 'LPC-2024-001',
        materials: true
    },
    {
        id: 3,
        type: 'Remedies Assessment',
        date: '2024-08-10',
        consultant: 'Acharya Vikram',
        duration: '60 mins',
        certificateId: 'RA-2024-001',
        materials: true
    }
];

const naadiUpcomingConsultations = [
    {
        id: 1,
        type: 'Yearly Forecast',
        date: '2026-04-20',
        time: '10:00 AM',
        consultant: 'Acharya Rajesh',
        duration: '60 mins',
        link: '#'
    },
    {
        id: 2,
        type: 'Remedial Mantras',
        date: '2026-05-15',
        time: '2:00 PM',
        consultant: 'Acharya Meera',
        duration: '90 mins',
        link: '#'
    }
];

// ════════════════════════════════════════════════════════════════════════════════
// SECTION SWITCHING
// ════════════════════════════════════════════════════════════════════════════════

window.showSection = function(name, event) {
    if (event) {
        event.preventDefault();
    }

    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected section
    const sectionId = name + '-section';
    const sectionEl = document.getElementById(sectionId);
    if (sectionEl) {
        sectionEl.classList.add('active');
    }

    // Add active class to clicked nav item
    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        // If called without event, find and activate the button
        const buttons = document.querySelectorAll('.nav-item');
        buttons.forEach(btn => {
            if (btn.onclick && btn.onclick.toString().includes(`'${name}'`)) {
                btn.classList.add('active');
            }
        });
    }

    // Close mobile drawer if open
    const drawer = document.getElementById('profile-drawer');
    if (drawer) {
        drawer.classList.remove('active');
    }

    const overlay = document.getElementById('profile-drawer-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
};

window.showSectionMobile = function(name) {
    window.showSection(name);
};

window.toggleProfileDrawer = function() {
    const drawer = document.getElementById('profile-drawer');
    const overlay = document.getElementById('profile-drawer-overlay');

    if (drawer && overlay) {
        drawer.classList.toggle('active');
        overlay.classList.toggle('active');
    }
};

// ════════════════════════════════════════════════════════════════════════════════
// MODAL UTILITIES
// ════════════════════════════════════════════════════════════════════════════════

window.openModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('active');
    }
};

window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
    }
};

window.openConfirmModal = function(title, msg, cb) {
    window.confirmCallback = cb;
    const modal = document.getElementById('confirmModal');
    if (modal) {
        const titleEl = modal.querySelector('.confirm-title');
        const msgEl = modal.querySelector('.confirm-message');
        if (titleEl) titleEl.textContent = title;
        if (msgEl) msgEl.textContent = msg;
        modal.classList.add('active');
    }
};

window.confirmAction = function() {
    window.closeModal('confirmModal');
    if (window.confirmCallback && typeof window.confirmCallback === 'function') {
        window.confirmCallback();
    }
};

// ════════════════════════════════════════════════════════════════════════════════
// RENDER FUNCTIONS (Stubs for Phase 1+)
// ════════════════════════════════════════════════════════════════════════════════

function renderCenters(centers) {
    // Populated in Phase 2
}

window.filterCenters = function() {
    // Populated in Phase 2
};

window.resetFilters = function() {
    // Populated in Phase 2
};

window.loadMoreCenters = function() {
    // Populated in Phase 2
};

function renderShibirs(shibirs) {
    // Populated in Phase 3
}

function renderNaadiBirthProfile(profile) {
    // Populated in Phase 3
}

function renderNaadiConsultations(consultations) {
    // Populated in Phase 3
}

function renderNaadiUpcomingConsultations(consultations) {
    // Populated in Phase 3
}

function renderVolunteeringProfile(data) {
    // Populated in Phase 5
}

// ════════════════════════════════════════════════════════════════════════════════
// ACTION HANDLERS (Stubs for Phases 1-5)
// ════════════════════════════════════════════════════════════════════════════════

window.openEditProfileModal = function() {
    // Populated in Phase 4
    window.openModal('editProfileModal');
};

window.saveProfile = function() {
    // Populated in Phase 4
};

window.joinCenter = function(id) {
    // Populated in Phase 2
};

window.leaveCenter = function() {
    // Populated in Phase 2
};

window.openAadhaarVerification = function() {
    // Populated in Phase 4
    window.openModal('aadhaarVerificationModal');
};

window.verifyAadhaarOTP = function() {
    // Populated in Phase 4
};

window.copyReferralLink = function() {
    // Populated in Phase 1
};

window.handleLogout = function() {
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    window.location.href = '../index.html';
};

// ════════════════════════════════════════════════════════════════════════════════
// PROFILE SECTION LOADER
// ════════════════════════════════════════════════════════════════════════════════

const PROFILE_ROOT = window.ROOT_PATH || '';
const SECTIONS = [
    { id: 'personal-section',        file: 'profile/personal.html' },
    { id: 'settings-section',        file: 'profile/settings.html' },
    { id: 'sadhak-section',          file: 'profile/sadhak.html' },
    { id: 'enrolled-center-section', file: 'profile/enrolled-center.html' },
    { id: 'browse-centers-section',  file: 'profile/browse-centers.html' },
    { id: 'shibir-history-section',  file: 'profile/shibir-history.html' },
    { id: 'volunteering-section',    file: 'profile/volunteering.html' },
    { id: 'naadi-jyotish-section',   file: 'profile/naadi-jyotish.html' }
];

async function loadProfileSections() {
    try {
        await Promise.all(SECTIONS.map(async ({ id, file }) => {
            try {
                const res = await fetch(PROFILE_ROOT + 'components/' + file);
                const html = await res.text();
                const sectionEl = document.getElementById(id);
                if (sectionEl) {
                    sectionEl.innerHTML = html;
                }
            } catch (err) {
                console.warn(`Failed to load section ${file}:`, err);
            }
        }));
        initProfilePage();
    } catch (err) {
        console.error('Error loading profile sections:', err);
    }
}

function initProfilePage() {
    renderCenters(centersData);
    renderShibirs(shibirsData);
    renderNaadiBirthProfile(naadiUserProfile);
    renderNaadiConsultations(naadiConsultations);
    renderNaadiUpcomingConsultations(naadiUpcomingConsultations);
    setupCharacterCounters();
}

function setupCharacterCounters() {
    // Populated in Phase 5
}

// ════════════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ════════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    loadProfileSections();

    // Initialize mobile drawer close on overlay click
    const overlay = document.getElementById('profile-drawer-overlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            document.getElementById('profile-drawer').classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Set first section as active
    const firstNavItem = document.querySelector('.nav-item');
    if (firstNavItem) {
        firstNavItem.classList.add('active');
    }
});
