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

        // This Code For Logout
        $('#btnLogout').click(function () {
            // alert();
            var userdata = localStorage.getItem('uname');
            // var userdata = localStorage.email;
            // console.log(userdata);
            var datas = { 'email': userdata };
            $.ajax({
                type: "post",
                url: "https://bebongstore.com/nxias/manage_api/logout",
                data: datas,
                success: function (response) {
                    da = $.parseJSON(response);
                    if (da.status == 1) {
                        localStorage.email = "";
                        localStorage.login = "false";
                        window.location.href = "beforelogin.html";
                    }
                }
            });

        });

        // This Function Get All Data From Server
        var urls = "https://bebongstore.com/vhelp/manage_api/profile_view";
        var userdata = localStorage.getItem('uname');
        // console.log(userdata);
        var datas = { 'email': userdata };
        $.ajax({
            type: "post",
            url: urls,
            data: datas,
            dataType: "json",
            beforeSend: function () {
                // Animate loader off screen
                $(".se-pre-con").show();
            },
            success: function (response) {
                console.log(response.studentDetail.photo);
                $('#lblName').text(localStorage.getItem('name'));
                $('#lblEmail').text(localStorage.getItem('email'));
                $('#lblMobile').text(response.studentDetail.phone);
                $('#lblGrade').text(response.studentDetail.twelveth_grade);
                $('#lblPercentage').text(response.studentDetail.twelveth_percentage);
                $('#lblBoard').text(response.studentDetail.twelveth_board);
                $('#lblPaypalId').text(response.studentDetail.paypalid);
                $('#lblAddress').text(response.studentDetail.address);
                $("#pimage").attr("src", "https://bebongstore.com/vhelp/uploads/student/" + response.studentDetail.photo);
                $(".se-pre-con").hide();
            }
        });

        // *************************************************************************************
        // This Section For Edit Button click

        // Name Edit Button click
        $('#btnNameEdit').click(function () {
            $('#btnNameSave').css('display', 'block');
            $('#btnNameEdit').css('display', 'none');
            $('#txtName').css('display', 'block');
            $('#txtName').val($('#lblName').text());
            $('#lblName').css('display', 'none');
        });

        // Phone Edit Button Click
        $('#btnMobileEdit').click(function () {
            $('#btnMobileSubmit').css('display', 'block');
            $('#btnMobileEdit').css('display', 'none');
            $('#txtMobile').css('display', 'block');
            $('#txtMobile').val($('#lblMobile').text());
            $('#lblMobile').css('display', 'none');
        });
        
        // Grade Edit Button Click
        $('#btnGradeEdit').click(function () {
            $('#btnGradeSubmit').css('display', 'block');
            $('#btnGradeEdit').css('display', 'none');
            $('#txtGrade').css('display', 'block');
            $('#txtGrade').val($('#lblGrade').text());
            $('#lblGrade').css('display', 'none');
        });

        // Percentage Edit Button Click
        $('#btnPercentEdit').click(function () {
            $('#btnPercentSubmit').css('display', 'block');
            $('#btnPercentEdit').css('display', 'none');
            $('#txtPercentage').css('display', 'block');
            $('#txtPercentage').val($('#lblPercentage').text());
            $('#lblPercentage').css('display', 'none');
        });

        // Percentage Edit Button Click
        $('#btnPercentEdit').click(function () {
            $('#btnPercentSubmit').css('display', 'block');
            $('#btnPercentEdit').css('display', 'none');
            $('#txtPercentage').css('display', 'block');
            $('#txtPercentage').val($('#lblPercentage').text());
            $('#lblPercentage').css('display', 'none');
        });

        // Board Edit Button Click
        $('#btnBoardEdit').click(function () {
            $('#btnBoardSubmit').css('display', 'block');
            $('#btnBoardEdit').css('display', 'none');
            $('#txtBoard').css('display', 'block');
            $('#txtBoard').val($('#lblBoard').text());
            $('#lblBoard').css('display', 'none');
        });

        // Board Edit Button Click
        $('#btnBoardEdit').click(function () {
            $('#btnBoardSubmit').css('display', 'block');
            $('#btnBoardEdit').css('display', 'none');
            $('#txtBoard').css('display', 'block');
            $('#txtBoard').val($('#lblBoard').text());
            $('#lblBoard').css('display', 'none');
        });

        // Paypal Edit Button Click
        $('#btnPaypalEdit').click(function () {
            $('#btnPaypalSubmit').css('display', 'block');
            $('#btnPaypalEdit').css('display', 'none');
            $('#txtPaypalEmailID').css('display', 'block');
            $('#txtPaypalEmailID').val($('#lblPaypalId').text());
            $('#lblPaypalId').css('display', 'none');
        });

        // Address Edit Button Click
        $('#btnAddressEdit').click(function () {
            $('#btnAddressSubmit').css('display', 'block');
            $('#btnAddressEdit').css('display', 'none');
            $('#txtAddress').css('display', 'block');
            $('#txtAddress').val($('#lblAddressId').text());
            $('#lblAddress').css('display', 'none');
        });




        // Mode Edit Button Click
        // $('#btnModeEdit').click(function () {
        //     $('#btnModeSubmit').css('display', 'block');
        //     $('#btnModeEdit').css('display', 'none');
        //     $('#ddlMode').css('display', 'block');
        //     $('#modef').css('display', 'none');
        //     var modeValue = $('#modef').text();
        //     $("#ddlMode option[value='" + modeValue + "']").attr("selected", "selected");
        //     // alert($('#modef').text());
        //     // $('.ddlMode[value=' + $('#modef').text()+']').attr('selected', 'selected');
        //     $('#modef').css('display', 'none');
        // });

        // State Edit Button Click
        $('#btnStateEdit').click(function () {
            $('#btnStateSubmit').css('display', 'block');
            $('#btnStateEdit').css('display', 'none');
            $('#ddlState').css('display', 'block');
            $('#statef').css('display', 'none');
            var modeValue = $('#statef').text();
            $("#ddlState option[value='" + modeValue + "']").attr("selected", "selected");
            // alert($('#modef').text());
            // $('.ddlMode[value=' + $('#modef').text()+']').attr('selected', 'selected');
            $('#statef').css('display', 'none');
        });

        // City Edit Button Click
        $('#btnCityEdit').click(function () {
            $('#btnCitySave').css('display', 'block');
            $('#btnCityEdit').css('display', 'none');
            $('#ddlCity').css('display', 'block');
            $('#cityf').css('display', 'none');
            var modeValue = $('#cityf').text();
            $("#ddlCity option[value='" + modeValue + "']").attr("selected", "selected");
            // alert($('#modef').text());
            // $('.ddlMode[value=' + $('#modef').text()+']').attr('selected', 'selected');
            $('#cityf').css('display', 'none');
        });


        // *************************************************************************************
        // This Section For Update Profile

        // Update Name Here
        $('#btnNameSave').click(function () {
            var name = $('#txtName').val();
            var updateFld = 'name';
            var labelName = 'lblName';
            var editBtn = 'btnNameEdit';
            var submitBtn = 'btnNameSave';
            var inputFld = 'txtName';
            if (name == "") {
                $('#txtName').css('border-color', 'red');
            }
            else {
                updateProfile(name, updateFld, labelName, editBtn, submitBtn,inputFld);
            }
        });


        // Update Phone Here
        $('#btnMobileSubmit').click(function () {
            var phone = $('#txtMobile').val();
            var updateFld = 'phone';
            var labelName = 'lblMobile';
            var editBtn = 'btnMobileEdit';
            var submitBtn = 'btnMobileSubmit';
            var inputFld = 'txtMobile';
            if (phone == "") {
                $('#txtMobile').css('border-color', 'red');
            }
            else {
                updateProfile(phone, updateFld, labelName, editBtn, submitBtn, inputFld);
            }
        });

        // Update Address Here
        $('#btnAddressSubmit').click(function () {
            var address = $('#txtAddress').val();
            var updateFld = 'address';
            var labelName = 'lblAddress';
            var editBtn = 'btnAddressEdit';
            var submitBtn = 'btnAddressSubmit';
            var inputFld = 'txtAddress';
            if (address == "") {
                $('#txtAddress').css('border-color', 'red');
            }
            else {
                updateProfile(address, updateFld, labelName, editBtn, submitBtn, inputFld);
            }
        });

        // Update Grade Here
        $('#btnGradeSubmit').click(function () {
            var grade = $('#txtGrade').val();
            var updateFld = 'twelveth_grade';
            var labelName = 'lblGrade';
            var editBtn = 'btnMGradeEdit';
            var submitBtn = 'btnGradeSubmit';
            var inputFld = 'txtGrade';
            if (grade == "") {
                $('#txtGrade').css('border-color', 'red');
            }
            else {
                updateProfile(grade, updateFld, labelName, editBtn, submitBtn, inputFld);
            }
        });

        // Update Percentage Here
        $('#btnPercentSubmit').click(function () {
            var percentage = $('#txtPercentage').val();
            var updateFld = 'twelveth_percentage';
            var labelName = 'lblPercentage';
            var editBtn = 'btnPercentEdit';
            var submitBtn = 'btnPercentSubmit';
            var inputFld = 'txtPercentage';
            if (percentage == "") {
                $('#txtPercentage').css('border-color', 'red');
            }
            else {
                updateProfile(percentage, updateFld, labelName, editBtn, submitBtn, inputFld);
            }
        });

        // Update Board Here
        $('#btnBoardSubmit').click(function () {
            var Board = $('#txtBoard').val();
            var updateFld = 'twelveth_board';
            var labelName = 'lblBoard';
            var editBtn = 'btnBoardEdit';
            var submitBtn = 'btnBoardSubmit';
            var inputFld = 'txtBoard';
            if (Board == "") {
                $('#txtBoard').css('border-color', 'red');
            }
            else {
                updateProfile(Board, updateFld, labelName, editBtn, submitBtn, inputFld);
            }
        });

        // Update PaypalId Here
        $('#btnPaypalSubmit').click(function () {
            var PaypalId = $('#txtPaypalEmailID').val();
            var updateFld = 'paypalid';
            var labelName = 'lblPaypalId';
            var editBtn = 'btnPaypalEdit';
            var submitBtn = 'btnPaypalSubmit';
            var inputFld = 'txtPaypalEmailID';
            if (PaypalId == "") {
                $('#txtPaypalEmailID').css('border-color', 'red');
            }
            else {
                updateProfile(PaypalId, updateFld, labelName, editBtn, submitBtn, inputFld);
            }
        });


        // ***********************************************************************************************
        // This Function For Image Upload

    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

};


function updateProfile(updateValue, updateFld, labelName, editBtn, submitBtn, inputFld) {
    var urls = "https://bebongstore.com/vhelp/manage_api/profile_update";
    datas = { 'update_value': updateValue, 'field': updateFld, 'email': localStorage.email };
    $.ajax({
        type: "POST",
        url: urls,
        data: datas,
        dataType: 'json',
        beforeSend: function () {
            // $('#btnLogin').prop('disabled', true);
            // Loading Status will be shown here
        },
        success: function (response) {
            if (response.status == 1) {
                if (updateFld=="name"){
                    localStorage.setItem('name',updateValue);
                }
                $('#' + labelName).text(updateValue);
                $('#' + labelName).show();
                $('#' + editBtn).show();
                $('#' + submitBtn).hide();
                $('#' + inputFld).hide();
            }
        }
    });
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