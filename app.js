//importing
const express=require("express");
const app=express();
const cors=require("cors");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const productRoutes=require("./routes/products");//routing
app.use("/products",productRoutes);

app.get("/",(req,res)=>{
    res.send("welcome");
})

const port=5000;
app.listen(port,()=>{
    console.log(`App is listening at the port ${port}`);
});