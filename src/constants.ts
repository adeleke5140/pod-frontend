
const clientID = process.env.client_id
const redirectURI = process.env.redirect_uri
export const redirectURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${clientID}&redirect_uri=${redirectURI}`