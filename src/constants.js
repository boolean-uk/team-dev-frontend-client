const constants = {
  token: process.env.REACT_APP_USER_TOKEN,
  user: {
    permittedProperties: [
      'firstName',
      'lastName',
      'email',
      'password',
      'biography',
      'githubUrl'
    ]
  },
  post: {
    permittedProperties: ['content']
  }
}

export default constants
