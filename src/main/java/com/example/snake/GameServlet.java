package com.example.snake;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/api/game")
public class GameServlet extends HttpServlet {
    private GameState gameState = new GameState();
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.getWriter().write(objectMapper.writeValueAsString(gameState));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        GameState newState = objectMapper.readValue(req.getReader(), GameState.class);
        this.gameState = newState;
        resp.setStatus(HttpServletResponse.SC_OK);
    }
}