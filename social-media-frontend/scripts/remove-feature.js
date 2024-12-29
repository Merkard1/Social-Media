"use strict";
exports.__esModule = true;
/* eslint-disable consistent-return */
var ts_morph_1 = require("ts-morph");
// @ts-ignore
var removedFeatureName = process.argv[2];
// @ts-ignore
var featureState = process.argv[3];
var toggleFunctionName = "toggleFeatures";
var toggleComponentName = "ToggleFeatures";
if (!removedFeatureName) {
    throw new Error("Укажите название фича-флага");
}
if (!featureState) {
    throw new Error("Укажите состояние фичи (on или off)");
}
if (featureState !== "on" && featureState !== "off") {
    throw new Error("Некорректное значение состояния фичи (on или off)");
}
var project = new ts_morph_1.Project({});
project.addSourceFilesAtPaths("src/**/*.ts");
project.addSourceFilesAtPaths("src/**/*.tsx");
var files = project.getSourceFiles();
function isToggleFunction(node) {
    var isToggleFeatures = false;
    node.forEachChild(function (child) {
        if (child.isKind(ts_morph_1.SyntaxKind.Identifier)
            && child.getText() === toggleFunctionName) {
            isToggleFeatures = true;
        }
    });
    return isToggleFeatures;
}
function isToggleComponent(node) {
    var identifier = node.getFirstDescendantByKind(ts_morph_1.SyntaxKind.Identifier);
    return (identifier === null || identifier === void 0 ? void 0 : identifier.getText()) === toggleComponentName;
}
var replaceToggleFunction = function (node) {
    var _a, _b, _c;
    var objectOptions = node.getFirstDescendantByKind(ts_morph_1.SyntaxKind.ObjectLiteralExpression);
    if (!objectOptions)
        return;
    var offFunctionProperty = objectOptions.getProperty("off");
    var onFunctionProperty = objectOptions.getProperty("on");
    var featureNameProperty = objectOptions.getProperty("name");
    var onFunction = onFunctionProperty === null || onFunctionProperty === void 0 ? void 0 : onFunctionProperty.getFirstDescendantByKind(ts_morph_1.SyntaxKind.ArrowFunction);
    var offFunction = offFunctionProperty === null || offFunctionProperty === void 0 ? void 0 : offFunctionProperty.getFirstDescendantByKind(ts_morph_1.SyntaxKind.ArrowFunction);
    var featureName = (_a = featureNameProperty === null || featureNameProperty === void 0 ? void 0 : featureNameProperty.getFirstDescendantByKind(ts_morph_1.SyntaxKind.StringLiteral)) === null || _a === void 0 ? void 0 : _a.getText().slice(1, -1);
    if (featureName !== removedFeatureName)
        return;
    if (featureState === "on") {
        node.replaceWithText((_b = onFunction === null || onFunction === void 0 ? void 0 : onFunction.getBody().getText()) !== null && _b !== void 0 ? _b : "");
    }
    if (featureState === "off") {
        node.replaceWithText((_c = offFunction === null || offFunction === void 0 ? void 0 : offFunction.getBody().getText()) !== null && _c !== void 0 ? _c : "");
    }
};
var getAttributeNodeByName = function (jsxAttributes, name) { return jsxAttributes.find(function (node) { return node.getName() === name; }); };
var getReplacedComponent = function (attribute) {
    var _a, _b;
    var value = (_b = (_a = attribute === null || attribute === void 0 ? void 0 : attribute.getFirstDescendantByKind(ts_morph_1.SyntaxKind.JsxExpression)) === null || _a === void 0 ? void 0 : _a.getExpression()) === null || _b === void 0 ? void 0 : _b.getText();
    if (value === null || value === void 0 ? void 0 : value.startsWith("(")) {
        return value.slice(1, -1);
    }
    return value;
};
var replaceComponent = function (node) {
    var _a, _b;
    var attributes = node.getDescendantsOfKind(ts_morph_1.SyntaxKind.JsxAttribute);
    var onAttribute = getAttributeNodeByName(attributes, "on");
    var offAttribute = getAttributeNodeByName(attributes, "off");
    var featureNameAttribute = getAttributeNodeByName(attributes, "feature");
    var featureName = (_b = (_a = featureNameAttribute === null || featureNameAttribute === void 0 ? void 0 : featureNameAttribute.getFirstDescendantByKind(ts_morph_1.SyntaxKind.StringLiteral)) === null || _a === void 0 ? void 0 : _a.getText()) === null || _b === void 0 ? void 0 : _b.slice(1, -1);
    if (featureName !== removedFeatureName)
        return;
    var offValue = getReplacedComponent(offAttribute);
    var onValue = getReplacedComponent(onAttribute);
    if (featureState === "on" && onValue) {
        node.replaceWithText(onValue);
    }
    if (featureState === "off" && offValue) {
        node.replaceWithText(offValue);
    }
};
files.forEach(function (sourceFile) {
    sourceFile.forEachDescendant(function (node) {
        if (node.isKind(ts_morph_1.SyntaxKind.CallExpression) && isToggleFunction(node)) {
            return replaceToggleFunction(node);
        }
        if (node.isKind(ts_morph_1.SyntaxKind.JsxSelfClosingElement)
            && isToggleComponent(node)) {
            return replaceComponent(node);
        }
    });
});
project.save();
