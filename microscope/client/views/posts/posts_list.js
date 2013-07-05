Template.postsList.helpers({
  posts: function() {
  	return Posts.find({}, {sort: {votes: -1}, limit: postsHandle.limit()});
  },
  postsReady: function() {
  	return ! postsHandle.loading();
  },
  allPostsLoaded: function() {
  	return ! postsHandle.loading() && Posts.find().count() < postsHandle.loaded();
  }
});

Template.postsList.events({
	"click .load-more": function (e) {
		e.preventDefault();
		postsHandle.loadNextPage();
	}
});