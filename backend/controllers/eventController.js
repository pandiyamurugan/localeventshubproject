import Event from "../models/Event.js";
import cloudinary from "../config/cloudinary.js";


export const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const createEvent = async (req, res) => {
  try {
    const { title, desc, mentor, startTime, endTime,category } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const streamUpload = (fileBuffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "events" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(fileBuffer);
      });

    const result = await streamUpload(req.file.buffer);

    const newEvent = new Event({
      title,
      desc,
      image: result.secure_url,
      mentor,
      startTime,
      endTime,
       category,
    });

    await newEvent.save();
    res.json(newEvent);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const { title, desc, mentor, startTime, endTime ,category} = req.body;

    let updateData = { title, desc, mentor, startTime, endTime, category };

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "events" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(req.file.buffer);
      });
      updateData.image = result.secure_url;
    }

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


export const deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};