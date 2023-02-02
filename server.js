const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { response, json } = require("express");

const app = express();
const port = 2020;

app.use(cors());
app.use(express.json());
app.get("/product", (request, res) => {
  fs.readFile("./data/products.json", (err, products) => {
    if (err) {
      res.status(500).send({ message: "huselt amjitlgvi" });
    } else {
      console.log("huselt irwe");
      let data = JSON.parse(products);
      res.status(200).json(data);
    }
  });
});
app.get("/users", (request, res) => {
  fs.readFile("./data/users.json", (err, users) => {
    if (err) {
      res.status(500).send({ message: "huselt amjitlgvi" });
    } else {
      console.log("huselt irwe");
      let data = JSON.parse(users);
      res.status(200).json(data);
    }
  });
});
app.get("/order", (request, res) => {
  fs.readFile("./data/order.json", (err, order) => {
    if (err) {
      res.status(500).send({ message: "huselt amjitlgvi" });
    } else {
      console.log("huselt irwe");
      let data = JSON.parse(order);
      res.status(200).json(data);
    }
  });
});
app.post("/product", (req, res) => {
  let id = uuidv4();
  console.log(id);
  req.body.id = id;
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      let products = JSON.parse(data);
      products.unshift(req.body);
      fs.writeFile("./data/products.json", JSON.stringify(products), (err) => {
        if (err) {
          res.status(500).send({ message: "not working" });
        } else {
          res.status(200).send({ message: "working " });
        }
      });
    }
  });

  // data.unshift(req.body)
  // console.log(req.body)
  // res.send(data)
});
app.delete("/product/:index", (req, res) => {
  fs.readFile("./data/products.json", (err, products) => {
    if (err) {
      res.status(500).send({ message: "not working" });
    } else {
      let data = JSON.parse(products);
      data.splice(req.params.index, 1);
      fs.writeFile("./data/products.json", JSON.stringify(data), (err) => {
        if (err) {
          res.status(500).send({ message: "not working" });
        } else {
          res.status(200).send({ message: "working " });
        }
      });
    }
  });
});
app.put("/product/:id", (req, res) => {
  fs.readFile("./data/products.json", (err, products) => {
    if (err) {
      res.status(500).send({ message: "not working" });
    } else {
      let data = JSON.parse(products);
      let product = data.find((product) => product.id == req.params.id);
      data[data.indexOf(product)] = req.body;
      fs.writeFile("./data/products.json", JSON.stringify(data), (err) => {
        if (err) {
          res.status(500).send({ message: "not working" });
        } else {
          res.status(200).send({ message: "working" });
        }
      });
      res.send(data);
    }
  });
});
app.listen(port, () => {
  console.log(`start server ${port}`);
});
