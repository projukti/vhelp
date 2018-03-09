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
                $('#ddlEnq1').append($('<option></option>').val('Other').html('Other'));
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
                if (localStorage.getItem('subject_details') != "Writing Paper") {
                    $.each(response.services, function (val, text) {
                        var serviceName = text.service_name;
                        $('#ddlEnq2').append($('<option></option>').val(serviceName).html(serviceName));
                    });
                }
                else {
                    $('#ddlEnq2').html('<option value="Admission Essay">Admission Essay</option><option value="Article Review">Article Review</option><option value="Research Paper">Research Paper</option><option value="Resume">Resume</option><option value="Thesis Paper">Thesis Paper</option><option value="Case Analysis Review">Case Analysis Review</option>');
                    $('#dynamic_esay').show();
                }
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


        // This Section For Select Subject On Enquery Page Dropdown
        $('#ddlEnq1').change(function (e) { 
            var enq1_val = $('#ddlEnq1').val();
            if (enq1_val =="Other"){
                $('#dynamic_text').show();
            }
        });


        // Enquery Page 1 Button Click
        $('#btnEnq1').click(function () {
            if ($('#ddlEnq1').val() == "Other" && $('#txtOtherSub').val()=="")
            {
                $('#txtOtherSub').css('border-color', 'red');
                return;
            }
            var datas = { 'subject': $('#ddlEnq1').val(), 'email': localStorage.getItem('uname'), 'othersubject': $('#txtOtherSub').val() };
            $.ajax({
                type: "post",
                url: "http://onlineeducationservice.com/masterpanel/manage_api/enquiry1",
                data: datas,
                dataType: "JSON",
                success: function (response) {
                    if (response.status==1){
                        localStorage.setItem('subject_details', $('#ddlEnq1').val());
                        window.location.href = "enq2.html";
                    }
                }
            });
        });

        // Enquery Page 2 Button Click
        $('#btnEnq2').click(function () {
            var enq2_val = $('#ddlEnq2').val();

            // if Services Enquery Value is Online Tutoring then this block should be executed
            if (enq2_val =="Online Class"){
                // validate  Total Weeks and remaing weeks here
                if(validation_weeks()){
                    var datas = { 'service': $('#ddlEnq2').val(), 'email': localStorage.getItem('uname'), 'txtTotalWeeks': $('#txtweeksTotal').val(), 'txtRemaingWeeks': $('#txtweeksRemaining').val() }; 
                }
                else{
                    return ;
                }
            }
            else if (localStorage.getItem('subject_details') == "Writing Paper"){
                if (validate_style()) {
                    var datas = { 'service': $('#ddlEnq2').val(), 'email': localStorage.getItem('uname'), 'ddlPages': $('#ddlPages option:selected').text(), 'ddlStyle': $('#ddlStyle option:selected').text()};
                }
                else{
                    return ;
                }
            }
            else{
                var datas = { 'service': $('#ddlEnq2').val(), 'email': localStorage.getItem('uname'), 'ddlPages': '', 'ddlStyle': '' }; 
            }
            console.log(datas);
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

        // This Section For Select Online Tutorial On Enquery Page Dropdown
        $('#ddlEnq2').change(function () { 
            var enquery=$('#ddlEnq2').val();

            if (enquery =='Online Class'){
                $('#dynamic_control').show();
            }
            else{
                $('#dynamic_control').hide();
            }
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
                            window.plugins.toast.showLongBottom('Your enquiry has been submitted successfully');
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

// This Funtion For Validation Total Weeks And Remaing Weeks
function validation_weeks() {
    if ($('#txtweeksTotal').val() == "" || $('#txtweeksRemaining').val() == ""){
        if ($('#txtweeksTotal').val() == "" && $('#txtweeksRemaining').val() == ""){
            $('#txtweeksTotal').css('border-color', 'red');
            $('#txtweeksRemaining').css('border-color', 'red');
        }
        else if ($('#txtweeksTotal').val() == "")
        {
            $('#txtweeksTotal').css('border-color', 'red');
        }
        else if ($('#txtweeksRemaining').val() == ""){
            $('#txtweeksRemaining').css('border-color', 'red');
        }
        
        return false;
    }
    else{
        return true;
    }
}

// This Function For Validate Number Of Pages and Writting Style
function validate_style(){
    if ($('#ddlPages').val() == "" || $('#ddlStyle').val() == "") {
        if ($('#ddlPages').val() == "" && $('#ddlStyle').val() == "") {
            $('#ddlPages').css('border-color', 'red');
            $('#ddlStyle').css('border-color', 'red');
        }
        else if ($('#ddlPages').val() == "") {
            $('#ddlPages').css('border-color', 'red');
        }
        else if ($('#ddlStyle').val() == "") {
            $('#ddlStyle').css('border-color', 'red');
        }

        return false;
    }
    else {
        return true;
    }
}


