const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    app.use(proxy(['/api', '/auth/google', '/uploads'], { target: 'http://[::1]:5000' }));
}