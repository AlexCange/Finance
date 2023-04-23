const LogInPage = document.getElementById('LogInPage')
const LogRegForm = document.getElementById('LogRegForm')
const Email = document.getElementById('Email')
const Password = document.getElementById('Password')
const LogInBtn = document.getElementById('LogInBtn')
const RegisterBtn = document.getElementById('RegisterBtn')
const ErrorMsg = document.getElementById('ErrorMsg')
const Header = document.querySelector('header')
const Main = document.querySelector('main')

const Loading = document.getElementById('Loading')

setTimeout(() => {
    if (auth.currentUser) {
        LogInPage.style.display = 'none'
        Loading.style.display = "flex"
        setTimeout(() => {
            Loading.style.display = "none"
            Header.style.display = 'block'
            Main.style.display = 'block'
        }, 4000)
        LoadAll()
    }
    if (!auth.currentUser) {
        Loading.style.display = "none"
        LogInPage.style.display = 'block'
    }
},1000)

LogInBtn.addEventListener('click', (e) => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(Email.value, Password.value).then(() => {
        setTimeout(() => {
        LogInPage.style.display = 'none'
        Loading.style.display = "flex"
        setTimeout(() => {
            Loading.style.display = "none"
            Header.style.display = 'block'
            Main.style.display = 'block'
        }, 4000)
        LoadAll()
    }, 2000)
    }).catch((error) => {
        ErrorMsg.innerText = error.message
        ErrorMsg.style.display = 'block'
        setTimeout(() => {
            ErrorMsg.style.display = 'none'
        }, 5000)
    })
})

RegisterBtn.addEventListener('click', (e) => {
    e.preventDefault()
    auth.createUserWithEmailAndPassword(Email.value, Password.value).then(() => {
        setTimeout(() => {
        LogInPage.style.display = 'none'
        Loading.style.display = "flex"
        setTimeout(() => {
            Loading.style.display = "none"
            Header.style.display = 'block'
            Main.style.display = 'block'
        }, 4000)
        LoadAll()
    }, 2000)
    }).catch((error) => {
        ErrorMsg.innerText = error.message
        ErrorMsg.style.display = 'block'
        setTimeout(() => {
            ErrorMsg.style.display = 'none'
        }, 5000)
    })
})

function LogOut() {
    auth.signOut()
    window.location.reload()
}