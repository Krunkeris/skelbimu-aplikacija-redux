const express = require("express");
const {
  authenticateJwt,
  authenticateUserRole,
} = require("../middleware/protectedRoutes.middleware");

const {
  protectedRouteToUserHome,
  protectedRouteToAdminHome,
  protectedRouteToHome,
} = require("../controllers/protectedRouteController");

const router = express.Router();

router.get(
  "/userHome",
  authenticateJwt,
  authenticateUserRole("user"),
  protectedRouteToUserHome
);

router.get(
  "/adminHome",
  authenticateJwt,
  authenticateUserRole("admin"),
  protectedRouteToAdminHome
);

router.get("/home", authenticateJwt, protectedRouteToHome);

module.exports = router;
