package com.example.sakhi.dao;

import com.example.sakhi.model.User;

public interface UserDAO {

    User save(User user);

    User findByEmail(String email);

    User findById(Long id);

    boolean existsByEmail(String email);
}