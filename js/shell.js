var shell = {
    commands: function(obj, t, c) {
        switch (obj) {
            case 'ping':
                t.echo("pong");
                break;
            case 'ipinfo':
                require(['js/modules/ipinfo'], function(){
                    getIPInfo(t);
                });
                break;
            case '':
                t.echo('');
                break;
            default:
                t.error('shell: command not found: ' + c);
        }
    }
};
