package com.goodrobots;

/**
 * Created with IntelliJ IDEA.
 * User: scott
 * Date: 8/16/14
 * Time: 2:34 PM
 * To change this template use File | Settings | File Templates.
 */
public class Account {

    private String username;
    private String password;
    private String name;
    private String email;
    private String token;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
