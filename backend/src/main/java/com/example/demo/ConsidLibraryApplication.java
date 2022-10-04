package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.gson.GsonProperties;
import org.springframework.http.converter.json.GsonBuilderUtils;

@SpringBootApplication
@SpringBootConfiguration
public class ConsidLibraryApplication {



	public static void main(String[] args) {
		SpringApplication.run(ConsidLibraryApplication.class, args);

		System.out.println("Test");
	}

}
