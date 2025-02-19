import axios from "axios";
import { render } from "@react-email/render"; // Converts React Email to HTML
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendEmail(email: string, username: string, verifyCode: string) {
  const apiKey = process.env.BREVO_API_KEY;

  const htmlContent = await render(
    VerificationEmail({ username, otp: verifyCode })
  );


  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: "harshillaggarwal21@gmail.com", name: "AnonyMsg" },
        to: [{ email : email }],
        subject: "Your Verification Code",
        textContent: `Your verification code is: ${verifyCode}`,
        htmlContent,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      }
    );

    return { success: true, message: "Email sent successfully", data: response.data };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, message: "Error sending email" }  
  }
}