const db = firebase.firestore()
const auth = firebase.auth();

let unsubscribe
let Expenses = []
let Incomes = []
let Savings = []
let Data = [Expenses, Incomes, Savings]

// LOAD DATA
function getData() {
    unsubscribe = db
    .collection('Finances')
    .where('ownerId', '==', auth.currentUser.uid)
    .onSnapshot((snapshot) => {
        docsToData(snapshot.docs)
    })
}

function docsToData(docs) {
    docs.map((doc) => {
        if (doc.data().FinanceType === "Expense") {
            Expenses.push({
                ownerId: doc.data().ownerId,
                FinanceType: doc.data().FinanceType,
                Date: doc.data().Date,
                Type: doc.data().Type,
                Description: doc.data().Description,
                Amount: doc.data().Amount
        })
        }
        if (doc.data().FinanceType === "Income") {
            Incomes.push({
                ownerId: doc.data().ownerId,
                FinanceType: doc.data().FinanceType,
                Date: doc.data().Date,
                Type: doc.data().Type,
                Description: doc.data().Description,
                Amount: doc.data().Amount
        })
        }
        if (doc.data().FinanceType === "Saving") {
            Savings.push({
                ownerId: doc.data().ownerId,
                FinanceType: doc.data().FinanceType,
                Date: doc.data().Date,
                Type: doc.data().Type,
                Description: doc.data().Description,
                Amount: doc.data().Amount
        })
        }
    })
}
function ReturnExpenses() {return Expenses}
function ReturnIncomes() {return Incomes}
function ReturnSavings() {return Savings}

// ADD DATA DB 
function AddDataDB(DataFormDict) {
    db.collection('Finances').add(DataFormDict)
}

function GetAllTypes() {
    Types = []
    Amount = {}
    TypesAmount = []
    Data.forEach(data => {
        data.forEach(dict => {
            if (!Types.includes(dict.Type))
            {Types.push(dict.Type)}
        })
    })
    return Types
}

// Get Monthly Details
const listMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// Expenses:
function GetMonthlyDetailsE() {
    Monthly = []
    Data.forEach(data => {
        data.forEach(dict => {
            if (dict.FinanceType == 'Expense') {
                a = dict.Amount
                c = dict.FinanceType
                b = new Date(dict.Date).getMonth()+1
                Monthly.push({Month:b, amount:a, Financetype:c})}
            })
    })
    groups = []
    Monthly.reduce(function(r, o) {
        var key = o.Month;
        if(!groups[key]) {
            groups[key] = Object.assign({}, o);
            r.push(groups[key]);} 
        else {groups[key].amount += o.amount;}
        return r;
        }, []);
    return groups
}
function GetExpense() {
    let listAmount = []
    const expense = GetMonthlyDetailsE()
    let i = 0
    for (x in listMonth) {
        x = parseInt(x) + 1
        try { 
                listAmount.push(expense[x].amount)
            }
        catch {
            listAmount.push(0)}
        i++}
    return listAmount
    }

// Incomes:
function GetMonthlyDetailsI() {
    Monthly = []
    Data.forEach(data => {
        data.forEach(dict => {
            if (dict.FinanceType == 'Income') {
                a = dict.Amount
                c = dict.FinanceType
                b = new Date(dict.Date).getMonth()+1
                Monthly.push({Month:b, amount:a, Financetype:c})}
            })
    })
    groups = []
    Monthly.reduce(function(r, o) {
        var key = o.Month;
        if(!groups[key]) {
            groups[key] = Object.assign({}, o);
            r.push(groups[key]);} 
        else {groups[key].amount += o.amount;}
        return r;
        }, []);
    return groups
}
function GetIncomes() {
    let listAmount = []
    const income = GetMonthlyDetailsI()
    let i = 0
    for (x in listMonth) {
        x = parseInt(x) + 1
        try { 
                listAmount.push(income[x].amount)
            }
        catch {
            listAmount.push(0)}
        i++}
    return listAmount
    }

// Savings:
function GetMonthlyDetailsS() {
    Monthly = []
    Data.forEach(data => {
        data.forEach(dict => {
            if (dict.FinanceType == 'Saving') {
                a = dict.Amount
                c = dict.FinanceType
                b = new Date(dict.Date).getMonth()+1
                Monthly.push({Month:b, amount:a, Financetype:c})}
            })
    })
    groups = []
    Monthly.reduce(function(r, o) {
        var key = o.Month;
        if(!groups[key]) {
            groups[key] = Object.assign({}, o);
            r.push(groups[key]);} 
        else {groups[key].amount += o.amount;}
        return r;
        }, []);
    return groups
}
function GetSavings() {
    let listAmount = []
    const saving = GetMonthlyDetailsS()
    let i = 0
    for (x in listMonth) {
        x = parseInt(x) + 1
        try { 
                listAmount.push(saving[x].amount)
            }
        catch {
            listAmount.push(0)}
        i++}
    return listAmount
    }

// GET EXPENSE DETAILS

function GetResult() {
    Monthly = []
    Expenses.forEach(expense => {
        a = expense.Amount
        c = expense.Type
        b = new Date(expense.Date).getMonth()+1
        Monthly.push({Month:b, amount:a, Type:c})
    })
    Result = Monthly.reduce(function(r,a) {
        r[a.Type] = r[a.Type] || []
        r[a.Type].push(a)
        return r
    }, Object.create(null))
    return Result
}

function GetTypes() {
    Result = GetResult()
    Types = []
    for (x in Result) {
        Types.push(x);}
    return Types
}

function GetAmounts() {
    Result = GetResult()
    Amounts = []
    for (x in Result) {
        Bella = []
        Result[x].reduce(function(r, o) {
            var key = o.Month;
            if(!Bella[key]) {
                Bella[key] = Object.assign({}, o);
                r.push(Bella[key]);} 
            else {Bella[key].amount += o.amount;}
            return r;
            }, []);
        Amounts.push(Bella);
    }
    return Amounts
}

function FinalExpenseDetailsAmount() {
    let Amounts = GetAmounts()
    let FinalsExpensesAmounts = []
    Amounts.forEach(expensegroup => {
        let item = []
        let i = 0
        for (x in listMonth) {
            x = parseInt(x) + 1
            try { 
                item.push(expensegroup[x].amount)
                }
            catch {
                item.push(0)}
            i++}
        FinalsExpensesAmounts.push(item)
        })
    return FinalsExpensesAmounts;
}

function LoadAll() {
    getData()
    setTimeout(() => {
        GetExpense()
        GetIncomes()
        GetSavings()
        FinalExpenseDetailsAmount()
    }, 1000)
    setTimeout(() => {
        displayWelcomeDiv()
        LoadCharts()
    }, 2000)
}