// game.js

// Game state management
const gameState = {
    players: [],
    rooms: [],
    voting: [],
    chat: [],
    timer: null,
    winner: null,
};

// Room creation
function createRoom(roomName) {
    const room = { name: roomName, players: [], state: 'waiting' };
    gameState.rooms.push(room);
    return room;
}

// Voting system
function startVoting() {
    gameState.voting = [];  // reset previous votes
    gameState.rooms.forEach(room => {
        if (room.state === 'playing') {
            room.state = 'voting';
        }
    });
}

function castVote(playerId, voteForId) {
    if (!gameState.voting.includes(playerId)) {
        gameState.voting.push({ voter: playerId, voteFor: voteForId });
    }
}

function endVoting() {
    const votesCount = gameState.voting.reduce((acc, vote) => {
        acc[vote.voteFor] = (acc[vote.voteFor] || 0) + 1;
        return acc;
    }, {});
    const winner = Object.keys(votesCount).reduce((a, b) => votesCount[a] > votesCount[b] ? a : b);
    gameState.winner = winner;
}

// Chat functionality
function sendMessage(playerId, message) {
    const chatMessage = { playerId, message, time: new Date() };
    gameState.chat.push(chatMessage);
}

// Timer functionality
function startTimer(duration) {
    gameState.timer = duration;
    const interval = setInterval(() => {
        if (gameState.timer > 0) {
            gameState.timer--;
        } else {
            clearInterval(interval);
            endVoting();
        }
    }, 1000);
}

// Winner screen
function displayWinner() {
    if (gameState.winner) {
        console.log(`The winner is: ${gameState.winner}`);
    } else {
        console.log('No winner yet.');
    }
}

// Export the functions for use in other modules
module.exports = {
    createRoom,
    startVoting,
    castVote,
    endVoting,
    sendMessage,
    startTimer,
    displayWinner,
};
