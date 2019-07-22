const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { 
      "@primary-color": "#FDBA1D", 
      "@menu-dark-bg": "#6D747A",
    }
  })
);
