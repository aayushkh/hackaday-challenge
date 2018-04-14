$(document).ready(function(){
	$.ajax({
	    url: "/projects?page=1",
	    type: "GET",

	    success: function(data) {
	        populate(data); 
	    }
	});
});


$(function () {
    var obj = $('#pagination').twbsPagination({
        totalPages: 348,
        visiblePages: 10,
        onPageClick: function (event, page) {
            $('.page-content').text('Page ' + page);
        }
    });
});


function populate(data) {
    var html_append = "";

	$('.progress-wrapper').hide();
    $('.to-top').css('display','flex');
    $('.grid-wrapper').css('display','grid');
    $('.legend').css('display','flex');
    $('.page-navigation').show();

	for (var i = 0; i<data.per_page; i++) {
		html_append += "<div class='grid-item'>";
		html_append += "<p class='card-text name'>" + data.projects[i].name + "</p>";
        html_append +="<p class='card-text summary'>" + data.projects[i].summary + "</p>";      
        html_append += "<div class='card-text owner'>Owner ID : ";
        html_append += "<div class='project-owner'>" + data.projects[i].owner_id;
        html_append += "<div class='tooltip'><div class='owner-data'>";
        html_append += "<p class='tooltip-text'>Fetching the owner details ...</p>";
        html_append += "<div class='tooltip-loader'></div>";
        html_append += "</div></div></div></div>";
        html_append += "<div class='grid-stats'>"
        html_append += "<i class='fa fa-comments'></i><p class='card-text stats'>" + data.projects[i].comments + " </p>";
        html_append += "<i class='fa fa-users'></i><p class='card-text stats'>" + data.projects[i].followers + " </p>";
        html_append += "<img src='https://dev.hackaday.io/img/logo.svg' width='18px' height='18px'><p class='card-text stats'>";
        html_append += data.projects[i].skulls + " </p>";
        html_append += "<i class='fa fa-eye'></i><p class='card-text stats'>" + data.projects[i].views + " </p>";
        html_append += "</div></div>"; //close div.grid-stats & div.grid-item
	}

	$('.grid-wrapper').append(html_append);   

    /*- jQuery to handle the owner details -*/

    $('.project-owner').mouseenter(function() {
        html_append = "";
        var apikey = "RzYEaCIPvzmeHX4e";
        var owner_id = $(this).clone().children().remove().end().text();
        var owner_url = "http://api.hackaday.io/v1/users/" + owner_id + "?api_key=" + apikey;
        
        $.ajax({
            url: owner_url,
            type: "GET",

            success: function(data) {
                $('.tooltip-text').hide();
                $('.tooltip-loader').hide();
                html_append += "<div class='to-empty'>";
                html_append += "<div class='owner-text'><b>Username</b> " + data.username + "</div>";
                html_append += "<div class='owner-text'><b>Screen Name</b> " + data.screen_name + "</div>";
                html_append += "<div class='owner-text'><b>About me</b> " + data.about_me + "</div>";
                html_append += "<div class='owner-text'><i class='fa fa-map-marker'></i> " + data.location + "</div>";
                html_append += "<div class='owner-stats'>"
                html_append += "<div class='owner-text'><i class='fa fa-code-fork'></i> " + data.projects + "</div>";
                html_append += "<div class='owner-text'><img src='https://dev.hackaday.io/img/logo.svg' width='18px' height='18px'> " + data.skulls + "</div>";
                html_append += "<div class='owner-text'><i class='fa fa-users'></i> " + data.followers + "</div>";
                html_append += "</div></div>";
    
                $('.owner-data').append(html_append);
            }
         });
    });

    $('.project-owner').mouseleave(function() {
        $('.to-empty').remove();
        $('.tooltip-text').show();
        $('.tooltip-loader').show();
    });
}


$(document).on('click', '.page-item', function(e){
    var page = $('.page-item.active').text(); 
    $('.grid-wrapper').css('display','none');
    $('.to-top').css('display','none');
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    $('.progress-wrapper').show();
    $('.grid-wrapper').empty();
    $.ajax({
        url: "/projects?page=" + page,
        type: "GET",

        success: function(data) {
            console.log(data);
            populate(data);
        }
     });

});

$(document).on('click', '.to-top', function(e){
    $('html, body').animate({ scrollTop: 0 }, 'slow');
});
