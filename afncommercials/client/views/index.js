Template.index.helpers({
	videos: function () {
		return Videos.find();
	}
});

// Template.index.rendered = function () {

// 	var video = Videos.findOne({featured: true});
// 	var params = {allowScriptAccess: "always"};
// 	var atts = {id: "videoPlayer"};
// 	var size = {width: 640, height: 360};
	
// 	swfobject.embedSWF("http://www.youtube.com/v/" + video.youtubeId + "?version=3&enablejsapi=1&playerapiid=player1", 
// 	                   "featured-video", size.width, size.height, "9", null, null, params, atts);
// };