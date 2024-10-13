const express = require("express");
const path = require("path");
const app = express();
const job = require("./jobs.js");
const env = require("dotenv").config();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const mustachExpress = require("mustache-express");
const { error } = require("console");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

app.set("views", path.join(__dirname, "pages"));
app.set("view engine", "mustache");
app.engine("mustache", mustachExpress());

app.get("/", (req, res) => {
  // res.send('hello')
  // res.sendFile(path.join(__dirname,'pages/index.html'))
  res.render("index", { jobs: job });
});

app.get("/jobs/:id", (req, res) => {
  const reqid = req.params.id;
  const matchfound = job.find((job) => reqid == job.id);
  console.log("job found", matchfound);
  res.render("jobs", { job: matchfound });
});

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 25,
  secure: false,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post("/jobs/:id/apply", (req, res) => {
  const { name, email, phone, dob, coverletter } = req.body;
  const id = req.params.id;
  const matchfound = job.find((j) => j.id.toString() === id);

  const mailOptions = {
    from: `${process.env.FROM_EMAIL}`,
    to: `${process.env.TO_EMAIL}`,
    subject: `New application request for ${matchfound.title}`,
    html: `
    <h1>Jovian Form data</h1>
      <p><strong>Name : </strong>${name} </p>
      <p><strong>Email : </strong>${email} </p>
      <p><strong>Phone : </strong>${phone} </p>
      <p><strong>Date of Birth : </strong>${dob} </p>
      <p><strong>Cover Letter : </strong>${coverletter} </p>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending failed:",error.response);
      res.status(500).render("error",{job:matchfound});
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).render("applied",{job:matchfound});
    }
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});