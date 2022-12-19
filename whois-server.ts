import net from "node:net"
import {responseTplParser} from "./responses/responseTplParser"
import {WhoisResponseValues} from "./WhoisResponseValues"
import config from "./config.json"

class WhoisServer {
    constructor() {
        // Create the TCP Server
        const server = net.createServer();

        // Start the server and listen on the Host:Port provided in the config file
        server.listen(config.port, config.host, () => {
            console.log('WHOIS Server is running on port ' + config.port + '.');
        });

        // Handle the connection event
        server.on('connection', function (socket) {

            // Once we get some data from the client we need to process the request
            socket.on('data', function (data: string) {

                // Get the domain from the client's input and remove spacings
                const domain: string = data.toString().trim();

                // Holds the response string to be sent to the client
                let response: string;

                // Populate the response values with the domain
                let whoisResponseValues: WhoisResponseValues = {
                    domain: domain
                };

                // Check if the domain is valid and if we're response for the tld.
                const regex: RegExp = new RegExp(`^[a-zA-Z0-9][a-zA-Z0-9-]{1,63}\.${config.tld}$`);

                if (!regex.test(domain)) {
                    // The domain is not valid, or we are not responsible for the tld.
                    response = responseTplParser('error', whoisResponseValues);
                }
                else {
                    /*
                        This is where we'd get the information from the database/zone file.
                     */
                    whoisResponseValues.status = 'Available';

                    // Build the response with the information for the domain
                    response = responseTplParser('success', whoisResponseValues);
                }

                // Send the response to the client
                socket.write(response);

                // End the connection
                socket.destroy();
            });
        });
    }
}

new WhoisServer();