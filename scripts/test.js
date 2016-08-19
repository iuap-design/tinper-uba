process.env.NODE_ENV = 'test';

const createJestConfig = require('./utils/createJestConfig');
const jest = require('jest');
const path = require('path');
const paths = require('../config/paths');

const argv = process.argv.slice(2);

const index = argv.indexOf('--debug-template');
if(index !== -1) {
	argv.splice(index, 1);
}

argv.push('--config', JSON.stringify(createJestConfig(
	relativePath => path.resolve(__dirname, '..', relativePath),
	path.resolve(paths.appSrc, '..')
)));

jest.run(argv);