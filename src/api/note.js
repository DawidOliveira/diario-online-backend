module.exports = app => {
    const create = async (req,res) => {
        const {text} = req.body

        const id = await app.db('notes').insert({text})

        const [response] = await app.db('notes').where({id}).select('*')

        return res.status(200).json(response)
    }

    const getNotes = async (req,res) => {
        const response = await app.db('notes').select('*')

        return res.status(200).json(response)
    }

    const remove = async (req, res) => {
        const id = req.params.id

        await app.db('notes').where({id}).del()

        return res.status(200).json({id})
    }

    return {create, getNotes, remove}
}