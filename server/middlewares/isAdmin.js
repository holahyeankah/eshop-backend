const isAdmin=(req ,res, next)=>{
    if(req.decoded.role !== "admin"){
        res.status(403).json({message:"Access denied"})
    }
    return next()
}

export default isAdmin