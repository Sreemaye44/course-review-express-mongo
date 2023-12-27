import app from "./app";
import mongoose from "mongoose";
import config from "./config";
const PORT = 9000;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
