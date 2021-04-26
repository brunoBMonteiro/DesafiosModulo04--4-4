const fs = require('fs')
const data = require('./data.json')
const { age } = require('./utils')

// show
exports.show = function(req, res) {
    const { id } = req.params 

    const foundProfessor = data.professors.find(function(professor){
        return professor.id == id 
    })

    if (!foundProfessor) return res.send("Professor not found!")

    const professor = {
        ...foundProfessor,
        age: age(foundProfessor.birth),
        gender: "",
        services: foundProfessor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundProfessor.created_at),
    }

    return res.render("professors/show", { professor })
}

// create
exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        // req.body.key == ""
        if (req.body[key] == "") {
            return res.send('Preencha todos os campos')
        }
    }

    let { avatar_url, name, birth, services, gender } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.professors.length + 1)


    data.professors.push({
        id,
        avatar_url,
        name,
        birth,
        services,
        gender,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send('Write file error')

        return res.redirect('/professors')
    })

    //return res.send(req.body)
}

// update

//delete