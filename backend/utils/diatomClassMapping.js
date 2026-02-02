/**
 * Mapping of class IDs from ML model to diatom species names
 * Update this based on your trained model's class indices
 */

const classMapping = {
  0: 'Navicula',
  1:'Nitzschia',
  2:'Gomphonema',
  3:'Cyclotella',
  4:'Fragilaria',
  5:'Asterionella',
  
};

/**
 * Get the diatom species name from class ID
 * @param {number} classId - The class ID from ML model
 * @returns {string} - The diatom species name
 */
function getSpeciesName(classId) {
  return classMapping[classId] || `Unknown Species (Class ${classId})`;
}

/**
 * Get all available classes
 * @returns {object} - The complete class mapping
 */
function getAllClasses() {
  return classMapping;
}

module.exports = {
  getSpeciesName,
  getAllClasses,
  classMapping,
};
