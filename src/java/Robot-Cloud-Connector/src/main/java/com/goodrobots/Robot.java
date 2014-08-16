package com.goodrobots;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: scott
 * Date: 8/15/14
 * Time: 5:12 PM
 * To change this template use File | Settings | File Templates.
 */
public class Robot {

    private String id;
    private String name;
    private String description;
    private List<RobotProperty> properties;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<RobotProperty> getProperties() {
        return properties;
    }

    public void setProperties(List<RobotProperty> properties) {
        this.properties = properties;
    }
}
