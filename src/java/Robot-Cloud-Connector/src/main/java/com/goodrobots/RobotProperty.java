package com.goodrobots;

/**
 * Created with IntelliJ IDEA.
 * User: scott
 * Date: 8/15/14
 * Time: 5:14 PM
 * To change this template use File | Settings | File Templates.
 */
public class RobotProperty<DataType> {

    private String id;
    private String name;
    private String description;

    private DataType data;

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

    public DataType getData() {
        return data;
    }

    public void setData(DataType data) {
        this.data = data;
    }
}
