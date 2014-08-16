package com.goodrobots.service;

import com.goodrobots.Account;
import com.goodrobots.Robot;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static junit.framework.Assert.assertNotNull;
import static junit.framework.Assert.assertTrue;

/**
 * Created with IntelliJ IDEA.
 * User: scott
 * Date: 8/16/14
 * Time: 2:40 PM
 * To change this template use File | Settings | File Templates.
 */
public class RobotServiceTest {
    @Before
    public void setUp() throws Exception {
        Account account = new AccountServiceImpl().login("scottbyrns", "password");
        assertNotNull(account.getToken());
    }

    @After
    public void tearDown() throws Exception {

    }

    @Test
    public void testCreate() throws Exception {

    }

    @Test
    public void testGetById() throws Exception {
        Robot robot = new RobotServiceImpl().getById("869abb61-0c48-d387-9a93-91ad58a6c984");
        robot.getName();
    }

    @Test
    public void testUpdate() throws Exception {

    }

    @Test
    public void testList() throws Exception {
        List<Robot> list = new RobotServiceImpl().list();
        assertTrue(list.size() > 0);
    }

    @Test
    public void testDelete() throws Exception {

    }
}
