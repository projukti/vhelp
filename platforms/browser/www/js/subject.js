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
        // document.addEventListener("backbutton", onBackKeyDown, false);
        document.addEventListener("offline", checkConnection, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        screen.orientation.lock('portrait');
        // Get All Subject
        $.ajax({
            type: "post",
            url: "http://onlineeducationservice.com/masterpanel/manage_api/get_subject",
            data: "data",
            dataType: "json",
            beforeSend: function () {
              $(".se-pre-con").show();
            },
            success: function (response) {
                var count=1;
                $.each(response.subjects, function (val, text) { 
                    var subjectImage = text.subject_image;
                    var subjectName = text.subject_name;
                    var subjectDescription = text.description;

                    if(count==1){
                        var className="in";
                    }
                    else{
                        var className = "";
                    }
                    
                    $('#accordion').append('<div class="panel panel-default"><div class= "panel-heading"><h2 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapse' + count + '" style="text-decoration:none;"><img src="http://onlineeducationservice.com/masterpanel/uploads/subject/' + subjectImage + '" width="20%" /> ' + subjectName + '</a></h2></div ><div id="collapse' + count + '" class="panel-collapse collapse ' + className +'"><div class="panel-body">' + subjectDescription +'</div></div></div>');
                    count++;
                });
            },
            complete: function () {
                $(".se-pre-con").hide();
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


