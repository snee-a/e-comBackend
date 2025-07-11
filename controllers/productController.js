const fs=require("fs");// fs (File System) aur path dono Node.js ke built-in core modules hain.
const path=require("path");
const { json } = require("stream/consumers");

function loadAllProducts(){
    const amazon=path.join(__dirname,"../data/amazon.json");
    const flipkart=path.join(__dirname,"../data/flipkart.json");

    const amazonData=JSON.parse(fs.readFileSync(amazon,"utf-8"));//fs.readFileSync File read karta hai (synchronously = ek saath)
    //utf-8 Encoding → file ko text ke form me padhne ke liye
    const flipkartData=JSON.parse(fs.readFileSync(flipkart,"utf-8"));
     
    return [...amazonData,...flipkartData];//combines both data
}

const getAllProducts=(req,res)=>{
    const products=loadAllProducts();
    const { search , company , sort }=req.query;
    let filteredProducts=products;

    if(search){
        const keyword=search.toLowerCase();
        filteredProducts=filteredProducts.filter((product)=>product.name.toLowerCase().includes(keyword));
    }

    if(company){
        const selectedCompany=company.toLowerCase();
        filteredProducts=filteredProducts.filter((product)=>product.company.toLowerCase()===selectedCompany);
    }
    if(sort){
        if(sort==="asc"){
            filteredProducts=filteredProducts.sort((a,b)=>a.price-b.price);
        }
        else if(sort==="desc"){
            filteredProducts=filteredProducts.sort((a,b)=>b.price-a.price);
        }
    }
    res.json(filteredProducts);
    
}

module.exports={
    getAllProducts
};