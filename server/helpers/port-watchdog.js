import { exec } from 'child_process';
import net from 'net';

const watchDog = (server, port) => {
    // Función para verificar si el puerto está ocupado
    function isPortInUse(port, callback) {
      const testServer = net.createServer();

      testServer.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          callback(true);
        } else {
          callback(false);
        }
      });

      testServer.once('listening', () => {
        testServer.close();
        callback(false);
      });

      testServer.listen(port, '127.0.0.1');
    }

    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.info(`El puerto ${port} está en uso`);
            isPortInUse(port, (portInUse) => {
              if (portInUse) {
                console.info(`Matando el proceso en el puerto ${port}`);
                restartServer();
              } else {
                console.info(`El puerto ${port} está libre. Reiniciando el servidor...`);
                restartServer();
              }
            });
        }
    });

    const restartServer = () => {
        const command = 'npm run development';
       
        if (server) {
            console.info(`Reiniciando el servidor en el puerto ${port}`);
            server.close(() => {
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error al reiniciar el servidor en el puerto ${port}`);
                        return;
                    }
                    console.info(`Servidor reiniciado exitosamente en el puerto ${port}`);
                    console.log(stdout);
                    console.error(stderr);
                });
            });
        }
    }
}

export default watchDog;
