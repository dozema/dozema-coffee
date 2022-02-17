const mongoose = require("mongoose");
const User = require("../models/User.model");
const Spot = require("../models/Spot.model");

const MONGO_URI =
  "mongodb://0.0.0.0/dozema-coffee " || "mongodb://localhost/dozema-coffee";

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
    description: "Nice bakery situated in the middle of Badalona",
    averagePrice: "€€",
    openingHours: "Mon-Fri 7:30-20:00",
    imageUrl:
      "https://cdn.omnium.cat/wp-content/uploads/2018/06/01093545/can-comas.jpg",
    details: ["Crowded"],
    location: {
      latitude: 41.44514367806466,
      longitude: 2.2424786390645974,
    },
  },
  {
    title: "MOMI",
    description: "Cozy and informal environment in Frankfurt",
    averagePrice: "€€",
    openingHours: "Wed-Sun 10:00-18:00",
    imageUrl: "https://www.lealou.me/wp-content/uploads/2020/04/DSC_4828.jpg",
    details: [
      "Vegan",
      "Vegetarian",
      "Gluten-free",
      "Wifi",
      "Power stations",
      "Work desks",
      "Quiet",
    ],
    location: {
      latitude: 50.10133897945841,
      longitude: 8.658401002135413,
    },
  },
  {
    title: "Blend Coffee & Wine",
    description: "Elegant and smart space in Amsterdam",
    averagePrice: "€€",
    openingHours: "Mon-Thu 10:00-18:00 & Fri-Sun 10:00-20:00",
    imageUrl:
      "https://res.cloudinary.com/tf-lab/image/upload/w_600,h_337,c_fill,g_auto:subject,q_auto,f_auto/restaurant/4fd52dcf-94c5-4876-8e71-dc14f0e46ab6/4d6b8bd1-4b92-41fd-9afd-75ae31671c7c.jpg",
    details: [
      "Vegan",
      "Vegetarian",
      "Gluten-free",
      "Pet-friendly",
      "Wifi",
      "Power stations",
      "Crowded",
    ],
    location: {
      latitude: 52.35812051936951,
      longitude: 4.930267088008355,
    },
  },
];

const users = [
  {
    name: "Marian",
    email: "mcg-511@hotmail.com",
    password: "marian1234",
  },
  {
    name: "Zena",
    email: "zta.bos@gmail.com",
    password: "zena1234",
  },
  {
    name: "Doan",
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
