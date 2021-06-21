import axios from './../axios-auth'
import globalAxios from 'axios'
import * as firebase from 'firebase'
import router from '../router.js'
export const resetPassword = ({commit}, payload) => {
  firebase.auth().sendPasswordResetEmail(payload).then(function() {
    commit('resetSuccess')
  }).catch(function(error) {
    commit('resetError', error)
  })
}
export const clearError = ({commit}) => {
  commit('clearError')
}
export const getUser = ({commit, state}, payload) =>{
  if (!state.idToken) {
    return
  }
  globalAxios.get('/users.json' + '?auth=' + state.idToken)
  .then(res => {
    const data = res.data
    const users =[]
    for (let key in data) {
    const user = data[key]
      user.id = key
      users.push(user)
    }
    const user = users.find((user) => {
      return user.email === payload.email
    })
    // commit('getUsers', users)
    commit('getUser', user)
  })
  .catch(error => console.log(error))
}
export const signup = ({commit, dispatch}, signupData) => {
  commit('clearError')
    axios.post('/signupNewUser?key=AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x_4', {
      email: signupData.email,
      password: signupData.password,
      returnSecureToken: true
    })
      .then(user => {
        commit('authUser', {
          token: user.data.idToken,
          userId: user.data.localId
        })
        const now = Math.floor(Date.now())
        const expirationDate = now + (1000 * 3600 * 24 * 30)
        localStorage.setItem('token', user.data.idToken)
        localStorage.setItem('userId', user.data.localId)
        localStorage.setItem('pseudo', signupData.pseudo)
        localStorage.setItem('expirationDate', expirationDate)
        dispatch('storeUser', signupData) // save to users.json
        router.replace('/')
      })
      .catch(error => {
        commit('setError', {status: error})
        }
      )
  }
