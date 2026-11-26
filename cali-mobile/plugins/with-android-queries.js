// Android 11+ hides other apps from getLaunchIntentForPackage unless listed in <queries>.
const { withAndroidManifest } = require('expo/config-plugins');

module.exports = function withAndroidQueries(config, packages = []) {
  return withAndroidManifest(config, (cfg) => {
    const manifest = cfg.modResults.manifest;
    const queries = (manifest.queries ??= [{}])[0];
    const existing = (queries.package ??= []);
    for (const name of packages) {
      if (!existing.some((p) => p.$['android:name'] === name)) {
        existing.push({ $: { 'android:name': name } });
      }
    }
    return cfg;
  });
};
