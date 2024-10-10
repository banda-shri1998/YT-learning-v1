const  express = require('express');
const path = require('path');
const app = express()

app.use('/images', express.static(path.join(__dirname, '/images')));

app.get('/', (req,res)=>{
  // res.send('hello')
  res.sendFile(path.join(__dirname,'pages/index.html'))
})

const port = 3000;

app.listen(port,()=>{
  console.log('Server running on https://localhost:',port); 
})