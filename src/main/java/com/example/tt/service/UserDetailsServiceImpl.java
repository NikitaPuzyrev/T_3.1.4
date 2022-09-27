package com.example.tt.service;

import com.example.tt.ExeptionHandler.NoUserWithSuchLogin;
import com.example.tt.dao.UserDao;
import com.example.tt.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service

public class UserDetailsServiceImpl implements UserService, UserDetailsService {

    private final UserDao userDao;
    private final SecurityService securityService;

    @Autowired
    public UserDetailsServiceImpl(UserDao userDao, SecurityService securityService) {
        this.userDao = userDao;
        this.securityService = securityService;
    }

    @Override
    public User findByUsername(String username) {

        try {
            return userDao.findByUsername(username);
        } catch (Exception e) {
            throw new NoUserWithSuchLogin("There is not user with such login");
        }
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userDao.findByUsername(s);
    }

    @Override
    @Transactional
    public void addNewUser(User user) {
        user.setPassword(securityService.getCrypt(user.getPassword()));
        userDao.saveUser(user);
    }

    @Override
    public Set<User> findAllUsers() {
        return userDao.getAllUsers().stream()
                .sorted(Comparator.comparing(User::getId))
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    @Override
    @Transactional
    public void updateUser(User user) {
        user.setPassword(securityService.getCrypt(user.getPassword()));
        userDao.saveUser(user);
    }

    @Override
    public User findUserById(int id) {
        return userDao.findById(id);
    }

    @Override
    @Transactional
    public void deleteUserById(int id) {
        userDao.deleteById(id);
    }

}
