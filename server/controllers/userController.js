const { Project, User, Section } = require("../db");
const { UserModel } = require("../db/models/User");

const handleError = (res) => {
  res.json({ message: "bad" });
};

const getUserDate = async (req, res) => {
  let date;
  const { year, month, day } = req.params;
  try {
    date = new Date(`${year}-${month}-${day}`);
  } catch (e) {
    handleError(res);
  }
  let notes = await DesignNote.find({ date: date });
  res.json(notes);
};

const setUserDate = async (req, res) => {
  const { section, placement, slug, wordCount, art, status, comments } =
    req.body;
  const { year, month, day } = req.params;

  const date = new Date(`${year}-${month}-${day}`);

  const query = {
    placement,
    slug,
    section,
    wordCount,
    art,
    comments,
    status,
    date,
  };
  if (section == "inserts") {
    let expiration = new Date();
    expiration.setDate(expiration.getDate() + 14);
    query.expireAt = expiration;
  }

  await DesignNote.create(query, (err, note) => {
    if (err) {
      handleError(res);
    }

    res.json(note);
  });
};

const updateUser = async (req, res) => {
  const {
    id,
    placement,
    slug,
    section,
    wordCount,
    art,
    comments,
    status,
    date,
  } = req.body;
  // TODO this is so bad
  const query = {};
  placement && (query.placement = placement);
  slug && (query.slug = slug);
  wordCount && (query.wordCount = wordCount);
  art && (query.art = art);
  comments && (query.comments = comments);
  status && (query.status = status);

  let entry = await DesignNote.findByIdAndUpdate(id, query);
  res.json(entry);
};

const removeUser = async (req, res) => {
  let { id } = req.params;

  let note = await DesignNote.findByIdAndRemove(id);
  if (note) {
    res.json(note);
  } else {
    res.json([]);
  }
};

const getCurrentUser = async (req, res) => {
  let userId = req.user["_id"];
  try {
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to get current user" });
  }
};

const getUserSection = async (req, res) => {
  let userId = req.params.userId;
  const user = await User.findById(userId);
  
  try {
    let userSection = await Section.findById(user.section);
    res.status(200).json({ userSection });
    
  } catch (error) {
    res.status(500).json({ error, message: "Failed to get user's sections."});
  }
};
  

module.exports = {
  handleError,
  getUserDate,
  setUserDate,
  updateUser,
  removeUser,
  getUserSection,
  getCurrentUser,
};
