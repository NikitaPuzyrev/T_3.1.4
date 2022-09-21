package com.example.tt.service;

import com.example.tt.model.User;


import java.util.Set;

public interface UserService {
    User findByUsername(String username);
    void addNewUser(User user);
    Set<User> findAllUsers();
    User findUserById(int id);
    void deleteUserById(int id);
    void updateUser(User user);

}
