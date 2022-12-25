//Container to access all types of "item"
//TODO Make require all files programmatically

const db_items = {
    note: require('./item_note'),
    clock: require('./item_clock'),
    page: require('./item_page'),
    path: require('./item_path'),
    scribble: require('./item_scribble'),
    swatch: require('./item_swatch'),
}

module.exports = db_items