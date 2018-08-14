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
                if (!this.model.battleIntroMode) {
                    this.explanationEntity.Origin.Draw_Cursor_SmartLineBreak("Input your commands and watch the turn play out. Plan your moves based on what the enemy will do!", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.InputDescription);
                    this.explanationEntity.Origin.CursorNewLine(0);
                    this.explanationEntity.Origin.CursorNewLine(0);
                    this.explanationEntity.Origin.Draw_Cursor_SmartLineBreak("Attacks have three elements, Fire, Thunder and Ice. Fire beats Ice, Ice beats Thunder, Thunder beats Fire.", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.InputDescription);
                    this.explanationEntity.Origin.CursorNewLine(0);
                    this.explanationEntity.Origin.CursorNewLine(0);

                    this.explanationEntity.Origin.Draw_Cursor_SmartLineBreak("The element of the attacker changes upon attacking. Attackers are immune to attacks of the same element!", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.InputDescription);
                    pos = (pos + 15) | 0;
                } else {
                    pos = 5;
                }

                this.textWorld.Draw();

                //textWorld.mainBoard.DrawWithLinebreaks("Input your commands and watch the turn play out. You can see everything your enemies will do\n", 2, pos, 2, BattleRender.Colors.InputDescription);


                this.textWorld.mainBoard.Draw$1("YOUR COMMANDS", 2, ((pos - 2) | 0), Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey);
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
                this.textWorld.mainBoard.Draw$1("ENEMY COMMANDS", 2, pos, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VCdWlsZC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvT2JqZWN0Q2xvbmVyLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvRGVidWdnZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9EZWVwQ2xvbmVIZWxwZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9FeHRlbnNpb25zLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvUG9pbnQuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9SYW5kb21TdXBwbGllci5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1JlY3RhbmdsZS5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1RpbWVTdGFtcC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1VuaWNvZGUuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9WZWN0b3IyRC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1ZlY3RvcjNELmNzIiwiLi4vVHVybkJhc2VkTG9naWMvTW92ZURhdGEuY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0FzeW5jVGFza3MuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9CYXR0bGVTZXR1cC5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0JhdHRsZU1haW4uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0NvbG9yU3R1ZmYuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9EZWJ1Z0V4dHJhL0RlYnVnRXguY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9FQ1NJbnRlZ3JhdGlvbi5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0VuZW15QUkuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9TcGF3bkZhY3RvcnkuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9FbmVteURhdGFDcmVhdG9yLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvU3RhZ2VEYXRhLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvTW92ZURhdGFFeGVjdXRlci5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0hhcHBzL0hhcHAuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9JbnB1dEhvbGRlci5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL01vdmVDcmVhdG9yUHJvZy5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9BY2Nlc3Nvci5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9DbG9uZWRTdGF0ZS5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9FQ1NNYW5hZ2VyLmNzIiwiLi4vLi4vVmlzdWFsU3R1ZGlvU29sdXRpb25SbWsvRUNTL0VudGl0eS5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9Qcm9jZXNzb3JGbGV4LmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvVGV4dFdvcmxkLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvUGFsZXR0ZS5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL0dhbWVTY3JlZW4vTW91c2VIb3Zlci5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL0dhbWVTY3JlZW4vVW5pY29kZVJlbWFwLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvVGV4dEJvYXJkLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvR2FtZVNjcmVlbi9JVGV4dFNjcmVlbk4uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0F0dGFja1ByZXZpZXcuY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0hhcHBIYW5kbGluZy5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvSGVscFNjcmVlbi5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvSW5wdXRIYW5kbGluZy5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvTWVzc2FnZU9uUG9zaXRpb24uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL01vdXNlSG92ZXJUZXh0LmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9QcmV2aWV3U3lzdGVtLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9SZWZsZWN0aW9uVGVzdC5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvQmF0dGxlUmVuZGVyLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9HYW1lTWFpbi5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvUmVzdWx0U2NyZWVuLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvR2FtZVNjcmVlbi9UZXN0R2FtZS5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvTW9kZVNlbGVjdGlvblNjcmVlbi5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL0JsaW5rQW5pbWF0aW9uLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvQ2hhckJ5Q2hhckFuaW1hdGlvbi5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7OztZQTREWUE7O1lBRUFBLHFDQUFjQSxtQ0FBUUE7WUFDdEJBLHlCQUFTQTtZQUNUQSxLQUFLQSxXQUFXQSxJQUFJQSxzREFBMEJBOztnQkFHMUNBLDBDQUFPQSxHQUFQQSwyQkFBWUEsaUVBQWtCQSxH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Q0E7b0JBRURBLElBQUlBO3dCQUVBQSx3QkFBd0JBLGVBQWVBLG9CQUFvQkE7O3dCQUczREEsaUNBQWlDQSxlQUFlQSxvQkFBb0JBOzs7Ozs7Ozs7OztnQ0NwQ3BEQSxRQUFtQkEsVUFBeUJBLFVBQWdCQTtnQkFFcEZBLDRIQUFZQSxRQUFRQSxVQUFVQSxVQUFVQTtnQkFDeENBLFlBQWNBLFdBQVdBO2dCQUN6QkEsaUJBQW1CQSxvQkFBbUJBO2dCQUN0Q0E7Z0JBQ0FBO2dCQUNBQSxLQUFLQSxRQUFRQSxvQkFBb0JBLElBQUlBLGtCQUFrQkE7b0JBRW5EQSxlQUFlQSxLQUFJQTtvQkFDbkJBO29CQUNBQSxTQUFTQTs7O29CQUdUQSxPQUFPQSxZQUFZQTt3QkFFZkE7d0JBQ0FBLHVCQUFZQTs7b0JBRWhCQSxJQUFJQSxxQkFBcUJBLFVBQVVBLFNBQU9BO3dCQUV0Q0E7d0JBQ0FBLCtCQUFnQkE7d0JBQ2hCQTs7b0JBRUpBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLGFBQWFBLFNBQVNBO3dCQUU1QkEsZ0JBQWlCQSxVQUFVQSxTQUFPQTs7Ozs7Ozs7Ozs7O2dDcEJzS2xCQSxRQUFtQkEsVUFBdUJBLFVBQWdCQTtnQkFFbEZBLHdIQUFZQSxRQUFRQSxVQUFVQSxVQUFVQTtnQkFDeENBLGFBQW1CQTtnQkFDbkJBLElBQUlBO29CQUNBQSxTQUFTQTs7Z0JBQ2JBLGtCQUFrQkEsNkNBQTRCQSxpQ0FBd0JBLCtCQUFzQkEsV0FBV0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbi8vdXNpbmcgRUNTO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZztcclxuLy91c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlQnVpbGRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludCBidWZmZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgYm9vbCBidWZmZXJPbjtcclxuICAgICAgICAvL3ByaXZhdGUgc3RhdGljIEhUTUxQcmVFbGVtZW50IHRleHQ7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgR2FtZU1haW4gZ3I7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVGV4dEJvYXJkIFRleHRCb2FyZDtcclxuICAgICAgICAvL3ByaXZhdGUgc3RhdGljIFN0cmluZ0J1aWxkZXIgc2I7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nW10gY29sb3JzO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludCBidWZmZXJVbmljb2RlID0gLTE7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVGV4dEJvYXJkIGF1eDtcclxuICAgICAgICBzdGF0aWMgRGF0ZVRpbWUgbGFzdCA9IERhdGVUaW1lLk5vdztcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIENhbkRyYXc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgU2V0dXBHYW1lKG91dCBHYW1lTWFpbiBnciwgb3V0IFRleHRCb2FyZCBUZXh0Qm9hcmQpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgUmFuZG9tIHJuZCA9IG5ldyBSYW5kb20oKTtcclxuICAgICAgICAgICAgUmFuZG9tU3VwcGxpZXIuR2VuZXJhdGUgPSAoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGZsb2F0KXJuZC5OZXh0RG91YmxlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBnciA9IG5ldyBHYW1lTWFpbigpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQgPSBnci5HZXRCb2FyZCgpO1xyXG4gICAgICAgICAgICBhdXggPSBuZXcgVGV4dEJvYXJkKDMwMCwgMzAwKTtcclxuXHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgQmxhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IGkgPSAzO1xyXG4gICAgICAgICAgICBwdWJsaWMgQnJpZGdlQnVpbGQuQXBwLlZlY3RvciBwb3MgPSBuZXcgQnJpZGdlQnVpbGQuQXBwLlZlY3RvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RydWN0IFZlY3RvclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IHg7XHJcbiAgICAgICAgICAgIHB1YmxpYyBmbG9hdCB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9EZWVwQ2xvbmVIZWxwZXIuZGVidWcuQWN0aXZlKGZhbHNlKTtcclxuICAgICAgICAgICAgLy9uZXcgUmVmbGVjdGlvblRlc3QoKTtcclxuICAgICAgICAgICAgVGVzdEVudGl0eVN5c3RlbSgpO1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiR2FtZSBTdGFydFwiKTtcclxuICAgICAgICAgICAgU2V0dXBHYW1lKG91dCBnciwgb3V0IFRleHRCb2FyZCk7XHJcbiAgICAgICAgICAgIGNvbG9ycyA9IG5ldyBzdHJpbmdbMzBdO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IENvbG9yU3R1ZmYuY29sb3JzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29sb3JzW2ldID0gQ29sb3JTdHVmZi5jb2xvcnNbaV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gbmV3IEhUTUxTdHlsZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgc3R5bGUuSW5uZXJIVE1MID0gXCJodG1sLGJvZHkge2ZvbnQtZmFtaWx5OiBDb3VyaWVyOyBiYWNrZ3JvdW5kLWNvbG9yOiMxZjI1MjY7IGhlaWdodDogMTAwJTsgY29sb3I6Izg4ODt9XCIgKyBcIlxcbiAjY2FudmFzLWNvbnRhaW5lciB7d2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgdGV4dC1hbGlnbjpjZW50ZXI7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH0gXCI7XHJcbiAgICAgICAgICAgIERvY3VtZW50LkhlYWQuQXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG4gICAgICAgICAgICBidWZmZXIgPSA5O1xyXG4gICAgICAgICAgICBidWZmZXJPbiA9IGZhbHNlO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBEb2N1bWVudC5PbktleVByZXNzICs9IChLZXlib2FyZEV2ZW50IGEpID0+XHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnQgY29kZSA9IGEuS2V5Q29kZTtcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlID09IDApIGNvZGUgPSBhLkNoYXJDb2RlO1xyXG4gICAgICAgICAgICAgICAgaW50IHVuaWNvZGUgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyVW5pY29kZSA9IHVuaWNvZGU7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUodW5pY29kZSk7XHJcbiAgICAgICAgICAgICAgICAvL2J1ZmZlciA9IGEuQ2hhckNvZGU7XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgVXBkYXRlR2FtZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWZ0ZXIgYnVpbGRpbmcgKEN0cmwgKyBTaGlmdCArIEIpIHRoaXMgcHJvamVjdCwgXHJcbiAgICAgICAgICAgIC8vIGJyb3dzZSB0byB0aGUgL2Jpbi9EZWJ1ZyBvciAvYmluL1JlbGVhc2UgZm9sZGVyLlxyXG5cclxuICAgICAgICAgICAgLy8gQSBuZXcgYnJpZGdlLyBmb2xkZXIgaGFzIGJlZW4gY3JlYXRlZCBhbmRcclxuICAgICAgICAgICAgLy8gY29udGFpbnMgeW91ciBwcm9qZWN0cyBKYXZhU2NyaXB0IGZpbGVzLiBcclxuXHJcbiAgICAgICAgICAgIC8vIE9wZW4gdGhlIGJyaWRnZS9pbmRleC5odG1sIGZpbGUgaW4gYSBicm93c2VyIGJ5XHJcbiAgICAgICAgICAgIC8vIFJpZ2h0LUNsaWNrID4gT3BlbiBXaXRoLi4uLCB0aGVuIGNob29zZSBhXHJcbiAgICAgICAgICAgIC8vIHdlYiBicm93c2VyIGZyb20gdGhlIGxpc3RcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgYXBwbGljYXRpb24gd2lsbCB0aGVuIHJ1biBpbiBhIGJyb3dzZXIuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFRlc3RFbnRpdHlTeXN0ZW0oKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFVwZGF0ZUdhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKENhbkRyYXcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERhdGVUaW1lIG5vdyA9IERhdGVUaW1lLk5vdztcclxuICAgICAgICAgICAgICAgIHZhciBzZWNzID0gKG5vdyAtIGxhc3QpLlRvdGFsU2Vjb25kcztcclxuICAgICAgICAgICAgICAgIGlmIChzZWNzID4gMC4wOClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKHNlY3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlY3MgPSAwLjA4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZCA9IGdyLkdldEJvYXJkKCk7XHJcbiAgICAgICAgICAgICAgICBnci5EcmF3KChmbG9hdClzZWNzKTtcclxuICAgICAgICAgICAgICAgIGxhc3QgPSBub3c7XHJcbiAgICAgICAgICAgICAgICBnci5JbnB1dFVuaWNvZGUgPSBidWZmZXJVbmljb2RlO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyVW5pY29kZSA9IC0xO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBtb3VzZVggPSBTY3JpcHQuQ2FsbDxpbnQ+KFwiZ2V0TW91c2VYXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vdXNlWSA9IFNjcmlwdC5DYWxsPGludD4oXCJnZXRNb3VzZVlcIik7XHJcbiAgICAgICAgICAgICAgICBnci5Nb3VzZS5wb3MgPSBuZXcgUG9pbnQyRChtb3VzZVgsIG1vdXNlWSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy87O1NjcmlwdC5DYWxsKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IFRleHRCb2FyZC5IZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFRleHRCb2FyZC5XaWR0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhdXguU2FtZUFzKFRleHRCb2FyZCwgeDogaSwgeTogaikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludCB0Y0kgPSBUZXh0Qm9hcmQuVGV4dENvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGNvbG9yID0gY29sb3JzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRjSSA8IDApIHsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0Y0kgPj0gY29sb3JzLkxlbmd0aCkgeyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IGNvbG9yc1t0Y0ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGJhY2tDb2xvciA9IGNvbG9yc1tUZXh0Qm9hcmQuQmFja0NvbG9yW2ksIGpdXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXIgQGNoYXIgPSBUZXh0Qm9hcmQuQ2hhckF0KGksIGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJkcmF3XCIsIGksIGosIGNvbG9yLCBiYWNrQ29sb3IsIFwiXCIgKyBAY2hhcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXguQ29weShUZXh0Qm9hcmQsIHg6IGksIHk6IGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TY3JpcHQuQ2FsbChcImRyYXdcIiwgaSwgaiwgY29sb3JzW1RleHRCb2FyZC5UZXh0Q29sb3JbaSwgal1dLCBjb2xvcnNbVGV4dEJvYXJkLkJhY2tDb2xvcltpLCBqXV0sIFwieFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ2FuRHJhdyA9IFNjcmlwdC5DYWxsPGJvb2w+KFwiaXNSZWFkeVRvRHJhd1wiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIFdpbmRvdy5TZXRUaW1lb3V0KChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pVXBkYXRlR2FtZSwgMTUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHMuQXJyYXlFeHRlbnNpb25zO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIE9iamVjdEV4dGVuc2lvbnNcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBNZXRob2RJbmZvIENsb25lTWV0aG9kID0gdHlwZW9mKE9iamVjdCkuR2V0TWV0aG9kKFwiTWVtYmVyd2lzZUNsb25lXCIsIEJpbmRpbmdGbGFncy5Ob25QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuSW5zdGFuY2UpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgSXNQcmltaXRpdmVNZXRob2QodGhpcyBUeXBlIHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSB0eXBlb2YoU3RyaW5nKSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IHR5cGVvZihpbnQpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gdHlwZW9mKGZsb2F0KSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IHR5cGVvZihkb3VibGUpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gdHlwZW9mKGNoYXIpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgLy9ib29sIGlzUHJpbWl0aXZlID0gdHlwZS5Jc1ByaW1pdGl2ZTtcclxuICAgICAgICAgICAgYm9vbCBpc1ZhbHVlVHlwZSA9IHR5cGUuSXNWYWx1ZVR5cGU7XHJcbiAgICAgICAgICAgIHJldHVybiBpc1ZhbHVlVHlwZTsgLy8mIGlzUHJpbWl0aXZlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBPYmplY3QgQ29weSh0aGlzIE9iamVjdCBvcmlnaW5hbE9iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBJbnRlcm5hbENvcHkob3JpZ2luYWxPYmplY3QsIG5ldyBEaWN0aW9uYXJ5PE9iamVjdCwgT2JqZWN0PihuZXcgUmVmZXJlbmNlRXF1YWxpdHlDb21wYXJlcigpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIE9iamVjdCBJbnRlcm5hbENvcHkoT2JqZWN0IG9yaWdpbmFsT2JqZWN0LCBJRGljdGlvbmFyeTxPYmplY3QsIE9iamVjdD4gdmlzaXRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbE9iamVjdCA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgdmFyIHR5cGVUb1JlZmxlY3QgPSBvcmlnaW5hbE9iamVjdC5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIGlmIChJc1ByaW1pdGl2ZU1ldGhvZCh0eXBlVG9SZWZsZWN0KSkgcmV0dXJuIG9yaWdpbmFsT2JqZWN0O1xyXG4gICAgICAgICAgICBpZiAodmlzaXRlZC5Db250YWluc0tleShvcmlnaW5hbE9iamVjdCkpIHJldHVybiB2aXNpdGVkW29yaWdpbmFsT2JqZWN0XTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZihEZWxlZ2F0ZSkuSXNBc3NpZ25hYmxlRnJvbSh0eXBlVG9SZWZsZWN0KSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIHZhciBjbG9uZU9iamVjdCA9IENsb25lTWV0aG9kLkludm9rZShvcmlnaW5hbE9iamVjdCwgbmV3IG9iamVjdFtdIHsgfSk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlVG9SZWZsZWN0LklzQXJyYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBhcnJheVR5cGUgPSB0eXBlVG9SZWZsZWN0LkdldEVsZW1lbnRUeXBlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoSXNQcmltaXRpdmVNZXRob2QoYXJyYXlUeXBlKSA9PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBBcnJheSBjbG9uZWRBcnJheSA9IChBcnJheSljbG9uZU9iamVjdDtcclxuICAgICAgICAgICAgICAgICAgICBjbG9uZWRBcnJheS5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpTeXN0ZW0uQXJyYXksIGludFtdPikoKGFycmF5LCBpbmRpY2VzKSA9PiBhcnJheS5TZXRWYWx1ZShJbnRlcm5hbENvcHkoY2xvbmVkQXJyYXkuR2V0VmFsdWUoaW5kaWNlcyksIHZpc2l0ZWQpLCBpbmRpY2VzKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2aXNpdGVkLkFkZChvcmlnaW5hbE9iamVjdCwgY2xvbmVPYmplY3QpO1xyXG4gICAgICAgICAgICBDb3B5RmllbGRzKG9yaWdpbmFsT2JqZWN0LCB2aXNpdGVkLCBjbG9uZU9iamVjdCwgdHlwZVRvUmVmbGVjdCk7XHJcbiAgICAgICAgICAgIFJlY3Vyc2l2ZUNvcHlCYXNlVHlwZVByaXZhdGVGaWVsZHMob3JpZ2luYWxPYmplY3QsIHZpc2l0ZWQsIGNsb25lT2JqZWN0LCB0eXBlVG9SZWZsZWN0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsb25lT2JqZWN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSZWN1cnNpdmVDb3B5QmFzZVR5cGVQcml2YXRlRmllbGRzKG9iamVjdCBvcmlnaW5hbE9iamVjdCwgSURpY3Rpb25hcnk8b2JqZWN0LCBvYmplY3Q+IHZpc2l0ZWQsIG9iamVjdCBjbG9uZU9iamVjdCwgVHlwZSB0eXBlVG9SZWZsZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVUb1JlZmxlY3QuQmFzZVR5cGUgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUmVjdXJzaXZlQ29weUJhc2VUeXBlUHJpdmF0ZUZpZWxkcyhvcmlnaW5hbE9iamVjdCwgdmlzaXRlZCwgY2xvbmVPYmplY3QsIHR5cGVUb1JlZmxlY3QuQmFzZVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgQ29weUZpZWxkcyhvcmlnaW5hbE9iamVjdCwgdmlzaXRlZCwgY2xvbmVPYmplY3QsIHR5cGVUb1JlZmxlY3QuQmFzZVR5cGUsIEJpbmRpbmdGbGFncy5JbnN0YW5jZSB8IEJpbmRpbmdGbGFncy5Ob25QdWJsaWMsIChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uRmllbGRJbmZvLCBib29sPikoaW5mbyA9PiBpbmZvLklzUHJpdmF0ZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIENvcHlGaWVsZHMob2JqZWN0IG9yaWdpbmFsT2JqZWN0LCBJRGljdGlvbmFyeTxvYmplY3QsIG9iamVjdD4gdmlzaXRlZCwgb2JqZWN0IGNsb25lT2JqZWN0LCBUeXBlIHR5cGVUb1JlZmxlY3QsIEJpbmRpbmdGbGFncyBiaW5kaW5nRmxhZ3MgPSBCaW5kaW5nRmxhZ3MuSW5zdGFuY2UgfCBCaW5kaW5nRmxhZ3MuTm9uUHVibGljIHwgQmluZGluZ0ZsYWdzLlB1YmxpYyB8IEJpbmRpbmdGbGFncy5GbGF0dGVuSGllcmFyY2h5LCBGdW5jPEZpZWxkSW5mbywgYm9vbD4gZmlsdGVyID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKEZpZWxkSW5mbyBmaWVsZEluZm8gaW4gdHlwZVRvUmVmbGVjdC5HZXRGaWVsZHMoYmluZGluZ0ZsYWdzKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlciAhPSBudWxsICYmIGZpbHRlcihmaWVsZEluZm8pID09IGZhbHNlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmIChJc1ByaW1pdGl2ZU1ldGhvZChmaWVsZEluZm8uRmllbGRUeXBlKSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxGaWVsZFZhbHVlID0gZmllbGRJbmZvLkdldFZhbHVlKG9yaWdpbmFsT2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIHZhciBjbG9uZWRGaWVsZFZhbHVlID0gSW50ZXJuYWxDb3B5KG9yaWdpbmFsRmllbGRWYWx1ZSwgdmlzaXRlZCk7XHJcbiAgICAgICAgICAgICAgICBmaWVsZEluZm8uU2V0VmFsdWUoY2xvbmVPYmplY3QsIGNsb25lZEZpZWxkVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBDb3B5PFQ+KHRoaXMgVCBvcmlnaW5hbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoVClDb3B5KChPYmplY3Qpb3JpZ2luYWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUmVmZXJlbmNlRXF1YWxpdHlDb21wYXJlciA6IEVxdWFsaXR5Q29tcGFyZXI8T2JqZWN0PlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEVxdWFscyhvYmplY3QgeCwgb2JqZWN0IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVmZXJlbmNlRXF1YWxzKHgsIHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAob2JqID09IG51bGwpIHJldHVybiAwO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqLkdldEhhc2hDb2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5hbWVzcGFjZSBBcnJheUV4dGVuc2lvbnNcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEFycmF5RXh0ZW5zaW9uc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEZvckVhY2godGhpcyBBcnJheSBhcnJheSwgQWN0aW9uPEFycmF5LCBpbnRbXT4gYWN0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXkuTGVuZ3RoID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgICAgIEFycmF5VHJhdmVyc2Ugd2Fsa2VyID0gbmV3IEFycmF5VHJhdmVyc2UoYXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgZG8gYWN0aW9uKGFycmF5LCB3YWxrZXIuUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHdhbGtlci5TdGVwKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBjbGFzcyBBcnJheVRyYXZlcnNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50W10gUG9zaXRpb247XHJcbiAgICAgICAgICAgIHByaXZhdGUgaW50W10gbWF4TGVuZ3RocztcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBBcnJheVRyYXZlcnNlKEFycmF5IGFycmF5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtYXhMZW5ndGhzID0gbmV3IGludFthcnJheS5SYW5rXTtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgYXJyYXkuUmFuazsgKytpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aHNbaV0gPSBhcnJheS5HZXRMZW5ndGgoaSkgLSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgUG9zaXRpb24gPSBuZXcgaW50W2FycmF5LlJhbmtdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBTdGVwKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBQb3NpdGlvbi5MZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb25baV0gPCBtYXhMZW5ndGhzW2ldKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUG9zaXRpb25baV0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBpOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvc2l0aW9uW2pdID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlJlZmxlY3Rpb247XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIERlYnVnZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgYm9vbCBkZWJ1Z2dpbmc7XHJcbiAgICAgICAgaW50IGlkZW50O1xyXG4gICAgICAgIFN0cmluZ0J1aWxkZXIgc3RyaW5nQnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBEZWJ1Z2dlcihib29sIGRlYnVnZ2luZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVidWdnaW5nID0gZGVidWdnaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUHJpbnQoc3RyaW5nIHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWRlYnVnZ2luZykgcmV0dXJuO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGlkZW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGUoJyAnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRGVpZGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZGVudCA9IGlkZW50IC0gMjsgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBJZGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZGVudCA9IGlkZW50KzI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFjdGl2ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkZWJ1Z2dpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBY3RpdmUoYm9vbCB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGVidWdnaW5nID0gdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFByaW50KE9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWRlYnVnZ2luZykgcmV0dXJuO1xyXG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IG9iai5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiVHlwZTogXCIpO1xyXG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZCh0eXBlLk5hbWUpO1xyXG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZExpbmUoKTtcclxuICAgICAgICAgICAgdmFyIGZpZWxkcyA9IHR5cGUuR2V0RmllbGRzKEJpbmRpbmdGbGFncy5QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuTm9uUHVibGljIHwgQmluZGluZ0ZsYWdzLkluc3RhbmNlKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGYgaW4gZmllbGRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoJyAnKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKGYuR2V0VmFsdWUob2JqKSk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoJyAnKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKGYuTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZExpbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShzdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIE1vZHVsZSBIZWFkZXIgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXFxcclxuTW9kdWxlIE5hbWU6ICBEZWVwQ2xvbmVIZWxwZXIuY3NcclxuUHJvamVjdDogICAgICBDU0RlZXBDbG9uZU9iamVjdFxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblRoZSBjbGFzcyBjb250YWlucyB0aGUgbWV0aG9kcyB0aGF0IGltcGxlbWVudCBkZWVwIGNsb25lIHVzaW5nIHJlZmxlY3Rpb24uXHJcblxyXG5UaGlzIHNvdXJjZSBpcyBzdWJqZWN0IHRvIHRoZSBNaWNyb3NvZnQgUHVibGljIExpY2Vuc2UuXHJcblNlZSBodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vZW4tdXMvb3Blbm5lc3MvbGljZW5zZXMuYXNweCNNUEwuXHJcbkFsbCBvdGhlciByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG5USElTIENPREUgQU5EIElORk9STUFUSU9OIElTIFBST1ZJREVEIFwiQVMgSVNcIiBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBcclxuRUlUSEVSIEVYUFJFU1NFRCBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBJTVBMSUVEIFxyXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQvT1IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuXHJcblxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgRGVlcENsb25lSGVscGVyXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRGVidWdnZXIgZGVidWcgPSBuZXcgRGVidWdnZXIoZmFsc2UpO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEdldCB0aGUgZGVlcCBjbG9uZSBvZiBhbiBvYmplY3QuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFwiPlRoZSB0eXBlIG9mIHRoZSBvYmouPC90eXBlcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+SXQgaXMgdGhlIG9iamVjdCB1c2VkIHRvIGRlZXAgY2xvbmUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+UmV0dXJuIHRoZSBkZWVwIGNsb25lLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgRGVlcENsb25lPFQ+KFQgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG9iaiA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiT2JqZWN0IGlzIG51bGxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChUKUNsb25lUHJvY2VkdXJlKG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGVlcENvcHlQYXJ0aWFsKE9iamVjdCBmcm9tLCBPYmplY3QgdG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZnJvbSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiT2JqZWN0IGlzIG51bGxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ29weVByb2NlZHVyZVBhcnRpYWwoZnJvbSwgdG8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgbWV0aG9kIGltcGxlbWVudHMgZGVlcCBjbG9uZSB1c2luZyByZWZsZWN0aW9uLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+SXQgaXMgdGhlIG9iamVjdCB1c2VkIHRvIGRlZXAgY2xvbmUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+UmV0dXJuIHRoZSBkZWVwIGNsb25lLjwvcmV0dXJucz5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBvYmplY3QgQ2xvbmVQcm9jZWR1cmUoT2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAob2JqID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBUeXBlIHR5cGUgPSBvYmouR2V0VHlwZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGVidWcuUHJpbnQoXCJDbG9uaW5nOiBcIiArIHR5cGUpO1xyXG4gICAgICAgICAgICAvL2RlYnVnLlByaW50KHR5cGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHR5cGUgb2Ygb2JqZWN0IGlzIHRoZSB2YWx1ZSB0eXBlLCB3ZSB3aWxsIGFsd2F5cyBnZXQgYSBuZXcgb2JqZWN0IHdoZW4gXHJcbiAgICAgICAgICAgIC8vIHRoZSBvcmlnaW5hbCBvYmplY3QgaXMgYXNzaWduZWQgdG8gYW5vdGhlciB2YXJpYWJsZS4gU28gaWYgdGhlIHR5cGUgb2YgdGhlIFxyXG4gICAgICAgICAgICAvLyBvYmplY3QgaXMgcHJpbWl0aXZlIG9yIGVudW0sIHdlIGp1c3QgcmV0dXJuIHRoZSBvYmplY3QuIFdlIHdpbGwgcHJvY2VzcyB0aGUgXHJcbiAgICAgICAgICAgIC8vIHN0cnVjdCB0eXBlIHN1YnNlcXVlbnRseSBiZWNhdXNlIHRoZSBzdHJ1Y3QgdHlwZSBtYXkgY29udGFpbiB0aGUgcmVmZXJlbmNlIFxyXG4gICAgICAgICAgICAvLyBmaWVsZHMuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBzdHJpbmcgdmFyaWFibGVzIGNvbnRhaW4gdGhlIHNhbWUgY2hhcnMsIHRoZXkgYWx3YXlzIHJlZmVyIHRvIHRoZSBzYW1lIFxyXG4gICAgICAgICAgICAvLyBzdHJpbmcgaW4gdGhlIGhlYXAuIFNvIGlmIHRoZSB0eXBlIG9mIHRoZSBvYmplY3QgaXMgc3RyaW5nLCB3ZSBhbHNvIHJldHVybiB0aGUgXHJcbiAgICAgICAgICAgIC8vIG9iamVjdC5cclxuICAgICAgICAgICAgaWYgKHR5cGUuSXNFbnVtIHx8IHR5cGUgPT0gdHlwZW9mKHN0cmluZykgfHwgdHlwZSA9PSB0eXBlb2YoaW50KSB8fCB0eXBlID09IHR5cGVvZihjaGFyKSB8fCB0eXBlID09IHR5cGVvZihmbG9hdCkgfHwgdHlwZSA9PSB0eXBlb2YoZG91YmxlKSB8fCB0eXBlID09IHR5cGVvZihCb29sZWFuKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KHR5cGUgKyBcIiBcIiArIG9iaisgXCIgLVZcIik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHR5cGUgb2YgdGhlIG9iamVjdCBpcyB0aGUgQXJyYXksIHdlIHVzZSB0aGUgQ3JlYXRlSW5zdGFuY2UgbWV0aG9kIHRvIGdldFxyXG4gICAgICAgICAgICAvLyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgYXJyYXkuIFdlIGFsc28gcHJvY2VzcyByZWN1cnNpdmVseSB0aGlzIG1ldGhvZCBpbiB0aGUgXHJcbiAgICAgICAgICAgIC8vIGVsZW1lbnRzIG9mIHRoZSBvcmlnaW5hbCBhcnJheSBiZWNhdXNlIHRoZSB0eXBlIG9mIHRoZSBlbGVtZW50IG1heSBiZSB0aGUgcmVmZXJlbmNlIFxyXG4gICAgICAgICAgICAvLyB0eXBlLlxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlLklzQXJyYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9zdHJpbmcgdHlwZU5hbWUgPSB0eXBlLkZ1bGxOYW1lLlJlcGxhY2UoXCJbXVwiLCBzdHJpbmcuRW1wdHkpO1xyXG4gICAgICAgICAgICAgICAgLy9kZWJ1Zy5QcmludCh0eXBlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBUeXBlIHR5cGVFbGVtZW50ID0gdHlwZS5HZXRFbGVtZW50VHlwZSgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL2RlYnVnLlByaW50KHR5cGVFbGVtZW50K1wic3NcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJyYXkgPSBvYmogYXMgQXJyYXk7XHJcbiAgICAgICAgICAgICAgICBpbnQgbGVuZ3RoID0gYXJyYXkuTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgQXJyYXkgY29waWVkQXJyYXkgPSBBcnJheS5DcmVhdGVJbnN0YW5jZSh0eXBlRWxlbWVudCwgbGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgYXJyYXkuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBkZWVwIGNsb25lIG9mIHRoZSBlbGVtZW50IGluIHRoZSBvcmlnaW5hbCBhcnJheSBhbmQgYXNzaWduIHRoZSBcclxuICAgICAgICAgICAgICAgICAgICAvLyBjbG9uZSB0byB0aGUgbmV3IGFycmF5LlxyXG4gICAgICAgICAgICAgICAgICAgIGNvcGllZEFycmF5LlNldFZhbHVlKENsb25lUHJvY2VkdXJlKGFycmF5LkdldFZhbHVlKGkpKSwgaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvcGllZEFycmF5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB0eXBlIG9mIHRoZSBvYmplY3QgaXMgY2xhc3Mgb3Igc3RydWN0LCBpdCBtYXkgY29udGFpbiB0aGUgcmVmZXJlbmNlIGZpZWxkcywgXHJcbiAgICAgICAgICAgIC8vIHNvIHdlIHVzZSByZWZsZWN0aW9uIGFuZCBwcm9jZXNzIHJlY3Vyc2l2ZWx5IHRoaXMgbWV0aG9kIGluIHRoZSBmaWVsZHMgb2YgdGhlIG9iamVjdCBcclxuICAgICAgICAgICAgLy8gdG8gZ2V0IHRoZSBkZWVwIGNsb25lIG9mIHRoZSBvYmplY3QuIFxyXG4gICAgICAgICAgICAvLyBXZSB1c2UgVHlwZS5Jc1ZhbHVlVHlwZSBtZXRob2QgaGVyZSBiZWNhdXNlIHRoZXJlIGlzIG5vIHdheSB0byBpbmRpY2F0ZSBkaXJlY3RseSB3aGV0aGVyIFxyXG4gICAgICAgICAgICAvLyB0aGUgVHlwZSBpcyBhIHN0cnVjdCB0eXBlLlxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlLklzQ2xhc3N8fHR5cGUuSXNWYWx1ZVR5cGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdCBjb3BpZWRPYmplY3QgPSBBY3RpdmF0b3IuQ3JlYXRlSW5zdGFuY2Uob2JqLkdldFR5cGUoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGFsbCBGaWVsZEluZm8uXHJcbiAgICAgICAgICAgICAgICBGaWVsZEluZm9bXSBmaWVsZHMgPSB0eXBlLkdldEZpZWxkcyhCaW5kaW5nRmxhZ3MuUHVibGljIHwgQmluZGluZ0ZsYWdzLk5vblB1YmxpYyB8IEJpbmRpbmdGbGFncy5JbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoIChGaWVsZEluZm8gZmllbGQgaW4gZmllbGRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoXCJGaWVsZDogXCIgKyBmaWVsZC5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QgZmllbGRWYWx1ZSA9IGZpZWxkLkdldFZhbHVlKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkVmFsdWUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkZpZWxkOiBcIiArIGZpZWxkLk5hbWUgKyBcIiBiZWluZyBzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgZGVlcCBjbG9uZSBvZiB0aGUgZmllbGQgaW4gdGhlIG9yaWdpbmFsIG9iamVjdCBhbmQgYXNzaWduIHRoZSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvbmUgdG8gdGhlIGZpZWxkIGluIHRoZSBuZXcgb2JqZWN0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5TZXRWYWx1ZShjb3BpZWRPYmplY3QsIENsb25lUHJvY2VkdXJlKGZpZWxkVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBjb3BpZWRPYmplY3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oXCJUaGUgb2JqZWN0IGlzIHVua25vd24gdHlwZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgb2JqZWN0IENvcHlQcm9jZWR1cmVQYXJ0aWFsKE9iamVjdCBmcm9tLCBPYmplY3QgdG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZnJvbSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgVHlwZSB0eXBlID0gZnJvbS5HZXRUeXBlKCk7XHJcblxyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludChcIkNvcHlpbmcgXCIrdHlwZSk7XHJcbiAgICAgICAgICAgIGRlYnVnLklkZW50KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgdHlwZSBvZiBvYmplY3QgaXMgdGhlIHZhbHVlIHR5cGUsIHdlIHdpbGwgYWx3YXlzIGdldCBhIG5ldyBvYmplY3Qgd2hlbiBcclxuICAgICAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdCBpcyBhc3NpZ25lZCB0byBhbm90aGVyIHZhcmlhYmxlLiBTbyBpZiB0aGUgdHlwZSBvZiB0aGUgXHJcbiAgICAgICAgICAgIC8vIG9iamVjdCBpcyBwcmltaXRpdmUgb3IgZW51bSwgd2UganVzdCByZXR1cm4gdGhlIG9iamVjdC4gV2Ugd2lsbCBwcm9jZXNzIHRoZSBcclxuICAgICAgICAgICAgLy8gc3RydWN0IHR5cGUgc3Vic2VxdWVudGx5IGJlY2F1c2UgdGhlIHN0cnVjdCB0eXBlIG1heSBjb250YWluIHRoZSByZWZlcmVuY2UgXHJcbiAgICAgICAgICAgIC8vIGZpZWxkcy5cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHN0cmluZyB2YXJpYWJsZXMgY29udGFpbiB0aGUgc2FtZSBjaGFycywgdGhleSBhbHdheXMgcmVmZXIgdG8gdGhlIHNhbWUgXHJcbiAgICAgICAgICAgIC8vIHN0cmluZyBpbiB0aGUgaGVhcC4gU28gaWYgdGhlIHR5cGUgb2YgdGhlIG9iamVjdCBpcyBzdHJpbmcsIHdlIGFsc28gcmV0dXJuIHRoZSBcclxuICAgICAgICAgICAgLy8gb2JqZWN0LlxyXG4gICAgICAgICAgICBpZiAodHlwZS5Jc0VudW0gfHwgdHlwZSA9PSB0eXBlb2Yoc3RyaW5nKSB8fCB0eXBlID09IHR5cGVvZihpbnQpIHx8IHR5cGUgPT0gdHlwZW9mKGNoYXIpIHx8IHR5cGUgPT0gdHlwZW9mKGZsb2F0KSB8fCB0eXBlID09IHR5cGVvZihkb3VibGUpKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KHR5cGUgKyBcIiBcIitmcm9tICsgXCIgLVZcIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5EZWlkZW50KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJvbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBhcnJheXMgbm90IGltcGxlbWVudGVkXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUuSXNBcnJheSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVidWcuRGVpZGVudCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHR5cGUgb2YgdGhlIG9iamVjdCBpcyBjbGFzcyBvciBzdHJ1Y3QsIGl0IG1heSBjb250YWluIHRoZSByZWZlcmVuY2UgZmllbGRzLCBcclxuICAgICAgICAgICAgLy8gc28gd2UgdXNlIHJlZmxlY3Rpb24gYW5kIHByb2Nlc3MgcmVjdXJzaXZlbHkgdGhpcyBtZXRob2QgaW4gdGhlIGZpZWxkcyBvZiB0aGUgb2JqZWN0IFxyXG4gICAgICAgICAgICAvLyB0byBnZXQgdGhlIGRlZXAgY2xvbmUgb2YgdGhlIG9iamVjdC4gXHJcbiAgICAgICAgICAgIC8vIFdlIHVzZSBUeXBlLklzVmFsdWVUeXBlIG1ldGhvZCBoZXJlIGJlY2F1c2UgdGhlcmUgaXMgbm8gd2F5IHRvIGluZGljYXRlIGRpcmVjdGx5IHdoZXRoZXIgXHJcbiAgICAgICAgICAgIC8vIHRoZSBUeXBlIGlzIGEgc3RydWN0IHR5cGUuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUuSXNDbGFzcyB8fCB0eXBlLklzVmFsdWVUeXBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QgY29waWVkT2JqZWN0ID0gdG87XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGFsbCBGaWVsZEluZm8uXHJcbiAgICAgICAgICAgICAgICBGaWVsZEluZm9bXSBmaWVsZHMgPSB0eXBlLkdldEZpZWxkcyhCaW5kaW5nRmxhZ3MuUHVibGljIHwgQmluZGluZ0ZsYWdzLk5vblB1YmxpYyB8IEJpbmRpbmdGbGFncy5JbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoIChGaWVsZEluZm8gZmllbGQgaW4gZmllbGRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoXCJGaWVsZDogXCIgKyBmaWVsZC5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QgZmllbGRWYWx1ZSA9IGZpZWxkLkdldFZhbHVlKGZyb20pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZFZhbHVlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkZpZWxkOiBcIiArIGZpZWxkLk5hbWUgKyBcIiBub3QgbnVsbCwgYmVpbmcgc2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGRlZXAgY2xvbmUgb2YgdGhlIGZpZWxkIGluIHRoZSBvcmlnaW5hbCBvYmplY3QgYW5kIGFzc2lnbiB0aGUgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb25lIHRvIHRoZSBmaWVsZCBpbiB0aGUgbmV3IG9iamVjdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcuSWRlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQuU2V0VmFsdWUoY29waWVkT2JqZWN0LCBDbG9uZVByb2NlZHVyZShmaWVsZFZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnLkRlaWRlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVidWcuRGVpZGVudCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvcGllZE9iamVjdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlYnVnLkRlaWRlbnQoKTtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihcIlRoZSBvYmplY3QgaXMgdW5rbm93biB0eXBlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEV4dGVuc2lvbnNcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSYW5kb20gcm5nID0gbmV3IFJhbmRvbSgpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU2h1ZmZsZTxUPih0aGlzIElMaXN0PFQ+IGxpc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbiA9IGxpc3QuQ291bnQ7XHJcbiAgICAgICAgICAgIHdoaWxlIChuID4gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbi0tO1xyXG4gICAgICAgICAgICAgICAgaW50IGsgPSBybmcuTmV4dChuICsgMSk7XHJcbiAgICAgICAgICAgICAgICBUIHZhbHVlID0gbGlzdFtrXTtcclxuICAgICAgICAgICAgICAgIGxpc3Rba10gPSBsaXN0W25dO1xyXG4gICAgICAgICAgICAgICAgbGlzdFtuXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIiNyZWdpb24gTGljZW5zZVxyXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5Db3B5cmlnaHQgwqkgMjAwNiBUaGUgTW9uby5YbmEgVGVhbVxyXG5cclxuQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xyXG4jZW5kcmVnaW9uIExpY2Vuc2VcclxudXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgcHVibGljIHN0cnVjdCBQb2ludDJEIDogSUVxdWF0YWJsZTxQb2ludDJEPlxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUG9pbnQyRCB6ZXJvUG9pbnQgPSBuZXcgUG9pbnQyRCgpO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgcHVibGljIGludCBYO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgWTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQb2ludDJEIFplcm9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB6ZXJvUG9pbnQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJvcGVydGllc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcbiAgICAgICAgcHVibGljIFBvaW50MkQoaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0geDtcclxuICAgICAgICAgICAgdGhpcy5ZID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBtZXRob2RzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShQb2ludDJEIGEsIFBvaW50MkQgYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLkVxdWFscyhiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciAhPShQb2ludDJEIGEsIFBvaW50MkQgYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAhYS5FcXVhbHMoYik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBFcXVhbHMoUG9pbnQyRCBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKFggPT0gb3RoZXIuWCkgJiYgKFkgPT0gb3RoZXIuWSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKG9iaiBpcyBQb2ludDJEKSA/IEVxdWFscygoUG9pbnQyRClvYmopIDogZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBYIF4gWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJ7e1g6ezB9IFk6ezF9fX1cIiwgWCwgWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn1cclxuXHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIHN0YXRpYyBwdWJsaWMgY2xhc3MgUmFuZG9tU3VwcGxpZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIEZ1bmM8ZmxvYXQ+IEdlbmVyYXRleyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBSYW5nZShpbnQgbWluLCBpbnQgbWF4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KSAoR2VuZXJhdGUoKSAqIChtYXgtbWluKSttaW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUIFJhbmRvbUVsZW1lbnQ8VD4oVFtdIGFycmF5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5W1JhbmdlKDAsIGFycmF5Lkxlbmd0aCldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIjcmVnaW9uIExpY2Vuc2VcclxuLypcclxuTUlUIExpY2Vuc2VcclxuQ29weXJpZ2h0IMKpIDIwMDYgVGhlIE1vbm8uWG5hIFRlYW1cclxuXHJcbkFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cclxuI2VuZHJlZ2lvbiBMaWNlbnNlXHJcblxyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5HbG9iYWxpemF0aW9uO1xyXG51c2luZyBTeXN0ZW0uQ29tcG9uZW50TW9kZWw7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcblxyXG4gICAgcHVibGljIHN0cnVjdCBSZWN0IDogSUVxdWF0YWJsZTxSZWN0PlxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmVjdCBlbXB0eVJlY3RhbmdsZSA9IG5ldyBSZWN0KCk7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFg7XHJcbiAgICAgICAgcHVibGljIGludCBZO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgV2lkdGg7XHJcbiAgICAgICAgcHVibGljIGludCBIZWlnaHQ7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFJlY3QgRW1wdHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBlbXB0eVJlY3RhbmdsZTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBMZWZ0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdGhpcy5YOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFJpZ2h0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKHRoaXMuWCArIHRoaXMuV2lkdGgpOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFRvcFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHRoaXMuWTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBCb3R0b21cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiAodGhpcy5ZICsgdGhpcy5IZWlnaHQpOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgUmVjdChpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHk7XHJcbiAgICAgICAgICAgIHRoaXMuV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5IZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oUmVjdCBhLCBSZWN0IGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKChhLlggPT0gYi5YKSAmJiAoYS5ZID09IGIuWSkgJiYgKGEuV2lkdGggPT0gYi5XaWR0aCkgJiYgKGEuSGVpZ2h0ID09IGIuSGVpZ2h0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKCgoKHRoaXMuWCA8PSB4KSAmJiAoeCA8ICh0aGlzLlggKyB0aGlzLldpZHRoKSkpICYmICh0aGlzLlkgPD0geSkpICYmICh5IDwgKHRoaXMuWSArIHRoaXMuSGVpZ2h0KSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ29udGFpbnMoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKCgoKHRoaXMuWCA8PSB2YWx1ZS5YKSAmJiAodmFsdWUuWCA8ICh0aGlzLlggKyB0aGlzLldpZHRoKSkpICYmICh0aGlzLlkgPD0gdmFsdWUuWSkpICYmICh2YWx1ZS5ZIDwgKHRoaXMuWSArIHRoaXMuSGVpZ2h0KSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ29udGFpbnMoUG9pbnQyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKCgodGhpcy5YIDw9IHZhbHVlLlgpICYmICh2YWx1ZS5YIDwgKHRoaXMuWCArIHRoaXMuV2lkdGgpKSkgJiYgKHRoaXMuWSA8PSB2YWx1ZS5ZKSkgJiYgKHZhbHVlLlkgPCAodGhpcy5ZICsgdGhpcy5IZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhSZWN0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKCh0aGlzLlggPD0gdmFsdWUuWCkgJiYgKCh2YWx1ZS5YICsgdmFsdWUuV2lkdGgpIDw9ICh0aGlzLlggKyB0aGlzLldpZHRoKSkpICYmICh0aGlzLlkgPD0gdmFsdWUuWSkpICYmICgodmFsdWUuWSArIHZhbHVlLkhlaWdodCkgPD0gKHRoaXMuWSArIHRoaXMuSGVpZ2h0KSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFJlY3QgYSwgUmVjdCBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICEoYSA9PSBiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE9mZnNldChQb2ludDJEIG9mZnNldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFggKz0gb2Zmc2V0Llg7XHJcbiAgICAgICAgICAgIFkgKz0gb2Zmc2V0Llk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBPZmZzZXQoaW50IG9mZnNldFgsIGludCBvZmZzZXRZKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCArPSBvZmZzZXRYO1xyXG4gICAgICAgICAgICBZICs9IG9mZnNldFk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUG9pbnQyRCBDZW50ZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFBvaW50MkQoKHRoaXMuWCArIHRoaXMuV2lkdGgpIC8gMiwgKHRoaXMuWSArIHRoaXMuSGVpZ2h0KSAvIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbmZsYXRlKGludCBob3Jpem9udGFsVmFsdWUsIGludCB2ZXJ0aWNhbFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCAtPSBob3Jpem9udGFsVmFsdWU7XHJcbiAgICAgICAgICAgIFkgLT0gdmVydGljYWxWYWx1ZTtcclxuICAgICAgICAgICAgV2lkdGggKz0gaG9yaXpvbnRhbFZhbHVlICogMjtcclxuICAgICAgICAgICAgSGVpZ2h0ICs9IHZlcnRpY2FsVmFsdWUgKiAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNFbXB0eVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoKCgodGhpcy5XaWR0aCA9PSAwKSAmJiAodGhpcy5IZWlnaHQgPT0gMCkpICYmICh0aGlzLlggPT0gMCkpICYmICh0aGlzLlkgPT0gMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBFcXVhbHMoUmVjdCBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzID09IG90aGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKG9iaiBpcyBSZWN0KSA/IHRoaXMgPT0gKChSZWN0KW9iaikgOiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJ7e1g6ezB9IFk6ezF9IFdpZHRoOnsyfSBIZWlnaHQ6ezN9fX1cIiwgWCwgWSwgV2lkdGgsIEhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5YIF4gdGhpcy5ZIF4gdGhpcy5XaWR0aCBeIHRoaXMuSGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEludGVyc2VjdHMoUmVjdCByMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAhKHIyLkxlZnQgPiBSaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICB8fCByMi5SaWdodCA8IExlZnRcclxuICAgICAgICAgICAgICAgICAgICAgfHwgcjIuVG9wID4gQm90dG9tXHJcbiAgICAgICAgICAgICAgICAgICAgIHx8IHIyLkJvdHRvbSA8IFRvcFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEludGVyc2VjdHMocmVmIFJlY3QgdmFsdWUsIG91dCBib29sIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICEodmFsdWUuTGVmdCA+IFJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgIHx8IHZhbHVlLlJpZ2h0IDwgTGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICB8fCB2YWx1ZS5Ub3AgPiBCb3R0b21cclxuICAgICAgICAgICAgICAgICAgICAgfHwgdmFsdWUuQm90dG9tIDwgVG9wXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUaW1lU3RhbXBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgQ3VycmVudFNuYXA7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUaW1lU3RhbXBTbmFwIEdldFNuYXAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lU3RhbXBTbmFwKEN1cnJlbnRTbmFwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWR2YW5jZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEN1cnJlbnRTbmFwICs9IGRlbHRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RydWN0IFRpbWVTdGFtcFNuYXBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgVGltZVNuYXA7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUaW1lU3RhbXBTbmFwKGZsb2F0IHNuYXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUaW1lU25hcCA9IHNuYXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBVbmljb2RlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBTcGFjZSA9IDMyO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGtleURvd24gPSA0MDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGtleUxlZnQgPSAzNztcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGtleVVwID0gMzg7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBrZXlSaWdodCA9IDM5O1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBVcGFycm93MiA9IChjaGFyKTI0O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIERvd25hcnJvdzIgPSAoY2hhcikyNTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBSaWdodGFycm93MiA9IChjaGFyKTI2O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIExlZnRhcnJvdzIgPSAoY2hhcikyNztcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBVcGFycm93ID0gKGNoYXIpMzA7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgRG93bmFycm93ID0gKGNoYXIpMzE7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgTGVmdGFycm93ID0gKGNoYXIpMTc7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgUmlnaHRhcnJvdyA9IChjaGFyKTE2O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIEFzY2lpR3JpZEhvciA9IChjaGFyKTE5NjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBBc2NpaUdyaWRWZXIgPSAoY2hhcikxNzk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY2hhcltdIGdyaWRzID0gbmV3IGNoYXJbXSB7XHJcbiAgICAgICAgICAgIEFzY2lpR3JpZEhvcixcclxuICAgICAgICAgICAgQXNjaWlHcmlkVmVyXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNoYXIgQXNjaWlHcmlkVXBMZWZ0ID0gKGNoYXIpMjE3O1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY2hhciBBc2NpaUdyaWRVcFJpZ2h0ID0gKGNoYXIpIDE5MjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNoYXIgQXNjaWlHcmlkVXBSaWdodExlZnQgPSAoY2hhcikxOTM7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjaGFyIEFzY2lpR3JpZERvd25MZWZ0ID0gKGNoYXIpMTkxO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY2hhciBBc2NpaUdyaWREb3duUmlnaHQgPSAoY2hhcikyMTg7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjaGFyIEFzY2lpR3JpZERvd25SaWdodExlZnQgPSAoY2hhcikxOTQ7XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuLy91c2luZyBTeXN0ZW0uRHJhd2luZztcclxudXNpbmcgU3lzdGVtLkdsb2JhbGl6YXRpb247XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBbU2VyaWFsaXphYmxlXVxyXG4gICAgcHVibGljIHN0cnVjdCBWZWN0b3IyRCA6IElFcXVhdGFibGU8VmVjdG9yMkQ+XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB6ZXJvVmVjdG9yID0gbmV3IFZlY3RvcjJEKDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFZlY3RvciA9IG5ldyBWZWN0b3IyRCgxZiwgMWYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHVuaXRYVmVjdG9yID0gbmV3IFZlY3RvcjJEKDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFlWZWN0b3IgPSBuZXcgVmVjdG9yMkQoMGYsIDFmKTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBYO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBZO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgIyByZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgcHVibGljIGludCBYSW50IHsgZ2V0IHsgcmV0dXJuIChpbnQpWDsgfSB9XHJcbiAgICAgICAgcHVibGljIGludCBZSW50IHsgZ2V0IHsgcmV0dXJuIChpbnQpWTsgfSB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdGFudHNcclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBaZXJvXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gemVyb1ZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBPbmVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0VmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFVuaXRYXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFhWZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgVW5pdFlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WVZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQoZmxvYXQgeCwgZmxvYXQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQoZmxvYXQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5ZID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIEludGVycG9sYXRlUm91bmRlZChWZWN0b3IyRCBzdGFydFBvc2l0aW9uLCBWZWN0b3IyRCBlbmRQb3NpdGlvbiwgZmxvYXQgcmF0aW8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHN0YXJ0UG9zaXRpb24gKiAoMSAtIHJhdGlvKSArIGVuZFBvc2l0aW9uICogcmF0aW8pLlJvdW5kKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFZlY3RvcjJEIFJvdW5kKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoKGZsb2F0KU1hdGguUm91bmQoWCksIChmbG9hdClNYXRoLlJvdW5kKFkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgQWRkKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICs9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEFkZChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCArIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICsgdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEaXN0YW5jZShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguU3FydCgodjEgKiB2MSkgKyAodjIgKiB2MikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKGZsb2F0KU1hdGguU3FydCgodjEgKiB2MSkgKyAodjIgKiB2MikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEaXN0YW5jZVNxdWFyZWQoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuICh2MSAqIHYxKSArICh2MiAqIHYyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXN0YW5jZVNxdWFyZWQocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAodjEgKiB2MSkgKyAodjIgKiB2Mik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXQoaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCA9IHg7XHJcbiAgICAgICAgICAgIFkgPSB5O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgRGl2aWRlKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC89IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpdmlkZShyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAvIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZIC8gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIERpdmlkZShWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IGRpdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aWRlcjtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IGRpdmlkZXIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aWRlcjtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIGZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRG90KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZTEuWCAqIHZhbHVlMi5YKSArICh2YWx1ZTEuWSAqIHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEb3QocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICh2YWx1ZTEuWCAqIHZhbHVlMi5YKSArICh2YWx1ZTEuWSAqIHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEVxdWFscyhvYmplY3Qgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG9iaiBpcyBWZWN0b3IyRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVxdWFscygoVmVjdG9yMkQpdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhWZWN0b3IyRCBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoWCA9PSBvdGhlci5YKSAmJiAoWSA9PSBvdGhlci5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgUmVmbGVjdChWZWN0b3IyRCB2ZWN0b3IsIFZlY3RvcjJEIG5vcm1hbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlY3RvcjJEIHJlc3VsdDtcclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gMi4wZiAqICgodmVjdG9yLlggKiBub3JtYWwuWCkgKyAodmVjdG9yLlkgKiBub3JtYWwuWSkpO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZlY3Rvci5YIC0gKG5vcm1hbC5YICogdmFsKTtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2ZWN0b3IuWSAtIChub3JtYWwuWSAqIHZhbCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUmVmbGVjdChyZWYgVmVjdG9yMkQgdmVjdG9yLCByZWYgVmVjdG9yMkQgbm9ybWFsLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gMi4wZiAqICgodmVjdG9yLlggKiBub3JtYWwuWCkgKyAodmVjdG9yLlkgKiBub3JtYWwuWSkpO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZlY3Rvci5YIC0gKG5vcm1hbC5YICogdmFsKTtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2ZWN0b3IuWSAtIChub3JtYWwuWSAqIHZhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBYLkdldEhhc2hDb2RlKCkgKyBZLkdldEhhc2hDb2RlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IExlbmd0aCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguU3FydCgoWCAqIFgpICsgKFkgKiBZKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoU3F1YXJlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKFggKiBYKSArIChZICogWSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTWF4KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh2YWx1ZTEuWCA+IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlMS5ZID4gdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYXgocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggPiB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgPiB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE1pbihWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQodmFsdWUxLlggPCB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTEuWSA8IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWluKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIDwgdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZIDwgdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNdWx0aXBseShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTXVsdGlwbHkoVmVjdG9yMkQgdmFsdWUxLCBmbG9hdCBzY2FsZUZhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNdWx0aXBseShyZWYgVmVjdG9yMkQgdmFsdWUxLCBmbG9hdCBzY2FsZUZhY3Rvciwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTmVnYXRlKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBOZWdhdGUocmVmIFZlY3RvcjJEIHZhbHVlLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSAtdmFsdWUuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSAtdmFsdWUuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE5vcm1hbGl6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgoWCAqIFgpICsgKFkgKiBZKSk7XHJcbiAgICAgICAgICAgIFggKj0gdmFsO1xyXG4gICAgICAgICAgICBZICo9IHZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTm9ybWFsaXplKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gMS4wZiAvIChmbG9hdClNYXRoLlNxcnQoKHZhbHVlLlggKiB2YWx1ZS5YKSArICh2YWx1ZS5ZICogdmFsdWUuWSkpO1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHZhbDtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSB2YWw7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBOb3JtYWxpemUocmVmIFZlY3RvcjJEIHZhbHVlLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gMS4wZiAvIChmbG9hdClNYXRoLlNxcnQoKHZhbHVlLlggKiB2YWx1ZS5YKSArICh2YWx1ZS5ZICogdmFsdWUuWSkpO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlLlggKiB2YWw7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUuWSAqIHZhbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBTdWJ0cmFjdChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC09IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAtPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTdWJ0cmFjdChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAtIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEN1bHR1cmVJbmZvIGN1cnJlbnRDdWx0dXJlID0gQ3VsdHVyZUluZm8uQ3VycmVudEN1bHR1cmU7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KGN1cnJlbnRDdWx0dXJlLCBcInt7WDp7MH0gWTp7MX19fVwiLCBuZXcgb2JqZWN0W10ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5YLlRvU3RyaW5nKGN1cnJlbnRDdWx0dXJlKSwgdGhpcy5ZLlRvU3RyaW5nKGN1cnJlbnRDdWx0dXJlKSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIE1ldGhvZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gT3BlcmF0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgLShWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggPSAtdmFsdWUuWDtcclxuICAgICAgICAgICAgdmFsdWUuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YID09IHZhbHVlMi5YICYmIHZhbHVlMS5ZID09IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciAhPShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTEuWCAhPSB2YWx1ZTIuWCB8fCB2YWx1ZTEuWSAhPSB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yICsoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCArPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAtKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKihWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yICooVmVjdG9yMkQgdmFsdWUsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKihmbG9hdCBzY2FsZUZhY3RvciwgVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAvKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC89IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgLyhWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IGRpdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aWRlcjtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIE9wZXJhdG9yc1xyXG4gICAgfVxyXG59IiwiLy8gTUlUIExpY2Vuc2UgLSBDb3B5cmlnaHQgKEMpIFRoZSBNb25vLlhuYSBUZWFtXHJcbi8vIFRoaXMgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyBkZWZpbmVkIGluXHJcbi8vIGZpbGUgJ0xJQ0VOU0UudHh0Jywgd2hpY2ggaXMgcGFydCBvZiB0aGlzIHNvdXJjZSBjb2RlIHBhY2thZ2UuXHJcblxyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5EaWFnbm9zdGljcztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5SdW50aW1lLlNlcmlhbGl6YXRpb247XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RydWN0IFZlY3RvcjNEIDogSUVxdWF0YWJsZTxWZWN0b3IzRD5cclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIHplcm8gPSBuZXcgVmVjdG9yM0QoMGYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0Qgb25lID0gbmV3IFZlY3RvcjNEKDFmLCAxZiwgMWYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIHVuaXRYID0gbmV3IFZlY3RvcjNEKDFmLCAwZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIHVuaXRZID0gbmV3IFZlY3RvcjNEKDBmLCAxZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIHVuaXRaID0gbmV3IFZlY3RvcjNEKDBmLCAwZiwgMWYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIHVwID0gbmV3IFZlY3RvcjNEKDBmLCAxZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIGRvd24gPSBuZXcgVmVjdG9yM0QoMGYsIC0xZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIHJpZ2h0ID0gbmV3IFZlY3RvcjNEKDFmLCAwZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIGxlZnQgPSBuZXcgVmVjdG9yM0QoLTFmLCAwZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIGZvcndhcmQgPSBuZXcgVmVjdG9yM0QoMGYsIDBmLCAtMWYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIGJhY2t3YXJkID0gbmV3IFZlY3RvcjNEKDBmLCAwZiwgMWYpO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGZsb2F0IFg7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBZO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgZmxvYXQgWjtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHdpdGggY29tcG9uZW50cyAwLCAwLCAwLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBaZXJvXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gemVybzsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHdpdGggY29tcG9uZW50cyAxLCAxLCAxLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBPbmVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBvbmU7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmV0dXJucyBhIDxzZWU+VmVjdG9yMzwvc2VlPiB3aXRoIGNvbXBvbmVudHMgMSwgMCwgMC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgVW5pdFhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHdpdGggY29tcG9uZW50cyAwLCAxLCAwLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBVbml0WVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRZOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDAsIDAsIDEuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFVuaXRaXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFo7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgVXBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1cDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBEb3duXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gZG93bjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBSaWdodFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHJpZ2h0OyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIExlZnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBsZWZ0OyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIEZvcndhcmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBmb3J3YXJkOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIEJhY2t3YXJkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gYmFja3dhcmQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJvcGVydGllc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjNEKGZsb2F0IHgsIGZsb2F0IHksIGZsb2F0IHopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB4O1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB5O1xyXG4gICAgICAgICAgICB0aGlzLlogPSB6O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IzRChmbG9hdCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5aID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjNEKFZlY3RvcjJEIHZhbHVlLCBmbG9hdCB6KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0gdmFsdWUuWDtcclxuICAgICAgICAgICAgdGhpcy5ZID0gdmFsdWUuWTtcclxuICAgICAgICAgICAgdGhpcy5aID0gejtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBlcmZvcm1zIHZlY3RvciBhZGRpdGlvbiBvbiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4gYW5kIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUyXCIvPi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IgdG8gYWRkLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IgdG8gYWRkLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSByZXN1bHQgb2YgdGhlIHZlY3RvciBhZGRpdGlvbi48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBBZGQoVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCArPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICs9IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBQZXJmb3JtcyB2ZWN0b3IgYWRkaXRpb24gb24gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTFcIi8+IGFuZFxyXG4gICAgICAgIC8vLyA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMlwiLz4sIHN0b3JpbmcgdGhlIHJlc3VsdCBvZiB0aGVcclxuICAgICAgICAvLy8gYWRkaXRpb24gaW4gPHBhcmFtcmVmIG5hbWU9XCJyZXN1bHRcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3RvciB0byBhZGQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3RvciB0byBhZGQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIHRoZSB2ZWN0b3IgYWRkaXRpb24uPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQWRkKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICsgdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKyB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiArIHZhbHVlMi5aO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgQ3Jvc3MoVmVjdG9yM0QgdmVjdG9yMSwgVmVjdG9yM0QgdmVjdG9yMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENyb3NzKHJlZiB2ZWN0b3IxLCByZWYgdmVjdG9yMiwgb3V0IHZlY3RvcjEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmVjdG9yMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBDcm9zcyhyZWYgVmVjdG9yM0QgdmVjdG9yMSwgcmVmIFZlY3RvcjNEIHZlY3RvcjIsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgeCA9IHZlY3RvcjEuWSAqIHZlY3RvcjIuWiAtIHZlY3RvcjIuWSAqIHZlY3RvcjEuWjtcclxuICAgICAgICAgICAgdmFyIHkgPSAtKHZlY3RvcjEuWCAqIHZlY3RvcjIuWiAtIHZlY3RvcjIuWCAqIHZlY3RvcjEuWik7XHJcbiAgICAgICAgICAgIHZhciB6ID0gdmVjdG9yMS5YICogdmVjdG9yMi5ZIC0gdmVjdG9yMi5YICogdmVjdG9yMS5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0geTtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB6O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEaXN0YW5jZShWZWN0b3IzRCB2ZWN0b3IxLCBWZWN0b3IzRCB2ZWN0b3IyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHZlY3RvcjEsIHJlZiB2ZWN0b3IyLCBvdXQgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLlNxcnQocmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXN0YW5jZShyZWYgVmVjdG9yM0QgdmFsdWUxLCByZWYgVmVjdG9yM0QgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGlzdGFuY2VTcXVhcmVkKHJlZiB2YWx1ZTEsIHJlZiB2YWx1ZTIsIG91dCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAoZmxvYXQpTWF0aC5TcXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlU3F1YXJlZChWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHJlc3VsdDtcclxuICAgICAgICAgICAgRGlzdGFuY2VTcXVhcmVkKHJlZiB2YWx1ZTEsIHJlZiB2YWx1ZTIsIG91dCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlU3F1YXJlZChyZWYgVmVjdG9yM0QgdmFsdWUxLCByZWYgVmVjdG9yM0QgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMS5YIC0gdmFsdWUyLlgpICogKHZhbHVlMS5YIC0gdmFsdWUyLlgpICtcclxuICAgICAgICAgICAgICAgICAgICAgKHZhbHVlMS5ZIC0gdmFsdWUyLlkpICogKHZhbHVlMS5ZIC0gdmFsdWUyLlkpICtcclxuICAgICAgICAgICAgICAgICAgICAgKHZhbHVlMS5aIC0gdmFsdWUyLlopICogKHZhbHVlMS5aIC0gdmFsdWUyLlopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBEaXZpZGUoVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aIC89IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBEaXZpZGUoVmVjdG9yM0QgdmFsdWUxLCBmbG9hdCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gdmFsdWUyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlogKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpdmlkZShyZWYgVmVjdG9yM0QgdmFsdWUxLCBmbG9hdCBkaXZpc29yLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMSAvIGRpdmlzb3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmFsdWUxLlogKiBmYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC8gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLyB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAvIHZhbHVlMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEb3QoVmVjdG9yM0QgdmVjdG9yMSwgVmVjdG9yM0QgdmVjdG9yMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWN0b3IxLlggKiB2ZWN0b3IyLlggKyB2ZWN0b3IxLlkgKiB2ZWN0b3IyLlkgKyB2ZWN0b3IxLlogKiB2ZWN0b3IyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRG90KHJlZiBWZWN0b3IzRCB2ZWN0b3IxLCByZWYgVmVjdG9yM0QgdmVjdG9yMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHZlY3RvcjEuWCAqIHZlY3RvcjIuWCArIHZlY3RvcjEuWSAqIHZlY3RvcjIuWSArIHZlY3RvcjEuWiAqIHZlY3RvcjIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEVxdWFscyhvYmplY3Qgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCEob2JqIGlzIFZlY3RvcjNEKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBvdGhlciA9IChWZWN0b3IzRClvYmo7XHJcbiAgICAgICAgICAgIHJldHVybiBYID09IG90aGVyLlggJiZcclxuICAgICAgICAgICAgICAgICAgICBZID09IG90aGVyLlkgJiZcclxuICAgICAgICAgICAgICAgICAgICBaID09IG90aGVyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBFcXVhbHMoVmVjdG9yM0Qgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gWCA9PSBvdGhlci5YICYmXHJcbiAgICAgICAgICAgICAgICAgICAgWSA9PSBvdGhlci5ZICYmXHJcbiAgICAgICAgICAgICAgICAgICAgWiA9PSBvdGhlci5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBHZXRIYXNoQ29kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludCkodGhpcy5YICsgdGhpcy5ZICsgdGhpcy5aKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHJlc3VsdDtcclxuICAgICAgICAgICAgRGlzdGFuY2VTcXVhcmVkKHJlZiB0aGlzLCByZWYgemVybywgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoU3F1YXJlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCByZXN1bHQ7XHJcbiAgICAgICAgICAgIERpc3RhbmNlU3F1YXJlZChyZWYgdGhpcywgcmVmIHplcm8sIG91dCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBNdWx0aXBseShWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKj0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE11bHRpcGx5KFZlY3RvcjNEIHZhbHVlMSwgZmxvYXQgc2NhbGVGYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IzRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmFsdWUxLlogKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNdWx0aXBseShyZWYgVmVjdG9yM0QgdmFsdWUxLCByZWYgVmVjdG9yM0QgdmFsdWUyLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmFsdWUxLlogKiB2YWx1ZTIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmV0dXJucyBhIDxzZWU+VmVjdG9yMzwvc2VlPiBwb2ludGluZyBpbiB0aGUgb3Bwb3NpdGVcclxuICAgICAgICAvLy8gZGlyZWN0aW9uIG9mIDxwYXJhbXJlZiBuYW1lPVwidmFsdWVcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmVjdG9yIHRvIG5lZ2F0ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgdmVjdG9yIG5lZ2F0aW9uIG9mIDxwYXJhbXJlZiBuYW1lPVwidmFsdWVcIi8+LjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE5lZ2F0ZShWZWN0b3IzRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gbmV3IFZlY3RvcjNEKC12YWx1ZS5YLCAtdmFsdWUuWSwgLXZhbHVlLlopO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFN0b3JlcyBhIDxzZWU+VmVjdG9yMzwvc2VlPiBwb2ludGluZyBpbiB0aGUgb3Bwb3NpdGVcclxuICAgICAgICAvLy8gZGlyZWN0aW9uIG9mIDxwYXJhbXJlZiBuYW1lPVwidmFsdWVcIi8+IGluIDxwYXJhbXJlZiBuYW1lPVwicmVzdWx0XCIvPi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIHZlY3RvciB0byBuZWdhdGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgdmVjdG9yIHRoYXQgdGhlIG5lZ2F0aW9uIG9mIDxwYXJhbXJlZiBuYW1lPVwidmFsdWVcIi8+IHdpbGwgYmUgc3RvcmVkIGluLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5lZ2F0ZShyZWYgVmVjdG9yM0QgdmFsdWUsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IC12YWx1ZS5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTm9ybWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5vcm1hbGl6ZShyZWYgdGhpcywgb3V0IHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBOb3JtYWxpemUoVmVjdG9yM0QgdmVjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTm9ybWFsaXplKHJlZiB2ZWN0b3IsIG91dCB2ZWN0b3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmVjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5vcm1hbGl6ZShyZWYgVmVjdG9yM0QgdmFsdWUsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3I7XHJcbiAgICAgICAgICAgIERpc3RhbmNlKHJlZiB2YWx1ZSwgcmVmIHplcm8sIG91dCBmYWN0b3IpO1xyXG4gICAgICAgICAgICBmYWN0b3IgPSAxZiAvIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZS5YICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlLlkgKiBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmFsdWUuWiAqIGZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgUmVmbGVjdChWZWN0b3IzRCB2ZWN0b3IsIFZlY3RvcjNEIG5vcm1hbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIEkgaXMgdGhlIG9yaWdpbmFsIGFycmF5XHJcbiAgICAgICAgICAgIC8vIE4gaXMgdGhlIG5vcm1hbCBvZiB0aGUgaW5jaWRlbnQgcGxhbmVcclxuICAgICAgICAgICAgLy8gUiA9IEkgLSAoMiAqIE4gKiAoIERvdFByb2R1Y3RbIEksTl0gKSlcclxuICAgICAgICAgICAgVmVjdG9yM0QgcmVmbGVjdGVkVmVjdG9yO1xyXG4gICAgICAgICAgICAvLyBpbmxpbmUgdGhlIGRvdFByb2R1Y3QgaGVyZSBpbnN0ZWFkIG9mIGNhbGxpbmcgbWV0aG9kXHJcbiAgICAgICAgICAgIGZsb2F0IGRvdFByb2R1Y3QgPSAoKHZlY3Rvci5YICogbm9ybWFsLlgpICsgKHZlY3Rvci5ZICogbm9ybWFsLlkpKSArICh2ZWN0b3IuWiAqIG5vcm1hbC5aKTtcclxuICAgICAgICAgICAgcmVmbGVjdGVkVmVjdG9yLlggPSB2ZWN0b3IuWCAtICgyLjBmICogbm9ybWFsLlgpICogZG90UHJvZHVjdDtcclxuICAgICAgICAgICAgcmVmbGVjdGVkVmVjdG9yLlkgPSB2ZWN0b3IuWSAtICgyLjBmICogbm9ybWFsLlkpICogZG90UHJvZHVjdDtcclxuICAgICAgICAgICAgcmVmbGVjdGVkVmVjdG9yLlogPSB2ZWN0b3IuWiAtICgyLjBmICogbm9ybWFsLlopICogZG90UHJvZHVjdDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZWZsZWN0ZWRWZWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUmVmbGVjdChyZWYgVmVjdG9yM0QgdmVjdG9yLCByZWYgVmVjdG9yM0Qgbm9ybWFsLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gSSBpcyB0aGUgb3JpZ2luYWwgYXJyYXlcclxuICAgICAgICAgICAgLy8gTiBpcyB0aGUgbm9ybWFsIG9mIHRoZSBpbmNpZGVudCBwbGFuZVxyXG4gICAgICAgICAgICAvLyBSID0gSSAtICgyICogTiAqICggRG90UHJvZHVjdFsgSSxOXSApKVxyXG5cclxuICAgICAgICAgICAgLy8gaW5saW5lIHRoZSBkb3RQcm9kdWN0IGhlcmUgaW5zdGVhZCBvZiBjYWxsaW5nIG1ldGhvZFxyXG4gICAgICAgICAgICBmbG9hdCBkb3RQcm9kdWN0ID0gKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSkgKyAodmVjdG9yLlogKiBub3JtYWwuWik7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAoMi4wZiAqIG5vcm1hbC5YKSAqIGRvdFByb2R1Y3Q7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmVjdG9yLlkgLSAoMi4wZiAqIG5vcm1hbC5ZKSAqIGRvdFByb2R1Y3Q7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmVjdG9yLlogLSAoMi4wZiAqIG5vcm1hbC5aKSAqIGRvdFByb2R1Y3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBlcmZvcm1zIHZlY3RvciBzdWJ0cmFjdGlvbiBvbiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4gYW5kIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUyXCIvPi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSB2ZWN0b3IgdG8gYmUgc3VidHJhY3RlZCBmcm9tLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHZlY3RvciB0byBiZSBzdWJ0cmFjdGVkIGZyb20gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTFcIi8+LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSByZXN1bHQgb2YgdGhlIHZlY3RvciBzdWJ0cmFjdGlvbi48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBTdWJ0cmFjdChWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC09IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAtPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLT0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBlcmZvcm1zIHZlY3RvciBzdWJ0cmFjdGlvbiBvbiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4gYW5kIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUyXCIvPi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSB2ZWN0b3IgdG8gYmUgc3VidHJhY3RlZCBmcm9tLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHZlY3RvciB0byBiZSBzdWJ0cmFjdGVkIGZyb20gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTFcIi8+LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIHN1YnRyYWN0aW9uLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFN1YnRyYWN0KHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAtIHZhbHVlMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RyaW5nIERlYnVnRGlzcGxheVN0cmluZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuQ29uY2F0KFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWC5Ub1N0cmluZygpLCBcIiAgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ZLlRvU3RyaW5nKCksIFwiICBcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlouVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTdHJpbmdCdWlsZGVyIHNiID0gbmV3IFN0cmluZ0J1aWxkZXIoMzIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmQoXCJ7WDpcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZCh0aGlzLlgpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmQoXCIgWTpcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZCh0aGlzLlkpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmQoXCIgWjpcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZCh0aGlzLlopO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmQoXCJ9XCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2IuVG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8vLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vLy8gVHJhbnNmb3JtcyBhIHZlY3RvciBieSBhIHF1YXRlcm5pb24gcm90YXRpb24uXHJcbiAgICAgICAgLy8vLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLy8vIDxwYXJhbSBuYW1lPVwidmVjXCI+VGhlIHZlY3RvciB0byB0cmFuc2Zvcm0uPC9wYXJhbT5cclxuICAgICAgICAvLy8vLyA8cGFyYW0gbmFtZT1cInF1YXRcIj5UaGUgcXVhdGVybmlvbiB0byByb3RhdGUgdGhlIHZlY3RvciBieS48L3BhcmFtPlxyXG4gICAgICAgIC8vLy8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+VGhlIHJlc3VsdCBvZiB0aGUgb3BlcmF0aW9uLjwvcGFyYW0+XHJcbiAgICAgICAgLy8gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBUcmFuc2Zvcm0ocmVmIFZlY3RvcjMgdmVjLCByZWYgUXVhdGVybmlvbiBxdWF0LCBvdXQgVmVjdG9yMyByZXN1bHQpXHJcbiAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAvL1x0XHQvLyBUYWtlbiBmcm9tIHRoZSBPcGVudFRLIGltcGxlbWVudGF0aW9uIG9mIFZlY3RvcjNcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vIFNpbmNlIHZlYy5XID09IDAsIHdlIGNhbiBvcHRpbWl6ZSBxdWF0ICogdmVjICogcXVhdF4tMSBhcyBmb2xsb3dzOlxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gdmVjICsgMi4wICogY3Jvc3MocXVhdC54eXosIGNyb3NzKHF1YXQueHl6LCB2ZWMpICsgcXVhdC53ICogdmVjKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMyB4eXogPSBxdWF0Llh5eiwgdGVtcCwgdGVtcDI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkNyb3NzKHJlZiB4eXosIHJlZiB2ZWMsIG91dCB0ZW1wKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMuTXVsdGlwbHkocmVmIHZlYywgcXVhdC5XLCBvdXQgdGVtcDIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMy5BZGQocmVmIHRlbXAsIHJlZiB0ZW1wMiwgb3V0IHRlbXApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMy5Dcm9zcyhyZWYgeHl6LCByZWYgdGVtcCwgb3V0IHRlbXApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMy5NdWx0aXBseShyZWYgdGVtcCwgMiwgb3V0IHRlbXApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMy5BZGQocmVmIHZlYywgcmVmIHRlbXAsIG91dCByZXN1bHQpO1xyXG4gICAgICAgIC8vICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIG1ldGhvZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gT3BlcmF0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTEuWCA9PSB2YWx1ZTIuWFxyXG4gICAgICAgICAgICAgICAgJiYgdmFsdWUxLlkgPT0gdmFsdWUyLllcclxuICAgICAgICAgICAgICAgICYmIHZhbHVlMS5aID09IHZhbHVlMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICEodmFsdWUxID09IHZhbHVlMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yICsoVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCArPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICs9IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAtKFZlY3RvcjNEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBuZXcgVmVjdG9yM0QoLXZhbHVlLlgsIC12YWx1ZS5ZLCAtdmFsdWUuWik7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgLShWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC09IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAtPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLT0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yICooVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICo9IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAqKFZlY3RvcjNEIHZhbHVlLCBmbG9hdCBzY2FsZUZhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlogKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgKihmbG9hdCBzY2FsZUZhY3RvciwgVmVjdG9yM0QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5aICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yIC8oVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aIC89IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAvKFZlY3RvcjNEIHZhbHVlLCBmbG9hdCBkaXZpZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMSAvIGRpdmlkZXI7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWiAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdmVEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgc3RyaW5nIGxhYmVsO1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8VGljaz4gdW5pdHMgPSBuZXcgTGlzdDxUaWNrPigpO1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8aW50PiB0YWdzID0gbmV3IExpc3Q8aW50PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZURhdGEoc3RyaW5nIGxhYmVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVEYXRhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBGaW5kQnlMYWJlbChMaXN0PE1vdmVEYXRhPiBtb3ZlRGF0YXMsIHN0cmluZyBsYWJlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbW92ZURhdGFzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKG1vdmVEYXRhc1tpXSE9bnVsbClcclxuICAgICAgICAgICAgICAgICAgICBpZiAobW92ZURhdGFzW2ldLmxhYmVsID09IGxhYmVsKSByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIEhhc1RhZyhpbnQgdGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhZ3MuQ29udGFpbnModGFnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRpY2sgXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgQ29uZGl0aW9uIGNvbmRpdGlvbjtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PG9iamVjdD4gdGhpbmdzVG9IYXBwZW4gPSBuZXcgTGlzdDxvYmplY3Q+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUaWNrKG9iamVjdCBhY3Rpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGluZ3NUb0hhcHBlbi5BZGQoYWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUaWNrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNsYXNzIENvbmRpdGlvblxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHJlYWRvbmx5IENvbmRpdGlvblR5cGUgdHlwZTtcclxuICAgICAgICBpbnRlcm5hbCByZWFkb25seSBUYXJnZXQgdGFyZ2V0O1xyXG4gICAgICAgIGludGVybmFsIHJlYWRvbmx5IEJhc2VVdGlscy5WZWN0b3IyRCB2ZWN0b3I7XHJcblxyXG4gICAgICAgIHB1YmxpYyBDb25kaXRpb24oQ29uZGl0aW9uVHlwZSB0eXBlLCBUYXJnZXQgdGFyZ2V0LCBCYXNlVXRpbHMuVmVjdG9yMkQgdmVjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMudmVjdG9yID0gdmVjdG9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBDb25kaXRpb25UeXBlXHJcbiAgICB7XHJcbiAgICAgICAgQ2FuTW92ZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBTdW1tb25FbnRpdHlcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGVuZW15V2hpY2g7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFZlY3RvcjJEIHByZWZlcmVudGlhbFJvd0NvbHVtbjtcclxuXHJcbiAgICAgICAgcHVibGljIFN1bW1vbkVudGl0eShpbnQgZW5lbXlXaGljaCwgVmVjdG9yMkQgcHJlZmVyZW50aWFsUm93Q29sdW1uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbmVteVdoaWNoID0gZW5lbXlXaGljaDtcclxuICAgICAgICAgICAgdGhpcy5wcmVmZXJlbnRpYWxSb3dDb2x1bW4gPSBwcmVmZXJlbnRpYWxSb3dDb2x1bW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdGF0aWMgU3VtbW9uRW50aXR5IEVuZW15KGludCB2LCBWZWN0b3IyRCB2ZWN0b3IyRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3VtbW9uRW50aXR5KHYsIHZlY3RvcjJEKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBbmltYXRpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQXJlYSBhcmVhID0gbnVsbDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50ID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBUYXJnZXQgdGFyZ2V0ID0gVGFyZ2V0Lk5vbmU7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBBbmltYXRpb24oVGFyZ2V0IHRhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wdWJsaWMgQW5pbWF0aW9uKEFyZWEgYXJlYSlcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICB0aGlzLmFyZWEgPSBhcmVhO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBwdWJsaWMgQW5pbWF0aW9uKFRhcmdldCB0YXJnZXQsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFuaW1hdGlvbihBcmVhIGFyZWEsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZSwgVGFyZ2V0IHRhcmdldCA9IFRhcmdldC5Ob25lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBNb3ZlQWN0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFRhcmdldCB0YXJnZXQ7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEJhc2VVdGlscy5WZWN0b3IyRCBkaXN0YW5jZTtcclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVBY3Rpb24oVGFyZ2V0IHRhcmdldCwgQmFzZVV0aWxzLlZlY3RvcjJEIGFtb3VudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLmRpc3RhbmNlID0gYW1vdW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgRGVhbERhbWFnZUFjdGlvblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBUYXJnZXQgdGFyZ2V0ID0gVGFyZ2V0Lk5vbmU7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEFyZWEgYXJlYTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGRhbWFnZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50O1xyXG5cclxuICAgICAgICBwdWJsaWMgRGVhbERhbWFnZUFjdGlvbihBcmVhIGFyZWEsIGludCBkYW1hZ2UsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XHJcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB0YXJnZXQgPSBUYXJnZXQuQXJlYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldCB0YXJnZXQsIGludCBkYW1hZ2UsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFyZWFcclxuICAgIHtcclxuICAgICAgICAvL3B1YmxpYyByZWFkb25seSBBcmVhIGFyZWE7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFRhcmdldCB0YXJnZXQ7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IExpc3Q8VmVjdG9yMkQ+IHBvaW50cyA9IG5ldyBMaXN0PFZlY3RvcjJEPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgQXJlYShUYXJnZXQgdGFyZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIFRhcmdldFxyXG4gICAge1xyXG4gICAgICAgIE5vbmUsICBTZWxmLCBDbG9zZXN0VGFyZ2V0LCBDbG9zZXN0VGFyZ2V0WCwgQXJlYSAgIFxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFzeW5jVGFza3NcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFzeW5jVHJhY2tcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIERlbGF5ZWRBY3Rpb25zXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxmbG9hdD4gdGltZXMgPSBuZXcgTGlzdDxmbG9hdD4oKTtcclxuICAgICAgICBMaXN0PElMaXN0PiBsaXN0cyA9IG5ldyBMaXN0PElMaXN0PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRpbWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpbWVzW2ldIC09IGRlbHRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVzW2ldIDw9IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRXhlY3V0ZShpKTtcclxuICAgICAgICAgICAgICAgICAgICBFbmRUYXNrKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBhYnN0cmFjdCB2b2lkIEV4ZWN1dGUoaW50IGkpO1xyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkZChmbG9hdCB0aW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGltZXMuQWRkKHRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aW1lcy5Db3VudCA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBFbmRUYXNrKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGltZXMuUmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBsIGluIGxpc3RzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBc3luY1Rhc2tTZXR0ZXI8VD4gOiBEZWxheWVkQWN0aW9uc1xyXG4gICAge1xyXG4gICAgICAgIExpc3Q8VD4gVG9WYWx1ZSA9IG5ldyBMaXN0PFQ+KCk7XHJcbiAgICAgICAgTGlzdDxBY3Rpb248VD4+IHNldHRlcnMgPSBuZXcgTGlzdDxBY3Rpb248VD4+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChUIGUsIEFjdGlvbjxUPiBzZXR0ZXIsIGZsb2F0IHRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUb1ZhbHVlLkFkZChlKTtcclxuICAgICAgICAgICAgc2V0dGVycy5BZGQoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxUPilzZXR0ZXIpO1xyXG4gICAgICAgICAgICBiYXNlLkFkZCh0aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIG92ZXJyaWRlIHZvaWQgRXhlY3V0ZShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldHRlcnNbaV0oVG9WYWx1ZVtpXSk7XHJcbiAgICAgICAgICAgIFRvVmFsdWUuUmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgIHNldHRlcnMuUmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJhdHRsZVNldHVwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEVDU01hbmFnZXIgZWNzO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVNYWluIGJhdHRsZU1haW47XHJcbiAgICAgICAgcHVibGljIE1vdmVDcmVhdG9yUHJvZyBtb3ZlQ3JlYXRvcjtcclxuICAgICAgICBwdWJsaWMgVGltZVN0YW1wIHRpbWVTdGFtcDtcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZVNldHVwKGludCBtb2RlLCBpbnQgc3RhZ2VJZCwgRUNTTWFuYWdlciBlY3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuICAgICAgICAgICAgdGltZVN0YW1wID0gbmV3IFRpbWVTdGFtcCgpO1xyXG4gICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudCh0aW1lU3RhbXApO1xyXG4gICAgICAgICAgICBiYXR0bGVNYWluID0gbmV3IEJhdHRsZU1haW4obW9kZSwgZWNzLCB0aW1lU3RhbXApO1xyXG4gICAgICAgICAgICBtb3ZlQ3JlYXRvciA9IG5ldyBNb3ZlQ3JlYXRvclByb2coZWNzKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhZ2VzID0gZWNzLlF1aWNrQWNjZXNzb3IxPFN0YWdlRGF0YT4oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaXhlZEF0dGFjayA9IHN0YWdlcy5FbnRpdHkoc3RhZ2VJZCkuR2V0Q29tcG9uZW50PEZpeGVkQXR0YWNrU3RhZ2U+KCk7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJIYW5kUG9vbCA9IGJhdHRsZU1haW4ucGxheWVySGFuZFBvb2w7XHJcbiAgICAgICAgICAgIGlmIChmaXhlZEF0dGFjayAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGZpeGVkQXR0YWNrLm1vdmVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZCgoQmF0dGxlTWFpbi5Nb3ZlVHlwZSlpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFBvb2wuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlKTtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzdGFnZSA9IHN0YWdlcy5Db21wMShzdGFnZUlkKTtcclxuICAgICAgICAgICAgdmFyIGVubXlzID0gc3RhZ2UuZW5lbXlTcGF3bnM7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGVubXlzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5Nb3ZlRGF0YUV4ZWN1dGVyID0gbmV3IE1vdmVEYXRhRXhlY3V0ZXIoYmF0dGxlTWFpbiwgbW92ZUNyZWF0b3IubW92ZURhdGFzLCBlY3MsIHRpbWVTdGFtcCk7XHJcblxyXG4gICAgICAgICAgICBMaXN0PHN0cmluZz4gZW50aXR5UmVuZGVyVGV4dHMgPSBuZXcgTGlzdDxzdHJpbmc+KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW5lbXlEYXRhcyA9IG5ldyBFbmVteURhdGFDcmVhdG9yKGVudGl0eVJlbmRlclRleHRzLG1vdmVDcmVhdG9yKS5lbmVteURhdGFzO1xyXG4gICAgICAgICAgICB2YXIgYmF0dGxlU3RhdGUgPSBiYXR0bGVNYWluLmJhdHRsZVN0YXRlO1xyXG5cclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5CYXR0bGVDb25maWd1cmUoc3RhZ2UuYmF0dGxlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlbmVteUZhY3RvcnkgPSBuZXcgU3Bhd25FbnRpdHlGYWN0b3J5KGVjcywgZW5lbXlEYXRhcywgYmF0dGxlTWFpbik7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uZWNzSW50ZWcgPSBuZXcgRUNTSW50ZWdyYXRpb24oZW5lbXlGYWN0b3J5LCBlY3MpO1xyXG4gICAgICAgICAgICAvL2JhdHRsZU1haW4uRW5lbXlGYWN0b3J5ID0gZW5lbXlGYWN0b3J5O1xyXG5cclxuICAgICAgICAgICAgdmFyIGVuZW15QWlzID0gZWNzLlF1aWNrQWNjZXNzb3IyPEVuZW15QUksIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5PigpO1xyXG4gICAgICAgICAgICB2YXIgZW5lbXlBaVN0YXRlbGVzcyA9IGVjcy5DcmVhdGVBY2Nlc3NvcihuZWNlc3Nhcnk6IG5ldyBUeXBlW10geyB0eXBlb2YoRW5lbXlBSSkgfSwgbm90OiBuZXcgVHlwZVtdIHsgdHlwZW9mKEVuZW15QUlTdGF0ZSkgfSk7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uRW5lbXlHZW5lcmF0ZU1vdmVzID0gKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGVuZW15QWlTdGF0ZWxlc3MuTGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmVteUFpU3RhdGVsZXNzLkdldCgwKS5BZGRDb21wb25lbnQ8RW5lbXlBSVN0YXRlPigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZW5lbXlBaXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFpID0gZW5lbXlBaXMuQ29tcDEoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJhdHRsZXIgPSBlbmVteUFpcy5Db21wMihpKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWlTdGF0ZSA9IGVuZW15QWlzLkVudGl0eShpKS5HZXRDb21wb25lbnQ8RW5lbXlBSVN0YXRlPigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtb3ZlcyA9IGFpLm1vdmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZTsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGFpUHJvID0gKGorIGFpU3RhdGUucHJvZ3Jlc3MpICUgbW92ZXMuQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb3ZlID0gbW92ZXNbYWlQcm9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92ZSBpcyBNb3ZlVXNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlci5tb3Zlc1tqXSA9IChtb3ZlIGFzIE1vdmVVc2UpLm1vdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9iZS5tb3Zlc1tqXSA9IDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYWlTdGF0ZS5wcm9ncmVzcyArPSBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gZGF0YSB0aGF0IHdpbGwgYmUgYSBwYXJ0IG9mIHN0YWdlZGF0YSBzbyBlYWNoIHN0YWdlIGNhbiBoYXZlIGl0J3MgY29uZmlnXHJcbiAgICAvLy8gSXQgd2lsbCBhbHNvIGJlIGNvbnRhaW5lZCBpbiBiYXR0bGVtYWluLlxyXG4gICAgLy8vIFNob3VsZCBiZSBzdGF0aWMsIG9uY2UgY3JlYXRlZC5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgQmF0dGxlQ29uZmlnXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IExpc3Q8aW50PiBlbmVtaWVzVG9TdW1tb24gPW5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBuZWVkS2lsbEFsbEVuZW1pZXMgPSB0cnVlO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnKGludFtdIGVuZW1pZXNUb1N1bW1vbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllc1RvU3VtbW9uLkFkZFJhbmdlKGVuZW1pZXNUb1N1bW1vbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnKGJvb2wgbmVlZEtpbGxBbGxFbmVtaWVzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5uZWVkS2lsbEFsbEVuZW1pZXMgPSBuZWVkS2lsbEFsbEVuZW1pZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5IYXBwcztcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQmF0dGxlTWFpblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PEJhdHRsZUVudGl0eT4gZW50aXRpZXMgPSBuZXcgTGlzdDxCYXR0bGVFbnRpdHk+KCk7XHJcbiAgICAgICAgcHVibGljIEJhdHRsZVN0YXRlIGJhdHRsZVN0YXRlID0gbmV3IEJhdHRsZVN0YXRlKCk7XHJcbiAgICAgICAgcHVibGljIEhhcHBNYW5hZ2VyIGhhcHBNYW5hZ2VyID0gbmV3IEhhcHBNYW5hZ2VyKCk7XHJcbiAgICAgICAgRGljdGlvbmFyeTxNb3ZlVHlwZSwgVmVjdG9yMkQ+IG1vdmVtZW50TW92ZXMgPSBuZXcgRGljdGlvbmFyeTxNb3ZlVHlwZSwgVmVjdG9yMkQ+KCk7XHJcbiAgICAgICAgLy9EaWN0aW9uYXJ5PE1vdmVUeXBlLCBQb2ludD4gYXR0YWNrTW92ZXMgPSBuZXcgRGljdGlvbmFyeTxNb3ZlVHlwZSwgUG9pbnQ+KCk7XHJcbiAgICAgICAgTW92ZVR5cGVbXSBlbmVteU1vdmVzO1xyXG4gICAgICAgIC8vcHVibGljIExpc3Q8SW5wdXQ+IGlucHV0cyA9IG5ldyBMaXN0PFR1cm5iYXNlZC5JbnB1dD4oKTtcclxuICAgICAgICBwdWJsaWMgSW5wdXRIb2xkZXIgaW5wdXRzID0gbmV3IElucHV0SG9sZGVyKCk7XHJcbiAgICAgICAgcHVibGljIExpc3Q8TW92ZVR5cGU+IHBsYXllckhhbmRGaXhlZCA9IG5ldyBMaXN0PE1vdmVUeXBlPigpO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PE1vdmVUeXBlPiBwbGF5ZXJIYW5kVW5maXhlZCA9IG5ldyBMaXN0PE1vdmVUeXBlPigpO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PE1vdmVUeXBlPiBwbGF5ZXJIYW5kUG9vbCA9IG5ldyBMaXN0PE1vdmVUeXBlPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgdGltZVRvQ2hvb3NlTWF4ID0gMTVmO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCB0aW1lVG9DaG9vc2UgPSAtMTtcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZVJlc3VsdCBiYXR0bGVSZXN1bHQgPSBuZXcgQmF0dGxlUmVzdWx0KCk7XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQmF0dGxlQ29uZmlndXJlKEJhdHRsZUNvbmZpZyBiYXR0bGVDb25maWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYmF0dGxlQ29uZmlnID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhdHRsZUNvbmZpZyA9IG5ldyBCYXR0bGVDb25maWcobmVlZEtpbGxBbGxFbmVtaWVzOiB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkJhdHRsZUNvbmZpZyA9IGJhdHRsZUNvbmZpZztcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZS5WYWwgPSAzO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludCBuRW5lbWllcztcclxuICAgICAgICBwdWJsaWMgTW92ZURhdGFFeGVjdXRlciBNb3ZlRGF0YUV4ZWN1dGVyO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgVGltZVN0YW1wIHRpbWVTdGFtcDtcclxuICAgICAgICBwcml2YXRlIFF1aWNrQWNjZXNzb3JUd288QmF0dGxlRW50aXR5LCBQaWNrdXBJbmZvPiBwaWNrdXBBY2Nlc3NvcjtcclxuICAgICAgICBpbnRlcm5hbCBFQ1NJbnRlZ3JhdGlvbiBlY3NJbnRlZztcclxuXHJcbiAgICAgICAgcHVibGljIEFjdGlvbiBFbmVteUdlbmVyYXRlTW92ZXM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVDb25maWcgQmF0dGxlQ29uZmlnIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQm9hcmRXaWR0aCB7IGdldDsgaW50ZXJuYWwgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBCb2FyZEhlaWdodCB7IGdldDsgaW50ZXJuYWwgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVNYWluKGludCBtb2RlLCBFQ1NNYW5hZ2VyIGVjcywgVGltZVN0YW1wIHRpbWVTdGFtcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIHRoaXMudGltZVN0YW1wID0gdGltZVN0YW1wO1xyXG4gICAgICAgICAgICBwaWNrdXBBY2Nlc3NvciA9IGVjcy5RdWlja0FjY2Vzc29yMjxCYXR0bGVFbnRpdHksIFBpY2t1cEluZm8+KCk7XHJcbiAgICAgICAgICAgIG1vdmVtZW50TW92ZXMuQWRkKE1vdmVUeXBlLk1vdmVVcCwgVmVjdG9yMkQuVW5pdFkpO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlRG93biwgLVZlY3RvcjJELlVuaXRZKTtcclxuICAgICAgICAgICAgbW92ZW1lbnRNb3Zlcy5BZGQoTW92ZVR5cGUuTW92ZUxlZnQsIC1WZWN0b3IyRC5Vbml0WCk7XHJcbiAgICAgICAgICAgIG1vdmVtZW50TW92ZXMuQWRkKE1vdmVUeXBlLk1vdmVSaWdodCwgVmVjdG9yMkQuVW5pdFgpO1xyXG5cclxuICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQoYmF0dGxlU3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgcGxheWVySGFuZEZpeGVkLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIHBsYXllckhhbmRGaXhlZC5BZGQoTW92ZVR5cGUuTW92ZVJpZ2h0KTtcclxuICAgICAgICAgICAgcGxheWVySGFuZEZpeGVkLkFkZChNb3ZlVHlwZS5Nb3ZlTGVmdCk7XHJcbiAgICAgICAgICAgIHBsYXllckhhbmRGaXhlZC5BZGQoTW92ZVR5cGUuTW92ZURvd24pO1xyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kRml4ZWQuQWRkKE1vdmVUeXBlLk1vdmVVcCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZSA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kVW5maXhlZC5BZGQoTW92ZVR5cGUuTm9ybWFsU2hvdCk7XHJcbiAgICAgICAgICAgICAgICBlbmVteU1vdmVzID0gbmV3IE1vdmVUeXBlW10ge1xyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVVcCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlRG93bixcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTm9ybWFsU2hvdCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL3BsYXllckhhbmRVbmZpeGVkLkFkZChNb3ZlVHlwZS5GaXJlKTtcclxuICAgICAgICAgICAgICAgIC8vcGxheWVySGFuZFVuZml4ZWQuQWRkKE1vdmVUeXBlLkljZSk7XHJcbiAgICAgICAgICAgICAgICAvL3BsYXllckhhbmRVbmZpeGVkLkFkZChNb3ZlVHlwZS5UaHVuZGVyKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZW5lbXlNb3ZlcyA9IG5ldyBNb3ZlVHlwZVtdIHtcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlRG93bixcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlVXAsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLkZpcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuSWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLlRodW5kZXIsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3BsYXllckhhbmQuQWRkKE1vdmVUeXBlLk5vcm1hbFNob3QpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSXNWaWN0b3J5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBiYXR0bGVSZXN1bHQucmVzdWx0ID09IDE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgQmF0dGxlRW50aXR5IGhlcm8gPSBuZXcgQmF0dGxlRW50aXR5KCk7XHJcblxyXG4gICAgICAgICAgICBoZXJvLnBvcy5TZXQoMSwgMSk7XHJcbiAgICAgICAgICAgIGhlcm8ubWluUG9zLlNldCgwLCAwKTtcclxuICAgICAgICAgICAgaGVyby5tYXhQb3MuU2V0KDIsIDIpO1xyXG4gICAgICAgICAgICBoZXJvLlR5cGUgPSBFbnRpdHlUeXBlLmhlcm87XHJcbiAgICAgICAgICAgIGhlcm8ubGlmZSA9IDI7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgaGVyby5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaGVyby5tb3Zlc1tpXSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgZW50aXRpZXMuQWRkKGhlcm8pO1xyXG4gICAgICAgICAgICBlY3NJbnRlZy5IZXJvQ3JlYXRlZChoZXJvKTtcclxuICAgICAgICAgICAgZWNzSW50ZWcuU3Bhd25FbmVtaWVzKCk7XHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0dhbWVFbnRpdHkgcGlja3VwID0gbmV3IEdhbWVFbnRpdHkoKTtcclxuICAgICAgICAgICAgICAgIC8vcGlja3VwLlR5cGUgPSBFbnRpdHlUeXBlLnBpY2t1cDtcclxuICAgICAgICAgICAgICAgIC8vcGlja3VwLnBvcy5TZXQoMCwgMik7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5saWZlID0gMjtcclxuICAgICAgICAgICAgICAgIC8vcGlja3VwLmdyYXBoaWMgPSA0O1xyXG4gICAgICAgICAgICAgICAgLy9lbnRpdGllcy5BZGQocGlja3VwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgQmF0dGxlRW50aXR5IHBhbmVsRWZmZWN0ID0gbmV3IEJhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5UeXBlID0gRW50aXR5VHlwZS5wYW5lbGVmZmVjdDtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QucG9zLlNldCgwLCAyKTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QubGlmZSA9IDU7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmdyYXBoaWMgPSA1O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5yYW5kb21Qb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmRyYXdMaWZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmRyYXdUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgIFJhbmRvbVBvc2l0aW9uKHBhbmVsRWZmZWN0KTtcclxuICAgICAgICAgICAgLy8gICAgZW50aXRpZXMuQWRkKHBhbmVsRWZmZWN0KTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgQmF0dGxlRW50aXR5IHBhbmVsRWZmZWN0ID0gbmV3IEJhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5UeXBlID0gRW50aXR5VHlwZS5wYW5lbGVmZmVjdDtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QucG9zLlNldCgwLCAyKTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QubGlmZSA9IDU7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmdyYXBoaWMgPSA1O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5yYW5kb21Qb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmRyYXdMaWZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmRyYXdUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgIFJhbmRvbVBvc2l0aW9uKHBhbmVsRWZmZWN0KTtcclxuICAgICAgICAgICAgLy8gICAgZW50aXRpZXMuQWRkKHBhbmVsRWZmZWN0KTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICBFeGVjdXRlUGhhc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVFbnRpdHkgTmV3QmF0dGxlRW50aXR5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJhdHRsZUVudGl0eSBiYXR0bGVFbnRpdHkgPSBuZXcgQmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgIGVudGl0aWVzLkFkZChiYXR0bGVFbnRpdHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlRW50aXR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVudGl0aWVzW2ldLmxpZmUgPSBlbnRpdGllc1tpXS5tYXhMaWZlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlLkVuZW15TW92ZUNob2ljZSk7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLnR1cm4uVmFsID0gMDtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUudG90YWxUdXJucyA9IDA7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IDA7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdy5WYWwgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbCA9IDE7XHJcbiAgICAgICAgICAgIGJhdHRsZVJlc3VsdC5yZXN1bHQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBJc092ZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJhdHRsZVJlc3VsdC5yZXN1bHQgIT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFRpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRmluaXNoUHJldmlvdXNUaWNrKCk7XHJcbiAgICAgICAgICAgIGJvb2wgaGVyb0FsaXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGJvb2wgZW5lbXlBbGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBib29sIHBpY2t1cE9ibGlnYXRvcnlFeGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uVHlwZSA9PSBFbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmxpZmUgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVteUFsaXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLlR5cGUgPT0gRW50aXR5VHlwZS5oZXJvKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmxpZmUgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvQWxpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdGhpcy5waWNrdXBBY2Nlc3Nvci5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBpY2t1cCA9IHBpY2t1cEFjY2Vzc29yLkNvbXAyKGkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBpY2t1cC5uZWNlc3NhcnlGb3JWaWN0b3J5ICYmIHBpY2t1cEFjY2Vzc29yLkNvbXAxKGkpLkFsaXZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpY2t1cE9ibGlnYXRvcnlFeGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJhdHRsZVN0YXRlLkJhdHRsZUVuZEFjdGl2ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFoZXJvQWxpdmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlUmVzdWx0LnJlc3VsdCA9IDI7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoKCFlbmVteUFsaXZlIHx8ICFCYXR0bGVDb25maWcubmVlZEtpbGxBbGxFbmVtaWVzKSAmJiAhcGlja3VwT2JsaWdhdG9yeUV4aXN0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZVJlc3VsdC5yZXN1bHQgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBoYXBwTWFuYWdlci5UaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aW1lU3RhbXAuQWR2YW5jZSgxKTtcclxuICAgICAgICAgICAgICAgIEV4ZWN1dGVQaGFzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRpbWVUb0Nob29zZSA+IDAgJiYgYmF0dGxlU3RhdGUucGhhc2UgPT0gQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lVG9DaG9vc2UgLT0gZGVsdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGltZVRvQ2hvb3NlIDw9IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRmluaXNoUHJldmlvdXNUaWNrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJhdHRsZVBoYXNlIHByZXZpb3VzUGhhc2UgPSBiYXR0bGVTdGF0ZS5waGFzZTtcclxuICAgICAgICAgICAgc3dpdGNoIChwcmV2aW91c1BoYXNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkVuZW15TW92ZUNob2ljZTpcclxuICAgICAgICAgICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5IYW5kUmVjaGFyZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5IYW5kUmVjaGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuUGlja0hhbmRzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuUGlja0hhbmRzOlxyXG4gICAgICAgICAgICAgICAgICAgIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmU6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdyA+PSBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib29sIG5vTW9yZVVuaXRzVG9BY3RUaGlzVHVybiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBpX2luaXRpYWwgPSBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaV9pbml0aWFsIDwgZW50aXRpZXMuQ291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSBpX2luaXRpYWw7IGkgPCBlbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdGllc1tpXS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vTW9yZVVuaXRzVG9BY3RUaGlzVHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9Nb3JlVW5pdHNUb0FjdFRoaXNUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmF0dGxlU3RhdGUudHVybiA+PSBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUucmFuZG9tUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJSQU5ET00gUE9TISFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSYW5kb21Qb3NpdGlvbihlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLnR1cm4gPSBiYXR0bGVTdGF0ZS50dXJuICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS50b3RhbFR1cm5zICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93LlZhbCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgUmFuZG9tUG9zaXRpb24oQmF0dGxlRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLnBvcy5YID0gUmFuZG9tU3VwcGxpZXIuUmFuZ2UoMCwgNSk7XHJcbiAgICAgICAgICAgIGUucG9zLlkgPSBSYW5kb21TdXBwbGllci5SYW5nZSgwLCAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZSBwaGFzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJhdHRsZVBoYXNlIHByZXZpb3VzUGhhc2UgPSBiYXR0bGVTdGF0ZS5waGFzZTtcclxuICAgICAgICAgICAgaWYgKHBoYXNlID09IHByZXZpb3VzUGhhc2UpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHBoYXNlID09IEJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzUGhhc2UgIT0gQmF0dGxlUGhhc2UuQ29uZmlybUlucHV0KVxyXG4gICAgICAgICAgICAgICAge1xyXG5QaWRyb2guQmFzZVV0aWxzLkV4dGVuc2lvbnMuU2h1ZmZsZTxnbG9iYWw6OlBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlPiggICAgICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sKTtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kVW5maXhlZC5DbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCBjb21tYW5kc1RvQWRkID0gMztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tbWFuZHNUb0FkZCA+IHBsYXllckhhbmRQb29sLkNvdW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZHNUb0FkZCA9IHBsYXllckhhbmRQb29sLkNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvbW1hbmRzVG9BZGQ7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckhhbmRVbmZpeGVkLkFkZChwbGF5ZXJIYW5kUG9vbFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZVRvQ2hvb3NlID0gdGltZVRvQ2hvb3NlTWF4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJldmlvdXNQaGFzZSA9PSBCYXR0bGVQaGFzZS5FeGVjdXRlTW92ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUudHVybi5WYWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5ID0gMDtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdy5WYWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlLm1vdmVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3Zlc1tpXSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5waGFzZSA9IHBoYXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBDb25maXJtSW5wdXRTdGFydCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5Db25maXJtSW5wdXQpO1xyXG4gICAgICAgICAgICBpbnB1dHMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgaW5wdXRzLkFkZChuZXcgVHVybmJhc2VkLklucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuQ29uZmlybSksIElucHV0VGFncy5NSVNDKTtcclxuICAgICAgICAgICAgaW5wdXRzLkFkZChuZXcgVHVybmJhc2VkLklucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuQ2FuY2VsKSwgSW5wdXRUYWdzLk1JU0MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEV4ZWN1dGVQaGFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcGhhc2UgPSBiYXR0bGVTdGF0ZS5waGFzZTtcclxuICAgICAgICAgICAgc3dpdGNoIChwaGFzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgZWNzSW50ZWcuU3Bhd25FbmVtaWVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5lbXlHZW5lcmF0ZU1vdmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkhhbmRSZWNoYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuUGlja0hhbmRzOlxyXG4gICAgICAgICAgICAgICAgICAgIFBpY2tIYW5kSW5wdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmU6XHJcbiAgICAgICAgICAgICAgICAgICAgZWNzSW50ZWcuU3Bhd25FbmVtaWVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgRXhlY3V0ZU1vdmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUGlja0hhbmRJbnB1dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnB1dHMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgaW5wdXRzLmlucHV0Rm9yQ29uZmlybWF0aW9uID0gbmV3IElucHV0KElucHV0VHlwZS5Ob25lLCAtMSk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBoaSBpbiBwbGF5ZXJIYW5kRml4ZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTW92ZSwgKGludCloaSksIElucHV0VGFncy5NT1ZFRklYKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaGkgaW4gcGxheWVySGFuZFVuZml4ZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTW92ZSwgKGludCloaSksIElucHV0VGFncy5NT1ZFVU5GSVgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LlJlZG8pLCBJbnB1dFRhZ3MuTUlTQyk7XHJcbiAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LkRvbmUpLCBJbnB1dFRhZ3MuTUlTQyk7XHJcbiAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LkhlbHApLCBJbnB1dFRhZ3MuTUlTQyk7XHJcbiAgICAgICAgICAgIGJvb2wgZW5lbXlFeGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uVHlwZSA9PSBFbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZW15RXhpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vaWYgKGVuZW15RXhpc3QpXHJcbiAgICAgICAgICAgIC8vICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LlByZXZpZXcpLCBJbnB1dFRhZ3MuTUlTQyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbnB1dERvbmUoSW5wdXQgaW5wdXQpXHJcbiAgICAgICAge1xyXG5cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoYmF0dGxlU3RhdGUucGhhc2UgPT0gQmF0dGxlUGhhc2UuQ29uZmlybUlucHV0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBQcm9jZXNzSW5wdXQoaW5wdXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRzLmlucHV0Rm9yQ29uZmlybWF0aW9uID0gaW5wdXQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbnB1dENvbmZpcm1lZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5QaWNrSGFuZHMpO1xyXG4gICAgICAgICAgICBJbnB1dCBpbnB1dCA9IGlucHV0cy5pbnB1dEZvckNvbmZpcm1hdGlvbjtcclxuICAgICAgICAgICAgaW5wdXRzLmlucHV0Rm9yQ29uZmlybWF0aW9uID0gbmV3IElucHV0KElucHV0VHlwZS5Ob25lLCAtMSk7XHJcbiAgICAgICAgICAgIFByb2Nlc3NJbnB1dChpbnB1dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUHJvY2Vzc0lucHV0KElucHV0IGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiSU5QVVRcIik7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5Nb3ZlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBNb3ZlVHlwZSBhcmcxID0gKE1vdmVUeXBlKWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJJTlBVVFRFRDFcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVySGFuZEZpeGVkLkNvbnRhaW5zKGFyZzEpIHx8IHBsYXllckhhbmRVbmZpeGVkLkNvbnRhaW5zKGFyZzEpKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJJTlBVVFRFRDJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZUNob3NlbihhcmcxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5NaXNjQmF0dGxlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBNaXNjQmF0dGxlSW5wdXQgbWlzYyA9IChNaXNjQmF0dGxlSW5wdXQpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIklOUFVUXCIrbWlzYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWlzYyA9PSBNaXNjQmF0dGxlSW5wdXQuUmVkbylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5oZXJvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGUubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUubW92ZXNbaV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50IHZhbHVlID0gZS5tb3Zlc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IC0xIHx8IGkgPT0gYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3Zlc1tpIC0gMV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtaXNjID09IE1pc2NCYXR0bGVJbnB1dC5Eb25lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtaXNjID09IE1pc2NCYXR0bGVJbnB1dC5Db25maXJtKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIElucHV0Q29uZmlybWVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUGlja0hhbmRJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1pc2MgPT0gTWlzY0JhdHRsZUlucHV0LkNhbmNlbClcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgQmF0dGxlRGVjaWRlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgaGVyb2VzID0gMDtcclxuICAgICAgICAgICAgaW50IGVuZW1pZXMgPSAwO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLmhlcm8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuQWxpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9lcysrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLkFsaXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVtaWVzKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGhlcm9lcyA9PSAwIHx8IGVuZW1pZXMgPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE1vdmVDaG9zZW4oTW92ZVR5cGUgbW92ZVR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLmhlcm8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlLm1vdmVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCB2YWx1ZSA9IGUubW92ZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdmVzW2ldID0gKGludCltb3ZlVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRXhlY3V0ZU1vdmVzKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJibGFcIiArIGJhdHRsZVN0YXRlLnR1cm4uVmFsKTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLlJlYWQoKTtcclxuICAgICAgICAgICAgQmF0dGxlRW50aXR5IGF0dGFja2VyID0gZW50aXRpZXNbYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5XTtcclxuICAgICAgICAgICAgaW50IHR1cm4gPSBiYXR0bGVTdGF0ZS50dXJuO1xyXG4gICAgICAgICAgICBFeGVjdXRlTW92ZShhdHRhY2tlciwgdHVybik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFeGVjdXRlTW92ZShCYXR0bGVFbnRpdHkgYWN0b3IsIGludCB0dXJuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTW92ZURhdGFFeGVjdXRlci5FeGVjdXRlTW92ZShhY3RvciwgdHVybik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IENhbGN1bGF0ZUF0dGFja011bHRpcGxpZXIoQmF0dGxlRW50aXR5IGFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJhc2VEID0gYWN0b3IuZGFtYWdlTXVsdGlwbGllcjtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlICE9IGFjdG9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnBvcyA9PSBhY3Rvci5wb3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VEICo9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJhc2VEO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBDYWxjdWxhdGVEZWZlbmRlck11bHRpcGxpZXIoQmF0dGxlRW50aXR5IGFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJhc2VEID0gMTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlICE9IGFjdG9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnBvcyA9PSBhY3Rvci5wb3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VEICo9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJhc2VEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEJhdHRsZVN0YXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgVmFsdWUgdHVybiA9IG5ldyBWYWx1ZSgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IHRvdGFsVHVybnM7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWYWx1ZSB0dXJuc1BlclBoYXNlID0gbmV3IFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWYWx1ZSBtb3ZlVGlja19Ob3cgPSBuZXcgVmFsdWUoKTtcclxuICAgICAgICAgICAgcHVibGljIGludCBtb3ZlVGlja19Ub3RhbCA9IDA7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgYWN0aW5nRW50aXR5ID0gMDtcclxuICAgICAgICAgICAgcHVibGljIEJhdHRsZVBoYXNlIHBoYXNlO1xyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBCYXR0bGVFbmRBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEJhdHRsZUVudGl0eVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGludCBsaWZlO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgcG9zID0gbmV3IFZlY3RvcjJEKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBtaW5Qb3MgPSBuZXcgVmVjdG9yMkQoKTtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIG1heFBvcyA9IG5ldyBWZWN0b3IyRCgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50W10gbW92ZXMgPSBuZXcgaW50WzEwXTtcclxuICAgICAgICAgICAgcHVibGljIGludCBncmFwaGljO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IGdyYXBoaWNSZXBlYXRlZEluZGV4O1xyXG4gICAgICAgICAgICBwdWJsaWMgZmxvYXQgZGFtYWdlTXVsdGlwbGllciA9IDE7XHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIGRyYXdMaWZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcHVibGljIGJvb2wgZHJhd1R1cm4gPSB0cnVlO1xyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCByYW5kb21Qb3NpdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwdWJsaWMgRWxlbWVudCBlbGVtZW50ID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IG1heExpZmUgPSAzO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEVudGl0eVR5cGUgVHlwZSA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVudGl0eVR5cGUuaGVybztcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIFBvc2l0aW9uVjJEIHsgZ2V0IHsgcmV0dXJuIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQocG9zLlgsIHBvcy5ZKTsgfSB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBEZWFkIHsgZ2V0IHsgcmV0dXJuIGxpZmUgPD0gMDsgfSB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBBbGl2ZSB7IGdldCB7IHJldHVybiAhdGhpcy5EZWFkOyB9IH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBNb3ZlVHlwZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRG9Ob3RoaW5nLFxyXG4gICAgICAgICAgICBNb3ZlVXAsXHJcbiAgICAgICAgICAgIE1vdmVMZWZ0LFxyXG4gICAgICAgICAgICBNb3ZlRG93bixcclxuICAgICAgICAgICAgTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICBOb3JtYWxTaG90LFxyXG4gICAgICAgICAgICBGaXJlLFxyXG4gICAgICAgICAgICBJY2UsXHJcbiAgICAgICAgICAgIFRodW5kZXIsXHJcbiAgICAgICAgICAgIEljZUJvbWIsXHJcbiAgICAgICAgICAgIFRodW5kZXJCb21iLFxyXG4gICAgICAgICAgICBTdW1tb25FbnRpdHlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEhhcHBUYWdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEF0dGFja0hpdCxcclxuICAgICAgICAgICAgQXR0YWNrTWlzcyxcclxuICAgICAgICAgICAgRGFtYWdlVGFrZW4sXHJcbiAgICAgICAgICAgIE1vdmVtZW50RmFpbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gQmF0dGxlUGhhc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVuZW15TW92ZUNob2ljZSxcclxuICAgICAgICAgICAgSGFuZFJlY2hhcmdlLFxyXG4gICAgICAgICAgICBQaWNrSGFuZHMsXHJcbiAgICAgICAgICAgIENvbmZpcm1JbnB1dCxcclxuICAgICAgICAgICAgRXhlY3V0ZU1vdmUsXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gRW50aXR5VHlwZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaGVybywgZW5lbXksIHBpY2t1cCwgcGFuZWxlZmZlY3RcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEVsZW1lbnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZpcmUsIEljZSwgVGh1bmRlcixcclxuICAgICAgICAgICAgTm9uZVxyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIGludCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQm9hcmRXaWR0aD02O3ByaXZhdGUgaW50IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Cb2FyZEhlaWdodD0zO31cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBWYWx1ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBWYWwgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW51bSB2YWxBc0VudW0geyBzZXQgeyBWYWwgPSBDb252ZXJ0LlRvU2luZ2xlKHZhbHVlKTsgfSB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0KGludCB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmFsID0gdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmFsdWUgb3BlcmF0b3IgKyhWYWx1ZSBjMSwgZmxvYXQgYzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjMS5WYWwgKz0gYzI7XHJcbiAgICAgICAgICAgIHJldHVybiBjMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgb3BlcmF0b3IgLShWYWx1ZSBjMSwgZmxvYXQgYzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYzEuVmFsIC0gYzI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oVmFsdWUgYzEsIFZhbHVlIGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYm9vbCBjMm51bGwgPSBvYmplY3QuUmVmZXJlbmNlRXF1YWxzKGMyLCBudWxsKTtcclxuICAgICAgICAgICAgYm9vbCBjMW51bGwgPSBvYmplY3QuUmVmZXJlbmNlRXF1YWxzKGMxLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKGMybnVsbCAmJiBjMW51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGMxbnVsbCB8fCBjMm51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYzEuVmFsID09IGMyLlZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciAhPShWYWx1ZSBjMSwgVmFsdWUgYzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBib29sIGMybnVsbCA9IG9iamVjdC5SZWZlcmVuY2VFcXVhbHMoYzIsIG51bGwpO1xyXG4gICAgICAgICAgICBib29sIGMxbnVsbCA9IG9iamVjdC5SZWZlcmVuY2VFcXVhbHMoYzEsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAoYzJudWxsICYmIGMxbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGMxbnVsbCB8fCBjMm51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjMS5WYWwgIT0gYzIuVmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbXBsaWNpdCBvcGVyYXRvciBmbG9hdChWYWx1ZSBkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQuVmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbXBsaWNpdCBvcGVyYXRvciBpbnQoVmFsdWUgZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KWQuVmFsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQmF0dGxlUmVzdWx0XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0cnVjdCBJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBJbnB1dFR5cGUgdHlwZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGFyZzE7XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIElucHV0KElucHV0VHlwZSB0eXBlLCBpbnQgYXJnMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuYXJnMSA9IGFyZzE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSW5wdXQoSW5wdXRUeXBlIHR5cGUsIEVudW0gYXJnMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuYXJnMSA9IENvbnZlcnQuVG9JbnQzMihhcmcxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gSW5wdXRUeXBlXHJcbiAgICB7XHJcbiAgICAgICAgTm9uZSwgTW92ZSwgTWlzY0JhdHRsZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIE1pc2NCYXR0bGVJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIERvbmUsXHJcbiAgICAgICAgUmVkbyxcclxuICAgICAgICBQcmV2aWV3LFxyXG4gICAgICAgIENvbmZpcm0sXHJcbiAgICAgICAgQ2FuY2VsLFxyXG4gICAgICAgIEhlbHBcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENvbG9yU3R1ZmZcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBzdHJpbmcgR29vZE1haW47XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgbmV1dHJhbERhcmsgPSBcIiMxOTAxM2JcIjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBuZXV0cmFsU3Ryb25nID0gXCIjMmMzZTQzXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgc3RyaW5nIEdvb2RTdWI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgc3RyaW5nIEV2aWxNYWluO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nW10gY29sb3JzID0gbmV3IHN0cmluZ1syMF07XHJcblxyXG4gICAgICAgIHN0YXRpYyBDb2xvclN0dWZmKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY29sb3JzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcnNbaV0gPSBcIiM0MDAwMjBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuSGVyb10gPSBcIiMwMDljOGRcIjtcclxuICAgICAgICAgICAgLy9jb25zdCBzdHJpbmcgaGVyb1N1YiA9IFwiIzAwNWY5MVwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuSGVyb1R1cm5dID0gaGVyb1N1YjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkVuZW15XSA9IFwiI2ZmMDM1M1wiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuR3JpZEhlcm9dID0gaGVyb1N1YjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkRW5lbXldID0gXCIjOGUwMDYwXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXlUdXJuXSA9IFwiIzhlMDA2MFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkJvYXJkXSA9IFwiIzFlNDg2ZVwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLmlucHV0S2V5XSA9IFwiIzY4ODY5MFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLldpbmRvd0xhYmVsXSA9IFwiIzFlNDg2ZVwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkZpcmVBdXJhXSA9IFwiIzc5MzEwMFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkljZUF1cmFdID0gXCIjMDA1NTkwXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuVGh1bmRlckF1cmFdID0gXCIjMDA1ODNkXCI7XHJcblxyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb10gPSBcIiM4YWQ4OTZcIjtcclxuICAgICAgICAgICAgY29uc3Qgc3RyaW5nIGhlcm9TdWIgPSBcIiM0YzZkNTBcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9UdXJuXSA9IGhlcm9TdWI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteV0gPSBcIiNmZjc2OTRcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvXSA9IGhlcm9TdWI7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyBlbmVteXN1YiA9IFwiI2E3NDY0ZlwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEVuZW15XSA9IGVuZW15c3ViO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXlUdXJuXSA9IGVuZW15c3ViO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5Cb2FyZF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuaW5wdXRLZXldID0gXCIjNjg4NjkwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLldpbmRvd0xhYmVsXSA9IFwiIzFlNDg2ZVwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5GaXJlQXVyYV0gPSBcIiM3OTMxMDBcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuSWNlQXVyYV0gPSBcIiMwMDU1OTBcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuVGh1bmRlckF1cmFdID0gXCIjMDA1ODNkXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkZpcmVTaG90XSA9IFwiI2Y4MmIzNlwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5JY2VTaG90XSA9IFwiIzAwN2VmZlwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5UaHVuZGVyU2hvdF0gPSBcIiNhMzdjMDBcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQmFja2dyb3VuZElucHV0XSA9IFwiIzA4MDgwOFwiO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLmlucHV0S2V5XSA9IFwiIzlFODY2NFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5JbnB1dERlc2NyaXB0aW9uXSA9IFwiIzgwODA4MFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5CYWNrQmF0dGxlXSA9IFwiIzAwMDAwMFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5CYWNrZ3JvdW5kSW5wdXRdID0gXCIjMUExQTFBXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvVHVybl0gPSBcIiMwMEIyQjJcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15VHVybl0gPSBcIiNGRjAwNDBcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvXSA9IFwiIzAwNDY4Q1wiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEVuZW15XSA9IFwiIzhDMDAyM1wiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb10gPSBcIiM2NkZGRkZcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15XSA9IFwiI0Q5MDAzNlwiO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dID0gXCIjQkZCRkJGXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteV0gPSBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb107XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvVHVybl0gPSBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb107XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteVR1cm5dID0gY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbF0gPSBcIiM2NjY2NjZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQmFja0NvbW1hbmRdID0gXCIjMzMzMzMzXCI7XHJcblxyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5GaXJlQXVyYV0gPSBcIiNGRjhDNjZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuSWNlQXVyYV0gPSBcIiM2NkZGRkZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuVGh1bmRlckF1cmFdID0gXCIjRkZGRjY2XCI7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuRGVidWdFeHRyYVxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIERlYnVnRXhcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgTGlzdDxzdHJpbmc+IG1lc3NhZ2VzID0gbmV3IExpc3Q8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTG9nKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWVzc2FnZXMuQWRkKHYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFNob3coKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29uc29sZS5DbGVhcigpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBtZXNzYWdlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDb25zb2xlLlJlYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBpbnRlcm5hbCBjbGFzcyBFQ1NJbnRlZ3JhdGlvblxyXG4gICAge1xyXG5cclxuICAgICAgICBTcGF3bkVudGl0eUZhY3RvcnkgZW5lbXlGYWN0b3J5O1xyXG4gICAgICAgIEVDU01hbmFnZXIgZWNzO1xyXG5cclxuICAgICAgICBwdWJsaWMgRUNTSW50ZWdyYXRpb24oU3Bhd25FbnRpdHlGYWN0b3J5IGVuZW15RmFjdG9yeSwgRUNTTWFuYWdlciBlY3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15RmFjdG9yeSA9IGVuZW15RmFjdG9yeTtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEhlcm9DcmVhdGVkKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGhlcm8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChoZXJvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU3Bhd25FbmVtaWVzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVuZW15RmFjdG9yeS5TcGF3bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRW5lbXlBSVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBMaXN0PG9iamVjdD4gbW92ZXMgPSBuZXcgTGlzdDxvYmplY3Q+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEVuZW15QUlTdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgcHJvZ3Jlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdmVVc2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IG1vdmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlVXNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVVzZShpbnQgbW92ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSA9IG1vdmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTcGF3bkVudGl0eUZhY3RvcnlcclxuICAgIHtcclxuXHJcbiAgICAgICAgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgTGlzdDxFbmVteURhdGE+IGVuZW15RGF0YXM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBCYXR0bGVNYWluIGJhdHRsZU1haW47XHJcbiAgICAgICAgcHJpdmF0ZSBRdWlja0FjY2Vzc29yT25lPFNwYXduRGF0YT4gc3Bhd25zO1xyXG5cclxuICAgICAgICBwdWJsaWMgU3Bhd25FbnRpdHlGYWN0b3J5KEVDU01hbmFnZXIgZWNzLCBMaXN0PEVuZW15RGF0YT4gZW5lbXlEYXRhcywgQmF0dGxlTWFpbiBiYXR0bGVNYWluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIC8vZWNzLlF1aWNrQWNjZXNzb3IxPEVuZW15RGF0YT4oKTtcclxuICAgICAgICAgICAgc3Bhd25zID0gZWNzLlF1aWNrQWNjZXNzb3IxPFNwYXduRGF0YT4oKTtcclxuICAgICAgICAgICAgdGhpcy5lbmVteURhdGFzID0gZW5lbXlEYXRhcztcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVNYWluID0gYmF0dGxlTWFpbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNwYXduKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBzcGF3bmVkID0gMDtcclxuICAgICAgICAgICAgLy9mb3IgKGludCBpID0gMDsgaSA8IHNwYXducy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB3aGlsZSAoc3Bhd25zLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU3Bhd25EYXRhIHNwYXduID0gc3Bhd25zLkNvbXAxKDApO1xyXG4gICAgICAgICAgICAgICAgc3Bhd25zLkVudGl0eSgwKS5SZW1vdmVDb21wb25lbnQoc3Bhd24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlkID0gc3Bhd24uaWQ7XHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkVudGl0eVR5cGUgZW50VHlwZSA9IChCYXR0bGVNYWluLkVudGl0eVR5cGUpc3Bhd24uZW50aXR5VHlwZTtcclxuICAgICAgICAgICAgICAgIGlmKGVudFR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmUgPSBiYXR0bGVNYWluLk5ld0JhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLlR5cGUgPSBlbnRUeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIFBpY2t1cEluZm8gcGlja3VwID0gbmV3IFBpY2t1cEluZm8odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBpY2t1cEUgPSBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChwaWNrdXApO1xyXG4gICAgICAgICAgICAgICAgICAgIHBpY2t1cEUuQWRkQ29tcG9uZW50KGJlKTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5wb3MgPSBzcGF3bi5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBiZS5saWZlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5tYXhMaWZlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5kcmF3TGlmZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLmRyYXdUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUuZ3JhcGhpYyA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZW50VHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZW15QUkgPSBlbmVteURhdGFzW2lkXS5lbmVteUFJO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmVteSA9IGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KGVuZW15QUkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBiZSA9IGJhdHRsZU1haW4uTmV3QmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUucG9zID0gc3Bhd24ucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgYmUubGlmZSA9IGVuZW15RGF0YXNbaWRdLmhwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLm1heExpZmUgPSBiZS5saWZlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLmdyYXBoaWMgPSBlbmVteURhdGFzW2lkXS5yZW5kZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVudGl0aWVzID0gYmF0dGxlTWFpbi5lbnRpdGllcztcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtICE9IGJlICYmIGl0ZW0uZ3JhcGhpYyA9PSBiZS5ncmFwaGljKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZS5ncmFwaGljUmVwZWF0ZWRJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJlLm1pblBvcyA9IG5ldyBWZWN0b3IyRCgzLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5tYXhQb3MgPSBuZXcgVmVjdG9yMkQoNSwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUuVHlwZSA9IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteTtcclxuICAgICAgICAgICAgICAgICAgICBlbmVteS5BZGRDb21wb25lbnQoYmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVuZW15QUlTdGF0ZSBlbmVteUFpU3RhdGUgPSBuZXcgRW5lbXlBSVN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5lbXlBaVN0YXRlLnByb2dyZXNzID0gc3Bhd25lZDtcclxuICAgICAgICAgICAgICAgICAgICBlbmVteS5BZGRDb21wb25lbnQoZW5lbXlBaVN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJTUEFXTlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzcGF3bmVkKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFBpY2t1cEluZm9cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgYm9vbCBuZWNlc3NhcnlGb3JWaWN0b3J5O1xyXG5cclxuICAgICAgICBwdWJsaWMgUGlja3VwSW5mbyhib29sIG5lY2Vzc2FyeUZvclZpY3RvcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5lY2Vzc2FyeUZvclZpY3RvcnkgPSBuZWNlc3NhcnlGb3JWaWN0b3J5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBpY2t1cEluZm8oKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEVuZW15RGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBFbmVteUFJIGVuZW15QUk7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBocDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHJlbmRlcjtcclxuXHJcbiAgICAgICAgcHVibGljIEVuZW15RGF0YShFbmVteUFJIGVuZW15QUksIGludCBocCwgaW50IHJlbmRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlBSSA9IGVuZW15QUk7XHJcbiAgICAgICAgICAgIHRoaXMuaHAgPSBocDtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIgPSByZW5kZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBFbmVteURhdGFDcmVhdG9yXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxzdHJpbmc+IHJlbmRlclRleHRzO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PEVuZW15RGF0YT4gZW5lbXlEYXRhcyA9IG5ldyBMaXN0PEVuZW15RGF0YT4oKTtcclxuICAgICAgICBNb3ZlQ3JlYXRvclByb2cgbW92ZUNyZWF0b3JQcm9nO1xyXG5cclxuICAgICAgICBwdWJsaWMgRW5lbXlEYXRhQ3JlYXRvcihMaXN0PHN0cmluZz4gcmVuZGVyVGV4dHMsIE1vdmVDcmVhdG9yUHJvZyBtb3ZlQ3JlYXRvclByb2cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZW5kZXJUZXh0cy5BZGQoXCJAXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclRleHRzID0gcmVuZGVyVGV4dHM7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUNyZWF0b3JQcm9nID0gbW92ZUNyZWF0b3JQcm9nO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuICAgICAgICAgICAgICAgIE1vdmVzKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVEb3duLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVVcCwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlcilcclxuICAgICAgICAgICAgICAgICksIGhwOjIsIHJlbmRlclRleHQ6XCIlXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuICAgICAgICAgICAgICAgIE1vdmVzKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZywgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nKVxyXG4gICAgICAgICAgICAgICAgKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiI1wiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcbiAgICAgICAgICAgICAgIE1vdmVzKFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVxyXG4uTW92ZVJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICksIGhwOiA2LCByZW5kZXJUZXh0OiBcIiZcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iLFxyXG4gICAgICAgICAgICAgICAgICAgXCJTdW1tb25cIixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVxyXG4uRmlyZVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICksIGhwOiA0NSwgcmVuZGVyVGV4dDogXCIkXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXAsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVEb3duLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93bixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlXHJcbi5Nb3ZlVXBcclxuXHJcblxyXG4gICAgICAgICAgICAgICApLCBocDogMywgcmVuZGVyVGV4dDogXCJIXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuXHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2UsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb05vdGhpbmcsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVxyXG4uRG9Ob3RoaW5nXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICksIGhwOiAzLCByZW5kZXJUZXh0OiBcIkpcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLkRvTm90aGluZ1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICApLCBocDogMywgcmVuZGVyVGV4dDogXCJMXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuXHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLkRvTm90aGluZ1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICApLCBocDogMywgcmVuZGVyVGV4dDogXCJLXCIpO1xyXG4gICAgICAgICAgICAvL0FkZEVuZW15KGFpOiBBY3Rpb25zKCksIGhwOiAzLCByZW5kZXJUZXh0OiBcIiRcIik7XHJcbiAgICAgICAgICAgIC8vQWRkRW5lbXkoYWk6IEFjdGlvbnMoKSwgaHA6IDUsIHJlbmRlclRleHQ6IFwiI1wiKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIEVuZW15QUkgQWN0aW9ucyhwYXJhbXMgb2JqZWN0W10gb2JzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGFpID0gbmV3IEVuZW15QUkoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBvIGluIG9icylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG8gaXMgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWkubW92ZXMuQWRkKG5ldyBNb3ZlVXNlKChpbnQpbykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG8gaXMgc3RyaW5nKVxyXG4gICAgICAgICAgICAgICAgeyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGFpLm1vdmVzLkFkZChuZXcgTW92ZVVzZShtb3ZlQ3JlYXRvclByb2cuR2V0TW92ZUlkKG8gYXMgc3RyaW5nKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG8gaXMgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVbXSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBvIGFzIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlW10pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhaS5tb3Zlcy5BZGQobmV3IE1vdmVVc2UoKGludClpdGVtKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWkubW92ZXMuQWRkKG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVbXSBNb3ZlcyhwYXJhbXMgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVbXSBtb3ZlcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb3ZlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZGRFbmVteShFbmVteUFJIGFpLCBpbnQgaHAsIHN0cmluZyByZW5kZXJUZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHJlbmRlciA9IHJlbmRlclRleHRzLkNvdW50O1xyXG4gICAgICAgICAgICByZW5kZXJUZXh0cy5BZGQocmVuZGVyVGV4dCk7XHJcbiAgICAgICAgICAgIGVuZW15RGF0YXMuQWRkKG5ldyBFbmVteURhdGEoYWksIGhwLCByZW5kZXIpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU3RhZ2VEYXRhQ3JlYXRvclxyXG4gICAge1xyXG4gICAgICAgIC8vcHVibGljIExpc3Q8U3RhZ2VEYXRhPiBzdGFnZXMgPSBuZXcgTGlzdDxTdGFnZURhdGE+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBFQ1NNYW5hZ2VyIGVjcztcclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlRGF0YUNyZWF0b3IoRUNTTWFuYWdlciBlY3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuXHJcbiAgICAgICAgICAgIC8vQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgIC8vICAgIEVuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMikpLFxyXG4gICAgICAgICAgICAvLyAgICBFbmVteSgyLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDEpKSxcclxuICAgICAgICAgICAgLy8gICAgRW5lbXkoMiwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSlcclxuICAgICAgICAgICAgLy8gICAgKSk7XHJcblxyXG4gICAgICAgICAgICAvL0FkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAvLyAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgLy8gIEVuZW15KDUsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpLFxyXG4gICAgICAgICAgICAvLyAgRW5lbXkoNywgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAwKSlcclxuICAgICAgICAgICAgLy8gICkpO1xyXG5cclxuICAgICAgICAgICAgQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgICAgUGlja3VwKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMCwgMCkpLFxyXG4gICAgICAgICAgICAgICAgUGlja3VwKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMiwgMikpXHJcbiAgICAgICAgICAgICAgICApLkhpZGVMaWZlVUkoKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoKSk7XHJcbiAgICAgICAgICAgIEFkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICAgIG5ldyBCYXR0bGVDb25maWcobmVlZEtpbGxBbGxFbmVtaWVzOmZhbHNlKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDIsIDEpKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIDIpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDQsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpXHJcbiAgICAgICAgICAgICAgICApLkhpZGVMaWZlVUkoKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoKSk7XHJcbiAgICAgICAgICAgIEFkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICAgIG5ldyBCYXR0bGVDb25maWcobmVlZEtpbGxBbGxFbmVtaWVzOiBmYWxzZSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgyLCAyKSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgxLCAyKSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgwLCAyKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSg1LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDIpKVxyXG4gICAgICAgICAgICAgICAgKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoKSk7XHJcbiAgICAgICAgICAgIEFkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDYsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMCkpXHJcbiAgICAgICAgICAgICAgICApLCBuZXcgRml4ZWRBdHRhY2tTdGFnZShcclxuICAgICAgICAgICAgICAgICAgICAoaW50KUJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSkpO1xyXG4gICAgICAgICAgICBBZGQobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICAgRW5lbXkoNCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSlcclxuICAgICAgICAgICAgICAgKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAoaW50KUJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSkpO1xyXG4gICAgICAgICAgICBBZGQobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICAgRW5lbXkoNSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSlcclxuICAgICAgICAgICAgICAgKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAoaW50KUJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSkpO1xyXG4gICAgICAgICAgICBBZGQobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgIEVuZW15KDUsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpLFxyXG4gICAgICAgICAgICAgIEVuZW15KDcsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMCkpXHJcbiAgICAgICAgICAgICAgKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoXHJcbiAgICAgICAgICAgICAgICAgIChpbnQpQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlLCAoaW50KUJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlciApKTtcclxuICAgICAgICAgICAgQWRkKFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAwKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDIpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIEVuZW15KDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMikpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMiwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSgxLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIEVuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMikpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMiwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAxKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSgyLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgICAgICBuZXcgQmF0dGxlQ29uZmlnKG5ldyBpbnRbXSB7IDEgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgRW5lbXkoMywgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSlcclxuICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICAvLyxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyxcclxuICAgICAgICAgICAgICAgIC8vbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIC8vbmV3IEVuZW15U3Bhd25EYXRhKDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpLFxyXG4gICAgICAgICAgICAgICAgLy9uZXcgRW5lbXlTcGF3bkRhdGEoMSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSkpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZGQocGFyYW1zIG9iamVjdFtdIGNvbXBzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBlID0gZWNzLkNyZWF0ZUVudGl0eSgpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBjb21wcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZS5BZGRDb21wb25lbnQoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFNwYXduRGF0YSBQaWNrdXAoaW50IHYsIFZlY3RvcjJEIHZlY3RvcjJEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTcGF3bkRhdGEodiwgdmVjdG9yMkQsIChpbnQpQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFNwYXduRGF0YSBFbmVteShpbnQgdiwgVmVjdG9yMkQgdmVjdG9yMkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNwYXduRGF0YSh2LCB2ZWN0b3IyRCwgKGludClCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEFkZChwYXJhbXMgU3RhZ2VEYXRhW10gc3RhZ2VEYXRhMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHN0YWdlRGF0YTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vc3RhZ2VzLkFkZFJhbmdlKHN0YWdlRGF0YTEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU3RhZ2VEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8U3Bhd25EYXRhPiBlbmVteVNwYXducyA9IG5ldyBMaXN0PFNwYXduRGF0YT4oKTtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnIGJhdHRsZUNvbmZpZztcclxuICAgICAgICBwdWJsaWMgYm9vbCBoaWRlTGlmZVVJID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFnZURhdGEoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFnZURhdGEocGFyYW1zIFNwYXduRGF0YVtdIHNwYXducylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVuZW15U3Bhd25zLkFkZFJhbmdlKHNwYXducyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhZ2VEYXRhKEJhdHRsZUNvbmZpZyBiYXR0bGVDb25maWcsIHBhcmFtcyBTcGF3bkRhdGFbXSBzcGF3bnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbmVteVNwYXducy5BZGRSYW5nZShzcGF3bnMpO1xyXG4gICAgICAgICAgICB0aGlzLmJhdHRsZUNvbmZpZyA9IGJhdHRsZUNvbmZpZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFnZURhdGEgSGlkZUxpZmVVSSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBoaWRlTGlmZVVJID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBGaXhlZEF0dGFja1N0YWdlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8aW50PiBtb3ZlcyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIEZpeGVkQXR0YWNrU3RhZ2UoaW50IG1vdmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3Zlcy5BZGQobW92ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRml4ZWRBdHRhY2tTdGFnZShwYXJhbXMgaW50W10gbW92ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdmVzLkFkZFJhbmdlKG1vdmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEZpeGVkQXR0YWNrU3RhZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFNwYXduRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgaWQ7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBlbnRpdHlUeXBlO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXNlVXRpbHMuVmVjdG9yMkQgcG9zaXRpb247XHJcblxyXG4gICAgICAgIHB1YmxpYyBTcGF3bkRhdGEoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTcGF3bkRhdGEoaW50IGlkLCBWZWN0b3IyRCBwb3NpdGlvbiwgaW50IHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5lbnRpdHlUeXBlID0gdHlwZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkhhcHBzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZURhdGFFeGVjdXRlclxyXG4gICAge1xyXG4gICAgICAgIEJhdHRsZU1haW4gYmF0dGxlTWFpbjtcclxuICAgICAgICBMaXN0PE1vdmVEYXRhPiBtb3ZlRGF0YXM7XHJcbiAgICAgICAgcHJpdmF0ZSBIYXBwTWFuYWdlciBoYXBwTWFuYWdlcjtcclxuICAgICAgICBwcml2YXRlIExpc3Q8QmF0dGxlTWFpbi5CYXR0bGVFbnRpdHk+IGVudGl0aWVzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgVGltZVN0YW1wIHRpbWVTdGFtcDtcclxuICAgICAgICBMaXN0PFZlY3RvcjJEPiBhdXggPSBuZXcgTGlzdDxWZWN0b3IyRD4oKTtcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlRGF0YUV4ZWN1dGVyKEJhdHRsZU1haW4gdHVybkJhc2UsIExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcywgRUNTTWFuYWdlciBlY3MsIFRpbWVTdGFtcCB0aW1lU3RhbXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJhdHRsZU1haW4gPSB0dXJuQmFzZTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlRGF0YXMgPSBtb3ZlRGF0YXM7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IHRpbWVTdGFtcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEV4ZWN1dGVNb3ZlKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGFjdG9yLCBpbnQgdHVybilcclxuICAgICAgICB7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGJhdHRsZVN0YXRlID0gdGhpcy5iYXR0bGVNYWluLmJhdHRsZVN0YXRlO1xyXG4gICAgICAgICAgICBlbnRpdGllcyA9IHRoaXMuYmF0dGxlTWFpbi5lbnRpdGllcztcclxuICAgICAgICAgICAgaW50IHVzZXJJZCA9IGVudGl0aWVzLkluZGV4T2YoYWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1vdmVJZCA9IGFjdG9yLm1vdmVzW3R1cm5dO1xyXG4gICAgICAgICAgICBpZiAobW92ZUlkIDwgMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgbWQgPSBtb3ZlRGF0YXNbbW92ZUlkXTtcclxuICAgICAgICAgICAgaWYgKG1kID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKG1kLnVuaXRzLkNvdW50ID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSBtZC51bml0cy5Db3VudDtcclxuICAgICAgICAgICAgaW50IG1vdmVUaWNrID0gYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93O1xyXG4gICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1kLnVuaXRzW21vdmVUaWNrXS50aGluZ3NUb0hhcHBlbjtcclxuICAgICAgICAgICAgaGFwcE1hbmFnZXIgPSBiYXR0bGVNYWluLmhhcHBNYW5hZ2VyO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYSBpbiBhY3Rpb25zKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGEgaXMgTW92ZUFjdGlvbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlQWN0aW9uIG1hID0gYSBhcyBNb3ZlQWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwID0gbWEuZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0b3IucG9zICs9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBpbnZhbGlkTW92ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLnBvcy5YIDwgYWN0b3IubWluUG9zLlhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgYWN0b3IucG9zLlkgPCBhY3Rvci5taW5Qb3MuWVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhY3Rvci5wb3MuWSA+IGFjdG9yLm1heFBvcy5ZXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGFjdG9yLnBvcy5YID4gYWN0b3IubWF4UG9zLlg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZSAhPSBhY3RvciAmJiBlLkFsaXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0b3IucG9zID09IGUucG9zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRNb3ZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5waWNrdXApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmxpZmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5kYW1hZ2VNdWx0aXBsaWVyID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZE1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW52YWxpZE1vdmUpIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGludmFsaWRNb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkludmFsaWQgbW92ZSBnZW5lcmF0ZVwiICsgYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93LlZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgYWN0b3JJZCA9IGVudGl0aWVzLkluZGV4T2YoYWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDcmVhdGVIYXBwKG1kLCBuZXcgSGFwcE1vdmVEYXRhKGFjdG9ySWQpLCBuZXcgSGFwcE1vdmVtZW50RmFpbChhY3Rvci5wb3MpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVNYWluLmhhcHBNYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQWRkKG5ldyBIYXBwKEJhdHRsZU1haW4uSGFwcFRhZy5Nb3ZlbWVudEZhaWwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShhY3RvcklkKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoYWN0b3IucG9zLlgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShhY3Rvci5wb3MuWSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5wb3MgLT0gcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYSBpcyBEZWFsRGFtYWdlQWN0aW9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZGEgPSBhIGFzIERlYWxEYW1hZ2VBY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dGFja0VsZW1lbnQgPSBkZGEuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGRhLnRhcmdldCA9PSBUYXJnZXQuQXJlYSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmVhID0gZGRhLmFyZWE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZlcmVuY2VVc2VyT2ZBcmVhID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGFyZWEudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IG1pcnJvcmluZ1ggPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0b3IuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpIC8vZW5lbWllcyBhY3Qgb24gb3Bwb3NpdGUgc2lkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXJyb3JpbmdYID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHBvaW50IGluIGFyZWEucG9pbnRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VhcmNoUG9zID0gcG9pbnQgKiBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKG1pcnJvcmluZ1gsIDEpICsgcmVmZXJlbmNlVXNlck9mQXJlYS5wb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiU2VhcmNoIHBvaW50IFwiK3NlYXJjaFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0aWVzW2ldLnBvcyA9PSBzZWFyY2hQb3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWFsRGFtYWdlKGFjdG9yLCBkZGEsIGVudGl0aWVzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZmluZCB0YXJnZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgdGFyZ2V0ID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGRkYS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlYWxEYW1hZ2UoYWN0b3IsIGRkYSwgdGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYSBpcyBTdW1tb25FbnRpdHkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlID0gYSBhcyBTdW1tb25FbnRpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZW15V2hpY2ggPSBzZS5lbmVteVdoaWNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmVteUlkID0gYmF0dGxlTWFpbi5CYXR0bGVDb25maWcuZW5lbWllc1RvU3VtbW9uW2VuZW15V2hpY2hdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbnRpdGllcyA9IGJhdHRsZU1haW4uZW50aXRpZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9ucyA9IEdldEVtcHR5U3BvdHMoc2lkZToxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb25zLkNvdW50ID09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yMkQgc3VtbW9uUG9zID0gc2UucHJlZmVyZW50aWFsUm93Q29sdW1uO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcG9zaXRpb25zLkNvbnRhaW5zKHN1bW1vblBvcykpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tb25Qb3MgPSBwb3NpdGlvbnNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG5ldyBTcGF3bkRhdGEoZW5lbXlJZCwgc3VtbW9uUG9zLCAoaW50KUJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGEgaXMgQW5pbWF0aW9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhbmltID0gYSBhcyBBbmltYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgdGFyZ2V0ID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGFuaW0udGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJlYSA9IGFuaW0uYXJlYTtcclxuICAgICAgICAgICAgICAgICAgICBIYXBwQXJlYSBoYXBwQXJlYSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZWEgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZlcmVuY2VVc2VyT2ZBcmVhID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGFyZWEudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBtaXJyb3JpbmdYID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdG9yLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KSAvL2VuZW1pZXMgYWN0IG9uIG9wcG9zaXRlIHNpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlycm9yaW5nWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBBcmVhID0gbmV3IEhhcHBBcmVhKGFyZWEsIHJlZmVyZW5jZVVzZXJPZkFyZWEucG9zLCBtaXJyb3JpbmdYKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHRhcmdldElkID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJZCA9IGVudGl0aWVzLkluZGV4T2YodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBDcmVhdGVIYXBwKG1kLCBoYXBwQXJlYSwgbmV3IEhhcHBNb3ZlRGF0YSh1c2VySWQsIHRhcmdldElkLCBhbmltLmVsZW1lbnQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW0udGFyZ2V0ICE9IFRhcmdldC5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcE1hbmFnZXJcclxuLkFkZChuZXcgSGFwcChCYXR0bGVNYWluLkhhcHBUYWcuQXR0YWNrSGl0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShlbnRpdGllcy5JbmRleE9mKHRhcmdldCkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKHVzZXJJZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoKGludClhbmltLmVsZW1lbnQpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1vdmVUaWNrID09IG1kLnVuaXRzLkNvdW50IC0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbWQudW5pdHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFjdCBpbiBpdGVtLnRoaW5nc1RvSGFwcGVuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdCBpcyBEZWFsRGFtYWdlQWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VFbGVtZW50KGFjdG9yLCAoYWN0IGFzIERlYWxEYW1hZ2VBY3Rpb24pLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PFZlY3RvcjJEPiBHZXRFbXB0eVNwb3RzKGludCBzaWRlID0gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhdXguQ2xlYXIoKTtcclxuICAgICAgICAgICAgaW50IG9mZlggPSAwO1xyXG4gICAgICAgICAgICBpZiAoc2lkZSA9PSAxKSBvZmZYID0gMztcclxuICAgICAgICAgICAgaW50IHdpZHRoID0gYmF0dGxlTWFpbi5Cb2FyZFdpZHRoIC8gMjtcclxuICAgICAgICAgICAgaWYgKHNpZGUgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICB3aWR0aCA9IGJhdHRsZU1haW4uQm9hcmRXaWR0aDtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGJhdHRsZU1haW4uQm9hcmRIZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LkFkZChuZXcgVmVjdG9yMkQoaStvZmZYLGopKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZW50aXRpZXMgPSBiYXR0bGVNYWluLmVudGl0aWVzO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuQWxpdmUgJiYgYXV4LkNvbnRhaW5zKGUucG9zKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXguUmVtb3ZlKGUucG9zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXV4O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDaGFuZ2VFbGVtZW50KEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGFjdG9yLCBCYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChhY3Rvci5lbGVtZW50ID09IGVsZW1lbnQpIHJldHVybjtcclxuICAgICAgICAgICAgYWN0b3IuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHZhciB0aCA9IG5ldyBIYXBwVGFncygoaW50KU1pc2NIYXBwVGFncy5DaGFuZ2VFbGVtZW50KTtcclxuICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQodGgsIG5ldyBIYXBwTW92ZURhdGEoZW50aXRpZXMuSW5kZXhPZihhY3RvciksIC0xLCBlbGVtZW50KSkuQWRkQ29tcG9uZW50KHRpbWVTdGFtcC5HZXRTbmFwKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENyZWF0ZUhhcHAoTW92ZURhdGEgbWQsIG9iamVjdCBjb21wMSwgb2JqZWN0IGNvbXAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoID0gbmV3IEhhcHBUYWdzKG1kLnRhZ3MpO1xyXG4gICAgICAgICAgICB2YXIgZSA9IGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KHRoLCB0aW1lU3RhbXAuR2V0U25hcCgpKTtcclxuICAgICAgICAgICAgaWYgKGNvbXAxICE9IG51bGwpIGUuQWRkQ29tcG9uZW50KGNvbXAxKTtcclxuICAgICAgICAgICAgaWYgKGNvbXAyICE9IG51bGwpIGUuQWRkQ29tcG9uZW50KGNvbXAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDcmVhdGVIYXBwKGludCB0YWcsIG9iamVjdCBjb21wMSwgb2JqZWN0IGNvbXAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoID0gbmV3IEhhcHBUYWdzKHRhZyk7XHJcbiAgICAgICAgICAgIHZhciBlID0gZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQodGgsIHRpbWVTdGFtcC5HZXRTbmFwKCkpO1xyXG4gICAgICAgICAgICBpZiAoY29tcDEgIT0gbnVsbCkgZS5BZGRDb21wb25lbnQoY29tcDEpO1xyXG4gICAgICAgICAgICBpZiAoY29tcDIgIT0gbnVsbCkgZS5BZGRDb21wb25lbnQoY29tcDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERlYWxEYW1hZ2UoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgYWN0b3IsIERlYWxEYW1hZ2VBY3Rpb24gZGRhLCBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSB0YXJnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCYXR0bGVNYWluLkVsZW1lbnQgYXR0YWNrRWxlbWVudCA9IGRkYS5lbGVtZW50O1xyXG4gICAgICAgICAgICBib29sIGVsZW1lbnRhbEJsb2NrID0gYXR0YWNrRWxlbWVudCA9PSB0YXJnZXQuZWxlbWVudCAmJiBhdHRhY2tFbGVtZW50ICE9IEJhdHRsZU1haW4uRWxlbWVudC5Ob25lO1xyXG4gICAgICAgICAgICBib29sIHN1cGVyRWZmZWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGludCBkYW1hZ2UgPSAwO1xyXG4gICAgICAgICAgICBpbnQgdGFyZ2V0SWQgPSBlbnRpdGllcy5JbmRleE9mKHRhcmdldCk7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50YWxCbG9jaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghZWxlbWVudGFsQmxvY2spXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG11bCA9IGJhdHRsZU1haW4uQ2FsY3VsYXRlQXR0YWNrTXVsdGlwbGllcihhY3Rvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbXVsICo9IGJhdHRsZU1haW4uQ2FsY3VsYXRlRGVmZW5kZXJNdWx0aXBsaWVyKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFja0VsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkZpcmUgJiYgdGFyZ2V0LmVsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkljZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhdHRhY2tFbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyICYmIHRhcmdldC5lbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5GaXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGF0dGFja0VsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkljZSAmJiB0YXJnZXQuZWxlbWVudCA9PSBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlcilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bCAqPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBlckVmZmVjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGFtYWdlID0gZGRhLmRhbWFnZSAqIChpbnQpbXVsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5saWZlIC09IGRhbWFnZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBhY3Rvci5kYW1hZ2VNdWx0aXBsaWVyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBoYXBwTWFuYWdlci5BZGQobmV3IEhhcHAoQmF0dGxlTWFpbi5IYXBwVGFnLkRhbWFnZVRha2VuKSlcclxuICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKHRhcmdldElkKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5DcmVhdGVIYXBwKChpbnQpTWlzY0hhcHBUYWdzLkRhbWFnZSwgbmV3IEhhcHBEYW1hZ2VEYXRhKHRhcmdldC5lbGVtZW50LCBkZGEuZWxlbWVudCwgZW50aXRpZXMuSW5kZXhPZih0YXJnZXQpLCBkYW1hZ2UsIHN1cGVyRWZmZWN0aXZlLCBlbGVtZW50YWxCbG9jayksIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmxpZmUgPD0gMCAmJiAhc3VwZXJFZmZlY3RpdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENyZWF0ZUhhcHAoKGludClNaXNjSGFwcFRhZ3MuRGVhdGgsIG5ldyBIYXBwTW92ZURhdGEodGFyZ2V0SWQpLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgUmVzb2x2ZVRhcmdldChCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBhY3RvciwgTGlzdDxCYXR0bGVNYWluLkJhdHRsZUVudGl0eT4gZW50aXRpZXMsIFRhcmdldCB0YXJnZXRUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldFR5cGUgPT0gVGFyZ2V0LlNlbGYpIHJldHVybiBhY3RvcjtcclxuICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgdGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgZmxvYXQgbWluRGlzID0gMTA7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlMiBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlMi5EZWFkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rvci5UeXBlICE9IGUyLlR5cGVcclxuICAgICAgICAgICAgICAgICAgICAmJiBlMi5UeXBlICE9IEJhdHRsZU1haW4uRW50aXR5VHlwZS5wYW5lbGVmZmVjdFxyXG4gICAgICAgICAgICAgICAgICAgICYmIGUyLlR5cGUgIT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBib29sIHNhbWVIZWlnaHQgPSBhY3Rvci5wb3MuWSA9PSBlMi5wb3MuWTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNhbWVIZWlnaHQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdCBkaXMgPSBhY3Rvci5wb3MuWCAtIGUyLnBvcy5YO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzIDwgMCkgZGlzICo9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzIDwgbWluRGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EaXMgPSBkaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBlMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwVGFnc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PGludD4gdGFncyA9IG5ldyBMaXN0PGludD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBUYWdzKExpc3Q8aW50PiB0YWdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YWdzLkFkZFJhbmdlKHRhZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBUYWdzKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGFncy5BZGQoaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcFRhZ3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIE1pc2NIYXBwVGFnc3tcclxuICAgICAgICBDaGFuZ2VFbGVtZW50ID0gNTAwLFxyXG4gICAgICAgIERhbWFnZSA9IDUwMSxcclxuICAgICAgICBEZWF0aCA9IDUwMlxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwRGFtYWdlRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXR0bGVNYWluLkVsZW1lbnQgdGFyZ2V0RSwgZGFtYWdlRTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHRhcmdldDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGFtb3VudDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBzdXBlckVmZmVjdGl2ZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBlbGVtZW50YWxCbG9jaztcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBEYW1hZ2VEYXRhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcERhbWFnZURhdGEoQmF0dGxlTWFpbi5FbGVtZW50IHRhcmdldEUsIEJhdHRsZU1haW4uRWxlbWVudCBkYW1hZ2VFLCBpbnQgdGFyZ2V0LCBpbnQgYW1vdW50LCBib29sIHN1cGVyRWZmZWN0aXZlLCBib29sIGVsZW1lbnRhbEJsb2NrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRFID0gdGFyZ2V0RTtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2VFID0gZGFtYWdlRTtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuYW1vdW50ID0gYW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLnN1cGVyRWZmZWN0aXZlID0gc3VwZXJFZmZlY3RpdmU7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudGFsQmxvY2sgPSBlbGVtZW50YWxCbG9jaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBNb3ZlRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgdXNlcjtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHRhcmdldCA9IC0xO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IEJhdHRsZU1haW4uRWxlbWVudC5Ob25lO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcE1vdmVEYXRhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcE1vdmVEYXRhKGludCB1c2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwTW92ZURhdGEoaW50IHVzZXIsIGludCB0YXJnZXQsIEJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwTW92ZW1lbnRGYWlsXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFZlY3RvcjJEIG1vdmVUbztcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBNb3ZlbWVudEZhaWwoVmVjdG9yMkQgbW92ZVRvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlVG8gPSBtb3ZlVG87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcE1vdmVtZW50RmFpbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcEFyZWFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQXJlYSBhcmVhO1xyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRCBvZmZzZXQgPSBuZXcgVmVjdG9yMkQoKTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IG1pcnJvcmluZ1g7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwQXJlYShBcmVhIGFyZWEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSBhcmVhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBBcmVhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEFyZWEoQXJlYSBhcmVhLCBWZWN0b3IyRCBvZmZzZXQsIGludCBtaXJyb3JpbmdYKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIHRoaXMubWlycm9yaW5nWCA9IG1pcnJvcmluZ1g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuRGVidWdFeHRyYTtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5IYXBwc1xyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBDdXJyZW50VGltZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBMaXN0PEhhcHA+IEhhcHBzID0gbmV3IExpc3Q8SGFwcD4oKTtcclxuICAgICAgICBMaXN0PEhhcHBIYW5kbGVyPiBoYW5kbGVycyA9IG5ldyBMaXN0PEhhcHBIYW5kbGVyPigpO1xyXG4gICAgICAgIGludCBsYXRlc3RIYW5kbGVkID0gLTE7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZEhhbmRsZXIoSGFwcEhhbmRsZXIgaGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQoaGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVHJ5SGFuZGxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGxhdGVzdEhhbmRsZWQgIT0gQ3VycmVudFRpbWUpXHJcbiAgICAgICAgICAgICAgICBIYW5kbGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBIYW5kbGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGF0ZXN0SGFuZGxlZCA9IEN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaCBpbiBoYW5kbGVycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IEhhcHBzLkNvdW50IC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGNoZWNrIGFzc3VtZXMgaGFwcHMgYXJlIG9yZGVyZWQgYnkgdGltZSBzdGFtcFxyXG4gICAgICAgICAgICAgICAgICAgIC8vd2hpY2ggdGhleSBzaG91bGQgYmUgYXV0b21hdGljYWxseVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChIYXBwc1tpXS5UaW1lU3RhbXAgIT0gQ3VycmVudFRpbWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWJ1Z0V4LkxvZyhcIkhhcHBlbmluZyBub3QgZXF1YWwgdG8gY3VycmVudCB0aW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBoYXNUYWdzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdGFnc05lZWRlZCBpbiBoLm5lY2Vzc2FyeVRhZ3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUhhcHBzW2ldLkhhc1RhZyh0YWdzTmVlZGVkKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzVGFncyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1RhZ3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWJ1Z0V4LkxvZyhcIkhhcHBlbmluZyBoYW5kbGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoLkhhbmRsZShIYXBwc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlYnVnRXguTG9nKFwiSGFwcGVuaW5nIHRhZyBpcyBkaWZmZXJlbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcCBBZGQoSGFwcCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaC5UaW1lU3RhbXAgPSBDdXJyZW50VGltZTtcclxuICAgICAgICAgICAgSGFwcHMuQWRkKGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gaDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFRpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VycmVudFRpbWUrKztcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBcclxuICAgIHtcclxuICAgICAgICAvL3B1YmxpYyBzdHJpbmcgTWFpblRhZztcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IHRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIGludCBUaW1lU3RhbXA7XHJcbiAgICAgICAgTGlzdDxBdHRyaWJ1dGU+IGF0dHJzID0gbmV3IExpc3Q8QXR0cmlidXRlPigpO1xyXG5cclxuICAgICAgICAvL3B1YmxpYyBIYXBwKElDb252ZXJ0aWJsZSBjKVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vICAgIHRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihjKSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwKG9iamVjdCBtYWluVGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9NYWluVGFnID0gbWFpblRhZy5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICB0YWdzLkFkZChDb252ZXJ0LlRvSW50MzIobWFpblRhZykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEF0dHJpYnV0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IFZhbHVlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgQXR0cmlidXRlIFNldFZhbHVlKGZsb2F0IGYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFZhbHVlID0gZjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBUYWdIb2xkZXIgdGFncyA9IG5ldyBUYWdIb2xkZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwIEFkZEF0dHJpYnV0ZShBdHRyaWJ1dGUgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF0dHJzLkFkZChhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBpbnQgR2V0QXR0cmlidXRlX0ludChpbnQgaW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludClhdHRyc1tpbmRleF0uVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIEhhc1RhZyhpbnQgdGFnc05lZWRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YWdzLkNvbnRhaW5zKHRhZ3NOZWVkZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcEhhbmRsZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IG5lY2Vzc2FyeVRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIEFjdGlvbjxIYXBwPiBIYW5kbGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwSGFuZGxlcihvYmplY3QgbWFpblRhZywgQWN0aW9uPEhhcHA+IGhhbmRsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubmVjZXNzYXJ5VGFncy5BZGQoQ29udmVydC5Ub0ludDMyKG1haW5UYWcpKTtcclxuICAgICAgICAgICAgSGFuZGxlID0gaGFuZGxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGFnSG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8b2JqZWN0PiBUYWdzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBIYXNUYWcob2JqZWN0IHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGFncy5Db250YWlucyh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWRkKG9iamVjdCB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGFncy5BZGQodik7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgTGlzdDxvYmplY3Q+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19UYWdzPW5ldyBMaXN0PG9iamVjdD4oKTt9XHJcblxyXG5cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIElucHV0SG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8SW5wdXQ+IGlucHV0cyA9IG5ldyBMaXN0PElucHV0PigpO1xyXG4gICAgICAgIExpc3Q8SW5wdXRUYWdzPiB0YWdzID0gbmV3IExpc3Q8SW5wdXRUYWdzPigpO1xyXG4gICAgICAgIHB1YmxpYyBJbnB1dCBpbnB1dEZvckNvbmZpcm1hdGlvbjtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBDbGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnB1dHMuQ2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWRkKElucHV0IGlucHV0LCBJbnB1dFRhZ3MgdGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW5wdXRzLkFkZChpbnB1dCk7XHJcbiAgICAgICAgICAgIHRhZ3MuQWRkKHRhZyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBUYWdJcyhpbnQgaTIsIElucHV0VGFncyB0YWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGFncy5Db3VudCA8PSBpMikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGFnc1tpMl0gPT0gdGFnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBDb250YWlucyhJbnB1dCBrZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaSBpbiBpbnB1dHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpLmFyZzEgPT0ga2V5LmFyZzEgJiYgaS50eXBlID09IGtleS50eXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gSW5wdXRUYWdze1xyXG4gICAgICAgIE5PTkUsIE1PVkVGSVgsIE1PVkVVTkZJWCwgTUlTQ1xyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZUNyZWF0b3JQcm9nXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxNb3ZlRGF0YT4gbW92ZURhdGFzID0gbmV3IExpc3Q8TW92ZURhdGE+KCk7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxNb3ZlUmVuZGVyRGF0YT4gbW92ZVJlbmRlcnMgPSBuZXcgTGlzdDxNb3ZlUmVuZGVyRGF0YT4oKTtcclxuICAgICAgICBBcmVhQ3JlYXRpb25VdGlscyBhcmVhVXRpbHMgPSBuZXcgQXJlYUNyZWF0aW9uVXRpbHMoKTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEVDU01hbmFnZXIgZWNzO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZUNyZWF0b3JQcm9nKEVDU01hbmFnZXIgZWNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIE1vdmVEYXRhIGl0ZW0gPSBuZXcgTW92ZURhdGEoXCJcIik7XHJcbiAgICAgICAgICAgIG1vdmVEYXRhcy5BZGQoaXRlbSk7IC8vZG8gbm90aGluZ1xyXG4gICAgICAgICAgICBtb3ZlUmVuZGVycy5BZGQobmV3IE1vdmVSZW5kZXJEYXRhKFwiXCIsIFwiXCIpKTtcclxuICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQoaXRlbSk7XHJcbiAgICAgICAgICAgIEJhc2VVdGlscy5WZWN0b3IyRFtdIGRpcmVjdGlvbnMgPSBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEW10ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIDEpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgtMSwgMCksXHJcbiAgICAgICAgICAgICAgICBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIC0xKSxcclxuICAgICAgICAgICAgICAgIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMSwgMCksIFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzdHJpbmdbXSBtb3ZlTGFiZWxzID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBVcFwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIExlZnRcIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBEb3duXCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgUmlnaHRcIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc3RyaW5nW10gbW92ZUFicmV2ID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiXlwiLFxyXG4gICAgICAgICAgICAgICAgXCI8XCIsXHJcbiAgICAgICAgICAgICAgICBcInZcIixcclxuICAgICAgICAgICAgICAgIFwiPlwiLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGRpcmVjdGlvbnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE5ld01vdmVEYXRhKGxhYmVsOm1vdmVMYWJlbHNbaV0sIGNvbmRpdGlvbjogbmV3IENvbmRpdGlvbihDb25kaXRpb25UeXBlLkNhbk1vdmUsIFRhcmdldC5TZWxmLCBkaXJlY3Rpb25zW2ldKSwgYWN0aW9uOiBuZXcgTW92ZUFjdGlvbihUYXJnZXQuU2VsZiwgZGlyZWN0aW9uc1tpXSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5Nb3ZlbWVudCwgIE1vdmVEYXRhVGFncy5IZXJvSW5pdGlhbCkpO1xyXG4gICAgICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKG5hbWU6bW92ZUxhYmVsc1tpXSwgYWJyZXY6bW92ZUFicmV2W2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkd1blwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgMSwgQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmUpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkd1blwiLCBcIkdcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkZpcmVndW5cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIEJhdHRsZU1haW4uRWxlbWVudC5GaXJlKSwgbmV3IERlYWxEYW1hZ2VBY3Rpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCAxLCBCYXR0bGVNYWluLkVsZW1lbnQuRmlyZSkpLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuU2hvb3QpKTtcclxuICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKFwiRmlyZWd1blwiLCBcIkZHXCIpO1xyXG5cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJJY2VndW5cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIEJhdHRsZU1haW4uRWxlbWVudC5JY2UpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5JY2UpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkljZWd1blwiLCBcIklHXCIpO1xyXG5cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJUaHVuZGVyZ3VuXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKG5ldyBBbmltYXRpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlciksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgMSwgQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIlRodW5kZXJndW5cIiwgXCJUR1wiKTtcclxuXHJcbiAgICAgICAgICAgIEFyZWEgYXJlYSA9IEFyZWFVc2VyKCkuUm93Rm9yd2FyZCh3aWR0aDogMSwgWERpczogMyk7XHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiSWNlYm9tYlwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKGFyZWEsIEJhdHRsZU1haW4uRWxlbWVudC5JY2UpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihhcmVhLCAxLCBCYXR0bGVNYWluLkVsZW1lbnQuSWNlKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5Cb21iKSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkljZWJvbWJcIiwgXCJJQlwiKTtcclxuXHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiVGh1bmRlcmJvbWJcIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihhcmVhLCBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlciksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKGFyZWEsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5Cb21iKSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIlRodW5kZXJib21iXCIsIFwiVEJcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIlN1bW1vblwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihTdW1tb25FbnRpdHkuRW5lbXkoMCwgbmV3IFZlY3RvcjJEKDUsMCkpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlN1bW1vbikpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJTdW1tb25cIiwgXCJTVVwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBpbnQgR2V0TW92ZUlkKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1vdmVEYXRhLkZpbmRCeUxhYmVsKG1vdmVEYXRhcywgdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIEFyZWFDcmVhdGlvblV0aWxzIEFyZWFVc2VyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFyZWFVdGlscy50YXJnZXQgPSBUYXJnZXQuU2VsZjtcclxuICAgICAgICAgICAgcmV0dXJuIGFyZWFVdGlscztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBBcmVhQ3JlYXRpb25VdGlsc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIFRhcmdldCB0YXJnZXQ7XHJcbiAgICAgICAgICAgIGludCBoZWlnaHQgPSAzO1xyXG5cclxuICAgICAgICAgICAgaW50ZXJuYWwgQXJlYSBSb3dGb3J3YXJkKGludCB3aWR0aCwgaW50IFhEaXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciByYSA9IG5ldyBBcmVhKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBpbnQgb2Zmc2V0WSA9IChpbnQpTWF0aC5GbG9vcigoZmxvYXQpaGVpZ2h0IC8gMmYpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmEucG9pbnRzLkFkZChuZXcgVmVjdG9yMkQoaStYRGlzLCBqLW9mZnNldFkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTmV3TW92ZVRleHRSZW5kZXJEYXRhKHN0cmluZyBuYW1lLCBzdHJpbmcgYWJyZXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3ZlUmVuZGVycy5BZGQobmV3IE1vdmVSZW5kZXJEYXRhKG5hbWUsIGFicmV2KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTmV3TW92ZURhdGEoc3RyaW5nIGxhYmVsLCBUaWNrW10gdGlja3MsIG9iamVjdFtdIHRhZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbXYgPSBuZXcgTW92ZURhdGEobGFiZWwpO1xyXG4gICAgICAgICAgICBtdi51bml0cy5BZGRSYW5nZSh0aWNrcyk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG12LnRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQobXYpO1xyXG4gICAgICAgICAgICBtb3ZlRGF0YXMuQWRkKG12KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBOZXdNb3ZlRGF0YShzdHJpbmcgbGFiZWwsIENvbmRpdGlvbiBjb25kaXRpb24sIG9iamVjdCBhY3Rpb24sIG9iamVjdFtdIHRhZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbXYgPSBuZXcgTW92ZURhdGEobGFiZWwpO1xyXG4gICAgICAgICAgICBUaWNrIHRpY2sgPSBuZXcgVGljaygpO1xyXG4gICAgICAgICAgICB0aWNrLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcclxuICAgICAgICAgICAgdGljay50aGluZ3NUb0hhcHBlbi5BZGQoYWN0aW9uKTtcclxuICAgICAgICAgICAgbXYudW5pdHMuQWRkKHRpY2spO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiB0YWdzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtdi50YWdzLkFkZChDb252ZXJ0LlRvSW50MzIoaXRlbSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG12KTtcclxuICAgICAgICAgICAgbW92ZURhdGFzLkFkZChtdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFRpY2tbXSBPbmVUaWNrUGVyQWN0aW9uKHBhcmFtcyBvYmplY3RbXSBhY3Rpb25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGlja1tdIHRpY2tzID0gbmV3IFRpY2tbYWN0aW9ucy5MZW5ndGhdO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRpY2tzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aWNrc1tpXSA9IG5ldyBUaWNrKGFjdGlvbnNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aWNrcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb2JqZWN0W10gVGFnQXJyYXkocGFyYW1zIG9iamVjdFtdIGFyZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJncztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdmVSZW5kZXJEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBMYWJlbDtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEFicmV2O1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVJlbmRlckRhdGEoc3RyaW5nIGxhYmVsLCBzdHJpbmcgYWJyZXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgICAgIHRoaXMuQWJyZXYgPSBhYnJldjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVzY3JpcHRpb24geyBnZXQ7IGludGVybmFsIHNldDsgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guRUNTXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQWNjZXNzb3JcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IExlbmd0aCB7IGdldCB7IHJldHVybiBTZWxlY3RlZEVudGl0aWVzLkNvdW50OyB9IH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVHlwZVtdIFR5cGVzUHJvaGliaXRlZCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIGludGVybmFsIFR5cGVbXSBUeXBlc05lY2Vzc2FyeTtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PEVudGl0eT4gU2VsZWN0ZWRFbnRpdGllcyA9IG5ldyBMaXN0PEVudGl0eT4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIEFjY2Vzc29yKHBhcmFtcyBUeXBlW10gcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR5cGVzTmVjZXNzYXJ5ID0gcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgRW50aXR5QWRkZWQoRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU2VsZWN0ZWRFbnRpdGllcy5Db250YWlucyhlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgR2V0KGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFNlbGVjdGVkRW50aXRpZXNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBRdWlja0FjY2Vzc29yT25lPFQxPlxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgUXVpY2tBY2Nlc3Nvck9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhY2Nlc3NvciA9IG5ldyBBY2Nlc3Nvcih0eXBlb2YoVDEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIEFjY2Vzc29yIGFjY2Vzc29yO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgQ291bnQgeyBnZXQgeyByZXR1cm4gYWNjZXNzb3IuTGVuZ3RoOyB9IH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIFQxIENvbXAxKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXNbaV0uR2V0Q29tcG9uZW50PFQxPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBFbnRpdHkoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllc1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xhc3MgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+IFxyXG4gICAge1xyXG5cclxuICAgICAgICBpbnRlcm5hbCBBY2Nlc3NvciBhY2Nlc3NvcjtcclxuICAgICAgICBwdWJsaWMgaW50IExlbmd0aCB7IGdldCB7IHJldHVybiBhY2Nlc3Nvci5MZW5ndGg7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgVDEgQ29tcDEoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllc1tpXS5HZXRDb21wb25lbnQ8VDE+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IEVudGl0eShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFF1aWNrQWNjZXNzb3JUd28oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWNjZXNzb3IgPSBuZXcgQWNjZXNzb3IodHlwZW9mKFQxKSwgdHlwZW9mKFQyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIFQyIENvbXAyKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXNbaV0uR2V0Q29tcG9uZW50PFQyPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkVDU1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ2xvbmVkU3RhdGVcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPiBjb21wcyA9IG5ldyBEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPigpO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkVDU1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRUNTTWFuYWdlclxyXG4gICAge1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBFQ1NNYW5hZ2VyW10gbWFuYWdlcnMgPSBuZXcgRUNTTWFuYWdlclsyMF07XHJcbiAgICAgICAgRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4gY29tcHMgPSBuZXcgRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4oKTtcclxuICAgICAgICBwcml2YXRlIGludCBFQ1NJZDtcclxuICAgICAgICBpbnQgZW50aXR5SWRNYXggPSAtMTtcclxuICAgICAgICBMaXN0PEFjY2Vzc29yPiBhY2Nlc3NvcnMgPSBuZXcgTGlzdDxBY2Nlc3Nvcj4oKTtcclxuXHJcbiAgICAgICAgRGljdGlvbmFyeTxUeXBlLCBBY3Rpb248T2JqZWN0LCBPYmplY3Q+PiBDb3B5TWV0aG9kcyA9IG5ldyBEaWN0aW9uYXJ5PFR5cGUsIEFjdGlvbjxvYmplY3QsIG9iamVjdD4+KCk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgRUNTTWFuYWdlcigpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHJvY2Vzc29yQWNjZXNzb3IgQ3JlYXRlUHJvY2Vzc29yKEFjY2Vzc29yIGFjY2Vzc29yLCBBY3Rpb248QWNjZXNzb3I+IGFjdGlvbilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb2Nlc3NvckFjY2Vzc29yKGFjdGlvbiwgYWNjZXNzb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkQ29weU1ldGhvZChUeXBlIHR5cGUsIEFjdGlvbjxvYmplY3QsIG9iamVjdD4gY29weU1ldGhvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29weU1ldGhvZHMuQWRkKHR5cGUsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248b2JqZWN0LCBvYmplY3Q+KWNvcHlNZXRobyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQWNjZXNzb3IgQ3JlYXRlQWNjZXNzb3IoVHlwZVtdIG5lY2Vzc2FyeSwgVHlwZVtdIG5vdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBhY2MgPSBuZXcgQWNjZXNzb3IobmVjZXNzYXJ5KTtcclxuICAgICAgICAgICAgYWNjLlR5cGVzUHJvaGliaXRlZCA9IG5vdDtcclxuICAgICAgICAgICAgQWRkQWNjZXNzb3IoYWNjKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+IFF1aWNrQWNjZXNzb3IyPFQxLCBUMj4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+IGFjY2Vzc29yID0gbmV3IFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPigpO1xyXG4gICAgICAgICAgICBBZGRBY2Nlc3NvcihhY2Nlc3Nvci5hY2Nlc3Nvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3NvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBRdWlja0FjY2Vzc29yT25lPFQxPiBRdWlja0FjY2Vzc29yMTxUMT4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUXVpY2tBY2Nlc3Nvck9uZTxUMT4gYWNjZXNzb3IgPSBuZXcgUXVpY2tBY2Nlc3Nvck9uZTxUMT4oKTtcclxuICAgICAgICAgICAgQWRkQWNjZXNzb3IoYWNjZXNzb3IuYWNjZXNzb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3I7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAjcmVnaW9uIHN0YXRpYyBtZXRob2RzXHJcblxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdGF0aWMgRUNTTWFuYWdlciBHZXRJbnN0YW5jZShFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYW5hZ2Vyc1tlLmVjc107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEVDU01hbmFnZXIgQ3JlYXRlKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IG1hbmFnZXJzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFuYWdlcnNbaV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtYW5hZ2Vyc1tpXSA9IG5ldyBFQ1NNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFuYWdlcnNbaV0uRUNTSWQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYW5hZ2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IENyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQob2JqZWN0IHYpXHJcbiAgICAgICAge1xyXG5FbnRpdHkgZTtcbiAgICAgICAgICAgIENyZWF0ZUVudGl0eShvdXQgZSk7XHJcbiAgICAgICAgICAgIEFkZENvbXBvbmVudChlLCB2KTtcclxuICAgICAgICAgICAgcmV0dXJuIGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IENyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQob2JqZWN0IHYsIG9iamVjdCB2MilcclxuICAgICAgICB7XHJcbkVudGl0eSBlO1xuICAgICAgICAgICAgQ3JlYXRlRW50aXR5KG91dCBlKTtcclxuICAgICAgICAgICAgQWRkQ29tcG9uZW50KGUsIHYpO1xyXG4gICAgICAgICAgICBBZGRDb21wb25lbnQoZSwgdjIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgQ3JlYXRlRW50aXR5KG91dCBFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVudGl0eUlkTWF4Kys7XHJcbiAgICAgICAgICAgIEVudGl0eSBlbnRpdHkgPSBuZXcgRW50aXR5KHRoaXMuRUNTSWQsIGVudGl0eUlkTWF4KTtcclxuICAgICAgICAgICAgZSA9IGVudGl0eTtcclxuICAgICAgICAgICAgcmV0dXJuIGVudGl0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgQ3JlYXRlRW50aXR5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVudGl0eUlkTWF4Kys7XHJcbiAgICAgICAgICAgIEVudGl0eSBlbnRpdHkgPSBuZXcgRW50aXR5KHRoaXMuRUNTSWQsIGVudGl0eUlkTWF4KTtcclxuICAgICAgICAgICAgcmV0dXJuIGVudGl0eTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgUHJvY2Vzc29yRmxleDxUMSwgVDI+IFF1aWNrUHJvY2Vzc29yRmxleDxUMSwgVDI+KEFjdGlvbjxRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4+IHApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQcm9jZXNzb3JGbGV4PFQxLCBUMj4gcHJvY2Vzc29yRmxleCA9IG5ldyBQcm9jZXNzb3JGbGV4PFQxLCBUMj4ocCk7XHJcbiAgICAgICAgICAgIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBhY2Nlc3NvciA9IHByb2Nlc3NvckZsZXguYWNjZXNzb3I7XHJcbiAgICAgICAgICAgIEFjY2Vzc29yIGFjY2Vzc29yMSA9IGFjY2Vzc29yLmFjY2Vzc29yO1xyXG4gICAgICAgICAgICBBZGRBY2Nlc3NvcihhY2Nlc3NvcjEpO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzc29yRmxleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZGRBY2Nlc3NvcihBY2Nlc3NvciBhY2Nlc3NvcjEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhY2Nlc3NvcnMuQWRkKGFjY2Vzc29yMSk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDw9IGVudGl0eUlkTWF4OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVwZGF0ZUFjY2Vzc29yRW50aXR5KGFjY2Vzc29yMSwgaSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlQWNjZXNzb3JFbnRpdHkoQWNjZXNzb3IgYWNjZXNzb3IsIGludCBlbnRpdHlJZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVudGl0eSBlbnRpdHkgPSBuZXcgRW50aXR5KEVDU0lkLCBlbnRpdHlJZCk7XHJcbiAgICAgICAgICAgIGJvb2wgYmVsb25nID0gSGFzQWxsQ29tcHMoYWNjZXNzb3IuVHlwZXNOZWNlc3NhcnksIGVudGl0eUlkKSAmJiBIYXNOb25lT2ZUaGVzZUNvbXBzKGFjY2Vzc29yLlR5cGVzUHJvaGliaXRlZCwgZW50aXR5SWQpO1xyXG4gICAgICAgICAgICBib29sIG1lbWJlciA9IGFjY2Vzc29yLkVudGl0eUFkZGVkKGVudGl0eSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYmVsb25nICE9IG1lbWJlcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJlbG9uZylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzLkFkZChlbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJSRU1PVkVEIEVOVElUWSBcIithY2Nlc3Nvci5UeXBlc05lY2Vzc2FyeVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllcy5SZW1vdmUoZW50aXR5KTtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKGFjY2Vzc29yLkVudGl0eUFkZGVkKGVudGl0eSkrXCIgQkVMT05HXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQ2xvbmVTdGF0ZShDbG9uZWRTdGF0ZSBjcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjb21wcyA9IHRoaXMuY29tcHM7XHJcbiAgICAgICAgICAgIERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+IGNvbXBzMiA9IGNzLmNvbXBzO1xyXG4gICAgICAgICAgICBDb3B5KGNvbXBzLCBjb21wczIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVzdG9yZVN0YXRlKENsb25lZFN0YXRlIGNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNvbXBzID0gdGhpcy5jb21wcztcclxuICAgICAgICAgICAgRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4gY29tcHMyID0gY3MuY29tcHM7XHJcbiAgICAgICAgICAgIENvcHkoY29tcHMyLCBjb21wcyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8PVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGVudGl0eUlkTWF4OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGFjY2Vzc29ycylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBVcGRhdGVBY2Nlc3NvckVudGl0eShpdGVtLCBpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIExpc3Q8VHlwZT4gYXV4ID0gbmV3IExpc3Q8VHlwZT4oKTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENvcHkoRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4gZnJvbSwgRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4gdG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhdXguQ2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjIGluIGZyb20pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFR5cGUgdHlwZSA9IGMuS2V5O1xyXG4gICAgICAgICAgICAgICAgYXV4LkFkZCh0eXBlKTtcclxuICAgICAgICAgICAgICAgIGlmICghdG8uQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG8uQWRkKHR5cGUsIG5ldyBvYmplY3RbMzAwXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9BcnJheSA9IHRvW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbiA9IGMuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBDb3B5KHRvLCB0eXBlLCB0b0FycmF5LCBvcmlnaW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjIGluIHRvKSAvL2NoZWNrcyB0eXBlcyBpbiB0bywgc28gaXQgY2FuIGJlIHRocm91Z2hcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVHlwZSB0eXBlID0gYy5LZXk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWF1eC5Db250YWlucyh0eXBlKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXguQWRkKHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b0FycmF5ID0gYy5WYWx1ZTsgLy9hY2Nlc3MgaW52ZXJ0ZWQgd2hlbiBjb21wYXJlZCB0byBwcmV2aW91c1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIG9yaWdpbiA9IGZyb21bdHlwZV07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0b0FycmF5Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9BcnJheVtpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJSZW1vdmluZyBlbnRpdHlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDb3B5KERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+IHRvLCBUeXBlIHR5cGUsIG9iamVjdFtdIHRvQXJyYXksIG9iamVjdFtdIG9yaWdpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFjdGlvbjxPYmplY3QsIE9iamVjdD4gY29weU1ldGhvZCA9IG51bGw7XHJcbiAgICAgICAgICAgIENvcHlNZXRob2RzLlRyeUdldFZhbHVlKHR5cGUsIG91dCBjb3B5TWV0aG9kKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgb3JpZ2luLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luW2ldID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvQXJyYXlbaV0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJSZW1vdmluZyBlbnRpdHlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvQXJyYXlbaV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZSh0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodG9BcnJheVtpXSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0FycmF5W2ldID0gQWN0aXZhdG9yLkNyZWF0ZUluc3RhbmNlKHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvcHlNZXRob2QgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29weU1ldGhvZChvcmlnaW5baV0sIHRvQXJyYXlbaV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL0RlZXBDbG9uZUhlbHBlci5EZWVwQ29weVBhcnRpYWwob3JpZ2luW2ldLCB0b0FycmF5W2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVCBBZGRDb21wb25lbnQ8VD4oRW50aXR5IGUpIHdoZXJlIFQgOiBuZXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVCB0ID0gbmV3IFQoKTtcclxuICAgICAgICAgICAgQWRkQ29tcG9uZW50KGUsIHQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRDb21wb25lbnQoRW50aXR5IGUsIG9iamVjdCB0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVHlwZSB0eXBlID0gdC5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIGlmICghY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbXBzLkFkZCh0eXBlLCBuZXcgb2JqZWN0WzMwMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbXBzW3R5cGVdW2UuaWRdID0gdDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYWNjZXNzb3JzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVBY2Nlc3NvckVudGl0eShpdGVtLCBlLmlkKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlbW92ZUNvbXBvbmVudChFbnRpdHkgZSwgb2JqZWN0IHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUeXBlIHR5cGUgPSB0LkdldFR5cGUoKTtcclxuICAgICAgICAgICAgaWYgKCFjb21wcy5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29tcHMuQWRkKHR5cGUsIG5ldyBvYmplY3RbMzAwXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29tcHNbdHlwZV1bZS5pZF0gPSBudWxsO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBhY2Nlc3NvcnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVwZGF0ZUFjY2Vzc29yRW50aXR5KGl0ZW0sIGUuaWQpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIEhhc0FsbENvbXBvbmVudHMoRW50aXR5IGUsIFR5cGVbXSB0eXBlc05lY2Vzc2FyeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBpZCA9IGUuaWQ7XHJcbiAgICAgICAgICAgIHJldHVybiBIYXNBbGxDb21wcyh0eXBlc05lY2Vzc2FyeSwgaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIEhhc0FsbENvbXBzKFR5cGVbXSB0eXBlc05lY2Vzc2FyeSwgaW50IGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHR5cGUgaW4gdHlwZXNOZWNlc3NhcnkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb21wc1t0eXBlXVtpZF0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgSGFzTm9uZU9mVGhlc2VDb21wcyhUeXBlW10gdHlwZXNQcm9oaWJpdGVkLCBpbnQgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodHlwZXNQcm9oaWJpdGVkID09IG51bGwpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdHlwZSBpbiB0eXBlc1Byb2hpYml0ZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wcy5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcHNbdHlwZV1baWRdICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIFQgR2V0Q29tcG9uZW50PFQ+KEVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVHlwZSB0eXBlID0gdHlwZW9mKFQpO1xyXG4gICAgICAgICAgICBpZiAoIWNvbXBzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbXBzLkFkZCh0eXBlLCBuZXcgb2JqZWN0WzMwMF0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHQoVCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChUKWNvbXBzW3R5cGVdW2UuaWRdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guRUNTXHJcbntcclxuICAgIHB1YmxpYyBzdHJ1Y3QgRW50aXR5IDogSUVxdWF0YWJsZTxFbnRpdHk+XHJcbiAgICB7XHJcbiAgICAgICAgcmVhZG9ubHkgaW50ZXJuYWwgaW50IGVjcztcclxuICAgICAgICByZWFkb25seSBpbnRlcm5hbCBpbnQgaWQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkoaW50IGVjcywgaW50IGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhFbnRpdHkgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gb3RoZXIuaWQgPT0gdGhpcy5pZCAmJiBvdGhlci5lY3MgPT0gdGhpcy5lY3M7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBFeHRlbnNpb25NZXRob2RzXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZW1vdmVDb21wb25lbnQodGhpcyBFbnRpdHkgZSwgb2JqZWN0IGNvbXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFQ1NNYW5hZ2VyLkdldEluc3RhbmNlKGUpLlJlbW92ZUNvbXBvbmVudChlLCBjb21wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBBZGRDb21wb25lbnQ8VD4odGhpcyBFbnRpdHkgZSkgd2hlcmUgVDogbmV3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBFQ1NNYW5hZ2VyLkdldEluc3RhbmNlKGUpLkFkZENvbXBvbmVudDxUPihlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEFkZENvbXBvbmVudCh0aGlzIEVudGl0eSBlLCBvYmplY3QgY29tcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVDU01hbmFnZXIuR2V0SW5zdGFuY2UoZSkuQWRkQ29tcG9uZW50KGUsIGNvbXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgR2V0Q29tcG9uZW50PFQ+KHRoaXMgRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRUNTTWFuYWdlci5HZXRJbnN0YW5jZShlKS5HZXRDb21wb25lbnQ8VD4oZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIFByb2Nlc3NvckZsZXg8VDEsIFQyPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgQWN0aW9uPFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPj4gcDtcclxuICAgICAgICBpbnRlcm5hbCBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4gYWNjZXNzb3I7XHJcblxyXG4gICAgICAgIHB1YmxpYyBQcm9jZXNzb3JGbGV4KEFjdGlvbjxRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4+IHApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnAgPSBwO1xyXG4gICAgICAgICAgICBhY2Nlc3NvciA9IG5ldyBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJ1bigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwKGFjY2Vzc29yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFByb2Nlc3NvckFjY2Vzc29yXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBBY3Rpb248QWNjZXNzb3I+IHA7XHJcblxyXG4gICAgICAgIEFjY2Vzc29yIGE7XHJcblxyXG4gICAgICAgIHB1YmxpYyBQcm9jZXNzb3JBY2Nlc3NvcihBY3Rpb248QWNjZXNzb3I+IHAsIEFjY2Vzc29yIGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnAgPSBwO1xyXG4gICAgICAgICAgICB0aGlzLmEgPSBhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUnVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHAoYSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0V29ybGRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZSBwYWxldHRlID0gRGVmYXVsdFBhbGV0dGVzLkM0S2lyb0themU7XHJcbiAgICAgICAgTGlzdDxUZXh0RW50aXR5PiBhY3RpdmVBZ2VudHMgPSBuZXcgTGlzdDxUZXh0RW50aXR5PigpO1xyXG4gICAgICAgIExpc3Q8VGV4dEVudGl0eT4gZnJlZUJvYXJkcyA9IG5ldyBMaXN0PFRleHRFbnRpdHk+KCk7XHJcbiAgICAgICAgTGlzdDxUZXh0QW5pbWF0aW9uPiBhbmltYXRpb25zID0gbmV3IExpc3Q8VGV4dEFuaW1hdGlvbj4oKTtcclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIG1haW5Cb2FyZDtcclxuICAgICAgICBpbnQgbGF0ZXN0SWQgPSAtMTtcclxuXHJcbiAgICAgICAgcHVibGljIFQgQWRkQW5pbWF0aW9uPFQ+KFQgdGEpIHdoZXJlIFQgOiBUZXh0QW5pbWF0aW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhbmltYXRpb25zLkFkZCh0YSk7XHJcbiAgICAgICAgICAgIHRhLlJlZ2lzdGVyTGlzdHMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdChpbnQgd2lkdGgsIGludCBoZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtYWluQm9hcmQgPSBuZXcgVGV4dEJvYXJkKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWFpbkJvYXJkLlJlc2V0KCk7XHJcbiAgICAgICAgICAgIERyYXdDaGlsZHJlbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0NoaWxkcmVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgYWN0aXZlQWdlbnRzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUFnZW50c1tpXS5SZXNldEFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFuaW0gaW4gYW5pbWF0aW9ucylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltLk1vZGlmeShhY3RpdmVBZ2VudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUFnZW50c1tpXS5mcmVlSWZJZGxlICYmICFhY3RpdmVBZ2VudHNbaV0uYW5pbWF0aW5nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZyZWVCb2FyZHMuQWRkKGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlQWdlbnRzLlJlbW92ZShhY3RpdmVBZ2VudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtYWluQm9hcmQuSW5zZXJ0KGFjdGl2ZUFnZW50c1tpXS5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRFbnRpdHkgR2V0RnJlZUVudGl0eShpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0RW50aXR5IHRlO1xyXG4gICAgICAgICAgICBpZiAoZnJlZUJvYXJkcy5Db3VudCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRlID0gZnJlZUJvYXJkc1tmcmVlQm9hcmRzLkNvdW50IC0gMV07XHJcbiAgICAgICAgICAgICAgICBmcmVlQm9hcmRzLlJlbW92ZUF0KGZyZWVCb2FyZHMuQ291bnQgLSAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRlID0gbmV3IFRleHRFbnRpdHkoKTtcclxuICAgICAgICAgICAgICAgIHRlLmlkID0gKytsYXRlc3RJZDtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFjdGl2ZUFnZW50cy5BZGQodGUpO1xyXG4gICAgICAgICAgICB0ZS5mcmVlSWZJZGxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRlLlNldFNpemUodywgaCk7XHJcbiAgICAgICAgICAgIHRlLlJlc2V0RnVsbCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEVudGl0eSBHZXRUZW1wRW50aXR5KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0ZSA9IEdldEZyZWVFbnRpdHkodywgaCk7XHJcbiAgICAgICAgICAgIHRlLmZyZWVJZklkbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZHZhbmNlVGltZShmbG9hdCB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFuaW0gaW4gYW5pbWF0aW9ucylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYW5pbS5VcGRhdGUodik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFRyeUVuZEFuaW1hdGlvbnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFuaW0gaW4gYW5pbWF0aW9ucylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYW5pbS5UcnlFbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBGcmVlKExpc3Q8VGV4dEVudGl0eT4gZW50aXRpZXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZnJlZUJvYXJkcy5BZGRSYW5nZShlbnRpdGllcyk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVBZ2VudHMuUmVtb3ZlKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0RvbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFuaW0gaW4gYW5pbWF0aW9ucylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhbmltLklzRG9uZSgpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0RW50aXR5XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBpZDtcclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIE9yaWdpbjtcclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEFuaW1hdGlvbjtcclxuICAgICAgICBwdWJsaWMgYm9vbCBmcmVlSWZJZGxlID0gZmFsc2U7XHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBhbmltYXRpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSGVpZ2h0IHsgZ2V0IHsgcmV0dXJuIE9yaWdpbi5IZWlnaHQ7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgV2lkdGggeyBnZXQgeyByZXR1cm4gT3JpZ2luLldpZHRoOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRBbmltYXRpb24uQmFzZURhdGEgQW5pbUJhc2UoZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUZXh0QW5pbWF0aW9uLkJhc2VEYXRhKGxlbmd0aCwgMCwgaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVmVjdG9yMkQgR2V0UG9zaXRpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9yaWdpbi5Qb3NpdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXRBbmltYXRpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEFuaW1hdGlvbi5TZXQoT3JpZ2luKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXRGdWxsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9yaWdpbi5SZXNldEludmlzaWJsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRQb3NpdGlvbihpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcmlnaW4uUG9zaXRpb24gPSBuZXcgVmVjdG9yMkQoeCx5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0UG9zaXRpb24oVmVjdG9yMkQgdmVjdG9yMkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcmlnaW4uUG9zaXRpb24gPSB2ZWN0b3IyRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0U2l6ZShpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoT3JpZ2luID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE9yaWdpbiA9IG5ldyBUZXh0Qm9hcmQodywgaCk7XHJcbiAgICAgICAgICAgICAgICBBbmltYXRpb24gPSBuZXcgVGV4dEJvYXJkKHcsIGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9yaWdpbi5SZXNpemUodywgaCk7XHJcbiAgICAgICAgICAgIEFuaW1hdGlvbi5SZXNpemUodywgaCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgRGVsYXlzQW5pbWF0aW9uIDogVGV4dEFuaW1hdGlvblxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFJlcXVlc3RSZWdpc3Rlckxpc3RzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBEZWxheShmbG9hdCB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkKG5ldyBCYXNlRGF0YSh2LCAwLCAtMSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIFBvc2l0aW9uQW5pbWF0aW9uIDogVGV4dEFuaW1hdGlvbjxQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGE+XHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgUG9zaXRpb25EYXRhIG1haW5EYXRhLCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Nb2RpZnkoZW50aXR5LCBtYWluRGF0YSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZCB0YXJnZXQgPSBlbnRpdHkuQW5pbWF0aW9uO1xyXG4gICAgICAgICAgICBpZiAobWFpbkRhdGEucGVybWFuZW50KVxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gZW50aXR5Lk9yaWdpbjtcclxuICAgICAgICAgICAgdGFyZ2V0LlBvc2l0aW9uID0gVmVjdG9yMkQuSW50ZXJwb2xhdGVSb3VuZGVkKG1haW5EYXRhLnN0YXJ0UG9zaXRpb24sIG1haW5EYXRhLmVuZFBvc2l0aW9uLCBwcm9ncmVzcyAvIGxlbmd0aCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBQb3NpdGlvbkRhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBib29sIHBlcm1hbmVudDtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIFBvc2l0aW9uRGF0YShWZWN0b3IyRCBzdGFydFBvc2l0aW9uLCBWZWN0b3IyRCBlbmRQb3NpdGlvbiwgYm9vbCBwZXJtID0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZFBvc2l0aW9uID0gZW5kUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcm1hbmVudCA9IHBlcm07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFRleHRBbmltYXRpb248VD4gOiBUZXh0QW5pbWF0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIExpc3Q8VD4gbWFpbkRhdGEgPSBuZXcgTGlzdDxUPigpO1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFJlcXVlc3RSZWdpc3Rlckxpc3RzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuUmVnaXN0ZXJMaXN0KG1haW5EYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChCYXNlRGF0YSBiYXNlRGF0YSwgVCBtYWluRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuQWRkKGJhc2VEYXRhKTtcclxuICAgICAgICAgICAgbWFpbkRhdGEuQWRkKG1haW5EKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgaW50IGluZGV4LCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGFbaW5kZXhdLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBUIG1haW5EYXRhLCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW50ZXJuYWwgb3ZlcnJpZGUgdm9pZCBFeGVjdXRlKGludCBpbmRleCwgQmFzZURhdGEgYmFzZURhdGEpXHJcbiAgICAgICAgLy97XHJcbiAgICAgICAgLy8gICAgdGhpcy5FeGVjdXRlKG1haW5EYXRhW2luZGV4XSwgYmFzZURhdGEpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL3B1YmxpYyBhYnN0cmFjdCB2b2lkIEV4ZWN1dGUoVCBtYWluRGF0YSwgQmFzZURhdGEgYmFzZURhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBUZXh0QW5pbWF0aW9uXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgQmFzZURhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBsZW5ndGg7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBwcm9ncmVzcztcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCB0YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQmFzZURhdGEoZmxvYXQgbGVuZ3RoLCBmbG9hdCBwcm9ncmVzcywgaW50IHRhcmdldClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBMaXN0PGZsb2F0PiBsZW5ndGggPSBuZXcgTGlzdDxmbG9hdD4oKTtcclxuICAgICAgICBMaXN0PGZsb2F0PiBwcm9ncmVzcyA9IG5ldyBMaXN0PGZsb2F0PigpO1xyXG4gICAgICAgIExpc3Q8aW50PiB0YXJnZXRzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIExpc3Q8SUxpc3Q+IGxpc3RzID0gbmV3IExpc3Q8SUxpc3Q+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyTGlzdHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKGxlbmd0aCk7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZChwcm9ncmVzcyk7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZCh0YXJnZXRzKTtcclxuICAgICAgICAgICAgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCB2b2lkIFJlcXVlc3RSZWdpc3Rlckxpc3RzKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgcHJvZ3Jlc3MuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NbaV0gKz0gZGVsdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NbaV0gPj0gbGVuZ3RoW2ldKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzW2ldID0gbGVuZ3RoW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vRXhlY3V0ZShpLCBuZXcgQmFzZURhdGEobGVuZ3RoW2ldLHByb2dyZXNzW2ldLCB0YXJnZXRzW2ldKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW50ZXJuYWwgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKGludCBpbmRleCwgQmFzZURhdGEgYmFzZURhdGEpO1xyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkZChCYXNlRGF0YSBiZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb2dyZXNzLkFkZChiZC5wcm9ncmVzcyk7XHJcbiAgICAgICAgICAgIHRhcmdldHMuQWRkKGJkLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGxlbmd0aC5BZGQoYmQubGVuZ3RoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBsaXN0cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uQ291bnQgIT0gcHJvZ3Jlc3MuQ291bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHMuVHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9ncmVzcy5Db3VudCA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBFbmRUYXNrKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGwgaW4gbGlzdHMpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlZ2lzdGVyTGlzdChJTGlzdCBtYWluRGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZChtYWluRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHByb2dyZXNzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChhLmlkID09IHRhcmdldHNbaV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW9kaWZ5KGEsIGksIHByb2dyZXNzW2ldLCBsZW5ndGhbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGEuYW5pbWF0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIGludCBpbmRleCwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFRyeUVuZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHByb2dyZXNzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc1tpXSA+PSBsZW5ndGhbaV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5kVGFzayhpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFBhbGV0dGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nW10gSHRtbENvbG9ycztcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlKHBhcmFtcyBzdHJpbmdbXSBjb2xvcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIdG1sQ29sb3JzID0gY29sb3JzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgRGVmYXVsdFBhbGV0dGVzXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQYWxldHRlIEM0S2lyb0themUgPSBuZXcgUGFsZXR0ZShcIiMzMzJjNTBcIiwgXCIjNDY4NzhmXCIsIFwiIzk0ZTM0NFwiLCBcIiNlMmYzZTRcIik7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQYWxldHRlIEM0UmVhZGVyID0gbmV3IFBhbGV0dGUoXCIjMjYyNjI2XCIsIFwiIzhiOGNiYVwiLCBcIiM4YmJhOTFcIiwgXCIjNjQ5ZjhkXCIpO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUGFsZXR0ZSBDNE5vdmVsID0gbmV3IFBhbGV0dGUoXCIjMjYyNjI2XCIsIFwiIzM0MmQ0MVwiLCBcIiNiOGI4YjhcIiwgXCIjOGI4Y2JhXCIpO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRCbGFjayA9IDA7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBDNEJsYWNrTmV1dHJhbCA9IDE7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBDNFdoaXRlTmV1dHJhbCA9IDI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBDNFdoaXRlID0gMztcclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuXHJcbntcclxuICAgIHB1YmxpYyBzdHJ1Y3QgTW91c2VIb3ZlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBSZWN0IHJlY3Q7XHJcbiAgICAgICAgcHVibGljIGludCB0eXBlO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgaWQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUhvdmVyKFJlY3QgcmVjdCwgaW50IHR5cGUsIGludCBpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdXNlSG92ZXJNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8TW91c2VIb3Zlcj4gbW91c2VIb3ZlcnMgPSBuZXcgTGlzdDxNb3VzZUhvdmVyPigpO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PE1vdXNlSG92ZXI+IG1vdXNlSG92ZXJzQWN0aXZlID0gbmV3IExpc3Q8TW91c2VIb3Zlcj4oKTtcclxuICAgICAgICBwdWJsaWMgTW91c2VJTyBtb3VzZUlPO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW91c2VIb3Zlck1hbmFnZXIoTW91c2VJTyBtb3VzZUlPKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZUlPID0gbW91c2VJTztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3VzZUhvdmVyc0FjdGl2ZS5DbGVhcigpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBtb3VzZUhvdmVycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ucmVjdC5Db250YWlucyhtb3VzZUlPLnBvcykpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2VIb3ZlcnNBY3RpdmUuQWRkKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlblxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVW5pY29kZVJlbWFwXHJcbiAgICB7XHJcblxyXG4gICAgICAgIERpY3Rpb25hcnk8aW50LCBpbnQ+IHJlbWFwcyA9IG5ldyBEaWN0aW9uYXJ5PGludCwgaW50PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgVW5pY29kZVJlbWFwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlbWFwcy5BZGQoVW5pY29kZS5rZXlVcCwgJ3cnKTtcclxuICAgICAgICAgICAgcmVtYXBzLkFkZChVbmljb2RlLmtleURvd24sICdzJyk7XHJcbiAgICAgICAgICAgIHJlbWFwcy5BZGQoVW5pY29kZS5rZXlMZWZ0LCAnYScpO1xyXG4gICAgICAgICAgICByZW1hcHMuQWRkKFVuaWNvZGUua2V5UmlnaHQsICdkJyk7XHJcblxyXG4gICAgICAgICAgICByZW1hcHMuQWRkKCdpJywgJzEnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFJlbWFwKGludCB1bmljb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHJlc3VsdDtcclxuICAgICAgICAgICAgaWYgKHJlbWFwcy5UcnlHZXRWYWx1ZSh1bmljb2RlLCBvdXQgcmVzdWx0KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdW5pY29kZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0Qm9hcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBOT0NIQU5HRUNIQVIgPSAoY2hhcikxO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIElOVklTSUJMRUNIQVIgPSAoY2hhcikyO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgTk9DSEFOR0VDT0xPUiA9IC0yO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgSU5WSVNJQkxFQ09MT1IgPSAtMTtcclxuICAgICAgICBjaGFyWyxdIGNoYXJzO1xyXG4gICAgICAgIHB1YmxpYyBpbnRbLF0gVGV4dENvbG9yIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnRbLF0gQmFja0NvbG9yIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIC8vU3RyaW5nQnVpbGRlciBzdHJpbmdCdWlsZGVyID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgICAgICBpbnQgY3Vyc29yWCA9IDA7XHJcbiAgICAgICAgaW50IGN1cnNvclkgPSAwO1xyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRCBQb3NpdGlvbiB7IGdldDsgc2V0OyB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkKGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vU2V0TWF4U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgUmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd09uQ2VudGVyKHN0cmluZyBtZXNzYWdlLCBpbnQgY29sb3IsIGludCB4T2ZmID0gMCwgaW50IHlPZmYgPSAwLCBib29sIGFsaWduU3RyaW5nID0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB4ID0gKFdpZHRoKSAvIDI7XHJcbiAgICAgICAgICAgIGlmIChhbGlnblN0cmluZykgeCAtPSBtZXNzYWdlLkxlbmd0aCAvIDI7XHJcbiAgICAgICAgICAgIGludCB5ID0gSGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgRHJhdyhtZXNzYWdlLCB4ICsgeE9mZiwgeSArIHlPZmYsIGNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdPbkNlbnRlckhvcml6b250YWwoc3RyaW5nIG1lc3NhZ2UsIGludCBjb2xvciwgaW50IHhPZmYgPSAwLCBpbnQgeSA9IDAsIGJvb2wgYWxpZ25TdHJpbmcgPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHggPSAoV2lkdGgpIC8gMjtcclxuICAgICAgICAgICAgaWYgKGFsaWduU3RyaW5nKSB4IC09IG1lc3NhZ2UuTGVuZ3RoIC8gMjtcclxuICAgICAgICAgICAgRHJhdyhtZXNzYWdlLCB4ICsgeE9mZiwgeSwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBTZXRNYXhTaXplKGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoYXJzID0gbmV3IGNoYXJbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgICAgIFRleHRDb2xvciA9IG5ldyBpbnRbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgICAgIEJhY2tDb2xvciA9IG5ldyBpbnRbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoJyAnLCAwLCAwLCBXaWR0aCwgSGVpZ2h0LCAwLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0SW52aXNpYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChJTlZJU0lCTEVDSEFSLCAwLCAwLCBXaWR0aCwgSGVpZ2h0LCBJTlZJU0lCTEVDT0xPUiwgSU5WSVNJQkxFQ09MT1IpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgV2lkdGggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluc2VydChUZXh0Qm9hcmQgc2Vjb25kQm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHNlY29uZEJvYXJkLldpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgc2Vjb25kQm9hcmQuSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHggPSAoaW50KXNlY29uZEJvYXJkLlBvc2l0aW9uLlggKyBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB5ID0gKGludClzZWNvbmRCb2FyZC5Qb3NpdGlvbi5ZICsgajtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4ID49IFdpZHRoIHx8IHkgPj0gSGVpZ2h0KSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuY2hhcnNbaSwgal0gIT0gSU5WSVNJQkxFQ0hBUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbeCwgeV0gPSBzZWNvbmRCb2FyZC5jaGFyc1tpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuVGV4dENvbG9yW2ksIGpdICE9IElOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Q29sb3JbeCwgeV0gPSBzZWNvbmRCb2FyZC5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZEJvYXJkLkJhY2tDb2xvcltpLCBqXSAhPSBJTlZJU0lCTEVDT0xPUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmFja0NvbG9yW3gsIHldID0gc2Vjb25kQm9hcmQuQmFja0NvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIERyYXdSZWN0KGNoYXIgYywgaW50IHgsIGludCB5LCBpbnQgdywgaW50IGgsIGludCB0ZXh0Q29sb3IsIGludCBiYWNrQ29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoYywgeCwgICAgICB5LCAgIDEsIGgsIHRleHRDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKGMsIHgrdy0xLCAgeSwgICAxLCBoLCB0ZXh0Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChjLCB4LCAgICAgIHksICAgdywgMSwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoYywgeCwgICAgICB5K2gtMSwgdywgMSwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBIZWlnaHQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBDdXJzb3JYXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gY3Vyc29yWDsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQ3Vyc29yWSB7IGdldCB7IHJldHVybiBjdXJzb3JZOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JZID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdPbmVEaWdpdChpbnQgaSwgaW50IHgsIGludCB5LCBpbnQgY29sb3IgPSBOT0NIQU5HRUNPTE9SLCBpbnQgYmFja2dyb3VuZCA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjaGFyIGMgPSAoY2hhcikoaSArICcwJyk7XHJcbiAgICAgICAgICAgIERyYXdDaGFyKGMsIHgsIHksIGNvbG9yLCBiYWNrZ3JvdW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdUd29EaWdpdHMoaW50IGksIGludCB4LCBpbnQgeSwgaW50IGNvbG9yID0gTk9DSEFOR0VDT0xPUiwgaW50IGJhY2tncm91bmQgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd09uZURpZ2l0KGkvMTAseCx5LGNvbG9yLGJhY2tncm91bmQpO1xyXG4gICAgICAgICAgICBEcmF3T25lRGlnaXQoaSAlMTAsIHgrMSwgeSwgY29sb3IsIGJhY2tncm91bmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBTYW1lQXMoVGV4dEJvYXJkIHRleHRCb2FyZCwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hhcnNbeCwgeV0gPT0gdGV4dEJvYXJkLmNoYXJzW3gsIHldXHJcbiAgICAgICAgICAgICAgICAmJiB0aGlzLkJhY2tDb2xvclt4LHldID09IHRleHRCb2FyZC5CYWNrQ29sb3JbeCx5XVxyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5UZXh0Q29sb3JbeCx5XSA9PSB0ZXh0Qm9hcmQuVGV4dENvbG9yW3gseV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIENvcHkoVGV4dEJvYXJkIHRleHRCb2FyZCwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFyc1t4LCB5XSA9IHRleHRCb2FyZC5jaGFyc1t4LCB5XTtcclxuICAgICAgICAgICAgdGhpcy5UZXh0Q29sb3JbeCwgeV0gPSB0ZXh0Qm9hcmQuVGV4dENvbG9yW3gsIHldO1xyXG4gICAgICAgICAgICB0aGlzLkJhY2tDb2xvclt4LCB5XSA9IHRleHRCb2FyZC5CYWNrQ29sb3JbeCwgeV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIERyYXdfQ3Vyc29yX1VuaWNvZGVMYWJlbChpbnQgdiwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGxlbiA9IERyYXdVbmljb2RlTGFiZWwodiwgY3Vyc29yWCwgY3Vyc29yWSwgY29sb3IpO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGxlbjsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBBZHZhbmNlQ3Vyc29yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBpbnQgRHJhd1VuaWNvZGVMYWJlbChpbnQgdW5pY29kZSwgaW50IHgsIGludCB5LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodW5pY29kZSA+PSAnYScgJiYgdW5pY29kZSA8PSAneicpIHtcclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKChjaGFyKSh1bmljb2RlICsgJ0EnIC0gJ2EnKSwgeCwgeSwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHVuaWNvZGUgPj0gJzAnICYmIHVuaWNvZGUgPD0gJzknKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhcigoY2hhcikodW5pY29kZSksIHgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0cmluZyBsYWJlbCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmICh1bmljb2RlID09IDMyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbCA9IFwiU1BBQ0VcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBEcmF3KGxhYmVsLCB4LCB5LCBjb2xvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBsYWJlbC5MZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldChUZXh0Qm9hcmQgb3JpZ2luKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Qb3NpdGlvbiA9IG9yaWdpbi5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBXaWR0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IEhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcnNbaSwgal0gPSBvcmlnaW4uY2hhcnNbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5CYWNrQ29sb3JbaSwgal0gPSBvcmlnaW4uQmFja0NvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGV4dENvbG9yW2ksIGpdID0gb3JpZ2luLlRleHRDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNpemUoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJzID09IG51bGwgfHwgdyA+IGNoYXJzLkdldExlbmd0aCgwKSB8fCBoID4gY2hhcnMuR2V0TGVuZ3RoKDEpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTZXRNYXhTaXplKHcsIGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFdpZHRoID0gdztcclxuICAgICAgICAgICAgSGVpZ2h0ID0gaDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2hhciBDaGFyQXQoaW50IGksIGludCBqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJzW2ksIGpdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0Q3Vyc29yQXQoaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3Vyc29yWCA9IHg7XHJcbiAgICAgICAgICAgIGN1cnNvclkgPSB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd19DdXJzb3Ioc3RyaW5nIHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYyBpbiB2KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3X0N1cnNvcihjKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd19DdXJzb3Ioc3RyaW5nIHYsIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYyBpbiB2KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3X0N1cnNvcihjLCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBDYW5EcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhzdHJpbmcgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBjdXJyZW50WCA9IGN1cnNvclg7XHJcbiAgICAgICAgICAgIGludCBjdXJyZW50WSA9IGN1cnNvclk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHYuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJvb2wgbGluZUJyZWFrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBib29sIHNob3VsZENoZWNrRm9yTGluZUJyZWFrcyA9IChpID09IDAgfHwgdltpXSA9PSAnICcpICYmIGkgIT0gdi5MZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZENoZWNrRm9yTGluZUJyZWFrcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMTsgaiA8IHYuTGVuZ3RoIC0gaTsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogKyBjdXJyZW50WCA+PSBXaWR0aCkgLy9yZWFjaCBlbmQgb2YgdGhlIGxpbmUgd2l0aG91dCBlbmRpbmcgdGhlIHdvcmQsIHNob3VsZCBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2W2ldID09ICcgJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7IC8vc2tpcCB0aHJvdWdoIHRoZSBzcGFjZSBpZiBpdCdzIGEgbmV3IGxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVCcmVhayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpICsgal0gPT0gJyAnKSAvL25ldyB3b3JkIGJlZ2lucyBzbyBubyBuZWVkIHRvIGxpbmUgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZUJyZWFrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRZKys7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3VycmVudFgrKztcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50WCA+PSBXaWR0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRYID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50WCA+PSBXaWR0aCB8fCBjdXJyZW50WSA+PSBIZWlnaHQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRHJhd0N1cnNvclJlc3VsdCBEcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhzdHJpbmcgdiwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IG9mZlN0YXJ0ID0gMDtcclxuICAgICAgICAgICAgaW50IG9mZkVuZCA9IHYuTGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgcmV0dXJuIERyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKHYsIGNvbG9yLCBvZmZTdGFydCwgb2ZmRW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEcmF3Q3Vyc29yUmVzdWx0IERyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKHN0cmluZyB2LCBpbnQgY29sb3IsIGludCBvZmZTdGFydCwgaW50IG9mZkVuZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBWZWN0b3IyRCBzdGFydCA9IG5ldyBWZWN0b3IyRChDdXJzb3JYLCBDdXJzb3JZKTtcclxuICAgICAgICAgICAgaW50IGVuZEluZGV4ID0gb2ZmRW5kICsgMTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IG9mZlN0YXJ0OyBpIDwgZW5kSW5kZXg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IG9yaWdpblggPSBjdXJzb3JYO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBsaW5lQnJlYWsgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJvb2wgc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzID0gKGkgPT0gMCB8fCB2W2ldID09ICcgJykgJiYgaSAhPSBlbmRJbmRleCAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAxOyBqIDwgZW5kSW5kZXggLSBpOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiArIG9yaWdpblggPj0gV2lkdGgpIC8vcmVhY2ggZW5kIG9mIHRoZSBsaW5lIHdpdGhvdXQgZW5kaW5nIHRoZSB3b3JkLCBzaG91bGQgbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpXSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrOyAvL3NraXAgdGhyb3VnaCB0aGUgc3BhY2UgaWYgaXQncyBhIG5ldyBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWsgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaSArIGpdID09ICcgJykgLy9uZXcgd29yZCBiZWdpbnMgc28gbm8gbmVlZCB0byBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVCcmVhaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDdXJzb3JOZXdMaW5lKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IodltpXSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFZlY3RvcjJEIGVuZCA9IG5ldyBWZWN0b3IyRChDdXJzb3JYLCBDdXJzb3JZKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEcmF3Q3Vyc29yUmVzdWx0KFBvc2l0aW9uVG9JbmRleChzdGFydCksIFBvc2l0aW9uVG9JbmRleChlbmQpLCBzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQXV0b0ZpeEdyaWRkaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBIZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSXNHcmlkKGksIGopKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IG1hc2sgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNHcmlkKGkgLSAxLCBqKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzayArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChJc0dyaWQoaSArIDEsIGopKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrICs9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKElzR3JpZChpLCBqIC0gMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2sgKz0gNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNHcmlkKGksIGogKyAxKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzayArPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAobWFzaylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzW2ksIGpdID0gVW5pY29kZS5Bc2NpaUdyaWRIb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzW2ksIGpdID0gVW5pY29kZS5Bc2NpaUdyaWRWZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbaSwgal0gPSBVbmljb2RlLkFzY2lpR3JpZFVwTGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkVXBSaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkVXBSaWdodExlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbaSwgal0gPSBVbmljb2RlLkFzY2lpR3JpZERvd25MZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkRG93blJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkRG93blJpZ2h0TGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgSXNHcmlkKGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHggPDAgfHwgeSA8MCB8fCB4Pj0gV2lkdGggfHwgeT49IEhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2hhciBjID0gY2hhcnNbeCwgeV07XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIFVuaWNvZGUuZ3JpZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChjID09IGl0ZW0pIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRHJhd0xpbmVzKGludCBoZXJvLCBwYXJhbXMgVmVjdG9yMkRbXSBwb2ludHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHBvaW50cy5MZW5ndGgtMTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3TGluZShwb2ludHNbaV0sIHBvaW50c1tpKzFdLCBoZXJvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3TGluZShWZWN0b3IyRCBwb3MxLCBWZWN0b3IyRCBwb3MyLCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjaGFyIGMgPSBVbmljb2RlLkFzY2lpR3JpZEhvcjtcclxuICAgICAgICAgICAgaWYgKHBvczEuWSAhPSBwb3MyLlkpIGMgPSBVbmljb2RlLkFzY2lpR3JpZFZlcjtcclxuICAgICAgICAgICAgaW50IGhlaWdodCA9IHBvczIuWUludCAtIHBvczEuWUludDtcclxuICAgICAgICAgICAgLy9pZiAoaGVpZ2h0IDw9IDApIGhlaWdodCA9IDE7XHJcbiAgICAgICAgICAgIGludCB3aWR0aCA9IHBvczIuWEludCAtIHBvczEuWEludDtcclxuICAgICAgICAgICAgLy9pZiAod2lkdGggPD0gMCkgd2lkdGggPSAxO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoYywgcG9zMS5YSW50LCBwb3MxLllJbnQsIHdpZHRoKzEsIGhlaWdodCsxLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGludCBQb3NpdGlvblRvSW5kZXgoVmVjdG9yMkQgc3RhcnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludCkoc3RhcnQuWCArIHN0YXJ0LlkgKiBXaWR0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25lRGlnaXRfQ3Vyc29yKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd19DdXJzb3IoKGNoYXIpKGkgKyAnMCcpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKGNoYXIgYylcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcihjLCBjdXJzb3JYLCBjdXJzb3JZKTtcclxuICAgICAgICAgICAgQWR2YW5jZUN1cnNvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd19DdXJzb3IoY2hhciBjLCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3I9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgY3Vyc29yWCwgY3Vyc29yWSwgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIEFkdmFuY2VDdXJzb3IoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZHZhbmNlQ3Vyc29yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclgrKztcclxuICAgICAgICAgICAgaWYgKGN1cnNvclggPj0gV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclggPSAwO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDdXJzb3JOZXdMaW5lKGludCB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3Vyc29yWSsrO1xyXG4gICAgICAgICAgICBjdXJzb3JYID0geDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdDaGFyKGNoYXIgdiwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh2ICE9IE5PQ0hBTkdFQ0hBUikge1xyXG4gICAgICAgICAgICAgICAgY2hhcnNbeCwgeV0gPSB2O1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hhcihjaGFyIHYsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcih2LCB4LCB5KTtcclxuICAgICAgICAgICAgU2V0Q29sb3IoY29sb3IsIHgsIHkpO1xyXG4gICAgICAgICAgICBTZXRCYWNrQ29sb3IoYmFja0NvbG9yLCB4LCB5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0QWxsKGNoYXIgdGV4dCwgaW50IHRleHRDb2xvciA9IE5PQ0hBTkdFQ09MT1IsIGludCBiYWNrQ29sb3I9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQodGV4dCwgMCwgMCwgV2lkdGgsIEhlaWdodCwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRBbGxJZlZpc2libGUoY2hhciB0ZXh0LCBpbnQgdGV4dENvbG9yID0gTk9DSEFOR0VDT0xPUiwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWRJZlZpc2libGUodGV4dCwgMCwgMCwgV2lkdGgsIEhlaWdodCwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3V2l0aEdyaWQoc3RyaW5nIHRleHQsIGludCB4LCBpbnQgeSwgaW50IGdyaWRDb2xvciwgaW50IHRleHRDb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB3aWR0aCA9IHRleHQuTGVuZ3RoO1xyXG4gICAgICAgICAgICBEcmF3R3JpZCh4LCB5LCB3aWR0aCArIDIsIDMsIGdyaWRDb2xvcik7XHJcbiAgICAgICAgICAgIERyYXcodGV4dCwgeCArIDEsIHkgKyAxLCB0ZXh0Q29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhzdHJpbmcgdiwgaW50IHgsIGludCB5LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB2Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgeDIgPSB4ICsgaTtcclxuICAgICAgICAgICAgICAgIGludCB5MiA9IHk7XHJcbiAgICAgICAgICAgICAgICBpZih4MiA+PSBXaWR0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB4MiAtPSBXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB5MisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIodltpXSwgeDIsIHkyLCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1dpdGhMaW5lYnJlYWtzKHN0cmluZyB2LCBpbnQgeCwgaW50IHksIGludCBuZXdsaW5lWCwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBsaW5lYnJlYWtzID0gMDtcclxuICAgICAgICAgICAgaW50IHhPZmZzZXRuZXdsaW5lcyA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdi5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHgyID0geCArIGkrIHhPZmZzZXRuZXdsaW5lcztcclxuICAgICAgICAgICAgICAgIGludCB5MiA9IHk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHdoaWxlICh4MiA+PSBXaWR0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB4MiA9IHgyLVdpZHRoK25ld2xpbmVYO1xyXG4gICAgICAgICAgICAgICAgICAgIHkyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIGlmICh2W2ldID09ICdcXG4nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVicmVha3MrKztcclxuICAgICAgICAgICAgICAgICAgICB4T2Zmc2V0bmV3bGluZXMgKz0gbmV3bGluZVggLSB4Mi0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBEcmF3Q2hhcih2W2ldLCB4MiwgeTIgKyBsaW5lYnJlYWtzLCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoSUVudW1lcmFibGU8Y2hhcj4gdiwgaW50IHgsIGludCB5LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkNvdW50PGNoYXI+KHYpOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRWxlbWVudEF0PGNoYXI+KHYsaSksIHggKyBpLCB5LCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0dyaWQoaW50IHgsIGludCB5LCBpbnQgd2lkdGgsIGludCBoZWlnaHQsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoVW5pY29kZS5Bc2NpaUdyaWRWZXIsIHgsIHksIDEsIGhlaWdodCwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoVW5pY29kZS5Bc2NpaUdyaWRWZXIsIHggKyB3aWR0aCAtIDEsIHksIDEsIGhlaWdodCwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoVW5pY29kZS5Bc2NpaUdyaWRIb3IsIHgsIHksIHdpZHRoLCAxLCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChVbmljb2RlLkFzY2lpR3JpZEhvciwgeCwgeSArIGhlaWdodCAtIDEsIHdpZHRoLCAxLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoKGNoYXIpMjE4LCB4LCB5LCAxLCAxLCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgoY2hhcikxOTIsIHgsICAgICAgICAgICAgICB5K2hlaWdodC0xLCAxLCAxLCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgoY2hhcikyMTcsIHgrd2lkdGgtMSwgICAgICB5KyBoZWlnaHQgLSAxLCAxLCAxLCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgoY2hhcikxOTEsIHggKyB3aWR0aCAtIDEsICB5LCAxLCAxLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3UmVwZWF0ZWQoY2hhciBjLCBpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodCwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSB4OyBpIDwgeCArIHdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSB5OyBqIDwgeSArIGhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIERyYXdDaGFyKGMsIGksIGosIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgU2V0QmFja0NvbG9yKGJhY2tDb2xvciwgaSwgaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdSZXBlYXRlZElmVmlzaWJsZShjaGFyIGMsIGludCB4LCBpbnQgeSwgaW50IHdpZHRoLCBpbnQgaGVpZ2h0LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IHg7IGkgPCB4ICsgd2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IHk7IGogPCB5ICsgaGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJzW2ksIGpdICE9IFRleHRCb2FyZC5JTlZJU0lCTEVDSEFSIHx8IFRleHRDb2xvcltpLGpdICE9IElOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEcmF3Q2hhcihjLCBpLCBqLCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoQmFja0NvbG9yW2ksal0gIT0gVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTZXRCYWNrQ29sb3IoYmFja0NvbG9yLCBpLCBqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0Q29sb3IoaW50IGNvbG9yLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29sb3IgIT0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICAgICAgICAgIFRleHRDb2xvclt4LCB5XSA9IGNvbG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0QmFja0NvbG9yKGludCBjb2xvciwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbG9yICE9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEJhY2tDb2xvclt4LCB5XSA9IGNvbG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KHN0cmluZyB2LCBpbnQgeDIsIGludCB5Miwgb2JqZWN0IGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3R3JpZChpbnQgdjEsIGludCB2MiwgaW50IHYzLCBpbnQgdjQsIG9iamVjdCBib2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBEcmF3Q3Vyc29yUmVzdWx0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFN0YXJ0SW5kZXg7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgRW5kSW5kZXg7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBTdGFydFBvc2l0aW9uO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgRW5kUG9zaXRpb247XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgRHJhd0N1cnNvclJlc3VsdChpbnQgc3RhcnRJbmRleCwgaW50IGVuZEluZGV4LCBWZWN0b3IyRCBzdGFydFBvc2l0aW9uLCBWZWN0b3IyRCBlbmRQb3NpdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU3RhcnRJbmRleCA9IHN0YXJ0SW5kZXg7XHJcbiAgICAgICAgICAgICAgICBFbmRJbmRleCA9IGVuZEluZGV4O1xyXG4gICAgICAgICAgICAgICAgU3RhcnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBFbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFNjcmVlbk4gOiBJVGV4dFNjcmVlbiwgSU1vdXNlSW5wdXQsIElLZXlib2FyZElucHV0XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFRleHRXb3JsZCBUZXh0V29ybGQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgVXBkYXRlKGZsb2F0IGYpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dFNjcmVlbk4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0U2NyZWVuTihUZXh0V29ybGQgdGV4dFdvcmxkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dFdvcmxkID0gdGV4dFdvcmxkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljICB2b2lkIEluaXQoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICBUZXh0V29ybGQuSW5pdCh3LCBoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBNb3VzZUV2ZW50KE1vdXNlRXZlbnRzIG1vdXNlRG93biwgaW50IHYxLCBpbnQgdjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBpbnQgSW5wdXRBc051bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBJbnB1dFVuaWNvZGUgLSA0ODtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW50ZXJmYWNlIElUZXh0U2NyZWVuXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgVGV4dEJvYXJkIEdldEJvYXJkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdm9pZCBVcGRhdGUoZmxvYXQgZik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludGVyZmFjZSBJTW91c2VJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIHZvaWQgTW91c2VFdmVudChNb3VzZUV2ZW50cyBldmVudFR5cGUsIGludCB2MSwgaW50IHYyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW50ZXJmYWNlIElLZXlib2FyZElucHV0XHJcbiAgICB7XHJcbiAgICAgICAgaW50IElucHV0VW5pY29kZSB7IHNldDsgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIE1vdXNlRXZlbnRzXHJcbiAgICB7IFxyXG4gICAgICAgIE1vdXNlRG93bixcclxuICAgICAgICBOb25lXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRleHRTY3JlZW5Ib2xkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgSVRleHRTY3JlZW4gU2NyZWVuIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgSU1vdXNlSW5wdXQgTW91c2UgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBJS2V5Ym9hcmRJbnB1dCBLZXkgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldEFsbChvYmplY3QgZG5zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2NyZWVuID0gZG5zIGFzIElUZXh0U2NyZWVuO1xyXG4gICAgICAgICAgICBNb3VzZSA9IGRucyBhcyBJTW91c2VJbnB1dDtcclxuICAgICAgICAgICAgS2V5ID0gZG5zIGFzIElLZXlib2FyZElucHV0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgY2xhc3MgQXR0YWNrUHJldmlld1xyXG4gICAge1xyXG4gICAgICAgIEVDU01hbmFnZXIgZWNzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgQmF0dGxlUmVuZGVyIHJlbmRlcjtcclxuICAgICAgICBwcml2YXRlIFF1aWNrQWNjZXNzb3JPbmU8TW92ZURhdGE+IG1vdmVEYXRhcztcclxuICAgICAgICBMaXN0PFRleHRFbnRpdHk+IGVudGl0aWVzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICBwcml2YXRlIGludCBjdXJyZW50TW92ZUlkO1xyXG5cclxuICAgICAgICBwdWJsaWMgQXR0YWNrUHJldmlldyhFQ1NNYW5hZ2VyIGVjcywgQmF0dGxlUmVuZGVyIHJlbmRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlciA9IHJlbmRlcjtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIuYXR0YWNrUHJldmlldyA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1vdmVEYXRhcyA9IGVjcy5RdWlja0FjY2Vzc29yMTxNb3ZlRGF0YT4oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTaG93UHJldmlldyhpbnQgdXNlciwgaW50IG1vdmVJZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChtb3ZlSWQgPT0gY3VycmVudE1vdmVJZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBFbmQoKTtcclxuICAgICAgICAgICAgY3VycmVudE1vdmVJZCA9IG1vdmVJZDtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIlNUQVJUXCIpO1xyXG5cclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIm1vdmUgXCIrbW92ZUlkKTtcclxuICAgICAgICAgICAgdmFyIG1vdmVEYXRhID0gbW92ZURhdGFzLkNvbXAxKG1vdmVJZCk7XHJcbiAgICAgICAgICAgIFZlY3RvcjJEIHBvcyA9IHJlbmRlci5FbnRpdHlTY3JlZW5Qb3NpdGlvbih1c2VyKTtcclxuICAgICAgICAgICAgUmVjdCBncmlkUmVjdCA9IHJlbmRlci5HZXRHcmlkUmVjdCgpO1xyXG5cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbW92ZURhdGEudW5pdHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtcyA9IGl0ZW0udGhpbmdzVG9IYXBwZW47XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdGhpbmcgaW4gaXRlbXMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaW5nIGlzIERlYWxEYW1hZ2VBY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGEgPSB0aGluZyBhcyBEZWFsRGFtYWdlQWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZGEudGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhcmdldClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXJnZXQuTm9uZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgVGFyZ2V0LlNlbGY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFRhcmdldC5DbG9zZXN0VGFyZ2V0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXJnZXQuQ2xvc2VzdFRhcmdldFg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZyZWVFbnRpdHkgPSByZW5kZXIudGV4dFdvcmxkLkdldEZyZWVFbnRpdHkoZ3JpZFJlY3QuWCtncmlkUmVjdC5XaWR0aCAtIHBvcy5YSW50LDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0aWVzLkFkZChmcmVlRW50aXR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmVlRW50aXR5LlNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJlZUVudGl0eS5PcmlnaW4uU2V0QWxsKFRleHRCb2FyZC5JTlZJU0lCTEVDSEFSLCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXJnZXQuQXJlYTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRW5kKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoY3VycmVudE1vdmVJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiRU5EXCIpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudE1vdmVJZCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyLnRleHRXb3JsZC5GcmVlKGVudGl0aWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhhcHBIYW5kbGluZ1xyXG4gICAge1xyXG4gICAgICAgIEJhdHRsZVJlbmRlciBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgcHVibGljIEFjdGlvbiBIYW5kbGU7XHJcbiAgICAgICAgTGlzdDxIYXBwSGFuZGxlcj4gaGFuZGxlcnMgPSBuZXcgTGlzdDxIYXBwSGFuZGxlcj4oKTtcclxuICAgICAgICBwcml2YXRlIFF1aWNrQWNjZXNzb3JUd288SGFwcFRhZ3MsIFRpbWVTdGFtcFNuYXA+IGhhcHBzO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgaGlnaGVzdEhhbmRsZWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBoYW5kbGVTdGF0ZS5oaWdoZXN0SGFuZGxlZDsgfVxyXG4gICAgICAgICAgICBzZXQgeyBoYW5kbGVTdGF0ZS5oaWdoZXN0SGFuZGxlZCA9IHZhbHVlOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgSGFwcEhhbmRsZVN0YXRlIGhhbmRsZVN0YXRlID0gbmV3IEhhcHBIYW5kbGVTdGF0ZSgpO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEhhbmRsaW5nKEJhdHRsZVJlbmRlciBiYXR0bGVSZW5kZXIsIEJhdHRsZVNldHVwIGJhdHRsZVNldHVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVSZW5kZXIgPSBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgICAgIHZhciB3b3JsZCA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQ7XHJcbiAgICAgICAgICAgIHZhciBwb3NBbmltID0gd29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuUG9zaXRpb25BbmltYXRpb24+KG5ldyBQb3NpdGlvbkFuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgdmFyIGJsaW5rQW5pbSA9IHdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkJsaW5rQW5pbT4obmV3IEJsaW5rQW5pbSgpKTtcclxuICAgICAgICAgICAgdmFyIGRlbGF5QW5pbSA9IHdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkRlbGF5c0FuaW1hdGlvbj4obmV3IERlbGF5c0FuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBiYXR0bGVTZXR1cC5lY3M7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQoaGFuZGxlU3RhdGUpO1xyXG4gICAgICAgICAgICB2YXIgYmF0dGxlTWFpbiA9IGJhdHRsZVNldHVwLmJhdHRsZU1haW47XHJcbiAgICAgICAgICAgIHZhciB0aW1lID0gYmF0dGxlU2V0dXAudGltZVN0YW1wO1xyXG4gICAgICAgICAgICBiYXR0bGVSZW5kZXIuSGFwcEhhbmRsaW5nID0gdGhpcztcclxuICAgICAgICAgICAgaGFwcHMgPSBlY3MuUXVpY2tBY2Nlc3NvcjI8SGFwcFRhZ3MsIFRpbWVTdGFtcFNuYXA+KCk7XHJcbiAgICAgICAgICAgIGhpZ2hlc3RIYW5kbGVkID0gLTE7XHJcblxyXG5cclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKG5ldyBIYXBwSGFuZGxlcigoZSkgPT5cclxuICAgICAgICAgICAge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRhbWFnZSA9IGUuR2V0Q29tcG9uZW50PEhhcHBEYW1hZ2VEYXRhPigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhbW91bnQgPSBkYW1hZ2UuYW1vdW50O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc3RyaW5nIG1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGFtYWdlLmVsZW1lbnRhbEJsb2NrKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyB0ZXh0ID0gZGFtYWdlLmRhbWFnZUUuVG9TdHJpbmcoKS5Ub1VwcGVyKCkgKyBcIiBCTE9DSyBcIiArIGRhbWFnZS50YXJnZXRFLlRvU3RyaW5nKCkuVG9VcHBlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZTIgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkodGV4dC5MZW5ndGgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3JFID0gQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UyLk9yaWdpbi5EcmF3KHRleHQsIDAsIDAsIGNvbG9yRSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKG1lc3NhZ2UyLkFuaW1CYXNlKDAuNmYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkZyb250Q29sb3IoY29sb3JFLCAwLjJmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBvZmZzZXQgPSAoaW50KU1hdGguRmxvb3IoLXRleHQuTGVuZ3RoIC8gMmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlMi5TZXRQb3NpdGlvbihiYXR0bGVSZW5kZXIuYmF0dGxlclJlbmRlcnNbZGFtYWdlLnRhcmdldF0uR2V0UG9zaXRpb24oKSArIG5ldyBWZWN0b3IyRCgrMSArIG9mZnNldCwgLTMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXlBbmltLkRlbGF5KDAuNjVmKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oYmF0dGxlTWFpbi5lbnRpdGllc1tkYW1hZ2UudGFyZ2V0XS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmxhc3QgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoNSwgNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsYXN0LlNldFBvc2l0aW9uKHBvcyArIG5ldyBWZWN0b3IyRCgtMiwgLTIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsYXN0Lk9yaWdpbi5EcmF3UmVjdCgnICcsIDAsIDAsIDUsIDUsIFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUiwgQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2JsYXN0Lk9yaWdpbi5EcmF3UmVwZWF0ZWQoJyAnLCAxLCAxLCAzLCAzLCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IsIEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoZGFtYWdlLmRhbWFnZUUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChibGFzdC5BbmltQmFzZSgwLjJmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5CYWNrQ29sb3IoQmF0dGxlUmVuZGVyLkNvbG9ycy5pbnB1dEtleSwgMC4wNWYsIGZhbHNlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBkYW1hZ2UuZGFtYWdlRSArIFwiIGFic29yYnMgXCIgKyBkYW1hZ2UudGFyZ2V0RSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSArPSBiYXR0bGVSZW5kZXIuR2V0RW50aXR5TmFtZShkYW1hZ2UudGFyZ2V0KSArIFwiIGlzIHVuYWZlY3R0ZWQuXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZSA9IGJhdHRsZVJlbmRlci5HZXRFbnRpdHlOYW1lKGRhbWFnZS50YXJnZXQpICsgXCIgZ2V0cyBoaXQhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhbWFnZS5zdXBlckVmZmVjdGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgdGV4dCA9IGRhbWFnZS5kYW1hZ2VFLlRvU3RyaW5nKCkuVG9VcHBlcigpICsgXCIgQlJFQUsgXCIgKyBkYW1hZ2UudGFyZ2V0RS5Ub1N0cmluZygpLlRvVXBwZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlMiA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eSh0ZXh0Lkxlbmd0aCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3JFID0gQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlMi5PcmlnaW4uRHJhdyh0ZXh0LCAwLCAwLCBjb2xvckUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQobWVzc2FnZTIuQW5pbUJhc2UoMC40NWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkZyb250Q29sb3IoY29sb3JFLCAwLjJmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnQgb2Zmc2V0ID0gKGludClNYXRoLkZsb29yKC10ZXh0Lkxlbmd0aCAvIDJmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UyLlNldFBvc2l0aW9uKGJhdHRsZVJlbmRlci5iYXR0bGVyUmVuZGVyc1tkYW1hZ2UudGFyZ2V0XS5HZXRQb3NpdGlvbigpICsgbmV3IFZlY3RvcjJEKCsxICsgb2Zmc2V0LCAtMikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXlBbmltLkRlbGF5KDAuNjVmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZSA9IGRhbWFnZS5kYW1hZ2VFICsgXCIgcmF2YWdlcyBcIiArIGRhbWFnZS50YXJnZXRFICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tZXNzYWdlICs9IGJhdHRsZVJlbmRlci5HZXRFbnRpdHlOYW1lKGRhbWFnZS50YXJnZXQpK1wiIHRha2VzIGEgaGVhdnkgaGl0IVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oYmF0dGxlTWFpbi5lbnRpdGllc1tkYW1hZ2UudGFyZ2V0XS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJsYXN0ID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDUsIDUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxhc3QuU2V0UG9zaXRpb24ocG9zICsgbmV3IFZlY3RvcjJEKC0yLCAtMikpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsYXN0Lk9yaWdpbi5EcmF3UmVwZWF0ZWQoJyAnLCAxLCAxLCAzLCAzLCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IsIEJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChibGFzdC5BbmltQmFzZSgwLjJmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5CYWNrQ29sb3IoQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSksIDAuMDVmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tZXNzYWdlID0gYmF0dGxlUmVuZGVyLkdldEVudGl0eU5hbWUoZGFtYWdlLnRhcmdldCkgKyBcIiBnZXRzIGh1cnRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oYmF0dGxlTWFpbi5lbnRpdGllc1tkYW1hZ2UudGFyZ2V0XS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBudW1iZXIgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoMSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjJEIGluaXRpYWxQb3MgPSBwb3MgKyBuZXcgVmVjdG9yMkQoMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyLlNldFBvc2l0aW9uKGluaXRpYWxQb3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBudW1iZXIuT3JpZ2luLkRyYXdPbmVEaWdpdChhbW91bnQsIDAsIDAsIEJhdHRsZVJlbmRlci5Db2xvcnMuSGVybyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQobnVtYmVyLkFuaW1CYXNlKDAuNmYpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKGluaXRpYWxQb3MsIGluaXRpYWxQb3MgKyBuZXcgVmVjdG9yMkQoMCwgLTMpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9ibGlua0FuaW0uQWRkKG51bWJlci5BbmltQmFzZSgxZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQ2hhcignICcsIDVmKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVSZW5kZXIuU2hvd01lc3NhZ2UobWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRlZmVuZGVyID0gYmF0dGxlUmVuZGVyLmJhdHRsZXJSZW5kZXJzW2RhbWFnZS50YXJnZXRdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIGZlID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRUZW1wRW50aXR5KGRlZmVuZGVyLldpZHRoLCBkZWZlbmRlci5IZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYW1hZ2Uuc3VwZXJFZmZlY3RpdmUgJiYgIWRhbWFnZS5lbGVtZW50YWxCbG9jayAmJiBiYXR0bGVNYWluLmVudGl0aWVzW2RhbWFnZS50YXJnZXRdLkFsaXZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmZSA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eSgzLCAzKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmFja0NvbG9yID0gQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja0NvbG9yID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeENvbG9yID0gQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhciBkYW1hZ2VDaGFyID0gJ1gnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihkYW1hZ2VDaGFyLCAxLCAwLCB4Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKGRhbWFnZUNoYXIsIDEsIDEsIHhDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoZGFtYWdlQ2hhciwgMSwgMiwgeENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihkYW1hZ2VDaGFyLCAwLCAxLCB4Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKGRhbWFnZUNoYXIsIDIsIDEsIHhDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2ZlLk9yaWdpbi5EcmF3Q2hhcihUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCAwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uUG9zaXRpb24gPSBkZWZlbmRlci5HZXRQb3NpdGlvbigpICsgbmV3IFZlY3RvcjJEKC0xLCAtMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoZmUuQW5pbUJhc2UoMC4zNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkNoYXIoJ1onLCAwLjA1ZikpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYmxpbmtBbmltLkFkZChmZS5BbmltQmFzZSgwLjM1ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQmFja0NvbG9yKEJhdHRsZVJlbmRlci5Db2xvcnMuSGVybywgMC4wNWYpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJDSEFOR0UgRUxFXCIpO1xyXG5cclxuICAgICAgICAgICAgfSwgTWlzY0hhcHBUYWdzLkRhbWFnZSkpO1xyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQobmV3IEhhcHBIYW5kbGVyKChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG1kID0gZS5HZXRDb21wb25lbnQ8SGFwcE1vdmVEYXRhPigpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgdGV4dCA9IGhtZC5lbGVtZW50LlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eSh0ZXh0Lkxlbmd0aCwgMSk7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLk9yaWdpbi5EcmF3KHRleHQsIDAsIDAsIEJhdHRsZVJlbmRlci5Db2xvcnMuSGVybyk7XHJcbiAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKG1lc3NhZ2UuQW5pbUJhc2UoMC41ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuRnJvbnRDb2xvcihCYXR0bGVSZW5kZXIuQ29sb3JzLklucHV0RGVzY3JpcHRpb24sIDAuMTVmKSk7XHJcbiAgICAgICAgICAgICAgICBpbnQgb2Zmc2V0ID0gKGludClNYXRoLkZsb29yKC10ZXh0Lkxlbmd0aCAvIDJmKTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuU2V0UG9zaXRpb24oYmF0dGxlUmVuZGVyLmJhdHRsZXJSZW5kZXJzW2htZC51c2VyXS5HZXRQb3NpdGlvbigpICsgbmV3IFZlY3RvcjJEKCsxICsgb2Zmc2V0LCAtMSkpO1xyXG5cclxuICAgICAgICAgICAgfSwgTWlzY0hhcHBUYWdzLkNoYW5nZUVsZW1lbnQpKTtcclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKG5ldyBIYXBwSGFuZGxlcigoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZCA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlRGF0YT4oKTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIGRlZmVuZGVyID0gYmF0dGxlUmVuZGVyLmJhdHRsZXJSZW5kZXJzW2htZC50YXJnZXRdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGJhdHRsZU1haW4uZW50aXRpZXNbaG1kLnVzZXJdLnBvcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmxhc3QgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoMywgMyk7XHJcbiAgICAgICAgICAgICAgICBibGFzdC5TZXRQb3NpdGlvbihwb3MgKyBuZXcgVmVjdG9yMkQoLTEsIC0xKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYmxhc3QuT3JpZ2luLkRyYXdSZXBlYXRlZCgnICcsIDEsIDEsIDEsIDEsIFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteSk7XHJcbiAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKGJsYXN0LkFuaW1CYXNlKDAuMmYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm8sIDAuMDVmKSk7XHJcbiAgICAgICAgICAgICAgICAvL2RlbGF5QW5pbS5EZWxheSg1KTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkRFQVRIXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiQ0hBTkdFIEVMRVwiKTtcclxuXHJcbiAgICAgICAgICAgIH0sIE1pc2NIYXBwVGFncy5EZWF0aCkpO1xyXG4gICAgICAgICAgICBBY3Rpb248RW50aXR5PiBtb3ZlTWlzcyA9IChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFITNcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG1kID0gZS5HZXRDb21wb25lbnQ8SGFwcE1vdmVEYXRhPigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZiA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlbWVudEZhaWw+KCk7XHJcbiAgICAgICAgICAgICAgICBpbnQgZUlkID0gaG1kLnVzZXI7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW92ZXIgPSBiYXR0bGVNYWluLmVudGl0aWVzW2VJZF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IG1vdmVyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvczIgPSBobWYubW92ZVRvO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvc0YgPSAocG9zICsgcG9zMikgLyAyO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBmZSA9IGJhdHRsZVJlbmRlci5iYXR0bGVyUmVuZGVyc1tlSWRdO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIk1vdmUgZmFpbFwiKTtcclxuICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKDAuMmYpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKG1vdmVyLlBvc2l0aW9uVjJEKSxcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3NGKSkpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQobmV3IEhhcHBIYW5kbGVyKG1vdmVNaXNzLCBNb3ZlRGF0YVRhZ3MuTW92ZW1lbnQpKTtcclxuXHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChuZXcgSGFwcEhhbmRsZXIoKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBoYSA9IGUuR2V0Q29tcG9uZW50PEhhcHBBcmVhPigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZCA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlRGF0YT4oKTtcclxuICAgICAgICAgICAgICAgIGludCBlSWQgPSBobWQudXNlcjtcclxuICAgICAgICAgICAgICAgIHZhciBtb3ZlciA9IGJhdHRsZU1haW4uZW50aXRpZXNbZUlkXTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIHVzZXJSZW5kZXIgPSBiYXR0bGVSZW5kZXIuYmF0dGxlckVudGl0aWVzW2VJZF07XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJlYSA9IGhhLmFyZWE7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9pbnRzID0gYXJlYS5wb2ludHM7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHVzZUVmZmVjdCA9IHdvcmxkLkdldFRlbXBFbnRpdHkoMSwgMSk7XHJcbiAgICAgICAgICAgICAgICB1c2VFZmZlY3QuU2V0UG9zaXRpb24oYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24obW92ZXIucG9zKSk7XHJcbiAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKHVzZUVmZmVjdC5BbmltQmFzZSgwLjVmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5CYWNrQ29sb3IoQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihobWQuZWxlbWVudCksIDAuMTVmKSk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBwb2ludHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVudGl0eSA9IHdvcmxkLkdldFRlbXBFbnRpdHkoMSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmFsUG9zID0gaXRlbSAqIG5ldyBWZWN0b3IyRChoYS5taXJyb3JpbmdYLCAxKSArIGhhLm9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWxQb3MuWCA8IDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbFBvcy5ZIDwgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsUG9zLlggPiA1KSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWxQb3MuWSA+IDIpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShmaW5hbFBvcy5YSW50KTtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoZmluYWxQb3MuWUludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGZpbmFsUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBlbnRpdHkuU2V0UG9zaXRpb24ocG9zLlhJbnQsIHBvcy5ZSW50KTtcclxuICAgICAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKGVudGl0eS5BbmltQmFzZSgwLjVmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5CYWNrQ29sb3IoQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihobWQuZWxlbWVudCksIDAuMTVmKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIE1vdmVEYXRhVGFncy5Cb21iKSk7XHJcbiAgICAgICAgICAgIEhhbmRsZSA9ICgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJIQU5ETEUhXCIpO1xyXG4gICAgICAgICAgICAgICAgZmxvYXQgbmV3SGlnaGVzdEhhbmRsZWQgPSBoaWdoZXN0SGFuZGxlZDtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgaGFwcHMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiQURWXCIrYmF0dGxlUmVuZGVyLkNhbkFkdmFuY2VHcmFwaGljcygpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJhdHRsZVJlbmRlci5DYW5BZHZhbmNlR3JhcGhpY3MoKSkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhZ3MgPSBoYXBwcy5Db21wMShpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2lmIChoYXBwcy5Db21wMihpKS5UaW1lU25hcCA+IGhpZ2hlc3RIYW5kbGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID4gaGlnaGVzdEhhbmRsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25ld0hpZ2hlc3RIYW5kbGVkID0gaGFwcHMuQ29tcDIoaSkuVGltZVNuYXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0hpZ2hlc3RIYW5kbGVkID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBTkRMRSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBoYW4gaW4gaGFuZGxlcnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJIQU5ETEUheFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW4uQ2FuSGFuZGxlKHRhZ3MudGFncykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShoYXBwcy5Db21wMihpKS5UaW1lU25hcCArIFwiIC0gXCIgKyB0aW1lLkN1cnJlbnRTbmFwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFITJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuLkhhbmRsZXIoaGFwcHMuRW50aXR5KGkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwK1wiIC0gXCIrIHRpbWUuQ3VycmVudFNuYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGhpZ2hlc3RIYW5kbGVkID0gbmV3SGlnaGVzdEhhbmRsZWQ7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEhhcHBIYW5kbGVTdGF0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IGhpZ2hlc3RIYW5kbGVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEhhcHBIYW5kbGVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBMaXN0PGludD4gbmVjZXNzYXJ5VGFncyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgQWN0aW9uPEVudGl0eT4gSGFuZGxlcjtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBIYXBwSGFuZGxlcihBY3Rpb248RW50aXR5PiBoYW5kbGVyLCBwYXJhbXMgb2JqZWN0W10gdGFncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHQgaW4gdGFncylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuZWNlc3NhcnlUYWdzLkFkZChDb252ZXJ0LlRvSW50MzIodCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5IYW5kbGVyID0gaGFuZGxlcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW50ZXJuYWwgYm9vbCBDYW5IYW5kbGUoTGlzdDxpbnQ+IHRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIG5lY2Vzc2FyeVRhZ3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YWdzLkNvbnRhaW5zKGl0ZW0pKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gaGlnaGVzdEhhbmRsZWQgPj0gaGFwcHMuTGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlbjtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIGNsYXNzIEhlbHBTY3JlZW4gOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IElucHV0IHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0VW5pY29kZSB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIE1vdXNlSU8gTW91c2UgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBIZWxwU2NyZWVuTW9kZWwgbW9kZWw7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBMaXN0PE1vdmVSZW5kZXJEYXRhPiBtb3ZlUmVuZGVycztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcztcclxuICAgICAgICBjaGFyIExlYXZlQnV0dG9uO1xyXG4gICAgICAgIHB1YmxpYyBib29sIHdhbm5hTGVhdmU7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0RW50aXR5IGV4cGxhbmF0aW9uRW50aXR5O1xyXG5cclxuICAgICAgICBwdWJsaWMgSGVscFNjcmVlbihIZWxwU2NyZWVuTW9kZWwgaGVscE1vZGVsLCBMaXN0PE1vdmVSZW5kZXJEYXRhPiBtb3ZlUmVuZGVycywgTGlzdDxNb3ZlRGF0YT4gbW92ZURhdGFzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50ZXh0V29ybGQgPSBuZXcgVGV4dFdvcmxkKCk7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5Jbml0KEdhbWVNYWluLldpZHRoLCBHYW1lTWFpbi5IZWlnaHQpO1xyXG4gICAgICAgICAgICBtb2RlbCA9IGhlbHBNb2RlbDtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlUmVuZGVycyA9IG1vdmVSZW5kZXJzO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEYXRhcyA9IG1vdmVEYXRhcztcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5TZXRBbGwoVGV4dEJvYXJkLklOVklTSUJMRUNIQVIsIEJhdHRsZVJlbmRlci5Db2xvcnMuQmFja0NvbW1hbmQsIEJhdHRsZVJlbmRlci5Db2xvcnMuQmFja0NvbW1hbmQpO1xyXG4gICAgICAgICAgICBleHBsYW5hdGlvbkVudGl0eSA9IHRleHRXb3JsZC5HZXRGcmVlRW50aXR5KEdhbWVNYWluLldpZHRoLTQsIDM1KTtcclxuICAgICAgICAgICAgZXhwbGFuYXRpb25FbnRpdHkuU2V0UG9zaXRpb24oMiwgNCk7XHJcbiAgICAgICAgICAgIC8vZXhwbGFuYXRpb25FbnRpdHkuT3JpZ2luLkRyYXcoXCJTU1NfX1NTU1NEQVNEQVNEQVNcIiwgMCwwLCBCYXR0bGVSZW5kZXIuQ29sb3JzLklucHV0RGVzY3JpcHRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGlucHV0ID0gSW5wdXRVbmljb2RlO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQgPT0gTGVhdmVCdXR0b24pIHdhbm5hTGVhdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy90ZXh0V29ybGQubWFpbkJvYXJkLlJlc2V0KCk7XHJcbiAgICAgICAgICAgIGludCBwb3MgPSAwO1xyXG4gICAgICAgICAgICAvL3RleHRXb3JsZC5tYWluQm9hcmQuRHJhd1dpdGhMaW5lYnJlYWtzKFwiSW5wdXQgeW91ciBjb21tYW5kcyBhbmQgd2F0Y2ggdGhlIHR1cm4gcGxheSBvdXQuIFlvdSBjYW4gc2VlIGV2ZXJ5dGhpbmcgeW91ciBlbmVtaWVzIHdpbGwgZG9cXG5cXG5BdHRhY2tzIGhhdmUgdGhyZWUgZWxlbWVudHMsIEZpcmUsIFRodW5kZXIgYW5kIEljZS4gRmlyZSBiZWF0cyBJY2UsIEljZSBiZWF0cyBUaHVuZGVyLCBUaHVuZGVyIGJlYXRzIEZpcmUuXFxuVGhlIGVsZW1lbnQgb2YgdGhlIGF0dGFja2VyIGNoYW5nZXMgdXBvbiBhdHRhY2tpbmcuIEF0dGFja2VycyBhcmUgaW1tdW5lIHRvIGF0dGFja3Mgb2YgdGhlIHNhbWUgZWxlbWVudCFcIiwgMiwgcG9zLCAwLCBCYXR0bGVSZW5kZXIuQ29sb3JzLmlucHV0S2V5LCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IpO1xyXG5cclxuICAgICAgICAgICAgZXhwbGFuYXRpb25FbnRpdHkuT3JpZ2luLlNldEN1cnNvckF0KDAsIDApO1xyXG4gICAgICAgICAgICBpZiAoIW1vZGVsLmJhdHRsZUludHJvTW9kZSl7XHJcbiAgICAgICAgICAgICAgICBleHBsYW5hdGlvbkVudGl0eS5PcmlnaW4uRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoXCJJbnB1dCB5b3VyIGNvbW1hbmRzIGFuZCB3YXRjaCB0aGUgdHVybiBwbGF5IG91dC4gUGxhbiB5b3VyIG1vdmVzIGJhc2VkIG9uIHdoYXQgdGhlIGVuZW15IHdpbGwgZG8hXCIsIEJhdHRsZVJlbmRlci5Db2xvcnMuSW5wdXREZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBleHBsYW5hdGlvbkVudGl0eS5PcmlnaW4uQ3Vyc29yTmV3TGluZSgwKTtcclxuICAgICAgICAgICAgICAgIGV4cGxhbmF0aW9uRW50aXR5Lk9yaWdpbi5DdXJzb3JOZXdMaW5lKDApO1xyXG4gICAgICAgICAgICAgICAgZXhwbGFuYXRpb25FbnRpdHkuT3JpZ2luLkRyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKFwiQXR0YWNrcyBoYXZlIHRocmVlIGVsZW1lbnRzLCBGaXJlLCBUaHVuZGVyIGFuZCBJY2UuIEZpcmUgYmVhdHMgSWNlLCBJY2UgYmVhdHMgVGh1bmRlciwgVGh1bmRlciBiZWF0cyBGaXJlLlwiLCBCYXR0bGVSZW5kZXIuQ29sb3JzLklucHV0RGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgZXhwbGFuYXRpb25FbnRpdHkuT3JpZ2luLkN1cnNvck5ld0xpbmUoMCk7XHJcbiAgICAgICAgICAgICAgICBleHBsYW5hdGlvbkVudGl0eS5PcmlnaW4uQ3Vyc29yTmV3TGluZSgwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBleHBsYW5hdGlvbkVudGl0eS5PcmlnaW4uRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoXCJUaGUgZWxlbWVudCBvZiB0aGUgYXR0YWNrZXIgY2hhbmdlcyB1cG9uIGF0dGFja2luZy4gQXR0YWNrZXJzIGFyZSBpbW11bmUgdG8gYXR0YWNrcyBvZiB0aGUgc2FtZSBlbGVtZW50IVwiLCBCYXR0bGVSZW5kZXIuQ29sb3JzLklucHV0RGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgcG9zICs9IDE1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBwb3MgPSA1O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0ZXh0V29ybGQuRHJhdygpO1xyXG5cclxuICAgICAgICAgICAgLy90ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdXaXRoTGluZWJyZWFrcyhcIklucHV0IHlvdXIgY29tbWFuZHMgYW5kIHdhdGNoIHRoZSB0dXJuIHBsYXkgb3V0LiBZb3UgY2FuIHNlZSBldmVyeXRoaW5nIHlvdXIgZW5lbWllcyB3aWxsIGRvXFxuXCIsIDIsIHBvcywgMiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5JbnB1dERlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXcoXCJZT1VSIENPTU1BTkRTXCIsIDIsIHBvcy0yLCBCYXR0bGVSZW5kZXIuQ29sb3JzLmlucHV0S2V5KTtcclxuICAgICAgICAgICAgc3RyaW5nIG1lbnVUaXRsZSA9IFwiSEVMUFwiO1xyXG4gICAgICAgICAgICBzdHJpbmcgbGVhdmVMYWJlbCA9IFwiRVhJVFwiO1xyXG4gICAgICAgICAgICBpZiAobW9kZWwuYmF0dGxlSW50cm9Nb2RlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZWF2ZUxhYmVsID0gXCJTVEFSVFwiO1xyXG4gICAgICAgICAgICAgICAgbWVudVRpdGxlID0gXCJCQVRUTEUgSU5UUk9cIjtcclxuICAgICAgICAgICAgICAgIExlYXZlQnV0dG9uID0gKGNoYXIpVW5pY29kZS5TcGFjZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIExlYXZlQnV0dG9uID0gJ3gnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVySG9yaXpvbnRhbChtZW51VGl0bGUsIEJhdHRsZVJlbmRlci5Db2xvcnMuV2luZG93TGFiZWwsIDAsIDEpO1xyXG5cclxuICAgICAgICAgICAgTGlzdDxpbnQ+IGNvbW1hbmRMaXN0ID0gbW9kZWwuY29tbWFuZHNIZXJvO1xyXG4gICAgICAgICAgICBwb3MgPSBTaG93Q29tbWFuZHMocG9zLCBjb21tYW5kTGlzdCk7XHJcbiAgICAgICAgICAgIHBvcyArPSA0O1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXcoXCJFTkVNWSBDT01NQU5EU1wiLCAyLCBwb3MsIEJhdHRsZVJlbmRlci5Db2xvcnMuaW5wdXRLZXkpO1xyXG4gICAgICAgICAgICBwb3MgKz0gMjtcclxuICAgICAgICAgICAgcG9zID0gU2hvd0NvbW1hbmRzKHBvcywgbW9kZWwuY29tbWFuZHNFbmVteSk7XHJcblxyXG4gICAgICAgICAgICBHYW1lTWFpbi5EcmF3SW5wdXQoMSwgcG9zICsgMywgTGVhdmVCdXR0b24sIGxlYXZlTGFiZWwsIHRleHRXb3JsZC5tYWluQm9hcmQpO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGludCBTaG93Q29tbWFuZHMoaW50IHBvcywgTGlzdDxpbnQ+IGNvbW1hbmRMaXN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb21tYW5kTGlzdC5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJEUkFXV1dcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaW50IGNvbW1hbmQgPSBjb21tYW5kTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGJvb2wgZHJhd0ZsYWcgPSBDaGVja0RyYXdDb21tYW5kKGNvbW1hbmQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRyYXdGbGFnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhdyhtb3ZlUmVuZGVyc1tjb21tYW5kXS5BYnJldiwgMiwgcG9zLCBCYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXcobW92ZVJlbmRlcnNbY29tbWFuZF0uTGFiZWwuVG9VcHBlcigpLCA1LCBwb3MsIEJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhdyhtb3ZlUmVuZGVyc1tjb21tYW5kXS5EZXNjcmlwdGlvbiwgMywgcG9zICsgMSwgQmF0dGxlUmVuZGVyLkNvbG9ycy5JbnB1dERlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3MgKz0gMztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwb3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgSXNTaG93aW5nQ29tbWFuZEluTGlzdChMaXN0PGludD4gY29tbWFuZExpc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvbW1hbmRMaXN0LkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkRSQVdXV1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnQgY29tbWFuZCA9IGNvbW1hbmRMaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKENoZWNrRHJhd0NvbW1hbmQoY29tbWFuZCkpIHJldHVybiB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBDaGVja0RyYXdDb21tYW5kKGludCBjb21tYW5kKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYm9vbCBkcmF3RmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoY29tbWFuZCA+PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKGNvbW1hbmQpO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1kID0gbW92ZURhdGFzW2NvbW1hbmRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtZC5IYXNUYWcoKGludClNb3ZlRGF0YVRhZ3MuTW92ZW1lbnQpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYXdGbGFnID0gbW92ZVJlbmRlcnNbY29tbWFuZF0uTGFiZWwuTGVuZ3RoICE9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRyYXdGbGFnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2hvdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbC5SZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBIZWxwTW9kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbC5iYXR0bGVJbnRyb01vZGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSXNXYW5uYVNob3dJbnRybygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbC5SZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gSXNTaG93aW5nQ29tbWFuZEluTGlzdChtb2RlbC5jb21tYW5kc0VuZW15KSB8fCBJc1Nob3dpbmdDb21tYW5kSW5MaXN0KG1vZGVsLmNvbW1hbmRzSGVybyk7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIG1vZGVsLmNvbW1hbmRzRW5lbXkuQ291bnQgIT0gMCB8fCBtb2RlbC5jb21tYW5kc0hlcm8uQ291bnQgIT0gMDtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBNb3VzZUlPIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Nb3VzZT1uZXcgTW91c2VJTygpO31cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGVscFNjcmVlbk1vZGVsXHJcbiAgICB7XHJcbiAgICAgICAgQmF0dGxlTWFpbiBiYXR0bGVNYWluO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PGludD4gY29tbWFuZHNIZXJvID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PGludD4gY29tbWFuZHNFbmVteSA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBwdWJsaWMgYm9vbCBiYXR0bGVJbnRyb01vZGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcHVibGljIEhlbHBTY3JlZW5Nb2RlbChCYXR0bGVNYWluIGJhdHRsZU1haW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJhdHRsZU1haW4gPSBiYXR0bGVNYWluO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZnJlc2hEYXRhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbW1hbmRzSGVyby5DbGVhcigpO1xyXG4gICAgICAgICAgICBBZGRBbGwoYmF0dGxlTWFpbi5wbGF5ZXJIYW5kRml4ZWQsIGNvbW1hbmRzSGVybyk7XHJcbiAgICAgICAgICAgIEFkZEFsbChiYXR0bGVNYWluLnBsYXllckhhbmRVbmZpeGVkLCBjb21tYW5kc0hlcm8pO1xyXG4gICAgICAgICAgICBBZGRBbGwoYmF0dGxlTWFpbi5wbGF5ZXJIYW5kUG9vbCwgY29tbWFuZHNIZXJvKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYmF0dGxlTWFpbi5lbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQWRkQWxsQXJyYXkoaXRlbS5tb3ZlcywgY29tbWFuZHNFbmVteSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkQWxsKExpc3Q8QmF0dGxlTWFpbi5Nb3ZlVHlwZT4gbW92ZXMsIExpc3Q8aW50PiBjb21tYW5kcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBtIGluIG1vdmVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgYSA9IChpbnQpIG07XHJcbiAgICAgICAgICAgICAgICBpZiAoYSA8IDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjb21tYW5kcy5Db250YWlucyhhKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kcy5BZGQoYSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZGRBbGxBcnJheShpbnRbXSBtb3ZlcywgTGlzdDxpbnQ+IGNvbW1hbmRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGEgaW4gbW92ZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChhIDwgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbW1hbmRzLkNvbnRhaW5zKGEpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzLkFkZChhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBJbnB1dEhhbmRsaW5nXHJcbiAgICB7XHJcbiAgICAgICAgaW50W10gdW5maXhlZENvbW1hbmRLZXlzID0geycxJywgJzInLCczJywnNCcgfTtcclxuICAgICAgICBEaWN0aW9uYXJ5PElucHV0LCBpbnQ+IGZpeGVkTW92ZUJ1dHRvbnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxJbnB1dCwgaW50PigpLChfbzEpPT57X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTm9ybWFsU2hvdCksJ2cnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlKSwnZicpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLkljZSksJ2knKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iKSwnYicpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXJCb21iKSwneScpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIpLCd0Jyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0KSwnZCcpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVVcCksJ3cnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93biksJ3MnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCksJ2EnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LkRvbmUpLFVuaWNvZGUuU3BhY2UpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuUmVkbyksJ3InKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LlByZXZpZXcpLCdwJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5IZWxwKSwnaCcpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuQ2FuY2VsKSwncicpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuQ29uZmlybSksVW5pY29kZS5TcGFjZSk7cmV0dXJuIF9vMTt9KTtcclxuXHJcbiAgICAgICAgcHVibGljIGludCBHZXRGaXhlZE1vdmVVbmljb2RlKElucHV0IGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoZml4ZWRNb3ZlQnV0dG9ucy5UcnlHZXRWYWx1ZShpbnB1dCwgb3V0IHZhbHVlKSlcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElucHV0IElucHV0dGVkKGludCB1bmljb2RlS2V5LCBJbnB1dEhvbGRlciBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCIgaW5wdXQgKyBcIisoY2hhcil1bmljb2RlS2V5KTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gZml4ZWRNb3ZlQnV0dG9ucylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uVmFsdWUgPT0gdW5pY29kZUtleSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpbnB1dC5Db250YWlucyhpdGVtLktleSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLktleTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHVuZml4ZWRDb21tYW5kS2V5cy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVuZml4ZWRDb21tYW5kS2V5c1tpXSA9PSB1bmljb2RlS2V5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB1bmZpeGVkQ29tbWFuZFBvcyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaTIgPSAwOyBpMiA8IGlucHV0LmlucHV0cy5Db3VudDsgaTIrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5UYWdJcyhpMiwgSW5wdXRUYWdzLk1PVkVVTkZJWCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1bmZpeGVkQ29tbWFuZFBvcyA9PSBpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dC5pbnB1dHNbaTJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5maXhlZENvbW1hbmRQb3MrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdChJbnB1dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTWVzc2FnZU9uUG9zaXRpb25cclxuICAgIHtcclxuICAgICAgICBCYXR0bGVSZW5kZXIgYmF0dGxlUmVuZGVyO1xyXG4gICAgICAgIHByaXZhdGUgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuICAgICAgICBwcml2YXRlIEJsaW5rQW5pbSBibGlua0FuaW07XHJcblxyXG4gICAgICAgIHB1YmxpYyBNZXNzYWdlT25Qb3NpdGlvbihCYXR0bGVSZW5kZXIgYmF0dGxlUmVuZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZDtcclxuICAgICAgICAgICAgYmxpbmtBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkJsaW5rQW5pbT4obmV3IEJsaW5rQW5pbSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE1lc3NhZ2VPblBvcyhWZWN0b3IyRCBwb3MsIHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGVudGl0eSA9IHRleHRXb3JsZC5HZXRUZW1wRW50aXR5KHYuTGVuZ3RoICsgMiwgNik7XHJcbiAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoZW50aXR5LkFuaW1CYXNlKDJmKSwgbmV3IEJsaW5rQW5pbS5CbGlua0RhdGEoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCAwLjM1ZiwgMC4zNWYpKTtcclxuICAgICAgICAgICAgdmFyIHhPZmYgPSAodi5MZW5ndGggLSAzKSAvIDI7XHJcbiAgICAgICAgICAgIGlmICh4T2ZmIDwgMCkgeE9mZiA9IDA7XHJcbiAgICAgICAgICAgIHZhciBsaW5lU3RhcnQgPSBuZXcgVmVjdG9yMkQoeE9mZiwgMCk7XHJcbiAgICAgICAgICAgIGVudGl0eS5TZXRQb3NpdGlvbihwb3MgKyBuZXcgVmVjdG9yMkQoMSAtIHhPZmYsIDApKTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKHBvcyk7XHJcbiAgICAgICAgICAgIC8vZW50aXR5Lk9yaWdpbi5EcmF3KHYsIDEsIDUpO1xyXG4gICAgICAgICAgICBlbnRpdHkuT3JpZ2luLkRyYXdXaXRoR3JpZCh2LCAwLCAzLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvKTtcclxuXHJcbiAgICAgICAgICAgIGVudGl0eS5PcmlnaW4uRHJhd0xpbmVzKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm8sIGxpbmVTdGFydCwgbGluZVN0YXJ0ICsgbmV3IFZlY3RvcjJEKDIsIDApLCBsaW5lU3RhcnQgKyBuZXcgVmVjdG9yMkQoMiwgMikpO1xyXG4gICAgICAgICAgICBlbnRpdHkuT3JpZ2luLkF1dG9GaXhHcmlkZGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1vdXNlSG92ZXJUZXh0XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdW10gdGV4dHMgPSBuZXcgc3RyaW5nWzNdW107XHJcbiAgICAgICAgcHVibGljIE1vdXNlSG92ZXJNYW5hZ2VyIGhvdmVyTWFuYWdlcjtcclxuICAgICAgICBwdWJsaWMgVGV4dEVudGl0eSBlbnRpdHk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUhvdmVyVGV4dChNb3VzZUhvdmVyTWFuYWdlciBob3Zlck1hbmFnZXIsIFRleHRFbnRpdHkgZW50aXR5LCBzdHJpbmdbXSBtb3ZlRGVzY3JpcHRpb25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ob3Zlck1hbmFnZXIgPSBob3Zlck1hbmFnZXI7XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gZW50aXR5O1xyXG4gICAgICAgICAgICAvL3RleHRzWzBdID0gbmV3IHN0cmluZ1tFbnVtLkdldFZhbHVlcyh0eXBlb2YoQmF0dGxlTWFpbi5Nb3ZlVHlwZSkpLkxlbmd0aF07XHJcblxyXG4gICAgICAgICAgICB0ZXh0c1swXSA9IG1vdmVEZXNjcmlwdGlvbnM7XHJcbiAgICAgICAgICAgIC8vRG9uZSxcclxuICAgICAgICAvLyAgICBSZWRvLFxyXG4gICAgICAgIC8vUHJldmlldyxcclxuICAgICAgICAvL0NvbmZpcm0sXHJcbiAgICAgICAgLy9DYW5jZWxcclxuICAgICAgICAgICAgdGV4dHNbMV0gPSBuZXcgc3RyaW5nW10ge1xyXG4gICAgICAgICAgICAgICAgXCJTdGFydHMgY29tbWFuZCBleGVjdXRpb25cIixcclxuICAgICAgICAgICAgICAgIFwiUmVtb3ZlcyB0aGUgbGFzdCBpbnB1dHRlZCBjb21tYW5kXCIsXHJcbiAgICAgICAgICAgICAgICBcIlByZXZpZXcgbW92ZXMgb2YgdGhlIG9wcG9uZW50c1wiLFxyXG4gICAgICAgICAgICAgICAgXCJJbnB1dHMgbW92ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJSZXR1cm5zXCIsXHJcbiAgICAgICAgICAgICAgICBcIlNob3dzIGhlbHBmdWwgaW5mb3JtYXRpb25cIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGV4dHNbMl0gPSBuZXcgc3RyaW5nW10ge1xyXG4gICAgICAgICAgICAgICAgXCJNb3ZlcyBpbiB0aGUgY29ycmVzcG9uZGluZyBkaXJlY3Rpb25cIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW50aXR5LlJlc2V0RnVsbCgpO1xyXG4gICAgICAgICAgICBob3Zlck1hbmFnZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSBob3Zlck1hbmFnZXIubW91c2VIb3ZlcnNBY3RpdmU7XHJcbiAgICAgICAgICAgIGlmIChhY3RpdmUuQ291bnQgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJIT1ZFUlwiKTtcclxuICAgICAgICAgICAgICAgIGludCBpZCA9IGFjdGl2ZVswXS5pZDtcclxuICAgICAgICAgICAgICAgIGlmKGlkID49IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHRleHQgPSB0ZXh0c1thY3RpdmVbMF0udHlwZV1baWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5PcmlnaW4uRHJhdyh0ZXh0LCAwLCAwLCAyLCBCYXR0bGVSZW5kZXIuQ29sb3JzLkJhY2tCYXR0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGludCB4ID0gYWN0aXZlWzBdLnJlY3QuWCArIDEgLSB0ZXh0Lkxlbmd0aC8yO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4IDwgMCkgeCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5LlNldFBvc2l0aW9uKHgsIGFjdGl2ZVswXS5yZWN0LlkgLTIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcmV2aWV3U3lzdGVtXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBwcml2YXRlIEJhdHRsZU1haW4gYmF0dGxlTWFpbjtcclxuICAgICAgICBwdWJsaWMgYm9vbCBwcmV2aWV3QWN0aXZlO1xyXG4gICAgICAgIHByaXZhdGUgQ2xvbmVkU3RhdGUgY2xvbmVkU3RhdGU7XHJcbiAgICAgICAgcHJpdmF0ZSBRdWlja0FjY2Vzc29yT25lPEJhdHRsZU1haW4uQmF0dGxlRW50aXR5PiBiYXR0bGVFbnRpdHk7XHJcbiAgICAgICAgRGVidWdnZXIgZGVidWcgPSBuZXcgRGVidWdnZXIodHJ1ZSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBQcmV2aWV3U3lzdGVtKEVDU01hbmFnZXIgZWNzLCBCYXR0bGVNYWluIGJhdHRsZU1haW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuICAgICAgICAgICAgZWNzLkFkZENvcHlNZXRob2QodHlwZW9mKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5KSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIG9iamVjdD4pKChvMSwgbzIpPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvID0gbzIgYXMgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZnJvbSA9IG8xIGFzIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdG8ucG9zID0gZnJvbS5wb3M7XHJcbiAgICAgICAgICAgICAgICB0by5saWZlID0gZnJvbS5saWZlO1xyXG4gICAgICAgICAgICAgICAgdG8ubWF4TGlmZSA9IGZyb20ubWF4TGlmZTtcclxuICAgICAgICAgICAgICAgIHRvLmVsZW1lbnQgPSBmcm9tLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRvLm1vdmVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvLm1vdmVzW2ldID0gZnJvbS5tb3Zlc1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBlY3MuQWRkQ29weU1ldGhvZCh0eXBlb2YoQmF0dGxlTWFpbi5CYXR0bGVTdGF0ZSksIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248b2JqZWN0LCBvYmplY3Q+KSgobzEsIG8yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG8gPSBvMiBhcyBCYXR0bGVNYWluLkJhdHRsZVN0YXRlO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZyb20gPSBvMSBhcyBCYXR0bGVNYWluLkJhdHRsZVN0YXRlO1xyXG4gICAgICAgICAgICAgICAgdG8uYWN0aW5nRW50aXR5ID0gZnJvbS5hY3RpbmdFbnRpdHk7XHJcbiAgICAgICAgICAgICAgICB0by5CYXR0bGVFbmRBY3RpdmUgPSBmcm9tLkJhdHRsZUVuZEFjdGl2ZTtcclxuICAgICAgICAgICAgICAgIHRvLm1vdmVUaWNrX05vdyA9IGZyb20ubW92ZVRpY2tfTm93O1xyXG4gICAgICAgICAgICAgICAgdG8ubW92ZVRpY2tfVG90YWwgPSBmcm9tLm1vdmVUaWNrX1RvdGFsO1xyXG4gICAgICAgICAgICAgICAgdG8ucGhhc2UgPSBmcm9tLnBoYXNlO1xyXG4gICAgICAgICAgICAgICAgdG8udHVybiA9IGZyb20udHVybjtcclxuICAgICAgICAgICAgICAgIHRvLnR1cm5zUGVyUGhhc2UgPSBmcm9tLnR1cm5zUGVyUGhhc2U7XHJcbiAgICAgICAgICAgICAgICB0by50b3RhbFR1cm5zID0gZnJvbS50b3RhbFR1cm5zO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIGVjcy5BZGRDb3B5TWV0aG9kKHR5cGVvZihUaW1lU3RhbXApLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPG9iamVjdCwgb2JqZWN0PikoKG8xLCBvMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvID0gbzIgYXMgVGltZVN0YW1wO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZyb20gPSBvMSBhcyBUaW1lU3RhbXA7XHJcbiAgICAgICAgICAgICAgICB0by5DdXJyZW50U25hcCA9IGZyb20uQ3VycmVudFNuYXA7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgZWNzLkFkZENvcHlNZXRob2QodHlwZW9mKEhhcHBIYW5kbGluZy5IYXBwSGFuZGxlU3RhdGUpLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPG9iamVjdCwgb2JqZWN0PikoKG8xLCBvMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvID0gbzIgYXMgSGFwcEhhbmRsaW5nLkhhcHBIYW5kbGVTdGF0ZTtcclxuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gbzEgYXMgSGFwcEhhbmRsaW5nLkhhcHBIYW5kbGVTdGF0ZTtcclxuICAgICAgICAgICAgICAgIHRvLmhpZ2hlc3RIYW5kbGVkID0gZnJvbS5oaWdoZXN0SGFuZGxlZDtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB0aGlzLmJhdHRsZU1haW4gPSBiYXR0bGVNYWluO1xyXG4gICAgICAgICAgICBjbG9uZWRTdGF0ZSA9IG5ldyBDbG9uZWRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBiYXR0bGVFbnRpdHkgPSBlY3MuUXVpY2tBY2Nlc3NvcjE8QmF0dGxlTWFpbi5CYXR0bGVFbnRpdHk+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFN0YXJ0UHJldmlldygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBiYXR0bGVNYWluLmVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkFMTCBFTlRJVElFUyBCRUZPUkUgUFJFVklFV1wiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoaXRlbS5yYW5kb21Qb3NpdGlvbiArIFwiIFJBTkRPTSBQT1NcIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtLlR5cGUgKyBcIiB0eXBlXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoaXRlbS5kcmF3VHVybiArIFwiIGRyYXcgdHVyblwiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KFwiRU5EXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVjcy5DbG9uZVN0YXRlKGNsb25lZFN0YXRlKTtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5iYXR0bGVTdGF0ZS5CYXR0bGVFbmRBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcHJldmlld0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBiYXR0bGVNYWluLmVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5oZXJvKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubGlmZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBpdGVtLm1vdmVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5tb3Zlc1tpXSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiYXR0bGVNYWluLlRpY2soKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEVuZFByZXZpZXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiRW5kIHByZXZpZXdcIik7XHJcbiAgICAgICAgICAgIC8vICAgQ29uc29sZS5SZWFkS2V5KCk7XHJcbiAgICAgICAgICAgIHByZXZpZXdBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShiYXR0bGVNYWluLmVudGl0aWVzLkNvbnRhaW5zKGJhdHRsZUVudGl0eS5Db21wMSgwKSkrXCJYWFhTXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZWNzLlJlc3RvcmVTdGF0ZShjbG9uZWRTdGF0ZSk7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uYmF0dGxlU3RhdGUucGhhc2UgPSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcztcclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGJhdHRsZU1haW4uZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KFwiQUxMIEVOVElUSUVTIEFGVEVSIFBSRVZJRVdcIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KGl0ZW0ucmFuZG9tUG9zaXRpb24rXCIgUkFORE9NIFBPU1wiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KGl0ZW0uVHlwZSArIFwiIHR5cGVcIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtLmRyYXdUdXJuICsgXCIgZHJhdyB0dXJuXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoXCJFTkRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFJlZmxlY3Rpb25UZXN0XHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZWZsZWN0aW9uVGVzdCgpIHtcclxuICAgICAgICAgICAgdmFyIGRlYnVnID0gbmV3IERlYnVnZ2VyKHRydWUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgYmUgPSBuZXcgQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBiZS5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGJlMiA9IG5ldyBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICBiZTIucmFuZG9tUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludCh0eXBlLkdldEZpZWxkKFwicmFuZG9tUG9zaXRpb25cIikuR2V0VmFsdWUoYmUyKS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgZGVidWcuUHJpbnQoYmUyLnJhbmRvbVBvc2l0aW9uICsgXCJcIik7XHJcbiAgICAgICAgICAgIGRlYnVnLlByaW50KGJlKTtcclxuICAgICAgICAgICAgRGVlcENsb25lSGVscGVyLkRlZXBDb3B5UGFydGlhbChiZSwgYmUyKTtcclxuICAgICAgICAgICAgRGVlcENsb25lSGVscGVyLkRlZXBDb3B5UGFydGlhbChiZTIsIGJlKTtcclxuICAgICAgICAgICAgZGVidWcuUHJpbnQoYmUpO1xyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludChiZTIpO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGRlYnVnLlByaW50KHR5cGUuR2V0RmllbGQoXCJyYW5kb21Qb3NpdGlvblwiKS5HZXRWYWx1ZShiZTIpLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludChiZTIucmFuZG9tUG9zaXRpb24rXCJcIik7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlbjtcclxudXNpbmcgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVSZW5kZXIgOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBBdHRhY2tQcmV2aWV3IGF0dGFja1ByZXZpZXc7XHJcbiAgICAgICAgcHJpdmF0ZSBCYXR0bGVNYWluIHR1cm5CYXNlVHJ5O1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgU3RhZ2VEYXRhIHN0YWdlRGF0YTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFByZXZpZXdTeXN0ZW0gcHJldmlld1N5c3RlbTtcclxuICAgICAgICBwcml2YXRlIFBvc2l0aW9uQW5pbWF0aW9uIHBvc0FuaW07XHJcbiAgICAgICAgcHJpdmF0ZSBDaGFyQnlDaGFyQW5pbWF0aW9uIGNoYXJCeUNoYXJBbmltO1xyXG4gICAgICAgIHByaXZhdGUgRGVsYXlzQW5pbWF0aW9uIGRlbGF5QW5pbTtcclxuXHJcbiAgICAgICAgcHVibGljIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBUZXh0Qm9hcmQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIExpc3Q8UGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2U+IGlucHV0UGhhc2VzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IExpc3Q8UGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2U+KCksKF9vMSk9PntfbzEuQWRkKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcyk7X28xLkFkZChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZSAuQ29uZmlybUlucHV0KTtyZXR1cm4gX28xO30pO1xyXG5cclxuICAgICAgICBpbnRlcm5hbCBWZWN0b3IyRCBFbnRpdHlTY3JlZW5Qb3NpdGlvbihpbnQgdXNlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHR1cm5CYXNlVHJ5LmVudGl0aWVzW3VzZXJdLnBvcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBSZWN0IEdldEdyaWRSZWN0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVjdChncmlkT2Zmc2V0eCwgZ3JpZE9mZnNldHksIGdyaWRTY2FsZSAqIDYsIGdyaWRTY2FsZSAqIDMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50IGlucHV0O1xyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBpbnB1dDsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSB2YWx1ZTsgLy9Db25zb2xlLldyaXRlTGluZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwSGFuZGxpbmcgSGFwcEhhbmRsaW5nIHsgZ2V0OyBpbnRlcm5hbCBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0VW5pY29kZSB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIE1vdXNlSU8gTW91c2UgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUhvdmVyTWFuYWdlciBtb3VzZUhvdmVyO1xyXG5cclxuICAgICAgICAvL3B1YmxpYyBMaXN0PERlbGF5ZWRBY3Rpb25zPiB0YXNrcyA9IG5ldyBMaXN0PERlbGF5ZWRBY3Rpb25zPigpO1xyXG4gICAgICAgIERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+IG1vdmVDaGFycztcclxuICAgICAgICBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPiBtb3ZlRGVzY3JpcHRpb25zID0gbmV3IERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+KCk7XHJcbiAgICAgICAgRGljdGlvbmFyeTxNaXNjQmF0dGxlSW5wdXQsIHN0cmluZz4gbWlzY0Rlc2NyaXB0aW9ucyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PE1pc2NCYXR0bGVJbnB1dCwgc3RyaW5nPigpLChfbzIpPT57X28yLkFkZChNaXNjQmF0dGxlSW5wdXQuRG9uZSxcIkRPTkVcIik7X28yLkFkZChNaXNjQmF0dGxlSW5wdXQuUmVkbyxcIlJFRE9cIik7X28yLkFkZChNaXNjQmF0dGxlSW5wdXQuSGVscCxcIkhFTFBcIik7X28yLkFkZChNaXNjQmF0dGxlSW5wdXQuUHJldmlldyxcIlBSRVZJRVdcIik7X28yLkFkZChNaXNjQmF0dGxlSW5wdXQuQ29uZmlybSxcIkNPTkZJUk1cIik7X28yLkFkZChNaXNjQmF0dGxlSW5wdXQuQ2FuY2VsLFwiQ0FOQ0VMXCIpO3JldHVybiBfbzI7fSk7XHJcbiAgICAgICAgcHJpdmF0ZSBEaWN0aW9uYXJ5PElucHV0LCBzdHJpbmc+IG1vdmVCdXR0b25zO1xyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgZGVidWdPbiA9IHRydWU7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZ3JpZFNjYWxlID0gNTtcclxuICAgICAgICBwcml2YXRlIGludCBncmlkT2Zmc2V0eCA9IDI7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZ3JpZE9mZnNldHkgPSAxO1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8VGV4dEVudGl0eT4gYmF0dGxlclJlbmRlcnM7XHJcblxyXG4gICAgICAgIGNoYXJbXVtdIGVudGl0aWVzQ2hhcnM7XHJcbiAgICAgICAgcHJpdmF0ZSBib29sIE1lc3NhZ2VEb05vdEhpZGU7XHJcbiAgICAgICAgc3RyaW5nIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCB3YWl0aW5nRm9yTWVzc2FnZUlucHV0O1xyXG4gICAgICAgIHByaXZhdGUgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UgbGFzdFBoYXNlO1xyXG4gICAgICAgIHByaXZhdGUgVGV4dEVudGl0eSBtZXNzYWdlRW50O1xyXG5cclxuICAgICAgICBwdWJsaWMgSW5wdXRIYW5kbGluZyBpbnB1dEggPSBuZXcgSW5wdXRIYW5kbGluZygpO1xyXG4gICAgICAgIHB1YmxpYyBib29sIGhlbHBWaXN1YWxpemVSZXF1ZXN0O1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlUmVuZGVyKEJhdHRsZU1haW4gYmF0dGxlTG9naWMsIFN0YWdlRGF0YSBzdGFnZURhdGEsIFByZXZpZXdTeXN0ZW0gUHJldmlld1N5c3RlbSlcclxuICAgICAgICB7XHJcblxyXG5cclxuICAgICAgICAgICAgc3RyaW5nW10gZW50aXR5VGV4dHMgPSB7IFwiQFwiLCBcIiZcIiwgXCIlXCIsIFwiJFwiLCBcIk9cIiwgXCJYXCIsIFwiSlwiLCBcIllcIiwgXCJaXCIgfTtcclxuICAgICAgICAgICAgZW50aXRpZXNDaGFycyA9IG5ldyBjaGFyW2VudGl0eVRleHRzLkxlbmd0aF1bXTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlbnRpdHlUZXh0cy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZW50aXRpZXNDaGFyc1tpXSA9IGVudGl0eVRleHRzW2ldLlRvQ2hhckFycmF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHR1cm5CYXNlVHJ5ID0gYmF0dGxlTG9naWM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2VEYXRhID0gc3RhZ2VEYXRhO1xyXG4gICAgICAgICAgICBwcmV2aWV3U3lzdGVtID0gUHJldmlld1N5c3RlbTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICBwb3NBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLlBvc2l0aW9uQW5pbWF0aW9uPihuZXcgUG9zaXRpb25BbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIGNoYXJCeUNoYXJBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkNoYXJCeUNoYXJBbmltYXRpb24+KG5ldyBDaGFyQnlDaGFyQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICBkZWxheUFuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuRGVsYXlzQW5pbWF0aW9uPihuZXcgRGVsYXlzQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuSW5pdChHYW1lTWFpbi5XaWR0aCwgR2FtZU1haW4uSGVpZ2h0KTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkID0gdGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICAgICAgLy9UZXh0Qm9hcmQgPSBuZXcgVGV4dEJvYXJkKDcwLCAyNSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBwb3NBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbihuZXcgUG9zaXRpb25BbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHZhciBibGlua0FuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuQmxpbmtBbmltPihuZXcgQmxpbmtBbmltKCkpO1xyXG5cclxuICAgICAgICAgICAgYmF0dGxlclJlbmRlcnMgPSBuZXcgTGlzdDxUZXh0RW50aXR5PigpO1xyXG4gICAgICAgICAgICBVcGRhdGVCYXR0bGVSZW5kZXJDb3VudCgpO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbWVzc2FnZUVudCA9IHRleHRXb3JsZC5HZXRGcmVlRW50aXR5KDQwLCA0KTtcclxuXHJcbiAgICAgICAgICAgIHR1cm5CYXNlVHJ5LmhhcHBNYW5hZ2VyLkFkZEhhbmRsZXIobmV3IEhhcHBzLkhhcHBIYW5kbGVyKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkhhcHBUYWcuQXR0YWNrSGl0LCAoaCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VyID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaC5HZXRBdHRyaWJ1dGVfSW50KDEpXTtcclxuICAgICAgICAgICAgICAgIGludCBkZWZlbmRlckVJRCA9IGguR2V0QXR0cmlidXRlX0ludCgwKTtcclxuICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZUVudGl0eSBkZWZlbmRlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmZW5kZXJFSUQgPj0gMClcclxuICAgICAgICAgICAgICAgICAgICBkZWZlbmRlciA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2RlZmVuZGVyRUlEXTtcclxuICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50KWguR2V0QXR0cmlidXRlX0ludCgyKTtcclxuICAgICAgICAgICAgICAgIFRleHRFbnRpdHkgZmUgPSBHZXRQcm9qVGV4dEVudGl0eShlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmZW5kZXIgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYXR0YWNrZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvczIgPSBkZWZlbmRlci5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgeERpcyA9IE1hdGguQWJzKHBvcy5YIC0gcG9zMi5YKTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCB0aW1lID0gKGZsb2F0KXhEaXMgKiAwLjFmO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoZmUuQW5pbUJhc2UodGltZSksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oYXR0YWNrZXIuUG9zaXRpb25WMkQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGRlZmVuZGVyLlBvc2l0aW9uVjJEKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBhdHRhY2tlci5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zMiA9IHBvcztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZXIuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvczIuWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zMi5YID0gNjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgeERpcyA9IE1hdGguQWJzKHBvcy5YIC0gcG9zMi5YKTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCB0aW1lID0gKGZsb2F0KXhEaXMgKiAwLjFmO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKHRpbWUpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvcyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zMikpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHR1cm5CYXNlVHJ5LmhhcHBNYW5hZ2VyLkFkZEhhbmRsZXIobmV3IEhhcHBzLkhhcHBIYW5kbGVyKEJhdHRsZU1haW4uSGFwcFRhZy5BdHRhY2tNaXNzLCAoaCkgPT5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlciA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2guR2V0QXR0cmlidXRlX0ludCgwKV07XHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSAoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCloLkdldEF0dHJpYnV0ZV9JbnQoMSk7XHJcbiAgICAgICAgICAgICAgICBUZXh0RW50aXR5IGZlID0gR2V0UHJvalRleHRFbnRpdHkoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gYXR0YWNrZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zMiA9IHBvcztcclxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlci5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgICAgICBwb3MyLlggPSAtMTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBwb3MyLlggPSA2O1xyXG4gICAgICAgICAgICAgICAgdmFyIHhEaXMgPSBNYXRoLkFicyhwb3MuWCAtIHBvczIuWCk7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCB0aW1lID0gKGZsb2F0KXhEaXMgKiAwLjFmO1xyXG4gICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoZmUuQW5pbUJhc2UodGltZSksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3MpLFxyXG4gICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zMikpKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIG1vdmVDaGFycyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPigpLChfbzMpPT57X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUsXCJGXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2UsXCJJXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyLFwiVFwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTm9ybWFsU2hvdCxcIkdcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVSaWdodCxVbmljb2RlLlJpZ2h0YXJyb3cyK1wiXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXAsVW5pY29kZS5VcGFycm93MitcIlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24sVW5pY29kZS5Eb3duYXJyb3cyK1wiXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxVbmljb2RlLkxlZnRhcnJvdzIrXCJcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsXCJJQlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXCJUQlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuU3VtbW9uRW50aXR5LFwiU1VcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZyxcIiBcIik7cmV0dXJuIF9vMzt9KTtcclxuXHJcbiAgICAgICAgICAgIG1vdmVEZXNjcmlwdGlvbnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxvYmplY3QsIHN0cmluZz4oKSwoX280KT0+e19vNC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2UsXCJJY2UgU2hvdFwiKTtfbzQuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSxcIkZpcmUgU2hvdFwiKTtfbzQuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlcixcIlRodW5kZXIgU2hvdFwiKTtfbzQuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYixcIkljZSBCb21iXCIpO19vNC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Ob3JtYWxTaG90LFwiR3VuXCIpO19vNC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsVW5pY29kZS5SaWdodGFycm93MitcIlwiKTtfbzQuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwLFVuaWNvZGUuVXBhcnJvdzIrXCJcIik7X280LkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVEb3duLFVuaWNvZGUuRG93bmFycm93MitcIlwiKTtfbzQuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsVW5pY29kZS5MZWZ0YXJyb3cyK1wiXCIpO19vNC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyQm9tYixcIlRodW5kZXIgQm9tYlwiKTtfbzQuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuU3VtbW9uRW50aXR5LFwiU3VtbW9uXCIpO3JldHVybiBfbzQ7fSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWVzT25Qb3MgPSBuZXcgTWVzc2FnZU9uUG9zaXRpb24odGhpcyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBlID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlclJlbmRlcnNbaV0uR2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAvL21lc09uUG9zLk1lc3NhZ2VPblBvcyhCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHR1cm5CYXNlVHJ5LmVudGl0aWVzW2ldLnBvcyksIFwiWU9VXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vTWVzc2FnZU9uUG9zKFZlY3RvcjJELlplcm8sIFwiWU9VXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy9Db25zb2xlLlJlYWRMaW5lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVCYXR0bGVSZW5kZXJDb3VudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3aGlsZSAoYmF0dGxlclJlbmRlcnMuQ291bnQgPCB0aGlzLnR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUZXh0RW50aXR5IGl0ZW0gPSB0ZXh0V29ybGQuR2V0RnJlZUVudGl0eSgyLCAyKTtcclxuICAgICAgICAgICAgICAgIGJhdHRsZXJSZW5kZXJzLkFkZChpdGVtKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uU2V0UG9zaXRpb24oQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbih0dXJuQmFzZVRyeS5lbnRpdGllc1tiYXR0bGVyUmVuZGVycy5Db3VudCAtIDFdLnBvcykpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RyaW5nIEdldEVudGl0eU5hbWUoaW50IHVzZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZ2FtZUVudGl0eSA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW3VzZXJdO1xyXG4gICAgICAgICAgICB2YXIgY2hhcnMgPSBHZXRDaGFyKGdhbWVFbnRpdHkpO1xyXG4gICAgICAgICAgICBzdHJpbmcgbmFtZSA9IG5ldyBzdHJpbmcoY2hhcnMpO1xyXG4gICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5ncmFwaGljUmVwZWF0ZWRJbmRleCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lICsgKGdhbWVFbnRpdHkuZ3JhcGhpY1JlcGVhdGVkSW5kZXggKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVGV4dEVudGl0eSBHZXRQcm9qVGV4dEVudGl0eShQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZmUgPSB0ZXh0V29ybGQuR2V0VGVtcEVudGl0eSgxLCAxKTtcclxuICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKFRleHRCb2FyZC5JTlZJU0lCTEVDSEFSLCAwLCAwKTtcclxuICAgICAgICAgICAgaW50IGVsZW1lbnRDb2xvciA9IEVsZW1lbnRUb1Byb2pDb2xvcihlbGVtZW50KTtcclxuICAgICAgICAgICAgZmUuT3JpZ2luLlNldEJhY2tDb2xvcihlbGVtZW50Q29sb3IsIDAsIDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIElucHV0S2V5IGlucHV0ID0gKElucHV0S2V5KUlucHV0O1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQgIT0gSW5wdXRLZXkuTk9ORSAmJiB3YWl0aW5nRm9yTWVzc2FnZUlucHV0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3YWl0aW5nRm9yTWVzc2FnZUlucHV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2lmIChpbnB1dCAhPSBJbnB1dEtleS5OT05FKSBDb25zb2xlLldyaXRlTGluZShpbnB1dCk7XHJcbiAgICAgICAgICAgIC8vaW50IGlucHV0TnVtYmVyID0gaW5wdXQgLSAnMCc7XHJcbiAgICAgICAgICAgIC8vaWYgKGRlYnVnT24gJiYgaW5wdXQgPT0gJ2snKVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgRGVidWdFeHRyYS5EZWJ1Z0V4LlNob3coKTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICBpZiAobGFzdFBoYXNlICE9IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vU2hvd01lc3NhZ2UoXCJQaWNrIHlvdXIgY29tbWFuZHNcIiwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLlNldEFsbChUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgQ29sb3JzLkZpcmVBdXJhKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdFBoYXNlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJYX19YXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEhpZGVNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuU2V0QWxsKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYXN0UGhhc2UgPSB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZTtcclxuICAgICAgICAgICAgaWYgKGlucHV0UGhhc2VzLkNvbnRhaW5zKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKElucHV0VW5pY29kZSA+PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChJbnB1dFVuaWNvZGUgPT0gJ3AnKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIlBSRVZJRVdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpZXdTeXN0ZW0uU3RhcnRQcmV2aWV3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0WCA9IGlucHV0SC5JbnB1dHRlZChJbnB1dFVuaWNvZGUsIHR1cm5CYXNlVHJ5LmlucHV0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0WC50eXBlID09IElucHV0VHlwZS5NaXNjQmF0dGxlICYmIGlucHV0WC5hcmcxID09IChpbnQpIE1pc2NCYXR0bGVJbnB1dC5IZWxwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVscFZpc3VhbGl6ZVJlcXVlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0WC50eXBlICE9IElucHV0VHlwZS5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0dXJuQmFzZVRyeS5JbnB1dERvbmUoaW5wdXRYKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5pbnB1dHMuaW5wdXRGb3JDb25maXJtYXRpb24udHlwZSAhPSBJbnB1dFR5cGUuTm9uZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAodHVybkJhc2VUcnkuaW5wdXRzLmlucHV0Rm9yQ29uZmlybWF0aW9uLnR5cGUgPT0gSW5wdXRUeXBlLk1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2tQcmV2aWV3LlNob3dQcmV2aWV3KDAsIHR1cm5CYXNlVHJ5LmlucHV0cy5pbnB1dEZvckNvbmZpcm1hdGlvbi5hcmcxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuQ29uZmlybUlucHV0U3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNrUHJldmlldy5FbmQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuSW5wdXRDb25maXJtZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFja1ByZXZpZXcuRW5kKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vZm9yZWFjaCAodmFyIGl0ZW0gaW4gbW92ZUtleXMpXHJcbiAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgIC8vICAgIGlmIChpdGVtLlZhbHVlID09IGlucHV0KVxyXG4gICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHR1cm5CYXNlVHJ5LklucHV0RG9uZShpdGVtLktleSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBVcGRhdGVCYXR0bGVSZW5kZXJDb3VudCgpO1xyXG4gICAgICAgICAgICBEcmF3R3JhcGhpY3MoZGVsdGEpO1xyXG4gICAgICAgICAgICBpZiAoQ2FuQWR2YW5jZV9Mb2dpYygpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UgIT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UgLkV4ZWN1dGVNb3ZlICYmIHByZXZpZXdTeXN0ZW0ucHJldmlld0FjdGl2ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2aWV3U3lzdGVtLkVuZFByZXZpZXcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkVuZW15TW92ZUNob2ljZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuSGFuZFJlY2hhcmdlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0dXJuQmFzZVRyeS5UaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHM6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vU3lzdGVtLlRocmVhZGluZy5UaHJlYWQuU2xlZXAoMzAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9VcGRhdGVCYXR0bGVSZW5kZXJDb3VudCgpO1xyXG4gICAgICAgICAgICAvL0RyYXdHcmFwaGljcyhkZWx0YSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ2FuQWR2YW5jZUdyYXBoaWNzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0V29ybGQuSXNEb25lKCkgJiYgIXdhaXRpbmdGb3JNZXNzYWdlSW5wdXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgQ2FuQWR2YW5jZV9Mb2dpYygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gQ2FuQWR2YW5jZUdyYXBoaWNzKCkgJiYgSGFwcEhhbmRsaW5nLklzRG9uZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2hvd01lc3NhZ2Uoc3RyaW5nIHMsIGJvb2wgd2FpdEZvcklucHV0ID0gdHJ1ZSwgYm9vbCBkb05vdEhpZGUgPSBmYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTWVzc2FnZURvTm90SGlkZSA9IGRvTm90SGlkZTtcclxuICAgICAgICAgICAgbWVzc2FnZSA9IHM7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VFbnQuT3JpZ2luLlJlc2V0SW52aXNpYmxlKCk7XHJcbiAgICAgICAgICAgIGZsb2F0IHRpbWVUb1dyaXRlID0gbWVzc2FnZS5MZW5ndGggKiAwLjAxNWY7XHJcbiAgICAgICAgICAgIGlmICh0aW1lVG9Xcml0ZSA+IDAuNGYpIHRpbWVUb1dyaXRlID0gMC40ZjtcclxuICAgICAgICAgICAgY2hhckJ5Q2hhckFuaW0uQWRkKG1lc3NhZ2VFbnQuQW5pbUJhc2UodGltZVRvV3JpdGUpLCBuZXcgQ2hhckJ5Q2hhckFuaW1hdGlvbi5DaGFyQnlDaGFyRGF0YSgwLCBtZXNzYWdlLkxlbmd0aCArIDEpKTtcclxuICAgICAgICAgICAgZGVsYXlBbmltLkRlbGF5KHRpbWVUb1dyaXRlICsgMC44Zik7XHJcblxyXG4gICAgICAgICAgICAvL3dhaXRpbmdGb3JNZXNzYWdlSW5wdXQgPSB3YWl0Rm9ySW5wdXQ7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIk06IFwiK3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSGlkZU1lc3NhZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHdhaXRpbmdGb3JNZXNzYWdlSW5wdXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiTTogXCIrcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTaG93QmF0dGxlTWVzc2FnZShzdHJpbmcgcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghdHVybkJhc2VUcnkuQmF0dGxlRGVjaWRlZCgpKVxyXG4gICAgICAgICAgICAgICAgU2hvd01lc3NhZ2Uocyk7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIk06IFwiK3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0dyYXBoaWNzKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW91c2VIb3Zlci5tb3VzZUhvdmVycy5DbGVhcigpO1xyXG4gICAgICAgICAgICB0dXJuQmFzZVRyeS5VcGRhdGUoZGVsdGEpO1xyXG4gICAgICAgICAgICAvL2NsZWFyIGdyaWRcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlJlc2V0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5wdXRQaGFzZXMuQ29udGFpbnModHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuU2V0QWxsKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBDb2xvcnMuQmFja2dyb3VuZElucHV0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW50IGNvbnRyb2xzWSA9IGdyaWRTY2FsZSAqIDMgKyAxMCArIDMgKyAyO1xyXG5cclxuICAgICAgICAgICAgaW50IGVuZW15R3JpZE9mZlggPSBncmlkU2NhbGUgKiAzO1xyXG4gICAgICAgICAgICBib29sIGRyYXdEb3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdSZXBlYXRlZCgnICcsIGdyaWRPZmZzZXR4LCBncmlkT2Zmc2V0eSwgZ3JpZFNjYWxlICogNiwgZ3JpZFNjYWxlICogMywgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIENvbG9ycy5CYWNrQmF0dGxlKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCAzICogZ3JpZFNjYWxlOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgMyAqIGdyaWRTY2FsZTsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkcmF3RG90KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdDaGFyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRPZmZzZXR4ICsgaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZE9mZnNldHkgKyBqLCBDb2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0NoYXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkT2Zmc2V0eCArIGkgKyBlbmVteUdyaWRPZmZYLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZE9mZnNldHkgKyBqLCBDb2xvcnMuR3JpZEVuZW15KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgJSBncmlkU2NhbGUgPT0gMCAmJiBqICUgZ3JpZFNjYWxlID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdHcmlkKGkgKyBncmlkT2Zmc2V0eCArIGVuZW15R3JpZE9mZlgsIGogKyBncmlkT2Zmc2V0eSwgZ3JpZFNjYWxlLCBncmlkU2NhbGUsIENvbG9ycy5HcmlkRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0dyaWQoaSArIGdyaWRPZmZzZXR4LCBqICsgZ3JpZE9mZnNldHksIGdyaWRTY2FsZSwgZ3JpZFNjYWxlLCBDb2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5lbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZ2FtZUVudGl0eSA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBlYyA9IEdldENoYXIoZ2FtZUVudGl0eSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IGdhbWVFbnRpdHkuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2NyZWVuUG9zID0gQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbigoQmFzZVV0aWxzLlZlY3RvcjJEKXBvcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5UeXBlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuUG9zLlkgPSBzY3JlZW5Qb3MuWSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuUG9zLlggPSBzY3JlZW5Qb3MuWCAtIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2JhdHRsZXJFbnRpdGllc1tpXS5vcmlnaW4uUG9zaXRpb24gPSBzY3JlZW5Qb3M7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLlBvc2l0aW9uICE9IHNjcmVlblBvcyAmJiB0ZXh0V29ybGQuSXNEb25lKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9iYXR0bGVyUmVuZGVyc1tpXS5PcmlnaW4uUG9zaXRpb24gPSBzY3JlZW5Qb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQgdGltZSA9IDAuMTVmO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGltZSA9IDU7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoYmF0dGxlclJlbmRlcnNbaV0uQW5pbUJhc2UodGltZSksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLlBvc2l0aW9uLCBzY3JlZW5Qb3MsIHRydWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYyA9IENvbG9ycy5IZXJvO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuVHlwZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KSBjID0gQ29sb3JzLkVuZW15O1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuVHlwZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cCkgYyA9IENvbG9ycy5pbnB1dEtleTtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LkRlYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgYyA9IFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUjtcclxuICAgICAgICAgICAgICAgIGludCBiYyA9IFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSBnYW1lRW50aXR5LmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gRWxlbWVudFRvQXVyYUNvbG9yKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LkRlYWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBlYy5MZW5ndGggKyAxOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVyUmVuZGVyc1tpXS5PcmlnaW4uRHJhd0NoYXIoVGV4dEJvYXJkLklOVklTSUJMRUNIQVIsIGosIDAsIGMsIGJjKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZXJSZW5kZXJzW2ldLk9yaWdpbi5EcmF3KGVjLCAwLCAwLCBjLCBiYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuZ3JhcGhpY1JlcGVhdGVkSW5kZXggPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVyUmVuZGVyc1tpXS5PcmlnaW4uRHJhd09uZURpZ2l0KGdhbWVFbnRpdHkuZ3JhcGhpY1JlcGVhdGVkSW5kZXggKyAxLCAwICsgZWMuTGVuZ3RoLCAwLCBjLCBiYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGludCB0ZXh0Qm9hcmRIZWlnaHQgPSAzICogZ3JpZFNjYWxlO1xyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9pbnQgeSA9IDI7XHJcbiAgICAgICAgICAgICAgICAvL2ludCB4ID0gNiAqIGdyaWRTY2FsZSArIDIwO1xyXG5cclxuICAgICAgICAgICAgICAgIGludCB4ID0gMztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXRQaGFzZXMuQ29udGFpbnModHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIERyYXdDb250cm9scyhjb250cm9sc1ksIHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS50aW1lVG9DaG9vc2UgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXQgcmF0aW8gPSB0dXJuQmFzZVRyeS50aW1lVG9DaG9vc2UgLyB0dXJuQmFzZVRyeS50aW1lVG9DaG9vc2VNYXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3UmVwZWF0ZWQoJyAnLCB4LCBjb250cm9sc1kgKyAxNiwgKGludCkocmF0aW8gKiAxNSksIDEsIENvbG9ycy5Cb2FyZCwgQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdSZXBlYXRlZCgnICcsIHggLSAxLCBjb250cm9sc1kgLSAxLCAxNSwgMTUsIENvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGludCB0dXJuT3JkZXJYID0gNiAqIGdyaWRTY2FsZSArIDU7XHJcbiAgICAgICAgICAgIGludCB0dXJuT3JkZXJZID0gMjtcclxuICAgICAgICAgICAgdHVybk9yZGVyWCA9IDI7XHJcbiAgICAgICAgICAgIHR1cm5PcmRlclkgPSAzICogZ3JpZFNjYWxlICsgMTtcclxuICAgICAgICAgICAgaWYgKGlucHV0UGhhc2VzLkNvbnRhaW5zKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlKSlcclxuICAgICAgICAgICAgICAgIHR1cm5PcmRlclkgKz0gNTtcclxuXHJcbiAgICAgICAgICAgIERyYXdUdXJuT3JkZXIodHVybk9yZGVyWCwgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIGlmICghc3RhZ2VEYXRhLmhpZGVMaWZlVUkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdMaWZlKHR1cm5PcmRlclggKyAyNSwgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGludCBYID0gMjtcclxuICAgICAgICAgICAgICAgIC8vY29uc3QgaW50IFkgPSAxNjtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VFbnQuU2V0UG9zaXRpb24oWCwgY29udHJvbHNZIC0gMik7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSAhPSBudWxsICYmICghQ2FuQWR2YW5jZUdyYXBoaWNzKCkpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdHcmlkKFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG1lc3NhZ2VFbnQuT3JpZ2luLlBvc2l0aW9uLlhJbnQsIG1lc3NhZ2VFbnQuT3JpZ2luLlBvc2l0aW9uLllJbnQsIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG1lc3NhZ2VFbnQuV2lkdGgsIG1lc3NhZ2VFbnQuSGVpZ2h0LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZUVudC5PcmlnaW4uRHJhd0dyaWQoMCwgMCwgNDAsIDQsIENvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUVudC5PcmlnaW4uRHJhd1dpdGhMaW5lYnJlYWtzKG1lc3NhZ2UsIDEsIDAsIDEsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFNZXNzYWdlRG9Ob3RIaWRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VFbnQuT3JpZ2luLlNldEFsbChUZXh0Qm9hcmQuSU5WSVNJQkxFQ0hBUik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3UmVwZWF0ZWQoJyAnLFgsIFksIDQwLCA0LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5DdXJzb3JOZXdMaW5lKDEpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSgxKTtcclxuICAgICAgICAgICAgLy90ZXh0Qm9hcmQuRHJhd19DdXJzb3IodHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UuVG9TdHJpbmcoKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGV4dFdvcmxkLkRyYXdDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuVHJ5RW5kQW5pbWF0aW9ucygpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuQWR2YW5jZVRpbWUoZGVsdGEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKENhbkFkdmFuY2VHcmFwaGljcygpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBIYXBwSGFuZGxpbmcuSGFuZGxlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ2FuQWR2YW5jZUdyYXBoaWNzKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuaGFwcE1hbmFnZXIuVHJ5SGFuZGxlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9pZiAoQ2FuQWR2YW5jZSgpKVxyXG4gICAgICAgICAgICAvL3tcclxuXHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgRWxlbWVudFRvQXVyYUNvbG9yKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBiYyA9IFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUjtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5GaXJlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5GaXJlQXVyYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkljZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuSWNlQXVyYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLlRodW5kZXJBdXJhO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYmM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBFbGVtZW50VG9Qcm9qQ29sb3IoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGJjID0gQ29sb3JzLmlucHV0S2V5O1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkZpcmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLkZpcmVTaG90O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuSWNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5JY2VBdXJhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuVGh1bmRlckF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBiYztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRCBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKEJhc2VVdGlscy5WZWN0b3IyRCBwb3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgeCA9IHBvcy5YO1xyXG4gICAgICAgICAgICB2YXIgeSA9IHBvcy5ZO1xyXG4gICAgICAgICAgICB2YXIgc2NyZWVuUG9zID0gbmV3IEJhc2VVdGlscy5WZWN0b3IyRCh4ICogZ3JpZFNjYWxlICsgZ3JpZFNjYWxlIC8gMiArIGdyaWRPZmZzZXR4LCAyICogZ3JpZFNjYWxlIC0geSAqIGdyaWRTY2FsZSArIGdyaWRTY2FsZSAvIDIgKyBncmlkT2Zmc2V0eSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzY3JlZW5Qb3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd0NvbnRyb2xzKGludCB5LCBpbnQgeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdHcmlkKHggLSAyLCB5IC0gMSwgMjAsIDE1LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuU2V0Q3Vyc29yQXQoeCwgeSk7XHJcbiAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKFwiQ29udHJvbHNcIiwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuXHJcbiAgICAgICAgICAgIC8vSW5wdXRUYWdzIGlucHV0VGFnID0gSW5wdXRUYWdzLk1PVkVGSVg7XHJcbiAgICAgICAgICAgIGludCB5T2ZmID0gMDtcclxuICAgICAgICAgICAgeU9mZiA9IERyYXdJbnB1dHNfRml4KHksIHgsIElucHV0VGFncy5NT1ZFRklYLCB5T2ZmKTtcclxuICAgICAgICAgICAgLy95T2ZmKys7XHJcbiAgICAgICAgICAgIHlPZmYgPSBEcmF3SW5wdXRzX0ZpeCh5LCB4LCBJbnB1dFRhZ3MuTUlTQywgeU9mZik7XHJcbiAgICAgICAgICAgIC8veU9mZisrO1xyXG4gICAgICAgICAgICAvL3lPZmYgPSBEcmF3SW5wdXRzX0ZpeCh5LCB4LCBJbnB1dFRhZ3MuTU9WRVVORklYLCB5T2ZmKTtcclxuXHJcbiAgICAgICAgICAgIGludCBhdHRhY2tOdW1iZXIgPSAxO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmlucHV0cy5pbnB1dHMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHgyID0geDtcclxuICAgICAgICAgICAgICAgIGludCB5MiA9IHkgKyAyICsgeU9mZjtcclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHR1cm5CYXNlVHJ5LmlucHV0cy5pbnB1dHNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmlucHV0cy5UYWdJcyhpLCBJbnB1dFRhZ3MuTU9WRVVORklYKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB5T2ZmKys7XHJcbiAgICAgICAgICAgICAgICAgICAgeU9mZisrO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB1bmljb2RlID0gJzAnICsgYXR0YWNrTnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFja051bWJlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdXNlSG92ZXIubW91c2VIb3ZlcnMuQWRkKG5ldyBNb3VzZUhvdmVyKG5ldyBSZWN0KHgyIC0gMiwgeTIsIDIwLCAxKSwgMCwgaW5wdXQuYXJnMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKCdbJywgeDIgLSAxLCB5MiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0NoYXIoJ10nLCB4MiArIGxlbmd0aEJuYW1lLCB5MiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGRlc2NyaXB0aW9uID0gc3RyaW5nLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5Nb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUgbSA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZSlpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlRGVzY3JpcHRpb25zLlRyeUdldFZhbHVlKG0sIG91dCBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXNjcmlwdGlvbiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IG0uVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT0gSW5wdXRUeXBlLk1pc2NCYXR0bGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNaXNjQmF0dGxlSW5wdXQgYXJnMSA9IChNaXNjQmF0dGxlSW5wdXQpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBtaXNjRGVzY3JpcHRpb25zW2FyZzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgVGV4dEJvYXJkID0gdGhpcy5UZXh0Qm9hcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1haW4uRHJhd0lucHV0KHgyLCB5MiwgdW5pY29kZSwgZGVzY3JpcHRpb24sIFRleHRCb2FyZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIGMgPSBtb3ZlQ2hhcnNbbW92ZV07XHJcbiAgICAgICAgICAgICAgICAvL0RyYXdNb3ZlKG1vdmUsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3KGMsIHgyICsgMywgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3V2l0aEdyaWQoYytcIlwiLCB4MiwgeSArIDIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwcml2YXRlIGludCBEcmF3SW5wdXRzX0ZpeChpbnQgeSwgaW50IHgsIElucHV0VGFncyBpbnB1dFRhZywgaW50IHlPZmYpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5pbnB1dHMuaW5wdXRzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCB4MiA9IHg7XHJcbiAgICAgICAgICAgICAgICBpbnQgeTIgPSB5ICsgMiArIHlPZmY7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0dXJuQmFzZVRyeS5pbnB1dHMuaW5wdXRzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5pbnB1dHMuVGFnSXMoaSwgaW5wdXRUYWcpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1bmljb2RlID0gaW5wdXRILkdldEZpeGVkTW92ZVVuaWNvZGUoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBmb3JjZUlucHV0TGFiZWwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBmb3JjZUNvbW1hbmRMYWJlbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBtb3ZlbWVudENvbW1hbmQgPSB1bmljb2RlID09ICd3JztcclxuICAgICAgICAgICAgICAgICAgICBpZiAobW92ZW1lbnRDb21tYW5kKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2VJbnB1dExhYmVsID0gXCJXQVNEXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmNlQ29tbWFuZExhYmVsID0gXCJcIiArIFVuaWNvZGUuVXBhcnJvdzIgKyBVbmljb2RlLkxlZnRhcnJvdzIgKyBVbmljb2RlLkRvd25hcnJvdzIgKyBVbmljb2RlLlJpZ2h0YXJyb3cyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodW5pY29kZSA9PSAnYScgfHwgdW5pY29kZSA9PSAncycgfHwgdW5pY29kZSA9PSAnZCcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgeU9mZisrO1xyXG4gICAgICAgICAgICAgICAgICAgIHlPZmYrKztcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3Q2hhcignWycsIHgyIC0gMSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IGxlbmd0aEJuYW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2VJbnB1dExhYmVsID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aEJuYW1lID0gVGV4dEJvYXJkLkRyYXdVbmljb2RlTGFiZWwodW5pY29kZSwgeDIsIHkyLCBDb2xvcnMuaW5wdXRLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3KGZvcmNlSW5wdXRMYWJlbCwgeDIsIHkyLCBDb2xvcnMuaW5wdXRLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGhCbmFtZSA9IGZvcmNlSW5wdXRMYWJlbC5MZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKCddJywgeDIgKyBsZW5ndGhCbmFtZSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBkZXNjcmlwdGlvbiA9IHN0cmluZy5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTW92ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JjZUNvbW1hbmRMYWJlbCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGZvcmNlQ29tbWFuZExhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUgbSA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZSlpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZURlc2NyaXB0aW9ucy5UcnlHZXRWYWx1ZShtLCBvdXQgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2NyaXB0aW9uID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBtLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTWlzY0JhdHRsZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1pc2NCYXR0bGVJbnB1dCBhcmcxID0gKE1pc2NCYXR0bGVJbnB1dClpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IG1pc2NEZXNjcmlwdGlvbnNbYXJnMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlSG92ZXIubW91c2VIb3ZlcnMuQWRkKG5ldyBNb3VzZUhvdmVyKG5ldyBSZWN0KHgyIC0gMiwgeTIsIDIwLCAxKSwgMSwgaW5wdXQuYXJnMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92ZW1lbnRDb21tYW5kKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VIb3Zlci5tb3VzZUhvdmVycy5BZGQobmV3IE1vdXNlSG92ZXIobmV3IFJlY3QoeDIgLSAyLCB5MiwgMjAsIDEpLCAyLCAwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlSG92ZXIubW91c2VIb3ZlcnMuQWRkKG5ldyBNb3VzZUhvdmVyKG5ldyBSZWN0KHgyIC0gMiwgeTIsIDIwLCAxKSwgMCwgaW5wdXQuYXJnMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhkZXNjcmlwdGlvbiwgeDIgKyAyICsgNSwgeTIsIENvbG9ycy5JbnB1dERlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBjID0gbW92ZUNoYXJzW21vdmVdO1xyXG4gICAgICAgICAgICAgICAgLy9EcmF3TW92ZShtb3ZlLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhdyhjLCB4MiArIDMsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd1dpdGhHcmlkKGMrXCJcIiwgeDIsIHkgKyAyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geU9mZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3TGlmZShpbnQgdHVybk9yZGVyWCwgaW50IHR1cm5PcmRlclkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3R3JpZCh0dXJuT3JkZXJYIC0gMSwgdHVybk9yZGVyWSAtIDEsIDIwLCA5LCBDb2xvcnMuV2luZG93TGFiZWwpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuU2V0Q3Vyc29yQXQodHVybk9yZGVyWCArIDEsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKFwiTGlmZVwiLCBDb2xvcnMuV2luZG93TGFiZWwpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuU2V0Q3Vyc29yQXQodHVybk9yZGVyWCArIDgsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKFwiRWxlbWVudFwiLCBDb2xvcnMuV2luZG93TGFiZWwpO1xyXG4gICAgICAgICAgICBpbnQgaW5kZXggPSAtMTsgLy91c2luZyB0aGlzIGJlY2F1c2Ugbm90IGFsbCB1bml0cyBnZXQgZHJhd25cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5lbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGVcclxuXHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBlID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuZHJhd0xpZmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuRGVhZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCBjb2xvciA9IENvbG9ycy5IZXJvVHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gQ29sb3JzLkVuZW15VHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuZWxlbWVudCAhPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gRWxlbWVudFRvQXVyYUNvbG9yKGUuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd09uZURpZ2l0X0N1cnNvcigoaW50KWUubGlmZS5WYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4T2ZmID0gdHVybk9yZGVyWCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHlPZmYgPSB0dXJuT3JkZXJZICsgMiArIGluZGV4ICogMjtcclxuICAgICAgICAgICAgICAgICAgICAvL0RyYXdFbnRpdHlDaGFyKGUsIGNvbG9yLCB4T2ZmLCB5T2ZmKTtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3Q2hhcihHZXRDaGFyKGUpLCB4T2ZmLCB0dXJuT3JkZXJZICsgMiwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3VHdvRGlnaXRzKChpbnQpZS5saWZlLCB4T2ZmLCB5T2ZmLCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGVsZW1lbnQgPSBzdHJpbmcuRW1wdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuRmlyZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBcIkZpcmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuSWNlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IFwiSWNlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gXCJUaHVuZGVyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZUNvbG9yID0gRWxlbWVudFRvQXVyYUNvbG9yKGUuZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3KGVsZW1lbnQsIHhPZmYgKyA3LCB5T2ZmLCBlQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdPbmVEaWdpdF9DdXJzb3IoKGludCllLmxpZmUuVmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5DdXJzb3JOZXdMaW5lKHg6IDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd1R1cm5PcmRlcihpbnQgdHVybk9yZGVyWCwgaW50IHR1cm5PcmRlclksIGJvb2wgaG9yaXpvbnRhbCA9IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWYWx1ZSB0dXJuc1BlclBoYXNlID0gdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHR1cm5PcmRlclggKyAzLCB0dXJuT3JkZXJZKTtcclxuICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihcIkNvbW1hbmRzXCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcblxyXG4gICAgICAgICAgICBpbnQgZHJhd2luZ0lkID0gLTE7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGUgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmICghZS5kcmF3VHVybilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghZS5EZWFkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYXdpbmdJZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCBjb2xvciA9IENvbG9ycy5IZXJvVHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gQ29sb3JzLkVuZW15VHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuZWxlbWVudCAhPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gRWxlbWVudFRvQXVyYUNvbG9yKGUuZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdPbmVEaWdpdF9DdXJzb3IoKGludCllLmxpZmUuVmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeE9mZiA9IHR1cm5PcmRlclggKyAxICsgZHJhd2luZ0lkICogMztcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeUVudGl0eSA9IHR1cm5PcmRlclkgKyAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB5Rmlyc3RNb3ZlID0gdHVybk9yZGVyWSArIDM7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHhGaXJzdE1vdmUgPSB4T2ZmO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChob3Jpem9udGFsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeE9mZiA9IHR1cm5PcmRlclg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHlFbnRpdHkgPSB0dXJuT3JkZXJZICsgMiArIGRyYXdpbmdJZCAqIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHlGaXJzdE1vdmUgPSB5RW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4Rmlyc3RNb3ZlID0gdHVybk9yZGVyWCArIDM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIERyYXdFbnRpdHlDaGFyKGUsIGNvbG9yLCB4T2ZmLCB5RW50aXR5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHhGaXJzdE1vdmUsIHlGaXJzdE1vdmUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpMiA9IDA7IGkyIDwgdHVybnNQZXJQaGFzZTsgaTIrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBjb2xvcjIgPSBjb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGJhY2tDb2xvciA9IENvbG9ycy5CYWNrQ29tbWFuZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlID09IEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkcmF3aW5nSWQgPT0gdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5ICYmIGkyID09IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnR1cm4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbG9yMiA9IENvbG9ycy5IZXJvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tDb2xvciA9IENvbG9ycy5CYWNrQmF0dGxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yMiA9IENvbG9ycy5JbnB1dERlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkyIDwgdHVybnNQZXJQaGFzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGMgPSBHZXRDaGFyT2ZNb3ZlKGUsIGkyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlSG92ZXIubW91c2VIb3ZlcnMuQWRkKG5ldyBNb3VzZUhvdmVyKG5ldyBSZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5DdXJzb3JYLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5DdXJzb3JZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsIGUubW92ZXNbaTJdKSk7IC8vYWRkIGhlcmUuLi4/IEBfQFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihjLCBjb2xvcjIsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaG9yaXpvbnRhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gYy5MZW5ndGg7IGogPCAzOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuQWR2YW5jZUN1cnNvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd19DdXJzb3IoJyAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcignICcsIGNvbG9yLCBDb2xvcnMuQmFja0NvbW1hbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChob3Jpem9udGFsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoeDogeEZpcnN0TW92ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoeDogMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3RW50aXR5Q2hhcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZSwgaW50IGNvbG9yLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjaGFyW10gY2hhcnMgPSBHZXRDaGFyKGUpO1xyXG5cclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoY2hhcnMsIHgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgaWYgKGUuZ3JhcGhpY1JlcGVhdGVkSW5kZXggPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd09uZURpZ2l0KGUuZ3JhcGhpY1JlcGVhdGVkSW5kZXggKyAxLCB4ICsgY2hhcnMuTGVuZ3RoLCB5LCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIEdldENoYXJPZk1vdmUoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZSwgaW50IGkyKVxyXG4gICAgICAgIHtcclxuXHJcblxyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSBlLm1vdmVzW2kyXTtcclxuICAgICAgICAgICAgaWYgKHZhbCA+PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdmVDaGFyc1soQmF0dGxlTWFpbi5Nb3ZlVHlwZSl2YWxdO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIgXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2hhcltdIEdldENoYXIoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZ2FtZUVudGl0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRpdGllc0NoYXJzW2dhbWVFbnRpdHkuZ3JhcGhpY107XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdNb3ZlKFZhbHVlIG1vdmUsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChtb3ZlLlZhbCA+PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLk1vdmVUeXBlIG0gPSAoQmF0dGxlTWFpbi5Nb3ZlVHlwZSltb3ZlLlZhbDtcclxuICAgICAgICAgICAgICAgIERyYXdNb3ZlKG0sIGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcignICcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdNb3ZlKEJhdHRsZU1haW4uTW92ZVR5cGUgbW92ZSwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGMgPSBtb3ZlQ2hhcnNbbW92ZV07XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihjLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUZXh0Qm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGNsYXNzIENvbG9yc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBHcmlkSGVybyA9IDE7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgR3JpZEVuZW15ID0gMjtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBIZXJvID0gMztcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBFbmVteSA9IDQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgSGVyb1R1cm4gPSA1O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEVuZW15VHVybiA9IDY7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgaW5wdXRLZXkgPSA3O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEJvYXJkID0gODtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBXaW5kb3dMYWJlbCA9IDk7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgRmlyZUF1cmEgPSAxMDtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBJY2VBdXJhID0gMTE7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgVGh1bmRlckF1cmEgPSAxMjtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBGaXJlU2hvdCA9IDEzO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEljZVNob3QgPSAxNDtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBUaHVuZGVyU2hvdCA9IDE1O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEJhY2tncm91bmRJbnB1dCA9IDE2O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IElucHV0RGVzY3JpcHRpb24gPSAxNztcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBCYWNrQmF0dGxlID0gMTg7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgQmFja0NvbW1hbmQgPSAxOTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIElucHV0S2V5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOT05FLCBMRUZULCBSSUdIVCwgRE9XTiwgVVAsIEZJUkUsIFJFRE8sIERPTkUsXHJcbiAgICAgICAgICAgIElDRSxcclxuICAgICAgICAgICAgVEhVTkRFUixcclxuICAgICAgICAgICAgTk9STUFMU0hPVFxyXG4gICAgICAgIH1cclxuXG5cclxuXHJcbiAgICBcbnByaXZhdGUgaW50IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19JbnB1dFVuaWNvZGU9LTE7fVxyXG5cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuO1xyXG51c2luZyBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmc7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBHYW1lTWFpbiA6IElUZXh0U2NyZWVuX1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgQmF0dGxlTWFpbiBiYXR0bGVNYWluO1xyXG4gICAgICAgIHByaXZhdGUgQmF0dGxlUmVuZGVyIGJhdHRsZVJlbmRlcjtcclxuICAgICAgICBwcml2YXRlIE1vZGVTZWxlY3Rpb25TY3JlZW4gbW9kZVNlbGVjdGlvblNjcmVlbjtcclxuICAgICAgICBJVGV4dFNjcmVlbl8gbWFpbkRyYXc7XHJcbiAgICAgICAgcHJpdmF0ZSBIZWxwU2NyZWVuIGhlbHBTY3JlZW47XHJcbiAgICAgICAgcHJpdmF0ZSBSZXN1bHRTY3JlZW4gcmVzdWx0U2NyZWVuO1xyXG4gICAgICAgIC8vSVRleHRTY3JlZW5bXSBzY3JlZW5zID0gbmV3IElUZXh0U2NyZWVuWzVdO1xyXG4gICAgICAgIGludCBzdGFnZUlkO1xyXG4gICAgICAgIGludFtdIGVuZW15QW1vdW50ID0gbmV3IGludFtdICAgeyAxLCAxLCAyLCAxLCAyLCAzLCAyLCAzLCAxLCAyLCAzLCAzIH07XHJcbiAgICAgICAgaW50W10gdHVybkFtb3VudCA9IG5ldyBpbnRbXSB7IDIsIDQsIDIsIDYsIDQsIDIsIDYsIDQsIDgsIDgsIDYsIDggfTtcclxuICAgICAgICBwcml2YXRlIE1vdXNlSG92ZXJUZXh0IG1vdXNlSG92ZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBHYW1lTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuID0gbmV3IE1vZGVTZWxlY3Rpb25TY3JlZW4oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFJlc2V0KCk7XHJcbiAgICAgICAgICAgIG1vZGVTZWxlY3Rpb25TY3JlZW4ubW9kZSA9IDE7XHJcbiAgICAgICAgICAgIG1vZGVTZWxlY3Rpb25TY3JlZW4ud2FubmFMZWF2ZSA9IDE7XHJcbiAgICAgICAgICAgIG1haW5EcmF3ID0gbW9kZVNlbGVjdGlvblNjcmVlbjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vUmVzZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3ZhciBtb3ZlUmVuZGVySW5mbyA9IG5ldyBNb3ZlUmVuZGVySW5mbygpO1xyXG4gICAgICAgICAgICAvL21vdmVSZW5kZXJJbmZvLkFkZE1vdmVOYW1lcygpO1xyXG4gICAgICAgICAgICBzdHJpbmdbXSBtb3ZlRGVzY3JpcHRpb25zID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgdXBcIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBsZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgZG93blwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIHJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICBcIlNob290cyBmb3J3YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBcIlNob290cyBmaXJlIGZvcndhcmRcIixcclxuICAgICAgICAgICAgICAgIFwiU2hvb3RzIGljZSBmb3J3YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBcIlNob290cyB0aHVuZGVyIGZvcndhcmRcIixcclxuICAgICAgICAgICAgICAgIFwiVGhyb3dzIGljZSBib21iIHRocmVlIHNxdWFyZXMgZm9yd2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJUaHJvd3MgdGh1bmRlciBib21iIHRocmVlIHNxdWFyZXMgZm9yd2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTdW1tb25zIGFub3RoZXIgZW5lbXlcIixcclxuICAgICAgICAgICAgICAgIFwiXCIsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpbnQgbW9kZSA9IG1vZGVTZWxlY3Rpb25TY3JlZW4ubW9kZTtcclxuICAgICAgICAgICAgYm9vbCB0aW1lQXR0YWNrID0gbW9kZVNlbGVjdGlvblNjcmVlbi50aW1lQXR0YWNrO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVjcyA9IEVDU01hbmFnZXIuQ3JlYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBTdGFnZURhdGFDcmVhdG9yIHNkYyA9IG5ldyBTdGFnZURhdGFDcmVhdG9yKGVjcyk7XHJcbiAgICAgICAgICAgIHZhciBzdGFnZXMgPSBlY3MuUXVpY2tBY2Nlc3NvcjE8U3RhZ2VEYXRhPigpO1xyXG4gICAgICAgICAgICAvL3ZhciBzdGFnZXMgPSBzZGMuc3RhZ2VzO1xyXG5cclxuICAgICAgICAgICAgaW50IGQgPSBzdGFnZUlkO1xyXG4gICAgICAgICAgICBpZiAoc3RhZ2VzLkNvdW50IDw9IGQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1haW5EcmF3ID0gbW9kZVNlbGVjdGlvblNjcmVlbjtcclxuICAgICAgICAgICAgICAgIG1vZGVTZWxlY3Rpb25TY3JlZW4uUmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlSWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vZCA9IDIwMDtcclxuICAgICAgICAgICAgaWYgKGQgPj0gZW5lbXlBbW91bnQuTGVuZ3RoKSBkID0gZW5lbXlBbW91bnQuTGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgaW50IG5FbmVtaWVzID0gZW5lbXlBbW91bnRbZF07XHJcblxyXG4gICAgICAgICAgICBCYXR0bGVTZXR1cCBiYXR0bGVTZXR1cCA9IG5ldyBCYXR0bGVTZXR1cChtb2RlLCBzdGFnZUlkLCBlY3MpO1xyXG4gICAgICAgICAgICB2YXIgbW92ZUNyZWF0b3IgPSBiYXR0bGVTZXR1cC5tb3ZlQ3JlYXRvcjtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbiA9IGJhdHRsZVNldHVwLmJhdHRsZU1haW47XHJcbiAgICAgICAgICAgIExpc3Q8TW92ZVJlbmRlckRhdGE+IG1vdmVSZW5kZXJzID0gbW92ZUNyZWF0b3IubW92ZVJlbmRlcnM7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbW92ZVJlbmRlcnMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbW92ZVJlbmRlcnNbaV0uRGVzY3JpcHRpb24gPSBtb3ZlRGVzY3JpcHRpb25zW2ldO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcInswfSB7MX1cIiwgbW92ZVJlbmRlcnNbaV0uTGFiZWwsIG1vdmVSZW5kZXJzW2ldLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBIZWxwU2NyZWVuTW9kZWwgaGVscE1vZGVsID0gbmV3IEhlbHBTY3JlZW5Nb2RlbChiYXR0bGVNYWluKTtcclxuICAgICAgICAgICAgaGVscFNjcmVlbiA9IG5ldyBIZWxwU2NyZWVuKGhlbHBNb2RlbCwgbW92ZVJlbmRlcnMsIG1vdmVDcmVhdG9yLm1vdmVEYXRhcyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcHMgPSBuZXcgUHJldmlld1N5c3RlbShlY3MsIGJhdHRsZU1haW4pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL2Vjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG5ldyBFbmVteVNwYXduRGF0YSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKSk7XHJcbiAgICAgICAgICAgIC8vZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQobmV3IEVuZW15U3Bhd25EYXRhKDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpKTtcclxuXHJcblxyXG4gICAgICAgICAgICBmbG9hdCB0aW1lVG9DaG9vc2UgPSAtMTtcclxuICAgICAgICAgICAgaWYgKHRpbWVBdHRhY2spXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpbWVUb0Nob29zZSA9ICg1ZiAqIHR1cm5BbW91bnRbZF0pICogbkVuZW1pZXM7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiYXR0bGVNYWluLnRpbWVUb0Nob29zZU1heCA9IHRpbWVUb0Nob29zZTtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5Jbml0KCk7XHJcbiAgICAgICAgICAgIGJhdHRsZVJlbmRlciA9IG5ldyBCYXR0bGVSZW5kZXIoYmF0dGxlTWFpbiwgc3RhZ2VEYXRhOnN0YWdlcy5Db21wMShzdGFnZUlkKSwgUHJldmlld1N5c3RlbTpwcyk7XHJcbiAgICAgICAgICAgIG5ldyBBdHRhY2tQcmV2aWV3KGVjcywgYmF0dGxlUmVuZGVyKTtcclxuICAgICAgICAgICAgbmV3IEhhcHBIYW5kbGluZyhiYXR0bGVSZW5kZXIsIGJhdHRsZVNldHVwKTtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChoZWxwU2NyZWVuLklzV2FubmFTaG93SW50cm8oKSkge1xyXG4gICAgICAgICAgICAgICAgaGVscFNjcmVlbi5TaG93KCk7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJhdyA9IGhlbHBTY3JlZW47XHJcbiAgICAgICAgICAgICAgICBoZWxwTW9kZWwuYmF0dGxlSW50cm9Nb2RlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyYXcgPSBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vaGVscFNjcmVlbi5cclxuICAgICAgICAgICAgcmVzdWx0U2NyZWVuID0gbmV3IFJlc3VsdFNjcmVlbigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmVzdWx0U2NyZWVuLmJhdHRsZVJlc3VsdCA9IGJhdHRsZU1haW4uYmF0dGxlUmVzdWx0O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgTW91c2VIb3Zlck1hbmFnZXIgaG92ZXJNYW5hZ2VyID0gbmV3IE1vdXNlSG92ZXJNYW5hZ2VyKE1vdXNlKTtcclxuICAgICAgICAgICAgaG92ZXJNYW5hZ2VyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgQmFzZVV0aWxzLlJlY3QoNSw1LDUsNSksIDAsMCkpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1vdXNlSG92ZXIgPSBuZXcgTW91c2VIb3ZlclRleHQoaG92ZXJNYW5hZ2VyLCBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldEZyZWVFbnRpdHkoNTAsIDEpLCBtb3ZlRGVzY3JpcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIGJhdHRsZVJlbmRlci5tb3VzZUhvdmVyID0gaG92ZXJNYW5hZ2VyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dCB7IHNldCB7IG1haW5EcmF3LklucHV0ID0gdmFsdWU7IH0gZ2V0IHsgcmV0dXJuICdjJzsgfSB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQgeyB2YWx1ZSA9IHJlbWFwLlJlbWFwKHZhbHVlKTsgbWFpbkRyYXcuSW5wdXRVbmljb2RlID0gdmFsdWU7IH0gZ2V0IHsgcmV0dXJuICdjJzsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIE1vdXNlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBVbmljb2RlUmVtYXAgcmVtYXAgPSBuZXcgVW5pY29kZVJlbWFwKCk7XHJcbiAgICAgICAgaW50ZXJuYWwgc3RhdGljIHJlYWRvbmx5IGludCBXaWR0aCA9IDY4O1xyXG4gICAgICAgIGludGVybmFsIHN0YXRpYyByZWFkb25seSBpbnQgSGVpZ2h0ID0gNDY7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEcmF3SW5wdXQoaW50IHgyLCBpbnQgeTIsIGludCB1bmljb2RlLCBzdHJpbmcgZGVzY3JpcHRpb24sIFRleHRCb2FyZCBUZXh0Qm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1VuaWNvZGVMYWJlbCh1bmljb2RlLCB4MiwgeTIsIEJhdHRsZVJlbmRlci5Db2xvcnMuaW5wdXRLZXkpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhkZXNjcmlwdGlvbiwgeDIgKyAyICsgNSwgeTIsIEJhdHRsZVJlbmRlci5Db2xvcnMuSW5wdXREZXNjcmlwdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KGZsb2F0IGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3VzZUhvdmVyLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBtYWluRHJhdy5EcmF3KGYpO1xyXG4gICAgICAgICAgICBtYWluRHJhdy5Nb3VzZSA9IE1vdXNlO1xyXG4gICAgICAgICAgICBpZiAoaGVscFNjcmVlbi53YW5uYUxlYXZlID09IHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhlbHBTY3JlZW4ud2FubmFMZWF2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyYXcgPSBiYXR0bGVSZW5kZXI7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtYWluRHJhdyA9PSBiYXR0bGVSZW5kZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChiYXR0bGVSZW5kZXIuaGVscFZpc3VhbGl6ZVJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWxwU2NyZWVuLlNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICBtYWluRHJhdyA9IGhlbHBTY3JlZW47XHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlUmVuZGVyLmhlbHBWaXN1YWxpemVSZXF1ZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVscFNjcmVlbi5IZWxwTW9kZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGJhdHRsZU1haW4uSXNPdmVyKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhdHRsZU1haW4uSXNWaWN0b3J5KCkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFnZUlkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFNjcmVlbi5FbnRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5EcmF3ID0gcmVzdWx0U2NyZWVuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtYWluRHJhdyA9PSByZXN1bHRTY3JlZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRTY3JlZW4ud2FubmFMZWF2ZSA9PSAxKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1haW5EcmF3ID09IG1vZGVTZWxlY3Rpb25TY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgIGlmIChtb2RlU2VsZWN0aW9uU2NyZWVuLndhbm5hTGVhdmUgPT0gMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbWFpbkRyYXcuR2V0Qm9hcmQoKTtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBNb3VzZUlPIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Nb3VzZT1uZXcgTW91c2VJTygpO31cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlbjtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUmVzdWx0U2NyZWVuIDogSVRleHRTY3JlZW5fXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0V29ybGQgdGV4dFdvcmxkO1xyXG4gICAgICAgIHN0cmluZyB5b3VXaW4gPSBcIllvdSBXaW5cIjtcclxuICAgICAgICBwdWJsaWMgTW91c2VJTyBNb3VzZSB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgc3RyaW5nIHlvdUxvc2UgPSBcIllvdSBsb3NlXCI7XHJcbiAgICAgICAgcHVibGljIEJhdHRsZVJlc3VsdCBiYXR0bGVSZXN1bHQ7XHJcbiAgICAgICAgcHVibGljIFJlc3VsdFNjcmVlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQgPSBuZXcgVGV4dFdvcmxkKCk7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5Jbml0KDYwLCAyNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgd2FubmFMZWF2ZTtcclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dCB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFbnRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3YW5uYUxlYXZlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChJbnB1dFVuaWNvZGUgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3YW5uYUxlYXZlID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdHJpbmcgbWVzc2FnZSA9IHlvdVdpbjtcclxuICAgICAgICAgICAgaWYgKGJhdHRsZVJlc3VsdC5yZXN1bHQgPT0gMikgbWVzc2FnZSA9IHlvdUxvc2U7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKG1lc3NhZ2UsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJTaG90KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHRXb3JsZC5tYWluQm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRlc3RHYW1lIDogSVRleHRHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFRleHRTY3JlZW5Ib2xkZXIgU2NyZWVuSG9sZGVyIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZSBHZXRQYWxldHRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEZWZhdWx0UGFsZXR0ZXMuQzROb3ZlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dFNjcmVlbk4gc2NyZWVuID0gbmV3IFRlc3RTY3JlZW4oKTtcclxuICAgICAgICAgICAgU2NyZWVuSG9sZGVyLlNldEFsbChzY3JlZW4pO1xyXG4gICAgICAgICAgICBzY3JlZW4uSW5pdCh3LCBoKTtcclxuICAgICAgICAgICAgc2NyZWVuLkdldEJvYXJkKCkuRHJhdyhcIlRlc3RcIiwgMCwwLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIFRleHRTY3JlZW5Ib2xkZXIgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1NjcmVlbkhvbGRlcj1uZXcgVGV4dFNjcmVlbkhvbGRlcigpO31cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGVzdFNjcmVlbiA6IFRleHRTY3JlZW5OXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKGZsb2F0IGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlbjtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTW9kZVNlbGVjdGlvblNjcmVlbiA6IElUZXh0U2NyZWVuX1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuICAgICAgICBzdHJpbmcgeW91V2luID0gXCJZb3UgV2luXCI7XHJcbiAgICAgICAgc3RyaW5nIHlvdUxvc2UgPSBcIllvdSBsb3NlXCI7XHJcbiAgICAgICAgcHVibGljIE1vdXNlSU8gTW91c2UgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIGludCBzZWxlY3Rpb247XHJcbiAgICAgICAgcHVibGljIEJhdHRsZVJlc3VsdCBiYXR0bGVSZXN1bHQ7XHJcbiAgICAgICAgcHVibGljIE1vZGVTZWxlY3Rpb25TY3JlZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuSW5pdCg3MCwgMjUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IHdhbm5hTGVhdmU7XHJcbiAgICAgICAgcHVibGljIGludCBtb2RlO1xyXG4gICAgICAgIHB1YmxpYyBib29sIHRpbWVBdHRhY2sgPSBmYWxzZTtcclxuICAgICAgICBwdWJsaWMgaW50IHNjcmVlblN0YWdlO1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0IHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0VW5pY29kZSB7IHNldDsgZ2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEVudGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5SZXNldCgpO1xyXG4gICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5IGlrID0gKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkpIElucHV0O1xyXG4gICAgICAgICAgICBtb2RlID0gLTE7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhdyhcIlByb2dCYXR0bGUgUHJvdG90eXBlIHYwLjNcIiwgMSwgMSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXcoXCJBIGdhbWUgYnkgUGlkcm9oXCIsIDEsIDIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgaWYgKHNjcmVlblN0YWdlID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoaWspXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5MRUZUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5TdGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVBdHRhY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LlJJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5TdGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVBdHRhY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuRE9XTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUF0dGFjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuVVA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbd10gVmFuaWxsYVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNCwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW2FdIEVsZW1lbnRhbFwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNSwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3NdIFZhbmlsbGEgVGltZSBBdHRhY2tcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDYsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIltkXSBFbGVtZW50YWwgVGltZSBBdHRhY2tcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDcsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNjcmVlblN0YWdlID09IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpayA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LlVQKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlrID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuRE9XTilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JlZW5TdGFnZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIkVsZW1lbnRhbCBNb2RlXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiAtNSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIkZpcmUgYmVhdHMgSWNlLCBJY2UgYmVhdHMgVGh1bmRlciwgVGh1bmRlciBiZWF0cyBmaXJlXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiAtMik7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIlNhbWUgZWxlbWVudCA9IG5vIGRhbWFnZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogMCk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIkl0IGlzIGJlc3QgdG8gaGF2ZSBoYWQgc29tZSBleHBlcmllbmNlIHdpdGggdmFuaWxsYSBtb2RlXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiAxKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3ddIFN0YXJ0IEVsZW1lbnRhbCBNb2RlXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA0LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbc10gR28gYmFja1wiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNSwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlID49IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvL3N0cmluZyBtZXNzYWdlID0geW91V2luO1xyXG4gICAgICAgICAgICAvL2lmIChiYXR0bGVSZXN1bHQucmVzdWx0ID09IDIpIG1lc3NhZ2UgPSB5b3VMb3NlO1xyXG4gICAgICAgICAgICAvL3RleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKG1lc3NhZ2UsIENvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGUgPSAtMTtcclxuICAgICAgICAgICAgd2FubmFMZWF2ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCbGlua0FuaW0gOiBUZXh0QW5pbWF0aW9uPEJsaW5rQW5pbS5CbGlua0RhdGE+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBCbGlua0RhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgZmxvYXQgYXV4ID0gcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIGJvb2wgYmxpbmsgPSB0cnVlO1xyXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJsaW5rKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eCAtPSBtYWluRGF0YS5ibGlua0FjdGl2ZVRpbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4IC09IG1haW5EYXRhLmJsaW5rSW5hY3RpdmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXV4IDwgMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBibGluayA9ICFibGluaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWJsaW5rKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFpbkRhdGEuY2hhbmdlSW52aXNpYmxlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5BbmltYXRpb24uU2V0QWxsKG1haW5EYXRhLnRleHQsIG1haW5EYXRhLnRleHRDb2xvciwgbWFpbkRhdGEuYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5BbmltYXRpb24uU2V0QWxsSWZWaXNpYmxlKG1haW5EYXRhLnRleHQsIG1haW5EYXRhLnRleHRDb2xvciwgbWFpbkRhdGEuYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBCbGlua0RhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBjaGFyIHRleHQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgYmFja0NvbG9yLCB0ZXh0Q29sb3I7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBibGlua0FjdGl2ZVRpbWU7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBibGlua0luYWN0aXZlO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBjaGFuZ2VJbnZpc2libGU7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQmxpbmtEYXRhKGNoYXIgdGV4dCwgaW50IGJhY2tDb2xvciwgaW50IHRleHRDb2xvciwgZmxvYXQgYmxpbmtBY3RpdmVUaW1lLCBmbG9hdCBibGlua0luYWN0aXZlLCBib29sIGNoYW5nZU5vQ2hhbmdlQ29sb3IgPSB0cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrQ29sb3IgPSBiYWNrQ29sb3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb2xvciA9IHRleHRDb2xvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxpbmtBY3RpdmVUaW1lID0gYmxpbmtBY3RpdmVUaW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ibGlua0luYWN0aXZlID0gYmxpbmtJbmFjdGl2ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSW52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBCbGlua0RhdGEgQmFja0NvbG9yKGludCBiYWNrQ29sb3IsIGZsb2F0IGJsaW5rRHVyYXRpb24sIGJvb2wgY2hhbmdlTm9DaGFuZ2VDb2xvciA9IHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmxpbmtEYXRhKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIGJhY2tDb2xvciwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIGJsaW5rRHVyYXRpb24sIGJsaW5rRHVyYXRpb24sIGNoYW5nZU5vQ2hhbmdlQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIEJsaW5rRGF0YSBGcm9udENvbG9yKGludCBmcm9udENvbG9yLCBmbG9hdCBibGlua0R1cmF0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJsaW5rRGF0YShUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgZnJvbnRDb2xvciwgIGJsaW5rRHVyYXRpb24sIGJsaW5rRHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIEJsaW5rRGF0YSBDaGFyKGNoYXIgYywgZmxvYXQgYmxpbmtEdXJhdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCbGlua0RhdGEoYywgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBibGlua0R1cmF0aW9uLCBibGlua0R1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENoYXJCeUNoYXJBbmltYXRpb24gOiBUZXh0QW5pbWF0aW9uPENoYXJCeUNoYXJBbmltYXRpb24uQ2hhckJ5Q2hhckRhdGE+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBDaGFyQnlDaGFyRGF0YSBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGEsIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICBmbG9hdCByYXRpbyA9IHByb2dyZXNzIC8gbGVuZ3RoO1xyXG4gICAgICAgICAgICBmbG9hdCBsZW5ndGhUZXh0ID0gbWFpbkRhdGEuY2hhckVuZCAtIG1haW5EYXRhLmNoYXJTdGFydDtcclxuICAgICAgICAgICAgaW50IGxpbmVCcmVha3MgPSAwO1xyXG4gICAgICAgICAgICBpbnQgb2Zmc2V0ZWRQZXJtID0gMDtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IG1haW5EYXRhLmNoYXJTdGFydDsgaSA8IG1haW5EYXRhLmNoYXJFbmQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IG9mZnNldGVkID0gaSArIG9mZnNldGVkUGVybTtcclxuICAgICAgICAgICAgICAgIGludCBsaW5lID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciB0YiA9IGVudGl0eS5BbmltYXRpb247XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0ZWQgPj0gdGIuV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldGVkIC09IHRiLldpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGVudGl0eS5PcmlnaW4uQ2hhckF0KG9mZnNldGVkLCBsaW5lICsgbGluZUJyZWFrcykgPT0gJ1xcbicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUJyZWFrcysrO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldGVkUGVybSAtPSBvZmZzZXRlZDtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+ICgobGVuZ3RoVGV4dCAqIHJhdGlvKSArIG1haW5EYXRhLmNoYXJTdGFydCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGIuRHJhd0NoYXIoJyAnLCBvZmZzZXRlZCwgbGluZSArIGxpbmVCcmVha3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGIuRHJhdyhcIlwiICsgaSwgNiwgNSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIENoYXJCeUNoYXJEYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBpbnQgY2hhclN0YXJ0O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBpbnQgY2hhckVuZDtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBDaGFyQnlDaGFyRGF0YShpbnQgY2hhclN0YXJ0LCBpbnQgY2hhckVuZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFyU3RhcnQgPSBjaGFyU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJFbmQgPSBjaGFyRW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K
