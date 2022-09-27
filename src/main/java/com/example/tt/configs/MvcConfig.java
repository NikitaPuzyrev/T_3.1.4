package com.example.tt.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
@Configuration
@ComponentScan
public class MvcConfig implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("login");
   //     registry.addViewController("/user").setViewName("user");
        registry.addViewController("/start").setViewName("start");
    }
    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
