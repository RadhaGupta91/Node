const fs = require('fs');

const addNote = function(title,body){
    const notes = loadNotes();
    

    const duplicateNotes = notes.filter((note)=>{
       
        return note.title === title

    })

    if(duplicateNotes.length ==- 0){
        notes.push({
            title : title,
            body:body
        });
        saveNotes(notes);
        console.log(notes);
    }
    else {
        console.log('Note Title Taken');
    }
}

const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes = function () {

    try {
        const dataBuffer  = fs.readFileSync('notes.json');
        const dataJSON =  dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return [];
    }
}

const getNote = function(){
    const notes = loadNotes();
    console.log(notes);
}

const deleteNote = function(title){
    const notes = loadNotes();
    
    const duplicateNotes = notes.filter((note)=>{
       
        return note.title === title

    });

    if(duplicateNotes.length)
    {
        console.log(notes);

        const slicedNotes = notes.filter((note)=>{
       
            return note.title != title
    
        });

        console.log(slicedNotes);
        saveNotes(slicedNotes);
        //Print
        const updateNotes = loadNotes();
        console.log("Record has been delete title: "+title);
        console.log("Here is an updated List");
        console.log(updateNotes);
    }else{
        console.log("No record found");
    }
}

const editNote = function(title,body){
    const notes = loadNotes();
    
    const duplicateNotes = notes.filter((note)=>{
       
        return note.title === title

    });

    if(duplicateNotes.length)
    {
        console.log(notes);

        const updatedRecords = notes.filter((note)=>{
       
             if(note.title === title)
             {
                 note.body = body;
             }
             return note;
        });

        console.log(updatedRecords);
        saveNotes(updatedRecords);
        //Print
         const updateNotes = loadNotes();
         console.log("Record has been udpated title: "+title);
         console.log("Here is an updated List");
         console.log(updateNotes);
    }else{
        console.log("No record found");
    }
}

//Export different Modules
module.exports  = {
    addNote : addNote,
    getNote : getNote,
    editNote : editNote,
    deleteNote : deleteNote
}