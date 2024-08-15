const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { evaluate } = require('mathjs'); // Import mathjs

const app = express();
const PORT = 5000;

// MongoDB connection
mongoose.connect('mongodb+srv://developer786kasif:9794975553@cluster0.gp5zanz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const calculationSchema = new mongoose.Schema({
  expression: String,
  result: String
}, { timestamps: true });

const Calculation = mongoose.model('Calculation', calculationSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/api/calculate', async (req, res) => {
  const { expression } = req.body;

  try {
    const result = evaluate(expression).toString(); // Evaluate the expression
    const newCalculation = new Calculation({ expression, result });
    await newCalculation.save();

    const calculations = await Calculation.find().sort({ createdAt: -1 }).limit(50);
    res.json({ result, history: calculations });
  } catch (error) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});

app.get('/api/history', async (req, res) => {
  const calculations = await Calculation.find().sort({ createdAt: -1 }).limit(50);
  res.json(calculations);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
