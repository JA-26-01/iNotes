const jwt = require('jsonwebtoken');
const JWT_SECRET= "Jesmine is a good girl";

const fetchuser = (req,res,next) =>
{
    //get user from the jwt token and add the id to the request object
    const token = req.header('authtoken');
    if(!token)
      res.status(401).send({error:"Access Denied"})
    try{
    const authres=jwt.verify(token,JWT_SECRET);
    req.user=authres.user;
    next()
    }
    catch(error)
    {
        res.status(401).send({error:"Access Denied"})
    }
}

module.exports=fetchuser;