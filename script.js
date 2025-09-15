// Page navigation functionality
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show the selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// Enhanced dashboard navigation
// Dashboard navigation functionality
function showDashboardContent(contentId, event) { // Added event parameter
    // Hide all dashboard content
    const dashboardContents = document.querySelectorAll('.dashboard-content');
    dashboardContents.forEach(content => content.classList.remove('active'));
    
    // Remove active state from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Show the selected content
    const targetContent = document.getElementById(contentId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Add active state to the clicked nav item
    if (event && event.target) {
        const clickedNavItem = event.target;
        clickedNavItem.classList.add('active');
    }
}

// Employer dashboard navigation
function showEmployerContent(contentId, event) { // Added event parameter
    // Hide all dashboard content
    const dashboardContents = document.querySelectorAll('#employer-dashboard .dashboard-content');
    dashboardContents.forEach(content => content.classList.remove('active'));
    
    // Remove active state from all nav items
    const navItems = document.querySelectorAll('#employer-dashboard .nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Show the selected content
    const targetContent = document.getElementById(contentId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Add active state to the clicked nav item
    if (event && event.target) {
        const clickedNavItem = event.target;
        clickedNavItem.classList.add('active');
    }
}

// Enhanced save functionality with local storage
// Toggle save functionality for job cards
function toggleSave(button) {
    button.classList.toggle('saved');
    if (button.classList.contains('saved')) {
        button.innerHTML = '♥';
        button.style.color = '#e74c3c';
        button.setAttribute('title', 'Ta bort från sparade');
        button.setAttribute('aria-label', 'Ta bort från sparade jobb');
        
        // Save to localStorage
        const jobCard = button.closest('.job-card');
        if (jobCard) {
            const jobTitle = jobCard.querySelector('.job-title')?.textContent;
            const jobCompany = jobCard.querySelector('.job-company')?.textContent;
            if (jobTitle && jobCompany) {
                saveJobToStorage(jobTitle, jobCompany);
            }
        }
    } else {
        button.innerHTML = '♡';
        button.style.color = '#ddd';
        button.setAttribute('title', 'Spara jobb');
        button.setAttribute('aria-label', 'Spara jobb');
        
        // Remove from localStorage
        const jobCard = button.closest('.job-card');
        if (jobCard) {
            const jobTitle = jobCard.querySelector('.job-title')?.textContent;
            const jobCompany = jobCard.querySelector('.job-company')?.textContent;
            if (jobTitle && jobCompany) {
                removeJobFromStorage(jobTitle, jobCompany);
            }
        }
    }
}

// Local storage functions for saved jobs
function saveJobToStorage(title, company) {
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const jobId = `${title}-${company}`;
    if (!savedJobs.includes(jobId)) {
        savedJobs.push(jobId);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    }
}

function removeJobFromStorage(title, company) {
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const jobId = `${title}-${company}`;
    savedJobs = savedJobs.filter(id => id !== jobId);
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
}

function loadSavedJobs() {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    savedJobs.forEach(jobId => {
        const [title, company] = jobId.split('-');
        const jobCards = document.querySelectorAll('.job-card');
        jobCards.forEach(card => {
            const cardTitle = card.querySelector('.job-title')?.textContent;
            const cardCompany = card.querySelector('.job-company')?.textContent;
            if (cardTitle === title && cardCompany?.includes(company)) {
                const saveBtn = card.querySelector('.save-btn');
                if (saveBtn) {
                    saveBtn.classList.add('saved');
                    saveBtn.innerHTML = '♥';
                    saveBtn.style.color = '#e74c3c';
                    saveBtn.setAttribute('title', 'Ta bort från sparade');
                    saveBtn.setAttribute('aria-label', 'Ta bort från sparade jobb');
                }
            }
        });
    });
}

// Enhanced accessibility features
// High contrast accessibility toggle
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    
    // Save preference to localStorage
    const isHighContrast = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHighContrast);
}

let currentFontSize = 1;
function increaseFontSize() {
    if (currentFontSize < 1.4) {
        currentFontSize += 0.2;
        document.body.style.fontSize = currentFontSize + 'em';
        localStorage.setItem('fontSize', currentFontSize);
    }
}

function decreaseFontSize() {
    if (currentFontSize > 0.8) {
        currentFontSize -= 0.2;
        document.body.style.fontSize = currentFontSize + 'em';
        localStorage.setItem('fontSize', currentFontSize);
    }
}

function toggleKeyboardNav() {
    document.body.classList.toggle('keyboard-nav-active');
    const isActive = document.body.classList.contains('keyboard-nav-active');
    localStorage.setItem('keyboardNav', isActive);
    
    if (isActive) {
        // Add keyboard navigation hints
        showKeyboardHints();
    } else {
        hideKeyboardHints();
    }
}

function showKeyboardHints() {
    // Add visual indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
    focusableElements.forEach((element, index) => {
        element.setAttribute('data-keyboard-hint', `Tab ${index + 1}`);
    });
}

function hideKeyboardHints() {
    const elements = document.querySelectorAll('[data-keyboard-hint]');
    elements.forEach(element => {
        element.removeAttribute('data-keyboard-hint');
    });
}

// Advanced search functionality
function toggleAdvancedSearch() {
    const advancedFilters = document.getElementById('advancedFilters');
    if (advancedFilters) {
        advancedFilters.classList.toggle('active');
    }
}

// Enhanced search functionality with filters
// Search functionality
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.trim();
    const locationFilter = document.querySelector('.filter-select[aria-label="Välj plats"]')?.value;
    const jobTypeFilter = document.querySelector('.filter-select[aria-label="Välj anställningstyp"]')?.value;
    const accommodationFilter = document.querySelector('.filter-select[aria-label="Välj anpassningar"]')?.value;
    const industryFilter = document.querySelector('.filter-select[aria-label="Välj bransch"]')?.value;
    
    const searchParams = {
        term: searchTerm,
        location: locationFilter,
        jobType: jobTypeFilter,
        accommodation: accommodationFilter,
        industry: industryFilter
    };
    
    console.log('Searching with parameters:', searchParams);
    
    // Simulate search results
    filterJobCards(searchParams);
}

