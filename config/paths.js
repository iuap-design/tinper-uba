var path = require('path');

var isEjected = (
	path.resolve(path.join(__dirname, '..')) ===
	path.resolve(process.cwd())
);

var isInCreateReactAppSource = (
	process.argv.some(arg => arg.indexOf('--debug-template') > -1)
);

function resolveOwn(relativePath) {
	return path.resolve(__dirname, relativePath);
}

function resolveApp(relativePath) {
	return path.resolve(relativePath);
}

if(isInCreateReactAppSource) {
	module.exports = {
		appBuild: resolveOwn('../build'),
		appHtml: resolveOwn('../template/index.html'),
		appPackageJson: resolveOwn('../package.json'),
		appSrc: resolveOwn('../template/src'),
		appNodeModules: resolveOwn('../node_modules'),
		ownNodeModules: resolveOwn('../node_modules')
	};
} else if(!isEjected) {
	module.exports = {
		appBuild: resolveApp('build'),
		appHtml: resolveApp('index.html'),
		appPackageJson: resolveApp('package.json'),
		appSrc: resolveApp('src'),
		appNodeModules: resolveApp('node_modules'),
		// this is empty with npm3 but node resolution searches higher anyway:
		ownNodeModules: resolveOwn('../node_modules')
	};
} else {
	// after eject: we're in ./config/
	module.exports = {
		appBuild: resolveApp('build'),
		appHtml: resolveApp('index.html'),
		appPackageJson: resolveApp('package.json'),
		appSrc: resolveApp('src'),
		appNodeModules: resolveApp('node_modules'),
		ownNodeModules: resolveApp('node_modules')
	};
}