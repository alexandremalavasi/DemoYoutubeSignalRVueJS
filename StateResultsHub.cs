using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace DemoYoutubeSignalRVueJS
{
    public class StateResultsHub : Hub
    {
        public async Task SendMessage(string[] states, int[] results)
        {
            await Clients.All.SendAsync("ReceiveMessage", states, results);
        }
    }
}
