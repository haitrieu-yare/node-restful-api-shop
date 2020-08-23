const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const OrdersController = require("../controllers/orders");

router.get("/", checkAuth, OrdersController.orders_get_all);

router.post("/", checkAuth, OrdersController.orders_post);

router.get("/:orderId", checkAuth, OrdersController.orders_get);

router.patch("/:orderId", checkAuth, OrdersController.orders_patch);

router.delete("/:orderId", checkAuth, OrdersController.orders_delete);

router.delete("/", checkAuth, OrdersController.orders_delete_all);

module.exports = router;
