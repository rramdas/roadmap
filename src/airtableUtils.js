import Airtable from "airtable";
// const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
// const AIRTABLE_BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
// const base = new Airtable({ apiKey: 'patXoKE30cfdzGyiY.cd7f900e821b989121d5ae3b697382588064a8330798745c8a406eb98e45c305' }).base('app86LcWij0hDTXST');

const AIRTABLE_TABLE_NAME = 'features';
const base = new Airtable({ apiKey: 'patXoKE30cfdzGyiY.cd7f900e821b989121d5ae3b697382588064a8330798745c8a406eb98e45c305' }).base('app86LcWij0hDTXST');


export const saveFeatureToAirtable = (feature) => {
  return new Promise((resolve, reject) => {
    base('features').create([
      {
        "fields": {
          "Title": feature.title,
          "Description": feature.description,
          "Status": "Coming Next",
        }
      }
    ], (err, records) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(records);
    });
  });
};

export const updateFeatureInAirtable = async (featureId, updatedData) => {
  console.log('feature id: ' + featureId);
  console.log('updated data: ' + updatedData);
  try {
    const record = await base('features').update([
      {
        id: featureId,
        fields: {
          Status: updatedData,
        }
      },
    ]);
    return record;
  } catch (error) {
    console.error("Error updating feature:", error);
    throw error;
  }
};

export default saveFeatureToAirtable;