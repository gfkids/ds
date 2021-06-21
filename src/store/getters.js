export const user =  (state) => {
  return state.user
}
export const projects = (state) => {
  return state.projects.sort((projectA, projectB) => {
    return projectA.date > projectB.date
  })
}
export const project = (state) => {
  return (projectId) => {
    return state.projects.find((project) => {
      return project.id === projectId
    })
  }
}
export const userId = (state) => {
  return state.userId
}
export const error =  (state) => {
  return state.error
}
export const success =  (state) => {
  return state.success
}
export const loading = (state) =>{
  return state.loading
}
export const resetError =  (state) => {
  return state.resetError
}
export const resetSuccess =  (state) => {
  return state.resetSuccess
}
