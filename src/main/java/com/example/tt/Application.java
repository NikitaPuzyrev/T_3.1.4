package com.example.tt;

import com.example.tt.configs.MvcConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
/*
    AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(MvcConfig.class);
        SpringApplication.run(Application.class, args);
        Communication communication = context.getBean("communication", Communication.class);
        List<User> allUsers = communication.getAllUsers();
        System.out.println(allUsers);*/
