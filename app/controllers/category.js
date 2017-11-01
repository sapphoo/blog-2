/**
 * Created by Administrator on 2017/10/31.
 */
var Category = require('../models/category');
exports.write = function (req,res) {
    res.render('admin_category',{
        title:'添加分类',
        isWrite:true,
        isList:false
    });
};

exports.new = function (req,res) {
    console.log(req.body.category);
    var _category = req.body.category;
    var category = new Category(_category);
    category.articles = [];
    category.save(function (err,category) {
        if(err) {
            console.log(err);
            return res.redirect('/admin/category/write')
        }
        return res.redirect('/admin/category/list');
    });

};

exports.list = function (req,res) {
    Category.fetch(function (err,categories) {
        if(err) {
            console.log(err);
            return res.redirect('/admin');
        }
        res.render('admin_category',{
            title:'分类列表',
            isWrite:false,
            isList:true,
            categories:categories
        });
    });

};

exports.del = function (req,res) {
    var id = req.query.id;
    if (id) {
        Category.remove({_id:id},function (err,category) {
            if(err) {
                console.log('Delete movie is failed, ERR is ' + err);
                res.redirect('/admin/category/list');
            } else {
                res.json({success:1});
            }
        })
    }
};