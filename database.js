const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://sainiu692:5HGQvUoHNEzS16Lt@namaste-node.jkezkna.mongodb.net/";

const client = new MongoClient(url);

const dbName = "Project1";

async function main() {
  await client.connect();
  console.log("MongoDB is connected");
  const db = client.db(dbName);
  const collection = db.collection("User");

  // inserting the data
  const data = {
    firstName: "preeti",
    lastName: "sharma",
    city: "bangalore",
  };
  const insertResult = await collection.insertMany([data]);
  console.log("Inserted documents =>", insertResult);

  //Reading the data
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  return "done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
