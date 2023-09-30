import app from "./app";
import watchDog from "./helpers/port-watchdog";

const port = import.meta.env.PORT;
const server = app.listen(port, (error) => {
    if (!error) {
        console.info(`Server is running on port ${import.meta.env.PORT}`);
    } else {
        console.error("Error occured while starting the server");

    }
});

watchDog(server, port);