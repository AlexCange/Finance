function ToggleDisplayDiv(targetDiv) {
    var x = targetDiv
    if (x.style.display === "none") {
        x.style.display = "block";
    } 
    else {
        x.style.display = "none";
    }
}

const MenuBtn = document.getElementById('MenuBtn')
const MenuUL = document.getElementById('MenuUL')
const MenuAddUL = document.getElementById('MenuAddUL')
const MenuAddBtn = document.getElementById('MenuAddBtn')

// BALANCE DIV
const WelcomeDiv = document.getElementById('WelcomeDiv')
const WelcomeSavings = document.getElementById('WelcomeSavings')
const displayWelcomeDiv = () => {
    let SavingsTotal = 0
    Savings.forEach(saving => {SavingsTotal += saving.Amount})

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const d = new Date();
    let month = d.getMonth();

    const AmountE = GetExpense()
    const AmountI = GetIncomes()
    const AmountS = GetSavings()

    let BalanceMonth = parseFloat(AmountI[month] - AmountE[month]).toFixed(2)
    let h1Welcome = document.createElement('h1')
    h1Welcome.innerHTML = `Your Balance for ${monthNames[month]}:<br> ${BalanceMonth}€`
    WelcomeDiv.appendChild(h1Welcome)
    WelcomeDiv.appendChild(document.createElement('hr'))
    let H1Saves = document.createElement('h1')
    H1Saves.innerHTML = `Your Savings of the month : ${AmountS[month]}€ <br> Your Savings in total: ${SavingsTotal}€`
    WelcomeSavings.appendChild(document.createElement('hr'))
    WelcomeSavings.appendChild(H1Saves)
}

setTimeout(() => {
    displayWelcomeDiv()
},1000)

const SummaryDiv = document.getElementById('Summary')
const BalanceDiv = document.getElementById('BalanceDiv')

//SHOW DIVS
function SummaryLoadPage() {
    SummaryDiv.style.display = 'block'
    BalanceDiv.style.display = 'none'
    MenuUL.style.display = 'none'
    MenuAddUL.style.display = 'none'
    AddExpenseDiv.style.display = "none"
    AddIncomeDiv.style.display = 'none'
    AddSavingDiv.style.display = 'none'
    History.style.display = 'none'
}

const History = document.getElementById('History')

function HistoryLoadPage() {
    History.style.display = 'block'
    DisplayHistoryTables()
    SummaryDiv.style.display = 'none'
    BalanceDiv.style.display = 'none'
    MenuUL.style.display = 'none'
    MenuAddUL.style.display = 'none'
    AddExpenseDiv.style.display = "none"
    AddIncomeDiv.style.display = 'none'
    AddSavingDiv.style.display = 'none'
}

const AddExpenseDiv = document.getElementById('AddExpenseDiv')
function AddExpenseLoadPage() {
    AddExpenseDiv.style.display = "block"
    SummaryDiv.style.display = 'none'
    BalanceDiv.style.display = 'none'
    MenuUL.style.display = 'none'
    MenuAddUL.style.display = 'none'
    AddIncomeDiv.style.display = 'none'
    AddSavingDiv.style.display = 'none'
    History.style.display = 'none'
}

const AddIncomeDiv = document.getElementById('AddIncomeDiv')
function AddIcomeLoadPage() {
    AddExpenseDiv.style.display = "none"
    SummaryDiv.style.display = 'none'
    BalanceDiv.style.display = 'none'
    MenuUL.style.display = 'none'
    MenuAddUL.style.display = 'none'
    AddIncomeDiv.style.display = 'block'
    AddSavingDiv.style.display = 'none'
    History.style.display = 'none'
}

const AddSavingDiv = document.getElementById('AddSavingDiv')
function AddSavingLoadPage() {
    AddExpenseDiv.style.display = "none"
    SummaryDiv.style.display = 'none'
    BalanceDiv.style.display = 'none'
    MenuUL.style.display = 'none'
    MenuAddUL.style.display = 'none'
    AddIncomeDiv.style.display = 'none'
    AddSavingDiv.style.display = 'block'
    History.style.display = 'none'
}

