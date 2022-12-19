# Node WHOIS Server
This service implements the WHOIS protocol as described in [RFC 3912](https://tools.ietf.org/html/rfc3912) in Node.js, written in TypeScript. The protocol allows to query the Registry about registrable objects.

You can try it by querying **whois.jonian.dev** on port **4343** for the imaginary .jon tld.
```
whois -h whois.jonian.dev -p 4343 example.jon
```

# Running the server
### 1. Install the dependencies
Install dependencies with npm:
```
npm i
```

### 2. Configure the host, port and tld
Change the config.json values:
```json
{
  "host": "0.0.0.0",
  "port": 4343,

  "tld": "jon" 
}
```

### 3. Build
Build production (distribution) files in your dist folder:
```
npm run build
```

### 4. Run
To run the server simply run the following from the command line:
```
node dist/whois-server
```
In real life (if it even is a scenario) you'd want to run it via a daemon process manager such as [PM2](https://pm2.keymetrics.io/).

### 5. Query
To query the server run:
```
whois -h {host} -p {port} name.tld
```

## Response Templates
There is a very small template engine that you might use for the responses. Basically it replaces {{=var}} with the key's value from the given values object as below:

Template:
```
% Whois Server Response
Domain: {{=domain}}
```
Provided values object:
```js
{
    domain: 'example.jon'
}
```
Results in:
```
% Whois Server Response
Domain: example.jon
```

## Contributing
Contributions are welcome.

## License
This software is available under the MIT license.