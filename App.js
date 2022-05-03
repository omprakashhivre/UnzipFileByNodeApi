const express = require('express');
const multer = require('multer');
const decompress = require('decompress')
const ejs = require('ejs');
const path = require('path');

const controller = require('./controller/request')


// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './Zip_Files/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    // limits: { fileSize: 10000000 },
    fileFilter: async function (req, file, cb) {
        checkFileType(file, cb);

    }
}).single('myImage');

// Check File Type
async function checkFileType(file, cb) {
    console.log(file);
    if (file.mimetype == 'application/x-zip-compressed') {
        setTimeout(async () => {
            try {
              await  decompress(`./Zip_Files/${file.originalname}`, `./Zip_Files/unzipped/${file.originalname.slice(0, -4)}`, {
                    map: file => {
                        // file.path = file.path
                        return file
                    }
                })
                console.log('Extraction complete')
            } catch (error) {
                console.log(file.originalname + "  file is not a Zip file");
            }


        }, 5000)
    }



    if (file.mimetype == 'application/x-zip-compressed') {
        return cb(null, true);
    } else {
        cb('Error: Only zip files allowed!');
    }
}

// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./Zip_Files'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', controller.uploadZip);

const port = 5005;

app.listen(port, () => console.log(`Server started on port ${port}`));