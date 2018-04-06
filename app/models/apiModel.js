'use strict';
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var TaskSchema=new Schema({

 artist:{
   type:String,
   required:'Enter Artist'
 },

 song:{
   type:String,
   required:'Enter Song'
 },

 link:{
   type:String,
   required:'Enter Link'
 },
 text:{
   type:String,
   required:"Enter Text"

 },


});
module.exports=mongoose.model('Tasks',TaskSchema);
