const router = require("express").Router();
const Animal = require("../models/animal.model");
const validateSession = require("../middleware/validate-session");


// add new animal
router.post("/create",validateSession,  async (req, res) => {
    try {
        // preppering the animal object to be saved to the database 
        const animal = new Animal({
            name: req.body.name,
            legNumber: req.body.legNumber,
            predator: req.body.predator,
            userId: req.user._id,
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

// get all animals by user
router.get('/myanimals', validateSession, async(req, res) => {

    try {
      const animal = await Animal.find({userId: req.user._id})
      res.json({ animal: animal, message: 'success' })
    } catch(error) {
      res.json({ message: error.message })
    }
})


router.get("/", validateSession, async (req, res) => {
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
router.get("/:id", validateSession, async (req, res) => {
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
router.patch("/update/:id", validateSession, async (req, res) => {
    try {
        const filter = { _id: req.params.id }

        const update = req.body;
        const returnOptions = { new: true };

        const animal = await Animal.findOneAndUpdate(filter, update, returnOptions);
        
        res.json({message: animal ?"animal updated" : "there is no animal by that id", animal:animal})

    }
     catch (error) {
        res.json({ message: error.message });   
    }
})

// delete 
router.delete("/delete/:id", validateSession, async (req, res) => {
    try {
        const animalToDelete = await Animal.findById({ _id: req.params.id });
        if (!animalToDelete) throw new Error("Animal does not exist")
        const isValidOwner = req.user._id == animalToDelete.userId
        if (!isValidOwner) {
            throw new Error("The id supplied for this animal is not owned by this user. Animal wasn't deleted")
        }
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