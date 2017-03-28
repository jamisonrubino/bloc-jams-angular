 (function() {
 	function SongPlayer(Fixtures) {
   	var SongPlayer = {};

     	var currentAlbum = Fixtures.getAlbum();
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
					currentBuzzObject.stop();
					SongPlayer.currentSong.playing = null;
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
				return currentAlbum.songs.indexOf(song);
			};
		  
		
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
						var song = currentAlbum.songs[currentSongIndex];
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
					currentBuzzObject.stop();
					SongPlayer.currentSong.playing = null;
				}
			};

		  
        	return SongPlayer;
	  	}
 
	 	angular
      	.module('blocJams')
    		.factory('SongPlayer', ['Fixtures', SongPlayer]);
})();