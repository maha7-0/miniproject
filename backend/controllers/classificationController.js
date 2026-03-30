const ClassificationRecord = require("../models/ClassificationRecord");
const DiatomClass = require("../models/DiatomClass");
const mockClassifier = require("../utils/mockClassifier");
const axios = require("axios");
const FormData = require("form-data");
const { Readable } = require("stream");
const { getSpeciesName } = require("../utils/diatomClassMapping");

// ML Service configuration
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

/**
 * Classify an uploaded image
 */
const classifyImage = async (req, res) => {
  const { imageBase64 } = req.body;
  const userId = req.user.id;

  if (!imageBase64) {
    return res.status(400).json({ message: "Image data is required" });
  }

  try {
    let classification;

    try {
      // Try to call ML service for prediction
      const imageBuffer = Buffer.from(imageBase64, "base64");

      // Create FormData with the image
      const form = new FormData();
      const stream = Readable.from(imageBuffer);
      form.append("file", stream, "image.jpg");

      const response = await axios.post(`${ML_SERVICE_URL}/predict`, form, {
        headers: form.getHeaders(),
        timeout: 30000,
      });

      const { classIndex, className } = getSpeciesName(response.data.class_id);
      console.log(response.data);
      classification = {
        classIndex,
        className,
        confidence: 0.95,
      };
      console.log("✓ ML Service prediction:", classification);
    } catch (mlError) {
      console.warn(
        "⚠ ML Service unavailable, using mock classifier:",
        mlError.message,
      );
      // Fallback to mock classifier if ML service is down
      // Use mock classifier and map to correct classIndex/className
      const mockResult = mockClassifier.classify(imageBase64);
      // Find index in mapping array
      const { CLASS_LABELS } = require("../utils/diatomClassMapping");
      let classIndex = CLASS_LABELS.indexOf(mockResult.className);
      if (classIndex === -1) classIndex = 0; // fallback to 0 if not found
      classification = {
        classIndex,
        className: CLASS_LABELS[classIndex],
        confidence: mockResult.confidence,
      };
    }

    // Fetch diatom class details from database
    const diatomClass = await DiatomClass.findOne({
      name: classification.className,
    });

    // Create classification record
    const record = new ClassificationRecord({
      userId,
      imageUrl: `data:image/jpeg;base64,${imageBase64.substring(0, 100)}...`,
      predictedClass: classification.className,
      confidence: classification.confidence,
    });

    await record.save();

    // Populate full response with diatom class details
    const fullDiatomClass = diatomClass || {
      name: classification.className,
      scientificDescription: "Scientific description not available",
      environmentalSignificance: "Environmental significance not available",
      impacts: "Ecological impacts not available",
    };

    res.json({
      success: true,
      classification: {
        classIndex: classification.classIndex,
        className: classification.className,
        confidence: classification.confidence,
        scientificDescription: fullDiatomClass.scientificDescription,
        environmentalSignificance: fullDiatomClass.environmentalSignificance,
        impacts: fullDiatomClass.impacts,
        recordId: record._id,
        timestamp: record.createdAt,
      },
    });
  } catch (err) {
    console.error("Classification error:", err);
    res.status(500).json({
      success: false,
      message: "Classification error",
      error: err.message,
    });
  }
};

/**
 * Get user's classification history
 */
const getClassificationHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const records = await ClassificationRecord.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);

    // Enrich with diatom class details
    const enrichedRecords = await Promise.all(
      records.map(async (record) => {
        const diatomClass = await DiatomClass.findOne({
          name: record.predictedClass,
        });
        return {
          ...record.toObject(),
          diatomClass: diatomClass || null,
        };
      }),
    );

    res.json({
      success: true,
      records: enrichedRecords,
    });
  } catch (err) {
    console.error("History fetch error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching history",
      error: err.message,
    });
  }
};

/**
 * Get a single classification record
 */
const getClassificationRecord = async (req, res) => {
  const { recordId } = req.params;
  const userId = req.user.id;

  try {
    const record = await ClassificationRecord.findById(recordId);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Check ownership
    if (record.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const diatomClass = await DiatomClass.findOne({
      name: record.predictedClass,
    });

    res.json({
      success: true,
      record: {
        ...record.toObject(),
        diatomClass: diatomClass || null,
      },
    });
  } catch (err) {
    console.error("Record fetch error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching record",
      error: err.message,
    });
  }
};

/**
 * Get all available diatom classes
 */
const getAllDiatomClasses = async (req, res) => {
  try {
    const classes = await DiatomClass.find();
    res.json({
      success: true,
      classes,
    });
  } catch (err) {
    console.error("Classes fetch error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching classes",
      error: err.message,
    });
  }
};

module.exports = {
  classifyImage,
  getClassificationHistory,
  getClassificationRecord,
  getAllDiatomClasses,
};
