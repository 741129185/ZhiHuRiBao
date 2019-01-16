// 引入后台ajax模块
const ajax = require('superagent')
// 引入假数据文件
const data = require('./themes.json')
const themesList = data.THEMES.others


module.exports = {
  devServer: {
    before: function (app) { // 请求一个本地的列表数据
      app.get('/api/themes', (req, res) => {
        res.json({data: themesList})
      }),
        app.get('/api/more', (req, res) => {
          let date = req.query.date
          ajax.get(`https://news-at.zhihu.com/api/4/news/before/${date}`)
            .end((err, data) => {
              if (err) {
                console.log(err)
              }
              res.json({
                data: data.text
              })
            })
        }),
        app.get('/api/detail', (req, res) => {
          let id = req.query.id
          ajax.get(`https://news-at.zhihu.com/api/4/news/${id}`)
            .end((err, data) => {
              if (err) {
                console.log(err)
              }
              res.json({
                data: data.text
              })
            })
        }),
        app.get('/api/extra', (req, res) => {
          let id = req.query.id
          ajax.get(`https://news-at.zhihu.com/api/4/story-extra/${id}`)
            .end((err, data) => {
              if (err) {
                console.log(err)
              }
              res.json({
                data: data.text
              })
            })
        }),
        app.get('/api/comments/long', (req, res) => {
          let id = req.query.id
          ajax.get(`https://news-at.zhihu.com/api/4/story/${id}/long-comments`)
            .end((err, data) => {
              if (err) {
                console.log(err)
              }
              res.json({
                data: data.text
              })
            })
        }),
        app.get('/api/comments/short', (req, res) => {
          let id = req.query.id
          ajax.get(`https://news-at.zhihu.com/api/4/story/${id}/short-comments`)
            .end((err, data) => {
              if (err) {
                console.log(err)
              }
              res.json({
                data: data.text
              })
            })
        })
    },
    proxy: { // 请求跨域api - 今日最新新闻
      '/api/news': {
        changeOrigin: true,
        target: "https://news-at.zhihu.com/api/4/news/latest",
        pathRewrite: {'^/api/news': ''}
      },
    },
  }
}
