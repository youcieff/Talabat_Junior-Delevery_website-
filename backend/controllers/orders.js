const Order = require('../models/Order');
const { asyncHandler } = require('../middleware/asyncHandler');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const order = await Order.create(req.body);

  res.status(201).json({ success: true, data: order });
});

// @desc    Get all orders (Admin) or User orders
// @route   GET /api/orders
// @access  Private
exports.getOrders = asyncHandler(async (req, res, next) => {
  let query;

  if (req.user.role === 'admin') {
    query = Order.find().populate('user').populate('restaurant').populate('items.menuItem');
  } else {
    query = Order.find({ user: req.user.id }).populate('restaurant').populate('items.menuItem');
  }

  const orders = await query;

  res.status(200).json({ success: true, count: orders.length, data: orders });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate('user')
    .populate('restaurant')
    .populate('items.menuItem');

  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }

  // Make sure user is order owner or admin
  if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ success: false, error: 'Not authorized to view this order' });
  }

  res.status(200).json({ success: true, data: order });
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }

  // Only admin or restaurant owner can update status (simplifying to admin for now)
  if (req.user.role !== 'admin') {
    return res.status(401).json({ success: false, error: 'Not authorized to update status' });
  }

  order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, data: order });
});
