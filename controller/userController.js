const { User } = require("../models");
const ApiError = require("../utils/apiError");

const findUsers = async (req, res, next) => {
  try {
    const user = await User.findAll();

    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      next(new ApiError("User id tersebut gak ada", 404));
    }

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, age, role, address } = req.body;
    const newUser = await User.create({
      name,
      age,
      role,
      address,
    });

    res.status(201).json({
      status: "Success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    console.log(err.stack);
    next(new ApiError(err.message, 500));
  }
};

const updateUser = async (req, res, next) => {
  const { name, age, address, role } = req.body;
  try {
    const user = await User.update(
      {
        name,
        age,
        role,
        address,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "sukses update produk",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteUser = async (req, res, next) => {
  const { name, price, stock } = req.body;
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      next(new ApiError("User id tersebut gak ada", 404));
    }

    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete produk",
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  findUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
};
