

const express = require('express')
const app = express()
const path = require('path')

const spawn = require('child_process').spawn


// 나중에 cors 라이브러리 임폴트 해야함
app.use(express.json())
var cors = require('cors')
// const { Server } = require('http')
app.use(cors())

app.listen(8000, function() {
  console.log('listening on')
})


app.use(express.static(path.join(__dirname, 'test.html')))

// app.get('/', function(req, res){
//   res.sendFile(path.join(__dirname, '../test/build/index.html'))
// })


// API 통신
app.get('/product', function(req, res){
  res.json({name : 'black shoes'})
})

app.get('/pleasepython', function (req, res) {
  const result = spawn('python', ["./python/please.py"])
  result.stdout.on("data", function(data) {
    res.send(data)
    
  })
})


// 항상 가장 하단에 있는 코드
// app.get('*', function(req, res){
//   res.sendFile(path.join(__dirname, '../test/build/index.html'))
// })



// build 는 굳이 할 필요 x