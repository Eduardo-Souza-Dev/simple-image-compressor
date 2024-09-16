let amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection){
    if(error0){
        throw error0;
    }

    connection.createChannel(function (erro1, channel){
        if(erro1){
            throw erro1;
        }

        let queue = 'task_queue';
        let msg = process.argv.slice(2).join(' ') || 'Hello World!';

        channel.assertQueue(queue, {
            durable: true
        });

        channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true
        });
        console.log(" [x] Sent '%s'", msg);
      })
});