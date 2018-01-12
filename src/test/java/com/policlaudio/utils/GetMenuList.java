package com.policlaudio.utils;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class GetMenuList {

    public static void main(String[] args) throws IOException {

        BufferedReader reader = new BufferedReader(new FileReader("/Users/tallesi001/IdeaProjects/policlaudio/src/test/resources/menu.txt"));
        String line = null;
        List<String> allLines = new ArrayList<>();
        JsonObject root = new JsonObject();
        int maxLength = 0;
        while ((line = reader.readLine()) != null) {
            if (line.isEmpty()) {
                continue;
            }

            allLines.add(line);
            System.out.println(line);
            String[] els = line.split("###");

            if (maxLength < els.length) {
                maxLength = els.length;
            }

            for (String el : els) {
                root.add(el, new JsonArray());
            }
        }
        root.add("root", new JsonArray());
        reader.close();

        for (int i = 0; i < maxLength; i++) {
            for (String l1 : allLines) {
                String[] els = l1.split("###");
                if (els.length <= i) {
                    continue;
                }

                if(i == 0){
                    if (!root.getAsJsonArray("root").contains(new JsonPrimitive(els[i]))) {
                        root.getAsJsonArray("root").add(els[i]);
                    }
                }else {
                    if (!root.getAsJsonArray(els[i - 1]).contains(new JsonPrimitive(els[i]))) {
                        root.getAsJsonArray(els[i - 1]).add(els[i]);
                    }
                }
            }
        }

        System.out.println(new Gson().toJson(root));
    }
}
