import axios from 'axios'

// https://ironhack.herokuapp.com/
// baseURL: https://ironhack.herokuapp.com/api

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true, // The cookie with session informations are sent
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  isAdmin() {
    if (localStorage.getItem('user') === null) return false
    else {
      let loggedInUser = JSON.parse(localStorage.getItem('user'));
      if (loggedInUser.isAdmin) return true
      else return false;
    }
  },

  refreshIfNotAnymoreLoggedIn() {
    if (this.isLoggedIn()) {
      this.getProfile()
        .then(profile => {
          if (!profile) {
            localStorage.removeItem('user')
            // Go to '/login' by refreshing the page
            window.location = '/login'
          }
        })
    }
  },

  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  login(username, password) {
    return service
      .post('/login', {
        username,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service
      .get('/logout')
  },

  getCodekuenste() {
    return service
      .get('/codekuenste')
      .then(res => res.data)
      .catch(errHandler)
  },

  getCodekunstDetail(id) {
    return service
      .get('/codekuenste/'+id)
      .then(res => res.data)
      .catch(errHandler)
  },

  getUserArts(id) {
    return service
      .get('/userarts/ofUser/'+id)
      .then(res => res.data)
      .catch(errHandler)
  },

  postCodekuenste(data) {
    return service
      .post('/codekuenste', data)
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteCodekunst(codekunstId) {
    return service
      .delete('/codekuenste/'+codekunstId)
      .then(res => res.data)
      .catch(errHandler)
  },

  editCodekunst(codekunstId, body) {
    return service
      .put('/codekuenste/'+codekunstId, body)
      .then(res => res.data)
      .catch(errHandler)
  },

  getProfile() {
    return service
    .get('/profile')
      .then(res => res.data)
      .catch(errHandler)
  },

  getSecret() {
    return service
      .get('/admin')
      .then(res => res.data)
      .catch(errHandler)
  },



  addPicture(file) {
    const formData = new FormData()
    formData.append("picture", file)
    return service
      .post('/endpoint/to/add/a/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  },
}
