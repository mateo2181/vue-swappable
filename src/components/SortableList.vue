<script>
import { Swappable, Plugins } from "@shopify/draggable";

export default {
  created() {},
  props: {
    value: {
      required: true
    },
    itemClass: {
      default: "sortable-item"
    },
    handleClass: {
      default: "sortable-handle"
    }
  },
  provide() {
    return {
      itemClass: this.itemClass,
      handleClass: this.handleClass
    };
  },
  inject: ["eventBus"],
  render() {
    return this.$scopedSlots.default({
      items: this.value
    });
  },
  mounted() {
    let oldPosition;
    let newPosition;
    const list = new Swappable(this.$el, {
      draggable: `.${this.itemClass}`,
      handle: `.${this.handleClass}`,
      swapAnimation: {
        duration: 200,
        easingFunction: "ease-in-out"
      },
      mirror: {
        appendTo: this.$el,
        constrainDimensions: true
      },
      plugins: [Plugins.Snappable,Plugins.SwapAnimation]
    })
      .on("drag:start", evt => {
        if (evt.originalSource.classList.contains("placeholder")) {
          evt.cancel();
        }
      })
      .on("drag:stop", evt => {
        // console.log(evt);
        oldPosition = evt.data.originalSource.id;
        // console.log(oldPosition);
        // console.log(newPosition);
        this.eventBus.$emit("reorderEvent", {
          oldPosition: oldPosition,
          newPosition: newPosition
        });
      })
      .on("swappable:swap", evt => {
        // console.log(evt);
        newPosition = evt.data.over.id;
      });

    this.$on("hook:destroyed", () => {
      list.destroy();
    });
  }
};
</script>
