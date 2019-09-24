package com.nxtLife.msil.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;

@EnableWebSecurity
@Configuration
@Order(SecurityProperties.BASIC_AUTH_ORDER)
@Import(Encoders.class)
public class ServerSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
//        auth.inMemoryAuthentication()
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.csrf().disable().anonymous().disable().authorizeRequests()
         .antMatchers("/login").permitAll()
                .antMatchers("/oauth/token").permitAll().and().formLogin();
    }


//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .authorizeRequests().anyRequest()
////                .fullyAuthenticated()
//                .permitAll()
//                .and().httpBasic();
//    }
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//         auth.inMemoryAuthentication().withUser("nxtLife").password("{noop}msil").roles("ADMIN");
//    }
}
