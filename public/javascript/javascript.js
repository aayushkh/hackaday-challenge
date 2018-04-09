$(document).ready(function(){
	console.log("Request Sent to Backend");

	$.ajax({
	    url: "/projects",
	    type: "GET",

	    success: function(data) {
	    	$('.progress-wrapper').hide();
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
    console.info(obj.data());
});

function populate(data) {
	console.log(data);
	$('.cards-wrapper').show();

	for (var i = 0; i<data.per_page; i++) {
		// $.('.grid-wrapper').append();
	}
}
