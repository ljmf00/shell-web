requirejs.config({
    paths: {
        'jquery': 'lib/jquery',
    }
});

require([''], function ($) {
	$(document).click(function () {
		$("pre#terminal").focus();
		$("pre#terminal").click();
	});

	$(document).keydown(function(ev){
		if(ev.which == 116) {
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
			if(!buffered) SwitchCommands(cmd, term);
			$("html").scrollTop($("pre#terminal.terminal").height());
		}, {
			greetings: '┬  ┌─┐┌─┐┌─┐┬─┐┬─┐┌─┐┬┬─┐┌─┐  ┌─┐┬ ┬┌─┐┬  ┬\n│  └─┐├┤ ├┤ ├┬┘├┬┘├┤ │├┬┘├─┤  └─┐├─┤├┤ │  │\n┴─┘└─┘└  └─┘┴└─┴└─└─┘┴┴└─┴ ┴  └─┘┴ ┴└─┘┴─┘┴─┘\n',
			name: 'shell',
			prompt: '$ '
		});
	});

	function SwitchCommands(c, t) {
	var cmdobj = $.terminal.parse_command(c);
		switch (cmdobj.name) {
			case 'ping':
				t.echo("pong");
				break;
			case '':
				t.echo('');
				break;
			default:
				t.error('shell: command not found: ' + c);
		}
	}
});
