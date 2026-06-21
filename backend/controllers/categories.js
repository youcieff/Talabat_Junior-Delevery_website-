const Category = require('../models/Category');
const Restaurant = require('../models/Restaurant');
const { asyncHandler } = require('../middleware/asyncHandler');

// @desc    Get categories for a restaurant
// @route   GET /api/categories/restaurant/:restaurantId
// @access  Public
exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({ restaurant: req.params.restaurantId });
  res.status(200).json({ success: true, count: categories.length, data: categories });
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
exports.createCategory = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.body.restaurant);

  if (!restaurant) {
    return res.status(404).json({ success: false, error: 'Restaurant not found' });
  }

  // Make sure user is admin of restaurant
  if (restaurant.admin.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ success: false, error: 'Not authorized to add category to this restaurant' });
  }

  const category = await Category.create(req.body);

  res.status(201).json({ success: true, data: category });
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ success: false, error: 'Category not found' });
  }

  const restaurant = await Restaurant.findById(category.restaurant);

  if (restaurant.admin.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ success: false, error: 'Not authorized to update this category' });
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: category });
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ success: false, error: 'Category not found' });
  }

  const restaurant = await Restaurant.findById(category.restaurant);

  if (restaurant.admin.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ success: false, error: 'Not authorized to delete this category' });
  }

  await category.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
