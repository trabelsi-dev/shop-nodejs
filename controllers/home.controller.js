const productsModel = require("../models/products.model");

exports.getHome = (req, res, next) => {
    //bech ya9ra category mil paramete ta3 path
    let category = req.query.category;
    // a3mlna array fih les category
    let validCategories = ["clothes", "phones", "computers"];
    let productsPromise;
    if (category && validCategories.includes(category))
        //getProductsByCategoryfunction mawjouda fil model ta3teha category traja3lik données te3ou
        productsPromise = productsModel.getProductsByCategory(category);
    else productsPromise = productsModel.getAllProducts();
    productsPromise
        .then(products => {
            res.render("index", {
                // heda données ili bech t3adih lil index 
                products: products,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                validationError: req.flash("validationErrors")[0],
                pageTitle: "Home"
            });
        })
        .catch(err => {
            console.log(err);
        });
};
