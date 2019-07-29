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
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("offline", checkConnection, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {

        $.ajax({
            type: "post",
            url: "http://onlineeducationservice.com/masterpanel/manage_api/get_site_settings",
            dataType: "JSON",
            success: function (response) {

                FCMPlugin.getToken(function (token) {
                    console.log(token)
                    console.log(device)
                    var datas = { 'device_uuid': device.uuid, 'token': token };
                    $.ajax({
                        type: "post",
                        url: "http://onlineeducationservice.com/masterpanel/manage_api/get_token",
                        data: datas,
                        dataType: "json",
                        success: function (response) {
                            if (localStorage.login == "false" || localStorage.login == null || localStorage.login == undefined) {
                                window.location.href = "login.html";
                            }
                            else {
                                var datas = { 'user_email': localStorage.getItem('uname') };
                                var urls = "http://onlineeducationservice.com/masterpanel/manage_api/splash_screen_check";
                                $.ajax({
                                    type: "post",
                                    url: urls,
                                    data: datas,
                                    dataType: "JSON",
                                    success: function (response) {
                                        if (response.status == 0) {
                                            window.location.href = "login.html";
                                        }
                                        else {
                                            var name = response.student_arr.first_name + ' ' + response.student_arr.last_name;
                                            localStorage.setItem('name', name);
                                            localStorage.setItem('uname', response.student_arr.email);

                                            localStorage.email = response.student_arr.email;
                                            localStorage.name = name;
                                            localStorage.login = "true";
                                            window.location.href = "home.html";
                                        }
                                    }
                                });
                            }
                        }
                    });
                });

                FCMPlugin.onNotification(function (data) {
                    if (data.wasTapped) {
                        localStorage.setItem('notification_id', data.noti_id);
                        location.href = "notification_details.html";
                    } else {
                        localStorage.setItem('notification_id', data.noti_id);
                        location.href = "notification_details.html";
                    }
                });

            }
        });

        document.addEventListener("backbutton", onBackKeyDown, false);
        // This Function For Exit App
        function onBackKeyDown(e) {
            e.preventDefault();
            navigator.notification.confirm("Are you sure you want to exit ?", onConfirm, "Confirmation", "Yes,No");
            // Prompt the user with the choice
        }

        function onConfirm(button) {
            if (button == 2) {//If User selected No, then we just do nothing
                return;
            } else {
                navigator.app.exitApp();// Otherwise we quit the app.
            }
        }

        // This For Block Screen Rotation
        screen.orientation.lock('portrait');

        // This Section For Call Back Request
        $('#btnRequestNow').click(function (e) {
            // Validation
            if ($("#txtCallbackPhone").val() == "") {
                $('#txtCallbackPhone').css('border-color', 'red');
            }
            else if ($("#txtCallbackName").val() == "") {
                $('#txtCallbackName').css('border-color', 'red');
            }
            else if ($("#txtPrefarableTime").val() == "") {
                $('#txtPrefarableTime').css('border-color', 'red');
            }
            else {
                // callback($("#txtCallbackPhone").val(), $("#txtCallbackName").val(), $("#txtPrefarableTime").val());
                $.ajax({
                    type: "POST",
                    url: "http://onlineeducationservice.com/masterpanel/manage_api/get_callback",
                    data: { email: localStorage.getItem('uname'), callback_mobile: $("#txtCallbackPhone").val(), callback_name: $("#txtCallbackName").val(), callback_time: $("#txtPrefarableTime").val() },
                    dataType: "JSON",
                    success: function (response) {
                        $("#txtCallbackPhone").val("");
                        $("#txtCallbackName").val("");
                        $("#txtPrefarableTime").val("");
                        window.plugins.toast.showLongBottom('Request submited successfully');
                    }
                });
            }
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

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
}


