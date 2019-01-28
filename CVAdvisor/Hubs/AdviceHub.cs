using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace CVAdvisor.Hubs
{
    public class AdviceHub : Hub
    {
        private readonly ConnectionFactory _factory;
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private static IClientProxy caller;
        public AdviceHub()
        {
            _factory = new ConnectionFactory()
            {
                HostName = "176.111.58.116",
                UserName = "mhpbunny1",
                Password = "pfzw1234"
            };
            _connection = _factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.ExchangeDeclare(exchange: "give-me-advices", type: "fanout");
            _channel.ExchangeDeclare(exchange: "take-back-advices", type: "fanout");
            _channel.QueueDeclare(queue: "hello",
                                 durable: false,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);
            ListenAdvice();
        }

        public void CheckText(string send)
        {

            caller = Clients.Caller;
            var body = Encoding.UTF8.GetBytes(send);
            _channel.BasicPublish(exchange: "give-me-advices",
                                 routingKey: "",
                                 basicProperties: null,
                                 body: body);

        }

        public void ListenAdvice()
        {
            _channel.QueueBind(queue: "hello",
                      exchange: "take-back-advices",
                      routingKey: "");

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += async (model, ea) =>
            {
                var body = ea.Body;
                var message = Encoding.UTF8.GetString(body);
                if(caller!=null)
                {
                    await caller.SendAsync("advicesReceived", message);
                }
               
            };
            _channel.BasicConsume(queue: "hello",
                                 autoAck: true,
                                 consumer: consumer);

        }
    }
}
