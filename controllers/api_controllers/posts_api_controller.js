const PostModel = require('../../models/posts_model')

exports.listPost = async (req, res) => {
    try {
        const listPost = await PostModel.find().populate('idStore')
        res.json(listPost)
    } catch (err) {
        res.status(500).send("Có lỗi xảy ra")
        console.log(err)
    }
}

exports.listPostByIdStore = async (req, res) => {
    try {
        const idStore = req.params.idStore
        const listPost = await PostModel.find({ idStore: idStore }).populate('idStore')
        res.json(listPost)
    } catch (err) {
        res.status(500).send("Có lỗi xảy ra")
        console.log(err)
    }
}

exports.insertPost = async (req, res) => {
    try {
        const { idStore, title, content } = req.body

        if (idStore.length == 0) {
            res.status(400).send("Vui lòng nhập id của cửa hàng")
            return
        }

        if (title.length == 0) {
            res.status(400).send("Vui lòng nhập tiêu đề bài viết")
            return
        }

        if (content.length == 0) {
            res.status(400).send("Vui lòng nhập nội dung bài viết")
            return
        }

        const post = new PostModel({
            idStore: idStore, title: title, content: content,
            image: req.file == null || req.file == undefined ? null : `/img/${req.file.filename}`
        })

        await post.save()

        res.send("Thêm bài viết thành công")
    } catch (err) {
        res.status(500).send("Có lỗi xảy ra")
        console.log(err)
    }
}