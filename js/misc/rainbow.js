function rainbowString(text, interval = 1, startColor = 0, isStartCRandom = false, isRandom = false, randomSeed = null) {
    // TODO: randomSeed need to be implemented

    var rainbowColors = ['red', 'yellow', 'lime', 'cyan', 'purple'];
    var ret = '';
    var s;
    if (isStartCRandom == true || isRandom == true) s = Math.floor((Math.random() * 5));
    else s = startColor;
    var j = s;
    var k = 1;
    var l = 1;
    for (i = 0; i < text.length; i++) {
        if (j == 5) j = 0;
        if (text.charAt(i) == '\n') {
            ret += '\n';
            i++;
            if (isRandom == false) {
                if (s == 5) {
                    if (k == 5) k = 0;
                    j = k;
                } else {
                    if (s + k == 5) k = 0;
                    j = s + k;
                }
                k++;
            }
        }
        ret += '[[;' + rainbowColors[j] + ';black]' + text.charAt(i) + ']';
        if (l == interval) {
            l = 1;
            if(isRandom == true) j = Math.floor((Math.random() * 5));
            else j++;
        } else {
            l++;
        }
    }
    return ret;
}
