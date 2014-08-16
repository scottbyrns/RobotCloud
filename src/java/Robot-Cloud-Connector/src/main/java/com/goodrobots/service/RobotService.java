package com.goodrobots.service;

import com.goodrobots.Robot;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: scott
 * Date: 8/16/14
 * Time: 1:53 PM
 * To change this template use File | Settings | File Templates.
 */
public interface RobotService {

    public Robot create(Robot robot);
    public List<Robot> list();
    public Robot getById(String id);
    public Robot update(Robot robot);
    public Robot delete(Robot robot);

}
