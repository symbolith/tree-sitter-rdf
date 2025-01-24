module.exports = {
  comment: _ => token(prec(-1, /#.*/)),
}
