package com.example.sakhi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SakhiApplication {

    public static void main(String[] args) {

        SpringApplication.run(
                SakhiApplication.class,
                args
        );

        System.out.println("================================");
        System.out.println("       SAKHI BACKEND STARTED");
        System.out.println("       Port: 8081");
        System.out.println("================================");
    }
}