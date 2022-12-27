const router = require("express").Router();
const Message = require("../models/message.model");



// create a message within a room endpoint
router.post("/create/:room", async (req, res) => {
    try {
        // preppering the message object to be saved to the database 
        const message = new Message({
            when: new Date(),
            user: req.body.user,
            room: req.params.room,
            body:req.body.body,
        })
        // we need to save the data
        const newMessage = await message.save();

        res.status(201).json({
            messageForChat: newMessage,
            message: "Succesfully added a new message"
        });
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

        const message = await Message.findOneAndUpdate(filter, update, returnOptions);
        
        res.status(202).json({message:"message updated", updatedMessage:message})

    }
     catch (error) {
        res.status(500).json({ message: error.message });   
    }
})

// delete 
router.delete("/delete/:id", async (req, res) => {
    try {
        const messageToDelete = await Message.findById({ _id: req.params.id });
        const deletedMessage = await Message.deleteOne({ _id: req.params.id });
        res.json({
        messageThatWasDeleted: messageToDelete,
        deletedMessage: deletedMessage,
        message: deletedMessage.deletedCount > 0? "Message was deleted" : "Message was not removed"});

    }
     catch (error) {
        res.json({ message: error.message });   
    }
})

// ! SHOW ALL Messages 
router.get("/:room", async (req, res) => {
    try {
        const roomMessages = await Message.find({room:req.params.room});
        res.status(202).json({
            allMessagesFromRoom : roomMessages, message:"Success, all messages from specified room displayed."
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });   
    }
});

module.exports = router;