
const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https=require("https")



const app = express()
const port = 3000
// create application/json parser


app.use(express.static('public'))

app.listen(process.env.PORT ||port, function (req, res) {
    console.log("this server is running on port 3000")
})


//body parser middleware
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/", function (req, res) {
    var fname = req.body.fname
    var lname = req.body.lname
    var email = req.body.email


    //api data integration

    //create object for members
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
                
            }
        ]
    }
//conver with json data
    const jsonD = JSON.stringify(data)
    

    //make api request
    const options = {
        method: "POST",
        auth:"rabbani1:f0d88f60354f1d70c3c0a6c50dfb545f-us5"
    }
    const apiUrl = "https://us5.api.mailchimp.com/3.0/lists/458a562c31"
    const request = https.request(apiUrl, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failur.html")
        }
        response.on("data", function(data) {
            console.log("json parse data")
        })
    })

    request.write(jsonD)
    request.end();
});




app.post("/failur", function (req, resp) {
    resp.redirect("/")
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")

});















//api key: f0d88f60354f1d70c3c0a6c50dfb545f-us5

//audience key:458a562c31
