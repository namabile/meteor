Template.submitVideo.events({
	"submit form": function (e) {
		e.preventDefault();
		var user, video;

		// check if the user is logged in
		user = Meteor.user();
		if(!user) {
			Meteor.Messages.sendError("You must be logged in to post a video.");
			return false;
		}

		var video = {
			url: $(e.target).find("[name=url]").val(),
			description: $(e.target).find("[name=description]").val()
		}
		Meteor.call("submitVideo", video, function(error, result) {
			if(error) {
				Meteor.Messages.sendError(error.reason);
			} else {
				Meteor.Messages.sendSuccess("Succesfully posted video!");
				Meteor.Router.to("submitVideo");
			}
		});
	}
});