// Main functionality for the OSINT toolkit

// --- Navigation ---
function handleNavigation(targetId, clickedElement) {
    // Reset all links
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.remove('bg-primary-50', 'text-primary-700', 'border', 'border-primary-100', 'shadow-sm');
        l.classList.add('text-slate-600', 'hover:bg-slate-50', 'hover:text-slate-900');
    });
    
    // Hide all sections
    document.querySelectorAll('.tool-section').forEach(s => {
        s.classList.remove('block', 'animate-fade-in');
        s.classList.add('hidden');
    });
    
    // Set active link styles (if it's a standard nav link)
    if (clickedElement && clickedElement.classList.contains('nav-link')) {
        clickedElement.classList.remove('text-slate-600', 'hover:bg-slate-50', 'hover:text-slate-900');
        clickedElement.classList.add('bg-primary-50', 'text-primary-700', 'border', 'border-primary-100', 'shadow-sm');
    } else if (targetId === 'home-section') {
        // If logo was clicked, manually highlight the home link
        const homeLink = document.getElementById('home-link');
        homeLink.classList.remove('text-slate-600', 'hover:bg-slate-50', 'hover:text-slate-900');
        homeLink.classList.add('bg-primary-50', 'text-primary-700', 'border', 'border-primary-100', 'shadow-sm');
    }
    
    // Show target section
    const section = document.getElementById(targetId);
    section.classList.remove('hidden');
    section.classList.add('block', 'animate-fade-in');
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.id.replace('-link', '-section');
        handleNavigation(targetId, this);
    });
});

// Logo acts as home link
document.getElementById('home-logo').addEventListener('click', function(e) {
    e.preventDefault();
    handleNavigation('home-section', null);
});

// --- Generation Functions ---

function generateBugBountyDorks() {
    const domainInput = document.getElementById('domain-input').value.trim();
    if (!isValidDomain(domainInput)) {
        showToast('Please enter a valid domain (e.g., example.com)', 'error');
        return;
    }
    
    let domain = domainInput.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];

    const resultsContainer = document.getElementById('bug-bounty-results-container');
    const resultsDiv = document.getElementById('bug-bounty-results');
    const loading = document.getElementById('bug-bounty-loading');
    
    document.getElementById('domain-display').textContent = domain;
    resultsDiv.innerHTML = ''; 
    resultsContainer.classList.add('hidden');
    loading.classList.remove('hidden');
    
    setTimeout(() => {
        loading.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        
        bugBountyCategories.forEach(category => {
            const card = createCategoryCard(category);
            const linksContainer = document.createElement('div');
            linksContainer.className = 'flex flex-col gap-3 mt-4';
            
            category.dorks.forEach(dork => {
                const query = dork.replace(/{domain}/g, domain);
                linksContainer.appendChild(createSearchLink(query, query.startsWith("https://")));
            });
            
            card.appendChild(linksContainer);
            resultsDiv.appendChild(card);
        });
    }, 600);
}

function generatePeopleSearchDorks() {
    const nameInput = document.getElementById('name-input').value.trim();
    const emailInput = document.getElementById('people-email-input').value.trim();
    const locationInput = document.getElementById('location-input').value.trim();
    
    if (nameInput.length < 2) {
        showToast('Please enter a valid target name', 'error');
        return;
    }

    const resultsContainer = document.getElementById('people-search-results-container');
    const resultsDiv = document.getElementById('people-search-results');
    const loading = document.getElementById('people-search-loading');
    
    document.getElementById('people-display').textContent = nameInput;
    resultsDiv.innerHTML = ''; 
    resultsContainer.classList.add('hidden');
    loading.classList.remove('hidden');
    
    setTimeout(() => {
        loading.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        
        peopleSearchCategories.forEach(category => {
            const card = createCategoryCard(category);
            const linksContainer = document.createElement('div');
            linksContainer.className = 'flex flex-col gap-3 mt-4';
            
            category.dorks.forEach(dork => {
                let query = dork.replace(/{name}/g, nameInput);
                query = query.replace(/{email}/g, emailInput ? emailInput : `"${nameInput.replace(/\s+/g, '')}@gmail.com"`);
                
                if (query.includes("{location}") && !locationInput) {
                    return; 
                }
                query = query.replace(/{location}/g, locationInput);

                linksContainer.appendChild(createSearchLink(query));
            });
            
            if(linksContainer.children.length > 0) {
                card.appendChild(linksContainer);
                resultsDiv.appendChild(card);
            }
        });
    }, 600);
}

