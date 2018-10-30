(function() {
	function AlbumCtrl($stateParams, Fixtures, SongPlayer) {
		this.albumData = Fixtures.getAlbum($stateParams.id)
		this.songPlayer = SongPlayer
		this.songPlayer.currentAlbum = this.albumData
	}
	angular
		.module('blocJams')
		.controller('AlbumCtrl', ['$stateParams', 'Fixtures', 'SongPlayer', AlbumCtrl]);
})()
