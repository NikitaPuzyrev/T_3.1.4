package com.example.tt.controller;

import com.example.tt.model.User;
import com.example.tt.service.UserDetailsServiceImpl;
import com.example.tt.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.security.Principal;

@Controller
public class UserController {


    public UserController(UserDetailsServiceImpl userService) {
        this.userService = userService;
    }

    private final UserDetailsServiceImpl userService;

    @GetMapping("userPage/{id}")
    public String updatePageForm(@PathVariable("id") int id, Model model) {
        User user = userService.findUserById(id);
        model.addAttribute("user", user);
        return "/userPage";
    }


    @GetMapping("myPage")
    public String pageUserForm(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        return "redirect:/userPage/" + user.getId();
    }
}
