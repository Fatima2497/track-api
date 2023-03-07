
const mongoose = require('mongoose')
const URL = "mongodb+srv://hashmi:EmrZTQgdnGEMs2or@cluster0.dzgpcyd.mongodb.net/?retryWrites=true&w=majority"



mongoose.connect(URL).then(()=> {
  console.log(`connection successful`)
}).catch((e)=> {console.log(e)})