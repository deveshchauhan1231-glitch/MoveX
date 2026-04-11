import jwt from "jsonwebtoken"
function authMiddleware(req,res,next){
    const token = req.cookies.token || req.cookies.access_token || req.cookies.refresh_token;
    if(!token)
    {
        return res.status(401).json({message :"Not authorised"});
    }
    try{
        //here we are verifying and attaching the decoded info to req.user so we can access it later on 
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        return res.status(401).json({message:"Invalid or expired token"});
    }
};
export default authMiddleware;