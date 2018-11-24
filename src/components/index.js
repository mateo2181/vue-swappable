import Vue from "vue";
import SwappableGrid from './SwappableGrid.vue';
// import ResponsiveGridLayout from './ResponsiveGridLayout.vue';


const SwapGrid = {
    // ResponsiveGridLayout,
    SwappableGrid
}

// module.exports = VueGridLayout;

Object.keys(SwapGrid).forEach(name => {
    Vue.component(name, SwapGrid[name]);
});

export default SwapGrid;