function generateEmailSearchDorks() {
    const emailTarget = document.getElementById('email-target-input').value.trim();
    
    if (!emailTarget) {
        showToast('Please enter an email or domain', 'error');
        return;
    }

    const isEmail = isValidEmail(emailTarget);
    let domain = emailTarget;
    if (isEmail) {
        domain = emailTarget.split('@')[1];
    } else if (!isValidDomain(emailTarget)) {
        showToast('Please enter a valid email or domain', 'error');
        return;
    }

    const resultsContainer = document.getElementById('email-search-results-container');
    const resultsDiv = document.getElementById('email-search-results');
    const loading = document.getElementById('email-search-loading');
    
    document.getElementById('email-display').textContent = emailTarget;
    resultsDiv.innerHTML = ''; 
    resultsContainer.classList.add('hidden');
    loading.classList.remove('hidden');
    
    setTimeout(() => {
        loading.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        
        emailSearchCategories.forEach(category => {
            const card = createCategoryCard(category);
            const linksContainer = document.createElement('div');
            linksContainer.className = 'flex flex-col gap-3 mt-4';
            
            category.dorks.forEach(dork => {
                let query = dork.replace(/{domain}/g, domain);
                if (query.includes("{email}") && !isEmail) {
                    return; 
                }
                query = query.replace(/{email}/g, emailTarget);
                query = query.replace(/{target}/g, isEmail ? emailTarget.split('@')[0] : emailTarget);
                
                linksContainer.appendChild(createSearchLink(query));
            });
            
            if(linksContainer.children.length > 0) {
                card.appendChild(linksContainer);
                resultsDiv.appendChild(card);
            }
        });
    }, 600);
}

function previewImage(event) {
    const previewContainer = document.getElementById('image-preview-container');
    const preview = document.getElementById('image-preview');
    const file = event.target.files[0];
    
    if (file) {
        preview.src = URL.createObjectURL(file);
        previewContainer.classList.remove('hidden');
        showToast('Image loaded successfully', 'success');
    }
}

function generateImageSearchLinks() {
    const fileInput = document.getElementById('image-upload');
    if (!fileInput.files || !fileInput.files[0]) {
        showToast('Please select or drag & drop an image first', 'error');
        return;
    }

    const resultsContainer = document.getElementById('image-search-results-container');
    const resultsDiv = document.getElementById('image-search-results');
    const loading = document.getElementById('image-search-loading');
    
    resultsDiv.innerHTML = ''; 
    resultsContainer.classList.add('hidden');
    loading.classList.remove('hidden');
    
    setTimeout(() => {
        loading.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        
        imageSearchEngines.forEach(category => {
            const card = createCategoryCard(category);
            const linksContainer = document.createElement('div');
            linksContainer.className = 'flex flex-col gap-3 mt-4';
            
            category.engines.forEach(engine => {
                const link = createSearchLink(engine.url, true);
                link.innerHTML = `<span class="font-medium">${engine.name}</span> <i class="fas fa-external-link-alt ml-2 opacity-50"></i>`;
                link.className = 'flex justify-between items-center w-full break-all text-slate-600 hover:text-primary-700 bg-white border border-slate-200 hover:border-primary-300 rounded-lg p-3 text-sm transition-colors shadow-sm hover:shadow';
                
                linksContainer.appendChild(link);
            });
            
            card.appendChild(linksContainer);
            resultsDiv.appendChild(card);
        });
    }, 600);
}

// Initial Setup
window.addEventListener('DOMContentLoaded', () => {
    // Home section is visible by default in HTML
    handleNavigation('home-section', document.getElementById('home-link'));
});