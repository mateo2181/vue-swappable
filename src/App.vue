<template>
  <div id="app" class="app min-h-screen text-black bg-grey-lighter p-8">
    <div class="content">
          <div class="col">
              <span>  Filas: </span><input v-model="cantRows" class="d-inline-flex col-input form-control" type="text">
          </div>
          <div class="col">
              <span> Columnas: </span><input v-model="cantCols" class="d-inline-flex row-input form-control" type="text">
          </div>

      <swappable-grid 
        v-if="renderGrid"
        :maxRows="parseInt(cantRows)"
        :maxCols="parseInt(cantCols)"
        :items="todos"
        :heightItem="'80px'"
        :widthItem="'85px'"
        :styleItem="styleItem"
        :styleItemText="styleItemText"
        @update="updateValue">
      </swappable-grid>

    </div>
  </div>
</template>

<script>
import SwappableGrid from "./components/SwappableGrid";
import { clone } from "./components/utilities/clone";
export default {
  name: "app",
  components: {
    SwappableGrid
  },
  data() {
    return {
      renderGrid: true,
      cantRows: 8,
      cantCols: 8,
      heightItem: "4rem",
      widthItem: "4rem",
      styleItem: {
        "width": "85px",
        "height": "70px",
        "background-color": "#fff",
        "box-shadow": "0 0 5px 0 #625f5f",
        "border-radius": "12px",
        margin: "4px auto",
        padding: "5px"
      },
      styleItemText: {
        position: "absolute",
        left: "50%",
        top: "40%",
        transform: "translate(-50%,-50%)",
        "font-size": "30px",
        color: "#000",
        "font-weight": "600"
      },
      stylePlaceholderItem: {
        "background-color": "#e74b4b",
        border: "1px solid #cacaca"
      },
      todos: [
        { id: 1, description: "1", empty: false, col: 0, row: 4 },
        { id: 2, description: "2", empty: false, col: 3, row: 2 },
        { id: 3, description: "3", empty: false, col: 0, row: 0 },
        { id: 4, description: "4", empty: false, col: 1, row: 1 },
        { id: 5, description: "5", empty: false, col: 1, row: 3 },
        { id: 6, description: "6", empty: false, col: 3, row: 4 },
        { id: 7, description: "7", empty: false, col: 5, row: 2 }
      ],
      todosAux: []
    };
  },
  created() {
    // this.todosAux = clone(this.todos);
  },
  methods: {
    updateValue(val) {
      this.todos = val;
    }
  }
};
</script>

<style scoped>
.content {
  background-color: rgb(228, 227, 227);
  max-width: 800px;
  overflow-x: scroll;
}
</style>
