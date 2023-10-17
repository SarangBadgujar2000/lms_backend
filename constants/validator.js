const emailValidator=(email)=>{
    const regex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if(regex.test(email)){
        return true;
    }
    return false;
}

module.exports=emailValidator