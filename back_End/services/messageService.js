const Message = require('../model/Message')

const getMessages = async (req, res) => {
    const messages = await Message.find({}).sort({ createdAt: -1 })
    res.status(200).json(messages)
}


const getMessage = async (req, res) => {
    const { id } = req.params
    const message = await Message.findById(id)
    res.status(200).json(message)
}

const createMessage = async (data) => {
    const sender = new mongoose.Types.ObjectId(data.sender);
    const receiver = new mongoose.Types.ObjectId(data.receiver);

    try{
        const newMessage = new Message({
            sender,
            receiver,
            message: data.message,
        })
        const user = await newMessage.save()
    }catch(error){
        console.log(error)
    }
}