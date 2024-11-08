const {
    createOwner,
    getOwners,
    getOwner,
    deleteOwner,
    updateOwner,
    verifyowner,
    unVerifyOwner,
    ownerExists,
    uploadDocument
} = require('../services/ownerService');


const handleOwners = async (req, res) => {
    const data = {
        page: req.query.page,
        limit: req.query.limit 
    }
    const owners = await getOwners(data);
    if (!owners) return res.status(204).json({ message: 'No owners found' });
    res.status(200).json(owners); 
}

const handleCreate = async (req, res) => {
   const {firstname, lastname, email, password, identityType, identityNumber, whatsappLink} = req.body;
   if (!firstname, !lastname, !email, !password, !identityType, !identityNumber) {
       return res.status(400).json({ message: 'Please enter all fields' });
   }
    const duplicate = await ownerExists(email);
    console.log(duplicate);
    if(duplicate){
      return res.sendStatus(409); //conflict
    }
   const data = req.body;
   const result = await createOwner(data);
   if (result.error) {
       return res.status(400).json({ message: result.error });
   }
   return res.status(201).json({ message: 'Owner created' });
};

const handleUpdate = async (req, res) => {
    if(!req.body) {
        return res.status(400).json({ message: 'Data to update required' });
    }
    const result = await updateOwner(req.body._id, req.body);
    if (result.error) {
        return res.status(400).json(result);
    }
    return res.status(200).json({ message: 'Owner updated', result});
};

const handleDelete = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({ message: 'ID is required' });
    }
    const result = await deleteOwner(req.params.id);
    if(result.error) return res.status(500).json(result);

    res.status(200).json({Success: "Owner deleted successfully", result});
}

const handleOwner = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({ message: 'ID is required' });
    }
    const owner = await getOwner(req.params.id);
    if(!owner) {
        return res.status(400).json({ message: 'Owner not found' });
    }
    res.status(200).json(owner);
}

const handleVerifyOwner = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({ message: 'ID is required' });
    }
    const result = await verifyowner(req.params.id);
    if(result.error) return res.status(500).json(result);

    res.status(200).json({Success: "Owner verified successfully", result});
}

const handleUnVerifyOwner = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({ message: 'ID is required' });
    }
    const result = await unVerifyOwner(req.params.id);
    if(result.error) return res.status(500).json(result);

    res.status(200).json({Success: "Owner unverified successfully", result});
}

const handleUploadDocument = async (req, res) => {
    if(!req.files){
        return res.status(400).json({ message: 'File is required' });
    }
    const file = req.files;
    const _id = req.params.id;
    const result = await uploadDocument(file, _id);
    if(result.error) return res.status(500).json(result);
    res.status(200).json({Success: "Document uploaded successfully", result});
}
module.exports = {
    handleOwners,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleOwner,
    handleVerifyOwner,
    handleUnVerifyOwner,
    handleUploadDocument
}