const mongoose = require("mongoose");
const User = require("../models/User.model");
const Spot = require("../models/Spot.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/dozema-coffee";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


const spots = [
  {
    title: "Can Comas",
    details: "Bakery",
    description: "Nice bakery situated in the middle of Badalona",
    rating: 4,
    address: {
      street: "Carrer de Sagunt",
      number: 65,
      postcode: 08912,
      city: "Badalona",
    },
    averagePrice: 6,
    openingHours: "Mon-Fri 7:30-20:00",
  },
  {
    title: "MOMI",
    details: "Coffee, Desserts",
    description: "Cozy and informal environment in Frankfurt",
    rating: 4,
    address: {
      street: "Gutleutstraße",
      number: 150,
      postcode: 60327,
      city: "Frankfurt",
    },
    averagePrice: 8,
    openingHours: "Wed-Sun 10:00-18:00",
  },
  {
    title: "Blend Coffee & Wine",
    details: "Take away",
    description: "Elegant and smart space in Amsterdam",
    rating: 4,
    address: {
      street: "Oranje-Vrijstaatplein ",
      number: 40,
      postcode: 1093,
      city: "Amsterdam",
    },
    averagePrice: 8,
    openingHours: "Mon-Thu 10:00-18:00 & Fri-Sun 10:00-20:00",
  },
];

const users = [
  {
    email: "mcg-511@hotmail.com",
    password: "marian1234",
  },
  {
    email: "zta.bos@gmail.com",
    password: "zena1234",
  },
  {
    email: "doan7tran@gmail.com",
    password: "doan1234",
  },
];

const spotsPromise = Spot.create(spots);
const usersPromise = User.create(users);

Promise.all([spotsPromise, usersPromise])
  .then((result) => {
    const spotsCreated = result[0];
    const usersCreated = result[1];

    console.log(`Number of spots created... ${spotsCreated.length} `);
    console.log(`Number of users created... ${usersCreated.length} `);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((e) => console.log("error seeding data in DB....", e));
