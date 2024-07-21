import Medication from '../models/Medication.js';

// @desc    Get all medications for a user
// @route   GET /api/medications
// @access  Private
export const getMedications = async (req, res) => {
  try {
    const medications = await Medication.find({ user: req.user.id });
    res.json(medications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get single medication
// @route   GET /api/medications/:id
// @access  Private
export const getMedication = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (!medication) {
      return res.status(404).json({ msg: 'Medication not found' });
    }

    // Make sure user owns medication
    if (medication.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(medication);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a medication
// @route   POST /api/medications
// @access  Private
export const createMedication = async (req, res) => {
  const { name, dosage, frequency, time, startDate, endDate, notes } = req.body;

  try {
    const newMedication = new Medication({
      user: req.user.id,
      name,
      dosage,
      frequency,
      time,
      startDate,
      endDate,
      notes
    });

    const medication = await newMedication.save();

    res.json(medication);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update medication
// @route   PUT /api/medications/:id
// @access  Private
export const updateMedication = async (req, res) => {
  const { name, dosage, frequency, time, startDate, endDate, notes } = req.body;

  // Build medication object
  const medicationFields = {};
  if (name) medicationFields.name = name;
  if (dosage) medicationFields.dosage = dosage;
  if (frequency) medicationFields.frequency = frequency;
  if (time) medicationFields.time = time;
  if (startDate) medicationFields.startDate = startDate;
  if (endDate) medicationFields.endDate = endDate;
  if (notes) medicationFields.notes = notes;

  try {
    let medication = await Medication.findById(req.params.id);

    if (!medication) return res.status(404).json({ msg: 'Medication not found' });

    // Make sure user owns medication
    if (medication.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    medication = await Medication.findByIdAndUpdate(
      req.params.id,
      { $set: medicationFields },
      { new: true }
    );

    res.json(medication);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete medication
// @route   DELETE /api/medications/:id
// @access  Private
export const deleteMedication = async (req, res) => {
  try {
    let medication = await Medication.findById(req.params.id);

    if (!medication) return res.status(404).json({ msg: 'Medication not found' });

    // Make sure user owns medication
    if (medication.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Medication.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Medication removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Log medication intake
// @route   POST /api/medications/:id/log
// @access  Private
export const logMedicationIntake = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (!medication) {
      return res.status(404).json({ msg: 'Medication not found' });
    }

    // Make sure user owns medication
    if (medication.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    medication.intakeLog.push({ taken: true });
    await medication.save();

    res.json(medication);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};