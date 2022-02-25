
# ricardo.coelho@akapeople.pt
# ruck@chu5WRET3pu



require('newrelic');

const express = require('express')
const app = express()
const version = process.env.VERSION || 'local'

const ERROR_PERCENTAGE = 10
const SLOW_FACTOR = 1

const getMessage = () => {
  const message = `Hello World! \n Version: ${version}`
  const goodMessage = message.startsWith('Hello')

  if (goodMessage)
    return message
}

const mySlowFunction = () => {
  let result = 0
  for (var i = Math.pow(SLOW_FACTOR, 7); i >= 0; i--) {
    result += Math.atan(i) * Math.tan(i)
  };
}

const shouldBeError = () => {
  const randomNumber = Math.floor(Math.random() * 100)
  return randomNumber < ERROR_PERCENTAGE
}

app.get('/', (req, res) => {
  mySlowFunction()

  if (shouldBeError()){
    console.log("ERROR")
    return res.status(500).send("Ooops!")    
  }

  console.log("OK")
  res.status(200).send("Hello!")
})

module.exports = app;
