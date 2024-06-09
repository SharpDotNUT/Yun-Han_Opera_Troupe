const fs = require('fs');
const path = require('path');
const ProgressBar = require('progress');

const rootDir = __dirname;  // 根目录
const validExtensions = ['.js', '.json', '.vue'];
const charSet = new Set();
let totalFiles = 0;
let processedFiles = 0;

// 计算总文件数
function countFiles(directory) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
        const fullPath = path.join(directory, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            countFiles(fullPath);
        } else if (validExtensions.includes(path.extname(fullPath))) {
            totalFiles++;
        }
    });
}

// 扫描目录
function scanDirectory(directory, bar) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
        const fullPath = path.join(directory, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            scanDirectory(fullPath, bar);
        } else if (validExtensions.includes(path.extname(fullPath))) {
            readFile(fullPath);
            processedFiles++;
            bar.tick();
        }
    });
}

// 读取文件内容
function readFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    for (const char of content) {
        charSet.add(char);
    }
}

// 输出结果
function writeOutput() {
    const output = Array.from(charSet).join('');
    fs.writeFileSync('output.txt', output, 'utf-8');
    console.log('Character set written to output.txt');
}

// 计算总文件数
countFiles(rootDir);

// 设置进度条
const bar = new ProgressBar('Processing files [:bar] :current/:total :percent :etas', {
    total: totalFiles,
    width: 40,
});

// 执行扫描
scanDirectory(rootDir, bar);

// 输出结果
writeOutput();
