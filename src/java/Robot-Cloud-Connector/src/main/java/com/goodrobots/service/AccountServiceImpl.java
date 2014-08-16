package com.goodrobots.service;

import com.goodrobots.Account;
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
 * Time: 3:28 PM
 * To change this template use File | Settings | File Templates.
 */
public class AccountServiceImpl implements AccountService {

    private final String ACCOUNT_LOGIN = "/user/login";
    private static String token = "";
    private static Account account;

    @Override
    public Account create(Account account) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Account login(String username, String password) {


        APIRequest apiRequest = new APIRequest(Server.PATH);
        apiRequest.setRequestUrl(ACCOUNT_LOGIN);

        apiRequest.setRequestType(RequestType.JSON_POST);

        Map<String, String> payloadMap = new HashMap<String, String>();
        payloadMap.put("username", username);
        payloadMap.put("password", password);

        String payload = "";

        try {
            payload = JSONObjectMapper.convertEntityToJSON(payloadMap);
        }
        catch (FatalMappingException e) {
            e.printStackTrace();
        }

        apiRequest.addRequestParameter(APIRequest.JSON_DATA, payload);


        try {
            APIResponse<Account> response = (APIResponse<Account>) APIClient.getInstance().<Account>makeRequest(apiRequest);
            Account account = response.getResponseEntity(Account.class);
            AccountServiceImpl.account = account;

            return response.getResponseEntity(Account.class);
        }
        catch (IllegalArgumentException e) {
            fail("An illigal argument exception was thrown.");
        }


        return null;
    }

    @Override
    public String getToken() {
        return AccountServiceImpl.account.getToken();
    }

    @Override
    public String getUsername() {
        return AccountServiceImpl.account.getUsername();
    }
}
