import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const baseUrl = 'https://api-v2.intrinio.com/securities/'
const suffixUrl = '/prices?api_key=OjhmMTNmYmQ5NDBmODJhM2Y2YjFjMDY4MTY3MGViMzk3'

// const randomData = (length, max) => Array(length).fill().map(() => Math.round(Math.random() * max))


const Graph = () => {
    
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
        const arr = stockData.map(el => seriesOptions.push({ name: el.security.ticker,
            data: el.stock_prices.map(el => el.close)}))
        
        console.log("arr", arr)
    }

    useEffect(() => {
        handleData()
    }, [])

    const options = {
        chart: {
            type: 'line'
        },
        title: {
            text: 'CCE Project'
        },
        series: seriesOptions || null
    };

    stockData.length >= names.length && setGraph()
    stockData.length >= names.length && console.log(stockData)
    
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