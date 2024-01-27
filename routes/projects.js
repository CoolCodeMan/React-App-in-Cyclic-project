const express = require("express");
const itemModel = require("../models/project");
const router = express.Router();

//DATABASES
let database = [];
let id = 100;

//REST API
router.get("/projects",function(req,res) {
	let query = {"user":req.session.user}
	itemModel.find(query).then(function(items) {
		return res.status(200).json(items);
	}).catch(function(error) {
		console.log("Failed to find items. Reason",error);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

router.post("/projects", function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	if(!req.body.projectname) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	let item = new itemModel({
		"projectname":req.body.projectname,
        "description":req.body.description,
	    "user":req.session.user,
	})
	item.save().then(function(item) {
		return res.status(201).json(item);
	}).catch(function(error) {
		console.log("Failed to add new item. Reason",error);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
	
})

router.delete("/projects/:id",function(req,res) {
	itemModel.deleteOne({"_id":req.params.id,"user":req.session.user}).then(function() {
		return res.status(200).json({"Message":"Success"});
	}).catch(function(error) {
		console.log("Failed to remove item. Reason",error);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

router.put("/projects/:id",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	if(!req.body.projectname) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	let item = {
		"projectname":req.body.projectname,
        "description":req.body.description,
		"user":req.session.user
	}
	itemModel.replaceOne({"_id":req.params.id,"user":req.session.user},item).then(function() {
		return res.status(204).json({"Message":"Success"})
	}).catch(function(error) {
		console.log("Failed to edit item. Reason",error);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

module.exports = router;