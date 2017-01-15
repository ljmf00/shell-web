function getIPInfo(t, ip = '') {
    $.ajaxSetup({
      async: false
    });
    var data;
    t.pause();
    $.getJSON('https://ipinfo.io/' + ip, function(ret) {
        data = {
            ip:ret.ip,
            hostname:ret.hostname,
            city:ret.city,
            region:ret.region,
            country:ret.country,
            location:ret.loc,
            isp:ret.org
        };
    }).fail(function() {

    });
    t.echo('IP Address: ' + data.ip);
    t.echo('Hostname: ' + data.hostname);
    t.echo('City: ' + data.city);
    t.echo('Region: ' + data.region);
    t.echo('Country: ' + data.country);
    t.echo('Location: ' + data.location);
    t.echo('ISP: ' + data.isp);
    t.resume();
}
