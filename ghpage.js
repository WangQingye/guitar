/* eslint-disable */
const { exec } = require('child_process')
const ghpages = require('gh-pages')
const fs = require('fs')
readGuitars()
exec('npm run build', (error, stdout, stderr) => {
  if (error) {
    return;
  }
  console.log('dist ok');
  ghpages.publish('dist', function (err) {
    console.log('pub ok');
    delDir('dist');
    console.log('del dist');
  });
})
function delDir(path){
  let files = [];
  if(fs.existsSync(path)){
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()){
              delDir(curPath); //递归删除文件夹
          } else {
              fs.unlinkSync(curPath); //删除文件
          }
      });
      fs.rmdirSync(path);
  }
}
function readGuitars() {
  const guitars = []
  const files = fs.readdirSync('./public/imgs')
  files.forEach((file, index) => {
    let curPath = './public/imgs/' + file
    // 读取每一首歌曲文件夹下面的图片
    if (fs.statSync(curPath).isDirectory()) {
      const imgs = fs.readdirSync(curPath)
      guitars.push({
        [file]: imgs.map(img => {
          return `/guitar/imgs/${file}/${img}`
        })
      })
    }
  })
  const jsonText = JSON.stringify(guitars).replace(/\{/g, '').replace(/\}/g, '').replace(/\[/, '{').replace(/\]$/, '}')
  fs.writeFileSync('./src/guitar.json', jsonText)
}
