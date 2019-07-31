export default function formatCash(num) {
  console.log(num)
  if (num[0] == 'R' && num[1] == 'p') {
    return num
  } else {


    var p = num.toFixed(2).split(".");
    return (
      "Rp. " +
      p[0]
        .split("")
        .reverse()
        .reduce(function(acc, num, i, orig) {
          return num == "-" ? acc : num + (i && !(i % 3) ? "." : "") + acc;
        }, "") +
      "," +
      p[1]
    );
  }
  }