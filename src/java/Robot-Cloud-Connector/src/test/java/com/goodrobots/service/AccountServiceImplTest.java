package com.goodrobots.service;

import com.goodrobots.Account;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static junit.framework.Assert.assertNotNull;

/**
 * Created with IntelliJ IDEA.
 * User: scott
 * Date: 8/16/14
 * Time: 3:30 PM
 * To change this template use File | Settings | File Templates.
 */
public class AccountServiceImplTest {
    @Before
    public void setUp() throws Exception {

    }

    @After
    public void tearDown() throws Exception {

    }

    @Test
    public void testCreate() throws Exception {

    }

    @Test
    public void testLogin() throws Exception {

        Account account = new AccountServiceImpl().login("scottbyrns", "password");
        assertNotNull(account.getToken());

    }

    @Test
    public void testGetToken() throws Exception {
        Account account = new AccountServiceImpl().login("scottbyrns", "password");
        assertNotNull(account.getToken());

        assertNotNull(new AccountServiceImpl().getToken());
    }
}
