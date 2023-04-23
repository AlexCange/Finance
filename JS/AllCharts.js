function LoadDataForCharts() {
    // Get Data
    const Expenses = ReturnExpenses()
    const Incomes = ReturnIncomes()
    const Savings = ReturnSavings()

    //Get Totals
    let ExpensesTotal = 0
    Expenses.forEach(expense => {ExpensesTotal += parseFloat(expense.Amount).toFixed(2)})
    let IncomesTotal = 0
    Incomes.forEach(income => {IncomesTotal += parseFloat(income.Amount).toFixed(2)})
}

// ---------------- CREATE BALANCE -------------------

Chart.register(ChartDataLabels);

const ChartBalanceAll = document.getElementById('ChartBalanceAll').getContext("2d")
function BalanceChart() {//Balance Chart
    const AmountE = GetExpense()
    const AmountI = GetIncomes()
    const d = new Date().getMonth();
    
    new Chart(ChartBalanceAll, {
    type: 'pie', 
    data: {
        labels: ['Expenses', 'Incomes'],
        datasets: [{
            data:[parseFloat(AmountE[d]).toFixed(2), parseFloat(AmountI[d]).toFixed(2)],
            borderColor: '#ECDBAD', 
            backgroundColor: ['#BD8B5F', '#43705F']
        }]
    },
    options: {
        aspectRatio: 2,
        plugins: {
            title: {
                display: true,
                text: "BALANCE",
                color: '#C15143',
                padding: {top: 0, bottom: 10},
                font: {
                    family: 'Raleway',
                    size: 20,
                    weight: 100
                    }
            },
            legend: {
                display: true,
                labels: {
                    color: '#C15143',
                    font: {
                        family: 'Raleway',
                        size: 13,
                        weight: 100
                    }, 
                    padding: 15,
                    usePointStyle: true,
                    pointStyle: 'circle' 
                },
                position: 'bottom',
                color: '#C15143'
            },
            datalabels: {
                display: true,
                color: 'white',
                font: {
                    family: 'Raleway',
                    size: 10,
                    weight: 100
                }
            }
        },
        
        responsive: true,
    }
})}

const ChartBalancDetails = document.getElementById('ChartBalancDetails').getContext("2d")
function DetailedMonthlyChart() {
    d = new Date().getMonth() + 1
    ListDict = []
    Expenses.forEach(expense => {
        if (expense.Date.substr(5,2) == d) {
            Dict = {}
            Dict.Type = expense.Type
            Dict.Amount = expense.Amount
            ListDict.push(Dict)
        }
    })    
    let Datas = []
    ListDict.reduce(function(r, o) {
        var key = o.Type;
        if(!Datas[key]) {
            Datas[key] = Object.assign({}, o);
            r.push(Datas[key]);} 
        else {Datas[key].Amount += o.Amount;}
        return r;
        }, []);
    Labels = []
    ChartData = []
    for (x in Datas) {Labels.push(x); ChartData.push(Datas[x].Amount)}
    new Chart(ChartBalancDetails, {
        type: 'bar', 
        data: {
            labels: Labels,
            datasets: [{
                data: ChartData,
                borderColor: '#ECDBAD', 
                borderRadius: 100,
                backgroundColor: ['#BD8B5F','#FCB97D','#DAC898','#C6B89E','#AABA9E', '#BD8B5F','#FCB97D','#DAC898','#C6B89E','#AABA9E','#BD8B5F','#FCB97D','#DAC898','#C6B89E','#AABA9E']
            }]
            },
        options: {
            interaction: {
                intersect: false,
            },
            plugins: {
                legend: {display:false}, 
                datalabels: {
                    display:true, 
                    color: 'black',
                    font: {
                        family: 'Raleway',
                        size: 10,
                        weight: 100
                    }
                }
            },
            scales: {
                x: {
                    grid: {display:false},
                    ticks:{
                        color: 'black',
                        font:{
                            family:'Raleway',
                            weight:100,
                        }}
                },
                y: {
                    ticks:{
                        color: 'black',
                        font:{
                            family:'Raleway',
                            weight: 100,
                        }
                    }
                }
            }
        }
    })
}

// ------------------ DETAILS MONTHLY SUMMARY ---------------------

