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
        startDate: '2024-02-10',
        endDate: '2024-02-12',
        location: 'Rishikesh',
        instructor: 'Acharya Upendra',
        certificateId: 'DSS-2024-001',
        status: 'completed'
    },
    {
        id: 2,
        name: 'Pitru Rin Mukti Shibir',
        startDate: '2024-03-15',
        endDate: '2024-03-17',
        location: 'Varanasi',
        instructor: 'Acharya Meera',
        certificateId: 'PRM-2024-001',
        status: 'completed'
    },
    {
        id: 3,
        name: 'Shree Vidya Advanced',
        startDate: '2024-04-01',
        endDate: '2024-04-05',
        location: 'Bangalore',
        instructor: 'Acharya Vikram',
        certificateId: 'SV-2024-001',
        status: 'completed'
    },
    {
        id: 4,
        name: 'Navagraha Puja Intensive',
        startDate: '2024-05-10',
        endDate: '2024-05-12',
        location: 'Delhi',
        instructor: 'Acharya Rajesh',
        certificateId: 'NG-2024-001',
        status: 'completed'
    },
    {
        id: 5,
        name: 'Ganesh Vidya Workshop',
        startDate: '2024-06-01',
        endDate: '2024-06-03',
        location: 'Mumbai',
        instructor: 'Acharya Priya',
        certificateId: 'GV-2024-001',
        status: 'completed'
    },
    {
        id: 6,
        name: 'Vedic Mathematics Masterclass',
        startDate: '2024-07-15',
        endDate: '2024-07-20',
        location: 'Pune',
        instructor: 'Acharya Sanjay',
        certificateId: 'VM-2024-001',
        status: 'completed'
    },
    {
        id: 7,
        name: 'Mantra Chanting Retreat',
        startDate: '2024-08-10',
        endDate: '2024-08-14',
        location: 'Rishikesh',
        instructor: 'Acharya Deepa',
        certificateId: 'MC-2024-001',
        status: 'completed'
    }
];

const naadiUserProfile = {
    fullName: 'Vivek Kumar',
    dateOfBirth: '1995-07-15',
    timeOfBirth: '14:30',
    placeOfBirth: 'Delhi',
    patrikaId: 'NAD-1995-07-15-001',
    nakshatra: 'Pushya',
    rashi: 'Cancer',
    zodiacSign: 'Pushya Nakshatra',
    gotra: 'Kashyapa'
};

const naadiConsultations = [
    {
        id: 1,
        consultationId: 'CONS-001',
        type: 'Nadi Reading',
        date: '2024-06-15',
        displayDate: 'June 15, 2024',
        location: 'Bangalore',
        guruji: 'Acharya Rajesh',
        duration: '60 mins',
        materials: ['patrika_reading.pdf', 'remedies_guide.pdf']
    },
    {
        id: 2,
        consultationId: 'CONS-002',
        type: 'Life Path Consultation',
        date: '2024-07-20',
        displayDate: 'July 20, 2024',
        location: 'Pune',
        guruji: 'Acharya Meera',
        duration: '90 mins',
        materials: ['life_path_analysis.pdf', 'career_guide.pdf', 'relationships_insights.pdf']
    },
    {
        id: 3,
        consultationId: 'CONS-003',
        type: 'Remedies Assessment',
        date: '2024-08-10',
        displayDate: 'August 10, 2024',
        location: 'Mumbai',
        guruji: 'Acharya Vikram',
        duration: '60 mins',
        materials: ['remedies_plan.pdf', 'mantra_guide.pdf']
    }
];

