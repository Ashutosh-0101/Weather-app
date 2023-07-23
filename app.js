const express= require("express");
const https=require("https");
const bodyParser= require("body-parser");

const app=express()
app.use(bodyParser.urlencoded({extended:true}));
 
app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/index.html");


    
});
app.post("/",function(req,res) {
    
    const query=req.body.cityName;
    const apiid="e17a8db6fe6296da3e4bc75613c18557";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid="+apiid;
    https.get(url,function(responce){
        console.log(responce.statusCode);
        responce.on("data",function(data){
        const weatherReport=JSON.parse(data);
        console.log(weatherReport);
        const temp=weatherReport.main.temp;
        const desc=weatherReport.weather[0].description;
        const icon=weatherReport.weather[0].icon;
        res.write("<p>The Waether is curently"+desc+"</p>");
        res.write("<h1>The teamperature of the"+query+"is "+temp+"degree celcious");
        res.send();

      
    })
    })

    
}) 











app.listen(3000,function(){
    console.log("the server is running at the port 3000");
})