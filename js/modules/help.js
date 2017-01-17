function showHelp(t, c, cmdobj)
{
    if(cmdobj.args.length > 1) t.error('Too many arguments');
    if(cmdobj.args.length != 1)
    {
        t.echo('Usage: help <command>\n\n');

        t.echo("");
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
