 (function() {
 	function SongPlayer() {
        	var SongPlayer = {};		  
		  	var currentSong = null;
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
					currentSong.playing = null;
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
				currentSong = song;
			};
		  
			
			/**
			* @function SongPlayer.play
			* @desc SongPlayer's play method, stops current song, if playing, and plays new song
			*/
		  	SongPlayer.play = function(song) {  		
				if (currentSong !== song) {
					setSong(song);
					playSong(song);
				} else if (currentSong === song) {
					if (currentBuzzObject.isPaused()) {
						currentBuzzObject.play();
					}
				}
				
     		};
				
		  
			/**
			* @function SongPlayer.pause
			* @desc SongPlayer's pause method, pauses currently playing song
			*/
		 	SongPlayer.pause = function(song) {
				currentBuzzObject.pause();
			 	song.playing = false;
		 	};
		  
        	return SongPlayer;
	  	}
 
	 	angular
      	.module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();