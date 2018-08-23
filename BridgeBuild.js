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

            document.onkeydown = Bridge.fn.combine(document.onkeydown, function (a) {
                if (a.keyCode >= 37 && a.keyCode <= 40) {
                    BridgeBuild.App.Handle(a);
                    a.preventDefault();
                }
                //Console.WriteLine("KD" + a.KeyCode);
                //Console.WriteLine("KD"+a.CharCode);

                //Console.Write(unicode);
                //buffer = a.CharCode;

            });


            document.onkeypress = Bridge.fn.combine(document.onkeypress, function (a) {
                if (a.keyCode >= 37 && a.keyCode <= 40) {
                    return;
                }
                //Console.WriteLine(a.KeyCode);
                BridgeBuild.App.Handle(a);
                a.preventDefault();

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
                Handle: function (a) {
                    var code = a.keyCode;
                    if (code === 0) {
                        code = a.charCode;
                    }
                    var unicode = code;
                    BridgeBuild.App.bufferUnicode = unicode;

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
                AsciiGridDownRightLeft: 0,
                Escape: 0
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
                    this.Escape = 27;
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
                DownFire: 12
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
                BackCommand: 0,
                BackStripe: 0
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
                    this.BackStripe = 20;
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
            ctor: function (mode, stageEntity, ecs) {
                var $t, $t1;
                this.$initialize();
                this.ecs = ecs;
                this.timeStamp = new Pidroh.BaseUtils.TimeStamp();
                ecs.CreateEntityWithComponent(this.timeStamp);
                this.battleMain = new Pidroh.ConsoleApp.Turnbased.BattleMain(mode, ecs, this.timeStamp);
                this.moveCreator = new Pidroh.ConsoleApp.Turnbased.MoveCreatorProg(ecs);


                var stages = ecs.QuickAccessor1(Pidroh.ConsoleApp.Turnbased.StageData);

                var fixedAttack = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.FixedAttackStage, stageEntity);
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
                    //playerHandPool.Add(BattleMain.MoveType.Fire);
                    playerHandPool.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice);
                    //playerHandPool.Add(BattleMain.MoveType.Ice);
                    playerHandPool.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder);
                    //playerHandPool.Add(BattleMain.MoveType.Thunder);
                    //playerHandPool.Add(BattleMain.MoveType.IceBomb);
                    //playerHandPool.Add(BattleMain.MoveType.ThunderBomb);
                    //playerHandPool.Add(BattleMain.MoveType.DownFire);
                }
                var stage = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.StageData, stageEntity);
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
                    this.colors = System.Array.init(25, null, System.String);
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

                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackStripe, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#1A140D";
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

    Bridge.define("Pidroh.ConsoleApp.Turnbased.DeckManager", {
        fields: {
            decks: null,
            discards: null,
            decksOk: null,
            selection: null,
            decksNotEmpty: null
        },
        ctors: {
            init: function () {
                this.decks = System.Array.init(3, null, System.Collections.Generic.List$1(System.Int32));
                this.discards = System.Array.init(3, null, System.Collections.Generic.List$1(System.Int32));
                this.decksOk = System.Array.init(3, false, System.Boolean);
                this.selection = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                this.decksNotEmpty = new (System.Collections.Generic.List$1(System.Int32)).ctor();
            },
            ctor: function () {
                this.$initialize();
                for (var i = 0; i < this.decks.length; i = (i + 1) | 0) {
                    this.decks[System.Array.index(i, this.decks)] = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                }
            }
        },
        methods: {
            Refresh: function () {
                this.RefreshDeckEmpty();
                for (var i = 0; i < this.decks.length; i = (i + 1) | 0) {
                    this.decksOk[System.Array.index(i, this.decksOk)] = false;
                    if (this.decks[System.Array.index(i, this.decks)].Count === 0) {
                        this.decksOk[System.Array.index(i, this.decksOk)] = true;
                    } else {
                        for (var j = 0; j < this.decks[System.Array.index(i, this.decks)].Count; j = (j + 1) | 0) {
                            if (this.selection.contains(this.decks[System.Array.index(i, this.decks)].getItem(j))) {
                                this.decksOk[System.Array.index(i, this.decksOk)] = true;
                                break;
                            }
                        }
                    }


                }
                for (var i1 = 0; i1 < this.selection.Count; i1 = (i1 + 1) | 0) {
                    var added = false;
                    for (var j1 = 0; j1 < this.decksOk.length; j1 = (j1 + 1) | 0) {
                        if (!this.decksOk[System.Array.index(j1, this.decksOk)]) {
                            this.decksOk[System.Array.index(j1, this.decksOk)] = true;
                            added = true;
                            var move = this.Draw(j1);
                            this.selection.setItem(i1, move);
                            this.RefreshDeckEmpty();
                            break;
                        }
                    }
                    if (!added) {
                        if (this.decksNotEmpty.Count > 0) {
                            var deck = Pidroh.BaseUtils.Extensions.RandomElement(System.Int32, this.decksNotEmpty);
                            var move1 = this.Draw(deck);
                            this.selection.setItem(i1, move1);
                            this.RefreshDeckEmpty();
                        }
                    }
                }
            },
            Draw: function (deckId) {
                var move = Pidroh.BaseUtils.Extensions.RandomElement(System.Int32, this.decks[System.Array.index(deckId, this.decks)]);
                this.decks[System.Array.index(deckId, this.decks)].remove(move);
                return move;
            },
            RefreshDeckEmpty: function () {
                this.decksNotEmpty.clear();
                for (var i = 0; i < this.decks.length; i = (i + 1) | 0) {
                    if (this.decks[System.Array.index(i, this.decks)].Count > 0) {
                        this.decksNotEmpty.add(i);
                    }
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
                this.AddEnemy(this.Actions([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DownFire, Pidroh.ConsoleApp.Turnbased.SpecialEnemyMoves.SmartMove, Pidroh.ConsoleApp.Turnbased.SpecialEnemyMoves.SmartMove]), 5, "K");
                this.AddEnemy(this.Actions([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, "Summon", Pidroh.ConsoleApp.Turnbased.SpecialEnemyMoves.SmartMove, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, Pidroh.ConsoleApp.Turnbased.SpecialEnemyMoves.SmartMove, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.SpecialEnemyMoves.SmartMove]), 45, "$");
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
            ecs: null,
            currentGroup: null
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

                var trainingGroup = new Pidroh.ConsoleApp.Turnbased.StageDataGroup();
                this.currentGroup = trainingGroup;
                this.AddGroup(trainingGroup);

                this.AddStage([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(0, 0)), this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(2, 2))]).HideLifeUI(), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.ctor()]);

                this.AddStage([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1(new Pidroh.ConsoleApp.Turnbased.BattleConfig.$ctor1(false), [this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(2, 1)), this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(0, 2)), this.Enemy(4, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]).HideLifeUI(), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.ctor()]);
                this.AddStage([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1(new Pidroh.ConsoleApp.Turnbased.BattleConfig.$ctor1(false), [this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(2, 2)), this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(1, 2)), this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(0, 2)), this.Enemy(5, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 2))]), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.ctor()]);
                this.AddStage([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(6, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 0))]), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire)]);
                this.AddStage([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(4, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1))]), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire)]);
                this.AddStage([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(5, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1))]), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire)]);
                this.AddStage([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(5, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1)), this.Enemy(7, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 0))]), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.$ctor2([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder])]);

                this.Add([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(0, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 0)), this.Enemy(0, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 2))])]);

                this.currentGroup = new Pidroh.ConsoleApp.Turnbased.StageDataGroup();
                this.AddGroup(this.currentGroup);

                this.Add([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(1, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 2)), this.Enemy(2, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]), new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(0, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1)), this.Enemy(1, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]), new Pidroh.ConsoleApp.Turnbased.StageData.$ctor2([this.Enemy(0, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 2)), this.Enemy(2, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 1)), this.Enemy(2, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]), new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1(new Pidroh.ConsoleApp.Turnbased.BattleConfig.$ctor2(System.Array.init([1], System.Int32)), [this.Enemy(3, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1))])]);
                //currentGroup = new StageDataGroup();
                //AddGroup(currentGroup);

                //AddStage(new StageData(
                //        new BattleConfig(new int[] { 8 }),
                //        Enemy(9, new BaseUtils.Vector2D(4, 1))
                //    ));


            }
        },
        methods: {
            AddStage: function (comps) {
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
                this.currentGroup.stageDataIds.add(e);
            },
            AddGroup: function (group) {

                var e = this.ecs.CreateEntity();
                Pidroh.ECS.ExtensionMethods.AddComponent$1(e, group);
            },
            Pickup: function (v, vector2D) {
                return new Pidroh.ConsoleApp.Turnbased.SpawnData.$ctor1(v, vector2D.$clone(), Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.pickup);
            },
            Enemy: function (v, vector2D) {
                return new Pidroh.ConsoleApp.Turnbased.SpawnData.$ctor1(v, vector2D.$clone(), Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy);
            },
            Add: function (stageData1) {
                var $t;
                if (stageData1 === void 0) { stageData1 = []; }
                $t = Bridge.getEnumerator(stageData1);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;

                        this.currentGroup.stageDataIds.add(this.ecs.CreateEntityWithComponent(item));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }//stages.AddRange(stageData1);
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.StageDataGroup", {
        fields: {
            stageDataIds: null
        },
        ctors: {
            init: function () {
                this.stageDataIds = new (System.Collections.Generic.List$1(Pidroh.ECS.Entity)).ctor();
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
            Draw_Cursor_SmartLineBreak$1: function (v, color, offStart, offEnd, xNewline) {
                if (xNewline === void 0) { xNewline = 0; }

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
                        this.CursorNewLine(xNewline);
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
                        //entity.Origin.Draw(text, 0, 0, 2, BattleRender.Colors.BackBattle);
                        this.entity.Origin.SetCursorAt(0, 0);
                        this.entity.Origin.Draw_Cursor_SmartLineBreak(text, 2);

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
                },
                DrawInput: function (x2, y2, keyUnicode, description, TextBoard) {
                    var x3 = Pidroh.ConsoleApp.Turnbased.BattleRender.DrawInpCommon(x2, y2, description, TextBoard);

                    TextBoard.DrawUnicodeLabel(keyUnicode, x3, y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey);
                    //TextBoard.DrawRect(TextBoard.NOCHANGECHAR, barx, y2, 6+x3-barx, 1, TextBoard.NOCHANGECOLOR, Colors.BackBattle);
                    //TextBoard.DrawRect(TextBoard.NOCHANGECHAR, x2, y2, 6 + x3 - x2, 1, TextBoard.NOCHANGECOLOR, Colors.BackBattle);
                },
                DrawInput$1: function (x2, y2, keyLabel, description, TextBoard) {
                    var x3 = Pidroh.ConsoleApp.Turnbased.BattleRender.DrawInpCommon(x2, y2, description, TextBoard);
                    TextBoard.Draw$1(keyLabel, x3, y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey);
                    //TextBoard.DrawRect(TextBoard.NOCHANGECHAR, barx, y2, 6 + x3 - barx, 1, TextBoard.NOCHANGECOLOR, Colors.BackBattle);
                    //TextBoard.DrawRect(TextBoard.NOCHANGECHAR, x2, y2, 6 + x3 - x2, 1, TextBoard.NOCHANGECOLOR, Colors.BackBattle);

                },
                DrawInpCommon: function (x2, y2, description, TextBoard) {
                    Pidroh.ConsoleApp.Turnbased.BattleRender.DrawBrownStripe(y2, TextBoard);
                    TextBoard.Draw$1(description, x2, y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.InputDescription);
                    var x3 = (x2 + 14) | 0;

                    //int offb = 7;
                    var barx = (x2 + description.length) | 0;
                    TextBoard.DrawRect(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, x3, y2, 6, 1, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackBattle);
                    return x3;
                },
                DrawBrownStripe: function (yOff, textBoard) {
                    textBoard.DrawRect(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, 0, yOff, textBoard.Width, 1, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackStripe);
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
                    "Z", 
                    "M", 
                    "C"
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
                        _o3.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DownFire, "FD");
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
                        this.DrawControls(controlsY, 7);
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
                    turnOrderY = (turnOrderY + 3) | 0;
                }

                this.DrawTurnOrder(turnOrderX, turnOrderY);
                if (!this.stageData.hideLifeUI) {
                    this.DrawLife(((turnOrderX + 14) | 0), turnOrderY);
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
                //TextBoard.Draw("Controls", x, y, );
                this.TextBoard.SetCursorAt(((x + 5) | 0), y);
                this.TextBoard.Draw_Cursor$3("Controls", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);
                this.TextBoard.CursorNewLine(x);


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
                        var TextBoard = this.TextBoard;
                        if (forceInputLabel == null) {
                            Pidroh.ConsoleApp.Turnbased.BattleRender.DrawInput(x2, y2, unicode, description.v, TextBoard);
                        } else {
                            Pidroh.ConsoleApp.Turnbased.BattleRender.DrawInput$1(x2, y2, forceInputLabel, description.v, TextBoard);
                        }


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
                for (var i = 0; i < 4; i = (i + 1) | 0) {
                    var xOff = (turnOrderX + 1) | 0;
                    var yOff = (((turnOrderY + 2) | 0) + Bridge.Int.mul(i, 2)) | 0;
                    this.TextBoard.DrawRect(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, xOff, yOff, 4, 1, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackBattle);
                    this.TextBoard.DrawRect(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, ((xOff + 7) | 0), yOff, 8, 1, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackBattle);
                }
                for (var i1 = 0; i1 < this.turnBaseTry.entities.Count; i1 = (i1 + 1) | 0) {
                    if (i1 >= this.turnBaseTry.entities.Count) {
                        continue;
                    }
                    var e = this.turnBaseTry.entities.getItem(i1);
                    if (!e.drawLife) {
                        continue;
                    }
                    if (!e.Dead) {
                        index = (index + 1) | 0;
                        var xOff1 = (turnOrderX + 1) | 0;
                        var yOff1 = (((turnOrderY + 2) | 0) + Bridge.Int.mul(index, 2)) | 0;
                        var color = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn;
                        if (e.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy) {
                            color = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.EnemyTurn;
                        }
                        if (e.element !== Pidroh.ConsoleApp.Turnbased.BattleMain.Element.None) {
                            color = Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToAuraColor(e.element);
                        }
                        //TextBoard.DrawOneDigit_Cursor((int)e.life.Val);

                        //DrawEntityChar(e, color, xOff, yOff);
                        //TextBoard.DrawChar(GetChar(e), xOff, turnOrderY + 2, color);
                        this.TextBoard.DrawTwoDigits(e.life, xOff1, yOff1, color);
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

                        this.TextBoard.Draw$1(element, ((xOff1 + 7) | 0), yOff1, eColor);
                    }

                    //TextBoard.DrawOneDigit_Cursor((int)e.life.Val);

                    //TextBoard.CursorNewLine(x: 1);
                }
            },
            DrawBrownStripe: function (yOff) {
                Pidroh.ConsoleApp.Turnbased.BattleRender.DrawBrownStripe(yOff, this.TextBoard);
            },
            DrawTurnOrder: function (turnOrderX, turnOrderY, horizontal) {
                if (horizontal === void 0) { horizontal = true; }
                var turnsPerPhase = this.turnBaseTry.battleState.turnsPerPhase;
                this.TextBoard.SetCursorAt(((turnOrderX + 3) | 0), turnOrderY);
                if (this.turnBaseTry.battleState.phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands) {
                    this.TextBoard.Draw_Cursor$3("Turn", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);
                }

                var drawingId = -1;
                for (var i = 0; i < 4; i = (i + 1) | 0) {
                    var yOff = (((turnOrderY + 2) | 0) + Bridge.Int.mul(i, 2)) | 0;
                    Pidroh.ConsoleApp.Turnbased.BattleRender.DrawBrownStripe(yOff, this.TextBoard);
                    for (var j = 0; j < 3; j = (j + 1) | 0) {
                        var xOff = (((turnOrderX + Bridge.Int.mul(j, 3)) | 0) + 3) | 0;


                        this.TextBoard.DrawRect(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, xOff, yOff, 2, 1, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackBattle);
                    }
                }
                for (var i1 = 0; i1 < this.turnBaseTry.entities.Count; i1 = (i1 + 1) | 0) {

                    var e = this.turnBaseTry.entities.getItem(i1);
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
                        var xOff1 = (((turnOrderX + 1) | 0) + Bridge.Int.mul(drawingId, 3)) | 0;
                        var yEntity = (turnOrderY + 2) | 0;
                        var yFirstMove = (turnOrderY + 3) | 0;
                        var xFirstMove = xOff1;
                        if (horizontal) {
                            xOff1 = turnOrderX;
                            yEntity = (((turnOrderY + 2) | 0) + Bridge.Int.mul(drawingId, 2)) | 0;
                            yFirstMove = yEntity;
                            xFirstMove = (turnOrderX + 3) | 0;
                        }
                        this.DrawEntityChar(e, color, xOff1, yEntity);

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

                                this.TextBoard.Draw_Cursor$3(c, color2);
                                if (horizontal) {
                                    for (var j1 = c.length; j1 < 3; j1 = (j1 + 1) | 0) {
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
                    this.Width = 35;
                    this.Height = 46;
                }
            },
            methods: {
                DrawInput: function (x2, y2, unicode, description, textBoard) {
                    //TextBoard.DrawUnicodeLabel(unicode, x2, y2, BattleRender.Colors.inputKey);
                    //TextBoard.Draw(description, x2 + 2 + 5, y2, BattleRender.Colors.InputDescription);
                    Pidroh.ConsoleApp.Turnbased.BattleRender.DrawInput(x2, y2, unicode, description, textBoard);
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
            stageGroupId: 0,
            enemyAmount: null,
            turnAmount: null,
            mouseHover: null,
            Mouse: null,
            remap: null,
            stageGroupSelection: null
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
                this.stageGroupId = -1;
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
                this.stageGroupSelection = null;




                //var stages = ecs.QuickAccessor1<StageData>();
                var groups = ecs.QuickAccessor1(Pidroh.ConsoleApp.Turnbased.StageDataGroup);
                var group = groups.Comp1(0);
                if (this.stageGroupId >= 0) {
                    group = groups.Comp1(this.stageGroupId);
                }

                var d = this.stageId;
                if (group.stageDataIds.Count <= d) {
                    this.mainDraw = this.modeSelectionScreen;
                    this.modeSelectionScreen.Reset();
                    this.stageId = 0;
                    this.stageGroupId = -1;
                    this.Reset();
                    return;
                }

                var stageData = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.StageData, group.stageDataIds.getItem(this.stageId));

                //d = 200;
                if (d >= this.enemyAmount.length) {
                    d = (this.enemyAmount.length - 1) | 0;
                }
                var nEnemies = this.enemyAmount[System.Array.index(d, this.enemyAmount)];

                var battleSetup = new Pidroh.ConsoleApp.Turnbased.BattleSetup(mode, group.stageDataIds.getItem(this.stageId), ecs);
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

                this.battleRender = new Pidroh.ConsoleApp.Turnbased.BattleRender(this.battleMain, stageData, ps);
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


                this.mouseHover = new Pidroh.TurnBased.TextRendering.MouseHoverText(hoverManager, this.battleRender.textWorld.GetFreeEntity(((this.battleRender.textWorld.mainBoard.Width - 2) | 0), 3), moveDescriptions);

                this.battleRender.mouseHover = hoverManager;

                if (this.stageGroupId === -1) {
                    this.stageGroupSelection = new Pidroh.ConsoleApp.Turnbased.StageGroupSelectionScreen(ecs);
                    this.mainDraw = this.stageGroupSelection;
                    return;
                }
            },
            Draw: function (f) {
                this.mouseHover.Update();
                this.mainDraw.Pidroh$ConsoleApp$Turnbased$ITextScreen_$Draw(f);
                this.mainDraw.Pidroh$ConsoleApp$Turnbased$ITextScreen_$Mouse = this.Mouse;
                if (this.stageGroupSelection != null && this.stageGroupSelection.wantedGroup >= 0) {
                    this.stageGroupId = this.stageGroupSelection.wantedGroup;
                    this.stageGroupSelection.wantedGroup = -1;
                    this.Reset();
                }
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
                this.textWorld.Init(Pidroh.ConsoleApp.Turnbased.GameMain.Width, Pidroh.ConsoleApp.Turnbased.GameMain.Height);
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

    Bridge.define("Pidroh.ConsoleApp.Turnbased.StageGroupSelectionScreen", {
        inherits: [Pidroh.ConsoleApp.Turnbased.ITextScreen_],
        fields: {
            stageGroups: null,
            textWorld: null,
            Mouse: null,
            wantedGroup: 0,
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
                this.wantedGroup = -1;
            },
            ctor: function (ecs) {
                this.$initialize();
                this.stageGroups = ecs.QuickAccessor1(Pidroh.ConsoleApp.Turnbased.StageDataGroup);
                this.textWorld = new Pidroh.TextRendering.TextWorld();
                this.textWorld.Init(Pidroh.ConsoleApp.Turnbased.GameMain.Width, Pidroh.ConsoleApp.Turnbased.GameMain.Height);
                this.textWorld.mainBoard.SetAll(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.BackCommand);

                this.textWorld.mainBoard.DrawOnCenterHorizontal("Stage Selection", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero, 0, 1);

                this.textWorld.mainBoard.DrawOnCenterHorizontal("Controls", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel, 0, 6);

                for (var i = 0; i < this.stageGroups.Count; i = (i + 1) | 0) {
                    var sg = this.stageGroups.Comp1(i);
                    Pidroh.ConsoleApp.Turnbased.BattleRender.DrawInput(7, ((Bridge.Int.mul(i, 2) + 8) | 0), ((49 + i) | 0), "STAGE " + (((i + 1) | 0)), this.textWorld.mainBoard);
                }
            }
        },
        methods: {
            Enter: function () {
                this.wannaLeave = 0;
            },
            Draw: function (f) {
                var inp = (this.InputUnicode - 49) | 0;
                if (inp >= 0 && inp < 9) {
                    this.wantedGroup = inp;

                }
                //textWorld.mainBoard.Draw("Stage " + i, 2, i * 2 + 3, BattleRender.Colors.Hero);

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
                if (input === 72) {
                    this.wannaLeave = true;
                }
                if (input === 104) {
                    this.wannaLeave = true;
                }
                if (input === Pidroh.BaseUtils.Unicode.Escape) {
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
                        this.textWorld.mainBoard.SetCursorAt(3, ((pos + 1) | 0));
                        this.textWorld.mainBoard.Draw_Cursor_SmartLineBreak$1(this.moveRenders.getItem(command).Description, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.InputDescription, 0, ((this.moveRenders.getItem(command).Description.length - 1) | 0), 3);
                        //textWorld.mainBoard.Draw(moveRenders[command].Description, 3, pos + 1, BattleRender.Colors.InputDescription);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VCdWlsZC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvT2JqZWN0Q2xvbmVyLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvRGVidWdnZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9EZWVwQ2xvbmVIZWxwZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9FeHRlbnNpb25zLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvUG9pbnQuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9SYW5kb21TdXBwbGllci5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1JlY3RhbmdsZS5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1RpbWVTdGFtcC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1VuaWNvZGUuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9WZWN0b3IyRC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1ZlY3RvcjNELmNzIiwiLi4vVHVybkJhc2VkTG9naWMvTW92ZURhdGEuY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0FzeW5jVGFza3MuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9CYXR0bGVTZXR1cC5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0JhdHRsZU1haW4uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0NvbG9yU3R1ZmYuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9EZWJ1Z0V4dHJhL0RlYnVnRXguY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9EZWNrTWFuYWdlci5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0VDU0ludGVncmF0aW9uLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvRW5lbXlBSS5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL1NwYXduRmFjdG9yeS5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0VuZW15RGF0YUNyZWF0b3IuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9TdGFnZURhdGEuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9Nb3ZlRGF0YUV4ZWN1dGVyLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvSGFwcHMvSGFwcC5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0lucHV0SG9sZGVyLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvTW92ZUNyZWF0b3JQcm9nLmNzIiwiLi4vLi4vVmlzdWFsU3R1ZGlvU29sdXRpb25SbWsvRUNTL0FjY2Vzc29yLmNzIiwiLi4vLi4vVmlzdWFsU3R1ZGlvU29sdXRpb25SbWsvRUNTL0Nsb25lZFN0YXRlLmNzIiwiLi4vLi4vVmlzdWFsU3R1ZGlvU29sdXRpb25SbWsvRUNTL0VDU01hbmFnZXIuY3MiLCIuLi8uLi9WaXN1YWxTdHVkaW9Tb2x1dGlvblJtay9FQ1MvRW50aXR5LmNzIiwiLi4vLi4vVmlzdWFsU3R1ZGlvU29sdXRpb25SbWsvRUNTL1Byb2Nlc3NvckZsZXguY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9UZXh0V29ybGQuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9QYWxldHRlLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvR2FtZVNjcmVlbi9Nb3VzZUhvdmVyLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvR2FtZVNjcmVlbi9Vbmljb2RlUmVtYXAuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9UZXh0Qm9hcmQuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9HYW1lU2NyZWVuL0lUZXh0U2NyZWVuTi5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvQXR0YWNrUHJldmlldy5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvSGFwcEhhbmRsaW5nLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9IZWxwU2NyZWVuLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9JbnB1dEhhbmRsaW5nLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9NZXNzYWdlT25Qb3NpdGlvbi5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvTW91c2VIb3ZlclRleHQuY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL1ByZXZpZXdTeXN0ZW0uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL1JlZmxlY3Rpb25UZXN0LmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9CYXR0bGVSZW5kZXIuY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0dhbWVNYWluLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9SZXN1bHRTY3JlZW4uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL1N0YWdlR3JvdXBTZWxlY3Rpb25TY3JlZW4uY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9HYW1lU2NyZWVuL1Rlc3RHYW1lLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9Nb2RlU2VsZWN0aW9uU2NyZWVuLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvQmxpbmtBbmltYXRpb24uY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9DaGFyQnlDaGFyQW5pbWF0aW9uLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7O1lBNERZQTs7WUFFQUEscUNBQWNB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LEtBQUtBLFFBQVFBLG9CQUFvQkEsSUFBSUEsa0JBQWtCQTtvQkFFbkRBLGVBQWVBLEtBQUlBO29CQUNuQkE7b0JBQ0FBLFNBQVNBOzs7b0JBR1RBLE9BQU9BLFlBQVlBO3dCQUVmQTt3QkFDQUEsdUJBQVlBOztvQkFFaEJBLElBQUlBLHFCQUFxQkEsVUFBVUEsU0FBT0E7d0JBRXRDQTt3QkFDQUEsK0JBQWdCQTt3QkFDaEJBOztvQkFFSkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsYUFBYUEsU0FBU0E7d0JBRTVCQSxnQkFBaUJBLFVBQVVBLFNBQU9BOzs7Ozs7Ozs7Ozs7Z0NyQnNLbEJBLFFBQW1CQSxVQUF1QkEsVUFBZ0JBO2dCQUVsRkEsd0hBQVlBLFFBQVFBLFVBQVVBLFVBQVVBO2dCQUN4Q0EsYUFBbUJBO2dCQUNuQkEsSUFBSUE7b0JBQ0FBLFNBQVNBOztnQkFDYkEsa0JBQWtCQSw2Q0FBNEJBLGlDQUF3QkEsK0JBQXNCQSxXQUFXQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxuLy91c2luZyBFQ1M7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nO1xyXG4vL3VzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2VCdWlsZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IGJ1ZmZlcjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIGJ1ZmZlck9uO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgSFRNTFByZUVsZW1lbnQgdGV4dDtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBHYW1lTWFpbiBncjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBUZXh0Qm9hcmQgVGV4dEJvYXJkO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgU3RyaW5nQnVpbGRlciBzYjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmdbXSBjb2xvcnM7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IGJ1ZmZlclVuaWNvZGUgPSAtMTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBUZXh0Qm9hcmQgYXV4O1xyXG4gICAgICAgIHN0YXRpYyBEYXRlVGltZSBsYXN0ID0gRGF0ZVRpbWUuTm93O1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGJvb2wgQ2FuRHJhdztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBTZXR1cEdhbWUob3V0IEdhbWVNYWluIGdyLCBvdXQgVGV4dEJvYXJkIFRleHRCb2FyZClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBSYW5kb20gcm5kID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgICAgICBSYW5kb21TdXBwbGllci5HZW5lcmF0ZSA9ICgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZmxvYXQpcm5kLk5leHREb3VibGUoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGdyID0gbmV3IEdhbWVNYWluKCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZCA9IGdyLkdldEJvYXJkKCk7XHJcbiAgICAgICAgICAgIGF1eCA9IG5ldyBUZXh0Qm9hcmQoMzAwLCAzMDApO1xyXG5cclxuXHJcbiAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBCbGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgaSA9IDM7XHJcbiAgICAgICAgICAgIHB1YmxpYyBCcmlkZ2VCdWlsZC5BcHAuVmVjdG9yIHBvcyA9IG5ldyBCcmlkZ2VCdWlsZC5BcHAuVmVjdG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgVmVjdG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgZmxvYXQgeDtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL0RlZXBDbG9uZUhlbHBlci5kZWJ1Zy5BY3RpdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAvL25ldyBSZWZsZWN0aW9uVGVzdCgpO1xyXG4gICAgICAgICAgICBUZXN0RW50aXR5U3lzdGVtKCk7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJHYW1lIFN0YXJ0XCIpO1xyXG4gICAgICAgICAgICBTZXR1cEdhbWUob3V0IGdyLCBvdXQgVGV4dEJvYXJkKTtcclxuICAgICAgICAgICAgY29sb3JzID0gbmV3IHN0cmluZ1szMF07XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgQ29sb3JTdHVmZi5jb2xvcnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb2xvcnNbaV0gPSBDb2xvclN0dWZmLmNvbG9yc1tpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBuZXcgSFRNTFN0eWxlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBzdHlsZS5Jbm5lckhUTUwgPSBcImh0bWwsYm9keSB7Zm9udC1mYW1pbHk6IENvdXJpZXI7IGJhY2tncm91bmQtY29sb3I6IzFmMjUyNjsgaGVpZ2h0OiAxMDAlOyBjb2xvcjojODg4O31cIiArIFwiXFxuICNjYW52YXMtY29udGFpbmVyIHt3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyB0ZXh0LWFsaWduOmNlbnRlcjsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfSBcIjtcclxuICAgICAgICAgICAgRG9jdW1lbnQuSGVhZC5BcHBlbmRDaGlsZChzdHlsZSk7XHJcbiAgICAgICAgICAgIGJ1ZmZlciA9IDk7XHJcbiAgICAgICAgICAgIGJ1ZmZlck9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBEb2N1bWVudC5PbktleURvd24gKz0gKEtleWJvYXJkRXZlbnQgYSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGEuS2V5Q29kZSA+PSAzNyAmJiBhLktleUNvZGUgPD0gNDApIHtcclxuICAgICAgICAgICAgICAgICAgICBIYW5kbGUoYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJLRFwiICsgYS5LZXlDb2RlKTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJLRFwiK2EuQ2hhckNvZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZSh1bmljb2RlKTtcclxuICAgICAgICAgICAgICAgIC8vYnVmZmVyID0gYS5DaGFyQ29kZTtcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAgICAgRG9jdW1lbnQuT25LZXlQcmVzcyArPSAoS2V5Ym9hcmRFdmVudCBhKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYS5LZXlDb2RlID49IDM3ICYmIGEuS2V5Q29kZSA8PSA0MCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShhLktleUNvZGUpO1xyXG4gICAgICAgICAgICAgICAgSGFuZGxlKGEpO1xyXG4gICAgICAgICAgICAgICAgYS5QcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZSh1bmljb2RlKTtcclxuICAgICAgICAgICAgICAgIC8vYnVmZmVyID0gYS5DaGFyQ29kZTtcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBVcGRhdGVHYW1lKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZnRlciBidWlsZGluZyAoQ3RybCArIFNoaWZ0ICsgQikgdGhpcyBwcm9qZWN0LCBcclxuICAgICAgICAgICAgLy8gYnJvd3NlIHRvIHRoZSAvYmluL0RlYnVnIG9yIC9iaW4vUmVsZWFzZSBmb2xkZXIuXHJcblxyXG4gICAgICAgICAgICAvLyBBIG5ldyBicmlkZ2UvIGZvbGRlciBoYXMgYmVlbiBjcmVhdGVkIGFuZFxyXG4gICAgICAgICAgICAvLyBjb250YWlucyB5b3VyIHByb2plY3RzIEphdmFTY3JpcHQgZmlsZXMuIFxyXG5cclxuICAgICAgICAgICAgLy8gT3BlbiB0aGUgYnJpZGdlL2luZGV4Lmh0bWwgZmlsZSBpbiBhIGJyb3dzZXIgYnlcclxuICAgICAgICAgICAgLy8gUmlnaHQtQ2xpY2sgPiBPcGVuIFdpdGguLi4sIHRoZW4gY2hvb3NlIGFcclxuICAgICAgICAgICAgLy8gd2ViIGJyb3dzZXIgZnJvbSB0aGUgbGlzdFxyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBhcHBsaWNhdGlvbiB3aWxsIHRoZW4gcnVuIGluIGEgYnJvd3Nlci5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgSGFuZGxlKEtleWJvYXJkRXZlbnQgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBjb2RlID0gYS5LZXlDb2RlO1xyXG4gICAgICAgICAgICBpZiAoY29kZSA9PSAwKSBjb2RlID0gYS5DaGFyQ29kZTtcclxuICAgICAgICAgICAgaW50IHVuaWNvZGUgPSBjb2RlO1xyXG4gICAgICAgICAgICBidWZmZXJVbmljb2RlID0gdW5pY29kZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFRlc3RFbnRpdHlTeXN0ZW0oKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFVwZGF0ZUdhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKENhbkRyYXcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERhdGVUaW1lIG5vdyA9IERhdGVUaW1lLk5vdztcclxuICAgICAgICAgICAgICAgIHZhciBzZWNzID0gKG5vdyAtIGxhc3QpLlRvdGFsU2Vjb25kcztcclxuICAgICAgICAgICAgICAgIGlmIChzZWNzID4gMC4wOClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKHNlY3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlY3MgPSAwLjA4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZCA9IGdyLkdldEJvYXJkKCk7XHJcbiAgICAgICAgICAgICAgICBnci5EcmF3KChmbG9hdClzZWNzKTtcclxuICAgICAgICAgICAgICAgIGxhc3QgPSBub3c7XHJcbiAgICAgICAgICAgICAgICBnci5JbnB1dFVuaWNvZGUgPSBidWZmZXJVbmljb2RlO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyVW5pY29kZSA9IC0xO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBtb3VzZVggPSBTY3JpcHQuQ2FsbDxpbnQ+KFwiZ2V0TW91c2VYXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vdXNlWSA9IFNjcmlwdC5DYWxsPGludD4oXCJnZXRNb3VzZVlcIik7XHJcbiAgICAgICAgICAgICAgICBnci5Nb3VzZS5wb3MgPSBuZXcgUG9pbnQyRChtb3VzZVgsIG1vdXNlWSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy87O1NjcmlwdC5DYWxsKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IFRleHRCb2FyZC5IZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFRleHRCb2FyZC5XaWR0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhdXguU2FtZUFzKFRleHRCb2FyZCwgeDogaSwgeTogaikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludCB0Y0kgPSBUZXh0Qm9hcmQuVGV4dENvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGNvbG9yID0gY29sb3JzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRjSSA8IDApIHsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0Y0kgPj0gY29sb3JzLkxlbmd0aCkgeyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IGNvbG9yc1t0Y0ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGJhY2tDb2xvciA9IGNvbG9yc1tUZXh0Qm9hcmQuQmFja0NvbG9yW2ksIGpdXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXIgQGNoYXIgPSBUZXh0Qm9hcmQuQ2hhckF0KGksIGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJkcmF3XCIsIGksIGosIGNvbG9yLCBiYWNrQ29sb3IsIFwiXCIgKyBAY2hhcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXguQ29weShUZXh0Qm9hcmQsIHg6IGksIHk6IGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TY3JpcHQuQ2FsbChcImRyYXdcIiwgaSwgaiwgY29sb3JzW1RleHRCb2FyZC5UZXh0Q29sb3JbaSwgal1dLCBjb2xvcnNbVGV4dEJvYXJkLkJhY2tDb2xvcltpLCBqXV0sIFwieFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ2FuRHJhdyA9IFNjcmlwdC5DYWxsPGJvb2w+KFwiaXNSZWFkeVRvRHJhd1wiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIFdpbmRvdy5TZXRUaW1lb3V0KChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pVXBkYXRlR2FtZSwgMTUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHMuQXJyYXlFeHRlbnNpb25zO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIE9iamVjdEV4dGVuc2lvbnNcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBNZXRob2RJbmZvIENsb25lTWV0aG9kID0gdHlwZW9mKE9iamVjdCkuR2V0TWV0aG9kKFwiTWVtYmVyd2lzZUNsb25lXCIsIEJpbmRpbmdGbGFncy5Ob25QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuSW5zdGFuY2UpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgSXNQcmltaXRpdmVNZXRob2QodGhpcyBUeXBlIHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSB0eXBlb2YoU3RyaW5nKSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IHR5cGVvZihpbnQpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gdHlwZW9mKGZsb2F0KSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IHR5cGVvZihkb3VibGUpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gdHlwZW9mKGNoYXIpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgLy9ib29sIGlzUHJpbWl0aXZlID0gdHlwZS5Jc1ByaW1pdGl2ZTtcclxuICAgICAgICAgICAgYm9vbCBpc1ZhbHVlVHlwZSA9IHR5cGUuSXNWYWx1ZVR5cGU7XHJcbiAgICAgICAgICAgIHJldHVybiBpc1ZhbHVlVHlwZTsgLy8mIGlzUHJpbWl0aXZlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBPYmplY3QgQ29weSh0aGlzIE9iamVjdCBvcmlnaW5hbE9iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBJbnRlcm5hbENvcHkob3JpZ2luYWxPYmplY3QsIG5ldyBEaWN0aW9uYXJ5PE9iamVjdCwgT2JqZWN0PihuZXcgUmVmZXJlbmNlRXF1YWxpdHlDb21wYXJlcigpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIE9iamVjdCBJbnRlcm5hbENvcHkoT2JqZWN0IG9yaWdpbmFsT2JqZWN0LCBJRGljdGlvbmFyeTxPYmplY3QsIE9iamVjdD4gdmlzaXRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbE9iamVjdCA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgdmFyIHR5cGVUb1JlZmxlY3QgPSBvcmlnaW5hbE9iamVjdC5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIGlmIChJc1ByaW1pdGl2ZU1ldGhvZCh0eXBlVG9SZWZsZWN0KSkgcmV0dXJuIG9yaWdpbmFsT2JqZWN0O1xyXG4gICAgICAgICAgICBpZiAodmlzaXRlZC5Db250YWluc0tleShvcmlnaW5hbE9iamVjdCkpIHJldHVybiB2aXNpdGVkW29yaWdpbmFsT2JqZWN0XTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZihEZWxlZ2F0ZSkuSXNBc3NpZ25hYmxlRnJvbSh0eXBlVG9SZWZsZWN0KSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIHZhciBjbG9uZU9iamVjdCA9IENsb25lTWV0aG9kLkludm9rZShvcmlnaW5hbE9iamVjdCwgbmV3IG9iamVjdFtdIHsgfSk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlVG9SZWZsZWN0LklzQXJyYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBhcnJheVR5cGUgPSB0eXBlVG9SZWZsZWN0LkdldEVsZW1lbnRUeXBlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoSXNQcmltaXRpdmVNZXRob2QoYXJyYXlUeXBlKSA9PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBBcnJheSBjbG9uZWRBcnJheSA9IChBcnJheSljbG9uZU9iamVjdDtcclxuICAgICAgICAgICAgICAgICAgICBjbG9uZWRBcnJheS5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpTeXN0ZW0uQXJyYXksIGludFtdPikoKGFycmF5LCBpbmRpY2VzKSA9PiBhcnJheS5TZXRWYWx1ZShJbnRlcm5hbENvcHkoY2xvbmVkQXJyYXkuR2V0VmFsdWUoaW5kaWNlcyksIHZpc2l0ZWQpLCBpbmRpY2VzKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2aXNpdGVkLkFkZChvcmlnaW5hbE9iamVjdCwgY2xvbmVPYmplY3QpO1xyXG4gICAgICAgICAgICBDb3B5RmllbGRzKG9yaWdpbmFsT2JqZWN0LCB2aXNpdGVkLCBjbG9uZU9iamVjdCwgdHlwZVRvUmVmbGVjdCk7XHJcbiAgICAgICAgICAgIFJlY3Vyc2l2ZUNvcHlCYXNlVHlwZVByaXZhdGVGaWVsZHMob3JpZ2luYWxPYmplY3QsIHZpc2l0ZWQsIGNsb25lT2JqZWN0LCB0eXBlVG9SZWZsZWN0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsb25lT2JqZWN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSZWN1cnNpdmVDb3B5QmFzZVR5cGVQcml2YXRlRmllbGRzKG9iamVjdCBvcmlnaW5hbE9iamVjdCwgSURpY3Rpb25hcnk8b2JqZWN0LCBvYmplY3Q+IHZpc2l0ZWQsIG9iamVjdCBjbG9uZU9iamVjdCwgVHlwZSB0eXBlVG9SZWZsZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVUb1JlZmxlY3QuQmFzZVR5cGUgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUmVjdXJzaXZlQ29weUJhc2VUeXBlUHJpdmF0ZUZpZWxkcyhvcmlnaW5hbE9iamVjdCwgdmlzaXRlZCwgY2xvbmVPYmplY3QsIHR5cGVUb1JlZmxlY3QuQmFzZVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgQ29weUZpZWxkcyhvcmlnaW5hbE9iamVjdCwgdmlzaXRlZCwgY2xvbmVPYmplY3QsIHR5cGVUb1JlZmxlY3QuQmFzZVR5cGUsIEJpbmRpbmdGbGFncy5JbnN0YW5jZSB8IEJpbmRpbmdGbGFncy5Ob25QdWJsaWMsIChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uRmllbGRJbmZvLCBib29sPikoaW5mbyA9PiBpbmZvLklzUHJpdmF0ZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIENvcHlGaWVsZHMob2JqZWN0IG9yaWdpbmFsT2JqZWN0LCBJRGljdGlvbmFyeTxvYmplY3QsIG9iamVjdD4gdmlzaXRlZCwgb2JqZWN0IGNsb25lT2JqZWN0LCBUeXBlIHR5cGVUb1JlZmxlY3QsIEJpbmRpbmdGbGFncyBiaW5kaW5nRmxhZ3MgPSBCaW5kaW5nRmxhZ3MuSW5zdGFuY2UgfCBCaW5kaW5nRmxhZ3MuTm9uUHVibGljIHwgQmluZGluZ0ZsYWdzLlB1YmxpYyB8IEJpbmRpbmdGbGFncy5GbGF0dGVuSGllcmFyY2h5LCBGdW5jPEZpZWxkSW5mbywgYm9vbD4gZmlsdGVyID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKEZpZWxkSW5mbyBmaWVsZEluZm8gaW4gdHlwZVRvUmVmbGVjdC5HZXRGaWVsZHMoYmluZGluZ0ZsYWdzKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlciAhPSBudWxsICYmIGZpbHRlcihmaWVsZEluZm8pID09IGZhbHNlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmIChJc1ByaW1pdGl2ZU1ldGhvZChmaWVsZEluZm8uRmllbGRUeXBlKSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxGaWVsZFZhbHVlID0gZmllbGRJbmZvLkdldFZhbHVlKG9yaWdpbmFsT2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIHZhciBjbG9uZWRGaWVsZFZhbHVlID0gSW50ZXJuYWxDb3B5KG9yaWdpbmFsRmllbGRWYWx1ZSwgdmlzaXRlZCk7XHJcbiAgICAgICAgICAgICAgICBmaWVsZEluZm8uU2V0VmFsdWUoY2xvbmVPYmplY3QsIGNsb25lZEZpZWxkVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBDb3B5PFQ+KHRoaXMgVCBvcmlnaW5hbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoVClDb3B5KChPYmplY3Qpb3JpZ2luYWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUmVmZXJlbmNlRXF1YWxpdHlDb21wYXJlciA6IEVxdWFsaXR5Q29tcGFyZXI8T2JqZWN0PlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEVxdWFscyhvYmplY3QgeCwgb2JqZWN0IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVmZXJlbmNlRXF1YWxzKHgsIHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAob2JqID09IG51bGwpIHJldHVybiAwO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqLkdldEhhc2hDb2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5hbWVzcGFjZSBBcnJheUV4dGVuc2lvbnNcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEFycmF5RXh0ZW5zaW9uc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEZvckVhY2godGhpcyBBcnJheSBhcnJheSwgQWN0aW9uPEFycmF5LCBpbnRbXT4gYWN0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXkuTGVuZ3RoID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgICAgIEFycmF5VHJhdmVyc2Ugd2Fsa2VyID0gbmV3IEFycmF5VHJhdmVyc2UoYXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgZG8gYWN0aW9uKGFycmF5LCB3YWxrZXIuUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHdhbGtlci5TdGVwKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBjbGFzcyBBcnJheVRyYXZlcnNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50W10gUG9zaXRpb247XHJcbiAgICAgICAgICAgIHByaXZhdGUgaW50W10gbWF4TGVuZ3RocztcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBBcnJheVRyYXZlcnNlKEFycmF5IGFycmF5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtYXhMZW5ndGhzID0gbmV3IGludFthcnJheS5SYW5rXTtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgYXJyYXkuUmFuazsgKytpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aHNbaV0gPSBhcnJheS5HZXRMZW5ndGgoaSkgLSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgUG9zaXRpb24gPSBuZXcgaW50W2FycmF5LlJhbmtdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBTdGVwKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBQb3NpdGlvbi5MZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb25baV0gPCBtYXhMZW5ndGhzW2ldKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUG9zaXRpb25baV0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBpOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvc2l0aW9uW2pdID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlJlZmxlY3Rpb247XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIERlYnVnZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgYm9vbCBkZWJ1Z2dpbmc7XHJcbiAgICAgICAgaW50IGlkZW50O1xyXG4gICAgICAgIFN0cmluZ0J1aWxkZXIgc3RyaW5nQnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBEZWJ1Z2dlcihib29sIGRlYnVnZ2luZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVidWdnaW5nID0gZGVidWdnaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUHJpbnQoc3RyaW5nIHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWRlYnVnZ2luZykgcmV0dXJuO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGlkZW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGUoJyAnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRGVpZGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZGVudCA9IGlkZW50IC0gMjsgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBJZGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZGVudCA9IGlkZW50KzI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFjdGl2ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkZWJ1Z2dpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBY3RpdmUoYm9vbCB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGVidWdnaW5nID0gdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFByaW50KE9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWRlYnVnZ2luZykgcmV0dXJuO1xyXG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IG9iai5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiVHlwZTogXCIpO1xyXG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZCh0eXBlLk5hbWUpO1xyXG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZExpbmUoKTtcclxuICAgICAgICAgICAgdmFyIGZpZWxkcyA9IHR5cGUuR2V0RmllbGRzKEJpbmRpbmdGbGFncy5QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuTm9uUHVibGljIHwgQmluZGluZ0ZsYWdzLkluc3RhbmNlKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGYgaW4gZmllbGRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoJyAnKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKGYuR2V0VmFsdWUob2JqKSk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoJyAnKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKGYuTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZExpbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShzdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIE1vZHVsZSBIZWFkZXIgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXFxcclxuTW9kdWxlIE5hbWU6ICBEZWVwQ2xvbmVIZWxwZXIuY3NcclxuUHJvamVjdDogICAgICBDU0RlZXBDbG9uZU9iamVjdFxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblRoZSBjbGFzcyBjb250YWlucyB0aGUgbWV0aG9kcyB0aGF0IGltcGxlbWVudCBkZWVwIGNsb25lIHVzaW5nIHJlZmxlY3Rpb24uXHJcblxyXG5UaGlzIHNvdXJjZSBpcyBzdWJqZWN0IHRvIHRoZSBNaWNyb3NvZnQgUHVibGljIExpY2Vuc2UuXHJcblNlZSBodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vZW4tdXMvb3Blbm5lc3MvbGljZW5zZXMuYXNweCNNUEwuXHJcbkFsbCBvdGhlciByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG5USElTIENPREUgQU5EIElORk9STUFUSU9OIElTIFBST1ZJREVEIFwiQVMgSVNcIiBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBcclxuRUlUSEVSIEVYUFJFU1NFRCBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBJTVBMSUVEIFxyXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQvT1IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuXHJcblxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgRGVlcENsb25lSGVscGVyXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRGVidWdnZXIgZGVidWcgPSBuZXcgRGVidWdnZXIoZmFsc2UpO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEdldCB0aGUgZGVlcCBjbG9uZSBvZiBhbiBvYmplY3QuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFwiPlRoZSB0eXBlIG9mIHRoZSBvYmouPC90eXBlcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+SXQgaXMgdGhlIG9iamVjdCB1c2VkIHRvIGRlZXAgY2xvbmUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+UmV0dXJuIHRoZSBkZWVwIGNsb25lLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgRGVlcENsb25lPFQ+KFQgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG9iaiA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiT2JqZWN0IGlzIG51bGxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChUKUNsb25lUHJvY2VkdXJlKG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGVlcENvcHlQYXJ0aWFsKE9iamVjdCBmcm9tLCBPYmplY3QgdG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZnJvbSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiT2JqZWN0IGlzIG51bGxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ29weVByb2NlZHVyZVBhcnRpYWwoZnJvbSwgdG8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgbWV0aG9kIGltcGxlbWVudHMgZGVlcCBjbG9uZSB1c2luZyByZWZsZWN0aW9uLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+SXQgaXMgdGhlIG9iamVjdCB1c2VkIHRvIGRlZXAgY2xvbmUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+UmV0dXJuIHRoZSBkZWVwIGNsb25lLjwvcmV0dXJucz5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBvYmplY3QgQ2xvbmVQcm9jZWR1cmUoT2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAob2JqID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBUeXBlIHR5cGUgPSBvYmouR2V0VHlwZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGVidWcuUHJpbnQoXCJDbG9uaW5nOiBcIiArIHR5cGUpO1xyXG4gICAgICAgICAgICAvL2RlYnVnLlByaW50KHR5cGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHR5cGUgb2Ygb2JqZWN0IGlzIHRoZSB2YWx1ZSB0eXBlLCB3ZSB3aWxsIGFsd2F5cyBnZXQgYSBuZXcgb2JqZWN0IHdoZW4gXHJcbiAgICAgICAgICAgIC8vIHRoZSBvcmlnaW5hbCBvYmplY3QgaXMgYXNzaWduZWQgdG8gYW5vdGhlciB2YXJpYWJsZS4gU28gaWYgdGhlIHR5cGUgb2YgdGhlIFxyXG4gICAgICAgICAgICAvLyBvYmplY3QgaXMgcHJpbWl0aXZlIG9yIGVudW0sIHdlIGp1c3QgcmV0dXJuIHRoZSBvYmplY3QuIFdlIHdpbGwgcHJvY2VzcyB0aGUgXHJcbiAgICAgICAgICAgIC8vIHN0cnVjdCB0eXBlIHN1YnNlcXVlbnRseSBiZWNhdXNlIHRoZSBzdHJ1Y3QgdHlwZSBtYXkgY29udGFpbiB0aGUgcmVmZXJlbmNlIFxyXG4gICAgICAgICAgICAvLyBmaWVsZHMuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBzdHJpbmcgdmFyaWFibGVzIGNvbnRhaW4gdGhlIHNhbWUgY2hhcnMsIHRoZXkgYWx3YXlzIHJlZmVyIHRvIHRoZSBzYW1lIFxyXG4gICAgICAgICAgICAvLyBzdHJpbmcgaW4gdGhlIGhlYXAuIFNvIGlmIHRoZSB0eXBlIG9mIHRoZSBvYmplY3QgaXMgc3RyaW5nLCB3ZSBhbHNvIHJldHVybiB0aGUgXHJcbiAgICAgICAgICAgIC8vIG9iamVjdC5cclxuICAgICAgICAgICAgaWYgKHR5cGUuSXNFbnVtIHx8IHR5cGUgPT0gdHlwZW9mKHN0cmluZykgfHwgdHlwZSA9PSB0eXBlb2YoaW50KSB8fCB0eXBlID09IHR5cGVvZihjaGFyKSB8fCB0eXBlID09IHR5cGVvZihmbG9hdCkgfHwgdHlwZSA9PSB0eXBlb2YoZG91YmxlKSB8fCB0eXBlID09IHR5cGVvZihCb29sZWFuKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KHR5cGUgKyBcIiBcIiArIG9iaisgXCIgLVZcIik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHR5cGUgb2YgdGhlIG9iamVjdCBpcyB0aGUgQXJyYXksIHdlIHVzZSB0aGUgQ3JlYXRlSW5zdGFuY2UgbWV0aG9kIHRvIGdldFxyXG4gICAgICAgICAgICAvLyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgYXJyYXkuIFdlIGFsc28gcHJvY2VzcyByZWN1cnNpdmVseSB0aGlzIG1ldGhvZCBpbiB0aGUgXHJcbiAgICAgICAgICAgIC8vIGVsZW1lbnRzIG9mIHRoZSBvcmlnaW5hbCBhcnJheSBiZWNhdXNlIHRoZSB0eXBlIG9mIHRoZSBlbGVtZW50IG1heSBiZSB0aGUgcmVmZXJlbmNlIFxyXG4gICAgICAgICAgICAvLyB0eXBlLlxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlLklzQXJyYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9zdHJpbmcgdHlwZU5hbWUgPSB0eXBlLkZ1bGxOYW1lLlJlcGxhY2UoXCJbXVwiLCBzdHJpbmcuRW1wdHkpO1xyXG4gICAgICAgICAgICAgICAgLy9kZWJ1Zy5QcmludCh0eXBlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBUeXBlIHR5cGVFbGVtZW50ID0gdHlwZS5HZXRFbGVtZW50VHlwZSgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL2RlYnVnLlByaW50KHR5cGVFbGVtZW50K1wic3NcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJyYXkgPSBvYmogYXMgQXJyYXk7XHJcbiAgICAgICAgICAgICAgICBpbnQgbGVuZ3RoID0gYXJyYXkuTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgQXJyYXkgY29waWVkQXJyYXkgPSBBcnJheS5DcmVhdGVJbnN0YW5jZSh0eXBlRWxlbWVudCwgbGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgYXJyYXkuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBkZWVwIGNsb25lIG9mIHRoZSBlbGVtZW50IGluIHRoZSBvcmlnaW5hbCBhcnJheSBhbmQgYXNzaWduIHRoZSBcclxuICAgICAgICAgICAgICAgICAgICAvLyBjbG9uZSB0byB0aGUgbmV3IGFycmF5LlxyXG4gICAgICAgICAgICAgICAgICAgIGNvcGllZEFycmF5LlNldFZhbHVlKENsb25lUHJvY2VkdXJlKGFycmF5LkdldFZhbHVlKGkpKSwgaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvcGllZEFycmF5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB0eXBlIG9mIHRoZSBvYmplY3QgaXMgY2xhc3Mgb3Igc3RydWN0LCBpdCBtYXkgY29udGFpbiB0aGUgcmVmZXJlbmNlIGZpZWxkcywgXHJcbiAgICAgICAgICAgIC8vIHNvIHdlIHVzZSByZWZsZWN0aW9uIGFuZCBwcm9jZXNzIHJlY3Vyc2l2ZWx5IHRoaXMgbWV0aG9kIGluIHRoZSBmaWVsZHMgb2YgdGhlIG9iamVjdCBcclxuICAgICAgICAgICAgLy8gdG8gZ2V0IHRoZSBkZWVwIGNsb25lIG9mIHRoZSBvYmplY3QuIFxyXG4gICAgICAgICAgICAvLyBXZSB1c2UgVHlwZS5Jc1ZhbHVlVHlwZSBtZXRob2QgaGVyZSBiZWNhdXNlIHRoZXJlIGlzIG5vIHdheSB0byBpbmRpY2F0ZSBkaXJlY3RseSB3aGV0aGVyIFxyXG4gICAgICAgICAgICAvLyB0aGUgVHlwZSBpcyBhIHN0cnVjdCB0eXBlLlxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlLklzQ2xhc3N8fHR5cGUuSXNWYWx1ZVR5cGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdCBjb3BpZWRPYmplY3QgPSBBY3RpdmF0b3IuQ3JlYXRlSW5zdGFuY2Uob2JqLkdldFR5cGUoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGFsbCBGaWVsZEluZm8uXHJcbiAgICAgICAgICAgICAgICBGaWVsZEluZm9bXSBmaWVsZHMgPSB0eXBlLkdldEZpZWxkcyhCaW5kaW5nRmxhZ3MuUHVibGljIHwgQmluZGluZ0ZsYWdzLk5vblB1YmxpYyB8IEJpbmRpbmdGbGFncy5JbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoIChGaWVsZEluZm8gZmllbGQgaW4gZmllbGRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoXCJGaWVsZDogXCIgKyBmaWVsZC5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QgZmllbGRWYWx1ZSA9IGZpZWxkLkdldFZhbHVlKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkVmFsdWUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkZpZWxkOiBcIiArIGZpZWxkLk5hbWUgKyBcIiBiZWluZyBzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgZGVlcCBjbG9uZSBvZiB0aGUgZmllbGQgaW4gdGhlIG9yaWdpbmFsIG9iamVjdCBhbmQgYXNzaWduIHRoZSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvbmUgdG8gdGhlIGZpZWxkIGluIHRoZSBuZXcgb2JqZWN0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5TZXRWYWx1ZShjb3BpZWRPYmplY3QsIENsb25lUHJvY2VkdXJlKGZpZWxkVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBjb3BpZWRPYmplY3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oXCJUaGUgb2JqZWN0IGlzIHVua25vd24gdHlwZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgb2JqZWN0IENvcHlQcm9jZWR1cmVQYXJ0aWFsKE9iamVjdCBmcm9tLCBPYmplY3QgdG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZnJvbSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgVHlwZSB0eXBlID0gZnJvbS5HZXRUeXBlKCk7XHJcblxyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludChcIkNvcHlpbmcgXCIrdHlwZSk7XHJcbiAgICAgICAgICAgIGRlYnVnLklkZW50KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgdHlwZSBvZiBvYmplY3QgaXMgdGhlIHZhbHVlIHR5cGUsIHdlIHdpbGwgYWx3YXlzIGdldCBhIG5ldyBvYmplY3Qgd2hlbiBcclxuICAgICAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdCBpcyBhc3NpZ25lZCB0byBhbm90aGVyIHZhcmlhYmxlLiBTbyBpZiB0aGUgdHlwZSBvZiB0aGUgXHJcbiAgICAgICAgICAgIC8vIG9iamVjdCBpcyBwcmltaXRpdmUgb3IgZW51bSwgd2UganVzdCByZXR1cm4gdGhlIG9iamVjdC4gV2Ugd2lsbCBwcm9jZXNzIHRoZSBcclxuICAgICAgICAgICAgLy8gc3RydWN0IHR5cGUgc3Vic2VxdWVudGx5IGJlY2F1c2UgdGhlIHN0cnVjdCB0eXBlIG1heSBjb250YWluIHRoZSByZWZlcmVuY2UgXHJcbiAgICAgICAgICAgIC8vIGZpZWxkcy5cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHN0cmluZyB2YXJpYWJsZXMgY29udGFpbiB0aGUgc2FtZSBjaGFycywgdGhleSBhbHdheXMgcmVmZXIgdG8gdGhlIHNhbWUgXHJcbiAgICAgICAgICAgIC8vIHN0cmluZyBpbiB0aGUgaGVhcC4gU28gaWYgdGhlIHR5cGUgb2YgdGhlIG9iamVjdCBpcyBzdHJpbmcsIHdlIGFsc28gcmV0dXJuIHRoZSBcclxuICAgICAgICAgICAgLy8gb2JqZWN0LlxyXG4gICAgICAgICAgICBpZiAodHlwZS5Jc0VudW0gfHwgdHlwZSA9PSB0eXBlb2Yoc3RyaW5nKSB8fCB0eXBlID09IHR5cGVvZihpbnQpIHx8IHR5cGUgPT0gdHlwZW9mKGNoYXIpIHx8IHR5cGUgPT0gdHlwZW9mKGZsb2F0KSB8fCB0eXBlID09IHR5cGVvZihkb3VibGUpKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KHR5cGUgKyBcIiBcIitmcm9tICsgXCIgLVZcIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5EZWlkZW50KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJvbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBhcnJheXMgbm90IGltcGxlbWVudGVkXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUuSXNBcnJheSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVidWcuRGVpZGVudCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHR5cGUgb2YgdGhlIG9iamVjdCBpcyBjbGFzcyBvciBzdHJ1Y3QsIGl0IG1heSBjb250YWluIHRoZSByZWZlcmVuY2UgZmllbGRzLCBcclxuICAgICAgICAgICAgLy8gc28gd2UgdXNlIHJlZmxlY3Rpb24gYW5kIHByb2Nlc3MgcmVjdXJzaXZlbHkgdGhpcyBtZXRob2QgaW4gdGhlIGZpZWxkcyBvZiB0aGUgb2JqZWN0IFxyXG4gICAgICAgICAgICAvLyB0byBnZXQgdGhlIGRlZXAgY2xvbmUgb2YgdGhlIG9iamVjdC4gXHJcbiAgICAgICAgICAgIC8vIFdlIHVzZSBUeXBlLklzVmFsdWVUeXBlIG1ldGhvZCBoZXJlIGJlY2F1c2UgdGhlcmUgaXMgbm8gd2F5IHRvIGluZGljYXRlIGRpcmVjdGx5IHdoZXRoZXIgXHJcbiAgICAgICAgICAgIC8vIHRoZSBUeXBlIGlzIGEgc3RydWN0IHR5cGUuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUuSXNDbGFzcyB8fCB0eXBlLklzVmFsdWVUeXBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QgY29waWVkT2JqZWN0ID0gdG87XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGFsbCBGaWVsZEluZm8uXHJcbiAgICAgICAgICAgICAgICBGaWVsZEluZm9bXSBmaWVsZHMgPSB0eXBlLkdldEZpZWxkcyhCaW5kaW5nRmxhZ3MuUHVibGljIHwgQmluZGluZ0ZsYWdzLk5vblB1YmxpYyB8IEJpbmRpbmdGbGFncy5JbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoIChGaWVsZEluZm8gZmllbGQgaW4gZmllbGRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoXCJGaWVsZDogXCIgKyBmaWVsZC5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QgZmllbGRWYWx1ZSA9IGZpZWxkLkdldFZhbHVlKGZyb20pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZFZhbHVlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkZpZWxkOiBcIiArIGZpZWxkLk5hbWUgKyBcIiBub3QgbnVsbCwgYmVpbmcgc2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGRlZXAgY2xvbmUgb2YgdGhlIGZpZWxkIGluIHRoZSBvcmlnaW5hbCBvYmplY3QgYW5kIGFzc2lnbiB0aGUgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb25lIHRvIHRoZSBmaWVsZCBpbiB0aGUgbmV3IG9iamVjdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcuSWRlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQuU2V0VmFsdWUoY29waWVkT2JqZWN0LCBDbG9uZVByb2NlZHVyZShmaWVsZFZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnLkRlaWRlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVidWcuRGVpZGVudCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvcGllZE9iamVjdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlYnVnLkRlaWRlbnQoKTtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihcIlRoZSBvYmplY3QgaXMgdW5rbm93biB0eXBlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEV4dGVuc2lvbnNcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSYW5kb20gcm5nID0gbmV3IFJhbmRvbSgpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU2h1ZmZsZTxUPih0aGlzIElMaXN0PFQ+IGxpc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbiA9IGxpc3QuQ291bnQ7XHJcbiAgICAgICAgICAgIHdoaWxlIChuID4gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbi0tO1xyXG4gICAgICAgICAgICAgICAgaW50IGsgPSBybmcuTmV4dChuICsgMSk7XHJcbiAgICAgICAgICAgICAgICBUIHZhbHVlID0gbGlzdFtrXTtcclxuICAgICAgICAgICAgICAgIGxpc3Rba10gPSBsaXN0W25dO1xyXG4gICAgICAgICAgICAgICAgbGlzdFtuXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgUmFuZG9tRWxlbWVudDxUPih0aGlzIElMaXN0PFQ+IGxpc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IHJuZy5OZXh0KGxpc3QuQ291bnQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdFtlbGVtZW50XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiI3JlZ2lvbiBMaWNlbnNlXHJcbi8qXHJcbk1JVCBMaWNlbnNlXHJcbkNvcHlyaWdodCDCqSAyMDA2IFRoZSBNb25vLlhuYSBUZWFtXHJcblxyXG5BbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXHJcbiNlbmRyZWdpb24gTGljZW5zZVxyXG51c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IFBvaW50MkQgOiBJRXF1YXRhYmxlPFBvaW50MkQ+XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBQb2ludDJEIHplcm9Qb2ludCA9IG5ldyBQb2ludDJEKCk7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFg7XHJcbiAgICAgICAgcHVibGljIGludCBZO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBvaW50MkQgWmVyb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHplcm9Qb2ludDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgUG9pbnQyRChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB4O1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIG1ldGhvZHNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFBvaW50MkQgYSwgUG9pbnQyRCBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuRXF1YWxzKGIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFBvaW50MkQgYSwgUG9pbnQyRCBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICFhLkVxdWFscyhiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhQb2ludDJEIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoWCA9PSBvdGhlci5YKSAmJiAoWSA9PSBvdGhlci5ZKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBFcXVhbHMob2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAob2JqIGlzIFBvaW50MkQpID8gRXF1YWxzKChQb2ludDJEKW9iaikgOiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFggXiBZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcInt7WDp7MH0gWTp7MX19fVwiLCBYLCBZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufVxyXG5cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgc3RhdGljIHB1YmxpYyBjbGFzcyBSYW5kb21TdXBwbGllclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRnVuYzxmbG9hdD4gR2VuZXJhdGV7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IFJhbmdlKGludCBtaW4sIGludCBtYXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpIChHZW5lcmF0ZSgpICogKG1heC1taW4pK21pbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgUmFuZG9tRWxlbWVudDxUPihUW10gYXJyYXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbUmFuZ2UoMCwgYXJyYXkuTGVuZ3RoKV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIiNyZWdpb24gTGljZW5zZVxyXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5Db3B5cmlnaHQgwqkgMjAwNiBUaGUgTW9uby5YbmEgVGVhbVxyXG5cclxuQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xyXG4jZW5kcmVnaW9uIExpY2Vuc2VcclxuXHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkdsb2JhbGl6YXRpb247XHJcbnVzaW5nIFN5c3RlbS5Db21wb25lbnRNb2RlbDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuXHJcbiAgICBwdWJsaWMgc3RydWN0IFJlY3QgOiBJRXF1YXRhYmxlPFJlY3Q+XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZWN0IGVtcHR5UmVjdGFuZ2xlID0gbmV3IFJlY3QoKTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgWDtcclxuICAgICAgICBwdWJsaWMgaW50IFk7XHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aDtcclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodDtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUmVjdCBFbXB0eVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGVtcHR5UmVjdGFuZ2xlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IExlZnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB0aGlzLlg7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgUmlnaHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiAodGhpcy5YICsgdGhpcy5XaWR0aCk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgVG9wXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdGhpcy5ZOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEJvdHRvbVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuICh0aGlzLlkgKyB0aGlzLkhlaWdodCk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBSZWN0KGludCB4LCBpbnQgeSwgaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0geDtcclxuICAgICAgICAgICAgdGhpcy5ZID0geTtcclxuICAgICAgICAgICAgdGhpcy5XaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLkhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShSZWN0IGEsIFJlY3QgYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKGEuWCA9PSBiLlgpICYmIChhLlkgPT0gYi5ZKSAmJiAoYS5XaWR0aCA9PSBiLldpZHRoKSAmJiAoYS5IZWlnaHQgPT0gYi5IZWlnaHQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENvbnRhaW5zKGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKCgodGhpcy5YIDw9IHgpICYmICh4IDwgKHRoaXMuWCArIHRoaXMuV2lkdGgpKSkgJiYgKHRoaXMuWSA8PSB5KSkgJiYgKHkgPCAodGhpcy5ZICsgdGhpcy5IZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKCgodGhpcy5YIDw9IHZhbHVlLlgpICYmICh2YWx1ZS5YIDwgKHRoaXMuWCArIHRoaXMuV2lkdGgpKSkgJiYgKHRoaXMuWSA8PSB2YWx1ZS5ZKSkgJiYgKHZhbHVlLlkgPCAodGhpcy5ZICsgdGhpcy5IZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhQb2ludDJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKCh0aGlzLlggPD0gdmFsdWUuWCkgJiYgKHZhbHVlLlggPCAodGhpcy5YICsgdGhpcy5XaWR0aCkpKSAmJiAodGhpcy5ZIDw9IHZhbHVlLlkpKSAmJiAodmFsdWUuWSA8ICh0aGlzLlkgKyB0aGlzLkhlaWdodCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENvbnRhaW5zKFJlY3QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKCgoKHRoaXMuWCA8PSB2YWx1ZS5YKSAmJiAoKHZhbHVlLlggKyB2YWx1ZS5XaWR0aCkgPD0gKHRoaXMuWCArIHRoaXMuV2lkdGgpKSkgJiYgKHRoaXMuWSA8PSB2YWx1ZS5ZKSkgJiYgKCh2YWx1ZS5ZICsgdmFsdWUuSGVpZ2h0KSA8PSAodGhpcy5ZICsgdGhpcy5IZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oUmVjdCBhLCBSZWN0IGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIShhID09IGIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgT2Zmc2V0KFBvaW50MkQgb2Zmc2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCArPSBvZmZzZXQuWDtcclxuICAgICAgICAgICAgWSArPSBvZmZzZXQuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE9mZnNldChpbnQgb2Zmc2V0WCwgaW50IG9mZnNldFkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYICs9IG9mZnNldFg7XHJcbiAgICAgICAgICAgIFkgKz0gb2Zmc2V0WTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQb2ludDJEIENlbnRlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUG9pbnQyRCgodGhpcy5YICsgdGhpcy5XaWR0aCkgLyAyLCAodGhpcy5ZICsgdGhpcy5IZWlnaHQpIC8gMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluZmxhdGUoaW50IGhvcml6b250YWxWYWx1ZSwgaW50IHZlcnRpY2FsVmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYIC09IGhvcml6b250YWxWYWx1ZTtcclxuICAgICAgICAgICAgWSAtPSB2ZXJ0aWNhbFZhbHVlO1xyXG4gICAgICAgICAgICBXaWR0aCArPSBob3Jpem9udGFsVmFsdWUgKiAyO1xyXG4gICAgICAgICAgICBIZWlnaHQgKz0gdmVydGljYWxWYWx1ZSAqIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0VtcHR5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICgoKCh0aGlzLldpZHRoID09IDApICYmICh0aGlzLkhlaWdodCA9PSAwKSkgJiYgKHRoaXMuWCA9PSAwKSkgJiYgKHRoaXMuWSA9PSAwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhSZWN0IG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMgPT0gb3RoZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBFcXVhbHMob2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAob2JqIGlzIFJlY3QpID8gdGhpcyA9PSAoKFJlY3Qpb2JqKSA6IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcInt7WDp7MH0gWTp7MX0gV2lkdGg6ezJ9IEhlaWdodDp7M319fVwiLCBYLCBZLCBXaWR0aCwgSGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLlggXiB0aGlzLlkgXiB0aGlzLldpZHRoIF4gdGhpcy5IZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSW50ZXJzZWN0cyhSZWN0IHIyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICEocjIuTGVmdCA+IFJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgIHx8IHIyLlJpZ2h0IDwgTGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICB8fCByMi5Ub3AgPiBCb3R0b21cclxuICAgICAgICAgICAgICAgICAgICAgfHwgcjIuQm90dG9tIDwgVG9wXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW50ZXJzZWN0cyhyZWYgUmVjdCB2YWx1ZSwgb3V0IGJvb2wgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gISh2YWx1ZS5MZWZ0ID4gUmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgfHwgdmFsdWUuUmlnaHQgPCBMZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgIHx8IHZhbHVlLlRvcCA+IEJvdHRvbVxyXG4gICAgICAgICAgICAgICAgICAgICB8fCB2YWx1ZS5Cb3R0b20gPCBUb3BcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIE1ldGhvZHNcclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRpbWVTdGFtcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBDdXJyZW50U25hcDtcclxuXHJcbiAgICAgICAgcHVibGljIFRpbWVTdGFtcFNuYXAgR2V0U25hcCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVTdGFtcFNuYXAoQ3VycmVudFNuYXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgdm9pZCBBZHZhbmNlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VycmVudFNuYXAgKz0gZGVsdGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdHJ1Y3QgVGltZVN0YW1wU25hcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBUaW1lU25hcDtcclxuXHJcbiAgICAgICAgcHVibGljIFRpbWVTdGFtcFNuYXAoZmxvYXQgc25hcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRpbWVTbmFwID0gc25hcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIFVuaWNvZGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IFNwYWNlID0gMzI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQga2V5RG93biA9IDQwO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQga2V5TGVmdCA9IDM3O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQga2V5VXAgPSAzODtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGtleVJpZ2h0ID0gMzk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIFVwYXJyb3cyID0gKGNoYXIpMjQ7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgRG93bmFycm93MiA9IChjaGFyKTI1O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIFJpZ2h0YXJyb3cyID0gKGNoYXIpMjY7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgTGVmdGFycm93MiA9IChjaGFyKTI3O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIFVwYXJyb3cgPSAoY2hhcikzMDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBEb3duYXJyb3cgPSAoY2hhcikzMTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBMZWZ0YXJyb3cgPSAoY2hhcikxNztcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBSaWdodGFycm93ID0gKGNoYXIpMTY7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgQXNjaWlHcmlkSG9yID0gKGNoYXIpMTk2O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIEFzY2lpR3JpZFZlciA9IChjaGFyKTE3OTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjaGFyW10gZ3JpZHMgPSBuZXcgY2hhcltdIHtcclxuICAgICAgICAgICAgQXNjaWlHcmlkSG9yLFxyXG4gICAgICAgICAgICBBc2NpaUdyaWRWZXJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY2hhciBBc2NpaUdyaWRVcExlZnQgPSAoY2hhcikyMTc7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjaGFyIEFzY2lpR3JpZFVwUmlnaHQgPSAoY2hhcikgMTkyO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY2hhciBBc2NpaUdyaWRVcFJpZ2h0TGVmdCA9IChjaGFyKTE5MztcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNoYXIgQXNjaWlHcmlkRG93bkxlZnQgPSAoY2hhcikxOTE7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjaGFyIEFzY2lpR3JpZERvd25SaWdodCA9IChjaGFyKTIxODtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNoYXIgQXNjaWlHcmlkRG93blJpZ2h0TGVmdCA9IChjaGFyKTE5NDtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGludCBFc2NhcGUgPSAoY2hhcikyNztcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG4vL3VzaW5nIFN5c3RlbS5EcmF3aW5nO1xyXG51c2luZyBTeXN0ZW0uR2xvYmFsaXphdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIFtTZXJpYWxpemFibGVdXHJcbiAgICBwdWJsaWMgc3RydWN0IFZlY3RvcjJEIDogSUVxdWF0YWJsZTxWZWN0b3IyRD5cclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHplcm9WZWN0b3IgPSBuZXcgVmVjdG9yMkQoMGYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB1bml0VmVjdG9yID0gbmV3IFZlY3RvcjJEKDFmLCAxZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFhWZWN0b3IgPSBuZXcgVmVjdG9yMkQoMWYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB1bml0WVZlY3RvciA9IG5ldyBWZWN0b3IyRCgwZiwgMWYpO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IFg7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IFk7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICAjIHJlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFhJbnQgeyBnZXQgeyByZXR1cm4gKGludClYOyB9IH1cclxuICAgICAgICBwdWJsaWMgaW50IFlJbnQgeyBnZXQgeyByZXR1cm4gKGludClZOyB9IH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0YW50c1xyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFplcm9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB6ZXJvVmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE9uZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRWZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgVW5pdFhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WFZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBVbml0WVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRZVmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRChmbG9hdCB4LCBmbG9hdCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0geDtcclxuICAgICAgICAgICAgdGhpcy5ZID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRChmbG9hdCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgSW50ZXJwb2xhdGVSb3VuZGVkKFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIFZlY3RvcjJEIGVuZFBvc2l0aW9uLCBmbG9hdCByYXRpbylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoc3RhcnRQb3NpdGlvbiAqICgxIC0gcmF0aW8pICsgZW5kUG9zaXRpb24gKiByYXRpbykuUm91bmQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVmVjdG9yMkQgUm91bmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCgoZmxvYXQpTWF0aC5Sb3VuZChYKSwgKGZsb2F0KU1hdGguUm91bmQoWSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBBZGQoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCArPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQWRkKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICsgdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKyB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KCh2MSAqIHYxKSArICh2MiAqIHYyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2UocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAoZmxvYXQpTWF0aC5TcXJ0KCh2MSAqIHYxKSArICh2MiAqIHYyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlU3F1YXJlZChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gKHYxICogdjEpICsgKHYyICogdjIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlU3F1YXJlZChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICh2MSAqIHYxKSArICh2MiAqIHYyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYID0geDtcclxuICAgICAgICAgICAgWSA9IHk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBEaXZpZGUoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC8gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLyB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgRGl2aWRlKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlciwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogZmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEb3QoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERvdChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAob2JqIGlzIFZlY3RvcjJEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRXF1YWxzKChWZWN0b3IyRCl0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFZlY3RvcjJEIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChYID09IG90aGVyLlgpICYmIChZID09IG90aGVyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBSZWZsZWN0KFZlY3RvcjJEIHZlY3RvciwgVmVjdG9yMkQgbm9ybWFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMkQgcmVzdWx0O1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZWZsZWN0KHJlZiBWZWN0b3IyRCB2ZWN0b3IsIHJlZiBWZWN0b3IyRCBub3JtYWwsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFguR2V0SGFzaENvZGUoKSArIFkuR2V0SGFzaENvZGUoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGhTcXVhcmVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoWCAqIFgpICsgKFkgKiBZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNYXgoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHZhbHVlMS5YID4gdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUxLlkgPiB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1heChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCA+IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSA+IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTWluKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh2YWx1ZTEuWCA8IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlMS5ZIDwgdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNaW4ocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggPCB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgPCB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE11bHRpcGx5KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNdWx0aXBseShWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOZWdhdGUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgPSAtdmFsdWUuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5lZ2F0ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTm9ybWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICAgICAgWCAqPSB2YWw7XHJcbiAgICAgICAgICAgIFkgKj0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOb3JtYWxpemUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gdmFsO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHZhbDtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5vcm1hbGl6ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUuWCAqIHZhbDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZS5ZICogdmFsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFN1YnRyYWN0KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFN1YnRyYWN0KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VsdHVyZUluZm8gY3VycmVudEN1bHR1cmUgPSBDdWx0dXJlSW5mby5DdXJyZW50Q3VsdHVyZTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoY3VycmVudEN1bHR1cmUsIFwie3tYOnswfSBZOnsxfX19XCIsIG5ldyBvYmplY3RbXSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlguVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpLCB0aGlzLlkuVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBPcGVyYXRvcnNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAtKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxLlggPT0gdmFsdWUyLlggJiYgdmFsdWUxLlkgPT0gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YICE9IHZhbHVlMi5YIHx8IHZhbHVlMS5ZICE9IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKyhWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKihWZWN0b3IyRCB2YWx1ZSwgZmxvYXQgc2NhbGVGYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKGZsb2F0IHNjYWxlRmFjdG9yLCBWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC8oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAvKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gT3BlcmF0b3JzXHJcbiAgICB9XHJcbn0iLCIvLyBNSVQgTGljZW5zZSAtIENvcHlyaWdodCAoQykgVGhlIE1vbm8uWG5hIFRlYW1cclxuLy8gVGhpcyBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIGRlZmluZWQgaW5cclxuLy8gZmlsZSAnTElDRU5TRS50eHQnLCB3aGljaCBpcyBwYXJ0IG9mIHRoaXMgc291cmNlIGNvZGUgcGFja2FnZS5cclxuXHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkRpYWdub3N0aWNzO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlJ1bnRpbWUuU2VyaWFsaXphdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBzdHJ1Y3QgVmVjdG9yM0QgOiBJRXF1YXRhYmxlPFZlY3RvcjNEPlxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgemVybyA9IG5ldyBWZWN0b3IzRCgwZiwgMGYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCBvbmUgPSBuZXcgVmVjdG9yM0QoMWYsIDFmLCAxZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdW5pdFggPSBuZXcgVmVjdG9yM0QoMWYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdW5pdFkgPSBuZXcgVmVjdG9yM0QoMGYsIDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdW5pdFogPSBuZXcgVmVjdG9yM0QoMGYsIDBmLCAxZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdXAgPSBuZXcgVmVjdG9yM0QoMGYsIDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgZG93biA9IG5ldyBWZWN0b3IzRCgwZiwgLTFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgcmlnaHQgPSBuZXcgVmVjdG9yM0QoMWYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgbGVmdCA9IG5ldyBWZWN0b3IzRCgtMWYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgZm9yd2FyZCA9IG5ldyBWZWN0b3IzRCgwZiwgMGYsIC0xZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgYmFja3dhcmQgPSBuZXcgVmVjdG9yM0QoMGYsIDBmLCAxZik7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgZmxvYXQgWDtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGZsb2F0IFk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBaO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDAsIDAsIDAuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFplcm9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB6ZXJvOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDEsIDEsIDEuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE9uZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIG9uZTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHdpdGggY29tcG9uZW50cyAxLCAwLCAwLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBVbml0WFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRYOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDAsIDEsIDAuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFVuaXRZXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmV0dXJucyBhIDxzZWU+VmVjdG9yMzwvc2VlPiB3aXRoIGNvbXBvbmVudHMgMCwgMCwgMS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgVW5pdFpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBVcFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVwOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIERvd25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBkb3duOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFJpZ2h0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gcmlnaHQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTGVmdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGxlZnQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgRm9yd2FyZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGZvcndhcmQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgQmFja3dhcmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBiYWNrd2FyZDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yM0QoZmxvYXQgeCwgZmxvYXQgeSwgZmxvYXQgeilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHk7XHJcbiAgICAgICAgICAgIHRoaXMuWiA9IHo7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjNEKGZsb2F0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLlogPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yM0QoVmVjdG9yMkQgdmFsdWUsIGZsb2F0IHopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB2YWx1ZS5YO1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB2YWx1ZS5ZO1xyXG4gICAgICAgICAgICB0aGlzLlogPSB6O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIGFkZGl0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmQgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3RvciB0byBhZGQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3RvciB0byBhZGQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIGFkZGl0aW9uLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIEFkZChWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBlcmZvcm1zIHZlY3RvciBhZGRpdGlvbiBvbiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4gYW5kXHJcbiAgICAgICAgLy8vIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUyXCIvPiwgc3RvcmluZyB0aGUgcmVzdWx0IG9mIHRoZVxyXG4gICAgICAgIC8vLyBhZGRpdGlvbiBpbiA8cGFyYW1yZWYgbmFtZT1cInJlc3VsdFwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSByZXN1bHQgb2YgdGhlIHZlY3RvciBhZGRpdGlvbi48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBZGQocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSArIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aICsgdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBDcm9zcyhWZWN0b3IzRCB2ZWN0b3IxLCBWZWN0b3IzRCB2ZWN0b3IyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3Jvc3MocmVmIHZlY3RvcjEsIHJlZiB2ZWN0b3IyLCBvdXQgdmVjdG9yMSk7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWN0b3IxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIENyb3NzKHJlZiBWZWN0b3IzRCB2ZWN0b3IxLCByZWYgVmVjdG9yM0QgdmVjdG9yMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gdmVjdG9yMS5ZICogdmVjdG9yMi5aIC0gdmVjdG9yMi5ZICogdmVjdG9yMS5aO1xyXG4gICAgICAgICAgICB2YXIgeSA9IC0odmVjdG9yMS5YICogdmVjdG9yMi5aIC0gdmVjdG9yMi5YICogdmVjdG9yMS5aKTtcclxuICAgICAgICAgICAgdmFyIHogPSB2ZWN0b3IxLlggKiB2ZWN0b3IyLlkgLSB2ZWN0b3IyLlggKiB2ZWN0b3IxLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0geDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB5O1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlKFZlY3RvcjNEIHZlY3RvcjEsIFZlY3RvcjNEIHZlY3RvcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCByZXN1bHQ7XHJcbiAgICAgICAgICAgIERpc3RhbmNlU3F1YXJlZChyZWYgdmVjdG9yMSwgcmVmIHZlY3RvcjIsIG91dCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguU3FydChyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHZhbHVlMSwgcmVmIHZhbHVlMiwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IChmbG9hdClNYXRoLlNxcnQocmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2VTcXVhcmVkKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHZhbHVlMSwgcmVmIHZhbHVlMiwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2VTcXVhcmVkKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQgPSAodmFsdWUxLlggLSB2YWx1ZTIuWCkgKiAodmFsdWUxLlggLSB2YWx1ZTIuWCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAodmFsdWUxLlkgLSB2YWx1ZTIuWSkgKiAodmFsdWUxLlkgLSB2YWx1ZTIuWSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAodmFsdWUxLlogLSB2YWx1ZTIuWikgKiAodmFsdWUxLlogLSB2YWx1ZTIuWik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIERpdmlkZShWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIERpdmlkZShWZWN0b3IzRCB2YWx1ZTEsIGZsb2F0IHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyB2YWx1ZTI7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIGZsb2F0IGRpdmlzb3IsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aXNvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAqIGZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAvIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aIC8gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERvdChWZWN0b3IzRCB2ZWN0b3IxLCBWZWN0b3IzRCB2ZWN0b3IyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZlY3RvcjEuWCAqIHZlY3RvcjIuWCArIHZlY3RvcjEuWSAqIHZlY3RvcjIuWSArIHZlY3RvcjEuWiAqIHZlY3RvcjIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEb3QocmVmIFZlY3RvcjNEIHZlY3RvcjEsIHJlZiBWZWN0b3IzRCB2ZWN0b3IyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdmVjdG9yMS5YICogdmVjdG9yMi5YICsgdmVjdG9yMS5ZICogdmVjdG9yMi5ZICsgdmVjdG9yMS5aICogdmVjdG9yMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIShvYmogaXMgVmVjdG9yM0QpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdmFyIG90aGVyID0gKFZlY3RvcjNEKW9iajtcclxuICAgICAgICAgICAgcmV0dXJuIFggPT0gb3RoZXIuWCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFkgPT0gb3RoZXIuWSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFogPT0gb3RoZXIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhWZWN0b3IzRCBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBYID09IG90aGVyLlggJiZcclxuICAgICAgICAgICAgICAgICAgICBZID09IG90aGVyLlkgJiZcclxuICAgICAgICAgICAgICAgICAgICBaID09IG90aGVyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KSh0aGlzLlggKyB0aGlzLlkgKyB0aGlzLlopO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGgoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHRoaXMsIHJlZiB6ZXJvLCBvdXQgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLlNxcnQocmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGhTcXVhcmVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHJlc3VsdDtcclxuICAgICAgICAgICAgRGlzdGFuY2VTcXVhcmVkKHJlZiB0aGlzLCByZWYgemVybywgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE11bHRpcGx5KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTXVsdGlwbHkoVmVjdG9yM0QgdmFsdWUxLCBmbG9hdCBzY2FsZUZhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlogKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjNEIHZhbHVlMSwgZmxvYXQgc2NhbGVGYWN0b3IsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAqIHZhbHVlMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHBvaW50aW5nIGluIHRoZSBvcHBvc2l0ZVxyXG4gICAgICAgIC8vLyBkaXJlY3Rpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2ZWN0b3IgdG8gbmVnYXRlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSB2ZWN0b3IgbmVnYXRpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4uPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTmVnYXRlKFZlY3RvcjNEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBuZXcgVmVjdG9yM0QoLXZhbHVlLlgsIC12YWx1ZS5ZLCAtdmFsdWUuWik7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gU3RvcmVzIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHBvaW50aW5nIGluIHRoZSBvcHBvc2l0ZVxyXG4gICAgICAgIC8vLyBkaXJlY3Rpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4gaW4gPHBhcmFtcmVmIG5hbWU9XCJyZXN1bHRcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmVjdG9yIHRvIG5lZ2F0ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSB2ZWN0b3IgdGhhdCB0aGUgbmVnYXRpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4gd2lsbCBiZSBzdG9yZWQgaW4uPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTmVnYXRlKHJlZiBWZWN0b3IzRCB2YWx1ZSwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gLXZhbHVlLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBOb3JtYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTm9ybWFsaXplKHJlZiB0aGlzLCBvdXQgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE5vcm1hbGl6ZShWZWN0b3IzRCB2ZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOb3JtYWxpemUocmVmIHZlY3Rvciwgb3V0IHZlY3Rvcik7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTm9ybWFsaXplKHJlZiBWZWN0b3IzRCB2YWx1ZSwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvcjtcclxuICAgICAgICAgICAgRGlzdGFuY2UocmVmIHZhbHVlLCByZWYgemVybywgb3V0IGZhY3Rvcik7XHJcbiAgICAgICAgICAgIGZhY3RvciA9IDFmIC8gZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlLlggKiBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUuWSAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZS5aICogZmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBSZWZsZWN0KFZlY3RvcjNEIHZlY3RvciwgVmVjdG9yM0Qgbm9ybWFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gSSBpcyB0aGUgb3JpZ2luYWwgYXJyYXlcclxuICAgICAgICAgICAgLy8gTiBpcyB0aGUgbm9ybWFsIG9mIHRoZSBpbmNpZGVudCBwbGFuZVxyXG4gICAgICAgICAgICAvLyBSID0gSSAtICgyICogTiAqICggRG90UHJvZHVjdFsgSSxOXSApKVxyXG4gICAgICAgICAgICBWZWN0b3IzRCByZWZsZWN0ZWRWZWN0b3I7XHJcbiAgICAgICAgICAgIC8vIGlubGluZSB0aGUgZG90UHJvZHVjdCBoZXJlIGluc3RlYWQgb2YgY2FsbGluZyBtZXRob2RcclxuICAgICAgICAgICAgZmxvYXQgZG90UHJvZHVjdCA9ICgodmVjdG9yLlggKiBub3JtYWwuWCkgKyAodmVjdG9yLlkgKiBub3JtYWwuWSkpICsgKHZlY3Rvci5aICogbm9ybWFsLlopO1xyXG4gICAgICAgICAgICByZWZsZWN0ZWRWZWN0b3IuWCA9IHZlY3Rvci5YIC0gKDIuMGYgKiBub3JtYWwuWCkgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgICAgICByZWZsZWN0ZWRWZWN0b3IuWSA9IHZlY3Rvci5ZIC0gKDIuMGYgKiBub3JtYWwuWSkgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgICAgICByZWZsZWN0ZWRWZWN0b3IuWiA9IHZlY3Rvci5aIC0gKDIuMGYgKiBub3JtYWwuWikgKiBkb3RQcm9kdWN0O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlZmxlY3RlZFZlY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZWZsZWN0KHJlZiBWZWN0b3IzRCB2ZWN0b3IsIHJlZiBWZWN0b3IzRCBub3JtYWwsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBJIGlzIHRoZSBvcmlnaW5hbCBhcnJheVxyXG4gICAgICAgICAgICAvLyBOIGlzIHRoZSBub3JtYWwgb2YgdGhlIGluY2lkZW50IHBsYW5lXHJcbiAgICAgICAgICAgIC8vIFIgPSBJIC0gKDIgKiBOICogKCBEb3RQcm9kdWN0WyBJLE5dICkpXHJcblxyXG4gICAgICAgICAgICAvLyBpbmxpbmUgdGhlIGRvdFByb2R1Y3QgaGVyZSBpbnN0ZWFkIG9mIGNhbGxpbmcgbWV0aG9kXHJcbiAgICAgICAgICAgIGZsb2F0IGRvdFByb2R1Y3QgPSAoKHZlY3Rvci5YICogbm9ybWFsLlgpICsgKHZlY3Rvci5ZICogbm9ybWFsLlkpKSArICh2ZWN0b3IuWiAqIG5vcm1hbC5aKTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2ZWN0b3IuWCAtICgyLjBmICogbm9ybWFsLlgpICogZG90UHJvZHVjdDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2ZWN0b3IuWSAtICgyLjBmICogbm9ybWFsLlkpICogZG90UHJvZHVjdDtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2ZWN0b3IuWiAtICgyLjBmICogbm9ybWFsLlopICogZG90UHJvZHVjdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIHN1YnRyYWN0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmQgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIHZlY3RvciB0byBiZSBzdWJ0cmFjdGVkIGZyb20uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgdmVjdG9yIHRvIGJlIHN1YnRyYWN0ZWQgZnJvbSA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIHN1YnRyYWN0aW9uLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFN1YnRyYWN0KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAtPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIHN1YnRyYWN0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmQgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIHZlY3RvciB0byBiZSBzdWJ0cmFjdGVkIGZyb20uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgdmVjdG9yIHRvIGJlIHN1YnRyYWN0ZWQgZnJvbSA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIHRoZSB2ZWN0b3Igc3VidHJhY3Rpb24uPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU3VidHJhY3QocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aIC0gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdHJpbmcgRGVidWdEaXNwbGF5U3RyaW5nXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Db25jYXQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YLlRvU3RyaW5nKCksIFwiICBcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlkuVG9TdHJpbmcoKSwgXCIgIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWi5Ub1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIgc2IgPSBuZXcgU3RyaW5nQnVpbGRlcigzMik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIntYOlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKHRoaXMuWCk7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIiBZOlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKHRoaXMuWSk7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIiBaOlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKHRoaXMuWik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIn1cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBzYi5Ub1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvLy8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8vLyBUcmFuc2Zvcm1zIGEgdmVjdG9yIGJ5IGEgcXVhdGVybmlvbiByb3RhdGlvbi5cclxuICAgICAgICAvLy8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vLy8gPHBhcmFtIG5hbWU9XCJ2ZWNcIj5UaGUgdmVjdG9yIHRvIHRyYW5zZm9ybS48L3BhcmFtPlxyXG4gICAgICAgIC8vLy8vIDxwYXJhbSBuYW1lPVwicXVhdFwiPlRoZSBxdWF0ZXJuaW9uIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIGJ5LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIHRoZSBvcGVyYXRpb24uPC9wYXJhbT5cclxuICAgICAgICAvLyAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFRyYW5zZm9ybShyZWYgVmVjdG9yMyB2ZWMsIHJlZiBRdWF0ZXJuaW9uIHF1YXQsIG91dCBWZWN0b3IzIHJlc3VsdClcclxuICAgICAgICAvLyAgICAgICAge1xyXG4gICAgICAgIC8vXHRcdC8vIFRha2VuIGZyb20gdGhlIE9wZW50VEsgaW1wbGVtZW50YXRpb24gb2YgVmVjdG9yM1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gU2luY2UgdmVjLlcgPT0gMCwgd2UgY2FuIG9wdGltaXplIHF1YXQgKiB2ZWMgKiBxdWF0Xi0xIGFzIGZvbGxvd3M6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyB2ZWMgKyAyLjAgKiBjcm9zcyhxdWF0Lnh5eiwgY3Jvc3MocXVhdC54eXosIHZlYykgKyBxdWF0LncgKiB2ZWMpXHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzIHh5eiA9IHF1YXQuWHl6LCB0ZW1wLCB0ZW1wMjtcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMuQ3Jvc3MocmVmIHh5eiwgcmVmIHZlYywgb3V0IHRlbXApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMy5NdWx0aXBseShyZWYgdmVjLCBxdWF0LlcsIG91dCB0ZW1wMik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkFkZChyZWYgdGVtcCwgcmVmIHRlbXAyLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkNyb3NzKHJlZiB4eXosIHJlZiB0ZW1wLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLk11bHRpcGx5KHJlZiB0ZW1wLCAyLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkFkZChyZWYgdmVjLCByZWYgdGVtcCwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgbWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBPcGVyYXRvcnNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YID09IHZhbHVlMi5YXHJcbiAgICAgICAgICAgICAgICAmJiB2YWx1ZTEuWSA9PSB2YWx1ZTIuWVxyXG4gICAgICAgICAgICAgICAgJiYgdmFsdWUxLlogPT0gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gISh2YWx1ZTEgPT0gdmFsdWUyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgKyhWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yIC0oVmVjdG9yM0QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBWZWN0b3IzRCgtdmFsdWUuWCwgLXZhbHVlLlksIC12YWx1ZS5aKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAtKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAtPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgKihWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKj0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yICooVmVjdG9yM0QgdmFsdWUsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWiAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAqKGZsb2F0IHNjYWxlRmFjdG9yLCBWZWN0b3IzRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlogKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgLyhWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yIC8oVmVjdG9yM0QgdmFsdWUsIGZsb2F0IGRpdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aWRlcjtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5aICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZURhdGFcclxuICAgIHtcclxuICAgICAgICBzdHJpbmcgbGFiZWw7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxUaWNrPiB1bml0cyA9IG5ldyBMaXN0PFRpY2s+KCk7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxpbnQ+IHRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlRGF0YShzdHJpbmcgbGFiZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZURhdGEoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEZpbmRCeUxhYmVsKExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcywgc3RyaW5nIGxhYmVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBtb3ZlRGF0YXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYobW92ZURhdGFzW2ldIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtb3ZlRGF0YXNbaV0ubGFiZWwgPT0gbGFiZWwpIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSGFzVGFnKGludCB0YWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFncy5Db250YWlucyh0YWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGljayBcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBDb25kaXRpb24gY29uZGl0aW9uO1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8b2JqZWN0PiB0aGluZ3NUb0hhcHBlbiA9IG5ldyBMaXN0PG9iamVjdD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIFRpY2sob2JqZWN0IGFjdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaW5nc1RvSGFwcGVuLkFkZChhY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRpY2sob2JqZWN0W10gYWN0aW9ucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaW5nc1RvSGFwcGVuLkFkZFJhbmdlKGFjdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xhc3MgQ29uZGl0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgcmVhZG9ubHkgQ29uZGl0aW9uVHlwZSB0eXBlO1xyXG4gICAgICAgIGludGVybmFsIHJlYWRvbmx5IFRhcmdldCB0YXJnZXQ7XHJcbiAgICAgICAgaW50ZXJuYWwgcmVhZG9ubHkgQmFzZVV0aWxzLlZlY3RvcjJEIHZlY3RvcjtcclxuXHJcbiAgICAgICAgcHVibGljIENvbmRpdGlvbihDb25kaXRpb25UeXBlIHR5cGUsIFRhcmdldCB0YXJnZXQsIEJhc2VVdGlscy5WZWN0b3IyRCB2ZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy52ZWN0b3IgPSB2ZWN0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIENvbmRpdGlvblR5cGVcclxuICAgIHtcclxuICAgICAgICBDYW5Nb3ZlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFN1bW1vbkVudGl0eVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgZW5lbXlXaGljaDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVmVjdG9yMkQgcHJlZmVyZW50aWFsUm93Q29sdW1uO1xyXG5cclxuICAgICAgICBwdWJsaWMgU3VtbW9uRW50aXR5KGludCBlbmVteVdoaWNoLCBWZWN0b3IyRCBwcmVmZXJlbnRpYWxSb3dDb2x1bW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15V2hpY2ggPSBlbmVteVdoaWNoO1xyXG4gICAgICAgICAgICB0aGlzLnByZWZlcmVudGlhbFJvd0NvbHVtbiA9IHByZWZlcmVudGlhbFJvd0NvbHVtbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHN0YXRpYyBTdW1tb25FbnRpdHkgRW5lbXkoaW50IHYsIFZlY3RvcjJEIHZlY3RvcjJEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTdW1tb25FbnRpdHkodiwgdmVjdG9yMkQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFuaW1hdGlvblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBBcmVhIGFyZWEgPSBudWxsO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmU7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFRhcmdldCB0YXJnZXQgPSBUYXJnZXQuTm9uZTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIEFuaW1hdGlvbihUYXJnZXQgdGFyZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3B1YmxpYyBBbmltYXRpb24oQXJlYSBhcmVhKVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vICAgIHRoaXMuYXJlYSA9IGFyZWE7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbmltYXRpb24oVGFyZ2V0IHRhcmdldCwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQW5pbWF0aW9uKEFyZWEgYXJlYSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50ID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lLCBUYXJnZXQgdGFyZ2V0ID0gVGFyZ2V0Lk5vbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSBhcmVhO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdmVBY3Rpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQmFzZVV0aWxzLlZlY3RvcjJEIGRpc3RhbmNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZUFjdGlvbihUYXJnZXQgdGFyZ2V0LCBCYXNlVXRpbHMuVmVjdG9yMkQgYW1vdW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzdGFuY2UgPSBhbW91bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBEZWFsRGFtYWdlQWN0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFRhcmdldCB0YXJnZXQgPSBUYXJnZXQuTm9uZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQXJlYSBhcmVhO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgZGFtYWdlO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBEZWFsRGFtYWdlQWN0aW9uKEFyZWEgYXJlYSwgaW50IGRhbWFnZSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IFRhcmdldC5BcmVhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERlYWxEYW1hZ2VBY3Rpb24oVGFyZ2V0IHRhcmdldCwgaW50IGRhbWFnZSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQXJlYVxyXG4gICAge1xyXG4gICAgICAgIC8vcHVibGljIHJlYWRvbmx5IEFyZWEgYXJlYTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgTGlzdDxWZWN0b3IyRD4gcG9pbnRzID0gbmV3IExpc3Q8VmVjdG9yMkQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBcmVhKFRhcmdldCB0YXJnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gVGFyZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgTm9uZSwgIFNlbGYsIENsb3Nlc3RUYXJnZXQsIENsb3Nlc3RUYXJnZXRYLCBBcmVhICAgXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXN5bmNUYXNrc1xyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQXN5bmNUcmFja1xyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgRGVsYXllZEFjdGlvbnNcclxuICAgIHtcclxuICAgICAgICBMaXN0PGZsb2F0PiB0aW1lcyA9IG5ldyBMaXN0PGZsb2F0PigpO1xyXG4gICAgICAgIExpc3Q8SUxpc3Q+IGxpc3RzID0gbmV3IExpc3Q8SUxpc3Q+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdGltZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZXNbaV0gLT0gZGVsdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGltZXNbaV0gPD0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFeGVjdXRlKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVuZFRhc2soaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGFic3RyYWN0IHZvaWQgRXhlY3V0ZShpbnQgaSk7XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWRkKGZsb2F0IHRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aW1lcy5BZGQodGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0RvbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRpbWVzLkNvdW50ID09IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEVuZFRhc2soaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aW1lcy5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGwgaW4gbGlzdHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGwuUmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFzeW5jVGFza1NldHRlcjxUPiA6IERlbGF5ZWRBY3Rpb25zXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxUPiBUb1ZhbHVlID0gbmV3IExpc3Q8VD4oKTtcclxuICAgICAgICBMaXN0PEFjdGlvbjxUPj4gc2V0dGVycyA9IG5ldyBMaXN0PEFjdGlvbjxUPj4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKFQgZSwgQWN0aW9uPFQ+IHNldHRlciwgZmxvYXQgdGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRvVmFsdWUuQWRkKGUpO1xyXG4gICAgICAgICAgICBzZXR0ZXJzLkFkZCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPFQ+KXNldHRlcik7XHJcbiAgICAgICAgICAgIGJhc2UuQWRkKHRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgb3ZlcnJpZGUgdm9pZCBFeGVjdXRlKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0dGVyc1tpXShUb1ZhbHVlW2ldKTtcclxuICAgICAgICAgICAgVG9WYWx1ZS5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgc2V0dGVycy5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmF0dGxlU2V0dXBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgcHVibGljIEJhdHRsZU1haW4gYmF0dGxlTWFpbjtcclxuICAgICAgICBwdWJsaWMgTW92ZUNyZWF0b3JQcm9nIG1vdmVDcmVhdG9yO1xyXG4gICAgICAgIHB1YmxpYyBUaW1lU3RhbXAgdGltZVN0YW1wO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlU2V0dXAoaW50IG1vZGUsIEVudGl0eSBzdGFnZUVudGl0eSwgRUNTTWFuYWdlciBlY3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuICAgICAgICAgICAgdGltZVN0YW1wID0gbmV3IFRpbWVTdGFtcCgpO1xyXG4gICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudCh0aW1lU3RhbXApO1xyXG4gICAgICAgICAgICBiYXR0bGVNYWluID0gbmV3IEJhdHRsZU1haW4obW9kZSwgZWNzLCB0aW1lU3RhbXApO1xyXG4gICAgICAgICAgICBtb3ZlQ3JlYXRvciA9IG5ldyBNb3ZlQ3JlYXRvclByb2coZWNzKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhZ2VzID0gZWNzLlF1aWNrQWNjZXNzb3IxPFN0YWdlRGF0YT4oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaXhlZEF0dGFjayA9IHN0YWdlRW50aXR5LkdldENvbXBvbmVudDxGaXhlZEF0dGFja1N0YWdlPigpO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVySGFuZFBvb2wgPSBiYXR0bGVNYWluLnBsYXllckhhbmRQb29sO1xyXG4gICAgICAgICAgICBpZiAoZml4ZWRBdHRhY2sgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGZpeGVkQXR0YWNrLm1vdmVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZCgoQmF0dGxlTWFpbi5Nb3ZlVHlwZSlpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpO1xyXG4gICAgICAgICAgICAgICAgLy9wbGF5ZXJIYW5kUG9vbC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlKTtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkljZSk7XHJcbiAgICAgICAgICAgICAgICAvL3BsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkljZSk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kUG9vbC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyKTtcclxuICAgICAgICAgICAgICAgIC8vcGxheWVySGFuZFBvb2wuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlcik7XHJcbiAgICAgICAgICAgICAgICAvL3BsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIpO1xyXG4gICAgICAgICAgICAgICAgLy9wbGF5ZXJIYW5kUG9vbC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyQm9tYik7XHJcbiAgICAgICAgICAgICAgICAvL3BsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkRvd25GaXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc3RhZ2UgPSBzdGFnZUVudGl0eS5HZXRDb21wb25lbnQ8U3RhZ2VEYXRhPigpO1xyXG4gICAgICAgICAgICB2YXIgZW5teXMgPSBzdGFnZS5lbmVteVNwYXducztcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gZW5teXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBiYXR0bGVNYWluLk1vdmVEYXRhRXhlY3V0ZXIgPSBuZXcgTW92ZURhdGFFeGVjdXRlcihiYXR0bGVNYWluLCBtb3ZlQ3JlYXRvci5tb3ZlRGF0YXMsIGVjcywgdGltZVN0YW1wKTtcclxuXHJcbiAgICAgICAgICAgIExpc3Q8c3RyaW5nPiBlbnRpdHlSZW5kZXJUZXh0cyA9IG5ldyBMaXN0PHN0cmluZz4oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlbmVteURhdGFzID0gbmV3IEVuZW15RGF0YUNyZWF0b3IoZW50aXR5UmVuZGVyVGV4dHMsIG1vdmVDcmVhdG9yKS5lbmVteURhdGFzO1xyXG4gICAgICAgICAgICB2YXIgYmF0dGxlU3RhdGUgPSBiYXR0bGVNYWluLmJhdHRsZVN0YXRlO1xyXG5cclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5CYXR0bGVDb25maWd1cmUoc3RhZ2UuYmF0dGxlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlbmVteUZhY3RvcnkgPSBuZXcgU3Bhd25FbnRpdHlGYWN0b3J5KGVjcywgZW5lbXlEYXRhcywgYmF0dGxlTWFpbik7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uZWNzSW50ZWcgPSBuZXcgRUNTSW50ZWdyYXRpb24oZW5lbXlGYWN0b3J5LCBlY3MpO1xyXG4gICAgICAgICAgICAvL2JhdHRsZU1haW4uRW5lbXlGYWN0b3J5ID0gZW5lbXlGYWN0b3J5O1xyXG5cclxuICAgICAgICAgICAgeyAvL0FJIGhhbmRsaW5nIGNvZGVcclxuICAgICAgICAgICAgICAgIHZhciBlbmVteUFpcyA9IGVjcy5RdWlja0FjY2Vzc29yMjxFbmVteUFJLCBCYXR0bGVNYWluLkJhdHRsZUVudGl0eT4oKTtcclxuICAgICAgICAgICAgICAgIHZhciBlbmVteUFpU3RhdGVsZXNzID0gZWNzLkNyZWF0ZUFjY2Vzc29yKG5lY2Vzc2FyeTogbmV3IFR5cGVbXSB7IHR5cGVvZihFbmVteUFJKSB9LCBub3Q6IG5ldyBUeXBlW10geyB0eXBlb2YoRW5lbXlBSVN0YXRlKSB9KTtcclxuICAgICAgICAgICAgICAgIExpc3Q8aW50PiBwb3NzaWJsZU1vdmVzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vdmVEYXRhcyA9IG1vdmVDcmVhdG9yLm1vdmVEYXRhcztcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBiYXR0bGVNYWluLkVuZW15R2VuZXJhdGVNb3ZlcyA9ICgpID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGVuZW15QWlTdGF0ZWxlc3MuTGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZW15QWlTdGF0ZWxlc3MuR2V0KDApLkFkZENvbXBvbmVudDxFbmVteUFJU3RhdGU+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGVuZW15QWlzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFpID0gZW5lbXlBaXMuQ29tcDEoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiYXR0bGVyID0gZW5lbXlBaXMuQ29tcDIoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhaVN0YXRlID0gZW5lbXlBaXMuRW50aXR5KGkpLkdldENvbXBvbmVudDxFbmVteUFJU3RhdGU+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb3ZlcyA9IGFpLm1vdmVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zUyA9IGJhdHRsZXIucG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2U7IGorKylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50IGFpUHJvID0gKGogKyBhaVN0YXRlLnByb2dyZXNzKSAlIG1vdmVzLkNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmUgPSBtb3Zlc1thaVByb107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnQgbW92ZUlkID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92ZSBpcyBNb3ZlVXNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVJZCA9IChtb3ZlIGFzIE1vdmVVc2UpLm1vdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92ZSBpcyBTcGVjaWFsRW5lbXlNb3ZlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IChTcGVjaWFsRW5lbXlNb3Zlcyltb3ZlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtID09IFNwZWNpYWxFbmVteU1vdmVzLlNtYXJ0TW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NzaWJsZU1vdmVzLkNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkyID0gMDsgaTIgPCBtb3ZlRGF0YXMuQ291bnQ7IGkyKyspIC8vY29kZSB0byBhZGQgbW92ZW1lbnQgbW92ZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhZ3MgPSBtb3ZlRGF0YXNbaTJdLnRhZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFncy5Db250YWlucygoaW50KU1vdmVEYXRhVGFncy5Nb3ZlbWVudCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCB2YWxpZE1vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cyA9IG1vdmVEYXRhc1tpMl0udW5pdHM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRoaW5ncyA9IGl0ZW0udGhpbmdzVG9IYXBwZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0aGluZyBpbiB0aGluZ3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGluZyBpcyBNb3ZlQWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYSA9IHRoaW5nIGFzIE1vdmVBY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpcyA9IG1hLmRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0UG9zID0gcG9zUyArIGRpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVzdFBvcy5YIDwgMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZE1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RQb3MuWCA+IDUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZE1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RQb3MuWSA8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZE1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RQb3MuWSA+IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZE1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodmFsaWRNb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NzaWJsZU1vdmVzLkFkZChpMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUlkID0gUGlkcm9oLkJhc2VVdGlscy5FeHRlbnNpb25zLlJhbmRvbUVsZW1lbnQ8aW50Pihwb3NzaWJsZU1vdmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShtb3ZlSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb3ZlSWQgPj0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVyLm1vdmVzW2pdID0gbW92ZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZCA9IG1vdmVDcmVhdG9yLm1vdmVEYXRhc1ttb3ZlSWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cyA9IG1kLnVuaXRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRoaW5ncyA9IGl0ZW0udGhpbmdzVG9IYXBwZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0aGluZyBpbiB0aGluZ3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGluZyBpcyBNb3ZlQWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYSA9IHRoaW5nIGFzIE1vdmVBY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpcyA9IG1hLmRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc1MgKz0gZGlzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9iZS5tb3Zlc1tqXSA9IDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFpU3RhdGUucHJvZ3Jlc3MgKz0gYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBkYXRhIHRoYXQgd2lsbCBiZSBhIHBhcnQgb2Ygc3RhZ2VkYXRhIHNvIGVhY2ggc3RhZ2UgY2FuIGhhdmUgaXQncyBjb25maWdcclxuICAgIC8vLyBJdCB3aWxsIGFsc28gYmUgY29udGFpbmVkIGluIGJhdHRsZW1haW4uXHJcbiAgICAvLy8gU2hvdWxkIGJlIHN0YXRpYywgb25jZSBjcmVhdGVkLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVDb25maWdcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgTGlzdDxpbnQ+IGVuZW1pZXNUb1N1bW1vbiA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBuZWVkS2lsbEFsbEVuZW1pZXMgPSB0cnVlO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnKGludFtdIGVuZW1pZXNUb1N1bW1vbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllc1RvU3VtbW9uLkFkZFJhbmdlKGVuZW1pZXNUb1N1bW1vbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnKGJvb2wgbmVlZEtpbGxBbGxFbmVtaWVzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5uZWVkS2lsbEFsbEVuZW1pZXMgPSBuZWVkS2lsbEFsbEVuZW1pZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5IYXBwcztcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQmF0dGxlTWFpblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PEJhdHRsZUVudGl0eT4gZW50aXRpZXMgPSBuZXcgTGlzdDxCYXR0bGVFbnRpdHk+KCk7XHJcbiAgICAgICAgcHVibGljIEJhdHRsZVN0YXRlIGJhdHRsZVN0YXRlID0gbmV3IEJhdHRsZVN0YXRlKCk7XHJcbiAgICAgICAgcHVibGljIEhhcHBNYW5hZ2VyIGhhcHBNYW5hZ2VyID0gbmV3IEhhcHBNYW5hZ2VyKCk7XHJcbiAgICAgICAgRGljdGlvbmFyeTxNb3ZlVHlwZSwgVmVjdG9yMkQ+IG1vdmVtZW50TW92ZXMgPSBuZXcgRGljdGlvbmFyeTxNb3ZlVHlwZSwgVmVjdG9yMkQ+KCk7XHJcbiAgICAgICAgLy9EaWN0aW9uYXJ5PE1vdmVUeXBlLCBQb2ludD4gYXR0YWNrTW92ZXMgPSBuZXcgRGljdGlvbmFyeTxNb3ZlVHlwZSwgUG9pbnQ+KCk7XHJcbiAgICAgICAgTW92ZVR5cGVbXSBlbmVteU1vdmVzO1xyXG4gICAgICAgIC8vcHVibGljIExpc3Q8SW5wdXQ+IGlucHV0cyA9IG5ldyBMaXN0PFR1cm5iYXNlZC5JbnB1dD4oKTtcclxuICAgICAgICBwdWJsaWMgSW5wdXRIb2xkZXIgaW5wdXRzID0gbmV3IElucHV0SG9sZGVyKCk7XHJcbiAgICAgICAgcHVibGljIExpc3Q8TW92ZVR5cGU+IHBsYXllckhhbmRGaXhlZCA9IG5ldyBMaXN0PE1vdmVUeXBlPigpO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PE1vdmVUeXBlPiBwbGF5ZXJIYW5kVW5maXhlZCA9IG5ldyBMaXN0PE1vdmVUeXBlPigpO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PE1vdmVUeXBlPiBwbGF5ZXJIYW5kUG9vbCA9IG5ldyBMaXN0PE1vdmVUeXBlPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgdGltZVRvQ2hvb3NlTWF4ID0gMTVmO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCB0aW1lVG9DaG9vc2UgPSAtMTtcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZVJlc3VsdCBiYXR0bGVSZXN1bHQgPSBuZXcgQmF0dGxlUmVzdWx0KCk7XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQmF0dGxlQ29uZmlndXJlKEJhdHRsZUNvbmZpZyBiYXR0bGVDb25maWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYmF0dGxlQ29uZmlnID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhdHRsZUNvbmZpZyA9IG5ldyBCYXR0bGVDb25maWcobmVlZEtpbGxBbGxFbmVtaWVzOiB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkJhdHRsZUNvbmZpZyA9IGJhdHRsZUNvbmZpZztcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZS5WYWwgPSAzO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludCBuRW5lbWllcztcclxuICAgICAgICBwdWJsaWMgTW92ZURhdGFFeGVjdXRlciBNb3ZlRGF0YUV4ZWN1dGVyO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgVGltZVN0YW1wIHRpbWVTdGFtcDtcclxuICAgICAgICBwcml2YXRlIFF1aWNrQWNjZXNzb3JUd288QmF0dGxlRW50aXR5LCBQaWNrdXBJbmZvPiBwaWNrdXBBY2Nlc3NvcjtcclxuICAgICAgICBpbnRlcm5hbCBFQ1NJbnRlZ3JhdGlvbiBlY3NJbnRlZztcclxuXHJcbiAgICAgICAgcHVibGljIEFjdGlvbiBFbmVteUdlbmVyYXRlTW92ZXM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVDb25maWcgQmF0dGxlQ29uZmlnIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQm9hcmRXaWR0aCB7IGdldDsgaW50ZXJuYWwgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBCb2FyZEhlaWdodCB7IGdldDsgaW50ZXJuYWwgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVNYWluKGludCBtb2RlLCBFQ1NNYW5hZ2VyIGVjcywgVGltZVN0YW1wIHRpbWVTdGFtcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIHRoaXMudGltZVN0YW1wID0gdGltZVN0YW1wO1xyXG4gICAgICAgICAgICBwaWNrdXBBY2Nlc3NvciA9IGVjcy5RdWlja0FjY2Vzc29yMjxCYXR0bGVFbnRpdHksIFBpY2t1cEluZm8+KCk7XHJcbiAgICAgICAgICAgIG1vdmVtZW50TW92ZXMuQWRkKE1vdmVUeXBlLk1vdmVVcCwgVmVjdG9yMkQuVW5pdFkpO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlRG93biwgLVZlY3RvcjJELlVuaXRZKTtcclxuICAgICAgICAgICAgbW92ZW1lbnRNb3Zlcy5BZGQoTW92ZVR5cGUuTW92ZUxlZnQsIC1WZWN0b3IyRC5Vbml0WCk7XHJcbiAgICAgICAgICAgIG1vdmVtZW50TW92ZXMuQWRkKE1vdmVUeXBlLk1vdmVSaWdodCwgVmVjdG9yMkQuVW5pdFgpO1xyXG5cclxuICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQoYmF0dGxlU3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgcGxheWVySGFuZEZpeGVkLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIHBsYXllckhhbmRGaXhlZC5BZGQoTW92ZVR5cGUuTW92ZVJpZ2h0KTtcclxuICAgICAgICAgICAgcGxheWVySGFuZEZpeGVkLkFkZChNb3ZlVHlwZS5Nb3ZlTGVmdCk7XHJcbiAgICAgICAgICAgIHBsYXllckhhbmRGaXhlZC5BZGQoTW92ZVR5cGUuTW92ZURvd24pO1xyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kRml4ZWQuQWRkKE1vdmVUeXBlLk1vdmVVcCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZSA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kVW5maXhlZC5BZGQoTW92ZVR5cGUuTm9ybWFsU2hvdCk7XHJcbiAgICAgICAgICAgICAgICBlbmVteU1vdmVzID0gbmV3IE1vdmVUeXBlW10ge1xyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVVcCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlRG93bixcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTm9ybWFsU2hvdCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL3BsYXllckhhbmRVbmZpeGVkLkFkZChNb3ZlVHlwZS5GaXJlKTtcclxuICAgICAgICAgICAgICAgIC8vcGxheWVySGFuZFVuZml4ZWQuQWRkKE1vdmVUeXBlLkljZSk7XHJcbiAgICAgICAgICAgICAgICAvL3BsYXllckhhbmRVbmZpeGVkLkFkZChNb3ZlVHlwZS5UaHVuZGVyKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZW5lbXlNb3ZlcyA9IG5ldyBNb3ZlVHlwZVtdIHtcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlRG93bixcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlVXAsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLkZpcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuSWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLlRodW5kZXIsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3BsYXllckhhbmQuQWRkKE1vdmVUeXBlLk5vcm1hbFNob3QpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSXNWaWN0b3J5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBiYXR0bGVSZXN1bHQucmVzdWx0ID09IDE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgQmF0dGxlRW50aXR5IGhlcm8gPSBuZXcgQmF0dGxlRW50aXR5KCk7XHJcblxyXG4gICAgICAgICAgICBoZXJvLnBvcy5TZXQoMSwgMSk7XHJcbiAgICAgICAgICAgIGhlcm8ubWluUG9zLlNldCgwLCAwKTtcclxuICAgICAgICAgICAgaGVyby5tYXhQb3MuU2V0KDIsIDIpO1xyXG4gICAgICAgICAgICBoZXJvLlR5cGUgPSBFbnRpdHlUeXBlLmhlcm87XHJcbiAgICAgICAgICAgIGhlcm8ubGlmZSA9IDI7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgaGVyby5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaGVyby5tb3Zlc1tpXSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgZW50aXRpZXMuQWRkKGhlcm8pO1xyXG4gICAgICAgICAgICBlY3NJbnRlZy5IZXJvQ3JlYXRlZChoZXJvKTtcclxuICAgICAgICAgICAgZWNzSW50ZWcuU3Bhd25FbmVtaWVzKCk7XHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0dhbWVFbnRpdHkgcGlja3VwID0gbmV3IEdhbWVFbnRpdHkoKTtcclxuICAgICAgICAgICAgICAgIC8vcGlja3VwLlR5cGUgPSBFbnRpdHlUeXBlLnBpY2t1cDtcclxuICAgICAgICAgICAgICAgIC8vcGlja3VwLnBvcy5TZXQoMCwgMik7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5saWZlID0gMjtcclxuICAgICAgICAgICAgICAgIC8vcGlja3VwLmdyYXBoaWMgPSA0O1xyXG4gICAgICAgICAgICAgICAgLy9lbnRpdGllcy5BZGQocGlja3VwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgQmF0dGxlRW50aXR5IHBhbmVsRWZmZWN0ID0gbmV3IEJhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5UeXBlID0gRW50aXR5VHlwZS5wYW5lbGVmZmVjdDtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QucG9zLlNldCgwLCAyKTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QubGlmZSA9IDU7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmdyYXBoaWMgPSA1O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5yYW5kb21Qb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmRyYXdMaWZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmRyYXdUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgIFJhbmRvbVBvc2l0aW9uKHBhbmVsRWZmZWN0KTtcclxuICAgICAgICAgICAgLy8gICAgZW50aXRpZXMuQWRkKHBhbmVsRWZmZWN0KTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgQmF0dGxlRW50aXR5IHBhbmVsRWZmZWN0ID0gbmV3IEJhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5UeXBlID0gRW50aXR5VHlwZS5wYW5lbGVmZmVjdDtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QucG9zLlNldCgwLCAyKTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QubGlmZSA9IDU7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmdyYXBoaWMgPSA1O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5yYW5kb21Qb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmRyYXdMaWZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmRyYXdUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgIFJhbmRvbVBvc2l0aW9uKHBhbmVsRWZmZWN0KTtcclxuICAgICAgICAgICAgLy8gICAgZW50aXRpZXMuQWRkKHBhbmVsRWZmZWN0KTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICBFeGVjdXRlUGhhc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVFbnRpdHkgTmV3QmF0dGxlRW50aXR5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJhdHRsZUVudGl0eSBiYXR0bGVFbnRpdHkgPSBuZXcgQmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgIGVudGl0aWVzLkFkZChiYXR0bGVFbnRpdHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlRW50aXR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVudGl0aWVzW2ldLmxpZmUgPSBlbnRpdGllc1tpXS5tYXhMaWZlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlLkVuZW15TW92ZUNob2ljZSk7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLnR1cm4uVmFsID0gMDtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUudG90YWxUdXJucyA9IDA7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IDA7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdy5WYWwgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbCA9IDE7XHJcbiAgICAgICAgICAgIGJhdHRsZVJlc3VsdC5yZXN1bHQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBJc092ZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJhdHRsZVJlc3VsdC5yZXN1bHQgIT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFRpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRmluaXNoUHJldmlvdXNUaWNrKCk7XHJcbiAgICAgICAgICAgIGJvb2wgaGVyb0FsaXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGJvb2wgZW5lbXlBbGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBib29sIHBpY2t1cE9ibGlnYXRvcnlFeGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uVHlwZSA9PSBFbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmxpZmUgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVteUFsaXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLlR5cGUgPT0gRW50aXR5VHlwZS5oZXJvKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmxpZmUgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvQWxpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdGhpcy5waWNrdXBBY2Nlc3Nvci5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBpY2t1cCA9IHBpY2t1cEFjY2Vzc29yLkNvbXAyKGkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBpY2t1cC5uZWNlc3NhcnlGb3JWaWN0b3J5ICYmIHBpY2t1cEFjY2Vzc29yLkNvbXAxKGkpLkFsaXZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpY2t1cE9ibGlnYXRvcnlFeGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJhdHRsZVN0YXRlLkJhdHRsZUVuZEFjdGl2ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFoZXJvQWxpdmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlUmVzdWx0LnJlc3VsdCA9IDI7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoKCFlbmVteUFsaXZlIHx8ICFCYXR0bGVDb25maWcubmVlZEtpbGxBbGxFbmVtaWVzKSAmJiAhcGlja3VwT2JsaWdhdG9yeUV4aXN0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZVJlc3VsdC5yZXN1bHQgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBoYXBwTWFuYWdlci5UaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aW1lU3RhbXAuQWR2YW5jZSgxKTtcclxuICAgICAgICAgICAgICAgIEV4ZWN1dGVQaGFzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRpbWVUb0Nob29zZSA+IDAgJiYgYmF0dGxlU3RhdGUucGhhc2UgPT0gQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lVG9DaG9vc2UgLT0gZGVsdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGltZVRvQ2hvb3NlIDw9IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRmluaXNoUHJldmlvdXNUaWNrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJhdHRsZVBoYXNlIHByZXZpb3VzUGhhc2UgPSBiYXR0bGVTdGF0ZS5waGFzZTtcclxuICAgICAgICAgICAgc3dpdGNoIChwcmV2aW91c1BoYXNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkVuZW15TW92ZUNob2ljZTpcclxuICAgICAgICAgICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5IYW5kUmVjaGFyZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5IYW5kUmVjaGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuUGlja0hhbmRzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuUGlja0hhbmRzOlxyXG4gICAgICAgICAgICAgICAgICAgIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmU6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdyA+PSBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib29sIG5vTW9yZVVuaXRzVG9BY3RUaGlzVHVybiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBpX2luaXRpYWwgPSBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaV9pbml0aWFsIDwgZW50aXRpZXMuQ291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSBpX2luaXRpYWw7IGkgPCBlbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdGllc1tpXS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vTW9yZVVuaXRzVG9BY3RUaGlzVHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9Nb3JlVW5pdHNUb0FjdFRoaXNUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmF0dGxlU3RhdGUudHVybiA+PSBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUucmFuZG9tUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJSQU5ET00gUE9TISFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSYW5kb21Qb3NpdGlvbihlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLnR1cm4gPSBiYXR0bGVTdGF0ZS50dXJuICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS50b3RhbFR1cm5zICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93LlZhbCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgUmFuZG9tUG9zaXRpb24oQmF0dGxlRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLnBvcy5YID0gUmFuZG9tU3VwcGxpZXIuUmFuZ2UoMCwgNSk7XHJcbiAgICAgICAgICAgIGUucG9zLlkgPSBSYW5kb21TdXBwbGllci5SYW5nZSgwLCAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZSBwaGFzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJhdHRsZVBoYXNlIHByZXZpb3VzUGhhc2UgPSBiYXR0bGVTdGF0ZS5waGFzZTtcclxuICAgICAgICAgICAgaWYgKHBoYXNlID09IHByZXZpb3VzUGhhc2UpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHBoYXNlID09IEJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzUGhhc2UgIT0gQmF0dGxlUGhhc2UuQ29uZmlybUlucHV0KVxyXG4gICAgICAgICAgICAgICAge1xyXG5QaWRyb2guQmFzZVV0aWxzLkV4dGVuc2lvbnMuU2h1ZmZsZTxnbG9iYWw6OlBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlPiggICAgICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sKTtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kVW5maXhlZC5DbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCBjb21tYW5kc1RvQWRkID0gMztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tbWFuZHNUb0FkZCA+IHBsYXllckhhbmRQb29sLkNvdW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZHNUb0FkZCA9IHBsYXllckhhbmRQb29sLkNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvbW1hbmRzVG9BZGQ7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckhhbmRVbmZpeGVkLkFkZChwbGF5ZXJIYW5kUG9vbFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZVRvQ2hvb3NlID0gdGltZVRvQ2hvb3NlTWF4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJldmlvdXNQaGFzZSA9PSBCYXR0bGVQaGFzZS5FeGVjdXRlTW92ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUudHVybi5WYWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5ID0gMDtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdy5WYWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlLm1vdmVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3Zlc1tpXSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5waGFzZSA9IHBoYXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBDb25maXJtSW5wdXRTdGFydCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5Db25maXJtSW5wdXQpO1xyXG4gICAgICAgICAgICBpbnB1dHMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgaW5wdXRzLkFkZChuZXcgVHVybmJhc2VkLklucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuQ29uZmlybSksIElucHV0VGFncy5NSVNDKTtcclxuICAgICAgICAgICAgaW5wdXRzLkFkZChuZXcgVHVybmJhc2VkLklucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuQ2FuY2VsKSwgSW5wdXRUYWdzLk1JU0MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEV4ZWN1dGVQaGFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcGhhc2UgPSBiYXR0bGVTdGF0ZS5waGFzZTtcclxuICAgICAgICAgICAgc3dpdGNoIChwaGFzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgZWNzSW50ZWcuU3Bhd25FbmVtaWVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5lbXlHZW5lcmF0ZU1vdmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkhhbmRSZWNoYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuUGlja0hhbmRzOlxyXG4gICAgICAgICAgICAgICAgICAgIFBpY2tIYW5kSW5wdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmU6XHJcbiAgICAgICAgICAgICAgICAgICAgZWNzSW50ZWcuU3Bhd25FbmVtaWVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgRXhlY3V0ZU1vdmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUGlja0hhbmRJbnB1dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnB1dHMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgaW5wdXRzLmlucHV0Rm9yQ29uZmlybWF0aW9uID0gbmV3IElucHV0KElucHV0VHlwZS5Ob25lLCAtMSk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBoaSBpbiBwbGF5ZXJIYW5kRml4ZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTW92ZSwgKGludCloaSksIElucHV0VGFncy5NT1ZFRklYKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaGkgaW4gcGxheWVySGFuZFVuZml4ZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTW92ZSwgKGludCloaSksIElucHV0VGFncy5NT1ZFVU5GSVgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LlJlZG8pLCBJbnB1dFRhZ3MuTUlTQyk7XHJcbiAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LkRvbmUpLCBJbnB1dFRhZ3MuTUlTQyk7XHJcbiAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LkhlbHApLCBJbnB1dFRhZ3MuTUlTQyk7XHJcbiAgICAgICAgICAgIGJvb2wgZW5lbXlFeGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uVHlwZSA9PSBFbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZW15RXhpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vaWYgKGVuZW15RXhpc3QpXHJcbiAgICAgICAgICAgIC8vICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LlByZXZpZXcpLCBJbnB1dFRhZ3MuTUlTQyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbnB1dERvbmUoSW5wdXQgaW5wdXQpXHJcbiAgICAgICAge1xyXG5cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoYmF0dGxlU3RhdGUucGhhc2UgPT0gQmF0dGxlUGhhc2UuQ29uZmlybUlucHV0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBQcm9jZXNzSW5wdXQoaW5wdXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRzLmlucHV0Rm9yQ29uZmlybWF0aW9uID0gaW5wdXQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbnB1dENvbmZpcm1lZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5QaWNrSGFuZHMpO1xyXG4gICAgICAgICAgICBJbnB1dCBpbnB1dCA9IGlucHV0cy5pbnB1dEZvckNvbmZpcm1hdGlvbjtcclxuICAgICAgICAgICAgaW5wdXRzLmlucHV0Rm9yQ29uZmlybWF0aW9uID0gbmV3IElucHV0KElucHV0VHlwZS5Ob25lLCAtMSk7XHJcbiAgICAgICAgICAgIFByb2Nlc3NJbnB1dChpbnB1dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUHJvY2Vzc0lucHV0KElucHV0IGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiSU5QVVRcIik7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5Nb3ZlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBNb3ZlVHlwZSBhcmcxID0gKE1vdmVUeXBlKWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJJTlBVVFRFRDFcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVySGFuZEZpeGVkLkNvbnRhaW5zKGFyZzEpIHx8IHBsYXllckhhbmRVbmZpeGVkLkNvbnRhaW5zKGFyZzEpKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJJTlBVVFRFRDJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZUNob3NlbihhcmcxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5NaXNjQmF0dGxlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBNaXNjQmF0dGxlSW5wdXQgbWlzYyA9IChNaXNjQmF0dGxlSW5wdXQpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIklOUFVUXCIrbWlzYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWlzYyA9PSBNaXNjQmF0dGxlSW5wdXQuUmVkbylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5oZXJvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGUubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUubW92ZXNbaV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50IHZhbHVlID0gZS5tb3Zlc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IC0xIHx8IGkgPT0gYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3Zlc1tpIC0gMV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtaXNjID09IE1pc2NCYXR0bGVJbnB1dC5Eb25lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtaXNjID09IE1pc2NCYXR0bGVJbnB1dC5Db25maXJtKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIElucHV0Q29uZmlybWVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUGlja0hhbmRJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1pc2MgPT0gTWlzY0JhdHRsZUlucHV0LkNhbmNlbClcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgQmF0dGxlRGVjaWRlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgaGVyb2VzID0gMDtcclxuICAgICAgICAgICAgaW50IGVuZW1pZXMgPSAwO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLmhlcm8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuQWxpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9lcysrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLkFsaXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVtaWVzKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGhlcm9lcyA9PSAwIHx8IGVuZW1pZXMgPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE1vdmVDaG9zZW4oTW92ZVR5cGUgbW92ZVR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLmhlcm8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlLm1vdmVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCB2YWx1ZSA9IGUubW92ZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdmVzW2ldID0gKGludCltb3ZlVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRXhlY3V0ZU1vdmVzKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJibGFcIiArIGJhdHRsZVN0YXRlLnR1cm4uVmFsKTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLlJlYWQoKTtcclxuICAgICAgICAgICAgQmF0dGxlRW50aXR5IGF0dGFja2VyID0gZW50aXRpZXNbYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5XTtcclxuICAgICAgICAgICAgaW50IHR1cm4gPSBiYXR0bGVTdGF0ZS50dXJuO1xyXG4gICAgICAgICAgICBFeGVjdXRlTW92ZShhdHRhY2tlciwgdHVybik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFeGVjdXRlTW92ZShCYXR0bGVFbnRpdHkgYWN0b3IsIGludCB0dXJuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTW92ZURhdGFFeGVjdXRlci5FeGVjdXRlTW92ZShhY3RvciwgdHVybik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IENhbGN1bGF0ZUF0dGFja011bHRpcGxpZXIoQmF0dGxlRW50aXR5IGFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJhc2VEID0gYWN0b3IuZGFtYWdlTXVsdGlwbGllcjtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlICE9IGFjdG9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnBvcyA9PSBhY3Rvci5wb3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VEICo9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJhc2VEO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBDYWxjdWxhdGVEZWZlbmRlck11bHRpcGxpZXIoQmF0dGxlRW50aXR5IGFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJhc2VEID0gMTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlICE9IGFjdG9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnBvcyA9PSBhY3Rvci5wb3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VEICo9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJhc2VEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEJhdHRsZVN0YXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgVmFsdWUgdHVybiA9IG5ldyBWYWx1ZSgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IHRvdGFsVHVybnM7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWYWx1ZSB0dXJuc1BlclBoYXNlID0gbmV3IFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWYWx1ZSBtb3ZlVGlja19Ob3cgPSBuZXcgVmFsdWUoKTtcclxuICAgICAgICAgICAgcHVibGljIGludCBtb3ZlVGlja19Ub3RhbCA9IDA7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgYWN0aW5nRW50aXR5ID0gMDtcclxuICAgICAgICAgICAgcHVibGljIEJhdHRsZVBoYXNlIHBoYXNlO1xyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBCYXR0bGVFbmRBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEJhdHRsZUVudGl0eVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGludCBsaWZlO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgcG9zID0gbmV3IFZlY3RvcjJEKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBtaW5Qb3MgPSBuZXcgVmVjdG9yMkQoKTtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIG1heFBvcyA9IG5ldyBWZWN0b3IyRCgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50W10gbW92ZXMgPSBuZXcgaW50WzEwXTtcclxuICAgICAgICAgICAgcHVibGljIGludCBncmFwaGljO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IGdyYXBoaWNSZXBlYXRlZEluZGV4O1xyXG4gICAgICAgICAgICBwdWJsaWMgZmxvYXQgZGFtYWdlTXVsdGlwbGllciA9IDE7XHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIGRyYXdMaWZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcHVibGljIGJvb2wgZHJhd1R1cm4gPSB0cnVlO1xyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCByYW5kb21Qb3NpdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwdWJsaWMgRWxlbWVudCBlbGVtZW50ID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IG1heExpZmUgPSAzO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEVudGl0eVR5cGUgVHlwZSA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVudGl0eVR5cGUuaGVybztcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIFBvc2l0aW9uVjJEIHsgZ2V0IHsgcmV0dXJuIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQocG9zLlgsIHBvcy5ZKTsgfSB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBEZWFkIHsgZ2V0IHsgcmV0dXJuIGxpZmUgPD0gMDsgfSB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBBbGl2ZSB7IGdldCB7IHJldHVybiAhdGhpcy5EZWFkOyB9IH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBNb3ZlVHlwZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRG9Ob3RoaW5nLFxyXG4gICAgICAgICAgICBNb3ZlVXAsXHJcbiAgICAgICAgICAgIE1vdmVMZWZ0LFxyXG4gICAgICAgICAgICBNb3ZlRG93bixcclxuICAgICAgICAgICAgTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICBOb3JtYWxTaG90LFxyXG4gICAgICAgICAgICBGaXJlLFxyXG4gICAgICAgICAgICBJY2UsXHJcbiAgICAgICAgICAgIFRodW5kZXIsXHJcbiAgICAgICAgICAgIEljZUJvbWIsXHJcbiAgICAgICAgICAgIFRodW5kZXJCb21iLFxyXG4gICAgICAgICAgICBTdW1tb25FbnRpdHksXHJcbiAgICAgICAgICAgIERvd25GaXJlLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gSGFwcFRhZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQXR0YWNrSGl0LFxyXG4gICAgICAgICAgICBBdHRhY2tNaXNzLFxyXG4gICAgICAgICAgICBEYW1hZ2VUYWtlbixcclxuICAgICAgICAgICAgTW92ZW1lbnRGYWlsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBCYXR0bGVQaGFzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRW5lbXlNb3ZlQ2hvaWNlLFxyXG4gICAgICAgICAgICBIYW5kUmVjaGFyZ2UsXHJcbiAgICAgICAgICAgIFBpY2tIYW5kcyxcclxuICAgICAgICAgICAgQ29uZmlybUlucHV0LFxyXG4gICAgICAgICAgICBFeGVjdXRlTW92ZSxcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBFbnRpdHlUeXBlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBoZXJvLCBlbmVteSwgcGlja3VwLCBwYW5lbGVmZmVjdFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gRWxlbWVudFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRmlyZSwgSWNlLCBUaHVuZGVyLFxyXG4gICAgICAgICAgICBOb25lXHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgaW50IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Cb2FyZFdpZHRoPTY7cHJpdmF0ZSBpbnQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0JvYXJkSGVpZ2h0PTM7fVxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIFZhbHVlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IFZhbCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnVtIHZhbEFzRW51bSB7IHNldCB7IFZhbCA9IENvbnZlcnQuVG9TaW5nbGUodmFsdWUpOyB9IH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXQoaW50IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWYWwgPSB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWYWx1ZSBvcGVyYXRvciArKFZhbHVlIGMxLCBmbG9hdCBjMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGMxLlZhbCArPSBjMjtcclxuICAgICAgICAgICAgcmV0dXJuIGMxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBvcGVyYXRvciAtKFZhbHVlIGMxLCBmbG9hdCBjMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBjMS5WYWwgLSBjMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShWYWx1ZSBjMSwgVmFsdWUgYzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBib29sIGMybnVsbCA9IG9iamVjdC5SZWZlcmVuY2VFcXVhbHMoYzIsIG51bGwpO1xyXG4gICAgICAgICAgICBib29sIGMxbnVsbCA9IG9iamVjdC5SZWZlcmVuY2VFcXVhbHMoYzEsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAoYzJudWxsICYmIGMxbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoYzFudWxsIHx8IGMybnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjMS5WYWwgPT0gYzIuVmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFZhbHVlIGMxLCBWYWx1ZSBjMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJvb2wgYzJudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMiwgbnVsbCk7XHJcbiAgICAgICAgICAgIGJvb2wgYzFudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmIChjMm51bGwgJiYgYzFudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoYzFudWxsIHx8IGMybnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGMxLlZhbCAhPSBjMi5WYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGltcGxpY2l0IG9wZXJhdG9yIGZsb2F0KFZhbHVlIGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZC5WYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGltcGxpY2l0IG9wZXJhdG9yIGludChWYWx1ZSBkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpZC5WYWw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVSZXN1bHRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RydWN0IElucHV0XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IElucHV0VHlwZSB0eXBlO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgYXJnMTtcclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgSW5wdXQoSW5wdXRUeXBlIHR5cGUsIGludCBhcmcxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5hcmcxID0gYXJnMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBJbnB1dChJbnB1dFR5cGUgdHlwZSwgRW51bSBhcmcxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5hcmcxID0gQ29udmVydC5Ub0ludDMyKGFyZzEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBJbnB1dFR5cGVcclxuICAgIHtcclxuICAgICAgICBOb25lLCBNb3ZlLCBNaXNjQmF0dGxlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gTWlzY0JhdHRsZUlucHV0XHJcbiAgICB7XHJcbiAgICAgICAgRG9uZSxcclxuICAgICAgICBSZWRvLFxyXG4gICAgICAgIFByZXZpZXcsXHJcbiAgICAgICAgQ29uZmlybSxcclxuICAgICAgICBDYW5jZWwsXHJcbiAgICAgICAgSGVscFxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ29sb3JTdHVmZlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHN0cmluZyBHb29kTWFpbjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBuZXV0cmFsRGFyayA9IFwiIzE5MDEzYlwiO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIG5ldXRyYWxTdHJvbmcgPSBcIiMyYzNlNDNcIjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBzdHJpbmcgR29vZFN1YjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBzdHJpbmcgRXZpbE1haW47XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmdbXSBjb2xvcnMgPSBuZXcgc3RyaW5nWzI1XTtcclxuXHJcbiAgICAgICAgc3RhdGljIENvbG9yU3R1ZmYoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb2xvcnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yc1tpXSA9IFwiIzQwMDAyMFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5IZXJvXSA9IFwiIzAwOWM4ZFwiO1xyXG4gICAgICAgICAgICAvL2NvbnN0IHN0cmluZyBoZXJvU3ViID0gXCIjMDA1ZjkxXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5IZXJvVHVybl0gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuRW5lbXldID0gXCIjZmYwMzUzXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5HcmlkSGVyb10gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRFbmVteV0gPSBcIiM4ZTAwNjBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteVR1cm5dID0gXCIjOGUwMDYwXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQm9hcmRdID0gXCIjMWU0ODZlXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuaW5wdXRLZXldID0gXCIjNjg4NjkwXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuV2luZG93TGFiZWxdID0gXCIjMWU0ODZlXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuRmlyZUF1cmFdID0gXCIjNzkzMTAwXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuSWNlQXVyYV0gPSBcIiMwMDU1OTBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5UaHVuZGVyQXVyYV0gPSBcIiMwMDU4M2RcIjtcclxuXHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvXSA9IFwiIzhhZDg5NlwiO1xyXG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgaGVyb1N1YiA9IFwiIzRjNmQ1MFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb1R1cm5dID0gaGVyb1N1YjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15XSA9IFwiI2ZmNzY5NFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm9dID0gaGVyb1N1YjtcclxuICAgICAgICAgICAgY29uc3Qgc3RyaW5nIGVuZW15c3ViID0gXCIjYTc0NjRmXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkRW5lbXldID0gZW5lbXlzdWI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteVR1cm5dID0gZW5lbXlzdWI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkJvYXJkXSA9IFwiIzFlNDg2ZVwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5pbnB1dEtleV0gPSBcIiM2ODg2OTBcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuV2luZG93TGFiZWxdID0gXCIjMWU0ODZlXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkZpcmVBdXJhXSA9IFwiIzc5MzEwMFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5JY2VBdXJhXSA9IFwiIzAwNTU5MFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5UaHVuZGVyQXVyYV0gPSBcIiMwMDU4M2RcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuRmlyZVNob3RdID0gXCIjZjgyYjM2XCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkljZVNob3RdID0gXCIjMDA3ZWZmXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJTaG90XSA9IFwiI2EzN2MwMFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5CYWNrZ3JvdW5kSW5wdXRdID0gXCIjMDgwODA4XCI7XHJcblxyXG5cclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuaW5wdXRLZXldID0gXCIjOUU4NjY0XCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLklucHV0RGVzY3JpcHRpb25dID0gXCIjODA4MDgwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkJhY2tCYXR0bGVdID0gXCIjMDAwMDAwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkJhY2tncm91bmRJbnB1dF0gPSBcIiMxQTFBMUFcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9UdXJuXSA9IFwiIzAwQjJCMlwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXlUdXJuXSA9IFwiI0ZGMDA0MFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm9dID0gXCIjMDA0NjhDXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkRW5lbXldID0gXCIjOEMwMDIzXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvXSA9IFwiIzY2RkZGRlwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXldID0gXCIjRDkwMDM2XCI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb10gPSBcIiNCRkJGQkZcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15XSA9IGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvXTtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9UdXJuXSA9IGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvXTtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15VHVybl0gPSBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb107XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLldpbmRvd0xhYmVsXSA9IFwiIzY2NjY2NlwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5CYWNrQ29tbWFuZF0gPSBcIiMzMzMzMzNcIjtcclxuXHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkZpcmVBdXJhXSA9IFwiI0ZGOEM2NlwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5JY2VBdXJhXSA9IFwiIzY2RkZGRlwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5UaHVuZGVyQXVyYV0gPSBcIiNGRkZGNjZcIjtcclxuXHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkJhY2tTdHJpcGVdID0gXCIjMUExNDBEXCI7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuRGVidWdFeHRyYVxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIERlYnVnRXhcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgTGlzdDxzdHJpbmc+IG1lc3NhZ2VzID0gbmV3IExpc3Q8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTG9nKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWVzc2FnZXMuQWRkKHYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFNob3coKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29uc29sZS5DbGVhcigpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBtZXNzYWdlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDb25zb2xlLlJlYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBEZWNrTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIExpc3Q8aW50PltdIGRlY2tzID0gbmV3IExpc3Q8aW50PlszXTtcclxuICAgICAgICBMaXN0PGludD5bXSBkaXNjYXJkcyA9IG5ldyBMaXN0PGludD5bM107XHJcbiAgICAgICAgYm9vbFtdIGRlY2tzT2sgPSBuZXcgYm9vbFszXTtcclxuICAgICAgICBMaXN0PGludD4gc2VsZWN0aW9uID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIExpc3Q8aW50PiBkZWNrc05vdEVtcHR5ID0gbmV3IExpc3Q8aW50PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgRGVja01hbmFnZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBkZWNrcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVja3NbaV0gPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZnJlc2goKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmVmcmVzaERlY2tFbXB0eSgpO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGRlY2tzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZWNrc09rW2ldID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVja3NbaV0uQ291bnQgPT0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWNrc09rW2ldID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGRlY2tzW2ldLkNvdW50OyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLkNvbnRhaW5zKGRlY2tzW2ldW2pdKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVja3NPa1tpXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgc2VsZWN0aW9uLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJvb2wgYWRkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgZGVja3NPay5MZW5ndGg7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRlY2tzT2tbal0pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNrc09rW2pdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgbW92ZSA9IERyYXcoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbltpXSA9IG1vdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlZnJlc2hEZWNrRW1wdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFhZGRlZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVja3NOb3RFbXB0eS5Db3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgZGVjayA9IFBpZHJvaC5CYXNlVXRpbHMuRXh0ZW5zaW9ucy5SYW5kb21FbGVtZW50PGludD4oZGVja3NOb3RFbXB0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBtb3ZlID0gRHJhdyhkZWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uW2ldID0gbW92ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVmcmVzaERlY2tFbXB0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgRHJhdyhpbnQgZGVja0lkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1vdmUgPSBQaWRyb2guQmFzZVV0aWxzLkV4dGVuc2lvbnMuUmFuZG9tRWxlbWVudDxpbnQ+KGRlY2tzW2RlY2tJZF0pO1xyXG4gICAgICAgICAgICBkZWNrc1tkZWNrSWRdLlJlbW92ZShtb3ZlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1vdmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUmVmcmVzaERlY2tFbXB0eSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkZWNrc05vdEVtcHR5LkNsZWFyKCk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZGVja3MuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChkZWNrc1tpXS5Db3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVja3NOb3RFbXB0eS5BZGQoaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBpbnRlcm5hbCBjbGFzcyBFQ1NJbnRlZ3JhdGlvblxyXG4gICAge1xyXG5cclxuICAgICAgICBTcGF3bkVudGl0eUZhY3RvcnkgZW5lbXlGYWN0b3J5O1xyXG4gICAgICAgIEVDU01hbmFnZXIgZWNzO1xyXG5cclxuICAgICAgICBwdWJsaWMgRUNTSW50ZWdyYXRpb24oU3Bhd25FbnRpdHlGYWN0b3J5IGVuZW15RmFjdG9yeSwgRUNTTWFuYWdlciBlY3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15RmFjdG9yeSA9IGVuZW15RmFjdG9yeTtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEhlcm9DcmVhdGVkKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGhlcm8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChoZXJvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU3Bhd25FbmVtaWVzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVuZW15RmFjdG9yeS5TcGF3bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRW5lbXlBSVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBMaXN0PG9iamVjdD4gbW92ZXMgPSBuZXcgTGlzdDxvYmplY3Q+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEVuZW15QUlTdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgcHJvZ3Jlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdmVVc2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IG1vdmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlVXNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVVzZShpbnQgbW92ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSA9IG1vdmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTcGF3bkVudGl0eUZhY3RvcnlcclxuICAgIHtcclxuXHJcbiAgICAgICAgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgTGlzdDxFbmVteURhdGE+IGVuZW15RGF0YXM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBCYXR0bGVNYWluIGJhdHRsZU1haW47XHJcbiAgICAgICAgcHJpdmF0ZSBRdWlja0FjY2Vzc29yT25lPFNwYXduRGF0YT4gc3Bhd25zO1xyXG5cclxuICAgICAgICBwdWJsaWMgU3Bhd25FbnRpdHlGYWN0b3J5KEVDU01hbmFnZXIgZWNzLCBMaXN0PEVuZW15RGF0YT4gZW5lbXlEYXRhcywgQmF0dGxlTWFpbiBiYXR0bGVNYWluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIC8vZWNzLlF1aWNrQWNjZXNzb3IxPEVuZW15RGF0YT4oKTtcclxuICAgICAgICAgICAgc3Bhd25zID0gZWNzLlF1aWNrQWNjZXNzb3IxPFNwYXduRGF0YT4oKTtcclxuICAgICAgICAgICAgdGhpcy5lbmVteURhdGFzID0gZW5lbXlEYXRhcztcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVNYWluID0gYmF0dGxlTWFpbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNwYXduKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBzcGF3bmVkID0gMDtcclxuICAgICAgICAgICAgLy9mb3IgKGludCBpID0gMDsgaSA8IHNwYXducy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB3aGlsZSAoc3Bhd25zLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU3Bhd25EYXRhIHNwYXduID0gc3Bhd25zLkNvbXAxKDApO1xyXG4gICAgICAgICAgICAgICAgc3Bhd25zLkVudGl0eSgwKS5SZW1vdmVDb21wb25lbnQoc3Bhd24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlkID0gc3Bhd24uaWQ7XHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkVudGl0eVR5cGUgZW50VHlwZSA9IChCYXR0bGVNYWluLkVudGl0eVR5cGUpc3Bhd24uZW50aXR5VHlwZTtcclxuICAgICAgICAgICAgICAgIGlmKGVudFR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmUgPSBiYXR0bGVNYWluLk5ld0JhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLlR5cGUgPSBlbnRUeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIFBpY2t1cEluZm8gcGlja3VwID0gbmV3IFBpY2t1cEluZm8odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBpY2t1cEUgPSBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChwaWNrdXApO1xyXG4gICAgICAgICAgICAgICAgICAgIHBpY2t1cEUuQWRkQ29tcG9uZW50KGJlKTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5wb3MgPSBzcGF3bi5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBiZS5saWZlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5tYXhMaWZlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5kcmF3TGlmZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLmRyYXdUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUuZ3JhcGhpYyA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZW50VHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZW15QUkgPSBlbmVteURhdGFzW2lkXS5lbmVteUFJO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmVteSA9IGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KGVuZW15QUkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBiZSA9IGJhdHRsZU1haW4uTmV3QmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUucG9zID0gc3Bhd24ucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgYmUubGlmZSA9IGVuZW15RGF0YXNbaWRdLmhwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLm1heExpZmUgPSBiZS5saWZlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLmdyYXBoaWMgPSBlbmVteURhdGFzW2lkXS5yZW5kZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVudGl0aWVzID0gYmF0dGxlTWFpbi5lbnRpdGllcztcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtICE9IGJlICYmIGl0ZW0uZ3JhcGhpYyA9PSBiZS5ncmFwaGljKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZS5ncmFwaGljUmVwZWF0ZWRJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJlLm1pblBvcyA9IG5ldyBWZWN0b3IyRCgzLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5tYXhQb3MgPSBuZXcgVmVjdG9yMkQoNSwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUuVHlwZSA9IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteTtcclxuICAgICAgICAgICAgICAgICAgICBlbmVteS5BZGRDb21wb25lbnQoYmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVuZW15QUlTdGF0ZSBlbmVteUFpU3RhdGUgPSBuZXcgRW5lbXlBSVN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5lbXlBaVN0YXRlLnByb2dyZXNzID0gc3Bhd25lZDtcclxuICAgICAgICAgICAgICAgICAgICBlbmVteS5BZGRDb21wb25lbnQoZW5lbXlBaVN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJTUEFXTlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzcGF3bmVkKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFBpY2t1cEluZm9cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgYm9vbCBuZWNlc3NhcnlGb3JWaWN0b3J5O1xyXG5cclxuICAgICAgICBwdWJsaWMgUGlja3VwSW5mbyhib29sIG5lY2Vzc2FyeUZvclZpY3RvcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5lY2Vzc2FyeUZvclZpY3RvcnkgPSBuZWNlc3NhcnlGb3JWaWN0b3J5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBpY2t1cEluZm8oKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEVuZW15RGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBFbmVteUFJIGVuZW15QUk7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBocDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHJlbmRlcjtcclxuXHJcbiAgICAgICAgcHVibGljIEVuZW15RGF0YShFbmVteUFJIGVuZW15QUksIGludCBocCwgaW50IHJlbmRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlBSSA9IGVuZW15QUk7XHJcbiAgICAgICAgICAgIHRoaXMuaHAgPSBocDtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIgPSByZW5kZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBFbmVteURhdGFDcmVhdG9yXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxzdHJpbmc+IHJlbmRlclRleHRzO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PEVuZW15RGF0YT4gZW5lbXlEYXRhcyA9IG5ldyBMaXN0PEVuZW15RGF0YT4oKTtcclxuICAgICAgICBNb3ZlQ3JlYXRvclByb2cgbW92ZUNyZWF0b3JQcm9nO1xyXG5cclxuICAgICAgICBwdWJsaWMgRW5lbXlEYXRhQ3JlYXRvcihMaXN0PHN0cmluZz4gcmVuZGVyVGV4dHMsIE1vdmVDcmVhdG9yUHJvZyBtb3ZlQ3JlYXRvclByb2cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZW5kZXJUZXh0cy5BZGQoXCJAXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclRleHRzID0gcmVuZGVyVGV4dHM7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUNyZWF0b3JQcm9nID0gbW92ZUNyZWF0b3JQcm9nO1xyXG5cclxuICAgICAgICAgICAgLy9jb21tZW50XHJcbiAgICAgICAgICAgIC8vQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcbiAgICAgICAgICAgIC8vICAgIFNwZWNpYWxFbmVteU1vdmVzLlNtYXJ0TW92ZSwgTW92ZVR5cGUuTW92ZUxlZnQsIE1vdmVUeXBlLk1vdmVEb3duXHJcbiAgICAgICAgICAgIC8vICAgICksIGhwOiAyLCByZW5kZXJUZXh0OiBcIiVcIik7XHJcblxyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuICAgICAgICAgICAgICAgIE1vdmVzKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVEb3duLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVVcCwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlcilcclxuICAgICAgICAgICAgICAgICksIGhwOjIsIHJlbmRlclRleHQ6XCIlXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuICAgICAgICAgICAgICAgIE1vdmVzKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZywgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nKVxyXG4gICAgICAgICAgICAgICAgKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiI1wiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcbiAgICAgICAgICAgICAgIE1vdmVzKFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVxyXG4uTW92ZVJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICksIGhwOiA2LCByZW5kZXJUZXh0OiBcIiZcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iLFxyXG4gICAgICAgICAgICAgICAgICAgXCJTdW1tb25cIixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVxyXG4uRmlyZVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICksIGhwOiA0NSwgcmVuZGVyVGV4dDogXCIkXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXAsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVEb3duLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93bixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlXHJcbi5Nb3ZlVXBcclxuXHJcblxyXG4gICAgICAgICAgICAgICApLCBocDogMywgcmVuZGVyVGV4dDogXCJIXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuXHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2UsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb05vdGhpbmcsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVxyXG4uRG9Ob3RoaW5nXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICksIGhwOiAzLCByZW5kZXJUZXh0OiBcIkpcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLkRvTm90aGluZ1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICApLCBocDogMywgcmVuZGVyVGV4dDogXCJMXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuXHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLkRvTm90aGluZ1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICApLCBocDogMywgcmVuZGVyVGV4dDogXCJLXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuXHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb3duRmlyZSxcclxuICAgICAgICAgICAgICAgIFNwZWNpYWxFbmVteU1vdmVzLlNtYXJ0TW92ZSxcclxuICAgICAgICAgICAgICAgIFNwZWNpYWxFbmVteU1vdmVzLlNtYXJ0TW92ZVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICksIGhwOiA1LCByZW5kZXJUZXh0OiBcIktcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG5cclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsXHJcbiAgICAgICAgICAgICAgICAgICBcIlN1bW1vblwiLFxyXG4gICAgICAgICAgICAgICAgICAgU3BlY2lhbEVuZW15TW92ZXMuU21hcnRNb3ZlLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXHJcbiAgICAgICAgICAgICAgICAgICBTcGVjaWFsRW5lbXlNb3Zlcy5TbWFydE1vdmUsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlLFxyXG4gICAgICAgICAgICAgICAgICAgU3BlY2lhbEVuZW15TW92ZXMuU21hcnRNb3ZlXHJcblxyXG5cclxuICAgICAgICAgICAgICAgKSwgaHA6IDQ1LCByZW5kZXJUZXh0OiBcIiRcIik7XHJcbiAgICAgICAgICAgIC8vQWRkRW5lbXkoYWk6IEFjdGlvbnMoKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiJFwiKTtcclxuICAgICAgICAgICAgLy9BZGRFbmVteShhaTogQWN0aW9ucygpLCBocDogNSwgcmVuZGVyVGV4dDogXCIjXCIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgRW5lbXlBSSBBY3Rpb25zKHBhcmFtcyBvYmplY3RbXSBvYnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYWkgPSBuZXcgRW5lbXlBSSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG8gaW4gb2JzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAobyBpcyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhaS5tb3Zlcy5BZGQobmV3IE1vdmVVc2UoKGludClvKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobyBpcyBzdHJpbmcpXHJcbiAgICAgICAgICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYWkubW92ZXMuQWRkKG5ldyBNb3ZlVXNlKG1vdmVDcmVhdG9yUHJvZy5HZXRNb3ZlSWQobyBhcyBzdHJpbmcpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobyBpcyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVtdKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIG8gYXMgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVbXSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFpLm1vdmVzLkFkZChuZXcgTW92ZVVzZSgoaW50KWl0ZW0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhaS5tb3Zlcy5BZGQobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVtdIE1vdmVzKHBhcmFtcyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVtdIG1vdmVzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vdmVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEFkZEVuZW15KEVuZW15QUkgYWksIGludCBocCwgc3RyaW5nIHJlbmRlclRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgcmVuZGVyID0gcmVuZGVyVGV4dHMuQ291bnQ7XHJcbiAgICAgICAgICAgIHJlbmRlclRleHRzLkFkZChyZW5kZXJUZXh0KTtcclxuICAgICAgICAgICAgZW5lbXlEYXRhcy5BZGQobmV3IEVuZW15RGF0YShhaSwgaHAsIHJlbmRlcikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBTcGVjaWFsRW5lbXlNb3Zlc1xyXG4gICAge1xyXG4gICAgICAgIFNtYXJ0TW92ZVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFN0YWdlRGF0YUNyZWF0b3JcclxuICAgIHtcclxuICAgICAgICAvL3B1YmxpYyBMaXN0PFN0YWdlRGF0YT4gc3RhZ2VzID0gbmV3IExpc3Q8U3RhZ2VEYXRhPigpO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgcHJpdmF0ZSBTdGFnZURhdGFHcm91cCBjdXJyZW50R3JvdXA7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFnZURhdGFDcmVhdG9yKEVDU01hbmFnZXIgZWNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcblxyXG4gICAgICAgICAgICAvL0FkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAvLyAgICBFbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDIpKSxcclxuICAgICAgICAgICAgLy8gICAgRW5lbXkoMiwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAxKSksXHJcbiAgICAgICAgICAgIC8vICAgIEVuZW15KDIsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpXHJcbiAgICAgICAgICAgIC8vICAgICkpO1xyXG5cclxuICAgICAgICAgICAgLy9BZGQobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgLy8gIEVuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpXHJcbiAgICAgICAgICAgIC8vLy8gIEVuZW15KDUsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpLFxyXG4gICAgICAgICAgICAvLy8vICBFbmVteSg3LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDApKVxyXG4gICAgICAgICAgICAvLyAgKSk7XHJcblxyXG4gICAgICAgICAgICAvL0FkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAvLyAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAvLyAgICBFbmVteSg2LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDApKVxyXG4gICAgICAgICAgICAvLyAgICApLCBuZXcgRml4ZWRBdHRhY2tTdGFnZShcclxuICAgICAgICAgICAgLy8gICAgICAgIChpbnQpQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlKSk7XHJcblxyXG4gICAgICAgICAgICBTdGFnZURhdGFHcm91cCB0cmFpbmluZ0dyb3VwID0gbmV3IFN0YWdlRGF0YUdyb3VwKCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRHcm91cCA9IHRyYWluaW5nR3JvdXA7XHJcbiAgICAgICAgICAgIEFkZEdyb3VwKHRyYWluaW5nR3JvdXApO1xyXG5cclxuICAgICAgICAgICAgQWRkU3RhZ2UobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgwLCAwKSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgyLCAyKSlcclxuICAgICAgICAgICAgICAgICkuSGlkZUxpZmVVSSgpLCBuZXcgRml4ZWRBdHRhY2tTdGFnZSgpKTtcclxuXHJcbiAgICAgICAgICAgIEFkZFN0YWdlKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhdHRsZUNvbmZpZyhuZWVkS2lsbEFsbEVuZW1pZXM6IGZhbHNlKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDIsIDEpKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIDIpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDQsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpXHJcbiAgICAgICAgICAgICAgICApLkhpZGVMaWZlVUkoKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoKSk7XHJcbiAgICAgICAgICAgIEFkZFN0YWdlKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhdHRsZUNvbmZpZyhuZWVkS2lsbEFsbEVuZW1pZXM6IGZhbHNlKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDIsIDIpKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDEsIDIpKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIDIpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDUsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMikpXHJcbiAgICAgICAgICAgICAgICApLCBuZXcgRml4ZWRBdHRhY2tTdGFnZSgpKTtcclxuICAgICAgICAgICAgQWRkU3RhZ2UobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSg2LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDApKVxyXG4gICAgICAgICAgICAgICAgKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgKGludClCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpKTtcclxuICAgICAgICAgICAgQWRkU3RhZ2UobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICAgRW5lbXkoNCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSlcclxuICAgICAgICAgICAgICAgKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAoaW50KUJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSkpO1xyXG4gICAgICAgICAgICBBZGRTdGFnZShuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgICBFbmVteSg1LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKVxyXG4gICAgICAgICAgICAgICApLCBuZXcgRml4ZWRBdHRhY2tTdGFnZShcclxuICAgICAgICAgICAgICAgICAgIChpbnQpQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlKSk7XHJcbiAgICAgICAgICAgIEFkZFN0YWdlKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICBFbmVteSg1LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKSxcclxuICAgICAgICAgICAgICBFbmVteSg3LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDApKVxyXG4gICAgICAgICAgICAgICksIG5ldyBGaXhlZEF0dGFja1N0YWdlKFxyXG4gICAgICAgICAgICAgICAgICAoaW50KUJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSwgKGludClCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIpKTtcclxuXHJcbiAgICAgICAgICAgIEFkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAwKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDIpKVxyXG4gICAgICAgICAgICAgICAgKSk7XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50R3JvdXAgPSBuZXcgU3RhZ2VEYXRhR3JvdXAoKTtcclxuICAgICAgICAgICAgQWRkR3JvdXAoY3VycmVudEdyb3VwKTtcclxuXHJcbiAgICAgICAgICAgIEFkZChcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAyKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSgyLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgIG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICBFbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAyKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSgyLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDEpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDIsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCYXR0bGVDb25maWcobmV3IGludFtdIHsgMSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBFbmVteSgzLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vLFxyXG4gICAgICAgICAgICAgICAgLy9uZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgLy9uZXcgRW5lbXlTcGF3bkRhdGEoMSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSksXHJcbiAgICAgICAgICAgICAgICAvL25ldyBFbmVteVNwYXduRGF0YSgxLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vY3VycmVudEdyb3VwID0gbmV3IFN0YWdlRGF0YUdyb3VwKCk7XHJcbiAgICAgICAgICAgIC8vQWRkR3JvdXAoY3VycmVudEdyb3VwKTtcclxuXHJcbiAgICAgICAgICAgIC8vQWRkU3RhZ2UobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgLy8gICAgICAgIG5ldyBCYXR0bGVDb25maWcobmV3IGludFtdIHsgOCB9KSxcclxuICAgICAgICAgICAgLy8gICAgICAgIEVuZW15KDksIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpXHJcbiAgICAgICAgICAgIC8vICAgICkpO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkU3RhZ2UocGFyYW1zIG9iamVjdFtdIGNvbXBzKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBlID0gZWNzLkNyZWF0ZUVudGl0eSgpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBjb21wcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZS5BZGRDb21wb25lbnQoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRHcm91cC5zdGFnZURhdGFJZHMuQWRkKGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEFkZEdyb3VwKFN0YWdlRGF0YUdyb3VwIGdyb3VwKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBlID0gZWNzLkNyZWF0ZUVudGl0eSgpO1xyXG4gICAgICAgICAgICBlLkFkZENvbXBvbmVudChncm91cCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBTcGF3bkRhdGEgUGlja3VwKGludCB2LCBWZWN0b3IyRCB2ZWN0b3IyRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3Bhd25EYXRhKHYsIHZlY3RvcjJELCAoaW50KUJhdHRsZU1haW4uRW50aXR5VHlwZS5waWNrdXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBTcGF3bkRhdGEgRW5lbXkoaW50IHYsIFZlY3RvcjJEIHZlY3RvcjJEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTcGF3bkRhdGEodiwgdmVjdG9yMkQsIChpbnQpQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZGQocGFyYW1zIFN0YWdlRGF0YVtdIHN0YWdlRGF0YTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBzdGFnZURhdGExKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRHcm91cC5zdGFnZURhdGFJZHMuQWRkKGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KGl0ZW0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3N0YWdlcy5BZGRSYW5nZShzdGFnZURhdGExKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFN0YWdlRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PFNwYXduRGF0YT4gZW5lbXlTcGF3bnMgPSBuZXcgTGlzdDxTcGF3bkRhdGE+KCk7XHJcbiAgICAgICAgcHVibGljIEJhdHRsZUNvbmZpZyBiYXR0bGVDb25maWc7XHJcbiAgICAgICAgcHVibGljIGJvb2wgaGlkZUxpZmVVSSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgU3RhZ2VEYXRhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhZ2VEYXRhKHBhcmFtcyBTcGF3bkRhdGFbXSBzcGF3bnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbmVteVNwYXducy5BZGRSYW5nZShzcGF3bnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlRGF0YShCYXR0bGVDb25maWcgYmF0dGxlQ29uZmlnLCBwYXJhbXMgU3Bhd25EYXRhW10gc3Bhd25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW5lbXlTcGF3bnMuQWRkUmFuZ2Uoc3Bhd25zKTtcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVDb25maWcgPSBiYXR0bGVDb25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhZ2VEYXRhIEhpZGVMaWZlVUkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaGlkZUxpZmVVSSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU3RhZ2VEYXRhR3JvdXBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxFbnRpdHk+IHN0YWdlRGF0YUlkcyA9IG5ldyBMaXN0PEVudGl0eT4oKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEZpeGVkQXR0YWNrU3RhZ2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IG1vdmVzID0gbmV3IExpc3Q8aW50PigpO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIEZpeGVkQXR0YWNrU3RhZ2UoaW50IG1vdmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3Zlcy5BZGQobW92ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRml4ZWRBdHRhY2tTdGFnZShwYXJhbXMgaW50W10gbW92ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdmVzLkFkZFJhbmdlKG1vdmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEZpeGVkQXR0YWNrU3RhZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFNwYXduRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgaWQ7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBlbnRpdHlUeXBlO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXNlVXRpbHMuVmVjdG9yMkQgcG9zaXRpb247XHJcblxyXG4gICAgICAgIHB1YmxpYyBTcGF3bkRhdGEoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTcGF3bkRhdGEoaW50IGlkLCBWZWN0b3IyRCBwb3NpdGlvbiwgaW50IHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5lbnRpdHlUeXBlID0gdHlwZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkhhcHBzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZURhdGFFeGVjdXRlclxyXG4gICAge1xyXG4gICAgICAgIEJhdHRsZU1haW4gYmF0dGxlTWFpbjtcclxuICAgICAgICBMaXN0PE1vdmVEYXRhPiBtb3ZlRGF0YXM7XHJcbiAgICAgICAgcHJpdmF0ZSBIYXBwTWFuYWdlciBoYXBwTWFuYWdlcjtcclxuICAgICAgICBwcml2YXRlIExpc3Q8QmF0dGxlTWFpbi5CYXR0bGVFbnRpdHk+IGVudGl0aWVzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgVGltZVN0YW1wIHRpbWVTdGFtcDtcclxuICAgICAgICBMaXN0PFZlY3RvcjJEPiBhdXggPSBuZXcgTGlzdDxWZWN0b3IyRD4oKTtcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlRGF0YUV4ZWN1dGVyKEJhdHRsZU1haW4gdHVybkJhc2UsIExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcywgRUNTTWFuYWdlciBlY3MsIFRpbWVTdGFtcCB0aW1lU3RhbXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJhdHRsZU1haW4gPSB0dXJuQmFzZTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlRGF0YXMgPSBtb3ZlRGF0YXM7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IHRpbWVTdGFtcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEV4ZWN1dGVNb3ZlKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGFjdG9yLCBpbnQgdHVybilcclxuICAgICAgICB7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGJhdHRsZVN0YXRlID0gdGhpcy5iYXR0bGVNYWluLmJhdHRsZVN0YXRlO1xyXG4gICAgICAgICAgICBlbnRpdGllcyA9IHRoaXMuYmF0dGxlTWFpbi5lbnRpdGllcztcclxuICAgICAgICAgICAgaW50IHVzZXJJZCA9IGVudGl0aWVzLkluZGV4T2YoYWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1vdmVJZCA9IGFjdG9yLm1vdmVzW3R1cm5dO1xyXG4gICAgICAgICAgICBpZiAobW92ZUlkIDwgMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgbWQgPSBtb3ZlRGF0YXNbbW92ZUlkXTtcclxuICAgICAgICAgICAgaWYgKG1kID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKG1kLnVuaXRzLkNvdW50ID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSBtZC51bml0cy5Db3VudDtcclxuICAgICAgICAgICAgaW50IG1vdmVUaWNrID0gYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93O1xyXG4gICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1kLnVuaXRzW21vdmVUaWNrXS50aGluZ3NUb0hhcHBlbjtcclxuICAgICAgICAgICAgaGFwcE1hbmFnZXIgPSBiYXR0bGVNYWluLmhhcHBNYW5hZ2VyO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYSBpbiBhY3Rpb25zKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGEgaXMgTW92ZUFjdGlvbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlQWN0aW9uIG1hID0gYSBhcyBNb3ZlQWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwID0gbWEuZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0b3IucG9zICs9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBpbnZhbGlkTW92ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLnBvcy5YIDwgYWN0b3IubWluUG9zLlhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgYWN0b3IucG9zLlkgPCBhY3Rvci5taW5Qb3MuWVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhY3Rvci5wb3MuWSA+IGFjdG9yLm1heFBvcy5ZXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGFjdG9yLnBvcy5YID4gYWN0b3IubWF4UG9zLlg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZSAhPSBhY3RvciAmJiBlLkFsaXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0b3IucG9zID09IGUucG9zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRNb3ZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5waWNrdXApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmxpZmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5kYW1hZ2VNdWx0aXBsaWVyID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZE1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW52YWxpZE1vdmUpIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGludmFsaWRNb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkludmFsaWQgbW92ZSBnZW5lcmF0ZVwiICsgYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93LlZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgYWN0b3JJZCA9IGVudGl0aWVzLkluZGV4T2YoYWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWZWN0b3IyRCBtb3ZlVG8gPSBhY3Rvci5wb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZlY3RvcjJEIG1vdmVGcm9tID0gYWN0b3IucG9zIC0gcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3JlYXRlSGFwcCgoaW50KU1vdmVEYXRhVGFncy5Nb3ZlbWVudCwgbmV3IEhhcHBNb3ZlRGF0YShhY3RvcklkKSwgbmV3IEhhcHBNb3ZlbWVudChtb3ZlRnJvbSwgbW92ZVRvLCBmYWxzZSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYmF0dGxlTWFpbi5oYXBwTWFuYWdlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAuQWRkKG5ldyBIYXBwKEJhdHRsZU1haW4uSGFwcFRhZy5Nb3ZlbWVudEZhaWwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKGFjdG9ySWQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKGFjdG9yLnBvcy5YKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShhY3Rvci5wb3MuWSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9iYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLnBvcyAtPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgYWN0b3JJZCA9IGVudGl0aWVzLkluZGV4T2YoYWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWZWN0b3IyRCBtb3ZlVG8gPSBhY3Rvci5wb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZlY3RvcjJEIG1vdmVGcm9tID0gYWN0b3IucG9zIC0gcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3JlYXRlSGFwcCgoaW50KU1vdmVEYXRhVGFncy5Nb3ZlbWVudCwgbmV3IEhhcHBNb3ZlRGF0YShhY3RvcklkKSwgbmV3IEhhcHBNb3ZlbWVudChtb3ZlRnJvbSwgbW92ZVRvLCB0cnVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJNT1ZFIEhBUFAgU1VDQ0VTU1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYSBpcyBEZWFsRGFtYWdlQWN0aW9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZGEgPSBhIGFzIERlYWxEYW1hZ2VBY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dGFja0VsZW1lbnQgPSBkZGEuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGRhLnRhcmdldCA9PSBUYXJnZXQuQXJlYSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmVhID0gZGRhLmFyZWE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZlcmVuY2VVc2VyT2ZBcmVhID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGFyZWEudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IG1pcnJvcmluZ1ggPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0b3IuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpIC8vZW5lbWllcyBhY3Qgb24gb3Bwb3NpdGUgc2lkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXJyb3JpbmdYID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHBvaW50IGluIGFyZWEucG9pbnRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VhcmNoUG9zID0gcG9pbnQgKiBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKG1pcnJvcmluZ1gsIDEpICsgcmVmZXJlbmNlVXNlck9mQXJlYS5wb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiU2VhcmNoIHBvaW50IFwiK3NlYXJjaFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0aWVzW2ldLnBvcyA9PSBzZWFyY2hQb3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWFsRGFtYWdlKGFjdG9yLCBkZGEsIGVudGl0aWVzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZmluZCB0YXJnZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgdGFyZ2V0ID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGRkYS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlYWxEYW1hZ2UoYWN0b3IsIGRkYSwgdGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYSBpcyBTdW1tb25FbnRpdHkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlID0gYSBhcyBTdW1tb25FbnRpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZW15V2hpY2ggPSBzZS5lbmVteVdoaWNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmVteUlkID0gYmF0dGxlTWFpbi5CYXR0bGVDb25maWcuZW5lbWllc1RvU3VtbW9uW2VuZW15V2hpY2hdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbnRpdGllcyA9IGJhdHRsZU1haW4uZW50aXRpZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9ucyA9IEdldEVtcHR5U3BvdHMoc2lkZToxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb25zLkNvdW50ID09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yMkQgc3VtbW9uUG9zID0gc2UucHJlZmVyZW50aWFsUm93Q29sdW1uO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcG9zaXRpb25zLkNvbnRhaW5zKHN1bW1vblBvcykpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tb25Qb3MgPSBwb3NpdGlvbnNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG5ldyBTcGF3bkRhdGEoZW5lbXlJZCwgc3VtbW9uUG9zLCAoaW50KUJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGEgaXMgQW5pbWF0aW9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhbmltID0gYSBhcyBBbmltYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgdGFyZ2V0ID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGFuaW0udGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJlYSA9IGFuaW0uYXJlYTtcclxuICAgICAgICAgICAgICAgICAgICBIYXBwQXJlYSBoYXBwQXJlYSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZWEgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZlcmVuY2VVc2VyT2ZBcmVhID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGFyZWEudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBtaXJyb3JpbmdYID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdG9yLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KSAvL2VuZW1pZXMgYWN0IG9uIG9wcG9zaXRlIHNpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlycm9yaW5nWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBBcmVhID0gbmV3IEhhcHBBcmVhKGFyZWEsIHJlZmVyZW5jZVVzZXJPZkFyZWEucG9zLCBtaXJyb3JpbmdYKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHRhcmdldElkID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJZCA9IGVudGl0aWVzLkluZGV4T2YodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBDcmVhdGVIYXBwKG1kLCBoYXBwQXJlYSwgbmV3IEhhcHBNb3ZlRGF0YSh1c2VySWQsIHRhcmdldElkLCBhbmltLmVsZW1lbnQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW0udGFyZ2V0ICE9IFRhcmdldC5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcE1hbmFnZXJcclxuLkFkZChuZXcgSGFwcChCYXR0bGVNYWluLkhhcHBUYWcuQXR0YWNrSGl0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShlbnRpdGllcy5JbmRleE9mKHRhcmdldCkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKHVzZXJJZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoKGludClhbmltLmVsZW1lbnQpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1vdmVUaWNrID09IG1kLnVuaXRzLkNvdW50IC0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbWQudW5pdHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFjdCBpbiBpdGVtLnRoaW5nc1RvSGFwcGVuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdCBpcyBEZWFsRGFtYWdlQWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VFbGVtZW50KGFjdG9yLCAoYWN0IGFzIERlYWxEYW1hZ2VBY3Rpb24pLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PFZlY3RvcjJEPiBHZXRFbXB0eVNwb3RzKGludCBzaWRlID0gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhdXguQ2xlYXIoKTtcclxuICAgICAgICAgICAgaW50IG9mZlggPSAwO1xyXG4gICAgICAgICAgICBpZiAoc2lkZSA9PSAxKSBvZmZYID0gMztcclxuICAgICAgICAgICAgaW50IHdpZHRoID0gYmF0dGxlTWFpbi5Cb2FyZFdpZHRoIC8gMjtcclxuICAgICAgICAgICAgaWYgKHNpZGUgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICB3aWR0aCA9IGJhdHRsZU1haW4uQm9hcmRXaWR0aDtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGJhdHRsZU1haW4uQm9hcmRIZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LkFkZChuZXcgVmVjdG9yMkQoaStvZmZYLGopKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZW50aXRpZXMgPSBiYXR0bGVNYWluLmVudGl0aWVzO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuQWxpdmUgJiYgYXV4LkNvbnRhaW5zKGUucG9zKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXguUmVtb3ZlKGUucG9zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXV4O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDaGFuZ2VFbGVtZW50KEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGFjdG9yLCBCYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChhY3Rvci5lbGVtZW50ID09IGVsZW1lbnQpIHJldHVybjtcclxuICAgICAgICAgICAgYWN0b3IuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHZhciB0aCA9IG5ldyBIYXBwVGFncygoaW50KU1pc2NIYXBwVGFncy5DaGFuZ2VFbGVtZW50KTtcclxuICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQodGgsIG5ldyBIYXBwTW92ZURhdGEoZW50aXRpZXMuSW5kZXhPZihhY3RvciksIC0xLCBlbGVtZW50KSkuQWRkQ29tcG9uZW50KHRpbWVTdGFtcC5HZXRTbmFwKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENyZWF0ZUhhcHAoTW92ZURhdGEgbWQsIG9iamVjdCBjb21wMSwgb2JqZWN0IGNvbXAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoID0gbmV3IEhhcHBUYWdzKG1kLnRhZ3MpO1xyXG4gICAgICAgICAgICB2YXIgZSA9IGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KHRoLCB0aW1lU3RhbXAuR2V0U25hcCgpKTtcclxuICAgICAgICAgICAgaWYgKGNvbXAxICE9IG51bGwpIGUuQWRkQ29tcG9uZW50KGNvbXAxKTtcclxuICAgICAgICAgICAgaWYgKGNvbXAyICE9IG51bGwpIGUuQWRkQ29tcG9uZW50KGNvbXAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDcmVhdGVIYXBwKGludCB0YWcsIG9iamVjdCBjb21wMSwgb2JqZWN0IGNvbXAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoID0gbmV3IEhhcHBUYWdzKHRhZyk7XHJcbiAgICAgICAgICAgIHZhciBlID0gZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQodGgsIHRpbWVTdGFtcC5HZXRTbmFwKCkpO1xyXG4gICAgICAgICAgICBpZiAoY29tcDEgIT0gbnVsbCkgZS5BZGRDb21wb25lbnQoY29tcDEpO1xyXG4gICAgICAgICAgICBpZiAoY29tcDIgIT0gbnVsbCkgZS5BZGRDb21wb25lbnQoY29tcDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERlYWxEYW1hZ2UoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgYWN0b3IsIERlYWxEYW1hZ2VBY3Rpb24gZGRhLCBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSB0YXJnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCYXR0bGVNYWluLkVsZW1lbnQgYXR0YWNrRWxlbWVudCA9IGRkYS5lbGVtZW50O1xyXG4gICAgICAgICAgICBib29sIGVsZW1lbnRhbEJsb2NrID0gYXR0YWNrRWxlbWVudCA9PSB0YXJnZXQuZWxlbWVudCAmJiBhdHRhY2tFbGVtZW50ICE9IEJhdHRsZU1haW4uRWxlbWVudC5Ob25lO1xyXG4gICAgICAgICAgICBib29sIHN1cGVyRWZmZWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGludCBkYW1hZ2UgPSAwO1xyXG4gICAgICAgICAgICBpbnQgdGFyZ2V0SWQgPSBlbnRpdGllcy5JbmRleE9mKHRhcmdldCk7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50YWxCbG9jaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghZWxlbWVudGFsQmxvY2spXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG11bCA9IGJhdHRsZU1haW4uQ2FsY3VsYXRlQXR0YWNrTXVsdGlwbGllcihhY3Rvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbXVsICo9IGJhdHRsZU1haW4uQ2FsY3VsYXRlRGVmZW5kZXJNdWx0aXBsaWVyKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFja0VsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkZpcmUgJiYgdGFyZ2V0LmVsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkljZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhdHRhY2tFbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyICYmIHRhcmdldC5lbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5GaXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGF0dGFja0VsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkljZSAmJiB0YXJnZXQuZWxlbWVudCA9PSBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlcilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bCAqPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBlckVmZmVjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGFtYWdlID0gZGRhLmRhbWFnZSAqIChpbnQpbXVsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5saWZlIC09IGRhbWFnZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBhY3Rvci5kYW1hZ2VNdWx0aXBsaWVyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBoYXBwTWFuYWdlci5BZGQobmV3IEhhcHAoQmF0dGxlTWFpbi5IYXBwVGFnLkRhbWFnZVRha2VuKSlcclxuICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKHRhcmdldElkKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5DcmVhdGVIYXBwKChpbnQpTWlzY0hhcHBUYWdzLkRhbWFnZSwgbmV3IEhhcHBEYW1hZ2VEYXRhKHRhcmdldC5lbGVtZW50LCBkZGEuZWxlbWVudCwgZW50aXRpZXMuSW5kZXhPZih0YXJnZXQpLCBkYW1hZ2UsIHN1cGVyRWZmZWN0aXZlLCBlbGVtZW50YWxCbG9jayksIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmxpZmUgPD0gMCAmJiAhc3VwZXJFZmZlY3RpdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENyZWF0ZUhhcHAoKGludClNaXNjSGFwcFRhZ3MuRGVhdGgsIG5ldyBIYXBwTW92ZURhdGEodGFyZ2V0SWQpLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgUmVzb2x2ZVRhcmdldChCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBhY3RvciwgTGlzdDxCYXR0bGVNYWluLkJhdHRsZUVudGl0eT4gZW50aXRpZXMsIFRhcmdldCB0YXJnZXRUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldFR5cGUgPT0gVGFyZ2V0LlNlbGYpIHJldHVybiBhY3RvcjtcclxuICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgdGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgZmxvYXQgbWluRGlzID0gMTA7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlMiBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlMi5EZWFkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rvci5UeXBlICE9IGUyLlR5cGVcclxuICAgICAgICAgICAgICAgICAgICAmJiBlMi5UeXBlICE9IEJhdHRsZU1haW4uRW50aXR5VHlwZS5wYW5lbGVmZmVjdFxyXG4gICAgICAgICAgICAgICAgICAgICYmIGUyLlR5cGUgIT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBib29sIHNhbWVIZWlnaHQgPSBhY3Rvci5wb3MuWSA9PSBlMi5wb3MuWTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNhbWVIZWlnaHQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdCBkaXMgPSBhY3Rvci5wb3MuWCAtIGUyLnBvcy5YO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzIDwgMCkgZGlzICo9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzIDwgbWluRGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EaXMgPSBkaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBlMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwVGFnc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PGludD4gdGFncyA9IG5ldyBMaXN0PGludD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBUYWdzKExpc3Q8aW50PiB0YWdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YWdzLkFkZFJhbmdlKHRhZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBUYWdzKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGFncy5BZGQoaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcFRhZ3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIE1pc2NIYXBwVGFnc3tcclxuICAgICAgICBDaGFuZ2VFbGVtZW50ID0gNTAwLFxyXG4gICAgICAgIERhbWFnZSA9IDUwMSxcclxuICAgICAgICBEZWF0aCA9IDUwMlxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwRGFtYWdlRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXR0bGVNYWluLkVsZW1lbnQgdGFyZ2V0RSwgZGFtYWdlRTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHRhcmdldDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGFtb3VudDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBzdXBlckVmZmVjdGl2ZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBlbGVtZW50YWxCbG9jaztcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBEYW1hZ2VEYXRhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcERhbWFnZURhdGEoQmF0dGxlTWFpbi5FbGVtZW50IHRhcmdldEUsIEJhdHRsZU1haW4uRWxlbWVudCBkYW1hZ2VFLCBpbnQgdGFyZ2V0LCBpbnQgYW1vdW50LCBib29sIHN1cGVyRWZmZWN0aXZlLCBib29sIGVsZW1lbnRhbEJsb2NrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRFID0gdGFyZ2V0RTtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2VFID0gZGFtYWdlRTtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuYW1vdW50ID0gYW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLnN1cGVyRWZmZWN0aXZlID0gc3VwZXJFZmZlY3RpdmU7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudGFsQmxvY2sgPSBlbGVtZW50YWxCbG9jaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBNb3ZlRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgdXNlcjtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHRhcmdldCA9IC0xO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IEJhdHRsZU1haW4uRWxlbWVudC5Ob25lO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcE1vdmVEYXRhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcE1vdmVEYXRhKGludCB1c2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwTW92ZURhdGEoaW50IHVzZXIsIGludCB0YXJnZXQsIEJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwTW92ZW1lbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVmVjdG9yMkQgbW92ZUZyb207XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFZlY3RvcjJEIG1vdmVUbztcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBzdWNjZXNzO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBNb3ZlbWVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBNb3ZlbWVudChWZWN0b3IyRCBtb3ZlRnJvbSwgVmVjdG9yMkQgbW92ZVRvLCBib29sIHN1Y2Nlc3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVGcm9tID0gbW92ZUZyb207XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVRvID0gbW92ZVRvO1xyXG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3MgPSBzdWNjZXNzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcEFyZWFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQXJlYSBhcmVhO1xyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRCBvZmZzZXQgPSBuZXcgVmVjdG9yMkQoKTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IG1pcnJvcmluZ1g7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwQXJlYShBcmVhIGFyZWEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSBhcmVhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBBcmVhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEFyZWEoQXJlYSBhcmVhLCBWZWN0b3IyRCBvZmZzZXQsIGludCBtaXJyb3JpbmdYKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIHRoaXMubWlycm9yaW5nWCA9IG1pcnJvcmluZ1g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuRGVidWdFeHRyYTtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5IYXBwc1xyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBDdXJyZW50VGltZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBMaXN0PEhhcHA+IEhhcHBzID0gbmV3IExpc3Q8SGFwcD4oKTtcclxuICAgICAgICBMaXN0PEhhcHBIYW5kbGVyPiBoYW5kbGVycyA9IG5ldyBMaXN0PEhhcHBIYW5kbGVyPigpO1xyXG4gICAgICAgIGludCBsYXRlc3RIYW5kbGVkID0gLTE7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZEhhbmRsZXIoSGFwcEhhbmRsZXIgaGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQoaGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVHJ5SGFuZGxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGxhdGVzdEhhbmRsZWQgIT0gQ3VycmVudFRpbWUpXHJcbiAgICAgICAgICAgICAgICBIYW5kbGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBIYW5kbGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGF0ZXN0SGFuZGxlZCA9IEN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaCBpbiBoYW5kbGVycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IEhhcHBzLkNvdW50IC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGNoZWNrIGFzc3VtZXMgaGFwcHMgYXJlIG9yZGVyZWQgYnkgdGltZSBzdGFtcFxyXG4gICAgICAgICAgICAgICAgICAgIC8vd2hpY2ggdGhleSBzaG91bGQgYmUgYXV0b21hdGljYWxseVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChIYXBwc1tpXS5UaW1lU3RhbXAgIT0gQ3VycmVudFRpbWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWJ1Z0V4LkxvZyhcIkhhcHBlbmluZyBub3QgZXF1YWwgdG8gY3VycmVudCB0aW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBoYXNUYWdzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdGFnc05lZWRlZCBpbiBoLm5lY2Vzc2FyeVRhZ3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUhhcHBzW2ldLkhhc1RhZyh0YWdzTmVlZGVkKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzVGFncyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1RhZ3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWJ1Z0V4LkxvZyhcIkhhcHBlbmluZyBoYW5kbGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoLkhhbmRsZShIYXBwc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlYnVnRXguTG9nKFwiSGFwcGVuaW5nIHRhZyBpcyBkaWZmZXJlbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcCBBZGQoSGFwcCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaC5UaW1lU3RhbXAgPSBDdXJyZW50VGltZTtcclxuICAgICAgICAgICAgSGFwcHMuQWRkKGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gaDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFRpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VycmVudFRpbWUrKztcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBcclxuICAgIHtcclxuICAgICAgICAvL3B1YmxpYyBzdHJpbmcgTWFpblRhZztcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IHRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIGludCBUaW1lU3RhbXA7XHJcbiAgICAgICAgTGlzdDxBdHRyaWJ1dGU+IGF0dHJzID0gbmV3IExpc3Q8QXR0cmlidXRlPigpO1xyXG5cclxuICAgICAgICAvL3B1YmxpYyBIYXBwKElDb252ZXJ0aWJsZSBjKVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vICAgIHRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihjKSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwKG9iamVjdCBtYWluVGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9NYWluVGFnID0gbWFpblRhZy5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICB0YWdzLkFkZChDb252ZXJ0LlRvSW50MzIobWFpblRhZykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEF0dHJpYnV0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IFZhbHVlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgQXR0cmlidXRlIFNldFZhbHVlKGZsb2F0IGYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFZhbHVlID0gZjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBUYWdIb2xkZXIgdGFncyA9IG5ldyBUYWdIb2xkZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwIEFkZEF0dHJpYnV0ZShBdHRyaWJ1dGUgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF0dHJzLkFkZChhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBpbnQgR2V0QXR0cmlidXRlX0ludChpbnQgaW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludClhdHRyc1tpbmRleF0uVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIEhhc1RhZyhpbnQgdGFnc05lZWRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YWdzLkNvbnRhaW5zKHRhZ3NOZWVkZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcEhhbmRsZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IG5lY2Vzc2FyeVRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIEFjdGlvbjxIYXBwPiBIYW5kbGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwSGFuZGxlcihvYmplY3QgbWFpblRhZywgQWN0aW9uPEhhcHA+IGhhbmRsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubmVjZXNzYXJ5VGFncy5BZGQoQ29udmVydC5Ub0ludDMyKG1haW5UYWcpKTtcclxuICAgICAgICAgICAgSGFuZGxlID0gaGFuZGxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGFnSG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8b2JqZWN0PiBUYWdzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBIYXNUYWcob2JqZWN0IHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGFncy5Db250YWlucyh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWRkKG9iamVjdCB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGFncy5BZGQodik7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgTGlzdDxvYmplY3Q+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19UYWdzPW5ldyBMaXN0PG9iamVjdD4oKTt9XHJcblxyXG5cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIElucHV0SG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8SW5wdXQ+IGlucHV0cyA9IG5ldyBMaXN0PElucHV0PigpO1xyXG4gICAgICAgIExpc3Q8SW5wdXRUYWdzPiB0YWdzID0gbmV3IExpc3Q8SW5wdXRUYWdzPigpO1xyXG4gICAgICAgIHB1YmxpYyBJbnB1dCBpbnB1dEZvckNvbmZpcm1hdGlvbjtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBDbGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnB1dHMuQ2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWRkKElucHV0IGlucHV0LCBJbnB1dFRhZ3MgdGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW5wdXRzLkFkZChpbnB1dCk7XHJcbiAgICAgICAgICAgIHRhZ3MuQWRkKHRhZyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBUYWdJcyhpbnQgaTIsIElucHV0VGFncyB0YWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGFncy5Db3VudCA8PSBpMikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGFnc1tpMl0gPT0gdGFnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBDb250YWlucyhJbnB1dCBrZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaSBpbiBpbnB1dHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpLmFyZzEgPT0ga2V5LmFyZzEgJiYgaS50eXBlID09IGtleS50eXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gSW5wdXRUYWdze1xyXG4gICAgICAgIE5PTkUsIE1PVkVGSVgsIE1PVkVVTkZJWCwgTUlTQ1xyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZUNyZWF0b3JQcm9nXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxNb3ZlRGF0YT4gbW92ZURhdGFzID0gbmV3IExpc3Q8TW92ZURhdGE+KCk7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxNb3ZlUmVuZGVyRGF0YT4gbW92ZVJlbmRlcnMgPSBuZXcgTGlzdDxNb3ZlUmVuZGVyRGF0YT4oKTtcclxuICAgICAgICBBcmVhQ3JlYXRpb25VdGlscyBhcmVhVXRpbHMgPSBuZXcgQXJlYUNyZWF0aW9uVXRpbHMoKTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEVDU01hbmFnZXIgZWNzO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZUNyZWF0b3JQcm9nKEVDU01hbmFnZXIgZWNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIE1vdmVEYXRhIGl0ZW0gPSBuZXcgTW92ZURhdGEoXCJcIik7XHJcbiAgICAgICAgICAgIG1vdmVEYXRhcy5BZGQoaXRlbSk7IC8vZG8gbm90aGluZ1xyXG4gICAgICAgICAgICBtb3ZlUmVuZGVycy5BZGQobmV3IE1vdmVSZW5kZXJEYXRhKFwiXCIsIFwiXCIpKTtcclxuICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQoaXRlbSk7XHJcbiAgICAgICAgICAgIEJhc2VVdGlscy5WZWN0b3IyRFtdIGRpcmVjdGlvbnMgPSBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEW10ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIDEpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgtMSwgMCksXHJcbiAgICAgICAgICAgICAgICBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIC0xKSxcclxuICAgICAgICAgICAgICAgIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMSwgMCksIFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzdHJpbmdbXSBtb3ZlTGFiZWxzID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBVcFwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIExlZnRcIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBEb3duXCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgUmlnaHRcIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc3RyaW5nW10gbW92ZUFicmV2ID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiXlwiLFxyXG4gICAgICAgICAgICAgICAgXCI8XCIsXHJcbiAgICAgICAgICAgICAgICBcInZcIixcclxuICAgICAgICAgICAgICAgIFwiPlwiLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGRpcmVjdGlvbnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE5ld01vdmVEYXRhKGxhYmVsOm1vdmVMYWJlbHNbaV0sIGNvbmRpdGlvbjogbmV3IENvbmRpdGlvbihDb25kaXRpb25UeXBlLkNhbk1vdmUsIFRhcmdldC5TZWxmLCBkaXJlY3Rpb25zW2ldKSwgYWN0aW9uOiBuZXcgTW92ZUFjdGlvbihUYXJnZXQuU2VsZiwgZGlyZWN0aW9uc1tpXSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5Nb3ZlbWVudCwgIE1vdmVEYXRhVGFncy5IZXJvSW5pdGlhbCkpO1xyXG4gICAgICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKG5hbWU6bW92ZUxhYmVsc1tpXSwgYWJyZXY6bW92ZUFicmV2W2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkd1blwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgMSwgQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmUpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkd1blwiLCBcIkdcIik7XHJcblxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiRmlyZWd1blwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgQmF0dGxlTWFpbi5FbGVtZW50LkZpcmUpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5GaXJlKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TaG9vdCkpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJGaXJlZ3VuXCIsIFwiRkdcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkljZWd1blwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgQmF0dGxlTWFpbi5FbGVtZW50LkljZSksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgMSwgQmF0dGxlTWFpbi5FbGVtZW50LkljZSkpLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuU2hvb3QpKTtcclxuICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKFwiSWNlZ3VuXCIsIFwiSUdcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIlRodW5kZXJndW5cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKSwgbmV3IERlYWxEYW1hZ2VBY3Rpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCAxLCBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlcikpLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuU2hvb3QpKTtcclxuICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKFwiVGh1bmRlcmd1blwiLCBcIlRHXCIpO1xyXG5cclxuICAgICAgICAgICAgQXJlYSBhcmVhID0gQXJlYVVzZXIoKS5Sb3dGb3J3YXJkKHdpZHRoOiAxLCBYRGlzOiAzKTtcclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJJY2Vib21iXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKG5ldyBBbmltYXRpb24oYXJlYSwgQmF0dGxlTWFpbi5FbGVtZW50LkljZSksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKGFyZWEsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5JY2UpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLkJvbWIpKTtcclxuICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKFwiSWNlYm9tYlwiLCBcIklCXCIpO1xyXG5cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJUaHVuZGVyYm9tYlwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKGFyZWEsIEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKSwgbmV3IERlYWxEYW1hZ2VBY3Rpb24oYXJlYSwgMSwgQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLkJvbWIpKTtcclxuICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKFwiVGh1bmRlcmJvbWJcIiwgXCJUQlwiKTtcclxuXHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiU3VtbW9uXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKFN1bW1vbkVudGl0eS5FbmVteSgwLCBuZXcgVmVjdG9yMkQoNSwwKSkpLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuU3VtbW9uKSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIlN1bW1vblwiLCBcIlNVXCIpO1xyXG5cclxuICAgICAgICAgICAgVmVjdG9yMkQgZGlyZWN0aW9uTW92ZSA9IG5ldyBWZWN0b3IyRCgwLCAtMSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiRG93bmZpcmVcIixcclxuICAgICAgICAgICAgICAgIHRpY2tzOiBUaWNrQXJyYXkoXHJcbiAgICAgICAgICAgICAgICAgICAgVGlja1VuaXRDb25kaXRpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBDb25kaXRpb24oQ29uZGl0aW9uVHlwZS5DYW5Nb3ZlLCBUYXJnZXQuU2VsZiwgZGlyZWN0aW9uTW92ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBNb3ZlQWN0aW9uKFRhcmdldC5TZWxmLCBkaXJlY3Rpb25Nb3ZlKSksXHJcbiAgICAgICAgICAgICAgICAgICAgVGlja1VuaXQobmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIEJhdHRsZU1haW4uRWxlbWVudC5GaXJlKSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFRpY2tVbml0KG5ldyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgMSwgQmF0dGxlTWFpbi5FbGVtZW50LkZpcmUpKSksXHJcbiAgICAgICAgICAgICAgICB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuU2hvb3QpKTtcclxuICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKFwiRG93bmZpcmVcIiwgXCJERlwiKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgaW50IEdldE1vdmVJZChzdHJpbmcgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBNb3ZlRGF0YS5GaW5kQnlMYWJlbChtb3ZlRGF0YXMsIHYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBBcmVhQ3JlYXRpb25VdGlscyBBcmVhVXNlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhcmVhVXRpbHMudGFyZ2V0ID0gVGFyZ2V0LlNlbGY7XHJcbiAgICAgICAgICAgIHJldHVybiBhcmVhVXRpbHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgQXJlYUNyZWF0aW9uVXRpbHNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBUYXJnZXQgdGFyZ2V0O1xyXG4gICAgICAgICAgICBpbnQgaGVpZ2h0ID0gMztcclxuXHJcbiAgICAgICAgICAgIGludGVybmFsIEFyZWEgUm93Rm9yd2FyZChpbnQgd2lkdGgsIGludCBYRGlzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmEgPSBuZXcgQXJlYSh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgaW50IG9mZnNldFkgPSAoaW50KU1hdGguRmxvb3IoKGZsb2F0KWhlaWdodCAvIDJmKTtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgd2lkdGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhLnBvaW50cy5BZGQobmV3IFZlY3RvcjJEKGkrWERpcywgai1vZmZzZXRZKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE5ld01vdmVUZXh0UmVuZGVyRGF0YShzdHJpbmcgbmFtZSwgc3RyaW5nIGFicmV2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW92ZVJlbmRlcnMuQWRkKG5ldyBNb3ZlUmVuZGVyRGF0YShuYW1lLCBhYnJldikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE5ld01vdmVEYXRhKHN0cmluZyBsYWJlbCwgVGlja1tdIHRpY2tzLCBvYmplY3RbXSB0YWdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG12ID0gbmV3IE1vdmVEYXRhKGxhYmVsKTtcclxuICAgICAgICAgICAgbXYudW5pdHMuQWRkUmFuZ2UodGlja3MpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiB0YWdzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtdi50YWdzLkFkZChDb252ZXJ0LlRvSW50MzIoaXRlbSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG12KTtcclxuICAgICAgICAgICAgbW92ZURhdGFzLkFkZChtdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTmV3TW92ZURhdGEoc3RyaW5nIGxhYmVsLCBDb25kaXRpb24gY29uZGl0aW9uLCBvYmplY3QgYWN0aW9uLCBvYmplY3RbXSB0YWdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG12ID0gbmV3IE1vdmVEYXRhKGxhYmVsKTtcclxuICAgICAgICAgICAgVGljayB0aWNrID0gbmV3IFRpY2soKTtcclxuICAgICAgICAgICAgdGljay5jb25kaXRpb24gPSBjb25kaXRpb247XHJcbiAgICAgICAgICAgIHRpY2sudGhpbmdzVG9IYXBwZW4uQWRkKGFjdGlvbik7XHJcbiAgICAgICAgICAgIG12LnVuaXRzLkFkZCh0aWNrKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gdGFncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbXYudGFncy5BZGQoQ29udmVydC5Ub0ludDMyKGl0ZW0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChtdik7XHJcbiAgICAgICAgICAgIG1vdmVEYXRhcy5BZGQobXYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBUaWNrW10gT25lVGlja1BlckFjdGlvbihwYXJhbXMgb2JqZWN0W10gYWN0aW9ucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRpY2tbXSB0aWNrcyA9IG5ldyBUaWNrW2FjdGlvbnMuTGVuZ3RoXTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0aWNrcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGlja3NbaV0gPSBuZXcgVGljayhhY3Rpb25zW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGlja3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFRpY2sgVGlja1VuaXRDb25kaXRpb24oQ29uZGl0aW9uIGNvbmRpdGlvbiwgcGFyYW1zIE9iamVjdFtdIGFjdGlvbnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUaWNrIHRpY2sgPSBuZXcgVGljayhhY3Rpb25zKTtcclxuICAgICAgICAgICAgdGljay5jb25kaXRpb24gPSBjb25kaXRpb247XHJcbiAgICAgICAgICAgIHJldHVybiB0aWNrO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgVGljayBUaWNrVW5pdChwYXJhbXMgT2JqZWN0W10gYWN0aW9ucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGljayhhY3Rpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVGlja1tdIFRpY2tBcnJheShwYXJhbXMgVGlja1tdIHRpY2tzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRpY2tzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvYmplY3RbXSBUYWdBcnJheShwYXJhbXMgb2JqZWN0W10gYXJncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcmdzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZVJlbmRlckRhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIExhYmVsO1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQWJyZXY7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlUmVuZGVyRGF0YShzdHJpbmcgbGFiZWwsIHN0cmluZyBhYnJldilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTGFiZWwgPSBsYWJlbDtcclxuICAgICAgICAgICAgdGhpcy5BYnJldiA9IGFicmV2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBEZXNjcmlwdGlvbiB7IGdldDsgaW50ZXJuYWwgc2V0OyB9XHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBY2Nlc3NvclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgTGVuZ3RoIHsgZ2V0IHsgcmV0dXJuIFNlbGVjdGVkRW50aXRpZXMuQ291bnQ7IH0gfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBUeXBlW10gVHlwZXNQcm9oaWJpdGVkIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVHlwZVtdIFR5cGVzTmVjZXNzYXJ5O1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8RW50aXR5PiBTZWxlY3RlZEVudGl0aWVzID0gbmV3IExpc3Q8RW50aXR5PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgQWNjZXNzb3IocGFyYW1zIFR5cGVbXSBzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVHlwZXNOZWNlc3NhcnkgPSBzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBFbnRpdHlBZGRlZChFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTZWxlY3RlZEVudGl0aWVzLkNvbnRhaW5zKGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBHZXQoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU2VsZWN0ZWRFbnRpdGllc1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFF1aWNrQWNjZXNzb3JPbmU8VDE+XHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBRdWlja0FjY2Vzc29yT25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yID0gbmV3IEFjY2Vzc29yKHR5cGVvZihUMSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgQWNjZXNzb3IgYWNjZXNzb3I7XHJcbiAgICAgICAgcHVibGljIGludCBDb3VudCB7IGdldCB7IHJldHVybiBhY2Nlc3Nvci5MZW5ndGg7IH0gfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgVDEgQ29tcDEoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllc1tpXS5HZXRDb21wb25lbnQ8VDE+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IEVudGl0eShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4gXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGludGVybmFsIEFjY2Vzc29yIGFjY2Vzc29yO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgTGVuZ3RoIHsgZ2V0IHsgcmV0dXJuIGFjY2Vzc29yLkxlbmd0aDsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUMSBDb21wMShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldLkdldENvbXBvbmVudDxUMT4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgRW50aXR5KGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXNbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUXVpY2tBY2Nlc3NvclR3bygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhY2Nlc3NvciA9IG5ldyBBY2Nlc3Nvcih0eXBlb2YoVDEpLCB0eXBlb2YoVDIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgVDIgQ29tcDIoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllc1tpXS5HZXRDb21wb25lbnQ8VDI+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guRUNTXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDbG9uZWRTdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+IGNvbXBzID0gbmV3IERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+KCk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guRUNTXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBFQ1NNYW5hZ2VyXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEVDU01hbmFnZXJbXSBtYW5hZ2VycyA9IG5ldyBFQ1NNYW5hZ2VyWzIwXTtcclxuICAgICAgICBEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPiBjb21wcyA9IG5ldyBEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPigpO1xyXG4gICAgICAgIHByaXZhdGUgaW50IEVDU0lkO1xyXG4gICAgICAgIGludCBlbnRpdHlJZE1heCA9IC0xO1xyXG4gICAgICAgIExpc3Q8QWNjZXNzb3I+IGFjY2Vzc29ycyA9IG5ldyBMaXN0PEFjY2Vzc29yPigpO1xyXG5cclxuICAgICAgICBEaWN0aW9uYXJ5PFR5cGUsIEFjdGlvbjxPYmplY3QsIE9iamVjdD4+IENvcHlNZXRob2RzID0gbmV3IERpY3Rpb25hcnk8VHlwZSwgQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4oKTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBFQ1NNYW5hZ2VyKCkgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQcm9jZXNzb3JBY2Nlc3NvciBDcmVhdGVQcm9jZXNzb3IoQWNjZXNzb3IgYWNjZXNzb3IsIEFjdGlvbjxBY2Nlc3Nvcj4gYWN0aW9uKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvY2Vzc29yQWNjZXNzb3IoYWN0aW9uLCBhY2Nlc3Nvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRDb3B5TWV0aG9kKFR5cGUgdHlwZSwgQWN0aW9uPG9iamVjdCwgb2JqZWN0PiBjb3B5TWV0aG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb3B5TWV0aG9kcy5BZGQodHlwZSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIG9iamVjdD4pY29weU1ldGhvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBY2Nlc3NvciBDcmVhdGVBY2Nlc3NvcihUeXBlW10gbmVjZXNzYXJ5LCBUeXBlW10gbm90KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGFjYyA9IG5ldyBBY2Nlc3NvcihuZWNlc3NhcnkpO1xyXG4gICAgICAgICAgICBhY2MuVHlwZXNQcm9oaWJpdGVkID0gbm90O1xyXG4gICAgICAgICAgICBBZGRBY2Nlc3NvcihhY2MpO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4gUXVpY2tBY2Nlc3NvcjI8VDEsIFQyPigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4gYWNjZXNzb3IgPSBuZXcgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+KCk7XHJcbiAgICAgICAgICAgIEFkZEFjY2Vzc29yKGFjY2Vzc29yLmFjY2Vzc29yKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFF1aWNrQWNjZXNzb3JPbmU8VDE+IFF1aWNrQWNjZXNzb3IxPFQxPigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBRdWlja0FjY2Vzc29yT25lPFQxPiBhY2Nlc3NvciA9IG5ldyBRdWlja0FjY2Vzc29yT25lPFQxPigpO1xyXG4gICAgICAgICAgICBBZGRBY2Nlc3NvcihhY2Nlc3Nvci5hY2Nlc3Nvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3NvcjtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgICNyZWdpb24gc3RhdGljIG1ldGhvZHNcclxuXHJcblxyXG4gICAgICAgIGludGVybmFsIHN0YXRpYyBFQ1NNYW5hZ2VyIEdldEluc3RhbmNlKEVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1hbmFnZXJzW2UuZWNzXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRUNTTWFuYWdlciBDcmVhdGUoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbWFuYWdlcnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChtYW5hZ2Vyc1tpXSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hbmFnZXJzW2ldID0gbmV3IEVDU01hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYW5hZ2Vyc1tpXS5FQ1NJZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hbmFnZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChvYmplY3QgdilcclxuICAgICAgICB7XHJcbkVudGl0eSBlO1xuICAgICAgICAgICAgQ3JlYXRlRW50aXR5KG91dCBlKTtcclxuICAgICAgICAgICAgQWRkQ29tcG9uZW50KGUsIHYpO1xyXG4gICAgICAgICAgICByZXR1cm4gZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChvYmplY3Qgdiwgb2JqZWN0IHYyKVxyXG4gICAgICAgIHtcclxuRW50aXR5IGU7XG4gICAgICAgICAgICBDcmVhdGVFbnRpdHkob3V0IGUpO1xyXG4gICAgICAgICAgICBBZGRDb21wb25lbnQoZSwgdik7XHJcbiAgICAgICAgICAgIEFkZENvbXBvbmVudChlLCB2Mik7XHJcbiAgICAgICAgICAgIHJldHVybiBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBDcmVhdGVFbnRpdHkob3V0IEVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW50aXR5SWRNYXgrKztcclxuICAgICAgICAgICAgRW50aXR5IGVudGl0eSA9IG5ldyBFbnRpdHkodGhpcy5FQ1NJZCwgZW50aXR5SWRNYXgpO1xyXG4gICAgICAgICAgICBlID0gZW50aXR5O1xyXG4gICAgICAgICAgICByZXR1cm4gZW50aXR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBDcmVhdGVFbnRpdHkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW50aXR5SWRNYXgrKztcclxuICAgICAgICAgICAgRW50aXR5IGVudGl0eSA9IG5ldyBFbnRpdHkodGhpcy5FQ1NJZCwgZW50aXR5SWRNYXgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZW50aXR5O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBQcm9jZXNzb3JGbGV4PFQxLCBUMj4gUXVpY2tQcm9jZXNzb3JGbGV4PFQxLCBUMj4oQWN0aW9uPFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPj4gcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFByb2Nlc3NvckZsZXg8VDEsIFQyPiBwcm9jZXNzb3JGbGV4ID0gbmV3IFByb2Nlc3NvckZsZXg8VDEsIFQyPihwKTtcclxuICAgICAgICAgICAgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+IGFjY2Vzc29yID0gcHJvY2Vzc29yRmxleC5hY2Nlc3NvcjtcclxuICAgICAgICAgICAgQWNjZXNzb3IgYWNjZXNzb3IxID0gYWNjZXNzb3IuYWNjZXNzb3I7XHJcbiAgICAgICAgICAgIEFkZEFjY2Vzc29yKGFjY2Vzc29yMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzb3JGbGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEFkZEFjY2Vzc29yKEFjY2Vzc29yIGFjY2Vzc29yMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFjY2Vzc29ycy5BZGQoYWNjZXNzb3IxKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPD0gZW50aXR5SWRNYXg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlQWNjZXNzb3JFbnRpdHkoYWNjZXNzb3IxLCBpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVBY2Nlc3NvckVudGl0eShBY2Nlc3NvciBhY2Nlc3NvciwgaW50IGVudGl0eUlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRW50aXR5IGVudGl0eSA9IG5ldyBFbnRpdHkoRUNTSWQsIGVudGl0eUlkKTtcclxuICAgICAgICAgICAgYm9vbCBiZWxvbmcgPSBIYXNBbGxDb21wcyhhY2Nlc3Nvci5UeXBlc05lY2Vzc2FyeSwgZW50aXR5SWQpICYmIEhhc05vbmVPZlRoZXNlQ29tcHMoYWNjZXNzb3IuVHlwZXNQcm9oaWJpdGVkLCBlbnRpdHlJZCk7XHJcbiAgICAgICAgICAgIGJvb2wgbWVtYmVyID0gYWNjZXNzb3IuRW50aXR5QWRkZWQoZW50aXR5KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChiZWxvbmcgIT0gbWVtYmVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmVsb25nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXMuQWRkKGVudGl0eSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIlJFTU9WRUQgRU5USVRZIFwiK2FjY2Vzc29yLlR5cGVzTmVjZXNzYXJ5WzBdKTtcclxuICAgICAgICAgICAgICAgICAgICBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzLlJlbW92ZShlbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoYWNjZXNzb3IuRW50aXR5QWRkZWQoZW50aXR5KStcIiBCRUxPTkdcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDbG9uZVN0YXRlKENsb25lZFN0YXRlIGNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNvbXBzID0gdGhpcy5jb21wcztcclxuICAgICAgICAgICAgRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4gY29tcHMyID0gY3MuY29tcHM7XHJcbiAgICAgICAgICAgIENvcHkoY29tcHMsIGNvbXBzMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXN0b3JlU3RhdGUoQ2xvbmVkU3RhdGUgY3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY29tcHMgPSB0aGlzLmNvbXBzO1xyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPiBjb21wczIgPSBjcy5jb21wcztcclxuICAgICAgICAgICAgQ29weShjb21wczIsIGNvbXBzKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDw9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZW50aXR5SWRNYXg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYWNjZXNzb3JzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFVwZGF0ZUFjY2Vzc29yRW50aXR5KGl0ZW0sIGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTGlzdDxUeXBlPiBhdXggPSBuZXcgTGlzdDxUeXBlPigpO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ29weShEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPiBmcm9tLCBEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPiB0bylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF1eC5DbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gZnJvbSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVHlwZSB0eXBlID0gYy5LZXk7XHJcbiAgICAgICAgICAgICAgICBhdXguQWRkKHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0by5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0by5BZGQodHlwZSwgbmV3IG9iamVjdFszMDBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciB0b0FycmF5ID0gdG9bdHlwZV07XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luID0gYy5WYWx1ZTtcclxuICAgICAgICAgICAgICAgIENvcHkodG8sIHR5cGUsIHRvQXJyYXksIG9yaWdpbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gdG8pIC8vY2hlY2tzIHR5cGVzIGluIHRvLCBzbyBpdCBjYW4gYmUgdGhyb3VnaFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUeXBlIHR5cGUgPSBjLktleTtcclxuICAgICAgICAgICAgICAgIGlmICghYXV4LkNvbnRhaW5zKHR5cGUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5BZGQodHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvQXJyYXkgPSBjLlZhbHVlOyAvL2FjY2VzcyBpbnZlcnRlZCB3aGVuIGNvbXBhcmVkIHRvIHByZXZpb3VzXHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgb3JpZ2luID0gZnJvbVt0eXBlXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRvQXJyYXkuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0FycmF5W2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIlJlbW92aW5nIGVudGl0eVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENvcHkoRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4gdG8sIFR5cGUgdHlwZSwgb2JqZWN0W10gdG9BcnJheSwgb2JqZWN0W10gb3JpZ2luKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWN0aW9uPE9iamVjdCwgT2JqZWN0PiBjb3B5TWV0aG9kID0gbnVsbDtcclxuICAgICAgICAgICAgQ29weU1ldGhvZHMuVHJ5R2V0VmFsdWUodHlwZSwgb3V0IGNvcHlNZXRob2QpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBvcmlnaW4uTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcmlnaW5baV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodG9BcnJheVtpXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIlJlbW92aW5nIGVudGl0eVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9BcnJheVtpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b0FycmF5W2ldID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvQXJyYXlbaV0gPSBBY3RpdmF0b3IuQ3JlYXRlSW5zdGFuY2UodHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29weU1ldGhvZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3B5TWV0aG9kKG9yaWdpbltpXSwgdG9BcnJheVtpXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vRGVlcENsb25lSGVscGVyLkRlZXBDb3B5UGFydGlhbChvcmlnaW5baV0sIHRvQXJyYXlbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBUIEFkZENvbXBvbmVudDxUPihFbnRpdHkgZSkgd2hlcmUgVCA6IG5ldygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUIHQgPSBuZXcgVCgpO1xyXG4gICAgICAgICAgICBBZGRDb21wb25lbnQoZSwgdCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZENvbXBvbmVudChFbnRpdHkgZSwgb2JqZWN0IHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUeXBlIHR5cGUgPSB0LkdldFR5cGUoKTtcclxuICAgICAgICAgICAgaWYgKCFjb21wcy5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29tcHMuQWRkKHR5cGUsIG5ldyBvYmplY3RbMzAwXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29tcHNbdHlwZV1bZS5pZF0gPSB0O1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBhY2Nlc3NvcnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVwZGF0ZUFjY2Vzc29yRW50aXR5KGl0ZW0sIGUuaWQpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlQ29tcG9uZW50KEVudGl0eSBlLCBvYmplY3QgdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR5cGUgdHlwZSA9IHQuR2V0VHlwZSgpO1xyXG4gICAgICAgICAgICBpZiAoIWNvbXBzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb21wcy5BZGQodHlwZSwgbmV3IG9iamVjdFszMDBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb21wc1t0eXBlXVtlLmlkXSA9IG51bGw7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGFjY2Vzc29ycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlQWNjZXNzb3JFbnRpdHkoaXRlbSwgZS5pZCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgSGFzQWxsQ29tcG9uZW50cyhFbnRpdHkgZSwgVHlwZVtdIHR5cGVzTmVjZXNzYXJ5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGlkID0gZS5pZDtcclxuICAgICAgICAgICAgcmV0dXJuIEhhc0FsbENvbXBzKHR5cGVzTmVjZXNzYXJ5LCBpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgSGFzQWxsQ29tcHMoVHlwZVtdIHR5cGVzTmVjZXNzYXJ5LCBpbnQgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdHlwZSBpbiB0eXBlc05lY2Vzc2FyeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjb21wcy5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBzW3R5cGVdW2lkXSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBIYXNOb25lT2ZUaGVzZUNvbXBzKFR5cGVbXSB0eXBlc1Byb2hpYml0ZWQsIGludCBpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlc1Byb2hpYml0ZWQgPT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0eXBlIGluIHR5cGVzUHJvaGliaXRlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wc1t0eXBlXVtpZF0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVCBHZXRDb21wb25lbnQ8VD4oRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUeXBlIHR5cGUgPSB0eXBlb2YoVCk7XHJcbiAgICAgICAgICAgIGlmICghY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vY29tcHMuQWRkKHR5cGUsIG5ldyBvYmplY3RbMzAwXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmYXVsdChUKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKFQpY29tcHNbdHlwZV1bZS5pZF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG4gICAgcHVibGljIHN0cnVjdCBFbnRpdHkgOiBJRXF1YXRhYmxlPEVudGl0eT5cclxuICAgIHtcclxuICAgICAgICByZWFkb25seSBpbnRlcm5hbCBpbnQgZWNzO1xyXG4gICAgICAgIHJlYWRvbmx5IGludGVybmFsIGludCBpZDtcclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eShpbnQgZWNzLCBpbnQgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKEVudGl0eSBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBvdGhlci5pZCA9PSB0aGlzLmlkICYmIG90aGVyLmVjcyA9PSB0aGlzLmVjcztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEV4dGVuc2lvbk1ldGhvZHNcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFJlbW92ZUNvbXBvbmVudCh0aGlzIEVudGl0eSBlLCBvYmplY3QgY29tcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVDU01hbmFnZXIuR2V0SW5zdGFuY2UoZSkuUmVtb3ZlQ29tcG9uZW50KGUsIGNvbXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUIEFkZENvbXBvbmVudDxUPih0aGlzIEVudGl0eSBlKSB3aGVyZSBUOiBuZXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEVDU01hbmFnZXIuR2V0SW5zdGFuY2UoZSkuQWRkQ29tcG9uZW50PFQ+KGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQWRkQ29tcG9uZW50KHRoaXMgRW50aXR5IGUsIG9iamVjdCBjb21wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRUNTTWFuYWdlci5HZXRJbnN0YW5jZShlKS5BZGRDb21wb25lbnQoZSwgY29tcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBHZXRDb21wb25lbnQ8VD4odGhpcyBFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBFQ1NNYW5hZ2VyLkdldEluc3RhbmNlKGUpLkdldENvbXBvbmVudDxUPihlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkVDU1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJvY2Vzc29yRmxleDxUMSwgVDI+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBBY3Rpb248UXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+PiBwO1xyXG4gICAgICAgIGludGVybmFsIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBhY2Nlc3NvcjtcclxuXHJcbiAgICAgICAgcHVibGljIFByb2Nlc3NvckZsZXgoQWN0aW9uPFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPj4gcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucCA9IHA7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yID0gbmV3IFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUnVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHAoYWNjZXNzb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUHJvY2Vzc29yQWNjZXNzb3JcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEFjdGlvbjxBY2Nlc3Nvcj4gcDtcclxuXHJcbiAgICAgICAgQWNjZXNzb3IgYTtcclxuXHJcbiAgICAgICAgcHVibGljIFByb2Nlc3NvckFjY2Vzc29yKEFjdGlvbjxBY2Nlc3Nvcj4gcCwgQWNjZXNzb3IgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucCA9IHA7XHJcbiAgICAgICAgICAgIHRoaXMuYSA9IGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSdW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcChhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRXb3JsZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlIHBhbGV0dGUgPSBEZWZhdWx0UGFsZXR0ZXMuQzRLaXJvS2F6ZTtcclxuICAgICAgICBMaXN0PFRleHRFbnRpdHk+IGFjdGl2ZUFnZW50cyA9IG5ldyBMaXN0PFRleHRFbnRpdHk+KCk7XHJcbiAgICAgICAgTGlzdDxUZXh0RW50aXR5PiBmcmVlQm9hcmRzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICBMaXN0PFRleHRBbmltYXRpb24+IGFuaW1hdGlvbnMgPSBuZXcgTGlzdDxUZXh0QW5pbWF0aW9uPigpO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgbWFpbkJvYXJkO1xyXG4gICAgICAgIGludCBsYXRlc3RJZCA9IC0xO1xyXG5cclxuICAgICAgICBwdWJsaWMgVCBBZGRBbmltYXRpb248VD4oVCB0YSkgd2hlcmUgVCA6IFRleHRBbmltYXRpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbnMuQWRkKHRhKTtcclxuICAgICAgICAgICAgdGEuUmVnaXN0ZXJMaXN0cygpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1haW5Cb2FyZCA9IG5ldyBUZXh0Qm9hcmQod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtYWluQm9hcmQuUmVzZXQoKTtcclxuICAgICAgICAgICAgRHJhd0NoaWxkcmVuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hpbGRyZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBhY3RpdmVBZ2VudHMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlQWdlbnRzW2ldLlJlc2V0QW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW0uTW9kaWZ5KGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlQWdlbnRzW2ldLmZyZWVJZklkbGUgJiYgIWFjdGl2ZUFnZW50c1tpXS5hbmltYXRpbmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJlZUJvYXJkcy5BZGQoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVBZ2VudHMuUmVtb3ZlKGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5Cb2FyZC5JbnNlcnQoYWN0aXZlQWdlbnRzW2ldLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEVudGl0eSBHZXRGcmVlRW50aXR5KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRFbnRpdHkgdGU7XHJcbiAgICAgICAgICAgIGlmIChmcmVlQm9hcmRzLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGUgPSBmcmVlQm9hcmRzW2ZyZWVCb2FyZHMuQ291bnQgLSAxXTtcclxuICAgICAgICAgICAgICAgIGZyZWVCb2FyZHMuUmVtb3ZlQXQoZnJlZUJvYXJkcy5Db3VudCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGUgPSBuZXcgVGV4dEVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgdGUuaWQgPSArK2xhdGVzdElkO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWN0aXZlQWdlbnRzLkFkZCh0ZSk7XHJcbiAgICAgICAgICAgIHRlLmZyZWVJZklkbGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGUuU2V0U2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgdGUuUmVzZXRGdWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IEdldFRlbXBFbnRpdHkoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRlID0gR2V0RnJlZUVudGl0eSh3LCBoKTtcclxuICAgICAgICAgICAgdGUuZnJlZUlmSWRsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkdmFuY2VUaW1lKGZsb2F0IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbmltLlVwZGF0ZSh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVHJ5RW5kQW5pbWF0aW9ucygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbmltLlRyeUVuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEZyZWUoTGlzdDxUZXh0RW50aXR5PiBlbnRpdGllcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmcmVlQm9hcmRzLkFkZFJhbmdlKGVudGl0aWVzKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUFnZW50cy5SZW1vdmUoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWFuaW0uSXNEb25lKCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRleHRFbnRpdHlcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IGlkO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgT3JpZ2luO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgQW5pbWF0aW9uO1xyXG4gICAgICAgIHB1YmxpYyBib29sIGZyZWVJZklkbGUgPSBmYWxzZTtcclxuICAgICAgICBpbnRlcm5hbCBib29sIGFuaW1hdGluZztcclxuXHJcbiAgICAgICAgcHVibGljIGludCBIZWlnaHQgeyBnZXQgeyByZXR1cm4gT3JpZ2luLkhlaWdodDsgfSB9XHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aCB7IGdldCB7IHJldHVybiBPcmlnaW4uV2lkdGg7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEFuaW1hdGlvbi5CYXNlRGF0YSBBbmltQmFzZShmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRleHRBbmltYXRpb24uQmFzZURhdGEobGVuZ3RoLCAwLCBpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBWZWN0b3IyRCBHZXRQb3NpdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gT3JpZ2luLlBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldEFuaW1hdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgQW5pbWF0aW9uLlNldChPcmlnaW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldEZ1bGwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3JpZ2luLlJlc2V0SW52aXNpYmxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldFBvc2l0aW9uKGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9yaWdpbi5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IyRCh4LHkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRQb3NpdGlvbihWZWN0b3IyRCB2ZWN0b3IyRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9yaWdpbi5Qb3NpdGlvbiA9IHZlY3RvcjJEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRTaXplKGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChPcmlnaW4gPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgT3JpZ2luID0gbmV3IFRleHRCb2FyZCh3LCBoKTtcclxuICAgICAgICAgICAgICAgIEFuaW1hdGlvbiA9IG5ldyBUZXh0Qm9hcmQodywgaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT3JpZ2luLlJlc2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgQW5pbWF0aW9uLlJlc2l6ZSh3LCBoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBEZWxheXNBbmltYXRpb24gOiBUZXh0QW5pbWF0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIERlbGF5KGZsb2F0IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGQobmV3IEJhc2VEYXRhKHYsIDAsIC0xKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUG9zaXRpb25BbmltYXRpb24gOiBUZXh0QW5pbWF0aW9uPFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YT5cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBQb3NpdGlvbkRhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkIHRhcmdldCA9IGVudGl0eS5BbmltYXRpb247XHJcbiAgICAgICAgICAgIGlmIChtYWluRGF0YS5wZXJtYW5lbnQpXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBlbnRpdHkuT3JpZ2luO1xyXG4gICAgICAgICAgICB0YXJnZXQuUG9zaXRpb24gPSBWZWN0b3IyRC5JbnRlcnBvbGF0ZVJvdW5kZWQobWFpbkRhdGEuc3RhcnRQb3NpdGlvbiwgbWFpbkRhdGEuZW5kUG9zaXRpb24sIHByb2dyZXNzIC8gbGVuZ3RoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IFBvc2l0aW9uRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvb2wgcGVybWFuZW50O1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb247XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgUG9zaXRpb25EYXRhKFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIFZlY3RvcjJEIGVuZFBvc2l0aW9uLCBib29sIHBlcm0gPSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVybWFuZW50ID0gcGVybTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVGV4dEFuaW1hdGlvbjxUPiA6IFRleHRBbmltYXRpb25cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgTGlzdDxUPiBtYWluRGF0YSA9IG5ldyBMaXN0PFQ+KCk7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5SZWdpc3Rlckxpc3QobWFpbkRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKEJhc2VEYXRhIGJhc2VEYXRhLCBUIG1haW5EKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5BZGQoYmFzZURhdGEpO1xyXG4gICAgICAgICAgICBtYWluRGF0YS5BZGQobWFpbkQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBpbnQgaW5kZXgsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBNb2RpZnkoZW50aXR5LCBtYWluRGF0YVtpbmRleF0sIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIFQgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbnRlcm5hbCBvdmVycmlkZSB2b2lkIEV4ZWN1dGUoaW50IGluZGV4LCBCYXNlRGF0YSBiYXNlRGF0YSlcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICB0aGlzLkV4ZWN1dGUobWFpbkRhdGFbaW5kZXhdLCBiYXNlRGF0YSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vcHVibGljIGFic3RyYWN0IHZvaWQgRXhlY3V0ZShUIG1haW5EYXRhLCBCYXNlRGF0YSBiYXNlRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFRleHRBbmltYXRpb25cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBCYXNlRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGxlbmd0aDtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IHByb2dyZXNzO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHRhcmdldDtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBCYXNlRGF0YShmbG9hdCBsZW5ndGgsIGZsb2F0IHByb2dyZXNzLCBpbnQgdGFyZ2V0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzcztcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IGxlbmd0aCA9IG5ldyBMaXN0PGZsb2F0PigpO1xyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IHByb2dyZXNzID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxpbnQ+IHRhcmdldHMgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgTGlzdDxJTGlzdD4gbGlzdHMgPSBuZXcgTGlzdDxJTGlzdD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJMaXN0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQobGVuZ3RoKTtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKHByb2dyZXNzKTtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKHRhcmdldHMpO1xyXG4gICAgICAgICAgICBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IHZvaWQgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcm9ncmVzcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1tpXSArPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc1tpXSA+PSBsZW5ndGhbaV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NbaV0gPSBsZW5ndGhbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9FeGVjdXRlKGksIG5ldyBCYXNlRGF0YShsZW5ndGhbaV0scHJvZ3Jlc3NbaV0sIHRhcmdldHNbaV0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbnRlcm5hbCBhYnN0cmFjdCB2b2lkIEV4ZWN1dGUoaW50IGluZGV4LCBCYXNlRGF0YSBiYXNlRGF0YSk7XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWRkKEJhc2VEYXRhIGJkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvZ3Jlc3MuQWRkKGJkLnByb2dyZXNzKTtcclxuICAgICAgICAgICAgdGFyZ2V0cy5BZGQoYmQudGFyZ2V0KTtcclxuICAgICAgICAgICAgbGVuZ3RoLkFkZChiZC5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGxpc3RzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5Db3VudCAhPSBwcm9ncmVzcy5Db3VudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgcy5UcmltKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHByb2dyZXNzLkNvdW50ID09IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEVuZFRhc2soaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbCBpbiBsaXN0cylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGwuUmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVnaXN0ZXJMaXN0KElMaXN0IG1haW5EYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKG1haW5EYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgcHJvZ3Jlc3MuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGEuaWQgPT0gdGFyZ2V0c1tpXSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBNb2RpZnkoYSwgaSwgcHJvZ3Jlc3NbaV0sIGxlbmd0aFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYS5hbmltYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgaW50IGluZGV4LCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgVHJ5RW5kKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgcHJvZ3Jlc3MuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzW2ldID49IGxlbmd0aFtpXSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFbmRUYXNrKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUGFsZXR0ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmdbXSBIdG1sQ29sb3JzO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUocGFyYW1zIHN0cmluZ1tdIGNvbG9ycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEh0bWxDb2xvcnMgPSBjb2xvcnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBEZWZhdWx0UGFsZXR0ZXNcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBhbGV0dGUgQzRLaXJvS2F6ZSA9IG5ldyBQYWxldHRlKFwiIzMzMmM1MFwiLCBcIiM0Njg3OGZcIiwgXCIjOTRlMzQ0XCIsIFwiI2UyZjNlNFwiKTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBhbGV0dGUgQzRSZWFkZXIgPSBuZXcgUGFsZXR0ZShcIiMyNjI2MjZcIiwgXCIjOGI4Y2JhXCIsIFwiIzhiYmE5MVwiLCBcIiM2NDlmOGRcIik7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQYWxldHRlIEM0Tm92ZWwgPSBuZXcgUGFsZXR0ZShcIiMyNjI2MjZcIiwgXCIjMzQyZDQxXCIsIFwiI2I4YjhiOFwiLCBcIiM4YjhjYmFcIik7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBDNEJsYWNrID0gMDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0QmxhY2tOZXV0cmFsID0gMTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0V2hpdGVOZXV0cmFsID0gMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0V2hpdGUgPSAzO1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW5cclxue1xyXG4gICAgcHVibGljIHN0cnVjdCBNb3VzZUhvdmVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFJlY3QgcmVjdDtcclxuICAgICAgICBwdWJsaWMgaW50IHR5cGU7XHJcbiAgICAgICAgcHVibGljIGludCBpZDtcclxuXHJcbiAgICAgICAgcHVibGljIE1vdXNlSG92ZXIoUmVjdCByZWN0LCBpbnQgdHlwZSwgaW50IGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZWN0ID0gcmVjdDtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW91c2VIb3Zlck1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxNb3VzZUhvdmVyPiBtb3VzZUhvdmVycyA9IG5ldyBMaXN0PE1vdXNlSG92ZXI+KCk7XHJcbiAgICAgICAgcHVibGljIExpc3Q8TW91c2VIb3Zlcj4gbW91c2VIb3ZlcnNBY3RpdmUgPSBuZXcgTGlzdDxNb3VzZUhvdmVyPigpO1xyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIG1vdXNlSU87XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUhvdmVyTWFuYWdlcihNb3VzZUlPIG1vdXNlSU8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlSU8gPSBtb3VzZUlPO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdXNlSG92ZXJzQWN0aXZlLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIG1vdXNlSG92ZXJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5yZWN0LkNvbnRhaW5zKG1vdXNlSU8ucG9zKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZUhvdmVyc0FjdGl2ZS5BZGQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBVbmljb2RlUmVtYXBcclxuICAgIHtcclxuXHJcbiAgICAgICAgRGljdGlvbmFyeTxpbnQsIGludD4gcmVtYXBzID0gbmV3IERpY3Rpb25hcnk8aW50LCBpbnQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBVbmljb2RlUmVtYXAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVtYXBzLkFkZChVbmljb2RlLmtleVVwLCAndycpO1xyXG4gICAgICAgICAgICByZW1hcHMuQWRkKFVuaWNvZGUua2V5RG93biwgJ3MnKTtcclxuICAgICAgICAgICAgcmVtYXBzLkFkZChVbmljb2RlLmtleUxlZnQsICdhJyk7XHJcbiAgICAgICAgICAgIHJlbWFwcy5BZGQoVW5pY29kZS5rZXlSaWdodCwgJ2QnKTtcclxuXHJcbiAgICAgICAgICAgIHJlbWFwcy5BZGQoJ2knLCAnMScpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgUmVtYXAoaW50IHVuaWNvZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgcmVzdWx0O1xyXG4gICAgICAgICAgICBpZiAocmVtYXBzLlRyeUdldFZhbHVlKHVuaWNvZGUsIG91dCByZXN1bHQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB1bmljb2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRCb2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIE5PQ0hBTkdFQ0hBUiA9IChjaGFyKTE7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgSU5WSVNJQkxFQ0hBUiA9IChjaGFyKTI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBOT0NIQU5HRUNPTE9SID0gLTI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBJTlZJU0lCTEVDT0xPUiA9IC0xO1xyXG4gICAgICAgIGNoYXJbLF0gY2hhcnM7XHJcbiAgICAgICAgcHVibGljIGludFssXSBUZXh0Q29sb3IgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludFssXSBCYWNrQ29sb3IgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgLy9TdHJpbmdCdWlsZGVyIHN0cmluZ0J1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgIGludCBjdXJzb3JYID0gMDtcclxuICAgICAgICBpbnQgY3Vyc29yWSA9IDA7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEIFBvc2l0aW9uIHsgZ2V0OyBzZXQ7IH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9TZXRNYXhTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBSZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25DZW50ZXIoc3RyaW5nIG1lc3NhZ2UsIGludCBjb2xvciwgaW50IHhPZmYgPSAwLCBpbnQgeU9mZiA9IDAsIGJvb2wgYWxpZ25TdHJpbmcgPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHggPSAoV2lkdGgpIC8gMjtcclxuICAgICAgICAgICAgaWYgKGFsaWduU3RyaW5nKSB4IC09IG1lc3NhZ2UuTGVuZ3RoIC8gMjtcclxuICAgICAgICAgICAgaW50IHkgPSBIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBEcmF3KG1lc3NhZ2UsIHggKyB4T2ZmLCB5ICsgeU9mZiwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd09uQ2VudGVySG9yaXpvbnRhbChzdHJpbmcgbWVzc2FnZSwgaW50IGNvbG9yLCBpbnQgeE9mZiA9IDAsIGludCB5ID0gMCwgYm9vbCBhbGlnblN0cmluZyA9IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgeCA9IChXaWR0aCkgLyAyO1xyXG4gICAgICAgICAgICBpZiAoYWxpZ25TdHJpbmcpIHggLT0gbWVzc2FnZS5MZW5ndGggLyAyO1xyXG4gICAgICAgICAgICBEcmF3KG1lc3NhZ2UsIHggKyB4T2ZmLCB5LCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFNldE1heFNpemUoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hhcnMgPSBuZXcgY2hhclt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICAgICAgVGV4dENvbG9yID0gbmV3IGludFt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICAgICAgQmFja0NvbG9yID0gbmV3IGludFt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgnICcsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIDAsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVzZXRJbnZpc2libGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKElOVklTSUJMRUNIQVIsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIElOVklTSUJMRUNPTE9SLCBJTlZJU0lCTEVDT0xPUik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5zZXJ0KFRleHRCb2FyZCBzZWNvbmRCb2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgc2Vjb25kQm9hcmQuV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBzZWNvbmRCb2FyZC5IZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeCA9IChpbnQpc2Vjb25kQm9hcmQuUG9zaXRpb24uWCArIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHkgPSAoaW50KXNlY29uZEJvYXJkLlBvc2l0aW9uLlkgKyBqO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHggPj0gV2lkdGggfHwgeSA+PSBIZWlnaHQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRCb2FyZC5jaGFyc1tpLCBqXSAhPSBJTlZJU0lCTEVDSEFSKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1t4LCB5XSA9IHNlY29uZEJvYXJkLmNoYXJzW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRCb2FyZC5UZXh0Q29sb3JbaSwgal0gIT0gSU5WSVNJQkxFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRDb2xvclt4LCB5XSA9IHNlY29uZEJvYXJkLlRleHRDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuQmFja0NvbG9yW2ksIGpdICE9IElOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYWNrQ29sb3JbeCwgeV0gPSBzZWNvbmRCb2FyZC5CYWNrQ29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRHJhd1JlY3QoY2hhciBjLCBpbnQgeCwgaW50IHksIGludCB3LCBpbnQgaCwgaW50IHRleHRDb2xvciwgaW50IGJhY2tDb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChjLCB4LCAgICAgIHksICAgMSwgaCwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoYywgeCt3LTEsICB5LCAgIDEsIGgsIHRleHRDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKGMsIHgsICAgICAgeSwgICB3LCAxLCB0ZXh0Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChjLCB4LCAgICAgIHkraC0xLCB3LCAxLCB0ZXh0Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IEN1cnNvclhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBjdXJzb3JYOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JYID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGludCBDdXJzb3JZIHsgZ2V0IHsgcmV0dXJuIGN1cnNvclk7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd09uZURpZ2l0KGludCBpLCBpbnQgeCwgaW50IHksIGludCBjb2xvciA9IE5PQ0hBTkdFQ09MT1IsIGludCBiYWNrZ3JvdW5kID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoYXIgYyA9IChjaGFyKShpICsgJzAnKTtcclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgeCwgeSwgY29sb3IsIGJhY2tncm91bmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1R3b0RpZ2l0cyhpbnQgaSwgaW50IHgsIGludCB5LCBpbnQgY29sb3IgPSBOT0NIQU5HRUNPTE9SLCBpbnQgYmFja2dyb3VuZCA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3T25lRGlnaXQoaS8xMCx4LHksY29sb3IsYmFja2dyb3VuZCk7XHJcbiAgICAgICAgICAgIERyYXdPbmVEaWdpdChpICUxMCwgeCsxLCB5LCBjb2xvciwgYmFja2dyb3VuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIFNhbWVBcyhUZXh0Qm9hcmQgdGV4dEJvYXJkLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGFyc1t4LCB5XSA9PSB0ZXh0Qm9hcmQuY2hhcnNbeCwgeV1cclxuICAgICAgICAgICAgICAgICYmIHRoaXMuQmFja0NvbG9yW3gseV0gPT0gdGV4dEJvYXJkLkJhY2tDb2xvclt4LHldXHJcbiAgICAgICAgICAgICAgICAmJiB0aGlzLlRleHRDb2xvclt4LHldID09IHRleHRCb2FyZC5UZXh0Q29sb3JbeCx5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQ29weShUZXh0Qm9hcmQgdGV4dEJvYXJkLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJzW3gsIHldID0gdGV4dEJvYXJkLmNoYXJzW3gsIHldO1xyXG4gICAgICAgICAgICB0aGlzLlRleHRDb2xvclt4LCB5XSA9IHRleHRCb2FyZC5UZXh0Q29sb3JbeCwgeV07XHJcbiAgICAgICAgICAgIHRoaXMuQmFja0NvbG9yW3gsIHldID0gdGV4dEJvYXJkLkJhY2tDb2xvclt4LCB5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRHJhd19DdXJzb3JfVW5pY29kZUxhYmVsKGludCB2LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbGVuID0gRHJhd1VuaWNvZGVMYWJlbCh2LCBjdXJzb3JYLCBjdXJzb3JZLCBjb2xvcik7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbGVuOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEFkdmFuY2VDdXJzb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGludCBEcmF3VW5pY29kZUxhYmVsKGludCB1bmljb2RlLCBpbnQgeCwgaW50IHksIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh1bmljb2RlID49ICdhJyAmJiB1bmljb2RlIDw9ICd6Jykge1xyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIoKGNoYXIpKHVuaWNvZGUgKyAnQScgLSAnYScpLCB4LCB5LCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodW5pY29kZSA+PSAnMCcgJiYgdW5pY29kZSA8PSAnOScpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKChjaGFyKSh1bmljb2RlKSwgeCwgeSwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RyaW5nIGxhYmVsID0gXCJcIjtcclxuICAgICAgICAgICAgaWYgKHVuaWNvZGUgPT0gMzIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsID0gXCJTUEFDRVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIERyYXcobGFiZWwsIHgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsLkxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0KFRleHRCb2FyZCBvcmlnaW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBvc2l0aW9uID0gb3JpZ2luLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyc1tpLCBqXSA9IG9yaWdpbi5jaGFyc1tpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkJhY2tDb2xvcltpLCBqXSA9IG9yaWdpbi5CYWNrQ29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UZXh0Q29sb3JbaSwgal0gPSBvcmlnaW4uVGV4dENvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2l6ZShpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY2hhcnMgPT0gbnVsbCB8fCB3ID4gY2hhcnMuR2V0TGVuZ3RoKDApIHx8IGggPiBjaGFycy5HZXRMZW5ndGgoMSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNldE1heFNpemUodywgaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgV2lkdGggPSB3O1xyXG4gICAgICAgICAgICBIZWlnaHQgPSBoO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjaGFyIENoYXJBdChpbnQgaSwgaW50IGopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gY2hhcnNbaSwgal07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRDdXJzb3JBdChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdXJzb3JYID0geDtcclxuICAgICAgICAgICAgY3Vyc29yWSA9IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihzdHJpbmcgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjIGluIHYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdfQ3Vyc29yKGMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihzdHJpbmcgdiwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjIGluIHYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdfQ3Vyc29yKGMsIGNvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIENhbkRyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGN1cnJlbnRYID0gY3Vyc29yWDtcclxuICAgICAgICAgICAgaW50IGN1cnJlbnRZID0gY3Vyc29yWTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdi5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYm9vbCBsaW5lQnJlYWsgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJvb2wgc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzID0gKGkgPT0gMCB8fCB2W2ldID09ICcgJykgJiYgaSAhPSB2Lkxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAxOyBqIDwgdi5MZW5ndGggLSBpOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiArIGN1cnJlbnRYID49IFdpZHRoKSAvL3JlYWNoIGVuZCBvZiB0aGUgbGluZSB3aXRob3V0IGVuZGluZyB0aGUgd29yZCwgc2hvdWxkIGxpbmUgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaV0gPT0gJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKzsgLy9za2lwIHRocm91Z2ggdGhlIHNwYWNlIGlmIGl0J3MgYSBuZXcgbGluZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUJyZWFrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2W2kgKyBqXSA9PSAnICcpIC8vbmV3IHdvcmQgYmVnaW5zIHNvIG5vIG5lZWQgdG8gbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsaW5lQnJlYWspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFkrKztcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50WCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRYID49IFdpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRZKys7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRYID49IFdpZHRoIHx8IGN1cnJlbnRZID49IEhlaWdodCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEcmF3Q3Vyc29yUmVzdWx0IERyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKHN0cmluZyB2LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgb2ZmU3RhcnQgPSAwO1xyXG4gICAgICAgICAgICBpbnQgb2ZmRW5kID0gdi5MZW5ndGggLSAxO1xyXG4gICAgICAgICAgICByZXR1cm4gRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsodiwgY29sb3IsIG9mZlN0YXJ0LCBvZmZFbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERyYXdDdXJzb3JSZXN1bHQgRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYsIGludCBjb2xvciwgaW50IG9mZlN0YXJ0LCBpbnQgb2ZmRW5kLCBpbnQgeE5ld2xpbmUgPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFZlY3RvcjJEIHN0YXJ0ID0gbmV3IFZlY3RvcjJEKEN1cnNvclgsIEN1cnNvclkpO1xyXG4gICAgICAgICAgICBpbnQgZW5kSW5kZXggPSBvZmZFbmQgKyAxO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gb2ZmU3RhcnQ7IGkgPCBlbmRJbmRleDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgb3JpZ2luWCA9IGN1cnNvclg7XHJcbiAgICAgICAgICAgICAgICBib29sIGxpbmVCcmVhayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBzaG91bGRDaGVja0ZvckxpbmVCcmVha3MgPSAoaSA9PSAwIHx8IHZbaV0gPT0gJyAnKSAmJiBpICE9IGVuZEluZGV4IC0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChzaG91bGRDaGVja0ZvckxpbmVCcmVha3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDE7IGogPCBlbmRJbmRleCAtIGk7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqICsgb3JpZ2luWCA+PSBXaWR0aCkgLy9yZWFjaCBlbmQgb2YgdGhlIGxpbmUgd2l0aG91dCBlbmRpbmcgdGhlIHdvcmQsIHNob3VsZCBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2W2ldID09ICcgJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7IC8vc2tpcCB0aHJvdWdoIHRoZSBzcGFjZSBpZiBpdCdzIGEgbmV3IGxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVCcmVhayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpICsgal0gPT0gJyAnKSAvL25ldyB3b3JkIGJlZ2lucyBzbyBubyBuZWVkIHRvIGxpbmUgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZUJyZWFrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEN1cnNvck5ld0xpbmUoeE5ld2xpbmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IodltpXSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFZlY3RvcjJEIGVuZCA9IG5ldyBWZWN0b3IyRChDdXJzb3JYLCBDdXJzb3JZKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEcmF3Q3Vyc29yUmVzdWx0KFBvc2l0aW9uVG9JbmRleChzdGFydCksIFBvc2l0aW9uVG9JbmRleChlbmQpLCBzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQXV0b0ZpeEdyaWRkaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBIZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSXNHcmlkKGksIGopKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IG1hc2sgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNHcmlkKGkgLSAxLCBqKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzayArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChJc0dyaWQoaSArIDEsIGopKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrICs9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKElzR3JpZChpLCBqIC0gMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2sgKz0gNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNHcmlkKGksIGogKyAxKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzayArPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAobWFzaylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzW2ksIGpdID0gVW5pY29kZS5Bc2NpaUdyaWRIb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzW2ksIGpdID0gVW5pY29kZS5Bc2NpaUdyaWRWZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbaSwgal0gPSBVbmljb2RlLkFzY2lpR3JpZFVwTGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkVXBSaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkVXBSaWdodExlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbaSwgal0gPSBVbmljb2RlLkFzY2lpR3JpZERvd25MZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkRG93blJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1tpLCBqXSA9IFVuaWNvZGUuQXNjaWlHcmlkRG93blJpZ2h0TGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgSXNHcmlkKGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHggPDAgfHwgeSA8MCB8fCB4Pj0gV2lkdGggfHwgeT49IEhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2hhciBjID0gY2hhcnNbeCwgeV07XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIFVuaWNvZGUuZ3JpZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChjID09IGl0ZW0pIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRHJhd0xpbmVzKGludCBoZXJvLCBwYXJhbXMgVmVjdG9yMkRbXSBwb2ludHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHBvaW50cy5MZW5ndGgtMTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3TGluZShwb2ludHNbaV0sIHBvaW50c1tpKzFdLCBoZXJvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3TGluZShWZWN0b3IyRCBwb3MxLCBWZWN0b3IyRCBwb3MyLCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjaGFyIGMgPSBVbmljb2RlLkFzY2lpR3JpZEhvcjtcclxuICAgICAgICAgICAgaWYgKHBvczEuWSAhPSBwb3MyLlkpIGMgPSBVbmljb2RlLkFzY2lpR3JpZFZlcjtcclxuICAgICAgICAgICAgaW50IGhlaWdodCA9IHBvczIuWUludCAtIHBvczEuWUludDtcclxuICAgICAgICAgICAgLy9pZiAoaGVpZ2h0IDw9IDApIGhlaWdodCA9IDE7XHJcbiAgICAgICAgICAgIGludCB3aWR0aCA9IHBvczIuWEludCAtIHBvczEuWEludDtcclxuICAgICAgICAgICAgLy9pZiAod2lkdGggPD0gMCkgd2lkdGggPSAxO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoYywgcG9zMS5YSW50LCBwb3MxLllJbnQsIHdpZHRoKzEsIGhlaWdodCsxLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGludCBQb3NpdGlvblRvSW5kZXgoVmVjdG9yMkQgc3RhcnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludCkoc3RhcnQuWCArIHN0YXJ0LlkgKiBXaWR0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25lRGlnaXRfQ3Vyc29yKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd19DdXJzb3IoKGNoYXIpKGkgKyAnMCcpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKGNoYXIgYylcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcihjLCBjdXJzb3JYLCBjdXJzb3JZKTtcclxuICAgICAgICAgICAgQWR2YW5jZUN1cnNvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd19DdXJzb3IoY2hhciBjLCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3I9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgY3Vyc29yWCwgY3Vyc29yWSwgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIEFkdmFuY2VDdXJzb3IoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZHZhbmNlQ3Vyc29yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclgrKztcclxuICAgICAgICAgICAgaWYgKGN1cnNvclggPj0gV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclggPSAwO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDdXJzb3JOZXdMaW5lKGludCB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3Vyc29yWSsrO1xyXG4gICAgICAgICAgICBjdXJzb3JYID0geDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdDaGFyKGNoYXIgdiwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh2ICE9IE5PQ0hBTkdFQ0hBUikge1xyXG4gICAgICAgICAgICAgICAgY2hhcnNbeCwgeV0gPSB2O1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hhcihjaGFyIHYsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcih2LCB4LCB5KTtcclxuICAgICAgICAgICAgU2V0Q29sb3IoY29sb3IsIHgsIHkpO1xyXG4gICAgICAgICAgICBTZXRCYWNrQ29sb3IoYmFja0NvbG9yLCB4LCB5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0QWxsKGNoYXIgdGV4dCwgaW50IHRleHRDb2xvciA9IE5PQ0hBTkdFQ09MT1IsIGludCBiYWNrQ29sb3I9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQodGV4dCwgMCwgMCwgV2lkdGgsIEhlaWdodCwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRBbGxJZlZpc2libGUoY2hhciB0ZXh0LCBpbnQgdGV4dENvbG9yID0gTk9DSEFOR0VDT0xPUiwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWRJZlZpc2libGUodGV4dCwgMCwgMCwgV2lkdGgsIEhlaWdodCwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3V2l0aEdyaWQoc3RyaW5nIHRleHQsIGludCB4LCBpbnQgeSwgaW50IGdyaWRDb2xvciwgaW50IHRleHRDb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB3aWR0aCA9IHRleHQuTGVuZ3RoO1xyXG4gICAgICAgICAgICBEcmF3R3JpZCh4LCB5LCB3aWR0aCArIDIsIDMsIGdyaWRDb2xvcik7XHJcbiAgICAgICAgICAgIERyYXcodGV4dCwgeCArIDEsIHkgKyAxLCB0ZXh0Q29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhzdHJpbmcgdiwgaW50IHgsIGludCB5LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB2Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgeDIgPSB4ICsgaTtcclxuICAgICAgICAgICAgICAgIGludCB5MiA9IHk7XHJcbiAgICAgICAgICAgICAgICBpZih4MiA+PSBXaWR0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB4MiAtPSBXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB5MisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIodltpXSwgeDIsIHkyLCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1dpdGhMaW5lYnJlYWtzKHN0cmluZyB2LCBpbnQgeCwgaW50IHksIGludCBuZXdsaW5lWCwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBsaW5lYnJlYWtzID0gMDtcclxuICAgICAgICAgICAgaW50IHhPZmZzZXRuZXdsaW5lcyA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdi5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHgyID0geCArIGkrIHhPZmZzZXRuZXdsaW5lcztcclxuICAgICAgICAgICAgICAgIGludCB5MiA9IHk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHdoaWxlICh4MiA+PSBXaWR0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB4MiA9IHgyLVdpZHRoK25ld2xpbmVYO1xyXG4gICAgICAgICAgICAgICAgICAgIHkyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIGlmICh2W2ldID09ICdcXG4nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVicmVha3MrKztcclxuICAgICAgICAgICAgICAgICAgICB4T2Zmc2V0bmV3bGluZXMgKz0gbmV3bGluZVggLSB4Mi0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBEcmF3Q2hhcih2W2ldLCB4MiwgeTIgKyBsaW5lYnJlYWtzLCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoSUVudW1lcmFibGU8Y2hhcj4gdiwgaW50IHgsIGludCB5LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkNvdW50PGNoYXI+KHYpOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRWxlbWVudEF0PGNoYXI+KHYsaSksIHggKyBpLCB5LCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0dyaWQoaW50IHgsIGludCB5LCBpbnQgd2lkdGgsIGludCBoZWlnaHQsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoVW5pY29kZS5Bc2NpaUdyaWRWZXIsIHgsIHksIDEsIGhlaWdodCwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoVW5pY29kZS5Bc2NpaUdyaWRWZXIsIHggKyB3aWR0aCAtIDEsIHksIDEsIGhlaWdodCwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoVW5pY29kZS5Bc2NpaUdyaWRIb3IsIHgsIHksIHdpZHRoLCAxLCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChVbmljb2RlLkFzY2lpR3JpZEhvciwgeCwgeSArIGhlaWdodCAtIDEsIHdpZHRoLCAxLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoKGNoYXIpMjE4LCB4LCB5LCAxLCAxLCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgoY2hhcikxOTIsIHgsICAgICAgICAgICAgICB5K2hlaWdodC0xLCAxLCAxLCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgoY2hhcikyMTcsIHgrd2lkdGgtMSwgICAgICB5KyBoZWlnaHQgLSAxLCAxLCAxLCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgoY2hhcikxOTEsIHggKyB3aWR0aCAtIDEsICB5LCAxLCAxLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3UmVwZWF0ZWQoY2hhciBjLCBpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodCwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSB4OyBpIDwgeCArIHdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSB5OyBqIDwgeSArIGhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIERyYXdDaGFyKGMsIGksIGosIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgU2V0QmFja0NvbG9yKGJhY2tDb2xvciwgaSwgaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdSZXBlYXRlZElmVmlzaWJsZShjaGFyIGMsIGludCB4LCBpbnQgeSwgaW50IHdpZHRoLCBpbnQgaGVpZ2h0LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IHg7IGkgPCB4ICsgd2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IHk7IGogPCB5ICsgaGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJzW2ksIGpdICE9IFRleHRCb2FyZC5JTlZJU0lCTEVDSEFSIHx8IFRleHRDb2xvcltpLGpdICE9IElOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEcmF3Q2hhcihjLCBpLCBqLCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoQmFja0NvbG9yW2ksal0gIT0gVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTZXRCYWNrQ29sb3IoYmFja0NvbG9yLCBpLCBqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0Q29sb3IoaW50IGNvbG9yLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29sb3IgIT0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICAgICAgICAgIFRleHRDb2xvclt4LCB5XSA9IGNvbG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0QmFja0NvbG9yKGludCBjb2xvciwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbG9yICE9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEJhY2tDb2xvclt4LCB5XSA9IGNvbG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KHN0cmluZyB2LCBpbnQgeDIsIGludCB5Miwgb2JqZWN0IGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3R3JpZChpbnQgdjEsIGludCB2MiwgaW50IHYzLCBpbnQgdjQsIG9iamVjdCBib2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBEcmF3Q3Vyc29yUmVzdWx0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFN0YXJ0SW5kZXg7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgRW5kSW5kZXg7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBTdGFydFBvc2l0aW9uO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgRW5kUG9zaXRpb247XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgRHJhd0N1cnNvclJlc3VsdChpbnQgc3RhcnRJbmRleCwgaW50IGVuZEluZGV4LCBWZWN0b3IyRCBzdGFydFBvc2l0aW9uLCBWZWN0b3IyRCBlbmRQb3NpdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU3RhcnRJbmRleCA9IHN0YXJ0SW5kZXg7XHJcbiAgICAgICAgICAgICAgICBFbmRJbmRleCA9IGVuZEluZGV4O1xyXG4gICAgICAgICAgICAgICAgU3RhcnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBFbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFNjcmVlbk4gOiBJVGV4dFNjcmVlbiwgSU1vdXNlSW5wdXQsIElLZXlib2FyZElucHV0XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFRleHRXb3JsZCBUZXh0V29ybGQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgVXBkYXRlKGZsb2F0IGYpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dFNjcmVlbk4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0U2NyZWVuTihUZXh0V29ybGQgdGV4dFdvcmxkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dFdvcmxkID0gdGV4dFdvcmxkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljICB2b2lkIEluaXQoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICBUZXh0V29ybGQuSW5pdCh3LCBoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBNb3VzZUV2ZW50KE1vdXNlRXZlbnRzIG1vdXNlRG93biwgaW50IHYxLCBpbnQgdjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBpbnQgSW5wdXRBc051bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBJbnB1dFVuaWNvZGUgLSA0ODtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW50ZXJmYWNlIElUZXh0U2NyZWVuXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgVGV4dEJvYXJkIEdldEJvYXJkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdm9pZCBVcGRhdGUoZmxvYXQgZik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludGVyZmFjZSBJTW91c2VJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIHZvaWQgTW91c2VFdmVudChNb3VzZUV2ZW50cyBldmVudFR5cGUsIGludCB2MSwgaW50IHYyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW50ZXJmYWNlIElLZXlib2FyZElucHV0XHJcbiAgICB7XHJcbiAgICAgICAgaW50IElucHV0VW5pY29kZSB7IHNldDsgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIE1vdXNlRXZlbnRzXHJcbiAgICB7IFxyXG4gICAgICAgIE1vdXNlRG93bixcclxuICAgICAgICBOb25lXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRleHRTY3JlZW5Ib2xkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgSVRleHRTY3JlZW4gU2NyZWVuIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgSU1vdXNlSW5wdXQgTW91c2UgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBJS2V5Ym9hcmRJbnB1dCBLZXkgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldEFsbChvYmplY3QgZG5zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2NyZWVuID0gZG5zIGFzIElUZXh0U2NyZWVuO1xyXG4gICAgICAgICAgICBNb3VzZSA9IGRucyBhcyBJTW91c2VJbnB1dDtcclxuICAgICAgICAgICAgS2V5ID0gZG5zIGFzIElLZXlib2FyZElucHV0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgY2xhc3MgQXR0YWNrUHJldmlld1xyXG4gICAge1xyXG4gICAgICAgIEVDU01hbmFnZXIgZWNzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgQmF0dGxlUmVuZGVyIHJlbmRlcjtcclxuICAgICAgICBwcml2YXRlIFF1aWNrQWNjZXNzb3JPbmU8TW92ZURhdGE+IG1vdmVEYXRhcztcclxuICAgICAgICBMaXN0PFRleHRFbnRpdHk+IGVudGl0aWVzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICBwcml2YXRlIGludCBjdXJyZW50TW92ZUlkO1xyXG5cclxuICAgICAgICBwdWJsaWMgQXR0YWNrUHJldmlldyhFQ1NNYW5hZ2VyIGVjcywgQmF0dGxlUmVuZGVyIHJlbmRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlciA9IHJlbmRlcjtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIuYXR0YWNrUHJldmlldyA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1vdmVEYXRhcyA9IGVjcy5RdWlja0FjY2Vzc29yMTxNb3ZlRGF0YT4oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTaG93UHJldmlldyhpbnQgdXNlciwgaW50IG1vdmVJZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChtb3ZlSWQgPT0gY3VycmVudE1vdmVJZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBFbmQoKTtcclxuICAgICAgICAgICAgY3VycmVudE1vdmVJZCA9IG1vdmVJZDtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIlNUQVJUXCIpO1xyXG5cclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIm1vdmUgXCIrbW92ZUlkKTtcclxuICAgICAgICAgICAgdmFyIG1vdmVEYXRhID0gbW92ZURhdGFzLkNvbXAxKG1vdmVJZCk7XHJcbiAgICAgICAgICAgIFZlY3RvcjJEIHBvcyA9IHJlbmRlci5FbnRpdHlTY3JlZW5Qb3NpdGlvbih1c2VyKTtcclxuICAgICAgICAgICAgUmVjdCBncmlkUmVjdCA9IHJlbmRlci5HZXRHcmlkUmVjdCgpO1xyXG5cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbW92ZURhdGEudW5pdHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtcyA9IGl0ZW0udGhpbmdzVG9IYXBwZW47XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdGhpbmcgaW4gaXRlbXMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaW5nIGlzIERlYWxEYW1hZ2VBY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGEgPSB0aGluZyBhcyBEZWFsRGFtYWdlQWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZGEudGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhcmdldClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXJnZXQuTm9uZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgVGFyZ2V0LlNlbGY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFRhcmdldC5DbG9zZXN0VGFyZ2V0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXJnZXQuQ2xvc2VzdFRhcmdldFg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZyZWVFbnRpdHkgPSByZW5kZXIudGV4dFdvcmxkLkdldEZyZWVFbnRpdHkoZ3JpZFJlY3QuWCtncmlkUmVjdC5XaWR0aCAtIHBvcy5YSW50LDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0aWVzLkFkZChmcmVlRW50aXR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmVlRW50aXR5LlNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJlZUVudGl0eS5PcmlnaW4uU2V0QWxsKFRleHRCb2FyZC5JTlZJU0lCTEVDSEFSLCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXJnZXQuQXJlYTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRW5kKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoY3VycmVudE1vdmVJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiRU5EXCIpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudE1vdmVJZCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyLnRleHRXb3JsZC5GcmVlKGVudGl0aWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhhcHBIYW5kbGluZ1xyXG4gICAge1xyXG4gICAgICAgIEJhdHRsZVJlbmRlciBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgcHVibGljIEFjdGlvbiBIYW5kbGU7XHJcbiAgICAgICAgTGlzdDxIYXBwSGFuZGxlcj4gaGFuZGxlcnMgPSBuZXcgTGlzdDxIYXBwSGFuZGxlcj4oKTtcclxuICAgICAgICBwcml2YXRlIFF1aWNrQWNjZXNzb3JUd288SGFwcFRhZ3MsIFRpbWVTdGFtcFNuYXA+IGhhcHBzO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgaGlnaGVzdEhhbmRsZWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBoYW5kbGVTdGF0ZS5oaWdoZXN0SGFuZGxlZDsgfVxyXG4gICAgICAgICAgICBzZXQgeyBoYW5kbGVTdGF0ZS5oaWdoZXN0SGFuZGxlZCA9IHZhbHVlOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgSGFwcEhhbmRsZVN0YXRlIGhhbmRsZVN0YXRlID0gbmV3IEhhcHBIYW5kbGVTdGF0ZSgpO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEhhbmRsaW5nKEJhdHRsZVJlbmRlciBiYXR0bGVSZW5kZXIsIEJhdHRsZVNldHVwIGJhdHRsZVNldHVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVSZW5kZXIgPSBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgICAgIHZhciB3b3JsZCA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQ7XHJcbiAgICAgICAgICAgIHZhciBwb3NBbmltID0gd29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuUG9zaXRpb25BbmltYXRpb24+KG5ldyBQb3NpdGlvbkFuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgdmFyIGJsaW5rQW5pbSA9IHdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkJsaW5rQW5pbT4obmV3IEJsaW5rQW5pbSgpKTtcclxuICAgICAgICAgICAgdmFyIGRlbGF5QW5pbSA9IHdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkRlbGF5c0FuaW1hdGlvbj4obmV3IERlbGF5c0FuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBiYXR0bGVTZXR1cC5lY3M7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQoaGFuZGxlU3RhdGUpO1xyXG4gICAgICAgICAgICB2YXIgYmF0dGxlTWFpbiA9IGJhdHRsZVNldHVwLmJhdHRsZU1haW47XHJcbiAgICAgICAgICAgIHZhciB0aW1lID0gYmF0dGxlU2V0dXAudGltZVN0YW1wO1xyXG4gICAgICAgICAgICBiYXR0bGVSZW5kZXIuSGFwcEhhbmRsaW5nID0gdGhpcztcclxuICAgICAgICAgICAgaGFwcHMgPSBlY3MuUXVpY2tBY2Nlc3NvcjI8SGFwcFRhZ3MsIFRpbWVTdGFtcFNuYXA+KCk7XHJcbiAgICAgICAgICAgIGhpZ2hlc3RIYW5kbGVkID0gLTE7XHJcblxyXG5cclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKG5ldyBIYXBwSGFuZGxlcigoZSkgPT5cclxuICAgICAgICAgICAge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRhbWFnZSA9IGUuR2V0Q29tcG9uZW50PEhhcHBEYW1hZ2VEYXRhPigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhbW91bnQgPSBkYW1hZ2UuYW1vdW50O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc3RyaW5nIG1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGFtYWdlLmVsZW1lbnRhbEJsb2NrKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyB0ZXh0ID0gZGFtYWdlLmRhbWFnZUUuVG9TdHJpbmcoKS5Ub1VwcGVyKCkgKyBcIiBCTE9DSyBcIiArIGRhbWFnZS50YXJnZXRFLlRvU3RyaW5nKCkuVG9VcHBlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZTIgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkodGV4dC5MZW5ndGgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3JFID0gQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UyLk9yaWdpbi5EcmF3KHRleHQsIDAsIDAsIGNvbG9yRSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKG1lc3NhZ2UyLkFuaW1CYXNlKDAuNmYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkZyb250Q29sb3IoY29sb3JFLCAwLjJmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBvZmZzZXQgPSAoaW50KU1hdGguRmxvb3IoLXRleHQuTGVuZ3RoIC8gMmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlMi5TZXRQb3NpdGlvbihiYXR0bGVSZW5kZXIuYmF0dGxlclJlbmRlcnNbZGFtYWdlLnRhcmdldF0uR2V0UG9zaXRpb24oKSArIG5ldyBWZWN0b3IyRCgrMSArIG9mZnNldCwgLTMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXlBbmltLkRlbGF5KDAuNjVmKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oYmF0dGxlTWFpbi5lbnRpdGllc1tkYW1hZ2UudGFyZ2V0XS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmxhc3QgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoNSwgNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsYXN0LlNldFBvc2l0aW9uKHBvcyArIG5ldyBWZWN0b3IyRCgtMiwgLTIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsYXN0Lk9yaWdpbi5EcmF3UmVjdCgnICcsIDAsIDAsIDUsIDUsIFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUiwgQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2JsYXN0Lk9yaWdpbi5EcmF3UmVwZWF0ZWQoJyAnLCAxLCAxLCAzLCAzLCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IsIEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoZGFtYWdlLmRhbWFnZUUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChibGFzdC5BbmltQmFzZSgwLjJmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5CYWNrQ29sb3IoQmF0dGxlUmVuZGVyLkNvbG9ycy5pbnB1dEtleSwgMC4wNWYsIGZhbHNlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBkYW1hZ2UuZGFtYWdlRSArIFwiIGFic29yYnMgXCIgKyBkYW1hZ2UudGFyZ2V0RSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSArPSBiYXR0bGVSZW5kZXIuR2V0RW50aXR5TmFtZShkYW1hZ2UudGFyZ2V0KSArIFwiIGlzIHVuYWZlY3R0ZWQuXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZSA9IGJhdHRsZVJlbmRlci5HZXRFbnRpdHlOYW1lKGRhbWFnZS50YXJnZXQpICsgXCIgZ2V0cyBoaXQhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhbWFnZS5zdXBlckVmZmVjdGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgdGV4dCA9IGRhbWFnZS5kYW1hZ2VFLlRvU3RyaW5nKCkuVG9VcHBlcigpICsgXCIgQlJFQUsgXCIgKyBkYW1hZ2UudGFyZ2V0RS5Ub1N0cmluZygpLlRvVXBwZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlMiA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eSh0ZXh0Lkxlbmd0aCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3JFID0gQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlMi5PcmlnaW4uRHJhdyh0ZXh0LCAwLCAwLCBjb2xvckUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQobWVzc2FnZTIuQW5pbUJhc2UoMC40NWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkZyb250Q29sb3IoY29sb3JFLCAwLjJmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnQgb2Zmc2V0ID0gKGludClNYXRoLkZsb29yKC10ZXh0Lkxlbmd0aCAvIDJmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UyLlNldFBvc2l0aW9uKGJhdHRsZVJlbmRlci5iYXR0bGVyUmVuZGVyc1tkYW1hZ2UudGFyZ2V0XS5HZXRQb3NpdGlvbigpICsgbmV3IFZlY3RvcjJEKCsxICsgb2Zmc2V0LCAtMikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXlBbmltLkRlbGF5KDAuNjVmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZSA9IGRhbWFnZS5kYW1hZ2VFICsgXCIgcmF2YWdlcyBcIiArIGRhbWFnZS50YXJnZXRFICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tZXNzYWdlICs9IGJhdHRsZVJlbmRlci5HZXRFbnRpdHlOYW1lKGRhbWFnZS50YXJnZXQpK1wiIHRha2VzIGEgaGVhdnkgaGl0IVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oYmF0dGxlTWFpbi5lbnRpdGllc1tkYW1hZ2UudGFyZ2V0XS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJsYXN0ID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDUsIDUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxhc3QuU2V0UG9zaXRpb24ocG9zICsgbmV3IFZlY3RvcjJEKC0yLCAtMikpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsYXN0Lk9yaWdpbi5EcmF3UmVwZWF0ZWQoJyAnLCAxLCAxLCAzLCAzLCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IsIEJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChibGFzdC5BbmltQmFzZSgwLjJmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5CYWNrQ29sb3IoQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSksIDAuMDVmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tZXNzYWdlID0gYmF0dGxlUmVuZGVyLkdldEVudGl0eU5hbWUoZGFtYWdlLnRhcmdldCkgKyBcIiBnZXRzIGh1cnRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oYmF0dGxlTWFpbi5lbnRpdGllc1tkYW1hZ2UudGFyZ2V0XS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBudW1iZXIgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoMSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjJEIGluaXRpYWxQb3MgPSBwb3MgKyBuZXcgVmVjdG9yMkQoMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyLlNldFBvc2l0aW9uKGluaXRpYWxQb3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBudW1iZXIuT3JpZ2luLkRyYXdPbmVEaWdpdChhbW91bnQsIDAsIDAsIEJhdHRsZVJlbmRlci5Db2xvcnMuSGVybyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQobnVtYmVyLkFuaW1CYXNlKDAuNmYpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKGluaXRpYWxQb3MsIGluaXRpYWxQb3MgKyBuZXcgVmVjdG9yMkQoMCwgLTMpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9ibGlua0FuaW0uQWRkKG51bWJlci5BbmltQmFzZSgxZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQ2hhcignICcsIDVmKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVSZW5kZXIuU2hvd01lc3NhZ2UobWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRlZmVuZGVyID0gYmF0dGxlUmVuZGVyLmJhdHRsZXJSZW5kZXJzW2RhbWFnZS50YXJnZXRdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIGZlID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRUZW1wRW50aXR5KGRlZmVuZGVyLldpZHRoLCBkZWZlbmRlci5IZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYW1hZ2Uuc3VwZXJFZmZlY3RpdmUgJiYgIWRhbWFnZS5lbGVtZW50YWxCbG9jayBcclxuICAgICAgICAgICAgICAgIC8vJiYgYmF0dGxlTWFpbi5lbnRpdGllc1tkYW1hZ2UudGFyZ2V0XS5BbGl2ZVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmZSA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eSgzLCAzKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmFja0NvbG9yID0gQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja0NvbG9yID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeENvbG9yID0gQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhciBkYW1hZ2VDaGFyID0gJ1gnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihkYW1hZ2VDaGFyLCAxLCAwLCB4Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKGRhbWFnZUNoYXIsIDEsIDEsIHhDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoZGFtYWdlQ2hhciwgMSwgMiwgeENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihkYW1hZ2VDaGFyLCAwLCAxLCB4Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKGRhbWFnZUNoYXIsIDIsIDEsIHhDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2ZlLk9yaWdpbi5EcmF3Q2hhcihUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCAwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uUG9zaXRpb24gPSBkZWZlbmRlci5HZXRQb3NpdGlvbigpICsgbmV3IFZlY3RvcjJEKC0xLCAtMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoZmUuQW5pbUJhc2UoMC4zNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkNoYXIoJ1onLCAwLjA1ZikpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYmxpbmtBbmltLkFkZChmZS5BbmltQmFzZSgwLjM1ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQmFja0NvbG9yKEJhdHRsZVJlbmRlci5Db2xvcnMuSGVybywgMC4wNWYpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJDSEFOR0UgRUxFXCIpO1xyXG5cclxuICAgICAgICAgICAgfSwgTWlzY0hhcHBUYWdzLkRhbWFnZSkpO1xyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQobmV3IEhhcHBIYW5kbGVyKChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG1kID0gZS5HZXRDb21wb25lbnQ8SGFwcE1vdmVEYXRhPigpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgdGV4dCA9IGhtZC5lbGVtZW50LlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eSh0ZXh0Lkxlbmd0aCwgMSk7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLk9yaWdpbi5EcmF3KHRleHQsIDAsIDAsIEJhdHRsZVJlbmRlci5Db2xvcnMuSGVybyk7XHJcbiAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKG1lc3NhZ2UuQW5pbUJhc2UoMC41ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuRnJvbnRDb2xvcihCYXR0bGVSZW5kZXIuQ29sb3JzLklucHV0RGVzY3JpcHRpb24sIDAuMTVmKSk7XHJcbiAgICAgICAgICAgICAgICBpbnQgb2Zmc2V0ID0gKGludClNYXRoLkZsb29yKC10ZXh0Lkxlbmd0aCAvIDJmKTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuU2V0UG9zaXRpb24oYmF0dGxlUmVuZGVyLmJhdHRsZXJSZW5kZXJzW2htZC51c2VyXS5HZXRQb3NpdGlvbigpICsgbmV3IFZlY3RvcjJEKCsxICsgb2Zmc2V0LCAtMSkpO1xyXG5cclxuICAgICAgICAgICAgfSwgTWlzY0hhcHBUYWdzLkNoYW5nZUVsZW1lbnQpKTtcclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKG5ldyBIYXBwSGFuZGxlcigoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZCA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlRGF0YT4oKTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIGRlZmVuZGVyID0gYmF0dGxlUmVuZGVyLmJhdHRsZXJSZW5kZXJzW2htZC50YXJnZXRdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGJhdHRsZU1haW4uZW50aXRpZXNbaG1kLnVzZXJdLnBvcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmxhc3QgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoMywgMyk7XHJcbiAgICAgICAgICAgICAgICBibGFzdC5TZXRQb3NpdGlvbihwb3MgKyBuZXcgVmVjdG9yMkQoLTEsIC0xKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYmxhc3QuT3JpZ2luLkRyYXdSZXBlYXRlZCgnICcsIDEsIDEsIDEsIDEsIFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteSk7XHJcbiAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKGJsYXN0LkFuaW1CYXNlKDAuMmYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm8sIDAuMDVmKSk7XHJcbiAgICAgICAgICAgICAgICAvL2RlbGF5QW5pbS5EZWxheSg1KTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkRFQVRIXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiQ0hBTkdFIEVMRVwiKTtcclxuXHJcbiAgICAgICAgICAgIH0sIE1pc2NIYXBwVGFncy5EZWF0aCkpO1xyXG4gICAgICAgICAgICBBY3Rpb248RW50aXR5PiBtb3ZlSGFuZGxlID0gKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJIQU5ETEUhM1wiKTtcclxuICAgICAgICAgICAgICAgIHZhciBobWQgPSBlLkdldENvbXBvbmVudDxIYXBwTW92ZURhdGE+KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG1mID0gZS5HZXRDb21wb25lbnQ8SGFwcE1vdmVtZW50PigpO1xyXG4gICAgICAgICAgICAgICAgaW50IGVJZCA9IGhtZC51c2VyO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vdmVyID0gYmF0dGxlTWFpbi5lbnRpdGllc1tlSWRdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBtb3Zlci5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MyID0gaG1mLm1vdmVUbztcclxuICAgICAgICAgICAgICAgIHZhciBwb3NGID0gKHBvcyArIHBvczIpIC8gMjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZmUgPSBiYXR0bGVSZW5kZXIuYmF0dGxlclJlbmRlcnNbZUlkXTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJNb3ZlIGZhaWxcIik7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFQUCBNT1ZFIEhBTkRMRVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChobWYuc3VjY2VzcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBWZWN0b3IyRCBmaW5hbFBvc1NjcmVlbiA9IGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGhtZi5tb3ZlVG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKDAuMmYpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGhtZi5tb3ZlRnJvbSksXHJcbiAgICAgICAgICAgICAgICAgICAgZmluYWxQb3NTY3JlZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBmZS5TZXRQb3NpdGlvbihmaW5hbFBvc1NjcmVlbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoZmUuQW5pbUJhc2UoMC4yZiksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oaG1mLm1vdmVGcm9tKSxcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3NGKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChuZXcgSGFwcEhhbmRsZXIobW92ZUhhbmRsZSwgTW92ZURhdGFUYWdzLk1vdmVtZW50KSk7XHJcblxyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQobmV3IEhhcHBIYW5kbGVyKChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGEgPSBlLkdldENvbXBvbmVudDxIYXBwQXJlYT4oKTtcclxuICAgICAgICAgICAgICAgIHZhciBobWQgPSBlLkdldENvbXBvbmVudDxIYXBwTW92ZURhdGE+KCk7XHJcbiAgICAgICAgICAgICAgICBpbnQgZUlkID0gaG1kLnVzZXI7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW92ZXIgPSBiYXR0bGVNYWluLmVudGl0aWVzW2VJZF07XHJcbiAgICAgICAgICAgICAgICAvL3ZhciB1c2VyUmVuZGVyID0gYmF0dGxlUmVuZGVyLmJhdHRsZXJFbnRpdGllc1tlSWRdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFyZWEgPSBoYS5hcmVhO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvaW50cyA9IGFyZWEucG9pbnRzO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1c2VFZmZlY3QgPSB3b3JsZC5HZXRUZW1wRW50aXR5KDEsIDEpO1xyXG4gICAgICAgICAgICAgICAgdXNlRWZmZWN0LlNldFBvc2l0aW9uKGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKG1vdmVyLnBvcykpO1xyXG4gICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZCh1c2VFZmZlY3QuQW5pbUJhc2UoMC41ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQmFja0NvbG9yKEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoaG1kLmVsZW1lbnQpLCAwLjE1ZikpO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gcG9pbnRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbnRpdHkgPSB3b3JsZC5HZXRUZW1wRW50aXR5KDEsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaW5hbFBvcyA9IGl0ZW0gKiBuZXcgVmVjdG9yMkQoaGEubWlycm9yaW5nWCwgMSkgKyBoYS5vZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsUG9zLlggPCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWxQb3MuWSA8IDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbFBvcy5YID4gNSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsUG9zLlkgPiAyKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoZmluYWxQb3MuWEludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKGZpbmFsUG9zLllJbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihmaW5hbFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5LlNldFBvc2l0aW9uKHBvcy5YSW50LCBwb3MuWUludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChlbnRpdHkuQW5pbUJhc2UoMC41ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQmFja0NvbG9yKEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoaG1kLmVsZW1lbnQpLCAwLjE1ZikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBNb3ZlRGF0YVRhZ3MuQm9tYikpO1xyXG4gICAgICAgICAgICBIYW5kbGUgPSAoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFIVwiKTtcclxuICAgICAgICAgICAgICAgIGZsb2F0IG5ld0hpZ2hlc3RIYW5kbGVkID0gaGlnaGVzdEhhbmRsZWQ7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGhhcHBzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkFEVlwiK2JhdHRsZVJlbmRlci5DYW5BZHZhbmNlR3JhcGhpY3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFiYXR0bGVSZW5kZXIuQ2FuQWR2YW5jZUdyYXBoaWNzKCkpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWdzID0gaGFwcHMuQ29tcDEoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoaGFwcHMuQ29tcDIoaSkuVGltZVNuYXAgPiBoaWdoZXN0SGFuZGxlZClcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IGhpZ2hlc3RIYW5kbGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9uZXdIaWdoZXN0SGFuZGxlZCA9IGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdIaWdoZXN0SGFuZGxlZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkhhbmRsZWRcIitpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBTkRMRSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvb2wgaGFuZGxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaGFuIGluIGhhbmRsZXJzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFIXhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuLkNhbkhhbmRsZSh0YWdzLnRhZ3MpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkhhbmRsZWRYXCIgKyBpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwICsgXCIgLSBcIiArIHRpbWUuQ3VycmVudFNuYXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJIQU5ETEUhMlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW4uSGFuZGxlcihoYXBwcy5FbnRpdHkoaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFuZGxlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHQgaW4gdGFncy50YWdzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJOb3QgaGFuZGxlZCB0YWcgXCIgKyB0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwK1wiIC0gXCIrIHRpbWUuQ3VycmVudFNuYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGhpZ2hlc3RIYW5kbGVkID0gbmV3SGlnaGVzdEhhbmRsZWQ7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEhhcHBIYW5kbGVTdGF0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IGhpZ2hlc3RIYW5kbGVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEhhcHBIYW5kbGVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBMaXN0PGludD4gbmVjZXNzYXJ5VGFncyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgQWN0aW9uPEVudGl0eT4gSGFuZGxlcjtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBIYXBwSGFuZGxlcihBY3Rpb248RW50aXR5PiBoYW5kbGVyLCBwYXJhbXMgb2JqZWN0W10gdGFncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHQgaW4gdGFncylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuZWNlc3NhcnlUYWdzLkFkZChDb252ZXJ0LlRvSW50MzIodCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5IYW5kbGVyID0gaGFuZGxlcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW50ZXJuYWwgYm9vbCBDYW5IYW5kbGUoTGlzdDxpbnQ+IHRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIG5lY2Vzc2FyeVRhZ3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YWdzLkNvbnRhaW5zKGl0ZW0pKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gaGlnaGVzdEhhbmRsZWQgPj0gaGFwcHMuTGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlbjtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIGNsYXNzIEhlbHBTY3JlZW4gOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IElucHV0IHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0VW5pY29kZSB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIE1vdXNlSU8gTW91c2UgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBIZWxwU2NyZWVuTW9kZWwgbW9kZWw7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBMaXN0PE1vdmVSZW5kZXJEYXRhPiBtb3ZlUmVuZGVycztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcztcclxuICAgICAgICBjaGFyIExlYXZlQnV0dG9uO1xyXG4gICAgICAgIHB1YmxpYyBib29sIHdhbm5hTGVhdmU7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0RW50aXR5IGV4cGxhbmF0aW9uRW50aXR5O1xyXG5cclxuICAgICAgICBwdWJsaWMgSGVscFNjcmVlbihIZWxwU2NyZWVuTW9kZWwgaGVscE1vZGVsLCBMaXN0PE1vdmVSZW5kZXJEYXRhPiBtb3ZlUmVuZGVycywgTGlzdDxNb3ZlRGF0YT4gbW92ZURhdGFzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50ZXh0V29ybGQgPSBuZXcgVGV4dFdvcmxkKCk7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5Jbml0KEdhbWVNYWluLldpZHRoLCBHYW1lTWFpbi5IZWlnaHQpO1xyXG4gICAgICAgICAgICBtb2RlbCA9IGhlbHBNb2RlbDtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlUmVuZGVycyA9IG1vdmVSZW5kZXJzO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEYXRhcyA9IG1vdmVEYXRhcztcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5TZXRBbGwoVGV4dEJvYXJkLklOVklTSUJMRUNIQVIsIEJhdHRsZVJlbmRlci5Db2xvcnMuQmFja0NvbW1hbmQsIEJhdHRsZVJlbmRlci5Db2xvcnMuQmFja0NvbW1hbmQpO1xyXG4gICAgICAgICAgICBleHBsYW5hdGlvbkVudGl0eSA9IHRleHRXb3JsZC5HZXRGcmVlRW50aXR5KEdhbWVNYWluLldpZHRoLTQsIDM1KTtcclxuICAgICAgICAgICAgZXhwbGFuYXRpb25FbnRpdHkuU2V0UG9zaXRpb24oMiwgNCk7XHJcbiAgICAgICAgICAgIC8vZXhwbGFuYXRpb25FbnRpdHkuT3JpZ2luLkRyYXcoXCJTU1NfX1NTU1NEQVNEQVNEQVNcIiwgMCwwLCBCYXR0bGVSZW5kZXIuQ29sb3JzLklucHV0RGVzY3JpcHRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGlucHV0ID0gSW5wdXRVbmljb2RlO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQgPT0gTGVhdmVCdXR0b24pIHdhbm5hTGVhdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQgPT0gJ0gnKSB3YW5uYUxlYXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGlucHV0ID09ICdoJykgd2FubmFMZWF2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dCA9PSBVbmljb2RlLkVzY2FwZSkgd2FubmFMZWF2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvL3RleHRXb3JsZC5tYWluQm9hcmQuUmVzZXQoKTtcclxuICAgICAgICAgICAgaW50IHBvcyA9IDA7XHJcbiAgICAgICAgICAgIC8vdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3V2l0aExpbmVicmVha3MoXCJJbnB1dCB5b3VyIGNvbW1hbmRzIGFuZCB3YXRjaCB0aGUgdHVybiBwbGF5IG91dC4gWW91IGNhbiBzZWUgZXZlcnl0aGluZyB5b3VyIGVuZW1pZXMgd2lsbCBkb1xcblxcbkF0dGFja3MgaGF2ZSB0aHJlZSBlbGVtZW50cywgRmlyZSwgVGh1bmRlciBhbmQgSWNlLiBGaXJlIGJlYXRzIEljZSwgSWNlIGJlYXRzIFRodW5kZXIsIFRodW5kZXIgYmVhdHMgRmlyZS5cXG5UaGUgZWxlbWVudCBvZiB0aGUgYXR0YWNrZXIgY2hhbmdlcyB1cG9uIGF0dGFja2luZy4gQXR0YWNrZXJzIGFyZSBpbW11bmUgdG8gYXR0YWNrcyBvZiB0aGUgc2FtZSBlbGVtZW50IVwiLCAyLCBwb3MsIDAsIEJhdHRsZVJlbmRlci5Db2xvcnMuaW5wdXRLZXksIFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUik7XHJcbiAgICAgICAgICAgIGV4cGxhbmF0aW9uRW50aXR5Lk9yaWdpbi5TZXRDdXJzb3JBdCgwLCAwKTtcclxuICAgICAgICAgICAgLy9pZiAoIW1vZGVsLmJhdHRsZUludHJvTW9kZSl7XHJcbiAgICAgICAgICAgIGlmIChmYWxzZSkgeyBcclxuICAgICAgICAgICAgICAgIGV4cGxhbmF0aW9uRW50aXR5Lk9yaWdpbi5EcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhcIklucHV0IHlvdXIgY29tbWFuZHMgYW5kIHdhdGNoIHRoZSB0dXJuIHBsYXkgb3V0LiBQbGFuIHlvdXIgbW92ZXMgYmFzZWQgb24gd2hhdCB0aGUgZW5lbXkgd2lsbCBkbyFcIiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5JbnB1dERlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGV4cGxhbmF0aW9uRW50aXR5Lk9yaWdpbi5DdXJzb3JOZXdMaW5lKDApO1xyXG4gICAgICAgICAgICAgICAgZXhwbGFuYXRpb25FbnRpdHkuT3JpZ2luLkN1cnNvck5ld0xpbmUoMCk7XHJcbiAgICAgICAgICAgICAgICBleHBsYW5hdGlvbkVudGl0eS5PcmlnaW4uRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoXCJBdHRhY2tzIGhhdmUgdGhyZWUgZWxlbWVudHMsIEZpcmUsIFRodW5kZXIgYW5kIEljZS4gRmlyZSBiZWF0cyBJY2UsIEljZSBiZWF0cyBUaHVuZGVyLCBUaHVuZGVyIGJlYXRzIEZpcmUuXCIsIEJhdHRsZVJlbmRlci5Db2xvcnMuSW5wdXREZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBleHBsYW5hdGlvbkVudGl0eS5PcmlnaW4uQ3Vyc29yTmV3TGluZSgwKTtcclxuICAgICAgICAgICAgICAgIGV4cGxhbmF0aW9uRW50aXR5Lk9yaWdpbi5DdXJzb3JOZXdMaW5lKDApO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGxhbmF0aW9uRW50aXR5Lk9yaWdpbi5EcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhcIlRoZSBlbGVtZW50IG9mIHRoZSBhdHRhY2tlciBjaGFuZ2VzIHVwb24gYXR0YWNraW5nLiBBdHRhY2tlcnMgYXJlIGltbXVuZSB0byBhdHRhY2tzIG9mIHRoZSBzYW1lIGVsZW1lbnQhXCIsIEJhdHRsZVJlbmRlci5Db2xvcnMuSW5wdXREZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBwb3MgKz0gMTg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHBvcyA9IDU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5EcmF3KCk7XHJcblxyXG4gICAgICAgICAgICAvL3RleHRXb3JsZC5tYWluQm9hcmQuRHJhd1dpdGhMaW5lYnJlYWtzKFwiSW5wdXQgeW91ciBjb21tYW5kcyBhbmQgd2F0Y2ggdGhlIHR1cm4gcGxheSBvdXQuIFlvdSBjYW4gc2VlIGV2ZXJ5dGhpbmcgeW91ciBlbmVtaWVzIHdpbGwgZG9cXG5cIiwgMiwgcG9zLCAyLCBCYXR0bGVSZW5kZXIuQ29sb3JzLklucHV0RGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhdyhcIllPVVIgQ09NTUFORFNcIiwgMiwgcG9zLTIsIEJhdHRsZVJlbmRlci5Db2xvcnMuV2luZG93TGFiZWwpO1xyXG4gICAgICAgICAgICBzdHJpbmcgbWVudVRpdGxlID0gXCJIRUxQXCI7XHJcbiAgICAgICAgICAgIHN0cmluZyBsZWF2ZUxhYmVsID0gXCJFWElUXCI7XHJcbiAgICAgICAgICAgIGlmIChtb2RlbC5iYXR0bGVJbnRyb01vZGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxlYXZlTGFiZWwgPSBcIlNUQVJUXCI7XHJcbiAgICAgICAgICAgICAgICBtZW51VGl0bGUgPSBcIkJBVFRMRSBJTlRST1wiO1xyXG4gICAgICAgICAgICAgICAgTGVhdmVCdXR0b24gPSAoY2hhcilVbmljb2RlLlNwYWNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTGVhdmVCdXR0b24gPSAneCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXJIb3Jpem9udGFsKG1lbnVUaXRsZSwgQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbCwgMCwgMSk7XHJcblxyXG4gICAgICAgICAgICBMaXN0PGludD4gY29tbWFuZExpc3QgPSBtb2RlbC5jb21tYW5kc0hlcm87XHJcbiAgICAgICAgICAgIHBvcyA9IFNob3dDb21tYW5kcyhwb3MsIGNvbW1hbmRMaXN0KTtcclxuICAgICAgICAgICAgcG9zICs9IDQ7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhdyhcIkVORU1ZIENPTU1BTkRTXCIsIDIsIHBvcywgQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbCk7XHJcbiAgICAgICAgICAgIHBvcyArPSAyO1xyXG4gICAgICAgICAgICBwb3MgPSBTaG93Q29tbWFuZHMocG9zLCBtb2RlbC5jb21tYW5kc0VuZW15KTtcclxuXHJcbiAgICAgICAgICAgIEdhbWVNYWluLkRyYXdJbnB1dCgxLCBwb3MgKyAzLCBMZWF2ZUJ1dHRvbiwgbGVhdmVMYWJlbCwgdGV4dFdvcmxkLm1haW5Cb2FyZCk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW50IFNob3dDb21tYW5kcyhpbnQgcG9zLCBMaXN0PGludD4gY29tbWFuZExpc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvbW1hbmRMaXN0LkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkRSQVdXV1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnQgY29tbWFuZCA9IGNvbW1hbmRMaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBkcmF3RmxhZyA9IENoZWNrRHJhd0NvbW1hbmQoY29tbWFuZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZHJhd0ZsYWcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3KG1vdmVSZW5kZXJzW2NvbW1hbmRdLkFicmV2LCAyLCBwb3MsIEJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhdyhtb3ZlUmVuZGVyc1tjb21tYW5kXS5MYWJlbC5Ub1VwcGVyKCksIDUsIHBvcywgQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5TZXRDdXJzb3JBdCgzLCBwb3MgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKG1vdmVSZW5kZXJzW2NvbW1hbmRdLkRlc2NyaXB0aW9uLEJhdHRsZVJlbmRlci5Db2xvcnMuSW5wdXREZXNjcmlwdGlvbiwgMCwgbW92ZVJlbmRlcnNbY29tbWFuZF0uRGVzY3JpcHRpb24uTGVuZ3RoLTEsIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3KG1vdmVSZW5kZXJzW2NvbW1hbmRdLkRlc2NyaXB0aW9uLCAzLCBwb3MgKyAxLCBCYXR0bGVSZW5kZXIuQ29sb3JzLklucHV0RGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcyArPSAzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBvcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBJc1Nob3dpbmdDb21tYW5kSW5MaXN0KExpc3Q8aW50PiBjb21tYW5kTGlzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY29tbWFuZExpc3QuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiRFJBV1dXXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGludCBjb21tYW5kID0gY29tbWFuZExpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoQ2hlY2tEcmF3Q29tbWFuZChjb21tYW5kKSkgcmV0dXJuIHRydWU7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIENoZWNrRHJhd0NvbW1hbmQoaW50IGNvbW1hbmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBib29sIGRyYXdGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChjb21tYW5kID49IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoY29tbWFuZCk7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWQgPSBtb3ZlRGF0YXNbY29tbWFuZF07XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1kLkhhc1RhZygoaW50KU1vdmVEYXRhVGFncy5Nb3ZlbWVudCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhd0ZsYWcgPSBtb3ZlUmVuZGVyc1tjb21tYW5kXS5MYWJlbC5MZW5ndGggIT0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZHJhd0ZsYWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTaG93KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsLlJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEhlbHBNb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsLmJhdHRsZUludHJvTW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBJc1dhbm5hU2hvd0ludHJvKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsLlJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBJc1Nob3dpbmdDb21tYW5kSW5MaXN0KG1vZGVsLmNvbW1hbmRzRW5lbXkpIHx8IElzU2hvd2luZ0NvbW1hbmRJbkxpc3QobW9kZWwuY29tbWFuZHNIZXJvKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gbW9kZWwuY29tbWFuZHNFbmVteS5Db3VudCAhPSAwIHx8IG1vZGVsLmNvbW1hbmRzSGVyby5Db3VudCAhPSAwO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIE1vdXNlSU8gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX01vdXNlPW5ldyBNb3VzZUlPKCk7fVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIZWxwU2NyZWVuTW9kZWxcclxuICAgIHtcclxuICAgICAgICBCYXR0bGVNYWluIGJhdHRsZU1haW47XHJcbiAgICAgICAgcHVibGljIExpc3Q8aW50PiBjb21tYW5kc0hlcm8gPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIExpc3Q8aW50PiBjb21tYW5kc0VuZW15ID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIHB1YmxpYyBib29sIGJhdHRsZUludHJvTW9kZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGVscFNjcmVlbk1vZGVsKEJhdHRsZU1haW4gYmF0dGxlTWFpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlTWFpbiA9IGJhdHRsZU1haW47XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVmcmVzaERhdGEoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29tbWFuZHNIZXJvLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIEFkZEFsbChiYXR0bGVNYWluLnBsYXllckhhbmRGaXhlZCwgY29tbWFuZHNIZXJvKTtcclxuICAgICAgICAgICAgQWRkQWxsKGJhdHRsZU1haW4ucGxheWVySGFuZFVuZml4ZWQsIGNvbW1hbmRzSGVybyk7XHJcbiAgICAgICAgICAgIEFkZEFsbChiYXR0bGVNYWluLnBsYXllckhhbmRQb29sLCBjb21tYW5kc0hlcm8pO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBiYXR0bGVNYWluLmVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBBZGRBbGxBcnJheShpdGVtLm1vdmVzLCBjb21tYW5kc0VuZW15KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZGRBbGwoTGlzdDxCYXR0bGVNYWluLk1vdmVUeXBlPiBtb3ZlcywgTGlzdDxpbnQ+IGNvbW1hbmRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG0gaW4gbW92ZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBhID0gKGludCkgbTtcclxuICAgICAgICAgICAgICAgIGlmIChhIDwgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbW1hbmRzLkNvbnRhaW5zKGEpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzLkFkZChhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEFkZEFsbEFycmF5KGludFtdIG1vdmVzLCBMaXN0PGludD4gY29tbWFuZHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYSBpbiBtb3ZlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGEgPCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmICghY29tbWFuZHMuQ29udGFpbnMoYSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMuQWRkKGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIElucHV0SGFuZGxpbmdcclxuICAgIHtcclxuICAgICAgICBpbnRbXSB1bmZpeGVkQ29tbWFuZEtleXMgPSB7JzEnLCAnMicsJzMnLCc0JyB9O1xyXG4gICAgICAgIERpY3Rpb25hcnk8SW5wdXQsIGludD4gZml4ZWRNb3ZlQnV0dG9ucyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PElucHV0LCBpbnQ+KCksKF9vMSk9PntfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Ob3JtYWxTaG90KSwnZycpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpLCdmJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlKSwnaScpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIpLCdiJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIpLCd5Jyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlciksJ3QnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQpLCdkJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwKSwndycpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVEb3duKSwncycpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0KSwnYScpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuRG9uZSksVW5pY29kZS5TcGFjZSk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5SZWRvKSwncicpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuUHJldmlldyksJ3AnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LkhlbHApLCdoJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5DYW5jZWwpLCdyJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5Db25maXJtKSxVbmljb2RlLlNwYWNlKTtyZXR1cm4gX28xO30pO1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEdldEZpeGVkTW92ZVVuaWNvZGUoSW5wdXQgaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgdmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChmaXhlZE1vdmVCdXR0b25zLlRyeUdldFZhbHVlKGlucHV0LCBvdXQgdmFsdWUpKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSW5wdXQgSW5wdXR0ZWQoaW50IHVuaWNvZGVLZXksIElucHV0SG9sZGVyIGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIiBpbnB1dCArIFwiKyhjaGFyKXVuaWNvZGVLZXkpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBmaXhlZE1vdmVCdXR0b25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5WYWx1ZSA9PSB1bmljb2RlS2V5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlucHV0LkNvbnRhaW5zKGl0ZW0uS2V5KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uS2V5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdW5maXhlZENvbW1hbmRLZXlzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodW5maXhlZENvbW1hbmRLZXlzW2ldID09IHVuaWNvZGVLZXkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHVuZml4ZWRDb21tYW5kUG9zID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpMiA9IDA7IGkyIDwgaW5wdXQuaW5wdXRzLkNvdW50OyBpMisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LlRhZ0lzKGkyLCBJbnB1dFRhZ3MuTU9WRVVORklYKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVuZml4ZWRDb21tYW5kUG9zID09IGkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0LmlucHV0c1tpMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmZpeGVkQ29tbWFuZFBvcysrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0KElucHV0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNZXNzYWdlT25Qb3NpdGlvblxyXG4gICAge1xyXG4gICAgICAgIEJhdHRsZVJlbmRlciBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0V29ybGQgdGV4dFdvcmxkO1xyXG4gICAgICAgIHByaXZhdGUgQmxpbmtBbmltIGJsaW5rQW5pbTtcclxuXHJcbiAgICAgICAgcHVibGljIE1lc3NhZ2VPblBvc2l0aW9uKEJhdHRsZVJlbmRlciBiYXR0bGVSZW5kZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkO1xyXG4gICAgICAgICAgICBibGlua0FuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuQmxpbmtBbmltPihuZXcgQmxpbmtBbmltKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTWVzc2FnZU9uUG9zKFZlY3RvcjJEIHBvcywgc3RyaW5nIHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZW50aXR5ID0gdGV4dFdvcmxkLkdldFRlbXBFbnRpdHkodi5MZW5ndGggKyAyLCA2KTtcclxuICAgICAgICAgICAgYmxpbmtBbmltLkFkZChlbnRpdHkuQW5pbUJhc2UoMmYpLCBuZXcgQmxpbmtBbmltLkJsaW5rRGF0YShUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIDAuMzVmLCAwLjM1ZikpO1xyXG4gICAgICAgICAgICB2YXIgeE9mZiA9ICh2Lkxlbmd0aCAtIDMpIC8gMjtcclxuICAgICAgICAgICAgaWYgKHhPZmYgPCAwKSB4T2ZmID0gMDtcclxuICAgICAgICAgICAgdmFyIGxpbmVTdGFydCA9IG5ldyBWZWN0b3IyRCh4T2ZmLCAwKTtcclxuICAgICAgICAgICAgZW50aXR5LlNldFBvc2l0aW9uKHBvcyArIG5ldyBWZWN0b3IyRCgxIC0geE9mZiwgMCkpO1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUocG9zKTtcclxuICAgICAgICAgICAgLy9lbnRpdHkuT3JpZ2luLkRyYXcodiwgMSwgNSk7XHJcbiAgICAgICAgICAgIGVudGl0eS5PcmlnaW4uRHJhd1dpdGhHcmlkKHYsIDAsIDMsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm8sIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm8pO1xyXG5cclxuICAgICAgICAgICAgZW50aXR5Lk9yaWdpbi5EcmF3TGluZXMoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVybywgbGluZVN0YXJ0LCBsaW5lU3RhcnQgKyBuZXcgVmVjdG9yMkQoMiwgMCksIGxpbmVTdGFydCArIG5ldyBWZWN0b3IyRCgyLCAyKSk7XHJcbiAgICAgICAgICAgIGVudGl0eS5PcmlnaW4uQXV0b0ZpeEdyaWRkaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW47XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTW91c2VIb3ZlclRleHRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nW11bXSB0ZXh0cyA9IG5ldyBzdHJpbmdbM11bXTtcclxuICAgICAgICBwdWJsaWMgTW91c2VIb3Zlck1hbmFnZXIgaG92ZXJNYW5hZ2VyO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IGVudGl0eTtcclxuXHJcbiAgICAgICAgcHVibGljIE1vdXNlSG92ZXJUZXh0KE1vdXNlSG92ZXJNYW5hZ2VyIGhvdmVyTWFuYWdlciwgVGV4dEVudGl0eSBlbnRpdHksIHN0cmluZ1tdIG1vdmVEZXNjcmlwdGlvbnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmhvdmVyTWFuYWdlciA9IGhvdmVyTWFuYWdlcjtcclxuICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSBlbnRpdHk7XHJcbiAgICAgICAgICAgIC8vdGV4dHNbMF0gPSBuZXcgc3RyaW5nW0VudW0uR2V0VmFsdWVzKHR5cGVvZihCYXR0bGVNYWluLk1vdmVUeXBlKSkuTGVuZ3RoXTtcclxuXHJcbiAgICAgICAgICAgIHRleHRzWzBdID0gbW92ZURlc2NyaXB0aW9ucztcclxuICAgICAgICAgICAgLy9Eb25lLFxyXG4gICAgICAgIC8vICAgIFJlZG8sXHJcbiAgICAgICAgLy9QcmV2aWV3LFxyXG4gICAgICAgIC8vQ29uZmlybSxcclxuICAgICAgICAvL0NhbmNlbFxyXG4gICAgICAgICAgICB0ZXh0c1sxXSA9IG5ldyBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgICAgICBcIlN0YXJ0cyBjb21tYW5kIGV4ZWN1dGlvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJSZW1vdmVzIHRoZSBsYXN0IGlucHV0dGVkIGNvbW1hbmRcIixcclxuICAgICAgICAgICAgICAgIFwiUHJldmlldyBtb3ZlcyBvZiB0aGUgb3Bwb25lbnRzXCIsXHJcbiAgICAgICAgICAgICAgICBcIklucHV0cyBtb3ZlXCIsXHJcbiAgICAgICAgICAgICAgICBcIlJldHVybnNcIixcclxuICAgICAgICAgICAgICAgIFwiU2hvd3MgaGVscGZ1bCBpbmZvcm1hdGlvblwiLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0ZXh0c1syXSA9IG5ldyBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgICAgICBcIk1vdmVzIGluIHRoZSBjb3JyZXNwb25kaW5nIGRpcmVjdGlvblwiLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbnRpdHkuUmVzZXRGdWxsKCk7XHJcbiAgICAgICAgICAgIGhvdmVyTWFuYWdlci5VcGRhdGUoKTtcclxuICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IGhvdmVyTWFuYWdlci5tb3VzZUhvdmVyc0FjdGl2ZTtcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZS5Db3VudCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkhPVkVSXCIpO1xyXG4gICAgICAgICAgICAgICAgaW50IGlkID0gYWN0aXZlWzBdLmlkO1xyXG4gICAgICAgICAgICAgICAgaWYoaWQgPj0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgdGV4dCA9IHRleHRzW2FjdGl2ZVswXS50eXBlXVtpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgLy9lbnRpdHkuT3JpZ2luLkRyYXcodGV4dCwgMCwgMCwgMiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5CYWNrQmF0dGxlKTtcclxuICAgICAgICAgICAgICAgICAgICBlbnRpdHkuT3JpZ2luLlNldEN1cnNvckF0KDAsMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5Lk9yaWdpbi5EcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayh0ZXh0LCAyKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeCA9IGFjdGl2ZVswXS5yZWN0LlggKyAxIC0gdGV4dC5MZW5ndGgvMjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCA8IDApIHggPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5TZXRQb3NpdGlvbih4LCBhY3RpdmVbMF0ucmVjdC5ZIC0yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJldmlld1N5c3RlbVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgcHJpdmF0ZSBCYXR0bGVNYWluIGJhdHRsZU1haW47XHJcbiAgICAgICAgcHVibGljIGJvb2wgcHJldmlld0FjdGl2ZTtcclxuICAgICAgICBwcml2YXRlIENsb25lZFN0YXRlIGNsb25lZFN0YXRlO1xyXG4gICAgICAgIHByaXZhdGUgUXVpY2tBY2Nlc3Nvck9uZTxCYXR0bGVNYWluLkJhdHRsZUVudGl0eT4gYmF0dGxlRW50aXR5O1xyXG4gICAgICAgIERlYnVnZ2VyIGRlYnVnID0gbmV3IERlYnVnZ2VyKHRydWUpO1xyXG5cclxuICAgICAgICBwdWJsaWMgUHJldmlld1N5c3RlbShFQ1NNYW5hZ2VyIGVjcywgQmF0dGxlTWFpbiBiYXR0bGVNYWluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIGVjcy5BZGRDb3B5TWV0aG9kKHR5cGVvZihCYXR0bGVNYWluLkJhdHRsZUVudGl0eSksIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248b2JqZWN0LCBvYmplY3Q+KSgobzEsIG8yKT0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0byA9IG8yIGFzIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdmFyIGZyb20gPSBvMSBhcyBCYXR0bGVNYWluLkJhdHRsZUVudGl0eTtcclxuICAgICAgICAgICAgICAgIHRvLnBvcyA9IGZyb20ucG9zO1xyXG4gICAgICAgICAgICAgICAgdG8ubGlmZSA9IGZyb20ubGlmZTtcclxuICAgICAgICAgICAgICAgIHRvLm1heExpZmUgPSBmcm9tLm1heExpZmU7XHJcbiAgICAgICAgICAgICAgICB0by5lbGVtZW50ID0gZnJvbS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0by5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0by5tb3Zlc1tpXSA9IGZyb20ubW92ZXNbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgZWNzLkFkZENvcHlNZXRob2QodHlwZW9mKEJhdHRsZU1haW4uQmF0dGxlU3RhdGUpLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPG9iamVjdCwgb2JqZWN0PikoKG8xLCBvMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvID0gbzIgYXMgQmF0dGxlTWFpbi5CYXR0bGVTdGF0ZTtcclxuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gbzEgYXMgQmF0dGxlTWFpbi5CYXR0bGVTdGF0ZTtcclxuICAgICAgICAgICAgICAgIHRvLmFjdGluZ0VudGl0eSA9IGZyb20uYWN0aW5nRW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdG8uQmF0dGxlRW5kQWN0aXZlID0gZnJvbS5CYXR0bGVFbmRBY3RpdmU7XHJcbiAgICAgICAgICAgICAgICB0by5tb3ZlVGlja19Ob3cgPSBmcm9tLm1vdmVUaWNrX05vdztcclxuICAgICAgICAgICAgICAgIHRvLm1vdmVUaWNrX1RvdGFsID0gZnJvbS5tb3ZlVGlja19Ub3RhbDtcclxuICAgICAgICAgICAgICAgIHRvLnBoYXNlID0gZnJvbS5waGFzZTtcclxuICAgICAgICAgICAgICAgIHRvLnR1cm4gPSBmcm9tLnR1cm47XHJcbiAgICAgICAgICAgICAgICB0by50dXJuc1BlclBoYXNlID0gZnJvbS50dXJuc1BlclBoYXNlO1xyXG4gICAgICAgICAgICAgICAgdG8udG90YWxUdXJucyA9IGZyb20udG90YWxUdXJucztcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBlY3MuQWRkQ29weU1ldGhvZCh0eXBlb2YoVGltZVN0YW1wKSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIG9iamVjdD4pKChvMSwgbzIpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0byA9IG8yIGFzIFRpbWVTdGFtcDtcclxuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gbzEgYXMgVGltZVN0YW1wO1xyXG4gICAgICAgICAgICAgICAgdG8uQ3VycmVudFNuYXAgPSBmcm9tLkN1cnJlbnRTbmFwO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIGVjcy5BZGRDb3B5TWV0aG9kKHR5cGVvZihIYXBwSGFuZGxpbmcuSGFwcEhhbmRsZVN0YXRlKSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIG9iamVjdD4pKChvMSwgbzIpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0byA9IG8yIGFzIEhhcHBIYW5kbGluZy5IYXBwSGFuZGxlU3RhdGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgZnJvbSA9IG8xIGFzIEhhcHBIYW5kbGluZy5IYXBwSGFuZGxlU3RhdGU7XHJcbiAgICAgICAgICAgICAgICB0by5oaWdoZXN0SGFuZGxlZCA9IGZyb20uaGlnaGVzdEhhbmRsZWQ7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVNYWluID0gYmF0dGxlTWFpbjtcclxuICAgICAgICAgICAgY2xvbmVkU3RhdGUgPSBuZXcgQ2xvbmVkU3RhdGUoKTtcclxuICAgICAgICAgICAgYmF0dGxlRW50aXR5ID0gZWNzLlF1aWNrQWNjZXNzb3IxPEJhdHRsZU1haW4uQmF0dGxlRW50aXR5PigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTdGFydFByZXZpZXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYmF0dGxlTWFpbi5lbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoXCJBTEwgRU5USVRJRVMgQkVGT1JFIFBSRVZJRVdcIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KGl0ZW0ucmFuZG9tUG9zaXRpb24gKyBcIiBSQU5ET00gUE9TXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoaXRlbS5UeXBlICsgXCIgdHlwZVwiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KGl0ZW0uZHJhd1R1cm4gKyBcIiBkcmF3IHR1cm5cIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkVORFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlY3MuQ2xvbmVTdGF0ZShjbG9uZWRTdGF0ZSk7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uYmF0dGxlU3RhdGUuQmF0dGxlRW5kQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHByZXZpZXdBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYmF0dGxlTWFpbi5lbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmxpZmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgaXRlbS5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5UaWNrKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBFbmRQcmV2aWV3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkVuZCBwcmV2aWV3XCIpO1xyXG4gICAgICAgICAgICAvLyAgIENvbnNvbGUuUmVhZEtleSgpO1xyXG4gICAgICAgICAgICBwcmV2aWV3QWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoYmF0dGxlTWFpbi5lbnRpdGllcy5Db250YWlucyhiYXR0bGVFbnRpdHkuQ29tcDEoMCkpK1wiWFhYU1wiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVjcy5SZXN0b3JlU3RhdGUoY2xvbmVkU3RhdGUpO1xyXG4gICAgICAgICAgICBiYXR0bGVNYWluLmJhdHRsZVN0YXRlLnBoYXNlID0gQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHM7XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBiYXR0bGVNYWluLmVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChcIkFMTCBFTlRJVElFUyBBRlRFUiBQUkVWSUVXXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtLnJhbmRvbVBvc2l0aW9uK1wiIFJBTkRPTSBQT1NcIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5QcmludChpdGVtLlR5cGUgKyBcIiB0eXBlXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuUHJpbnQoaXRlbS5kcmF3VHVybiArIFwiIGRyYXcgdHVyblwiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLlByaW50KFwiRU5EXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBSZWZsZWN0aW9uVGVzdFxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgUmVmbGVjdGlvblRlc3QoKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWJ1ZyA9IG5ldyBEZWJ1Z2dlcih0cnVlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGJlID0gbmV3IENvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gYmUuR2V0VHlwZSgpO1xyXG4gICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBiZTIgPSBuZXcgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgYmUyLnJhbmRvbVBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgZGVidWcuUHJpbnQodHlwZS5HZXRGaWVsZChcInJhbmRvbVBvc2l0aW9uXCIpLkdldFZhbHVlKGJlMikuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGRlYnVnLlByaW50KGJlMi5yYW5kb21Qb3NpdGlvbiArIFwiXCIpO1xyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludChiZSk7XHJcbiAgICAgICAgICAgIERlZXBDbG9uZUhlbHBlci5EZWVwQ29weVBhcnRpYWwoYmUsIGJlMik7XHJcbiAgICAgICAgICAgIERlZXBDbG9uZUhlbHBlci5EZWVwQ29weVBhcnRpYWwoYmUyLCBiZSk7XHJcbiAgICAgICAgICAgIGRlYnVnLlByaW50KGJlKTtcclxuICAgICAgICAgICAgZGVidWcuUHJpbnQoYmUyKTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBkZWJ1Zy5QcmludCh0eXBlLkdldEZpZWxkKFwicmFuZG9tUG9zaXRpb25cIikuR2V0VmFsdWUoYmUyKS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgZGVidWcuUHJpbnQoYmUyLnJhbmRvbVBvc2l0aW9uK1wiXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW47XHJcbnVzaW5nIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmF0dGxlUmVuZGVyIDogSVRleHRTY3JlZW5fXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgQXR0YWNrUHJldmlldyBhdHRhY2tQcmV2aWV3O1xyXG4gICAgICAgIHByaXZhdGUgQmF0dGxlTWFpbiB0dXJuQmFzZVRyeTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFN0YWdlRGF0YSBzdGFnZURhdGE7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBQcmV2aWV3U3lzdGVtIHByZXZpZXdTeXN0ZW07XHJcbiAgICAgICAgcHJpdmF0ZSBQb3NpdGlvbkFuaW1hdGlvbiBwb3NBbmltO1xyXG4gICAgICAgIHByaXZhdGUgQ2hhckJ5Q2hhckFuaW1hdGlvbiBjaGFyQnlDaGFyQW5pbTtcclxuICAgICAgICBwcml2YXRlIERlbGF5c0FuaW1hdGlvbiBkZWxheUFuaW07XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0V29ybGQgdGV4dFdvcmxkO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgVGV4dEJvYXJkIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBMaXN0PFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlPiBpbnB1dFBoYXNlcyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBMaXN0PFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlPigpLChfbzEpPT57X28xLkFkZChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpO19vMS5BZGQoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UgLkNvbmZpcm1JbnB1dCk7cmV0dXJuIF9vMTt9KTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVmVjdG9yMkQgRW50aXR5U2NyZWVuUG9zaXRpb24oaW50IHVzZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbih0dXJuQmFzZVRyeS5lbnRpdGllc1t1c2VyXS5wb3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgUmVjdCBHZXRHcmlkUmVjdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlY3QoZ3JpZE9mZnNldHgsIGdyaWRPZmZzZXR5LCBncmlkU2NhbGUgKiA2LCBncmlkU2NhbGUgKiAzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludCBpbnB1dDtcclxuICAgICAgICBwdWJsaWMgaW50IElucHV0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gaW5wdXQ7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gdmFsdWU7IC8vQ29uc29sZS5Xcml0ZUxpbmUodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEhhbmRsaW5nIEhhcHBIYW5kbGluZyB7IGdldDsgaW50ZXJuYWwgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIE1vdXNlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBwdWJsaWMgTW91c2VIb3Zlck1hbmFnZXIgbW91c2VIb3ZlcjtcclxuXHJcbiAgICAgICAgLy9wdWJsaWMgTGlzdDxEZWxheWVkQWN0aW9ucz4gdGFza3MgPSBuZXcgTGlzdDxEZWxheWVkQWN0aW9ucz4oKTtcclxuICAgICAgICBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPiBtb3ZlQ2hhcnM7XHJcbiAgICAgICAgRGljdGlvbmFyeTxvYmplY3QsIHN0cmluZz4gbW92ZURlc2NyaXB0aW9ucyA9IG5ldyBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPigpO1xyXG4gICAgICAgIERpY3Rpb25hcnk8TWlzY0JhdHRsZUlucHV0LCBzdHJpbmc+IG1pc2NEZXNjcmlwdGlvbnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxNaXNjQmF0dGxlSW5wdXQsIHN0cmluZz4oKSwoX28yKT0+e19vMi5BZGQoTWlzY0JhdHRsZUlucHV0LkRvbmUsXCJET05FXCIpO19vMi5BZGQoTWlzY0JhdHRsZUlucHV0LlJlZG8sXCJSRURPXCIpO19vMi5BZGQoTWlzY0JhdHRsZUlucHV0LkhlbHAsXCJIRUxQXCIpO19vMi5BZGQoTWlzY0JhdHRsZUlucHV0LlByZXZpZXcsXCJQUkVWSUVXXCIpO19vMi5BZGQoTWlzY0JhdHRsZUlucHV0LkNvbmZpcm0sXCJDT05GSVJNXCIpO19vMi5BZGQoTWlzY0JhdHRsZUlucHV0LkNhbmNlbCxcIkNBTkNFTFwiKTtyZXR1cm4gX28yO30pO1xyXG4gICAgICAgIHByaXZhdGUgRGljdGlvbmFyeTxJbnB1dCwgc3RyaW5nPiBtb3ZlQnV0dG9ucztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIGRlYnVnT24gPSB0cnVlO1xyXG4gICAgICAgIHByaXZhdGUgaW50IGdyaWRTY2FsZSA9IDU7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZ3JpZE9mZnNldHggPSAyO1xyXG4gICAgICAgIHByaXZhdGUgaW50IGdyaWRPZmZzZXR5ID0gMTtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PFRleHRFbnRpdHk+IGJhdHRsZXJSZW5kZXJzO1xyXG5cclxuICAgICAgICBjaGFyW11bXSBlbnRpdGllc0NoYXJzO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCBNZXNzYWdlRG9Ob3RIaWRlO1xyXG4gICAgICAgIHN0cmluZyBtZXNzYWdlID0gbnVsbDtcclxuICAgICAgICBwcml2YXRlIGJvb2wgd2FpdGluZ0Zvck1lc3NhZ2VJbnB1dDtcclxuICAgICAgICBwcml2YXRlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlIGxhc3RQaGFzZTtcclxuICAgICAgICBwcml2YXRlIFRleHRFbnRpdHkgbWVzc2FnZUVudDtcclxuXHJcbiAgICAgICAgcHVibGljIElucHV0SGFuZGxpbmcgaW5wdXRIID0gbmV3IElucHV0SGFuZGxpbmcoKTtcclxuICAgICAgICBwdWJsaWMgYm9vbCBoZWxwVmlzdWFsaXplUmVxdWVzdDtcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZVJlbmRlcihCYXR0bGVNYWluIGJhdHRsZUxvZ2ljLCBTdGFnZURhdGEgc3RhZ2VEYXRhLCBQcmV2aWV3U3lzdGVtIFByZXZpZXdTeXN0ZW0pXHJcbiAgICAgICAge1xyXG5cclxuXHJcbiAgICAgICAgICAgIHN0cmluZ1tdIGVudGl0eVRleHRzID0geyBcIkBcIiwgXCImXCIsIFwiJVwiLCBcIiRcIiwgXCJPXCIsIFwiWFwiLCBcIkpcIiwgXCJZXCIsIFwiWlwiLCBcIk1cIixcIkNcIiB9O1xyXG4gICAgICAgICAgICBlbnRpdGllc0NoYXJzID0gbmV3IGNoYXJbZW50aXR5VGV4dHMuTGVuZ3RoXVtdO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGVudGl0eVRleHRzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbnRpdGllc0NoYXJzW2ldID0gZW50aXR5VGV4dHNbaV0uVG9DaGFyQXJyYXkoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHVybkJhc2VUcnkgPSBiYXR0bGVMb2dpYztcclxuICAgICAgICAgICAgdGhpcy5zdGFnZURhdGEgPSBzdGFnZURhdGE7XHJcbiAgICAgICAgICAgIHByZXZpZXdTeXN0ZW0gPSBQcmV2aWV3U3lzdGVtO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQgPSBuZXcgVGV4dFdvcmxkKCk7XHJcbiAgICAgICAgICAgIHBvc0FuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuUG9zaXRpb25BbmltYXRpb24+KG5ldyBQb3NpdGlvbkFuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgY2hhckJ5Q2hhckFuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuQ2hhckJ5Q2hhckFuaW1hdGlvbj4obmV3IENoYXJCeUNoYXJBbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIGRlbGF5QW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5EZWxheXNBbmltYXRpb24+KG5ldyBEZWxheXNBbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5Jbml0KEdhbWVNYWluLldpZHRoLCBHYW1lTWFpbi5IZWlnaHQpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQgPSB0ZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgICAgICAvL1RleHRCb2FyZCA9IG5ldyBUZXh0Qm9hcmQoNzAsIDI1KTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIHBvc0FuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uKG5ldyBQb3NpdGlvbkFuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgdmFyIGJsaW5rQW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5CbGlua0FuaW0+KG5ldyBCbGlua0FuaW0oKSk7XHJcblxyXG4gICAgICAgICAgICBiYXR0bGVyUmVuZGVycyA9IG5ldyBMaXN0PFRleHRFbnRpdHk+KCk7XHJcbiAgICAgICAgICAgIFVwZGF0ZUJhdHRsZVJlbmRlckNvdW50KCk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBtZXNzYWdlRW50ID0gdGV4dFdvcmxkLkdldEZyZWVFbnRpdHkoNDAsIDQpO1xyXG5cclxuICAgICAgICAgICAgdHVybkJhc2VUcnkuaGFwcE1hbmFnZXIuQWRkSGFuZGxlcihuZXcgSGFwcHMuSGFwcEhhbmRsZXIoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uSGFwcFRhZy5BdHRhY2tIaXQsIChoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXR0YWNrZXIgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1toLkdldEF0dHJpYnV0ZV9JbnQoMSldO1xyXG4gICAgICAgICAgICAgICAgaW50IGRlZmVuZGVyRUlEID0gaC5HZXRBdHRyaWJ1dGVfSW50KDApO1xyXG4gICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGRlZmVuZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChkZWZlbmRlckVJRCA+PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVuZGVyID0gdHVybkJhc2VUcnkuZW50aXRpZXNbZGVmZW5kZXJFSURdO1xyXG4gICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50ID0gKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQpaC5HZXRBdHRyaWJ1dGVfSW50KDIpO1xyXG4gICAgICAgICAgICAgICAgVGV4dEVudGl0eSBmZSA9IEdldFByb2pUZXh0RW50aXR5KGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkZWZlbmRlciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBhdHRhY2tlci5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zMiA9IGRlZmVuZGVyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB4RGlzID0gTWF0aC5BYnMocG9zLlggLSBwb3MyLlgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0IHRpbWUgPSAoZmxvYXQpeERpcyAqIDAuMWY7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBwb3NBbmltLkFkZChmZS5BbmltQmFzZSh0aW1lKSwgbmV3IFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YShcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihhdHRhY2tlci5Qb3NpdGlvblYyRCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oZGVmZW5kZXIuUG9zaXRpb25WMkQpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGF0dGFja2VyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MyID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlci5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zMi5YID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MyLlggPSA2O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB4RGlzID0gTWF0aC5BYnMocG9zLlggLSBwb3MyLlgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0IHRpbWUgPSAoZmxvYXQpeERpcyAqIDAuMWY7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoZmUuQW5pbUJhc2UodGltZSksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3MyKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdHVybkJhc2VUcnkuaGFwcE1hbmFnZXIuQWRkSGFuZGxlcihuZXcgSGFwcHMuSGFwcEhhbmRsZXIoQmF0dGxlTWFpbi5IYXBwVGFnLkF0dGFja01pc3MsIChoKSA9PlxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VyID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaC5HZXRBdHRyaWJ1dGVfSW50KDApXTtcclxuICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50KWguR2V0QXR0cmlidXRlX0ludCgxKTtcclxuICAgICAgICAgICAgICAgIFRleHRFbnRpdHkgZmUgPSBHZXRQcm9qVGV4dEVudGl0eShlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBhdHRhY2tlci5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MyID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VyLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAgICAgIHBvczIuWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHBvczIuWCA9IDY7XHJcbiAgICAgICAgICAgICAgICB2YXIgeERpcyA9IE1hdGguQWJzKHBvcy5YIC0gcG9zMi5YKTtcclxuICAgICAgICAgICAgICAgIGZsb2F0IHRpbWUgPSAoZmxvYXQpeERpcyAqIDAuMWY7XHJcbiAgICAgICAgICAgICAgICBwb3NBbmltLkFkZChmZS5BbmltQmFzZSh0aW1lKSwgbmV3IFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YShcclxuICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvcyksXHJcbiAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3MyKSkpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG5cclxuICAgICAgICAgICAgbW92ZUNoYXJzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+KCksKF9vMyk9PntfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSxcIkZcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkljZSxcIklcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIsXCJUXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Ob3JtYWxTaG90LFwiR1wiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0LFVuaWNvZGUuUmlnaHRhcnJvdzIrXCJcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVVcCxVbmljb2RlLlVwYXJyb3cyK1wiXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93bixVbmljb2RlLkRvd25hcnJvdzIrXCJcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFVuaWNvZGUuTGVmdGFycm93MitcIlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYixcIklCXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyQm9tYixcIlRCXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5TdW1tb25FbnRpdHksXCJTVVwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nLFwiIFwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuRG93bkZpcmUsXCJGRFwiKTtyZXR1cm4gX28zO30pO1xyXG5cclxuICAgICAgICAgICAgbW92ZURlc2NyaXB0aW9ucyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPigpLChfbzQpPT57X280LkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkljZSxcIkljZSBTaG90XCIpO19vNC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlLFwiRmlyZSBTaG90XCIpO19vNC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyLFwiVGh1bmRlciBTaG90XCIpO19vNC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iLFwiSWNlIEJvbWJcIik7X280LkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk5vcm1hbFNob3QsXCJHdW5cIik7X280LkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVSaWdodCxVbmljb2RlLlJpZ2h0YXJyb3cyK1wiXCIpO19vNC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXAsVW5pY29kZS5VcGFycm93MitcIlwiKTtfbzQuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24sVW5pY29kZS5Eb3duYXJyb3cyK1wiXCIpO19vNC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxVbmljb2RlLkxlZnRhcnJvdzIrXCJcIik7X280LkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXJCb21iLFwiVGh1bmRlciBCb21iXCIpO19vNC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5TdW1tb25FbnRpdHksXCJTdW1tb25cIik7cmV0dXJuIF9vNDt9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtZXNPblBvcyA9IG5ldyBNZXNzYWdlT25Qb3NpdGlvbih0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGUgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRW50aXR5VHlwZS5oZXJvKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBiYXR0bGVyUmVuZGVyc1tpXS5HZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbWVzT25Qb3MuTWVzc2FnZU9uUG9zKEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24odHVybkJhc2VUcnkuZW50aXRpZXNbaV0ucG9zKSwgXCJZT1VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9NZXNzYWdlT25Qb3MoVmVjdG9yMkQuWmVybywgXCJZT1VcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvL0NvbnNvbGUuUmVhZExpbmUoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZUJhdHRsZVJlbmRlckNvdW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdoaWxlIChiYXR0bGVyUmVuZGVycy5Db3VudCA8IHRoaXMudHVybkJhc2VUcnkuZW50aXRpZXMuQ291bnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRleHRFbnRpdHkgaXRlbSA9IHRleHRXb3JsZC5HZXRGcmVlRW50aXR5KDIsIDIpO1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlclJlbmRlcnMuQWRkKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5TZXRQb3NpdGlvbihCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHR1cm5CYXNlVHJ5LmVudGl0aWVzW2JhdHRsZXJSZW5kZXJzLkNvdW50IC0gMV0ucG9zKSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdHJpbmcgR2V0RW50aXR5TmFtZShpbnQgdXNlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZUVudGl0eSBnYW1lRW50aXR5ID0gdHVybkJhc2VUcnkuZW50aXRpZXNbdXNlcl07XHJcbiAgICAgICAgICAgIHZhciBjaGFycyA9IEdldENoYXIoZ2FtZUVudGl0eSk7XHJcbiAgICAgICAgICAgIHN0cmluZyBuYW1lID0gbmV3IHN0cmluZyhjaGFycyk7XHJcbiAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LmdyYXBoaWNSZXBlYXRlZEluZGV4ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hbWUgKyAoZ2FtZUVudGl0eS5ncmFwaGljUmVwZWF0ZWRJbmRleCArIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0RW50aXR5IEdldFByb2pUZXh0RW50aXR5KFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmZSA9IHRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDEsIDEpO1xyXG4gICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoVGV4dEJvYXJkLklOVklTSUJMRUNIQVIsIDAsIDApO1xyXG4gICAgICAgICAgICBpbnQgZWxlbWVudENvbG9yID0gRWxlbWVudFRvUHJvakNvbG9yKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBmZS5PcmlnaW4uU2V0QmFja0NvbG9yKGVsZW1lbnRDb2xvciwgMCwgMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgSW5wdXRLZXkgaW5wdXQgPSAoSW5wdXRLZXkpSW5wdXQ7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dCAhPSBJbnB1dEtleS5OT05FICYmIHdhaXRpbmdGb3JNZXNzYWdlSW5wdXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdhaXRpbmdGb3JNZXNzYWdlSW5wdXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vaWYgKGlucHV0ICE9IElucHV0S2V5Lk5PTkUpIENvbnNvbGUuV3JpdGVMaW5lKGlucHV0KTtcclxuICAgICAgICAgICAgLy9pbnQgaW5wdXROdW1iZXIgPSBpbnB1dCAtICcwJztcclxuICAgICAgICAgICAgLy9pZiAoZGVidWdPbiAmJiBpbnB1dCA9PSAnaycpXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBEZWJ1Z0V4dHJhLkRlYnVnRXguU2hvdygpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIGlmIChsYXN0UGhhc2UgIT0gdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9TaG93TWVzc2FnZShcIlBpY2sgeW91ciBjb21tYW5kc1wiLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuU2V0QWxsKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBDb2xvcnMuRmlyZUF1cmEpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsYXN0UGhhc2UgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIlhfX1hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgSGlkZU1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5TZXRBbGwoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxhc3RQaGFzZSA9IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXRQaGFzZXMuQ29udGFpbnModHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoSW5wdXRVbmljb2RlID49IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKElucHV0VW5pY29kZSA9PSAncCcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiUFJFVklFV1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlld1N5c3RlbS5TdGFydFByZXZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXRYID0gaW5wdXRILklucHV0dGVkKElucHV0VW5pY29kZSwgdHVybkJhc2VUcnkuaW5wdXRzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXRYLnR5cGUgPT0gSW5wdXRUeXBlLk1pc2NCYXR0bGUgJiYgaW5wdXRYLmFyZzEgPT0gKGludClNaXNjQmF0dGxlSW5wdXQuSGVscClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBWaXN1YWxpemVSZXF1ZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dFgudHlwZSAhPSBJbnB1dFR5cGUuTm9uZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuSW5wdXREb25lKGlucHV0WCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuaW5wdXRzLmlucHV0Rm9yQ29uZmlybWF0aW9uLnR5cGUgIT0gSW5wdXRUeXBlLk5vbmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHR1cm5CYXNlVHJ5LmlucHV0cy5pbnB1dEZvckNvbmZpcm1hdGlvbi50eXBlID09IElucHV0VHlwZS5Nb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNrUHJldmlldy5TaG93UHJldmlldygwLCB0dXJuQmFzZVRyeS5pbnB1dHMuaW5wdXRGb3JDb25maXJtYXRpb24uYXJnMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LkNvbmZpcm1JbnB1dFN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFja1ByZXZpZXcuRW5kKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LklucHV0Q29uZmlybWVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2tQcmV2aWV3LkVuZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL2ZvcmVhY2ggKHZhciBpdGVtIGluIG1vdmVLZXlzKVxyXG4gICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAvLyAgICBpZiAoaXRlbS5WYWx1ZSA9PSBpbnB1dClcclxuICAgICAgICAgICAgICAgIC8vICAgIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0dXJuQmFzZVRyeS5JbnB1dERvbmUoaXRlbS5LZXkpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVXBkYXRlQmF0dGxlUmVuZGVyQ291bnQoKTtcclxuICAgICAgICAgICAgRHJhd0dyYXBoaWNzKGRlbHRhKTtcclxuICAgICAgICAgICAgaWYgKENhbkFkdmFuY2VfTG9naWMoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlICE9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlIC5FeGVjdXRlTW92ZSAmJiBwcmV2aWV3U3lzdGVtLnByZXZpZXdBY3RpdmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlld1N5c3RlbS5FbmRQcmV2aWV3KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlRpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkhhbmRSZWNoYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1N5c3RlbS5UaHJlYWRpbmcuVGhyZWFkLlNsZWVwKDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlRpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vVXBkYXRlQmF0dGxlUmVuZGVyQ291bnQoKTtcclxuICAgICAgICAgICAgLy9EcmF3R3JhcGhpY3MoZGVsdGEpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENhbkFkdmFuY2VHcmFwaGljcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFdvcmxkLklzRG9uZSgpICYmICF3YWl0aW5nRm9yTWVzc2FnZUlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIENhbkFkdmFuY2VfTG9naWMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIENhbkFkdmFuY2VHcmFwaGljcygpICYmIEhhcHBIYW5kbGluZy5Jc0RvbmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dNZXNzYWdlKHN0cmluZyBzLCBib29sIHdhaXRGb3JJbnB1dCA9IHRydWUsIGJvb2wgZG9Ob3RIaWRlID0gZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLk1lc3NhZ2VEb05vdEhpZGUgPSBkb05vdEhpZGU7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBzO1xyXG4gICAgICAgICAgICBtZXNzYWdlRW50Lk9yaWdpbi5SZXNldEludmlzaWJsZSgpO1xyXG4gICAgICAgICAgICBmbG9hdCB0aW1lVG9Xcml0ZSA9IG1lc3NhZ2UuTGVuZ3RoICogMC4wMTVmO1xyXG4gICAgICAgICAgICBpZiAodGltZVRvV3JpdGUgPiAwLjRmKSB0aW1lVG9Xcml0ZSA9IDAuNGY7XHJcbiAgICAgICAgICAgIGNoYXJCeUNoYXJBbmltLkFkZChtZXNzYWdlRW50LkFuaW1CYXNlKHRpbWVUb1dyaXRlKSwgbmV3IENoYXJCeUNoYXJBbmltYXRpb24uQ2hhckJ5Q2hhckRhdGEoMCwgbWVzc2FnZS5MZW5ndGggKyAxKSk7XHJcbiAgICAgICAgICAgIGRlbGF5QW5pbS5EZWxheSh0aW1lVG9Xcml0ZSArIDAuOGYpO1xyXG5cclxuICAgICAgICAgICAgLy93YWl0aW5nRm9yTWVzc2FnZUlucHV0ID0gd2FpdEZvcklucHV0O1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJNOiBcIitzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEhpZGVNZXNzYWdlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICB3YWl0aW5nRm9yTWVzc2FnZUlucHV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIk06IFwiK3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0JhdHRsZU1lc3NhZ2Uoc3RyaW5nIHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIXR1cm5CYXNlVHJ5LkJhdHRsZURlY2lkZWQoKSlcclxuICAgICAgICAgICAgICAgIFNob3dNZXNzYWdlKHMpO1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJNOiBcIitzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdHcmFwaGljcyhmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdXNlSG92ZXIubW91c2VIb3ZlcnMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgdHVybkJhc2VUcnkuVXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgLy9jbGVhciBncmlkXHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5SZXNldCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlucHV0UGhhc2VzLkNvbnRhaW5zKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLlNldEFsbChUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgQ29sb3JzLkJhY2tncm91bmRJbnB1dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGludCBjb250cm9sc1kgPSBncmlkU2NhbGUgKiAzICsgMTAgKyAzICsgMjtcclxuXHJcbiAgICAgICAgICAgIGludCBlbmVteUdyaWRPZmZYID0gZ3JpZFNjYWxlICogMztcclxuICAgICAgICAgICAgYm9vbCBkcmF3RG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3UmVwZWF0ZWQoJyAnLCBncmlkT2Zmc2V0eCwgZ3JpZE9mZnNldHksIGdyaWRTY2FsZSAqIDYsIGdyaWRTY2FsZSAqIDMsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBDb2xvcnMuQmFja0JhdHRsZSk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgMyAqIGdyaWRTY2FsZTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IDMgKiBncmlkU2NhbGU7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZHJhd0RvdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3Q2hhcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkT2Zmc2V0eCArIGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRPZmZzZXR5ICsgaiwgQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdDaGFyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZE9mZnNldHggKyBpICsgZW5lbXlHcmlkT2ZmWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRPZmZzZXR5ICsgaiwgQ29sb3JzLkdyaWRFbmVteSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpICUgZ3JpZFNjYWxlID09IDAgJiYgaiAlIGdyaWRTY2FsZSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3R3JpZChpICsgZ3JpZE9mZnNldHggKyBlbmVteUdyaWRPZmZYLCBqICsgZ3JpZE9mZnNldHksIGdyaWRTY2FsZSwgZ3JpZFNjYWxlLCBDb2xvcnMuR3JpZEVuZW15KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdHcmlkKGkgKyBncmlkT2Zmc2V0eCwgaiArIGdyaWRPZmZzZXR5LCBncmlkU2NhbGUsIGdyaWRTY2FsZSwgQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGdhbWVFbnRpdHkgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZWMgPSBHZXRDaGFyKGdhbWVFbnRpdHkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBnYW1lRW50aXR5LlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNjcmVlblBvcyA9IEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oKEJhc2VVdGlscy5WZWN0b3IyRClwb3MpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuVHlwZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBhbmVsZWZmZWN0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlblBvcy5ZID0gc2NyZWVuUG9zLlkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlblBvcy5YID0gc2NyZWVuUG9zLlggLSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9iYXR0bGVyRW50aXRpZXNbaV0ub3JpZ2luLlBvc2l0aW9uID0gc2NyZWVuUG9zO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhdHRsZXJSZW5kZXJzW2ldLk9yaWdpbi5Qb3NpdGlvbiAhPSBzY3JlZW5Qb3MgJiYgdGV4dFdvcmxkLklzRG9uZSgpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLlBvc2l0aW9uID0gc2NyZWVuUG9zO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZmxvYXQgdGltZSA9IDAuMTVmO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vLy90aW1lID0gNTtcclxuICAgICAgICAgICAgICAgICAgICAvL3Bvc0FuaW0uQWRkKGJhdHRsZXJSZW5kZXJzW2ldLkFuaW1CYXNlKHRpbWUpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKGJhdHRsZXJSZW5kZXJzW2ldLk9yaWdpbi5Qb3NpdGlvbiwgc2NyZWVuUG9zLCB0cnVlKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGMgPSBDb2xvcnMuSGVybztcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LlR5cGUgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSkgYyA9IENvbG9ycy5FbmVteTtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LlR5cGUgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRW50aXR5VHlwZS5waWNrdXApIGMgPSBDb2xvcnMuaW5wdXRLZXk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5EZWFkKVxyXG4gICAgICAgICAgICAgICAgICAgIGMgPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1I7XHJcbiAgICAgICAgICAgICAgICBpbnQgYmMgPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1I7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuQWxpdmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50ID0gZ2FtZUVudGl0eS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ICE9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYyA9IEVsZW1lbnRUb0F1cmFDb2xvcihlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5EZWFkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgZWMuTGVuZ3RoICsgMTsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLkRyYXdDaGFyKFRleHRCb2FyZC5JTlZJU0lCTEVDSEFSLCBqLCAwLCBjLCBiYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVyUmVuZGVyc1tpXS5PcmlnaW4uRHJhdyhlYywgMCwgMCwgYywgYmMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LmdyYXBoaWNSZXBlYXRlZEluZGV4ID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLkRyYXdPbmVEaWdpdChnYW1lRW50aXR5LmdyYXBoaWNSZXBlYXRlZEluZGV4ICsgMSwgMCArIGVjLkxlbmd0aCwgMCwgYywgYmMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpbnQgdGV4dEJvYXJkSGVpZ2h0ID0gMyAqIGdyaWRTY2FsZTtcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vaW50IHkgPSAyO1xyXG4gICAgICAgICAgICAgICAgLy9pbnQgeCA9IDYgKiBncmlkU2NhbGUgKyAyMDtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnQgeCA9IDM7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0UGhhc2VzLkNvbnRhaW5zKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBEcmF3Q29udHJvbHMoY29udHJvbHNZLCA3KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHVybkJhc2VUcnkudGltZVRvQ2hvb3NlID4gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IHJhdGlvID0gdHVybkJhc2VUcnkudGltZVRvQ2hvb3NlIC8gdHVybkJhc2VUcnkudGltZVRvQ2hvb3NlTWF4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1JlcGVhdGVkKCcgJywgeCwgY29udHJvbHNZICsgMTYsIChpbnQpKHJhdGlvICogMTUpLCAxLCBDb2xvcnMuQm9hcmQsIENvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3UmVwZWF0ZWQoJyAnLCB4IC0gMSwgY29udHJvbHNZIC0gMSwgMTUsIDE1LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnQgdHVybk9yZGVyWCA9IDYgKiBncmlkU2NhbGUgKyA1O1xyXG4gICAgICAgICAgICBpbnQgdHVybk9yZGVyWSA9IDI7XHJcbiAgICAgICAgICAgIHR1cm5PcmRlclggPSAyO1xyXG4gICAgICAgICAgICB0dXJuT3JkZXJZID0gMyAqIGdyaWRTY2FsZSArIDE7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dFBoYXNlcy5Db250YWlucyh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSkpXHJcbiAgICAgICAgICAgICAgICB0dXJuT3JkZXJZICs9IDM7XHJcblxyXG4gICAgICAgICAgICBEcmF3VHVybk9yZGVyKHR1cm5PcmRlclgsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBpZiAoIXN0YWdlRGF0YS5oaWRlTGlmZVVJKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3TGlmZSh0dXJuT3JkZXJYICsgMTQsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnQgWCA9IDI7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnN0IGludCBZID0gMTY7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlRW50LlNldFBvc2l0aW9uKFgsIGNvbnRyb2xzWSAtIDIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UgIT0gbnVsbCAmJiAoIUNhbkFkdmFuY2VHcmFwaGljcygpKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3R3JpZChcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBtZXNzYWdlRW50Lk9yaWdpbi5Qb3NpdGlvbi5YSW50LCBtZXNzYWdlRW50Lk9yaWdpbi5Qb3NpdGlvbi5ZSW50LCBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBtZXNzYWdlRW50LldpZHRoLCBtZXNzYWdlRW50LkhlaWdodCwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICAvL21lc3NhZ2VFbnQuT3JpZ2luLkRyYXdHcmlkKDAsIDAsIDQwLCA0LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VFbnQuT3JpZ2luLkRyYXdXaXRoTGluZWJyZWFrcyhtZXNzYWdlLCAxLCAwLCAxLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghTWVzc2FnZURvTm90SGlkZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlRW50Lk9yaWdpbi5TZXRBbGwoVGV4dEJvYXJkLklOVklTSUJMRUNIQVIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd1JlcGVhdGVkKCcgJyxYLCBZLCA0MCwgNCwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSgxKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoMSk7XHJcbiAgICAgICAgICAgIC8vdGV4dEJvYXJkLkRyYXdfQ3Vyc29yKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlLlRvU3RyaW5nKCkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5EcmF3Q2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLlRyeUVuZEFuaW1hdGlvbnMoKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkFkdmFuY2VUaW1lKGRlbHRhKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChDYW5BZHZhbmNlR3JhcGhpY3MoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSGFwcEhhbmRsaW5nLkhhbmRsZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKENhbkFkdmFuY2VHcmFwaGljcygpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LmhhcHBNYW5hZ2VyLlRyeUhhbmRsZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vaWYgKENhbkFkdmFuY2UoKSlcclxuICAgICAgICAgICAgLy97XHJcblxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEVsZW1lbnRUb0F1cmFDb2xvcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgYmMgPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1I7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuRmlyZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuRmlyZUF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5JY2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLkljZUF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5UaHVuZGVyQXVyYTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGJjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgRWxlbWVudFRvUHJvakNvbG9yKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBiYyA9IENvbG9ycy5pbnB1dEtleTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5GaXJlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5GaXJlU2hvdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkljZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuSWNlQXVyYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLlRodW5kZXJBdXJhO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYmM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihCYXNlVXRpbHMuVmVjdG9yMkQgcG9zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHggPSBwb3MuWDtcclxuICAgICAgICAgICAgdmFyIHkgPSBwb3MuWTtcclxuICAgICAgICAgICAgdmFyIHNjcmVlblBvcyA9IG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoeCAqIGdyaWRTY2FsZSArIGdyaWRTY2FsZSAvIDIgKyBncmlkT2Zmc2V0eCwgMiAqIGdyaWRTY2FsZSAtIHkgKiBncmlkU2NhbGUgKyBncmlkU2NhbGUgLyAyICsgZ3JpZE9mZnNldHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2NyZWVuUG9zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdDb250cm9scyhpbnQgeSwgaW50IHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3R3JpZCh4IC0gMiwgeSAtIDEsIDIwLCAxNSwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhdyhcIkNvbnRyb2xzXCIsIHgsIHksICk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh4KzUsIHkpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJDb250cm9sc1wiLCBDb2xvcnMuV2luZG93TGFiZWwpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSh4KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL0lucHV0VGFncyBpbnB1dFRhZyA9IElucHV0VGFncy5NT1ZFRklYO1xyXG4gICAgICAgICAgICBpbnQgeU9mZiA9IDA7XHJcbiAgICAgICAgICAgIHlPZmYgPSBEcmF3SW5wdXRzX0ZpeCh5LCB4LCBJbnB1dFRhZ3MuTU9WRUZJWCwgeU9mZik7XHJcbiAgICAgICAgICAgIC8veU9mZisrO1xyXG4gICAgICAgICAgICB5T2ZmID0gRHJhd0lucHV0c19GaXgoeSwgeCwgSW5wdXRUYWdzLk1JU0MsIHlPZmYpO1xyXG4gICAgICAgICAgICAvL3lPZmYrKztcclxuICAgICAgICAgICAgLy95T2ZmID0gRHJhd0lucHV0c19GaXgoeSwgeCwgSW5wdXRUYWdzLk1PVkVVTkZJWCwgeU9mZik7XHJcblxyXG4gICAgICAgICAgICBpbnQgYXR0YWNrTnVtYmVyID0gMTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5pbnB1dHMuaW5wdXRzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCB4MiA9IHg7XHJcbiAgICAgICAgICAgICAgICBpbnQgeTIgPSB5ICsgMiArIHlPZmY7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0dXJuQmFzZVRyeS5pbnB1dHMuaW5wdXRzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5pbnB1dHMuVGFnSXMoaSwgSW5wdXRUYWdzLk1PVkVVTkZJWCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgeU9mZisrO1xyXG4gICAgICAgICAgICAgICAgICAgIHlPZmYrKztcclxuICAgICAgICAgICAgICAgICAgICBpbnQgdW5pY29kZSA9ICcwJyArIGF0dGFja051bWJlcjtcclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2tOdW1iZXIrKztcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZUhvdmVyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgUmVjdCh4MiAtIDIsIHkyLCAyMCwgMSksIDAsIGlucHV0LmFyZzEpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3Q2hhcignWycsIHgyIC0gMSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKCddJywgeDIgKyBsZW5ndGhCbmFtZSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBkZXNjcmlwdGlvbiA9IHN0cmluZy5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTW92ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlIG0gPSAoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZURlc2NyaXB0aW9ucy5UcnlHZXRWYWx1ZShtLCBvdXQgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBtLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5NaXNjQmF0dGxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWlzY0JhdHRsZUlucHV0IGFyZzEgPSAoTWlzY0JhdHRsZUlucHV0KWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gbWlzY0Rlc2NyaXB0aW9uc1thcmcxXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFRleHRCb2FyZCA9IHRoaXMuVGV4dEJvYXJkO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYWluLkRyYXdJbnB1dCh4MiwgeTIsIHVuaWNvZGUsIGRlc2NyaXB0aW9uLCBUZXh0Qm9hcmQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBjID0gbW92ZUNoYXJzW21vdmVdO1xyXG4gICAgICAgICAgICAgICAgLy9EcmF3TW92ZShtb3ZlLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhdyhjLCB4MiArIDMsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd1dpdGhHcmlkKGMrXCJcIiwgeDIsIHkgKyAyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgaW50IERyYXdJbnB1dHNfRml4KGludCB5LCBpbnQgeCwgSW5wdXRUYWdzIGlucHV0VGFnLCBpbnQgeU9mZilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmlucHV0cy5pbnB1dHMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHgyID0geDtcclxuICAgICAgICAgICAgICAgIGludCB5MiA9IHkgKyAyICsgeU9mZjtcclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHR1cm5CYXNlVHJ5LmlucHV0cy5pbnB1dHNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmlucHV0cy5UYWdJcyhpLCBpbnB1dFRhZykpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVuaWNvZGUgPSBpbnB1dEguR2V0Rml4ZWRNb3ZlVW5pY29kZShpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGZvcmNlSW5wdXRMYWJlbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGZvcmNlQ29tbWFuZExhYmVsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBib29sIG1vdmVtZW50Q29tbWFuZCA9IHVuaWNvZGUgPT0gJ3cnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtb3ZlbWVudENvbW1hbmQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JjZUlucHV0TGFiZWwgPSBcIldBU0RcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2VDb21tYW5kTGFiZWwgPSBcIlwiICsgVW5pY29kZS5VcGFycm93MiArIFVuaWNvZGUuTGVmdGFycm93MiArIFVuaWNvZGUuRG93bmFycm93MiArIFVuaWNvZGUuUmlnaHRhcnJvdzI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1bmljb2RlID09ICdhJyB8fCB1bmljb2RlID09ICdzJyB8fCB1bmljb2RlID09ICdkJylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB5T2ZmKys7XHJcbiAgICAgICAgICAgICAgICAgICAgeU9mZisrO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKCdbJywgeDIgLSAxLCB5MiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0NoYXIoJ10nLCB4MiArIGxlbmd0aEJuYW1lLCB5MiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGRlc2NyaXB0aW9uID0gc3RyaW5nLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5Nb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlQ29tbWFuZExhYmVsICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gZm9yY2VDb21tYW5kTGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZSBtID0gKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlKWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlRGVzY3JpcHRpb25zLlRyeUdldFZhbHVlKG0sIG91dCBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IG0uVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5NaXNjQmF0dGxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWlzY0JhdHRsZUlucHV0IGFyZzEgPSAoTWlzY0JhdHRsZUlucHV0KWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gbWlzY0Rlc2NyaXB0aW9uc1thcmcxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VIb3Zlci5tb3VzZUhvdmVycy5BZGQobmV3IE1vdXNlSG92ZXIobmV3IFJlY3QoeDIgLSAyLCB5MiwgMjAsIDEpLCAxLCBpbnB1dC5hcmcxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb3ZlbWVudENvbW1hbmQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUhvdmVyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgUmVjdCh4MiAtIDIsIHkyLCAyMCwgMSksIDIsIDApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VIb3Zlci5tb3VzZUhvdmVycy5BZGQobmV3IE1vdXNlSG92ZXIobmV3IFJlY3QoeDIgLSAyLCB5MiwgMjAsIDEpLCAwLCBpbnB1dC5hcmcxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBUZXh0Qm9hcmQgPSB0aGlzLlRleHRCb2FyZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2VJbnB1dExhYmVsID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEcmF3SW5wdXQoeDIsIHkyLCB1bmljb2RlLCBkZXNjcmlwdGlvbiwgVGV4dEJvYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRHJhd0lucHV0KHgyLCB5MiwgZm9yY2VJbnB1dExhYmVsLCBkZXNjcmlwdGlvbiwgVGV4dEJvYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIGMgPSBtb3ZlQ2hhcnNbbW92ZV07XHJcbiAgICAgICAgICAgICAgICAvL0RyYXdNb3ZlKG1vdmUsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3KGMsIHgyICsgMywgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3V2l0aEdyaWQoYytcIlwiLCB4MiwgeSArIDIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB5T2ZmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERyYXdJbnB1dChpbnQgeDIsIGludCB5MiwgaW50IGtleVVuaWNvZGUsIHN0cmluZyBkZXNjcmlwdGlvbiwgVGV4dEJvYXJkIFRleHRCb2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB4MyA9IERyYXdJbnBDb21tb24oeDIsIHkyLCBkZXNjcmlwdGlvbiwgVGV4dEJvYXJkKTtcclxuXHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3VW5pY29kZUxhYmVsKGtleVVuaWNvZGUsIHgzLCB5MiwgQ29sb3JzLmlucHV0S2V5KTtcclxuICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd1JlY3QoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgYmFyeCwgeTIsIDYreDMtYmFyeCwgMSwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIENvbG9ycy5CYWNrQmF0dGxlKTtcclxuICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd1JlY3QoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgeDIsIHkyLCA2ICsgeDMgLSB4MiwgMSwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIENvbG9ycy5CYWNrQmF0dGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludCBEcmF3SW5wQ29tbW9uKGludCB4MiwgaW50IHkyLCBzdHJpbmcgZGVzY3JpcHRpb24sIFRleHRCb2FyZCBUZXh0Qm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3QnJvd25TdHJpcGUoeTIsIFRleHRCb2FyZCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3KGRlc2NyaXB0aW9uLCB4MiwgeTIsIENvbG9ycy5JbnB1dERlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgaW50IHgzID0geDIgKyAxNDtcclxuXHJcbiAgICAgICAgICAgIC8vaW50IG9mZmIgPSA3O1xyXG4gICAgICAgICAgICBpbnQgYmFyeCA9IHgyICsgZGVzY3JpcHRpb24uTGVuZ3RoO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1JlY3QoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgeDMsIHkyLCA2LCAxLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgQ29sb3JzLkJhY2tCYXR0bGUpO1xyXG4gICAgICAgICAgICByZXR1cm4geDM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRHJhd0lucHV0KGludCB4MiwgaW50IHkyLCBzdHJpbmcga2V5TGFiZWwsIHN0cmluZyBkZXNjcmlwdGlvbiwgVGV4dEJvYXJkIFRleHRCb2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB4MyA9IERyYXdJbnBDb21tb24oeDIsIHkyLCBkZXNjcmlwdGlvbiwgVGV4dEJvYXJkKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoa2V5TGFiZWwsIHgzLCB5MiwgQ29sb3JzLmlucHV0S2V5KTtcclxuICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd1JlY3QoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgYmFyeCwgeTIsIDYgKyB4MyAtIGJhcngsIDEsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBDb2xvcnMuQmFja0JhdHRsZSk7XHJcbiAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdSZWN0KFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIHgyLCB5MiwgNiArIHgzIC0geDIsIDEsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBDb2xvcnMuQmFja0JhdHRsZSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdMaWZlKGludCB0dXJuT3JkZXJYLCBpbnQgdHVybk9yZGVyWSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdHcmlkKHR1cm5PcmRlclggLSAxLCB0dXJuT3JkZXJZIC0gMSwgMjAsIDksIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh0dXJuT3JkZXJYICsgMSwgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJMaWZlXCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh0dXJuT3JkZXJYICsgOCwgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJFbGVtZW50XCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcbiAgICAgICAgICAgIGludCBpbmRleCA9IC0xOyAvL3VzaW5nIHRoaXMgYmVjYXVzZSBub3QgYWxsIHVuaXRzIGdldCBkcmF3blxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IDQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHhPZmYgPSB0dXJuT3JkZXJYICsgMTtcclxuICAgICAgICAgICAgICAgIGludCB5T2ZmID0gdHVybk9yZGVyWSArIDIgKyBpICogMjtcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3UmVjdChUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCB4T2ZmLCB5T2ZmLCA0LCAxLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5CYWNrQmF0dGxlKTtcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3UmVjdChUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCB4T2ZmKzcsIHlPZmYsIDgsIDEsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBCYXR0bGVSZW5kZXIuQ29sb3JzLkJhY2tCYXR0bGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPj0gdHVybkJhc2VUcnkuZW50aXRpZXMuQ291bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBlID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuZHJhd0xpZmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuRGVhZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4T2ZmID0gdHVybk9yZGVyWCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHlPZmYgPSB0dXJuT3JkZXJZICsgMiArIGluZGV4ICogMjtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3IgPSBDb2xvcnMuSGVyb1R1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IENvbG9ycy5FbmVteVR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmVsZW1lbnQgIT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IEVsZW1lbnRUb0F1cmFDb2xvcihlLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdPbmVEaWdpdF9DdXJzb3IoKGludCllLmxpZmUuVmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9EcmF3RW50aXR5Q2hhcihlLCBjb2xvciwgeE9mZiwgeU9mZik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0NoYXIoR2V0Q2hhcihlKSwgeE9mZiwgdHVybk9yZGVyWSArIDIsIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1R3b0RpZ2l0cygoaW50KWUubGlmZSwgeE9mZiwgeU9mZiwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBlbGVtZW50ID0gc3RyaW5nLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZS5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkZpcmU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gXCJGaXJlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkljZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBcIkljZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IFwiVGh1bmRlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVDb2xvciA9IEVsZW1lbnRUb0F1cmFDb2xvcihlLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhlbGVtZW50LCB4T2ZmICsgNywgeU9mZiwgZUNvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3T25lRGlnaXRfQ3Vyc29yKChpbnQpZS5saWZlLlZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSh4OiAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdCcm93blN0cmlwZShpbnQgeU9mZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdCcm93blN0cmlwZSh5T2ZmLCBUZXh0Qm9hcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHByaXZhdGUgdm9pZCBEcmF3QnJvd25TdHJpcGUoaW50IHlPZmYsIFRleHRCb2FyZCB0ZXh0Qm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0Qm9hcmQuRHJhd1JlY3QoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgMCwgeU9mZiwgdGV4dEJvYXJkLldpZHRoLCAxLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5CYWNrU3RyaXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3VHVybk9yZGVyKGludCB0dXJuT3JkZXJYLCBpbnQgdHVybk9yZGVyWSwgYm9vbCBob3Jpem9udGFsID0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZhbHVlIHR1cm5zUGVyUGhhc2UgPSB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuU2V0Q3Vyc29yQXQodHVybk9yZGVyWCArIDMsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKFwiVHVyblwiLCBDb2xvcnMuV2luZG93TGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgaW50IGRyYXdpbmdJZCA9IC0xO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IDQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHlPZmYgPSB0dXJuT3JkZXJZICsgMiArIGkgKiAyO1xyXG4gICAgICAgICAgICAgICAgRHJhd0Jyb3duU3RyaXBlKHlPZmYsIFRleHRCb2FyZCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IDM7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeE9mZiA9IHR1cm5PcmRlclggKyBqICogMyArIDM7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3UmVjdChUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCB4T2ZmLCB5T2ZmLCAyLCAxLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5CYWNrQmF0dGxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBlID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuZHJhd1R1cm4pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuRGVhZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3aW5nSWQrKztcclxuICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3IgPSBDb2xvcnMuSGVyb1R1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IENvbG9ycy5FbmVteVR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmVsZW1lbnQgIT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IEVsZW1lbnRUb0F1cmFDb2xvcihlLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3T25lRGlnaXRfQ3Vyc29yKChpbnQpZS5saWZlLlZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHhPZmYgPSB0dXJuT3JkZXJYICsgMSArIGRyYXdpbmdJZCAqIDM7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHlFbnRpdHkgPSB0dXJuT3JkZXJZICsgMjtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeUZpcnN0TW92ZSA9IHR1cm5PcmRlclkgKyAzO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4Rmlyc3RNb3ZlID0geE9mZjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaG9yaXpvbnRhbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhPZmYgPSB0dXJuT3JkZXJYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5RW50aXR5ID0gdHVybk9yZGVyWSArIDIgKyBkcmF3aW5nSWQgKiAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5Rmlyc3RNb3ZlID0geUVudGl0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeEZpcnN0TW92ZSA9IHR1cm5PcmRlclggKyAzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBEcmF3RW50aXR5Q2hhcihlLCBjb2xvciwgeE9mZiwgeUVudGl0eSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh4Rmlyc3RNb3ZlLCB5Rmlyc3RNb3ZlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaTIgPSAwOyBpMiA8IHR1cm5zUGVyUGhhc2U7IGkyKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3IyID0gY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBiYWNrQ29sb3IgPSBDb2xvcnMuQmFja0NvbW1hbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJhd2luZ0lkID09IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSAmJiBpMiA9PSB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS50dXJuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb2xvcjIgPSBDb2xvcnMuSGVybztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrQ29sb3IgPSBDb2xvcnMuQmFja0JhdHRsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjIgPSBDb2xvcnMuSW5wdXREZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpMiA8IHR1cm5zUGVyUGhhc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBjID0gR2V0Q2hhck9mTW92ZShlLCBpMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUhvdmVyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgUmVjdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLkxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLCBlLm1vdmVzW2kyXSkpOyAvL2FkZCBoZXJlLi4uPyBAX0BcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoYywgY29sb3IyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChob3Jpem9udGFsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSBjLkxlbmd0aDsgaiA8IDM7IGorKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5BZHZhbmNlQ3Vyc29yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3X0N1cnNvcignICcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKCcgJywgY29sb3IsIENvbG9ycy5CYWNrQ29tbWFuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhvcml6b250YWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSh4OiB4Rmlyc3RNb3ZlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSh4OiAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdFbnRpdHlDaGFyKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZUVudGl0eSBlLCBpbnQgY29sb3IsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoYXJbXSBjaGFycyA9IEdldENoYXIoZSk7XHJcblxyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhjaGFycywgeCwgeSwgY29sb3IpO1xyXG4gICAgICAgICAgICBpZiAoZS5ncmFwaGljUmVwZWF0ZWRJbmRleCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3T25lRGlnaXQoZS5ncmFwaGljUmVwZWF0ZWRJbmRleCArIDEsIHggKyBjaGFycy5MZW5ndGgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgR2V0Q2hhck9mTW92ZShCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBlLCBpbnQgaTIpXHJcbiAgICAgICAge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IGUubW92ZXNbaTJdO1xyXG4gICAgICAgICAgICBpZiAodmFsID49IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW92ZUNoYXJzWyhCYXR0bGVNYWluLk1vdmVUeXBlKXZhbF07XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIiBcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjaGFyW10gR2V0Q2hhcihCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBnYW1lRW50aXR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVudGl0aWVzQ2hhcnNbZ2FtZUVudGl0eS5ncmFwaGljXTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd01vdmUoVmFsdWUgbW92ZSwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG1vdmUuVmFsID49IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEJhdHRsZU1haW4uTW92ZVR5cGUgbSA9IChCYXR0bGVNYWluLk1vdmVUeXBlKW1vdmUuVmFsO1xyXG4gICAgICAgICAgICAgICAgRHJhd01vdmUobSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKCcgJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd01vdmUoQmF0dGxlTWFpbi5Nb3ZlVHlwZSBtb3ZlLCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYyA9IG1vdmVDaGFyc1ttb3ZlXTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKGMsIGNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRleHRCb2FyZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgQ29sb3JzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEdyaWRIZXJvID0gMTtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBHcmlkRW5lbXkgPSAyO1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEhlcm8gPSAzO1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEVuZW15ID0gNDtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBIZXJvVHVybiA9IDU7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgRW5lbXlUdXJuID0gNjtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBpbnB1dEtleSA9IDc7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQm9hcmQgPSA4O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IFdpbmRvd0xhYmVsID0gOTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBGaXJlQXVyYSA9IDEwO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEljZUF1cmEgPSAxMTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBUaHVuZGVyQXVyYSA9IDEyO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEZpcmVTaG90ID0gMTM7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgSWNlU2hvdCA9IDE0O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IFRodW5kZXJTaG90ID0gMTU7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQmFja2dyb3VuZElucHV0ID0gMTY7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgSW5wdXREZXNjcmlwdGlvbiA9IDE3O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEJhY2tCYXR0bGUgPSAxODtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBCYWNrQ29tbWFuZCA9IDE5O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEJhY2tTdHJpcGUgPSAyMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIElucHV0S2V5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOT05FLCBMRUZULCBSSUdIVCwgRE9XTiwgVVAsIEZJUkUsIFJFRE8sIERPTkUsXHJcbiAgICAgICAgICAgIElDRSxcclxuICAgICAgICAgICAgVEhVTkRFUixcclxuICAgICAgICAgICAgTk9STUFMU0hPVFxyXG4gICAgICAgIH1cclxuXG5cclxuXHJcbiAgICBcbnByaXZhdGUgaW50IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19JbnB1dFVuaWNvZGU9LTE7fVxyXG5cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuO1xyXG51c2luZyBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmc7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBHYW1lTWFpbiA6IElUZXh0U2NyZWVuX1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgQmF0dGxlTWFpbiBiYXR0bGVNYWluO1xyXG4gICAgICAgIHByaXZhdGUgQmF0dGxlUmVuZGVyIGJhdHRsZVJlbmRlcjtcclxuICAgICAgICBwcml2YXRlIE1vZGVTZWxlY3Rpb25TY3JlZW4gbW9kZVNlbGVjdGlvblNjcmVlbjtcclxuICAgICAgICBJVGV4dFNjcmVlbl8gbWFpbkRyYXc7XHJcbiAgICAgICAgcHJpdmF0ZSBIZWxwU2NyZWVuIGhlbHBTY3JlZW47XHJcbiAgICAgICAgcHJpdmF0ZSBSZXN1bHRTY3JlZW4gcmVzdWx0U2NyZWVuO1xyXG4gICAgICAgIC8vSVRleHRTY3JlZW5bXSBzY3JlZW5zID0gbmV3IElUZXh0U2NyZWVuWzVdO1xyXG4gICAgICAgIGludCBzdGFnZUlkO1xyXG4gICAgICAgIGludCBzdGFnZUdyb3VwSWQgPSAtMTtcclxuICAgICAgICAvL2ludCBzdGFnZUdyb3VwID0gMDtcclxuICAgICAgICBpbnRbXSBlbmVteUFtb3VudCA9IG5ldyBpbnRbXSAgIHsgMSwgMSwgMiwgMSwgMiwgMywgMiwgMywgMSwgMiwgMywgMyB9O1xyXG4gICAgICAgIGludFtdIHR1cm5BbW91bnQgPSBuZXcgaW50W10geyAyLCA0LCAyLCA2LCA0LCAyLCA2LCA0LCA4LCA4LCA2LCA4IH07XHJcbiAgICAgICAgcHJpdmF0ZSBNb3VzZUhvdmVyVGV4dCBtb3VzZUhvdmVyO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgR2FtZU1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZVNlbGVjdGlvblNjcmVlbiA9IG5ldyBNb2RlU2VsZWN0aW9uU2NyZWVuKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgUmVzZXQoKTtcclxuICAgICAgICAgICAgbW9kZVNlbGVjdGlvblNjcmVlbi5tb2RlID0gMTtcclxuICAgICAgICAgICAgbW9kZVNlbGVjdGlvblNjcmVlbi53YW5uYUxlYXZlID0gMTtcclxuICAgICAgICAgICAgbWFpbkRyYXcgPSBtb2RlU2VsZWN0aW9uU2NyZWVuO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vUmVzZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3ZhciBtb3ZlUmVuZGVySW5mbyA9IG5ldyBNb3ZlUmVuZGVySW5mbygpO1xyXG4gICAgICAgICAgICAvL21vdmVSZW5kZXJJbmZvLkFkZE1vdmVOYW1lcygpO1xyXG4gICAgICAgICAgICBzdHJpbmdbXSBtb3ZlRGVzY3JpcHRpb25zID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgdXBcIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBsZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgZG93blwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIHJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICBcIlNob290cyBmb3J3YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBcIlNob290cyBmaXJlIGZvcndhcmRcIixcclxuICAgICAgICAgICAgICAgIFwiU2hvb3RzIGljZSBmb3J3YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBcIlNob290cyB0aHVuZGVyIGZvcndhcmRcIixcclxuICAgICAgICAgICAgICAgIFwiVGhyb3dzIGljZSBib21iIHRocmVlIHNxdWFyZXMgZm9yd2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJUaHJvd3MgdGh1bmRlciBib21iIHRocmVlIHNxdWFyZXMgZm9yd2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTdW1tb25zIGFub3RoZXIgZW5lbXlcIixcclxuICAgICAgICAgICAgICAgIFwiXCIsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpbnQgbW9kZSA9IG1vZGVTZWxlY3Rpb25TY3JlZW4ubW9kZTtcclxuICAgICAgICAgICAgYm9vbCB0aW1lQXR0YWNrID0gbW9kZVNlbGVjdGlvblNjcmVlbi50aW1lQXR0YWNrO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVjcyA9IEVDU01hbmFnZXIuQ3JlYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBTdGFnZURhdGFDcmVhdG9yIHNkYyA9IG5ldyBTdGFnZURhdGFDcmVhdG9yKGVjcyk7XHJcbiAgICAgICAgICAgIHN0YWdlR3JvdXBTZWxlY3Rpb24gPSBudWxsO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy92YXIgc3RhZ2VzID0gZWNzLlF1aWNrQWNjZXNzb3IxPFN0YWdlRGF0YT4oKTtcclxuICAgICAgICAgICAgdmFyIGdyb3VwcyA9IGVjcy5RdWlja0FjY2Vzc29yMTxTdGFnZURhdGFHcm91cD4oKTtcclxuICAgICAgICAgICAgdmFyIGdyb3VwID0gZ3JvdXBzLkNvbXAxKDApO1xyXG4gICAgICAgICAgICBpZihzdGFnZUdyb3VwSWQgPj0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZ3JvdXAgPSBncm91cHMuQ29tcDEoc3RhZ2VHcm91cElkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW50IGQgPSBzdGFnZUlkO1xyXG4gICAgICAgICAgICBpZiAoZ3JvdXAuc3RhZ2VEYXRhSWRzLkNvdW50IDw9IGQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1haW5EcmF3ID0gbW9kZVNlbGVjdGlvblNjcmVlbjtcclxuICAgICAgICAgICAgICAgIG1vZGVTZWxlY3Rpb25TY3JlZW4uUmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlSWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgc3RhZ2VHcm91cElkID0gLTE7XHJcbiAgICAgICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBTdGFnZURhdGEgc3RhZ2VEYXRhID0gZ3JvdXAuc3RhZ2VEYXRhSWRzW3N0YWdlSWRdLkdldENvbXBvbmVudDxTdGFnZURhdGE+KCk7XHJcblxyXG4gICAgICAgICAgICAvL2QgPSAyMDA7XHJcbiAgICAgICAgICAgIGlmIChkID49IGVuZW15QW1vdW50Lkxlbmd0aCkgZCA9IGVuZW15QW1vdW50Lkxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGludCBuRW5lbWllcyA9IGVuZW15QW1vdW50W2RdO1xyXG5cclxuICAgICAgICAgICAgQmF0dGxlU2V0dXAgYmF0dGxlU2V0dXAgPSBuZXcgQmF0dGxlU2V0dXAobW9kZSwgZ3JvdXAuc3RhZ2VEYXRhSWRzW3N0YWdlSWRdLCBlY3MpO1xyXG4gICAgICAgICAgICB2YXIgbW92ZUNyZWF0b3IgPSBiYXR0bGVTZXR1cC5tb3ZlQ3JlYXRvcjtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbiA9IGJhdHRsZVNldHVwLmJhdHRsZU1haW47XHJcbiAgICAgICAgICAgIExpc3Q8TW92ZVJlbmRlckRhdGE+IG1vdmVSZW5kZXJzID0gbW92ZUNyZWF0b3IubW92ZVJlbmRlcnM7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbW92ZVJlbmRlcnMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbW92ZVJlbmRlcnNbaV0uRGVzY3JpcHRpb24gPSBtb3ZlRGVzY3JpcHRpb25zW2ldO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcInswfSB7MX1cIiwgbW92ZVJlbmRlcnNbaV0uTGFiZWwsIG1vdmVSZW5kZXJzW2ldLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBIZWxwU2NyZWVuTW9kZWwgaGVscE1vZGVsID0gbmV3IEhlbHBTY3JlZW5Nb2RlbChiYXR0bGVNYWluKTtcclxuICAgICAgICAgICAgaGVscFNjcmVlbiA9IG5ldyBIZWxwU2NyZWVuKGhlbHBNb2RlbCwgbW92ZVJlbmRlcnMsIG1vdmVDcmVhdG9yLm1vdmVEYXRhcyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcHMgPSBuZXcgUHJldmlld1N5c3RlbShlY3MsIGJhdHRsZU1haW4pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL2Vjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG5ldyBFbmVteVNwYXduRGF0YSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKSk7XHJcbiAgICAgICAgICAgIC8vZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQobmV3IEVuZW15U3Bhd25EYXRhKDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpKTtcclxuXHJcblxyXG4gICAgICAgICAgICBmbG9hdCB0aW1lVG9DaG9vc2UgPSAtMTtcclxuICAgICAgICAgICAgaWYgKHRpbWVBdHRhY2spXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpbWVUb0Nob29zZSA9ICg1ZiAqIHR1cm5BbW91bnRbZF0pICogbkVuZW1pZXM7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiYXR0bGVNYWluLnRpbWVUb0Nob29zZU1heCA9IHRpbWVUb0Nob29zZTtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5Jbml0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBiYXR0bGVSZW5kZXIgPSBuZXcgQmF0dGxlUmVuZGVyKGJhdHRsZU1haW4sIHN0YWdlRGF0YTogc3RhZ2VEYXRhLCBQcmV2aWV3U3lzdGVtOiBwcyk7XHJcbiAgICAgICAgICAgIG5ldyBBdHRhY2tQcmV2aWV3KGVjcywgYmF0dGxlUmVuZGVyKTtcclxuICAgICAgICAgICAgbmV3IEhhcHBIYW5kbGluZyhiYXR0bGVSZW5kZXIsIGJhdHRsZVNldHVwKTtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChoZWxwU2NyZWVuLklzV2FubmFTaG93SW50cm8oKSkge1xyXG4gICAgICAgICAgICAgICAgaGVscFNjcmVlbi5TaG93KCk7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJhdyA9IGhlbHBTY3JlZW47XHJcbiAgICAgICAgICAgICAgICBoZWxwTW9kZWwuYmF0dGxlSW50cm9Nb2RlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyYXcgPSBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vaGVscFNjcmVlbi5cclxuICAgICAgICAgICAgcmVzdWx0U2NyZWVuID0gbmV3IFJlc3VsdFNjcmVlbigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmVzdWx0U2NyZWVuLmJhdHRsZVJlc3VsdCA9IGJhdHRsZU1haW4uYmF0dGxlUmVzdWx0O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgTW91c2VIb3Zlck1hbmFnZXIgaG92ZXJNYW5hZ2VyID0gbmV3IE1vdXNlSG92ZXJNYW5hZ2VyKE1vdXNlKTtcclxuICAgICAgICAgICAgaG92ZXJNYW5hZ2VyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgQmFzZVV0aWxzLlJlY3QoNSw1LDUsNSksIDAsMCkpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1vdXNlSG92ZXIgPSBuZXcgTW91c2VIb3ZlclRleHQoaG92ZXJNYW5hZ2VyLCBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldEZyZWVFbnRpdHkoYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5tYWluQm9hcmQuV2lkdGgtMiwgMyksIG1vdmVEZXNjcmlwdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgYmF0dGxlUmVuZGVyLm1vdXNlSG92ZXIgPSBob3Zlck1hbmFnZXI7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhZ2VHcm91cElkID09IC0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGFnZUdyb3VwU2VsZWN0aW9uID0gbmV3IFN0YWdlR3JvdXBTZWxlY3Rpb25TY3JlZW4oZWNzKTtcclxuICAgICAgICAgICAgICAgIG1haW5EcmF3ID0gc3RhZ2VHcm91cFNlbGVjdGlvbjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dCB7IHNldCB7IG1haW5EcmF3LklucHV0ID0gdmFsdWU7IH0gZ2V0IHsgcmV0dXJuICdjJzsgfSB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQgeyB2YWx1ZSA9IHJlbWFwLlJlbWFwKHZhbHVlKTsgbWFpbkRyYXcuSW5wdXRVbmljb2RlID0gdmFsdWU7IH0gZ2V0IHsgcmV0dXJuICdjJzsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIE1vdXNlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBVbmljb2RlUmVtYXAgcmVtYXAgPSBuZXcgVW5pY29kZVJlbWFwKCk7XHJcbiAgICAgICAgcHJpdmF0ZSBTdGFnZUdyb3VwU2VsZWN0aW9uU2NyZWVuIHN0YWdlR3JvdXBTZWxlY3Rpb247XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBpbnQgV2lkdGggPSAzNTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGludCBIZWlnaHQgPSA0NjtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERyYXdJbnB1dChpbnQgeDIsIGludCB5MiwgaW50IHVuaWNvZGUsIHN0cmluZyBkZXNjcmlwdGlvbiwgVGV4dEJvYXJkIHRleHRCb2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdVbmljb2RlTGFiZWwodW5pY29kZSwgeDIsIHkyLCBCYXR0bGVSZW5kZXIuQ29sb3JzLmlucHV0S2V5KTtcclxuICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhdyhkZXNjcmlwdGlvbiwgeDIgKyAyICsgNSwgeTIsIEJhdHRsZVJlbmRlci5Db2xvcnMuSW5wdXREZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIEJhdHRsZVJlbmRlci5EcmF3SW5wdXQoeDIsIHkyLCB1bmljb2RlLCBkZXNjcmlwdGlvbiwgdGV4dEJvYXJkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdXNlSG92ZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIG1haW5EcmF3LkRyYXcoZik7XHJcbiAgICAgICAgICAgIG1haW5EcmF3Lk1vdXNlID0gTW91c2U7XHJcbiAgICAgICAgICAgIGlmKHN0YWdlR3JvdXBTZWxlY3Rpb24gIT0gbnVsbCAmJiBzdGFnZUdyb3VwU2VsZWN0aW9uLndhbnRlZEdyb3VwID49IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YWdlR3JvdXBJZCA9IHN0YWdlR3JvdXBTZWxlY3Rpb24ud2FudGVkR3JvdXA7XHJcbiAgICAgICAgICAgICAgICBzdGFnZUdyb3VwU2VsZWN0aW9uLndhbnRlZEdyb3VwID0gLTE7XHJcbiAgICAgICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChoZWxwU2NyZWVuLndhbm5hTGVhdmUgPT0gdHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaGVscFNjcmVlbi53YW5uYUxlYXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJhdyA9IGJhdHRsZVJlbmRlcjtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1haW5EcmF3ID09IGJhdHRsZVJlbmRlcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhdHRsZVJlbmRlci5oZWxwVmlzdWFsaXplUmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBTY3JlZW4uU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5EcmF3ID0gaGVscFNjcmVlbjtcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVSZW5kZXIuaGVscFZpc3VhbGl6ZVJlcXVlc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBoZWxwU2NyZWVuLkhlbHBNb2RlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYmF0dGxlTWFpbi5Jc092ZXIoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmF0dGxlTWFpbi5Jc1ZpY3RvcnkoKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWdlSWQrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0U2NyZWVuLkVudGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkRyYXcgPSByZXN1bHRTY3JlZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1haW5EcmF3ID09IHJlc3VsdFNjcmVlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdFNjcmVlbi53YW5uYUxlYXZlID09IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWFpbkRyYXcgPT0gbW9kZVNlbGVjdGlvblNjcmVlbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vZGVTZWxlY3Rpb25TY3JlZW4ud2FubmFMZWF2ZSA9PSAxKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYWluRHJhdy5HZXRCb2FyZCgpO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIE1vdXNlSU8gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX01vdXNlPW5ldyBNb3VzZUlPKCk7fVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBSZXN1bHRTY3JlZW4gOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcbiAgICAgICAgc3RyaW5nIHlvdVdpbiA9IFwiWW91IFdpblwiO1xyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIE1vdXNlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBzdHJpbmcgeW91TG9zZSA9IFwiWW91IGxvc2VcIjtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlUmVzdWx0IGJhdHRsZVJlc3VsdDtcclxuICAgICAgICBwdWJsaWMgUmVzdWx0U2NyZWVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZCA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkluaXQoR2FtZU1haW4uV2lkdGgsIEdhbWVNYWluLkhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgd2FubmFMZWF2ZTtcclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dCB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFbnRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3YW5uYUxlYXZlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChJbnB1dFVuaWNvZGUgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3YW5uYUxlYXZlID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdHJpbmcgbWVzc2FnZSA9IHlvdVdpbjtcclxuICAgICAgICAgICAgaWYgKGJhdHRsZVJlc3VsdC5yZXN1bHQgPT0gMikgbWVzc2FnZSA9IHlvdUxvc2U7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKG1lc3NhZ2UsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJTaG90KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHRXb3JsZC5tYWluQm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW47XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFN0YWdlR3JvdXBTZWxlY3Rpb25TY3JlZW4gOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFF1aWNrQWNjZXNzb3JPbmU8U3RhZ2VEYXRhR3JvdXA+IHN0YWdlR3JvdXBzO1xyXG4gICAgICAgIHByaXZhdGUgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuICAgICAgICBwdWJsaWMgTW91c2VJTyBNb3VzZSB7IHNldDsgZ2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgd2FudGVkR3JvdXAgPSAtMTtcclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlR3JvdXBTZWxlY3Rpb25TY3JlZW4oRUNTTWFuYWdlciBlY3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGFnZUdyb3VwcyA9IGVjcy5RdWlja0FjY2Vzc29yMTxTdGFnZURhdGFHcm91cD4oKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuSW5pdChHYW1lTWFpbi5XaWR0aCwgR2FtZU1haW4uSGVpZ2h0KTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5TZXRBbGwoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIEJhdHRsZVJlbmRlci5Db2xvcnMuQmFja0NvbW1hbmQpO1xyXG5cclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXJIb3Jpem9udGFsKFwiU3RhZ2UgU2VsZWN0aW9uXCIsIEJhdHRsZVJlbmRlci5Db2xvcnMuSGVybywgMCwgMSk7XHJcblxyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlckhvcml6b250YWwoXCJDb250cm9sc1wiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbCwgMCwgNik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHN0YWdlR3JvdXBzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZyA9IHN0YWdlR3JvdXBzLkNvbXAxKGkpO1xyXG4gICAgICAgICAgICAgICAgQmF0dGxlUmVuZGVyLkRyYXdJbnB1dCg3LCBpKjIrOCwgJzEnK2ksIFwiU1RBR0UgXCIrKGkrMSksIHRleHRXb3JsZC5tYWluQm9hcmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgd2FubmFMZWF2ZTtcclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dCB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFbnRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3YW5uYUxlYXZlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBpbnAgPSBJbnB1dFVuaWNvZGUgLSAnMSc7XHJcbiAgICAgICAgICAgIGlmKGlucCA+PSAwICYmIGlucDwgOSkge1xyXG4gICAgICAgICAgICAgICAgd2FudGVkR3JvdXAgPSBpbnA7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3RleHRXb3JsZC5tYWluQm9hcmQuRHJhdyhcIlN0YWdlIFwiICsgaSwgMiwgaSAqIDIgKyAzLCBCYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm8pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHRXb3JsZC5tYWluQm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRlc3RHYW1lIDogSVRleHRHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFRleHRTY3JlZW5Ib2xkZXIgU2NyZWVuSG9sZGVyIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZSBHZXRQYWxldHRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEZWZhdWx0UGFsZXR0ZXMuQzROb3ZlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dFNjcmVlbk4gc2NyZWVuID0gbmV3IFRlc3RTY3JlZW4oKTtcclxuICAgICAgICAgICAgU2NyZWVuSG9sZGVyLlNldEFsbChzY3JlZW4pO1xyXG4gICAgICAgICAgICBzY3JlZW4uSW5pdCh3LCBoKTtcclxuICAgICAgICAgICAgc2NyZWVuLkdldEJvYXJkKCkuRHJhdyhcIlRlc3RcIiwgMCwwLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIFRleHRTY3JlZW5Ib2xkZXIgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1NjcmVlbkhvbGRlcj1uZXcgVGV4dFNjcmVlbkhvbGRlcigpO31cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGVzdFNjcmVlbiA6IFRleHRTY3JlZW5OXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKGZsb2F0IGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlbjtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTW9kZVNlbGVjdGlvblNjcmVlbiA6IElUZXh0U2NyZWVuX1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuICAgICAgICBzdHJpbmcgeW91V2luID0gXCJZb3UgV2luXCI7XHJcbiAgICAgICAgc3RyaW5nIHlvdUxvc2UgPSBcIllvdSBsb3NlXCI7XHJcbiAgICAgICAgcHVibGljIE1vdXNlSU8gTW91c2UgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIGludCBzZWxlY3Rpb247XHJcbiAgICAgICAgcHVibGljIEJhdHRsZVJlc3VsdCBiYXR0bGVSZXN1bHQ7XHJcbiAgICAgICAgcHVibGljIE1vZGVTZWxlY3Rpb25TY3JlZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuSW5pdCg3MCwgMjUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IHdhbm5hTGVhdmU7XHJcbiAgICAgICAgcHVibGljIGludCBtb2RlO1xyXG4gICAgICAgIHB1YmxpYyBib29sIHRpbWVBdHRhY2sgPSBmYWxzZTtcclxuICAgICAgICBwdWJsaWMgaW50IHNjcmVlblN0YWdlO1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0IHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0VW5pY29kZSB7IHNldDsgZ2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEVudGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5SZXNldCgpO1xyXG4gICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5IGlrID0gKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkpIElucHV0O1xyXG4gICAgICAgICAgICBtb2RlID0gLTE7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhdyhcIlByb2dCYXR0bGUgUHJvdG90eXBlIHYwLjNcIiwgMSwgMSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXcoXCJBIGdhbWUgYnkgUGlkcm9oXCIsIDEsIDIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgaWYgKHNjcmVlblN0YWdlID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoaWspXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5MRUZUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5TdGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVBdHRhY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LlJJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5TdGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVBdHRhY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuRE9XTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUF0dGFjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuVVA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbd10gVmFuaWxsYVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNCwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW2FdIEVsZW1lbnRhbFwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNSwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3NdIFZhbmlsbGEgVGltZSBBdHRhY2tcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDYsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIltkXSBFbGVtZW50YWwgVGltZSBBdHRhY2tcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDcsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNjcmVlblN0YWdlID09IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpayA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LlVQKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlrID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuRE9XTilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JlZW5TdGFnZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIkVsZW1lbnRhbCBNb2RlXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiAtNSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIkZpcmUgYmVhdHMgSWNlLCBJY2UgYmVhdHMgVGh1bmRlciwgVGh1bmRlciBiZWF0cyBmaXJlXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiAtMik7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIlNhbWUgZWxlbWVudCA9IG5vIGRhbWFnZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogMCk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIkl0IGlzIGJlc3QgdG8gaGF2ZSBoYWQgc29tZSBleHBlcmllbmNlIHdpdGggdmFuaWxsYSBtb2RlXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiAxKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3ddIFN0YXJ0IEVsZW1lbnRhbCBNb2RlXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA0LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbc10gR28gYmFja1wiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNSwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlID49IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvL3N0cmluZyBtZXNzYWdlID0geW91V2luO1xyXG4gICAgICAgICAgICAvL2lmIChiYXR0bGVSZXN1bHQucmVzdWx0ID09IDIpIG1lc3NhZ2UgPSB5b3VMb3NlO1xyXG4gICAgICAgICAgICAvL3RleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKG1lc3NhZ2UsIENvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGUgPSAtMTtcclxuICAgICAgICAgICAgd2FubmFMZWF2ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCbGlua0FuaW0gOiBUZXh0QW5pbWF0aW9uPEJsaW5rQW5pbS5CbGlua0RhdGE+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBCbGlua0RhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgZmxvYXQgYXV4ID0gcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIGJvb2wgYmxpbmsgPSB0cnVlO1xyXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJsaW5rKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eCAtPSBtYWluRGF0YS5ibGlua0FjdGl2ZVRpbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4IC09IG1haW5EYXRhLmJsaW5rSW5hY3RpdmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXV4IDwgMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBibGluayA9ICFibGluaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWJsaW5rKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFpbkRhdGEuY2hhbmdlSW52aXNpYmxlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5BbmltYXRpb24uU2V0QWxsKG1haW5EYXRhLnRleHQsIG1haW5EYXRhLnRleHRDb2xvciwgbWFpbkRhdGEuYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5BbmltYXRpb24uU2V0QWxsSWZWaXNpYmxlKG1haW5EYXRhLnRleHQsIG1haW5EYXRhLnRleHRDb2xvciwgbWFpbkRhdGEuYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBCbGlua0RhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBjaGFyIHRleHQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgYmFja0NvbG9yLCB0ZXh0Q29sb3I7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBibGlua0FjdGl2ZVRpbWU7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBibGlua0luYWN0aXZlO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBjaGFuZ2VJbnZpc2libGU7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQmxpbmtEYXRhKGNoYXIgdGV4dCwgaW50IGJhY2tDb2xvciwgaW50IHRleHRDb2xvciwgZmxvYXQgYmxpbmtBY3RpdmVUaW1lLCBmbG9hdCBibGlua0luYWN0aXZlLCBib29sIGNoYW5nZU5vQ2hhbmdlQ29sb3IgPSB0cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrQ29sb3IgPSBiYWNrQ29sb3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb2xvciA9IHRleHRDb2xvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxpbmtBY3RpdmVUaW1lID0gYmxpbmtBY3RpdmVUaW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ibGlua0luYWN0aXZlID0gYmxpbmtJbmFjdGl2ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSW52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBCbGlua0RhdGEgQmFja0NvbG9yKGludCBiYWNrQ29sb3IsIGZsb2F0IGJsaW5rRHVyYXRpb24sIGJvb2wgY2hhbmdlTm9DaGFuZ2VDb2xvciA9IHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmxpbmtEYXRhKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIGJhY2tDb2xvciwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIGJsaW5rRHVyYXRpb24sIGJsaW5rRHVyYXRpb24sIGNoYW5nZU5vQ2hhbmdlQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIEJsaW5rRGF0YSBGcm9udENvbG9yKGludCBmcm9udENvbG9yLCBmbG9hdCBibGlua0R1cmF0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJsaW5rRGF0YShUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgZnJvbnRDb2xvciwgIGJsaW5rRHVyYXRpb24sIGJsaW5rRHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIEJsaW5rRGF0YSBDaGFyKGNoYXIgYywgZmxvYXQgYmxpbmtEdXJhdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCbGlua0RhdGEoYywgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBibGlua0R1cmF0aW9uLCBibGlua0R1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENoYXJCeUNoYXJBbmltYXRpb24gOiBUZXh0QW5pbWF0aW9uPENoYXJCeUNoYXJBbmltYXRpb24uQ2hhckJ5Q2hhckRhdGE+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBDaGFyQnlDaGFyRGF0YSBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGEsIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICBmbG9hdCByYXRpbyA9IHByb2dyZXNzIC8gbGVuZ3RoO1xyXG4gICAgICAgICAgICBmbG9hdCBsZW5ndGhUZXh0ID0gbWFpbkRhdGEuY2hhckVuZCAtIG1haW5EYXRhLmNoYXJTdGFydDtcclxuICAgICAgICAgICAgaW50IGxpbmVCcmVha3MgPSAwO1xyXG4gICAgICAgICAgICBpbnQgb2Zmc2V0ZWRQZXJtID0gMDtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IG1haW5EYXRhLmNoYXJTdGFydDsgaSA8IG1haW5EYXRhLmNoYXJFbmQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IG9mZnNldGVkID0gaSArIG9mZnNldGVkUGVybTtcclxuICAgICAgICAgICAgICAgIGludCBsaW5lID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciB0YiA9IGVudGl0eS5BbmltYXRpb247XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0ZWQgPj0gdGIuV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldGVkIC09IHRiLldpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGVudGl0eS5PcmlnaW4uQ2hhckF0KG9mZnNldGVkLCBsaW5lICsgbGluZUJyZWFrcykgPT0gJ1xcbicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUJyZWFrcysrO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldGVkUGVybSAtPSBvZmZzZXRlZDtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+ICgobGVuZ3RoVGV4dCAqIHJhdGlvKSArIG1haW5EYXRhLmNoYXJTdGFydCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGIuRHJhd0NoYXIoJyAnLCBvZmZzZXRlZCwgbGluZSArIGxpbmVCcmVha3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGIuRHJhdyhcIlwiICsgaSwgNiwgNSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIENoYXJCeUNoYXJEYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBpbnQgY2hhclN0YXJ0O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBpbnQgY2hhckVuZDtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBDaGFyQnlDaGFyRGF0YShpbnQgY2hhclN0YXJ0LCBpbnQgY2hhckVuZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFyU3RhcnQgPSBjaGFyU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJFbmQgPSBjaGFyRW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K
