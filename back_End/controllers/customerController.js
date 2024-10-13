const {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    customerExists
} = require('../services/customerService');

const handleCustomers = async (req, res) => {
    const data = {
        page: req.query.page,
        limit: req.query.limit 
    }
   const customers = await getCustomers(data);
   if(!customers) {
    return res.status(400).json({ message: 'No customer found' });
   }
   res.json(customers);
}

const handleCreateCustomer = async (req, res) => {
    const { firstname, lastname, email, phone, wishlist} = req.body;
    if(!firstname, !lastname, !email, !phone) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const duplicate = await customerExists(email);
    console.log(duplicate);
    if(duplicate){
      return res.sendStatus(409); //conflict
    }
    const data = req.body;
    const result = await createCustomer(data);
  
    if(result.error) return res.status(500).json(result.error);
    console.log(result);
    return res.status(201).json({Success: "Customer created successfully"}); 
}

const handleUpdate = async (req, res) => {
    if(!req.body) {
        return res.status(400).json({ message: 'Data to update is required' });
    }
    
    const result = await updateCustomer(req.body._id, req.body);
    if(result.error) return res.status(500).json(result);

    res.status(200).json({Success: "Customer updated successfully", result});
    
}

const handleDelete = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({ message: 'ID is required' });
    }
    const result = await deleteCustomer(req.params.id);
    if(result.error) return res.status(500).json(result);

    res.status(200).json({Success: "Customer deleted successfully", result});
}

const handleCustomer = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({ message: 'ID is required' });
    }
    const customer = await getCustomer(req.params.id);
    if(!customer) {
        return res.status(400).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
}

module.exports = {
    handleCustomers,
    handleCreateCustomer,
    handleUpdate,
    handleDelete,
    handleCustomer
}