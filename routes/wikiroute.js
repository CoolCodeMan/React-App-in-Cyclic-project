const express = require("express");
const wikiModel = require("../models/wikientrie");
const router = express.Router();

//DATABASES
let database = [];
let id = 100;

//REST API
router.get("/wikientries",function(req,res) {
	let query = {"user":req.session.user}
	wikiModel.find(query).then(function(wikies) {
		return res.status(200).json(wikies);
	}).catch(function(error) {
		console.log("Failed to find items. Reason",error);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

router.post("/wikientries", function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	if(!req.body.entryname) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	let wikientry = new wikiModel({
		"wikientry":req.body.entryname,
        "entrydescription":req.body.entrydescription,
        "entryimage":req.body.entryimage,
	    "user":req.session.user,
	})
	wikientry.save().then(function(wikientry) {
		return res.status(201).json(wikientry);
	}).catch(function(error) {
		console.log("Failed to add new item. Reason",error);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
	
})

router.delete("/wikientries/:id",function(req,res) {
	wikiModel.deleteOne({"_id":req.params.id,"user":req.session.user}).then(function() {
		return res.status(200).json({"Message":"Success"});
	}).catch(function(error) {
		console.log("Failed to remove item. Reason",error);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

router.put("/wikientries/:id",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	if(!req.body.entryname) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	let wikientry = {
		"wikientry":req.body.entryname,
        "entrydescription":req.body.entrydescription,
        "entryimage":req.body.entryimage,
		"user":req.session.user
	}
	wikiModel.replaceOne({"_id":req.params.id,"user":req.session.user},wikientry).then(function() {
		return res.status(204).json({"Message":"Success"})
	}).catch(function(error) {
		console.log("Failed to edit item. Reason",error);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

module.exports = router;