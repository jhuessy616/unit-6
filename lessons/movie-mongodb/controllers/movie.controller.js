const router = require("express").Router();
const { response } = require("express");
const Movie = require("../models/movie.model");

router.post("/add", async (req, res) => {
    try {
        // preppering the movie object to be saved to the database 
        const movie = new Movie({
            movieTitle: req.body.movieTitle,
            movieDescription: req.body.movieDescription,
            movieYear: req.body.movieYear, 
            isCurrentlyInTheaters: req.body.isCurrentlyInTheaters,
            rating:req.body.rating,
        })
        // we need to save the data
        const newMovie = await movie.save();

        res.status(201).json({
            movie: newMovie,
            message: "Succesfully added a new movie"
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });   
    }
})

// get all movies 
router.get("/", async (req, res) => {
    try {
        const movie = await Movie.find();
        res.status(200).json({
            movie : movie, message:"Success"
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });   
    }
})


// delete 
router.delete("/:id", async (req, res) => {
    try {
        const deletedMovie = await Movie.deleteOne({ _id: req.params.id });
        res.json({
        deletedMovie: deletedMovie,
        message: deletedMovie.deletedCount > 0? "Movie was deleted" : "Movie was not removed"});

    }
     catch (error) {
        res.json({ message: error.message });   
    }
})

// Update
router.patch("/update/:id", async (req, res) => {
    try {
        const filter = { _id: req.params.id }

        const update = req.body;
        const returnOptions = { new: true };

        const movie = await Movie.findOneAndUpdate(filter, update, returnOptions);
        
        res.json({message:"movie updated", movie:movie})

    }
     catch (error) {
        res.json({ message: error.message });   
    }
})

// Get one 
router.get("/:id", async (req, res) => {
    try {
        const movie = await Movie.findById({ _id: req.params.id });
        res.status(200).json({
            movie: movie, message:"Success"
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });   
    }
})
  


    


module.exports = router