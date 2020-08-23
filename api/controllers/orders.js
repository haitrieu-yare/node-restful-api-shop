const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");

exports.orders_get_all = (req, res) => {
    Order.find()
        .select("product quantity _id")
        .populate("product", "name")
        .exec()
        .then((docs) => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map((doc) => {
                    return {
                        _id: doc.id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + doc._id,
                        }
                    };
                }),
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
}

exports.orders_post = (req, res) => {
    Product.findById(req.body.productId)
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId,
            });
            return order.save();
        }).then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Order stored.",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + result._id,
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
}

exports.orders_get = (req, res) => {
    Order.findById(req.params.orderId)
        .populate("product", "name price")
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }
            res.status(200).json({
                order: order
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_patch = (req, res) => {
    const id = req.params.orderId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Order.findById(id)
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }
            return Order.updateOne({ _id: id }, { $set: updateOps });
        })
        .then(result => {
            res.status(200).json({
                message: "Order updated",
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_delete = (req, res) => {
    Order.remove({ _id: req.params.orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Order deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_delete_all = (req, res) => {
    Order.deleteMany({})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "All order deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}