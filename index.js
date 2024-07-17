const express = require("express");
const paypal = require("paypal-rest-sdk");
const PORT = 3000;

paypal.configure({
    "mode":"sandbox",
    "client_id":"AZL53BogjPIVtOGbApog9NZzA_BekikbmaHku_Bv6MLBrCs_PFYDEj6pFZ-FV4L2We1N8R87BOS791aO",
    "client_secret":"EOFy0MWU_u-2ejHZy215ZfIIBHiMGWKm15WFAFskgPHaC9slfPDxITVCkbcfcrvExcGBF68ZhWJwwvup"
});

const app = express();

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/pay/option1",(req,res)=>{
    const create_payment_json ={
        "intent":"sale",
        "payer":{
            "payment_method": "paypal"
        },
        "redirect_urls":{
            "return_url":"http://localhost:3000/success",
            "cancel_url":"http://localhost:3000/cancel"
        },
        "transactions":[{
            "item_list":{
                "items":[{
                    "name":"Red Sox Hat",
                    "sku":"001",
                    "price":"10.00",
                    "currency":"USD",
                    "quantity":1,
                }]
            },
            "amount":{
                "currency":"USD",
                
                "total":"10.00"
            },
            "description":"Its the best Hat"
        }]
    }

    paypal.payment.create(create_payment_json, (err,payment)=>{
        if(err){
            throw err;
        }else{
            for(let i = 0;i<payment.links.length;i++){
                if(payment.links[i].rel === "approval_url"){
                    res.redirect(payment.links[i].href);
                }
            }
        }
    })
})

app.get("/success",(req,res)=>{
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json ={
        "payer_id":payerId,
        "transactions":[{
            "amount":{
                "currency":"USD",
                "total":"10.00"
            }
        }]
    }
    paypal.payment.execute(paymentId,execute_payment_json,(err,payment)=>{
        if(err){
            console.log(er.response);
            throw err;
        }else{
            console.log(JSON.stringify(payment));
            res.send("success in payment")
        }
    }
    )
})

app.get("/cancel",(req,res)=>{
    res.send("cancel in     payment")
})



app.post("/pay/option2",(req,res)=>{
    const create_payment_json ={
        "intent":"sale",
        "payer":{
            "payment_method": "paypal"
        },
        "redirect_urls":{
            "return_url":"http://localhost:3000/success",
            "cancel_url":"http://localhost:3000/cancel"
        },
        "transactions":[{
            "item_list":{
                "items":[{
                    "name":"Red Sox Hat",
                    "sku":"001",
                    "price":"20.00",
                    "currency":"USD",
                    "quantity":1,
                }]
            },
            "amount":{
                "currency":"USD",
                "total":"20.00"
            },
            "description":"Its the best Hat"
        }]
    }

    paypal.payment.create(create_payment_json, (err,payment)=>{
        if(err){
            throw err;
        }else{
            for(let i = 0;i<payment.links.length;i++){
                if(payment.links[i].rel === "approval_url"){
                    res.redirect(payment.links[i].href);
                }
            }
        }
    })
})

app.get("/success",(req,res)=>{
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json ={
        "payer_id":payerId,
        "transactions":[{
            "amount":{
                "currency":"USD",
                "total":"20.00"
            }
        }]
    }
    paypal.payment.execute(paymentId,execute_payment_json,(err,payment)=>{
        if(err){
            console.log(er.response);
            throw err;
        }else{
            console.log(JSON.stringify(payment));
            res.send("success in payment")
        }
    }
    )
})

app.get("/cancel",(req,res)=>{
    res.send("cancel in     payment")
})



app.post("/pay/option3",(req,res)=>{
    const create_payment_json ={
        "intent":"sale",
        "payer":{
            "payment_method": "paypal"
        },
        "redirect_urls":{
            "return_url":"http://localhost:3000/success",
            "cancel_url":"http://localhost:3000/cancel"
        },
        "transactions":[{
            "item_list":{
                "items":[{
                    "name":"Red Sox Hat",
                    "sku":"001",
                    "price":"30.00",
                    "currency":"USD",
                    "quantity":1,
                }]
            },
            "amount":{
                "currency":"USD",
                "total":"30.00"
            },
            "description":"Its the best Hat"
        }]
    }

    paypal.payment.create(create_payment_json, (err,payment)=>{
        if(err){
            throw err;
        }else{
            for(let i = 0;i<payment.links.length;i++){
                if(payment.links[i].rel === "approval_url"){
                    res.redirect(payment.links[i].href);
                }
            }
        }
    })
})

app.get("/success",(req,res)=>{
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json ={
        "payer_id":payerId,
        "transactions":[{
            "amount":{
                "currency":"USD",
                "total":"30.00"
            }
        }]
    }
    paypal.payment.execute(paymentId,execute_payment_json,(err,payment)=>{
        if(err){
            console.log(er.response);
            throw err;
        }else{
            console.log(JSON.stringify(payment));
            res.send("success in payment")
        }
    }
    )
})

app.get("/cancel",(req,res)=>{
    res.send("cancel in     payment")
}) 

app.listen(PORT,()=>{
    console.log(`Server started ${PORT}`)
})