package com.nxtLife.msil.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    @Value("${spring.datasource.driver-class-name}")
    private String databseDriverClassName;

    @Value("${spring.datasource.url}")
    private String datasourceUrl;

    @Value("${spring.datasource.username}")
    private String databaseUsername;

    @Value("${spring.datasource.password}")
    private String databasePassword;

    @Value("${spring.datasource.hikari-maximum-pool-size}")
    private int maximumPoolSize;

    @Bean(name = "dataSource")
    public DataSource dataSource(){
        final HikariDataSource ds = new HikariDataSource();
        ds.setMaximumPoolSize(maximumPoolSize);
        ds.setJdbcUrl(datasourceUrl);
        ds.setDriverClassName(databseDriverClassName);
        ds.setUsername(databaseUsername);
        ds.setPassword(databasePassword);

        return ds;
    }
}
