const authMiddleware = require("../middleware/authMiddleware");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const show = require("../models/showModel");
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/make-payment",authMiddleware,async(req,res)=>{
    try {
            const {token,amount } = req.body;
            const paymentIntent = await stripe.paymentIntents.create({amount,currency:'inr'});
                res.send({
                    success: true,
                    message:"Payment Successful",
                    secret:paymentIntent.client_secret
                })
    } catch (error) {
        res.send({
            success: false,
            message:"Payment Unsuccessful",
            error:error.message
        })
    }
})

router.post("/book-show",authMiddleware,async(req,res)=>{
        try {
            const newBooking = new Booking(req.body);
            await newBooking.save();
            const show = await Show.findById(req.body.show);
            await Show.findByIdAndUpdate(req.body.show,{bookedSeats:[...show.bookedSeats,...req.body.seats]});
            res.send({success:true,message:"Show Booked successfully",data:newBooking})
        } catch (error) {
            res.send({
                success: false,
                message: error.message,
              });
        
        }
})
router.get("/get-bookings", authMiddleware, async (req, res) => {
    try {

      const bookings = await Booking.find({ user: req.body.userId })
        .populate("show")
        .populate({
          path: "show",
          populate: {
            path: "movie",
            model: "movies",
          },
        })
        .populate("user")
        .populate({
          path: "show",
          populate: {
            path: "theater",
            model: "theaters",
          },
        });
  
      res.send({
        success: true,
        message: "Bookings fetched successfully",
        data: bookings,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });



  module.exports = router;
