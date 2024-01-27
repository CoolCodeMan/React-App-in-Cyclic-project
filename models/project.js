const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	user:{type:String,index:true},
    projectname:String,
    description:String,

})

Schema.virtual("id").get(function() {
	return this._id
})

module.exports = mongoose.model("project",Schema);