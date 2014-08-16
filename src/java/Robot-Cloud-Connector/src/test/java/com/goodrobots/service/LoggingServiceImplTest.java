package com.goodrobots.service;

import com.goodrobots.Account;
import com.goodrobots.Log;
import com.goodrobots.Robot;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertNotNull;

/**
 * Created with IntelliJ IDEA.
 * User: scott
 * Date: 8/16/14
 * Time: 3:41 PM
 * To change this template use File | Settings | File Templates.
 */
public class LoggingServiceImplTest {

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

        Log log = new Log();
        log.setMessage("Test log message.");

        Robot robot = new RobotServiceImpl().getById("869abb61-0c48-d387-9a93-91ad58a6c984");

        Log responseLog = new LoggingServiceImpl().create(robot, log);

        assertEquals(log.getMessage(), responseLog.getMessage());

    }
}