let MonthlyLineChart = document.getElementById('MonthlyLineChart')
const Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


function MonthlyChart() {// Get Monthly Chart
    const listAmountE = GetExpense()
    const listAmountI = GetIncomes()
    const listAmountS = GetSavings()
    new Chart(MonthlyLineChart.getContext("2d"), {
    type: 'line', 
    data: {
        labels: Month,
        datasets: [{
            label:'Expenses',
            data: listAmountE, 
            borderColor: '#BD8B5F',
            backgroundColor: '#BD8B5F',
            fill: false,
            pointStyle: 'circle',
            pointRadius: 2,
            cubicInterpolationMode: 'monotone',
            yAxisID: 'y'
        }, {
            label:'Incomes',
            data: listAmountI, 
            borderColor: '#43705F',
            backgroundColor: '#43705F',
            fill: false,
            pointStyle: 'circle',
            pointRadius: 2,
            cubicInterpolationMode: 'monotone',
            yAxisID: 'y'
        }, {
            label:'Savings',
            data: listAmountS, 
            borderColor: '#435070',
            backgroundColor: '#435070',
            fill: false,
            pointStyle: 'circle',
            pointRadius: 2,
            cubicInterpolationMode: 'monotone',
            yAxisID: 'y1'
        }]
    }, 
    options: {
        interaction: {
            intersect: false,
        },
        plugins: {
            legend: {
                display:true,
                labels: {
                    color: 'black',
                    font:{
                        family:'Raleway',
                        weight: 100,
                    },
                    usePointStyle: true,
                    pointStyle: 'circle' 
                },
                position: 'bottom'
            }, 
            datalabels: {display:false}
        },
        scales: {
            x: {
                grid: {display:false},
                ticks:{
                    color: 'black',
                    font:{
                        family:'Raleway',
                        weight:100,
                    }}
            },
            y: {
                ticks:{
                    color: 'black',
                    font:{
                        family:'Raleway',
                        weight: 100,
                    }
                }
            },
            y1: {
                position:'right',
                ticks:{
                    color: 'black',
                    font:{
                        family:'Raleway',
                        weight: 100,
                    }
                }
            }
        }
    }
})
}



// --------MONTHLY DETAILS EXPENSES-------------

const MonthlyLineDetails = document.getElementById('MonthlyLineDetails')
const Palette = ['#000F08','#F4FFF8','#8BAAAD','#C0D5D3','#B7CFB8','#0E2320','#354040','#1C3738', '#4D4847', '#414444','#9BA29E','#A6BCA7','#97AB98','#899B8A' ]
function DetailedExpensesChart() {
    const TypesDetails = GetTypes()
    const AmountDetails = FinalExpenseDetailsAmount()
    datasets = []
    for (let i=0; i < TypesDetails.length; i++) {
        dataDict = {}
        dataDict.label = TypesDetails[i]
        dataDict.data = AmountDetails[i]
        dataDict.borderColor = Palette[i]
        dataDict.backgroundColor = Palette[i]
        dataDict.cubicInterpolationMode = 'monotone'
        datasets.push(dataDict)
    }

    new Chart(MonthlyLineDetails.getContext("2d"), {
        type: 'line', 
        data: {
            labels: Month, 
            datasets: datasets
        },
        options: {
            interaction: {
                intersect: false,
            },
            plugins: {
                legend: {
                    display:true,
                    labels: {
                        color: 'black',
                        font:{
                            family:'Raleway',
                            weight: 100,
                            textAlign: 'left',
                        },
                        usePointStyle: true,
                        pointStyle: 'circle' 

                    },
                    position: 'bottom'
                }, 
                datalabels: {display:false}
            },
            scales: {
                x: {
                    grid: {display:false},
                    ticks:{
                        color: 'black',
                        font:{
                            family:'Raleway',
                            weight:100,
                        }}
                },
                y: {
                    ticks:{
                        color: 'black',
                        font:{
                            family:'Raleway',
                            weight: 100,
                        }
                    }
                }
            }
        }
    })
}


function LoadCharts() {
    LoadDataForCharts()
    setTimeout(() => {
        BalanceChart()
        DetailedMonthlyChart()
        DetailedExpensesChart()
        MonthlyChart()
    }, 2000)
}