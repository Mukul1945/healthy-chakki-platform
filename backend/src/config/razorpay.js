import Razorpay from "razorpay";

let razorpayInstance = null;

export const getRazorpayInstance = () => {
  if (
    !process.env.RAZORPAY_KEY_ID ||
    !process.env.RAZORPAY_KEY_SECRET
  ) {
    console.error("Payment Error: Razorpay credentials missing in process.env");
    console.log("RAZORPAY_KEY_ID exists:", !!process.env.RAZORPAY_KEY_ID);
    console.log("RAZORPAY_KEY_SECRET exists:", !!process.env.RAZORPAY_KEY_SECRET);
    return null;
  }

  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  return razorpayInstance;
};
