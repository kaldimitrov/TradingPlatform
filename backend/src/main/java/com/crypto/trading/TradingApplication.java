package com.crypto.trading;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.crypto.trading")
public class TradingApplication {
	public static void main(String[] args) {
		SpringApplication.run(TradingApplication.class, args);
	}

}
