const oxford = require('project-oxford');
const fs = require('fs');
const debug = require('debug')('oxford');

const getFile = require('../utility/get-file');

module.exports = {
  async face({ url, customConfig = {} }) {
    const key = '848286f0d8e74857a0c4c981b8762f43';
    const defaultConfig = {
      analyzesFaceLandmarks: true,
      analyzesAge: true,
      analyzesGender: true,
      analyzesHeadPose: true,
      analyzesSmile: true,
      analyzesFacialHair: true,
    };
    const config = Object.assign({}, defaultConfig, customConfig);
    const apiCall = ({ client, config }) => {
      return client.face.detect(config);
    };

    return _helper({ url, key, apiCall, config });
  },
  async emotion({ url, customConfig = {} }) {
    const key = '92d9b25301a949c6b85ad42e876e066f';
    const defaultConfig = {};
    const config = Object.assign({}, defaultConfig, customConfig);
    const apiCall = ({ client, config }) => {
      return client.emotion.analyzeEmotion(config);
    };
    return _helper({ url, key, apiCall, config });
  }
};

async function _helper({ url, key, apiCall, config }) {
  const client = new oxford.Client(key);
  const path = await getFile(url);
  debug('path: ', path);
  config.path = path;
  let result;
  try {
    result = await apiCall({ client, config });
    debug('result: ', result);
  } catch (err) {
    throw err;
  } finally {
    if (fs.existsSync(path)) fs.unlink(path, debug);
    return result;
  }
}
