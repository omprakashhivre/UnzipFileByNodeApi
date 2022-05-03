const express = require('express');
const multer = require('multer');
const decompress = require('decompress')
const ejs = require('ejs');
const path = require('path');
const Logger = require("../log/Logger")

module.exports = {

    uploadZip :  (req, res) => {
            try {
                upload(req, res, (err) => {
                    
                    if (err) {
                        console.log("2");
                        res.render('error', {
                        msg: err
                        });
                        //  res.send({status : 0 , error : "Some error occured "+err})
                    } else {
                        if (req.file == undefined) {
                            res.render('error', {
                                msg: 'Error: No File Selected!',
                                type: "error"
                            });
                        //  res.send("Please select any file for UnZipping")
                        } else {
                            res.render('index', {
                                msg: 'File Uploaded!',
                                file: `${req.file.filename}`
                            });
                            // res.sendFile(req.file.path)
                        }
                    }
                });
            } catch (error) {
                Logger.error("something went wrong " + error);
            }
            
        }
    }

    const storage = multer.diskStorage({
        destination: './Zip_Files/',
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });

    const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./Zip_Files'));
    const upload = multer({
        storage: storage,
        // limits: { fileSize: 10000000 },
        fileFilter: async function (req, file, cb) {
            checkFileType(file, cb);
    
        }
    }).single('myImage');

    async function checkFileType(file, cb) {
       
        if (file.mimetype == 'application/x-zip-compressed') {
            setTimeout(async () => {
                try {
                  await  decompress(`./Zip_Files/${file.originalname}`, `./Zip_Files/unzipped/${file.originalname.slice(0, -4)}`, {
                        map: file => {
                            // file.path = file.path
                            return file
                        }
                    })
                    Logger.info(file.originalname + ' file Extracted & Uploaded Successfully..')
                } catch (error) {
                    Logger.error(file.originalname + "  file is not a Zip file");
                }
    
    
            }, 5000)
        }
    
    
    
        if (file.mimetype == 'application/x-zip-compressed') {
            Logger.info(file.originalname + ' is an  Zip file. '+ file.mimetype +' == application/x-zip-compressed');
            return cb(null, true);
        } else {
            Logger.error(file.originalname + ' is not a Zip file cannot be extracted..');
            cb('Error: Only zip files allowed!');
        }
    }