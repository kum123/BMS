const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const Show = require('../models/showModel.js');
const Movie = require('../models/movieModel.js');
const Theater = require('../models/theaterModel.js');

router.post('/add-theater', async (req, res) => {
    try {
        const newTheater = new Theater(req.body);
        await newTheater.save();

        res.status(200).send({
            success: true,
            message: 'Theater saved successfully'
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "There was error while adding theater"
        });
    }
    
});
router.post("/delete-theater",authMiddleware,async (req, res) => {
    try {
        await Theater.findByIdAndDelete(req.body.theaterId);
        res.send({ success: true, message: "Theaters deleted"})
    } catch (error) {
        res.send({ success: false, message: "there was issue while deleting"})
    }
})
router.get("/get-all-theaters", authMiddleware, async (req, res) => {
    try {
        const theaters = await Theater.find().populate("owner", "-password");

        res.status(200).send({ success: true, message: "Theaters fetched", theaters });
    } catch (error) {
        res.status(500).send({ success: false, message: "there was issue while fetching theater" });
    }
})
router.post("/update-theater",authMiddleware,async(req,res)=>{
    try {
             await Theater.findByIdAndUpdate(req.body.theatreId,req.body);
 
             res.send({success: true, message:"Theater updated with latest details"})
    } catch (error) {
     res.send({success: false, message:"Something went wrong , Unable to update theatre data"})
    }
 })
router.get("/get-all-theaters-by-userid", authMiddleware, async (req, res) => {
    try {
        const theaters = await Theater.find({ owner: req.body.userId });
        res.status(200).send({
            success: true,
            message: "Theaters fetched",
            theaters
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "There was some issue in fetching theaters for users"
        });
    }
})

router.post("/get-theaters-for-movie",authMiddleware,async (req, res) => {
    try {
        const {movieId} = req.body

        const shows = await Show.find({movie:movieId}).populate("theater");
        const uniqueTheatres = [];
        shows.forEach((show)=> {
            const theater = uniqueTheatres.find((theaterCurrent)=> theaterCurrent._id === show.theater._id)
            if(!theater){
                const showsForTheaters = shows.filter((showObj) => show.theater._id === showObj.theater._id).map((show)=>({
                    ...show._doc,
                    allSeatesBooked: show.bookedSeats.length === show.totalSeats
                }))
                //console.log("showsForTheaters",showsForTheaters)
                uniqueTheatres.push({
                    shows:showsForTheaters,
                    ...show.theater._doc
                })
            }
           
        });
        res.send({
            success: true,
            message: "Theaters for movie fetched",
            theaters: uniqueTheatres
        })
    } catch (error) {
            res.send({
                success: false,
                message: "Something went wrong"
            }) 
    }
})


module.exports = router