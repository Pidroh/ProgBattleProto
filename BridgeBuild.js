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
                        }if (enemyExist) {
                            this.inputs.Add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Preview), Pidroh.ConsoleApp.Turnbased.InputTags.MISC);
                        }
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
                this.debug = new Pidroh.BaseUtils.Debugger(false);
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
                            this.previewSystem.StartPreview();
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VCdWlsZC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvT2JqZWN0Q2xvbmVyLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvRGVidWdnZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9EZWVwQ2xvbmVIZWxwZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9FeHRlbnNpb25zLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvUG9pbnQuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9SYW5kb21TdXBwbGllci5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1JlY3RhbmdsZS5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1RpbWVTdGFtcC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1VuaWNvZGUuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9WZWN0b3IyRC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1ZlY3RvcjNELmNzIiwiLi4vVHVybkJhc2VkTG9naWMvTW92ZURhdGEuY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0FzeW5jVGFza3MuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9CYXR0bGVTZXR1cC5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0JhdHRsZU1haW4uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0NvbG9yU3R1ZmYuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9EZWJ1Z0V4dHJhL0RlYnVnRXguY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9FQ1NJbnRlZ3JhdGlvbi5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0VuZW15QUkuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9TcGF3bkZhY3RvcnkuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9FbmVteURhdGFDcmVhdG9yLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvU3RhZ2VEYXRhLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvTW92ZURhdGFFeGVjdXRlci5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0hhcHBzL0hhcHAuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9JbnB1dEhvbGRlci5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL01vdmVDcmVhdG9yUHJvZy5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9BY2Nlc3Nvci5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9DbG9uZWRTdGF0ZS5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9FQ1NNYW5hZ2VyLmNzIiwiLi4vLi4vVmlzdWFsU3R1ZGlvU29sdXRpb25SbWsvRUNTL0VudGl0eS5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9Qcm9jZXNzb3JGbGV4LmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvVGV4dFdvcmxkLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvUGFsZXR0ZS5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL0dhbWVTY3JlZW4vTW91c2VIb3Zlci5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL0dhbWVTY3JlZW4vVW5pY29kZVJlbWFwLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvVGV4dEJvYXJkLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvR2FtZVNjcmVlbi9JVGV4dFNjcmVlbk4uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0hhcHBIYW5kbGluZy5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvSW5wdXRIYW5kbGluZy5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvTWVzc2FnZU9uUG9zaXRpb24uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL01vdXNlSG92ZXJUZXh0LmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9QcmV2aWV3U3lzdGVtLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9SZWZsZWN0aW9uVGVzdC5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvQmF0dGxlUmVuZGVyLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9HYW1lTWFpbi5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvUmVzdWx0U2NyZWVuLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvR2FtZVNjcmVlbi9UZXN0R2FtZS5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvTW9kZVNlbGVjdGlvblNjcmVlbi5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL0JsaW5rQW5pbWF0aW9uLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvQ2hhckJ5Q2hhckFuaW1hdGlvbi5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7OztZQTREWUE7O1lBRUFBLHFDQUFjQSxtQ0FBUUE7WUFDdEJBLHlCQUFTQTtZQUNUQSxLQUFLQSxXQUFXQSxJQUFJQSxzREFBMEJBOztnQkFHMUNBLDBDQUFPQSxHQUFQQSwyQkFBWUEsaUVBQWtCQSxHQUFsQkE7Ozs7O1lBS2hCQSxZQUFZQTtZQUNaQSxrQkFBa0JBO1lBQ2xCQSwwQkFBMEJBO1lBQzFCQTtZQUNBQTs7OztZQUlBQSw2REFBdUJBLFVBQUNB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QUVBQTs7d0JBSUFBLFFBQVFBLENBQUNBOzs7Z0JBR2pCQSxJQUFJQSxDQUFDQTtvQkFFREEsSUFBSUE7d0JBRUFBLHdCQUF3QkEsZUFBZUEsb0JBQW9CQTs7d0JBRzNEQSxpQ0FBaUNBLGVBQWVBLG9CQUFvQkE7Ozs7Ozs7Ozs7O2dDQ3BDcERBLFFBQW1CQSxVQUF5QkEsVUFBZ0JBO2dCQUVwRkEsNEhBQVlBLFFBQVFBLFVBQVVBLFVBQVVBO2dCQUN4Q0EsWUFBY0EsV0FBV0E7Z0JBQ3pCQSxpQkFBbUJBLG9CQUFtQkE7Z0JBQ3RDQTtnQkFDQUE7Z0JBQ0FBLEtBQUtBLFFBQVFBLG9CQUFvQkEsSUFBSUEsa0JBQWtCQTtvQkFFbkRBLGVBQWVBLEtBQUlBO29CQUNuQkE7b0JBQ0FBLFNBQVNBOzs7b0JBR1RBLE9BQU9BLFlBQVlBO3dCQUVmQTt3QkFDQUEsdUJBQVlBOztvQkFFaEJBLElBQUlBLHFCQUFxQkEsVUFBVUEsU0FBT0E7d0JBRXRDQTt3QkFDQUEsK0JBQWdCQTt3QkFDaEJBOztvQkFFSkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsYUFBYUEsU0FBU0E7d0JBRTVCQSxnQkFBaUJBLFVBQVVBLFNBQU9BOzs7Ozs7Ozs7Ozs7Z0NsQjRKbEJBLFFBQW1CQSxVQUF1QkEsVUFBZ0JBO2dCQUVsRkEsd0hBQVlBLFFBQVFBLFVBQVVBLFVBQVVBO2dCQUN4Q0EsYUFBbUJBO2dCQUNuQkEsSUFBSUE7b0JBQ0FBLFNBQVNBOztnQkFDYkEsa0JBQWtCQSw2Q0FBNEJBLGlDQUF3QkEsK0JBQXNCQSxXQUFXQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxuLy91c2luZyBFQ1M7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nO1xyXG4vL3VzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2VCdWlsZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IGJ1ZmZlcjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIGJ1ZmZlck9uO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgSFRNTFByZUVsZW1lbnQgdGV4dDtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBHYW1lTWFpbiBncjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBUZXh0Qm9hcmQgVGV4dEJvYXJkO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgU3RyaW5nQnVpbGRlciBzYjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmdbXSBjb2xvcnM7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IGJ1ZmZlclVuaWNvZGUgPSAtMTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBUZXh0Qm9hcmQgYXV4O1xyXG4gICAgICAgIHN0YXRpYyBEYXRlVGltZSBsYXN0ID0gRGF0ZVRpbWUuTm93O1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGJvb2wgQ2FuRHJhdztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBTZXR1cEdhbWUob3V0IEdhbWVNYWluIGdyLCBvdXQgVGV4dEJvYXJkIFRleHRCb2FyZClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBSYW5kb20gcm5kID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgICAgICBSYW5kb21TdXBwbGllci5HZW5lcmF0ZSA9ICgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZmxvYXQpcm5kLk5leHREb3VibGUoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGdyID0gbmV3IEdhbWVNYWluKCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZCA9IGdyLkdldEJvYXJkKCk7XHJcbiAgICAgICAgICAgIGF1eCA9IG5ldyBUZXh0Qm9hcmQoMzAwLCAzMDApO1xyXG5cclxuXHJcbiAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBCbGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgaSA9IDM7XHJcbiAgICAgICAgICAgIHB1YmxpYyBCcmlkZ2VCdWlsZC5BcHAuVmVjdG9yIHBvcyA9IG5ldyBCcmlkZ2VCdWlsZC5BcHAuVmVjdG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgVmVjdG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgZmxvYXQgeDtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL0RlZXBDbG9uZUhlbHBlci5kZWJ1Zy5BY3RpdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAvL25ldyBSZWZsZWN0aW9uVGVzdCgpO1xyXG4gICAgICAgICAgICBUZXN0RW50aXR5U3lzdGVtKCk7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJHYW1lIFN0YXJ0XCIpO1xyXG4gICAgICAgICAgICBTZXR1cEdhbWUob3V0IGdyLCBvdXQgVGV4dEJvYXJkKTtcclxuICAgICAgICAgICAgY29sb3JzID0gbmV3IHN0cmluZ1szMF07XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgQ29sb3JTdHVmZi5jb2xvcnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb2xvcnNbaV0gPSBDb2xvclN0dWZmLmNvbG9yc1tpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBuZXcgSFRNTFN0eWxlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBzdHlsZS5Jbm5lckhUTUwgPSBcImh0bWwsYm9keSB7Zm9udC1mYW1pbHk6IENvdXJpZXI7IGJhY2tncm91bmQtY29sb3I6IzFmMjUyNjsgaGVpZ2h0OiAxMDAlOyBjb2xvcjojODg4O31cIiArIFwiXFxuICNjYW52YXMtY29udGFpbmVyIHt3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyB0ZXh0LWFsaWduOmNlbnRlcjsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfSBcIjtcclxuICAgICAgICAgICAgRG9jdW1lbnQuSGVhZC5BcHBlbmRDaGlsZChzdHlsZSk7XHJcbiAgICAgICAgICAgIGJ1ZmZlciA9IDk7XHJcbiAgICAgICAgICAgIGJ1ZmZlck9uID0gZmFsc2U7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIERvY3VtZW50Lk9uS2V5UHJlc3MgKz0gKEtleWJvYXJkRXZlbnQgYSkgPT5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGludCBjb2RlID0gYS5LZXlDb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUgPT0gMCkgY29kZSA9IGEuQ2hhckNvZGU7XHJcbiAgICAgICAgICAgICAgICBpbnQgdW5pY29kZSA9IGNvZGU7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJVbmljb2RlID0gdW5pY29kZTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZSh1bmljb2RlKTtcclxuICAgICAgICAgICAgICAgIC8vYnVmZmVyID0gYS5DaGFyQ29kZTtcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBVcGRhdGVHYW1lKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZnRlciBidWlsZGluZyAoQ3RybCArIFNoaWZ0ICsgQikgdGhpcyBwcm9qZWN0LCBcclxuICAgICAgICAgICAgLy8gYnJvd3NlIHRvIHRoZSAvYmluL0RlYnVnIG9yIC9iaW4vUmVsZWFzZSBmb2xkZXIuXHJcblxyXG4gICAgICAgICAgICAvLyBBIG5ldyBicmlkZ2UvIGZvbGRlciBoYXMgYmVlbiBjcmVhdGVkIGFuZFxyXG4gICAgICAgICAgICAvLyBjb250YWlucyB5b3VyIHByb2plY3RzIEphdmFTY3JpcHQgZmlsZXMuIFxyXG5cclxuICAgICAgICAgICAgLy8gT3BlbiB0aGUgYnJpZGdlL2luZGV4Lmh0bWwgZmlsZSBpbiBhIGJyb3dzZXIgYnlcclxuICAgICAgICAgICAgLy8gUmlnaHQtQ2xpY2sgPiBPcGVuIFdpdGguLi4sIHRoZW4gY2hvb3NlIGFcclxuICAgICAgICAgICAgLy8gd2ViIGJyb3dzZXIgZnJvbSB0aGUgbGlzdFxyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBhcHBsaWNhdGlvbiB3aWxsIHRoZW4gcnVuIGluIGEgYnJvd3Nlci5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgVGVzdEVudGl0eVN5c3RlbSgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgVXBkYXRlR2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoQ2FuRHJhdylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGF0ZVRpbWUgbm93ID0gRGF0ZVRpbWUuTm93O1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlY3MgPSAobm93IC0gbGFzdCkuVG90YWxTZWNvbmRzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlY3MgPiAwLjA4KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoc2Vjcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VjcyA9IDAuMDg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkID0gZ3IuR2V0Qm9hcmQoKTtcclxuICAgICAgICAgICAgICAgIGdyLkRyYXcoKGZsb2F0KXNlY3MpO1xyXG4gICAgICAgICAgICAgICAgbGFzdCA9IG5vdztcclxuICAgICAgICAgICAgICAgIGdyLklucHV0VW5pY29kZSA9IGJ1ZmZlclVuaWNvZGU7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJVbmljb2RlID0gLTE7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG1vdXNlWCA9IFNjcmlwdC5DYWxsPGludD4oXCJnZXRNb3VzZVhcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW91c2VZID0gU2NyaXB0LkNhbGw8aW50PihcImdldE1vdXNlWVwiKTtcclxuICAgICAgICAgICAgICAgIGdyLk1vdXNlLnBvcyA9IG5ldyBQb2ludDJEKG1vdXNlWCwgbW91c2VZKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLzs7U2NyaXB0LkNhbGwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgVGV4dEJvYXJkLkhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgVGV4dEJvYXJkLldpZHRoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWF1eC5TYW1lQXMoVGV4dEJvYXJkLCB4OiBpLCB5OiBqKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50IHRjSSA9IFRleHRCb2FyZC5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgY29sb3IgPSBjb2xvcnNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGNJIDwgMCkgeyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRjSSA+PSBjb2xvcnMuTGVuZ3RoKSB7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gY29sb3JzW3RjSV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgYmFja0NvbG9yID0gY29sb3JzW1RleHRCb2FyZC5CYWNrQ29sb3JbaSwgal1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhciBAY2hhciA9IFRleHRCb2FyZC5DaGFyQXQoaSwgaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTY3JpcHQuQ2FsbChcImRyYXdcIiwgaSwgaiwgY29sb3IsIGJhY2tDb2xvciwgXCJcIiArIEBjaGFyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eC5Db3B5KFRleHRCb2FyZCwgeDogaSwgeTogaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NjcmlwdC5DYWxsKFwiZHJhd1wiLCBpLCBqLCBjb2xvcnNbVGV4dEJvYXJkLlRleHRDb2xvcltpLCBqXV0sIGNvbG9yc1tUZXh0Qm9hcmQuQmFja0NvbG9yW2ksIGpdXSwgXCJ4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDYW5EcmF3ID0gU2NyaXB0LkNhbGw8Ym9vbD4oXCJpc1JlYWR5VG9EcmF3XCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgV2luZG93LlNldFRpbWVvdXQoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbilVcGRhdGVHYW1lLCAxNSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscy5BcnJheUV4dGVuc2lvbnM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5SZWZsZWN0aW9uO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgT2JqZWN0RXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IE1ldGhvZEluZm8gQ2xvbmVNZXRob2QgPSB0eXBlb2YoT2JqZWN0KS5HZXRNZXRob2QoXCJNZW1iZXJ3aXNlQ2xvbmVcIiwgQmluZGluZ0ZsYWdzLk5vblB1YmxpYyB8IEJpbmRpbmdGbGFncy5JbnN0YW5jZSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBJc1ByaW1pdGl2ZU1ldGhvZCh0aGlzIFR5cGUgdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IHR5cGVvZihTdHJpbmcpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gdHlwZW9mKGludCkpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSB0eXBlb2YoZmxvYXQpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gdHlwZW9mKGRvdWJsZSkpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSB0eXBlb2YoY2hhcikpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAvL2Jvb2wgaXNQcmltaXRpdmUgPSB0eXBlLklzUHJpbWl0aXZlO1xyXG4gICAgICAgICAgICBib29sIGlzVmFsdWVUeXBlID0gdHlwZS5Jc1ZhbHVlVHlwZTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzVmFsdWVUeXBlOyAvLyYgaXNQcmltaXRpdmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIE9iamVjdCBDb3B5KHRoaXMgT2JqZWN0IG9yaWdpbmFsT2JqZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEludGVybmFsQ29weShvcmlnaW5hbE9iamVjdCwgbmV3IERpY3Rpb25hcnk8T2JqZWN0LCBPYmplY3Q+KG5ldyBSZWZlcmVuY2VFcXVhbGl0eUNvbXBhcmVyKCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgT2JqZWN0IEludGVybmFsQ29weShPYmplY3Qgb3JpZ2luYWxPYmplY3QsIElEaWN0aW9uYXJ5PE9iamVjdCwgT2JqZWN0PiB2aXNpdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG9yaWdpbmFsT2JqZWN0ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB2YXIgdHlwZVRvUmVmbGVjdCA9IG9yaWdpbmFsT2JqZWN0LkdldFR5cGUoKTtcclxuICAgICAgICAgICAgaWYgKElzUHJpbWl0aXZlTWV0aG9kKHR5cGVUb1JlZmxlY3QpKSByZXR1cm4gb3JpZ2luYWxPYmplY3Q7XHJcbiAgICAgICAgICAgIGlmICh2aXNpdGVkLkNvbnRhaW5zS2V5KG9yaWdpbmFsT2JqZWN0KSkgcmV0dXJuIHZpc2l0ZWRbb3JpZ2luYWxPYmplY3RdO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mKERlbGVnYXRlKS5Jc0Fzc2lnbmFibGVGcm9tKHR5cGVUb1JlZmxlY3QpKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGNsb25lT2JqZWN0ID0gQ2xvbmVNZXRob2QuSW52b2tlKG9yaWdpbmFsT2JqZWN0LCBuZXcgb2JqZWN0W10geyB9KTtcclxuICAgICAgICAgICAgaWYgKHR5cGVUb1JlZmxlY3QuSXNBcnJheSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFycmF5VHlwZSA9IHR5cGVUb1JlZmxlY3QuR2V0RWxlbWVudFR5cGUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChJc1ByaW1pdGl2ZU1ldGhvZChhcnJheVR5cGUpID09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEFycmF5IGNsb25lZEFycmF5ID0gKEFycmF5KWNsb25lT2JqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lZEFycmF5LkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlN5c3RlbS5BcnJheSwgaW50W10+KSgoYXJyYXksIGluZGljZXMpID0+IGFycmF5LlNldFZhbHVlKEludGVybmFsQ29weShjbG9uZWRBcnJheS5HZXRWYWx1ZShpbmRpY2VzKSwgdmlzaXRlZCksIGluZGljZXMpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZpc2l0ZWQuQWRkKG9yaWdpbmFsT2JqZWN0LCBjbG9uZU9iamVjdCk7XHJcbiAgICAgICAgICAgIENvcHlGaWVsZHMob3JpZ2luYWxPYmplY3QsIHZpc2l0ZWQsIGNsb25lT2JqZWN0LCB0eXBlVG9SZWZsZWN0KTtcclxuICAgICAgICAgICAgUmVjdXJzaXZlQ29weUJhc2VUeXBlUHJpdmF0ZUZpZWxkcyhvcmlnaW5hbE9iamVjdCwgdmlzaXRlZCwgY2xvbmVPYmplY3QsIHR5cGVUb1JlZmxlY3QpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xvbmVPYmplY3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlY3Vyc2l2ZUNvcHlCYXNlVHlwZVByaXZhdGVGaWVsZHMob2JqZWN0IG9yaWdpbmFsT2JqZWN0LCBJRGljdGlvbmFyeTxvYmplY3QsIG9iamVjdD4gdmlzaXRlZCwgb2JqZWN0IGNsb25lT2JqZWN0LCBUeXBlIHR5cGVUb1JlZmxlY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodHlwZVRvUmVmbGVjdC5CYXNlVHlwZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSZWN1cnNpdmVDb3B5QmFzZVR5cGVQcml2YXRlRmllbGRzKG9yaWdpbmFsT2JqZWN0LCB2aXNpdGVkLCBjbG9uZU9iamVjdCwgdHlwZVRvUmVmbGVjdC5CYXNlVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBDb3B5RmllbGRzKG9yaWdpbmFsT2JqZWN0LCB2aXNpdGVkLCBjbG9uZU9iamVjdCwgdHlwZVRvUmVmbGVjdC5CYXNlVHlwZSwgQmluZGluZ0ZsYWdzLkluc3RhbmNlIHwgQmluZGluZ0ZsYWdzLk5vblB1YmxpYywgKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5GaWVsZEluZm8sIGJvb2w+KShpbmZvID0+IGluZm8uSXNQcml2YXRlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgQ29weUZpZWxkcyhvYmplY3Qgb3JpZ2luYWxPYmplY3QsIElEaWN0aW9uYXJ5PG9iamVjdCwgb2JqZWN0PiB2aXNpdGVkLCBvYmplY3QgY2xvbmVPYmplY3QsIFR5cGUgdHlwZVRvUmVmbGVjdCwgQmluZGluZ0ZsYWdzIGJpbmRpbmdGbGFncyA9IEJpbmRpbmdGbGFncy5JbnN0YW5jZSB8IEJpbmRpbmdGbGFncy5Ob25QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuUHVibGljIHwgQmluZGluZ0ZsYWdzLkZsYXR0ZW5IaWVyYXJjaHksIEZ1bmM8RmllbGRJbmZvLCBib29sPiBmaWx0ZXIgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAoRmllbGRJbmZvIGZpZWxkSW5mbyBpbiB0eXBlVG9SZWZsZWN0LkdldEZpZWxkcyhiaW5kaW5nRmxhZ3MpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyICE9IG51bGwgJiYgZmlsdGVyKGZpZWxkSW5mbykgPT0gZmFsc2UpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKElzUHJpbWl0aXZlTWV0aG9kKGZpZWxkSW5mby5GaWVsZFR5cGUpKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbEZpZWxkVmFsdWUgPSBmaWVsZEluZm8uR2V0VmFsdWUob3JpZ2luYWxPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsb25lZEZpZWxkVmFsdWUgPSBJbnRlcm5hbENvcHkob3JpZ2luYWxGaWVsZFZhbHVlLCB2aXNpdGVkKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkSW5mby5TZXRWYWx1ZShjbG9uZU9iamVjdCwgY2xvbmVkRmllbGRWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUIENvcHk8VD4odGhpcyBUIG9yaWdpbmFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChUKUNvcHkoKE9iamVjdClvcmlnaW5hbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBSZWZlcmVuY2VFcXVhbGl0eUNvbXBhcmVyIDogRXF1YWxpdHlDb21wYXJlcjxPYmplY3Q+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCB4LCBvYmplY3QgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBSZWZlcmVuY2VFcXVhbHMoeCwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUob2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmouR2V0SGFzaENvZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmFtZXNwYWNlIEFycmF5RXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgQXJyYXlFeHRlbnNpb25zXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRm9yRWFjaCh0aGlzIEFycmF5IGFycmF5LCBBY3Rpb248QXJyYXksIGludFtdPiBhY3Rpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcnJheS5MZW5ndGggPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgQXJyYXlUcmF2ZXJzZSB3YWxrZXIgPSBuZXcgQXJyYXlUcmF2ZXJzZShhcnJheSk7XHJcbiAgICAgICAgICAgICAgICBkbyBhY3Rpb24oYXJyYXksIHdhbGtlci5Qb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAod2Fsa2VyLlN0ZXAoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGNsYXNzIEFycmF5VHJhdmVyc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnRbXSBQb3NpdGlvbjtcclxuICAgICAgICAgICAgcHJpdmF0ZSBpbnRbXSBtYXhMZW5ndGhzO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEFycmF5VHJhdmVyc2UoQXJyYXkgYXJyYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1heExlbmd0aHMgPSBuZXcgaW50W2FycmF5LlJhbmtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBhcnJheS5SYW5rOyArK2kpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3Roc1tpXSA9IGFycmF5LkdldExlbmd0aChpKSAtIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBQb3NpdGlvbiA9IG5ldyBpbnRbYXJyYXkuUmFua107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIFN0ZXAoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFBvc2l0aW9uLkxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbltpXSA8IG1heExlbmd0aHNbaV0pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQb3NpdGlvbltpXSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGk7IGorKylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUG9zaXRpb25bal0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRGVidWdnZXJcclxuICAgIHtcclxuICAgICAgICBib29sIGRlYnVnZ2luZztcclxuICAgICAgICBpbnQgaWRlbnQ7XHJcbiAgICAgICAgU3RyaW5nQnVpbGRlciBzdHJpbmdCdWlsZGVyID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuXHJcbiAgICAgICAgcHVibGljIERlYnVnZ2VyKGJvb2wgZGVidWdnaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5kZWJ1Z2dpbmcgPSBkZWJ1Z2dpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBQcmludChzdHJpbmcgcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZGVidWdnaW5nKSByZXR1cm47XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgaWRlbnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZSgnICcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBEZWlkZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkZW50ID0gaWRlbnQgLSAyOyA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIElkZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkZW50ID0gaWRlbnQrMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWN0aXZlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFjdGl2ZShib29sIHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkZWJ1Z2dpbmcgPSB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUHJpbnQoT2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZGVidWdnaW5nKSByZXR1cm47XHJcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuTGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gb2JqLkdldFR5cGUoKTtcclxuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoXCJUeXBlOiBcIik7XHJcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHR5cGUuTmFtZSk7XHJcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kTGluZSgpO1xyXG4gICAgICAgICAgICB2YXIgZmllbGRzID0gdHlwZS5HZXRGaWVsZHMoQmluZGluZ0ZsYWdzLlB1YmxpYyB8IEJpbmRpbmdGbGFncy5Ob25QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZiBpbiBmaWVsZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKCcgJyk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoZi5HZXRWYWx1ZShvYmopKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKCcgJyk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoZi5OYW1lKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kTGluZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKHN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogTW9kdWxlIEhlYWRlciAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcXFxyXG5Nb2R1bGUgTmFtZTogIERlZXBDbG9uZUhlbHBlci5jc1xyXG5Qcm9qZWN0OiAgICAgIENTRGVlcENsb25lT2JqZWN0XHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuVGhlIGNsYXNzIGNvbnRhaW5zIHRoZSBtZXRob2RzIHRoYXQgaW1wbGVtZW50IGRlZXAgY2xvbmUgdXNpbmcgcmVmbGVjdGlvbi5cclxuXHJcblRoaXMgc291cmNlIGlzIHN1YmplY3QgdG8gdGhlIE1pY3Jvc29mdCBQdWJsaWMgTGljZW5zZS5cclxuU2VlIGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9lbi11cy9vcGVubmVzcy9saWNlbnNlcy5hc3B4I01QTC5cclxuQWxsIG90aGVyIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcblRISVMgQ09ERSBBTkQgSU5GT1JNQVRJT04gSVMgUFJPVklERUQgXCJBUyBJU1wiIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIFxyXG5FSVRIRVIgRVhQUkVTU0VEIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIElNUExJRUQgXHJcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORC9PUiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS5cclxuXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5SZWZsZWN0aW9uO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBEZWVwQ2xvbmVIZWxwZXJcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBEZWJ1Z2dlciBkZWJ1ZyA9IG5ldyBEZWJ1Z2dlcihmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gR2V0IHRoZSBkZWVwIGNsb25lIG9mIGFuIG9iamVjdC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUXCI+VGhlIHR5cGUgb2YgdGhlIG9iai48L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj5JdCBpcyB0aGUgb2JqZWN0IHVzZWQgdG8gZGVlcCBjbG9uZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5SZXR1cm4gdGhlIGRlZXAgY2xvbmUuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBEZWVwQ2xvbmU8VD4oVCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAob2JqID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJPYmplY3QgaXMgbnVsbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKFQpQ2xvbmVQcm9jZWR1cmUob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEZWVwQ29weVBhcnRpYWwoT2JqZWN0IGZyb20sIE9iamVjdCB0bylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChmcm9tID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJPYmplY3QgaXMgbnVsbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDb3B5UHJvY2VkdXJlUGFydGlhbChmcm9tLCB0byk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSBtZXRob2QgaW1wbGVtZW50cyBkZWVwIGNsb25lIHVzaW5nIHJlZmxlY3Rpb24uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj5JdCBpcyB0aGUgb2JqZWN0IHVzZWQgdG8gZGVlcCBjbG9uZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5SZXR1cm4gdGhlIGRlZXAgY2xvbmUuPC9yZXR1cm5zPlxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIG9iamVjdCBDbG9uZVByb2NlZHVyZShPYmplY3Qgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChvYmogPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFR5cGUgdHlwZSA9IG9iai5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludChcIkNsb25pbmc6IFwiICsgdHlwZSk7XHJcbiAgICAgICAgICAgIC8vZGVidWcuUHJpbnQodHlwZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgdHlwZSBvZiBvYmplY3QgaXMgdGhlIHZhbHVlIHR5cGUsIHdlIHdpbGwgYWx3YXlzIGdldCBhIG5ldyBvYmplY3Qgd2hlbiBcclxuICAgICAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdCBpcyBhc3NpZ25lZCB0byBhbm90aGVyIHZhcmlhYmxlLiBTbyBpZiB0aGUgdHlwZSBvZiB0aGUgXHJcbiAgICAgICAgICAgIC8vIG9iamVjdCBpcyBwcmltaXRpdmUgb3IgZW51bSwgd2UganVzdCByZXR1cm4gdGhlIG9iamVjdC4gV2Ugd2lsbCBwcm9jZXNzIHRoZSBcclxuICAgICAgICAgICAgLy8gc3RydWN0IHR5cGUgc3Vic2VxdWVudGx5IGJlY2F1c2UgdGhlIHN0cnVjdCB0eXBlIG1heSBjb250YWluIHRoZSByZWZlcmVuY2UgXHJcbiAgICAgICAgICAgIC8vIGZpZWxkcy5cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHN0cmluZyB2YXJpYWJsZXMgY29udGFpbiB0aGUgc2FtZSBjaGFycywgdGhleSBhbHdheXMgcmVmZXIgdG8gdGhlIHNhbWUgXHJcbiAgICAgICAgICAgIC8vIHN0cmluZyBpbiB0aGUgaGVhcC4gU28gaWYgdGhlIHR5cGUgb2YgdGhlIG9iamVjdCBpcyBzdHJpbmcsIHdlIGFsc28gcmV0dXJuIHRoZSBcclxuICAgICAgICAgICAgLy8gb2JqZWN0LlxyXG4gICAgICAgICAgICBpZiAodHlwZS5Jc0VudW0gfHwgdHlwZSA9PSB0eXBlb2Yoc3RyaW5nKSB8fCB0eXBlID09IHR5cGVvZihpbnQpIHx8IHR5cGUgPT0gdHlwZW9mKGNoYXIpIHx8IHR5cGUgPT0gdHlwZW9mKGZsb2F0KSB8fCB0eXBlID09IHR5cGVvZihkb3VibGUpIHx8IHR5cGUgPT0gdHlwZW9mKEJvb2xlYW4pKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWcuUHJpbnQodHlwZSArIFwiIFwiICsgb2JqKyBcIiAtVlwiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgdHlwZSBvZiB0aGUgb2JqZWN0IGlzIHRoZSBBcnJheSwgd2UgdXNlIHRoZSBDcmVhdGVJbnN0YW5jZSBtZXRob2QgdG8gZ2V0XHJcbiAgICAgICAgICAgIC8vIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBhcnJheS4gV2UgYWxzbyBwcm9jZXNzIHJlY3Vyc2l2ZWx5IHRoaXMgbWV0aG9kIGluIHRoZSBcclxuICAgICAgICAgICAgLy8gZWxlbWVudHMgb2YgdGhlIG9yaWdpbmFsIGFycmF5IGJlY2F1c2UgdGhlIHR5cGUgb2YgdGhlIGVsZW1lbnQgbWF5IGJlIHRoZSByZWZlcmVuY2UgXHJcbiAgICAgICAgICAgIC8vIHR5cGUuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUuSXNBcnJheSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL3N0cmluZyB0eXBlTmFtZSA9IHR5cGUuRnVsbE5hbWUuUmVwbGFjZShcIltdXCIsIHN0cmluZy5FbXB0eSk7XHJcbiAgICAgICAgICAgICAgICAvL2RlYnVnLlByaW50KHR5cGVOYW1lKTtcclxuICAgICAgICAgICAgICAgIFR5cGUgdHlwZUVsZW1lbnQgPSB0eXBlLkdldEVsZW1lbnRUeXBlKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vZGVidWcuUHJpbnQodHlwZUVsZW1lbnQrXCJzc1wiKTtcclxuICAgICAgICAgICAgICAgIHZhciBhcnJheSA9IG9iaiBhcyBBcnJheTtcclxuICAgICAgICAgICAgICAgIGludCBsZW5ndGggPSBhcnJheS5MZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBBcnJheSBjb3BpZWRBcnJheSA9IEFycmF5LkNyZWF0ZUluc3RhbmNlKHR5cGVFbGVtZW50LCBsZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBhcnJheS5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGRlZXAgY2xvbmUgb2YgdGhlIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsIGFycmF5IGFuZCBhc3NpZ24gdGhlIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsb25lIHRvIHRoZSBuZXcgYXJyYXkuXHJcbiAgICAgICAgICAgICAgICAgICAgY29waWVkQXJyYXkuU2V0VmFsdWUoQ2xvbmVQcm9jZWR1cmUoYXJyYXkuR2V0VmFsdWUoaSkpLCBpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29waWVkQXJyYXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHR5cGUgb2YgdGhlIG9iamVjdCBpcyBjbGFzcyBvciBzdHJ1Y3QsIGl0IG1heSBjb250YWluIHRoZSByZWZlcmVuY2UgZmllbGRzLCBcclxuICAgICAgICAgICAgLy8gc28gd2UgdXNlIHJlZmxlY3Rpb24gYW5kIHByb2Nlc3MgcmVjdXJzaXZlbHkgdGhpcyBtZXRob2QgaW4gdGhlIGZpZWxkcyBvZiB0aGUgb2JqZWN0IFxyXG4gICAgICAgICAgICAvLyB0byBnZXQgdGhlIGRlZXAgY2xvbmUgb2YgdGhlIG9iamVjdC4gXHJcbiAgICAgICAgICAgIC8vIFdlIHVzZSBUeXBlLklzVmFsdWVUeXBlIG1ldGhvZCBoZXJlIGJlY2F1c2UgdGhlcmUgaXMgbm8gd2F5IHRvIGluZGljYXRlIGRpcmVjdGx5IHdoZXRoZXIgXHJcbiAgICAgICAgICAgIC8vIHRoZSBUeXBlIGlzIGEgc3RydWN0IHR5cGUuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUuSXNDbGFzc3x8dHlwZS5Jc1ZhbHVlVHlwZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0IGNvcGllZE9iamVjdCA9IEFjdGl2YXRvci5DcmVhdGVJbnN0YW5jZShvYmouR2V0VHlwZSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgYWxsIEZpZWxkSW5mby5cclxuICAgICAgICAgICAgICAgIEZpZWxkSW5mb1tdIGZpZWxkcyA9IHR5cGUuR2V0RmllbGRzKEJpbmRpbmdGbGFncy5QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuTm9uUHVibGljIHwgQmluZGluZ0ZsYWdzLkluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKEZpZWxkSW5mbyBmaWVsZCBpbiBmaWVsZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkZpZWxkOiBcIiArIGZpZWxkLk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCBmaWVsZFZhbHVlID0gZmllbGQuR2V0VmFsdWUob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRWYWx1ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KFwiRmllbGQ6IFwiICsgZmllbGQuTmFtZSArIFwiIGJlaW5nIHNldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBkZWVwIGNsb25lIG9mIHRoZSBmaWVsZCBpbiB0aGUgb3JpZ2luYWwgb2JqZWN0IGFuZCBhc3NpZ24gdGhlIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbG9uZSB0byB0aGUgZmllbGQgaW4gdGhlIG5ldyBvYmplY3QuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLlNldFZhbHVlKGNvcGllZE9iamVjdCwgQ2xvbmVQcm9jZWR1cmUoZmllbGRWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvcGllZE9iamVjdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihcIlRoZSBvYmplY3QgaXMgdW5rbm93biB0eXBlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBvYmplY3QgQ29weVByb2NlZHVyZVBhcnRpYWwoT2JqZWN0IGZyb20sIE9iamVjdCB0bylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChmcm9tID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBUeXBlIHR5cGUgPSBmcm9tLkdldFR5cGUoKTtcclxuXHJcbiAgICAgICAgICAgIGRlYnVnLlByaW50KFwiQ29weWluZyBcIit0eXBlKTtcclxuICAgICAgICAgICAgZGVidWcuSWRlbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB0eXBlIG9mIG9iamVjdCBpcyB0aGUgdmFsdWUgdHlwZSwgd2Ugd2lsbCBhbHdheXMgZ2V0IGEgbmV3IG9iamVjdCB3aGVuIFxyXG4gICAgICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0IGlzIGFzc2lnbmVkIHRvIGFub3RoZXIgdmFyaWFibGUuIFNvIGlmIHRoZSB0eXBlIG9mIHRoZSBcclxuICAgICAgICAgICAgLy8gb2JqZWN0IGlzIHByaW1pdGl2ZSBvciBlbnVtLCB3ZSBqdXN0IHJldHVybiB0aGUgb2JqZWN0LiBXZSB3aWxsIHByb2Nlc3MgdGhlIFxyXG4gICAgICAgICAgICAvLyBzdHJ1Y3QgdHlwZSBzdWJzZXF1ZW50bHkgYmVjYXVzZSB0aGUgc3RydWN0IHR5cGUgbWF5IGNvbnRhaW4gdGhlIHJlZmVyZW5jZSBcclxuICAgICAgICAgICAgLy8gZmllbGRzLlxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgc3RyaW5nIHZhcmlhYmxlcyBjb250YWluIHRoZSBzYW1lIGNoYXJzLCB0aGV5IGFsd2F5cyByZWZlciB0byB0aGUgc2FtZSBcclxuICAgICAgICAgICAgLy8gc3RyaW5nIGluIHRoZSBoZWFwLiBTbyBpZiB0aGUgdHlwZSBvZiB0aGUgb2JqZWN0IGlzIHN0cmluZywgd2UgYWxzbyByZXR1cm4gdGhlIFxyXG4gICAgICAgICAgICAvLyBvYmplY3QuXHJcbiAgICAgICAgICAgIGlmICh0eXBlLklzRW51bSB8fCB0eXBlID09IHR5cGVvZihzdHJpbmcpIHx8IHR5cGUgPT0gdHlwZW9mKGludCkgfHwgdHlwZSA9PSB0eXBlb2YoY2hhcikgfHwgdHlwZSA9PSB0eXBlb2YoZmxvYXQpIHx8IHR5cGUgPT0gdHlwZW9mKGRvdWJsZSkpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWcuUHJpbnQodHlwZSArIFwiIFwiK2Zyb20gKyBcIiAtVlwiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLkRlaWRlbnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmcm9tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGFycmF5cyBub3QgaW1wbGVtZW50ZWRcclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZS5Jc0FycmF5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5EZWlkZW50KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgdHlwZSBvZiB0aGUgb2JqZWN0IGlzIGNsYXNzIG9yIHN0cnVjdCwgaXQgbWF5IGNvbnRhaW4gdGhlIHJlZmVyZW5jZSBmaWVsZHMsIFxyXG4gICAgICAgICAgICAvLyBzbyB3ZSB1c2UgcmVmbGVjdGlvbiBhbmQgcHJvY2VzcyByZWN1cnNpdmVseSB0aGlzIG1ldGhvZCBpbiB0aGUgZmllbGRzIG9mIHRoZSBvYmplY3QgXHJcbiAgICAgICAgICAgIC8vIHRvIGdldCB0aGUgZGVlcCBjbG9uZSBvZiB0aGUgb2JqZWN0LiBcclxuICAgICAgICAgICAgLy8gV2UgdXNlIFR5cGUuSXNWYWx1ZVR5cGUgbWV0aG9kIGhlcmUgYmVjYXVzZSB0aGVyZSBpcyBubyB3YXkgdG8gaW5kaWNhdGUgZGlyZWN0bHkgd2hldGhlciBcclxuICAgICAgICAgICAgLy8gdGhlIFR5cGUgaXMgYSBzdHJ1Y3QgdHlwZS5cclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZS5Jc0NsYXNzIHx8IHR5cGUuSXNWYWx1ZVR5cGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdCBjb3BpZWRPYmplY3QgPSB0bztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgYWxsIEZpZWxkSW5mby5cclxuICAgICAgICAgICAgICAgIEZpZWxkSW5mb1tdIGZpZWxkcyA9IHR5cGUuR2V0RmllbGRzKEJpbmRpbmdGbGFncy5QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuTm9uUHVibGljIHwgQmluZGluZ0ZsYWdzLkluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKEZpZWxkSW5mbyBmaWVsZCBpbiBmaWVsZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkZpZWxkOiBcIiArIGZpZWxkLk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCBmaWVsZFZhbHVlID0gZmllbGQuR2V0VmFsdWUoZnJvbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkVmFsdWUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KFwiRmllbGQ6IFwiICsgZmllbGQuTmFtZSArIFwiIG5vdCBudWxsLCBiZWluZyBzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgZGVlcCBjbG9uZSBvZiB0aGUgZmllbGQgaW4gdGhlIG9yaWdpbmFsIG9iamVjdCBhbmQgYXNzaWduIHRoZSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvbmUgdG8gdGhlIGZpZWxkIGluIHRoZSBuZXcgb2JqZWN0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zy5JZGVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5TZXRWYWx1ZShjb3BpZWRPYmplY3QsIENsb25lUHJvY2VkdXJlKGZpZWxkVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcuRGVpZGVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5EZWlkZW50KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29waWVkT2JqZWN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVidWcuRGVpZGVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKFwiVGhlIG9iamVjdCBpcyB1bmtub3duIHR5cGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgRXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJhbmRvbSBybmcgPSBuZXcgUmFuZG9tKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaHVmZmxlPFQ+KHRoaXMgSUxpc3Q8VD4gbGlzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBuID0gbGlzdC5Db3VudDtcclxuICAgICAgICAgICAgd2hpbGUgKG4gPiAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuLS07XHJcbiAgICAgICAgICAgICAgICBpbnQgayA9IHJuZy5OZXh0KG4gKyAxKTtcclxuICAgICAgICAgICAgICAgIFQgdmFsdWUgPSBsaXN0W2tdO1xyXG4gICAgICAgICAgICAgICAgbGlzdFtrXSA9IGxpc3Rbbl07XHJcbiAgICAgICAgICAgICAgICBsaXN0W25dID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiI3JlZ2lvbiBMaWNlbnNlXHJcbi8qXHJcbk1JVCBMaWNlbnNlXHJcbkNvcHlyaWdodCDCqSAyMDA2IFRoZSBNb25vLlhuYSBUZWFtXHJcblxyXG5BbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXHJcbiNlbmRyZWdpb24gTGljZW5zZVxyXG51c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IFBvaW50MkQgOiBJRXF1YXRhYmxlPFBvaW50MkQ+XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBQb2ludDJEIHplcm9Qb2ludCA9IG5ldyBQb2ludDJEKCk7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFg7XHJcbiAgICAgICAgcHVibGljIGludCBZO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBvaW50MkQgWmVyb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHplcm9Qb2ludDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgUG9pbnQyRChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB4O1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIG1ldGhvZHNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFBvaW50MkQgYSwgUG9pbnQyRCBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuRXF1YWxzKGIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFBvaW50MkQgYSwgUG9pbnQyRCBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICFhLkVxdWFscyhiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhQb2ludDJEIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoWCA9PSBvdGhlci5YKSAmJiAoWSA9PSBvdGhlci5ZKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBFcXVhbHMob2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAob2JqIGlzIFBvaW50MkQpID8gRXF1YWxzKChQb2ludDJEKW9iaikgOiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFggXiBZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcInt7WDp7MH0gWTp7MX19fVwiLCBYLCBZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufVxyXG5cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgc3RhdGljIHB1YmxpYyBjbGFzcyBSYW5kb21TdXBwbGllclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRnVuYzxmbG9hdD4gR2VuZXJhdGV7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IFJhbmdlKGludCBtaW4sIGludCBtYXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpIChHZW5lcmF0ZSgpICogKG1heC1taW4pK21pbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgUmFuZG9tRWxlbWVudDxUPihUW10gYXJyYXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbUmFuZ2UoMCwgYXJyYXkuTGVuZ3RoKV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIiNyZWdpb24gTGljZW5zZVxyXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5Db3B5cmlnaHQgwqkgMjAwNiBUaGUgTW9uby5YbmEgVGVhbVxyXG5cclxuQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xyXG4jZW5kcmVnaW9uIExpY2Vuc2VcclxuXHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkdsb2JhbGl6YXRpb247XHJcbnVzaW5nIFN5c3RlbS5Db21wb25lbnRNb2RlbDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuXHJcbiAgICBwdWJsaWMgc3RydWN0IFJlY3QgOiBJRXF1YXRhYmxlPFJlY3Q+XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZWN0IGVtcHR5UmVjdGFuZ2xlID0gbmV3IFJlY3QoKTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgWDtcclxuICAgICAgICBwdWJsaWMgaW50IFk7XHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aDtcclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodDtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUmVjdCBFbXB0eVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGVtcHR5UmVjdGFuZ2xlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IExlZnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB0aGlzLlg7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgUmlnaHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiAodGhpcy5YICsgdGhpcy5XaWR0aCk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgVG9wXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdGhpcy5ZOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEJvdHRvbVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuICh0aGlzLlkgKyB0aGlzLkhlaWdodCk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBSZWN0KGludCB4LCBpbnQgeSwgaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0geDtcclxuICAgICAgICAgICAgdGhpcy5ZID0geTtcclxuICAgICAgICAgICAgdGhpcy5XaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLkhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShSZWN0IGEsIFJlY3QgYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKGEuWCA9PSBiLlgpICYmIChhLlkgPT0gYi5ZKSAmJiAoYS5XaWR0aCA9PSBiLldpZHRoKSAmJiAoYS5IZWlnaHQgPT0gYi5IZWlnaHQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENvbnRhaW5zKGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKCgodGhpcy5YIDw9IHgpICYmICh4IDwgKHRoaXMuWCArIHRoaXMuV2lkdGgpKSkgJiYgKHRoaXMuWSA8PSB5KSkgJiYgKHkgPCAodGhpcy5ZICsgdGhpcy5IZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKCgodGhpcy5YIDw9IHZhbHVlLlgpICYmICh2YWx1ZS5YIDwgKHRoaXMuWCArIHRoaXMuV2lkdGgpKSkgJiYgKHRoaXMuWSA8PSB2YWx1ZS5ZKSkgJiYgKHZhbHVlLlkgPCAodGhpcy5ZICsgdGhpcy5IZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhQb2ludDJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKCh0aGlzLlggPD0gdmFsdWUuWCkgJiYgKHZhbHVlLlggPCAodGhpcy5YICsgdGhpcy5XaWR0aCkpKSAmJiAodGhpcy5ZIDw9IHZhbHVlLlkpKSAmJiAodmFsdWUuWSA8ICh0aGlzLlkgKyB0aGlzLkhlaWdodCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENvbnRhaW5zKFJlY3QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKCgoKHRoaXMuWCA8PSB2YWx1ZS5YKSAmJiAoKHZhbHVlLlggKyB2YWx1ZS5XaWR0aCkgPD0gKHRoaXMuWCArIHRoaXMuV2lkdGgpKSkgJiYgKHRoaXMuWSA8PSB2YWx1ZS5ZKSkgJiYgKCh2YWx1ZS5ZICsgdmFsdWUuSGVpZ2h0KSA8PSAodGhpcy5ZICsgdGhpcy5IZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oUmVjdCBhLCBSZWN0IGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIShhID09IGIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgT2Zmc2V0KFBvaW50MkQgb2Zmc2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCArPSBvZmZzZXQuWDtcclxuICAgICAgICAgICAgWSArPSBvZmZzZXQuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE9mZnNldChpbnQgb2Zmc2V0WCwgaW50IG9mZnNldFkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYICs9IG9mZnNldFg7XHJcbiAgICAgICAgICAgIFkgKz0gb2Zmc2V0WTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQb2ludDJEIENlbnRlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUG9pbnQyRCgodGhpcy5YICsgdGhpcy5XaWR0aCkgLyAyLCAodGhpcy5ZICsgdGhpcy5IZWlnaHQpIC8gMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluZmxhdGUoaW50IGhvcml6b250YWxWYWx1ZSwgaW50IHZlcnRpY2FsVmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYIC09IGhvcml6b250YWxWYWx1ZTtcclxuICAgICAgICAgICAgWSAtPSB2ZXJ0aWNhbFZhbHVlO1xyXG4gICAgICAgICAgICBXaWR0aCArPSBob3Jpem9udGFsVmFsdWUgKiAyO1xyXG4gICAgICAgICAgICBIZWlnaHQgKz0gdmVydGljYWxWYWx1ZSAqIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0VtcHR5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICgoKCh0aGlzLldpZHRoID09IDApICYmICh0aGlzLkhlaWdodCA9PSAwKSkgJiYgKHRoaXMuWCA9PSAwKSkgJiYgKHRoaXMuWSA9PSAwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhSZWN0IG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMgPT0gb3RoZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBFcXVhbHMob2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAob2JqIGlzIFJlY3QpID8gdGhpcyA9PSAoKFJlY3Qpb2JqKSA6IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcInt7WDp7MH0gWTp7MX0gV2lkdGg6ezJ9IEhlaWdodDp7M319fVwiLCBYLCBZLCBXaWR0aCwgSGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLlggXiB0aGlzLlkgXiB0aGlzLldpZHRoIF4gdGhpcy5IZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSW50ZXJzZWN0cyhSZWN0IHIyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICEocjIuTGVmdCA+IFJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgIHx8IHIyLlJpZ2h0IDwgTGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICB8fCByMi5Ub3AgPiBCb3R0b21cclxuICAgICAgICAgICAgICAgICAgICAgfHwgcjIuQm90dG9tIDwgVG9wXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW50ZXJzZWN0cyhyZWYgUmVjdCB2YWx1ZSwgb3V0IGJvb2wgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gISh2YWx1ZS5MZWZ0ID4gUmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgfHwgdmFsdWUuUmlnaHQgPCBMZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgIHx8IHZhbHVlLlRvcCA+IEJvdHRvbVxyXG4gICAgICAgICAgICAgICAgICAgICB8fCB2YWx1ZS5Cb3R0b20gPCBUb3BcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIE1ldGhvZHNcclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRpbWVTdGFtcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBDdXJyZW50U25hcDtcclxuXHJcbiAgICAgICAgcHVibGljIFRpbWVTdGFtcFNuYXAgR2V0U25hcCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVTdGFtcFNuYXAoQ3VycmVudFNuYXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgdm9pZCBBZHZhbmNlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VycmVudFNuYXAgKz0gZGVsdGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdHJ1Y3QgVGltZVN0YW1wU25hcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBUaW1lU25hcDtcclxuXHJcbiAgICAgICAgcHVibGljIFRpbWVTdGFtcFNuYXAoZmxvYXQgc25hcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRpbWVTbmFwID0gc25hcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIFVuaWNvZGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IFNwYWNlID0gMzI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQga2V5RG93biA9IDQwO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQga2V5TGVmdCA9IDM3O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQga2V5VXAgPSAzODtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGtleVJpZ2h0ID0gMzk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIFVwYXJyb3cyID0gKGNoYXIpMjQ7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgRG93bmFycm93MiA9IChjaGFyKTI1O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIFJpZ2h0YXJyb3cyID0gKGNoYXIpMjY7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgTGVmdGFycm93MiA9IChjaGFyKTI3O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIFVwYXJyb3cgPSAoY2hhcikzMDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBEb3duYXJyb3cgPSAoY2hhcikzMTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBMZWZ0YXJyb3cgPSAoY2hhcikxNztcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBSaWdodGFycm93ID0gKGNoYXIpMTY7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgQXNjaWlHcmlkSG9yID0gKGNoYXIpMTk2O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIEFzY2lpR3JpZFZlciA9IChjaGFyKTE3OTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjaGFyW10gZ3JpZHMgPSBuZXcgY2hhcltdIHtcclxuICAgICAgICAgICAgQXNjaWlHcmlkSG9yLFxyXG4gICAgICAgICAgICBBc2NpaUdyaWRWZXJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY2hhciBBc2NpaUdyaWRVcExlZnQgPSAoY2hhcikyMTc7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjaGFyIEFzY2lpR3JpZFVwUmlnaHQgPSAoY2hhcikgMTkyO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY2hhciBBc2NpaUdyaWRVcFJpZ2h0TGVmdCA9IChjaGFyKTE5MztcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNoYXIgQXNjaWlHcmlkRG93bkxlZnQgPSAoY2hhcikxOTE7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjaGFyIEFzY2lpR3JpZERvd25SaWdodCA9IChjaGFyKTIxODtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNoYXIgQXNjaWlHcmlkRG93blJpZ2h0TGVmdCA9IChjaGFyKTE5NDtcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG4vL3VzaW5nIFN5c3RlbS5EcmF3aW5nO1xyXG51c2luZyBTeXN0ZW0uR2xvYmFsaXphdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIFtTZXJpYWxpemFibGVdXHJcbiAgICBwdWJsaWMgc3RydWN0IFZlY3RvcjJEIDogSUVxdWF0YWJsZTxWZWN0b3IyRD5cclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHplcm9WZWN0b3IgPSBuZXcgVmVjdG9yMkQoMGYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB1bml0VmVjdG9yID0gbmV3IFZlY3RvcjJEKDFmLCAxZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFhWZWN0b3IgPSBuZXcgVmVjdG9yMkQoMWYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB1bml0WVZlY3RvciA9IG5ldyBWZWN0b3IyRCgwZiwgMWYpO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IFg7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IFk7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICAjIHJlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFhJbnQgeyBnZXQgeyByZXR1cm4gKGludClYOyB9IH1cclxuICAgICAgICBwdWJsaWMgaW50IFlJbnQgeyBnZXQgeyByZXR1cm4gKGludClZOyB9IH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0YW50c1xyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFplcm9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB6ZXJvVmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE9uZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRWZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgVW5pdFhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WFZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBVbml0WVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRZVmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRChmbG9hdCB4LCBmbG9hdCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0geDtcclxuICAgICAgICAgICAgdGhpcy5ZID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRChmbG9hdCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgSW50ZXJwb2xhdGVSb3VuZGVkKFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIFZlY3RvcjJEIGVuZFBvc2l0aW9uLCBmbG9hdCByYXRpbylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoc3RhcnRQb3NpdGlvbiAqICgxIC0gcmF0aW8pICsgZW5kUG9zaXRpb24gKiByYXRpbykuUm91bmQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVmVjdG9yMkQgUm91bmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCgoZmxvYXQpTWF0aC5Sb3VuZChYKSwgKGZsb2F0KU1hdGguUm91bmQoWSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBBZGQoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCArPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQWRkKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICsgdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKyB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KCh2MSAqIHYxKSArICh2MiAqIHYyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2UocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAoZmxvYXQpTWF0aC5TcXJ0KCh2MSAqIHYxKSArICh2MiAqIHYyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlU3F1YXJlZChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gKHYxICogdjEpICsgKHYyICogdjIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlU3F1YXJlZChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICh2MSAqIHYxKSArICh2MiAqIHYyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYID0geDtcclxuICAgICAgICAgICAgWSA9IHk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBEaXZpZGUoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC8gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLyB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgRGl2aWRlKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlciwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogZmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEb3QoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERvdChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAob2JqIGlzIFZlY3RvcjJEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRXF1YWxzKChWZWN0b3IyRCl0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFZlY3RvcjJEIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChYID09IG90aGVyLlgpICYmIChZID09IG90aGVyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBSZWZsZWN0KFZlY3RvcjJEIHZlY3RvciwgVmVjdG9yMkQgbm9ybWFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMkQgcmVzdWx0O1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZWZsZWN0KHJlZiBWZWN0b3IyRCB2ZWN0b3IsIHJlZiBWZWN0b3IyRCBub3JtYWwsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFguR2V0SGFzaENvZGUoKSArIFkuR2V0SGFzaENvZGUoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGhTcXVhcmVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoWCAqIFgpICsgKFkgKiBZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNYXgoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHZhbHVlMS5YID4gdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUxLlkgPiB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1heChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCA+IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSA+IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTWluKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh2YWx1ZTEuWCA8IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlMS5ZIDwgdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNaW4ocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggPCB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgPCB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE11bHRpcGx5KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNdWx0aXBseShWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOZWdhdGUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgPSAtdmFsdWUuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5lZ2F0ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTm9ybWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICAgICAgWCAqPSB2YWw7XHJcbiAgICAgICAgICAgIFkgKj0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOb3JtYWxpemUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gdmFsO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHZhbDtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5vcm1hbGl6ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUuWCAqIHZhbDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZS5ZICogdmFsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFN1YnRyYWN0KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFN1YnRyYWN0KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VsdHVyZUluZm8gY3VycmVudEN1bHR1cmUgPSBDdWx0dXJlSW5mby5DdXJyZW50Q3VsdHVyZTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoY3VycmVudEN1bHR1cmUsIFwie3tYOnswfSBZOnsxfX19XCIsIG5ldyBvYmplY3RbXSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlguVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpLCB0aGlzLlkuVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBPcGVyYXRvcnNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAtKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxLlggPT0gdmFsdWUyLlggJiYgdmFsdWUxLlkgPT0gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YICE9IHZhbHVlMi5YIHx8IHZhbHVlMS5ZICE9IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKyhWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKihWZWN0b3IyRCB2YWx1ZSwgZmxvYXQgc2NhbGVGYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKGZsb2F0IHNjYWxlRmFjdG9yLCBWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC8oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAvKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gT3BlcmF0b3JzXHJcbiAgICB9XHJcbn0iLCIvLyBNSVQgTGljZW5zZSAtIENvcHlyaWdodCAoQykgVGhlIE1vbm8uWG5hIFRlYW1cclxuLy8gVGhpcyBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIGRlZmluZWQgaW5cclxuLy8gZmlsZSAnTElDRU5TRS50eHQnLCB3aGljaCBpcyBwYXJ0IG9mIHRoaXMgc291cmNlIGNvZGUgcGFja2FnZS5cclxuXHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkRpYWdub3N0aWNzO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlJ1bnRpbWUuU2VyaWFsaXphdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBzdHJ1Y3QgVmVjdG9yM0QgOiBJRXF1YXRhYmxlPFZlY3RvcjNEPlxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgemVybyA9IG5ldyBWZWN0b3IzRCgwZiwgMGYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCBvbmUgPSBuZXcgVmVjdG9yM0QoMWYsIDFmLCAxZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdW5pdFggPSBuZXcgVmVjdG9yM0QoMWYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdW5pdFkgPSBuZXcgVmVjdG9yM0QoMGYsIDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdW5pdFogPSBuZXcgVmVjdG9yM0QoMGYsIDBmLCAxZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdXAgPSBuZXcgVmVjdG9yM0QoMGYsIDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgZG93biA9IG5ldyBWZWN0b3IzRCgwZiwgLTFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgcmlnaHQgPSBuZXcgVmVjdG9yM0QoMWYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgbGVmdCA9IG5ldyBWZWN0b3IzRCgtMWYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgZm9yd2FyZCA9IG5ldyBWZWN0b3IzRCgwZiwgMGYsIC0xZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgYmFja3dhcmQgPSBuZXcgVmVjdG9yM0QoMGYsIDBmLCAxZik7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgZmxvYXQgWDtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGZsb2F0IFk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBaO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDAsIDAsIDAuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFplcm9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB6ZXJvOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDEsIDEsIDEuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE9uZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIG9uZTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHdpdGggY29tcG9uZW50cyAxLCAwLCAwLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBVbml0WFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRYOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDAsIDEsIDAuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFVuaXRZXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmV0dXJucyBhIDxzZWU+VmVjdG9yMzwvc2VlPiB3aXRoIGNvbXBvbmVudHMgMCwgMCwgMS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgVW5pdFpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBVcFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVwOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIERvd25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBkb3duOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFJpZ2h0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gcmlnaHQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTGVmdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGxlZnQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgRm9yd2FyZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGZvcndhcmQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgQmFja3dhcmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBiYWNrd2FyZDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yM0QoZmxvYXQgeCwgZmxvYXQgeSwgZmxvYXQgeilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHk7XHJcbiAgICAgICAgICAgIHRoaXMuWiA9IHo7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjNEKGZsb2F0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLlogPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yM0QoVmVjdG9yMkQgdmFsdWUsIGZsb2F0IHopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB2YWx1ZS5YO1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB2YWx1ZS5ZO1xyXG4gICAgICAgICAgICB0aGlzLlogPSB6O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIGFkZGl0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmQgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3RvciB0byBhZGQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3RvciB0byBhZGQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIGFkZGl0aW9uLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIEFkZChWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBlcmZvcm1zIHZlY3RvciBhZGRpdGlvbiBvbiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4gYW5kXHJcbiAgICAgICAgLy8vIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUyXCIvPiwgc3RvcmluZyB0aGUgcmVzdWx0IG9mIHRoZVxyXG4gICAgICAgIC8vLyBhZGRpdGlvbiBpbiA8cGFyYW1yZWYgbmFtZT1cInJlc3VsdFwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSByZXN1bHQgb2YgdGhlIHZlY3RvciBhZGRpdGlvbi48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBZGQocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSArIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aICsgdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBDcm9zcyhWZWN0b3IzRCB2ZWN0b3IxLCBWZWN0b3IzRCB2ZWN0b3IyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3Jvc3MocmVmIHZlY3RvcjEsIHJlZiB2ZWN0b3IyLCBvdXQgdmVjdG9yMSk7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWN0b3IxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIENyb3NzKHJlZiBWZWN0b3IzRCB2ZWN0b3IxLCByZWYgVmVjdG9yM0QgdmVjdG9yMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gdmVjdG9yMS5ZICogdmVjdG9yMi5aIC0gdmVjdG9yMi5ZICogdmVjdG9yMS5aO1xyXG4gICAgICAgICAgICB2YXIgeSA9IC0odmVjdG9yMS5YICogdmVjdG9yMi5aIC0gdmVjdG9yMi5YICogdmVjdG9yMS5aKTtcclxuICAgICAgICAgICAgdmFyIHogPSB2ZWN0b3IxLlggKiB2ZWN0b3IyLlkgLSB2ZWN0b3IyLlggKiB2ZWN0b3IxLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0geDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB5O1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlKFZlY3RvcjNEIHZlY3RvcjEsIFZlY3RvcjNEIHZlY3RvcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCByZXN1bHQ7XHJcbiAgICAgICAgICAgIERpc3RhbmNlU3F1YXJlZChyZWYgdmVjdG9yMSwgcmVmIHZlY3RvcjIsIG91dCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguU3FydChyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHZhbHVlMSwgcmVmIHZhbHVlMiwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IChmbG9hdClNYXRoLlNxcnQocmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2VTcXVhcmVkKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHZhbHVlMSwgcmVmIHZhbHVlMiwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2VTcXVhcmVkKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQgPSAodmFsdWUxLlggLSB2YWx1ZTIuWCkgKiAodmFsdWUxLlggLSB2YWx1ZTIuWCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAodmFsdWUxLlkgLSB2YWx1ZTIuWSkgKiAodmFsdWUxLlkgLSB2YWx1ZTIuWSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAodmFsdWUxLlogLSB2YWx1ZTIuWikgKiAodmFsdWUxLlogLSB2YWx1ZTIuWik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIERpdmlkZShWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIERpdmlkZShWZWN0b3IzRCB2YWx1ZTEsIGZsb2F0IHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyB2YWx1ZTI7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIGZsb2F0IGRpdmlzb3IsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aXNvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAqIGZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAvIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aIC8gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERvdChWZWN0b3IzRCB2ZWN0b3IxLCBWZWN0b3IzRCB2ZWN0b3IyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZlY3RvcjEuWCAqIHZlY3RvcjIuWCArIHZlY3RvcjEuWSAqIHZlY3RvcjIuWSArIHZlY3RvcjEuWiAqIHZlY3RvcjIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEb3QocmVmIFZlY3RvcjNEIHZlY3RvcjEsIHJlZiBWZWN0b3IzRCB2ZWN0b3IyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdmVjdG9yMS5YICogdmVjdG9yMi5YICsgdmVjdG9yMS5ZICogdmVjdG9yMi5ZICsgdmVjdG9yMS5aICogdmVjdG9yMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIShvYmogaXMgVmVjdG9yM0QpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdmFyIG90aGVyID0gKFZlY3RvcjNEKW9iajtcclxuICAgICAgICAgICAgcmV0dXJuIFggPT0gb3RoZXIuWCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFkgPT0gb3RoZXIuWSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFogPT0gb3RoZXIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhWZWN0b3IzRCBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBYID09IG90aGVyLlggJiZcclxuICAgICAgICAgICAgICAgICAgICBZID09IG90aGVyLlkgJiZcclxuICAgICAgICAgICAgICAgICAgICBaID09IG90aGVyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KSh0aGlzLlggKyB0aGlzLlkgKyB0aGlzLlopO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGgoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHRoaXMsIHJlZiB6ZXJvLCBvdXQgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLlNxcnQocmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGhTcXVhcmVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHJlc3VsdDtcclxuICAgICAgICAgICAgRGlzdGFuY2VTcXVhcmVkKHJlZiB0aGlzLCByZWYgemVybywgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE11bHRpcGx5KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTXVsdGlwbHkoVmVjdG9yM0QgdmFsdWUxLCBmbG9hdCBzY2FsZUZhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlogKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjNEIHZhbHVlMSwgZmxvYXQgc2NhbGVGYWN0b3IsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAqIHZhbHVlMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHBvaW50aW5nIGluIHRoZSBvcHBvc2l0ZVxyXG4gICAgICAgIC8vLyBkaXJlY3Rpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2ZWN0b3IgdG8gbmVnYXRlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSB2ZWN0b3IgbmVnYXRpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4uPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTmVnYXRlKFZlY3RvcjNEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBuZXcgVmVjdG9yM0QoLXZhbHVlLlgsIC12YWx1ZS5ZLCAtdmFsdWUuWik7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gU3RvcmVzIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHBvaW50aW5nIGluIHRoZSBvcHBvc2l0ZVxyXG4gICAgICAgIC8vLyBkaXJlY3Rpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4gaW4gPHBhcmFtcmVmIG5hbWU9XCJyZXN1bHRcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmVjdG9yIHRvIG5lZ2F0ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSB2ZWN0b3IgdGhhdCB0aGUgbmVnYXRpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4gd2lsbCBiZSBzdG9yZWQgaW4uPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTmVnYXRlKHJlZiBWZWN0b3IzRCB2YWx1ZSwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gLXZhbHVlLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBOb3JtYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTm9ybWFsaXplKHJlZiB0aGlzLCBvdXQgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE5vcm1hbGl6ZShWZWN0b3IzRCB2ZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOb3JtYWxpemUocmVmIHZlY3Rvciwgb3V0IHZlY3Rvcik7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTm9ybWFsaXplKHJlZiBWZWN0b3IzRCB2YWx1ZSwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvcjtcclxuICAgICAgICAgICAgRGlzdGFuY2UocmVmIHZhbHVlLCByZWYgemVybywgb3V0IGZhY3Rvcik7XHJcbiAgICAgICAgICAgIGZhY3RvciA9IDFmIC8gZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlLlggKiBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUuWSAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZS5aICogZmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBSZWZsZWN0KFZlY3RvcjNEIHZlY3RvciwgVmVjdG9yM0Qgbm9ybWFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gSSBpcyB0aGUgb3JpZ2luYWwgYXJyYXlcclxuICAgICAgICAgICAgLy8gTiBpcyB0aGUgbm9ybWFsIG9mIHRoZSBpbmNpZGVudCBwbGFuZVxyXG4gICAgICAgICAgICAvLyBSID0gSSAtICgyICogTiAqICggRG90UHJvZHVjdFsgSSxOXSApKVxyXG4gICAgICAgICAgICBWZWN0b3IzRCByZWZsZWN0ZWRWZWN0b3I7XHJcbiAgICAgICAgICAgIC8vIGlubGluZSB0aGUgZG90UHJvZHVjdCBoZXJlIGluc3RlYWQgb2YgY2FsbGluZyBtZXRob2RcclxuICAgICAgICAgICAgZmxvYXQgZG90UHJvZHVjdCA9ICgodmVjdG9yLlggKiBub3JtYWwuWCkgKyAodmVjdG9yLlkgKiBub3JtYWwuWSkpICsgKHZlY3Rvci5aICogbm9ybWFsLlopO1xyXG4gICAgICAgICAgICByZWZsZWN0ZWRWZWN0b3IuWCA9IHZlY3Rvci5YIC0gKDIuMGYgKiBub3JtYWwuWCkgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgICAgICByZWZsZWN0ZWRWZWN0b3IuWSA9IHZlY3Rvci5ZIC0gKDIuMGYgKiBub3JtYWwuWSkgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgICAgICByZWZsZWN0ZWRWZWN0b3IuWiA9IHZlY3Rvci5aIC0gKDIuMGYgKiBub3JtYWwuWikgKiBkb3RQcm9kdWN0O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlZmxlY3RlZFZlY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZWZsZWN0KHJlZiBWZWN0b3IzRCB2ZWN0b3IsIHJlZiBWZWN0b3IzRCBub3JtYWwsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBJIGlzIHRoZSBvcmlnaW5hbCBhcnJheVxyXG4gICAgICAgICAgICAvLyBOIGlzIHRoZSBub3JtYWwgb2YgdGhlIGluY2lkZW50IHBsYW5lXHJcbiAgICAgICAgICAgIC8vIFIgPSBJIC0gKDIgKiBOICogKCBEb3RQcm9kdWN0WyBJLE5dICkpXHJcblxyXG4gICAgICAgICAgICAvLyBpbmxpbmUgdGhlIGRvdFByb2R1Y3QgaGVyZSBpbnN0ZWFkIG9mIGNhbGxpbmcgbWV0aG9kXHJcbiAgICAgICAgICAgIGZsb2F0IGRvdFByb2R1Y3QgPSAoKHZlY3Rvci5YICogbm9ybWFsLlgpICsgKHZlY3Rvci5ZICogbm9ybWFsLlkpKSArICh2ZWN0b3IuWiAqIG5vcm1hbC5aKTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2ZWN0b3IuWCAtICgyLjBmICogbm9ybWFsLlgpICogZG90UHJvZHVjdDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2ZWN0b3IuWSAtICgyLjBmICogbm9ybWFsLlkpICogZG90UHJvZHVjdDtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2ZWN0b3IuWiAtICgyLjBmICogbm9ybWFsLlopICogZG90UHJvZHVjdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIHN1YnRyYWN0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmQgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIHZlY3RvciB0byBiZSBzdWJ0cmFjdGVkIGZyb20uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgdmVjdG9yIHRvIGJlIHN1YnRyYWN0ZWQgZnJvbSA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIHN1YnRyYWN0aW9uLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFN1YnRyYWN0KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAtPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIHN1YnRyYWN0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmQgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIHZlY3RvciB0byBiZSBzdWJ0cmFjdGVkIGZyb20uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgdmVjdG9yIHRvIGJlIHN1YnRyYWN0ZWQgZnJvbSA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIHRoZSB2ZWN0b3Igc3VidHJhY3Rpb24uPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU3VidHJhY3QocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aIC0gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdHJpbmcgRGVidWdEaXNwbGF5U3RyaW5nXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Db25jYXQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YLlRvU3RyaW5nKCksIFwiICBcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlkuVG9TdHJpbmcoKSwgXCIgIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWi5Ub1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIgc2IgPSBuZXcgU3RyaW5nQnVpbGRlcigzMik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIntYOlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKHRoaXMuWCk7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIiBZOlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKHRoaXMuWSk7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIiBaOlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKHRoaXMuWik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIn1cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBzYi5Ub1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvLy8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8vLyBUcmFuc2Zvcm1zIGEgdmVjdG9yIGJ5IGEgcXVhdGVybmlvbiByb3RhdGlvbi5cclxuICAgICAgICAvLy8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vLy8gPHBhcmFtIG5hbWU9XCJ2ZWNcIj5UaGUgdmVjdG9yIHRvIHRyYW5zZm9ybS48L3BhcmFtPlxyXG4gICAgICAgIC8vLy8vIDxwYXJhbSBuYW1lPVwicXVhdFwiPlRoZSBxdWF0ZXJuaW9uIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIGJ5LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIHRoZSBvcGVyYXRpb24uPC9wYXJhbT5cclxuICAgICAgICAvLyAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFRyYW5zZm9ybShyZWYgVmVjdG9yMyB2ZWMsIHJlZiBRdWF0ZXJuaW9uIHF1YXQsIG91dCBWZWN0b3IzIHJlc3VsdClcclxuICAgICAgICAvLyAgICAgICAge1xyXG4gICAgICAgIC8vXHRcdC8vIFRha2VuIGZyb20gdGhlIE9wZW50VEsgaW1wbGVtZW50YXRpb24gb2YgVmVjdG9yM1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gU2luY2UgdmVjLlcgPT0gMCwgd2UgY2FuIG9wdGltaXplIHF1YXQgKiB2ZWMgKiBxdWF0Xi0xIGFzIGZvbGxvd3M6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyB2ZWMgKyAyLjAgKiBjcm9zcyhxdWF0Lnh5eiwgY3Jvc3MocXVhdC54eXosIHZlYykgKyBxdWF0LncgKiB2ZWMpXHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzIHh5eiA9IHF1YXQuWHl6LCB0ZW1wLCB0ZW1wMjtcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMuQ3Jvc3MocmVmIHh5eiwgcmVmIHZlYywgb3V0IHRlbXApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMy5NdWx0aXBseShyZWYgdmVjLCBxdWF0LlcsIG91dCB0ZW1wMik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkFkZChyZWYgdGVtcCwgcmVmIHRlbXAyLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkNyb3NzKHJlZiB4eXosIHJlZiB0ZW1wLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLk11bHRpcGx5KHJlZiB0ZW1wLCAyLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkFkZChyZWYgdmVjLCByZWYgdGVtcCwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgbWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBPcGVyYXRvcnNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YID09IHZhbHVlMi5YXHJcbiAgICAgICAgICAgICAgICAmJiB2YWx1ZTEuWSA9PSB2YWx1ZTIuWVxyXG4gICAgICAgICAgICAgICAgJiYgdmFsdWUxLlogPT0gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gISh2YWx1ZTEgPT0gdmFsdWUyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgKyhWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yIC0oVmVjdG9yM0QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBWZWN0b3IzRCgtdmFsdWUuWCwgLXZhbHVlLlksIC12YWx1ZS5aKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAtKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAtPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgKihWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKj0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yICooVmVjdG9yM0QgdmFsdWUsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWiAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAqKGZsb2F0IHNjYWxlRmFjdG9yLCBWZWN0b3IzRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlogKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgLyhWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yIC8oVmVjdG9yM0QgdmFsdWUsIGZsb2F0IGRpdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aWRlcjtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5aICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZURhdGFcclxuICAgIHtcclxuICAgICAgICBzdHJpbmcgbGFiZWw7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxUaWNrPiB1bml0cyA9IG5ldyBMaXN0PFRpY2s+KCk7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxpbnQ+IHRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlRGF0YShzdHJpbmcgbGFiZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBGaW5kQnlMYWJlbChMaXN0PE1vdmVEYXRhPiBtb3ZlRGF0YXMsIHN0cmluZyBsYWJlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbW92ZURhdGFzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKG1vdmVEYXRhc1tpXSE9bnVsbClcclxuICAgICAgICAgICAgICAgICAgICBpZiAobW92ZURhdGFzW2ldLmxhYmVsID09IGxhYmVsKSByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUaWNrIFxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIENvbmRpdGlvbiBjb25kaXRpb247XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxvYmplY3Q+IHRoaW5nc1RvSGFwcGVuID0gbmV3IExpc3Q8b2JqZWN0PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGljayhvYmplY3QgYWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpbmdzVG9IYXBwZW4uQWRkKGFjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBDb25kaXRpb25cclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCByZWFkb25seSBDb25kaXRpb25UeXBlIHR5cGU7XHJcbiAgICAgICAgaW50ZXJuYWwgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldDtcclxuICAgICAgICBpbnRlcm5hbCByZWFkb25seSBCYXNlVXRpbHMuVmVjdG9yMkQgdmVjdG9yO1xyXG5cclxuICAgICAgICBwdWJsaWMgQ29uZGl0aW9uKENvbmRpdGlvblR5cGUgdHlwZSwgVGFyZ2V0IHRhcmdldCwgQmFzZVV0aWxzLlZlY3RvcjJEIHZlY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLnZlY3RvciA9IHZlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gQ29uZGl0aW9uVHlwZVxyXG4gICAge1xyXG4gICAgICAgIENhbk1vdmVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU3VtbW9uRW50aXR5XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBlbmVteVdoaWNoO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBWZWN0b3IyRCBwcmVmZXJlbnRpYWxSb3dDb2x1bW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdW1tb25FbnRpdHkoaW50IGVuZW15V2hpY2gsIFZlY3RvcjJEIHByZWZlcmVudGlhbFJvd0NvbHVtbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlXaGljaCA9IGVuZW15V2hpY2g7XHJcbiAgICAgICAgICAgIHRoaXMucHJlZmVyZW50aWFsUm93Q29sdW1uID0gcHJlZmVyZW50aWFsUm93Q29sdW1uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RhdGljIFN1bW1vbkVudGl0eSBFbmVteShpbnQgdiwgVmVjdG9yMkQgdmVjdG9yMkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFN1bW1vbkVudGl0eSh2LCB2ZWN0b3IyRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQW5pbWF0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEFyZWEgYXJlYSA9IG51bGw7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldCA9IFRhcmdldC5Ob25lO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgQW5pbWF0aW9uKFRhcmdldCB0YXJnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcHVibGljIEFuaW1hdGlvbihBcmVhIGFyZWEpXHJcbiAgICAgICAgLy97XHJcbiAgICAgICAgLy8gICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgcHVibGljIEFuaW1hdGlvbihUYXJnZXQgdGFyZ2V0LCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbmltYXRpb24oQXJlYSBhcmVhLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmUsIFRhcmdldCB0YXJnZXQgPSBUYXJnZXQuTm9uZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZUFjdGlvblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBUYXJnZXQgdGFyZ2V0O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXNlVXRpbHMuVmVjdG9yMkQgZGlzdGFuY2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlQWN0aW9uKFRhcmdldCB0YXJnZXQsIEJhc2VVdGlscy5WZWN0b3IyRCBhbW91bnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9IGFtb3VudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERlYWxEYW1hZ2VBY3Rpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldCA9IFRhcmdldC5Ob25lO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBBcmVhIGFyZWE7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBkYW1hZ2U7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudDtcclxuXHJcbiAgICAgICAgcHVibGljIERlYWxEYW1hZ2VBY3Rpb24oQXJlYSBhcmVhLCBpbnQgZGFtYWdlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSBhcmVhO1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gVGFyZ2V0LkFyZWE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQgdGFyZ2V0LCBpbnQgZGFtYWdlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBcmVhXHJcbiAgICB7XHJcbiAgICAgICAgLy9wdWJsaWMgcmVhZG9ubHkgQXJlYSBhcmVhO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBUYXJnZXQgdGFyZ2V0O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBMaXN0PFZlY3RvcjJEPiBwb2ludHMgPSBuZXcgTGlzdDxWZWN0b3IyRD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIEFyZWEoVGFyZ2V0IHRhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBUYXJnZXRcclxuICAgIHtcclxuICAgICAgICBOb25lLCAgU2VsZiwgQ2xvc2VzdFRhcmdldCwgQ2xvc2VzdFRhcmdldFgsIEFyZWEgICBcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBc3luY1Rhc2tzXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBc3luY1RyYWNrXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBEZWxheWVkQWN0aW9uc1xyXG4gICAge1xyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IHRpbWVzID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxJTGlzdD4gbGlzdHMgPSBuZXcgTGlzdDxJTGlzdD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0aW1lcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lc1tpXSAtPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGlmICh0aW1lc1tpXSA8PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEV4ZWN1dGUoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5kVGFzayhpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKGludCBpKTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGQoZmxvYXQgdGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpbWVzLkFkZCh0aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZXMuQ291bnQgPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRW5kVGFzayhpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpbWVzLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbCBpbiBsaXN0cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbC5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQXN5bmNUYXNrU2V0dGVyPFQ+IDogRGVsYXllZEFjdGlvbnNcclxuICAgIHtcclxuICAgICAgICBMaXN0PFQ+IFRvVmFsdWUgPSBuZXcgTGlzdDxUPigpO1xyXG4gICAgICAgIExpc3Q8QWN0aW9uPFQ+PiBzZXR0ZXJzID0gbmV3IExpc3Q8QWN0aW9uPFQ+PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoVCBlLCBBY3Rpb248VD4gc2V0dGVyLCBmbG9hdCB0aW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVG9WYWx1ZS5BZGQoZSk7XHJcbiAgICAgICAgICAgIHNldHRlcnMuQWRkKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248VD4pc2V0dGVyKTtcclxuICAgICAgICAgICAgYmFzZS5BZGQodGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBvdmVycmlkZSB2b2lkIEV4ZWN1dGUoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXR0ZXJzW2ldKFRvVmFsdWVbaV0pO1xyXG4gICAgICAgICAgICBUb1ZhbHVlLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBzZXR0ZXJzLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVTZXR1cFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBwdWJsaWMgQmF0dGxlTWFpbiBiYXR0bGVNYWluO1xyXG4gICAgICAgIHB1YmxpYyBUaW1lU3RhbXAgdGltZVN0YW1wO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlU2V0dXAoaW50IG1vZGUsIGludCBzdGFnZUlkLCBFQ1NNYW5hZ2VyIGVjcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICB0aW1lU3RhbXAgPSBuZXcgVGltZVN0YW1wKCk7XHJcbiAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KHRpbWVTdGFtcCk7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4gPSBuZXcgQmF0dGxlTWFpbihtb2RlLCBlY3MsIHRpbWVTdGFtcCk7XHJcbiAgICAgICAgICAgIHZhciBtY3AgPSBuZXcgTW92ZUNyZWF0b3JQcm9nKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhZ2VzID0gZWNzLlF1aWNrQWNjZXNzb3IxPFN0YWdlRGF0YT4oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaXhlZEF0dGFjayA9IHN0YWdlcy5FbnRpdHkoc3RhZ2VJZCkuR2V0Q29tcG9uZW50PEZpeGVkQXR0YWNrU3RhZ2U+KCk7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJIYW5kUG9vbCA9IGJhdHRsZU1haW4ucGxheWVySGFuZFBvb2w7XHJcbiAgICAgICAgICAgIGlmIChmaXhlZEF0dGFjayAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGZpeGVkQXR0YWNrLm1vdmVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZCgoQmF0dGxlTWFpbi5Nb3ZlVHlwZSlpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFBvb2wuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlKTtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzdGFnZSA9IHN0YWdlcy5Db21wMShzdGFnZUlkKTtcclxuICAgICAgICAgICAgdmFyIGVubXlzID0gc3RhZ2UuZW5lbXlTcGF3bnM7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGVubXlzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5Nb3ZlRGF0YUV4ZWN1dGVyID0gbmV3IE1vdmVEYXRhRXhlY3V0ZXIoYmF0dGxlTWFpbiwgbWNwLm1vdmVEYXRhcywgZWNzLCB0aW1lU3RhbXApO1xyXG5cclxuICAgICAgICAgICAgTGlzdDxzdHJpbmc+IGVudGl0eVJlbmRlclRleHRzID0gbmV3IExpc3Q8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVuZW15RGF0YXMgPSBuZXcgRW5lbXlEYXRhQ3JlYXRvcihlbnRpdHlSZW5kZXJUZXh0cyxtY3ApLmVuZW15RGF0YXM7XHJcbiAgICAgICAgICAgIHZhciBiYXR0bGVTdGF0ZSA9IGJhdHRsZU1haW4uYmF0dGxlU3RhdGU7XHJcblxyXG4gICAgICAgICAgICBiYXR0bGVNYWluLkJhdHRsZUNvbmZpZ3VyZShzdGFnZS5iYXR0bGVDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVuZW15RmFjdG9yeSA9IG5ldyBTcGF3bkVudGl0eUZhY3RvcnkoZWNzLCBlbmVteURhdGFzLCBiYXR0bGVNYWluKTtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5lY3NJbnRlZyA9IG5ldyBFQ1NJbnRlZ3JhdGlvbihlbmVteUZhY3RvcnksIGVjcyk7XHJcbiAgICAgICAgICAgIC8vYmF0dGxlTWFpbi5FbmVteUZhY3RvcnkgPSBlbmVteUZhY3Rvcnk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW5lbXlBaXMgPSBlY3MuUXVpY2tBY2Nlc3NvcjI8RW5lbXlBSSwgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHk+KCk7XHJcbiAgICAgICAgICAgIHZhciBlbmVteUFpU3RhdGVsZXNzID0gZWNzLkNyZWF0ZUFjY2Vzc29yKG5lY2Vzc2FyeTogbmV3IFR5cGVbXSB7IHR5cGVvZihFbmVteUFJKSB9LCBub3Q6IG5ldyBUeXBlW10geyB0eXBlb2YoRW5lbXlBSVN0YXRlKSB9KTtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5FbmVteUdlbmVyYXRlTW92ZXMgPSAoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW5lbXlBaVN0YXRlbGVzcy5MZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZW15QWlTdGF0ZWxlc3MuR2V0KDApLkFkZENvbXBvbmVudDxFbmVteUFJU3RhdGU+KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlbmVteUFpcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWkgPSBlbmVteUFpcy5Db21wMShpKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmF0dGxlciA9IGVuZW15QWlzLkNvbXAyKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhaVN0YXRlID0gZW5lbXlBaXMuRW50aXR5KGkpLkdldENvbXBvbmVudDxFbmVteUFJU3RhdGU+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmVzID0gYWkubW92ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgYWlQcm8gPSAoaisgYWlTdGF0ZS5wcm9ncmVzcykgJSBtb3Zlcy5Db3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmUgPSBtb3Zlc1thaVByb107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb3ZlIGlzIE1vdmVVc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVyLm1vdmVzW2pdID0gKG1vdmUgYXMgTW92ZVVzZSkubW92ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2JlLm1vdmVzW2pdID0gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhaVN0YXRlLnByb2dyZXNzICs9IGJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBkYXRhIHRoYXQgd2lsbCBiZSBhIHBhcnQgb2Ygc3RhZ2VkYXRhIHNvIGVhY2ggc3RhZ2UgY2FuIGhhdmUgaXQncyBjb25maWdcclxuICAgIC8vLyBJdCB3aWxsIGFsc28gYmUgY29udGFpbmVkIGluIGJhdHRsZW1haW4uXHJcbiAgICAvLy8gU2hvdWxkIGJlIHN0YXRpYywgb25jZSBjcmVhdGVkLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVDb25maWdcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgTGlzdDxpbnQ+IGVuZW1pZXNUb1N1bW1vbiA9bmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBib29sIG5lZWRLaWxsQWxsRW5lbWllcyA9IHRydWU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVDb25maWcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVDb25maWcoaW50W10gZW5lbWllc1RvU3VtbW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzVG9TdW1tb24uQWRkUmFuZ2UoZW5lbWllc1RvU3VtbW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVDb25maWcoYm9vbCBuZWVkS2lsbEFsbEVuZW1pZXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5lZWRLaWxsQWxsRW5lbWllcyA9IG5lZWRLaWxsQWxsRW5lbWllcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkhhcHBzO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVNYWluXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8QmF0dGxlRW50aXR5PiBlbnRpdGllcyA9IG5ldyBMaXN0PEJhdHRsZUVudGl0eT4oKTtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlU3RhdGUgYmF0dGxlU3RhdGUgPSBuZXcgQmF0dGxlU3RhdGUoKTtcclxuICAgICAgICBwdWJsaWMgSGFwcE1hbmFnZXIgaGFwcE1hbmFnZXIgPSBuZXcgSGFwcE1hbmFnZXIoKTtcclxuICAgICAgICBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBWZWN0b3IyRD4gbW92ZW1lbnRNb3ZlcyA9IG5ldyBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBWZWN0b3IyRD4oKTtcclxuICAgICAgICAvL0RpY3Rpb25hcnk8TW92ZVR5cGUsIFBvaW50PiBhdHRhY2tNb3ZlcyA9IG5ldyBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBQb2ludD4oKTtcclxuICAgICAgICBNb3ZlVHlwZVtdIGVuZW15TW92ZXM7XHJcbiAgICAgICAgLy9wdWJsaWMgTGlzdDxJbnB1dD4gaW5wdXRzID0gbmV3IExpc3Q8VHVybmJhc2VkLklucHV0PigpO1xyXG4gICAgICAgIHB1YmxpYyBJbnB1dEhvbGRlciBpbnB1dHMgPSBuZXcgSW5wdXRIb2xkZXIoKTtcclxuICAgICAgICBwdWJsaWMgTGlzdDxNb3ZlVHlwZT4gcGxheWVySGFuZEZpeGVkID0gbmV3IExpc3Q8TW92ZVR5cGU+KCk7XHJcbiAgICAgICAgcHVibGljIExpc3Q8TW92ZVR5cGU+IHBsYXllckhhbmRVbmZpeGVkID0gbmV3IExpc3Q8TW92ZVR5cGU+KCk7XHJcbiAgICAgICAgcHVibGljIExpc3Q8TW92ZVR5cGU+IHBsYXllckhhbmRQb29sID0gbmV3IExpc3Q8TW92ZVR5cGU+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCB0aW1lVG9DaG9vc2VNYXggPSAxNWY7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IHRpbWVUb0Nob29zZSA9IC0xO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlUmVzdWx0IGJhdHRsZVJlc3VsdCA9IG5ldyBCYXR0bGVSZXN1bHQoKTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBCYXR0bGVDb25maWd1cmUoQmF0dGxlQ29uZmlnIGJhdHRsZUNvbmZpZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChiYXR0bGVDb25maWcgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlQ29uZmlnID0gbmV3IEJhdHRsZUNvbmZpZyhuZWVkS2lsbEFsbEVuZW1pZXM6dHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5CYXR0bGVDb25maWcgPSBiYXR0bGVDb25maWc7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2UuVmFsID0gMztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnQgbkVuZW1pZXM7XHJcbiAgICAgICAgcHVibGljIE1vdmVEYXRhRXhlY3V0ZXIgTW92ZURhdGFFeGVjdXRlcjtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFRpbWVTdGFtcCB0aW1lU3RhbXA7XHJcbiAgICAgICAgcHJpdmF0ZSBRdWlja0FjY2Vzc29yVHdvPEJhdHRsZUVudGl0eSwgUGlja3VwSW5mbz4gcGlja3VwQWNjZXNzb3I7XHJcbiAgICAgICAgaW50ZXJuYWwgRUNTSW50ZWdyYXRpb24gZWNzSW50ZWc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBY3Rpb24gRW5lbXlHZW5lcmF0ZU1vdmVzO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnIEJhdHRsZUNvbmZpZyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IEJvYXJkV2lkdGggeyBnZXQ7IGludGVybmFsIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQm9hcmRIZWlnaHQgeyBnZXQ7IGludGVybmFsIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlTWFpbihpbnQgbW9kZSwgRUNTTWFuYWdlciBlY3MsIFRpbWVTdGFtcCB0aW1lU3RhbXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3RoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IHRpbWVTdGFtcDtcclxuICAgICAgICAgICAgcGlja3VwQWNjZXNzb3IgPSBlY3MuUXVpY2tBY2Nlc3NvcjI8QmF0dGxlRW50aXR5LCBQaWNrdXBJbmZvPigpO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlVXAsIFZlY3RvcjJELlVuaXRZKTtcclxuICAgICAgICAgICAgbW92ZW1lbnRNb3Zlcy5BZGQoTW92ZVR5cGUuTW92ZURvd24sIC1WZWN0b3IyRC5Vbml0WSk7XHJcbiAgICAgICAgICAgIG1vdmVtZW50TW92ZXMuQWRkKE1vdmVUeXBlLk1vdmVMZWZ0LCAtVmVjdG9yMkQuVW5pdFgpO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlUmlnaHQsIFZlY3RvcjJELlVuaXRYKTtcclxuXHJcbiAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KGJhdHRsZVN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIHBsYXllckhhbmRGaXhlZC5DbGVhcigpO1xyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kRml4ZWQuQWRkKE1vdmVUeXBlLk1vdmVSaWdodCk7XHJcbiAgICAgICAgICAgIHBsYXllckhhbmRGaXhlZC5BZGQoTW92ZVR5cGUuTW92ZUxlZnQpO1xyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kRml4ZWQuQWRkKE1vdmVUeXBlLk1vdmVEb3duKTtcclxuICAgICAgICAgICAgcGxheWVySGFuZEZpeGVkLkFkZChNb3ZlVHlwZS5Nb3ZlVXApO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1vZGUgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFVuZml4ZWQuQWRkKE1vdmVUeXBlLk5vcm1hbFNob3QpO1xyXG4gICAgICAgICAgICAgICAgZW5lbXlNb3ZlcyA9IG5ldyBNb3ZlVHlwZVtdIHtcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlVXAsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZURvd24sXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk5vcm1hbFNob3QsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFVuZml4ZWQuQWRkKE1vdmVUeXBlLkZpcmUpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFVuZml4ZWQuQWRkKE1vdmVUeXBlLkljZSk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kVW5maXhlZC5BZGQoTW92ZVR5cGUuVGh1bmRlcik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGVuZW15TW92ZXMgPSBuZXcgTW92ZVR5cGVbXSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZURvd24sXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVVwLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5GaXJlLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLkljZSxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5UaHVuZGVyLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9wbGF5ZXJIYW5kLkFkZChNb3ZlVHlwZS5Ob3JtYWxTaG90KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIElzVmljdG9yeSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIEJhdHRsZUVudGl0eSBoZXJvID0gbmV3IEJhdHRsZUVudGl0eSgpO1xyXG5cclxuICAgICAgICAgICAgaGVyby5wb3MuU2V0KDEsIDEpO1xyXG4gICAgICAgICAgICBoZXJvLm1pblBvcy5TZXQoMCwgMCk7XHJcbiAgICAgICAgICAgIGhlcm8ubWF4UG9zLlNldCgyLCAyKTtcclxuICAgICAgICAgICAgaGVyby5UeXBlID0gRW50aXR5VHlwZS5oZXJvO1xyXG4gICAgICAgICAgICBoZXJvLmxpZmUgPSAyO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGhlcm8ubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhlcm8ubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGVudGl0aWVzLkFkZChoZXJvKTtcclxuICAgICAgICAgICAgZWNzSW50ZWcuSGVyb0NyZWF0ZWQoaGVybyk7XHJcbiAgICAgICAgICAgIGVjc0ludGVnLlNwYXduRW5lbWllcygpO1xyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9HYW1lRW50aXR5IHBpY2t1cCA9IG5ldyBHYW1lRW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5UeXBlID0gRW50aXR5VHlwZS5waWNrdXA7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5wb3MuU2V0KDAsIDIpO1xyXG4gICAgICAgICAgICAgICAgLy9waWNrdXAubGlmZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5ncmFwaGljID0gNDtcclxuICAgICAgICAgICAgICAgIC8vZW50aXRpZXMuQWRkKHBpY2t1cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIEJhdHRsZUVudGl0eSBwYW5lbEVmZmVjdCA9IG5ldyBCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuVHlwZSA9IEVudGl0eVR5cGUucGFuZWxlZmZlY3Q7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnBvcy5TZXQoMCwgMik7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmxpZmUgPSA1O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5ncmFwaGljID0gNTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QucmFuZG9tUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3TGlmZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3VHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBSYW5kb21Qb3NpdGlvbihwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vICAgIGVudGl0aWVzLkFkZChwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIEJhdHRsZUVudGl0eSBwYW5lbEVmZmVjdCA9IG5ldyBCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuVHlwZSA9IEVudGl0eVR5cGUucGFuZWxlZmZlY3Q7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnBvcy5TZXQoMCwgMik7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmxpZmUgPSA1O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5ncmFwaGljID0gNTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QucmFuZG9tUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3TGlmZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3VHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBSYW5kb21Qb3NpdGlvbihwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vICAgIGVudGl0aWVzLkFkZChwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgUmVzZXQoKTtcclxuICAgICAgICAgICAgRXhlY3V0ZVBoYXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlRW50aXR5IE5ld0JhdHRsZUVudGl0eSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCYXR0bGVFbnRpdHkgYmF0dGxlRW50aXR5ID0gbmV3IEJhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICBlbnRpdGllcy5BZGQoYmF0dGxlRW50aXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIGJhdHRsZUVudGl0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbnRpdGllc1tpXS5saWZlID0gZW50aXRpZXNbaV0ubWF4TGlmZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2UpO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS50dXJuLlZhbCA9IDA7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLnRvdGFsVHVybnMgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsID0gMDtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICBiYXR0bGVSZXN1bHQucmVzdWx0ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSXNPdmVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBiYXR0bGVSZXN1bHQucmVzdWx0ICE9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUaWNrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZpbmlzaFByZXZpb3VzVGljaygpO1xyXG4gICAgICAgICAgICBib29sIGhlcm9BbGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBib29sIGVuZW15QWxpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYm9vbCBwaWNrdXBPYmxpZ2F0b3J5RXhpc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLlR5cGUgPT0gRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5saWZlID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXlBbGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5UeXBlID09IEVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5saWZlID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0FsaXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRoaXMucGlja3VwQWNjZXNzb3IuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBwaWNrdXAgPSBwaWNrdXBBY2Nlc3Nvci5Db21wMihpKTtcclxuICAgICAgICAgICAgICAgIGlmIChwaWNrdXAubmVjZXNzYXJ5Rm9yVmljdG9yeSAmJiBwaWNrdXBBY2Nlc3Nvci5Db21wMShpKS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwaWNrdXBPYmxpZ2F0b3J5RXhpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChiYXR0bGVTdGF0ZS5CYXR0bGVFbmRBY3RpdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghaGVyb0FsaXZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZVJlc3VsdC5yZXN1bHQgPSAyO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCghZW5lbXlBbGl2ZSB8fCAhQmF0dGxlQ29uZmlnLm5lZWRLaWxsQWxsRW5lbWllcykgJiYgIXBpY2t1cE9ibGlnYXRvcnlFeGlzdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVSZXN1bHQucmVzdWx0ID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGJhdHRsZVJlc3VsdC5yZXN1bHQgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaGFwcE1hbmFnZXIuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgdGltZVN0YW1wLkFkdmFuY2UoMSk7XHJcbiAgICAgICAgICAgICAgICBFeGVjdXRlUGhhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aW1lVG9DaG9vc2UgPiAwICYmIGJhdHRsZVN0YXRlLnBoYXNlID09IEJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZVRvQ2hvb3NlIC09IGRlbHRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVUb0Nob29zZSA8PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEZpbmlzaFByZXZpb3VzVGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCYXR0bGVQaGFzZSBwcmV2aW91c1BoYXNlID0gYmF0dGxlU3RhdGUucGhhc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocHJldmlvdXNQaGFzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuSGFuZFJlY2hhcmdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuSGFuZFJlY2hhcmdlOlxyXG4gICAgICAgICAgICAgICAgICAgIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlLlBpY2tIYW5kcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLlBpY2tIYW5kczpcclxuICAgICAgICAgICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5FeGVjdXRlTW92ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cgPj0gYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93LlZhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBub01vcmVVbml0c1RvQWN0VGhpc1R1cm4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgaV9pbml0aWFsID0gYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlfaW5pdGlhbCA8IGVudGl0aWVzLkNvdW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gaV9pbml0aWFsOyBpIDwgZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXRpZXNbaV0uQWxpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub01vcmVVbml0c1RvQWN0VGhpc1R1cm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vTW9yZVVuaXRzVG9BY3RUaGlzVHVybilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhdHRsZVN0YXRlLnR1cm4gPj0gYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZSAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLnJhbmRvbVBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShcIlJBTkRPTSBQT1MhIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJhbmRvbVBvc2l0aW9uKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUudHVybiA9IGJhdHRsZVN0YXRlLnR1cm4gKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLnRvdGFsVHVybnMgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSYW5kb21Qb3NpdGlvbihCYXR0bGVFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUucG9zLlggPSBSYW5kb21TdXBwbGllci5SYW5nZSgwLCA1KTtcclxuICAgICAgICAgICAgZS5wb3MuWSA9IFJhbmRvbVN1cHBsaWVyLlJhbmdlKDAsIDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlIHBoYXNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQmF0dGxlUGhhc2UgcHJldmlvdXNQaGFzZSA9IGJhdHRsZVN0YXRlLnBoYXNlO1xyXG4gICAgICAgICAgICBpZiAocGhhc2UgPT0gcHJldmlvdXNQaGFzZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAocGhhc2UgPT0gQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICB7XHJcblBpZHJvaC5CYXNlVXRpbHMuRXh0ZW5zaW9ucy5TaHVmZmxlPGdsb2JhbDo6UGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGU+KCAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kUG9vbCk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kVW5maXhlZC5DbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgaW50IGNvbW1hbmRzVG9BZGQgPSAzO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmRzVG9BZGQgPiBwbGF5ZXJIYW5kUG9vbC5Db3VudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1RvQWRkID0gcGxheWVySGFuZFBvb2wuQ291bnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvbW1hbmRzVG9BZGQ7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kVW5maXhlZC5BZGQocGxheWVySGFuZFBvb2xbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB0aW1lVG9DaG9vc2UgPSB0aW1lVG9DaG9vc2VNYXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzUGhhc2UgPT0gQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLnR1cm4uVmFsID0gMDtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsID0gMDtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsID0gMTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZS5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUucGhhc2UgPSBwaGFzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBFeGVjdXRlUGhhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBoYXNlID0gYmF0dGxlU3RhdGUucGhhc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocGhhc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlOlxyXG4gICAgICAgICAgICAgICAgICAgIGVjc0ludGVnLlNwYXduRW5lbWllcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVuZW15R2VuZXJhdGVNb3ZlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5IYW5kUmVjaGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLlBpY2tIYW5kczpcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaGkgaW4gcGxheWVySGFuZEZpeGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzLkFkZChuZXcgVHVybmJhc2VkLklucHV0KElucHV0VHlwZS5Nb3ZlLCAoaW50KWhpKSwgSW5wdXRUYWdzLk1PVkVGSVgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaGkgaW4gcGxheWVySGFuZFVuZml4ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1vdmUsIChpbnQpaGkpLCBJbnB1dFRhZ3MuTU9WRVVORklYKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzLkFkZChuZXcgVHVybmJhc2VkLklucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuUmVkbyksIElucHV0VGFncy5NSVNDKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5Eb25lKSwgSW5wdXRUYWdzLk1JU0MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgZW5lbXlFeGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uVHlwZSA9PSBFbnRpdHlUeXBlLmVuZW15KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmVteUV4aXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5lbXlFeGlzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzLkFkZChuZXcgVHVybmJhc2VkLklucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuUHJldmlldyksIElucHV0VGFncy5NSVNDKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmU6XHJcbiAgICAgICAgICAgICAgICAgICAgZWNzSW50ZWcuU3Bhd25FbmVtaWVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgRXhlY3V0ZU1vdmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5wdXREb25lKElucHV0IGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT0gSW5wdXRUeXBlLk1vdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1vdmVUeXBlIGFyZzEgPSAoTW92ZVR5cGUpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIklOUFVUVEVEMVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJIYW5kRml4ZWQuQ29udGFpbnMoYXJnMSkgfHwgcGxheWVySGFuZFVuZml4ZWQuQ29udGFpbnMoYXJnMSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiSU5QVVRURUQyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVDaG9zZW4oYXJnMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTWlzY0JhdHRsZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTWlzY0JhdHRsZUlucHV0IG1pc2MgPSAoTWlzY0JhdHRsZUlucHV0KWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICBpZiAobWlzYyA9PSBNaXNjQmF0dGxlSW5wdXQuUmVkbylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5oZXJvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGUubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUubW92ZXNbaV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50IHZhbHVlID0gZS5tb3Zlc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IC0xIHx8IGkgPT0gYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3Zlc1tpIC0gMV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtaXNjID09IE1pc2NCYXR0bGVJbnB1dC5Eb25lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBCYXR0bGVEZWNpZGVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBoZXJvZXMgPSAwO1xyXG4gICAgICAgICAgICBpbnQgZW5lbWllcyA9IDA7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb2VzKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuQWxpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZW1pZXMrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaGVyb2VzID09IDAgfHwgZW5lbWllcyA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTW92ZUNob3NlbihNb3ZlVHlwZSBtb3ZlVHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGUubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IHZhbHVlID0gZS5tb3Zlc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0gPSAoaW50KSBtb3ZlVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRXhlY3V0ZU1vdmVzKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJibGFcIiArIGJhdHRsZVN0YXRlLnR1cm4uVmFsKTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLlJlYWQoKTtcclxuICAgICAgICAgICAgQmF0dGxlRW50aXR5IGF0dGFja2VyID0gZW50aXRpZXNbYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5XTtcclxuICAgICAgICAgICAgaW50IHR1cm4gPSBiYXR0bGVTdGF0ZS50dXJuO1xyXG4gICAgICAgICAgICBFeGVjdXRlTW92ZShhdHRhY2tlciwgdHVybik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFeGVjdXRlTW92ZShCYXR0bGVFbnRpdHkgYWN0b3IsIGludCB0dXJuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTW92ZURhdGFFeGVjdXRlci5FeGVjdXRlTW92ZShhY3RvciwgdHVybik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IENhbGN1bGF0ZUF0dGFja011bHRpcGxpZXIoQmF0dGxlRW50aXR5IGFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJhc2VEID0gYWN0b3IuZGFtYWdlTXVsdGlwbGllcjtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlICE9IGFjdG9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnBvcyA9PSBhY3Rvci5wb3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VEICo9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJhc2VEO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBDYWxjdWxhdGVEZWZlbmRlck11bHRpcGxpZXIoQmF0dGxlRW50aXR5IGFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJhc2VEID0gMTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlICE9IGFjdG9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnBvcyA9PSBhY3Rvci5wb3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VEICo9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJhc2VEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEJhdHRsZVN0YXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgVmFsdWUgdHVybiA9IG5ldyBWYWx1ZSgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IHRvdGFsVHVybnM7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWYWx1ZSB0dXJuc1BlclBoYXNlID0gbmV3IFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWYWx1ZSBtb3ZlVGlja19Ob3cgPSBuZXcgVmFsdWUoKTtcclxuICAgICAgICAgICAgcHVibGljIGludCBtb3ZlVGlja19Ub3RhbCA9IDA7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgYWN0aW5nRW50aXR5ID0gMDtcclxuICAgICAgICAgICAgcHVibGljIEJhdHRsZVBoYXNlIHBoYXNlO1xyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBCYXR0bGVFbmRBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEJhdHRsZUVudGl0eSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgbGlmZTtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIHBvcyA9IG5ldyBWZWN0b3IyRCgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgbWluUG9zID0gbmV3IFZlY3RvcjJEKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBtYXhQb3MgPSBuZXcgVmVjdG9yMkQoKTtcclxuICAgICAgICAgICAgcHVibGljIGludFtdIG1vdmVzID0gbmV3IGludFsxMF07XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgZ3JhcGhpYztcclxuICAgICAgICAgICAgcHVibGljIGludCBncmFwaGljUmVwZWF0ZWRJbmRleDtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IGRhbWFnZU11bHRpcGxpZXIgPSAxO1xyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBkcmF3TGlmZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIGRyYXdUdXJuID0gdHJ1ZTtcclxuICAgICAgICAgICAgcHVibGljIGJvb2wgcmFuZG9tUG9zaXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgcHVibGljIEVsZW1lbnQgZWxlbWVudCA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZTtcclxuICAgICAgICAgICAgcHVibGljIGludCBtYXhMaWZlID0gMztcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBFbnRpdHlUeXBlIFR5cGUgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmhlcm87XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBQb3NpdGlvblYyRCB7IGdldCB7IHJldHVybiBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKHBvcy5YLCBwb3MuWSk7IH0gfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGJvb2wgRGVhZCB7IGdldCB7IHJldHVybiBsaWZlIDw9IDA7IH0gfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGJvb2wgQWxpdmUgeyBnZXQgeyByZXR1cm4gIXRoaXMuRGVhZDsgfSB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gTW92ZVR5cGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERvTm90aGluZyxcclxuICAgICAgICAgICAgTW92ZVVwLFxyXG4gICAgICAgICAgICBNb3ZlTGVmdCxcclxuICAgICAgICAgICAgTW92ZURvd24sXHJcbiAgICAgICAgICAgIE1vdmVSaWdodCxcclxuICAgICAgICAgICAgTm9ybWFsU2hvdCxcclxuICAgICAgICAgICAgRmlyZSxcclxuICAgICAgICAgICAgSWNlLFxyXG4gICAgICAgICAgICBUaHVuZGVyLFxyXG4gICAgICAgICAgICBJY2VCb21iLFxyXG4gICAgICAgICAgICBUaHVuZGVyQm9tYixcclxuICAgICAgICAgICAgU3VtbW9uRW50aXR5XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBIYXBwVGFnXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBdHRhY2tIaXQsXHJcbiAgICAgICAgICAgIEF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIERhbWFnZVRha2VuLFxyXG4gICAgICAgICAgICBNb3ZlbWVudEZhaWxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEJhdHRsZVBoYXNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbmVteU1vdmVDaG9pY2UsXHJcbiAgICAgICAgICAgIEhhbmRSZWNoYXJnZSxcclxuICAgICAgICAgICAgUGlja0hhbmRzLFxyXG4gICAgICAgICAgICBFeGVjdXRlTW92ZSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEVudGl0eVR5cGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGhlcm8sIGVuZW15LCBwaWNrdXAsIHBhbmVsZWZmZWN0XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBFbGVtZW50XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGaXJlLCBJY2UsIFRodW5kZXIsXHJcbiAgICAgICAgICAgIE5vbmVcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBpbnQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0JvYXJkV2lkdGg9Njtwcml2YXRlIGludCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQm9hcmRIZWlnaHQ9Mzt9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVmFsdWVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgVmFsIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudW0gdmFsQXNFbnVtIHsgc2V0IHsgVmFsID0gQ29udmVydC5Ub1NpbmdsZSh2YWx1ZSk7IH0gfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldChpbnQgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZhbCA9IHY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZhbHVlIG9wZXJhdG9yICsoVmFsdWUgYzEsIGZsb2F0IGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYzEuVmFsICs9IGMyO1xyXG4gICAgICAgICAgICByZXR1cm4gYzE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IG9wZXJhdG9yIC0oVmFsdWUgYzEsIGZsb2F0IGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGMxLlZhbCAtIGMyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFZhbHVlIGMxLCBWYWx1ZSBjMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJvb2wgYzJudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMiwgbnVsbCk7XHJcbiAgICAgICAgICAgIGJvb2wgYzFudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmIChjMm51bGwgJiYgYzFudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGlmIChjMW51bGwgfHwgYzJudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGMxLlZhbCA9PSBjMi5WYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oVmFsdWUgYzEsIFZhbHVlIGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYm9vbCBjMm51bGwgPSBvYmplY3QuUmVmZXJlbmNlRXF1YWxzKGMyLCBudWxsKTtcclxuICAgICAgICAgICAgYm9vbCBjMW51bGwgPSBvYmplY3QuUmVmZXJlbmNlRXF1YWxzKGMxLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKGMybnVsbCAmJiBjMW51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChjMW51bGwgfHwgYzJudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYzEuVmFsICE9IGMyLlZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW1wbGljaXQgb3BlcmF0b3IgZmxvYXQoVmFsdWUgZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBkLlZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW1wbGljaXQgb3BlcmF0b3IgaW50KFZhbHVlIGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludClkLlZhbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIEJhdHRsZVJlc3VsdFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdHJ1Y3QgSW5wdXRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgSW5wdXRUeXBlIHR5cGU7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBhcmcxO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBJbnB1dChJbnB1dFR5cGUgdHlwZSwgaW50IGFyZzEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLmFyZzEgPSBhcmcxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElucHV0KElucHV0VHlwZSB0eXBlLCBFbnVtIGFyZzEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLmFyZzEgPSBDb252ZXJ0LlRvSW50MzIoYXJnMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIElucHV0VHlwZVxyXG4gICAge1xyXG4gICAgICAgIE5vbmUsIE1vdmUsIE1pc2NCYXR0bGVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBNaXNjQmF0dGxlSW5wdXRcclxuICAgIHtcclxuICAgICAgICBEb25lLCBSZWRvLCBQcmV2aWV3XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDb2xvclN0dWZmXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgc3RyaW5nIEdvb2RNYWluO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIG5ldXRyYWxEYXJrID0gXCIjMTkwMTNiXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgbmV1dHJhbFN0cm9uZyA9IFwiIzJjM2U0M1wiO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHN0cmluZyBHb29kU3ViO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHN0cmluZyBFdmlsTWFpbjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZ1tdIGNvbG9ycyA9IG5ldyBzdHJpbmdbMjBdO1xyXG5cclxuICAgICAgICBzdGF0aWMgQ29sb3JTdHVmZigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvbG9ycy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sb3JzW2ldID0gXCIjNDAwMDIwXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkhlcm9dID0gXCIjMDA5YzhkXCI7XHJcbiAgICAgICAgICAgIC8vY29uc3Qgc3RyaW5nIGhlcm9TdWIgPSBcIiMwMDVmOTFcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkhlcm9UdXJuXSA9IGhlcm9TdWI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5FbmVteV0gPSBcIiNmZjAzNTNcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkdyaWRIZXJvXSA9IGhlcm9TdWI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEVuZW15XSA9IFwiIzhlMDA2MFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15VHVybl0gPSBcIiM4ZTAwNjBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5Cb2FyZF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5pbnB1dEtleV0gPSBcIiM2ODg2OTBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5GaXJlQXVyYV0gPSBcIiM3OTMxMDBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5JY2VBdXJhXSA9IFwiIzAwNTU5MFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJBdXJhXSA9IFwiIzAwNTgzZFwiO1xyXG5cclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dID0gXCIjOGFkODk2XCI7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyBoZXJvU3ViID0gXCIjNGM2ZDUwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvVHVybl0gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXldID0gXCIjZmY3Njk0XCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVyb10gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgZW5lbXlzdWIgPSBcIiNhNzQ2NGZcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRFbmVteV0gPSBlbmVteXN1YjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15VHVybl0gPSBlbmVteXN1YjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQm9hcmRdID0gXCIjMWU0ODZlXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLmlucHV0S2V5XSA9IFwiIzY4ODY5MFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuRmlyZUF1cmFdID0gXCIjNzkzMTAwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkljZUF1cmFdID0gXCIjMDA1NTkwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJBdXJhXSA9IFwiIzAwNTgzZFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5GaXJlU2hvdF0gPSBcIiNmODJiMzZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuSWNlU2hvdF0gPSBcIiMwMDdlZmZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuVGh1bmRlclNob3RdID0gXCIjYTM3YzAwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkJhY2tncm91bmRJbnB1dF0gPSBcIiMwODA4MDhcIjtcclxuXHJcblxyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5pbnB1dEtleV0gPSBcIiM5RTg2NjRcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuSW5wdXREZXNjcmlwdGlvbl0gPSBcIiM4MDgwODBcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQmFja0JhdHRsZV0gPSBcIiMwMDAwMDBcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQmFja2dyb3VuZElucHV0XSA9IFwiIzFBMUExQVwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb1R1cm5dID0gXCIjMDBCMkIyXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteVR1cm5dID0gXCIjRkYwMDQwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVyb10gPSBcIiMwMDQ2OENcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRFbmVteV0gPSBcIiM4QzAwMjNcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dID0gXCIjNjZGRkZGXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteV0gPSBcIiNEOTAwMzZcIjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvXSA9IFwiI0JGQkZCRlwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXldID0gY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb1R1cm5dID0gY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXlUdXJuXSA9IGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvXTtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuV2luZG93TGFiZWxdID0gXCIjNjY2NjY2XCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkJhY2tDb21tYW5kXSA9IFwiIzMzMzMzM1wiO1xyXG5cclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuRmlyZUF1cmFdID0gXCIjRkY4QzY2XCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkljZUF1cmFdID0gXCIjNjZGRkZGXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJBdXJhXSA9IFwiI0ZGRkY2NlwiO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkRlYnVnRXh0cmFcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBEZWJ1Z0V4XHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIExpc3Q8c3RyaW5nPiBtZXNzYWdlcyA9IG5ldyBMaXN0PHN0cmluZz4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIExvZyhzdHJpbmcgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VzLkFkZCh2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG93KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnNvbGUuQ2xlYXIoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbWVzc2FnZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ29uc29sZS5SZWFkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgaW50ZXJuYWwgY2xhc3MgRUNTSW50ZWdyYXRpb25cclxuICAgIHtcclxuXHJcbiAgICAgICAgU3Bhd25FbnRpdHlGYWN0b3J5IGVuZW15RmFjdG9yeTtcclxuICAgICAgICBFQ1NNYW5hZ2VyIGVjcztcclxuXHJcbiAgICAgICAgcHVibGljIEVDU0ludGVncmF0aW9uKFNwYXduRW50aXR5RmFjdG9yeSBlbmVteUZhY3RvcnksIEVDU01hbmFnZXIgZWNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbmVteUZhY3RvcnkgPSBlbmVteUZhY3Rvcnk7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBIZXJvQ3JlYXRlZChCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBoZXJvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQoaGVybyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNwYXduRW5lbWllcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbmVteUZhY3RvcnkuU3Bhd24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEVuZW15QUlcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgTGlzdDxvYmplY3Q+IG1vdmVzID0gbmV3IExpc3Q8b2JqZWN0PigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBFbmVteUFJU3RhdGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IHByb2dyZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBNb3ZlVXNlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBtb3ZlO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVVzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVVc2UoaW50IG1vdmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUgPSBtb3ZlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU3Bhd25FbnRpdHlGYWN0b3J5XHJcbiAgICB7XHJcblxyXG4gICAgICAgIEVDU01hbmFnZXIgZWNzO1xyXG4gICAgICAgIExpc3Q8RW5lbXlEYXRhPiBlbmVteURhdGFzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgQmF0dGxlTWFpbiBiYXR0bGVNYWluO1xyXG4gICAgICAgIHByaXZhdGUgUXVpY2tBY2Nlc3Nvck9uZTxTcGF3bkRhdGE+IHNwYXducztcclxuXHJcbiAgICAgICAgcHVibGljIFNwYXduRW50aXR5RmFjdG9yeShFQ1NNYW5hZ2VyIGVjcywgTGlzdDxFbmVteURhdGE+IGVuZW15RGF0YXMsIEJhdHRsZU1haW4gYmF0dGxlTWFpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICAvL2Vjcy5RdWlja0FjY2Vzc29yMTxFbmVteURhdGE+KCk7XHJcbiAgICAgICAgICAgIHNwYXducyA9IGVjcy5RdWlja0FjY2Vzc29yMTxTcGF3bkRhdGE+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlEYXRhcyA9IGVuZW15RGF0YXM7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlTWFpbiA9IGJhdHRsZU1haW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTcGF3bigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgc3Bhd25lZCA9IDA7XHJcbiAgICAgICAgICAgIC8vZm9yIChpbnQgaSA9IDA7IGkgPCBzcGF3bnMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAgd2hpbGUgKHNwYXducy5Db3VudCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNwYXduRGF0YSBzcGF3biA9IHNwYXducy5Db21wMSgwKTtcclxuICAgICAgICAgICAgICAgIHNwYXducy5FbnRpdHkoMCkuUmVtb3ZlQ29tcG9uZW50KHNwYXduKTtcclxuICAgICAgICAgICAgICAgIHZhciBpZCA9IHNwYXduLmlkO1xyXG4gICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5FbnRpdHlUeXBlIGVudFR5cGUgPSAoQmF0dGxlTWFpbi5FbnRpdHlUeXBlKXNwYXduLmVudGl0eVR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZihlbnRUeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5waWNrdXApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJlID0gYmF0dGxlTWFpbi5OZXdCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5UeXBlID0gZW50VHlwZTtcclxuICAgICAgICAgICAgICAgICAgICBQaWNrdXBJbmZvIHBpY2t1cCA9IG5ldyBQaWNrdXBJbmZvKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwaWNrdXBFID0gZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQocGlja3VwKTtcclxuICAgICAgICAgICAgICAgICAgICBwaWNrdXBFLkFkZENvbXBvbmVudChiZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUucG9zID0gc3Bhd24ucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgYmUubGlmZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUubWF4TGlmZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUuZHJhd0xpZmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5kcmF3VHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLmdyYXBoaWMgPSA0O1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGVudFR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmVteUFJID0gZW5lbXlEYXRhc1tpZF0uZW5lbXlBSTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5lbXkgPSBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChlbmVteUFJKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmUgPSBiYXR0bGVNYWluLk5ld0JhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLnBvcyA9IHNwYXduLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLmxpZmUgPSBlbmVteURhdGFzW2lkXS5ocDtcclxuICAgICAgICAgICAgICAgICAgICBiZS5tYXhMaWZlID0gYmUubGlmZTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5ncmFwaGljID0gZW5lbXlEYXRhc1tpZF0ucmVuZGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbnRpdGllcyA9IGJhdHRsZU1haW4uZW50aXRpZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPSBiZSAmJiBpdGVtLmdyYXBoaWMgPT0gYmUuZ3JhcGhpYylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmUuZ3JhcGhpY1JlcGVhdGVkSW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBiZS5taW5Qb3MgPSBuZXcgVmVjdG9yMkQoMywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUubWF4UG9zID0gbmV3IFZlY3RvcjJEKDUsIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLlR5cGUgPSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5lbXkuQWRkQ29tcG9uZW50KGJlKTtcclxuICAgICAgICAgICAgICAgICAgICBFbmVteUFJU3RhdGUgZW5lbXlBaVN0YXRlID0gbmV3IEVuZW15QUlTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZW15QWlTdGF0ZS5wcm9ncmVzcyA9IHNwYXduZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5lbXkuQWRkQ29tcG9uZW50KGVuZW15QWlTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiU1BBV05cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Bhd25lZCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBQaWNrdXBJbmZvXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGJvb2wgbmVjZXNzYXJ5Rm9yVmljdG9yeTtcclxuXHJcbiAgICAgICAgcHVibGljIFBpY2t1cEluZm8oYm9vbCBuZWNlc3NhcnlGb3JWaWN0b3J5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5uZWNlc3NhcnlGb3JWaWN0b3J5ID0gbmVjZXNzYXJ5Rm9yVmljdG9yeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQaWNrdXBJbmZvKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBFbmVteURhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgRW5lbXlBSSBlbmVteUFJO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgaHA7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCByZW5kZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmVteURhdGEoRW5lbXlBSSBlbmVteUFJLCBpbnQgaHAsIGludCByZW5kZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15QUkgPSBlbmVteUFJO1xyXG4gICAgICAgICAgICB0aGlzLmhwID0gaHA7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyID0gcmVuZGVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRW5lbXlEYXRhQ3JlYXRvclxyXG4gICAge1xyXG4gICAgICAgIExpc3Q8c3RyaW5nPiByZW5kZXJUZXh0cztcclxuICAgICAgICBwdWJsaWMgTGlzdDxFbmVteURhdGE+IGVuZW15RGF0YXMgPSBuZXcgTGlzdDxFbmVteURhdGE+KCk7XHJcbiAgICAgICAgTW92ZUNyZWF0b3JQcm9nIG1vdmVDcmVhdG9yUHJvZztcclxuXHJcbiAgICAgICAgcHVibGljIEVuZW15RGF0YUNyZWF0b3IoTGlzdDxzdHJpbmc+IHJlbmRlclRleHRzLCBNb3ZlQ3JlYXRvclByb2cgbW92ZUNyZWF0b3JQcm9nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVuZGVyVGV4dHMuQWRkKFwiQFwiKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJUZXh0cyA9IHJlbmRlclRleHRzO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDcmVhdG9yUHJvZyA9IG1vdmVDcmVhdG9yUHJvZztcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcbiAgICAgICAgICAgICAgICBNb3ZlcyhQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93biwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0LCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXAsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIpXHJcbiAgICAgICAgICAgICAgICApLCBocDoyLCByZW5kZXJUZXh0OlwiJVwiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcbiAgICAgICAgICAgICAgICBNb3ZlcyhQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb05vdGhpbmcsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZylcclxuICAgICAgICAgICAgICAgICksIGhwOiAzLCByZW5kZXJUZXh0OiBcIiNcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAgICBNb3ZlcyhcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXJCb21iLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLk1vdmVSaWdodFxyXG4gICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICApLCBocDogNiwgcmVuZGVyVGV4dDogXCImXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYixcclxuICAgICAgICAgICAgICAgICAgIFwiU3VtbW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXJCb21iLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLkZpcmVcclxuXHJcblxyXG4gICAgICAgICAgICAgICApLCBocDogNDUsIHJlbmRlclRleHQ6IFwiJFwiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93bixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24sXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVxyXG4uTW92ZVVwXHJcblxyXG5cclxuICAgICAgICAgICAgICAgKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiSFwiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcblxyXG4gICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuSWNlLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLkRvTm90aGluZ1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICApLCBocDogMywgcmVuZGVyVGV4dDogXCJKXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZyxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlXHJcbi5Eb05vdGhpbmdcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiTFwiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcblxyXG4gICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZyxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlXHJcbi5Eb05vdGhpbmdcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiS1wiKTtcclxuICAgICAgICAgICAgLy9BZGRFbmVteShhaTogQWN0aW9ucygpLCBocDogMywgcmVuZGVyVGV4dDogXCIkXCIpO1xyXG4gICAgICAgICAgICAvL0FkZEVuZW15KGFpOiBBY3Rpb25zKCksIGhwOiA1LCByZW5kZXJUZXh0OiBcIiNcIik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBFbmVteUFJIEFjdGlvbnMocGFyYW1zIG9iamVjdFtdIG9icylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBhaSA9IG5ldyBFbmVteUFJKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbyBpbiBvYnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChvIGlzIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpLm1vdmVzLkFkZChuZXcgTW92ZVVzZSgoaW50KW8pKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChvIGlzIHN0cmluZylcclxuICAgICAgICAgICAgICAgIHsgICBcclxuICAgICAgICAgICAgICAgICAgICBhaS5tb3Zlcy5BZGQobmV3IE1vdmVVc2UobW92ZUNyZWF0b3JQcm9nLkdldE1vdmVJZChvIGFzIHN0cmluZykpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChvIGlzIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlW10pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbyBhcyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVtdKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWkubW92ZXMuQWRkKG5ldyBNb3ZlVXNlKChpbnQpaXRlbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFpLm1vdmVzLkFkZChvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlW10gTW92ZXMocGFyYW1zIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlW10gbW92ZXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbW92ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkRW5lbXkoRW5lbXlBSSBhaSwgaW50IGhwLCBzdHJpbmcgcmVuZGVyVGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCByZW5kZXIgPSByZW5kZXJUZXh0cy5Db3VudDtcclxuICAgICAgICAgICAgcmVuZGVyVGV4dHMuQWRkKHJlbmRlclRleHQpO1xyXG4gICAgICAgICAgICBlbmVteURhdGFzLkFkZChuZXcgRW5lbXlEYXRhKGFpLCBocCwgcmVuZGVyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFN0YWdlRGF0YUNyZWF0b3JcclxuICAgIHtcclxuICAgICAgICAvL3B1YmxpYyBMaXN0PFN0YWdlRGF0YT4gc3RhZ2VzID0gbmV3IExpc3Q8U3RhZ2VEYXRhPigpO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgRUNTTWFuYWdlciBlY3M7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFnZURhdGFDcmVhdG9yKEVDU01hbmFnZXIgZWNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcblxyXG4gICAgICAgICAgICAvL0FkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAvLyAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgLy8gIEVuZW15KDUsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpLFxyXG4gICAgICAgICAgICAvLyAgRW5lbXkoNywgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAwKSlcclxuICAgICAgICAgICAgLy8gICkpO1xyXG5cclxuICAgICAgICAgICAgQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgICAgUGlja3VwKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMCwgMCkpLFxyXG4gICAgICAgICAgICAgICAgUGlja3VwKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMiwgMikpXHJcbiAgICAgICAgICAgICAgICApLkhpZGVMaWZlVUkoKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoKSk7XHJcbiAgICAgICAgICAgIEFkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICAgIG5ldyBCYXR0bGVDb25maWcobmVlZEtpbGxBbGxFbmVtaWVzOmZhbHNlKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDIsIDEpKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIDIpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDQsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpXHJcbiAgICAgICAgICAgICAgICApLkhpZGVMaWZlVUkoKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoKSk7XHJcbiAgICAgICAgICAgIEFkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICAgIG5ldyBCYXR0bGVDb25maWcobmVlZEtpbGxBbGxFbmVtaWVzOiBmYWxzZSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgyLCAyKSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgxLCAyKSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgwLCAyKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSg1LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDIpKVxyXG4gICAgICAgICAgICAgICAgKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoKSk7XHJcbiAgICAgICAgICAgIEFkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDYsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMCkpXHJcbiAgICAgICAgICAgICAgICApLCBuZXcgRml4ZWRBdHRhY2tTdGFnZShcclxuICAgICAgICAgICAgICAgICAgICAoaW50KUJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSkpO1xyXG4gICAgICAgICAgICBBZGQobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICAgRW5lbXkoNCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSlcclxuICAgICAgICAgICAgICAgKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAoaW50KUJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSkpO1xyXG4gICAgICAgICAgICBBZGQobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICAgRW5lbXkoNSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSlcclxuICAgICAgICAgICAgICAgKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAoaW50KUJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSkpO1xyXG4gICAgICAgICAgICBBZGQobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgIEVuZW15KDUsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpLFxyXG4gICAgICAgICAgICAgIEVuZW15KDcsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMCkpXHJcbiAgICAgICAgICAgICAgKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoXHJcbiAgICAgICAgICAgICAgICAgIChpbnQpQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlLCAoaW50KUJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlciApKTtcclxuICAgICAgICAgICAgQWRkKFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAwKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDIpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIEVuZW15KDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMikpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMiwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSgxLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIEVuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMikpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMiwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAxKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSgyLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgICAgICBuZXcgQmF0dGxlQ29uZmlnKG5ldyBpbnRbXSB7IDEgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgRW5lbXkoMywgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSlcclxuICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICAvLyxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyxcclxuICAgICAgICAgICAgICAgIC8vbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIC8vbmV3IEVuZW15U3Bhd25EYXRhKDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpLFxyXG4gICAgICAgICAgICAgICAgLy9uZXcgRW5lbXlTcGF3bkRhdGEoMSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSkpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZGQocGFyYW1zIG9iamVjdFtdIGNvbXBzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBlID0gZWNzLkNyZWF0ZUVudGl0eSgpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBjb21wcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZS5BZGRDb21wb25lbnQoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFNwYXduRGF0YSBQaWNrdXAoaW50IHYsIFZlY3RvcjJEIHZlY3RvcjJEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTcGF3bkRhdGEodiwgdmVjdG9yMkQsIChpbnQpQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFNwYXduRGF0YSBFbmVteShpbnQgdiwgVmVjdG9yMkQgdmVjdG9yMkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNwYXduRGF0YSh2LCB2ZWN0b3IyRCwgKGludClCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEFkZChwYXJhbXMgU3RhZ2VEYXRhW10gc3RhZ2VEYXRhMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHN0YWdlRGF0YTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vc3RhZ2VzLkFkZFJhbmdlKHN0YWdlRGF0YTEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU3RhZ2VEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8U3Bhd25EYXRhPiBlbmVteVNwYXducyA9IG5ldyBMaXN0PFNwYXduRGF0YT4oKTtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnIGJhdHRsZUNvbmZpZztcclxuICAgICAgICBwdWJsaWMgYm9vbCBoaWRlTGlmZVVJID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFnZURhdGEoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFnZURhdGEocGFyYW1zIFNwYXduRGF0YVtdIHNwYXducylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVuZW15U3Bhd25zLkFkZFJhbmdlKHNwYXducyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhZ2VEYXRhKEJhdHRsZUNvbmZpZyBiYXR0bGVDb25maWcsIHBhcmFtcyBTcGF3bkRhdGFbXSBzcGF3bnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbmVteVNwYXducy5BZGRSYW5nZShzcGF3bnMpO1xyXG4gICAgICAgICAgICB0aGlzLmJhdHRsZUNvbmZpZyA9IGJhdHRsZUNvbmZpZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFnZURhdGEgSGlkZUxpZmVVSSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBoaWRlTGlmZVVJID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBGaXhlZEF0dGFja1N0YWdlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8aW50PiBtb3ZlcyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIEZpeGVkQXR0YWNrU3RhZ2UoaW50IG1vdmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3Zlcy5BZGQobW92ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRml4ZWRBdHRhY2tTdGFnZShwYXJhbXMgaW50W10gbW92ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdmVzLkFkZFJhbmdlKG1vdmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEZpeGVkQXR0YWNrU3RhZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFNwYXduRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgaWQ7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBlbnRpdHlUeXBlO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXNlVXRpbHMuVmVjdG9yMkQgcG9zaXRpb247XHJcblxyXG4gICAgICAgIHB1YmxpYyBTcGF3bkRhdGEoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTcGF3bkRhdGEoaW50IGlkLCBWZWN0b3IyRCBwb3NpdGlvbiwgaW50IHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5lbnRpdHlUeXBlID0gdHlwZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkhhcHBzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZURhdGFFeGVjdXRlclxyXG4gICAge1xyXG4gICAgICAgIEJhdHRsZU1haW4gYmF0dGxlTWFpbjtcclxuICAgICAgICBMaXN0PE1vdmVEYXRhPiBtb3ZlRGF0YXM7XHJcbiAgICAgICAgcHJpdmF0ZSBIYXBwTWFuYWdlciBoYXBwTWFuYWdlcjtcclxuICAgICAgICBwcml2YXRlIExpc3Q8QmF0dGxlTWFpbi5CYXR0bGVFbnRpdHk+IGVudGl0aWVzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgVGltZVN0YW1wIHRpbWVTdGFtcDtcclxuICAgICAgICBMaXN0PFZlY3RvcjJEPiBhdXggPSBuZXcgTGlzdDxWZWN0b3IyRD4oKTtcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlRGF0YUV4ZWN1dGVyKEJhdHRsZU1haW4gdHVybkJhc2UsIExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcywgRUNTTWFuYWdlciBlY3MsIFRpbWVTdGFtcCB0aW1lU3RhbXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJhdHRsZU1haW4gPSB0dXJuQmFzZTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlRGF0YXMgPSBtb3ZlRGF0YXM7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IHRpbWVTdGFtcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEV4ZWN1dGVNb3ZlKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGFjdG9yLCBpbnQgdHVybilcclxuICAgICAgICB7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGJhdHRsZVN0YXRlID0gdGhpcy5iYXR0bGVNYWluLmJhdHRsZVN0YXRlO1xyXG4gICAgICAgICAgICBlbnRpdGllcyA9IHRoaXMuYmF0dGxlTWFpbi5lbnRpdGllcztcclxuICAgICAgICAgICAgaW50IHVzZXJJZCA9IGVudGl0aWVzLkluZGV4T2YoYWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1vdmVJZCA9IGFjdG9yLm1vdmVzW3R1cm5dO1xyXG4gICAgICAgICAgICBpZiAobW92ZUlkIDwgMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgbWQgPSBtb3ZlRGF0YXNbbW92ZUlkXTtcclxuICAgICAgICAgICAgaWYgKG1kID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSBtZC51bml0cy5Db3VudDtcclxuICAgICAgICAgICAgaW50IG1vdmVUaWNrID0gYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93O1xyXG4gICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1kLnVuaXRzW21vdmVUaWNrXS50aGluZ3NUb0hhcHBlbjtcclxuICAgICAgICAgICAgaGFwcE1hbmFnZXIgPSBiYXR0bGVNYWluLmhhcHBNYW5hZ2VyO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYSBpbiBhY3Rpb25zKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGEgaXMgTW92ZUFjdGlvbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlQWN0aW9uIG1hID0gYSBhcyBNb3ZlQWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwID0gbWEuZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0b3IucG9zICs9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBpbnZhbGlkTW92ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLnBvcy5YIDwgYWN0b3IubWluUG9zLlhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgYWN0b3IucG9zLlkgPCBhY3Rvci5taW5Qb3MuWVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhY3Rvci5wb3MuWSA+IGFjdG9yLm1heFBvcy5ZXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGFjdG9yLnBvcy5YID4gYWN0b3IubWF4UG9zLlg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZSAhPSBhY3RvciAmJiBlLkFsaXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0b3IucG9zID09IGUucG9zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRNb3ZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5waWNrdXApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmxpZmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5kYW1hZ2VNdWx0aXBsaWVyID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZE1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW52YWxpZE1vdmUpIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGludmFsaWRNb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkludmFsaWQgbW92ZSBnZW5lcmF0ZVwiICsgYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93LlZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgYWN0b3JJZCA9IGVudGl0aWVzLkluZGV4T2YoYWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDcmVhdGVIYXBwKG1kLCBuZXcgSGFwcE1vdmVEYXRhKGFjdG9ySWQpLCBuZXcgSGFwcE1vdmVtZW50RmFpbChhY3Rvci5wb3MpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVNYWluLmhhcHBNYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQWRkKG5ldyBIYXBwKEJhdHRsZU1haW4uSGFwcFRhZy5Nb3ZlbWVudEZhaWwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShhY3RvcklkKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoYWN0b3IucG9zLlgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShhY3Rvci5wb3MuWSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5wb3MgLT0gcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYSBpcyBEZWFsRGFtYWdlQWN0aW9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZGEgPSBhIGFzIERlYWxEYW1hZ2VBY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dGFja0VsZW1lbnQgPSBkZGEuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGRhLnRhcmdldCA9PSBUYXJnZXQuQXJlYSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmVhID0gZGRhLmFyZWE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZlcmVuY2VVc2VyT2ZBcmVhID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGFyZWEudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IG1pcnJvcmluZ1ggPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0b3IuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpIC8vZW5lbWllcyBhY3Qgb24gb3Bwb3NpdGUgc2lkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXJyb3JpbmdYID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHBvaW50IGluIGFyZWEucG9pbnRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VhcmNoUG9zID0gcG9pbnQgKiBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKG1pcnJvcmluZ1gsIDEpICsgcmVmZXJlbmNlVXNlck9mQXJlYS5wb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiU2VhcmNoIHBvaW50IFwiK3NlYXJjaFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0aWVzW2ldLnBvcyA9PSBzZWFyY2hQb3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWFsRGFtYWdlKGFjdG9yLCBkZGEsIGVudGl0aWVzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZmluZCB0YXJnZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgdGFyZ2V0ID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGRkYS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlYWxEYW1hZ2UoYWN0b3IsIGRkYSwgdGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYSBpcyBTdW1tb25FbnRpdHkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlID0gYSBhcyBTdW1tb25FbnRpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZW15V2hpY2ggPSBzZS5lbmVteVdoaWNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmVteUlkID0gYmF0dGxlTWFpbi5CYXR0bGVDb25maWcuZW5lbWllc1RvU3VtbW9uW2VuZW15V2hpY2hdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbnRpdGllcyA9IGJhdHRsZU1haW4uZW50aXRpZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9ucyA9IEdldEVtcHR5U3BvdHMoc2lkZToxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb25zLkNvdW50ID09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yMkQgc3VtbW9uUG9zID0gc2UucHJlZmVyZW50aWFsUm93Q29sdW1uO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcG9zaXRpb25zLkNvbnRhaW5zKHN1bW1vblBvcykpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tb25Qb3MgPSBwb3NpdGlvbnNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG5ldyBTcGF3bkRhdGEoZW5lbXlJZCwgc3VtbW9uUG9zLCAoaW50KUJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGEgaXMgQW5pbWF0aW9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhbmltID0gYSBhcyBBbmltYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgdGFyZ2V0ID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGFuaW0udGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJlYSA9IGFuaW0uYXJlYTtcclxuICAgICAgICAgICAgICAgICAgICBIYXBwQXJlYSBoYXBwQXJlYSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZWEgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZlcmVuY2VVc2VyT2ZBcmVhID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGFyZWEudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBtaXJyb3JpbmdYID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdG9yLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KSAvL2VuZW1pZXMgYWN0IG9uIG9wcG9zaXRlIHNpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlycm9yaW5nWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBBcmVhID0gbmV3IEhhcHBBcmVhKGFyZWEsIHJlZmVyZW5jZVVzZXJPZkFyZWEucG9zLCBtaXJyb3JpbmdYKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHRhcmdldElkID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJZCA9IGVudGl0aWVzLkluZGV4T2YodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBDcmVhdGVIYXBwKG1kLCBoYXBwQXJlYSwgbmV3IEhhcHBNb3ZlRGF0YSh1c2VySWQsIHRhcmdldElkLCBhbmltLmVsZW1lbnQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW0udGFyZ2V0ICE9IFRhcmdldC5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcE1hbmFnZXJcclxuLkFkZChuZXcgSGFwcChCYXR0bGVNYWluLkhhcHBUYWcuQXR0YWNrSGl0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShlbnRpdGllcy5JbmRleE9mKHRhcmdldCkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKHVzZXJJZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoKGludClhbmltLmVsZW1lbnQpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1vdmVUaWNrID09IG1kLnVuaXRzLkNvdW50IC0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbWQudW5pdHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFjdCBpbiBpdGVtLnRoaW5nc1RvSGFwcGVuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdCBpcyBEZWFsRGFtYWdlQWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VFbGVtZW50KGFjdG9yLCAoYWN0IGFzIERlYWxEYW1hZ2VBY3Rpb24pLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PFZlY3RvcjJEPiBHZXRFbXB0eVNwb3RzKGludCBzaWRlID0gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhdXguQ2xlYXIoKTtcclxuICAgICAgICAgICAgaW50IG9mZlggPSAwO1xyXG4gICAgICAgICAgICBpZiAoc2lkZSA9PSAxKSBvZmZYID0gMztcclxuICAgICAgICAgICAgaW50IHdpZHRoID0gYmF0dGxlTWFpbi5Cb2FyZFdpZHRoIC8gMjtcclxuICAgICAgICAgICAgaWYgKHNpZGUgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICB3aWR0aCA9IGJhdHRsZU1haW4uQm9hcmRXaWR0aDtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGJhdHRsZU1haW4uQm9hcmRIZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LkFkZChuZXcgVmVjdG9yMkQoaStvZmZYLGopKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZW50aXRpZXMgPSBiYXR0bGVNYWluLmVudGl0aWVzO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuQWxpdmUgJiYgYXV4LkNvbnRhaW5zKGUucG9zKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXguUmVtb3ZlKGUucG9zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXV4O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDaGFuZ2VFbGVtZW50KEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGFjdG9yLCBCYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChhY3Rvci5lbGVtZW50ID09IGVsZW1lbnQpIHJldHVybjtcclxuICAgICAgICAgICAgYWN0b3IuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHZhciB0aCA9IG5ldyBIYXBwVGFncygoaW50KU1pc2NIYXBwVGFncy5DaGFuZ2VFbGVtZW50KTtcclxuICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQodGgsIG5ldyBIYXBwTW92ZURhdGEoZW50aXRpZXMuSW5kZXhPZihhY3RvciksIC0xLCBlbGVtZW50KSkuQWRkQ29tcG9uZW50KHRpbWVTdGFtcC5HZXRTbmFwKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENyZWF0ZUhhcHAoTW92ZURhdGEgbWQsIG9iamVjdCBjb21wMSwgb2JqZWN0IGNvbXAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoID0gbmV3IEhhcHBUYWdzKG1kLnRhZ3MpO1xyXG4gICAgICAgICAgICB2YXIgZSA9IGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KHRoLCB0aW1lU3RhbXAuR2V0U25hcCgpKTtcclxuICAgICAgICAgICAgaWYgKGNvbXAxICE9IG51bGwpIGUuQWRkQ29tcG9uZW50KGNvbXAxKTtcclxuICAgICAgICAgICAgaWYgKGNvbXAyICE9IG51bGwpIGUuQWRkQ29tcG9uZW50KGNvbXAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDcmVhdGVIYXBwKGludCB0YWcsIG9iamVjdCBjb21wMSwgb2JqZWN0IGNvbXAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoID0gbmV3IEhhcHBUYWdzKHRhZyk7XHJcbiAgICAgICAgICAgIHZhciBlID0gZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQodGgsIHRpbWVTdGFtcC5HZXRTbmFwKCkpO1xyXG4gICAgICAgICAgICBpZiAoY29tcDEgIT0gbnVsbCkgZS5BZGRDb21wb25lbnQoY29tcDEpO1xyXG4gICAgICAgICAgICBpZiAoY29tcDIgIT0gbnVsbCkgZS5BZGRDb21wb25lbnQoY29tcDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERlYWxEYW1hZ2UoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgYWN0b3IsIERlYWxEYW1hZ2VBY3Rpb24gZGRhLCBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSB0YXJnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCYXR0bGVNYWluLkVsZW1lbnQgYXR0YWNrRWxlbWVudCA9IGRkYS5lbGVtZW50O1xyXG4gICAgICAgICAgICBib29sIGVsZW1lbnRhbEJsb2NrID0gYXR0YWNrRWxlbWVudCA9PSB0YXJnZXQuZWxlbWVudCAmJiBhdHRhY2tFbGVtZW50ICE9IEJhdHRsZU1haW4uRWxlbWVudC5Ob25lO1xyXG4gICAgICAgICAgICBib29sIHN1cGVyRWZmZWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGludCBkYW1hZ2UgPSAwO1xyXG4gICAgICAgICAgICBpbnQgdGFyZ2V0SWQgPSBlbnRpdGllcy5JbmRleE9mKHRhcmdldCk7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50YWxCbG9jaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghZWxlbWVudGFsQmxvY2spXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG11bCA9IGJhdHRsZU1haW4uQ2FsY3VsYXRlQXR0YWNrTXVsdGlwbGllcihhY3Rvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbXVsICo9IGJhdHRsZU1haW4uQ2FsY3VsYXRlRGVmZW5kZXJNdWx0aXBsaWVyKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFja0VsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkZpcmUgJiYgdGFyZ2V0LmVsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkljZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhdHRhY2tFbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyICYmIHRhcmdldC5lbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5GaXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGF0dGFja0VsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkljZSAmJiB0YXJnZXQuZWxlbWVudCA9PSBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlcilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bCAqPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBlckVmZmVjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGFtYWdlID0gZGRhLmRhbWFnZSAqIChpbnQpbXVsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5saWZlIC09IGRhbWFnZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBhY3Rvci5kYW1hZ2VNdWx0aXBsaWVyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBoYXBwTWFuYWdlci5BZGQobmV3IEhhcHAoQmF0dGxlTWFpbi5IYXBwVGFnLkRhbWFnZVRha2VuKSlcclxuICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKHRhcmdldElkKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5DcmVhdGVIYXBwKChpbnQpTWlzY0hhcHBUYWdzLkRhbWFnZSwgbmV3IEhhcHBEYW1hZ2VEYXRhKHRhcmdldC5lbGVtZW50LCBkZGEuZWxlbWVudCwgZW50aXRpZXMuSW5kZXhPZih0YXJnZXQpLCBkYW1hZ2UsIHN1cGVyRWZmZWN0aXZlLCBlbGVtZW50YWxCbG9jayksIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmxpZmUgPD0gMCAmJiAhc3VwZXJFZmZlY3RpdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENyZWF0ZUhhcHAoKGludClNaXNjSGFwcFRhZ3MuRGVhdGgsIG5ldyBIYXBwTW92ZURhdGEodGFyZ2V0SWQpLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgUmVzb2x2ZVRhcmdldChCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBhY3RvciwgTGlzdDxCYXR0bGVNYWluLkJhdHRsZUVudGl0eT4gZW50aXRpZXMsIFRhcmdldCB0YXJnZXRUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldFR5cGUgPT0gVGFyZ2V0LlNlbGYpIHJldHVybiBhY3RvcjtcclxuICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgdGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgZmxvYXQgbWluRGlzID0gMTA7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlMiBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlMi5EZWFkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rvci5UeXBlICE9IGUyLlR5cGVcclxuICAgICAgICAgICAgICAgICAgICAmJiBlMi5UeXBlICE9IEJhdHRsZU1haW4uRW50aXR5VHlwZS5wYW5lbGVmZmVjdFxyXG4gICAgICAgICAgICAgICAgICAgICYmIGUyLlR5cGUgIT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBib29sIHNhbWVIZWlnaHQgPSBhY3Rvci5wb3MuWSA9PSBlMi5wb3MuWTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNhbWVIZWlnaHQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdCBkaXMgPSBhY3Rvci5wb3MuWCAtIGUyLnBvcy5YO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzIDwgMCkgZGlzICo9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzIDwgbWluRGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EaXMgPSBkaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBlMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwVGFnc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PGludD4gdGFncyA9IG5ldyBMaXN0PGludD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBUYWdzKExpc3Q8aW50PiB0YWdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YWdzLkFkZFJhbmdlKHRhZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBUYWdzKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGFncy5BZGQoaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcFRhZ3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIE1pc2NIYXBwVGFnc3tcclxuICAgICAgICBDaGFuZ2VFbGVtZW50ID0gNTAwLFxyXG4gICAgICAgIERhbWFnZSA9IDUwMSxcclxuICAgICAgICBEZWF0aCA9IDUwMlxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwRGFtYWdlRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXR0bGVNYWluLkVsZW1lbnQgdGFyZ2V0RSwgZGFtYWdlRTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHRhcmdldDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGFtb3VudDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBzdXBlckVmZmVjdGl2ZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBlbGVtZW50YWxCbG9jaztcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBEYW1hZ2VEYXRhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcERhbWFnZURhdGEoQmF0dGxlTWFpbi5FbGVtZW50IHRhcmdldEUsIEJhdHRsZU1haW4uRWxlbWVudCBkYW1hZ2VFLCBpbnQgdGFyZ2V0LCBpbnQgYW1vdW50LCBib29sIHN1cGVyRWZmZWN0aXZlLCBib29sIGVsZW1lbnRhbEJsb2NrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRFID0gdGFyZ2V0RTtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2VFID0gZGFtYWdlRTtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuYW1vdW50ID0gYW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLnN1cGVyRWZmZWN0aXZlID0gc3VwZXJFZmZlY3RpdmU7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudGFsQmxvY2sgPSBlbGVtZW50YWxCbG9jaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBNb3ZlRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgdXNlcjtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHRhcmdldCA9IC0xO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IEJhdHRsZU1haW4uRWxlbWVudC5Ob25lO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcE1vdmVEYXRhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcE1vdmVEYXRhKGludCB1c2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwTW92ZURhdGEoaW50IHVzZXIsIGludCB0YXJnZXQsIEJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwTW92ZW1lbnRGYWlsXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFZlY3RvcjJEIG1vdmVUbztcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBNb3ZlbWVudEZhaWwoVmVjdG9yMkQgbW92ZVRvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlVG8gPSBtb3ZlVG87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcE1vdmVtZW50RmFpbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcEFyZWFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQXJlYSBhcmVhO1xyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRCBvZmZzZXQgPSBuZXcgVmVjdG9yMkQoKTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IG1pcnJvcmluZ1g7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwQXJlYShBcmVhIGFyZWEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSBhcmVhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBBcmVhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEFyZWEoQXJlYSBhcmVhLCBWZWN0b3IyRCBvZmZzZXQsIGludCBtaXJyb3JpbmdYKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIHRoaXMubWlycm9yaW5nWCA9IG1pcnJvcmluZ1g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuRGVidWdFeHRyYTtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5IYXBwc1xyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBDdXJyZW50VGltZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBMaXN0PEhhcHA+IEhhcHBzID0gbmV3IExpc3Q8SGFwcD4oKTtcclxuICAgICAgICBMaXN0PEhhcHBIYW5kbGVyPiBoYW5kbGVycyA9IG5ldyBMaXN0PEhhcHBIYW5kbGVyPigpO1xyXG4gICAgICAgIGludCBsYXRlc3RIYW5kbGVkID0gLTE7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZEhhbmRsZXIoSGFwcEhhbmRsZXIgaGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQoaGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVHJ5SGFuZGxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGxhdGVzdEhhbmRsZWQgIT0gQ3VycmVudFRpbWUpXHJcbiAgICAgICAgICAgICAgICBIYW5kbGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBIYW5kbGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGF0ZXN0SGFuZGxlZCA9IEN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaCBpbiBoYW5kbGVycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IEhhcHBzLkNvdW50IC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGNoZWNrIGFzc3VtZXMgaGFwcHMgYXJlIG9yZGVyZWQgYnkgdGltZSBzdGFtcFxyXG4gICAgICAgICAgICAgICAgICAgIC8vd2hpY2ggdGhleSBzaG91bGQgYmUgYXV0b21hdGljYWxseVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChIYXBwc1tpXS5UaW1lU3RhbXAgIT0gQ3VycmVudFRpbWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWJ1Z0V4LkxvZyhcIkhhcHBlbmluZyBub3QgZXF1YWwgdG8gY3VycmVudCB0aW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBoYXNUYWdzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdGFnc05lZWRlZCBpbiBoLm5lY2Vzc2FyeVRhZ3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUhhcHBzW2ldLkhhc1RhZyh0YWdzTmVlZGVkKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzVGFncyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1RhZ3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWJ1Z0V4LkxvZyhcIkhhcHBlbmluZyBoYW5kbGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoLkhhbmRsZShIYXBwc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlYnVnRXguTG9nKFwiSGFwcGVuaW5nIHRhZyBpcyBkaWZmZXJlbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcCBBZGQoSGFwcCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaC5UaW1lU3RhbXAgPSBDdXJyZW50VGltZTtcclxuICAgICAgICAgICAgSGFwcHMuQWRkKGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gaDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFRpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VycmVudFRpbWUrKztcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBcclxuICAgIHtcclxuICAgICAgICAvL3B1YmxpYyBzdHJpbmcgTWFpblRhZztcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IHRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIGludCBUaW1lU3RhbXA7XHJcbiAgICAgICAgTGlzdDxBdHRyaWJ1dGU+IGF0dHJzID0gbmV3IExpc3Q8QXR0cmlidXRlPigpO1xyXG5cclxuICAgICAgICAvL3B1YmxpYyBIYXBwKElDb252ZXJ0aWJsZSBjKVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vICAgIHRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihjKSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwKG9iamVjdCBtYWluVGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9NYWluVGFnID0gbWFpblRhZy5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICB0YWdzLkFkZChDb252ZXJ0LlRvSW50MzIobWFpblRhZykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEF0dHJpYnV0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IFZhbHVlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgQXR0cmlidXRlIFNldFZhbHVlKGZsb2F0IGYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFZhbHVlID0gZjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBUYWdIb2xkZXIgdGFncyA9IG5ldyBUYWdIb2xkZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwIEFkZEF0dHJpYnV0ZShBdHRyaWJ1dGUgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF0dHJzLkFkZChhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBpbnQgR2V0QXR0cmlidXRlX0ludChpbnQgaW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludClhdHRyc1tpbmRleF0uVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIEhhc1RhZyhpbnQgdGFnc05lZWRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YWdzLkNvbnRhaW5zKHRhZ3NOZWVkZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcEhhbmRsZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IG5lY2Vzc2FyeVRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIEFjdGlvbjxIYXBwPiBIYW5kbGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwSGFuZGxlcihvYmplY3QgbWFpblRhZywgQWN0aW9uPEhhcHA+IGhhbmRsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubmVjZXNzYXJ5VGFncy5BZGQoQ29udmVydC5Ub0ludDMyKG1haW5UYWcpKTtcclxuICAgICAgICAgICAgSGFuZGxlID0gaGFuZGxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGFnSG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8b2JqZWN0PiBUYWdzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBIYXNUYWcob2JqZWN0IHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGFncy5Db250YWlucyh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWRkKG9iamVjdCB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGFncy5BZGQodik7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgTGlzdDxvYmplY3Q+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19UYWdzPW5ldyBMaXN0PG9iamVjdD4oKTt9XHJcblxyXG5cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIElucHV0SG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8SW5wdXQ+IGlucHV0cyA9IG5ldyBMaXN0PElucHV0PigpO1xyXG4gICAgICAgIExpc3Q8SW5wdXRUYWdzPiB0YWdzID0gbmV3IExpc3Q8SW5wdXRUYWdzPigpO1xyXG5cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBDbGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnB1dHMuQ2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWRkKElucHV0IGlucHV0LCBJbnB1dFRhZ3MgdGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW5wdXRzLkFkZChpbnB1dCk7XHJcbiAgICAgICAgICAgIHRhZ3MuQWRkKHRhZyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBUYWdJcyhpbnQgaTIsIElucHV0VGFncyB0YWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGFncy5Db3VudCA8PSBpMikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGFnc1tpMl0gPT0gdGFnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBJbnB1dFRhZ3N7XHJcbiAgICAgICAgTk9ORSwgTU9WRUZJWCwgTU9WRVVORklYLCBNSVNDXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNb3ZlQ3JlYXRvclByb2dcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PE1vdmVEYXRhPiBtb3ZlRGF0YXMgPSBuZXcgTGlzdDxNb3ZlRGF0YT4oKTtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PE1vdmVSZW5kZXJEYXRhPiBtb3ZlUmVuZGVycyA9IG5ldyBMaXN0PE1vdmVSZW5kZXJEYXRhPigpO1xyXG4gICAgICAgIEFyZWFDcmVhdGlvblV0aWxzIGFyZWFVdGlscyA9IG5ldyBBcmVhQ3JlYXRpb25VdGlscygpO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZUNyZWF0b3JQcm9nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdmVEYXRhcy5BZGQobnVsbCk7IC8vZG8gbm90aGluZ1xyXG4gICAgICAgICAgICBCYXNlVXRpbHMuVmVjdG9yMkRbXSBkaXJlY3Rpb25zID0gbmV3IEJhc2VVdGlscy5WZWN0b3IyRFtdIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgwLCAxKSxcclxuICAgICAgICAgICAgICAgIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoLTEsIDApLFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgwLCAtMSksXHJcbiAgICAgICAgICAgICAgICBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDEsIDApLCBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc3RyaW5nW10gbW92ZUxhYmVscyA9IG5ldyBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgVXBcIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBMZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgRG93blwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIFJpZ2h0XCIsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHN0cmluZ1tdIG1vdmVBYnJldiA9IG5ldyBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgICAgICBcIl5cIixcclxuICAgICAgICAgICAgICAgIFwiPFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2XCIsXHJcbiAgICAgICAgICAgICAgICBcIj5cIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBkaXJlY3Rpb25zLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOZXdNb3ZlRGF0YShsYWJlbDptb3ZlTGFiZWxzW2ldLCBjb25kaXRpb246IG5ldyBDb25kaXRpb24oQ29uZGl0aW9uVHlwZS5DYW5Nb3ZlLCBUYXJnZXQuU2VsZiwgZGlyZWN0aW9uc1tpXSksIGFjdGlvbjogbmV3IE1vdmVBY3Rpb24oVGFyZ2V0LlNlbGYsIGRpcmVjdGlvbnNbaV0pLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuTW92ZW1lbnQsICBNb3ZlRGF0YVRhZ3MuSGVyb0luaXRpYWwpKTtcclxuICAgICAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShuYW1lOm1vdmVMYWJlbHNbaV0sIGFicmV2Om1vdmVBYnJldltpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJHdW5cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5Ob25lKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TaG9vdCkpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJHdW5cIiwgXCJHXCIpO1xyXG5cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJGaXJlZ3VuXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKG5ldyBBbmltYXRpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCBCYXR0bGVNYWluLkVsZW1lbnQuRmlyZSksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgMSwgQmF0dGxlTWFpbi5FbGVtZW50LkZpcmUpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkZpcmVndW5cIiwgXCJGR1wiKTtcclxuXHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiSWNlZ3VuXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKG5ldyBBbmltYXRpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCBCYXR0bGVNYWluLkVsZW1lbnQuSWNlKSwgbmV3IERlYWxEYW1hZ2VBY3Rpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCAxLCBCYXR0bGVNYWluLkVsZW1lbnQuSWNlKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TaG9vdCkpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJJY2VndW5cIiwgXCJJR1wiKTtcclxuXHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiVGh1bmRlcmd1blwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TaG9vdCkpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJUaHVuZGVyZ3VuXCIsIFwiVEdcIik7XHJcblxyXG4gICAgICAgICAgICBBcmVhIGFyZWEgPSBBcmVhVXNlcigpLlJvd0ZvcndhcmQod2lkdGg6IDEsIFhEaXM6IDMpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkljZWJvbWJcIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihhcmVhLCBCYXR0bGVNYWluLkVsZW1lbnQuSWNlKSwgbmV3IERlYWxEYW1hZ2VBY3Rpb24oYXJlYSwgMSwgQmF0dGxlTWFpbi5FbGVtZW50LkljZSkpLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuQm9tYikpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJJY2Vib21iXCIsIFwiSUJcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIlRodW5kZXJib21iXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKG5ldyBBbmltYXRpb24oYXJlYSwgQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihhcmVhLCAxLCBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlcikpLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuQm9tYikpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJUaHVuZGVyYm9tYlwiLCBcIlRCXCIpO1xyXG5cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJTdW1tb25cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24oU3VtbW9uRW50aXR5LkVuZW15KDAsIG5ldyBWZWN0b3IyRCg1LDApKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TdW1tb24pKTtcclxuICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKFwiU3VtbW9uXCIsIFwiU1VcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBpbnQgR2V0TW92ZUlkKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1vdmVEYXRhLkZpbmRCeUxhYmVsKG1vdmVEYXRhcywgdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIEFyZWFDcmVhdGlvblV0aWxzIEFyZWFVc2VyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFyZWFVdGlscy50YXJnZXQgPSBUYXJnZXQuU2VsZjtcclxuICAgICAgICAgICAgcmV0dXJuIGFyZWFVdGlscztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBBcmVhQ3JlYXRpb25VdGlsc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIFRhcmdldCB0YXJnZXQ7XHJcbiAgICAgICAgICAgIGludCBoZWlnaHQgPSAzO1xyXG5cclxuICAgICAgICAgICAgaW50ZXJuYWwgQXJlYSBSb3dGb3J3YXJkKGludCB3aWR0aCwgaW50IFhEaXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciByYSA9IG5ldyBBcmVhKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBpbnQgb2Zmc2V0WSA9IChpbnQpTWF0aC5GbG9vcigoZmxvYXQpaGVpZ2h0IC8gMmYpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmEucG9pbnRzLkFkZChuZXcgVmVjdG9yMkQoaStYRGlzLCBqLW9mZnNldFkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTmV3TW92ZVRleHRSZW5kZXJEYXRhKHN0cmluZyBuYW1lLCBzdHJpbmcgYWJyZXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3ZlUmVuZGVycy5BZGQobmV3IE1vdmVSZW5kZXJEYXRhKG5hbWUsIGFicmV2KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTmV3TW92ZURhdGEoc3RyaW5nIGxhYmVsLCBUaWNrW10gdGlja3MsIG9iamVjdFtdIHRhZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbXYgPSBuZXcgTW92ZURhdGEobGFiZWwpO1xyXG4gICAgICAgICAgICBtdi51bml0cy5BZGRSYW5nZSh0aWNrcyk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG12LnRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1vdmVEYXRhcy5BZGQobXYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE5ld01vdmVEYXRhKHN0cmluZyBsYWJlbCwgQ29uZGl0aW9uIGNvbmRpdGlvbiwgb2JqZWN0IGFjdGlvbiwgb2JqZWN0W10gdGFncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtdiA9IG5ldyBNb3ZlRGF0YShsYWJlbCk7XHJcbiAgICAgICAgICAgIFRpY2sgdGljayA9IG5ldyBUaWNrKCk7XHJcbiAgICAgICAgICAgIHRpY2suY29uZGl0aW9uID0gY29uZGl0aW9uO1xyXG4gICAgICAgICAgICB0aWNrLnRoaW5nc1RvSGFwcGVuLkFkZChhY3Rpb24pO1xyXG4gICAgICAgICAgICBtdi51bml0cy5BZGQodGljayk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG12LnRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW92ZURhdGFzLkFkZChtdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFRpY2tbXSBPbmVUaWNrUGVyQWN0aW9uKHBhcmFtcyBvYmplY3RbXSBhY3Rpb25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGlja1tdIHRpY2tzID0gbmV3IFRpY2tbYWN0aW9ucy5MZW5ndGhdO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRpY2tzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aWNrc1tpXSA9IG5ldyBUaWNrKGFjdGlvbnNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aWNrcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb2JqZWN0W10gVGFnQXJyYXkocGFyYW1zIG9iamVjdFtdIGFyZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJncztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdmVSZW5kZXJEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBMYWJlbDtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEFicmV2O1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVJlbmRlckRhdGEoc3RyaW5nIGxhYmVsLCBzdHJpbmcgYWJyZXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgICAgIHRoaXMuQWJyZXYgPSBhYnJldjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBY2Nlc3NvclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgTGVuZ3RoIHsgZ2V0IHsgcmV0dXJuIFNlbGVjdGVkRW50aXRpZXMuQ291bnQ7IH0gfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBUeXBlW10gVHlwZXNQcm9oaWJpdGVkIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVHlwZVtdIFR5cGVzTmVjZXNzYXJ5O1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8RW50aXR5PiBTZWxlY3RlZEVudGl0aWVzID0gbmV3IExpc3Q8RW50aXR5PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgQWNjZXNzb3IocGFyYW1zIFR5cGVbXSBzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVHlwZXNOZWNlc3NhcnkgPSBzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBFbnRpdHlBZGRlZChFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTZWxlY3RlZEVudGl0aWVzLkNvbnRhaW5zKGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBHZXQoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU2VsZWN0ZWRFbnRpdGllc1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFF1aWNrQWNjZXNzb3JPbmU8VDE+XHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBRdWlja0FjY2Vzc29yT25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yID0gbmV3IEFjY2Vzc29yKHR5cGVvZihUMSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgQWNjZXNzb3IgYWNjZXNzb3I7XHJcbiAgICAgICAgcHVibGljIGludCBDb3VudCB7IGdldCB7IHJldHVybiBhY2Nlc3Nvci5MZW5ndGg7IH0gfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgVDEgQ29tcDEoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllc1tpXS5HZXRDb21wb25lbnQ8VDE+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IEVudGl0eShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4gXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGludGVybmFsIEFjY2Vzc29yIGFjY2Vzc29yO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgTGVuZ3RoIHsgZ2V0IHsgcmV0dXJuIGFjY2Vzc29yLkxlbmd0aDsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUMSBDb21wMShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldLkdldENvbXBvbmVudDxUMT4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgRW50aXR5KGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXNbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUXVpY2tBY2Nlc3NvclR3bygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhY2Nlc3NvciA9IG5ldyBBY2Nlc3Nvcih0eXBlb2YoVDEpLCB0eXBlb2YoVDIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgVDIgQ29tcDIoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllc1tpXS5HZXRDb21wb25lbnQ8VDI+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guRUNTXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDbG9uZWRTdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+IGNvbXBzID0gbmV3IERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+KCk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guRUNTXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBFQ1NNYW5hZ2VyXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEVDU01hbmFnZXJbXSBtYW5hZ2VycyA9IG5ldyBFQ1NNYW5hZ2VyWzIwXTtcclxuICAgICAgICBEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPiBjb21wcyA9IG5ldyBEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPigpO1xyXG4gICAgICAgIHByaXZhdGUgaW50IEVDU0lkO1xyXG4gICAgICAgIGludCBlbnRpdHlJZE1heCA9IC0xO1xyXG4gICAgICAgIExpc3Q8QWNjZXNzb3I+IGFjY2Vzc29ycyA9IG5ldyBMaXN0PEFjY2Vzc29yPigpO1xyXG5cclxuICAgICAgICBEaWN0aW9uYXJ5PFR5cGUsIEFjdGlvbjxPYmplY3QsIE9iamVjdD4+IENvcHlNZXRob2RzID0gbmV3IERpY3Rpb25hcnk8VHlwZSwgQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4oKTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBFQ1NNYW5hZ2VyKCkgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQcm9jZXNzb3JBY2Nlc3NvciBDcmVhdGVQcm9jZXNzb3IoQWNjZXNzb3IgYWNjZXNzb3IsIEFjdGlvbjxBY2Nlc3Nvcj4gYWN0aW9uKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvY2Vzc29yQWNjZXNzb3IoYWN0aW9uLCBhY2Nlc3Nvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRDb3B5TWV0aG9kKFR5cGUgdHlwZSwgQWN0aW9uPG9iamVjdCwgb2JqZWN0PiBjb3B5TWV0aG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb3B5TWV0aG9kcy5BZGQodHlwZSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIG9iamVjdD4pY29weU1ldGhvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBY2Nlc3NvciBDcmVhdGVBY2Nlc3NvcihUeXBlW10gbmVjZXNzYXJ5LCBUeXBlW10gbm90KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGFjYyA9IG5ldyBBY2Nlc3NvcihuZWNlc3NhcnkpO1xyXG4gICAgICAgICAgICBhY2MuVHlwZXNQcm9oaWJpdGVkID0gbm90O1xyXG4gICAgICAgICAgICBBZGRBY2Nlc3NvcihhY2MpO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4gUXVpY2tBY2Nlc3NvcjI8VDEsIFQyPigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4gYWNjZXNzb3IgPSBuZXcgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+KCk7XHJcbiAgICAgICAgICAgIEFkZEFjY2Vzc29yKGFjY2Vzc29yLmFjY2Vzc29yKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFF1aWNrQWNjZXNzb3JPbmU8VDE+IFF1aWNrQWNjZXNzb3IxPFQxPigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBRdWlja0FjY2Vzc29yT25lPFQxPiBhY2Nlc3NvciA9IG5ldyBRdWlja0FjY2Vzc29yT25lPFQxPigpO1xyXG4gICAgICAgICAgICBBZGRBY2Nlc3NvcihhY2Nlc3Nvci5hY2Nlc3Nvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3NvcjtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgICNyZWdpb24gc3RhdGljIG1ldGhvZHNcclxuXHJcblxyXG4gICAgICAgIGludGVybmFsIHN0YXRpYyBFQ1NNYW5hZ2VyIEdldEluc3RhbmNlKEVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1hbmFnZXJzW2UuZWNzXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRUNTTWFuYWdlciBDcmVhdGUoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbWFuYWdlcnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChtYW5hZ2Vyc1tpXSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hbmFnZXJzW2ldID0gbmV3IEVDU01hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYW5hZ2Vyc1tpXS5FQ1NJZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hbmFnZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChvYmplY3QgdilcclxuICAgICAgICB7XHJcbkVudGl0eSBlO1xuICAgICAgICAgICAgQ3JlYXRlRW50aXR5KG91dCBlKTtcclxuICAgICAgICAgICAgQWRkQ29tcG9uZW50KGUsIHYpO1xyXG4gICAgICAgICAgICByZXR1cm4gZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChvYmplY3Qgdiwgb2JqZWN0IHYyKVxyXG4gICAgICAgIHtcclxuRW50aXR5IGU7XG4gICAgICAgICAgICBDcmVhdGVFbnRpdHkob3V0IGUpO1xyXG4gICAgICAgICAgICBBZGRDb21wb25lbnQoZSwgdik7XHJcbiAgICAgICAgICAgIEFkZENvbXBvbmVudChlLCB2Mik7XHJcbiAgICAgICAgICAgIHJldHVybiBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBDcmVhdGVFbnRpdHkob3V0IEVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW50aXR5SWRNYXgrKztcclxuICAgICAgICAgICAgRW50aXR5IGVudGl0eSA9IG5ldyBFbnRpdHkodGhpcy5FQ1NJZCwgZW50aXR5SWRNYXgpO1xyXG4gICAgICAgICAgICBlID0gZW50aXR5O1xyXG4gICAgICAgICAgICByZXR1cm4gZW50aXR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBDcmVhdGVFbnRpdHkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW50aXR5SWRNYXgrKztcclxuICAgICAgICAgICAgRW50aXR5IGVudGl0eSA9IG5ldyBFbnRpdHkodGhpcy5FQ1NJZCwgZW50aXR5SWRNYXgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZW50aXR5O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBQcm9jZXNzb3JGbGV4PFQxLCBUMj4gUXVpY2tQcm9jZXNzb3JGbGV4PFQxLCBUMj4oQWN0aW9uPFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPj4gcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFByb2Nlc3NvckZsZXg8VDEsIFQyPiBwcm9jZXNzb3JGbGV4ID0gbmV3IFByb2Nlc3NvckZsZXg8VDEsIFQyPihwKTtcclxuICAgICAgICAgICAgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+IGFjY2Vzc29yID0gcHJvY2Vzc29yRmxleC5hY2Nlc3NvcjtcclxuICAgICAgICAgICAgQWNjZXNzb3IgYWNjZXNzb3IxID0gYWNjZXNzb3IuYWNjZXNzb3I7XHJcbiAgICAgICAgICAgIEFkZEFjY2Vzc29yKGFjY2Vzc29yMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzb3JGbGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEFkZEFjY2Vzc29yKEFjY2Vzc29yIGFjY2Vzc29yMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFjY2Vzc29ycy5BZGQoYWNjZXNzb3IxKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPD0gZW50aXR5SWRNYXg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlQWNjZXNzb3JFbnRpdHkoYWNjZXNzb3IxLCBpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVBY2Nlc3NvckVudGl0eShBY2Nlc3NvciBhY2Nlc3NvciwgaW50IGVudGl0eUlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRW50aXR5IGVudGl0eSA9IG5ldyBFbnRpdHkoRUNTSWQsIGVudGl0eUlkKTtcclxuICAgICAgICAgICAgYm9vbCBiZWxvbmcgPSBIYXNBbGxDb21wcyhhY2Nlc3Nvci5UeXBlc05lY2Vzc2FyeSwgZW50aXR5SWQpICYmIEhhc05vbmVPZlRoZXNlQ29tcHMoYWNjZXNzb3IuVHlwZXNQcm9oaWJpdGVkLCBlbnRpdHlJZCk7XHJcbiAgICAgICAgICAgIGJvb2wgbWVtYmVyID0gYWNjZXNzb3IuRW50aXR5QWRkZWQoZW50aXR5KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChiZWxvbmcgIT0gbWVtYmVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmVsb25nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXMuQWRkKGVudGl0eSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIlJFTU9WRUQgRU5USVRZIFwiK2FjY2Vzc29yLlR5cGVzTmVjZXNzYXJ5WzBdKTtcclxuICAgICAgICAgICAgICAgICAgICBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzLlJlbW92ZShlbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoYWNjZXNzb3IuRW50aXR5QWRkZWQoZW50aXR5KStcIiBCRUxPTkdcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDbG9uZVN0YXRlKENsb25lZFN0YXRlIGNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNvbXBzID0gdGhpcy5jb21wcztcclxuICAgICAgICAgICAgRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4gY29tcHMyID0gY3MuY29tcHM7XHJcbiAgICAgICAgICAgIENvcHkoY29tcHMsIGNvbXBzMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXN0b3JlU3RhdGUoQ2xvbmVkU3RhdGUgY3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY29tcHMgPSB0aGlzLmNvbXBzO1xyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPiBjb21wczIgPSBjcy5jb21wcztcclxuICAgICAgICAgICAgQ29weShjb21wczIsIGNvbXBzKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDw9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZW50aXR5SWRNYXg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYWNjZXNzb3JzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFVwZGF0ZUFjY2Vzc29yRW50aXR5KGl0ZW0sIGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTGlzdDxUeXBlPiBhdXggPSBuZXcgTGlzdDxUeXBlPigpO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ29weShEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPiBmcm9tLCBEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPiB0bylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF1eC5DbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gZnJvbSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVHlwZSB0eXBlID0gYy5LZXk7XHJcbiAgICAgICAgICAgICAgICBhdXguQWRkKHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0by5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0by5BZGQodHlwZSwgbmV3IG9iamVjdFszMDBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciB0b0FycmF5ID0gdG9bdHlwZV07XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luID0gYy5WYWx1ZTtcclxuICAgICAgICAgICAgICAgIENvcHkodG8sIHR5cGUsIHRvQXJyYXksIG9yaWdpbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gdG8pIC8vY2hlY2tzIHR5cGVzIGluIHRvLCBzbyBpdCBjYW4gYmUgdGhyb3VnaFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUeXBlIHR5cGUgPSBjLktleTtcclxuICAgICAgICAgICAgICAgIGlmICghYXV4LkNvbnRhaW5zKHR5cGUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5BZGQodHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvQXJyYXkgPSBjLlZhbHVlOyAvL2FjY2VzcyBpbnZlcnRlZCB3aGVuIGNvbXBhcmVkIHRvIHByZXZpb3VzXHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgb3JpZ2luID0gZnJvbVt0eXBlXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRvQXJyYXkuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0FycmF5W2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIlJlbW92aW5nIGVudGl0eVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENvcHkoRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4gdG8sIFR5cGUgdHlwZSwgb2JqZWN0W10gdG9BcnJheSwgb2JqZWN0W10gb3JpZ2luKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWN0aW9uPE9iamVjdCwgT2JqZWN0PiBjb3B5TWV0aG9kID0gbnVsbDtcclxuICAgICAgICAgICAgQ29weU1ldGhvZHMuVHJ5R2V0VmFsdWUodHlwZSwgb3V0IGNvcHlNZXRob2QpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBvcmlnaW4uTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcmlnaW5baV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodG9BcnJheVtpXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIlJlbW92aW5nIGVudGl0eVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9BcnJheVtpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b0FycmF5W2ldID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvQXJyYXlbaV0gPSBBY3RpdmF0b3IuQ3JlYXRlSW5zdGFuY2UodHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29weU1ldGhvZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3B5TWV0aG9kKG9yaWdpbltpXSwgdG9BcnJheVtpXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vRGVlcENsb25lSGVscGVyLkRlZXBDb3B5UGFydGlhbChvcmlnaW5baV0sIHRvQXJyYXlbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBUIEFkZENvbXBvbmVudDxUPihFbnRpdHkgZSkgd2hlcmUgVCA6IG5ldygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUIHQgPSBuZXcgVCgpO1xyXG4gICAgICAgICAgICBBZGRDb21wb25lbnQoZSwgdCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZENvbXBvbmVudChFbnRpdHkgZSwgb2JqZWN0IHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUeXBlIHR5cGUgPSB0LkdldFR5cGUoKTtcclxuICAgICAgICAgICAgaWYgKCFjb21wcy5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29tcHMuQWRkKHR5cGUsIG5ldyBvYmplY3RbMzAwXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29tcHNbdHlwZV1bZS5pZF0gPSB0O1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBhY2Nlc3NvcnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVwZGF0ZUFjY2Vzc29yRW50aXR5KGl0ZW0sIGUuaWQpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlQ29tcG9uZW50KEVudGl0eSBlLCBvYmplY3QgdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR5cGUgdHlwZSA9IHQuR2V0VHlwZSgpO1xyXG4gICAgICAgICAgICBpZiAoIWNvbXBzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb21wcy5BZGQodHlwZSwgbmV3IG9iamVjdFszMDBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb21wc1t0eXBlXVtlLmlkXSA9IG51bGw7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGFjY2Vzc29ycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlQWNjZXNzb3JFbnRpdHkoaXRlbSwgZS5pZCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgSGFzQWxsQ29tcG9uZW50cyhFbnRpdHkgZSwgVHlwZVtdIHR5cGVzTmVjZXNzYXJ5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGlkID0gZS5pZDtcclxuICAgICAgICAgICAgcmV0dXJuIEhhc0FsbENvbXBzKHR5cGVzTmVjZXNzYXJ5LCBpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgSGFzQWxsQ29tcHMoVHlwZVtdIHR5cGVzTmVjZXNzYXJ5LCBpbnQgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdHlwZSBpbiB0eXBlc05lY2Vzc2FyeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjb21wcy5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBzW3R5cGVdW2lkXSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBIYXNOb25lT2ZUaGVzZUNvbXBzKFR5cGVbXSB0eXBlc1Byb2hpYml0ZWQsIGludCBpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlc1Byb2hpYml0ZWQgPT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0eXBlIGluIHR5cGVzUHJvaGliaXRlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wc1t0eXBlXVtpZF0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVCBHZXRDb21wb25lbnQ8VD4oRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUeXBlIHR5cGUgPSB0eXBlb2YoVCk7XHJcbiAgICAgICAgICAgIGlmICghY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vY29tcHMuQWRkKHR5cGUsIG5ldyBvYmplY3RbMzAwXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmYXVsdChUKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKFQpY29tcHNbdHlwZV1bZS5pZF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG4gICAgcHVibGljIHN0cnVjdCBFbnRpdHkgOiBJRXF1YXRhYmxlPEVudGl0eT5cclxuICAgIHtcclxuICAgICAgICByZWFkb25seSBpbnRlcm5hbCBpbnQgZWNzO1xyXG4gICAgICAgIHJlYWRvbmx5IGludGVybmFsIGludCBpZDtcclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eShpbnQgZWNzLCBpbnQgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKEVudGl0eSBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBvdGhlci5pZCA9PSB0aGlzLmlkICYmIG90aGVyLmVjcyA9PSB0aGlzLmVjcztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEV4dGVuc2lvbk1ldGhvZHNcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFJlbW92ZUNvbXBvbmVudCh0aGlzIEVudGl0eSBlLCBvYmplY3QgY29tcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVDU01hbmFnZXIuR2V0SW5zdGFuY2UoZSkuUmVtb3ZlQ29tcG9uZW50KGUsIGNvbXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUIEFkZENvbXBvbmVudDxUPih0aGlzIEVudGl0eSBlKSB3aGVyZSBUOiBuZXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEVDU01hbmFnZXIuR2V0SW5zdGFuY2UoZSkuQWRkQ29tcG9uZW50PFQ+KGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQWRkQ29tcG9uZW50KHRoaXMgRW50aXR5IGUsIG9iamVjdCBjb21wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRUNTTWFuYWdlci5HZXRJbnN0YW5jZShlKS5BZGRDb21wb25lbnQoZSwgY29tcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBHZXRDb21wb25lbnQ8VD4odGhpcyBFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBFQ1NNYW5hZ2VyLkdldEluc3RhbmNlKGUpLkdldENvbXBvbmVudDxUPihlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkVDU1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJvY2Vzc29yRmxleDxUMSwgVDI+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBBY3Rpb248UXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+PiBwO1xyXG4gICAgICAgIGludGVybmFsIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBhY2Nlc3NvcjtcclxuXHJcbiAgICAgICAgcHVibGljIFByb2Nlc3NvckZsZXgoQWN0aW9uPFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPj4gcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucCA9IHA7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yID0gbmV3IFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUnVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHAoYWNjZXNzb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUHJvY2Vzc29yQWNjZXNzb3JcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEFjdGlvbjxBY2Nlc3Nvcj4gcDtcclxuXHJcbiAgICAgICAgQWNjZXNzb3IgYTtcclxuXHJcbiAgICAgICAgcHVibGljIFByb2Nlc3NvckFjY2Vzc29yKEFjdGlvbjxBY2Nlc3Nvcj4gcCwgQWNjZXNzb3IgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucCA9IHA7XHJcbiAgICAgICAgICAgIHRoaXMuYSA9IGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSdW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcChhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRXb3JsZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlIHBhbGV0dGUgPSBEZWZhdWx0UGFsZXR0ZXMuQzRLaXJvS2F6ZTtcclxuICAgICAgICBMaXN0PFRleHRFbnRpdHk+IGFjdGl2ZUFnZW50cyA9IG5ldyBMaXN0PFRleHRFbnRpdHk+KCk7XHJcbiAgICAgICAgTGlzdDxUZXh0RW50aXR5PiBmcmVlQm9hcmRzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICBMaXN0PFRleHRBbmltYXRpb24+IGFuaW1hdGlvbnMgPSBuZXcgTGlzdDxUZXh0QW5pbWF0aW9uPigpO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgbWFpbkJvYXJkO1xyXG4gICAgICAgIGludCBsYXRlc3RJZCA9IC0xO1xyXG5cclxuICAgICAgICBwdWJsaWMgVCBBZGRBbmltYXRpb248VD4oVCB0YSkgd2hlcmUgVCA6IFRleHRBbmltYXRpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbnMuQWRkKHRhKTtcclxuICAgICAgICAgICAgdGEuUmVnaXN0ZXJMaXN0cygpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1haW5Cb2FyZCA9IG5ldyBUZXh0Qm9hcmQod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtYWluQm9hcmQuUmVzZXQoKTtcclxuICAgICAgICAgICAgRHJhd0NoaWxkcmVuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hpbGRyZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBhY3RpdmVBZ2VudHMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlQWdlbnRzW2ldLlJlc2V0QW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW0uTW9kaWZ5KGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlQWdlbnRzW2ldLmZyZWVJZklkbGUgJiYgIWFjdGl2ZUFnZW50c1tpXS5hbmltYXRpbmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJlZUJvYXJkcy5BZGQoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVBZ2VudHMuUmVtb3ZlKGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5Cb2FyZC5JbnNlcnQoYWN0aXZlQWdlbnRzW2ldLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEVudGl0eSBHZXRGcmVlRW50aXR5KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRFbnRpdHkgdGU7XHJcbiAgICAgICAgICAgIGlmIChmcmVlQm9hcmRzLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGUgPSBmcmVlQm9hcmRzW2ZyZWVCb2FyZHMuQ291bnQgLSAxXTtcclxuICAgICAgICAgICAgICAgIGZyZWVCb2FyZHMuUmVtb3ZlQXQoZnJlZUJvYXJkcy5Db3VudCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGUgPSBuZXcgVGV4dEVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgdGUuaWQgPSArK2xhdGVzdElkO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWN0aXZlQWdlbnRzLkFkZCh0ZSk7XHJcbiAgICAgICAgICAgIHRlLmZyZWVJZklkbGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGUuU2V0U2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgdGUuUmVzZXRGdWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IEdldFRlbXBFbnRpdHkoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRlID0gR2V0RnJlZUVudGl0eSh3LCBoKTtcclxuICAgICAgICAgICAgdGUuZnJlZUlmSWRsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkdmFuY2VUaW1lKGZsb2F0IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbmltLlVwZGF0ZSh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVHJ5RW5kQW5pbWF0aW9ucygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbmltLlRyeUVuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0RvbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFuaW0gaW4gYW5pbWF0aW9ucylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhbmltLklzRG9uZSgpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0RW50aXR5XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBpZDtcclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIE9yaWdpbjtcclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEFuaW1hdGlvbjtcclxuICAgICAgICBwdWJsaWMgYm9vbCBmcmVlSWZJZGxlID0gZmFsc2U7XHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBhbmltYXRpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSGVpZ2h0IHsgZ2V0IHsgcmV0dXJuIE9yaWdpbi5IZWlnaHQ7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgV2lkdGggeyBnZXQgeyByZXR1cm4gT3JpZ2luLldpZHRoOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRBbmltYXRpb24uQmFzZURhdGEgQW5pbUJhc2UoZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUZXh0QW5pbWF0aW9uLkJhc2VEYXRhKGxlbmd0aCwgMCwgaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVmVjdG9yMkQgR2V0UG9zaXRpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9yaWdpbi5Qb3NpdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXRBbmltYXRpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEFuaW1hdGlvbi5TZXQoT3JpZ2luKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXRGdWxsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9yaWdpbi5SZXNldEludmlzaWJsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRQb3NpdGlvbihpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcmlnaW4uUG9zaXRpb24gPSBuZXcgVmVjdG9yMkQoeCx5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0UG9zaXRpb24oVmVjdG9yMkQgdmVjdG9yMkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcmlnaW4uUG9zaXRpb24gPSB2ZWN0b3IyRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0U2l6ZShpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoT3JpZ2luID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE9yaWdpbiA9IG5ldyBUZXh0Qm9hcmQodywgaCk7XHJcbiAgICAgICAgICAgICAgICBBbmltYXRpb24gPSBuZXcgVGV4dEJvYXJkKHcsIGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9yaWdpbi5SZXNpemUodywgaCk7XHJcbiAgICAgICAgICAgIEFuaW1hdGlvbi5SZXNpemUodywgaCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgRGVsYXlzQW5pbWF0aW9uIDogVGV4dEFuaW1hdGlvblxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFJlcXVlc3RSZWdpc3Rlckxpc3RzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBEZWxheShmbG9hdCB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkKG5ldyBCYXNlRGF0YSh2LCAwLCAtMSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIFBvc2l0aW9uQW5pbWF0aW9uIDogVGV4dEFuaW1hdGlvbjxQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGE+XHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgUG9zaXRpb25EYXRhIG1haW5EYXRhLCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Nb2RpZnkoZW50aXR5LCBtYWluRGF0YSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZCB0YXJnZXQgPSBlbnRpdHkuQW5pbWF0aW9uO1xyXG4gICAgICAgICAgICBpZiAobWFpbkRhdGEucGVybWFuZW50KVxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gZW50aXR5Lk9yaWdpbjtcclxuICAgICAgICAgICAgdGFyZ2V0LlBvc2l0aW9uID0gVmVjdG9yMkQuSW50ZXJwb2xhdGVSb3VuZGVkKG1haW5EYXRhLnN0YXJ0UG9zaXRpb24sIG1haW5EYXRhLmVuZFBvc2l0aW9uLCBwcm9ncmVzcyAvIGxlbmd0aCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBQb3NpdGlvbkRhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBib29sIHBlcm1hbmVudDtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIFBvc2l0aW9uRGF0YShWZWN0b3IyRCBzdGFydFBvc2l0aW9uLCBWZWN0b3IyRCBlbmRQb3NpdGlvbiwgYm9vbCBwZXJtID0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZFBvc2l0aW9uID0gZW5kUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcm1hbmVudCA9IHBlcm07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFRleHRBbmltYXRpb248VD4gOiBUZXh0QW5pbWF0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIExpc3Q8VD4gbWFpbkRhdGEgPSBuZXcgTGlzdDxUPigpO1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFJlcXVlc3RSZWdpc3Rlckxpc3RzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuUmVnaXN0ZXJMaXN0KG1haW5EYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChCYXNlRGF0YSBiYXNlRGF0YSwgVCBtYWluRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuQWRkKGJhc2VEYXRhKTtcclxuICAgICAgICAgICAgbWFpbkRhdGEuQWRkKG1haW5EKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgaW50IGluZGV4LCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGFbaW5kZXhdLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBUIG1haW5EYXRhLCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW50ZXJuYWwgb3ZlcnJpZGUgdm9pZCBFeGVjdXRlKGludCBpbmRleCwgQmFzZURhdGEgYmFzZURhdGEpXHJcbiAgICAgICAgLy97XHJcbiAgICAgICAgLy8gICAgdGhpcy5FeGVjdXRlKG1haW5EYXRhW2luZGV4XSwgYmFzZURhdGEpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL3B1YmxpYyBhYnN0cmFjdCB2b2lkIEV4ZWN1dGUoVCBtYWluRGF0YSwgQmFzZURhdGEgYmFzZURhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBUZXh0QW5pbWF0aW9uXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgQmFzZURhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBsZW5ndGg7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBwcm9ncmVzcztcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCB0YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQmFzZURhdGEoZmxvYXQgbGVuZ3RoLCBmbG9hdCBwcm9ncmVzcywgaW50IHRhcmdldClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBMaXN0PGZsb2F0PiBsZW5ndGggPSBuZXcgTGlzdDxmbG9hdD4oKTtcclxuICAgICAgICBMaXN0PGZsb2F0PiBwcm9ncmVzcyA9IG5ldyBMaXN0PGZsb2F0PigpO1xyXG4gICAgICAgIExpc3Q8aW50PiB0YXJnZXRzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIExpc3Q8SUxpc3Q+IGxpc3RzID0gbmV3IExpc3Q8SUxpc3Q+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyTGlzdHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKGxlbmd0aCk7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZChwcm9ncmVzcyk7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZCh0YXJnZXRzKTtcclxuICAgICAgICAgICAgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCB2b2lkIFJlcXVlc3RSZWdpc3Rlckxpc3RzKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgcHJvZ3Jlc3MuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NbaV0gKz0gZGVsdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NbaV0gPj0gbGVuZ3RoW2ldKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzW2ldID0gbGVuZ3RoW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vRXhlY3V0ZShpLCBuZXcgQmFzZURhdGEobGVuZ3RoW2ldLHByb2dyZXNzW2ldLCB0YXJnZXRzW2ldKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW50ZXJuYWwgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKGludCBpbmRleCwgQmFzZURhdGEgYmFzZURhdGEpO1xyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkZChCYXNlRGF0YSBiZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb2dyZXNzLkFkZChiZC5wcm9ncmVzcyk7XHJcbiAgICAgICAgICAgIHRhcmdldHMuQWRkKGJkLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGxlbmd0aC5BZGQoYmQubGVuZ3RoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBsaXN0cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uQ291bnQgIT0gcHJvZ3Jlc3MuQ291bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHMuVHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9ncmVzcy5Db3VudCA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBFbmRUYXNrKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGwgaW4gbGlzdHMpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlZ2lzdGVyTGlzdChJTGlzdCBtYWluRGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZChtYWluRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHByb2dyZXNzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChhLmlkID09IHRhcmdldHNbaV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW9kaWZ5KGEsIGksIHByb2dyZXNzW2ldLCBsZW5ndGhbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGEuYW5pbWF0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIGludCBpbmRleCwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFRyeUVuZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHByb2dyZXNzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc1tpXSA+PSBsZW5ndGhbaV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5kVGFzayhpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFBhbGV0dGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nW10gSHRtbENvbG9ycztcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlKHBhcmFtcyBzdHJpbmdbXSBjb2xvcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIdG1sQ29sb3JzID0gY29sb3JzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgRGVmYXVsdFBhbGV0dGVzXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQYWxldHRlIEM0S2lyb0themUgPSBuZXcgUGFsZXR0ZShcIiMzMzJjNTBcIiwgXCIjNDY4NzhmXCIsIFwiIzk0ZTM0NFwiLCBcIiNlMmYzZTRcIik7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQYWxldHRlIEM0UmVhZGVyID0gbmV3IFBhbGV0dGUoXCIjMjYyNjI2XCIsIFwiIzhiOGNiYVwiLCBcIiM4YmJhOTFcIiwgXCIjNjQ5ZjhkXCIpO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUGFsZXR0ZSBDNE5vdmVsID0gbmV3IFBhbGV0dGUoXCIjMjYyNjI2XCIsIFwiIzM0MmQ0MVwiLCBcIiNiOGI4YjhcIiwgXCIjOGI4Y2JhXCIpO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRCbGFjayA9IDA7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBDNEJsYWNrTmV1dHJhbCA9IDE7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBDNFdoaXRlTmV1dHJhbCA9IDI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBDNFdoaXRlID0gMztcclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuXHJcbntcclxuICAgIHB1YmxpYyBzdHJ1Y3QgTW91c2VIb3ZlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBSZWN0IHJlY3Q7XHJcbiAgICAgICAgcHVibGljIGludCB0eXBlO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgaWQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUhvdmVyKFJlY3QgcmVjdCwgaW50IHR5cGUsIGludCBpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdXNlSG92ZXJNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8TW91c2VIb3Zlcj4gbW91c2VIb3ZlcnMgPSBuZXcgTGlzdDxNb3VzZUhvdmVyPigpO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PE1vdXNlSG92ZXI+IG1vdXNlSG92ZXJzQWN0aXZlID0gbmV3IExpc3Q8TW91c2VIb3Zlcj4oKTtcclxuICAgICAgICBwdWJsaWMgTW91c2VJTyBtb3VzZUlPO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW91c2VIb3Zlck1hbmFnZXIoTW91c2VJTyBtb3VzZUlPKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZUlPID0gbW91c2VJTztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3VzZUhvdmVyc0FjdGl2ZS5DbGVhcigpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBtb3VzZUhvdmVycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ucmVjdC5Db250YWlucyhtb3VzZUlPLnBvcykpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2VIb3ZlcnNBY3RpdmUuQWRkKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlblxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVW5pY29kZVJlbWFwXHJcbiAgICB7XHJcblxyXG4gICAgICAgIERpY3Rpb25hcnk8aW50LCBpbnQ+IHJlbWFwcyA9IG5ldyBEaWN0aW9uYXJ5PGludCwgaW50PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgVW5pY29kZVJlbWFwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlbWFwcy5BZGQoVW5pY29kZS5rZXlVcCwgJ3cnKTtcclxuICAgICAgICAgICAgcmVtYXBzLkFkZChVbmljb2RlLmtleURvd24sICdzJyk7XHJcbiAgICAgICAgICAgIHJlbWFwcy5BZGQoVW5pY29kZS5rZXlMZWZ0LCAnYScpO1xyXG4gICAgICAgICAgICByZW1hcHMuQWRkKFVuaWNvZGUua2V5UmlnaHQsICdkJyk7XHJcblxyXG4gICAgICAgICAgICByZW1hcHMuQWRkKCdpJywgJzEnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFJlbWFwKGludCB1bmljb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHJlc3VsdDtcclxuICAgICAgICAgICAgaWYgKHJlbWFwcy5UcnlHZXRWYWx1ZSh1bmljb2RlLCBvdXQgcmVzdWx0KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdW5pY29kZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0Qm9hcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBOT0NIQU5HRUNIQVIgPSAoY2hhcikxO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIElOVklTSUJMRUNIQVIgPSAoY2hhcikyO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgTk9DSEFOR0VDT0xPUiA9IC0yO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgSU5WSVNJQkxFQ09MT1IgPSAtMTtcclxuICAgICAgICBjaGFyWyxdIGNoYXJzO1xyXG4gICAgICAgIHB1YmxpYyBpbnRbLF0gVGV4dENvbG9yIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnRbLF0gQmFja0NvbG9yIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIC8vU3RyaW5nQnVpbGRlciBzdHJpbmdCdWlsZGVyID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgICAgICBpbnQgY3Vyc29yWCA9IDA7XHJcbiAgICAgICAgaW50IGN1cnNvclkgPSAwO1xyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRCBQb3NpdGlvbiB7IGdldDsgc2V0OyB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkKGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vU2V0TWF4U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgUmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd09uQ2VudGVyKHN0cmluZyBtZXNzYWdlLCBpbnQgY29sb3IsIGludCB4T2ZmID0gMCwgaW50IHlPZmYgPSAwLCBib29sIGFsaWduU3RyaW5nID0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB4ID0gKFdpZHRoKSAvIDI7XHJcbiAgICAgICAgICAgIGlmIChhbGlnblN0cmluZykgeCAtPSBtZXNzYWdlLkxlbmd0aCAvIDI7XHJcbiAgICAgICAgICAgIGludCB5ID0gSGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgRHJhdyhtZXNzYWdlLCB4ICsgeE9mZiwgeSArIHlPZmYsIGNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgU2V0TWF4U2l6ZShpbnQgd2lkdGgsIGludCBoZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjaGFycyA9IG5ldyBjaGFyW3dpZHRoLCBoZWlnaHRdO1xyXG4gICAgICAgICAgICBUZXh0Q29sb3IgPSBuZXcgaW50W3dpZHRoLCBoZWlnaHRdO1xyXG4gICAgICAgICAgICBCYWNrQ29sb3IgPSBuZXcgaW50W3dpZHRoLCBoZWlnaHRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKCcgJywgMCwgMCwgV2lkdGgsIEhlaWdodCwgMCwgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXNldEludmlzaWJsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoSU5WSVNJQkxFQ0hBUiwgMCwgMCwgV2lkdGgsIEhlaWdodCwgSU5WSVNJQkxFQ09MT1IsIElOVklTSUJMRUNPTE9SKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFdpZHRoIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbnNlcnQoVGV4dEJvYXJkIHNlY29uZEJvYXJkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBzZWNvbmRCb2FyZC5XaWR0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IHNlY29uZEJvYXJkLkhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4ID0gKGludClzZWNvbmRCb2FyZC5Qb3NpdGlvbi5YICsgaTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeSA9IChpbnQpc2Vjb25kQm9hcmQuUG9zaXRpb24uWSArIGo7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHggPCAwIHx8IHkgPCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCA+PSBXaWR0aCB8fCB5ID49IEhlaWdodCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZEJvYXJkLmNoYXJzW2ksIGpdICE9IElOVklTSUJMRUNIQVIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzW3gsIHldID0gc2Vjb25kQm9hcmQuY2hhcnNbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZEJvYXJkLlRleHRDb2xvcltpLCBqXSAhPSBJTlZJU0lCTEVDT0xPUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dENvbG9yW3gsIHldID0gc2Vjb25kQm9hcmQuVGV4dENvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRCb2FyZC5CYWNrQ29sb3JbaSwgal0gIT0gSU5WSVNJQkxFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhY2tDb2xvclt4LCB5XSA9IHNlY29uZEJvYXJkLkJhY2tDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBEcmF3UmVjdChjaGFyIGMsIGludCB4LCBpbnQgeSwgaW50IHcsIGludCBoLCBpbnQgdGV4dENvbG9yLCBpbnQgYmFja0NvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKGMsIHgsICAgICAgeSwgICAxLCBoLCB0ZXh0Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChjLCB4K3ctMSwgIHksICAgMSwgaCwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoYywgeCwgICAgICB5LCAgIHcsIDEsIHRleHRDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKGMsIHgsICAgICAgeStoLTEsIHcsIDEsIHRleHRDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSGVpZ2h0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQ3Vyc29yWFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGN1cnNvclg7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclggPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IEN1cnNvclkgeyBnZXQgeyByZXR1cm4gY3Vyc29yWTsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25lRGlnaXQoaW50IGksIGludCB4LCBpbnQgeSwgaW50IGNvbG9yID0gTk9DSEFOR0VDT0xPUiwgaW50IGJhY2tncm91bmQgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hhciBjID0gKGNoYXIpKGkgKyAnMCcpO1xyXG4gICAgICAgICAgICBEcmF3Q2hhcihjLCB4LCB5LCBjb2xvciwgYmFja2dyb3VuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3VHdvRGlnaXRzKGludCBpLCBpbnQgeCwgaW50IHksIGludCBjb2xvciA9IE5PQ0hBTkdFQ09MT1IsIGludCBiYWNrZ3JvdW5kID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdPbmVEaWdpdChpLzEwLHgseSxjb2xvcixiYWNrZ3JvdW5kKTtcclxuICAgICAgICAgICAgRHJhd09uZURpZ2l0KGkgJTEwLCB4KzEsIHksIGNvbG9yLCBiYWNrZ3JvdW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgU2FtZUFzKFRleHRCb2FyZCB0ZXh0Qm9hcmQsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYXJzW3gsIHldID09IHRleHRCb2FyZC5jaGFyc1t4LCB5XVxyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5CYWNrQ29sb3JbeCx5XSA9PSB0ZXh0Qm9hcmQuQmFja0NvbG9yW3gseV1cclxuICAgICAgICAgICAgICAgICYmIHRoaXMuVGV4dENvbG9yW3gseV0gPT0gdGV4dEJvYXJkLlRleHRDb2xvclt4LHldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBDb3B5KFRleHRCb2FyZCB0ZXh0Qm9hcmQsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnNbeCwgeV0gPSB0ZXh0Qm9hcmQuY2hhcnNbeCwgeV07XHJcbiAgICAgICAgICAgIHRoaXMuVGV4dENvbG9yW3gsIHldID0gdGV4dEJvYXJkLlRleHRDb2xvclt4LCB5XTtcclxuICAgICAgICAgICAgdGhpcy5CYWNrQ29sb3JbeCwgeV0gPSB0ZXh0Qm9hcmQuQmFja0NvbG9yW3gsIHldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBEcmF3X0N1cnNvcl9Vbmljb2RlTGFiZWwoaW50IHYsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBsZW4gPSBEcmF3VW5pY29kZUxhYmVsKHYsIGN1cnNvclgsIGN1cnNvclksIGNvbG9yKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBsZW47IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQWR2YW5jZUN1cnNvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgaW50IERyYXdVbmljb2RlTGFiZWwoaW50IHVuaWNvZGUsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHVuaWNvZGUgPj0gJ2EnICYmIHVuaWNvZGUgPD0gJ3onKSB7XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhcigoY2hhcikodW5pY29kZSArICdBJyAtICdhJyksIHgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1bmljb2RlID49ICcwJyAmJiB1bmljb2RlIDw9ICc5JylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIoKGNoYXIpKHVuaWNvZGUpLCB4LCB5LCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdHJpbmcgbGFiZWwgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAodW5pY29kZSA9PSAzMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWwgPSBcIlNQQUNFXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgRHJhdyhsYWJlbCwgeCwgeSwgY29sb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbGFiZWwuTGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXQoVGV4dEJvYXJkIG9yaWdpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUG9zaXRpb24gPSBvcmlnaW4uUG9zaXRpb247XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBIZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJzW2ksIGpdID0gb3JpZ2luLmNoYXJzW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQmFja0NvbG9yW2ksIGpdID0gb3JpZ2luLkJhY2tDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRleHRDb2xvcltpLCBqXSA9IG9yaWdpbi5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzaXplKGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjaGFycyA9PSBudWxsIHx8IHcgPiBjaGFycy5HZXRMZW5ndGgoMCkgfHwgaCA+IGNoYXJzLkdldExlbmd0aCgxKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2V0TWF4U2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBXaWR0aCA9IHc7XHJcbiAgICAgICAgICAgIEhlaWdodCA9IGg7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNoYXIgQ2hhckF0KGludCBpLCBpbnQgailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGFyc1tpLCBqXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEN1cnNvckF0KGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclggPSB4O1xyXG4gICAgICAgICAgICBjdXJzb3JZID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gdilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IoYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKHN0cmluZyB2LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gdilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IoYywgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgQ2FuRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgY3VycmVudFggPSBjdXJzb3JYO1xyXG4gICAgICAgICAgICBpbnQgY3VycmVudFkgPSBjdXJzb3JZO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB2Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBib29sIGxpbmVCcmVhayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBzaG91bGRDaGVja0ZvckxpbmVCcmVha3MgPSAoaSA9PSAwIHx8IHZbaV0gPT0gJyAnKSAmJiBpICE9IHYuTGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChzaG91bGRDaGVja0ZvckxpbmVCcmVha3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDE7IGogPCB2Lkxlbmd0aCAtIGk7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqICsgY3VycmVudFggPj0gV2lkdGgpIC8vcmVhY2ggZW5kIG9mIHRoZSBsaW5lIHdpdGhvdXQgZW5kaW5nIHRoZSB3b3JkLCBzaG91bGQgbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpXSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrOyAvL3NraXAgdGhyb3VnaCB0aGUgc3BhY2UgaWYgaXQncyBhIG5ldyBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWsgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaSArIGpdID09ICcgJykgLy9uZXcgd29yZCBiZWdpbnMgc28gbm8gbmVlZCB0byBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVCcmVhaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRYID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGN1cnJlbnRYKys7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFggPj0gV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFkrKztcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFggPj0gV2lkdGggfHwgY3VycmVudFkgPj0gSGVpZ2h0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERyYXdDdXJzb3JSZXN1bHQgRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBvZmZTdGFydCA9IDA7XHJcbiAgICAgICAgICAgIGludCBvZmZFbmQgPSB2Lkxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIHJldHVybiBEcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayh2LCBjb2xvciwgb2ZmU3RhcnQsIG9mZkVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRHJhd0N1cnNvclJlc3VsdCBEcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhzdHJpbmcgdiwgaW50IGNvbG9yLCBpbnQgb2ZmU3RhcnQsIGludCBvZmZFbmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgVmVjdG9yMkQgc3RhcnQgPSBuZXcgVmVjdG9yMkQoQ3Vyc29yWCwgQ3Vyc29yWSk7XHJcbiAgICAgICAgICAgIGludCBlbmRJbmRleCA9IG9mZkVuZCArIDE7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSBvZmZTdGFydDsgaSA8IGVuZEluZGV4OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBvcmlnaW5YID0gY3Vyc29yWDtcclxuICAgICAgICAgICAgICAgIGJvb2wgbGluZUJyZWFrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBib29sIHNob3VsZENoZWNrRm9yTGluZUJyZWFrcyA9IChpID09IDAgfHwgdltpXSA9PSAnICcpICYmIGkgIT0gZW5kSW5kZXggLSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZENoZWNrRm9yTGluZUJyZWFrcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMTsgaiA8IGVuZEluZGV4IC0gaTsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogKyBvcmlnaW5YID49IFdpZHRoKSAvL3JlYWNoIGVuZCBvZiB0aGUgbGluZSB3aXRob3V0IGVuZGluZyB0aGUgd29yZCwgc2hvdWxkIGxpbmUgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaV0gPT0gJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKzsgLy9za2lwIHRocm91Z2ggdGhlIHNwYWNlIGlmIGl0J3MgYSBuZXcgbGluZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUJyZWFrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2W2kgKyBqXSA9PSAnICcpIC8vbmV3IHdvcmQgYmVnaW5zIHNvIG5vIG5lZWQgdG8gbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsaW5lQnJlYWspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3Vyc29yTmV3TGluZSgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIERyYXdfQ3Vyc29yKHZbaV0sIGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBWZWN0b3IyRCBlbmQgPSBuZXcgVmVjdG9yMkQoQ3Vyc29yWCwgQ3Vyc29yWSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRHJhd0N1cnNvclJlc3VsdChQb3NpdGlvblRvSW5kZXgoc3RhcnQpLCBQb3NpdGlvblRvSW5kZXgoZW5kKSwgc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEF1dG9GaXhHcmlkZGluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKElzR3JpZChpLCBqKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBtYXNrID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKElzR3JpZChpIC0gMSwgaikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2sgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNHcmlkKGkgKyAxLCBqKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzayArPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChJc0dyaWQoaSwgaiAtIDEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrICs9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKElzR3JpZChpLCBqICsgMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2sgKz0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG1hc2spXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkSG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkVmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzW2ksIGpdID0gVW5pY29kZS5Bc2NpaUdyaWRVcExlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbaSwgal0gPSBVbmljb2RlLkFzY2lpR3JpZFVwUmlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbaSwgal0gPSBVbmljb2RlLkFzY2lpR3JpZFVwUmlnaHRMZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzW2ksIGpdID0gVW5pY29kZS5Bc2NpaUdyaWREb3duTGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbaSwgal0gPSBVbmljb2RlLkFzY2lpR3JpZERvd25SaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbaSwgal0gPSBVbmljb2RlLkFzY2lpR3JpZERvd25SaWdodExlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIElzR3JpZChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih4IDwwIHx8IHkgPDAgfHwgeD49IFdpZHRoIHx8IHk+PSBIZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoYXIgYyA9IGNoYXJzW3gsIHldO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBVbmljb2RlLmdyaWRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYyA9PSBpdGVtKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIERyYXdMaW5lcyhpbnQgaGVybywgcGFyYW1zIFZlY3RvcjJEW10gcG9pbnRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwb2ludHMuTGVuZ3RoLTE7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd0xpbmUocG9pbnRzW2ldLCBwb2ludHNbaSsxXSwgaGVybyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd0xpbmUoVmVjdG9yMkQgcG9zMSwgVmVjdG9yMkQgcG9zMiwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hhciBjID0gVW5pY29kZS5Bc2NpaUdyaWRIb3I7XHJcbiAgICAgICAgICAgIGlmIChwb3MxLlkgIT0gcG9zMi5ZKSBjID0gVW5pY29kZS5Bc2NpaUdyaWRWZXI7XHJcbiAgICAgICAgICAgIGludCBoZWlnaHQgPSBwb3MyLllJbnQgLSBwb3MxLllJbnQ7XHJcbiAgICAgICAgICAgIC8vaWYgKGhlaWdodCA8PSAwKSBoZWlnaHQgPSAxO1xyXG4gICAgICAgICAgICBpbnQgd2lkdGggPSBwb3MyLlhJbnQgLSBwb3MxLlhJbnQ7XHJcbiAgICAgICAgICAgIC8vaWYgKHdpZHRoIDw9IDApIHdpZHRoID0gMTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKGMsIHBvczEuWEludCwgcG9zMS5ZSW50LCB3aWR0aCsxLCBoZWlnaHQrMSwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgUG9zaXRpb25Ub0luZGV4KFZlY3RvcjJEIHN0YXJ0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpKHN0YXJ0LlggKyBzdGFydC5ZICogV2lkdGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd09uZURpZ2l0X0N1cnNvcihpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdfQ3Vyc29yKChjaGFyKShpICsgJzAnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihjaGFyIGMpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgY3Vyc29yWCwgY3Vyc29yWSk7XHJcbiAgICAgICAgICAgIEFkdmFuY2VDdXJzb3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKGNoYXIgYywgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIERyYXdDaGFyKGMsIGN1cnNvclgsIGN1cnNvclksIGNvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICBBZHZhbmNlQ3Vyc29yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWR2YW5jZUN1cnNvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdXJzb3JYKys7XHJcbiAgICAgICAgICAgIGlmIChjdXJzb3JYID49IFdpZHRoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JYID0gMDtcclxuICAgICAgICAgICAgICAgIGN1cnNvclkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQ3Vyc29yTmV3TGluZShpbnQgeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclkrKztcclxuICAgICAgICAgICAgY3Vyc29yWCA9IHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hhcihjaGFyIHYsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodiAhPSBOT0NIQU5HRUNIQVIpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJzW3gsIHldID0gdjtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0NoYXIoY2hhciB2LCBpbnQgeCwgaW50IHksIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIodiwgeCwgeSk7XHJcbiAgICAgICAgICAgIFNldENvbG9yKGNvbG9yLCB4LCB5KTtcclxuICAgICAgICAgICAgU2V0QmFja0NvbG9yKGJhY2tDb2xvciwgeCwgeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldEFsbChjaGFyIHRleHQsIGludCB0ZXh0Q29sb3IgPSBOT0NIQU5HRUNPTE9SLCBpbnQgYmFja0NvbG9yPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKHRleHQsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIHRleHRDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0QWxsSWZWaXNpYmxlKGNoYXIgdGV4dCwgaW50IHRleHRDb2xvciA9IE5PQ0hBTkdFQ09MT1IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkSWZWaXNpYmxlKHRleHQsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIHRleHRDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1dpdGhHcmlkKHN0cmluZyB0ZXh0LCBpbnQgeCwgaW50IHksIGludCBncmlkQ29sb3IsIGludCB0ZXh0Q29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgd2lkdGggPSB0ZXh0Lkxlbmd0aDtcclxuICAgICAgICAgICAgRHJhd0dyaWQoeCwgeSwgd2lkdGggKyAyLCAzLCBncmlkQ29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3KHRleHQsIHggKyAxLCB5ICsgMSwgdGV4dENvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoc3RyaW5nIHYsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdi5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHgyID0geCArIGk7XHJcbiAgICAgICAgICAgICAgICBpbnQgeTIgPSB5O1xyXG4gICAgICAgICAgICAgICAgaWYoeDIgPj0gV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDIgLT0gV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgeTIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKHZbaV0sIHgyLCB5MiwgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdXaXRoTGluZWJyZWFrcyhzdHJpbmcgdiwgaW50IHgsIGludCB5LCBpbnQgbmV3bGluZVgsIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbGluZWJyZWFrcyA9IDA7XHJcbiAgICAgICAgICAgIGludCB4T2Zmc2V0bmV3bGluZXMgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHYuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCB4MiA9IHggKyBpKyB4T2Zmc2V0bmV3bGluZXM7XHJcbiAgICAgICAgICAgICAgICBpbnQgeTIgPSB5O1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoeDIgPj0gV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDIgLT0gV2lkdGgrbmV3bGluZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgeTIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKHZbaV0sIHgyLCB5MitsaW5lYnJlYWtzLCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgIGlmICh2W2ldID09ICdcXG4nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVicmVha3MrKztcclxuICAgICAgICAgICAgICAgICAgICB4T2Zmc2V0bmV3bGluZXMgKz0gbmV3bGluZVggLSB4Mi0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhJRW51bWVyYWJsZTxjaGFyPiB2LCBpbnQgeCwgaW50IHksIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQ291bnQ8Y2hhcj4odik7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5FbGVtZW50QXQ8Y2hhcj4odixpKSwgeCArIGksIHksIGNvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3R3JpZChpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodCwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChVbmljb2RlLkFzY2lpR3JpZFZlciwgeCwgeSwgMSwgaGVpZ2h0LCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChVbmljb2RlLkFzY2lpR3JpZFZlciwgeCArIHdpZHRoIC0gMSwgeSwgMSwgaGVpZ2h0LCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChVbmljb2RlLkFzY2lpR3JpZEhvciwgeCwgeSwgd2lkdGgsIDEsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKFVuaWNvZGUuQXNjaWlHcmlkSG9yLCB4LCB5ICsgaGVpZ2h0IC0gMSwgd2lkdGgsIDEsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgoY2hhcikyMTgsIHgsIHksIDEsIDEsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKChjaGFyKTE5MiwgeCwgICAgICAgICAgICAgIHkraGVpZ2h0LTEsIDEsIDEsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKChjaGFyKTIxNywgeCt3aWR0aC0xLCAgICAgIHkrIGhlaWdodCAtIDEsIDEsIDEsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKChjaGFyKTE5MSwgeCArIHdpZHRoIC0gMSwgIHksIDEsIDEsIGNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdSZXBlYXRlZChjaGFyIGMsIGludCB4LCBpbnQgeSwgaW50IHdpZHRoLCBpbnQgaGVpZ2h0LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IHg7IGkgPCB4ICsgd2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IHk7IGogPCB5ICsgaGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRHJhd0NoYXIoYywgaSwgaiwgY29sb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBTZXRCYWNrQ29sb3IoYmFja0NvbG9yLCBpLCBqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1JlcGVhdGVkSWZWaXNpYmxlKGNoYXIgYywgaW50IHgsIGludCB5LCBpbnQgd2lkdGgsIGludCBoZWlnaHQsIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0geDsgaSA8IHggKyB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0geTsgaiA8IHkgKyBoZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhcnNbaSwgal0gIT0gVGV4dEJvYXJkLklOVklTSUJMRUNIQVIgfHwgVGV4dENvbG9yW2ksal0gIT0gSU5WSVNJQkxFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERyYXdDaGFyKGMsIGksIGosIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihCYWNrQ29sb3JbaSxqXSAhPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNldEJhY2tDb2xvcihiYWNrQ29sb3IsIGksIGopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRDb2xvcihpbnQgY29sb3IsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb2xvciAhPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgVGV4dENvbG9yW3gsIHldID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRCYWNrQ29sb3IoaW50IGNvbG9yLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29sb3IgIT0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQmFja0NvbG9yW3gsIHldID0gY29sb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoc3RyaW5nIHYsIGludCB4MiwgaW50IHkyLCBvYmplY3QgaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdHcmlkKGludCB2MSwgaW50IHYyLCBpbnQgdjMsIGludCB2NCwgb2JqZWN0IGJvYXJkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IERyYXdDdXJzb3JSZXN1bHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgU3RhcnRJbmRleDtcclxuICAgICAgICAgICAgcHVibGljIGludCBFbmRJbmRleDtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIFN0YXJ0UG9zaXRpb247XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBFbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBEcmF3Q3Vyc29yUmVzdWx0KGludCBzdGFydEluZGV4LCBpbnQgZW5kSW5kZXgsIFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIFZlY3RvcjJEIGVuZFBvc2l0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTdGFydEluZGV4ID0gc3RhcnRJbmRleDtcclxuICAgICAgICAgICAgICAgIEVuZEluZGV4ID0gZW5kSW5kZXg7XHJcbiAgICAgICAgICAgICAgICBTdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIEVuZFBvc2l0aW9uID0gZW5kUG9zaXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0U2NyZWVuTiA6IElUZXh0U2NyZWVuLCBJTW91c2VJbnB1dCwgSUtleWJvYXJkSW5wdXRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVGV4dFdvcmxkIFRleHRXb3JsZDtcclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBVcGRhdGUoZmxvYXQgZikgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0U2NyZWVuTigpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRTY3JlZW5OKFRleHRXb3JsZCB0ZXh0V29ybGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0V29ybGQgPSB0ZXh0V29ybGQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgIHZvaWQgSW5pdChpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0V29ybGQgPSBuZXcgVGV4dFdvcmxkKCk7XHJcbiAgICAgICAgICAgIFRleHRXb3JsZC5Jbml0KHcsIGgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRleHRXb3JsZC5tYWluQm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE1vdXNlRXZlbnQoTW91c2VFdmVudHMgbW91c2VEb3duLCBpbnQgdjEsIGludCB2MilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIGludCBJbnB1dEFzTnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIElucHV0VW5pY29kZSAtIDQ4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSVRleHRTY3JlZW5cclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBUZXh0Qm9hcmQgR2V0Qm9hcmQoKTtcclxuICAgICAgICBcclxuICAgICAgICB2b2lkIFVwZGF0ZShmbG9hdCBmKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW50ZXJmYWNlIElNb3VzZUlucHV0XHJcbiAgICB7XHJcbiAgICAgICAgdm9pZCBNb3VzZUV2ZW50KE1vdXNlRXZlbnRzIGV2ZW50VHlwZSwgaW50IHYxLCBpbnQgdjIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSUtleWJvYXJkSW5wdXRcclxuICAgIHtcclxuICAgICAgICBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gTW91c2VFdmVudHNcclxuICAgIHsgXHJcbiAgICAgICAgTW91c2VEb3duLFxyXG4gICAgICAgIE5vbmVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFNjcmVlbkhvbGRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBJVGV4dFNjcmVlbiBTY3JlZW4geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBJTW91c2VJbnB1dCBNb3VzZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIElLZXlib2FyZElucHV0IEtleSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0QWxsKG9iamVjdCBkbnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTY3JlZW4gPSBkbnMgYXMgSVRleHRTY3JlZW47XHJcbiAgICAgICAgICAgIE1vdXNlID0gZG5zIGFzIElNb3VzZUlucHV0O1xyXG4gICAgICAgICAgICBLZXkgPSBkbnMgYXMgSUtleWJvYXJkSW5wdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcEhhbmRsaW5nXHJcbiAgICB7XHJcbiAgICAgICAgQmF0dGxlUmVuZGVyIGJhdHRsZVJlbmRlcjtcclxuICAgICAgICBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBwdWJsaWMgQWN0aW9uIEhhbmRsZTtcclxuICAgICAgICBMaXN0PEhhcHBIYW5kbGVyPiBoYW5kbGVycyA9IG5ldyBMaXN0PEhhcHBIYW5kbGVyPigpO1xyXG4gICAgICAgIHByaXZhdGUgUXVpY2tBY2Nlc3NvclR3bzxIYXBwVGFncywgVGltZVN0YW1wU25hcD4gaGFwcHM7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCBoaWdoZXN0SGFuZGxlZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGhhbmRsZVN0YXRlLmhpZ2hlc3RIYW5kbGVkOyB9XHJcbiAgICAgICAgICAgIHNldCB7IGhhbmRsZVN0YXRlLmhpZ2hlc3RIYW5kbGVkID0gdmFsdWU7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBIYXBwSGFuZGxlU3RhdGUgaGFuZGxlU3RhdGUgPSBuZXcgSGFwcEhhbmRsZVN0YXRlKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwSGFuZGxpbmcoQmF0dGxlUmVuZGVyIGJhdHRsZVJlbmRlciwgQmF0dGxlU2V0dXAgYmF0dGxlU2V0dXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJhdHRsZVJlbmRlciA9IGJhdHRsZVJlbmRlcjtcclxuICAgICAgICAgICAgdmFyIHdvcmxkID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZDtcclxuICAgICAgICAgICAgdmFyIHBvc0FuaW0gPSB3b3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5Qb3NpdGlvbkFuaW1hdGlvbj4obmV3IFBvc2l0aW9uQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICB2YXIgYmxpbmtBbmltID0gd29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuQmxpbmtBbmltPihuZXcgQmxpbmtBbmltKCkpO1xyXG4gICAgICAgICAgICB2YXIgZGVsYXlBbmltID0gd29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuRGVsYXlzQW5pbWF0aW9uPihuZXcgRGVsYXlzQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGJhdHRsZVNldHVwLmVjcztcclxuICAgICAgICAgICAgdGhpcy5lY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChoYW5kbGVTdGF0ZSk7XHJcbiAgICAgICAgICAgIHZhciBiYXR0bGVNYWluID0gYmF0dGxlU2V0dXAuYmF0dGxlTWFpbjtcclxuICAgICAgICAgICAgdmFyIHRpbWUgPSBiYXR0bGVTZXR1cC50aW1lU3RhbXA7XHJcbiAgICAgICAgICAgIGJhdHRsZVJlbmRlci5IYXBwSGFuZGxpbmcgPSB0aGlzO1xyXG4gICAgICAgICAgICBoYXBwcyA9IGVjcy5RdWlja0FjY2Vzc29yMjxIYXBwVGFncywgVGltZVN0YW1wU25hcD4oKTtcclxuICAgICAgICAgICAgaGlnaGVzdEhhbmRsZWQgPSAtMTtcclxuXHJcblxyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQobmV3IEhhcHBIYW5kbGVyKChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGFtYWdlID0gZS5HZXRDb21wb25lbnQ8SGFwcERhbWFnZURhdGE+KCk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc3RyaW5nIG1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGFtYWdlLmVsZW1lbnRhbEJsb2NrKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyB0ZXh0ID0gZGFtYWdlLmRhbWFnZUUuVG9TdHJpbmcoKS5Ub1VwcGVyKCkgKyBcIiBCTE9DSyBcIiArIGRhbWFnZS50YXJnZXRFLlRvU3RyaW5nKCkuVG9VcHBlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZTIgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkodGV4dC5MZW5ndGgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3JFID0gQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UyLk9yaWdpbi5EcmF3KHRleHQsIDAsIDAsIGNvbG9yRSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKG1lc3NhZ2UyLkFuaW1CYXNlKDAuNmYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkZyb250Q29sb3IoY29sb3JFLCAwLjJmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBvZmZzZXQgPSAoaW50KU1hdGguRmxvb3IoLXRleHQuTGVuZ3RoIC8gMmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlMi5TZXRQb3NpdGlvbihiYXR0bGVSZW5kZXIuYmF0dGxlclJlbmRlcnNbZGFtYWdlLnRhcmdldF0uR2V0UG9zaXRpb24oKSArIG5ldyBWZWN0b3IyRCgrMSArIG9mZnNldCwgLTMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXlBbmltLkRlbGF5KDAuNjVmKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oYmF0dGxlTWFpbi5lbnRpdGllc1tkYW1hZ2UudGFyZ2V0XS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmxhc3QgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoNSwgNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsYXN0LlNldFBvc2l0aW9uKHBvcyArIG5ldyBWZWN0b3IyRCgtMiwgLTIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsYXN0Lk9yaWdpbi5EcmF3UmVjdCgnICcsIDAsIDAsIDUsIDUsIFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUiwgQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2JsYXN0Lk9yaWdpbi5EcmF3UmVwZWF0ZWQoJyAnLCAxLCAxLCAzLCAzLCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IsIEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoZGFtYWdlLmRhbWFnZUUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChibGFzdC5BbmltQmFzZSgwLjJmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5CYWNrQ29sb3IoQmF0dGxlUmVuZGVyLkNvbG9ycy5pbnB1dEtleSwgMC4wNWYsIGZhbHNlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBkYW1hZ2UuZGFtYWdlRSArIFwiIGFic29yYnMgXCIgKyBkYW1hZ2UudGFyZ2V0RSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSArPSBiYXR0bGVSZW5kZXIuR2V0RW50aXR5TmFtZShkYW1hZ2UudGFyZ2V0KSArIFwiIGlzIHVuYWZlY3R0ZWQuXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZSA9IGJhdHRsZVJlbmRlci5HZXRFbnRpdHlOYW1lKGRhbWFnZS50YXJnZXQpICsgXCIgZ2V0cyBoaXQhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhbWFnZS5zdXBlckVmZmVjdGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgdGV4dCA9IGRhbWFnZS5kYW1hZ2VFLlRvU3RyaW5nKCkuVG9VcHBlcigpICsgXCIgQlJFQUsgXCIgKyBkYW1hZ2UudGFyZ2V0RS5Ub1N0cmluZygpLlRvVXBwZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlMiA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eSh0ZXh0Lkxlbmd0aCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3JFID0gQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlMi5PcmlnaW4uRHJhdyh0ZXh0LCAwLCAwLCBjb2xvckUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQobWVzc2FnZTIuQW5pbUJhc2UoMC40NWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkZyb250Q29sb3IoY29sb3JFLCAwLjJmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnQgb2Zmc2V0ID0gKGludClNYXRoLkZsb29yKC10ZXh0Lkxlbmd0aCAvIDJmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UyLlNldFBvc2l0aW9uKGJhdHRsZVJlbmRlci5iYXR0bGVyUmVuZGVyc1tkYW1hZ2UudGFyZ2V0XS5HZXRQb3NpdGlvbigpICsgbmV3IFZlY3RvcjJEKCsxICsgb2Zmc2V0LCAtMikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXlBbmltLkRlbGF5KDAuNjVmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZSA9IGRhbWFnZS5kYW1hZ2VFICsgXCIgcmF2YWdlcyBcIiArIGRhbWFnZS50YXJnZXRFICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tZXNzYWdlICs9IGJhdHRsZVJlbmRlci5HZXRFbnRpdHlOYW1lKGRhbWFnZS50YXJnZXQpK1wiIHRha2VzIGEgaGVhdnkgaGl0IVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oYmF0dGxlTWFpbi5lbnRpdGllc1tkYW1hZ2UudGFyZ2V0XS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJsYXN0ID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDUsIDUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxhc3QuU2V0UG9zaXRpb24ocG9zICsgbmV3IFZlY3RvcjJEKC0yLCAtMikpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsYXN0Lk9yaWdpbi5EcmF3UmVwZWF0ZWQoJyAnLCAxLCAxLCAzLCAzLCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IsIEJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChibGFzdC5BbmltQmFzZSgwLjJmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5CYWNrQ29sb3IoQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSksIDAuMDVmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tZXNzYWdlID0gYmF0dGxlUmVuZGVyLkdldEVudGl0eU5hbWUoZGFtYWdlLnRhcmdldCkgKyBcIiBnZXRzIGh1cnRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZVJlbmRlci5TaG93TWVzc2FnZShtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmZW5kZXIgPSBiYXR0bGVSZW5kZXIuYmF0dGxlclJlbmRlcnNbZGFtYWdlLnRhcmdldF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgZmUgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoZGVmZW5kZXIuV2lkdGgsIGRlZmVuZGVyLkhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhbWFnZS5zdXBlckVmZmVjdGl2ZSAmJiAhZGFtYWdlLmVsZW1lbnRhbEJsb2NrICYmIGJhdHRsZU1haW4uZW50aXRpZXNbZGFtYWdlLnRhcmdldF0uQWxpdmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZlID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDMsIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBiYWNrQ29sb3IgPSBCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGRhbWFnZS5kYW1hZ2VFKTtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrQ29sb3IgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4Q29sb3IgPSBCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGRhbWFnZS5kYW1hZ2VFKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGFyIGRhbWFnZUNoYXIgPSAnWCc7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKGRhbWFnZUNoYXIsIDEsIDAsIHhDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoZGFtYWdlQ2hhciwgMSwgMSwgeENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihkYW1hZ2VDaGFyLCAxLCAyLCB4Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKGRhbWFnZUNoYXIsIDAsIDEsIHhDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoZGFtYWdlQ2hhciwgMiwgMSwgeENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZmUuT3JpZ2luLkRyYXdDaGFyKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIDAsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5Qb3NpdGlvbiA9IGRlZmVuZGVyLkdldFBvc2l0aW9uKCkgKyBuZXcgVmVjdG9yMkQoLTEsIC0xKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChmZS5BbmltQmFzZSgwLjM1ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQ2hhcignWicsIDAuMDVmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9ibGlua0FuaW0uQWRkKGZlLkFuaW1CYXNlKDAuMzVmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5CYWNrQ29sb3IoQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvLCAwLjA1ZikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkNIQU5HRSBFTEVcIik7XHJcblxyXG4gICAgICAgICAgICB9LCBNaXNjSGFwcFRhZ3MuRGFtYWdlKSk7XHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChuZXcgSGFwcEhhbmRsZXIoKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBobWQgPSBlLkdldENvbXBvbmVudDxIYXBwTW92ZURhdGE+KCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHN0cmluZyB0ZXh0ID0gaG1kLmVsZW1lbnQuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRUZW1wRW50aXR5KHRleHQuTGVuZ3RoLCAxKTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuT3JpZ2luLkRyYXcodGV4dCwgMCwgMCwgQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvKTtcclxuICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQobWVzc2FnZS5BbmltQmFzZSgwLjVmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5Gcm9udENvbG9yKEJhdHRsZVJlbmRlci5Db2xvcnMuSW5wdXREZXNjcmlwdGlvbiwgMC4xNWYpKTtcclxuICAgICAgICAgICAgICAgIGludCBvZmZzZXQgPSAoaW50KU1hdGguRmxvb3IoLXRleHQuTGVuZ3RoIC8gMmYpO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5TZXRQb3NpdGlvbihiYXR0bGVSZW5kZXIuYmF0dGxlclJlbmRlcnNbaG1kLnVzZXJdLkdldFBvc2l0aW9uKCkgKyBuZXcgVmVjdG9yMkQoKzEgKyBvZmZzZXQsIC0xKSk7XHJcblxyXG4gICAgICAgICAgICB9LCBNaXNjSGFwcFRhZ3MuQ2hhbmdlRWxlbWVudCkpO1xyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQobmV3IEhhcHBIYW5kbGVyKChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG1kID0gZS5HZXRDb21wb25lbnQ8SGFwcE1vdmVEYXRhPigpO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgZGVmZW5kZXIgPSBiYXR0bGVSZW5kZXIuYmF0dGxlclJlbmRlcnNbaG1kLnRhcmdldF07XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oYmF0dGxlTWFpbi5lbnRpdGllc1tobWQudXNlcl0ucG9zKTtcclxuICAgICAgICAgICAgICAgIHZhciBibGFzdCA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eSgzLCAzKTtcclxuICAgICAgICAgICAgICAgIGJsYXN0LlNldFBvc2l0aW9uKHBvcyArIG5ldyBWZWN0b3IyRCgtMSwgLTEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBibGFzdC5PcmlnaW4uRHJhd1JlcGVhdGVkKCcgJywgMSwgMSwgMSwgMSwgVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SLCBCYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15KTtcclxuICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoYmxhc3QuQW5pbUJhc2UoMC4yZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQmFja0NvbG9yKEJhdHRsZVJlbmRlci5Db2xvcnMuSGVybywgMC4wNWYpKTtcclxuICAgICAgICAgICAgICAgIC8vZGVsYXlBbmltLkRlbGF5KDUpO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiREVBVEhcIik7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJDSEFOR0UgRUxFXCIpO1xyXG5cclxuICAgICAgICAgICAgfSwgTWlzY0hhcHBUYWdzLkRlYXRoKSk7XHJcbiAgICAgICAgICAgIEFjdGlvbjxFbnRpdHk+IG1vdmVNaXNzID0gKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJIQU5ETEUhM1wiKTtcclxuICAgICAgICAgICAgICAgIHZhciBobWQgPSBlLkdldENvbXBvbmVudDxIYXBwTW92ZURhdGE+KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG1mID0gZS5HZXRDb21wb25lbnQ8SGFwcE1vdmVtZW50RmFpbD4oKTtcclxuICAgICAgICAgICAgICAgIGludCBlSWQgPSBobWQudXNlcjtcclxuICAgICAgICAgICAgICAgIHZhciBtb3ZlciA9IGJhdHRsZU1haW4uZW50aXRpZXNbZUlkXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gbW92ZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zMiA9IGhtZi5tb3ZlVG87XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zRiA9IChwb3MgKyBwb3MyKSAvIDI7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGZlID0gYmF0dGxlUmVuZGVyLmJhdHRsZXJSZW5kZXJzW2VJZF07XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiTW92ZSBmYWlsXCIpO1xyXG4gICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoZmUuQW5pbUJhc2UoMC4yZiksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24obW92ZXIuUG9zaXRpb25WMkQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvc0YpKSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChuZXcgSGFwcEhhbmRsZXIobW92ZU1pc3MsIE1vdmVEYXRhVGFncy5Nb3ZlbWVudCkpO1xyXG5cclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKG5ldyBIYXBwSGFuZGxlcigoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhID0gZS5HZXRDb21wb25lbnQ8SGFwcEFyZWE+KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG1kID0gZS5HZXRDb21wb25lbnQ8SGFwcE1vdmVEYXRhPigpO1xyXG4gICAgICAgICAgICAgICAgaW50IGVJZCA9IGhtZC51c2VyO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vdmVyID0gYmF0dGxlTWFpbi5lbnRpdGllc1tlSWRdO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgdXNlclJlbmRlciA9IGJhdHRsZVJlbmRlci5iYXR0bGVyRW50aXRpZXNbZUlkXTtcclxuICAgICAgICAgICAgICAgIHZhciBhcmVhID0gaGEuYXJlYTtcclxuICAgICAgICAgICAgICAgIHZhciBwb2ludHMgPSBhcmVhLnBvaW50cztcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdXNlRWZmZWN0ID0gd29ybGQuR2V0VGVtcEVudGl0eSgxLCAxKTtcclxuICAgICAgICAgICAgICAgIHVzZUVmZmVjdC5TZXRQb3NpdGlvbihiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihtb3Zlci5wb3MpKTtcclxuICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQodXNlRWZmZWN0LkFuaW1CYXNlKDAuNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGhtZC5lbGVtZW50KSwgMC4xNWYpKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHBvaW50cylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW50aXR5ID0gd29ybGQuR2V0VGVtcEVudGl0eSgxLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmluYWxQb3MgPSBpdGVtICogbmV3IFZlY3RvcjJEKGhhLm1pcnJvcmluZ1gsIDEpICsgaGEub2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbFBvcy5YIDwgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsUG9zLlkgPCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWxQb3MuWCA+IDUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbFBvcy5ZID4gMikgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKGZpbmFsUG9zLlhJbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShmaW5hbFBvcy5ZSW50KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oZmluYWxQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5TZXRQb3NpdGlvbihwb3MuWEludCwgcG9zLllJbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoZW50aXR5LkFuaW1CYXNlKDAuNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGhtZC5lbGVtZW50KSwgMC4xNWYpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgTW92ZURhdGFUYWdzLkJvbWIpKTtcclxuICAgICAgICAgICAgSGFuZGxlID0gKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBTkRMRSFcIik7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCBuZXdIaWdoZXN0SGFuZGxlZCA9IGhpZ2hlc3RIYW5kbGVkO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBoYXBwcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJBRFZcIitiYXR0bGVSZW5kZXIuQ2FuQWR2YW5jZUdyYXBoaWNzKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYmF0dGxlUmVuZGVyLkNhbkFkdmFuY2VHcmFwaGljcygpKSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFncyA9IGhhcHBzLkNvbXAxKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwID4gaGlnaGVzdEhhbmRsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiBoaWdoZXN0SGFuZGxlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmV3SGlnaGVzdEhhbmRsZWQgPSBoYXBwcy5Db21wMihpKS5UaW1lU25hcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SGlnaGVzdEhhbmRsZWQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGhhbiBpbiBoYW5kbGVycylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBTkRMRSF4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbi5DYW5IYW5kbGUodGFncy50YWdzKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwICsgXCIgLSBcIiArIHRpbWUuQ3VycmVudFNuYXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJIQU5ETEUhMlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW4uSGFuZGxlcihoYXBwcy5FbnRpdHkoaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoaGFwcHMuQ29tcDIoaSkuVGltZVNuYXArXCIgLSBcIisgdGltZS5DdXJyZW50U25hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaGlnaGVzdEhhbmRsZWQgPSBuZXdIaWdoZXN0SGFuZGxlZDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgSGFwcEhhbmRsZVN0YXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgZmxvYXQgaGlnaGVzdEhhbmRsZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgSGFwcEhhbmRsZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludGVybmFsIExpc3Q8aW50PiBuZWNlc3NhcnlUYWdzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBBY3Rpb248RW50aXR5PiBIYW5kbGVyO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEhhcHBIYW5kbGVyKEFjdGlvbjxFbnRpdHk+IGhhbmRsZXIsIHBhcmFtcyBvYmplY3RbXSB0YWdzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdCBpbiB0YWdzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5lY2Vzc2FyeVRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMih0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLkhhbmRsZXIgPSBoYW5kbGVyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnRlcm5hbCBib29sIENhbkhhbmRsZShMaXN0PGludD4gdGFncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbmVjZXNzYXJ5VGFncylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRhZ3MuQ29udGFpbnMoaXRlbSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBoaWdoZXN0SGFuZGxlZCA+PSBoYXBwcy5MZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSW5wdXRIYW5kbGluZ1xyXG4gICAge1xyXG4gICAgICAgIGludFtdIHVuZml4ZWRDb21tYW5kS2V5cyA9IHsnMScsICcyJywnMycsJzQnIH07XHJcbiAgICAgICAgRGljdGlvbmFyeTxJbnB1dCwgaW50PiBmaXhlZE1vdmVCdXR0b25zID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8SW5wdXQsIGludD4oKSwoX28xKT0+e19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLk5vcm1hbFNob3QpLCdnJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSksJ2YnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2UpLCdpJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYiksJ2InKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyQm9tYiksJ3knKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyKSwndCcpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVSaWdodCksJ2QnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXApLCd3Jyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24pLCdzJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQpLCdhJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5Eb25lKSxVbmljb2RlLlNwYWNlKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LlJlZG8pLCdyJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5QcmV2aWV3KSwncCcpO3JldHVybiBfbzE7fSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgR2V0Rml4ZWRNb3ZlVW5pY29kZShJbnB1dCBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKGZpeGVkTW92ZUJ1dHRvbnMuVHJ5R2V0VmFsdWUoaW5wdXQsIG91dCB2YWx1ZSkpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBJbnB1dCBQaWNraW5nSGFuZChpbnQgdW5pY29kZUtleSwgSW5wdXRIb2xkZXIgaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiIGlucHV0ICsgXCIrKGNoYXIpdW5pY29kZUtleSk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGZpeGVkTW92ZUJ1dHRvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLlZhbHVlID09IHVuaWNvZGVLZXkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uS2V5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdW5maXhlZENvbW1hbmRLZXlzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodW5maXhlZENvbW1hbmRLZXlzW2ldID09IHVuaWNvZGVLZXkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHVuZml4ZWRDb21tYW5kUG9zID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpMiA9IDA7IGkyIDwgaW5wdXQuaW5wdXRzLkNvdW50OyBpMisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LlRhZ0lzKGkyLCBJbnB1dFRhZ3MuTU9WRVVORklYKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVuZml4ZWRDb21tYW5kUG9zID09IGkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0LmlucHV0c1tpMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmZpeGVkQ29tbWFuZFBvcysrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0KElucHV0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNZXNzYWdlT25Qb3NpdGlvblxyXG4gICAge1xyXG4gICAgICAgIEJhdHRsZVJlbmRlciBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0V29ybGQgdGV4dFdvcmxkO1xyXG4gICAgICAgIHByaXZhdGUgQmxpbmtBbmltIGJsaW5rQW5pbTtcclxuXHJcbiAgICAgICAgcHVibGljIE1lc3NhZ2VPblBvc2l0aW9uKEJhdHRsZVJlbmRlciBiYXR0bGVSZW5kZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkO1xyXG4gICAgICAgICAgICBibGlua0FuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuQmxpbmtBbmltPihuZXcgQmxpbmtBbmltKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTWVzc2FnZU9uUG9zKFZlY3RvcjJEIHBvcywgc3RyaW5nIHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZW50aXR5ID0gdGV4dFdvcmxkLkdldFRlbXBFbnRpdHkodi5MZW5ndGggKyAyLCA2KTtcclxuICAgICAgICAgICAgYmxpbmtBbmltLkFkZChlbnRpdHkuQW5pbUJhc2UoMmYpLCBuZXcgQmxpbmtBbmltLkJsaW5rRGF0YShUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIDAuMzVmLCAwLjM1ZikpO1xyXG4gICAgICAgICAgICB2YXIgeE9mZiA9ICh2Lkxlbmd0aCAtIDMpIC8gMjtcclxuICAgICAgICAgICAgaWYgKHhPZmYgPCAwKSB4T2ZmID0gMDtcclxuICAgICAgICAgICAgdmFyIGxpbmVTdGFydCA9IG5ldyBWZWN0b3IyRCh4T2ZmLCAwKTtcclxuICAgICAgICAgICAgZW50aXR5LlNldFBvc2l0aW9uKHBvcyArIG5ldyBWZWN0b3IyRCgxIC0geE9mZiwgMCkpO1xyXG4gICAgICAgICAgICBDb25zb2xlLldyaXRlKHBvcyk7XHJcbiAgICAgICAgICAgIC8vZW50aXR5Lk9yaWdpbi5EcmF3KHYsIDEsIDUpO1xyXG4gICAgICAgICAgICBlbnRpdHkuT3JpZ2luLkRyYXdXaXRoR3JpZCh2LCAwLCAzLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvKTtcclxuXHJcbiAgICAgICAgICAgIGVudGl0eS5PcmlnaW4uRHJhd0xpbmVzKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm8sIGxpbmVTdGFydCwgbGluZVN0YXJ0ICsgbmV3IFZlY3RvcjJEKDIsIDApLCBsaW5lU3RhcnQgKyBuZXcgVmVjdG9yMkQoMiwgMikpO1xyXG4gICAgICAgICAgICBlbnRpdHkuT3JpZ2luLkF1dG9GaXhHcmlkZGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1vdXNlSG92ZXJUZXh0XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdW10gdGV4dHMgPSBuZXcgc3RyaW5nWzJdW107XHJcbiAgICAgICAgcHVibGljIE1vdXNlSG92ZXJNYW5hZ2VyIGhvdmVyTWFuYWdlcjtcclxuICAgICAgICBwdWJsaWMgVGV4dEVudGl0eSBlbnRpdHk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUhvdmVyVGV4dChNb3VzZUhvdmVyTWFuYWdlciBob3Zlck1hbmFnZXIsIFRleHRFbnRpdHkgZW50aXR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ob3Zlck1hbmFnZXIgPSBob3Zlck1hbmFnZXI7XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gZW50aXR5O1xyXG4gICAgICAgICAgICAvL3RleHRzWzBdID0gbmV3IHN0cmluZ1tFbnVtLkdldFZhbHVlcyh0eXBlb2YoQmF0dGxlTWFpbi5Nb3ZlVHlwZSkpLkxlbmd0aF07XHJcbiAgICAgICAgICAgIHRleHRzWzBdID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgdXBcIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBsZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgZG93blwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIHJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICBcIlNob290cyBmb3J3YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBcIlNob290cyBmaXJlIGZvcndhcmRcIixcclxuICAgICAgICAgICAgICAgIFwiU2hvb3RzIGljZSBmb3J3YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBcIlNob290cyB0aHVuZGVyIGZvcndhcmRcIixcclxuICAgICAgICAgICAgICAgIFwiVGhyb3dzIGljZSBib21iIHRocmVlIHNxdWFyZXMgZm9yd2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJUaHJvd3MgdGh1bmRlciBib21iIHRocmVlIHNxdWFyZXMgZm9yd2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTdW1tb25zIGFub3RoZXIgZW5lbXlcIixcclxuICAgICAgICAgICAgICAgIFwiXCIsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbnRpdHkuUmVzZXRGdWxsKCk7XHJcbiAgICAgICAgICAgIGhvdmVyTWFuYWdlci5VcGRhdGUoKTtcclxuICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IGhvdmVyTWFuYWdlci5tb3VzZUhvdmVyc0FjdGl2ZTtcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZS5Db3VudCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBpZCA9IGFjdGl2ZVswXS5pZDtcclxuICAgICAgICAgICAgICAgIGlmKGlkID49IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHRleHQgPSB0ZXh0c1thY3RpdmVbMF0udHlwZV1baWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5PcmlnaW4uRHJhdyh0ZXh0LCAwLCAwLCAyKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeCA9IGFjdGl2ZVswXS5yZWN0LlggKyAxIC0gdGV4dC5MZW5ndGgvMjtcclxuICAgICAgICAgICAgICAgICAgICBlbnRpdHkuU2V0UG9zaXRpb24oeCwgYWN0aXZlWzBdLnJlY3QuWSArIDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcmV2aWV3U3lzdGVtXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBwcml2YXRlIEJhdHRsZU1haW4gYmF0dGxlTWFpbjtcclxuICAgICAgICBwdWJsaWMgYm9vbCBwcmV2aWV3QWN0aXZlO1xyXG4gICAgICAgIHByaXZhdGUgQ2xvbmVkU3RhdGUgY2xvbmVkU3RhdGU7XHJcbiAgICAgICAgcHJpdmF0ZSBRdWlja0FjY2Vzc29yT25lPEJhdHRsZU1haW4uQmF0dGxlRW50aXR5PiBiYXR0bGVFbnRpdHk7XHJcbiAgICAgICAgRGVidWdnZXIgZGVidWcgPSBuZXcgRGVidWdnZXIoZmFsc2UpO1xyXG5cclxuICAgICAgICBwdWJsaWMgUHJldmlld1N5c3RlbShFQ1NNYW5hZ2VyIGVjcywgQmF0dGxlTWFpbiBiYXR0bGVNYWluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIGVjcy5BZGRDb3B5TWV0aG9kKHR5cGVvZihCYXR0bGVNYWluLkJhdHRsZUVudGl0eSksIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248b2JqZWN0LCBvYmplY3Q+KSgobzEsIG8yKT0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0byA9IG8yIGFzIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdmFyIGZyb20gPSBvMSBhcyBCYXR0bGVNYWluLkJhdHRsZUVudGl0eTtcclxuICAgICAgICAgICAgICAgIHRvLnBvcyA9IGZyb20ucG9zO1xyXG4gICAgICAgICAgICAgICAgdG8ubGlmZSA9IGZyb20ubGlmZTtcclxuICAgICAgICAgICAgICAgIHRvLm1heExpZmUgPSBmcm9tLm1heExpZmU7XHJcbiAgICAgICAgICAgICAgICB0by5lbGVtZW50ID0gZnJvbS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0by5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0by5tb3Zlc1tpXSA9IGZyb20ubW92ZXNbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgZWNzLkFkZENvcHlNZXRob2QodHlwZW9mKEJhdHRsZU1haW4uQmF0dGxlU3RhdGUpLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPG9iamVjdCwgb2JqZWN0PikoKG8xLCBvMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvID0gbzIgYXMgQmF0dGxlTWFpbi5CYXR0bGVTdGF0ZTtcclxuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gbzEgYXMgQmF0dGxlTWFpbi5CYXR0bGVTdGF0ZTtcclxuICAgICAgICAgICAgICAgIHRvLmFjdGluZ0VudGl0eSA9IGZyb20uYWN0aW5nRW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdG8uQmF0dGxlRW5kQWN0aXZlID0gZnJvbS5CYXR0bGVFbmRBY3RpdmU7XHJcbiAgICAgICAgICAgICAgICB0by5tb3ZlVGlja19Ob3cgPSBmcm9tLm1vdmVUaWNrX05vdztcclxuICAgICAgICAgICAgICAgIHRvLm1vdmVUaWNrX1RvdGFsID0gZnJvbS5tb3ZlVGlja19Ub3RhbDtcclxuICAgICAgICAgICAgICAgIHRvLnBoYXNlID0gZnJvbS5waGFzZTtcclxuICAgICAgICAgICAgICAgIHRvLnR1cm4gPSBmcm9tLnR1cm47XHJcbiAgICAgICAgICAgICAgICB0by50dXJuc1BlclBoYXNlID0gZnJvbS50dXJuc1BlclBoYXNlO1xyXG4gICAgICAgICAgICAgICAgdG8udG90YWxUdXJucyA9IGZyb20udG90YWxUdXJucztcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBlY3MuQWRkQ29weU1ldGhvZCh0eXBlb2YoVGltZVN0YW1wKSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIG9iamVjdD4pKChvMSwgbzIpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0byA9IG8yIGFzIFRpbWVTdGFtcDtcclxuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gbzEgYXMgVGltZVN0YW1wO1xyXG4gICAgICAgICAgICAgICAgdG8uQ3VycmVudFNuYXAgPSBmcm9tLkN1cnJlbnRTbmFwO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIGVjcy5BZGRDb3B5TWV0aG9kKHR5cGVvZihIYXBwSGFuZGxpbmcuSGFwcEhhbmRsZVN0YXRlKSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIG9iamVjdD4pKChvMSwgbzIpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0byA9IG8yIGFzIEhhcHBIYW5kbGluZy5IYXBwSGFuZGxlU3RhdGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgZnJvbSA9IG8xIGFzIEhhcHBIYW5kbGluZy5IYXBwSGFuZGxlU3RhdGU7XHJcbiAgICAgICAgICAgICAgICB0by5oaWdoZXN0SGFuZGxlZCA9IGZyb20uaGlnaGVzdEhhbmRsZWQ7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVNYWluID0gYmF0dGxlTWFpbjtcclxuICAgICAgICAgICAgY2xvbmVkU3RhdGUgPSBuZXcgQ2xvbmVkU3RhdGUoKTtcclxuICAgICAgICAgICAgYmF0dGxlRW50aXR5ID0gZWNzLlF1aWNrQWNjZXNzb3IxPEJhdHRsZU1haW4uQmF0dGxlRW50aXR5PigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTdGFydFByZXZpZXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYmF0dGxlTWFpbi5lbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoXCJBTEwgRU5USVRJRVMgQkVGT1JFIFBSRVZJRVdcIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KGl0ZW0ucmFuZG9tUG9zaXRpb24gKyBcIiBSQU5ET00gUE9TXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoaXRlbS5UeXBlICsgXCIgdHlwZVwiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KGl0ZW0uZHJhd1R1cm4gKyBcIiBkcmF3IHR1cm5cIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkVORFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlY3MuQ2xvbmVTdGF0ZShjbG9uZWRTdGF0ZSk7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uYmF0dGxlU3RhdGUuQmF0dGxlRW5kQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHByZXZpZXdBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYmF0dGxlTWFpbi5lbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmxpZmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgaXRlbS5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5UaWNrKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBFbmRQcmV2aWV3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkVuZCBwcmV2aWV3XCIpO1xyXG4gICAgICAgICAgICAvLyAgIENvbnNvbGUuUmVhZEtleSgpO1xyXG4gICAgICAgICAgICBwcmV2aWV3QWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoYmF0dGxlTWFpbi5lbnRpdGllcy5Db250YWlucyhiYXR0bGVFbnRpdHkuQ29tcDEoMCkpK1wiWFhYU1wiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVjcy5SZXN0b3JlU3RhdGUoY2xvbmVkU3RhdGUpO1xyXG4gICAgICAgICAgICBiYXR0bGVNYWluLmJhdHRsZVN0YXRlLnBoYXNlID0gQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHM7XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBiYXR0bGVNYWluLmVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkFMTCBFTlRJVElFUyBBRlRFUiBQUkVWSUVXXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtLnJhbmRvbVBvc2l0aW9uK1wiIFJBTkRPTSBQT1NcIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtLlR5cGUgKyBcIiB0eXBlXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoaXRlbS5kcmF3VHVybiArIFwiIGRyYXcgdHVyblwiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KFwiRU5EXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBSZWZsZWN0aW9uVGVzdFxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgUmVmbGVjdGlvblRlc3QoKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWJ1ZyA9IG5ldyBEZWJ1Z2dlcih0cnVlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGJlID0gbmV3IENvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gYmUuR2V0VHlwZSgpO1xyXG4gICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBiZTIgPSBuZXcgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgYmUyLnJhbmRvbVBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgZGVidWcuUHJpbnQodHlwZS5HZXRGaWVsZChcInJhbmRvbVBvc2l0aW9uXCIpLkdldFZhbHVlKGJlMikuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGRlYnVnLlByaW50KGJlMi5yYW5kb21Qb3NpdGlvbiArIFwiXCIpO1xyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludChiZSk7XHJcbiAgICAgICAgICAgIERlZXBDbG9uZUhlbHBlci5EZWVwQ29weVBhcnRpYWwoYmUsIGJlMik7XHJcbiAgICAgICAgICAgIERlZXBDbG9uZUhlbHBlci5EZWVwQ29weVBhcnRpYWwoYmUyLCBiZSk7XHJcbiAgICAgICAgICAgIGRlYnVnLlByaW50KGJlKTtcclxuICAgICAgICAgICAgZGVidWcuUHJpbnQoYmUyKTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludCh0eXBlLkdldEZpZWxkKFwicmFuZG9tUG9zaXRpb25cIikuR2V0VmFsdWUoYmUyKS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgZGVidWcuUHJpbnQoYmUyLnJhbmRvbVBvc2l0aW9uK1wiXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW47XHJcbnVzaW5nIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmF0dGxlUmVuZGVyIDogSVRleHRTY3JlZW5fXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBCYXR0bGVNYWluIHR1cm5CYXNlVHJ5O1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgU3RhZ2VEYXRhIHN0YWdlRGF0YTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFByZXZpZXdTeXN0ZW0gcHJldmlld1N5c3RlbTtcclxuICAgICAgICBwcml2YXRlIFBvc2l0aW9uQW5pbWF0aW9uIHBvc0FuaW07XHJcbiAgICAgICAgcHJpdmF0ZSBDaGFyQnlDaGFyQW5pbWF0aW9uIGNoYXJCeUNoYXJBbmltO1xyXG4gICAgICAgIHByaXZhdGUgRGVsYXlzQW5pbWF0aW9uIGRlbGF5QW5pbTtcclxuXHJcbiAgICAgICAgcHVibGljIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBUZXh0Qm9hcmQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIGludCBpbnB1dDtcclxuICAgICAgICBwdWJsaWMgaW50IElucHV0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gaW5wdXQ7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gdmFsdWU7IC8vQ29uc29sZS5Xcml0ZUxpbmUodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEhhbmRsaW5nIEhhcHBIYW5kbGluZyB7IGdldDsgaW50ZXJuYWwgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIE1vdXNlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBwdWJsaWMgTW91c2VIb3Zlck1hbmFnZXIgbW91c2VIb3ZlcjtcclxuXHJcbiAgICAgICAgLy9wdWJsaWMgTGlzdDxEZWxheWVkQWN0aW9ucz4gdGFza3MgPSBuZXcgTGlzdDxEZWxheWVkQWN0aW9ucz4oKTtcclxuICAgICAgICBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPiBtb3ZlQ2hhcnM7XHJcbiAgICAgICAgRGljdGlvbmFyeTxvYmplY3QsIHN0cmluZz4gbW92ZURlc2NyaXB0aW9ucyA9IG5ldyBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPigpO1xyXG4gICAgICAgIERpY3Rpb25hcnk8TWlzY0JhdHRsZUlucHV0LCBzdHJpbmc+IG1pc2NEZXNjcmlwdGlvbnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxNaXNjQmF0dGxlSW5wdXQsIHN0cmluZz4oKSwoX28xKT0+e19vMS5BZGQoTWlzY0JhdHRsZUlucHV0LkRvbmUsXCJET05FXCIpO19vMS5BZGQoTWlzY0JhdHRsZUlucHV0LlJlZG8sXCJSRURPXCIpO19vMS5BZGQoTWlzY0JhdHRsZUlucHV0LlByZXZpZXcsXCJQUkVWSUVXXCIpO3JldHVybiBfbzE7fSk7XHJcbiAgICAgICAgcHJpdmF0ZSBEaWN0aW9uYXJ5PElucHV0LCBzdHJpbmc+IG1vdmVCdXR0b25zO1xyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgZGVidWdPbiA9IHRydWU7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZ3JpZFNjYWxlID01O1xyXG4gICAgICAgIHByaXZhdGUgaW50IGdyaWRPZmZzZXR4ID0yO1xyXG4gICAgICAgIHByaXZhdGUgaW50IGdyaWRPZmZzZXR5ID0gMTtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PFRleHRFbnRpdHk+IGJhdHRsZXJSZW5kZXJzO1xyXG5cclxuICAgICAgICBjaGFyW11bXSBlbnRpdGllc0NoYXJzO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCBNZXNzYWdlRG9Ob3RIaWRlO1xyXG4gICAgICAgIHN0cmluZyBtZXNzYWdlID0gbnVsbDtcclxuICAgICAgICBwcml2YXRlIGJvb2wgd2FpdGluZ0Zvck1lc3NhZ2VJbnB1dDtcclxuICAgICAgICBwcml2YXRlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlIGxhc3RQaGFzZTtcclxuICAgICAgICBwcml2YXRlIFRleHRFbnRpdHkgbWVzc2FnZUVudDtcclxuXHJcbiAgICAgICAgcHVibGljIElucHV0SGFuZGxpbmcgaW5wdXRIID0gbmV3IElucHV0SGFuZGxpbmcoKTtcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZVJlbmRlcihCYXR0bGVNYWluIGJhdHRsZUxvZ2ljLCBTdGFnZURhdGEgc3RhZ2VEYXRhLCBQcmV2aWV3U3lzdGVtIFByZXZpZXdTeXN0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHN0cmluZ1tdIGVudGl0eVRleHRzID0geyBcIkBcIiwgXCImXCIsIFwiJVwiLCBcIiRcIiwgXCJPXCIsIFwiWFwiLCBcIkpcIiwgXCJZXCIsIFwiWlwiIH07XHJcbiAgICAgICAgICAgIGVudGl0aWVzQ2hhcnMgPSBuZXcgY2hhcltlbnRpdHlUZXh0cy5MZW5ndGhdW107XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZW50aXR5VGV4dHMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVudGl0aWVzQ2hhcnNbaV0gPSBlbnRpdHlUZXh0c1tpXS5Ub0NoYXJBcnJheSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0dXJuQmFzZVRyeSA9IGJhdHRsZUxvZ2ljO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlRGF0YSA9IHN0YWdlRGF0YTtcclxuICAgICAgICAgICAgcHJldmlld1N5c3RlbSA9IFByZXZpZXdTeXN0ZW07XHJcbiAgICAgICAgICAgIHRleHRXb3JsZCA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgcG9zQW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5Qb3NpdGlvbkFuaW1hdGlvbj4obmV3IFBvc2l0aW9uQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICBjaGFyQnlDaGFyQW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5DaGFyQnlDaGFyQW5pbWF0aW9uPihuZXcgQ2hhckJ5Q2hhckFuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgZGVsYXlBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkRlbGF5c0FuaW1hdGlvbj4obmV3IERlbGF5c0FuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkluaXQoNzAsIDQ2KTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkID0gdGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICAgICAgLy9UZXh0Qm9hcmQgPSBuZXcgVGV4dEJvYXJkKDcwLCAyNSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBwb3NBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbihuZXcgUG9zaXRpb25BbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHZhciBibGlua0FuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuQmxpbmtBbmltPihuZXcgQmxpbmtBbmltKCkpO1xyXG5cclxuICAgICAgICAgICAgYmF0dGxlclJlbmRlcnMgPSBuZXcgTGlzdDxUZXh0RW50aXR5PigpO1xyXG4gICAgICAgICAgICBVcGRhdGVCYXR0bGVSZW5kZXJDb3VudCgpO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2VFbnQgPSB0ZXh0V29ybGQuR2V0RnJlZUVudGl0eSg0MCwgNCk7XHJcblxyXG4gICAgICAgICAgICB0dXJuQmFzZVRyeS5oYXBwTWFuYWdlci5BZGRIYW5kbGVyKG5ldyBIYXBwcy5IYXBwSGFuZGxlcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5IYXBwVGFnLkF0dGFja0hpdCwgKGgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlciA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2guR2V0QXR0cmlidXRlX0ludCgxKV07XHJcbiAgICAgICAgICAgICAgICBpbnQgZGVmZW5kZXJFSUQgPSBoLkdldEF0dHJpYnV0ZV9JbnQoMCk7XHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZGVmZW5kZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmVuZGVyRUlEID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZW5kZXIgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1tkZWZlbmRlckVJRF07XHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSAoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCloLkdldEF0dHJpYnV0ZV9JbnQoMik7XHJcbiAgICAgICAgICAgICAgICBUZXh0RW50aXR5IGZlID0gR2V0UHJvalRleHRFbnRpdHkoZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmVuZGVyICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGF0dGFja2VyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MyID0gZGVmZW5kZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhEaXMgPSBNYXRoLkFicyhwb3MuWCAtIHBvczIuWCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQgdGltZSA9IChmbG9hdCl4RGlzICogMC4xZjtcclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoZmUuQW5pbUJhc2UodGltZSksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oYXR0YWNrZXIuUG9zaXRpb25WMkQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGRlZmVuZGVyLlBvc2l0aW9uVjJEKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBhdHRhY2tlci5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zMiA9IHBvcztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZXIuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvczIuWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zMi5YID0gNjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgeERpcyA9IE1hdGguQWJzKHBvcy5YIC0gcG9zMi5YKTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCB0aW1lID0gKGZsb2F0KXhEaXMgKiAwLjFmO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKHRpbWUpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvcyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zMikpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vdHVybkJhc2VUcnkuaGFwcE1hbmFnZXIuQWRkSGFuZGxlcihuZXcgSGFwcHMuSGFwcEhhbmRsZXIoQmF0dGxlTWFpbi5IYXBwVGFnLkRhbWFnZVRha2VuLCAoaCkgPT5cclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIHZhciBkZWZlbmRlciA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2guR2V0QXR0cmlidXRlX0ludCgwKV07XHJcbiAgICAgICAgICAgIC8vICAgIHZhciBmZSA9IHRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDEsIDEpO1xyXG4gICAgICAgICAgICAvLyAgICBmZS5PcmlnaW4uRHJhd0NoYXIoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgMCwgMCk7XHJcbiAgICAgICAgICAgIC8vICAgIGZlLk9yaWdpbi5Qb3NpdGlvbiA9IEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oZGVmZW5kZXIuUG9zaXRpb25WMkQpO1xyXG4gICAgICAgICAgICAvLyAgICBibGlua0FuaW0uQWRkKGZlLkFuaW1CYXNlKDAuNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkNoYXIoJyAnLCAwLjFmKSk7XHJcbiAgICAgICAgICAgIC8vICAgIC8vU2hvd01lc3NhZ2UoXCJHb3QgZGFtYWdlZFwiKTtcclxuICAgICAgICAgICAgLy99KSk7XHJcblxyXG4gICAgICAgICAgICB0dXJuQmFzZVRyeS5oYXBwTWFuYWdlci5BZGRIYW5kbGVyKG5ldyBIYXBwcy5IYXBwSGFuZGxlcihCYXR0bGVNYWluLkhhcHBUYWcuQXR0YWNrTWlzcywgKGgpID0+XHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYXR0YWNrZXIgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1toLkdldEF0dHJpYnV0ZV9JbnQoMCldO1xyXG4gICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50ID0gKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQpaC5HZXRBdHRyaWJ1dGVfSW50KDEpO1xyXG4gICAgICAgICAgICAgICAgVGV4dEVudGl0eSBmZSA9IEdldFByb2pUZXh0RW50aXR5KGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IGF0dGFja2VyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvczIgPSBwb3M7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZXIuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zMi5YID0gLTE7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zMi5YID0gNjtcclxuICAgICAgICAgICAgICAgIHZhciB4RGlzID0gTWF0aC5BYnMocG9zLlggLSBwb3MyLlgpO1xyXG4gICAgICAgICAgICAgICAgZmxvYXQgdGltZSA9IChmbG9hdCl4RGlzICogMC4xZjtcclxuICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKHRpbWUpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zKSxcclxuICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvczIpKSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcblxyXG4gICAgICAgICAgICBtb3ZlQ2hhcnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxvYmplY3QsIHN0cmluZz4oKSwoX28yKT0+e19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlLFwiRlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlLFwiSVwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlcixcIlRcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk5vcm1hbFNob3QsXCJHXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsVW5pY29kZS5SaWdodGFycm93MitcIlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwLFVuaWNvZGUuVXBhcnJvdzIrXCJcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVEb3duLFVuaWNvZGUuRG93bmFycm93MitcIlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsVW5pY29kZS5MZWZ0YXJyb3cyK1wiXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iLFwiSUJcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXJCb21iLFwiVEJcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlN1bW1vbkVudGl0eSxcIlNVXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb05vdGhpbmcsXCIgXCIpO3JldHVybiBfbzI7fSk7XHJcblxyXG4gICAgICAgICAgICBtb3ZlRGVzY3JpcHRpb25zID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+KCksKF9vMyk9PntfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlLFwiSWNlIFNob3RcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUsXCJGaXJlIFNob3RcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIsXCJUaHVuZGVyIFNob3RcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsXCJJY2UgQm9tYlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTm9ybWFsU2hvdCxcIkd1blwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0LFVuaWNvZGUuUmlnaHRhcnJvdzIrXCJcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVVcCxVbmljb2RlLlVwYXJyb3cyK1wiXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93bixVbmljb2RlLkRvd25hcnJvdzIrXCJcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFVuaWNvZGUuTGVmdGFycm93MitcIlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXCJUaHVuZGVyIEJvbWJcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlN1bW1vbkVudGl0eSxcIlN1bW1vblwiKTtyZXR1cm4gX28zO30pO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1lc09uUG9zID0gbmV3IE1lc3NhZ2VPblBvc2l0aW9uKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5lbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmhlcm8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGJhdHRsZXJSZW5kZXJzW2ldLkdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZXNPblBvcy5NZXNzYWdlT25Qb3MoQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbih0dXJuQmFzZVRyeS5lbnRpdGllc1tpXS5wb3MpLCBcIllPVVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvL01lc3NhZ2VPblBvcyhWZWN0b3IyRC5aZXJvLCBcIllPVVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5SZWFkTGluZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVCYXR0bGVSZW5kZXJDb3VudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3aGlsZSAoYmF0dGxlclJlbmRlcnMuQ291bnQgPCB0aGlzLnR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUZXh0RW50aXR5IGl0ZW0gPSB0ZXh0V29ybGQuR2V0RnJlZUVudGl0eSgyLCAyKTtcclxuICAgICAgICAgICAgICAgIGJhdHRsZXJSZW5kZXJzLkFkZChpdGVtKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uU2V0UG9zaXRpb24oQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbiggdHVybkJhc2VUcnkuZW50aXRpZXNbYmF0dGxlclJlbmRlcnMuQ291bnQtMV0ucG9zKSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RyaW5nIEdldEVudGl0eU5hbWUoaW50IHVzZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZ2FtZUVudGl0eSA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW3VzZXJdO1xyXG4gICAgICAgICAgICB2YXIgY2hhcnMgPSBHZXRDaGFyKGdhbWVFbnRpdHkpO1xyXG4gICAgICAgICAgICBzdHJpbmcgbmFtZSA9IG5ldyBzdHJpbmcoY2hhcnMpO1xyXG4gICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5ncmFwaGljUmVwZWF0ZWRJbmRleCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lICsgKGdhbWVFbnRpdHkuZ3JhcGhpY1JlcGVhdGVkSW5kZXggKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVGV4dEVudGl0eSBHZXRQcm9qVGV4dEVudGl0eShQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZmUgPSB0ZXh0V29ybGQuR2V0VGVtcEVudGl0eSgxLCAxKTtcclxuICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKFRleHRCb2FyZC5JTlZJU0lCTEVDSEFSLCAwLCAwKTtcclxuICAgICAgICAgICAgaW50IGVsZW1lbnRDb2xvciA9IEVsZW1lbnRUb1Byb2pDb2xvcihlbGVtZW50KTtcclxuICAgICAgICAgICAgZmUuT3JpZ2luLlNldEJhY2tDb2xvcihlbGVtZW50Q29sb3IsIDAsIDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIElucHV0S2V5IGlucHV0ID0gKElucHV0S2V5KUlucHV0O1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQgIT0gSW5wdXRLZXkuTk9ORSAmJiB3YWl0aW5nRm9yTWVzc2FnZUlucHV0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3YWl0aW5nRm9yTWVzc2FnZUlucHV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2lmIChpbnB1dCAhPSBJbnB1dEtleS5OT05FKSBDb25zb2xlLldyaXRlTGluZShpbnB1dCk7XHJcbiAgICAgICAgICAgIC8vaW50IGlucHV0TnVtYmVyID0gaW5wdXQgLSAnMCc7XHJcbiAgICAgICAgICAgIC8vaWYgKGRlYnVnT24gJiYgaW5wdXQgPT0gJ2snKVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgRGVidWdFeHRyYS5EZWJ1Z0V4LlNob3coKTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICBpZiAobGFzdFBoYXNlICE9IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vU2hvd01lc3NhZ2UoXCJQaWNrIHlvdXIgY29tbWFuZHNcIiwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5TZXRBbGwoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIENvbG9ycy5GaXJlQXVyYSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RQaGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiWF9fWFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBIaWRlTWVzc2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLlNldEFsbChUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGFzdFBoYXNlID0gdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2U7XHJcbiAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKElucHV0VW5pY29kZSA+PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKElucHV0VW5pY29kZSA9PSAncCcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aWV3U3lzdGVtLlN0YXJ0UHJldmlldygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXRYID0gaW5wdXRILlBpY2tpbmdIYW5kKElucHV0VW5pY29kZSwgdHVybkJhc2VUcnkuaW5wdXRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0WC50eXBlICE9IElucHV0VHlwZS5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0dXJuQmFzZVRyeS5JbnB1dERvbmUoaW5wdXRYKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL2ZvcmVhY2ggKHZhciBpdGVtIGluIG1vdmVLZXlzKVxyXG4gICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAvLyAgICBpZiAoaXRlbS5WYWx1ZSA9PSBpbnB1dClcclxuICAgICAgICAgICAgICAgIC8vICAgIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0dXJuQmFzZVRyeS5JbnB1dERvbmUoaXRlbS5LZXkpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVXBkYXRlQmF0dGxlUmVuZGVyQ291bnQoKTtcclxuICAgICAgICAgICAgRHJhd0dyYXBoaWNzKGRlbHRhKTtcclxuICAgICAgICAgICAgaWYgKENhbkFkdmFuY2VfTG9naWMoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlICE9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlIC5FeGVjdXRlTW92ZSAmJiBwcmV2aWV3U3lzdGVtLnByZXZpZXdBY3RpdmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlld1N5c3RlbS5FbmRQcmV2aWV3KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlRpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkhhbmRSZWNoYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1N5c3RlbS5UaHJlYWRpbmcuVGhyZWFkLlNsZWVwKDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlRpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vVXBkYXRlQmF0dGxlUmVuZGVyQ291bnQoKTtcclxuICAgICAgICAgICAgLy9EcmF3R3JhcGhpY3MoZGVsdGEpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENhbkFkdmFuY2VHcmFwaGljcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFdvcmxkLklzRG9uZSgpICYmICF3YWl0aW5nRm9yTWVzc2FnZUlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIENhbkFkdmFuY2VfTG9naWMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIENhbkFkdmFuY2VHcmFwaGljcygpICYmIEhhcHBIYW5kbGluZy5Jc0RvbmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dNZXNzYWdlKHN0cmluZyBzLCBib29sIHdhaXRGb3JJbnB1dCA9IHRydWUsIGJvb2wgZG9Ob3RIaWRlID0gZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLk1lc3NhZ2VEb05vdEhpZGUgPSBkb05vdEhpZGU7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBzO1xyXG4gICAgICAgICAgICBtZXNzYWdlRW50Lk9yaWdpbi5SZXNldEludmlzaWJsZSgpO1xyXG4gICAgICAgICAgICBmbG9hdCB0aW1lVG9Xcml0ZSA9IG1lc3NhZ2UuTGVuZ3RoICogMC4wMTVmO1xyXG4gICAgICAgICAgICBpZiAodGltZVRvV3JpdGUgPiAwLjRmKSB0aW1lVG9Xcml0ZSA9IDAuNGY7XHJcbiAgICAgICAgICAgIGNoYXJCeUNoYXJBbmltLkFkZChtZXNzYWdlRW50LkFuaW1CYXNlKHRpbWVUb1dyaXRlKSwgbmV3IENoYXJCeUNoYXJBbmltYXRpb24uQ2hhckJ5Q2hhckRhdGEoMCwgbWVzc2FnZS5MZW5ndGggKyAxKSk7XHJcbiAgICAgICAgICAgIGRlbGF5QW5pbS5EZWxheSh0aW1lVG9Xcml0ZSArIDAuOGYpO1xyXG5cclxuICAgICAgICAgICAgLy93YWl0aW5nRm9yTWVzc2FnZUlucHV0ID0gd2FpdEZvcklucHV0O1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJNOiBcIitzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEhpZGVNZXNzYWdlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICB3YWl0aW5nRm9yTWVzc2FnZUlucHV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIk06IFwiK3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0JhdHRsZU1lc3NhZ2Uoc3RyaW5nIHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIXR1cm5CYXNlVHJ5LkJhdHRsZURlY2lkZWQoKSlcclxuICAgICAgICAgICAgICAgIFNob3dNZXNzYWdlKHMpO1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJNOiBcIitzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdHcmFwaGljcyhmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdXNlSG92ZXIubW91c2VIb3ZlcnMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgdHVybkJhc2VUcnkuVXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgLy9jbGVhciBncmlkXHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5SZXNldCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxhc3RQaGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5TZXRBbGwoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIENvbG9ycy5CYWNrZ3JvdW5kSW5wdXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnQgY29udHJvbHNZID0gZ3JpZFNjYWxlICogMyArIDEwICsgMyArIDI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpbnQgZW5lbXlHcmlkT2ZmWCA9IGdyaWRTY2FsZSAqIDM7XHJcbiAgICAgICAgICAgIGJvb2wgZHJhd0RvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1JlcGVhdGVkKCcgJywgZ3JpZE9mZnNldHgsIGdyaWRPZmZzZXR5LCBncmlkU2NhbGUgKiA2LCBncmlkU2NhbGUgKiAzLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgQ29sb3JzLkJhY2tCYXR0bGUpO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IDMgKiBncmlkU2NhbGU7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCAzICogZ3JpZFNjYWxlOyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRyYXdEb3QpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0NoYXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZE9mZnNldHggKyBpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkT2Zmc2V0eSArIGosIENvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3Q2hhcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRPZmZzZXR4ICsgaSArIGVuZW15R3JpZE9mZlgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkT2Zmc2V0eSArIGosIENvbG9ycy5HcmlkRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSAlIGdyaWRTY2FsZSA9PSAwICYmIGogJSBncmlkU2NhbGUgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0dyaWQoaSArIGdyaWRPZmZzZXR4ICsgZW5lbXlHcmlkT2ZmWCwgaiArIGdyaWRPZmZzZXR5LCBncmlkU2NhbGUsIGdyaWRTY2FsZSwgQ29sb3JzLkdyaWRFbmVteSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3R3JpZChpICsgZ3JpZE9mZnNldHgsIGogKyBncmlkT2Zmc2V0eSwgZ3JpZFNjYWxlLCBncmlkU2NhbGUsIENvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBnYW1lRW50aXR5ID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVjID0gR2V0Q2hhcihnYW1lRW50aXR5KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gZ2FtZUVudGl0eS5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgIHZhciBzY3JlZW5Qb3MgPSBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKChCYXNlVXRpbHMuVmVjdG9yMkQpcG9zKTtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LlR5cGUgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRW50aXR5VHlwZS5wYW5lbGVmZmVjdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JlZW5Qb3MuWSA9IHNjcmVlblBvcy5ZICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBzY3JlZW5Qb3MuWCA9IHNjcmVlblBvcy5YIC0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vYmF0dGxlckVudGl0aWVzW2ldLm9yaWdpbi5Qb3NpdGlvbiA9IHNjcmVlblBvcztcclxuICAgICAgICAgICAgICAgIGlmIChiYXR0bGVyUmVuZGVyc1tpXS5PcmlnaW4uUG9zaXRpb24gIT0gc2NyZWVuUG9zICYmIHRleHRXb3JsZC5Jc0RvbmUoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2JhdHRsZXJSZW5kZXJzW2ldLk9yaWdpbi5Qb3NpdGlvbiA9IHNjcmVlblBvcztcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCB0aW1lID0gMC4xNWY7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aW1lID0gNTtcclxuICAgICAgICAgICAgICAgICAgICBwb3NBbmltLkFkZChiYXR0bGVyUmVuZGVyc1tpXS5BbmltQmFzZSh0aW1lKSwgbmV3IFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YShiYXR0bGVyUmVuZGVyc1tpXS5PcmlnaW4uUG9zaXRpb24sIHNjcmVlblBvcywgdHJ1ZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjID0gQ29sb3JzLkhlcm87XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5UeXBlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpIGMgPSBDb2xvcnMuRW5lbXk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5UeXBlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVudGl0eVR5cGUucGlja3VwKSBjID0gQ29sb3JzLmlucHV0S2V5O1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuRGVhZClcclxuICAgICAgICAgICAgICAgICAgICBjID0gVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SO1xyXG4gICAgICAgICAgICAgICAgaW50IGJjID0gVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LkFsaXZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IGdhbWVFbnRpdHkuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50IT1QaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBFbGVtZW50VG9BdXJhQ29sb3IoZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuRGVhZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGVjLkxlbmd0aCArIDE7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZXJSZW5kZXJzW2ldLk9yaWdpbi5EcmF3Q2hhcihUZXh0Qm9hcmQuSU5WSVNJQkxFQ0hBUiwgaiwgMCwgYywgYmMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLkRyYXcoZWMsIDAsIDAsIGMsIGJjKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihnYW1lRW50aXR5LmdyYXBoaWNSZXBlYXRlZEluZGV4PjApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZXJSZW5kZXJzW2ldLk9yaWdpbi5EcmF3T25lRGlnaXQoZ2FtZUVudGl0eS5ncmFwaGljUmVwZWF0ZWRJbmRleCArIDEsIDAgKyBlYy5MZW5ndGgsIDAsIGMsIGJjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgaW50IHRleHRCb2FyZEhlaWdodCA9IDMgKiBncmlkU2NhbGU7XHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL2ludCB5ID0gMjtcclxuICAgICAgICAgICAgICAgIC8vaW50IHggPSA2ICogZ3JpZFNjYWxlICsgMjA7XHJcblxyXG4gICAgICAgICAgICAgICAgaW50IHggPSAzO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBEcmF3Q29udHJvbHMoY29udHJvbHNZLCB4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHVybkJhc2VUcnkudGltZVRvQ2hvb3NlID4gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IHJhdGlvID0gdHVybkJhc2VUcnkudGltZVRvQ2hvb3NlIC8gdHVybkJhc2VUcnkudGltZVRvQ2hvb3NlTWF4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1JlcGVhdGVkKCcgJywgeCwgY29udHJvbHNZICsgMTYsIChpbnQpKHJhdGlvICogMTUpLCAxLCBDb2xvcnMuQm9hcmQsIENvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3UmVwZWF0ZWQoJyAnLCB4IC0gMSwgY29udHJvbHNZIC0gMSwgMTUsIDE1LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnQgdHVybk9yZGVyWCA9IDYgKiBncmlkU2NhbGUgKyA1O1xyXG4gICAgICAgICAgICBpbnQgdHVybk9yZGVyWSA9IDI7XHJcbiAgICAgICAgICAgIHR1cm5PcmRlclggPSAyO1xyXG4gICAgICAgICAgICB0dXJuT3JkZXJZID0gMyAqIGdyaWRTY2FsZSArIDE7XHJcbiAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgICAgICB0dXJuT3JkZXJZICs9IDU7XHJcblxyXG4gICAgICAgICAgICBEcmF3VHVybk9yZGVyKHR1cm5PcmRlclgsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBpZiAoIXN0YWdlRGF0YS5oaWRlTGlmZVVJKVxyXG4gICAgICAgICAgICAgICAgRHJhd0xpZmUodHVybk9yZGVyWCArIDI1LCB0dXJuT3JkZXJZKTtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW50IFggPSAyO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zdCBpbnQgWSA9IDE2O1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZUVudC5TZXRQb3NpdGlvbihYLCBjb250cm9sc1kgLSAyKTtcclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlICE9IG51bGwgJiYgKCFDYW5BZHZhbmNlR3JhcGhpY3MoKSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0dyaWQoXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbWVzc2FnZUVudC5PcmlnaW4uUG9zaXRpb24uWEludCwgbWVzc2FnZUVudC5PcmlnaW4uUG9zaXRpb24uWUludCwgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbWVzc2FnZUVudC5XaWR0aCwgbWVzc2FnZUVudC5IZWlnaHQsIENvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZXNzYWdlRW50Lk9yaWdpbi5EcmF3R3JpZCgwLCAwLCA0MCwgNCwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlRW50Lk9yaWdpbi5EcmF3V2l0aExpbmVicmVha3MobWVzc2FnZSwgMSwgMCwgMSwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIU1lc3NhZ2VEb05vdEhpZGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUVudC5PcmlnaW4uU2V0QWxsKCcgJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3UmVwZWF0ZWQoJyAnLFgsIFksIDQwLCA0LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5DdXJzb3JOZXdMaW5lKDEpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSgxKTtcclxuICAgICAgICAgICAgLy90ZXh0Qm9hcmQuRHJhd19DdXJzb3IodHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UuVG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkRyYXdDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuVHJ5RW5kQW5pbWF0aW9ucygpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuQWR2YW5jZVRpbWUoZGVsdGEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKENhbkFkdmFuY2VHcmFwaGljcygpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBIYXBwSGFuZGxpbmcuSGFuZGxlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ2FuQWR2YW5jZUdyYXBoaWNzKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuaGFwcE1hbmFnZXIuVHJ5SGFuZGxlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9pZiAoQ2FuQWR2YW5jZSgpKVxyXG4gICAgICAgICAgICAvL3tcclxuXHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgRWxlbWVudFRvQXVyYUNvbG9yKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBiYyA9IFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUjtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5GaXJlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5GaXJlQXVyYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkljZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuSWNlQXVyYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLlRodW5kZXJBdXJhO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYmM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBFbGVtZW50VG9Qcm9qQ29sb3IoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGJjID0gQ29sb3JzLmlucHV0S2V5O1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkZpcmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLkZpcmVTaG90O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuSWNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5JY2VBdXJhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuVGh1bmRlckF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBiYztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRCBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKEJhc2VVdGlscy5WZWN0b3IyRCBwb3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgeCA9IHBvcy5YO1xyXG4gICAgICAgICAgICB2YXIgeSA9IHBvcy5ZO1xyXG4gICAgICAgICAgICB2YXIgc2NyZWVuUG9zID0gbmV3IEJhc2VVdGlscy5WZWN0b3IyRCh4ICogZ3JpZFNjYWxlICsgZ3JpZFNjYWxlIC8gMiArIGdyaWRPZmZzZXR4LCAyICogZ3JpZFNjYWxlIC0geSAqIGdyaWRTY2FsZSArIGdyaWRTY2FsZSAvIDIgKyBncmlkT2Zmc2V0eSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzY3JlZW5Qb3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd0NvbnRyb2xzKGludCB5LCBpbnQgeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdHcmlkKHggLSAyLCB5IC0gMSwgMjAsIDE1LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuU2V0Q3Vyc29yQXQoeCwgeSk7XHJcbiAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKFwiQ29udHJvbHNcIiwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuXHJcbiAgICAgICAgICAgIC8vSW5wdXRUYWdzIGlucHV0VGFnID0gSW5wdXRUYWdzLk1PVkVGSVg7XHJcbiAgICAgICAgICAgIGludCB5T2ZmID0gMDtcclxuICAgICAgICAgICAgeU9mZiA9IERyYXdJbnB1dHNfRml4KHksIHgsIElucHV0VGFncy5NT1ZFRklYLCB5T2ZmKTtcclxuICAgICAgICAgICAgLy95T2ZmKys7XHJcbiAgICAgICAgICAgIHlPZmYgPSBEcmF3SW5wdXRzX0ZpeCh5LCB4LCBJbnB1dFRhZ3MuTUlTQywgeU9mZik7XHJcbiAgICAgICAgICAgIC8veU9mZisrO1xyXG4gICAgICAgICAgICAvL3lPZmYgPSBEcmF3SW5wdXRzX0ZpeCh5LCB4LCBJbnB1dFRhZ3MuTU9WRVVORklYLCB5T2ZmKTtcclxuXHJcbiAgICAgICAgICAgIGludCBhdHRhY2tOdW1iZXIgPSAxO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmlucHV0cy5pbnB1dHMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHgyID0geDtcclxuICAgICAgICAgICAgICAgIGludCB5MiA9IHkgKyAyICsgeU9mZjtcclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHR1cm5CYXNlVHJ5LmlucHV0cy5pbnB1dHNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmlucHV0cy5UYWdJcyhpLCBJbnB1dFRhZ3MuTU9WRVVORklYKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB5T2ZmKys7XHJcbiAgICAgICAgICAgICAgICAgICAgeU9mZisrO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB1bmljb2RlID0gJzAnICsgYXR0YWNrTnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFja051bWJlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdXNlSG92ZXIubW91c2VIb3ZlcnMuQWRkKG5ldyBNb3VzZUhvdmVyKG5ldyBSZWN0KHgyIC0gMiwgeTIsIDIwLCAxKSwgMCwgaW5wdXQuYXJnMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKCdbJywgeDIgLSAxLCB5MiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgbGVuZ3RoQm5hbWUgPSBUZXh0Qm9hcmQuRHJhd1VuaWNvZGVMYWJlbCh1bmljb2RlLCB4MiwgeTIsIENvbG9ycy5pbnB1dEtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0NoYXIoJ10nLCB4MiArIGxlbmd0aEJuYW1lLCB5MiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGRlc2NyaXB0aW9uID0gc3RyaW5nLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5Nb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUgbSA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZSlpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlRGVzY3JpcHRpb25zLlRyeUdldFZhbHVlKG0sIG91dCBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXNjcmlwdGlvbiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IG0uVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT0gSW5wdXRUeXBlLk1pc2NCYXR0bGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNaXNjQmF0dGxlSW5wdXQgYXJnMSA9IChNaXNjQmF0dGxlSW5wdXQpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBtaXNjRGVzY3JpcHRpb25zW2FyZzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhkZXNjcmlwdGlvbiwgeDIgKyAyICsgNSwgeTIsIENvbG9ycy5JbnB1dERlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBjID0gbW92ZUNoYXJzW21vdmVdO1xyXG4gICAgICAgICAgICAgICAgLy9EcmF3TW92ZShtb3ZlLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhdyhjLCB4MiArIDMsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd1dpdGhHcmlkKGMrXCJcIiwgeDIsIHkgKyAyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGludCBEcmF3SW5wdXRzX0ZpeChpbnQgeSwgaW50IHgsIElucHV0VGFncyBpbnB1dFRhZywgaW50IHlPZmYpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5pbnB1dHMuaW5wdXRzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCB4MiA9IHg7XHJcbiAgICAgICAgICAgICAgICBpbnQgeTIgPSB5ICsgMiArIHlPZmY7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0dXJuQmFzZVRyeS5pbnB1dHMuaW5wdXRzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5pbnB1dHMuVGFnSXMoaSwgaW5wdXRUYWcpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1bmljb2RlID0gaW5wdXRILkdldEZpeGVkTW92ZVVuaWNvZGUoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBmb3JjZUlucHV0TGFiZWwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBmb3JjZUNvbW1hbmRMYWJlbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVuaWNvZGUgPT0gJ3cnKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2VJbnB1dExhYmVsID0gXCJXQVNEXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmNlQ29tbWFuZExhYmVsID0gXCJcIiArIFVuaWNvZGUuVXBhcnJvdzIgKyBVbmljb2RlLkxlZnRhcnJvdzIgKyBVbmljb2RlLkRvd25hcnJvdzIgKyBVbmljb2RlLlJpZ2h0YXJyb3cyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodW5pY29kZSA9PSAnYScgfHwgdW5pY29kZSA9PSAncycgfHwgdW5pY29kZSA9PSAnZCcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgeU9mZisrO1xyXG4gICAgICAgICAgICAgICAgICAgIHlPZmYrKztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1vdXNlSG92ZXIubW91c2VIb3ZlcnMuQWRkKG5ldyBNb3VzZUhvdmVyKG5ldyBSZWN0KHgyIC0gMiwgeTIsIDIwLCAxKSwgMCwgaW5wdXQuYXJnMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKCdbJywgeDIgLSAxLCB5MiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgbGVuZ3RoQm5hbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JjZUlucHV0TGFiZWwgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoQm5hbWUgPSBUZXh0Qm9hcmQuRHJhd1VuaWNvZGVMYWJlbCh1bmljb2RlLCB4MiwgeTIsIENvbG9ycy5pbnB1dEtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoZm9yY2VJbnB1dExhYmVsLCB4MiwgeTIsIENvbG9ycy5pbnB1dEtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aEJuYW1lID0gZm9yY2VJbnB1dExhYmVsLkxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0NoYXIoJ10nLCB4MiArIGxlbmd0aEJuYW1lLCB5MiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGRlc2NyaXB0aW9uID0gc3RyaW5nLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5Nb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlQ29tbWFuZExhYmVsICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gZm9yY2VDb21tYW5kTGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZSBtID0gKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlKWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlRGVzY3JpcHRpb25zLlRyeUdldFZhbHVlKG0sIG91dCBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IG0uVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5NaXNjQmF0dGxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWlzY0JhdHRsZUlucHV0IGFyZzEgPSAoTWlzY0JhdHRsZUlucHV0KWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gbWlzY0Rlc2NyaXB0aW9uc1thcmcxXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoZGVzY3JpcHRpb24sIHgyICsgMiArIDUsIHkyLCBDb2xvcnMuSW5wdXREZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgYyA9IG1vdmVDaGFyc1ttb3ZlXTtcclxuICAgICAgICAgICAgICAgIC8vRHJhd01vdmUobW92ZSwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXcoYywgeDIgKyAzLCB5MiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdXaXRoR3JpZChjK1wiXCIsIHgyLCB5ICsgMiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHlPZmY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd0xpZmUoaW50IHR1cm5PcmRlclgsIGludCB0dXJuT3JkZXJZKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0dyaWQodHVybk9yZGVyWCAtIDEsIHR1cm5PcmRlclkgLSAxLCAyMCwgOSwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHR1cm5PcmRlclggKyAxLCB0dXJuT3JkZXJZKTtcclxuICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihcIkxpZmVcIiwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHR1cm5PcmRlclggKyA4LCB0dXJuT3JkZXJZKTtcclxuICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihcIkVsZW1lbnRcIiwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuICAgICAgICAgICAgaW50IGluZGV4ID0gLTE7IC8vdXNpbmcgdGhpcyBiZWNhdXNlIG5vdCBhbGwgdW5pdHMgZ2V0IGRyYXduXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGUgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmICghZS5kcmF3TGlmZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghZS5EZWFkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IGNvbG9yID0gQ29sb3JzLkhlcm9UdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBDb2xvcnMuRW5lbXlUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihlLmVsZW1lbnQgIT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IEVsZW1lbnRUb0F1cmFDb2xvcihlLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdPbmVEaWdpdF9DdXJzb3IoKGludCllLmxpZmUuVmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeE9mZiA9IHR1cm5PcmRlclggKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB5T2ZmID0gdHVybk9yZGVyWSArIDIgKyBpbmRleCAqIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9EcmF3RW50aXR5Q2hhcihlLCBjb2xvciwgeE9mZiwgeU9mZik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0NoYXIoR2V0Q2hhcihlKSwgeE9mZiwgdHVybk9yZGVyWSArIDIsIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1R3b0RpZ2l0cygoaW50KWUubGlmZSwgeE9mZiwgeU9mZiwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBlbGVtZW50ID0gc3RyaW5nLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZS5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkZpcmU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gXCJGaXJlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkljZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBcIkljZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IFwiVGh1bmRlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVDb2xvciA9IEVsZW1lbnRUb0F1cmFDb2xvcihlLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhlbGVtZW50LCB4T2ZmICsgNywgeU9mZiwgZUNvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3T25lRGlnaXRfQ3Vyc29yKChpbnQpZS5saWZlLlZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSh4OiAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdUdXJuT3JkZXIoaW50IHR1cm5PcmRlclgsIGludCB0dXJuT3JkZXJZLCBib29sIGhvcml6b250YWwgPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmFsdWUgdHVybnNQZXJQaGFzZSA9IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2U7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh0dXJuT3JkZXJYICsgMywgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJDb21tYW5kc1wiLCBDb2xvcnMuV2luZG93TGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgaW50IGRyYXdpbmdJZCA9IC0xO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBlID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuZHJhd1R1cm4pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuRGVhZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3aW5nSWQrKztcclxuICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3IgPSBDb2xvcnMuSGVyb1R1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IENvbG9ycy5FbmVteVR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmVsZW1lbnQgIT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IEVsZW1lbnRUb0F1cmFDb2xvcihlLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3T25lRGlnaXRfQ3Vyc29yKChpbnQpZS5saWZlLlZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHhPZmYgPSB0dXJuT3JkZXJYICsgMSArIGRyYXdpbmdJZCAqIDM7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHlFbnRpdHkgPSB0dXJuT3JkZXJZICsgMjtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeUZpcnN0TW92ZSA9IHR1cm5PcmRlclkgKyAzO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4Rmlyc3RNb3ZlID0geE9mZjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaG9yaXpvbnRhbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhPZmYgPSB0dXJuT3JkZXJYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5RW50aXR5ID0gdHVybk9yZGVyWSArIDIgKyBkcmF3aW5nSWQgKiAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5Rmlyc3RNb3ZlID0geUVudGl0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeEZpcnN0TW92ZSA9IHR1cm5PcmRlclggKyAzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBEcmF3RW50aXR5Q2hhcihlLCBjb2xvciwgeE9mZiwgeUVudGl0eSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh4Rmlyc3RNb3ZlLCB5Rmlyc3RNb3ZlKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpMiA9IDA7IGkyIDwgdHVybnNQZXJQaGFzZTsgaTIrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBjb2xvcjIgPSBjb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGJhY2tDb2xvciA9IENvbG9ycy5CYWNrQ29tbWFuZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlID09IEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkcmF3aW5nSWQgPT0gdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5ICYmIGkyID09IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnR1cm4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbG9yMiA9IENvbG9ycy5IZXJvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja0NvbG9yID0gQ29sb3JzLkJhY2tCYXR0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IyID0gQ29sb3JzLklucHV0RGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpMiA8IHR1cm5zUGVyUGhhc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBjID0gR2V0Q2hhck9mTW92ZShlLCBpMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUhvdmVyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgUmVjdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLkxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLCBlLm1vdmVzW2kyXSkpOyAvL2FkZCBoZXJlLi4uPyBAX0BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKGMsIGNvbG9yMiwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChob3Jpem9udGFsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSBjLkxlbmd0aDsgaiA8IDM7IGorKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5BZHZhbmNlQ3Vyc29yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd19DdXJzb3IoJyAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcignICcsIGNvbG9yLCBDb2xvcnMuQmFja0NvbW1hbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChob3Jpem9udGFsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoeDogeEZpcnN0TW92ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoeDogMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3RW50aXR5Q2hhcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZSwgaW50IGNvbG9yLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjaGFyW10gY2hhcnMgPSBHZXRDaGFyKGUpO1xyXG5cclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoY2hhcnMsIHgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgaWYgKGUuZ3JhcGhpY1JlcGVhdGVkSW5kZXggPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd09uZURpZ2l0KGUuZ3JhcGhpY1JlcGVhdGVkSW5kZXggKyAxLCB4ICsgY2hhcnMuTGVuZ3RoLCB5LCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIEdldENoYXJPZk1vdmUoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZSwgaW50IGkyKVxyXG4gICAgICAgIHtcclxuXHJcblxyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSBlLm1vdmVzW2kyXTtcclxuICAgICAgICAgICAgaWYgKHZhbCA+PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdmVDaGFyc1soQmF0dGxlTWFpbi5Nb3ZlVHlwZSl2YWxdO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIgXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2hhcltdIEdldENoYXIoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZ2FtZUVudGl0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRpdGllc0NoYXJzW2dhbWVFbnRpdHkuZ3JhcGhpY107XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdNb3ZlKFZhbHVlIG1vdmUsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChtb3ZlLlZhbCA+PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLk1vdmVUeXBlIG0gPSAoQmF0dGxlTWFpbi5Nb3ZlVHlwZSltb3ZlLlZhbDtcclxuICAgICAgICAgICAgICAgIERyYXdNb3ZlKG0sIGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcignICcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdNb3ZlKEJhdHRsZU1haW4uTW92ZVR5cGUgbW92ZSwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGMgPSBtb3ZlQ2hhcnNbbW92ZV07XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihjLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUZXh0Qm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGNsYXNzIENvbG9yc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBHcmlkSGVybyA9IDE7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgR3JpZEVuZW15ID0gMjtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBIZXJvID0gMztcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBFbmVteSA9IDQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgSGVyb1R1cm4gPSA1O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEVuZW15VHVybiA9IDY7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgaW5wdXRLZXkgPSA3O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEJvYXJkID0gODtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBXaW5kb3dMYWJlbCA9IDk7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgRmlyZUF1cmEgPSAxMDtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBJY2VBdXJhID0gMTE7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgVGh1bmRlckF1cmEgPSAxMjtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBGaXJlU2hvdCA9IDEzO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEljZVNob3QgPSAxNDtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBUaHVuZGVyU2hvdCA9IDE1O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEJhY2tncm91bmRJbnB1dCA9IDE2O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IElucHV0RGVzY3JpcHRpb24gPSAxNztcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBCYWNrQmF0dGxlID0gMTg7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgQmFja0NvbW1hbmQgPSAxOTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIElucHV0S2V5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOT05FLCBMRUZULCBSSUdIVCwgRE9XTiwgVVAsIEZJUkUsIFJFRE8sIERPTkUsXHJcbiAgICAgICAgICAgIElDRSxcclxuICAgICAgICAgICAgVEhVTkRFUixcclxuICAgICAgICAgICAgTk9STUFMU0hPVFxyXG4gICAgICAgIH1cclxuXG5cclxuXHJcbiAgICBcbnByaXZhdGUgaW50IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19JbnB1dFVuaWNvZGU9LTE7fVxyXG5cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuO1xyXG51c2luZyBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmc7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBHYW1lTWFpbiA6IElUZXh0U2NyZWVuX1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgQmF0dGxlTWFpbiBiYXR0bGVNYWluO1xyXG4gICAgICAgIHByaXZhdGUgQmF0dGxlUmVuZGVyIGJhdHRsZVJlbmRlcjtcclxuICAgICAgICBwcml2YXRlIE1vZGVTZWxlY3Rpb25TY3JlZW4gbW9kZVNlbGVjdGlvblNjcmVlbjtcclxuICAgICAgICBJVGV4dFNjcmVlbl8gbWFpbkRyYXc7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXN1bHRTY3JlZW4gcmVzdWx0U2NyZWVuO1xyXG4gICAgICAgIC8vSVRleHRTY3JlZW5bXSBzY3JlZW5zID0gbmV3IElUZXh0U2NyZWVuWzVdO1xyXG4gICAgICAgIGludCBzdGFnZUlkO1xyXG4gICAgICAgIGludFtdIGVuZW15QW1vdW50ID0gbmV3IGludFtdICAgeyAxLCAxLCAyLCAxLCAyLCAzLCAyLCAzLCAxLCAyLCAzLCAzIH07XHJcbiAgICAgICAgaW50W10gdHVybkFtb3VudCA9IG5ldyBpbnRbXSB7IDIsIDQsIDIsIDYsIDQsIDIsIDYsIDQsIDgsIDgsIDYsIDggfTtcclxuICAgICAgICBwcml2YXRlIE1vdXNlSG92ZXJUZXh0IG1vdXNlSG92ZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBHYW1lTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuID0gbmV3IE1vZGVTZWxlY3Rpb25TY3JlZW4oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFJlc2V0KCk7XHJcbiAgICAgICAgICAgIG1vZGVTZWxlY3Rpb25TY3JlZW4ubW9kZSA9IDE7XHJcbiAgICAgICAgICAgIG1vZGVTZWxlY3Rpb25TY3JlZW4ud2FubmFMZWF2ZSA9IDE7XHJcbiAgICAgICAgICAgIG1haW5EcmF3ID0gbW9kZVNlbGVjdGlvblNjcmVlbjtcclxuICAgICAgICAgICAgLy9SZXNldCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGludCBtb2RlID0gbW9kZVNlbGVjdGlvblNjcmVlbi5tb2RlO1xyXG4gICAgICAgICAgICBib29sIHRpbWVBdHRhY2sgPSBtb2RlU2VsZWN0aW9uU2NyZWVuLnRpbWVBdHRhY2s7XHJcblxyXG4gICAgICAgICAgICB2YXIgZWNzID0gRUNTTWFuYWdlci5DcmVhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIFN0YWdlRGF0YUNyZWF0b3Igc2RjID0gbmV3IFN0YWdlRGF0YUNyZWF0b3IoZWNzKTtcclxuICAgICAgICAgICAgdmFyIHN0YWdlcyA9IGVjcy5RdWlja0FjY2Vzc29yMTxTdGFnZURhdGE+KCk7XHJcbiAgICAgICAgICAgIC8vdmFyIHN0YWdlcyA9IHNkYy5zdGFnZXM7XHJcblxyXG4gICAgICAgICAgICBpbnQgZCA9IHN0YWdlSWQ7XHJcbiAgICAgICAgICAgIGlmIChzdGFnZXMuQ291bnQgPD0gZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyYXcgPSBtb2RlU2VsZWN0aW9uU2NyZWVuO1xyXG4gICAgICAgICAgICAgICAgbW9kZVNlbGVjdGlvblNjcmVlbi5SZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgc3RhZ2VJZCA9IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9kID0gMjAwO1xyXG4gICAgICAgICAgICBpZiAoZCA+PSBlbmVteUFtb3VudC5MZW5ndGgpIGQgPSBlbmVteUFtb3VudC5MZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBpbnQgbkVuZW1pZXMgPSBlbmVteUFtb3VudFtkXTtcclxuXHJcbiAgICAgICAgICAgIEJhdHRsZVNldHVwIGJhdHRsZVNldHVwID0gbmV3IEJhdHRsZVNldHVwKG1vZGUsIHN0YWdlSWQsIGVjcyk7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4gPSBiYXR0bGVTZXR1cC5iYXR0bGVNYWluO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBzID0gbmV3IFByZXZpZXdTeXN0ZW0oZWNzLCBiYXR0bGVNYWluKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9lY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChuZXcgRW5lbXlTcGF3bkRhdGEoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSkpO1xyXG4gICAgICAgICAgICAvL2Vjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG5ldyBFbmVteVNwYXduRGF0YSgxLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgZmxvYXQgdGltZVRvQ2hvb3NlID0gLTE7XHJcbiAgICAgICAgICAgIGlmICh0aW1lQXR0YWNrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lVG9DaG9vc2UgPSAoNWYgKiB0dXJuQW1vdW50W2RdKSAqIG5FbmVtaWVzO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmF0dGxlTWFpbi50aW1lVG9DaG9vc2VNYXggPSB0aW1lVG9DaG9vc2U7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uSW5pdCgpO1xyXG4gICAgICAgICAgICBiYXR0bGVSZW5kZXIgPSBuZXcgQmF0dGxlUmVuZGVyKGJhdHRsZU1haW4sIHN0YWdlRGF0YTpzdGFnZXMuQ29tcDEoc3RhZ2VJZCksIFByZXZpZXdTeXN0ZW06cHMpO1xyXG4gICAgICAgICAgICBuZXcgSGFwcEhhbmRsaW5nKGJhdHRsZVJlbmRlciwgYmF0dGxlU2V0dXApO1xyXG4gICAgICAgICAgICBtYWluRHJhdyA9IGJhdHRsZVJlbmRlcjtcclxuICAgICAgICAgICAgcmVzdWx0U2NyZWVuID0gbmV3IFJlc3VsdFNjcmVlbigpO1xyXG4gICAgICAgICAgICByZXN1bHRTY3JlZW4uYmF0dGxlUmVzdWx0ID0gYmF0dGxlTWFpbi5iYXR0bGVSZXN1bHQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBNb3VzZUhvdmVyTWFuYWdlciBob3Zlck1hbmFnZXIgPSBuZXcgTW91c2VIb3Zlck1hbmFnZXIoTW91c2UpO1xyXG4gICAgICAgICAgICBob3Zlck1hbmFnZXIubW91c2VIb3ZlcnMuQWRkKG5ldyBNb3VzZUhvdmVyKG5ldyBCYXNlVXRpbHMuUmVjdCg1LDUsNSw1KSwgMCwwKSk7XHJcbiAgICAgICAgICAgIG1vdXNlSG92ZXIgPSBuZXcgTW91c2VIb3ZlclRleHQoaG92ZXJNYW5hZ2VyLCBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldEZyZWVFbnRpdHkoNTAsIDEpKTtcclxuXHJcbiAgICAgICAgICAgIGJhdHRsZVJlbmRlci5tb3VzZUhvdmVyID0gaG92ZXJNYW5hZ2VyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dCB7IHNldCB7IG1haW5EcmF3LklucHV0ID0gdmFsdWU7IH0gZ2V0IHsgcmV0dXJuICdjJzsgfSB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQgeyB2YWx1ZSA9IHJlbWFwLlJlbWFwKHZhbHVlKTsgbWFpbkRyYXcuSW5wdXRVbmljb2RlID0gdmFsdWU7IH0gZ2V0IHsgcmV0dXJuICdjJzsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIE1vdXNlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBVbmljb2RlUmVtYXAgcmVtYXAgPSBuZXcgVW5pY29kZVJlbWFwKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdXNlSG92ZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIG1haW5EcmF3LkRyYXcoZik7XHJcbiAgICAgICAgICAgIG1haW5EcmF3Lk1vdXNlID0gTW91c2U7XHJcbiAgICAgICAgICAgIGlmIChtYWluRHJhdyA9PSBiYXR0bGVSZW5kZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChiYXR0bGVNYWluLklzT3ZlcigpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXR0bGVNYWluLklzVmljdG9yeSgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhZ2VJZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRTY3JlZW4uRW50ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYWluRHJhdyA9IHJlc3VsdFNjcmVlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWFpbkRyYXcgPT0gcmVzdWx0U2NyZWVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0U2NyZWVuLndhbm5hTGVhdmUgPT0gMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtYWluRHJhdyA9PSBtb2RlU2VsZWN0aW9uU2NyZWVuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9kZVNlbGVjdGlvblNjcmVlbi53YW5uYUxlYXZlID09IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1haW5EcmF3LkdldEJvYXJkKCk7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgTW91c2VJTyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fTW91c2U9bmV3IE1vdXNlSU8oKTt9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW47XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFJlc3VsdFNjcmVlbiA6IElUZXh0U2NyZWVuX1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuICAgICAgICBzdHJpbmcgeW91V2luID0gXCJZb3UgV2luXCI7XHJcbiAgICAgICAgcHVibGljIE1vdXNlSU8gTW91c2UgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHN0cmluZyB5b3VMb3NlID0gXCJZb3UgbG9zZVwiO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVSZXN1bHQgYmF0dGxlUmVzdWx0O1xyXG4gICAgICAgIHB1YmxpYyBSZXN1bHRTY3JlZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuSW5pdCg3MCwgMjUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IHdhbm5hTGVhdmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXQgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyBnZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRW50ZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2FubmFMZWF2ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KGZsb2F0IGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoSW5wdXRVbmljb2RlID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2FubmFMZWF2ZSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RyaW5nIG1lc3NhZ2UgPSB5b3VXaW47XHJcbiAgICAgICAgICAgIGlmIChiYXR0bGVSZXN1bHQucmVzdWx0ID09IDIpIG1lc3NhZ2UgPSB5b3VMb3NlO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihtZXNzYWdlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZXN0R2FtZSA6IElUZXh0R2FtZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBUZXh0U2NyZWVuSG9sZGVyIFNjcmVlbkhvbGRlciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUgR2V0UGFsZXR0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRGVmYXVsdFBhbGV0dGVzLkM0Tm92ZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRTY3JlZW5OIHNjcmVlbiA9IG5ldyBUZXN0U2NyZWVuKCk7XHJcbiAgICAgICAgICAgIFNjcmVlbkhvbGRlci5TZXRBbGwoc2NyZWVuKTtcclxuICAgICAgICAgICAgc2NyZWVuLkluaXQodywgaCk7XHJcbiAgICAgICAgICAgIHNjcmVlbi5HZXRCb2FyZCgpLkRyYXcoXCJUZXN0XCIsIDAsMCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBUZXh0U2NyZWVuSG9sZGVyIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19TY3JlZW5Ib2xkZXI9bmV3IFRleHRTY3JlZW5Ib2xkZXIoKTt9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRlc3RTY3JlZW4gOiBUZXh0U2NyZWVuTlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW47XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1vZGVTZWxlY3Rpb25TY3JlZW4gOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcbiAgICAgICAgc3RyaW5nIHlvdVdpbiA9IFwiWW91IFdpblwiO1xyXG4gICAgICAgIHN0cmluZyB5b3VMb3NlID0gXCJZb3UgbG9zZVwiO1xyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIE1vdXNlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBpbnQgc2VsZWN0aW9uO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVSZXN1bHQgYmF0dGxlUmVzdWx0O1xyXG4gICAgICAgIHB1YmxpYyBNb2RlU2VsZWN0aW9uU2NyZWVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZCA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkluaXQoNzAsIDI1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGludCB3YW5uYUxlYXZlO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgbW9kZTtcclxuICAgICAgICBwdWJsaWMgYm9vbCB0aW1lQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgcHVibGljIGludCBzY3JlZW5TdGFnZTtcclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dCB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFbnRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3YW5uYUxlYXZlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuUmVzZXQoKTtcclxuICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleSBpayA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5KSBJbnB1dDtcclxuICAgICAgICAgICAgbW9kZSA9IC0xO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXcoXCJQcm9nQmF0dGxlIFByb3RvdHlwZSB2MC4zXCIsIDEsIDEsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3KFwiQSBnYW1lIGJ5IFBpZHJvaFwiLCAxLCAyLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgIGlmIChzY3JlZW5TdGFnZSA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGlrKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuTEVGVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NyZWVuU3RhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5SSUdIVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NyZWVuU3RhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXR0YWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkRPV046XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVBdHRhY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LlVQOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUF0dGFjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3ddIFZhbmlsbGFcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDQsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIlthXSBFbGVtZW50YWxcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDUsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIltzXSBWYW5pbGxhIFRpbWUgQXR0YWNrXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA2LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbZF0gRWxlbWVudGFsIFRpbWUgQXR0YWNrXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA3LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzY3JlZW5TdGFnZSA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWsgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5VUClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpayA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkRPV04pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuU3RhZ2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJFbGVtZW50YWwgTW9kZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogLTUpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJGaXJlIGJlYXRzIEljZSwgSWNlIGJlYXRzIFRodW5kZXIsIFRodW5kZXIgYmVhdHMgZmlyZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogLTIpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJTYW1lIGVsZW1lbnQgPSBubyBkYW1hZ2VcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDApO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJJdCBpcyBiZXN0IHRvIGhhdmUgaGFkIHNvbWUgZXhwZXJpZW5jZSB3aXRoIHZhbmlsbGEgbW9kZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogMSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIlt3XSBTdGFydCBFbGVtZW50YWwgTW9kZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNCwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3NdIEdvIGJhY2tcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDUsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZSA+PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3YW5uYUxlYXZlID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy9zdHJpbmcgbWVzc2FnZSA9IHlvdVdpbjtcclxuICAgICAgICAgICAgLy9pZiAoYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAyKSBtZXNzYWdlID0geW91TG9zZTtcclxuICAgICAgICAgICAgLy90ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihtZXNzYWdlLCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlID0gLTE7XHJcbiAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmxpbmtBbmltIDogVGV4dEFuaW1hdGlvbjxCbGlua0FuaW0uQmxpbmtEYXRhPlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgQmxpbmtEYXRhIG1haW5EYXRhLCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Nb2RpZnkoZW50aXR5LCBtYWluRGF0YSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgICAgIGZsb2F0IGF1eCA9IHByb2dyZXNzO1xyXG4gICAgICAgICAgICBib29sIGJsaW5rID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2hpbGUgKHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChibGluaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXggLT0gbWFpbkRhdGEuYmxpbmtBY3RpdmVUaW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eCAtPSBtYWluRGF0YS5ibGlua0luYWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGF1eCA8IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxpbmsgPSAhYmxpbms7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFibGluaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1haW5EYXRhLmNoYW5nZUludmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBlbnRpdHkuQW5pbWF0aW9uLlNldEFsbChtYWluRGF0YS50ZXh0LCBtYWluRGF0YS50ZXh0Q29sb3IsIG1haW5EYXRhLmJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbnRpdHkuQW5pbWF0aW9uLlNldEFsbElmVmlzaWJsZShtYWluRGF0YS50ZXh0LCBtYWluRGF0YS50ZXh0Q29sb3IsIG1haW5EYXRhLmJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgQmxpbmtEYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY2hhciB0ZXh0O1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGJhY2tDb2xvciwgdGV4dENvbG9yO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgYmxpbmtBY3RpdmVUaW1lO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgYmxpbmtJbmFjdGl2ZTtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvb2wgY2hhbmdlSW52aXNpYmxlO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEJsaW5rRGF0YShjaGFyIHRleHQsIGludCBiYWNrQ29sb3IsIGludCB0ZXh0Q29sb3IsIGZsb2F0IGJsaW5rQWN0aXZlVGltZSwgZmxvYXQgYmxpbmtJbmFjdGl2ZSwgYm9vbCBjaGFuZ2VOb0NoYW5nZUNvbG9yID0gdHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFja0NvbG9yID0gYmFja0NvbG9yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29sb3IgPSB0ZXh0Q29sb3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsaW5rQWN0aXZlVGltZSA9IGJsaW5rQWN0aXZlVGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxpbmtJbmFjdGl2ZSA9IGJsaW5rSW5hY3RpdmU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUludmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgQmxpbmtEYXRhIEJhY2tDb2xvcihpbnQgYmFja0NvbG9yLCBmbG9hdCBibGlua0R1cmF0aW9uLCBib29sIGNoYW5nZU5vQ2hhbmdlQ29sb3IgPSB0cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJsaW5rRGF0YShUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBiYWNrQ29sb3IsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBibGlua0R1cmF0aW9uLCBibGlua0R1cmF0aW9uLCBjaGFuZ2VOb0NoYW5nZUNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBCbGlua0RhdGEgRnJvbnRDb2xvcihpbnQgZnJvbnRDb2xvciwgZmxvYXQgYmxpbmtEdXJhdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCbGlua0RhdGEoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIGZyb250Q29sb3IsICBibGlua0R1cmF0aW9uLCBibGlua0R1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBCbGlua0RhdGEgQ2hhcihjaGFyIGMsIGZsb2F0IGJsaW5rRHVyYXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmxpbmtEYXRhKGMsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgYmxpbmtEdXJhdGlvbiwgYmxpbmtEdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDaGFyQnlDaGFyQW5pbWF0aW9uIDogVGV4dEFuaW1hdGlvbjxDaGFyQnlDaGFyQW5pbWF0aW9uLkNoYXJCeUNoYXJEYXRhPlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgQ2hhckJ5Q2hhckRhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgZmxvYXQgcmF0aW8gPSBwcm9ncmVzcyAvIGxlbmd0aDtcclxuICAgICAgICAgICAgZmxvYXQgbGVuZ3RoVGV4dCA9IG1haW5EYXRhLmNoYXJFbmQgLSBtYWluRGF0YS5jaGFyU3RhcnQ7XHJcbiAgICAgICAgICAgIGludCBsaW5lQnJlYWtzID0gMDtcclxuICAgICAgICAgICAgaW50IG9mZnNldGVkUGVybSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSBtYWluRGF0YS5jaGFyU3RhcnQ7IGkgPCBtYWluRGF0YS5jaGFyRW5kOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBvZmZzZXRlZCA9IGkgKyBvZmZzZXRlZFBlcm07XHJcbiAgICAgICAgICAgICAgICBpbnQgbGluZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGIgPSBlbnRpdHkuQW5pbWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG9mZnNldGVkID49IHRiLldpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmUrKztcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRlZCAtPSB0Yi5XaWR0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChlbnRpdHkuT3JpZ2luLkNoYXJBdChvZmZzZXRlZCwgbGluZSArIGxpbmVCcmVha3MpID09ICdcXG4nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVCcmVha3MrKztcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRlZFBlcm0gLT0gb2Zmc2V0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPiAoKGxlbmd0aFRleHQgKiByYXRpbykgKyBtYWluRGF0YS5jaGFyU3RhcnQpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRiLkRyYXdDaGFyKCcgJywgb2Zmc2V0ZWQsIGxpbmUgKyBsaW5lQnJlYWtzKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RiLkRyYXcoXCJcIiArIGksIDYsIDUsIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBDaGFyQnlDaGFyRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50ZXJuYWwgaW50IGNoYXJTdGFydDtcclxuICAgICAgICAgICAgaW50ZXJuYWwgaW50IGNoYXJFbmQ7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQ2hhckJ5Q2hhckRhdGEoaW50IGNoYXJTdGFydCwgaW50IGNoYXJFbmQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhclN0YXJ0ID0gY2hhclN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFyRW5kID0gY2hhckVuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
