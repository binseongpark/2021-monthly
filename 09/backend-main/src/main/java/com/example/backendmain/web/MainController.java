package com.example.backendmain.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {
    @GetMapping(value = { "/", "/main", "yesno"})
    public String entry() {
        return "index";
    }

    @GetMapping("/ping")
    @ResponseBody
    public String ping() {
        return "pong";
    }
}
