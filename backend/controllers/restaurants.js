const Restaurant = require('../models/Restaurant');
const { asyncHandler } = require('../middleware/asyncHandler');

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
exports.getRestaurants = asyncHandler(async (req, res, next) => {
  const restaurants = await Restaurant.find();
  res.status(200).json({ success: true, count: restaurants.length, data: restaurants });
});

// @desc    Get single restaurant
// @route   GET /api/restaurants/:id
// @access  Public
exports.getRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return res.status(404).json({ success: false, error: 'Restaurant not found' });
  }

  res.status(200).json({ success: true, data: restaurant });
});

// @desc    Create new restaurant
// @route   POST /api/restaurants
// @access  Private/Admin
exports.createRestaurant = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.admin = req.user.id;

  const restaurant = await Restaurant.create(req.body);

  res.status(201).json({ success: true, data: restaurant });
});

// @desc    Update restaurant
// @route   PUT /api/restaurants/:id
// @access  Private/Admin
exports.updateRestaurant = asyncHandler(async (req, res, next) => {
  let restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return res.status(404).json({ success: false, error: 'Restaurant not found' });
  }

  // Make sure user is restaurant admin
  if (restaurant.admin.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ success: false, error: 'Not authorized to update this restaurant' });
  }

  restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: restaurant });
});

// @desc    Delete restaurant
// @route   DELETE /api/restaurants/:id
// @access  Private/Admin
exports.deleteRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return res.status(404).json({ success: false, error: 'Restaurant not found' });
  }

  // Make sure user is restaurant admin
  if (restaurant.admin.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ success: false, error: 'Not authorized to delete this restaurant' });
  }

  await restaurant.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
