const socket = io();

// DOM Elements
const grid = document.getElementById('grid');
const wordDisplay = document.getElementById('word-display');
const startButton = document.getElementById('start-button');
const timeSelect = document.getElementById('time-select');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score-display');
const wordList = document.getElementById('word-list');
const nameInput = document.getElementById('name-input');
const nameButton = document.getElementById('name-button');
const chopButton = document.getElementById('chop-button');
const refreshButton = document.getElementById('refresh-button');
const jokerGrid = document.getElementById('joker-grid');
const themeButtons = document.querySelectorAll('.theme-button');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const floatingSidebar = document.querySelector('.floating-sidebar');

// Game End Popup Elements
const gameEndPopup = document.getElementById('game-end-popup');
const gameResult = document.getElementById('game-result');
const finalScore = document.getElementById('final-score');
const playAgainBtn = document.getElementById('play-again-btn');

// Game Variables
let score = 0;
let timeLeft = 0;
let timer;
let selectedWord = [];
let letters = [];
let playerName = '';
let isGameStarted = false;
let refreshCount = 2;
let jokerCards = [];
let hasWildcard = false;
let gridLetters = [];
let wildcardUsed = false;
let dictionary = []; // Dictionary to store valid words
let foundWords = []; // Array to store found words

// Target score values
const targetScores = {
    '10': 1000,    // 30 seconds
    '300': 5000,   // 5 minutes
    '600': 10000,  // 10 minutes
    '900': 15000,  // 15 minutes
    '1200': 20000, // 20 minutes
    '1800': 30000, // 30 minutes
    '2100': 35000, // 35 minutes
    '2400': 40000, // 40 minutes
    '2700': 45000  // 45 minutes
};

// Theme switching functionality
function initializeThemeSwitcher() {
    // Check for saved theme
    const savedTheme = localStorage.getItem('sahibbaTheme') || 'wood';
    
    // Apply the saved theme
    applyTheme(savedTheme);
    
    // Set up event listeners for theme buttons
    themeButtons.forEach(button => {
        // Mark the button as active if it matches the current theme
        if (button.dataset.theme === savedTheme) {
            button.classList.add('active');
        }
        
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            applyTheme(theme);
            localStorage.setItem('sahibbaTheme', theme);
        });
    });
}

function applyTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove('theme-wood', 'theme-forest', 'theme-classic');
    
    // Add the selected theme class
    document.body.classList.add(`theme-${theme}`);
    
    // Update active button state
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        }
    });
}

// Initialize sidebar functionality
function initializeSidebar() {
    // Toggle sidebar when the toggle button is clicked
    sidebarToggle.addEventListener('click', () => {
        floatingSidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!floatingSidebar.contains(e.target) && floatingSidebar.classList.contains('active')) {
            floatingSidebar.classList.remove('active');
        }
    });
}

// Load the dictionary
function initializeGame() {
    fetch('dictionary.json')
        .then(response => response.json())
        .then(data => {
            // Convert dictionary to lowercase for consistent matching
            dictionary = data.map(word => word.toLowerCase());
            startButton.disabled = false; // Enable start button after dictionary loads
        })
        .catch(error => {
            console.error('Error loading dictionary:', error);
            alert('Kamus tidak dapat dimuatkan. Sila muat semula halaman.');
        });
    
    // Initialize theme switcher
    initializeThemeSwitcher();
    
    // Initialize sidebar functionality
    initializeSidebar();
}

// Generate letters with vowel control, adjusted frequencies, and wildcard
function generateLetters() {
    const vowels = 'aeiou';
    // Reduce frequency of V, Z, Q, X by 50%
    const frequentConsonants = 'bcdfghjklmnprst';
    const rareConsonants = 'vqxz';
    
    // Generate vowel count between 10-14 for balanced gameplay
    const vowelCount = Math.floor(Math.random() * 5) + 10;
    
    // New grid should reset wildcard status
    const addWildcard = Math.random() < 0.3; // 30% chance for wildcard
    
    // For a 6x6 grid, we need 36 letters
    const totalLetters = 36;
    const consonantCount = totalLetters - vowelCount - (addWildcard ? 1 : 0);

    let letters = [];
    
    // Add vowels
    for (let i = 0; i < vowelCount; i++) {
        letters.push(vowels[Math.floor(Math.random() * vowels.length)]);
    }
    
    // Add consonants with adjusted frequencies
    for (let i = 0; i < consonantCount; i++) {
        // 50% less chance for rare consonants
        if (Math.random() < 0.1) { // Only 10% chance to get a rare consonant
            letters.push(rareConsonants[Math.floor(Math.random() * rareConsonants.length)]);
        } else {
            letters.push(frequentConsonants[Math.floor(Math.random() * frequentConsonants.length)]);
        }
    }
    
    // Add wildcard if needed
    if (addWildcard) {
        letters.push('*');
        hasWildcard = true;
    } else {
        hasWildcard = false;
    }
    
    // Shuffle and create grid
    letters = letters.sort(() => Math.random() - 0.5);
    
    grid.innerHTML = letters.map(letter => {
        const isVowel = vowels.includes(letter);
        const isWildcard = letter === '*';
        return `<div class="${isVowel ? 'vowel' : ''} ${isWildcard ? 'wildcard' : ''}">
                  ${isWildcard ? '*' : letter}
                </div>`;
    }).join('');
    
    addLetterListeners();
}

