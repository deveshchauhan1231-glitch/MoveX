const requireAppUser = (req, res) => {
  if (!req.appUser) {
    res.status(404);
    throw new Error("User profile not found");
  }

  return req.appUser;
};

export default requireAppUser;
