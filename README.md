
## React Contact Form

### clone repogitory 

git clone https://github.com/vicotr-gold/React-Contact-Form.git

## Configuration nodemailer

replace user and pass of auth contactEmail in server.js
` const contactEmail = nodemailer.createTransport({ `
`  service: "gmail",`
`  auth: {`
`    user: "***************@gmail.com",`
`    pass: "********",`
`  },`
`}); `

### npm package install

` npm install `

### open terminal or command prompt and then run react app

` npm run start` 

### open another terminal or command prompt and then run nodejs api

` npm run server`