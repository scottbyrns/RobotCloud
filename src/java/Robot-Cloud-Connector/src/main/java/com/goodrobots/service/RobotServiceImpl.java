package com.goodrobots.service;

import com.goodrobots.Robot;
import com.goodrobots.Server;
import com.scottbyrns.api.client.APIClient;
import com.scottbyrns.api.client.APIRequest;
import com.scottbyrns.api.client.APIResponse;
import com.scottbyrns.api.client.RequestType;
import com.scottbyrns.utilities.FatalMappingException;
import com.scottbyrns.utilities.JSONObjectMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static junit.framework.Assert.fail;

/**
 * Created with IntelliJ IDEA.
 * User: scott
 * Date: 8/16/14
 * Time: 1:56 PM
 * To change this template use File | Settings | File Templates.
 */
public class RobotServiceImpl implements RobotService {

    private final String ROBOT_CREATE = "/robot/create";
    private final String ROBOT_GET_BY_ID = "/robot/id";
    private final String ROBOT_LIST = "/robots/list";

    @Override
    public Robot create(Robot robot) {

        APIRequest geocoderApiRequest = new APIRequest(ROBOT_CREATE);
        /*
            Null pointer when no request url is set.
            geocoderApiRequest.setRequestUrl("");
         */

        geocoderApiRequest.setRequestType(RequestType.JSON_POST);

        geocoderApiRequest.addRequestParameter("address", "280 N 8th St. Boise, Idaho");
        geocoderApiRequest.addRequestParameter("sensor", "false");

        try {
            APIClient.getInstance().makeRequest(geocoderApiRequest);
        }
        catch (NullPointerException e) {
            fail("A null pointer was thrown when attempting to make the api request.");
        }


        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<Robot> list() {

        APIRequest apiRequest = new APIRequest(Server.PATH);
        apiRequest.setRequestUrl(ROBOT_LIST);

        apiRequest.setRequestType(RequestType.JSON_POST);


        Map<String, String> payloadMap = new HashMap<String, String>();
        payloadMap.put("username", new AccountServiceImpl().getUsername());

        String payload = "";

        try {
            payload = JSONObjectMapper.convertEntityToJSON(payloadMap);
        }
        catch (FatalMappingException e) {
            e.printStackTrace();
        }

        apiRequest.addRequestParameter(APIRequest.JSON_DATA, payload);


        try {
            APIResponse<ArrayList<Robot>> response = (APIResponse<ArrayList<Robot>>)APIClient.getInstance().<ArrayList<Robot>>makeRequest(apiRequest);
            return response.getResponseEntity(ArrayList.class);
        }
        catch (IllegalArgumentException e) {
            fail("An illigal argument exception was thrown.");
        }


        return null;
    }

    @Override
    public Robot getById(String id) {


        APIRequest apiRequest = new APIRequest(Server.PATH);
        apiRequest.setRequestUrl(ROBOT_GET_BY_ID);

        apiRequest.setRequestType(RequestType.JSON_POST);

        Map<String, String> payloadMap = new HashMap<String, String>();
        payloadMap.put("id", id);

        String payload = "";

        try {
            payload = JSONObjectMapper.convertEntityToJSON(payloadMap);
        }
        catch (FatalMappingException e) {
            e.printStackTrace();
        }

        apiRequest.addRequestParameter(APIRequest.JSON_DATA, payload);


        try {
            APIResponse<Robot> response = (APIResponse<Robot>)APIClient.getInstance().<Robot>makeRequest(apiRequest);
            return response.getResponseEntity(Robot.class);
        }
        catch (IllegalArgumentException e) {
            fail("An illigal argument exception was thrown.");
        }


        return null;
    }

    @Override
    public Robot update(Robot robot) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Robot delete(Robot robot) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }
}
