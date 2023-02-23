amount of coins - in FE

already exists in FE?: NO

must ask that info from the server

according to what should I ask that info? - userId

If I have a login - I should know which user I am

take that userId, and ask the server for his coins

GET /users/:userId/coins // only coins
or GET /users/:userId // all the user's data

1. keep user data after login - recommended auth-context
2. make request to the server with his userId
3. create an endpoint (in the router) that will get us that info ('/users/:userId')
4. optional: save that data somewhere (state / state inside context)
