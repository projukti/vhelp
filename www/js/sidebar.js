$(document).ready(function () {
    $('#mySidenav').html('<a href = "javascript:void(0)" class= "closebtn" onclick = "closeNav()" >&times;</a><a href="home.html"><i class="fa fa-dashboard"></i> &nbsp;Dashboard</a><a href="subject.html"><i class="fa fa-clone"></i> &nbsp;Subjects</a><a href="service.html"><i class="fa fa-files-o"></i> &nbsp;Services</a><a href="platform.html"><i class="fa fa-file-text-o"></i> &nbsp;Platform</a><a href="reference.html"><i class="fa fa-picture-o"></i> &nbsp;References</a><a href="enq1.html"><i class="fa fa-envelope"></i> &nbsp;Enquiry</a><a href="notification1.html"> <i class="fa fa-comment"></i> &nbsp;Notifications</a><a href="profile.html"><i class="fa fa-user"></i> &nbsp;Profile</a><a href="about-us.html"><i class="fa fa-home"></i> &nbsp;About Us</a><a href="javascript:void(0);" id="btnLogout"><i class="fa fa-sign-out"></i> &nbsp;Log Out</a>');

    $('#btnLogout').click(function () {
        // alert();
        localStorage.setItem('uname','');
        localStorage.email = "";
        localStorage.name = "";
        localStorage.login = "false";
        window.location.href = "login.html"; 
    });
});

function openNav() {
        document.getElementById("mySidenav").style.width = "75%";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
