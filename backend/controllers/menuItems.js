const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');
const { asyncHandler } = require('../middleware/asyncHandler');

// @desc    Get menu items for a restaurant
// @route   GET /api/menu-items/restaurant/:restaurantId
// @access  Public
exports.getMenuItems = asyncHandler(async (req, res, next) => {
  const menuItems = await MenuItem.find({ restaurant: req.params.restaurantId }).populate('category');
  res.status(200).json({ success: true, count: menuItems.length, data: menuItems });
});

// @desc    Get single menu item
// @route   GET /api/menu-items/:id
// @access  Public
exports.getMenuItem = asyncHandler(async (req, res, next) => {
  const menuItem = await MenuItem.findById(req.params.id).populate('category').populate('restaurant');

  if (!menuItem) {
    return res.status(404).json({ success: false, error: 'Menu item not found' });
  }

  res.status(200).json({ success: true, data: menuItem });
});

// @desc    Create menu item
// @route   POST /api/menu-items
// @access  Private/Admin
exports.createMenuItem = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.body.restaurant);

  if (!restaurant) {
    return res.status(404).json({ success: false, error: 'Restaurant not found' });
  }

  if (restaurant.admin.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ success: false, error: 'Not authorized to add menu item' });
  }

  const menuItem = await MenuItem.create(req.body);

  res.status(201).json({ success: true, data: menuItem });
});

// @desc    Update menu item
// @route   PUT /api/menu-items/:id
// @access  Private/Admin
exports.updateMenuItem = asyncHandler(async (req, res, next) => {
  let menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return res.status(404).json({ success: false, error: 'Menu item not found' });
  }

  const restaurant = await Restaurant.findById(menuItem.restaurant);

  if (restaurant.admin.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ success: false, error: 'Not authorized to update menu item' });
  }

  menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: menuItem });
});

// @desc    Delete menu item
// @route   DELETE /api/menu-items/:id
// @access  Private/Admin
exports.deleteMenuItem = asyncHandler(async (req, res, next) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return res.status(404).json({ success: false, error: 'Menu item not found' });
  }

  const restaurant = await Restaurant.findById(menuItem.restaurant);

  if (restaurant.admin.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ success: false, error: 'Not authorized to delete menu item' });
  }

  await menuItem.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
