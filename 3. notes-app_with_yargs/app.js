var chalk = require('chalk');
const yargs = require('yargs');
const fs = require('fs');
const notes = require('./notes.js');

//Customize yargs version
yargs.version('1.1.0')

yargs.command({
    command : 'add',
    describe : 'Add a new note',
    builder : {
        title : {
            describe : 'Note Title',
            demandOption : true,
            type : 'string'
        },
        body :{
            describe : 'Note Body',
            demandOption : true,
            type : 'string'
        }
    },
    handler : function(argv){   
            console.log('Add a note');
            notes.addNote(argv.title,argv.body);
    }
})

//List all records
yargs.command({
    command : 'list',
    describe : 'List a note',
    handler : function(){
        console.log('Listing a note');
        notes.getNote();
    }
})

//remove the record 
yargs.command({
    command : 'remove',
    describe : 'Remove a note',
    builder : {
            title : {
                describe : 'Note title'
            }
    },
    handler : function(argv){
        console.log('Removing a note');
        notes.deleteNote(argv.title);
    }
})

//Read the content
yargs.command({
    command : 'edit',
    describe : 'Read a note',
    builder:{
            title:{
                describe:"Note title",
                demandOption : true,
                type : 'string'
            },
            body:{
                describe:"Note body",
                demandOption : true,
                type : 'string'
            }
    },
    handler : function(argv){
        console.log('Reading a note');
        notes.editNote(argv.title,argv.body);
    }
})

//add,remove,read,list
yargs.parse()
console.log(yargs.argv);

