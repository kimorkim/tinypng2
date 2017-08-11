import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';

import Vue from 'vue';
import Progress from './renderer/progress.vue';
import Buttons from './renderer/buttons.vue';
const app = new Vue(Progress).$mount('#progress');
const app2 = new Vue(Buttons).$mount('#buttons');
// app.text = "Electron Forge with Vue.js!";

const destImage = path.resolve(__dirname, 'renderer', 'images');
const destThumb = path.resolve(__dirname, 'renderer', 'thumbs');
const uploads = path.resolve(__dirname, 'renderer', 'uploads');

function exportImages() {
    app.max_count = 0;
    app.count = 0;
    const target = uploads;

    if(!fs.existsSync(destImage)) {
        fs.mkdirSync(destImage)
    }

    if(!fs.existsSync(destThumb)) {
        fs.mkdirSync(destThumb)
    }

    getImage(target, 'image');
    getImage(target, 'thumb');
}

function getImage(target, type) {
    fs.stat(target, (err, stats)=> {
        if(stats.isDirectory()) {
            fs.readdir(target, (err, fileList)=> {
                fileList.forEach((item)=> {
                    if(item === type) {
                        copyImage(path.resolve(target, item), type);
                    } else {
                        getImage(path.resolve(target, item), type);
                    }
                });
            });
        }
    });
}

function copyImage(target, type) {
    fs.readdir(target, (err, fileList)=> {
        if(fileList.length > 1) {
            console.log(fileList);
        }
        fileList.forEach((item)=> {
            app.max_count++;
            let source = path.resolve(target, item);
            if(type === 'image') {
                let dest = path.resolve(destImage, item);
                fse.copy(source, dest, (err)=> {
                    if(err) {
                        console.error(err);
                    }
                    app.count++;
                });
            } else {
                let dest = path.resolve(destThumb, item);
                fse.copy(source, dest, (err)=> {
                    if(err) {
                        console.error(err);
                    }
                    app.count++;
                });
            }
        });
    });
}

function importImages() {
    app.max_count = 0;
    app.count = 0;

    if(fs.existsSync(uploads)) {
        fse.mkdirsSync(uploads);
    }
    if(fs.existsSync(destImage)) {
        setImage('image');
    }
    if(fs.existsSync(destThumb)) {
        setImage('thumb');
    }
}

function setImage(type) {
    let source;
    if(type === 'image') {
        source = destImage;
    } else {
        source = destThumb;
    }

    fs.stat(source, (err, stats)=> {
        if(stats.isDirectory()) {
            fs.readdir(source, (err, fileList)=> {
                fileList.forEach((item)=> {
                    app.max_count++;
                    let sourceFile = path.resolve(source, item);
                    let destDir = path.resolve(uploads, item.substr(0, 2), item.substr(2, 2), type);
                    let destFile = path.resolve(destDir, item);

                    if(!fs.existsSync(destDir)) {
                        fse.mkdirsSync(destDir);
                    }

                    fse.copy(sourceFile, destFile, (err)=> {
                        if(err) {
                            console.error(err);
                        }
                        app.count++;
                    });
                });
            });
        }
    });
}