function filterJobCards(searchParams) {
    const jobCards = document.querySelectorAll('.job-card');
    let visibleCount = 0;
    
    jobCards.forEach(card => {
        const title = card.querySelector('.job-title')?.textContent.toLowerCase() || '';
        const company = card.querySelector('.job-company')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.job-description')?.textContent.toLowerCase() || '';
        const category = card.querySelector('.category')?.textContent.toLowerCase() || '';
        const jobType = card.querySelector('.job-type')?.textContent.toLowerCase() || '';
        const accessibilityFeatures = Array.from(card.querySelectorAll('.feature-tag')).map(tag => tag.textContent.trim().toLowerCase());
        const jobLocation = card.querySelector('.job-company')?.textContent.split(',').pop().trim().toLowerCase() || '';

        let matches = true;
        
        // Text search
        if (searchParams.term) {
            const searchTerm = searchParams.term.toLowerCase();
            matches = matches && (
                title.includes(searchTerm) || 
                company.includes(searchTerm) || 
                description.includes(searchTerm)
            );
        }
        
        // Location filter
        if (searchParams.location && searchParams.location !== 'Alla platser') {
            const filterLocation = searchParams.location.toLowerCase();
            matches = matches && (jobLocation.includes(filterLocation) || (filterLocation === 'distansarbete' && jobLocation.includes('distans')));
        }

        // Job Type filter
        if (searchParams.jobType && searchParams.jobType !== 'Alla jobtyper') {
            const filterJobType = searchParams.jobType.toLowerCase();
            matches = matches && jobType.includes(filterJobType);
        }

        // Accommodation filter
        if (searchParams.accommodation && searchParams.accommodation !== 'Alla anpassningar') {
            const filterAccommodation = searchParams.accommodation.toLowerCase();
            matches = matches && accessibilityFeatures.some(feature => feature.includes(filterAccommodation));
        }

        // Industry filter
        if (searchParams.industry && searchParams.industry !== 'Alla branscher') {
            const filterIndustry = searchParams.industry.toLowerCase();
            matches = matches && category.includes(filterIndustry);
        }
        
        // Show/hide card based on matches
        if (matches) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show search results summary
    showSearchResults(visibleCount, searchParams.term);
}

function showSearchResults(count, searchTerm) {
    // Remove existing search results message
    const existingMessage = document.querySelector('.search-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Add new search results message
    const demoSection = document.querySelector('.demo-section');
    if (demoSection) {
        const message = document.createElement('div');
        message.className = 'search-results-message';
        message.style.cssText = 'background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;';
        message.setAttribute('aria-live', 'polite'); // For screen readers
        message.innerHTML = `<i class="fas fa-search"></i> Hittade ${count} jobb${searchTerm ? ` för "${searchTerm}"` : ''}`;
        demoSection.insertBefore(message, demoSection.querySelector('h3').nextSibling);
    }
}

// Job application functionality
function applyToJob(jobId) {
    const modal = document.getElementById('applicationModal');
    const jobTitle = getJobTitleById(jobId);
    
    if (modal && jobTitle) {
        document.getElementById('applicationJobTitle').textContent = jobTitle;
        modal.classList.add('active');
        modal.style.display = 'flex';
    }
}

function getJobTitleById(jobId) {
    // Map job IDs to titles (in a real app, this would come from a database)
    const jobTitles = {
        'tech-support-1': 'Kundtjänstmedarbetare',
        'web-dev-1': 'Webbutvecklare',
        'care-assistant-1': 'Vårdassistent',
        'data-analyst-1': 'Dataanalytiker'
    };
    return jobTitles[jobId] || 'Okänd tjänst';
}

function submitApplication() {
    const form = document.getElementById('applicationForm');
    // In a real application, you would collect form data and send it to a server
    // const formData = new FormData(form); 
    
    console.log('Simulating application submission...');
    
    // Show success message
    alert('Din ansökan har skickats! Vi återkommer inom kort.');
    
    // Close modal
    closeModal('applicationModal');
    
    // Update applications count in dashboard (simplified for demo)
    updateApplicationsCount();
}

function updateApplicationsCount() {
    const applicationsCountElement = document.querySelector('#applications .stat-card .stat-number');
    if (applicationsCountElement) {
        let currentCount = parseInt(applicationsCountElement.textContent);
        applicationsCountElement.textContent = currentCount + 1;
    }
}

// Job details modal
function viewJobDetails(jobId) {
    const modal = document.getElementById('jobDetailsModal');
    const jobData = getJobDetailsById(jobId);
    
    if (modal && jobData) {
        // Populate modal with job data
        document.getElementById('modalJobTitle').textContent = jobData.title;
        document.getElementById('modalCompanyName').textContent = jobData.company;
        document.getElementById('modalJobLocation').textContent = jobData.location;
        document.getElementById('modalJobDescription').textContent = jobData.description;
        
        // Populate requirements
        const requirementsList = document.getElementById('modalJobRequirements');
        requirementsList.innerHTML = '';
        jobData.requirements.forEach(req => {
            const li = document.createElement('li');
            li.textContent = req;
            requirementsList.appendChild(li);
        });
        
        // Populate accessibility features
        const featuresContainer = document.getElementById('modalAccessibilityFeatures');
        featuresContainer.innerHTML = '';
        jobData.accessibilityFeatures.forEach(feature => {
            const span = document.createElement('span');
            span.className = 'feature-tag';
            span.innerHTML = `<i class="fas fa-check"></i> ${feature}`;
            featuresContainer.appendChild(span);
        });
        
        // Set up action buttons
        document.getElementById('modalApplyBtn').onclick = () => applyToJob(jobId);
        document.getElementById('modalMessageBtn').onclick = () => openMessaging(jobData.company);
        
        modal.classList.add('active');
        modal.style.display = 'flex';
    }
}

function getJobDetailsById(jobId) {
    const jobDetails = {
        'tech-support-1': {
            title: 'Kundtjänstmedarbetare',
            company: 'TechSupport AB',
            location: 'Stockholm',
            description: 'Vi söker en engagerad kundtjänstmedarbetare som vill hjälpa våra kunder med teknisk support via telefon och chat. Du kommer att arbeta i ett stödjande team där alla får den hjälp de behöver för att lyckas.',
            requirements: [
                'Gymnasieutbildning eller motsvarande',
                'Goda kommunikationsförmågor',
                'Grundläggande datorkunskaper',
                'Flyt i svenska och engelska'
            ],
            accessibilityFeatures: ['Flexibla arbetstider', 'Hemarbete möjligt', 'Hjälpmedel för hörsel', 'Extra introduktionsstöd']
        },
        'web-dev-1': {
            title: 'Webbutvecklare',
            company: 'Inclusive Tech',
            location: 'Stockholm',
            description: 'Utveckla tillgängliga webbapplikationer med fokus på användarupplevelse. Vi värdesätter mångfald och har erfarenhet av neurodivergenta utvecklare.',
            requirements: [
                'Kunskap inom JavaScript och React',
                'Förståelse för tillgänglighet (WCAG)',
                'Erfarenhet av responsiv design',
                'Portfolio med tidigare projekt'
            ],
            accessibilityFeatures: ['Neurodivergent-vänlig miljö', 'Tyst arbetszon', 'Specialiserad utrustning', 'Flexibel schemaläggning']
        },
        'care-assistant-1': {
            title: 'Vårdassistent',
            company: 'Caring Hands',
            location: 'Göteborg',
            description: 'Hjälp äldre personer i deras dagliga aktiviteter. Vi erbjuder en stödjande miljö där empati och omtanke värdesätts högt.',
            requirements: [
                'Erfarenhet av vårdarbete är meriterande',
                'Empatisk och ansvarsfull',
                'God förmåga att kommunicera',
                'Flexibel och lösningsorienterad'
            ],
            accessibilityFeatures: ['Rullstolsanpassat', 'Personlig assistent', 'Anpassade arbetstider', 'Empatisk arbetsmiljö']
        },
        'data-analyst-1': {
            title: 'Dataanalytiker',
            company: 'Data Insights AB',
            location: 'Distans',
            description: 'Analysera data och skapa insikter för våra kunder. Perfekt för dig som gillar mönster, struktur och arbetar bäst i egen takt.',
            requirements: [
                'Erfarenhet av dataanalysverktyg (t.ex. SQL, Python, R)',
                'Förmåga att tolka komplexa datamängder',
                'Strukturerad och noggrann',
                'God problemlösningsförmåga'
            ],
            accessibilityFeatures: ['100% distansarbete', 'Autism-vänlig struktur', 'Visuella verktyg', 'Egen arbetstakt']
        }
    };
    return jobDetails[jobId];
}

// Modal functionality
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
    }
}

// Enhanced messaging functionality
function openMessaging(companyName) {
    // Switch to messages tab in dashboard
    showPage('dashboard');
    showDashboardContent('messages', null); // Pass null for event as it's not a direct click
    
    // Highlight the conversation with the company
    const conversations = document.querySelectorAll('.conversation-item');
    conversations.forEach(conv => {
        conv.classList.remove('active');
        const name = conv.querySelector('.conversation-name')?.textContent;
        if (name === companyName) {
            conv.classList.add('active');
            openConversation(companyName.toLowerCase().replace(/\s+/g, '-'));
        }
    });
}

function openConversation(conversationId) {
    // Remove active state from all conversations
    const conversations = document.querySelectorAll('.conversation-item');
    conversations.forEach(conv => conv.classList.remove('active'));
    
    // Add active state to selected conversation
    const selectedConv = document.querySelector(`.conversations-list .conversation-item[onclick*="openConversation('${conversationId}')"]`);
    if (selectedConv) {
        selectedConv.classList.add('active');
    }
    
    // Update chat header
    const chatHeader = document.querySelector('.chat-header h4');
    if (chatHeader && selectedConv) {
        const companyName = selectedConv.querySelector('.conversation-name')?.textContent;
        chatHeader.textContent = companyName || 'Konversation';
    }
    
    // Load conversation messages (in a real app, this would fetch from server)
    loadConversationMessages(conversationId);
}

function loadConversationMessages(conversationId) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    // Sample conversation data
    const conversations = {
        'techsupport ab': [ // Use full company name as key
            { type: 'received', content: 'Hej Anna! Vi skulle gärna vilja bjuda in dig till en intervju nästa vecka. Vilka dagar passar dig bäst?', time: '2025-01-03 14:30' },
            { type: 'received', content: 'Vi kan erbjuda intervjun via videolänk om det passar dig bättre.', time: '2025-01-03 14:32' },
            { type: 'sent', content: 'Hej! Tack så mycket för erbjudandet. Videointervju låter perfekt. Måndag eller tisdag nästa vecka passar mig bra.', time: '2025-01-03 15:45' }
        ],
        'inclusive tech': [ // Use full company name as key
            { type: 'received', content: 'Tack för din ansökan! Vi återkommer inom två veckor med besked.', time: '2025-01-02 10:15' },
            { type: 'sent', content: 'Tack så mycket! Jag ser fram emot att höra från er.', time: '2025-01-02 11:30' }
        ],
        'data insights ab': [ // Use full company name as key
            { type: 'received', content: 'Grattis! Vi vill erbjuda dig tjänsten som Dataanalytiker. Vänligen kontakta oss för att diskutera detaljer.', time: '2024-12-30 09:00' },
            { type: 'sent', content: 'Fantastiskt! Tack så mycket! Jag är mycket intresserad och kontaktar er snart.', time: '2024-12-30 10:00' }
        ]
    };
    
    const messages = conversations[conversationId] || [];
    
    chatMessages.innerHTML = '';
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type}`;
        messageDiv.innerHTML = `
            <div class="message-content">${message.content}</div>
            <div class="message-time">${message.time}</div>
        `;
        chatMessages.appendChild(messageDiv);
    });
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Enhanced message sending
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput?.value.trim();
    
    if (messageText) {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            // Create new message element
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message sent';
            messageDiv.innerHTML = `
                <div class="message-content">${messageText}</div>
                <div class="message-time">${new Date().toLocaleString('sv-SE')}</div>
            `;
            
            // Add to chat
            chatMessages.appendChild(messageDiv);
            
            // Clear input
            messageInput.value = '';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate response after a delay
            setTimeout(() => {
                const responseDiv = document.createElement('div');
                responseDiv.className = 'message received';
                responseDiv.innerHTML = `
                    <div class="message-content">Tack för ditt meddelande! Vi återkommer så snart som möjligt.</div>
                    <div class="message-time">${new Date().toLocaleString('sv-SE')}</div>
                `;
                chatMessages.appendChild(responseDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 2000);
        }
    }
}

// Video recording functionality
let mediaRecorder;
let recordedChunks = [];

function startVideoRecording() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            const videoPreview = document.getElementById('videoPreview');
            const video = videoPreview.querySelector('video');
            
            video.srcObject = stream;
            video.play();
            
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };
            
            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                video.srcObject = null; // Clear stream from video element
                video.src = url;
                videoPreview.style.display = 'block';
                
                // Stop all tracks to turn off camera/microphone
                stream.getTracks().forEach(track => track.stop());
            };
            
            mediaRecorder.start();
            
            // Stop recording after 2 minutes
            setTimeout(() => {
                if (mediaRecorder.state === 'recording') {
                    mediaRecorder.stop();
                }
            }, 120000);
            
        })
        .catch(err => {
            console.error('Error accessing camera:', err);
            alert('Kunde inte komma åt kameran. Kontrollera att du har gett tillstånd.');
        });
}

function removeVideo() {
    const videoPreview = document.getElementById('videoPreview');
    if (videoPreview) {
        videoPreview.style.display = 'none';
        const video = videoPreview.querySelector('video');
        if (video) {
            video.src = ''; // Clear video source
        }
        recordedChunks = [];
    }
}

// Salary range slider functionality
function updateSalaryDisplay() {
    const slider = document.getElementById('salaryRange');
    const display = document.querySelector('.salary-display');
    
    if (slider && display) {
        const value = parseInt(slider.value);
        display.textContent = `15 000 - ${value.toLocaleString('sv-SE')} kr`;
    }
}

// Form submission handlers
function handleJobseekerSubmit(event) {
    event.preventDefault();
    console.log('Jobseeker form submitted');
    
    // Simulate account creation
    const name = document.getElementById('name')?.value;
    if (name) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userType', 'jobseeker');
    }
    
    showPage('dashboard');
    return false;
}

function handleEmployerSubmit(event) {
    event.preventDefault();
    console.log('Employer form submitted');
    
    // Simulate account creation
    const companyName = document.getElementById('company-name')?.value;
    if (companyName) {
        localStorage.setItem('companyName', companyName);
        localStorage.setItem('userType', 'employer');
    }
    
    alert('Företagsprofil skapad! Välkommen till InclusioJobs.');
    showPage('employer-dashboard');
    return false;
}

function handleLoginSubmit(event) {
    event.preventDefault();
    console.log('Login form submitted');
    
    // Simulate login - check user type and redirect accordingly
    const userType = localStorage.getItem('userType') || 'jobseeker'; // Default to jobseeker if not set
    if (userType === 'employer') {
        showPage('employer-dashboard');
    } else {
        showPage('dashboard');
    }
    return false;
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved high contrast preference
    const savedHighContrast = localStorage.getItem('highContrast');
    if (savedHighContrast === 'true') {
        document.body.classList.add('high-contrast');
    }
    
    // Check for saved font size
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        currentFontSize = parseFloat(savedFontSize);
        document.body.style.fontSize = currentFontSize + 'em';
    }
    
    // Check for keyboard navigation preference
    const savedKeyboardNav = localStorage.getItem('keyboardNav');
    if (savedKeyboardNav === 'true') {
        document.body.classList.add('keyboard-nav-active');
        showKeyboardHints();
    }
    
    // Load saved jobs
    loadSavedJobs();
    
    // Update user interface based on stored user data
    updateUserInterface();
    
    // Add event listener for search button
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Add event listener for search input (Enter key)
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Add event listeners for forms
    const jobseekerForm = document.querySelector('#jobseeker form');
    if (jobseekerForm) {
        jobseekerForm.addEventListener('submit', handleJobseekerSubmit);
    }
    
    const employerForm = document.querySelector('#employer form');
    if (employerForm) {
        employerForm.addEventListener('submit', handleEmployerSubmit);
    }
    
    const loginForm = document.querySelector('#login form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Add event listener for send message button
    const sendBtn = document.querySelector('#messages .send-btn'); // More specific selector
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    // Add event listener for message input (Enter key)
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Add event listeners for file uploads
    const profilePhoto = document.getElementById('profilePhoto');
    if (profilePhoto) {
        profilePhoto.addEventListener('change', handleProfilePhotoUpload);
    }
    
    const videoFile = document.getElementById('videoFile');
    if (videoFile) {
        videoFile.addEventListener('change', handleVideoUpload);
    }
    
    // Add event listener for salary range slider
    const salaryRange = document.getElementById('salaryRange');
    if (salaryRange) {
        salaryRange.addEventListener('input', updateSalaryDisplay);
        updateSalaryDisplay(); // Initialize display
    }
    
    // Add event listeners for modal close on outside click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.remove('active');
                modal.style.display = 'none';
            }
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Escape key closes modals
        if (event.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                activeModal.style.display = 'none';
            }
        }
        
        // Ctrl+K opens search
        if (event.ctrlKey && event.key === 'k') {
            event.preventDefault();
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    console.log('InclusioJobs platform initialized successfully');
});

// Update user interface based on stored data
function updateUserInterface() {
    const userName = localStorage.getItem('userName');
    const companyName = localStorage.getItem('companyName');
    const userType = localStorage.getItem('userType');
    
    // Update dashboard header for jobseeker
    const jobseekerDashboardHeader = document.querySelector('#dashboard .header p');
    if (jobseekerDashboardHeader && userType === 'jobseeker' && userName) {
        jobseekerDashboardHeader.textContent = `Välkommen tillbaka, ${userName}!`;
    } else if (jobseekerDashboardHeader) {
        // Default or clear if no user
        jobseekerDashboardHeader.textContent = `Välkommen tillbaka!`;
    }

    // Update dashboard header for employer
    const employerDashboardHeader = document.querySelector('#employer-dashboard .header p');
    if (employerDashboardHeader && userType === 'employer' && companyName) {
        employerDashboardHeader.textContent = `Välkommen, ${companyName}!`;
    } else if (employerDashboardHeader) {
        // Default or clear if no company
        employerDashboardHeader.textContent = `Välkommen!`;
    }
}

// File upload handlers
function handleProfilePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const currentPhoto = document.querySelector('.current-photo');
            if (currentPhoto) {
                currentPhoto.innerHTML = `<img src="${e.target.result}" alt="Profilbild" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            }
        };
        reader.readAsDataURL(file);
    }
}

