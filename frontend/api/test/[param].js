export default function handler(req, res) {
    const { param } = req.query;
    res.status(200).json({ message: `Dynamic param: ${param}` });
}