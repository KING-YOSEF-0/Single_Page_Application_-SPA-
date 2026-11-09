// --- Navigation System ---
const navItems = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.tool-panel');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active states
        navItems.forEach(nav => nav.classList.remove('active'));
        panels.forEach(panel => panel.classList.remove('active'));
        
        // Add active to selected
        item.classList.add('active');
        const targetId = item.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// --- 01. Grade Calculator ---
function calculateGrade() {
    const obtained = parseFloat(document.getElementById('marks-obtained').value);
    const total = parseFloat(document.getElementById('total-marks').value);
    const resultBox = document.getElementById('grade-result');

    if (isNaN(obtained) || isNaN(total) || total <= 0) {
        alert("Please enter valid numbers for marks.");
        return;
    }

    const percentage = (obtained / total) * 100;
    let grade = 'F';

    // Standard GPA-style grading
    if (percentage >= 90) grade = 'A (Excellent)';
    else if (percentage >= 80) grade = 'B (Good)';
    else if (percentage >= 70) grade = 'C (Average)';
    else if (percentage >= 60) grade = 'D (Below Average)';

    document.getElementById('res-percentage').innerText = percentage.toFixed(2) + '%';
    document.getElementById('res-grade').innerText = grade;
    resultBox.classList.remove('hidden');
}

// --- 02. Pomodoro Timer ---
let timerInterval;
let timeLeft = 25 * 60; // 25 mins
let isRunning = false;
let sessionCount = 0;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer-display').innerText = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            alert("Pomodoro Session Complete! Time for a 5-minute break.");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = 25 * 60;
    updateTimerDisplay();
}

function logSession() {
    sessionCount++;
    document.getElementById('session-count').innerText = sessionCount;
}

// --- 03. Text Analyzer ---
const textInput = document.getElementById('text-input');
textInput.addEventListener('input', () => {
    const text = textInput.value;
    
    // Word Count
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    document.getElementById('word-count').innerText = words;

    // Character Count (including spaces)
    document.getElementById('char-count').innerText = text.length;

    // Reading Time (Average 200 words per minute)
    const timeInSeconds = Math.ceil((words / 200) * 60);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    document.getElementById('read-time').innerText = `${minutes}m ${seconds}s`;
});

// --- 04. Citation Formatter ---
function formatCitation(style) {
    const author = document.getElementById('cite-author').value || "Author";
    const year = document.getElementById('cite-year').value || "Year";
    const title = document.getElementById('cite-title').value || "Title";
    const source = document.getElementById('cite-source').value || "Source";
    
    let result = "";
    if (style === 'APA') {
        result = `${author} (${year}). <i>${title}</i>. ${source}.`;
    } else if (style === 'MLA') {
        result = `${author}. <i>${title}</i>. ${source}, ${year}.`;
    }

    const resBox = document.getElementById('cite-result');
    resBox.innerHTML = result;
    resBox.classList.remove('hidden');
}

// --- 05. Typing Speed Test ---
const typingInput = document.getElementById('typing-input');
const targetText = document.getElementById('target-text').innerText;
let startTime;

typingInput.addEventListener('input', () => {
    if (!startTime) startTime = new Date();
    
    const typed = typingInput.value;
    const timeElapsed = (new Date() - startTime) / 1000 / 60; // in minutes
    
    // WPM Calculation (Standard: 5 chars = 1 word)
    const wordsTyped = typed.length / 5;
    const wpm = Math.round(wordsTyped / timeElapsed) || 0;
    document.getElementById('typing-wpm').innerText = wpm;

    // Accuracy Calculation
    let correctChars = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === targetText[i]) correctChars++;
    }
    const accuracy = typed.length === 0 ? 100 : Math.round((correctChars / typed.length) * 100);
    document.getElementById('typing-acc').innerText = accuracy + "%";
});

function resetTypingTest() {
    typingInput.value = "";
    startTime = null;
    document.getElementById('typing-wpm').innerText = "0";
    document.getElementById('typing-acc').innerText = "100%";
}

function generateCertificate() {
    const wpm = document.getElementById('typing-wpm').innerText;
    const acc = document.getElementById('typing-acc').innerText;
    alert(`🎓 WPM CERTIFICATE\n\nDeveloper: KING_YOSEF_\nSpeed: ${wpm} WPM\nAccuracy: ${acc}\n\nGreat job! Take a screenshot to share.`);
}

// --- 06. Resume Builder ---
function generateCV() {
    document.getElementById('prev-name').innerText = document.getElementById('cv-name').value || "Your Name";
    document.getElementById('prev-role').innerText = document.getElementById('cv-role').value || "Job Title";
    document.getElementById('prev-email').innerText = document.getElementById('cv-email').value || "email@example.com";
    document.getElementById('prev-summary').innerText = document.getElementById('cv-summary').value || "Professional summary goes here.";

    const expText = document.getElementById('cv-experience').value;
    const expList = document.getElementById('prev-exp');
    expList.innerHTML = ""; 

    if (expText) {
        const lines = expText.split('\n');
        lines.forEach(line => {
            if (line.trim() !== "") {
                const li = document.createElement('li');
                li.innerText = line;
                expList.appendChild(li);
            }
        });
    }
}

// Initialize timer display on load
updateTimerDisplay();