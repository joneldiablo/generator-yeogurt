'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var colors = require('colors');
var _ = require('lodash');


var YeogurtGenerator = module.exports = function YeogurtGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(YeogurtGenerator, yeoman.generators.Base);

YeogurtGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var yeogurtLogo = '' +
        ' __     __                         _   \n'.red +
        ' \\ \\   / /        '.red + 'Welcome To'.green + '      | |  \n'.red +
        '  \\ \\_/ /__  ___   __ _ _   _ _ __| |_ \n'.red +
        '   \\   / _ \\/ _ \\ / _` | | | | \\\'__| __|\n'.red +
        '    | |  __/ (_) | (_| | |_| | |  | |_ \n'.red +
        '    |_|\\___|\\___/ \\__, |\\__,_|_|   \\__|\n'.red +
        '                   __/ |               \n'.red +
        '                  |___/                  '.red;

    // have Yeogurt greet the user.
    console.log(yeogurtLogo);

    var prompts = [{
        name: 'projectName',
        message: 'What would you like to' + ' name your project'.blue + '?',
        default: 'sample'
    }, {
        type: 'list',
        name: 'versionControl',
        message: 'Which version control software are you using?',
        choices: ['Git', 'SVN', 'None (I like to live on the edge)'],
    }, {
        type: 'list',
        name: 'useModernizr',
        message: 'Which HTML templating language would you like to use?',
        choices: ['Jade', 'None (Just plain HTML)'],
    }, {
        type: 'list',
        name: 'cssOption',
        message: 'Which CSS preprocessor would you like to use?',
        choices: ['LESS', 'SASS', 'None (Just plain CSS)'],
    }, {
        type: 'list',
        name: 'javascriptOption',
        message: 'Which JavaScript preprocessor would you like to use?',
        choices: ['Coffeescript', 'None (Just plain JavaScript)'],
    }, {
        type: 'confirm',
        name: 'useModernizr',
        message: 'Would you like to include modernizr?',
        default: 'true'
    }, {
        type: 'checkbox',
        name: 'linters',
        message: 'Select and Linters you would like to have check your code:',
        choices: [{name: 'JSHint', checked: true}, 'CSSLint']
    }];

    this.prompt(prompts, function (props) {
        this.projectName = props.projectName;
        this.versionControl = props.versionControl;
        this.htmlOption = props.htmlOption;
        this.cssOption = props.cssOption;
        this.javascriptOption = props.javascriptOption;
        this.useModernizr = props.useModernizr;
        this.linters = props.linters;

        cb();
    }.bind(this));
};

YeogurtGenerator.prototype.app = function app() {
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('index.html', 'index.html');

    this.template('_bower.json', 'bower.json');
    this.template('_config.json', 'config.json');
    this.template('_package.json', 'package.json');
};

YeogurtGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    if (_.contains(this.linters, 'JSHint')) {
        this.copy('jshintrc', '.jshintrc');
    }
    if (_.contains(this.linters, 'CSSLint')) {
        this.copy('csslintrc', '.csslintrc');
    }
};

YeogurtGenerator.prototype.runtime = function runtime() {
    this.copy('bowerrc', '.bowerrc');
    if (this.versionControl === 'Git') {
        this.copy('gitignore', '.gitignore');
        this.copy('gitattributes', '.gitattributes');
    }
    if (this.versionControl === 'SVN') {
        this.copy('svnignore', '.svnignore');
    }
};
