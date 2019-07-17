const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer')
const fs = require('fs');
const cors = require('cors');
const formidable = require("formidable");

  const server = express();
  server.use(express.static('public'));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(cors({
    origin : ['http://localhost:3000'],
  }))

  //create folder upload image
  let dir = `./public/images`;
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  server.get('/api/get-all', (req, res) => {
    fs.readFile('./data.json', (err,data)=>{
      if(err) res.status(500).send('Internet server error');
      const ProData=JSON.parse(data);

      res.status(200).send({data : ProData});
    });
  })

  server.post('/api/sing-in', (req, res) => {
    if(req.body.id === "admin" && req.body.pass === "admin")
      res.status(200).send({message : "success"});
    else
    res.status(200).send({message : "error"});
  })
  
  server.post("/api/upload-image", async(req, res, next) => {
    let form = new formidable.IncomingForm(); 
    form.uploadDir = `${dir}`;
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; //10mb
    form.multiples = true;
    await form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({
          result: "failed",
          data: {},
          message: `${err}`
        })
      }

      const arrayOfFiles = files["file"];
      if (arrayOfFiles.length > 0) {
        let fileName = [];
        arrayOfFiles.forEach((eachFile) => {
          fileName.push(eachFile.path.split("/")[2]); 
        });

        fs.readFile('./data.json', (err,data)=>{
          if(err) res.status(500).send('Internet server error');
          const dataImage=JSON.parse(data);
  
          dataImage.push({
              id: dataImage.length,
              name: fileName[fileName.length-1].name,
              path: fileName[fileName.length-1].path,
              imageUrl : fileName[fileName.length-1].path.replace("public/" ,""),
              model: Math.floor(Math.random() * 2),
              good: Math.floor(Math.random() * 2),
              createAt: new Date().toLocaleDateString(),
          });

        fs.writeFile('./data.json', JSON.stringify(dataImage) ,(err,data)=>{
              if(err) 
                 res.status(500).send('Internet server error');
                 res.status(201).json({
                  result: "ok",
                  data: dataImage[dataImage.length-1],
                  numberOfImages: fileName.length,
                  message: "upload-success"
                })
            });
      });

      } else {
        fs.readFile('./data.json', (err,data)=>{
          if(err) res.status(500).send('Internet server error');
          const dataImage=JSON.parse(data);
  
          dataImage.push({
              id: dataImage.length,
              name: arrayOfFiles.name,
              path: arrayOfFiles.path,
              imageUrl : arrayOfFiles.path.replace("public/" ,""),
              model: Math.floor(Math.random() * 2),
              good: Math.floor(Math.random() * 2),
              createAt: new Date().toLocaleDateString(),
          });
  
          fs.writeFile('./data.json', JSON.stringify(dataImage) ,(err,data)=>{
              if(err) 
                 res.status(500).send('Internet server error');
                 res.status(201).json({
                  result: "ok",
                  data: dataImage[dataImage.length-1],
                  numberOfImages: arrayOfFiles.length,
                  message: "upload-success"
                })
            }); 
        })
      }
  })
})

  //edit image
  server.post("/api/edit-image", (req,res) => {
    let form = new formidable.IncomingForm(); 
    form.uploadDir = `${dir}`;
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; //10mb
    form.multiples = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({
          result: "failed",
          data: {},
          message: `${err}`
        })
      }
      
      const temp = fields["temp"];
      const arrayOfFiles = files["file"];


      if (arrayOfFiles.length > 0) {
        let fileName = [];
        arrayOfFiles.forEach((eachFile) => {
          fileName.push(eachFile.path.split("/")[2]); 
        });

        fs.readFile('./data.json', (err,data)=>{
          
          if(err) res.status(500).send('Internet server error');
          const dataImage=JSON.parse(data);
          
          try {
            fs.unlinkSync(dataImage[temp].path)
            //file removed
          } catch(err) {
            res.status(500).json({
              result: "failed",
              data: {},
              message: `${err}`
            })
            console.error(err)
          }

          dataImage[temp].name = fileName[fileName.length-1].name;
          dataImage[temp].path = fileName[fileName.length-1].path;
          dataImage[temp].imageUrl = fileName[fileName.length-1].path.replace("public/" ,""),
          dataImage[temp].model = Math.floor(Math.random() * 2);
          dataImage[temp].good = Math.floor(Math.random() * 2);
          dataImage[temp].editAt = new Date().toLocaleDateString(),
          // console.log(dataImage);
          fs.writeFile('./data.json', JSON.stringify(dataImage) ,(err,data)=>{
              if(err) 
                 res.status(500).send('Internet server error');
                 res.status(201).json({
                  result: "ok",
                  data: dataImage[temp],
                  temp:temp,
                  numberOfImages: fileName.length,
                  message: "edit-success"
                })
            });
      });

      } else {
        fs.readFile('./data.json', (err,data)=>{
          if(err) res.status(500).send('Internet server error');
          const dataImage=JSON.parse(data);

          try {
            fs.unlinkSync(dataImage[temp].path)
            //file removed
          } catch(err) {
            res.status(500).json({
              result: "failed",
              data: {},
              message: `${err}`
            })
            console.error(err)
          }
          
          dataImage[temp].name = arrayOfFiles.name;
          dataImage[temp].path = arrayOfFiles.path;
          dataImage[temp].imageUrl = arrayOfFiles.path.replace("public/" ,""),
          dataImage[temp].model = Math.floor(Math.random() * 2);
          dataImage[temp].good = Math.floor(Math.random() * 2);
          dataImage[temp].editAt = new Date().toLocaleDateString(),
          // console.log(dataImage);
  
          fs.writeFile('./data.json', JSON.stringify(dataImage) ,(err,data)=>{
              if(err) 
                 res.status(500).send('Internet server error');
                 res.status(201).json({
                  result: "ok",
                  data: dataImage[temp],
                  temp:temp,
                  numberOfImages: arrayOfFiles.length,
                  message: "edit-success"
                })
            }); 
        })
      }
    })
  })

  //delete-image 
  server.post("/api/del-image", (req,res) => {
    const listData = req.body
    fs.readFile('./data.json', (err,data)=>{
      if(err) res.status(500).send('Internet server error');
      const dataImage=JSON.parse(data);
      listData.forEach((temp,index) => {
        try {
          fs.unlinkSync(dataImage[temp-index].path)
          //file removed
        } catch(err) {
          res.status(500).json({
            result: "failed",
            data: {},
            message: `${err}`
          })
        }
        dataImage.splice(temp-index,1);
      });
      dataImage.forEach((temp,index)=>{
        temp.id = index
      })
      

      fs.writeFile('./data.json', JSON.stringify(dataImage) ,(err,data)=>{
          if(err) 
             res.status(500).send('Internet server error');
             res.status(201).json({
              result: "ok",
              data: dataImage,
              message: "delete-success"
            })
        }); 
    })
  })

  server.listen(3001, (error) => {
    if (error) {
      throw error;
    }
    console.log('Server listen on port 3001...');
  });
