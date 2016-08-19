module.exports = (resolve, rootDir) => {
	const config = {
		automock: false,
		moduleNameMapper: {
			'^[./a-zA-Z0-9$_-]+\\.(jpg|png|gif|eot|svg|ttf|woff|woff2|mp4|webm)$': resolve('config/jest/FileStub.js'),
			'^[./a-zA-Z0-9$_-]+\\.css$': resolve('config/jest/CSSStub.js')
		},
		persistModuleRegistryBetweenSpecs: true,
		scriptPreprocessor: resolve('config/jest/transform.js'),
		setupFiles: [
			resolve('config/polyfills.js')
		],
		setupTestFrameworkScriptFile: resolve('config/jest/environment.js'),
		testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
		// Allow three popular conventions:
		// **/__tests__/*.js
		// **/*.test.js
		// **/*.spec.js
		testRegex: '(__tests__/.*|\\.(test|spec))\\.js$',
		testEnvironment: 'node',
		verbose: true
	};
	if(rootDir) {
		config.rootDir = rootDir;
	}
	return config;
};