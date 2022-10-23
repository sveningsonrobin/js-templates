const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

fs.mkdirSync(path.resolve('./dist-deploy'));
fs.mkdirSync(path.resolve('./dist-deploy/dist'));

fs.copyFileSync(
    path.resolve('./dist/bundle.js'),
    path.resolve('./dist-deploy/dist/bundle.js')
);

fs.copyFileSync(
    path.resolve('./app.yaml'),
    path.resolve('./dist-deploy/app.yaml')
);

fs.copyFileSync(
    path.resolve('./.gitignore'),
    path.resolve('./dist-deploy/.gitignore')
);

fs.copyFileSync(
    path.resolve('./.gcloudignore'),
    path.resolve('./dist-deploy/.gcloudignore')
);

const packageJson = require('./package.json');

delete packageJson.devDependencies;

fs.writeFileSync(
    path.resolve('./dist-deploy/package.json'),
    JSON.stringify(packageJson, null, 4)
);

exec(
    'yarn install',
    {
        cwd: path.resolve('./dist-deploy'),
    },
    (err) => {
        if (err) {
            throw new Error('Failed to yarn install.');
        }
    }
);
