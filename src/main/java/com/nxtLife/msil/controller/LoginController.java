package com.nxtLife.msil.controller;

import com.nxtLife.msil.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/")
//public class LoginController {
//
//    @Autowired
//    UserService userService;
//
//    @PostMapping("login")
//    public UserDetails login(@RequestParam("user") String user, @RequestParam("password") String password){
//        UserDetails details=userService.loadUserByUsername(user);
//        return details;
//    }
//}
