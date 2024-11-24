export default function handler(req, res) {
    const { id } = req.query; // Extract 'id' from the URL
    if (!id) {
        res.status(400).json({ error: 'ID is required' });
        return;
    }
    res.status(200).json({ message: `Property ID: ${id}` });
}