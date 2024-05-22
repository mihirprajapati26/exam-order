const Order = require("../models/orderModel");

// Render Controller: Render index.html with order using EJS
const renderOrders = async (req, res) => {
  const user_id = req.user._id
  try {
    const orders = await Order.find({user_id}).sort({createdAt: -1});
    res.render("index", { orders }); // Render index.ejs with orders data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get order by ID
const renderOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const order = await Order.findById(id).where('user_id').equals(user_id);
    if (!order) {
      return res.render("notfound");
    }
    res.render("singleOrder", { order }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Order:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addorder"); // Assuming "addorder.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new order (used for rendering and API)
const addOrder = async (req, res) => {
  try {
    const { customer, totalAmount, duration, products, status } = req.body;
    const user_id = req.user._id;

    const newOrder = new Order({customer, totalAmount, duration, products, status, user_id });
    await newOrder.save();
    // Redirect to the main page after successfully adding the Order
    console.log("Order added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).render("error");
  }
};

// Delete Order by ID
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const order = await Order.findByIdAndDelete({ _id: id,user_id: user_id });
    if (!order) {
      return res.status(404).render("notfound");
    }
    console.log("Order delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Order:", error);
    res.status(500).render("error");
  }
};


// Update Order by ID
const renderUpdateOrder = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the order by id
    const order = await Order.findById(id);

    if (!order) {
      return res.render("notfound");
    }

    // Render the singleorder.ejs template with the order data
    res.render("singleorder", { order });

  } catch (error) {
    console.error("Error fetching Order:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const { customer, totalAmount, duration, products, status } = req.body;
    const updatedOrderData = { customer, totalAmount, duration, products, status };

    // Update the order with the new data
    const updatedOrder = await Order.findOneAndUpdate({ _id: id, user_id: user_id }, updatedOrderData, { new: true });

    if (!updatedOrder) {
      return res.render("notfound");
    }

    res.redirect("/");

  } catch (error) {
    console.error("Error updating Order:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderOrders,
  renderOrder,
  addOrder,
  renderForm,
  deleteOrder,
  updateOrder,
  renderUpdateOrder,
};
