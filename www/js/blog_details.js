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
        var datas = { 'blog_id': localStorage.getItem('blog_id') };
        $.ajax({
            type: "post",
            url: "http://onlineeducationservice.com/masterpanel/manage_api/get_blogDetail",
            data: datas,
            dataType: "json",
            beforeSend: function () {
                $(".se-pre-con").show();
            },
            success: function (response) {
                console.log(response.blogDetail.blog_id);
                var blog_id = response.blogDetail.blog_id;
                var blog_title = response.blogDetail.blog_title;
                var blog_date = response.blogDetail.blog_date;
                var blog_by = response.blogDetail.blog_by;
                var blog_image = response.blogDetail.blog_image;
                var blog_content = response.blogDetail.blog_content;

                var formattedDate = new Date(blog_date);
                var d = formattedDate.getDate();
                var m = formattedDate.getMonth();
                m += 1;
                // JavaScript months are 0-11 
                var y = formattedDate.getFullYear();
                var noti_date = d + "-" + m + "-" + y;

                $('#content-section').append('<div class="well clearfix"><div class="row"><div class="col-xs-12"><div class="row"> <h2 class="col-xs-12"><strong style="font-size:14px">' + blog_title + '</strong></h2></div>' + blog_content + '<br><img src="http://onlineeducationservice.com/masterpanel/uploads/blog/' + blog_image + '" alt="" class="img-responsive"><br><p align="left">By- <strong>' + blog_by + '</strong> (' + formattedDate + ')</p></div></div></div>');
            },
            complete: function () {
                $(".se-pre-con").hide();
            }
        });

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
    window.plugins.toast.showLongBottom('No internet connection detected');
}