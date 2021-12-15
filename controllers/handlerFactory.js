const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');


exports.deleteOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id)

        if (!doc) {
            return next(new AppError('No document found with ID', 404));
        }

        res.status(204).json({
            status: 'succed',
            data: null
        })
    });

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new AppError('No document found with ID', 404));
    }

    res.status(200).json({
        status: 'succed',
        data: {
            data: doc
        }
    });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body)

    res.status(201).json({
        status: 'succes',
        data: {
            tour: doc
        }
    });
});

exports.getOne = (Model, popObject) => catchAsync(async (req, res, next) => {
    let query = await Model.findById(req.params.id);
    if (popObject) query = await query.populate(popObject);
    const doc = query;
    // const tour = await Tour.findById(req.params.id).populate('review');

    if (!doc) {
        return next(new AppError('No document found with ID', 404));
    };

    res.status(200).json({
        status: 'succes',
        data: {
            data: doc
        }
    });
});

exports.getAll = Model => catchAsync(async (req, res, next) => {

    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const docs = await features.query;

    res.status(200).json({
        status: 'succes',
        results: docs.length,
        data: { docs }
    });
});