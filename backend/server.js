const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const auth = require("./middleware/auth");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// ✅ Models
const User = require("./models/User");
const Job = require("./models/Job");
const Application = require("./models/Application");
const storage = multer.diskStorage({

    destination: function(req,file,cb){
        cb(null,"uploads/");
    },

    filename: function(req,file,cb){
        cb(
          null,
          Date.now() + path.extname(file.originalname)
        );
    }
});

const upload = multer({ storage });
// ✅ MongoDB Connection
async function connectDB() {
    try {
        await mongoose.connect(
            "mongodb://Krishna:1234@ac-5wisdo9-shard-00-00.sl58hqc.mongodb.net:27017,ac-5wisdo9-shard-00-01.sl58hqc.mongodb.net:27017,ac-5wisdo9-shard-00-02.sl58hqc.mongodb.net:27017/placement?ssl=true&replicaSet=atlas-kz2vbw-shard-0&authSource=admin&retryWrites=true&w=majority"
        );
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("DB Error:", error);
    }
}

connectDB();

// ✅ Test route
app.get("/", (req, res) => {
    res.send("API running");
});

// ✅ Register
const bcrypt = require("bcryptjs");

app.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Login
const jwt = require("jsonwebtoken");

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            "secretkey",
            { expiresIn: "1d" }
        );

        res.json({ token, user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// ✅ Add Job
app.post("/job", auth, async (req, res) => {
    try {

        const job = await Job.create({
            ...req.body,
            recruiterId: req.user.id
        });

        res.json(job);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get Jobs
app.get("/jobs", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Apply Job
app.post("/apply", auth, async (req,res)=>{
    try {
        const { userId, jobId } = req.body;

        const exists = await Application.findOne({ userId, jobId });

        if(exists){
            return res.status(400).json({ message: "Already applied" });
        }

        const user = await User.findById(userId);


    const application = await Application.create({

    userId,

    jobId,

    resume: user.resume,

    status: "Applied"
    });

        res.json(application);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/applications/:userId", auth, async (req,res)=>{

    try {

        const apps = await Application.find({
            userId: req.params.userId
        });

        const jobs = await Job.find();

        const result = apps.map(a => {

            const job = jobs.find(
              j => j._id.toString() === a.jobId
            );

            return {
                ...a._doc,
                job
            };
        });

        res.json(result);

    } catch (error) {

        res.status(500).json({
          error: error.message
        });
    }
});
app.get("/company/applications", auth, async (req,res)=>{
  try {

    // FIND ONLY COMPANY JOBS
    const companyJobs = await Job.find({
      recruiterId: req.user.id
    });

    const jobIds = companyJobs.map(
      j => j._id.toString()
    );

    // FIND ONLY APPLICATIONS FOR THOSE JOBS
    const apps = await Application.find({
      jobId: { $in: jobIds }
    });

    const users = await User.find();

    const result = apps.map(a => {

      return {
        ...a._doc,

        user: users.find(
          u => u._id.toString() === a.userId
        ),

        job: companyJobs.find(
          j => j._id.toString() === a.jobId
        )
      };
    });

    res.json(result);

  } catch (err){
    res.status(500).json({
      error: err.message
    });
  }
});
app.put("/application/status/:id", auth, async (req,res)=>{
  try {
    const { status } = req.body;

    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(app);

  } catch (err){
    res.status(500).json({ error: err.message });
  }
});
app.post(
  "/upload-resume",
  auth,
  upload.single("resume"),

  async (req,res)=>{

    try {

      const user = await User.findByIdAndUpdate(

        req.user.id,

        {
          resume:
            "http://localhost:5000/uploads/" +
            req.file.filename
        },

        { new:true }
      );

      res.json(user);

    } catch(err){

      res.status(500).json({
        error: err.message
      });
    }
});
// ✅ Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});