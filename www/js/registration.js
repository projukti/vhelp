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

        // app.receivedEvent('deviceready');
        $('#btnReg').click(function () {
            var first_name = $('#first_name').val();
            var last_name = $('#last_name').val();
            var email = $("#email").val();
            var mobile = $("#mobile").val();
            var password = $("#password").val();
            var confirm_password = $("#confirm_password").val(); 
            if (first_name == "" || last_name == "" || email == "" || mobile == "" || password == "" || confirm_password == "") {
                if (first_name == "") {
                    $('#first_name').css('border-color', 'red');
                }
                if (last_name == "") {
                    $('#last_name').css('border-color', 'red');
                }
                if (email == "") {
                    $('#email').css('border-color', 'red');
                }

                if (mobile == "") {
                    $('#mobile').css('border-color', 'red');
                }
                if (password == "") {
                    $('#password').css('border-color', 'red');
                }
                if (confirm_password == "") {
                    $('#confirm_password').css('border-color', 'red');
                }
            }
            var expr = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
            if (email != "" && !$.trim(email).match(expr)) {
                $('#email').css('border-color', 'red');
            }
            if (first_name != "" && last_name != "" && email != "" && mobile != "" && password != "" && confirm_password != "") {
                $(".se-pre-con").show();
                var datas = { 'first_name': first_name, 'last_name': last_name, 'email': email, 'mobile': mobile, 'password': password, 'confirm_password': confirm_password };
                $.ajax({
                    type: "post",
                    url: "http://onlineeducationservice.com/masterpanel/manage_api/registration",
                    data: datas,
                    datatype: 'json',
                    beforeSend: function () {
                        $('#btnReg').prop('disabled', true);
                    },
                    success: function (response) {
                        var da = $.parseJSON(response);
                        $('#btnReg').prop('disabled', false);
                        if (da.status == 1) {
                            $('#msg').css('display', 'none');
                            // var full_name = response.fist_name + " " +response.last_name;
                            localStorage.setItem('name', da.name);
                            localStorage.setItem('uname', da.email);

                            localStorage.login = "true";
                            localStorage.email = da.email;
                            localStorage.name = da.name;

                            window.location.href = "home.html";
                        }
                        else if (da.status == 2) {
                            navigator.notification.beep(1);
                            showAlert();
                            window.location.href = "login.html";
                        }
                        else {
                            // console.log('Mismatch');
                            $('#password').css('border-color', 'red');
                            $('#confirm_password').css('border-color', 'red');
                            $('#password').val('');
                            $('#confirm_password').val('');
                            $('#btnReg').prop('disabled', false);
                            navigator.notification.beep(1);
                            showcnfpass();
                        }
                    }
                });
                // }

            }
        });
    },

};
function showAlert() {
    navigator.notification.alert(
        'Email Already Exist.Please Login.',  // message
        alertDismissed,         // callback
        'Already Registered !',            // title
        'OK'                  // buttonName
    );
}
function alertDismissed() {
    // do something
}
function showcnfpass() {
    navigator.notification.alert(
        'Password and Confirm Password Do Not Match.',  // message
        alertDismissed,         // callback
        'Mismatch!',            // title
        'OK'                  // buttonName
    );
}
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