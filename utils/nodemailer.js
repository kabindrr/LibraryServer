import nodemailer from "nodemailer";

// create transport
// using transport, sendMai => transport.sendMail({})

// global email sender
const globalEmailHandler = async (mailObj) => {
  // 1. create transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // 2. using transport, sendMai => transport.sendMail({})
  return await transporter.sendMail(mailObj);
};

// email verification mail
export const emailVerification = async (to, fName, uniqueKey) => {
  // create a unique link to verify account
  // localhost:5173/verify-email?c=ssecretKey&e=userEmail

  return await globalEmailHandler({
    from: `"Library Management 👻" <${process.env.SMTP_USER}>`, // sender address
    to: `${to}`, // list of receivers
    subject: "Verify Email", // Subject line
    text: `Hello ${fName}, Please follow the link to verify email`, // plain text body
    html: `<div>
    <b>Hello ${fName}, Ready to verify your email? Click button </b>
    <a href = "localhost:5173/verify-email?ukey=${uniqueKey}&e=${to}" type="_blank">
    <button>Verify Now</button>
    </a>
    </div>`, // html body
  });
};

// otp email
// email verification mail
export const optEmail = async (to, fName, otp) => {
  return await globalEmailHandler({
    from: `"Library Management 👻" <${process.env.SMTP_USER}>`, // sender address
    to: `${to}`, // list of receivers
    subject: "OPT Request", // Subject line
    text: `Hello ${fName}, Your OPT is: ${otp}}`, // plain text body
    html: `<div>
      <b>Hello ${fName}, Ready to verify your email? Click button </b>
        <p>Your OTP is : ${otp}</p>
      </div>`, // html body
  });
};
