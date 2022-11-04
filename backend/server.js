const app = require("express")();
const cors = require('cors');
const fs = require('fs');
var ObjectID = require('mongodb').ObjectID;
const server = require("https").createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/prenf22-edipuma.enterpriselab.ch/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/prenf22-edipuma.enterpriselab.ch/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/prenf22-edipuma.enterpriselab.ch/chain.pem')
}, app);
const io = require("socket.io")(server, {
  cors: {
    origins: ['https://prenf22-edipuma.enterpriselab.ch'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
});
const mongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const { clear } = require("console");

app.use(cors({
  origin: 'https://prenf22-edipuma.enterpriselab.ch',
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(bodyParser.json());

const connectionString = "mongodb://localhost:27017";
var deviceIsRunning = false;
var elapsedTime = 0;
var timer = undefined;

const connectiontoDbCollection = async (collectionName) => {
  try {
    const client = await mongoClient.connect(connectionString);
    const db = client.db('robotanik');
    const collection = db.collection(collectionName);
    return collection;
  } catch (err) {
    console.log(err);
  }
}

const start = () => {
  timer = setInterval(() => {
  elapsedTime += 1000;
    io.emit("timer", elapsedTime);
  }, 1000);
}

const stop = () => {
  clearInterval(timer);
  io.emit("stopRun", elapsedTime);
}

const reset = () => {
  elapsedTime = 0;
  clearInterval(timer);
  io.emit("resetRun", elapsedTime);
}

io.on('connection', async (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//-------- GET Information: logs/run/device/currentRun/currentDevice -------------

app.get('/logs', async (req, res) => {
  const result = await (await connectiontoDbCollection("logs")).find({}).toArray()
  res.send(result);
});

app.get('/devices', async (req, res) => {
  const result = await (await connectiontoDbCollection("device")).find({}).toArray()
  res.send(result);
});

app.get('/runs', async (req, res) => {
  const result = await (await connectiontoDbCollection("run")).find({}).toArray()
  res.send(result);
});

app.get('/detected', async (req, res) => {
  const currentDevice = await (await connectiontoDbCollection("device")).findOne({ _id: 1 })
  const result = await (await connectiontoDbCollection("detected")).find({ runId: currentDevice.currentRunId }).toArray()
  res.send(result);
});

app.get('/time', async (req, res) => {
  const result = elapsedTime;
  res.send({time: result});
});

app.get('/currentRun', async (req, res) => {
  const currentDevice = await (await connectiontoDbCollection("device")).findOne({ _id: 1 })
  const result = await (await connectiontoDbCollection("run")).findOne({ _id: new ObjectID(currentDevice.currentRunId) })
  res.send(result);
});

app.get('/currentDevice', async (req, res) => {
  const result = await (await connectiontoDbCollection("device")).findOne({ _id: 1 })
  res.send(result);
});

app.get('/currentLogs', async (req, res) => {
  const currentDevice = await (await connectiontoDbCollection("device")).findOne({ _id: 1 })
  const result = await (await connectiontoDbCollection("logs")).find({runId: currentDevice.currentRunId}).toArray()
  res.send(result);
});

app.get('/currentProgress', async (req, res) => {
  const defaultProgress = 0;
  const currentDevice = await (await connectiontoDbCollection("device")).findOne({ _id: 1 });
  const result = await (await connectiontoDbCollection("run")).findOne({ _id: new ObjectID(currentDevice.currentRunId) });
  if(result != null){
    res.send({"progress": result.progress});
  } else {
    res.send({"progress": 0});
  }
});

//--------- POST new Document: log/device/run -----------


app.post('/log', async (req, res) => {
  const collection = await (await connectiontoDbCollection("logs"))
  const newDocument = {
    runId: req.body.runId,
    timestamp: req.body.timestamp,
    message: req.body.message,
    level: req.body.level
  };
  const result = await collection.insertOne(newDocument, function (err, result) {
        if (err) {
          res.status(400).send(err);
        } else {
		  io.emit("log", req.body);
          res.status(201).send({id: result.insertedId});
        }
      });
});

app.post('/device', async (req, res) => {
  const collection = await (await connectiontoDbCollection("device"))
  const newDocument = {
    status: req.body.status,
    lastStatusUpdateTime: req.body.lastStatusUpdateTime,
    currentRunId: req.body.currentRunId
  };
  const result = await collection.insertOne(newDocument, function (err, result) {
        if (err) {
          res.status(400).send(err);
        } else {
		  io.emit("device", req.body);
          res.status(201).send({id: result.insertedId});
        }
      });
});

app.post('/run', async (req, res) => {
  const collection = await (await connectiontoDbCollection("run"))
  const newDocument = {
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    progress: req.body.progress,
	speciesOfFirstPlant: req.body.speciesOfFirstPlant,
	positionOfRecognizedPlant: req.body.positionOfRecognizedPlant
  };
  const result = await collection.insertOne(newDocument, function (err, result) {
        if (err) {
          res.status(400).send(err);
        } else {
		  io.emit("run", req.body);
          res.status(201).send({id: result.insertedId});
        }
      });
  if(!deviceIsRunning) {
        deviceIsRunning = true;
        reset();
        start();
      }
});

app.post('/detected', async (req, res) => {
  const collection = await (await connectiontoDbCollection("detected"))
  const newDocument = {
    runId: req.body.runId,
    position: req.body.position,
    isFirstPlant: req.body.isFirstPlant,
    codeDetectionTime: req.body.codeDetectionTime,
    possiblePlants: req.body.possiblePlants,
	  plantDetectionTime: req.body.plantDetectionTime,
    probabilityOfIdenticalPlant: req.body.probabilityOfIdenticalPlant
  };
  const result = await collection.insertOne(newDocument, function (err, result) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(201).send({id: result.insertedId});
        }
      });
});


//------ PUT (Update) Document: stopRun/addDetectedPlant/addDetectedQRCode/addPositionRecognisedPlant/updateDeviceStatus/updateCurrentRun----------

app.put('/detectedPlant', async (req, res) => {
  const currentDevice = await (await connectiontoDbCollection("device")).findOne({ _id: 1 })
  const update = req.body;
  const result = await (await connectiontoDbCollection("detected")).updateOne({ position: update.position, runId: currentDevice.currentRunId }, { $set: update })
  if (result) {
    res.send(result);
  } else {
    res.status(404);
  }
  res.end();
});

app.put('/speciesOfFirstPlant', async (req, res) => {
  const currentDevice = await (await connectiontoDbCollection("device")).findOne({ _id: 1 })
  const update = req.body;
  const result = await (await connectiontoDbCollection("run")).updateOne({ _id: new ObjectID(currentDevice.currentRunId) }, { $set: update })
  if (result) {
    io.emit("addSpeciesOfFirstPlant", update);
    res.send(result);
  } else {
    res.status(404);
  }
  res.end();
});

app.put('/positionRecognisedPlant', async (req, res) => {
  const currentDevice = await (await connectiontoDbCollection("device")).findOne({ _id: 1 })
  const update = req.body;
  const result = await (await connectiontoDbCollection("run")).updateOne({ _id: new ObjectID(currentDevice.currentRunId) }, { $set: update })
  if (result) {
    io.emit("addPositionRecognisedPlant", update);
    res.send(result);
  } else {
    res.status(404);
  }
  res.end();
});

app.put('/stopRun', async (req, res) => {
  const currentDevice = await (await connectiontoDbCollection("device")).findOne({ _id: 1 })
  const update = req.body;
  const result = await (await connectiontoDbCollection("run")).updateOne({ _id: new ObjectID(currentDevice.currentRunId) }, { $set: update })
  if (result) {
    if(deviceIsRunning) {
      deviceIsRunning = false;
      stop();
    }
    res.send(result);
  } else {
    res.status(404);
  }
  res.end();
});

app.put('/progress', async (req, res) => {
  const currentDevice = await (await connectiontoDbCollection("device")).findOne({ _id: 1 })
  const update = req.body;
  const result = await (await connectiontoDbCollection("run")).updateOne({ _id: new ObjectID(currentDevice.currentRunId) }, { $set: update })
  if (result) {
    io.emit("updateProgress", update.progress);
    res.send(result);
  } else {
    res.status(404);
  }
  res.end();
});

app.put('/deviceStatus', async (req, res) => {
  const update = req.body;
  const result = await (await connectiontoDbCollection("device")).updateOne({ _id: 1 }, {$set: update})
  if (result) {
    io.emit("deviceStatusUpdate", update);
    if(update.status == "OFF" || update.status == "READY"){
      deviceIsRunning = false;
      reset();
      io.emit("updateProgress", 0);
    }
    res.send(result);
  } else {
    res.status(404);
  }
  res.end();
});

app.put('/currentRun', async (req, res) => {
  const update = req.body;
  const result = await (await connectiontoDbCollection("device")).updateOne({ _id: 1 }, { $set: update })
  if (result) {
    res.send(result);
  } else {
    res.status(404);
  }
  res.end();
});

// DELETE Document: Device/run/log

app.delete('/device/:id', async (req, res) => {
  const collection = await (await connectiontoDbCollection("device"))
  const result = await collection.deleteOne({ _id: new ObjectID(req.params.id)});
  res.status(201);
  res.end();
});

app.delete('/run/:id', async (req, res) => {
  const collection = await (await connectiontoDbCollection("run"))
  const result = await collection.deleteOne({ _id: new ObjectID(req.params.id) });
  res.status(201);
  res.end();
});

app.delete('/log/:id', async (req, res) => {
  const collection = await (await connectiontoDbCollection("logs"))
  const result = await collection.deleteOne({ _id: new ObjectID(req.params.id) });
  res.status(201);
  res.end();
});

app.delete('/allLogs', async (req, res) => {
  const collection = await (await connectiontoDbCollection("logs"))
  const result = await collection.deleteMany();
  res.status(201);
  res.end();
});

app.delete('/allRuns', async (req, res) => {
  const collection = await (await connectiontoDbCollection("run"))
  const result = await collection.deleteMany();
  res.status(201);
  res.end();
});


// Start server: listen on Port 8080

server.listen(8080, async () => {
  console.log("Backend Robotanik is running on 8080");
});