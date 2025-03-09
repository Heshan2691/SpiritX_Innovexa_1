// Services/MongoService.cs
using MongoDB.Driver;
using BEnd.Models;
using System.Linq;

namespace BEnd.Services
{
    public class MongoService
    {
        private readonly IMongoCollection<User> _usersCollection;


        public MongoService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("MongoDb"));
            var database = client.GetDatabase("AuthDb");
            _usersCollection = database.GetCollection<User>("Users");
        }

        public User GetUserByUsername(string username) =>
            _usersCollection.Find(user => user.Username == username).FirstOrDefault();

        public void CreateUser(User user) =>
            _usersCollection.InsertOne(user);


    }
}