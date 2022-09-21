package com.example.tt.dao;

import com.example.tt.model.User;

import java.util.List;

public interface UserDao {
    List<User> getAllUsers();

    User findById(int id);

    void saveUser(User user);

    void deleteById(int id);

    User findByUsername(String username);
}