function HomeLoadPage() { window.location.reload()}
function BackBtn() {
    BalanceDiv.style.display = 'block'
    AddExpenseDiv.style.display = "none"
    SummaryDiv.style.display = 'none'
    MenuUL.style.display = 'none'
    MenuAddUL.style.display = 'none'
    AddIncomeDiv.style.display = 'none'
    AddSavingDiv.style.display = 'none'
    History.style.display = 'none'
}

//GET INPUTS
const EForm = document.getElementById('EForm')
const AddExpenseBtn = document.getElementById('AddExpenseBtn')

AddExpenseBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let EDate = document.getElementById('DateE').value
    let EType = document.getElementById('TypeE').value
    let EDescription = document.getElementById('EDescription').value
    let EAmount = parseFloat(document.getElementById('EAmount').value)
    let EFinancialType = 'Expense'
    let DataFormDict = {
        FinanceType: EFinancialType,
        Date: EDate,
        Type: EType,
        Amount: parseFloat(EAmount),
        Description: EDescription
        }
    AddDataDB(DataFormDict)
    setTimeout(() => {
        HomeLoadPage()
        EForm.reset()
    },1000)
})

const IForm = document.getElementById('IForm')
const AddIncomeBtn = document.getElementById('AddIncomeBtn')

AddIncomeBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let IDate = document.getElementById('DateI').value
    let IType = document.getElementById('TypeI').value
    let IDescription = document.getElementById('IDescription').value
    let IAmount = parseFloat(document.getElementById('IAmount').value)
    let IFinancialType = 'Income'
    let DataFormDict = {
        FinanceType: IFinancialType,
        Date: IDate,
        Type: IType,
        Amount: parseFloat(IAmount),
        Description: IDescription
        }
    AddDataDB(DataFormDict)
    setTimeout(() => {
        HomeLoadPage()
        IForm.reset()
    },1000)
})

const SForm = document.getElementById('SForm')
const AddSavingBtn = document.getElementById('AddSavingBtn')

AddSavingBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let SDate = document.getElementById('DateS').value
    let SAmount = parseFloat(document.getElementById('SAmount').value)
    let SFinancialType = 'Saving'
    let DataFormDict = {
        FinanceType: SFinancialType,
        Date: SDate,
        Type: 'Saving',
        Amount: parseFloat(SAmount),
        Description: 'None'
        }
    AddDataDB(DataFormDict)

    let ResultCB = document.querySelector('input[name="SExpenseCB"]:checked').value;
    if (ResultCB === 'Yes') {
        let TransferExpense = {
        FinanceType: 'Expense',
        Date: SDate,
        Type: 'TransferSaving',
        Amount: parseFloat(SAmount),
        Description: 'Transfer'
        }
        AddDataDB(TransferExpense)
    }
    
    setTimeout(() => {
        HomeLoadPage()
        SForm.reset()
    },1000)
})


// HISTORY TABLES

