let nextVal = "";
let prevVal = "";
let realVal = "";

$("#search").on ("click", function(e) {

	e.preventDefault();
	$("#videos").html("");

	$.ajax({
		url: 						"https://www.googleapis.com/youtube/v3/search",
		method: 				"GET",
		data: {
			part: 				'snippet',
			maxResults: 	'10',
			q: 						$("#searchWord").val(),
			key: 					"AIzaSyDmsC_ehX0v0e8mixzaStUoHhnVGGU5Ra0"
		},
		dataType: "json",
		
		success: function(res) {
			let response = res["items"];
			response.forEach(element => {
				let info = `
						<div class="space">
							<a href='https://www.youtube.com/watch?v=${element["id"]["videoId"]}'>
								<h6> ${element["snippet"]["title"]} </h6>
							</a>
							<a href='https://www.youtube.com/watch?v=${element["id"]["videoId"]}'>
								<img src='${element["snippet"]["thumbnails"]["default"]["url"]}'>
							</a>
						</div>
				`
				$("#videos").append(info);
			});

			if (res["prevPageToken"] != null) {
				prevVal = res["prevPageToken"];
				let info = `<button id="prev" type="button" class="btn pageBtn btn-danger">Previous</button>`;
				$("#videos").append(info);
			}

			if (res["nextPageToken"] != null) {
				nextVal = res["nextPageToken"];
				let info = `<button id="next" type="button" class="btn pageBtn btn-danger">Next</button>`;
				$("#videos").append(info);
			}
		}
	})
});

$(".videos").on("click", ".pageBtn", function(e) {

	e.preventDefault();
	$("#videos").html("");

	if (e.target.id == "next")
		realVal = nextVal;

	else
		realVal = prevVal;

	$.ajax({
		url: 						"https://www.googleapis.com/youtube/v3/search",
		method: 				"GET",
		data: {
			part: 				'snippet',
			pageToken: 		realVal,
			maxResults: 	'10',
			q: 						$("#searchWord").val(),
			key: 					"AIzaSyDmsC_ehX0v0e8mixzaStUoHhnVGGU5Ra0"
		},
		dataType: 			"json",

		success: function(res) {
			let response = res["items"];

			response.forEach(element => {
				let info = `
						<div class="space">
							<a href='https://www.youtube.com/watch?v=${element["id"]["videoId"]}'>
								<h6> ${element["snippet"]["title"]} </h6>
							</a>
							<a href='https://www.youtube.com/watch?v=${element["id"]["videoId"]}'>
								<img src='${element["snippet"]["thumbnails"]["default"]["url"]}'>
							</a>
						</div>
				`
				$("#videos").append(info);
			});

			if (res["prevPageToken"] != null) {
				prevVal = res["prevPageToken"];
				let info = `<button id="prev" type="button" class="btn pageBtn btn-danger">Previous</button>`;
				$("#videos").append(info);
			}

			if (res["nextPageToken"] != null) {
				nextVal = res["nextPageToken"];
				let info = `<button id="next" type="button" class="btn pageBtn btn-danger">Next</button>`;
				$("#videos").append(info);
			}
		}
	})
});