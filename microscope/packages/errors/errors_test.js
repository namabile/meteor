Tinytest.add("Errors collections works", function(test) {
	test.equal(Meteor.errors.find({}).count(), 0);

	Meteor.Errors.throw("a new error!");
	test.equal(Meteor.errors.find({}).count(), 1);

	Meteor.errors.remove({});
});

Tinytest.addAsync("Errors template works", function(test, done) {
	Meteor.Errors.throw("a new error!");
	test.equal(Meteor.errors.find({seen: false}).count(), 1);

	// render the template
	OnscreenDiv(Spark.render(fundtion() {
		return Template.meteorErrors();
	}));

	// wait a few milliseconds
	Meteor.setTimeout(function() {
		test.equal(Meteor.errors.find({seen: false}).count(), 0);
		test.equal(Meteor.errors.find({}).count(), 1);
		Meteor.Errors.clear();

		test.equal(Meteor.errors.find({seen: true}).count(), 0);
		done();
	}, 500);
});