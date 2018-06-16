/**
 * @version 1.0.0.0
 * @author UNITCOM PC
 * @copyright Copyright © UNITCOM PC 2018
 * @compiler Bridge.NET 17.0.0
 */
Bridge.assembly("BridgeBuild", function ($asm, globals) {
    "use strict";

    Bridge.define("BridgeBuild.App", {
        main: function Main () {
            BridgeBuild.App.TestEntitySystem();
            //Console.WriteLine("Game Start");
            BridgeBuild.App.SetupGame(Bridge.ref(BridgeBuild.App, "gr"), Bridge.ref(BridgeBuild.App, "TextBoard"));
            BridgeBuild.App.colors = System.Array.init(20, null, System.String);
            for (var i = 0; i < BridgeBuild.App.colors.length; i = (i + 1) | 0) {
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
                last: null
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
                    var now = System.DateTime.getNow();
                    var secs = (System.DateTime.subdd(now, BridgeBuild.App.last)).getTotalSeconds();
                    if (secs > 0.08) {
                        System.Console.WriteLine(System.Double.format(secs));
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

                    //Script.Call("clear");
                    for (var j = 0; j < BridgeBuild.App.TextBoard.Height; j = (j + 1) | 0) {
                        for (var i = 0; i < BridgeBuild.App.TextBoard.Width; i = (i + 1) | 0) {
                            if (!BridgeBuild.App.aux.SameAs(BridgeBuild.App.TextBoard, i, j)) {
                                draw(i, j, BridgeBuild.App.colors[System.Array.index(BridgeBuild.App.TextBoard.TextColor.get([i, j]), BridgeBuild.App.colors)], BridgeBuild.App.colors[System.Array.index(BridgeBuild.App.TextBoard.BackColor.get([i, j]), BridgeBuild.App.colors)], "" + String.fromCharCode(BridgeBuild.App.TextBoard.CharAt(i, j)));
                                BridgeBuild.App.aux.Copy(BridgeBuild.App.TextBoard, i, j);
                            } else {
                                //Script.Call("draw", i, j, colors[TextBoard.TextColor[i, j]], colors[TextBoard.BackColor[i, j]], "x");
                            }


                        }
                    }

                    window.setTimeout(BridgeBuild.App.UpdateGame, 15);
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
                return (Bridge.is(obj, Pidroh.BaseUtils.Point2D)) ? this.equalsT(System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj), Pidroh.BaseUtils.Point2D))) : false;
            },
            getHashCode: function () {
                return this.X ^ this.Y;
            },
            toString: function () {
                return System.String.format("{{X:{0} Y:{1}}}", Bridge.box(this.X, System.Int32), Bridge.box(this.Y, System.Int32));
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
                return (Bridge.is(obj, Pidroh.BaseUtils.Rect)) ? Pidroh.BaseUtils.Rect.op_Equality(this, System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj), Pidroh.BaseUtils.Rect))) : false;
            },
            toString: function () {
                return System.String.format("{{X:{0} Y:{1} Width:{2} Height:{3}}}", Bridge.box(this.X, System.Int32), Bridge.box(this.Y, System.Int32), Bridge.box(this.Width, System.Int32), Bridge.box(this.Height, System.Int32));
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
                Uparrow2: 0,
                Downarrow2: 0,
                Rightarrow2: 0,
                Leftarrow2: 0,
                Uparrow: 0,
                Downarrow: 0,
                Leftarrow: 0,
                Rightarrow: 0
            },
            ctors: {
                init: function () {
                    this.Space = 32;
                    this.Uparrow2 = 24;
                    this.Downarrow2 = 25;
                    this.Rightarrow2 = 26;
                    this.Leftarrow2 = 27;
                    this.Uparrow = 30;
                    this.Downarrow = 31;
                    this.Leftarrow = 17;
                    this.Rightarrow = 16;
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

                var other = System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj), Pidroh.BaseUtils.Vector3D));
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
                        l.System$Collections$IList$removeAt(i);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }}
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.AsyncTrack");

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleBasicConfig", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.ConsoleApp.Turnbased.BattleBasicConfig(); }
            }
        },
        fields: {
            nEnemies: 0,
            nTurns: 0
        },
        ctors: {
            $ctor1: function (nEnemies, nTurns) {
                this.$initialize();
                this.nEnemies = nEnemies;
                this.nTurns = nTurns;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([6484434679, this.nEnemies, this.nTurns]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.ConsoleApp.Turnbased.BattleBasicConfig)) {
                    return false;
                }
                return Bridge.equals(this.nEnemies, o.nEnemies) && Bridge.equals(this.nTurns, o.nTurns);
            },
            $clone: function (to) {
                var s = to || new Pidroh.ConsoleApp.Turnbased.BattleBasicConfig();
                s.nEnemies = this.nEnemies;
                s.nTurns = this.nTurns;
                return s;
            }
        }
    });

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
            $ctor1: function (enemiesToSummon) {
                this.$initialize();
                this.enemiesToSummon.AddRange(enemiesToSummon);
            },
            ctor: function (needKillAllEnemies) {
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
                    battleConfig = new Pidroh.ConsoleApp.Turnbased.BattleConfig.ctor(true);
                }
                this.BattleConfig = battleConfig;

            },
            IsVictory: function () {
                return this.battleResult.result === 1;
            },
            BasicConfig: function (basicConfig) {
                this.battleState.turnsPerPhase.Val = basicConfig.nTurns;
                this.nEnemies = basicConfig.nEnemies;
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
                if (!heroAlive) {
                    this.battleResult.result = 2;

                } else if ((!enemyAlive || !this.BattleConfig.needKillAllEnemies) && !pickupObligatoryExist) {
                    this.battleResult.result = 1;
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
                var $t, $t1;
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
                        }this.inputs.Add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))), Pidroh.ConsoleApp.Turnbased.InputTags.MISC);
                        this.inputs.Add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))), Pidroh.ConsoleApp.Turnbased.InputTags.MISC);
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
            phase: 0
        },
        ctors: {
            init: function () {
                this.turn = new Pidroh.ConsoleApp.Turnbased.Value();
                this.turnsPerPhase = new Pidroh.ConsoleApp.Turnbased.Value();
                this.moveTick_Now = new Pidroh.ConsoleApp.Turnbased.Value();
                this.moveTick_Total = 0;
                this.actingEntity = 0;
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
                BackBattle: 0
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
            ctor: function (mode, battleBasicConfig, difficulty, ecs) {
                var $t, $t1;
                this.$initialize();
                this.ecs = ecs;
                this.timeStamp = new Pidroh.BaseUtils.TimeStamp();
                this.battleMain = new Pidroh.ConsoleApp.Turnbased.BattleMain(mode, ecs, this.timeStamp);
                var mcp = new Pidroh.ConsoleApp.Turnbased.MoveCreatorProg();

                var stages = ecs.QuickAccessor1(Pidroh.ConsoleApp.Turnbased.StageData);

                var fixedAttack = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.FixedAttackStage, stages.Entity(difficulty));
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
                var stage = stages.Comp1(difficulty);
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

                this.battleMain.BasicConfig(battleBasicConfig);
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
                        Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(i, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#1A1A1A";
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
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridEnemy, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#00468C";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#8C0023";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#66FFFF";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Enemy, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#D90036";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#666666";
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
                this.renderTexts = renderTexts;
                this.moveCreatorProg = moveCreatorProg;
                this.AddEnemy(this.Actions([this.Moves([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder])]), 2, "%");
                this.AddEnemy(this.Actions([this.Moves([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing])]), 3, "#");
                this.AddEnemy(this.Actions([this.Moves([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight])]), 6, "&");
                this.AddEnemy(this.Actions([Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Summon", Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))]), 45, "$");
                this.AddEnemy(this.Actions([Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))]), 3, "H");
                this.AddEnemy(this.Actions([Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))]), 3, "J");
                this.AddEnemy(this.Actions([Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))]), 3, "L");
                this.AddEnemy(this.Actions([Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))]), 3, "K");
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
                            ai.moves.add(new Pidroh.ConsoleApp.Turnbased.MoveUse(System.Nullable.getValue(Bridge.cast(Bridge.unbox(o), System.Int32))));
                            continue;
                        }
                        if (Bridge.is(o, System.String)) {
                            ai.moves.add(new Pidroh.ConsoleApp.Turnbased.MoveUse(this.moveCreatorProg.GetMoveId(Bridge.as(o, System.String))));
                            continue;
                        }
                        if (Bridge.is(o, System.Array.type(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))) {
                            $t1 = Bridge.getEnumerator(Bridge.as(o, System.Array.type(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)));
                            try {
                                while ($t1.moveNext()) {
                                    var item = $t1.Current;
                                    ai.moves.add(new Pidroh.ConsoleApp.Turnbased.MoveUse(item));
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
            ctor: function (area) {
                this.$initialize();
                this.area = area;
            },
            $ctor1: function (area, offset, mirroringX) {
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
            ctor: function (targetE, damageE, target, amount, superEffective, elementalBlock) {
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
            ctor: function (user) {
                this.$initialize();
                this.user = user;
            },
            $ctor1: function (user, target, element) {
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
            ctor: function (moveTo) {
                this.$initialize();
                this.moveTo = moveTo.$clone();
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
            ctor: function (tags) {
                this.$initialize();
                this.tags.AddRange(tags);
            },
            $ctor1: function (i) {
                this.$initialize();
                this.tags.add(i);
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

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Loop", {
        fields: {
            actions: null
        },
        ctors: {
            init: function () {
                this.actions = new (System.Collections.Generic.List$1(System.Object)).ctor();
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.MiscBattleInput", {
        $kind: "enum",
        statics: {
            fields: {
                Done: 0,
                Redo: 1
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
                    this.NewMoveData(moveLabels[System.Array.index(i, moveLabels)], new Pidroh.ConsoleApp.Turnbased.Condition(Pidroh.ConsoleApp.Turnbased.ConditionType.CanMove, Pidroh.ConsoleApp.Turnbased.Target.Self, directions[System.Array.index(i, directions)].$clone()), new Pidroh.ConsoleApp.Turnbased.MoveAction(Pidroh.ConsoleApp.Turnbased.Target.Self, directions[System.Array.index(i, directions)].$clone()), this.TagArray([Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Movement, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags)), Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.HeroInitial, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));
                    this.NewMoveTextRenderData(moveLabels[System.Array.index(i, moveLabels)], moveAbrev[System.Array.index(i, moveAbrev)]);
                }
                this.NewMoveData$1("Gun", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.None)]), this.TagArray([Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Shoot, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));
                this.NewMoveTextRenderData("Gun", "G");

                this.NewMoveData$1("Firegun", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.$ctor2(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire)]), this.TagArray([Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Shoot, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));
                this.NewMoveTextRenderData("Firegun", "FG");

                this.NewMoveData$1("Icegun", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.$ctor2(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice)]), this.TagArray([Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Shoot, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));
                this.NewMoveTextRenderData("Icegun", "IG");

                this.NewMoveData$1("Thundergun", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.$ctor2(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder)]), this.TagArray([Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Shoot, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));
                this.NewMoveTextRenderData("Thundergun", "TG");

                var area = this.AreaUser().RowForward(1, 3);
                this.NewMoveData$1("Icebomb", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.ctor(area, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.ctor(area, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice)]), this.TagArray([Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Bomb, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));
                this.NewMoveTextRenderData("Icebomb", "IB");

                this.NewMoveData$1("Thunderbomb", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.ctor(area, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.ctor(area, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder)]), this.TagArray([Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Bomb, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));
                this.NewMoveTextRenderData("Thunderbomb", "TB");

                this.NewMoveData$1("Summon", this.OneTickPerAction([Pidroh.ConsoleApp.Turnbased.SummonEntity.Enemy(0, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 0))]), this.TagArray([Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Summon, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));
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
                                this.CreateHapp(md, new Pidroh.ConsoleApp.Turnbased.HappMoveData.ctor(actorId), new Pidroh.ConsoleApp.Turnbased.HappMovementFail(actor.pos.$clone()));


                                this.battleMain.happManager.Add(new Pidroh.ConsoleApp.Turnbased.Happs.Happ(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag.MovementFail, Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag)))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(actorId)).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(actor.pos.X)).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(actor.pos.Y));

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
                            this.ecs.CreateEntityWithComponent(new Pidroh.ConsoleApp.Turnbased.SpawnData(enemyId, summonPos.$clone(), Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy));

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
                                happArea = new Pidroh.ConsoleApp.Turnbased.HappArea.$ctor1(area1, referenceUserOfArea1.pos.$clone(), mirroringX1);
                            }
                            var targetId = -1;
                            if (target1 != null) {
                                targetId = this.entities.indexOf(target1);
                            }
                            this.CreateHapp(md, happArea, new Pidroh.ConsoleApp.Turnbased.HappMoveData.$ctor1(userId, targetId, anim.element));

                            if (anim.target !== Pidroh.ConsoleApp.Turnbased.Target.None) {
                                this.happManager.Add(new Pidroh.ConsoleApp.Turnbased.Happs.Happ(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag.AttackHit, Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag)))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(this.entities.indexOf(target1))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(userId)).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(anim.element));
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
                var th = new Pidroh.ConsoleApp.Turnbased.HappTags.$ctor1(Pidroh.ConsoleApp.Turnbased.MiscHappTags.ChangeElement);
                Pidroh.ECS.ExtensionMethods.AddComponent$1(this.ecs.CreateEntityWithComponent$1(th, new Pidroh.ConsoleApp.Turnbased.HappMoveData.$ctor1(this.entities.indexOf(actor), -1, element)), this.timeStamp.GetSnap());
            },
            CreateHapp: function (md, comp1, comp2) {
                var th = new Pidroh.ConsoleApp.Turnbased.HappTags.ctor(md.tags);
                var e = this.ecs.CreateEntityWithComponent$1(th, this.timeStamp.GetSnap());
                if (comp1 != null) {
                    Pidroh.ECS.ExtensionMethods.AddComponent$1(e, comp1);
                }
                if (comp2 != null) {
                    Pidroh.ECS.ExtensionMethods.AddComponent$1(e, comp2);
                }
            },
            CreateHapp$1: function (tag, comp1, comp2) {
                var th = new Pidroh.ConsoleApp.Turnbased.HappTags.$ctor1(tag);
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

                        this.happManager.Add(new Pidroh.ConsoleApp.Turnbased.Happs.Happ(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag.DamageTaken, Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag)))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(targetId));
                    }
                }
                this.CreateHapp$1(Pidroh.ConsoleApp.Turnbased.MiscHappTags.Damage, new Pidroh.ConsoleApp.Turnbased.HappDamageData(target.element, dda.element, this.entities.indexOf(target), damage, superEffective, elementalBlock), null);
                if (target.life <= 0 && !superEffective) {
                    this.CreateHapp$1(Pidroh.ConsoleApp.Turnbased.MiscHappTags.Death, new Pidroh.ConsoleApp.Turnbased.HappMoveData.ctor(targetId), null);
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
            ctor: function (move) {
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
            ctor: function (necessaryForVictory) {
                this.$initialize();
                this.necessaryForVictory = necessaryForVictory;
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
            ctor: function (id, position, type) {
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
                        var pickup = new Pidroh.ConsoleApp.Turnbased.PickupInfo(true);
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
            $ctor1: function (spawns) {
                if (spawns === void 0) { spawns = []; }

                this.$initialize();
                this.enemySpawns.AddRange(spawns);
            },
            ctor: function (battleConfig, spawns) {
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
                this.Add$1([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1([this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(0, 0)), this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(2, 2))]).HideLifeUI(), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.ctor()]);
                this.Add$1([new Pidroh.ConsoleApp.Turnbased.StageData.ctor(new Pidroh.ConsoleApp.Turnbased.BattleConfig.ctor(false), [this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(2, 1)), this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(0, 2)), this.Enemy(4, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]).HideLifeUI(), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.ctor()]);
                this.Add$1([new Pidroh.ConsoleApp.Turnbased.StageData.ctor(new Pidroh.ConsoleApp.Turnbased.BattleConfig.ctor(false), [this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(2, 2)), this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(1, 2)), this.Pickup(0, new Pidroh.BaseUtils.Vector2D.$ctor2(0, 2)), this.Enemy(5, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 2))]), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.ctor()]);
                this.Add$1([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1([this.Enemy(6, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 0))]), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire)]);
                this.Add$1([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1([this.Enemy(4, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1))]), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire)]);
                this.Add$1([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1([this.Enemy(5, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1))]), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire)]);
                this.Add$1([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1([this.Enemy(5, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1)), this.Enemy(7, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 0))]), new Pidroh.ConsoleApp.Turnbased.FixedAttackStage.$ctor2([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder])]);
                this.Add([new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1([this.Enemy(0, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 0)), this.Enemy(0, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 2))]), new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1([this.Enemy(1, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 2)), this.Enemy(2, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]), new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1([this.Enemy(0, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1)), this.Enemy(1, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]), new Pidroh.ConsoleApp.Turnbased.StageData.$ctor1([this.Enemy(0, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 2)), this.Enemy(2, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 1)), this.Enemy(2, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]), new Pidroh.ConsoleApp.Turnbased.StageData.ctor(new Pidroh.ConsoleApp.Turnbased.BattleConfig.$ctor1(System.Array.init([1], System.Int32)), [this.Enemy(3, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1))])]);

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
                return new Pidroh.ConsoleApp.Turnbased.SpawnData(v, vector2D.$clone(), Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.pickup);
            },
            Enemy: function (v, vector2D) {
                return new Pidroh.ConsoleApp.Turnbased.SpawnData(v, vector2D.$clone(), Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy);
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
            accessors: null
        },
        ctors: {
            init: function () {
                this.comps = new (System.Collections.Generic.Dictionary$2(Function,System.Array.type(System.Object)))();
                this.entityIdMax = -1;
                this.accessors = new (System.Collections.Generic.List$1(Pidroh.ECS.Accessor)).ctor();
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
                        accessor.SelectedEntities.remove(entity);
                    }
                }


                //if (item.EntityAdded(e))
                //{
                //    continue;
                //}
                //else
                //{
                //    if (HasAllComponents(e, item.TypesNecessary))
                //    {
                //        item.SelectedEntities.Add(e);
                //    }
                //}

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
                return Bridge.cast(Bridge.unbox(($t = this.comps.get(type))[System.Array.index(e.id, $t)]), T);
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
                        this.EndTask(i);
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

                        l.System$Collections$IList$removeAt(i);
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
            Modify: function (entity, index, progress, length) { }
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
            Draw_Cursor$3: function (v, color) {
                var $t;
                $t = Bridge.getEnumerator(v);
                try {
                    while ($t.moveNext()) {
                        var c = $t.Current;
                        this.Draw_Cursor$1(c, color);
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
            Draw_Cursor$1: function (c, color) {

                this.DrawChar$1(c, this.cursorX, this.cursorY, color);
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

                this.DrawRepeated(179, x, y, 1, height, color);
                this.DrawRepeated(179, ((((x + width) | 0) - 1) | 0), y, 1, height, color);
                this.DrawRepeated(196, x, y, width, 1, color);
                this.DrawRepeated(196, x, ((((y + height) | 0) - 1) | 0), width, 1, color);

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
            highestHandled: 0
        },
        ctors: {
            init: function () {
                this.handlers = new (System.Collections.Generic.List$1(Pidroh.TurnBased.TextRendering.HappHandling.HappHandler)).ctor();
            },
            ctor: function (battleRender, battleSetup) {
                this.$initialize();
                this.battleRender = battleRender;
                var world = battleRender.textWorld;
                var posAnim = world.AddAnimation(Bridge.global.Pidroh.TextRendering.PositionAnimation, new Pidroh.TextRendering.PositionAnimation());
                var blinkAnim = world.AddAnimation(Bridge.global.Pidroh.TextRendering.BlinkAnim, new Pidroh.TextRendering.BlinkAnim());
                this.ecs = battleSetup.ecs;
                var battleMain = battleSetup.battleMain;
                var time = battleSetup.timeStamp;
                battleRender.HappHandling = this;
                this.happs = this.ecs.QuickAccessor2(Pidroh.ConsoleApp.Turnbased.HappTags, Pidroh.BaseUtils.TimeStampSnap);
                this.highestHandled = -1;

                this.handlers.add(new Pidroh.TurnBased.TextRendering.HappHandling.HappHandler(function (e) {
                    var damage = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.HappDamageData, e);
                    var message;
                    if (damage.elementalBlock) {
                        message = System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.Element, damage.damageE) + " absorbs " + System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.Element, damage.targetE) + "\n";
                        message = (message || "") + (((battleRender.GetEntityName(damage.target) || "") + " is unafectted.") || "");
                    } else {

                        //message = battleRender.GetEntityName(damage.target) + " gets hit!";
                        if (damage.superEffective) {
                            message = System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.Element, damage.damageE) + " ravages " + System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.Element, damage.targetE) + "\n";
                            message = (message || "") + (((battleRender.GetEntityName(damage.target) || "") + " takes a heavy hit!") || "");
                            {
                                var pos = battleRender.BattleEntityToScreenPosition(battleMain.entities.getItem(damage.target).pos.$clone());
                                var blast = battleRender.textWorld.GetTempEntity(5, 5);
                                blast.SetPosition(Pidroh.BaseUtils.Vector2D.op_Addition(pos.$clone(), new Pidroh.BaseUtils.Vector2D.$ctor2(-2, -2)));

                                blast.Origin.DrawRepeated(32, 1, 1, 3, 3, Pidroh.TextRendering.TextBoard.INVISIBLECOLOR, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Enemy);
                                blinkAnim.Add$1(blast.AnimBase(0.2), Pidroh.TextRendering.BlinkAnim.BlinkData.BackColor(Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToProjColor(damage.damageE), 0.05));
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

                }, [Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscHappTags.Damage, Pidroh.ConsoleApp.Turnbased.MiscHappTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscHappTags))]));
                this.handlers.add(new Pidroh.TurnBased.TextRendering.HappHandling.HappHandler(function (e) {
                    var hmd = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.HappMoveData, e);

                    battleRender.ShowBattleMessage((battleRender.GetEntityName(hmd.user) || "") + " is emitting " + System.Enum.toString(Pidroh.ConsoleApp.Turnbased.BattleMain.Element, hmd.element));
                    //Console.Write("CHANGE ELE");

                }, [Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscHappTags.ChangeElement, Pidroh.ConsoleApp.Turnbased.MiscHappTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscHappTags))]));
                this.handlers.add(new Pidroh.TurnBased.TextRendering.HappHandling.HappHandler(function (e) {
                    var hmd = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.HappMoveData, e);
                    //var defender = battleRender.battlerRenders[hmd.target];
                    var pos = battleRender.BattleEntityToScreenPosition(battleMain.entities.getItem(hmd.user).pos.$clone());
                    var blast = battleRender.textWorld.GetTempEntity(3, 3);
                    blast.SetPosition(Pidroh.BaseUtils.Vector2D.op_Addition(pos.$clone(), new Pidroh.BaseUtils.Vector2D.$ctor2(-1, -1)));

                    blast.Origin.DrawRepeated(32, 1, 1, 1, 1, Pidroh.TextRendering.TextBoard.INVISIBLECOLOR, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Enemy);
                    blinkAnim.Add$1(blast.AnimBase(0.2), Pidroh.TextRendering.BlinkAnim.BlinkData.BackColor(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero, 0.05));
                    //Console.Write("CHANGE ELE");

                }, [Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscHappTags.Death, Pidroh.ConsoleApp.Turnbased.MiscHappTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscHappTags))]));
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
                this.handlers.add(new Pidroh.TurnBased.TextRendering.HappHandling.HappHandler(moveMiss, [Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Movement, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));

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
                    }}, [Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Bomb, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));
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
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), 103);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), 102);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), 105);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), 98);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), 121);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), 116);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), 100);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), 119);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), 115);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), 97);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))), Pidroh.BaseUtils.Unicode.Space);
                        _o1.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))), 114);
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
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(Pidroh.ConsoleApp.Turnbased.MiscBattleInput,System.String))());
                this.debugOn = true;
                this.inputH = new Pidroh.TurnBased.TextRendering.InputHandling();
            },
            ctor: function (battleLogic, stageData) {
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

                this.turnBaseTry.happManager.AddHandler(new Pidroh.ConsoleApp.Turnbased.Happs.HappHandler(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag.AttackHit, Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag)), Bridge.fn.bind(this, function (h) {
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

                this.turnBaseTry.happManager.AddHandler(new Pidroh.ConsoleApp.Turnbased.Happs.HappHandler(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag.AttackMiss, Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag)), Bridge.fn.bind(this, function (h) {

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
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "F");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "I");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "T");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "G");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), String.fromCharCode(Pidroh.BaseUtils.Unicode.Rightarrow2) + "");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), String.fromCharCode(Pidroh.BaseUtils.Unicode.Uparrow2) + "");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), String.fromCharCode(Pidroh.BaseUtils.Unicode.Downarrow2) + "");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), String.fromCharCode(Pidroh.BaseUtils.Unicode.Leftarrow2) + "");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "IB");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "TB");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.SummonEntity, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "SU");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), " ");
                        return _o2;
                    }(new (System.Collections.Generic.Dictionary$2(System.Object,System.String))());

                this.moveDescriptions = function (_o3) {
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Ice Shot");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Fire Shot");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Thunder Shot");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Ice Bomb");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Gun");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), String.fromCharCode(Pidroh.BaseUtils.Unicode.Rightarrow2) + "");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), String.fromCharCode(Pidroh.BaseUtils.Unicode.Uparrow2) + "");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), String.fromCharCode(Pidroh.BaseUtils.Unicode.Downarrow2) + "");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), String.fromCharCode(Pidroh.BaseUtils.Unicode.Leftarrow2) + "");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Thunder Bomb");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.SummonEntity, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Summon");
                        return _o3;
                    }(new (System.Collections.Generic.Dictionary$2(System.Object,System.String))());




                //Console.ReadLine();
            }
        },
        methods: {
            UpdateBattleRenderCount: function () {
                while (this.battlerRenders.Count < this.turnBaseTry.entities.Count) {
                    this.battlerRenders.add(this.textWorld.GetFreeEntity(2, 2));
                }
            },
            GetEntityName: function (user) {
                var gameEntity = this.turnBaseTry.entities.getItem(user);
                var chars = this.GetChar(gameEntity);
                return (System.String.fromCharArray(chars) || "") + (((gameEntity.graphicRepeatedIndex + 1) | 0));
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
                if (this.CanAdvance_Logic()) {
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
                this.UpdateBattleRenderCount();
                this.DrawGraphics(delta);

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

                var controlsY = (((((Bridge.Int.mul(this.gridScale, 3) + 10) | 0) + 3) | 0) + 4) | 0;
                this.gridScale = 5;
                this.gridOffsetx = 2;
                this.gridOffsety = 1;
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
                        this.posAnim.Add$1(this.battlerRenders.getItem(i1).AnimBase(0.15), new Pidroh.TextRendering.PositionAnimation.PositionData.$ctor1(this.battlerRenders.getItem(i1).Origin.Position.$clone(), screenPos.$clone(), true));
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
                        bc = Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToAuraColor(element);

                    }
                    if (gameEntity.Dead) {
                        for (var j1 = 0; j1 < ((ec.length + 1) | 0); j1 = (j1 + 1) | 0) {
                            this.battlerRenders.getItem(i1).Origin.DrawChar$1(Pidroh.TextRendering.TextBoard.INVISIBLECHAR, j1, 0, c, bc);
                        }

                    } else {
                        this.battlerRenders.getItem(i1).Origin.Draw(ec, 0, 0, c, bc);
                        this.battlerRenders.getItem(i1).Origin.DrawOneDigit(((gameEntity.graphicRepeatedIndex + 1) | 0), ((0 + ec.length) | 0), 0, c, bc);
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
                turnOrderY = (Bridge.Int.mul(3, this.gridScale) + 2) | 0;

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
                            this.moveDescriptions.tryGetValue(Bridge.box(m, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), description);
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
                                this.moveDescriptions.tryGetValue(Bridge.box(m, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), description);
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
                this.TextBoard.Draw_Cursor$3("Life", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);
                this.TextBoard.SetCursorAt(((turnOrderX + 8) | 0), turnOrderY);
                this.TextBoard.Draw_Cursor$3("Element", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);
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
                this.TextBoard.Draw_Cursor$3("Commands", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);

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
                            if (drawingId === this.turnBaseTry.battleState.actingEntity && i2 === Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(this.turnBaseTry.battleState.turn) && this.turnBaseTry.battleState.phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ExecuteMove) {
                                color2 = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero;
                            }

                            if (i2 < Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(turnsPerPhase)) {
                                var c = this.GetCharOfMove(e, i2);
                                this.mouseHover.mouseHovers.add(new Pidroh.TextRendering.GameScreen.MouseHover.$ctor1(new Pidroh.BaseUtils.Rect.$ctor1(this.TextBoard.CursorX, this.TextBoard.CursorY, c.length, 1), 0, e.moves[System.Array.index(i2, e.moves)])); //add here...? @_@
                                this.TextBoard.Draw_Cursor$3(c, color2);
                                if (horizontal) {
                                    for (var j = c.length; j < 3; j = (j + 1) | 0) {
                                        this.TextBoard.AdvanceCursor();
                                    }

                                }

                                //TextBoard.Draw_Cursor(' ');
                            } else {
                                this.TextBoard.Draw_Cursor$1(32, color);
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
                //if (e.graphicRepeatedIndex > 0)
                {
                    this.TextBoard.DrawOneDigit(((e.graphicRepeatedIndex + 1) | 0), ((x + chars.length) | 0), y, color);
                }
            },
            GetCharOfMove: function (e, i2) {


                var val = e.moves[System.Array.index(i2, e.moves)];
                if (val >= 0) {
                    return this.moveChars.get(Bridge.box(Bridge.Int.clip32(val), Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)));
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
                var c = this.moveChars.get(Bridge.box(move, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)));
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
            difficulty: 0,
            enemyAmount: null,
            turnAmount: null,
            mouseHover: null,
            Mouse: null
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

                var d = this.difficulty;
                if (stages.Count <= d) {
                    this.mainDraw = this.modeSelectionScreen;
                    this.modeSelectionScreen.Reset();
                    this.difficulty = 0;
                    return;
                }
                //d = 200;
                if (d >= this.enemyAmount.length) {
                    d = (this.enemyAmount.length - 1) | 0;
                }
                var nEnemies = this.enemyAmount[System.Array.index(d, this.enemyAmount)];

                var battleSetup = new Pidroh.ConsoleApp.Turnbased.BattleSetup(mode, new Pidroh.ConsoleApp.Turnbased.BattleBasicConfig.$ctor1(nEnemies, 5), this.difficulty, ecs);
                this.battleMain = battleSetup.battleMain;


                //ecs.CreateEntityWithComponent(new EnemySpawnData(0, new BaseUtils.Vector2D(4, 1)));
                //ecs.CreateEntityWithComponent(new EnemySpawnData(1, new BaseUtils.Vector2D(5, 1)));


                var timeToChoose = -1;
                if (timeAttack) {
                    timeToChoose = (5.0 * this.turnAmount[System.Array.index(d, this.turnAmount)]) * nEnemies;

                }
                this.battleMain.timeToChooseMax = timeToChoose;
                this.battleMain.Init();
                this.battleRender = new Pidroh.ConsoleApp.Turnbased.BattleRender(this.battleMain, stages.Comp1(this.difficulty));
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
                            this.difficulty = (this.difficulty + 1) | 0;
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
                BackColor: function (backColor, blinkDuration) {
                    return new Pidroh.TextRendering.BlinkAnim.BlinkData.$ctor1(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, backColor, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, blinkDuration, blinkDuration);
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
            blinkInactive: 0
        },
        ctors: {
            $ctor1: function (text, backColor, textColor, blinkActiveTime, blinkInactive) {
                this.$initialize();
                this.text = text;
                this.backColor = backColor;
                this.textColor = textColor;
                this.blinkActiveTime = blinkActiveTime;
                this.blinkInactive = blinkInactive;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3804934414, this.text, this.backColor, this.textColor, this.blinkActiveTime, this.blinkInactive]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.TextRendering.BlinkAnim.BlinkData)) {
                    return false;
                }
                return Bridge.equals(this.text, o.text) && Bridge.equals(this.backColor, o.backColor) && Bridge.equals(this.textColor, o.textColor) && Bridge.equals(this.blinkActiveTime, o.blinkActiveTime) && Bridge.equals(this.blinkInactive, o.blinkInactive);
            },
            $clone: function (to) {
                var s = to || new Pidroh.TextRendering.BlinkAnim.BlinkData();
                s.text = this.text;
                s.backColor = this.backColor;
                s.textColor = this.textColor;
                s.blinkActiveTime = this.blinkActiveTime;
                s.blinkInactive = this.blinkInactive;
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
                    entity.Animation.SetAll(mainData.text, mainData.textColor, mainData.backColor);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VCdWlsZC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvRXh0ZW5zaW9ucy5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1BvaW50LmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvUmFuZG9tU3VwcGxpZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9SZWN0YW5nbGUuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9UaW1lU3RhbXAuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9Vbmljb2RlLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvVmVjdG9yMkQuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9WZWN0b3IzRC5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL01vdmVEYXRhLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9Bc3luY1Rhc2tzLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvQmF0dGxlTWFpbi5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0JhdHRsZVNldHVwLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9Db2xvclN0dWZmLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvRGVidWdFeHRyYS9EZWJ1Z0V4LmNzIiwiLi4vVHVybkJhc2VkTG9naWMvRUNTSW50ZWdyYXRpb24uY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9FbmVteUFJLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvU3Bhd25GYWN0b3J5LmNzIiwiLi4vVHVybkJhc2VkTG9naWMvRW5lbXlEYXRhQ3JlYXRvci5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL1N0YWdlRGF0YS5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL01vdmVEYXRhRXhlY3V0ZXIuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9IYXBwcy9IYXBwLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvSW5wdXRIb2xkZXIuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9Nb3ZlQ3JlYXRvclByb2cuY3MiLCIuLi8uLi9WaXN1YWxTdHVkaW9Tb2x1dGlvblJtay9FQ1MvQWNjZXNzb3IuY3MiLCIuLi8uLi9WaXN1YWxTdHVkaW9Tb2x1dGlvblJtay9FQ1MvRUNTTWFuYWdlci5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9FbnRpdHkuY3MiLCIuLi8uLi9WaXN1YWxTdHVkaW9Tb2x1dGlvblJtay9FQ1MvUHJvY2Vzc29yRmxleC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL1RleHRXb3JsZC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL1BhbGV0dGUuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9HYW1lU2NyZWVuL01vdXNlSG92ZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9UZXh0Qm9hcmQuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9HYW1lU2NyZWVuL0lUZXh0U2NyZWVuTi5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvSGFwcEhhbmRsaW5nLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9JbnB1dEhhbmRsaW5nLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9Nb3VzZUhvdmVyVGV4dC5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvQmF0dGxlUmVuZGVyLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9HYW1lTWFpbi5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvUmVzdWx0U2NyZWVuLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvR2FtZVNjcmVlbi9UZXN0R2FtZS5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvTW9kZVNlbGVjdGlvblNjcmVlbi5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL0JsaW5rQW5pbWF0aW9uLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvQ2hhckJ5Q2hhckFuaW1hdGlvbi5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7WUE0Q1lBOztZQUVBQSxxQ0FBY0EsbUNBQVFBO1lBQ3RCQSx5QkFBU0E7WUFDVEEsS0FBS0EsV0FBV0EsSUFBSUEsK0JBQWVBO2dCQUUvQkEsMENBQU9BLEdBQVBBLDJCQUFZQSxpRUFBa0JBLEdBQWxCQTs7Ozs7WUFLaEJBLFlBQVlBO1lBQ1pBLGtCQUFrQkE7WUFDbEJBLDBCQUEwQkE7WUFDMUJBO1lBQ0FBOzs7O1lBSUFBLDZEQUF1QkEsVUFBQ0E7O2dCQUdwQkEsV0FBV0E7Z0JBQ1hBLElBQUlBO29CQUFXQSxPQUFPQTs7Z0JBQ3RCQSxjQUFjQTtnQkFDZEEsZ0NBQWdCQTs7Ozs7O1lBTXBCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5Q0FyRCtCQTtnQ0FFWkE7Ozs7cUNBRU9BLElBQWlCQTs7b0JBRzNDQSxVQUFhQSxJQUFJQTtvQkFDakJBLDJDQUEwQkE7d0JBRXRCQSxPQUFPQSxBQUFPQTs7b0JBRWxCQSxPQUFLQSxJQUFJQTtvQkFDVEEsY0FBWUE7b0JBQ1pBLHNCQUFNQSxJQUFJQTs7Ozs7OztvQkE2RFZBLFVBQWVBO29CQUNmQSxXQUFXQSxDQUFDQSwyQkFBTUE7b0JBQ2xCQSxJQUFJQTt3QkFDQUEsOENBQWtCQTt3QkFDbEJBOzs7b0JBR0pBLDRCQUFZQTtvQkFDWkEsd0JBQVFBLEFBQU9BO29CQUNmQSx1QkFBT0E7b0JBQ1BBLGtDQUFrQkE7b0JBQ2xCQSxnQ0FBZ0JB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bUJBLG9CQUFtQkE7Z0JBQ3RDQTtnQkFDQUE7Z0JBQ0FBLEtBQUtBLFFBQVFBLG9CQUFvQkEsSUFBSUEsa0JBQWtCQTtvQkFFbkRBLGVBQWVBLEtBQUlBO29CQUNuQkE7b0JBQ0FBLFNBQVNBOzs7b0JBR1RBLE9BQU9BLFlBQVlBO3dCQUVmQTt3QkFDQUEsdUJBQVlBOztvQkFFaEJBLElBQUlBLHFCQUFxQkEsVUFBVUEsU0FBT0E7d0JBRXRDQTt3QkFDQUEsK0JBQWdCQTt3QkFDaEJBOztvQkFFSkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsYUFBYUEsU0FBU0E7d0JBRTVCQSxnQkFBaUJBLFVBQVVBLFNBQU9BOzs7Ozs7Ozs7Ozs7Z0Nkb0psQkEsUUFBbUJBLFVBQXVCQSxVQUFnQkE7Z0JBRWxGQSx3SEFBWUEsUUFBUUEsVUFBVUEsVUFBVUE7Z0JBQ3hDQSxhQUFtQkE7Z0JBQ25CQSxJQUFJQTtvQkFDQUEsU0FBU0E7O2dCQUNiQSxrQkFBa0JBLDZDQUE0QkEsaUNBQXdCQSwrQkFBc0JBLFdBQVdBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG4vL3VzaW5nIEVDUztcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG51c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG4vL3VzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2VCdWlsZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IGJ1ZmZlcjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIGJ1ZmZlck9uO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgSFRNTFByZUVsZW1lbnQgdGV4dDtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBHYW1lTWFpbiBncjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBUZXh0Qm9hcmQgVGV4dEJvYXJkO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgU3RyaW5nQnVpbGRlciBzYjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmdbXSBjb2xvcnM7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IGJ1ZmZlclVuaWNvZGUgPSAtMTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBUZXh0Qm9hcmQgYXV4O1xyXG4gICAgICAgIHN0YXRpYyBEYXRlVGltZSBsYXN0ID0gRGF0ZVRpbWUuTm93O1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFNldHVwR2FtZShvdXQgR2FtZU1haW4gZ3IsIG91dCBUZXh0Qm9hcmQgVGV4dEJvYXJkKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIFJhbmRvbSBybmQgPSBuZXcgUmFuZG9tKCk7XHJcbiAgICAgICAgICAgIFJhbmRvbVN1cHBsaWVyLkdlbmVyYXRlID0gKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChmbG9hdClybmQuTmV4dERvdWJsZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBnciA9IG5ldyBHYW1lTWFpbigpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQgPSBnci5HZXRCb2FyZCgpO1xyXG4gICAgICAgICAgICBhdXggPSBuZXcgVGV4dEJvYXJkKDMwMCwzMDApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGVzdEVudGl0eVN5c3RlbSgpO1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiR2FtZSBTdGFydFwiKTtcclxuICAgICAgICAgICAgU2V0dXBHYW1lKG91dCBnciwgb3V0IFRleHRCb2FyZCk7XHJcbiAgICAgICAgICAgIGNvbG9ycyA9IG5ldyBzdHJpbmdbMjBdO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvbG9ycy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sb3JzW2ldID0gQ29sb3JTdHVmZi5jb2xvcnNbaV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gbmV3IEhUTUxTdHlsZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgc3R5bGUuSW5uZXJIVE1MID0gXCJodG1sLGJvZHkge2ZvbnQtZmFtaWx5OiBDb3VyaWVyOyBiYWNrZ3JvdW5kLWNvbG9yOiMxZjI1MjY7IGhlaWdodDogMTAwJTsgY29sb3I6Izg4ODt9XCIgKyBcIlxcbiAjY2FudmFzLWNvbnRhaW5lciB7d2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgdGV4dC1hbGlnbjpjZW50ZXI7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH0gXCI7XHJcbiAgICAgICAgICAgIERvY3VtZW50LkhlYWQuQXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG4gICAgICAgICAgICBidWZmZXIgPSA5O1xyXG4gICAgICAgICAgICBidWZmZXJPbiA9IGZhbHNlO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBEb2N1bWVudC5PbktleVByZXNzICs9IChLZXlib2FyZEV2ZW50IGEpID0+XHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnQgY29kZSA9IGEuS2V5Q29kZTtcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlID09IDApIGNvZGUgPSBhLkNoYXJDb2RlO1xyXG4gICAgICAgICAgICAgICAgaW50IHVuaWNvZGUgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyVW5pY29kZSA9IHVuaWNvZGU7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUodW5pY29kZSk7XHJcbiAgICAgICAgICAgICAgICAvL2J1ZmZlciA9IGEuQ2hhckNvZGU7XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgVXBkYXRlR2FtZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWZ0ZXIgYnVpbGRpbmcgKEN0cmwgKyBTaGlmdCArIEIpIHRoaXMgcHJvamVjdCwgXHJcbiAgICAgICAgICAgIC8vIGJyb3dzZSB0byB0aGUgL2Jpbi9EZWJ1ZyBvciAvYmluL1JlbGVhc2UgZm9sZGVyLlxyXG5cclxuICAgICAgICAgICAgLy8gQSBuZXcgYnJpZGdlLyBmb2xkZXIgaGFzIGJlZW4gY3JlYXRlZCBhbmRcclxuICAgICAgICAgICAgLy8gY29udGFpbnMgeW91ciBwcm9qZWN0cyBKYXZhU2NyaXB0IGZpbGVzLiBcclxuXHJcbiAgICAgICAgICAgIC8vIE9wZW4gdGhlIGJyaWRnZS9pbmRleC5odG1sIGZpbGUgaW4gYSBicm93c2VyIGJ5XHJcbiAgICAgICAgICAgIC8vIFJpZ2h0LUNsaWNrID4gT3BlbiBXaXRoLi4uLCB0aGVuIGNob29zZSBhXHJcbiAgICAgICAgICAgIC8vIHdlYiBicm93c2VyIGZyb20gdGhlIGxpc3RcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgYXBwbGljYXRpb24gd2lsbCB0aGVuIHJ1biBpbiBhIGJyb3dzZXIuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFRlc3RFbnRpdHlTeXN0ZW0oKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFVwZGF0ZUdhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGF0ZVRpbWUgbm93ID0gRGF0ZVRpbWUuTm93O1xyXG4gICAgICAgICAgICB2YXIgc2VjcyA9IChub3cgLSBsYXN0KS5Ub3RhbFNlY29uZHM7XHJcbiAgICAgICAgICAgIGlmIChzZWNzID4gMC4wOCkge1xyXG4gICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoc2Vjcyk7XHJcbiAgICAgICAgICAgICAgICBzZWNzID0gMC4wODtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFRleHRCb2FyZCA9IGdyLkdldEJvYXJkKCk7XHJcbiAgICAgICAgICAgIGdyLkRyYXcoKGZsb2F0KXNlY3MpO1xyXG4gICAgICAgICAgICBsYXN0ID0gbm93O1xyXG4gICAgICAgICAgICBnci5JbnB1dFVuaWNvZGUgPSBidWZmZXJVbmljb2RlO1xyXG4gICAgICAgICAgICBidWZmZXJVbmljb2RlID0gLTE7XHJcblxyXG4gICAgICAgICAgICB2YXIgbW91c2VYID0gU2NyaXB0LkNhbGw8aW50PihcImdldE1vdXNlWFwiKTtcclxuICAgICAgICAgICAgdmFyIG1vdXNlWSA9IFNjcmlwdC5DYWxsPGludD4oXCJnZXRNb3VzZVlcIik7XHJcbiAgICAgICAgICAgIGdyLk1vdXNlLnBvcyA9IG5ldyBQb2ludDJEKG1vdXNlWCwgbW91c2VZKTtcclxuXHJcbiAgICAgICAgICAgIC8vU2NyaXB0LkNhbGwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBUZXh0Qm9hcmQuSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgVGV4dEJvYXJkLldpZHRoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhdXguU2FtZUFzKFRleHRCb2FyZCwgeDogaSwgeTogaikpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTY3JpcHQuQ2FsbChcImRyYXdcIiwgaSwgaiwgY29sb3JzW1RleHRCb2FyZC5UZXh0Q29sb3JbaSwgal1dLCBjb2xvcnNbVGV4dEJvYXJkLkJhY2tDb2xvcltpLCBqXV0sIFwiXCIgKyBUZXh0Qm9hcmQuQ2hhckF0KGksIGopKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV4LkNvcHkoVGV4dEJvYXJkLCB4OiBpLCB5OiBqKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TY3JpcHQuQ2FsbChcImRyYXdcIiwgaSwgaiwgY29sb3JzW1RleHRCb2FyZC5UZXh0Q29sb3JbaSwgal1dLCBjb2xvcnNbVGV4dEJvYXJkLkJhY2tDb2xvcltpLCBqXV0sIFwieFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBXaW5kb3cuU2V0VGltZW91dCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKVVwZGF0ZUdhbWUsIDE1KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEV4dGVuc2lvbnNcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSYW5kb20gcm5nID0gbmV3IFJhbmRvbSgpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU2h1ZmZsZTxUPih0aGlzIElMaXN0PFQ+IGxpc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbiA9IGxpc3QuQ291bnQ7XHJcbiAgICAgICAgICAgIHdoaWxlIChuID4gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbi0tO1xyXG4gICAgICAgICAgICAgICAgaW50IGsgPSBybmcuTmV4dChuICsgMSk7XHJcbiAgICAgICAgICAgICAgICBUIHZhbHVlID0gbGlzdFtrXTtcclxuICAgICAgICAgICAgICAgIGxpc3Rba10gPSBsaXN0W25dO1xyXG4gICAgICAgICAgICAgICAgbGlzdFtuXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIiNyZWdpb24gTGljZW5zZVxyXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5Db3B5cmlnaHQgwqkgMjAwNiBUaGUgTW9uby5YbmEgVGVhbVxyXG5cclxuQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblNPRlRXQVJFLlxyXG4qL1xyXG4jZW5kcmVnaW9uIExpY2Vuc2VcclxudXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgcHVibGljIHN0cnVjdCBQb2ludDJEIDogSUVxdWF0YWJsZTxQb2ludDJEPlxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUG9pbnQyRCB6ZXJvUG9pbnQgPSBuZXcgUG9pbnQyRCgpO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgcHVibGljIGludCBYO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgWTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQb2ludDJEIFplcm9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB6ZXJvUG9pbnQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJvcGVydGllc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcbiAgICAgICAgcHVibGljIFBvaW50MkQoaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0geDtcclxuICAgICAgICAgICAgdGhpcy5ZID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBtZXRob2RzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShQb2ludDJEIGEsIFBvaW50MkQgYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLkVxdWFscyhiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciAhPShQb2ludDJEIGEsIFBvaW50MkQgYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAhYS5FcXVhbHMoYik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBFcXVhbHMoUG9pbnQyRCBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKFggPT0gb3RoZXIuWCkgJiYgKFkgPT0gb3RoZXIuWSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKG9iaiBpcyBQb2ludDJEKSA/IEVxdWFscygoUG9pbnQyRClvYmopIDogZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBYIF4gWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJ7e1g6ezB9IFk6ezF9fX1cIiwgWCwgWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn1cclxuXHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIHN0YXRpYyBwdWJsaWMgY2xhc3MgUmFuZG9tU3VwcGxpZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIEZ1bmM8ZmxvYXQ+IEdlbmVyYXRleyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBSYW5nZShpbnQgbWluLCBpbnQgbWF4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KSAoR2VuZXJhdGUoKSAqIChtYXgtbWluKSttaW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUIFJhbmRvbUVsZW1lbnQ8VD4oVFtdIGFycmF5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5W1JhbmdlKDAsIGFycmF5Lkxlbmd0aCldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIjcmVnaW9uIExpY2Vuc2VcclxuLypcclxuTUlUIExpY2Vuc2VcclxuQ29weXJpZ2h0IMKpIDIwMDYgVGhlIE1vbm8uWG5hIFRlYW1cclxuXHJcbkFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cclxuI2VuZHJlZ2lvbiBMaWNlbnNlXHJcblxyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5HbG9iYWxpemF0aW9uO1xyXG51c2luZyBTeXN0ZW0uQ29tcG9uZW50TW9kZWw7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcblxyXG4gICAgcHVibGljIHN0cnVjdCBSZWN0IDogSUVxdWF0YWJsZTxSZWN0PlxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmVjdCBlbXB0eVJlY3RhbmdsZSA9IG5ldyBSZWN0KCk7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFg7XHJcbiAgICAgICAgcHVibGljIGludCBZO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgV2lkdGg7XHJcbiAgICAgICAgcHVibGljIGludCBIZWlnaHQ7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFJlY3QgRW1wdHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBlbXB0eVJlY3RhbmdsZTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBMZWZ0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdGhpcy5YOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFJpZ2h0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKHRoaXMuWCArIHRoaXMuV2lkdGgpOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFRvcFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHRoaXMuWTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBCb3R0b21cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiAodGhpcy5ZICsgdGhpcy5IZWlnaHQpOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgUmVjdChpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHk7XHJcbiAgICAgICAgICAgIHRoaXMuV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5IZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oUmVjdCBhLCBSZWN0IGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKChhLlggPT0gYi5YKSAmJiAoYS5ZID09IGIuWSkgJiYgKGEuV2lkdGggPT0gYi5XaWR0aCkgJiYgKGEuSGVpZ2h0ID09IGIuSGVpZ2h0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKCgoKHRoaXMuWCA8PSB4KSAmJiAoeCA8ICh0aGlzLlggKyB0aGlzLldpZHRoKSkpICYmICh0aGlzLlkgPD0geSkpICYmICh5IDwgKHRoaXMuWSArIHRoaXMuSGVpZ2h0KSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ29udGFpbnMoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKCgoKHRoaXMuWCA8PSB2YWx1ZS5YKSAmJiAodmFsdWUuWCA8ICh0aGlzLlggKyB0aGlzLldpZHRoKSkpICYmICh0aGlzLlkgPD0gdmFsdWUuWSkpICYmICh2YWx1ZS5ZIDwgKHRoaXMuWSArIHRoaXMuSGVpZ2h0KSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ29udGFpbnMoUG9pbnQyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKCgodGhpcy5YIDw9IHZhbHVlLlgpICYmICh2YWx1ZS5YIDwgKHRoaXMuWCArIHRoaXMuV2lkdGgpKSkgJiYgKHRoaXMuWSA8PSB2YWx1ZS5ZKSkgJiYgKHZhbHVlLlkgPCAodGhpcy5ZICsgdGhpcy5IZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhSZWN0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKCh0aGlzLlggPD0gdmFsdWUuWCkgJiYgKCh2YWx1ZS5YICsgdmFsdWUuV2lkdGgpIDw9ICh0aGlzLlggKyB0aGlzLldpZHRoKSkpICYmICh0aGlzLlkgPD0gdmFsdWUuWSkpICYmICgodmFsdWUuWSArIHZhbHVlLkhlaWdodCkgPD0gKHRoaXMuWSArIHRoaXMuSGVpZ2h0KSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFJlY3QgYSwgUmVjdCBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICEoYSA9PSBiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE9mZnNldChQb2ludDJEIG9mZnNldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFggKz0gb2Zmc2V0Llg7XHJcbiAgICAgICAgICAgIFkgKz0gb2Zmc2V0Llk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBPZmZzZXQoaW50IG9mZnNldFgsIGludCBvZmZzZXRZKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCArPSBvZmZzZXRYO1xyXG4gICAgICAgICAgICBZICs9IG9mZnNldFk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUG9pbnQyRCBDZW50ZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFBvaW50MkQoKHRoaXMuWCArIHRoaXMuV2lkdGgpIC8gMiwgKHRoaXMuWSArIHRoaXMuSGVpZ2h0KSAvIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbmZsYXRlKGludCBob3Jpem9udGFsVmFsdWUsIGludCB2ZXJ0aWNhbFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCAtPSBob3Jpem9udGFsVmFsdWU7XHJcbiAgICAgICAgICAgIFkgLT0gdmVydGljYWxWYWx1ZTtcclxuICAgICAgICAgICAgV2lkdGggKz0gaG9yaXpvbnRhbFZhbHVlICogMjtcclxuICAgICAgICAgICAgSGVpZ2h0ICs9IHZlcnRpY2FsVmFsdWUgKiAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNFbXB0eVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoKCgodGhpcy5XaWR0aCA9PSAwKSAmJiAodGhpcy5IZWlnaHQgPT0gMCkpICYmICh0aGlzLlggPT0gMCkpICYmICh0aGlzLlkgPT0gMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBFcXVhbHMoUmVjdCBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzID09IG90aGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKG9iaiBpcyBSZWN0KSA/IHRoaXMgPT0gKChSZWN0KW9iaikgOiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJ7e1g6ezB9IFk6ezF9IFdpZHRoOnsyfSBIZWlnaHQ6ezN9fX1cIiwgWCwgWSwgV2lkdGgsIEhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5YIF4gdGhpcy5ZIF4gdGhpcy5XaWR0aCBeIHRoaXMuSGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEludGVyc2VjdHMoUmVjdCByMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAhKHIyLkxlZnQgPiBSaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICB8fCByMi5SaWdodCA8IExlZnRcclxuICAgICAgICAgICAgICAgICAgICAgfHwgcjIuVG9wID4gQm90dG9tXHJcbiAgICAgICAgICAgICAgICAgICAgIHx8IHIyLkJvdHRvbSA8IFRvcFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEludGVyc2VjdHMocmVmIFJlY3QgdmFsdWUsIG91dCBib29sIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICEodmFsdWUuTGVmdCA+IFJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgIHx8IHZhbHVlLlJpZ2h0IDwgTGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICB8fCB2YWx1ZS5Ub3AgPiBCb3R0b21cclxuICAgICAgICAgICAgICAgICAgICAgfHwgdmFsdWUuQm90dG9tIDwgVG9wXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUaW1lU3RhbXBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgQ3VycmVudFNuYXA7XHJcblxyXG4gICAgICAgIGludGVybmFsIFRpbWVTdGFtcFNuYXAgR2V0U25hcCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVTdGFtcFNuYXAoQ3VycmVudFNuYXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkdmFuY2UoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDdXJyZW50U25hcCArPSBkZWx0YTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0cnVjdCBUaW1lU3RhbXBTbmFwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IFRpbWVTbmFwO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGltZVN0YW1wU25hcChmbG9hdCBzbmFwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGltZVNuYXAgPSBzbmFwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgVW5pY29kZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgU3BhY2UgPSAzMjtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgVXBhcnJvdzIgPSAoY2hhcikyNDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBEb3duYXJyb3cyID0gKGNoYXIpMjU7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgUmlnaHRhcnJvdzIgPSAoY2hhcikyNjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBMZWZ0YXJyb3cyID0gKGNoYXIpMjc7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgVXBhcnJvdyA9IChjaGFyKTMwO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIERvd25hcnJvdyA9IChjaGFyKTMxO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIExlZnRhcnJvdyA9IChjaGFyKTE3O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIFJpZ2h0YXJyb3cgPSAoY2hhcikxNjtcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG4vL3VzaW5nIFN5c3RlbS5EcmF3aW5nO1xyXG51c2luZyBTeXN0ZW0uR2xvYmFsaXphdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIFtTZXJpYWxpemFibGVdXHJcbiAgICBwdWJsaWMgc3RydWN0IFZlY3RvcjJEIDogSUVxdWF0YWJsZTxWZWN0b3IyRD5cclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHplcm9WZWN0b3IgPSBuZXcgVmVjdG9yMkQoMGYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB1bml0VmVjdG9yID0gbmV3IFZlY3RvcjJEKDFmLCAxZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFhWZWN0b3IgPSBuZXcgVmVjdG9yMkQoMWYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB1bml0WVZlY3RvciA9IG5ldyBWZWN0b3IyRCgwZiwgMWYpO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IFg7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IFk7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICAjIHJlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFhJbnQgeyBnZXQgeyByZXR1cm4gKGludClYOyB9IH1cclxuICAgICAgICBwdWJsaWMgaW50IFlJbnQgeyBnZXQgeyByZXR1cm4gKGludClZOyB9IH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0YW50c1xyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFplcm9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB6ZXJvVmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE9uZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRWZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgVW5pdFhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WFZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBVbml0WVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRZVmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRChmbG9hdCB4LCBmbG9hdCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0geDtcclxuICAgICAgICAgICAgdGhpcy5ZID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyRChmbG9hdCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgSW50ZXJwb2xhdGVSb3VuZGVkKFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIFZlY3RvcjJEIGVuZFBvc2l0aW9uLCBmbG9hdCByYXRpbylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoc3RhcnRQb3NpdGlvbiAqICgxIC0gcmF0aW8pICsgZW5kUG9zaXRpb24gKiByYXRpbykuUm91bmQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVmVjdG9yMkQgUm91bmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCgoZmxvYXQpTWF0aC5Sb3VuZChYKSwgKGZsb2F0KU1hdGguUm91bmQoWSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBBZGQoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCArPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQWRkKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICsgdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKyB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KCh2MSAqIHYxKSArICh2MiAqIHYyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2UocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAoZmxvYXQpTWF0aC5TcXJ0KCh2MSAqIHYxKSArICh2MiAqIHYyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlU3F1YXJlZChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gKHYxICogdjEpICsgKHYyICogdjIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlU3F1YXJlZChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICh2MSAqIHYxKSArICh2MiAqIHYyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0KGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFggPSB4O1xyXG4gICAgICAgICAgICBZID0geTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIERpdmlkZShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAvIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBEaXZpZGUoVmVjdG9yMkQgdmFsdWUxLCBmbG9hdCBkaXZpZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMSAvIGRpdmlkZXI7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpdmlkZShyZWYgVmVjdG9yMkQgdmFsdWUxLCBmbG9hdCBkaXZpZGVyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMSAvIGRpdmlkZXI7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiBmYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERvdChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUxLlggKiB2YWx1ZTIuWCkgKyAodmFsdWUxLlkgKiB2YWx1ZTIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRG90KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQgPSAodmFsdWUxLlggKiB2YWx1ZTIuWCkgKyAodmFsdWUxLlkgKiB2YWx1ZTIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBFcXVhbHMob2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChvYmogaXMgVmVjdG9yMkQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBFcXVhbHMoKFZlY3RvcjJEKXRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBFcXVhbHMoVmVjdG9yMkQgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKFggPT0gb3RoZXIuWCkgJiYgKFkgPT0gb3RoZXIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFJlZmxlY3QoVmVjdG9yMkQgdmVjdG9yLCBWZWN0b3IyRCBub3JtYWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWZWN0b3IyRCByZXN1bHQ7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDIuMGYgKiAoKHZlY3Rvci5YICogbm9ybWFsLlgpICsgKHZlY3Rvci5ZICogbm9ybWFsLlkpKTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2ZWN0b3IuWCAtIChub3JtYWwuWCAqIHZhbCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmVjdG9yLlkgLSAobm9ybWFsLlkgKiB2YWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFJlZmxlY3QocmVmIFZlY3RvcjJEIHZlY3RvciwgcmVmIFZlY3RvcjJEIG5vcm1hbCwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDIuMGYgKiAoKHZlY3Rvci5YICogbm9ybWFsLlgpICsgKHZlY3Rvci5ZICogbm9ybWFsLlkpKTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2ZWN0b3IuWCAtIChub3JtYWwuWCAqIHZhbCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmVjdG9yLlkgLSAobm9ybWFsLlkgKiB2YWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBHZXRIYXNoQ29kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gWC5HZXRIYXNoQ29kZSgpICsgWS5HZXRIYXNoQ29kZSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGgoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLlNxcnQoKFggKiBYKSArIChZICogWSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IExlbmd0aFNxdWFyZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChYICogWCkgKyAoWSAqIFkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE1heChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQodmFsdWUxLlggPiB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTEuWSA+IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWF4KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YID4gdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZID4gdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNaW4oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHZhbHVlMS5YIDwgdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUxLlkgPCB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1pbihyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCA8IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSA8IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTXVsdGlwbHkoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE11bHRpcGx5KFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgc2NhbGVGYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgc2NhbGVGYWN0b3IsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNdWx0aXBseShyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE5lZ2F0ZShWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggPSAtdmFsdWUuWDtcclxuICAgICAgICAgICAgdmFsdWUuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTmVnYXRlKHJlZiBWZWN0b3IyRCB2YWx1ZSwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBOb3JtYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gMS4wZiAvIChmbG9hdClNYXRoLlNxcnQoKFggKiBYKSArIChZICogWSkpO1xyXG4gICAgICAgICAgICBYICo9IHZhbDtcclxuICAgICAgICAgICAgWSAqPSB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE5vcm1hbGl6ZShWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KCh2YWx1ZS5YICogdmFsdWUuWCkgKyAodmFsdWUuWSAqIHZhbHVlLlkpKTtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSB2YWw7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gdmFsO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTm9ybWFsaXplKHJlZiBWZWN0b3IyRCB2YWx1ZSwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KCh2YWx1ZS5YICogdmFsdWUuWCkgKyAodmFsdWUuWSAqIHZhbHVlLlkpKTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZS5YICogdmFsO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlLlkgKiB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgU3VidHJhY3QoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU3VidHJhY3QocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDdWx0dXJlSW5mbyBjdXJyZW50Q3VsdHVyZSA9IEN1bHR1cmVJbmZvLkN1cnJlbnRDdWx0dXJlO1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChjdXJyZW50Q3VsdHVyZSwgXCJ7e1g6ezB9IFk6ezF9fX1cIiwgbmV3IG9iamVjdFtdIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuWC5Ub1N0cmluZyhjdXJyZW50Q3VsdHVyZSksIHRoaXMuWS5Ub1N0cmluZyhjdXJyZW50Q3VsdHVyZSkgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIE9wZXJhdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC0oVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgPSAtdmFsdWUuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTEuWCA9PSB2YWx1ZTIuWCAmJiB2YWx1ZTEuWSA9PSB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxLlggIT0gdmFsdWUyLlggfHwgdmFsdWUxLlkgIT0gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciArKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICs9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgLShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC09IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAtPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yICooVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKFZlY3RvcjJEIHZhbHVlLCBmbG9hdCBzY2FsZUZhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yICooZmxvYXQgc2NhbGVGYWN0b3IsIFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgLyhWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC8oVmVjdG9yMkQgdmFsdWUxLCBmbG9hdCBkaXZpZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMSAvIGRpdmlkZXI7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBPcGVyYXRvcnNcclxuICAgIH1cclxufSIsIi8vIE1JVCBMaWNlbnNlIC0gQ29weXJpZ2h0IChDKSBUaGUgTW9uby5YbmEgVGVhbVxyXG4vLyBUaGlzIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgZGVmaW5lZCBpblxyXG4vLyBmaWxlICdMSUNFTlNFLnR4dCcsIHdoaWNoIGlzIHBhcnQgb2YgdGhpcyBzb3VyY2UgY29kZSBwYWNrYWdlLlxyXG5cclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uRGlhZ25vc3RpY3M7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uUnVudGltZS5TZXJpYWxpemF0aW9uO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG5cclxuICAgIFxyXG4gICAgcHVibGljIHN0cnVjdCBWZWN0b3IzRCA6IElFcXVhdGFibGU8VmVjdG9yM0Q+XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCB6ZXJvID0gbmV3IFZlY3RvcjNEKDBmLCAwZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIG9uZSA9IG5ldyBWZWN0b3IzRCgxZiwgMWYsIDFmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCB1bml0WCA9IG5ldyBWZWN0b3IzRCgxZiwgMGYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCB1bml0WSA9IG5ldyBWZWN0b3IzRCgwZiwgMWYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCB1bml0WiA9IG5ldyBWZWN0b3IzRCgwZiwgMGYsIDFmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCB1cCA9IG5ldyBWZWN0b3IzRCgwZiwgMWYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCBkb3duID0gbmV3IFZlY3RvcjNEKDBmLCAtMWYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCByaWdodCA9IG5ldyBWZWN0b3IzRCgxZiwgMGYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCBsZWZ0ID0gbmV3IFZlY3RvcjNEKC0xZiwgMGYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCBmb3J3YXJkID0gbmV3IFZlY3RvcjNEKDBmLCAwZiwgLTFmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCBiYWNrd2FyZCA9IG5ldyBWZWN0b3IzRCgwZiwgMGYsIDFmKTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBYO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgZmxvYXQgWTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGZsb2F0IFo7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmV0dXJucyBhIDxzZWU+VmVjdG9yMzwvc2VlPiB3aXRoIGNvbXBvbmVudHMgMCwgMCwgMC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgWmVyb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHplcm87IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmV0dXJucyBhIDxzZWU+VmVjdG9yMzwvc2VlPiB3aXRoIGNvbXBvbmVudHMgMSwgMSwgMS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgT25lXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gb25lOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDEsIDAsIDAuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFVuaXRYXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFg7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmV0dXJucyBhIDxzZWU+VmVjdG9yMzwvc2VlPiB3aXRoIGNvbXBvbmVudHMgMCwgMSwgMC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgVW5pdFlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHdpdGggY29tcG9uZW50cyAwLCAwLCAxLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBVbml0WlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRaOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFVwXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdXA7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgRG93blxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGRvd247IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgUmlnaHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiByaWdodDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBMZWZ0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gbGVmdDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBGb3J3YXJkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gZm9yd2FyZDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBCYWNrd2FyZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGJhY2t3YXJkOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IzRChmbG9hdCB4LCBmbG9hdCB5LCBmbG9hdCB6KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0geDtcclxuICAgICAgICAgICAgdGhpcy5ZID0geTtcclxuICAgICAgICAgICAgdGhpcy5aID0gejtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yM0QoZmxvYXQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5ZID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuWiA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IzRChWZWN0b3IyRCB2YWx1ZSwgZmxvYXQgeilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHZhbHVlLlg7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHZhbHVlLlk7XHJcbiAgICAgICAgICAgIHRoaXMuWiA9IHo7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBQZXJmb3JtcyB2ZWN0b3IgYWRkaXRpb24gb24gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTFcIi8+IGFuZCA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMlwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgcmVzdWx0IG9mIHRoZSB2ZWN0b3IgYWRkaXRpb24uPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgQWRkKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICs9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiArPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIGFkZGl0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmRcclxuICAgICAgICAvLy8gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LCBzdG9yaW5nIHRoZSByZXN1bHQgb2YgdGhlXHJcbiAgICAgICAgLy8vIGFkZGl0aW9uIGluIDxwYXJhbXJlZiBuYW1lPVwicmVzdWx0XCIvPi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IgdG8gYWRkLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IgdG8gYWRkLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIGFkZGl0aW9uLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEFkZChyZWYgVmVjdG9yM0QgdmFsdWUxLCByZWYgVmVjdG9yM0QgdmFsdWUyLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCArIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICsgdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmFsdWUxLlogKyB2YWx1ZTIuWjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIENyb3NzKFZlY3RvcjNEIHZlY3RvcjEsIFZlY3RvcjNEIHZlY3RvcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDcm9zcyhyZWYgdmVjdG9yMSwgcmVmIHZlY3RvcjIsIG91dCB2ZWN0b3IxKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZlY3RvcjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQ3Jvc3MocmVmIFZlY3RvcjNEIHZlY3RvcjEsIHJlZiBWZWN0b3IzRCB2ZWN0b3IyLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHggPSB2ZWN0b3IxLlkgKiB2ZWN0b3IyLlogLSB2ZWN0b3IyLlkgKiB2ZWN0b3IxLlo7XHJcbiAgICAgICAgICAgIHZhciB5ID0gLSh2ZWN0b3IxLlggKiB2ZWN0b3IyLlogLSB2ZWN0b3IyLlggKiB2ZWN0b3IxLlopO1xyXG4gICAgICAgICAgICB2YXIgeiA9IHZlY3RvcjEuWCAqIHZlY3RvcjIuWSAtIHZlY3RvcjIuWCAqIHZlY3RvcjEuWTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB4O1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gejtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2UoVmVjdG9yM0QgdmVjdG9yMSwgVmVjdG9yM0QgdmVjdG9yMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHJlc3VsdDtcclxuICAgICAgICAgICAgRGlzdGFuY2VTcXVhcmVkKHJlZiB2ZWN0b3IxLCByZWYgdmVjdG9yMiwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2UocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERpc3RhbmNlU3F1YXJlZChyZWYgdmFsdWUxLCByZWYgdmFsdWUyLCBvdXQgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKGZsb2F0KU1hdGguU3FydChyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEaXN0YW5jZVNxdWFyZWQoVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCByZXN1bHQ7XHJcbiAgICAgICAgICAgIERpc3RhbmNlU3F1YXJlZChyZWYgdmFsdWUxLCByZWYgdmFsdWUyLCBvdXQgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXN0YW5jZVNxdWFyZWQocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICh2YWx1ZTEuWCAtIHZhbHVlMi5YKSAqICh2YWx1ZTEuWCAtIHZhbHVlMi5YKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICh2YWx1ZTEuWSAtIHZhbHVlMi5ZKSAqICh2YWx1ZTEuWSAtIHZhbHVlMi5ZKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICh2YWx1ZTEuWiAtIHZhbHVlMi5aKSAqICh2YWx1ZTEuWiAtIHZhbHVlMi5aKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgRGl2aWRlKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC89IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAvPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgRGl2aWRlKFZlY3RvcjNEIHZhbHVlMSwgZmxvYXQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMSAvIHZhbHVlMjtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjNEIHZhbHVlMSwgZmxvYXQgZGl2aXNvciwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpc29yO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aICogZmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpdmlkZShyZWYgVmVjdG9yM0QgdmFsdWUxLCByZWYgVmVjdG9yM0QgdmFsdWUyLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAvIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZIC8gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmFsdWUxLlogLyB2YWx1ZTIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRG90KFZlY3RvcjNEIHZlY3RvcjEsIFZlY3RvcjNEIHZlY3RvcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmVjdG9yMS5YICogdmVjdG9yMi5YICsgdmVjdG9yMS5ZICogdmVjdG9yMi5ZICsgdmVjdG9yMS5aICogdmVjdG9yMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERvdChyZWYgVmVjdG9yM0QgdmVjdG9yMSwgcmVmIFZlY3RvcjNEIHZlY3RvcjIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB2ZWN0b3IxLlggKiB2ZWN0b3IyLlggKyB2ZWN0b3IxLlkgKiB2ZWN0b3IyLlkgKyB2ZWN0b3IxLlogKiB2ZWN0b3IyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBFcXVhbHMob2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghKG9iaiBpcyBWZWN0b3IzRCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB2YXIgb3RoZXIgPSAoVmVjdG9yM0Qpb2JqO1xyXG4gICAgICAgICAgICByZXR1cm4gWCA9PSBvdGhlci5YICYmXHJcbiAgICAgICAgICAgICAgICAgICAgWSA9PSBvdGhlci5ZICYmXHJcbiAgICAgICAgICAgICAgICAgICAgWiA9PSBvdGhlci5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFZlY3RvcjNEIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFggPT0gb3RoZXIuWCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFkgPT0gb3RoZXIuWSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFogPT0gb3RoZXIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpKHRoaXMuWCArIHRoaXMuWSArIHRoaXMuWik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IExlbmd0aCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCByZXN1bHQ7XHJcbiAgICAgICAgICAgIERpc3RhbmNlU3F1YXJlZChyZWYgdGhpcywgcmVmIHplcm8sIG91dCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguU3FydChyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IExlbmd0aFNxdWFyZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHRoaXMsIHJlZiB6ZXJvLCBvdXQgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTXVsdGlwbHkoVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICo9IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBNdWx0aXBseShWZWN0b3IzRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNdWx0aXBseShyZWYgVmVjdG9yM0QgdmFsdWUxLCBmbG9hdCBzY2FsZUZhY3Rvciwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aICogdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gcG9pbnRpbmcgaW4gdGhlIG9wcG9zaXRlXHJcbiAgICAgICAgLy8vIGRpcmVjdGlvbiBvZiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlXCIvPi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIHZlY3RvciB0byBuZWdhdGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHZlY3RvciBuZWdhdGlvbiBvZiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlXCIvPi48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBOZWdhdGUoVmVjdG9yM0QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBWZWN0b3IzRCgtdmFsdWUuWCwgLXZhbHVlLlksIC12YWx1ZS5aKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBTdG9yZXMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gcG9pbnRpbmcgaW4gdGhlIG9wcG9zaXRlXHJcbiAgICAgICAgLy8vIGRpcmVjdGlvbiBvZiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlXCIvPiBpbiA8cGFyYW1yZWYgbmFtZT1cInJlc3VsdFwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2ZWN0b3IgdG8gbmVnYXRlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+VGhlIHZlY3RvciB0aGF0IHRoZSBuZWdhdGlvbiBvZiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlXCIvPiB3aWxsIGJlIHN0b3JlZCBpbi48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBOZWdhdGUocmVmIFZlY3RvcjNEIHZhbHVlLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSAtdmFsdWUuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSAtdmFsdWUuWTtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSAtdmFsdWUuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE5vcm1hbGl6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOb3JtYWxpemUocmVmIHRoaXMsIG91dCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTm9ybWFsaXplKFZlY3RvcjNEIHZlY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5vcm1hbGl6ZShyZWYgdmVjdG9yLCBvdXQgdmVjdG9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZlY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBOb3JtYWxpemUocmVmIFZlY3RvcjNEIHZhbHVlLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yO1xyXG4gICAgICAgICAgICBEaXN0YW5jZShyZWYgdmFsdWUsIHJlZiB6ZXJvLCBvdXQgZmFjdG9yKTtcclxuICAgICAgICAgICAgZmFjdG9yID0gMWYgLyBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUuWCAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZS5ZICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlLlogKiBmYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFJlZmxlY3QoVmVjdG9yM0QgdmVjdG9yLCBWZWN0b3IzRCBub3JtYWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBJIGlzIHRoZSBvcmlnaW5hbCBhcnJheVxyXG4gICAgICAgICAgICAvLyBOIGlzIHRoZSBub3JtYWwgb2YgdGhlIGluY2lkZW50IHBsYW5lXHJcbiAgICAgICAgICAgIC8vIFIgPSBJIC0gKDIgKiBOICogKCBEb3RQcm9kdWN0WyBJLE5dICkpXHJcbiAgICAgICAgICAgIFZlY3RvcjNEIHJlZmxlY3RlZFZlY3RvcjtcclxuICAgICAgICAgICAgLy8gaW5saW5lIHRoZSBkb3RQcm9kdWN0IGhlcmUgaW5zdGVhZCBvZiBjYWxsaW5nIG1ldGhvZFxyXG4gICAgICAgICAgICBmbG9hdCBkb3RQcm9kdWN0ID0gKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSkgKyAodmVjdG9yLlogKiBub3JtYWwuWik7XHJcbiAgICAgICAgICAgIHJlZmxlY3RlZFZlY3Rvci5YID0gdmVjdG9yLlggLSAoMi4wZiAqIG5vcm1hbC5YKSAqIGRvdFByb2R1Y3Q7XHJcbiAgICAgICAgICAgIHJlZmxlY3RlZFZlY3Rvci5ZID0gdmVjdG9yLlkgLSAoMi4wZiAqIG5vcm1hbC5ZKSAqIGRvdFByb2R1Y3Q7XHJcbiAgICAgICAgICAgIHJlZmxlY3RlZFZlY3Rvci5aID0gdmVjdG9yLlogLSAoMi4wZiAqIG5vcm1hbC5aKSAqIGRvdFByb2R1Y3Q7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVmbGVjdGVkVmVjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFJlZmxlY3QocmVmIFZlY3RvcjNEIHZlY3RvciwgcmVmIFZlY3RvcjNEIG5vcm1hbCwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIEkgaXMgdGhlIG9yaWdpbmFsIGFycmF5XHJcbiAgICAgICAgICAgIC8vIE4gaXMgdGhlIG5vcm1hbCBvZiB0aGUgaW5jaWRlbnQgcGxhbmVcclxuICAgICAgICAgICAgLy8gUiA9IEkgLSAoMiAqIE4gKiAoIERvdFByb2R1Y3RbIEksTl0gKSlcclxuXHJcbiAgICAgICAgICAgIC8vIGlubGluZSB0aGUgZG90UHJvZHVjdCBoZXJlIGluc3RlYWQgb2YgY2FsbGluZyBtZXRob2RcclxuICAgICAgICAgICAgZmxvYXQgZG90UHJvZHVjdCA9ICgodmVjdG9yLlggKiBub3JtYWwuWCkgKyAodmVjdG9yLlkgKiBub3JtYWwuWSkpICsgKHZlY3Rvci5aICogbm9ybWFsLlopO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZlY3Rvci5YIC0gKDIuMGYgKiBub3JtYWwuWCkgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKDIuMGYgKiBub3JtYWwuWSkgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZlY3Rvci5aIC0gKDIuMGYgKiBub3JtYWwuWikgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBQZXJmb3JtcyB2ZWN0b3Igc3VidHJhY3Rpb24gb24gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTFcIi8+IGFuZCA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMlwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgdmVjdG9yIHRvIGJlIHN1YnRyYWN0ZWQgZnJvbS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSB2ZWN0b3IgdG8gYmUgc3VidHJhY3RlZCBmcm9tIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPi48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgcmVzdWx0IG9mIHRoZSB2ZWN0b3Igc3VidHJhY3Rpb24uPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgU3VidHJhY3QoVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aIC09IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBQZXJmb3JtcyB2ZWN0b3Igc3VidHJhY3Rpb24gb24gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTFcIi8+IGFuZCA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMlwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgdmVjdG9yIHRvIGJlIHN1YnRyYWN0ZWQgZnJvbS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSB2ZWN0b3IgdG8gYmUgc3VidHJhY3RlZCBmcm9tIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPi48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSByZXN1bHQgb2YgdGhlIHZlY3RvciBzdWJ0cmFjdGlvbi48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTdWJ0cmFjdChyZWYgVmVjdG9yM0QgdmFsdWUxLCByZWYgVmVjdG9yM0QgdmFsdWUyLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAtIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmFsdWUxLlogLSB2YWx1ZTIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHN0cmluZyBEZWJ1Z0Rpc3BsYXlTdHJpbmdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkNvbmNhdChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlguVG9TdHJpbmcoKSwgXCIgIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWS5Ub1N0cmluZygpLCBcIiAgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5aLlRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IG5ldyBTdHJpbmdCdWlsZGVyKDMyKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKFwie1g6XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmQodGhpcy5YKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKFwiIFk6XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmQodGhpcy5ZKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKFwiIFo6XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmQodGhpcy5aKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKFwifVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNiLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLy8vIFRyYW5zZm9ybXMgYSB2ZWN0b3IgYnkgYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLlxyXG4gICAgICAgIC8vLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8vLyA8cGFyYW0gbmFtZT1cInZlY1wiPlRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vLy8gPHBhcmFtIG5hbWU9XCJxdWF0XCI+VGhlIHF1YXRlcm5pb24gdG8gcm90YXRlIHRoZSB2ZWN0b3IgYnkuPC9wYXJhbT5cclxuICAgICAgICAvLy8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSByZXN1bHQgb2YgdGhlIG9wZXJhdGlvbi48L3BhcmFtPlxyXG4gICAgICAgIC8vICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgVHJhbnNmb3JtKHJlZiBWZWN0b3IzIHZlYywgcmVmIFF1YXRlcm5pb24gcXVhdCwgb3V0IFZlY3RvcjMgcmVzdWx0KVxyXG4gICAgICAgIC8vICAgICAgICB7XHJcbiAgICAgICAgLy9cdFx0Ly8gVGFrZW4gZnJvbSB0aGUgT3BlbnRUSyBpbXBsZW1lbnRhdGlvbiBvZiBWZWN0b3IzXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBTaW5jZSB2ZWMuVyA9PSAwLCB3ZSBjYW4gb3B0aW1pemUgcXVhdCAqIHZlYyAqIHF1YXReLTEgYXMgZm9sbG93czpcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vIHZlYyArIDIuMCAqIGNyb3NzKHF1YXQueHl6LCBjcm9zcyhxdWF0Lnh5eiwgdmVjKSArIHF1YXQudyAqIHZlYylcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMgeHl6ID0gcXVhdC5YeXosIHRlbXAsIHRlbXAyO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMy5Dcm9zcyhyZWYgeHl6LCByZWYgdmVjLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLk11bHRpcGx5KHJlZiB2ZWMsIHF1YXQuVywgb3V0IHRlbXAyKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMuQWRkKHJlZiB0ZW1wLCByZWYgdGVtcDIsIG91dCB0ZW1wKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMuQ3Jvc3MocmVmIHh5eiwgcmVmIHRlbXAsIG91dCB0ZW1wKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMuTXVsdGlwbHkocmVmIHRlbXAsIDIsIG91dCB0ZW1wKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMuQWRkKHJlZiB2ZWMsIHJlZiB0ZW1wLCBvdXQgcmVzdWx0KTtcclxuICAgICAgICAvLyAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBtZXRob2RzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIE9wZXJhdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxLlggPT0gdmFsdWUyLlhcclxuICAgICAgICAgICAgICAgICYmIHZhbHVlMS5ZID09IHZhbHVlMi5ZXHJcbiAgICAgICAgICAgICAgICAmJiB2YWx1ZTEuWiA9PSB2YWx1ZTIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciAhPShWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAhKHZhbHVlMSA9PSB2YWx1ZTIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciArKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICs9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiArPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgLShWZWN0b3IzRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gbmV3IFZlY3RvcjNEKC12YWx1ZS5YLCAtdmFsdWUuWSwgLXZhbHVlLlopO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yIC0oVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aIC09IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAqKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgKihWZWN0b3IzRCB2YWx1ZSwgZmxvYXQgc2NhbGVGYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5aICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yICooZmxvYXQgc2NhbGVGYWN0b3IsIFZlY3RvcjNEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWiAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAvKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC89IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAvPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgLyhWZWN0b3IzRCB2YWx1ZSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlogKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBNb3ZlRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHN0cmluZyBsYWJlbDtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PFRpY2s+IHVuaXRzID0gbmV3IExpc3Q8VGljaz4oKTtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PGludD4gdGFncyA9IG5ldyBMaXN0PGludD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVEYXRhKHN0cmluZyBsYWJlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEZpbmRCeUxhYmVsKExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcywgc3RyaW5nIGxhYmVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBtb3ZlRGF0YXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYobW92ZURhdGFzW2ldIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtb3ZlRGF0YXNbaV0ubGFiZWwgPT0gbGFiZWwpIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRpY2sgXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgQ29uZGl0aW9uIGNvbmRpdGlvbjtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PG9iamVjdD4gdGhpbmdzVG9IYXBwZW4gPSBuZXcgTGlzdDxvYmplY3Q+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUaWNrKG9iamVjdCBhY3Rpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGluZ3NUb0hhcHBlbi5BZGQoYWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUaWNrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNsYXNzIENvbmRpdGlvblxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHJlYWRvbmx5IENvbmRpdGlvblR5cGUgdHlwZTtcclxuICAgICAgICBpbnRlcm5hbCByZWFkb25seSBUYXJnZXQgdGFyZ2V0O1xyXG4gICAgICAgIGludGVybmFsIHJlYWRvbmx5IEJhc2VVdGlscy5WZWN0b3IyRCB2ZWN0b3I7XHJcblxyXG4gICAgICAgIHB1YmxpYyBDb25kaXRpb24oQ29uZGl0aW9uVHlwZSB0eXBlLCBUYXJnZXQgdGFyZ2V0LCBCYXNlVXRpbHMuVmVjdG9yMkQgdmVjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMudmVjdG9yID0gdmVjdG9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBDb25kaXRpb25UeXBlXHJcbiAgICB7XHJcbiAgICAgICAgQ2FuTW92ZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBTdW1tb25FbnRpdHlcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGVuZW15V2hpY2g7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFZlY3RvcjJEIHByZWZlcmVudGlhbFJvd0NvbHVtbjtcclxuXHJcbiAgICAgICAgcHVibGljIFN1bW1vbkVudGl0eShpbnQgZW5lbXlXaGljaCwgVmVjdG9yMkQgcHJlZmVyZW50aWFsUm93Q29sdW1uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbmVteVdoaWNoID0gZW5lbXlXaGljaDtcclxuICAgICAgICAgICAgdGhpcy5wcmVmZXJlbnRpYWxSb3dDb2x1bW4gPSBwcmVmZXJlbnRpYWxSb3dDb2x1bW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdGF0aWMgU3VtbW9uRW50aXR5IEVuZW15KGludCB2LCBWZWN0b3IyRCB2ZWN0b3IyRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3VtbW9uRW50aXR5KHYsIHZlY3RvcjJEKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBbmltYXRpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQXJlYSBhcmVhID0gbnVsbDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50ID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBUYXJnZXQgdGFyZ2V0ID0gVGFyZ2V0Lk5vbmU7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBBbmltYXRpb24oVGFyZ2V0IHRhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wdWJsaWMgQW5pbWF0aW9uKEFyZWEgYXJlYSlcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICB0aGlzLmFyZWEgPSBhcmVhO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBwdWJsaWMgQW5pbWF0aW9uKFRhcmdldCB0YXJnZXQsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFuaW1hdGlvbihBcmVhIGFyZWEsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZSwgVGFyZ2V0IHRhcmdldCA9IFRhcmdldC5Ob25lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBNb3ZlQWN0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFRhcmdldCB0YXJnZXQ7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEJhc2VVdGlscy5WZWN0b3IyRCBkaXN0YW5jZTtcclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVBY3Rpb24oVGFyZ2V0IHRhcmdldCwgQmFzZVV0aWxzLlZlY3RvcjJEIGFtb3VudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLmRpc3RhbmNlID0gYW1vdW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgRGVhbERhbWFnZUFjdGlvblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBUYXJnZXQgdGFyZ2V0ID0gVGFyZ2V0Lk5vbmU7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEFyZWEgYXJlYTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGRhbWFnZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50O1xyXG5cclxuICAgICAgICBwdWJsaWMgRGVhbERhbWFnZUFjdGlvbihBcmVhIGFyZWEsIGludCBkYW1hZ2UsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XHJcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB0YXJnZXQgPSBUYXJnZXQuQXJlYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldCB0YXJnZXQsIGludCBkYW1hZ2UsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFyZWFcclxuICAgIHtcclxuICAgICAgICAvL3B1YmxpYyByZWFkb25seSBBcmVhIGFyZWE7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFRhcmdldCB0YXJnZXQ7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IExpc3Q8VmVjdG9yMkQ+IHBvaW50cyA9IG5ldyBMaXN0PFZlY3RvcjJEPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgQXJlYShUYXJnZXQgdGFyZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIFRhcmdldFxyXG4gICAge1xyXG4gICAgICAgIE5vbmUsICBTZWxmLCBDbG9zZXN0VGFyZ2V0LCBDbG9zZXN0VGFyZ2V0WCwgQXJlYSAgIFxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFzeW5jVGFza3NcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFzeW5jVHJhY2tcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIERlbGF5ZWRBY3Rpb25zXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxmbG9hdD4gdGltZXMgPSBuZXcgTGlzdDxmbG9hdD4oKTtcclxuICAgICAgICBMaXN0PElMaXN0PiBsaXN0cyA9IG5ldyBMaXN0PElMaXN0PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRpbWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpbWVzW2ldIC09IGRlbHRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVzW2ldIDw9IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRXhlY3V0ZShpKTtcclxuICAgICAgICAgICAgICAgICAgICBFbmRUYXNrKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBhYnN0cmFjdCB2b2lkIEV4ZWN1dGUoaW50IGkpO1xyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkZChmbG9hdCB0aW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGltZXMuQWRkKHRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aW1lcy5Db3VudCA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBFbmRUYXNrKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGltZXMuUmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBsIGluIGxpc3RzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBc3luY1Rhc2tTZXR0ZXI8VD4gOiBEZWxheWVkQWN0aW9uc1xyXG4gICAge1xyXG4gICAgICAgIExpc3Q8VD4gVG9WYWx1ZSA9IG5ldyBMaXN0PFQ+KCk7XHJcbiAgICAgICAgTGlzdDxBY3Rpb248VD4+IHNldHRlcnMgPSBuZXcgTGlzdDxBY3Rpb248VD4+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChUIGUsIEFjdGlvbjxUPiBzZXR0ZXIsIGZsb2F0IHRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUb1ZhbHVlLkFkZChlKTtcclxuICAgICAgICAgICAgc2V0dGVycy5BZGQoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxUPilzZXR0ZXIpO1xyXG4gICAgICAgICAgICBiYXNlLkFkZCh0aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIG92ZXJyaWRlIHZvaWQgRXhlY3V0ZShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldHRlcnNbaV0oVG9WYWx1ZVtpXSk7XHJcbiAgICAgICAgICAgIFRvVmFsdWUuUmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgIHNldHRlcnMuUmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuSGFwcHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIEJhdHRsZU1haW5cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxCYXR0bGVFbnRpdHk+IGVudGl0aWVzID0gbmV3IExpc3Q8QmF0dGxlRW50aXR5PigpO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVTdGF0ZSBiYXR0bGVTdGF0ZSA9IG5ldyBCYXR0bGVTdGF0ZSgpO1xyXG4gICAgICAgIHB1YmxpYyBIYXBwTWFuYWdlciBoYXBwTWFuYWdlciA9IG5ldyBIYXBwTWFuYWdlcigpO1xyXG4gICAgICAgIERpY3Rpb25hcnk8TW92ZVR5cGUsIFZlY3RvcjJEPiBtb3ZlbWVudE1vdmVzID0gbmV3IERpY3Rpb25hcnk8TW92ZVR5cGUsIFZlY3RvcjJEPigpO1xyXG4gICAgICAgIC8vRGljdGlvbmFyeTxNb3ZlVHlwZSwgUG9pbnQ+IGF0dGFja01vdmVzID0gbmV3IERpY3Rpb25hcnk8TW92ZVR5cGUsIFBvaW50PigpO1xyXG4gICAgICAgIE1vdmVUeXBlW10gZW5lbXlNb3ZlcztcclxuICAgICAgICAvL3B1YmxpYyBMaXN0PElucHV0PiBpbnB1dHMgPSBuZXcgTGlzdDxUdXJuYmFzZWQuSW5wdXQ+KCk7XHJcbiAgICAgICAgcHVibGljIElucHV0SG9sZGVyIGlucHV0cyA9IG5ldyBJbnB1dEhvbGRlcigpO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PE1vdmVUeXBlPiBwbGF5ZXJIYW5kRml4ZWQgPSBuZXcgTGlzdDxNb3ZlVHlwZT4oKTtcclxuICAgICAgICBwdWJsaWMgTGlzdDxNb3ZlVHlwZT4gcGxheWVySGFuZFVuZml4ZWQgPSBuZXcgTGlzdDxNb3ZlVHlwZT4oKTtcclxuICAgICAgICBwdWJsaWMgTGlzdDxNb3ZlVHlwZT4gcGxheWVySGFuZFBvb2wgPSBuZXcgTGlzdDxNb3ZlVHlwZT4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IHRpbWVUb0Nob29zZU1heCA9IDE1ZjtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgdGltZVRvQ2hvb3NlID0gLTE7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVSZXN1bHQgYmF0dGxlUmVzdWx0ID0gbmV3IEJhdHRsZVJlc3VsdCgpO1xyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEJhdHRsZUNvbmZpZ3VyZShCYXR0bGVDb25maWcgYmF0dGxlQ29uZmlnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGJhdHRsZUNvbmZpZyA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVDb25maWcgPSBuZXcgQmF0dGxlQ29uZmlnKG5lZWRLaWxsQWxsRW5lbWllczp0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkJhdHRsZUNvbmZpZyA9IGJhdHRsZUNvbmZpZztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnQgbkVuZW1pZXM7XHJcbiAgICAgICAgcHVibGljIE1vdmVEYXRhRXhlY3V0ZXIgTW92ZURhdGFFeGVjdXRlcjtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFRpbWVTdGFtcCB0aW1lU3RhbXA7XHJcbiAgICAgICAgcHJpdmF0ZSBRdWlja0FjY2Vzc29yVHdvPEJhdHRsZUVudGl0eSwgUGlja3VwSW5mbz4gcGlja3VwQWNjZXNzb3I7XHJcbiAgICAgICAgaW50ZXJuYWwgRUNTSW50ZWdyYXRpb24gZWNzSW50ZWc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBY3Rpb24gRW5lbXlHZW5lcmF0ZU1vdmVzO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnIEJhdHRsZUNvbmZpZyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IEJvYXJkV2lkdGggeyBnZXQ7IGludGVybmFsIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQm9hcmRIZWlnaHQgeyBnZXQ7IGludGVybmFsIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlTWFpbihpbnQgbW9kZSwgRUNTTWFuYWdlciBlY3MsIFRpbWVTdGFtcCB0aW1lU3RhbXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3RoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IHRpbWVTdGFtcDtcclxuICAgICAgICAgICAgcGlja3VwQWNjZXNzb3IgPSBlY3MuUXVpY2tBY2Nlc3NvcjI8QmF0dGxlRW50aXR5LCBQaWNrdXBJbmZvPigpO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlVXAsIFZlY3RvcjJELlVuaXRZKTtcclxuICAgICAgICAgICAgbW92ZW1lbnRNb3Zlcy5BZGQoTW92ZVR5cGUuTW92ZURvd24sIC1WZWN0b3IyRC5Vbml0WSk7XHJcbiAgICAgICAgICAgIG1vdmVtZW50TW92ZXMuQWRkKE1vdmVUeXBlLk1vdmVMZWZ0LCAtVmVjdG9yMkQuVW5pdFgpO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlUmlnaHQsIFZlY3RvcjJELlVuaXRYKTtcclxuXHJcbiAgICAgICAgICAgIHBsYXllckhhbmRGaXhlZC5DbGVhcigpO1xyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kRml4ZWQuQWRkKE1vdmVUeXBlLk1vdmVSaWdodCk7XHJcbiAgICAgICAgICAgIHBsYXllckhhbmRGaXhlZC5BZGQoTW92ZVR5cGUuTW92ZUxlZnQpO1xyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kRml4ZWQuQWRkKE1vdmVUeXBlLk1vdmVEb3duKTtcclxuICAgICAgICAgICAgcGxheWVySGFuZEZpeGVkLkFkZChNb3ZlVHlwZS5Nb3ZlVXApO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1vZGUgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFVuZml4ZWQuQWRkKE1vdmVUeXBlLk5vcm1hbFNob3QpO1xyXG4gICAgICAgICAgICAgICAgZW5lbXlNb3ZlcyA9IG5ldyBNb3ZlVHlwZVtdIHtcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlVXAsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZURvd24sXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk5vcm1hbFNob3QsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFVuZml4ZWQuQWRkKE1vdmVUeXBlLkZpcmUpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFVuZml4ZWQuQWRkKE1vdmVUeXBlLkljZSk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kVW5maXhlZC5BZGQoTW92ZVR5cGUuVGh1bmRlcik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGVuZW15TW92ZXMgPSBuZXcgTW92ZVR5cGVbXSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZURvd24sXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVVwLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5GaXJlLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLkljZSxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5UaHVuZGVyLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9wbGF5ZXJIYW5kLkFkZChNb3ZlVHlwZS5Ob3JtYWxTaG90KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIElzVmljdG9yeSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQmFzaWNDb25maWcoQmF0dGxlQmFzaWNDb25maWcgYmFzaWNDb25maWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlLlZhbCA9IGJhc2ljQ29uZmlnLm5UdXJucztcclxuICAgICAgICAgICAgbkVuZW1pZXMgPSBiYXNpY0NvbmZpZy5uRW5lbWllcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIEJhdHRsZUVudGl0eSBoZXJvID0gbmV3IEJhdHRsZUVudGl0eSgpO1xyXG5cclxuICAgICAgICAgICAgaGVyby5wb3MuU2V0KDEsIDEpO1xyXG4gICAgICAgICAgICBoZXJvLm1pblBvcy5TZXQoMCwgMCk7XHJcbiAgICAgICAgICAgIGhlcm8ubWF4UG9zLlNldCgyLCAyKTtcclxuICAgICAgICAgICAgaGVyby5UeXBlID0gRW50aXR5VHlwZS5oZXJvO1xyXG4gICAgICAgICAgICBoZXJvLmxpZmUgPSAyO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGhlcm8ubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhlcm8ubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGVudGl0aWVzLkFkZChoZXJvKTtcclxuICAgICAgICAgICAgZWNzSW50ZWcuSGVyb0NyZWF0ZWQoaGVybyk7XHJcbiAgICAgICAgICAgIGVjc0ludGVnLlNwYXduRW5lbWllcygpO1xyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9HYW1lRW50aXR5IHBpY2t1cCA9IG5ldyBHYW1lRW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5UeXBlID0gRW50aXR5VHlwZS5waWNrdXA7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5wb3MuU2V0KDAsIDIpO1xyXG4gICAgICAgICAgICAgICAgLy9waWNrdXAubGlmZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5ncmFwaGljID0gNDtcclxuICAgICAgICAgICAgICAgIC8vZW50aXRpZXMuQWRkKHBpY2t1cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIEJhdHRsZUVudGl0eSBwYW5lbEVmZmVjdCA9IG5ldyBCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuVHlwZSA9IEVudGl0eVR5cGUucGFuZWxlZmZlY3Q7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnBvcy5TZXQoMCwgMik7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmxpZmUgPSA1O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5ncmFwaGljID0gNTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QucmFuZG9tUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3TGlmZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3VHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBSYW5kb21Qb3NpdGlvbihwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vICAgIGVudGl0aWVzLkFkZChwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIEJhdHRsZUVudGl0eSBwYW5lbEVmZmVjdCA9IG5ldyBCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuVHlwZSA9IEVudGl0eVR5cGUucGFuZWxlZmZlY3Q7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnBvcy5TZXQoMCwgMik7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmxpZmUgPSA1O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5ncmFwaGljID0gNTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QucmFuZG9tUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3TGlmZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5kcmF3VHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICBSYW5kb21Qb3NpdGlvbihwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vICAgIGVudGl0aWVzLkFkZChwYW5lbEVmZmVjdCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgUmVzZXQoKTtcclxuICAgICAgICAgICAgRXhlY3V0ZVBoYXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlRW50aXR5IE5ld0JhdHRsZUVudGl0eSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCYXR0bGVFbnRpdHkgYmF0dGxlRW50aXR5ID0gbmV3IEJhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICBlbnRpdGllcy5BZGQoYmF0dGxlRW50aXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIGJhdHRsZUVudGl0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbnRpdGllc1tpXS5saWZlID0gZW50aXRpZXNbaV0ubWF4TGlmZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2UpO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS50dXJuLlZhbCA9IDA7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLnRvdGFsVHVybnMgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsID0gMDtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICBiYXR0bGVSZXN1bHQucmVzdWx0ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSXNPdmVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBiYXR0bGVSZXN1bHQucmVzdWx0ICE9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUaWNrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZpbmlzaFByZXZpb3VzVGljaygpO1xyXG4gICAgICAgICAgICBib29sIGhlcm9BbGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBib29sIGVuZW15QWxpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYm9vbCBwaWNrdXBPYmxpZ2F0b3J5RXhpc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLlR5cGUgPT0gRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5saWZlID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXlBbGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5UeXBlID09IEVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5saWZlID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0FsaXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRoaXMucGlja3VwQWNjZXNzb3IuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBwaWNrdXAgPSBwaWNrdXBBY2Nlc3Nvci5Db21wMihpKTtcclxuICAgICAgICAgICAgICAgIGlmIChwaWNrdXAubmVjZXNzYXJ5Rm9yVmljdG9yeSAmJiBwaWNrdXBBY2Nlc3Nvci5Db21wMShpKS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwaWNrdXBPYmxpZ2F0b3J5RXhpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaGVyb0FsaXZlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVSZXN1bHQucmVzdWx0ID0gMjtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoKCFlbmVteUFsaXZlfHwgIUJhdHRsZUNvbmZpZy5uZWVkS2lsbEFsbEVuZW1pZXMpICYmICFwaWNrdXBPYmxpZ2F0b3J5RXhpc3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVJlc3VsdC5yZXN1bHQgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChiYXR0bGVSZXN1bHQucmVzdWx0ID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhhcHBNYW5hZ2VyLlRpY2soKTtcclxuICAgICAgICAgICAgICAgIHRpbWVTdGFtcC5BZHZhbmNlKDEpO1xyXG4gICAgICAgICAgICAgICAgRXhlY3V0ZVBoYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGltZVRvQ2hvb3NlID4gMCAmJiBiYXR0bGVTdGF0ZS5waGFzZSA9PSBCYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpbWVUb0Nob29zZSAtPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGlmICh0aW1lVG9DaG9vc2UgPD0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBGaW5pc2hQcmV2aW91c1RpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQmF0dGxlUGhhc2UgcHJldmlvdXNQaGFzZSA9IGJhdHRsZVN0YXRlLnBoYXNlO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHByZXZpb3VzUGhhc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlOlxyXG4gICAgICAgICAgICAgICAgICAgIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlLkhhbmRSZWNoYXJnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkhhbmRSZWNoYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5QaWNrSGFuZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5QaWNrSGFuZHM6XHJcbiAgICAgICAgICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5FeGVjdXRlTW92ZTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93ID49IGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdy5WYWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvb2wgbm9Nb3JlVW5pdHNUb0FjdFRoaXNUdXJuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGlfaW5pdGlhbCA9IGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpX2luaXRpYWwgPCBlbnRpdGllcy5Db3VudClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IGlfaW5pdGlhbDsgaSA8IGVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0aWVzW2ldLkFsaXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Nb3JlVW5pdHNUb0FjdFRoaXNUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub01vcmVVbml0c1RvQWN0VGhpc1R1cm4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYXR0bGVTdGF0ZS50dXJuID49IGJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2UgLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlLkVuZW15TW92ZUNob2ljZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5yYW5kb21Qb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmFuZG9tUG9zaXRpb24oZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS50dXJuID0gYmF0dGxlU3RhdGUudHVybiArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUudG90YWxUdXJucyArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdy5WYWwgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJhbmRvbVBvc2l0aW9uKEJhdHRsZUVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5wb3MuWCA9IFJhbmRvbVN1cHBsaWVyLlJhbmdlKDAsIDUpO1xyXG4gICAgICAgICAgICBlLnBvcy5ZID0gUmFuZG9tU3VwcGxpZXIuUmFuZ2UoMCwgMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UgcGhhc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCYXR0bGVQaGFzZSBwcmV2aW91c1BoYXNlID0gYmF0dGxlU3RhdGUucGhhc2U7XHJcbiAgICAgICAgICAgIGlmIChwaGFzZSA9PSBwcmV2aW91c1BoYXNlKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChwaGFzZSA9PSBCYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgIHtcclxuUGlkcm9oLkJhc2VVdGlscy5FeHRlbnNpb25zLlNodWZmbGU8Z2xvYmFsOjpQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZT4oICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sKTtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRVbmZpeGVkLkNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBpbnQgY29tbWFuZHNUb0FkZCA9IDM7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZHNUb0FkZCA+IHBsYXllckhhbmRQb29sLkNvdW50KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzVG9BZGQgPSBwbGF5ZXJIYW5kUG9vbC5Db3VudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY29tbWFuZHNUb0FkZDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllckhhbmRVbmZpeGVkLkFkZChwbGF5ZXJIYW5kUG9vbFtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHRpbWVUb0Nob29zZSA9IHRpbWVUb0Nob29zZU1heDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJldmlvdXNQaGFzZSA9PSBCYXR0bGVQaGFzZS5FeGVjdXRlTW92ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUudHVybi5WYWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5ID0gMDtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdy5WYWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlLm1vdmVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3Zlc1tpXSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5waGFzZSA9IHBoYXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEV4ZWN1dGVQaGFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcGhhc2UgPSBiYXR0bGVTdGF0ZS5waGFzZTtcclxuICAgICAgICAgICAgc3dpdGNoIChwaGFzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgZWNzSW50ZWcuU3Bhd25FbmVtaWVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5lbXlHZW5lcmF0ZU1vdmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkhhbmRSZWNoYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuUGlja0hhbmRzOlxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0cy5DbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBoaSBpbiBwbGF5ZXJIYW5kRml4ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1vdmUsIChpbnQpaGkpLCBJbnB1dFRhZ3MuTU9WRUZJWCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBoaSBpbiBwbGF5ZXJIYW5kVW5maXhlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTW92ZSwgKGludCloaSksIElucHV0VGFncy5NT1ZFVU5GSVgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5SZWRvKSwgSW5wdXRUYWdzLk1JU0MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LkRvbmUpLCBJbnB1dFRhZ3MuTUlTQyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlOlxyXG4gICAgICAgICAgICAgICAgICAgIGVjc0ludGVnLlNwYXduRW5lbWllcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIEV4ZWN1dGVNb3ZlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIElucHV0RG9uZShJbnB1dCBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5Nb3ZlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBNb3ZlVHlwZSBhcmcxID0gKE1vdmVUeXBlKWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJJTlBVVFRFRDFcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVySGFuZEZpeGVkLkNvbnRhaW5zKGFyZzEpIHx8IHBsYXllckhhbmRVbmZpeGVkLkNvbnRhaW5zKGFyZzEpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIklOUFVUVEVEMlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlQ2hvc2VuKGFyZzEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT0gSW5wdXRUeXBlLk1pc2NCYXR0bGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1pc2NCYXR0bGVJbnB1dCBtaXNjID0gKE1pc2NCYXR0bGVJbnB1dClpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1pc2MgPT0gTWlzY0JhdHRsZUlucHV0LlJlZG8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlLm1vdmVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLm1vdmVzW2ldID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdmVzW2ldID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludCB2YWx1ZSA9IGUubW92ZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAtMSB8fCBpID09IGJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaSAtIDFdID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobWlzYyA9PSBNaXNjQmF0dGxlSW5wdXQuRG9uZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgQmF0dGxlRGVjaWRlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgaGVyb2VzID0gMDtcclxuICAgICAgICAgICAgaW50IGVuZW1pZXMgPSAwO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLmhlcm8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuQWxpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9lcysrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLkFsaXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVtaWVzKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGhlcm9lcyA9PSAwIHx8IGVuZW1pZXMgPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE1vdmVDaG9zZW4oTW92ZVR5cGUgbW92ZVR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLmhlcm8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlLm1vdmVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCB2YWx1ZSA9IGUubW92ZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdmVzW2ldID0gKGludCkgbW92ZVR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEV4ZWN1dGVNb3ZlcygpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiYmxhXCIgKyBiYXR0bGVTdGF0ZS50dXJuLlZhbCk7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5SZWFkKCk7XHJcbiAgICAgICAgICAgIEJhdHRsZUVudGl0eSBhdHRhY2tlciA9IGVudGl0aWVzW2JhdHRsZVN0YXRlLmFjdGluZ0VudGl0eV07XHJcbiAgICAgICAgICAgIGludCB0dXJuID0gYmF0dGxlU3RhdGUudHVybjtcclxuICAgICAgICAgICAgRXhlY3V0ZU1vdmUoYXR0YWNrZXIsIHR1cm4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRXhlY3V0ZU1vdmUoQmF0dGxlRW50aXR5IGFjdG9yLCBpbnQgdHVybilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1vdmVEYXRhRXhlY3V0ZXIuRXhlY3V0ZU1vdmUoYWN0b3IsIHR1cm4pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBDYWxjdWxhdGVBdHRhY2tNdWx0aXBsaWVyKEJhdHRsZUVudGl0eSBhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBiYXNlRCA9IGFjdG9yLmRhbWFnZU11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZSAhPSBhY3RvcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5wb3MgPT0gYWN0b3IucG9zKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLnBhbmVsZWZmZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlRCAqPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlRDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgQ2FsY3VsYXRlRGVmZW5kZXJNdWx0aXBsaWVyKEJhdHRsZUVudGl0eSBhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBiYXNlRCA9IDE7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZSAhPSBhY3RvcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5wb3MgPT0gYWN0b3IucG9zKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLnBhbmVsZWZmZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlRCAqPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVTdGF0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIFZhbHVlIHR1cm4gPSBuZXcgVmFsdWUoKTtcclxuICAgICAgICAgICAgcHVibGljIGludCB0b3RhbFR1cm5zO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmFsdWUgdHVybnNQZXJQaGFzZSA9IG5ldyBWYWx1ZSgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmFsdWUgbW92ZVRpY2tfTm93ID0gbmV3IFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgbW92ZVRpY2tfVG90YWwgPSAwO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IGFjdGluZ0VudGl0eSA9IDA7XHJcbiAgICAgICAgICAgIHB1YmxpYyBCYXR0bGVQaGFzZSBwaGFzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVFbnRpdHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgbGlmZTtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIHBvcyA9IG5ldyBWZWN0b3IyRCgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgbWluUG9zID0gbmV3IFZlY3RvcjJEKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBtYXhQb3MgPSBuZXcgVmVjdG9yMkQoKTtcclxuICAgICAgICAgICAgcHVibGljIGludFtdIG1vdmVzID0gbmV3IGludFsxMF07XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgZ3JhcGhpYztcclxuICAgICAgICAgICAgcHVibGljIGludCBncmFwaGljUmVwZWF0ZWRJbmRleDtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IGRhbWFnZU11bHRpcGxpZXIgPSAxO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBib29sIGRyYXdMaWZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgYm9vbCBkcmF3VHVybiA9IHRydWU7XHJcbiAgICAgICAgICAgIGludGVybmFsIGJvb2wgcmFuZG9tUG9zaXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgcHVibGljIEVsZW1lbnQgZWxlbWVudCA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgaW50IG1heExpZmUgPSAzO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEVudGl0eVR5cGUgVHlwZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBQb3NpdGlvblYyRCB7IGdldCB7IHJldHVybiBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKHBvcy5YLCBwb3MuWSk7IH0gfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGJvb2wgRGVhZCB7IGdldCB7IHJldHVybiBsaWZlIDw9IDA7IH0gfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGJvb2wgQWxpdmUgeyBnZXQgeyByZXR1cm4gIXRoaXMuRGVhZDsgfSB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gTW92ZVR5cGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERvTm90aGluZyxcclxuICAgICAgICAgICAgTW92ZVVwLFxyXG4gICAgICAgICAgICBNb3ZlTGVmdCxcclxuICAgICAgICAgICAgTW92ZURvd24sXHJcbiAgICAgICAgICAgIE1vdmVSaWdodCxcclxuICAgICAgICAgICAgTm9ybWFsU2hvdCxcclxuICAgICAgICAgICAgRmlyZSxcclxuICAgICAgICAgICAgSWNlLFxyXG4gICAgICAgICAgICBUaHVuZGVyLFxyXG4gICAgICAgICAgICBJY2VCb21iLFxyXG4gICAgICAgICAgICBUaHVuZGVyQm9tYixcclxuICAgICAgICAgICAgU3VtbW9uRW50aXR5XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBIYXBwVGFnXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBdHRhY2tIaXQsXHJcbiAgICAgICAgICAgIEF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIERhbWFnZVRha2VuLFxyXG4gICAgICAgICAgICBNb3ZlbWVudEZhaWxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEJhdHRsZVBoYXNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbmVteU1vdmVDaG9pY2UsXHJcbiAgICAgICAgICAgIEhhbmRSZWNoYXJnZSxcclxuICAgICAgICAgICAgUGlja0hhbmRzLFxyXG4gICAgICAgICAgICBFeGVjdXRlTW92ZSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEVudGl0eVR5cGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGhlcm8sIGVuZW15LCBwaWNrdXAsIHBhbmVsZWZmZWN0XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBFbGVtZW50XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGaXJlLCBJY2UsIFRodW5kZXIsXHJcbiAgICAgICAgICAgIE5vbmVcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBpbnQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0JvYXJkV2lkdGg9Njtwcml2YXRlIGludCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQm9hcmRIZWlnaHQ9Mzt9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVmFsdWVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgVmFsIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudW0gdmFsQXNFbnVtIHsgc2V0IHsgVmFsID0gQ29udmVydC5Ub1NpbmdsZSh2YWx1ZSk7IH0gfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldChpbnQgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZhbCA9IHY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZhbHVlIG9wZXJhdG9yICsoVmFsdWUgYzEsIGZsb2F0IGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYzEuVmFsICs9IGMyO1xyXG4gICAgICAgICAgICByZXR1cm4gYzE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IG9wZXJhdG9yIC0oVmFsdWUgYzEsIGZsb2F0IGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGMxLlZhbCAtIGMyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFZhbHVlIGMxLCBWYWx1ZSBjMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJvb2wgYzJudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMiwgbnVsbCk7XHJcbiAgICAgICAgICAgIGJvb2wgYzFudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmIChjMm51bGwgJiYgYzFudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGlmIChjMW51bGwgfHwgYzJudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGMxLlZhbCA9PSBjMi5WYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oVmFsdWUgYzEsIFZhbHVlIGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYm9vbCBjMm51bGwgPSBvYmplY3QuUmVmZXJlbmNlRXF1YWxzKGMyLCBudWxsKTtcclxuICAgICAgICAgICAgYm9vbCBjMW51bGwgPSBvYmplY3QuUmVmZXJlbmNlRXF1YWxzKGMxLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKGMybnVsbCAmJiBjMW51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChjMW51bGwgfHwgYzJudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYzEuVmFsICE9IGMyLlZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW1wbGljaXQgb3BlcmF0b3IgZmxvYXQoVmFsdWUgZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBkLlZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW1wbGljaXQgb3BlcmF0b3IgaW50KFZhbHVlIGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludClkLlZhbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIEJhdHRsZVJlc3VsdFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdHJ1Y3QgQmF0dGxlQmFzaWNDb25maWdcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IG5FbmVtaWVzO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgblR1cm5zO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlQmFzaWNDb25maWcoaW50IG5FbmVtaWVzLCBpbnQgblR1cm5zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5uRW5lbWllcyA9IG5FbmVtaWVzO1xyXG4gICAgICAgICAgICB0aGlzLm5UdXJucyA9IG5UdXJucztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0cnVjdCBJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBJbnB1dFR5cGUgdHlwZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGFyZzE7XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIElucHV0KElucHV0VHlwZSB0eXBlLCBpbnQgYXJnMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuYXJnMSA9IGFyZzE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSW5wdXQoSW5wdXRUeXBlIHR5cGUsIEVudW0gYXJnMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuYXJnMSA9IENvbnZlcnQuVG9JbnQzMihhcmcxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gSW5wdXRUeXBlXHJcbiAgICB7XHJcbiAgICAgICAgTm9uZSwgTW92ZSwgTWlzY0JhdHRsZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIE1pc2NCYXR0bGVJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIERvbmUsIFJlZG9cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJhdHRsZVNldHVwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEVDU01hbmFnZXIgZWNzO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVNYWluIGJhdHRsZU1haW47XHJcbiAgICAgICAgcHVibGljIFRpbWVTdGFtcCB0aW1lU3RhbXA7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVTZXR1cChpbnQgbW9kZSwgQmF0dGxlQmFzaWNDb25maWcgYmF0dGxlQmFzaWNDb25maWcsIGludCBkaWZmaWN1bHR5LCBFQ1NNYW5hZ2VyIGVjcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICB0aW1lU3RhbXAgPSBuZXcgVGltZVN0YW1wKCk7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4gPSBuZXcgQmF0dGxlTWFpbihtb2RlLCBlY3MsIHRpbWVTdGFtcCk7XHJcbiAgICAgICAgICAgIHZhciBtY3AgPSBuZXcgTW92ZUNyZWF0b3JQcm9nKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhZ2VzID0gZWNzLlF1aWNrQWNjZXNzb3IxPFN0YWdlRGF0YT4oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaXhlZEF0dGFjayA9IHN0YWdlcy5FbnRpdHkoZGlmZmljdWx0eSkuR2V0Q29tcG9uZW50PEZpeGVkQXR0YWNrU3RhZ2U+KCk7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJIYW5kUG9vbCA9IGJhdHRsZU1haW4ucGxheWVySGFuZFBvb2w7XHJcbiAgICAgICAgICAgIGlmIChmaXhlZEF0dGFjayAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGZpeGVkQXR0YWNrLm1vdmVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZCgoQmF0dGxlTWFpbi5Nb3ZlVHlwZSlpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFBvb2wuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlKTtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzdGFnZSA9IHN0YWdlcy5Db21wMShkaWZmaWN1bHR5KTtcclxuICAgICAgICAgICAgdmFyIGVubXlzID0gc3RhZ2UuZW5lbXlTcGF3bnM7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGVubXlzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5Nb3ZlRGF0YUV4ZWN1dGVyID0gbmV3IE1vdmVEYXRhRXhlY3V0ZXIoYmF0dGxlTWFpbiwgbWNwLm1vdmVEYXRhcywgZWNzLCB0aW1lU3RhbXApO1xyXG5cclxuICAgICAgICAgICAgTGlzdDxzdHJpbmc+IGVudGl0eVJlbmRlclRleHRzID0gbmV3IExpc3Q8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVuZW15RGF0YXMgPSBuZXcgRW5lbXlEYXRhQ3JlYXRvcihlbnRpdHlSZW5kZXJUZXh0cyxtY3ApLmVuZW15RGF0YXM7XHJcbiAgICAgICAgICAgIHZhciBiYXR0bGVTdGF0ZSA9IGJhdHRsZU1haW4uYmF0dGxlU3RhdGU7XHJcblxyXG4gICAgICAgICAgICBiYXR0bGVNYWluLkJhc2ljQ29uZmlnKGJhc2ljQ29uZmlnOmJhdHRsZUJhc2ljQ29uZmlnKTtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5CYXR0bGVDb25maWd1cmUoc3RhZ2UuYmF0dGxlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlbmVteUZhY3RvcnkgPSBuZXcgU3Bhd25FbnRpdHlGYWN0b3J5KGVjcywgZW5lbXlEYXRhcywgYmF0dGxlTWFpbik7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uZWNzSW50ZWcgPSBuZXcgRUNTSW50ZWdyYXRpb24oZW5lbXlGYWN0b3J5LCBlY3MpO1xyXG4gICAgICAgICAgICAvL2JhdHRsZU1haW4uRW5lbXlGYWN0b3J5ID0gZW5lbXlGYWN0b3J5O1xyXG5cclxuICAgICAgICAgICAgdmFyIGVuZW15QWlzID0gZWNzLlF1aWNrQWNjZXNzb3IyPEVuZW15QUksIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5PigpO1xyXG4gICAgICAgICAgICB2YXIgZW5lbXlBaVN0YXRlbGVzcyA9IGVjcy5DcmVhdGVBY2Nlc3NvcihuZWNlc3Nhcnk6IG5ldyBUeXBlW10geyB0eXBlb2YoRW5lbXlBSSkgfSwgbm90OiBuZXcgVHlwZVtdIHsgdHlwZW9mKEVuZW15QUlTdGF0ZSkgfSk7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uRW5lbXlHZW5lcmF0ZU1vdmVzID0gKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGVuZW15QWlTdGF0ZWxlc3MuTGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmVteUFpU3RhdGVsZXNzLkdldCgwKS5BZGRDb21wb25lbnQ8RW5lbXlBSVN0YXRlPigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZW5lbXlBaXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFpID0gZW5lbXlBaXMuQ29tcDEoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJhdHRsZXIgPSBlbmVteUFpcy5Db21wMihpKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWlTdGF0ZSA9IGVuZW15QWlzLkVudGl0eShpKS5HZXRDb21wb25lbnQ8RW5lbXlBSVN0YXRlPigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtb3ZlcyA9IGFpLm1vdmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZTsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGFpUHJvID0gKGorIGFpU3RhdGUucHJvZ3Jlc3MpICUgbW92ZXMuQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb3ZlID0gbW92ZXNbYWlQcm9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92ZSBpcyBNb3ZlVXNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlci5tb3Zlc1tqXSA9IChtb3ZlIGFzIE1vdmVVc2UpLm1vdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9iZS5tb3Zlc1tqXSA9IDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYWlTdGF0ZS5wcm9ncmVzcyArPSBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gZGF0YSB0aGF0IHdpbGwgYmUgYSBwYXJ0IG9mIHN0YWdlZGF0YSBzbyBlYWNoIHN0YWdlIGNhbiBoYXZlIGl0J3MgY29uZmlnXHJcbiAgICAvLy8gSXQgd2lsbCBhbHNvIGJlIGNvbnRhaW5lZCBpbiBiYXR0bGVtYWluLlxyXG4gICAgLy8vIFNob3VsZCBiZSBzdGF0aWMsIG9uY2UgY3JlYXRlZC5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgQmF0dGxlQ29uZmlnXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IExpc3Q8aW50PiBlbmVtaWVzVG9TdW1tb24gPW5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBuZWVkS2lsbEFsbEVuZW1pZXMgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVDb25maWcoaW50W10gZW5lbWllc1RvU3VtbW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzVG9TdW1tb24uQWRkUmFuZ2UoZW5lbWllc1RvU3VtbW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVDb25maWcoYm9vbCBuZWVkS2lsbEFsbEVuZW1pZXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5lZWRLaWxsQWxsRW5lbWllcyA9IG5lZWRLaWxsQWxsRW5lbWllcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDb2xvclN0dWZmXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgc3RyaW5nIEdvb2RNYWluO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIG5ldXRyYWxEYXJrID0gXCIjMTkwMTNiXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgbmV1dHJhbFN0cm9uZyA9IFwiIzJjM2U0M1wiO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHN0cmluZyBHb29kU3ViO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHN0cmluZyBFdmlsTWFpbjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZ1tdIGNvbG9ycyA9IG5ldyBzdHJpbmdbMjBdO1xyXG5cclxuICAgICAgICBzdGF0aWMgQ29sb3JTdHVmZigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvbG9ycy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sb3JzW2ldID0gXCIjMUExQTFBXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkhlcm9dID0gXCIjMDA5YzhkXCI7XHJcbiAgICAgICAgICAgIC8vY29uc3Qgc3RyaW5nIGhlcm9TdWIgPSBcIiMwMDVmOTFcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkhlcm9UdXJuXSA9IGhlcm9TdWI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5FbmVteV0gPSBcIiNmZjAzNTNcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkdyaWRIZXJvXSA9IGhlcm9TdWI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEVuZW15XSA9IFwiIzhlMDA2MFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15VHVybl0gPSBcIiM4ZTAwNjBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5Cb2FyZF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5pbnB1dEtleV0gPSBcIiM2ODg2OTBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5GaXJlQXVyYV0gPSBcIiM3OTMxMDBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5JY2VBdXJhXSA9IFwiIzAwNTU5MFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJBdXJhXSA9IFwiIzAwNTgzZFwiO1xyXG5cclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dID0gXCIjOGFkODk2XCI7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyBoZXJvU3ViID0gXCIjNGM2ZDUwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvVHVybl0gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXldID0gXCIjZmY3Njk0XCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVyb10gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgZW5lbXlzdWIgPSBcIiNhNzQ2NGZcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRFbmVteV0gPSBlbmVteXN1YjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15VHVybl0gPSBlbmVteXN1YjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQm9hcmRdID0gXCIjMWU0ODZlXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLmlucHV0S2V5XSA9IFwiIzY4ODY5MFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuRmlyZUF1cmFdID0gXCIjNzkzMTAwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkljZUF1cmFdID0gXCIjMDA1NTkwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJBdXJhXSA9IFwiIzAwNTgzZFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5GaXJlU2hvdF0gPSBcIiNmODJiMzZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuSWNlU2hvdF0gPSBcIiMwMDdlZmZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuVGh1bmRlclNob3RdID0gXCIjYTM3YzAwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkJhY2tncm91bmRJbnB1dF0gPSBcIiMwODA4MDhcIjtcclxuXHJcblxyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5pbnB1dEtleV0gPSBcIiM5RTg2NjRcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuSW5wdXREZXNjcmlwdGlvbl0gPSBcIiM4MDgwODBcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQmFja0JhdHRsZV0gPSBcIiMwMDAwMDBcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQmFja2dyb3VuZElucHV0XSA9IFwiIzFBMUExQVwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb1R1cm5dID0gXCIjMDBCMkIyXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteVR1cm5dID0gXCIjRkYwMDQwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkRW5lbXldID0gXCIjMDA0NjhDXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVyb10gPSBcIiM4QzAwMjNcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dID0gXCIjNjZGRkZGXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteV0gPSBcIiNEOTAwMzZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuV2luZG93TGFiZWxdID0gXCIjNjY2NjY2XCI7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuRGVidWdFeHRyYVxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIERlYnVnRXhcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgTGlzdDxzdHJpbmc+IG1lc3NhZ2VzID0gbmV3IExpc3Q8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTG9nKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWVzc2FnZXMuQWRkKHYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFNob3coKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29uc29sZS5DbGVhcigpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBtZXNzYWdlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDb25zb2xlLlJlYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBpbnRlcm5hbCBjbGFzcyBFQ1NJbnRlZ3JhdGlvblxyXG4gICAge1xyXG5cclxuICAgICAgICBTcGF3bkVudGl0eUZhY3RvcnkgZW5lbXlGYWN0b3J5O1xyXG4gICAgICAgIEVDU01hbmFnZXIgZWNzO1xyXG5cclxuICAgICAgICBwdWJsaWMgRUNTSW50ZWdyYXRpb24oU3Bhd25FbnRpdHlGYWN0b3J5IGVuZW15RmFjdG9yeSwgRUNTTWFuYWdlciBlY3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15RmFjdG9yeSA9IGVuZW15RmFjdG9yeTtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEhlcm9DcmVhdGVkKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGhlcm8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU3Bhd25FbmVtaWVzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVuZW15RmFjdG9yeS5TcGF3bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRW5lbXlBSVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBMaXN0PG9iamVjdD4gbW92ZXMgPSBuZXcgTGlzdDxvYmplY3Q+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEVuZW15QUlTdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgcHJvZ3Jlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIExvb3BcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxvYmplY3Q+IGFjdGlvbnMgPSBuZXcgTGlzdDxvYmplY3Q+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdmVVc2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IG1vdmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlVXNlKGludCBtb3ZlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlID0gbW92ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFNwYXduRW50aXR5RmFjdG9yeVxyXG4gICAge1xyXG5cclxuICAgICAgICBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBMaXN0PEVuZW15RGF0YT4gZW5lbXlEYXRhcztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEJhdHRsZU1haW4gYmF0dGxlTWFpbjtcclxuICAgICAgICBwcml2YXRlIFF1aWNrQWNjZXNzb3JPbmU8U3Bhd25EYXRhPiBzcGF3bnM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTcGF3bkVudGl0eUZhY3RvcnkoRUNTTWFuYWdlciBlY3MsIExpc3Q8RW5lbXlEYXRhPiBlbmVteURhdGFzLCBCYXR0bGVNYWluIGJhdHRsZU1haW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuICAgICAgICAgICAgLy9lY3MuUXVpY2tBY2Nlc3NvcjE8RW5lbXlEYXRhPigpO1xyXG4gICAgICAgICAgICBzcGF3bnMgPSBlY3MuUXVpY2tBY2Nlc3NvcjE8U3Bhd25EYXRhPigpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15RGF0YXMgPSBlbmVteURhdGFzO1xyXG4gICAgICAgICAgICB0aGlzLmJhdHRsZU1haW4gPSBiYXR0bGVNYWluO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU3Bhd24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHNwYXduZWQgPSAwO1xyXG4gICAgICAgICAgICAvL2ZvciAoaW50IGkgPSAwOyBpIDwgc3Bhd25zLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHdoaWxlIChzcGF3bnMuQ291bnQgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTcGF3bkRhdGEgc3Bhd24gPSBzcGF3bnMuQ29tcDEoMCk7XHJcbiAgICAgICAgICAgICAgICBzcGF3bnMuRW50aXR5KDApLlJlbW92ZUNvbXBvbmVudChzcGF3bik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSBzcGF3bi5pZDtcclxuICAgICAgICAgICAgICAgIEJhdHRsZU1haW4uRW50aXR5VHlwZSBlbnRUeXBlID0gKEJhdHRsZU1haW4uRW50aXR5VHlwZSlzcGF3bi5lbnRpdHlUeXBlO1xyXG4gICAgICAgICAgICAgICAgaWYoZW50VHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUucGlja3VwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBiZSA9IGJhdHRsZU1haW4uTmV3QmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUuVHlwZSA9IGVudFR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgUGlja3VwSW5mbyBwaWNrdXAgPSBuZXcgUGlja3VwSW5mbyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGlja3VwRSA9IGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KHBpY2t1cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGlja3VwRS5BZGRDb21wb25lbnQoYmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLnBvcyA9IHNwYXduLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLmxpZmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLm1heExpZmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLmRyYXdMaWZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUuZHJhd1R1cm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5ncmFwaGljID0gNDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChlbnRUeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5lbXlBSSA9IGVuZW15RGF0YXNbaWRdLmVuZW15QUk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZW15ID0gZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQoZW5lbXlBSSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJlID0gYmF0dGxlTWFpbi5OZXdCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5wb3MgPSBzcGF3bi5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBiZS5saWZlID0gZW5lbXlEYXRhc1tpZF0uaHA7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUubWF4TGlmZSA9IGJlLmxpZmU7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUuZ3JhcGhpYyA9IGVuZW15RGF0YXNbaWRdLnJlbmRlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW50aXRpZXMgPSBiYXR0bGVNYWluLmVudGl0aWVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT0gYmUgJiYgaXRlbS5ncmFwaGljID09IGJlLmdyYXBoaWMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlLmdyYXBoaWNSZXBlYXRlZEluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYmUubWluUG9zID0gbmV3IFZlY3RvcjJEKDMsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLm1heFBvcyA9IG5ldyBWZWN0b3IyRCg1LCAyKTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5UeXBlID0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15O1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZW15LkFkZENvbXBvbmVudChiZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5lbXlBSVN0YXRlIGVuZW15QWlTdGF0ZSA9IG5ldyBFbmVteUFJU3RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBlbmVteUFpU3RhdGUucHJvZ3Jlc3MgPSBzcGF3bmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZW15LkFkZENvbXBvbmVudChlbmVteUFpU3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIlNQQVdOXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwYXduZWQrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUGlja3VwSW5mb1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBib29sIG5lY2Vzc2FyeUZvclZpY3Rvcnk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBQaWNrdXBJbmZvKGJvb2wgbmVjZXNzYXJ5Rm9yVmljdG9yeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubmVjZXNzYXJ5Rm9yVmljdG9yeSA9IG5lY2Vzc2FyeUZvclZpY3Rvcnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBFbmVteURhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgRW5lbXlBSSBlbmVteUFJO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgaHA7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCByZW5kZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmVteURhdGEoRW5lbXlBSSBlbmVteUFJLCBpbnQgaHAsIGludCByZW5kZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15QUkgPSBlbmVteUFJO1xyXG4gICAgICAgICAgICB0aGlzLmhwID0gaHA7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyID0gcmVuZGVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRW5lbXlEYXRhQ3JlYXRvclxyXG4gICAge1xyXG4gICAgICAgIExpc3Q8c3RyaW5nPiByZW5kZXJUZXh0cztcclxuICAgICAgICBwdWJsaWMgTGlzdDxFbmVteURhdGE+IGVuZW15RGF0YXMgPSBuZXcgTGlzdDxFbmVteURhdGE+KCk7XHJcbiAgICAgICAgTW92ZUNyZWF0b3JQcm9nIG1vdmVDcmVhdG9yUHJvZztcclxuXHJcbiAgICAgICAgcHVibGljIEVuZW15RGF0YUNyZWF0b3IoTGlzdDxzdHJpbmc+IHJlbmRlclRleHRzLCBNb3ZlQ3JlYXRvclByb2cgbW92ZUNyZWF0b3JQcm9nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJUZXh0cyA9IHJlbmRlclRleHRzO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDcmVhdG9yUHJvZyA9IG1vdmVDcmVhdG9yUHJvZztcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcbiAgICAgICAgICAgICAgICBNb3ZlcyhQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93biwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0LCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXAsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIpXHJcbiAgICAgICAgICAgICAgICApLCBocDoyLCByZW5kZXJUZXh0OlwiJVwiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcbiAgICAgICAgICAgICAgICBNb3ZlcyhQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb05vdGhpbmcsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZylcclxuICAgICAgICAgICAgICAgICksIGhwOiAzLCByZW5kZXJUZXh0OiBcIiNcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAgICBNb3ZlcyhcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXJCb21iLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLk1vdmVSaWdodFxyXG4gICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICApLCBocDogNiwgcmVuZGVyVGV4dDogXCImXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYixcclxuICAgICAgICAgICAgICAgICAgIFwiU3VtbW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXJCb21iLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLkZpcmVcclxuXHJcblxyXG4gICAgICAgICAgICAgICApLCBocDogNDUsIHJlbmRlclRleHQ6IFwiJFwiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93bixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24sXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVxyXG4uTW92ZVVwXHJcblxyXG5cclxuICAgICAgICAgICAgICAgKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiSFwiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcblxyXG4gICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuSWNlLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLkRvTm90aGluZ1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICApLCBocDogMywgcmVuZGVyVGV4dDogXCJKXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZyxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlXHJcbi5Eb05vdGhpbmdcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiTFwiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcblxyXG4gICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZyxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlXHJcbi5Eb05vdGhpbmdcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiS1wiKTtcclxuICAgICAgICAgICAgLy9BZGRFbmVteShhaTogQWN0aW9ucygpLCBocDogMywgcmVuZGVyVGV4dDogXCIkXCIpO1xyXG4gICAgICAgICAgICAvL0FkZEVuZW15KGFpOiBBY3Rpb25zKCksIGhwOiA1LCByZW5kZXJUZXh0OiBcIiNcIik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBFbmVteUFJIEFjdGlvbnMocGFyYW1zIG9iamVjdFtdIG9icylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBhaSA9IG5ldyBFbmVteUFJKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbyBpbiBvYnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChvIGlzIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpLm1vdmVzLkFkZChuZXcgTW92ZVVzZSgoaW50KW8pKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChvIGlzIHN0cmluZylcclxuICAgICAgICAgICAgICAgIHsgICBcclxuICAgICAgICAgICAgICAgICAgICBhaS5tb3Zlcy5BZGQobmV3IE1vdmVVc2UobW92ZUNyZWF0b3JQcm9nLkdldE1vdmVJZChvIGFzIHN0cmluZykpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChvIGlzIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlW10pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbyBhcyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVtdKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWkubW92ZXMuQWRkKG5ldyBNb3ZlVXNlKChpbnQpaXRlbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFpLm1vdmVzLkFkZChvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlW10gTW92ZXMocGFyYW1zIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlW10gbW92ZXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbW92ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkRW5lbXkoRW5lbXlBSSBhaSwgaW50IGhwLCBzdHJpbmcgcmVuZGVyVGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCByZW5kZXIgPSByZW5kZXJUZXh0cy5Db3VudDtcclxuICAgICAgICAgICAgcmVuZGVyVGV4dHMuQWRkKHJlbmRlclRleHQpO1xyXG4gICAgICAgICAgICBlbmVteURhdGFzLkFkZChuZXcgRW5lbXlEYXRhKGFpLCBocCwgcmVuZGVyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFN0YWdlRGF0YUNyZWF0b3JcclxuICAgIHtcclxuICAgICAgICAvL3B1YmxpYyBMaXN0PFN0YWdlRGF0YT4gc3RhZ2VzID0gbmV3IExpc3Q8U3RhZ2VEYXRhPigpO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgRUNTTWFuYWdlciBlY3M7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFnZURhdGFDcmVhdG9yKEVDU01hbmFnZXIgZWNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIEFkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIDApKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDIsIDIpKVxyXG4gICAgICAgICAgICAgICAgKS5IaWRlTGlmZVVJKCksIG5ldyBGaXhlZEF0dGFja1N0YWdlKCkpO1xyXG4gICAgICAgICAgICBBZGQobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgICBuZXcgQmF0dGxlQ29uZmlnKG5lZWRLaWxsQWxsRW5lbWllczpmYWxzZSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgyLCAxKSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgwLCAyKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSg0LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKVxyXG4gICAgICAgICAgICAgICAgKS5IaWRlTGlmZVVJKCksIG5ldyBGaXhlZEF0dGFja1N0YWdlKCkpO1xyXG4gICAgICAgICAgICBBZGQobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgICBuZXcgQmF0dGxlQ29uZmlnKG5lZWRLaWxsQWxsRW5lbWllczogZmFsc2UpLFxyXG4gICAgICAgICAgICAgICAgUGlja3VwKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMiwgMikpLFxyXG4gICAgICAgICAgICAgICAgUGlja3VwKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMSwgMikpLFxyXG4gICAgICAgICAgICAgICAgUGlja3VwKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMCwgMikpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoNSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAyKSlcclxuICAgICAgICAgICAgICAgICksIG5ldyBGaXhlZEF0dGFja1N0YWdlKCkpO1xyXG4gICAgICAgICAgICBBZGQobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSg2LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDApKVxyXG4gICAgICAgICAgICAgICAgKSwgbmV3IEZpeGVkQXR0YWNrU3RhZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgKGludClCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpKTtcclxuICAgICAgICAgICAgQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgIEVuZW15KDQsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpXHJcbiAgICAgICAgICAgICAgICksIG5ldyBGaXhlZEF0dGFja1N0YWdlKFxyXG4gICAgICAgICAgICAgICAgICAgKGludClCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpKTtcclxuICAgICAgICAgICAgQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgIEVuZW15KDUsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpXHJcbiAgICAgICAgICAgICAgICksIG5ldyBGaXhlZEF0dGFja1N0YWdlKFxyXG4gICAgICAgICAgICAgICAgICAgKGludClCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUpKTtcclxuICAgICAgICAgICAgQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgLy9FbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDApKSxcclxuICAgICAgICAgICAgICBFbmVteSg1LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKSxcclxuICAgICAgICAgICAgICBFbmVteSg3LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDApKVxyXG4gICAgICAgICAgICAgICksIG5ldyBGaXhlZEF0dGFja1N0YWdlKFxyXG4gICAgICAgICAgICAgICAgICAoaW50KUJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSwgKGludClCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIgKSk7XHJcbiAgICAgICAgICAgIEFkZChcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIEVuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMCkpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAyKSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICBFbmVteSgxLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDIpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDIsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAgbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIEVuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICBFbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDIpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDIsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMSkpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMiwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEJhdHRsZUNvbmZpZyhuZXcgaW50W10geyAxIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIEVuZW15KDMsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpXHJcbiAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgLy8sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8sXHJcbiAgICAgICAgICAgICAgICAvL25ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICAvL25ldyBFbmVteVNwYXduRGF0YSgxLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKSxcclxuICAgICAgICAgICAgICAgIC8vbmV3IEVuZW15U3Bhd25EYXRhKDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkKHBhcmFtcyBvYmplY3RbXSBjb21wcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZSA9IGVjcy5DcmVhdGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gY29tcHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGUuQWRkQ29tcG9uZW50KGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBTcGF3bkRhdGEgUGlja3VwKGludCB2LCBWZWN0b3IyRCB2ZWN0b3IyRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3Bhd25EYXRhKHYsIHZlY3RvcjJELCAoaW50KUJhdHRsZU1haW4uRW50aXR5VHlwZS5waWNrdXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBTcGF3bkRhdGEgRW5lbXkoaW50IHYsIFZlY3RvcjJEIHZlY3RvcjJEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTcGF3bkRhdGEodiwgdmVjdG9yMkQsIChpbnQpQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZGQocGFyYW1zIFN0YWdlRGF0YVtdIHN0YWdlRGF0YTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBzdGFnZURhdGExKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3N0YWdlcy5BZGRSYW5nZShzdGFnZURhdGExKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFN0YWdlRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PFNwYXduRGF0YT4gZW5lbXlTcGF3bnMgPSBuZXcgTGlzdDxTcGF3bkRhdGE+KCk7XHJcbiAgICAgICAgcHVibGljIEJhdHRsZUNvbmZpZyBiYXR0bGVDb25maWc7XHJcbiAgICAgICAgcHVibGljIGJvb2wgaGlkZUxpZmVVSSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgU3RhZ2VEYXRhKHBhcmFtcyBTcGF3bkRhdGFbXSBzcGF3bnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbmVteVNwYXducy5BZGRSYW5nZShzcGF3bnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlRGF0YShCYXR0bGVDb25maWcgYmF0dGxlQ29uZmlnLCBwYXJhbXMgU3Bhd25EYXRhW10gc3Bhd25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW5lbXlTcGF3bnMuQWRkUmFuZ2Uoc3Bhd25zKTtcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVDb25maWcgPSBiYXR0bGVDb25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhZ2VEYXRhIEhpZGVMaWZlVUkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaGlkZUxpZmVVSSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgRml4ZWRBdHRhY2tTdGFnZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PGludD4gbW92ZXMgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBGaXhlZEF0dGFja1N0YWdlKGludCBtb3ZlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW92ZXMuQWRkKG1vdmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEZpeGVkQXR0YWNrU3RhZ2UocGFyYW1zIGludFtdIG1vdmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3Zlcy5BZGRSYW5nZShtb3ZlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBGaXhlZEF0dGFja1N0YWdlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBTcGF3bkRhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGlkO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgZW50aXR5VHlwZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQmFzZVV0aWxzLlZlY3RvcjJEIHBvc2l0aW9uO1xyXG5cclxuICAgICAgICBwdWJsaWMgU3Bhd25EYXRhKGludCBpZCwgVmVjdG9yMkQgcG9zaXRpb24sIGludCB0eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXR5VHlwZSA9IHR5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5IYXBwcztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1vdmVEYXRhRXhlY3V0ZXJcclxuICAgIHtcclxuICAgICAgICBCYXR0bGVNYWluIGJhdHRsZU1haW47XHJcbiAgICAgICAgTGlzdDxNb3ZlRGF0YT4gbW92ZURhdGFzO1xyXG4gICAgICAgIHByaXZhdGUgSGFwcE1hbmFnZXIgaGFwcE1hbmFnZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PEJhdHRsZU1haW4uQmF0dGxlRW50aXR5PiBlbnRpdGllcztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEVDU01hbmFnZXIgZWNzO1xyXG4gICAgICAgIFRpbWVTdGFtcCB0aW1lU3RhbXA7XHJcbiAgICAgICAgTGlzdDxWZWN0b3IyRD4gYXV4ID0gbmV3IExpc3Q8VmVjdG9yMkQ+KCk7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZURhdGFFeGVjdXRlcihCYXR0bGVNYWluIHR1cm5CYXNlLCBMaXN0PE1vdmVEYXRhPiBtb3ZlRGF0YXMsIEVDU01hbmFnZXIgZWNzLCBUaW1lU3RhbXAgdGltZVN0YW1wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVNYWluID0gdHVybkJhc2U7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZURhdGFzID0gbW92ZURhdGFzO1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuICAgICAgICAgICAgdGhpcy50aW1lU3RhbXAgPSB0aW1lU3RhbXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFeGVjdXRlTW92ZShCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBhY3RvciwgaW50IHR1cm4pXHJcbiAgICAgICAge1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBiYXR0bGVTdGF0ZSA9IHRoaXMuYmF0dGxlTWFpbi5iYXR0bGVTdGF0ZTtcclxuICAgICAgICAgICAgZW50aXRpZXMgPSB0aGlzLmJhdHRsZU1haW4uZW50aXRpZXM7XHJcbiAgICAgICAgICAgIGludCB1c2VySWQgPSBlbnRpdGllcy5JbmRleE9mKGFjdG9yKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtb3ZlSWQgPSBhY3Rvci5tb3Zlc1t0dXJuXTtcclxuICAgICAgICAgICAgaWYgKG1vdmVJZCA8IDApIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIG1kID0gbW92ZURhdGFzW21vdmVJZF07XHJcbiAgICAgICAgICAgIGlmIChtZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsID0gbWQudW5pdHMuQ291bnQ7XHJcbiAgICAgICAgICAgIGludCBtb3ZlVGljayA9IGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdztcclxuICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtZC51bml0c1ttb3ZlVGlja10udGhpbmdzVG9IYXBwZW47XHJcbiAgICAgICAgICAgIGhhcHBNYW5hZ2VyID0gYmF0dGxlTWFpbi5oYXBwTWFuYWdlcjtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGEgaW4gYWN0aW9ucylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhIGlzIE1vdmVBY3Rpb24pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZUFjdGlvbiBtYSA9IGEgYXMgTW92ZUFjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IG1hLmRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdG9yLnBvcyArPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgaW52YWxpZE1vdmUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5wb3MuWCA8IGFjdG9yLm1pblBvcy5YXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGFjdG9yLnBvcy5ZIDwgYWN0b3IubWluUG9zLllcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgYWN0b3IucG9zLlkgPiBhY3Rvci5tYXhQb3MuWVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhY3Rvci5wb3MuWCA+IGFjdG9yLm1heFBvcy5YO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUgIT0gYWN0b3IgJiYgZS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdG9yLnBvcyA9PSBlLnBvcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkTW92ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUucGlja3VwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5saWZlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3IuZGFtYWdlTXVsdGlwbGllciA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBhbmVsZWZmZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZE1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGludmFsaWRNb3ZlKSBicmVhaztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkTW92ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJJbnZhbGlkIG1vdmUgZ2VuZXJhdGVcIiArIGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdy5WYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGFjdG9ySWQgPSBlbnRpdGllcy5JbmRleE9mKGFjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3JlYXRlSGFwcChtZCwgbmV3IEhhcHBNb3ZlRGF0YShhY3RvcklkKSwgbmV3IEhhcHBNb3ZlbWVudEZhaWwoYWN0b3IucG9zKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlTWFpbi5oYXBwTWFuYWdlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLkFkZChuZXcgSGFwcChCYXR0bGVNYWluLkhhcHBUYWcuTW92ZW1lbnRGYWlsKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoYWN0b3JJZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKGFjdG9yLnBvcy5YKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoYWN0b3IucG9zLlkpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3IucG9zIC09IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGEgaXMgRGVhbERhbWFnZUFjdGlvbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGRhID0gYSBhcyBEZWFsRGFtYWdlQWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdHRhY2tFbGVtZW50ID0gZGRhLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRkYS50YXJnZXQgPT0gVGFyZ2V0LkFyZWEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJlYSA9IGRkYS5hcmVhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmZXJlbmNlVXNlck9mQXJlYSA9IFJlc29sdmVUYXJnZXQoYWN0b3IsIGVudGl0aWVzLCBhcmVhLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBtaXJyb3JpbmdYID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdG9yLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KSAvL2VuZW1pZXMgYWN0IG9uIG9wcG9zaXRlIHNpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlycm9yaW5nWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBwb2ludCBpbiBhcmVhLnBvaW50cylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaFBvcyA9IHBvaW50ICogbmV3IEJhc2VVdGlscy5WZWN0b3IyRChtaXJyb3JpbmdYLCAxKSArIHJlZmVyZW5jZVVzZXJPZkFyZWEucG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIlNlYXJjaCBwb2ludCBcIitzZWFyY2hQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdGllc1tpXS5wb3MgPT0gc2VhcmNoUG9zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVhbERhbWFnZShhY3RvciwgZGRhLCBlbnRpdGllc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ZpbmQgdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IHRhcmdldCA9IFJlc29sdmVUYXJnZXQoYWN0b3IsIGVudGl0aWVzLCBkZGEudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWFsRGFtYWdlKGFjdG9yLCBkZGEsIHRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGEgaXMgU3VtbW9uRW50aXR5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZSA9IGEgYXMgU3VtbW9uRW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmVteVdoaWNoID0gc2UuZW5lbXlXaGljaDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5lbXlJZCA9IGJhdHRsZU1haW4uQmF0dGxlQ29uZmlnLmVuZW1pZXNUb1N1bW1vbltlbmVteVdoaWNoXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW50aXRpZXMgPSBiYXR0bGVNYWluLmVudGl0aWVzO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbnMgPSBHZXRFbXB0eVNwb3RzKHNpZGU6MSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9ucy5Db3VudCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjJEIHN1bW1vblBvcyA9IHNlLnByZWZlcmVudGlhbFJvd0NvbHVtbjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBvc2l0aW9ucy5Db250YWlucyhzdW1tb25Qb3MpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbW9uUG9zID0gcG9zaXRpb25zWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChuZXcgU3Bhd25EYXRhKGVuZW15SWQsIHN1bW1vblBvcywgKGludClCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhIGlzIEFuaW1hdGlvbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYW5pbSA9IGEgYXMgQW5pbWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IHRhcmdldCA9IFJlc29sdmVUYXJnZXQoYWN0b3IsIGVudGl0aWVzLCBhbmltLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyZWEgPSBhbmltLmFyZWE7XHJcbiAgICAgICAgICAgICAgICAgICAgSGFwcEFyZWEgaGFwcEFyZWEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmVhICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmZXJlbmNlVXNlck9mQXJlYSA9IFJlc29sdmVUYXJnZXQoYWN0b3IsIGVudGl0aWVzLCBhcmVhLnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgbWlycm9yaW5nWCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rvci5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSkgLy9lbmVtaWVzIGFjdCBvbiBvcHBvc2l0ZSBzaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pcnJvcmluZ1ggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwQXJlYSA9IG5ldyBIYXBwQXJlYShhcmVhLCByZWZlcmVuY2VVc2VyT2ZBcmVhLnBvcywgbWlycm9yaW5nWCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGludCB0YXJnZXRJZCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSBlbnRpdGllcy5JbmRleE9mKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3JlYXRlSGFwcChtZCwgaGFwcEFyZWEsIG5ldyBIYXBwTW92ZURhdGEodXNlcklkLCB0YXJnZXRJZCwgYW5pbS5lbGVtZW50KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmltLnRhcmdldCAhPSBUYXJnZXQuTm9uZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBNYW5hZ2VyXHJcbi5BZGQobmV3IEhhcHAoQmF0dGxlTWFpbi5IYXBwVGFnLkF0dGFja0hpdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoZW50aXRpZXMuSW5kZXhPZih0YXJnZXQpKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZSh1c2VySWQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKChpbnQpYW5pbS5lbGVtZW50KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtb3ZlVGljayA9PSBtZC51bml0cy5Db3VudCAtIDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIG1kLnVuaXRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhY3QgaW4gaXRlbS50aGluZ3NUb0hhcHBlbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3QgaXMgRGVhbERhbWFnZUFjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbmdlRWxlbWVudChhY3RvciwgKGFjdCBhcyBEZWFsRGFtYWdlQWN0aW9uKS5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTGlzdDxWZWN0b3IyRD4gR2V0RW1wdHlTcG90cyhpbnQgc2lkZSA9IC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXV4LkNsZWFyKCk7XHJcbiAgICAgICAgICAgIGludCBvZmZYID0gMDtcclxuICAgICAgICAgICAgaWYgKHNpZGUgPT0gMSkgb2ZmWCA9IDM7XHJcbiAgICAgICAgICAgIGludCB3aWR0aCA9IGJhdHRsZU1haW4uQm9hcmRXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGlmIChzaWRlID09IC0xKVxyXG4gICAgICAgICAgICAgICAgd2lkdGggPSBiYXR0bGVNYWluLkJvYXJkV2lkdGg7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgd2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBiYXR0bGVNYWluLkJvYXJkSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5BZGQobmV3IFZlY3RvcjJEKGkrb2ZmWCxqKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGVudGl0aWVzID0gYmF0dGxlTWFpbi5lbnRpdGllcztcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLkFsaXZlICYmIGF1eC5Db250YWlucyhlLnBvcykpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LlJlbW92ZShlLnBvcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGF1eDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ2hhbmdlRWxlbWVudChCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBhY3RvciwgQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYWN0b3IuZWxlbWVudCA9PSBlbGVtZW50KSByZXR1cm47XHJcbiAgICAgICAgICAgIGFjdG9yLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB2YXIgdGggPSBuZXcgSGFwcFRhZ3MoKGludClNaXNjSGFwcFRhZ3MuQ2hhbmdlRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KHRoLCBuZXcgSGFwcE1vdmVEYXRhKGVudGl0aWVzLkluZGV4T2YoYWN0b3IpLCAtMSwgZWxlbWVudCkpLkFkZENvbXBvbmVudCh0aW1lU3RhbXAuR2V0U25hcCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDcmVhdGVIYXBwKE1vdmVEYXRhIG1kLCBvYmplY3QgY29tcDEsIG9iamVjdCBjb21wMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0aCA9IG5ldyBIYXBwVGFncyhtZC50YWdzKTtcclxuICAgICAgICAgICAgdmFyIGUgPSBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudCh0aCwgdGltZVN0YW1wLkdldFNuYXAoKSk7XHJcbiAgICAgICAgICAgIGlmIChjb21wMSAhPSBudWxsKSBlLkFkZENvbXBvbmVudChjb21wMSk7XHJcbiAgICAgICAgICAgIGlmIChjb21wMiAhPSBudWxsKSBlLkFkZENvbXBvbmVudChjb21wMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ3JlYXRlSGFwcChpbnQgdGFnLCBvYmplY3QgY29tcDEsIG9iamVjdCBjb21wMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0aCA9IG5ldyBIYXBwVGFncyh0YWcpO1xyXG4gICAgICAgICAgICB2YXIgZSA9IGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KHRoLCB0aW1lU3RhbXAuR2V0U25hcCgpKTtcclxuICAgICAgICAgICAgaWYgKGNvbXAxICE9IG51bGwpIGUuQWRkQ29tcG9uZW50KGNvbXAxKTtcclxuICAgICAgICAgICAgaWYgKGNvbXAyICE9IG51bGwpIGUuQWRkQ29tcG9uZW50KGNvbXAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEZWFsRGFtYWdlKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGFjdG9yLCBEZWFsRGFtYWdlQWN0aW9uIGRkYSwgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgdGFyZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQmF0dGxlTWFpbi5FbGVtZW50IGF0dGFja0VsZW1lbnQgPSBkZGEuZWxlbWVudDtcclxuICAgICAgICAgICAgYm9vbCBlbGVtZW50YWxCbG9jayA9IGF0dGFja0VsZW1lbnQgPT0gdGFyZ2V0LmVsZW1lbnQgJiYgYXR0YWNrRWxlbWVudCAhPSBCYXR0bGVNYWluLkVsZW1lbnQuTm9uZTtcclxuICAgICAgICAgICAgYm9vbCBzdXBlckVmZmVjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbnQgZGFtYWdlID0gMDtcclxuICAgICAgICAgICAgaW50IHRhcmdldElkID0gZW50aXRpZXMuSW5kZXhPZih0YXJnZXQpO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudGFsQmxvY2spXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVsZW1lbnRhbEJsb2NrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtdWwgPSBiYXR0bGVNYWluLkNhbGN1bGF0ZUF0dGFja011bHRpcGxpZXIoYWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIG11bCAqPSBiYXR0bGVNYWluLkNhbGN1bGF0ZURlZmVuZGVyTXVsdGlwbGllcih0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRhY2tFbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5GaXJlICYmIHRhcmdldC5lbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5JY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgYXR0YWNrRWxlbWVudCA9PSBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlciAmJiB0YXJnZXQuZWxlbWVudCA9PSBCYXR0bGVNYWluLkVsZW1lbnQuRmlyZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhdHRhY2tFbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5JY2UgJiYgdGFyZ2V0LmVsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWwgKj0gMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXJFZmZlY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhbWFnZSA9IGRkYS5kYW1hZ2UgKiAoaW50KW11bDtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQubGlmZSAtPSBkYW1hZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0b3IuZGFtYWdlTXVsdGlwbGllciA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaGFwcE1hbmFnZXIuQWRkKG5ldyBIYXBwKEJhdHRsZU1haW4uSGFwcFRhZy5EYW1hZ2VUYWtlbikpXHJcbiAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZSh0YXJnZXRJZCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuQ3JlYXRlSGFwcCgoaW50KU1pc2NIYXBwVGFncy5EYW1hZ2UsIG5ldyBIYXBwRGFtYWdlRGF0YSh0YXJnZXQuZWxlbWVudCwgZGRhLmVsZW1lbnQsIGVudGl0aWVzLkluZGV4T2YodGFyZ2V0KSwgZGFtYWdlLCBzdXBlckVmZmVjdGl2ZSwgZWxlbWVudGFsQmxvY2spLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5saWZlIDw9IDAgJiYgIXN1cGVyRWZmZWN0aXZlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDcmVhdGVIYXBwKChpbnQpTWlzY0hhcHBUYWdzLkRlYXRoLCBuZXcgSGFwcE1vdmVEYXRhKHRhcmdldElkKSwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IFJlc29sdmVUYXJnZXQoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgYWN0b3IsIExpc3Q8QmF0dGxlTWFpbi5CYXR0bGVFbnRpdHk+IGVudGl0aWVzLCBUYXJnZXQgdGFyZ2V0VHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRUeXBlID09IFRhcmdldC5TZWxmKSByZXR1cm4gYWN0b3I7XHJcbiAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IHRhcmdldCA9IG51bGw7XHJcbiAgICAgICAgICAgIGZsb2F0IG1pbkRpcyA9IDEwO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZTIgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZTIuRGVhZCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0b3IuVHlwZSAhPSBlMi5UeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgZTIuVHlwZSAhPSBCYXR0bGVNYWluLkVudGl0eVR5cGUucGFuZWxlZmZlY3RcclxuICAgICAgICAgICAgICAgICAgICAmJiBlMi5UeXBlICE9IEJhdHRsZU1haW4uRW50aXR5VHlwZS5waWNrdXApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBzYW1lSGVpZ2h0ID0gYWN0b3IucG9zLlkgPT0gZTIucG9zLlk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzYW1lSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXQgZGlzID0gYWN0b3IucG9zLlggLSBlMi5wb3MuWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcyA8IDApIGRpcyAqPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcyA8IG1pbkRpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluRGlzID0gZGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gZTI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcFRhZ3NcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IHRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwVGFncyhMaXN0PGludD4gdGFncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFncy5BZGRSYW5nZSh0YWdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwVGFncyhpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRhZ3MuQWRkKGkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBNaXNjSGFwcFRhZ3N7XHJcbiAgICAgICAgQ2hhbmdlRWxlbWVudCA9IDUwMCxcclxuICAgICAgICBEYW1hZ2UgPSA1MDEsXHJcbiAgICAgICAgRGVhdGggPSA1MDJcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcERhbWFnZURhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQmF0dGxlTWFpbi5FbGVtZW50IHRhcmdldEUsIGRhbWFnZUU7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCB0YXJnZXQ7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBhbW91bnQ7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvb2wgc3VwZXJFZmZlY3RpdmU7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvb2wgZWxlbWVudGFsQmxvY2s7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwRGFtYWdlRGF0YShCYXR0bGVNYWluLkVsZW1lbnQgdGFyZ2V0RSwgQmF0dGxlTWFpbi5FbGVtZW50IGRhbWFnZUUsIGludCB0YXJnZXQsIGludCBhbW91bnQsIGJvb2wgc3VwZXJFZmZlY3RpdmUsIGJvb2wgZWxlbWVudGFsQmxvY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldEUgPSB0YXJnZXRFO1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZUUgPSBkYW1hZ2VFO1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5hbW91bnQgPSBhbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3VwZXJFZmZlY3RpdmUgPSBzdXBlckVmZmVjdGl2ZTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50YWxCbG9jayA9IGVsZW1lbnRhbEJsb2NrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcE1vdmVEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCB1c2VyO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgdGFyZ2V0ID0gLTE7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50ID0gQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwTW92ZURhdGEoaW50IHVzZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBNb3ZlRGF0YShpbnQgdXNlciwgaW50IHRhcmdldCwgQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBNb3ZlbWVudEZhaWxcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVmVjdG9yMkQgbW92ZVRvO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcE1vdmVtZW50RmFpbChWZWN0b3IyRCBtb3ZlVG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVUbyA9IG1vdmVUbztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBBcmVhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEFyZWEgYXJlYTtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQgb2Zmc2V0ID0gbmV3IFZlY3RvcjJEKCk7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBtaXJyb3JpbmdYO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEFyZWEoQXJlYSBhcmVhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwQXJlYShBcmVhIGFyZWEsIFZlY3RvcjJEIG9mZnNldCwgaW50IG1pcnJvcmluZ1gpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSBhcmVhO1xyXG4gICAgICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcclxuICAgICAgICAgICAgdGhpcy5taXJyb3JpbmdYID0gbWlycm9yaW5nWDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5EZWJ1Z0V4dHJhO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkhhcHBzXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcE1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IEN1cnJlbnRUaW1lIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIExpc3Q8SGFwcD4gSGFwcHMgPSBuZXcgTGlzdDxIYXBwPigpO1xyXG4gICAgICAgIExpc3Q8SGFwcEhhbmRsZXI+IGhhbmRsZXJzID0gbmV3IExpc3Q8SGFwcEhhbmRsZXI+KCk7XHJcbiAgICAgICAgaW50IGxhdGVzdEhhbmRsZWQgPSAtMTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkSGFuZGxlcihIYXBwSGFuZGxlciBoaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChoaCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUcnlIYW5kbGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYobGF0ZXN0SGFuZGxlZCAhPSBDdXJyZW50VGltZSlcclxuICAgICAgICAgICAgICAgIEhhbmRsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEhhbmRsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYXRlc3RIYW5kbGVkID0gQ3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBoIGluIGhhbmRsZXJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gSGFwcHMuQ291bnQgLSAxOyBpID49IDA7IGktLSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMgY2hlY2sgYXNzdW1lcyBoYXBwcyBhcmUgb3JkZXJlZCBieSB0aW1lIHN0YW1wXHJcbiAgICAgICAgICAgICAgICAgICAgLy93aGljaCB0aGV5IHNob3VsZCBiZSBhdXRvbWF0aWNhbGx5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEhhcHBzW2ldLlRpbWVTdGFtcCAhPSBDdXJyZW50VGltZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlYnVnRXguTG9nKFwiSGFwcGVuaW5nIG5vdCBlcXVhbCB0byBjdXJyZW50IHRpbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBib29sIGhhc1RhZ3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0YWdzTmVlZGVkIGluIGgubmVjZXNzYXJ5VGFncylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghSGFwcHNbaV0uSGFzVGFnKHRhZ3NOZWVkZWQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNUYWdzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFzVGFncylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlYnVnRXguTG9nKFwiSGFwcGVuaW5nIGhhbmRsZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGguSGFuZGxlKEhhcHBzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRGVidWdFeC5Mb2coXCJIYXBwZW5pbmcgdGFnIGlzIGRpZmZlcmVudFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwIEFkZChIYXBwIGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBoLlRpbWVTdGFtcCA9IEN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICBIYXBwcy5BZGQoaCk7XHJcbiAgICAgICAgICAgIHJldHVybiBoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDdXJyZW50VGltZSsrO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcFxyXG4gICAge1xyXG4gICAgICAgIC8vcHVibGljIHN0cmluZyBNYWluVGFnO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PGludD4gdGFncyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBwdWJsaWMgaW50IFRpbWVTdGFtcDtcclxuICAgICAgICBMaXN0PEF0dHJpYnV0ZT4gYXR0cnMgPSBuZXcgTGlzdDxBdHRyaWJ1dGU+KCk7XHJcblxyXG4gICAgICAgIC8vcHVibGljIEhhcHAoSUNvbnZlcnRpYmxlIGMpXHJcbiAgICAgICAgLy97XHJcbiAgICAgICAgLy8gICAgdGFncy5BZGQoQ29udmVydC5Ub0ludDMyKGMpKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHAob2JqZWN0IG1haW5UYWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL01haW5UYWcgPSBtYWluVGFnLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihtYWluVGFnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgQXR0cmlidXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgZmxvYXQgVmFsdWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBBdHRyaWJ1dGUgU2V0VmFsdWUoZmxvYXQgZilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVmFsdWUgPSBmO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHVibGljIFRhZ0hvbGRlciB0YWdzID0gbmV3IFRhZ0hvbGRlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHAgQWRkQXR0cmlidXRlKEF0dHJpYnV0ZSBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXR0cnMuQWRkKGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGludCBHZXRBdHRyaWJ1dGVfSW50KGludCBpbmRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KWF0dHJzW2luZGV4XS5WYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSGFzVGFnKGludCB0YWdzTmVlZGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhZ3MuQ29udGFpbnModGFnc05lZWRlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwSGFuZGxlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PGludD4gbmVjZXNzYXJ5VGFncyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBwdWJsaWMgQWN0aW9uPEhhcHA+IEhhbmRsZTtcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBIYW5kbGVyKG9iamVjdCBtYWluVGFnLCBBY3Rpb248SGFwcD4gaGFuZGxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5uZWNlc3NhcnlUYWdzLkFkZChDb252ZXJ0LlRvSW50MzIobWFpblRhZykpO1xyXG4gICAgICAgICAgICBIYW5kbGUgPSBoYW5kbGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUYWdIb2xkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxvYmplY3Q+IFRhZ3MgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEhhc1RhZyhvYmplY3QgdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUYWdzLkNvbnRhaW5zKHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGQob2JqZWN0IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUYWdzLkFkZCh2KTtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBMaXN0PG9iamVjdD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1RhZ3M9bmV3IExpc3Q8b2JqZWN0PigpO31cclxuXHJcblxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSW5wdXRIb2xkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxJbnB1dD4gaW5wdXRzID0gbmV3IExpc3Q8SW5wdXQ+KCk7XHJcbiAgICAgICAgTGlzdDxJbnB1dFRhZ3M+IHRhZ3MgPSBuZXcgTGlzdDxJbnB1dFRhZ3M+KCk7XHJcblxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIENsZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlucHV0cy5DbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGQoSW5wdXQgaW5wdXQsIElucHV0VGFncyB0YWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnB1dHMuQWRkKGlucHV0KTtcclxuICAgICAgICAgICAgdGFncy5BZGQodGFnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIFRhZ0lzKGludCBpMiwgSW5wdXRUYWdzIHRhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0YWdzLkNvdW50IDw9IGkyKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybiB0YWdzW2kyXSA9PSB0YWc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIElucHV0VGFnc3tcclxuICAgICAgICBOT05FLCBNT1ZFRklYLCBNT1ZFVU5GSVgsIE1JU0NcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1vdmVDcmVhdG9yUHJvZ1xyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcyA9IG5ldyBMaXN0PE1vdmVEYXRhPigpO1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8TW92ZVJlbmRlckRhdGE+IG1vdmVSZW5kZXJzID0gbmV3IExpc3Q8TW92ZVJlbmRlckRhdGE+KCk7XHJcbiAgICAgICAgQXJlYUNyZWF0aW9uVXRpbHMgYXJlYVV0aWxzID0gbmV3IEFyZWFDcmVhdGlvblV0aWxzKCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlQ3JlYXRvclByb2coKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW92ZURhdGFzLkFkZChudWxsKTsgLy9kbyBub3RoaW5nXHJcbiAgICAgICAgICAgIEJhc2VVdGlscy5WZWN0b3IyRFtdIGRpcmVjdGlvbnMgPSBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEW10ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIDEpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgtMSwgMCksXHJcbiAgICAgICAgICAgICAgICBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIC0xKSxcclxuICAgICAgICAgICAgICAgIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMSwgMCksIFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzdHJpbmdbXSBtb3ZlTGFiZWxzID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBVcFwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIExlZnRcIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBEb3duXCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgUmlnaHRcIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc3RyaW5nW10gbW92ZUFicmV2ID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiXlwiLFxyXG4gICAgICAgICAgICAgICAgXCI8XCIsXHJcbiAgICAgICAgICAgICAgICBcInZcIixcclxuICAgICAgICAgICAgICAgIFwiPlwiLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGRpcmVjdGlvbnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE5ld01vdmVEYXRhKGxhYmVsOm1vdmVMYWJlbHNbaV0sIGNvbmRpdGlvbjogbmV3IENvbmRpdGlvbihDb25kaXRpb25UeXBlLkNhbk1vdmUsIFRhcmdldC5TZWxmLCBkaXJlY3Rpb25zW2ldKSwgYWN0aW9uOiBuZXcgTW92ZUFjdGlvbihUYXJnZXQuU2VsZiwgZGlyZWN0aW9uc1tpXSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5Nb3ZlbWVudCwgIE1vdmVEYXRhVGFncy5IZXJvSW5pdGlhbCkpO1xyXG4gICAgICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKG5hbWU6bW92ZUxhYmVsc1tpXSwgYWJyZXY6bW92ZUFicmV2W2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkd1blwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgMSwgQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmUpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkd1blwiLCBcIkdcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkZpcmVndW5cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIEJhdHRsZU1haW4uRWxlbWVudC5GaXJlKSwgbmV3IERlYWxEYW1hZ2VBY3Rpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCAxLCBCYXR0bGVNYWluLkVsZW1lbnQuRmlyZSkpLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuU2hvb3QpKTtcclxuICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKFwiRmlyZWd1blwiLCBcIkZHXCIpO1xyXG5cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJJY2VndW5cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIEJhdHRsZU1haW4uRWxlbWVudC5JY2UpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5JY2UpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkljZWd1blwiLCBcIklHXCIpO1xyXG5cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJUaHVuZGVyZ3VuXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKG5ldyBBbmltYXRpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlciksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgMSwgQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIlRodW5kZXJndW5cIiwgXCJUR1wiKTtcclxuXHJcbiAgICAgICAgICAgIEFyZWEgYXJlYSA9IEFyZWFVc2VyKCkuUm93Rm9yd2FyZCh3aWR0aDogMSwgWERpczogMyk7XHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiSWNlYm9tYlwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKGFyZWEsIEJhdHRsZU1haW4uRWxlbWVudC5JY2UpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihhcmVhLCAxLCBCYXR0bGVNYWluLkVsZW1lbnQuSWNlKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5Cb21iKSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkljZWJvbWJcIiwgXCJJQlwiKTtcclxuXHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiVGh1bmRlcmJvbWJcIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihhcmVhLCBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlciksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKGFyZWEsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5Cb21iKSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIlRodW5kZXJib21iXCIsIFwiVEJcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIlN1bW1vblwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihTdW1tb25FbnRpdHkuRW5lbXkoMCwgbmV3IFZlY3RvcjJEKDUsMCkpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlN1bW1vbikpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJTdW1tb25cIiwgXCJTVVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGludCBHZXRNb3ZlSWQoc3RyaW5nIHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gTW92ZURhdGEuRmluZEJ5TGFiZWwobW92ZURhdGFzLCB2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgQXJlYUNyZWF0aW9uVXRpbHMgQXJlYVVzZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXJlYVV0aWxzLnRhcmdldCA9IFRhcmdldC5TZWxmO1xyXG4gICAgICAgICAgICByZXR1cm4gYXJlYVV0aWxzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEFyZWFDcmVhdGlvblV0aWxzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgVGFyZ2V0IHRhcmdldDtcclxuICAgICAgICAgICAgaW50IGhlaWdodCA9IDM7XHJcblxyXG4gICAgICAgICAgICBpbnRlcm5hbCBBcmVhIFJvd0ZvcndhcmQoaW50IHdpZHRoLCBpbnQgWERpcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhID0gbmV3IEFyZWEodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIGludCBvZmZzZXRZID0gKGludClNYXRoLkZsb29yKChmbG9hdCloZWlnaHQgLyAyZik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBoZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYS5wb2ludHMuQWRkKG5ldyBWZWN0b3IyRChpK1hEaXMsIGotb2Zmc2V0WSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoc3RyaW5nIG5hbWUsIHN0cmluZyBhYnJldilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdmVSZW5kZXJzLkFkZChuZXcgTW92ZVJlbmRlckRhdGEobmFtZSwgYWJyZXYpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBOZXdNb3ZlRGF0YShzdHJpbmcgbGFiZWwsIFRpY2tbXSB0aWNrcywgb2JqZWN0W10gdGFncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtdiA9IG5ldyBNb3ZlRGF0YShsYWJlbCk7XHJcbiAgICAgICAgICAgIG12LnVuaXRzLkFkZFJhbmdlKHRpY2tzKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gdGFncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbXYudGFncy5BZGQoQ29udmVydC5Ub0ludDMyKGl0ZW0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbW92ZURhdGFzLkFkZChtdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTmV3TW92ZURhdGEoc3RyaW5nIGxhYmVsLCBDb25kaXRpb24gY29uZGl0aW9uLCBvYmplY3QgYWN0aW9uLCBvYmplY3RbXSB0YWdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG12ID0gbmV3IE1vdmVEYXRhKGxhYmVsKTtcclxuICAgICAgICAgICAgVGljayB0aWNrID0gbmV3IFRpY2soKTtcclxuICAgICAgICAgICAgdGljay5jb25kaXRpb24gPSBjb25kaXRpb247XHJcbiAgICAgICAgICAgIHRpY2sudGhpbmdzVG9IYXBwZW4uQWRkKGFjdGlvbik7XHJcbiAgICAgICAgICAgIG12LnVuaXRzLkFkZCh0aWNrKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gdGFncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbXYudGFncy5BZGQoQ29udmVydC5Ub0ludDMyKGl0ZW0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtb3ZlRGF0YXMuQWRkKG12KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVGlja1tdIE9uZVRpY2tQZXJBY3Rpb24ocGFyYW1zIG9iamVjdFtdIGFjdGlvbnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUaWNrW10gdGlja3MgPSBuZXcgVGlja1thY3Rpb25zLkxlbmd0aF07XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdGlja3MuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpY2tzW2ldID0gbmV3IFRpY2soYWN0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRpY2tzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvYmplY3RbXSBUYWdBcnJheShwYXJhbXMgb2JqZWN0W10gYXJncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcmdzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZVJlbmRlckRhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIExhYmVsO1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQWJyZXY7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlUmVuZGVyRGF0YShzdHJpbmcgbGFiZWwsIHN0cmluZyBhYnJldilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTGFiZWwgPSBsYWJlbDtcclxuICAgICAgICAgICAgdGhpcy5BYnJldiA9IGFicmV2O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkVDU1xyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFjY2Vzc29yXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBMZW5ndGggeyBnZXQgeyByZXR1cm4gU2VsZWN0ZWRFbnRpdGllcy5Db3VudDsgfSB9XHJcblxyXG4gICAgICAgIGludGVybmFsIFR5cGVbXSBUeXBlc1Byb2hpYml0ZWQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBUeXBlW10gVHlwZXNOZWNlc3Nhcnk7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxFbnRpdHk+IFNlbGVjdGVkRW50aXRpZXMgPSBuZXcgTGlzdDxFbnRpdHk+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBY2Nlc3NvcihwYXJhbXMgVHlwZVtdIHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUeXBlc05lY2Vzc2FyeSA9IHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIEVudGl0eUFkZGVkKEVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFNlbGVjdGVkRW50aXRpZXMuQ29udGFpbnMoZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IEdldChpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTZWxlY3RlZEVudGl0aWVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUXVpY2tBY2Nlc3Nvck9uZTxUMT5cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIFF1aWNrQWNjZXNzb3JPbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWNjZXNzb3IgPSBuZXcgQWNjZXNzb3IodHlwZW9mKFQxKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBBY2Nlc3NvciBhY2Nlc3NvcjtcclxuICAgICAgICBwdWJsaWMgaW50IENvdW50IHsgZ2V0IHsgcmV0dXJuIGFjY2Vzc29yLkxlbmd0aDsgfSB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBUMSBDb21wMShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldLkdldENvbXBvbmVudDxUMT4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgRW50aXR5KGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNsYXNzIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBcclxuICAgIHtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgQWNjZXNzb3IgYWNjZXNzb3I7XHJcbiAgICAgICAgcHVibGljIGludCBMZW5ndGggeyBnZXQgeyByZXR1cm4gYWNjZXNzb3IuTGVuZ3RoOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIFQxIENvbXAxKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXNbaV0uR2V0Q29tcG9uZW50PFQxPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBFbnRpdHkoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllc1tpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBRdWlja0FjY2Vzc29yVHdvKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yID0gbmV3IEFjY2Vzc29yKHR5cGVvZihUMSksIHR5cGVvZihUMikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBUMiBDb21wMihpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldLkdldENvbXBvbmVudDxUMj4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIEVDU01hbmFnZXJcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgRUNTTWFuYWdlcltdIG1hbmFnZXJzID0gbmV3IEVDU01hbmFnZXJbMjBdO1xyXG4gICAgICAgIERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+IGNvbXBzID0gbmV3IERpY3Rpb25hcnk8VHlwZSwgb2JqZWN0W10+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgRUNTSWQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgRUNTTWFuYWdlcigpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHJvY2Vzc29yQWNjZXNzb3IgQ3JlYXRlUHJvY2Vzc29yKEFjY2Vzc29yIGFjY2Vzc29yLCBBY3Rpb248QWNjZXNzb3I+IGFjdGlvbilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb2Nlc3NvckFjY2Vzc29yKGFjdGlvbiwgYWNjZXNzb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFjY2Vzc29yIENyZWF0ZUFjY2Vzc29yKFR5cGVbXSBuZWNlc3NhcnksIFR5cGVbXSBub3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYWNjID0gbmV3IEFjY2Vzc29yKG5lY2Vzc2FyeSk7XHJcbiAgICAgICAgICAgIGFjYy5UeXBlc1Byb2hpYml0ZWQgPSBub3Q7XHJcbiAgICAgICAgICAgIEFkZEFjY2Vzc29yKGFjYyk7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFF1aWNrQWNjZXNzb3JUd288VDEsVDI+IFF1aWNrQWNjZXNzb3IyPFQxLCBUMj4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+IGFjY2Vzc29yID0gbmV3IFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPigpO1xyXG4gICAgICAgICAgICBBZGRBY2Nlc3NvcihhY2Nlc3Nvci5hY2Nlc3Nvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3NvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBRdWlja0FjY2Vzc29yT25lPFQxPiBRdWlja0FjY2Vzc29yMTxUMT4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUXVpY2tBY2Nlc3Nvck9uZTxUMT4gYWNjZXNzb3IgPSBuZXcgUXVpY2tBY2Nlc3Nvck9uZTxUMT4oKTtcclxuICAgICAgICAgICAgQWRkQWNjZXNzb3IoYWNjZXNzb3IuYWNjZXNzb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnQgZW50aXR5SWRNYXggPSAtMTtcclxuICAgICAgICBMaXN0PEFjY2Vzc29yPiBhY2Nlc3NvcnMgPSBuZXcgTGlzdDxBY2Nlc3Nvcj4oKTtcclxuXHJcbiAgICAgICAgI3JlZ2lvbiBzdGF0aWMgbWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RhdGljIEVDU01hbmFnZXIgR2V0SW5zdGFuY2UoRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbWFuYWdlcnNbZS5lY3NdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBFQ1NNYW5hZ2VyIENyZWF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBtYW5hZ2Vycy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hbmFnZXJzW2ldID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYW5hZ2Vyc1tpXSA9IG5ldyBFQ1NNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFuYWdlcnNbaV0uRUNTSWQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYW5hZ2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChvYmplY3QgdilcclxuICAgICAgICB7XHJcbkVudGl0eSBlO1xuICAgICAgICAgICAgQ3JlYXRlRW50aXR5KG91dCBlKTtcclxuICAgICAgICAgICAgQWRkQ29tcG9uZW50KGUsIHYpO1xyXG4gICAgICAgICAgICByZXR1cm4gZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChvYmplY3Qgdiwgb2JqZWN0IHYyKVxyXG4gICAgICAgIHtcclxuRW50aXR5IGU7XG4gICAgICAgICAgICBDcmVhdGVFbnRpdHkob3V0IGUpO1xyXG4gICAgICAgICAgICBBZGRDb21wb25lbnQoZSwgdik7XHJcbiAgICAgICAgICAgIEFkZENvbXBvbmVudChlLCB2Mik7XHJcbiAgICAgICAgICAgIHJldHVybiBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBDcmVhdGVFbnRpdHkob3V0IEVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW50aXR5SWRNYXgrKztcclxuICAgICAgICAgICAgRW50aXR5IGVudGl0eSA9IG5ldyBFbnRpdHkodGhpcy5FQ1NJZCwgZW50aXR5SWRNYXgpO1xyXG4gICAgICAgICAgICBlID0gZW50aXR5O1xyXG4gICAgICAgICAgICByZXR1cm4gZW50aXR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBDcmVhdGVFbnRpdHkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW50aXR5SWRNYXgrKztcclxuICAgICAgICAgICAgRW50aXR5IGVudGl0eSA9IG5ldyBFbnRpdHkodGhpcy5FQ1NJZCwgZW50aXR5SWRNYXgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZW50aXR5O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBQcm9jZXNzb3JGbGV4PFQxLFQyPiBRdWlja1Byb2Nlc3NvckZsZXg8VDEsIFQyPihBY3Rpb248UXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+PiBwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUHJvY2Vzc29yRmxleDxUMSwgVDI+IHByb2Nlc3NvckZsZXggPSBuZXcgUHJvY2Vzc29yRmxleDxUMSwgVDI+KHApO1xyXG4gICAgICAgICAgICBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4gYWNjZXNzb3IgPSBwcm9jZXNzb3JGbGV4LmFjY2Vzc29yO1xyXG4gICAgICAgICAgICBBY2Nlc3NvciBhY2Nlc3NvcjEgPSBhY2Nlc3Nvci5hY2Nlc3NvcjtcclxuICAgICAgICAgICAgQWRkQWNjZXNzb3IoYWNjZXNzb3IxKTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NvckZsZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkQWNjZXNzb3IoQWNjZXNzb3IgYWNjZXNzb3IxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWNjZXNzb3JzLkFkZChhY2Nlc3NvcjEpO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8PSBlbnRpdHlJZE1heDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVBY2Nlc3NvckVudGl0eShhY2Nlc3NvcjEsIGkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZUFjY2Vzc29yRW50aXR5KEFjY2Vzc29yIGFjY2Vzc29yLCBpbnQgZW50aXR5SWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbnRpdHkgZW50aXR5ID0gbmV3IEVudGl0eShFQ1NJZCwgZW50aXR5SWQpO1xyXG4gICAgICAgICAgICBib29sIGJlbG9uZyA9IEhhc0FsbENvbXBzKGFjY2Vzc29yLlR5cGVzTmVjZXNzYXJ5LCBlbnRpdHlJZCkgJiYgSGFzTm9uZU9mVGhlc2VDb21wcyhhY2Nlc3Nvci5UeXBlc1Byb2hpYml0ZWQsIGVudGl0eUlkKTtcclxuICAgICAgICAgICAgYm9vbCBtZW1iZXIgPSBhY2Nlc3Nvci5FbnRpdHlBZGRlZChlbnRpdHkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJlbG9uZyAhPSBtZW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChiZWxvbmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllcy5BZGQoZW50aXR5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzLlJlbW92ZShlbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy9pZiAoaXRlbS5FbnRpdHlBZGRlZChlKSlcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy9lbHNlXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBpZiAoSGFzQWxsQ29tcG9uZW50cyhlLCBpdGVtLlR5cGVzTmVjZXNzYXJ5KSlcclxuICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgaXRlbS5TZWxlY3RlZEVudGl0aWVzLkFkZChlKTtcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVCBBZGRDb21wb25lbnQ8VD4oRW50aXR5IGUpIHdoZXJlIFQgOiBuZXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVCB0ID0gbmV3IFQoKTtcclxuICAgICAgICAgICAgQWRkQ29tcG9uZW50KGUsIHQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRDb21wb25lbnQoRW50aXR5IGUsIG9iamVjdCB0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVHlwZSB0eXBlID0gdC5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIGlmICghY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbXBzLkFkZCh0eXBlLCBuZXcgb2JqZWN0WzMwMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbXBzW3R5cGVdW2UuaWRdID0gdDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYWNjZXNzb3JzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVBY2Nlc3NvckVudGl0eShpdGVtLCBlLmlkKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmVDb21wb25lbnQoRW50aXR5IGUsIG9iamVjdCB0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVHlwZSB0eXBlID0gdC5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIGlmICghY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbXBzLkFkZCh0eXBlLCBuZXcgb2JqZWN0WzMwMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbXBzW3R5cGVdW2UuaWRdID0gbnVsbDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYWNjZXNzb3JzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVBY2Nlc3NvckVudGl0eShpdGVtLCBlLmlkKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBIYXNBbGxDb21wb25lbnRzKEVudGl0eSBlLCBUeXBlW10gdHlwZXNOZWNlc3NhcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgaWQgPSBlLmlkO1xyXG4gICAgICAgICAgICByZXR1cm4gSGFzQWxsQ29tcHModHlwZXNOZWNlc3NhcnksIGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBIYXNBbGxDb21wcyhUeXBlW10gdHlwZXNOZWNlc3NhcnksIGludCBpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0eXBlIGluIHR5cGVzTmVjZXNzYXJ5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcHNbdHlwZV1baWRdID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIEhhc05vbmVPZlRoZXNlQ29tcHMoVHlwZVtdIHR5cGVzUHJvaGliaXRlZCwgaW50IGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVzUHJvaGliaXRlZCA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHR5cGUgaW4gdHlwZXNQcm9oaWJpdGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBzW3R5cGVdW2lkXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBUIEdldENvbXBvbmVudDxUPihFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR5cGUgdHlwZSA9IHR5cGVvZihUKTtcclxuICAgICAgICAgICAgaWYgKCFjb21wcy5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9jb21wcy5BZGQodHlwZSwgbmV3IG9iamVjdFszMDBdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0KFQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAoVCkgY29tcHNbdHlwZV1bZS5pZF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG4gICAgcHVibGljIHN0cnVjdCBFbnRpdHkgOiBJRXF1YXRhYmxlPEVudGl0eT5cclxuICAgIHtcclxuICAgICAgICByZWFkb25seSBpbnRlcm5hbCBpbnQgZWNzO1xyXG4gICAgICAgIHJlYWRvbmx5IGludGVybmFsIGludCBpZDtcclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eShpbnQgZWNzLCBpbnQgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKEVudGl0eSBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBvdGhlci5pZCA9PSB0aGlzLmlkICYmIG90aGVyLmVjcyA9PSB0aGlzLmVjcztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEV4dGVuc2lvbk1ldGhvZHNcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFJlbW92ZUNvbXBvbmVudCh0aGlzIEVudGl0eSBlLCBvYmplY3QgY29tcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVDU01hbmFnZXIuR2V0SW5zdGFuY2UoZSkuUmVtb3ZlQ29tcG9uZW50KGUsIGNvbXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUIEFkZENvbXBvbmVudDxUPih0aGlzIEVudGl0eSBlKSB3aGVyZSBUOiBuZXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEVDU01hbmFnZXIuR2V0SW5zdGFuY2UoZSkuQWRkQ29tcG9uZW50PFQ+KGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQWRkQ29tcG9uZW50KHRoaXMgRW50aXR5IGUsIG9iamVjdCBjb21wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRUNTTWFuYWdlci5HZXRJbnN0YW5jZShlKS5BZGRDb21wb25lbnQoZSwgY29tcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBHZXRDb21wb25lbnQ8VD4odGhpcyBFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBFQ1NNYW5hZ2VyLkdldEluc3RhbmNlKGUpLkdldENvbXBvbmVudDxUPihlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkVDU1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJvY2Vzc29yRmxleDxUMSwgVDI+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBBY3Rpb248UXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+PiBwO1xyXG4gICAgICAgIGludGVybmFsIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBhY2Nlc3NvcjtcclxuXHJcbiAgICAgICAgcHVibGljIFByb2Nlc3NvckZsZXgoQWN0aW9uPFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPj4gcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucCA9IHA7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yID0gbmV3IFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUnVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHAoYWNjZXNzb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUHJvY2Vzc29yQWNjZXNzb3JcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEFjdGlvbjxBY2Nlc3Nvcj4gcDtcclxuXHJcbiAgICAgICAgQWNjZXNzb3IgYTtcclxuXHJcbiAgICAgICAgcHVibGljIFByb2Nlc3NvckFjY2Vzc29yKEFjdGlvbjxBY2Nlc3Nvcj4gcCwgQWNjZXNzb3IgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucCA9IHA7XHJcbiAgICAgICAgICAgIHRoaXMuYSA9IGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSdW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcChhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRXb3JsZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlIHBhbGV0dGUgPSBEZWZhdWx0UGFsZXR0ZXMuQzRLaXJvS2F6ZTtcclxuICAgICAgICBMaXN0PFRleHRFbnRpdHk+IGFjdGl2ZUFnZW50cyA9IG5ldyBMaXN0PFRleHRFbnRpdHk+KCk7XHJcbiAgICAgICAgTGlzdDxUZXh0RW50aXR5PiBmcmVlQm9hcmRzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICBMaXN0PFRleHRBbmltYXRpb24+IGFuaW1hdGlvbnMgPSBuZXcgTGlzdDxUZXh0QW5pbWF0aW9uPigpO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgbWFpbkJvYXJkO1xyXG4gICAgICAgIGludCBsYXRlc3RJZCA9IC0xO1xyXG5cclxuICAgICAgICBwdWJsaWMgVCBBZGRBbmltYXRpb248VD4oVCB0YSkgd2hlcmUgVCA6IFRleHRBbmltYXRpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbnMuQWRkKHRhKTtcclxuICAgICAgICAgICAgdGEuUmVnaXN0ZXJMaXN0cygpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1haW5Cb2FyZCA9IG5ldyBUZXh0Qm9hcmQod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtYWluQm9hcmQuUmVzZXQoKTtcclxuICAgICAgICAgICAgRHJhd0NoaWxkcmVuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hpbGRyZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBhY3RpdmVBZ2VudHMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlQWdlbnRzW2ldLlJlc2V0QW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW0uTW9kaWZ5KGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlQWdlbnRzW2ldLmZyZWVJZklkbGUgJiYgIWFjdGl2ZUFnZW50c1tpXS5hbmltYXRpbmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJlZUJvYXJkcy5BZGQoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVBZ2VudHMuUmVtb3ZlKGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5Cb2FyZC5JbnNlcnQoYWN0aXZlQWdlbnRzW2ldLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEVudGl0eSBHZXRGcmVlRW50aXR5KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRFbnRpdHkgdGU7XHJcbiAgICAgICAgICAgIGlmIChmcmVlQm9hcmRzLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGUgPSBmcmVlQm9hcmRzW2ZyZWVCb2FyZHMuQ291bnQgLSAxXTtcclxuICAgICAgICAgICAgICAgIGZyZWVCb2FyZHMuUmVtb3ZlQXQoZnJlZUJvYXJkcy5Db3VudCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGUgPSBuZXcgVGV4dEVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgdGUuaWQgPSArK2xhdGVzdElkO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWN0aXZlQWdlbnRzLkFkZCh0ZSk7XHJcbiAgICAgICAgICAgIHRlLmZyZWVJZklkbGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGUuU2V0U2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgdGUuUmVzZXRGdWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IEdldFRlbXBFbnRpdHkoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRlID0gR2V0RnJlZUVudGl0eSh3LCBoKTtcclxuICAgICAgICAgICAgdGUuZnJlZUlmSWRsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkdmFuY2VUaW1lKGZsb2F0IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbmltLlVwZGF0ZSh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghYW5pbS5Jc0RvbmUoKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dEVudGl0eVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgaWQ7XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBPcmlnaW47XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBBbmltYXRpb247XHJcbiAgICAgICAgcHVibGljIGJvb2wgZnJlZUlmSWRsZSA9IGZhbHNlO1xyXG4gICAgICAgIGludGVybmFsIGJvb2wgYW5pbWF0aW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodCB7IGdldCB7IHJldHVybiBPcmlnaW4uSGVpZ2h0OyB9IH1cclxuICAgICAgICBwdWJsaWMgaW50IFdpZHRoIHsgZ2V0IHsgcmV0dXJuIE9yaWdpbi5XaWR0aDsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0QW5pbWF0aW9uLkJhc2VEYXRhIEFuaW1CYXNlKGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGV4dEFuaW1hdGlvbi5CYXNlRGF0YShsZW5ndGgsIDAsIGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIFZlY3RvcjJEIEdldFBvc2l0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBPcmlnaW4uUG9zaXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0QW5pbWF0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBBbmltYXRpb24uU2V0KE9yaWdpbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0RnVsbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcmlnaW4uUmVzZXRJbnZpc2libGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0UG9zaXRpb24oaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3JpZ2luLlBvc2l0aW9uID0gbmV3IFZlY3RvcjJEKHgseSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldFBvc2l0aW9uKFZlY3RvcjJEIHZlY3RvcjJEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3JpZ2luLlBvc2l0aW9uID0gdmVjdG9yMkQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldFNpemUoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKE9yaWdpbiA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBPcmlnaW4gPSBuZXcgVGV4dEJvYXJkKHcsIGgpO1xyXG4gICAgICAgICAgICAgICAgQW5pbWF0aW9uID0gbmV3IFRleHRCb2FyZCh3LCBoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPcmlnaW4uUmVzaXplKHcsIGgpO1xyXG4gICAgICAgICAgICBBbmltYXRpb24uUmVzaXplKHcsIGgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERlbGF5c0FuaW1hdGlvbiA6IFRleHRBbmltYXRpb25cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRGVsYXkoZmxvYXQgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZChuZXcgQmFzZURhdGEodiwgMCwgLTEpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBQb3NpdGlvbkFuaW1hdGlvbiA6IFRleHRBbmltYXRpb248UG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhPlxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIFBvc2l0aW9uRGF0YSBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGEsIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQgdGFyZ2V0ID0gZW50aXR5LkFuaW1hdGlvbjtcclxuICAgICAgICAgICAgaWYgKG1haW5EYXRhLnBlcm1hbmVudClcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IGVudGl0eS5PcmlnaW47XHJcbiAgICAgICAgICAgIHRhcmdldC5Qb3NpdGlvbiA9IFZlY3RvcjJELkludGVycG9sYXRlUm91bmRlZChtYWluRGF0YS5zdGFydFBvc2l0aW9uLCBtYWluRGF0YS5lbmRQb3NpdGlvbiwgcHJvZ3Jlc3MgLyBsZW5ndGgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgUG9zaXRpb25EYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm9vbCBwZXJtYW5lbnQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBWZWN0b3IyRCBzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBQb3NpdGlvbkRhdGEoVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgVmVjdG9yMkQgZW5kUG9zaXRpb24sIGJvb2wgcGVybSA9IGZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJtYW5lbnQgPSBwZXJtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBUZXh0QW5pbWF0aW9uPFQ+IDogVGV4dEFuaW1hdGlvblxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBMaXN0PFQ+IG1haW5EYXRhID0gbmV3IExpc3Q8VD4oKTtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLlJlZ2lzdGVyTGlzdChtYWluRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoQmFzZURhdGEgYmFzZURhdGEsIFQgbWFpbkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkFkZChiYXNlRGF0YSk7XHJcbiAgICAgICAgICAgIG1haW5EYXRhLkFkZChtYWluRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIGludCBpbmRleCwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1vZGlmeShlbnRpdHksIG1haW5EYXRhW2luZGV4XSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgVCBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2ludGVybmFsIG92ZXJyaWRlIHZvaWQgRXhlY3V0ZShpbnQgaW5kZXgsIEJhc2VEYXRhIGJhc2VEYXRhKVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vICAgIHRoaXMuRXhlY3V0ZShtYWluRGF0YVtpbmRleF0sIGJhc2VEYXRhKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy9wdWJsaWMgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKFQgbWFpbkRhdGEsIEJhc2VEYXRhIGJhc2VEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVGV4dEFuaW1hdGlvblxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IEJhc2VEYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgbGVuZ3RoO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgdGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEJhc2VEYXRhKGZsb2F0IGxlbmd0aCwgZmxvYXQgcHJvZ3Jlc3MsIGludCB0YXJnZXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgTGlzdDxmbG9hdD4gbGVuZ3RoID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxmbG9hdD4gcHJvZ3Jlc3MgPSBuZXcgTGlzdDxmbG9hdD4oKTtcclxuICAgICAgICBMaXN0PGludD4gdGFyZ2V0cyA9IG5ldyBMaXN0PGludD4oKTtcclxuICAgICAgICBMaXN0PElMaXN0PiBsaXN0cyA9IG5ldyBMaXN0PElMaXN0PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3Rlckxpc3RzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZChsZW5ndGgpO1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQocHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQodGFyZ2V0cyk7XHJcbiAgICAgICAgICAgIFJlcXVlc3RSZWdpc3Rlckxpc3RzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgdm9pZCBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHByb2dyZXNzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzW2ldICs9IGRlbHRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzW2ldID49IGxlbmd0aFtpXSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFbmRUYXNrKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vRXhlY3V0ZShpLCBuZXcgQmFzZURhdGEobGVuZ3RoW2ldLHByb2dyZXNzW2ldLCB0YXJnZXRzW2ldKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW50ZXJuYWwgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKGludCBpbmRleCwgQmFzZURhdGEgYmFzZURhdGEpO1xyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkZChCYXNlRGF0YSBiZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb2dyZXNzLkFkZChiZC5wcm9ncmVzcyk7XHJcbiAgICAgICAgICAgIHRhcmdldHMuQWRkKGJkLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGxlbmd0aC5BZGQoYmQubGVuZ3RoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBsaXN0cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uQ291bnQgIT0gcHJvZ3Jlc3MuQ291bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHMuVHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9ncmVzcy5Db3VudCA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBFbmRUYXNrKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGwgaW4gbGlzdHMpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlZ2lzdGVyTGlzdChJTGlzdCBtYWluRGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpc3RzLkFkZChtYWluRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHByb2dyZXNzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChhLmlkID09IHRhcmdldHNbaV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW9kaWZ5KGEsIGksIHByb2dyZXNzW2ldLCBsZW5ndGhbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGEuYW5pbWF0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIGludCBpbmRleCwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQYWxldHRlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIEh0bWxDb2xvcnM7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZShwYXJhbXMgc3RyaW5nW10gY29sb3JzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSHRtbENvbG9ycyA9IGNvbG9ycztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERlZmF1bHRQYWxldHRlc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUGFsZXR0ZSBDNEtpcm9LYXplID0gbmV3IFBhbGV0dGUoXCIjMzMyYzUwXCIsIFwiIzQ2ODc4ZlwiLCBcIiM5NGUzNDRcIiwgXCIjZTJmM2U0XCIpO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUGFsZXR0ZSBDNFJlYWRlciA9IG5ldyBQYWxldHRlKFwiIzI2MjYyNlwiLCBcIiM4YjhjYmFcIiwgXCIjOGJiYTkxXCIsIFwiIzY0OWY4ZFwiKTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBhbGV0dGUgQzROb3ZlbCA9IG5ldyBQYWxldHRlKFwiIzI2MjYyNlwiLCBcIiMzNDJkNDFcIiwgXCIjYjhiOGI4XCIsIFwiIzhiOGNiYVwiKTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0QmxhY2sgPSAwO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRCbGFja05ldXRyYWwgPSAxO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRXaGl0ZU5ldXRyYWwgPSAyO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQzRXaGl0ZSA9IDM7XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlblxyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IE1vdXNlSG92ZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgUmVjdCByZWN0O1xyXG4gICAgICAgIHB1YmxpYyBpbnQgdHlwZTtcclxuICAgICAgICBwdWJsaWMgaW50IGlkO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW91c2VIb3ZlcihSZWN0IHJlY3QsIGludCB0eXBlLCBpbnQgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlY3QgPSByZWN0O1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBNb3VzZUhvdmVyTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PE1vdXNlSG92ZXI+IG1vdXNlSG92ZXJzID0gbmV3IExpc3Q8TW91c2VIb3Zlcj4oKTtcclxuICAgICAgICBwdWJsaWMgTGlzdDxNb3VzZUhvdmVyPiBtb3VzZUhvdmVyc0FjdGl2ZSA9IG5ldyBMaXN0PE1vdXNlSG92ZXI+KCk7XHJcbiAgICAgICAgcHVibGljIE1vdXNlSU8gbW91c2VJTztcclxuXHJcbiAgICAgICAgcHVibGljIE1vdXNlSG92ZXJNYW5hZ2VyKE1vdXNlSU8gbW91c2VJTylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VJTyA9IG1vdXNlSU87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW91c2VIb3ZlcnNBY3RpdmUuQ2xlYXIoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbW91c2VIb3ZlcnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnJlY3QuQ29udGFpbnMobW91c2VJTy5wb3MpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdXNlSG92ZXJzQWN0aXZlLkFkZChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dEJvYXJkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgTk9DSEFOR0VDSEFSID0gKGNoYXIpMTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBJTlZJU0lCTEVDSEFSID0gKGNoYXIpMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IE5PQ0hBTkdFQ09MT1IgPSAtMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IElOVklTSUJMRUNPTE9SID0gLTE7XHJcbiAgICAgICAgY2hhclssXSBjaGFycztcclxuICAgICAgICBwdWJsaWMgaW50WyxdIFRleHRDb2xvciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50WyxdIEJhY2tDb2xvciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAvL1N0cmluZ0J1aWxkZXIgc3RyaW5nQnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgaW50IGN1cnNvclggPSAwO1xyXG4gICAgICAgIGludCBjdXJzb3JZID0gMDtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQgUG9zaXRpb24geyBnZXQ7IHNldDsgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZChpbnQgd2lkdGgsIGludCBoZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL1NldE1heFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIFJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdPbkNlbnRlcihzdHJpbmcgbWVzc2FnZSwgaW50IGNvbG9yLCBpbnQgeE9mZiA9IDAsIGludCB5T2ZmID0gMCwgYm9vbCBhbGlnblN0cmluZyA9IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgeCA9IChXaWR0aCkgLyAyO1xyXG4gICAgICAgICAgICBpZiAoYWxpZ25TdHJpbmcpIHggLT0gbWVzc2FnZS5MZW5ndGggLyAyO1xyXG4gICAgICAgICAgICBpbnQgeSA9IEhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIERyYXcobWVzc2FnZSwgeCArIHhPZmYsIHkgKyB5T2ZmLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFNldE1heFNpemUoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hhcnMgPSBuZXcgY2hhclt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICAgICAgVGV4dENvbG9yID0gbmV3IGludFt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICAgICAgQmFja0NvbG9yID0gbmV3IGludFt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgnICcsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIDAsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVzZXRJbnZpc2libGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKElOVklTSUJMRUNIQVIsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIElOVklTSUJMRUNPTE9SLCBJTlZJU0lCTEVDT0xPUik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5zZXJ0KFRleHRCb2FyZCBzZWNvbmRCb2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgc2Vjb25kQm9hcmQuV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBzZWNvbmRCb2FyZC5IZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeCA9IChpbnQpc2Vjb25kQm9hcmQuUG9zaXRpb24uWCArIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHkgPSAoaW50KXNlY29uZEJvYXJkLlBvc2l0aW9uLlkgKyBqO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRCb2FyZC5jaGFyc1tpLCBqXSAhPSBJTlZJU0lCTEVDSEFSKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1t4LCB5XSA9IHNlY29uZEJvYXJkLmNoYXJzW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRCb2FyZC5UZXh0Q29sb3JbaSwgal0gIT0gSU5WSVNJQkxFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRDb2xvclt4LCB5XSA9IHNlY29uZEJvYXJkLlRleHRDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuQmFja0NvbG9yW2ksIGpdICE9IElOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYWNrQ29sb3JbeCwgeV0gPSBzZWNvbmRCb2FyZC5CYWNrQ29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSGVpZ2h0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQ3Vyc29yWFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGN1cnNvclg7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclggPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IEN1cnNvclkgeyBnZXQgeyByZXR1cm4gY3Vyc29yWTsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25lRGlnaXQoaW50IGksIGludCB4LCBpbnQgeSwgaW50IGNvbG9yID0gTk9DSEFOR0VDT0xPUiwgaW50IGJhY2tncm91bmQgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hhciBjID0gKGNoYXIpKGkgKyAnMCcpO1xyXG4gICAgICAgICAgICBEcmF3Q2hhcihjLCB4LCB5LCBjb2xvciwgYmFja2dyb3VuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3VHdvRGlnaXRzKGludCBpLCBpbnQgeCwgaW50IHksIGludCBjb2xvciA9IE5PQ0hBTkdFQ09MT1IsIGludCBiYWNrZ3JvdW5kID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdPbmVEaWdpdChpLzEwLHgseSxjb2xvcixiYWNrZ3JvdW5kKTtcclxuICAgICAgICAgICAgRHJhd09uZURpZ2l0KGkgJTEwLCB4KzEsIHksIGNvbG9yLCBiYWNrZ3JvdW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgU2FtZUFzKFRleHRCb2FyZCB0ZXh0Qm9hcmQsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYXJzW3gsIHldID09IHRleHRCb2FyZC5jaGFyc1t4LCB5XVxyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5CYWNrQ29sb3JbeCx5XSA9PSB0ZXh0Qm9hcmQuQmFja0NvbG9yW3gseV1cclxuICAgICAgICAgICAgICAgICYmIHRoaXMuVGV4dENvbG9yW3gseV0gPT0gdGV4dEJvYXJkLlRleHRDb2xvclt4LHldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBDb3B5KFRleHRCb2FyZCB0ZXh0Qm9hcmQsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnNbeCwgeV0gPSB0ZXh0Qm9hcmQuY2hhcnNbeCwgeV07XHJcbiAgICAgICAgICAgIHRoaXMuVGV4dENvbG9yW3gsIHldID0gdGV4dEJvYXJkLlRleHRDb2xvclt4LCB5XTtcclxuICAgICAgICAgICAgdGhpcy5CYWNrQ29sb3JbeCwgeV0gPSB0ZXh0Qm9hcmQuQmFja0NvbG9yW3gsIHldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBEcmF3X0N1cnNvcl9Vbmljb2RlTGFiZWwoaW50IHYsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBsZW4gPSBEcmF3VW5pY29kZUxhYmVsKHYsIGN1cnNvclgsIGN1cnNvclksIGNvbG9yKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBsZW47IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQWR2YW5jZUN1cnNvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgaW50IERyYXdVbmljb2RlTGFiZWwoaW50IHVuaWNvZGUsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHVuaWNvZGUgPj0gJ2EnICYmIHVuaWNvZGUgPD0gJ3onKSB7XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhcigoY2hhcikodW5pY29kZSArICdBJyAtICdhJyksIHgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1bmljb2RlID49ICcwJyAmJiB1bmljb2RlIDw9ICc5JylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIoKGNoYXIpKHVuaWNvZGUpLCB4LCB5LCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdHJpbmcgbGFiZWwgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAodW5pY29kZSA9PSAzMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWwgPSBcIlNQQUNFXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgRHJhdyhsYWJlbCwgeCwgeSwgY29sb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbGFiZWwuTGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXQoVGV4dEJvYXJkIG9yaWdpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUG9zaXRpb24gPSBvcmlnaW4uUG9zaXRpb247XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBIZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJzW2ksIGpdID0gb3JpZ2luLmNoYXJzW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQmFja0NvbG9yW2ksIGpdID0gb3JpZ2luLkJhY2tDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRleHRDb2xvcltpLCBqXSA9IG9yaWdpbi5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzaXplKGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjaGFycyA9PSBudWxsIHx8IHcgPiBjaGFycy5HZXRMZW5ndGgoMCkgfHwgaCA+IGNoYXJzLkdldExlbmd0aCgxKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2V0TWF4U2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBXaWR0aCA9IHc7XHJcbiAgICAgICAgICAgIEhlaWdodCA9IGg7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNoYXIgQ2hhckF0KGludCBpLCBpbnQgailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGFyc1tpLCBqXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEN1cnNvckF0KGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclggPSB4O1xyXG4gICAgICAgICAgICBjdXJzb3JZID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gdilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IoYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKHN0cmluZyB2LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYyBpbiB2KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3X0N1cnNvcihjLCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgQ2FuRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgY3VycmVudFggPSBjdXJzb3JYO1xyXG4gICAgICAgICAgICBpbnQgY3VycmVudFkgPSBjdXJzb3JZO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB2Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBib29sIGxpbmVCcmVhayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBzaG91bGRDaGVja0ZvckxpbmVCcmVha3MgPSAoaSA9PSAwIHx8IHZbaV0gPT0gJyAnKSAmJiBpICE9IHYuTGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChzaG91bGRDaGVja0ZvckxpbmVCcmVha3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDE7IGogPCB2Lkxlbmd0aCAtIGk7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqICsgY3VycmVudFggPj0gV2lkdGgpIC8vcmVhY2ggZW5kIG9mIHRoZSBsaW5lIHdpdGhvdXQgZW5kaW5nIHRoZSB3b3JkLCBzaG91bGQgbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpXSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrOyAvL3NraXAgdGhyb3VnaCB0aGUgc3BhY2UgaWYgaXQncyBhIG5ldyBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWsgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaSArIGpdID09ICcgJykgLy9uZXcgd29yZCBiZWdpbnMgc28gbm8gbmVlZCB0byBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVCcmVhaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRYID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGN1cnJlbnRYKys7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFggPj0gV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFkrKztcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFggPj0gV2lkdGggfHwgY3VycmVudFkgPj0gSGVpZ2h0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERyYXdDdXJzb3JSZXN1bHQgRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBvZmZTdGFydCA9IDA7XHJcbiAgICAgICAgICAgIGludCBvZmZFbmQgPSB2Lkxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIHJldHVybiBEcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayh2LCBjb2xvciwgb2ZmU3RhcnQsIG9mZkVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRHJhd0N1cnNvclJlc3VsdCBEcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhzdHJpbmcgdiwgaW50IGNvbG9yLCBpbnQgb2ZmU3RhcnQsIGludCBvZmZFbmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgVmVjdG9yMkQgc3RhcnQgPSBuZXcgVmVjdG9yMkQoQ3Vyc29yWCwgQ3Vyc29yWSk7XHJcbiAgICAgICAgICAgIGludCBlbmRJbmRleCA9IG9mZkVuZCArIDE7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSBvZmZTdGFydDsgaSA8IGVuZEluZGV4OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBvcmlnaW5YID0gY3Vyc29yWDtcclxuICAgICAgICAgICAgICAgIGJvb2wgbGluZUJyZWFrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBib29sIHNob3VsZENoZWNrRm9yTGluZUJyZWFrcyA9IChpID09IDAgfHwgdltpXSA9PSAnICcpICYmIGkgIT0gZW5kSW5kZXggLSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZENoZWNrRm9yTGluZUJyZWFrcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMTsgaiA8IGVuZEluZGV4IC0gaTsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogKyBvcmlnaW5YID49IFdpZHRoKSAvL3JlYWNoIGVuZCBvZiB0aGUgbGluZSB3aXRob3V0IGVuZGluZyB0aGUgd29yZCwgc2hvdWxkIGxpbmUgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaV0gPT0gJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKzsgLy9za2lwIHRocm91Z2ggdGhlIHNwYWNlIGlmIGl0J3MgYSBuZXcgbGluZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUJyZWFrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2W2kgKyBqXSA9PSAnICcpIC8vbmV3IHdvcmQgYmVnaW5zIHNvIG5vIG5lZWQgdG8gbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsaW5lQnJlYWspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3Vyc29yTmV3TGluZSgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIERyYXdfQ3Vyc29yKHZbaV0sIGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBWZWN0b3IyRCBlbmQgPSBuZXcgVmVjdG9yMkQoQ3Vyc29yWCwgQ3Vyc29yWSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRHJhd0N1cnNvclJlc3VsdChQb3NpdGlvblRvSW5kZXgoc3RhcnQpLCBQb3NpdGlvblRvSW5kZXgoZW5kKSwgc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGludCBQb3NpdGlvblRvSW5kZXgoVmVjdG9yMkQgc3RhcnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludCkoc3RhcnQuWCArIHN0YXJ0LlkgKiBXaWR0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25lRGlnaXRfQ3Vyc29yKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd19DdXJzb3IoKGNoYXIpKGkgKyAnMCcpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKGNoYXIgYylcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcihjLCBjdXJzb3JYLCBjdXJzb3JZKTtcclxuICAgICAgICAgICAgQWR2YW5jZUN1cnNvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd19DdXJzb3IoY2hhciBjLCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgY3Vyc29yWCwgY3Vyc29yWSwgY29sb3IpO1xyXG4gICAgICAgICAgICBBZHZhbmNlQ3Vyc29yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZHZhbmNlQ3Vyc29yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclgrKztcclxuICAgICAgICAgICAgaWYgKGN1cnNvclggPj0gV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclggPSAwO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDdXJzb3JOZXdMaW5lKGludCB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3Vyc29yWSsrO1xyXG4gICAgICAgICAgICBjdXJzb3JYID0geDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdDaGFyKGNoYXIgdiwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh2ICE9IE5PQ0hBTkdFQ0hBUikge1xyXG4gICAgICAgICAgICAgICAgY2hhcnNbeCwgeV0gPSB2O1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hhcihjaGFyIHYsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcih2LCB4LCB5KTtcclxuICAgICAgICAgICAgU2V0Q29sb3IoY29sb3IsIHgsIHkpO1xyXG4gICAgICAgICAgICBTZXRCYWNrQ29sb3IoYmFja0NvbG9yLCB4LCB5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0QWxsKGNoYXIgdGV4dCwgaW50IHRleHRDb2xvciA9IE5PQ0hBTkdFQ09MT1IsIGludCBiYWNrQ29sb3I9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQodGV4dCwgMCwgMCwgV2lkdGgsIEhlaWdodCwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1dpdGhHcmlkKHN0cmluZyB0ZXh0LCBpbnQgeCwgaW50IHksIGludCBncmlkQ29sb3IsIGludCB0ZXh0Q29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgd2lkdGggPSB0ZXh0Lkxlbmd0aDtcclxuICAgICAgICAgICAgRHJhd0dyaWQoeCwgeSwgd2lkdGggKyAyLCAzLCBncmlkQ29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3KHRleHQsIHggKyAxLCB5ICsgMSwgdGV4dENvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoc3RyaW5nIHYsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdi5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHgyID0geCArIGk7XHJcbiAgICAgICAgICAgICAgICBpbnQgeTIgPSB5O1xyXG4gICAgICAgICAgICAgICAgaWYoeDIgPj0gV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDIgLT0gV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgeTIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKHZbaV0sIHgyLCB5MiwgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdXaXRoTGluZWJyZWFrcyhzdHJpbmcgdiwgaW50IHgsIGludCB5LCBpbnQgbmV3bGluZVgsIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbGluZWJyZWFrcyA9IDA7XHJcbiAgICAgICAgICAgIGludCB4T2Zmc2V0bmV3bGluZXMgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHYuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCB4MiA9IHggKyBpKyB4T2Zmc2V0bmV3bGluZXM7XHJcbiAgICAgICAgICAgICAgICBpbnQgeTIgPSB5O1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoeDIgPj0gV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDIgLT0gV2lkdGgrbmV3bGluZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgeTIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKHZbaV0sIHgyLCB5MitsaW5lYnJlYWtzLCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgIGlmICh2W2ldID09ICdcXG4nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVicmVha3MrKztcclxuICAgICAgICAgICAgICAgICAgICB4T2Zmc2V0bmV3bGluZXMgKz0gbmV3bGluZVggLSB4Mi0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhJRW51bWVyYWJsZTxjaGFyPiB2LCBpbnQgeCwgaW50IHksIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQ291bnQ8Y2hhcj4odik7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5FbGVtZW50QXQ8Y2hhcj4odixpKSwgeCArIGksIHksIGNvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3R3JpZChpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodCwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgoY2hhcikxNzksIHgsIHksIDEsIGhlaWdodCwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoKGNoYXIpMTc5LCB4ICsgd2lkdGggLSAxLCB5LCAxLCBoZWlnaHQsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKChjaGFyKTE5NiwgeCwgeSwgd2lkdGgsIDEsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKChjaGFyKTE5NiwgeCwgeSArIGhlaWdodCAtIDEsIHdpZHRoLCAxLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoKGNoYXIpMjE4LCB4LCB5LCAxLCAxLCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgoY2hhcikxOTIsIHgsICAgICAgICAgICAgICB5K2hlaWdodC0xLCAxLCAxLCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgoY2hhcikyMTcsIHgrd2lkdGgtMSwgICAgICB5KyBoZWlnaHQgLSAxLCAxLCAxLCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgoY2hhcikxOTEsIHggKyB3aWR0aCAtIDEsICB5LCAxLCAxLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3UmVwZWF0ZWQoY2hhciBjLCBpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodCwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSB4OyBpIDwgeCArIHdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSB5OyBqIDwgeSArIGhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIERyYXdDaGFyKGMsIGksIGosIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgU2V0QmFja0NvbG9yKGJhY2tDb2xvciwgaSwgaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldENvbG9yKGludCBjb2xvciwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbG9yICE9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICBUZXh0Q29sb3JbeCwgeV0gPSBjb2xvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEJhY2tDb2xvcihpbnQgY29sb3IsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb2xvciAhPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBCYWNrQ29sb3JbeCwgeV0gPSBjb2xvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhzdHJpbmcgdiwgaW50IHgyLCBpbnQgeTIsIG9iamVjdCBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0dyaWQoaW50IHYxLCBpbnQgdjIsIGludCB2MywgaW50IHY0LCBvYmplY3QgYm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgRHJhd0N1cnNvclJlc3VsdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGludCBTdGFydEluZGV4O1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IEVuZEluZGV4O1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgU3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIEVuZFBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIERyYXdDdXJzb3JSZXN1bHQoaW50IHN0YXJ0SW5kZXgsIGludCBlbmRJbmRleCwgVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgVmVjdG9yMkQgZW5kUG9zaXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFN0YXJ0SW5kZXggPSBzdGFydEluZGV4O1xyXG4gICAgICAgICAgICAgICAgRW5kSW5kZXggPSBlbmRJbmRleDtcclxuICAgICAgICAgICAgICAgIFN0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgRW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRTY3JlZW5OIDogSVRleHRTY3JlZW4sIElNb3VzZUlucHV0LCBJS2V5Ym9hcmRJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBUZXh0V29ybGQgVGV4dFdvcmxkO1xyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIFVwZGF0ZShmbG9hdCBmKSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRTY3JlZW5OKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dFNjcmVlbk4oVGV4dFdvcmxkIHRleHRXb3JsZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRXb3JsZCA9IHRleHRXb3JsZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyAgdm9pZCBJbml0KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRXb3JsZCA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgVGV4dFdvcmxkLkluaXQodywgaCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTW91c2VFdmVudChNb3VzZUV2ZW50cyBtb3VzZURvd24sIGludCB2MSwgaW50IHYyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0VW5pY29kZSB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgaW50IElucHV0QXNOdW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSW5wdXRVbmljb2RlIC0gNDg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludGVyZmFjZSBJVGV4dFNjcmVlblxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIFRleHRCb2FyZCBHZXRCb2FyZCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZvaWQgVXBkYXRlKGZsb2F0IGYpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSU1vdXNlSW5wdXRcclxuICAgIHtcclxuICAgICAgICB2b2lkIE1vdXNlRXZlbnQoTW91c2VFdmVudHMgZXZlbnRUeXBlLCBpbnQgdjEsIGludCB2Mik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludGVyZmFjZSBJS2V5Ym9hcmRJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBNb3VzZUV2ZW50c1xyXG4gICAgeyBcclxuICAgICAgICBNb3VzZURvd24sXHJcbiAgICAgICAgTm9uZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0U2NyZWVuSG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIElUZXh0U2NyZWVuIFNjcmVlbiB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIElNb3VzZUlucHV0IE1vdXNlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgSUtleWJvYXJkSW5wdXQgS2V5IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRBbGwob2JqZWN0IGRucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNjcmVlbiA9IGRucyBhcyBJVGV4dFNjcmVlbjtcclxuICAgICAgICAgICAgTW91c2UgPSBkbnMgYXMgSU1vdXNlSW5wdXQ7XHJcbiAgICAgICAgICAgIEtleSA9IGRucyBhcyBJS2V5Ym9hcmRJbnB1dDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwSGFuZGxpbmdcclxuICAgIHtcclxuICAgICAgICBCYXR0bGVSZW5kZXIgYmF0dGxlUmVuZGVyO1xyXG4gICAgICAgIEVDU01hbmFnZXIgZWNzO1xyXG4gICAgICAgIHB1YmxpYyBBY3Rpb24gSGFuZGxlO1xyXG4gICAgICAgIExpc3Q8SGFwcEhhbmRsZXI+IGhhbmRsZXJzID0gbmV3IExpc3Q8SGFwcEhhbmRsZXI+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSBRdWlja0FjY2Vzc29yVHdvPEhhcHBUYWdzLCBUaW1lU3RhbXBTbmFwPiBoYXBwcztcclxuICAgICAgICBwcml2YXRlIGZsb2F0IGhpZ2hlc3RIYW5kbGVkO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEhhbmRsaW5nKEJhdHRsZVJlbmRlciBiYXR0bGVSZW5kZXIsIEJhdHRsZVNldHVwIGJhdHRsZVNldHVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVSZW5kZXIgPSBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgICAgIHZhciB3b3JsZCA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQ7XHJcbiAgICAgICAgICAgIHZhciBwb3NBbmltID0gd29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuUG9zaXRpb25BbmltYXRpb24+KG5ldyBQb3NpdGlvbkFuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgdmFyIGJsaW5rQW5pbSA9IHdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkJsaW5rQW5pbT4obmV3IEJsaW5rQW5pbSgpKTtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBiYXR0bGVTZXR1cC5lY3M7XHJcbiAgICAgICAgICAgIHZhciBiYXR0bGVNYWluID0gYmF0dGxlU2V0dXAuYmF0dGxlTWFpbjtcclxuICAgICAgICAgICAgdmFyIHRpbWUgPSBiYXR0bGVTZXR1cC50aW1lU3RhbXA7XHJcbiAgICAgICAgICAgIGJhdHRsZVJlbmRlci5IYXBwSGFuZGxpbmcgPSB0aGlzO1xyXG4gICAgICAgICAgICBoYXBwcyA9IGVjcy5RdWlja0FjY2Vzc29yMjxIYXBwVGFncywgVGltZVN0YW1wU25hcD4oKTtcclxuICAgICAgICAgICAgaGlnaGVzdEhhbmRsZWQgPSAtMTtcclxuXHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChuZXcgSGFwcEhhbmRsZXIoKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYW1hZ2UgPSBlLkdldENvbXBvbmVudDxIYXBwRGFtYWdlRGF0YT4oKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZyBtZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhbWFnZS5lbGVtZW50YWxCbG9jaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gZGFtYWdlLmRhbWFnZUUgKyBcIiBhYnNvcmJzIFwiICsgZGFtYWdlLnRhcmdldEUrXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGJhdHRsZVJlbmRlci5HZXRFbnRpdHlOYW1lKGRhbWFnZS50YXJnZXQpK1wiIGlzIHVuYWZlY3R0ZWQuXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZXNzYWdlID0gYmF0dGxlUmVuZGVyLkdldEVudGl0eU5hbWUoZGFtYWdlLnRhcmdldCkgKyBcIiBnZXRzIGhpdCFcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGFtYWdlLnN1cGVyRWZmZWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGRhbWFnZS5kYW1hZ2VFICsgXCIgcmF2YWdlcyBcIiArIGRhbWFnZS50YXJnZXRFICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSArPSBiYXR0bGVSZW5kZXIuR2V0RW50aXR5TmFtZShkYW1hZ2UudGFyZ2V0KStcIiB0YWtlcyBhIGhlYXZ5IGhpdCFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGJhdHRsZU1haW4uZW50aXRpZXNbZGFtYWdlLnRhcmdldF0ucG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBibGFzdCA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eSg1LCA1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsYXN0LlNldFBvc2l0aW9uKHBvcyArIG5ldyBWZWN0b3IyRCgtMiwgLTIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibGFzdC5PcmlnaW4uRHJhd1JlcGVhdGVkKCcgJywgMSwgMSwgMywgMywgVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SLCBCYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoYmxhc3QuQW5pbUJhc2UoMC4yZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQmFja0NvbG9yKEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoZGFtYWdlLmRhbWFnZUUpLCAwLjA1ZikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZSA9IGJhdHRsZVJlbmRlci5HZXRFbnRpdHlOYW1lKGRhbWFnZS50YXJnZXQpICsgXCIgZ2V0cyBodXJ0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVSZW5kZXIuU2hvd01lc3NhZ2UobWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRlZmVuZGVyID0gYmF0dGxlUmVuZGVyLmJhdHRsZXJSZW5kZXJzW2RhbWFnZS50YXJnZXRdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIGZlID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRUZW1wRW50aXR5KGRlZmVuZGVyLldpZHRoLCBkZWZlbmRlci5IZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYW1hZ2Uuc3VwZXJFZmZlY3RpdmUgJiYgIWRhbWFnZS5lbGVtZW50YWxCbG9jayAmJiBiYXR0bGVNYWluLmVudGl0aWVzW2RhbWFnZS50YXJnZXRdLkFsaXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZlID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDMsIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBiYWNrQ29sb3IgPSBCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGRhbWFnZS5kYW1hZ2VFKTtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrQ29sb3IgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4Q29sb3IgPSBCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGRhbWFnZS5kYW1hZ2VFKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGFyIGRhbWFnZUNoYXIgPSAnWCc7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKGRhbWFnZUNoYXIsIDEsIDAsIHhDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoZGFtYWdlQ2hhciwgMSwgMSwgeENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihkYW1hZ2VDaGFyLCAxLCAyLCB4Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKGRhbWFnZUNoYXIsIDAsIDEsIHhDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoZGFtYWdlQ2hhciwgMiwgMSwgeENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZmUuT3JpZ2luLkRyYXdDaGFyKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIDAsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5Qb3NpdGlvbiA9IGRlZmVuZGVyLkdldFBvc2l0aW9uKCkgKyBuZXcgVmVjdG9yMkQoLTEsIC0xKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChmZS5BbmltQmFzZSgwLjM1ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQ2hhcignWicsIDAuMDVmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9ibGlua0FuaW0uQWRkKGZlLkFuaW1CYXNlKDAuMzVmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5CYWNrQ29sb3IoQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvLCAwLjA1ZikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJDSEFOR0UgRUxFXCIpO1xyXG5cclxuICAgICAgICAgICAgfSwgTWlzY0hhcHBUYWdzLkRhbWFnZSkpO1xyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQobmV3IEhhcHBIYW5kbGVyKChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG1kID0gZS5HZXRDb21wb25lbnQ8SGFwcE1vdmVEYXRhPigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJhdHRsZVJlbmRlci5TaG93QmF0dGxlTWVzc2FnZShiYXR0bGVSZW5kZXIuR2V0RW50aXR5TmFtZShobWQudXNlcikgKyBcIiBpcyBlbWl0dGluZyBcIiArIGhtZC5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkNIQU5HRSBFTEVcIik7XHJcblxyXG4gICAgICAgICAgICB9LCBNaXNjSGFwcFRhZ3MuQ2hhbmdlRWxlbWVudCkpO1xyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQobmV3IEhhcHBIYW5kbGVyKChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG1kID0gZS5HZXRDb21wb25lbnQ8SGFwcE1vdmVEYXRhPigpO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgZGVmZW5kZXIgPSBiYXR0bGVSZW5kZXIuYmF0dGxlclJlbmRlcnNbaG1kLnRhcmdldF07XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oYmF0dGxlTWFpbi5lbnRpdGllc1tobWQudXNlcl0ucG9zKTtcclxuICAgICAgICAgICAgICAgIHZhciBibGFzdCA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eSgzLDMpO1xyXG4gICAgICAgICAgICAgICAgYmxhc3QuU2V0UG9zaXRpb24ocG9zKyBuZXcgVmVjdG9yMkQoLTEsLTEpKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYmxhc3QuT3JpZ2luLkRyYXdSZXBlYXRlZCgnICcsMSwxLCAxLDEsIFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteSk7XHJcbiAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKGJsYXN0LkFuaW1CYXNlKDAuMmYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm8sIDAuMDVmKSk7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJDSEFOR0UgRUxFXCIpO1xyXG5cclxuICAgICAgICAgICAgfSwgTWlzY0hhcHBUYWdzLkRlYXRoKSk7XHJcbiAgICAgICAgICAgIEFjdGlvbjxFbnRpdHk+IG1vdmVNaXNzID0gKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJIQU5ETEUhM1wiKTtcclxuICAgICAgICAgICAgICAgIHZhciBobWQgPSBlLkdldENvbXBvbmVudDxIYXBwTW92ZURhdGE+KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG1mID0gZS5HZXRDb21wb25lbnQ8SGFwcE1vdmVtZW50RmFpbD4oKTtcclxuICAgICAgICAgICAgICAgIGludCBlSWQgPSBobWQudXNlcjtcclxuICAgICAgICAgICAgICAgIHZhciBtb3ZlciA9IGJhdHRsZU1haW4uZW50aXRpZXNbZUlkXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gbW92ZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zMiA9IGhtZi5tb3ZlVG87XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zRiA9IChwb3MgKyBwb3MyKSAvIDI7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGZlID0gYmF0dGxlUmVuZGVyLmJhdHRsZXJSZW5kZXJzW2VJZF07XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiTW92ZSBmYWlsXCIpO1xyXG4gICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoZmUuQW5pbUJhc2UoMC4yZiksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24obW92ZXIuUG9zaXRpb25WMkQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvc0YpKSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChuZXcgSGFwcEhhbmRsZXIobW92ZU1pc3MsIE1vdmVEYXRhVGFncy5Nb3ZlbWVudCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKG5ldyBIYXBwSGFuZGxlcigoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhID0gZS5HZXRDb21wb25lbnQ8SGFwcEFyZWE+KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG1kID0gZS5HZXRDb21wb25lbnQ8SGFwcE1vdmVEYXRhPigpO1xyXG4gICAgICAgICAgICAgICAgaW50IGVJZCA9IGhtZC51c2VyO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vdmVyID0gYmF0dGxlTWFpbi5lbnRpdGllc1tlSWRdO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgdXNlclJlbmRlciA9IGJhdHRsZVJlbmRlci5iYXR0bGVyRW50aXRpZXNbZUlkXTtcclxuICAgICAgICAgICAgICAgIHZhciBhcmVhID0gaGEuYXJlYTtcclxuICAgICAgICAgICAgICAgIHZhciBwb2ludHMgPSBhcmVhLnBvaW50cztcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdXNlRWZmZWN0ID0gd29ybGQuR2V0VGVtcEVudGl0eSgxLCAxKTtcclxuICAgICAgICAgICAgICAgIHVzZUVmZmVjdC5TZXRQb3NpdGlvbihiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihtb3Zlci5wb3MpKTtcclxuICAgICAgICAgICAgYmxpbmtBbmltLkFkZCh1c2VFZmZlY3QuQW5pbUJhc2UoMC41ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQmFja0NvbG9yKEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoaG1kLmVsZW1lbnQpLCAwLjE1ZikpO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gcG9pbnRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbnRpdHkgPSB3b3JsZC5HZXRUZW1wRW50aXR5KDEsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaW5hbFBvcyA9IGl0ZW0gKiBuZXcgVmVjdG9yMkQoaGEubWlycm9yaW5nWCwgMSkgKyBoYS5vZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsUG9zLlggPCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWxQb3MuWSA8IDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbFBvcy5YID4gNSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsUG9zLlkgPiAyKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoZmluYWxQb3MuWEludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKGZpbmFsUG9zLllJbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihmaW5hbFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5LlNldFBvc2l0aW9uKHBvcy5YSW50LCBwb3MuWUludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChlbnRpdHkuQW5pbUJhc2UoMC41ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQmFja0NvbG9yKEJhdHRsZVJlbmRlci5FbGVtZW50VG9Qcm9qQ29sb3IoaG1kLmVsZW1lbnQpLCAwLjE1ZikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBNb3ZlRGF0YVRhZ3MuQm9tYikpO1xyXG4gICAgICAgICAgICBIYW5kbGUgPSAoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFIVwiKTtcclxuICAgICAgICAgICAgICAgIGZsb2F0IG5ld0hpZ2hlc3RIYW5kbGVkID0gaGlnaGVzdEhhbmRsZWQ7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGhhcHBzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIkFEVlwiK2JhdHRsZVJlbmRlci5DYW5BZHZhbmNlR3JhcGhpY3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFiYXR0bGVSZW5kZXIuQ2FuQWR2YW5jZUdyYXBoaWNzKCkpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWdzID0gaGFwcHMuQ29tcDEoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoaGFwcHMuQ29tcDIoaSkuVGltZVNuYXAgPiBoaWdoZXN0SGFuZGxlZClcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IGhpZ2hlc3RIYW5kbGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9uZXdIaWdoZXN0SGFuZGxlZCA9IGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdIaWdoZXN0SGFuZGxlZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJIQU5ETEUhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaGFuIGluIGhhbmRsZXJzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFIXhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuLkNhbkhhbmRsZSh0YWdzLnRhZ3MpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoaGFwcHMuQ29tcDIoaSkuVGltZVNuYXAgKyBcIiAtIFwiICsgdGltZS5DdXJyZW50U25hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBTkRMRSEyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbi5IYW5kbGVyKGhhcHBzLkVudGl0eShpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShoYXBwcy5Db21wMihpKS5UaW1lU25hcCtcIiAtIFwiKyB0aW1lLkN1cnJlbnRTbmFwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBoaWdoZXN0SGFuZGxlZCA9IG5ld0hpZ2hlc3RIYW5kbGVkO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBIYXBwSGFuZGxlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50ZXJuYWwgTGlzdDxpbnQ+IG5lY2Vzc2FyeVRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIEFjdGlvbjxFbnRpdHk+IEhhbmRsZXI7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgSGFwcEhhbmRsZXIoQWN0aW9uPEVudGl0eT4gaGFuZGxlciwgcGFyYW1zIG9iamVjdFtdIHRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0IGluIHRhZ3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVjZXNzYXJ5VGFncy5BZGQoQ29udmVydC5Ub0ludDMyKHQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuSGFuZGxlciA9IGhhbmRsZXI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGludGVybmFsIGJvb2wgQ2FuSGFuZGxlKExpc3Q8aW50PiB0YWdzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBuZWNlc3NhcnlUYWdzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGFncy5Db250YWlucyhpdGVtKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBJc0RvbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhpZ2hlc3RIYW5kbGVkID49IGhhcHBzLkxlbmd0aCAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBJbnB1dEhhbmRsaW5nXHJcbiAgICB7XHJcbiAgICAgICAgaW50W10gdW5maXhlZENvbW1hbmRLZXlzID0geycxJywgJzInLCczJywnNCcgfTtcclxuICAgICAgICBEaWN0aW9uYXJ5PElucHV0LCBpbnQ+IGZpeGVkTW92ZUJ1dHRvbnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxJbnB1dCwgaW50PigpLChfbzEpPT57X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTm9ybWFsU2hvdCksJ2cnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlKSwnZicpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLkljZSksJ2knKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iKSwnYicpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXJCb21iKSwneScpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIpLCd0Jyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0KSwnZCcpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVVcCksJ3cnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93biksJ3MnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCksJ2EnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LkRvbmUpLFVuaWNvZGUuU3BhY2UpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuUmVkbyksJ3InKTtyZXR1cm4gX28xO30pO1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEdldEZpeGVkTW92ZVVuaWNvZGUoSW5wdXQgaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgdmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChmaXhlZE1vdmVCdXR0b25zLlRyeUdldFZhbHVlKGlucHV0LCBvdXQgdmFsdWUpKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSW5wdXQgUGlja2luZ0hhbmQoaW50IHVuaWNvZGVLZXksIElucHV0SG9sZGVyIGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIiBpbnB1dCArIFwiKyhjaGFyKXVuaWNvZGVLZXkpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBmaXhlZE1vdmVCdXR0b25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5WYWx1ZSA9PSB1bmljb2RlS2V5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLktleTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHVuZml4ZWRDb21tYW5kS2V5cy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVuZml4ZWRDb21tYW5kS2V5c1tpXSA9PSB1bmljb2RlS2V5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB1bmZpeGVkQ29tbWFuZFBvcyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaTIgPSAwOyBpMiA8IGlucHV0LmlucHV0cy5Db3VudDsgaTIrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5UYWdJcyhpMiwgSW5wdXRUYWdzLk1PVkVVTkZJWCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1bmZpeGVkQ29tbWFuZFBvcyA9PSBpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dC5pbnB1dHNbaTJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5maXhlZENvbW1hbmRQb3MrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdChJbnB1dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW47XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTW91c2VIb3ZlclRleHRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nW11bXSB0ZXh0cyA9IG5ldyBzdHJpbmdbMl1bXTtcclxuICAgICAgICBwdWJsaWMgTW91c2VIb3Zlck1hbmFnZXIgaG92ZXJNYW5hZ2VyO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IGVudGl0eTtcclxuXHJcbiAgICAgICAgcHVibGljIE1vdXNlSG92ZXJUZXh0KE1vdXNlSG92ZXJNYW5hZ2VyIGhvdmVyTWFuYWdlciwgVGV4dEVudGl0eSBlbnRpdHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmhvdmVyTWFuYWdlciA9IGhvdmVyTWFuYWdlcjtcclxuICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSBlbnRpdHk7XHJcbiAgICAgICAgICAgIC8vdGV4dHNbMF0gPSBuZXcgc3RyaW5nW0VudW0uR2V0VmFsdWVzKHR5cGVvZihCYXR0bGVNYWluLk1vdmVUeXBlKSkuTGVuZ3RoXTtcclxuICAgICAgICAgICAgdGV4dHNbMF0gPSBuZXcgc3RyaW5nW10ge1xyXG4gICAgICAgICAgICAgICAgXCJcIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSB1cFwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIGxlZnRcIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBkb3duXCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgcmlnaHRcIixcclxuICAgICAgICAgICAgICAgIFwiU2hvb3RzIGZvcndhcmRcIixcclxuICAgICAgICAgICAgICAgIFwiU2hvb3RzIGZpcmUgZm9yd2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTaG9vdHMgaWNlIGZvcndhcmRcIixcclxuICAgICAgICAgICAgICAgIFwiU2hvb3RzIHRodW5kZXIgZm9yd2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJUaHJvd3MgaWNlIGJvbWIgdGhyZWUgc3F1YXJlcyBmb3J3YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBcIlRocm93cyB0aHVuZGVyIGJvbWIgdGhyZWUgc3F1YXJlcyBmb3J3YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBcIlN1bW1vbnMgYW5vdGhlciBlbmVteVwiLFxyXG4gICAgICAgICAgICAgICAgXCJcIixcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVudGl0eS5SZXNldEZ1bGwoKTtcclxuICAgICAgICAgICAgaG92ZXJNYW5hZ2VyLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgYWN0aXZlID0gaG92ZXJNYW5hZ2VyLm1vdXNlSG92ZXJzQWN0aXZlO1xyXG4gICAgICAgICAgICBpZiAoYWN0aXZlLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IGlkID0gYWN0aXZlWzBdLmlkO1xyXG4gICAgICAgICAgICAgICAgaWYoaWQgPj0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgdGV4dCA9IHRleHRzW2FjdGl2ZVswXS50eXBlXVtpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5Lk9yaWdpbi5EcmF3KHRleHQsIDAsIDAsIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4ID0gYWN0aXZlWzBdLnJlY3QuWCArIDEgLSB0ZXh0Lkxlbmd0aC8yO1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5TZXRQb3NpdGlvbih4LCBhY3RpdmVbMF0ucmVjdC5ZICsgMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW47XHJcbnVzaW5nIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmF0dGxlUmVuZGVyIDogSVRleHRTY3JlZW5fXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBCYXR0bGVNYWluIHR1cm5CYXNlVHJ5O1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgU3RhZ2VEYXRhIHN0YWdlRGF0YTtcclxuICAgICAgICBwcml2YXRlIFBvc2l0aW9uQW5pbWF0aW9uIHBvc0FuaW07XHJcbiAgICAgICAgcHJpdmF0ZSBDaGFyQnlDaGFyQW5pbWF0aW9uIGNoYXJCeUNoYXJBbmltO1xyXG4gICAgICAgIHByaXZhdGUgRGVsYXlzQW5pbWF0aW9uIGRlbGF5QW5pbTtcclxuICAgICAgICBwdWJsaWMgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBUZXh0Qm9hcmQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIGludCBpbnB1dDtcclxuICAgICAgICBwdWJsaWMgaW50IElucHV0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gaW5wdXQ7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gdmFsdWU7IC8vQ29uc29sZS5Xcml0ZUxpbmUodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEhhbmRsaW5nIEhhcHBIYW5kbGluZyB7IGdldDsgaW50ZXJuYWwgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIE1vdXNlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBwdWJsaWMgTW91c2VIb3Zlck1hbmFnZXIgbW91c2VIb3ZlcjtcclxuXHJcbiAgICAgICAgLy9wdWJsaWMgTGlzdDxEZWxheWVkQWN0aW9ucz4gdGFza3MgPSBuZXcgTGlzdDxEZWxheWVkQWN0aW9ucz4oKTtcclxuICAgICAgICBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPiBtb3ZlQ2hhcnM7XHJcbiAgICAgICAgRGljdGlvbmFyeTxvYmplY3QsIHN0cmluZz4gbW92ZURlc2NyaXB0aW9ucyA9IG5ldyBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPigpO1xyXG4gICAgICAgIERpY3Rpb25hcnk8TWlzY0JhdHRsZUlucHV0LCBzdHJpbmc+IG1pc2NEZXNjcmlwdGlvbnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxNaXNjQmF0dGxlSW5wdXQsIHN0cmluZz4oKSwoX28xKT0+e19vMS5BZGQoTWlzY0JhdHRsZUlucHV0LkRvbmUsXCJET05FXCIpO19vMS5BZGQoTWlzY0JhdHRsZUlucHV0LlJlZG8sXCJSRURPXCIpO3JldHVybiBfbzE7fSk7XHJcbiAgICAgICAgcHJpdmF0ZSBEaWN0aW9uYXJ5PElucHV0LCBzdHJpbmc+IG1vdmVCdXR0b25zO1xyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgZGVidWdPbiA9IHRydWU7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZ3JpZFNjYWxlO1xyXG4gICAgICAgIHByaXZhdGUgaW50IGdyaWRPZmZzZXR4O1xyXG4gICAgICAgIHByaXZhdGUgaW50IGdyaWRPZmZzZXR5O1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8VGV4dEVudGl0eT4gYmF0dGxlclJlbmRlcnM7XHJcblxyXG4gICAgICAgIGNoYXJbXVtdIGVudGl0aWVzQ2hhcnM7XHJcbiAgICAgICAgcHJpdmF0ZSBib29sIE1lc3NhZ2VEb05vdEhpZGU7XHJcbiAgICAgICAgc3RyaW5nIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCB3YWl0aW5nRm9yTWVzc2FnZUlucHV0O1xyXG4gICAgICAgIHByaXZhdGUgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UgbGFzdFBoYXNlO1xyXG4gICAgICAgIHByaXZhdGUgVGV4dEVudGl0eSBtZXNzYWdlRW50O1xyXG5cclxuICAgICAgICBwdWJsaWMgSW5wdXRIYW5kbGluZyBpbnB1dEggPSBuZXcgSW5wdXRIYW5kbGluZygpO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlUmVuZGVyKEJhdHRsZU1haW4gYmF0dGxlTG9naWMsIFN0YWdlRGF0YSBzdGFnZURhdGEpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgc3RyaW5nW10gZW50aXR5VGV4dHMgPSB7IFwiQFwiLCBcIiZcIiwgXCIlXCIsIFwiJFwiLCBcIk9cIiwgXCJYXCIsIFwiSlwiLCBcIllcIixcIlpcIiB9O1xyXG4gICAgICAgICAgICBlbnRpdGllc0NoYXJzID0gbmV3IGNoYXJbZW50aXR5VGV4dHMuTGVuZ3RoXVtdO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGVudGl0eVRleHRzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbnRpdGllc0NoYXJzW2ldID0gZW50aXR5VGV4dHNbaV0uVG9DaGFyQXJyYXkoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHVybkJhc2VUcnkgPSBiYXR0bGVMb2dpYztcclxuICAgICAgICAgICAgdGhpcy5zdGFnZURhdGEgPSBzdGFnZURhdGE7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZCA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgcG9zQW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5Qb3NpdGlvbkFuaW1hdGlvbj4obmV3IFBvc2l0aW9uQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICBjaGFyQnlDaGFyQW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5DaGFyQnlDaGFyQW5pbWF0aW9uPihuZXcgQ2hhckJ5Q2hhckFuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgZGVsYXlBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkRlbGF5c0FuaW1hdGlvbj4obmV3IERlbGF5c0FuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkluaXQoNzAsIDQ2KTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkID0gdGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICAgICAgLy9UZXh0Qm9hcmQgPSBuZXcgVGV4dEJvYXJkKDcwLCAyNSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBwb3NBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbihuZXcgUG9zaXRpb25BbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHZhciBibGlua0FuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuQmxpbmtBbmltPihuZXcgQmxpbmtBbmltKCkpO1xyXG5cclxuICAgICAgICAgICAgYmF0dGxlclJlbmRlcnMgPSBuZXcgTGlzdDxUZXh0RW50aXR5PigpO1xyXG4gICAgICAgICAgICBVcGRhdGVCYXR0bGVSZW5kZXJDb3VudCgpO1xyXG5cclxuICAgICAgICAgICAgbWVzc2FnZUVudCA9IHRleHRXb3JsZC5HZXRGcmVlRW50aXR5KDQwLCA0KTtcclxuXHJcbiAgICAgICAgICAgIHR1cm5CYXNlVHJ5LmhhcHBNYW5hZ2VyLkFkZEhhbmRsZXIobmV3IEhhcHBzLkhhcHBIYW5kbGVyKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkhhcHBUYWcuQXR0YWNrSGl0LCAoaCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VyID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaC5HZXRBdHRyaWJ1dGVfSW50KDEpXTtcclxuICAgICAgICAgICAgICAgIGludCBkZWZlbmRlckVJRCA9IGguR2V0QXR0cmlidXRlX0ludCgwKTtcclxuICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZUVudGl0eSBkZWZlbmRlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmZW5kZXJFSUQgPj0gMClcclxuICAgICAgICAgICAgICAgICAgICBkZWZlbmRlciA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2RlZmVuZGVyRUlEXTtcclxuICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50KWguR2V0QXR0cmlidXRlX0ludCgyKTtcclxuICAgICAgICAgICAgICAgIFRleHRFbnRpdHkgZmUgPSBHZXRQcm9qVGV4dEVudGl0eShlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmZW5kZXIgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYXR0YWNrZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvczIgPSBkZWZlbmRlci5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgeERpcyA9IE1hdGguQWJzKHBvcy5YIC0gcG9zMi5YKTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCB0aW1lID0gKGZsb2F0KXhEaXMgKiAwLjFmO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwb3NBbmltLkFkZChmZS5BbmltQmFzZSh0aW1lKSwgbmV3IFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YShcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihhdHRhY2tlci5Qb3NpdGlvblYyRCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oZGVmZW5kZXIuUG9zaXRpb25WMkQpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGF0dGFja2VyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MyID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlci5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zMi5YID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MyLlggPSA2O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB4RGlzID0gTWF0aC5BYnMocG9zLlggLSBwb3MyLlgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0IHRpbWUgPSAoZmxvYXQpeERpcyAqIDAuMWY7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoZmUuQW5pbUJhc2UodGltZSksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3MyKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgLy90dXJuQmFzZVRyeS5oYXBwTWFuYWdlci5BZGRIYW5kbGVyKG5ldyBIYXBwcy5IYXBwSGFuZGxlcihCYXR0bGVNYWluLkhhcHBUYWcuRGFtYWdlVGFrZW4sIChoKSA9PlxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgdmFyIGRlZmVuZGVyID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaC5HZXRBdHRyaWJ1dGVfSW50KDApXTtcclxuICAgICAgICAgICAgLy8gICAgdmFyIGZlID0gdGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoMSwgMSk7XHJcbiAgICAgICAgICAgIC8vICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCAwLCAwKTtcclxuICAgICAgICAgICAgLy8gICAgZmUuT3JpZ2luLlBvc2l0aW9uID0gQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihkZWZlbmRlci5Qb3NpdGlvblYyRCk7XHJcbiAgICAgICAgICAgIC8vICAgIGJsaW5rQW5pbS5BZGQoZmUuQW5pbUJhc2UoMC41ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQ2hhcignICcsIDAuMWYpKTtcclxuICAgICAgICAgICAgLy8gICAgLy9TaG93TWVzc2FnZShcIkdvdCBkYW1hZ2VkXCIpO1xyXG4gICAgICAgICAgICAvL30pKTtcclxuXHJcbiAgICAgICAgICAgIHR1cm5CYXNlVHJ5LmhhcHBNYW5hZ2VyLkFkZEhhbmRsZXIobmV3IEhhcHBzLkhhcHBIYW5kbGVyKEJhdHRsZU1haW4uSGFwcFRhZy5BdHRhY2tNaXNzLCAoaCkgPT5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlciA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2guR2V0QXR0cmlidXRlX0ludCgwKV07XHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSAoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCloLkdldEF0dHJpYnV0ZV9JbnQoMSk7XHJcbiAgICAgICAgICAgICAgICBUZXh0RW50aXR5IGZlID0gR2V0UHJvalRleHRFbnRpdHkoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gYXR0YWNrZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zMiA9IHBvcztcclxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlci5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgICAgICBwb3MyLlggPSAtMTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBwb3MyLlggPSA2O1xyXG4gICAgICAgICAgICAgICAgdmFyIHhEaXMgPSBNYXRoLkFicyhwb3MuWCAtIHBvczIuWCk7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCB0aW1lID0gKGZsb2F0KXhEaXMgKiAwLjFmO1xyXG4gICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoZmUuQW5pbUJhc2UodGltZSksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3MpLFxyXG4gICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zMikpKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIG1vdmVDaGFycyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPigpLChfbzIpPT57X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUsXCJGXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2UsXCJJXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyLFwiVFwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTm9ybWFsU2hvdCxcIkdcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVSaWdodCxVbmljb2RlLlJpZ2h0YXJyb3cyK1wiXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXAsVW5pY29kZS5VcGFycm93MitcIlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24sVW5pY29kZS5Eb3duYXJyb3cyK1wiXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxVbmljb2RlLkxlZnRhcnJvdzIrXCJcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsXCJJQlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXCJUQlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuU3VtbW9uRW50aXR5LFwiU1VcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZyxcIiBcIik7cmV0dXJuIF9vMjt9KTtcclxuXHJcbiAgICAgICAgICAgIG1vdmVEZXNjcmlwdGlvbnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxvYmplY3QsIHN0cmluZz4oKSwoX28zKT0+e19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2UsXCJJY2UgU2hvdFwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSxcIkZpcmUgU2hvdFwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlcixcIlRodW5kZXIgU2hvdFwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYixcIkljZSBCb21iXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Ob3JtYWxTaG90LFwiR3VuXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsVW5pY29kZS5SaWdodGFycm93MitcIlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwLFVuaWNvZGUuVXBhcnJvdzIrXCJcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVEb3duLFVuaWNvZGUuRG93bmFycm93MitcIlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsVW5pY29kZS5MZWZ0YXJyb3cyK1wiXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyQm9tYixcIlRodW5kZXIgQm9tYlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuU3VtbW9uRW50aXR5LFwiU3VtbW9uXCIpO3JldHVybiBfbzM7fSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0NvbnNvbGUuUmVhZExpbmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVCYXR0bGVSZW5kZXJDb3VudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3aGlsZSAoYmF0dGxlclJlbmRlcnMuQ291bnQgPCB0aGlzLnR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVyUmVuZGVycy5BZGQodGV4dFdvcmxkLkdldEZyZWVFbnRpdHkoMiwgMikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdHJpbmcgR2V0RW50aXR5TmFtZShpbnQgdXNlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZUVudGl0eSBnYW1lRW50aXR5ID0gdHVybkJhc2VUcnkuZW50aXRpZXNbdXNlcl07XHJcbiAgICAgICAgICAgIHZhciBjaGFycyA9IEdldENoYXIoZ2FtZUVudGl0eSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgc3RyaW5nKGNoYXJzKSArIChnYW1lRW50aXR5LmdyYXBoaWNSZXBlYXRlZEluZGV4ICsgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFRleHRFbnRpdHkgR2V0UHJvalRleHRFbnRpdHkoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZlID0gdGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoMSwgMSk7XHJcbiAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihUZXh0Qm9hcmQuSU5WSVNJQkxFQ0hBUiwgMCwgMCk7XHJcbiAgICAgICAgICAgIGludCBlbGVtZW50Q29sb3IgPSBFbGVtZW50VG9Qcm9qQ29sb3IoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGZlLk9yaWdpbi5TZXRCYWNrQ29sb3IoZWxlbWVudENvbG9yLCAwLCAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBJbnB1dEtleSBpbnB1dCA9IChJbnB1dEtleSlJbnB1dDtcclxuICAgICAgICAgICAgaWYgKGlucHV0ICE9IElucHV0S2V5Lk5PTkUgJiYgd2FpdGluZ0Zvck1lc3NhZ2VJbnB1dClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2FpdGluZ0Zvck1lc3NhZ2VJbnB1dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9pZiAoaW5wdXQgIT0gSW5wdXRLZXkuTk9ORSkgQ29uc29sZS5Xcml0ZUxpbmUoaW5wdXQpO1xyXG4gICAgICAgICAgICAvL2ludCBpbnB1dE51bWJlciA9IGlucHV0IC0gJzAnO1xyXG4gICAgICAgICAgICAvL2lmIChkZWJ1Z09uICYmIGlucHV0ID09ICdrJylcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIERlYnVnRXh0cmEuRGVidWdFeC5TaG93KCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxhc3RQaGFzZSAhPSB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1Nob3dNZXNzYWdlKFwiUGljayB5b3VyIGNvbW1hbmRzXCIsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuU2V0QWxsKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBDb2xvcnMuRmlyZUF1cmEpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsYXN0UGhhc2UgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIlhfX1hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgSGlkZU1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5TZXRBbGwoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxhc3RQaGFzZSA9IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlO1xyXG4gICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UgPT0gQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChJbnB1dFVuaWNvZGUgPj0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXRYID0gaW5wdXRILlBpY2tpbmdIYW5kKElucHV0VW5pY29kZSwgdHVybkJhc2VUcnkuaW5wdXRzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXRYLnR5cGUgIT0gSW5wdXRUeXBlLk5vbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LklucHV0RG9uZShpbnB1dFgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vZm9yZWFjaCAodmFyIGl0ZW0gaW4gbW92ZUtleXMpXHJcbiAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgIC8vICAgIGlmIChpdGVtLlZhbHVlID09IGlucHV0KVxyXG4gICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHR1cm5CYXNlVHJ5LklucHV0RG9uZShpdGVtLktleSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoQ2FuQWR2YW5jZV9Mb2dpYygpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlRpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkhhbmRSZWNoYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1N5c3RlbS5UaHJlYWRpbmcuVGhyZWFkLlNsZWVwKDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlRpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFVwZGF0ZUJhdHRsZVJlbmRlckNvdW50KCk7XHJcbiAgICAgICAgICAgIERyYXdHcmFwaGljcyhkZWx0YSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ2FuQWR2YW5jZUdyYXBoaWNzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0V29ybGQuSXNEb25lKCkgJiYgIXdhaXRpbmdGb3JNZXNzYWdlSW5wdXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgQ2FuQWR2YW5jZV9Mb2dpYygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gQ2FuQWR2YW5jZUdyYXBoaWNzKCkgJiYgSGFwcEhhbmRsaW5nLklzRG9uZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2hvd01lc3NhZ2Uoc3RyaW5nIHMsIGJvb2wgd2FpdEZvcklucHV0ID0gdHJ1ZSwgYm9vbCBkb05vdEhpZGUgPSBmYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTWVzc2FnZURvTm90SGlkZSA9IGRvTm90SGlkZTtcclxuICAgICAgICAgICAgbWVzc2FnZSA9IHM7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VFbnQuT3JpZ2luLlJlc2V0SW52aXNpYmxlKCk7XHJcbiAgICAgICAgICAgIGZsb2F0IHRpbWVUb1dyaXRlID0gbWVzc2FnZS5MZW5ndGggKiAwLjAxNWY7XHJcbiAgICAgICAgICAgIGlmICh0aW1lVG9Xcml0ZSA+IDAuNGYpIHRpbWVUb1dyaXRlID0gMC40ZjtcclxuICAgICAgICAgICAgY2hhckJ5Q2hhckFuaW0uQWRkKG1lc3NhZ2VFbnQuQW5pbUJhc2UodGltZVRvV3JpdGUpLCBuZXcgQ2hhckJ5Q2hhckFuaW1hdGlvbi5DaGFyQnlDaGFyRGF0YSgwLCBtZXNzYWdlLkxlbmd0aCArIDEpKTtcclxuICAgICAgICAgICAgZGVsYXlBbmltLkRlbGF5KHRpbWVUb1dyaXRlICsgMC44Zik7XHJcblxyXG4gICAgICAgICAgICAvL3dhaXRpbmdGb3JNZXNzYWdlSW5wdXQgPSB3YWl0Rm9ySW5wdXQ7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIk06IFwiK3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSGlkZU1lc3NhZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHdhaXRpbmdGb3JNZXNzYWdlSW5wdXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiTTogXCIrcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTaG93QmF0dGxlTWVzc2FnZShzdHJpbmcgcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghdHVybkJhc2VUcnkuQmF0dGxlRGVjaWRlZCgpKVxyXG4gICAgICAgICAgICAgICAgU2hvd01lc3NhZ2Uocyk7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIk06IFwiK3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0dyYXBoaWNzKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW91c2VIb3Zlci5tb3VzZUhvdmVycy5DbGVhcigpO1xyXG4gICAgICAgICAgICB0dXJuQmFzZVRyeS5VcGRhdGUoZGVsdGEpO1xyXG4gICAgICAgICAgICAvL2NsZWFyIGdyaWRcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlJlc2V0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobGFzdFBoYXNlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLlNldEFsbChUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgQ29sb3JzLkJhY2tncm91bmRJbnB1dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGludCBjb250cm9sc1kgPSBncmlkU2NhbGUgKiAzICsgMTAgKyAzICsgNDtcclxuICAgICAgICAgICAgZ3JpZFNjYWxlID0gNTtcclxuICAgICAgICAgICAgZ3JpZE9mZnNldHggPSAyO1xyXG4gICAgICAgICAgICBncmlkT2Zmc2V0eSA9IDE7XHJcbiAgICAgICAgICAgIGludCBlbmVteUdyaWRPZmZYID0gZ3JpZFNjYWxlICogMztcclxuICAgICAgICAgICAgYm9vbCBkcmF3RG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3UmVwZWF0ZWQoJyAnLCBncmlkT2Zmc2V0eCwgZ3JpZE9mZnNldHksIGdyaWRTY2FsZSAqIDYsIGdyaWRTY2FsZSozLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgQ29sb3JzLkJhY2tCYXR0bGUpO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IDMgKiBncmlkU2NhbGU7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCAzICogZ3JpZFNjYWxlOyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRyYXdEb3QpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0NoYXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZE9mZnNldHggKyBpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkT2Zmc2V0eSArIGosIENvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3Q2hhcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRPZmZzZXR4ICsgaSArIGVuZW15R3JpZE9mZlgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkT2Zmc2V0eSArIGosIENvbG9ycy5HcmlkRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSAlIGdyaWRTY2FsZSA9PSAwICYmIGogJSBncmlkU2NhbGUgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0dyaWQoaSArIGdyaWRPZmZzZXR4ICsgZW5lbXlHcmlkT2ZmWCwgaiArIGdyaWRPZmZzZXR5LCBncmlkU2NhbGUsIGdyaWRTY2FsZSwgQ29sb3JzLkdyaWRFbmVteSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3R3JpZChpICsgZ3JpZE9mZnNldHgsIGogKyBncmlkT2Zmc2V0eSwgZ3JpZFNjYWxlLCBncmlkU2NhbGUsIENvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBnYW1lRW50aXR5ID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVjID0gR2V0Q2hhcihnYW1lRW50aXR5KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gZ2FtZUVudGl0eS5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgIEJhc2VVdGlscy5WZWN0b3IyRCBzY3JlZW5Qb3MgPSBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKChCYXNlVXRpbHMuVmVjdG9yMkQpcG9zKTtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LlR5cGUgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRW50aXR5VHlwZS5wYW5lbGVmZmVjdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JlZW5Qb3MuWSA9IHNjcmVlblBvcy5ZICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBzY3JlZW5Qb3MuWCA9IHNjcmVlblBvcy5YIC0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vYmF0dGxlckVudGl0aWVzW2ldLm9yaWdpbi5Qb3NpdGlvbiA9IHNjcmVlblBvcztcclxuICAgICAgICAgICAgICAgIGlmIChiYXR0bGVyUmVuZGVyc1tpXS5PcmlnaW4uUG9zaXRpb24gIT0gc2NyZWVuUG9zICYmIHRleHRXb3JsZC5Jc0RvbmUoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NBbmltLkFkZChiYXR0bGVyUmVuZGVyc1tpXS5BbmltQmFzZSgwLjE1ZiksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLlBvc2l0aW9uLCBzY3JlZW5Qb3MsIHRydWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYyA9IENvbG9ycy5IZXJvO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuVHlwZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KSBjID0gQ29sb3JzLkVuZW15O1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuVHlwZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cCkgYyA9IENvbG9ycy5pbnB1dEtleTtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LkRlYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgYyA9IFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUjtcclxuICAgICAgICAgICAgICAgIGludCBiYyA9IFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSBnYW1lRW50aXR5LmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYmMgPSBFbGVtZW50VG9BdXJhQ29sb3IoZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuRGVhZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGVjLkxlbmd0aCArIDE7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZXJSZW5kZXJzW2ldLk9yaWdpbi5EcmF3Q2hhcihUZXh0Qm9hcmQuSU5WSVNJQkxFQ0hBUiwgaiwgMCwgYywgYmMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLkRyYXcoZWMsIDAsIDAsIGMsIGJjKTtcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVyUmVuZGVyc1tpXS5PcmlnaW4uRHJhd09uZURpZ2l0KGdhbWVFbnRpdHkuZ3JhcGhpY1JlcGVhdGVkSW5kZXggKyAxLCAwICsgZWMuTGVuZ3RoLCAwLCBjLCBiYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGludCB0ZXh0Qm9hcmRIZWlnaHQgPSAzICogZ3JpZFNjYWxlO1xyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9pbnQgeSA9IDI7XHJcbiAgICAgICAgICAgICAgICAvL2ludCB4ID0gNiAqIGdyaWRTY2FsZSArIDIwO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpbnQgeCA9IDM7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlID09IEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIERyYXdDb250cm9scyhjb250cm9sc1ksIHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS50aW1lVG9DaG9vc2UgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXQgcmF0aW8gPSB0dXJuQmFzZVRyeS50aW1lVG9DaG9vc2UgLyB0dXJuQmFzZVRyeS50aW1lVG9DaG9vc2VNYXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3UmVwZWF0ZWQoJyAnLCB4LCBjb250cm9sc1kgKyAxNiwgKGludCkocmF0aW8gKiAxNSksIDEsIENvbG9ycy5Cb2FyZCwgQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdSZXBlYXRlZCgnICcsIHggLSAxLCBjb250cm9sc1kgLSAxLCAxNSwgMTUsIENvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGludCB0dXJuT3JkZXJYID0gNiAqIGdyaWRTY2FsZSArIDU7XHJcbiAgICAgICAgICAgIGludCB0dXJuT3JkZXJZID0gMjtcclxuICAgICAgICAgICAgdHVybk9yZGVyWCA9IDI7XHJcbiAgICAgICAgICAgIHR1cm5PcmRlclkgPSAzICogZ3JpZFNjYWxlICsgMiA7XHJcblxyXG4gICAgICAgICAgICBEcmF3VHVybk9yZGVyKHR1cm5PcmRlclgsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBpZighc3RhZ2VEYXRhLmhpZGVMaWZlVUkpXHJcbiAgICAgICAgICAgICAgICBEcmF3TGlmZSh0dXJuT3JkZXJYKzI1LCB0dXJuT3JkZXJZKTtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW50IFggPSAyO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zdCBpbnQgWSA9IDE2O1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZUVudC5TZXRQb3NpdGlvbihYLCBjb250cm9sc1kgLSAyKTtcclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlICE9IG51bGwgJiYgKCFDYW5BZHZhbmNlR3JhcGhpY3MoKSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0dyaWQoXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbWVzc2FnZUVudC5PcmlnaW4uUG9zaXRpb24uWEludCwgbWVzc2FnZUVudC5PcmlnaW4uUG9zaXRpb24uWUludCwgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbWVzc2FnZUVudC5XaWR0aCwgbWVzc2FnZUVudC5IZWlnaHQsIENvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZXNzYWdlRW50Lk9yaWdpbi5EcmF3R3JpZCgwLCAwLCA0MCwgNCwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlRW50Lk9yaWdpbi5EcmF3V2l0aExpbmVicmVha3MobWVzc2FnZSwgMSwgMCwgMSwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIU1lc3NhZ2VEb05vdEhpZGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUVudC5PcmlnaW4uU2V0QWxsKCcgJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3UmVwZWF0ZWQoJyAnLFgsIFksIDQwLCA0LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5DdXJzb3JOZXdMaW5lKDEpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSgxKTtcclxuICAgICAgICAgICAgLy90ZXh0Qm9hcmQuRHJhd19DdXJzb3IodHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UuVG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICB0ZXh0V29ybGQuRHJhd0NoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5BZHZhbmNlVGltZShkZWx0YSk7XHJcbiAgICAgICAgICAgIGlmIChDYW5BZHZhbmNlR3JhcGhpY3MoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSGFwcEhhbmRsaW5nLkhhbmRsZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKENhbkFkdmFuY2VHcmFwaGljcygpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LmhhcHBNYW5hZ2VyLlRyeUhhbmRsZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vaWYgKENhbkFkdmFuY2UoKSlcclxuICAgICAgICAgICAgLy97XHJcblxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEVsZW1lbnRUb0F1cmFDb2xvcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgYmMgPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1I7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuRmlyZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuRmlyZUF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5JY2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLkljZUF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5UaHVuZGVyQXVyYTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGJjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgRWxlbWVudFRvUHJvakNvbG9yKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBiYyA9IENvbG9ycy5pbnB1dEtleTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5GaXJlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5GaXJlU2hvdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkljZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuSWNlQXVyYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLlRodW5kZXJBdXJhO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYmM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihCYXNlVXRpbHMuVmVjdG9yMkQgcG9zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHggPSBwb3MuWDtcclxuICAgICAgICAgICAgdmFyIHkgPSBwb3MuWTtcclxuICAgICAgICAgICAgdmFyIHNjcmVlblBvcyA9IG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoeCAqIGdyaWRTY2FsZSArIGdyaWRTY2FsZSAvIDIgKyBncmlkT2Zmc2V0eCwgMiAqIGdyaWRTY2FsZSAtIHkgKiBncmlkU2NhbGUgKyBncmlkU2NhbGUgLyAyICsgZ3JpZE9mZnNldHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2NyZWVuUG9zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdDb250cm9scyhpbnQgeSwgaW50IHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3R3JpZCh4IC0gMiwgeSAtIDEsIDIwLCAxNSwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHgsIHkpO1xyXG4gICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3X0N1cnNvcihcIkNvbnRyb2xzXCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcblxyXG4gICAgICAgICAgICAvL0lucHV0VGFncyBpbnB1dFRhZyA9IElucHV0VGFncy5NT1ZFRklYO1xyXG4gICAgICAgICAgICBpbnQgeU9mZiA9IDA7XHJcbiAgICAgICAgICAgIHlPZmYgPSBEcmF3SW5wdXRzX0ZpeCh5LCB4LCBJbnB1dFRhZ3MuTU9WRUZJWCwgeU9mZik7XHJcbiAgICAgICAgICAgIC8veU9mZisrO1xyXG4gICAgICAgICAgICB5T2ZmID0gRHJhd0lucHV0c19GaXgoeSwgeCwgSW5wdXRUYWdzLk1JU0MsIHlPZmYpO1xyXG4gICAgICAgICAgICAvL3lPZmYrKztcclxuICAgICAgICAgICAgLy95T2ZmID0gRHJhd0lucHV0c19GaXgoeSwgeCwgSW5wdXRUYWdzLk1PVkVVTkZJWCwgeU9mZik7XHJcblxyXG4gICAgICAgICAgICBpbnQgYXR0YWNrTnVtYmVyID0gMTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5pbnB1dHMuaW5wdXRzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCB4MiA9IHg7XHJcbiAgICAgICAgICAgICAgICBpbnQgeTIgPSB5ICsgMiArIHlPZmY7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0dXJuQmFzZVRyeS5pbnB1dHMuaW5wdXRzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5pbnB1dHMuVGFnSXMoaSwgSW5wdXRUYWdzLk1PVkVVTkZJWCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgeU9mZisrO1xyXG4gICAgICAgICAgICAgICAgICAgIHlPZmYrKztcclxuICAgICAgICAgICAgICAgICAgICBpbnQgdW5pY29kZSA9ICcwJyArIGF0dGFja051bWJlcjtcclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2tOdW1iZXIrKztcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZUhvdmVyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgUmVjdCh4MiAtIDIsIHkyLCAyMCwgMSksIDAsIGlucHV0LmFyZzEpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3Q2hhcignWycsIHgyIC0gMSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IGxlbmd0aEJuYW1lID0gVGV4dEJvYXJkLkRyYXdVbmljb2RlTGFiZWwodW5pY29kZSwgeDIsIHkyLCBDb2xvcnMuaW5wdXRLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKCddJywgeDIgKyBsZW5ndGhCbmFtZSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBkZXNjcmlwdGlvbiA9IHN0cmluZy5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTW92ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlIG0gPSAoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZURlc2NyaXB0aW9ucy5UcnlHZXRWYWx1ZShtLCBvdXQgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBtLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5NaXNjQmF0dGxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWlzY0JhdHRsZUlucHV0IGFyZzEgPSAoTWlzY0JhdHRsZUlucHV0KWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gbWlzY0Rlc2NyaXB0aW9uc1thcmcxXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoZGVzY3JpcHRpb24sIHgyICsgMiArIDUsIHkyLCBDb2xvcnMuSW5wdXREZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgYyA9IG1vdmVDaGFyc1ttb3ZlXTtcclxuICAgICAgICAgICAgICAgIC8vRHJhd01vdmUobW92ZSwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXcoYywgeDIgKyAzLCB5MiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdXaXRoR3JpZChjK1wiXCIsIHgyLCB5ICsgMiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgRHJhd0lucHV0c19GaXgoaW50IHksIGludCB4LCBJbnB1dFRhZ3MgaW5wdXRUYWcsIGludCB5T2ZmKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuaW5wdXRzLmlucHV0cy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgeDIgPSB4O1xyXG4gICAgICAgICAgICAgICAgaW50IHkyID0geSArIDIgKyB5T2ZmO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdHVybkJhc2VUcnkuaW5wdXRzLmlucHV0c1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuaW5wdXRzLlRhZ0lzKGksIGlucHV0VGFnKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdW5pY29kZSA9IGlucHV0SC5HZXRGaXhlZE1vdmVVbmljb2RlKGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgZm9yY2VJbnB1dExhYmVsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgZm9yY2VDb21tYW5kTGFiZWwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1bmljb2RlID09ICd3JylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmNlSW5wdXRMYWJlbCA9IFwiV0FTRFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JjZUNvbW1hbmRMYWJlbCA9IFwiXCIgKyBVbmljb2RlLlVwYXJyb3cyICsgVW5pY29kZS5MZWZ0YXJyb3cyICsgVW5pY29kZS5Eb3duYXJyb3cyICsgVW5pY29kZS5SaWdodGFycm93MjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVuaWNvZGUgPT0gJ2EnIHx8IHVuaWNvZGUgPT0gJ3MnIHx8IHVuaWNvZGUgPT0gJ2QnKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHlPZmYrKztcclxuICAgICAgICAgICAgICAgICAgICB5T2ZmKys7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtb3VzZUhvdmVyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgUmVjdCh4MiAtIDIsIHkyLCAyMCwgMSksIDAsIGlucHV0LmFyZzEpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3Q2hhcignWycsIHgyIC0gMSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IGxlbmd0aEJuYW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2VJbnB1dExhYmVsID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aEJuYW1lID0gVGV4dEJvYXJkLkRyYXdVbmljb2RlTGFiZWwodW5pY29kZSwgeDIsIHkyLCBDb2xvcnMuaW5wdXRLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3KGZvcmNlSW5wdXRMYWJlbCwgeDIsIHkyLCBDb2xvcnMuaW5wdXRLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGhCbmFtZSA9IGZvcmNlSW5wdXRMYWJlbC5MZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKCddJywgeDIgKyBsZW5ndGhCbmFtZSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBkZXNjcmlwdGlvbiA9IHN0cmluZy5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTW92ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JjZUNvbW1hbmRMYWJlbCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGZvcmNlQ29tbWFuZExhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUgbSA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZSlpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZURlc2NyaXB0aW9ucy5UcnlHZXRWYWx1ZShtLCBvdXQgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2NyaXB0aW9uID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBtLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTWlzY0JhdHRsZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1pc2NCYXR0bGVJbnB1dCBhcmcxID0gKE1pc2NCYXR0bGVJbnB1dClpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IG1pc2NEZXNjcmlwdGlvbnNbYXJnMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3KGRlc2NyaXB0aW9uLCB4MiArIDIgKyA1LCB5MiwgQ29sb3JzLklucHV0RGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIGMgPSBtb3ZlQ2hhcnNbbW92ZV07XHJcbiAgICAgICAgICAgICAgICAvL0RyYXdNb3ZlKG1vdmUsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3KGMsIHgyICsgMywgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3V2l0aEdyaWQoYytcIlwiLCB4MiwgeSArIDIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB5T2ZmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdMaWZlKGludCB0dXJuT3JkZXJYLCBpbnQgdHVybk9yZGVyWSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdHcmlkKHR1cm5PcmRlclggLSAxLCB0dXJuT3JkZXJZIC0gMSwgMjAsIDksIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh0dXJuT3JkZXJYICsgMSwgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihcIkxpZmVcIiwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHR1cm5PcmRlclggKyA4LCB0dXJuT3JkZXJZKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKFwiRWxlbWVudFwiLCBDb2xvcnMuV2luZG93TGFiZWwpO1xyXG4gICAgICAgICAgICBpbnQgaW5kZXggPSAtMTsgLy91c2luZyB0aGlzIGJlY2F1c2Ugbm90IGFsbCB1bml0cyBnZXQgZHJhd25cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5lbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGVcclxuXHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBlID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuZHJhd0xpZmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuRGVhZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCBjb2xvciA9IENvbG9ycy5IZXJvVHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gQ29sb3JzLkVuZW15VHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd09uZURpZ2l0X0N1cnNvcigoaW50KWUubGlmZS5WYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4T2ZmID0gdHVybk9yZGVyWCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHlPZmYgPSB0dXJuT3JkZXJZICsgMiArIGluZGV4KjI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9EcmF3RW50aXR5Q2hhcihlLCBjb2xvciwgeE9mZiwgeU9mZik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0NoYXIoR2V0Q2hhcihlKSwgeE9mZiwgdHVybk9yZGVyWSArIDIsIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1R3b0RpZ2l0cygoaW50KWUubGlmZSwgeE9mZiwgeU9mZiwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBlbGVtZW50ID0gc3RyaW5nLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZS5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkZpcmU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gXCJGaXJlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkljZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBcIkljZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IFwiVGh1bmRlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVDb2xvciA9IEVsZW1lbnRUb0F1cmFDb2xvcihlLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhlbGVtZW50LCB4T2ZmICsgNywgeU9mZiwgZUNvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3T25lRGlnaXRfQ3Vyc29yKChpbnQpZS5saWZlLlZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSh4OiAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdUdXJuT3JkZXIoaW50IHR1cm5PcmRlclgsIGludCB0dXJuT3JkZXJZLCBib29sIGhvcml6b250YWwgPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmFsdWUgdHVybnNQZXJQaGFzZSA9IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2U7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh0dXJuT3JkZXJYKzMsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJDb21tYW5kc1wiLCBDb2xvcnMuV2luZG93TGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgaW50IGRyYXdpbmdJZCA9IC0xO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBlID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuZHJhd1R1cm4pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuRGVhZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3aW5nSWQrKztcclxuICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3IgPSBDb2xvcnMuSGVyb1R1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IENvbG9ycy5FbmVteVR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3T25lRGlnaXRfQ3Vyc29yKChpbnQpZS5saWZlLlZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHhPZmYgPSB0dXJuT3JkZXJYICsgMSArIGRyYXdpbmdJZCAqIDM7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHlFbnRpdHkgPSB0dXJuT3JkZXJZICsgMjtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeUZpcnN0TW92ZSA9IHR1cm5PcmRlclkgKyAzO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4Rmlyc3RNb3ZlID0geE9mZjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4T2ZmID0gdHVybk9yZGVyWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeUVudGl0eSA9IHR1cm5PcmRlclkrMitkcmF3aW5nSWQqMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeUZpcnN0TW92ZSA9IHlFbnRpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhGaXJzdE1vdmUgPSB0dXJuT3JkZXJYKzM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIERyYXdFbnRpdHlDaGFyKGUsIGNvbG9yLCB4T2ZmLCB5RW50aXR5KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuU2V0Q3Vyc29yQXQoeEZpcnN0TW92ZSwgeUZpcnN0TW92ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkyID0gMDsgaTIgPCB0dXJuc1BlclBoYXNlOyBpMisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGNvbG9yMiA9IGNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJhd2luZ0lkID09IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSAmJiBpMiA9PSB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS50dXJuICYmIHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlID09IEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yMiA9IENvbG9ycy5IZXJvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaTIgPCB0dXJuc1BlclBoYXNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgYyA9IEdldENoYXJPZk1vdmUoZSwgaTIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VIb3Zlci5tb3VzZUhvdmVycy5BZGQobmV3IE1vdXNlSG92ZXIobmV3IFJlY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvclgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvclksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5MZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCwgZS5tb3Zlc1tpMl0pKTsgLy9hZGQgaGVyZS4uLj8gQF9AXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoYywgY29sb3IyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChob3Jpem9udGFsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSBjLkxlbmd0aDsgaiA8IDM7IGorKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5BZHZhbmNlQ3Vyc29yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKCcgJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoJyAnLCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhvcml6b250YWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSh4OiB4Rmlyc3RNb3ZlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSh4OiAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdFbnRpdHlDaGFyKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZUVudGl0eSBlLCBpbnQgY29sb3IsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoYXJbXSBjaGFycyA9IEdldENoYXIoZSk7XHJcblxyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhjaGFycywgeCwgeSwgY29sb3IpO1xyXG4gICAgICAgICAgICAvL2lmIChlLmdyYXBoaWNSZXBlYXRlZEluZGV4ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdPbmVEaWdpdChlLmdyYXBoaWNSZXBlYXRlZEluZGV4ICsgMSwgeCArIGNoYXJzLkxlbmd0aCwgeSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0cmluZyBHZXRDaGFyT2ZNb3ZlKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGUsIGludCBpMilcclxuICAgICAgICB7XHJcblxyXG5cclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gZS5tb3Zlc1tpMl07XHJcbiAgICAgICAgICAgIGlmICh2YWwgPj0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiBtb3ZlQ2hhcnNbKEJhdHRsZU1haW4uTW92ZVR5cGUpdmFsXTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiIFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNoYXJbXSBHZXRDaGFyKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGdhbWVFbnRpdHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZW50aXRpZXNDaGFyc1tnYW1lRW50aXR5LmdyYXBoaWNdO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3TW92ZShWYWx1ZSBtb3ZlLCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobW92ZS5WYWwgPj0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5Nb3ZlVHlwZSBtID0gKEJhdHRsZU1haW4uTW92ZVR5cGUpbW92ZS5WYWw7XHJcbiAgICAgICAgICAgICAgICBEcmF3TW92ZShtLCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoJyAnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3TW92ZShCYXR0bGVNYWluLk1vdmVUeXBlIG1vdmUsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjID0gbW92ZUNoYXJzW21vdmVdO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoYywgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGV4dEJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBjbGFzcyBDb2xvcnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgR3JpZEhlcm8gPSAxO1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEdyaWRFbmVteSA9IDI7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgSGVybyA9IDM7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgRW5lbXkgPSA0O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEhlcm9UdXJuID0gNTtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBFbmVteVR1cm4gPSA2O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IGlucHV0S2V5ID0gNztcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBCb2FyZCA9IDg7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgV2luZG93TGFiZWwgPSA5O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEZpcmVBdXJhID0gMTA7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgSWNlQXVyYSA9IDExO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IFRodW5kZXJBdXJhID0gMTI7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgRmlyZVNob3QgPSAxMztcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBJY2VTaG90ID0gMTQ7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgVGh1bmRlclNob3QgPSAxNTtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBCYWNrZ3JvdW5kSW5wdXQgPSAxNjtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBJbnB1dERlc2NyaXB0aW9uID0gMTc7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgQmFja0JhdHRsZSA9IDE4O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIElucHV0S2V5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOT05FLCBMRUZULCBSSUdIVCwgRE9XTiwgVVAsIEZJUkUsIFJFRE8sIERPTkUsXHJcbiAgICAgICAgICAgIElDRSxcclxuICAgICAgICAgICAgVEhVTkRFUixcclxuICAgICAgICAgICAgTk9STUFMU0hPVFxyXG4gICAgICAgIH1cclxuXG5cclxuXHJcbiAgICBcbnByaXZhdGUgaW50IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19JbnB1dFVuaWNvZGU9LTE7fVxyXG5cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuO1xyXG51c2luZyBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmc7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBHYW1lTWFpbiA6IElUZXh0U2NyZWVuX1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgQmF0dGxlTWFpbiBiYXR0bGVNYWluO1xyXG4gICAgICAgIHByaXZhdGUgQmF0dGxlUmVuZGVyIGJhdHRsZVJlbmRlcjtcclxuICAgICAgICBwcml2YXRlIE1vZGVTZWxlY3Rpb25TY3JlZW4gbW9kZVNlbGVjdGlvblNjcmVlbjtcclxuICAgICAgICBJVGV4dFNjcmVlbl8gbWFpbkRyYXc7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXN1bHRTY3JlZW4gcmVzdWx0U2NyZWVuO1xyXG4gICAgICAgIC8vSVRleHRTY3JlZW5bXSBzY3JlZW5zID0gbmV3IElUZXh0U2NyZWVuWzVdO1xyXG4gICAgICAgIGludCBkaWZmaWN1bHR5O1xyXG4gICAgICAgIGludFtdIGVuZW15QW1vdW50ID0gbmV3IGludFtdICAgeyAxLCAxLCAyLCAxLCAyLCAzLCAyLCAzLCAxLCAyLCAzLCAzIH07XHJcbiAgICAgICAgaW50W10gdHVybkFtb3VudCA9IG5ldyBpbnRbXSB7IDIsIDQsIDIsIDYsIDQsIDIsIDYsIDQsIDgsIDgsIDYsIDggfTtcclxuICAgICAgICBwcml2YXRlIE1vdXNlSG92ZXJUZXh0IG1vdXNlSG92ZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBHYW1lTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuID0gbmV3IE1vZGVTZWxlY3Rpb25TY3JlZW4oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFJlc2V0KCk7XHJcbiAgICAgICAgICAgIG1vZGVTZWxlY3Rpb25TY3JlZW4ubW9kZSA9IDE7XHJcbiAgICAgICAgICAgIG1vZGVTZWxlY3Rpb25TY3JlZW4ud2FubmFMZWF2ZSA9IDE7XHJcbiAgICAgICAgICAgIG1haW5EcmF3ID0gbW9kZVNlbGVjdGlvblNjcmVlbjtcclxuICAgICAgICAgICAgLy9SZXNldCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGludCBtb2RlID0gbW9kZVNlbGVjdGlvblNjcmVlbi5tb2RlO1xyXG4gICAgICAgICAgICBib29sIHRpbWVBdHRhY2sgPSBtb2RlU2VsZWN0aW9uU2NyZWVuLnRpbWVBdHRhY2s7XHJcblxyXG4gICAgICAgICAgICB2YXIgZWNzID0gRUNTTWFuYWdlci5DcmVhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIFN0YWdlRGF0YUNyZWF0b3Igc2RjID0gbmV3IFN0YWdlRGF0YUNyZWF0b3IoZWNzKTtcclxuICAgICAgICAgICAgdmFyIHN0YWdlcyA9IGVjcy5RdWlja0FjY2Vzc29yMTxTdGFnZURhdGE+KCk7XHJcbiAgICAgICAgICAgIC8vdmFyIHN0YWdlcyA9IHNkYy5zdGFnZXM7XHJcblxyXG4gICAgICAgICAgICBpbnQgZCA9IGRpZmZpY3VsdHk7XHJcbiAgICAgICAgICAgIGlmIChzdGFnZXMuQ291bnQgPD0gZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyYXcgPSBtb2RlU2VsZWN0aW9uU2NyZWVuO1xyXG4gICAgICAgICAgICAgICAgbW9kZVNlbGVjdGlvblNjcmVlbi5SZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgZGlmZmljdWx0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9kID0gMjAwO1xyXG4gICAgICAgICAgICBpZiAoZCA+PSBlbmVteUFtb3VudC5MZW5ndGgpIGQgPSBlbmVteUFtb3VudC5MZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBpbnQgbkVuZW1pZXMgPSBlbmVteUFtb3VudFtkXTtcclxuXHJcbiAgICAgICAgICAgIEJhdHRsZVNldHVwIGJhdHRsZVNldHVwID0gbmV3IEJhdHRsZVNldHVwKG1vZGUsIG5ldyBCYXR0bGVCYXNpY0NvbmZpZyhuVHVybnM6IDUsIG5FbmVtaWVzOiBuRW5lbWllcyksIGRpZmZpY3VsdHksIGVjcyk7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4gPSBiYXR0bGVTZXR1cC5iYXR0bGVNYWluO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQobmV3IEVuZW15U3Bhd25EYXRhKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpKTtcclxuICAgICAgICAgICAgLy9lY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChuZXcgRW5lbXlTcGF3bkRhdGEoMSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGZsb2F0IHRpbWVUb0Nob29zZSA9IC0xO1xyXG4gICAgICAgICAgICBpZiAodGltZUF0dGFjaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZVRvQ2hvb3NlID0gKDVmICogdHVybkFtb3VudFtkXSkgKiBuRW5lbWllcztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4udGltZVRvQ2hvb3NlTWF4ID0gdGltZVRvQ2hvb3NlO1xyXG4gICAgICAgICAgICBiYXR0bGVNYWluLkluaXQoKTtcclxuICAgICAgICAgICAgYmF0dGxlUmVuZGVyID0gbmV3IEJhdHRsZVJlbmRlcihiYXR0bGVNYWluLCBzdGFnZURhdGE6c3RhZ2VzLkNvbXAxKGRpZmZpY3VsdHkpKTtcclxuICAgICAgICAgICAgbmV3IEhhcHBIYW5kbGluZyhiYXR0bGVSZW5kZXIsIGJhdHRsZVNldHVwKTtcclxuICAgICAgICAgICAgbWFpbkRyYXcgPSBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgICAgIHJlc3VsdFNjcmVlbiA9IG5ldyBSZXN1bHRTY3JlZW4oKTtcclxuICAgICAgICAgICAgcmVzdWx0U2NyZWVuLmJhdHRsZVJlc3VsdCA9IGJhdHRsZU1haW4uYmF0dGxlUmVzdWx0O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgTW91c2VIb3Zlck1hbmFnZXIgaG92ZXJNYW5hZ2VyID0gbmV3IE1vdXNlSG92ZXJNYW5hZ2VyKE1vdXNlKTtcclxuICAgICAgICAgICAgaG92ZXJNYW5hZ2VyLm1vdXNlSG92ZXJzLkFkZChuZXcgTW91c2VIb3ZlcihuZXcgQmFzZVV0aWxzLlJlY3QoNSw1LDUsNSksIDAsMCkpO1xyXG4gICAgICAgICAgICBtb3VzZUhvdmVyID0gbmV3IE1vdXNlSG92ZXJUZXh0KGhvdmVyTWFuYWdlciwgYmF0dGxlUmVuZGVyLnRleHRXb3JsZC5HZXRGcmVlRW50aXR5KDUwLCAxKSk7XHJcblxyXG4gICAgICAgICAgICBiYXR0bGVSZW5kZXIubW91c2VIb3ZlciA9IGhvdmVyTWFuYWdlcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0IHsgc2V0IHsgbWFpbkRyYXcuSW5wdXQgPSB2YWx1ZTsgfSBnZXQgeyByZXR1cm4gJ2MnOyB9IH1cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0VW5pY29kZSB7IHNldCB7IG1haW5EcmF3LklucHV0VW5pY29kZSA9IHZhbHVlOyB9IGdldCB7IHJldHVybiAnYyc7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgTW91c2VJTyBNb3VzZSB7IHNldDsgZ2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdXNlSG92ZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIG1haW5EcmF3LkRyYXcoZik7XHJcbiAgICAgICAgICAgIG1haW5EcmF3Lk1vdXNlID0gTW91c2U7XHJcbiAgICAgICAgICAgIGlmIChtYWluRHJhdyA9PSBiYXR0bGVSZW5kZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChiYXR0bGVNYWluLklzT3ZlcigpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXR0bGVNYWluLklzVmljdG9yeSgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmljdWx0eSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRTY3JlZW4uRW50ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYWluRHJhdyA9IHJlc3VsdFNjcmVlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWFpbkRyYXcgPT0gcmVzdWx0U2NyZWVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0U2NyZWVuLndhbm5hTGVhdmUgPT0gMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtYWluRHJhdyA9PSBtb2RlU2VsZWN0aW9uU2NyZWVuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9kZVNlbGVjdGlvblNjcmVlbi53YW5uYUxlYXZlID09IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1haW5EcmF3LkdldEJvYXJkKCk7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgTW91c2VJTyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fTW91c2U9bmV3IE1vdXNlSU8oKTt9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW47XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFJlc3VsdFNjcmVlbiA6IElUZXh0U2NyZWVuX1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuICAgICAgICBzdHJpbmcgeW91V2luID0gXCJZb3UgV2luXCI7XHJcbiAgICAgICAgcHVibGljIE1vdXNlSU8gTW91c2UgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHN0cmluZyB5b3VMb3NlID0gXCJZb3UgbG9zZVwiO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVSZXN1bHQgYmF0dGxlUmVzdWx0O1xyXG4gICAgICAgIHB1YmxpYyBSZXN1bHRTY3JlZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuSW5pdCg3MCwgMjUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IHdhbm5hTGVhdmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXQgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyBnZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRW50ZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2FubmFMZWF2ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KGZsb2F0IGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoSW5wdXRVbmljb2RlID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2FubmFMZWF2ZSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RyaW5nIG1lc3NhZ2UgPSB5b3VXaW47XHJcbiAgICAgICAgICAgIGlmIChiYXR0bGVSZXN1bHQucmVzdWx0ID09IDIpIG1lc3NhZ2UgPSB5b3VMb3NlO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihtZXNzYWdlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZXN0R2FtZSA6IElUZXh0R2FtZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBUZXh0U2NyZWVuSG9sZGVyIFNjcmVlbkhvbGRlciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUgR2V0UGFsZXR0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRGVmYXVsdFBhbGV0dGVzLkM0Tm92ZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRTY3JlZW5OIHNjcmVlbiA9IG5ldyBUZXN0U2NyZWVuKCk7XHJcbiAgICAgICAgICAgIFNjcmVlbkhvbGRlci5TZXRBbGwoc2NyZWVuKTtcclxuICAgICAgICAgICAgc2NyZWVuLkluaXQodywgaCk7XHJcbiAgICAgICAgICAgIHNjcmVlbi5HZXRCb2FyZCgpLkRyYXcoXCJUZXN0XCIsIDAsMCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBUZXh0U2NyZWVuSG9sZGVyIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19TY3JlZW5Ib2xkZXI9bmV3IFRleHRTY3JlZW5Ib2xkZXIoKTt9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRlc3RTY3JlZW4gOiBUZXh0U2NyZWVuTlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW47XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1vZGVTZWxlY3Rpb25TY3JlZW4gOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcbiAgICAgICAgc3RyaW5nIHlvdVdpbiA9IFwiWW91IFdpblwiO1xyXG4gICAgICAgIHN0cmluZyB5b3VMb3NlID0gXCJZb3UgbG9zZVwiO1xyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIE1vdXNlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBpbnQgc2VsZWN0aW9uO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVSZXN1bHQgYmF0dGxlUmVzdWx0O1xyXG4gICAgICAgIHB1YmxpYyBNb2RlU2VsZWN0aW9uU2NyZWVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZCA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkluaXQoNzAsIDI1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGludCB3YW5uYUxlYXZlO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgbW9kZTtcclxuICAgICAgICBwdWJsaWMgYm9vbCB0aW1lQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgcHVibGljIGludCBzY3JlZW5TdGFnZTtcclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dCB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFbnRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3YW5uYUxlYXZlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuUmVzZXQoKTtcclxuICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleSBpayA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5KSBJbnB1dDtcclxuICAgICAgICAgICAgbW9kZSA9IC0xO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXcoXCJQcm9nQmF0dGxlIFByb3RvdHlwZSB2MC4zXCIsIDEsIDEsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3KFwiQSBnYW1lIGJ5IFBpZHJvaFwiLCAxLCAyLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgIGlmIChzY3JlZW5TdGFnZSA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGlrKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuTEVGVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NyZWVuU3RhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5SSUdIVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NyZWVuU3RhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXR0YWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkRPV046XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVBdHRhY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LlVQOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUF0dGFjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3ddIFZhbmlsbGFcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDQsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIlthXSBFbGVtZW50YWxcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDUsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIltzXSBWYW5pbGxhIFRpbWUgQXR0YWNrXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA2LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbZF0gRWxlbWVudGFsIFRpbWUgQXR0YWNrXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA3LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzY3JlZW5TdGFnZSA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWsgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5VUClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpayA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkRPV04pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuU3RhZ2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJFbGVtZW50YWwgTW9kZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogLTUpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJGaXJlIGJlYXRzIEljZSwgSWNlIGJlYXRzIFRodW5kZXIsIFRodW5kZXIgYmVhdHMgZmlyZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogLTIpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJTYW1lIGVsZW1lbnQgPSBubyBkYW1hZ2VcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDApO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJJdCBpcyBiZXN0IHRvIGhhdmUgaGFkIHNvbWUgZXhwZXJpZW5jZSB3aXRoIHZhbmlsbGEgbW9kZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogMSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIlt3XSBTdGFydCBFbGVtZW50YWwgTW9kZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNCwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3NdIEdvIGJhY2tcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDUsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZSA+PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3YW5uYUxlYXZlID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy9zdHJpbmcgbWVzc2FnZSA9IHlvdVdpbjtcclxuICAgICAgICAgICAgLy9pZiAoYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAyKSBtZXNzYWdlID0geW91TG9zZTtcclxuICAgICAgICAgICAgLy90ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihtZXNzYWdlLCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlID0gLTE7XHJcbiAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmxpbmtBbmltIDogVGV4dEFuaW1hdGlvbjxCbGlua0FuaW0uQmxpbmtEYXRhPlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgQmxpbmtEYXRhIG1haW5EYXRhLCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Nb2RpZnkoZW50aXR5LCBtYWluRGF0YSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgICAgIGZsb2F0IGF1eCA9IHByb2dyZXNzO1xyXG4gICAgICAgICAgICBib29sIGJsaW5rID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2hpbGUgKHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChibGluaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXggLT0gbWFpbkRhdGEuYmxpbmtBY3RpdmVUaW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eCAtPSBtYWluRGF0YS5ibGlua0luYWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGF1eCA8IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxpbmsgPSAhYmxpbms7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFibGluaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZW50aXR5LkFuaW1hdGlvbi5TZXRBbGwobWFpbkRhdGEudGV4dCwgbWFpbkRhdGEudGV4dENvbG9yLCBtYWluRGF0YS5iYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBCbGlua0RhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBjaGFyIHRleHQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgYmFja0NvbG9yLCB0ZXh0Q29sb3I7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBibGlua0FjdGl2ZVRpbWU7XHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBibGlua0luYWN0aXZlO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEJsaW5rRGF0YShjaGFyIHRleHQsIGludCBiYWNrQ29sb3IsIGludCB0ZXh0Q29sb3IsIGZsb2F0IGJsaW5rQWN0aXZlVGltZSwgZmxvYXQgYmxpbmtJbmFjdGl2ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFja0NvbG9yID0gYmFja0NvbG9yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29sb3IgPSB0ZXh0Q29sb3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsaW5rQWN0aXZlVGltZSA9IGJsaW5rQWN0aXZlVGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxpbmtJbmFjdGl2ZSA9IGJsaW5rSW5hY3RpdmU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgQmxpbmtEYXRhIEJhY2tDb2xvcihpbnQgYmFja0NvbG9yLCBmbG9hdCBibGlua0R1cmF0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJsaW5rRGF0YShUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBiYWNrQ29sb3IsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBibGlua0R1cmF0aW9uLCBibGlua0R1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBCbGlua0RhdGEgQ2hhcihjaGFyIGMsIGZsb2F0IGJsaW5rRHVyYXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmxpbmtEYXRhKGMsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgYmxpbmtEdXJhdGlvbiwgYmxpbmtEdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDaGFyQnlDaGFyQW5pbWF0aW9uIDogVGV4dEFuaW1hdGlvbjxDaGFyQnlDaGFyQW5pbWF0aW9uLkNoYXJCeUNoYXJEYXRhPlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE1vZGlmeShUZXh0RW50aXR5IGVudGl0eSwgQ2hhckJ5Q2hhckRhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgZmxvYXQgcmF0aW8gPSBwcm9ncmVzcyAvIGxlbmd0aDtcclxuICAgICAgICAgICAgZmxvYXQgbGVuZ3RoVGV4dCA9IG1haW5EYXRhLmNoYXJFbmQgLSBtYWluRGF0YS5jaGFyU3RhcnQ7XHJcbiAgICAgICAgICAgIGludCBsaW5lQnJlYWtzID0gMDtcclxuICAgICAgICAgICAgaW50IG9mZnNldGVkUGVybSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSBtYWluRGF0YS5jaGFyU3RhcnQ7IGkgPCBtYWluRGF0YS5jaGFyRW5kOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBvZmZzZXRlZCA9IGkgKyBvZmZzZXRlZFBlcm07XHJcbiAgICAgICAgICAgICAgICBpbnQgbGluZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGIgPSBlbnRpdHkuQW5pbWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG9mZnNldGVkID49IHRiLldpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmUrKztcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRlZCAtPSB0Yi5XaWR0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChlbnRpdHkuT3JpZ2luLkNoYXJBdChvZmZzZXRlZCwgbGluZSArIGxpbmVCcmVha3MpID09ICdcXG4nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVCcmVha3MrKztcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRlZFBlcm0gLT0gb2Zmc2V0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPiAoKGxlbmd0aFRleHQgKiByYXRpbykgKyBtYWluRGF0YS5jaGFyU3RhcnQpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRiLkRyYXdDaGFyKCcgJywgb2Zmc2V0ZWQsIGxpbmUgKyBsaW5lQnJlYWtzKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RiLkRyYXcoXCJcIiArIGksIDYsIDUsIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBDaGFyQnlDaGFyRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50ZXJuYWwgaW50IGNoYXJTdGFydDtcclxuICAgICAgICAgICAgaW50ZXJuYWwgaW50IGNoYXJFbmQ7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQ2hhckJ5Q2hhckRhdGEoaW50IGNoYXJTdGFydCwgaW50IGNoYXJFbmQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhclN0YXJ0ID0gY2hhclN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFyRW5kID0gY2hhckVuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
