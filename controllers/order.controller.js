const Order = require('../models/order.model');

const getOrder = async (req, res) => {
    let dataOrder = await Order.find().sort({ createdAt: 1 });
    if (dataOrder)
        res.status(202).json(dataOrder)
    else
        throw new Error('Cannot get Data from DB');
}

const createOrder = async (req, res) => {
    const data_from_user = req.body;

    if (data_from_user) {
        const new_order = await Order.create(data_from_user);
        if (new_order)
            res.status(202).json(new_order)
        else
            throw new Error('Cannot create DB!');
    } else {
        res.status.json('None of information receive !')
    }

}


const deleteOrder = async (req, res) => {
    const id_order = req.params;

    if (id_order) {
        await Order.findByIdAndDelete(id_order.id).then((data) => {
            res.status(202).json('Delete Success !')
        }).catch((e) => {
            res.status(404).json('Delete Failed !')
        })
    } else {
        throw new Error('Cannot find ID ?')
    }
}


const findOrder = async (req, res) => {
    const user_name = req.params.username;

    if (user_name) {
        const data = await Order.find({
            $or: [
                {
                    hovaten: new RegExp(user_name, "i")
                },
                {
                    sdt: new RegExp(user_name, "i")
                }
            ]
        }
        )

        if (data)
            res.status(202).json(data)
        else
            res.status(404).json([])
    } else {
        throw new Error('Cannot find ID ?')
    }
}


module.exports = { getOrder, createOrder, deleteOrder, findOrder }