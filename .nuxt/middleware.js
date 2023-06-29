const middleware = {}

middleware['adminAuthenticated'] = require('..\\middleware\\adminAuthenticated.js')
middleware['adminAuthenticated'] = middleware['adminAuthenticated'].default || middleware['adminAuthenticated']

middleware['notAdminAuthenticated'] = require('..\\middleware\\notAdminAuthenticated.js')
middleware['notAdminAuthenticated'] = middleware['notAdminAuthenticated'].default || middleware['notAdminAuthenticated']

middleware['notUserAuthenticated'] = require('..\\middleware\\notUserAuthenticated.js')
middleware['notUserAuthenticated'] = middleware['notUserAuthenticated'].default || middleware['notUserAuthenticated']

middleware['userAuthenticated'] = require('..\\middleware\\userAuthenticated.js')
middleware['userAuthenticated'] = middleware['userAuthenticated'].default || middleware['userAuthenticated']

middleware['userAuthenticatedAndCart'] = require('..\\middleware\\userAuthenticatedAndCart.js')
middleware['userAuthenticatedAndCart'] = middleware['userAuthenticatedAndCart'].default || middleware['userAuthenticatedAndCart']

export default middleware
