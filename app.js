/// "app.js" -*- JavaScript -*-
///  Web-based Shell in Javascript
///    _________.__           .__  .__             __      __      ___.
///   /   _____/|  |__   ____ |  | |  |           /  \    /  \ ____\_ |__   | @repo github.com:ljmf00/shell-web.git
///   \_____  \ |  |  \_/ __ \|  | |  |    ______ \   \/\/   // __ \| __ \  | @branch master
///   /        \|   Y  \  ___/|  |_|  |__ /_____/  \        /\  ___/| \_\ \ | @author Luís Ferreira
///  /_______  /|___|  /\___  >____/____/           \__/\  /  \___  >___  / | @license GNU Public License v3
///          \/      \/     \/                           \/       \/    \/
///  Copyright (c) 2016 - Luís Ferreira. All right reserved
///  More information in: https://github.com/ljmf00/ (Github Page)

/// This file is part of the Shell-Web. This framework is free
/// software; you can redistribute it and/or modify it under the
/// terms of the GNU Lesser General Public License, v3.

requirejs.config({
    map: {
        '*': {
            //RequireJS Plugins
            'css': 'lib/require/css',
            'async': 'lib/require/async'
        }
    },
    paths: {
        //jQuery Libraries
        'jquery': 'lib/jquery',
        'jquery/terminal': 'lib/jquery/ext-terminal',
        'jquery/terminal-unixformatter': 'lib/jquery/ext-terminal/ext-unix-formatter',
        'jquery/mousewheel': 'lib/jquery/ext-mousewheel',

        //Modules
        'module/rainbow': 'js/modules/rainbow',
        'module/geoip': 'js/modules/geoip',

        //Shell
        'shell': 'js/shell',
        'shell/main':'js/shell/main'
    },
    waitSeconds: 0
});

require(['async!js/main.js']);
