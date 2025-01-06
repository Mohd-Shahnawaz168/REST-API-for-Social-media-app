import nodemailer from "nodemailer";
import ApplicationError from "../errorHandler/errorhandler.js";
async function sendOTP(OTP, email) {
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cnsender2@gmail.com",
      pass: "qrqulwdosrfoimld",
    },
  });

  let mailData = {
    from: "cnsender2@gmail.com",
    cc: "shahnawazmohd168@gmail.com",
    to: email,
    subject: "Mail sent by nodeJs",
    text: `OTP for Change password is ${OTP}`,
  };

  try {
    await transport.sendMail(mailData);
    return true;
  } catch (error) {
    throw new ApplicationError("OTP not send due to some Erroe", 400);
  }
}
export default sendOTP;
