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
        'shell': 'js/shell'
    },
    waitSeconds: 0
});

require([
    'css!styles/main',
    'css!lib/jquery/ext-terminal'
], function() {
    require([
        'jquery',
        'jquery-mousewheel',
        'jquery-terminal',
        'jquery-terminal-unixformatter'
    ], function($) {
        // Nothing here!
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
                            SwitchCommands(cmd, term);
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
                if (!buffered) SwitchCommands(cmd, term);
                $("html").scrollTop($("pre#terminal.terminal").height());
            }, {
                greetings: '┬  ┌─┐┌─┐┌─┐┬─┐┬─┐┌─┐┬┬─┐┌─┐  ┌─┐┬ ┬┌─┐┬  ┬\n│  └─┐├┤ ├┤ ├┬┘├┬┘├┤ │├┬┘├─┤  └─┐├─┤├┤ │  │\n┴─┘└─┘└  └─┘┴└─┴└─└─┘┴┴└─┴ ┴  └─┘┴ ┴└─┘┴─┘┴─┘\n',
                name: 'shell',
                prompt: '$ '
            });
        });

        function SwitchCommands(c, t) {
            var cmdobj = $.terminal.parse_command(c);
            require(['shell'], function(){
                shell.commands(cmdobj.name, t, c);
            });
        }
    });
});
