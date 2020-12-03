import router from '../../router'

const state = {
    token: localStorage.getItem('access_token') || null,
    username: localStorage.getItem('username') || null,
    picture: localStorage.getItem('picture') || null,
    admin: localStorage.getItem('admin') || null,
    errs: {},
}
const getters ={
    loggedIn(state){
        return state.token != undefined
    },
    Token(state){
        return state.token
    },
    Isadmin(state){
        return state.admin === true
    },
    picture(state){
        return state.picture
    },
    username: (state)=> state.username,
} 
const actions ={ 
        
}
const mutations = {
    
    usernewdata: (state, data) => {
        state.info.unshift(data),
        router.push('/login');
    },
    userlogin: (state, data) => { 
        (state.token = data.Token),
        (state.username = data.uname),
        (state.picture = data.picture),
        (state.admin = data.admin)
        // router.push('/dashboard');
    }, 
    logout: (state)=> { 
        (state.token = null),
        (state.username = null),
        (state.picture = null),
        (state.admin = null),
        router.replace('/');
    },
    setError: (state, errs)=> {
        (state.errs = errs),
        (state.snackbar = true)
    },
}

export default{
    state,
    getters,
    actions,
    mutations
}