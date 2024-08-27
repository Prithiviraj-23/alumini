const upload = require('../config/multerConfig');


const uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).send(err);
    } 
    if (req.file == undefined) {
      return res.status(400).send('No file selected!');
    } 

    const imageUrl = `/uploads/${req.file.filename}`;
  
    res.json({
      message: 'File uploaded successfully!',
      filePath: imageUrl
    });
  });
};

module.exports = {
  uploadImage
};
