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
        state: 'delhi',
        address: 'Sector 12, Dwarka, New Delhi',
        meetingDay: 'Saturday',
        languages: ['en', 'hi'],
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
        state: 'maharashtra',
        address: 'Bandra, Mumbai',
        meetingDay: 'Sunday',
        languages: ['en', 'mr', 'hi'],
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
        state: 'karnataka',
        address: 'Whitefield, Bangalore',
        meetingDay: 'Monday',
        languages: ['en', 'hi'],
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
        state: 'maharashtra',
        address: 'Viman Nagar, Pune',
        meetingDay: 'Tuesday',
        languages: ['en', 'mr'],
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
        state: 'telangana',
        address: 'HITEC City, Hyderabad',
        meetingDay: 'Wednesday',
        languages: ['en', 'hi'],
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
        state: 'west-bengal',
        address: 'Salt Lake, Kolkata',
        meetingDay: 'Thursday',
        languages: ['en', 'hi'],
        enrolledDate: '2024-03-20',
        nextMeeting: '2026-04-17',
        meetingFreq: 'Every Thursday',
        members: 28,
        status: 'active'
    },
    {
        id: 7,
        name: 'Chennai Center',
        location: 'Chennai',
        state: 'tamil-nadu',
        address: 'T. Nagar, Chennai',
        meetingDay: 'Friday',
        languages: ['en'],
        enrolledDate: '2024-02-15',
        nextMeeting: '2026-04-18',
        meetingFreq: 'Every Friday',
        members: 32,
        status: 'active'
    },
    {
        id: 8,
        name: 'Ahmedabad Center',
        location: 'Ahmedabad',
        state: 'gujarat',
        address: 'Paldi, Ahmedabad',
        meetingDay: 'Saturday',
        languages: ['en', 'hi'],
        enrolledDate: '2024-01-20',
        nextMeeting: '2026-04-19',
        meetingFreq: 'Every Saturday',
        members: 26,
        status: 'active'
    },
    {
        id: 9,
        name: 'Jaipur Center',
        location: 'Jaipur',
        state: 'rajasthan',
        address: 'C-Scheme, Jaipur',
        meetingDay: 'Sunday',
        languages: ['en', 'hi'],
        enrolledDate: '2024-04-01',
        nextMeeting: '2026-04-20',
        meetingFreq: 'Every Sunday',
        members: 31,
        status: 'active'
    },
    {
        id: 10,
        name: 'Lucknow Center',
        location: 'Lucknow',
        state: 'uttar-pradesh',
        address: 'Gomti Nagar, Lucknow',
        meetingDay: 'Monday',
        languages: ['en', 'hi'],
        enrolledDate: '2024-03-15',
        nextMeeting: '2026-04-21',
        meetingFreq: 'Every Monday',
        members: 24,
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

// Track loaded center count for "Load More"
window.centerLoadCount = 6;

function renderCenters(centers) {
    const grid = document.getElementById('centersGrid');
    if (!grid) return;

    // Apply filters
    const searchTerm = document.getElementById('centerSearch')?.value?.toLowerCase() || '';
    const locationFilter = document.getElementById('locationFilter')?.value || '';
    const languageFilter = document.getElementById('languageFilter')?.value || '';
    const dayFilter = document.getElementById('dayFilter')?.value || '';

    // Filter centers based on criteria
    let filtered = centers.filter(center => {
        const matchSearch = !searchTerm ||
            center.name.toLowerCase().includes(searchTerm) ||
            center.location.toLowerCase().includes(searchTerm);

        // Match by state field for location filter
        const matchLocation = !locationFilter || center.state === locationFilter;
        const matchLanguage = !languageFilter || (center.languages && center.languages.includes(languageFilter));
        const matchDay = !dayFilter || (
            (dayFilter === 'weekday' && ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(center.meetingDay)) ||
            (dayFilter === 'weekend' && ['Saturday', 'Sunday'].includes(center.meetingDay))
        );

        return matchSearch && matchLocation && matchLanguage && matchDay;
    });

    // Limit to loaded count
    const displayed = filtered.slice(0, window.centerLoadCount);

    // Clear grid
    grid.innerHTML = '';

    if (displayed.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem;">
                <p style="color: var(--text-secondary); font-size: 0.95rem;">No centers found matching your filters.</p>
            </div>
        `;
        return;
    }

    // Render center cards
    displayed.forEach(center => {
        const card = document.createElement('div');
        card.className = 'center-card';
        card.innerHTML = `
            <div class="center-card-header">
                <div class="center-card-name">
                    <h3>${center.name}</h3>
                    <p>${center.location}</p>
                </div>
                <span class="center-badge">${center.status || 'Active'}</span>
            </div>

            <div class="center-card-info">
                <div class="center-card-info-item">
                    <svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>${center.meetingFreq}</span>
                </div>
                <div class="center-card-info-item">
                    <svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>${center.members} members</span>
                </div>
            </div>

            <div class="center-card-actions">
                <button class="btn-join" onclick="joinCenter('${center.id}')">Join</button>
                <button class="btn-details" onclick="viewCenterDetails('${center.id}')">Details</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

window.filterCenters = function() {
    renderCenters(centersData);
};

window.resetFilters = function() {
    document.getElementById('centerSearch').value = '';
    document.getElementById('locationFilter').value = '';
    document.getElementById('languageFilter').value = '';
    document.getElementById('dayFilter').value = '';
    window.centerLoadCount = 6;
    renderCenters(centersData);
};

window.loadMoreCenters = function() {
    window.centerLoadCount += 4;
    renderCenters(centersData);
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

window.viewCenterDetails = function(id) {
    alert(`View details for center ${id} (Mockup - backend will show full details)`);
};

window.openDirections = function() {
    alert('Opening directions in Google Maps... (Mockup - backend will open actual directions)');
};

window.joinCenter = function(id) {
    const center = centersData.find(c => c.id == id);
    if (center) {
        window.openConfirmModal(
            'Join Center',
            `Are you sure you want to join ${center.name}?`,
            function() {
                alert(`You have successfully joined ${center.name}!`);
                // In real app, this would call backend API
            }
        );
    }
};

window.leaveCenter = function() {
    window.openConfirmModal(
        'Leave Center',
        'Are you sure you want to leave this center? You can rejoin later.',
        function() {
            alert('You have left the center. You can rejoin anytime.');
            // In real app, this would call backend API
        }
    );
};

window.openAadhaarVerification = function() {
    // Populated in Phase 4
    window.openModal('aadhaarVerificationModal');
};

window.verifyAadhaarOTP = function() {
    // Populated in Phase 4
};

window.copyReferralLink = function() {
    const referralInput = document.getElementById('referralLink');
    if (referralInput) {
        referralInput.select();
        document.execCommand('copy');

        // Visual feedback
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }
};

window.downloadQRCode = function() {
    // Stub for Phase 1
    alert('QR Code download functionality coming soon');
};

window.printMembershipCard = function() {
    // Stub for Phase 1
    window.print();
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
