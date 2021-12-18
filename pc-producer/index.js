const { Kafka } = require("kafkajs");
const os = require("os");
const _ = require("lodash");
const { monoLogger, monoEnum } = require("mono-utils-core");
const uuid = require("uuid");
const NS = "app-producer";
const PC_TOPIC = "pc_topic";
const cpu = require("os-utils");
const BPromise = require("bluebird");
const config = {
        brokerAddress: process.env.NODE_ENV === monoEnum.NODE_ENV_MODE.DEVELOPMENT ? "localhost:29092" : "128.199.174.71:29092",
};

const kafka = new Kafka({
        clientId: "server",
        brokers: [config.brokerAddress],
});

const producer = kafka.producer();
const run = async () => {
        const id = uuid.v4();
        const cpuInfo = os.cpus();
        await producer.connect();
        monoLogger.log(NS, "producer init successfully");

        setInterval(async () => {
                const cpuUsage = await new BPromise((resolve) => {
                        cpu.cpuUsage(function (v) {
                                resolve(v);
                        });
                });

                await producer.send({
                        topic: PC_TOPIC,
                        messages: [
                                {
                                        value: JSON.stringify({
                                                pcId: id,
                                                cpuName: _.get(cpuInfo[0], "model", "unknown").trim(),
                                                platformName: os.platform(),
                                                usageCpu: cpuUsage,
                                                usageRam: (os.totalmem() - os.freemem()) / os.totalmem(),
                                                updateAt: Date.now(),
                                        }),
                                },
                        ],
                });

                monoLogger.log(NS, "streaming data to broker");
        }, 1000);
};
run().catch(console.error);
