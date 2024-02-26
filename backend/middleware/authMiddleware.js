const jwt= require('jsonwebtoken');


module.exports = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log("process.env.JWT_TOKEN",process.env.JWT_TOKEN);
         const decodedToken = jwt.verify(token,process.env.JWT_TOKEN);
        console.log("decodedToken.userId",decodedToken.userId);
        req.body.userId = decodedToken.userId;
        next();
    } catch (error) {
        res.status(401).send({success:false,message:"Login Failed",error: error});
    }
}