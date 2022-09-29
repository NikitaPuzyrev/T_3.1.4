package com.example.tt.controller;

import com.example.tt.model.User;
import com.example.tt.service.UserDetailsServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class AdminController {


    public AdminController(UserDetailsServiceImpl userService) {
        this.userService = userService;
    }

    private final UserDetailsServiceImpl userService;

    @GetMapping("/index")
    public String findAllUser(Principal principal, Model model) {
        User us = userService.findByUsername(principal.getName());
        model.addAttribute("user", us);
        return "/index";
    }
}