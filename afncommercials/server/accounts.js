Accounts.onCreateUser(function (options, user) {
	var token = user.services.facebook.accessToken,
		id = user.services.facebook.id,
		result,
		profile;

	result = Meteor.http.get("https://graph.facebook.com/" + id, {
		params: {
			acces_token: token,
			fields: "picture"
		}
	});

	if(result.error)
		throw result.error

	user.profile = {
		picture: result.data.picture.data.url,
		name: user.services.facebook.name,
		displayName: user.services.facebook.first_name + " " + user.services.facebook.last_name[0] + "."
	};

	return user;
});