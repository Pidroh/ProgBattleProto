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
            //DeepCloneHelper.debug.Active(false);
            //new ReflectionTest();
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
                if (!this.debugging) {
                    return;
                }
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
                },
                RandomElement: function (T, list) {
                    var element = Pidroh.BaseUtils.Extensions.rng.Next$1(System.Array.getCount(list, T));
                    return System.Array.getItem(list, element, T);
                }
            }
        }
    });

    Bridge.definei("Pidroh.BaseUtils.ICopyable$1", function (T) { return {
        $kind: "interface"
    }; });

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
                    //playerHandUnfixed.Add(MoveType.Fire);
                    //playerHandUnfixed.Add(MoveType.Ice);
                    //playerHandUnfixed.Add(MoveType.Thunder);


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
                                                //Console.WriteLine("RANDOM POS!!");
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
                    if (previousPhase !== Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ConfirmInput) {
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
            ConfirmInputStart: function () {
                this.ChangePhase(Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ConfirmInput);
                this.inputs.Clear();
                this.inputs.Add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Confirm), Pidroh.ConsoleApp.Turnbased.InputTags.MISC);
                this.inputs.Add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Cancel), Pidroh.ConsoleApp.Turnbased.InputTags.MISC);
            },
            ExecutePhase: function () {
                var phase = this.battleState.phase;
                switch (phase) {
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.EnemyMoveChoice: 
                        this.ecsInteg.SpawnEnemies();
                        this.EnemyGenerateMoves();
                        break;
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.HandRecharge: 
                        break;
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands: 
                        this.PickHandInput();
                        break;
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ExecuteMove: 
                        this.ecsInteg.SpawnEnemies();
                        this.ExecuteMoves();
                        break;
                    default: 
                        break;
                }
            },
            PickHandInput: function () {
                var $t, $t1, $t2;
                this.inputs.Clear();
                this.inputs.inputForConfirmation = new Pidroh.ConsoleApp.Turnbased.Input.$ctor2(Pidroh.ConsoleApp.Turnbased.InputType.None, -1);
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
                this.inputs.Add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Help), Pidroh.ConsoleApp.Turnbased.InputTags.MISC);
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
                }//if (enemyExist)
                //    inputs.Add(new Turnbased.Input(InputType.MiscBattle, MiscBattleInput.Preview), InputTags.MISC);
            },
            InputDone: function (input) {



                if (this.battleState.phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ConfirmInput) {
                    this.ProcessInput(input);
                } else {
                    this.inputs.inputForConfirmation = input;
                }

            },
            InputConfirmed: function () {
                this.ChangePhase(Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands);
                var input = this.inputs.inputForConfirmation;
                this.inputs.inputForConfirmation = new Pidroh.ConsoleApp.Turnbased.Input.$ctor2(Pidroh.ConsoleApp.Turnbased.InputType.None, -1);
                this.ProcessInput(input);
            },
            ProcessInput: function (input) {
                var $t;
                //Console.Write("INPUT");
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
                    //Console.Write("INPUT"+misc);
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
                    if (misc === Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Confirm) {
                        this.InputConfirmed();
                        this.PickHandInput();
                    }
                    if (misc === Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Cancel) {

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
                ConfirmInput: 3,
                ExecuteMove: 4
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
                SummonEntity: 11,
                MoveSmart: 12
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
            moveCreator: null,
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
                this.moveCreator = new Pidroh.ConsoleApp.Turnbased.MoveCreatorProg(ecs);


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
                this.battleMain.MoveDataExecuter = new Pidroh.ConsoleApp.Turnbased.MoveDataExecuter(this.battleMain, this.moveCreator.moveDatas, ecs, this.timeStamp);

                var entityRenderTexts = new (System.Collections.Generic.List$1(System.String)).ctor();

                var enemyDatas = new Pidroh.ConsoleApp.Turnbased.EnemyDataCreator(entityRenderTexts, this.moveCreator).enemyDatas;
                var battleState = this.battleMain.battleState;

                this.battleMain.BattleConfigure(stage.battleConfig);

                var enemyFactory = new Pidroh.ConsoleApp.Turnbased.SpawnEntityFactory(ecs, enemyDatas, this.battleMain);
                this.battleMain.ecsInteg = new Pidroh.ConsoleApp.Turnbased.ECSIntegration(enemyFactory, ecs);
                //battleMain.EnemyFactory = enemyFactory;

                { //AI handling code
                    var enemyAis = ecs.QuickAccessor2(Pidroh.ConsoleApp.Turnbased.EnemyAI, Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity);
                    var enemyAiStateless = ecs.CreateAccessor(System.Array.init([Pidroh.ConsoleApp.Turnbased.EnemyAI], Function), System.Array.init([Pidroh.ConsoleApp.Turnbased.EnemyAIState], Function));
                    var possibleMoves = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                    var moveDatas = this.moveCreator.moveDatas;

                    this.battleMain.EnemyGenerateMoves = Bridge.fn.bind(this, function () {
                        var $t2, $t3, $t4, $t5;
                        while (enemyAiStateless.Length > 0) {
                            Pidroh.ECS.ExtensionMethods.AddComponent(Pidroh.ConsoleApp.Turnbased.EnemyAIState, enemyAiStateless.Get(0));
                        }

                        for (var i = 0; i < enemyAis.Length; i = (i + 1) | 0) {
                            var ai = enemyAis.Comp1(i);
                            var battler = enemyAis.Comp2(i);
                            var aiState = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.EnemyAIState, enemyAis.Entity(i));
                            var moves = ai.moves;
                            var posS = battler.pos.$clone();
                            for (var j = 0; j < Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(battleState.turnsPerPhase); j = (j + 1) | 0) {
                                var aiPro = (((j + aiState.progress) | 0)) % moves.Count;
                                var move = moves.getItem(aiPro);
                                var moveId = -1;
                                if (Bridge.is(move, Pidroh.ConsoleApp.Turnbased.MoveUse)) {

                                    moveId = (Bridge.as(move, Pidroh.ConsoleApp.Turnbased.MoveUse)).move;
                                }
                                if (Bridge.is(move, System.Int32)) {
                                    var m = Bridge.cast(move, System.Int32);
                                    if (m === Pidroh.ConsoleApp.Turnbased.SpecialEnemyMoves.SmartMove) {

                                        possibleMoves.clear();
                                        for (var i2 = 0; i2 < moveDatas.Count; i2 = (i2 + 1) | 0) {
                                            var tags = moveDatas.getItem(i2).tags;
                                            if (tags.contains(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Movement)) {
                                                var validMove = true;
                                                var us = moveDatas.getItem(i2).units;

                                                $t2 = Bridge.getEnumerator(us);
                                                try {
                                                    while ($t2.moveNext()) {
                                                        var item2 = $t2.Current;
                                                        var things = item2.thingsToHappen;
                                                        $t3 = Bridge.getEnumerator(things);
                                                        try {
                                                            while ($t3.moveNext()) {
                                                                var thing = $t3.Current;
                                                                if (Bridge.is(thing, Pidroh.ConsoleApp.Turnbased.MoveAction)) {
                                                                    var ma = Bridge.as(thing, Pidroh.ConsoleApp.Turnbased.MoveAction);
                                                                    var dis = ma.distance.$clone();
                                                                    var testPos = Pidroh.BaseUtils.Vector2D.op_Addition(posS.$clone(), dis.$clone());
                                                                    if (testPos.X < 3) {
                                                                        validMove = false;
                                                                    }
                                                                    if (testPos.X > 5) {
                                                                        validMove = false;
                                                                    }
                                                                    if (testPos.Y < 0) {
                                                                        validMove = false;
                                                                    }
                                                                    if (testPos.Y > 2) {
                                                                        validMove = false;
                                                                    }
                                                                }
                                                            }
                                                        } finally {
                                                            if (Bridge.is($t3, System.IDisposable)) {
                                                                $t3.System$IDisposable$Dispose();
                                                            }
                                                        }
                                                    }
                                                } finally {
                                                    if (Bridge.is($t2, System.IDisposable)) {
                                                        $t2.System$IDisposable$Dispose();
                                                    }
                                                }if (validMove) {
                                                    possibleMoves.add(i2);
                                                }
                                            }
                                        }
                                        moveId = Pidroh.BaseUtils.Extensions.RandomElement(System.Int32, possibleMoves);
                                        //Console.WriteLine(moveId);

                                    }

                                }

                                if (moveId >= 0) {
                                    battler.moves[System.Array.index(j, battler.moves)] = moveId;
                                    var md = this.moveCreator.moveDatas.getItem(moveId);
                                    var us1 = md.units;
                                    $t4 = Bridge.getEnumerator(us1);
                                    try {
                                        while ($t4.moveNext()) {
                                            var item3 = $t4.Current;
                                            var things1 = item3.thingsToHappen;
                                            $t5 = Bridge.getEnumerator(things1);
                                            try {
                                                while ($t5.moveNext()) {
                                                    var thing1 = $t5.Current;
                                                    if (Bridge.is(thing1, Pidroh.ConsoleApp.Turnbased.MoveAction)) {
                                                        var ma1 = Bridge.as(thing1, Pidroh.ConsoleApp.Turnbased.MoveAction);
                                                        var dis1 = ma1.distance.$clone();
                                                        posS = Pidroh.BaseUtils.Vector2D.op_Addition(posS.$clone(), dis1.$clone());

                                                    }
                                                }
                                            } finally {
                                                if (Bridge.is($t5, System.IDisposable)) {
                                                    $t5.System$IDisposable$Dispose();
                                                }
                                            }
                                        }
                                    } finally {
                                        if (Bridge.is($t4, System.IDisposable)) {
                                            $t4.System$IDisposable$Dispose();
                                        }
                                    }}
                                //be.moves[j] = ;
                            }
                            aiState.progress = (aiState.progress + Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(battleState.turnsPerPhase)) | 0;
                        }
                    });
                }


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

                //comment
                //AddEnemy(ai: Actions(
                //    SpecialEnemyMoves.SmartMove, MoveType.MoveLeft, MoveType.MoveDown
                //    ), hp: 2, renderText: "%");

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

    Bridge.define("Pidroh.ConsoleApp.Turnbased.HappMovement", {
        fields: {
            moveFrom: null,
            moveTo: null,
            success: false
        },
        ctors: {
            init: function () {
                this.moveFrom = new Pidroh.BaseUtils.Vector2D();
                this.moveTo = new Pidroh.BaseUtils.Vector2D();
            },
            ctor: function () {
                this.$initialize();
            },
            $ctor1: function (moveFrom, moveTo, success) {
                this.$initialize();
                this.moveFrom = moveFrom.$clone();
                this.moveTo = moveTo.$clone();
                this.success = success;
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
            tags: null,
            inputForConfirmation: null
        },
        ctors: {
            init: function () {
                this.inputForConfirmation = new Pidroh.ConsoleApp.Turnbased.Input();
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
            },
            Contains: function (key) {
                var $t;
                $t = Bridge.getEnumerator(this.inputs);
                try {
                    while ($t.moveNext()) {
                        var i = $t.Current;
                        if (i.arg1 === key.arg1 && i.type === key.type) {
                            return true;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }return false;
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
                Preview: 2,
                Confirm: 3,
                Cancel: 4,
                Help: 5
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
            areaUtils: null,
            ecs: null
        },
        ctors: {
            init: function () {
                this.moveDatas = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.MoveData)).ctor();
                this.moveRenders = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.MoveRenderData)).ctor();
                this.areaUtils = new Pidroh.ConsoleApp.Turnbased.MoveCreatorProg.AreaCreationUtils();
            },
            ctor: function (ecs) {
                this.$initialize();
                this.ecs = ecs;
                var item = new Pidroh.ConsoleApp.Turnbased.MoveData.$ctor1("");
                this.moveDatas.add(item); //do nothing
                this.moveRenders.add(new Pidroh.ConsoleApp.Turnbased.MoveRenderData("", ""));
                ecs.CreateEntityWithComponent(item);
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

                var directionMove = new Pidroh.BaseUtils.Vector2D.$ctor2(0, -1);
                this.NewMoveData$1("Downfire", this.TickArray([this.TickUnitCondition(new Pidroh.ConsoleApp.Turnbased.Condition(Pidroh.ConsoleApp.Turnbased.ConditionType.CanMove, Pidroh.ConsoleApp.Turnbased.Target.Self, directionMove.$clone()), [new Pidroh.ConsoleApp.Turnbased.MoveAction(Pidroh.ConsoleApp.Turnbased.Target.Self, directionMove.$clone())]), this.TickUnit([new Pidroh.ConsoleApp.Turnbased.Animation.$ctor2(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire)]), this.TickUnit([new Pidroh.ConsoleApp.Turnbased.DealDamageAction.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire)])]), this.TagArray([Pidroh.ConsoleApp.Turnbased.MoveDataTags.Shoot]));
                this.NewMoveTextRenderData("Downfire", "DF");


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
                var mv = new Pidroh.ConsoleApp.Turnbased.MoveData.$ctor1(label);
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
                }this.ecs.CreateEntityWithComponent(mv);
                this.moveDatas.add(mv);
            },
            NewMoveData: function (label, condition, action, tags) {
                var $t;
                var mv = new Pidroh.ConsoleApp.Turnbased.MoveData.$ctor1(label);
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
                }this.ecs.CreateEntityWithComponent(mv);
                this.moveDatas.add(mv);
            },
            OneTickPerAction: function (actions) {
                if (actions === void 0) { actions = []; }
                var ticks = System.Array.init(actions.length, null, Pidroh.ConsoleApp.Turnbased.Tick);
                for (var i = 0; i < ticks.length; i = (i + 1) | 0) {
                    ticks[System.Array.index(i, ticks)] = new Pidroh.ConsoleApp.Turnbased.Tick.$ctor1(actions[System.Array.index(i, actions)]);
                }
                return ticks;
            },
            TickUnitCondition: function (condition, actions) {
                if (actions === void 0) { actions = []; }
                var tick = new Pidroh.ConsoleApp.Turnbased.Tick.$ctor2(actions);
                tick.condition = condition;
                return tick;
            },
            TickUnit: function (actions) {
                if (actions === void 0) { actions = []; }
                return new Pidroh.ConsoleApp.Turnbased.Tick.$ctor2(actions);
            },
            TickArray: function (ticks) {
                if (ticks === void 0) { ticks = []; }
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
            $ctor1: function (label) {
                this.$initialize();
                this.label = label;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            HasTag: function (tag) {
                return this.tags.contains(tag);
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
                if (md.units.Count === 0) {
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
                                var moveTo = actor.pos.$clone();
                                var moveFrom = Pidroh.BaseUtils.Vector2D.op_Subtraction(actor.pos.$clone(), p.$clone());
                                this.CreateHapp$1(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Movement, new Pidroh.ConsoleApp.Turnbased.HappMoveData.$ctor1(actorId), new Pidroh.ConsoleApp.Turnbased.HappMovement.$ctor1(moveFrom.$clone(), moveTo.$clone(), false));


                                //battleMain.happManager
                                //    .Add(new Happ(BattleMain.HappTag.MovementFail))
                                //    .AddAttribute(new Happ.Attribute().SetValue(actorId))
                                //    .AddAttribute(new Happ.Attribute().SetValue(actor.pos.X))
                                //    .AddAttribute(new Happ.Attribute().SetValue(actor.pos.Y));

                                //battleState.moveTick_Total = 1;
                                actor.pos = Pidroh.BaseUtils.Vector2D.op_Subtraction(actor.pos.$clone(), p.$clone());
                            } else {
                                var actorId1 = this.entities.indexOf(actor);
                                var moveTo1 = actor.pos.$clone();
                                var moveFrom1 = Pidroh.BaseUtils.Vector2D.op_Subtraction(actor.pos.$clone(), p.$clone());
                                this.CreateHapp$1(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Movement, new Pidroh.ConsoleApp.Turnbased.HappMoveData.$ctor1(actorId1), new Pidroh.ConsoleApp.Turnbased.HappMovement.$ctor1(moveFrom1.$clone(), moveTo1.$clone(), true));
                                //Console.WriteLine("MOVE HAPP SUCCESS");
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
            Abrev: null,
            Description: null
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

    Bridge.define("Pidroh.ConsoleApp.Turnbased.SpecialEnemyMoves", {
        $kind: "enum",
        statics: {
            fields: {
                SmartMove: 0
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
                //    Enemy(0, new BaseUtils.Vector2D(3, 2)),
                //    Enemy(2, new BaseUtils.Vector2D(3, 1)),
                //    Enemy(2, new BaseUtils.Vector2D(5, 1))
                //    ));

                //Add(new StageData(
                //  Enemy(0, new BaseUtils.Vector2D(4, 0))
                //  ));

                //Add(new StageData(
                //    //Enemy(0, new BaseUtils.Vector2D(4, 0)),
                //    Enemy(6, new BaseUtils.Vector2D(5, 0))
                //    ), new FixedAttackStage(
                //        (int)BattleMain.MoveType.Fire));

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
            $ctor2: function (actions) {
                this.$initialize();
                this.thingsToHappen.AddRange(actions);
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
                }
            }
        },
        fields: {
            comps: null,
            ECSId: 0,
            entityIdMax: 0,
            accessors: null,
            CopyMethods: null,
            aux: null
        },
        ctors: {
            init: function () {
                this.comps = new (System.Collections.Generic.Dictionary$2(Function,System.Array.type(System.Object)))();
                this.entityIdMax = -1;
                this.accessors = new (System.Collections.Generic.List$1(Pidroh.ECS.Accessor)).ctor();
                this.CopyMethods = new (System.Collections.Generic.Dictionary$2(Function,Function))();
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
            AddCopyMethod: function (type, copyMetho) {
                this.CopyMethods.add(type, copyMetho);
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
                        this.Copy$1(to, type, toArray, origin);
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
            Copy$1: function (to, type, toArray, origin) {
                var copyMethod = { v : null };
                this.CopyMethods.tryGetValue(type, copyMethod);

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
                        if (!Bridge.staticEquals(copyMethod.v, null)) {
                            copyMethod.v(origin[System.Array.index(i, origin)], toArray[System.Array.index(i, toArray)]);
                        }

                        //DeepCloneHelper.DeepCopyPartial(origin[i], toArray[i]);
                    }
                }
            },
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
            DrawOnCenterHorizontal: function (message, color, xOff, y, alignString) {
                if (xOff === void 0) { xOff = 0; }
                if (y === void 0) { y = 0; }
                if (alignString === void 0) { alignString = true; }
                var x = (Bridge.Int.div((this.Width), 2)) | 0;
                if (alignString) {
                    x = (x - (((Bridge.Int.div(message.length, 2)) | 0))) | 0;
                }
                this.Draw$1(message, ((x + xOff) | 0), y, color);
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

                    while (x2 >= this.Width) {
                        x2 = (((x2 - this.Width) | 0) + newlineX) | 0;
                        y2 = (y2 + 1) | 0;
                    }

                    //
                    if (v.charCodeAt(i) === 10) {
                        linebreaks = (linebreaks + 1) | 0;
                        xOffsetnewlines = (xOffsetnewlines + (((((newlineX - x2) | 0) - 1) | 0))) | 0;
                    } else {
                        this.DrawChar$1(v.charCodeAt(i), x2, ((y2 + linebreaks) | 0), color, backColor);
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
            Free: function (entities) {
                var $t;

                this.freeBoards.AddRange(entities);
                $t = Bridge.getEnumerator(entities);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        this.activeAgents.remove(item);
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

    Bridge.define("Pidroh.TurnBased.TextRendering.AttackPreview", {
        fields: {
            ecs: null,
            render: null,
            moveDatas: null,
            entities: null,
            currentMoveId: 0
        },
        ctors: {
            init: function () {
                this.entities = new (System.Collections.Generic.List$1(Pidroh.TextRendering.TextEntity)).ctor();
            },
            ctor: function (ecs, render) {
                this.$initialize();
                this.ecs = ecs;
                this.render = render;
                this.render.attackPreview = this;
                this.moveDatas = ecs.QuickAccessor1(Pidroh.ConsoleApp.Turnbased.MoveData);

            }
        },
        methods: {
            ShowPreview: function (user, moveId) {
                var $t, $t1;
                if (moveId === this.currentMoveId) {
                    return;
                }
                this.End();
                this.currentMoveId = moveId;
                //Console.WriteLine("START");

                //Console.WriteLine("move "+moveId);
                var moveData = this.moveDatas.Comp1(moveId);
                var pos = this.render.EntityScreenPosition(user);
                var gridRect = this.render.GetGridRect();

                $t = Bridge.getEnumerator(moveData.units);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        var items = item.thingsToHappen;
                        $t1 = Bridge.getEnumerator(items);
                        try {
                            while ($t1.moveNext()) {
                                var thing = $t1.Current;
                                if (Bridge.is(thing, Pidroh.ConsoleApp.Turnbased.DealDamageAction)) {
                                    var da = Bridge.as(thing, Pidroh.ConsoleApp.Turnbased.DealDamageAction);
                                    var target = da.target;
                                    switch (target) {
                                        case Pidroh.ConsoleApp.Turnbased.Target.None: 
                                            break;
                                        case Pidroh.ConsoleApp.Turnbased.Target.Self: 
                                            break;
                                        case Pidroh.ConsoleApp.Turnbased.Target.ClosestTarget: 
                                            break;
                                        case Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX: 
                                            var freeEntity = this.render.textWorld.GetFreeEntity(((((gridRect.X + gridRect.Width) | 0) - pos.XInt) | 0), 1);
                                            this.entities.add(freeEntity);
                                            freeEntity.SetPosition(pos.$clone());
                                            freeEntity.Origin.SetAll(Pidroh.TextRendering.TextBoard.INVISIBLECHAR, Pidroh.TextRendering.TextBoard.INVISIBLECOLOR, 1);
                                            break;
                                        case Pidroh.ConsoleApp.Turnbased.Target.Area: 
                                            break;
                                        default: 
                                            break;
                                    }
                                }
                            }
                        } finally {
                            if (Bridge.is($t1, System.IDisposable)) {
                                $t1.System$IDisposable$Dispose();
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            End: function () {

                if (this.currentMoveId >= 0) {
                    //Console.WriteLine("END");
                    this.currentMoveId = -1;
                    this.render.textWorld.Free(this.entities);
                }
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

                    var amount = damage.amount;





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

                    {
                        var pos2 = battleRender.BattleEntityToScreenPosition(battleMain.entities.getItem(damage.target).pos.$clone());
                        var number = battleRender.textWorld.GetTempEntity(1, 1);

                        var initialPos = Pidroh.BaseUtils.Vector2D.op_Addition(pos2.$clone(), new Pidroh.BaseUtils.Vector2D.$ctor2(0, 0));
                        number.SetPosition(initialPos.$clone());

                        number.Origin.DrawOneDigit(amount, 0, 0, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero);
                        posAnim.Add$1(number.AnimBase(0.6), new Pidroh.TextRendering.PositionAnimation.PositionData.$ctor1(initialPos.$clone(), Pidroh.BaseUtils.Vector2D.op_Addition(initialPos.$clone(), new Pidroh.BaseUtils.Vector2D.$ctor2(0, -3))));
                        //blinkAnim.Add(number.AnimBase(1f), BlinkAnim.BlinkData.Char(' ', 5f));
                    }

                    if (message != null) {
                        battleRender.ShowMessage(message);
                    }

                    var defender = battleRender.battlerRenders.getItem(damage.target);

                    //var fe = battleRender.textWorld.GetTempEntity(defender.Width, defender.Height);
                    if (!damage.superEffective && !damage.elementalBlock) {
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
                var moveHandle = function (e) {
                    //Console.WriteLine("HANDLE!3");
                    var hmd = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.HappMoveData, e);
                    var hmf = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.HappMovement, e);
                    var eId = hmd.user;
                    var mover = battleMain.entities.getItem(eId);

                    var pos = mover.PositionV2D.$clone();
                    var pos2 = hmf.moveTo.$clone();
                    var posF = Pidroh.BaseUtils.Vector2D.op_Division$1((Pidroh.BaseUtils.Vector2D.op_Addition(pos.$clone(), pos2.$clone())), 2);

                    var fe = battleRender.battlerRenders.getItem(eId);
                    //Console.WriteLine("Move fail");
                    //Console.WriteLine("HAPP MOVE HANDLE");
                    if (hmf.success) {
                        var finalPosScreen = battleRender.BattleEntityToScreenPosition(hmf.moveTo.$clone());
                        posAnim.Add$1(fe.AnimBase(0.2), new Pidroh.TextRendering.PositionAnimation.PositionData.$ctor1(battleRender.BattleEntityToScreenPosition(hmf.moveFrom.$clone()), finalPosScreen.$clone()));
                        fe.SetPosition(finalPosScreen.$clone());
                    } else {
                        posAnim.Add$1(fe.AnimBase(0.2), new Pidroh.TextRendering.PositionAnimation.PositionData.$ctor1(battleRender.BattleEntityToScreenPosition(hmf.moveFrom.$clone()), battleRender.BattleEntityToScreenPosition(posF.$clone())));
                    }

                };
                this.handlers.add(new Pidroh.TurnBased.TextRendering.HappHandling.HappHandler(moveHandle, [Pidroh.ConsoleApp.Turnbased.MoveDataTags.Movement]));

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
                    var $t, $t1;
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
                            //Console.Write("Handled"+i);
                            //Console.WriteLine("HANDLE!");
                            var handled = false;
                            $t = Bridge.getEnumerator(this.handlers);
                            try {
                                while ($t.moveNext()) {
                                    var han = $t.Current;
                                    //Console.WriteLine("HANDLE!x");
                                    if (han.CanHandle(tags.tags)) {
                                        //Console.Write("HandledX" + i);
                                        handled = true;
                                        //Console.WriteLine(happs.Comp2(i).TimeSnap + " - " + time.CurrentSnap);
                                        //Console.WriteLine("HANDLE!2");
                                        han.Handler(this.happs.Entity(i));
                                    }
                                }
                            } finally {
                                if (Bridge.is($t, System.IDisposable)) {
                                    $t.System$IDisposable$Dispose();
                                }
                            }if (!handled) {
                                $t1 = Bridge.getEnumerator(tags.tags);
                                try {
                                    while ($t1.moveNext()) {
                                        var t = $t1.Current;
                                        //Console.WriteLine("Not handled tag " + t);
                                    }
                                } finally {
                                    if (Bridge.is($t1, System.IDisposable)) {
                                        $t1.System$IDisposable$Dispose();
                                    }
                                }}
                        } else {
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

    Bridge.define("Pidroh.TurnBased.TextRendering.HelpScreenModel", {
        fields: {
            battleMain: null,
            commandsHero: null,
            commandsEnemy: null,
            battleIntroMode: false
        },
        ctors: {
            init: function () {
                this.commandsHero = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                this.commandsEnemy = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                this.battleIntroMode = false;
            },
            ctor: function (battleMain) {
                this.$initialize();
                this.battleMain = battleMain;

            }
        },
        methods: {
            RefreshData: function () {
                var $t;
                this.commandsHero.clear();
                this.AddAll(this.battleMain.playerHandFixed, this.commandsHero);
                this.AddAll(this.battleMain.playerHandUnfixed, this.commandsHero);
                this.AddAll(this.battleMain.playerHandPool, this.commandsHero);
                $t = Bridge.getEnumerator(this.battleMain.entities);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        this.AddAllArray(item.moves, this.commandsEnemy);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            AddAll: function (moves, commands) {
                var $t;
                $t = Bridge.getEnumerator(moves);
                try {
                    while ($t.moveNext()) {
                        var m = $t.Current;
                        var a = m;
                        if (a < 0) {
                            continue;
                        }
                        if (!commands.contains(a)) {
                            commands.add(a);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            AddAllArray: function (moves, commands) {
                var $t;
                $t = Bridge.getEnumerator(moves);
                try {
                    while ($t.moveNext()) {
                        var a = $t.Current;
                        if (a < 0) {
                            continue;
                        }
                        if (!commands.contains(a)) {
                            commands.add(a);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }}
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
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Help), 104);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Cancel), 114);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Confirm), Pidroh.BaseUtils.Unicode.Space);
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
            Inputted: function (unicodeKey, input) {
                var $t;
                //Console.WriteLine(" input + "+(char)unicodeKey);
                $t = Bridge.getEnumerator(this.fixedMoveButtons);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        if (item.value === unicodeKey) {
                            if (input.Contains(item.key)) {
                                return item.key;
                            }
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
                //Console.Write(pos);
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
                this.texts = System.Array.init(3, null, System.Array.type(System.String));
            },
            ctor: function (hoverManager, entity, moveDescriptions) {
                this.$initialize();
                this.hoverManager = hoverManager;
                this.entity = entity;
                //texts[0] = new string[Enum.GetValues(typeof(BattleMain.MoveType)).Length];

                this.texts[System.Array.index(0, this.texts)] = moveDescriptions;
                //Done,
                //    Redo,
                //Preview,
                //Confirm,
                //Cancel
                this.texts[System.Array.index(1, this.texts)] = System.Array.init(["Starts command execution", "Removes the last inputted command", "Preview moves of the opponents", "Inputs move", "Returns", "Shows helpful information"], System.String);
                this.texts[System.Array.index(2, this.texts)] = System.Array.init(["Moves in the corresponding direction"], System.String);
            }
        },
        methods: {
            Update: function () {
                var $t;
                this.entity.ResetFull();
                this.hoverManager.Update();
                var active = this.hoverManager.mouseHoversActive;
                if (active.Count > 0) {
                    //Console.Write("HOVER");
                    var id = active.getItem(0).$clone().id;
                    if (id >= 0) {
                        var text = ($t = this.texts[System.Array.index(active.getItem(0).$clone().type, this.texts)])[System.Array.index(id, $t)];
                        this.entity.Origin.Draw$1(text, 0, 0, 2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackBattle);

                        var x = (((active.getItem(0).$clone().rect.X + 1) | 0) - ((Bridge.Int.div(text.length, 2)) | 0)) | 0;
                        if (x < 0) {
                            x = 1;
                        }
                        this.entity.SetPosition$1(x, ((active.getItem(0).$clone().rect.Y - 2) | 0));
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
                ecs.AddCopyMethod(Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity, function (o1, o2) {
                    var to = Bridge.as(o2, Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity);
                    var from = Bridge.as(o1, Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity);
                    to.pos = from.pos.$clone();
                    to.life = from.life;
                    to.maxLife = from.maxLife;
                    to.element = from.element;
                    for (var i = 0; i < to.moves.length; i = (i + 1) | 0) {
                        to.moves[System.Array.index(i, to.moves)] = from.moves[System.Array.index(i, from.moves)];
                    }
                });
                ecs.AddCopyMethod(Pidroh.ConsoleApp.Turnbased.BattleMain.BattleState, function (o1, o2) {
                    var to = Bridge.as(o2, Pidroh.ConsoleApp.Turnbased.BattleMain.BattleState);
                    var from = Bridge.as(o1, Pidroh.ConsoleApp.Turnbased.BattleMain.BattleState);
                    to.actingEntity = from.actingEntity;
                    to.BattleEndActive = from.BattleEndActive;
                    to.moveTick_Now = from.moveTick_Now;
                    to.moveTick_Total = from.moveTick_Total;
                    to.phase = from.phase;
                    to.turn = from.turn;
                    to.turnsPerPhase = from.turnsPerPhase;
                    to.totalTurns = from.totalTurns;
                });
                ecs.AddCopyMethod(Pidroh.BaseUtils.TimeStamp, function (o1, o2) {
                    var to = Bridge.as(o2, Pidroh.BaseUtils.TimeStamp);
                    var from = Bridge.as(o1, Pidroh.BaseUtils.TimeStamp);
                    to.CurrentSnap = from.CurrentSnap;
                });
                ecs.AddCopyMethod(Pidroh.TurnBased.TextRendering.HappHandling.HappHandleState, function (o1, o2) {
                    var to = Bridge.as(o2, Pidroh.TurnBased.TextRendering.HappHandling.HappHandleState);
                    var from = Bridge.as(o1, Pidroh.TurnBased.TextRendering.HappHandling.HappHandleState);
                    to.highestHandled = from.highestHandled;
                });
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
                //Console.WriteLine(battleMain.entities.Contains(battleEntity.Comp1(0))+"XXXS");

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
            attackPreview: null,
            turnBaseTry: null,
            stageData: null,
            previewSystem: null,
            posAnim: null,
            charByCharAnim: null,
            delayAnim: null,
            textWorld: null,
            TextBoard: null,
            inputPhases: null,
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
            inputH: null,
            helpVisualizeRequest: false
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
                this.inputPhases = function (_o1) {
                        _o1.add(Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands);
                        _o1.add(Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ConfirmInput);
                        return _o1;
                    }(new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase)).ctor());
                this.InputUnicode = -1;
                this.moveDescriptions = new (System.Collections.Generic.Dictionary$2(System.Object,System.String))();
                this.miscDescriptions = function (_o2) {
                        _o2.add(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done, "DONE");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo, "REDO");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Help, "HELP");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Preview, "PREVIEW");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Confirm, "CONFIRM");
                        _o2.add(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Cancel, "CANCEL");
                        return _o2;
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
                this.textWorld.Init(Pidroh.ConsoleApp.Turnbased.GameMain.Width, Pidroh.ConsoleApp.Turnbased.GameMain.Height);
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


                this.moveChars = function (_o3) {
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, "F");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice, "I");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder, "T");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot, "G");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, String.fromCharCode(Pidroh.BaseUtils.Unicode.Rightarrow2) + "");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, String.fromCharCode(Pidroh.BaseUtils.Unicode.Uparrow2) + "");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, String.fromCharCode(Pidroh.BaseUtils.Unicode.Downarrow2) + "");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, String.fromCharCode(Pidroh.BaseUtils.Unicode.Leftarrow2) + "");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, "IB");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, "TB");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.SummonEntity, "SU");
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, " ");
                        return _o3;
                    }(new (System.Collections.Generic.Dictionary$2(System.Object,System.String))());

                this.moveDescriptions = function (_o4) {
                        _o4.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice, "Ice Shot");
                        _o4.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, "Fire Shot");
                        _o4.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder, "Thunder Shot");
                        _o4.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, "Ice Bomb");
                        _o4.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot, "Gun");
                        _o4.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, String.fromCharCode(Pidroh.BaseUtils.Unicode.Rightarrow2) + "");
                        _o4.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, String.fromCharCode(Pidroh.BaseUtils.Unicode.Uparrow2) + "");
                        _o4.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, String.fromCharCode(Pidroh.BaseUtils.Unicode.Downarrow2) + "");
                        _o4.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, String.fromCharCode(Pidroh.BaseUtils.Unicode.Leftarrow2) + "");
                        _o4.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, "Thunder Bomb");
                        _o4.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.SummonEntity, "Summon");
                        return _o4;
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
            EntityScreenPosition: function (user) {
                return this.BattleEntityToScreenPosition(this.turnBaseTry.entities.getItem(user).pos.$clone());
            },
            GetGridRect: function () {
                return new Pidroh.BaseUtils.Rect.$ctor1(this.gridOffsetx, this.gridOffsety, Bridge.Int.mul(this.gridScale, 6), Bridge.Int.mul(this.gridScale, 3));
            },
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
                        //TextBoard.SetAll(TextBoard.NOCHANGECHAR, TextBoard.NOCHANGECOLOR, Colors.FireAura);

                    }
                    if (this.lastPhase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands) {
                        //Console.Write("X__X");
                        this.HideMessage();
                        //TextBoard.SetAll(TextBoard.NOCHANGECHAR, TextBoard.NOCHANGECOLOR, 0);
                    }
                }
                this.lastPhase = this.turnBaseTry.battleState.phase;
                if (this.inputPhases.contains(this.turnBaseTry.battleState.phase)) {
                    if (this.InputUnicode >= 0) {
                        if (this.InputUnicode === 112) {
                            //Console.WriteLine("PREVIEW");
                            this.previewSystem.StartPreview();
                            return;
                        }
                        var inputX = this.inputH.Inputted(this.InputUnicode, this.turnBaseTry.inputs);
                        if (inputX.type === Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle && inputX.arg1 === Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Help) {
                            this.helpVisualizeRequest = true;
                        }

                        if (inputX.type !== Pidroh.ConsoleApp.Turnbased.InputType.None) {
                            this.turnBaseTry.InputDone(inputX);
                        }
                    }
                    if (this.turnBaseTry.inputs.inputForConfirmation.type !== Pidroh.ConsoleApp.Turnbased.InputType.None) {
                        if (false) {
                            this.attackPreview.ShowPreview(0, this.turnBaseTry.inputs.inputForConfirmation.arg1);
                            this.turnBaseTry.ConfirmInputStart();
                        } else {
                            this.attackPreview.End();
                            this.turnBaseTry.InputConfirmed();
                        }

                    } else {
                        this.attackPreview.End();
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

                if (this.inputPhases.contains(this.turnBaseTry.battleState.phase)) {
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
                        //float time = 0.15f;
                        //posAnim.Add(battlerRenders[i].AnimBase(time), new PositionAnimation.PositionData(battlerRenders[i].Origin.Position, screenPos, true));
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

                    if (this.inputPhases.contains(this.turnBaseTry.battleState.phase)) {
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
                if (this.inputPhases.contains(this.turnBaseTry.battleState.phase)) {
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
                            this.messageEnt.Origin.SetAll(Pidroh.TextRendering.TextBoard.INVISIBLECHAR);
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
                        var TextBoard = this.TextBoard;
                        Pidroh.ConsoleApp.Turnbased.GameMain.DrawInput(x2, y2, unicode, description.v, TextBoard);

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
                        var movementCommand = unicode === 119;
                        if (movementCommand) {
                            forceInputLabel = "WASD";
                            forceCommandLabel = "" + String.fromCharCode(Pidroh.BaseUtils.Unicode.Uparrow2) + String.fromCharCode(Pidroh.BaseUtils.Unicode.Leftarrow2) + String.fromCharCode(Pidroh.BaseUtils.Unicode.Downarrow2) + String.fromCharCode(Pidroh.BaseUtils.Unicode.Rightarrow2);
                        }
                        if (unicode === 97 || unicode === 115 || unicode === 100) {
                            continue;
                        }
                        yOff = (yOff + 1) | 0;
                        yOff = (yOff + 1) | 0;



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
                            this.mouseHover.mouseHovers.add(new Pidroh.TextRendering.GameScreen.MouseHover.$ctor1(new Pidroh.BaseUtils.Rect.$ctor1(((x2 - 2) | 0), y2, 20, 1), 1, input.arg1));
                        } else {
                            if (movementCommand) {
                                this.mouseHover.mouseHovers.add(new Pidroh.TextRendering.GameScreen.MouseHover.$ctor1(new Pidroh.BaseUtils.Rect.$ctor1(((x2 - 2) | 0), y2, 20, 1), 2, 0));
                            } else {
                                this.mouseHover.mouseHovers.add(new Pidroh.TextRendering.GameScreen.MouseHover.$ctor1(new Pidroh.BaseUtils.Rect.$ctor1(((x2 - 2) | 0), y2, 20, 1), 0, input.arg1));
                            }
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
        statics: {
            fields: {
                Width: 0,
                Height: 0
            },
            ctors: {
                init: function () {
                    this.Width = 68;
                    this.Height = 46;
                }
            },
            methods: {
                DrawInput: function (x2, y2, unicode, description, TextBoard) {
                    TextBoard.DrawUnicodeLabel(unicode, x2, y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey);
                    TextBoard.Draw$1(description, ((((x2 + 2) | 0) + 5) | 0), y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.InputDescription);
                }
            }
        },
        fields: {
            battleMain: null,
            battleRender: null,
            modeSelectionScreen: null,
            mainDraw: null,
            helpScreen: null,
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
                //var moveRenderInfo = new MoveRenderInfo();
                //moveRenderInfo.AddMoveNames();
                var moveDescriptions = System.Array.init(["", "Move up", "Move left", "Move down", "Move right", "Shoots forward", "Shoots fire forward", "Shoots ice forward", "Shoots thunder forward", "Throws ice bomb three squares forward", "Throws thunder bomb three squares forward", "Summons another enemy", ""], System.String);

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
                var moveCreator = battleSetup.moveCreator;
                this.battleMain = battleSetup.battleMain;
                var moveRenders = moveCreator.moveRenders;
                for (var i = 0; i < moveRenders.Count; i = (i + 1) | 0) {
                    moveRenders.getItem(i).Description = moveDescriptions[System.Array.index(i, moveDescriptions)];
                    //Console.WriteLine("{0} {1}", moveRenders[i].Label, moveRenders[i].Description);
                }
                var helpModel = new Pidroh.TurnBased.TextRendering.HelpScreenModel(this.battleMain);
                this.helpScreen = new Pidroh.TurnBased.TextRendering.HelpScreen(helpModel, moveRenders, moveCreator.moveDatas);

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
                new Pidroh.TurnBased.TextRendering.AttackPreview(ecs, this.battleRender);
                new Pidroh.TurnBased.TextRendering.HappHandling(this.battleRender, battleSetup);
                //

                if (this.helpScreen.IsWannaShowIntro()) {
                    this.helpScreen.Show();
                    this.mainDraw = this.helpScreen;
                    helpModel.battleIntroMode = true;
                } else {
                    this.mainDraw = this.battleRender;
                }

                //helpScreen.
                this.resultScreen = new Pidroh.ConsoleApp.Turnbased.ResultScreen();

                this.resultScreen.battleResult = this.battleMain.battleResult;

                var hoverManager = new Pidroh.TextRendering.GameScreen.MouseHoverManager(this.Mouse);
                hoverManager.mouseHovers.add(new Pidroh.TextRendering.GameScreen.MouseHover.$ctor1(new Pidroh.BaseUtils.Rect.$ctor1(5, 5, 5, 5), 0, 0));


                this.mouseHover = new Pidroh.TurnBased.TextRendering.MouseHoverText(hoverManager, this.battleRender.textWorld.GetFreeEntity(50, 1), moveDescriptions);

                this.battleRender.mouseHover = hoverManager;
            },
            Draw: function (f) {
                this.mouseHover.Update();
                this.mainDraw.Pidroh$ConsoleApp$Turnbased$ITextScreen_$Draw(f);
                this.mainDraw.Pidroh$ConsoleApp$Turnbased$ITextScreen_$Mouse = this.Mouse;
                if (this.helpScreen.wannaLeave === true) {
                    this.helpScreen.wannaLeave = false;
                    this.mainDraw = this.battleRender;

                }
                if (Bridge.referenceEquals(this.mainDraw, this.battleRender)) {
                    if (this.battleRender.helpVisualizeRequest) {
                        this.helpScreen.Show();
                        this.mainDraw = this.helpScreen;
                        this.battleRender.helpVisualizeRequest = false;
                        this.helpScreen.HelpMode();
                    }
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
                this.textWorld.Init(60, 25);
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
                this.textWorld.mainBoard.DrawOnCenter(message, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.ThunderShot);
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

    Bridge.define("Pidroh.TurnBased.TextRendering.HelpScreen", {
        inherits: [Pidroh.ConsoleApp.Turnbased.ITextScreen_],
        fields: {
            Input: 0,
            InputUnicode: 0,
            Mouse: null,
            textWorld: null,
            model: null,
            moveRenders: null,
            moveDatas: null,
            LeaveButton: 0,
            wannaLeave: false,
            explanationEntity: null
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
                this.Mouse = new Pidroh.TextRendering.GameScreen.MouseIO();
            },
            ctor: function (helpModel, moveRenders, moveDatas) {
                this.$initialize();
                this.textWorld = new Pidroh.TextRendering.TextWorld();
                this.textWorld.Init(Pidroh.ConsoleApp.Turnbased.GameMain.Width, Pidroh.ConsoleApp.Turnbased.GameMain.Height);
                this.model = helpModel;
                this.moveRenders = moveRenders;
                this.moveDatas = moveDatas;
                this.textWorld.mainBoard.SetAll(Pidroh.TextRendering.TextBoard.INVISIBLECHAR, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackCommand, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackCommand);
                this.explanationEntity = this.textWorld.GetFreeEntity(((Pidroh.ConsoleApp.Turnbased.GameMain.Width - 4) | 0), 35);
                this.explanationEntity.SetPosition$1(2, 4);
                //explanationEntity.Origin.Draw("SSS__SSSSDASDASDAS", 0,0, BattleRender.Colors.InputDescription);
            }
        },
        methods: {
            Draw: function (f) {
                var input = this.InputUnicode;
                if (input === this.LeaveButton) {
                    this.wannaLeave = true;
                }

                //textWorld.mainBoard.Reset();
                var pos = 0;
                //textWorld.mainBoard.DrawWithLinebreaks("Input your commands and watch the turn play out. You can see everything your enemies will do\n\nAttacks have three elements, Fire, Thunder and Ice. Fire beats Ice, Ice beats Thunder, Thunder beats Fire.\nThe element of the attacker changes upon attacking. Attackers are immune to attacks of the same element!", 2, pos, 0, BattleRender.Colors.inputKey, TextBoard.INVISIBLECOLOR);
                this.explanationEntity.Origin.SetCursorAt(0, 0);
                //if (!model.battleIntroMode){
                if (false) {
                    this.explanationEntity.Origin.Draw_Cursor_SmartLineBreak("Input your commands and watch the turn play out. Plan your moves based on what the enemy will do!", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.InputDescription);
                    this.explanationEntity.Origin.CursorNewLine(0);
                    this.explanationEntity.Origin.CursorNewLine(0);
                    this.explanationEntity.Origin.Draw_Cursor_SmartLineBreak("Attacks have three elements, Fire, Thunder and Ice. Fire beats Ice, Ice beats Thunder, Thunder beats Fire.", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.InputDescription);
                    this.explanationEntity.Origin.CursorNewLine(0);
                    this.explanationEntity.Origin.CursorNewLine(0);

                    this.explanationEntity.Origin.Draw_Cursor_SmartLineBreak("The element of the attacker changes upon attacking. Attackers are immune to attacks of the same element!", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.InputDescription);
                    pos = (pos + 18) | 0;
                } else {
                    pos = 5;
                }

                this.textWorld.Draw();

                //textWorld.mainBoard.DrawWithLinebreaks("Input your commands and watch the turn play out. You can see everything your enemies will do\n", 2, pos, 2, BattleRender.Colors.InputDescription);


                this.textWorld.mainBoard.Draw$1("YOUR COMMANDS", 2, ((pos - 2) | 0), Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);
                var menuTitle = "HELP";
                var leaveLabel = "EXIT";
                if (this.model.battleIntroMode) {
                    leaveLabel = "START";
                    menuTitle = "BATTLE INTRO";
                    this.LeaveButton = 32;
                } else {
                    this.LeaveButton = 120;
                }
                this.textWorld.mainBoard.DrawOnCenterHorizontal(menuTitle, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel, 0, 1);

                var commandList = this.model.commandsHero;
                pos = this.ShowCommands(pos, commandList);
                pos = (pos + 4) | 0;
                this.textWorld.mainBoard.Draw$1("ENEMY COMMANDS", 2, pos, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);
                pos = (pos + 2) | 0;
                pos = this.ShowCommands(pos, this.model.commandsEnemy);

                Pidroh.ConsoleApp.Turnbased.GameMain.DrawInput(1, ((pos + 3) | 0), this.LeaveButton, leaveLabel, this.textWorld.mainBoard);


            },
            ShowCommands: function (pos, commandList) {
                for (var i = 0; i < commandList.Count; i = (i + 1) | 0) {
                    //Console.Write("DRAWWW");

                    var command = commandList.getItem(i);
                    var drawFlag = this.CheckDrawCommand(command);
                    if (drawFlag) {
                        this.textWorld.mainBoard.Draw$1(this.moveRenders.getItem(command).Abrev, 2, pos, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn);
                        this.textWorld.mainBoard.Draw$1(this.moveRenders.getItem(command).Label.toUpperCase(), 5, pos, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn);
                        this.textWorld.mainBoard.Draw$1(this.moveRenders.getItem(command).Description, 3, ((pos + 1) | 0), Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.InputDescription);
                        pos = (pos + 3) | 0;
                    }

                }

                return pos;
            },
            IsShowingCommandInList: function (commandList) {
                for (var i = 0; i < commandList.Count; i = (i + 1) | 0) {
                    //Console.Write("DRAWWW");

                    var command = commandList.getItem(i);
                    if (this.CheckDrawCommand(command)) {
                        return true;
                    }


                }

                return false;
            },
            CheckDrawCommand: function (command) {
                var drawFlag = false;
                if (command >= 0) {
                    //Console.WriteLine(command);
                    //Console.WriteLine();
                    var md = this.moveDatas.getItem(command);
                    if (!md.HasTag(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Movement)) {
                        drawFlag = this.moveRenders.getItem(command).Label.length !== 0;
                    }


                }

                return drawFlag;
            },
            GetBoard: function () {
                return this.textWorld.mainBoard;
            },
            Show: function () {
                this.model.RefreshData();
            },
            HelpMode: function () {
                this.model.battleIntroMode = false;
            },
            IsWannaShowIntro: function () {
                this.model.RefreshData();
                return this.IsShowingCommandInList(this.model.commandsEnemy) || this.IsShowingCommandInList(this.model.commandsHero);
                //return model.commandsEnemy.Count != 0 || model.commandsHero.Count != 0;
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VCdWlsZC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvT2JqZWN0Q2xvbmVyLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvRGVidWdnZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9EZWVwQ2xvbmVIZWxwZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9FeHRlbnNpb25zLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvUG9pbnQuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9SYW5kb21TdXBwbGllci5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1JlY3RhbmdsZS5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1RpbWVTdGFtcC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1VuaWNvZGUuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9WZWN0b3IyRC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1ZlY3RvcjNELmNzIiwiLi4vVHVybkJhc2VkTG9naWMvTW92ZURhdGEuY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0FzeW5jVGFza3MuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9CYXR0bGVTZXR1cC5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0JhdHRsZU1haW4uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0NvbG9yU3R1ZmYuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9EZWJ1Z0V4dHJhL0RlYnVnRXguY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9FQ1NJbnRlZ3JhdGlvbi5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0VuZW15QUkuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9TcGF3bkZhY3RvcnkuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9FbmVteURhdGFDcmVhdG9yLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvU3RhZ2VEYXRhLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvTW92ZURhdGFFeGVjdXRlci5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0hhcHBzL0hhcHAuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9JbnB1dEhvbGRlci5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL01vdmVDcmVhdG9yUHJvZy5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9BY2Nlc3Nvci5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9DbG9uZWRTdGF0ZS5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9FQ1NNYW5hZ2VyLmNzIiwiLi4vLi4vVmlzdWFsU3R1ZGlvU29sdXRpb25SbWsvRUNTL0VudGl0eS5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9Qcm9jZXNzb3JGbGV4LmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvVGV4dFdvcmxkLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvUGFsZXR0ZS5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL0dhbWVTY3JlZW4vTW91c2VIb3Zlci5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL0dhbWVTY3JlZW4vVW5pY29kZVJlbWFwLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvVGV4dEJvYXJkLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvR2FtZVNjcmVlbi9JVGV4dFNjcmVlbk4uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0F0dGFja1ByZXZpZXcuY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0hhcHBIYW5kbGluZy5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvSGVscFNjcmVlbi5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvSW5wdXRIYW5kbGluZy5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvTWVzc2FnZU9uUG9zaXRpb24uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL01vdXNlSG92ZXJUZXh0LmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9QcmV2aWV3U3lzdGVtLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9SZWZsZWN0aW9uVGVzdC5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvQmF0dGxlUmVuZGVyLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9HYW1lTWFpbi5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvUmVzdWx0U2NyZWVuLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvR2FtZVNjcmVlbi9UZXN0R2FtZS5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvTW9kZVNlbGVjdGlvblNjcmVlbi5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL0JsaW5rQW5pbWF0aW9uLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvQ2hhckJ5Q2hhckFuaW1hdGlvbi5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7OztZQTREWUE7O1lBRUFBLHFDQUFjQSxtQ0FBUUE7WUFDdEJBLHlCQUFTQTtZQUNUQSxLQUFLQSxXQUFXQSxJQUFJQSxzREFBMEJBOztnQkFHMUNBLDBDQUFPQSxHQUFQQSwyQkFBWUEsaUVBQWtCQSxH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QU9BOzs7Ozs7Ozs7Ozs7Z0NwQnNLbEJBLFFBQW1CQSxVQUF1QkEsVUFBZ0JBO2dCQUVsRkEsd0hBQVlBLFFBQVFBLFVBQVVBLFVBQVVBO2dCQUN4Q0EsYUFBbUJBO2dCQUNuQkEsSUFBSUE7b0JBQ0FBLFNBQVNBOztnQkFDYkEsa0JBQWtCQSw2Q0FBNEJBLGlDQUF3QkEsK0JBQXNCQSxXQUFXQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxuLy91c2luZyBFQ1M7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nO1xyXG4vL3VzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2VCdWlsZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IGJ1ZmZlcjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIGJ1ZmZlck9uO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgSFRNTFByZUVsZW1lbnQgdGV4dDtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBHYW1lTWFpbiBncjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBUZXh0Qm9hcmQgVGV4dEJvYXJkO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgU3RyaW5nQnVpbGRlciBzYjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmdbXSBjb2xvcnM7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IGJ1ZmZlclVuaWNvZGUgPSAtMTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBUZXh0Qm9hcmQgYXV4O1xyXG4gICAgICAgIHN0YXRpYyBEYXRlVGltZSBsYXN0ID0gRGF0ZVRpbWUuTm93O1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGJvb2wgQ2FuRHJhdztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBTZXR1cEdhbWUob3V0IEdhbWVNYWluIGdyLCBvdXQgVGV4dEJvYXJkIFRleHRCb2FyZClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBSYW5kb20gcm5kID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgICAgICBSYW5kb21TdXBwbGllci5HZW5lcmF0ZSA9ICgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZmxvYXQpcm5kLk5leHREb3VibGUoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGdyID0gbmV3IEdhbWVNYWluKCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZCA9IGdyLkdldEJvYXJkKCk7XHJcbiAgICAgICAgICAgIGF1eCA9IG5ldyBUZXh0Qm9hcmQoMzAwLCAzMDApO1xyXG5cclxuXHJcbiAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBCbGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgaSA9IDM7XHJcbiAgICAgICAgICAgIHB1YmxpYyBCcmlkZ2VCdWlsZC5BcHAuVmVjdG9yIHBvcyA9IG5ldyBCcmlkZ2VCdWlsZC5BcHAuVmVjdG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgVmVjdG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgZmxvYXQgeDtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL0RlZXBDbG9uZUhlbHBlci5kZWJ1Zy5BY3RpdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAvL25ldyBSZWZsZWN0aW9uVGVzdCgpO1xyXG4gICAgICAgICAgICBUZXN0RW50aXR5U3lzdGVtKCk7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJHYW1lIFN0YXJ0XCIpO1xyXG4gICAgICAgICAgICBTZXR1cEdhbWUob3V0IGdyLCBvdXQgVGV4dEJvYXJkKTtcclxuICAgICAgICAgICAgY29sb3JzID0gbmV3IHN0cmluZ1szMF07XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgQ29sb3JTdHVmZi5jb2xvcnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb2xvcnNbaV0gPSBDb2xvclN0dWZmLmNvbG9yc1tpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBuZXcgSFRNTFN0eWxlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBzdHlsZS5Jbm5lckhUTUwgPSBcImh0bWwsYm9keSB7Zm9udC1mYW1pbHk6IENvdXJpZXI7IGJhY2tncm91bmQtY29sb3I6IzFmMjUyNjsgaGVpZ2h0OiAxMDAlOyBjb2xvcjojODg4O31cIiArIFwiXFxuICNjYW52YXMtY29udGFpbmVyIHt3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyB0ZXh0LWFsaWduOmNlbnRlcjsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfSBcIjtcclxuICAgICAgICAgICAgRG9jdW1lbnQuSGVhZC5BcHBlbmRDaGlsZChzdHlsZSk7XHJcbiAgICAgICAgICAgIGJ1ZmZlciA9IDk7XHJcbiAgICAgICAgICAgIGJ1ZmZlck9uID0gZmFsc2U7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIERvY3VtZW50Lk9uS2V5UHJlc3MgKz0gKEtleWJvYXJkRXZlbnQgYSkgPT5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGludCBjb2RlID0gYS5LZXlDb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUgPT0gMCkgY29kZSA9IGEuQ2hhckNvZGU7XHJcbiAgICAgICAgICAgICAgICBpbnQgdW5pY29kZSA9IGNvZGU7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJVbmljb2RlID0gdW5pY29kZTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZSh1bmljb2RlKTtcclxuICAgICAgICAgICAgICAgIC8vYnVmZmVyID0gYS5DaGFyQ29kZTtcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBVcGRhdGVHYW1lKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZnRlciBidWlsZGluZyAoQ3RybCArIFNoaWZ0ICsgQikgdGhpcyBwcm9qZWN0LCBcclxuICAgICAgICAgICAgLy8gYnJvd3NlIHRvIHRoZSAvYmluL0RlYnVnIG9yIC9iaW4vUmVsZWFzZSBmb2xkZXIuXHJcblxyXG4gICAgICAgICAgICAvLyBBIG5ldyBicmlkZ2UvIGZvbGRlciBoYXMgYmVlbiBjcmVhdGVkIGFuZFxyXG4gICAgICAgICAgICAvLyBjb250YWlucyB5b3VyIHByb2plY3RzIEphdmFTY3JpcHQgZmlsZXMuIFxyXG5cclxuICAgICAgICAgICAgLy8gT3BlbiB0aGUgYnJpZGdlL2luZGV4Lmh0bWwgZmlsZSBpbiBhIGJyb3dzZXIgYnlcclxuICAgICAgICAgICAgLy8gUmlnaHQtQ2xpY2sgPiBPcGVuIFdpdGguLi4sIHRoZW4gY2hvb3NlIGFcclxuICAgICAgICAgICAgLy8gd2ViIGJyb3dzZXIgZnJvbSB0aGUgbGlzdFxyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBhcHBsaWNhdGlvbiB3aWxsIHRoZW4gcnVuIGluIGEgYnJvd3Nlci5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgVGVzdEVudGl0eVN5c3RlbSgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgVXBkYXRlR2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoQ2FuRHJhdylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGF0ZVRpbWUgbm93ID0gRGF0ZVRpbWUuTm93O1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlY3MgPSAobm93IC0gbGFzdCkuVG90YWxTZWNvbmRzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlY3MgPiAwLjA4KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoc2Vjcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VjcyA9IDAuMDg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkID0gZ3IuR2V0Qm9hcmQoKTtcclxuICAgICAgICAgICAgICAgIGdyLkRyYXcoKGZsb2F0KXNlY3MpO1xyXG4gICAgICAgICAgICAgICAgbGFzdCA9IG5vdztcclxuICAgICAgICAgICAgICAgIGdyLklucHV0VW5pY29kZSA9IGJ1ZmZlclVuaWNvZGU7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJVbmljb2RlID0gLTE7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG1vdXNlWCA9IFNjcmlwdC5DYWxsPGludD4oXCJnZXRNb3VzZVhcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW91c2VZID0gU2NyaXB0LkNhbGw8aW50PihcImdldE1vdXNlWVwiKTtcclxuICAgICAgICAgICAgICAgIGdyLk1vdXNlLnBvcyA9IG5ldyBQb2ludDJEKG1vdXNlWCwgbW91c2VZKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLzs7U2NyaXB0LkNhbGwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgVGV4dEJvYXJkLkhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgVGV4dEJvYXJkLldpZHRoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWF1eC5TYW1lQXMoVGV4dEJvYXJkLCB4OiBpLCB5OiBqKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50IHRjSSA9IFRleHRCb2FyZC5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgY29sb3IgPSBjb2xvcnNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGNJIDwgMCkgeyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRjSSA+PSBjb2xvcnMuTGVuZ3RoKSB7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gY29sb3JzW3RjSV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgYmFja0NvbG9yID0gY29sb3JzW1RleHRCb2FyZC5CYWNrQ29sb3JbaSwgal1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhciBAY2hhciA9IFRleHRCb2FyZC5DaGFyQXQoaSwgaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTY3JpcHQuQ2FsbChcImRyYXdcIiwgaSwgaiwgY29sb3IsIGJhY2tDb2xvciwgXCJcIiArIEBjaGFyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eC5Db3B5KFRleHRCb2FyZCwgeDogaSwgeTogaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NjcmlwdC5DYWxsKFwiZHJhd1wiLCBpLCBqLCBjb2xvcnNbVGV4dEJvYXJkLlRleHRDb2xvcltpLCBqXV0sIGNvbG9yc1tUZXh0Qm9hcmQuQmFja0NvbG9yW2ksIGpdXSwgXCJ4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDYW5EcmF3ID0gU2NyaXB0LkNhbGw8Ym9vbD4oXCJpc1JlYWR5VG9EcmF3XCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgV2luZG93LlNldFRpbWVvdXQoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbilVcGRhdGVHYW1lLCAxNSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscy5BcnJheUV4dGVuc2lvbnM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5SZWZsZWN0aW9uO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgT2JqZWN0RXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IE1ldGhvZEluZm8gQ2xvbmVNZXRob2QgPSB0eXBlb2YoT2JqZWN0KS5HZXRNZXRob2QoXCJNZW1iZXJ3aXNlQ2xvbmVcIiwgQmluZGluZ0ZsYWdzLk5vblB1YmxpYyB8IEJpbmRpbmdGbGFncy5JbnN0YW5jZSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBJc1ByaW1pdGl2ZU1ldGhvZCh0aGlzIFR5cGUgdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IHR5cGVvZihTdHJpbmcpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gdHlwZW9mKGludCkpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSB0eXBlb2YoZmxvYXQpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gdHlwZW9mKGRvdWJsZSkpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSB0eXBlb2YoY2hhcikpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAvL2Jvb2wgaXNQcmltaXRpdmUgPSB0eXBlLklzUHJpbWl0aXZlO1xyXG4gICAgICAgICAgICBib29sIGlzVmFsdWVUeXBlID0gdHlwZS5Jc1ZhbHVlVHlwZTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzVmFsdWVUeXBlOyAvLyYgaXNQcmltaXRpdmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIE9iamVjdCBDb3B5KHRoaXMgT2JqZWN0IG9yaWdpbmFsT2JqZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEludGVybmFsQ29weShvcmlnaW5hbE9iamVjdCwgbmV3IERpY3Rpb25hcnk8T2JqZWN0LCBPYmplY3Q+KG5ldyBSZWZlcmVuY2VFcXVhbGl0eUNvbXBhcmVyKCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgT2JqZWN0IEludGVybmFsQ29weShPYmplY3Qgb3JpZ2luYWxPYmplY3QsIElEaWN0aW9uYXJ5PE9iamVjdCwgT2JqZWN0PiB2aXNpdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG9yaWdpbmFsT2JqZWN0ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB2YXIgdHlwZVRvUmVmbGVjdCA9IG9yaWdpbmFsT2JqZWN0LkdldFR5cGUoKTtcclxuICAgICAgICAgICAgaWYgKElzUHJpbWl0aXZlTWV0aG9kKHR5cGVUb1JlZmxlY3QpKSByZXR1cm4gb3JpZ2luYWxPYmplY3Q7XHJcbiAgICAgICAgICAgIGlmICh2aXNpdGVkLkNvbnRhaW5zS2V5KG9yaWdpbmFsT2JqZWN0KSkgcmV0dXJuIHZpc2l0ZWRbb3JpZ2luYWxPYmplY3RdO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mKERlbGVnYXRlKS5Jc0Fzc2lnbmFibGVGcm9tKHR5cGVUb1JlZmxlY3QpKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGNsb25lT2JqZWN0ID0gQ2xvbmVNZXRob2QuSW52b2tlKG9yaWdpbmFsT2JqZWN0LCBuZXcgb2JqZWN0W10geyB9KTtcclxuICAgICAgICAgICAgaWYgKHR5cGVUb1JlZmxlY3QuSXNBcnJheSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFycmF5VHlwZSA9IHR5cGVUb1JlZmxlY3QuR2V0RWxlbWVudFR5cGUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChJc1ByaW1pdGl2ZU1ldGhvZChhcnJheVR5cGUpID09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEFycmF5IGNsb25lZEFycmF5ID0gKEFycmF5KWNsb25lT2JqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lZEFycmF5LkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlN5c3RlbS5BcnJheSwgaW50W10+KSgoYXJyYXksIGluZGljZXMpID0+IGFycmF5LlNldFZhbHVlKEludGVybmFsQ29weShjbG9uZWRBcnJheS5HZXRWYWx1ZShpbmRpY2VzKSwgdmlzaXRlZCksIGluZGljZXMpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZpc2l0ZWQuQWRkKG9yaWdpbmFsT2JqZWN0LCBjbG9uZU9iamVjdCk7XHJcbiAgICAgICAgICAgIENvcHlGaWVsZHMob3JpZ2luYWxPYmplY3QsIHZpc2l0ZWQsIGNsb25lT2JqZWN0LCB0eXBlVG9SZWZsZWN0KTtcclxuICAgICAgICAgICAgUmVjdXJzaXZlQ29weUJhc2VUeXBlUHJpdmF0ZUZpZWxkcyhvcmlnaW5hbE9iamVjdCwgdmlzaXRlZCwgY2xvbmVPYmplY3QsIHR5cGVUb1JlZmxlY3QpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xvbmVPYmplY3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlY3Vyc2l2ZUNvcHlCYXNlVHlwZVByaXZhdGVGaWVsZHMob2JqZWN0IG9yaWdpbmFsT2JqZWN0LCBJRGljdGlvbmFyeTxvYmplY3QsIG9iamVjdD4gdmlzaXRlZCwgb2JqZWN0IGNsb25lT2JqZWN0LCBUeXBlIHR5cGVUb1JlZmxlY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodHlwZVRvUmVmbGVjdC5CYXNlVHlwZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSZWN1cnNpdmVDb3B5QmFzZVR5cGVQcml2YXRlRmllbGRzKG9yaWdpbmFsT2JqZWN0LCB2aXNpdGVkLCBjbG9uZU9iamVjdCwgdHlwZVRvUmVmbGVjdC5CYXNlVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBDb3B5RmllbGRzKG9yaWdpbmFsT2JqZWN0LCB2aXNpdGVkLCBjbG9uZU9iamVjdCwgdHlwZVRvUmVmbGVjdC5CYXNlVHlwZSwgQmluZGluZ0ZsYWdzLkluc3RhbmNlIHwgQmluZGluZ0ZsYWdzLk5vblB1YmxpYywgKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5GaWVsZEluZm8sIGJvb2w+KShpbmZvID0+IGluZm8uSXNQcml2YXRlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgQ29weUZpZWxkcyhvYmplY3Qgb3JpZ2luYWxPYmplY3QsIElEaWN0aW9uYXJ5PG9iamVjdCwgb2JqZWN0PiB2aXNpdGVkLCBvYmplY3QgY2xvbmVPYmplY3QsIFR5cGUgdHlwZVRvUmVmbGVjdCwgQmluZGluZ0ZsYWdzIGJpbmRpbmdGbGFncyA9IEJpbmRpbmdGbGFncy5JbnN0YW5jZSB8IEJpbmRpbmdGbGFncy5Ob25QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuUHVibGljIHwgQmluZGluZ0ZsYWdzLkZsYXR0ZW5IaWVyYXJjaHksIEZ1bmM8RmllbGRJbmZvLCBib29sPiBmaWx0ZXIgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAoRmllbGRJbmZvIGZpZWxkSW5mbyBpbiB0eXBlVG9SZWZsZWN0LkdldEZpZWxkcyhiaW5kaW5nRmxhZ3MpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyICE9IG51bGwgJiYgZmlsdGVyKGZpZWxkSW5mbykgPT0gZmFsc2UpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKElzUHJpbWl0aXZlTWV0aG9kKGZpZWxkSW5mby5GaWVsZFR5cGUpKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbEZpZWxkVmFsdWUgPSBmaWVsZEluZm8uR2V0VmFsdWUob3JpZ2luYWxPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsb25lZEZpZWxkVmFsdWUgPSBJbnRlcm5hbENvcHkob3JpZ2luYWxGaWVsZFZhbHVlLCB2aXNpdGVkKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkSW5mby5TZXRWYWx1ZShjbG9uZU9iamVjdCwgY2xvbmVkRmllbGRWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUIENvcHk8VD4odGhpcyBUIG9yaWdpbmFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChUKUNvcHkoKE9iamVjdClvcmlnaW5hbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBSZWZlcmVuY2VFcXVhbGl0eUNvbXBhcmVyIDogRXF1YWxpdHlDb21wYXJlcjxPYmplY3Q+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCB4LCBvYmplY3QgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBSZWZlcmVuY2VFcXVhbHMoeCwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUob2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmouR2V0SGFzaENvZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmFtZXNwYWNlIEFycmF5RXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgQXJyYXlFeHRlbnNpb25zXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRm9yRWFjaCh0aGlzIEFycmF5IGFycmF5LCBBY3Rpb248QXJyYXksIGludFtdPiBhY3Rpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcnJheS5MZW5ndGggPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgQXJyYXlUcmF2ZXJzZSB3YWxrZXIgPSBuZXcgQXJyYXlUcmF2ZXJzZShhcnJheSk7XHJcbiAgICAgICAgICAgICAgICBkbyBhY3Rpb24oYXJyYXksIHdhbGtlci5Qb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAod2Fsa2VyLlN0ZXAoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGNsYXNzIEFycmF5VHJhdmVyc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnRbXSBQb3NpdGlvbjtcclxuICAgICAgICAgICAgcHJpdmF0ZSBpbnRbXSBtYXhMZW5ndGhzO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEFycmF5VHJhdmVyc2UoQXJyYXkgYXJyYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1heExlbmd0aHMgPSBuZXcgaW50W2FycmF5LlJhbmtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBhcnJheS5SYW5rOyArK2kpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3Roc1tpXSA9IGFycmF5LkdldExlbmd0aChpKSAtIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBQb3NpdGlvbiA9IG5ldyBpbnRbYXJyYXkuUmFua107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIFN0ZXAoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFBvc2l0aW9uLkxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbltpXSA8IG1heExlbmd0aHNbaV0pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQb3NpdGlvbltpXSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGk7IGorKylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUG9zaXRpb25bal0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRGVidWdnZXJcclxuICAgIHtcclxuICAgICAgICBib29sIGRlYnVnZ2luZztcclxuICAgICAgICBpbnQgaWRlbnQ7XHJcbiAgICAgICAgU3RyaW5nQnVpbGRlciBzdHJpbmdCdWlsZGVyID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuXHJcbiAgICAgICAgcHVibGljIERlYnVnZ2VyKGJvb2wgZGVidWdnaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5kZWJ1Z2dpbmcgPSBkZWJ1Z2dpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBQcmludChzdHJpbmcgcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZGVidWdnaW5nKSByZXR1cm47XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgaWRlbnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZSgnICcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBEZWlkZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkZW50ID0gaWRlbnQgLSAyOyA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIElkZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkZW50ID0gaWRlbnQrMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWN0aXZlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFjdGl2ZShib29sIHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkZWJ1Z2dpbmcgPSB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUHJpbnQoT2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZGVidWdnaW5nKSByZXR1cm47XHJcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuTGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gb2JqLkdldFR5cGUoKTtcclxuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoXCJUeXBlOiBcIik7XHJcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHR5cGUuTmFtZSk7XHJcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kTGluZSgpO1xyXG4gICAgICAgICAgICB2YXIgZmllbGRzID0gdHlwZS5HZXRGaWVsZHMoQmluZGluZ0ZsYWdzLlB1YmxpYyB8IEJpbmRpbmdGbGFncy5Ob25QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZiBpbiBmaWVsZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKCcgJyk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoZi5HZXRWYWx1ZShvYmopKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKCcgJyk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoZi5OYW1lKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kTGluZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKHN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogTW9kdWxlIEhlYWRlciAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcXFxyXG5Nb2R1bGUgTmFtZTogIERlZXBDbG9uZUhlbHBlci5jc1xyXG5Qcm9qZWN0OiAgICAgIENTRGVlcENsb25lT2JqZWN0XHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuVGhlIGNsYXNzIGNvbnRhaW5zIHRoZSBtZXRob2RzIHRoYXQgaW1wbGVtZW50IGRlZXAgY2xvbmUgdXNpbmcgcmVmbGVjdGlvbi5cclxuXHJcblRoaXMgc291cmNlIGlzIHN1YmplY3QgdG8gdGhlIE1pY3Jvc29mdCBQdWJsaWMgTGljZW5zZS5cclxuU2VlIGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9lbi11cy9vcGVubmVzcy9saWNlbnNlcy5hc3B4I01QTC5cclxuQWxsIG90aGVyIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcblRISVMgQ09ERSBBTkQgSU5GT1JNQVRJT04gSVMgUFJPVklERUQgXCJBUyBJU1wiIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIFxyXG5FSVRIRVIgRVhQUkVTU0VEIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIElNUExJRUQgXHJcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORC9PUiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS5cclxuXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5SZWZsZWN0aW9uO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBEZWVwQ2xvbmVIZWxwZXJcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBEZWJ1Z2dlciBkZWJ1ZyA9IG5ldyBEZWJ1Z2dlcihmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gR2V0IHRoZSBkZWVwIGNsb25lIG9mIGFuIG9iamVjdC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUXCI+VGhlIHR5cGUgb2YgdGhlIG9iai48L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj5JdCBpcyB0aGUgb2JqZWN0IHVzZWQgdG8gZGVlcCBjbG9uZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5SZXR1cm4gdGhlIGRlZXAgY2xvbmUuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBEZWVwQ2xvbmU8VD4oVCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAob2JqID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJPYmplY3QgaXMgbnVsbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKFQpQ2xvbmVQcm9jZWR1cmUob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEZWVwQ29weVBhcnRpYWwoT2JqZWN0IGZyb20sIE9iamVjdCB0bylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChmcm9tID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJPYmplY3QgaXMgbnVsbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDb3B5UHJvY2VkdXJlUGFydGlhbChmcm9tLCB0byk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSBtZXRob2QgaW1wbGVtZW50cyBkZWVwIGNsb25lIHVzaW5nIHJlZmxlY3Rpb24uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj5JdCBpcyB0aGUgb2JqZWN0IHVzZWQgdG8gZGVlcCBjbG9uZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5SZXR1cm4gdGhlIGRlZXAgY2xvbmUuPC9yZXR1cm5zPlxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIG9iamVjdCBDbG9uZVByb2NlZHVyZShPYmplY3Qgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChvYmogPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFR5cGUgdHlwZSA9IG9iai5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludChcIkNsb25pbmc6IFwiICsgdHlwZSk7XHJcbiAgICAgICAgICAgIC8vZGVidWcuUHJpbnQodHlwZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgdHlwZSBvZiBvYmplY3QgaXMgdGhlIHZhbHVlIHR5cGUsIHdlIHdpbGwgYWx3YXlzIGdldCBhIG5ldyBvYmplY3Qgd2hlbiBcclxuICAgICAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdCBpcyBhc3NpZ25lZCB0byBhbm90aGVyIHZhcmlhYmxlLiBTbyBpZiB0aGUgdHlwZSBvZiB0aGUgXHJcbiAgICAgICAgICAgIC8vIG9iamVjdCBpcyBwcmltaXRpdmUgb3IgZW51bSwgd2UganVzdCByZXR1cm4gdGhlIG9iamVjdC4gV2Ugd2lsbCBwcm9jZXNzIHRoZSBcclxuICAgICAgICAgICAgLy8gc3RydWN0IHR5cGUgc3Vic2VxdWVudGx5IGJlY2F1c2UgdGhlIHN0cnVjdCB0eXBlIG1heSBjb250YWluIHRoZSByZWZlcmVuY2UgXHJcbiAgICAgICAgICAgIC8vIGZpZWxkcy5cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHN0cmluZyB2YXJpYWJsZXMgY29udGFpbiB0aGUgc2FtZSBjaGFycywgdGhleSBhbHdheXMgcmVmZXIgdG8gdGhlIHNhbWUgXHJcbiAgICAgICAgICAgIC8vIHN0cmluZyBpbiB0aGUgaGVhcC4gU28gaWYgdGhlIHR5cGUgb2YgdGhlIG9iamVjdCBpcyBzdHJpbmcsIHdlIGFsc28gcmV0dXJuIHRoZSBcclxuICAgICAgICAgICAgLy8gb2JqZWN0LlxyXG4gICAgICAgICAgICBpZiAodHlwZS5Jc0VudW0gfHwgdHlwZSA9PSB0eXBlb2Yoc3RyaW5nKSB8fCB0eXBlID09IHR5cGVvZihpbnQpIHx8IHR5cGUgPT0gdHlwZW9mKGNoYXIpIHx8IHR5cGUgPT0gdHlwZW9mKGZsb2F0KSB8fCB0eXBlID09IHR5cGVvZihkb3VibGUpIHx8IHR5cGUgPT0gdHlwZW9mKEJvb2xlYW4pKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWcuUHJpbnQodHlwZSArIFwiIFwiICsgb2JqKyBcIiAtVlwiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgdHlwZSBvZiB0aGUgb2JqZWN0IGlzIHRoZSBBcnJheSwgd2UgdXNlIHRoZSBDcmVhdGVJbnN0YW5jZSBtZXRob2QgdG8gZ2V0XHJcbiAgICAgICAgICAgIC8vIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBhcnJheS4gV2UgYWxzbyBwcm9jZXNzIHJlY3Vyc2l2ZWx5IHRoaXMgbWV0aG9kIGluIHRoZSBcclxuICAgICAgICAgICAgLy8gZWxlbWVudHMgb2YgdGhlIG9yaWdpbmFsIGFycmF5IGJlY2F1c2UgdGhlIHR5cGUgb2YgdGhlIGVsZW1lbnQgbWF5IGJlIHRoZSByZWZlcmVuY2UgXHJcbiAgICAgICAgICAgIC8vIHR5cGUuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUuSXNBcnJheSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL3N0cmluZyB0eXBlTmFtZSA9IHR5cGUuRnVsbE5hbWUuUmVwbGFjZShcIltdXCIsIHN0cmluZy5FbXB0eSk7XHJcbiAgICAgICAgICAgICAgICAvL2RlYnVnLlByaW50KHR5cGVOYW1lKTtcclxuICAgICAgICAgICAgICAgIFR5cGUgdHlwZUVsZW1lbnQgPSB0eXBlLkdldEVsZW1lbnRUeXBlKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vZGVidWcuUHJpbnQodHlwZUVsZW1lbnQrXCJzc1wiKTtcclxuICAgICAgICAgICAgICAgIHZhciBhcnJheSA9IG9iaiBhcyBBcnJheTtcclxuICAgICAgICAgICAgICAgIGludCBsZW5ndGggPSBhcnJheS5MZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBBcnJheSBjb3BpZWRBcnJheSA9IEFycmF5LkNyZWF0ZUluc3RhbmNlKHR5cGVFbGVtZW50LCBsZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBhcnJheS5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGRlZXAgY2xvbmUgb2YgdGhlIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsIGFycmF5IGFuZCBhc3NpZ24gdGhlIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsb25lIHRvIHRoZSBuZXcgYXJyYXkuXHJcbiAgICAgICAgICAgICAgICAgICAgY29waWVkQXJyYXkuU2V0VmFsdWUoQ2xvbmVQcm9jZWR1cmUoYXJyYXkuR2V0VmFsdWUoaSkpLCBpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29waWVkQXJyYXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHR5cGUgb2YgdGhlIG9iamVjdCBpcyBjbGFzcyBvciBzdHJ1Y3QsIGl0IG1heSBjb250YWluIHRoZSByZWZlcmVuY2UgZmllbGRzLCBcclxuICAgICAgICAgICAgLy8gc28gd2UgdXNlIHJlZmxlY3Rpb24gYW5kIHByb2Nlc3MgcmVjdXJzaXZlbHkgdGhpcyBtZXRob2QgaW4gdGhlIGZpZWxkcyBvZiB0aGUgb2JqZWN0IFxyXG4gICAgICAgICAgICAvLyB0byBnZXQgdGhlIGRlZXAgY2xvbmUgb2YgdGhlIG9iamVjdC4gXHJcbiAgICAgICAgICAgIC8vIFdlIHVzZSBUeXBlLklzVmFsdWVUeXBlIG1ldGhvZCBoZXJlIGJlY2F1c2UgdGhlcmUgaXMgbm8gd2F5IHRvIGluZGljYXRlIGRpcmVjdGx5IHdoZXRoZXIgXHJcbiAgICAgICAgICAgIC8vIHRoZSBUeXBlIGlzIGEgc3RydWN0IHR5cGUuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUuSXNDbGFzc3x8dHlwZS5Jc1ZhbHVlVHlwZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0IGNvcGllZE9iamVjdCA9IEFjdGl2YXRvci5DcmVhdGVJbnN0YW5jZShvYmouR2V0VHlwZSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgYWxsIEZpZWxkSW5mby5cclxuICAgICAgICAgICAgICAgIEZpZWxkSW5mb1tdIGZpZWxkcyA9IHR5cGUuR2V0RmllbGRzKEJpbmRpbmdGbGFncy5QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuTm9uUHVibGljIHwgQmluZGluZ0ZsYWdzLkluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKEZpZWxkSW5mbyBmaWVsZCBpbiBmaWVsZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkZpZWxkOiBcIiArIGZpZWxkLk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCBmaWVsZFZhbHVlID0gZmllbGQuR2V0VmFsdWUob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRWYWx1ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KFwiRmllbGQ6IFwiICsgZmllbGQuTmFtZSArIFwiIGJlaW5nIHNldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBkZWVwIGNsb25lIG9mIHRoZSBmaWVsZCBpbiB0aGUgb3JpZ2luYWwgb2JqZWN0IGFuZCBhc3NpZ24gdGhlIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbG9uZSB0byB0aGUgZmllbGQgaW4gdGhlIG5ldyBvYmplY3QuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLlNldFZhbHVlKGNvcGllZE9iamVjdCwgQ2xvbmVQcm9jZWR1cmUoZmllbGRWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvcGllZE9iamVjdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihcIlRoZSBvYmplY3QgaXMgdW5rbm93biB0eXBlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBvYmplY3QgQ29weVByb2NlZHVyZVBhcnRpYWwoT2JqZWN0IGZyb20sIE9iamVjdCB0bylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChmcm9tID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBUeXBlIHR5cGUgPSBmcm9tLkdldFR5cGUoKTtcclxuXHJcbiAgICAgICAgICAgIGRlYnVnLlByaW50KFwiQ29weWluZyBcIit0eXBlKTtcclxuICAgICAgICAgICAgZGVidWcuSWRlbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB0eXBlIG9mIG9iamVjdCBpcyB0aGUgdmFsdWUgdHlwZSwgd2Ugd2lsbCBhbHdheXMgZ2V0IGEgbmV3IG9iamVjdCB3aGVuIFxyXG4gICAgICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0IGlzIGFzc2lnbmVkIHRvIGFub3RoZXIgdmFyaWFibGUuIFNvIGlmIHRoZSB0eXBlIG9mIHRoZSBcclxuICAgICAgICAgICAgLy8gb2JqZWN0IGlzIHByaW1pdGl2ZSBvciBlbnVtLCB3ZSBqdXN0IHJldHVybiB0aGUgb2JqZWN0LiBXZSB3aWxsIHByb2Nlc3MgdGhlIFxyXG4gICAgICAgICAgICAvLyBzdHJ1Y3QgdHlwZSBzdWJzZXF1ZW50bHkgYmVjYXVzZSB0aGUgc3RydWN0IHR5cGUgbWF5IGNvbnRhaW4gdGhlIHJlZmVyZW5jZSBcclxuICAgICAgICAgICAgLy8gZmllbGRzLlxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgc3RyaW5nIHZhcmlhYmxlcyBjb250YWluIHRoZSBzYW1lIGNoYXJzLCB0aGV5IGFsd2F5cyByZWZlciB0byB0aGUgc2FtZSBcclxuICAgICAgICAgICAgLy8gc3RyaW5nIGluIHRoZSBoZWFwLiBTbyBpZiB0aGUgdHlwZSBvZiB0aGUgb2JqZWN0IGlzIHN0cmluZywgd2UgYWxzbyByZXR1cm4gdGhlIFxyXG4gICAgICAgICAgICAvLyBvYmplY3QuXHJcbiAgICAgICAgICAgIGlmICh0eXBlLklzRW51bSB8fCB0eXBlID09IHR5cGVvZihzdHJpbmcpIHx8IHR5cGUgPT0gdHlwZW9mKGludCkgfHwgdHlwZSA9PSB0eXBlb2YoY2hhcikgfHwgdHlwZSA9PSB0eXBlb2YoZmxvYXQpIHx8IHR5cGUgPT0gdHlwZW9mKGRvdWJsZSkpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWcuUHJpbnQodHlwZSArIFwiIFwiK2Zyb20gKyBcIiAtVlwiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLkRlaWRlbnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmcm9tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGFycmF5cyBub3QgaW1wbGVtZW50ZWRcclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZS5Jc0FycmF5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5EZWlkZW50KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgdHlwZSBvZiB0aGUgb2JqZWN0IGlzIGNsYXNzIG9yIHN0cnVjdCwgaXQgbWF5IGNvbnRhaW4gdGhlIHJlZmVyZW5jZSBmaWVsZHMsIFxyXG4gICAgICAgICAgICAvLyBzbyB3ZSB1c2UgcmVmbGVjdGlvbiBhbmQgcHJvY2VzcyByZWN1cnNpdmVseSB0aGlzIG1ldGhvZCBpbiB0aGUgZmllbGRzIG9mIHRoZSBvYmplY3QgXHJcbiAgICAgICAgICAgIC8vIHRvIGdldCB0aGUgZGVlcCBjbG9uZSBvZiB0aGUgb2JqZWN0LiBcclxuICAgICAgICAgICAgLy8gV2UgdXNlIFR5cGUuSXNWYWx1ZVR5cGUgbWV0aG9kIGhlcmUgYmVjYXVzZSB0aGVyZSBpcyBubyB3YXkgdG8gaW5kaWNhdGUgZGlyZWN0bHkgd2hldGhlciBcclxuICAgICAgICAgICAgLy8gdGhlIFR5cGUgaXMgYSBzdHJ1Y3QgdHlwZS5cclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZS5Jc0NsYXNzIHx8IHR5cGUuSXNWYWx1ZVR5cGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdCBjb3BpZWRPYmplY3QgPSB0bztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgYWxsIEZpZWxkSW5mby5cclxuICAgICAgICAgICAgICAgIEZpZWxkSW5mb1tdIGZpZWxkcyA9IHR5cGUuR2V0RmllbGRzKEJpbmRpbmdGbGFncy5QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuTm9uUHVibGljIHwgQmluZGluZ0ZsYWdzLkluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKEZpZWxkSW5mbyBmaWVsZCBpbiBmaWVsZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkZpZWxkOiBcIiArIGZpZWxkLk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCBmaWVsZFZhbHVlID0gZmllbGQuR2V0VmFsdWUoZnJvbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkVmFsdWUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KFwiRmllbGQ6IFwiICsgZmllbGQuTmFtZSArIFwiIG5vdCBudWxsLCBiZWluZyBzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgZGVlcCBjbG9uZSBvZiB0aGUgZmllbGQgaW4gdGhlIG9yaWdpbmFsIG9iamVjdCBhbmQgYXNzaWduIHRoZSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvbmUgdG8gdGhlIGZpZWxkIGluIHRoZSBuZXcgb2JqZWN0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zy5JZGVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5TZXRWYWx1ZShjb3BpZWRPYmplY3QsIENsb25lUHJvY2VkdXJlKGZpZWxkVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcuRGVpZGVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5EZWlkZW50KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29waWVkT2JqZWN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVidWcuRGVpZGVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKFwiVGhlIG9iamVjdCBpcyB1bmtub3duIHR5cGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgRXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJhbmRvbSBybmcgPSBuZXcgUmFuZG9tKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaHVmZmxlPFQ+KHRoaXMgSUxpc3Q8VD4gbGlzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBuID0gbGlzdC5Db3VudDtcclxuICAgICAgICAgICAgd2hpbGUgKG4gPiAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuLS07XHJcbiAgICAgICAgICAgICAgICBpbnQgayA9IHJuZy5OZXh0KG4gKyAxKTtcclxuICAgICAgICAgICAgICAgIFQgdmFsdWUgPSBsaXN0W2tdO1xyXG4gICAgICAgICAgICAgICAgbGlzdFtrXSA9IGxpc3Rbbl07XHJcbiAgICAgICAgICAgICAgICBsaXN0W25dID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBSYW5kb21FbGVtZW50PFQ+KHRoaXMgSUxpc3Q8VD4gbGlzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gcm5nLk5leHQobGlzdC5Db3VudCk7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0W2VsZW1lbnRdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIjcmVnaW9uIExpY2Vuc2VcclxuLypcclxuTUlUIExpY2Vuc2VcclxuQ29weXJpZ2h0IMKpIDIwMDYgVGhlIE1vbm8uWG5hIFRlYW1cclxuXHJcbkFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cclxuI2VuZHJlZ2lvbiBMaWNlbnNlXHJcbnVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIHB1YmxpYyBzdHJ1Y3QgUG9pbnQyRCA6IElFcXVhdGFibGU8UG9pbnQyRD5cclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFBvaW50MkQgemVyb1BvaW50ID0gbmV3IFBvaW50MkQoKTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgWDtcclxuICAgICAgICBwdWJsaWMgaW50IFk7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUG9pbnQyRCBaZXJvXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gemVyb1BvaW50OyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBQb2ludDJEKGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgbWV0aG9kc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oUG9pbnQyRCBhLCBQb2ludDJEIGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYS5FcXVhbHMoYik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oUG9pbnQyRCBhLCBQb2ludDJEIGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIWEuRXF1YWxzKGIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFBvaW50MkQgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKChYID09IG90aGVyLlgpICYmIChZID09IG90aGVyLlkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEVxdWFscyhvYmplY3Qgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChvYmogaXMgUG9pbnQyRCkgPyBFcXVhbHMoKFBvaW50MkQpb2JqKSA6IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBHZXRIYXNoQ29kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gWCBeIFk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwie3tYOnswfSBZOnsxfX19XCIsIFgsIFkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBzdGF0aWMgcHVibGljIGNsYXNzIFJhbmRvbVN1cHBsaWVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBGdW5jPGZsb2F0PiBHZW5lcmF0ZXsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgUmFuZ2UoaW50IG1pbiwgaW50IG1heCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludCkgKEdlbmVyYXRlKCkgKiAobWF4LW1pbikrbWluKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBSYW5kb21FbGVtZW50PFQ+KFRbXSBhcnJheSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheVtSYW5nZSgwLCBhcnJheS5MZW5ndGgpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiI3JlZ2lvbiBMaWNlbnNlXHJcbi8qXHJcbk1JVCBMaWNlbnNlXHJcbkNvcHlyaWdodCDCqSAyMDA2IFRoZSBNb25vLlhuYSBUZWFtXHJcblxyXG5BbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXHJcbiNlbmRyZWdpb24gTGljZW5zZVxyXG5cclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uR2xvYmFsaXphdGlvbjtcclxudXNpbmcgU3lzdGVtLkNvbXBvbmVudE1vZGVsO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG5cclxuICAgIHB1YmxpYyBzdHJ1Y3QgUmVjdCA6IElFcXVhdGFibGU8UmVjdD5cclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJlY3QgZW1wdHlSZWN0YW5nbGUgPSBuZXcgUmVjdCgpO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgcHVibGljIGludCBYO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgWTtcclxuICAgICAgICBwdWJsaWMgaW50IFdpZHRoO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgSGVpZ2h0O1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBSZWN0IEVtcHR5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gZW1wdHlSZWN0YW5nbGU7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgTGVmdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHRoaXMuWDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBSaWdodFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuICh0aGlzLlggKyB0aGlzLldpZHRoKTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBUb3BcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB0aGlzLlk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgQm90dG9tXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKHRoaXMuWSArIHRoaXMuSGVpZ2h0KTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcbiAgICAgICAgcHVibGljIFJlY3QoaW50IHgsIGludCB5LCBpbnQgd2lkdGgsIGludCBoZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB4O1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB5O1xyXG4gICAgICAgICAgICB0aGlzLldpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFJlY3QgYSwgUmVjdCBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoYS5YID09IGIuWCkgJiYgKGEuWSA9PSBiLlkpICYmIChhLldpZHRoID09IGIuV2lkdGgpICYmIChhLkhlaWdodCA9PSBiLkhlaWdodCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ29udGFpbnMoaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKCh0aGlzLlggPD0geCkgJiYgKHggPCAodGhpcy5YICsgdGhpcy5XaWR0aCkpKSAmJiAodGhpcy5ZIDw9IHkpKSAmJiAoeSA8ICh0aGlzLlkgKyB0aGlzLkhlaWdodCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENvbnRhaW5zKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKCh0aGlzLlggPD0gdmFsdWUuWCkgJiYgKHZhbHVlLlggPCAodGhpcy5YICsgdGhpcy5XaWR0aCkpKSAmJiAodGhpcy5ZIDw9IHZhbHVlLlkpKSAmJiAodmFsdWUuWSA8ICh0aGlzLlkgKyB0aGlzLkhlaWdodCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENvbnRhaW5zKFBvaW50MkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKCgoKHRoaXMuWCA8PSB2YWx1ZS5YKSAmJiAodmFsdWUuWCA8ICh0aGlzLlggKyB0aGlzLldpZHRoKSkpICYmICh0aGlzLlkgPD0gdmFsdWUuWSkpICYmICh2YWx1ZS5ZIDwgKHRoaXMuWSArIHRoaXMuSGVpZ2h0KSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ29udGFpbnMoUmVjdCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKCgodGhpcy5YIDw9IHZhbHVlLlgpICYmICgodmFsdWUuWCArIHZhbHVlLldpZHRoKSA8PSAodGhpcy5YICsgdGhpcy5XaWR0aCkpKSAmJiAodGhpcy5ZIDw9IHZhbHVlLlkpKSAmJiAoKHZhbHVlLlkgKyB2YWx1ZS5IZWlnaHQpIDw9ICh0aGlzLlkgKyB0aGlzLkhlaWdodCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciAhPShSZWN0IGEsIFJlY3QgYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAhKGEgPT0gYik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBPZmZzZXQoUG9pbnQyRCBvZmZzZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYICs9IG9mZnNldC5YO1xyXG4gICAgICAgICAgICBZICs9IG9mZnNldC5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgT2Zmc2V0KGludCBvZmZzZXRYLCBpbnQgb2Zmc2V0WSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFggKz0gb2Zmc2V0WDtcclxuICAgICAgICAgICAgWSArPSBvZmZzZXRZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBvaW50MkQgQ2VudGVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQb2ludDJEKCh0aGlzLlggKyB0aGlzLldpZHRoKSAvIDIsICh0aGlzLlkgKyB0aGlzLkhlaWdodCkgLyAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5mbGF0ZShpbnQgaG9yaXpvbnRhbFZhbHVlLCBpbnQgdmVydGljYWxWYWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFggLT0gaG9yaXpvbnRhbFZhbHVlO1xyXG4gICAgICAgICAgICBZIC09IHZlcnRpY2FsVmFsdWU7XHJcbiAgICAgICAgICAgIFdpZHRoICs9IGhvcml6b250YWxWYWx1ZSAqIDI7XHJcbiAgICAgICAgICAgIEhlaWdodCArPSB2ZXJ0aWNhbFZhbHVlICogMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRW1wdHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCgoKHRoaXMuV2lkdGggPT0gMCkgJiYgKHRoaXMuSGVpZ2h0ID09IDApKSAmJiAodGhpcy5YID09IDApKSAmJiAodGhpcy5ZID09IDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFJlY3Qgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcyA9PSBvdGhlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEVxdWFscyhvYmplY3Qgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChvYmogaXMgUmVjdCkgPyB0aGlzID09ICgoUmVjdClvYmopIDogZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwie3tYOnswfSBZOnsxfSBXaWR0aDp7Mn0gSGVpZ2h0OnszfX19XCIsIFgsIFksIFdpZHRoLCBIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBHZXRIYXNoQ29kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuWCBeIHRoaXMuWSBeIHRoaXMuV2lkdGggXiB0aGlzLkhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJbnRlcnNlY3RzKFJlY3QgcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIShyMi5MZWZ0ID4gUmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgfHwgcjIuUmlnaHQgPCBMZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgIHx8IHIyLlRvcCA+IEJvdHRvbVxyXG4gICAgICAgICAgICAgICAgICAgICB8fCByMi5Cb3R0b20gPCBUb3BcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbnRlcnNlY3RzKHJlZiBSZWN0IHZhbHVlLCBvdXQgYm9vbCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQgPSAhKHZhbHVlLkxlZnQgPiBSaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICB8fCB2YWx1ZS5SaWdodCA8IExlZnRcclxuICAgICAgICAgICAgICAgICAgICAgfHwgdmFsdWUuVG9wID4gQm90dG9tXHJcbiAgICAgICAgICAgICAgICAgICAgIHx8IHZhbHVlLkJvdHRvbSA8IFRvcFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGltZVN0YW1wXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IEN1cnJlbnRTbmFwO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGltZVN0YW1wU25hcCBHZXRTbmFwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZVN0YW1wU25hcChDdXJyZW50U25hcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkdmFuY2UoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDdXJyZW50U25hcCArPSBkZWx0YTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0cnVjdCBUaW1lU3RhbXBTbmFwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IFRpbWVTbmFwO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGltZVN0YW1wU25hcChmbG9hdCBzbmFwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGltZVNuYXAgPSBzbmFwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgVW5pY29kZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgU3BhY2UgPSAzMjtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBrZXlEb3duID0gNDA7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBrZXlMZWZ0ID0gMzc7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBrZXlVcCA9IDM4O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQga2V5UmlnaHQgPSAzOTtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgVXBhcnJvdzIgPSAoY2hhcikyNDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBEb3duYXJyb3cyID0gKGNoYXIpMjU7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgUmlnaHRhcnJvdzIgPSAoY2hhcikyNjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBMZWZ0YXJyb3cyID0gKGNoYXIpMjc7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgVXBhcnJvdyA9IChjaGFyKTMwO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIERvd25hcnJvdyA9IChjaGFyKTMxO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIExlZnRhcnJvdyA9IChjaGFyKTE3O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIFJpZ2h0YXJyb3cgPSAoY2hhcikxNjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBBc2NpaUdyaWRIb3IgPSAoY2hhcikxOTY7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgQXNjaWlHcmlkVmVyID0gKGNoYXIpMTc5O1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNoYXJbXSBncmlkcyA9IG5ldyBjaGFyW10ge1xyXG4gICAgICAgICAgICBBc2NpaUdyaWRIb3IsXHJcbiAgICAgICAgICAgIEFzY2lpR3JpZFZlclxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjaGFyIEFzY2lpR3JpZFVwTGVmdCA9IChjaGFyKTIxNztcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNoYXIgQXNjaWlHcmlkVXBSaWdodCA9IChjaGFyKSAxOTI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjaGFyIEFzY2lpR3JpZFVwUmlnaHRMZWZ0ID0gKGNoYXIpMTkzO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY2hhciBBc2NpaUdyaWREb3duTGVmdCA9IChjaGFyKTE5MTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNoYXIgQXNjaWlHcmlkRG93blJpZ2h0ID0gKGNoYXIpMjE4O1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY2hhciBBc2NpaUdyaWREb3duUmlnaHRMZWZ0ID0gKGNoYXIpMTk0O1xyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbi8vdXNpbmcgU3lzdGVtLkRyYXdpbmc7XHJcbnVzaW5nIFN5c3RlbS5HbG9iYWxpemF0aW9uO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgW1NlcmlhbGl6YWJsZV1cclxuICAgIHB1YmxpYyBzdHJ1Y3QgVmVjdG9yMkQgOiBJRXF1YXRhYmxlPFZlY3RvcjJEPlxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgemVyb1ZlY3RvciA9IG5ldyBWZWN0b3IyRCgwZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHVuaXRWZWN0b3IgPSBuZXcgVmVjdG9yMkQoMWYsIDFmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB1bml0WFZlY3RvciA9IG5ldyBWZWN0b3IyRCgxZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHVuaXRZVmVjdG9yID0gbmV3IFZlY3RvcjJEKDBmLCAxZik7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgWDtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgWTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgICMgcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgWEludCB7IGdldCB7IHJldHVybiAoaW50KVg7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgWUludCB7IGdldCB7IHJldHVybiAoaW50KVk7IH0gfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RhbnRzXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgWmVyb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHplcm9WZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgT25lXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBVbml0WFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRYVmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFVuaXRZXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFlWZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJvcGVydGllc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEKGZsb2F0IHgsIGZsb2F0IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB4O1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEKGZsb2F0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBJbnRlcnBvbGF0ZVJvdW5kZWQoVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgVmVjdG9yMkQgZW5kUG9zaXRpb24sIGZsb2F0IHJhdGlvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChzdGFydFBvc2l0aW9uICogKDEgLSByYXRpbykgKyBlbmRQb3NpdGlvbiAqIHJhdGlvKS5Sb3VuZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBWZWN0b3IyRCBSb3VuZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKChmbG9hdClNYXRoLlJvdW5kKFgpLCAoZmxvYXQpTWF0aC5Sb3VuZChZKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIEFkZChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBZGQocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSArIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2UoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLlNxcnQoKHYxICogdjEpICsgKHYyICogdjIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXN0YW5jZShyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IChmbG9hdClNYXRoLlNxcnQoKHYxICogdjEpICsgKHYyICogdjIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2VTcXVhcmVkKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiAodjEgKiB2MSkgKyAodjIgKiB2Mik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2VTcXVhcmVkKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHYxICogdjEpICsgKHYyICogdjIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0KGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFggPSB4O1xyXG4gICAgICAgICAgICBZID0geTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIERpdmlkZShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAvIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBEaXZpZGUoVmVjdG9yMkQgdmFsdWUxLCBmbG9hdCBkaXZpZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMSAvIGRpdmlkZXI7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpdmlkZShyZWYgVmVjdG9yMkQgdmFsdWUxLCBmbG9hdCBkaXZpZGVyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMSAvIGRpdmlkZXI7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiBmYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERvdChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUxLlggKiB2YWx1ZTIuWCkgKyAodmFsdWUxLlkgKiB2YWx1ZTIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRG90KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQgPSAodmFsdWUxLlggKiB2YWx1ZTIuWCkgKyAodmFsdWUxLlkgKiB2YWx1ZTIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBFcXVhbHMob2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChvYmogaXMgVmVjdG9yMkQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBFcXVhbHMoKFZlY3RvcjJEKXRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBFcXVhbHMoVmVjdG9yMkQgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKFggPT0gb3RoZXIuWCkgJiYgKFkgPT0gb3RoZXIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFJlZmxlY3QoVmVjdG9yMkQgdmVjdG9yLCBWZWN0b3IyRCBub3JtYWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWZWN0b3IyRCByZXN1bHQ7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDIuMGYgKiAoKHZlY3Rvci5YICogbm9ybWFsLlgpICsgKHZlY3Rvci5ZICogbm9ybWFsLlkpKTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2ZWN0b3IuWCAtIChub3JtYWwuWCAqIHZhbCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmVjdG9yLlkgLSAobm9ybWFsLlkgKiB2YWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFJlZmxlY3QocmVmIFZlY3RvcjJEIHZlY3RvciwgcmVmIFZlY3RvcjJEIG5vcm1hbCwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDIuMGYgKiAoKHZlY3Rvci5YICogbm9ybWFsLlgpICsgKHZlY3Rvci5ZICogbm9ybWFsLlkpKTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2ZWN0b3IuWCAtIChub3JtYWwuWCAqIHZhbCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmVjdG9yLlkgLSAobm9ybWFsLlkgKiB2YWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBHZXRIYXNoQ29kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gWC5HZXRIYXNoQ29kZSgpICsgWS5HZXRIYXNoQ29kZSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGgoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLlNxcnQoKFggKiBYKSArIChZICogWSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IExlbmd0aFNxdWFyZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChYICogWCkgKyAoWSAqIFkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE1heChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQodmFsdWUxLlggPiB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTEuWSA+IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWF4KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YID4gdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZID4gdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNaW4oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHZhbHVlMS5YIDwgdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUxLlkgPCB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1pbihyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCA8IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSA8IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTXVsdGlwbHkoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE11bHRpcGx5KFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgc2NhbGVGYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgc2NhbGVGYWN0b3IsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNdWx0aXBseShyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE5lZ2F0ZShWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggPSAtdmFsdWUuWDtcclxuICAgICAgICAgICAgdmFsdWUuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTmVnYXRlKHJlZiBWZWN0b3IyRCB2YWx1ZSwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBOb3JtYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gMS4wZiAvIChmbG9hdClNYXRoLlNxcnQoKFggKiBYKSArIChZICogWSkpO1xyXG4gICAgICAgICAgICBYICo9IHZhbDtcclxuICAgICAgICAgICAgWSAqPSB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE5vcm1hbGl6ZShWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KCh2YWx1ZS5YICogdmFsdWUuWCkgKyAodmFsdWUuWSAqIHZhbHVlLlkpKTtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSB2YWw7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gdmFsO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTm9ybWFsaXplKHJlZiBWZWN0b3IyRCB2YWx1ZSwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KCh2YWx1ZS5YICogdmFsdWUuWCkgKyAodmFsdWUuWSAqIHZhbHVlLlkpKTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZS5YICogdmFsO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlLlkgKiB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgU3VidHJhY3QoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU3VidHJhY3QocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDdWx0dXJlSW5mbyBjdXJyZW50Q3VsdHVyZSA9IEN1bHR1cmVJbmZvLkN1cnJlbnRDdWx0dXJlO1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChjdXJyZW50Q3VsdHVyZSwgXCJ7e1g6ezB9IFk6ezF9fX1cIiwgbmV3IG9iamVjdFtdIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuWC5Ub1N0cmluZyhjdXJyZW50Q3VsdHVyZSksIHRoaXMuWS5Ub1N0cmluZyhjdXJyZW50Q3VsdHVyZSkgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIE9wZXJhdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC0oVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgPSAtdmFsdWUuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTEuWCA9PSB2YWx1ZTIuWCAmJiB2YWx1ZTEuWSA9PSB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxLlggIT0gdmFsdWUyLlggfHwgdmFsdWUxLlkgIT0gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciArKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICs9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgLShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC09IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAtPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yICooVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKFZlY3RvcjJEIHZhbHVlLCBmbG9hdCBzY2FsZUZhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yICooZmxvYXQgc2NhbGVGYWN0b3IsIFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgLyhWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC8oVmVjdG9yMkQgdmFsdWUxLCBmbG9hdCBkaXZpZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMSAvIGRpdmlkZXI7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBPcGVyYXRvcnNcclxuICAgIH1cclxufSIsIi8vIE1JVCBMaWNlbnNlIC0gQ29weXJpZ2h0IChDKSBUaGUgTW9uby5YbmEgVGVhbVxyXG4vLyBUaGlzIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgZGVmaW5lZCBpblxyXG4vLyBmaWxlICdMSUNFTlNFLnR4dCcsIHdoaWNoIGlzIHBhcnQgb2YgdGhpcyBzb3VyY2UgY29kZSBwYWNrYWdlLlxyXG5cclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uRGlhZ25vc3RpY3M7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uUnVudGltZS5TZXJpYWxpemF0aW9uO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG5cclxuICAgIFxyXG4gICAgcHVibGljIHN0cnVjdCBWZWN0b3IzRCA6IElFcXVhdGFibGU8VmVjdG9yM0Q+XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCB6ZXJvID0gbmV3IFZlY3RvcjNEKDBmLCAwZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIG9uZSA9IG5ldyBWZWN0b3IzRCgxZiwgMWYsIDFmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCB1bml0WCA9IG5ldyBWZWN0b3IzRCgxZiwgMGYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCB1bml0WSA9IG5ldyBWZWN0b3IzRCgwZiwgMWYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCB1bml0WiA9IG5ldyBWZWN0b3IzRCgwZiwgMGYsIDFmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCB1cCA9IG5ldyBWZWN0b3IzRCgwZiwgMWYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCBkb3duID0gbmV3IFZlY3RvcjNEKDBmLCAtMWYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCByaWdodCA9IG5ldyBWZWN0b3IzRCgxZiwgMGYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCBsZWZ0ID0gbmV3IFZlY3RvcjNEKC0xZiwgMGYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCBmb3J3YXJkID0gbmV3IFZlY3RvcjNEKDBmLCAwZiwgLTFmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCBiYWNrd2FyZCA9IG5ldyBWZWN0b3IzRCgwZiwgMGYsIDFmKTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBYO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgZmxvYXQgWTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGZsb2F0IFo7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmV0dXJucyBhIDxzZWU+VmVjdG9yMzwvc2VlPiB3aXRoIGNvbXBvbmVudHMgMCwgMCwgMC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgWmVyb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHplcm87IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmV0dXJucyBhIDxzZWU+VmVjdG9yMzwvc2VlPiB3aXRoIGNvbXBvbmVudHMgMSwgMSwgMS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgT25lXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gb25lOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDEsIDAsIDAuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFVuaXRYXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFg7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmV0dXJucyBhIDxzZWU+VmVjdG9yMzwvc2VlPiB3aXRoIGNvbXBvbmVudHMgMCwgMSwgMC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgVW5pdFlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHdpdGggY29tcG9uZW50cyAwLCAwLCAxLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBVbml0WlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRaOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFVwXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdXA7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgRG93blxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGRvd247IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgUmlnaHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiByaWdodDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBMZWZ0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gbGVmdDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBGb3J3YXJkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gZm9yd2FyZDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBCYWNrd2FyZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGJhY2t3YXJkOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IzRChmbG9hdCB4LCBmbG9hdCB5LCBmbG9hdCB6KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0geDtcclxuICAgICAgICAgICAgdGhpcy5ZID0geTtcclxuICAgICAgICAgICAgdGhpcy5aID0gejtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yM0QoZmxvYXQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5ZID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuWiA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IzRChWZWN0b3IyRCB2YWx1ZSwgZmxvYXQgeilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHZhbHVlLlg7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHZhbHVlLlk7XHJcbiAgICAgICAgICAgIHRoaXMuWiA9IHo7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBQZXJmb3JtcyB2ZWN0b3IgYWRkaXRpb24gb24gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTFcIi8+IGFuZCA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMlwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgcmVzdWx0IG9mIHRoZSB2ZWN0b3IgYWRkaXRpb24uPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgQWRkKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICs9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiArPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIGFkZGl0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmRcclxuICAgICAgICAvLy8gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LCBzdG9yaW5nIHRoZSByZXN1bHQgb2YgdGhlXHJcbiAgICAgICAgLy8vIGFkZGl0aW9uIGluIDxwYXJhbXJlZiBuYW1lPVwicmVzdWx0XCIvPi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IgdG8gYWRkLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IgdG8gYWRkLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIGFkZGl0aW9uLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEFkZChyZWYgVmVjdG9yM0QgdmFsdWUxLCByZWYgVmVjdG9yM0QgdmFsdWUyLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCArIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICsgdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmFsdWUxLlogKyB2YWx1ZTIuWjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIENyb3NzKFZlY3RvcjNEIHZlY3RvcjEsIFZlY3RvcjNEIHZlY3RvcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDcm9zcyhyZWYgdmVjdG9yMSwgcmVmIHZlY3RvcjIsIG91dCB2ZWN0b3IxKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZlY3RvcjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQ3Jvc3MocmVmIFZlY3RvcjNEIHZlY3RvcjEsIHJlZiBWZWN0b3IzRCB2ZWN0b3IyLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHggPSB2ZWN0b3IxLlkgKiB2ZWN0b3IyLlogLSB2ZWN0b3IyLlkgKiB2ZWN0b3IxLlo7XHJcbiAgICAgICAgICAgIHZhciB5ID0gLSh2ZWN0b3IxLlggKiB2ZWN0b3IyLlogLSB2ZWN0b3IyLlggKiB2ZWN0b3IxLlopO1xyXG4gICAgICAgICAgICB2YXIgeiA9IHZlY3RvcjEuWCAqIHZlY3RvcjIuWSAtIHZlY3RvcjIuWCAqIHZlY3RvcjEuWTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB4O1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gejtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2UoVmVjdG9yM0QgdmVjdG9yMSwgVmVjdG9yM0QgdmVjdG9yMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHJlc3VsdDtcclxuICAgICAgICAgICAgRGlzdGFuY2VTcXVhcmVkKHJlZiB2ZWN0b3IxLCByZWYgdmVjdG9yMiwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2UocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERpc3RhbmNlU3F1YXJlZChyZWYgdmFsdWUxLCByZWYgdmFsdWUyLCBvdXQgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKGZsb2F0KU1hdGguU3FydChyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEaXN0YW5jZVNxdWFyZWQoVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCByZXN1bHQ7XHJcbiAgICAgICAgICAgIERpc3RhbmNlU3F1YXJlZChyZWYgdmFsdWUxLCByZWYgdmFsdWUyLCBvdXQgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXN0YW5jZVNxdWFyZWQocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICh2YWx1ZTEuWCAtIHZhbHVlMi5YKSAqICh2YWx1ZTEuWCAtIHZhbHVlMi5YKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICh2YWx1ZTEuWSAtIHZhbHVlMi5ZKSAqICh2YWx1ZTEuWSAtIHZhbHVlMi5ZKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICh2YWx1ZTEuWiAtIHZhbHVlMi5aKSAqICh2YWx1ZTEuWiAtIHZhbHVlMi5aKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgRGl2aWRlKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC89IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAvPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgRGl2aWRlKFZlY3RvcjNEIHZhbHVlMSwgZmxvYXQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMSAvIHZhbHVlMjtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjNEIHZhbHVlMSwgZmxvYXQgZGl2aXNvciwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpc29yO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aICogZmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpdmlkZShyZWYgVmVjdG9yM0QgdmFsdWUxLCByZWYgVmVjdG9yM0QgdmFsdWUyLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAvIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZIC8gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmFsdWUxLlogLyB2YWx1ZTIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRG90KFZlY3RvcjNEIHZlY3RvcjEsIFZlY3RvcjNEIHZlY3RvcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmVjdG9yMS5YICogdmVjdG9yMi5YICsgdmVjdG9yMS5ZICogdmVjdG9yMi5ZICsgdmVjdG9yMS5aICogdmVjdG9yMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERvdChyZWYgVmVjdG9yM0QgdmVjdG9yMSwgcmVmIFZlY3RvcjNEIHZlY3RvcjIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB2ZWN0b3IxLlggKiB2ZWN0b3IyLlggKyB2ZWN0b3IxLlkgKiB2ZWN0b3IyLlkgKyB2ZWN0b3IxLlogKiB2ZWN0b3IyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBFcXVhbHMob2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghKG9iaiBpcyBWZWN0b3IzRCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB2YXIgb3RoZXIgPSAoVmVjdG9yM0Qpb2JqO1xyXG4gICAgICAgICAgICByZXR1cm4gWCA9PSBvdGhlci5YICYmXHJcbiAgICAgICAgICAgICAgICAgICAgWSA9PSBvdGhlci5ZICYmXHJcbiAgICAgICAgICAgICAgICAgICAgWiA9PSBvdGhlci5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFZlY3RvcjNEIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFggPT0gb3RoZXIuWCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFkgPT0gb3RoZXIuWSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFogPT0gb3RoZXIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpKHRoaXMuWCArIHRoaXMuWSArIHRoaXMuWik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IExlbmd0aCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCByZXN1bHQ7XHJcbiAgICAgICAgICAgIERpc3RhbmNlU3F1YXJlZChyZWYgdGhpcywgcmVmIHplcm8sIG91dCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguU3FydChyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IExlbmd0aFNxdWFyZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHRoaXMsIHJlZiB6ZXJvLCBvdXQgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTXVsdGlwbHkoVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICo9IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBNdWx0aXBseShWZWN0b3IzRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNdWx0aXBseShyZWYgVmVjdG9yM0QgdmFsdWUxLCBmbG9hdCBzY2FsZUZhY3Rvciwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aICogdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gcG9pbnRpbmcgaW4gdGhlIG9wcG9zaXRlXHJcbiAgICAgICAgLy8vIGRpcmVjdGlvbiBvZiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlXCIvPi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIHZlY3RvciB0byBuZWdhdGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHZlY3RvciBuZWdhdGlvbiBvZiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlXCIvPi48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBOZWdhdGUoVmVjdG9yM0QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBWZWN0b3IzRCgtdmFsdWUuWCwgLXZhbHVlLlksIC12YWx1ZS5aKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBTdG9yZXMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gcG9pbnRpbmcgaW4gdGhlIG9wcG9zaXRlXHJcbiAgICAgICAgLy8vIGRpcmVjdGlvbiBvZiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlXCIvPiBpbiA8cGFyYW1yZWYgbmFtZT1cInJlc3VsdFwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2ZWN0b3IgdG8gbmVnYXRlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+VGhlIHZlY3RvciB0aGF0IHRoZSBuZWdhdGlvbiBvZiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlXCIvPiB3aWxsIGJlIHN0b3JlZCBpbi48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBOZWdhdGUocmVmIFZlY3RvcjNEIHZhbHVlLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSAtdmFsdWUuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSAtdmFsdWUuWTtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSAtdmFsdWUuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE5vcm1hbGl6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOb3JtYWxpemUocmVmIHRoaXMsIG91dCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTm9ybWFsaXplKFZlY3RvcjNEIHZlY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5vcm1hbGl6ZShyZWYgdmVjdG9yLCBvdXQgdmVjdG9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZlY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBOb3JtYWxpemUocmVmIFZlY3RvcjNEIHZhbHVlLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yO1xyXG4gICAgICAgICAgICBEaXN0YW5jZShyZWYgdmFsdWUsIHJlZiB6ZXJvLCBvdXQgZmFjdG9yKTtcclxuICAgICAgICAgICAgZmFjdG9yID0gMWYgLyBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUuWCAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZS5ZICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlLlogKiBmYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFJlZmxlY3QoVmVjdG9yM0QgdmVjdG9yLCBWZWN0b3IzRCBub3JtYWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBJIGlzIHRoZSBvcmlnaW5hbCBhcnJheVxyXG4gICAgICAgICAgICAvLyBOIGlzIHRoZSBub3JtYWwgb2YgdGhlIGluY2lkZW50IHBsYW5lXHJcbiAgICAgICAgICAgIC8vIFIgPSBJIC0gKDIgKiBOICogKCBEb3RQcm9kdWN0WyBJLE5dICkpXHJcbiAgICAgICAgICAgIFZlY3RvcjNEIHJlZmxlY3RlZFZlY3RvcjtcclxuICAgICAgICAgICAgLy8gaW5saW5lIHRoZSBkb3RQcm9kdWN0IGhlcmUgaW5zdGVhZCBvZiBjYWxsaW5nIG1ldGhvZFxyXG4gICAgICAgICAgICBmbG9hdCBkb3RQcm9kdWN0ID0gKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSkgKyAodmVjdG9yLlogKiBub3JtYWwuWik7XHJcbiAgICAgICAgICAgIHJlZmxlY3RlZFZlY3Rvci5YID0gdmVjdG9yLlggLSAoMi4wZiAqIG5vcm1hbC5YKSAqIGRvdFByb2R1Y3Q7XHJcbiAgICAgICAgICAgIHJlZmxlY3RlZFZlY3Rvci5ZID0gdmVjdG9yLlkgLSAoMi4wZiAqIG5vcm1hbC5ZKSAqIGRvdFByb2R1Y3Q7XHJcbiAgICAgICAgICAgIHJlZmxlY3RlZFZlY3Rvci5aID0gdmVjdG9yLlogLSAoMi4wZiAqIG5vcm1hbC5aKSAqIGRvdFByb2R1Y3Q7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVmbGVjdGVkVmVjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFJlZmxlY3QocmVmIFZlY3RvcjNEIHZlY3RvciwgcmVmIFZlY3RvcjNEIG5vcm1hbCwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIEkgaXMgdGhlIG9yaWdpbmFsIGFycmF5XHJcbiAgICAgICAgICAgIC8vIE4gaXMgdGhlIG5vcm1hbCBvZiB0aGUgaW5jaWRlbnQgcGxhbmVcclxuICAgICAgICAgICAgLy8gUiA9IEkgLSAoMiAqIE4gKiAoIERvdFByb2R1Y3RbIEksTl0gKSlcclxuXHJcbiAgICAgICAgICAgIC8vIGlubGluZSB0aGUgZG90UHJvZHVjdCBoZXJlIGluc3RlYWQgb2YgY2FsbGluZyBtZXRob2RcclxuICAgICAgICAgICAgZmxvYXQgZG90UHJvZHVjdCA9ICgodmVjdG9yLlggKiBub3JtYWwuWCkgKyAodmVjdG9yLlkgKiBub3JtYWwuWSkpICsgKHZlY3Rvci5aICogbm9ybWFsLlopO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZlY3Rvci5YIC0gKDIuMGYgKiBub3JtYWwuWCkgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKDIuMGYgKiBub3JtYWwuWSkgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZlY3Rvci5aIC0gKDIuMGYgKiBub3JtYWwuWikgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBQZXJmb3JtcyB2ZWN0b3Igc3VidHJhY3Rpb24gb24gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTFcIi8+IGFuZCA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMlwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgdmVjdG9yIHRvIGJlIHN1YnRyYWN0ZWQgZnJvbS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSB2ZWN0b3IgdG8gYmUgc3VidHJhY3RlZCBmcm9tIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPi48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgcmVzdWx0IG9mIHRoZSB2ZWN0b3Igc3VidHJhY3Rpb24uPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgU3VidHJhY3QoVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aIC09IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBQZXJmb3JtcyB2ZWN0b3Igc3VidHJhY3Rpb24gb24gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTFcIi8+IGFuZCA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMlwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgdmVjdG9yIHRvIGJlIHN1YnRyYWN0ZWQgZnJvbS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSB2ZWN0b3IgdG8gYmUgc3VidHJhY3RlZCBmcm9tIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPi48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSByZXN1bHQgb2YgdGhlIHZlY3RvciBzdWJ0cmFjdGlvbi48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTdWJ0cmFjdChyZWYgVmVjdG9yM0QgdmFsdWUxLCByZWYgVmVjdG9yM0QgdmFsdWUyLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAtIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmFsdWUxLlogLSB2YWx1ZTIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHN0cmluZyBEZWJ1Z0Rpc3BsYXlTdHJpbmdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkNvbmNhdChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlguVG9TdHJpbmcoKSwgXCIgIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWS5Ub1N0cmluZygpLCBcIiAgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5aLlRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IG5ldyBTdHJpbmdCdWlsZGVyKDMyKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKFwie1g6XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmQodGhpcy5YKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKFwiIFk6XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmQodGhpcy5ZKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKFwiIFo6XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmQodGhpcy5aKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKFwifVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNiLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLy8vIFRyYW5zZm9ybXMgYSB2ZWN0b3IgYnkgYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLlxyXG4gICAgICAgIC8vLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8vLyA8cGFyYW0gbmFtZT1cInZlY1wiPlRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vLy8gPHBhcmFtIG5hbWU9XCJxdWF0XCI+VGhlIHF1YXRlcm5pb24gdG8gcm90YXRlIHRoZSB2ZWN0b3IgYnkuPC9wYXJhbT5cclxuICAgICAgICAvLy8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSByZXN1bHQgb2YgdGhlIG9wZXJhdGlvbi48L3BhcmFtPlxyXG4gICAgICAgIC8vICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgVHJhbnNmb3JtKHJlZiBWZWN0b3IzIHZlYywgcmVmIFF1YXRlcm5pb24gcXVhdCwgb3V0IFZlY3RvcjMgcmVzdWx0KVxyXG4gICAgICAgIC8vICAgICAgICB7XHJcbiAgICAgICAgLy9cdFx0Ly8gVGFrZW4gZnJvbSB0aGUgT3BlbnRUSyBpbXBsZW1lbnRhdGlvbiBvZiBWZWN0b3IzXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBTaW5jZSB2ZWMuVyA9PSAwLCB3ZSBjYW4gb3B0aW1pemUgcXVhdCAqIHZlYyAqIHF1YXReLTEgYXMgZm9sbG93czpcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vIHZlYyArIDIuMCAqIGNyb3NzKHF1YXQueHl6LCBjcm9zcyhxdWF0Lnh5eiwgdmVjKSArIHF1YXQudyAqIHZlYylcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMgeHl6ID0gcXVhdC5YeXosIHRlbXAsIHRlbXAyO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMy5Dcm9zcyhyZWYgeHl6LCByZWYgdmVjLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLk11bHRpcGx5KHJlZiB2ZWMsIHF1YXQuVywgb3V0IHRlbXAyKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMuQWRkKHJlZiB0ZW1wLCByZWYgdGVtcDIsIG91dCB0ZW1wKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMuQ3Jvc3MocmVmIHh5eiwgcmVmIHRlbXAsIG91dCB0ZW1wKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMuTXVsdGlwbHkocmVmIHRlbXAsIDIsIG91dCB0ZW1wKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMuQWRkKHJlZiB2ZWMsIHJlZiB0ZW1wLCBvdXQgcmVzdWx0KTtcclxuICAgICAgICAvLyAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBtZXRob2RzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIE9wZXJhdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxLlggPT0gdmFsdWUyLlhcclxuICAgICAgICAgICAgICAgICYmIHZhbHVlMS5ZID09IHZhbHVlMi5ZXHJcbiAgICAgICAgICAgICAgICAmJiB2YWx1ZTEuWiA9PSB2YWx1ZTIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciAhPShWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAhKHZhbHVlMSA9PSB2YWx1ZTIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciArKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICs9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiArPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgLShWZWN0b3IzRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gbmV3IFZlY3RvcjNEKC12YWx1ZS5YLCAtdmFsdWUuWSwgLXZhbHVlLlopO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yIC0oVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aIC09IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAqKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgKihWZWN0b3IzRCB2YWx1ZSwgZmxvYXQgc2NhbGVGYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5aICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yICooZmxvYXQgc2NhbGVGYWN0b3IsIFZlY3RvcjNEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWiAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAvKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC89IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAvPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgLyhWZWN0b3IzRCB2YWx1ZSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlogKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBNb3ZlRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHN0cmluZyBsYWJlbDtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PFRpY2s+IHVuaXRzID0gbmV3IExpc3Q8VGljaz4oKTtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PGludD4gdGFncyA9IG5ldyBMaXN0PGludD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVEYXRhKHN0cmluZyBsYWJlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlRGF0YSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgRmluZEJ5TGFiZWwoTGlzdDxNb3ZlRGF0YT4gbW92ZURhdGFzLCBzdHJpbmcgbGFiZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IG1vdmVEYXRhcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihtb3ZlRGF0YXNbaV0hPW51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vdmVEYXRhc1tpXS5sYWJlbCA9PSBsYWJlbCkgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBIYXNUYWcoaW50IHRhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YWdzLkNvbnRhaW5zKHRhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUaWNrIFxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIENvbmRpdGlvbiBjb25kaXRpb247XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxvYmplY3Q+IHRoaW5nc1RvSGFwcGVuID0gbmV3IExpc3Q8b2JqZWN0PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGljayhvYmplY3QgYWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpbmdzVG9IYXBwZW4uQWRkKGFjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGljayhvYmplY3RbXSBhY3Rpb25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpbmdzVG9IYXBwZW4uQWRkUmFuZ2UoYWN0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBDb25kaXRpb25cclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCByZWFkb25seSBDb25kaXRpb25UeXBlIHR5cGU7XHJcbiAgICAgICAgaW50ZXJuYWwgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldDtcclxuICAgICAgICBpbnRlcm5hbCByZWFkb25seSBCYXNlVXRpbHMuVmVjdG9yMkQgdmVjdG9yO1xyXG5cclxuICAgICAgICBwdWJsaWMgQ29uZGl0aW9uKENvbmRpdGlvblR5cGUgdHlwZSwgVGFyZ2V0IHRhcmdldCwgQmFzZVV0aWxzLlZlY3RvcjJEIHZlY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLnZlY3RvciA9IHZlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gQ29uZGl0aW9uVHlwZVxyXG4gICAge1xyXG4gICAgICAgIENhbk1vdmVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU3VtbW9uRW50aXR5XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBlbmVteVdoaWNoO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBWZWN0b3IyRCBwcmVmZXJlbnRpYWxSb3dDb2x1bW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdW1tb25FbnRpdHkoaW50IGVuZW15V2hpY2gsIFZlY3RvcjJEIHByZWZlcmVudGlhbFJvd0NvbHVtbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlXaGljaCA9IGVuZW15V2hpY2g7XHJcbiAgICAgICAgICAgIHRoaXMucHJlZmVyZW50aWFsUm93Q29sdW1uID0gcHJlZmVyZW50aWFsUm93Q29sdW1uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RhdGljIFN1bW1vbkVudGl0eSBFbmVteShpbnQgdiwgVmVjdG9yMkQgdmVjdG9yMkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFN1bW1vbkVudGl0eSh2LCB2ZWN0b3IyRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQW5pbWF0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEFyZWEgYXJlYSA9IG51bGw7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldCA9IFRhcmdldC5Ob25lO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgQW5pbWF0aW9uKFRhcmdldCB0YXJnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcHVibGljIEFuaW1hdGlvbihBcmVhIGFyZWEpXHJcbiAgICAgICAgLy97XHJcbiAgICAgICAgLy8gICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgcHVibGljIEFuaW1hdGlvbihUYXJnZXQgdGFyZ2V0LCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbmltYXRpb24oQXJlYSBhcmVhLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmUsIFRhcmdldCB0YXJnZXQgPSBUYXJnZXQuTm9uZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZUFjdGlvblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBUYXJnZXQgdGFyZ2V0O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXNlVXRpbHMuVmVjdG9yMkQgZGlzdGFuY2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlQWN0aW9uKFRhcmdldCB0YXJnZXQsIEJhc2VVdGlscy5WZWN0b3IyRCBhbW91bnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9IGFtb3VudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERlYWxEYW1hZ2VBY3Rpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldCA9IFRhcmdldC5Ob25lO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBBcmVhIGFyZWE7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBkYW1hZ2U7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudDtcclxuXHJcbiAgICAgICAgcHVibGljIERlYWxEYW1hZ2VBY3Rpb24oQXJlYSBhcmVhLCBpbnQgZGFtYWdlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSBhcmVhO1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gVGFyZ2V0LkFyZWE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQgdGFyZ2V0LCBpbnQgZGFtYWdlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBcmVhXHJcbiAgICB7XHJcbiAgICAgICAgLy9wdWJsaWMgcmVhZG9ubHkgQXJlYSBhcmVhO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBUYXJnZXQgdGFyZ2V0O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBMaXN0PFZlY3RvcjJEPiBwb2ludHMgPSBuZXcgTGlzdDxWZWN0b3IyRD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIEFyZWEoVGFyZ2V0IHRhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBUYXJnZXRcclxuICAgIHtcclxuICAgICAgICBOb25lLCAgU2VsZiwgQ2xvc2VzdFRhcmdldCwgQ2xvc2VzdFRhcmdldFgsIEFyZWEgICBcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBc3luY1Rhc2tzXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBc3luY1RyYWNrXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBEZWxheWVkQWN0aW9uc1xyXG4gICAge1xyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IHRpbWVzID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxJTGlzdD4gbGlzdHMgPSBuZXcgTGlzdDxJTGlzdD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0aW1lcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lc1tpXSAtPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGlmICh0aW1lc1tpXSA8PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEV4ZWN1dGUoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5kVGFzayhpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKGludCBpKTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGQoZmxvYXQgdGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpbWVzLkFkZCh0aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZXMuQ291bnQgPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRW5kVGFzayhpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpbWVzLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbCBpbiBsaXN0cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbC5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQXN5bmNUYXNrU2V0dGVyPFQ+IDogRGVsYXllZEFjdGlvbnNcclxuICAgIHtcclxuICAgICAgICBMaXN0PFQ+IFRvVmFsdWUgPSBuZXcgTGlzdDxUPigpO1xyXG4gICAgICAgIExpc3Q8QWN0aW9uPFQ+PiBzZXR0ZXJzID0gbmV3IExpc3Q8QWN0aW9uPFQ+PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoVCBlLCBBY3Rpb248VD4gc2V0dGVyLCBmbG9hdCB0aW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVG9WYWx1ZS5BZGQoZSk7XHJcbiAgICAgICAgICAgIHNldHRlcnMuQWRkKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248VD4pc2V0dGVyKTtcclxuICAgICAgICAgICAgYmFzZS5BZGQodGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBvdmVycmlkZSB2b2lkIEV4ZWN1dGUoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXR0ZXJzW2ldKFRvVmFsdWVbaV0pO1xyXG4gICAgICAgICAgICBUb1ZhbHVlLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBzZXR0ZXJzLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVTZXR1cFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBwdWJsaWMgQmF0dGxlTWFpbiBiYXR0bGVNYWluO1xyXG4gICAgICAgIHB1YmxpYyBNb3ZlQ3JlYXRvclByb2cgbW92ZUNyZWF0b3I7XHJcbiAgICAgICAgcHVibGljIFRpbWVTdGFtcCB0aW1lU3RhbXA7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVTZXR1cChpbnQgbW9kZSwgaW50IHN0YWdlSWQsIEVDU01hbmFnZXIgZWNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIHRpbWVTdGFtcCA9IG5ldyBUaW1lU3RhbXAoKTtcclxuICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQodGltZVN0YW1wKTtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbiA9IG5ldyBCYXR0bGVNYWluKG1vZGUsIGVjcywgdGltZVN0YW1wKTtcclxuICAgICAgICAgICAgbW92ZUNyZWF0b3IgPSBuZXcgTW92ZUNyZWF0b3JQcm9nKGVjcyk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHN0YWdlcyA9IGVjcy5RdWlja0FjY2Vzc29yMTxTdGFnZURhdGE+KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZml4ZWRBdHRhY2sgPSBzdGFnZXMuRW50aXR5KHN0YWdlSWQpLkdldENvbXBvbmVudDxGaXhlZEF0dGFja1N0YWdlPigpO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVySGFuZFBvb2wgPSBiYXR0bGVNYWluLnBsYXllckhhbmRQb29sO1xyXG4gICAgICAgICAgICBpZiAoZml4ZWRBdHRhY2sgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGZpeGVkQXR0YWNrLm1vdmVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZCgoQmF0dGxlTWFpbi5Nb3ZlVHlwZSlpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFBvb2wuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlKTtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzdGFnZSA9IHN0YWdlcy5Db21wMShzdGFnZUlkKTtcclxuICAgICAgICAgICAgdmFyIGVubXlzID0gc3RhZ2UuZW5lbXlTcGF3bnM7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGVubXlzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5Nb3ZlRGF0YUV4ZWN1dGVyID0gbmV3IE1vdmVEYXRhRXhlY3V0ZXIoYmF0dGxlTWFpbiwgbW92ZUNyZWF0b3IubW92ZURhdGFzLCBlY3MsIHRpbWVTdGFtcCk7XHJcblxyXG4gICAgICAgICAgICBMaXN0PHN0cmluZz4gZW50aXR5UmVuZGVyVGV4dHMgPSBuZXcgTGlzdDxzdHJpbmc+KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW5lbXlEYXRhcyA9IG5ldyBFbmVteURhdGFDcmVhdG9yKGVudGl0eVJlbmRlclRleHRzLCBtb3ZlQ3JlYXRvcikuZW5lbXlEYXRhcztcclxuICAgICAgICAgICAgdmFyIGJhdHRsZVN0YXRlID0gYmF0dGxlTWFpbi5iYXR0bGVTdGF0ZTtcclxuXHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uQmF0dGxlQ29uZmlndXJlKHN0YWdlLmJhdHRsZUNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW5lbXlGYWN0b3J5ID0gbmV3IFNwYXduRW50aXR5RmFjdG9yeShlY3MsIGVuZW15RGF0YXMsIGJhdHRsZU1haW4pO1xyXG4gICAgICAgICAgICBiYXR0bGVNYWluLmVjc0ludGVnID0gbmV3IEVDU0ludGVncmF0aW9uKGVuZW15RmFjdG9yeSwgZWNzKTtcclxuICAgICAgICAgICAgLy9iYXR0bGVNYWluLkVuZW15RmFjdG9yeSA9IGVuZW15RmFjdG9yeTtcclxuXHJcbiAgICAgICAgICAgIHsgLy9BSSBoYW5kbGluZyBjb2RlXHJcbiAgICAgICAgICAgICAgICB2YXIgZW5lbXlBaXMgPSBlY3MuUXVpY2tBY2Nlc3NvcjI8RW5lbXlBSSwgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHk+KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW5lbXlBaVN0YXRlbGVzcyA9IGVjcy5DcmVhdGVBY2Nlc3NvcihuZWNlc3Nhcnk6IG5ldyBUeXBlW10geyB0eXBlb2YoRW5lbXlBSSkgfSwgbm90OiBuZXcgVHlwZVtdIHsgdHlwZW9mKEVuZW15QUlTdGF0ZSkgfSk7XHJcbiAgICAgICAgICAgICAgICBMaXN0PGludD4gcG9zc2libGVNb3ZlcyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICAgICAgICAgIHZhciBtb3ZlRGF0YXMgPSBtb3ZlQ3JlYXRvci5tb3ZlRGF0YXM7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYmF0dGxlTWFpbi5FbmVteUdlbmVyYXRlTW92ZXMgPSAoKSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChlbmVteUFpU3RhdGVsZXNzLkxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVteUFpU3RhdGVsZXNzLkdldCgwKS5BZGRDb21wb25lbnQ8RW5lbXlBSVN0YXRlPigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlbmVteUFpcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhaSA9IGVuZW15QWlzLkNvbXAxKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmF0dGxlciA9IGVuZW15QWlzLkNvbXAyKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWlTdGF0ZSA9IGVuZW15QWlzLkVudGl0eShpKS5HZXRDb21wb25lbnQ8RW5lbXlBSVN0YXRlPigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW92ZXMgPSBhaS5tb3ZlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvc1MgPSBiYXR0bGVyLnBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludCBhaVBybyA9IChqICsgYWlTdGF0ZS5wcm9ncmVzcykgJSBtb3Zlcy5Db3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb3ZlID0gbW92ZXNbYWlQcm9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50IG1vdmVJZCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vdmUgaXMgTW92ZVVzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlSWQgPSAobW92ZSBhcyBNb3ZlVXNlKS5tb3ZlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vdmUgaXMgU3BlY2lhbEVuZW15TW92ZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG0gPSAoU3BlY2lhbEVuZW15TW92ZXMpbW92ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobSA9PSBTcGVjaWFsRW5lbXlNb3Zlcy5TbWFydE1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVNb3Zlcy5DbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpMiA9IDA7IGkyIDwgbW92ZURhdGFzLkNvdW50OyBpMisrKSAvL2NvZGUgdG8gYWRkIG1vdmVtZW50IG1vdmVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YWdzID0gbW92ZURhdGFzW2kyXS50YWdzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3MuQ29udGFpbnMoKGludClNb3ZlRGF0YVRhZ3MuTW92ZW1lbnQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvb2wgdmFsaWRNb3ZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXMgPSBtb3ZlRGF0YXNbaTJdLnVuaXRzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiB1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGluZ3MgPSBpdGVtLnRoaW5nc1RvSGFwcGVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdGhpbmcgaW4gdGhpbmdzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpbmcgaXMgTW92ZUFjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWEgPSB0aGluZyBhcyBNb3ZlQWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXMgPSBtYS5kaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVzdFBvcyA9IHBvc1MgKyBkaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RQb3MuWCA8IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UG9zLlggPiA1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UG9zLlkgPCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UG9zLlkgPiAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZhbGlkTW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVNb3Zlcy5BZGQoaTIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVJZCA9IFBpZHJvaC5CYXNlVXRpbHMuRXh0ZW5zaW9ucy5SYW5kb21FbGVtZW50PGludD4ocG9zc2libGVNb3Zlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUobW92ZUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92ZUlkID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlci5tb3Zlc1tqXSA9IG1vdmVJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWQgPSBtb3ZlQ3JlYXRvci5tb3ZlRGF0YXNbbW92ZUlkXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXMgPSBtZC51bml0cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiB1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGluZ3MgPSBpdGVtLnRoaW5nc1RvSGFwcGVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdGhpbmcgaW4gdGhpbmdzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpbmcgaXMgTW92ZUFjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWEgPSB0aGluZyBhcyBNb3ZlQWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXMgPSBtYS5kaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NTICs9IGRpcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYmUubW92ZXNbal0gPSA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhaVN0YXRlLnByb2dyZXNzICs9IGJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gZGF0YSB0aGF0IHdpbGwgYmUgYSBwYXJ0IG9mIHN0YWdlZGF0YSBzbyBlYWNoIHN0YWdlIGNhbiBoYXZlIGl0J3MgY29uZmlnXHJcbiAgICAvLy8gSXQgd2lsbCBhbHNvIGJlIGNvbnRhaW5lZCBpbiBiYXR0bGVtYWluLlxyXG4gICAgLy8vIFNob3VsZCBiZSBzdGF0aWMsIG9uY2UgY3JlYXRlZC5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgQmF0dGxlQ29uZmlnXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IExpc3Q8aW50PiBlbmVtaWVzVG9TdW1tb24gPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvb2wgbmVlZEtpbGxBbGxFbmVtaWVzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZUNvbmZpZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZUNvbmZpZyhpbnRbXSBlbmVtaWVzVG9TdW1tb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXNUb1N1bW1vbi5BZGRSYW5nZShlbmVtaWVzVG9TdW1tb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZUNvbmZpZyhib29sIG5lZWRLaWxsQWxsRW5lbWllcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubmVlZEtpbGxBbGxFbmVtaWVzID0gbmVlZEtpbGxBbGxFbmVtaWVzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuSGFwcHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIEJhdHRsZU1haW5cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxCYXR0bGVFbnRpdHk+IGVudGl0aWVzID0gbmV3IExpc3Q8QmF0dGxlRW50aXR5PigpO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVTdGF0ZSBiYXR0bGVTdGF0ZSA9IG5ldyBCYXR0bGVTdGF0ZSgpO1xyXG4gICAgICAgIHB1YmxpYyBIYXBwTWFuYWdlciBoYXBwTWFuYWdlciA9IG5ldyBIYXBwTWFuYWdlcigpO1xyXG4gICAgICAgIERpY3Rpb25hcnk8TW92ZVR5cGUsIFZlY3RvcjJEPiBtb3ZlbWVudE1vdmVzID0gbmV3IERpY3Rpb25hcnk8TW92ZVR5cGUsIFZlY3RvcjJEPigpO1xyXG4gICAgICAgIC8vRGljdGlvbmFyeTxNb3ZlVHlwZSwgUG9pbnQ+IGF0dGFja01vdmVzID0gbmV3IERpY3Rpb25hcnk8TW92ZVR5cGUsIFBvaW50PigpO1xyXG4gICAgICAgIE1vdmVUeXBlW10gZW5lbXlNb3ZlcztcclxuICAgICAgICAvL3B1YmxpYyBMaXN0PElucHV0PiBpbnB1dHMgPSBuZXcgTGlzdDxUdXJuYmFzZWQuSW5wdXQ+KCk7XHJcbiAgICAgICAgcHVibGljIElucHV0SG9sZGVyIGlucHV0cyA9IG5ldyBJbnB1dEhvbGRlcigpO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PE1vdmVUeXBlPiBwbGF5ZXJIYW5kRml4ZWQgPSBuZXcgTGlzdDxNb3ZlVHlwZT4oKTtcclxuICAgICAgICBwdWJsaWMgTGlzdDxNb3ZlVHlwZT4gcGxheWVySGFuZFVuZml4ZWQgPSBuZXcgTGlzdDxNb3ZlVHlwZT4oKTtcclxuICAgICAgICBwdWJsaWMgTGlzdDxNb3ZlVHlwZT4gcGxheWVySGFuZFBvb2wgPSBuZXcgTGlzdDxNb3ZlVHlwZT4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IHRpbWVUb0Nob29zZU1heCA9IDE1ZjtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgdGltZVRvQ2hvb3NlID0gLTE7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVSZXN1bHQgYmF0dGxlUmVzdWx0ID0gbmV3IEJhdHRsZVJlc3VsdCgpO1xyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEJhdHRsZUNvbmZpZ3VyZShCYXR0bGVDb25maWcgYmF0dGxlQ29uZmlnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGJhdHRsZUNvbmZpZyA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVDb25maWcgPSBuZXcgQmF0dGxlQ29uZmlnKG5lZWRLaWxsQWxsRW5lbWllczogdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5CYXR0bGVDb25maWcgPSBiYXR0bGVDb25maWc7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2UuVmFsID0gMztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnQgbkVuZW1pZXM7XHJcbiAgICAgICAgcHVibGljIE1vdmVEYXRhRXhlY3V0ZXIgTW92ZURhdGFFeGVjdXRlcjtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFRpbWVTdGFtcCB0aW1lU3RhbXA7XHJcbiAgICAgICAgcHJpdmF0ZSBRdWlja0FjY2Vzc29yVHdvPEJhdHRsZUVudGl0eSwgUGlja3VwSW5mbz4gcGlja3VwQWNjZXNzb3I7XHJcbiAgICAgICAgaW50ZXJuYWwgRUNTSW50ZWdyYXRpb24gZWNzSW50ZWc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBY3Rpb24gRW5lbXlHZW5lcmF0ZU1vdmVzO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnIEJhdHRsZUNvbmZpZyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IEJvYXJkV2lkdGggeyBnZXQ7IGludGVybmFsIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQm9hcmRIZWlnaHQgeyBnZXQ7IGludGVybmFsIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlTWFpbihpbnQgbW9kZSwgRUNTTWFuYWdlciBlY3MsIFRpbWVTdGFtcCB0aW1lU3RhbXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3RoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IHRpbWVTdGFtcDtcclxuICAgICAgICAgICAgcGlja3VwQWNjZXNzb3IgPSBlY3MuUXVpY2tBY2Nlc3NvcjI8QmF0dGxlRW50aXR5LCBQaWNrdXBJbmZvPigpO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlVXAsIFZlY3RvcjJELlVuaXRZKTtcclxuICAgICAgICAgICAgbW92ZW1lbnRNb3Zlcy5BZGQoTW92ZVR5cGUuTW92ZURvd24sIC1WZWN0b3IyRC5Vbml0WSk7XHJcbiAgICAgICAgICAgIG1vdmVtZW50TW92ZXMuQWRkKE1vdmVUeXBlLk1vdmVMZWZ0LCAtVmVjdG9yMkQuVW5pdFgpO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlUmlnaHQsIFZlY3RvcjJELlVuaXRYKTtcclxuXHJcbiAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KGJhdHRsZVN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIHBsYXllckhhbmRGaXhlZC5DbGVhcigpO1xyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kRml4ZWQuQWRkKE1vdmVUeXBlLk1vdmVSaWdodCk7XHJcbiAgICAgICAgICAgIHBsYXllckhhbmRGaXhlZC5BZGQoTW92ZVR5cGUuTW92ZUxlZnQpO1xyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kRml4ZWQuQWRkKE1vdmVUeXBlLk1vdmVEb3duKTtcclxuICAgICAgICAgICAgcGxheWVySGFuZEZpeGVkLkFkZChNb3ZlVHlwZS5Nb3ZlVXApO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1vZGUgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFVuZml4ZWQuQWRkKE1vdmVUeXBlLk5vcm1hbFNob3QpO1xyXG4gICAgICAgICAgICAgICAgZW5lbXlNb3ZlcyA9IG5ldyBNb3ZlVHlwZVtdIHtcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlVXAsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZURvd24sXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk5vcm1hbFNob3QsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9wbGF5ZXJIYW5kVW5maXhlZC5BZGQoTW92ZVR5cGUuRmlyZSk7XHJcbiAgICAgICAgICAgICAgICAvL3BsYXllckhhbmRVbmZpeGVkLkFkZChNb3ZlVHlwZS5JY2UpO1xyXG4gICAgICAgICAgICAgICAgLy9wbGF5ZXJIYW5kVW5maXhlZC5BZGQoTW92ZVR5cGUuVGh1bmRlcik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGVuZW15TW92ZXMgPSBuZXcgTW92ZVR5cGVbXSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZURvd24sXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVVwLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5GaXJlLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLkljZSxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5UaHVuZGVyLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9wbGF5ZXJIYW5kLkFkZChNb3ZlVHlwZS5Ob3JtYWxTaG90KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIElzVmljdG9yeSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIEJhdHRsZUVudGl0eSBoZXJvID0gbmV3IEJhdHRsZUVudGl0eSgpO1xyXG5cclxuICAgICAgICAgICAgaGVyby5wb3MuU2V0KDEsIDEpO1xyXG4gICAgICAgICAgICBoZXJvLm1pblBvcy5TZXQoMCwgMCk7XHJcbiAgICAgICAgICAgIGhlcm8ubWF4UG9zLlNldCgyLCAyKTtcclxuICAgICAgICAgICAgaGVyby5UeXBlID0gRW50aXR5VHlwZS5oZXJvO1xyXG4gICAgICAgICAgICBoZXJvLmxpZmUgPSAyO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGhlcm8ubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhlcm8ubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGVudGl0aWVzLkFkZChoZXJvKTtcclxuICAgICAgICAgICAgZWNzSW50ZWcuSGVyb0NyZWF0ZWQoaGVybyk7XHJcbiAgICAgICAgICAgIGVjc0ludGVnLlNwYXduRW5lbWllcygpO1xyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9HYW1lRW50aXR5IHBpY2t1cCA9IG5ldyBHYW1lRW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5UeXBlID0gRW50aXR5VHlwZS5waWNrdXA7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5wb3MuU2V0KDAsIDIpO1xyXG4gICAgICAgICAgICAgICAgLy9waWNrdXAubGlmZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5ncmFwaGljID0gNDtcclxuICAgICAgICAgICAgICAgIC8vZW50aXRpZXMuQWRkKHBpY2t1cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIEJhdHRsZUVudGl0eSBwYW5lbEVmZmVjdCA9IG5ldyBCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuVHlwZSA9IEVudGl0eVR5cGUucGFuZWxlZmZlY3Q7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnBvcy5TZXQoMCwgMik7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmxpZmUgPSA1O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5ncmFwaGljID0gNTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QucmFuZG9tUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3TGlmZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3VHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBSYW5kb21Qb3NpdGlvbihwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vICAgIGVudGl0aWVzLkFkZChwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIEJhdHRsZUVudGl0eSBwYW5lbEVmZmVjdCA9IG5ldyBCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuVHlwZSA9IEVudGl0eVR5cGUucGFuZWxlZmZlY3Q7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnBvcy5TZXQoMCwgMik7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmxpZmUgPSA1O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5ncmFwaGljID0gNTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QucmFuZG9tUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3TGlmZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3VHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBSYW5kb21Qb3NpdGlvbihwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vICAgIGVudGl0aWVzLkFkZChwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgUmVzZXQoKTtcclxuICAgICAgICAgICAgRXhlY3V0ZVBoYXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlRW50aXR5IE5ld0JhdHRsZUVudGl0eSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCYXR0bGVFbnRpdHkgYmF0dGxlRW50aXR5ID0gbmV3IEJhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICBlbnRpdGllcy5BZGQoYmF0dGxlRW50aXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIGJhdHRsZUVudGl0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbnRpdGllc1tpXS5saWZlID0gZW50aXRpZXNbaV0ubWF4TGlmZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2UpO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS50dXJuLlZhbCA9IDA7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLnRvdGFsVHVybnMgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsID0gMDtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICBiYXR0bGVSZXN1bHQucmVzdWx0ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSXNPdmVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBiYXR0bGVSZXN1bHQucmVzdWx0ICE9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUaWNrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZpbmlzaFByZXZpb3VzVGljaygpO1xyXG4gICAgICAgICAgICBib29sIGhlcm9BbGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBib29sIGVuZW15QWxpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYm9vbCBwaWNrdXBPYmxpZ2F0b3J5RXhpc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLlR5cGUgPT0gRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5saWZlID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXlBbGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5UeXBlID09IEVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5saWZlID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0FsaXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRoaXMucGlja3VwQWNjZXNzb3IuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBwaWNrdXAgPSBwaWNrdXBBY2Nlc3Nvci5Db21wMihpKTtcclxuICAgICAgICAgICAgICAgIGlmIChwaWNrdXAubmVjZXNzYXJ5Rm9yVmljdG9yeSAmJiBwaWNrdXBBY2Nlc3Nvci5Db21wMShpKS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwaWNrdXBPYmxpZ2F0b3J5RXhpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChiYXR0bGVTdGF0ZS5CYXR0bGVFbmRBY3RpdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghaGVyb0FsaXZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZVJlc3VsdC5yZXN1bHQgPSAyO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCghZW5lbXlBbGl2ZSB8fCAhQmF0dGxlQ29uZmlnLm5lZWRLaWxsQWxsRW5lbWllcykgJiYgIXBpY2t1cE9ibGlnYXRvcnlFeGlzdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVSZXN1bHQucmVzdWx0ID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGJhdHRsZVJlc3VsdC5yZXN1bHQgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaGFwcE1hbmFnZXIuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgdGltZVN0YW1wLkFkdmFuY2UoMSk7XHJcbiAgICAgICAgICAgICAgICBFeGVjdXRlUGhhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aW1lVG9DaG9vc2UgPiAwICYmIGJhdHRsZVN0YXRlLnBoYXNlID09IEJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZVRvQ2hvb3NlIC09IGRlbHRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVUb0Nob29zZSA8PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEZpbmlzaFByZXZpb3VzVGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCYXR0bGVQaGFzZSBwcmV2aW91c1BoYXNlID0gYmF0dGxlU3RhdGUucGhhc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocHJldmlvdXNQaGFzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuSGFuZFJlY2hhcmdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuSGFuZFJlY2hhcmdlOlxyXG4gICAgICAgICAgICAgICAgICAgIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlLlBpY2tIYW5kcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLlBpY2tIYW5kczpcclxuICAgICAgICAgICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5FeGVjdXRlTW92ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cgPj0gYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93LlZhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBub01vcmVVbml0c1RvQWN0VGhpc1R1cm4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgaV9pbml0aWFsID0gYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlfaW5pdGlhbCA8IGVudGl0aWVzLkNvdW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gaV9pbml0aWFsOyBpIDwgZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXRpZXNbaV0uQWxpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub01vcmVVbml0c1RvQWN0VGhpc1R1cm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vTW9yZVVuaXRzVG9BY3RUaGlzVHVybilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhdHRsZVN0YXRlLnR1cm4gPj0gYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZSAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLnJhbmRvbVBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiUkFORE9NIFBPUyEhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmFuZG9tUG9zaXRpb24oZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS50dXJuID0gYmF0dGxlU3RhdGUudHVybiArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUudG90YWxUdXJucyArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdy5WYWwgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJhbmRvbVBvc2l0aW9uKEJhdHRsZUVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5wb3MuWCA9IFJhbmRvbVN1cHBsaWVyLlJhbmdlKDAsIDUpO1xyXG4gICAgICAgICAgICBlLnBvcy5ZID0gUmFuZG9tU3VwcGxpZXIuUmFuZ2UoMCwgMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UgcGhhc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCYXR0bGVQaGFzZSBwcmV2aW91c1BoYXNlID0gYmF0dGxlU3RhdGUucGhhc2U7XHJcbiAgICAgICAgICAgIGlmIChwaGFzZSA9PSBwcmV2aW91c1BoYXNlKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChwaGFzZSA9PSBCYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1BoYXNlICE9IEJhdHRsZVBoYXNlLkNvbmZpcm1JbnB1dClcclxuICAgICAgICAgICAgICAgIHtcclxuUGlkcm9oLkJhc2VVdGlscy5FeHRlbnNpb25zLlNodWZmbGU8Z2xvYmFsOjpQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZT4oICAgICAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kUG9vbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVySGFuZFVuZml4ZWQuQ2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgY29tbWFuZHNUb0FkZCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbW1hbmRzVG9BZGQgPiBwbGF5ZXJIYW5kUG9vbC5Db3VudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzVG9BZGQgPSBwbGF5ZXJIYW5kUG9vbC5Db3VudDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb21tYW5kc1RvQWRkOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kVW5maXhlZC5BZGQocGxheWVySGFuZFBvb2xbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVUb0Nob29zZSA9IHRpbWVUb0Nob29zZU1heDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzUGhhc2UgPT0gQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLnR1cm4uVmFsID0gMDtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsID0gMDtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsID0gMTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZS5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUucGhhc2UgPSBwaGFzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQ29uZmlybUlucHV0U3RhcnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuQ29uZmlybUlucHV0KTtcclxuICAgICAgICAgICAgaW5wdXRzLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LkNvbmZpcm0pLCBJbnB1dFRhZ3MuTUlTQyk7XHJcbiAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LkNhbmNlbCksIElucHV0VGFncy5NSVNDKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBFeGVjdXRlUGhhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBoYXNlID0gYmF0dGxlU3RhdGUucGhhc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocGhhc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlOlxyXG4gICAgICAgICAgICAgICAgICAgIGVjc0ludGVnLlNwYXduRW5lbWllcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVuZW15R2VuZXJhdGVNb3ZlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5IYW5kUmVjaGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLlBpY2tIYW5kczpcclxuICAgICAgICAgICAgICAgICAgICBQaWNrSGFuZElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlOlxyXG4gICAgICAgICAgICAgICAgICAgIGVjc0ludGVnLlNwYXduRW5lbWllcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIEV4ZWN1dGVNb3ZlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFBpY2tIYW5kSW5wdXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW5wdXRzLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlucHV0cy5pbnB1dEZvckNvbmZpcm1hdGlvbiA9IG5ldyBJbnB1dChJbnB1dFR5cGUuTm9uZSwgLTEpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaGkgaW4gcGxheWVySGFuZEZpeGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1vdmUsIChpbnQpaGkpLCBJbnB1dFRhZ3MuTU9WRUZJWCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGhpIGluIHBsYXllckhhbmRVbmZpeGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1vdmUsIChpbnQpaGkpLCBJbnB1dFRhZ3MuTU9WRVVORklYKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5SZWRvKSwgSW5wdXRUYWdzLk1JU0MpO1xyXG4gICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5Eb25lKSwgSW5wdXRUYWdzLk1JU0MpO1xyXG4gICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5IZWxwKSwgSW5wdXRUYWdzLk1JU0MpO1xyXG4gICAgICAgICAgICBib29sIGVuZW15RXhpc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLlR5cGUgPT0gRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmVteUV4aXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2lmIChlbmVteUV4aXN0KVxyXG4gICAgICAgICAgICAvLyAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5QcmV2aWV3KSwgSW5wdXRUYWdzLk1JU0MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5wdXREb25lKElucHV0IGlucHV0KVxyXG4gICAgICAgIHtcclxuXHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGJhdHRsZVN0YXRlLnBoYXNlID09IEJhdHRsZVBoYXNlLkNvbmZpcm1JbnB1dClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUHJvY2Vzc0lucHV0KGlucHV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlucHV0cy5pbnB1dEZvckNvbmZpcm1hdGlvbiA9IGlucHV0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5wdXRDb25maXJtZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuUGlja0hhbmRzKTtcclxuICAgICAgICAgICAgSW5wdXQgaW5wdXQgPSBpbnB1dHMuaW5wdXRGb3JDb25maXJtYXRpb247XHJcbiAgICAgICAgICAgIGlucHV0cy5pbnB1dEZvckNvbmZpcm1hdGlvbiA9IG5ldyBJbnB1dChJbnB1dFR5cGUuTm9uZSwgLTEpO1xyXG4gICAgICAgICAgICBQcm9jZXNzSW5wdXQoaW5wdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFByb2Nlc3NJbnB1dChJbnB1dCBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIklOUFVUXCIpO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTW92ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTW92ZVR5cGUgYXJnMSA9IChNb3ZlVHlwZSlpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiSU5QVVRURUQxXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllckhhbmRGaXhlZC5Db250YWlucyhhcmcxKSB8fCBwbGF5ZXJIYW5kVW5maXhlZC5Db250YWlucyhhcmcxKSlcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiSU5QVVRURUQyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVDaG9zZW4oYXJnMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTWlzY0JhdHRsZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTWlzY0JhdHRsZUlucHV0IG1pc2MgPSAoTWlzY0JhdHRsZUlucHV0KWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJJTlBVVFwiK21pc2MpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1pc2MgPT0gTWlzY0JhdHRsZUlucHV0LlJlZG8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlLm1vdmVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLm1vdmVzW2ldID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdmVzW2ldID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludCB2YWx1ZSA9IGUubW92ZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAtMSB8fCBpID09IGJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaSAtIDFdID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobWlzYyA9PSBNaXNjQmF0dGxlSW5wdXQuRG9uZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobWlzYyA9PSBNaXNjQmF0dGxlSW5wdXQuQ29uZmlybSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBJbnB1dENvbmZpcm1lZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFBpY2tIYW5kSW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtaXNjID09IE1pc2NCYXR0bGVJbnB1dC5DYW5jZWwpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIEJhdHRsZURlY2lkZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGhlcm9lcyA9IDA7XHJcbiAgICAgICAgICAgIGludCBlbmVtaWVzID0gMDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5oZXJvKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLkFsaXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvZXMrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbWllcysrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBoZXJvZXMgPT0gMCB8fCBlbmVtaWVzID09IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBNb3ZlQ2hvc2VuKE1vdmVUeXBlIG1vdmVUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5oZXJvKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZS5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgdmFsdWUgPSBlLm1vdmVzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3Zlc1tpXSA9IChpbnQpbW92ZVR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEV4ZWN1dGVNb3ZlcygpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiYmxhXCIgKyBiYXR0bGVTdGF0ZS50dXJuLlZhbCk7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5SZWFkKCk7XHJcbiAgICAgICAgICAgIEJhdHRsZUVudGl0eSBhdHRhY2tlciA9IGVudGl0aWVzW2JhdHRsZVN0YXRlLmFjdGluZ0VudGl0eV07XHJcbiAgICAgICAgICAgIGludCB0dXJuID0gYmF0dGxlU3RhdGUudHVybjtcclxuICAgICAgICAgICAgRXhlY3V0ZU1vdmUoYXR0YWNrZXIsIHR1cm4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRXhlY3V0ZU1vdmUoQmF0dGxlRW50aXR5IGFjdG9yLCBpbnQgdHVybilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1vdmVEYXRhRXhlY3V0ZXIuRXhlY3V0ZU1vdmUoYWN0b3IsIHR1cm4pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBDYWxjdWxhdGVBdHRhY2tNdWx0aXBsaWVyKEJhdHRsZUVudGl0eSBhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBiYXNlRCA9IGFjdG9yLmRhbWFnZU11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZSAhPSBhY3RvcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5wb3MgPT0gYWN0b3IucG9zKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLnBhbmVsZWZmZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlRCAqPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlRDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgQ2FsY3VsYXRlRGVmZW5kZXJNdWx0aXBsaWVyKEJhdHRsZUVudGl0eSBhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBiYXNlRCA9IDE7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZSAhPSBhY3RvcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5wb3MgPT0gYWN0b3IucG9zKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLnBhbmVsZWZmZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlRCAqPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVTdGF0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIFZhbHVlIHR1cm4gPSBuZXcgVmFsdWUoKTtcclxuICAgICAgICAgICAgcHVibGljIGludCB0b3RhbFR1cm5zO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmFsdWUgdHVybnNQZXJQaGFzZSA9IG5ldyBWYWx1ZSgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmFsdWUgbW92ZVRpY2tfTm93ID0gbmV3IFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgbW92ZVRpY2tfVG90YWwgPSAwO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IGFjdGluZ0VudGl0eSA9IDA7XHJcbiAgICAgICAgICAgIHB1YmxpYyBCYXR0bGVQaGFzZSBwaGFzZTtcclxuICAgICAgICAgICAgcHVibGljIGJvb2wgQmF0dGxlRW5kQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVFbnRpdHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgbGlmZTtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIHBvcyA9IG5ldyBWZWN0b3IyRCgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgbWluUG9zID0gbmV3IFZlY3RvcjJEKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBtYXhQb3MgPSBuZXcgVmVjdG9yMkQoKTtcclxuICAgICAgICAgICAgcHVibGljIGludFtdIG1vdmVzID0gbmV3IGludFsxMF07XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgZ3JhcGhpYztcclxuICAgICAgICAgICAgcHVibGljIGludCBncmFwaGljUmVwZWF0ZWRJbmRleDtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IGRhbWFnZU11bHRpcGxpZXIgPSAxO1xyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBkcmF3TGlmZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIGRyYXdUdXJuID0gdHJ1ZTtcclxuICAgICAgICAgICAgcHVibGljIGJvb2wgcmFuZG9tUG9zaXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgcHVibGljIEVsZW1lbnQgZWxlbWVudCA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZTtcclxuICAgICAgICAgICAgcHVibGljIGludCBtYXhMaWZlID0gMztcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBFbnRpdHlUeXBlIFR5cGUgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmhlcm87XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBQb3NpdGlvblYyRCB7IGdldCB7IHJldHVybiBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKHBvcy5YLCBwb3MuWSk7IH0gfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGJvb2wgRGVhZCB7IGdldCB7IHJldHVybiBsaWZlIDw9IDA7IH0gfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGJvb2wgQWxpdmUgeyBnZXQgeyByZXR1cm4gIXRoaXMuRGVhZDsgfSB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gTW92ZVR5cGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERvTm90aGluZyxcclxuICAgICAgICAgICAgTW92ZVVwLFxyXG4gICAgICAgICAgICBNb3ZlTGVmdCxcclxuICAgICAgICAgICAgTW92ZURvd24sXHJcbiAgICAgICAgICAgIE1vdmVSaWdodCxcclxuICAgICAgICAgICAgTm9ybWFsU2hvdCxcclxuICAgICAgICAgICAgRmlyZSxcclxuICAgICAgICAgICAgSWNlLFxyXG4gICAgICAgICAgICBUaHVuZGVyLFxyXG4gICAgICAgICAgICBJY2VCb21iLFxyXG4gICAgICAgICAgICBUaHVuZGVyQm9tYixcclxuICAgICAgICAgICAgU3VtbW9uRW50aXR5LFxyXG4gICAgICAgICAgICBNb3ZlU21hcnQsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBIYXBwVGFnXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBdHRhY2tIaXQsXHJcbiAgICAgICAgICAgIEF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIERhbWFnZVRha2VuLFxyXG4gICAgICAgICAgICBNb3ZlbWVudEZhaWxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEJhdHRsZVBoYXNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbmVteU1vdmVDaG9pY2UsXHJcbiAgICAgICAgICAgIEhhbmRSZWNoYXJnZSxcclxuICAgICAgICAgICAgUGlja0hhbmRzLFxyXG4gICAgICAgICAgICBDb25maXJtSW5wdXQsXHJcbiAgICAgICAgICAgIEV4ZWN1dGVNb3ZlLFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEVudGl0eVR5cGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGhlcm8sIGVuZW15LCBwaWNrdXAsIHBhbmVsZWZmZWN0XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBFbGVtZW50XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGaXJlLCBJY2UsIFRodW5kZXIsXHJcbiAgICAgICAgICAgIE5vbmVcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBpbnQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0JvYXJkV2lkdGg9Njtwcml2YXRlIGludCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQm9hcmRIZWlnaHQ9Mzt9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVmFsdWVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgVmFsIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudW0gdmFsQXNFbnVtIHsgc2V0IHsgVmFsID0gQ29udmVydC5Ub1NpbmdsZSh2YWx1ZSk7IH0gfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldChpbnQgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZhbCA9IHY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZhbHVlIG9wZXJhdG9yICsoVmFsdWUgYzEsIGZsb2F0IGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYzEuVmFsICs9IGMyO1xyXG4gICAgICAgICAgICByZXR1cm4gYzE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IG9wZXJhdG9yIC0oVmFsdWUgYzEsIGZsb2F0IGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGMxLlZhbCAtIGMyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFZhbHVlIGMxLCBWYWx1ZSBjMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJvb2wgYzJudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMiwgbnVsbCk7XHJcbiAgICAgICAgICAgIGJvb2wgYzFudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmIChjMm51bGwgJiYgYzFudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGlmIChjMW51bGwgfHwgYzJudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGMxLlZhbCA9PSBjMi5WYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oVmFsdWUgYzEsIFZhbHVlIGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYm9vbCBjMm51bGwgPSBvYmplY3QuUmVmZXJlbmNlRXF1YWxzKGMyLCBudWxsKTtcclxuICAgICAgICAgICAgYm9vbCBjMW51bGwgPSBvYmplY3QuUmVmZXJlbmNlRXF1YWxzKGMxLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKGMybnVsbCAmJiBjMW51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChjMW51bGwgfHwgYzJudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYzEuVmFsICE9IGMyLlZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW1wbGljaXQgb3BlcmF0b3IgZmxvYXQoVmFsdWUgZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBkLlZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW1wbGljaXQgb3BlcmF0b3IgaW50KFZhbHVlIGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludClkLlZhbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIEJhdHRsZVJlc3VsdFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdHJ1Y3QgSW5wdXRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgSW5wdXRUeXBlIHR5cGU7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBhcmcxO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBJbnB1dChJbnB1dFR5cGUgdHlwZSwgaW50IGFyZzEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLmFyZzEgPSBhcmcxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElucHV0KElucHV0VHlwZSB0eXBlLCBFbnVtIGFyZzEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLmFyZzEgPSBDb252ZXJ0LlRvSW50MzIoYXJnMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIElucHV0VHlwZVxyXG4gICAge1xyXG4gICAgICAgIE5vbmUsIE1vdmUsIE1pc2NCYXR0bGVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBNaXNjQmF0dGxlSW5wdXRcclxuICAgIHtcclxuICAgICAgICBEb25lLFxyXG4gICAgICAgIFJlZG8sXHJcbiAgICAgICAgUHJldmlldyxcclxuICAgICAgICBDb25maXJtLFxyXG4gICAgICAgIENhbmNlbCxcclxuICAgICAgICBIZWxwXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDb2xvclN0dWZmXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgc3RyaW5nIEdvb2RNYWluO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIG5ldXRyYWxEYXJrID0gXCIjMTkwMTNiXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgbmV1dHJhbFN0cm9uZyA9IFwiIzJjM2U0M1wiO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHN0cmluZyBHb29kU3ViO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHN0cmluZyBFdmlsTWFpbjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZ1tdIGNvbG9ycyA9IG5ldyBzdHJpbmdbMjBdO1xyXG5cclxuICAgICAgICBzdGF0aWMgQ29sb3JTdHVmZigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvbG9ycy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sb3JzW2ldID0gXCIjNDAwMDIwXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkhlcm9dID0gXCIjMDA5YzhkXCI7XHJcbiAgICAgICAgICAgIC8vY29uc3Qgc3RyaW5nIGhlcm9TdWIgPSBcIiMwMDVmOTFcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkhlcm9UdXJuXSA9IGhlcm9TdWI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5FbmVteV0gPSBcIiNmZjAzNTNcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkdyaWRIZXJvXSA9IGhlcm9TdWI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEVuZW15XSA9IFwiIzhlMDA2MFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15VHVybl0gPSBcIiM4ZTAwNjBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5Cb2FyZF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5pbnB1dEtleV0gPSBcIiM2ODg2OTBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5GaXJlQXVyYV0gPSBcIiM3OTMxMDBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5JY2VBdXJhXSA9IFwiIzAwNTU5MFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJBdXJhXSA9IFwiIzAwNTgzZFwiO1xyXG5cclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dID0gXCIjOGFkODk2XCI7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyBoZXJvU3ViID0gXCIjNGM2ZDUwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvVHVybl0gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXldID0gXCIjZmY3Njk0XCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVyb10gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgZW5lbXlzdWIgPSBcIiNhNzQ2NGZcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRFbmVteV0gPSBlbmVteXN1YjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15VHVybl0gPSBlbmVteXN1YjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQm9hcmRdID0gXCIjMWU0ODZlXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLmlucHV0S2V5XSA9IFwiIzY4ODY5MFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuRmlyZUF1cmFdID0gXCIjNzkzMTAwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkljZUF1cmFdID0gXCIjMDA1NTkwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJBdXJhXSA9IFwiIzAwNTgzZFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5GaXJlU2hvdF0gPSBcIiNmODJiMzZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuSWNlU2hvdF0gPSBcIiMwMDdlZmZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuVGh1bmRlclNob3RdID0gXCIjYTM3YzAwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkJhY2tncm91bmRJbnB1dF0gPSBcIiMwODA4MDhcIjtcclxuXHJcblxyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5pbnB1dEtleV0gPSBcIiM5RTg2NjRcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuSW5wdXREZXNjcmlwdGlvbl0gPSBcIiM4MDgwODBcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQmFja0JhdHRsZV0gPSBcIiMwMDAwMDBcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQmFja2dyb3VuZElucHV0XSA9IFwiIzFBMUExQVwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb1R1cm5dID0gXCIjMDBCMkIyXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteVR1cm5dID0gXCIjRkYwMDQwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVyb10gPSBcIiMwMDQ2OENcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRFbmVteV0gPSBcIiM4QzAwMjNcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dID0gXCIjNjZGRkZGXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteV0gPSBcIiNEOTAwMzZcIjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvXSA9IFwiI0JGQkZCRlwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXldID0gY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb1R1cm5dID0gY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXlUdXJuXSA9IGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvXTtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuV2luZG93TGFiZWxdID0gXCIjNjY2NjY2XCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkJhY2tDb21tYW5kXSA9IFwiIzMzMzMzM1wiO1xyXG5cclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuRmlyZUF1cmFdID0gXCIjRkY4QzY2XCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkljZUF1cmFdID0gXCIjNjZGRkZGXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJBdXJhXSA9IFwiI0ZGRkY2NlwiO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkRlYnVnRXh0cmFcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBEZWJ1Z0V4XHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIExpc3Q8c3RyaW5nPiBtZXNzYWdlcyA9IG5ldyBMaXN0PHN0cmluZz4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIExvZyhzdHJpbmcgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VzLkFkZCh2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG93KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnNvbGUuQ2xlYXIoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbWVzc2FnZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ29uc29sZS5SZWFkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgaW50ZXJuYWwgY2xhc3MgRUNTSW50ZWdyYXRpb25cclxuICAgIHtcclxuXHJcbiAgICAgICAgU3Bhd25FbnRpdHlGYWN0b3J5IGVuZW15RmFjdG9yeTtcclxuICAgICAgICBFQ1NNYW5hZ2VyIGVjcztcclxuXHJcbiAgICAgICAgcHVibGljIEVDU0ludGVncmF0aW9uKFNwYXduRW50aXR5RmFjdG9yeSBlbmVteUZhY3RvcnksIEVDU01hbmFnZXIgZWNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbmVteUZhY3RvcnkgPSBlbmVteUZhY3Rvcnk7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBIZXJvQ3JlYXRlZChCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBoZXJvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQoaGVybyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNwYXduRW5lbWllcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbmVteUZhY3RvcnkuU3Bhd24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEVuZW15QUlcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgTGlzdDxvYmplY3Q+IG1vdmVzID0gbmV3IExpc3Q8b2JqZWN0PigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBFbmVteUFJU3RhdGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IHByb2dyZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBNb3ZlVXNlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBtb3ZlO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVVzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVVc2UoaW50IG1vdmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUgPSBtb3ZlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU3Bhd25FbnRpdHlGYWN0b3J5XHJcbiAgICB7XHJcblxyXG4gICAgICAgIEVDU01hbmFnZXIgZWNzO1xyXG4gICAgICAgIExpc3Q8RW5lbXlEYXRhPiBlbmVteURhdGFzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgQmF0dGxlTWFpbiBiYXR0bGVNYWluO1xyXG4gICAgICAgIHByaXZhdGUgUXVpY2tBY2Nlc3Nvck9uZTxTcGF3bkRhdGE+IHNwYXducztcclxuXHJcbiAgICAgICAgcHVibGljIFNwYXduRW50aXR5RmFjdG9yeShFQ1NNYW5hZ2VyIGVjcywgTGlzdDxFbmVteURhdGE+IGVuZW15RGF0YXMsIEJhdHRsZU1haW4gYmF0dGxlTWFpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICAvL2Vjcy5RdWlja0FjY2Vzc29yMTxFbmVteURhdGE+KCk7XHJcbiAgICAgICAgICAgIHNwYXducyA9IGVjcy5RdWlja0FjY2Vzc29yMTxTcGF3bkRhdGE+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlEYXRhcyA9IGVuZW15RGF0YXM7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlTWFpbiA9IGJhdHRsZU1haW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTcGF3bigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgc3Bhd25lZCA9IDA7XHJcbiAgICAgICAgICAgIC8vZm9yIChpbnQgaSA9IDA7IGkgPCBzcGF3bnMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAgd2hpbGUgKHNwYXducy5Db3VudCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNwYXduRGF0YSBzcGF3biA9IHNwYXducy5Db21wMSgwKTtcclxuICAgICAgICAgICAgICAgIHNwYXducy5FbnRpdHkoMCkuUmVtb3ZlQ29tcG9uZW50KHNwYXduKTtcclxuICAgICAgICAgICAgICAgIHZhciBpZCA9IHNwYXduLmlkO1xyXG4gICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5FbnRpdHlUeXBlIGVudFR5cGUgPSAoQmF0dGxlTWFpbi5FbnRpdHlUeXBlKXNwYXduLmVudGl0eVR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZihlbnRUeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5waWNrdXApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJlID0gYmF0dGxlTWFpbi5OZXdCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5UeXBlID0gZW50VHlwZTtcclxuICAgICAgICAgICAgICAgICAgICBQaWNrdXBJbmZvIHBpY2t1cCA9IG5ldyBQaWNrdXBJbmZvKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwaWNrdXBFID0gZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQocGlja3VwKTtcclxuICAgICAgICAgICAgICAgICAgICBwaWNrdXBFLkFkZENvbXBvbmVudChiZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUucG9zID0gc3Bhd24ucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgYmUubGlmZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUubWF4TGlmZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUuZHJhd0xpZmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5kcmF3VHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLmdyYXBoaWMgPSA0O1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGVudFR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmVteUFJID0gZW5lbXlEYXRhc1tpZF0uZW5lbXlBSTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5lbXkgPSBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChlbmVteUFJKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmUgPSBiYXR0bGVNYWluLk5ld0JhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLnBvcyA9IHNwYXduLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLmxpZmUgPSBlbmVteURhdGFzW2lkXS5ocDtcclxuICAgICAgICAgICAgICAgICAgICBiZS5tYXhMaWZlID0gYmUubGlmZTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5ncmFwaGljID0gZW5lbXlEYXRhc1tpZF0ucmVuZGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbnRpdGllcyA9IGJhdHRsZU1haW4uZW50aXRpZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPSBiZSAmJiBpdGVtLmdyYXBoaWMgPT0gYmUuZ3JhcGhpYylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmUuZ3JhcGhpY1JlcGVhdGVkSW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBiZS5taW5Qb3MgPSBuZXcgVmVjdG9yMkQoMywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUubWF4UG9zID0gbmV3IFZlY3RvcjJEKDUsIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLlR5cGUgPSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5lbXkuQWRkQ29tcG9uZW50KGJlKTtcclxuICAgICAgICAgICAgICAgICAgICBFbmVteUFJU3RhdGUgZW5lbXlBaVN0YXRlID0gbmV3IEVuZW15QUlTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZW15QWlTdGF0ZS5wcm9ncmVzcyA9IHNwYXduZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5lbXkuQWRkQ29tcG9uZW50KGVuZW15QWlTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiU1BBV05cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Bhd25lZCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBQaWNrdXBJbmZvXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGJvb2wgbmVjZXNzYXJ5Rm9yVmljdG9yeTtcclxuXHJcbiAgICAgICAgcHVibGljIFBpY2t1cEluZm8oYm9vbCBuZWNlc3NhcnlGb3JWaWN0b3J5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5uZWNlc3NhcnlGb3JWaWN0b3J5ID0gbmVjZXNzYXJ5Rm9yVmljdG9yeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQaWNrdXBJbmZvKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBFbmVteURhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgRW5lbXlBSSBlbmVteUFJO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgaHA7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCByZW5kZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmVteURhdGEoRW5lbXlBSSBlbmVteUFJLCBpbnQgaHAsIGludCByZW5kZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15QUkgPSBlbmVteUFJO1xyXG4gICAgICAgICAgICB0aGlzLmhwID0gaHA7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyID0gcmVuZGVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRW5lbXlEYXRhQ3JlYXRvclxyXG4gICAge1xyXG4gICAgICAgIExpc3Q8c3RyaW5nPiByZW5kZXJUZXh0cztcclxuICAgICAgICBwdWJsaWMgTGlzdDxFbmVteURhdGE+IGVuZW15RGF0YXMgPSBuZXcgTGlzdDxFbmVteURhdGE+KCk7XHJcbiAgICAgICAgTW92ZUNyZWF0b3JQcm9nIG1vdmVDcmVhdG9yUHJvZztcclxuXHJcbiAgICAgICAgcHVibGljIEVuZW15RGF0YUNyZWF0b3IoTGlzdDxzdHJpbmc+IHJlbmRlclRleHRzLCBNb3ZlQ3JlYXRvclByb2cgbW92ZUNyZWF0b3JQcm9nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVuZGVyVGV4dHMuQWRkKFwiQFwiKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJUZXh0cyA9IHJlbmRlclRleHRzO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDcmVhdG9yUHJvZyA9IG1vdmVDcmVhdG9yUHJvZztcclxuXHJcbiAgICAgICAgICAgIC8vY29tbWVudFxyXG4gICAgICAgICAgICAvL0FkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAvLyAgICBTcGVjaWFsRW5lbXlNb3Zlcy5TbWFydE1vdmUsIE1vdmVUeXBlLk1vdmVMZWZ0LCBNb3ZlVHlwZS5Nb3ZlRG93blxyXG4gICAgICAgICAgICAvLyAgICApLCBocDogMiwgcmVuZGVyVGV4dDogXCIlXCIpO1xyXG5cclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcbiAgICAgICAgICAgICAgICBNb3ZlcyhQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93biwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0LCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXAsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIpXHJcbiAgICAgICAgICAgICAgICApLCBocDoyLCByZW5kZXJUZXh0OlwiJVwiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcbiAgICAgICAgICAgICAgICBNb3ZlcyhQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb05vdGhpbmcsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZylcclxuICAgICAgICAgICAgICAgICksIGhwOiAzLCByZW5kZXJUZXh0OiBcIiNcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAgICBNb3ZlcyhcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXJCb21iLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLk1vdmVSaWdodFxyXG4gICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICApLCBocDogNiwgcmVuZGVyVGV4dDogXCImXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYixcclxuICAgICAgICAgICAgICAgICAgIFwiU3VtbW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXJCb21iLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLkZpcmVcclxuXHJcblxyXG4gICAgICAgICAgICAgICApLCBocDogNDUsIHJlbmRlclRleHQ6IFwiJFwiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93bixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24sXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVxyXG4uTW92ZVVwXHJcblxyXG5cclxuICAgICAgICAgICAgICAgKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiSFwiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcblxyXG4gICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuSWNlLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLkRvTm90aGluZ1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICApLCBocDogMywgcmVuZGVyVGV4dDogXCJKXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZyxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlXHJcbi5Eb05vdGhpbmdcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiTFwiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcblxyXG4gICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZyxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlXHJcbi5Eb05vdGhpbmdcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiS1wiKTtcclxuICAgICAgICAgICAgLy9BZGRFbmVteShhaTogQWN0aW9ucygpLCBocDogMywgcmVuZGVyVGV4dDogXCIkXCIpO1xyXG4gICAgICAgICAgICAvL0FkZEVuZW15KGFpOiBBY3Rpb25zKCksIGhwOiA1LCByZW5kZXJUZXh0OiBcIiNcIik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBFbmVteUFJIEFjdGlvbnMocGFyYW1zIG9iamVjdFtdIG9icylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBhaSA9IG5ldyBFbmVteUFJKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbyBpbiBvYnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChvIGlzIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpLm1vdmVzLkFkZChuZXcgTW92ZVVzZSgoaW50KW8pKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChvIGlzIHN0cmluZylcclxuICAgICAgICAgICAgICAgIHsgICBcclxuICAgICAgICAgICAgICAgICAgICBhaS5tb3Zlcy5BZGQobmV3IE1vdmVVc2UobW92ZUNyZWF0b3JQcm9nLkdldE1vdmVJZChvIGFzIHN0cmluZykpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChvIGlzIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlW10pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbyBhcyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVtdKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWkubW92ZXMuQWRkKG5ldyBNb3ZlVXNlKChpbnQpaXRlbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFpLm1vdmVzLkFkZChvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlW10gTW92ZXMocGFyYW1zIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlW10gbW92ZXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbW92ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkRW5lbXkoRW5lbXlBSSBhaSwgaW50IGhwLCBzdHJpbmcgcmVuZGVyVGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCByZW5kZXIgPSByZW5kZXJUZXh0cy5Db3VudDtcclxuICAgICAgICAgICAgcmVuZGVyVGV4dHMuQWRkKHJlbmRlclRleHQpO1xyXG4gICAgICAgICAgICBlbmVteURhdGFzLkFkZChuZXcgRW5lbXlEYXRhKGFpLCBocCwgcmVuZGVyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIFNwZWNpYWxFbmVteU1vdmVzXHJcbiAgICB7XHJcbiAgICAgICAgU21hcnRNb3ZlXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU3RhZ2VEYXRhQ3JlYXRvclxyXG4gICAge1xyXG4gICAgICAgIC8vcHVibGljIExpc3Q8U3RhZ2VEYXRhPiBzdGFnZXMgPSBuZXcgTGlzdDxTdGFnZURhdGE+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBFQ1NNYW5hZ2VyIGVjcztcclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlRGF0YUNyZWF0b3IoRUNTTWFuYWdlciBlY3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuXHJcbiAgICAgICAgICAgIC8vQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgIC8vICAgIEVuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMikpLFxyXG4gICAgICAgICAgICAvLyAgICBFbmVteSgyLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDEpKSxcclxuICAgICAgICAgICAgLy8gICAgRW5lbXkoMiwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSlcclxuICAgICAgICAgICAgLy8gICAgKSk7XHJcblxyXG4gICAgICAgICAgICAvL0FkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAvLyAgRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSlcclxuICAgICAgICAgICAgLy8vLyAgRW5lbXkoNSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSksXHJcbiAgICAgICAgICAgIC8vLy8gIEVuZW15KDcsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMCkpXHJcbiAgICAgICAgICAgIC8vICApKTtcclxuXHJcbiAgICAgICAgICAgIC8vQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgIC8vICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgIC8vICAgIEVuZW15KDYsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMCkpXHJcbiAgICAgICAgICAgIC8vICAgICksIG5ldyBGaXhlZEF0dGFja1N0YWdlKFxyXG4gICAgICAgICAgICAvLyAgICAgICAgKGludClCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpKTtcclxuXHJcbiAgICAgICAgICAgIEFkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIDApKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDIsIDIpKVxyXG4gICAgICAgICAgICAgICAgKS5IaWRlTGlmZVVJKCksIG5ldyBGaXhlZEF0dGFja1N0YWdlKCkpO1xyXG4gICAgICAgICAgICBBZGQobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgICBuZXcgQmF0dGxlQ29uZmlnKG5lZWRLaWxsQWxsRW5lbWllczpmYWxzZSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgyLCAxKSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgwLCAyKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSg0LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKVxyXG4gICAgICAgICAgICAgICAgKS5IaWRlTGlmZVVJKCksIG5ldyBGaXhlZEF0dGFja1N0YWdlKCkpO1xyXG4gICAgICAgICAgICBBZGQobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgICBuZXcgQmF0dGxlQ29uZmlnKG5lZWRLaWxsQWxsRW5lbWllczogZmFsc2UpLFxyXG4gICAgICAgICAgICAgICAgUGlja3VwKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMiwgMikpLFxyXG4gICAgICAgICAgICAgICAgUGlja3VwKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMSwgMikpLFxyXG4gICAgICAgICAgICAgICAgUGlja3VwKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMCwgMikpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoNSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAyKSlcclxuICAgICAgICAgICAgICAgICksIG5ldyBGaXhlZEF0dGFja1N0YWdlKCkpO1xyXG4gICAgICAgICAgICBBZGQobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSg2LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDApKVxyXG4gICAgICAgICAgICAgICAgKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgKGludClCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpKTtcclxuICAgICAgICAgICAgQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgIEVuZW15KDQsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpXHJcbiAgICAgICAgICAgICAgICksIG5ldyBGaXhlZEF0dGFja1N0YWdlKFxyXG4gICAgICAgICAgICAgICAgICAgKGludClCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpKTtcclxuICAgICAgICAgICAgQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgIEVuZW15KDUsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpXHJcbiAgICAgICAgICAgICAgICksIG5ldyBGaXhlZEF0dGFja1N0YWdlKFxyXG4gICAgICAgICAgICAgICAgICAgKGludClCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpKTtcclxuICAgICAgICAgICAgQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICBFbmVteSg1LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKSxcclxuICAgICAgICAgICAgICBFbmVteSg3LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDApKVxyXG4gICAgICAgICAgICAgICksIG5ldyBGaXhlZEF0dGFja1N0YWdlKFxyXG4gICAgICAgICAgICAgICAgICAoaW50KUJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSwgKGludClCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIgKSk7XHJcbiAgICAgICAgICAgIEFkZChcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIEVuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMCkpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAyKSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICBFbmVteSgxLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDIpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDIsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAgbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIEVuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICBFbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDIpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDIsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMSkpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMiwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEJhdHRsZUNvbmZpZyhuZXcgaW50W10geyAxIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIEVuZW15KDMsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpXHJcbiAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgLy8sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8sXHJcbiAgICAgICAgICAgICAgICAvL25ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICAvL25ldyBFbmVteVNwYXduRGF0YSgxLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKSxcclxuICAgICAgICAgICAgICAgIC8vbmV3IEVuZW15U3Bhd25EYXRhKDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkKHBhcmFtcyBvYmplY3RbXSBjb21wcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZSA9IGVjcy5DcmVhdGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gY29tcHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGUuQWRkQ29tcG9uZW50KGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBTcGF3bkRhdGEgUGlja3VwKGludCB2LCBWZWN0b3IyRCB2ZWN0b3IyRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3Bhd25EYXRhKHYsIHZlY3RvcjJELCAoaW50KUJhdHRsZU1haW4uRW50aXR5VHlwZS5waWNrdXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBTcGF3bkRhdGEgRW5lbXkoaW50IHYsIFZlY3RvcjJEIHZlY3RvcjJEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTcGF3bkRhdGEodiwgdmVjdG9yMkQsIChpbnQpQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZGQocGFyYW1zIFN0YWdlRGF0YVtdIHN0YWdlRGF0YTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBzdGFnZURhdGExKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3N0YWdlcy5BZGRSYW5nZShzdGFnZURhdGExKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFN0YWdlRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PFNwYXduRGF0YT4gZW5lbXlTcGF3bnMgPSBuZXcgTGlzdDxTcGF3bkRhdGE+KCk7XHJcbiAgICAgICAgcHVibGljIEJhdHRsZUNvbmZpZyBiYXR0bGVDb25maWc7XHJcbiAgICAgICAgcHVibGljIGJvb2wgaGlkZUxpZmVVSSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgU3RhZ2VEYXRhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhZ2VEYXRhKHBhcmFtcyBTcGF3bkRhdGFbXSBzcGF3bnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbmVteVNwYXducy5BZGRSYW5nZShzcGF3bnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlRGF0YShCYXR0bGVDb25maWcgYmF0dGxlQ29uZmlnLCBwYXJhbXMgU3Bhd25EYXRhW10gc3Bhd25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW5lbXlTcGF3bnMuQWRkUmFuZ2Uoc3Bhd25zKTtcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVDb25maWcgPSBiYXR0bGVDb25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhZ2VEYXRhIEhpZGVMaWZlVUkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaGlkZUxpZmVVSSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgRml4ZWRBdHRhY2tTdGFnZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PGludD4gbW92ZXMgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBGaXhlZEF0dGFja1N0YWdlKGludCBtb3ZlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW92ZXMuQWRkKG1vdmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEZpeGVkQXR0YWNrU3RhZ2UocGFyYW1zIGludFtdIG1vdmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3Zlcy5BZGRSYW5nZShtb3ZlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBGaXhlZEF0dGFja1N0YWdlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBTcGF3bkRhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGlkO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgZW50aXR5VHlwZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQmFzZVV0aWxzLlZlY3RvcjJEIHBvc2l0aW9uO1xyXG5cclxuICAgICAgICBwdWJsaWMgU3Bhd25EYXRhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3Bhd25EYXRhKGludCBpZCwgVmVjdG9yMkQgcG9zaXRpb24sIGludCB0eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXR5VHlwZSA9IHR5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5IYXBwcztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1vdmVEYXRhRXhlY3V0ZXJcclxuICAgIHtcclxuICAgICAgICBCYXR0bGVNYWluIGJhdHRsZU1haW47XHJcbiAgICAgICAgTGlzdDxNb3ZlRGF0YT4gbW92ZURhdGFzO1xyXG4gICAgICAgIHByaXZhdGUgSGFwcE1hbmFnZXIgaGFwcE1hbmFnZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PEJhdHRsZU1haW4uQmF0dGxlRW50aXR5PiBlbnRpdGllcztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEVDU01hbmFnZXIgZWNzO1xyXG4gICAgICAgIFRpbWVTdGFtcCB0aW1lU3RhbXA7XHJcbiAgICAgICAgTGlzdDxWZWN0b3IyRD4gYXV4ID0gbmV3IExpc3Q8VmVjdG9yMkQ+KCk7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZURhdGFFeGVjdXRlcihCYXR0bGVNYWluIHR1cm5CYXNlLCBMaXN0PE1vdmVEYXRhPiBtb3ZlRGF0YXMsIEVDU01hbmFnZXIgZWNzLCBUaW1lU3RhbXAgdGltZVN0YW1wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVNYWluID0gdHVybkJhc2U7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZURhdGFzID0gbW92ZURhdGFzO1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuICAgICAgICAgICAgdGhpcy50aW1lU3RhbXAgPSB0aW1lU3RhbXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFeGVjdXRlTW92ZShCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBhY3RvciwgaW50IHR1cm4pXHJcbiAgICAgICAge1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBiYXR0bGVTdGF0ZSA9IHRoaXMuYmF0dGxlTWFpbi5iYXR0bGVTdGF0ZTtcclxuICAgICAgICAgICAgZW50aXRpZXMgPSB0aGlzLmJhdHRsZU1haW4uZW50aXRpZXM7XHJcbiAgICAgICAgICAgIGludCB1c2VySWQgPSBlbnRpdGllcy5JbmRleE9mKGFjdG9yKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtb3ZlSWQgPSBhY3Rvci5tb3Zlc1t0dXJuXTtcclxuICAgICAgICAgICAgaWYgKG1vdmVJZCA8IDApIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIG1kID0gbW92ZURhdGFzW21vdmVJZF07XHJcbiAgICAgICAgICAgIGlmIChtZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChtZC51bml0cy5Db3VudCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsID0gbWQudW5pdHMuQ291bnQ7XHJcbiAgICAgICAgICAgIGludCBtb3ZlVGljayA9IGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdztcclxuICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtZC51bml0c1ttb3ZlVGlja10udGhpbmdzVG9IYXBwZW47XHJcbiAgICAgICAgICAgIGhhcHBNYW5hZ2VyID0gYmF0dGxlTWFpbi5oYXBwTWFuYWdlcjtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGEgaW4gYWN0aW9ucylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhIGlzIE1vdmVBY3Rpb24pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZUFjdGlvbiBtYSA9IGEgYXMgTW92ZUFjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IG1hLmRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdG9yLnBvcyArPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgaW52YWxpZE1vdmUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5wb3MuWCA8IGFjdG9yLm1pblBvcy5YXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGFjdG9yLnBvcy5ZIDwgYWN0b3IubWluUG9zLllcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgYWN0b3IucG9zLlkgPiBhY3Rvci5tYXhQb3MuWVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhY3Rvci5wb3MuWCA+IGFjdG9yLm1heFBvcy5YO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUgIT0gYWN0b3IgJiYgZS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdG9yLnBvcyA9PSBlLnBvcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkTW92ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUucGlja3VwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5saWZlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3IuZGFtYWdlTXVsdGlwbGllciA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBhbmVsZWZmZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZE1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGludmFsaWRNb3ZlKSBicmVhaztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkTW92ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJJbnZhbGlkIG1vdmUgZ2VuZXJhdGVcIiArIGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdy5WYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGFjdG9ySWQgPSBlbnRpdGllcy5JbmRleE9mKGFjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVmVjdG9yMkQgbW92ZVRvID0gYWN0b3IucG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWZWN0b3IyRCBtb3ZlRnJvbSA9IGFjdG9yLnBvcyAtIHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENyZWF0ZUhhcHAoKGludClNb3ZlRGF0YVRhZ3MuTW92ZW1lbnQsIG5ldyBIYXBwTW92ZURhdGEoYWN0b3JJZCksIG5ldyBIYXBwTW92ZW1lbnQobW92ZUZyb20sIG1vdmVUbywgZmFsc2UpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2JhdHRsZU1haW4uaGFwcE1hbmFnZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLkFkZChuZXcgSGFwcChCYXR0bGVNYWluLkhhcHBUYWcuTW92ZW1lbnRGYWlsKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShhY3RvcklkKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShhY3Rvci5wb3MuWCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoYWN0b3IucG9zLlkpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5wb3MgLT0gcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGFjdG9ySWQgPSBlbnRpdGllcy5JbmRleE9mKGFjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVmVjdG9yMkQgbW92ZVRvID0gYWN0b3IucG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWZWN0b3IyRCBtb3ZlRnJvbSA9IGFjdG9yLnBvcyAtIHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENyZWF0ZUhhcHAoKGludClNb3ZlRGF0YVRhZ3MuTW92ZW1lbnQsIG5ldyBIYXBwTW92ZURhdGEoYWN0b3JJZCksIG5ldyBIYXBwTW92ZW1lbnQobW92ZUZyb20sIG1vdmVUbywgdHJ1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiTU9WRSBIQVBQIFNVQ0NFU1NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGEgaXMgRGVhbERhbWFnZUFjdGlvbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGRhID0gYSBhcyBEZWFsRGFtYWdlQWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdHRhY2tFbGVtZW50ID0gZGRhLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRkYS50YXJnZXQgPT0gVGFyZ2V0LkFyZWEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJlYSA9IGRkYS5hcmVhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmZXJlbmNlVXNlck9mQXJlYSA9IFJlc29sdmVUYXJnZXQoYWN0b3IsIGVudGl0aWVzLCBhcmVhLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBtaXJyb3JpbmdYID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdG9yLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KSAvL2VuZW1pZXMgYWN0IG9uIG9wcG9zaXRlIHNpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlycm9yaW5nWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBwb2ludCBpbiBhcmVhLnBvaW50cylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaFBvcyA9IHBvaW50ICogbmV3IEJhc2VVdGlscy5WZWN0b3IyRChtaXJyb3JpbmdYLCAxKSArIHJlZmVyZW5jZVVzZXJPZkFyZWEucG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIlNlYXJjaCBwb2ludCBcIitzZWFyY2hQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdGllc1tpXS5wb3MgPT0gc2VhcmNoUG9zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVhbERhbWFnZShhY3RvciwgZGRhLCBlbnRpdGllc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ZpbmQgdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IHRhcmdldCA9IFJlc29sdmVUYXJnZXQoYWN0b3IsIGVudGl0aWVzLCBkZGEudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWFsRGFtYWdlKGFjdG9yLCBkZGEsIHRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGEgaXMgU3VtbW9uRW50aXR5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZSA9IGEgYXMgU3VtbW9uRW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmVteVdoaWNoID0gc2UuZW5lbXlXaGljaDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5lbXlJZCA9IGJhdHRsZU1haW4uQmF0dGxlQ29uZmlnLmVuZW1pZXNUb1N1bW1vbltlbmVteVdoaWNoXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW50aXRpZXMgPSBiYXR0bGVNYWluLmVudGl0aWVzO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbnMgPSBHZXRFbXB0eVNwb3RzKHNpZGU6MSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9ucy5Db3VudCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjJEIHN1bW1vblBvcyA9IHNlLnByZWZlcmVudGlhbFJvd0NvbHVtbjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBvc2l0aW9ucy5Db250YWlucyhzdW1tb25Qb3MpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbW9uUG9zID0gcG9zaXRpb25zWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChuZXcgU3Bhd25EYXRhKGVuZW15SWQsIHN1bW1vblBvcywgKGludClCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhIGlzIEFuaW1hdGlvbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYW5pbSA9IGEgYXMgQW5pbWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IHRhcmdldCA9IFJlc29sdmVUYXJnZXQoYWN0b3IsIGVudGl0aWVzLCBhbmltLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyZWEgPSBhbmltLmFyZWE7XHJcbiAgICAgICAgICAgICAgICAgICAgSGFwcEFyZWEgaGFwcEFyZWEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmVhICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmZXJlbmNlVXNlck9mQXJlYSA9IFJlc29sdmVUYXJnZXQoYWN0b3IsIGVudGl0aWVzLCBhcmVhLnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgbWlycm9yaW5nWCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rvci5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSkgLy9lbmVtaWVzIGFjdCBvbiBvcHBvc2l0ZSBzaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pcnJvcmluZ1ggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwQXJlYSA9IG5ldyBIYXBwQXJlYShhcmVhLCByZWZlcmVuY2VVc2VyT2ZBcmVhLnBvcywgbWlycm9yaW5nWCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGludCB0YXJnZXRJZCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSBlbnRpdGllcy5JbmRleE9mKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3JlYXRlSGFwcChtZCwgaGFwcEFyZWEsIG5ldyBIYXBwTW92ZURhdGEodXNlcklkLCB0YXJnZXRJZCwgYW5pbS5lbGVtZW50KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmltLnRhcmdldCAhPSBUYXJnZXQuTm9uZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBNYW5hZ2VyXHJcbi5BZGQobmV3IEhhcHAoQmF0dGxlTWFpbi5IYXBwVGFnLkF0dGFja0hpdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoZW50aXRpZXMuSW5kZXhPZih0YXJnZXQpKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZSh1c2VySWQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKChpbnQpYW5pbS5lbGVtZW50KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtb3ZlVGljayA9PSBtZC51bml0cy5Db3VudCAtIDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIG1kLnVuaXRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhY3QgaW4gaXRlbS50aGluZ3NUb0hhcHBlbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3QgaXMgRGVhbERhbWFnZUFjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbmdlRWxlbWVudChhY3RvciwgKGFjdCBhcyBEZWFsRGFtYWdlQWN0aW9uKS5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTGlzdDxWZWN0b3IyRD4gR2V0RW1wdHlTcG90cyhpbnQgc2lkZSA9IC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXV4LkNsZWFyKCk7XHJcbiAgICAgICAgICAgIGludCBvZmZYID0gMDtcclxuICAgICAgICAgICAgaWYgKHNpZGUgPT0gMSkgb2ZmWCA9IDM7XHJcbiAgICAgICAgICAgIGludCB3aWR0aCA9IGJhdHRsZU1haW4uQm9hcmRXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGlmIChzaWRlID09IC0xKVxyXG4gICAgICAgICAgICAgICAgd2lkdGggPSBiYXR0bGVNYWluLkJvYXJkV2lkdGg7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgd2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBiYXR0bGVNYWluLkJvYXJkSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5BZGQobmV3IFZlY3RvcjJEKGkrb2ZmWCxqKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGVudGl0aWVzID0gYmF0dGxlTWFpbi5lbnRpdGllcztcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLkFsaXZlICYmIGF1eC5Db250YWlucyhlLnBvcykpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LlJlbW92ZShlLnBvcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGF1eDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ2hhbmdlRWxlbWVudChCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBhY3RvciwgQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYWN0b3IuZWxlbWVudCA9PSBlbGVtZW50KSByZXR1cm47XHJcbiAgICAgICAgICAgIGFjdG9yLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB2YXIgdGggPSBuZXcgSGFwcFRhZ3MoKGludClNaXNjSGFwcFRhZ3MuQ2hhbmdlRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KHRoLCBuZXcgSGFwcE1vdmVEYXRhKGVudGl0aWVzLkluZGV4T2YoYWN0b3IpLCAtMSwgZWxlbWVudCkpLkFkZENvbXBvbmVudCh0aW1lU3RhbXAuR2V0U25hcCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDcmVhdGVIYXBwKE1vdmVEYXRhIG1kLCBvYmplY3QgY29tcDEsIG9iamVjdCBjb21wMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0aCA9IG5ldyBIYXBwVGFncyhtZC50YWdzKTtcclxuICAgICAgICAgICAgdmFyIGUgPSBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudCh0aCwgdGltZVN0YW1wLkdldFNuYXAoKSk7XHJcbiAgICAgICAgICAgIGlmIChjb21wMSAhPSBudWxsKSBlLkFkZENvbXBvbmVudChjb21wMSk7XHJcbiAgICAgICAgICAgIGlmIChjb21wMiAhPSBudWxsKSBlLkFkZENvbXBvbmVudChjb21wMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ3JlYXRlSGFwcChpbnQgdGFnLCBvYmplY3QgY29tcDEsIG9iamVjdCBjb21wMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0aCA9IG5ldyBIYXBwVGFncyh0YWcpO1xyXG4gICAgICAgICAgICB2YXIgZSA9IGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KHRoLCB0aW1lU3RhbXAuR2V0U25hcCgpKTtcclxuICAgICAgICAgICAgaWYgKGNvbXAxICE9IG51bGwpIGUuQWRkQ29tcG9uZW50KGNvbXAxKTtcclxuICAgICAgICAgICAgaWYgKGNvbXAyICE9IG51bGwpIGUuQWRkQ29tcG9uZW50KGNvbXAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEZWFsRGFtYWdlKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGFjdG9yLCBEZWFsRGFtYWdlQWN0aW9uIGRkYSwgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgdGFyZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQmF0dGxlTWFpbi5FbGVtZW50IGF0dGFja0VsZW1lbnQgPSBkZGEuZWxlbWVudDtcclxuICAgICAgICAgICAgYm9vbCBlbGVtZW50YWxCbG9jayA9IGF0dGFja0VsZW1lbnQgPT0gdGFyZ2V0LmVsZW1lbnQgJiYgYXR0YWNrRWxlbWVudCAhPSBCYXR0bGVNYWluLkVsZW1lbnQuTm9uZTtcclxuICAgICAgICAgICAgYm9vbCBzdXBlckVmZmVjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbnQgZGFtYWdlID0gMDtcclxuICAgICAgICAgICAgaW50IHRhcmdldElkID0gZW50aXRpZXMuSW5kZXhPZih0YXJnZXQpO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudGFsQmxvY2spXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVsZW1lbnRhbEJsb2NrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtdWwgPSBiYXR0bGVNYWluLkNhbGN1bGF0ZUF0dGFja011bHRpcGxpZXIoYWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIG11bCAqPSBiYXR0bGVNYWluLkNhbGN1bGF0ZURlZmVuZGVyTXVsdGlwbGllcih0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRhY2tFbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5GaXJlICYmIHRhcmdldC5lbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5JY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgYXR0YWNrRWxlbWVudCA9PSBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlciAmJiB0YXJnZXQuZWxlbWVudCA9PSBCYXR0bGVNYWluLkVsZW1lbnQuRmlyZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhdHRhY2tFbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5JY2UgJiYgdGFyZ2V0LmVsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWwgKj0gMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXJFZmZlY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhbWFnZSA9IGRkYS5kYW1hZ2UgKiAoaW50KW11bDtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQubGlmZSAtPSBkYW1hZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0b3IuZGFtYWdlTXVsdGlwbGllciA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaGFwcE1hbmFnZXIuQWRkKG5ldyBIYXBwKEJhdHRsZU1haW4uSGFwcFRhZy5EYW1hZ2VUYWtlbikpXHJcbiAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZSh0YXJnZXRJZCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuQ3JlYXRlSGFwcCgoaW50KU1pc2NIYXBwVGFncy5EYW1hZ2UsIG5ldyBIYXBwRGFtYWdlRGF0YSh0YXJnZXQuZWxlbWVudCwgZGRhLmVsZW1lbnQsIGVudGl0aWVzLkluZGV4T2YodGFyZ2V0KSwgZGFtYWdlLCBzdXBlckVmZmVjdGl2ZSwgZWxlbWVudGFsQmxvY2spLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5saWZlIDw9IDAgJiYgIXN1cGVyRWZmZWN0aXZlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDcmVhdGVIYXBwKChpbnQpTWlzY0hhcHBUYWdzLkRlYXRoLCBuZXcgSGFwcE1vdmVEYXRhKHRhcmdldElkKSwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IFJlc29sdmVUYXJnZXQoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgYWN0b3IsIExpc3Q8QmF0dGxlTWFpbi5CYXR0bGVFbnRpdHk+IGVudGl0aWVzLCBUYXJnZXQgdGFyZ2V0VHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRUeXBlID09IFRhcmdldC5TZWxmKSByZXR1cm4gYWN0b3I7XHJcbiAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IHRhcmdldCA9IG51bGw7XHJcbiAgICAgICAgICAgIGZsb2F0IG1pbkRpcyA9IDEwO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZTIgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZTIuRGVhZCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0b3IuVHlwZSAhPSBlMi5UeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgZTIuVHlwZSAhPSBCYXR0bGVNYWluLkVudGl0eVR5cGUucGFuZWxlZmZlY3RcclxuICAgICAgICAgICAgICAgICAgICAmJiBlMi5UeXBlICE9IEJhdHRsZU1haW4uRW50aXR5VHlwZS5waWNrdXApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBzYW1lSGVpZ2h0ID0gYWN0b3IucG9zLlkgPT0gZTIucG9zLlk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzYW1lSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXQgZGlzID0gYWN0b3IucG9zLlggLSBlMi5wb3MuWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcyA8IDApIGRpcyAqPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcyA8IG1pbkRpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluRGlzID0gZGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gZTI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcFRhZ3NcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IHRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwVGFncyhMaXN0PGludD4gdGFncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFncy5BZGRSYW5nZSh0YWdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwVGFncyhpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRhZ3MuQWRkKGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBUYWdzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBNaXNjSGFwcFRhZ3N7XHJcbiAgICAgICAgQ2hhbmdlRWxlbWVudCA9IDUwMCxcclxuICAgICAgICBEYW1hZ2UgPSA1MDEsXHJcbiAgICAgICAgRGVhdGggPSA1MDJcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcERhbWFnZURhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQmF0dGxlTWFpbi5FbGVtZW50IHRhcmdldEUsIGRhbWFnZUU7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCB0YXJnZXQ7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBhbW91bnQ7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvb2wgc3VwZXJFZmZlY3RpdmU7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvb2wgZWxlbWVudGFsQmxvY2s7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwRGFtYWdlRGF0YSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBEYW1hZ2VEYXRhKEJhdHRsZU1haW4uRWxlbWVudCB0YXJnZXRFLCBCYXR0bGVNYWluLkVsZW1lbnQgZGFtYWdlRSwgaW50IHRhcmdldCwgaW50IGFtb3VudCwgYm9vbCBzdXBlckVmZmVjdGl2ZSwgYm9vbCBlbGVtZW50YWxCbG9jaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0RSA9IHRhcmdldEU7XHJcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlRSA9IGRhbWFnZUU7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLmFtb3VudCA9IGFtb3VudDtcclxuICAgICAgICAgICAgdGhpcy5zdXBlckVmZmVjdGl2ZSA9IHN1cGVyRWZmZWN0aXZlO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRhbEJsb2NrID0gZWxlbWVudGFsQmxvY2s7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwTW92ZURhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHVzZXI7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCB0YXJnZXQgPSAtMTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSBCYXR0bGVNYWluLkVsZW1lbnQuTm9uZTtcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBNb3ZlRGF0YSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBNb3ZlRGF0YShpbnQgdXNlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcE1vdmVEYXRhKGludCB1c2VyLCBpbnQgdGFyZ2V0LCBCYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcE1vdmVtZW50XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFZlY3RvcjJEIG1vdmVGcm9tO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBWZWN0b3IyRCBtb3ZlVG87XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvb2wgc3VjY2VzcztcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwTW92ZW1lbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwTW92ZW1lbnQoVmVjdG9yMkQgbW92ZUZyb20sIFZlY3RvcjJEIG1vdmVUbywgYm9vbCBzdWNjZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlRnJvbSA9IG1vdmVGcm9tO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVUbyA9IG1vdmVUbztcclxuICAgICAgICAgICAgdGhpcy5zdWNjZXNzID0gc3VjY2VzcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBBcmVhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEFyZWEgYXJlYTtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQgb2Zmc2V0ID0gbmV3IFZlY3RvcjJEKCk7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBtaXJyb3JpbmdYO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEFyZWEoQXJlYSBhcmVhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwQXJlYSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBBcmVhKEFyZWEgYXJlYSwgVmVjdG9yMkQgb2Zmc2V0LCBpbnQgbWlycm9yaW5nWClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XHJcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgICAgICB0aGlzLm1pcnJvcmluZ1ggPSBtaXJyb3JpbmdYO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkRlYnVnRXh0cmE7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuSGFwcHNcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgQ3VycmVudFRpbWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgTGlzdDxIYXBwPiBIYXBwcyA9IG5ldyBMaXN0PEhhcHA+KCk7XHJcbiAgICAgICAgTGlzdDxIYXBwSGFuZGxlcj4gaGFuZGxlcnMgPSBuZXcgTGlzdDxIYXBwSGFuZGxlcj4oKTtcclxuICAgICAgICBpbnQgbGF0ZXN0SGFuZGxlZCA9IC0xO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRIYW5kbGVyKEhhcHBIYW5kbGVyIGhoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKGhoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFRyeUhhbmRsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihsYXRlc3RIYW5kbGVkICE9IEN1cnJlbnRUaW1lKVxyXG4gICAgICAgICAgICAgICAgSGFuZGxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgSGFuZGxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhdGVzdEhhbmRsZWQgPSBDdXJyZW50VGltZTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGggaW4gaGFuZGxlcnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSBIYXBwcy5Db3VudCAtIDE7IGkgPj0gMDsgaS0tKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcyBjaGVjayBhc3N1bWVzIGhhcHBzIGFyZSBvcmRlcmVkIGJ5IHRpbWUgc3RhbXBcclxuICAgICAgICAgICAgICAgICAgICAvL3doaWNoIHRoZXkgc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSGFwcHNbaV0uVGltZVN0YW1wICE9IEN1cnJlbnRUaW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRGVidWdFeC5Mb2coXCJIYXBwZW5pbmcgbm90IGVxdWFsIHRvIGN1cnJlbnQgdGltZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgaGFzVGFncyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHRhZ3NOZWVkZWQgaW4gaC5uZWNlc3NhcnlUYWdzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFIYXBwc1tpXS5IYXNUYWcodGFnc05lZWRlZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1RhZ3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYXNUYWdzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRGVidWdFeC5Mb2coXCJIYXBwZW5pbmcgaGFuZGxlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaC5IYW5kbGUoSGFwcHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWJ1Z0V4LkxvZyhcIkhhcHBlbmluZyB0YWcgaXMgZGlmZmVyZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHAgQWRkKEhhcHAgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGguVGltZVN0YW1wID0gQ3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgIEhhcHBzLkFkZChoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUaWNrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEN1cnJlbnRUaW1lKys7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwXHJcbiAgICB7XHJcbiAgICAgICAgLy9wdWJsaWMgc3RyaW5nIE1haW5UYWc7XHJcbiAgICAgICAgcHVibGljIExpc3Q8aW50PiB0YWdzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgVGltZVN0YW1wO1xyXG4gICAgICAgIExpc3Q8QXR0cmlidXRlPiBhdHRycyA9IG5ldyBMaXN0PEF0dHJpYnV0ZT4oKTtcclxuXHJcbiAgICAgICAgLy9wdWJsaWMgSGFwcChJQ29udmVydGlibGUgYylcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICB0YWdzLkFkZChDb252ZXJ0LlRvSW50MzIoYykpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcChvYmplY3QgbWFpblRhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vTWFpblRhZyA9IG1haW5UYWcuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdGFncy5BZGQoQ29udmVydC5Ub0ludDMyKG1haW5UYWcpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBBdHRyaWJ1dGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBmbG9hdCBWYWx1ZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIEF0dHJpYnV0ZSBTZXRWYWx1ZShmbG9hdCBmKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBWYWx1ZSA9IGY7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwdWJsaWMgVGFnSG9sZGVyIHRhZ3MgPSBuZXcgVGFnSG9sZGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcCBBZGRBdHRyaWJ1dGUoQXR0cmlidXRlIGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhdHRycy5BZGQoYSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgaW50IEdldEF0dHJpYnV0ZV9JbnQoaW50IGluZGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpYXR0cnNbaW5kZXhdLlZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBIYXNUYWcoaW50IHRhZ3NOZWVkZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFncy5Db250YWlucyh0YWdzTmVlZGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBIYW5kbGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8aW50PiBuZWNlc3NhcnlUYWdzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIHB1YmxpYyBBY3Rpb248SGFwcD4gSGFuZGxlO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEhhbmRsZXIob2JqZWN0IG1haW5UYWcsIEFjdGlvbjxIYXBwPiBoYW5kbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5lY2Vzc2FyeVRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihtYWluVGFnKSk7XHJcbiAgICAgICAgICAgIEhhbmRsZSA9IGhhbmRsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRhZ0hvbGRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PG9iamVjdD4gVGFncyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSGFzVGFnKG9iamVjdCB0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRhZ3MuQ29udGFpbnModCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkZChvYmplY3QgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRhZ3MuQWRkKHYpO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIExpc3Q8b2JqZWN0PiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fVGFncz1uZXcgTGlzdDxvYmplY3Q+KCk7fVxyXG5cclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBJbnB1dEhvbGRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PElucHV0PiBpbnB1dHMgPSBuZXcgTGlzdDxJbnB1dD4oKTtcclxuICAgICAgICBMaXN0PElucHV0VGFncz4gdGFncyA9IG5ldyBMaXN0PElucHV0VGFncz4oKTtcclxuICAgICAgICBwdWJsaWMgSW5wdXQgaW5wdXRGb3JDb25maXJtYXRpb247XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQ2xlYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW5wdXRzLkNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkZChJbnB1dCBpbnB1dCwgSW5wdXRUYWdzIHRhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlucHV0cy5BZGQoaW5wdXQpO1xyXG4gICAgICAgICAgICB0YWdzLkFkZCh0YWcpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgVGFnSXMoaW50IGkyLCBJbnB1dFRhZ3MgdGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRhZ3MuQ291bnQgPD0gaTIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRhZ3NbaTJdID09IHRhZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgQ29udGFpbnMoSW5wdXQga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGkgaW4gaW5wdXRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaS5hcmcxID09IGtleS5hcmcxICYmIGkudHlwZSA9PSBrZXkudHlwZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIElucHV0VGFnc3tcclxuICAgICAgICBOT05FLCBNT1ZFRklYLCBNT1ZFVU5GSVgsIE1JU0NcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1vdmVDcmVhdG9yUHJvZ1xyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcyA9IG5ldyBMaXN0PE1vdmVEYXRhPigpO1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8TW92ZVJlbmRlckRhdGE+IG1vdmVSZW5kZXJzID0gbmV3IExpc3Q8TW92ZVJlbmRlckRhdGE+KCk7XHJcbiAgICAgICAgQXJlYUNyZWF0aW9uVXRpbHMgYXJlYVV0aWxzID0gbmV3IEFyZWFDcmVhdGlvblV0aWxzKCk7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBFQ1NNYW5hZ2VyIGVjcztcclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVDcmVhdG9yUHJvZyhFQ1NNYW5hZ2VyIGVjcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICBNb3ZlRGF0YSBpdGVtID0gbmV3IE1vdmVEYXRhKFwiXCIpO1xyXG4gICAgICAgICAgICBtb3ZlRGF0YXMuQWRkKGl0ZW0pOyAvL2RvIG5vdGhpbmdcclxuICAgICAgICAgICAgbW92ZVJlbmRlcnMuQWRkKG5ldyBNb3ZlUmVuZGVyRGF0YShcIlwiLCBcIlwiKSk7XHJcbiAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KGl0ZW0pO1xyXG4gICAgICAgICAgICBCYXNlVXRpbHMuVmVjdG9yMkRbXSBkaXJlY3Rpb25zID0gbmV3IEJhc2VVdGlscy5WZWN0b3IyRFtdIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgwLCAxKSxcclxuICAgICAgICAgICAgICAgIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoLTEsIDApLFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgwLCAtMSksXHJcbiAgICAgICAgICAgICAgICBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDEsIDApLCBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc3RyaW5nW10gbW92ZUxhYmVscyA9IG5ldyBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgVXBcIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBMZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgRG93blwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIFJpZ2h0XCIsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHN0cmluZ1tdIG1vdmVBYnJldiA9IG5ldyBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgICAgICBcIl5cIixcclxuICAgICAgICAgICAgICAgIFwiPFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2XCIsXHJcbiAgICAgICAgICAgICAgICBcIj5cIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBkaXJlY3Rpb25zLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOZXdNb3ZlRGF0YShsYWJlbDptb3ZlTGFiZWxzW2ldLCBjb25kaXRpb246IG5ldyBDb25kaXRpb24oQ29uZGl0aW9uVHlwZS5DYW5Nb3ZlLCBUYXJnZXQuU2VsZiwgZGlyZWN0aW9uc1tpXSksIGFjdGlvbjogbmV3IE1vdmVBY3Rpb24oVGFyZ2V0LlNlbGYsIGRpcmVjdGlvbnNbaV0pLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuTW92ZW1lbnQsICBNb3ZlRGF0YVRhZ3MuSGVyb0luaXRpYWwpKTtcclxuICAgICAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShuYW1lOm1vdmVMYWJlbHNbaV0sIGFicmV2Om1vdmVBYnJldltpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJHdW5cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5Ob25lKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TaG9vdCkpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJHdW5cIiwgXCJHXCIpO1xyXG5cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkZpcmVndW5cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIEJhdHRsZU1haW4uRWxlbWVudC5GaXJlKSwgbmV3IERlYWxEYW1hZ2VBY3Rpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCAxLCBCYXR0bGVNYWluLkVsZW1lbnQuRmlyZSkpLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuU2hvb3QpKTtcclxuICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKFwiRmlyZWd1blwiLCBcIkZHXCIpO1xyXG5cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJJY2VndW5cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIEJhdHRsZU1haW4uRWxlbWVudC5JY2UpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5JY2UpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkljZWd1blwiLCBcIklHXCIpO1xyXG5cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJUaHVuZGVyZ3VuXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKG5ldyBBbmltYXRpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlciksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgMSwgQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIlRodW5kZXJndW5cIiwgXCJUR1wiKTtcclxuXHJcbiAgICAgICAgICAgIEFyZWEgYXJlYSA9IEFyZWFVc2VyKCkuUm93Rm9yd2FyZCh3aWR0aDogMSwgWERpczogMyk7XHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiSWNlYm9tYlwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKGFyZWEsIEJhdHRsZU1haW4uRWxlbWVudC5JY2UpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihhcmVhLCAxLCBCYXR0bGVNYWluLkVsZW1lbnQuSWNlKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5Cb21iKSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkljZWJvbWJcIiwgXCJJQlwiKTtcclxuXHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiVGh1bmRlcmJvbWJcIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihhcmVhLCBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlciksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKGFyZWEsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5Cb21iKSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIlRodW5kZXJib21iXCIsIFwiVEJcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIlN1bW1vblwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihTdW1tb25FbnRpdHkuRW5lbXkoMCwgbmV3IFZlY3RvcjJEKDUsMCkpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlN1bW1vbikpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJTdW1tb25cIiwgXCJTVVwiKTtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjJEIGRpcmVjdGlvbk1vdmUgPSBuZXcgVmVjdG9yMkQoMCwgLTEpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkRvd25maXJlXCIsXHJcbiAgICAgICAgICAgICAgICB0aWNrczogVGlja0FycmF5KFxyXG4gICAgICAgICAgICAgICAgICAgIFRpY2tVbml0Q29uZGl0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgQ29uZGl0aW9uKENvbmRpdGlvblR5cGUuQ2FuTW92ZSwgVGFyZ2V0LlNlbGYsIGRpcmVjdGlvbk1vdmUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTW92ZUFjdGlvbihUYXJnZXQuU2VsZiwgZGlyZWN0aW9uTW92ZSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIFRpY2tVbml0KG5ldyBBbmltYXRpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCBCYXR0bGVNYWluLkVsZW1lbnQuRmlyZSkpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBUaWNrVW5pdChuZXcgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5GaXJlKSkpLFxyXG4gICAgICAgICAgICAgICAgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkRvd25maXJlXCIsIFwiREZcIik7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBpbnRlcm5hbCBpbnQgR2V0TW92ZUlkKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1vdmVEYXRhLkZpbmRCeUxhYmVsKG1vdmVEYXRhcywgdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIEFyZWFDcmVhdGlvblV0aWxzIEFyZWFVc2VyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFyZWFVdGlscy50YXJnZXQgPSBUYXJnZXQuU2VsZjtcclxuICAgICAgICAgICAgcmV0dXJuIGFyZWFVdGlscztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBBcmVhQ3JlYXRpb25VdGlsc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIFRhcmdldCB0YXJnZXQ7XHJcbiAgICAgICAgICAgIGludCBoZWlnaHQgPSAzO1xyXG5cclxuICAgICAgICAgICAgaW50ZXJuYWwgQXJlYSBSb3dGb3J3YXJkKGludCB3aWR0aCwgaW50IFhEaXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciByYSA9IG5ldyBBcmVhKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBpbnQgb2Zmc2V0WSA9IChpbnQpTWF0aC5GbG9vcigoZmxvYXQpaGVpZ2h0IC8gMmYpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmEucG9pbnRzLkFkZChuZXcgVmVjdG9yMkQoaStYRGlzLCBqLW9mZnNldFkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTmV3TW92ZVRleHRSZW5kZXJEYXRhKHN0cmluZyBuYW1lLCBzdHJpbmcgYWJyZXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3ZlUmVuZGVycy5BZGQobmV3IE1vdmVSZW5kZXJEYXRhKG5hbWUsIGFicmV2KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTmV3TW92ZURhdGEoc3RyaW5nIGxhYmVsLCBUaWNrW10gdGlja3MsIG9iamVjdFtdIHRhZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbXYgPSBuZXcgTW92ZURhdGEobGFiZWwpO1xyXG4gICAgICAgICAgICBtdi51bml0cy5BZGRSYW5nZSh0aWNrcyk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG12LnRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQobXYpO1xyXG4gICAgICAgICAgICBtb3ZlRGF0YXMuQWRkKG12KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBOZXdNb3ZlRGF0YShzdHJpbmcgbGFiZWwsIENvbmRpdGlvbiBjb25kaXRpb24sIG9iamVjdCBhY3Rpb24sIG9iamVjdFtdIHRhZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbXYgPSBuZXcgTW92ZURhdGEobGFiZWwpO1xyXG4gICAgICAgICAgICBUaWNrIHRpY2sgPSBuZXcgVGljaygpO1xyXG4gICAgICAgICAgICB0aWNrLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcclxuICAgICAgICAgICAgdGljay50aGluZ3NUb0hhcHBlbi5BZGQoYWN0aW9uKTtcclxuICAgICAgICAgICAgbXYudW5pdHMuQWRkKHRpY2spO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiB0YWdzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtdi50YWdzLkFkZChDb252ZXJ0LlRvSW50MzIoaXRlbSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG12KTtcclxuICAgICAgICAgICAgbW92ZURhdGFzLkFkZChtdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFRpY2tbXSBPbmVUaWNrUGVyQWN0aW9uKHBhcmFtcyBvYmplY3RbXSBhY3Rpb25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGlja1tdIHRpY2tzID0gbmV3IFRpY2tbYWN0aW9ucy5MZW5ndGhdO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRpY2tzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aWNrc1tpXSA9IG5ldyBUaWNrKGFjdGlvbnNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aWNrcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVGljayBUaWNrVW5pdENvbmRpdGlvbihDb25kaXRpb24gY29uZGl0aW9uLCBwYXJhbXMgT2JqZWN0W10gYWN0aW9ucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRpY2sgdGljayA9IG5ldyBUaWNrKGFjdGlvbnMpO1xyXG4gICAgICAgICAgICB0aWNrLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcclxuICAgICAgICAgICAgcmV0dXJuIHRpY2s7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBUaWNrIFRpY2tVbml0KHBhcmFtcyBPYmplY3RbXSBhY3Rpb25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaWNrKGFjdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBUaWNrW10gVGlja0FycmF5KHBhcmFtcyBUaWNrW10gdGlja3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGlja3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9iamVjdFtdIFRhZ0FycmF5KHBhcmFtcyBvYmplY3RbXSBhcmdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFyZ3M7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBNb3ZlUmVuZGVyRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTGFiZWw7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBBYnJldjtcclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVSZW5kZXJEYXRhKHN0cmluZyBsYWJlbCwgc3RyaW5nIGFicmV2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5MYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgICAgICB0aGlzLkFicmV2ID0gYWJyZXY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIERlc2NyaXB0aW9uIHsgZ2V0OyBpbnRlcm5hbCBzZXQ7IH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkVDU1xyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFjY2Vzc29yXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBMZW5ndGggeyBnZXQgeyByZXR1cm4gU2VsZWN0ZWRFbnRpdGllcy5Db3VudDsgfSB9XHJcblxyXG4gICAgICAgIGludGVybmFsIFR5cGVbXSBUeXBlc1Byb2hpYml0ZWQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBUeXBlW10gVHlwZXNOZWNlc3Nhcnk7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxFbnRpdHk+IFNlbGVjdGVkRW50aXRpZXMgPSBuZXcgTGlzdDxFbnRpdHk+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBY2Nlc3NvcihwYXJhbXMgVHlwZVtdIHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUeXBlc05lY2Vzc2FyeSA9IHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIEVudGl0eUFkZGVkKEVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFNlbGVjdGVkRW50aXRpZXMuQ29udGFpbnMoZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IEdldChpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTZWxlY3RlZEVudGl0aWVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUXVpY2tBY2Nlc3Nvck9uZTxUMT5cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIFF1aWNrQWNjZXNzb3JPbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWNjZXNzb3IgPSBuZXcgQWNjZXNzb3IodHlwZW9mKFQxKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBBY2Nlc3NvciBhY2Nlc3NvcjtcclxuICAgICAgICBwdWJsaWMgaW50IENvdW50IHsgZ2V0IHsgcmV0dXJuIGFjY2Vzc29yLkxlbmd0aDsgfSB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBUMSBDb21wMShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldLkdldENvbXBvbmVudDxUMT4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgRW50aXR5KGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNsYXNzIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBcclxuICAgIHtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgQWNjZXNzb3IgYWNjZXNzb3I7XHJcbiAgICAgICAgcHVibGljIGludCBMZW5ndGggeyBnZXQgeyByZXR1cm4gYWNjZXNzb3IuTGVuZ3RoOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIFQxIENvbXAxKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXNbaV0uR2V0Q29tcG9uZW50PFQxPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBFbnRpdHkoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllc1tpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBRdWlja0FjY2Vzc29yVHdvKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yID0gbmV3IEFjY2Vzc29yKHR5cGVvZihUMSksIHR5cGVvZihUMikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBUMiBDb21wMihpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldLkdldENvbXBvbmVudDxUMj4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIENsb25lZFN0YXRlXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4gY29tcHMgPSBuZXcgRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4oKTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIEVDU01hbmFnZXJcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgRUNTTWFuYWdlcltdIG1hbmFnZXJzID0gbmV3IEVDU01hbmFnZXJbMjBdO1xyXG4gICAgICAgIERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+IGNvbXBzID0gbmV3IERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgRUNTSWQ7XHJcbiAgICAgICAgaW50IGVudGl0eUlkTWF4ID0gLTE7XHJcbiAgICAgICAgTGlzdDxBY2Nlc3Nvcj4gYWNjZXNzb3JzID0gbmV3IExpc3Q8QWNjZXNzb3I+KCk7XHJcblxyXG4gICAgICAgIERpY3Rpb25hcnk8VHlwZSwgQWN0aW9uPE9iamVjdCwgT2JqZWN0Pj4gQ29weU1ldGhvZHMgPSBuZXcgRGljdGlvbmFyeTxUeXBlLCBBY3Rpb248b2JqZWN0LCBvYmplY3Q+PigpO1xyXG5cclxuICAgICAgICBwcml2YXRlIEVDU01hbmFnZXIoKSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFByb2Nlc3NvckFjY2Vzc29yIENyZWF0ZVByb2Nlc3NvcihBY2Nlc3NvciBhY2Nlc3NvciwgQWN0aW9uPEFjY2Vzc29yPiBhY3Rpb24pXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9jZXNzb3JBY2Nlc3NvcihhY3Rpb24sIGFjY2Vzc29yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZENvcHlNZXRob2QoVHlwZSB0eXBlLCBBY3Rpb248b2JqZWN0LCBvYmplY3Q+IGNvcHlNZXRobylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvcHlNZXRob2RzLkFkZCh0eXBlLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPG9iamVjdCwgb2JqZWN0Piljb3B5TWV0aG8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFjY2Vzc29yIENyZWF0ZUFjY2Vzc29yKFR5cGVbXSBuZWNlc3NhcnksIFR5cGVbXSBub3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYWNjID0gbmV3IEFjY2Vzc29yKG5lY2Vzc2FyeSk7XHJcbiAgICAgICAgICAgIGFjYy5UeXBlc1Byb2hpYml0ZWQgPSBub3Q7XHJcbiAgICAgICAgICAgIEFkZEFjY2Vzc29yKGFjYyk7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBRdWlja0FjY2Vzc29yMjxUMSwgVDI+KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBhY2Nlc3NvciA9IG5ldyBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4oKTtcclxuICAgICAgICAgICAgQWRkQWNjZXNzb3IoYWNjZXNzb3IuYWNjZXNzb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUXVpY2tBY2Nlc3Nvck9uZTxUMT4gUXVpY2tBY2Nlc3NvcjE8VDE+KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFF1aWNrQWNjZXNzb3JPbmU8VDE+IGFjY2Vzc29yID0gbmV3IFF1aWNrQWNjZXNzb3JPbmU8VDE+KCk7XHJcbiAgICAgICAgICAgIEFkZEFjY2Vzc29yKGFjY2Vzc29yLmFjY2Vzc29yKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgI3JlZ2lvbiBzdGF0aWMgbWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RhdGljIEVDU01hbmFnZXIgR2V0SW5zdGFuY2UoRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbWFuYWdlcnNbZS5lY3NdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBFQ1NNYW5hZ2VyIENyZWF0ZSgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBtYW5hZ2Vycy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hbmFnZXJzW2ldID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFuYWdlcnNbaV0gPSBuZXcgRUNTTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hbmFnZXJzW2ldLkVDU0lkID0gaTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFuYWdlcnNbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBDcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG9iamVjdCB2KVxyXG4gICAgICAgIHtcclxuRW50aXR5IGU7XG4gICAgICAgICAgICBDcmVhdGVFbnRpdHkob3V0IGUpO1xyXG4gICAgICAgICAgICBBZGRDb21wb25lbnQoZSwgdik7XHJcbiAgICAgICAgICAgIHJldHVybiBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBDcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG9iamVjdCB2LCBvYmplY3QgdjIpXHJcbiAgICAgICAge1xyXG5FbnRpdHkgZTtcbiAgICAgICAgICAgIENyZWF0ZUVudGl0eShvdXQgZSk7XHJcbiAgICAgICAgICAgIEFkZENvbXBvbmVudChlLCB2KTtcclxuICAgICAgICAgICAgQWRkQ29tcG9uZW50KGUsIHYyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IENyZWF0ZUVudGl0eShvdXQgRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbnRpdHlJZE1heCsrO1xyXG4gICAgICAgICAgICBFbnRpdHkgZW50aXR5ID0gbmV3IEVudGl0eSh0aGlzLkVDU0lkLCBlbnRpdHlJZE1heCk7XHJcbiAgICAgICAgICAgIGUgPSBlbnRpdHk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IENyZWF0ZUVudGl0eSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbnRpdHlJZE1heCsrO1xyXG4gICAgICAgICAgICBFbnRpdHkgZW50aXR5ID0gbmV3IEVudGl0eSh0aGlzLkVDU0lkLCBlbnRpdHlJZE1heCk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFByb2Nlc3NvckZsZXg8VDEsIFQyPiBRdWlja1Byb2Nlc3NvckZsZXg8VDEsIFQyPihBY3Rpb248UXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+PiBwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUHJvY2Vzc29yRmxleDxUMSwgVDI+IHByb2Nlc3NvckZsZXggPSBuZXcgUHJvY2Vzc29yRmxleDxUMSwgVDI+KHApO1xyXG4gICAgICAgICAgICBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4gYWNjZXNzb3IgPSBwcm9jZXNzb3JGbGV4LmFjY2Vzc29yO1xyXG4gICAgICAgICAgICBBY2Nlc3NvciBhY2Nlc3NvcjEgPSBhY2Nlc3Nvci5hY2Nlc3NvcjtcclxuICAgICAgICAgICAgQWRkQWNjZXNzb3IoYWNjZXNzb3IxKTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NvckZsZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkQWNjZXNzb3IoQWNjZXNzb3IgYWNjZXNzb3IxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWNjZXNzb3JzLkFkZChhY2Nlc3NvcjEpO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8PSBlbnRpdHlJZE1heDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVBY2Nlc3NvckVudGl0eShhY2Nlc3NvcjEsIGkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZUFjY2Vzc29yRW50aXR5KEFjY2Vzc29yIGFjY2Vzc29yLCBpbnQgZW50aXR5SWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbnRpdHkgZW50aXR5ID0gbmV3IEVudGl0eShFQ1NJZCwgZW50aXR5SWQpO1xyXG4gICAgICAgICAgICBib29sIGJlbG9uZyA9IEhhc0FsbENvbXBzKGFjY2Vzc29yLlR5cGVzTmVjZXNzYXJ5LCBlbnRpdHlJZCkgJiYgSGFzTm9uZU9mVGhlc2VDb21wcyhhY2Nlc3Nvci5UeXBlc1Byb2hpYml0ZWQsIGVudGl0eUlkKTtcclxuICAgICAgICAgICAgYm9vbCBtZW1iZXIgPSBhY2Nlc3Nvci5FbnRpdHlBZGRlZChlbnRpdHkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJlbG9uZyAhPSBtZW1iZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChiZWxvbmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllcy5BZGQoZW50aXR5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiUkVNT1ZFRCBFTlRJVFkgXCIrYWNjZXNzb3IuVHlwZXNOZWNlc3NhcnlbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXMuUmVtb3ZlKGVudGl0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShhY2Nlc3Nvci5FbnRpdHlBZGRlZChlbnRpdHkpK1wiIEJFTE9OR1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENsb25lU3RhdGUoQ2xvbmVkU3RhdGUgY3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY29tcHMgPSB0aGlzLmNvbXBzO1xyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPiBjb21wczIgPSBjcy5jb21wcztcclxuICAgICAgICAgICAgQ29weShjb21wcywgY29tcHMyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc3RvcmVTdGF0ZShDbG9uZWRTdGF0ZSBjcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjb21wcyA9IHRoaXMuY29tcHM7XHJcbiAgICAgICAgICAgIERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+IGNvbXBzMiA9IGNzLmNvbXBzO1xyXG4gICAgICAgICAgICBDb3B5KGNvbXBzMiwgY29tcHMpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPD1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBlbnRpdHlJZE1heDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBhY2Nlc3NvcnMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVXBkYXRlQWNjZXNzb3JFbnRpdHkoaXRlbSwgaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBMaXN0PFR5cGU+IGF1eCA9IG5ldyBMaXN0PFR5cGU+KCk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDb3B5KERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+IGZyb20sIERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+IHRvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXV4LkNsZWFyKCk7XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYyBpbiBmcm9tKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUeXBlIHR5cGUgPSBjLktleTtcclxuICAgICAgICAgICAgICAgIGF1eC5BZGQodHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRvLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvLkFkZCh0eXBlLCBuZXcgb2JqZWN0WzMwMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHRvQXJyYXkgPSB0b1t0eXBlXTtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW4gPSBjLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgQ29weSh0bywgdHlwZSwgdG9BcnJheSwgb3JpZ2luKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYyBpbiB0bykgLy9jaGVja3MgdHlwZXMgaW4gdG8sIHNvIGl0IGNhbiBiZSB0aHJvdWdoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFR5cGUgdHlwZSA9IGMuS2V5O1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhdXguQ29udGFpbnModHlwZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LkFkZCh0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9BcnJheSA9IGMuVmFsdWU7IC8vYWNjZXNzIGludmVydGVkIHdoZW4gY29tcGFyZWQgdG8gcHJldmlvdXNcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciBvcmlnaW4gPSBmcm9tW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdG9BcnJheS5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvQXJyYXlbaV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiUmVtb3ZpbmcgZW50aXR5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ29weShEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPiB0bywgVHlwZSB0eXBlLCBvYmplY3RbXSB0b0FycmF5LCBvYmplY3RbXSBvcmlnaW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBY3Rpb248T2JqZWN0LCBPYmplY3Q+IGNvcHlNZXRob2QgPSBudWxsO1xyXG4gICAgICAgICAgICBDb3B5TWV0aG9kcy5UcnlHZXRWYWx1ZSh0eXBlLCBvdXQgY29weU1ldGhvZCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IG9yaWdpbi5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbltpXSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b0FycmF5W2ldICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiUmVtb3ZpbmcgZW50aXR5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0FycmF5W2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUodHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvQXJyYXlbaV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9BcnJheVtpXSA9IEFjdGl2YXRvci5DcmVhdGVJbnN0YW5jZSh0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihjb3B5TWV0aG9kICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcHlNZXRob2Qob3JpZ2luW2ldLCB0b0FycmF5W2ldKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9EZWVwQ2xvbmVIZWxwZXIuRGVlcENvcHlQYXJ0aWFsKG9yaWdpbltpXSwgdG9BcnJheVtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIFQgQWRkQ29tcG9uZW50PFQ+KEVudGl0eSBlKSB3aGVyZSBUIDogbmV3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFQgdCA9IG5ldyBUKCk7XHJcbiAgICAgICAgICAgIEFkZENvbXBvbmVudChlLCB0KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkQ29tcG9uZW50KEVudGl0eSBlLCBvYmplY3QgdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR5cGUgdHlwZSA9IHQuR2V0VHlwZSgpO1xyXG4gICAgICAgICAgICBpZiAoIWNvbXBzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb21wcy5BZGQodHlwZSwgbmV3IG9iamVjdFszMDBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb21wc1t0eXBlXVtlLmlkXSA9IHQ7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGFjY2Vzc29ycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlQWNjZXNzb3JFbnRpdHkoaXRlbSwgZS5pZCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmVDb21wb25lbnQoRW50aXR5IGUsIG9iamVjdCB0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVHlwZSB0eXBlID0gdC5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIGlmICghY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbXBzLkFkZCh0eXBlLCBuZXcgb2JqZWN0WzMwMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbXBzW3R5cGVdW2UuaWRdID0gbnVsbDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYWNjZXNzb3JzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVBY2Nlc3NvckVudGl0eShpdGVtLCBlLmlkKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBIYXNBbGxDb21wb25lbnRzKEVudGl0eSBlLCBUeXBlW10gdHlwZXNOZWNlc3NhcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgaWQgPSBlLmlkO1xyXG4gICAgICAgICAgICByZXR1cm4gSGFzQWxsQ29tcHModHlwZXNOZWNlc3NhcnksIGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBIYXNBbGxDb21wcyhUeXBlW10gdHlwZXNOZWNlc3NhcnksIGludCBpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0eXBlIGluIHR5cGVzTmVjZXNzYXJ5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcHNbdHlwZV1baWRdID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIEhhc05vbmVPZlRoZXNlQ29tcHMoVHlwZVtdIHR5cGVzUHJvaGliaXRlZCwgaW50IGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVzUHJvaGliaXRlZCA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHR5cGUgaW4gdHlwZXNQcm9oaWJpdGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBzW3R5cGVdW2lkXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBUIEdldENvbXBvbmVudDxUPihFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR5cGUgdHlwZSA9IHR5cGVvZihUKTtcclxuICAgICAgICAgICAgaWYgKCFjb21wcy5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9jb21wcy5BZGQodHlwZSwgbmV3IG9iamVjdFszMDBdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0KFQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAoVCljb21wc1t0eXBlXVtlLmlkXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkVDU1xyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IEVudGl0eSA6IElFcXVhdGFibGU8RW50aXR5PlxyXG4gICAge1xyXG4gICAgICAgIHJlYWRvbmx5IGludGVybmFsIGludCBlY3M7XHJcbiAgICAgICAgcmVhZG9ubHkgaW50ZXJuYWwgaW50IGlkO1xyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5KGludCBlY3MsIGludCBpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBFcXVhbHMoRW50aXR5IG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG90aGVyLmlkID09IHRoaXMuaWQgJiYgb3RoZXIuZWNzID09IHRoaXMuZWNzO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgRXh0ZW5zaW9uTWV0aG9kc1xyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUmVtb3ZlQ29tcG9uZW50KHRoaXMgRW50aXR5IGUsIG9iamVjdCBjb21wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRUNTTWFuYWdlci5HZXRJbnN0YW5jZShlKS5SZW1vdmVDb21wb25lbnQoZSwgY29tcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgQWRkQ29tcG9uZW50PFQ+KHRoaXMgRW50aXR5IGUpIHdoZXJlIFQ6IG5ldygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRUNTTWFuYWdlci5HZXRJbnN0YW5jZShlKS5BZGRDb21wb25lbnQ8VD4oZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBZGRDb21wb25lbnQodGhpcyBFbnRpdHkgZSwgb2JqZWN0IGNvbXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFQ1NNYW5hZ2VyLkdldEluc3RhbmNlKGUpLkFkZENvbXBvbmVudChlLCBjb21wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUIEdldENvbXBvbmVudDxUPih0aGlzIEVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEVDU01hbmFnZXIuR2V0SW5zdGFuY2UoZSkuR2V0Q29tcG9uZW50PFQ+KGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guRUNTXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcm9jZXNzb3JGbGV4PFQxLCBUMj5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEFjdGlvbjxRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4+IHA7XHJcbiAgICAgICAgaW50ZXJuYWwgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+IGFjY2Vzc29yO1xyXG5cclxuICAgICAgICBwdWJsaWMgUHJvY2Vzc29yRmxleChBY3Rpb248UXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+PiBwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wID0gcDtcclxuICAgICAgICAgICAgYWNjZXNzb3IgPSBuZXcgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSdW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcChhY2Nlc3Nvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBQcm9jZXNzb3JBY2Nlc3NvclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgQWN0aW9uPEFjY2Vzc29yPiBwO1xyXG5cclxuICAgICAgICBBY2Nlc3NvciBhO1xyXG5cclxuICAgICAgICBwdWJsaWMgUHJvY2Vzc29yQWNjZXNzb3IoQWN0aW9uPEFjY2Vzc29yPiBwLCBBY2Nlc3NvciBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wID0gcDtcclxuICAgICAgICAgICAgdGhpcy5hID0gYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJ1bigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwKGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFdvcmxkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUgcGFsZXR0ZSA9IERlZmF1bHRQYWxldHRlcy5DNEtpcm9LYXplO1xyXG4gICAgICAgIExpc3Q8VGV4dEVudGl0eT4gYWN0aXZlQWdlbnRzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICBMaXN0PFRleHRFbnRpdHk+IGZyZWVCb2FyZHMgPSBuZXcgTGlzdDxUZXh0RW50aXR5PigpO1xyXG4gICAgICAgIExpc3Q8VGV4dEFuaW1hdGlvbj4gYW5pbWF0aW9ucyA9IG5ldyBMaXN0PFRleHRBbmltYXRpb24+KCk7XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBtYWluQm9hcmQ7XHJcbiAgICAgICAgaW50IGxhdGVzdElkID0gLTE7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUIEFkZEFuaW1hdGlvbjxUPihUIHRhKSB3aGVyZSBUIDogVGV4dEFuaW1hdGlvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYW5pbWF0aW9ucy5BZGQodGEpO1xyXG4gICAgICAgICAgICB0YS5SZWdpc3Rlckxpc3RzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWFpbkJvYXJkID0gbmV3IFRleHRCb2FyZCh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1haW5Cb2FyZC5SZXNldCgpO1xyXG4gICAgICAgICAgICBEcmF3Q2hpbGRyZW4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdDaGlsZHJlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGFjdGl2ZUFnZW50cy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVBZ2VudHNbaV0uUmVzZXRBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbS5Nb2RpZnkoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVBZ2VudHNbaV0uZnJlZUlmSWRsZSAmJiAhYWN0aXZlQWdlbnRzW2ldLmFuaW1hdGluZylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmcmVlQm9hcmRzLkFkZChhY3RpdmVBZ2VudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUFnZW50cy5SZW1vdmUoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkJvYXJkLkluc2VydChhY3RpdmVBZ2VudHNbaV0uQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IEdldEZyZWVFbnRpdHkoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dEVudGl0eSB0ZTtcclxuICAgICAgICAgICAgaWYgKGZyZWVCb2FyZHMuQ291bnQgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZSA9IGZyZWVCb2FyZHNbZnJlZUJvYXJkcy5Db3VudCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgZnJlZUJvYXJkcy5SZW1vdmVBdChmcmVlQm9hcmRzLkNvdW50IC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZSA9IG5ldyBUZXh0RW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICB0ZS5pZCA9ICsrbGF0ZXN0SWQ7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhY3RpdmVBZ2VudHMuQWRkKHRlKTtcclxuICAgICAgICAgICAgdGUuZnJlZUlmSWRsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0ZS5TZXRTaXplKHcsIGgpO1xyXG4gICAgICAgICAgICB0ZS5SZXNldEZ1bGwoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRFbnRpdHkgR2V0VGVtcEVudGl0eShpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGUgPSBHZXRGcmVlRW50aXR5KHcsIGgpO1xyXG4gICAgICAgICAgICB0ZS5mcmVlSWZJZGxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWR2YW5jZVRpbWUoZmxvYXQgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFuaW0uVXBkYXRlKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUcnlFbmRBbmltYXRpb25zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFuaW0uVHJ5RW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRnJlZShMaXN0PFRleHRFbnRpdHk+IGVudGl0aWVzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZyZWVCb2FyZHMuQWRkUmFuZ2UoZW50aXRpZXMpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlQWdlbnRzLlJlbW92ZShpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghYW5pbS5Jc0RvbmUoKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dEVudGl0eVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgaWQ7XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBPcmlnaW47XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBBbmltYXRpb247XHJcbiAgICAgICAgcHVibGljIGJvb2wgZnJlZUlmSWRsZSA9IGZhbHNlO1xyXG4gICAgICAgIGludGVybmFsIGJvb2wgYW5pbWF0aW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodCB7IGdldCB7IHJldHVybiBPcmlnaW4uSGVpZ2h0OyB9IH1cclxuICAgICAgICBwdWJsaWMgaW50IFdpZHRoIHsgZ2V0IHsgcmV0dXJuIE9yaWdpbi5XaWR0aDsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0QW5pbWF0aW9uLkJhc2VEYXRhIEFuaW1CYXNlKGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGV4dEFuaW1hdGlvbi5CYXNlRGF0YShsZW5ndGgsIDAsIGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIFZlY3RvcjJEIEdldFBvc2l0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBPcmlnaW4uUG9zaXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0QW5pbWF0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBBbmltYXRpb24uU2V0KE9yaWdpbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0RnVsbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcmlnaW4uUmVzZXRJbnZpc2libGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0UG9zaXRpb24oaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3JpZ2luLlBvc2l0aW9uID0gbmV3IFZlY3RvcjJEKHgseSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldFBvc2l0aW9uKFZlY3RvcjJEIHZlY3RvcjJEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3JpZ2luLlBvc2l0aW9uID0gdmVjdG9yMkQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldFNpemUoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKE9yaWdpbiA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBPcmlnaW4gPSBuZXcgVGV4dEJvYXJkKHcsIGgpO1xyXG4gICAgICAgICAgICAgICAgQW5pbWF0aW9uID0gbmV3IFRleHRCb2FyZCh3LCBoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPcmlnaW4uUmVzaXplKHcsIGgpO1xyXG4gICAgICAgICAgICBBbmltYXRpb24uUmVzaXplKHcsIGgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERlbGF5c0FuaW1hdGlvbiA6IFRleHRBbmltYXRpb25cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRGVsYXkoZmxvYXQgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZChuZXcgQmFzZURhdGEodiwgMCwgLTEpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBQb3NpdGlvbkFuaW1hdGlvbiA6IFRleHRBbmltYXRpb248UG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhPlxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIFBvc2l0aW9uRGF0YSBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGEsIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQgdGFyZ2V0ID0gZW50aXR5LkFuaW1hdGlvbjtcclxuICAgICAgICAgICAgaWYgKG1haW5EYXRhLnBlcm1hbmVudClcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IGVudGl0eS5PcmlnaW47XHJcbiAgICAgICAgICAgIHRhcmdldC5Qb3NpdGlvbiA9IFZlY3RvcjJELkludGVycG9sYXRlUm91bmRlZChtYWluRGF0YS5zdGFydFBvc2l0aW9uLCBtYWluRGF0YS5lbmRQb3NpdGlvbiwgcHJvZ3Jlc3MgLyBsZW5ndGgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgUG9zaXRpb25EYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBwZXJtYW5lbnQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBWZWN0b3IyRCBzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBQb3NpdGlvbkRhdGEoVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgVmVjdG9yMkQgZW5kUG9zaXRpb24sIGJvb2wgcGVybSA9IGZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJtYW5lbnQgPSBwZXJtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBUZXh0QW5pbWF0aW9uPFQ+IDogVGV4dEFuaW1hdGlvblxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBMaXN0PFQ+IG1haW5EYXRhID0gbmV3IExpc3Q8VD4oKTtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLlJlZ2lzdGVyTGlzdChtYWluRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoQmFzZURhdGEgYmFzZURhdGEsIFQgbWFpbkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkFkZChiYXNlRGF0YSk7XHJcbiAgICAgICAgICAgIG1haW5EYXRhLkFkZChtYWluRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIGludCBpbmRleCwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1vZGlmeShlbnRpdHksIG1haW5EYXRhW2luZGV4XSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgVCBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2ludGVybmFsIG92ZXJyaWRlIHZvaWQgRXhlY3V0ZShpbnQgaW5kZXgsIEJhc2VEYXRhIGJhc2VEYXRhKVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vICAgIHRoaXMuRXhlY3V0ZShtYWluRGF0YVtpbmRleF0sIGJhc2VEYXRhKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy9wdWJsaWMgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKFQgbWFpbkRhdGEsIEJhc2VEYXRhIGJhc2VEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVGV4dEFuaW1hdGlvblxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IEJhc2VEYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgbGVuZ3RoO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgdGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEJhc2VEYXRhKGZsb2F0IGxlbmd0aCwgZmxvYXQgcHJvZ3Jlc3MsIGludCB0YXJnZXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgTGlzdDxmbG9hdD4gbGVuZ3RoID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxmbG9hdD4gcHJvZ3Jlc3MgPSBuZXcgTGlzdDxmbG9hdD4oKTtcclxuICAgICAgICBMaXN0PGludD4gdGFyZ2V0cyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBMaXN0PElMaXN0PiBsaXN0cyA9IG5ldyBMaXN0PElMaXN0PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3Rlckxpc3RzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZChsZW5ndGgpO1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQocHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQodGFyZ2V0cyk7XHJcbiAgICAgICAgICAgIFJlcXVlc3RSZWdpc3Rlckxpc3RzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgdm9pZCBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHByb2dyZXNzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzW2ldICs9IGRlbHRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzW2ldID49IGxlbmd0aFtpXSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc1tpXSA9IGxlbmd0aFtpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0V4ZWN1dGUoaSwgbmV3IEJhc2VEYXRhKGxlbmd0aFtpXSxwcm9ncmVzc1tpXSwgdGFyZ2V0c1tpXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2ludGVybmFsIGFic3RyYWN0IHZvaWQgRXhlY3V0ZShpbnQgaW5kZXgsIEJhc2VEYXRhIGJhc2VEYXRhKTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGQoQmFzZURhdGEgYmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm9ncmVzcy5BZGQoYmQucHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICB0YXJnZXRzLkFkZChiZC50YXJnZXQpO1xyXG4gICAgICAgICAgICBsZW5ndGguQWRkKGJkLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0RvbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbGlzdHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLkNvdW50ICE9IHByb2dyZXNzLkNvdW50KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBzLlRyaW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZ3Jlc3MuQ291bnQgPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRW5kVGFzayhpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBsIGluIGxpc3RzKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbC5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZWdpc3Rlckxpc3QoSUxpc3QgbWFpbkRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQobWFpbkRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcm9ncmVzcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYS5pZCA9PSB0YXJnZXRzW2ldKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE1vZGlmeShhLCBpLCBwcm9ncmVzc1tpXSwgbGVuZ3RoW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBhLmFuaW1hdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBpbnQgaW5kZXgsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBUcnlFbmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcm9ncmVzcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NbaV0gPj0gbGVuZ3RoW2ldKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEVuZFRhc2soaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQYWxldHRlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIEh0bWxDb2xvcnM7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZShwYXJhbXMgc3RyaW5nW10gY29sb3JzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSHRtbENvbG9ycyA9IGNvbG9ycztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERlZmF1bHRQYWxldHRlc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUGFsZXR0ZSBDNEtpcm9LYXplID0gbmV3IFBhbGV0dGUoXCIjMzMyYzUwXCIsIFwiIzQ2ODc4ZlwiLCBcIiM5NGUzNDRcIiwgXCIjZTJmM2U0XCIpO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUGFsZXR0ZSBDNFJlYWRlciA9IG5ldyBQYWxldHRlKFwiIzI2MjYyNlwiLCBcIiM4YjhjYmFcIiwgXCIjOGJiYTkxXCIsIFwiIzY0OWY4ZFwiKTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBhbGV0dGUgQzROb3ZlbCA9IG5ldyBQYWxldHRlKFwiIzI2MjYyNlwiLCBcIiMzNDJkNDFcIiwgXCIjYjhiOGI4XCIsIFwiIzhiOGNiYVwiKTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0QmxhY2sgPSAwO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRCbGFja05ldXRyYWwgPSAxO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRXaGl0ZU5ldXRyYWwgPSAyO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRXaGl0ZSA9IDM7XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlblxyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IE1vdXNlSG92ZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgUmVjdCByZWN0O1xyXG4gICAgICAgIHB1YmxpYyBpbnQgdHlwZTtcclxuICAgICAgICBwdWJsaWMgaW50IGlkO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW91c2VIb3ZlcihSZWN0IHJlY3QsIGludCB0eXBlLCBpbnQgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlY3QgPSByZWN0O1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBNb3VzZUhvdmVyTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PE1vdXNlSG92ZXI+IG1vdXNlSG92ZXJzID0gbmV3IExpc3Q8TW91c2VIb3Zlcj4oKTtcclxuICAgICAgICBwdWJsaWMgTGlzdDxNb3VzZUhvdmVyPiBtb3VzZUhvdmVyc0FjdGl2ZSA9IG5ldyBMaXN0PE1vdXNlSG92ZXI+KCk7XHJcbiAgICAgICAgcHVibGljIE1vdXNlSU8gbW91c2VJTztcclxuXHJcbiAgICAgICAgcHVibGljIE1vdXNlSG92ZXJNYW5hZ2VyKE1vdXNlSU8gbW91c2VJTylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VJTyA9IG1vdXNlSU87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW91c2VIb3ZlcnNBY3RpdmUuQ2xlYXIoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbW91c2VIb3ZlcnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnJlY3QuQ29udGFpbnMobW91c2VJTy5wb3MpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdXNlSG92ZXJzQWN0aXZlLkFkZChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW5cclxue1xyXG4gICAgcHVibGljIGNsYXNzIFVuaWNvZGVSZW1hcFxyXG4gICAge1xyXG5cclxuICAgICAgICBEaWN0aW9uYXJ5PGludCwgaW50PiByZW1hcHMgPSBuZXcgRGljdGlvbmFyeTxpbnQsIGludD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIFVuaWNvZGVSZW1hcCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZW1hcHMuQWRkKFVuaWNvZGUua2V5VXAsICd3Jyk7XHJcbiAgICAgICAgICAgIHJlbWFwcy5BZGQoVW5pY29kZS5rZXlEb3duLCAncycpO1xyXG4gICAgICAgICAgICByZW1hcHMuQWRkKFVuaWNvZGUua2V5TGVmdCwgJ2EnKTtcclxuICAgICAgICAgICAgcmVtYXBzLkFkZChVbmljb2RlLmtleVJpZ2h0LCAnZCcpO1xyXG5cclxuICAgICAgICAgICAgcmVtYXBzLkFkZCgnaScsICcxJyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBSZW1hcChpbnQgdW5pY29kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCByZXN1bHQ7XHJcbiAgICAgICAgICAgIGlmIChyZW1hcHMuVHJ5R2V0VmFsdWUodW5pY29kZSwgb3V0IHJlc3VsdCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHVuaWNvZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dEJvYXJkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgTk9DSEFOR0VDSEFSID0gKGNoYXIpMTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBJTlZJU0lCTEVDSEFSID0gKGNoYXIpMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IE5PQ0hBTkdFQ09MT1IgPSAtMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IElOVklTSUJMRUNPTE9SID0gLTE7XHJcbiAgICAgICAgY2hhclssXSBjaGFycztcclxuICAgICAgICBwdWJsaWMgaW50WyxdIFRleHRDb2xvciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50WyxdIEJhY2tDb2xvciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAvL1N0cmluZ0J1aWxkZXIgc3RyaW5nQnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgaW50IGN1cnNvclggPSAwO1xyXG4gICAgICAgIGludCBjdXJzb3JZID0gMDtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQgUG9zaXRpb24geyBnZXQ7IHNldDsgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZChpbnQgd2lkdGgsIGludCBoZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL1NldE1heFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIFJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdPbkNlbnRlcihzdHJpbmcgbWVzc2FnZSwgaW50IGNvbG9yLCBpbnQgeE9mZiA9IDAsIGludCB5T2ZmID0gMCwgYm9vbCBhbGlnblN0cmluZyA9IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgeCA9IChXaWR0aCkgLyAyO1xyXG4gICAgICAgICAgICBpZiAoYWxpZ25TdHJpbmcpIHggLT0gbWVzc2FnZS5MZW5ndGggLyAyO1xyXG4gICAgICAgICAgICBpbnQgeSA9IEhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIERyYXcobWVzc2FnZSwgeCArIHhPZmYsIHkgKyB5T2ZmLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25DZW50ZXJIb3Jpem9udGFsKHN0cmluZyBtZXNzYWdlLCBpbnQgY29sb3IsIGludCB4T2ZmID0gMCwgaW50IHkgPSAwLCBib29sIGFsaWduU3RyaW5nID0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB4ID0gKFdpZHRoKSAvIDI7XHJcbiAgICAgICAgICAgIGlmIChhbGlnblN0cmluZykgeCAtPSBtZXNzYWdlLkxlbmd0aCAvIDI7XHJcbiAgICAgICAgICAgIERyYXcobWVzc2FnZSwgeCArIHhPZmYsIHksIGNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgU2V0TWF4U2l6ZShpbnQgd2lkdGgsIGludCBoZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjaGFycyA9IG5ldyBjaGFyW3dpZHRoLCBoZWlnaHRdO1xyXG4gICAgICAgICAgICBUZXh0Q29sb3IgPSBuZXcgaW50W3dpZHRoLCBoZWlnaHRdO1xyXG4gICAgICAgICAgICBCYWNrQ29sb3IgPSBuZXcgaW50W3dpZHRoLCBoZWlnaHRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKCcgJywgMCwgMCwgV2lkdGgsIEhlaWdodCwgMCwgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXNldEludmlzaWJsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoSU5WSVNJQkxFQ0hBUiwgMCwgMCwgV2lkdGgsIEhlaWdodCwgSU5WSVNJQkxFQ09MT1IsIElOVklTSUJMRUNPTE9SKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFdpZHRoIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbnNlcnQoVGV4dEJvYXJkIHNlY29uZEJvYXJkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBzZWNvbmRCb2FyZC5XaWR0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IHNlY29uZEJvYXJkLkhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4ID0gKGludClzZWNvbmRCb2FyZC5Qb3NpdGlvbi5YICsgaTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeSA9IChpbnQpc2Vjb25kQm9hcmQuUG9zaXRpb24uWSArIGo7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHggPCAwIHx8IHkgPCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCA+PSBXaWR0aCB8fCB5ID49IEhlaWdodCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZEJvYXJkLmNoYXJzW2ksIGpdICE9IElOVklTSUJMRUNIQVIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzW3gsIHldID0gc2Vjb25kQm9hcmQuY2hhcnNbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZEJvYXJkLlRleHRDb2xvcltpLCBqXSAhPSBJTlZJU0lCTEVDT0xPUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dENvbG9yW3gsIHldID0gc2Vjb25kQm9hcmQuVGV4dENvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRCb2FyZC5CYWNrQ29sb3JbaSwgal0gIT0gSU5WSVNJQkxFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhY2tDb2xvclt4LCB5XSA9IHNlY29uZEJvYXJkLkJhY2tDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBEcmF3UmVjdChjaGFyIGMsIGludCB4LCBpbnQgeSwgaW50IHcsIGludCBoLCBpbnQgdGV4dENvbG9yLCBpbnQgYmFja0NvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKGMsIHgsICAgICAgeSwgICAxLCBoLCB0ZXh0Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChjLCB4K3ctMSwgIHksICAgMSwgaCwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoYywgeCwgICAgICB5LCAgIHcsIDEsIHRleHRDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKGMsIHgsICAgICAgeStoLTEsIHcsIDEsIHRleHRDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSGVpZ2h0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQ3Vyc29yWFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGN1cnNvclg7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclggPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IEN1cnNvclkgeyBnZXQgeyByZXR1cm4gY3Vyc29yWTsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25lRGlnaXQoaW50IGksIGludCB4LCBpbnQgeSwgaW50IGNvbG9yID0gTk9DSEFOR0VDT0xPUiwgaW50IGJhY2tncm91bmQgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hhciBjID0gKGNoYXIpKGkgKyAnMCcpO1xyXG4gICAgICAgICAgICBEcmF3Q2hhcihjLCB4LCB5LCBjb2xvciwgYmFja2dyb3VuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3VHdvRGlnaXRzKGludCBpLCBpbnQgeCwgaW50IHksIGludCBjb2xvciA9IE5PQ0hBTkdFQ09MT1IsIGludCBiYWNrZ3JvdW5kID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdPbmVEaWdpdChpLzEwLHgseSxjb2xvcixiYWNrZ3JvdW5kKTtcclxuICAgICAgICAgICAgRHJhd09uZURpZ2l0KGkgJTEwLCB4KzEsIHksIGNvbG9yLCBiYWNrZ3JvdW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgU2FtZUFzKFRleHRCb2FyZCB0ZXh0Qm9hcmQsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYXJzW3gsIHldID09IHRleHRCb2FyZC5jaGFyc1t4LCB5XVxyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5CYWNrQ29sb3JbeCx5XSA9PSB0ZXh0Qm9hcmQuQmFja0NvbG9yW3gseV1cclxuICAgICAgICAgICAgICAgICYmIHRoaXMuVGV4dENvbG9yW3gseV0gPT0gdGV4dEJvYXJkLlRleHRDb2xvclt4LHldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBDb3B5KFRleHRCb2FyZCB0ZXh0Qm9hcmQsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnNbeCwgeV0gPSB0ZXh0Qm9hcmQuY2hhcnNbeCwgeV07XHJcbiAgICAgICAgICAgIHRoaXMuVGV4dENvbG9yW3gsIHldID0gdGV4dEJvYXJkLlRleHRDb2xvclt4LCB5XTtcclxuICAgICAgICAgICAgdGhpcy5CYWNrQ29sb3JbeCwgeV0gPSB0ZXh0Qm9hcmQuQmFja0NvbG9yW3gsIHldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBEcmF3X0N1cnNvcl9Vbmljb2RlTGFiZWwoaW50IHYsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBsZW4gPSBEcmF3VW5pY29kZUxhYmVsKHYsIGN1cnNvclgsIGN1cnNvclksIGNvbG9yKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBsZW47IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQWR2YW5jZUN1cnNvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgaW50IERyYXdVbmljb2RlTGFiZWwoaW50IHVuaWNvZGUsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHVuaWNvZGUgPj0gJ2EnICYmIHVuaWNvZGUgPD0gJ3onKSB7XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhcigoY2hhcikodW5pY29kZSArICdBJyAtICdhJyksIHgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1bmljb2RlID49ICcwJyAmJiB1bmljb2RlIDw9ICc5JylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIoKGNoYXIpKHVuaWNvZGUpLCB4LCB5LCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdHJpbmcgbGFiZWwgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAodW5pY29kZSA9PSAzMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWwgPSBcIlNQQUNFXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgRHJhdyhsYWJlbCwgeCwgeSwgY29sb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbGFiZWwuTGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXQoVGV4dEJvYXJkIG9yaWdpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUG9zaXRpb24gPSBvcmlnaW4uUG9zaXRpb247XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBIZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJzW2ksIGpdID0gb3JpZ2luLmNoYXJzW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQmFja0NvbG9yW2ksIGpdID0gb3JpZ2luLkJhY2tDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRleHRDb2xvcltpLCBqXSA9IG9yaWdpbi5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzaXplKGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjaGFycyA9PSBudWxsIHx8IHcgPiBjaGFycy5HZXRMZW5ndGgoMCkgfHwgaCA+IGNoYXJzLkdldExlbmd0aCgxKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2V0TWF4U2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBXaWR0aCA9IHc7XHJcbiAgICAgICAgICAgIEhlaWdodCA9IGg7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNoYXIgQ2hhckF0KGludCBpLCBpbnQgailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGFyc1tpLCBqXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEN1cnNvckF0KGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclggPSB4O1xyXG4gICAgICAgICAgICBjdXJzb3JZID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gdilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IoYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKHN0cmluZyB2LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gdilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IoYywgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgQ2FuRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgY3VycmVudFggPSBjdXJzb3JYO1xyXG4gICAgICAgICAgICBpbnQgY3VycmVudFkgPSBjdXJzb3JZO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB2Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBib29sIGxpbmVCcmVhayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBzaG91bGRDaGVja0ZvckxpbmVCcmVha3MgPSAoaSA9PSAwIHx8IHZbaV0gPT0gJyAnKSAmJiBpICE9IHYuTGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChzaG91bGRDaGVja0ZvckxpbmVCcmVha3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDE7IGogPCB2Lkxlbmd0aCAtIGk7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqICsgY3VycmVudFggPj0gV2lkdGgpIC8vcmVhY2ggZW5kIG9mIHRoZSBsaW5lIHdpdGhvdXQgZW5kaW5nIHRoZSB3b3JkLCBzaG91bGQgbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpXSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrOyAvL3NraXAgdGhyb3VnaCB0aGUgc3BhY2UgaWYgaXQncyBhIG5ldyBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWsgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaSArIGpdID09ICcgJykgLy9uZXcgd29yZCBiZWdpbnMgc28gbm8gbmVlZCB0byBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVCcmVhaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRYID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGN1cnJlbnRYKys7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFggPj0gV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFkrKztcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFggPj0gV2lkdGggfHwgY3VycmVudFkgPj0gSGVpZ2h0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERyYXdDdXJzb3JSZXN1bHQgRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBvZmZTdGFydCA9IDA7XHJcbiAgICAgICAgICAgIGludCBvZmZFbmQgPSB2Lkxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIHJldHVybiBEcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayh2LCBjb2xvciwgb2ZmU3RhcnQsIG9mZkVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRHJhd0N1cnNvclJlc3VsdCBEcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhzdHJpbmcgdiwgaW50IGNvbG9yLCBpbnQgb2ZmU3RhcnQsIGludCBvZmZFbmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgVmVjdG9yMkQgc3RhcnQgPSBuZXcgVmVjdG9yMkQoQ3Vyc29yWCwgQ3Vyc29yWSk7XHJcbiAgICAgICAgICAgIGludCBlbmRJbmRleCA9IG9mZkVuZCArIDE7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSBvZmZTdGFydDsgaSA8IGVuZEluZGV4OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBvcmlnaW5YID0gY3Vyc29yWDtcclxuICAgICAgICAgICAgICAgIGJvb2wgbGluZUJyZWFrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBib29sIHNob3VsZENoZWNrRm9yTGluZUJyZWFrcyA9IChpID09IDAgfHwgdltpXSA9PSAnICcpICYmIGkgIT0gZW5kSW5kZXggLSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZENoZWNrRm9yTGluZUJyZWFrcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMTsgaiA8IGVuZEluZGV4IC0gaTsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogKyBvcmlnaW5YID49IFdpZHRoKSAvL3JlYWNoIGVuZCBvZiB0aGUgbGluZSB3aXRob3V0IGVuZGluZyB0aGUgd29yZCwgc2hvdWxkIGxpbmUgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaV0gPT0gJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKzsgLy9za2lwIHRocm91Z2ggdGhlIHNwYWNlIGlmIGl0J3MgYSBuZXcgbGluZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUJyZWFrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2W2kgKyBqXSA9PSAnICcpIC8vbmV3IHdvcmQgYmVnaW5zIHNvIG5vIG5lZWQgdG8gbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsaW5lQnJlYWspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3Vyc29yTmV3TGluZSgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIERyYXdfQ3Vyc29yKHZbaV0sIGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBWZWN0b3IyRCBlbmQgPSBuZXcgVmVjdG9yMkQoQ3Vyc29yWCwgQ3Vyc29yWSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRHJhd0N1cnNvclJlc3VsdChQb3NpdGlvblRvSW5kZXgoc3RhcnQpLCBQb3NpdGlvblRvSW5kZXgoZW5kKSwgc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEF1dG9GaXhHcmlkZGluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKElzR3JpZChpLCBqKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBtYXNrID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKElzR3JpZChpIC0gMSwgaikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2sgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNHcmlkKGkgKyAxLCBqKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzayArPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChJc0dyaWQoaSwgaiAtIDEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrICs9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKElzR3JpZChpLCBqICsgMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2sgKz0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG1hc2spXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkSG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkVmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzW2ksIGpdID0gVW5pY29kZS5Bc2NpaUdyaWRVcExlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbaSwgal0gPSBVbmljb2RlLkFzY2lpR3JpZFVwUmlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbaSwgal0gPSBVbmljb2RlLkFzY2lpR3JpZFVwUmlnaHRMZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzW2ksIGpdID0gVW5pY29kZS5Bc2NpaUdyaWREb3duTGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbaSwgal0gPSBVbmljb2RlLkFzY2lpR3JpZERvd25SaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbaSwgal0gPSBVbmljb2RlLkFzY2lpR3JpZERvd25SaWdodExlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIElzR3JpZChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih4IDwwIHx8IHkgPDAgfHwgeD49IFdpZHRoIHx8IHk+PSBIZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoYXIgYyA9IGNoYXJzW3gsIHldO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBVbmljb2RlLmdyaWRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYyA9PSBpdGVtKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIERyYXdMaW5lcyhpbnQgaGVybywgcGFyYW1zIFZlY3RvcjJEW10gcG9pbnRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwb2ludHMuTGVuZ3RoLTE7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd0xpbmUocG9pbnRzW2ldLCBwb2ludHNbaSsxXSwgaGVybyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd0xpbmUoVmVjdG9yMkQgcG9zMSwgVmVjdG9yMkQgcG9zMiwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hhciBjID0gVW5pY29kZS5Bc2NpaUdyaWRIb3I7XHJcbiAgICAgICAgICAgIGlmIChwb3MxLlkgIT0gcG9zMi5ZKSBjID0gVW5pY29kZS5Bc2NpaUdyaWRWZXI7XHJcbiAgICAgICAgICAgIGludCBoZWlnaHQgPSBwb3MyLllJbnQgLSBwb3MxLllJbnQ7XHJcbiAgICAgICAgICAgIC8vaWYgKGhlaWdodCA8PSAwKSBoZWlnaHQgPSAxO1xyXG4gICAgICAgICAgICBpbnQgd2lkdGggPSBwb3MyLlhJbnQgLSBwb3MxLlhJbnQ7XHJcbiAgICAgICAgICAgIC8vaWYgKHdpZHRoIDw9IDApIHdpZHRoID0gMTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKGMsIHBvczEuWEludCwgcG9zMS5ZSW50LCB3aWR0aCsxLCBoZWlnaHQrMSwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgUG9zaXRpb25Ub0luZGV4KFZlY3RvcjJEIHN0YXJ0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpKHN0YXJ0LlggKyBzdGFydC5ZICogV2lkdGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd09uZURpZ2l0X0N1cnNvcihpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdfQ3Vyc29yKChjaGFyKShpICsgJzAnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihjaGFyIGMpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgY3Vyc29yWCwgY3Vyc29yWSk7XHJcbiAgICAgICAgICAgIEFkdmFuY2VDdXJzb3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKGNoYXIgYywgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIERyYXdDaGFyKGMsIGN1cnNvclgsIGN1cnNvclksIGNvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICBBZHZhbmNlQ3Vyc29yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWR2YW5jZUN1cnNvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdXJzb3JYKys7XHJcbiAgICAgICAgICAgIGlmIChjdXJzb3JYID49IFdpZHRoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JYID0gMDtcclxuICAgICAgICAgICAgICAgIGN1cnNvclkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQ3Vyc29yTmV3TGluZShpbnQgeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclkrKztcclxuICAgICAgICAgICAgY3Vyc29yWCA9IHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hhcihjaGFyIHYsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodiAhPSBOT0NIQU5HRUNIQVIpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJzW3gsIHldID0gdjtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0NoYXIoY2hhciB2LCBpbnQgeCwgaW50IHksIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIodiwgeCwgeSk7XHJcbiAgICAgICAgICAgIFNldENvbG9yKGNvbG9yLCB4LCB5KTtcclxuICAgICAgICAgICAgU2V0QmFja0NvbG9yKGJhY2tDb2xvciwgeCwgeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldEFsbChjaGFyIHRleHQsIGludCB0ZXh0Q29sb3IgPSBOT0NIQU5HRUNPTE9SLCBpbnQgYmFja0NvbG9yPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKHRleHQsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIHRleHRDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0QWxsSWZWaXNpYmxlKGNoYXIgdGV4dCwgaW50IHRleHRDb2xvciA9IE5PQ0hBTkdFQ09MT1IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkSWZWaXNpYmxlKHRleHQsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIHRleHRDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1dpdGhHcmlkKHN0cmluZyB0ZXh0LCBpbnQgeCwgaW50IHksIGludCBncmlkQ29sb3IsIGludCB0ZXh0Q29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgd2lkdGggPSB0ZXh0Lkxlbmd0aDtcclxuICAgICAgICAgICAgRHJhd0dyaWQoeCwgeSwgd2lkdGggKyAyLCAzLCBncmlkQ29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3KHRleHQsIHggKyAxLCB5ICsgMSwgdGV4dENvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoc3RyaW5nIHYsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdi5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHgyID0geCArIGk7XHJcbiAgICAgICAgICAgICAgICBpbnQgeTIgPSB5O1xyXG4gICAgICAgICAgICAgICAgaWYoeDIgPj0gV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDIgLT0gV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgeTIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKHZbaV0sIHgyLCB5MiwgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdXaXRoTGluZWJyZWFrcyhzdHJpbmcgdiwgaW50IHgsIGludCB5LCBpbnQgbmV3bGluZVgsIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbGluZWJyZWFrcyA9IDA7XHJcbiAgICAgICAgICAgIGludCB4T2Zmc2V0bmV3bGluZXMgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHYuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCB4MiA9IHggKyBpKyB4T2Zmc2V0bmV3bGluZXM7XHJcbiAgICAgICAgICAgICAgICBpbnQgeTIgPSB5O1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoeDIgPj0gV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDIgPSB4Mi1XaWR0aCtuZXdsaW5lWDtcclxuICAgICAgICAgICAgICAgICAgICB5MisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICBpZiAodltpXSA9PSAnXFxuJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lYnJlYWtzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgeE9mZnNldG5ld2xpbmVzICs9IG5ld2xpbmVYIC0geDItMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgRHJhd0NoYXIodltpXSwgeDIsIHkyICsgbGluZWJyZWFrcywgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KElFbnVtZXJhYmxlPGNoYXI+IHYsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Db3VudDxjaGFyPih2KTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhcihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkVsZW1lbnRBdDxjaGFyPih2LGkpLCB4ICsgaSwgeSwgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdHcmlkKGludCB4LCBpbnQgeSwgaW50IHdpZHRoLCBpbnQgaGVpZ2h0LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKFVuaWNvZGUuQXNjaWlHcmlkVmVyLCB4LCB5LCAxLCBoZWlnaHQsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKFVuaWNvZGUuQXNjaWlHcmlkVmVyLCB4ICsgd2lkdGggLSAxLCB5LCAxLCBoZWlnaHQsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKFVuaWNvZGUuQXNjaWlHcmlkSG9yLCB4LCB5LCB3aWR0aCwgMSwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoVW5pY29kZS5Bc2NpaUdyaWRIb3IsIHgsIHkgKyBoZWlnaHQgLSAxLCB3aWR0aCwgMSwgY29sb3IpO1xyXG5cclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKChjaGFyKTIxOCwgeCwgeSwgMSwgMSwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoKGNoYXIpMTkyLCB4LCAgICAgICAgICAgICAgeStoZWlnaHQtMSwgMSwgMSwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoKGNoYXIpMjE3LCB4K3dpZHRoLTEsICAgICAgeSsgaGVpZ2h0IC0gMSwgMSwgMSwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoKGNoYXIpMTkxLCB4ICsgd2lkdGggLSAxLCAgeSwgMSwgMSwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1JlcGVhdGVkKGNoYXIgYywgaW50IHgsIGludCB5LCBpbnQgd2lkdGgsIGludCBoZWlnaHQsIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0geDsgaSA8IHggKyB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0geTsgaiA8IHkgKyBoZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBEcmF3Q2hhcihjLCBpLCBqLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFNldEJhY2tDb2xvcihiYWNrQ29sb3IsIGksIGopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3UmVwZWF0ZWRJZlZpc2libGUoY2hhciBjLCBpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodCwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSB4OyBpIDwgeCArIHdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSB5OyBqIDwgeSArIGhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFyc1tpLCBqXSAhPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ0hBUiB8fCBUZXh0Q29sb3JbaSxqXSAhPSBJTlZJU0lCTEVDT0xPUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgRHJhd0NoYXIoYywgaSwgaiwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKEJhY2tDb2xvcltpLGpdICE9IFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2V0QmFja0NvbG9yKGJhY2tDb2xvciwgaSwgaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldENvbG9yKGludCBjb2xvciwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbG9yICE9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICBUZXh0Q29sb3JbeCwgeV0gPSBjb2xvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEJhY2tDb2xvcihpbnQgY29sb3IsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb2xvciAhPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBCYWNrQ29sb3JbeCwgeV0gPSBjb2xvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhzdHJpbmcgdiwgaW50IHgyLCBpbnQgeTIsIG9iamVjdCBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0dyaWQoaW50IHYxLCBpbnQgdjIsIGludCB2MywgaW50IHY0LCBvYmplY3QgYm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgRHJhd0N1cnNvclJlc3VsdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGludCBTdGFydEluZGV4O1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IEVuZEluZGV4O1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgU3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIEVuZFBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIERyYXdDdXJzb3JSZXN1bHQoaW50IHN0YXJ0SW5kZXgsIGludCBlbmRJbmRleCwgVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgVmVjdG9yMkQgZW5kUG9zaXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFN0YXJ0SW5kZXggPSBzdGFydEluZGV4O1xyXG4gICAgICAgICAgICAgICAgRW5kSW5kZXggPSBlbmRJbmRleDtcclxuICAgICAgICAgICAgICAgIFN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgRW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRTY3JlZW5OIDogSVRleHRTY3JlZW4sIElNb3VzZUlucHV0LCBJS2V5Ym9hcmRJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBUZXh0V29ybGQgVGV4dFdvcmxkO1xyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIFVwZGF0ZShmbG9hdCBmKSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRTY3JlZW5OKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dFNjcmVlbk4oVGV4dFdvcmxkIHRleHRXb3JsZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRXb3JsZCA9IHRleHRXb3JsZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyAgdm9pZCBJbml0KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRXb3JsZCA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgVGV4dFdvcmxkLkluaXQodywgaCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTW91c2VFdmVudChNb3VzZUV2ZW50cyBtb3VzZURvd24sIGludCB2MSwgaW50IHYyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0VW5pY29kZSB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgaW50IElucHV0QXNOdW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSW5wdXRVbmljb2RlIC0gNDg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludGVyZmFjZSBJVGV4dFNjcmVlblxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIFRleHRCb2FyZCBHZXRCb2FyZCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZvaWQgVXBkYXRlKGZsb2F0IGYpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSU1vdXNlSW5wdXRcclxuICAgIHtcclxuICAgICAgICB2b2lkIE1vdXNlRXZlbnQoTW91c2VFdmVudHMgZXZlbnRUeXBlLCBpbnQgdjEsIGludCB2Mik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludGVyZmFjZSBJS2V5Ym9hcmRJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBNb3VzZUV2ZW50c1xyXG4gICAgeyBcclxuICAgICAgICBNb3VzZURvd24sXHJcbiAgICAgICAgTm9uZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0U2NyZWVuSG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIElUZXh0U2NyZWVuIFNjcmVlbiB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIElNb3VzZUlucHV0IE1vdXNlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgSUtleWJvYXJkSW5wdXQgS2V5IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRBbGwob2JqZWN0IGRucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNjcmVlbiA9IGRucyBhcyBJVGV4dFNjcmVlbjtcclxuICAgICAgICAgICAgTW91c2UgPSBkbnMgYXMgSU1vdXNlSW5wdXQ7XHJcbiAgICAgICAgICAgIEtleSA9IGRucyBhcyBJS2V5Ym9hcmRJbnB1dDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIGNsYXNzIEF0dGFja1ByZXZpZXdcclxuICAgIHtcclxuICAgICAgICBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEJhdHRsZVJlbmRlciByZW5kZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBRdWlja0FjY2Vzc29yT25lPE1vdmVEYXRhPiBtb3ZlRGF0YXM7XHJcbiAgICAgICAgTGlzdDxUZXh0RW50aXR5PiBlbnRpdGllcyA9IG5ldyBMaXN0PFRleHRFbnRpdHk+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgY3VycmVudE1vdmVJZDtcclxuXHJcbiAgICAgICAgcHVibGljIEF0dGFja1ByZXZpZXcoRUNTTWFuYWdlciBlY3MsIEJhdHRsZVJlbmRlciByZW5kZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIgPSByZW5kZXI7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyLmF0dGFja1ByZXZpZXcgPSB0aGlzO1xyXG4gICAgICAgICAgICBtb3ZlRGF0YXMgPSBlY3MuUXVpY2tBY2Nlc3NvcjE8TW92ZURhdGE+KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2hvd1ByZXZpZXcoaW50IHVzZXIsIGludCBtb3ZlSWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobW92ZUlkID09IGN1cnJlbnRNb3ZlSWQpIHJldHVybjtcclxuICAgICAgICAgICAgRW5kKCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRNb3ZlSWQgPSBtb3ZlSWQ7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJTVEFSVFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJtb3ZlIFwiK21vdmVJZCk7XHJcbiAgICAgICAgICAgIHZhciBtb3ZlRGF0YSA9IG1vdmVEYXRhcy5Db21wMShtb3ZlSWQpO1xyXG4gICAgICAgICAgICBWZWN0b3IyRCBwb3MgPSByZW5kZXIuRW50aXR5U2NyZWVuUG9zaXRpb24odXNlcik7XHJcbiAgICAgICAgICAgIFJlY3QgZ3JpZFJlY3QgPSByZW5kZXIuR2V0R3JpZFJlY3QoKTtcclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIG1vdmVEYXRhLnVuaXRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbXMgPSBpdGVtLnRoaW5nc1RvSGFwcGVuO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHRoaW5nIGluIGl0ZW1zKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGluZyBpcyBEZWFsRGFtYWdlQWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhID0gdGhpbmcgYXMgRGVhbERhbWFnZUFjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGRhLnRhcmdldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0YXJnZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgVGFyZ2V0Lk5vbmU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFRhcmdldC5TZWxmOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXJnZXQuQ2xvc2VzdFRhcmdldDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmcmVlRW50aXR5ID0gcmVuZGVyLnRleHRXb3JsZC5HZXRGcmVlRW50aXR5KGdyaWRSZWN0LlgrZ3JpZFJlY3QuV2lkdGggLSBwb3MuWEludCwxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdGllcy5BZGQoZnJlZUVudGl0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJlZUVudGl0eS5TZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyZWVFbnRpdHkuT3JpZ2luLlNldEFsbChUZXh0Qm9hcmQuSU5WSVNJQkxFQ0hBUiwgVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgVGFyZ2V0LkFyZWE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEVuZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRNb3ZlSWQgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkVORFwiKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRNb3ZlSWQgPSAtMTtcclxuICAgICAgICAgICAgICAgIHJlbmRlci50ZXh0V29ybGQuRnJlZShlbnRpdGllcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwSGFuZGxpbmdcclxuICAgIHtcclxuICAgICAgICBCYXR0bGVSZW5kZXIgYmF0dGxlUmVuZGVyO1xyXG4gICAgICAgIEVDU01hbmFnZXIgZWNzO1xyXG4gICAgICAgIHB1YmxpYyBBY3Rpb24gSGFuZGxlO1xyXG4gICAgICAgIExpc3Q8SGFwcEhhbmRsZXI+IGhhbmRsZXJzID0gbmV3IExpc3Q8SGFwcEhhbmRsZXI+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSBRdWlja0FjY2Vzc29yVHdvPEhhcHBUYWdzLCBUaW1lU3RhbXBTbmFwPiBoYXBwcztcclxuICAgICAgICBwcml2YXRlIGZsb2F0IGhpZ2hlc3RIYW5kbGVkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gaGFuZGxlU3RhdGUuaGlnaGVzdEhhbmRsZWQ7IH1cclxuICAgICAgICAgICAgc2V0IHsgaGFuZGxlU3RhdGUuaGlnaGVzdEhhbmRsZWQgPSB2YWx1ZTsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIEhhcHBIYW5kbGVTdGF0ZSBoYW5kbGVTdGF0ZSA9IG5ldyBIYXBwSGFuZGxlU3RhdGUoKTtcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBIYW5kbGluZyhCYXR0bGVSZW5kZXIgYmF0dGxlUmVuZGVyLCBCYXR0bGVTZXR1cCBiYXR0bGVTZXR1cClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlUmVuZGVyID0gYmF0dGxlUmVuZGVyO1xyXG4gICAgICAgICAgICB2YXIgd29ybGQgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkO1xyXG4gICAgICAgICAgICB2YXIgcG9zQW5pbSA9IHdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLlBvc2l0aW9uQW5pbWF0aW9uPihuZXcgUG9zaXRpb25BbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHZhciBibGlua0FuaW0gPSB3b3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5CbGlua0FuaW0+KG5ldyBCbGlua0FuaW0oKSk7XHJcbiAgICAgICAgICAgIHZhciBkZWxheUFuaW0gPSB3b3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5EZWxheXNBbmltYXRpb24+KG5ldyBEZWxheXNBbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gYmF0dGxlU2V0dXAuZWNzO1xyXG4gICAgICAgICAgICB0aGlzLmVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KGhhbmRsZVN0YXRlKTtcclxuICAgICAgICAgICAgdmFyIGJhdHRsZU1haW4gPSBiYXR0bGVTZXR1cC5iYXR0bGVNYWluO1xyXG4gICAgICAgICAgICB2YXIgdGltZSA9IGJhdHRsZVNldHVwLnRpbWVTdGFtcDtcclxuICAgICAgICAgICAgYmF0dGxlUmVuZGVyLkhhcHBIYW5kbGluZyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGhhcHBzID0gZWNzLlF1aWNrQWNjZXNzb3IyPEhhcHBUYWdzLCBUaW1lU3RhbXBTbmFwPigpO1xyXG4gICAgICAgICAgICBoaWdoZXN0SGFuZGxlZCA9IC0xO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChuZXcgSGFwcEhhbmRsZXIoKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkYW1hZ2UgPSBlLkdldENvbXBvbmVudDxIYXBwRGFtYWdlRGF0YT4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYW1vdW50ID0gZGFtYWdlLmFtb3VudDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHN0cmluZyBtZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhbWFnZS5lbGVtZW50YWxCbG9jaylcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgdGV4dCA9IGRhbWFnZS5kYW1hZ2VFLlRvU3RyaW5nKCkuVG9VcHBlcigpICsgXCIgQkxPQ0sgXCIgKyBkYW1hZ2UudGFyZ2V0RS5Ub1N0cmluZygpLlRvVXBwZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UyID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRUZW1wRW50aXR5KHRleHQuTGVuZ3RoLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGNvbG9yRSA9IEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoZGFtYWdlLmRhbWFnZUUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlMi5PcmlnaW4uRHJhdyh0ZXh0LCAwLCAwLCBjb2xvckUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChtZXNzYWdlMi5BbmltQmFzZSgwLjZmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5Gcm9udENvbG9yKGNvbG9yRSwgMC4yZikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgb2Zmc2V0ID0gKGludClNYXRoLkZsb29yKC10ZXh0Lkxlbmd0aCAvIDJmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTIuU2V0UG9zaXRpb24oYmF0dGxlUmVuZGVyLmJhdHRsZXJSZW5kZXJzW2RhbWFnZS50YXJnZXRdLkdldFBvc2l0aW9uKCkgKyBuZXcgVmVjdG9yMkQoKzEgKyBvZmZzZXQsIC0zKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5QW5pbS5EZWxheSgwLjY1Zik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGJhdHRsZU1haW4uZW50aXRpZXNbZGFtYWdlLnRhcmdldF0ucG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJsYXN0ID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDUsIDUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBibGFzdC5TZXRQb3NpdGlvbihwb3MgKyBuZXcgVmVjdG9yMkQoLTIsIC0yKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBibGFzdC5PcmlnaW4uRHJhd1JlY3QoJyAnLCAwLCAwLCA1LCA1LCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IsIEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoZGFtYWdlLmRhbWFnZUUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9ibGFzdC5PcmlnaW4uRHJhd1JlcGVhdGVkKCcgJywgMSwgMSwgMywgMywgVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SLCBCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGRhbWFnZS5kYW1hZ2VFKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoYmxhc3QuQW5pbUJhc2UoMC4yZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQmFja0NvbG9yKEJhdHRsZVJlbmRlci5Db2xvcnMuaW5wdXRLZXksIDAuMDVmLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gZGFtYWdlLmRhbWFnZUUgKyBcIiBhYnNvcmJzIFwiICsgZGFtYWdlLnRhcmdldEUgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gYmF0dGxlUmVuZGVyLkdldEVudGl0eU5hbWUoZGFtYWdlLnRhcmdldCkgKyBcIiBpcyB1bmFmZWN0dGVkLlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL21lc3NhZ2UgPSBiYXR0bGVSZW5kZXIuR2V0RW50aXR5TmFtZShkYW1hZ2UudGFyZ2V0KSArIFwiIGdldHMgaGl0IVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYW1hZ2Uuc3VwZXJFZmZlY3RpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHRleHQgPSBkYW1hZ2UuZGFtYWdlRS5Ub1N0cmluZygpLlRvVXBwZXIoKSArIFwiIEJSRUFLIFwiICsgZGFtYWdlLnRhcmdldEUuVG9TdHJpbmcoKS5Ub1VwcGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZTIgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkodGV4dC5MZW5ndGgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50IGNvbG9yRSA9IEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoZGFtYWdlLmRhbWFnZUUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTIuT3JpZ2luLkRyYXcodGV4dCwgMCwgMCwgY29sb3JFKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKG1lc3NhZ2UyLkFuaW1CYXNlKDAuNDVmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5Gcm9udENvbG9yKGNvbG9yRSwgMC4yZikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50IG9mZnNldCA9IChpbnQpTWF0aC5GbG9vcigtdGV4dC5MZW5ndGggLyAyZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlMi5TZXRQb3NpdGlvbihiYXR0bGVSZW5kZXIuYmF0dGxlclJlbmRlcnNbZGFtYWdlLnRhcmdldF0uR2V0UG9zaXRpb24oKSArIG5ldyBWZWN0b3IyRCgrMSArIG9mZnNldCwgLTIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5QW5pbS5EZWxheSgwLjY1Zik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21lc3NhZ2UgPSBkYW1hZ2UuZGFtYWdlRSArIFwiIHJhdmFnZXMgXCIgKyBkYW1hZ2UudGFyZ2V0RSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZSArPSBiYXR0bGVSZW5kZXIuR2V0RW50aXR5TmFtZShkYW1hZ2UudGFyZ2V0KStcIiB0YWtlcyBhIGhlYXZ5IGhpdCFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGJhdHRsZU1haW4uZW50aXRpZXNbZGFtYWdlLnRhcmdldF0ucG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBibGFzdCA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eSg1LCA1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsYXN0LlNldFBvc2l0aW9uKHBvcyArIG5ldyBWZWN0b3IyRCgtMiwgLTIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibGFzdC5PcmlnaW4uRHJhd1JlcGVhdGVkKCcgJywgMSwgMSwgMywgMywgVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SLCBCYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoYmxhc3QuQW5pbUJhc2UoMC4yZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQmFja0NvbG9yKEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoZGFtYWdlLmRhbWFnZUUpLCAwLjA1ZikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZSA9IGJhdHRsZVJlbmRlci5HZXRFbnRpdHlOYW1lKGRhbWFnZS50YXJnZXQpICsgXCIgZ2V0cyBodXJ0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGJhdHRsZU1haW4uZW50aXRpZXNbZGFtYWdlLnRhcmdldF0ucG9zKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbnVtYmVyID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDEsIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBWZWN0b3IyRCBpbml0aWFsUG9zID0gcG9zICsgbmV3IFZlY3RvcjJEKDAsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIG51bWJlci5TZXRQb3NpdGlvbihpbml0aWFsUG9zKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyLk9yaWdpbi5EcmF3T25lRGlnaXQoYW1vdW50LCAwLCAwLCBCYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKG51bWJlci5BbmltQmFzZSgwLjZmKSwgbmV3IFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YShpbml0aWFsUG9zLCBpbml0aWFsUG9zICsgbmV3IFZlY3RvcjJEKDAsIC0zKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYmxpbmtBbmltLkFkZChudW1iZXIuQW5pbUJhc2UoMWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkNoYXIoJyAnLCA1ZikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlUmVuZGVyLlNob3dNZXNzYWdlKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkZWZlbmRlciA9IGJhdHRsZVJlbmRlci5iYXR0bGVyUmVuZGVyc1tkYW1hZ2UudGFyZ2V0XTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBmZSA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eShkZWZlbmRlci5XaWR0aCwgZGVmZW5kZXIuSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGlmICghZGFtYWdlLnN1cGVyRWZmZWN0aXZlICYmICFkYW1hZ2UuZWxlbWVudGFsQmxvY2sgXHJcbiAgICAgICAgICAgICAgICAvLyYmIGJhdHRsZU1haW4uZW50aXRpZXNbZGFtYWdlLnRhcmdldF0uQWxpdmVcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmUgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoMywgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJhY2tDb2xvciA9IEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoZGFtYWdlLmRhbWFnZUUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tDb2xvciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHhDb2xvciA9IEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoZGFtYWdlLmRhbWFnZUUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYXIgZGFtYWdlQ2hhciA9ICdYJztcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoZGFtYWdlQ2hhciwgMSwgMCwgeENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihkYW1hZ2VDaGFyLCAxLCAxLCB4Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKGRhbWFnZUNoYXIsIDEsIDIsIHhDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoZGFtYWdlQ2hhciwgMCwgMSwgeENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihkYW1hZ2VDaGFyLCAyLCAxLCB4Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9mZS5PcmlnaW4uRHJhd0NoYXIoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLlBvc2l0aW9uID0gZGVmZW5kZXIuR2V0UG9zaXRpb24oKSArIG5ldyBWZWN0b3IyRCgtMSwgLTEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKGZlLkFuaW1CYXNlKDAuMzVmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5DaGFyKCdaJywgMC4wNWYpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2JsaW5rQW5pbS5BZGQoZmUuQW5pbUJhc2UoMC4zNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm8sIDAuMDVmKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiQ0hBTkdFIEVMRVwiKTtcclxuXHJcbiAgICAgICAgICAgIH0sIE1pc2NIYXBwVGFncy5EYW1hZ2UpKTtcclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKG5ldyBIYXBwSGFuZGxlcigoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZCA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlRGF0YT4oKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc3RyaW5nIHRleHQgPSBobWQuZWxlbWVudC5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkodGV4dC5MZW5ndGgsIDEpO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5PcmlnaW4uRHJhdyh0ZXh0LCAwLCAwLCBCYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm8pO1xyXG4gICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChtZXNzYWdlLkFuaW1CYXNlKDAuNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkZyb250Q29sb3IoQmF0dGxlUmVuZGVyLkNvbG9ycy5JbnB1dERlc2NyaXB0aW9uLCAwLjE1ZikpO1xyXG4gICAgICAgICAgICAgICAgaW50IG9mZnNldCA9IChpbnQpTWF0aC5GbG9vcigtdGV4dC5MZW5ndGggLyAyZik7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLlNldFBvc2l0aW9uKGJhdHRsZVJlbmRlci5iYXR0bGVyUmVuZGVyc1tobWQudXNlcl0uR2V0UG9zaXRpb24oKSArIG5ldyBWZWN0b3IyRCgrMSArIG9mZnNldCwgLTEpKTtcclxuXHJcbiAgICAgICAgICAgIH0sIE1pc2NIYXBwVGFncy5DaGFuZ2VFbGVtZW50KSk7XHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChuZXcgSGFwcEhhbmRsZXIoKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBobWQgPSBlLkdldENvbXBvbmVudDxIYXBwTW92ZURhdGE+KCk7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBkZWZlbmRlciA9IGJhdHRsZVJlbmRlci5iYXR0bGVyUmVuZGVyc1tobWQudGFyZ2V0XTtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihiYXR0bGVNYWluLmVudGl0aWVzW2htZC51c2VyXS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJsYXN0ID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDMsIDMpO1xyXG4gICAgICAgICAgICAgICAgYmxhc3QuU2V0UG9zaXRpb24ocG9zICsgbmV3IFZlY3RvcjJEKC0xLCAtMSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJsYXN0Lk9yaWdpbi5EcmF3UmVwZWF0ZWQoJyAnLCAxLCAxLCAxLCAxLCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IsIEJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChibGFzdC5BbmltQmFzZSgwLjJmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5CYWNrQ29sb3IoQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvLCAwLjA1ZikpO1xyXG4gICAgICAgICAgICAgICAgLy9kZWxheUFuaW0uRGVsYXkoNSk7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJERUFUSFwiKTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkNIQU5HRSBFTEVcIik7XHJcblxyXG4gICAgICAgICAgICB9LCBNaXNjSGFwcFRhZ3MuRGVhdGgpKTtcclxuICAgICAgICAgICAgQWN0aW9uPEVudGl0eT4gbW92ZUhhbmRsZSA9IChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFITNcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG1kID0gZS5HZXRDb21wb25lbnQ8SGFwcE1vdmVEYXRhPigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZiA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlbWVudD4oKTtcclxuICAgICAgICAgICAgICAgIGludCBlSWQgPSBobWQudXNlcjtcclxuICAgICAgICAgICAgICAgIHZhciBtb3ZlciA9IGJhdHRsZU1haW4uZW50aXRpZXNbZUlkXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gbW92ZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zMiA9IGhtZi5tb3ZlVG87XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zRiA9IChwb3MgKyBwb3MyKSAvIDI7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGZlID0gYmF0dGxlUmVuZGVyLmJhdHRsZXJSZW5kZXJzW2VJZF07XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiTW92ZSBmYWlsXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBUFAgTU9WRSBIQU5ETEVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaG1mLnN1Y2Nlc3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yMkQgZmluYWxQb3NTY3JlZW4gPSBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihobWYubW92ZVRvKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3NBbmltLkFkZChmZS5BbmltQmFzZSgwLjJmKSwgbmV3IFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YShcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihobWYubW92ZUZyb20pLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbmFsUG9zU2NyZWVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuU2V0UG9zaXRpb24oZmluYWxQb3NTY3JlZW4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKDAuMmYpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGhtZi5tb3ZlRnJvbSksXHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zRikpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQobmV3IEhhcHBIYW5kbGVyKG1vdmVIYW5kbGUsIE1vdmVEYXRhVGFncy5Nb3ZlbWVudCkpO1xyXG5cclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKG5ldyBIYXBwSGFuZGxlcigoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhID0gZS5HZXRDb21wb25lbnQ8SGFwcEFyZWE+KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG1kID0gZS5HZXRDb21wb25lbnQ8SGFwcE1vdmVEYXRhPigpO1xyXG4gICAgICAgICAgICAgICAgaW50IGVJZCA9IGhtZC51c2VyO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vdmVyID0gYmF0dGxlTWFpbi5lbnRpdGllc1tlSWRdO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgdXNlclJlbmRlciA9IGJhdHRsZVJlbmRlci5iYXR0bGVyRW50aXRpZXNbZUlkXTtcclxuICAgICAgICAgICAgICAgIHZhciBhcmVhID0gaGEuYXJlYTtcclxuICAgICAgICAgICAgICAgIHZhciBwb2ludHMgPSBhcmVhLnBvaW50cztcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdXNlRWZmZWN0ID0gd29ybGQuR2V0VGVtcEVudGl0eSgxLCAxKTtcclxuICAgICAgICAgICAgICAgIHVzZUVmZmVjdC5TZXRQb3NpdGlvbihiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihtb3Zlci5wb3MpKTtcclxuICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQodXNlRWZmZWN0LkFuaW1CYXNlKDAuNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGhtZC5lbGVtZW50KSwgMC4xNWYpKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHBvaW50cylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW50aXR5ID0gd29ybGQuR2V0VGVtcEVudGl0eSgxLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmluYWxQb3MgPSBpdGVtICogbmV3IFZlY3RvcjJEKGhhLm1pcnJvcmluZ1gsIDEpICsgaGEub2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbFBvcy5YIDwgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsUG9zLlkgPCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWxQb3MuWCA+IDUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbFBvcy5ZID4gMikgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKGZpbmFsUG9zLlhJbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShmaW5hbFBvcy5ZSW50KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oZmluYWxQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5TZXRQb3NpdGlvbihwb3MuWEludCwgcG9zLllJbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoZW50aXR5LkFuaW1CYXNlKDAuNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGhtZC5lbGVtZW50KSwgMC4xNWYpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgTW92ZURhdGFUYWdzLkJvbWIpKTtcclxuICAgICAgICAgICAgSGFuZGxlID0gKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBTkRMRSFcIik7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCBuZXdIaWdoZXN0SGFuZGxlZCA9IGhpZ2hlc3RIYW5kbGVkO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBoYXBwcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJBRFZcIitiYXR0bGVSZW5kZXIuQ2FuQWR2YW5jZUdyYXBoaWNzKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYmF0dGxlUmVuZGVyLkNhbkFkdmFuY2VHcmFwaGljcygpKSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFncyA9IGhhcHBzLkNvbXAxKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwID4gaGlnaGVzdEhhbmRsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiBoaWdoZXN0SGFuZGxlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmV3SGlnaGVzdEhhbmRsZWQgPSBoYXBwcy5Db21wMihpKS5UaW1lU25hcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SGlnaGVzdEhhbmRsZWQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJIYW5kbGVkXCIraSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJIQU5ETEUhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib29sIGhhbmRsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGhhbiBpbiBoYW5kbGVycylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBTkRMRSF4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbi5DYW5IYW5kbGUodGFncy50YWdzKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJIYW5kbGVkWFwiICsgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShoYXBwcy5Db21wMihpKS5UaW1lU25hcCArIFwiIC0gXCIgKyB0aW1lLkN1cnJlbnRTbmFwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFITJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuLkhhbmRsZXIoaGFwcHMuRW50aXR5KGkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWhhbmRsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0IGluIHRhZ3MudGFncylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiTm90IGhhbmRsZWQgdGFnIFwiICsgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShoYXBwcy5Db21wMihpKS5UaW1lU25hcCtcIiAtIFwiKyB0aW1lLkN1cnJlbnRTbmFwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBoaWdoZXN0SGFuZGxlZCA9IG5ld0hpZ2hlc3RIYW5kbGVkO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBIYXBwSGFuZGxlU3RhdGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBmbG9hdCBoaWdoZXN0SGFuZGxlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBIYXBwSGFuZGxlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50ZXJuYWwgTGlzdDxpbnQ+IG5lY2Vzc2FyeVRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIEFjdGlvbjxFbnRpdHk+IEhhbmRsZXI7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgSGFwcEhhbmRsZXIoQWN0aW9uPEVudGl0eT4gaGFuZGxlciwgcGFyYW1zIG9iamVjdFtdIHRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0IGluIHRhZ3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVjZXNzYXJ5VGFncy5BZGQoQ29udmVydC5Ub0ludDMyKHQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuSGFuZGxlciA9IGhhbmRsZXI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGludGVybmFsIGJvb2wgQ2FuSGFuZGxlKExpc3Q8aW50PiB0YWdzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBuZWNlc3NhcnlUYWdzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGFncy5Db250YWlucyhpdGVtKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBJc0RvbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhpZ2hlc3RIYW5kbGVkID49IGhhcHBzLkxlbmd0aCAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW47XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBjbGFzcyBIZWxwU2NyZWVuIDogSVRleHRTY3JlZW5fXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dCB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIE1vdXNlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBUZXh0V29ybGQgdGV4dFdvcmxkO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSGVscFNjcmVlbk1vZGVsIG1vZGVsO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgTGlzdDxNb3ZlUmVuZGVyRGF0YT4gbW92ZVJlbmRlcnM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBMaXN0PE1vdmVEYXRhPiBtb3ZlRGF0YXM7XHJcbiAgICAgICAgY2hhciBMZWF2ZUJ1dHRvbjtcclxuICAgICAgICBwdWJsaWMgYm9vbCB3YW5uYUxlYXZlO1xyXG4gICAgICAgIHByaXZhdGUgVGV4dEVudGl0eSBleHBsYW5hdGlvbkVudGl0eTtcclxuXHJcbiAgICAgICAgcHVibGljIEhlbHBTY3JlZW4oSGVscFNjcmVlbk1vZGVsIGhlbHBNb2RlbCwgTGlzdDxNb3ZlUmVuZGVyRGF0YT4gbW92ZVJlbmRlcnMsIExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuSW5pdChHYW1lTWFpbi5XaWR0aCwgR2FtZU1haW4uSGVpZ2h0KTtcclxuICAgICAgICAgICAgbW9kZWwgPSBoZWxwTW9kZWw7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVJlbmRlcnMgPSBtb3ZlUmVuZGVycztcclxuICAgICAgICAgICAgdGhpcy5tb3ZlRGF0YXMgPSBtb3ZlRGF0YXM7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuU2V0QWxsKFRleHRCb2FyZC5JTlZJU0lCTEVDSEFSLCBCYXR0bGVSZW5kZXIuQ29sb3JzLkJhY2tDb21tYW5kLCBCYXR0bGVSZW5kZXIuQ29sb3JzLkJhY2tDb21tYW5kKTtcclxuICAgICAgICAgICAgZXhwbGFuYXRpb25FbnRpdHkgPSB0ZXh0V29ybGQuR2V0RnJlZUVudGl0eShHYW1lTWFpbi5XaWR0aC00LCAzNSk7XHJcbiAgICAgICAgICAgIGV4cGxhbmF0aW9uRW50aXR5LlNldFBvc2l0aW9uKDIsIDQpO1xyXG4gICAgICAgICAgICAvL2V4cGxhbmF0aW9uRW50aXR5Lk9yaWdpbi5EcmF3KFwiU1NTX19TU1NTREFTREFTREFTXCIsIDAsMCwgQmF0dGxlUmVuZGVyLkNvbG9ycy5JbnB1dERlc2NyaXB0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IElucHV0VW5pY29kZTtcclxuICAgICAgICAgICAgaWYgKGlucHV0ID09IExlYXZlQnV0dG9uKSB3YW5uYUxlYXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdGV4dFdvcmxkLm1haW5Cb2FyZC5SZXNldCgpO1xyXG4gICAgICAgICAgICBpbnQgcG9zID0gMDtcclxuICAgICAgICAgICAgLy90ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdXaXRoTGluZWJyZWFrcyhcIklucHV0IHlvdXIgY29tbWFuZHMgYW5kIHdhdGNoIHRoZSB0dXJuIHBsYXkgb3V0LiBZb3UgY2FuIHNlZSBldmVyeXRoaW5nIHlvdXIgZW5lbWllcyB3aWxsIGRvXFxuXFxuQXR0YWNrcyBoYXZlIHRocmVlIGVsZW1lbnRzLCBGaXJlLCBUaHVuZGVyIGFuZCBJY2UuIEZpcmUgYmVhdHMgSWNlLCBJY2UgYmVhdHMgVGh1bmRlciwgVGh1bmRlciBiZWF0cyBGaXJlLlxcblRoZSBlbGVtZW50IG9mIHRoZSBhdHRhY2tlciBjaGFuZ2VzIHVwb24gYXR0YWNraW5nLiBBdHRhY2tlcnMgYXJlIGltbXVuZSB0byBhdHRhY2tzIG9mIHRoZSBzYW1lIGVsZW1lbnQhXCIsIDIsIHBvcywgMCwgQmF0dGxlUmVuZGVyLkNvbG9ycy5pbnB1dEtleSwgVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SKTtcclxuICAgICAgICAgICAgZXhwbGFuYXRpb25FbnRpdHkuT3JpZ2luLlNldEN1cnNvckF0KDAsIDApO1xyXG4gICAgICAgICAgICAvL2lmICghbW9kZWwuYmF0dGxlSW50cm9Nb2RlKXtcclxuICAgICAgICAgICAgaWYgKGZhbHNlKSB7IFxyXG4gICAgICAgICAgICAgICAgZXhwbGFuYXRpb25FbnRpdHkuT3JpZ2luLkRyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKFwiSW5wdXQgeW91ciBjb21tYW5kcyBhbmQgd2F0Y2ggdGhlIHR1cm4gcGxheSBvdXQuIFBsYW4geW91ciBtb3ZlcyBiYXNlZCBvbiB3aGF0IHRoZSBlbmVteSB3aWxsIGRvIVwiLCBCYXR0bGVSZW5kZXIuQ29sb3JzLklucHV0RGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgZXhwbGFuYXRpb25FbnRpdHkuT3JpZ2luLkN1cnNvck5ld0xpbmUoMCk7XHJcbiAgICAgICAgICAgICAgICBleHBsYW5hdGlvbkVudGl0eS5PcmlnaW4uQ3Vyc29yTmV3TGluZSgwKTtcclxuICAgICAgICAgICAgICAgIGV4cGxhbmF0aW9uRW50aXR5Lk9yaWdpbi5EcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhcIkF0dGFja3MgaGF2ZSB0aHJlZSBlbGVtZW50cywgRmlyZSwgVGh1bmRlciBhbmQgSWNlLiBGaXJlIGJlYXRzIEljZSwgSWNlIGJlYXRzIFRodW5kZXIsIFRodW5kZXIgYmVhdHMgRmlyZS5cIiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5JbnB1dERlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGV4cGxhbmF0aW9uRW50aXR5Lk9yaWdpbi5DdXJzb3JOZXdMaW5lKDApO1xyXG4gICAgICAgICAgICAgICAgZXhwbGFuYXRpb25FbnRpdHkuT3JpZ2luLkN1cnNvck5ld0xpbmUoMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbGFuYXRpb25FbnRpdHkuT3JpZ2luLkRyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKFwiVGhlIGVsZW1lbnQgb2YgdGhlIGF0dGFja2VyIGNoYW5nZXMgdXBvbiBhdHRhY2tpbmcuIEF0dGFja2VycyBhcmUgaW1tdW5lIHRvIGF0dGFja3Mgb2YgdGhlIHNhbWUgZWxlbWVudCFcIiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5JbnB1dERlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHBvcyArPSAxODtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcG9zID0gNTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGV4dFdvcmxkLkRyYXcoKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3V2l0aExpbmVicmVha3MoXCJJbnB1dCB5b3VyIGNvbW1hbmRzIGFuZCB3YXRjaCB0aGUgdHVybiBwbGF5IG91dC4gWW91IGNhbiBzZWUgZXZlcnl0aGluZyB5b3VyIGVuZW1pZXMgd2lsbCBkb1xcblwiLCAyLCBwb3MsIDIsIEJhdHRsZVJlbmRlci5Db2xvcnMuSW5wdXREZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3KFwiWU9VUiBDT01NQU5EU1wiLCAyLCBwb3MtMiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbCk7XHJcbiAgICAgICAgICAgIHN0cmluZyBtZW51VGl0bGUgPSBcIkhFTFBcIjtcclxuICAgICAgICAgICAgc3RyaW5nIGxlYXZlTGFiZWwgPSBcIkVYSVRcIjtcclxuICAgICAgICAgICAgaWYgKG1vZGVsLmJhdHRsZUludHJvTW9kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGVhdmVMYWJlbCA9IFwiU1RBUlRcIjtcclxuICAgICAgICAgICAgICAgIG1lbnVUaXRsZSA9IFwiQkFUVExFIElOVFJPXCI7XHJcbiAgICAgICAgICAgICAgICBMZWF2ZUJ1dHRvbiA9IChjaGFyKVVuaWNvZGUuU3BhY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMZWF2ZUJ1dHRvbiA9ICd4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlckhvcml6b250YWwobWVudVRpdGxlLCBCYXR0bGVSZW5kZXIuQ29sb3JzLldpbmRvd0xhYmVsLCAwLCAxKTtcclxuXHJcbiAgICAgICAgICAgIExpc3Q8aW50PiBjb21tYW5kTGlzdCA9IG1vZGVsLmNvbW1hbmRzSGVybztcclxuICAgICAgICAgICAgcG9zID0gU2hvd0NvbW1hbmRzKHBvcywgY29tbWFuZExpc3QpO1xyXG4gICAgICAgICAgICBwb3MgKz0gNDtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3KFwiRU5FTVkgQ09NTUFORFNcIiwgMiwgcG9zLCBCYXR0bGVSZW5kZXIuQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuICAgICAgICAgICAgcG9zICs9IDI7XHJcbiAgICAgICAgICAgIHBvcyA9IFNob3dDb21tYW5kcyhwb3MsIG1vZGVsLmNvbW1hbmRzRW5lbXkpO1xyXG5cclxuICAgICAgICAgICAgR2FtZU1haW4uRHJhd0lucHV0KDEsIHBvcyArIDMsIExlYXZlQnV0dG9uLCBsZWF2ZUxhYmVsLCB0ZXh0V29ybGQubWFpbkJvYXJkKTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgU2hvd0NvbW1hbmRzKGludCBwb3MsIExpc3Q8aW50PiBjb21tYW5kTGlzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY29tbWFuZExpc3QuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiRFJBV1dXXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGludCBjb21tYW5kID0gY29tbWFuZExpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBib29sIGRyYXdGbGFnID0gQ2hlY2tEcmF3Q29tbWFuZChjb21tYW5kKTtcclxuICAgICAgICAgICAgICAgIGlmIChkcmF3RmxhZylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXcobW92ZVJlbmRlcnNbY29tbWFuZF0uQWJyZXYsIDIsIHBvcywgQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3KG1vdmVSZW5kZXJzW2NvbW1hbmRdLkxhYmVsLlRvVXBwZXIoKSwgNSwgcG9zLCBCYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXcobW92ZVJlbmRlcnNbY29tbWFuZF0uRGVzY3JpcHRpb24sIDMsIHBvcyArIDEsIEJhdHRsZVJlbmRlci5Db2xvcnMuSW5wdXREZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zICs9IDM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIElzU2hvd2luZ0NvbW1hbmRJbkxpc3QoTGlzdDxpbnQ+IGNvbW1hbmRMaXN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb21tYW5kTGlzdC5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJEUkFXV1dcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaW50IGNvbW1hbmQgPSBjb21tYW5kTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChDaGVja0RyYXdDb21tYW5kKGNvbW1hbmQpKSByZXR1cm4gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgQ2hlY2tEcmF3Q29tbWFuZChpbnQgY29tbWFuZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJvb2wgZHJhd0ZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGNvbW1hbmQgPj0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShjb21tYW5kKTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoKTtcclxuICAgICAgICAgICAgICAgIHZhciBtZCA9IG1vdmVEYXRhc1tjb21tYW5kXTtcclxuICAgICAgICAgICAgICAgIGlmICghbWQuSGFzVGFnKChpbnQpTW92ZURhdGFUYWdzLk1vdmVtZW50KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3RmxhZyA9IG1vdmVSZW5kZXJzW2NvbW1hbmRdLkxhYmVsLkxlbmd0aCAhPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkcmF3RmxhZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHRXb3JsZC5tYWluQm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNob3coKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWwuUmVmcmVzaERhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgSGVscE1vZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWwuYmF0dGxlSW50cm9Nb2RlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIElzV2FubmFTaG93SW50cm8oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWwuUmVmcmVzaERhdGEoKTtcclxuICAgICAgICAgICAgcmV0dXJuIElzU2hvd2luZ0NvbW1hbmRJbkxpc3QobW9kZWwuY29tbWFuZHNFbmVteSkgfHwgSXNTaG93aW5nQ29tbWFuZEluTGlzdChtb2RlbC5jb21tYW5kc0hlcm8pO1xyXG4gICAgICAgICAgICAvL3JldHVybiBtb2RlbC5jb21tYW5kc0VuZW15LkNvdW50ICE9IDAgfHwgbW9kZWwuY29tbWFuZHNIZXJvLkNvdW50ICE9IDA7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgTW91c2VJTyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fTW91c2U9bmV3IE1vdXNlSU8oKTt9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhlbHBTY3JlZW5Nb2RlbFxyXG4gICAge1xyXG4gICAgICAgIEJhdHRsZU1haW4gYmF0dGxlTWFpbjtcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IGNvbW1hbmRzSGVybyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IGNvbW1hbmRzRW5lbXkgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIGJvb2wgYmF0dGxlSW50cm9Nb2RlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIZWxwU2NyZWVuTW9kZWwoQmF0dGxlTWFpbiBiYXR0bGVNYWluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVNYWluID0gYmF0dGxlTWFpbjtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWZyZXNoRGF0YSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb21tYW5kc0hlcm8uQ2xlYXIoKTtcclxuICAgICAgICAgICAgQWRkQWxsKGJhdHRsZU1haW4ucGxheWVySGFuZEZpeGVkLCBjb21tYW5kc0hlcm8pO1xyXG4gICAgICAgICAgICBBZGRBbGwoYmF0dGxlTWFpbi5wbGF5ZXJIYW5kVW5maXhlZCwgY29tbWFuZHNIZXJvKTtcclxuICAgICAgICAgICAgQWRkQWxsKGJhdHRsZU1haW4ucGxheWVySGFuZFBvb2wsIGNvbW1hbmRzSGVybyk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGJhdHRsZU1haW4uZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEFkZEFsbEFycmF5KGl0ZW0ubW92ZXMsIGNvbW1hbmRzRW5lbXkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEFkZEFsbChMaXN0PEJhdHRsZU1haW4uTW92ZVR5cGU+IG1vdmVzLCBMaXN0PGludD4gY29tbWFuZHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbSBpbiBtb3ZlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IGEgPSAoaW50KSBtO1xyXG4gICAgICAgICAgICAgICAgaWYgKGEgPCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmICghY29tbWFuZHMuQ29udGFpbnMoYSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMuQWRkKGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkQWxsQXJyYXkoaW50W10gbW92ZXMsIExpc3Q8aW50PiBjb21tYW5kcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhIGluIG1vdmVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYSA8IDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjb21tYW5kcy5Db250YWlucyhhKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kcy5BZGQoYSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSW5wdXRIYW5kbGluZ1xyXG4gICAge1xyXG4gICAgICAgIGludFtdIHVuZml4ZWRDb21tYW5kS2V5cyA9IHsnMScsICcyJywnMycsJzQnIH07XHJcbiAgICAgICAgRGljdGlvbmFyeTxJbnB1dCwgaW50PiBmaXhlZE1vdmVCdXR0b25zID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8SW5wdXQsIGludD4oKSwoX28xKT0+e19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLk5vcm1hbFNob3QpLCdnJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSksJ2YnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2UpLCdpJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYiksJ2InKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyQm9tYiksJ3knKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyKSwndCcpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVSaWdodCksJ2QnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXApLCd3Jyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24pLCdzJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQpLCdhJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5Eb25lKSxVbmljb2RlLlNwYWNlKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LlJlZG8pLCdyJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5QcmV2aWV3KSwncCcpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuSGVscCksJ2gnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LkNhbmNlbCksJ3InKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LkNvbmZpcm0pLFVuaWNvZGUuU3BhY2UpO3JldHVybiBfbzE7fSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgR2V0Rml4ZWRNb3ZlVW5pY29kZShJbnB1dCBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKGZpeGVkTW92ZUJ1dHRvbnMuVHJ5R2V0VmFsdWUoaW5wdXQsIG91dCB2YWx1ZSkpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBJbnB1dCBJbnB1dHRlZChpbnQgdW5pY29kZUtleSwgSW5wdXRIb2xkZXIgaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiIGlucHV0ICsgXCIrKGNoYXIpdW5pY29kZUtleSk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGZpeGVkTW92ZUJ1dHRvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLlZhbHVlID09IHVuaWNvZGVLZXkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXQuQ29udGFpbnMoaXRlbS5LZXkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5LZXk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB1bmZpeGVkQ29tbWFuZEtleXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh1bmZpeGVkQ29tbWFuZEtleXNbaV0gPT0gdW5pY29kZUtleSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgdW5maXhlZENvbW1hbmRQb3MgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkyID0gMDsgaTIgPCBpbnB1dC5pbnB1dHMuQ291bnQ7IGkyKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuVGFnSXMoaTIsIElucHV0VGFncy5NT1ZFVU5GSVgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5maXhlZENvbW1hbmRQb3MgPT0gaSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQuaW5wdXRzW2kyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZml4ZWRDb21tYW5kUG9zKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHQoSW5wdXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1lc3NhZ2VPblBvc2l0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgQmF0dGxlUmVuZGVyIGJhdHRsZVJlbmRlcjtcclxuICAgICAgICBwcml2YXRlIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcbiAgICAgICAgcHJpdmF0ZSBCbGlua0FuaW0gYmxpbmtBbmltO1xyXG5cclxuICAgICAgICBwdWJsaWMgTWVzc2FnZU9uUG9zaXRpb24oQmF0dGxlUmVuZGVyIGJhdHRsZVJlbmRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZCA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQ7XHJcbiAgICAgICAgICAgIGJsaW5rQW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5CbGlua0FuaW0+KG5ldyBCbGlua0FuaW0oKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBNZXNzYWdlT25Qb3MoVmVjdG9yMkQgcG9zLCBzdHJpbmcgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBlbnRpdHkgPSB0ZXh0V29ybGQuR2V0VGVtcEVudGl0eSh2Lkxlbmd0aCArIDIsIDYpO1xyXG4gICAgICAgICAgICBibGlua0FuaW0uQWRkKGVudGl0eS5BbmltQmFzZSgyZiksIG5ldyBCbGlua0FuaW0uQmxpbmtEYXRhKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgMC4zNWYsIDAuMzVmKSk7XHJcbiAgICAgICAgICAgIHZhciB4T2ZmID0gKHYuTGVuZ3RoIC0gMykgLyAyO1xyXG4gICAgICAgICAgICBpZiAoeE9mZiA8IDApIHhPZmYgPSAwO1xyXG4gICAgICAgICAgICB2YXIgbGluZVN0YXJ0ID0gbmV3IFZlY3RvcjJEKHhPZmYsIDApO1xyXG4gICAgICAgICAgICBlbnRpdHkuU2V0UG9zaXRpb24ocG9zICsgbmV3IFZlY3RvcjJEKDEgLSB4T2ZmLCAwKSk7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShwb3MpO1xyXG4gICAgICAgICAgICAvL2VudGl0eS5PcmlnaW4uRHJhdyh2LCAxLCA1KTtcclxuICAgICAgICAgICAgZW50aXR5Lk9yaWdpbi5EcmF3V2l0aEdyaWQodiwgMCwgMywgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVybywgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVybyk7XHJcblxyXG4gICAgICAgICAgICBlbnRpdHkuT3JpZ2luLkRyYXdMaW5lcyhQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvLCBsaW5lU3RhcnQsIGxpbmVTdGFydCArIG5ldyBWZWN0b3IyRCgyLCAwKSwgbGluZVN0YXJ0ICsgbmV3IFZlY3RvcjJEKDIsIDIpKTtcclxuICAgICAgICAgICAgZW50aXR5Lk9yaWdpbi5BdXRvRml4R3JpZGRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlbjtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNb3VzZUhvdmVyVGV4dFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmdbXVtdIHRleHRzID0gbmV3IHN0cmluZ1szXVtdO1xyXG4gICAgICAgIHB1YmxpYyBNb3VzZUhvdmVyTWFuYWdlciBob3Zlck1hbmFnZXI7XHJcbiAgICAgICAgcHVibGljIFRleHRFbnRpdHkgZW50aXR5O1xyXG5cclxuICAgICAgICBwdWJsaWMgTW91c2VIb3ZlclRleHQoTW91c2VIb3Zlck1hbmFnZXIgaG92ZXJNYW5hZ2VyLCBUZXh0RW50aXR5IGVudGl0eSwgc3RyaW5nW10gbW92ZURlc2NyaXB0aW9ucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaG92ZXJNYW5hZ2VyID0gaG92ZXJNYW5hZ2VyO1xyXG4gICAgICAgICAgICB0aGlzLmVudGl0eSA9IGVudGl0eTtcclxuICAgICAgICAgICAgLy90ZXh0c1swXSA9IG5ldyBzdHJpbmdbRW51bS5HZXRWYWx1ZXModHlwZW9mKEJhdHRsZU1haW4uTW92ZVR5cGUpKS5MZW5ndGhdO1xyXG5cclxuICAgICAgICAgICAgdGV4dHNbMF0gPSBtb3ZlRGVzY3JpcHRpb25zO1xyXG4gICAgICAgICAgICAvL0RvbmUsXHJcbiAgICAgICAgLy8gICAgUmVkbyxcclxuICAgICAgICAvL1ByZXZpZXcsXHJcbiAgICAgICAgLy9Db25maXJtLFxyXG4gICAgICAgIC8vQ2FuY2VsXHJcbiAgICAgICAgICAgIHRleHRzWzFdID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiU3RhcnRzIGNvbW1hbmQgZXhlY3V0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcIlJlbW92ZXMgdGhlIGxhc3QgaW5wdXR0ZWQgY29tbWFuZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJQcmV2aWV3IG1vdmVzIG9mIHRoZSBvcHBvbmVudHNcIixcclxuICAgICAgICAgICAgICAgIFwiSW5wdXRzIG1vdmVcIixcclxuICAgICAgICAgICAgICAgIFwiUmV0dXJuc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJTaG93cyBoZWxwZnVsIGluZm9ybWF0aW9uXCIsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRleHRzWzJdID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiTW92ZXMgaW4gdGhlIGNvcnJlc3BvbmRpbmcgZGlyZWN0aW9uXCIsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVudGl0eS5SZXNldEZ1bGwoKTtcclxuICAgICAgICAgICAgaG92ZXJNYW5hZ2VyLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgYWN0aXZlID0gaG92ZXJNYW5hZ2VyLm1vdXNlSG92ZXJzQWN0aXZlO1xyXG4gICAgICAgICAgICBpZiAoYWN0aXZlLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiSE9WRVJcIik7XHJcbiAgICAgICAgICAgICAgICBpbnQgaWQgPSBhY3RpdmVbMF0uaWQ7XHJcbiAgICAgICAgICAgICAgICBpZihpZCA+PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyB0ZXh0ID0gdGV4dHNbYWN0aXZlWzBdLnR5cGVdW2lkXTtcclxuICAgICAgICAgICAgICAgICAgICBlbnRpdHkuT3JpZ2luLkRyYXcodGV4dCwgMCwgMCwgMiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5CYWNrQmF0dGxlKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeCA9IGFjdGl2ZVswXS5yZWN0LlggKyAxIC0gdGV4dC5MZW5ndGgvMjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCA8IDApIHggPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5TZXRQb3NpdGlvbih4LCBhY3RpdmVbMF0ucmVjdC5ZIC0yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJldmlld1N5c3RlbVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgcHJpdmF0ZSBCYXR0bGVNYWluIGJhdHRsZU1haW47XHJcbiAgICAgICAgcHVibGljIGJvb2wgcHJldmlld0FjdGl2ZTtcclxuICAgICAgICBwcml2YXRlIENsb25lZFN0YXRlIGNsb25lZFN0YXRlO1xyXG4gICAgICAgIHByaXZhdGUgUXVpY2tBY2Nlc3Nvck9uZTxCYXR0bGVNYWluLkJhdHRsZUVudGl0eT4gYmF0dGxlRW50aXR5O1xyXG4gICAgICAgIERlYnVnZ2VyIGRlYnVnID0gbmV3IERlYnVnZ2VyKHRydWUpO1xyXG5cclxuICAgICAgICBwdWJsaWMgUHJldmlld1N5c3RlbShFQ1NNYW5hZ2VyIGVjcywgQmF0dGxlTWFpbiBiYXR0bGVNYWluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIGVjcy5BZGRDb3B5TWV0aG9kKHR5cGVvZihCYXR0bGVNYWluLkJhdHRsZUVudGl0eSksIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248b2JqZWN0LCBvYmplY3Q+KSgobzEsIG8yKT0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0byA9IG8yIGFzIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdmFyIGZyb20gPSBvMSBhcyBCYXR0bGVNYWluLkJhdHRsZUVudGl0eTtcclxuICAgICAgICAgICAgICAgIHRvLnBvcyA9IGZyb20ucG9zO1xyXG4gICAgICAgICAgICAgICAgdG8ubGlmZSA9IGZyb20ubGlmZTtcclxuICAgICAgICAgICAgICAgIHRvLm1heExpZmUgPSBmcm9tLm1heExpZmU7XHJcbiAgICAgICAgICAgICAgICB0by5lbGVtZW50ID0gZnJvbS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0by5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0by5tb3Zlc1tpXSA9IGZyb20ubW92ZXNbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgZWNzLkFkZENvcHlNZXRob2QodHlwZW9mKEJhdHRsZU1haW4uQmF0dGxlU3RhdGUpLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPG9iamVjdCwgb2JqZWN0PikoKG8xLCBvMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvID0gbzIgYXMgQmF0dGxlTWFpbi5CYXR0bGVTdGF0ZTtcclxuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gbzEgYXMgQmF0dGxlTWFpbi5CYXR0bGVTdGF0ZTtcclxuICAgICAgICAgICAgICAgIHRvLmFjdGluZ0VudGl0eSA9IGZyb20uYWN0aW5nRW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdG8uQmF0dGxlRW5kQWN0aXZlID0gZnJvbS5CYXR0bGVFbmRBY3RpdmU7XHJcbiAgICAgICAgICAgICAgICB0by5tb3ZlVGlja19Ob3cgPSBmcm9tLm1vdmVUaWNrX05vdztcclxuICAgICAgICAgICAgICAgIHRvLm1vdmVUaWNrX1RvdGFsID0gZnJvbS5tb3ZlVGlja19Ub3RhbDtcclxuICAgICAgICAgICAgICAgIHRvLnBoYXNlID0gZnJvbS5waGFzZTtcclxuICAgICAgICAgICAgICAgIHRvLnR1cm4gPSBmcm9tLnR1cm47XHJcbiAgICAgICAgICAgICAgICB0by50dXJuc1BlclBoYXNlID0gZnJvbS50dXJuc1BlclBoYXNlO1xyXG4gICAgICAgICAgICAgICAgdG8udG90YWxUdXJucyA9IGZyb20udG90YWxUdXJucztcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBlY3MuQWRkQ29weU1ldGhvZCh0eXBlb2YoVGltZVN0YW1wKSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIG9iamVjdD4pKChvMSwgbzIpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0byA9IG8yIGFzIFRpbWVTdGFtcDtcclxuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gbzEgYXMgVGltZVN0YW1wO1xyXG4gICAgICAgICAgICAgICAgdG8uQ3VycmVudFNuYXAgPSBmcm9tLkN1cnJlbnRTbmFwO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIGVjcy5BZGRDb3B5TWV0aG9kKHR5cGVvZihIYXBwSGFuZGxpbmcuSGFwcEhhbmRsZVN0YXRlKSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIG9iamVjdD4pKChvMSwgbzIpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0byA9IG8yIGFzIEhhcHBIYW5kbGluZy5IYXBwSGFuZGxlU3RhdGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgZnJvbSA9IG8xIGFzIEhhcHBIYW5kbGluZy5IYXBwSGFuZGxlU3RhdGU7XHJcbiAgICAgICAgICAgICAgICB0by5oaWdoZXN0SGFuZGxlZCA9IGZyb20uaGlnaGVzdEhhbmRsZWQ7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVNYWluID0gYmF0dGxlTWFpbjtcclxuICAgICAgICAgICAgY2xvbmVkU3RhdGUgPSBuZXcgQ2xvbmVkU3RhdGUoKTtcclxuICAgICAgICAgICAgYmF0dGxlRW50aXR5ID0gZWNzLlF1aWNrQWNjZXNzb3IxPEJhdHRsZU1haW4uQmF0dGxlRW50aXR5PigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTdGFydFByZXZpZXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYmF0dGxlTWFpbi5lbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoXCJBTEwgRU5USVRJRVMgQkVGT1JFIFBSRVZJRVdcIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KGl0ZW0ucmFuZG9tUG9zaXRpb24gKyBcIiBSQU5ET00gUE9TXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoaXRlbS5UeXBlICsgXCIgdHlwZVwiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KGl0ZW0uZHJhd1R1cm4gKyBcIiBkcmF3IHR1cm5cIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkVORFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlY3MuQ2xvbmVTdGF0ZShjbG9uZWRTdGF0ZSk7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uYmF0dGxlU3RhdGUuQmF0dGxlRW5kQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHByZXZpZXdBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYmF0dGxlTWFpbi5lbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmxpZmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgaXRlbS5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5UaWNrKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBFbmRQcmV2aWV3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkVuZCBwcmV2aWV3XCIpO1xyXG4gICAgICAgICAgICAvLyAgIENvbnNvbGUuUmVhZEtleSgpO1xyXG4gICAgICAgICAgICBwcmV2aWV3QWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoYmF0dGxlTWFpbi5lbnRpdGllcy5Db250YWlucyhiYXR0bGVFbnRpdHkuQ29tcDEoMCkpK1wiWFhYU1wiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVjcy5SZXN0b3JlU3RhdGUoY2xvbmVkU3RhdGUpO1xyXG4gICAgICAgICAgICBiYXR0bGVNYWluLmJhdHRsZVN0YXRlLnBoYXNlID0gQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHM7XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBiYXR0bGVNYWluLmVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkFMTCBFTlRJVElFUyBBRlRFUiBQUkVWSUVXXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtLnJhbmRvbVBvc2l0aW9uK1wiIFJBTkRPTSBQT1NcIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtLlR5cGUgKyBcIiB0eXBlXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoaXRlbS5kcmF3VHVybiArIFwiIGRyYXcgdHVyblwiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KFwiRU5EXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBSZWZsZWN0aW9uVGVzdFxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgUmVmbGVjdGlvblRlc3QoKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWJ1ZyA9IG5ldyBEZWJ1Z2dlcih0cnVlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGJlID0gbmV3IENvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gYmUuR2V0VHlwZSgpO1xyXG4gICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBiZTIgPSBuZXcgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgYmUyLnJhbmRvbVBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgZGVidWcuUHJpbnQodHlwZS5HZXRGaWVsZChcInJhbmRvbVBvc2l0aW9uXCIpLkdldFZhbHVlKGJlMikuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGRlYnVnLlByaW50KGJlMi5yYW5kb21Qb3NpdGlvbiArIFwiXCIpO1xyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludChiZSk7XHJcbiAgICAgICAgICAgIERlZXBDbG9uZUhlbHBlci5EZWVwQ29weVBhcnRpYWwoYmUsIGJlMik7XHJcbiAgICAgICAgICAgIERlZXBDbG9uZUhlbHBlci5EZWVwQ29weVBhcnRpYWwoYmUyLCBiZSk7XHJcbiAgICAgICAgICAgIGRlYnVnLlByaW50KGJlKTtcclxuICAgICAgICAgICAgZGVidWcuUHJpbnQoYmUyKTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludCh0eXBlLkdldEZpZWxkKFwicmFuZG9tUG9zaXRpb25cIikuR2V0VmFsdWUoYmUyKS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgZGVidWcuUHJpbnQoYmUyLnJhbmRvbVBvc2l0aW9uK1wiXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW47XHJcbnVzaW5nIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmF0dGxlUmVuZGVyIDogSVRleHRTY3JlZW5fXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgQXR0YWNrUHJldmlldyBhdHRhY2tQcmV2aWV3O1xyXG4gICAgICAgIHByaXZhdGUgQmF0dGxlTWFpbiB0dXJuQmFzZVRyeTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFN0YWdlRGF0YSBzdGFnZURhdGE7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBQcmV2aWV3U3lzdGVtIHByZXZpZXdTeXN0ZW07XHJcbiAgICAgICAgcHJpdmF0ZSBQb3NpdGlvbkFuaW1hdGlvbiBwb3NBbmltO1xyXG4gICAgICAgIHByaXZhdGUgQ2hhckJ5Q2hhckFuaW1hdGlvbiBjaGFyQnlDaGFyQW5pbTtcclxuICAgICAgICBwcml2YXRlIERlbGF5c0FuaW1hdGlvbiBkZWxheUFuaW07XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0V29ybGQgdGV4dFdvcmxkO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgVGV4dEJvYXJkIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBMaXN0PFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlPiBpbnB1dFBoYXNlcyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBMaXN0PFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlPigpLChfbzEpPT57X28xLkFkZChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpO19vMS5BZGQoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UgLkNvbmZpcm1JbnB1dCk7cmV0dXJuIF9vMTt9KTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVmVjdG9yMkQgRW50aXR5U2NyZWVuUG9zaXRpb24oaW50IHVzZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbih0dXJuQmFzZVRyeS5lbnRpdGllc1t1c2VyXS5wb3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgUmVjdCBHZXRHcmlkUmVjdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlY3QoZ3JpZE9mZnNldHgsIGdyaWRPZmZzZXR5LCBncmlkU2NhbGUgKiA2LCBncmlkU2NhbGUgKiAzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludCBpbnB1dDtcclxuICAgICAgICBwdWJsaWMgaW50IElucHV0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gaW5wdXQ7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gdmFsdWU7IC8vQ29uc29sZS5Xcml0ZUxpbmUodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEhhbmRsaW5nIEhhcHBIYW5kbGluZyB7IGdldDsgaW50ZXJuYWwgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIE1vdXNlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBwdWJsaWMgTW91c2VIb3Zlck1hbmFnZXIgbW91c2VIb3ZlcjtcclxuXHJcbiAgICAgICAgLy9wdWJsaWMgTGlzdDxEZWxheWVkQWN0aW9ucz4gdGFza3MgPSBuZXcgTGlzdDxEZWxheWVkQWN0aW9ucz4oKTtcclxuICAgICAgICBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPiBtb3ZlQ2hhcnM7XHJcbiAgICAgICAgRGljdGlvbmFyeTxvYmplY3QsIHN0cmluZz4gbW92ZURlc2NyaXB0aW9ucyA9IG5ldyBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPigpO1xyXG4gICAgICAgIERpY3Rpb25hcnk8TWlzY0JhdHRsZUlucHV0LCBzdHJpbmc+IG1pc2NEZXNjcmlwdGlvbnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxNaXNjQmF0dGxlSW5wdXQsIHN0cmluZz4oKSwoX28yKT0+e19vMi5BZGQoTWlzY0JhdHRsZUlucHV0LkRvbmUsXCJET05FXCIpO19vMi5BZGQoTWlzY0JhdHRsZUlucHV0LlJlZG8sXCJSRURPXCIpO19vMi5BZGQoTWlzY0JhdHRsZUlucHV0LkhlbHAsXCJIRUxQXCIpO19vMi5BZGQoTWlzY0JhdHRsZUlucHV0LlByZXZpZXcsXCJQUkVWSUVXXCIpO19vMi5BZGQoTWlzY0JhdHRsZUlucHV0LkNvbmZpcm0sXCJDT05GSVJNXCIpO19vMi5BZGQoTWlzY0JhdHRsZUlucHV0LkNhbmNlbCxcIkNBTkNFTFwiKTtyZXR1cm4gX28yO30pO1xyXG4gICAgICAgIHByaXZhdGUgRGljdGlvbmFyeTxJbnB1dCwgc3RyaW5nPiBtb3ZlQnV0dG9ucztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIGRlYnVnT24gPSB0cnVlO1xyXG4gICAgICAgIHByaXZhdGUgaW50IGdyaWRTY2FsZSA9IDU7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZ3JpZE9mZnNldHggPSAyO1xyXG4gICAgICAgIHByaXZhdGUgaW50IGdyaWRPZmZzZXR5ID0gMTtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PFRleHRFbnRpdHk+IGJhdHRsZXJSZW5kZXJzO1xyXG5cclxuICAgICAgICBjaGFyW11bXSBlbnRpdGllc0NoYXJzO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCBNZXNzYWdlRG9Ob3RIaWRlO1xyXG4gICAgICAgIHN0cmluZyBtZXNzYWdlID0gbnVsbDtcclxuICAgICAgICBwcml2YXRlIGJvb2wgd2FpdGluZ0Zvck1lc3NhZ2VJbnB1dDtcclxuICAgICAgICBwcml2YXRlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlIGxhc3RQaGFzZTtcclxuICAgICAgICBwcml2YXRlIFRleHRFbnRpdHkgbWVzc2FnZUVudDtcclxuXHJcbiAgICAgICAgcHVibGljIElucHV0SGFuZGxpbmcgaW5wdXRIID0gbmV3IElucHV0SGFuZGxpbmcoKTtcclxuICAgICAgICBwdWJsaWMgYm9vbCBoZWxwVmlzdWFsaXplUmVxdWVzdDtcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZVJlbmRlcihCYXR0bGVNYWluIGJhdHRsZUxvZ2ljLCBTdGFnZURhdGEgc3RhZ2VEYXRhLCBQcmV2aWV3U3lzdGVtIFByZXZpZXdTeXN0ZW0pXHJcbiAgICAgICAge1xyXG5cclxuXHJcbiAgICAgICAgICAgIHN0cmluZ1tdIGVudGl0eVRleHRzID0geyBcIkBcIiwgXCImXCIsIFwiJVwiLCBcIiRcIiwgXCJPXCIsIFwiWFwiLCBcIkpcIiwgXCJZXCIsIFwiWlwiIH07XHJcbiAgICAgICAgICAgIGVudGl0aWVzQ2hhcnMgPSBuZXcgY2hhcltlbnRpdHlUZXh0cy5MZW5ndGhdW107XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZW50aXR5VGV4dHMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVudGl0aWVzQ2hhcnNbaV0gPSBlbnRpdHlUZXh0c1tpXS5Ub0NoYXJBcnJheSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0dXJuQmFzZVRyeSA9IGJhdHRsZUxvZ2ljO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlRGF0YSA9IHN0YWdlRGF0YTtcclxuICAgICAgICAgICAgcHJldmlld1N5c3RlbSA9IFByZXZpZXdTeXN0ZW07XHJcbiAgICAgICAgICAgIHRleHRXb3JsZCA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgcG9zQW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5Qb3NpdGlvbkFuaW1hdGlvbj4obmV3IFBvc2l0aW9uQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICBjaGFyQnlDaGFyQW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5DaGFyQnlDaGFyQW5pbWF0aW9uPihuZXcgQ2hhckJ5Q2hhckFuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgZGVsYXlBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkRlbGF5c0FuaW1hdGlvbj4obmV3IERlbGF5c0FuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkluaXQoR2FtZU1haW4uV2lkdGgsIEdhbWVNYWluLkhlaWdodCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZCA9IHRleHRXb3JsZC5tYWluQm9hcmQ7XHJcbiAgICAgICAgICAgIC8vVGV4dEJvYXJkID0gbmV3IFRleHRCb2FyZCg3MCwgMjUpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgcG9zQW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb24obmV3IFBvc2l0aW9uQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICB2YXIgYmxpbmtBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkJsaW5rQW5pbT4obmV3IEJsaW5rQW5pbSgpKTtcclxuXHJcbiAgICAgICAgICAgIGJhdHRsZXJSZW5kZXJzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICAgICAgVXBkYXRlQmF0dGxlUmVuZGVyQ291bnQoKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2VFbnQgPSB0ZXh0V29ybGQuR2V0RnJlZUVudGl0eSg0MCwgNCk7XHJcblxyXG4gICAgICAgICAgICB0dXJuQmFzZVRyeS5oYXBwTWFuYWdlci5BZGRIYW5kbGVyKG5ldyBIYXBwcy5IYXBwSGFuZGxlcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5IYXBwVGFnLkF0dGFja0hpdCwgKGgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlciA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2guR2V0QXR0cmlidXRlX0ludCgxKV07XHJcbiAgICAgICAgICAgICAgICBpbnQgZGVmZW5kZXJFSUQgPSBoLkdldEF0dHJpYnV0ZV9JbnQoMCk7XHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZGVmZW5kZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmVuZGVyRUlEID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZW5kZXIgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1tkZWZlbmRlckVJRF07XHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSAoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCloLkdldEF0dHJpYnV0ZV9JbnQoMik7XHJcbiAgICAgICAgICAgICAgICBUZXh0RW50aXR5IGZlID0gR2V0UHJvalRleHRFbnRpdHkoZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmVuZGVyICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGF0dGFja2VyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MyID0gZGVmZW5kZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhEaXMgPSBNYXRoLkFicyhwb3MuWCAtIHBvczIuWCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQgdGltZSA9IChmbG9hdCl4RGlzICogMC4xZjtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKHRpbWUpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGF0dGFja2VyLlBvc2l0aW9uVjJEKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihkZWZlbmRlci5Qb3NpdGlvblYyRCkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYXR0YWNrZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvczIgPSBwb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFja2VyLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MyLlggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvczIuWCA9IDY7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhEaXMgPSBNYXRoLkFicyhwb3MuWCAtIHBvczIuWCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQgdGltZSA9IChmbG9hdCl4RGlzICogMC4xZjtcclxuICAgICAgICAgICAgICAgICAgICBwb3NBbmltLkFkZChmZS5BbmltQmFzZSh0aW1lKSwgbmV3IFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YShcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3MpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvczIpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICB0dXJuQmFzZVRyeS5oYXBwTWFuYWdlci5BZGRIYW5kbGVyKG5ldyBIYXBwcy5IYXBwSGFuZGxlcihCYXR0bGVNYWluLkhhcHBUYWcuQXR0YWNrTWlzcywgKGgpID0+XHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYXR0YWNrZXIgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1toLkdldEF0dHJpYnV0ZV9JbnQoMCldO1xyXG4gICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50ID0gKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQpaC5HZXRBdHRyaWJ1dGVfSW50KDEpO1xyXG4gICAgICAgICAgICAgICAgVGV4dEVudGl0eSBmZSA9IEdldFByb2pUZXh0RW50aXR5KGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IGF0dGFja2VyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvczIgPSBwb3M7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZXIuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zMi5YID0gLTE7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zMi5YID0gNjtcclxuICAgICAgICAgICAgICAgIHZhciB4RGlzID0gTWF0aC5BYnMocG9zLlggLSBwb3MyLlgpO1xyXG4gICAgICAgICAgICAgICAgZmxvYXQgdGltZSA9IChmbG9hdCl4RGlzICogMC4xZjtcclxuICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKHRpbWUpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zKSxcclxuICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvczIpKSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcblxyXG4gICAgICAgICAgICBtb3ZlQ2hhcnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxvYmplY3QsIHN0cmluZz4oKSwoX28zKT0+e19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlLFwiRlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlLFwiSVwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlcixcIlRcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk5vcm1hbFNob3QsXCJHXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsVW5pY29kZS5SaWdodGFycm93MitcIlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwLFVuaWNvZGUuVXBhcnJvdzIrXCJcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVEb3duLFVuaWNvZGUuRG93bmFycm93MitcIlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsVW5pY29kZS5MZWZ0YXJyb3cyK1wiXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iLFwiSUJcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXJCb21iLFwiVEJcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlN1bW1vbkVudGl0eSxcIlNVXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb05vdGhpbmcsXCIgXCIpO3JldHVybiBfbzM7fSk7XHJcblxyXG4gICAgICAgICAgICBtb3ZlRGVzY3JpcHRpb25zID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+KCksKF9vNCk9PntfbzQuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlLFwiSWNlIFNob3RcIik7X280LkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUsXCJGaXJlIFNob3RcIik7X280LkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIsXCJUaHVuZGVyIFNob3RcIik7X280LkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsXCJJY2UgQm9tYlwiKTtfbzQuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTm9ybWFsU2hvdCxcIkd1blwiKTtfbzQuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0LFVuaWNvZGUuUmlnaHRhcnJvdzIrXCJcIik7X280LkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVVcCxVbmljb2RlLlVwYXJyb3cyK1wiXCIpO19vNC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93bixVbmljb2RlLkRvd25hcnJvdzIrXCJcIik7X280LkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFVuaWNvZGUuTGVmdGFycm93MitcIlwiKTtfbzQuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXCJUaHVuZGVyIEJvbWJcIik7X280LkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlN1bW1vbkVudGl0eSxcIlN1bW1vblwiKTtyZXR1cm4gX280O30pO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1lc09uUG9zID0gbmV3IE1lc3NhZ2VPblBvc2l0aW9uKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5lbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmhlcm8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGJhdHRsZXJSZW5kZXJzW2ldLkdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZXNPblBvcy5NZXNzYWdlT25Qb3MoQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbih0dXJuQmFzZVRyeS5lbnRpdGllc1tpXS5wb3MpLCBcIllPVVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvL01lc3NhZ2VPblBvcyhWZWN0b3IyRC5aZXJvLCBcIllPVVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5SZWFkTGluZSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlQmF0dGxlUmVuZGVyQ291bnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2hpbGUgKGJhdHRsZXJSZW5kZXJzLkNvdW50IDwgdGhpcy50dXJuQmFzZVRyeS5lbnRpdGllcy5Db3VudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGV4dEVudGl0eSBpdGVtID0gdGV4dFdvcmxkLkdldEZyZWVFbnRpdHkoMiwgMik7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVyUmVuZGVycy5BZGQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLlNldFBvc2l0aW9uKEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24odHVybkJhc2VUcnkuZW50aXRpZXNbYmF0dGxlclJlbmRlcnMuQ291bnQgLSAxXS5wb3MpKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHN0cmluZyBHZXRFbnRpdHlOYW1lKGludCB1c2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGdhbWVFbnRpdHkgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1t1c2VyXTtcclxuICAgICAgICAgICAgdmFyIGNoYXJzID0gR2V0Q2hhcihnYW1lRW50aXR5KTtcclxuICAgICAgICAgICAgc3RyaW5nIG5hbWUgPSBuZXcgc3RyaW5nKGNoYXJzKTtcclxuICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuZ3JhcGhpY1JlcGVhdGVkSW5kZXggPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZSArIChnYW1lRW50aXR5LmdyYXBoaWNSZXBlYXRlZEluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFRleHRFbnRpdHkgR2V0UHJvalRleHRFbnRpdHkoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZlID0gdGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoMSwgMSk7XHJcbiAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihUZXh0Qm9hcmQuSU5WSVNJQkxFQ0hBUiwgMCwgMCk7XHJcbiAgICAgICAgICAgIGludCBlbGVtZW50Q29sb3IgPSBFbGVtZW50VG9Qcm9qQ29sb3IoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGZlLk9yaWdpbi5TZXRCYWNrQ29sb3IoZWxlbWVudENvbG9yLCAwLCAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBJbnB1dEtleSBpbnB1dCA9IChJbnB1dEtleSlJbnB1dDtcclxuICAgICAgICAgICAgaWYgKGlucHV0ICE9IElucHV0S2V5Lk5PTkUgJiYgd2FpdGluZ0Zvck1lc3NhZ2VJbnB1dClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2FpdGluZ0Zvck1lc3NhZ2VJbnB1dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9pZiAoaW5wdXQgIT0gSW5wdXRLZXkuTk9ORSkgQ29uc29sZS5Xcml0ZUxpbmUoaW5wdXQpO1xyXG4gICAgICAgICAgICAvL2ludCBpbnB1dE51bWJlciA9IGlucHV0IC0gJzAnO1xyXG4gICAgICAgICAgICAvL2lmIChkZWJ1Z09uICYmIGlucHV0ID09ICdrJylcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIERlYnVnRXh0cmEuRGVidWdFeC5TaG93KCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxhc3RQaGFzZSAhPSB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1Nob3dNZXNzYWdlKFwiUGljayB5b3VyIGNvbW1hbmRzXCIsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5TZXRBbGwoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIENvbG9ycy5GaXJlQXVyYSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RQaGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiWF9fWFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBIaWRlTWVzc2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLlNldEFsbChUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGFzdFBoYXNlID0gdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2U7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dFBoYXNlcy5Db250YWlucyh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChJbnB1dFVuaWNvZGUgPj0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSW5wdXRVbmljb2RlID09ICdwJylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJQUkVWSUVXXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aWV3U3lzdGVtLlN0YXJ0UHJldmlldygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dFggPSBpbnB1dEguSW5wdXR0ZWQoSW5wdXRVbmljb2RlLCB0dXJuQmFzZVRyeS5pbnB1dHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dFgudHlwZSA9PSBJbnB1dFR5cGUuTWlzY0JhdHRsZSAmJiBpbnB1dFguYXJnMSA9PSAoaW50KSBNaXNjQmF0dGxlSW5wdXQuSGVscClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBWaXN1YWxpemVSZXF1ZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dFgudHlwZSAhPSBJbnB1dFR5cGUuTm9uZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuSW5wdXREb25lKGlucHV0WCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuaW5wdXRzLmlucHV0Rm9yQ29uZmlybWF0aW9uLnR5cGUgIT0gSW5wdXRUeXBlLk5vbmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHR1cm5CYXNlVHJ5LmlucHV0cy5pbnB1dEZvckNvbmZpcm1hdGlvbi50eXBlID09IElucHV0VHlwZS5Nb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNrUHJldmlldy5TaG93UHJldmlldygwLCB0dXJuQmFzZVRyeS5pbnB1dHMuaW5wdXRGb3JDb25maXJtYXRpb24uYXJnMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LkNvbmZpcm1JbnB1dFN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFja1ByZXZpZXcuRW5kKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LklucHV0Q29uZmlybWVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2tQcmV2aWV3LkVuZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL2ZvcmVhY2ggKHZhciBpdGVtIGluIG1vdmVLZXlzKVxyXG4gICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAvLyAgICBpZiAoaXRlbS5WYWx1ZSA9PSBpbnB1dClcclxuICAgICAgICAgICAgICAgIC8vICAgIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0dXJuQmFzZVRyeS5JbnB1dERvbmUoaXRlbS5LZXkpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVXBkYXRlQmF0dGxlUmVuZGVyQ291bnQoKTtcclxuICAgICAgICAgICAgRHJhd0dyYXBoaWNzKGRlbHRhKTtcclxuICAgICAgICAgICAgaWYgKENhbkFkdmFuY2VfTG9naWMoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlICE9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlIC5FeGVjdXRlTW92ZSAmJiBwcmV2aWV3U3lzdGVtLnByZXZpZXdBY3RpdmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlld1N5c3RlbS5FbmRQcmV2aWV3KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlRpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkhhbmRSZWNoYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1N5c3RlbS5UaHJlYWRpbmcuVGhyZWFkLlNsZWVwKDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlRpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vVXBkYXRlQmF0dGxlUmVuZGVyQ291bnQoKTtcclxuICAgICAgICAgICAgLy9EcmF3R3JhcGhpY3MoZGVsdGEpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENhbkFkdmFuY2VHcmFwaGljcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFdvcmxkLklzRG9uZSgpICYmICF3YWl0aW5nRm9yTWVzc2FnZUlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIENhbkFkdmFuY2VfTG9naWMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIENhbkFkdmFuY2VHcmFwaGljcygpICYmIEhhcHBIYW5kbGluZy5Jc0RvbmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dNZXNzYWdlKHN0cmluZyBzLCBib29sIHdhaXRGb3JJbnB1dCA9IHRydWUsIGJvb2wgZG9Ob3RIaWRlID0gZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLk1lc3NhZ2VEb05vdEhpZGUgPSBkb05vdEhpZGU7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBzO1xyXG4gICAgICAgICAgICBtZXNzYWdlRW50Lk9yaWdpbi5SZXNldEludmlzaWJsZSgpO1xyXG4gICAgICAgICAgICBmbG9hdCB0aW1lVG9Xcml0ZSA9IG1lc3NhZ2UuTGVuZ3RoICogMC4wMTVmO1xyXG4gICAgICAgICAgICBpZiAodGltZVRvV3JpdGUgPiAwLjRmKSB0aW1lVG9Xcml0ZSA9IDAuNGY7XHJcbiAgICAgICAgICAgIGNoYXJCeUNoYXJBbmltLkFkZChtZXNzYWdlRW50LkFuaW1CYXNlKHRpbWVUb1dyaXRlKSwgbmV3IENoYXJCeUNoYXJBbmltYXRpb24uQ2hhckJ5Q2hhckRhdGEoMCwgbWVzc2FnZS5MZW5ndGggKyAxKSk7XHJcbiAgICAgICAgICAgIGRlbGF5QW5pbS5EZWxheSh0aW1lVG9Xcml0ZSArIDAuOGYpO1xyXG5cclxuICAgICAgICAgICAgLy93YWl0aW5nRm9yTWVzc2FnZUlucHV0ID0gd2FpdEZvcklucHV0O1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJNOiBcIitzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEhpZGVNZXNzYWdlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICB3YWl0aW5nRm9yTWVzc2FnZUlucHV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIk06IFwiK3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0JhdHRsZU1lc3NhZ2Uoc3RyaW5nIHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIXR1cm5CYXNlVHJ5LkJhdHRsZURlY2lkZWQoKSlcclxuICAgICAgICAgICAgICAgIFNob3dNZXNzYWdlKHMpO1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJNOiBcIitzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdHcmFwaGljcyhmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdXNlSG92ZXIubW91c2VIb3ZlcnMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgdHVybkJhc2VUcnkuVXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgLy9jbGVhciBncmlkXHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5SZXNldCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlucHV0UGhhc2VzLkNvbnRhaW5zKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLlNldEFsbChUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgQ29sb3JzLkJhY2tncm91bmRJbnB1dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGludCBjb250cm9sc1kgPSBncmlkU2NhbGUgKiAzICsgMTAgKyAzICsgMjtcclxuXHJcbiAgICAgICAgICAgIGludCBlbmVteUdyaWRPZmZYID0gZ3JpZFNjYWxlICogMztcclxuICAgICAgICAgICAgYm9vbCBkcmF3RG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3UmVwZWF0ZWQoJyAnLCBncmlkT2Zmc2V0eCwgZ3JpZE9mZnNldHksIGdyaWRTY2FsZSAqIDYsIGdyaWRTY2FsZSAqIDMsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBDb2xvcnMuQmFja0JhdHRsZSk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgMyAqIGdyaWRTY2FsZTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IDMgKiBncmlkU2NhbGU7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZHJhd0RvdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3Q2hhcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkT2Zmc2V0eCArIGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRPZmZzZXR5ICsgaiwgQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdDaGFyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZE9mZnNldHggKyBpICsgZW5lbXlHcmlkT2ZmWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRPZmZzZXR5ICsgaiwgQ29sb3JzLkdyaWRFbmVteSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpICUgZ3JpZFNjYWxlID09IDAgJiYgaiAlIGdyaWRTY2FsZSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3R3JpZChpICsgZ3JpZE9mZnNldHggKyBlbmVteUdyaWRPZmZYLCBqICsgZ3JpZE9mZnNldHksIGdyaWRTY2FsZSwgZ3JpZFNjYWxlLCBDb2xvcnMuR3JpZEVuZW15KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdHcmlkKGkgKyBncmlkT2Zmc2V0eCwgaiArIGdyaWRPZmZzZXR5LCBncmlkU2NhbGUsIGdyaWRTY2FsZSwgQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGdhbWVFbnRpdHkgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZWMgPSBHZXRDaGFyKGdhbWVFbnRpdHkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBnYW1lRW50aXR5LlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNjcmVlblBvcyA9IEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oKEJhc2VVdGlscy5WZWN0b3IyRClwb3MpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuVHlwZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBhbmVsZWZmZWN0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlblBvcy5ZID0gc2NyZWVuUG9zLlkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlblBvcy5YID0gc2NyZWVuUG9zLlggLSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9iYXR0bGVyRW50aXRpZXNbaV0ub3JpZ2luLlBvc2l0aW9uID0gc2NyZWVuUG9zO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhdHRsZXJSZW5kZXJzW2ldLk9yaWdpbi5Qb3NpdGlvbiAhPSBzY3JlZW5Qb3MgJiYgdGV4dFdvcmxkLklzRG9uZSgpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLlBvc2l0aW9uID0gc2NyZWVuUG9zO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZmxvYXQgdGltZSA9IDAuMTVmO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vLy90aW1lID0gNTtcclxuICAgICAgICAgICAgICAgICAgICAvL3Bvc0FuaW0uQWRkKGJhdHRsZXJSZW5kZXJzW2ldLkFuaW1CYXNlKHRpbWUpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKGJhdHRsZXJSZW5kZXJzW2ldLk9yaWdpbi5Qb3NpdGlvbiwgc2NyZWVuUG9zLCB0cnVlKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGMgPSBDb2xvcnMuSGVybztcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LlR5cGUgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSkgYyA9IENvbG9ycy5FbmVteTtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LlR5cGUgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRW50aXR5VHlwZS5waWNrdXApIGMgPSBDb2xvcnMuaW5wdXRLZXk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5EZWFkKVxyXG4gICAgICAgICAgICAgICAgICAgIGMgPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1I7XHJcbiAgICAgICAgICAgICAgICBpbnQgYmMgPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1I7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuQWxpdmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50ID0gZ2FtZUVudGl0eS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ICE9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYyA9IEVsZW1lbnRUb0F1cmFDb2xvcihlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5EZWFkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgZWMuTGVuZ3RoICsgMTsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLkRyYXdDaGFyKFRleHRCb2FyZC5JTlZJU0lCTEVDSEFSLCBqLCAwLCBjLCBiYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVyUmVuZGVyc1tpXS5PcmlnaW4uRHJhdyhlYywgMCwgMCwgYywgYmMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LmdyYXBoaWNSZXBlYXRlZEluZGV4ID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLkRyYXdPbmVEaWdpdChnYW1lRW50aXR5LmdyYXBoaWNSZXBlYXRlZEluZGV4ICsgMSwgMCArIGVjLkxlbmd0aCwgMCwgYywgYmMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpbnQgdGV4dEJvYXJkSGVpZ2h0ID0gMyAqIGdyaWRTY2FsZTtcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vaW50IHkgPSAyO1xyXG4gICAgICAgICAgICAgICAgLy9pbnQgeCA9IDYgKiBncmlkU2NhbGUgKyAyMDtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnQgeCA9IDM7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0UGhhc2VzLkNvbnRhaW5zKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBEcmF3Q29udHJvbHMoY29udHJvbHNZLCB4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHVybkJhc2VUcnkudGltZVRvQ2hvb3NlID4gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IHJhdGlvID0gdHVybkJhc2VUcnkudGltZVRvQ2hvb3NlIC8gdHVybkJhc2VUcnkudGltZVRvQ2hvb3NlTWF4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1JlcGVhdGVkKCcgJywgeCwgY29udHJvbHNZICsgMTYsIChpbnQpKHJhdGlvICogMTUpLCAxLCBDb2xvcnMuQm9hcmQsIENvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3UmVwZWF0ZWQoJyAnLCB4IC0gMSwgY29udHJvbHNZIC0gMSwgMTUsIDE1LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnQgdHVybk9yZGVyWCA9IDYgKiBncmlkU2NhbGUgKyA1O1xyXG4gICAgICAgICAgICBpbnQgdHVybk9yZGVyWSA9IDI7XHJcbiAgICAgICAgICAgIHR1cm5PcmRlclggPSAyO1xyXG4gICAgICAgICAgICB0dXJuT3JkZXJZID0gMyAqIGdyaWRTY2FsZSArIDE7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dFBoYXNlcy5Db250YWlucyh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSkpXHJcbiAgICAgICAgICAgICAgICB0dXJuT3JkZXJZICs9IDU7XHJcblxyXG4gICAgICAgICAgICBEcmF3VHVybk9yZGVyKHR1cm5PcmRlclgsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBpZiAoIXN0YWdlRGF0YS5oaWRlTGlmZVVJKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3TGlmZSh0dXJuT3JkZXJYICsgMjUsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnQgWCA9IDI7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnN0IGludCBZID0gMTY7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlRW50LlNldFBvc2l0aW9uKFgsIGNvbnRyb2xzWSAtIDIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UgIT0gbnVsbCAmJiAoIUNhbkFkdmFuY2VHcmFwaGljcygpKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3R3JpZChcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBtZXNzYWdlRW50Lk9yaWdpbi5Qb3NpdGlvbi5YSW50LCBtZXNzYWdlRW50Lk9yaWdpbi5Qb3NpdGlvbi5ZSW50LCBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBtZXNzYWdlRW50LldpZHRoLCBtZXNzYWdlRW50LkhlaWdodCwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICAvL21lc3NhZ2VFbnQuT3JpZ2luLkRyYXdHcmlkKDAsIDAsIDQwLCA0LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VFbnQuT3JpZ2luLkRyYXdXaXRoTGluZWJyZWFrcyhtZXNzYWdlLCAxLCAwLCAxLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghTWVzc2FnZURvTm90SGlkZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlRW50Lk9yaWdpbi5TZXRBbGwoVGV4dEJvYXJkLklOVklTSUJMRUNIQVIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd1JlcGVhdGVkKCcgJyxYLCBZLCA0MCwgNCwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSgxKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoMSk7XHJcbiAgICAgICAgICAgIC8vdGV4dEJvYXJkLkRyYXdfQ3Vyc29yKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlLlRvU3RyaW5nKCkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5EcmF3Q2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLlRyeUVuZEFuaW1hdGlvbnMoKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkFkdmFuY2VUaW1lKGRlbHRhKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChDYW5BZHZhbmNlR3JhcGhpY3MoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSGFwcEhhbmRsaW5nLkhhbmRsZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKENhbkFkdmFuY2VHcmFwaGljcygpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LmhhcHBNYW5hZ2VyLlRyeUhhbmRsZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vaWYgKENhbkFkdmFuY2UoKSlcclxuICAgICAgICAgICAgLy97XHJcblxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEVsZW1lbnRUb0F1cmFDb2xvcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgYmMgPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1I7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuRmlyZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuRmlyZUF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5JY2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLkljZUF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5UaHVuZGVyQXVyYTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGJjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgRWxlbWVudFRvUHJvakNvbG9yKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBiYyA9IENvbG9ycy5pbnB1dEtleTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5GaXJlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5GaXJlU2hvdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkljZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuSWNlQXVyYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLlRodW5kZXJBdXJhO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYmM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihCYXNlVXRpbHMuVmVjdG9yMkQgcG9zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHggPSBwb3MuWDtcclxuICAgICAgICAgICAgdmFyIHkgPSBwb3MuWTtcclxuICAgICAgICAgICAgdmFyIHNjcmVlblBvcyA9IG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoeCAqIGdyaWRTY2FsZSArIGdyaWRTY2FsZSAvIDIgKyBncmlkT2Zmc2V0eCwgMiAqIGdyaWRTY2FsZSAtIHkgKiBncmlkU2NhbGUgKyBncmlkU2NhbGUgLyAyICsgZ3JpZE9mZnNldHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2NyZWVuUG9zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdDb250cm9scyhpbnQgeSwgaW50IHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3R3JpZCh4IC0gMiwgeSAtIDEsIDIwLCAxNSwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHgsIHkpO1xyXG4gICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3X0N1cnNvcihcIkNvbnRyb2xzXCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcblxyXG4gICAgICAgICAgICAvL0lucHV0VGFncyBpbnB1dFRhZyA9IElucHV0VGFncy5NT1ZFRklYO1xyXG4gICAgICAgICAgICBpbnQgeU9mZiA9IDA7XHJcbiAgICAgICAgICAgIHlPZmYgPSBEcmF3SW5wdXRzX0ZpeCh5LCB4LCBJbnB1dFRhZ3MuTU9WRUZJWCwgeU9mZik7XHJcbiAgICAgICAgICAgIC8veU9mZisrO1xyXG4gICAgICAgICAgICB5T2ZmID0gRHJhd0lucHV0c19GaXgoeSwgeCwgSW5wdXRUYWdzLk1JU0MsIHlPZmYpO1xyXG4gICAgICAgICAgICAvL3lPZmYrKztcclxuICAgICAgICAgICAgLy95T2ZmID0gRHJhd0lucHV0c19GaXgoeSwgeCwgSW5wdXRUYWdzLk1PVkVVTkZJWCwgeU9mZik7XHJcblxyXG4gICAgICAgICAgICBpbnQgYXR0YWNrTnVtYmVyID0gMTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5pbnB1dHMuaW5wdXRzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCB4MiA9IHg7XHJcbiAgICAgICAgICAgICAgICBpbnQgeTIgPSB5ICsgMiArIHlPZmY7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0dXJuQmFzZVRyeS5pbnB1dHMuaW5wdXRzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5pbnB1dHMuVGFnSXMoaSwgSW5wdXRUYWdzLk1PVkVVTkZJWCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgeU9mZisrO1xyXG4gICAgICAgICAgICAgICAgICAgIHlPZmYrKztcclxuICAgICAgICAgICAgICAgICAgICBpbnQgdW5pY29kZSA9ICcwJyArIGF0dGFja051bWJlcjtcclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2tOdW1iZXIrKztcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZUhvdmVyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgUmVjdCh4MiAtIDIsIHkyLCAyMCwgMSksIDAsIGlucHV0LmFyZzEpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3Q2hhcignWycsIHgyIC0gMSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKCddJywgeDIgKyBsZW5ndGhCbmFtZSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBkZXNjcmlwdGlvbiA9IHN0cmluZy5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTW92ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlIG0gPSAoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZURlc2NyaXB0aW9ucy5UcnlHZXRWYWx1ZShtLCBvdXQgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBtLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5NaXNjQmF0dGxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWlzY0JhdHRsZUlucHV0IGFyZzEgPSAoTWlzY0JhdHRsZUlucHV0KWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gbWlzY0Rlc2NyaXB0aW9uc1thcmcxXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFRleHRCb2FyZCA9IHRoaXMuVGV4dEJvYXJkO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYWluLkRyYXdJbnB1dCh4MiwgeTIsIHVuaWNvZGUsIGRlc2NyaXB0aW9uLCBUZXh0Qm9hcmQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBjID0gbW92ZUNoYXJzW21vdmVdO1xyXG4gICAgICAgICAgICAgICAgLy9EcmF3TW92ZShtb3ZlLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhdyhjLCB4MiArIDMsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd1dpdGhHcmlkKGMrXCJcIiwgeDIsIHkgKyAyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgRHJhd0lucHV0c19GaXgoaW50IHksIGludCB4LCBJbnB1dFRhZ3MgaW5wdXRUYWcsIGludCB5T2ZmKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuaW5wdXRzLmlucHV0cy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgeDIgPSB4O1xyXG4gICAgICAgICAgICAgICAgaW50IHkyID0geSArIDIgKyB5T2ZmO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdHVybkJhc2VUcnkuaW5wdXRzLmlucHV0c1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuaW5wdXRzLlRhZ0lzKGksIGlucHV0VGFnKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdW5pY29kZSA9IGlucHV0SC5HZXRGaXhlZE1vdmVVbmljb2RlKGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgZm9yY2VJbnB1dExhYmVsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgZm9yY2VDb21tYW5kTGFiZWwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgbW92ZW1lbnRDb21tYW5kID0gdW5pY29kZSA9PSAndyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vdmVtZW50Q29tbWFuZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmNlSW5wdXRMYWJlbCA9IFwiV0FTRFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JjZUNvbW1hbmRMYWJlbCA9IFwiXCIgKyBVbmljb2RlLlVwYXJyb3cyICsgVW5pY29kZS5MZWZ0YXJyb3cyICsgVW5pY29kZS5Eb3duYXJyb3cyICsgVW5pY29kZS5SaWdodGFycm93MjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVuaWNvZGUgPT0gJ2EnIHx8IHVuaWNvZGUgPT0gJ3MnIHx8IHVuaWNvZGUgPT0gJ2QnKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHlPZmYrKztcclxuICAgICAgICAgICAgICAgICAgICB5T2ZmKys7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0NoYXIoJ1snLCB4MiAtIDEsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCBsZW5ndGhCbmFtZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlSW5wdXRMYWJlbCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGhCbmFtZSA9IFRleHRCb2FyZC5EcmF3VW5pY29kZUxhYmVsKHVuaWNvZGUsIHgyLCB5MiwgQ29sb3JzLmlucHV0S2V5KTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhmb3JjZUlucHV0TGFiZWwsIHgyLCB5MiwgQ29sb3JzLmlucHV0S2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoQm5hbWUgPSBmb3JjZUlucHV0TGFiZWwuTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3Q2hhcignXScsIHgyICsgbGVuZ3RoQm5hbWUsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgZGVzY3JpcHRpb24gPSBzdHJpbmcuRW1wdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT0gSW5wdXRUeXBlLk1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2VDb21tYW5kTGFiZWwgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBmb3JjZUNvbW1hbmRMYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlIG0gPSAoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVEZXNjcmlwdGlvbnMuVHJ5R2V0VmFsdWUobSwgb3V0IGRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXNjcmlwdGlvbiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gbS5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT0gSW5wdXRUeXBlLk1pc2NCYXR0bGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNaXNjQmF0dGxlSW5wdXQgYXJnMSA9IChNaXNjQmF0dGxlSW5wdXQpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBtaXNjRGVzY3JpcHRpb25zW2FyZzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUhvdmVyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgUmVjdCh4MiAtIDIsIHkyLCAyMCwgMSksIDEsIGlucHV0LmFyZzEpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vdmVtZW50Q29tbWFuZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlSG92ZXIubW91c2VIb3ZlcnMuQWRkKG5ldyBNb3VzZUhvdmVyKG5ldyBSZWN0KHgyIC0gMiwgeTIsIDIwLCAxKSwgMiwgMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUhvdmVyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgUmVjdCh4MiAtIDIsIHkyLCAyMCwgMSksIDAsIGlucHV0LmFyZzEpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoZGVzY3JpcHRpb24sIHgyICsgMiArIDUsIHkyLCBDb2xvcnMuSW5wdXREZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgYyA9IG1vdmVDaGFyc1ttb3ZlXTtcclxuICAgICAgICAgICAgICAgIC8vRHJhd01vdmUobW92ZSwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXcoYywgeDIgKyAzLCB5MiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdXaXRoR3JpZChjK1wiXCIsIHgyLCB5ICsgMiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHlPZmY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd0xpZmUoaW50IHR1cm5PcmRlclgsIGludCB0dXJuT3JkZXJZKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0dyaWQodHVybk9yZGVyWCAtIDEsIHR1cm5PcmRlclkgLSAxLCAyMCwgOSwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHR1cm5PcmRlclggKyAxLCB0dXJuT3JkZXJZKTtcclxuICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihcIkxpZmVcIiwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHR1cm5PcmRlclggKyA4LCB0dXJuT3JkZXJZKTtcclxuICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihcIkVsZW1lbnRcIiwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuICAgICAgICAgICAgaW50IGluZGV4ID0gLTE7IC8vdXNpbmcgdGhpcyBiZWNhdXNlIG5vdCBhbGwgdW5pdHMgZ2V0IGRyYXduXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlXHJcblxyXG4gICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZSA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlLmRyYXdMaWZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFlLkRlYWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3IgPSBDb2xvcnMuSGVyb1R1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IENvbG9ycy5FbmVteVR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmVsZW1lbnQgIT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IEVsZW1lbnRUb0F1cmFDb2xvcihlLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdPbmVEaWdpdF9DdXJzb3IoKGludCllLmxpZmUuVmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeE9mZiA9IHR1cm5PcmRlclggKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB5T2ZmID0gdHVybk9yZGVyWSArIDIgKyBpbmRleCAqIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9EcmF3RW50aXR5Q2hhcihlLCBjb2xvciwgeE9mZiwgeU9mZik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0NoYXIoR2V0Q2hhcihlKSwgeE9mZiwgdHVybk9yZGVyWSArIDIsIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1R3b0RpZ2l0cygoaW50KWUubGlmZSwgeE9mZiwgeU9mZiwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBlbGVtZW50ID0gc3RyaW5nLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZS5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkZpcmU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gXCJGaXJlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkljZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBcIkljZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IFwiVGh1bmRlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVDb2xvciA9IEVsZW1lbnRUb0F1cmFDb2xvcihlLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhlbGVtZW50LCB4T2ZmICsgNywgeU9mZiwgZUNvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3T25lRGlnaXRfQ3Vyc29yKChpbnQpZS5saWZlLlZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSh4OiAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdUdXJuT3JkZXIoaW50IHR1cm5PcmRlclgsIGludCB0dXJuT3JkZXJZLCBib29sIGhvcml6b250YWwgPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmFsdWUgdHVybnNQZXJQaGFzZSA9IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2U7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh0dXJuT3JkZXJYICsgMywgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJDb21tYW5kc1wiLCBDb2xvcnMuV2luZG93TGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgaW50IGRyYXdpbmdJZCA9IC0xO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBlID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuZHJhd1R1cm4pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuRGVhZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3aW5nSWQrKztcclxuICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3IgPSBDb2xvcnMuSGVyb1R1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IENvbG9ycy5FbmVteVR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmVsZW1lbnQgIT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IEVsZW1lbnRUb0F1cmFDb2xvcihlLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3T25lRGlnaXRfQ3Vyc29yKChpbnQpZS5saWZlLlZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHhPZmYgPSB0dXJuT3JkZXJYICsgMSArIGRyYXdpbmdJZCAqIDM7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHlFbnRpdHkgPSB0dXJuT3JkZXJZICsgMjtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeUZpcnN0TW92ZSA9IHR1cm5PcmRlclkgKyAzO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4Rmlyc3RNb3ZlID0geE9mZjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaG9yaXpvbnRhbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhPZmYgPSB0dXJuT3JkZXJYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5RW50aXR5ID0gdHVybk9yZGVyWSArIDIgKyBkcmF3aW5nSWQgKiAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5Rmlyc3RNb3ZlID0geUVudGl0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeEZpcnN0TW92ZSA9IHR1cm5PcmRlclggKyAzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBEcmF3RW50aXR5Q2hhcihlLCBjb2xvciwgeE9mZiwgeUVudGl0eSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh4Rmlyc3RNb3ZlLCB5Rmlyc3RNb3ZlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaTIgPSAwOyBpMiA8IHR1cm5zUGVyUGhhc2U7IGkyKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3IyID0gY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBiYWNrQ29sb3IgPSBDb2xvcnMuQmFja0NvbW1hbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJhd2luZ0lkID09IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSAmJiBpMiA9PSB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS50dXJuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb2xvcjIgPSBDb2xvcnMuSGVybztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrQ29sb3IgPSBDb2xvcnMuQmFja0JhdHRsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjIgPSBDb2xvcnMuSW5wdXREZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpMiA8IHR1cm5zUGVyUGhhc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBjID0gR2V0Q2hhck9mTW92ZShlLCBpMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUhvdmVyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgUmVjdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLkxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLCBlLm1vdmVzW2kyXSkpOyAvL2FkZCBoZXJlLi4uPyBAX0BcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoYywgY29sb3IyLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhvcml6b250YWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IGMuTGVuZ3RoOyBqIDwgMzsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkFkdmFuY2VDdXJzb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKCcgJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoJyAnLCBjb2xvciwgQ29sb3JzLkJhY2tDb21tYW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaG9yaXpvbnRhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5DdXJzb3JOZXdMaW5lKHg6IHhGaXJzdE1vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5DdXJzb3JOZXdMaW5lKHg6IDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd0VudGl0eUNoYXIoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGUsIGludCBjb2xvciwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hhcltdIGNoYXJzID0gR2V0Q2hhcihlKTtcclxuXHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3KGNoYXJzLCB4LCB5LCBjb2xvcik7XHJcbiAgICAgICAgICAgIGlmIChlLmdyYXBoaWNSZXBlYXRlZEluZGV4ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdPbmVEaWdpdChlLmdyYXBoaWNSZXBlYXRlZEluZGV4ICsgMSwgeCArIGNoYXJzLkxlbmd0aCwgeSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0cmluZyBHZXRDaGFyT2ZNb3ZlKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGUsIGludCBpMilcclxuICAgICAgICB7XHJcblxyXG5cclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gZS5tb3Zlc1tpMl07XHJcbiAgICAgICAgICAgIGlmICh2YWwgPj0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiBtb3ZlQ2hhcnNbKEJhdHRsZU1haW4uTW92ZVR5cGUpdmFsXTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiIFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNoYXJbXSBHZXRDaGFyKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGdhbWVFbnRpdHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZW50aXRpZXNDaGFyc1tnYW1lRW50aXR5LmdyYXBoaWNdO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3TW92ZShWYWx1ZSBtb3ZlLCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobW92ZS5WYWwgPj0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5Nb3ZlVHlwZSBtID0gKEJhdHRsZU1haW4uTW92ZVR5cGUpbW92ZS5WYWw7XHJcbiAgICAgICAgICAgICAgICBEcmF3TW92ZShtLCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoJyAnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3TW92ZShCYXR0bGVNYWluLk1vdmVUeXBlIG1vdmUsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjID0gbW92ZUNoYXJzW21vdmVdO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoYywgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGV4dEJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBjbGFzcyBDb2xvcnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgR3JpZEhlcm8gPSAxO1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEdyaWRFbmVteSA9IDI7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgSGVybyA9IDM7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgRW5lbXkgPSA0O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEhlcm9UdXJuID0gNTtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBFbmVteVR1cm4gPSA2O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IGlucHV0S2V5ID0gNztcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBCb2FyZCA9IDg7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgV2luZG93TGFiZWwgPSA5O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEZpcmVBdXJhID0gMTA7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgSWNlQXVyYSA9IDExO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IFRodW5kZXJBdXJhID0gMTI7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgRmlyZVNob3QgPSAxMztcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBJY2VTaG90ID0gMTQ7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgVGh1bmRlclNob3QgPSAxNTtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBCYWNrZ3JvdW5kSW5wdXQgPSAxNjtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBJbnB1dERlc2NyaXB0aW9uID0gMTc7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgQmFja0JhdHRsZSA9IDE4O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEJhY2tDb21tYW5kID0gMTk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBJbnB1dEtleVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTk9ORSwgTEVGVCwgUklHSFQsIERPV04sIFVQLCBGSVJFLCBSRURPLCBET05FLFxyXG4gICAgICAgICAgICBJQ0UsXHJcbiAgICAgICAgICAgIFRIVU5ERVIsXHJcbiAgICAgICAgICAgIE5PUk1BTFNIT1RcclxuICAgICAgICB9XHJcblxuXHJcblxyXG4gICAgXG5wcml2YXRlIGludCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fSW5wdXRVbmljb2RlPS0xO31cclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlbjtcclxudXNpbmcgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR2FtZU1haW4gOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEJhdHRsZU1haW4gYmF0dGxlTWFpbjtcclxuICAgICAgICBwcml2YXRlIEJhdHRsZVJlbmRlciBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBNb2RlU2VsZWN0aW9uU2NyZWVuIG1vZGVTZWxlY3Rpb25TY3JlZW47XHJcbiAgICAgICAgSVRleHRTY3JlZW5fIG1haW5EcmF3O1xyXG4gICAgICAgIHByaXZhdGUgSGVscFNjcmVlbiBoZWxwU2NyZWVuO1xyXG4gICAgICAgIHByaXZhdGUgUmVzdWx0U2NyZWVuIHJlc3VsdFNjcmVlbjtcclxuICAgICAgICAvL0lUZXh0U2NyZWVuW10gc2NyZWVucyA9IG5ldyBJVGV4dFNjcmVlbls1XTtcclxuICAgICAgICBpbnQgc3RhZ2VJZDtcclxuICAgICAgICBpbnRbXSBlbmVteUFtb3VudCA9IG5ldyBpbnRbXSAgIHsgMSwgMSwgMiwgMSwgMiwgMywgMiwgMywgMSwgMiwgMywgMyB9O1xyXG4gICAgICAgIGludFtdIHR1cm5BbW91bnQgPSBuZXcgaW50W10geyAyLCA0LCAyLCA2LCA0LCAyLCA2LCA0LCA4LCA4LCA2LCA4IH07XHJcbiAgICAgICAgcHJpdmF0ZSBNb3VzZUhvdmVyVGV4dCBtb3VzZUhvdmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgR2FtZU1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZVNlbGVjdGlvblNjcmVlbiA9IG5ldyBNb2RlU2VsZWN0aW9uU2NyZWVuKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuLm1vZGUgPSAxO1xyXG4gICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuLndhbm5hTGVhdmUgPSAxO1xyXG4gICAgICAgICAgICBtYWluRHJhdyA9IG1vZGVTZWxlY3Rpb25TY3JlZW47XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL1Jlc2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy92YXIgbW92ZVJlbmRlckluZm8gPSBuZXcgTW92ZVJlbmRlckluZm8oKTtcclxuICAgICAgICAgICAgLy9tb3ZlUmVuZGVySW5mby5BZGRNb3ZlTmFtZXMoKTtcclxuICAgICAgICAgICAgc3RyaW5nW10gbW92ZURlc2NyaXB0aW9ucyA9IG5ldyBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgICAgICBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIHVwXCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIGRvd25cIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSByaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTaG9vdHMgZm9yd2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTaG9vdHMgZmlyZSBmb3J3YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBcIlNob290cyBpY2UgZm9yd2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTaG9vdHMgdGh1bmRlciBmb3J3YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBcIlRocm93cyBpY2UgYm9tYiB0aHJlZSBzcXVhcmVzIGZvcndhcmRcIixcclxuICAgICAgICAgICAgICAgIFwiVGhyb3dzIHRodW5kZXIgYm9tYiB0aHJlZSBzcXVhcmVzIGZvcndhcmRcIixcclxuICAgICAgICAgICAgICAgIFwiU3VtbW9ucyBhbm90aGVyIGVuZW15XCIsXHJcbiAgICAgICAgICAgICAgICBcIlwiLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaW50IG1vZGUgPSBtb2RlU2VsZWN0aW9uU2NyZWVuLm1vZGU7XHJcbiAgICAgICAgICAgIGJvb2wgdGltZUF0dGFjayA9IG1vZGVTZWxlY3Rpb25TY3JlZW4udGltZUF0dGFjaztcclxuXHJcbiAgICAgICAgICAgIHZhciBlY3MgPSBFQ1NNYW5hZ2VyLkNyZWF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgU3RhZ2VEYXRhQ3JlYXRvciBzZGMgPSBuZXcgU3RhZ2VEYXRhQ3JlYXRvcihlY3MpO1xyXG4gICAgICAgICAgICB2YXIgc3RhZ2VzID0gZWNzLlF1aWNrQWNjZXNzb3IxPFN0YWdlRGF0YT4oKTtcclxuICAgICAgICAgICAgLy92YXIgc3RhZ2VzID0gc2RjLnN0YWdlcztcclxuXHJcbiAgICAgICAgICAgIGludCBkID0gc3RhZ2VJZDtcclxuICAgICAgICAgICAgaWYgKHN0YWdlcy5Db3VudCA8PSBkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJhdyA9IG1vZGVTZWxlY3Rpb25TY3JlZW47XHJcbiAgICAgICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuLlJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBzdGFnZUlkID0gMDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2QgPSAyMDA7XHJcbiAgICAgICAgICAgIGlmIChkID49IGVuZW15QW1vdW50Lkxlbmd0aCkgZCA9IGVuZW15QW1vdW50Lkxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGludCBuRW5lbWllcyA9IGVuZW15QW1vdW50W2RdO1xyXG5cclxuICAgICAgICAgICAgQmF0dGxlU2V0dXAgYmF0dGxlU2V0dXAgPSBuZXcgQmF0dGxlU2V0dXAobW9kZSwgc3RhZ2VJZCwgZWNzKTtcclxuICAgICAgICAgICAgdmFyIG1vdmVDcmVhdG9yID0gYmF0dGxlU2V0dXAubW92ZUNyZWF0b3I7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4gPSBiYXR0bGVTZXR1cC5iYXR0bGVNYWluO1xyXG4gICAgICAgICAgICBMaXN0PE1vdmVSZW5kZXJEYXRhPiBtb3ZlUmVuZGVycyA9IG1vdmVDcmVhdG9yLm1vdmVSZW5kZXJzO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IG1vdmVSZW5kZXJzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1vdmVSZW5kZXJzW2ldLkRlc2NyaXB0aW9uID0gbW92ZURlc2NyaXB0aW9uc1tpXTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJ7MH0gezF9XCIsIG1vdmVSZW5kZXJzW2ldLkxhYmVsLCBtb3ZlUmVuZGVyc1tpXS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgSGVscFNjcmVlbk1vZGVsIGhlbHBNb2RlbCA9IG5ldyBIZWxwU2NyZWVuTW9kZWwoYmF0dGxlTWFpbik7XHJcbiAgICAgICAgICAgIGhlbHBTY3JlZW4gPSBuZXcgSGVscFNjcmVlbihoZWxwTW9kZWwsIG1vdmVSZW5kZXJzLCBtb3ZlQ3JlYXRvci5tb3ZlRGF0YXMpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBzID0gbmV3IFByZXZpZXdTeXN0ZW0oZWNzLCBiYXR0bGVNYWluKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9lY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChuZXcgRW5lbXlTcGF3bkRhdGEoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSkpO1xyXG4gICAgICAgICAgICAvL2Vjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG5ldyBFbmVteVNwYXduRGF0YSgxLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgZmxvYXQgdGltZVRvQ2hvb3NlID0gLTE7XHJcbiAgICAgICAgICAgIGlmICh0aW1lQXR0YWNrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lVG9DaG9vc2UgPSAoNWYgKiB0dXJuQW1vdW50W2RdKSAqIG5FbmVtaWVzO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmF0dGxlTWFpbi50aW1lVG9DaG9vc2VNYXggPSB0aW1lVG9DaG9vc2U7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uSW5pdCgpO1xyXG4gICAgICAgICAgICBiYXR0bGVSZW5kZXIgPSBuZXcgQmF0dGxlUmVuZGVyKGJhdHRsZU1haW4sIHN0YWdlRGF0YTpzdGFnZXMuQ29tcDEoc3RhZ2VJZCksIFByZXZpZXdTeXN0ZW06cHMpO1xyXG4gICAgICAgICAgICBuZXcgQXR0YWNrUHJldmlldyhlY3MsIGJhdHRsZVJlbmRlcik7XHJcbiAgICAgICAgICAgIG5ldyBIYXBwSGFuZGxpbmcoYmF0dGxlUmVuZGVyLCBiYXR0bGVTZXR1cCk7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoaGVscFNjcmVlbi5Jc1dhbm5hU2hvd0ludHJvKCkpIHtcclxuICAgICAgICAgICAgICAgIGhlbHBTY3JlZW4uU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyYXcgPSBoZWxwU2NyZWVuO1xyXG4gICAgICAgICAgICAgICAgaGVscE1vZGVsLmJhdHRsZUludHJvTW9kZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIG1haW5EcmF3ID0gYmF0dGxlUmVuZGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2hlbHBTY3JlZW4uXHJcbiAgICAgICAgICAgIHJlc3VsdFNjcmVlbiA9IG5ldyBSZXN1bHRTY3JlZW4oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJlc3VsdFNjcmVlbi5iYXR0bGVSZXN1bHQgPSBiYXR0bGVNYWluLmJhdHRsZVJlc3VsdDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIE1vdXNlSG92ZXJNYW5hZ2VyIGhvdmVyTWFuYWdlciA9IG5ldyBNb3VzZUhvdmVyTWFuYWdlcihNb3VzZSk7XHJcbiAgICAgICAgICAgIGhvdmVyTWFuYWdlci5tb3VzZUhvdmVycy5BZGQobmV3IE1vdXNlSG92ZXIobmV3IEJhc2VVdGlscy5SZWN0KDUsNSw1LDUpLCAwLDApKTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBtb3VzZUhvdmVyID0gbmV3IE1vdXNlSG92ZXJUZXh0KGhvdmVyTWFuYWdlciwgYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRGcmVlRW50aXR5KDUwLCAxKSwgbW92ZURlc2NyaXB0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICBiYXR0bGVSZW5kZXIubW91c2VIb3ZlciA9IGhvdmVyTWFuYWdlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXQgeyBzZXQgeyBtYWluRHJhdy5JbnB1dCA9IHZhbHVlOyB9IGdldCB7IHJldHVybiAnYyc7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRVbmljb2RlIHsgc2V0IHsgdmFsdWUgPSByZW1hcC5SZW1hcCh2YWx1ZSk7IG1haW5EcmF3LklucHV0VW5pY29kZSA9IHZhbHVlOyB9IGdldCB7IHJldHVybiAnYyc7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgTW91c2VJTyBNb3VzZSB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgVW5pY29kZVJlbWFwIHJlbWFwID0gbmV3IFVuaWNvZGVSZW1hcCgpO1xyXG4gICAgICAgIGludGVybmFsIHN0YXRpYyByZWFkb25seSBpbnQgV2lkdGggPSA2ODtcclxuICAgICAgICBpbnRlcm5hbCBzdGF0aWMgcmVhZG9ubHkgaW50IEhlaWdodCA9IDQ2O1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRHJhd0lucHV0KGludCB4MiwgaW50IHkyLCBpbnQgdW5pY29kZSwgc3RyaW5nIGRlc2NyaXB0aW9uLCBUZXh0Qm9hcmQgVGV4dEJvYXJkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdVbmljb2RlTGFiZWwodW5pY29kZSwgeDIsIHkyLCBCYXR0bGVSZW5kZXIuQ29sb3JzLmlucHV0S2V5KTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoZGVzY3JpcHRpb24sIHgyICsgMiArIDUsIHkyLCBCYXR0bGVSZW5kZXIuQ29sb3JzLklucHV0RGVzY3JpcHRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW91c2VIb3Zlci5VcGRhdGUoKTtcclxuICAgICAgICAgICAgbWFpbkRyYXcuRHJhdyhmKTtcclxuICAgICAgICAgICAgbWFpbkRyYXcuTW91c2UgPSBNb3VzZTtcclxuICAgICAgICAgICAgaWYgKGhlbHBTY3JlZW4ud2FubmFMZWF2ZSA9PSB0cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBoZWxwU2NyZWVuLndhbm5hTGVhdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG1haW5EcmF3ID0gYmF0dGxlUmVuZGVyO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWFpbkRyYXcgPT0gYmF0dGxlUmVuZGVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmF0dGxlUmVuZGVyLmhlbHBWaXN1YWxpemVSZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVscFNjcmVlbi5TaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkRyYXcgPSBoZWxwU2NyZWVuO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZVJlbmRlci5oZWxwVmlzdWFsaXplUmVxdWVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBTY3JlZW4uSGVscE1vZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChiYXR0bGVNYWluLklzT3ZlcigpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXR0bGVNYWluLklzVmljdG9yeSgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhZ2VJZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRTY3JlZW4uRW50ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYWluRHJhdyA9IHJlc3VsdFNjcmVlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWFpbkRyYXcgPT0gcmVzdWx0U2NyZWVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0U2NyZWVuLndhbm5hTGVhdmUgPT0gMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtYWluRHJhdyA9PSBtb2RlU2VsZWN0aW9uU2NyZWVuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9kZVNlbGVjdGlvblNjcmVlbi53YW5uYUxlYXZlID09IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1haW5EcmF3LkdldEJvYXJkKCk7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgTW91c2VJTyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fTW91c2U9bmV3IE1vdXNlSU8oKTt9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW47XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFJlc3VsdFNjcmVlbiA6IElUZXh0U2NyZWVuX1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuICAgICAgICBzdHJpbmcgeW91V2luID0gXCJZb3UgV2luXCI7XHJcbiAgICAgICAgcHVibGljIE1vdXNlSU8gTW91c2UgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHN0cmluZyB5b3VMb3NlID0gXCJZb3UgbG9zZVwiO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVSZXN1bHQgYmF0dGxlUmVzdWx0O1xyXG4gICAgICAgIHB1YmxpYyBSZXN1bHRTY3JlZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuSW5pdCg2MCwgMjUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IHdhbm5hTGVhdmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXQgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyBnZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRW50ZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2FubmFMZWF2ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KGZsb2F0IGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoSW5wdXRVbmljb2RlID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2FubmFMZWF2ZSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RyaW5nIG1lc3NhZ2UgPSB5b3VXaW47XHJcbiAgICAgICAgICAgIGlmIChiYXR0bGVSZXN1bHQucmVzdWx0ID09IDIpIG1lc3NhZ2UgPSB5b3VMb3NlO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihtZXNzYWdlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5UaHVuZGVyU2hvdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZXN0R2FtZSA6IElUZXh0R2FtZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBUZXh0U2NyZWVuSG9sZGVyIFNjcmVlbkhvbGRlciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUgR2V0UGFsZXR0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRGVmYXVsdFBhbGV0dGVzLkM0Tm92ZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRTY3JlZW5OIHNjcmVlbiA9IG5ldyBUZXN0U2NyZWVuKCk7XHJcbiAgICAgICAgICAgIFNjcmVlbkhvbGRlci5TZXRBbGwoc2NyZWVuKTtcclxuICAgICAgICAgICAgc2NyZWVuLkluaXQodywgaCk7XHJcbiAgICAgICAgICAgIHNjcmVlbi5HZXRCb2FyZCgpLkRyYXcoXCJUZXN0XCIsIDAsMCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBUZXh0U2NyZWVuSG9sZGVyIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19TY3JlZW5Ib2xkZXI9bmV3IFRleHRTY3JlZW5Ib2xkZXIoKTt9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRlc3RTY3JlZW4gOiBUZXh0U2NyZWVuTlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW47XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1vZGVTZWxlY3Rpb25TY3JlZW4gOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcbiAgICAgICAgc3RyaW5nIHlvdVdpbiA9IFwiWW91IFdpblwiO1xyXG4gICAgICAgIHN0cmluZyB5b3VMb3NlID0gXCJZb3UgbG9zZVwiO1xyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIE1vdXNlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBpbnQgc2VsZWN0aW9uO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVSZXN1bHQgYmF0dGxlUmVzdWx0O1xyXG4gICAgICAgIHB1YmxpYyBNb2RlU2VsZWN0aW9uU2NyZWVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZCA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkluaXQoNzAsIDI1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGludCB3YW5uYUxlYXZlO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgbW9kZTtcclxuICAgICAgICBwdWJsaWMgYm9vbCB0aW1lQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgcHVibGljIGludCBzY3JlZW5TdGFnZTtcclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dCB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFbnRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3YW5uYUxlYXZlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuUmVzZXQoKTtcclxuICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleSBpayA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5KSBJbnB1dDtcclxuICAgICAgICAgICAgbW9kZSA9IC0xO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXcoXCJQcm9nQmF0dGxlIFByb3RvdHlwZSB2MC4zXCIsIDEsIDEsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3KFwiQSBnYW1lIGJ5IFBpZHJvaFwiLCAxLCAyLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgIGlmIChzY3JlZW5TdGFnZSA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGlrKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuTEVGVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NyZWVuU3RhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5SSUdIVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NyZWVuU3RhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXR0YWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkRPV046XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVBdHRhY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LlVQOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUF0dGFjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3ddIFZhbmlsbGFcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDQsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIlthXSBFbGVtZW50YWxcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDUsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIltzXSBWYW5pbGxhIFRpbWUgQXR0YWNrXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA2LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbZF0gRWxlbWVudGFsIFRpbWUgQXR0YWNrXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA3LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzY3JlZW5TdGFnZSA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWsgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5VUClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpayA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkRPV04pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuU3RhZ2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJFbGVtZW50YWwgTW9kZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogLTUpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJGaXJlIGJlYXRzIEljZSwgSWNlIGJlYXRzIFRodW5kZXIsIFRodW5kZXIgYmVhdHMgZmlyZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogLTIpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJTYW1lIGVsZW1lbnQgPSBubyBkYW1hZ2VcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDApO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJJdCBpcyBiZXN0IHRvIGhhdmUgaGFkIHNvbWUgZXhwZXJpZW5jZSB3aXRoIHZhbmlsbGEgbW9kZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogMSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIlt3XSBTdGFydCBFbGVtZW50YWwgTW9kZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNCwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3NdIEdvIGJhY2tcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDUsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZSA+PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3YW5uYUxlYXZlID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy9zdHJpbmcgbWVzc2FnZSA9IHlvdVdpbjtcclxuICAgICAgICAgICAgLy9pZiAoYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAyKSBtZXNzYWdlID0geW91TG9zZTtcclxuICAgICAgICAgICAgLy90ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihtZXNzYWdlLCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlID0gLTE7XHJcbiAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmxpbmtBbmltIDogVGV4dEFuaW1hdGlvbjxCbGlua0FuaW0uQmxpbmtEYXRhPlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgQmxpbmtEYXRhIG1haW5EYXRhLCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Nb2RpZnkoZW50aXR5LCBtYWluRGF0YSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgICAgIGZsb2F0IGF1eCA9IHByb2dyZXNzO1xyXG4gICAgICAgICAgICBib29sIGJsaW5rID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2hpbGUgKHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChibGluaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXggLT0gbWFpbkRhdGEuYmxpbmtBY3RpdmVUaW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eCAtPSBtYWluRGF0YS5ibGlua0luYWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGF1eCA8IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxpbmsgPSAhYmxpbms7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFibGluaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1haW5EYXRhLmNoYW5nZUludmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBlbnRpdHkuQW5pbWF0aW9uLlNldEFsbChtYWluRGF0YS50ZXh0LCBtYWluRGF0YS50ZXh0Q29sb3IsIG1haW5EYXRhLmJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbnRpdHkuQW5pbWF0aW9uLlNldEFsbElmVmlzaWJsZShtYWluRGF0YS50ZXh0LCBtYWluRGF0YS50ZXh0Q29sb3IsIG1haW5EYXRhLmJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgQmxpbmtEYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY2hhciB0ZXh0O1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGJhY2tDb2xvciwgdGV4dENvbG9yO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgYmxpbmtBY3RpdmVUaW1lO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgYmxpbmtJbmFjdGl2ZTtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvb2wgY2hhbmdlSW52aXNpYmxlO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEJsaW5rRGF0YShjaGFyIHRleHQsIGludCBiYWNrQ29sb3IsIGludCB0ZXh0Q29sb3IsIGZsb2F0IGJsaW5rQWN0aXZlVGltZSwgZmxvYXQgYmxpbmtJbmFjdGl2ZSwgYm9vbCBjaGFuZ2VOb0NoYW5nZUNvbG9yID0gdHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFja0NvbG9yID0gYmFja0NvbG9yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29sb3IgPSB0ZXh0Q29sb3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsaW5rQWN0aXZlVGltZSA9IGJsaW5rQWN0aXZlVGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxpbmtJbmFjdGl2ZSA9IGJsaW5rSW5hY3RpdmU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUludmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgQmxpbmtEYXRhIEJhY2tDb2xvcihpbnQgYmFja0NvbG9yLCBmbG9hdCBibGlua0R1cmF0aW9uLCBib29sIGNoYW5nZU5vQ2hhbmdlQ29sb3IgPSB0cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJsaW5rRGF0YShUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBiYWNrQ29sb3IsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBibGlua0R1cmF0aW9uLCBibGlua0R1cmF0aW9uLCBjaGFuZ2VOb0NoYW5nZUNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBCbGlua0RhdGEgRnJvbnRDb2xvcihpbnQgZnJvbnRDb2xvciwgZmxvYXQgYmxpbmtEdXJhdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCbGlua0RhdGEoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIGZyb250Q29sb3IsICBibGlua0R1cmF0aW9uLCBibGlua0R1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBCbGlua0RhdGEgQ2hhcihjaGFyIGMsIGZsb2F0IGJsaW5rRHVyYXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmxpbmtEYXRhKGMsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgYmxpbmtEdXJhdGlvbiwgYmxpbmtEdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDaGFyQnlDaGFyQW5pbWF0aW9uIDogVGV4dEFuaW1hdGlvbjxDaGFyQnlDaGFyQW5pbWF0aW9uLkNoYXJCeUNoYXJEYXRhPlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgQ2hhckJ5Q2hhckRhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgZmxvYXQgcmF0aW8gPSBwcm9ncmVzcyAvIGxlbmd0aDtcclxuICAgICAgICAgICAgZmxvYXQgbGVuZ3RoVGV4dCA9IG1haW5EYXRhLmNoYXJFbmQgLSBtYWluRGF0YS5jaGFyU3RhcnQ7XHJcbiAgICAgICAgICAgIGludCBsaW5lQnJlYWtzID0gMDtcclxuICAgICAgICAgICAgaW50IG9mZnNldGVkUGVybSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSBtYWluRGF0YS5jaGFyU3RhcnQ7IGkgPCBtYWluRGF0YS5jaGFyRW5kOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBvZmZzZXRlZCA9IGkgKyBvZmZzZXRlZFBlcm07XHJcbiAgICAgICAgICAgICAgICBpbnQgbGluZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGIgPSBlbnRpdHkuQW5pbWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG9mZnNldGVkID49IHRiLldpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmUrKztcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRlZCAtPSB0Yi5XaWR0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChlbnRpdHkuT3JpZ2luLkNoYXJBdChvZmZzZXRlZCwgbGluZSArIGxpbmVCcmVha3MpID09ICdcXG4nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVCcmVha3MrKztcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRlZFBlcm0gLT0gb2Zmc2V0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPiAoKGxlbmd0aFRleHQgKiByYXRpbykgKyBtYWluRGF0YS5jaGFyU3RhcnQpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRiLkRyYXdDaGFyKCcgJywgb2Zmc2V0ZWQsIGxpbmUgKyBsaW5lQnJlYWtzKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RiLkRyYXcoXCJcIiArIGksIDYsIDUsIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBDaGFyQnlDaGFyRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50ZXJuYWwgaW50IGNoYXJTdGFydDtcclxuICAgICAgICAgICAgaW50ZXJuYWwgaW50IGNoYXJFbmQ7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQ2hhckJ5Q2hhckRhdGEoaW50IGNoYXJTdGFydCwgaW50IGNoYXJFbmQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhclN0YXJ0ID0gY2hhclN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFyRW5kID0gY2hhckVuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
