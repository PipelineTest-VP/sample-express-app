const express = require('express');
const fs = require('fs');
 
const app = express();
 
app.use(express.json());
 
app.get('/list-user-details', (req, res) => {
    const localData = JSON.parse(fs.readFileSync("./local_data.json"));
    res.json(localData);
});

app.post('/add-user-details', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let age = req.body.age;
    
    let localData = JSON.parse(fs.readFileSync("./local_data.json"));
    if(localData.data) {
        localData.data.push({
            firstName: firstName,
            lastName: lastName,
            age: age
        });
    }
    fs.writeFileSync("./local_data.json", JSON.stringify(localData, null, 4));

    res.json({
        "message": "User details added successfull!!"
    });
});

app.listen(3000, () => {
  console.log('Sample app listening on port 3000!');
});