function DisplayHistoryTables(month) {
    let TableELabel = document.createElement('h2')
    TableELabel.textContent = 'Expenses'
    let TableE = document.createElement('table')
    TableE.setAttribute('id', 'TableE')
    Expenses.forEach(expense => {
        let ERow = document.createElement('tr')
        let EDate = document.createElement('td')
        let EType = document.createElement('td')
        let EAmount = document.createElement('td')

        EDate.textContent = `${expense.Date.substr(8,2)}/${expense.Date.substr(5,2)}`
        EType.textContent = `${expense.Type}`
        EAmount.textContent = `${expense.Amount}€`
        ERow.appendChild(EDate)
        ERow.appendChild(EType)
        ERow.appendChild(EAmount)
        TableE.appendChild(ERow)
    })

    let TableILabel = document.createElement('h2')
    TableILabel.textContent = 'Incomes'
    let TableI = document.createElement('table')
    TableI.setAttribute('id', 'TableI')

    Incomes.forEach(income => {
        let IRow = document.createElement('tr')
        let IDate = document.createElement('td')
        let IType = document.createElement('td')
        let IAmount = document.createElement('td')

        IDate.textContent = `${income.Date.substr(8,2)}/${income.Date.substr(5,2)}`
        IType.textContent = `${income.Type}`
        IAmount.textContent = `${income.Amount}€`
        IRow.appendChild(IDate)
        IRow.appendChild(IType)
        IRow.appendChild(IAmount)
        TableI.appendChild(IRow)
    })

    let TableSLabel = document.createElement('h2')
    TableSLabel.textContent = 'Savings'
    let TableS = document.createElement('table')
    TableS.setAttribute('id', 'TableS')
    Savings.forEach(saving => {
        let SRow = document.createElement('tr')
        let SDate = document.createElement('td')
        let SType = document.createElement('td')
        let SAmount = document.createElement('td')

        SDate.textContent = `${saving.Date.substr(8,2)}/${saving.Date.substr(5,2)}`
        SType.textContent = `${saving.Type}`
        SAmount.textContent = `${saving.Amount}€`
        SRow.appendChild(SDate)
        SRow.appendChild(SType)
        SRow.appendChild(SAmount)
        TableS.appendChild(SRow)
    })
    History.appendChild(TableELabel)

    let inputE = document.createElement('input')
    inputE.setAttribute('id','InputE')
    inputE.setAttribute('type', 'text')
    inputE.setAttribute('onkeyup', 'myFunctionE()')
    inputE.setAttribute('placeholder', 'Search Type...')
    History.appendChild(inputE)
    History.appendChild(TableE)
    History.appendChild(document.createElement('hr'))


    History.appendChild(TableILabel)
    let inputI = document.createElement('input')
    inputI.setAttribute('id','InputI')
    inputI.setAttribute('type', 'text')
    inputI.setAttribute('onkeyup', 'myFunctionI()')
    inputI.setAttribute('placeholder', 'Search Type...')
    History.appendChild(inputI)
    History.appendChild(TableI)
    History.appendChild(document.createElement('hr'))


    History.appendChild(TableSLabel)
    History.appendChild(TableS)
}

function myFunctionE() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("InputE");
    filter = input.value.toUpperCase();
    table = document.getElementById("TableE");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            } else {
            tr[i].style.display = "none";
            }
        }       
        }
    }

function myFunctionI() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("InputI");
    filter = input.value.toUpperCase();
    table = document.getElementById("TableI");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            } else {
            tr[i].style.display = "none";
            }
        }       
        }
    }

let MonthlyLineSelect = document.getElementById('MonthlyLineSelect')
function MonthlyTableEInput() {
    var input, filter, table, tr, td, i, txtValue;
    input = MonthlyLineSelect.value;
    table = document.getElementById("TableE");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = (td.textContent).slice(-2) || (td.innerText).slice(-2);
            if (txtValue.toUpperCase().indexOf(input) > -1) {
            tr[i].style.display = "";
            } else {
            tr[i].style.display = "none";
            }
        }       
        }
}
function MonthlyTableIInput() {
    var input, table, tr, td, i, txtValue;
    input = MonthlyLineSelect.value;
    table = document.getElementById("TableI");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = (td.textContent).slice(-2) || (td.innerText).slice(-2);
            if (txtValue.toUpperCase().indexOf(input) > -1) {
            tr[i].style.display = "";
            } else {
            tr[i].style.display = "none";
            }
        }       
        }
}
function MonthlyTableSInput() {
    var input, table, tr, td, i, txtValue;
    input = MonthlyLineSelect.value;
    table = document.getElementById("TableS");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = (td.textContent).slice(-2) || (td.innerText).slice(-2);
            if (txtValue.toUpperCase().indexOf(input) > -1) {
            tr[i].style.display = "";
            } else {
            tr[i].style.display = "none";
            }
        }       
        }
}

MonthlyLineSelect.onchange = () => {
    MonthlyTableSInput()
    MonthlyTableIInput()
    MonthlyTableEInput()
}