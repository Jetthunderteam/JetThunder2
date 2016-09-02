module.exports = function() {
    var app = 'app/';
    var bowerComponents = app+'bower_components/';

    var config = {
        client: app,
        dependantJS: [
        ],
        dependentCSS: [
        ],
        appJS: [
        ],
        appSCSS: [
        ],
        appHTML: [
        ],
        appImages: [
        ]
    };
    return config;
};