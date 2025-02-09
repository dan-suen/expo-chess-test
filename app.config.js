const IS_DEV = process.env.APP_VARIANT === 'development';
export default {
  name: IS_DEV ? 'MyApp (Dev)' : 'MyApp',
  slug: 'Chess-expo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV ? 'com.derpderp91357.Chessexpo.dev' :'com.derpderp91357.Chessexpo'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    permissions: ['READ_EXTERNAL_STORAGE'],
    package: IS_DEV ? 'com.derpderp91357.Chessexpo.dev' :'com.derpderp91357.Chessexpo'
  },
  jsEngine: 'hermes',
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
    "fastRefresh": false
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: '7b28274a-0ab6-4789-8c7f-a1145f2560c8',
    },
  },
};
