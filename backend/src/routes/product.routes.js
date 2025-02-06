import express from "express"
import productController from "../controllers/product.controller.js"

const router=express.Router()
router.route('/add-product').post(productController.productsItem)
router.route('/getAll-product').get(productController.getAllProduct)
router.route('/product-delete/:_id').delete(productController.productDelete)
router.route('/product-update/:_id').put(productController.productUpdate)
 export default router