var Hapi = require('hapi'),
    path = require('path'),
    port = process.env.PORT || 3000,
    server = new Hapi.Server(port),
    routes = {
        css: {
            method: 'GET',
            path: '/styles/{path*}',
            handler: createDirectoryRoute('styles')
        },
        js: {
            method: 'GET',
            path: '/scripts/{path*}',
            handler: createDirectoryRoute('scripts')
        },
        assets: {
            method: 'GET',
            path: '/assets/{path*}',
            handler: createDirectoryRoute('assets')
        },
        templates: {
            method: 'GET',
            path: '/templates/{path*}',
            handler: createDirectoryRoute('templates')
        },
        spa: {
            method: 'GET',
            path: '/{path*}',
            handler: {
                file: path.join(__dirname, '/app/index.html')
            }
        }
    };

	console.log('__dirname' , __dirname);
    console.log('path', '/{path*}');

server.route([ routes.css, routes.js, routes.assets, routes.templates, routes.spa ]);
server.start( onServerStarted );

function onServerStarted() {
    console.log( 'Server running on port ', port );
}

function createDirectoryRoute( directory ) {
    return {
        directory: {
            path: path.join(__dirname, '/app/', directory)
        }
    };
}

module.exports = server;
