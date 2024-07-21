import EmergencyContact from '../models/EmergencyContact.js';

// @desc    Get all emergency contacts for a user
// @route   GET /api/emergencycontacts
// @access  Private
export const getEmergencyContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({ user: req.user.id });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get single emergency contact
// @route   GET /api/emergencycontacts/:id
// @access  Private
export const getEmergencyContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Emergency contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create an emergency contact
// @route   POST /api/emergencycontacts
// @access  Private
export const createEmergencyContact = async (req, res) => {
  const { name, relationship, phoneNumber, email, address } = req.body;

  try {
    const newContact = new EmergencyContact({
      user: req.user.id,
      name,
      relationship,
      phoneNumber,
      email,
      address
    });

    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update emergency contact
// @route   PUT /api/emergencycontacts/:id
// @access  Private
export const updateEmergencyContact = async (req, res) => {
  const { name, relationship, phoneNumber, email, address } = req.body;

  try {
    let contact = await EmergencyContact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Emergency contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    contact = await EmergencyContact.findByIdAndUpdate(
      req.params.id,
      { name, relationship, phoneNumber, email, address },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete emergency contact
// @route   DELETE /api/emergencycontacts/:id
// @access  Private
export const deleteEmergencyContact = async (req, res) => {
  try {
    let contact = await EmergencyContact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Emergency contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await EmergencyContact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Emergency contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};