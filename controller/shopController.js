const { Shop, User, Product } = require("../models");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");

const createShop = async (req, res, next) => {
  const { name, productId, userId } = req.body;
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    if (!user || !product) {
      next(
        new ApiError("User ID dan Product ID harus sudah memiliki data", 404)
      );
    }

    if (user.role !== "Owner") {
      next(new ApiError(`Anda role ${user.role}, tidak bisa akses`, 403));
    }

    const newShop = await Shop.create({
      name,
      productId,
      userId,
    });

    res.status(200).json({
      status: "Success",
      data: {
        newShop,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findShops = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      include: [Product, User],
    });
    // if (shops.User.role !== "Owner") {
    //   next(new ApiError("Hanya bisa diakses owner", 400));
    // }

    res.status(200).json({
      status: "Success",
      data: {
        shops,
      },
    });
  } catch (err) {
    console.log(err.stack);
    next(new ApiError(err.message, 500));
  }
};

const findShopById = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product, User],
    });

    res.status(200).json({
      status: "Success",
      data: {
        shop,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const UpdateShop = async (req, res, next) => {
  const { name, productId, userId } = req.body;
  try {
    await Shop.update(
      {
        name,
        productId,
        userId,
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

const deleteShop = async (req, res, next) => {
  const { name, price, stock } = req.body;
  try {
    const shop = await Shop.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!shop) {
      next(new ApiError("Shop id tersebut gak ada", 404));
    }

    await Shop.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete produk",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createShop,
  findShops,
  findShopById,
  UpdateShop,
  deleteShop,
};
