const util = require('util');
const exec = util.promisify(require('child_process').exec);

const PORT_REGEXP = /0\.0\.0\.0:([0-9]+)->[0-9]+\/(tcp|udp)/ig;

const GAME_PREFIX = "ark_";
const createServerLink = (tcpPort) => localIP.then(it => `https://arkservers.net/server/${it}:${tcpPort}`);

const localIP = (async () => {
    const {error, stdout, stderr} = await exec("curl api.ipify.org");
    if (error) {
        console.log("Error during ipify IP resolution");
    } else {
        return stdout;
    }
})();

const getAllServers = async () => {
    const {error, stdout, stderr} = await exec("docker ps -a --format '{{.Names}};;{{.Status}};;{{.Ports}}'");
    if (error) {
        console.log("Error during docker ps")
    } else {
        return stdout.split("\n").filter(line => line.toLowerCase().startsWith(GAME_PREFIX)).map(line => {
            const params = line.split(";;");
            if (params.count < 3)
                return undefined;

            const name = params[0];
            const rawState = params[1].toLowerCase();
            let state = 'PROBLEM';
            if (rawState.includes('exited')) {
                state = 'STOPPED';
            } else if (rawState.includes('up') && !rawState.includes('unhealthy')) {
                state = 'RUNNING';
            } else if (rawState.includes('starting') || rawState.includes('created')) {
                // probably very rarely occurs
                state = 'STARTING';
            } else if (rawState.includes('stopping')) {
                // probably never occurs
                state = 'STOPPING';
            }
            const ports = Array.from(params[2].matchAll(PORT_REGEXP), it => ({protocol: it[2].toUpperCase(), number: it[1]}));
            const tcpPort = ports.find(it => it.protocol === 'TCP');
            return {
                id: name,
                status: state,
                ports,
                link: tcpPort && createServerLink(tcpPort.number) || ''
            };
        }).filter(it => it !== undefined);
    }
};

const getServer = async (id) => (await getAllServers()).find((e) => (e.id === id));

const sanitizeContainerName = (containerName) => {
    if (!containerName.startsWith(GAME_PREFIX))
        return "";
    return containerName.replace(/[^a-zA-Z0-9_]+/g, "").substring(0, 50);
};

const startServer = async (obj, args) => {
    const server = await getServer(args.serverName);
    if (server !== undefined) {
        exec(`docker start ${sanitizeContainerName(server.id)}`);
        server.status = "STARTING";
        return server;
    }
    return undefined
};

const stopServer = async (obj, args) => {
    const server = await getServer(args.serverName);
    if (server !== undefined) {
        exec(`docker stop -t 180 ${sanitizeContainerName(server.id)}`);
        server.status = "STOPPING";
        return server;
    }
    return undefined
};

// The resolvers
module.exports.resolvers = {
    Query: {
        servers: getAllServers,
        server: (obj, args) => getServer(args.name)
    },
    Mutation: {
        startServer,
        stopServer
    }
};