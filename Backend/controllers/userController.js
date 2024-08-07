import User from '../models/user.models.js';

// export const getUser = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) return res.status(404).json({ message: 'User not found' });
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving user' });
//     }
// };


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('Server Error:', err); 
    res.status(500).send('Server Error');
  }
};


// export default { getProfile };
