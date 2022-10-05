const fs = require('fs')
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicate = notes.find((note) => note.title === title)

    if (!duplicate){

        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.green.inverse('Added new note!'))
    } else {
        console.log(chalk.red.inverse('Node title already taken.'))
    }

    saveNotes(notes)
}

const removeNote = (title) => {
    const notes = loadNotes()
    const keep = notes.filter((note) => note.title !== title)

    if (notes.length > keep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(keep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (!note){
        console.log(chalk.red.inverse('Note with title "' + title + '" not found!'))
    } else {
        console.log(chalk.inverse(note.title ))
        console.log(note.body)
    }
    
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse.bold('Your Notes:'))
    // console.log('')
    notes.forEach(note => {
        console.log(note.title)
    });
}

const saveNotes = (notes) => {
    const data = JSON.stringify(notes)
    fs.writeFileSync('notes.json', data)
}

const loadNotes = () => {
    try{
        return JSON.parse(fs.readFileSync('notes.json').toString())
    } catch (e) {
        return []
    }
    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}