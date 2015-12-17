/**
 * Created by Administrator on 2015/12/17.
 */
require('date-utils');
var now = new Date();
console.log(now.toFormat('YYYY-MM-DD HH24:MI:SS'));
console.log(now.getTime());

now.add({years: 2});
console.log(now);