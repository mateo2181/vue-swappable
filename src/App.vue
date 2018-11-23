<template>
  <div id="app" class="app min-h-screen text-black bg-grey-lighter p-8">
    <div class="max-w-sm mx-auto">

      <sortable-grid 
        :todos="todos"
        :styleItem="styleItem"
        @update="updateValue">
      </sortable-grid>

    </div>
  </div>
</template>

<script>
import SortableGrid from "./components/SortableGrid";

export default {
  name: "app",
  components: {
    SortableGrid
  },
  data() {
    return {
      maxRows: 5,
      maxCols: 5,
      heightItem: "4rem",
      widthItem: "4rem",
      styleItem:{ 
        "background-color": "#fff",
        "margin": "5px",
        border: "1px solid #000"
      }, 
      stylePlaceholderItem: {
        "background-color": "#e74b4b",
        border: "1px solid #cacaca"
      },
      todos: [
        { id: 3, description: "1", empty: false, col: 1, row: 4 },
        { id: 4, description: "2", empty: false, col: 1, row: 0 },
        { id: 5, description: "3", empty: false, col: 0, row: 0 }
      ]
    };
  },
  methods: {
    updateValue(val) {
      this.todos = val;
    }
  }
};
</script>

<style scoped>
.app {
  max-width: 500px;
  background-color: rgb(206, 205, 205);
}
</style>
