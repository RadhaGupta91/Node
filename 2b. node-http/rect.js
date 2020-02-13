module.exports = (x,y,callback)=>{
    if(x<=0 || y<=0)
    {
        setTimeout(() => callback(new Error("Rectangle dimensions should be greater than zero"),null)
                        , 1000);
    }else{
        callback(null,{
            perimeter:()=>(2*(x+y)),
            area:()=>(x*y),
        })
    }
}