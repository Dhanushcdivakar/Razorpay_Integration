import React, { useState } from 'react';

const Payment = () => {
  const [amount, setAmount] = useState(1000); // Default amount in INR (1000 INR = 100000 paise)

  const handlePayment = async () => {
    // Make a POST request to your backend to create an order
    const response = await fetch('http://localhost:5001/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();

    // Initialize Razorpay checkout
    const options = {
      key: 'rzp_test_dwd3tz35rKns5F', // Replace with your Razorpay Key ID
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      name: 'Your Company',
      description: 'Test Transaction',
      order_id: data.id, // The order ID returned from backend
      handler: function (response) {
        // Handle payment success (response contains payment details)
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'Dhanush',
        email: 'dhanushcdivaker8984@gmail.com',
        contact: '6363556992',
      },
      notes: {
        address: 'address for payment receipt',
      },
      theme: {
        color: '#F37254',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open(); // Open the Razorpay checkout window
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <div>
        <label>
          Enter Amount (INR):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
          />
        </label>
      </div>
      <p>Amount: ₹{amount}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
