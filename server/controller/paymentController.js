const stripe= require('stripe')('sk_test_51Gu0L4LAEp4qn5RYFyW7Qk4ZNz79ADpYpzSTZ2HK2ymYXhonbVU8JBtm3aWw0zxdHLbXuMdp4Vakqt09eA4kCbtw00VVIuBVYa');

const postCharge=(req, res)=>{

    const {amount, source, receipt_email}= req.body;

    const charge=stripe.charges.create({

        amount,
        source,
        receipt_email,
        currency:'usd'

    })
    if(!charge){
        return res.status(404).json({
            message:'charge unsuccessful'
        })

        res.status(200).json({
            message:'charge successful',
            charge

        })
        .catch(error=>{
            res.status(500).json({
                message:'error.message'
            })
        })
    }
}

module.exports={postCharge}