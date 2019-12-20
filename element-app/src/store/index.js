import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs'

Vue.use(Vuex)

const type = {
  SET_AUTH : "SET_AUTH",
  SET_USER : "SET_USER",
  EDIT_USER: "EDIT_USER"
}

const state = {
  is_Auth : false,
  targetUser:{},
  user:{}
}

const getters = {
  isAuth : state => state.isAuth,
  targetUser: state=> state.targetUser,
  user : state =>state.user
}

const mutations = {
  [type.SET_AUTH](state,auth){
    if(auth){
      state.isAuth = auth
    } else{
      state.isAuth = false
    }
  },

  [type.SET_USER](state,user){
    if(user){
      state.user = user
    }else{
      state.user = {} 
    }
  },

  [type.EDIT_USER](state,targetUser){
    if(targetUser){
      state.targetUser = targetUser
    }else{
      state.targetUser = {} 
    }
  }
}

const actions = {
  setAuth:({commit},auth)=>{
    commit(type.SET_AUTH,auth)
  },

  setUser:({commit},user)=>{
    commit(type.SET_USER,user)
  },

  editUser:({commit},targetUser)=>{
    commit(type.EDIT_USER,targetUser)
  },
  
  clearCurrentInfo:({commit}) =>{
    commit(type.SET_USER,null),
    commit(type.SET_AUTH,false)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
