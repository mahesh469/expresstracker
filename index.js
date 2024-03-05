const mongoose = require('mongoose')
const express = require('express')
const {Expense} =require('./schema.js')
const bodyparser=require('body-parser')
const port = process.env.PORT || 8000
console.log("hello")
const app=express()
app.use(bodyparser.json())
async function connectdb(){
    try{
        await mongoose.connect('mongodb+srv://maheshkumarg2022cse:mahesh@cluster0.jnbklbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log("DB CONNECTED")
    const port=8000
    app.listen(port,()=>{
    console.log(`listening on ports ${port}`)
    })
    }
    catch(error){
        console.log(error)
        console.log("NOT CONNECTED")
    }
}
// const Expense=mongoose.model('EXPENSE_DETAILS',expensetrackerschema)
connectdb()
app.post('/add',async(request,response)=>{
   
   try{
    await Expense.create({
        "amount":request.body.amount,
        "category":request.body.category,
        "date":request.body.date
    })
    response.status(200).json({
        "status":"successful"
    })
   }
   catch(error){
    console.log(error)
    response.status(500).json({
        "status":"unsuccessful"
    })
   }
})

app.delete('/delete-expense/:id',async (request,response)=>{
    try{
        const expenseid = await Expense.findById(request.params.id)
        console.log(expenseid)
        if(expenseid){
            
            await Expense.findByIdAndDelete(expenseid)
            response.status(200).json({
                "status":"success",
                "message":"deleted an entry"
            })
        }
        else{
            response.status(404).json({
                "status":"failed",
                "message":"file not found"
            })
        }
    }
    catch(error){
        response.status(5000).json({
            "status":"failed",
            "message":"internal error"
        })
    }})


    app.patch('/edit-expense/:id',async function(request,response){
        try{
            const edit=await Expense.findById(request.params.id)
            if(edit){
                await Expense.updateOne({
                    "amount":request.body.amount,
                    "category":request.body.category,
                    "date":request.body.date
                })
                console.log("Edited")
                response.status(200).json({
                    "status":"success"
                })
            }
            else{
                response.status(404).json({
                    "status":"failed"
                })
            }
        }
        catch(error){
            console.log("error")
            
      }
    })



