package com.example.tt.configs;

import com.example.tt.model.Role;
import com.example.tt.model.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class SuccessUserHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException {
        User principal = (User) authentication.getPrincipal();

        Set<Role> rol = principal.getRoles();
        List<String> roles = rol.stream().map(Role::toString).collect(Collectors.toList());
        if (roles.contains("ROLE_ADMIN")) {
            httpServletResponse.sendRedirect("/index");
        } else if (roles.contains("ROLE_USER")) {
            httpServletResponse.sendRedirect("/myPage");
        } else {
            httpServletResponse.sendRedirect("/start");
        }
    }
}

