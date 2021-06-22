module.exports = ({ file }) => {
    return {
        plugins: {
            'postcss-px-to-viewport': {
                // viewportWidth:
                //   file && file.dirname && file.dirname.includes('vant') ? 375 : 750,
                viewportWidth: 750,
                unitPrecision: 5, //指定 px 转换为视窗单位值的小数位数(很多时候无法整除)
                viewportUnit: 'vw', //指定需要转换成的视窗单位，建议使用vw
                fontViewportUnit: 'vw',
                selectorBlackList: ['.mint-toast-text'], // 指定不需要转换的类
                minPixelValue: 2, //小于或等于 1px 不转换为视窗单位.
                mediaQuery: false, //允许在媒体查询中转换px
            }
        }
    }
}