function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const videoPreview = document.getElementById('videoPreview');
        const video = videoPreview.querySelector('video');
        
        if (video) {
            const url = URL.createObjectURL(file);
            video.src = url;
            videoPreview.style.display = 'block';
        }
    }
}

// Job matching algorithm (simplified)
function calculateJobMatch(jobData, userPreferences) {
    let matchScore = 0;
    let totalCriteria = 0;
    
    // Check accommodation matches
    if (userPreferences.accommodations && jobData.accommodations) {
        const userAccommodations = userPreferences.accommodations;
        const jobAccommodations = jobData.accommodations;
        
        userAccommodations.forEach(accommodation => {
            totalCriteria++;
            if (jobAccommodations.includes(accommodation)) {
                matchScore++;
            }
        });
    }
    
    // Check location preference
    if (userPreferences.location && jobData.location) {
        totalCriteria++;
        if (userPreferences.location === jobData.location || 
            userPreferences.remoteWork && jobData.remoteWork) {
            matchScore++;
        }
    }
    
    // Check job type preference
    if (userPreferences.jobType && jobData.jobType) {
        totalCriteria++;
        if (userPreferences.jobType === jobData.jobType) {
            matchScore++;
        }
    }
    
    return totalCriteria > 0 ? Math.round((matchScore / totalCriteria) * 100) : 0;
}

