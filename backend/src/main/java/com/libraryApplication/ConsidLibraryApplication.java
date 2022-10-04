package com.libraryApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@SpringBootConfiguration
public class ConsidLibraryApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConsidLibraryApplication.class, args);

		System.out.println("Test");
	}

}
