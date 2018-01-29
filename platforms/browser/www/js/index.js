/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("offline", checkConnection, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        // This Function ForPUsh notification
        //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
        //Here you define your application behaviour based on the notification data.
        FCMPlugin.onNotification(function (data) {
            if (data.wasTapped) {
                //Notification was received on device tray and tapped by the user.
                alert(JSON.stringify(data));
                alert('app off');
            } else {
                //Notification was received in foreground. Maybe the user needs to be notified.
                alert(JSON.stringify(data));
                alert('app on');
            }
        });

        // This For Block Screen Rotation
        screen.orientation.lock('portrait');

        if (localStorage.login == "false" || localStorage.login == null || localStorage.login == undefined) {
            window.setTimeout(function () {
                window.location.href = "login.html";
            }, 4000);
        }
        else {
            var datas = { 'user_email': localStorage.getItem('uname') };
            var urls = "https://bebongstore.com/vhelp/manage_api/splash_screen_check";
            $.ajax({
                type: "post",
                url: urls,
                data: datas,
                dataType: "JSON",
                success: function (response) {
                    if (response.status == 0) {

                        window.setTimeout(function () {
                            window.location.href = "login.html";
                        }, 4000);
                    }
                    else {
                        var name = response.student_arr.first_name + ' ' + response.student_arr.last_name; 
                        localStorage.setItem('name', name);
                        localStorage.setItem('uname', response.student_arr.email);

                        localStorage.email = response.student_arr.email;
                        localStorage.name = name;
                        localStorage.login = "true";

                        window.setTimeout(function () {
                            window.location.href = "home.html";
                        }, 4000);
                    }
                }
            });
        }
    },    
};

// This Function For Check Internet Connection
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';
    
    window.plugins.toast.showLongBottom('No internet connection detected');
    navigator.app.exitApp();
    
}
