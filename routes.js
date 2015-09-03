module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: require('./controllers/index')
    },
    {
        method: 'GET',
        path: '/{file*}',
        handler: {
            directory: { path: 'public' }
        }
    }
];
