export function clone(layout) {
    const newLayout = Array(layout.length);
    for (let i = 0, len = layout.length; i < len; i++) {
        newLayout[i] = cloneLayoutItem(layout[i]);
    }
    return newLayout;
}

export function cloneLayoutItem(layoutItem) {
    return JSON.parse(JSON.stringify(layoutItem));
}