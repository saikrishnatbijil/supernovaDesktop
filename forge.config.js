module.exports = {
  packagerConfig: {
    icon: './icons/logo', // no file extension required
    extendInfo: {
      LSUIElement: 1, // set LSUIElement to 1 to hide the app icon and run as a menu bar app
    },
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
