/// "js/shell.js" -*- JavaScript -*-
///  Web-based Shell in Javascript
///    _________.__           .__  .__             __      __      ___.
///   /   _____/|  |__   ____ |  | |  |           /  \    /  \ ____\_ |__
///   \_____  \ |  |  \_/ __ \|  | |  |    ______ \   \/\/   // __ \| __ \  | @repo github.com:ljmf00/shell-web.git
///   /        \|   Y  \  ___/|  |_|  |__ /_____/  \        /\  ___/| \_\ \ | @author Luís Ferreira
///  /_______  /|___|  /\___  >____/____/           \__/\  /  \___  >___  / | @license GNU Public License v3
///          \/      \/     \/                           \/       \/    \/
///  Copyright (c) 2016 - Luís Ferreira. All right reserved
///  More information in: https://github.com/ljmf00/ (Github Page)

/// This file is part of the Shell-Web. This framework is free
/// software; you can redistribute it and/or modify it under the
/// terms of the GNU Lesser General Public License, v3.

var Shell = {
    TerminalObj: {
        Command: null, // Defined by $.terminal instance
        Terminal: null // Defined by $.terminal instance
    },
    TerminalVar: {
        Command: null // Defined by $.terminal instance
    },
    Greetings: null,
    currentHostname: 'client-side',
    currentUser: 'guest',
    currentPath: '~',
    SwitchCommands: function(cmdobj, t, c) {
        switch (cmdobj.name) {
            case 'help':
                require(['js/modules/help'], function() {
                    showHelp(t, c, cmdobj);
                });
                break;
            case 'ping':
                t.echo("pong");
                break;
            case 'rainbow':
                t.echo(toRainbow(cmdobj.rest, Math.floor((Math.random() * 4))));
                break;
            case 'geoip':
                require(['module/geoip'], function() {
                    var ipAddress = null;
                    if (cmdobj.args.length == 1) {
                        ipAddress = cmdobj.args[0];
                        if (ValidateIPaddress(ipAddress))
                            getGeoIPAPIInfo(t, ipAddress);
                        else
                            t.error("Invalid IP Address");
                    } else if (cmdobj.args.length > 1)
                        t.error("Too many arguments");
                    else
                        getGeoIPAPIInfo(t);
                });
                break;
            case 'js':
            case 'javascript':
                require(['js/modules/javascript'], function() {
                    javascriptInterpreter(t, c);
                });
                break;
            case '':
                t.echo('');
                break;
            default:
                t.error('shell: command not found: ' + cmdobj.name);
        }
    },
    Prompt: function() {
        return this.currentHostname + '@' + this.currentUser + ': ' + this.currentPath + '$ ';
    }
};

require(['module/rainbow'], function() {
    Shell.Greetings = rainbowString(' ┌─┐┬ ┬┌─┐┬  ┬   ┬ ┬┌─┐┌┐ \n └─┐├─┤├┤ │  │───│││├┤ ├┴┐\n └─┘┴ ┴└─┘┴─┘┴─┘ └┴┘└─┘└─┘\n', 4, null, true) + rainbowString('A Powerful, Secure and Web-based Shell', 1, null, false, true) + '\n';
});
