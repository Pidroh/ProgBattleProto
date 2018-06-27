/**
 * @version 1.0.0.0
 * @author UNITCOM PC
 * @copyright Copyright © UNITCOM PC 2018
 * @compiler Bridge.NET 17.1.1
 */
Bridge.assembly("BridgeBuild", function ($asm, globals) {
    "use strict";

    Bridge.define("BridgeBuild.App", {
        main: function Main () {
            Pidroh.BaseUtils.DeepCloneHelper.debug.Active$1(false);
            new Pidroh.TurnBased.TextRendering.ReflectionTest();
            BridgeBuild.App.TestEntitySystem();
            //Console.WriteLine("Game Start");
            BridgeBuild.App.SetupGame(Bridge.ref(BridgeBuild.App, "gr"), Bridge.ref(BridgeBuild.App, "TextBoard"));
            BridgeBuild.App.colors = System.Array.init(30, null, System.String);
            for (var i = 0; i < Pidroh.ConsoleApp.Turnbased.ColorStuff.colors.length; i = (i + 1) | 0) {

                BridgeBuild.App.colors[System.Array.index(i, BridgeBuild.App.colors)] = Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(i, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)];
            }



            var style = document.createElement("style");
            style.innerHTML = "html,body {font-family: Courier; background-color:#1f2526; height: 100%; color:#888;}\n #canvas-container {width: 100%; height: 100%; text-align:center; vertical-align: middle; } ";
            document.head.appendChild(style);
            BridgeBuild.App.buffer = 9;
            BridgeBuild.App.bufferOn = false;



            document.onkeypress = Bridge.fn.combine(document.onkeypress, function (a) {

                var code = a.keyCode;
                if (code === 0) {
                    code = a.charCode;
                }
                var unicode = code;
                BridgeBuild.App.bufferUnicode = unicode;
                //Console.Write(unicode);
                //buffer = a.CharCode;

            });

            BridgeBuild.App.UpdateGame();

            // After building (Ctrl + Shift + B) this project, 
            // browse to the /bin/Debug or /bin/Release folder.

            // A new bridge/ folder has been created and
            // contains your projects JavaScript files. 

            // Open the bridge/index.html file in a browser by
            // Right-Click > Open With..., then choose a
            // web browser from the list

            // This application will then run in a browser.
        },
        statics: {
            fields: {
                buffer: 0,
                bufferOn: false,
                gr: null,
                TextBoard: null,
                colors: null,
                bufferUnicode: 0,
                aux: null,
                last: null,
                CanDraw: false
            },
            ctors: {
                init: function () {
                    this.last = System.DateTime.getDefaultValue();
                    this.bufferUnicode = -1;
                    this.last = System.DateTime.getNow();
                }
            },
            methods: {
                SetupGame: function (gr, TextBoard) {

                    var rnd = new System.Random.ctor();
                    Pidroh.BaseUtils.RandomSupplier.Generate = function () {
                        return rnd.NextDouble();
                    };

                    gr.v = new Pidroh.ConsoleApp.Turnbased.GameMain();
                    TextBoard.v = gr.v.GetBoard();
                    BridgeBuild.App.aux = new Pidroh.TextRendering.TextBoard(300, 300);



                },
                TestEntitySystem: function () {

                },
                UpdateGame: function () {
                    if (BridgeBuild.App.CanDraw) {
                        var now = System.DateTime.getNow();
                        var secs = (System.DateTime.subdd(now, BridgeBuild.App.last)).getTotalSeconds();
                        if (secs > 0.08) {
                            //Console.WriteLine(secs);
                            secs = 0.08;
                        }

                        BridgeBuild.App.TextBoard = BridgeBuild.App.gr.GetBoard();
                        BridgeBuild.App.gr.Draw(secs);
                        BridgeBuild.App.last = now;
                        BridgeBuild.App.gr.InputUnicode = BridgeBuild.App.bufferUnicode;
                        BridgeBuild.App.bufferUnicode = -1;

                        var mouseX = getMouseX();
                        var mouseY = getMouseY();
                        BridgeBuild.App.gr.Mouse.pos = new Pidroh.BaseUtils.Point2D.$ctor1(mouseX, mouseY);

                        //;;Script.Call("clear");
                        for (var j = 0; j < BridgeBuild.App.TextBoard.Height; j = (j + 1) | 0) {
                            for (var i = 0; i < BridgeBuild.App.TextBoard.Width; i = (i + 1) | 0) {
                                if (!BridgeBuild.App.aux.SameAs(BridgeBuild.App.TextBoard, i, j)) {
                                    var tcI = BridgeBuild.App.TextBoard.TextColor.get([i, j]);
                                    var color = BridgeBuild.App.colors[System.Array.index(0, BridgeBuild.App.colors)];
                                    if (tcI < 0) {
                                    } else if (tcI >= BridgeBuild.App.colors.length) {
                                    } else {
                                        color = BridgeBuild.App.colors[System.Array.index(tcI, BridgeBuild.App.colors)];
                                    }



                                    var backColor = BridgeBuild.App.colors[System.Array.index(BridgeBuild.App.TextBoard.BackColor.get([i, j]), BridgeBuild.App.colors)];
                                    var $char = BridgeBuild.App.TextBoard.CharAt(i, j);
                                    draw(i, j, color, backColor, "" + String.fromCharCode($char));
                                    BridgeBuild.App.aux.Copy(BridgeBuild.App.TextBoard, i, j);
                                } else {
                                    //Script.Call("draw", i, j, colors[TextBoard.TextColor[i, j]], colors[TextBoard.BackColor[i, j]], "x");
                                }


                            }
                        }
                    } else {
                        BridgeBuild.App.CanDraw = isReadyToDraw();
                    }


                    window.setTimeout(BridgeBuild.App.UpdateGame, 15);
                }
            }
        }
    });

    Bridge.define("BridgeBuild.App.Bla", {
        $kind: "nested class",
        fields: {
            i: 0,
            pos: null
        },
        ctors: {
            init: function () {
                this.pos = new BridgeBuild.App.Vector();
                this.i = 3;
            }
        }
    });

    Bridge.define("BridgeBuild.App.Vector", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new BridgeBuild.App.Vector(); }
            }
        },
        fields: {
            x: 0,
            y: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1952700357, this.x, this.y]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, BridgeBuild.App.Vector)) {
                    return false;
                }
                return Bridge.equals(this.x, o.x) && Bridge.equals(this.y, o.y);
            },
            $clone: function (to) {
                var s = to || new BridgeBuild.App.Vector();
                s.x = this.x;
                s.y = this.y;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.BaseUtils.ArrayExtensions.ArrayExtensions", {
        statics: {
            methods: {
                ForEach: function (array, action) {
                    if (array.length === 0) {
                        return;
                    }
                    var walker = new Pidroh.BaseUtils.ArrayExtensions.ArrayTraverse(array);
                    do {
                        action(array, walker.Position);
                    } while (walker.Step());
                }
            }
        }
    });

    Bridge.define("Pidroh.BaseUtils.ArrayExtensions.ArrayTraverse", {
        fields: {
            Position: null,
            maxLengths: null
        },
        ctors: {
            ctor: function (array) {
                this.$initialize();
                this.maxLengths = System.Array.init(System.Array.getRank(array), 0, System.Int32);
                for (var i = 0; i < System.Array.getRank(array); i = (i + 1) | 0) {
                    this.maxLengths[System.Array.index(i, this.maxLengths)] = (System.Array.getLength(array, i) - 1) | 0;
                }
                this.Position = System.Array.init(System.Array.getRank(array), 0, System.Int32);
            }
        },
        methods: {
            Step: function () {
                for (var i = 0; i < this.Position.length; i = (i + 1) | 0) {
                    if (this.Position[System.Array.index(i, this.Position)] < this.maxLengths[System.Array.index(i, this.maxLengths)]) {
                        this.Position[System.Array.index(i, this.Position)] = (this.Position[System.Array.index(i, this.Position)] + 1) | 0;
                        for (var j = 0; j < i; j = (j + 1) | 0) {
                            this.Position[System.Array.index(j, this.Position)] = 0;
                        }
                        return true;
                    }
                }
                return false;
            }
        }
    });

    Bridge.define("Pidroh.BaseUtils.Debugger", {
        fields: {
            debugging: false,
            ident: 0,
            stringBuilder: null
        },
        ctors: {
            init: function () {
                this.stringBuilder = new System.Text.StringBuilder();
            },
            ctor: function (debugging) {
                this.$initialize();
                this.debugging = debugging;
            }
        },
        methods: {
            Print$1: function (s) {
                if (!this.debugging) {
                    return;
                }
                for (var i = 0; i < this.ident; i = (i + 1) | 0) {
                    System.Console.Write(String.fromCharCode(32));
                }
                System.Console.WriteLine(s);
            },
            Print: function (obj) {
                var $t;
                this.stringBuilder.setLength(0);

                var type = Bridge.getType(obj);
                this.stringBuilder.append("Type: ");
                this.stringBuilder.append(Bridge.Reflection.getTypeName(type));
                this.stringBuilder.appendLine();
                var fields = Bridge.Reflection.getMembers(type, 4, 52);
                $t = Bridge.getEnumerator(fields);
                try {
                    while ($t.moveNext()) {
                        var f = $t.Current;
                        this.stringBuilder.append(String.fromCharCode(32));
                        this.stringBuilder.append(String.fromCharCode(32));
                        this.stringBuilder.append(Bridge.Reflection.fieldAccess(f, obj));
                        this.stringBuilder.append(String.fromCharCode(32));
                        this.stringBuilder.append(String.fromCharCode(32));
                        this.stringBuilder.append(f.n);
                        this.stringBuilder.appendLine();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }System.Console.WriteLine(this.stringBuilder.toString());
            },
            Deident: function () {
                this.ident = (this.ident - 2) | 0;
                ;
            },
            Ident: function () {
                this.ident = (this.ident + 2) | 0;
            },
            Active: function () {
                this.debugging = true;
            },
            Active$1: function (v) {
                this.debugging = v;
            }
        }
    });

    Bridge.define("Pidroh.BaseUtils.DeepCloneHelper", {
        statics: {
            fields: {
                debug: null
            },
            ctors: {
                init: function () {
                    this.debug = new Pidroh.BaseUtils.Debugger(false);
                }
            },
            methods: {
                /**
                 * Get the deep clone of an object.
                 *
                 * @static
                 * @public
                 * @this Pidroh.BaseUtils.DeepCloneHelper
                 * @memberof Pidroh.BaseUtils.DeepCloneHelper
                 * @param   {Function}    T      The type of the obj.
                 * @param   {T}           obj    It is the object used to deep clone.
                 * @return  {T}                  Return the deep clone.
                 */
                DeepClone: function (T, obj) {
                    if (obj == null) {
                        throw new System.ArgumentNullException.$ctor1("Object is null");
                    }
                    return Bridge.cast(Pidroh.BaseUtils.DeepCloneHelper.CloneProcedure(obj), T);
                },
                DeepCopyPartial: function (from, to) {
                    if (from == null) {
                        throw new System.ArgumentNullException.$ctor1("Object is null");
                    }
                    Pidroh.BaseUtils.DeepCloneHelper.CopyProcedurePartial(from, to);
                },
                /**
                 * The method implements deep clone using reflection.
                 *
                 * @static
                 * @private
                 * @this Pidroh.BaseUtils.DeepCloneHelper
                 * @memberof Pidroh.BaseUtils.DeepCloneHelper
                 * @param   {System.Object}    obj    It is the object used to deep clone.
                 * @return  {System.Object}           Return the deep clone.
                 */
                CloneProcedure: function (obj) {
                    var $t;

                    if (obj == null) {
                        return null;
                    }

                    var type = Bridge.getType(obj);

                    Pidroh.BaseUtils.DeepCloneHelper.debug.Print$1(System.String.concat("Cloning: ", Bridge.getTypeName(type)));
                    //debug.Print(type);

                    // If the type of object is the value type, we will always get a new object when 
                    // the original object is assigned to another variable. So if the type of the 
                    // object is primitive or enum, we just return the object. We will process the 
                    // struct type subsequently because the struct type may contain the reference 
                    // fields.
                    // If the string variables contain the same chars, they always refer to the same 
                    // string in the heap. So if the type of the object is string, we also return the 
                    // object.
                    if (Bridge.Reflection.isEnum(type) || Bridge.referenceEquals(type, System.String) || Bridge.referenceEquals(type, System.Int32) || Bridge.referenceEquals(type, System.Char) || Bridge.referenceEquals(type, System.Single) || Bridge.referenceEquals(type, System.Double) || Bridge.referenceEquals(type, System.Boolean)) {
                        Pidroh.BaseUtils.DeepCloneHelper.debug.Print$1(System.String.concat(Bridge.getTypeName(type), " ", obj) + " -V");

                        return obj;
                    } else if (Bridge.isArray(null, type)) {

                        //string typeName = type.FullName.Replace("[]", string.Empty);
                        //debug.Print(typeName);
                        var typeElement = (type.$elementType || null);

                        //debug.Print(typeElement+"ss");
                        var array = Bridge.as(obj, Array);
                        var length = array.length;
                        var copiedArray = System.Array.init(length, Bridge.getDefaultValue(typeElement), typeElement);
                        for (var i = 0; i < array.length; i = (i + 1) | 0) {
                            // Get the deep clone of the element in the original array and assign the 
                            // clone to the new array.
                            System.Array.set(copiedArray, Pidroh.BaseUtils.DeepCloneHelper.CloneProcedure(System.Array.get(array, i)), i);

                        }
                        return copiedArray;
                    } else if (Bridge.Reflection.isClass(type) || Bridge.Reflection.isValueType(type)) {
                        var copiedObject = Bridge.createInstance(Bridge.getType(obj));

                        // Get all FieldInfo.
                        var fields = Bridge.Reflection.getMembers(type, 4, 52);
                        $t = Bridge.getEnumerator(fields);
                        try {
                            while ($t.moveNext()) {
                                var field = $t.Current;

                                Pidroh.BaseUtils.DeepCloneHelper.debug.Print$1("Field: " + (field.n || ""));
                                var fieldValue = Bridge.Reflection.fieldAccess(field, obj);
                                if (fieldValue != null) {
                                    Pidroh.BaseUtils.DeepCloneHelper.debug.Print$1("Field: " + (field.n || "") + " being set");
                                    // Get the deep clone of the field in the original object and assign the 
                                    // clone to the field in the new object.
                                    Bridge.Reflection.fieldAccess(field, copiedObject, Pidroh.BaseUtils.DeepCloneHelper.CloneProcedure(fieldValue));
                                }

                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }
                        return copiedObject;
                    } else {
                        throw new System.ArgumentException.$ctor1("The object is unknown type");
                    }
                },
                CopyProcedurePartial: function (from, to) {
                    var $t;
                    if (from == null) {
                        return null;
                    }

                    var type = Bridge.getType(from);

                    Pidroh.BaseUtils.DeepCloneHelper.debug.Print$1(System.String.concat("Copying ", Bridge.getTypeName(type)));
                    Pidroh.BaseUtils.DeepCloneHelper.debug.Ident();

                    // If the type of object is the value type, we will always get a new object when 
                    // the original object is assigned to another variable. So if the type of the 
                    // object is primitive or enum, we just return the object. We will process the 
                    // struct type subsequently because the struct type may contain the reference 
                    // fields.
                    // If the string variables contain the same chars, they always refer to the same 
                    // string in the heap. So if the type of the object is string, we also return the 
                    // object.
                    if (Bridge.Reflection.isEnum(type) || Bridge.referenceEquals(type, System.String) || Bridge.referenceEquals(type, System.Int32) || Bridge.referenceEquals(type, System.Char) || Bridge.referenceEquals(type, System.Single) || Bridge.referenceEquals(type, System.Double)) {

                        Pidroh.BaseUtils.DeepCloneHelper.debug.Print$1(System.String.concat(Bridge.getTypeName(type), " ", from) + " -V");
                        Pidroh.BaseUtils.DeepCloneHelper.debug.Deident();
                        return from;
                    } else if (Bridge.isArray(null, type)) {
                        Pidroh.BaseUtils.DeepCloneHelper.debug.Deident();
                        return null;
                    } else if (Bridge.Reflection.isClass(type) || Bridge.Reflection.isValueType(type)) {
                        var copiedObject = to;

                        // Get all FieldInfo.
                        var fields = Bridge.Reflection.getMembers(type, 4, 52);
                        $t = Bridge.getEnumerator(fields);
                        try {
                            while ($t.moveNext()) {
                                var field = $t.Current;

                                Pidroh.BaseUtils.DeepCloneHelper.debug.Print$1("Field: " + (field.n || ""));
                                var fieldValue = Bridge.Reflection.fieldAccess(field, from);
                                if (fieldValue != null) {
                                    Pidroh.BaseUtils.DeepCloneHelper.debug.Print$1("Field: " + (field.n || "") + " not null, being set");
                                    // Get the deep clone of the field in the original object and assign the 
                                    // clone to the field in the new object.
                                    Pidroh.BaseUtils.DeepCloneHelper.debug.Ident();
                                    Bridge.Reflection.fieldAccess(field, copiedObject, Pidroh.BaseUtils.DeepCloneHelper.CloneProcedure(fieldValue));
                                    Pidroh.BaseUtils.DeepCloneHelper.debug.Deident();
                                }

                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }Pidroh.BaseUtils.DeepCloneHelper.debug.Deident();
                        return copiedObject;
                    } else {
                        Pidroh.BaseUtils.DeepCloneHelper.debug.Deident();
                        throw new System.ArgumentException.$ctor1("The object is unknown type");
                    }
                }
            }
        }
    });

    Bridge.define("Pidroh.BaseUtils.Extensions", {
        statics: {
            fields: {
                rng: null
            },
            ctors: {
                init: function () {
                    this.rng = new System.Random.ctor();
                }
            },
            methods: {
                Shuffle: function (T, list) {
                    var n = System.Array.getCount(list, T);
                    while (n > 1) {
                        n = (n - 1) | 0;
                        var k = Pidroh.BaseUtils.Extensions.rng.Next$1(((n + 1) | 0));
                        var value = System.Array.getItem(list, k, T);
                        System.Array.setItem(list, k, System.Array.getItem(list, n, T), T);
                        System.Array.setItem(list, n, value, T);
                    }
                }
            }
        }
    });

    Bridge.define("Pidroh.BaseUtils.ObjectExtensions", {
        statics: {
            fields: {
                CloneMethod: null
            },
            ctors: {
                init: function () {
                    this.CloneMethod = Bridge.Reflection.getMembers(System.Object, 8, 36 | 256, "MemberwiseClone");
                }
            },
            methods: {
                IsPrimitiveMethod: function (type) {
                    if (Bridge.referenceEquals(type, System.String)) {
                        return true;
                    }
                    if (Bridge.referenceEquals(type, System.Int32)) {
                        return true;
                    }
                    if (Bridge.referenceEquals(type, System.Single)) {
                        return true;
                    }
                    if (Bridge.referenceEquals(type, System.Double)) {
                        return true;
                    }
                    if (Bridge.referenceEquals(type, System.Char)) {
                        return true;
                    }
                    //bool isPrimitive = type.IsPrimitive;
                    var isValueType = Bridge.Reflection.isValueType(type);
                    return isValueType; //& isPrimitive;
                },
                Copy$1: function (originalObject) {
                    return Pidroh.BaseUtils.ObjectExtensions.InternalCopy(originalObject, new (System.Collections.Generic.Dictionary$2(System.Object, System.Object))(null, new Pidroh.BaseUtils.ReferenceEqualityComparer()));
                },
                Copy: function (T, original) {
                    return Bridge.cast(Pidroh.BaseUtils.ObjectExtensions.Copy$1(original), T);
                },
                InternalCopy: function (originalObject, visited) {
                    if (originalObject == null) {
                        return null;
                    }
                    var typeToReflect = Bridge.getType(originalObject);
                    if (Pidroh.BaseUtils.ObjectExtensions.IsPrimitiveMethod(typeToReflect)) {
                        return originalObject;
                    }
                    if (visited.System$Collections$Generic$IDictionary$2$System$Object$System$Object$containsKey(originalObject)) {
                        return visited.System$Collections$Generic$IDictionary$2$System$Object$System$Object$getItem(originalObject);
                    }
                    if (Bridge.Reflection.isAssignableFrom(Function, typeToReflect)) {
                        return null;
                    }
                    var cloneObject = Bridge.Reflection.midel(Pidroh.BaseUtils.ObjectExtensions.CloneMethod, originalObject).apply(null, System.Array.init([], System.Object));
                    if (Bridge.isArray(null, typeToReflect)) {
                        var arrayType = (typeToReflect.$elementType || null);
                        if (Pidroh.BaseUtils.ObjectExtensions.IsPrimitiveMethod(arrayType) === false) {
                            var clonedArray = Bridge.cast(cloneObject, Array);
                            Pidroh.BaseUtils.ArrayExtensions.ArrayExtensions.ForEach(clonedArray, function (array, indices) {
                                System.Array.set.apply(System.Array, [array, Pidroh.BaseUtils.ObjectExtensions.InternalCopy(System.Array.get.apply(System.Array, [clonedArray].concat(indices)), visited)].concat(indices));
                            });
                        }

                    }
                    visited.System$Collections$Generic$IDictionary$2$System$Object$System$Object$add(originalObject, cloneObject);
                    Pidroh.BaseUtils.ObjectExtensions.CopyFields(originalObject, visited, cloneObject, typeToReflect);
                    Pidroh.BaseUtils.ObjectExtensions.RecursiveCopyBaseTypePrivateFields(originalObject, visited, cloneObject, typeToReflect);
                    return cloneObject;
                },
                RecursiveCopyBaseTypePrivateFields: function (originalObject, visited, cloneObject, typeToReflect) {
                    if (Bridge.Reflection.getBaseType(typeToReflect) != null) {
                        Pidroh.BaseUtils.ObjectExtensions.RecursiveCopyBaseTypePrivateFields(originalObject, visited, cloneObject, Bridge.Reflection.getBaseType(typeToReflect));
                        Pidroh.BaseUtils.ObjectExtensions.CopyFields(originalObject, visited, cloneObject, Bridge.Reflection.getBaseType(typeToReflect), 36, function (info) {
                            return (info.a === 1);
                        });
                    }
                },
                CopyFields: function (originalObject, visited, cloneObject, typeToReflect, bindingFlags, filter) {
                    var $t;
                    if (bindingFlags === void 0) { bindingFlags = 116; }
                    if (filter === void 0) { filter = null; }
                    $t = Bridge.getEnumerator(Bridge.Reflection.getMembers(typeToReflect, 4, bindingFlags));
                    try {
                        while ($t.moveNext()) {
                            var fieldInfo = $t.Current;
                            if (!Bridge.staticEquals(filter, null) && filter(fieldInfo) === false) {
                                continue;
                            }
                            if (Pidroh.BaseUtils.ObjectExtensions.IsPrimitiveMethod(fieldInfo.rt)) {
                                continue;
                            }
                            var originalFieldValue = Bridge.Reflection.fieldAccess(fieldInfo, originalObject);
                            var clonedFieldValue = Pidroh.BaseUtils.ObjectExtensions.InternalCopy(originalFieldValue, visited);
                            Bridge.Reflection.fieldAccess(fieldInfo, cloneObject, clonedFieldValue);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }}
            }
        }
    });

    Bridge.define("Pidroh.BaseUtils.Point2D", {
        inherits: function () { return [System.IEquatable$1(Pidroh.BaseUtils.Point2D)]; },
        $kind: "struct",
        statics: {
            fields: {
                zeroPoint: null
            },
            props: {
                Zero: {
                    get: function () {
                        return Pidroh.BaseUtils.Point2D.zeroPoint.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.zeroPoint = new Pidroh.BaseUtils.Point2D();
                }
            },
            methods: {
                op_Equality: function (a, b) {
                    return a.equalsT(b.$clone());
                },
                op_Inequality: function (a, b) {
                    return !a.equalsT(b.$clone());
                },
                getDefaultValue: function () { return new Pidroh.BaseUtils.Point2D(); }
            }
        },
        fields: {
            X: 0,
            Y: 0
        },
        alias: ["equalsT", "System$IEquatable$1$Pidroh$BaseUtils$Point2D$equalsT"],
        ctors: {
            $ctor1: function (x, y) {
                this.$initialize();
                this.X = x;
                this.Y = y;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            equalsT: function (other) {
                return ((this.X === other.X) && (this.Y === other.Y));
            },
            equals: function (obj) {
                return (Bridge.is(obj, Pidroh.BaseUtils.Point2D)) ? this.equalsT(Bridge.cast(obj, Pidroh.BaseUtils.Point2D)) : false;
            },
            getHashCode: function () {
                return this.X ^ this.Y;
            },
            toString: function () {
                return System.String.format("{{X:{0} Y:{1}}}", this.X, this.Y);
            },
            $clone: function (to) {
                var s = to || new Pidroh.BaseUtils.Point2D();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.BaseUtils.RandomSupplier", {
        statics: {
            fields: {
                Generate: null
            },
            methods: {
                Range: function (min, max) {
                    return Bridge.Int.clip32(Pidroh.BaseUtils.RandomSupplier.Generate() * (((max - min) | 0)) + min);
                },
                RandomElement: function (T, array) {
                    return array[System.Array.index(Pidroh.BaseUtils.RandomSupplier.Range(0, array.length), array)];
                }
            }
        }
    });

    Bridge.define("Pidroh.BaseUtils.Rect", {
        inherits: function () { return [System.IEquatable$1(Pidroh.BaseUtils.Rect)]; },
        $kind: "struct",
        statics: {
            fields: {
                emptyRectangle: null
            },
            props: {
                Empty: {
                    get: function () {
                        return Pidroh.BaseUtils.Rect.emptyRectangle.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.emptyRectangle = new Pidroh.BaseUtils.Rect();
                }
            },
            methods: {
                op_Equality: function (a, b) {
                    return ((a.X === b.X) && (a.Y === b.Y) && (a.Width === b.Width) && (a.Height === b.Height));
                },
                op_Inequality: function (a, b) {
                    return !(Pidroh.BaseUtils.Rect.op_Equality(a.$clone(), b.$clone()));
                },
                getDefaultValue: function () { return new Pidroh.BaseUtils.Rect(); }
            }
        },
        fields: {
            X: 0,
            Y: 0,
            Width: 0,
            Height: 0
        },
        props: {
            Left: {
                get: function () {
                    return this.X;
                }
            },
            Right: {
                get: function () {
                    return (((this.X + this.Width) | 0));
                }
            },
            Top: {
                get: function () {
                    return this.Y;
                }
            },
            Bottom: {
                get: function () {
                    return (((this.Y + this.Height) | 0));
                }
            },
            Center: {
                get: function () {
                    return new Pidroh.BaseUtils.Point2D.$ctor1(((Bridge.Int.div((((this.X + this.Width) | 0)), 2)) | 0), ((Bridge.Int.div((((this.Y + this.Height) | 0)), 2)) | 0));
                }
            },
            IsEmpty: {
                get: function () {
                    return ((((this.Width === 0) && (this.Height === 0)) && (this.X === 0)) && (this.Y === 0));
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Pidroh$BaseUtils$Rect$equalsT"],
        ctors: {
            $ctor1: function (x, y, width, height) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Width = width;
                this.Height = height;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            Contains$3: function (x, y) {
                return ((((this.X <= x) && (x < (((this.X + this.Width) | 0)))) && (this.Y <= y)) && (y < (((this.Y + this.Height) | 0))));
            },
            Contains$2: function (value) {
                return ((((this.X <= value.X) && (value.X < (((this.X + this.Width) | 0)))) && (this.Y <= value.Y)) && (value.Y < (((this.Y + this.Height) | 0))));
            },
            Contains: function (value) {
                return ((((this.X <= value.X) && (value.X < (((this.X + this.Width) | 0)))) && (this.Y <= value.Y)) && (value.Y < (((this.Y + this.Height) | 0))));
            },
            Contains$1: function (value) {
                return ((((this.X <= value.X) && ((((value.X + value.Width) | 0)) <= (((this.X + this.Width) | 0)))) && (this.Y <= value.Y)) && ((((value.Y + value.Height) | 0)) <= (((this.Y + this.Height) | 0))));
            },
            Offset: function (offset) {
                this.X = (this.X + offset.X) | 0;
                this.Y = (this.Y + offset.Y) | 0;
            },
            Offset$1: function (offsetX, offsetY) {
                this.X = (this.X + offsetX) | 0;
                this.Y = (this.Y + offsetY) | 0;
            },
            Inflate: function (horizontalValue, verticalValue) {
                this.X = (this.X - horizontalValue) | 0;
                this.Y = (this.Y - verticalValue) | 0;
                this.Width = (this.Width + (Bridge.Int.mul(horizontalValue, 2))) | 0;
                this.Height = (this.Height + (Bridge.Int.mul(verticalValue, 2))) | 0;
            },
            equalsT: function (other) {
                return Pidroh.BaseUtils.Rect.op_Equality(this, other.$clone());
            },
            equals: function (obj) {
                return (Bridge.is(obj, Pidroh.BaseUtils.Rect)) ? Pidroh.BaseUtils.Rect.op_Equality(this, Bridge.cast(obj, Pidroh.BaseUtils.Rect)) : false;
            },
            toString: function () {
                return System.String.format("{{X:{0} Y:{1} Width:{2} Height:{3}}}", this.X, this.Y, this.Width, this.Height);
            },
            getHashCode: function () {
                return (this.X ^ this.Y ^ this.Width ^ this.Height);
            },
            Intersects: function (r2) {
                return !(r2.Left > this.Right || r2.Right < this.Left || r2.Top > this.Bottom || r2.Bottom < this.Top);

            },
            Intersects$1: function (value, result) {
                result.v = !(value.v.Left > this.Right || value.v.Right < this.Left || value.v.Top > this.Bottom || value.v.Bottom < this.Top);

            },
            $clone: function (to) {
                var s = to || new Pidroh.BaseUtils.Rect();
                s.X = this.X;
                s.Y = this.Y;
                s.Width = this.Width;
                s.Height = this.Height;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.BaseUtils.ReferenceEqualityComparer", {
        inherits: [System.Collections.Generic.EqualityComparer$1(System.Object)],
        alias: [
            "equals2", ["System$Collections$Generic$IEqualityComparer$1$System$Object$equals2", "System$Collections$Generic$IEqualityComparer$1$equals2"],
            "getHashCode2", ["System$Collections$Generic$IEqualityComparer$1$System$Object$getHashCode2", "System$Collections$Generic$IEqualityComparer$1$getHashCode2"]
        ],
        methods: {
            equals2: function (x, y) {
                return Bridge.referenceEquals(x, y);
            },
            getHashCode2: function (obj) {
                if (obj == null) {
                    return 0;
                }
                return Bridge.getHashCode(obj);
            }
        }
    });

    Bridge.define("Pidroh.BaseUtils.TimeStamp", {
        fields: {
            CurrentSnap: 0
        },
        methods: {
            GetSnap: function () {
                return new Pidroh.BaseUtils.TimeStampSnap.$ctor1(this.CurrentSnap);
            },
            Advance: function (delta) {
                this.CurrentSnap += delta;
            }
        }
    });

    Bridge.define("Pidroh.BaseUtils.TimeStampSnap", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.BaseUtils.TimeStampSnap(); }
            }
        },
        fields: {
            TimeSnap: 0
        },
        ctors: {
            $ctor1: function (snap) {
                this.$initialize();
                this.TimeSnap = snap;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([5171392903, this.TimeSnap]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.BaseUtils.TimeStampSnap)) {
                    return false;
                }
                return Bridge.equals(this.TimeSnap, o.TimeSnap);
            },
            $clone: function (to) {
                var s = to || new Pidroh.BaseUtils.TimeStampSnap();
                s.TimeSnap = this.TimeSnap;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.BaseUtils.Unicode", {
        statics: {
            fields: {
                Space: 0,
                keyDown: 0,
                keyLeft: 0,
                keyUp: 0,
                keyRight: 0,
                Uparrow2: 0,
                Downarrow2: 0,
                Rightarrow2: 0,
                Leftarrow2: 0,
                Uparrow: 0,
                Downarrow: 0,
                Leftarrow: 0,
                Rightarrow: 0,
                AsciiGridHor: 0,
                AsciiGridVer: 0,
                grids: null,
                AsciiGridUpLeft: 0,
                AsciiGridUpRight: 0,
                AsciiGridUpRightLeft: 0,
                AsciiGridDownLeft: 0,
                AsciiGridDownRight: 0,
                AsciiGridDownRightLeft: 0
            },
            ctors: {
                init: function () {
                    this.Space = 32;
                    this.keyDown = 40;
                    this.keyLeft = 37;
                    this.keyUp = 38;
                    this.keyRight = 39;
                    this.Uparrow2 = 24;
                    this.Downarrow2 = 25;
                    this.Rightarrow2 = 26;
                    this.Leftarrow2 = 27;
                    this.Uparrow = 30;
                    this.Downarrow = 31;
                    this.Leftarrow = 17;
                    this.Rightarrow = 16;
                    this.AsciiGridHor = 196;
                    this.AsciiGridVer = 179;
                    this.grids = System.Array.init([Pidroh.BaseUtils.Unicode.AsciiGridHor, Pidroh.BaseUtils.Unicode.AsciiGridVer], System.Char);
                    this.AsciiGridUpLeft = 217;
                    this.AsciiGridUpRight = 192;
                    this.AsciiGridUpRightLeft = 193;
                    this.AsciiGridDownLeft = 191;
                    this.AsciiGridDownRight = 218;
                    this.AsciiGridDownRightLeft = 194;
                }
            }
        }
    });

    Bridge.define("Pidroh.BaseUtils.Vector2D", {
        inherits: function () { return [System.IEquatable$1(Pidroh.BaseUtils.Vector2D)]; },
        $kind: "struct",
        statics: {
            fields: {
                zeroVector: null,
                unitVector: null,
                unitXVector: null,
                unitYVector: null
            },
            props: {
                Zero: {
                    get: function () {
                        return Pidroh.BaseUtils.Vector2D.zeroVector.$clone();
                    }
                },
                One: {
                    get: function () {
                        return Pidroh.BaseUtils.Vector2D.unitVector.$clone();
                    }
                },
                UnitX: {
                    get: function () {
                        return Pidroh.BaseUtils.Vector2D.unitXVector.$clone();
                    }
                },
                UnitY: {
                    get: function () {
                        return Pidroh.BaseUtils.Vector2D.unitYVector.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.zeroVector = new Pidroh.BaseUtils.Vector2D();
                    this.unitVector = new Pidroh.BaseUtils.Vector2D();
                    this.unitXVector = new Pidroh.BaseUtils.Vector2D();
                    this.unitYVector = new Pidroh.BaseUtils.Vector2D();
                    this.zeroVector = new Pidroh.BaseUtils.Vector2D.$ctor2(0.0, 0.0);
                    this.unitVector = new Pidroh.BaseUtils.Vector2D.$ctor2(1.0, 1.0);
                    this.unitXVector = new Pidroh.BaseUtils.Vector2D.$ctor2(1.0, 0.0);
                    this.unitYVector = new Pidroh.BaseUtils.Vector2D.$ctor2(0.0, 1.0);
                }
            },
            methods: {
                InterpolateRounded: function (startPosition, endPosition, ratio) {
                    return (Pidroh.BaseUtils.Vector2D.op_Addition(Pidroh.BaseUtils.Vector2D.op_Multiply$1(startPosition.$clone(), (1 - ratio)), Pidroh.BaseUtils.Vector2D.op_Multiply$1(endPosition.$clone(), ratio))).Round();
                },
                Add: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    return value1.$clone();
                },
                Add$1: function (value1, value2, result) {
                    result.v.X = value1.v.X + value2.v.X;
                    result.v.Y = value1.v.Y + value2.v.Y;
                },
                Distance: function (value1, value2) {
                    var v1 = value1.X - value2.X, v2 = value1.Y - value2.Y;
                    return Math.sqrt((v1 * v1) + (v2 * v2));
                },
                Distance$1: function (value1, value2, result) {
                    var v1 = value1.v.X - value2.v.X, v2 = value1.v.Y - value2.v.Y;
                    result.v = Math.sqrt((v1 * v1) + (v2 * v2));
                },
                DistanceSquared: function (value1, value2) {
                    var v1 = value1.X - value2.X, v2 = value1.Y - value2.Y;
                    return (v1 * v1) + (v2 * v2);
                },
                DistanceSquared$1: function (value1, value2, result) {
                    var v1 = value1.v.X - value2.v.X, v2 = value1.v.Y - value2.v.Y;
                    result.v = (v1 * v1) + (v2 * v2);
                },
                Divide: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    return value1.$clone();
                },
                Divide$2: function (value1, value2, result) {
                    result.v.X = value1.v.X / value2.v.X;
                    result.v.Y = value1.v.Y / value2.v.Y;
                },
                Divide$1: function (value1, divider) {
                    var factor = 1 / divider;
                    value1.X *= factor;
                    value1.Y *= factor;
                    return value1.$clone();
                },
                Divide$3: function (value1, divider, result) {
                    var factor = 1 / divider;
                    result.v.X = value1.v.X * factor;
                    result.v.Y = value1.v.Y * factor;
                },
                Dot: function (value1, value2) {
                    return (value1.X * value2.X) + (value1.Y * value2.Y);
                },
                Dot$1: function (value1, value2, result) {
                    result.v = (value1.v.X * value2.v.X) + (value1.v.Y * value2.v.Y);
                },
                Reflect: function (vector, normal) {
                    var result = new Pidroh.BaseUtils.Vector2D();
                    var val = 2.0 * ((vector.X * normal.X) + (vector.Y * normal.Y));
                    result.X = vector.X - (normal.X * val);
                    result.Y = vector.Y - (normal.Y * val);
                    return result.$clone();
                },
                Reflect$1: function (vector, normal, result) {
                    var val = 2.0 * ((vector.v.X * normal.v.X) + (vector.v.Y * normal.v.Y));
                    result.v.X = vector.v.X - (normal.v.X * val);
                    result.v.Y = vector.v.Y - (normal.v.Y * val);
                },
                Max: function (value1, value2) {
                    return new Pidroh.BaseUtils.Vector2D.$ctor2(value1.X > value2.X ? value1.X : value2.X, value1.Y > value2.Y ? value1.Y : value2.Y);
                },
                Max$1: function (value1, value2, result) {
                    result.v.X = value1.v.X > value2.v.X ? value1.v.X : value2.v.X;
                    result.v.Y = value1.v.Y > value2.v.Y ? value1.v.Y : value2.v.Y;
                },
                Min: function (value1, value2) {
                    return new Pidroh.BaseUtils.Vector2D.$ctor2(value1.X < value2.X ? value1.X : value2.X, value1.Y < value2.Y ? value1.Y : value2.Y);
                },
                Min$1: function (value1, value2, result) {
                    result.v.X = value1.v.X < value2.v.X ? value1.v.X : value2.v.X;
                    result.v.Y = value1.v.Y < value2.v.Y ? value1.v.Y : value2.v.Y;
                },
                Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    return value1.$clone();
                },
                Multiply$1: function (value1, scaleFactor) {
                    value1.X *= scaleFactor;
                    value1.Y *= scaleFactor;
                    return value1.$clone();
                },
                Multiply$3: function (value1, scaleFactor, result) {
                    result.v.X = value1.v.X * scaleFactor;
                    result.v.Y = value1.v.Y * scaleFactor;
                },
                Multiply$2: function (value1, value2, result) {
                    result.v.X = value1.v.X * value2.v.X;
                    result.v.Y = value1.v.Y * value2.v.Y;
                },
                Negate: function (value) {
                    value.X = -value.X;
                    value.Y = -value.Y;
                    return value.$clone();
                },
                Negate$1: function (value, result) {
                    result.v.X = -value.v.X;
                    result.v.Y = -value.v.Y;
                },
                Normalize: function (value) {
                    var val = 1.0 / Math.sqrt((value.X * value.X) + (value.Y * value.Y));
                    value.X *= val;
                    value.Y *= val;
                    return value.$clone();
                },
                Normalize$1: function (value, result) {
                    var val = 1.0 / Math.sqrt((value.v.X * value.v.X) + (value.v.Y * value.v.Y));
                    result.v.X = value.v.X * val;
                    result.v.Y = value.v.Y * val;
                },
                Subtract: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    return value1.$clone();
                },
                Subtract$1: function (value1, value2, result) {
                    result.v.X = value1.v.X - value2.v.X;
                    result.v.Y = value1.v.Y - value2.v.Y;
                },
                op_UnaryNegation: function (value) {
                    value.X = -value.X;
                    value.Y = -value.Y;
                    return value.$clone();
                },
                op_Equality: function (value1, value2) {
                    return value1.X === value2.X && value1.Y === value2.Y;
                },
                op_Inequality: function (value1, value2) {
                    return value1.X !== value2.X || value1.Y !== value2.Y;
                },
                op_Addition: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    return value1.$clone();
                },
                op_Subtraction: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    return value1.$clone();
                },
                op_Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    return value1.$clone();
                },
                op_Multiply$1: function (value, scaleFactor) {
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    return value.$clone();
                },
                op_Multiply$2: function (scaleFactor, value) {
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    return value.$clone();
                },
                op_Division: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    return value1.$clone();
                },
                op_Division$1: function (value1, divider) {
                    var factor = 1 / divider;
                    value1.X *= factor;
                    value1.Y *= factor;
                    return value1.$clone();
                },
                getDefaultValue: function () { return new Pidroh.BaseUtils.Vector2D(); }
            }
        },
        fields: {
            X: 0,
            Y: 0
        },
        props: {
            XInt: {
                get: function () {
                    return Bridge.Int.clip32(this.X);
                }
            },
            YInt: {
                get: function () {
                    return Bridge.Int.clip32(this.Y);
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Pidroh$BaseUtils$Vector2D$equalsT"],
        ctors: {
            $ctor2: function (x, y) {
                this.$initialize();
                this.X = x;
                this.Y = y;
            },
            $ctor1: function (value) {
                this.$initialize();
                this.X = value;
                this.Y = value;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            Round: function () {
                return new Pidroh.BaseUtils.Vector2D.$ctor2(Bridge.Math.round(this.X, 0, 6), Bridge.Math.round(this.Y, 0, 6));
            },
            Set: function (x, y) {
                this.X = x;
                this.Y = y;

            },
            equals: function (obj) {
                if (Bridge.is(obj, Pidroh.BaseUtils.Vector2D)) {
                    return this.equalsT(this);
                }

                return false;
            },
            equalsT: function (other) {
                return (this.X === other.X) && (this.Y === other.Y);
            },
            getHashCode: function () {
                return ((System.Single.getHashCode(this.X) + System.Single.getHashCode(this.Y)) | 0);
            },
            Length: function () {
                return Math.sqrt((this.X * this.X) + (this.Y * this.Y));
            },
            LengthSquared: function () {
                return (this.X * this.X) + (this.Y * this.Y);
            },
            Normalize: function () {
                var val = 1.0 / Math.sqrt((this.X * this.X) + (this.Y * this.Y));
                this.X *= val;
                this.Y *= val;
            },
            toString: function () {
                var currentCulture = System.Globalization.CultureInfo.getCurrentCulture();
                return System.String.formatProvider.apply(System.String, [currentCulture, "{{X:{0} Y:{1}}}"].concat(System.Array.init([System.Single.format(this.X, "G", currentCulture), System.Single.format(this.Y, "G", currentCulture)], System.Object)));
            },
            $clone: function (to) {
                var s = to || new Pidroh.BaseUtils.Vector2D();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.BaseUtils.Vector3D", {
        inherits: function () { return [System.IEquatable$1(Pidroh.BaseUtils.Vector3D)]; },
        $kind: "struct",
        statics: {
            fields: {
                zero: null,
                one: null,
                unitX: null,
                unitY: null,
                unitZ: null,
                up: null,
                down: null,
                right: null,
                left: null,
                forward: null,
                backward: null
            },
            props: {
                /**
                 * Returns a {@link } with components 0, 0, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Pidroh.BaseUtils.Vector3D
                 * @function Zero
                 * @type Pidroh.BaseUtils.Vector3D
                 */
                Zero: {
                    get: function () {
                        return Pidroh.BaseUtils.Vector3D.zero.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 1, 1, 1.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Pidroh.BaseUtils.Vector3D
                 * @function One
                 * @type Pidroh.BaseUtils.Vector3D
                 */
                One: {
                    get: function () {
                        return Pidroh.BaseUtils.Vector3D.one.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 1, 0, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Pidroh.BaseUtils.Vector3D
                 * @function UnitX
                 * @type Pidroh.BaseUtils.Vector3D
                 */
                UnitX: {
                    get: function () {
                        return Pidroh.BaseUtils.Vector3D.unitX.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 0, 1, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Pidroh.BaseUtils.Vector3D
                 * @function UnitY
                 * @type Pidroh.BaseUtils.Vector3D
                 */
                UnitY: {
                    get: function () {
                        return Pidroh.BaseUtils.Vector3D.unitY.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 0, 0, 1.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Pidroh.BaseUtils.Vector3D
                 * @function UnitZ
                 * @type Pidroh.BaseUtils.Vector3D
                 */
                UnitZ: {
                    get: function () {
                        return Pidroh.BaseUtils.Vector3D.unitZ.$clone();
                    }
                },
                Up: {
                    get: function () {
                        return Pidroh.BaseUtils.Vector3D.up.$clone();
                    }
                },
                Down: {
                    get: function () {
                        return Pidroh.BaseUtils.Vector3D.down.$clone();
                    }
                },
                Right: {
                    get: function () {
                        return Pidroh.BaseUtils.Vector3D.right.$clone();
                    }
                },
                Left: {
                    get: function () {
                        return Pidroh.BaseUtils.Vector3D.left.$clone();
                    }
                },
                Forward: {
                    get: function () {
                        return Pidroh.BaseUtils.Vector3D.forward.$clone();
                    }
                },
                Backward: {
                    get: function () {
                        return Pidroh.BaseUtils.Vector3D.backward.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.zero = new Pidroh.BaseUtils.Vector3D();
                    this.one = new Pidroh.BaseUtils.Vector3D();
                    this.unitX = new Pidroh.BaseUtils.Vector3D();
                    this.unitY = new Pidroh.BaseUtils.Vector3D();
                    this.unitZ = new Pidroh.BaseUtils.Vector3D();
                    this.up = new Pidroh.BaseUtils.Vector3D();
                    this.down = new Pidroh.BaseUtils.Vector3D();
                    this.right = new Pidroh.BaseUtils.Vector3D();
                    this.left = new Pidroh.BaseUtils.Vector3D();
                    this.forward = new Pidroh.BaseUtils.Vector3D();
                    this.backward = new Pidroh.BaseUtils.Vector3D();
                    this.zero = new Pidroh.BaseUtils.Vector3D.$ctor3(0.0, 0.0, 0.0);
                    this.one = new Pidroh.BaseUtils.Vector3D.$ctor3(1.0, 1.0, 1.0);
                    this.unitX = new Pidroh.BaseUtils.Vector3D.$ctor3(1.0, 0.0, 0.0);
                    this.unitY = new Pidroh.BaseUtils.Vector3D.$ctor3(0.0, 1.0, 0.0);
                    this.unitZ = new Pidroh.BaseUtils.Vector3D.$ctor3(0.0, 0.0, 1.0);
                    this.up = new Pidroh.BaseUtils.Vector3D.$ctor3(0.0, 1.0, 0.0);
                    this.down = new Pidroh.BaseUtils.Vector3D.$ctor3(0.0, -1.0, 0.0);
                    this.right = new Pidroh.BaseUtils.Vector3D.$ctor3(1.0, 0.0, 0.0);
                    this.left = new Pidroh.BaseUtils.Vector3D.$ctor3(-1.0, 0.0, 0.0);
                    this.forward = new Pidroh.BaseUtils.Vector3D.$ctor3(0.0, 0.0, -1.0);
                    this.backward = new Pidroh.BaseUtils.Vector3D.$ctor3(0.0, 0.0, 1.0);
                }
            },
            methods: {
                /**
                 * Performs vector addition on <b /> and <b />.
                 *
                 * @static
                 * @public
                 * @this Pidroh.BaseUtils.Vector3D
                 * @memberof Pidroh.BaseUtils.Vector3D
                 * @param   {Pidroh.BaseUtils.Vector3D}    value1    The first vector to add.
                 * @param   {Pidroh.BaseUtils.Vector3D}    value2    The second vector to add.
                 * @return  {Pidroh.BaseUtils.Vector3D}              The result of the vector addition.
                 */
                Add: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    value1.Z += value2.Z;
                    return value1.$clone();
                },
                /**
                 * Performs vector addition on <b /> and
                 <b />, storing the result of the
                 addition in <b />.
                 *
                 * @static
                 * @public
                 * @this Pidroh.BaseUtils.Vector3D
                 * @memberof Pidroh.BaseUtils.Vector3D
                 * @param   {Pidroh.BaseUtils.Vector3D}    value1    The first vector to add.
                 * @param   {Pidroh.BaseUtils.Vector3D}    value2    The second vector to add.
                 * @param   {Pidroh.BaseUtils.Vector3D}    result    The result of the vector addition.
                 * @return  {void}
                 */
                Add$1: function (value1, value2, result) {
                    result.v.X = value1.v.X + value2.v.X;
                    result.v.Y = value1.v.Y + value2.v.Y;
                    result.v.Z = value1.v.Z + value2.v.Z;
                },
                Cross: function (vector1, vector2) {
                    vector1 = {v:vector1};
                    vector2 = {v:vector2};
                    Pidroh.BaseUtils.Vector3D.Cross$1(vector1, vector2, vector1);
                    return vector1.v.$clone();
                },
                Cross$1: function (vector1, vector2, result) {
                    var x = vector1.v.Y * vector2.v.Z - vector2.v.Y * vector1.v.Z;
                    var y = -(vector1.v.X * vector2.v.Z - vector2.v.X * vector1.v.Z);
                    var z = vector1.v.X * vector2.v.Y - vector2.v.X * vector1.v.Y;
                    result.v.X = x;
                    result.v.Y = y;
                    result.v.Z = z;
                },
                Distance: function (vector1, vector2) {
                    vector1 = {v:vector1};
                    vector2 = {v:vector2};
                    var result = { };
                    Pidroh.BaseUtils.Vector3D.DistanceSquared$1(vector1, vector2, result);
                    return Math.sqrt(result.v);
                },
                Distance$1: function (value1, value2, result) {
                    Pidroh.BaseUtils.Vector3D.DistanceSquared$1(value1, value2, result);
                    result.v = Math.sqrt(result.v);
                },
                DistanceSquared: function (value1, value2) {
                    value1 = {v:value1};
                    value2 = {v:value2};
                    var result = { };
                    Pidroh.BaseUtils.Vector3D.DistanceSquared$1(value1, value2, result);
                    return result.v;
                },
                DistanceSquared$1: function (value1, value2, result) {
                    result.v = (value1.v.X - value2.v.X) * (value1.v.X - value2.v.X) + (value1.v.Y - value2.v.Y) * (value1.v.Y - value2.v.Y) + (value1.v.Z - value2.v.Z) * (value1.v.Z - value2.v.Z);
                },
                Divide: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    value1.Z /= value2.Z;
                    return value1.$clone();
                },
                Divide$1: function (value1, value2) {
                    var factor = 1 / value2;
                    value1.X *= factor;
                    value1.Y *= factor;
                    value1.Z *= factor;
                    return value1.$clone();
                },
                Divide$3: function (value1, divisor, result) {
                    var factor = 1 / divisor;
                    result.v.X = value1.v.X * factor;
                    result.v.Y = value1.v.Y * factor;
                    result.v.Z = value1.v.Z * factor;
                },
                Divide$2: function (value1, value2, result) {
                    result.v.X = value1.v.X / value2.v.X;
                    result.v.Y = value1.v.Y / value2.v.Y;
                    result.v.Z = value1.v.Z / value2.v.Z;
                },
                Dot: function (vector1, vector2) {
                    return vector1.X * vector2.X + vector1.Y * vector2.Y + vector1.Z * vector2.Z;
                },
                Dot$1: function (vector1, vector2, result) {
                    result.v = vector1.v.X * vector2.v.X + vector1.v.Y * vector2.v.Y + vector1.v.Z * vector2.v.Z;
                },
                Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    value1.Z *= value2.Z;
                    return value1.$clone();
                },
                Multiply$1: function (value1, scaleFactor) {
                    value1.X *= scaleFactor;
                    value1.Y *= scaleFactor;
                    value1.Z *= scaleFactor;
                    return value1.$clone();
                },
                Multiply$3: function (value1, scaleFactor, result) {
                    result.v.X = value1.v.X * scaleFactor;
                    result.v.Y = value1.v.Y * scaleFactor;
                    result.v.Z = value1.v.Z * scaleFactor;
                },
                Multiply$2: function (value1, value2, result) {
                    result.v.X = value1.v.X * value2.v.X;
                    result.v.Y = value1.v.Y * value2.v.Y;
                    result.v.Z = value1.v.Z * value2.v.Z;
                },
                /**
                 * Returns a {@link } pointing in the opposite
                 direction of <b />.
                 *
                 * @static
                 * @public
                 * @this Pidroh.BaseUtils.Vector3D
                 * @memberof Pidroh.BaseUtils.Vector3D
                 * @param   {Pidroh.BaseUtils.Vector3D}    value    The vector to negate.
                 * @return  {Pidroh.BaseUtils.Vector3D}             The vector negation of <b />.
                 */
                Negate: function (value) {
                    value = new Pidroh.BaseUtils.Vector3D.$ctor3(-value.X, -value.Y, -value.Z);
                    return value.$clone();
                },
                /**
                 * Stores a {@link } pointing in the opposite
                 direction of <b /> in <b />.
                 *
                 * @static
                 * @public
                 * @this Pidroh.BaseUtils.Vector3D
                 * @memberof Pidroh.BaseUtils.Vector3D
                 * @param   {Pidroh.BaseUtils.Vector3D}    value     The vector to negate.
                 * @param   {Pidroh.BaseUtils.Vector3D}    result    The vector that the negation of <b>result</b> will be stored in.
                 * @return  {void}
                 */
                Negate$1: function (value, result) {
                    result.v.X = -value.v.X;
                    result.v.Y = -value.v.Y;
                    result.v.Z = -value.v.Z;
                },
                Normalize: function (vector) {
                    vector = {v:vector};
                    Pidroh.BaseUtils.Vector3D.Normalize$1(vector, vector);
                    return vector.v.$clone();
                },
                Normalize$1: function (value, result) {
                    var factor = { };
                    Pidroh.BaseUtils.Vector3D.Distance$1(value, Bridge.ref(Pidroh.BaseUtils.Vector3D, "zero"), factor);
                    factor.v = 1.0 / factor.v;
                    result.v.X = value.v.X * factor.v;
                    result.v.Y = value.v.Y * factor.v;
                    result.v.Z = value.v.Z * factor.v;
                },
                Reflect: function (vector, normal) {
                    // I is the original array
                    // N is the normal of the incident plane
                    // R = I - (2 * N * ( DotProduct[ I,N] ))
                    var reflectedVector = new Pidroh.BaseUtils.Vector3D();
                    // inline the dotProduct here instead of calling method
                    var dotProduct = ((vector.X * normal.X) + (vector.Y * normal.Y)) + (vector.Z * normal.Z);
                    reflectedVector.X = vector.X - (2.0 * normal.X) * dotProduct;
                    reflectedVector.Y = vector.Y - (2.0 * normal.Y) * dotProduct;
                    reflectedVector.Z = vector.Z - (2.0 * normal.Z) * dotProduct;

                    return reflectedVector.$clone();
                },
                Reflect$1: function (vector, normal, result) {
                    // I is the original array
                    // N is the normal of the incident plane
                    // R = I - (2 * N * ( DotProduct[ I,N] ))

                    // inline the dotProduct here instead of calling method
                    var dotProduct = ((vector.v.X * normal.v.X) + (vector.v.Y * normal.v.Y)) + (vector.v.Z * normal.v.Z);
                    result.v.X = vector.v.X - (2.0 * normal.v.X) * dotProduct;
                    result.v.Y = vector.v.Y - (2.0 * normal.v.Y) * dotProduct;
                    result.v.Z = vector.v.Z - (2.0 * normal.v.Z) * dotProduct;
                },
                /**
                 * Performs vector subtraction on <b /> and <b />.
                 *
                 * @static
                 * @public
                 * @this Pidroh.BaseUtils.Vector3D
                 * @memberof Pidroh.BaseUtils.Vector3D
                 * @param   {Pidroh.BaseUtils.Vector3D}    value1    The vector to be subtracted from.
                 * @param   {Pidroh.BaseUtils.Vector3D}    value2    The vector to be subtracted from <b>value2</b>.
                 * @return  {Pidroh.BaseUtils.Vector3D}              The result of the vector subtraction.
                 */
                Subtract: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    value1.Z -= value2.Z;
                    return value1.$clone();
                },
                /**
                 * Performs vector subtraction on <b /> and <b />.
                 *
                 * @static
                 * @public
                 * @this Pidroh.BaseUtils.Vector3D
                 * @memberof Pidroh.BaseUtils.Vector3D
                 * @param   {Pidroh.BaseUtils.Vector3D}    value1    The vector to be subtracted from.
                 * @param   {Pidroh.BaseUtils.Vector3D}    value2    The vector to be subtracted from <b>value2</b>.
                 * @param   {Pidroh.BaseUtils.Vector3D}    result    The result of the vector subtraction.
                 * @return  {void}
                 */
                Subtract$1: function (value1, value2, result) {
                    result.v.X = value1.v.X - value2.v.X;
                    result.v.Y = value1.v.Y - value2.v.Y;
                    result.v.Z = value1.v.Z - value2.v.Z;
                }/**
                 * // Transforms a vector by a quaternion rotation.
                //
                 *
                 * @static
                 * @public
                 * @this Pidroh.BaseUtils.Vector3D
                 * @memberof Pidroh.BaseUtils.Vector3D
                 * @param   {Pidroh.BaseUtils.Vector3D}    value1    
                 * @param   {Pidroh.BaseUtils.Vector3D}    value2
                 * @return  {boolean}
                 */
                ,
                op_Equality: function (value1, value2) {
                    return value1.X === value2.X && value1.Y === value2.Y && value1.Z === value2.Z;
                },
                op_Inequality: function (value1, value2) {
                    return !(Pidroh.BaseUtils.Vector3D.op_Equality(value1.$clone(), value2.$clone()));
                },
                op_Addition: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    value1.Z += value2.Z;
                    return value1.$clone();
                },
                op_UnaryNegation: function (value) {
                    value = new Pidroh.BaseUtils.Vector3D.$ctor3(-value.X, -value.Y, -value.Z);
                    return value.$clone();
                },
                op_Subtraction: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    value1.Z -= value2.Z;
                    return value1.$clone();
                },
                op_Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    value1.Z *= value2.Z;
                    return value1.$clone();
                },
                op_Multiply$1: function (value, scaleFactor) {
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    value.Z *= scaleFactor;
                    return value.$clone();
                },
                op_Multiply$2: function (scaleFactor, value) {
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    value.Z *= scaleFactor;
                    return value.$clone();
                },
                op_Division: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    value1.Z /= value2.Z;
                    return value1.$clone();
                },
                op_Division$1: function (value, divider) {
                    var factor = 1 / divider;
                    value.X *= factor;
                    value.Y *= factor;
                    value.Z *= factor;
                    return value.$clone();
                },
                getDefaultValue: function () { return new Pidroh.BaseUtils.Vector3D(); }
            }
        },
        fields: {
            X: 0,
            Y: 0,
            Z: 0
        },
        props: {
            DebugDisplayString: {
                get: function () {
                    return System.String.concat([System.Single.format(this.X), "  ", System.Single.format(this.Y), "  ", System.Single.format(this.Z)]);
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Pidroh$BaseUtils$Vector3D$equalsT"],
        ctors: {
            $ctor3: function (x, y, z) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Z = z;
            },
            $ctor2: function (value) {
                this.$initialize();
                this.X = value;
                this.Y = value;
                this.Z = value;
            },
            $ctor1: function (value, z) {
                this.$initialize();
                this.X = value.X;
                this.Y = value.Y;
                this.Z = z;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            equals: function (obj) {
                if (!(Bridge.is(obj, Pidroh.BaseUtils.Vector3D))) {
                    return false;
                }

                var other = Bridge.cast(obj, Pidroh.BaseUtils.Vector3D);
                return this.X === other.X && this.Y === other.Y && this.Z === other.Z;
            },
            equalsT: function (other) {
                return this.X === other.X && this.Y === other.Y && this.Z === other.Z;
            },
            getHashCode: function () {
                return Bridge.Int.clip32(this.X + this.Y + this.Z);
            },
            Length: function () {
                var result = { };
                Pidroh.BaseUtils.Vector3D.DistanceSquared$1(Bridge.ref(this), Bridge.ref(Pidroh.BaseUtils.Vector3D, "zero"), result);
                return Math.sqrt(result.v);
            },
            LengthSquared: function () {
                var result = { };
                Pidroh.BaseUtils.Vector3D.DistanceSquared$1(Bridge.ref(this), Bridge.ref(Pidroh.BaseUtils.Vector3D, "zero"), result);
                return result.v;
            },
            Normalize: function () {
                Pidroh.BaseUtils.Vector3D.Normalize$1(Bridge.ref(this), Bridge.ref(this));
            },
            toString: function () {
                var sb = new System.Text.StringBuilder("", 32);
                sb.append("{X:");
                sb.append(this.X);
                sb.append(" Y:");
                sb.append(this.Y);
                sb.append(" Z:");
                sb.append(this.Z);
                sb.append("}");
                return sb.toString();
            },
            $clone: function (to) {
                var s = to || new Pidroh.BaseUtils.Vector3D();
                s.X = this.X;
                s.Y = this.Y;
                s.Z = this.Z;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Animation", {
        fields: {
            area: null,
            element: 0,
            target: 0
        },
        ctors: {
            init: function () {
                this.element = Pidroh.ConsoleApp.Turnbased.BattleMain.Element.None;
                this.target = Pidroh.ConsoleApp.Turnbased.Target.None;
            },
            $ctor1: function (target) {
                this.$initialize();
                this.target = target;
            },
            $ctor2: function (target, element) {
                this.$initialize();
                this.element = element;
                this.target = target;
            },
            ctor: function (area, element, target) {
                if (element === void 0) { element = 3; }
                if (target === void 0) { target = 0; }

                this.$initialize();
                this.area = area;
                this.element = element;
                this.target = target;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Area", {
        fields: {
            target: 0,
            points: null
        },
        ctors: {
            init: function () {
                this.points = new (System.Collections.Generic.List$1(Pidroh.BaseUtils.Vector2D)).ctor();
            },
            ctor: function (target) {
                this.$initialize();
                this.target = target;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.AsyncTasks");

    Bridge.define("Pidroh.ConsoleApp.Turnbased.DelayedActions", {
        fields: {
            times: null,
            lists: null
        },
        ctors: {
            init: function () {
                this.times = new (System.Collections.Generic.List$1(System.Single)).ctor();
                this.lists = new (System.Collections.Generic.List$1(System.Collections.IList)).ctor();
            }
        },
        methods: {
            Update: function (delta) {
                for (var i = 0; i < this.times.Count; i = (i + 1) | 0) {
                    this.times.setItem(i, this.times.getItem(i) -delta);
                    if (this.times.getItem(i) <= 0) {
                        this.Execute(i);
                        this.EndTask(i);
                    }
                }
            },
            Add: function (time) {
                this.times.add(time);
            },
            IsDone: function () {
                return this.times.Count === 0;
            },
            EndTask: function (i) {
                var $t;
                this.times.removeAt(i);
                $t = Bridge.getEnumerator(this.lists);
                try {
                    while ($t.moveNext()) {
                        var l = $t.Current;
                        System.Array.removeAt(l, i, Object);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }}
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.AsyncTrack");

    /** @namespace Pidroh.ConsoleApp.Turnbased */

    /**
     * data that will be a part of stagedata so each stage can have it's config
     It will also be contained in battlemain.
     Should be static, once created.
     *
     * @public
     * @class Pidroh.ConsoleApp.Turnbased.BattleConfig
     */
    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleConfig", {
        fields: {
            enemiesToSummon: null,
            needKillAllEnemies: false
        },
        ctors: {
            init: function () {
                this.enemiesToSummon = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                this.needKillAllEnemies = true;
            },
            ctor: function () {
                this.$initialize();
            },
            $ctor2: function (enemiesToSummon) {
                this.$initialize();
                this.enemiesToSummon.AddRange(enemiesToSummon);
            },
            $ctor1: function (needKillAllEnemies) {
                this.$initialize();
                this.needKillAllEnemies = needKillAllEnemies;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleMain", {
        statics: {
            methods: {
                RandomPosition: function (e) {
                    e.pos.X = Pidroh.BaseUtils.RandomSupplier.Range(0, 5);
                    e.pos.Y = Pidroh.BaseUtils.RandomSupplier.Range(0, 2);
                }
            }
        },
        fields: {
            entities: null,
            battleState: null,
            happManager: null,
            movementMoves: null,
            enemyMoves: null,
            inputs: null,
            playerHandFixed: null,
            playerHandUnfixed: null,
            playerHandPool: null,
            timeToChooseMax: 0,
            timeToChoose: 0,
            battleResult: null,
            nEnemies: 0,
            MoveDataExecuter: null,
            timeStamp: null,
            pickupAccessor: null,
            ecsInteg: null,
            EnemyGenerateMoves: null,
            BattleConfig: null,
            BoardWidth: 0,
            BoardHeight: 0
        },
        ctors: {
            init: function () {
                this.entities = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity)).ctor();
                this.battleState = new Pidroh.ConsoleApp.Turnbased.BattleMain.BattleState();
                this.happManager = new Pidroh.ConsoleApp.Turnbased.Happs.HappManager();
                this.movementMoves = new (System.Collections.Generic.Dictionary$2(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType,Pidroh.BaseUtils.Vector2D))();
                this.inputs = new Pidroh.ConsoleApp.Turnbased.InputHolder();
                this.playerHandFixed = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)).ctor();
                this.playerHandUnfixed = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)).ctor();
                this.playerHandPool = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)).ctor();
                this.timeToChooseMax = 15.0;
                this.timeToChoose = -1;
                this.battleResult = new Pidroh.ConsoleApp.Turnbased.BattleResult();
                this.BoardWidth = 6;
                this.BoardHeight = 3;
            },
            ctor: function (mode, ecs, timeStamp) {
                this.$initialize();
                //this.ecs = ecs;
                this.timeStamp = timeStamp;
                this.pickupAccessor = ecs.QuickAccessor2(Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity, Pidroh.ConsoleApp.Turnbased.PickupInfo);
                this.movementMoves.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.BaseUtils.Vector2D.UnitY.$clone());
                this.movementMoves.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.BaseUtils.Vector2D.op_UnaryNegation(Pidroh.BaseUtils.Vector2D.UnitY.$clone()));
                this.movementMoves.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.BaseUtils.Vector2D.op_UnaryNegation(Pidroh.BaseUtils.Vector2D.UnitX.$clone()));
                this.movementMoves.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.BaseUtils.Vector2D.UnitX.$clone());

                ecs.CreateEntityWithComponent(this.battleState);

                this.playerHandFixed.clear();
                this.playerHandFixed.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight);
                this.playerHandFixed.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft);
                this.playerHandFixed.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown);
                this.playerHandFixed.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp);

                if (mode === 0) {
                    this.playerHandUnfixed.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot);
                    this.enemyMoves = System.Array.init([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot], Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType);
                } else {
                    this.playerHandUnfixed.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire);
                    this.playerHandUnfixed.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice);
                    this.playerHandUnfixed.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder);


                    this.enemyMoves = System.Array.init([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder], Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType);
                }

                //playerHand.Add(MoveType.NormalShot);

            }
        },
        methods: {
            BattleConfigure: function (battleConfig) {
                if (battleConfig == null) {
                    battleConfig = new Pidroh.ConsoleApp.Turnbased.BattleConfig.$ctor1(true);
                }
                this.BattleConfig = battleConfig;
                this.battleState.turnsPerPhase.Val = 3;

            },
            IsVictory: function () {
                return this.battleResult.result === 1;
            },
            Init: function () {

                var hero = new Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity();

                hero.pos.Set(1, 1);
                hero.minPos.Set(0, 0);
                hero.maxPos.Set(2, 2);
                hero.Type = Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.hero;
                hero.life = 2;
                for (var i = 0; i < hero.moves.length; i = (i + 1) | 0) {
                    hero.moves[System.Array.index(i, hero.moves)] = -1;
                }


                this.entities.add(hero);
                this.ecsInteg.HeroCreated(hero);
                this.ecsInteg.SpawnEnemies();

                {
                    //GameEntity pickup = new GameEntity();
                    //pickup.Type = EntityType.pickup;
                    //pickup.pos.Set(0, 2);
                    //pickup.life = 2;
                    //pickup.graphic = 4;
                    //entities.Add(pickup);
                }
                //{
                //    BattleEntity panelEffect = new BattleEntity();
                //    panelEffect.Type = EntityType.paneleffect;
                //    panelEffect.pos.Set(0, 2);
                //    panelEffect.life = 5;
                //    panelEffect.graphic = 5;
                //    panelEffect.randomPosition = true;
                //    panelEffect.drawLife = false;
                //    panelEffect.drawTurn = false;
                //    RandomPosition(panelEffect);
                //    entities.Add(panelEffect);
                //}

                //{
                //    BattleEntity panelEffect = new BattleEntity();
                //    panelEffect.Type = EntityType.paneleffect;
                //    panelEffect.pos.Set(0, 2);
                //    panelEffect.life = 5;
                //    panelEffect.graphic = 5;
                //    panelEffect.randomPosition = true;
                //    panelEffect.drawLife = false;
                //    panelEffect.drawTurn = false;
                //    RandomPosition(panelEffect);
                //    entities.Add(panelEffect);
                //}

                this.Reset();
                this.ExecutePhase();
            },
            NewBattleEntity: function () {
                var battleEntity = new Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity();
                this.entities.add(battleEntity);
                return battleEntity;
            },
            Reset: function () {
                for (var i = 0; i < this.entities.Count; i = (i + 1) | 0) {
                    this.entities.getItem(i).life = this.entities.getItem(i).maxLife;
                }
                this.ChangePhase(Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.EnemyMoveChoice);
                this.battleState.turn.Val = 0;
                this.battleState.totalTurns = 0;
                this.battleState.actingEntity = 0;
                this.battleState.moveTick_Now.Val = 0;
                this.battleState.moveTick_Total = 1;
                this.battleResult.result = 0;
            },
            IsOver: function () {
                return this.battleResult.result !== 0;
            },
            Tick: function () {
                var $t;
                this.FinishPreviousTick();
                var heroAlive = false;
                var enemyAlive = false;
                var pickupObligatoryExist = false;
                $t = Bridge.getEnumerator(this.entities);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        if (item.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy) {
                            if (item.life > 0) {
                                enemyAlive = true;
                            }
                        }
                        if (item.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.hero) {
                            if (item.life > 0) {
                                heroAlive = true;
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }for (var i = 0; i < this.pickupAccessor.Length; i = (i + 1) | 0) {
                    var pickup = this.pickupAccessor.Comp2(i);
                    if (pickup.necessaryForVictory && this.pickupAccessor.Comp1(i).Alive) {
                        pickupObligatoryExist = true;
                    }
                }
                if (this.battleState.BattleEndActive) {
                    if (!heroAlive) {
                        this.battleResult.result = 2;

                    } else if ((!enemyAlive || !this.BattleConfig.needKillAllEnemies) && !pickupObligatoryExist) {
                        this.battleResult.result = 1;
                    }
                }

                if (this.battleResult.result === 0) {
                    this.happManager.Tick();
                    this.timeStamp.Advance(1);
                    this.ExecutePhase();
                }

            },
            Update: function (delta) {
                if (this.timeToChoose > 0 && this.battleState.phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands) {
                    this.timeToChoose -= delta;
                    if (this.timeToChoose <= 0) {
                        this.Tick();
                    }
                }


            },
            FinishPreviousTick: function () {
                var $t, $t1;
                var previousPhase = this.battleState.phase;
                switch (previousPhase) {
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.EnemyMoveChoice: 
                        this.ChangePhase(Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.HandRecharge);
                        break;
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.HandRecharge: 
                        this.ChangePhase(Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands);
                        break;
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands: 
                        this.ChangePhase(Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ExecuteMove);
                        break;
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ExecuteMove: 
                        if (Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(this.battleState.moveTick_Now) >= ((this.battleState.moveTick_Total - 1) | 0)) {
                            this.battleState.moveTick_Now.Val = 0;
                            this.battleState.moveTick_Total = 1;
                            var noMoreUnitsToActThisTurn = true;
                            var i_initial = (this.battleState.actingEntity + 1) | 0;
                            if (i_initial < this.entities.Count) {
                                for (var i = i_initial; i < this.entities.Count; i = (i + 1) | 0) {
                                    if (this.entities.getItem(i).Alive) {
                                        this.battleState.actingEntity = i;
                                        noMoreUnitsToActThisTurn = false;
                                        break;
                                    }
                                }
                            }


                            if (noMoreUnitsToActThisTurn) {
                                if (Pidroh.ConsoleApp.Turnbased.Value.op_Implicit$1(this.battleState.turn) >= Pidroh.ConsoleApp.Turnbased.Value.op_Subtraction(this.battleState.turnsPerPhase, 1)) {
                                    this.ChangePhase(Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.EnemyMoveChoice);
                                    $t = Bridge.getEnumerator(this.entities);
                                    try {
                                        while ($t.moveNext()) {
                                            var e = $t.Current;
                                            if (e.randomPosition) {
                                                System.Console.WriteLine("RANDOM POS!!");
                                                Pidroh.ConsoleApp.Turnbased.BattleMain.RandomPosition(e);
                                            }
                                        }
                                    } finally {
                                        if (Bridge.is($t, System.IDisposable)) {
                                            $t.System$IDisposable$Dispose();
                                        }
                                    }} else {
                                    this.battleState.actingEntity = 0;
                                    this.battleState.turn = Pidroh.ConsoleApp.Turnbased.Value.op_Addition(this.battleState.turn, 1);
                                    this.battleState.totalTurns = (this.battleState.totalTurns + 1) | 0;
                                }
                            }
                        } else {
                            $t1 = this.battleState.moveTick_Now;
                            $t1.Val += 1;
                        }
                        break;
                    default: 
                        break;
                }
            },
            ChangePhase: function (phase) {
                var $t;
                var previousPhase = this.battleState.phase;
                if (phase === previousPhase) {
                    return;
                }
                if (phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands) {
                    Pidroh.BaseUtils.Extensions.Shuffle(Bridge.global.Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, this.playerHandPool);
                    this.playerHandUnfixed.clear();
                    var commandsToAdd = 3;
                    if (commandsToAdd > this.playerHandPool.Count) {
                        commandsToAdd = this.playerHandPool.Count;
                    }
                    for (var i = 0; i < commandsToAdd; i = (i + 1) | 0) {
                        this.playerHandUnfixed.add(this.playerHandPool.getItem(i));
                    }


                    this.timeToChoose = this.timeToChooseMax;
                }
                if (previousPhase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ExecuteMove) {
                    this.battleState.turn.Val = 0;
                    this.battleState.actingEntity = 0;
                    this.battleState.moveTick_Now.Val = 0;
                    this.battleState.moveTick_Total = 1;
                    $t = Bridge.getEnumerator(this.entities);
                    try {
                        while ($t.moveNext()) {
                            var e = $t.Current;
                            for (var i1 = 0; i1 < e.moves.length; i1 = (i1 + 1) | 0) {
                                e.moves[System.Array.index(i1, e.moves)] = -1;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }}
                this.battleState.phase = phase;
            },
            ExecutePhase: function () {
                var $t, $t1, $t2;
                var phase = this.battleState.phase;
                switch (phase) {
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.EnemyMoveChoice: 
                        this.ecsInteg.SpawnEnemies();
                        this.EnemyGenerateMoves();
                        break;
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.HandRecharge: 
                        break;
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands: 
                        this.inputs.Clear();
                        $t = Bridge.getEnumerator(this.playerHandFixed);
                        try {
                            while ($t.moveNext()) {
                                var hi = $t.Current;
                                this.inputs.Add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor2(Pidroh.ConsoleApp.Turnbased.InputType.Move, hi), Pidroh.ConsoleApp.Turnbased.InputTags.MOVEFIX);
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }$t1 = Bridge.getEnumerator(this.playerHandUnfixed);
                        try {
                            while ($t1.moveNext()) {
                                var hi1 = $t1.Current;
                                this.inputs.Add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor2(Pidroh.ConsoleApp.Turnbased.InputType.Move, hi1), Pidroh.ConsoleApp.Turnbased.InputTags.MOVEUNFIX);
                            }
                        } finally {
                            if (Bridge.is($t1, System.IDisposable)) {
                                $t1.System$IDisposable$Dispose();
                            }
                        }this.inputs.Add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo), Pidroh.ConsoleApp.Turnbased.InputTags.MISC);
                        this.inputs.Add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done), Pidroh.ConsoleApp.Turnbased.InputTags.MISC);
                        var enemyExist = false;
                        $t2 = Bridge.getEnumerator(this.entities);
                        try {
                            while ($t2.moveNext()) {
                                var item = $t2.Current;
                                if (item.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy) {
                                    enemyExist = true;
                                }
                            }
                        } finally {
                            if (Bridge.is($t2, System.IDisposable)) {
                                $t2.System$IDisposable$Dispose();
                            }
                        }//if(enemyExist)
                        //    inputs.Add(new Turnbased.Input(InputType.MiscBattle, MiscBattleInput.Preview), InputTags.MISC);
                        break;
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ExecuteMove: 
                        this.ecsInteg.SpawnEnemies();
                        this.ExecuteMoves();
                        break;
                    default: 
                        break;
                }
            },
            InputDone: function (input) {
                var $t;
                if (input.type === Pidroh.ConsoleApp.Turnbased.InputType.Move) {
                    var arg1 = input.arg1;
                    //Console.Write("INPUTTED1");
                    if (this.playerHandFixed.contains(arg1) || this.playerHandUnfixed.contains(arg1)) {

                        //Console.Write("INPUTTED2");
                        this.MoveChosen(arg1);
                    }

                }

                if (input.type === Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle) {
                    var misc = input.arg1;
                    if (misc === Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo) {
                        $t = Bridge.getEnumerator(this.entities);
                        try {
                            while ($t.moveNext()) {
                                var e = $t.Current;
                                if (e.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.hero) {
                                    for (var i = 0; i < e.moves.length; i = (i + 1) | 0) {
                                        if (e.moves[System.Array.index(i, e.moves)] == null) {
                                            e.moves[System.Array.index(i, e.moves)] = -1;
                                        }
                                        var value = e.moves[System.Array.index(i, e.moves)];

                                        if (value === -1 || i === Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(this.battleState.turnsPerPhase)) {
                                            if (i > 0) {
                                                e.moves[System.Array.index(((i - 1) | 0), e.moves)] = -1;
                                            }
                                        }
                                    }
                                }
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }}
                    if (misc === Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done) {
                        this.Tick();
                    }
                }
            },
            BattleDecided: function () {
                var $t;
                var heroes = 0;
                var enemies = 0;
                $t = Bridge.getEnumerator(this.entities);
                try {
                    while ($t.moveNext()) {
                        var e = $t.Current;
                        if (e.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.hero) {
                            if (e.Alive) {
                                heroes = (heroes + 1) | 0;
                            }
                        }
                        if (e.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy) {
                            if (e.Alive) {
                                enemies = (enemies + 1) | 0;
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return heroes === 0 || enemies === 0;
            },
            MoveChosen: function (moveType) {
                var $t;
                $t = Bridge.getEnumerator(this.entities);
                try {
                    while ($t.moveNext()) {
                        var e = $t.Current;
                        if (e.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.hero) {
                            for (var i = 0; i < e.moves.length; i = (i + 1) | 0) {

                                var value = e.moves[System.Array.index(i, e.moves)];

                                if (value === -1) {

                                    e.moves[System.Array.index(i, e.moves)] = moveType;
                                    break;
                                }
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            ExecuteMoves: function () {

                //Console.Write("bla" + battleState.turn.Val);
                //Console.Read();
                var attacker = this.entities.getItem(this.battleState.actingEntity);
                var turn = Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(this.battleState.turn);
                this.ExecuteMove(attacker, turn);
            },
            ExecuteMove: function (actor, turn) {
                this.MoveDataExecuter.ExecuteMove(actor, turn);

            },
            CalculateAttackMultiplier: function (actor) {
                var $t;
                var baseD = actor.damageMultiplier;
                $t = Bridge.getEnumerator(this.entities);
                try {
                    while ($t.moveNext()) {
                        var e = $t.Current;
                        if (!Bridge.referenceEquals(e, actor)) {
                            if (Pidroh.BaseUtils.Vector2D.op_Equality(e.pos.$clone(), actor.pos.$clone())) {
                                if (e.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.paneleffect) {
                                    baseD *= 3;
                                }
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return baseD;
            },
            CalculateDefenderMultiplier: function (actor) {
                var $t;
                var baseD = 1;
                $t = Bridge.getEnumerator(this.entities);
                try {
                    while ($t.moveNext()) {
                        var e = $t.Current;
                        if (!Bridge.referenceEquals(e, actor)) {
                            if (Pidroh.BaseUtils.Vector2D.op_Equality(e.pos.$clone(), actor.pos.$clone())) {
                                if (e.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.paneleffect) {
                                    baseD = Bridge.Int.mul(baseD, 3);
                                }
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return baseD;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity", {
        $kind: "nested class",
        fields: {
            life: 0,
            pos: null,
            minPos: null,
            maxPos: null,
            moves: null,
            graphic: 0,
            graphicRepeatedIndex: 0,
            damageMultiplier: 0,
            drawLife: false,
            drawTurn: false,
            randomPosition: false,
            element: 0,
            maxLife: 0,
            Type: 0
        },
        props: {
            PositionV2D: {
                get: function () {
                    return new Pidroh.BaseUtils.Vector2D.$ctor2(this.pos.X, this.pos.Y);
                }
            },
            Dead: {
                get: function () {
                    return this.life <= 0;
                }
            },
            Alive: {
                get: function () {
                    return !this.Dead;
                }
            }
        },
        ctors: {
            init: function () {
                this.pos = new Pidroh.BaseUtils.Vector2D();
                this.minPos = new Pidroh.BaseUtils.Vector2D();
                this.maxPos = new Pidroh.BaseUtils.Vector2D();
                this.moves = System.Array.init(10, 0, System.Int32);
                this.damageMultiplier = 1;
                this.drawLife = true;
                this.drawTurn = true;
                this.randomPosition = false;
                this.element = Pidroh.ConsoleApp.Turnbased.BattleMain.Element.None;
                this.maxLife = 3;
                this.Type = Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.hero;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase", {
        $kind: "nested enum",
        statics: {
            fields: {
                EnemyMoveChoice: 0,
                HandRecharge: 1,
                PickHands: 2,
                ExecuteMove: 3
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleMain.BattleState", {
        $kind: "nested class",
        fields: {
            turn: null,
            totalTurns: 0,
            turnsPerPhase: null,
            moveTick_Now: null,
            moveTick_Total: 0,
            actingEntity: 0,
            phase: 0,
            BattleEndActive: false
        },
        ctors: {
            init: function () {
                this.turn = new Pidroh.ConsoleApp.Turnbased.Value();
                this.turnsPerPhase = new Pidroh.ConsoleApp.Turnbased.Value();
                this.moveTick_Now = new Pidroh.ConsoleApp.Turnbased.Value();
                this.moveTick_Total = 0;
                this.actingEntity = 0;
                this.BattleEndActive = true;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleMain.Element", {
        $kind: "nested enum",
        statics: {
            fields: {
                Fire: 0,
                Ice: 1,
                Thunder: 2,
                None: 3
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType", {
        $kind: "nested enum",
        statics: {
            fields: {
                hero: 0,
                enemy: 1,
                pickup: 2,
                paneleffect: 3
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag", {
        $kind: "nested enum",
        statics: {
            fields: {
                AttackHit: 0,
                AttackMiss: 1,
                DamageTaken: 2,
                MovementFail: 3
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType", {
        $kind: "nested enum",
        statics: {
            fields: {
                DoNothing: 0,
                MoveUp: 1,
                MoveLeft: 2,
                MoveDown: 3,
                MoveRight: 4,
                NormalShot: 5,
                Fire: 6,
                Ice: 7,
                Thunder: 8,
                IceBomb: 9,
                ThunderBomb: 10,
                SummonEntity: 11
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.ITextScreen_", {
        $kind: "interface"
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleRender.Colors", {
        $kind: "nested class",
        statics: {
            fields: {
                GridHero: 0,
                GridEnemy: 0,
                Hero: 0,
                Enemy: 0,
                HeroTurn: 0,
                EnemyTurn: 0,
                inputKey: 0,
                Board: 0,
                WindowLabel: 0,
                FireAura: 0,
                IceAura: 0,
                ThunderAura: 0,
                FireShot: 0,
                IceShot: 0,
                ThunderShot: 0,
                BackgroundInput: 0,
                InputDescription: 0,
                BackBattle: 0,
                BackCommand: 0
            },
            ctors: {
                init: function () {
                    this.GridHero = 1;
                    this.GridEnemy = 2;
                    this.Hero = 3;
                    this.Enemy = 4;
                    this.HeroTurn = 5;
                    this.EnemyTurn = 6;
                    this.inputKey = 7;
                    this.Board = 8;
                    this.WindowLabel = 9;
                    this.FireAura = 10;
                    this.IceAura = 11;
                    this.ThunderAura = 12;
                    this.FireShot = 13;
                    this.IceShot = 14;
                    this.ThunderShot = 15;
                    this.BackgroundInput = 16;
                    this.InputDescription = 17;
                    this.BackBattle = 18;
                    this.BackCommand = 19;
                }
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey", {
        $kind: "nested enum",
        statics: {
            fields: {
                NONE: 0,
                LEFT: 1,
                RIGHT: 2,
                DOWN: 3,
                UP: 4,
                FIRE: 5,
                REDO: 6,
                DONE: 7,
                ICE: 8,
                THUNDER: 9,
                NORMALSHOT: 10
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleResult", {
        fields: {
            result: 0
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleSetup", {
        fields: {
            ecs: null,
            battleMain: null,
            timeStamp: null
        },
        ctors: {
            ctor: function (mode, stageId, ecs) {
                var $t, $t1;
                this.$initialize();
                this.ecs = ecs;
                this.timeStamp = new Pidroh.BaseUtils.TimeStamp();
                ecs.CreateEntityWithComponent(this.timeStamp);
                this.battleMain = new Pidroh.ConsoleApp.Turnbased.BattleMain(mode, ecs, this.timeStamp);
                var mcp = new Pidroh.ConsoleApp.Turnbased.MoveCreatorProg();

                var stages = ecs.QuickAccessor1(Pidroh.ConsoleApp.Turnbased.StageData);

                var fixedAttack = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.FixedAttackStage, stages.Entity(stageId));
                var playerHandPool = this.battleMain.playerHandPool;
                if (fixedAttack != null) {

                    $t = Bridge.getEnumerator(fixedAttack.moves);
                    try {
                        while ($t.moveNext()) {
                            var item = $t.Current;
                            playerHandPool.add(item);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }} else {
                    playerHandPool.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire);
                    playerHandPool.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice);
                    playerHandPool.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder);
                }
                var stage = stages.Comp1(stageId);
                var enmys = stage.enemySpawns;
                $t1 = Bridge.getEnumerator(enmys);
                try {
                    while ($t1.moveNext()) {
                        var item1 = $t1.Current;
                        ecs.CreateEntityWithComponent(item1);
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
                this.battleMain.MoveDataExecuter = new Pidroh.ConsoleApp.Turnbased.MoveDataExecuter(this.battleMain, mcp.moveDatas, ecs, this.timeStamp);

                var entityRenderTexts = new (System.Collections.Generic.List$1(System.String)).ctor();

                var enemyDatas = new Pidroh.ConsoleApp.Turnbased.EnemyDataCreator(entityRenderTexts, mcp).enemyDatas;
                var battleState = this.battleMain.battleState;

                this.battleMain.BattleConfigure(stage.battleConfig);

                var enemyFactory = new Pidroh.ConsoleApp.Turnbased.SpawnEntityFactory(ecs, enemyDatas, this.battleMain);
                this.battleMain.ecsInteg = new Pidroh.ConsoleApp.Turnbased.ECSIntegration(enemyFactory, ecs);
                //battleMain.EnemyFactory = enemyFactory;

                var enemyAis = ecs.QuickAccessor2(Pidroh.ConsoleApp.Turnbased.EnemyAI, Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity);
                var enemyAiStateless = ecs.CreateAccessor(System.Array.init([Pidroh.ConsoleApp.Turnbased.EnemyAI], Function), System.Array.init([Pidroh.ConsoleApp.Turnbased.EnemyAIState], Function));
                this.battleMain.EnemyGenerateMoves = function () {
                    while (enemyAiStateless.Length > 0) {
                        Pidroh.ECS.ExtensionMethods.AddComponent(Pidroh.ConsoleApp.Turnbased.EnemyAIState, enemyAiStateless.Get(0));
                    }

                    for (var i = 0; i < enemyAis.Length; i = (i + 1) | 0) {
                        var ai = enemyAis.Comp1(i);
                        var battler = enemyAis.Comp2(i);
                        var aiState = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.EnemyAIState, enemyAis.Entity(i));
                        var moves = ai.moves;
                        for (var j = 0; j < Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(battleState.turnsPerPhase); j = (j + 1) | 0) {
                            var aiPro = (((j + aiState.progress) | 0)) % moves.Count;
                            var move = moves.getItem(aiPro);
                            if (Bridge.is(move, Pidroh.ConsoleApp.Turnbased.MoveUse)) {

                                battler.moves[System.Array.index(j, battler.moves)] = (Bridge.as(move, Pidroh.ConsoleApp.Turnbased.MoveUse)).move;
                            }
                            //be.moves[j] = ;
                        }
                        aiState.progress = (aiState.progress + Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(battleState.turnsPerPhase)) | 0;
                    }
                };


            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.ColorStuff", {
        statics: {
            fields: {
                GoodMain: null,
                neutralDark: null,
                neutralStrong: null,
                GoodSub: null,
                EvilMain: null,
                colors: null
            },
            ctors: {
                init: function () {
                    this.neutralDark = "#19013b";
                    this.neutralStrong = "#2c3e43";
                    this.colors = System.Array.init(20, null, System.String);
                },
                ctor: function () {
                    for (var i = 0; i < Pidroh.ConsoleApp.Turnbased.ColorStuff.colors.length; i = (i + 1) | 0) {
                        Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(i, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#400020";
                    }
                    //colors[Colors.Hero] = "#009c8d";
                    //const string heroSub = "#005f91";
                    //colors[Colors.HeroTurn] = heroSub;
                    //colors[Colors.Enemy] = "#ff0353";
                    //colors[Colors.GridHero] = heroSub;
                    //colors[BattleRender.Colors.GridEnemy] = "#8e0060";
                    //colors[BattleRender.Colors.EnemyTurn] = "#8e0060";
                    //colors[BattleRender.Colors.Board] = "#1e486e";
                    //colors[BattleRender.Colors.inputKey] = "#688690";
                    //colors[BattleRender.Colors.WindowLabel] = "#1e486e";
                    //colors[BattleRender.Colors.FireAura] = "#793100";
                    //colors[BattleRender.Colors.IceAura] = "#005590";
                    //colors[BattleRender.Colors.ThunderAura] = "#00583d";

                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#8ad896";
                    var heroSub = "#4c6d50";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = heroSub;
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Enemy, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#ff7694";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = heroSub;
                    var enemysub = "#a7464f";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridEnemy, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = enemysub;
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.EnemyTurn, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = enemysub;
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Board, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#1e486e";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#688690";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#1e486e";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.FireAura, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#793100";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.IceAura, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#005590";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.ThunderAura, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#00583d";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.FireShot, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#f82b36";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.IceShot, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#007eff";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.ThunderShot, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#a37c00";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackgroundInput, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#080808";


                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#9E8664";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.InputDescription, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#808080";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackBattle, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#000000";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackgroundInput, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#1A1A1A";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#00B2B2";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.EnemyTurn, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#FF0040";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#00468C";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridEnemy, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#8C0023";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#66FFFF";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Enemy, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#D90036";

                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#BFBFBF";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Enemy, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)];
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)];
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.EnemyTurn, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)];
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#666666";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackCommand, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#333333";

                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.FireAura, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#FF8C66";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.IceAura, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#66FFFF";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.ThunderAura, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#FFFF66";
                }
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Condition", {
        fields: {
            type: 0,
            target: 0,
            vector: null
        },
        ctors: {
            init: function () {
                this.vector = new Pidroh.BaseUtils.Vector2D();
            },
            ctor: function (type, target, vector) {
                this.$initialize();
                this.type = type;
                this.target = target;
                this.vector = vector.$clone();
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.ConditionType", {
        $kind: "enum",
        statics: {
            fields: {
                CanMove: 0
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.DealDamageAction", {
        fields: {
            target: 0,
            area: null,
            damage: 0,
            element: 0
        },
        ctors: {
            init: function () {
                this.target = Pidroh.ConsoleApp.Turnbased.Target.None;
            },
            ctor: function (area, damage, element) {
                this.$initialize();
                this.area = area;
                this.damage = damage;
                this.element = element;
                this.target = Pidroh.ConsoleApp.Turnbased.Target.Area;
            },
            $ctor1: function (target, damage, element) {
                this.$initialize();
                this.target = target;
                this.damage = damage;
                this.element = element;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.DebugExtra.DebugEx", {
        statics: {
            fields: {
                messages: null
            },
            ctors: {
                init: function () {
                    this.messages = new (System.Collections.Generic.List$1(System.String)).ctor();
                }
            },
            methods: {
                Log: function (v) {
                    Pidroh.ConsoleApp.Turnbased.DebugExtra.DebugEx.messages.add(v);
                },
                Show: function () {
                    var $t;
                    System.Console.Clear();
                    $t = Bridge.getEnumerator(Pidroh.ConsoleApp.Turnbased.DebugExtra.DebugEx.messages);
                    try {
                        while ($t.moveNext()) {
                            var item = $t.Current;
                            System.Console.WriteLine(item);

                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }prompt();
                }
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.ECSIntegration", {
        fields: {
            enemyFactory: null,
            ecs: null
        },
        ctors: {
            ctor: function (enemyFactory, ecs) {
                this.$initialize();
                this.enemyFactory = enemyFactory;
                this.ecs = ecs;
            }
        },
        methods: {
            HeroCreated: function (hero) {
                this.ecs.CreateEntityWithComponent(hero);
            },
            SpawnEnemies: function () {
                this.enemyFactory.Spawn();
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.EnemyAI", {
        fields: {
            moves: null
        },
        ctors: {
            init: function () {
                this.moves = new (System.Collections.Generic.List$1(System.Object)).ctor();
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.EnemyAIState", {
        fields: {
            progress: 0
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.EnemyData", {
        fields: {
            enemyAI: null,
            hp: 0,
            render: 0
        },
        ctors: {
            ctor: function (enemyAI, hp, render) {
                this.$initialize();
                this.enemyAI = enemyAI;
                this.hp = hp;
                this.render = render;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.EnemyDataCreator", {
        fields: {
            renderTexts: null,
            enemyDatas: null,
            moveCreatorProg: null
        },
        ctors: {
            init: function () {
                this.enemyDatas = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.EnemyData)).ctor();
            },
            ctor: function (renderTexts, moveCreatorProg) {
                this.$initialize();
                renderTexts.add("@");
                this.renderTexts = renderTexts;
                this.moveCreatorProg = moveCreatorProg;
                this.AddEnemy(this.Actions([this.Moves([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder])]), 2, "%");
                this.AddEnemy(this.Actions([this.Moves([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing])]), 3, "#");
                this.AddEnemy(this.Actions([this.Moves([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight])]), 6, "&");
                this.AddEnemy(this.Actions([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, "Summon", Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire]), 45, "$");
                this.AddEnemy(this.Actions([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp]), 3, "H");
                this.AddEnemy(this.Actions([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing]), 3, "J");
                this.AddEnemy(this.Actions([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing]), 3, "L");
                this.AddEnemy(this.Actions([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing]), 3, "K");
                //AddEnemy(ai: Actions(), hp: 3, renderText: "$");
                //AddEnemy(ai: Actions(), hp: 5, renderText: "#");

            }
        },
        methods: {
            Actions: function (obs) {
                var $t, $t1;
                if (obs === void 0) { obs = []; }
                var ai = new Pidroh.ConsoleApp.Turnbased.EnemyAI();

                $t = Bridge.getEnumerator(obs);
                try {
                    while ($t.moveNext()) {
                        var o = $t.Current;
                        if (Bridge.is(o, System.Int32)) {
                            ai.moves.add(new Pidroh.ConsoleApp.Turnbased.MoveUse.$ctor1(Bridge.cast(o, System.Int32)));
                            continue;
                        }
                        if (Bridge.is(o, System.String)) {
                            ai.moves.add(new Pidroh.ConsoleApp.Turnbased.MoveUse.$ctor1(this.moveCreatorProg.GetMoveId(Bridge.as(o, System.String))));
                            continue;
                        }
                        if (Bridge.is(o, System.Array.type(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))) {
                            $t1 = Bridge.getEnumerator(Bridge.as(o, System.Array.type(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)));
                            try {
                                while ($t1.moveNext()) {
                                    var item = $t1.Current;
                                    ai.moves.add(new Pidroh.ConsoleApp.Turnbased.MoveUse.$ctor1(item));
                                }
                            } finally {
                                if (Bridge.is($t1, System.IDisposable)) {
                                    $t1.System$IDisposable$Dispose();
                                }
                            }continue;
                        }
                        ai.moves.add(o);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return ai;
            },
            Moves: function (moves) {
                if (moves === void 0) { moves = []; }
                return moves;
            },
            AddEnemy: function (ai, hp, renderText) {
                var render = this.renderTexts.Count;
                this.renderTexts.add(renderText);
                this.enemyDatas.add(new Pidroh.ConsoleApp.Turnbased.EnemyData(ai, hp, render));
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.FixedAttackStage", {
        fields: {
            moves: null
        },
        ctors: {
            init: function () {
                this.moves = new (System.Collections.Generic.List$1(System.Int32)).ctor();
            },
            $ctor1: function (move) {
                this.$initialize();
                this.moves.add(move);
            },
            $ctor2: function (move) {
                if (move === void 0) { move = []; }

                this.$initialize();
                this.moves.AddRange(move);
            },
            ctor: function () {
                this.$initialize();
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.HappArea", {
        fields: {
            area: null,
            offset: null,
            mirroringX: 0
        },
        ctors: {
            init: function () {
                this.offset = new Pidroh.BaseUtils.Vector2D();
            },
            $ctor1: function (area) {
                this.$initialize();
                this.area = area;
            },
            ctor: function () {
                this.$initialize();
            },
            $ctor2: function (area, offset, mirroringX) {
                this.$initialize();
                this.area = area;
                this.offset = offset.$clone();
                this.mirroringX = mirroringX;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.HappDamageData", {
        fields: {
            targetE: 0,
            damageE: 0,
            target: 0,
            amount: 0,
            superEffective: false,
            elementalBlock: false
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            },
            $ctor1: function (targetE, damageE, target, amount, superEffective, elementalBlock) {
                this.$initialize();
                this.targetE = targetE;
                this.damageE = damageE;
                this.target = target;
                this.amount = amount;
                this.superEffective = superEffective;
                this.elementalBlock = elementalBlock;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.HappMoveData", {
        fields: {
            user: 0,
            target: 0,
            element: 0
        },
        ctors: {
            init: function () {
                this.target = -1;
                this.element = Pidroh.ConsoleApp.Turnbased.BattleMain.Element.None;
            },
            ctor: function () {
                this.$initialize();
            },
            $ctor1: function (user) {
                this.$initialize();
                this.user = user;
            },
            $ctor2: function (user, target, element) {
                this.$initialize();
                this.user = user;
                this.target = target;
                this.element = element;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.HappMovementFail", {
        fields: {
            moveTo: null
        },
        ctors: {
            init: function () {
                this.moveTo = new Pidroh.BaseUtils.Vector2D();
            },
            $ctor1: function (moveTo) {
                this.$initialize();
                this.moveTo = moveTo.$clone();
            },
            ctor: function () {
                this.$initialize();
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Happs.Happ", {
        fields: {
            tags: null,
            TimeStamp: 0,
            attrs: null
        },
        ctors: {
            init: function () {
                this.tags = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                this.attrs = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute)).ctor();
            },
            ctor: function (mainTag) {
                this.$initialize();
                //MainTag = mainTag.ToString();
                this.tags.add(System.Convert.toInt32(mainTag));
            }
        },
        methods: {
            AddAttribute: function (a) {
                this.attrs.add(a);
                return this;
            },
            GetAttribute_Int: function (index) {
                return Bridge.Int.clip32(this.attrs.getItem(index).Value);
            },
            HasTag: function (tagsNeeded) {
                return this.tags.contains(tagsNeeded);
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute", {
        $kind: "nested class",
        fields: {
            Value: 0,
            tags: null
        },
        ctors: {
            init: function () {
                this.tags = new Pidroh.ConsoleApp.Turnbased.Happs.TagHolder();
            }
        },
        methods: {
            SetValue: function (f) {
                this.Value = f;
                return this;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Happs.HappHandler", {
        fields: {
            necessaryTags: null,
            Handle: null
        },
        ctors: {
            init: function () {
                this.necessaryTags = new (System.Collections.Generic.List$1(System.Int32)).ctor();
            },
            ctor: function (mainTag, handle) {
                this.$initialize();
                this.necessaryTags.add(System.Convert.toInt32(mainTag));
                this.Handle = handle;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Happs.HappManager", {
        fields: {
            CurrentTime: 0,
            Happs: null,
            handlers: null,
            latestHandled: 0
        },
        ctors: {
            init: function () {
                this.Happs = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.Happs.Happ)).ctor();
                this.handlers = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.Happs.HappHandler)).ctor();
                this.latestHandled = -1;
            }
        },
        methods: {
            AddHandler: function (hh) {
                this.handlers.add(hh);
            },
            TryHandle: function () {
                if (this.latestHandled !== this.CurrentTime) {
                    this.Handle();
                }
            },
            Handle: function () {
                var $t, $t1;
                this.latestHandled = this.CurrentTime;
                $t = Bridge.getEnumerator(this.handlers);
                try {
                    while ($t.moveNext()) {
                        var h = $t.Current;
                        for (var i = (this.Happs.Count - 1) | 0; i >= 0; i = (i - 1) | 0) {
                            //this check assumes happs are ordered by time stamp
                            //which they should be automatically
                            if (this.Happs.getItem(i).TimeStamp !== this.CurrentTime) {
                                Pidroh.ConsoleApp.Turnbased.DebugExtra.DebugEx.Log("Happening not equal to current time");
                                break;
                            }
                            var hasTags = true;
                            $t1 = Bridge.getEnumerator(h.necessaryTags);
                            try {
                                while ($t1.moveNext()) {
                                    var tagsNeeded = $t1.Current;
                                    if (!this.Happs.getItem(i).HasTag(tagsNeeded)) {
                                        hasTags = false;
                                        break;
                                    }
                                }
                            } finally {
                                if (Bridge.is($t1, System.IDisposable)) {
                                    $t1.System$IDisposable$Dispose();
                                }
                            }if (hasTags) {
                                Pidroh.ConsoleApp.Turnbased.DebugExtra.DebugEx.Log("Happening handled");
                                h.Handle(this.Happs.getItem(i));
                            } else {
                                Pidroh.ConsoleApp.Turnbased.DebugExtra.DebugEx.Log("Happening tag is different");
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            Add: function (h) {
                h.TimeStamp = this.CurrentTime;
                this.Happs.add(h);
                return h;
            },
            Tick: function () {
                this.CurrentTime = (this.CurrentTime + 1) | 0;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Happs.TagHolder", {
        fields: {
            Tags: null
        },
        ctors: {
            init: function () {
                this.Tags = new (System.Collections.Generic.List$1(System.Object)).ctor();
            }
        },
        methods: {
            HasTag: function (t) {
                return this.Tags.contains(t);
            },
            Add: function (v) {
                this.Tags.add(v);
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.HappTags", {
        fields: {
            tags: null
        },
        ctors: {
            init: function () {
                this.tags = new (System.Collections.Generic.List$1(System.Int32)).ctor();
            },
            $ctor1: function (tags) {
                this.$initialize();
                this.tags.AddRange(tags);
            },
            $ctor2: function (i) {
                this.$initialize();
                this.tags.add(i);
            },
            ctor: function () {
                this.$initialize();

            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Input", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.ConsoleApp.Turnbased.Input(); }
            }
        },
        fields: {
            type: 0,
            arg1: 0
        },
        ctors: {
            $ctor2: function (type, arg1) {
                this.$initialize();
                this.type = type;
                this.arg1 = arg1;
            },
            $ctor1: function (type, arg1) {
                this.$initialize();
                this.type = type;
                this.arg1 = System.Convert.toInt32(arg1);
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1970302653, this.type, this.arg1]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.ConsoleApp.Turnbased.Input)) {
                    return false;
                }
                return Bridge.equals(this.type, o.type) && Bridge.equals(this.arg1, o.arg1);
            },
            $clone: function (to) {
                var s = to || new Pidroh.ConsoleApp.Turnbased.Input();
                s.type = this.type;
                s.arg1 = this.arg1;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.InputHolder", {
        fields: {
            inputs: null,
            tags: null
        },
        ctors: {
            init: function () {
                this.inputs = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.Input)).ctor();
                this.tags = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.InputTags)).ctor();
            }
        },
        methods: {
            Clear: function () {
                this.inputs.clear();
            },
            Add: function (input, tag) {
                this.inputs.add(input);
                this.tags.add(tag);

            },
            TagIs: function (i2, tag) {
                if (this.tags.Count <= i2) {
                    return false;
                }
                return this.tags.getItem(i2) === tag;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.InputTags", {
        $kind: "enum",
        statics: {
            fields: {
                NONE: 0,
                MOVEFIX: 1,
                MOVEUNFIX: 2,
                MISC: 3
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.InputType", {
        $kind: "enum",
        statics: {
            fields: {
                None: 0,
                Move: 1,
                MiscBattle: 2
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.MiscBattleInput", {
        $kind: "enum",
        statics: {
            fields: {
                Done: 0,
                Redo: 1,
                Preview: 2
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.MiscHappTags", {
        $kind: "enum",
        statics: {
            fields: {
                ChangeElement: 500,
                Damage: 501,
                Death: 502
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.MoveAction", {
        fields: {
            target: 0,
            distance: null
        },
        ctors: {
            init: function () {
                this.distance = new Pidroh.BaseUtils.Vector2D();
            },
            ctor: function (target, amount) {
                this.$initialize();
                this.target = target;
                this.distance = amount.$clone();
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.MoveCreatorProg", {
        fields: {
            moveDatas: null,
            moveRenders: null,
            areaUtils: null
        },
        ctors: {
            init: function () {
                this.moveDatas = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.MoveData)).ctor();
                this.moveRenders = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.MoveRenderData)).ctor();
                this.areaUtils = new Pidroh.ConsoleApp.Turnbased.MoveCreatorProg.AreaCreationUtils();
            },
            ctor: function () {
                this.$initialize();
                this.moveDatas.add(null); //do nothing
                var directions = System.Array.init([new Pidroh.BaseUtils.Vector2D.$ctor2(0, 1), new Pidroh.BaseUtils.Vector2D.$ctor2(-1, 0), new Pidroh.BaseUtils.Vector2D.$ctor2(0, -1), new Pidroh.BaseUtils.Vector2D.$ctor2(1, 0)], Pidroh.BaseUtils.Vector2D);
                var moveLabels = System.Array.init(["Move Up", "Move Left", "Move Down", "Move Right"], System.String);
                var moveAbrev = System.Array.init(["^", "<", "v", ">"], System.String);
                for (var i = 0; i < directions.length; i = (i + 1) | 0) {
                    this.NewMoveData(moveLabels[System.Array.index(i, moveLabels)], new Pidroh.ConsoleApp.Turnbased.Condition(Pidroh.ConsoleApp.Turnbased.ConditionType.CanMove, Pidroh.ConsoleApp.Turnbased.Target.Self, directions[System.Array.index(i, directions)].$clone()), new Pidroh.ConsoleApp.Turnbased.MoveAction(Pidroh.ConsoleApp.Turnbased.Target.Self, directions[System.Array.index(i, directions)].$clone()), this.TagArray([Pidroh.ConsoleApp.Turnbased.MoveDataTags.Movement, Pidroh.ConsoleApp.Turnbased.MoveDataTags.HeroInitial]));
                    this.NewMoveTextRenderData(moveLabels[System.Array.index(i, moveLabels)], moveAbrev[System.Array.index(i, moveAbrev)]);
                }
                this.NewMoveData$1("Gun", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.None)]), this.TagArray([Pidroh.ConsoleApp.Turnbased.MoveDataTags.Shoot]));
                this.NewMoveTextRenderData("Gun", "G");

                this.NewMoveData$1("Firegun", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.$ctor2(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire)]), this.TagArray([Pidroh.ConsoleApp.Turnbased.MoveDataTags.Shoot]));
                this.NewMoveTextRenderData("Firegun", "FG");

                this.NewMoveData$1("Icegun", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.$ctor2(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice)]), this.TagArray([Pidroh.ConsoleApp.Turnbased.MoveDataTags.Shoot]));
                this.NewMoveTextRenderData("Icegun", "IG");

                this.NewMoveData$1("Thundergun", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.$ctor2(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder)]), this.TagArray([Pidroh.ConsoleApp.Turnbased.MoveDataTags.Shoot]));
                this.NewMoveTextRenderData("Thundergun", "TG");

                var area = this.AreaUser().RowForward(1, 3);
                this.NewMoveData$1("Icebomb", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.ctor(area, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.ctor(area, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice)]), this.TagArray([Pidroh.ConsoleApp.Turnbased.MoveDataTags.Bomb]));
                this.NewMoveTextRenderData("Icebomb", "IB");

                this.NewMoveData$1("Thunderbomb", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.ctor(area, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.ctor(area, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder)]), this.TagArray([Pidroh.ConsoleApp.Turnbased.MoveDataTags.Bomb]));
                this.NewMoveTextRenderData("Thunderbomb", "TB");

                this.NewMoveData$1("Summon", this.OneTickPerAction([Pidroh.ConsoleApp.Turnbased.SummonEntity.Enemy(0, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 0))]), this.TagArray([Pidroh.ConsoleApp.Turnbased.MoveDataTags.Summon]));
                this.NewMoveTextRenderData("Summon", "SU");
            }
        },
        methods: {
            GetMoveId: function (v) {
                return Pidroh.ConsoleApp.Turnbased.MoveData.FindByLabel(this.moveDatas, v);
            },
            AreaUser: function () {
                this.areaUtils.target = Pidroh.ConsoleApp.Turnbased.Target.Self;
                return this.areaUtils;
            },
            NewMoveTextRenderData: function (name, abrev) {
                this.moveRenders.add(new Pidroh.ConsoleApp.Turnbased.MoveRenderData(name, abrev));
            },
            NewMoveData$1: function (label, ticks, tags) {
                var $t;
                var mv = new Pidroh.ConsoleApp.Turnbased.MoveData(label);
                mv.units.AddRange(ticks);
                $t = Bridge.getEnumerator(tags);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        mv.tags.add(System.Convert.toInt32(item));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.moveDatas.add(mv);
            },
            NewMoveData: function (label, condition, action, tags) {
                var $t;
                var mv = new Pidroh.ConsoleApp.Turnbased.MoveData(label);
                var tick = new Pidroh.ConsoleApp.Turnbased.Tick.ctor();
                tick.condition = condition;
                tick.thingsToHappen.add(action);
                mv.units.add(tick);
                $t = Bridge.getEnumerator(tags);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        mv.tags.add(System.Convert.toInt32(item));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }this.moveDatas.add(mv);
            },
            OneTickPerAction: function (actions) {
                if (actions === void 0) { actions = []; }
                var ticks = System.Array.init(actions.length, null, Pidroh.ConsoleApp.Turnbased.Tick);
                for (var i = 0; i < ticks.length; i = (i + 1) | 0) {
                    ticks[System.Array.index(i, ticks)] = new Pidroh.ConsoleApp.Turnbased.Tick.$ctor1(actions[System.Array.index(i, actions)]);
                }
                return ticks;
            },
            TagArray: function (args) {
                if (args === void 0) { args = []; }
                return args;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.MoveCreatorProg.AreaCreationUtils", {
        $kind: "nested class",
        fields: {
            target: 0,
            height: 0
        },
        ctors: {
            init: function () {
                this.height = 3;
            }
        },
        methods: {
            RowForward: function (width, XDis) {
                var ra = new Pidroh.ConsoleApp.Turnbased.Area(this.target);
                var offsetY = Bridge.Int.clip32(Math.floor(this.height / 2.0));
                for (var i = 0; i < width; i = (i + 1) | 0) {
                    for (var j = 0; j < this.height; j = (j + 1) | 0) {

                        ra.points.add(new Pidroh.BaseUtils.Vector2D.$ctor2(((i + XDis) | 0), ((j - offsetY) | 0)));
                    }
                }
                return ra;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.MoveData", {
        statics: {
            methods: {
                FindByLabel: function (moveDatas, label) {
                    for (var i = 0; i < moveDatas.Count; i = (i + 1) | 0) {
                        if (moveDatas.getItem(i) != null) {
                            if (Bridge.referenceEquals(moveDatas.getItem(i).label, label)) {
                                return i;
                            }
                        }
                    }
                    return -1;
                }
            }
        },
        fields: {
            label: null,
            units: null,
            tags: null
        },
        ctors: {
            init: function () {
                this.units = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.Tick)).ctor();
                this.tags = new (System.Collections.Generic.List$1(System.Int32)).ctor();
            },
            ctor: function (label) {
                this.$initialize();
                this.label = label;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.MoveDataExecuter", {
        statics: {
            methods: {
                ResolveTarget: function (actor, entities, targetType) {
                    var $t;
                    if (targetType === Pidroh.ConsoleApp.Turnbased.Target.Self) {
                        return actor;
                    }
                    var target = null;
                    var minDis = 10;
                    $t = Bridge.getEnumerator(entities);
                    try {
                        while ($t.moveNext()) {
                            var e2 = $t.Current;

                            if (e2.Dead) {
                                continue;
                            }
                            if (actor.Type !== e2.Type && e2.Type !== Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.paneleffect && e2.Type !== Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.pickup) {
                                var sameHeight = actor.pos.Y === e2.pos.Y;

                                if (sameHeight) {
                                    var dis = actor.pos.X - e2.pos.X;
                                    if (dis < 0) {
                                        dis *= -1;
                                    }
                                    if (dis < minDis) {
                                        minDis = dis;
                                        target = e2;
                                    }

                                }
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    return target;
                }
            }
        },
        fields: {
            battleMain: null,
            moveDatas: null,
            happManager: null,
            entities: null,
            ecs: null,
            timeStamp: null,
            aux: null
        },
        ctors: {
            init: function () {
                this.aux = new (System.Collections.Generic.List$1(Pidroh.BaseUtils.Vector2D)).ctor();
            },
            ctor: function (turnBase, moveDatas, ecs, timeStamp) {
                this.$initialize();
                this.battleMain = turnBase;
                this.moveDatas = moveDatas;
                this.ecs = ecs;
                this.timeStamp = timeStamp;
            }
        },
        methods: {
            ExecuteMove: function (actor, turn) {
                var $t, $t1, $t2, $t3, $t4;


                var battleState = this.battleMain.battleState;
                this.entities = this.battleMain.entities;
                var userId = this.entities.indexOf(actor);

                var moveId = actor.moves[System.Array.index(turn, actor.moves)];
                if (moveId < 0) {
                    return;
                }
                var md = this.moveDatas.getItem(moveId);
                if (md == null) {
                    return;
                }
                battleState.moveTick_Total = md.units.Count;
                var moveTick = Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(battleState.moveTick_Now);
                var actions = md.units.getItem(moveTick).thingsToHappen;
                this.happManager = this.battleMain.happManager;



                $t = Bridge.getEnumerator(actions);
                try {
                    while ($t.moveNext()) {
                        var a = $t.Current;

                        if (Bridge.is(a, Pidroh.ConsoleApp.Turnbased.MoveAction)) {
                            var ma = Bridge.as(a, Pidroh.ConsoleApp.Turnbased.MoveAction);
                            var p = ma.distance.$clone();
                            actor.pos = Pidroh.BaseUtils.Vector2D.op_Addition(actor.pos.$clone(), p.$clone());
                            var invalidMove = actor.pos.X < actor.minPos.X || actor.pos.Y < actor.minPos.Y || actor.pos.Y > actor.maxPos.Y || actor.pos.X > actor.maxPos.X;
                            $t1 = Bridge.getEnumerator(this.entities);
                            try {
                                while ($t1.moveNext()) {
                                    var e = $t1.Current;
                                    if (!Bridge.referenceEquals(e, actor) && e.Alive) {
                                        if (Pidroh.BaseUtils.Vector2D.op_Equality(actor.pos.$clone(), e.pos.$clone())) {
                                            invalidMove = true;
                                            if (e.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.pickup) {
                                                e.life = 0;
                                                actor.damageMultiplier = 2;
                                                invalidMove = false;
                                            }
                                            if (e.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.paneleffect) {
                                                invalidMove = false;
                                            }
                                            if (invalidMove) {
                                                break;
                                            }


                                        }
                                    }
                                }
                            } finally {
                                if (Bridge.is($t1, System.IDisposable)) {
                                    $t1.System$IDisposable$Dispose();
                                }
                            }if (invalidMove) {
                                //Console.WriteLine("Invalid move generate" + battleState.moveTick_Now.Val);

                                var actorId = this.entities.indexOf(actor);
                                this.CreateHapp(md, new Pidroh.ConsoleApp.Turnbased.HappMoveData.$ctor1(actorId), new Pidroh.ConsoleApp.Turnbased.HappMovementFail.$ctor1(actor.pos.$clone()));


                                this.battleMain.happManager.Add(new Pidroh.ConsoleApp.Turnbased.Happs.Happ(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag.MovementFail)).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(actorId)).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(actor.pos.X)).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(actor.pos.Y));

                                battleState.moveTick_Total = 1;
                                actor.pos = Pidroh.BaseUtils.Vector2D.op_Subtraction(actor.pos.$clone(), p.$clone());
                            }
                        }
                        if (Bridge.is(a, Pidroh.ConsoleApp.Turnbased.DealDamageAction)) {
                            var dda = Bridge.as(a, Pidroh.ConsoleApp.Turnbased.DealDamageAction);
                            var attackElement = dda.element;

                            if (dda.target === Pidroh.ConsoleApp.Turnbased.Target.Area) {
                                var area = dda.area;
                                var referenceUserOfArea = Pidroh.ConsoleApp.Turnbased.MoveDataExecuter.ResolveTarget(actor, this.entities, area.target);
                                var mirroringX = 1;
                                if (actor.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy) {
                                    mirroringX = -1;
                                }
                                $t2 = Bridge.getEnumerator(area.points);
                                try {
                                    while ($t2.moveNext()) {
                                        var point = $t2.Current.$clone();
                                        var searchPos = Pidroh.BaseUtils.Vector2D.op_Addition(Pidroh.BaseUtils.Vector2D.op_Multiply(point.$clone(), new Pidroh.BaseUtils.Vector2D.$ctor2(mirroringX, 1)), referenceUserOfArea.pos.$clone());
                                        //Console.WriteLine("Search point "+searchPos);
                                        for (var i = 0; i < this.entities.Count; i = (i + 1) | 0) {
                                            if (Pidroh.BaseUtils.Vector2D.op_Equality(this.entities.getItem(i).pos.$clone(), searchPos.$clone())) {
                                                this.DealDamage(actor, dda, this.entities.getItem(i));
                                            }
                                        }
                                    }
                                } finally {
                                    if (Bridge.is($t2, System.IDisposable)) {
                                        $t2.System$IDisposable$Dispose();
                                    }
                                }
                            } else {
                                //find target
                                var target = Pidroh.ConsoleApp.Turnbased.MoveDataExecuter.ResolveTarget(actor, this.entities, dda.target);
                                if (target != null) {
                                    this.DealDamage(actor, dda, target);

                                }
                            }
                        }
                        if (Bridge.is(a, Pidroh.ConsoleApp.Turnbased.SummonEntity)) {
                            var se = Bridge.as(a, Pidroh.ConsoleApp.Turnbased.SummonEntity);
                            var enemyWhich = se.enemyWhich;
                            var enemyId = this.battleMain.BattleConfig.enemiesToSummon.getItem(enemyWhich);
                            var entities = this.battleMain.entities;
                            var positions = this.GetEmptySpots(1);
                            if (positions.Count === 0) {
                                return;
                            }

                            var summonPos = se.preferentialRowColumn.$clone();
                            if (!positions.contains(summonPos.$clone())) {
                                summonPos = positions.getItem(0).$clone();
                            }
                            this.ecs.CreateEntityWithComponent(new Pidroh.ConsoleApp.Turnbased.SpawnData.$ctor1(enemyId, summonPos.$clone(), Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy));

                        }
                        if (Bridge.is(a, Pidroh.ConsoleApp.Turnbased.Animation)) {
                            var anim = Bridge.as(a, Pidroh.ConsoleApp.Turnbased.Animation);
                            var target1 = Pidroh.ConsoleApp.Turnbased.MoveDataExecuter.ResolveTarget(actor, this.entities, anim.target);
                            var area1 = anim.area;
                            var happArea = null;
                            if (area1 != null) {
                                var referenceUserOfArea1 = Pidroh.ConsoleApp.Turnbased.MoveDataExecuter.ResolveTarget(actor, this.entities, area1.target);

                                var mirroringX1 = 1;
                                if (actor.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy) {
                                    mirroringX1 = -1;
                                }
                                happArea = new Pidroh.ConsoleApp.Turnbased.HappArea.$ctor2(area1, referenceUserOfArea1.pos.$clone(), mirroringX1);
                            }
                            var targetId = -1;
                            if (target1 != null) {
                                targetId = this.entities.indexOf(target1);
                            }
                            this.CreateHapp(md, happArea, new Pidroh.ConsoleApp.Turnbased.HappMoveData.$ctor2(userId, targetId, anim.element));

                            if (anim.target !== Pidroh.ConsoleApp.Turnbased.Target.None) {
                                this.happManager.Add(new Pidroh.ConsoleApp.Turnbased.Happs.Happ(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag.AttackHit)).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(this.entities.indexOf(target1))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(userId)).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(anim.element));
                            }


                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                if (moveTick === ((md.units.Count - 1) | 0)) {
                    $t3 = Bridge.getEnumerator(md.units);
                    try {
                        while ($t3.moveNext()) {
                            var item = $t3.Current;
                            $t4 = Bridge.getEnumerator(item.thingsToHappen);
                            try {
                                while ($t4.moveNext()) {
                                    var act = $t4.Current;
                                    if (Bridge.is(act, Pidroh.ConsoleApp.Turnbased.DealDamageAction)) {
                                        this.ChangeElement(actor, (Bridge.as(act, Pidroh.ConsoleApp.Turnbased.DealDamageAction)).element);
                                    }
                                }
                            } finally {
                                if (Bridge.is($t4, System.IDisposable)) {
                                    $t4.System$IDisposable$Dispose();
                                }
                            }
                        }
                    } finally {
                        if (Bridge.is($t3, System.IDisposable)) {
                            $t3.System$IDisposable$Dispose();
                        }
                    }
                }
            },
            GetEmptySpots: function (side) {
                var $t;
                if (side === void 0) { side = -1; }
                this.aux.clear();
                var offX = 0;
                if (side === 1) {
                    offX = 3;
                }
                var width = (Bridge.Int.div(this.battleMain.BoardWidth, 2)) | 0;
                if (side === -1) {
                    width = this.battleMain.BoardWidth;
                }
                for (var i = 0; i < width; i = (i + 1) | 0) {
                    for (var j = 0; j < this.battleMain.BoardHeight; j = (j + 1) | 0) {

                        this.aux.add(new Pidroh.BaseUtils.Vector2D.$ctor2(((i + offX) | 0), j));
                    }
                }
                var entities = this.battleMain.entities;
                $t = Bridge.getEnumerator(entities);
                try {
                    while ($t.moveNext()) {
                        var e = $t.Current;
                        if (e.Alive && this.aux.contains(e.pos.$clone())) {
                            this.aux.remove(e.pos.$clone());
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return this.aux;

            },
            ChangeElement: function (actor, element) {
                if (actor.element === element) {
                    return;
                }
                actor.element = element;
                var th = new Pidroh.ConsoleApp.Turnbased.HappTags.$ctor2(Pidroh.ConsoleApp.Turnbased.MiscHappTags.ChangeElement);
                Pidroh.ECS.ExtensionMethods.AddComponent$1(this.ecs.CreateEntityWithComponent$1(th, new Pidroh.ConsoleApp.Turnbased.HappMoveData.$ctor2(this.entities.indexOf(actor), -1, element)), this.timeStamp.GetSnap());
            },
            CreateHapp: function (md, comp1, comp2) {
                var th = new Pidroh.ConsoleApp.Turnbased.HappTags.$ctor1(md.tags);
                var e = this.ecs.CreateEntityWithComponent$1(th, this.timeStamp.GetSnap());
                if (comp1 != null) {
                    Pidroh.ECS.ExtensionMethods.AddComponent$1(e, comp1);
                }
                if (comp2 != null) {
                    Pidroh.ECS.ExtensionMethods.AddComponent$1(e, comp2);
                }
            },
            CreateHapp$1: function (tag, comp1, comp2) {
                var th = new Pidroh.ConsoleApp.Turnbased.HappTags.$ctor2(tag);
                var e = this.ecs.CreateEntityWithComponent$1(th, this.timeStamp.GetSnap());
                if (comp1 != null) {
                    Pidroh.ECS.ExtensionMethods.AddComponent$1(e, comp1);
                }
                if (comp2 != null) {
                    Pidroh.ECS.ExtensionMethods.AddComponent$1(e, comp2);
                }
            },
            DealDamage: function (actor, dda, target) {
                var attackElement = dda.element;
                var elementalBlock = attackElement === target.element && attackElement !== Pidroh.ConsoleApp.Turnbased.BattleMain.Element.None;
                var superEffective = false;
                var damage = 0;
                var targetId = this.entities.indexOf(target);
                if (elementalBlock) {
                }
                {
                    if (!elementalBlock) {
                        var mul = this.battleMain.CalculateAttackMultiplier(actor);
                        mul *= this.battleMain.CalculateDefenderMultiplier(target);
                        if (attackElement === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire && target.element === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice || attackElement === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder && target.element === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire || attackElement === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice && target.element === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder) {
                            mul *= 3;
                            superEffective = true;
                        }



                        damage = Bridge.Int.mul(dda.damage, Bridge.Int.clip32(mul));
                        target.life = (target.life - damage) | 0;

                        actor.damageMultiplier = 1;

                        this.happManager.Add(new Pidroh.ConsoleApp.Turnbased.Happs.Happ(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag.DamageTaken)).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(targetId));
                    }
                }
                this.CreateHapp$1(Pidroh.ConsoleApp.Turnbased.MiscHappTags.Damage, new Pidroh.ConsoleApp.Turnbased.HappDamageData.$ctor1(target.element, dda.element, this.entities.indexOf(target), damage, superEffective, elementalBlock), null);
                if (target.life <= 0 && !superEffective) {
                    this.CreateHapp$1(Pidroh.ConsoleApp.Turnbased.MiscHappTags.Death, new Pidroh.ConsoleApp.Turnbased.HappMoveData.$ctor1(targetId), null);
                }
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.MoveDataTags", {
        $kind: "enum",
        statics: {
            fields: {
                HeroInitial: 0,
                Movement: 1,
                Shoot: 2,
                Bomb: 3,
                Summon: 4
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.MoveRenderData", {
        fields: {
            Label: null,
            Abrev: null
        },
        ctors: {
            ctor: function (label, abrev) {
                this.$initialize();
                this.Label = label;
                this.Abrev = abrev;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.MoveUse", {
        fields: {
            move: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            },
            $ctor1: function (move) {
                this.$initialize();
                this.move = move;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.PickupInfo", {
        fields: {
            necessaryForVictory: false
        },
        ctors: {
            $ctor1: function (necessaryForVictory) {
                this.$initialize();
                this.necessaryForVictory = necessaryForVictory;
            },
            ctor: function () {
                this.$initialize();
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.SpawnData", {
        fields: {
            id: 0,
            entityType: 0,
            position: null
        },
        ctors: {
            init: function () {
                this.position = new Pidroh.BaseUtils.Vector2D();
            },
            ctor: function () {
                this.$initialize();
            },
            $ctor1: function (id, position, type) {
                this.$initialize();
                this.id = id;
                this.position = position.$clone();
                this.entityType = type;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.SpawnEntityFactory", {
        fields: {
            ecs: null,
            enemyDatas: null,
            battleMain: null,
            spawns: null
        },
        ctors: {
            ctor: function (ecs, enemyDatas, battleMain) {
                this.$initialize();
                this.ecs = ecs;
                //ecs.QuickAccessor1<EnemyData>();
                this.spawns = ecs.QuickAccessor1(Pidroh.ConsoleApp.Turnbased.SpawnData);
                this.enemyDatas = enemyDatas;
                this.battleMain = battleMain;
            }
        },
        methods: {
            Spawn: function () {
                var $t;
                var spawned = 0;
                //for (int i = 0; i < spawns.Count; i++)
                while (this.spawns.Count > 0) {
                    var spawn = this.spawns.Comp1(0);
                    Pidroh.ECS.ExtensionMethods.RemoveComponent(this.spawns.Entity(0), spawn);
                    var id = spawn.id;
                    var entType = spawn.entityType;
                    if (entType === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.pickup) {
                        var be = this.battleMain.NewBattleEntity();
                        be.Type = entType;
                        var pickup = new Pidroh.ConsoleApp.Turnbased.PickupInfo.$ctor1(true);
                        var pickupE = this.ecs.CreateEntityWithComponent(pickup);
                        Pidroh.ECS.ExtensionMethods.AddComponent$1(pickupE, be);
                        be.pos = spawn.position.$clone();
                        be.life = 1;
                        be.maxLife = 1;
                        be.drawLife = false;
                        be.drawTurn = false;
                        be.graphic = 4;

                    }
                    if (entType === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy) {
                        var enemyAI = this.enemyDatas.getItem(id).enemyAI;
                        var enemy = this.ecs.CreateEntityWithComponent(enemyAI);
                        var be1 = this.battleMain.NewBattleEntity();
                        be1.pos = spawn.position.$clone();
                        be1.life = this.enemyDatas.getItem(id).hp;
                        be1.maxLife = be1.life;
                        be1.graphic = this.enemyDatas.getItem(id).render;
                        var entities = this.battleMain.entities;
                        $t = Bridge.getEnumerator(entities);
                        try {
                            while ($t.moveNext()) {
                                var item = $t.Current;
                                if (!Bridge.referenceEquals(item, be1) && item.graphic === be1.graphic) {
                                    be1.graphicRepeatedIndex = (be1.graphicRepeatedIndex + 1) | 0;
                                }
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }be1.minPos = new Pidroh.BaseUtils.Vector2D.$ctor2(3, 0);
                        be1.maxPos = new Pidroh.BaseUtils.Vector2D.$ctor2(5, 2);
                        be1.Type = Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy;
                        Pidroh.ECS.ExtensionMethods.AddComponent$1(enemy, be1);
                        var enemyAiState = new Pidroh.ConsoleApp.Turnbased.EnemyAIState();
                        enemyAiState.progress = spawned;
                        Pidroh.ECS.ExtensionMethods.AddComponent$1(enemy, enemyAiState);
                        //Console.Write("SPAWN");
                        spawned = (spawned + 1) | 0;
                    }

                }

            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.StageData", {
        fields: {
            enemySpawns: null,
            battleConfig: null,
            hideLifeUI: false
        },
        ctors: {
            init: function () {
                this.enemySpawns = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.SpawnData)).ctor();
                this.hideLifeUI = false;
            },
            ctor: function () {
                this.$initialize();
            },
            $ctor2: function (spawns) {
                if (spawns === void 0) { spawns = []; }

                this.$initialize();
                this.enemySpawns.AddRange(spawns);
            },
            $ctor1: function (battleConfig, spawns) {
                if (spawns === void 0) { spawns = []; }

                this.$initialize();
                this.enemySpawns.AddRange(spawns);
                this.battleConfig = battleConfig;
            }
        },
        methods: {
            HideLifeUI: function () {
                this.hideLifeUI = true;
                return this;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.StageDataCreator", {
        fields: {
            ecs: null
        },
        ctors: {
            ctor: function (ecs) {
                this.$initialize();
                this.ecs = ecs;

                //Add(new StageData(
                //  //Enemy(0, new BaseUtils.Vector2D(4, 0)),
                //  Enemy(5, new BaseUtils.Vector2D(4, 1)),
                //  Enemy(7, new BaseUtils.Vector2D(3, 0))
                //  ));

                this.Add$1([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(0, 0)), this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(2, 2))]).HideLifeUI(), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.ctor()]);
                this.Add$1([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1(new Pidroh.ConsoleApp.Turnbased.BattleConfig.$ctor1(false), [this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(2, 1)), this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(0, 2)), this.Enemy(4, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]).HideLifeUI(), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.ctor()]);
                this.Add$1([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1(new Pidroh.ConsoleApp.Turnbased.BattleConfig.$ctor1(false), [this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(2, 2)), this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(1, 2)), this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(0, 2)), this.Enemy(5, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 2))]), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.ctor()]);
                this.Add$1([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(6, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 0))]), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire)]);
                this.Add$1([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(4, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1))]), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire)]);
                this.Add$1([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(5, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1))]), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire)]);
                this.Add$1([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(5, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1)), this.Enemy(7, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 0))]), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.$ctor2([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder])]);
                this.Add([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(0, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 0)), this.Enemy(0, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 2))]), new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(1, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 2)), this.Enemy(2, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]), new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(0, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1)), this.Enemy(1, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]), new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(0, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 2)), this.Enemy(2, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 1)), this.Enemy(2, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]), new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1(new Pidroh.ConsoleApp.Turnbased.BattleConfig.$ctor2(System.Array.init([1], System.Int32)), [this.Enemy(3, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1))])]);

            }
        },
        methods: {
            Add$1: function (comps) {
                var $t;
                if (comps === void 0) { comps = []; }

                var e = this.ecs.CreateEntity();
                $t = Bridge.getEnumerator(comps);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        Pidroh.ECS.ExtensionMethods.AddComponent$1(e, item);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            Add: function (stageData1) {
                var $t;
                if (stageData1 === void 0) { stageData1 = []; }
                $t = Bridge.getEnumerator(stageData1);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        this.ecs.CreateEntityWithComponent(item);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }//stages.AddRange(stageData1);
            },
            Pickup: function (v, vector2D) {
                return new Pidroh.ConsoleApp.Turnbased.SpawnData.$ctor1(v, vector2D.$clone(), Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.pickup);
            },
            Enemy: function (v, vector2D) {
                return new Pidroh.ConsoleApp.Turnbased.SpawnData.$ctor1(v, vector2D.$clone(), Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy);
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.SummonEntity", {
        statics: {
            methods: {
                Enemy: function (v, vector2D) {
                    return new Pidroh.ConsoleApp.Turnbased.SummonEntity(v, vector2D.$clone());
                }
            }
        },
        fields: {
            enemyWhich: 0,
            preferentialRowColumn: null
        },
        ctors: {
            init: function () {
                this.preferentialRowColumn = new Pidroh.BaseUtils.Vector2D();
            },
            ctor: function (enemyWhich, preferentialRowColumn) {
                this.$initialize();
                this.enemyWhich = enemyWhich;
                this.preferentialRowColumn = preferentialRowColumn.$clone();
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Target", {
        $kind: "enum",
        statics: {
            fields: {
                None: 0,
                Self: 1,
                ClosestTarget: 2,
                ClosestTargetX: 3,
                Area: 4
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Tick", {
        fields: {
            condition: null,
            thingsToHappen: null
        },
        ctors: {
            init: function () {
                this.thingsToHappen = new (System.Collections.Generic.List$1(System.Object)).ctor();
            },
            $ctor1: function (action) {
                this.$initialize();
                this.thingsToHappen.add(action);
            },
            ctor: function () {
                this.$initialize();
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Value", {
        statics: {
            methods: {
                op_Addition: function (c1, c2) {
                    c1.Val += c2;
                    return c1;
                },
                op_Subtraction: function (c1, c2) {
                    return c1.Val - c2;
                },
                op_Equality: function (c1, c2) {
                    var c2null = Bridge.referenceEquals(c2, null);
                    var c1null = Bridge.referenceEquals(c1, null);
                    if (c2null && c1null) {
                        return true;
                    }
                    if (c1null || c2null) {
                        return false;
                    }
                    return c1.Val === c2.Val;
                },
                op_Inequality: function (c1, c2) {
                    var c2null = Bridge.referenceEquals(c2, null);
                    var c1null = Bridge.referenceEquals(c1, null);
                    if (c2null && c1null) {
                        return false;
                    }
                    if (c1null || c2null) {
                        return true;
                    }
                    return c1.Val !== c2.Val;
                },
                op_Implicit$1: function (d) {
                    return d.Val;
                },
                op_Implicit: function (d) {
                    return Bridge.Int.clip32(d.Val);
                }
            }
        },
        fields: {
            Val: 0
        },
        props: {
            valAsEnum: {
                set: function (value) {
                    this.Val = System.Convert.toSingle(value);
                }
            }
        },
        methods: {
            Set: function (v) {
                this.Val = v;
            }
        }
    });

    Bridge.define("Pidroh.ECS.Accessor", {
        fields: {
            TypesProhibited: null,
            TypesNecessary: null,
            SelectedEntities: null
        },
        props: {
            Length: {
                get: function () {
                    return this.SelectedEntities.Count;
                }
            }
        },
        ctors: {
            init: function () {
                this.SelectedEntities = new (System.Collections.Generic.List$1(Pidroh.ECS.Entity)).ctor();
            },
            ctor: function (s) {
                if (s === void 0) { s = []; }

                this.$initialize();
                this.TypesNecessary = s;
            }
        },
        methods: {
            EntityAdded: function (e) {
                return this.SelectedEntities.contains(e);
            },
            Get: function (i) {
                return this.SelectedEntities.getItem(i);
            }
        }
    });

    Bridge.define("Pidroh.ECS.ClonedState", {
        fields: {
            comps: null
        },
        ctors: {
            init: function () {
                this.comps = new (System.Collections.Generic.Dictionary$2(Function,System.Array.type(System.Object)))();
            }
        }
    });

    Bridge.define("Pidroh.ECS.ECSManager", {
        statics: {
            fields: {
                managers: null
            },
            ctors: {
                init: function () {
                    this.managers = System.Array.init(20, null, Pidroh.ECS.ECSManager);
                }
            },
            methods: {
                GetInstance: function (e) {
                    return Pidroh.ECS.ECSManager.managers[System.Array.index(e.ecs, Pidroh.ECS.ECSManager.managers)];
                },
                Create: function () {

                    for (var i = 0; i < Pidroh.ECS.ECSManager.managers.length; i = (i + 1) | 0) {
                        if (Pidroh.ECS.ECSManager.managers[System.Array.index(i, Pidroh.ECS.ECSManager.managers)] == null) {
                            Pidroh.ECS.ECSManager.managers[System.Array.index(i, Pidroh.ECS.ECSManager.managers)] = new Pidroh.ECS.ECSManager();
                            Pidroh.ECS.ECSManager.managers[System.Array.index(i, Pidroh.ECS.ECSManager.managers)].ECSId = i;
                            return Pidroh.ECS.ECSManager.managers[System.Array.index(i, Pidroh.ECS.ECSManager.managers)];
                        }

                    }
                    return null;
                },
                Copy: function (to, type, toArray, origin) {


                    for (var i = 0; i < origin.length; i = (i + 1) | 0) {
                        if (origin[System.Array.index(i, origin)] == null) {
                            if (toArray[System.Array.index(i, toArray)] != null) {
                                //Console.WriteLine("Removing entity");
                                toArray[System.Array.index(i, toArray)] = null;
                            }

                        } else {
                            //Console.WriteLine(type);
                            if (toArray[System.Array.index(i, toArray)] == null) {
                                toArray[System.Array.index(i, toArray)] = Bridge.createInstance(type);
                            }
                            Pidroh.BaseUtils.DeepCloneHelper.DeepCopyPartial(origin[System.Array.index(i, origin)], toArray[System.Array.index(i, toArray)]);
                        }
                    }
                }
            }
        },
        fields: {
            comps: null,
            ECSId: 0,
            entityIdMax: 0,
            accessors: null,
            aux: null
        },
        ctors: {
            init: function () {
                this.comps = new (System.Collections.Generic.Dictionary$2(Function,System.Array.type(System.Object)))();
                this.entityIdMax = -1;
                this.accessors = new (System.Collections.Generic.List$1(Pidroh.ECS.Accessor)).ctor();
                this.aux = new (System.Collections.Generic.List$1(Function)).ctor();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            CreateProcessor: function (accessor, action) {

                return new Pidroh.ECS.ProcessorAccessor(action, accessor);
            },
            CreateAccessor: function (necessary, not) {
                var acc = new Pidroh.ECS.Accessor(necessary);
                acc.TypesProhibited = not;
                this.AddAccessor(acc);
                return acc;

            },
            QuickAccessor2: function (T1, T2) {
                var accessor = new (Pidroh.ECS.QuickAccessorTwo$2(T1,T2))();
                this.AddAccessor(accessor.accessor);
                return accessor;
            },
            QuickAccessor1: function (T1) {
                var accessor = new (Pidroh.ECS.QuickAccessorOne$1(T1))();
                this.AddAccessor(accessor.accessor);
                return accessor;
            },
            CreateEntityWithComponent: function (v) {
                var e = { v : new Pidroh.ECS.Entity() };
                this.CreateEntity$1(e);
                this.AddComponent(e.v, v);
                return e.v;
            },
            CreateEntityWithComponent$1: function (v, v2) {
                var e = { v : new Pidroh.ECS.Entity() };
                this.CreateEntity$1(e);
                this.AddComponent(e.v, v);
                this.AddComponent(e.v, v2);
                return e.v;
            },
            CreateEntity$1: function (e) {
                this.entityIdMax = (this.entityIdMax + 1) | 0;
                var entity = new Pidroh.ECS.Entity.$ctor1(this.ECSId, this.entityIdMax);
                e.v = entity;
                return entity;
            },
            CreateEntity: function () {
                this.entityIdMax = (this.entityIdMax + 1) | 0;
                var entity = new Pidroh.ECS.Entity.$ctor1(this.ECSId, this.entityIdMax);
                return entity;
            },
            QuickProcessorFlex: function (T1, T2, p) {
                var processorFlex = new (Pidroh.ECS.ProcessorFlex$2(T1,T2))(p);
                var accessor = processorFlex.accessor;
                var accessor1 = accessor.accessor;
                this.AddAccessor(accessor1);
                return processorFlex;
            },
            AddAccessor: function (accessor1) {
                this.accessors.add(accessor1);
                for (var i = 0; i <= this.entityIdMax; i = (i + 1) | 0) {
                    this.UpdateAccessorEntity(accessor1, i);
                }

            },
            UpdateAccessorEntity: function (accessor, entityId) {
                var entity = new Pidroh.ECS.Entity.$ctor1(this.ECSId, entityId);
                var belong = this.HasAllComps(accessor.TypesNecessary, entityId) && this.HasNoneOfTheseComps(accessor.TypesProhibited, entityId);
                var member = accessor.EntityAdded(entity);

                if (belong !== member) {
                    if (belong) {
                        accessor.SelectedEntities.add(entity);
                    } else {
                        //Console.WriteLine("REMOVED ENTITY "+accessor.TypesNecessary[0]);
                        accessor.SelectedEntities.remove(entity);
                        //Console.WriteLine(accessor.EntityAdded(entity)+" BELONG");
                    }
                }

            },
            CloneState: function (cs) {
                var comps = this.comps;
                var comps2 = cs.comps;
                this.Copy(comps, comps2);
            },
            RestoreState: function (cs) {
                var $t;
                var comps = this.comps;
                var comps2 = cs.comps;
                this.Copy(comps2, comps);

                for (var i = 0; i <= this.entityIdMax; i = (i + 1) | 0) {
                    $t = Bridge.getEnumerator(this.accessors);
                    try {
                        while ($t.moveNext()) {
                            var item = $t.Current;
                            this.UpdateAccessorEntity(item, i);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }}

            },
            Copy: function (from, to) {
                var $t, $t1;
                this.aux.clear();

                $t = Bridge.getEnumerator(from);
                try {
                    while ($t.moveNext()) {
                        var c = $t.Current;
                        var type = c.key;
                        this.aux.add(type);
                        if (!to.containsKey(type)) {
                            to.add(type, System.Array.init(300, null, System.Object));
                        }
                        var toArray = to.get(type);
                        var origin = c.value;
                        Pidroh.ECS.ECSManager.Copy(to, type, toArray, origin);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }$t1 = Bridge.getEnumerator(to);
                try {
                    while ($t1.moveNext()) {
                        var c1 = $t1.Current;
                        var type1 = c1.key;
                        if (!this.aux.contains(type1)) {
                            this.aux.add(type1);
                            var toArray1 = c1.value; //access inverted when compared to previous
                            //var origin = from[type];
                            for (var i = 0; i < toArray1.length; i = (i + 1) | 0) {
                                toArray1[System.Array.index(i, toArray1)] = null;
                                //Console.WriteLine("Removing entity");
                            }
                        }

                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }},
            AddComponent$1: function (T, e) {
                var t = Bridge.createInstance(T);
                this.AddComponent(e, t);

                return t;
            },
            AddComponent: function (e, t) {
                var $t, $t1;
                var type = Bridge.getType(t);
                if (!this.comps.containsKey(type)) {
                    this.comps.add(type, System.Array.init(300, null, System.Object));
                }
                ($t = this.comps.get(type))[System.Array.index(e.id, $t)] = t;
                $t1 = Bridge.getEnumerator(this.accessors);
                try {
                    while ($t1.moveNext()) {
                        var item = $t1.Current;
                        this.UpdateAccessorEntity(item, e.id);

                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }},
            RemoveComponent: function (e, t) {
                var $t, $t1;
                var type = Bridge.getType(t);
                if (!this.comps.containsKey(type)) {
                    this.comps.add(type, System.Array.init(300, null, System.Object));
                }
                ($t = this.comps.get(type))[System.Array.index(e.id, $t)] = null;
                $t1 = Bridge.getEnumerator(this.accessors);
                try {
                    while ($t1.moveNext()) {
                        var item = $t1.Current;
                        this.UpdateAccessorEntity(item, e.id);

                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }},
            HasAllComponents: function (e, typesNecessary) {
                var id = e.id;
                return this.HasAllComps(typesNecessary, id);
            },
            HasAllComps: function (typesNecessary, id) {
                var $t, $t1;
                $t = Bridge.getEnumerator(typesNecessary);
                try {
                    while ($t.moveNext()) {
                        var type = $t.Current;
                        if (!this.comps.containsKey(type)) {
                            return false;
                        }

                        if (($t1 = this.comps.get(type))[System.Array.index(id, $t1)] == null) {
                            return false;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return true;
            },
            HasNoneOfTheseComps: function (typesProhibited, id) {
                var $t, $t1;
                if (typesProhibited == null) {
                    return true;
                }
                $t = Bridge.getEnumerator(typesProhibited);
                try {
                    while ($t.moveNext()) {
                        var type = $t.Current;
                        if (this.comps.containsKey(type)) {
                            if (($t1 = this.comps.get(type))[System.Array.index(id, $t1)] != null) {
                                return false;
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return true;
            },
            GetComponent: function (T, e) {
                var $t;
                var type = T;
                if (!this.comps.containsKey(type)) {
                    //comps.Add(type, new object[300]);
                    return Bridge.getDefaultValue(T);
                }
                return Bridge.cast(($t = this.comps.get(type))[System.Array.index(e.id, $t)], T);
            }
        }
    });

    Bridge.define("Pidroh.ECS.Entity", {
        inherits: function () { return [System.IEquatable$1(Pidroh.ECS.Entity)]; },
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.ECS.Entity(); }
            }
        },
        fields: {
            ecs: 0,
            id: 0
        },
        alias: ["equalsT", "System$IEquatable$1$Pidroh$ECS$Entity$equalsT"],
        ctors: {
            $ctor1: function (ecs, id) {
                this.$initialize();
                this.ecs = ecs;
                this.id = id;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            equalsT: function (other) {
                return other.id === this.id && other.ecs === this.ecs;
            },
            getHashCode: function () {
                var h = Bridge.addHash([1769269177, this.ecs, this.id]);
                return h;
            },
            $clone: function (to) {
                var s = to || new Pidroh.ECS.Entity();
                s.ecs = this.ecs;
                s.id = this.id;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.ECS.ExtensionMethods", {
        statics: {
            methods: {
                RemoveComponent: function (e, comp) {
                    Pidroh.ECS.ECSManager.GetInstance(e).RemoveComponent(e, comp);
                },
                AddComponent: function (T, e) {
                    return Pidroh.ECS.ECSManager.GetInstance(e).AddComponent$1(T, e);
                },
                AddComponent$1: function (e, comp) {
                    Pidroh.ECS.ECSManager.GetInstance(e).AddComponent(e, comp);
                },
                GetComponent: function (T, e) {
                    return Pidroh.ECS.ECSManager.GetInstance(e).GetComponent(T, e);
                }
            }
        }
    });

    Bridge.define("Pidroh.ECS.ProcessorAccessor", {
        fields: {
            p: null,
            a: null
        },
        ctors: {
            ctor: function (p, a) {
                this.$initialize();
                this.p = p;
                this.a = a;
            }
        },
        methods: {
            Run: function () {
                this.p(this.a);
            }
        }
    });

    Bridge.define("Pidroh.ECS.ProcessorFlex$2", function (T1, T2) { return {
        fields: {
            p: null,
            accessor: null
        },
        ctors: {
            ctor: function (p) {
                this.$initialize();
                this.p = p;
                this.accessor = new (Pidroh.ECS.QuickAccessorTwo$2(T1,T2))();
            }
        },
        methods: {
            Run: function () {
                this.p(this.accessor);
            }
        }
    }; });

    Bridge.define("Pidroh.ECS.QuickAccessorOne$1", function (T1) { return {
        fields: {
            accessor: null
        },
        props: {
            Count: {
                get: function () {
                    return this.accessor.Length;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.accessor = new Pidroh.ECS.Accessor([T1]);
            }
        },
        methods: {
            Comp1: function (i) {
                return Pidroh.ECS.ExtensionMethods.GetComponent(T1, this.accessor.SelectedEntities.getItem(i));
            },
            Entity: function (i) {
                return this.accessor.SelectedEntities.getItem(i);
            }
        }
    }; });

    Bridge.define("Pidroh.ECS.QuickAccessorTwo$2", function (T1, T2) { return {
        fields: {
            accessor: null
        },
        props: {
            Length: {
                get: function () {
                    return this.accessor.Length;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.accessor = new Pidroh.ECS.Accessor([T1, T2]);
            }
        },
        methods: {
            Comp1: function (i) {
                return Pidroh.ECS.ExtensionMethods.GetComponent(T1, this.accessor.SelectedEntities.getItem(i));
            },
            Entity: function (i) {
                return this.accessor.SelectedEntities.getItem(i);
            },
            Comp2: function (i) {
                return Pidroh.ECS.ExtensionMethods.GetComponent(T2, this.accessor.SelectedEntities.getItem(i));
            }
        }
    }; });

    Bridge.define("Pidroh.TextRendering.TextAnimation", {
        fields: {
            length: null,
            progress: null,
            targets: null,
            lists: null
        },
        ctors: {
            init: function () {
                this.length = new (System.Collections.Generic.List$1(System.Single)).ctor();
                this.progress = new (System.Collections.Generic.List$1(System.Single)).ctor();
                this.targets = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                this.lists = new (System.Collections.Generic.List$1(System.Collections.IList)).ctor();
            }
        },
        methods: {
            RegisterLists: function () {
                this.lists.add(this.length);
                this.lists.add(this.progress);
                this.lists.add(this.targets);
                this.RequestRegisterLists();
            },
            Update: function (delta) {
                for (var i = 0; i < this.progress.Count; i = (i + 1) | 0) {
                    this.progress.setItem(i, this.progress.getItem(i) +delta);
                    if (this.progress.getItem(i) >= this.length.getItem(i)) {
                        this.progress.setItem(i, this.length.getItem(i));
                    } else {
                        //Execute(i, new BaseData(length[i],progress[i], targets[i]));
                    }
                }
            },
            Add: function (bd) {
                this.progress.add(bd.progress);
                this.targets.add(bd.target);
                this.length.add(bd.length);
            },
            IsDone: function () {
                var $t;
                $t = Bridge.getEnumerator(this.lists);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        if (System.Array.getCount(item) !== this.progress.Count) {
                            var s = null;
                            s.trim();
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return this.progress.Count === 0;
            },
            EndTask: function (i) {
                var $t;
                $t = Bridge.getEnumerator(this.lists);
                try {
                    while ($t.moveNext()) {
                        var l = $t.Current;

                        System.Array.removeAt(l, i, Object);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            RegisterList: function (mainData) {
                this.lists.add(mainData);
            },
            Modify$1: function (a) {
                for (var i = 0; i < this.progress.Count; i = (i + 1) | 0) {
                    if (a.id === this.targets.getItem(i)) {
                        this.Modify(a, i, this.progress.getItem(i), this.length.getItem(i));
                        a.animating = true;
                    }
                }
            },
            Modify: function (entity, index, progress, length) { },
            TryEnd: function () {
                for (var i = 0; i < this.progress.Count; i = (i + 1) | 0) {
                    if (this.progress.getItem(i) >= this.length.getItem(i)) {
                        this.EndTask(i);
                    }
                }

            }
        }
    });

    Bridge.define("Pidroh.TextRendering.DefaultPalettes", {
        statics: {
            fields: {
                C4KiroKaze: null,
                C4Reader: null,
                C4Novel: null,
                C4Black: 0,
                C4BlackNeutral: 0,
                C4WhiteNeutral: 0,
                C4White: 0
            },
            ctors: {
                init: function () {
                    this.C4KiroKaze = new Pidroh.TextRendering.Palette(["#332c50", "#46878f", "#94e344", "#e2f3e4"]);
                    this.C4Reader = new Pidroh.TextRendering.Palette(["#262626", "#8b8cba", "#8bba91", "#649f8d"]);
                    this.C4Novel = new Pidroh.TextRendering.Palette(["#262626", "#342d41", "#b8b8b8", "#8b8cba"]);
                    this.C4Black = 0;
                    this.C4BlackNeutral = 1;
                    this.C4WhiteNeutral = 2;
                    this.C4White = 3;
                }
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.GameScreen.MouseHover", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.TextRendering.GameScreen.MouseHover(); }
            }
        },
        fields: {
            rect: null,
            type: 0,
            id: 0
        },
        ctors: {
            init: function () {
                this.rect = new Pidroh.BaseUtils.Rect();
            },
            $ctor1: function (rect, type, id) {
                this.$initialize();
                this.rect = rect.$clone();
                this.type = type;
                this.id = id;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3924109847, this.rect, this.type, this.id]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.TextRendering.GameScreen.MouseHover)) {
                    return false;
                }
                return Bridge.equals(this.rect, o.rect) && Bridge.equals(this.type, o.type) && Bridge.equals(this.id, o.id);
            },
            $clone: function (to) {
                var s = to || new Pidroh.TextRendering.GameScreen.MouseHover();
                s.rect = this.rect.$clone();
                s.type = this.type;
                s.id = this.id;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.GameScreen.MouseHoverManager", {
        fields: {
            mouseHovers: null,
            mouseHoversActive: null,
            mouseIO: null
        },
        ctors: {
            init: function () {
                this.mouseHovers = new (System.Collections.Generic.List$1(Pidroh.TextRendering.GameScreen.MouseHover)).ctor();
                this.mouseHoversActive = new (System.Collections.Generic.List$1(Pidroh.TextRendering.GameScreen.MouseHover)).ctor();
            },
            ctor: function (mouseIO) {
                this.$initialize();
                this.mouseIO = mouseIO;
            }
        },
        methods: {
            Update: function () {
                var $t;
                this.mouseHoversActive.clear();
                $t = Bridge.getEnumerator(this.mouseHovers);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current.$clone();
                        if (item.rect.Contains(this.mouseIO.pos.$clone())) {
                            this.mouseHoversActive.add(item.$clone());
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }}
        }
    });

    Bridge.define("Pidroh.TextRendering.GameScreen.MouseIO", {
        fields: {
            pos: null
        },
        ctors: {
            init: function () {
                this.pos = new Pidroh.BaseUtils.Point2D();
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.GameScreen.UnicodeRemap", {
        fields: {
            remaps: null
        },
        ctors: {
            init: function () {
                this.remaps = new (System.Collections.Generic.Dictionary$2(System.Int32,System.Int32))();
            },
            ctor: function () {
                this.$initialize();
                this.remaps.add(Pidroh.BaseUtils.Unicode.keyUp, 119);
                this.remaps.add(Pidroh.BaseUtils.Unicode.keyDown, 115);
                this.remaps.add(Pidroh.BaseUtils.Unicode.keyLeft, 97);
                this.remaps.add(Pidroh.BaseUtils.Unicode.keyRight, 100);

                this.remaps.add(105, 49);

            }
        },
        methods: {
            Remap: function (unicode) {
                var result = { };
                if (this.remaps.tryGetValue(unicode, result)) {
                    return result.v;
                }
                return unicode;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.IKeyboardInput", {
        $kind: "interface"
    });

    Bridge.define("Pidroh.TextRendering.IMouseInput", {
        $kind: "interface"
    });

    Bridge.define("Pidroh.TextRendering.ITextGame", {
        $kind: "interface"
    });

    Bridge.define("Pidroh.TextRendering.ITextScreen", {
        $kind: "interface"
    });

    Bridge.define("Pidroh.TextRendering.MouseEvents", {
        $kind: "enum",
        statics: {
            fields: {
                MouseDown: 0,
                None: 1
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.Palette", {
        fields: {
            HtmlColors: null
        },
        ctors: {
            ctor: function (colors) {
                if (colors === void 0) { colors = []; }

                this.$initialize();
                this.HtmlColors = colors;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextAnimation.BaseData", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.TextRendering.TextAnimation.BaseData(); }
            }
        },
        fields: {
            length: 0,
            progress: 0,
            target: 0
        },
        ctors: {
            $ctor1: function (length, progress, target) {
                this.$initialize();
                this.length = length;
                this.progress = progress;
                this.target = target;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3337077382, this.length, this.progress, this.target]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.TextRendering.TextAnimation.BaseData)) {
                    return false;
                }
                return Bridge.equals(this.length, o.length) && Bridge.equals(this.progress, o.progress) && Bridge.equals(this.target, o.target);
            },
            $clone: function (to) {
                var s = to || new Pidroh.TextRendering.TextAnimation.BaseData();
                s.length = this.length;
                s.progress = this.progress;
                s.target = this.target;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextBoard", {
        statics: {
            fields: {
                NOCHANGECHAR: 0,
                INVISIBLECHAR: 0,
                NOCHANGECOLOR: 0,
                INVISIBLECOLOR: 0
            },
            ctors: {
                init: function () {
                    this.NOCHANGECHAR = 1;
                    this.INVISIBLECHAR = 2;
                    this.NOCHANGECOLOR = -2;
                    this.INVISIBLECOLOR = -1;
                }
            }
        },
        fields: {
            chars: null,
            TextColor: null,
            BackColor: null,
            cursorX: 0,
            cursorY: 0,
            Position: null,
            Width: 0,
            Height: 0
        },
        props: {
            CursorX: {
                get: function () {
                    return this.cursorX;
                },
                set: function (value) {
                    this.cursorX = value;
                }
            },
            CursorY: {
                get: function () {
                    return this.cursorY;
                },
                set: function (value) {
                    this.cursorY = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.Position = new Pidroh.BaseUtils.Vector2D();
                this.cursorX = 0;
                this.cursorY = 0;
            },
            ctor: function (width, height) {
                this.$initialize();
                //SetMaxSize(width, height);
                this.Resize(width, height);
            }
        },
        methods: {
            DrawOnCenter: function (message, color, xOff, yOff, alignString) {
                if (xOff === void 0) { xOff = 0; }
                if (yOff === void 0) { yOff = 0; }
                if (alignString === void 0) { alignString = true; }
                var x = (Bridge.Int.div((this.Width), 2)) | 0;
                if (alignString) {
                    x = (x - (((Bridge.Int.div(message.length, 2)) | 0))) | 0;
                }
                var y = (Bridge.Int.div(this.Height, 2)) | 0;
                this.Draw$1(message, ((x + xOff) | 0), ((y + yOff) | 0), color);
            },
            SetMaxSize: function (width, height) {
                this.chars = System.Array.create(0, null, System.Char, width, height);
                this.TextColor = System.Array.create(0, null, System.Int32, width, height);
                this.BackColor = System.Array.create(0, null, System.Int32, width, height);
            },
            Reset: function () {
                this.DrawRepeated(32, 0, 0, this.Width, this.Height, 0, 0);
            },
            ResetInvisible: function () {
                this.DrawRepeated(Pidroh.TextRendering.TextBoard.INVISIBLECHAR, 0, 0, this.Width, this.Height, Pidroh.TextRendering.TextBoard.INVISIBLECOLOR, Pidroh.TextRendering.TextBoard.INVISIBLECOLOR);
            },
            Insert: function (secondBoard) {
                for (var i = 0; i < secondBoard.Width; i = (i + 1) | 0) {
                    for (var j = 0; j < secondBoard.Height; j = (j + 1) | 0) {
                        var x = (Bridge.Int.clip32(secondBoard.Position.X) + i) | 0;
                        var y = (Bridge.Int.clip32(secondBoard.Position.Y) + j) | 0;
                        if (x < 0 || y < 0) {
                            continue;
                        }
                        if (x >= this.Width || y >= this.Height) {
                            continue;
                        }
                        if (secondBoard.chars.get([i, j]) !== Pidroh.TextRendering.TextBoard.INVISIBLECHAR) {
                            this.chars.set([x, y], secondBoard.chars.get([i, j]));
                        }
                        if (secondBoard.TextColor.get([i, j]) !== Pidroh.TextRendering.TextBoard.INVISIBLECOLOR) {
                            this.TextColor.set([x, y], secondBoard.TextColor.get([i, j]));
                        }
                        if (secondBoard.BackColor.get([i, j]) !== Pidroh.TextRendering.TextBoard.INVISIBLECOLOR) {
                            this.BackColor.set([x, y], secondBoard.BackColor.get([i, j]));
                        }
                    }
                }
            },
            DrawRect: function (c, x, y, w, h, textColor, backColor) {
                this.DrawRepeated(c, x, y, 1, h, textColor, backColor);
                this.DrawRepeated(c, ((((x + w) | 0) - 1) | 0), y, 1, h, textColor, backColor);
                this.DrawRepeated(c, x, y, w, 1, textColor, backColor);
                this.DrawRepeated(c, x, ((((y + h) | 0) - 1) | 0), w, 1, textColor, backColor);
            },
            DrawOneDigit: function (i, x, y, color, background) {
                if (color === void 0) { color = -2; }
                if (background === void 0) { background = -2; }
                var c = (((i + 48) | 0)) & 65535;
                this.DrawChar$1(c, x, y, color, background);
            },
            DrawTwoDigits: function (i, x, y, color, background) {
                if (color === void 0) { color = -2; }
                if (background === void 0) { background = -2; }
                this.DrawOneDigit(((Bridge.Int.div(i, 10)) | 0), x, y, color, background);
                this.DrawOneDigit(i % 10, ((x + 1) | 0), y, color, background);
            },
            SameAs: function (textBoard, x, y) {
                return this.chars.get([x, y]) === textBoard.chars.get([x, y]) && this.BackColor.get([x, y]) === textBoard.BackColor.get([x, y]) && this.TextColor.get([x, y]) === textBoard.TextColor.get([x, y]);
            },
            Copy: function (textBoard, x, y) {
                this.chars.set([x, y], textBoard.chars.get([x, y]));
                this.TextColor.set([x, y], textBoard.TextColor.get([x, y]));
                this.BackColor.set([x, y], textBoard.BackColor.get([x, y]));
            },
            Draw_Cursor_UnicodeLabel: function (v, color) {
                var len = this.DrawUnicodeLabel(v, this.cursorX, this.cursorY, color);
                for (var i = 0; i < len; i = (i + 1) | 0) {
                    this.AdvanceCursor();
                }

            },
            DrawUnicodeLabel: function (unicode, x, y, color) {
                if (unicode >= 97 && unicode <= 122) {
                    this.DrawChar$1(((((((unicode + 65) | 0) - 97) | 0)) & 65535), x, y, color);
                    return 1;
                }
                if (unicode >= 48 && unicode <= 57) {
                    this.DrawChar$1((unicode & 65535), x, y, color);
                    return 1;
                }
                var label = "";
                if (unicode === 32) {
                    label = "SPACE";
                }
                this.Draw$1(label, x, y, color);
                return label.length;
            },
            Set: function (origin) {
                this.Position = origin.Position.$clone();
                for (var i = 0; i < this.Width; i = (i + 1) | 0) {
                    for (var j = 0; j < this.Height; j = (j + 1) | 0) {
                        this.chars.set([i, j], origin.chars.get([i, j]));
                        this.BackColor.set([i, j], origin.BackColor.get([i, j]));
                        this.TextColor.set([i, j], origin.TextColor.get([i, j]));
                    }
                }
            },
            Resize: function (w, h) {
                if (this.chars == null || w > System.Array.getLength(this.chars, 0) || h > System.Array.getLength(this.chars, 1)) {
                    this.SetMaxSize(w, h);
                }
                this.Width = w;
                this.Height = h;

            },
            CharAt: function (i, j) {
                return this.chars.get([i, j]);
            },
            SetCursorAt: function (x, y) {
                this.cursorX = x;
                this.cursorY = y;
            },
            Draw_Cursor$2: function (v) {
                var $t;
                $t = Bridge.getEnumerator(v);
                try {
                    while ($t.moveNext()) {
                        var c = $t.Current;
                        this.Draw_Cursor(c);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            Draw_Cursor$3: function (v, color, backColor) {
                var $t;
                if (backColor === void 0) { backColor = -2; }
                $t = Bridge.getEnumerator(v);
                try {
                    while ($t.moveNext()) {
                        var c = $t.Current;
                        this.Draw_Cursor$1(c, color, backColor);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            Draw_Cursor: function (c) {

                this.DrawChar(c, this.cursorX, this.cursorY);
                this.AdvanceCursor();
            },
            Draw_Cursor$1: function (c, color, backColor) {
                if (backColor === void 0) { backColor = -2; }

                this.DrawChar$1(c, this.cursorX, this.cursorY, color, backColor);
                this.AdvanceCursor();
            },
            CanDraw_Cursor_SmartLineBreak: function (v) {
                var currentX = this.cursorX;
                var currentY = this.cursorY;

                for (var i = 0; i < v.length; i = (i + 1) | 0) {
                    var lineBreak = false;
                    var shouldCheckForLineBreaks = (i === 0 || v.charCodeAt(i) === 32) && i !== ((v.length - 1) | 0);
                    if (shouldCheckForLineBreaks) {
                        for (var j = 1; j < ((v.length - i) | 0); j = (j + 1) | 0) {
                            if (((j + currentX) | 0) >= this.Width) {
                                if (v.charCodeAt(i) === 32) {
                                    i = (i + 1) | 0; //skip through the space if it's a new line
                                }
                                lineBreak = true;
                                break;
                            }
                            if (v.charCodeAt(((i + j) | 0)) === 32) {
                                break;
                            }
                        }
                    }
                    if (lineBreak) {
                        currentY = (currentY + 1) | 0;
                        currentX = 0;
                    }
                    currentX = (currentX + 1) | 0;
                    if (currentX >= this.Width) {
                        currentY = (currentY + 1) | 0;
                        currentX = 0;
                    }
                    if (currentX >= this.Width || currentY >= this.Height) {
                        return false;
                    }


                }
                return true;
            },
            Draw_Cursor_SmartLineBreak: function (v, color) {
                var offStart = 0;
                var offEnd = (v.length - 1) | 0;
                return this.Draw_Cursor_SmartLineBreak$1(v, color, offStart, offEnd);
            },
            Draw_Cursor_SmartLineBreak$1: function (v, color, offStart, offEnd) {

                var start = new Pidroh.BaseUtils.Vector2D.$ctor2(this.CursorX, this.CursorY);
                var endIndex = (offEnd + 1) | 0;
                for (var i = offStart; i < endIndex; i = (i + 1) | 0) {
                    var originX = this.cursorX;
                    var lineBreak = false;
                    var shouldCheckForLineBreaks = (i === 0 || v.charCodeAt(i) === 32) && i !== ((endIndex - 1) | 0);
                    if (shouldCheckForLineBreaks) {
                        for (var j = 1; j < ((endIndex - i) | 0); j = (j + 1) | 0) {
                            if (((j + originX) | 0) >= this.Width) {
                                if (v.charCodeAt(i) === 32) {
                                    i = (i + 1) | 0; //skip through the space if it's a new line
                                }
                                lineBreak = true;
                                break;
                            }
                            if (v.charCodeAt(((i + j) | 0)) === 32) {
                                break;
                            }
                        }
                    }
                    if (lineBreak) {
                        this.CursorNewLine(0);
                    }
                    this.Draw_Cursor$1(v.charCodeAt(i), color);
                }
                var end = new Pidroh.BaseUtils.Vector2D.$ctor2(this.CursorX, this.CursorY);
                return new Pidroh.TextRendering.TextBoard.DrawCursorResult.$ctor1(this.PositionToIndex(start.$clone()), this.PositionToIndex(end.$clone()), start.$clone(), end.$clone());
            },
            AutoFixGridding: function () {
                for (var i = 0; i < this.Width; i = (i + 1) | 0) {
                    for (var j = 0; j < this.Height; j = (j + 1) | 0) {
                        if (this.IsGrid(i, j)) {
                            var mask = 0;
                            if (this.IsGrid(((i - 1) | 0), j)) {
                                mask = (mask + 1) | 0;
                            }
                            if (this.IsGrid(((i + 1) | 0), j)) {
                                mask = (mask + 2) | 0;
                            }
                            if (this.IsGrid(i, ((j - 1) | 0))) {
                                mask = (mask + 4) | 0;
                            }
                            if (this.IsGrid(i, ((j + 1) | 0))) {
                                mask = (mask + 8) | 0;
                            }
                            switch (mask) {
                                case 1: 
                                case 2: 
                                case 3: 
                                    this.chars.set([i, j], Pidroh.BaseUtils.Unicode.AsciiGridHor);
                                    break;
                                case 4: 
                                case 8: 
                                case 12: 
                                    this.chars.set([i, j], Pidroh.BaseUtils.Unicode.AsciiGridVer);
                                    break;
                                case 5: 
                                    this.chars.set([i, j], Pidroh.BaseUtils.Unicode.AsciiGridUpLeft);
                                    break;
                                case 6: 
                                    this.chars.set([i, j], Pidroh.BaseUtils.Unicode.AsciiGridUpRight);
                                    break;
                                case 7: 
                                    this.chars.set([i, j], Pidroh.BaseUtils.Unicode.AsciiGridUpRightLeft);
                                    break;
                                case 9: 
                                    this.chars.set([i, j], Pidroh.BaseUtils.Unicode.AsciiGridDownLeft);
                                    break;
                                case 10: 
                                    this.chars.set([i, j], Pidroh.BaseUtils.Unicode.AsciiGridDownRight);
                                    break;
                                case 11: 
                                    this.chars.set([i, j], Pidroh.BaseUtils.Unicode.AsciiGridDownRightLeft);
                                    break;
                                default: 
                                    break;
                            }
                        }


                    }
                }
            },
            IsGrid: function (x, y) {
                var $t;
                if (x < 0 || y < 0 || x >= this.Width || y >= this.Height) {
                    return false;
                }
                var c = this.chars.get([x, y]);
                $t = Bridge.getEnumerator(Pidroh.BaseUtils.Unicode.grids);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        if (c === item) {
                            return true;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return false;
            },
            DrawLines: function (hero, points) {
                if (points === void 0) { points = []; }
                for (var i = 0; i < ((points.length - 1) | 0); i = (i + 1) | 0) {
                    this.DrawLine(points[System.Array.index(i, points)].$clone(), points[System.Array.index(((i + 1) | 0), points)].$clone(), hero);
                }

            },
            DrawLine: function (pos1, pos2, color) {
                var c = Pidroh.BaseUtils.Unicode.AsciiGridHor;
                if (pos1.Y !== pos2.Y) {
                    c = Pidroh.BaseUtils.Unicode.AsciiGridVer;
                }
                var height = (pos2.YInt - pos1.YInt) | 0;
                //if (height <= 0) height = 1;
                var width = (pos2.XInt - pos1.XInt) | 0;
                //if (width <= 0) width = 1;
                this.DrawRepeated(c, pos1.XInt, pos1.YInt, ((width + 1) | 0), ((height + 1) | 0), color);
            },
            PositionToIndex: function (start) {
                return Bridge.Int.clip32(start.X + start.Y * this.Width);
            },
            DrawOneDigit_Cursor: function (i) {
                this.Draw_Cursor(((((i + 48) | 0)) & 65535));
            },
            AdvanceCursor: function () {
                this.cursorX = (this.cursorX + 1) | 0;
                if (this.cursorX >= this.Width) {
                    this.cursorX = 0;
                    this.cursorY = (this.cursorY + 1) | 0;
                }
            },
            CursorNewLine: function (x) {
                this.cursorY = (this.cursorY + 1) | 0;
                this.cursorX = x;
            },
            DrawChar: function (v, x, y) {

                if (v !== Pidroh.TextRendering.TextBoard.NOCHANGECHAR) {
                    this.chars.set([x, y], v);

                }

            },
            DrawChar$1: function (v, x, y, color, backColor) {
                if (backColor === void 0) { backColor = -2; }

                this.DrawChar(v, x, y);
                this.SetColor(color, x, y);
                this.SetBackColor(backColor, x, y);
            },
            SetAll: function (text, textColor, backColor) {
                if (textColor === void 0) { textColor = -2; }
                if (backColor === void 0) { backColor = -2; }
                this.DrawRepeated(text, 0, 0, this.Width, this.Height, textColor, backColor);
            },
            SetAllIfVisible: function (text, textColor, backColor) {
                if (textColor === void 0) { textColor = -2; }
                if (backColor === void 0) { backColor = -2; }
                this.DrawRepeatedIfVisible(text, 0, 0, this.Width, this.Height, textColor, backColor);
            },
            DrawWithGrid: function (text, x, y, gridColor, textColor) {
                var width = text.length;
                this.DrawGrid(x, y, ((width + 2) | 0), 3, gridColor);
                this.Draw$1(text, ((x + 1) | 0), ((y + 1) | 0), textColor);
            },
            Draw$1: function (v, x, y, color, backColor) {
                if (backColor === void 0) { backColor = -2; }
                for (var i = 0; i < v.length; i = (i + 1) | 0) {
                    var x2 = (x + i) | 0;
                    var y2 = y;
                    if (x2 >= this.Width) {
                        x2 = (x2 - this.Width) | 0;
                        y2 = (y2 + 1) | 0;
                    }
                    this.DrawChar$1(v.charCodeAt(i), x2, y2, color, backColor);
                }
            },
            Draw: function (v, x, y, color, backColor) {
                if (backColor === void 0) { backColor = -2; }
                for (var i = 0; i < System.Linq.Enumerable.from(v).count(); i = (i + 1) | 0) {
                    this.DrawChar$1(System.Linq.Enumerable.from(v).elementAt(i), ((x + i) | 0), y, color, backColor);
                }
            },
            Draw$2: function (v, x2, y2, input) {
                throw new System.NotImplementedException.ctor();
            },
            DrawWithLinebreaks: function (v, x, y, newlineX, color, backColor) {
                if (backColor === void 0) { backColor = -2; }
                var linebreaks = 0;
                var xOffsetnewlines = 0;
                for (var i = 0; i < v.length; i = (i + 1) | 0) {
                    var x2 = (((x + i) | 0) + xOffsetnewlines) | 0;
                    var y2 = y;

                    if (x2 >= this.Width) {
                        x2 = (x2 - (((this.Width + newlineX) | 0))) | 0;
                        y2 = (y2 + 1) | 0;
                    }
                    this.DrawChar$1(v.charCodeAt(i), x2, ((y2 + linebreaks) | 0), color, backColor);
                    if (v.charCodeAt(i) === 10) {
                        linebreaks = (linebreaks + 1) | 0;
                        xOffsetnewlines = (xOffsetnewlines + (((((newlineX - x2) | 0) - 1) | 0))) | 0;
                    }
                }
            },
            DrawGrid: function (x, y, width, height, color) {

                this.DrawRepeated(Pidroh.BaseUtils.Unicode.AsciiGridVer, x, y, 1, height, color);
                this.DrawRepeated(Pidroh.BaseUtils.Unicode.AsciiGridVer, ((((x + width) | 0) - 1) | 0), y, 1, height, color);
                this.DrawRepeated(Pidroh.BaseUtils.Unicode.AsciiGridHor, x, y, width, 1, color);
                this.DrawRepeated(Pidroh.BaseUtils.Unicode.AsciiGridHor, x, ((((y + height) | 0) - 1) | 0), width, 1, color);

                this.DrawRepeated(218, x, y, 1, 1, color);
                this.DrawRepeated(192, x, ((((y + height) | 0) - 1) | 0), 1, 1, color);
                this.DrawRepeated(217, ((((x + width) | 0) - 1) | 0), ((((y + height) | 0) - 1) | 0), 1, 1, color);
                this.DrawRepeated(191, ((((x + width) | 0) - 1) | 0), y, 1, 1, color);
            },
            DrawGrid$1: function (v1, v2, v3, v4, board) {
                throw new System.NotImplementedException.ctor();
            },
            DrawRepeated: function (c, x, y, width, height, color, backColor) {
                if (backColor === void 0) { backColor = -2; }
                for (var i = x; i < ((x + width) | 0); i = (i + 1) | 0) {
                    for (var j = y; j < ((y + height) | 0); j = (j + 1) | 0) {
                        this.DrawChar$1(c, i, j, color);

                        this.SetBackColor(backColor, i, j);
                    }
                }
            },
            DrawRepeatedIfVisible: function (c, x, y, width, height, color, backColor) {
                if (backColor === void 0) { backColor = -2; }
                for (var i = x; i < ((x + width) | 0); i = (i + 1) | 0) {
                    for (var j = y; j < ((y + height) | 0); j = (j + 1) | 0) {
                        if (this.chars.get([i, j]) !== Pidroh.TextRendering.TextBoard.INVISIBLECHAR || this.TextColor.get([i, j]) !== Pidroh.TextRendering.TextBoard.INVISIBLECOLOR) {
                            this.DrawChar$1(c, i, j, color);
                        }
                        if (this.BackColor.get([i, j]) !== Pidroh.TextRendering.TextBoard.INVISIBLECOLOR) {
                            this.SetBackColor(backColor, i, j);
                        }
                    }
                }
            },
            SetColor: function (color, x, y) {
                if (color !== Pidroh.TextRendering.TextBoard.NOCHANGECOLOR) {
                    this.TextColor.set([x, y], color);
                }
            },
            SetBackColor: function (color, x, y) {
                if (color !== Pidroh.TextRendering.TextBoard.NOCHANGECOLOR) {
                    this.BackColor.set([x, y], color);
                }
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextBoard.DrawCursorResult", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.TextRendering.TextBoard.DrawCursorResult(); }
            }
        },
        fields: {
            StartIndex: 0,
            EndIndex: 0,
            StartPosition: null,
            EndPosition: null
        },
        ctors: {
            init: function () {
                this.StartPosition = new Pidroh.BaseUtils.Vector2D();
                this.EndPosition = new Pidroh.BaseUtils.Vector2D();
            },
            $ctor1: function (startIndex, endIndex, startPosition, endPosition) {
                this.$initialize();
                this.StartIndex = startIndex;
                this.EndIndex = endIndex;
                this.StartPosition = startPosition.$clone();
                this.EndPosition = endPosition.$clone();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([7592922985, this.StartIndex, this.EndIndex, this.StartPosition, this.EndPosition]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.TextRendering.TextBoard.DrawCursorResult)) {
                    return false;
                }
                return Bridge.equals(this.StartIndex, o.StartIndex) && Bridge.equals(this.EndIndex, o.EndIndex) && Bridge.equals(this.StartPosition, o.StartPosition) && Bridge.equals(this.EndPosition, o.EndPosition);
            },
            $clone: function (to) {
                var s = to || new Pidroh.TextRendering.TextBoard.DrawCursorResult();
                s.StartIndex = this.StartIndex;
                s.EndIndex = this.EndIndex;
                s.StartPosition = this.StartPosition.$clone();
                s.EndPosition = this.EndPosition.$clone();
                return s;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextEntity", {
        fields: {
            id: 0,
            Origin: null,
            Animation: null,
            freeIfIdle: false,
            animating: false
        },
        props: {
            Height: {
                get: function () {
                    return this.Origin.Height;
                }
            },
            Width: {
                get: function () {
                    return this.Origin.Width;
                }
            }
        },
        ctors: {
            init: function () {
                this.freeIfIdle = false;
            }
        },
        methods: {
            AnimBase: function (length) {
                return new Pidroh.TextRendering.TextAnimation.BaseData.$ctor1(length, 0, this.id);
            },
            GetPosition: function () {
                return this.Origin.Position.$clone();
            },
            ResetAnimation: function () {
                this.animating = false;
                this.Animation.Set(this.Origin);
            },
            ResetFull: function () {
                this.Origin.ResetInvisible();
            },
            SetPosition$1: function (x, y) {
                this.Origin.Position = new Pidroh.BaseUtils.Vector2D.$ctor2(x, y);
            },
            SetPosition: function (vector2D) {
                this.Origin.Position = vector2D.$clone();
            },
            SetSize: function (w, h) {
                if (this.Origin == null) {
                    this.Origin = new Pidroh.TextRendering.TextBoard(w, h);
                    this.Animation = new Pidroh.TextRendering.TextBoard(w, h);
                }
                this.Origin.Resize(w, h);
                this.Animation.Resize(w, h);

            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextScreenHolder", {
        fields: {
            Screen: null,
            Mouse: null,
            Key: null
        },
        methods: {
            SetAll: function (dns) {
                this.Screen = Bridge.as(dns, Pidroh.TextRendering.ITextScreen);
                this.Mouse = Bridge.as(dns, Pidroh.TextRendering.IMouseInput);
                this.Key = Bridge.as(dns, Pidroh.TextRendering.IKeyboardInput);
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextWorld", {
        fields: {
            palette: null,
            activeAgents: null,
            freeBoards: null,
            animations: null,
            mainBoard: null,
            latestId: 0
        },
        ctors: {
            init: function () {
                this.palette = Pidroh.TextRendering.DefaultPalettes.C4KiroKaze;
                this.activeAgents = new (System.Collections.Generic.List$1(Pidroh.TextRendering.TextEntity)).ctor();
                this.freeBoards = new (System.Collections.Generic.List$1(Pidroh.TextRendering.TextEntity)).ctor();
                this.animations = new (System.Collections.Generic.List$1(Pidroh.TextRendering.TextAnimation)).ctor();
                this.latestId = -1;
            }
        },
        methods: {
            AddAnimation: function (T, ta) {
                this.animations.add(ta);
                ta.RegisterLists();
                return ta;
            },
            Init: function (width, height) {
                this.mainBoard = new Pidroh.TextRendering.TextBoard(width, height);

            },
            Draw: function () {
                this.mainBoard.Reset();
                this.DrawChildren();
            },
            DrawChildren: function () {
                var $t;
                for (var i = 0; i < this.activeAgents.Count; i = (i + 1) | 0) {
                    this.activeAgents.getItem(i).ResetAnimation();
                    $t = Bridge.getEnumerator(this.animations);
                    try {
                        while ($t.moveNext()) {
                            var anim = $t.Current;
                            anim.Modify$1(this.activeAgents.getItem(i));
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }if (this.activeAgents.getItem(i).freeIfIdle && !this.activeAgents.getItem(i).animating) {
                        this.freeBoards.add(this.activeAgents.getItem(i));
                        this.activeAgents.remove(this.activeAgents.getItem(i));
                        i = (i - 1) | 0;
                    } else {
                        this.mainBoard.Insert(this.activeAgents.getItem(i).Animation);
                    }

                }
            },
            GetFreeEntity: function (w, h) {
                var te;
                if (this.freeBoards.Count > 0) {
                    te = this.freeBoards.getItem(((this.freeBoards.Count - 1) | 0));
                    this.freeBoards.removeAt(((this.freeBoards.Count - 1) | 0));
                } else {
                    te = new Pidroh.TextRendering.TextEntity();
                    te.id = ((this.latestId = (this.latestId + 1) | 0));

                }

                this.activeAgents.add(te);
                te.freeIfIdle = false;
                te.SetSize(w, h);
                te.ResetFull();
                return te;
            },
            GetTempEntity: function (w, h) {
                var te = this.GetFreeEntity(w, h);
                te.freeIfIdle = true;
                return te;
            },
            AdvanceTime: function (v) {
                var $t;
                $t = Bridge.getEnumerator(this.animations);
                try {
                    while ($t.moveNext()) {
                        var anim = $t.Current;
                        anim.Update(v);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            TryEndAnimations: function () {
                var $t;
                $t = Bridge.getEnumerator(this.animations);
                try {
                    while ($t.moveNext()) {
                        var anim = $t.Current;
                        anim.TryEnd();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            IsDone: function () {
                var $t;
                $t = Bridge.getEnumerator(this.animations);
                try {
                    while ($t.moveNext()) {
                        var anim = $t.Current;
                        if (!anim.IsDone()) {
                            return false;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return true;
            }
        }
    });

    Bridge.define("Pidroh.TurnBased.TextRendering.HappHandling", {
        fields: {
            battleRender: null,
            ecs: null,
            Handle: null,
            handlers: null,
            happs: null,
            handleState: null
        },
        props: {
            highestHandled: {
                get: function () {
                    return this.handleState.highestHandled;
                },
                set: function (value) {
                    this.handleState.highestHandled = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.handlers = new (System.Collections.Generic.List$1(Pidroh.TurnBased.TextRendering.HappHandling.HappHandler)).ctor();
                this.handleState = new Pidroh.TurnBased.TextRendering.HappHandling.HappHandleState();
            },
            ctor: function (battleRender, battleSetup) {
                this.$initialize();
                this.battleRender = battleRender;
                var world = battleRender.textWorld;
                var posAnim = world.AddAnimation(Bridge.global.Pidroh.TextRendering.PositionAnimation, new Pidroh.TextRendering.PositionAnimation());
                var blinkAnim = world.AddAnimation(Bridge.global.Pidroh.TextRendering.BlinkAnim, new Pidroh.TextRendering.BlinkAnim());
                var delayAnim = world.AddAnimation(Bridge.global.Pidroh.TextRendering.DelaysAnimation, new Pidroh.TextRendering.DelaysAnimation());
                this.ecs = battleSetup.ecs;
                this.ecs.CreateEntityWithComponent(this.handleState);
                var battleMain = battleSetup.battleMain;
                var time = battleSetup.timeStamp;
                battleRender.HappHandling = this;
                this.happs = this.ecs.QuickAccessor2(Pidroh.ConsoleApp.Turnbased.HappTags, Pidroh.BaseUtils.TimeStampSnap);
                this.highestHandled = -1;


                this.handlers.add(new Pidroh.TurnBased.TextRendering.HappHandling.HappHandler(function (e) {



                    var damage = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.HappDamageData, e);




                    var message;
                    if (damage.elementalBlock) {

                        {
                            var text = (System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.Element, damage.damageE).toUpperCase() || "") + " BLOCK " + (System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.Element, damage.targetE).toUpperCase() || "");
                            var message2 = battleRender.textWorld.GetTempEntity(text.length, 1);
                            var colorE = Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToProjColor(damage.damageE);
                            message2.Origin.Draw$1(text, 0, 0, colorE);

                            blinkAnim.Add$1(message2.AnimBase(0.6), Pidroh.TextRendering.BlinkAnim.BlinkData.FrontColor(colorE, 0.2));
                            var offset = Bridge.Int.clip32(Math.floor(((-text.length) | 0) / 2.0));
                            message2.SetPosition(Pidroh.BaseUtils.Vector2D.op_Addition(battleRender.battlerRenders.getItem(damage.target).GetPosition(), new Pidroh.BaseUtils.Vector2D.$ctor2(((1 + offset) | 0), -3)));
                            delayAnim.Delay(0.65);
                        }
                        {
                            var pos = battleRender.BattleEntityToScreenPosition(battleMain.entities.getItem(damage.target).pos.$clone());
                            var blast = battleRender.textWorld.GetTempEntity(5, 5);
                            blast.SetPosition(Pidroh.BaseUtils.Vector2D.op_Addition(pos.$clone(), new Pidroh.BaseUtils.Vector2D.$ctor2(-2, -2)));

                            blast.Origin.DrawRect(32, 0, 0, 5, 5, Pidroh.TextRendering.TextBoard.INVISIBLECOLOR, Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToProjColor(damage.damageE));
                            //blast.Origin.DrawRepeated(' ', 1, 1, 3, 3, TextBoard.INVISIBLECOLOR, BattleRender.ElementToProjColor(damage.damageE));
                            blinkAnim.Add$1(blast.AnimBase(0.2), Pidroh.TextRendering.BlinkAnim.BlinkData.BackColor(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey, 0.05, false));
                        }
                        message = System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.Element, damage.damageE) + " absorbs " + System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.Element, damage.targetE) + "\n";
                        message = (message || "") + (((battleRender.GetEntityName(damage.target) || "") + " is unafectted.") || "");
                    } else {

                        //message = battleRender.GetEntityName(damage.target) + " gets hit!";
                        if (damage.superEffective) {

                            {
                                var text1 = (System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.Element, damage.damageE).toUpperCase() || "") + " BREAK " + (System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.Element, damage.targetE).toUpperCase() || "");
                                var message21 = battleRender.textWorld.GetTempEntity(text1.length, 1);
                                var colorE1 = Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToProjColor(damage.damageE);
                                message21.Origin.Draw$1(text1, 0, 0, colorE1);

                                blinkAnim.Add$1(message21.AnimBase(0.45), Pidroh.TextRendering.BlinkAnim.BlinkData.FrontColor(colorE1, 0.2));
                                var offset1 = Bridge.Int.clip32(Math.floor(((-text1.length) | 0) / 2.0));
                                message21.SetPosition(Pidroh.BaseUtils.Vector2D.op_Addition(battleRender.battlerRenders.getItem(damage.target).GetPosition(), new Pidroh.BaseUtils.Vector2D.$ctor2(((1 + offset1) | 0), -2)));
                                delayAnim.Delay(0.65);
                            }

                            message = null;
                            //message = damage.damageE + " ravages " + damage.targetE + "\n";
                            //message += battleRender.GetEntityName(damage.target)+" takes a heavy hit!";
                            {
                                var pos1 = battleRender.BattleEntityToScreenPosition(battleMain.entities.getItem(damage.target).pos.$clone());
                                var blast1 = battleRender.textWorld.GetTempEntity(5, 5);
                                blast1.SetPosition(Pidroh.BaseUtils.Vector2D.op_Addition(pos1.$clone(), new Pidroh.BaseUtils.Vector2D.$ctor2(-2, -2)));

                                blast1.Origin.DrawRepeated(32, 1, 1, 3, 3, Pidroh.TextRendering.TextBoard.INVISIBLECOLOR, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Enemy);
                                blinkAnim.Add$1(blast1.AnimBase(0.2), Pidroh.TextRendering.BlinkAnim.BlinkData.BackColor(Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToProjColor(damage.damageE), 0.05));
                            }
                        } else {
                            //message = battleRender.GetEntityName(damage.target) + " gets hurt";
                            message = null;
                        }
                    }


                    if (message != null) {
                        battleRender.ShowMessage(message);
                    }

                    var defender = battleRender.battlerRenders.getItem(damage.target);

                    //var fe = battleRender.textWorld.GetTempEntity(defender.Width, defender.Height);
                    if (!damage.superEffective && !damage.elementalBlock && battleMain.entities.getItem(damage.target).Alive) {
                        var fe = battleRender.textWorld.GetTempEntity(3, 3);
                        var backColor = Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToProjColor(damage.damageE);
                        backColor = 0;
                        var xColor = Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToProjColor(damage.damageE);
                        var damageChar = 88;
                        fe.Origin.DrawChar$1(damageChar, 1, 0, xColor, backColor);
                        fe.Origin.DrawChar$1(damageChar, 1, 1, xColor, backColor);
                        fe.Origin.DrawChar$1(damageChar, 1, 2, xColor, backColor);
                        fe.Origin.DrawChar$1(damageChar, 0, 1, xColor, backColor);
                        fe.Origin.DrawChar$1(damageChar, 2, 1, xColor, backColor);
                        //fe.Origin.DrawChar(TextBoard.NOCHANGECHAR, 0, 0);
                        fe.Origin.Position = Pidroh.BaseUtils.Vector2D.op_Addition(defender.GetPosition(), new Pidroh.BaseUtils.Vector2D.$ctor2(-1, -1));

                        blinkAnim.Add$1(fe.AnimBase(0.35), Pidroh.TextRendering.BlinkAnim.BlinkData.Char(90, 0.05));
                        //blinkAnim.Add(fe.AnimBase(0.35f), BlinkAnim.BlinkData.BackColor(BattleRender.Colors.Hero, 0.05f));
                    }

                    //Console.Write("CHANGE ELE");

                }, [Pidroh.ConsoleApp.Turnbased.MiscHappTags.Damage]));
                this.handlers.add(new Pidroh.TurnBased.TextRendering.HappHandling.HappHandler(function (e) {
                    var hmd = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.HappMoveData, e);


                    var text = System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.Element, hmd.element);
                    var message = battleRender.textWorld.GetTempEntity(text.length, 1);
                    message.Origin.Draw$1(text, 0, 0, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero);
                    blinkAnim.Add$1(message.AnimBase(0.5), Pidroh.TextRendering.BlinkAnim.BlinkData.FrontColor(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.InputDescription, 0.15));
                    var offset = Bridge.Int.clip32(Math.floor(((-text.length) | 0) / 2.0));
                    message.SetPosition(Pidroh.BaseUtils.Vector2D.op_Addition(battleRender.battlerRenders.getItem(hmd.user).GetPosition(), new Pidroh.BaseUtils.Vector2D.$ctor2(((1 + offset) | 0), -1)));

                }, [Pidroh.ConsoleApp.Turnbased.MiscHappTags.ChangeElement]));
                this.handlers.add(new Pidroh.TurnBased.TextRendering.HappHandling.HappHandler(function (e) {
                    var hmd = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.HappMoveData, e);
                    //var defender = battleRender.battlerRenders[hmd.target];
                    var pos = battleRender.BattleEntityToScreenPosition(battleMain.entities.getItem(hmd.user).pos.$clone());
                    var blast = battleRender.textWorld.GetTempEntity(3, 3);
                    blast.SetPosition(Pidroh.BaseUtils.Vector2D.op_Addition(pos.$clone(), new Pidroh.BaseUtils.Vector2D.$ctor2(-1, -1)));

                    blast.Origin.DrawRepeated(32, 1, 1, 1, 1, Pidroh.TextRendering.TextBoard.INVISIBLECOLOR, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Enemy);
                    blinkAnim.Add$1(blast.AnimBase(0.2), Pidroh.TextRendering.BlinkAnim.BlinkData.BackColor(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero, 0.05));
                    //delayAnim.Delay(5);
                    //Console.Write("DEATH");
                    //Console.Write("CHANGE ELE");

                }, [Pidroh.ConsoleApp.Turnbased.MiscHappTags.Death]));
                var moveMiss = function (e) {
                    //Console.WriteLine("HANDLE!3");
                    var hmd = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.HappMoveData, e);
                    var hmf = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.HappMovementFail, e);
                    var eId = hmd.user;
                    var mover = battleMain.entities.getItem(eId);

                    var pos = mover.PositionV2D.$clone();
                    var pos2 = hmf.moveTo.$clone();
                    var posF = Pidroh.BaseUtils.Vector2D.op_Division$1((Pidroh.BaseUtils.Vector2D.op_Addition(pos.$clone(), pos2.$clone())), 2);

                    var fe = battleRender.battlerRenders.getItem(eId);
                    //Console.WriteLine("Move fail");
                    posAnim.Add$1(fe.AnimBase(0.2), new Pidroh.TextRendering.PositionAnimation.PositionData.$ctor1(battleRender.BattleEntityToScreenPosition(mover.PositionV2D.$clone()), battleRender.BattleEntityToScreenPosition(posF.$clone())));
                };
                this.handlers.add(new Pidroh.TurnBased.TextRendering.HappHandling.HappHandler(moveMiss, [Pidroh.ConsoleApp.Turnbased.MoveDataTags.Movement]));

                this.handlers.add(new Pidroh.TurnBased.TextRendering.HappHandling.HappHandler(function (e) {
                    var $t;
                    var ha = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.HappArea, e);
                    var hmd = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.HappMoveData, e);
                    var eId = hmd.user;
                    var mover = battleMain.entities.getItem(eId);
                    //var userRender = battleRender.battlerEntities[eId];
                    var area = ha.area;
                    var points = area.points;

                    var useEffect = world.GetTempEntity(1, 1);
                    useEffect.SetPosition(battleRender.BattleEntityToScreenPosition(mover.pos.$clone()));
                    blinkAnim.Add$1(useEffect.AnimBase(0.5), Pidroh.TextRendering.BlinkAnim.BlinkData.BackColor(Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToProjColor(hmd.element), 0.15));
                    $t = Bridge.getEnumerator(points);
                    try {
                        while ($t.moveNext()) {
                            var item = $t.Current.$clone();
                            var entity = world.GetTempEntity(1, 1);
                            var finalPos = Pidroh.BaseUtils.Vector2D.op_Addition(Pidroh.BaseUtils.Vector2D.op_Multiply(item.$clone(), new Pidroh.BaseUtils.Vector2D.$ctor2(ha.mirroringX, 1)), ha.offset.$clone());
                            if (finalPos.X < 0) {
                                continue;
                            }
                            if (finalPos.Y < 0) {
                                continue;
                            }
                            if (finalPos.X > 5) {
                                continue;
                            }
                            if (finalPos.Y > 2) {
                                continue;
                            }
                            //Console.Write(finalPos.XInt);
                            //Console.Write(finalPos.YInt);
                            var pos = battleRender.BattleEntityToScreenPosition(finalPos.$clone());
                            entity.SetPosition$1(pos.XInt, pos.YInt);
                            blinkAnim.Add$1(entity.AnimBase(0.5), Pidroh.TextRendering.BlinkAnim.BlinkData.BackColor(Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToProjColor(hmd.element), 0.15));
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }}, [Pidroh.ConsoleApp.Turnbased.MoveDataTags.Bomb]));
                this.Handle = Bridge.fn.bind(this, function () {
                    var $t;
                    //Console.WriteLine("HANDLE!");
                    var newHighestHandled = this.highestHandled;
                    for (var i = 0; i < this.happs.Length; i = (i + 1) | 0) {
                        //Console.Write("ADV"+battleRender.CanAdvanceGraphics());
                        if (!battleRender.CanAdvanceGraphics()) {
                            break;
                        }
                        var tags = this.happs.Comp1(i);
                        //if (happs.Comp2(i).TimeSnap > highestHandled)
                        if (i > this.highestHandled) {
                            //newHighestHandled = happs.Comp2(i).TimeSnap;
                            newHighestHandled = i;
                            //Console.WriteLine("HANDLE!");
                            $t = Bridge.getEnumerator(this.handlers);
                            try {
                                while ($t.moveNext()) {
                                    var han = $t.Current;
                                    //Console.WriteLine("HANDLE!x");
                                    if (han.CanHandle(tags.tags)) {
                                        //Console.WriteLine(happs.Comp2(i).TimeSnap + " - " + time.CurrentSnap);
                                        //Console.WriteLine("HANDLE!2");
                                        han.Handler(this.happs.Entity(i));
                                    }
                                }
                            } finally {
                                if (Bridge.is($t, System.IDisposable)) {
                                    $t.System$IDisposable$Dispose();
                                }
                            }} else {
                            //Console.WriteLine(happs.Comp2(i).TimeSnap+" - "+ time.CurrentSnap);
                        }
                    }
                    this.highestHandled = newHighestHandled;
                });

            }
        },
        methods: {
            IsDone: function () {
                return this.highestHandled >= ((this.happs.Length - 1) | 0);
            }
        }
    });

    Bridge.define("Pidroh.TurnBased.TextRendering.HappHandling.HappHandler", {
        $kind: "nested class",
        fields: {
            necessaryTags: null,
            Handler: null
        },
        ctors: {
            init: function () {
                this.necessaryTags = new (System.Collections.Generic.List$1(System.Int32)).ctor();
            },
            ctor: function (handler, tags) {
                if (tags === void 0) { tags = []; }
                var $t;

                this.$initialize();
                $t = Bridge.getEnumerator(tags);
                try {
                    while ($t.moveNext()) {
                        var t = $t.Current;
                        this.necessaryTags.add(System.Convert.toInt32(t));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }this.Handler = handler;
            }
        },
        methods: {
            CanHandle: function (tags) {
                var $t;
                $t = Bridge.getEnumerator(this.necessaryTags);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        if (!tags.contains(item)) {
                            return false;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return true;
            }
        }
    });

    Bridge.define("Pidroh.TurnBased.TextRendering.HappHandling.HappHandleState", {
        $kind: "nested class",
        fields: {
            highestHandled: 0
        }
    });

    Bridge.define("Pidroh.TurnBased.TextRendering.InputHandling", {
        fields: {
            unfixedCommandKeys: null,
            fixedMoveButtons: null
        },
        ctors: {
            init: function () {
                this.unfixedCommandKeys = System.Array.init([
                    49, 
                    50, 
                    51, 
                    52
                ], System.Int32);
                this.fixedMoveButtons = function (_o1) {
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot), 103);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire), 102);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice), 105);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb), 98);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb), 121);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder), 116);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight), 100);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp), 119);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown), 115);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft), 97);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done), Pidroh.BaseUtils.Unicode.Space);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo), 114);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Preview), 112);
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(Pidroh.ConsoleApp.Turnbased.Input,System.Int32))());
            }
        },
        methods: {
            GetFixedMoveUnicode: function (input) {
                var value = { };
                if (this.fixedMoveButtons.tryGetValue(input, value)) {

                } else {
                    value.v = -1;
                }
                return value.v;
            },
            PickingHand: function (unicodeKey, input) {
                var $t;
                //Console.WriteLine(" input + "+(char)unicodeKey);
                $t = Bridge.getEnumerator(this.fixedMoveButtons);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        if (item.value === unicodeKey) {
                            return item.key;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }for (var i = 0; i < this.unfixedCommandKeys.length; i = (i + 1) | 0) {
                    if (this.unfixedCommandKeys[System.Array.index(i, this.unfixedCommandKeys)] === unicodeKey) {
                        var unfixedCommandPos = 0;
                        for (var i2 = 0; i2 < input.inputs.Count; i2 = (i2 + 1) | 0) {
                            if (input.TagIs(i2, Pidroh.ConsoleApp.Turnbased.InputTags.MOVEUNFIX)) {
                                if (unfixedCommandPos === i) {
                                    return input.inputs.getItem(i2);
                                }
                                unfixedCommandPos = (unfixedCommandPos + 1) | 0;
                            }
                        }
                    }
                }
                return Bridge.getDefaultValue(Pidroh.ConsoleApp.Turnbased.Input);
            }
        }
    });

    Bridge.define("Pidroh.TurnBased.TextRendering.MessageOnPosition", {
        fields: {
            battleRender: null,
            textWorld: null,
            blinkAnim: null
        },
        ctors: {
            ctor: function (battleRender) {
                this.$initialize();
                this.textWorld = battleRender.textWorld;
                this.blinkAnim = this.textWorld.AddAnimation(Bridge.global.Pidroh.TextRendering.BlinkAnim, new Pidroh.TextRendering.BlinkAnim());
            }
        },
        methods: {
            MessageOnPos: function (pos, v) {
                var entity = this.textWorld.GetTempEntity(((v.length + 2) | 0), 6);
                this.blinkAnim.Add$1(entity.AnimBase(2.0), new Pidroh.TextRendering.BlinkAnim.BlinkData.$ctor1(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, 0.35, 0.35));
                var xOff = (Bridge.Int.div((((v.length - 3) | 0)), 2)) | 0;
                if (xOff < 0) {
                    xOff = 0;
                }
                var lineStart = new Pidroh.BaseUtils.Vector2D.$ctor2(xOff, 0);
                entity.SetPosition(Pidroh.BaseUtils.Vector2D.op_Addition(pos.$clone(), new Pidroh.BaseUtils.Vector2D.$ctor2(((1 - xOff) | 0), 0)));
                System.Console.Write(pos.$clone());
                //entity.Origin.Draw(v, 1, 5);
                entity.Origin.DrawWithGrid(v, 0, 3, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero);

                entity.Origin.DrawLines(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero, [lineStart.$clone(), Pidroh.BaseUtils.Vector2D.op_Addition(lineStart.$clone(), new Pidroh.BaseUtils.Vector2D.$ctor2(2, 0)), Pidroh.BaseUtils.Vector2D.op_Addition(lineStart.$clone(), new Pidroh.BaseUtils.Vector2D.$ctor2(2, 2))]);
                entity.Origin.AutoFixGridding();
            }
        }
    });

    Bridge.define("Pidroh.TurnBased.TextRendering.MouseHoverText", {
        fields: {
            texts: null,
            hoverManager: null,
            entity: null
        },
        ctors: {
            init: function () {
                this.texts = System.Array.init(2, null, System.Array.type(System.String));
            },
            ctor: function (hoverManager, entity) {
                this.$initialize();
                this.hoverManager = hoverManager;
                this.entity = entity;
                //texts[0] = new string[Enum.GetValues(typeof(BattleMain.MoveType)).Length];
                this.texts[System.Array.index(0, this.texts)] = System.Array.init(["", "Move up", "Move left", "Move down", "Move right", "Shoots forward", "Shoots fire forward", "Shoots ice forward", "Shoots thunder forward", "Throws ice bomb three squares forward", "Throws thunder bomb three squares forward", "Summons another enemy", ""], System.String);

            }
        },
        methods: {
            Update: function () {
                var $t;
                this.entity.ResetFull();
                this.hoverManager.Update();
                var active = this.hoverManager.mouseHoversActive;
                if (active.Count > 0) {
                    var id = active.getItem(0).$clone().id;
                    if (id >= 0) {
                        var text = ($t = this.texts[System.Array.index(active.getItem(0).$clone().type, this.texts)])[System.Array.index(id, $t)];
                        this.entity.Origin.Draw$1(text, 0, 0, 2);
                        var x = (((active.getItem(0).$clone().rect.X + 1) | 0) - ((Bridge.Int.div(text.length, 2)) | 0)) | 0;
                        this.entity.SetPosition$1(x, ((active.getItem(0).$clone().rect.Y + 2) | 0));
                    }


                }
            }
        }
    });

    Bridge.define("Pidroh.TurnBased.TextRendering.PreviewSystem", {
        fields: {
            ecs: null,
            battleMain: null,
            previewActive: false,
            clonedState: null,
            battleEntity: null,
            debug: null
        },
        ctors: {
            init: function () {
                this.debug = new Pidroh.BaseUtils.Debugger(true);
            },
            ctor: function (ecs, battleMain) {
                this.$initialize();
                this.ecs = ecs;
                this.battleMain = battleMain;
                this.clonedState = new Pidroh.ECS.ClonedState();
                this.battleEntity = ecs.QuickAccessor1(Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity);
            }
        },
        methods: {
            StartPreview: function () {
                var $t, $t1;
                $t = Bridge.getEnumerator(this.battleMain.entities);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        this.debug.Print$1("ALL ENTITIES BEFORE PREVIEW");
                        this.debug.Print(item);
                        this.debug.Print$1(System.Boolean.toString(item.randomPosition) + " RANDOM POS");
                        this.debug.Print$1(System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType, item.Type) + " type");
                        this.debug.Print$1(System.Boolean.toString(item.drawTurn) + " draw turn");
                        this.debug.Print$1("END");
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }this.ecs.CloneState(this.clonedState);
                this.battleMain.battleState.BattleEndActive = false;
                this.previewActive = true;

                $t1 = Bridge.getEnumerator(this.battleMain.entities);
                try {
                    while ($t1.moveNext()) {
                        var item1 = $t1.Current;
                        if (item1.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.hero) {
                            item1.life = 0;
                            for (var i = 0; i < item1.moves.length; i = (i + 1) | 0) {
                                item1.moves[System.Array.index(i, item1.moves)] = -1;
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }this.battleMain.Tick();

            },
            EndPreview: function () {
                var $t;
                //Console.Write("End preview");
                //   Console.ReadKey();
                this.previewActive = false;
                System.Console.WriteLine(System.Boolean.toString(this.battleMain.entities.contains(this.battleEntity.Comp1(0))) + "XXXS");

                this.ecs.RestoreState(this.clonedState);
                this.battleMain.battleState.phase = Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands;

                $t = Bridge.getEnumerator(this.battleMain.entities);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        this.debug.Print$1("ALL ENTITIES AFTER PREVIEW");
                        this.debug.Print(item);
                        this.debug.Print$1(System.Boolean.toString(item.randomPosition) + " RANDOM POS");
                        this.debug.Print$1(System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType, item.Type) + " type");
                        this.debug.Print$1(System.Boolean.toString(item.drawTurn) + " draw turn");
                        this.debug.Print$1("END");
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }}
        }
    });

    Bridge.define("Pidroh.TurnBased.TextRendering.ReflectionTest", {
        ctors: {
            ctor: function () {
                this.$initialize();
                var debug = new Pidroh.BaseUtils.Debugger(true);

                var be = new Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity();
                var type = Bridge.getType(be);
                var be2 = new Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity();
                be2.randomPosition = true;
                debug.Print$1(Bridge.toString(Bridge.Reflection.fieldAccess(Bridge.Reflection.getMembers(type, 4, 284, "randomPosition"), be2)));
                debug.Print$1(System.Boolean.toString(be2.randomPosition) + "");
                debug.Print(be);
                Pidroh.BaseUtils.DeepCloneHelper.DeepCopyPartial(be, be2);
                Pidroh.BaseUtils.DeepCloneHelper.DeepCopyPartial(be2, be);
                debug.Print(be);
                debug.Print(be2);


                debug.Print$1(Bridge.toString(Bridge.Reflection.fieldAccess(Bridge.Reflection.getMembers(type, 4, 284, "randomPosition"), be2)));
                debug.Print$1(System.Boolean.toString(be2.randomPosition) + "");

            }
        }
    });

    Bridge.define("Pidroh.TurnBased.TextRendering.ScreenUtils");

    Bridge.define("Pidroh.ConsoleApp.Turnbased.AsyncTaskSetter$1", function (T) { return {
        inherits: [Pidroh.ConsoleApp.Turnbased.DelayedActions],
        fields: {
            ToValue: null,
            setters: null
        },
        ctors: {
            init: function () {
                this.ToValue = new (System.Collections.Generic.List$1(T)).ctor();
                this.setters = new (System.Collections.Generic.List$1(Function)).ctor();
            }
        },
        methods: {
            Add$1: function (e, setter, time) {
                this.ToValue.add(e);
                this.setters.add(setter);
                this.Add(time);
            },
            Execute: function (i) {
                this.setters.getItem(i)(this.ToValue.getItem(i));
                this.ToValue.removeAt(i);
                this.setters.removeAt(i);

            }
        }
    }; });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleRender", {
        inherits: [Pidroh.ConsoleApp.Turnbased.ITextScreen_],
        statics: {
            methods: {
                ElementToAuraColor: function (element) {
                    var bc = Pidroh.TextRendering.TextBoard.INVISIBLECOLOR;
                    if (element === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire) {
                        bc = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.FireAura;
                    }
                    if (element === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice) {
                        bc = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.IceAura;
                    }
                    if (element === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder) {
                        bc = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.ThunderAura;
                    }

                    return bc;
                },
                ElementToProjColor: function (element) {
                    var bc = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey;
                    if (element === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire) {
                        bc = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.FireShot;
                    }
                    if (element === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice) {
                        bc = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.IceAura;
                    }
                    if (element === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder) {
                        bc = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.ThunderAura;
                    }

                    return bc;
                }
            }
        },
        fields: {
            turnBaseTry: null,
            stageData: null,
            previewSystem: null,
            posAnim: null,
            charByCharAnim: null,
            delayAnim: null,
            textWorld: null,
            TextBoard: null,
            input: 0,
            HappHandling: null,
            InputUnicode: 0,
            Mouse: null,
            mouseHover: null,
            moveChars: null,
            moveDescriptions: null,
            miscDescriptions: null,
            moveButtons: null,
            debugOn: false,
            gridScale: 0,
            gridOffsetx: 0,
            gridOffsety: 0,
            battlerRenders: null,
            entitiesChars: null,
            MessageDoNotHide: false,
            message: null,
            waitingForMessageInput: false,
            lastPhase: 0,
            messageEnt: null,
            inputH: null
        },
        props: {
            Input: {
                get: function () {
                    return this.input;
                },
                set: function (value) {
                    this.input = value; //Console.WriteLine(value);
                }
            }
        },
        alias: [
            "Input", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Input",
            "InputUnicode", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$InputUnicode",
            "Mouse", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Mouse",
            "Draw", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Draw",
            "GetBoard", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$GetBoard"
        ],
        ctors: {
            init: function () {
                this.InputUnicode = -1;
                this.moveDescriptions = new (System.Collections.Generic.Dictionary$2(System.Object,System.String))();
                this.miscDescriptions = function (_o1) {
                        _o1.add(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done, "DONE");
                        _o1.add(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo, "REDO");
                        _o1.add(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Preview, "PREVIEW");
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(Pidroh.ConsoleApp.Turnbased.MiscBattleInput,System.String))());
                this.debugOn = true;
                this.gridScale = 5;
                this.gridOffsetx = 2;
                this.gridOffsety = 1;
                this.inputH = new Pidroh.TurnBased.TextRendering.InputHandling();
            },
            ctor: function (battleLogic, stageData, PreviewSystem) {
                var $t;
                this.$initialize();


                var entityTexts = System.Array.init([
                    "@", 
                    "&", 
                    "%", 
                    "$", 
                    "O", 
                    "X", 
                    "J", 
                    "Y", 
                    "Z"
                ], System.String);
                this.entitiesChars = System.Array.init(entityTexts.length, null, System.Array.type(System.Char));
                for (var i = 0; i < entityTexts.length; i = (i + 1) | 0) {
                    this.entitiesChars[System.Array.index(i, this.entitiesChars)] = ($t = entityTexts[System.Array.index(i, entityTexts)], System.String.toCharArray($t, 0, $t.length));
                }

                this.turnBaseTry = battleLogic;
                this.stageData = stageData;
                this.previewSystem = PreviewSystem;
                this.textWorld = new Pidroh.TextRendering.TextWorld();
                this.posAnim = this.textWorld.AddAnimation(Bridge.global.Pidroh.TextRendering.PositionAnimation, new Pidroh.TextRendering.PositionAnimation());
                this.charByCharAnim = this.textWorld.AddAnimation(Bridge.global.Pidroh.TextRendering.CharByCharAnimation, new Pidroh.TextRendering.CharByCharAnimation());
                this.delayAnim = this.textWorld.AddAnimation(Bridge.global.Pidroh.TextRendering.DelaysAnimation, new Pidroh.TextRendering.DelaysAnimation());
                this.textWorld.Init(70, 46);
                this.TextBoard = this.textWorld.mainBoard;
                //TextBoard = new TextBoard(70, 25);

                //var posAnim = textWorld.AddAnimation(new PositionAnimation());
                var blinkAnim = this.textWorld.AddAnimation(Bridge.global.Pidroh.TextRendering.BlinkAnim, new Pidroh.TextRendering.BlinkAnim());

                this.battlerRenders = new (System.Collections.Generic.List$1(Pidroh.TextRendering.TextEntity)).ctor();
                this.UpdateBattleRenderCount();


                this.messageEnt = this.textWorld.GetFreeEntity(40, 4);

                this.turnBaseTry.happManager.AddHandler(new Pidroh.ConsoleApp.Turnbased.Happs.HappHandler(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag.AttackHit, Bridge.fn.bind(this, function (h) {
                    var attacker = this.turnBaseTry.entities.getItem(h.GetAttribute_Int(1));
                    var defenderEID = h.GetAttribute_Int(0);
                    var defender = null;
                    if (defenderEID >= 0) {
                        defender = this.turnBaseTry.entities.getItem(defenderEID);
                    }
                    var element = h.GetAttribute_Int(2);
                    var fe = this.GetProjTextEntity(element);

                    if (defender != null) {
                        var pos = attacker.PositionV2D.$clone();
                        var pos2 = defender.PositionV2D.$clone();
                        var xDis = Math.abs(pos.X - pos2.X);
                        var time = xDis * 0.1;


                        this.posAnim.Add$1(fe.AnimBase(time), new Pidroh.TextRendering.PositionAnimation.PositionData.$ctor1(this.BattleEntityToScreenPosition(attacker.PositionV2D.$clone()), this.BattleEntityToScreenPosition(defender.PositionV2D.$clone())));
                    } else {
                        var pos1 = attacker.PositionV2D.$clone();
                        var pos21 = pos1.$clone();
                        if (attacker.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy) {
                            pos21.X = -1;
                        } else {
                            pos21.X = 6;
                        }
                        var xDis1 = Math.abs(pos1.X - pos21.X);
                        var time1 = xDis1 * 0.1;
                        this.posAnim.Add$1(fe.AnimBase(time1), new Pidroh.TextRendering.PositionAnimation.PositionData.$ctor1(this.BattleEntityToScreenPosition(pos1.$clone()), this.BattleEntityToScreenPosition(pos21.$clone())));
                    }




                })));

                //turnBaseTry.happManager.AddHandler(new Happs.HappHandler(BattleMain.HappTag.DamageTaken, (h) =>
                //{
                //    var defender = turnBaseTry.entities[h.GetAttribute_Int(0)];
                //    var fe = textWorld.GetTempEntity(1, 1);
                //    fe.Origin.DrawChar(TextBoard.NOCHANGECHAR, 0, 0);
                //    fe.Origin.Position = BattleEntityToScreenPosition(defender.PositionV2D);
                //    blinkAnim.Add(fe.AnimBase(0.5f), BlinkAnim.BlinkData.Char(' ', 0.1f));
                //    //ShowMessage("Got damaged");
                //}));

                this.turnBaseTry.happManager.AddHandler(new Pidroh.ConsoleApp.Turnbased.Happs.HappHandler(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag.AttackMiss, Bridge.fn.bind(this, function (h) {

                    var attacker = this.turnBaseTry.entities.getItem(h.GetAttribute_Int(0));
                    var element = h.GetAttribute_Int(1);
                    var fe = this.GetProjTextEntity(element);
                    var pos = attacker.PositionV2D.$clone();
                    var pos2 = pos.$clone();
                    if (attacker.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy) {
                        pos2.X = -1;
                    } else {
                        pos2.X = 6;
                    }
                    var xDis = Math.abs(pos.X - pos2.X);
                    var time = xDis * 0.1;
                    this.posAnim.Add$1(fe.AnimBase(time), new Pidroh.TextRendering.PositionAnimation.PositionData.$ctor1(this.BattleEntityToScreenPosition(pos.$clone()), this.BattleEntityToScreenPosition(pos2.$clone())));
                })));


                this.moveChars = function (_o2) {
                        _o2.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, "F");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice, "I");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder, "T");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot, "G");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, String.fromCharCode(Pidroh.BaseUtils.Unicode.Rightarrow2) + "");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, String.fromCharCode(Pidroh.BaseUtils.Unicode.Uparrow2) + "");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, String.fromCharCode(Pidroh.BaseUtils.Unicode.Downarrow2) + "");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, String.fromCharCode(Pidroh.BaseUtils.Unicode.Leftarrow2) + "");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, "IB");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, "TB");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.SummonEntity, "SU");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, " ");
                        return _o2;
                    }(new (System.Collections.Generic.Dictionary$2(System.Object,System.String))());

                this.moveDescriptions = function (_o3) {
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice, "Ice Shot");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, "Fire Shot");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder, "Thunder Shot");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, "Ice Bomb");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot, "Gun");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, String.fromCharCode(Pidroh.BaseUtils.Unicode.Rightarrow2) + "");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, String.fromCharCode(Pidroh.BaseUtils.Unicode.Uparrow2) + "");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, String.fromCharCode(Pidroh.BaseUtils.Unicode.Downarrow2) + "");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, String.fromCharCode(Pidroh.BaseUtils.Unicode.Leftarrow2) + "");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, "Thunder Bomb");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.SummonEntity, "Summon");
                        return _o3;
                    }(new (System.Collections.Generic.Dictionary$2(System.Object,System.String))());

                var mesOnPos = new Pidroh.TurnBased.TextRendering.MessageOnPosition(this);

                for (var i1 = 0; i1 < this.turnBaseTry.entities.Count; i1 = (i1 + 1) | 0) {
                    var e = this.turnBaseTry.entities.getItem(i1);
                    if (e.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.hero) {
                        var pos = this.battlerRenders.getItem(i1).GetPosition();
                        //mesOnPos.MessageOnPos(BattleEntityToScreenPosition(turnBaseTry.entities[i].pos), "YOU");
                        //MessageOnPos(Vector2D.Zero, "YOU");
                    }
                }


                //Console.ReadLine();
            }
        },
        methods: {
            UpdateBattleRenderCount: function () {
                while (this.battlerRenders.Count < this.turnBaseTry.entities.Count) {
                    var item = this.textWorld.GetFreeEntity(2, 2);
                    this.battlerRenders.add(item);
                    item.SetPosition(this.BattleEntityToScreenPosition(this.turnBaseTry.entities.getItem(((this.battlerRenders.Count - 1) | 0)).pos.$clone()));

                }
            },
            GetEntityName: function (user) {
                var gameEntity = this.turnBaseTry.entities.getItem(user);
                var chars = this.GetChar(gameEntity);
                var name = System.String.fromCharArray(chars);
                if (gameEntity.graphicRepeatedIndex > 0) {
                    return (name || "") + (((gameEntity.graphicRepeatedIndex + 1) | 0));
                } else {
                    return name;
                }


            },
            GetProjTextEntity: function (element) {
                var fe = this.textWorld.GetTempEntity(1, 1);
                fe.Origin.DrawChar(Pidroh.TextRendering.TextBoard.INVISIBLECHAR, 0, 0);
                var elementColor = Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToProjColor(element);
                fe.Origin.SetBackColor(elementColor, 0, 0);
                return fe;
            },
            Draw: function (delta) {

                var input = this.Input;
                if (input !== Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.NONE && this.waitingForMessageInput) {
                    this.waitingForMessageInput = false;
                    this.message = null;
                }
                //if (input != InputKey.NONE) Console.WriteLine(input);
                //int inputNumber = input - '0';
                //if (debugOn && input == 'k')
                //{
                //    DebugExtra.DebugEx.Show();
                //}

                if (this.lastPhase !== this.turnBaseTry.battleState.phase) {
                    if (this.turnBaseTry.battleState.phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands) {
                        //ShowMessage("Pick your commands", false, true);
                        this.TextBoard.SetAll(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.FireAura);

                    }
                    if (this.lastPhase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands) {
                        //Console.Write("X__X");
                        this.HideMessage();
                        //TextBoard.SetAll(TextBoard.NOCHANGECHAR, TextBoard.NOCHANGECOLOR, 0);
                    }
                }
                this.lastPhase = this.turnBaseTry.battleState.phase;
                if (this.turnBaseTry.battleState.phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands) {
                    if (this.InputUnicode >= 0) {
                        if (this.InputUnicode === 112) {
                            //previewSystem.StartPreview();
                        }
                        var inputX = this.inputH.PickingHand(this.InputUnicode, this.turnBaseTry.inputs);

                        if (inputX.type !== Pidroh.ConsoleApp.Turnbased.InputType.None) {
                            this.turnBaseTry.InputDone(inputX);
                        }
                    }

                    //foreach (var item in moveKeys)
                    //{
                    //    if (item.Value == input)
                    //    {
                    //        turnBaseTry.InputDone(item.Key);
                    //    }
                    //}
                }
                this.UpdateBattleRenderCount();
                this.DrawGraphics(delta);
                if (this.CanAdvance_Logic()) {
                    if (this.turnBaseTry.battleState.phase !== Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ExecuteMove && this.previewSystem.previewActive) {
                        this.previewSystem.EndPreview();
                    }
                    switch (this.turnBaseTry.battleState.phase) {
                        case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.EnemyMoveChoice: 
                            this.turnBaseTry.Tick();
                            break;
                        case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.HandRecharge: 
                            this.turnBaseTry.Tick();
                            break;
                        case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands: 
                            break;
                        case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ExecuteMove: 
                            //System.Threading.Thread.Sleep(300);
                            this.turnBaseTry.Tick();
                            break;
                        default: 
                            break;
                    }
                }
                //UpdateBattleRenderCount();
                //DrawGraphics(delta);

            },
            CanAdvanceGraphics: function () {
                return this.textWorld.IsDone() && !this.waitingForMessageInput;
            },
            CanAdvance_Logic: function () {
                return this.CanAdvanceGraphics() && this.HappHandling.IsDone();
            },
            ShowMessage: function (s, waitForInput, doNotHide) {
                if (waitForInput === void 0) { waitForInput = true; }
                if (doNotHide === void 0) { doNotHide = false; }
                this.MessageDoNotHide = doNotHide;
                this.message = s;
                this.messageEnt.Origin.ResetInvisible();
                var timeToWrite = this.message.length * 0.015;
                if (timeToWrite > 0.4) {
                    timeToWrite = 0.4;
                }
                this.charByCharAnim.Add$1(this.messageEnt.AnimBase(timeToWrite), new Pidroh.TextRendering.CharByCharAnimation.CharByCharData(0, ((this.message.length + 1) | 0)));
                this.delayAnim.Delay(timeToWrite + 0.8);

                //waitingForMessageInput = waitForInput;
                //Console.Write("M: "+s);
            },
            HideMessage: function () {
                this.message = null;
                this.waitingForMessageInput = false;
                //Console.Write("M: "+s);
            },
            ShowBattleMessage: function (s) {
                if (!this.turnBaseTry.BattleDecided()) {
                    this.ShowMessage(s);
                }
                //Console.Write("M: "+s);
            },
            DrawGraphics: function (delta) {
                this.mouseHover.mouseHovers.clear();
                this.turnBaseTry.Update(delta);
                //clear grid
                this.TextBoard.Reset();

                if (this.lastPhase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands) {
                    this.TextBoard.SetAll(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackgroundInput);
                }

                var controlsY = (((((Bridge.Int.mul(this.gridScale, 3) + 10) | 0) + 3) | 0) + 2) | 0;

                var enemyGridOffX = Bridge.Int.mul(this.gridScale, 3);
                var drawDot = false;
                this.TextBoard.DrawRepeated(32, this.gridOffsetx, this.gridOffsety, Bridge.Int.mul(this.gridScale, 6), Bridge.Int.mul(this.gridScale, 3), Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackBattle);
                for (var i = 0; i < Bridge.Int.mul(3, this.gridScale); i = (i + 1) | 0) {
                    for (var j = 0; j < Bridge.Int.mul(3, this.gridScale); j = (j + 1) | 0) {
                        if (drawDot) {
                            this.TextBoard.DrawChar$1(46, ((this.gridOffsetx + i) | 0), ((this.gridOffsety + j) | 0), Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero);
                            this.TextBoard.DrawChar$1(46, ((((this.gridOffsetx + i) | 0) + enemyGridOffX) | 0), ((this.gridOffsety + j) | 0), Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridEnemy);
                        }
                        if (i % this.gridScale === 0 && j % this.gridScale === 0) {

                            this.TextBoard.DrawGrid(((((i + this.gridOffsetx) | 0) + enemyGridOffX) | 0), ((j + this.gridOffsety) | 0), this.gridScale, this.gridScale, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridEnemy);
                            this.TextBoard.DrawGrid(((i + this.gridOffsetx) | 0), ((j + this.gridOffsety) | 0), this.gridScale, this.gridScale, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero);
                        }
                    }
                }

                for (var i1 = 0; i1 < this.turnBaseTry.entities.Count; i1 = (i1 + 1) | 0) {

                    var gameEntity = this.turnBaseTry.entities.getItem(i1);

                    var ec = this.GetChar(gameEntity);

                    var pos = gameEntity.PositionV2D.$clone();
                    var screenPos = this.BattleEntityToScreenPosition(pos);
                    if (gameEntity.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.paneleffect) {
                        screenPos.Y = screenPos.Y + 1;
                        screenPos.X = screenPos.X - 1;
                    }
                    //battlerEntities[i].origin.Position = screenPos;
                    if (Pidroh.BaseUtils.Vector2D.op_Inequality(this.battlerRenders.getItem(i1).Origin.Position.$clone(), screenPos.$clone()) && this.textWorld.IsDone()) {
                        //battlerRenders[i].Origin.Position = screenPos;
                        var time = 0.15;
                        //time = 5;
                        this.posAnim.Add$1(this.battlerRenders.getItem(i1).AnimBase(time), new Pidroh.TextRendering.PositionAnimation.PositionData.$ctor1(this.battlerRenders.getItem(i1).Origin.Position.$clone(), screenPos.$clone(), true));
                    }

                    var c = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero;
                    if (gameEntity.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy) {
                        c = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Enemy;
                    }
                    if (gameEntity.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.pickup) {
                        c = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey;
                    }
                    if (gameEntity.Dead) {
                        c = Pidroh.TextRendering.TextBoard.INVISIBLECOLOR;
                    }
                    var bc = Pidroh.TextRendering.TextBoard.INVISIBLECOLOR;

                    if (gameEntity.Alive) {
                        var element = gameEntity.element;
                        if (element !== Pidroh.ConsoleApp.Turnbased.BattleMain.Element.None) {
                            c = Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToAuraColor(element);
                        }

                    }
                    if (gameEntity.Dead) {
                        for (var j1 = 0; j1 < ((ec.length + 1) | 0); j1 = (j1 + 1) | 0) {
                            this.battlerRenders.getItem(i1).Origin.DrawChar$1(Pidroh.TextRendering.TextBoard.INVISIBLECHAR, j1, 0, c, bc);
                        }

                    } else {
                        this.battlerRenders.getItem(i1).Origin.Draw(ec, 0, 0, c, bc);
                        if (gameEntity.graphicRepeatedIndex > 0) {
                            this.battlerRenders.getItem(i1).Origin.DrawOneDigit(((gameEntity.graphicRepeatedIndex + 1) | 0), ((0 + ec.length) | 0), 0, c, bc);
                        }
                    }


                }


                var textBoardHeight = Bridge.Int.mul(3, this.gridScale);

                {
                    //int y = 2;
                    //int x = 6 * gridScale + 20;

                    var x = 3;

                    if (this.turnBaseTry.battleState.phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands) {
                        this.DrawControls(controlsY, x);
                        if (this.turnBaseTry.timeToChoose > 0) {
                            var ratio = this.turnBaseTry.timeToChoose / this.turnBaseTry.timeToChooseMax;
                            this.TextBoard.DrawRepeated(32, x, ((controlsY + 16) | 0), Bridge.Int.clip32(ratio * 15), 1, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Board, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero);
                        }
                    } else {
                        this.TextBoard.DrawRepeated(32, ((x - 1) | 0), ((controlsY - 1) | 0), 15, 15, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Board);
                    }
                }

                var turnOrderX = (Bridge.Int.mul(6, this.gridScale) + 5) | 0;
                var turnOrderY = 2;
                turnOrderX = 2;
                turnOrderY = (Bridge.Int.mul(3, this.gridScale) + 1) | 0;
                if (this.turnBaseTry.battleState.phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands) {
                    turnOrderY = (turnOrderY + 5) | 0;
                }

                this.DrawTurnOrder(turnOrderX, turnOrderY);
                if (!this.stageData.hideLifeUI) {
                    this.DrawLife(((turnOrderX + 25) | 0), turnOrderY);
                }
                {
                    var X = 2;
                    //const int Y = 16;
                    this.messageEnt.SetPosition$1(X, ((controlsY - 2) | 0));
                    if (this.message != null && (!this.CanAdvanceGraphics())) {
                        //TextBoard.DrawGrid(
                        //    messageEnt.Origin.Position.XInt, messageEnt.Origin.Position.YInt, 
                        //    messageEnt.Width, messageEnt.Height, Colors.Board);
                        //messageEnt.Origin.DrawGrid(0, 0, 40, 4, Colors.Board);
                        this.messageEnt.Origin.DrawWithLinebreaks(this.message, 1, 0, 1, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn);
                    } else {
                        if (!this.MessageDoNotHide) {
                            this.message = null;
                            this.messageEnt.Origin.SetAll(32);
                        }

                        //TextBoard.DrawRepeated(' ',X, Y, 40, 4, Colors.Board);
                    }
                }
                this.TextBoard.CursorNewLine(1);
                this.TextBoard.CursorNewLine(1);
                //textBoard.Draw_Cursor(turnBaseTry.battleState.phase.ToString());


                this.textWorld.DrawChildren();
                this.textWorld.TryEndAnimations();
                this.textWorld.AdvanceTime(delta);

                if (this.CanAdvanceGraphics()) {
                    this.HappHandling.Handle();
                    if (this.CanAdvanceGraphics()) {
                        this.turnBaseTry.happManager.TryHandle();
                    }
                }
                //if (CanAdvance())
                //{

                //}
            },
            BattleEntityToScreenPosition: function (pos) {
                var x = pos.X;
                var y = pos.Y;
                var screenPos = new Pidroh.BaseUtils.Vector2D.$ctor2(x * this.gridScale + ((Bridge.Int.div(this.gridScale, 2)) | 0) + this.gridOffsetx, Bridge.Int.mul(2, this.gridScale) - y * this.gridScale + ((Bridge.Int.div(this.gridScale, 2)) | 0) + this.gridOffsety);
                return screenPos.$clone();
            },
            DrawControls: function (y, x) {
                //TextBoard.DrawGrid(x - 2, y - 1, 20, 15, Colors.Board);
                this.TextBoard.SetCursorAt(x, y);
                //TextBoard.Draw_Cursor("Controls", Colors.WindowLabel);

                //InputTags inputTag = InputTags.MOVEFIX;
                var yOff = 0;
                yOff = this.DrawInputs_Fix(y, x, Pidroh.ConsoleApp.Turnbased.InputTags.MOVEFIX, yOff);
                //yOff++;
                yOff = this.DrawInputs_Fix(y, x, Pidroh.ConsoleApp.Turnbased.InputTags.MISC, yOff);
                //yOff++;
                //yOff = DrawInputs_Fix(y, x, InputTags.MOVEUNFIX, yOff);

                var attackNumber = 1;
                for (var i = 0; i < this.turnBaseTry.inputs.inputs.Count; i = (i + 1) | 0) {
                    var x2 = x;
                    var y2 = (((y + 2) | 0) + yOff) | 0;
                    var input = this.turnBaseTry.inputs.inputs.getItem(i);

                    if (this.turnBaseTry.inputs.TagIs(i, Pidroh.ConsoleApp.Turnbased.InputTags.MOVEUNFIX)) {
                        yOff = (yOff + 1) | 0;
                        yOff = (yOff + 1) | 0;
                        var unicode = (48 + attackNumber) | 0;
                        attackNumber = (attackNumber + 1) | 0;
                        this.mouseHover.mouseHovers.add(new Pidroh.TextRendering.GameScreen.MouseHover.$ctor1(new Pidroh.BaseUtils.Rect.$ctor1(((x2 - 2) | 0), y2, 20, 1), 0, input.arg1));
                        //TextBoard.DrawChar('[', x2 - 1, y2, Colors.HeroTurn);
                        var lengthBname = this.TextBoard.DrawUnicodeLabel(unicode, x2, y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey);
                        //TextBoard.DrawChar(']', x2 + lengthBname, y2, Colors.HeroTurn);

                        var description = { v : "" };
                        if (input.type === Pidroh.ConsoleApp.Turnbased.InputType.Move) {
                            var m = input.arg1;
                            this.moveDescriptions.tryGetValue(m, description);
                            if (description.v == null) {
                                description.v = System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, m);
                            }

                        }
                        if (input.type === Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle) {
                            var arg1 = input.arg1;
                            description.v = this.miscDescriptions.get(arg1);
                        }
                        this.TextBoard.Draw$1(description.v, ((((x2 + 2) | 0) + 5) | 0), y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.InputDescription);
                    }

                    //var c = moveChars[move];
                    //DrawMove(move, Colors.HeroTurn);
                    //TextBoard.Draw(c, x2 + 3, y2, Colors.HeroTurn);
                    //TextBoard.DrawWithGrid(c+"", x2, y + 2, Colors.HeroTurn);
                }
            },
            DrawInputs_Fix: function (y, x, inputTag, yOff) {

                for (var i = 0; i < this.turnBaseTry.inputs.inputs.Count; i = (i + 1) | 0) {
                    var x2 = x;
                    var y2 = (((y + 2) | 0) + yOff) | 0;
                    var input = this.turnBaseTry.inputs.inputs.getItem(i);

                    if (this.turnBaseTry.inputs.TagIs(i, inputTag)) {
                        var unicode = this.inputH.GetFixedMoveUnicode(input);
                        var forceInputLabel = null;
                        var forceCommandLabel = null;
                        if (unicode === 119) {
                            forceInputLabel = "WASD";
                            forceCommandLabel = "" + String.fromCharCode(Pidroh.BaseUtils.Unicode.Uparrow2) + String.fromCharCode(Pidroh.BaseUtils.Unicode.Leftarrow2) + String.fromCharCode(Pidroh.BaseUtils.Unicode.Downarrow2) + String.fromCharCode(Pidroh.BaseUtils.Unicode.Rightarrow2);
                        }
                        if (unicode === 97 || unicode === 115 || unicode === 100) {
                            continue;
                        }
                        yOff = (yOff + 1) | 0;
                        yOff = (yOff + 1) | 0;


                        this.mouseHover.mouseHovers.add(new Pidroh.TextRendering.GameScreen.MouseHover.$ctor1(new Pidroh.BaseUtils.Rect.$ctor1(((x2 - 2) | 0), y2, 20, 1), 0, input.arg1));
                        //TextBoard.DrawChar('[', x2 - 1, y2, Colors.HeroTurn);
                        var lengthBname = 0;
                        if (forceInputLabel == null) {
                            lengthBname = this.TextBoard.DrawUnicodeLabel(unicode, x2, y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey);
                        } else {
                            this.TextBoard.Draw$1(forceInputLabel, x2, y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey);
                            lengthBname = forceInputLabel.length;
                        }
                        //TextBoard.DrawChar(']', x2 + lengthBname, y2, Colors.HeroTurn);

                        var description = { v : "" };
                        if (input.type === Pidroh.ConsoleApp.Turnbased.InputType.Move) {
                            if (forceCommandLabel != null) {
                                description.v = forceCommandLabel;
                            } else {
                                var m = input.arg1;
                                this.moveDescriptions.tryGetValue(m, description);
                                if (description.v == null) {
                                    description.v = System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, m);
                                }
                            }


                        }
                        if (input.type === Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle) {
                            var arg1 = input.arg1;
                            description.v = this.miscDescriptions.get(arg1);
                        }
                        this.TextBoard.Draw$1(description.v, ((((x2 + 2) | 0) + 5) | 0), y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.InputDescription);
                    }

                    //var c = moveChars[move];
                    //DrawMove(move, Colors.HeroTurn);
                    //TextBoard.Draw(c, x2 + 3, y2, Colors.HeroTurn);
                    //TextBoard.DrawWithGrid(c+"", x2, y + 2, Colors.HeroTurn);
                }

                return yOff;
            },
            DrawLife: function (turnOrderX, turnOrderY) {
                //TextBoard.DrawGrid(turnOrderX - 1, turnOrderY - 1, 20, 9, Colors.WindowLabel);
                this.TextBoard.SetCursorAt(((turnOrderX + 1) | 0), turnOrderY);
                if (this.turnBaseTry.battleState.phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands) {
                    this.TextBoard.Draw_Cursor$3("Life", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);
                }
                this.TextBoard.SetCursorAt(((turnOrderX + 8) | 0), turnOrderY);
                if (this.turnBaseTry.battleState.phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands) {
                    this.TextBoard.Draw_Cursor$3("Element", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);
                }
                var index = -1; //using this because not all units get drawn
                for (var i = 0; i < this.turnBaseTry.entities.Count; i = (i + 1) | 0) {
                    //Console

                    var e = this.turnBaseTry.entities.getItem(i);
                    if (!e.drawLife) {
                        continue;
                    }
                    if (!e.Dead) {
                        index = (index + 1) | 0;
                        var color = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn;
                        if (e.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy) {
                            color = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.EnemyTurn;
                        }
                        if (e.element !== Pidroh.ConsoleApp.Turnbased.BattleMain.Element.None) {
                            color = Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToAuraColor(e.element);
                        }
                        //TextBoard.DrawOneDigit_Cursor((int)e.life.Val);
                        var xOff = (turnOrderX + 1) | 0;
                        var yOff = (((turnOrderY + 2) | 0) + Bridge.Int.mul(index, 2)) | 0;
                        //DrawEntityChar(e, color, xOff, yOff);
                        //TextBoard.DrawChar(GetChar(e), xOff, turnOrderY + 2, color);
                        this.TextBoard.DrawTwoDigits(e.life, xOff, yOff, color);
                        var element = "";
                        switch (e.element) {
                            case Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire: 
                                element = "Fire";
                                break;
                            case Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice: 
                                element = "Ice";
                                break;
                            case Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder: 
                                element = "Thunder";
                                break;
                            case Pidroh.ConsoleApp.Turnbased.BattleMain.Element.None: 
                                break;
                            default: 
                                break;
                        }
                        var eColor = Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToAuraColor(e.element);

                        this.TextBoard.Draw$1(element, ((xOff + 7) | 0), yOff, eColor);
                    }

                    //TextBoard.DrawOneDigit_Cursor((int)e.life.Val);

                    //TextBoard.CursorNewLine(x: 1);
                }
            },
            DrawTurnOrder: function (turnOrderX, turnOrderY, horizontal) {
                if (horizontal === void 0) { horizontal = true; }
                var turnsPerPhase = this.turnBaseTry.battleState.turnsPerPhase;
                this.TextBoard.SetCursorAt(((turnOrderX + 3) | 0), turnOrderY);
                if (this.turnBaseTry.battleState.phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands) {
                    this.TextBoard.Draw_Cursor$3("Commands", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);
                }

                var drawingId = -1;
                for (var i = 0; i < this.turnBaseTry.entities.Count; i = (i + 1) | 0) {

                    var e = this.turnBaseTry.entities.getItem(i);
                    if (!e.drawTurn) {
                        continue;
                    }
                    if (!e.Dead) {
                        drawingId = (drawingId + 1) | 0;
                        var color = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn;
                        if (e.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy) {
                            color = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.EnemyTurn;
                        }
                        if (e.element !== Pidroh.ConsoleApp.Turnbased.BattleMain.Element.None) {
                            color = Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToAuraColor(e.element);
                        }

                        //TextBoard.DrawOneDigit_Cursor((int)e.life.Val);
                        var xOff = (((turnOrderX + 1) | 0) + Bridge.Int.mul(drawingId, 3)) | 0;
                        var yEntity = (turnOrderY + 2) | 0;
                        var yFirstMove = (turnOrderY + 3) | 0;
                        var xFirstMove = xOff;
                        if (horizontal) {
                            xOff = turnOrderX;
                            yEntity = (((turnOrderY + 2) | 0) + Bridge.Int.mul(drawingId, 2)) | 0;
                            yFirstMove = yEntity;
                            xFirstMove = (turnOrderX + 3) | 0;
                        }
                        this.DrawEntityChar(e, color, xOff, yEntity);

                        this.TextBoard.SetCursorAt(xFirstMove, yFirstMove);

                        for (var i2 = 0; i2 < Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(turnsPerPhase); i2 = (i2 + 1) | 0) {
                            var color2 = color;
                            var backColor = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackCommand;
                            if (this.turnBaseTry.battleState.phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ExecuteMove) {
                                if (drawingId === this.turnBaseTry.battleState.actingEntity && i2 === Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(this.turnBaseTry.battleState.turn)) {
                                } else {
                                    backColor = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackBattle;
                                    color2 = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.InputDescription;
                                }

                            }

                            if (i2 < Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(turnsPerPhase)) {
                                var c = this.GetCharOfMove(e, i2);
                                this.mouseHover.mouseHovers.add(new Pidroh.TextRendering.GameScreen.MouseHover.$ctor1(new Pidroh.BaseUtils.Rect.$ctor1(this.TextBoard.CursorX, this.TextBoard.CursorY, c.length, 1), 0, e.moves[System.Array.index(i2, e.moves)])); //add here...? @_@

                                this.TextBoard.Draw_Cursor$3(c, color2, backColor);
                                if (horizontal) {
                                    for (var j = c.length; j < 3; j = (j + 1) | 0) {
                                        this.TextBoard.AdvanceCursor();
                                    }




                                }

                                //TextBoard.Draw_Cursor(' ');
                            } else {
                                this.TextBoard.Draw_Cursor$1(32, color, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackCommand);
                            }
                            if (horizontal) {

                            } else {
                                this.TextBoard.CursorNewLine(xFirstMove);
                            }
                        }
                    }


                    //TextBoard.CursorNewLine(x: 1);
                }
            },
            DrawEntityChar: function (e, color, x, y) {
                var chars = this.GetChar(e);

                this.TextBoard.Draw(chars, x, y, color);
                if (e.graphicRepeatedIndex > 0) {
                    this.TextBoard.DrawOneDigit(((e.graphicRepeatedIndex + 1) | 0), ((x + chars.length) | 0), y, color);
                }
            },
            GetCharOfMove: function (e, i2) {


                var val = e.moves[System.Array.index(i2, e.moves)];
                if (val >= 0) {
                    return this.moveChars.get(Bridge.Int.clip32(val));
                } else {
                    return " ";
                }
            },
            GetChar: function (gameEntity) {
                return this.entitiesChars[System.Array.index(gameEntity.graphic, this.entitiesChars)];

            },
            DrawMove$1: function (move, color) {
                if (move.Val >= 0) {
                    var m = Bridge.Int.clip32(move.Val);
                    this.DrawMove(m, color);
                } else {
                    this.TextBoard.Draw_Cursor(32);
                }

            },
            DrawMove: function (move, color) {
                var c = this.moveChars.get(move);
                this.TextBoard.Draw_Cursor$3(c, color);
            },
            GetBoard: function () {
                return this.TextBoard;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.GameMain", {
        inherits: [Pidroh.ConsoleApp.Turnbased.ITextScreen_],
        fields: {
            battleMain: null,
            battleRender: null,
            modeSelectionScreen: null,
            mainDraw: null,
            resultScreen: null,
            stageId: 0,
            enemyAmount: null,
            turnAmount: null,
            mouseHover: null,
            Mouse: null,
            remap: null
        },
        props: {
            Input: {
                get: function () {
                    return 99;
                },
                set: function (value) {
                    this.mainDraw.Pidroh$ConsoleApp$Turnbased$ITextScreen_$Input = value;
                }
            },
            InputUnicode: {
                get: function () {
                    return 99;
                },
                set: function (value) {
                    value = this.remap.Remap(value);
                    this.mainDraw.Pidroh$ConsoleApp$Turnbased$ITextScreen_$InputUnicode = value;
                }
            }
        },
        alias: [
            "Input", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Input",
            "InputUnicode", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$InputUnicode",
            "Mouse", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Mouse",
            "Draw", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Draw",
            "GetBoard", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$GetBoard"
        ],
        ctors: {
            init: function () {
                this.enemyAmount = System.Array.init([1, 1, 2, 1, 2, 3, 2, 3, 1, 2, 3, 3], System.Int32);
                this.turnAmount = System.Array.init([2, 4, 2, 6, 4, 2, 6, 4, 8, 8, 6, 8], System.Int32);
                this.Mouse = new Pidroh.TextRendering.GameScreen.MouseIO();
                this.remap = new Pidroh.TextRendering.GameScreen.UnicodeRemap();
            },
            ctor: function () {
                this.$initialize();
                this.modeSelectionScreen = new Pidroh.TurnBased.TextRendering.ModeSelectionScreen();

                this.Reset();
                this.modeSelectionScreen.mode = 1;
                this.modeSelectionScreen.wannaLeave = 1;
                this.mainDraw = this.modeSelectionScreen;
                //Reset();
            }
        },
        methods: {
            Reset: function () {



                var mode = this.modeSelectionScreen.mode;
                var timeAttack = this.modeSelectionScreen.timeAttack;

                var ecs = Pidroh.ECS.ECSManager.Create();

                var sdc = new Pidroh.ConsoleApp.Turnbased.StageDataCreator(ecs);
                var stages = ecs.QuickAccessor1(Pidroh.ConsoleApp.Turnbased.StageData);
                //var stages = sdc.stages;

                var d = this.stageId;
                if (stages.Count <= d) {
                    this.mainDraw = this.modeSelectionScreen;
                    this.modeSelectionScreen.Reset();
                    this.stageId = 0;
                    return;
                }
                //d = 200;
                if (d >= this.enemyAmount.length) {
                    d = (this.enemyAmount.length - 1) | 0;
                }
                var nEnemies = this.enemyAmount[System.Array.index(d, this.enemyAmount)];

                var battleSetup = new Pidroh.ConsoleApp.Turnbased.BattleSetup(mode, this.stageId, ecs);
                this.battleMain = battleSetup.battleMain;

                var ps = new Pidroh.TurnBased.TextRendering.PreviewSystem(ecs, this.battleMain);



                //ecs.CreateEntityWithComponent(new EnemySpawnData(0, new BaseUtils.Vector2D(4, 1)));
                //ecs.CreateEntityWithComponent(new EnemySpawnData(1, new BaseUtils.Vector2D(5, 1)));


                var timeToChoose = -1;
                if (timeAttack) {
                    timeToChoose = (5.0 * this.turnAmount[System.Array.index(d, this.turnAmount)]) * nEnemies;

                }
                this.battleMain.timeToChooseMax = timeToChoose;
                this.battleMain.Init();
                this.battleRender = new Pidroh.ConsoleApp.Turnbased.BattleRender(this.battleMain, stages.Comp1(this.stageId), ps);
                new Pidroh.TurnBased.TextRendering.HappHandling(this.battleRender, battleSetup);
                this.mainDraw = this.battleRender;
                this.resultScreen = new Pidroh.ConsoleApp.Turnbased.ResultScreen();
                this.resultScreen.battleResult = this.battleMain.battleResult;

                var hoverManager = new Pidroh.TextRendering.GameScreen.MouseHoverManager(this.Mouse);
                hoverManager.mouseHovers.add(new Pidroh.TextRendering.GameScreen.MouseHover.$ctor1(new Pidroh.BaseUtils.Rect.$ctor1(5, 5, 5, 5), 0, 0));
                this.mouseHover = new Pidroh.TurnBased.TextRendering.MouseHoverText(hoverManager, this.battleRender.textWorld.GetFreeEntity(50, 1));

                this.battleRender.mouseHover = hoverManager;
            },
            Draw: function (f) {
                this.mouseHover.Update();
                this.mainDraw.Pidroh$ConsoleApp$Turnbased$ITextScreen_$Draw(f);
                this.mainDraw.Pidroh$ConsoleApp$Turnbased$ITextScreen_$Mouse = this.Mouse;
                if (Bridge.referenceEquals(this.mainDraw, this.battleRender)) {
                    if (this.battleMain.IsOver()) {
                        if (this.battleMain.IsVictory()) {
                            this.stageId = (this.stageId + 1) | 0;
                        }
                        this.resultScreen.Enter();
                        this.mainDraw = this.resultScreen;
                    }
                }
                if (Bridge.referenceEquals(this.mainDraw, this.resultScreen)) {
                    if (this.resultScreen.wannaLeave === 1) {
                        this.Reset();
                    }
                }
                if (Bridge.referenceEquals(this.mainDraw, this.modeSelectionScreen)) {
                    if (this.modeSelectionScreen.wannaLeave === 1) {
                        this.Reset();
                    }
                }

            },
            GetBoard: function () {
                return this.mainDraw.Pidroh$ConsoleApp$Turnbased$ITextScreen_$GetBoard();
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.ResultScreen", {
        inherits: [Pidroh.ConsoleApp.Turnbased.ITextScreen_],
        fields: {
            textWorld: null,
            youWin: null,
            Mouse: null,
            youLose: null,
            battleResult: null,
            wannaLeave: 0,
            Input: 0,
            InputUnicode: 0
        },
        alias: [
            "Mouse", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Mouse",
            "Input", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Input",
            "InputUnicode", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$InputUnicode",
            "Draw", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Draw",
            "GetBoard", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$GetBoard"
        ],
        ctors: {
            init: function () {
                this.youWin = "You Win";
                this.youLose = "You lose";
            },
            ctor: function () {
                this.$initialize();
                this.textWorld = new Pidroh.TextRendering.TextWorld();
                this.textWorld.Init(70, 25);
            }
        },
        methods: {
            Enter: function () {
                this.wannaLeave = 0;
            },
            Draw: function (f) {
                if (this.InputUnicode > 0) {
                    this.wannaLeave = 1;
                }
                var message = this.youWin;
                if (this.battleResult.result === 2) {
                    message = this.youLose;
                }
                this.textWorld.mainBoard.DrawOnCenter(message, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Board);
            },
            GetBoard: function () {
                return this.textWorld.mainBoard;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextAnimation$1", function (T) { return {
        inherits: [Pidroh.TextRendering.TextAnimation],
        fields: {
            mainData: null
        },
        ctors: {
            init: function () {
                this.mainData = new (System.Collections.Generic.List$1(T)).ctor();
            }
        },
        methods: {
            RequestRegisterLists: function () {
                this.RegisterList(this.mainData);
            },
            Add$1: function (baseData, mainD) {
                this.Add(baseData);
                this.mainData.add(mainD);
            },
            Modify: function (entity, index, progress, length) {
                this.Modify$2(entity, this.mainData.getItem(index), progress, length);
            },
            Modify$2: function (entity, mainData, progress, length) { }
        }
    }; });

    Bridge.define("Pidroh.TextRendering.DelaysAnimation", {
        inherits: [Pidroh.TextRendering.TextAnimation],
        methods: {
            RequestRegisterLists: function () {

            },
            Delay: function (v) {
                this.Add(new Pidroh.TextRendering.TextAnimation.BaseData.$ctor1(v, 0, -1));
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TestGame", {
        inherits: [Pidroh.TextRendering.ITextGame],
        fields: {
            ScreenHolder: null
        },
        alias: [
            "ScreenHolder", "Pidroh$TextRendering$ITextGame$ScreenHolder",
            "GetPalette", "Pidroh$TextRendering$ITextGame$GetPalette",
            "Init", "Pidroh$TextRendering$ITextGame$Init",
            "Update", "Pidroh$TextRendering$ITextGame$Update"
        ],
        ctors: {
            init: function () {
                this.ScreenHolder = new Pidroh.TextRendering.TextScreenHolder();
            }
        },
        methods: {
            GetPalette: function () {
                return Pidroh.TextRendering.DefaultPalettes.C4Novel;
            },
            Init: function (w, h) {
                var screen = new Pidroh.TextRendering.TestScreen();
                this.ScreenHolder.SetAll(screen);
                screen.Init(w, h);
                screen.GetBoard().Draw$1("Test", 0, 0, 1);
            },
            Update: function (delta) {

            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextScreenN", {
        inherits: [Pidroh.TextRendering.ITextScreen,Pidroh.TextRendering.IMouseInput,Pidroh.TextRendering.IKeyboardInput],
        fields: {
            TextWorld: null,
            InputUnicode: 0
        },
        props: {
            InputAsNumber: {
                get: function () {
                    return ((this.InputUnicode - 48) | 0);
                }
            }
        },
        alias: [
            "Update", "Pidroh$TextRendering$ITextScreen$Update",
            "GetBoard", "Pidroh$TextRendering$ITextScreen$GetBoard",
            "MouseEvent", "Pidroh$TextRendering$IMouseInput$MouseEvent",
            "InputUnicode", "Pidroh$TextRendering$IKeyboardInput$InputUnicode"
        ],
        ctors: {
            ctor: function () {
                this.$initialize();
            },
            $ctor1: function (textWorld) {
                this.$initialize();
                this.TextWorld = textWorld;
            }
        },
        methods: {
            Update: function (f) { },
            Init: function (w, h) {
                this.TextWorld = new Pidroh.TextRendering.TextWorld();
                this.TextWorld.Init(w, h);

            },
            GetBoard: function () {
                return this.TextWorld.mainBoard;
            },
            MouseEvent: function (mouseDown, v1, v2) {

            }
        }
    });

    Bridge.define("Pidroh.TurnBased.TextRendering.ModeSelectionScreen", {
        inherits: [Pidroh.ConsoleApp.Turnbased.ITextScreen_],
        fields: {
            textWorld: null,
            youWin: null,
            youLose: null,
            Mouse: null,
            selection: 0,
            battleResult: null,
            wannaLeave: 0,
            mode: 0,
            timeAttack: false,
            screenStage: 0,
            Input: 0,
            InputUnicode: 0
        },
        alias: [
            "Mouse", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Mouse",
            "Input", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Input",
            "InputUnicode", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$InputUnicode",
            "Draw", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Draw",
            "GetBoard", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$GetBoard"
        ],
        ctors: {
            init: function () {
                this.youWin = "You Win";
                this.youLose = "You lose";
                this.timeAttack = false;
            },
            ctor: function () {
                this.$initialize();
                this.textWorld = new Pidroh.TextRendering.TextWorld();
                this.textWorld.Init(70, 25);
            }
        },
        methods: {
            Enter: function () {
                this.wannaLeave = 0;
            },
            Draw: function (f) {
                this.textWorld.mainBoard.Reset();
                var ik = this.Input;
                this.mode = -1;
                this.textWorld.mainBoard.Draw$1("ProgBattle Prototype v0.3", 1, 1, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero);
                this.textWorld.mainBoard.Draw$1("A game by Pidroh", 1, 2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero);
                if (this.screenStage === 0) {
                    switch (ik) {
                        case Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.LEFT: 
                            this.screenStage = 1;
                            this.timeAttack = false;
                            break;
                        case Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.RIGHT: 
                            this.screenStage = 1;
                            this.timeAttack = true;
                            break;
                        case Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.DOWN: 
                            this.timeAttack = true;
                            this.mode = 0;
                            break;
                        case Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.UP: 
                            this.mode = 0;
                            this.timeAttack = false;
                            break;
                        default: 
                            break;
                    }
                    this.textWorld.mainBoard.DrawOnCenter("[w] Vanilla", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 4, false);
                    this.textWorld.mainBoard.DrawOnCenter("[a] Elemental", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 5, false);
                    this.textWorld.mainBoard.DrawOnCenter("[s] Vanilla Time Attack", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 6, false);
                    this.textWorld.mainBoard.DrawOnCenter("[d] Elemental Time Attack", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 7, false);
                }
                if (this.screenStage === 1) {
                    if (ik === Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.UP) {
                        this.mode = 1;

                    }
                    if (ik === Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.DOWN) {
                        this.screenStage = 0;
                    }
                    this.textWorld.mainBoard.DrawOnCenter("Elemental Mode", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, -5, true);
                    this.textWorld.mainBoard.DrawOnCenter("Fire beats Ice, Ice beats Thunder, Thunder beats fire", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, -2, true);
                    this.textWorld.mainBoard.DrawOnCenter("Same element = no damage", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 0, true);
                    this.textWorld.mainBoard.DrawOnCenter("It is best to have had some experience with vanilla mode", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 1, true);
                    this.textWorld.mainBoard.DrawOnCenter("[w] Start Elemental Mode", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 4, false);
                    this.textWorld.mainBoard.DrawOnCenter("[s] Go back", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 5, false);
                }


                if (this.mode >= 0) {
                    this.wannaLeave = 1;
                }




                //string message = youWin;
                //if (battleResult.result == 2) message = youLose;
                //textWorld.mainBoard.DrawOnCenter(message, Colors.Board);
            },
            Reset: function () {
                this.mode = -1;
                this.wannaLeave = 0;
            },
            GetBoard: function () {
                return this.textWorld.mainBoard;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.BlinkAnim.BlinkData", {
        $kind: "nested struct",
        statics: {
            methods: {
                BackColor: function (backColor, blinkDuration, changeNoChangeColor) {
                    if (changeNoChangeColor === void 0) { changeNoChangeColor = true; }
                    return new Pidroh.TextRendering.BlinkAnim.BlinkData.$ctor1(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, backColor, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, blinkDuration, blinkDuration, changeNoChangeColor);
                },
                FrontColor: function (frontColor, blinkDuration) {
                    return new Pidroh.TextRendering.BlinkAnim.BlinkData.$ctor1(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, frontColor, blinkDuration, blinkDuration);
                },
                Char: function (c, blinkDuration) {
                    return new Pidroh.TextRendering.BlinkAnim.BlinkData.$ctor1(c, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, blinkDuration, blinkDuration);
                },
                getDefaultValue: function () { return new Pidroh.TextRendering.BlinkAnim.BlinkData(); }
            }
        },
        fields: {
            text: 0,
            backColor: 0,
            textColor: 0,
            blinkActiveTime: 0,
            blinkInactive: 0,
            changeInvisible: false
        },
        ctors: {
            $ctor1: function (text, backColor, textColor, blinkActiveTime, blinkInactive, changeNoChangeColor) {
                if (changeNoChangeColor === void 0) { changeNoChangeColor = true; }

                this.$initialize();
                this.text = text;
                this.backColor = backColor;
                this.textColor = textColor;
                this.blinkActiveTime = blinkActiveTime;
                this.blinkInactive = blinkInactive;
                this.changeInvisible = true;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3804934414, this.text, this.backColor, this.textColor, this.blinkActiveTime, this.blinkInactive, this.changeInvisible]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.TextRendering.BlinkAnim.BlinkData)) {
                    return false;
                }
                return Bridge.equals(this.text, o.text) && Bridge.equals(this.backColor, o.backColor) && Bridge.equals(this.textColor, o.textColor) && Bridge.equals(this.blinkActiveTime, o.blinkActiveTime) && Bridge.equals(this.blinkInactive, o.blinkInactive) && Bridge.equals(this.changeInvisible, o.changeInvisible);
            },
            $clone: function (to) {
                var s = to || new Pidroh.TextRendering.BlinkAnim.BlinkData();
                s.text = this.text;
                s.backColor = this.backColor;
                s.textColor = this.textColor;
                s.blinkActiveTime = this.blinkActiveTime;
                s.blinkInactive = this.blinkInactive;
                s.changeInvisible = this.changeInvisible;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.CharByCharAnimation.CharByCharData", {
        $kind: "nested class",
        fields: {
            charStart: 0,
            charEnd: 0
        },
        ctors: {
            ctor: function (charStart, charEnd) {
                this.$initialize();
                this.charStart = charStart;
                this.charEnd = charEnd;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.PositionAnimation.PositionData", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.TextRendering.PositionAnimation.PositionData(); }
            }
        },
        fields: {
            permanent: false,
            startPosition: null,
            endPosition: null
        },
        ctors: {
            init: function () {
                this.startPosition = new Pidroh.BaseUtils.Vector2D();
                this.endPosition = new Pidroh.BaseUtils.Vector2D();
            },
            $ctor1: function (startPosition, endPosition, perm) {
                if (perm === void 0) { perm = false; }

                this.$initialize();
                this.startPosition = startPosition.$clone();
                this.endPosition = endPosition.$clone();
                this.permanent = perm;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([5256985096, this.permanent, this.startPosition, this.endPosition]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.TextRendering.PositionAnimation.PositionData)) {
                    return false;
                }
                return Bridge.equals(this.permanent, o.permanent) && Bridge.equals(this.startPosition, o.startPosition) && Bridge.equals(this.endPosition, o.endPosition);
            },
            $clone: function (to) {
                var s = to || new Pidroh.TextRendering.PositionAnimation.PositionData();
                s.permanent = this.permanent;
                s.startPosition = this.startPosition.$clone();
                s.endPosition = this.endPosition.$clone();
                return s;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TestScreen", {
        inherits: [Pidroh.TextRendering.TextScreenN],
        alias: ["Update", "Pidroh$TextRendering$ITextScreen$Update"],
        methods: {
            Update: function (f) {

            }
        }
    });

    Bridge.define("Pidroh.TextRendering.BlinkAnim", {
        inherits: [Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.BlinkAnim.BlinkData)],
        methods: {
            Modify$2: function (entity, mainData, progress, length) {
                Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.BlinkAnim.BlinkData).prototype.Modify$2.call(this, entity, mainData, progress, length);
                var aux = progress;
                var blink = true;
                while (true) {
                    if (blink) {
                        aux -= mainData.blinkActiveTime;
                    } else {
                        aux -= mainData.blinkInactive;
                    }
                    if (aux < 0) {
                        break;
                    } else {
                        blink = !blink;
                    }
                }
                if (!blink) {
                    if (mainData.changeInvisible) {
                        entity.Animation.SetAll(mainData.text, mainData.textColor, mainData.backColor);
                    } else {
                        entity.Animation.SetAllIfVisible(mainData.text, mainData.textColor, mainData.backColor);
                    }

                }
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.CharByCharAnimation", {
        inherits: [Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.CharByCharAnimation.CharByCharData)],
        methods: {
            Modify$2: function (entity, mainData, progress, length) {
                Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.CharByCharAnimation.CharByCharData).prototype.Modify$2.call(this, entity, mainData, progress, length);
                var ratio = progress / length;
                var lengthText = (mainData.charEnd - mainData.charStart) | 0;
                var lineBreaks = 0;
                var offsetedPerm = 0;
                for (var i = mainData.charStart; i < mainData.charEnd; i = (i + 1) | 0) {
                    var offseted = (i + offsetedPerm) | 0;
                    var line = 0;
                    var tb = entity.Animation;


                    while (offseted >= tb.Width) {
                        line = (line + 1) | 0;
                        offseted = (offseted - tb.Width) | 0;
                    }
                    if (entity.Origin.CharAt(offseted, ((line + lineBreaks) | 0)) === 10) {
                        lineBreaks = (lineBreaks + 1) | 0;
                        offsetedPerm = (offsetedPerm - offseted) | 0;
                        offseted = 0;
                    }
                    if (i > ((lengthText * ratio) + mainData.charStart)) {
                        tb.DrawChar(32, offseted, ((line + lineBreaks) | 0));
                        //tb.Draw("" + i, 6, 5, 1);

                    }
                }
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.PositionAnimation", {
        inherits: [Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.PositionAnimation.PositionData)],
        methods: {
            Modify$2: function (entity, mainData, progress, length) {
                Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.PositionAnimation.PositionData).prototype.Modify$2.call(this, entity, mainData, progress, length);
                var target = entity.Animation;
                if (mainData.permanent) {
                    target = entity.Origin;
                }
                target.Position = Pidroh.BaseUtils.Vector2D.InterpolateRounded(mainData.startPosition.$clone(), mainData.endPosition.$clone(), progress / length);

            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VCdWlsZC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvT2JqZWN0Q2xvbmVyLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvRGVidWdnZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9EZWVwQ2xvbmVIZWxwZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9FeHRlbnNpb25zLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvUG9pbnQuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9SYW5kb21TdXBwbGllci5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1JlY3RhbmdsZS5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1RpbWVTdGFtcC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1VuaWNvZGUuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9WZWN0b3IyRC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1ZlY3RvcjNELmNzIiwiLi4vVHVybkJhc2VkTG9naWMvTW92ZURhdGEuY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0FzeW5jVGFza3MuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9CYXR0bGVTZXR1cC5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0JhdHRsZU1haW4uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0NvbG9yU3R1ZmYuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9EZWJ1Z0V4dHJhL0RlYnVnRXguY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9FQ1NJbnRlZ3JhdGlvbi5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0VuZW15QUkuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9TcGF3bkZhY3RvcnkuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9FbmVteURhdGFDcmVhdG9yLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvU3RhZ2VEYXRhLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvTW92ZURhdGFFeGVjdXRlci5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0hhcHBzL0hhcHAuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9JbnB1dEhvbGRlci5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL01vdmVDcmVhdG9yUHJvZy5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9BY2Nlc3Nvci5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9DbG9uZWRTdGF0ZS5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9FQ1NNYW5hZ2VyLmNzIiwiLi4vLi4vVmlzdWFsU3R1ZGlvU29sdXRpb25SbWsvRUNTL0VudGl0eS5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9Qcm9jZXNzb3JGbGV4LmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvVGV4dFdvcmxkLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvUGFsZXR0ZS5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL0dhbWVTY3JlZW4vTW91c2VIb3Zlci5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL0dhbWVTY3JlZW4vVW5pY29kZVJlbWFwLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvVGV4dEJvYXJkLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvR2FtZVNjcmVlbi9JVGV4dFNjcmVlbk4uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0hhcHBIYW5kbGluZy5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvSW5wdXRIYW5kbGluZy5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvTWVzc2FnZU9uUG9zaXRpb24uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL01vdXNlSG92ZXJUZXh0LmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9QcmV2aWV3U3lzdGVtLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9SZWZsZWN0aW9uVGVzdC5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvQmF0dGxlUmVuZGVyLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9HYW1lTWFpbi5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvUmVzdWx0U2NyZWVuLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvR2FtZVNjcmVlbi9UZXN0R2FtZS5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvTW9kZVNlbGVjdGlvblNjcmVlbi5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL0JsaW5rQW5pbWF0aW9uLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvQ2hhckJ5Q2hhckFuaW1hdGlvbi5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7WUEwRFlBO1lBQ0FBLElBQUlBO1lBQ0pBOztZQUVBQSxxQ0FBY0EsbUNBQVFBO1lBQ3RCQSx5QkFBU0E7WUFDVEEsS0FBS0EsV0FBV0EsSUFBSUEsc0RBQTBCQTs7Z0JBRzFDQSwwQ0FBT0EsR0FBUEEsMkJBQVlBLGlFQUFrQkEsR0FBbEJBOzs7OztZQUtoQkEsWUFBWUE7WUFDWkEsa0JBQWtCQTtZQUNsQkEsMEJBQTBCQTtZQUMxQkE7WUFDQUE7Ozs7WUFJ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Q0V4QkFBLFFBQW1CQSxVQUFvQkEsVUFBZ0JBO2dCQUUvRUEsNkdBQVlBLFFBQVFBLFVBQVVBLFVBQVVBO2dCQUN4Q0EsVUFBWUE7Z0JBQ1pBO2dCQUNBQTtvQkFFSUEsSUFBSUE7d0JBRUFBLE9BQU9BOzt3QkFJUEEsT0FBT0E7O29CQUVYQSxJQUFJQTt3QkFFQUE7O3dCQUlBQSxRQUFRQSxDQUFDQTs7O2dCQUdqQkEsSUFBSUEsQ0FBQ0E7b0JBRURBLElBQUlBO3dCQUVBQSx3QkFBd0JBLGVBQWVBLG9CQUFvQkE7O3dCQUczREEsaUNBQWlDQSxlQUFlQSxvQkFBb0JBOzs7Ozs7Ozs7OztnQ0NwQ3BEQSxRQUFtQkEsVUFBeUJBLFVBQWdCQTtnQkFFcEZBLDRIQUFZQSxRQUFRQSxVQUFVQSxVQUFVQTtnQkFDeENBLFlBQWNBLFdBQVdBO2dCQUN6QkEsaUJBQW1CQSxvQkFBbUJBO2dCQUN0Q0E7Z0JBQ0FBO2dCQUNBQSxLQUFLQSxRQUFRQSxvQkFBb0JBLElBQUlBLGtCQUFrQkE7b0JBRW5EQSxlQUFlQSxLQUFJQTtvQkFDbkJBO29CQUNBQSxTQUFTQTs7O29CQUdUQSxPQUFPQSxZQUFZQTt3QkFFZkE7d0JBQ0FBLHVCQUFZQTs7b0JBRWhCQSxJQUFJQSxxQkFBcUJBLFVBQVVBLFNBQU9BO3dCQUV0Q0E7d0JBQ0FBLCtCQUFnQkE7d0JBQ2hCQTs7b0JBRUpBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLGFBQWFBLFNBQVNBO3dCQUU1QkEsZ0JBQWlCQSxVQUFVQSxTQUFPQTs7Ozs7Ozs7Ozs7O2dDbEI0SmxCQSxRQUFtQkEsVUFBdUJBLFVBQWdCQTtnQkFFbEZBLHdIQUFZQSxRQUFRQSxVQUFVQSxVQUFVQTtnQkFDeENBLGFBQW1CQTtnQkFDbkJBLElBQUlBO29CQUNBQSxTQUFTQTs7Z0JBQ2JBLGtCQUFrQkEsNkNBQTRCQSxpQ0FBd0JBLCtCQUFzQkEsV0FBV0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbi8vdXNpbmcgRUNTO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZztcclxuLy91c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlQnVpbGRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludCBidWZmZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgYm9vbCBidWZmZXJPbjtcclxuICAgICAgICAvL3ByaXZhdGUgc3RhdGljIEhUTUxQcmVFbGVtZW50IHRleHQ7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgR2FtZU1haW4gZ3I7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVGV4dEJvYXJkIFRleHRCb2FyZDtcclxuICAgICAgICAvL3ByaXZhdGUgc3RhdGljIFN0cmluZ0J1aWxkZXIgc2I7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nW10gY29sb3JzO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludCBidWZmZXJVbmljb2RlID0gLTE7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVGV4dEJvYXJkIGF1eDtcclxuICAgICAgICBzdGF0aWMgRGF0ZVRpbWUgbGFzdCA9IERhdGVUaW1lLk5vdztcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIENhbkRyYXc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgU2V0dXBHYW1lKG91dCBHYW1lTWFpbiBnciwgb3V0IFRleHRCb2FyZCBUZXh0Qm9hcmQpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgUmFuZG9tIHJuZCA9IG5ldyBSYW5kb20oKTtcclxuICAgICAgICAgICAgUmFuZG9tU3VwcGxpZXIuR2VuZXJhdGUgPSAoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGZsb2F0KXJuZC5OZXh0RG91YmxlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBnciA9IG5ldyBHYW1lTWFpbigpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQgPSBnci5HZXRCb2FyZCgpO1xyXG4gICAgICAgICAgICBhdXggPSBuZXcgVGV4dEJvYXJkKDMwMCwgMzAwKTtcclxuXHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgQmxhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IGkgPSAzO1xyXG4gICAgICAgICAgICBwdWJsaWMgQnJpZGdlQnVpbGQuQXBwLlZlY3RvciBwb3MgPSBuZXcgQnJpZGdlQnVpbGQuQXBwLlZlY3RvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RydWN0IFZlY3RvclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IHg7XHJcbiAgICAgICAgICAgIHB1YmxpYyBmbG9hdCB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGVlcENsb25lSGVscGVyLmRlYnVnLkFjdGl2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIG5ldyBSZWZsZWN0aW9uVGVzdCgpO1xyXG4gICAgICAgICAgICBUZXN0RW50aXR5U3lzdGVtKCk7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJHYW1lIFN0YXJ0XCIpO1xyXG4gICAgICAgICAgICBTZXR1cEdhbWUob3V0IGdyLCBvdXQgVGV4dEJvYXJkKTtcclxuICAgICAgICAgICAgY29sb3JzID0gbmV3IHN0cmluZ1szMF07XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgQ29sb3JTdHVmZi5jb2xvcnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb2xvcnNbaV0gPSBDb2xvclN0dWZmLmNvbG9yc1tpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBuZXcgSFRNTFN0eWxlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBzdHlsZS5Jbm5lckhUTUwgPSBcImh0bWwsYm9keSB7Zm9udC1mYW1pbHk6IENvdXJpZXI7IGJhY2tncm91bmQtY29sb3I6IzFmMjUyNjsgaGVpZ2h0OiAxMDAlOyBjb2xvcjojODg4O31cIiArIFwiXFxuICNjYW52YXMtY29udGFpbmVyIHt3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyB0ZXh0LWFsaWduOmNlbnRlcjsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfSBcIjtcclxuICAgICAgICAgICAgRG9jdW1lbnQuSGVhZC5BcHBlbmRDaGlsZChzdHlsZSk7XHJcbiAgICAgICAgICAgIGJ1ZmZlciA9IDk7XHJcbiAgICAgICAgICAgIGJ1ZmZlck9uID0gZmFsc2U7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIERvY3VtZW50Lk9uS2V5UHJlc3MgKz0gKEtleWJvYXJkRXZlbnQgYSkgPT5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGludCBjb2RlID0gYS5LZXlDb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUgPT0gMCkgY29kZSA9IGEuQ2hhckNvZGU7XHJcbiAgICAgICAgICAgICAgICBpbnQgdW5pY29kZSA9IGNvZGU7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJVbmljb2RlID0gdW5pY29kZTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZSh1bmljb2RlKTtcclxuICAgICAgICAgICAgICAgIC8vYnVmZmVyID0gYS5DaGFyQ29kZTtcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBVcGRhdGVHYW1lKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZnRlciBidWlsZGluZyAoQ3RybCArIFNoaWZ0ICsgQikgdGhpcyBwcm9qZWN0LCBcclxuICAgICAgICAgICAgLy8gYnJvd3NlIHRvIHRoZSAvYmluL0RlYnVnIG9yIC9iaW4vUmVsZWFzZSBmb2xkZXIuXHJcblxyXG4gICAgICAgICAgICAvLyBBIG5ldyBicmlkZ2UvIGZvbGRlciBoYXMgYmVlbiBjcmVhdGVkIGFuZFxyXG4gICAgICAgICAgICAvLyBjb250YWlucyB5b3VyIHByb2plY3RzIEphdmFTY3JpcHQgZmlsZXMuIFxyXG5cclxuICAgICAgICAgICAgLy8gT3BlbiB0aGUgYnJpZGdlL2luZGV4Lmh0bWwgZmlsZSBpbiBhIGJyb3dzZXIgYnlcclxuICAgICAgICAgICAgLy8gUmlnaHQtQ2xpY2sgPiBPcGVuIFdpdGguLi4sIHRoZW4gY2hvb3NlIGFcclxuICAgICAgICAgICAgLy8gd2ViIGJyb3dzZXIgZnJvbSB0aGUgbGlzdFxyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBhcHBsaWNhdGlvbiB3aWxsIHRoZW4gcnVuIGluIGEgYnJvd3Nlci5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgVGVzdEVudGl0eVN5c3RlbSgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgVXBkYXRlR2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoQ2FuRHJhdylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGF0ZVRpbWUgbm93ID0gRGF0ZVRpbWUuTm93O1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlY3MgPSAobm93IC0gbGFzdCkuVG90YWxTZWNvbmRzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlY3MgPiAwLjA4KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoc2Vjcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VjcyA9IDAuMDg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkID0gZ3IuR2V0Qm9hcmQoKTtcclxuICAgICAgICAgICAgICAgIGdyLkRyYXcoKGZsb2F0KXNlY3MpO1xyXG4gICAgICAgICAgICAgICAgbGFzdCA9IG5vdztcclxuICAgICAgICAgICAgICAgIGdyLklucHV0VW5pY29kZSA9IGJ1ZmZlclVuaWNvZGU7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJVbmljb2RlID0gLTE7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG1vdXNlWCA9IFNjcmlwdC5DYWxsPGludD4oXCJnZXRNb3VzZVhcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW91c2VZID0gU2NyaXB0LkNhbGw8aW50PihcImdldE1vdXNlWVwiKTtcclxuICAgICAgICAgICAgICAgIGdyLk1vdXNlLnBvcyA9IG5ldyBQb2ludDJEKG1vdXNlWCwgbW91c2VZKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLzs7U2NyaXB0LkNhbGwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgVGV4dEJvYXJkLkhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgVGV4dEJvYXJkLldpZHRoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWF1eC5TYW1lQXMoVGV4dEJvYXJkLCB4OiBpLCB5OiBqKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50IHRjSSA9IFRleHRCb2FyZC5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgY29sb3IgPSBjb2xvcnNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGNJIDwgMCkgeyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRjSSA+PSBjb2xvcnMuTGVuZ3RoKSB7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gY29sb3JzW3RjSV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgYmFja0NvbG9yID0gY29sb3JzW1RleHRCb2FyZC5CYWNrQ29sb3JbaSwgal1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhciBAY2hhciA9IFRleHRCb2FyZC5DaGFyQXQoaSwgaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTY3JpcHQuQ2FsbChcImRyYXdcIiwgaSwgaiwgY29sb3IsIGJhY2tDb2xvciwgXCJcIiArIEBjaGFyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eC5Db3B5KFRleHRCb2FyZCwgeDogaSwgeTogaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NjcmlwdC5DYWxsKFwiZHJhd1wiLCBpLCBqLCBjb2xvcnNbVGV4dEJvYXJkLlRleHRDb2xvcltpLCBqXV0sIGNvbG9yc1tUZXh0Qm9hcmQuQmFja0NvbG9yW2ksIGpdXSwgXCJ4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDYW5EcmF3ID0gU2NyaXB0LkNhbGw8Ym9vbD4oXCJpc1JlYWR5VG9EcmF3XCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgV2luZG93LlNldFRpbWVvdXQoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbilVcGRhdGVHYW1lLCAxNSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscy5BcnJheUV4dGVuc2lvbnM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5SZWZsZWN0aW9uO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgT2JqZWN0RXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IE1ldGhvZEluZm8gQ2xvbmVNZXRob2QgPSB0eXBlb2YoT2JqZWN0KS5HZXRNZXRob2QoXCJNZW1iZXJ3aXNlQ2xvbmVcIiwgQmluZGluZ0ZsYWdzLk5vblB1YmxpYyB8IEJpbmRpbmdGbGFncy5JbnN0YW5jZSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBJc1ByaW1pdGl2ZU1ldGhvZCh0aGlzIFR5cGUgdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IHR5cGVvZihTdHJpbmcpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gdHlwZW9mKGludCkpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSB0eXBlb2YoZmxvYXQpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gdHlwZW9mKGRvdWJsZSkpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSB0eXBlb2YoY2hhcikpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAvL2Jvb2wgaXNQcmltaXRpdmUgPSB0eXBlLklzUHJpbWl0aXZlO1xyXG4gICAgICAgICAgICBib29sIGlzVmFsdWVUeXBlID0gdHlwZS5Jc1ZhbHVlVHlwZTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzVmFsdWVUeXBlOyAvLyYgaXNQcmltaXRpdmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIE9iamVjdCBDb3B5KHRoaXMgT2JqZWN0IG9yaWdpbmFsT2JqZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEludGVybmFsQ29weShvcmlnaW5hbE9iamVjdCwgbmV3IERpY3Rpb25hcnk8T2JqZWN0LCBPYmplY3Q+KG5ldyBSZWZlcmVuY2VFcXVhbGl0eUNvbXBhcmVyKCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgT2JqZWN0IEludGVybmFsQ29weShPYmplY3Qgb3JpZ2luYWxPYmplY3QsIElEaWN0aW9uYXJ5PE9iamVjdCwgT2JqZWN0PiB2aXNpdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG9yaWdpbmFsT2JqZWN0ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB2YXIgdHlwZVRvUmVmbGVjdCA9IG9yaWdpbmFsT2JqZWN0LkdldFR5cGUoKTtcclxuICAgICAgICAgICAgaWYgKElzUHJpbWl0aXZlTWV0aG9kKHR5cGVUb1JlZmxlY3QpKSByZXR1cm4gb3JpZ2luYWxPYmplY3Q7XHJcbiAgICAgICAgICAgIGlmICh2aXNpdGVkLkNvbnRhaW5zS2V5KG9yaWdpbmFsT2JqZWN0KSkgcmV0dXJuIHZpc2l0ZWRbb3JpZ2luYWxPYmplY3RdO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mKERlbGVnYXRlKS5Jc0Fzc2lnbmFibGVGcm9tKHR5cGVUb1JlZmxlY3QpKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGNsb25lT2JqZWN0ID0gQ2xvbmVNZXRob2QuSW52b2tlKG9yaWdpbmFsT2JqZWN0LCBuZXcgb2JqZWN0W10geyB9KTtcclxuICAgICAgICAgICAgaWYgKHR5cGVUb1JlZmxlY3QuSXNBcnJheSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFycmF5VHlwZSA9IHR5cGVUb1JlZmxlY3QuR2V0RWxlbWVudFR5cGUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChJc1ByaW1pdGl2ZU1ldGhvZChhcnJheVR5cGUpID09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEFycmF5IGNsb25lZEFycmF5ID0gKEFycmF5KWNsb25lT2JqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lZEFycmF5LkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlN5c3RlbS5BcnJheSwgaW50W10+KSgoYXJyYXksIGluZGljZXMpID0+IGFycmF5LlNldFZhbHVlKEludGVybmFsQ29weShjbG9uZWRBcnJheS5HZXRWYWx1ZShpbmRpY2VzKSwgdmlzaXRlZCksIGluZGljZXMpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZpc2l0ZWQuQWRkKG9yaWdpbmFsT2JqZWN0LCBjbG9uZU9iamVjdCk7XHJcbiAgICAgICAgICAgIENvcHlGaWVsZHMob3JpZ2luYWxPYmplY3QsIHZpc2l0ZWQsIGNsb25lT2JqZWN0LCB0eXBlVG9SZWZsZWN0KTtcclxuICAgICAgICAgICAgUmVjdXJzaXZlQ29weUJhc2VUeXBlUHJpdmF0ZUZpZWxkcyhvcmlnaW5hbE9iamVjdCwgdmlzaXRlZCwgY2xvbmVPYmplY3QsIHR5cGVUb1JlZmxlY3QpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xvbmVPYmplY3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlY3Vyc2l2ZUNvcHlCYXNlVHlwZVByaXZhdGVGaWVsZHMob2JqZWN0IG9yaWdpbmFsT2JqZWN0LCBJRGljdGlvbmFyeTxvYmplY3QsIG9iamVjdD4gdmlzaXRlZCwgb2JqZWN0IGNsb25lT2JqZWN0LCBUeXBlIHR5cGVUb1JlZmxlY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodHlwZVRvUmVmbGVjdC5CYXNlVHlwZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSZWN1cnNpdmVDb3B5QmFzZVR5cGVQcml2YXRlRmllbGRzKG9yaWdpbmFsT2JqZWN0LCB2aXNpdGVkLCBjbG9uZU9iamVjdCwgdHlwZVRvUmVmbGVjdC5CYXNlVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBDb3B5RmllbGRzKG9yaWdpbmFsT2JqZWN0LCB2aXNpdGVkLCBjbG9uZU9iamVjdCwgdHlwZVRvUmVmbGVjdC5CYXNlVHlwZSwgQmluZGluZ0ZsYWdzLkluc3RhbmNlIHwgQmluZGluZ0ZsYWdzLk5vblB1YmxpYywgKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5GaWVsZEluZm8sIGJvb2w+KShpbmZvID0+IGluZm8uSXNQcml2YXRlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgQ29weUZpZWxkcyhvYmplY3Qgb3JpZ2luYWxPYmplY3QsIElEaWN0aW9uYXJ5PG9iamVjdCwgb2JqZWN0PiB2aXNpdGVkLCBvYmplY3QgY2xvbmVPYmplY3QsIFR5cGUgdHlwZVRvUmVmbGVjdCwgQmluZGluZ0ZsYWdzIGJpbmRpbmdGbGFncyA9IEJpbmRpbmdGbGFncy5JbnN0YW5jZSB8IEJpbmRpbmdGbGFncy5Ob25QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuUHVibGljIHwgQmluZGluZ0ZsYWdzLkZsYXR0ZW5IaWVyYXJjaHksIEZ1bmM8RmllbGRJbmZvLCBib29sPiBmaWx0ZXIgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAoRmllbGRJbmZvIGZpZWxkSW5mbyBpbiB0eXBlVG9SZWZsZWN0LkdldEZpZWxkcyhiaW5kaW5nRmxhZ3MpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyICE9IG51bGwgJiYgZmlsdGVyKGZpZWxkSW5mbykgPT0gZmFsc2UpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKElzUHJpbWl0aXZlTWV0aG9kKGZpZWxkSW5mby5GaWVsZFR5cGUpKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbEZpZWxkVmFsdWUgPSBmaWVsZEluZm8uR2V0VmFsdWUob3JpZ2luYWxPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsb25lZEZpZWxkVmFsdWUgPSBJbnRlcm5hbENvcHkob3JpZ2luYWxGaWVsZFZhbHVlLCB2aXNpdGVkKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkSW5mby5TZXRWYWx1ZShjbG9uZU9iamVjdCwgY2xvbmVkRmllbGRWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUIENvcHk8VD4odGhpcyBUIG9yaWdpbmFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChUKUNvcHkoKE9iamVjdClvcmlnaW5hbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBSZWZlcmVuY2VFcXVhbGl0eUNvbXBhcmVyIDogRXF1YWxpdHlDb21wYXJlcjxPYmplY3Q+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCB4LCBvYmplY3QgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBSZWZlcmVuY2VFcXVhbHMoeCwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUob2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmouR2V0SGFzaENvZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmFtZXNwYWNlIEFycmF5RXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgQXJyYXlFeHRlbnNpb25zXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRm9yRWFjaCh0aGlzIEFycmF5IGFycmF5LCBBY3Rpb248QXJyYXksIGludFtdPiBhY3Rpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcnJheS5MZW5ndGggPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgQXJyYXlUcmF2ZXJzZSB3YWxrZXIgPSBuZXcgQXJyYXlUcmF2ZXJzZShhcnJheSk7XHJcbiAgICAgICAgICAgICAgICBkbyBhY3Rpb24oYXJyYXksIHdhbGtlci5Qb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAod2Fsa2VyLlN0ZXAoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGNsYXNzIEFycmF5VHJhdmVyc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnRbXSBQb3NpdGlvbjtcclxuICAgICAgICAgICAgcHJpdmF0ZSBpbnRbXSBtYXhMZW5ndGhzO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEFycmF5VHJhdmVyc2UoQXJyYXkgYXJyYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1heExlbmd0aHMgPSBuZXcgaW50W2FycmF5LlJhbmtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBhcnJheS5SYW5rOyArK2kpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3Roc1tpXSA9IGFycmF5LkdldExlbmd0aChpKSAtIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBQb3NpdGlvbiA9IG5ldyBpbnRbYXJyYXkuUmFua107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIFN0ZXAoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFBvc2l0aW9uLkxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbltpXSA8IG1heExlbmd0aHNbaV0pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQb3NpdGlvbltpXSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGk7IGorKylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUG9zaXRpb25bal0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRGVidWdnZXJcclxuICAgIHtcclxuICAgICAgICBib29sIGRlYnVnZ2luZztcclxuICAgICAgICBpbnQgaWRlbnQ7XHJcbiAgICAgICAgU3RyaW5nQnVpbGRlciBzdHJpbmdCdWlsZGVyID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuXHJcbiAgICAgICAgcHVibGljIERlYnVnZ2VyKGJvb2wgZGVidWdnaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5kZWJ1Z2dpbmcgPSBkZWJ1Z2dpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBQcmludChzdHJpbmcgcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZGVidWdnaW5nKSByZXR1cm47XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgaWRlbnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZSgnICcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBEZWlkZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkZW50ID0gaWRlbnQgLSAyOyA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIElkZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkZW50ID0gaWRlbnQrMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWN0aXZlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFjdGl2ZShib29sIHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkZWJ1Z2dpbmcgPSB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUHJpbnQoT2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuTGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gb2JqLkdldFR5cGUoKTtcclxuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoXCJUeXBlOiBcIik7XHJcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHR5cGUuTmFtZSk7XHJcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kTGluZSgpO1xyXG4gICAgICAgICAgICB2YXIgZmllbGRzID0gdHlwZS5HZXRGaWVsZHMoQmluZGluZ0ZsYWdzLlB1YmxpYyB8IEJpbmRpbmdGbGFncy5Ob25QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZiBpbiBmaWVsZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKCcgJyk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoZi5HZXRWYWx1ZShvYmopKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKCcgJyk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoZi5OYW1lKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kTGluZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKHN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogTW9kdWxlIEhlYWRlciAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcXFxyXG5Nb2R1bGUgTmFtZTogIERlZXBDbG9uZUhlbHBlci5jc1xyXG5Qcm9qZWN0OiAgICAgIENTRGVlcENsb25lT2JqZWN0XHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuVGhlIGNsYXNzIGNvbnRhaW5zIHRoZSBtZXRob2RzIHRoYXQgaW1wbGVtZW50IGRlZXAgY2xvbmUgdXNpbmcgcmVmbGVjdGlvbi5cclxuXHJcblRoaXMgc291cmNlIGlzIHN1YmplY3QgdG8gdGhlIE1pY3Jvc29mdCBQdWJsaWMgTGljZW5zZS5cclxuU2VlIGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9lbi11cy9vcGVubmVzcy9saWNlbnNlcy5hc3B4I01QTC5cclxuQWxsIG90aGVyIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcblRISVMgQ09ERSBBTkQgSU5GT1JNQVRJT04gSVMgUFJPVklERUQgXCJBUyBJU1wiIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIFxyXG5FSVRIRVIgRVhQUkVTU0VEIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIElNUExJRUQgXHJcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORC9PUiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS5cclxuXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5SZWZsZWN0aW9uO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBEZWVwQ2xvbmVIZWxwZXJcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBEZWJ1Z2dlciBkZWJ1ZyA9IG5ldyBEZWJ1Z2dlcihmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gR2V0IHRoZSBkZWVwIGNsb25lIG9mIGFuIG9iamVjdC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUXCI+VGhlIHR5cGUgb2YgdGhlIG9iai48L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj5JdCBpcyB0aGUgb2JqZWN0IHVzZWQgdG8gZGVlcCBjbG9uZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5SZXR1cm4gdGhlIGRlZXAgY2xvbmUuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBEZWVwQ2xvbmU8VD4oVCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAob2JqID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJPYmplY3QgaXMgbnVsbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKFQpQ2xvbmVQcm9jZWR1cmUob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEZWVwQ29weVBhcnRpYWwoT2JqZWN0IGZyb20sIE9iamVjdCB0bylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChmcm9tID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJPYmplY3QgaXMgbnVsbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDb3B5UHJvY2VkdXJlUGFydGlhbChmcm9tLCB0byk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSBtZXRob2QgaW1wbGVtZW50cyBkZWVwIGNsb25lIHVzaW5nIHJlZmxlY3Rpb24uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj5JdCBpcyB0aGUgb2JqZWN0IHVzZWQgdG8gZGVlcCBjbG9uZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5SZXR1cm4gdGhlIGRlZXAgY2xvbmUuPC9yZXR1cm5zPlxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIG9iamVjdCBDbG9uZVByb2NlZHVyZShPYmplY3Qgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChvYmogPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFR5cGUgdHlwZSA9IG9iai5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludChcIkNsb25pbmc6IFwiICsgdHlwZSk7XHJcbiAgICAgICAgICAgIC8vZGVidWcuUHJpbnQodHlwZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgdHlwZSBvZiBvYmplY3QgaXMgdGhlIHZhbHVlIHR5cGUsIHdlIHdpbGwgYWx3YXlzIGdldCBhIG5ldyBvYmplY3Qgd2hlbiBcclxuICAgICAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdCBpcyBhc3NpZ25lZCB0byBhbm90aGVyIHZhcmlhYmxlLiBTbyBpZiB0aGUgdHlwZSBvZiB0aGUgXHJcbiAgICAgICAgICAgIC8vIG9iamVjdCBpcyBwcmltaXRpdmUgb3IgZW51bSwgd2UganVzdCByZXR1cm4gdGhlIG9iamVjdC4gV2Ugd2lsbCBwcm9jZXNzIHRoZSBcclxuICAgICAgICAgICAgLy8gc3RydWN0IHR5cGUgc3Vic2VxdWVudGx5IGJlY2F1c2UgdGhlIHN0cnVjdCB0eXBlIG1heSBjb250YWluIHRoZSByZWZlcmVuY2UgXHJcbiAgICAgICAgICAgIC8vIGZpZWxkcy5cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHN0cmluZyB2YXJpYWJsZXMgY29udGFpbiB0aGUgc2FtZSBjaGFycywgdGhleSBhbHdheXMgcmVmZXIgdG8gdGhlIHNhbWUgXHJcbiAgICAgICAgICAgIC8vIHN0cmluZyBpbiB0aGUgaGVhcC4gU28gaWYgdGhlIHR5cGUgb2YgdGhlIG9iamVjdCBpcyBzdHJpbmcsIHdlIGFsc28gcmV0dXJuIHRoZSBcclxuICAgICAgICAgICAgLy8gb2JqZWN0LlxyXG4gICAgICAgICAgICBpZiAodHlwZS5Jc0VudW0gfHwgdHlwZSA9PSB0eXBlb2Yoc3RyaW5nKSB8fCB0eXBlID09IHR5cGVvZihpbnQpIHx8IHR5cGUgPT0gdHlwZW9mKGNoYXIpIHx8IHR5cGUgPT0gdHlwZW9mKGZsb2F0KSB8fCB0eXBlID09IHR5cGVvZihkb3VibGUpIHx8IHR5cGUgPT0gdHlwZW9mKEJvb2xlYW4pKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWcuUHJpbnQodHlwZSArIFwiIFwiICsgb2JqKyBcIiAtVlwiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgdHlwZSBvZiB0aGUgb2JqZWN0IGlzIHRoZSBBcnJheSwgd2UgdXNlIHRoZSBDcmVhdGVJbnN0YW5jZSBtZXRob2QgdG8gZ2V0XHJcbiAgICAgICAgICAgIC8vIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBhcnJheS4gV2UgYWxzbyBwcm9jZXNzIHJlY3Vyc2l2ZWx5IHRoaXMgbWV0aG9kIGluIHRoZSBcclxuICAgICAgICAgICAgLy8gZWxlbWVudHMgb2YgdGhlIG9yaWdpbmFsIGFycmF5IGJlY2F1c2UgdGhlIHR5cGUgb2YgdGhlIGVsZW1lbnQgbWF5IGJlIHRoZSByZWZlcmVuY2UgXHJcbiAgICAgICAgICAgIC8vIHR5cGUuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUuSXNBcnJheSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL3N0cmluZyB0eXBlTmFtZSA9IHR5cGUuRnVsbE5hbWUuUmVwbGFjZShcIltdXCIsIHN0cmluZy5FbXB0eSk7XHJcbiAgICAgICAgICAgICAgICAvL2RlYnVnLlByaW50KHR5cGVOYW1lKTtcclxuICAgICAgICAgICAgICAgIFR5cGUgdHlwZUVsZW1lbnQgPSB0eXBlLkdldEVsZW1lbnRUeXBlKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vZGVidWcuUHJpbnQodHlwZUVsZW1lbnQrXCJzc1wiKTtcclxuICAgICAgICAgICAgICAgIHZhciBhcnJheSA9IG9iaiBhcyBBcnJheTtcclxuICAgICAgICAgICAgICAgIGludCBsZW5ndGggPSBhcnJheS5MZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBBcnJheSBjb3BpZWRBcnJheSA9IEFycmF5LkNyZWF0ZUluc3RhbmNlKHR5cGVFbGVtZW50LCBsZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBhcnJheS5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGRlZXAgY2xvbmUgb2YgdGhlIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsIGFycmF5IGFuZCBhc3NpZ24gdGhlIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsb25lIHRvIHRoZSBuZXcgYXJyYXkuXHJcbiAgICAgICAgICAgICAgICAgICAgY29waWVkQXJyYXkuU2V0VmFsdWUoQ2xvbmVQcm9jZWR1cmUoYXJyYXkuR2V0VmFsdWUoaSkpLCBpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29waWVkQXJyYXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHR5cGUgb2YgdGhlIG9iamVjdCBpcyBjbGFzcyBvciBzdHJ1Y3QsIGl0IG1heSBjb250YWluIHRoZSByZWZlcmVuY2UgZmllbGRzLCBcclxuICAgICAgICAgICAgLy8gc28gd2UgdXNlIHJlZmxlY3Rpb24gYW5kIHByb2Nlc3MgcmVjdXJzaXZlbHkgdGhpcyBtZXRob2QgaW4gdGhlIGZpZWxkcyBvZiB0aGUgb2JqZWN0IFxyXG4gICAgICAgICAgICAvLyB0byBnZXQgdGhlIGRlZXAgY2xvbmUgb2YgdGhlIG9iamVjdC4gXHJcbiAgICAgICAgICAgIC8vIFdlIHVzZSBUeXBlLklzVmFsdWVUeXBlIG1ldGhvZCBoZXJlIGJlY2F1c2UgdGhlcmUgaXMgbm8gd2F5IHRvIGluZGljYXRlIGRpcmVjdGx5IHdoZXRoZXIgXHJcbiAgICAgICAgICAgIC8vIHRoZSBUeXBlIGlzIGEgc3RydWN0IHR5cGUuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUuSXNDbGFzc3x8dHlwZS5Jc1ZhbHVlVHlwZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0IGNvcGllZE9iamVjdCA9IEFjdGl2YXRvci5DcmVhdGVJbnN0YW5jZShvYmouR2V0VHlwZSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgYWxsIEZpZWxkSW5mby5cclxuICAgICAgICAgICAgICAgIEZpZWxkSW5mb1tdIGZpZWxkcyA9IHR5cGUuR2V0RmllbGRzKEJpbmRpbmdGbGFncy5QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuTm9uUHVibGljIHwgQmluZGluZ0ZsYWdzLkluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKEZpZWxkSW5mbyBmaWVsZCBpbiBmaWVsZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkZpZWxkOiBcIiArIGZpZWxkLk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCBmaWVsZFZhbHVlID0gZmllbGQuR2V0VmFsdWUob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRWYWx1ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KFwiRmllbGQ6IFwiICsgZmllbGQuTmFtZSArIFwiIGJlaW5nIHNldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBkZWVwIGNsb25lIG9mIHRoZSBmaWVsZCBpbiB0aGUgb3JpZ2luYWwgb2JqZWN0IGFuZCBhc3NpZ24gdGhlIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbG9uZSB0byB0aGUgZmllbGQgaW4gdGhlIG5ldyBvYmplY3QuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLlNldFZhbHVlKGNvcGllZE9iamVjdCwgQ2xvbmVQcm9jZWR1cmUoZmllbGRWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvcGllZE9iamVjdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihcIlRoZSBvYmplY3QgaXMgdW5rbm93biB0eXBlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBvYmplY3QgQ29weVByb2NlZHVyZVBhcnRpYWwoT2JqZWN0IGZyb20sIE9iamVjdCB0bylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChmcm9tID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBUeXBlIHR5cGUgPSBmcm9tLkdldFR5cGUoKTtcclxuXHJcbiAgICAgICAgICAgIGRlYnVnLlByaW50KFwiQ29weWluZyBcIit0eXBlKTtcclxuICAgICAgICAgICAgZGVidWcuSWRlbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB0eXBlIG9mIG9iamVjdCBpcyB0aGUgdmFsdWUgdHlwZSwgd2Ugd2lsbCBhbHdheXMgZ2V0IGEgbmV3IG9iamVjdCB3aGVuIFxyXG4gICAgICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0IGlzIGFzc2lnbmVkIHRvIGFub3RoZXIgdmFyaWFibGUuIFNvIGlmIHRoZSB0eXBlIG9mIHRoZSBcclxuICAgICAgICAgICAgLy8gb2JqZWN0IGlzIHByaW1pdGl2ZSBvciBlbnVtLCB3ZSBqdXN0IHJldHVybiB0aGUgb2JqZWN0LiBXZSB3aWxsIHByb2Nlc3MgdGhlIFxyXG4gICAgICAgICAgICAvLyBzdHJ1Y3QgdHlwZSBzdWJzZXF1ZW50bHkgYmVjYXVzZSB0aGUgc3RydWN0IHR5cGUgbWF5IGNvbnRhaW4gdGhlIHJlZmVyZW5jZSBcclxuICAgICAgICAgICAgLy8gZmllbGRzLlxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgc3RyaW5nIHZhcmlhYmxlcyBjb250YWluIHRoZSBzYW1lIGNoYXJzLCB0aGV5IGFsd2F5cyByZWZlciB0byB0aGUgc2FtZSBcclxuICAgICAgICAgICAgLy8gc3RyaW5nIGluIHRoZSBoZWFwLiBTbyBpZiB0aGUgdHlwZSBvZiB0aGUgb2JqZWN0IGlzIHN0cmluZywgd2UgYWxzbyByZXR1cm4gdGhlIFxyXG4gICAgICAgICAgICAvLyBvYmplY3QuXHJcbiAgICAgICAgICAgIGlmICh0eXBlLklzRW51bSB8fCB0eXBlID09IHR5cGVvZihzdHJpbmcpIHx8IHR5cGUgPT0gdHlwZW9mKGludCkgfHwgdHlwZSA9PSB0eXBlb2YoY2hhcikgfHwgdHlwZSA9PSB0eXBlb2YoZmxvYXQpIHx8IHR5cGUgPT0gdHlwZW9mKGRvdWJsZSkpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWcuUHJpbnQodHlwZSArIFwiIFwiK2Zyb20gKyBcIiAtVlwiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLkRlaWRlbnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmcm9tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGFycmF5cyBub3QgaW1wbGVtZW50ZWRcclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZS5Jc0FycmF5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5EZWlkZW50KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgdHlwZSBvZiB0aGUgb2JqZWN0IGlzIGNsYXNzIG9yIHN0cnVjdCwgaXQgbWF5IGNvbnRhaW4gdGhlIHJlZmVyZW5jZSBmaWVsZHMsIFxyXG4gICAgICAgICAgICAvLyBzbyB3ZSB1c2UgcmVmbGVjdGlvbiBhbmQgcHJvY2VzcyByZWN1cnNpdmVseSB0aGlzIG1ldGhvZCBpbiB0aGUgZmllbGRzIG9mIHRoZSBvYmplY3QgXHJcbiAgICAgICAgICAgIC8vIHRvIGdldCB0aGUgZGVlcCBjbG9uZSBvZiB0aGUgb2JqZWN0LiBcclxuICAgICAgICAgICAgLy8gV2UgdXNlIFR5cGUuSXNWYWx1ZVR5cGUgbWV0aG9kIGhlcmUgYmVjYXVzZSB0aGVyZSBpcyBubyB3YXkgdG8gaW5kaWNhdGUgZGlyZWN0bHkgd2hldGhlciBcclxuICAgICAgICAgICAgLy8gdGhlIFR5cGUgaXMgYSBzdHJ1Y3QgdHlwZS5cclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZS5Jc0NsYXNzIHx8IHR5cGUuSXNWYWx1ZVR5cGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdCBjb3BpZWRPYmplY3QgPSB0bztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgYWxsIEZpZWxkSW5mby5cclxuICAgICAgICAgICAgICAgIEZpZWxkSW5mb1tdIGZpZWxkcyA9IHR5cGUuR2V0RmllbGRzKEJpbmRpbmdGbGFncy5QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuTm9uUHVibGljIHwgQmluZGluZ0ZsYWdzLkluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKEZpZWxkSW5mbyBmaWVsZCBpbiBmaWVsZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkZpZWxkOiBcIiArIGZpZWxkLk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCBmaWVsZFZhbHVlID0gZmllbGQuR2V0VmFsdWUoZnJvbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkVmFsdWUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KFwiRmllbGQ6IFwiICsgZmllbGQuTmFtZSArIFwiIG5vdCBudWxsLCBiZWluZyBzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgZGVlcCBjbG9uZSBvZiB0aGUgZmllbGQgaW4gdGhlIG9yaWdpbmFsIG9iamVjdCBhbmQgYXNzaWduIHRoZSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvbmUgdG8gdGhlIGZpZWxkIGluIHRoZSBuZXcgb2JqZWN0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zy5JZGVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5TZXRWYWx1ZShjb3BpZWRPYmplY3QsIENsb25lUHJvY2VkdXJlKGZpZWxkVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcuRGVpZGVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5EZWlkZW50KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29waWVkT2JqZWN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVidWcuRGVpZGVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKFwiVGhlIG9iamVjdCBpcyB1bmtub3duIHR5cGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgRXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJhbmRvbSBybmcgPSBuZXcgUmFuZG9tKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaHVmZmxlPFQ+KHRoaXMgSUxpc3Q8VD4gbGlzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBuID0gbGlzdC5Db3VudDtcclxuICAgICAgICAgICAgd2hpbGUgKG4gPiAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuLS07XHJcbiAgICAgICAgICAgICAgICBpbnQgayA9IHJuZy5OZXh0KG4gKyAxKTtcclxuICAgICAgICAgICAgICAgIFQgdmFsdWUgPSBsaXN0W2tdO1xyXG4gICAgICAgICAgICAgICAgbGlzdFtrXSA9IGxpc3Rbbl07XHJcbiAgICAgICAgICAgICAgICBsaXN0W25dID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiI3JlZ2lvbiBMaWNlbnNlXHJcbi8qXHJcbk1JVCBMaWNlbnNlXHJcbkNvcHlyaWdodCDCqSAyMDA2IFRoZSBNb25vLlhuYSBUZWFtXHJcblxyXG5BbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXHJcbiNlbmRyZWdpb24gTGljZW5zZVxyXG51c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IFBvaW50MkQgOiBJRXF1YXRhYmxlPFBvaW50MkQ+XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBQb2ludDJEIHplcm9Qb2ludCA9IG5ldyBQb2ludDJEKCk7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFg7XHJcbiAgICAgICAgcHVibGljIGludCBZO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBvaW50MkQgWmVyb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHplcm9Qb2ludDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgUG9pbnQyRChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB4O1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIG1ldGhvZHNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFBvaW50MkQgYSwgUG9pbnQyRCBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuRXF1YWxzKGIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFBvaW50MkQgYSwgUG9pbnQyRCBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICFhLkVxdWFscyhiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhQb2ludDJEIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoWCA9PSBvdGhlci5YKSAmJiAoWSA9PSBvdGhlci5ZKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBFcXVhbHMob2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAob2JqIGlzIFBvaW50MkQpID8gRXF1YWxzKChQb2ludDJEKW9iaikgOiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFggXiBZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcInt7WDp7MH0gWTp7MX19fVwiLCBYLCBZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufVxyXG5cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgc3RhdGljIHB1YmxpYyBjbGFzcyBSYW5kb21TdXBwbGllclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRnVuYzxmbG9hdD4gR2VuZXJhdGV7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IFJhbmdlKGludCBtaW4sIGludCBtYXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpIChHZW5lcmF0ZSgpICogKG1heC1taW4pK21pbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgUmFuZG9tRWxlbWVudDxUPihUW10gYXJyYXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbUmFuZ2UoMCwgYXJyYXkuTGVuZ3RoKV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIiNyZWdpb24gTGljZW5zZVxyXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5Db3B5cmlnaHQgwqkgMjAwNiBUaGUgTW9uby5YbmEgVGVhbVxyXG5cclxuQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xyXG4jZW5kcmVnaW9uIExpY2Vuc2VcclxuXHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkdsb2JhbGl6YXRpb247XHJcbnVzaW5nIFN5c3RlbS5Db21wb25lbnRNb2RlbDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuXHJcbiAgICBwdWJsaWMgc3RydWN0IFJlY3QgOiBJRXF1YXRhYmxlPFJlY3Q+XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZWN0IGVtcHR5UmVjdGFuZ2xlID0gbmV3IFJlY3QoKTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgWDtcclxuICAgICAgICBwdWJsaWMgaW50IFk7XHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aDtcclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodDtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUmVjdCBFbXB0eVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGVtcHR5UmVjdGFuZ2xlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IExlZnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB0aGlzLlg7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgUmlnaHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiAodGhpcy5YICsgdGhpcy5XaWR0aCk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgVG9wXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdGhpcy5ZOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEJvdHRvbVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuICh0aGlzLlkgKyB0aGlzLkhlaWdodCk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBSZWN0KGludCB4LCBpbnQgeSwgaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0geDtcclxuICAgICAgICAgICAgdGhpcy5ZID0geTtcclxuICAgICAgICAgICAgdGhpcy5XaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLkhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShSZWN0IGEsIFJlY3QgYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKGEuWCA9PSBiLlgpICYmIChhLlkgPT0gYi5ZKSAmJiAoYS5XaWR0aCA9PSBiLldpZHRoKSAmJiAoYS5IZWlnaHQgPT0gYi5IZWlnaHQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENvbnRhaW5zKGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKCgodGhpcy5YIDw9IHgpICYmICh4IDwgKHRoaXMuWCArIHRoaXMuV2lkdGgpKSkgJiYgKHRoaXMuWSA8PSB5KSkgJiYgKHkgPCAodGhpcy5ZICsgdGhpcy5IZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKCgodGhpcy5YIDw9IHZhbHVlLlgpICYmICh2YWx1ZS5YIDwgKHRoaXMuWCArIHRoaXMuV2lkdGgpKSkgJiYgKHRoaXMuWSA8PSB2YWx1ZS5ZKSkgJiYgKHZhbHVlLlkgPCAodGhpcy5ZICsgdGhpcy5IZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhQb2ludDJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKCh0aGlzLlggPD0gdmFsdWUuWCkgJiYgKHZhbHVlLlggPCAodGhpcy5YICsgdGhpcy5XaWR0aCkpKSAmJiAodGhpcy5ZIDw9IHZhbHVlLlkpKSAmJiAodmFsdWUuWSA8ICh0aGlzLlkgKyB0aGlzLkhlaWdodCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENvbnRhaW5zKFJlY3QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKCgoKHRoaXMuWCA8PSB2YWx1ZS5YKSAmJiAoKHZhbHVlLlggKyB2YWx1ZS5XaWR0aCkgPD0gKHRoaXMuWCArIHRoaXMuV2lkdGgpKSkgJiYgKHRoaXMuWSA8PSB2YWx1ZS5ZKSkgJiYgKCh2YWx1ZS5ZICsgdmFsdWUuSGVpZ2h0KSA8PSAodGhpcy5ZICsgdGhpcy5IZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oUmVjdCBhLCBSZWN0IGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIShhID09IGIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgT2Zmc2V0KFBvaW50MkQgb2Zmc2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCArPSBvZmZzZXQuWDtcclxuICAgICAgICAgICAgWSArPSBvZmZzZXQuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE9mZnNldChpbnQgb2Zmc2V0WCwgaW50IG9mZnNldFkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYICs9IG9mZnNldFg7XHJcbiAgICAgICAgICAgIFkgKz0gb2Zmc2V0WTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQb2ludDJEIENlbnRlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUG9pbnQyRCgodGhpcy5YICsgdGhpcy5XaWR0aCkgLyAyLCAodGhpcy5ZICsgdGhpcy5IZWlnaHQpIC8gMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluZmxhdGUoaW50IGhvcml6b250YWxWYWx1ZSwgaW50IHZlcnRpY2FsVmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYIC09IGhvcml6b250YWxWYWx1ZTtcclxuICAgICAgICAgICAgWSAtPSB2ZXJ0aWNhbFZhbHVlO1xyXG4gICAgICAgICAgICBXaWR0aCArPSBob3Jpem9udGFsVmFsdWUgKiAyO1xyXG4gICAgICAgICAgICBIZWlnaHQgKz0gdmVydGljYWxWYWx1ZSAqIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0VtcHR5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICgoKCh0aGlzLldpZHRoID09IDApICYmICh0aGlzLkhlaWdodCA9PSAwKSkgJiYgKHRoaXMuWCA9PSAwKSkgJiYgKHRoaXMuWSA9PSAwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhSZWN0IG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMgPT0gb3RoZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBFcXVhbHMob2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAob2JqIGlzIFJlY3QpID8gdGhpcyA9PSAoKFJlY3Qpb2JqKSA6IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcInt7WDp7MH0gWTp7MX0gV2lkdGg6ezJ9IEhlaWdodDp7M319fVwiLCBYLCBZLCBXaWR0aCwgSGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLlggXiB0aGlzLlkgXiB0aGlzLldpZHRoIF4gdGhpcy5IZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSW50ZXJzZWN0cyhSZWN0IHIyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICEocjIuTGVmdCA+IFJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgIHx8IHIyLlJpZ2h0IDwgTGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICB8fCByMi5Ub3AgPiBCb3R0b21cclxuICAgICAgICAgICAgICAgICAgICAgfHwgcjIuQm90dG9tIDwgVG9wXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW50ZXJzZWN0cyhyZWYgUmVjdCB2YWx1ZSwgb3V0IGJvb2wgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gISh2YWx1ZS5MZWZ0ID4gUmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgfHwgdmFsdWUuUmlnaHQgPCBMZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgIHx8IHZhbHVlLlRvcCA+IEJvdHRvbVxyXG4gICAgICAgICAgICAgICAgICAgICB8fCB2YWx1ZS5Cb3R0b20gPCBUb3BcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIE1ldGhvZHNcclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRpbWVTdGFtcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBDdXJyZW50U25hcDtcclxuXHJcbiAgICAgICAgcHVibGljIFRpbWVTdGFtcFNuYXAgR2V0U25hcCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVTdGFtcFNuYXAoQ3VycmVudFNuYXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgdm9pZCBBZHZhbmNlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VycmVudFNuYXAgKz0gZGVsdGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdHJ1Y3QgVGltZVN0YW1wU25hcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBUaW1lU25hcDtcclxuXHJcbiAgICAgICAgcHVibGljIFRpbWVTdGFtcFNuYXAoZmxvYXQgc25hcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRpbWVTbmFwID0gc25hcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIFVuaWNvZGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IFNwYWNlID0gMzI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQga2V5RG93biA9IDQwO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQga2V5TGVmdCA9IDM3O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQga2V5VXAgPSAzODtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGtleVJpZ2h0ID0gMzk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIFVwYXJyb3cyID0gKGNoYXIpMjQ7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgRG93bmFycm93MiA9IChjaGFyKTI1O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIFJpZ2h0YXJyb3cyID0gKGNoYXIpMjY7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgTGVmdGFycm93MiA9IChjaGFyKTI3O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIFVwYXJyb3cgPSAoY2hhcikzMDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBEb3duYXJyb3cgPSAoY2hhcikzMTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBMZWZ0YXJyb3cgPSAoY2hhcikxNztcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBSaWdodGFycm93ID0gKGNoYXIpMTY7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgQXNjaWlHcmlkSG9yID0gKGNoYXIpMTk2O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIEFzY2lpR3JpZFZlciA9IChjaGFyKTE3OTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjaGFyW10gZ3JpZHMgPSBuZXcgY2hhcltdIHtcclxuICAgICAgICAgICAgQXNjaWlHcmlkSG9yLFxyXG4gICAgICAgICAgICBBc2NpaUdyaWRWZXJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY2hhciBBc2NpaUdyaWRVcExlZnQgPSAoY2hhcikyMTc7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjaGFyIEFzY2lpR3JpZFVwUmlnaHQgPSAoY2hhcikgMTkyO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY2hhciBBc2NpaUdyaWRVcFJpZ2h0TGVmdCA9IChjaGFyKTE5MztcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNoYXIgQXNjaWlHcmlkRG93bkxlZnQgPSAoY2hhcikxOTE7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjaGFyIEFzY2lpR3JpZERvd25SaWdodCA9IChjaGFyKTIxODtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNoYXIgQXNjaWlHcmlkRG93blJpZ2h0TGVmdCA9IChjaGFyKTE5NDtcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG4vL3VzaW5nIFN5c3RlbS5EcmF3aW5nO1xyXG51c2luZyBTeXN0ZW0uR2xvYmFsaXphdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIFtTZXJpYWxpemFibGVdXHJcbiAgICBwdWJsaWMgc3RydWN0IFZlY3RvcjJEIDogSUVxdWF0YWJsZTxWZWN0b3IyRD5cclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHplcm9WZWN0b3IgPSBuZXcgVmVjdG9yMkQoMGYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB1bml0VmVjdG9yID0gbmV3IFZlY3RvcjJEKDFmLCAxZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFhWZWN0b3IgPSBuZXcgVmVjdG9yMkQoMWYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB1bml0WVZlY3RvciA9IG5ldyBWZWN0b3IyRCgwZiwgMWYpO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IFg7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IFk7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICAjIHJlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFhJbnQgeyBnZXQgeyByZXR1cm4gKGludClYOyB9IH1cclxuICAgICAgICBwdWJsaWMgaW50IFlJbnQgeyBnZXQgeyByZXR1cm4gKGludClZOyB9IH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0YW50c1xyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFplcm9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB6ZXJvVmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE9uZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRWZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgVW5pdFhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WFZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBVbml0WVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRZVmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRChmbG9hdCB4LCBmbG9hdCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0geDtcclxuICAgICAgICAgICAgdGhpcy5ZID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRChmbG9hdCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgSW50ZXJwb2xhdGVSb3VuZGVkKFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIFZlY3RvcjJEIGVuZFBvc2l0aW9uLCBmbG9hdCByYXRpbylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoc3RhcnRQb3NpdGlvbiAqICgxIC0gcmF0aW8pICsgZW5kUG9zaXRpb24gKiByYXRpbykuUm91bmQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVmVjdG9yMkQgUm91bmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCgoZmxvYXQpTWF0aC5Sb3VuZChYKSwgKGZsb2F0KU1hdGguUm91bmQoWSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBBZGQoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCArPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQWRkKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICsgdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKyB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KCh2MSAqIHYxKSArICh2MiAqIHYyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2UocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAoZmxvYXQpTWF0aC5TcXJ0KCh2MSAqIHYxKSArICh2MiAqIHYyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlU3F1YXJlZChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gKHYxICogdjEpICsgKHYyICogdjIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlU3F1YXJlZChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICh2MSAqIHYxKSArICh2MiAqIHYyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYID0geDtcclxuICAgICAgICAgICAgWSA9IHk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBEaXZpZGUoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC8gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLyB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgRGl2aWRlKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlciwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogZmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEb3QoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERvdChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAob2JqIGlzIFZlY3RvcjJEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRXF1YWxzKChWZWN0b3IyRCl0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFZlY3RvcjJEIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChYID09IG90aGVyLlgpICYmIChZID09IG90aGVyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBSZWZsZWN0KFZlY3RvcjJEIHZlY3RvciwgVmVjdG9yMkQgbm9ybWFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMkQgcmVzdWx0O1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZWZsZWN0KHJlZiBWZWN0b3IyRCB2ZWN0b3IsIHJlZiBWZWN0b3IyRCBub3JtYWwsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFguR2V0SGFzaENvZGUoKSArIFkuR2V0SGFzaENvZGUoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGhTcXVhcmVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoWCAqIFgpICsgKFkgKiBZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNYXgoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHZhbHVlMS5YID4gdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUxLlkgPiB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1heChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCA+IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSA+IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTWluKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh2YWx1ZTEuWCA8IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlMS5ZIDwgdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNaW4ocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggPCB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgPCB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE11bHRpcGx5KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNdWx0aXBseShWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOZWdhdGUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgPSAtdmFsdWUuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5lZ2F0ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTm9ybWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICAgICAgWCAqPSB2YWw7XHJcbiAgICAgICAgICAgIFkgKj0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOb3JtYWxpemUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gdmFsO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHZhbDtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5vcm1hbGl6ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUuWCAqIHZhbDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZS5ZICogdmFsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFN1YnRyYWN0KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFN1YnRyYWN0KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VsdHVyZUluZm8gY3VycmVudEN1bHR1cmUgPSBDdWx0dXJlSW5mby5DdXJyZW50Q3VsdHVyZTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoY3VycmVudEN1bHR1cmUsIFwie3tYOnswfSBZOnsxfX19XCIsIG5ldyBvYmplY3RbXSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlguVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpLCB0aGlzLlkuVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBPcGVyYXRvcnNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAtKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxLlggPT0gdmFsdWUyLlggJiYgdmFsdWUxLlkgPT0gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YICE9IHZhbHVlMi5YIHx8IHZhbHVlMS5ZICE9IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKyhWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKihWZWN0b3IyRCB2YWx1ZSwgZmxvYXQgc2NhbGVGYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKGZsb2F0IHNjYWxlRmFjdG9yLCBWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC8oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAvKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gT3BlcmF0b3JzXHJcbiAgICB9XHJcbn0iLCIvLyBNSVQgTGljZW5zZSAtIENvcHlyaWdodCAoQykgVGhlIE1vbm8uWG5hIFRlYW1cclxuLy8gVGhpcyBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIGRlZmluZWQgaW5cclxuLy8gZmlsZSAnTElDRU5TRS50eHQnLCB3aGljaCBpcyBwYXJ0IG9mIHRoaXMgc291cmNlIGNvZGUgcGFja2FnZS5cclxuXHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkRpYWdub3N0aWNzO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlJ1bnRpbWUuU2VyaWFsaXphdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBzdHJ1Y3QgVmVjdG9yM0QgOiBJRXF1YXRhYmxlPFZlY3RvcjNEPlxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgemVybyA9IG5ldyBWZWN0b3IzRCgwZiwgMGYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCBvbmUgPSBuZXcgVmVjdG9yM0QoMWYsIDFmLCAxZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdW5pdFggPSBuZXcgVmVjdG9yM0QoMWYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdW5pdFkgPSBuZXcgVmVjdG9yM0QoMGYsIDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdW5pdFogPSBuZXcgVmVjdG9yM0QoMGYsIDBmLCAxZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdXAgPSBuZXcgVmVjdG9yM0QoMGYsIDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgZG93biA9IG5ldyBWZWN0b3IzRCgwZiwgLTFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgcmlnaHQgPSBuZXcgVmVjdG9yM0QoMWYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgbGVmdCA9IG5ldyBWZWN0b3IzRCgtMWYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgZm9yd2FyZCA9IG5ldyBWZWN0b3IzRCgwZiwgMGYsIC0xZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgYmFja3dhcmQgPSBuZXcgVmVjdG9yM0QoMGYsIDBmLCAxZik7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgZmxvYXQgWDtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGZsb2F0IFk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBaO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDAsIDAsIDAuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFplcm9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB6ZXJvOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDEsIDEsIDEuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE9uZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIG9uZTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHdpdGggY29tcG9uZW50cyAxLCAwLCAwLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBVbml0WFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRYOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDAsIDEsIDAuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFVuaXRZXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmV0dXJucyBhIDxzZWU+VmVjdG9yMzwvc2VlPiB3aXRoIGNvbXBvbmVudHMgMCwgMCwgMS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgVW5pdFpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBVcFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVwOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIERvd25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBkb3duOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFJpZ2h0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gcmlnaHQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTGVmdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGxlZnQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgRm9yd2FyZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGZvcndhcmQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgQmFja3dhcmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBiYWNrd2FyZDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yM0QoZmxvYXQgeCwgZmxvYXQgeSwgZmxvYXQgeilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHk7XHJcbiAgICAgICAgICAgIHRoaXMuWiA9IHo7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjNEKGZsb2F0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLlogPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yM0QoVmVjdG9yMkQgdmFsdWUsIGZsb2F0IHopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB2YWx1ZS5YO1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB2YWx1ZS5ZO1xyXG4gICAgICAgICAgICB0aGlzLlogPSB6O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIGFkZGl0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmQgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3RvciB0byBhZGQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3RvciB0byBhZGQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIGFkZGl0aW9uLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIEFkZChWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBlcmZvcm1zIHZlY3RvciBhZGRpdGlvbiBvbiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4gYW5kXHJcbiAgICAgICAgLy8vIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUyXCIvPiwgc3RvcmluZyB0aGUgcmVzdWx0IG9mIHRoZVxyXG4gICAgICAgIC8vLyBhZGRpdGlvbiBpbiA8cGFyYW1yZWYgbmFtZT1cInJlc3VsdFwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSByZXN1bHQgb2YgdGhlIHZlY3RvciBhZGRpdGlvbi48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBZGQocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSArIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aICsgdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBDcm9zcyhWZWN0b3IzRCB2ZWN0b3IxLCBWZWN0b3IzRCB2ZWN0b3IyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3Jvc3MocmVmIHZlY3RvcjEsIHJlZiB2ZWN0b3IyLCBvdXQgdmVjdG9yMSk7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWN0b3IxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIENyb3NzKHJlZiBWZWN0b3IzRCB2ZWN0b3IxLCByZWYgVmVjdG9yM0QgdmVjdG9yMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gdmVjdG9yMS5ZICogdmVjdG9yMi5aIC0gdmVjdG9yMi5ZICogdmVjdG9yMS5aO1xyXG4gICAgICAgICAgICB2YXIgeSA9IC0odmVjdG9yMS5YICogdmVjdG9yMi5aIC0gdmVjdG9yMi5YICogdmVjdG9yMS5aKTtcclxuICAgICAgICAgICAgdmFyIHogPSB2ZWN0b3IxLlggKiB2ZWN0b3IyLlkgLSB2ZWN0b3IyLlggKiB2ZWN0b3IxLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0geDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB5O1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlKFZlY3RvcjNEIHZlY3RvcjEsIFZlY3RvcjNEIHZlY3RvcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCByZXN1bHQ7XHJcbiAgICAgICAgICAgIERpc3RhbmNlU3F1YXJlZChyZWYgdmVjdG9yMSwgcmVmIHZlY3RvcjIsIG91dCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguU3FydChyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHZhbHVlMSwgcmVmIHZhbHVlMiwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IChmbG9hdClNYXRoLlNxcnQocmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2VTcXVhcmVkKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHZhbHVlMSwgcmVmIHZhbHVlMiwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2VTcXVhcmVkKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQgPSAodmFsdWUxLlggLSB2YWx1ZTIuWCkgKiAodmFsdWUxLlggLSB2YWx1ZTIuWCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAodmFsdWUxLlkgLSB2YWx1ZTIuWSkgKiAodmFsdWUxLlkgLSB2YWx1ZTIuWSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAodmFsdWUxLlogLSB2YWx1ZTIuWikgKiAodmFsdWUxLlogLSB2YWx1ZTIuWik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIERpdmlkZShWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIERpdmlkZShWZWN0b3IzRCB2YWx1ZTEsIGZsb2F0IHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyB2YWx1ZTI7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIGZsb2F0IGRpdmlzb3IsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aXNvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAqIGZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAvIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aIC8gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERvdChWZWN0b3IzRCB2ZWN0b3IxLCBWZWN0b3IzRCB2ZWN0b3IyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZlY3RvcjEuWCAqIHZlY3RvcjIuWCArIHZlY3RvcjEuWSAqIHZlY3RvcjIuWSArIHZlY3RvcjEuWiAqIHZlY3RvcjIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEb3QocmVmIFZlY3RvcjNEIHZlY3RvcjEsIHJlZiBWZWN0b3IzRCB2ZWN0b3IyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdmVjdG9yMS5YICogdmVjdG9yMi5YICsgdmVjdG9yMS5ZICogdmVjdG9yMi5ZICsgdmVjdG9yMS5aICogdmVjdG9yMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIShvYmogaXMgVmVjdG9yM0QpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdmFyIG90aGVyID0gKFZlY3RvcjNEKW9iajtcclxuICAgICAgICAgICAgcmV0dXJuIFggPT0gb3RoZXIuWCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFkgPT0gb3RoZXIuWSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFogPT0gb3RoZXIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhWZWN0b3IzRCBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBYID09IG90aGVyLlggJiZcclxuICAgICAgICAgICAgICAgICAgICBZID09IG90aGVyLlkgJiZcclxuICAgICAgICAgICAgICAgICAgICBaID09IG90aGVyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KSh0aGlzLlggKyB0aGlzLlkgKyB0aGlzLlopO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGgoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHRoaXMsIHJlZiB6ZXJvLCBvdXQgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLlNxcnQocmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGhTcXVhcmVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHJlc3VsdDtcclxuICAgICAgICAgICAgRGlzdGFuY2VTcXVhcmVkKHJlZiB0aGlzLCByZWYgemVybywgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE11bHRpcGx5KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTXVsdGlwbHkoVmVjdG9yM0QgdmFsdWUxLCBmbG9hdCBzY2FsZUZhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlogKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjNEIHZhbHVlMSwgZmxvYXQgc2NhbGVGYWN0b3IsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAqIHZhbHVlMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHBvaW50aW5nIGluIHRoZSBvcHBvc2l0ZVxyXG4gICAgICAgIC8vLyBkaXJlY3Rpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2ZWN0b3IgdG8gbmVnYXRlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSB2ZWN0b3IgbmVnYXRpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4uPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTmVnYXRlKFZlY3RvcjNEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBuZXcgVmVjdG9yM0QoLXZhbHVlLlgsIC12YWx1ZS5ZLCAtdmFsdWUuWik7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gU3RvcmVzIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHBvaW50aW5nIGluIHRoZSBvcHBvc2l0ZVxyXG4gICAgICAgIC8vLyBkaXJlY3Rpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4gaW4gPHBhcmFtcmVmIG5hbWU9XCJyZXN1bHRcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmVjdG9yIHRvIG5lZ2F0ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSB2ZWN0b3IgdGhhdCB0aGUgbmVnYXRpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4gd2lsbCBiZSBzdG9yZWQgaW4uPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTmVnYXRlKHJlZiBWZWN0b3IzRCB2YWx1ZSwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gLXZhbHVlLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBOb3JtYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTm9ybWFsaXplKHJlZiB0aGlzLCBvdXQgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE5vcm1hbGl6ZShWZWN0b3IzRCB2ZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOb3JtYWxpemUocmVmIHZlY3Rvciwgb3V0IHZlY3Rvcik7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTm9ybWFsaXplKHJlZiBWZWN0b3IzRCB2YWx1ZSwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvcjtcclxuICAgICAgICAgICAgRGlzdGFuY2UocmVmIHZhbHVlLCByZWYgemVybywgb3V0IGZhY3Rvcik7XHJcbiAgICAgICAgICAgIGZhY3RvciA9IDFmIC8gZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlLlggKiBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUuWSAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZS5aICogZmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBSZWZsZWN0KFZlY3RvcjNEIHZlY3RvciwgVmVjdG9yM0Qgbm9ybWFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gSSBpcyB0aGUgb3JpZ2luYWwgYXJyYXlcclxuICAgICAgICAgICAgLy8gTiBpcyB0aGUgbm9ybWFsIG9mIHRoZSBpbmNpZGVudCBwbGFuZVxyXG4gICAgICAgICAgICAvLyBSID0gSSAtICgyICogTiAqICggRG90UHJvZHVjdFsgSSxOXSApKVxyXG4gICAgICAgICAgICBWZWN0b3IzRCByZWZsZWN0ZWRWZWN0b3I7XHJcbiAgICAgICAgICAgIC8vIGlubGluZSB0aGUgZG90UHJvZHVjdCBoZXJlIGluc3RlYWQgb2YgY2FsbGluZyBtZXRob2RcclxuICAgICAgICAgICAgZmxvYXQgZG90UHJvZHVjdCA9ICgodmVjdG9yLlggKiBub3JtYWwuWCkgKyAodmVjdG9yLlkgKiBub3JtYWwuWSkpICsgKHZlY3Rvci5aICogbm9ybWFsLlopO1xyXG4gICAgICAgICAgICByZWZsZWN0ZWRWZWN0b3IuWCA9IHZlY3Rvci5YIC0gKDIuMGYgKiBub3JtYWwuWCkgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgICAgICByZWZsZWN0ZWRWZWN0b3IuWSA9IHZlY3Rvci5ZIC0gKDIuMGYgKiBub3JtYWwuWSkgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgICAgICByZWZsZWN0ZWRWZWN0b3IuWiA9IHZlY3Rvci5aIC0gKDIuMGYgKiBub3JtYWwuWikgKiBkb3RQcm9kdWN0O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlZmxlY3RlZFZlY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZWZsZWN0KHJlZiBWZWN0b3IzRCB2ZWN0b3IsIHJlZiBWZWN0b3IzRCBub3JtYWwsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBJIGlzIHRoZSBvcmlnaW5hbCBhcnJheVxyXG4gICAgICAgICAgICAvLyBOIGlzIHRoZSBub3JtYWwgb2YgdGhlIGluY2lkZW50IHBsYW5lXHJcbiAgICAgICAgICAgIC8vIFIgPSBJIC0gKDIgKiBOICogKCBEb3RQcm9kdWN0WyBJLE5dICkpXHJcblxyXG4gICAgICAgICAgICAvLyBpbmxpbmUgdGhlIGRvdFByb2R1Y3QgaGVyZSBpbnN0ZWFkIG9mIGNhbGxpbmcgbWV0aG9kXHJcbiAgICAgICAgICAgIGZsb2F0IGRvdFByb2R1Y3QgPSAoKHZlY3Rvci5YICogbm9ybWFsLlgpICsgKHZlY3Rvci5ZICogbm9ybWFsLlkpKSArICh2ZWN0b3IuWiAqIG5vcm1hbC5aKTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2ZWN0b3IuWCAtICgyLjBmICogbm9ybWFsLlgpICogZG90UHJvZHVjdDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2ZWN0b3IuWSAtICgyLjBmICogbm9ybWFsLlkpICogZG90UHJvZHVjdDtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2ZWN0b3IuWiAtICgyLjBmICogbm9ybWFsLlopICogZG90UHJvZHVjdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIHN1YnRyYWN0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmQgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIHZlY3RvciB0byBiZSBzdWJ0cmFjdGVkIGZyb20uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgdmVjdG9yIHRvIGJlIHN1YnRyYWN0ZWQgZnJvbSA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIHN1YnRyYWN0aW9uLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFN1YnRyYWN0KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAtPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIHN1YnRyYWN0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmQgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIHZlY3RvciB0byBiZSBzdWJ0cmFjdGVkIGZyb20uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgdmVjdG9yIHRvIGJlIHN1YnRyYWN0ZWQgZnJvbSA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIHRoZSB2ZWN0b3Igc3VidHJhY3Rpb24uPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU3VidHJhY3QocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aIC0gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdHJpbmcgRGVidWdEaXNwbGF5U3RyaW5nXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Db25jYXQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YLlRvU3RyaW5nKCksIFwiICBcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlkuVG9TdHJpbmcoKSwgXCIgIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWi5Ub1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIgc2IgPSBuZXcgU3RyaW5nQnVpbGRlcigzMik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIntYOlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKHRoaXMuWCk7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIiBZOlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKHRoaXMuWSk7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIiBaOlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKHRoaXMuWik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIn1cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBzYi5Ub1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvLy8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8vLyBUcmFuc2Zvcm1zIGEgdmVjdG9yIGJ5IGEgcXVhdGVybmlvbiByb3RhdGlvbi5cclxuICAgICAgICAvLy8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vLy8gPHBhcmFtIG5hbWU9XCJ2ZWNcIj5UaGUgdmVjdG9yIHRvIHRyYW5zZm9ybS48L3BhcmFtPlxyXG4gICAgICAgIC8vLy8vIDxwYXJhbSBuYW1lPVwicXVhdFwiPlRoZSBxdWF0ZXJuaW9uIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIGJ5LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIHRoZSBvcGVyYXRpb24uPC9wYXJhbT5cclxuICAgICAgICAvLyAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFRyYW5zZm9ybShyZWYgVmVjdG9yMyB2ZWMsIHJlZiBRdWF0ZXJuaW9uIHF1YXQsIG91dCBWZWN0b3IzIHJlc3VsdClcclxuICAgICAgICAvLyAgICAgICAge1xyXG4gICAgICAgIC8vXHRcdC8vIFRha2VuIGZyb20gdGhlIE9wZW50VEsgaW1wbGVtZW50YXRpb24gb2YgVmVjdG9yM1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gU2luY2UgdmVjLlcgPT0gMCwgd2UgY2FuIG9wdGltaXplIHF1YXQgKiB2ZWMgKiBxdWF0Xi0xIGFzIGZvbGxvd3M6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyB2ZWMgKyAyLjAgKiBjcm9zcyhxdWF0Lnh5eiwgY3Jvc3MocXVhdC54eXosIHZlYykgKyBxdWF0LncgKiB2ZWMpXHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzIHh5eiA9IHF1YXQuWHl6LCB0ZW1wLCB0ZW1wMjtcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMuQ3Jvc3MocmVmIHh5eiwgcmVmIHZlYywgb3V0IHRlbXApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMy5NdWx0aXBseShyZWYgdmVjLCBxdWF0LlcsIG91dCB0ZW1wMik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkFkZChyZWYgdGVtcCwgcmVmIHRlbXAyLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkNyb3NzKHJlZiB4eXosIHJlZiB0ZW1wLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLk11bHRpcGx5KHJlZiB0ZW1wLCAyLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkFkZChyZWYgdmVjLCByZWYgdGVtcCwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgbWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBPcGVyYXRvcnNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YID09IHZhbHVlMi5YXHJcbiAgICAgICAgICAgICAgICAmJiB2YWx1ZTEuWSA9PSB2YWx1ZTIuWVxyXG4gICAgICAgICAgICAgICAgJiYgdmFsdWUxLlogPT0gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gISh2YWx1ZTEgPT0gdmFsdWUyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgKyhWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yIC0oVmVjdG9yM0QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBWZWN0b3IzRCgtdmFsdWUuWCwgLXZhbHVlLlksIC12YWx1ZS5aKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAtKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAtPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgKihWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKj0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yICooVmVjdG9yM0QgdmFsdWUsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWiAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAqKGZsb2F0IHNjYWxlRmFjdG9yLCBWZWN0b3IzRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlogKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgLyhWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yIC8oVmVjdG9yM0QgdmFsdWUsIGZsb2F0IGRpdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aWRlcjtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5aICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZURhdGFcclxuICAgIHtcclxuICAgICAgICBzdHJpbmcgbGFiZWw7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxUaWNrPiB1bml0cyA9IG5ldyBMaXN0PFRpY2s+KCk7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxpbnQ+IHRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlRGF0YShzdHJpbmcgbGFiZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBGaW5kQnlMYWJlbChMaXN0PE1vdmVEYXRhPiBtb3ZlRGF0YXMsIHN0cmluZyBsYWJlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbW92ZURhdGFzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKG1vdmVEYXRhc1tpXSE9bnVsbClcclxuICAgICAgICAgICAgICAgICAgICBpZiAobW92ZURhdGFzW2ldLmxhYmVsID09IGxhYmVsKSByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUaWNrIFxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIENvbmRpdGlvbiBjb25kaXRpb247XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxvYmplY3Q+IHRoaW5nc1RvSGFwcGVuID0gbmV3IExpc3Q8b2JqZWN0PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGljayhvYmplY3QgYWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpbmdzVG9IYXBwZW4uQWRkKGFjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBDb25kaXRpb25cclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCByZWFkb25seSBDb25kaXRpb25UeXBlIHR5cGU7XHJcbiAgICAgICAgaW50ZXJuYWwgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldDtcclxuICAgICAgICBpbnRlcm5hbCByZWFkb25seSBCYXNlVXRpbHMuVmVjdG9yMkQgdmVjdG9yO1xyXG5cclxuICAgICAgICBwdWJsaWMgQ29uZGl0aW9uKENvbmRpdGlvblR5cGUgdHlwZSwgVGFyZ2V0IHRhcmdldCwgQmFzZVV0aWxzLlZlY3RvcjJEIHZlY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLnZlY3RvciA9IHZlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gQ29uZGl0aW9uVHlwZVxyXG4gICAge1xyXG4gICAgICAgIENhbk1vdmVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU3VtbW9uRW50aXR5XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBlbmVteVdoaWNoO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBWZWN0b3IyRCBwcmVmZXJlbnRpYWxSb3dDb2x1bW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdW1tb25FbnRpdHkoaW50IGVuZW15V2hpY2gsIFZlY3RvcjJEIHByZWZlcmVudGlhbFJvd0NvbHVtbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlXaGljaCA9IGVuZW15V2hpY2g7XHJcbiAgICAgICAgICAgIHRoaXMucHJlZmVyZW50aWFsUm93Q29sdW1uID0gcHJlZmVyZW50aWFsUm93Q29sdW1uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RhdGljIFN1bW1vbkVudGl0eSBFbmVteShpbnQgdiwgVmVjdG9yMkQgdmVjdG9yMkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFN1bW1vbkVudGl0eSh2LCB2ZWN0b3IyRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQW5pbWF0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEFyZWEgYXJlYSA9IG51bGw7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldCA9IFRhcmdldC5Ob25lO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgQW5pbWF0aW9uKFRhcmdldCB0YXJnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcHVibGljIEFuaW1hdGlvbihBcmVhIGFyZWEpXHJcbiAgICAgICAgLy97XHJcbiAgICAgICAgLy8gICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgcHVibGljIEFuaW1hdGlvbihUYXJnZXQgdGFyZ2V0LCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbmltYXRpb24oQXJlYSBhcmVhLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmUsIFRhcmdldCB0YXJnZXQgPSBUYXJnZXQuTm9uZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZUFjdGlvblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBUYXJnZXQgdGFyZ2V0O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXNlVXRpbHMuVmVjdG9yMkQgZGlzdGFuY2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlQWN0aW9uKFRhcmdldCB0YXJnZXQsIEJhc2VVdGlscy5WZWN0b3IyRCBhbW91bnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9IGFtb3VudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERlYWxEYW1hZ2VBY3Rpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldCA9IFRhcmdldC5Ob25lO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBBcmVhIGFyZWE7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBkYW1hZ2U7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudDtcclxuXHJcbiAgICAgICAgcHVibGljIERlYWxEYW1hZ2VBY3Rpb24oQXJlYSBhcmVhLCBpbnQgZGFtYWdlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSBhcmVhO1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gVGFyZ2V0LkFyZWE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQgdGFyZ2V0LCBpbnQgZGFtYWdlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBcmVhXHJcbiAgICB7XHJcbiAgICAgICAgLy9wdWJsaWMgcmVhZG9ubHkgQXJlYSBhcmVhO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBUYXJnZXQgdGFyZ2V0O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBMaXN0PFZlY3RvcjJEPiBwb2ludHMgPSBuZXcgTGlzdDxWZWN0b3IyRD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIEFyZWEoVGFyZ2V0IHRhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBUYXJnZXRcclxuICAgIHtcclxuICAgICAgICBOb25lLCAgU2VsZiwgQ2xvc2VzdFRhcmdldCwgQ2xvc2VzdFRhcmdldFgsIEFyZWEgICBcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBc3luY1Rhc2tzXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBc3luY1RyYWNrXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBEZWxheWVkQWN0aW9uc1xyXG4gICAge1xyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IHRpbWVzID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxJTGlzdD4gbGlzdHMgPSBuZXcgTGlzdDxJTGlzdD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0aW1lcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lc1tpXSAtPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGlmICh0aW1lc1tpXSA8PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEV4ZWN1dGUoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5kVGFzayhpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKGludCBpKTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGQoZmxvYXQgdGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpbWVzLkFkZCh0aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZXMuQ291bnQgPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRW5kVGFzayhpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpbWVzLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbCBpbiBsaXN0cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbC5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQXN5bmNUYXNrU2V0dGVyPFQ+IDogRGVsYXllZEFjdGlvbnNcclxuICAgIHtcclxuICAgICAgICBMaXN0PFQ+IFRvVmFsdWUgPSBuZXcgTGlzdDxUPigpO1xyXG4gICAgICAgIExpc3Q8QWN0aW9uPFQ+PiBzZXR0ZXJzID0gbmV3IExpc3Q8QWN0aW9uPFQ+PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoVCBlLCBBY3Rpb248VD4gc2V0dGVyLCBmbG9hdCB0aW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVG9WYWx1ZS5BZGQoZSk7XHJcbiAgICAgICAgICAgIHNldHRlcnMuQWRkKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248VD4pc2V0dGVyKTtcclxuICAgICAgICAgICAgYmFzZS5BZGQodGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBvdmVycmlkZSB2b2lkIEV4ZWN1dGUoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXR0ZXJzW2ldKFRvVmFsdWVbaV0pO1xyXG4gICAgICAgICAgICBUb1ZhbHVlLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBzZXR0ZXJzLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVTZXR1cFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBwdWJsaWMgQmF0dGxlTWFpbiBiYXR0bGVNYWluO1xyXG4gICAgICAgIHB1YmxpYyBUaW1lU3RhbXAgdGltZVN0YW1wO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlU2V0dXAoaW50IG1vZGUsIGludCBzdGFnZUlkLCBFQ1NNYW5hZ2VyIGVjcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICB0aW1lU3RhbXAgPSBuZXcgVGltZVN0YW1wKCk7XHJcbiAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KHRpbWVTdGFtcCk7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4gPSBuZXcgQmF0dGxlTWFpbihtb2RlLCBlY3MsIHRpbWVTdGFtcCk7XHJcbiAgICAgICAgICAgIHZhciBtY3AgPSBuZXcgTW92ZUNyZWF0b3JQcm9nKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhZ2VzID0gZWNzLlF1aWNrQWNjZXNzb3IxPFN0YWdlRGF0YT4oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaXhlZEF0dGFjayA9IHN0YWdlcy5FbnRpdHkoc3RhZ2VJZCkuR2V0Q29tcG9uZW50PEZpeGVkQXR0YWNrU3RhZ2U+KCk7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJIYW5kUG9vbCA9IGJhdHRsZU1haW4ucGxheWVySGFuZFBvb2w7XHJcbiAgICAgICAgICAgIGlmIChmaXhlZEF0dGFjayAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGZpeGVkQXR0YWNrLm1vdmVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZCgoQmF0dGxlTWFpbi5Nb3ZlVHlwZSlpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFBvb2wuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlKTtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzdGFnZSA9IHN0YWdlcy5Db21wMShzdGFnZUlkKTtcclxuICAgICAgICAgICAgdmFyIGVubXlzID0gc3RhZ2UuZW5lbXlTcGF3bnM7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGVubXlzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5Nb3ZlRGF0YUV4ZWN1dGVyID0gbmV3IE1vdmVEYXRhRXhlY3V0ZXIoYmF0dGxlTWFpbiwgbWNwLm1vdmVEYXRhcywgZWNzLCB0aW1lU3RhbXApO1xyXG5cclxuICAgICAgICAgICAgTGlzdDxzdHJpbmc+IGVudGl0eVJlbmRlclRleHRzID0gbmV3IExpc3Q8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVuZW15RGF0YXMgPSBuZXcgRW5lbXlEYXRhQ3JlYXRvcihlbnRpdHlSZW5kZXJUZXh0cyxtY3ApLmVuZW15RGF0YXM7XHJcbiAgICAgICAgICAgIHZhciBiYXR0bGVTdGF0ZSA9IGJhdHRsZU1haW4uYmF0dGxlU3RhdGU7XHJcblxyXG4gICAgICAgICAgICBiYXR0bGVNYWluLkJhdHRsZUNvbmZpZ3VyZShzdGFnZS5iYXR0bGVDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVuZW15RmFjdG9yeSA9IG5ldyBTcGF3bkVudGl0eUZhY3RvcnkoZWNzLCBlbmVteURhdGFzLCBiYXR0bGVNYWluKTtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5lY3NJbnRlZyA9IG5ldyBFQ1NJbnRlZ3JhdGlvbihlbmVteUZhY3RvcnksIGVjcyk7XHJcbiAgICAgICAgICAgIC8vYmF0dGxlTWFpbi5FbmVteUZhY3RvcnkgPSBlbmVteUZhY3Rvcnk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW5lbXlBaXMgPSBlY3MuUXVpY2tBY2Nlc3NvcjI8RW5lbXlBSSwgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHk+KCk7XHJcbiAgICAgICAgICAgIHZhciBlbmVteUFpU3RhdGVsZXNzID0gZWNzLkNyZWF0ZUFjY2Vzc29yKG5lY2Vzc2FyeTogbmV3IFR5cGVbXSB7IHR5cGVvZihFbmVteUFJKSB9LCBub3Q6IG5ldyBUeXBlW10geyB0eXBlb2YoRW5lbXlBSVN0YXRlKSB9KTtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5FbmVteUdlbmVyYXRlTW92ZXMgPSAoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW5lbXlBaVN0YXRlbGVzcy5MZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZW15QWlTdGF0ZWxlc3MuR2V0KDApLkFkZENvbXBvbmVudDxFbmVteUFJU3RhdGU+KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlbmVteUFpcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWkgPSBlbmVteUFpcy5Db21wMShpKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmF0dGxlciA9IGVuZW15QWlzLkNvbXAyKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhaVN0YXRlID0gZW5lbXlBaXMuRW50aXR5KGkpLkdldENvbXBvbmVudDxFbmVteUFJU3RhdGU+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmVzID0gYWkubW92ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgYWlQcm8gPSAoaisgYWlTdGF0ZS5wcm9ncmVzcykgJSBtb3Zlcy5Db3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmUgPSBtb3Zlc1thaVByb107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb3ZlIGlzIE1vdmVVc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVyLm1vdmVzW2pdID0gKG1vdmUgYXMgTW92ZVVzZSkubW92ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2JlLm1vdmVzW2pdID0gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhaVN0YXRlLnByb2dyZXNzICs9IGJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBkYXRhIHRoYXQgd2lsbCBiZSBhIHBhcnQgb2Ygc3RhZ2VkYXRhIHNvIGVhY2ggc3RhZ2UgY2FuIGhhdmUgaXQncyBjb25maWdcclxuICAgIC8vLyBJdCB3aWxsIGFsc28gYmUgY29udGFpbmVkIGluIGJhdHRsZW1haW4uXHJcbiAgICAvLy8gU2hvdWxkIGJlIHN0YXRpYywgb25jZSBjcmVhdGVkLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVDb25maWdcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgTGlzdDxpbnQ+IGVuZW1pZXNUb1N1bW1vbiA9bmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBib29sIG5lZWRLaWxsQWxsRW5lbWllcyA9IHRydWU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVDb25maWcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVDb25maWcoaW50W10gZW5lbWllc1RvU3VtbW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzVG9TdW1tb24uQWRkUmFuZ2UoZW5lbWllc1RvU3VtbW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVDb25maWcoYm9vbCBuZWVkS2lsbEFsbEVuZW1pZXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5lZWRLaWxsQWxsRW5lbWllcyA9IG5lZWRLaWxsQWxsRW5lbWllcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkhhcHBzO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVNYWluXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8QmF0dGxlRW50aXR5PiBlbnRpdGllcyA9IG5ldyBMaXN0PEJhdHRsZUVudGl0eT4oKTtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlU3RhdGUgYmF0dGxlU3RhdGUgPSBuZXcgQmF0dGxlU3RhdGUoKTtcclxuICAgICAgICBwdWJsaWMgSGFwcE1hbmFnZXIgaGFwcE1hbmFnZXIgPSBuZXcgSGFwcE1hbmFnZXIoKTtcclxuICAgICAgICBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBWZWN0b3IyRD4gbW92ZW1lbnRNb3ZlcyA9IG5ldyBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBWZWN0b3IyRD4oKTtcclxuICAgICAgICAvL0RpY3Rpb25hcnk8TW92ZVR5cGUsIFBvaW50PiBhdHRhY2tNb3ZlcyA9IG5ldyBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBQb2ludD4oKTtcclxuICAgICAgICBNb3ZlVHlwZVtdIGVuZW15TW92ZXM7XHJcbiAgICAgICAgLy9wdWJsaWMgTGlzdDxJbnB1dD4gaW5wdXRzID0gbmV3IExpc3Q8VHVybmJhc2VkLklucHV0PigpO1xyXG4gICAgICAgIHB1YmxpYyBJbnB1dEhvbGRlciBpbnB1dHMgPSBuZXcgSW5wdXRIb2xkZXIoKTtcclxuICAgICAgICBwdWJsaWMgTGlzdDxNb3ZlVHlwZT4gcGxheWVySGFuZEZpeGVkID0gbmV3IExpc3Q8TW92ZVR5cGU+KCk7XHJcbiAgICAgICAgcHVibGljIExpc3Q8TW92ZVR5cGU+IHBsYXllckhhbmRVbmZpeGVkID0gbmV3IExpc3Q8TW92ZVR5cGU+KCk7XHJcbiAgICAgICAgcHVibGljIExpc3Q8TW92ZVR5cGU+IHBsYXllckhhbmRQb29sID0gbmV3IExpc3Q8TW92ZVR5cGU+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCB0aW1lVG9DaG9vc2VNYXggPSAxNWY7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IHRpbWVUb0Nob29zZSA9IC0xO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlUmVzdWx0IGJhdHRsZVJlc3VsdCA9IG5ldyBCYXR0bGVSZXN1bHQoKTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBCYXR0bGVDb25maWd1cmUoQmF0dGxlQ29uZmlnIGJhdHRsZUNvbmZpZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChiYXR0bGVDb25maWcgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlQ29uZmlnID0gbmV3IEJhdHRsZUNvbmZpZyhuZWVkS2lsbEFsbEVuZW1pZXM6dHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5CYXR0bGVDb25maWcgPSBiYXR0bGVDb25maWc7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2UuVmFsID0gMztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnQgbkVuZW1pZXM7XHJcbiAgICAgICAgcHVibGljIE1vdmVEYXRhRXhlY3V0ZXIgTW92ZURhdGFFeGVjdXRlcjtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFRpbWVTdGFtcCB0aW1lU3RhbXA7XHJcbiAgICAgICAgcHJpdmF0ZSBRdWlja0FjY2Vzc29yVHdvPEJhdHRsZUVudGl0eSwgUGlja3VwSW5mbz4gcGlja3VwQWNjZXNzb3I7XHJcbiAgICAgICAgaW50ZXJuYWwgRUNTSW50ZWdyYXRpb24gZWNzSW50ZWc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBY3Rpb24gRW5lbXlHZW5lcmF0ZU1vdmVzO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnIEJhdHRsZUNvbmZpZyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IEJvYXJkV2lkdGggeyBnZXQ7IGludGVybmFsIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQm9hcmRIZWlnaHQgeyBnZXQ7IGludGVybmFsIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlTWFpbihpbnQgbW9kZSwgRUNTTWFuYWdlciBlY3MsIFRpbWVTdGFtcCB0aW1lU3RhbXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3RoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IHRpbWVTdGFtcDtcclxuICAgICAgICAgICAgcGlja3VwQWNjZXNzb3IgPSBlY3MuUXVpY2tBY2Nlc3NvcjI8QmF0dGxlRW50aXR5LCBQaWNrdXBJbmZvPigpO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlVXAsIFZlY3RvcjJELlVuaXRZKTtcclxuICAgICAgICAgICAgbW92ZW1lbnRNb3Zlcy5BZGQoTW92ZVR5cGUuTW92ZURvd24sIC1WZWN0b3IyRC5Vbml0WSk7XHJcbiAgICAgICAgICAgIG1vdmVtZW50TW92ZXMuQWRkKE1vdmVUeXBlLk1vdmVMZWZ0LCAtVmVjdG9yMkQuVW5pdFgpO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlUmlnaHQsIFZlY3RvcjJELlVuaXRYKTtcclxuXHJcbiAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KGJhdHRsZVN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIHBsYXllckhhbmRGaXhlZC5DbGVhcigpO1xyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kRml4ZWQuQWRkKE1vdmVUeXBlLk1vdmVSaWdodCk7XHJcbiAgICAgICAgICAgIHBsYXllckhhbmRGaXhlZC5BZGQoTW92ZVR5cGUuTW92ZUxlZnQpO1xyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kRml4ZWQuQWRkKE1vdmVUeXBlLk1vdmVEb3duKTtcclxuICAgICAgICAgICAgcGxheWVySGFuZEZpeGVkLkFkZChNb3ZlVHlwZS5Nb3ZlVXApO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1vZGUgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFVuZml4ZWQuQWRkKE1vdmVUeXBlLk5vcm1hbFNob3QpO1xyXG4gICAgICAgICAgICAgICAgZW5lbXlNb3ZlcyA9IG5ldyBNb3ZlVHlwZVtdIHtcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlVXAsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZURvd24sXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk5vcm1hbFNob3QsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFVuZml4ZWQuQWRkKE1vdmVUeXBlLkZpcmUpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFVuZml4ZWQuQWRkKE1vdmVUeXBlLkljZSk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kVW5maXhlZC5BZGQoTW92ZVR5cGUuVGh1bmRlcik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGVuZW15TW92ZXMgPSBuZXcgTW92ZVR5cGVbXSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZURvd24sXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVVwLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5GaXJlLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLkljZSxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5UaHVuZGVyLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9wbGF5ZXJIYW5kLkFkZChNb3ZlVHlwZS5Ob3JtYWxTaG90KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIElzVmljdG9yeSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIEJhdHRsZUVudGl0eSBoZXJvID0gbmV3IEJhdHRsZUVudGl0eSgpO1xyXG5cclxuICAgICAgICAgICAgaGVyby5wb3MuU2V0KDEsIDEpO1xyXG4gICAgICAgICAgICBoZXJvLm1pblBvcy5TZXQoMCwgMCk7XHJcbiAgICAgICAgICAgIGhlcm8ubWF4UG9zLlNldCgyLCAyKTtcclxuICAgICAgICAgICAgaGVyby5UeXBlID0gRW50aXR5VHlwZS5oZXJvO1xyXG4gICAgICAgICAgICBoZXJvLmxpZmUgPSAyO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGhlcm8ubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhlcm8ubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGVudGl0aWVzLkFkZChoZXJvKTtcclxuICAgICAgICAgICAgZWNzSW50ZWcuSGVyb0NyZWF0ZWQoaGVybyk7XHJcbiAgICAgICAgICAgIGVjc0ludGVnLlNwYXduRW5lbWllcygpO1xyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9HYW1lRW50aXR5IHBpY2t1cCA9IG5ldyBHYW1lRW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5UeXBlID0gRW50aXR5VHlwZS5waWNrdXA7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5wb3MuU2V0KDAsIDIpO1xyXG4gICAgICAgICAgICAgICAgLy9waWNrdXAubGlmZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5ncmFwaGljID0gNDtcclxuICAgICAgICAgICAgICAgIC8vZW50aXRpZXMuQWRkKHBpY2t1cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIEJhdHRsZUVudGl0eSBwYW5lbEVmZmVjdCA9IG5ldyBCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuVHlwZSA9IEVudGl0eVR5cGUucGFuZWxlZmZlY3Q7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnBvcy5TZXQoMCwgMik7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmxpZmUgPSA1O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5ncmFwaGljID0gNTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QucmFuZG9tUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3TGlmZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3VHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBSYW5kb21Qb3NpdGlvbihwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vICAgIGVudGl0aWVzLkFkZChwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIEJhdHRsZUVudGl0eSBwYW5lbEVmZmVjdCA9IG5ldyBCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuVHlwZSA9IEVudGl0eVR5cGUucGFuZWxlZmZlY3Q7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnBvcy5TZXQoMCwgMik7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmxpZmUgPSA1O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5ncmFwaGljID0gNTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QucmFuZG9tUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3TGlmZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3VHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBSYW5kb21Qb3NpdGlvbihwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vICAgIGVudGl0aWVzLkFkZChwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgUmVzZXQoKTtcclxuICAgICAgICAgICAgRXhlY3V0ZVBoYXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlRW50aXR5IE5ld0JhdHRsZUVudGl0eSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCYXR0bGVFbnRpdHkgYmF0dGxlRW50aXR5ID0gbmV3IEJhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICBlbnRpdGllcy5BZGQoYmF0dGxlRW50aXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIGJhdHRsZUVudGl0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbnRpdGllc1tpXS5saWZlID0gZW50aXRpZXNbaV0ubWF4TGlmZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2UpO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS50dXJuLlZhbCA9IDA7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLnRvdGFsVHVybnMgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsID0gMDtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICBiYXR0bGVSZXN1bHQucmVzdWx0ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSXNPdmVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBiYXR0bGVSZXN1bHQucmVzdWx0ICE9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUaWNrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZpbmlzaFByZXZpb3VzVGljaygpO1xyXG4gICAgICAgICAgICBib29sIGhlcm9BbGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBib29sIGVuZW15QWxpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYm9vbCBwaWNrdXBPYmxpZ2F0b3J5RXhpc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLlR5cGUgPT0gRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5saWZlID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXlBbGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5UeXBlID09IEVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5saWZlID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0FsaXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRoaXMucGlja3VwQWNjZXNzb3IuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBwaWNrdXAgPSBwaWNrdXBBY2Nlc3Nvci5Db21wMihpKTtcclxuICAgICAgICAgICAgICAgIGlmIChwaWNrdXAubmVjZXNzYXJ5Rm9yVmljdG9yeSAmJiBwaWNrdXBBY2Nlc3Nvci5Db21wMShpKS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwaWNrdXBPYmxpZ2F0b3J5RXhpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChiYXR0bGVTdGF0ZS5CYXR0bGVFbmRBY3RpdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghaGVyb0FsaXZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZVJlc3VsdC5yZXN1bHQgPSAyO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCghZW5lbXlBbGl2ZSB8fCAhQmF0dGxlQ29uZmlnLm5lZWRLaWxsQWxsRW5lbWllcykgJiYgIXBpY2t1cE9ibGlnYXRvcnlFeGlzdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVSZXN1bHQucmVzdWx0ID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGJhdHRsZVJlc3VsdC5yZXN1bHQgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaGFwcE1hbmFnZXIuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgdGltZVN0YW1wLkFkdmFuY2UoMSk7XHJcbiAgICAgICAgICAgICAgICBFeGVjdXRlUGhhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aW1lVG9DaG9vc2UgPiAwICYmIGJhdHRsZVN0YXRlLnBoYXNlID09IEJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZVRvQ2hvb3NlIC09IGRlbHRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVUb0Nob29zZSA8PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEZpbmlzaFByZXZpb3VzVGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCYXR0bGVQaGFzZSBwcmV2aW91c1BoYXNlID0gYmF0dGxlU3RhdGUucGhhc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocHJldmlvdXNQaGFzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuSGFuZFJlY2hhcmdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuSGFuZFJlY2hhcmdlOlxyXG4gICAgICAgICAgICAgICAgICAgIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlLlBpY2tIYW5kcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLlBpY2tIYW5kczpcclxuICAgICAgICAgICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5FeGVjdXRlTW92ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cgPj0gYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93LlZhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBub01vcmVVbml0c1RvQWN0VGhpc1R1cm4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgaV9pbml0aWFsID0gYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlfaW5pdGlhbCA8IGVudGl0aWVzLkNvdW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gaV9pbml0aWFsOyBpIDwgZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXRpZXNbaV0uQWxpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub01vcmVVbml0c1RvQWN0VGhpc1R1cm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vTW9yZVVuaXRzVG9BY3RUaGlzVHVybilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhdHRsZVN0YXRlLnR1cm4gPj0gYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZSAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLnJhbmRvbVBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShcIlJBTkRPTSBQT1MhIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJhbmRvbVBvc2l0aW9uKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUudHVybiA9IGJhdHRsZVN0YXRlLnR1cm4gKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLnRvdGFsVHVybnMgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSYW5kb21Qb3NpdGlvbihCYXR0bGVFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUucG9zLlggPSBSYW5kb21TdXBwbGllci5SYW5nZSgwLCA1KTtcclxuICAgICAgICAgICAgZS5wb3MuWSA9IFJhbmRvbVN1cHBsaWVyLlJhbmdlKDAsIDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlIHBoYXNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQmF0dGxlUGhhc2UgcHJldmlvdXNQaGFzZSA9IGJhdHRsZVN0YXRlLnBoYXNlO1xyXG4gICAgICAgICAgICBpZiAocGhhc2UgPT0gcHJldmlvdXNQaGFzZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAocGhhc2UgPT0gQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICB7XHJcblBpZHJvaC5CYXNlVXRpbHMuRXh0ZW5zaW9ucy5TaHVmZmxlPGdsb2JhbDo6UGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGU+KCAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kUG9vbCk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kVW5maXhlZC5DbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgaW50IGNvbW1hbmRzVG9BZGQgPSAzO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmRzVG9BZGQgPiBwbGF5ZXJIYW5kUG9vbC5Db3VudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1RvQWRkID0gcGxheWVySGFuZFBvb2wuQ291bnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvbW1hbmRzVG9BZGQ7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kVW5maXhlZC5BZGQocGxheWVySGFuZFBvb2xbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB0aW1lVG9DaG9vc2UgPSB0aW1lVG9DaG9vc2VNYXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzUGhhc2UgPT0gQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLnR1cm4uVmFsID0gMDtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsID0gMDtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsID0gMTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZS5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUucGhhc2UgPSBwaGFzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBFeGVjdXRlUGhhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBoYXNlID0gYmF0dGxlU3RhdGUucGhhc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocGhhc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlOlxyXG4gICAgICAgICAgICAgICAgICAgIGVjc0ludGVnLlNwYXduRW5lbWllcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVuZW15R2VuZXJhdGVNb3ZlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5IYW5kUmVjaGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLlBpY2tIYW5kczpcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaGkgaW4gcGxheWVySGFuZEZpeGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzLkFkZChuZXcgVHVybmJhc2VkLklucHV0KElucHV0VHlwZS5Nb3ZlLCAoaW50KWhpKSwgSW5wdXRUYWdzLk1PVkVGSVgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaGkgaW4gcGxheWVySGFuZFVuZml4ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1vdmUsIChpbnQpaGkpLCBJbnB1dFRhZ3MuTU9WRVVORklYKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzLkFkZChuZXcgVHVybmJhc2VkLklucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuUmVkbyksIElucHV0VGFncy5NSVNDKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5Eb25lKSwgSW5wdXRUYWdzLk1JU0MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgZW5lbXlFeGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uVHlwZSA9PSBFbnRpdHlUeXBlLmVuZW15KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmVteUV4aXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2lmKGVuZW15RXhpc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaW5wdXRzLkFkZChuZXcgVHVybmJhc2VkLklucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuUHJldmlldyksIElucHV0VGFncy5NSVNDKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmU6XHJcbiAgICAgICAgICAgICAgICAgICAgZWNzSW50ZWcuU3Bhd25FbmVtaWVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgRXhlY3V0ZU1vdmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5wdXREb25lKElucHV0IGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT0gSW5wdXRUeXBlLk1vdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1vdmVUeXBlIGFyZzEgPSAoTW92ZVR5cGUpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIklOUFVUVEVEMVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJIYW5kRml4ZWQuQ29udGFpbnMoYXJnMSkgfHwgcGxheWVySGFuZFVuZml4ZWQuQ29udGFpbnMoYXJnMSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiSU5QVVRURUQyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVDaG9zZW4oYXJnMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTWlzY0JhdHRsZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTWlzY0JhdHRsZUlucHV0IG1pc2MgPSAoTWlzY0JhdHRsZUlucHV0KWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICBpZiAobWlzYyA9PSBNaXNjQmF0dGxlSW5wdXQuUmVkbylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5oZXJvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGUubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUubW92ZXNbaV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50IHZhbHVlID0gZS5tb3Zlc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IC0xIHx8IGkgPT0gYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3Zlc1tpIC0gMV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtaXNjID09IE1pc2NCYXR0bGVJbnB1dC5Eb25lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBCYXR0bGVEZWNpZGVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBoZXJvZXMgPSAwO1xyXG4gICAgICAgICAgICBpbnQgZW5lbWllcyA9IDA7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb2VzKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuQWxpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZW1pZXMrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaGVyb2VzID09IDAgfHwgZW5lbWllcyA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTW92ZUNob3NlbihNb3ZlVHlwZSBtb3ZlVHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGUubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IHZhbHVlID0gZS5tb3Zlc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0gPSAoaW50KSBtb3ZlVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRXhlY3V0ZU1vdmVzKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJibGFcIiArIGJhdHRsZVN0YXRlLnR1cm4uVmFsKTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLlJlYWQoKTtcclxuICAgICAgICAgICAgQmF0dGxlRW50aXR5IGF0dGFja2VyID0gZW50aXRpZXNbYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5XTtcclxuICAgICAgICAgICAgaW50IHR1cm4gPSBiYXR0bGVTdGF0ZS50dXJuO1xyXG4gICAgICAgICAgICBFeGVjdXRlTW92ZShhdHRhY2tlciwgdHVybik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFeGVjdXRlTW92ZShCYXR0bGVFbnRpdHkgYWN0b3IsIGludCB0dXJuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTW92ZURhdGFFeGVjdXRlci5FeGVjdXRlTW92ZShhY3RvciwgdHVybik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IENhbGN1bGF0ZUF0dGFja011bHRpcGxpZXIoQmF0dGxlRW50aXR5IGFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJhc2VEID0gYWN0b3IuZGFtYWdlTXVsdGlwbGllcjtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlICE9IGFjdG9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnBvcyA9PSBhY3Rvci5wb3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VEICo9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJhc2VEO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBDYWxjdWxhdGVEZWZlbmRlck11bHRpcGxpZXIoQmF0dGxlRW50aXR5IGFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJhc2VEID0gMTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlICE9IGFjdG9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnBvcyA9PSBhY3Rvci5wb3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VEICo9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJhc2VEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEJhdHRsZVN0YXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgVmFsdWUgdHVybiA9IG5ldyBWYWx1ZSgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IHRvdGFsVHVybnM7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWYWx1ZSB0dXJuc1BlclBoYXNlID0gbmV3IFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWYWx1ZSBtb3ZlVGlja19Ob3cgPSBuZXcgVmFsdWUoKTtcclxuICAgICAgICAgICAgcHVibGljIGludCBtb3ZlVGlja19Ub3RhbCA9IDA7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgYWN0aW5nRW50aXR5ID0gMDtcclxuICAgICAgICAgICAgcHVibGljIEJhdHRsZVBoYXNlIHBoYXNlO1xyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBCYXR0bGVFbmRBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEJhdHRsZUVudGl0eVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGludCBsaWZlO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgcG9zID0gbmV3IFZlY3RvcjJEKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBtaW5Qb3MgPSBuZXcgVmVjdG9yMkQoKTtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIG1heFBvcyA9IG5ldyBWZWN0b3IyRCgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50W10gbW92ZXMgPSBuZXcgaW50WzEwXTtcclxuICAgICAgICAgICAgcHVibGljIGludCBncmFwaGljO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IGdyYXBoaWNSZXBlYXRlZEluZGV4O1xyXG4gICAgICAgICAgICBwdWJsaWMgZmxvYXQgZGFtYWdlTXVsdGlwbGllciA9IDE7XHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIGRyYXdMaWZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcHVibGljIGJvb2wgZHJhd1R1cm4gPSB0cnVlO1xyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCByYW5kb21Qb3NpdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwdWJsaWMgRWxlbWVudCBlbGVtZW50ID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IG1heExpZmUgPSAzO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEVudGl0eVR5cGUgVHlwZSA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVudGl0eVR5cGUuaGVybztcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIFBvc2l0aW9uVjJEIHsgZ2V0IHsgcmV0dXJuIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQocG9zLlgsIHBvcy5ZKTsgfSB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBEZWFkIHsgZ2V0IHsgcmV0dXJuIGxpZmUgPD0gMDsgfSB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBBbGl2ZSB7IGdldCB7IHJldHVybiAhdGhpcy5EZWFkOyB9IH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBNb3ZlVHlwZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRG9Ob3RoaW5nLFxyXG4gICAgICAgICAgICBNb3ZlVXAsXHJcbiAgICAgICAgICAgIE1vdmVMZWZ0LFxyXG4gICAgICAgICAgICBNb3ZlRG93bixcclxuICAgICAgICAgICAgTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICBOb3JtYWxTaG90LFxyXG4gICAgICAgICAgICBGaXJlLFxyXG4gICAgICAgICAgICBJY2UsXHJcbiAgICAgICAgICAgIFRodW5kZXIsXHJcbiAgICAgICAgICAgIEljZUJvbWIsXHJcbiAgICAgICAgICAgIFRodW5kZXJCb21iLFxyXG4gICAgICAgICAgICBTdW1tb25FbnRpdHlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEhhcHBUYWdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEF0dGFja0hpdCxcclxuICAgICAgICAgICAgQXR0YWNrTWlzcyxcclxuICAgICAgICAgICAgRGFtYWdlVGFrZW4sXHJcbiAgICAgICAgICAgIE1vdmVtZW50RmFpbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gQmF0dGxlUGhhc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVuZW15TW92ZUNob2ljZSxcclxuICAgICAgICAgICAgSGFuZFJlY2hhcmdlLFxyXG4gICAgICAgICAgICBQaWNrSGFuZHMsXHJcbiAgICAgICAgICAgIEV4ZWN1dGVNb3ZlLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gRW50aXR5VHlwZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaGVybywgZW5lbXksIHBpY2t1cCwgcGFuZWxlZmZlY3RcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEVsZW1lbnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZpcmUsIEljZSwgVGh1bmRlcixcclxuICAgICAgICAgICAgTm9uZVxyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIGludCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQm9hcmRXaWR0aD02O3ByaXZhdGUgaW50IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Cb2FyZEhlaWdodD0zO31cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBWYWx1ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBWYWwgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW51bSB2YWxBc0VudW0geyBzZXQgeyBWYWwgPSBDb252ZXJ0LlRvU2luZ2xlKHZhbHVlKTsgfSB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0KGludCB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmFsID0gdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmFsdWUgb3BlcmF0b3IgKyhWYWx1ZSBjMSwgZmxvYXQgYzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjMS5WYWwgKz0gYzI7XHJcbiAgICAgICAgICAgIHJldHVybiBjMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgb3BlcmF0b3IgLShWYWx1ZSBjMSwgZmxvYXQgYzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYzEuVmFsIC0gYzI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oVmFsdWUgYzEsIFZhbHVlIGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYm9vbCBjMm51bGwgPSBvYmplY3QuUmVmZXJlbmNlRXF1YWxzKGMyLCBudWxsKTtcclxuICAgICAgICAgICAgYm9vbCBjMW51bGwgPSBvYmplY3QuUmVmZXJlbmNlRXF1YWxzKGMxLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKGMybnVsbCAmJiBjMW51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGMxbnVsbCB8fCBjMm51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYzEuVmFsID09IGMyLlZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciAhPShWYWx1ZSBjMSwgVmFsdWUgYzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBib29sIGMybnVsbCA9IG9iamVjdC5SZWZlcmVuY2VFcXVhbHMoYzIsIG51bGwpO1xyXG4gICAgICAgICAgICBib29sIGMxbnVsbCA9IG9iamVjdC5SZWZlcmVuY2VFcXVhbHMoYzEsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAoYzJudWxsICYmIGMxbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGMxbnVsbCB8fCBjMm51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjMS5WYWwgIT0gYzIuVmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbXBsaWNpdCBvcGVyYXRvciBmbG9hdChWYWx1ZSBkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQuVmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbXBsaWNpdCBvcGVyYXRvciBpbnQoVmFsdWUgZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KWQuVmFsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQmF0dGxlUmVzdWx0XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0cnVjdCBJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBJbnB1dFR5cGUgdHlwZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGFyZzE7XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIElucHV0KElucHV0VHlwZSB0eXBlLCBpbnQgYXJnMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuYXJnMSA9IGFyZzE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSW5wdXQoSW5wdXRUeXBlIHR5cGUsIEVudW0gYXJnMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuYXJnMSA9IENvbnZlcnQuVG9JbnQzMihhcmcxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gSW5wdXRUeXBlXHJcbiAgICB7XHJcbiAgICAgICAgTm9uZSwgTW92ZSwgTWlzY0JhdHRsZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIE1pc2NCYXR0bGVJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIERvbmUsIFJlZG8sIFByZXZpZXdcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENvbG9yU3R1ZmZcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBzdHJpbmcgR29vZE1haW47XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgbmV1dHJhbERhcmsgPSBcIiMxOTAxM2JcIjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBuZXV0cmFsU3Ryb25nID0gXCIjMmMzZTQzXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgc3RyaW5nIEdvb2RTdWI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgc3RyaW5nIEV2aWxNYWluO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nW10gY29sb3JzID0gbmV3IHN0cmluZ1syMF07XHJcblxyXG4gICAgICAgIHN0YXRpYyBDb2xvclN0dWZmKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY29sb3JzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcnNbaV0gPSBcIiM0MDAwMjBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuSGVyb10gPSBcIiMwMDljOGRcIjtcclxuICAgICAgICAgICAgLy9jb25zdCBzdHJpbmcgaGVyb1N1YiA9IFwiIzAwNWY5MVwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuSGVyb1R1cm5dID0gaGVyb1N1YjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkVuZW15XSA9IFwiI2ZmMDM1M1wiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuR3JpZEhlcm9dID0gaGVyb1N1YjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkRW5lbXldID0gXCIjOGUwMDYwXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXlUdXJuXSA9IFwiIzhlMDA2MFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkJvYXJkXSA9IFwiIzFlNDg2ZVwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLmlucHV0S2V5XSA9IFwiIzY4ODY5MFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLldpbmRvd0xhYmVsXSA9IFwiIzFlNDg2ZVwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkZpcmVBdXJhXSA9IFwiIzc5MzEwMFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkljZUF1cmFdID0gXCIjMDA1NTkwXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuVGh1bmRlckF1cmFdID0gXCIjMDA1ODNkXCI7XHJcblxyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb10gPSBcIiM4YWQ4OTZcIjtcclxuICAgICAgICAgICAgY29uc3Qgc3RyaW5nIGhlcm9TdWIgPSBcIiM0YzZkNTBcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9UdXJuXSA9IGhlcm9TdWI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteV0gPSBcIiNmZjc2OTRcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvXSA9IGhlcm9TdWI7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyBlbmVteXN1YiA9IFwiI2E3NDY0ZlwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEVuZW15XSA9IGVuZW15c3ViO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXlUdXJuXSA9IGVuZW15c3ViO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5Cb2FyZF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuaW5wdXRLZXldID0gXCIjNjg4NjkwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLldpbmRvd0xhYmVsXSA9IFwiIzFlNDg2ZVwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5GaXJlQXVyYV0gPSBcIiM3OTMxMDBcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuSWNlQXVyYV0gPSBcIiMwMDU1OTBcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuVGh1bmRlckF1cmFdID0gXCIjMDA1ODNkXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkZpcmVTaG90XSA9IFwiI2Y4MmIzNlwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5JY2VTaG90XSA9IFwiIzAwN2VmZlwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5UaHVuZGVyU2hvdF0gPSBcIiNhMzdjMDBcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQmFja2dyb3VuZElucHV0XSA9IFwiIzA4MDgwOFwiO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLmlucHV0S2V5XSA9IFwiIzlFODY2NFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5JbnB1dERlc2NyaXB0aW9uXSA9IFwiIzgwODA4MFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5CYWNrQmF0dGxlXSA9IFwiIzAwMDAwMFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5CYWNrZ3JvdW5kSW5wdXRdID0gXCIjMUExQTFBXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvVHVybl0gPSBcIiMwMEIyQjJcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15VHVybl0gPSBcIiNGRjAwNDBcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvXSA9IFwiIzAwNDY4Q1wiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEVuZW15XSA9IFwiIzhDMDAyM1wiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb10gPSBcIiM2NkZGRkZcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15XSA9IFwiI0Q5MDAzNlwiO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dID0gXCIjQkZCRkJGXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteV0gPSBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb107XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvVHVybl0gPSBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb107XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteVR1cm5dID0gY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbF0gPSBcIiM2NjY2NjZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQmFja0NvbW1hbmRdID0gXCIjMzMzMzMzXCI7XHJcblxyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5GaXJlQXVyYV0gPSBcIiNGRjhDNjZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuSWNlQXVyYV0gPSBcIiM2NkZGRkZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuVGh1bmRlckF1cmFdID0gXCIjRkZGRjY2XCI7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuRGVidWdFeHRyYVxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIERlYnVnRXhcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgTGlzdDxzdHJpbmc+IG1lc3NhZ2VzID0gbmV3IExpc3Q8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTG9nKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWVzc2FnZXMuQWRkKHYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFNob3coKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29uc29sZS5DbGVhcigpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBtZXNzYWdlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDb25zb2xlLlJlYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBpbnRlcm5hbCBjbGFzcyBFQ1NJbnRlZ3JhdGlvblxyXG4gICAge1xyXG5cclxuICAgICAgICBTcGF3bkVudGl0eUZhY3RvcnkgZW5lbXlGYWN0b3J5O1xyXG4gICAgICAgIEVDU01hbmFnZXIgZWNzO1xyXG5cclxuICAgICAgICBwdWJsaWMgRUNTSW50ZWdyYXRpb24oU3Bhd25FbnRpdHlGYWN0b3J5IGVuZW15RmFjdG9yeSwgRUNTTWFuYWdlciBlY3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15RmFjdG9yeSA9IGVuZW15RmFjdG9yeTtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEhlcm9DcmVhdGVkKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGhlcm8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChoZXJvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU3Bhd25FbmVtaWVzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVuZW15RmFjdG9yeS5TcGF3bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRW5lbXlBSVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBMaXN0PG9iamVjdD4gbW92ZXMgPSBuZXcgTGlzdDxvYmplY3Q+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEVuZW15QUlTdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgcHJvZ3Jlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdmVVc2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IG1vdmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlVXNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVVzZShpbnQgbW92ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSA9IG1vdmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTcGF3bkVudGl0eUZhY3RvcnlcclxuICAgIHtcclxuXHJcbiAgICAgICAgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgTGlzdDxFbmVteURhdGE+IGVuZW15RGF0YXM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBCYXR0bGVNYWluIGJhdHRsZU1haW47XHJcbiAgICAgICAgcHJpdmF0ZSBRdWlja0FjY2Vzc29yT25lPFNwYXduRGF0YT4gc3Bhd25zO1xyXG5cclxuICAgICAgICBwdWJsaWMgU3Bhd25FbnRpdHlGYWN0b3J5KEVDU01hbmFnZXIgZWNzLCBMaXN0PEVuZW15RGF0YT4gZW5lbXlEYXRhcywgQmF0dGxlTWFpbiBiYXR0bGVNYWluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIC8vZWNzLlF1aWNrQWNjZXNzb3IxPEVuZW15RGF0YT4oKTtcclxuICAgICAgICAgICAgc3Bhd25zID0gZWNzLlF1aWNrQWNjZXNzb3IxPFNwYXduRGF0YT4oKTtcclxuICAgICAgICAgICAgdGhpcy5lbmVteURhdGFzID0gZW5lbXlEYXRhcztcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVNYWluID0gYmF0dGxlTWFpbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNwYXduKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBzcGF3bmVkID0gMDtcclxuICAgICAgICAgICAgLy9mb3IgKGludCBpID0gMDsgaSA8IHNwYXducy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB3aGlsZSAoc3Bhd25zLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU3Bhd25EYXRhIHNwYXduID0gc3Bhd25zLkNvbXAxKDApO1xyXG4gICAgICAgICAgICAgICAgc3Bhd25zLkVudGl0eSgwKS5SZW1vdmVDb21wb25lbnQoc3Bhd24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlkID0gc3Bhd24uaWQ7XHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkVudGl0eVR5cGUgZW50VHlwZSA9IChCYXR0bGVNYWluLkVudGl0eVR5cGUpc3Bhd24uZW50aXR5VHlwZTtcclxuICAgICAgICAgICAgICAgIGlmKGVudFR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmUgPSBiYXR0bGVNYWluLk5ld0JhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLlR5cGUgPSBlbnRUeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIFBpY2t1cEluZm8gcGlja3VwID0gbmV3IFBpY2t1cEluZm8odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBpY2t1cEUgPSBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChwaWNrdXApO1xyXG4gICAgICAgICAgICAgICAgICAgIHBpY2t1cEUuQWRkQ29tcG9uZW50KGJlKTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5wb3MgPSBzcGF3bi5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBiZS5saWZlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5tYXhMaWZlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5kcmF3TGlmZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLmRyYXdUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUuZ3JhcGhpYyA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZW50VHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZW15QUkgPSBlbmVteURhdGFzW2lkXS5lbmVteUFJO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmVteSA9IGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KGVuZW15QUkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBiZSA9IGJhdHRsZU1haW4uTmV3QmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUucG9zID0gc3Bhd24ucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgYmUubGlmZSA9IGVuZW15RGF0YXNbaWRdLmhwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLm1heExpZmUgPSBiZS5saWZlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLmdyYXBoaWMgPSBlbmVteURhdGFzW2lkXS5yZW5kZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVudGl0aWVzID0gYmF0dGxlTWFpbi5lbnRpdGllcztcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtICE9IGJlICYmIGl0ZW0uZ3JhcGhpYyA9PSBiZS5ncmFwaGljKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZS5ncmFwaGljUmVwZWF0ZWRJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJlLm1pblBvcyA9IG5ldyBWZWN0b3IyRCgzLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5tYXhQb3MgPSBuZXcgVmVjdG9yMkQoNSwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUuVHlwZSA9IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteTtcclxuICAgICAgICAgICAgICAgICAgICBlbmVteS5BZGRDb21wb25lbnQoYmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVuZW15QUlTdGF0ZSBlbmVteUFpU3RhdGUgPSBuZXcgRW5lbXlBSVN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5lbXlBaVN0YXRlLnByb2dyZXNzID0gc3Bhd25lZDtcclxuICAgICAgICAgICAgICAgICAgICBlbmVteS5BZGRDb21wb25lbnQoZW5lbXlBaVN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJTUEFXTlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzcGF3bmVkKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFBpY2t1cEluZm9cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgYm9vbCBuZWNlc3NhcnlGb3JWaWN0b3J5O1xyXG5cclxuICAgICAgICBwdWJsaWMgUGlja3VwSW5mbyhib29sIG5lY2Vzc2FyeUZvclZpY3RvcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5lY2Vzc2FyeUZvclZpY3RvcnkgPSBuZWNlc3NhcnlGb3JWaWN0b3J5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBpY2t1cEluZm8oKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEVuZW15RGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBFbmVteUFJIGVuZW15QUk7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBocDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHJlbmRlcjtcclxuXHJcbiAgICAgICAgcHVibGljIEVuZW15RGF0YShFbmVteUFJIGVuZW15QUksIGludCBocCwgaW50IHJlbmRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlBSSA9IGVuZW15QUk7XHJcbiAgICAgICAgICAgIHRoaXMuaHAgPSBocDtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIgPSByZW5kZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBFbmVteURhdGFDcmVhdG9yXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxzdHJpbmc+IHJlbmRlclRleHRzO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PEVuZW15RGF0YT4gZW5lbXlEYXRhcyA9IG5ldyBMaXN0PEVuZW15RGF0YT4oKTtcclxuICAgICAgICBNb3ZlQ3JlYXRvclByb2cgbW92ZUNyZWF0b3JQcm9nO1xyXG5cclxuICAgICAgICBwdWJsaWMgRW5lbXlEYXRhQ3JlYXRvcihMaXN0PHN0cmluZz4gcmVuZGVyVGV4dHMsIE1vdmVDcmVhdG9yUHJvZyBtb3ZlQ3JlYXRvclByb2cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZW5kZXJUZXh0cy5BZGQoXCJAXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclRleHRzID0gcmVuZGVyVGV4dHM7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUNyZWF0b3JQcm9nID0gbW92ZUNyZWF0b3JQcm9nO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuICAgICAgICAgICAgICAgIE1vdmVzKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVEb3duLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVVcCwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlcilcclxuICAgICAgICAgICAgICAgICksIGhwOjIsIHJlbmRlclRleHQ6XCIlXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuICAgICAgICAgICAgICAgIE1vdmVzKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZywgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nKVxyXG4gICAgICAgICAgICAgICAgKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiI1wiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcbiAgICAgICAgICAgICAgIE1vdmVzKFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVxyXG4uTW92ZVJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICksIGhwOiA2LCByZW5kZXJUZXh0OiBcIiZcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iLFxyXG4gICAgICAgICAgICAgICAgICAgXCJTdW1tb25cIixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVxyXG4uRmlyZVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICksIGhwOiA0NSwgcmVuZGVyVGV4dDogXCIkXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXAsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVEb3duLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93bixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlXHJcbi5Nb3ZlVXBcclxuXHJcblxyXG4gICAgICAgICAgICAgICApLCBocDogMywgcmVuZGVyVGV4dDogXCJIXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuXHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2UsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb05vdGhpbmcsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVxyXG4uRG9Ob3RoaW5nXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICksIGhwOiAzLCByZW5kZXJUZXh0OiBcIkpcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLkRvTm90aGluZ1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICApLCBocDogMywgcmVuZGVyVGV4dDogXCJMXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuXHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLkRvTm90aGluZ1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICApLCBocDogMywgcmVuZGVyVGV4dDogXCJLXCIpO1xyXG4gICAgICAgICAgICAvL0FkZEVuZW15KGFpOiBBY3Rpb25zKCksIGhwOiAzLCByZW5kZXJUZXh0OiBcIiRcIik7XHJcbiAgICAgICAgICAgIC8vQWRkRW5lbXkoYWk6IEFjdGlvbnMoKSwgaHA6IDUsIHJlbmRlclRleHQ6IFwiI1wiKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIEVuZW15QUkgQWN0aW9ucyhwYXJhbXMgb2JqZWN0W10gb2JzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGFpID0gbmV3IEVuZW15QUkoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBvIGluIG9icylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG8gaXMgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWkubW92ZXMuQWRkKG5ldyBNb3ZlVXNlKChpbnQpbykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG8gaXMgc3RyaW5nKVxyXG4gICAgICAgICAgICAgICAgeyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGFpLm1vdmVzLkFkZChuZXcgTW92ZVVzZShtb3ZlQ3JlYXRvclByb2cuR2V0TW92ZUlkKG8gYXMgc3RyaW5nKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG8gaXMgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVbXSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBvIGFzIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlW10pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhaS5tb3Zlcy5BZGQobmV3IE1vdmVVc2UoKGludClpdGVtKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWkubW92ZXMuQWRkKG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVbXSBNb3ZlcyhwYXJhbXMgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVbXSBtb3ZlcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb3ZlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZGRFbmVteShFbmVteUFJIGFpLCBpbnQgaHAsIHN0cmluZyByZW5kZXJUZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHJlbmRlciA9IHJlbmRlclRleHRzLkNvdW50O1xyXG4gICAgICAgICAgICByZW5kZXJUZXh0cy5BZGQocmVuZGVyVGV4dCk7XHJcbiAgICAgICAgICAgIGVuZW15RGF0YXMuQWRkKG5ldyBFbmVteURhdGEoYWksIGhwLCByZW5kZXIpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU3RhZ2VEYXRhQ3JlYXRvclxyXG4gICAge1xyXG4gICAgICAgIC8vcHVibGljIExpc3Q8U3RhZ2VEYXRhPiBzdGFnZXMgPSBuZXcgTGlzdDxTdGFnZURhdGE+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBFQ1NNYW5hZ2VyIGVjcztcclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlRGF0YUNyZWF0b3IoRUNTTWFuYWdlciBlY3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuXHJcbiAgICAgICAgICAgIC8vQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgIC8vICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAvLyAgRW5lbXkoNSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSksXHJcbiAgICAgICAgICAgIC8vICBFbmVteSg3LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDApKVxyXG4gICAgICAgICAgICAvLyAgKSk7XHJcblxyXG4gICAgICAgICAgICBBZGQobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgwLCAwKSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgyLCAyKSlcclxuICAgICAgICAgICAgICAgICkuSGlkZUxpZmVVSSgpLCBuZXcgRml4ZWRBdHRhY2tTdGFnZSgpKTtcclxuICAgICAgICAgICAgQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhdHRsZUNvbmZpZyhuZWVkS2lsbEFsbEVuZW1pZXM6ZmFsc2UpLFxyXG4gICAgICAgICAgICAgICAgUGlja3VwKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMiwgMSkpLFxyXG4gICAgICAgICAgICAgICAgUGlja3VwKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMCwgMikpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoNCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSlcclxuICAgICAgICAgICAgICAgICkuSGlkZUxpZmVVSSgpLCBuZXcgRml4ZWRBdHRhY2tTdGFnZSgpKTtcclxuICAgICAgICAgICAgQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhdHRsZUNvbmZpZyhuZWVkS2lsbEFsbEVuZW1pZXM6IGZhbHNlKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDIsIDIpKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDEsIDIpKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIDIpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDUsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMikpXHJcbiAgICAgICAgICAgICAgICApLCBuZXcgRml4ZWRBdHRhY2tTdGFnZSgpKTtcclxuICAgICAgICAgICAgQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoNiwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAwKSlcclxuICAgICAgICAgICAgICAgICksIG5ldyBGaXhlZEF0dGFja1N0YWdlKFxyXG4gICAgICAgICAgICAgICAgICAgIChpbnQpQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlKSk7XHJcbiAgICAgICAgICAgIEFkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgICBFbmVteSg0LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKVxyXG4gICAgICAgICAgICAgICApLCBuZXcgRml4ZWRBdHRhY2tTdGFnZShcclxuICAgICAgICAgICAgICAgICAgIChpbnQpQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlKSk7XHJcbiAgICAgICAgICAgIEFkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgICBFbmVteSg1LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKVxyXG4gICAgICAgICAgICAgICApLCBuZXcgRml4ZWRBdHRhY2tTdGFnZShcclxuICAgICAgICAgICAgICAgICAgIChpbnQpQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlKSk7XHJcbiAgICAgICAgICAgIEFkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgRW5lbXkoNSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSksXHJcbiAgICAgICAgICAgICAgRW5lbXkoNywgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAwKSlcclxuICAgICAgICAgICAgICApLCBuZXcgRml4ZWRBdHRhY2tTdGFnZShcclxuICAgICAgICAgICAgICAgICAgKGludClCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUsIChpbnQpQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyICkpO1xyXG4gICAgICAgICAgICBBZGQoXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICBFbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDApKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMikpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAyKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSgyLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgIG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICBFbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAyKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSgyLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDEpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDIsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCYXR0bGVDb25maWcobmV3IGludFtdIHsgMSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBFbmVteSgzLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vLFxyXG4gICAgICAgICAgICAgICAgLy9uZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgLy9uZXcgRW5lbXlTcGF3bkRhdGEoMSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSksXHJcbiAgICAgICAgICAgICAgICAvL25ldyBFbmVteVNwYXduRGF0YSgxLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEFkZChwYXJhbXMgb2JqZWN0W10gY29tcHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGUgPSBlY3MuQ3JlYXRlRW50aXR5KCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGNvbXBzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlLkFkZENvbXBvbmVudChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgU3Bhd25EYXRhIFBpY2t1cChpbnQgdiwgVmVjdG9yMkQgdmVjdG9yMkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNwYXduRGF0YSh2LCB2ZWN0b3IyRCwgKGludClCYXR0bGVNYWluLkVudGl0eVR5cGUucGlja3VwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgU3Bhd25EYXRhIEVuZW15KGludCB2LCBWZWN0b3IyRCB2ZWN0b3IyRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3Bhd25EYXRhKHYsIHZlY3RvcjJELCAoaW50KUJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkKHBhcmFtcyBTdGFnZURhdGFbXSBzdGFnZURhdGExKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gc3RhZ2VEYXRhMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9zdGFnZXMuQWRkUmFuZ2Uoc3RhZ2VEYXRhMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBTdGFnZURhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxTcGF3bkRhdGE+IGVuZW15U3Bhd25zID0gbmV3IExpc3Q8U3Bhd25EYXRhPigpO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVDb25maWcgYmF0dGxlQ29uZmlnO1xyXG4gICAgICAgIHB1YmxpYyBib29sIGhpZGVMaWZlVUkgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlRGF0YSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlRGF0YShwYXJhbXMgU3Bhd25EYXRhW10gc3Bhd25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW5lbXlTcGF3bnMuQWRkUmFuZ2Uoc3Bhd25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFnZURhdGEoQmF0dGxlQ29uZmlnIGJhdHRsZUNvbmZpZywgcGFyYW1zIFNwYXduRGF0YVtdIHNwYXducylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVuZW15U3Bhd25zLkFkZFJhbmdlKHNwYXducyk7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlQ29uZmlnID0gYmF0dGxlQ29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlRGF0YSBIaWRlTGlmZVVJKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGhpZGVMaWZlVUkgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEZpeGVkQXR0YWNrU3RhZ2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IG1vdmVzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgRml4ZWRBdHRhY2tTdGFnZShpbnQgbW92ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdmVzLkFkZChtb3ZlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBGaXhlZEF0dGFja1N0YWdlKHBhcmFtcyBpbnRbXSBtb3ZlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW92ZXMuQWRkUmFuZ2UobW92ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRml4ZWRBdHRhY2tTdGFnZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU3Bhd25EYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBpZDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGVudGl0eVR5cGU7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEJhc2VVdGlscy5WZWN0b3IyRCBwb3NpdGlvbjtcclxuXHJcbiAgICAgICAgcHVibGljIFNwYXduRGF0YSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFNwYXduRGF0YShpbnQgaWQsIFZlY3RvcjJEIHBvc2l0aW9uLCBpbnQgdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLmVudGl0eVR5cGUgPSB0eXBlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuSGFwcHM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNb3ZlRGF0YUV4ZWN1dGVyXHJcbiAgICB7XHJcbiAgICAgICAgQmF0dGxlTWFpbiBiYXR0bGVNYWluO1xyXG4gICAgICAgIExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcztcclxuICAgICAgICBwcml2YXRlIEhhcHBNYW5hZ2VyIGhhcHBNYW5hZ2VyO1xyXG4gICAgICAgIHByaXZhdGUgTGlzdDxCYXR0bGVNYWluLkJhdHRsZUVudGl0eT4gZW50aXRpZXM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBUaW1lU3RhbXAgdGltZVN0YW1wO1xyXG4gICAgICAgIExpc3Q8VmVjdG9yMkQ+IGF1eCA9IG5ldyBMaXN0PFZlY3RvcjJEPigpO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVEYXRhRXhlY3V0ZXIoQmF0dGxlTWFpbiB0dXJuQmFzZSwgTGlzdDxNb3ZlRGF0YT4gbW92ZURhdGFzLCBFQ1NNYW5hZ2VyIGVjcywgVGltZVN0YW1wIHRpbWVTdGFtcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlTWFpbiA9IHR1cm5CYXNlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEYXRhcyA9IG1vdmVEYXRhcztcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIHRoaXMudGltZVN0YW1wID0gdGltZVN0YW1wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRXhlY3V0ZU1vdmUoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgYWN0b3IsIGludCB0dXJuKVxyXG4gICAgICAgIHtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgYmF0dGxlU3RhdGUgPSB0aGlzLmJhdHRsZU1haW4uYmF0dGxlU3RhdGU7XHJcbiAgICAgICAgICAgIGVudGl0aWVzID0gdGhpcy5iYXR0bGVNYWluLmVudGl0aWVzO1xyXG4gICAgICAgICAgICBpbnQgdXNlcklkID0gZW50aXRpZXMuSW5kZXhPZihhY3Rvcik7XHJcblxyXG4gICAgICAgICAgICB2YXIgbW92ZUlkID0gYWN0b3IubW92ZXNbdHVybl07XHJcbiAgICAgICAgICAgIGlmIChtb3ZlSWQgPCAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBtZCA9IG1vdmVEYXRhc1ttb3ZlSWRdO1xyXG4gICAgICAgICAgICBpZiAobWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbCA9IG1kLnVuaXRzLkNvdW50O1xyXG4gICAgICAgICAgICBpbnQgbW92ZVRpY2sgPSBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3c7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbWQudW5pdHNbbW92ZVRpY2tdLnRoaW5nc1RvSGFwcGVuO1xyXG4gICAgICAgICAgICBoYXBwTWFuYWdlciA9IGJhdHRsZU1haW4uaGFwcE1hbmFnZXI7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhIGluIGFjdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYSBpcyBNb3ZlQWN0aW9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVBY3Rpb24gbWEgPSBhIGFzIE1vdmVBY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBtYS5kaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rvci5wb3MgKz0gcDtcclxuICAgICAgICAgICAgICAgICAgICBib29sIGludmFsaWRNb3ZlID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3IucG9zLlggPCBhY3Rvci5taW5Qb3MuWFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhY3Rvci5wb3MuWSA8IGFjdG9yLm1pblBvcy5ZXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGFjdG9yLnBvcy5ZID4gYWN0b3IubWF4UG9zLllcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgYWN0b3IucG9zLlggPiBhY3Rvci5tYXhQb3MuWDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlICE9IGFjdG9yICYmIGUuQWxpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rvci5wb3MgPT0gZS5wb3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZE1vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubGlmZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLmRhbWFnZU11bHRpcGxpZXIgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5wYW5lbGVmZmVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkTW92ZSkgYnJlYWs7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW52YWxpZE1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSW52YWxpZCBtb3ZlIGdlbmVyYXRlXCIgKyBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBhY3RvcklkID0gZW50aXRpZXMuSW5kZXhPZihhY3Rvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENyZWF0ZUhhcHAobWQsIG5ldyBIYXBwTW92ZURhdGEoYWN0b3JJZCksIG5ldyBIYXBwTW92ZW1lbnRGYWlsKGFjdG9yLnBvcykpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZU1haW4uaGFwcE1hbmFnZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5BZGQobmV3IEhhcHAoQmF0dGxlTWFpbi5IYXBwVGFnLk1vdmVtZW50RmFpbCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKGFjdG9ySWQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShhY3Rvci5wb3MuWCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKGFjdG9yLnBvcy5ZKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLnBvcyAtPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhIGlzIERlYWxEYW1hZ2VBY3Rpb24pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRkYSA9IGEgYXMgRGVhbERhbWFnZUFjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0YWNrRWxlbWVudCA9IGRkYS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZGEudGFyZ2V0ID09IFRhcmdldC5BcmVhKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZWEgPSBkZGEuYXJlYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZmVyZW5jZVVzZXJPZkFyZWEgPSBSZXNvbHZlVGFyZ2V0KGFjdG9yLCBlbnRpdGllcywgYXJlYS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgbWlycm9yaW5nWCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rvci5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSkgLy9lbmVtaWVzIGFjdCBvbiBvcHBvc2l0ZSBzaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pcnJvcmluZ1ggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgcG9pbnQgaW4gYXJlYS5wb2ludHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWFyY2hQb3MgPSBwb2ludCAqIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQobWlycm9yaW5nWCwgMSkgKyByZWZlcmVuY2VVc2VyT2ZBcmVhLnBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJTZWFyY2ggcG9pbnQgXCIrc2VhcmNoUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXRpZXNbaV0ucG9zID09IHNlYXJjaFBvcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlYWxEYW1hZ2UoYWN0b3IsIGRkYSwgZW50aXRpZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9maW5kIHRhcmdldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSB0YXJnZXQgPSBSZXNvbHZlVGFyZ2V0KGFjdG9yLCBlbnRpdGllcywgZGRhLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVhbERhbWFnZShhY3RvciwgZGRhLCB0YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhIGlzIFN1bW1vbkVudGl0eSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2UgPSBhIGFzIFN1bW1vbkVudGl0eTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5lbXlXaGljaCA9IHNlLmVuZW15V2hpY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZW15SWQgPSBiYXR0bGVNYWluLkJhdHRsZUNvbmZpZy5lbmVtaWVzVG9TdW1tb25bZW5lbXlXaGljaF07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVudGl0aWVzID0gYmF0dGxlTWFpbi5lbnRpdGllcztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb25zID0gR2V0RW1wdHlTcG90cyhzaWRlOjEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbnMuQ291bnQgPT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBWZWN0b3IyRCBzdW1tb25Qb3MgPSBzZS5wcmVmZXJlbnRpYWxSb3dDb2x1bW47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwb3NpdGlvbnMuQ29udGFpbnMoc3VtbW9uUG9zKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1vblBvcyA9IHBvc2l0aW9uc1swXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQobmV3IFNwYXduRGF0YShlbmVteUlkLCBzdW1tb25Qb3MsIChpbnQpQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYSBpcyBBbmltYXRpb24pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuaW0gPSBhIGFzIEFuaW1hdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSB0YXJnZXQgPSBSZXNvbHZlVGFyZ2V0KGFjdG9yLCBlbnRpdGllcywgYW5pbS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcmVhID0gYW5pbS5hcmVhO1xyXG4gICAgICAgICAgICAgICAgICAgIEhhcHBBcmVhIGhhcHBBcmVhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJlYSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZmVyZW5jZVVzZXJPZkFyZWEgPSBSZXNvbHZlVGFyZ2V0KGFjdG9yLCBlbnRpdGllcywgYXJlYS50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IG1pcnJvcmluZ1ggPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0b3IuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpIC8vZW5lbWllcyBhY3Qgb24gb3Bwb3NpdGUgc2lkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXJyb3JpbmdYID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcEFyZWEgPSBuZXcgSGFwcEFyZWEoYXJlYSwgcmVmZXJlbmNlVXNlck9mQXJlYS5wb3MsIG1pcnJvcmluZ1gpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpbnQgdGFyZ2V0SWQgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldElkID0gZW50aXRpZXMuSW5kZXhPZih0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIENyZWF0ZUhhcHAobWQsIGhhcHBBcmVhLCBuZXcgSGFwcE1vdmVEYXRhKHVzZXJJZCwgdGFyZ2V0SWQsIGFuaW0uZWxlbWVudCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW5pbS50YXJnZXQgIT0gVGFyZ2V0Lk5vbmUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwTWFuYWdlclxyXG4uQWRkKG5ldyBIYXBwKEJhdHRsZU1haW4uSGFwcFRhZy5BdHRhY2tIaXQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKGVudGl0aWVzLkluZGV4T2YodGFyZ2V0KSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUodXNlcklkKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZSgoaW50KWFuaW0uZWxlbWVudCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobW92ZVRpY2sgPT0gbWQudW5pdHMuQ291bnQgLSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBtZC51bml0cylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgYWN0IGluIGl0ZW0udGhpbmdzVG9IYXBwZW4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0IGlzIERlYWxEYW1hZ2VBY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENoYW5nZUVsZW1lbnQoYWN0b3IsIChhY3QgYXMgRGVhbERhbWFnZUFjdGlvbikuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIExpc3Q8VmVjdG9yMkQ+IEdldEVtcHR5U3BvdHMoaW50IHNpZGUgPSAtMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF1eC5DbGVhcigpO1xyXG4gICAgICAgICAgICBpbnQgb2ZmWCA9IDA7XHJcbiAgICAgICAgICAgIGlmIChzaWRlID09IDEpIG9mZlggPSAzO1xyXG4gICAgICAgICAgICBpbnQgd2lkdGggPSBiYXR0bGVNYWluLkJvYXJkV2lkdGggLyAyO1xyXG4gICAgICAgICAgICBpZiAoc2lkZSA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHdpZHRoID0gYmF0dGxlTWFpbi5Cb2FyZFdpZHRoO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgYmF0dGxlTWFpbi5Cb2FyZEhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXguQWRkKG5ldyBWZWN0b3IyRChpK29mZlgsaikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBlbnRpdGllcyA9IGJhdHRsZU1haW4uZW50aXRpZXM7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5BbGl2ZSAmJiBhdXguQ29udGFpbnMoZS5wb3MpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5SZW1vdmUoZS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhdXg7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENoYW5nZUVsZW1lbnQoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgYWN0b3IsIEJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGFjdG9yLmVsZW1lbnQgPT0gZWxlbWVudCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBhY3Rvci5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdmFyIHRoID0gbmV3IEhhcHBUYWdzKChpbnQpTWlzY0hhcHBUYWdzLkNoYW5nZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudCh0aCwgbmV3IEhhcHBNb3ZlRGF0YShlbnRpdGllcy5JbmRleE9mKGFjdG9yKSwgLTEsIGVsZW1lbnQpKS5BZGRDb21wb25lbnQodGltZVN0YW1wLkdldFNuYXAoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ3JlYXRlSGFwcChNb3ZlRGF0YSBtZCwgb2JqZWN0IGNvbXAxLCBvYmplY3QgY29tcDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGggPSBuZXcgSGFwcFRhZ3MobWQudGFncyk7XHJcbiAgICAgICAgICAgIHZhciBlID0gZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQodGgsIHRpbWVTdGFtcC5HZXRTbmFwKCkpO1xyXG4gICAgICAgICAgICBpZiAoY29tcDEgIT0gbnVsbCkgZS5BZGRDb21wb25lbnQoY29tcDEpO1xyXG4gICAgICAgICAgICBpZiAoY29tcDIgIT0gbnVsbCkgZS5BZGRDb21wb25lbnQoY29tcDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENyZWF0ZUhhcHAoaW50IHRhZywgb2JqZWN0IGNvbXAxLCBvYmplY3QgY29tcDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGggPSBuZXcgSGFwcFRhZ3ModGFnKTtcclxuICAgICAgICAgICAgdmFyIGUgPSBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudCh0aCwgdGltZVN0YW1wLkdldFNuYXAoKSk7XHJcbiAgICAgICAgICAgIGlmIChjb21wMSAhPSBudWxsKSBlLkFkZENvbXBvbmVudChjb21wMSk7XHJcbiAgICAgICAgICAgIGlmIChjb21wMiAhPSBudWxsKSBlLkFkZENvbXBvbmVudChjb21wMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRGVhbERhbWFnZShCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBhY3RvciwgRGVhbERhbWFnZUFjdGlvbiBkZGEsIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IHRhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJhdHRsZU1haW4uRWxlbWVudCBhdHRhY2tFbGVtZW50ID0gZGRhLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGJvb2wgZWxlbWVudGFsQmxvY2sgPSBhdHRhY2tFbGVtZW50ID09IHRhcmdldC5lbGVtZW50ICYmIGF0dGFja0VsZW1lbnQgIT0gQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmU7XHJcbiAgICAgICAgICAgIGJvb2wgc3VwZXJFZmZlY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW50IGRhbWFnZSA9IDA7XHJcbiAgICAgICAgICAgIGludCB0YXJnZXRJZCA9IGVudGl0aWVzLkluZGV4T2YodGFyZ2V0KTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRhbEJsb2NrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtZW50YWxCbG9jaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbXVsID0gYmF0dGxlTWFpbi5DYWxjdWxhdGVBdHRhY2tNdWx0aXBsaWVyKGFjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBtdWwgKj0gYmF0dGxlTWFpbi5DYWxjdWxhdGVEZWZlbmRlck11bHRpcGxpZXIodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNrRWxlbWVudCA9PSBCYXR0bGVNYWluLkVsZW1lbnQuRmlyZSAmJiB0YXJnZXQuZWxlbWVudCA9PSBCYXR0bGVNYWluLkVsZW1lbnQuSWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGF0dGFja0VsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIgJiYgdGFyZ2V0LmVsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkZpcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgYXR0YWNrRWxlbWVudCA9PSBCYXR0bGVNYWluLkVsZW1lbnQuSWNlICYmIHRhcmdldC5lbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsICo9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyRWZmZWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYW1hZ2UgPSBkZGEuZGFtYWdlICogKGludCltdWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmxpZmUgLT0gZGFtYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdG9yLmRhbWFnZU11bHRpcGxpZXIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGhhcHBNYW5hZ2VyLkFkZChuZXcgSGFwcChCYXR0bGVNYWluLkhhcHBUYWcuRGFtYWdlVGFrZW4pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUodGFyZ2V0SWQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkNyZWF0ZUhhcHAoKGludClNaXNjSGFwcFRhZ3MuRGFtYWdlLCBuZXcgSGFwcERhbWFnZURhdGEodGFyZ2V0LmVsZW1lbnQsIGRkYS5lbGVtZW50LCBlbnRpdGllcy5JbmRleE9mKHRhcmdldCksIGRhbWFnZSwgc3VwZXJFZmZlY3RpdmUsIGVsZW1lbnRhbEJsb2NrKSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQubGlmZSA8PSAwICYmICFzdXBlckVmZmVjdGl2ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ3JlYXRlSGFwcCgoaW50KU1pc2NIYXBwVGFncy5EZWF0aCwgbmV3IEhhcHBNb3ZlRGF0YSh0YXJnZXRJZCksIG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBSZXNvbHZlVGFyZ2V0KEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGFjdG9yLCBMaXN0PEJhdHRsZU1haW4uQmF0dGxlRW50aXR5PiBlbnRpdGllcywgVGFyZ2V0IHRhcmdldFR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0VHlwZSA9PSBUYXJnZXQuU2VsZikgcmV0dXJuIGFjdG9yO1xyXG4gICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSB0YXJnZXQgPSBudWxsO1xyXG4gICAgICAgICAgICBmbG9hdCBtaW5EaXMgPSAxMDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUyIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGUyLkRlYWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdG9yLlR5cGUgIT0gZTIuVHlwZVxyXG4gICAgICAgICAgICAgICAgICAgICYmIGUyLlR5cGUgIT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBhbmVsZWZmZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgJiYgZTIuVHlwZSAhPSBCYXR0bGVNYWluLkVudGl0eVR5cGUucGlja3VwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgc2FtZUhlaWdodCA9IGFjdG9yLnBvcy5ZID09IGUyLnBvcy5ZO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2FtZUhlaWdodClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IGRpcyA9IGFjdG9yLnBvcy5YIC0gZTIucG9zLlg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXMgPCAwKSBkaXMgKj0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXMgPCBtaW5EaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpcyA9IGRpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGUyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBUYWdzXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8aW50PiB0YWdzID0gbmV3IExpc3Q8aW50PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcFRhZ3MoTGlzdDxpbnQ+IHRhZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ3MuQWRkUmFuZ2UodGFncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcFRhZ3MoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0YWdzLkFkZChpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwVGFncygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gTWlzY0hhcHBUYWdze1xyXG4gICAgICAgIENoYW5nZUVsZW1lbnQgPSA1MDAsXHJcbiAgICAgICAgRGFtYWdlID0gNTAxLFxyXG4gICAgICAgIERlYXRoID0gNTAyXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBEYW1hZ2VEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEJhdHRsZU1haW4uRWxlbWVudCB0YXJnZXRFLCBkYW1hZ2VFO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgdGFyZ2V0O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgYW1vdW50O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBib29sIHN1cGVyRWZmZWN0aXZlO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBib29sIGVsZW1lbnRhbEJsb2NrO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcERhbWFnZURhdGEoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwRGFtYWdlRGF0YShCYXR0bGVNYWluLkVsZW1lbnQgdGFyZ2V0RSwgQmF0dGxlTWFpbi5FbGVtZW50IGRhbWFnZUUsIGludCB0YXJnZXQsIGludCBhbW91bnQsIGJvb2wgc3VwZXJFZmZlY3RpdmUsIGJvb2wgZWxlbWVudGFsQmxvY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldEUgPSB0YXJnZXRFO1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZUUgPSBkYW1hZ2VFO1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5hbW91bnQgPSBhbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3VwZXJFZmZlY3RpdmUgPSBzdXBlckVmZmVjdGl2ZTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50YWxCbG9jayA9IGVsZW1lbnRhbEJsb2NrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcE1vdmVEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCB1c2VyO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgdGFyZ2V0ID0gLTE7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50ID0gQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwTW92ZURhdGEoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwTW92ZURhdGEoaW50IHVzZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBNb3ZlRGF0YShpbnQgdXNlciwgaW50IHRhcmdldCwgQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBNb3ZlbWVudEZhaWxcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVmVjdG9yMkQgbW92ZVRvO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcE1vdmVtZW50RmFpbChWZWN0b3IyRCBtb3ZlVG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVUbyA9IG1vdmVUbztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwTW92ZW1lbnRGYWlsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwQXJlYVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBBcmVhIGFyZWE7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEIG9mZnNldCA9IG5ldyBWZWN0b3IyRCgpO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgbWlycm9yaW5nWDtcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBBcmVhKEFyZWEgYXJlYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEFyZWEoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwQXJlYShBcmVhIGFyZWEsIFZlY3RvcjJEIG9mZnNldCwgaW50IG1pcnJvcmluZ1gpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSBhcmVhO1xyXG4gICAgICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcclxuICAgICAgICAgICAgdGhpcy5taXJyb3JpbmdYID0gbWlycm9yaW5nWDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5EZWJ1Z0V4dHJhO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkhhcHBzXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcE1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IEN1cnJlbnRUaW1lIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIExpc3Q8SGFwcD4gSGFwcHMgPSBuZXcgTGlzdDxIYXBwPigpO1xyXG4gICAgICAgIExpc3Q8SGFwcEhhbmRsZXI+IGhhbmRsZXJzID0gbmV3IExpc3Q8SGFwcEhhbmRsZXI+KCk7XHJcbiAgICAgICAgaW50IGxhdGVzdEhhbmRsZWQgPSAtMTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkSGFuZGxlcihIYXBwSGFuZGxlciBoaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChoaCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUcnlIYW5kbGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYobGF0ZXN0SGFuZGxlZCAhPSBDdXJyZW50VGltZSlcclxuICAgICAgICAgICAgICAgIEhhbmRsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEhhbmRsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYXRlc3RIYW5kbGVkID0gQ3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBoIGluIGhhbmRsZXJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gSGFwcHMuQ291bnQgLSAxOyBpID49IDA7IGktLSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMgY2hlY2sgYXNzdW1lcyBoYXBwcyBhcmUgb3JkZXJlZCBieSB0aW1lIHN0YW1wXHJcbiAgICAgICAgICAgICAgICAgICAgLy93aGljaCB0aGV5IHNob3VsZCBiZSBhdXRvbWF0aWNhbGx5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEhhcHBzW2ldLlRpbWVTdGFtcCAhPSBDdXJyZW50VGltZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlYnVnRXguTG9nKFwiSGFwcGVuaW5nIG5vdCBlcXVhbCB0byBjdXJyZW50IHRpbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBib29sIGhhc1RhZ3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0YWdzTmVlZGVkIGluIGgubmVjZXNzYXJ5VGFncylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghSGFwcHNbaV0uSGFzVGFnKHRhZ3NOZWVkZWQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNUYWdzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFzVGFncylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlYnVnRXguTG9nKFwiSGFwcGVuaW5nIGhhbmRsZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGguSGFuZGxlKEhhcHBzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRGVidWdFeC5Mb2coXCJIYXBwZW5pbmcgdGFnIGlzIGRpZmZlcmVudFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwIEFkZChIYXBwIGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBoLlRpbWVTdGFtcCA9IEN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICBIYXBwcy5BZGQoaCk7XHJcbiAgICAgICAgICAgIHJldHVybiBoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDdXJyZW50VGltZSsrO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcFxyXG4gICAge1xyXG4gICAgICAgIC8vcHVibGljIHN0cmluZyBNYWluVGFnO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PGludD4gdGFncyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBwdWJsaWMgaW50IFRpbWVTdGFtcDtcclxuICAgICAgICBMaXN0PEF0dHJpYnV0ZT4gYXR0cnMgPSBuZXcgTGlzdDxBdHRyaWJ1dGU+KCk7XHJcblxyXG4gICAgICAgIC8vcHVibGljIEhhcHAoSUNvbnZlcnRpYmxlIGMpXHJcbiAgICAgICAgLy97XHJcbiAgICAgICAgLy8gICAgdGFncy5BZGQoQ29udmVydC5Ub0ludDMyKGMpKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHAob2JqZWN0IG1haW5UYWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL01haW5UYWcgPSBtYWluVGFnLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihtYWluVGFnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgQXR0cmlidXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgZmxvYXQgVmFsdWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBBdHRyaWJ1dGUgU2V0VmFsdWUoZmxvYXQgZilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVmFsdWUgPSBmO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHVibGljIFRhZ0hvbGRlciB0YWdzID0gbmV3IFRhZ0hvbGRlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHAgQWRkQXR0cmlidXRlKEF0dHJpYnV0ZSBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXR0cnMuQWRkKGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGludCBHZXRBdHRyaWJ1dGVfSW50KGludCBpbmRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KWF0dHJzW2luZGV4XS5WYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSGFzVGFnKGludCB0YWdzTmVlZGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhZ3MuQ29udGFpbnModGFnc05lZWRlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwSGFuZGxlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PGludD4gbmVjZXNzYXJ5VGFncyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBwdWJsaWMgQWN0aW9uPEhhcHA+IEhhbmRsZTtcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBIYW5kbGVyKG9iamVjdCBtYWluVGFnLCBBY3Rpb248SGFwcD4gaGFuZGxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5uZWNlc3NhcnlUYWdzLkFkZChDb252ZXJ0LlRvSW50MzIobWFpblRhZykpO1xyXG4gICAgICAgICAgICBIYW5kbGUgPSBoYW5kbGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUYWdIb2xkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxvYmplY3Q+IFRhZ3MgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEhhc1RhZyhvYmplY3QgdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUYWdzLkNvbnRhaW5zKHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGQob2JqZWN0IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUYWdzLkFkZCh2KTtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBMaXN0PG9iamVjdD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1RhZ3M9bmV3IExpc3Q8b2JqZWN0PigpO31cclxuXHJcblxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSW5wdXRIb2xkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxJbnB1dD4gaW5wdXRzID0gbmV3IExpc3Q8SW5wdXQ+KCk7XHJcbiAgICAgICAgTGlzdDxJbnB1dFRhZ3M+IHRhZ3MgPSBuZXcgTGlzdDxJbnB1dFRhZ3M+KCk7XHJcblxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIENsZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlucHV0cy5DbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGQoSW5wdXQgaW5wdXQsIElucHV0VGFncyB0YWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnB1dHMuQWRkKGlucHV0KTtcclxuICAgICAgICAgICAgdGFncy5BZGQodGFnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIFRhZ0lzKGludCBpMiwgSW5wdXRUYWdzIHRhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0YWdzLkNvdW50IDw9IGkyKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybiB0YWdzW2kyXSA9PSB0YWc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIElucHV0VGFnc3tcclxuICAgICAgICBOT05FLCBNT1ZFRklYLCBNT1ZFVU5GSVgsIE1JU0NcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1vdmVDcmVhdG9yUHJvZ1xyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcyA9IG5ldyBMaXN0PE1vdmVEYXRhPigpO1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8TW92ZVJlbmRlckRhdGE+IG1vdmVSZW5kZXJzID0gbmV3IExpc3Q8TW92ZVJlbmRlckRhdGE+KCk7XHJcbiAgICAgICAgQXJlYUNyZWF0aW9uVXRpbHMgYXJlYVV0aWxzID0gbmV3IEFyZWFDcmVhdGlvblV0aWxzKCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlQ3JlYXRvclByb2coKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW92ZURhdGFzLkFkZChudWxsKTsgLy9kbyBub3RoaW5nXHJcbiAgICAgICAgICAgIEJhc2VVdGlscy5WZWN0b3IyRFtdIGRpcmVjdGlvbnMgPSBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEW10ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIDEpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgtMSwgMCksXHJcbiAgICAgICAgICAgICAgICBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIC0xKSxcclxuICAgICAgICAgICAgICAgIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMSwgMCksIFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzdHJpbmdbXSBtb3ZlTGFiZWxzID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBVcFwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIExlZnRcIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBEb3duXCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgUmlnaHRcIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc3RyaW5nW10gbW92ZUFicmV2ID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiXlwiLFxyXG4gICAgICAgICAgICAgICAgXCI8XCIsXHJcbiAgICAgICAgICAgICAgICBcInZcIixcclxuICAgICAgICAgICAgICAgIFwiPlwiLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGRpcmVjdGlvbnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE5ld01vdmVEYXRhKGxhYmVsOm1vdmVMYWJlbHNbaV0sIGNvbmRpdGlvbjogbmV3IENvbmRpdGlvbihDb25kaXRpb25UeXBlLkNhbk1vdmUsIFRhcmdldC5TZWxmLCBkaXJlY3Rpb25zW2ldKSwgYWN0aW9uOiBuZXcgTW92ZUFjdGlvbihUYXJnZXQuU2VsZiwgZGlyZWN0aW9uc1tpXSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5Nb3ZlbWVudCwgIE1vdmVEYXRhVGFncy5IZXJvSW5pdGlhbCkpO1xyXG4gICAgICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKG5hbWU6bW92ZUxhYmVsc1tpXSwgYWJyZXY6bW92ZUFicmV2W2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkd1blwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgMSwgQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmUpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkd1blwiLCBcIkdcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkZpcmVndW5cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIEJhdHRsZU1haW4uRWxlbWVudC5GaXJlKSwgbmV3IERlYWxEYW1hZ2VBY3Rpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCAxLCBCYXR0bGVNYWluLkVsZW1lbnQuRmlyZSkpLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuU2hvb3QpKTtcclxuICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKFwiRmlyZWd1blwiLCBcIkZHXCIpO1xyXG5cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJJY2VndW5cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIEJhdHRsZU1haW4uRWxlbWVudC5JY2UpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5JY2UpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkljZWd1blwiLCBcIklHXCIpO1xyXG5cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJUaHVuZGVyZ3VuXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKG5ldyBBbmltYXRpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlciksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgMSwgQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIlRodW5kZXJndW5cIiwgXCJUR1wiKTtcclxuXHJcbiAgICAgICAgICAgIEFyZWEgYXJlYSA9IEFyZWFVc2VyKCkuUm93Rm9yd2FyZCh3aWR0aDogMSwgWERpczogMyk7XHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiSWNlYm9tYlwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKGFyZWEsIEJhdHRsZU1haW4uRWxlbWVudC5JY2UpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihhcmVhLCAxLCBCYXR0bGVNYWluLkVsZW1lbnQuSWNlKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5Cb21iKSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkljZWJvbWJcIiwgXCJJQlwiKTtcclxuXHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiVGh1bmRlcmJvbWJcIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihhcmVhLCBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlciksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKGFyZWEsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5Cb21iKSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIlRodW5kZXJib21iXCIsIFwiVEJcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIlN1bW1vblwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihTdW1tb25FbnRpdHkuRW5lbXkoMCwgbmV3IFZlY3RvcjJEKDUsMCkpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlN1bW1vbikpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJTdW1tb25cIiwgXCJTVVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGludCBHZXRNb3ZlSWQoc3RyaW5nIHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gTW92ZURhdGEuRmluZEJ5TGFiZWwobW92ZURhdGFzLCB2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgQXJlYUNyZWF0aW9uVXRpbHMgQXJlYVVzZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXJlYVV0aWxzLnRhcmdldCA9IFRhcmdldC5TZWxmO1xyXG4gICAgICAgICAgICByZXR1cm4gYXJlYVV0aWxzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEFyZWFDcmVhdGlvblV0aWxzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgVGFyZ2V0IHRhcmdldDtcclxuICAgICAgICAgICAgaW50IGhlaWdodCA9IDM7XHJcblxyXG4gICAgICAgICAgICBpbnRlcm5hbCBBcmVhIFJvd0ZvcndhcmQoaW50IHdpZHRoLCBpbnQgWERpcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhID0gbmV3IEFyZWEodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIGludCBvZmZzZXRZID0gKGludClNYXRoLkZsb29yKChmbG9hdCloZWlnaHQgLyAyZik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBoZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYS5wb2ludHMuQWRkKG5ldyBWZWN0b3IyRChpK1hEaXMsIGotb2Zmc2V0WSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoc3RyaW5nIG5hbWUsIHN0cmluZyBhYnJldilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdmVSZW5kZXJzLkFkZChuZXcgTW92ZVJlbmRlckRhdGEobmFtZSwgYWJyZXYpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBOZXdNb3ZlRGF0YShzdHJpbmcgbGFiZWwsIFRpY2tbXSB0aWNrcywgb2JqZWN0W10gdGFncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtdiA9IG5ldyBNb3ZlRGF0YShsYWJlbCk7XHJcbiAgICAgICAgICAgIG12LnVuaXRzLkFkZFJhbmdlKHRpY2tzKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gdGFncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbXYudGFncy5BZGQoQ29udmVydC5Ub0ludDMyKGl0ZW0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbW92ZURhdGFzLkFkZChtdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTmV3TW92ZURhdGEoc3RyaW5nIGxhYmVsLCBDb25kaXRpb24gY29uZGl0aW9uLCBvYmplY3QgYWN0aW9uLCBvYmplY3RbXSB0YWdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG12ID0gbmV3IE1vdmVEYXRhKGxhYmVsKTtcclxuICAgICAgICAgICAgVGljayB0aWNrID0gbmV3IFRpY2soKTtcclxuICAgICAgICAgICAgdGljay5jb25kaXRpb24gPSBjb25kaXRpb247XHJcbiAgICAgICAgICAgIHRpY2sudGhpbmdzVG9IYXBwZW4uQWRkKGFjdGlvbik7XHJcbiAgICAgICAgICAgIG12LnVuaXRzLkFkZCh0aWNrKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gdGFncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbXYudGFncy5BZGQoQ29udmVydC5Ub0ludDMyKGl0ZW0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtb3ZlRGF0YXMuQWRkKG12KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVGlja1tdIE9uZVRpY2tQZXJBY3Rpb24ocGFyYW1zIG9iamVjdFtdIGFjdGlvbnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUaWNrW10gdGlja3MgPSBuZXcgVGlja1thY3Rpb25zLkxlbmd0aF07XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdGlja3MuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpY2tzW2ldID0gbmV3IFRpY2soYWN0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRpY2tzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvYmplY3RbXSBUYWdBcnJheShwYXJhbXMgb2JqZWN0W10gYXJncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcmdzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZVJlbmRlckRhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIExhYmVsO1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQWJyZXY7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlUmVuZGVyRGF0YShzdHJpbmcgbGFiZWwsIHN0cmluZyBhYnJldilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTGFiZWwgPSBsYWJlbDtcclxuICAgICAgICAgICAgdGhpcy5BYnJldiA9IGFicmV2O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkVDU1xyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFjY2Vzc29yXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBMZW5ndGggeyBnZXQgeyByZXR1cm4gU2VsZWN0ZWRFbnRpdGllcy5Db3VudDsgfSB9XHJcblxyXG4gICAgICAgIGludGVybmFsIFR5cGVbXSBUeXBlc1Byb2hpYml0ZWQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBUeXBlW10gVHlwZXNOZWNlc3Nhcnk7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxFbnRpdHk+IFNlbGVjdGVkRW50aXRpZXMgPSBuZXcgTGlzdDxFbnRpdHk+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBY2Nlc3NvcihwYXJhbXMgVHlwZVtdIHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUeXBlc05lY2Vzc2FyeSA9IHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIEVudGl0eUFkZGVkKEVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFNlbGVjdGVkRW50aXRpZXMuQ29udGFpbnMoZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IEdldChpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTZWxlY3RlZEVudGl0aWVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUXVpY2tBY2Nlc3Nvck9uZTxUMT5cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIFF1aWNrQWNjZXNzb3JPbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWNjZXNzb3IgPSBuZXcgQWNjZXNzb3IodHlwZW9mKFQxKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBBY2Nlc3NvciBhY2Nlc3NvcjtcclxuICAgICAgICBwdWJsaWMgaW50IENvdW50IHsgZ2V0IHsgcmV0dXJuIGFjY2Vzc29yLkxlbmd0aDsgfSB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBUMSBDb21wMShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldLkdldENvbXBvbmVudDxUMT4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgRW50aXR5KGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNsYXNzIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBcclxuICAgIHtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgQWNjZXNzb3IgYWNjZXNzb3I7XHJcbiAgICAgICAgcHVibGljIGludCBMZW5ndGggeyBnZXQgeyByZXR1cm4gYWNjZXNzb3IuTGVuZ3RoOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIFQxIENvbXAxKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXNbaV0uR2V0Q29tcG9uZW50PFQxPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBFbnRpdHkoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllc1tpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBRdWlja0FjY2Vzc29yVHdvKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yID0gbmV3IEFjY2Vzc29yKHR5cGVvZihUMSksIHR5cGVvZihUMikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBUMiBDb21wMihpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldLkdldENvbXBvbmVudDxUMj4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIENsb25lZFN0YXRlXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4gY29tcHMgPSBuZXcgRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4oKTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIEVDU01hbmFnZXJcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgRUNTTWFuYWdlcltdIG1hbmFnZXJzID0gbmV3IEVDU01hbmFnZXJbMjBdO1xyXG4gICAgICAgIERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+IGNvbXBzID0gbmV3IERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgRUNTSWQ7XHJcbiAgICAgICAgaW50IGVudGl0eUlkTWF4ID0gLTE7XHJcbiAgICAgICAgTGlzdDxBY2Nlc3Nvcj4gYWNjZXNzb3JzID0gbmV3IExpc3Q8QWNjZXNzb3I+KCk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgRUNTTWFuYWdlcigpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHJvY2Vzc29yQWNjZXNzb3IgQ3JlYXRlUHJvY2Vzc29yKEFjY2Vzc29yIGFjY2Vzc29yLCBBY3Rpb248QWNjZXNzb3I+IGFjdGlvbilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb2Nlc3NvckFjY2Vzc29yKGFjdGlvbiwgYWNjZXNzb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFjY2Vzc29yIENyZWF0ZUFjY2Vzc29yKFR5cGVbXSBuZWNlc3NhcnksIFR5cGVbXSBub3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYWNjID0gbmV3IEFjY2Vzc29yKG5lY2Vzc2FyeSk7XHJcbiAgICAgICAgICAgIGFjYy5UeXBlc1Byb2hpYml0ZWQgPSBub3Q7XHJcbiAgICAgICAgICAgIEFkZEFjY2Vzc29yKGFjYyk7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBRdWlja0FjY2Vzc29yMjxUMSwgVDI+KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBhY2Nlc3NvciA9IG5ldyBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4oKTtcclxuICAgICAgICAgICAgQWRkQWNjZXNzb3IoYWNjZXNzb3IuYWNjZXNzb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUXVpY2tBY2Nlc3Nvck9uZTxUMT4gUXVpY2tBY2Nlc3NvcjE8VDE+KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFF1aWNrQWNjZXNzb3JPbmU8VDE+IGFjY2Vzc29yID0gbmV3IFF1aWNrQWNjZXNzb3JPbmU8VDE+KCk7XHJcbiAgICAgICAgICAgIEFkZEFjY2Vzc29yKGFjY2Vzc29yLmFjY2Vzc29yKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgI3JlZ2lvbiBzdGF0aWMgbWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RhdGljIEVDU01hbmFnZXIgR2V0SW5zdGFuY2UoRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbWFuYWdlcnNbZS5lY3NdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBFQ1NNYW5hZ2VyIENyZWF0ZSgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBtYW5hZ2Vycy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hbmFnZXJzW2ldID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFuYWdlcnNbaV0gPSBuZXcgRUNTTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hbmFnZXJzW2ldLkVDU0lkID0gaTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFuYWdlcnNbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBDcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG9iamVjdCB2KVxyXG4gICAgICAgIHtcclxuRW50aXR5IGU7XG4gICAgICAgICAgICBDcmVhdGVFbnRpdHkob3V0IGUpO1xyXG4gICAgICAgICAgICBBZGRDb21wb25lbnQoZSwgdik7XHJcbiAgICAgICAgICAgIHJldHVybiBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBDcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG9iamVjdCB2LCBvYmplY3QgdjIpXHJcbiAgICAgICAge1xyXG5FbnRpdHkgZTtcbiAgICAgICAgICAgIENyZWF0ZUVudGl0eShvdXQgZSk7XHJcbiAgICAgICAgICAgIEFkZENvbXBvbmVudChlLCB2KTtcclxuICAgICAgICAgICAgQWRkQ29tcG9uZW50KGUsIHYyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IENyZWF0ZUVudGl0eShvdXQgRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbnRpdHlJZE1heCsrO1xyXG4gICAgICAgICAgICBFbnRpdHkgZW50aXR5ID0gbmV3IEVudGl0eSh0aGlzLkVDU0lkLCBlbnRpdHlJZE1heCk7XHJcbiAgICAgICAgICAgIGUgPSBlbnRpdHk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IENyZWF0ZUVudGl0eSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbnRpdHlJZE1heCsrO1xyXG4gICAgICAgICAgICBFbnRpdHkgZW50aXR5ID0gbmV3IEVudGl0eSh0aGlzLkVDU0lkLCBlbnRpdHlJZE1heCk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFByb2Nlc3NvckZsZXg8VDEsIFQyPiBRdWlja1Byb2Nlc3NvckZsZXg8VDEsIFQyPihBY3Rpb248UXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+PiBwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUHJvY2Vzc29yRmxleDxUMSwgVDI+IHByb2Nlc3NvckZsZXggPSBuZXcgUHJvY2Vzc29yRmxleDxUMSwgVDI+KHApO1xyXG4gICAgICAgICAgICBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4gYWNjZXNzb3IgPSBwcm9jZXNzb3JGbGV4LmFjY2Vzc29yO1xyXG4gICAgICAgICAgICBBY2Nlc3NvciBhY2Nlc3NvcjEgPSBhY2Nlc3Nvci5hY2Nlc3NvcjtcclxuICAgICAgICAgICAgQWRkQWNjZXNzb3IoYWNjZXNzb3IxKTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NvckZsZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkQWNjZXNzb3IoQWNjZXNzb3IgYWNjZXNzb3IxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWNjZXNzb3JzLkFkZChhY2Nlc3NvcjEpO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8PSBlbnRpdHlJZE1heDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVBY2Nlc3NvckVudGl0eShhY2Nlc3NvcjEsIGkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZUFjY2Vzc29yRW50aXR5KEFjY2Vzc29yIGFjY2Vzc29yLCBpbnQgZW50aXR5SWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbnRpdHkgZW50aXR5ID0gbmV3IEVudGl0eShFQ1NJZCwgZW50aXR5SWQpO1xyXG4gICAgICAgICAgICBib29sIGJlbG9uZyA9IEhhc0FsbENvbXBzKGFjY2Vzc29yLlR5cGVzTmVjZXNzYXJ5LCBlbnRpdHlJZCkgJiYgSGFzTm9uZU9mVGhlc2VDb21wcyhhY2Nlc3Nvci5UeXBlc1Byb2hpYml0ZWQsIGVudGl0eUlkKTtcclxuICAgICAgICAgICAgYm9vbCBtZW1iZXIgPSBhY2Nlc3Nvci5FbnRpdHlBZGRlZChlbnRpdHkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJlbG9uZyAhPSBtZW1iZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChiZWxvbmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllcy5BZGQoZW50aXR5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiUkVNT1ZFRCBFTlRJVFkgXCIrYWNjZXNzb3IuVHlwZXNOZWNlc3NhcnlbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXMuUmVtb3ZlKGVudGl0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShhY2Nlc3Nvci5FbnRpdHlBZGRlZChlbnRpdHkpK1wiIEJFTE9OR1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENsb25lU3RhdGUoQ2xvbmVkU3RhdGUgY3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY29tcHMgPSB0aGlzLmNvbXBzO1xyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPiBjb21wczIgPSBjcy5jb21wcztcclxuICAgICAgICAgICAgQ29weShjb21wcywgY29tcHMyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc3RvcmVTdGF0ZShDbG9uZWRTdGF0ZSBjcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjb21wcyA9IHRoaXMuY29tcHM7XHJcbiAgICAgICAgICAgIERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+IGNvbXBzMiA9IGNzLmNvbXBzO1xyXG4gICAgICAgICAgICBDb3B5KGNvbXBzMiwgY29tcHMpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPD1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBlbnRpdHlJZE1heDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBhY2Nlc3NvcnMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVXBkYXRlQWNjZXNzb3JFbnRpdHkoaXRlbSwgaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBMaXN0PFR5cGU+IGF1eCA9IG5ldyBMaXN0PFR5cGU+KCk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDb3B5KERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+IGZyb20sIERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+IHRvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXV4LkNsZWFyKCk7XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYyBpbiBmcm9tKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUeXBlIHR5cGUgPSBjLktleTtcclxuICAgICAgICAgICAgICAgIGF1eC5BZGQodHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRvLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvLkFkZCh0eXBlLCBuZXcgb2JqZWN0WzMwMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHRvQXJyYXkgPSB0b1t0eXBlXTtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW4gPSBjLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgQ29weSh0bywgdHlwZSwgdG9BcnJheSwgb3JpZ2luKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYyBpbiB0bykgLy9jaGVja3MgdHlwZXMgaW4gdG8sIHNvIGl0IGNhbiBiZSB0aHJvdWdoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFR5cGUgdHlwZSA9IGMuS2V5O1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhdXguQ29udGFpbnModHlwZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LkFkZCh0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9BcnJheSA9IGMuVmFsdWU7IC8vYWNjZXNzIGludmVydGVkIHdoZW4gY29tcGFyZWQgdG8gcHJldmlvdXNcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciBvcmlnaW4gPSBmcm9tW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdG9BcnJheS5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvQXJyYXlbaV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiUmVtb3ZpbmcgZW50aXR5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIENvcHkoRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4gdG8sIFR5cGUgdHlwZSwgb2JqZWN0W10gdG9BcnJheSwgb2JqZWN0W10gb3JpZ2luKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IG9yaWdpbi5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbltpXSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b0FycmF5W2ldICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiUmVtb3ZpbmcgZW50aXR5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0FycmF5W2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUodHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvQXJyYXlbaV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9BcnJheVtpXSA9IEFjdGl2YXRvci5DcmVhdGVJbnN0YW5jZSh0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBEZWVwQ2xvbmVIZWxwZXIuRGVlcENvcHlQYXJ0aWFsKG9yaWdpbltpXSwgdG9BcnJheVtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIFQgQWRkQ29tcG9uZW50PFQ+KEVudGl0eSBlKSB3aGVyZSBUIDogbmV3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFQgdCA9IG5ldyBUKCk7XHJcbiAgICAgICAgICAgIEFkZENvbXBvbmVudChlLCB0KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkQ29tcG9uZW50KEVudGl0eSBlLCBvYmplY3QgdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR5cGUgdHlwZSA9IHQuR2V0VHlwZSgpO1xyXG4gICAgICAgICAgICBpZiAoIWNvbXBzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb21wcy5BZGQodHlwZSwgbmV3IG9iamVjdFszMDBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb21wc1t0eXBlXVtlLmlkXSA9IHQ7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGFjY2Vzc29ycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlQWNjZXNzb3JFbnRpdHkoaXRlbSwgZS5pZCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmVDb21wb25lbnQoRW50aXR5IGUsIG9iamVjdCB0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVHlwZSB0eXBlID0gdC5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIGlmICghY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbXBzLkFkZCh0eXBlLCBuZXcgb2JqZWN0WzMwMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbXBzW3R5cGVdW2UuaWRdID0gbnVsbDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYWNjZXNzb3JzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVBY2Nlc3NvckVudGl0eShpdGVtLCBlLmlkKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBIYXNBbGxDb21wb25lbnRzKEVudGl0eSBlLCBUeXBlW10gdHlwZXNOZWNlc3NhcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgaWQgPSBlLmlkO1xyXG4gICAgICAgICAgICByZXR1cm4gSGFzQWxsQ29tcHModHlwZXNOZWNlc3NhcnksIGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBIYXNBbGxDb21wcyhUeXBlW10gdHlwZXNOZWNlc3NhcnksIGludCBpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0eXBlIGluIHR5cGVzTmVjZXNzYXJ5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcHNbdHlwZV1baWRdID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIEhhc05vbmVPZlRoZXNlQ29tcHMoVHlwZVtdIHR5cGVzUHJvaGliaXRlZCwgaW50IGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVzUHJvaGliaXRlZCA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHR5cGUgaW4gdHlwZXNQcm9oaWJpdGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBzW3R5cGVdW2lkXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBUIEdldENvbXBvbmVudDxUPihFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR5cGUgdHlwZSA9IHR5cGVvZihUKTtcclxuICAgICAgICAgICAgaWYgKCFjb21wcy5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9jb21wcy5BZGQodHlwZSwgbmV3IG9iamVjdFszMDBdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0KFQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAoVCljb21wc1t0eXBlXVtlLmlkXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkVDU1xyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IEVudGl0eSA6IElFcXVhdGFibGU8RW50aXR5PlxyXG4gICAge1xyXG4gICAgICAgIHJlYWRvbmx5IGludGVybmFsIGludCBlY3M7XHJcbiAgICAgICAgcmVhZG9ubHkgaW50ZXJuYWwgaW50IGlkO1xyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5KGludCBlY3MsIGludCBpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBFcXVhbHMoRW50aXR5IG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG90aGVyLmlkID09IHRoaXMuaWQgJiYgb3RoZXIuZWNzID09IHRoaXMuZWNzO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgRXh0ZW5zaW9uTWV0aG9kc1xyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUmVtb3ZlQ29tcG9uZW50KHRoaXMgRW50aXR5IGUsIG9iamVjdCBjb21wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRUNTTWFuYWdlci5HZXRJbnN0YW5jZShlKS5SZW1vdmVDb21wb25lbnQoZSwgY29tcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgQWRkQ29tcG9uZW50PFQ+KHRoaXMgRW50aXR5IGUpIHdoZXJlIFQ6IG5ldygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRUNTTWFuYWdlci5HZXRJbnN0YW5jZShlKS5BZGRDb21wb25lbnQ8VD4oZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBZGRDb21wb25lbnQodGhpcyBFbnRpdHkgZSwgb2JqZWN0IGNvbXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFQ1NNYW5hZ2VyLkdldEluc3RhbmNlKGUpLkFkZENvbXBvbmVudChlLCBjb21wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUIEdldENvbXBvbmVudDxUPih0aGlzIEVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEVDU01hbmFnZXIuR2V0SW5zdGFuY2UoZSkuR2V0Q29tcG9uZW50PFQ+KGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guRUNTXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcm9jZXNzb3JGbGV4PFQxLCBUMj5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEFjdGlvbjxRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4+IHA7XHJcbiAgICAgICAgaW50ZXJuYWwgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+IGFjY2Vzc29yO1xyXG5cclxuICAgICAgICBwdWJsaWMgUHJvY2Vzc29yRmxleChBY3Rpb248UXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+PiBwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wID0gcDtcclxuICAgICAgICAgICAgYWNjZXNzb3IgPSBuZXcgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSdW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcChhY2Nlc3Nvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBQcm9jZXNzb3JBY2Nlc3NvclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgQWN0aW9uPEFjY2Vzc29yPiBwO1xyXG5cclxuICAgICAgICBBY2Nlc3NvciBhO1xyXG5cclxuICAgICAgICBwdWJsaWMgUHJvY2Vzc29yQWNjZXNzb3IoQWN0aW9uPEFjY2Vzc29yPiBwLCBBY2Nlc3NvciBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wID0gcDtcclxuICAgICAgICAgICAgdGhpcy5hID0gYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJ1bigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwKGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFdvcmxkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUgcGFsZXR0ZSA9IERlZmF1bHRQYWxldHRlcy5DNEtpcm9LYXplO1xyXG4gICAgICAgIExpc3Q8VGV4dEVudGl0eT4gYWN0aXZlQWdlbnRzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICBMaXN0PFRleHRFbnRpdHk+IGZyZWVCb2FyZHMgPSBuZXcgTGlzdDxUZXh0RW50aXR5PigpO1xyXG4gICAgICAgIExpc3Q8VGV4dEFuaW1hdGlvbj4gYW5pbWF0aW9ucyA9IG5ldyBMaXN0PFRleHRBbmltYXRpb24+KCk7XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBtYWluQm9hcmQ7XHJcbiAgICAgICAgaW50IGxhdGVzdElkID0gLTE7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUIEFkZEFuaW1hdGlvbjxUPihUIHRhKSB3aGVyZSBUIDogVGV4dEFuaW1hdGlvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYW5pbWF0aW9ucy5BZGQodGEpO1xyXG4gICAgICAgICAgICB0YS5SZWdpc3Rlckxpc3RzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWFpbkJvYXJkID0gbmV3IFRleHRCb2FyZCh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1haW5Cb2FyZC5SZXNldCgpO1xyXG4gICAgICAgICAgICBEcmF3Q2hpbGRyZW4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdDaGlsZHJlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGFjdGl2ZUFnZW50cy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVBZ2VudHNbaV0uUmVzZXRBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbS5Nb2RpZnkoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVBZ2VudHNbaV0uZnJlZUlmSWRsZSAmJiAhYWN0aXZlQWdlbnRzW2ldLmFuaW1hdGluZylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmcmVlQm9hcmRzLkFkZChhY3RpdmVBZ2VudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUFnZW50cy5SZW1vdmUoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkJvYXJkLkluc2VydChhY3RpdmVBZ2VudHNbaV0uQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IEdldEZyZWVFbnRpdHkoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dEVudGl0eSB0ZTtcclxuICAgICAgICAgICAgaWYgKGZyZWVCb2FyZHMuQ291bnQgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZSA9IGZyZWVCb2FyZHNbZnJlZUJvYXJkcy5Db3VudCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgZnJlZUJvYXJkcy5SZW1vdmVBdChmcmVlQm9hcmRzLkNvdW50IC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZSA9IG5ldyBUZXh0RW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICB0ZS5pZCA9ICsrbGF0ZXN0SWQ7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhY3RpdmVBZ2VudHMuQWRkKHRlKTtcclxuICAgICAgICAgICAgdGUuZnJlZUlmSWRsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0ZS5TZXRTaXplKHcsIGgpO1xyXG4gICAgICAgICAgICB0ZS5SZXNldEZ1bGwoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRFbnRpdHkgR2V0VGVtcEVudGl0eShpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGUgPSBHZXRGcmVlRW50aXR5KHcsIGgpO1xyXG4gICAgICAgICAgICB0ZS5mcmVlSWZJZGxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWR2YW5jZVRpbWUoZmxvYXQgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFuaW0uVXBkYXRlKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUcnlFbmRBbmltYXRpb25zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFuaW0uVHJ5RW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWFuaW0uSXNEb25lKCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRleHRFbnRpdHlcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IGlkO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgT3JpZ2luO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgQW5pbWF0aW9uO1xyXG4gICAgICAgIHB1YmxpYyBib29sIGZyZWVJZklkbGUgPSBmYWxzZTtcclxuICAgICAgICBpbnRlcm5hbCBib29sIGFuaW1hdGluZztcclxuXHJcbiAgICAgICAgcHVibGljIGludCBIZWlnaHQgeyBnZXQgeyByZXR1cm4gT3JpZ2luLkhlaWdodDsgfSB9XHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aCB7IGdldCB7IHJldHVybiBPcmlnaW4uV2lkdGg7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEFuaW1hdGlvbi5CYXNlRGF0YSBBbmltQmFzZShmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRleHRBbmltYXRpb24uQmFzZURhdGEobGVuZ3RoLCAwLCBpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBWZWN0b3IyRCBHZXRQb3NpdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gT3JpZ2luLlBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldEFuaW1hdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgQW5pbWF0aW9uLlNldChPcmlnaW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldEZ1bGwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3JpZ2luLlJlc2V0SW52aXNpYmxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldFBvc2l0aW9uKGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9yaWdpbi5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IyRCh4LHkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRQb3NpdGlvbihWZWN0b3IyRCB2ZWN0b3IyRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9yaWdpbi5Qb3NpdGlvbiA9IHZlY3RvcjJEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRTaXplKGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChPcmlnaW4gPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgT3JpZ2luID0gbmV3IFRleHRCb2FyZCh3LCBoKTtcclxuICAgICAgICAgICAgICAgIEFuaW1hdGlvbiA9IG5ldyBUZXh0Qm9hcmQodywgaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT3JpZ2luLlJlc2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgQW5pbWF0aW9uLlJlc2l6ZSh3LCBoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBEZWxheXNBbmltYXRpb24gOiBUZXh0QW5pbWF0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIERlbGF5KGZsb2F0IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGQobmV3IEJhc2VEYXRhKHYsIDAsIC0xKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUG9zaXRpb25BbmltYXRpb24gOiBUZXh0QW5pbWF0aW9uPFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YT5cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBQb3NpdGlvbkRhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkIHRhcmdldCA9IGVudGl0eS5BbmltYXRpb247XHJcbiAgICAgICAgICAgIGlmIChtYWluRGF0YS5wZXJtYW5lbnQpXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBlbnRpdHkuT3JpZ2luO1xyXG4gICAgICAgICAgICB0YXJnZXQuUG9zaXRpb24gPSBWZWN0b3IyRC5JbnRlcnBvbGF0ZVJvdW5kZWQobWFpbkRhdGEuc3RhcnRQb3NpdGlvbiwgbWFpbkRhdGEuZW5kUG9zaXRpb24sIHByb2dyZXNzIC8gbGVuZ3RoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IFBvc2l0aW9uRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvb2wgcGVybWFuZW50O1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb247XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgUG9zaXRpb25EYXRhKFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIFZlY3RvcjJEIGVuZFBvc2l0aW9uLCBib29sIHBlcm0gPSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVybWFuZW50ID0gcGVybTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVGV4dEFuaW1hdGlvbjxUPiA6IFRleHRBbmltYXRpb25cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgTGlzdDxUPiBtYWluRGF0YSA9IG5ldyBMaXN0PFQ+KCk7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5SZWdpc3Rlckxpc3QobWFpbkRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKEJhc2VEYXRhIGJhc2VEYXRhLCBUIG1haW5EKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5BZGQoYmFzZURhdGEpO1xyXG4gICAgICAgICAgICBtYWluRGF0YS5BZGQobWFpbkQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBpbnQgaW5kZXgsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBNb2RpZnkoZW50aXR5LCBtYWluRGF0YVtpbmRleF0sIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIFQgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbnRlcm5hbCBvdmVycmlkZSB2b2lkIEV4ZWN1dGUoaW50IGluZGV4LCBCYXNlRGF0YSBiYXNlRGF0YSlcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICB0aGlzLkV4ZWN1dGUobWFpbkRhdGFbaW5kZXhdLCBiYXNlRGF0YSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vcHVibGljIGFic3RyYWN0IHZvaWQgRXhlY3V0ZShUIG1haW5EYXRhLCBCYXNlRGF0YSBiYXNlRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFRleHRBbmltYXRpb25cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBCYXNlRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGxlbmd0aDtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IHByb2dyZXNzO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHRhcmdldDtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBCYXNlRGF0YShmbG9hdCBsZW5ndGgsIGZsb2F0IHByb2dyZXNzLCBpbnQgdGFyZ2V0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzcztcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IGxlbmd0aCA9IG5ldyBMaXN0PGZsb2F0PigpO1xyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IHByb2dyZXNzID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxpbnQ+IHRhcmdldHMgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgTGlzdDxJTGlzdD4gbGlzdHMgPSBuZXcgTGlzdDxJTGlzdD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJMaXN0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQobGVuZ3RoKTtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKHByb2dyZXNzKTtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKHRhcmdldHMpO1xyXG4gICAgICAgICAgICBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IHZvaWQgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcm9ncmVzcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1tpXSArPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc1tpXSA+PSBsZW5ndGhbaV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NbaV0gPSBsZW5ndGhbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9FeGVjdXRlKGksIG5ldyBCYXNlRGF0YShsZW5ndGhbaV0scHJvZ3Jlc3NbaV0sIHRhcmdldHNbaV0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbnRlcm5hbCBhYnN0cmFjdCB2b2lkIEV4ZWN1dGUoaW50IGluZGV4LCBCYXNlRGF0YSBiYXNlRGF0YSk7XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWRkKEJhc2VEYXRhIGJkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvZ3Jlc3MuQWRkKGJkLnByb2dyZXNzKTtcclxuICAgICAgICAgICAgdGFyZ2V0cy5BZGQoYmQudGFyZ2V0KTtcclxuICAgICAgICAgICAgbGVuZ3RoLkFkZChiZC5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGxpc3RzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5Db3VudCAhPSBwcm9ncmVzcy5Db3VudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgcy5UcmltKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHByb2dyZXNzLkNvdW50ID09IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEVuZFRhc2soaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbCBpbiBsaXN0cylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGwuUmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVnaXN0ZXJMaXN0KElMaXN0IG1haW5EYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKG1haW5EYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgcHJvZ3Jlc3MuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGEuaWQgPT0gdGFyZ2V0c1tpXSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBNb2RpZnkoYSwgaSwgcHJvZ3Jlc3NbaV0sIGxlbmd0aFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYS5hbmltYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgaW50IGluZGV4LCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgVHJ5RW5kKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgcHJvZ3Jlc3MuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzW2ldID49IGxlbmd0aFtpXSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFbmRUYXNrKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUGFsZXR0ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmdbXSBIdG1sQ29sb3JzO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUocGFyYW1zIHN0cmluZ1tdIGNvbG9ycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEh0bWxDb2xvcnMgPSBjb2xvcnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBEZWZhdWx0UGFsZXR0ZXNcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBhbGV0dGUgQzRLaXJvS2F6ZSA9IG5ldyBQYWxldHRlKFwiIzMzMmM1MFwiLCBcIiM0Njg3OGZcIiwgXCIjOTRlMzQ0XCIsIFwiI2UyZjNlNFwiKTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBhbGV0dGUgQzRSZWFkZXIgPSBuZXcgUGFsZXR0ZShcIiMyNjI2MjZcIiwgXCIjOGI4Y2JhXCIsIFwiIzhiYmE5MVwiLCBcIiM2NDlmOGRcIik7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQYWxldHRlIEM0Tm92ZWwgPSBuZXcgUGFsZXR0ZShcIiMyNjI2MjZcIiwgXCIjMzQyZDQxXCIsIFwiI2I4YjhiOFwiLCBcIiM4YjhjYmFcIik7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBDNEJsYWNrID0gMDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0QmxhY2tOZXV0cmFsID0gMTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0V2hpdGVOZXV0cmFsID0gMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0V2hpdGUgPSAzO1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW5cclxue1xyXG4gICAgcHVibGljIHN0cnVjdCBNb3VzZUhvdmVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFJlY3QgcmVjdDtcclxuICAgICAgICBwdWJsaWMgaW50IHR5cGU7XHJcbiAgICAgICAgcHVibGljIGludCBpZDtcclxuXHJcbiAgICAgICAgcHVibGljIE1vdXNlSG92ZXIoUmVjdCByZWN0LCBpbnQgdHlwZSwgaW50IGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZWN0ID0gcmVjdDtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW91c2VIb3Zlck1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxNb3VzZUhvdmVyPiBtb3VzZUhvdmVycyA9IG5ldyBMaXN0PE1vdXNlSG92ZXI+KCk7XHJcbiAgICAgICAgcHVibGljIExpc3Q8TW91c2VIb3Zlcj4gbW91c2VIb3ZlcnNBY3RpdmUgPSBuZXcgTGlzdDxNb3VzZUhvdmVyPigpO1xyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIG1vdXNlSU87XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUhvdmVyTWFuYWdlcihNb3VzZUlPIG1vdXNlSU8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlSU8gPSBtb3VzZUlPO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdXNlSG92ZXJzQWN0aXZlLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIG1vdXNlSG92ZXJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5yZWN0LkNvbnRhaW5zKG1vdXNlSU8ucG9zKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZUhvdmVyc0FjdGl2ZS5BZGQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBVbmljb2RlUmVtYXBcclxuICAgIHtcclxuXHJcbiAgICAgICAgRGljdGlvbmFyeTxpbnQsIGludD4gcmVtYXBzID0gbmV3IERpY3Rpb25hcnk8aW50LCBpbnQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBVbmljb2RlUmVtYXAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVtYXBzLkFkZChVbmljb2RlLmtleVVwLCAndycpO1xyXG4gICAgICAgICAgICByZW1hcHMuQWRkKFVuaWNvZGUua2V5RG93biwgJ3MnKTtcclxuICAgICAgICAgICAgcmVtYXBzLkFkZChVbmljb2RlLmtleUxlZnQsICdhJyk7XHJcbiAgICAgICAgICAgIHJlbWFwcy5BZGQoVW5pY29kZS5rZXlSaWdodCwgJ2QnKTtcclxuXHJcbiAgICAgICAgICAgIHJlbWFwcy5BZGQoJ2knLCAnMScpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgUmVtYXAoaW50IHVuaWNvZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgcmVzdWx0O1xyXG4gICAgICAgICAgICBpZiAocmVtYXBzLlRyeUdldFZhbHVlKHVuaWNvZGUsIG91dCByZXN1bHQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB1bmljb2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRCb2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIE5PQ0hBTkdFQ0hBUiA9IChjaGFyKTE7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgSU5WSVNJQkxFQ0hBUiA9IChjaGFyKTI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBOT0NIQU5HRUNPTE9SID0gLTI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBJTlZJU0lCTEVDT0xPUiA9IC0xO1xyXG4gICAgICAgIGNoYXJbLF0gY2hhcnM7XHJcbiAgICAgICAgcHVibGljIGludFssXSBUZXh0Q29sb3IgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludFssXSBCYWNrQ29sb3IgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgLy9TdHJpbmdCdWlsZGVyIHN0cmluZ0J1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgIGludCBjdXJzb3JYID0gMDtcclxuICAgICAgICBpbnQgY3Vyc29yWSA9IDA7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEIFBvc2l0aW9uIHsgZ2V0OyBzZXQ7IH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9TZXRNYXhTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBSZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25DZW50ZXIoc3RyaW5nIG1lc3NhZ2UsIGludCBjb2xvciwgaW50IHhPZmYgPSAwLCBpbnQgeU9mZiA9IDAsIGJvb2wgYWxpZ25TdHJpbmcgPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHggPSAoV2lkdGgpIC8gMjtcclxuICAgICAgICAgICAgaWYgKGFsaWduU3RyaW5nKSB4IC09IG1lc3NhZ2UuTGVuZ3RoIC8gMjtcclxuICAgICAgICAgICAgaW50IHkgPSBIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBEcmF3KG1lc3NhZ2UsIHggKyB4T2ZmLCB5ICsgeU9mZiwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBTZXRNYXhTaXplKGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoYXJzID0gbmV3IGNoYXJbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgICAgIFRleHRDb2xvciA9IG5ldyBpbnRbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgICAgIEJhY2tDb2xvciA9IG5ldyBpbnRbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoJyAnLCAwLCAwLCBXaWR0aCwgSGVpZ2h0LCAwLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0SW52aXNpYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChJTlZJU0lCTEVDSEFSLCAwLCAwLCBXaWR0aCwgSGVpZ2h0LCBJTlZJU0lCTEVDT0xPUiwgSU5WSVNJQkxFQ09MT1IpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgV2lkdGggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluc2VydChUZXh0Qm9hcmQgc2Vjb25kQm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHNlY29uZEJvYXJkLldpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgc2Vjb25kQm9hcmQuSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHggPSAoaW50KXNlY29uZEJvYXJkLlBvc2l0aW9uLlggKyBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB5ID0gKGludClzZWNvbmRCb2FyZC5Qb3NpdGlvbi5ZICsgajtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4ID49IFdpZHRoIHx8IHkgPj0gSGVpZ2h0KSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuY2hhcnNbaSwgal0gIT0gSU5WSVNJQkxFQ0hBUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbeCwgeV0gPSBzZWNvbmRCb2FyZC5jaGFyc1tpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuVGV4dENvbG9yW2ksIGpdICE9IElOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Q29sb3JbeCwgeV0gPSBzZWNvbmRCb2FyZC5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZEJvYXJkLkJhY2tDb2xvcltpLCBqXSAhPSBJTlZJU0lCTEVDT0xPUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmFja0NvbG9yW3gsIHldID0gc2Vjb25kQm9hcmQuQmFja0NvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIERyYXdSZWN0KGNoYXIgYywgaW50IHgsIGludCB5LCBpbnQgdywgaW50IGgsIGludCB0ZXh0Q29sb3IsIGludCBiYWNrQ29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoYywgeCwgICAgICB5LCAgIDEsIGgsIHRleHRDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKGMsIHgrdy0xLCAgeSwgICAxLCBoLCB0ZXh0Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChjLCB4LCAgICAgIHksICAgdywgMSwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoYywgeCwgICAgICB5K2gtMSwgdywgMSwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBIZWlnaHQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBDdXJzb3JYXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gY3Vyc29yWDsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQ3Vyc29yWSB7IGdldCB7IHJldHVybiBjdXJzb3JZOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JZID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdPbmVEaWdpdChpbnQgaSwgaW50IHgsIGludCB5LCBpbnQgY29sb3IgPSBOT0NIQU5HRUNPTE9SLCBpbnQgYmFja2dyb3VuZCA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjaGFyIGMgPSAoY2hhcikoaSArICcwJyk7XHJcbiAgICAgICAgICAgIERyYXdDaGFyKGMsIHgsIHksIGNvbG9yLCBiYWNrZ3JvdW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdUd29EaWdpdHMoaW50IGksIGludCB4LCBpbnQgeSwgaW50IGNvbG9yID0gTk9DSEFOR0VDT0xPUiwgaW50IGJhY2tncm91bmQgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd09uZURpZ2l0KGkvMTAseCx5LGNvbG9yLGJhY2tncm91bmQpO1xyXG4gICAgICAgICAgICBEcmF3T25lRGlnaXQoaSAlMTAsIHgrMSwgeSwgY29sb3IsIGJhY2tncm91bmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBTYW1lQXMoVGV4dEJvYXJkIHRleHRCb2FyZCwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hhcnNbeCwgeV0gPT0gdGV4dEJvYXJkLmNoYXJzW3gsIHldXHJcbiAgICAgICAgICAgICAgICAmJiB0aGlzLkJhY2tDb2xvclt4LHldID09IHRleHRCb2FyZC5CYWNrQ29sb3JbeCx5XVxyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5UZXh0Q29sb3JbeCx5XSA9PSB0ZXh0Qm9hcmQuVGV4dENvbG9yW3gseV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIENvcHkoVGV4dEJvYXJkIHRleHRCb2FyZCwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFyc1t4LCB5XSA9IHRleHRCb2FyZC5jaGFyc1t4LCB5XTtcclxuICAgICAgICAgICAgdGhpcy5UZXh0Q29sb3JbeCwgeV0gPSB0ZXh0Qm9hcmQuVGV4dENvbG9yW3gsIHldO1xyXG4gICAgICAgICAgICB0aGlzLkJhY2tDb2xvclt4LCB5XSA9IHRleHRCb2FyZC5CYWNrQ29sb3JbeCwgeV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIERyYXdfQ3Vyc29yX1VuaWNvZGVMYWJlbChpbnQgdiwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGxlbiA9IERyYXdVbmljb2RlTGFiZWwodiwgY3Vyc29yWCwgY3Vyc29yWSwgY29sb3IpO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGxlbjsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBBZHZhbmNlQ3Vyc29yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBpbnQgRHJhd1VuaWNvZGVMYWJlbChpbnQgdW5pY29kZSwgaW50IHgsIGludCB5LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodW5pY29kZSA+PSAnYScgJiYgdW5pY29kZSA8PSAneicpIHtcclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKChjaGFyKSh1bmljb2RlICsgJ0EnIC0gJ2EnKSwgeCwgeSwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHVuaWNvZGUgPj0gJzAnICYmIHVuaWNvZGUgPD0gJzknKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhcigoY2hhcikodW5pY29kZSksIHgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0cmluZyBsYWJlbCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmICh1bmljb2RlID09IDMyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbCA9IFwiU1BBQ0VcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBEcmF3KGxhYmVsLCB4LCB5LCBjb2xvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBsYWJlbC5MZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldChUZXh0Qm9hcmQgb3JpZ2luKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Qb3NpdGlvbiA9IG9yaWdpbi5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBXaWR0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IEhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcnNbaSwgal0gPSBvcmlnaW4uY2hhcnNbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5CYWNrQ29sb3JbaSwgal0gPSBvcmlnaW4uQmFja0NvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGV4dENvbG9yW2ksIGpdID0gb3JpZ2luLlRleHRDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNpemUoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJzID09IG51bGwgfHwgdyA+IGNoYXJzLkdldExlbmd0aCgwKSB8fCBoID4gY2hhcnMuR2V0TGVuZ3RoKDEpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTZXRNYXhTaXplKHcsIGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFdpZHRoID0gdztcclxuICAgICAgICAgICAgSGVpZ2h0ID0gaDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2hhciBDaGFyQXQoaW50IGksIGludCBqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJzW2ksIGpdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0Q3Vyc29yQXQoaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3Vyc29yWCA9IHg7XHJcbiAgICAgICAgICAgIGN1cnNvclkgPSB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd19DdXJzb3Ioc3RyaW5nIHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYyBpbiB2KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3X0N1cnNvcihjKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd19DdXJzb3Ioc3RyaW5nIHYsIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYyBpbiB2KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3X0N1cnNvcihjLCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBDYW5EcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhzdHJpbmcgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBjdXJyZW50WCA9IGN1cnNvclg7XHJcbiAgICAgICAgICAgIGludCBjdXJyZW50WSA9IGN1cnNvclk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHYuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJvb2wgbGluZUJyZWFrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBib29sIHNob3VsZENoZWNrRm9yTGluZUJyZWFrcyA9IChpID09IDAgfHwgdltpXSA9PSAnICcpICYmIGkgIT0gdi5MZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZENoZWNrRm9yTGluZUJyZWFrcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMTsgaiA8IHYuTGVuZ3RoIC0gaTsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogKyBjdXJyZW50WCA+PSBXaWR0aCkgLy9yZWFjaCBlbmQgb2YgdGhlIGxpbmUgd2l0aG91dCBlbmRpbmcgdGhlIHdvcmQsIHNob3VsZCBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2W2ldID09ICcgJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7IC8vc2tpcCB0aHJvdWdoIHRoZSBzcGFjZSBpZiBpdCdzIGEgbmV3IGxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVCcmVhayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpICsgal0gPT0gJyAnKSAvL25ldyB3b3JkIGJlZ2lucyBzbyBubyBuZWVkIHRvIGxpbmUgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZUJyZWFrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRZKys7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3VycmVudFgrKztcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50WCA+PSBXaWR0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRYID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50WCA+PSBXaWR0aCB8fCBjdXJyZW50WSA+PSBIZWlnaHQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRHJhd0N1cnNvclJlc3VsdCBEcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhzdHJpbmcgdiwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IG9mZlN0YXJ0ID0gMDtcclxuICAgICAgICAgICAgaW50IG9mZkVuZCA9IHYuTGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgcmV0dXJuIERyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKHYsIGNvbG9yLCBvZmZTdGFydCwgb2ZmRW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEcmF3Q3Vyc29yUmVzdWx0IERyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKHN0cmluZyB2LCBpbnQgY29sb3IsIGludCBvZmZTdGFydCwgaW50IG9mZkVuZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBWZWN0b3IyRCBzdGFydCA9IG5ldyBWZWN0b3IyRChDdXJzb3JYLCBDdXJzb3JZKTtcclxuICAgICAgICAgICAgaW50IGVuZEluZGV4ID0gb2ZmRW5kICsgMTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IG9mZlN0YXJ0OyBpIDwgZW5kSW5kZXg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IG9yaWdpblggPSBjdXJzb3JYO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBsaW5lQnJlYWsgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJvb2wgc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzID0gKGkgPT0gMCB8fCB2W2ldID09ICcgJykgJiYgaSAhPSBlbmRJbmRleCAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAxOyBqIDwgZW5kSW5kZXggLSBpOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiArIG9yaWdpblggPj0gV2lkdGgpIC8vcmVhY2ggZW5kIG9mIHRoZSBsaW5lIHdpdGhvdXQgZW5kaW5nIHRoZSB3b3JkLCBzaG91bGQgbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpXSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrOyAvL3NraXAgdGhyb3VnaCB0aGUgc3BhY2UgaWYgaXQncyBhIG5ldyBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWsgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaSArIGpdID09ICcgJykgLy9uZXcgd29yZCBiZWdpbnMgc28gbm8gbmVlZCB0byBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVCcmVhaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDdXJzb3JOZXdMaW5lKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IodltpXSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFZlY3RvcjJEIGVuZCA9IG5ldyBWZWN0b3IyRChDdXJzb3JYLCBDdXJzb3JZKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEcmF3Q3Vyc29yUmVzdWx0KFBvc2l0aW9uVG9JbmRleChzdGFydCksIFBvc2l0aW9uVG9JbmRleChlbmQpLCBzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQXV0b0ZpeEdyaWRkaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBIZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSXNHcmlkKGksIGopKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IG1hc2sgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNHcmlkKGkgLSAxLCBqKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzayArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChJc0dyaWQoaSArIDEsIGopKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrICs9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKElzR3JpZChpLCBqIC0gMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2sgKz0gNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNHcmlkKGksIGogKyAxKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzayArPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAobWFzaylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzW2ksIGpdID0gVW5pY29kZS5Bc2NpaUdyaWRIb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzW2ksIGpdID0gVW5pY29kZS5Bc2NpaUdyaWRWZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbaSwgal0gPSBVbmljb2RlLkFzY2lpR3JpZFVwTGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkVXBSaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkVXBSaWdodExlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbaSwgal0gPSBVbmljb2RlLkFzY2lpR3JpZERvd25MZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkRG93blJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkRG93blJpZ2h0TGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgSXNHcmlkKGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHggPDAgfHwgeSA8MCB8fCB4Pj0gV2lkdGggfHwgeT49IEhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2hhciBjID0gY2hhcnNbeCwgeV07XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIFVuaWNvZGUuZ3JpZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChjID09IGl0ZW0pIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRHJhd0xpbmVzKGludCBoZXJvLCBwYXJhbXMgVmVjdG9yMkRbXSBwb2ludHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHBvaW50cy5MZW5ndGgtMTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3TGluZShwb2ludHNbaV0sIHBvaW50c1tpKzFdLCBoZXJvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3TGluZShWZWN0b3IyRCBwb3MxLCBWZWN0b3IyRCBwb3MyLCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjaGFyIGMgPSBVbmljb2RlLkFzY2lpR3JpZEhvcjtcclxuICAgICAgICAgICAgaWYgKHBvczEuWSAhPSBwb3MyLlkpIGMgPSBVbmljb2RlLkFzY2lpR3JpZFZlcjtcclxuICAgICAgICAgICAgaW50IGhlaWdodCA9IHBvczIuWUludCAtIHBvczEuWUludDtcclxuICAgICAgICAgICAgLy9pZiAoaGVpZ2h0IDw9IDApIGhlaWdodCA9IDE7XHJcbiAgICAgICAgICAgIGludCB3aWR0aCA9IHBvczIuWEludCAtIHBvczEuWEludDtcclxuICAgICAgICAgICAgLy9pZiAod2lkdGggPD0gMCkgd2lkdGggPSAxO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoYywgcG9zMS5YSW50LCBwb3MxLllJbnQsIHdpZHRoKzEsIGhlaWdodCsxLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGludCBQb3NpdGlvblRvSW5kZXgoVmVjdG9yMkQgc3RhcnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludCkoc3RhcnQuWCArIHN0YXJ0LlkgKiBXaWR0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25lRGlnaXRfQ3Vyc29yKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd19DdXJzb3IoKGNoYXIpKGkgKyAnMCcpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKGNoYXIgYylcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcihjLCBjdXJzb3JYLCBjdXJzb3JZKTtcclxuICAgICAgICAgICAgQWR2YW5jZUN1cnNvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd19DdXJzb3IoY2hhciBjLCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3I9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgY3Vyc29yWCwgY3Vyc29yWSwgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIEFkdmFuY2VDdXJzb3IoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZHZhbmNlQ3Vyc29yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclgrKztcclxuICAgICAgICAgICAgaWYgKGN1cnNvclggPj0gV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclggPSAwO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDdXJzb3JOZXdMaW5lKGludCB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3Vyc29yWSsrO1xyXG4gICAgICAgICAgICBjdXJzb3JYID0geDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdDaGFyKGNoYXIgdiwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh2ICE9IE5PQ0hBTkdFQ0hBUikge1xyXG4gICAgICAgICAgICAgICAgY2hhcnNbeCwgeV0gPSB2O1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hhcihjaGFyIHYsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcih2LCB4LCB5KTtcclxuICAgICAgICAgICAgU2V0Q29sb3IoY29sb3IsIHgsIHkpO1xyXG4gICAgICAgICAgICBTZXRCYWNrQ29sb3IoYmFja0NvbG9yLCB4LCB5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0QWxsKGNoYXIgdGV4dCwgaW50IHRleHRDb2xvciA9IE5PQ0hBTkdFQ09MT1IsIGludCBiYWNrQ29sb3I9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQodGV4dCwgMCwgMCwgV2lkdGgsIEhlaWdodCwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRBbGxJZlZpc2libGUoY2hhciB0ZXh0LCBpbnQgdGV4dENvbG9yID0gTk9DSEFOR0VDT0xPUiwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWRJZlZpc2libGUodGV4dCwgMCwgMCwgV2lkdGgsIEhlaWdodCwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3V2l0aEdyaWQoc3RyaW5nIHRleHQsIGludCB4LCBpbnQgeSwgaW50IGdyaWRDb2xvciwgaW50IHRleHRDb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB3aWR0aCA9IHRleHQuTGVuZ3RoO1xyXG4gICAgICAgICAgICBEcmF3R3JpZCh4LCB5LCB3aWR0aCArIDIsIDMsIGdyaWRDb2xvcik7XHJcbiAgICAgICAgICAgIERyYXcodGV4dCwgeCArIDEsIHkgKyAxLCB0ZXh0Q29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhzdHJpbmcgdiwgaW50IHgsIGludCB5LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB2Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgeDIgPSB4ICsgaTtcclxuICAgICAgICAgICAgICAgIGludCB5MiA9IHk7XHJcbiAgICAgICAgICAgICAgICBpZih4MiA+PSBXaWR0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB4MiAtPSBXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB5MisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIodltpXSwgeDIsIHkyLCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1dpdGhMaW5lYnJlYWtzKHN0cmluZyB2LCBpbnQgeCwgaW50IHksIGludCBuZXdsaW5lWCwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBsaW5lYnJlYWtzID0gMDtcclxuICAgICAgICAgICAgaW50IHhPZmZzZXRuZXdsaW5lcyA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdi5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHgyID0geCArIGkrIHhPZmZzZXRuZXdsaW5lcztcclxuICAgICAgICAgICAgICAgIGludCB5MiA9IHk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICh4MiA+PSBXaWR0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB4MiAtPSBXaWR0aCtuZXdsaW5lWDtcclxuICAgICAgICAgICAgICAgICAgICB5MisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIodltpXSwgeDIsIHkyK2xpbmVicmVha3MsIGNvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZbaV0gPT0gJ1xcbicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZWJyZWFrcysrO1xyXG4gICAgICAgICAgICAgICAgICAgIHhPZmZzZXRuZXdsaW5lcyArPSBuZXdsaW5lWCAtIHgyLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KElFbnVtZXJhYmxlPGNoYXI+IHYsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Db3VudDxjaGFyPih2KTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhcihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkVsZW1lbnRBdDxjaGFyPih2LGkpLCB4ICsgaSwgeSwgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdHcmlkKGludCB4LCBpbnQgeSwgaW50IHdpZHRoLCBpbnQgaGVpZ2h0LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKFVuaWNvZGUuQXNjaWlHcmlkVmVyLCB4LCB5LCAxLCBoZWlnaHQsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKFVuaWNvZGUuQXNjaWlHcmlkVmVyLCB4ICsgd2lkdGggLSAxLCB5LCAxLCBoZWlnaHQsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKFVuaWNvZGUuQXNjaWlHcmlkSG9yLCB4LCB5LCB3aWR0aCwgMSwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoVW5pY29kZS5Bc2NpaUdyaWRIb3IsIHgsIHkgKyBoZWlnaHQgLSAxLCB3aWR0aCwgMSwgY29sb3IpO1xyXG5cclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKChjaGFyKTIxOCwgeCwgeSwgMSwgMSwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoKGNoYXIpMTkyLCB4LCAgICAgICAgICAgICAgeStoZWlnaHQtMSwgMSwgMSwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoKGNoYXIpMjE3LCB4K3dpZHRoLTEsICAgICAgeSsgaGVpZ2h0IC0gMSwgMSwgMSwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoKGNoYXIpMTkxLCB4ICsgd2lkdGggLSAxLCAgeSwgMSwgMSwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1JlcGVhdGVkKGNoYXIgYywgaW50IHgsIGludCB5LCBpbnQgd2lkdGgsIGludCBoZWlnaHQsIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0geDsgaSA8IHggKyB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0geTsgaiA8IHkgKyBoZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBEcmF3Q2hhcihjLCBpLCBqLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFNldEJhY2tDb2xvcihiYWNrQ29sb3IsIGksIGopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3UmVwZWF0ZWRJZlZpc2libGUoY2hhciBjLCBpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodCwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSB4OyBpIDwgeCArIHdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSB5OyBqIDwgeSArIGhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFyc1tpLCBqXSAhPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ0hBUiB8fCBUZXh0Q29sb3JbaSxqXSAhPSBJTlZJU0lCTEVDT0xPUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgRHJhd0NoYXIoYywgaSwgaiwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKEJhY2tDb2xvcltpLGpdICE9IFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2V0QmFja0NvbG9yKGJhY2tDb2xvciwgaSwgaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldENvbG9yKGludCBjb2xvciwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbG9yICE9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICBUZXh0Q29sb3JbeCwgeV0gPSBjb2xvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEJhY2tDb2xvcihpbnQgY29sb3IsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb2xvciAhPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBCYWNrQ29sb3JbeCwgeV0gPSBjb2xvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhzdHJpbmcgdiwgaW50IHgyLCBpbnQgeTIsIG9iamVjdCBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0dyaWQoaW50IHYxLCBpbnQgdjIsIGludCB2MywgaW50IHY0LCBvYmplY3QgYm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgRHJhd0N1cnNvclJlc3VsdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGludCBTdGFydEluZGV4O1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IEVuZEluZGV4O1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgU3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIEVuZFBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIERyYXdDdXJzb3JSZXN1bHQoaW50IHN0YXJ0SW5kZXgsIGludCBlbmRJbmRleCwgVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgVmVjdG9yMkQgZW5kUG9zaXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFN0YXJ0SW5kZXggPSBzdGFydEluZGV4O1xyXG4gICAgICAgICAgICAgICAgRW5kSW5kZXggPSBlbmRJbmRleDtcclxuICAgICAgICAgICAgICAgIFN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgRW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRTY3JlZW5OIDogSVRleHRTY3JlZW4sIElNb3VzZUlucHV0LCBJS2V5Ym9hcmRJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBUZXh0V29ybGQgVGV4dFdvcmxkO1xyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIFVwZGF0ZShmbG9hdCBmKSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRTY3JlZW5OKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dFNjcmVlbk4oVGV4dFdvcmxkIHRleHRXb3JsZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRXb3JsZCA9IHRleHRXb3JsZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyAgdm9pZCBJbml0KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRXb3JsZCA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgVGV4dFdvcmxkLkluaXQodywgaCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTW91c2VFdmVudChNb3VzZUV2ZW50cyBtb3VzZURvd24sIGludCB2MSwgaW50IHYyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0VW5pY29kZSB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgaW50IElucHV0QXNOdW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSW5wdXRVbmljb2RlIC0gNDg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludGVyZmFjZSBJVGV4dFNjcmVlblxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIFRleHRCb2FyZCBHZXRCb2FyZCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZvaWQgVXBkYXRlKGZsb2F0IGYpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSU1vdXNlSW5wdXRcclxuICAgIHtcclxuICAgICAgICB2b2lkIE1vdXNlRXZlbnQoTW91c2VFdmVudHMgZXZlbnRUeXBlLCBpbnQgdjEsIGludCB2Mik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludGVyZmFjZSBJS2V5Ym9hcmRJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBNb3VzZUV2ZW50c1xyXG4gICAgeyBcclxuICAgICAgICBNb3VzZURvd24sXHJcbiAgICAgICAgTm9uZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0U2NyZWVuSG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIElUZXh0U2NyZWVuIFNjcmVlbiB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIElNb3VzZUlucHV0IE1vdXNlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgSUtleWJvYXJkSW5wdXQgS2V5IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRBbGwob2JqZWN0IGRucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNjcmVlbiA9IGRucyBhcyBJVGV4dFNjcmVlbjtcclxuICAgICAgICAgICAgTW91c2UgPSBkbnMgYXMgSU1vdXNlSW5wdXQ7XHJcbiAgICAgICAgICAgIEtleSA9IGRucyBhcyBJS2V5Ym9hcmRJbnB1dDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwSGFuZGxpbmdcclxuICAgIHtcclxuICAgICAgICBCYXR0bGVSZW5kZXIgYmF0dGxlUmVuZGVyO1xyXG4gICAgICAgIEVDU01hbmFnZXIgZWNzO1xyXG4gICAgICAgIHB1YmxpYyBBY3Rpb24gSGFuZGxlO1xyXG4gICAgICAgIExpc3Q8SGFwcEhhbmRsZXI+IGhhbmRsZXJzID0gbmV3IExpc3Q8SGFwcEhhbmRsZXI+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSBRdWlja0FjY2Vzc29yVHdvPEhhcHBUYWdzLCBUaW1lU3RhbXBTbmFwPiBoYXBwcztcclxuICAgICAgICBwcml2YXRlIGZsb2F0IGhpZ2hlc3RIYW5kbGVkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gaGFuZGxlU3RhdGUuaGlnaGVzdEhhbmRsZWQ7IH1cclxuICAgICAgICAgICAgc2V0IHsgaGFuZGxlU3RhdGUuaGlnaGVzdEhhbmRsZWQgPSB2YWx1ZTsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIEhhcHBIYW5kbGVTdGF0ZSBoYW5kbGVTdGF0ZSA9IG5ldyBIYXBwSGFuZGxlU3RhdGUoKTtcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBIYW5kbGluZyhCYXR0bGVSZW5kZXIgYmF0dGxlUmVuZGVyLCBCYXR0bGVTZXR1cCBiYXR0bGVTZXR1cClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlUmVuZGVyID0gYmF0dGxlUmVuZGVyO1xyXG4gICAgICAgICAgICB2YXIgd29ybGQgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkO1xyXG4gICAgICAgICAgICB2YXIgcG9zQW5pbSA9IHdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLlBvc2l0aW9uQW5pbWF0aW9uPihuZXcgUG9zaXRpb25BbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHZhciBibGlua0FuaW0gPSB3b3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5CbGlua0FuaW0+KG5ldyBCbGlua0FuaW0oKSk7XHJcbiAgICAgICAgICAgIHZhciBkZWxheUFuaW0gPSB3b3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5EZWxheXNBbmltYXRpb24+KG5ldyBEZWxheXNBbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gYmF0dGxlU2V0dXAuZWNzO1xyXG4gICAgICAgICAgICB0aGlzLmVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KGhhbmRsZVN0YXRlKTtcclxuICAgICAgICAgICAgdmFyIGJhdHRsZU1haW4gPSBiYXR0bGVTZXR1cC5iYXR0bGVNYWluO1xyXG4gICAgICAgICAgICB2YXIgdGltZSA9IGJhdHRsZVNldHVwLnRpbWVTdGFtcDtcclxuICAgICAgICAgICAgYmF0dGxlUmVuZGVyLkhhcHBIYW5kbGluZyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGhhcHBzID0gZWNzLlF1aWNrQWNjZXNzb3IyPEhhcHBUYWdzLCBUaW1lU3RhbXBTbmFwPigpO1xyXG4gICAgICAgICAgICBoaWdoZXN0SGFuZGxlZCA9IC0xO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChuZXcgSGFwcEhhbmRsZXIoKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkYW1hZ2UgPSBlLkdldENvbXBvbmVudDxIYXBwRGFtYWdlRGF0YT4oKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIGlmIChkYW1hZ2UuZWxlbWVudGFsQmxvY2spXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHRleHQgPSBkYW1hZ2UuZGFtYWdlRS5Ub1N0cmluZygpLlRvVXBwZXIoKSArIFwiIEJMT0NLIFwiICsgZGFtYWdlLnRhcmdldEUuVG9TdHJpbmcoKS5Ub1VwcGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlMiA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eSh0ZXh0Lkxlbmd0aCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBjb2xvckUgPSBCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGRhbWFnZS5kYW1hZ2VFKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTIuT3JpZ2luLkRyYXcodGV4dCwgMCwgMCwgY29sb3JFKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQobWVzc2FnZTIuQW5pbUJhc2UoMC42ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuRnJvbnRDb2xvcihjb2xvckUsIDAuMmYpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IG9mZnNldCA9IChpbnQpTWF0aC5GbG9vcigtdGV4dC5MZW5ndGggLyAyZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UyLlNldFBvc2l0aW9uKGJhdHRsZVJlbmRlci5iYXR0bGVyUmVuZGVyc1tkYW1hZ2UudGFyZ2V0XS5HZXRQb3NpdGlvbigpICsgbmV3IFZlY3RvcjJEKCsxICsgb2Zmc2V0LCAtMykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxheUFuaW0uRGVsYXkoMC42NWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihiYXR0bGVNYWluLmVudGl0aWVzW2RhbWFnZS50YXJnZXRdLnBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBibGFzdCA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eSg1LCA1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxhc3QuU2V0UG9zaXRpb24ocG9zICsgbmV3IFZlY3RvcjJEKC0yLCAtMikpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxhc3QuT3JpZ2luLkRyYXdSZWN0KCcgJywgMCwgMCwgNSwgNSwgVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SLCBCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGRhbWFnZS5kYW1hZ2VFKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYmxhc3QuT3JpZ2luLkRyYXdSZXBlYXRlZCgnICcsIDEsIDEsIDMsIDMsIFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUiwgQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKGJsYXN0LkFuaW1CYXNlKDAuMmYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuQ29sb3JzLmlucHV0S2V5LCAwLjA1ZiwgZmFsc2UpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGRhbWFnZS5kYW1hZ2VFICsgXCIgYWJzb3JicyBcIiArIGRhbWFnZS50YXJnZXRFICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGJhdHRsZVJlbmRlci5HZXRFbnRpdHlOYW1lKGRhbWFnZS50YXJnZXQpICsgXCIgaXMgdW5hZmVjdHRlZC5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZXNzYWdlID0gYmF0dGxlUmVuZGVyLkdldEVudGl0eU5hbWUoZGFtYWdlLnRhcmdldCkgKyBcIiBnZXRzIGhpdCFcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGFtYWdlLnN1cGVyRWZmZWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyB0ZXh0ID0gZGFtYWdlLmRhbWFnZUUuVG9TdHJpbmcoKS5Ub1VwcGVyKCkgKyBcIiBCUkVBSyBcIiArIGRhbWFnZS50YXJnZXRFLlRvU3RyaW5nKCkuVG9VcHBlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UyID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRUZW1wRW50aXR5KHRleHQuTGVuZ3RoLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludCBjb2xvckUgPSBCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGRhbWFnZS5kYW1hZ2VFKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UyLk9yaWdpbi5EcmF3KHRleHQsIDAsIDAsIGNvbG9yRSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChtZXNzYWdlMi5BbmltQmFzZSgwLjQ1ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuRnJvbnRDb2xvcihjb2xvckUsIDAuMmYpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludCBvZmZzZXQgPSAoaW50KU1hdGguRmxvb3IoLXRleHQuTGVuZ3RoIC8gMmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTIuU2V0UG9zaXRpb24oYmF0dGxlUmVuZGVyLmJhdHRsZXJSZW5kZXJzW2RhbWFnZS50YXJnZXRdLkdldFBvc2l0aW9uKCkgKyBuZXcgVmVjdG9yMkQoKzEgKyBvZmZzZXQsIC0yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxheUFuaW0uRGVsYXkoMC42NWYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tZXNzYWdlID0gZGFtYWdlLmRhbWFnZUUgKyBcIiByYXZhZ2VzIFwiICsgZGFtYWdlLnRhcmdldEUgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21lc3NhZ2UgKz0gYmF0dGxlUmVuZGVyLkdldEVudGl0eU5hbWUoZGFtYWdlLnRhcmdldCkrXCIgdGFrZXMgYSBoZWF2eSBoaXQhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihiYXR0bGVNYWluLmVudGl0aWVzW2RhbWFnZS50YXJnZXRdLnBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmxhc3QgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoNSwgNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibGFzdC5TZXRQb3NpdGlvbihwb3MgKyBuZXcgVmVjdG9yMkQoLTIsIC0yKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxhc3QuT3JpZ2luLkRyYXdSZXBlYXRlZCgnICcsIDEsIDEsIDMsIDMsIFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKGJsYXN0LkFuaW1CYXNlKDAuMmYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGRhbWFnZS5kYW1hZ2VFKSwgMC4wNWYpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21lc3NhZ2UgPSBiYXR0bGVSZW5kZXIuR2V0RW50aXR5TmFtZShkYW1hZ2UudGFyZ2V0KSArIFwiIGdldHMgaHVydFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlUmVuZGVyLlNob3dNZXNzYWdlKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkZWZlbmRlciA9IGJhdHRsZVJlbmRlci5iYXR0bGVyUmVuZGVyc1tkYW1hZ2UudGFyZ2V0XTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBmZSA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eShkZWZlbmRlci5XaWR0aCwgZGVmZW5kZXIuSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGlmICghZGFtYWdlLnN1cGVyRWZmZWN0aXZlICYmICFkYW1hZ2UuZWxlbWVudGFsQmxvY2sgJiYgYmF0dGxlTWFpbi5lbnRpdGllc1tkYW1hZ2UudGFyZ2V0XS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmUgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoMywgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJhY2tDb2xvciA9IEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoZGFtYWdlLmRhbWFnZUUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tDb2xvciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHhDb2xvciA9IEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoZGFtYWdlLmRhbWFnZUUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYXIgZGFtYWdlQ2hhciA9ICdYJztcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoZGFtYWdlQ2hhciwgMSwgMCwgeENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihkYW1hZ2VDaGFyLCAxLCAxLCB4Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKGRhbWFnZUNoYXIsIDEsIDIsIHhDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoZGFtYWdlQ2hhciwgMCwgMSwgeENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihkYW1hZ2VDaGFyLCAyLCAxLCB4Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9mZS5PcmlnaW4uRHJhd0NoYXIoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLlBvc2l0aW9uID0gZGVmZW5kZXIuR2V0UG9zaXRpb24oKSArIG5ldyBWZWN0b3IyRCgtMSwgLTEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKGZlLkFuaW1CYXNlKDAuMzVmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5DaGFyKCdaJywgMC4wNWYpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2JsaW5rQW5pbS5BZGQoZmUuQW5pbUJhc2UoMC4zNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm8sIDAuMDVmKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiQ0hBTkdFIEVMRVwiKTtcclxuXHJcbiAgICAgICAgICAgIH0sIE1pc2NIYXBwVGFncy5EYW1hZ2UpKTtcclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKG5ldyBIYXBwSGFuZGxlcigoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZCA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlRGF0YT4oKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc3RyaW5nIHRleHQgPSBobWQuZWxlbWVudC5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkodGV4dC5MZW5ndGgsIDEpO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5PcmlnaW4uRHJhdyh0ZXh0LCAwLCAwLCBCYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm8pO1xyXG4gICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChtZXNzYWdlLkFuaW1CYXNlKDAuNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkZyb250Q29sb3IoQmF0dGxlUmVuZGVyLkNvbG9ycy5JbnB1dERlc2NyaXB0aW9uLCAwLjE1ZikpO1xyXG4gICAgICAgICAgICAgICAgaW50IG9mZnNldCA9IChpbnQpTWF0aC5GbG9vcigtdGV4dC5MZW5ndGggLyAyZik7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLlNldFBvc2l0aW9uKGJhdHRsZVJlbmRlci5iYXR0bGVyUmVuZGVyc1tobWQudXNlcl0uR2V0UG9zaXRpb24oKSArIG5ldyBWZWN0b3IyRCgrMSArIG9mZnNldCwgLTEpKTtcclxuXHJcbiAgICAgICAgICAgIH0sIE1pc2NIYXBwVGFncy5DaGFuZ2VFbGVtZW50KSk7XHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChuZXcgSGFwcEhhbmRsZXIoKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBobWQgPSBlLkdldENvbXBvbmVudDxIYXBwTW92ZURhdGE+KCk7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBkZWZlbmRlciA9IGJhdHRsZVJlbmRlci5iYXR0bGVyUmVuZGVyc1tobWQudGFyZ2V0XTtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihiYXR0bGVNYWluLmVudGl0aWVzW2htZC51c2VyXS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJsYXN0ID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDMsIDMpO1xyXG4gICAgICAgICAgICAgICAgYmxhc3QuU2V0UG9zaXRpb24ocG9zICsgbmV3IFZlY3RvcjJEKC0xLCAtMSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJsYXN0Lk9yaWdpbi5EcmF3UmVwZWF0ZWQoJyAnLCAxLCAxLCAxLCAxLCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IsIEJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChibGFzdC5BbmltQmFzZSgwLjJmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5CYWNrQ29sb3IoQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvLCAwLjA1ZikpO1xyXG4gICAgICAgICAgICAgICAgLy9kZWxheUFuaW0uRGVsYXkoNSk7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJERUFUSFwiKTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkNIQU5HRSBFTEVcIik7XHJcblxyXG4gICAgICAgICAgICB9LCBNaXNjSGFwcFRhZ3MuRGVhdGgpKTtcclxuICAgICAgICAgICAgQWN0aW9uPEVudGl0eT4gbW92ZU1pc3MgPSAoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBTkRMRSEzXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZCA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlRGF0YT4oKTtcclxuICAgICAgICAgICAgICAgIHZhciBobWYgPSBlLkdldENvbXBvbmVudDxIYXBwTW92ZW1lbnRGYWlsPigpO1xyXG4gICAgICAgICAgICAgICAgaW50IGVJZCA9IGhtZC51c2VyO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vdmVyID0gYmF0dGxlTWFpbi5lbnRpdGllc1tlSWRdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBtb3Zlci5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MyID0gaG1mLm1vdmVUbztcclxuICAgICAgICAgICAgICAgIHZhciBwb3NGID0gKHBvcyArIHBvczIpIC8gMjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZmUgPSBiYXR0bGVSZW5kZXIuYmF0dGxlclJlbmRlcnNbZUlkXTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJNb3ZlIGZhaWxcIik7XHJcbiAgICAgICAgICAgICAgICBwb3NBbmltLkFkZChmZS5BbmltQmFzZSgwLjJmKSwgbmV3IFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YShcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihtb3Zlci5Qb3NpdGlvblYyRCksXHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zRikpKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKG5ldyBIYXBwSGFuZGxlcihtb3ZlTWlzcywgTW92ZURhdGFUYWdzLk1vdmVtZW50KSk7XHJcblxyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQobmV3IEhhcHBIYW5kbGVyKChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGEgPSBlLkdldENvbXBvbmVudDxIYXBwQXJlYT4oKTtcclxuICAgICAgICAgICAgICAgIHZhciBobWQgPSBlLkdldENvbXBvbmVudDxIYXBwTW92ZURhdGE+KCk7XHJcbiAgICAgICAgICAgICAgICBpbnQgZUlkID0gaG1kLnVzZXI7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW92ZXIgPSBiYXR0bGVNYWluLmVudGl0aWVzW2VJZF07XHJcbiAgICAgICAgICAgICAgICAvL3ZhciB1c2VyUmVuZGVyID0gYmF0dGxlUmVuZGVyLmJhdHRsZXJFbnRpdGllc1tlSWRdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFyZWEgPSBoYS5hcmVhO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvaW50cyA9IGFyZWEucG9pbnRzO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1c2VFZmZlY3QgPSB3b3JsZC5HZXRUZW1wRW50aXR5KDEsIDEpO1xyXG4gICAgICAgICAgICAgICAgdXNlRWZmZWN0LlNldFBvc2l0aW9uKGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKG1vdmVyLnBvcykpO1xyXG4gICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZCh1c2VFZmZlY3QuQW5pbUJhc2UoMC41ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQmFja0NvbG9yKEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoaG1kLmVsZW1lbnQpLCAwLjE1ZikpO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gcG9pbnRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbnRpdHkgPSB3b3JsZC5HZXRUZW1wRW50aXR5KDEsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaW5hbFBvcyA9IGl0ZW0gKiBuZXcgVmVjdG9yMkQoaGEubWlycm9yaW5nWCwgMSkgKyBoYS5vZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsUG9zLlggPCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWxQb3MuWSA8IDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbFBvcy5YID4gNSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsUG9zLlkgPiAyKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoZmluYWxQb3MuWEludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKGZpbmFsUG9zLllJbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihmaW5hbFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5LlNldFBvc2l0aW9uKHBvcy5YSW50LCBwb3MuWUludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChlbnRpdHkuQW5pbUJhc2UoMC41ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQmFja0NvbG9yKEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoaG1kLmVsZW1lbnQpLCAwLjE1ZikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBNb3ZlRGF0YVRhZ3MuQm9tYikpO1xyXG4gICAgICAgICAgICBIYW5kbGUgPSAoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFIVwiKTtcclxuICAgICAgICAgICAgICAgIGZsb2F0IG5ld0hpZ2hlc3RIYW5kbGVkID0gaGlnaGVzdEhhbmRsZWQ7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGhhcHBzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkFEVlwiK2JhdHRsZVJlbmRlci5DYW5BZHZhbmNlR3JhcGhpY3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFiYXR0bGVSZW5kZXIuQ2FuQWR2YW5jZUdyYXBoaWNzKCkpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWdzID0gaGFwcHMuQ29tcDEoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoaGFwcHMuQ29tcDIoaSkuVGltZVNuYXAgPiBoaWdoZXN0SGFuZGxlZClcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IGhpZ2hlc3RIYW5kbGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9uZXdIaWdoZXN0SGFuZGxlZCA9IGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdIaWdoZXN0SGFuZGxlZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJIQU5ETEUhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaGFuIGluIGhhbmRsZXJzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFIXhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuLkNhbkhhbmRsZSh0YWdzLnRhZ3MpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoaGFwcHMuQ29tcDIoaSkuVGltZVNuYXAgKyBcIiAtIFwiICsgdGltZS5DdXJyZW50U25hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBTkRMRSEyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbi5IYW5kbGVyKGhhcHBzLkVudGl0eShpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShoYXBwcy5Db21wMihpKS5UaW1lU25hcCtcIiAtIFwiKyB0aW1lLkN1cnJlbnRTbmFwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBoaWdoZXN0SGFuZGxlZCA9IG5ld0hpZ2hlc3RIYW5kbGVkO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsYXNzIEhhcHBIYW5kbGVTdGF0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IGhpZ2hlc3RIYW5kbGVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEhhcHBIYW5kbGVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBMaXN0PGludD4gbmVjZXNzYXJ5VGFncyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgQWN0aW9uPEVudGl0eT4gSGFuZGxlcjtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBIYXBwSGFuZGxlcihBY3Rpb248RW50aXR5PiBoYW5kbGVyLCBwYXJhbXMgb2JqZWN0W10gdGFncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHQgaW4gdGFncylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuZWNlc3NhcnlUYWdzLkFkZChDb252ZXJ0LlRvSW50MzIodCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5IYW5kbGVyID0gaGFuZGxlcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW50ZXJuYWwgYm9vbCBDYW5IYW5kbGUoTGlzdDxpbnQ+IHRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIG5lY2Vzc2FyeVRhZ3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YWdzLkNvbnRhaW5zKGl0ZW0pKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gaGlnaGVzdEhhbmRsZWQgPj0gaGFwcHMuTGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIElucHV0SGFuZGxpbmdcclxuICAgIHtcclxuICAgICAgICBpbnRbXSB1bmZpeGVkQ29tbWFuZEtleXMgPSB7JzEnLCAnMicsJzMnLCc0JyB9O1xyXG4gICAgICAgIERpY3Rpb25hcnk8SW5wdXQsIGludD4gZml4ZWRNb3ZlQnV0dG9ucyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PElucHV0LCBpbnQ+KCksKF9vMSk9PntfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Ob3JtYWxTaG90KSwnZycpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpLCdmJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlKSwnaScpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIpLCdiJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIpLCd5Jyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlciksJ3QnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQpLCdkJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwKSwndycpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVEb3duKSwncycpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0KSwnYScpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuRG9uZSksVW5pY29kZS5TcGFjZSk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5SZWRvKSwncicpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuUHJldmlldyksJ3AnKTtyZXR1cm4gX28xO30pO1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEdldEZpeGVkTW92ZVVuaWNvZGUoSW5wdXQgaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgdmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChmaXhlZE1vdmVCdXR0b25zLlRyeUdldFZhbHVlKGlucHV0LCBvdXQgdmFsdWUpKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSW5wdXQgUGlja2luZ0hhbmQoaW50IHVuaWNvZGVLZXksIElucHV0SG9sZGVyIGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIiBpbnB1dCArIFwiKyhjaGFyKXVuaWNvZGVLZXkpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBmaXhlZE1vdmVCdXR0b25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5WYWx1ZSA9PSB1bmljb2RlS2V5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLktleTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHVuZml4ZWRDb21tYW5kS2V5cy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVuZml4ZWRDb21tYW5kS2V5c1tpXSA9PSB1bmljb2RlS2V5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB1bmZpeGVkQ29tbWFuZFBvcyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaTIgPSAwOyBpMiA8IGlucHV0LmlucHV0cy5Db3VudDsgaTIrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5UYWdJcyhpMiwgSW5wdXRUYWdzLk1PVkVVTkZJWCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1bmZpeGVkQ29tbWFuZFBvcyA9PSBpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dC5pbnB1dHNbaTJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5maXhlZENvbW1hbmRQb3MrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdChJbnB1dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTWVzc2FnZU9uUG9zaXRpb25cclxuICAgIHtcclxuICAgICAgICBCYXR0bGVSZW5kZXIgYmF0dGxlUmVuZGVyO1xyXG4gICAgICAgIHByaXZhdGUgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuICAgICAgICBwcml2YXRlIEJsaW5rQW5pbSBibGlua0FuaW07XHJcblxyXG4gICAgICAgIHB1YmxpYyBNZXNzYWdlT25Qb3NpdGlvbihCYXR0bGVSZW5kZXIgYmF0dGxlUmVuZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZDtcclxuICAgICAgICAgICAgYmxpbmtBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkJsaW5rQW5pbT4obmV3IEJsaW5rQW5pbSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE1lc3NhZ2VPblBvcyhWZWN0b3IyRCBwb3MsIHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGVudGl0eSA9IHRleHRXb3JsZC5HZXRUZW1wRW50aXR5KHYuTGVuZ3RoICsgMiwgNik7XHJcbiAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoZW50aXR5LkFuaW1CYXNlKDJmKSwgbmV3IEJsaW5rQW5pbS5CbGlua0RhdGEoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCAwLjM1ZiwgMC4zNWYpKTtcclxuICAgICAgICAgICAgdmFyIHhPZmYgPSAodi5MZW5ndGggLSAzKSAvIDI7XHJcbiAgICAgICAgICAgIGlmICh4T2ZmIDwgMCkgeE9mZiA9IDA7XHJcbiAgICAgICAgICAgIHZhciBsaW5lU3RhcnQgPSBuZXcgVmVjdG9yMkQoeE9mZiwgMCk7XHJcbiAgICAgICAgICAgIGVudGl0eS5TZXRQb3NpdGlvbihwb3MgKyBuZXcgVmVjdG9yMkQoMSAtIHhPZmYsIDApKTtcclxuICAgICAgICAgICAgQ29uc29sZS5Xcml0ZShwb3MpO1xyXG4gICAgICAgICAgICAvL2VudGl0eS5PcmlnaW4uRHJhdyh2LCAxLCA1KTtcclxuICAgICAgICAgICAgZW50aXR5Lk9yaWdpbi5EcmF3V2l0aEdyaWQodiwgMCwgMywgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVybywgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVybyk7XHJcblxyXG4gICAgICAgICAgICBlbnRpdHkuT3JpZ2luLkRyYXdMaW5lcyhQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvLCBsaW5lU3RhcnQsIGxpbmVTdGFydCArIG5ldyBWZWN0b3IyRCgyLCAwKSwgbGluZVN0YXJ0ICsgbmV3IFZlY3RvcjJEKDIsIDIpKTtcclxuICAgICAgICAgICAgZW50aXR5Lk9yaWdpbi5BdXRvRml4R3JpZGRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlbjtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNb3VzZUhvdmVyVGV4dFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmdbXVtdIHRleHRzID0gbmV3IHN0cmluZ1syXVtdO1xyXG4gICAgICAgIHB1YmxpYyBNb3VzZUhvdmVyTWFuYWdlciBob3Zlck1hbmFnZXI7XHJcbiAgICAgICAgcHVibGljIFRleHRFbnRpdHkgZW50aXR5O1xyXG5cclxuICAgICAgICBwdWJsaWMgTW91c2VIb3ZlclRleHQoTW91c2VIb3Zlck1hbmFnZXIgaG92ZXJNYW5hZ2VyLCBUZXh0RW50aXR5IGVudGl0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaG92ZXJNYW5hZ2VyID0gaG92ZXJNYW5hZ2VyO1xyXG4gICAgICAgICAgICB0aGlzLmVudGl0eSA9IGVudGl0eTtcclxuICAgICAgICAgICAgLy90ZXh0c1swXSA9IG5ldyBzdHJpbmdbRW51bS5HZXRWYWx1ZXModHlwZW9mKEJhdHRsZU1haW4uTW92ZVR5cGUpKS5MZW5ndGhdO1xyXG4gICAgICAgICAgICB0ZXh0c1swXSA9IG5ldyBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgICAgICBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIHVwXCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIGRvd25cIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSByaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTaG9vdHMgZm9yd2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTaG9vdHMgZmlyZSBmb3J3YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBcIlNob290cyBpY2UgZm9yd2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTaG9vdHMgdGh1bmRlciBmb3J3YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBcIlRocm93cyBpY2UgYm9tYiB0aHJlZSBzcXVhcmVzIGZvcndhcmRcIixcclxuICAgICAgICAgICAgICAgIFwiVGhyb3dzIHRodW5kZXIgYm9tYiB0aHJlZSBzcXVhcmVzIGZvcndhcmRcIixcclxuICAgICAgICAgICAgICAgIFwiU3VtbW9ucyBhbm90aGVyIGVuZW15XCIsXHJcbiAgICAgICAgICAgICAgICBcIlwiLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW50aXR5LlJlc2V0RnVsbCgpO1xyXG4gICAgICAgICAgICBob3Zlck1hbmFnZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSBob3Zlck1hbmFnZXIubW91c2VIb3ZlcnNBY3RpdmU7XHJcbiAgICAgICAgICAgIGlmIChhY3RpdmUuQ291bnQgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgaWQgPSBhY3RpdmVbMF0uaWQ7XHJcbiAgICAgICAgICAgICAgICBpZihpZCA+PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyB0ZXh0ID0gdGV4dHNbYWN0aXZlWzBdLnR5cGVdW2lkXTtcclxuICAgICAgICAgICAgICAgICAgICBlbnRpdHkuT3JpZ2luLkRyYXcodGV4dCwgMCwgMCwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHggPSBhY3RpdmVbMF0ucmVjdC5YICsgMSAtIHRleHQuTGVuZ3RoLzI7XHJcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5LlNldFBvc2l0aW9uKHgsIGFjdGl2ZVswXS5yZWN0LlkgKyAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJldmlld1N5c3RlbVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgcHJpdmF0ZSBCYXR0bGVNYWluIGJhdHRsZU1haW47XHJcbiAgICAgICAgcHVibGljIGJvb2wgcHJldmlld0FjdGl2ZTtcclxuICAgICAgICBwcml2YXRlIENsb25lZFN0YXRlIGNsb25lZFN0YXRlO1xyXG4gICAgICAgIHByaXZhdGUgUXVpY2tBY2Nlc3Nvck9uZTxCYXR0bGVNYWluLkJhdHRsZUVudGl0eT4gYmF0dGxlRW50aXR5O1xyXG4gICAgICAgIERlYnVnZ2VyIGRlYnVnID0gbmV3IERlYnVnZ2VyKHRydWUpO1xyXG5cclxuICAgICAgICBwdWJsaWMgUHJldmlld1N5c3RlbShFQ1NNYW5hZ2VyIGVjcywgQmF0dGxlTWFpbiBiYXR0bGVNYWluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlTWFpbiA9IGJhdHRsZU1haW47XHJcbiAgICAgICAgICAgIGNsb25lZFN0YXRlID0gbmV3IENsb25lZFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGJhdHRsZUVudGl0eSA9IGVjcy5RdWlja0FjY2Vzc29yMTxCYXR0bGVNYWluLkJhdHRsZUVudGl0eT4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU3RhcnRQcmV2aWV3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGJhdHRsZU1haW4uZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KFwiQUxMIEVOVElUSUVTIEJFRk9SRSBQUkVWSUVXXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtLnJhbmRvbVBvc2l0aW9uICsgXCIgUkFORE9NIFBPU1wiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KGl0ZW0uVHlwZSArIFwiIHR5cGVcIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtLmRyYXdUdXJuICsgXCIgZHJhdyB0dXJuXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoXCJFTkRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWNzLkNsb25lU3RhdGUoY2xvbmVkU3RhdGUpO1xyXG4gICAgICAgICAgICBiYXR0bGVNYWluLmJhdHRsZVN0YXRlLkJhdHRsZUVuZEFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwcmV2aWV3QWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGJhdHRsZU1haW4uZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmhlcm8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5saWZlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGl0ZW0ubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm1vdmVzW2ldID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uVGljaygpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRW5kUHJldmlldygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJFbmQgcHJldmlld1wiKTtcclxuICAgICAgICAgICAgLy8gICBDb25zb2xlLlJlYWRLZXkoKTtcclxuICAgICAgICAgICAgcHJldmlld0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShiYXR0bGVNYWluLmVudGl0aWVzLkNvbnRhaW5zKGJhdHRsZUVudGl0eS5Db21wMSgwKSkrXCJYWFhTXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZWNzLlJlc3RvcmVTdGF0ZShjbG9uZWRTdGF0ZSk7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uYmF0dGxlU3RhdGUucGhhc2UgPSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcztcclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGJhdHRsZU1haW4uZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KFwiQUxMIEVOVElUSUVTIEFGVEVSIFBSRVZJRVdcIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KGl0ZW0ucmFuZG9tUG9zaXRpb24rXCIgUkFORE9NIFBPU1wiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KGl0ZW0uVHlwZSArIFwiIHR5cGVcIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtLmRyYXdUdXJuICsgXCIgZHJhdyB0dXJuXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoXCJFTkRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFJlZmxlY3Rpb25UZXN0XHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZWZsZWN0aW9uVGVzdCgpIHtcclxuICAgICAgICAgICAgdmFyIGRlYnVnID0gbmV3IERlYnVnZ2VyKHRydWUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgYmUgPSBuZXcgQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBiZS5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGJlMiA9IG5ldyBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICBiZTIucmFuZG9tUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludCh0eXBlLkdldEZpZWxkKFwicmFuZG9tUG9zaXRpb25cIikuR2V0VmFsdWUoYmUyKS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgZGVidWcuUHJpbnQoYmUyLnJhbmRvbVBvc2l0aW9uICsgXCJcIik7XHJcbiAgICAgICAgICAgIGRlYnVnLlByaW50KGJlKTtcclxuICAgICAgICAgICAgRGVlcENsb25lSGVscGVyLkRlZXBDb3B5UGFydGlhbChiZSwgYmUyKTtcclxuICAgICAgICAgICAgRGVlcENsb25lSGVscGVyLkRlZXBDb3B5UGFydGlhbChiZTIsIGJlKTtcclxuICAgICAgICAgICAgZGVidWcuUHJpbnQoYmUpO1xyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludChiZTIpO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGRlYnVnLlByaW50KHR5cGUuR2V0RmllbGQoXCJyYW5kb21Qb3NpdGlvblwiKS5HZXRWYWx1ZShiZTIpLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludChiZTIucmFuZG9tUG9zaXRpb24rXCJcIik7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlbjtcclxudXNpbmcgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVSZW5kZXIgOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEJhdHRsZU1haW4gdHVybkJhc2VUcnk7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBTdGFnZURhdGEgc3RhZ2VEYXRhO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUHJldmlld1N5c3RlbSBwcmV2aWV3U3lzdGVtO1xyXG4gICAgICAgIHByaXZhdGUgUG9zaXRpb25BbmltYXRpb24gcG9zQW5pbTtcclxuICAgICAgICBwcml2YXRlIENoYXJCeUNoYXJBbmltYXRpb24gY2hhckJ5Q2hhckFuaW07XHJcbiAgICAgICAgcHJpdmF0ZSBEZWxheXNBbmltYXRpb24gZGVsYXlBbmltO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIFRleHRCb2FyZCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgaW50IGlucHV0O1xyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBpbnB1dDsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSB2YWx1ZTsgLy9Db25zb2xlLldyaXRlTGluZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwSGFuZGxpbmcgSGFwcEhhbmRsaW5nIHsgZ2V0OyBpbnRlcm5hbCBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0VW5pY29kZSB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIE1vdXNlSU8gTW91c2UgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUhvdmVyTWFuYWdlciBtb3VzZUhvdmVyO1xyXG5cclxuICAgICAgICAvL3B1YmxpYyBMaXN0PERlbGF5ZWRBY3Rpb25zPiB0YXNrcyA9IG5ldyBMaXN0PERlbGF5ZWRBY3Rpb25zPigpO1xyXG4gICAgICAgIERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+IG1vdmVDaGFycztcclxuICAgICAgICBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPiBtb3ZlRGVzY3JpcHRpb25zID0gbmV3IERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+KCk7XHJcbiAgICAgICAgRGljdGlvbmFyeTxNaXNjQmF0dGxlSW5wdXQsIHN0cmluZz4gbWlzY0Rlc2NyaXB0aW9ucyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PE1pc2NCYXR0bGVJbnB1dCwgc3RyaW5nPigpLChfbzEpPT57X28xLkFkZChNaXNjQmF0dGxlSW5wdXQuRG9uZSxcIkRPTkVcIik7X28xLkFkZChNaXNjQmF0dGxlSW5wdXQuUmVkbyxcIlJFRE9cIik7X28xLkFkZChNaXNjQmF0dGxlSW5wdXQuUHJldmlldyxcIlBSRVZJRVdcIik7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICBwcml2YXRlIERpY3Rpb25hcnk8SW5wdXQsIHN0cmluZz4gbW92ZUJ1dHRvbnM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBkZWJ1Z09uID0gdHJ1ZTtcclxuICAgICAgICBwcml2YXRlIGludCBncmlkU2NhbGUgPTU7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZ3JpZE9mZnNldHggPTI7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZ3JpZE9mZnNldHkgPSAxO1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8VGV4dEVudGl0eT4gYmF0dGxlclJlbmRlcnM7XHJcblxyXG4gICAgICAgIGNoYXJbXVtdIGVudGl0aWVzQ2hhcnM7XHJcbiAgICAgICAgcHJpdmF0ZSBib29sIE1lc3NhZ2VEb05vdEhpZGU7XHJcbiAgICAgICAgc3RyaW5nIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCB3YWl0aW5nRm9yTWVzc2FnZUlucHV0O1xyXG4gICAgICAgIHByaXZhdGUgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UgbGFzdFBoYXNlO1xyXG4gICAgICAgIHByaXZhdGUgVGV4dEVudGl0eSBtZXNzYWdlRW50O1xyXG5cclxuICAgICAgICBwdWJsaWMgSW5wdXRIYW5kbGluZyBpbnB1dEggPSBuZXcgSW5wdXRIYW5kbGluZygpO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlUmVuZGVyKEJhdHRsZU1haW4gYmF0dGxlTG9naWMsIFN0YWdlRGF0YSBzdGFnZURhdGEsIFByZXZpZXdTeXN0ZW0gUHJldmlld1N5c3RlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgc3RyaW5nW10gZW50aXR5VGV4dHMgPSB7IFwiQFwiLCBcIiZcIiwgXCIlXCIsIFwiJFwiLCBcIk9cIiwgXCJYXCIsIFwiSlwiLCBcIllcIiwgXCJaXCIgfTtcclxuICAgICAgICAgICAgZW50aXRpZXNDaGFycyA9IG5ldyBjaGFyW2VudGl0eVRleHRzLkxlbmd0aF1bXTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlbnRpdHlUZXh0cy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZW50aXRpZXNDaGFyc1tpXSA9IGVudGl0eVRleHRzW2ldLlRvQ2hhckFycmF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHR1cm5CYXNlVHJ5ID0gYmF0dGxlTG9naWM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2VEYXRhID0gc3RhZ2VEYXRhO1xyXG4gICAgICAgICAgICBwcmV2aWV3U3lzdGVtID0gUHJldmlld1N5c3RlbTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICBwb3NBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLlBvc2l0aW9uQW5pbWF0aW9uPihuZXcgUG9zaXRpb25BbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIGNoYXJCeUNoYXJBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkNoYXJCeUNoYXJBbmltYXRpb24+KG5ldyBDaGFyQnlDaGFyQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICBkZWxheUFuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuRGVsYXlzQW5pbWF0aW9uPihuZXcgRGVsYXlzQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuSW5pdCg3MCwgNDYpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQgPSB0ZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgICAgICAvL1RleHRCb2FyZCA9IG5ldyBUZXh0Qm9hcmQoNzAsIDI1KTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIHBvc0FuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uKG5ldyBQb3NpdGlvbkFuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgdmFyIGJsaW5rQW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5CbGlua0FuaW0+KG5ldyBCbGlua0FuaW0oKSk7XHJcblxyXG4gICAgICAgICAgICBiYXR0bGVyUmVuZGVycyA9IG5ldyBMaXN0PFRleHRFbnRpdHk+KCk7XHJcbiAgICAgICAgICAgIFVwZGF0ZUJhdHRsZVJlbmRlckNvdW50KCk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgbWVzc2FnZUVudCA9IHRleHRXb3JsZC5HZXRGcmVlRW50aXR5KDQwLCA0KTtcclxuXHJcbiAgICAgICAgICAgIHR1cm5CYXNlVHJ5LmhhcHBNYW5hZ2VyLkFkZEhhbmRsZXIobmV3IEhhcHBzLkhhcHBIYW5kbGVyKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkhhcHBUYWcuQXR0YWNrSGl0LCAoaCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VyID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaC5HZXRBdHRyaWJ1dGVfSW50KDEpXTtcclxuICAgICAgICAgICAgICAgIGludCBkZWZlbmRlckVJRCA9IGguR2V0QXR0cmlidXRlX0ludCgwKTtcclxuICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZUVudGl0eSBkZWZlbmRlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmZW5kZXJFSUQgPj0gMClcclxuICAgICAgICAgICAgICAgICAgICBkZWZlbmRlciA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2RlZmVuZGVyRUlEXTtcclxuICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50KWguR2V0QXR0cmlidXRlX0ludCgyKTtcclxuICAgICAgICAgICAgICAgIFRleHRFbnRpdHkgZmUgPSBHZXRQcm9qVGV4dEVudGl0eShlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmZW5kZXIgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYXR0YWNrZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvczIgPSBkZWZlbmRlci5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgeERpcyA9IE1hdGguQWJzKHBvcy5YIC0gcG9zMi5YKTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCB0aW1lID0gKGZsb2F0KXhEaXMgKiAwLjFmO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBwb3NBbmltLkFkZChmZS5BbmltQmFzZSh0aW1lKSwgbmV3IFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YShcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihhdHRhY2tlci5Qb3NpdGlvblYyRCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oZGVmZW5kZXIuUG9zaXRpb25WMkQpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGF0dGFja2VyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MyID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlci5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zMi5YID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MyLlggPSA2O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB4RGlzID0gTWF0aC5BYnMocG9zLlggLSBwb3MyLlgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0IHRpbWUgPSAoZmxvYXQpeERpcyAqIDAuMWY7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoZmUuQW5pbUJhc2UodGltZSksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3MyKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgLy90dXJuQmFzZVRyeS5oYXBwTWFuYWdlci5BZGRIYW5kbGVyKG5ldyBIYXBwcy5IYXBwSGFuZGxlcihCYXR0bGVNYWluLkhhcHBUYWcuRGFtYWdlVGFrZW4sIChoKSA9PlxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgdmFyIGRlZmVuZGVyID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaC5HZXRBdHRyaWJ1dGVfSW50KDApXTtcclxuICAgICAgICAgICAgLy8gICAgdmFyIGZlID0gdGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoMSwgMSk7XHJcbiAgICAgICAgICAgIC8vICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCAwLCAwKTtcclxuICAgICAgICAgICAgLy8gICAgZmUuT3JpZ2luLlBvc2l0aW9uID0gQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihkZWZlbmRlci5Qb3NpdGlvblYyRCk7XHJcbiAgICAgICAgICAgIC8vICAgIGJsaW5rQW5pbS5BZGQoZmUuQW5pbUJhc2UoMC41ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQ2hhcignICcsIDAuMWYpKTtcclxuICAgICAgICAgICAgLy8gICAgLy9TaG93TWVzc2FnZShcIkdvdCBkYW1hZ2VkXCIpO1xyXG4gICAgICAgICAgICAvL30pKTtcclxuXHJcbiAgICAgICAgICAgIHR1cm5CYXNlVHJ5LmhhcHBNYW5hZ2VyLkFkZEhhbmRsZXIobmV3IEhhcHBzLkhhcHBIYW5kbGVyKEJhdHRsZU1haW4uSGFwcFRhZy5BdHRhY2tNaXNzLCAoaCkgPT5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlciA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2guR2V0QXR0cmlidXRlX0ludCgwKV07XHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSAoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCloLkdldEF0dHJpYnV0ZV9JbnQoMSk7XHJcbiAgICAgICAgICAgICAgICBUZXh0RW50aXR5IGZlID0gR2V0UHJvalRleHRFbnRpdHkoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gYXR0YWNrZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zMiA9IHBvcztcclxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlci5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgICAgICBwb3MyLlggPSAtMTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBwb3MyLlggPSA2O1xyXG4gICAgICAgICAgICAgICAgdmFyIHhEaXMgPSBNYXRoLkFicyhwb3MuWCAtIHBvczIuWCk7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCB0aW1lID0gKGZsb2F0KXhEaXMgKiAwLjFmO1xyXG4gICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoZmUuQW5pbUJhc2UodGltZSksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3MpLFxyXG4gICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zMikpKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIG1vdmVDaGFycyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPigpLChfbzIpPT57X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUsXCJGXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2UsXCJJXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyLFwiVFwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTm9ybWFsU2hvdCxcIkdcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVSaWdodCxVbmljb2RlLlJpZ2h0YXJyb3cyK1wiXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXAsVW5pY29kZS5VcGFycm93MitcIlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24sVW5pY29kZS5Eb3duYXJyb3cyK1wiXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxVbmljb2RlLkxlZnRhcnJvdzIrXCJcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsXCJJQlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXCJUQlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuU3VtbW9uRW50aXR5LFwiU1VcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZyxcIiBcIik7cmV0dXJuIF9vMjt9KTtcclxuXHJcbiAgICAgICAgICAgIG1vdmVEZXNjcmlwdGlvbnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxvYmplY3QsIHN0cmluZz4oKSwoX28zKT0+e19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2UsXCJJY2UgU2hvdFwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSxcIkZpcmUgU2hvdFwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlcixcIlRodW5kZXIgU2hvdFwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYixcIkljZSBCb21iXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Ob3JtYWxTaG90LFwiR3VuXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsVW5pY29kZS5SaWdodGFycm93MitcIlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwLFVuaWNvZGUuVXBhcnJvdzIrXCJcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVEb3duLFVuaWNvZGUuRG93bmFycm93MitcIlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsVW5pY29kZS5MZWZ0YXJyb3cyK1wiXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyQm9tYixcIlRodW5kZXIgQm9tYlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuU3VtbW9uRW50aXR5LFwiU3VtbW9uXCIpO3JldHVybiBfbzM7fSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWVzT25Qb3MgPSBuZXcgTWVzc2FnZU9uUG9zaXRpb24odGhpcyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBlID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlclJlbmRlcnNbaV0uR2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAvL21lc09uUG9zLk1lc3NhZ2VPblBvcyhCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHR1cm5CYXNlVHJ5LmVudGl0aWVzW2ldLnBvcyksIFwiWU9VXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vTWVzc2FnZU9uUG9zKFZlY3RvcjJELlplcm8sIFwiWU9VXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy9Db25zb2xlLlJlYWRMaW5lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZUJhdHRsZVJlbmRlckNvdW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdoaWxlIChiYXR0bGVyUmVuZGVycy5Db3VudCA8IHRoaXMudHVybkJhc2VUcnkuZW50aXRpZXMuQ291bnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRleHRFbnRpdHkgaXRlbSA9IHRleHRXb3JsZC5HZXRGcmVlRW50aXR5KDIsIDIpO1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlclJlbmRlcnMuQWRkKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5TZXRQb3NpdGlvbihCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKCB0dXJuQmFzZVRyeS5lbnRpdGllc1tiYXR0bGVyUmVuZGVycy5Db3VudC0xXS5wb3MpKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdHJpbmcgR2V0RW50aXR5TmFtZShpbnQgdXNlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZUVudGl0eSBnYW1lRW50aXR5ID0gdHVybkJhc2VUcnkuZW50aXRpZXNbdXNlcl07XHJcbiAgICAgICAgICAgIHZhciBjaGFycyA9IEdldENoYXIoZ2FtZUVudGl0eSk7XHJcbiAgICAgICAgICAgIHN0cmluZyBuYW1lID0gbmV3IHN0cmluZyhjaGFycyk7XHJcbiAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LmdyYXBoaWNSZXBlYXRlZEluZGV4ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hbWUgKyAoZ2FtZUVudGl0eS5ncmFwaGljUmVwZWF0ZWRJbmRleCArIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0RW50aXR5IEdldFByb2pUZXh0RW50aXR5KFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmZSA9IHRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDEsIDEpO1xyXG4gICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoVGV4dEJvYXJkLklOVklTSUJMRUNIQVIsIDAsIDApO1xyXG4gICAgICAgICAgICBpbnQgZWxlbWVudENvbG9yID0gRWxlbWVudFRvUHJvakNvbG9yKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBmZS5PcmlnaW4uU2V0QmFja0NvbG9yKGVsZW1lbnRDb2xvciwgMCwgMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgSW5wdXRLZXkgaW5wdXQgPSAoSW5wdXRLZXkpSW5wdXQ7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dCAhPSBJbnB1dEtleS5OT05FICYmIHdhaXRpbmdGb3JNZXNzYWdlSW5wdXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdhaXRpbmdGb3JNZXNzYWdlSW5wdXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vaWYgKGlucHV0ICE9IElucHV0S2V5Lk5PTkUpIENvbnNvbGUuV3JpdGVMaW5lKGlucHV0KTtcclxuICAgICAgICAgICAgLy9pbnQgaW5wdXROdW1iZXIgPSBpbnB1dCAtICcwJztcclxuICAgICAgICAgICAgLy9pZiAoZGVidWdPbiAmJiBpbnB1dCA9PSAnaycpXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBEZWJ1Z0V4dHJhLkRlYnVnRXguU2hvdygpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIGlmIChsYXN0UGhhc2UgIT0gdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9TaG93TWVzc2FnZShcIlBpY2sgeW91ciBjb21tYW5kc1wiLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLlNldEFsbChUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgQ29sb3JzLkZpcmVBdXJhKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdFBoYXNlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJYX19YXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEhpZGVNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuU2V0QWxsKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYXN0UGhhc2UgPSB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZTtcclxuICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlID09IEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoSW5wdXRVbmljb2RlID49IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoSW5wdXRVbmljb2RlID09ICdwJylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcHJldmlld1N5c3RlbS5TdGFydFByZXZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0WCA9IGlucHV0SC5QaWNraW5nSGFuZChJbnB1dFVuaWNvZGUsIHR1cm5CYXNlVHJ5LmlucHV0cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dFgudHlwZSAhPSBJbnB1dFR5cGUuTm9uZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuSW5wdXREb25lKGlucHV0WCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9mb3JlYWNoICh2YXIgaXRlbSBpbiBtb3ZlS2V5cylcclxuICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgLy8gICAgaWYgKGl0ZW0uVmFsdWUgPT0gaW5wdXQpXHJcbiAgICAgICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdHVybkJhc2VUcnkuSW5wdXREb25lKGl0ZW0uS2V5KTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFVwZGF0ZUJhdHRsZVJlbmRlckNvdW50KCk7XHJcbiAgICAgICAgICAgIERyYXdHcmFwaGljcyhkZWx0YSk7XHJcbiAgICAgICAgICAgIGlmIChDYW5BZHZhbmNlX0xvZ2ljKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSAhPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZSAuRXhlY3V0ZU1vdmUgJiYgcHJldmlld1N5c3RlbS5wcmV2aWV3QWN0aXZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXdTeXN0ZW0uRW5kUHJldmlldygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0dXJuQmFzZVRyeS5UaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5IYW5kUmVjaGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlRpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kczpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5FeGVjdXRlTW92ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TeXN0ZW0uVGhyZWFkaW5nLlRocmVhZC5TbGVlcCgzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0dXJuQmFzZVRyeS5UaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL1VwZGF0ZUJhdHRsZVJlbmRlckNvdW50KCk7XHJcbiAgICAgICAgICAgIC8vRHJhd0dyYXBoaWNzKGRlbHRhKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDYW5BZHZhbmNlR3JhcGhpY3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHRXb3JsZC5Jc0RvbmUoKSAmJiAhd2FpdGluZ0Zvck1lc3NhZ2VJbnB1dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBDYW5BZHZhbmNlX0xvZ2ljKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBDYW5BZHZhbmNlR3JhcGhpY3MoKSAmJiBIYXBwSGFuZGxpbmcuSXNEb25lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTaG93TWVzc2FnZShzdHJpbmcgcywgYm9vbCB3YWl0Rm9ySW5wdXQgPSB0cnVlLCBib29sIGRvTm90SGlkZSA9IGZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5NZXNzYWdlRG9Ob3RIaWRlID0gZG9Ob3RIaWRlO1xyXG4gICAgICAgICAgICBtZXNzYWdlID0gcztcclxuICAgICAgICAgICAgbWVzc2FnZUVudC5PcmlnaW4uUmVzZXRJbnZpc2libGUoKTtcclxuICAgICAgICAgICAgZmxvYXQgdGltZVRvV3JpdGUgPSBtZXNzYWdlLkxlbmd0aCAqIDAuMDE1ZjtcclxuICAgICAgICAgICAgaWYgKHRpbWVUb1dyaXRlID4gMC40ZikgdGltZVRvV3JpdGUgPSAwLjRmO1xyXG4gICAgICAgICAgICBjaGFyQnlDaGFyQW5pbS5BZGQobWVzc2FnZUVudC5BbmltQmFzZSh0aW1lVG9Xcml0ZSksIG5ldyBDaGFyQnlDaGFyQW5pbWF0aW9uLkNoYXJCeUNoYXJEYXRhKDAsIG1lc3NhZ2UuTGVuZ3RoICsgMSkpO1xyXG4gICAgICAgICAgICBkZWxheUFuaW0uRGVsYXkodGltZVRvV3JpdGUgKyAwLjhmKTtcclxuXHJcbiAgICAgICAgICAgIC8vd2FpdGluZ0Zvck1lc3NhZ2VJbnB1dCA9IHdhaXRGb3JJbnB1dDtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiTTogXCIrcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBIaWRlTWVzc2FnZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtZXNzYWdlID0gbnVsbDtcclxuICAgICAgICAgICAgd2FpdGluZ0Zvck1lc3NhZ2VJbnB1dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJNOiBcIitzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dCYXR0bGVNZXNzYWdlKHN0cmluZyBzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCF0dXJuQmFzZVRyeS5CYXR0bGVEZWNpZGVkKCkpXHJcbiAgICAgICAgICAgICAgICBTaG93TWVzc2FnZShzKTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiTTogXCIrcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3R3JhcGhpY3MoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3VzZUhvdmVyLm1vdXNlSG92ZXJzLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgICAgIC8vY2xlYXIgZ3JpZFxyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuUmVzZXQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsYXN0UGhhc2UgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuU2V0QWxsKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBDb2xvcnMuQmFja2dyb3VuZElucHV0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW50IGNvbnRyb2xzWSA9IGdyaWRTY2FsZSAqIDMgKyAxMCArIDMgKyAyO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaW50IGVuZW15R3JpZE9mZlggPSBncmlkU2NhbGUgKiAzO1xyXG4gICAgICAgICAgICBib29sIGRyYXdEb3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdSZXBlYXRlZCgnICcsIGdyaWRPZmZzZXR4LCBncmlkT2Zmc2V0eSwgZ3JpZFNjYWxlICogNiwgZ3JpZFNjYWxlICogMywgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIENvbG9ycy5CYWNrQmF0dGxlKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCAzICogZ3JpZFNjYWxlOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgMyAqIGdyaWRTY2FsZTsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkcmF3RG90KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdDaGFyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRPZmZzZXR4ICsgaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZE9mZnNldHkgKyBqLCBDb2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0NoYXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkT2Zmc2V0eCArIGkgKyBlbmVteUdyaWRPZmZYLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZE9mZnNldHkgKyBqLCBDb2xvcnMuR3JpZEVuZW15KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgJSBncmlkU2NhbGUgPT0gMCAmJiBqICUgZ3JpZFNjYWxlID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdHcmlkKGkgKyBncmlkT2Zmc2V0eCArIGVuZW15R3JpZE9mZlgsIGogKyBncmlkT2Zmc2V0eSwgZ3JpZFNjYWxlLCBncmlkU2NhbGUsIENvbG9ycy5HcmlkRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0dyaWQoaSArIGdyaWRPZmZzZXR4LCBqICsgZ3JpZE9mZnNldHksIGdyaWRTY2FsZSwgZ3JpZFNjYWxlLCBDb2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5lbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZ2FtZUVudGl0eSA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBlYyA9IEdldENoYXIoZ2FtZUVudGl0eSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IGdhbWVFbnRpdHkuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2NyZWVuUG9zID0gQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbigoQmFzZVV0aWxzLlZlY3RvcjJEKXBvcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5UeXBlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuUG9zLlkgPSBzY3JlZW5Qb3MuWSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuUG9zLlggPSBzY3JlZW5Qb3MuWCAtIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2JhdHRsZXJFbnRpdGllc1tpXS5vcmlnaW4uUG9zaXRpb24gPSBzY3JlZW5Qb3M7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLlBvc2l0aW9uICE9IHNjcmVlblBvcyAmJiB0ZXh0V29ybGQuSXNEb25lKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9iYXR0bGVyUmVuZGVyc1tpXS5PcmlnaW4uUG9zaXRpb24gPSBzY3JlZW5Qb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQgdGltZSA9IDAuMTVmO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGltZSA9IDU7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoYmF0dGxlclJlbmRlcnNbaV0uQW5pbUJhc2UodGltZSksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLlBvc2l0aW9uLCBzY3JlZW5Qb3MsIHRydWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYyA9IENvbG9ycy5IZXJvO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuVHlwZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KSBjID0gQ29sb3JzLkVuZW15O1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuVHlwZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cCkgYyA9IENvbG9ycy5pbnB1dEtleTtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LkRlYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgYyA9IFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUjtcclxuICAgICAgICAgICAgICAgIGludCBiYyA9IFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSBnYW1lRW50aXR5LmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudCE9UGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gRWxlbWVudFRvQXVyYUNvbG9yKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LkRlYWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBlYy5MZW5ndGggKyAxOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVyUmVuZGVyc1tpXS5PcmlnaW4uRHJhd0NoYXIoVGV4dEJvYXJkLklOVklTSUJMRUNIQVIsIGosIDAsIGMsIGJjKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZXJSZW5kZXJzW2ldLk9yaWdpbi5EcmF3KGVjLCAwLCAwLCBjLCBiYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ2FtZUVudGl0eS5ncmFwaGljUmVwZWF0ZWRJbmRleD4wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVyUmVuZGVyc1tpXS5PcmlnaW4uRHJhd09uZURpZ2l0KGdhbWVFbnRpdHkuZ3JhcGhpY1JlcGVhdGVkSW5kZXggKyAxLCAwICsgZWMuTGVuZ3RoLCAwLCBjLCBiYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGludCB0ZXh0Qm9hcmRIZWlnaHQgPSAzICogZ3JpZFNjYWxlO1xyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9pbnQgeSA9IDI7XHJcbiAgICAgICAgICAgICAgICAvL2ludCB4ID0gNiAqIGdyaWRTY2FsZSArIDIwO1xyXG5cclxuICAgICAgICAgICAgICAgIGludCB4ID0gMztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UgPT0gQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRHJhd0NvbnRyb2xzKGNvbnRyb2xzWSwgeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LnRpbWVUb0Nob29zZSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdCByYXRpbyA9IHR1cm5CYXNlVHJ5LnRpbWVUb0Nob29zZSAvIHR1cm5CYXNlVHJ5LnRpbWVUb0Nob29zZU1heDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdSZXBlYXRlZCgnICcsIHgsIGNvbnRyb2xzWSArIDE2LCAoaW50KShyYXRpbyAqIDE1KSwgMSwgQ29sb3JzLkJvYXJkLCBDb2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1JlcGVhdGVkKCcgJywgeCAtIDEsIGNvbnRyb2xzWSAtIDEsIDE1LCAxNSwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW50IHR1cm5PcmRlclggPSA2ICogZ3JpZFNjYWxlICsgNTtcclxuICAgICAgICAgICAgaW50IHR1cm5PcmRlclkgPSAyO1xyXG4gICAgICAgICAgICB0dXJuT3JkZXJYID0gMjtcclxuICAgICAgICAgICAgdHVybk9yZGVyWSA9IDMgKiBncmlkU2NhbGUgKyAxO1xyXG4gICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICAgICAgdHVybk9yZGVyWSArPSA1O1xyXG5cclxuICAgICAgICAgICAgRHJhd1R1cm5PcmRlcih0dXJuT3JkZXJYLCB0dXJuT3JkZXJZKTtcclxuICAgICAgICAgICAgaWYgKCFzdGFnZURhdGEuaGlkZUxpZmVVSSlcclxuICAgICAgICAgICAgICAgIERyYXdMaWZlKHR1cm5PcmRlclggKyAyNSwgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGludCBYID0gMjtcclxuICAgICAgICAgICAgICAgIC8vY29uc3QgaW50IFkgPSAxNjtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VFbnQuU2V0UG9zaXRpb24oWCwgY29udHJvbHNZIC0gMik7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSAhPSBudWxsICYmICghQ2FuQWR2YW5jZUdyYXBoaWNzKCkpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdHcmlkKFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG1lc3NhZ2VFbnQuT3JpZ2luLlBvc2l0aW9uLlhJbnQsIG1lc3NhZ2VFbnQuT3JpZ2luLlBvc2l0aW9uLllJbnQsIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG1lc3NhZ2VFbnQuV2lkdGgsIG1lc3NhZ2VFbnQuSGVpZ2h0LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZUVudC5PcmlnaW4uRHJhd0dyaWQoMCwgMCwgNDAsIDQsIENvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUVudC5PcmlnaW4uRHJhd1dpdGhMaW5lYnJlYWtzKG1lc3NhZ2UsIDEsIDAsIDEsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFNZXNzYWdlRG9Ob3RIaWRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VFbnQuT3JpZ2luLlNldEFsbCgnICcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd1JlcGVhdGVkKCcgJyxYLCBZLCA0MCwgNCwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSgxKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoMSk7XHJcbiAgICAgICAgICAgIC8vdGV4dEJvYXJkLkRyYXdfQ3Vyc29yKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlLlRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5EcmF3Q2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLlRyeUVuZEFuaW1hdGlvbnMoKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkFkdmFuY2VUaW1lKGRlbHRhKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChDYW5BZHZhbmNlR3JhcGhpY3MoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSGFwcEhhbmRsaW5nLkhhbmRsZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKENhbkFkdmFuY2VHcmFwaGljcygpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LmhhcHBNYW5hZ2VyLlRyeUhhbmRsZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vaWYgKENhbkFkdmFuY2UoKSlcclxuICAgICAgICAgICAgLy97XHJcblxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEVsZW1lbnRUb0F1cmFDb2xvcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgYmMgPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1I7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuRmlyZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuRmlyZUF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5JY2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLkljZUF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5UaHVuZGVyQXVyYTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGJjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgRWxlbWVudFRvUHJvakNvbG9yKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBiYyA9IENvbG9ycy5pbnB1dEtleTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5GaXJlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5GaXJlU2hvdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkljZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuSWNlQXVyYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLlRodW5kZXJBdXJhO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYmM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihCYXNlVXRpbHMuVmVjdG9yMkQgcG9zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHggPSBwb3MuWDtcclxuICAgICAgICAgICAgdmFyIHkgPSBwb3MuWTtcclxuICAgICAgICAgICAgdmFyIHNjcmVlblBvcyA9IG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoeCAqIGdyaWRTY2FsZSArIGdyaWRTY2FsZSAvIDIgKyBncmlkT2Zmc2V0eCwgMiAqIGdyaWRTY2FsZSAtIHkgKiBncmlkU2NhbGUgKyBncmlkU2NhbGUgLyAyICsgZ3JpZE9mZnNldHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2NyZWVuUG9zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdDb250cm9scyhpbnQgeSwgaW50IHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3R3JpZCh4IC0gMiwgeSAtIDEsIDIwLCAxNSwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHgsIHkpO1xyXG4gICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3X0N1cnNvcihcIkNvbnRyb2xzXCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcblxyXG4gICAgICAgICAgICAvL0lucHV0VGFncyBpbnB1dFRhZyA9IElucHV0VGFncy5NT1ZFRklYO1xyXG4gICAgICAgICAgICBpbnQgeU9mZiA9IDA7XHJcbiAgICAgICAgICAgIHlPZmYgPSBEcmF3SW5wdXRzX0ZpeCh5LCB4LCBJbnB1dFRhZ3MuTU9WRUZJWCwgeU9mZik7XHJcbiAgICAgICAgICAgIC8veU9mZisrO1xyXG4gICAgICAgICAgICB5T2ZmID0gRHJhd0lucHV0c19GaXgoeSwgeCwgSW5wdXRUYWdzLk1JU0MsIHlPZmYpO1xyXG4gICAgICAgICAgICAvL3lPZmYrKztcclxuICAgICAgICAgICAgLy95T2ZmID0gRHJhd0lucHV0c19GaXgoeSwgeCwgSW5wdXRUYWdzLk1PVkVVTkZJWCwgeU9mZik7XHJcblxyXG4gICAgICAgICAgICBpbnQgYXR0YWNrTnVtYmVyID0gMTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5pbnB1dHMuaW5wdXRzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCB4MiA9IHg7XHJcbiAgICAgICAgICAgICAgICBpbnQgeTIgPSB5ICsgMiArIHlPZmY7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0dXJuQmFzZVRyeS5pbnB1dHMuaW5wdXRzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5pbnB1dHMuVGFnSXMoaSwgSW5wdXRUYWdzLk1PVkVVTkZJWCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgeU9mZisrO1xyXG4gICAgICAgICAgICAgICAgICAgIHlPZmYrKztcclxuICAgICAgICAgICAgICAgICAgICBpbnQgdW5pY29kZSA9ICcwJyArIGF0dGFja051bWJlcjtcclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2tOdW1iZXIrKztcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZUhvdmVyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgUmVjdCh4MiAtIDIsIHkyLCAyMCwgMSksIDAsIGlucHV0LmFyZzEpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3Q2hhcignWycsIHgyIC0gMSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IGxlbmd0aEJuYW1lID0gVGV4dEJvYXJkLkRyYXdVbmljb2RlTGFiZWwodW5pY29kZSwgeDIsIHkyLCBDb2xvcnMuaW5wdXRLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKCddJywgeDIgKyBsZW5ndGhCbmFtZSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBkZXNjcmlwdGlvbiA9IHN0cmluZy5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTW92ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlIG0gPSAoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZURlc2NyaXB0aW9ucy5UcnlHZXRWYWx1ZShtLCBvdXQgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBtLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5NaXNjQmF0dGxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWlzY0JhdHRsZUlucHV0IGFyZzEgPSAoTWlzY0JhdHRsZUlucHV0KWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gbWlzY0Rlc2NyaXB0aW9uc1thcmcxXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoZGVzY3JpcHRpb24sIHgyICsgMiArIDUsIHkyLCBDb2xvcnMuSW5wdXREZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgYyA9IG1vdmVDaGFyc1ttb3ZlXTtcclxuICAgICAgICAgICAgICAgIC8vRHJhd01vdmUobW92ZSwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXcoYywgeDIgKyAzLCB5MiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdXaXRoR3JpZChjK1wiXCIsIHgyLCB5ICsgMiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgRHJhd0lucHV0c19GaXgoaW50IHksIGludCB4LCBJbnB1dFRhZ3MgaW5wdXRUYWcsIGludCB5T2ZmKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuaW5wdXRzLmlucHV0cy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgeDIgPSB4O1xyXG4gICAgICAgICAgICAgICAgaW50IHkyID0geSArIDIgKyB5T2ZmO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdHVybkJhc2VUcnkuaW5wdXRzLmlucHV0c1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuaW5wdXRzLlRhZ0lzKGksIGlucHV0VGFnKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdW5pY29kZSA9IGlucHV0SC5HZXRGaXhlZE1vdmVVbmljb2RlKGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgZm9yY2VJbnB1dExhYmVsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgZm9yY2VDb21tYW5kTGFiZWwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1bmljb2RlID09ICd3JylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmNlSW5wdXRMYWJlbCA9IFwiV0FTRFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JjZUNvbW1hbmRMYWJlbCA9IFwiXCIgKyBVbmljb2RlLlVwYXJyb3cyICsgVW5pY29kZS5MZWZ0YXJyb3cyICsgVW5pY29kZS5Eb3duYXJyb3cyICsgVW5pY29kZS5SaWdodGFycm93MjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVuaWNvZGUgPT0gJ2EnIHx8IHVuaWNvZGUgPT0gJ3MnIHx8IHVuaWNvZGUgPT0gJ2QnKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHlPZmYrKztcclxuICAgICAgICAgICAgICAgICAgICB5T2ZmKys7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtb3VzZUhvdmVyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgUmVjdCh4MiAtIDIsIHkyLCAyMCwgMSksIDAsIGlucHV0LmFyZzEpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3Q2hhcignWycsIHgyIC0gMSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IGxlbmd0aEJuYW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2VJbnB1dExhYmVsID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aEJuYW1lID0gVGV4dEJvYXJkLkRyYXdVbmljb2RlTGFiZWwodW5pY29kZSwgeDIsIHkyLCBDb2xvcnMuaW5wdXRLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3KGZvcmNlSW5wdXRMYWJlbCwgeDIsIHkyLCBDb2xvcnMuaW5wdXRLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGhCbmFtZSA9IGZvcmNlSW5wdXRMYWJlbC5MZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKCddJywgeDIgKyBsZW5ndGhCbmFtZSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBkZXNjcmlwdGlvbiA9IHN0cmluZy5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTW92ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JjZUNvbW1hbmRMYWJlbCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGZvcmNlQ29tbWFuZExhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUgbSA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZSlpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZURlc2NyaXB0aW9ucy5UcnlHZXRWYWx1ZShtLCBvdXQgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2NyaXB0aW9uID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBtLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTWlzY0JhdHRsZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1pc2NCYXR0bGVJbnB1dCBhcmcxID0gKE1pc2NCYXR0bGVJbnB1dClpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IG1pc2NEZXNjcmlwdGlvbnNbYXJnMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3KGRlc2NyaXB0aW9uLCB4MiArIDIgKyA1LCB5MiwgQ29sb3JzLklucHV0RGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIGMgPSBtb3ZlQ2hhcnNbbW92ZV07XHJcbiAgICAgICAgICAgICAgICAvL0RyYXdNb3ZlKG1vdmUsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3KGMsIHgyICsgMywgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3V2l0aEdyaWQoYytcIlwiLCB4MiwgeSArIDIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB5T2ZmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdMaWZlKGludCB0dXJuT3JkZXJYLCBpbnQgdHVybk9yZGVyWSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdHcmlkKHR1cm5PcmRlclggLSAxLCB0dXJuT3JkZXJZIC0gMSwgMjAsIDksIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh0dXJuT3JkZXJYICsgMSwgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJMaWZlXCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh0dXJuT3JkZXJYICsgOCwgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJFbGVtZW50XCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcbiAgICAgICAgICAgIGludCBpbmRleCA9IC0xOyAvL3VzaW5nIHRoaXMgYmVjYXVzZSBub3QgYWxsIHVuaXRzIGdldCBkcmF3blxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBlID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuZHJhd0xpZmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuRGVhZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCBjb2xvciA9IENvbG9ycy5IZXJvVHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gQ29sb3JzLkVuZW15VHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZS5lbGVtZW50ICE9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBFbGVtZW50VG9BdXJhQ29sb3IoZS5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3T25lRGlnaXRfQ3Vyc29yKChpbnQpZS5saWZlLlZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHhPZmYgPSB0dXJuT3JkZXJYICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeU9mZiA9IHR1cm5PcmRlclkgKyAyICsgaW5kZXggKiAyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vRHJhd0VudGl0eUNoYXIoZSwgY29sb3IsIHhPZmYsIHlPZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKEdldENoYXIoZSksIHhPZmYsIHR1cm5PcmRlclkgKyAyLCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdUd29EaWdpdHMoKGludCllLmxpZmUsIHhPZmYsIHlPZmYsIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgZWxlbWVudCA9IHN0cmluZy5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGUuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5GaXJlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IFwiRmlyZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5JY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gXCJJY2VcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlcjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBcIlRodW5kZXJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlQ29sb3IgPSBFbGVtZW50VG9BdXJhQ29sb3IoZS5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoZWxlbWVudCwgeE9mZiArIDcsIHlPZmYsIGVDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd09uZURpZ2l0X0N1cnNvcigoaW50KWUubGlmZS5WYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoeDogMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3VHVybk9yZGVyKGludCB0dXJuT3JkZXJYLCBpbnQgdHVybk9yZGVyWSwgYm9vbCBob3Jpem9udGFsID0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZhbHVlIHR1cm5zUGVyUGhhc2UgPSB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuU2V0Q3Vyc29yQXQodHVybk9yZGVyWCArIDMsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKFwiQ29tbWFuZHNcIiwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuXHJcbiAgICAgICAgICAgIGludCBkcmF3aW5nSWQgPSAtMTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5lbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZSA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlLmRyYXdUdXJuKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFlLkRlYWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhd2luZ0lkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IGNvbG9yID0gQ29sb3JzLkhlcm9UdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBDb2xvcnMuRW5lbXlUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5lbGVtZW50ICE9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBFbGVtZW50VG9BdXJhQ29sb3IoZS5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd09uZURpZ2l0X0N1cnNvcigoaW50KWUubGlmZS5WYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4T2ZmID0gdHVybk9yZGVyWCArIDEgKyBkcmF3aW5nSWQgKiAzO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB5RW50aXR5ID0gdHVybk9yZGVyWSArIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHlGaXJzdE1vdmUgPSB0dXJuT3JkZXJZICsgMztcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeEZpcnN0TW92ZSA9IHhPZmY7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvcml6b250YWwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4T2ZmID0gdHVybk9yZGVyWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeUVudGl0eSA9IHR1cm5PcmRlclkgKyAyICsgZHJhd2luZ0lkICogMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeUZpcnN0TW92ZSA9IHlFbnRpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhGaXJzdE1vdmUgPSB0dXJuT3JkZXJYICsgMztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgRHJhd0VudGl0eUNoYXIoZSwgY29sb3IsIHhPZmYsIHlFbnRpdHkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuU2V0Q3Vyc29yQXQoeEZpcnN0TW92ZSwgeUZpcnN0TW92ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaTIgPSAwOyBpMiA8IHR1cm5zUGVyUGhhc2U7IGkyKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3IyID0gY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBiYWNrQ29sb3IgPSBDb2xvcnMuQmFja0NvbW1hbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJhd2luZ0lkID09IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSAmJiBpMiA9PSB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS50dXJuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb2xvcjIgPSBDb2xvcnMuSGVybztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tDb2xvciA9IENvbG9ycy5CYWNrQmF0dGxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yMiA9IENvbG9ycy5JbnB1dERlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaTIgPCB0dXJuc1BlclBoYXNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgYyA9IEdldENoYXJPZk1vdmUoZSwgaTIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VIb3Zlci5tb3VzZUhvdmVycy5BZGQobmV3IE1vdXNlSG92ZXIobmV3IFJlY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvclgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvclksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5MZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCwgZS5tb3Zlc1tpMl0pKTsgLy9hZGQgaGVyZS4uLj8gQF9AXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihjLCBjb2xvcjIsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaG9yaXpvbnRhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gYy5MZW5ndGg7IGogPCAzOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuQWR2YW5jZUN1cnNvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKCcgJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoJyAnLCBjb2xvciwgQ29sb3JzLkJhY2tDb21tYW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaG9yaXpvbnRhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5DdXJzb3JOZXdMaW5lKHg6IHhGaXJzdE1vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5DdXJzb3JOZXdMaW5lKHg6IDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd0VudGl0eUNoYXIoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGUsIGludCBjb2xvciwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hhcltdIGNoYXJzID0gR2V0Q2hhcihlKTtcclxuXHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3KGNoYXJzLCB4LCB5LCBjb2xvcik7XHJcbiAgICAgICAgICAgIGlmIChlLmdyYXBoaWNSZXBlYXRlZEluZGV4ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdPbmVEaWdpdChlLmdyYXBoaWNSZXBlYXRlZEluZGV4ICsgMSwgeCArIGNoYXJzLkxlbmd0aCwgeSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0cmluZyBHZXRDaGFyT2ZNb3ZlKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGUsIGludCBpMilcclxuICAgICAgICB7XHJcblxyXG5cclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gZS5tb3Zlc1tpMl07XHJcbiAgICAgICAgICAgIGlmICh2YWwgPj0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiBtb3ZlQ2hhcnNbKEJhdHRsZU1haW4uTW92ZVR5cGUpdmFsXTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiIFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNoYXJbXSBHZXRDaGFyKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGdhbWVFbnRpdHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZW50aXRpZXNDaGFyc1tnYW1lRW50aXR5LmdyYXBoaWNdO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3TW92ZShWYWx1ZSBtb3ZlLCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobW92ZS5WYWwgPj0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5Nb3ZlVHlwZSBtID0gKEJhdHRsZU1haW4uTW92ZVR5cGUpbW92ZS5WYWw7XHJcbiAgICAgICAgICAgICAgICBEcmF3TW92ZShtLCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoJyAnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3TW92ZShCYXR0bGVNYWluLk1vdmVUeXBlIG1vdmUsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjID0gbW92ZUNoYXJzW21vdmVdO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoYywgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGV4dEJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBjbGFzcyBDb2xvcnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgR3JpZEhlcm8gPSAxO1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEdyaWRFbmVteSA9IDI7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgSGVybyA9IDM7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgRW5lbXkgPSA0O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEhlcm9UdXJuID0gNTtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBFbmVteVR1cm4gPSA2O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IGlucHV0S2V5ID0gNztcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBCb2FyZCA9IDg7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgV2luZG93TGFiZWwgPSA5O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEZpcmVBdXJhID0gMTA7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgSWNlQXVyYSA9IDExO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IFRodW5kZXJBdXJhID0gMTI7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgRmlyZVNob3QgPSAxMztcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBJY2VTaG90ID0gMTQ7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgVGh1bmRlclNob3QgPSAxNTtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBCYWNrZ3JvdW5kSW5wdXQgPSAxNjtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBJbnB1dERlc2NyaXB0aW9uID0gMTc7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgQmFja0JhdHRsZSA9IDE4O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEJhY2tDb21tYW5kID0gMTk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBJbnB1dEtleVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTk9ORSwgTEVGVCwgUklHSFQsIERPV04sIFVQLCBGSVJFLCBSRURPLCBET05FLFxyXG4gICAgICAgICAgICBJQ0UsXHJcbiAgICAgICAgICAgIFRIVU5ERVIsXHJcbiAgICAgICAgICAgIE5PUk1BTFNIT1RcclxuICAgICAgICB9XHJcblxuXHJcblxyXG4gICAgXG5wcml2YXRlIGludCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fSW5wdXRVbmljb2RlPS0xO31cclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlbjtcclxudXNpbmcgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR2FtZU1haW4gOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEJhdHRsZU1haW4gYmF0dGxlTWFpbjtcclxuICAgICAgICBwcml2YXRlIEJhdHRsZVJlbmRlciBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBNb2RlU2VsZWN0aW9uU2NyZWVuIG1vZGVTZWxlY3Rpb25TY3JlZW47XHJcbiAgICAgICAgSVRleHRTY3JlZW5fIG1haW5EcmF3O1xyXG4gICAgICAgIHByaXZhdGUgUmVzdWx0U2NyZWVuIHJlc3VsdFNjcmVlbjtcclxuICAgICAgICAvL0lUZXh0U2NyZWVuW10gc2NyZWVucyA9IG5ldyBJVGV4dFNjcmVlbls1XTtcclxuICAgICAgICBpbnQgc3RhZ2VJZDtcclxuICAgICAgICBpbnRbXSBlbmVteUFtb3VudCA9IG5ldyBpbnRbXSAgIHsgMSwgMSwgMiwgMSwgMiwgMywgMiwgMywgMSwgMiwgMywgMyB9O1xyXG4gICAgICAgIGludFtdIHR1cm5BbW91bnQgPSBuZXcgaW50W10geyAyLCA0LCAyLCA2LCA0LCAyLCA2LCA0LCA4LCA4LCA2LCA4IH07XHJcbiAgICAgICAgcHJpdmF0ZSBNb3VzZUhvdmVyVGV4dCBtb3VzZUhvdmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgR2FtZU1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZVNlbGVjdGlvblNjcmVlbiA9IG5ldyBNb2RlU2VsZWN0aW9uU2NyZWVuKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuLm1vZGUgPSAxO1xyXG4gICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuLndhbm5hTGVhdmUgPSAxO1xyXG4gICAgICAgICAgICBtYWluRHJhdyA9IG1vZGVTZWxlY3Rpb25TY3JlZW47XHJcbiAgICAgICAgICAgIC8vUmVzZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpbnQgbW9kZSA9IG1vZGVTZWxlY3Rpb25TY3JlZW4ubW9kZTtcclxuICAgICAgICAgICAgYm9vbCB0aW1lQXR0YWNrID0gbW9kZVNlbGVjdGlvblNjcmVlbi50aW1lQXR0YWNrO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVjcyA9IEVDU01hbmFnZXIuQ3JlYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBTdGFnZURhdGFDcmVhdG9yIHNkYyA9IG5ldyBTdGFnZURhdGFDcmVhdG9yKGVjcyk7XHJcbiAgICAgICAgICAgIHZhciBzdGFnZXMgPSBlY3MuUXVpY2tBY2Nlc3NvcjE8U3RhZ2VEYXRhPigpO1xyXG4gICAgICAgICAgICAvL3ZhciBzdGFnZXMgPSBzZGMuc3RhZ2VzO1xyXG5cclxuICAgICAgICAgICAgaW50IGQgPSBzdGFnZUlkO1xyXG4gICAgICAgICAgICBpZiAoc3RhZ2VzLkNvdW50IDw9IGQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1haW5EcmF3ID0gbW9kZVNlbGVjdGlvblNjcmVlbjtcclxuICAgICAgICAgICAgICAgIG1vZGVTZWxlY3Rpb25TY3JlZW4uUmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlSWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vZCA9IDIwMDtcclxuICAgICAgICAgICAgaWYgKGQgPj0gZW5lbXlBbW91bnQuTGVuZ3RoKSBkID0gZW5lbXlBbW91bnQuTGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgaW50IG5FbmVtaWVzID0gZW5lbXlBbW91bnRbZF07XHJcblxyXG4gICAgICAgICAgICBCYXR0bGVTZXR1cCBiYXR0bGVTZXR1cCA9IG5ldyBCYXR0bGVTZXR1cChtb2RlLCBzdGFnZUlkLCBlY3MpO1xyXG4gICAgICAgICAgICBiYXR0bGVNYWluID0gYmF0dGxlU2V0dXAuYmF0dGxlTWFpbjtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcyA9IG5ldyBQcmV2aWV3U3lzdGVtKGVjcywgYmF0dGxlTWFpbik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQobmV3IEVuZW15U3Bhd25EYXRhKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpKTtcclxuICAgICAgICAgICAgLy9lY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChuZXcgRW5lbXlTcGF3bkRhdGEoMSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGZsb2F0IHRpbWVUb0Nob29zZSA9IC0xO1xyXG4gICAgICAgICAgICBpZiAodGltZUF0dGFjaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZVRvQ2hvb3NlID0gKDVmICogdHVybkFtb3VudFtkXSkgKiBuRW5lbWllcztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4udGltZVRvQ2hvb3NlTWF4ID0gdGltZVRvQ2hvb3NlO1xyXG4gICAgICAgICAgICBiYXR0bGVNYWluLkluaXQoKTtcclxuICAgICAgICAgICAgYmF0dGxlUmVuZGVyID0gbmV3IEJhdHRsZVJlbmRlcihiYXR0bGVNYWluLCBzdGFnZURhdGE6c3RhZ2VzLkNvbXAxKHN0YWdlSWQpLCBQcmV2aWV3U3lzdGVtOnBzKTtcclxuICAgICAgICAgICAgbmV3IEhhcHBIYW5kbGluZyhiYXR0bGVSZW5kZXIsIGJhdHRsZVNldHVwKTtcclxuICAgICAgICAgICAgbWFpbkRyYXcgPSBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgICAgIHJlc3VsdFNjcmVlbiA9IG5ldyBSZXN1bHRTY3JlZW4oKTtcclxuICAgICAgICAgICAgcmVzdWx0U2NyZWVuLmJhdHRsZVJlc3VsdCA9IGJhdHRsZU1haW4uYmF0dGxlUmVzdWx0O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgTW91c2VIb3Zlck1hbmFnZXIgaG92ZXJNYW5hZ2VyID0gbmV3IE1vdXNlSG92ZXJNYW5hZ2VyKE1vdXNlKTtcclxuICAgICAgICAgICAgaG92ZXJNYW5hZ2VyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgQmFzZVV0aWxzLlJlY3QoNSw1LDUsNSksIDAsMCkpO1xyXG4gICAgICAgICAgICBtb3VzZUhvdmVyID0gbmV3IE1vdXNlSG92ZXJUZXh0KGhvdmVyTWFuYWdlciwgYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRGcmVlRW50aXR5KDUwLCAxKSk7XHJcblxyXG4gICAgICAgICAgICBiYXR0bGVSZW5kZXIubW91c2VIb3ZlciA9IGhvdmVyTWFuYWdlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXQgeyBzZXQgeyBtYWluRHJhdy5JbnB1dCA9IHZhbHVlOyB9IGdldCB7IHJldHVybiAnYyc7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRVbmljb2RlIHsgc2V0IHsgdmFsdWUgPSByZW1hcC5SZW1hcCh2YWx1ZSk7IG1haW5EcmF3LklucHV0VW5pY29kZSA9IHZhbHVlOyB9IGdldCB7IHJldHVybiAnYyc7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgTW91c2VJTyBNb3VzZSB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgVW5pY29kZVJlbWFwIHJlbWFwID0gbmV3IFVuaWNvZGVSZW1hcCgpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KGZsb2F0IGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3VzZUhvdmVyLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBtYWluRHJhdy5EcmF3KGYpO1xyXG4gICAgICAgICAgICBtYWluRHJhdy5Nb3VzZSA9IE1vdXNlO1xyXG4gICAgICAgICAgICBpZiAobWFpbkRyYXcgPT0gYmF0dGxlUmVuZGVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmF0dGxlTWFpbi5Jc092ZXIoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmF0dGxlTWFpbi5Jc1ZpY3RvcnkoKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWdlSWQrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0U2NyZWVuLkVudGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkRyYXcgPSByZXN1bHRTY3JlZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1haW5EcmF3ID09IHJlc3VsdFNjcmVlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdFNjcmVlbi53YW5uYUxlYXZlID09IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWFpbkRyYXcgPT0gbW9kZVNlbGVjdGlvblNjcmVlbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vZGVTZWxlY3Rpb25TY3JlZW4ud2FubmFMZWF2ZSA9PSAxKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYWluRHJhdy5HZXRCb2FyZCgpO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIE1vdXNlSU8gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX01vdXNlPW5ldyBNb3VzZUlPKCk7fVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBSZXN1bHRTY3JlZW4gOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcbiAgICAgICAgc3RyaW5nIHlvdVdpbiA9IFwiWW91IFdpblwiO1xyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIE1vdXNlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBzdHJpbmcgeW91TG9zZSA9IFwiWW91IGxvc2VcIjtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlUmVzdWx0IGJhdHRsZVJlc3VsdDtcclxuICAgICAgICBwdWJsaWMgUmVzdWx0U2NyZWVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZCA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkluaXQoNzAsIDI1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGludCB3YW5uYUxlYXZlO1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0IHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0VW5pY29kZSB7IHNldDsgZ2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEVudGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKElucHV0VW5pY29kZSA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0cmluZyBtZXNzYWdlID0geW91V2luO1xyXG4gICAgICAgICAgICBpZiAoYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAyKSBtZXNzYWdlID0geW91TG9zZTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIobWVzc2FnZSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuQm9hcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGVzdEdhbWUgOiBJVGV4dEdhbWVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVGV4dFNjcmVlbkhvbGRlciBTY3JlZW5Ib2xkZXIgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlIEdldFBhbGV0dGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIERlZmF1bHRQYWxldHRlcy5DNE5vdmVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdChpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0U2NyZWVuTiBzY3JlZW4gPSBuZXcgVGVzdFNjcmVlbigpO1xyXG4gICAgICAgICAgICBTY3JlZW5Ib2xkZXIuU2V0QWxsKHNjcmVlbik7XHJcbiAgICAgICAgICAgIHNjcmVlbi5Jbml0KHcsIGgpO1xyXG4gICAgICAgICAgICBzY3JlZW4uR2V0Qm9hcmQoKS5EcmF3KFwiVGVzdFwiLCAwLDAsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgVGV4dFNjcmVlbkhvbGRlciBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fU2NyZWVuSG9sZGVyPW5ldyBUZXh0U2NyZWVuSG9sZGVyKCk7fVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUZXN0U2NyZWVuIDogVGV4dFNjcmVlbk5cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNb2RlU2VsZWN0aW9uU2NyZWVuIDogSVRleHRTY3JlZW5fXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0V29ybGQgdGV4dFdvcmxkO1xyXG4gICAgICAgIHN0cmluZyB5b3VXaW4gPSBcIllvdSBXaW5cIjtcclxuICAgICAgICBzdHJpbmcgeW91TG9zZSA9IFwiWW91IGxvc2VcIjtcclxuICAgICAgICBwdWJsaWMgTW91c2VJTyBNb3VzZSB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgaW50IHNlbGVjdGlvbjtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlUmVzdWx0IGJhdHRsZVJlc3VsdDtcclxuICAgICAgICBwdWJsaWMgTW9kZVNlbGVjdGlvblNjcmVlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQgPSBuZXcgVGV4dFdvcmxkKCk7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5Jbml0KDcwLCAyNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgd2FubmFMZWF2ZTtcclxuICAgICAgICBwdWJsaWMgaW50IG1vZGU7XHJcbiAgICAgICAgcHVibGljIGJvb2wgdGltZUF0dGFjayA9IGZhbHNlO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgc2NyZWVuU3RhZ2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXQgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyBnZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRW50ZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2FubmFMZWF2ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KGZsb2F0IGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLlJlc2V0KCk7XHJcbiAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkgaWsgPSAoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleSkgSW5wdXQ7XHJcbiAgICAgICAgICAgIG1vZGUgPSAtMTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3KFwiUHJvZ0JhdHRsZSBQcm90b3R5cGUgdjAuM1wiLCAxLCAxLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhdyhcIkEgZ2FtZSBieSBQaWRyb2hcIiwgMSwgMiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICBpZiAoc2NyZWVuU3RhZ2UgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChpaylcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkxFRlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmVlblN0YWdlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUF0dGFjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuUklHSFQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmVlblN0YWdlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUF0dGFjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5ET1dOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXR0YWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5VUDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVBdHRhY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIlt3XSBWYW5pbGxhXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA0LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbYV0gRWxlbWVudGFsXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA1LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbc10gVmFuaWxsYSBUaW1lIEF0dGFja1wiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNiwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW2RdIEVsZW1lbnRhbCBUaW1lIEF0dGFja1wiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNywgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2NyZWVuU3RhZ2UgPT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlrID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuVVApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaWsgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5ET1dOKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlblN0YWdlID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiRWxlbWVudGFsIE1vZGVcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IC01KTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiRmlyZSBiZWF0cyBJY2UsIEljZSBiZWF0cyBUaHVuZGVyLCBUaHVuZGVyIGJlYXRzIGZpcmVcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IC0yKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiU2FtZSBlbGVtZW50ID0gbm8gZGFtYWdlXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiAwKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiSXQgaXMgYmVzdCB0byBoYXZlIGhhZCBzb21lIGV4cGVyaWVuY2Ugd2l0aCB2YW5pbGxhIG1vZGVcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDEpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbd10gU3RhcnQgRWxlbWVudGFsIE1vZGVcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDQsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIltzXSBHbyBiYWNrXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA1LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKG1vZGUgPj0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2FubmFMZWF2ZSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vc3RyaW5nIG1lc3NhZ2UgPSB5b3VXaW47XHJcbiAgICAgICAgICAgIC8vaWYgKGJhdHRsZVJlc3VsdC5yZXN1bHQgPT0gMikgbWVzc2FnZSA9IHlvdUxvc2U7XHJcbiAgICAgICAgICAgIC8vdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIobWVzc2FnZSwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZSA9IC0xO1xyXG4gICAgICAgICAgICB3YW5uYUxlYXZlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHRXb3JsZC5tYWluQm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJsaW5rQW5pbSA6IFRleHRBbmltYXRpb248QmxpbmtBbmltLkJsaW5rRGF0YT5cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIEJsaW5rRGF0YSBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGEsIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICBmbG9hdCBhdXggPSBwcm9ncmVzcztcclxuICAgICAgICAgICAgYm9vbCBibGluayA9IHRydWU7XHJcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmxpbmspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4IC09IG1haW5EYXRhLmJsaW5rQWN0aXZlVGltZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXggLT0gbWFpbkRhdGEuYmxpbmtJbmFjdGl2ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhdXggPCAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsaW5rID0gIWJsaW5rO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghYmxpbmspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChtYWluRGF0YS5jaGFuZ2VJbnZpc2libGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5LkFuaW1hdGlvbi5TZXRBbGwobWFpbkRhdGEudGV4dCwgbWFpbkRhdGEudGV4dENvbG9yLCBtYWluRGF0YS5iYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5LkFuaW1hdGlvbi5TZXRBbGxJZlZpc2libGUobWFpbkRhdGEudGV4dCwgbWFpbkRhdGEudGV4dENvbG9yLCBtYWluRGF0YS5iYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IEJsaW5rRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGNoYXIgdGV4dDtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBiYWNrQ29sb3IsIHRleHRDb2xvcjtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGJsaW5rQWN0aXZlVGltZTtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGJsaW5rSW5hY3RpdmU7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBib29sIGNoYW5nZUludmlzaWJsZTtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBCbGlua0RhdGEoY2hhciB0ZXh0LCBpbnQgYmFja0NvbG9yLCBpbnQgdGV4dENvbG9yLCBmbG9hdCBibGlua0FjdGl2ZVRpbWUsIGZsb2F0IGJsaW5rSW5hY3RpdmUsIGJvb2wgY2hhbmdlTm9DaGFuZ2VDb2xvciA9IHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tDb2xvciA9IGJhY2tDb2xvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbG9yID0gdGV4dENvbG9yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ibGlua0FjdGl2ZVRpbWUgPSBibGlua0FjdGl2ZVRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsaW5rSW5hY3RpdmUgPSBibGlua0luYWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIEJsaW5rRGF0YSBCYWNrQ29sb3IoaW50IGJhY2tDb2xvciwgZmxvYXQgYmxpbmtEdXJhdGlvbiwgYm9vbCBjaGFuZ2VOb0NoYW5nZUNvbG9yID0gdHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCbGlua0RhdGEoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgYmFja0NvbG9yLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgYmxpbmtEdXJhdGlvbiwgYmxpbmtEdXJhdGlvbiwgY2hhbmdlTm9DaGFuZ2VDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgQmxpbmtEYXRhIEZyb250Q29sb3IoaW50IGZyb250Q29sb3IsIGZsb2F0IGJsaW5rRHVyYXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmxpbmtEYXRhKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBmcm9udENvbG9yLCAgYmxpbmtEdXJhdGlvbiwgYmxpbmtEdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgQmxpbmtEYXRhIENoYXIoY2hhciBjLCBmbG9hdCBibGlua0R1cmF0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJsaW5rRGF0YShjLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIGJsaW5rRHVyYXRpb24sIGJsaW5rRHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ2hhckJ5Q2hhckFuaW1hdGlvbiA6IFRleHRBbmltYXRpb248Q2hhckJ5Q2hhckFuaW1hdGlvbi5DaGFyQnlDaGFyRGF0YT5cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIENoYXJCeUNoYXJEYXRhIG1haW5EYXRhLCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Nb2RpZnkoZW50aXR5LCBtYWluRGF0YSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgICAgIGZsb2F0IHJhdGlvID0gcHJvZ3Jlc3MgLyBsZW5ndGg7XHJcbiAgICAgICAgICAgIGZsb2F0IGxlbmd0aFRleHQgPSBtYWluRGF0YS5jaGFyRW5kIC0gbWFpbkRhdGEuY2hhclN0YXJ0O1xyXG4gICAgICAgICAgICBpbnQgbGluZUJyZWFrcyA9IDA7XHJcbiAgICAgICAgICAgIGludCBvZmZzZXRlZFBlcm0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gbWFpbkRhdGEuY2hhclN0YXJ0OyBpIDwgbWFpbkRhdGEuY2hhckVuZDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgb2Zmc2V0ZWQgPSBpICsgb2Zmc2V0ZWRQZXJtO1xyXG4gICAgICAgICAgICAgICAgaW50IGxpbmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRiID0gZW50aXR5LkFuaW1hdGlvbjtcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChvZmZzZXRlZCA+PSB0Yi5XaWR0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lKys7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ZWQgLT0gdGIuV2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZW50aXR5Lk9yaWdpbi5DaGFyQXQob2Zmc2V0ZWQsIGxpbmUgKyBsaW5lQnJlYWtzKSA9PSAnXFxuJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWtzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ZWRQZXJtIC09IG9mZnNldGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldGVkID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpID4gKChsZW5ndGhUZXh0ICogcmF0aW8pICsgbWFpbkRhdGEuY2hhclN0YXJ0KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0Yi5EcmF3Q2hhcignICcsIG9mZnNldGVkLCBsaW5lICsgbGluZUJyZWFrcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90Yi5EcmF3KFwiXCIgKyBpLCA2LCA1LCAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgQ2hhckJ5Q2hhckRhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludGVybmFsIGludCBjaGFyU3RhcnQ7XHJcbiAgICAgICAgICAgIGludGVybmFsIGludCBjaGFyRW5kO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIENoYXJCeUNoYXJEYXRhKGludCBjaGFyU3RhcnQsIGludCBjaGFyRW5kKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJTdGFydCA9IGNoYXJTdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhckVuZCA9IGNoYXJFbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0KfQo=
