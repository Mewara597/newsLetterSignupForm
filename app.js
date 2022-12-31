const express = require('express');
const bodyParser = require("body-parser");
const request = require('request');
const https = require('https');
const { json } = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))


// app.get('/', (req, res) => {
//     req.send('hey there!');
// })


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html')


})
app.post('/', function (req, res) {
    console.log('post req received');

    const fname = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;
    console.log(fname, lName);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data)
    const url = "https://us21.api.mailchimp.com/3.0/lists/de677a8065";

    const options = {
        method: "POST",
        auth: "siddarth:e71262ee788da0c86e5956cdfac0498b-us21"
    }

    const request = https.request(url, options, function (response) {
        if (response.statusCode == 200) {
            // res.send("SuccessFully subscribed !")
            res.sendFile(__dirname + "/success.html")
        } else {
            // res.send('there was an error with signup please try again leter!!')
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function (data) {
            // console.log(JSON.parse(data));
            // JSON.parse(data).error_count == 0 ? response.send('you hacve successfully signedup') : ''
        })
    })

    request.write(jsonData);
    request.end()
})


app.post("/failure", function (req, res) {
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, function () {
    console.log('server is up and running on 3000')
})


// Api key e71262ee788da0c86e5956cdfac0498b-us21
// list id de677a8065