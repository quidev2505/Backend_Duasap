const Order = require('../models/order.model');
//Nodemailer
const nodemailer = require('nodemailer')

//CSV
// const csv = require('csvtojson') //Import

const CsvParser = require('json2csv').Parser;

const getOrder = async (req, res) => {
    let dataOrder = await Order.find().sort();
    if (dataOrder)
        res.status(202).json(dataOrder)
    else
        throw new Error('Cannot get Data from DB');
}

const createOrder = async (req, res) => {
    const data_from_user = req.body;
    //Nodemailer - Send email !
    const transporter = nodemailer.createTransport({
       service: "gmail",
        auth: {
           user: "quidev2505@gmail.com",
           pass: "wubpezwnttmiwmga"
        }
});

   var messHTML = `
       <table style="width:100%;border:1px solid black;">
           <tr>
                <td style="border:1px solid black;">Họ và tên</td>
               <td style="border:1px solid black;">${data_from_user.hovaten}</td>
             </tr>
            <tr>
               <td style="border:1px solid black;">Số điện thoại</td>
              <td style="border:1px solid black;">${data_from_user.sdt}</td>
           </tr>
          <tr>
               <td style="border:1px solid black;">Địa chỉ</td>
                <td style="border:1px solid black;">${data_from_user.address}</td>
            </tr>
            <tr>
                <td style="border:1px solid black;">Ghi chú</td>
                <td style="border:1px solid black;">${data_from_user.note}</td>
            </tr>
             <tr>
                <td style="border:1px solid black;">Hình thức nhận đơn</td>
               <td style="border:1px solid black;">${data_from_user.methodReceive}</td>
            </tr>
            <tr>
                <td style="border:1px solid black;">Phương thức thanh toán</td>
               <td style="border:1px solid black;">${data_from_user.methodPayment}</td>
            </tr>
            <tr>
               <td style="border:1px solid black;">Tổng đơn hàng</td>
              <td style="border:1px solid black;">${data_from_user.total_cart} vnđ</td>
            </tr>
        </table>
   `


     const mailOptions = {
        from: "quidev2505@gmail.com",
        to: "duasap84@gmail.com",
         subject: "🎉Dừa Sáp Cách Tân [Có đơn mới]🎉",
         html: messHTML
    }


    if (data_from_user) {
        const new_order = await Order.create(data_from_user);
        if (new_order) {
            //Nodemailer 
             transporter.sendMail(mailOptions, function (error, info) {
               if (error) {
                    console.log(error)
                 } else {
                     console.log("Email sent:" + info.response);
                }
             });
            res.status(202).json(new_order)
        }
        else
            throw new Error('Cannot create DB!');
    } else {
        res.status.json('None of information receive !')
    }

}

const updateOrder = async (req, res) => {
    const data_from_user = req.body;
    const id_order = req.params;

    if (data_from_user) {
        const new_order = await Order.findByIdAndUpdate(id_order.id, data_from_user);
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


const deleteManyOrder = async (req, res) => {
    try{
        await Order.deleteMany({flag: '1'})
    }catch{(err) => 
        console.log(err)
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

const exportOrder = async(req, res) => {
    try{
        let orders = [];
        let dataOrder = await Order.find({})
        
        dataOrder.forEach((item, index)=>{
            const {hovaten, sdt, methodReceive, address, note, cart, total_cart, methodPayment, already_check, createdAt} = item;
            orders.push({ hovaten, sdt, address, methodReceive, methodPayment, note, cart, total_cart, already_check, createdAt})
        })

        const csvFields = ['Họ và tên','Số điện thoại','Địa chỉ','Phương thức nhận hàng','Phương thức thanh toán','Ghi chú','Giỏ hàng','Tổng đơn hàng','Trạng thái xử lí', 'Thời gian tạo đơn']
        const csvParser = new CsvParser({csvFields})
        const csvData = csvParser.parse(orders)

        res.setHeader("Content-Type","text/csv")
        res.setHeader("Content-Disposition","attatchment: filename=duasapcachtan.csv")
        res.status(200).end(csvData);
    }catch(e){
        console.log(e)
    }
}



module.exports = { exportOrder, getOrder, createOrder, deleteOrder, findOrder, updateOrder, deleteManyOrder }