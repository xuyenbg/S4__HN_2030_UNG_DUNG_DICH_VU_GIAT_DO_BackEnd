const CategoryModel = require("../models/categories_model");

exports.getListCategory = async (req, res) => {
  try {
    const listCategory = await CategoryModel.find();

    // res.status(200).json(listCategory);

    res.render("category/list", { listCategory: listCategory });
  } catch (err) {
    console.log(err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

//-------------Render page add----------------//
exports.renderAddPage = (req, res) => {
  try {
    res.render("category/add");
  } catch (err) {
    console.log(err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.insertCategory = async (req, res) => {
  try {
    const name = req.body.name;

    const newCategory = new CategoryModel({
      name: name,
      image: `/img/${req.file.filename}`,
    });

    await newCategory.save().then((_) => res.redirect("/categories"));
  } catch (err) {
    console.log(err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

//-------------Render page edit----------------//
exports.renderEditPage = async (req, res) => {
  try {
    const idCate = req.params.idCate;

    const category = await CategoryModel.findOne({ _id: idCate });
    res.render("category/edit", { category: category });
  } catch (err) {
    console.log(err);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const idCate = req.params.idCate;
    const { name } = req.body;

    console.log(idCate);
    console.log(name);
    console.log(req.file);

    const category = await CategoryModel.findOne({ _id: idCate });

    await CategoryModel.findByIdAndUpdate(
      { _id: idCate },
      {
        name: name != null || name != undefined ? name : category.name,
        image:
          req.file != null || req.file != undefined
            ? `/img/${req.file.filename}`
            : category.image,
      }
    ).then((_) => {
      res.redirect("/categories");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Có lỗi xảy ra");
  }
};
