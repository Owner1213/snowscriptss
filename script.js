function copyToClipboard(button, text) {
    navigator.clipboard.writeText(text).then(() => {
        button.classList.add('copied');

        button.innerHTML = `
            <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6L9 17l-5-5"/>
            </svg>
        `;

        setTimeout(() => {
            button.classList.remove('copied');
            button.innerHTML = `
                <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.685 2H10a2 2 0 00-2 2z"/>
                    <path d="M16 18v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2"/>
                </svg>
            `;
        }, 2000);
    });
}

function updateStatusUI(service, isOnline, statusText) {
    const dot = document.getElementById(`${service}Status`);
    const textElement = document.getElementById(`${service}StatusText`);

    dot.className = `status-dot ${isOnline ? 'online' : 'offline'}`;
    textElement.textContent = isOnline ? 'Operational' : statusText;
    textElement.style.color = isOnline ? 'var(--success)' : '#f7768e';
}

async function checkStatus() {
    try {
        updateStatusUI('script', false, 'Script is not finished');
        updateStatusUI('dev', false, 'MacSploit is down');
    } catch (error) {
        console.error('Error checking status:', error);
        updateStatusUI('script', false);
        updateStatusUI('dev', false);
    }
}

checkStatus();
setInterval(checkStatus, 30000);
