import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
    console.log("MQTT conectado!");
});

export default client;