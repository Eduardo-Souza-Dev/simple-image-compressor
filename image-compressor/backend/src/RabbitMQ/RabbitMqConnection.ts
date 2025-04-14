import amqp, { Connection } from 'amqplib/callback_api';

class RabbitMqConnection {
    private static instance: RabbitMqConnection;
    private connection: Connection | null = null;

    private constructor() {}

    public static getInstance(): RabbitMqConnection { // Método para obter a instância da conexão
        if (!RabbitMqConnection.instance) {
            RabbitMqConnection.instance = new RabbitMqConnection();
        }
        return RabbitMqConnection.instance;
    }

    public connect(): Promise<Connection> { // Método para conectar ao RabbitMQ
        const url = 'amqp://localhost';
        return new Promise((resolve, reject) => {
            if (this.connection) {
                return resolve(this.connection);
            }

            amqp.connect(url, (error, connection) => { // Recebe a url e a função de callback
                if (error) {
                    console.error("Erro ao conectar ao RabbitMQ:", error);
                    return reject(error);
                }
                this.connection = connection;
                resolve(connection);
            });
        });
    }

    public getConnection(): Connection | null { // Método para obter a conexão
        return this.connection;
    }

    public closeConnection(): void { // Método para fechar a conexão
        if (this.connection) {
            this.connection.close();
            this.connection = null;
        }
    }
}

export default RabbitMqConnection;