import "./dotenv.js"; 
import app from "./app.js";
import conn from "./config/db.js";

const port = process.env.PORT || 5000;

conn();

app.listen(port, () => {
  console.log(`Port listening on ${port}`);
});
