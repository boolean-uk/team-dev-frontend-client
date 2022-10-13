const constants = {
  token: process.env.REACT_APP_USER_TOKEN,
  user: {
    permittedProperties: [
      'firstName',
      'lastName',
      'email',
      'password',
      'biography',
      'githubUrl',
      'role'
    ]
  },
  post: {
    permittedProperties: ['content']
  }
}

export default constants
