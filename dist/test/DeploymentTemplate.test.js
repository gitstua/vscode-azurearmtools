"use strict";
// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-unused-expression max-func-body-length promise-function-async max-line-length insecure-random
// tslint:disable:object-literal-key-quotes
const assert = require("assert");
const crypto_1 = require("crypto");
const extension_bundle_1 = require("../extension.bundle");
const testDiagnostics_1 = require("./testDiagnostics");
suite("DeploymentTemplate", () => {
    suite("constructor(string)", () => {
        test("Null stringValue", () => {
            assert.throws(() => { new extension_bundle_1.DeploymentTemplate(null, "id"); });
        });
        test("Undefined stringValue", () => {
            assert.throws(() => { new extension_bundle_1.DeploymentTemplate(undefined, "id"); });
        });
        test("Empty stringValue", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("", "id");
            assert.deepStrictEqual("", dt.documentText);
            assert.deepStrictEqual("id", dt.documentId);
            assert.deepStrictEqual([], dt.parameterDefinitions);
            assert.equal(null, dt.schemaUri);
        });
        test("Non-JSON stringValue", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("I'm not a JSON file", "id");
            assert.deepStrictEqual("I'm not a JSON file", dt.documentText);
            assert.deepStrictEqual("id", dt.documentId);
            assert.deepStrictEqual([], dt.parameterDefinitions);
            assert.equal(null, dt.schemaUri);
        });
        test("JSON stringValue with number parameters definition", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': 21 }", "id");
            assert.deepStrictEqual("{ 'parameters': 21 }", dt.documentText);
            assert.deepStrictEqual("id", dt.documentId);
            assert.deepStrictEqual([], dt.parameterDefinitions);
            assert.equal(null, dt.schemaUri);
        });
        test("JSON stringValue with empty object parameters definition", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': {} }", "id");
            assert.deepStrictEqual("{ 'parameters': {} }", dt.documentText);
            assert.deepStrictEqual("id", dt.documentId);
            assert.deepStrictEqual([], dt.parameterDefinitions);
            assert.equal(null, dt.schemaUri);
        });
        test("JSON stringValue with one parameter definition", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'num': { 'type': 'number' } } }", "id");
            assert.deepStrictEqual("{ 'parameters': { 'num': { 'type': 'number' } } }", dt.documentText);
            assert.deepStrictEqual("id", dt.documentId);
            const parameterDefinitions = dt.parameterDefinitions;
            assert(parameterDefinitions);
            assert.deepStrictEqual(parameterDefinitions.length, 1);
            const pd0 = parameterDefinitions[0];
            assert(pd0);
            assert.deepStrictEqual(pd0.name.toString(), "num");
            assert.deepStrictEqual(pd0.description, null);
            assert.deepStrictEqual(pd0.span, new extension_bundle_1.Language.Span(18, 27));
            assert.equal(null, dt.schemaUri);
        });
        test("JSON stringValue with one parameter definition with null description", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'num': { 'type': 'number', 'metadata': { 'description': null } } } }", "id");
            assert.deepStrictEqual("id", dt.documentId);
            const parameterDefinitions = dt.parameterDefinitions;
            assert(parameterDefinitions);
            assert.deepStrictEqual(parameterDefinitions.length, 1);
            const pd0 = parameterDefinitions[0];
            assert(pd0);
            assert.deepStrictEqual(pd0.name.toString(), "num");
            assert.deepStrictEqual(pd0.description, null);
            assert.deepStrictEqual(pd0.span, new extension_bundle_1.Language.Span(18, 64));
            assert.equal(null, dt.schemaUri);
        });
        test("JSON stringValue with one parameter definition with empty description", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'num': { 'type': 'number', 'metadata': { 'description': '' } } } }", "id");
            assert.deepStrictEqual("id", dt.documentId);
            const parameterDefinitions = dt.parameterDefinitions;
            assert(parameterDefinitions);
            assert.deepStrictEqual(parameterDefinitions.length, 1);
            const pd0 = parameterDefinitions[0];
            assert(pd0);
            assert.deepStrictEqual(pd0.name.toString(), "num");
            assert.deepStrictEqual(pd0.description, "");
            assert.deepStrictEqual(pd0.span, new extension_bundle_1.Language.Span(18, 62));
            assert.equal(null, dt.schemaUri);
        });
        test("JSON stringValue with one parameter definition with non-empty description", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'num': { 'type': 'number', 'metadata': { 'description': 'num description' } } } }", "id");
            assert.deepStrictEqual("id", dt.documentId);
            const parameterDefinitions = dt.parameterDefinitions;
            assert(parameterDefinitions);
            assert.deepStrictEqual(parameterDefinitions.length, 1);
            const pd0 = parameterDefinitions[0];
            assert(pd0);
            assert.deepStrictEqual(pd0.name.toString(), "num");
            assert.deepStrictEqual(pd0.description, "num description");
            assert.deepStrictEqual(pd0.span, new extension_bundle_1.Language.Span(18, 77));
            assert.equal(null, dt.schemaUri);
        });
        test("JSON stringValue with number variable definitions", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': 12 }", "id");
            assert.deepStrictEqual("id", dt.documentId);
            assert.deepStrictEqual("{ 'variables': 12 }", dt.documentText);
            assert.deepStrictEqual([], dt.variableDefinitions);
            assert.equal(null, dt.schemaUri);
        });
        test("JSON stringValue with one variable definition", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'a': 'A' } }", "id");
            assert.deepStrictEqual(dt.documentId, "id");
            assert.deepStrictEqual(dt.documentText, "{ 'variables': { 'a': 'A' } }");
            assert.deepStrictEqual(dt.variableDefinitions.length, 1);
            assert.deepStrictEqual(dt.variableDefinitions[0].name.toString(), "a");
            const variableDefinition = extension_bundle_1.Json.asStringValue(dt.variableDefinitions[0].value);
            assert(variableDefinition);
            assert.deepStrictEqual(variableDefinition.span, new extension_bundle_1.Language.Span(22, 3));
            assert.deepStrictEqual(variableDefinition.toString(), "A");
            assert.equal(null, dt.schemaUri);
        });
        test("JSON stringValue with two variable definitions", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'a': 'A', 'b': 2 } }", "id");
            assert.deepStrictEqual("id", dt.documentId);
            assert.deepStrictEqual("{ 'variables': { 'a': 'A', 'b': 2 } }", dt.documentText);
            assert.deepStrictEqual(dt.variableDefinitions.length, 2);
            assert.deepStrictEqual(dt.variableDefinitions[0].name.toString(), "a");
            const a = extension_bundle_1.Json.asStringValue(dt.variableDefinitions[0].value);
            assert(a);
            assert.deepStrictEqual(a.span, new extension_bundle_1.Language.Span(22, 3));
            assert.deepStrictEqual(a.toString(), "A");
            assert.deepStrictEqual(dt.variableDefinitions[1].name.toString(), "b");
            const b = extension_bundle_1.Json.asNumberValue(dt.variableDefinitions[1].value);
            assert(b);
            assert.deepStrictEqual(b.span, new extension_bundle_1.Language.Span(32, 1));
            assert.equal(null, dt.schemaUri);
        });
        test("JSON stringValue with $schema property", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ '$schema': 'a' }", "id");
            assert.deepStrictEqual("id", dt.documentId);
            assert.deepStrictEqual("a", dt.schemaUri);
            assert.deepStrictEqual("a", dt.schemaUri);
        });
    });
    suite("hasValidSchemaUri()", () => {
        test("with empty deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("", "id");
            assert.equal(false, dt.hasValidSchemaUri());
        });
        test("with empty object deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{}", "id");
            assert.equal(false, dt.hasValidSchemaUri());
        });
        test("with empty schema", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ '$schema': '' }", "id");
            assert.equal(false, dt.hasValidSchemaUri());
        });
        test("with invalid schema uri", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ '$schema': 'www.bing.com' }", "id");
            assert.equal(false, dt.hasValidSchemaUri());
        });
        test("with valid schema uri", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ '$schema': 'https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#' }", "id");
            assert.equal(true, dt.hasValidSchemaUri());
        });
    });
    suite("errors", () => {
        test("with empty deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("", "id");
            return dt.errors.then((errors) => {
                assert.deepStrictEqual(errors, []);
            });
        });
        testDiagnostics_1.testDiagnostics("no errors: empty", {}, {}, []);
        test("with empty object deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{}", "id");
            return dt.errors.then((errors) => {
                assert.deepStrictEqual(errors, []);
            });
        });
        test("with one property deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'name': 'value' }", "id");
            return dt.errors.then((errors) => {
                assert.deepStrictEqual(errors, []);
            });
        });
        test("with one TLE parse error deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'name': '[concat()' }", "id");
            const expectedErrors = [
                new extension_bundle_1.Language.Issue(new extension_bundle_1.Language.Span(20, 1), "Expected a right square bracket (']').")
            ];
            return dt.errors.then((errors) => {
                assert.deepStrictEqual(errors, expectedErrors);
            });
        });
        test("with one undefined parameter error deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'name': '[parameters(\"test\")]' }", "id");
            const expectedErrors = [
                new extension_bundle_1.Language.Issue(new extension_bundle_1.Language.Span(23, 6), "Undefined parameter reference: \"test\"")
            ];
            return dt.errors.then((errors) => {
                assert.deepStrictEqual(errors, expectedErrors);
            });
        });
        test("with one undefined variable error deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'name': '[variables(\"test\")]' }", "id");
            const expectedErrors = [
                new extension_bundle_1.Language.Issue(new extension_bundle_1.Language.Span(22, 6), "Undefined variable reference: \"test\"")
            ];
            return dt.errors.then((errors) => {
                assert.deepStrictEqual(errors, expectedErrors);
            });
        });
        test("with one unrecognized function error deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'name': '[blah(\"test\")]' }", "id");
            const expectedErrors = [
                new extension_bundle_1.UnrecognizedFunctionIssue(new extension_bundle_1.Language.Span(12, 4), "blah")
            ];
            return dt.errors.then((errors) => {
                assert.deepStrictEqual(errors, expectedErrors);
            });
        });
        test("with reference() call in variable definition", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": "[reference('test')]" } }`, "id");
            return dt.errors.then((errors) => {
                assert.deepStrictEqual(errors, [new extension_bundle_1.Language.Issue(new extension_bundle_1.Language.Span(24, 9), "reference() cannot be invoked inside of a variable definition.")]);
            });
        });
        test("with reference() call inside a different expression in a variable definition", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": "[concat(reference('test'))]" } }`, "id");
            return dt.errors.then((errors) => {
                assert.deepStrictEqual(errors, [new extension_bundle_1.Language.Issue(new extension_bundle_1.Language.Span(31, 9), "reference() cannot be invoked inside of a variable definition.")]);
            });
        });
        test("with unnamed property access on variable reference", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": {} }, "z": "[variables('a').]" }`, "id");
            return dt.errors.then((errors) => {
                assert.deepStrictEqual(errors, [new extension_bundle_1.Language.Issue(new extension_bundle_1.Language.Span(50, 1), "Expected a literal value.")]);
            });
        });
        test("with property access on variable reference without variable name", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": {} }, "z": "[variables().b]" }`, "id");
            return dt.errors.then((errors) => {
                assert.deepStrictEqual(errors, [new extension_bundle_1.IncorrectArgumentsCountIssue(new extension_bundle_1.Language.Span(35, 11), "The function 'variables' takes 1 argument.", "variables", 0, 1, 1)]);
            });
        });
        test("with property access on string variable reference", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": "A" }, "z": "[variables('a').b]" }`, "id");
            return dt.errors.then((errors) => {
                assert.deepStrictEqual(errors, [new extension_bundle_1.Language.Issue(new extension_bundle_1.Language.Span(51, 1), `Property "b" is not a defined property of "variables('a')".`)]);
            });
        });
        test("with undefined variable reference child property", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": {} }, "z": "[variables('a').b]" }`, "id");
            return dt.errors.then((errors) => {
                assert.deepStrictEqual(errors, [new extension_bundle_1.Language.Issue(new extension_bundle_1.Language.Span(50, 1), `Property "b" is not a defined property of "variables('a')".`)]);
            });
        });
        test("with undefined variable reference grandchild property", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": { "b": {} } }, "z": "[variables('a').b.c]" }`, "id");
            return dt.errors.then((errors) => {
                assert.deepStrictEqual(errors, [new extension_bundle_1.Language.Issue(new extension_bundle_1.Language.Span(61, 1), `Property "c" is not a defined property of "variables('a').b".`)]);
            });
        });
        test("with undefined variable reference child and grandchild properties", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": { "d": {} } }, "z": "[variables('a').b.c]" }`, "id");
            return dt.errors.then((errors) => {
                assert.deepStrictEqual(errors, [new extension_bundle_1.Language.Issue(new extension_bundle_1.Language.Span(59, 1), `Property "b" is not a defined property of "variables('a')".`)]);
            });
        });
    });
    suite("warnings", () => {
        test("with unused parameter", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "parameters": { "a": {} } }`, "id");
            assert.deepStrictEqual(dt.warnings, [new extension_bundle_1.Language.Issue(new extension_bundle_1.Language.Span(18, 3), "The parameter 'a' is never used.")]);
        });
        test("with no unused parameters", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "parameters": { "a": {} }, "b": "[parameters('a')] }`, "id");
            assert.deepStrictEqual(dt.warnings, []);
            assert.deepStrictEqual(dt.warnings, []);
        });
        test("with unused variable", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": "A" } }`, "id");
            assert.deepStrictEqual(dt.warnings, [new extension_bundle_1.Language.Issue(new extension_bundle_1.Language.Span(17, 3), "The variable 'a' is never used.")]);
        });
        test("with no unused variables", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": "A" }, "b": "[variables('a')] }`, "id");
            assert.deepStrictEqual(dt.warnings, []);
            assert.deepStrictEqual(dt.warnings, []);
        });
    });
    suite("get functionCounts()", () => {
        test("with empty deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("", "id");
            const expectedHistogram = new extension_bundle_1.Histogram();
            assert.deepStrictEqual(expectedHistogram, dt.functionCounts);
            assert.deepStrictEqual(expectedHistogram, dt.functionCounts);
        });
        test("with empty object deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{}", "id");
            const expectedHistogram = new extension_bundle_1.Histogram();
            assert.deepStrictEqual(expectedHistogram, dt.functionCounts);
            assert.deepStrictEqual(expectedHistogram, dt.functionCounts);
        });
        test("with one property object deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'name': 'value' }", "id");
            const expectedHistogram = new extension_bundle_1.Histogram();
            assert.deepStrictEqual(expectedHistogram, dt.functionCounts);
            assert.deepStrictEqual(expectedHistogram, dt.functionCounts);
        });
        test("with one TLE function used multiple times in deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'name': '[concat()]', 'name2': '[concat(1, 2)]', 'name3': '[concat(2, 3)]' } }", "id");
            const expectedHistogram = new extension_bundle_1.Histogram();
            expectedHistogram.add("concat");
            expectedHistogram.add("concat");
            expectedHistogram.add("concat");
            expectedHistogram.add("concat(0)");
            expectedHistogram.add("concat(2)");
            expectedHistogram.add("concat(2)");
            assert.deepStrictEqual(expectedHistogram, dt.functionCounts);
            assert.deepStrictEqual(expectedHistogram, dt.functionCounts);
        });
        test("with two TLE functions in different TLEs deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'name': '[concat()]', 'height': '[add()]' }", "id");
            const expectedHistogram = new extension_bundle_1.Histogram();
            expectedHistogram.add("concat");
            expectedHistogram.add("concat(0)");
            expectedHistogram.add("add");
            expectedHistogram.add("add(0)");
            assert.deepStrictEqual(expectedHistogram, dt.functionCounts);
            assert.deepStrictEqual(expectedHistogram, dt.functionCounts);
        });
    });
    suite("get jsonParseResult()", () => {
        test("with empty deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("", "id");
            assert(dt.jsonParseResult);
            assert.equal(0, dt.jsonParseResult.tokenCount);
        });
        test("with empty object deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{}", "id");
            assert(dt.jsonParseResult);
            assert.equal(2, dt.jsonParseResult.tokenCount);
        });
    });
    suite("get parameterDefinitions()", () => {
        test("with no parameters property", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{}", "id");
            assert.deepStrictEqual(dt.parameterDefinitions, []);
        });
        test("with null parameters property", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': null }", "id");
            assert.deepStrictEqual(dt.parameterDefinitions, []);
        });
        test("with string parameters property", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': 'hello' }", "id");
            assert.deepStrictEqual(dt.parameterDefinitions, []);
        });
        test("with number parameters property", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': 1 }", "id");
            assert.deepStrictEqual(dt.parameterDefinitions, []);
        });
        test("with empty object parameters property", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': {} }", "id");
            assert.deepStrictEqual(dt.parameterDefinitions, []);
        });
        test("with empty object parameter", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'a': {} } }", "id");
            const parameterDefinitions = dt.parameterDefinitions;
            assert(parameterDefinitions);
            assert.deepStrictEqual(parameterDefinitions.length, 1);
            const pd0 = parameterDefinitions[0];
            assert(pd0);
            assert.deepStrictEqual(pd0.name.toString(), "a");
            assert.deepStrictEqual(pd0.description, null);
            assert.deepStrictEqual(pd0.span, new extension_bundle_1.Language.Span(18, 7));
        });
        test("with parameter with metadata but no description", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'a': { 'metadata': {} } } }", "id");
            const parameterDefinitions = dt.parameterDefinitions;
            assert(parameterDefinitions);
            assert.deepStrictEqual(parameterDefinitions.length, 1);
            const pd0 = parameterDefinitions[0];
            assert(pd0);
            assert.deepStrictEqual(pd0.name.toString(), "a");
            assert.deepStrictEqual(pd0.description, null);
            assert.deepStrictEqual(pd0.span, new extension_bundle_1.Language.Span(18, 23));
        });
        test("with parameter with metadata and description", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'a': { 'metadata': { 'description': 'b' } } } }", "id");
            const parameterDefinitions = dt.parameterDefinitions;
            assert(parameterDefinitions);
            assert.deepStrictEqual(parameterDefinitions.length, 1);
            const pd0 = parameterDefinitions[0];
            assert(pd0);
            assert.deepStrictEqual(pd0.name.toString(), "a");
            assert.deepStrictEqual(pd0.description, "b");
            assert.deepStrictEqual(pd0.span, new extension_bundle_1.Language.Span(18, 43));
        });
    });
    suite("getParameterDefinition(string)", () => {
        test("with null", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            assert.throws(() => { dt.getParameterDefinition(null); });
        });
        test("with undefined", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            assert.throws(() => { dt.getParameterDefinition(undefined); });
        });
        test("with empty", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            assert.throws(() => { dt.getParameterDefinition(""); });
        });
        test("with no parameters definition", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{}", "id");
            assert.deepStrictEqual(null, dt.getParameterDefinition("spam"));
        });
        test("with unquoted non-match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            assert.deepStrictEqual(null, dt.getParameterDefinition("spam"));
        });
        test("with one-sided-quote non-match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            assert.deepStrictEqual(null, dt.getParameterDefinition("'spam"));
        });
        test("with quoted non-match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            assert.deepStrictEqual(null, dt.getParameterDefinition("'spam'"));
        });
        test("with unquoted match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            const apples = dt.getParameterDefinition("apples");
            assert(apples);
            assert.deepStrictEqual(apples.name.toString(), "apples");
            assert.deepStrictEqual(apples.description, null);
            assert.deepStrictEqual(apples.span, new extension_bundle_1.Language.Span(18, 30));
            assert.deepStrictEqual(apples.name.span, new extension_bundle_1.Language.Span(18, 8), "Wrong name.span");
            assert.deepStrictEqual(apples.name.unquotedSpan, new extension_bundle_1.Language.Span(19, 6), "Wrong name.unquotedSpan");
        });
        test("with one-sided-quote match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            const apples = dt.getParameterDefinition("'apples");
            assert(apples);
            assert.deepStrictEqual(apples.name.toString(), "apples");
            assert.deepStrictEqual(apples.description, null);
            assert.deepStrictEqual(apples.span, new extension_bundle_1.Language.Span(18, 30));
        });
        test("with quoted match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            const apples = dt.getParameterDefinition("'apples'");
            assert(apples);
            assert.deepStrictEqual(apples.name.toString(), "apples");
            assert.deepStrictEqual(apples.description, null);
            assert.deepStrictEqual(apples.span, new extension_bundle_1.Language.Span(18, 30));
        });
        test("with case insensitive match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            const apples = dt.getParameterDefinition("'APPLES'");
            assert(apples);
            assert.deepStrictEqual(apples.name.toString(), "apples");
            assert.deepStrictEqual(apples.description, null);
            assert.deepStrictEqual(apples.span, new extension_bundle_1.Language.Span(18, 30));
        });
        test("with case sensitive and insensitive match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'APPLES': { 'type': 'integer' } } }", "id");
            const APPLES = dt.getParameterDefinition("'APPLES'");
            assert(APPLES);
            assert.deepStrictEqual(APPLES.name.toString(), "APPLES");
            assert.deepStrictEqual(APPLES.description, null);
            assert.deepStrictEqual(APPLES.span, new extension_bundle_1.Language.Span(50, 31));
            const apples = dt.getParameterDefinition("'APPles'");
            assert(apples);
            assert.deepStrictEqual(apples.name.toString(), "apples");
            assert.deepStrictEqual(apples.description, null);
            assert.deepStrictEqual(apples.span, new extension_bundle_1.Language.Span(18, 30));
        });
    });
    suite("findParameterDefinitionsWithPrefix(string)", () => {
        test("with null", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            assert.throws(() => { dt.findParameterDefinitionsWithPrefix(null); });
        });
        test("with undefined", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            assert.throws(() => { dt.findParameterDefinitionsWithPrefix(undefined); });
        });
        test("with empty", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            const matches = dt.findParameterDefinitionsWithPrefix("");
            assert(matches);
            assert.deepStrictEqual(matches.length, 2);
            const match0 = matches[0];
            assert(match0);
            assert.deepStrictEqual(match0.name.toString(), "apples");
            assert.deepStrictEqual(match0.description, null);
            assert.deepStrictEqual(match0.span, new extension_bundle_1.Language.Span(18, 30));
            const match1 = matches[1];
            assert(match1);
            assert.deepStrictEqual(match1.name.toString(), "bananas");
            assert.deepStrictEqual(match1.description, null);
            assert.deepStrictEqual(match1.span, new extension_bundle_1.Language.Span(50, 32));
        });
        test("with prefix of one of the parameters", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            const matches = dt.findParameterDefinitionsWithPrefix("ap");
            assert(matches);
            assert.deepStrictEqual(matches.length, 1);
            const match0 = matches[0];
            assert(match0);
            assert.deepStrictEqual(match0.name.toString(), "apples");
            assert.deepStrictEqual(match0.description, null);
            assert.deepStrictEqual(match0.span, new extension_bundle_1.Language.Span(18, 30));
        });
        test("with prefix of none of the parameters", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            assert.deepStrictEqual(dt.findParameterDefinitionsWithPrefix("ca"), []);
        });
        test("with case insensitive match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'bananas': { 'type': 'integer' } } }", "id");
            const matches = dt.findParameterDefinitionsWithPrefix("APP");
            assert(matches);
            assert.deepStrictEqual(matches.length, 1);
            const match0 = matches[0];
            assert(match0);
            assert.deepStrictEqual(match0.name.toString(), "apples");
            assert.deepStrictEqual(match0.description, null);
            assert.deepStrictEqual(match0.span, new extension_bundle_1.Language.Span(18, 30));
        });
        test("with case sensitive and insensitive match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'parameters': { 'apples': { 'type': 'string' }, 'APPLES': { 'type': 'integer' } } }", "id");
            const matches = dt.findParameterDefinitionsWithPrefix("APP");
            assert(matches);
            assert.deepStrictEqual(matches.length, 2);
            const match0 = matches[0];
            assert(match0);
            assert.deepStrictEqual(match0.name.toString(), "apples");
            assert.deepStrictEqual(match0.description, null);
            assert.deepStrictEqual(match0.span, new extension_bundle_1.Language.Span(18, 30));
            const match1 = matches[1];
            assert(match1);
            assert.deepStrictEqual(match1.name.toString(), "APPLES");
            assert.deepStrictEqual(match1.description, null);
            assert.deepStrictEqual(match1.span, new extension_bundle_1.Language.Span(50, 31));
        });
    });
    suite("getVariableDefinition(string)", () => {
        test("with null", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'yum', 'bananas': 'good' } }", "id");
            assert.throws(() => { dt.getVariableDefinition(null); });
        });
        test("with undefined", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'yum', 'bananas': 'good' } }", "id");
            assert.throws(() => { dt.getVariableDefinition(undefined); });
        });
        test("with empty", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'yum', 'bananas': 'good' } }", "id");
            assert.throws(() => { dt.getVariableDefinition(""); });
        });
        test("with no variables definition", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{}", "id");
            assert.deepStrictEqual(null, dt.getVariableDefinition("spam"));
        });
        test("with unquoted non-match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'yum', 'bananas': 'good' } }", "id");
            assert.deepStrictEqual(null, dt.getVariableDefinition("spam"));
        });
        test("with one-sided-quote non-match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'yum', 'bananas': 'good' } }", "id");
            assert.deepStrictEqual(null, dt.getVariableDefinition("'spam"));
        });
        test("with quoted non-match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'yum', 'bananas': 'good' } }", "id");
            assert.deepStrictEqual(null, dt.getVariableDefinition("'spam'"));
        });
        test("with unquoted match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'yum', 'bananas': 'good' } }", "id");
            const apples = dt.getVariableDefinition("apples");
            assert(apples);
            assert.deepStrictEqual(apples.name.toString(), "apples");
            const value = extension_bundle_1.Json.asStringValue(apples.value);
            assert(value);
            assert.deepStrictEqual(value.span, new extension_bundle_1.Language.Span(27, 5));
            assert.deepStrictEqual(value.toString(), "yum");
        });
        test("with one-sided-quote match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'yum', 'bananas': 'good' } }", "id");
            const apples = dt.getVariableDefinition("'apples");
            assert(apples);
            assert.deepStrictEqual(apples.name.toString(), "apples");
            const value = extension_bundle_1.Json.asStringValue(apples.value);
            assert(value);
            assert.deepStrictEqual(value.span, new extension_bundle_1.Language.Span(27, 5));
            assert.deepStrictEqual(value.toString(), "yum");
        });
        test("with quoted match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'yum', 'bananas': 'good' } }", "id");
            const apples = dt.getVariableDefinition("'apples'");
            assert(apples);
            assert.deepStrictEqual(apples.name.toString(), "apples");
            const value = extension_bundle_1.Json.asStringValue(apples.value);
            assert(value);
            assert.deepStrictEqual(value.span, new extension_bundle_1.Language.Span(27, 5));
            assert.deepStrictEqual(value.toString(), "yum");
        });
        test("with case insensitive match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'yum', 'bananas': 'good' } }", "id");
            const apples = dt.getVariableDefinition("'APPLES");
            assert(apples);
            assert.deepStrictEqual(apples.name.toString(), "apples");
            const value = extension_bundle_1.Json.asStringValue(apples.value);
            assert(value);
            assert.deepStrictEqual(value.span, new extension_bundle_1.Language.Span(27, 5));
            assert.deepStrictEqual(value.toString(), "yum");
        });
        test("with case sensitive and insensitive match", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'yum', 'APPLES': 'good' } }", "id");
            const APPLES = dt.getVariableDefinition("'APPLES'");
            assert(APPLES);
            assert.deepStrictEqual(APPLES.name.toString(), "APPLES");
            const applesValue = extension_bundle_1.Json.asStringValue(APPLES.value);
            assert(applesValue);
            assert.deepStrictEqual(applesValue.span, new extension_bundle_1.Language.Span(44, 6));
            assert.deepStrictEqual(applesValue.toString(), "good");
            const apples = dt.getVariableDefinition("'APPles'");
            assert(apples);
            assert.deepStrictEqual(apples.name.toString(), "apples");
            const value = extension_bundle_1.Json.asStringValue(apples.value);
            assert(value);
            assert.deepStrictEqual(value.span, new extension_bundle_1.Language.Span(27, 5));
            assert.deepStrictEqual(value.toString(), "yum");
        });
    });
    suite("findVariableDefinitionsWithPrefix(string)", () => {
        test("with null", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'APPLES', 'bananas': 88 } }", "id");
            assert.throws(() => { dt.findVariableDefinitionsWithPrefix(null); });
        });
        test("with undefined", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'APPLES', 'bananas': 88 } }", "id");
            assert.throws(() => { dt.findVariableDefinitionsWithPrefix(undefined); });
        });
        test("with empty", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'APPLES', 'bananas': 88 } }", "id");
            const definitions = dt.findVariableDefinitionsWithPrefix("");
            assert.deepStrictEqual(definitions.length, 2);
            const apples = definitions[0];
            assert.deepStrictEqual(apples.name.toString(), "apples");
            const applesValue = extension_bundle_1.Json.asStringValue(apples.value);
            assert(applesValue);
            assert.deepStrictEqual(applesValue.span, new extension_bundle_1.Language.Span(27, 8));
            assert.deepStrictEqual(applesValue.toString(), "APPLES");
            const bananas = definitions[1];
            assert.deepStrictEqual(bananas.name.toString(), "bananas");
            const bananasValue = extension_bundle_1.Json.asNumberValue(bananas.value);
            assert.deepStrictEqual(bananasValue.span, new extension_bundle_1.Language.Span(48, 2));
        });
        test("with prefix of one of the variables", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'APPLES', 'bananas': 88 } }", "id");
            const definitions = dt.findVariableDefinitionsWithPrefix("ap");
            assert.deepStrictEqual(definitions.length, 1);
            const apples = definitions[0];
            assert.deepStrictEqual(apples.name.toString(), "apples");
            const applesValue = extension_bundle_1.Json.asStringValue(apples.value);
            assert(applesValue);
            assert.deepStrictEqual(applesValue.span, new extension_bundle_1.Language.Span(27, 8));
            assert.deepStrictEqual(applesValue.toString(), "APPLES");
        });
        test("with prefix of none of the variables", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("{ 'variables': { 'apples': 'APPLES', 'bananas': 88 } }", "id");
            assert.deepStrictEqual([], dt.findVariableDefinitionsWithPrefix("ca"));
        });
    });
    suite("getContextFromDocumentLineAndColumnIndexes(number, number)", () => {
        test("with empty deployment template", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("", "id");
            const context = dt.getContextFromDocumentLineAndColumnIndexes(0, 0);
            assert(context);
            assert.equal(0, context.documentLineIndex);
            assert.equal(0, context.documentColumnIndex);
            assert.equal(0, context.documentCharacterIndex);
        });
    });
    suite("findReferences(Reference.Type, string)", () => {
        test("with null type", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("", "id");
            assert.throws(() => { dt.findReferences(null, "rName"); });
        });
        test("with undefined type", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("", "id");
            assert.throws(() => { dt.findReferences(undefined, "rName"); });
        });
        test("with null name", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("", "id");
            const list = dt.findReferences(extension_bundle_1.Reference.ReferenceKind.Parameter, null);
            assert(list);
            assert.deepStrictEqual(list.kind, extension_bundle_1.Reference.ReferenceKind.Parameter);
            assert.deepStrictEqual(list.spans, []);
        });
        test("with undefined name", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("", "id");
            const list = dt.findReferences(extension_bundle_1.Reference.ReferenceKind.Parameter, undefined);
            assert(list);
            assert.deepStrictEqual(list.kind, extension_bundle_1.Reference.ReferenceKind.Parameter);
            assert.deepStrictEqual(list.spans, []);
        });
        test("with empty name", () => {
            const dt = new extension_bundle_1.DeploymentTemplate("", "id");
            const list = dt.findReferences(extension_bundle_1.Reference.ReferenceKind.Parameter, "");
            assert(list);
            assert.deepStrictEqual(list.kind, extension_bundle_1.Reference.ReferenceKind.Parameter);
            assert.deepStrictEqual(list.spans, []);
        });
        test("with parameter type and no matching parameter definition", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "parameters": { "pName": {} } }`, "id");
            const list = dt.findReferences(extension_bundle_1.Reference.ReferenceKind.Parameter, "dontMatchMe");
            assert(list);
            assert.deepStrictEqual(list.kind, extension_bundle_1.Reference.ReferenceKind.Parameter);
            assert.deepStrictEqual(list.spans, []);
        });
        test("with parameter type and matching parameter definition", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "parameters": { "pName": {} } }`, "id");
            const list = dt.findReferences(extension_bundle_1.Reference.ReferenceKind.Parameter, "pName");
            assert(list);
            assert.deepStrictEqual(list.kind, extension_bundle_1.Reference.ReferenceKind.Parameter);
            assert.deepStrictEqual(list.spans, [new extension_bundle_1.Language.Span(19, 5)]);
        });
        test("with variable type and no matching variable definition", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "vName": {} } }`, "id");
            const list = dt.findReferences(extension_bundle_1.Reference.ReferenceKind.Variable, "dontMatchMe");
            assert(list);
            assert.deepStrictEqual(list.kind, extension_bundle_1.Reference.ReferenceKind.Variable);
            assert.deepStrictEqual(list.spans, []);
        });
        test("with variable type and matching variable definition", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "vName": {} } }`, "id");
            const list = dt.findReferences(extension_bundle_1.Reference.ReferenceKind.Variable, "vName");
            assert(list);
            assert.deepStrictEqual(list.kind, extension_bundle_1.Reference.ReferenceKind.Variable);
            assert.deepStrictEqual(list.spans, [new extension_bundle_1.Language.Span(18, 5)]);
        });
    });
});
suite("ReferenceInVariableDefinitionJSONVisitor", () => {
    suite("constructor(DeploymentTemplate)", () => {
        test("with null", () => {
            assert.throws(() => { new extension_bundle_1.ReferenceInVariableDefinitionJSONVisitor(null); });
        });
        test("with undefined", () => {
            assert.throws(() => { new extension_bundle_1.ReferenceInVariableDefinitionJSONVisitor(undefined); });
        });
        test("with deploymentTemplate", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": "[reference('test')]" } }`, "id");
            const visitor = new extension_bundle_1.ReferenceInVariableDefinitionJSONVisitor(dt);
            assert.deepStrictEqual(visitor.referenceSpans, []);
        });
        testDiagnostics_1.testDiagnostics("error: reference in variable definition", {
            "variables": {
                "a": "[reference('test')]"
            },
        }, {}, [
            "Error: reference() cannot be invoked inside of a variable definition. (ARM Tools)",
            "Warning: The variable 'a' is never used. (ARM Tools)"
        ]);
    });
    suite("visitStringValue(Json.StringValue)", () => {
        test("with null", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": "[reference('test')]" } }`, "id");
            const visitor = new extension_bundle_1.ReferenceInVariableDefinitionJSONVisitor(dt);
            assert.throws(() => { visitor.visitStringValue(null); });
        });
        test("with undefined", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": "[reference('test')]" } }`, "id");
            const visitor = new extension_bundle_1.ReferenceInVariableDefinitionJSONVisitor(dt);
            assert.throws(() => { visitor.visitStringValue(undefined); });
        });
        test("with non-TLE string", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": "[reference('test')]" } }`, "id");
            const visitor = new extension_bundle_1.ReferenceInVariableDefinitionJSONVisitor(dt);
            const variables = extension_bundle_1.Json.asObjectValue(dt.jsonParseResult.value).properties[0].name;
            visitor.visitStringValue(variables);
            assert.deepStrictEqual(visitor.referenceSpans, []);
        });
        test("with TLE string with reference() call", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": "[reference('test')]" } }`, "id");
            const visitor = new extension_bundle_1.ReferenceInVariableDefinitionJSONVisitor(dt);
            const dtObject = extension_bundle_1.Json.asObjectValue(dt.jsonParseResult.value);
            const variablesObject = extension_bundle_1.Json.asObjectValue(dtObject.getPropertyValue("variables"));
            const tle = extension_bundle_1.Json.asStringValue(variablesObject.getPropertyValue("a"));
            visitor.visitStringValue(tle);
            assert.deepStrictEqual(visitor.referenceSpans, [new extension_bundle_1.Language.Span(24, 9)]);
        });
        test("with TLE string with reference() call inside concat() call", () => {
            const dt = new extension_bundle_1.DeploymentTemplate(`{ "variables": { "a": "[concat(reference('test'))]" } }`, "id");
            const visitor = new extension_bundle_1.ReferenceInVariableDefinitionJSONVisitor(dt);
            const dtObject = extension_bundle_1.Json.asObjectValue(dt.jsonParseResult.value);
            const variablesObject = extension_bundle_1.Json.asObjectValue(dtObject.getPropertyValue("variables"));
            const tle = extension_bundle_1.Json.asStringValue(variablesObject.getPropertyValue("a"));
            visitor.visitStringValue(tle);
            assert.deepStrictEqual(visitor.referenceSpans, [new extension_bundle_1.Language.Span(31, 9)]);
        });
    });
});
suite("Incomplete JSON shouldn't crash parse", function () {
    this.timeout(10000);
    const template = `{
        "$schema": "http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
        "contentVersion": "1.0.0.0",
        "parameters": {
            "location": { "type": "string" },
            "networkInterfaceName": {
                "type": "string"
            },
        },
        "variables": {
            "vnetId": "[resourceId(resourceGroup().name,'Microsoft.Network/virtualNetworks', parameters('virtualNetworkName'))]",
        },
        "resources": [
            {
                "name": "[parameters('networkInterfaceName')]",
                "type": "Microsoft.Network/networkInterfaces",
                "apiVersion": "2018-10-01",
                "location": "[parameters('location')]",
                "dependsOn": [
                    "[concat('Microsoft.Network/networkSecurityGroups/', parameters('networkSecurityGroupName'))]",
                    "[concat('Microsoft.Network/virtualNetworks/', parameters('virtualNetworkName'))]",
                    "[concat('Microsoft.Network/publicIpAddresses/', parameters('publicIpAddressName'))]"
                ],
                "properties": {
                    "$test-commandToExecute": "[concat('cd /hub*/docker-compose; sudo docker-compose down -t 60; sudo -s source /set_hub_url.sh ', reference(parameters('publicIpName')).dnsSettings.fqdn, ';  sudo docker volume rm ''dockercompose_cert-volume''; sudo docker-compose up')]",
                    "ipConfigurations": [
                        {
                            "name": "ipconfig1",
                            "properties": {
                                "subnet": {
                                    "id": "[variables('subnetRef')]"
                                },
                                "privateIPAllocationMethod": "Dynamic",
                                "publicIpAddress": {
                                    "id": "[resourceId(resourceGroup().name, 'Microsoft.Network/publicIpAddresses', parameters('publicIpAddressName'))]"
                                }
                            }
                        }
                    ]
                },
                "tags": {}
            }
        ],
        "outputs": {
            "adminUsername": {
                "type": "string",
                "value": "[parameters('adminUsername')]"
            }
        }
    }
    `;
    test("https://github.com/Microsoft/vscode-azurearmtools/issues/193", () => __awaiter(this, void 0, void 0, function* () {
        // Just make sure nothing throws
        let modifiedTemplate = template.replace('"type": "string"', '"type": string');
        let dt = new extension_bundle_1.DeploymentTemplate(modifiedTemplate, "id");
        yield dt.errors;
    }));
    test("typing character by character", () => __awaiter(this, void 0, void 0, function* () {
        // Just make sure nothing throws
        for (let i = 0; i < template.length; ++i) {
            let partialTemplate = template.slice(0, i);
            let dt = new extension_bundle_1.DeploymentTemplate(partialTemplate, "id");
            yield dt.errors;
        }
    }));
    test("typing backwards character by character", () => __awaiter(this, void 0, void 0, function* () {
        // Just make sure nothing throws
        for (let i = 0; i < template.length; ++i) {
            let partialTemplate = template.slice(i);
            let dt = new extension_bundle_1.DeploymentTemplate(partialTemplate, "id");
            yield dt.errors;
        }
    }));
    test("Random modifications", () => __awaiter(this, void 0, void 0, function* () {
        // Just make sure nothing throws
        let modifiedTemplate = template;
        for (let i = 0; i < 1000; ++i) {
            if (modifiedTemplate.length > 0 && Math.random() < 0.5) {
                // Delete some characters
                let position = Math.random() * (modifiedTemplate.length - 1);
                let length = Math.random() * Math.max(5, modifiedTemplate.length);
                modifiedTemplate = modifiedTemplate.slice(position, position + length);
            }
            else {
                // Insert some characters
                let position = Math.random() * modifiedTemplate.length;
                let length = Math.random() * 5;
                let s = crypto_1.randomBytes(length).toString();
                modifiedTemplate = modifiedTemplate.slice(0, position) + s + modifiedTemplate.slice(position);
            }
            let dt = new extension_bundle_1.DeploymentTemplate(modifiedTemplate, "id");
            yield dt.errors;
        }
    }));
});
//# sourceMappingURL=DeploymentTemplate.test.js.map