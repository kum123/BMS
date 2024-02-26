const router = require("express").Router()
const authMiddleware = require("../middleware/authMiddleware");
const Movie = require("../models/movieModel");


router.post("/add-movie",authMiddleware,async(req,res)=>{
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
            res.status(201).send({success: true,message: 'Movie added successfully'})
    } catch (error) {
        res.status(500).send({success: true,message: error.message});
    }
})

router.get("/movie-list",authMiddleware,async(req,res)=>{
    try {
        const movies = await Movie.find();
            res.status(200).send({ success: true,
                message: "Movies fetched",
                movies
    })
    } catch (error) {
        res.status(500).send({ success: false,
            message: "There was some issue in fetching movies.",
});
    }
})

router.get("/get-by-id/:movieId", authMiddleware, async (req, res) => {
    try {

        const movie = await Movie.findById(req.params.movieId)

        res.status(200).send({
            success: true,
            message: "Movie details fetched",
            movie
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "There was some issue in fetching movie.",
        })
    }
})


router.put("/update-movie",authMiddleware,async(req,res)=>{
    try {
        await Movie.findByIdAndUpdate(req.body.movieId,req.body); 
            res.send({ success: true,
                message: "Movies fetched"
    })
    } catch (error) {
        res.status(500).send({ success: false,
            message: "There was some issue in fetching movies.",
});
    }
})
router.post("/delete-movie/:movieId",authMiddleware,async(req,res)=>{
  try {
            await Movie.findByIdAndDelete(req.params.movieId);
            res.status(200).send({ success: true,message: "Movie deleted successfully"})

  } catch (error) {
    res.send({
        success: false,
        message: "Some issue! Unable to delete the movie"
    })

  }
 

})

module.exports = router