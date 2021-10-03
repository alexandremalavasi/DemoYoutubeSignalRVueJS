<template>
    <h1>Chart</h1>
    <div class="row">
        <div class="col-9">
            <div id="chart" class="chart" ref="chart"></div>
        </div>
        <div class="col-2">
            <div class="row" v-if="statesAlert.length">
                <div class="col-12" v-for="state in statesAlert" :key="state.initials">
                    <div style="width:100%; padding:50px; background-color:red;">
                        <span style="font-weight:bold; color:white; font-size:20px;">
                            {{state.initials}}
                        </span>
                        <br />
                        <span style="font-weight:bold; color:white; font-size:20px;">
                            ({{state.result}})
                        </span>
                    </div>
                </div>
                <br /><br />
            </div>
        </div>
    </div>
    
</template>

<style scoped>
    .chart{
        max-width:70%;
        margin:9px auto;
    }
</style>
<script>

    import ApexCharts from 'apexcharts'
    import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'

    export default {
        name: "Counter",
        data() {
            return {
                signalRConnection: null,
                chart: null,
                states: [],
                results: [],
                statesAlert: []

            }
        },
        methods: {
            incrementCounter() {
                this.currentCount++;
            },

            renderChart() {
                var options = {
                    chart: {
                        type: 'bar'
                    },
                    series: [{
                        name: 'sales',
                        data: this.results
                    }],
                    xaxis: {
                        categories: this.states
                    }
                };

                if (this.chart != null) {
                    this.chart.destroy();
                }

                this.chart = new ApexCharts(this.$refs.chart, options);
                this.chart.render();

                this.populateStates();
            },

            populateStates() {
                this.statesAlert = [];

                for (var i = 0; i < this.states.length; i++) {
                    if (this.results[i] < 150) {
                        this.statesAlert.push({ initials: this.states[i], result: this.results[i] });
                    }
                }
            },

            configureSignalR() {
                this.signalRConnection = new HubConnectionBuilder()
                    .withUrl("http://localhost:50598/stateResultsHub")
                    .configureLogging(LogLevel.Information)
                    .build();

                this.signalRConnection.start().then(() => {

                    console.log('Connection started');
                    var ref = this;

                    this.signalRConnection.on("ReceiveMessage", function (states, results) {
                        console.log('ReceiveMessage');
                        ref.states = states;
                        ref.results = results;

                        ref.renderChart();
                    });
                });
            },
        },
        mounted() {
            this.states = ['SP', 'RJ', 'SC', 'MT', 'PA', 'AM', 'BA', 'PI', 'PB'];
            this.results = [150, 150, 30, 150, 150, 150, 150, 150, 150];
            this.renderChart();

            this.configureSignalR();
        }
    }
</script>