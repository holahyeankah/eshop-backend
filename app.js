const express= require('express')
const jwt= require('jsonwebtoken');
const path = require ('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { getAllProduct, getOneProduct } = require('./server/controller/ProductController');
const { getAllShipping, getOneShipping } = require('./server/controller/ShippingController')
const { getAllDepartment, getOneDepartment} = require('./server/controller/DepartmentController');
const { createCustomer, getOneCustomer, verifyToken, updateCustomer} = require('./server/controller/CustomerController');
const { getAllCategory, getOneCategory } = require('./server/controller/categoryController');
// const { getAllAttribute, getOneAttribute} = require('./server/controller/AttributeController');
const { getAllCartItems, updateCart, deleteCart,addToCartItem } = require('./server/controller/CartController')
const { allUsers } = require('./server/controller/UserController');
// const{ postCharge}= require ('./server/controller/paymentController')




const app= express();


app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.delete('/shoppingcart/:id', verifyToken,  deleteCart)
// app.post('/stripe/charge', postCharge)
app.put('/shoppingcart/:id', verifyToken, updateCart)
app.get('/shoppingcart', verifyToken, getAllCartItems)
app.post('/shoppingcart', verifyToken, addToCartItem)
// app.get('/product', getAllProduct);
// app.get('/product_value', getAllProductValue);
// app.get('/product_value', getOneProductValue);
// app.get('/attribute', getAllAttribute);
app.get('/shipping', getAllShipping);
app.get('/shipping/:id', getOneShipping);
app.get('/shippingregion', getAllShipping);

app.get('/department', getAllDepartment);
app.get('/product', getAllProduct);
app.get('/product/:id', getOneProduct);
app.get('/category', getAllCategory);
app.get('/category/:id', getOneCategory);
app.get('/department/:id', getOneDepartment);
app.post('/customer/register', createCustomer);
app.post('/customer/login', getOneCustomer);
app.get('/test/all', verifyToken, allUsers)
app.put('/customer',verifyToken, updateCustomer)


// app.get('/api', (req, res)=>{

//     res.json({
//         message: 'welcome to my api'
//     }). catch(err=>{
//         console.log(Error)
//     })
// })

// app.get('/protected',verifyToken, (req, res)=>{
//     res.send('Am protected')
// })
// app.get('/getCustomer/', verifyToken, (req,res)=>{
//     res.send('customer gotten')
// })


       
app.post('/api/login', (req, res)=>{
    const {id, username}=req.body;

    const payrol={
        id:id,
        username:username,
        
    }
    jwt.sign({payrol}, 'secretKey',{expiresIn:'1d'}, (err, token)=>{

    
        res.json({
            token
        })
        
            });

        })



app.listen(3005,()=>{
console.log('App is listening to port 3004')

})

module.exports = app;