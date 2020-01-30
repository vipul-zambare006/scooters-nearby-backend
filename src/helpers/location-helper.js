function convertToGeoJSONObject(lng, lat) {
  return {
    location: {
      type: "Point",
      coordinates: [lng, lat]
    },
    isActive: true
  };
}
exports.convertToGeoJSONObject = convertToGeoJSONObject;
