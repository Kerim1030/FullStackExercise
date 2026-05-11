import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const utilisateurSlice = createSlice({
  name: 'utilisateur',
  initialState: null,
  reducers: {
    setUtilisateur(state, action) {
      return action.payload
    },
    clearUtilisateur() {
      return null
    }
  }
})

export const { setUtilisateur, clearUtilisateur } = utilisateurSlice.actions

export const initialiserUtilisateur = () => {
  return (dispatch) => {
    const utilisateurConnecte = window.localStorage.getItem('utilisateurBlogapp')
    if (utilisateurConnecte) {
      const u = JSON.parse(utilisateurConnecte)
      dispatch(setUtilisateur(u))
      blogService.setJeton(u.token)
    }
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    const u = await loginService.login(credentials)
    window.localStorage.setItem('utilisateurBlogapp', JSON.stringify(u))
    blogService.setJeton(u.token)
    dispatch(setUtilisateur(u))
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('utilisateurBlogapp')
    dispatch(clearUtilisateur())
  }
}

export default utilisateurSlice.reducer