const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-z0-9_\-\.]{4,}@[a-z]{3,}(\.[a-z]{3,})?\.[a-z]{2,}$/
    },
    password: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);