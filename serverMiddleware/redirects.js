export default (req, res, next) => {
  // detect urls you'd like to redirect
  // call res.redirect(CODE, NEWURL)

  if (req.url === '/some-page/') {
    res.writeHead(301, { Location: 'redirect-page' });
    res.end();
  } else {
    next();
  }
}