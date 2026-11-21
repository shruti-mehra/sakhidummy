package com.example.sakhi.service;

import com.example.sakhi.dao.UserDAO;
import com.example.sakhi.dto.LoginRequest;
import com.example.sakhi.dto.RegisterRequest;
import com.example.sakhi.model.User;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserDAO userDAO;

    public AuthService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User register(RegisterRequest request) {

        if (userDAO.existsByEmail(request.getEmail())) {
            throw new RuntimeException(
                    "Email already registered"
            );
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());

        /*
         * Temporary.
         *
         * Password hashing/security will be implemented
         * in the authentication stage.
         */
        user.setPassword(request.getPassword());

        return userDAO.save(user);
    }

    public User login(LoginRequest request) {

        User user = userDAO.findByEmail(
                request.getEmail()
        );

        if (user == null) {
            throw new RuntimeException(
                    "User not found"
            );
        }

        if (!user.getPassword().equals(
                request.getPassword()
        )) {
            throw new RuntimeException(
                    "Invalid password"
            );
        }

        return user;
    }
}