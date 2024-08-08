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

export const updateProfile = async (req, res) => {
  const { name, phoneNumber, address } = req.body; // Destructure name, phoneNumber, and address from req.body

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user fields
    user.name = name;
    user.phoneNumber = phoneNumber;

    // Update address fields if provided
    if (address) {
      user.address = {
        street: address.street || user.address.street,
        city: address.city || user.address.city,
        state: address.state || user.address.state,
        country: address.country || user.address.country,
        zipCode: address.zipCode || user.address.zipCode,
      };
    }

    await user.save();

    res.json(user); 
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).send('Server Error');
  }
};

// export default { getProfile };
