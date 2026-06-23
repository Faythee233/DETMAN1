const axios = require('axios');
const crypto = require('crypto');

exports.initializePayment = async (email, amount, txnId) => {
  const response = await axios.post('https://api.paystack.co/transaction/initialize', {
    email,
    amount: amount * 100,
    reference: `txn_${txnId}`
  }, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
  });
  return response.data.data.authorization_url;
};

exports.verifySignature = (req) => {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const hash = crypto.createHmac('sha512', secret).update(req.rawBody).digest('hex');
  return hash === req.headers['x-paystack-signature'];
};
