Template.header.helpers({
	activeNavClass: function () {
		var args = Array.prototype.slice.call(arguments, 0);
		args.pop();
		var active = _.any(args, function(name) {
			return name === Meteor.Router.page();
		});

		return active && "active";
	}
});

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