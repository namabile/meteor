Meteor.Router.add({
	"/": "index",
	"/submit-video" : "submitVideo",
	"/videos/:_id": {
		to: "singleVideo",
		and: function(id) {
			Session.set("videoId", id);
		}
	}
});