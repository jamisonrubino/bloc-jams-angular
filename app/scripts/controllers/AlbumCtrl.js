(function() {
	function AlbumCtrl() {
		this.album = this.albums["Picasso"];
		for (var i=0; i < 12; i++) {
			this.albums.push(angular.copy(albumPicasso));
		}
	}
	angular
		.module('blocJams')
		.controller('CollectionCtrl', CollectionCtrl);
 })();