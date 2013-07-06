Template.loggedout.events({
	"click #login": function(e) {
		e.preventDefault();
		Meteor.loginWithFacebook(["email", "user_location"], function(error) {
			if(error)
				Meteor.Messages.sendError(error.reason);
			else
				Meteor.Messages.sendSuccess("Login success!");
		});
	}
});

Template.loggedin.events({
	"click #logout": function(e) {
		e.preventDefault();
		Meteor.logout(function(error) {
			if(error)
				Meteor.Messages.sendError(error.reason);
			else
				Meteor.Messages.sendInfo("Logged out.");
		});
	}
});