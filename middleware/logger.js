const logger = (req, res, next) => {
  console.log("End middleware bichij bolno req ashiglaj bolno");
  next();
};

module.exports = { logger };
