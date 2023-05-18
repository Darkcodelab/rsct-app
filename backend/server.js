const env = require("./config");
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
connectDB(env.MONGO_URI);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(__dirname + "/public"));

app.use("/auth", require("./routes/auth/index.js"));
app.use("/api/tc", require("./routes/api/tc.js"));
app.use("/api/donorAcknowledgment", require("./routes/api/donorAcknowledgment"));
app.use(errorHandler);

app.listen(env.PORT, () => console.log(`Server listening on *:${env.PORT}`));
