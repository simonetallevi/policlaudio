package com.policlaudio.servlet.task;

import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

public class SyncDataServlet extends AbstractTaskServlet{

    @Override
    protected void get(Map<String, String> parameters, HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void post(JsonObject input, HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
