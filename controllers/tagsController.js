import Tags from "../models/Tags.js";

const getTags = async (req, res) => {
  try {
    const tags = await Tags.find({});
    if (!tags || tags.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tags found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Tags fetched successfully",
      tags: tags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured while getting tags",
      error: error.message,
    });
  }
};
const addTag = async (req, res) => {
  const { name, simpleName } = req.body;
  try {
    const existingTag = await Tags.findOne({ simpleName: simpleName });
    if (existingTag) {
      return res.status(400).json({
        success: false,
        message: "Tag with this simple name already exists",
      });
    }
    const newTag = await Tags.create({
      name: name,
      simpleName: simpleName,
    });
    await newTag.save();
    res.status(201).json({
      success: true,
      message: "Tag added successfully",
      tag: newTag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured while adding tag",
      error: error.message,
    });
  }
};
const updateTag = async (req, res) => {
  const { id } = req.params;
  console.log(req.params, req.body);
  const { name, simpleName } = req.body;
  try {
    const tag = await Tags.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        simpleName: simpleName,
      },
      { new: true } // This option returns the updated document
    );
    if (!tag) {
      return res.status(404).json({
        success: false,
        message: "Tag not found",
      });
    }
    // Alternatively, you can also find the tag by ID and then update its fields
    // const tag = await Tags.findById(id);
    // if (!tag) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Tag not found",
    //   });
    // }
    // tag.name = name || tag.name;
    // tag.simpleName = simpleName || tag.simpleName;
    // await tag.save();
    res.status(200).json({
      success: true,
      message: "Tag updated successfully",
      tag: tag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured while updating tag",
      error: error.message,
    });
  }
};
const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tags.findByIdAndDelete({ _id: id });
    if (!tag) {
      return res.status(404).json({
        success: false,
        message: "Tag not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Tag deleted successfully",
      tag: tag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured while deleting tag",
      error: error.message,
    });
  }
};

export { getTags, addTag, updateTag, deleteTag };
