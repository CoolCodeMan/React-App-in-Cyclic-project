const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	user:{type:String,index:true},
    wikientry:String,
    entrydescription:String,
    entryimage:String,

})

Schema.virtual("id").get(function() {
	return this._id
})

module.exports = mongoose.model("Wikientrie",Schema);