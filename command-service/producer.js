/**
 * Created by maiquel on 20/09/17.
 */

const Kafka = require("kafka-node");

/* Kafka connection parameters */
const topic = "todos";
const partition = 0;
const attributes = 0;
const requireAcks = 1;

const kafkaAddress = process.env.NODE_ENV === 'production' ?
    "192.168.99.100:2181" :
    "192.168.99.100:2181";
    // "kafka:2181" :
    // "localhost:2181";

console.log("IP DO KAFKA É: "+ kafkaAddress);

/* Connects to kafka broker */
const producer = new Kafka.Producer(new Kafka.Client(kafkaAddress), {requireAcks});

producer.on("ready", (err) => {
    console.log(err || "Connected to kafka...");

    producer.createTopics(['todos'],false, function (err, data) {
        console.log(err || 'Criado TOPIC "todos" com sucesso no KAFKA');
        if (err) process.exit(5);
    });
});

producer.on("error", (err) => {
    console.log("ERRO NO KAFKA", err);
    process.exit(5);
});

/* Event Pubisher */
const publish = (event, cb) => {
    const message = {
        topic,
        partition,
        messages: JSON.stringify(event),
        attributes,
    };
    console.log("Publicando mensagem no kafka: " + message);
    producer.send([message], cb);
};

module.exports = producer;
module.exports.publish = publish;
