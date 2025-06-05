document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    let snake = [{x: 10, y: 10}];
    let food = {x: 5, y: 5};
    let xVelocity = 0;
    let yVelocity = 0;
    let score = 0;
    let gameRunning = false;
    let gamePaused = false;
    let gameLoop;
    
    // Draw functions
    function drawSnake() {
        ctx.fillStyle = '#2e7d32';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
            ctx.strokeRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });
    }
    
    function drawFood() {
        ctx.fillStyle = '#d32f2f';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }
    
    function moveSnake() {
        const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
        
        // Check wall collision
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            gameOver();
            return;
        }
        
        // Check self collision
        for (let i = 0; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver();
                return;
            }
        }
        
        snake.unshift(head);
        
        // Check food collision
        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreElement.textContent = score;
            generateFood();
        } else {
            snake.pop();
        }
    }
    
    function generateFood() {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        
        // Make sure food doesn't appear on snake
        for (let i = 0; i < snake.length; i++) {
            if (food.x === snake[i].x && food.y === snake[i].y) {
                generateFood();
                return;
            }
        }
    }
    
    function gameOver() {
        clearInterval(gameLoop);
        gameRunning = false;
        startBtn.textContent = 'Start Game';
        pauseBtn.disabled = true;
        alert(`Game Over! Your score: ${score}`);
    }
    
    function gameUpdate() {
        if (gamePaused) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
        moveSnake();
    }
    
    // Event listeners
    document.addEventListener('keydown', (e) => {
        if (!gameRunning) return;
        
        switch(e.key) {
            case 'ArrowUp':
                if (yVelocity !== 1) {
                    xVelocity = 0;
                    yVelocity = -1;
                }
                break;
            case 'ArrowDown':
                if (yVelocity !== -1) {
                    xVelocity = 0;
                    yVelocity = 1;
                }
                break;
            case 'ArrowLeft':
                if (xVelocity !== 1) {
                    xVelocity = -1;
                    yVelocity = 0;
                }
                break;
            case 'ArrowRight':
                if (xVelocity !== -1) {
                    xVelocity = 1;
                    yVelocity = 0;
                }
                break;
            case ' ':
                togglePause();
                break;
        }
    });
    
    startBtn.addEventListener('click', () => {
        if (gameRunning) {
            // Reset game
            clearInterval(gameLoop);
            snake = [{x: 10, y: 10}];
            xVelocity = 0;
            yVelocity = 0;
            score = 0;
            scoreElement.textContent = score;
            generateFood();
            gameRunning = false;
            gamePaused = false;
            startBtn.textContent = 'Start Game';
            pauseBtn.textContent = 'Pause';
            pauseBtn.disabled = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
            // Start game
            gameRunning = true;
            startBtn.textContent = 'Reset Game';
            pauseBtn.disabled = false;
            gameLoop = setInterval(gameUpdate, 100);
        }
    });
    
    pauseBtn.addEventListener('click', togglePause);
    
    function togglePause() {
        gamePaused = !gamePaused;
        pauseBtn.textContent = gamePaused ? 'Resume' : 'Pause';
    }
    
    // Initial draw
    drawSnake();
    drawFood();
});