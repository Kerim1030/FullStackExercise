import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const anecdote = state.find(a => a.id === action.payload.id)
      if (anecdote) {
        anecdote.votes = action.payload.votes
      }
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getTous()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const creerAnecdote = (content) => {
  return async (dispatch) => {
    const nouvelle = await anecdoteService.creer(content)
    dispatch(addAnecdote(nouvelle))
  }
}

export const voterAnecdote = (anecdote) => {
  return async (dispatch) => {
    const mise_a_jour = await anecdoteService.mettreAJour({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(vote(mise_a_jour))
  }
}

export default anecdoteSlice.reducer