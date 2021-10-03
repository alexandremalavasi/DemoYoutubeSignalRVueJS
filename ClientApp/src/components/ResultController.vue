<template>
    <h1>Result Controller</h1>
    <div class="row" v-for="(state, index) in states" :key="state">
        <div class="col-2">
            <span style="font-weight:bold; font-size:30px">
                {{state}}
            </span>
        </div>
        <div class="col-4">
            <input type="range" min="0" max="300" v-model="results[index]" @input="syncValue(index)" />
            <label style="padding-left:50px;font-weight:bold;">
            {{ results[index]}}
            </label>
        </div>
    </div>
   
</template>
<script>

    import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'

    export default {
        name: "ResultController",
        data() {
            return {
                states: [],
                results: [],
                signalRConnection: null

            }
        },
        methods: {
            configureSignalR() {
                this.signalRConnection = new HubConnectionBuilder()
                    .withUrl("http://localhost:50598/stateResultsHub")
                    .configureLogging(LogLevel.Information)
                    .build();

                this.signalRConnection.start().then(() => {

                    console.log('Connection started');
                });
            },

            syncValue(index) {
                this.results[index] = parseInt(this.results[index]);
                this.signalRConnection.invoke('SendMessage', this.states, this.results)
                    .catch(function (err) {
                        return console.error(err.toString());
                    });

                    
            }
        },

        mounted() {
            this.states = ['SP', 'RJ', 'SC', 'MT', 'PA', 'AM', 'BA', 'PI', 'PB'];
            this.results = [150, 150, 150, 150, 150, 150, 150, 150, 150];

            this.configureSignalR();
        }
    }
</script>