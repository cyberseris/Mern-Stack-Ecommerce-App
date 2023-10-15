import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.ObjectId,
            ref: "Products"
        },
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: "Users",
    },
    status: {
        type: String,
        defaillt: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"]
    },
}, { timestamps: true }
);

export default mongoose.model('Order', orderSchema);