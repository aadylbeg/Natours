


exports.checkName = (req, res, next, val) => {
    console.log(`Tour name is ${val}`);
    if (req.params.name !== tours.name) {
        return res.status(400).json({
            status: 'error',
            message: 'Fail request'
        });
    }
    next();
}

exports.getName = (req, res) => {
    console.log(req.params);
    const name = req.params.name;
    const tourName = tours.find(el => el.name === name);

    res.status(200).json({
        status: 'succes',
        data: { name }
    })
}