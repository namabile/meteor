Videos = new Meteor.Collection("videos");

Meteor.methods({
	submitVideo: function (video) {
		// check if the user is logged in
		var user = Meteor.user();
		if(!user)
			throw new Meteor.Error(402, "You must be logged in to post a video.");
		if(!video.url)
			throw new Meteor.Error(422, "Videos must have a link.");

		var whiteList = ["youtube.com", "youtu.be", "www.youtube.com"];
		youtubeCheck = false;
		youtubeCheck = _.map(whiteList, function(safeUrl) {
			if(video.url.search(safeUrl))
				return true;
		});

		if(!youtubeCheck)
			throw new Meteor.Error(422, "Only links to Youtube are allowed.");

		if(video.url.search("watch\?") !== -1) {
			queryString = video.url.split("?")[1].split("&");
			var youtubeId = "";
			_.each(queryString, function(query) {
				if(query.substring(0,2) === "v=") {
					youtubeId = query.substring(2);
				}
			});
			
		} else {
			youtubeId = video.url.split("youtu.be/")[1];
		}

		var otherVideo = Videos.findOne({youtubeId: youtubeId});

		if(otherVideo)
			throw new Meteor.Error(422, "This video has already been posted", youtubeId);

		video = _.extend(_.pick(video, "description"), {
			url: video.url,
			youtubeId: youtubeId,
			submittedBy: user._id,
			submittedOn: new Date().getTime(),
			comments: 0,
			likes: 0,
			views: 0,
			featured: false
		});

		videoId = Videos.insert(video);

		return videoId;
	}
});