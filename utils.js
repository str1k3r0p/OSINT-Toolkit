// Utility functions for validation, UI effects, and common operations

function isValidDomain(domain) {
    const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/i;
    return domainRegex.test(domain);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Custom Toast Notification
let toastTimeout;
function showToast(message, type = 'error', duration = 3000) {
    const toast = document.getElementById('toast-notification');
    const msgEl = document.getElementById('toast-message');
    const iconEl = document.getElementById('toast-icon');
    
    if (type === 'error') {
        iconEl.className = 'fas fa-exclamation-circle text-red-400';
    } else {
        iconEl.className = 'fas fa-check-circle text-green-400';
    }
    
    msgEl.textContent = message;
    
    toast.classList.remove('opacity-0', 'translate-y-12', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-12', 'pointer-events-none');
    }, duration);
}

// Category Card Generator (Light Theme, 1-Column)
function createCategoryCard(category) {
    const container = document.createElement('div');
    container.className = 'bg-surface-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow relative';
    
    const dorkCount = document.createElement('div');
    dorkCount.className = 'absolute top-5 right-5 text-xs font-semibold bg-white border border-slate-200 text-slate-500 px-3 py-1 rounded-full';
    dorkCount.textContent = category.dorks ? `${category.dorks.length} queries` : `${category.engines.length} engines`;
    container.appendChild(dorkCount);
    
    const categoryTitle = document.createElement('h4');
    categoryTitle.className = 'text-lg font-bold text-slate-800 mb-4 flex items-center gap-3';
    
    const categoryBadge = document.createElement('div');
    categoryBadge.className = 'w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center';
    
    const badgeIcon = document.createElement('i');
    badgeIcon.className = `${category.icon} text-sm`;
    categoryBadge.appendChild(badgeIcon);
    
    categoryTitle.appendChild(categoryBadge);
    categoryTitle.appendChild(document.createTextNode(category.name));
    container.appendChild(categoryTitle);

    return container;
}

function createSearchLink(query, isDirectUrl = false, engineName = "Google") {
    const link = document.createElement('a');
    let finalUrl = query;
    if (!isDirectUrl) {
        if (engineName === "Shodan") {
            finalUrl = `https://www.shodan.io/search?query=${encodeURIComponent(query)}`;
        } else if (engineName === "FOFA") {
            // FOFA requires base64 encoding for search
            finalUrl = `https://fofa.info/result?qbase64=${btoa(query)}`;
        } else {
            finalUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }
    
    link.href = finalUrl;
    link.textContent = query;
    link.className = 'block w-full break-all text-slate-600 hover:text-primary-700 bg-white border border-slate-200 hover:border-primary-300 rounded-lg p-3 text-sm font-mono transition-colors shadow-sm hover:shadow';
    link.target = '_blank';

    return link;
}
