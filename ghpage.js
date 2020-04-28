/* eslint-disable */
const {
  exec
} = require('child_process');
const ghpages = require('gh-pages');
const fs = require('fs');
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