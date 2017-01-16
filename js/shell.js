var shell = {
    commands: function(cmdobj, t, c) {
        switch (cmdobj.name) {
            case 'ping':
                t.echo("pong");
                break;
            case 'rainbow':
                t.echo(toRainbow(cmdobj.rest, Math.floor((Math.random() * 4))));
                break;
            case 'ipinfo':
                require(['js/modules/ipinfo'], function() {
                    var ipAddress = null;
                    if (cmdobj.args.length == 1) {
                        ipAddress = cmdobj.args[0];
                        if (ValidateIPaddress(ipAddress))
                            getIPInfo(t, ipAddress);
                        else
                            t.error("Invalid IP Address");
                    } else if (cmdobj.args.length > 1)
                        t.error("Too many arguments");
                    else
                        getIPInfo(t);
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
    }
};
