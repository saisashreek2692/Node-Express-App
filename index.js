require('dotenv').config()
import express from "express";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let coffeeData = [];
let nextId = 1;

//add new coffee
app.post("/coffees", (req, res) => {
  const { name, price } = req.body;
  const newCoffee = { id: nextId++, name, price };
  coffeeData.push(newCoffee);
  res.status(201).send(newCoffee);
});


//Get All Coffees
app.get("/coffees", (req,res) => {
    res.status(200).send(coffeeData)
})


// Get A Coffee with ID
app.get("/coffees/:id", (req, res) => {
    const coffee = coffeeData.find(cof => cof.id === parseInt(req.params.id))
    if (!coffee) {
        res.status(404).send("404 No Coffee Found")
    }
    res.status(200).send(coffee)
})

//Update Coffee using ID
app.put("/coffees/:id", (req,res) => {
    const coffee = coffeeData.find(cof => cof.id === parseInt(req.params.id))
    if (!coffee) {
        res.status(404).send("404 No Coffee Found")
    }
    const {name, price} = req.body
    coffee.name = name
    coffee.price = price
    res.status(200).send(coffee)
})

//Delete Coffee using ID
app.delete("/coffees/:id", (req, res) => {
    const coffeeIndex = coffeeData.findIndex(cof => cof.id === parseInt(req.params.id))
    if (coffeeIndex === -1) {
        return res.status(404).send("No Coffee Found")
    }
    coffeeData.splice(coffeeIndex, 1)
    return res.status(204).send("Coffee Data is Deleted / Removed")
})

app.listen(port, () => {
  console.log(`Server is Running at Port: ${port}.......`);
});
