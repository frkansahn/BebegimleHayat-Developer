const middleware = {}

middleware['notUserAuthenticated'] = require('..\\middleware\\notUserAuthenticated.js')
middleware['notUserAuthenticated'] = middleware['notUserAuthenticated'].default || middleware['notUserAuthenticated']

middleware['userAuthenticated'] = require('..\\middleware\\userAuthenticated.js')
middleware['userAuthenticated'] = middleware['userAuthenticated'].default || middleware['userAuthenticated']

export default middleware
