const { Op }= require ('sequelize');
const Validator = require ('validatorjs');
const db = require ('../../database/models');

const { ShoppingCart } = db;

class ShoppingCartValidation {

  static checkCartItem(req, res, next) {
    const {
      productId,
      attributes,
      quantity,
    } = req.body;
    const attributesToString = attributes.toString();
    ShoppingCart.findOne({
      where: {
        product_id: productId,
        attributes: {
          [Op.like]: `%${attributesToString}%`
        }
      }
    }).then((item) => {
      if (item) {
        const newQuantity = item.quantity + quantity;
        item.update({
          quantity: newQuantity
        });
        return res.status(200).json({
          updatedItem: {
            item
          },
          totalItems: quantity,
          message: 'Item successfully added to cart'
        });
      }
      return next();
    }).catch(next);
  }

  
  static validateCartInput(req, res, next) {
    const {
      productId,
      attributes,
      quantity
    } = req.body;

    const data = {
      productId,
      attributes,
      quantity
    };

    Validator.register(
      'positiveInt', value => value > 0,
      'The cart :attribute must be a positive integer',
    );
    const rules = {
      productId: 'required|integer|positiveInt',
      attributes: 'required|array',
      quantity: 'required|integer|positiveInt'
    };

    const message = {
      'required.productId': ':attribute field cannot be empty',
      'integer.productId': 'The productId must be an integer',
      'required.attributes': ':attribute field cannot be empty',
      'array.attributes': 'attributes only accept array of string',
      'required.quantity': ':attribute field cannot be empty',
      'integer.quantity': 'The quantity must be an integer',
    };

    const validation = new Validator(data, rules, message);

    if (validation.passes()) {
      return next();
    }
    return res.status(400).json({
      errors: validation.errors.all()
    });
  }

  
  static validateCartUpdate(req, res, next) {
    const { quantity } = req.body;
    const data = {
      quantity
    };
    Validator.register(
      'positiveInt', value => value > 0,
      'The cart :attribute must be a positive integer',
    );
    const rules = {
      quantity: 'integer|positiveInt'
    };

    const validation = new Validator(data, rules);
    if (validation.passes()) {
      return next();
    }
    return res.status(400).json({
      errors: validation.errors.all()
    });
  }
}

module.exports = ShoppingCartValidation;