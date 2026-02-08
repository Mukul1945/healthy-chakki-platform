export const adminDashboard = (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
      admin: req.user
    });
  };
  