export default {
    plugins: [
      {
        name: 'preset-default',
        params: {
            overrides: {
                inlineStyles: false,
                convertStyleToAttrs: true,
                cleanupListOfValues: true,
                removeViewBox: false,
                cleanupEnableBackground: false,
                removeHiddenElems: false,
                convertShapeToPath: false,
                moveElemsAttrsToGroup: false,
                moveGroupAttrsToElems: false,
                convertPathData: false,
                sortAttrs: true,
              }
        },
      },
    ],
  };