export const signin = ({state, commit, dispatch}, signinData) => {
  commit('clearError')
  axios.post('/verifyPassword?key=AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x_4', {
    email: signinData.email,
    password: signinData.password,
    returnSecureToken: true
  })
    .then(user => {
      const now = Math.floor(Date.now())
      const expirationDate = now + (1000 * 3600 * 24 * 30)
      localStorage.setItem('token', user.data.idToken)
      localStorage.setItem('userId', user.data.localId)
      localStorage.setItem('expirationDate', expirationDate)
      commit('authUser', {
        token: user.data.idToken,
        userId: user.data.localId
      })
      const token = user.data.idToken
      return token
    })
    .then(token => {
      dispatch('loadProjects')
    })
    .then(token => {
      dispatch('getUser', signinData)
      localStorage.setItem('pseudo', signinData.pseudo)
      commit('setSuccess', {status: true})
    })
    .catch(error => {
      commit('setError', {status: error})
      console.log(error)
      }
    )
}
export const logout = ({commit}) => {
  commit('clearAuthData')
  commit('clearIdToken')
  commit('clearSuccess')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  router.replace('/signin')
}
export const storeUser = ({state}, signupData) => {
  if (!state.idToken) {
    return
  } else {
    globalAxios.post('/users.json' + '?auth=' + state.idToken, signupData)
  }
}
export const createProject = ({commit, getters}, payload) => {
  const project = {
    title: payload.title,
    description: payload.description,
    projectId: payload.projectId,
    dataOutlay: payload.dataOutlay,
    date: payload.date.toISOString(),
    currency: payload.currency,
    creatorId: getters.userId
  }
  let key
  firebase.database().ref('projects').push(project)
  // globalAxios.post('/projects.json' + '?auth=' + state.idToken, project)
    .then((data) => {
      key = data.key
      return key
    })
    .then(key => {
      let imagesArray = payload.images
      if(imagesArray != undefined) {
        for(let i = 0; i < 2; i++) {
          if(imagesArray[i] != undefined){
            firebase.storage().ref('projects/' + key + "/" + key + i).put(imagesArray[i])
          }
        }
      }
      commit('setSuccess', {status: true})
    })
    .catch(error => {
      commit('setError', {status: error})
    })
}
export const resizeImages = ({state}) => {
  firebase.database().ref('projects').on('value', snap => {
      const preliminaryPhotosQuantity = 2
      const ChecksQuantity = 5
      const finalPhotosQuantity = 4
      const obj = snap.val()
      for (let key in obj) {
        for(let i = 0; i < preliminaryPhotosQuantity; i++){
          const image = firebase.storage().ref("projects/" + key + i + "/" + "resized-" + key + i)
          if(image !== undefined && image !== null){
            image.getDownloadURL().then((url) => {
              return firebase.database().ref('projects').child(key).child("images").child(i).update({imageUrl: url})
            })
          }
        }
        for(let i = 0; i < ChecksQuantity; i++){
          const imageCheck = firebase.storage().ref("projects/" + key + i + "/" + "dataFinal/" + "resized-" + key + i)
          if(imageCheck !== undefined && imageCheck !== null){
            imageCheck.getDownloadURL().then((url) => {
              return firebase.database().ref('projects').child(key).child("dataFinalImages").child(i).update({imageUrl: url})
            })
          }
        }
        for(let i = 0; i < finalPhotosQuantity; i++){
          const imageFinal = firebase.storage().ref("projects/" + key + i + "/" + "dataPhotos/" + "resized-" + key + i)
          if(imageFinal !== undefined && imageFinal !== null){
            imageFinal.getDownloadURL().then((url) => {
              return firebase.database().ref('projects').child(key).child("dataPhotos").child(i).update({imageUrl: url})
            })
          }
        }
      }
    })
}
export const loadProjects = ({commit}) => {
  commit('setLoading', true)
  firebase.database().ref('projects').on('value', snap => {
      const obj = snap.val()
      const projects = []
      for (let key in obj) {
        projects.push({
          id: key,
          title: obj[key].title,
          description: obj[key].description,
          currency: obj[key].currency,
          date: obj[key].date,
          projectImages: obj[key].images,
          dataOutlay: obj[key].dataOutlay,
          dataFinal: obj[key].dataFinal,
          projectId: obj[key].projectId,
          creatorId: obj[key].creatorId,
          contacts: obj[key].contacts,
          dataPhotos: obj[key].dataPhotos,
          dataFinalImages: obj[key].dataFinalImages
        })
      }
      commit('setLoadedProjects', projects)
      commit('setLoading', false)
    })
}
export const deleteProject = ({state, commit}, payload) => {
  const preliminaryPhotosQuantity = 2
  const ChecksQuantity = 5
  const pros = state.projects
  const proIndex = pros.map(x => x.id).indexOf(payload.id)
  firebase.database().ref().child('projects/' + payload.id).remove()
  for(let i = 0; i < preliminaryPhotosQuantity; i++) {
    firebase.storage().ref("projects/" + payload.id + i + "/" + "resized-" + payload.id + i).delete()
    firebase.storage().ref("projects/" + payload.id + "/" + payload.id + i).delete()
  }
  for(let i = 0; i < ChecksQuantity; i++) {
    firebase.storage().ref("projects/" + payload.id + i + "/" + "dataFinal/" + "resized-" + payload.id + i).delete()
    firebase.storage().ref("projects/" + payload.id + "/" + "dataFinal/" + payload.id + i).delete()
  }
  commit("deleteProject", proIndex)
}
export const deleteFinalOutlay = ({state, commit}, payload) => {
  const ChecksQuantity = 5
  const pros = state.projects
  const proIndex = pros.map(x => x.id).indexOf(payload.id)
  firebase.database().ref().child('projects/' + payload.id + "/"+ "dataFinal").remove()
  for(let i = 0; i < ChecksQuantity; i++) {
    firebase.storage().ref("projects/" + payload.id + i + "/" + "dataFinal/" + "resized-" + payload.id + i).delete()
    firebase.storage().ref("projects/" + payload.id + "/" + "dataFinal/" + payload.id + i).delete()
  }
  commit("deleteFinalOutlay", proIndex)
}
export const deleteOutlay = ({state, commit}, payload) => {
  const pros = state.projects
  const proIndex = pros.map(x => x.id).indexOf(payload.id)
  firebase.database().ref().child('projects/' + payload.id + "/"+ "dataOutlay").remove()
  commit("deleteOutlay", proIndex)
}
export const editProject = ({commit}, payload) => {
  const projectForServer = payload
  if(payload.title){
    projectForServer.title = payload.title
  }
  if(payload.description){
    projectForServer.description = payload.description
  }
  if(payload.currency){
    projectForServer.currency = payload.currency
  }
  if(payload.date){
    projectForServer.date = payload.date
  }
  if(payload.dataOutlay){
    projectForServer.dataOutlay = payload.dataOutlay
  }
  if(payload.dataFinal){
    projectForServer.dataFinal = payload.dataFinal
  }
  if(payload.contact && !payload.donation){
    firebase.database().ref('projects').child(payload.id).child("contacts").push(payload)
  }
  if(payload.donation){
    firebase.database().ref('projects').child(payload.id).child("contacts").child(payload.index).update(payload)
  }
  const preliminaryPhotosQuantity = 2
  const ChecksQuantity = 5
  const finalPhotosQuantity = 4
  let key = payload.id
  firebase.database().ref('projects').child(payload.id).update(projectForServer)
  .then(() => {
      if(payload.editedImages) {
        let imagesArray = payload.editedImages
        for (let i = 0; i < preliminaryPhotosQuantity; i++){
          if(imagesArray[i] != undefined){
            firebase.storage().ref('projects/' + key + "/" + key + i).put(imagesArray[i])
          }
        }
      }
        if(payload.dataFinalImages){
          let imagesArray = payload.dataFinalImages
          for(let i = 0; i < ChecksQuantity; i++ ){
            if(imagesArray[i] != undefined){
              firebase.storage().ref('projects/' + key + "/" + "dataFinal/" + key + i).put(imagesArray[i])
            }
          }
        }
      if(payload.dataPhotos) {
        let imagesArray = payload.dataPhotos
        for(let i = 0; i < finalPhotosQuantity; i++ ){
          if(imagesArray[i] != undefined){
            firebase.storage().ref('projects/' + key + "/" + "dataPhotos/" + key + i).put(imagesArray[i])
          }
        }
      }
    })
  .then(() => {
      commit('editProject', payload)
      commit('setSuccess', {status: true})
    })
    .catch(error => {
      commit('setError', {status: error})
    })
}
