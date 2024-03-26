const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const ExpData = require('./model/expmodel'); 
const Budget = require('./model/budget')
const app = express();
const bodyParser = require("body-parser");

dotenv.config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;


app.use(bodyParser.urlencoded ({extended:true}));
app.use(bodyParser.json());

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.y7xww5v.mongodb.net/ExpData`, {
  useNewUrlParser:true,
  useUnifiedTopology:true,
})

app.set('view engine','ejs');
app.get('/', async (req, res) => {
  let totalAmt = 0;
  const expData = await ExpData.find();
  expData.forEach(data => {
    totalAmt += data.amt;
  });


  const budgetDoc = await Budget.findOne({ name: 'mainBudget' }) || { amount: 150000 }; 
  const budGet = budgetDoc.amount;

  res.render('pages/home', { expData: expData, totalAmt: totalAmt, budGet: budGet });
});

app.post('/update-budget', async (req, res) => {
  const { budget } = req.body;
  try {

    await Budget.findOneAndUpdate(
      { name: 'mainBudget' },
      { amount: budget },
      { upsert: true, new: true }
    );
    res.redirect('/');
  } catch (error) {
    console.error('Failed to update the budget:', error);
    res.status(500).send('Error updating the budget');
  }
});


app.post('/add', async(req, res) => {
  try {
    const { cate, amt, date } = req.body;

    const newExpData = new ExpData({
      cate,
      amt,
      date
    });
    await newExpData.save();
    return res.redirect("/"); 
  } catch (error) {
    console.log(error);

    return res.status(500).send("An error occurred"); 
  }

})
app.post('/:id', async (req,res)=>{
  console.log("test 0")
  await ExpData.findByIdAndDelete(req.params.id);
  res.redirect('/')
})





app.listen(3000)