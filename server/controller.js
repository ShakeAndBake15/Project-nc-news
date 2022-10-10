const { selectTopics, selectUsers } = require('./model')

exports.getTopics = (req, res, next) => {
    selectTopics().then((topics) => {
        res.status(200).send({ topics });
    }).catch((err) => {
        console.log(err)
    })
}

exports.getUsers = (req, res, next) => {
    selectUsers().then((users) => {
        res.status(200).send({ users });
    }).catch((err) => {
        console.log(err)
    })
}