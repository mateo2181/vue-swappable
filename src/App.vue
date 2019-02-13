<template>
  <div id="app" class="app min-h-screen text-black bg-grey-lighter p-8">
    <div class="max-w-sm mx-auto">
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
      cantRows: 5,
      cantCols: 5,
      heightItem: "4rem",
      widthItem: "4rem",
      styleItem: {
        "background-color": "#fff",
        margin: "5px auto",
        border: "1px solid #000"
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
        { id: 3, description: "1", empty: false, col: 0, row: 4 },
        { id: 4, description: "2", empty: false, col: 3, row: 2 },
        { id: 5, description: "3", empty: false, col: 0, row: 0 }
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
.app {
  max-width: 500px;
  background-color: rgb(228, 227, 227);
}
</style>
