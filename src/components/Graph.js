import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const baseUrl = 'https://api-v2.intrinio.com/securities/'
const suffixUrl = '/prices?api_key=OjhmMTNmYmQ5NDBmODJhM2Y2YjFjMDY4MTY3MGViMzk3'


const Graph = () => {
    
    // const randomData = (length, max) => Array(length).fill().map(() => Math.round(Math.random() * max))
    // const randomDataOptions = [
    //     {
    //         name: 'sample data 1',
    //         data: randomData(50, 100),
    //         color: 'blue',
    //     },
    //     {
    //         name: 'sample data 2',
    //         data: randomData(50, 100),
    //         color: 'red',
    //     },
    //     {
    //         name: 'sample data 3',
    //         data: randomData(50, 100),
    //         color: 'green',
    //     },
    // ]

    const seriesOptions = [] 
    const xAxisOptions = []
    const names = ['MSFT', 'AAPL', "XOM", "CVX"]
    
    const [ stockData, setStockData ] = useState([])
    
    const getData = async (ticker) => {
        return await fetch(baseUrl + ticker + suffixUrl)
            .then(resp => resp.json())
            .then(data => setStockData(stockData => stockData.concat(data)))
    }

    const handleData = () => {
        names.forEach(name => getData(name))
    }
    
    const setGraph = () => {
        
        stockData.map(el => seriesOptions.push({ name: el.security.ticker, data: el.stock_prices.map(el => el.close).reverse() }))
        stockData[0].stock_prices.reverse().map(el => xAxisOptions.push(el.date))
    }

    useEffect(() => {
        handleData()
    }, [])

    // Graph config options
    const options = {
        chart: {
            type: 'line',
            backgroundColor: 'black',
            plotBorderColor: 'white',
        },
        title: {
            text: 'CCE Project',
            style: {
                color: 'white',
                textTransform: 'uppercase',
                fontSize: '20px'
            },
        },
        subtitle: {
            style: {
                color: 'white'
            }
        },
        xAxis: {
            type: 'datetime',
            categories: xAxisOptions || null,
            tickColor: 'white',
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
        },
        yAxis: {
            labels: {
                style: {
                    color: '#E0E0E3'
                },
                formatter: function () {
                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                }
            },
            tickColor: 'white',
            gridLineColor: '#707073',
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
                title: {
                    style: {
                        color: 'white'
                    }
                }
        },
        series: seriesOptions || null,
        plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true
            }
        },
    }

    stockData.length >= names.length && setGraph()
    
    return(
        <div>
            <HighchartsReact 
                highcharts={Highcharts} 
                options={options}
                constructorType={'stockChart'}
            />
        </div>
    )
}

export default Graph