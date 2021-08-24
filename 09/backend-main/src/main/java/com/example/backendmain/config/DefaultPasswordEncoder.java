package com.example.backendmain.config;

import org.springframework.security.crypto.password.PasswordEncoder;

public class DefaultPasswordEncoder implements PasswordEncoder {
    @Override
    public String encode(CharSequence charSequence) {
        return null;
    }

    @Override
    public boolean matches(CharSequence charSequence, String s) {
//        return false;

        return true;
    }
}
