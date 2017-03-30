 (function() {
 	function SongPlayer($rootScope, Fixtures) {
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
				
			   currentBuzzObject.bind('timeupdate', function() {
					 $rootScope.$apply(function() {
						  SongPlayer.currentTime = currentBuzzObject.getTime();
					 });
			   });
				song.playing = true;
				SongPlayer.currentSong = song;
			};
		
			var getSongIndex = function(song) {
				return SongPlayer.currentAlbum.songs.indexOf(song);
			};
		  
     		SongPlayer.currentAlbum = Fixtures.getAlbum();
		 	SongPlayer.currentSong = null;
			SongPlayer.volume = 80;
			/**
			* @desc Current playback time (in seconds) of currently playing song
			* @type {Number}
			*/
			SongPlayer.currentTime = null;	
			
		
		
			SongPlayer.setVolume = function(volume) {
				SongPlayer.volume = volume;
				if (currentBuzzObject) {
					currentBuzzObject.setVolume(volume);
				}
			};
			/**
 			* @function setCurrentTime
 			* @desc Set current time (in seconds) of currently playing song
 			* @param {Number} time
 			*/
			SongPlayer.setCurrentTime = function(time) {
			  	if (currentBuzzObject) {
					currentBuzzObject.setTime(time);
				}
			};
		
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
					currentBuzzObject.stop();
					SongPlayer.currentSong.playing = null;
				}
			};

		  
        	return SongPlayer;
	  	}
 
	 	angular
      	.module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();