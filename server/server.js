const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'your_secret_key'; // Define your secret key here

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/yourDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

//vendorData schema
const vendorDataSchema = new mongoose.Schema({
  name: { type: String },
  contactInfo: { type: String },
  propertyName: { type: String },
  location: { type: String }
});


const VendorData = mongoose.model('VendorDatas',vendorDataSchema);

//Vendor Schema
const FormDataSchema = new mongoose.Schema({
  ComponentName:{type:String,unique:true},
  feildOne: { type: String},
  feildTwo: { type: String},
  feildThree: { type: String},
  feildFour: { type: String}, // Changed to camelCase
});

const Form = mongoose.model('Form',FormDataSchema);

//get the vendor data
app.get('/VendorData', async (req, res) => {
  try {
    const allVendors = await VendorData.find(); // Fetch all vendor data
    res.status(200).json(allVendors);
    console.log(res)
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Network error or validation failed' });
  }
});

//add new vendor data
app.post('/VendorData', async (req, res) => {
  const { name, contactInfo, propertyName, location } = req.body;

  try {
    const response = await VendorData.create({ name, contactInfo, propertyName, location });
    res.status(201).json({ message: 'Data uploaded to database successfully', response });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({ error: 'Network error or validation failed' });
  }
});

app.put('/VendorData/:id', async (req, res) => {
  try {
    const vendorId = req.params.id;
    const updatedData = req.body;

    // Find vendor by ID and update it
    const updatedVendor = await VendorData.findByIdAndUpdate(
      vendorId,
      updatedData,
      { new: true, runValidators: true }
    );
     console.log(updatedVendor);
    if (!updatedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Send the updated vendor data in response
    res.json(updatedVendor);
  } catch (error) {
    console.error('Error updating vendor:', error);
    res.status(500).json({ message: 'Failed to update vendor' });
  }
});


//delete exsisting vendor data
app.delete('/VendorData/:vendorId',async(req,res)=>{
  const vendorId =  req.params.vendorId;
  try{
       const response = await VendorData.findByIdAndDelete(vendorId);
       if(response)res.status(201).json({message:"successfully deleted"})
        else{
          res.status(500).json({message:'failed to delete',response});
        }
  }
  catch(err){
    res.status(500).json({ message: "Network error", error });
  }
})

app.get('/FormData', async (req, res) => {
  const { ComponentName } = req.query;
   console.log({ComponentName});
  try {
    const form = await Form.findOne({ComponentName});
    if (!form) return res.status(400).json({ error: 'Data not found' });

    console.log('Vendor found:', form);
    res.send(form);
  } catch (err) {
    console.error('Error fetching vendor details:', err);
    res.status(500).json({ error: 'Error fetching vendor details' });
  }
});

// Login Route
app.post('/Login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: 'User not found' });

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
     console.log('successful');
    // Send token to client
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Example Public Route
app.get('/dashboard', (req, res) => {
  res.status(200).json({ message: 'Welcome to the dashboard' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
