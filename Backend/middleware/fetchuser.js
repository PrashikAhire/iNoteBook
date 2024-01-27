const jwt = require('jsonwebtoken');
const JSON_SECRET = "prry#sagoodb@y";

//the following function fetches the info from user
const fetchuser=(req,res,next)=>{
    //Get the token from JWT and add id to request object
    const token = req.header('auth-token');
    // manually enter a new header in thunder client that is auth-token and pass token to it

    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    
    try {
        // verify that it is a token
    const data =  jwt.verify(token,JSON_SECRET);
    //now data of user is in the req.user------------------>in auth.js we are using req.user.id(to get the id of the user)
    req.user = data.user;
    next();
    } catch (error) {
         res.status(401).send({error:"Please authenticate using a valid token"})
    }
}
module.exports = fetchuser;