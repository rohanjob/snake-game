package com.example.snake;

public class GameState {
    private int score;
    private int[][] snake;
    private int[] food;
    private boolean gameOver;
    
    // Getters and setters
    public int getScore() {
        return score;
    }
    
    public void setScore(int score) {
        this.score = score;
    }
    
    public int[][] getSnake() {
        return snake;
    }
    
    public void setSnake(int[][] snake) {
        this.snake = snake;
    }
    
    public int[] getFood() {
        return food;
    }
    
    public void setFood(int[] food) {
        this.food = food;
    }
    
    public boolean isGameOver() {
        return gameOver;
    }
    
    public void setGameOver(boolean gameOver) {
        this.gameOver = gameOver;
    }
}