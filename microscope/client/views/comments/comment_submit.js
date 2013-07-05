Template.commentSubmit.events({
	"submit form": function(e, template) {
		e.prevenDefault();

		var $body = $(e.target).find("[name=body]");
		var comment = {
			body: $body.val();
			postId: template.data._id	
		};

		Meteor.call("comment", comment, function(error, commentId) {
			if(error)
				Meteor.Errors.throw(error.reason);
			else
				$body.val('');
		});
	}
});