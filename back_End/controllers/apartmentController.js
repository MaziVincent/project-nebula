const {
    createApartment,
    getApartments,
    getApartment,
    updateApartment,
    deleteApartment,
    apartmentExists,
    apartmentStatus
} = require('../services/apartmentService')

const createApartmentHandler = async (req, res) => {
    console.log(req.body)
    const { title, description, price, location, owner, bedrooms, bathrooms, floorArea, propertyType } = req.body;
    if(!title, !description, !price, !location, !owner, !bedrooms, !bathrooms, !floorArea, !propertyType) {
        return res.status(400).json({message: "All fields are required"})
    }
    console.log(req.body)
    const duplicate = await apartmentExists(title)
    if(duplicate) {
        return res.status(409).json({message: "Apartment already exists"})
    }
    const data = {
        title,
        description,
        price,
        location,
        owner,
        bedrooms,
        bathrooms,
        floorArea,
        propertyType,
        file: req.file
    }
    // const data = req.body;
    const result = await createApartment(data);
    if(result.error) return res.status(500).json(result);
    return res.status(201).json({success: 'New Apartment created', result});
};

const getApartmentsHandler = async (req, res) => {
    const data = {
        page: req.query.page,
        limit: req.query.limit
    }
    const apartments = await getApartments(data);
    if(!apartments) {
        return res.status(404).json({message: "No apartment found"})
    }
    return res.status(200).json(apartments);
};

const getApartmentHandler = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({message: "Apartment ID required"})
    }
    const apartment = await getApartment(req.params.id);
    if(!apartment) {
        return res.status(404).json({message: "Apartment not found"})
    }
    return res.status(200).json(apartment);
};

const updateApartmentHandler = async (req, res) => {
    if(!req.body) {
        return res.status(400).json({message: "Data to update required"})
    }
    const result = await updateApartment(req.body._id, req.body);
    if(result.error) return res.status(500).json(result);
    return res.status(200).json({success: "Apartment updated successfully", result});
};

const deleteApartmentHandler = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({message: "Apartment ID required"})
    }
    const result = await deleteApartment(req.params.id);
    if(result.error) return res.status(500).json(result);
    return res.status(200).json({success: "Apartment deleted successfully", result});
};

const apartmentStatusHandler = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({message: 'Apartment ID required'})
    }
    const _id = req.params.id
    const status = req.body.status
    const result = await apartmentStatus(_id, status);
    if(result.error) {
        return res.status(400).json({message: result})
    }
    res.json({message: 'Apartment status updated successfully', data: result})
};

module.exports = {
    createApartmentHandler,
    getApartmentsHandler,
    getApartmentHandler,
    updateApartmentHandler,
    deleteApartmentHandler,
    apartmentStatusHandler
}