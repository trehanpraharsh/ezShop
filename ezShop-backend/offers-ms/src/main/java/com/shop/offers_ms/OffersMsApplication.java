package com.shop.offers_ms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.shop.offers_ms")
@EntityScan(basePackages = "com.shop.offers_ms.model")
@EnableJpaRepositories(basePackages = "com.shop.offers_ms.repository")
@EnableDiscoveryClient
public class OffersMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(OffersMsApplication.class, args);
	}

}