// Recommendation engine
function generateRecommendations() {
    // This would typically fetch user preferences and job data from a server
    const userPreferences = {
        accommodations: ['Flexibla arbetstider', 'Hemarbete möjligt', 'Hjälpmedel för hörsel'],
        location: 'Stockholm',
        jobType: 'Heltid',
        remoteWork: true
    };
    
    // Sample job data
    const jobs = [
        {
            title: 'Kundtjänstmedarbetare',
            company: 'TechSupport AB',
            accommodations: ['Flexibla arbetstider', 'Hemarbete möjligt', 'Hjälpmedel för hörsel'],
            location: 'Stockholm',
            jobType: 'Heltid',
            remoteWork: true
        },
        {
            title: 'IT-supporter',
            company: 'Digital Solutions',
            accommodations: ['Rullstolsanpassad lokal', 'Ergonomisk arbetsplats'],
            location: 'Göteborg',
            jobType: 'Deltid',
            remoteWork: false
        }
    ];
    
    // Calculate match scores
    const recommendations = jobs.map(job => ({
        ...job,
        matchScore: calculateJobMatch(job, userPreferences)
    })).sort((a, b) => b.matchScore - a.matchScore);
    
    return recommendations;
}

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('sv-SE');
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone);
}

// Export functions for global access (if needed)
window.showPage = showPage;
window.showDashboardContent = showDashboardContent;
window.showEmployerContent = showEmployerContent;
window.toggleSave = toggleSave;
window.toggleHighContrast = toggleHighContrast;
window.increaseFontSize = increaseFontSize;
window.decreaseFontSize = decreaseFontSize;
window.toggleKeyboardNav = toggleKeyboardNav;
window.toggleAdvancedSearch = toggleAdvancedSearch;
window.applyToJob = applyToJob;
window.viewJobDetails = viewJobDetails;
window.openMessaging = openMessaging;
window.openConversation = openConversation;
window.closeModal = closeModal;
window.submitApplication = submitApplication;
window.sendMessage = sendMessage;
window.startVideoRecording = startVideoRecording;
window.removeVideo = removeVideo;
