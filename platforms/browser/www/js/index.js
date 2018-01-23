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
        if (localStorage.login == "false") {
            // First Check Is Loged In In Database            

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
                            window.location.href = "profile.html";
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

    // alert('Connection type: ' + states[networkState]);
    navigator.notification.alert(
        'No Internet Connection.',
        alertDismissed,
        'Alert!',
        'OK'
    );
    navigator.app.exitApp();
}
