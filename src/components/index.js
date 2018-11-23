import Vue from "vue";
import SortableGrid from './SortableGrid.vue';
// import ResponsiveGridLayout from './ResponsiveGridLayout.vue';


const SwapGrid = {
    // ResponsiveGridLayout,
    SortableGrid
}

// module.exports = VueGridLayout;

Object.keys(SwapGrid).forEach(name => {
    Vue.component(name, SwapGrid[name]);
});

export default SwapGrid;