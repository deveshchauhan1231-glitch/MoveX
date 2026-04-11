import supabase from "../config/supabase.js";
import { user } from "../models/Users.js";

async function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const token = bearerToken || req.cookies.token || req.cookies.access_token || req.cookies.refresh_token;

    if(!token)
    {
        return res.status(401).json({message :"Not authorised"});
    }

    try{
        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data?.user) {
            return res.status(401).json({message:"Invalid or expired token"});
        }

        req.user = {
            id: data.user.id,
            email: data.user.email,
            supabaseUser: data.user
        };
        req.appUser = await user.findOne({ supabaseUserId: data.user.id });

        next();
    }catch(err){
        return res.status(401).json({message:"Invalid or expired token"});
    }
};
export default authMiddleware;
