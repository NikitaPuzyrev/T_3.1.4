package com.example.tt.ExeptionHandler;

import org.springframework.dao.DataIntegrityViolationException;

public class UserWithSuchLoginExist extends DataIntegrityViolationException {
    public UserWithSuchLoginExist(String msg) {
        super(msg);
    }
}
