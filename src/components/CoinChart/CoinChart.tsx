import ReactApexChart from 'react-apexcharts'


export default ({ prices, dates }: { prices: number[], dates: number[] }) => {
    const options = {
        series: [{
            name: "Bitcoin",
            data: prices
        }],
        options: {
            chart: {
                type: 'area',
                height: 350,
                zoom: {
                    enabled: false
                },
            },
            stroke: {
                show: true,
                curve: 'straight',
                lineCap: 'butt',
                colors: undefined,
                width: 10,
                dashArray: 1,
            },
            dataLabels: {
                enabled: true
            },
            title: {
                text: 'Bitcoin',
                align: 'left'
            },
            subtitle: {
                text: 'Price Movements',
                align: 'left'
            },
            labels: dates,
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                opposite: true
            },
            legend: {
                horizontalAlign: 'left'
            },
        },
    }

    return <>
        <div id="chart">
            <div id="chart-timeline">
                <ReactApexChart options={options} series={options.series} type="line" height={400} width={1200}/>
            </div>
        </div>
    </>
}







