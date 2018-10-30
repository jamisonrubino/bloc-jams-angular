(function() {
	function AlbumCtrl($stateParams, Fixtures, SongPlayer) {
		this.albumData = Fixtures.getAlbum($stateParams.id)
		this.songPlayer = SongPlayer
		this.songPlayer.currentAlbum = this.albumData
		this.songPlayer.currentSong = null
		
		console.log(this.songPlayer)
	}
	angular
		.module('blocJams')
		.controller('AlbumCtrl', ['$stateParams', 'Fixtures', 'SongPlayer', AlbumCtrl]);
})()
