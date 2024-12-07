const mongoose = require('mongoose')
const Message = require('../model/Message')

const getMessages = async (data) => {
    let page = data.page || 1
    let limit = data.limit || 10
    let skip = (page - 1) * limit

    try{
        const messages = await Message.find().populate('sender').populate('receiver').skip(skip).limit(limit).exec()
        const totalCount = await Message.countDocuments()
        if(!messages){
            return res.status(404).json({message: 'No messages found'})
        }
        return {messages, page, totalPages: Math.ceil(totalCount / limit)}
    } catch(err){
        return {error: err.message}
    }
}


const getMessage = async (id) => {

    try{
        const message = await Message.findById(id).populate('sender').populate('receiver').exec()
        if(!message){
            return res.status(404).json({message: 'No message found'})
        }
        return message
    } catch(err){
        return {error: err.message}
    }
    
}

const newMessage = async (data) => {
    const sender = new mongoose.Types.ObjectId(data.sender);
    const receiver = new mongoose.Types.ObjectId(data.receiver);

    try{
        const newMessage = await Message.create({
            sender,
            receiver,
            message: data.message,
            name: data.name,
            email: data.email,
            phone: data.phone

        })
        return newMessage
    }catch(err){
        return {error: err.message}
    }
}

const deleteMessage = async (id) => {
    try{
        const message = await Message.findone({_id: id})
        if(!message){
            return res.status(404).json({message: 'No message found'})
        }
        const result = await Message.deleteOne()
        return result
    } catch(err){
        return {error: err.message}
    }
}

const getMessgeBySender = async (data) => {
    let page = data.page || 1
    let limit = data.limit || 10
    let skip = (page - 1) * limit
    const userId = data.userId

    try{
        const messages = await Message.find({sender: userId}).sort({createdAt: -1}).populate('sender').populate('receiver').skip(skip).limit(limit).exec()
        const totalCount = await Message.countDocuments()
        if(!messages){
            return res.status(404).json({message: 'No messages found'})
        }
        return {messages, page, totalPages: Math.ceil(totalCount / limit)}
    } catch(err){
        return {error: err.message}
    }
}

const getMessageByReceiver = async (data) => {
    let page = data.page || 1
    let limit = data.limit || 10
    let skip = (page - 1) * limit
    const userId = data.userId

    try{
        const messages = await Message.find({receiver: userId}).sort({createdAt: -1}).populate('sender').populate('receiver').skip(skip).limit(limit).exec()
        const totalCount = await Message.countDocuments()
        if(!messages){
            return res.status(404).json({message: 'No messages found'})
        }
        return {messages, page, totalPages: Math.ceil(totalCount / limit)}
    } catch(err){
        return {error: err.message}
    }
}
module.exports = {
    getMessages,
    getMessage,
    newMessage,
    deleteMessage,
    getMessgeBySender,
    getMessageByReceiver
}