import Bookmark from "../models/Bookmark.js";


export const addBookmark = async (req, res) => {
  const { userId, eventId } = req.body;

  if (!userId || !eventId) {
    return res.status(400).json({ msg: "Missing data" });
  }

  const bookmark = await Bookmark.create({ userId, eventId });
  res.json(bookmark);
};


export const removeBookmark = async (req, res) => {
  const { userId, eventId } = req.body;

  await Bookmark.findOneAndDelete({ userId, eventId });

  res.json({ msg: "Removed" });
};


export const getBookmarks = async (req, res) => {
  const { userId } = req.params;

  if (!userId || userId === "null") {
    return res.status(400).json({ msg: "Invalid userId" });
  }

  const bookmarks = await Bookmark.find({ userId }).populate("eventId");

  res.json(bookmarks);
};