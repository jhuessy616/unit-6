const router = require("express").Router();
const Animal = require("../models/animal.model");


// add new animal
router.post("/create", async (req, res) => {
    try {
        // preppering the animal object to be saved to the database 
        const animal = new Animal({
            name: req.body.name,
            legNumber: req.body.legNumber,
            predator: req.body.predator,
        })
        // we need to save the data
        const newAnimal = await animal.save();

        res.status(201).json({
            animal: newAnimal,
            message: "Succesfully added a new animal"
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });   
    }
})

router.get("/", async (req, res) => {
    try {
        const animal = await Animal.find();
        res.status(202).json({
            animal : animal, message:"Success, all animals displayed"
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });   
    }
})

// get one animal
router.get("/:id", async (req, res) => {
    try {
        const animal = await Animal.findById({ _id: req.params.id });
        res.status(202).json({
            animal: animal, message:"Success, animal found"
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });   
    }
})

// Update
router.patch("/update/:id", async (req, res) => {
    try {
        const filter = { _id: req.params.id }

        const update = req.body;
        const returnOptions = { new: true };

        const animal = await Animal.findOneAndUpdate(filter, update, returnOptions);
        
        res.json({message:"animal updated", animal:animal})

    }
     catch (error) {
        res.json({ message: error.message });   
    }
})

// delete 
router.delete("/delete/:id", async (req, res) => {
    try {
        const animalToDelete = await Animal.findById({ _id: req.params.id });
        const deletedAnimal = await Animal.deleteOne({ _id: req.params.id });
        res.json({
        animalThatWasDeleted: animalToDelete,
        deletedAnimal: deletedAnimal,
        message: deletedAnimal.deletedCount > 0? "Animal was deleted" : "Animal was not removed"});

    }
     catch (error) {
        res.json({ message: error.message });   
    }
})

module.exports = router