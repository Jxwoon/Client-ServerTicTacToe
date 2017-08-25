using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebSocketManager;

namespace MultiTicTacToe 
{
    public class TicTacToeHandler : WebSocketHandler
    {
        public TicTacToeHandler(WebSocketConnectionManager webSocketConnectionManager) : base(webSocketConnectionManager)
        {
           
        }
        public async Task EnterUsername(string socketId, string message)
        {
            await InvokeClientMethodToAllAsync("Username", socketId, message);
        }
        public async Task PlayingGame(string socketId, string square)
        {
            await InvokeClientMethodToAllAsync("Game", socketId, square);
        }
    }
}
