const jsonwebtoken = require('jsonwebtoken');
const JWT_SECRET = 'Adharisagoodboy';
const fetchUser = (req, res, next)=>{

    const token = req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }

    try {
        const data = jsonwebtoken.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
}
module.exports = fetchUser;