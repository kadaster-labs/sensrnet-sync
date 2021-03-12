"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckpointSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CheckpointSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    offset: { type: Number, required: false },
}, {
    autoCreate: true,
});
//# sourceMappingURL=checkpoint.model.js.map