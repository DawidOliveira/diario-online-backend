module.exports = app => {
    app.post('/note', app.src.api.note.create)
    app.get('/notes', app.src.api.note.getNotes)
    app.delete('/note/:id', app.src.api.note.remove)
}