const  {transporter}= require ('../controller/Config');
const db = require ('../database/models');
const {Customer, Product, Shoppingcart}= db;

    class Mailer{
        static emailSender(emailAddress, mailSubject, mailBody){
            const emailOptions={
                from:'Yinka store',
                to:emailAddress,
                subject:mailSubject,
                html:`i love ${mailBody} reading`
          
            }

            return transporter.sendMail(emailOptions,(err)=>{
                if(err){
                    return false
                };
                return true
            })

        }
        static sendOrderConfirmation(customerId, shippingCost, shippingType){
            Shoppingcart.findAll({
                include:[{
                    model:Product,
                    model:Customer,
                    attributes:{
                        exclude:['password', 'cerdit_card', 'role','createdAt', 'updatedAt']
                    }
                }],
                where:{
                    customer_id: customerId

                }
               
            }).then(response=>{
                const{name, city,email, country, postal_code, address_1}=response[0].Customer
              
               const price=[];
                const discountArray=[]
                response.forEach(item=>{
                    currentPrice=parseFloat(item.Product.price * item.quantity);
                    const currentDiscount=parseFloat(item.Product.discounted_price);
                    price(currentPrice);
                    discountArray.push(currentDiscount)
                });
                const orderTableColumn=response.reduce(a,b=>`${a}<tr>
                <td style="border: 1px solid #ddd; padding:8px;">${b.Product.name}</a></td>
                <td style="border: 1px solid #ddd; padding:8px;">${b.quantity}</td>
                <td style="border: 1px solid #ddd; padding:8px;">$
                ${math.round((b.Product.price * b.quantity*100)/100).toFixed(2)}</td></tr>`,'')
                const totalPrice=price.reduce(prev, next=> prev + next)
                const totalDiscount=discountArray.reduce(preV, Next=> preV + Next)
                finalPrice=math.round(((totalPrice +shipingCost -totaldiscount)*100)/100).toFixed(2);
                const subject='Order confirmation';
                const message= `<p> Dear ${name}, below is the summary of your order including shipping charge</p>
                <table style= "border collapse:collapse; ">
                <thead style="background-color: #6EB2FB;color:white">
                <th style="border: 1px solid #ddd; padding:8px;"> Item Name</th>
                <th style="border: 1px solid #ddd; padding:8px;"> Quantity</th>
                <th style="border: 1px solid #ddd; padding:8px;"> Price</th>
                </thead>
                ${OrderTableColumn}
                </table>
                <p>Shipping:<b>${shippingType} <span></b>shippingCost:</b>${shippingCost}</span></p>
                <p> <b> Item Total:</b>${math.round((totalPrice*100)/100).toFixed(2)}
                <span> <b> Discount:</b>${math.round((totalDiscount*100)/100).toFixed(2)}</span>
                <span> <b> Final Charge:</b>${finalPrice}</span>
                  </p>
                  <p><b> Shipping Address:</b>${address_1}, ${city}, ${country}, ${postal_code}</p>`;
                  Mailer.emailSender(email, subject, message);

            })

        }

        
    }

    
module.exports={Mailer};