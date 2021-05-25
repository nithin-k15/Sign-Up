
const express = require('express')
const bodyParser = require('body-parser');
const app=express();
const https = require('https')
app.use(express.static("public"))
const request=require('request');
const { static } = require('express');

app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+'/signup.html')
})
app.post("/",function(req,res){
    const firstName=req.body.firstName
    const lastName=req.body.lastName
    const email=req.body.email
    
    
    var data = {
        members:[
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    }

    const jsonData =JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/40a569e440"

    const options = {
        method : "POST",
        auth : "nithin:510130360044ce763877dfb87d6c8489-us6"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    
    // request.write(jsonData)
    request.end()
})
app.post("/failure",function(req,res){
    res.redirect("/")
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server running at port 3000");
})

//API Key
// 510130360044ce763877dfb87d6c8489-us6

// List ID
// 40a569e440