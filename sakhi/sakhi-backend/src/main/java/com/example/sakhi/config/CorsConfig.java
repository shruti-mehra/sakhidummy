package com.example.sakhi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsConfig {

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public CorsFilter corsFilter() {

        CorsConfiguration config = new CorsConfiguration();

        List<String> origins = new ArrayList<>();

origins.add("http://localhost:5173");

String frontendUrl = System.getenv("FRONTEND_URL");

if (frontendUrl != null && !frontendUrl.isBlank()) {
    origins.add(frontendUrl);
}

        config.setAllowedOrigins(
                Arrays.asList(
                        "http://localhost:5173",
                         System.getenv("FRONTEND_URL")
                )
        );

        config.setAllowedMethods(
                Arrays.asList(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        config.setAllowedHeaders(
                Arrays.asList("*")
        );

        
        config.setAllowCredentials(false);

        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                config
        );

        return new CorsFilter(source);
    }
}