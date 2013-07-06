Template.postsList.helpers({
  postsWithRank: function() {
    var i = 0, options = {sort: this.sort, limit: this.handle.limit()};

    return Posts.find({}, options).map(function(post) {
        post._rank = i;
        i += 1;
        return post;
      }); 
  },
  posts: function() {
  	return Posts.find({}, {sort: this.sort, limit: this.handle.limit()});
  },
  postsReady: function() {
  	return ! this.handle.loading();
  },
  allPostsLoaded: function() {
  	return ! this.handle.loading() && Posts.find().count() < this.handle.loaded();
  }
});

Template.newPosts.helpers({
  options: function () { 
    return {
      sort: {submitted: -1},
      handle: newPostsHandle
    };
  }
});

Template.bestPosts.helpers({
  options: function () {
    return {
      sort: {votes: -1, submitted: -1},
      handle: bestPostsHandle
    };
  }
});

Template.postsList.events({
	"click .load-more": function (e) {
		e.preventDefault();
		this.handle.loadNextPage();
	}
});

Template.postItem.rendered = function () {
  // animate post from previous position to new position
  var instance = this;
  var rank = instance.data._rank;
  var $this = $(this.firstNode);
  var postHeight = 80;
  var newPosition = rank * postHeight;

  // if element has a currentPosition (i.e. it's not the first ever render)
  if(typeof(instance.currentPosition) !== "undefined") {
    var previousPosition = instance.currentPosition;
    // calculate the difference between old and new position and send the element there
    var delta = previousPosition - newPosition;
    $this.css("top", delta + "px");
  }

  // let meteor draw in the old position
  Meteor.defer(function() {
    instance.currentPosition = newPosition;

    // bring element back to its new original position
    $this.css("top", "0px");
  });
};