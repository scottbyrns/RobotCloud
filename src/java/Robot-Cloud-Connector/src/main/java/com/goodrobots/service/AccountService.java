package com.goodrobots.service;

import com.goodrobots.Account;

/**
 * Created with IntelliJ IDEA.
 * User: scott
 * Date: 8/16/14
 * Time: 2:33 PM
 * To change this template use File | Settings | File Templates.
 */
public interface AccountService {

    public Account create (Account account);
    public Account login (String username, String password);
    public String getToken();
    public String getUsername();

}
