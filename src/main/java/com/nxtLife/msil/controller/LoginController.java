package com.nxtLife.msil.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    @PostMapping()
    public String login(@RequestParam("user") String user,@RequestParam("password") String password){
        return "Hello World";
    }
}
