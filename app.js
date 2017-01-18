requirejs.config({
    map: {
        '*': {
            'css': 'lib/require-css'
        }
    },
    paths: {
        'jquery': 'lib/jquery',
        'jquery-terminal': 'lib/jquery/ext-terminal',
        'jquery-terminal-unixformatter': 'lib/jquery/ext-terminal/ext-unix-formatter',
        'jquery-mousewheel': 'lib/jquery/ext-mousewheel',
        'shell': 'js/shell',
        'misc-rainbow': 'js/misc/rainbow'
    },
    waitSeconds: 0
});

// TODO: Fix dependencies

require(['shell'], function(){
    // Nothing here
});

require([
    'css!styles/main',
    'css!jquery-terminal'
], function() {
    require([
        'jquery',
        'jquery-mousewheel',
        'jquery-terminal',
        'jquery-terminal-unixformatter'
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
