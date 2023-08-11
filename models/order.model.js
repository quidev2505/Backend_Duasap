const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    hovaten: {
        type: String,
        required: true,
    },
    sdt: {
        type: String,
        required: true,
    },
    methodReceive: {
        type: String,
        required: true,
        default: "Giao hàng tận nơi"
    },
    address: {
        type: String,
        required: true
    },
    note: {
        type: String,
        default: "Không có ghi chú thêm !"
    },
    cart: {
        type: Array,
        default: []
    },
    total_cart: {
        type: String,
    },
    already_check: {
        type: String,
        default: "Chưa xử lý"
    },
    methodPayment: {
        type: String,
        required: true,
        default: "Thanh toán khi nhận hàng"
    },
    flag:{
        type:String,
        default: '1'
    }
},
    {
        timestamps: true
    }

)

module.exports = mongoose.model('Order', OrderSchema);