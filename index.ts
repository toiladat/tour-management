import express, { Express,Request,Response } from "express";
const app:Express=express()
const port:number|String=3000

app.get('/tours',(req:Request,res:Response)=>{
  res.send('ok')
})


app.listen(port,()=>{
  console.log(`listening on port ${port}`);
  
})