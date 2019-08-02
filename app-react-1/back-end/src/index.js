const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer')
const fs = require('fs');
const cors = require('cors');
const formidable = require("formidable");
const UserModels = require("./models/userModels");
const PostModels = require("./models/postModels");
const connectDB = require("./config/connectDB");
const bcrypt = require("bcrypt")

  const server = express();
  server.use(express.static('public'));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(cors({
    origin : ['http://localhost:3000'],
  }))

  //connect DB
  connectDB();

  //create folder upload image
  let dir = `./public/images`;
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  //show all
  server.get('/api/get-all', async(req, res) => {
      let posts = await PostModels.find({});
      res.status(200).send({data : posts});
    });

  //dky tai khoan
  server.post("/api/register", async(req, res) => {
    const {emailRegister,passRegister} = req.body;
    let user = await UserModels.findByUserName(emailRegister);
    if(!user){
      let salt = bcrypt.genSaltSync(7);
      let userItem = {
      userName: emailRegister,
      password: bcrypt.hashSync(passRegister, salt),
      }
  
      let user = await UserModels.createNew(userItem);
      if(user) res.status(201).send("Đăng ký thành công!");
      else res.status(201).send("Đã xảy ra lỗi khi đăng ký!")
    }
    else 
      res.status(201).send("Tài khoản đã được sử dụng")
  });

  //dang nhap
  server.post('/api/sing-in', async(req, res) => {
    let {emailLogin, passLogin} = req.body
    let user = await UserModels.findByUserName(emailLogin);
    if(user){
      let checkPass =await user.comparePassword(passLogin);
      if(checkPass){
        res.status(200).send({message : "success", author: user._id, permissions: user.permissions});
      }
    }
    else 
      res.status(201).send('Sai mat khau!');
  });

  //upload-image
  server.post("/api/upload-image", async(req, res, next) => {
    let form = new formidable.IncomingForm(); 
    form.uploadDir = `${dir}`;
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; //10mb
    form.multiples = true;
    await form.parse(req, async(err, fields, files) => {
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
  
        let postItems = {
            name: fields["name"],
            description : fields["description"],
            price : fields["price"],
            author : fields["author"],
            utilities : fields["utilities"],
            path: fileName[fileName.length-1].path,
            imageUrl : fileName[fileName.length-1].path.replace("public/" ,""),
            model: Math.floor(Math.random() * 2),
            good: Math.floor(Math.random() * 2),
            createAt: new Date().toLocaleDateString(),
        };
        let post = await PostModels.createNew(postItems);
        if(!post)
          res.status(500).send('Internet server error');
        else {
          res.status(201).json({
            result: "ok",
            message: "upload-success",
            data:post
          });
        }
      } else {

        let postItems = {
              name: fields["name"],
              description : fields["description"],
              price : fields["price"],
              author : fields["author"],
              utilities : fields["utilities"],
              path: arrayOfFiles.path,
              imageUrl : arrayOfFiles.path.replace("public/" ,""),
              model: Math.floor(Math.random() * 2),
              good: Math.floor(Math.random() * 2),
              createAt: new Date().toLocaleDateString(),
          };
  
          let post = await PostModels.createNew(postItems);
            if(!post)
              res.status(500).send('Internet server error');
            else {
              res.status(201).json({
                result: "ok",
                message: "upload-success",
                data:post
              });
            }
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
    form.parse(req, async(err, fields, files) => {
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
          
        let _dataImage= await PostModels.findPostById(temp)
        
        try {
          fs.unlinkSync(_dataImage.path)
          //file removed
        } catch(err) {
          res.status(500).json({
            result: "failed",
            data: {},
            message: `${err}`
          })
          console.error(err)
        }

        let dataImage = await PostModels.findIdAndUpdate(
          temp,
          fields["name"],
          fields["description"],
          fields["price"],
          fields["utilities"],
          fileName[fileName.length-1].path,
          fileName[fileName.length-1].path.replace("public/" ,""),
          Date.now(),
        )
        if(dataImage){
          res.status(201).json({
            result: "ok",
            data: dataImage,
            temp:temp,
            numberOfImages: fileName.length,
            message: "edit-success"
          })
        }
      }else {
        let _dataImage= await PostModels.findPostById(temp)
        try {
          fs.unlinkSync(_dataImage.path)
          //file removed
        } catch(err) {
          res.status(500).json({
            result: "failed",
            data: {},
            message: `${err}`
          })
          console.error(err)
        }
        let dataImage = await PostModels.findIdAndUpdate(
          temp,
          fields["name"],
          fields["description"],
          fields["price"],
          fields["utilities"],
          arrayOfFiles.path,
          arrayOfFiles.path.replace("public/" ,""),
          Date.now(),
        )
        if(dataImage){
          res.status(201).json({
            result: "ok",
            data: dataImage,
            temp:temp,
            numberOfImages: arrayOfFiles.length,
            message: "edit-success"
          })
        }
      }
    })
  })

  //delete-image 
  server.post("/api/del-image", (req,res) => {
    const listData = req.body
    console.log(listData)
    listData.forEach(async(temp,index) => {
      let dataImage= await PostModels.findPostById(temp);
      let path = dataImage.path;
      await PostModels.findIdAndRemove(temp);
      try {
        fs.unlinkSync(path)
        //file removed
      } catch(err) {
        res.status(500).json({
          result: "failed",
          data: {},
          message: `${err}`
        })
      }
    });
      res.status(201).json({
      result: "ok",
      message: "delete-success"
    })
  })

  //show detail
  server.get("/api/images/:imageId" ,async(req,res)=>{
    const { imageId } = req.params;
    let posts =await PostModels.findById(imageId);
    res.status(201).json({
      result : "ok",
      data : posts
    })
  })

  server.listen(3001, (error) => {
    if (error) {
      throw error;
    }
    console.log('Server listen on port 3001...');
  });
