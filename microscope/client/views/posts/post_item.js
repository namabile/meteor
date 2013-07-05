Template.postItem.helpers({
	domain: function() {
		var a = document.createElement("a");
		a.href = this.url;
		return a.hostname;
	},
	ownPost: function() {
		return this.userId == Meteor.userId();
	},
	upvotedClass: function() {
		return Meteor.userId() && !_.include(this.upvoters, Meteor.userId()) ? "btn-primary upvoteable" : "disabled";
	}
});

Template.postItem.events({
	"click .upvoteable": function (e) {
		e.preventDefault();
		Meteor.call("upvote", this._id, function(error) {
			if(error)
				Meteor.Errors.throw(error.reason);
		});
	}
});