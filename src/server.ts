import app from "./app";
import config from "./config/config";
import "./utils/database"; // Ensure the database is initialized

const port = config.port;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
