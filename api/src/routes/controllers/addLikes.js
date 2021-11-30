const { Publication } = require ('../../models/index');

const putLikes = async (req, res) => {

    const { idPublication, idUser } = req.query;

    const getPublication = await Publication.findById(idPublication)

    var getIdUser = getPublication.likes.filter(e => e == idUser)

    if(getIdUser == false){

        const publication = await Publication.findByIdAndUpdate(idPublication, 
        {
            likes: getPublication.likes.concat([idUser]),
            likesNumber: getPublication.likes.length ? getPublication.likes.length + 1 : 1
        }, {new: true})

        let cantidadDeLikes = publication.likes.length
        
        res.json({message:  "Se agrego el like correctamente",
        Likes: cantidadDeLikes
        })

    } else

    res.json({message: "Ya le diste like boludo", Likes: getPublication.likes.length})

}

module.exports = {
    putLikes
}