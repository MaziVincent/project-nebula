
const {
    getMessages,
    getMessage,
    newMessage,
    deleteMessage,
    getMessgeBySender,
    getMessageByReceiver
} = require('../services/messageService')

const handleGetMessages = async (req, res) => {
    const data = {
        page: req.query.page,
        limit: req.query.limit
    }
    const messages = await getMessages(data)
    if(messages.error) return res.status(400).json(messages.error)
    return res.status(200).json(messages)
}
const handleGetMessage = async (req, res) => {
    if(!req.params.id) return res.status(400).json({error: 'id is required'})
    
    const _id = req.params.id
    const message = await getMessage(_id)
    if(message.error) return res.status(400).json(message.error)
    return res.status(200).json(message)
}

const handleNewMessage = async (req, res) => {
    const {sender, receiver, message, name, email, phone} = req.body;
    if(!sender, !receiver, !message) return res.status(400).json({error: 'all fields are required'})
    
    const data = req.body
    const result = await newMessage(data)
    if(result.error) return res.status(400).json(result.error)

    return res.status(200).json(result)
}

const handleDeleteMessage = async (req, res) => {
    if(!req.params.id) return res.status(400).json({error: 'id is required'})

    const _id = req.params.id
    const result = await deleteMessage(_id)
    if(result.error) return res.status(400).json(result.error)

    return res.status(200).json(result)
}

const handleGetMessageBySender = async (req, res) => {
    const data = {
        page: req.query.page,
        limit: req.query.limit,
        userId: req.params.id
    }
    const messages = await getMessgeBySender(data)
    if(messages.error) return res.status(400).json(messages.error)

    return res.status(200).json(messages)
}

const handleGetMessageByReceiver = async (req, res) => {
    const data = {
        page: req.query.page,
        limit: req.query.limit,
        userId: req.params.id
    }
    const messages = await getMessageByReceiver(data)
    if(messages.error) return res.status(400).json(messages.error)

    return res.status(200).json(messages)
}
module.exports = {
    handleGetMessages,
    handleGetMessage,
    handleNewMessage,
    handleDeleteMessage,
    handleGetMessageBySender,
    handleGetMessageByReceiver
}