const express = require("express");
const path = require("path");
const app = express();
const job = require("./jobs.js");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const mustachExpress = require("mustache-express");
const hcaptcha = require("express-hcaptcha");
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/jobs/images", express.static(path.join(__dirname, "/images")));

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
  const r={
    job:matchfound,
    site_key:process.env.HCAPTCHA_SITE_KEY,
  }
  console.log("job found", matchfound);
  res.render("jobs", { resp:r });
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

const secretKey = process.env.HCAPTCHA_SECRET

app.use("/images", express.static(path.join(__dirname, "/images")));

app.post("/jobs/:id/apply", async (req, res) => {
  const {
    name,
    email,
    phone,
    dob,
    coverletter,
    "h-captcha-response": hCaptchaToken,
  } = req.body;
  const id = req.params.id;

  try {
    const hCaptchaVerificationUrl = `https://hcaptcha.com/siteverify`;
    const hCaptchaResponse = await axios.post(hCaptchaVerificationUrl, null, {
      params: {
        secret: secretKey,
        response: hCaptchaToken
      }
    });

    if (!hCaptchaResponse.data.success) {
      console.error('hCaptcha verification failed:', hCaptchaResponse.data['error-codes']);
      return res.status(400).send('hCaptcha verification failed.');
    }
  } catch (err) {
    console.error('Error during hCaptcha verification:', err);
    return res.status(500).send('Internal server error during hCaptcha verification.');
  }

  const matchfound = job.find((j) => j.id.toString() === id);
  const sanitizedName = sanitize(name);

  const mailOptions = {
    from: `${process.env.FROM_EMAIL}`,
    to: `${process.env.TO_EMAIL}`,
    subject: `New application request for ${matchfound.title}`,
    html: `<h1>Jovian Form data</h1><p><strong>Name : </strong>${sanitizedName} </p><p><strong>Email : </strong>${email} </p><p><strong>Phone : </strong>${phone} </p><p><strong>Date of Birth : </strong>${dob} </p><p><strong>Cover Letter : </strong>${coverletter} </p>`,
  };

  const response = {
    formRes: {
      sanitizedName,
      email,
      phone,
      dob,
      coverletter,
    },
    job: matchfound,
    secret:process.env.HCAPTCHA_SECRET
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending failed:", error.responce);
      res.status(500).render("error", { resp: response });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ msg: "verified!", hcaptcha: req.hcaptcha });
      res.status(200).render("applied", { resp: response });
    }
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
