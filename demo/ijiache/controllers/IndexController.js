/**
 * Created by wenguoqing on 2016/2/28.
 */
"use strict";

exports.index = function (req, res, next) {
    res.render('index.html');
};
exports.about = function (req, res, next) {
    res.render('index/page_about.html');
};
exports.contact = function (req, res, next) {
    res.render('index/page_contact.html');
};
exports.timeline = function (req, res, next) {
    res.render('index/page_timeline.html');
};
exports.news = function (req, res, next) {
    res.render('index/page_news.html');
};
exports.zhaopin = function (req, res, next) {
    res.render('index/page_news.html');
};