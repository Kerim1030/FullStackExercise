import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    ajouterBlog(state, action) {
      state.push(action.payload)
    },
    mettreAJourBlog(state, action) {
      return state.map(b =>
        b.id === action.payload.id ? action.payload : b
      )
    },
    supprimerBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    }
  }
})

export const { setBlogs, ajouterBlog, mettreAJourBlog, supprimerBlog } = blogSlice.actions

export const initialiserBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getTous()
    dispatch(setBlogs(blogs))
  }
}

export const creerBlog = (nouveauBlog, utilisateur) => {
  return async (dispatch) => {
    const blogCree = await blogService.creer(nouveauBlog)
    dispatch(ajouterBlog({ ...blogCree, user: utilisateur }))
  }
}

export const likerBlog = (blog) => {
  return async (dispatch) => {
    const blogMisAJour = await blogService.mettreAJour(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user._id || blog.user.id || blog.user
    })
    dispatch(mettreAJourBlog({ ...blogMisAJour, user: blog.user }))
  }
}

export const effacerBlog = (id) => {
  return async (dispatch) => {
    await blogService.supprimer(id)
    dispatch(supprimerBlog(id))
  }
}

export default blogSlice.reducer