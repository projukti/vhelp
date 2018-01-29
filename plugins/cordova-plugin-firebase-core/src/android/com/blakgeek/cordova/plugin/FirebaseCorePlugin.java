package com.blakgeek.cordova.plugin;

import android.content.Context;
import android.os.Bundle;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.analytics.FirebaseAnalytics;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

public class FirebaseCorePlugin extends CordovaPlugin {

    private CallbackContext eventContext;
    private FirebaseAnalytics analytics;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        switch (action) {
            case "initialize":
                return initialize(args, callbackContext);
            case "logEvent":
                return logEvent(args, callbackContext);
            default:
                return false;
        }
    }

    private boolean logEvent(JSONArray args, CallbackContext callbackContext) {

        String name = args.optString(0, "event");
        JSONObject data = args.optJSONObject(1);
        Bundle bundle = new Bundle();
        Iterator<String> keys = data.keys();
        while(keys.hasNext()) {

            String key = keys.next();
            Object value;
            try {
                value = data.get(key);
                if(value instanceof Number) {
                    bundle.putDouble(key, new Double(value.toString()));
                } else if(value instanceof Boolean) {
                    bundle.putBoolean(key, (Boolean) value);
                } else {
                    bundle.putString(key, value.toString());
                }
            } catch (JSONException e) {
                // who cares this error is stupid
            }
        }

        getAnalytics().logEvent(name, bundle);
        callbackContext.success();
        return true;
    }

    private boolean initialize(JSONArray args, CallbackContext callbackContext) {

        String name = args.optString(1);
        Context context = this.cordova.getActivity().getApplicationContext();
        FirebaseOptions.Builder builder = new FirebaseOptions.Builder();

        try {
            if ("".equals(name)) {
                FirebaseApp.initializeApp(context, builder.build());
            } else {
                FirebaseApp.initializeApp(context, builder.build(), name);
            }
        } catch (IllegalStateException ex) {
            // ignore and keep it movin
        }

        if (eventContext == null) {
            eventContext = callbackContext;
        }
        return true;
    }

    private void raiseEvent(String type) {
        raiseEvent(type, null);
    }

    private void raiseEvent(String type, Object data) {

        if (eventContext != null) {

            JSONObject event = new JSONObject();
            try {
                event.put("type", type);
                event.put("data", data);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            PluginResult result = new PluginResult(PluginResult.Status.OK, event);
            result.setKeepCallback(true);
            eventContext.sendPluginResult(result);
        }
    }

    private FirebaseAnalytics getAnalytics() {

        if(analytics == null) {
            analytics = FirebaseAnalytics.getInstance(this.cordova.getActivity().getApplicationContext());
        }

        return analytics;
    }
}


