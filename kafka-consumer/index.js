const MongoClient = require('./db/mongo-client');
const Kafka = require("kafka-node");
const kafkaAddress = process.env.NODE_ENV === 'production' ?
    "192.168.99.100:2181" :
    "192.168.99.100:2181";

const client = new Kafka.Client(kafkaAddress);
const topics = [{ topic: "todos", partition: 0 }];
const options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

const connect = () => {
    return new Kafka.Consumer(client, topics, options);
};

console.log(JSON.stringify(connect));

var consumer = connect();
const offset = new Kafka.Offset(client);

consumer.on("message", (message) => {
    console.log("\n\n\nNEW MESSAGE:\n" + message);
    const todo = JSON.parse(message.value);

    MongoClient((db) => {
        db.collection('todos').findOneAndUpdate(
            { id: todo.id },
            { $set: { id: todo.id, text: todo.text }},
            { returnOriginal: false, upsert: true},
            err => console.log(err || `Updated todo ${todo.text}`)
        )
    });
});

consumer.on("error", (err) => {
    console.log("error with consumer - will retry soon", err);
    setTimeout(() => {
        console.log("Retrying...");
        consumer = connect();
    }, 3000);
});

consumer.on("offsetOutOfRange", (t) => {
    const topic = t;
    topic.maxNum = 2;

    offset.fetch([topic], (err, offsets) => {
        if (err) {
            console.log(err);
        }

        const min = Math.min(offsets[topic.topic][topic.partition]);
        consumer.setOffset(topic.topic, topic.partition, min);
    });
});

console.log("ROdou até aqui");
