const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
const port = 5001;

// Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_dwd3tz35rKns5F', // Replace with your Razorpay Key ID
  key_secret: 'ZhL7oxloNmAEbowe9JU6bUFT', // Replace with your Razorpay Key Secret
});

app.use(cors());
app.use(express.json());

// Create Order Route
app.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body; // Amount should be in paise (100 paise = 1 INR)

    const options = {
      amount: amount * 100, // Convert amount to paise
      currency: 'INR',
      receipt: `receipt#${new Date().getTime()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.json({ id: order.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
