
const config = {
	server: {
		protocol: 'http',
		hostname: 'localhost',
		port: 7777,
		basepath: '',
		url: ''
	},
	loadingMinimumTime: 250
}

config.server.url = `${config.server.protocol}://${config.server.hostname}${config.server.port ? `:${config.server.port}` : ''}${config.server.basepath}`

export default config
