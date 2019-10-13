$("#search").on ("click", function(e) {

	e.preventDefault();

	$("#videos").html("");

	$.ajax({
		url: "https://www.googleapis.com/youtube/v3/search",
		method: "GET",
		data: {
			part: 			'snippet',
			maxResults: 	'10',
			q: 				$("#searchWord").val(),
			key: 			"AIzaSyDmsC_ehX0v0e8mixzaStUoHhnVGGU5Ra0"
		},
		dataType: "jsonp",
		success: function(res) {
			let response = res["items"];
			response.forEach(element => {
				let info = `
						<div class="space">
							<a href='https://www.youtube.com/watch?v=${element["id"]["videoId"]}''>
								<h6> ${element["snippet"]["title"]} </h6>
							</a>
							<a href='https://www.youtube.com/watch?v=${element["id"]["videoId"]}'>
								<img src='${element["snippet"]["thumbnails"]["default"]["url"]}'>
							</a>
						</div>
				`
				$("#videos").append(info);
			});
		}
	})	
});
