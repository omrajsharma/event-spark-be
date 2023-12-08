const EventModel = require("../models/EventModel")
const shortid = require("shortid");
const Razorpay = require("razorpay");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const getOrder = async (req, res) => {
  const { movie_id } = req.query;

  if (movie_id == undefined || movie_id.length == 0) {
    res.status(400).json({ error: "Movie id is empty" });
    return;
  }

  const amount = 1;
  const currency = "INR";
  const payment_capture = 1;

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
};

const postPaymentId = async (req, res) => {
  try {
    return request(
      {
        method: "POST",
        url: `https://${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: 1 * 100, // amount == Rs 1 // Same As Order amount
          currency: "INR",
        },
      },
      async function (err, response, body) {
        if (err) {
          return res.status(500).json({
            error: "Something Went Wrong",
          });
        }
        console.log("Status:", response.statusCode);
        console.log("Headers:", JSON.stringify(response.headers));
        console.log("Response:", body);
        const eventDoc = await EventModel.findOne({_id: eventId});
        const ticketId = shortId.generate();
        eventDoc.tickets = [...eventDoc.tickets, ticketId]
        return res.status(200).json({...body, ticketId: shortId.generate()});
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

module.exports = { getOrder, postPaymentId };
