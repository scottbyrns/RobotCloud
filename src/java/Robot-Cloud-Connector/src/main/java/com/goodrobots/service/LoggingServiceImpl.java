package com.goodrobots.service;

import com.goodrobots.Log;
import com.goodrobots.Robot;
import com.goodrobots.Server;
import com.scottbyrns.api.client.APIClient;
import com.scottbyrns.api.client.APIRequest;
import com.scottbyrns.api.client.APIResponse;
import com.scottbyrns.api.client.RequestType;
import com.scottbyrns.utilities.FatalMappingException;
import com.scottbyrns.utilities.JSONObjectMapper;

import java.util.HashMap;
import java.util.Map;

import static junit.framework.Assert.fail;

/**
 * Created with IntelliJ IDEA.
 * User: scott
 * Date: 8/16/14
 * Time: 3:27 PM
 * To change this template use File | Settings | File Templates.
 */
public class LoggingServiceImpl implements LoggingService {

    private static final String LOG_CREATE = "/robot/log/create";

    @Override
    public Log create(Robot robot, Log log) {


        APIRequest apiRequest = new APIRequest(Server.PATH);
        apiRequest.setRequestUrl(LOG_CREATE);

        apiRequest.setRequestType(RequestType.JSON_POST);

        Map<String, Object> payloadMap = new HashMap<String, Object>();


        String payload = "";

        try {
            payloadMap.put("token", new AccountServiceImpl().getToken());
            payloadMap.put("robot", (robot));
            payloadMap.put("log", (log));
            payload = JSONObjectMapper.convertEntityToJSON(payloadMap);
        }
        catch (FatalMappingException e) {
            e.printStackTrace();
        }

        apiRequest.addRequestParameter(APIRequest.JSON_DATA, payload);


        try {
            APIResponse<Log> response = (APIResponse<Log>) APIClient.getInstance().<Log>makeRequest(apiRequest);
            return response.getResponseEntity(Log.class);
        }
        catch (IllegalArgumentException e) {
            fail("An illigal argument exception was thrown.");
        }


        return null;
    }
}
