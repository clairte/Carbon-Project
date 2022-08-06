const Router = require("express-promise-router");

const { isAdmin } = require("../../controllers/adminController");
const {
    createSection,
    deleteSection,
    getAllSections,
    assignSection,
    removeSection,
    } = require("../../controllers/sectionController");

const router = new Router();

router.post("/createSection", isAdmin, createSection);
router.delete("/:sectionid", isAdmin, deleteSection);
router.get("/sections", isAdmin, getAllSections);
router.post("/assign", isAdmin, assignSection);
router.post("/remove", isAdmin, removeSection);

module.exports = router;

