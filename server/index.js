
const express=require("express");
const formidable=require("formidable");
const fs = require('fs');
const path = require("path");
const config=require("./config");
const app=express();
const port=config.app.port;


app.post("/api/upload",(req,res,next)=>{
    const form=new formidable.IncomingForm();
    // const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        let oldpath=files.my_file.filepath;
        let newpath=path.resolve(config.app.dir,files.my_file.originalFilename);

        fs.rename(oldpath,newpath,(err)=>{
            if(err) return console.log("Error in saving file");
            console.log("file uploaded successfully")
            res.json({ fields, files });
        })
    });
})

//Start Server
app.listen(port,()=>{
    console.log("The server is up and running...")
})