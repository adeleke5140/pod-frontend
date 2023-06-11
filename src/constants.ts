
const clientID = process.env.client_id as string
const redirectURI = process.env.redirect_uri as string
export const redirectURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${clientID}&redirect_uri=${redirectURI}`
export const githubCallbackURL = 'http://localhost:3058/user/v1-github-callback'
export const githubRepoURL = 'http://localhost:3058/user/v1-get-public-repos-by-user'