const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const { protect, authorize } = require('../middleware/auth');

// @desc    Upload an image
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, authorize('admin'), upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'Please upload a file' });
  }

  // Construct URL
  const fileUrl = `/uploads/${req.file.filename}`;
  
  res.status(200).json({
    success: true,
    data: fileUrl
  });
});

module.exports = router;
