(function() {
	function Fixtures() {
		var Fixtures = {},
		albums = [
		  {
		    title: 'The Colors',
				artist: 'Pablo Picasso',
				label: 'Cubism',
				year: '1881',
				albumArtUrl: '/assets/images/album_covers/01.png',
				songs: [
					 { title: 'Blue', duration: '161.71', audioUrl: '/assets/music/blue' },
					 { title: 'Green', duration: '103.96', audioUrl: '/assets/music/green' },
					 { title: 'Red', duration: '268.45', audioUrl: '/assets/music/red' },
					 { title: 'Pink', duration: '153.14', audioUrl: '/assets/music/pink' },
					 { title: 'Magenta', duration: '374.22', audioUrl: '/assets/music/magenta' }
				],
				id: 1
		  	},
			{
				title: 'The Telephone',
				artist: 'Guglielmo Marconi',
				label: 'EM',
				year: '1909',
				albumArtUrl: '/assets/images/album_covers/20.png',
				songs: [
					 { title: 'Hello, Operator?', duration: '161.71', audioUrl: '/assets/music/blue' },
					 { title: 'Ring, ring, ring', duration: '103.96', audioUrl: '/assets/music/green' },
					 { title: 'Fits in your pocket', duration: '268.45', audioUrl: '/assets/music/red' },
					 { title: 'Can you hear me now?', duration: '153.14', audioUrl: '/assets/music/pink' },
					 { title: 'Wrong phone number', duration: '374.22', audioUrl: '/assets/music/magenta' }
				],
				id: 2
			},
			{
				title: 'Spring',
				artist: 'Time',
				label: 'Four Seasons',
				year: '2017',
				albumArtUrl: 'assets/images/album_covers/14.png',
				songs: [
					{ title: 'In', duration: '161.71', audioUrl: '/assets/music/blue' },
					{ title: 'Out', duration: '103.96', audioUrl: '/assets/music/green' },
					{ title: 'Up', duration: '268.45', audioUrl: '/assets/music/red' },
					{ title: 'Down', duration: '153.14', audioUrl: '/assets/music/pink' },
					{ title: 'Left/Right', duration: '374.22', audioUrl: '/assets/music/magenta' }
				],
				id: 3
			}
		]

		Fixtures.getAlbum = function(i) {
			return albums.find(album=>album.id==i)
		}

  	Fixtures.getCollection = function(numberOfAlbums) {
			var albumList = [];
			for(var i=0; i<(numberOfAlbums-1); i++) {
				albumList.push(albums[i%3])
			}
			return albumList
		}

    return Fixtures
	}

     angular
         .module('blocJams')
         .factory('Fixtures', Fixtures);
 })()
