const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Mongoose schema for employee data
const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  department: String,
});

// Mongoose model based on the schema
const Employee = mongoose.model("Employee", employeeSchema);

mongoose.connect("mongodb://localhost:27017/Assignment")
  .then(async () => {
    console.log("Connection to Mongo Created");
    
    // Initial employee added to the database
    const initialEmployee = new Employee({
      name: "Sara Saleem",
      position: "Graphic Designer",
      department: "Design",
    });
    await initialEmployee.save();
    console.log("Initial employee added to the database");
  })
  .catch(err => {
    console.log("Error connecting");
    console.log(err);
  });

// Your existing routes adapted for Mongoose
app.get("/api/employees", async function (req, res) {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/employees", async function (req, res) {
  try {
    const newEmployee = new Employee({
      name: req.body.name,
      position: req.body.position,
      department: req.body.department,
    });

    await newEmployee.save();

    res.send(newEmployee);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// ... (other routes remain the same)

app.listen(5500, () => {
  console.log("Server is running on port 5500");
});