// Handle wildcard usage
function handleWildcardUse() {
    hasWildcard = false;
    generateLetters(); // Regenerate letters with possible new wildcard
}

// Generate wildcard cards
function generateWildcardCards() {
    jokerGrid.innerHTML = '';
    jokerCards = [];
    for (let i = 0; i < 3; i++) {
        jokerGrid.innerHTML += `<div>*</div>`;
    }
    addWildcardListeners();
}

// Add click listeners to letters
function addLetterListeners() {
    const letterElements = document.querySelectorAll('.grid div');
    letterElements.forEach((letter) => {
        letter.addEventListener('click', () => {
            if (!letter.classList.contains('selected')) {
                selectedWord.push(letter.textContent || '*'); // Use '*' for wildcard
                updateWordDisplay();
                letter.classList.add('selected');
                letter.style.visibility = 'hidden'; // Hide selected letter
            }
        });
    });
}

// Add click listeners to wildcard cards
function addWildcardListeners() {
    const wildcardElements = document.querySelectorAll('.joker-grid div');
    wildcardElements.forEach((wildcard) => {
        wildcard.addEventListener('click', () => {
            selectedWord.push('*'); // Use '*' for wildcard
            updateWordDisplay();
            wildcard.remove();
        });
    });
}

// Update word display
function updateWordDisplay() {
    wordDisplay.innerHTML = selectedWord.map((letter) => `<div>${letter}</div>`).join('');
    addWordDisplayListeners();
    Sortable.create(wordDisplay, {
        animation: 150,
        onEnd: () => {
            selectedWord = Array.from(wordDisplay.children).map((child) => child.textContent);
        }
    });
}

// Add click listeners to word display letters
function addWordDisplayListeners() {
    const wordLetters = document.querySelectorAll('.word-display div');
    wordLetters.forEach((letter, index) => {
        letter.addEventListener('click', () => {
            const removedLetter = selectedWord.splice(index, 1)[0];
            updateWordDisplay();
            // Show the letter back in the grid
            const gridLetters = document.querySelectorAll('.grid div');
            gridLetters.forEach((gridLetter) => {
                if (gridLetter.textContent === removedLetter || (removedLetter === '*' && gridLetter.classList.contains('wildcard'))) {
                    gridLetter.style.visibility = 'visible';
                    gridLetter.classList.remove('selected');
                }
            });
        });
    });
}

// Function to show the end game popup
function showGameEndPopup() {
    // Set player's final score
    finalScore.textContent = score.toLocaleString();
    
    // Set game result text
    gameResult.textContent = 'GAME OVER!';
    
    // Show the popup
    gameEndPopup.style.display = 'flex';
}

// Event listeners for popup buttons
playAgainBtn.addEventListener('click', () => {
    // Just hide the popup instead of refreshing the page
    gameEndPopup.style.display = 'none';
    
    // Keep the game in a "completed" state
    // This ensures the user can still see their words but can't continue playing
});

// Start the timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Masa: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        if (timeLeft <= 60) {
            timerDisplay.classList.add('blink');
        }
        if (timeLeft === 0) {
            clearInterval(timer);
            
            // Remove the alert
            // alert('Masa tamat!');
            
            // Immediately update the word list before sending to server
            // This ensures the words are displayed even if server connection fails
            if (foundWords.length > 0) {
                wordList.innerHTML = '';
                foundWords.forEach(word => {
                    wordList.innerHTML += `<li>${word}</li>`;
                });
            }
            
            // Submit score to server
            submitScore();
            
            // Show the end game popup
            showGameEndPopup();
            
            // Disable game interactions
            chopButton.disabled = true;  // Disable check button
            refreshButton.disabled = true; // Disable refresh
            document.querySelectorAll('.grid div').forEach(letter => letter.style.pointerEvents = 'none'); // Disable letter clicks
        }
    }, 1000);
}

