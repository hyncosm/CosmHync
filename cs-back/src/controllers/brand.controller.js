const mongoose = require("mongoose");
const { Brand } = require("../models");

const alterBrand = async (req, res) => {
    const query = {
        _id: req.body._id
    },
    update = req.body,
    options = {
        upsert: true,
        new: true,
    };
    Brand.findOneAndUpdate(query, update, options, function (error, result) {
        if (error) {
            console.log("An error occured : ", error);
            return res.status(500).json({ message: error });
        } else {
            return res.status(200).json(result);
        }
    });
};

const deleteBrand = async (req, res) => {
    Brand.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            console.error(err);
        } else {
            return res.status(200).json('Document deleted');
        }
    });
}

const newBrand = async (req, res) => {
    const { name, logo } = req.body;
    try {
        const newBrand = new Brand({
            name, logo
        });
        const brand = await newBrand.save();
        res.status(200).json(brand);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getBrands = async (req, res) => {
    Brand.find(function (error, result) {
        if (error) {
            console.log("An error occured : ", error);
            return res.status(500).json({ message: error });
        } else {
            return res.status(200).json(result);
        }
    }).sort({ createdAt: -1 });
};

module.exports = {
    deleteBrand,
    newBrand,
    alterBrand,
    getBrands,
};
