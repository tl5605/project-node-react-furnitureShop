require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")

const corsOptions = require("./config/corsOptions.js")
const connectDB = require("./config/dbConn")

const app = express()
const PORT = process.env.PORT || 8004
connectDB()

app.use(express.json())
app.use(express.static("public"))
app.use(cors(corsOptions))


app.use("/api/auth", require("./routes/authRoute"))
app.use("/api/furniture", require("./routes/furnitureRoute.js"))
app.use("/api/user", require("./routes/userRoute.js"))
app.use("/api/basket", require("./routes/basketRoute.js"))
app.use("/api/order", require("./routes/orderRoute.js"))

app.get('/uploads/:filename', (req, res) => {
    const imagePath = path.join(__dirname, '/public/uploads/', req.params.filename);
    res.sendFile(imagePath, { headers: { 'Content-Type': 'image/jpeg' } });
});
app.use('/uploads', express.static(__dirname + '/public/uploads'));


app.get("/", (req, res) => {
    res.send("HomePage")
})


mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    })
})

mongoose.connection.on('error', err => {
    console.log(err);
})
