import Vue from 'vue'

Vue.filter('currencyFormat', function (value) {
    if (!value) return ''

    value = Number(value).toFixed(2);

    var re = '\\d(?=(\\d{' + (3) + '})+' + (2 > 0 ? '\\D' : '$') + ')',
        num = Number(value).toFixed(Math.max(0, ~~2));

    return (',' ? num.replace('.', ',') : num).replace(new RegExp(re, 'g'), '$&' + ('.' || ','));
})

Vue.filter('currencyCode', function (value) {
    if (!value) return '';

    value = value.toLocaleLowerCase();

    if(value == 'tl')
        return '₺';
    else if(value == 'usd')
        return '$';
    else if(value == 'euro')
        return '€';
    else
        return value;
})