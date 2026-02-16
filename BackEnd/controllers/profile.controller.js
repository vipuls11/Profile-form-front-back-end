const cloudinary = require("../config/cloudinary.js");
const User = require("../models/User.mongo.js")
const pool = require("../config/db.js")

const createProfile = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
     if (!req.file) {
   return res.status(400).json({ message: "Image required" });
 }
  const upload = await cloudinary.uploader.upload(req.file.path);

  const payload = {
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    image: upload.secure_url,
  };

  // MongoDB save
  await User.create(payload);

  // MySQL save
try {
  await pool.execute(
    "INSERT INTO users(name,email,mobile,image) VALUES(?,?,?,?)",
    Object.values(payload)
  );
  res.json({ success: true });
} catch (err) {
  console.error(err);
  res.status(500).json({ error: "Database error" });
}
  res.json({ success: true });
};
 module.exports = createProfile