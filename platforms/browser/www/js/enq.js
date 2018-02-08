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
        // This For Block Screen Rotation
        screen.orientation.lock('portrait');

        // This Section For Get All subject Dynamically
        $.ajax({
            type: "post",
            url: "http://onlineeducationservice.com/masterpanel/manage_api/get_subject",
            data: "data",
            dataType: "json",
            beforeSend: function () {
                $(".se-pre-con").show();
            },
            success: function (response) {
                $.each(response.subjects, function (val, text) {
                    var subjectName = text.subject_name;
                    $('#ddlEnq1').append($('<option></option>').val(subjectName).html(subjectName));
                });
            },
            complete: function () {
                $(".se-pre-con").hide();
            }
        });

        // This Section For Get All Services Dynamically
        $.ajax({
            type: "post",
            url: "http://onlineeducationservice.com/masterpanel/manage_api/get_service",
            data: "data",
            dataType: "json",
            beforeSend: function () {
                $(".se-pre-con").show();
            },
            success: function (response) {
                $.each(response.services, function (val, text) {
                    var serviceName = text.service_name;
                    $('#ddlEnq2').append($('<option></option>').val(serviceName).html(serviceName));
                });
            },
            complete: function () {
                $(".se-pre-con").hide();
            }
        });

        // This Section For Get All Platform Dynamically
        $.ajax({
            type: "post",
            url: "http://onlineeducationservice.com/masterpanel/manage_api/get_platform",
            data: "data",
            dataType: "json",
            beforeSend: function () {
                $(".se-pre-con").show();
            },
            success: function (response) {
                $.each(response.platforms, function (val, text) {
                    var platformName = text.platform_name;
                    $('#ddlEnq3').append($('<option></option>').val(platformName).html(platformName));
                });
            },
            complete: function () {
                $(".se-pre-con").hide();
            }
        });


        // Enquery Page 1 Button Click
        $('#btnEnq1').click(function () {
            var datas = { 'subject': $('#ddlEnq1').val(), 'email': localStorage.getItem('uname') };
            $.ajax({
                type: "post",
                url: "http://onlineeducationservice.com/masterpanel/manage_api/enquiry1",
                data: datas,
                dataType: "JSON",
                success: function (response) {
                    if (response.status==1){
                        window.location.href = "enq2.html";
                    }
                }
            });
        });

        // Enquery Page 2 Button Click
        $('#btnEnq2').click(function () {
            var datas = { 'service': $('#ddlEnq2').val(), 'email': localStorage.getItem('uname') };
            $.ajax({
                type: "post",
                url: "http://onlineeducationservice.com/masterpanel/manage_api/enquiry2",
                data: datas,
                dataType: "JSON",
                success: function (response) {
                    if (response.status == 1) {
                        window.location.href = "enq3.html";
                    }
                }
            });
        });

        // Enquery Page 3 Button Click
        $('#btnEnq3').click(function () {
            if ($('#txtDescription').val() != "" && $('#ddlEnq3').val()!="") {
                var datas = { 'platform': $('#ddlEnq3').val(), 'email': localStorage.getItem('uname'), 'description': $('#txtDescription').val() };
                $.ajax({
                    type: "post",
                    url: "http://onlineeducationservice.com/masterpanel/manage_api/enquiry3",
                    data: datas,
                    dataType: "JSON",
                    success: function (response) {
                        if (response.status==1){
                            window.plugins.toast.showLongBottom('Your enquiry has been submitted');
                            window.location.href = "home.html";
                        }
                    }
                });
            }
            else{
                $('#txtDescription').css('border-color', 'red');
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


