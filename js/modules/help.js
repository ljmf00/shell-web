function showHelp(t, c, cmdobj)
{
    if(cmdobj.args.length > 1) t.error('Too many arguments');
    if(cmdobj.args.length != 1)
    {
        t.echo('Usage: help <command>\n');

        //t.echo("dig [-T] (address) Domain Information Groper, network administration command-line tool for querying Domain Name System (DNS) servers.");
        t.echo("geoip (address)\tShow geographical information of an IP Address");
    }

    if(cmdobj.args.length == 1) SwitchHelpCommands(t, cmdobj.args[1]);
}

function SwitchHelpCommands(t, cmd)
{
    switch(cmd)
    {
        default:
            t.error("Invalid command");
    }
}
