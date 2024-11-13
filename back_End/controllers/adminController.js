const {
  createAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  adminExists
} = require("../services/adminService");

const {
  userExists
} = require('../services/userService');

const handleAdminCreate = async (req, res) => {
  const {firstname, lastname, username, email, phone} = req.body;
  if(!firstname, !lastname, !email, !phone){
    return res.status(400).json({message: "All fields are required"})
  }
  const duplicate = await userExists(email);
  console.log(duplicate);
  if(duplicate){
    return res.sendStatus(409); //conflict
  }
  const data = req.body;
  const result = await createAdmin(data);

  if(result.error) return res.status(500).json(result.error);
  console.log(result);
  return res.status(201).json({Success: "Admin created successfully"});  
};

const handleAdmins = async (req, res) => {
  const data ={ page: req.query.page, limit: req.query.limit };
  const result = await getAdmins(data);
  if(result.error) return res.status(500).json(result);
  console.log(result);
  return res.status(200).json(result);
};

module.exports = {
  handleAdminCreate,
  handleAdmins,
};