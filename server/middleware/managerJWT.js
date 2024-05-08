const jwt = require("jsonwebtoken")

const managerJWT = (req,res,next) =>{
    const authHeader = req.headers.authorization || req.Headers.authorization
    if(!authHeader?.startsWith('Bearer ')){
        return res.status(401).json({message: 'Unauthorized'})
    }
    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decode) => {
            if(err){
                return res.status(403).json({message:"Forbidden"})
            }
            req.user = decode
            if(decode.role!="manager"){
                return res.status(403).json({message:"You do not have appropriate permission"})
            }
            next()
        }
    )
}


module.exports = managerJWT