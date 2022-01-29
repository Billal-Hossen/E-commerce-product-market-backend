module.exports=(err,req,res,next)=>{
    return res.status(500).send("Someting failed!!!");
}