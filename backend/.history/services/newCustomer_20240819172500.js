const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });
const uri = process.env.MONGODB_URL;

const connect = new MongoClient(uri);

async function newCustomer() {
  try {
  } catch (error) {
    console.error("Error fetching aggregated data:", error);
  }
}
