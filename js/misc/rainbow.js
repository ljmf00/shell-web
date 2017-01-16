function toRainbow(text, startColor = 0, interval = 1)
{
    var rainbowColors = ['red', 'yellow', 'lime', 'cyan', 'purple'];
    var ret = '';
    var j = startColor;
    var k = 1;
    var l = 1;
    for(i = 0; i < text.length; i++)
    {
        if(j == 5) j = 0;
        if(text.charAt(i) == '\n')
        {
            ret += '\n';
            i++;
            if(startColor == 5)
            {
                if(k == 5) k = 0;
                j = k;
            }
            else
            {
                if(startColor + k == 5) k = 0;
                j = startColor + k;
            }
            k++;
        }
        ret += '[[;' + rainbowColors[j] + ';black]' + text.charAt(i) + ']';
        if(l == interval)
        {
            l = 1;
            j++;
        }
        else {
            l++;
        }
    }
    return ret;
}
