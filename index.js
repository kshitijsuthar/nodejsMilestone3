var SERVER_NAME = 'patients'
var PORT = process.env.PORT;

var getCounter = 1
var postCounter = 1


var restify = require('restify')

, savePatients = require('save')('patients')

, saveRecords = require('save')('records')

, server = restify.createServer({ name: SERVER_NAME})

server.listen (PORT, function() {

console.log('Server %s listening on url %s',server.name,server.url)
console.log('Resources:')
console.log(' http://127.0.0.1:8000/patients')
console.log(' http://127.0.0.1:8000/patients/:id') 
console.log(' http://127.0.0.1:8000/patients/:id/records') 

})

server

.use(restify.fullResponse())

.use(restify.bodyParser())

//Get all patients

server.get('/patients', function (req, res, next) {
  
  console.log("Get request counter:" + getCounter++);
  

savePatients.find({}, function (error, patients) {

  res.send(patients)
})
})


//Get all Patient record.

server.get('/patients/records', function (req, res, next) {  

  saveRecords.find({}, function (error, records) {
  
    res.send(records)
    
  })
  })

//Get patient record with their id.

  server.get('/patients/:id/records', function (req, res, next) {  

    saveRecords.find({_id: req.params.id}, function (error, records) {
  
    res.send(records)
    
  })
  })


  //Used to get patients by their id

server.get('/patients/:id', function(req, res, next){
    
      savePatients.findOne({_id: req.params.id}, function(error, patient){
    
        if(error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        if(patient) {
    
          res.send(patient)
        }
    
        else {
    
          res.send(404)
        }
    
      })
    })


    //Used to input patient

server.post('/patients', function(req, res, next) 
    {

      console.log("Post counter:" + postCounter++);
    
      if(req.params.firstname === undefined)
      {
        return next(new restify.InvalidArgumentError('firstname must be supplied'))
      }

      if(req.params.lastname === undefined)
      {
        return next(new restify.InvalidArgumentError('lastname must be supplied'))
      }

      if(req.params.gender === undefined)
      {
        return next(new restify.InvalidArgumentError('gender must be supplied'))
      }

      if(req.params.age === undefined)
      {
        return next(new restify.InvalidArgumentError('age must be supplied'))
      }

      if(req.params.appointment === undefined)
      {
        return next(new restify.InvalidArgumentError('appointment must be supplied'))
      }

      if(req.params.address === undefined)
      {
        return next(new restify.InvalidArgumentError('address must be supplied'))
      }

      if(req.params.doctor === undefined)
      {
        return next(new restify.InvalidArgumentError('doctor must be supplied'))
      }
    
    
      var newPatients = {
        
        firstname: req.params.firstname,
        lastname: req.params.lastname,
        address: req.params.address,
        gender: req.params.gender,
        age: req.params.age,
        appointment: req.params.appointment,
        doctor: req.params.doctor
      }
    
      savePatients.create( newPatients, function(error, patient) {
    
        if(error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        res.send(201, patient)
    
      })
    
    })

    //Input patient records

    server.post('/patients/:id/records', function(req, res, next) 
    {

    
      if(req.params.date === undefined)
      {
        return next(new restify.InvalidArgumentError('date must be supplied'))
      }

      if(req.params.type === undefined)
      {
        return next(new restify.InvalidArgumentError('type must be supplied'))
      }

      if(req.params.bloodgroup === undefined)
      {
        return next(new restify.InvalidArgumentError('bloodgroup must be supplied'))
      }

      if(req.params.heartbeat === undefined)
      {
        return next(new restify.InvalidArgumentError('heartbeat must be supplied'))
      }
    
    
      var newRecords = {
        
        date: req.params.date,
        type: req.params.type,
        bloodgroup: req.params.bloodgroup,
        heartbeat: req.params.heartbeat,
      }
    
      saveRecords.create( newRecords, function(error, record) {
    
        if(error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        res.send(201, record)
    
      })
    
    })

    //Updates patient with their id

    server.put('/patients/:id', function (req, res, next) {

      if(req.params.firstname === undefined)
      {
        return next(new restify.InvalidArgumentError('firstname must be supplied'))
      }

      if(req.params.lastname === undefined)
      {
        return next(new restify.InvalidArgumentError('lastname must be supplied'))
      }

      if(req.params.gender === undefined)
      {
        return next(new restify.InvalidArgumentError('gender must be supplied'))
      }

      if(req.params.age === undefined)
      {
        return next(new restify.InvalidArgumentError('age must be supplied'))
      }

      if(req.params.appointment === undefined)
      {
        return next(new restify.InvalidArgumentError('appointment must be supplied'))
      }

      if(req.params.address === undefined)
      {
        return next(new restify.InvalidArgumentError('address must be supplied'))
      }

      if(req.params.doctor === undefined)
      {
        return next(new restify.InvalidArgumentError('doctor must be supplied'))
      }
    
    
      var newPatients = {

        _id: req.params.id,
        firstname: req.params.firstname,
        lastname: req.params.lastname,
        address: req.params.address,
        gender: req.params.gender,
        age: req.params.age,
        appointment: req.params.appointment,
        doctor: req.params.doctor
      }
      
      savePatients.update(newPatients, function (error, user) {
    
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        res.send(200)
      })
    })

    //Delete all patients and records

server.del('/patientDelete', function(req, res, next)
{

  savePatients = require('save')('')

  saveRecords = require('save')('')

  savePatients.deleteMany({}, function (error, patients){

    if(error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    res.send()
    

  })

  saveRecords.deleteMany({}, function (error, records){

    if(error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    res.send()
    

  })


})

//Delete patients by id

server.del('/patients/:id', function(req, res, next)
    {
    
      savePatients.delete(req.params.id, function(error, patient)
    {
    
      if(error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
      res.send()
    
    })
    
})

    
