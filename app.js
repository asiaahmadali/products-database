const express = require('express') ;
const productModel = require('./Models/product') ;
const app = express() ;

app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;
app.set('view engine' , 'ejs') ;

app.get('/',(req,res)=>{
    res.render('index');
})

// create the product
app.post('/create',async(req,res)=>{
  const{Pname, Pprice, Pimage} = req.body ;
  const createdProduct = await productModel.create({
    productName:Pname,
    productPrice:Pprice,
    productImage:Pimage 
  })
   res.redirect('/viewAll');
})

// read all the products
app.get('/viewAll',async (req,res)=>{
    const allProducts = await productModel.find() ;
    res.render('products',{products :allProducts})
})

// delete product

app.get('/delete/:productid',async (req,res)=>{
  const deletedProduct = await productModel.findOneAndDelete({_id:req.params.productid})
  res.redirect('/viewAll') ;
})

// edit product

app.get('/edit/:productid',async (req,res)=>{
  let updatedproduct = await productModel.findOne({_id:req.params.productid}) ;
   res.render('update',{product:updatedproduct})
});

// edit post method

app.post('/update/:productid',async (req,res)=>{
   const {Pname,Pprice,Pimage } = req.body ;
   await productModel.findOneAndUpdate({_id:req.params.productid},{
    productName:Pname,
    productPrice:Pprice,
    productImage:Pimage
   },{new:true});

   res.redirect('/viewAll') ;
})

app.listen(3000,()=>{
    console.log('listening server') ;
}) ;