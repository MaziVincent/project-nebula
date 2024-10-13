const Listing = require('../model/Listing');

const getAllListing = async (req, res) => {
    const listings = await Listing.find({});
    res.status(200).json({ listing });
    if(!listings) {
    return res.status(400).json({ message: 'No listing found' });
    }
}

const createNewListing = async (req, res) => {
    const {property, status} = require.body;
    if(!property || !status) {
        return res.status(400).json({ message: 'Property and status are required' });
    }
    const duplicate = await Listing.findOne({ property }).exec();
    if(duplicate) {
        return res.status(400).json({ message: 'Listing already exists' });
    }
    const result = await Listing.create({
        property: property,
        status: status
    });
    // res.status(201).json({ listing: result });
    if(!result) {
        return res.status(400).json({ message: 'Error creating listing' });
    }
    res.status(201).json({ listing: result });
}

const updateListing = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    const listing = await Listing.findOne({ _id: req.params.id }).exec();
    if(!listing) {
        return res.status(400).json({ message: 'Listing not found' });
    }
    if (req.body?.property) listing.property = req.body.property;
    if (req.body?.status) listing.status = req.body.status;
    const updatedListing = await listing.save();
    res.json(updatedListing);
}

const deleteListing = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    const listing = await Listing.findOne({ _id: req.params.id }).exec();
    if(!listing) {
        return res.status(400).json({ message: 'Listing not found' });
    }
    const result = await listing.deleteOne();
    res.json(result);
}

const getListing = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    const listing = await Listing.findOne({ _id: req.params.id }).exec();
    if(!listing) {
        return res.status(400).json({ message: 'Listing not found' });
    }
    res.json(listing);
}

module.exports = {
    getAllListing,
    createNewListing,
    updateListing,
    deleteListing,
    getListing
}