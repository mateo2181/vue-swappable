# Swappable Component with VueJs

### Using [Shopify's draggable library](https://github.com/Shopify/draggable)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Build library
```
npm run build-lib
```

## Usage
```
import SwappableGrid from "./components/SwappableGrid";
```
```
<swappable-grid 
        :items="todos"
        :styleItem="styleItem"
        :styleItemText="styleItemText"
        @update="updateValue">
</swappable-grid>
```

## Properties

- items
    - required: true,
    - type: Array

- maxRows:
    - required: false,
    - default: 5,
    - type: Number

- maxCols
    - required: false,
    - default: 5,
    - type: Number
    
- heightItem
    - required: false,
    - default: "4rem",
    - type: String
    
- widthItem
    - required: false,
    - default: "4rem",
    - type: String
    
- styleItem
    - required: false,
    - type: Object,
    - default: () => ({
        "background-color": "#fff",
        margin: "5px"
      })

- styleItemText
    - required: false,
    - type: Object,
    - default: () => ({})
    
- stylePlaceholderItem
    - required: false,
    - type: Object,
    - default: () => ({
        "background-color": "rgba(234, 192, 192, 0.68)",
        border: "1px solid #cacaca"
      })

## Events

- @update: Get items updated with cols and rows modified. 