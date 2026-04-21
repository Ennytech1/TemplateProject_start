const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Task = require('../models/Task');
const Notification = require('../models/Notification');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find({ user: req.user.id }).sort('-createdAt');

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns task
  if (task.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to access this task', 401));
  }

  res.status(200).json({ success: true, data: task });
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const task = await Task.create(req.body);

  // Send notification
  await Notification.create({
    user: req.user.id,
    type: 'success',
    title: 'Task Created',
    message: `New task "${task.title}" has been successfully created.`
  });

  res.status(201).json({ success: true, data: task });
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns task
  if (task.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to update this task', 401));
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: task });
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns task
  if (task.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to delete this task', 401));
  }

  await task.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
