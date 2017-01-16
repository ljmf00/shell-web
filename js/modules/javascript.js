function javascriptInterpreter(t, c) {
    t.clear();
    t.echo("Javascript Interpreter");
    t.push(function(command, term) {
        if (command !== '') {
            try {
                var result = window.eval(command);
                if (result !== undefined) {
                    term.echo(new String(result));
                }
            } catch (e) {
                term.error(new String(e));
            }
        } else {
            term.echo('');
        }
    }, {
        prompt: 'js> '
    });
}
