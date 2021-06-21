export const resetError = (state, payload) => {
  state.resetError = payload
}
export const resetSuccess = (state) => {
  state.resetSuccess = true
}
export const getUser = (state, payload) =>{
  state.user = payload
}
export const authUser = (state, payload)  => {
  state.idToken = payload.token,
  state.userId = payload.userId
}
export const clearAuthData = (state)  => {
  state.IdToken = null,
  state.userId = null
}
export const clearIdToken = (state) => {
  state.idToken = null
}
export const setLoading = (state, payload) => {
  state.loading = payload
}
export const setLoadedProjects = (state, payload) =>  {
  state.projects = payload
}
export const setError = (state, payload) =>  {
  state.error = payload.status
}
export const clearError = (state) =>  {
  state.error = null
}
export const setSuccess = (state, payload) =>  {
  state.success = payload.status
}
export const clearSuccess = (state) =>  {
  state.success = false
}
export const createProject = (state, payload) => {
  state.projects.push(payload)
}
export const editProject = (state, payload) => {
  const project = state.projects.find((project) => {
      return project.id === payload.id
    })
  if(payload.title){
    project.title = payload.title
  }
  if(payload.description){
    project.description = payload.description
  }
  if(payload.date){
    project.date = payload.date
  }
  if(payload.dataOutlay){
    project.dataOutlay = payload.dataOutlay
  }
  if(payload.dataFinal){
    project.dataFinal = payload.dataFinal
  }
  if(payload.currency){
    project.currency = payload.currency
  }
  if(payload.donation){
    project.contacts[payload.index] = payload
  }
  if(payload.dataPhotos){
    project.dataPhotos = payload.dataPhotos
  }
  if(payload.dataFinalImages){
    project.dataFinalImages = payload.dataFinalImages
  }
}
export const deleteProject = (state, payload) => {
  state.projects.splice(payload, 1)
}
export const deleteFinalOutlay = (state, payload) => {
  state.projects[payload].dataFinal = []
}
export const deleteOutlay = (state, payload) => {
  state.projects[payload].dataOutlay = []
}
export const storeContact = (state, payload) => {
  const contact = {}
  contact[payload.key].push(payload.contact)
  contact[payload.key].push(payload.nickname)
  state.projectContacts.push(contact)
}
