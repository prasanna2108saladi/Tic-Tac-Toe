// Tic Tac Toe Game Logic
class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = {
            X: 0,
            O: 0
        };
        
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.statusElement = document.getElementById('status');
        this.restartBtn = document.getElementById('restart-btn');
        this.resetScoreBtn = document.getElementById('reset-score-btn');
        
        this.addEventListeners();
        this.updateStatus();
        this.updateScoreDisplay();
    }
    
    addEventListeners() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });
        
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.resetScoreBtn.addEventListener('click', () => this.resetScore());
    }
    
    handleCellClick(cell) {
        const cellIndex = parseInt(cell.getAttribute('data-cell'));
        
        if (this.board[cellIndex] !== '' || !this.gameActive) {
            return;
        }
        
        // Add click animation
        cell.classList.add('clicked');
        setTimeout(() => cell.classList.remove('clicked'), 300);
        
        // Update board
        this.board[cellIndex] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        
        // Check for win or draw
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
    }
    
    checkWin() {
        return this.winningConditions.some(condition => {
            return condition.every(index => {
                return this.board[index] === this.currentPlayer;
            });
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScoreDisplay();
        
        // Highlight winning cells
        this.highlightWinningCells();
        
        this.statusElement.textContent = `Player ${this.currentPlayer} wins!`;
        this.statusElement.className = 'alert alert-success text-center';
        
        // Add game over class
        document.querySelector('.game-board').classList.add('game-over');
    }
    
    handleDraw() {
        this.gameActive = false;
        
        this.statusElement.textContent = "It's a draw!";
        this.statusElement.className = 'alert alert-warning text-center';
        
        // Add game over class
        document.querySelector('.game-board').classList.add('game-over');
    }
    
    highlightWinningCells() {
        this.winningConditions.forEach(condition => {
            if (condition.every(index => this.board[index] === this.currentPlayer)) {
                condition.forEach(index => {
                    this.cells[index].classList.add('winning');
                });
            }
        });
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus();
    }
    
    updateStatus() {
        this.statusElement.textContent = `Player ${this.currentPlayer}'s turn`;
        this.statusElement.className = 'alert alert-info text-center';
    }
    
    updateScoreDisplay() {
        document.getElementById('score-x').textContent = this.scores.X;
        document.getElementById('score-o').textContent = this.scores.O;
    }
    
    restartGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        // Clear board
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        // Remove game over class
        document.querySelector('.game-board').classList.remove('game-over');
        
        this.updateStatus();
    }
    
    resetScore() {
        this.scores = { X: 0, O: 0 };
        this.updateScoreDisplay();
        this.restartGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});

// Add some fun features
document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key >= '1' && e.key <= '9') {
            const cellIndex = parseInt(e.key) - 1;
            const cell = document.querySelector(`[data-cell="${cellIndex}"]`);
            if (cell) {
                cell.click();
            }
        }
        
        // Restart game with 'r' key
        if (e.key.toLowerCase() === 'r') {
            document.getElementById('restart-btn').click();
        }
    });
    
    // Add hover sound effect (optional)
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            // You can add a subtle hover effect here
            cell.style.transform = 'scale(1.05)';
        });
        
        cell.addEventListener('mouseleave', () => {
            cell.style.transform = 'scale(1)';
        });
    });
});
