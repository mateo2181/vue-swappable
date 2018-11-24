<template>
    <sortable-list v-model="items">
        <div class="flex flex-wrap" style="display: flex;flex-wrap: wrap;" slot-scope="{ items }">
          <div :style="{flex: ((100 / maxRows) - 2 + '%')}" v-for="(todo,i) in items" :key="i">
            <sortable-item :id="todo.id" :style="[styleItem,typeItem(todo.empty)]" :class="{'placeholder':todo.empty}">
            <sortable-handle>
              <div style="text-align:center;position:relative;">
                    <div :style="styleItemText" v-if="todo.description">{{ todo.description }}</div>
                </div>
            </sortable-handle>
            
          </sortable-item>
          </div>
        </div>
      </sortable-list>
</template>

<script>
import Vue from "vue";
import SortableList from "./SortableList";
import SortableItem from "./SortableItem";
import SortableHandle from "./SortableHandle";
import SortBy from "./utilities/sortby";
export default {
  name: "swappable-grid",
  components: {
    SortableList,
    SortableItem,
    SortableHandle
  },
  props: {
    items: {
      required: true,
      type: Array
    },
    maxRows: {
      required: false,
      default: 5,
      type: Number
    },
    maxCols: {
      required: false,
      default: 5,
      type: Number
    },
    heightItem: {
      required: false,
      default: "4rem",
      type: String
    },
    widthItem: {
      required: false,
      default: "4rem",
      type: String
    },
    styleItem: {
      required: false,
      type: Object,
      default: () => ({
        "background-color": "#fff",
        margin: "5px"
      })
    },
    styleItemText: {
      required: false,
      type: Object,
      default: () => ({})
    },
    stylePlaceholderItem: {
      required: false,
      type: Object,
      default: () => ({
        "background-color": "rgba(234, 192, 192, 0.68)",
        border: "1px solid #cacaca"
      })
    }
  },
  provide() {
    return {
      eventBus: null
    };
  },
  created() {
    this.checkPositions();
    this.createSpaces();
    this.sortArray();

    const self = this;
    self.reorderEventHandler = function(positionsItems) {
      self.reorderItems(positionsItems);
    };

    self._provided.eventBus = new Vue();
    self.eventBus = self._provided.eventBus;
    self.eventBus.$on("reorderEvent", self.reorderEventHandler);
  },
  beforeDestroy: function() {
    //Remove listeners
    this.eventBus.$off("reorderEvent", this.reorderEventHandler);
  },
  methods: {
    typeItem: function(empty) {
      if (empty) {
        // this.stylePlaceholderItem["flex"] = 100 / this.maxRows - 2 + "%";
        this.stylePlaceholderItem["height"] = this.heightItem;
        this.stylePlaceholderItem["width"] = this.widthItem;
        return this.stylePlaceholderItem;
      } else {
        let style = {};
        style["height"] = this.heightItem;
        style["width"] = this.widthItem;
        // style["flex"] = 100 / this.maxRows - 2 + "%";
        return style;
      }
    },
    sortArray() {
      this.items.sort(SortBy("row", { name: "col" }));
    },
    checkPositions() {
      // Fix cols and rows with invalid values
      // In this case reorder the array
      if (
        this.items.filter(
          e =>
            !Number.isInteger(e.col) ||
            e.col >= this.maxCols ||
            !Number.isInteger(e.row) ||
            e.row >= this.maxRows
        ).length > 0
      ) {
        let row = 0;
        let col = 0;
        this.items.forEach(e => {
          e.col = col;
          e.row = row;
          if (col + 1 === this.maxCols) col = 0;
          else col++;
          if (col + 1 === this.maxCols) row++;
        });
      }
    },
    createSpaces() {
      for (let i = 0; i < this.maxRows; i++) {
        for (let j = 0; j < this.maxCols; j++) {
          // If element not exist in that position create space empty
          if (this.items.filter(e => e.col === j && e.row === i).length === 0) {
            this.items.push({ id: i + "" + j, empty: true, col: j, row: i });
          } else {
            this.items.forEach(e => {
              if (e.col === j && e.row === i) {
                e.id = i + "" + j;
              }
            });
          }
        }
      }
    },
    reorderItems(positionsItems) {
      let aux = Array(this.items.length);
      let newPosition = positionsItems.newPosition;
      let oldPosition = positionsItems.oldPosition;
      if (newPosition && oldPosition) {
        this.items.forEach((e, i) => {
          let copyElement = JSON.parse(JSON.stringify(e));
          if (e.id === oldPosition) {
            copyElement.id = newPosition;
            copyElement.row = parseInt(newPosition.charAt(0));
            copyElement.col = parseInt(newPosition.charAt(1));
          }
          if (e.id === newPosition) {
            copyElement.id = oldPosition;
            copyElement.row = parseInt(oldPosition.charAt(0));
            copyElement.col = parseInt(oldPosition.charAt(1));
          }
          aux[i] = copyElement;
        });

        this.$emit("update", aux);
      }
      // this.sortArray();
    }
  }
};
</script>
