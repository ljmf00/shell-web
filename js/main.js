/// "js/main.js" -*- JavaScript -*-
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

require(['css!styles/main.css']);
require(['async!shell.js']);

require([
    'css!jquery/terminal'
], function() {
    require([
        'jquery',
        'jquery/mousewheel',
        'jquery/terminal',
        'jquery/terminal-unixformatter'
    ], function($) {
        $(document).click(function() {
            $("pre#terminal").focus();
            $("pre#terminal").click();
        });

        $(document).keydown(function(ev) {
            if (ev.which == 116) {
                window.location.reload();
            }
        });

        jQuery(function($, undefined) {
            $('#terminal').terminal(function(cmd, term) {
                Shell.TerminalObj.Terminal = term;
                Shell.TerminalObj.Command = $.terminal.parse_command(cmd);
                Shell.TerminalVar.Command = cmd;
                term.set_prompt(Shell.Prompt());
                var buffered = false;
                if ((cmd.charAt(cmd.length - 1) == '\\') && !(cmd.charAt(cmd.length - 2) == '\\')) {
                    buffered = true;
                    var buffer = cmd.substr(0, cmd.length - 1);
                    term.push(function(cmd, term) {
                        if ((cmd.charAt(cmd.length - 1) == '\\') && !(cmd.charAt(cmd.length - 2) == '\\')) {
                            term.echo('');
                            buffer += cmd.substr(0, cmd.length - 1);
                        } else {
                            buffer += cmd.substr(0, cmd.length - 1);
                            cmd = buffer;
                            Shell.SwitchCommands(Shell.TerminalObj.Command, term, cmd);
                            buffered = false;
                            term.pop();
                        }
                        $("html").scrollTop($("pre#terminal.terminal").height());
                    }, {
                        prompt: '> ',
                        name: 'shell-ps2'
                    });
                    cmd = buffer;
                } else {
                    if ((cmd.charAt(cmd.length - 1) == '\\') && (cmd.charAt(cmd.length - 2) == '\\')) {
                        cmd = cmd.substr(0, cmd.length - 1);
                    }
                }
                if (!buffered) Shell.SwitchCommands(Shell.TerminalObj.Command, term, cmd);
                $("html").scrollTop($("pre#terminal.terminal").height());
            }, {
                greetings: Shell.Greetings,
                name: 'shell',
                prompt: Shell.Prompt()
            });
        });
    });
});
