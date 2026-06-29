const Offer = require('../models/Offer');
const { asyncHandler } = require('../middleware/asyncHandler');

// @desc    Get all offers
// @route   GET /api/offers
// @access  Public
exports.getOffers = asyncHandler(async (req, res, next) => {
  const offers = await Offer.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: offers.length, data: offers });
});

// @desc    Create new offer
// @route   POST /api/offers
// @access  Private/Admin
exports.createOffer = asyncHandler(async (req, res, next) => {
  const offer = await Offer.create(req.body);
  res.status(201).json({ success: true, data: offer });
});

// @desc    Delete offer
// @route   DELETE /api/offers/:id
// @access  Private/Admin
exports.deleteOffer = asyncHandler(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);

  if (!offer) {
    return res.status(404).json({ success: false, error: 'Offer not found' });
  }

  await offer.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
