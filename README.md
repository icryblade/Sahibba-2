# Sahibba Word Game

A word-building game with a beautiful wooden block theme and responsive design.

## Features

- 6x6 letter grid with 36 letter tiles
- Multiple theme options (Wood, Forest, Classic)
- Adjustable game timers
- Word validation against dictionary
- Wildcard jokers to replace any letter
- Responsive design for all device sizes
- Drag-and-drop word building
- Redesigned UI with improved accessibility
- Game end popup with score summary
- Words found during gameplay are saved and displayed
- Sliding sidebar for theme selection and reporting issues

## Technical Improvements

- Adjusted letter frequencies (V, Z, Q, X have 50% reduced frequency)
- Improved responsive layout for mobile and tablet
- Multiple theme options with customized colors and textures
- Theme preferences saved to local storage
- Smooth animations and transitions
- Interactive letter tiles with visual feedback
- Improved CHOP button placement next to word display
- Floating sidebar for game settings and report options
- Legal footer with copyright information
- Game completion state that preserves found words

## Installation

1. Make sure Node.js is installed on your system
2. Clone or download this repository
3. Navigate to the project directory
4. Install dependencies:

```bash
npm install
```

## Running the Game

1. Start the server:

```bash
npm start
```

2. Open your browser and visit:

```
http://localhost:3000
```

## Development Mode

Run the server with automatic restart on file changes:

```bash
npm run dev
```

## How to Play

1. Enter your name and click "Hantar"
2. Select a game duration from the dropdown
3. Click "Mula" to start the game
4. Click on letters to form words
5. Click "CHOP" to submit your word (conveniently located next to word display)
6. Use wildcards to replace any letter
7. Check your score and word list on the side panel
8. After game ends, review all your found words

## Customization

- Click the sidebar toggle on the right side of the screen
- Select from three beautiful themes:
  - Wood: Classic wooden board game look
  - Forest: Nature-inspired green theme
  - Classic: Clean blue and white theme

## Word Dictionary

The game validates words against a built-in dictionary. Valid words score points based on their length.

## Feedback and Issues

Click the "Lapor Masalah" button in the sidebar to report any issues or provide feedback.

## Legal

All design and code components of this website are © 2025 JACKIE WONG SING QIE. All rights reserved. 