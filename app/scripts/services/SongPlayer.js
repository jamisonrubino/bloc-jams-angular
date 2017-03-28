 (function() {
 	function SongPlayer(Fixtures) {
   	var SongPlayer = {};
		var currentBuzzObject = null;

			/**
			* @function playSong
			* @desc plays song, sets song's playing attribute to true
			*/
		  	var playSong = function (song) {
				currentBuzzObject.play();
				song.playing = true;
		  	}
		  
			
			/**
			* @function setSong
			* @desc Stops currently playing song and loads new audio file as currentBuzzObject
			* @param {Object} song
			*/
			var setSong = function(song) {
				if (currentBuzzObject) {
					stopSong(SongPlayer.currentSong);
				}
				/**
				* @desc Buzz object audio file
				* @type {Object}
				*/
				currentBuzzObject = new buzz.sound(song.audioUrl, {
					formats: ['mp3'],
					preload: true
				});
				song.playing = true;
				SongPlayer.currentSong = song;
			};
		
			var getSongIndex = function(song) {
				return SongPlayer.currentAlbum.songs.indexOf(song);
			};
		
			var stopSong = function(song) {
				currentBuzzObject.stop();
				song.playing = null;
			};
		  
     		SongPlayer.currentAlbum = Fixtures.getAlbum();
		 	SongPlayer.currentSong = null;
			
			/**
			* @function SongPlayer.play
			* @desc SongPlayer's play method, stops current song, if playing, and plays new song
			*/
		  	SongPlayer.play = function(song) {  
				song = song || SongPlayer.currentSong;
				if (SongPlayer.currentSong !== song) {
					setSong(song);
					playSong(song);
				} else if (SongPlayer.currentSong === song) {
					if (currentBuzzObject.isPaused()) {
						currentBuzzObject.play();
					} else {
						var song = SongPlayer.currentAlbum.songs[currentSongIndex];
						setSong(song);
						playSong(song);
					}
				}
     		};
				
		  
			/**
			* @function SongPlayer.pause
			* @desc SongPlayer's pause method, pauses currently playing song
			*/
		 	SongPlayer.pause = function(song) {
				song = song || SongPlayer.currentSong;
				currentBuzzObject.pause();
			 	song.playing = false;
		 	};
		
			SongPlayer.previous = function() {
				 var currentSongIndex = getSongIndex(SongPlayer.currentSong);
				 currentSongIndex--;		
				if (currentSongIndex < 0) {
					stopSong(SongPlayer.currentSong);
				} else {
					stopSong(SongPlayer.currentSong);
					setSong(SongPlayer.currentAlbum.songs[currentSongIndex]);
					playSong(SongPlayer.currentSong);
				}
			};
		
			SongPlayer.next = function(song) {
				var currentSongIndex = getSongIndex(SongPlayer.currentSong);
				if (currentSongIndex < (SongPlayer.currentAlbum.songs.length - 1)) {
					currentSongIndex++;
					stopSong(SongPlayer.currentSong);
					setSong(SongPlayer.currentAlbum.songs[currentSongIndex]);
					playSong(SongPlayer.currentSong);
				} else {
					stopSong(SongPlayer.currentSong);
				}

			};

		  
        	return SongPlayer;
	  	}
 
	 	angular
      	.module('blocJams')
    		.factory('SongPlayer', ['Fixtures', SongPlayer]);
})();