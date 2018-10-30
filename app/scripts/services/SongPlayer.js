 (function() {
 	function SongPlayer($rootScope, Fixtures) {
	 	var SongPlayer = {},
		currentBuzzObject = null,

		/**
		* @function playSong
		* @desc plays song, sets song's playing attribute to true
		*/
	  	playSong = function(song) {
			currentBuzzObject.play()
			song.playing = true
			SongPlayer.currentSong.playing = true
	  	},


		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		setSong = function(song) {
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

		   currentBuzzObject.bind('timeupdate', function() {
				 $rootScope.$apply(function() {
					  SongPlayer.currentTime = currentBuzzObject.getTime();
				 });
		   });
			song.playing = true;
			SongPlayer.currentSong = song;
		},

		getSongIndex = function(song) {
			return SongPlayer.currentAlbum.songs.indexOf(song);
		},

		stopSong = function(song) {
			SongPlayer.pause()
			currentBuzzObject = null
			SongPlayer.currentSong = null
			SongPlayer.currentTime = null
		}

 		SongPlayer.currentAlbum = null
	 	SongPlayer.currentSong = null
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
				setSong(song)
				playSong(song)
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					currentBuzzObject.play()
					SongPlayer.currentSong.playing = true
				} else {
					var song = SongPlayer.currentAlbum.songs[0]
					setSong(song)
					playSong(song)
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
		 	song.playing = false
		 	SongPlayer.currentSong.playing = false
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
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
