const router = require("express").Router()
const authMiddleware = require('../middleware/authMiddleware');
const Show = require("../models/showModel");


router.post("/add-show", authMiddleware, async (req, res) => {
    try {
        const newShow = new Show(req.body);
        await newShow.save();
        res.status(200).send({ success: true, message: "show added successfully" });
    } catch (error) {
        res.status(500).send({ success: false, message: "there was an error while adding show" })
    }
})

router.post("/update-show", authMiddleware, async (req, res) => {
    try {
        await Show.findByIdAndUpdate(req.body.showId, req.body);
        res.send({ success: true, message: "show updated successfully" });
    } catch (error) {
        res.status(500).send({ success: false, message: "Unable to update show" })
    }
})
router.post("/delete-show", authMiddleware, async (req, res) => {
    try {
        await Show.findByIdAndDelete(req.body.showId);
        res.send({ success: true, message: "show deleted successfully" });
    } catch (error) {
        res.status(500).send({ success: false, message: "Unable to delete show" })
    }
})
router.get("/get-show-by-id/:showId", authMiddleware, async (req, res) => {
    try {
        const show = await Show.findById({_id:req.params.showId}).populate("movie").populate("theater");

        res.status(200).send({ success: true,show:show });
    } catch (error) {
        res.status(500).send({ success: false, message: "Unable to fetch shows" })
    }
})

router.get("/get-shows-by-theater-id/:theaterId",authMiddleware,async(req,res)=>{

    try {
        const shows = await Show.find({ theater: req.params.theaterId }).populate("movie").populate("theater");
        console.log("shows",shows);
        res.status(200).send({success:true,shows})
    } catch (error) {
        res.status(500).send({ success: false, message: "Unable to fetch shows" })
    }
})

module.exports = router