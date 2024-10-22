

const ping = (req, res) => {
    res.status(200).json({ message: 'ping successfull' })
}

module.exports = {
    ping
}