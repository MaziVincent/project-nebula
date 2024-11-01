const {
  getAllUsers,
  getUser,
  deleteUser,
  activateUser,
  updateUser,
  uploadProfilePicture
} = require('../services/userService')

const handleUsers = async (req, res) => {
  const data = {
    page: req.query.page,
    limit: req.query.limit 
  }
  const users = await getAllUsers(data);
  if(!users) {
    return res.status(400).json({ message: 'No users found' });
  }
  return res.status(200).json(users);
};

const handleUser = async (req, res) => {
  if(!req.params.id) {
    return res.status(400).json({ message: 'User ID required' });
  }
  const user = await getUser(req.params.id);
  if(!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  return res.status(200).json(user);
};

const handleUpdate = async() => {
  if(!req.body) {
    return res.status(400).json({ message: 'Data to update required' });
  }
  const result = await updateUser(req.body._id, req.body);
  if(result.error) return res.status(500).json(result);
  res.status(200).json({Success: "User updated successfully", result});
};

const handleDelete = async (req, res) => {
  if(!req.params.id) {
    return res.status(400).json({ message: 'User ID required' });
  }
  const result = await deleteUser(req.params.id);
  if(result.error) return res.status(500).json(result);
  res.status(200).json({Success: "User deleted successfully", result});
};

const handleActivate = async (req, res) => {
  console.log(req.body)
  if(!req.params.id) {
    return res.status(400).json({ message: 'User ID required' });
  }
  if (!req.body.status) {
    return res.status(400).json({ message: 'Status required' });
  }
  const status = req.body.status
  const _id = req.params.id 
  const result = await activateUser(status, _id);
  if(result.error) return res.status(500).json(result);
  res.status(200).json({Success: "User Status Updated successfully", result});
};

// const handleDeActivate = async (req, res) => {
//   if(!req.params.id) {
//     return res.status(400).json({ message: 'User ID required' });
//   }
//   const _id = req.params.id
//   const status = req.body.status
//   const result = await activateUser(_id, status);
//   if(result.error) return res.status(500).json(result);
//   res.status(200).json({Success: "User deactivated successfully", result});
// };
const handleProfilePicture = async (req, res) => {
  if(!req.files) {
    return res.status(400).json({ message: 'Profile picture required' });
  }
  const file = req.files;
  const _id = req.params.id
  const result = await uploadProfilePicture(file, _id);
  if(result.error) return res.status(500).json(result);
  res.status(200).json({Success: "Profile picture uploaded successfully", result});
};

module.exports = {
  handleUsers,
  handleUser,
  handleUpdate,
  handleDelete,
  handleActivate,
  handleProfilePicture
 }