// Modified checkWord function with improved validation
function checkWord() {
    if (timeLeft <= 0) {  // ⛔ Prevent submission if time is up
        // Replace alert with popup
        // alert('Masa tamat! Anda tidak boleh menghantar jawapan lagi.');
        showGameEndPopup();
        
        // Disable game interactions
        chopButton.disabled = true;  // Disable check button
        refreshButton.disabled = true; // Disable refresh
        document.querySelectorAll('.grid div').forEach(letter => letter.style.pointerEvents = 'none'); // Disable letter clicks
        return;
    }

    const rawWord = selectedWord.join('');
    const sanitizedWord = rawWord.toLowerCase().replace(/[^a-z*]/gi, ''); // Remove non-alphabetic characters
    
    if (!sanitizedWord) {
        alert('Perkataan tidak sah: ' + rawWord);
        resetSelection();
        return;
    }

    // Convert wildcard '*' to regex pattern '.'
    const regexPattern = new RegExp(`^${sanitizedWord.replace(/\*/g, '.')}$`, 'i');

    // Check if the word is in the dictionary
    const isValid = dictionary.some(dictWord => {
        if (dictWord.length !== sanitizedWord.length) return false;
        return regexPattern.test(dictWord);
    });

    if (isValid) {
        // Update score and interface
        const wordScore = sanitizedWord.replace(/\*/g, '').length; // Count only non-wildcard letters
        score += wordScore; // Add to total score

        // Store found word with its score
        foundWords.push(`${rawWord} (+${wordScore} mark)`);

        // Update UI
        scoreDisplay.textContent = `Skor: ${score}`;
        wordList.innerHTML += `<li>${rawWord} (+${wordScore} mark)</li>`; // Show marks next to word
        
        function replaceUsedLetters() {
            const vowels = 'aeiou';
            const frequentConsonants = 'bcdfghjklmnprst';
            const rareConsonants = 'vqxz';
            const gridLetters = document.querySelectorAll('.grid div');
        
            gridLetters.forEach(letter => {
                if (letter.classList.contains('selected')) {
                    // Generate new letter (keep vowel/consonant balance)
                    const isVowelPosition = Math.random() < 0.4; // 40% chance for vowel
                    let newLetter;
                    
                    if (isVowelPosition) {
                        newLetter = vowels[Math.floor(Math.random() * vowels.length)];
                    } else {
                        // 50% less chance for rare consonants
                        if (Math.random() < 0.1) { // 10% chance for rare consonant
                            newLetter = rareConsonants[Math.floor(Math.random() * rareConsonants.length)];
                        } else {
                            newLetter = frequentConsonants[Math.floor(Math.random() * frequentConsonants.length)];
                        }
                    }
        
                    // Update the letter
                    letter.textContent = newLetter;
                    letter.className = isVowelPosition ? 'vowel' : '';
                    letter.classList.remove('selected');
                    letter.style.visibility = 'visible';
                }
            });
        
            // Re-add click listeners to new letters
            addLetterListeners();
        }
        
        replaceUsedLetters();
        // Do not regenerate wildcard cards to prevent them from resetting
    } else {
        alert('Perkataan tidak sah: ' + rawWord);
    }

    resetSelection();
}

// Function to reset selection
function resetSelection() {
    const gridLetters = document.querySelectorAll('.grid div');
    gridLetters.forEach(gridLetter => {
        if (gridLetter.classList.contains('selected')) {
            gridLetter.style.visibility = 'visible';
            gridLetter.classList.remove('selected');
        }
    });
    selectedWord = [];
    updateWordDisplay();
}

// Start the game
startButton.addEventListener('click', () => {
    if (!playerName) {
        alert('Sila masukkan nama anda.');
        return;
    }
    if (dictionary.length === 0) {
        alert('Kamus sedang dimuatkan. Sila cuba sebentar lagi.');
        return;
    }
    if (!isGameStarted) {
        timeLeft = parseInt(timeSelect.value);
        timeSelect.disabled = true;
        // Disable name input & button after game starts
        nameInput.disabled = true;
        nameButton.disabled = true;

        
        startTimer();
        generateLetters();
        generateWildcardCards();
        isGameStarted = true;
    }
});

// Refresh alphabet
refreshButton.addEventListener('click', () => {
    if (refreshCount > 0) {
        generateLetters();
        refreshCount--;
        refreshButton.textContent = `Refresh Alphabet (${refreshCount}x)`;
    } else {
        alert('Tiada lagi refresh tersedia.');
    }
});

// Submit score to server
function submitScore() {
    if (playerName) {
        socket.emit('submit-score', { 
            name: playerName, 
            score,
            words: foundWords // Send found words to server
        });
    }
}

// Update word list
socket.on('update-scores', (scores) => {
    // Always prioritize showing our own words first
    if (playerName && foundWords.length > 0) {
        // Use our local foundWords array as the source of truth
        wordList.innerHTML = '';
        foundWords.forEach(word => {
            wordList.innerHTML += `<li>${word}</li>`;
        });
        return; // Exit early - we're using our local data
    }
    
    // If we don't have local words, try to get them from the server
    if (scores[playerName] && scores[playerName].words && scores[playerName].words.length > 0) {
        const playerWords = scores[playerName].words;
        wordList.innerHTML = '';
        playerWords.forEach(word => {
            wordList.innerHTML += `<li>${word}</li>`;
        });
    } else {
        // Fallback display if no words are found for this player
        wordList.innerHTML = '';
        // Just show the current player's score if no words are available
        if (playerName && score > 0) {
            wordList.innerHTML = `<li>${playerName}: ${score}</li>`;
        }
    }
});

// Handle name submission
nameButton.addEventListener('click', () => {
    if (isGameStarted) {  
        // ⛔ Prevent name change if game started
        alert('Anda tidak boleh menukar nama selepas permainan bermula!');
        return;
    }
    const name = nameInput.value.trim();
    if (name) {
        playerName = name;
        alert(`Nama anda: ${playerName}`);
    } else {
        alert('Sila masukkan nama anda.');
    }
});

// Handle CHOPP button
chopButton.addEventListener('click', checkWord);

// Initialize the game when the page loads
initializeGame();