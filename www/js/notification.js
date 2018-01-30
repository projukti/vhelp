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

    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        // This For Block Screen Rotation
        screen.orientation.lock('portrait');

        // This Section For Get Dynamic Notification
        $.ajax({
            type: "post",
            url: "https://bebongstore.com/vhelp/manage_api/notification_list",
            dataType: "json",
            beforeSend: function () {
                $(".se-pre-con").show();
            },
            success: function (response) {
                $.each(response.notifications, function (val, text) {

                    var notification_id = text.notification_id;
                    var notification_title = text.title;
                    var notification_date = text.noti_date;

                    var formattedDate = new Date(notification_date);
                    var d = formattedDate.getDate();
                    var m = formattedDate.getMonth();
                    m += 1;
                    // JavaScript months are 0-11 
                    var y = formattedDate.getFullYear();
                    var noti_date = d + "-" + m + "-" + y;

                    $('#content-section').append('<div class="alert alert-warning notification" onclick="notification_click(' + notification_id + ')"> <strong>' + notification_title + '</strong> <br><p class="text-danger" align="right">' + noti_date + '</p></div>');

                    $(".se-pre-con").hide();
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
    window.plugins.toast.showLongBottom('No internet connection detected');
}

function notification_click(id) {
    localStorage.setItem('notification_id', id);
    location.href = "notification_details.html";
}