const naadiUpcomingConsultations = [
    {
        id: 1,
        consultationId: 'CONS-UPCOM-001',
        type: 'Yearly Forecast',
        date: '2026-04-20',
        displayDate: 'April 20, 2026 at 10:00 AM',
        time: '10:00 AM',
        location: 'Online',
        guruji: 'Acharya Rajesh',
        duration: '60 mins'
    },
    {
        id: 2,
        consultationId: 'CONS-UPCOM-002',
        type: 'Remedial Mantras',
        date: '2026-05-15',
        displayDate: 'May 15, 2026 at 2:00 PM',
        time: '2:00 PM',
        location: 'Rishikesh',
        guruji: 'Acharya Meera',
        duration: '90 mins'
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
    const container = document.getElementById('shibirHistoryContent');
    if (!container) return;

    if (!shibirs || shibirs.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg class="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <h3>No Shibir History Yet</h3>
                <p>You haven't attended any Shibir workshops yet. Explore upcoming programs to deepen your spiritual practice.</p>
                <div class="empty-state-actions">
                    <button class="btn-primary" onclick="alert('Shibir registration coming soon!')">Explore Shibirs</button>
                </div>
            </div>
        `;
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'centers-grid';

    shibirs.forEach(shibir => {
        const card = document.createElement('div');
        card.className = 'shibir-card';

        const startDate = new Date(shibir.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const endDate = new Date(shibir.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const durationDays = Math.ceil((new Date(shibir.endDate) - new Date(shibir.startDate)) / (1000 * 60 * 60 * 24)) + 1;

        card.innerHTML = `
            <div class="shibir-card-header">
                <div class="shibir-card-title">
                    <h3>${shibir.name}</h3>
                    <p>${startDate} - ${endDate}</p>
                </div>
                <span class="shibir-badge">${durationDays} Day${durationDays > 1 ? 's' : ''}</span>
            </div>

            <div class="shibir-card-info">
                <div class="shibir-info-item">
                    <svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span><strong>${shibir.location}</strong></span>
                </div>
                <div class="shibir-info-item">
                    <svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span><span class="shibir-info-label">Instructor:</span> ${shibir.instructor}</span>
                </div>
            </div>

            <div class="shibir-certificate">
                <div>
                    <div class="certificate-label">Certificate ID</div>
                    <div class="certificate-id">${shibir.certificateId}</div>
                </div>
                <button class="btn-download-cert" onclick="downloadCertificate('${shibir.certificateId}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 0.875rem; height: 0.875rem;">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download
                </button>
            </div>
        `;
        grid.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(grid);
}

function renderNaadiBirthProfile(profile) {
    const gridContainer = document.getElementById('birthDetailsGrid');
    const rashiElement = document.getElementById('userRashi');
    const nakshatraElement = document.getElementById('userNakshatra');

    if (!profile) {
        gridContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1 / -1;">Birth profile not available</p>';
        return;
    }

    const birthDetails = [
        { label: 'Full Name', value: profile.fullName },
        { label: 'Date of Birth', value: new Date(profile.dateOfBirth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
        { label: 'Time of Birth', value: profile.timeOfBirth },
        { label: 'Place of Birth', value: profile.placeOfBirth }
    ];

    gridContainer.innerHTML = birthDetails.map(detail => `
        <div class="birth-detail-item">
            <div class="birth-detail-label">${detail.label}</div>
            <div class="birth-detail-value">${detail.value}</div>
        </div>
    `).join('');

    rashiElement.textContent = profile.rashi;
    nakshatraElement.textContent = profile.nakshatra;
}

function renderNaadiConsultations(consultations) {
    const container = document.getElementById('consultationsContent');

    if (!consultations || consultations.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg class="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3>No Consultation History Yet</h3>
                <p>You haven't had any Naadi Jyotish consultations yet. Book your first reading to unlock insights from the ancient palm leaves.</p>
                <div class="empty-state-actions">
                    <button class="btn-primary" onclick="alert('Booking feature coming soon!')">Book Consultation</button>
                </div>
            </div>
        `;
        return;
    }

    const sortedConsultations = [...consultations].sort((a, b) => new Date(b.date) - new Date(a.date));
    const grid = document.createElement('div');
    grid.className = 'consultations-grid';

    sortedConsultations.forEach(consultation => {
        const card = document.createElement('div');
        card.className = 'consultation-card';

        card.innerHTML = `
            <div class="consultation-card-header">
                <div class="consultation-type">
                    <h3>${consultation.type}</h3>
                    <div class="consultation-date">${consultation.displayDate}</div>
                </div>
                <div class="consultation-badge">${consultation.location}</div>
            </div>
            <div class="consultation-info">
                <div class="consultation-info-item">
                    <svg class="consultation-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span class="consultation-info-label">Guruji:</span>
                    <span class="consultation-info-value">${consultation.guruji}</span>
                </div>
                <div class="consultation-info-item">
                    <svg class="consultation-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span class="consultation-info-label">Materials:</span>
                    <span class="consultation-info-value">${consultation.materials.length} files</span>
                </div>
            </div>
            <div class="consultation-actions">
                <button class="btn-download-materials" onclick="downloadConsultationMaterials('${consultation.consultationId}')">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Download Materials
                </button>
            </div>
        `;

        grid.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(grid);
}

function renderNaadiUpcomingConsultations(consultations) {
    const container = document.getElementById('upcomingConsultationsContent');
    if (!container) return;

    if (!consultations || consultations.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:2rem;color:var(--text-secondary);background:var(--section-alt);border-radius:0.5rem;">
                <p>No upcoming consultations scheduled.</p>
                <button class="btn-primary" style="margin-top:1rem;" onclick="alert('Booking feature coming soon!')">Book a Consultation</button>
            </div>`;
        return;
    }

    const sorted = [...consultations].sort((a, b) => new Date(a.date) - new Date(b.date));
    const grid = document.createElement('div');
    grid.className = 'consultations-grid';

    sorted.forEach(consultation => {
        const card = document.createElement('div');
        card.className = 'upcoming-consultation-card';

        card.innerHTML = `
            <div class="consultation-card-header">
                <div class="consultation-type">
                    <h3>${consultation.type}</h3>
                    <div class="consultation-date">${consultation.displayDate}</div>
                </div>
                <span class="upcoming-badge">Scheduled</span>
            </div>
            <div class="consultation-info">
                <div class="consultation-info-item">
                    <svg class="consultation-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span class="consultation-info-label">Guruji:</span>
                    <span class="consultation-info-value">${consultation.guruji}</span>
                </div>
                <div class="consultation-info-item">
                    <svg class="consultation-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span class="consultation-info-label">Location:</span>
                    <span class="consultation-info-value">${consultation.location}</span>
                </div>
            </div>
            <div class="consultation-actions">
                <button class="btn-join-session" onclick="alert('Joining consultation on ${consultation.date}...')">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.646 7.23a2 2 0 01-1.789 1.106H7a2 2 0 01-2-2v-8a2 2 0 012-2h2.25a1 1 0 00.894-.553l1.342-2.683a1 1 0 00.894-.553H10m-4 8h8"></path>
                    </svg>
                    Join Session
                </button>
                <button class="btn-cancel-reschedule" onclick="alert('Reschedule feature coming soon!')">Reschedule</button>
            </div>
        `;

        grid.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(grid);
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

window.downloadCertificate = function(certificateId) {
    alert(`Downloading certificate ${certificateId}...\n\nNote: This is a mockup. Backend will implement actual PDF download.`);
};

window.downloadPatrika = function() {
    const patrikaId = naadiUserProfile.patrikaId;
    alert(`Downloading your Patrika (ID: ${patrikaId})\n\nNote: This is a mockup. Backend will implement actual PDF generation and download.`);
};

window.downloadConsultationMaterials = function(consultationId) {
    alert(`Downloading materials for consultation: ${consultationId}\n\nNote: This is a mockup. Backend will implement actual ZIP file download with all materials.`);
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
