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
                                    draw(i, j, BridgeBuild.App.colors[System.Array.index(BridgeBuild.App.TextBoard.TextColor.get([i, j]), BridgeBuild.App.colors)], BridgeBuild.App.colors[System.Array.index(BridgeBuild.App.TextBoard.BackColor.get([i, j]), BridgeBuild.App.colors)], "" + String.fromCharCode(BridgeBuild.App.TextBoard.CharAt(i, j)));
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VCdWlsZC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvRXh0ZW5zaW9ucy5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1BvaW50LmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvUmFuZG9tU3VwcGxpZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9SZWN0YW5nbGUuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9UaW1lU3RhbXAuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9Vbmljb2RlLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvVmVjdG9yMkQuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9WZWN0b3IzRC5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL01vdmVEYXRhLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9Bc3luY1Rhc2tzLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvQmF0dGxlTWFpbi5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL0JhdHRsZVNldHVwLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9Db2xvclN0dWZmLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvRGVidWdFeHRyYS9EZWJ1Z0V4LmNzIiwiLi4vVHVybkJhc2VkTG9naWMvRUNTSW50ZWdyYXRpb24uY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9FbmVteUFJLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvU3Bhd25GYWN0b3J5LmNzIiwiLi4vVHVybkJhc2VkTG9naWMvRW5lbXlEYXRhQ3JlYXRvci5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL1N0YWdlRGF0YS5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL01vdmVEYXRhRXhlY3V0ZXIuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9IYXBwcy9IYXBwLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvSW5wdXRIb2xkZXIuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9Nb3ZlQ3JlYXRvclByb2cuY3MiLCIuLi8uLi9WaXN1YWxTdHVkaW9Tb2x1dGlvblJtay9FQ1MvQWNjZXNzb3IuY3MiLCIuLi8uLi9WaXN1YWxTdHVkaW9Tb2x1dGlvblJtay9FQ1MvRUNTTWFuYWdlci5jcyIsIi4uLy4uL1Zpc3VhbFN0dWRpb1NvbHV0aW9uUm1rL0VDUy9FbnRpdHkuY3MiLCIuLi8uLi9WaXN1YWxTdHVkaW9Tb2x1dGlvblJtay9FQ1MvUHJvY2Vzc29yRmxleC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL1RleHRXb3JsZC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL1BhbGV0dGUuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9HYW1lU2NyZWVuL01vdXNlSG92ZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9UZXh0Qm9hcmQuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9HYW1lU2NyZWVuL0lUZXh0U2NyZWVuTi5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvSGFwcEhhbmRsaW5nLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9JbnB1dEhhbmRsaW5nLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9Nb3VzZUhvdmVyVGV4dC5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvQmF0dGxlUmVuZGVyLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9HYW1lTWFpbi5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvUmVzdWx0U2NyZWVuLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvR2FtZVNjcmVlbi9UZXN0R2FtZS5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvTW9kZVNlbGVjdGlvblNjcmVlbi5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL0JsaW5rQW5pbWF0aW9uLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvQ2hhckJ5Q2hhckFuaW1hdGlvbi5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7WUE2Q1lBOztZQUVBQSxxQ0FBY0EsbUNBQVFBO1lBQ3RCQSx5QkFBU0E7WUFDVEEsS0FBS0EsV0FBV0EsSUFBSUEsK0JBQWVBO2dCQUUvQkEsMENBQU9BLEdBQVBBLDJCQUFZQSxpRUFBa0JBLEdBQWxCQTs7Ozs7WUFLaEJBLFlBQVlBO1lBQ1pBLGtCQUFrQkE7WUFDbEJBLDBCQUEwQkE7WUFDMUJBO1lBQ0FBOzs7O1lBSUFBLDZEQUF1QkEsVUFBQ0E7O2dCQUdwQkEsV0FBV0E7Z0JBQ1hBLElBQUlBO29CQUFXQSxPQUFPQTs7Z0JBQ3RCQSxjQUFjQTtnQkFDZEEsZ0NBQWdCQTs7Ozs7O1lBTXBCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUNBdEQrQkE7Z0NBRVpBOzs7O3FDQUdPQSxJQUFpQkE7O29CQUczQ0EsVUFBYUEsSUFBSUE7b0JBQ2pCQSwyQ0FBMEJBO3dCQUV0QkEsT0FBT0EsQUFBT0E7O29CQUVsQkEsT0FBS0EsSUFBSUE7b0JBQ1RBLGNBQVlBO29CQUNaQSxzQkFBTUEsSUFBSUE7Ozs7Ozs7b0JBNkRWQSxJQUFJQTt3QkFFQUEsVUFBZUE7d0JBQ2ZBLFdBQVdBLENBQUNBLDJCQUFNQTt3QkFDbEJBLElBQUlBOzs0QkFHQUE7Ozt3QkFHSkEsNEJBQVlBO3dCQUNaQSx3QkFBUUEsQUFBT0E7d0JBQ2ZBLHVCQUFPQTt3QkFDUEEsa0NBQWtCQTt3QkFDbEJBLGdDQUFnQkE7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QW1CQSxVQUF5QkEsVUFBZ0JBO2dCQUVwRkEsNEhBQVlBLFFBQVFBLFVBQVVBLFVBQVVBO2dCQUN4Q0EsWUFBY0EsV0FBV0E7Z0JBQ3pCQSxpQkFBbUJBLG9CQUFtQkE7Z0JBQ3RDQTtnQkFDQUE7Z0JBQ0FBLEtBQUtBLFFBQVFBLG9CQUFvQkEsSUFBSUEsa0JBQWtCQTtvQkFFbkRBLGVBQWVBLEtBQUlBO29CQUNuQkE7b0JBQ0FBLFNBQVNBOzs7b0JBR1RBLE9BQU9BLFlBQVlBO3dCQUVmQTt3QkFDQUEsdUJBQVlBOztvQkFFaEJBLElBQUlBLHFCQUFxQkEsVUFBVUEsU0FBT0E7d0JBRXRDQTt3QkFDQUEsK0JBQWdCQTt3QkFDaEJBOztvQkFFSkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsYUFBYUEsU0FBU0E7d0JBRTVCQSxnQkFBaUJBLFVBQVVBLFNBQU9BOzs7Ozs7Ozs7Ozs7Z0Nkb0psQkEsUUFBbUJBLFVBQXVCQSxVQUFnQkE7Z0JBRWxGQSx3SEFBWUEsUUFBUUEsVUFBVUEsVUFBVUE7Z0JBQ3hDQSxhQUFtQkE7Z0JBQ25CQSxJQUFJQTtvQkFDQUEsU0FBU0E7O2dCQUNiQSxrQkFBa0JBLDZDQUE0QkEsaUNBQXdCQSwrQkFBc0JBLFdBQVdBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG4vL3VzaW5nIEVDUztcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG51c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG4vL3VzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2VCdWlsZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IGJ1ZmZlcjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIGJ1ZmZlck9uO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgSFRNTFByZUVsZW1lbnQgdGV4dDtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBHYW1lTWFpbiBncjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBUZXh0Qm9hcmQgVGV4dEJvYXJkO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgU3RyaW5nQnVpbGRlciBzYjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmdbXSBjb2xvcnM7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IGJ1ZmZlclVuaWNvZGUgPSAtMTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBUZXh0Qm9hcmQgYXV4O1xyXG4gICAgICAgIHN0YXRpYyBEYXRlVGltZSBsYXN0ID0gRGF0ZVRpbWUuTm93O1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGJvb2wgQ2FuRHJhdztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBTZXR1cEdhbWUob3V0IEdhbWVNYWluIGdyLCBvdXQgVGV4dEJvYXJkIFRleHRCb2FyZClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBSYW5kb20gcm5kID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgICAgICBSYW5kb21TdXBwbGllci5HZW5lcmF0ZSA9ICgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZmxvYXQpcm5kLk5leHREb3VibGUoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZ3IgPSBuZXcgR2FtZU1haW4oKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkID0gZ3IuR2V0Qm9hcmQoKTtcclxuICAgICAgICAgICAgYXV4ID0gbmV3IFRleHRCb2FyZCgzMDAsMzAwKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRlc3RFbnRpdHlTeXN0ZW0oKTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkdhbWUgU3RhcnRcIik7XHJcbiAgICAgICAgICAgIFNldHVwR2FtZShvdXQgZ3IsIG91dCBUZXh0Qm9hcmQpO1xyXG4gICAgICAgICAgICBjb2xvcnMgPSBuZXcgc3RyaW5nWzIwXTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb2xvcnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yc1tpXSA9IENvbG9yU3R1ZmYuY29sb3JzW2ldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IG5ldyBIVE1MU3R5bGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIHN0eWxlLklubmVySFRNTCA9IFwiaHRtbCxib2R5IHtmb250LWZhbWlseTogQ291cmllcjsgYmFja2dyb3VuZC1jb2xvcjojMWYyNTI2OyBoZWlnaHQ6IDEwMCU7IGNvbG9yOiM4ODg7fVwiICsgXCJcXG4gI2NhbnZhcy1jb250YWluZXIge3dpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IHRleHQtYWxpZ246Y2VudGVyOyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9IFwiO1xyXG4gICAgICAgICAgICBEb2N1bWVudC5IZWFkLkFwcGVuZENoaWxkKHN0eWxlKTtcclxuICAgICAgICAgICAgYnVmZmVyID0gOTtcclxuICAgICAgICAgICAgYnVmZmVyT24gPSBmYWxzZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgRG9jdW1lbnQuT25LZXlQcmVzcyArPSAoS2V5Ym9hcmRFdmVudCBhKSA9PlxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgaW50IGNvZGUgPSBhLktleUNvZGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29kZSA9PSAwKSBjb2RlID0gYS5DaGFyQ29kZTtcclxuICAgICAgICAgICAgICAgIGludCB1bmljb2RlID0gY29kZTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlclVuaWNvZGUgPSB1bmljb2RlO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKHVuaWNvZGUpO1xyXG4gICAgICAgICAgICAgICAgLy9idWZmZXIgPSBhLkNoYXJDb2RlO1xyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIFVwZGF0ZUdhbWUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFmdGVyIGJ1aWxkaW5nIChDdHJsICsgU2hpZnQgKyBCKSB0aGlzIHByb2plY3QsIFxyXG4gICAgICAgICAgICAvLyBicm93c2UgdG8gdGhlIC9iaW4vRGVidWcgb3IgL2Jpbi9SZWxlYXNlIGZvbGRlci5cclxuXHJcbiAgICAgICAgICAgIC8vIEEgbmV3IGJyaWRnZS8gZm9sZGVyIGhhcyBiZWVuIGNyZWF0ZWQgYW5kXHJcbiAgICAgICAgICAgIC8vIGNvbnRhaW5zIHlvdXIgcHJvamVjdHMgSmF2YVNjcmlwdCBmaWxlcy4gXHJcblxyXG4gICAgICAgICAgICAvLyBPcGVuIHRoZSBicmlkZ2UvaW5kZXguaHRtbCBmaWxlIGluIGEgYnJvd3NlciBieVxyXG4gICAgICAgICAgICAvLyBSaWdodC1DbGljayA+IE9wZW4gV2l0aC4uLiwgdGhlbiBjaG9vc2UgYVxyXG4gICAgICAgICAgICAvLyB3ZWIgYnJvd3NlciBmcm9tIHRoZSBsaXN0XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGFwcGxpY2F0aW9uIHdpbGwgdGhlbiBydW4gaW4gYSBicm93c2VyLlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBUZXN0RW50aXR5U3lzdGVtKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBVcGRhdGVHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChDYW5EcmF3KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEYXRlVGltZSBub3cgPSBEYXRlVGltZS5Ob3c7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VjcyA9IChub3cgLSBsYXN0KS5Ub3RhbFNlY29uZHM7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VjcyA+IDAuMDgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShzZWNzKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWNzID0gMC4wODtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQgPSBnci5HZXRCb2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgZ3IuRHJhdygoZmxvYXQpc2Vjcyk7XHJcbiAgICAgICAgICAgICAgICBsYXN0ID0gbm93O1xyXG4gICAgICAgICAgICAgICAgZ3IuSW5wdXRVbmljb2RlID0gYnVmZmVyVW5pY29kZTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlclVuaWNvZGUgPSAtMTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbW91c2VYID0gU2NyaXB0LkNhbGw8aW50PihcImdldE1vdXNlWFwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBtb3VzZVkgPSBTY3JpcHQuQ2FsbDxpbnQ+KFwiZ2V0TW91c2VZXCIpO1xyXG4gICAgICAgICAgICAgICAgZ3IuTW91c2UucG9zID0gbmV3IFBvaW50MkQobW91c2VYLCBtb3VzZVkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vOztTY3JpcHQuQ2FsbChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBUZXh0Qm9hcmQuSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBUZXh0Qm9hcmQuV2lkdGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYXV4LlNhbWVBcyhUZXh0Qm9hcmQsIHg6IGksIHk6IGopKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTY3JpcHQuQ2FsbChcImRyYXdcIiwgaSwgaiwgY29sb3JzW1RleHRCb2FyZC5UZXh0Q29sb3JbaSwgal1dLCBjb2xvcnNbVGV4dEJvYXJkLkJhY2tDb2xvcltpLCBqXV0sIFwiXCIgKyBUZXh0Qm9hcmQuQ2hhckF0KGksIGopKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eC5Db3B5KFRleHRCb2FyZCwgeDogaSwgeTogaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NjcmlwdC5DYWxsKFwiZHJhd1wiLCBpLCBqLCBjb2xvcnNbVGV4dEJvYXJkLlRleHRDb2xvcltpLCBqXV0sIGNvbG9yc1tUZXh0Qm9hcmQuQmFja0NvbG9yW2ksIGpdXSwgXCJ4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBDYW5EcmF3ID0gU2NyaXB0LkNhbGw8Ym9vbD4oXCJpc1JlYWR5VG9EcmF3XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgV2luZG93LlNldFRpbWVvdXQoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbilVcGRhdGVHYW1lLCAxNSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBFeHRlbnNpb25zXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmFuZG9tIHJuZyA9IG5ldyBSYW5kb20oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFNodWZmbGU8VD4odGhpcyBJTGlzdDxUPiBsaXN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IG4gPSBsaXN0LkNvdW50O1xyXG4gICAgICAgICAgICB3aGlsZSAobiA+IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG4tLTtcclxuICAgICAgICAgICAgICAgIGludCBrID0gcm5nLk5leHQobiArIDEpO1xyXG4gICAgICAgICAgICAgICAgVCB2YWx1ZSA9IGxpc3Rba107XHJcbiAgICAgICAgICAgICAgICBsaXN0W2tdID0gbGlzdFtuXTtcclxuICAgICAgICAgICAgICAgIGxpc3Rbbl0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIjcmVnaW9uIExpY2Vuc2VcclxuLypcclxuTUlUIExpY2Vuc2VcclxuQ29weXJpZ2h0IMKpIDIwMDYgVGhlIE1vbm8uWG5hIFRlYW1cclxuXHJcbkFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5TT0ZUV0FSRS5cclxuKi9cclxuI2VuZHJlZ2lvbiBMaWNlbnNlXHJcbnVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuICAgIHB1YmxpYyBzdHJ1Y3QgUG9pbnQyRCA6IElFcXVhdGFibGU8UG9pbnQyRD5cclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFBvaW50MkQgemVyb1BvaW50ID0gbmV3IFBvaW50MkQoKTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgWDtcclxuICAgICAgICBwdWJsaWMgaW50IFk7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUG9pbnQyRCBaZXJvXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gemVyb1BvaW50OyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBQb2ludDJEKGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgbWV0aG9kc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oUG9pbnQyRCBhLCBQb2ludDJEIGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYS5FcXVhbHMoYik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oUG9pbnQyRCBhLCBQb2ludDJEIGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIWEuRXF1YWxzKGIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFBvaW50MkQgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKChYID09IG90aGVyLlgpICYmIChZID09IG90aGVyLlkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEVxdWFscyhvYmplY3Qgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChvYmogaXMgUG9pbnQyRCkgPyBFcXVhbHMoKFBvaW50MkQpb2JqKSA6IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBHZXRIYXNoQ29kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gWCBeIFk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwie3tYOnswfSBZOnsxfX19XCIsIFgsIFkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBzdGF0aWMgcHVibGljIGNsYXNzIFJhbmRvbVN1cHBsaWVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBGdW5jPGZsb2F0PiBHZW5lcmF0ZXsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgUmFuZ2UoaW50IG1pbiwgaW50IG1heCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludCkgKEdlbmVyYXRlKCkgKiAobWF4LW1pbikrbWluKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBSYW5kb21FbGVtZW50PFQ+KFRbXSBhcnJheSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheVtSYW5nZSgwLCBhcnJheS5MZW5ndGgpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiI3JlZ2lvbiBMaWNlbnNlXHJcbi8qXHJcbk1JVCBMaWNlbnNlXHJcbkNvcHlyaWdodCDCqSAyMDA2IFRoZSBNb25vLlhuYSBUZWFtXHJcblxyXG5BbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuU09GVFdBUkUuXHJcbiovXHJcbiNlbmRyZWdpb24gTGljZW5zZVxyXG5cclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uR2xvYmFsaXphdGlvbjtcclxudXNpbmcgU3lzdGVtLkNvbXBvbmVudE1vZGVsO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG5cclxuICAgIHB1YmxpYyBzdHJ1Y3QgUmVjdCA6IElFcXVhdGFibGU8UmVjdD5cclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJlY3QgZW1wdHlSZWN0YW5nbGUgPSBuZXcgUmVjdCgpO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgcHVibGljIGludCBYO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgWTtcclxuICAgICAgICBwdWJsaWMgaW50IFdpZHRoO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgSGVpZ2h0O1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBSZWN0IEVtcHR5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gZW1wdHlSZWN0YW5nbGU7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgTGVmdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHRoaXMuWDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBSaWdodFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuICh0aGlzLlggKyB0aGlzLldpZHRoKTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBUb3BcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB0aGlzLlk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgQm90dG9tXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKHRoaXMuWSArIHRoaXMuSGVpZ2h0KTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcbiAgICAgICAgcHVibGljIFJlY3QoaW50IHgsIGludCB5LCBpbnQgd2lkdGgsIGludCBoZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB4O1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB5O1xyXG4gICAgICAgICAgICB0aGlzLldpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFJlY3QgYSwgUmVjdCBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoYS5YID09IGIuWCkgJiYgKGEuWSA9PSBiLlkpICYmIChhLldpZHRoID09IGIuV2lkdGgpICYmIChhLkhlaWdodCA9PSBiLkhlaWdodCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ29udGFpbnMoaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKCh0aGlzLlggPD0geCkgJiYgKHggPCAodGhpcy5YICsgdGhpcy5XaWR0aCkpKSAmJiAodGhpcy5ZIDw9IHkpKSAmJiAoeSA8ICh0aGlzLlkgKyB0aGlzLkhlaWdodCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENvbnRhaW5zKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKCh0aGlzLlggPD0gdmFsdWUuWCkgJiYgKHZhbHVlLlggPCAodGhpcy5YICsgdGhpcy5XaWR0aCkpKSAmJiAodGhpcy5ZIDw9IHZhbHVlLlkpKSAmJiAodmFsdWUuWSA8ICh0aGlzLlkgKyB0aGlzLkhlaWdodCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENvbnRhaW5zKFBvaW50MkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKCgoKHRoaXMuWCA8PSB2YWx1ZS5YKSAmJiAodmFsdWUuWCA8ICh0aGlzLlggKyB0aGlzLldpZHRoKSkpICYmICh0aGlzLlkgPD0gdmFsdWUuWSkpICYmICh2YWx1ZS5ZIDwgKHRoaXMuWSArIHRoaXMuSGVpZ2h0KSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ29udGFpbnMoUmVjdCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKCgodGhpcy5YIDw9IHZhbHVlLlgpICYmICgodmFsdWUuWCArIHZhbHVlLldpZHRoKSA8PSAodGhpcy5YICsgdGhpcy5XaWR0aCkpKSAmJiAodGhpcy5ZIDw9IHZhbHVlLlkpKSAmJiAoKHZhbHVlLlkgKyB2YWx1ZS5IZWlnaHQpIDw9ICh0aGlzLlkgKyB0aGlzLkhlaWdodCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciAhPShSZWN0IGEsIFJlY3QgYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAhKGEgPT0gYik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBPZmZzZXQoUG9pbnQyRCBvZmZzZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYICs9IG9mZnNldC5YO1xyXG4gICAgICAgICAgICBZICs9IG9mZnNldC5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgT2Zmc2V0KGludCBvZmZzZXRYLCBpbnQgb2Zmc2V0WSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFggKz0gb2Zmc2V0WDtcclxuICAgICAgICAgICAgWSArPSBvZmZzZXRZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBvaW50MkQgQ2VudGVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQb2ludDJEKCh0aGlzLlggKyB0aGlzLldpZHRoKSAvIDIsICh0aGlzLlkgKyB0aGlzLkhlaWdodCkgLyAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5mbGF0ZShpbnQgaG9yaXpvbnRhbFZhbHVlLCBpbnQgdmVydGljYWxWYWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFggLT0gaG9yaXpvbnRhbFZhbHVlO1xyXG4gICAgICAgICAgICBZIC09IHZlcnRpY2FsVmFsdWU7XHJcbiAgICAgICAgICAgIFdpZHRoICs9IGhvcml6b250YWxWYWx1ZSAqIDI7XHJcbiAgICAgICAgICAgIEhlaWdodCArPSB2ZXJ0aWNhbFZhbHVlICogMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRW1wdHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCgoKHRoaXMuV2lkdGggPT0gMCkgJiYgKHRoaXMuSGVpZ2h0ID09IDApKSAmJiAodGhpcy5YID09IDApKSAmJiAodGhpcy5ZID09IDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFJlY3Qgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcyA9PSBvdGhlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEVxdWFscyhvYmplY3Qgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChvYmogaXMgUmVjdCkgPyB0aGlzID09ICgoUmVjdClvYmopIDogZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwie3tYOnswfSBZOnsxfSBXaWR0aDp7Mn0gSGVpZ2h0OnszfX19XCIsIFgsIFksIFdpZHRoLCBIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBHZXRIYXNoQ29kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuWCBeIHRoaXMuWSBeIHRoaXMuV2lkdGggXiB0aGlzLkhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJbnRlcnNlY3RzKFJlY3QgcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIShyMi5MZWZ0ID4gUmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgfHwgcjIuUmlnaHQgPCBMZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgIHx8IHIyLlRvcCA+IEJvdHRvbVxyXG4gICAgICAgICAgICAgICAgICAgICB8fCByMi5Cb3R0b20gPCBUb3BcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbnRlcnNlY3RzKHJlZiBSZWN0IHZhbHVlLCBvdXQgYm9vbCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQgPSAhKHZhbHVlLkxlZnQgPiBSaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICB8fCB2YWx1ZS5SaWdodCA8IExlZnRcclxuICAgICAgICAgICAgICAgICAgICAgfHwgdmFsdWUuVG9wID4gQm90dG9tXHJcbiAgICAgICAgICAgICAgICAgICAgIHx8IHZhbHVlLkJvdHRvbSA8IFRvcFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGltZVN0YW1wXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IEN1cnJlbnRTbmFwO1xyXG5cclxuICAgICAgICBpbnRlcm5hbCBUaW1lU3RhbXBTbmFwIEdldFNuYXAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lU3RhbXBTbmFwKEN1cnJlbnRTbmFwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZHZhbmNlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VycmVudFNuYXAgKz0gZGVsdGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdHJ1Y3QgVGltZVN0YW1wU25hcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmbG9hdCBUaW1lU25hcDtcclxuXHJcbiAgICAgICAgcHVibGljIFRpbWVTdGFtcFNuYXAoZmxvYXQgc25hcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRpbWVTbmFwID0gc25hcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIFVuaWNvZGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IFNwYWNlID0gMzI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIFVwYXJyb3cyID0gKGNoYXIpMjQ7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgRG93bmFycm93MiA9IChjaGFyKTI1O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIFJpZ2h0YXJyb3cyID0gKGNoYXIpMjY7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgTGVmdGFycm93MiA9IChjaGFyKTI3O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIFVwYXJyb3cgPSAoY2hhcikzMDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBEb3duYXJyb3cgPSAoY2hhcikzMTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBMZWZ0YXJyb3cgPSAoY2hhcikxNztcclxuICAgICAgICBwdWJsaWMgY29uc3QgY2hhciBSaWdodGFycm93ID0gKGNoYXIpMTY7XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuLy91c2luZyBTeXN0ZW0uRHJhd2luZztcclxudXNpbmcgU3lzdGVtLkdsb2JhbGl6YXRpb247XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcbiAgICBbU2VyaWFsaXphYmxlXVxyXG4gICAgcHVibGljIHN0cnVjdCBWZWN0b3IyRCA6IElFcXVhdGFibGU8VmVjdG9yMkQ+XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB6ZXJvVmVjdG9yID0gbmV3IFZlY3RvcjJEKDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFZlY3RvciA9IG5ldyBWZWN0b3IyRCgxZiwgMWYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHVuaXRYVmVjdG9yID0gbmV3IFZlY3RvcjJEKDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFlWZWN0b3IgPSBuZXcgVmVjdG9yMkQoMGYsIDFmKTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBYO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBZO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgIyByZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgcHVibGljIGludCBYSW50IHsgZ2V0IHsgcmV0dXJuIChpbnQpWDsgfSB9XHJcbiAgICAgICAgcHVibGljIGludCBZSW50IHsgZ2V0IHsgcmV0dXJuIChpbnQpWTsgfSB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdGFudHNcclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBaZXJvXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gemVyb1ZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBPbmVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0VmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFVuaXRYXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFhWZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgVW5pdFlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WVZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQoZmxvYXQgeCwgZmxvYXQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQoZmxvYXQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5ZID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIEludGVycG9sYXRlUm91bmRlZChWZWN0b3IyRCBzdGFydFBvc2l0aW9uLCBWZWN0b3IyRCBlbmRQb3NpdGlvbiwgZmxvYXQgcmF0aW8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHN0YXJ0UG9zaXRpb24gKiAoMSAtIHJhdGlvKSArIGVuZFBvc2l0aW9uICogcmF0aW8pLlJvdW5kKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFZlY3RvcjJEIFJvdW5kKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoKGZsb2F0KU1hdGguUm91bmQoWCksIChmbG9hdClNYXRoLlJvdW5kKFkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgQWRkKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICs9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEFkZChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCArIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICsgdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEaXN0YW5jZShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguU3FydCgodjEgKiB2MSkgKyAodjIgKiB2MikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKGZsb2F0KU1hdGguU3FydCgodjEgKiB2MSkgKyAodjIgKiB2MikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEaXN0YW5jZVNxdWFyZWQoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuICh2MSAqIHYxKSArICh2MiAqIHYyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXN0YW5jZVNxdWFyZWQocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAodjEgKiB2MSkgKyAodjIgKiB2Mik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYID0geDtcclxuICAgICAgICAgICAgWSA9IHk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBEaXZpZGUoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC8gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLyB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgRGl2aWRlKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlciwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogZmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEb3QoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERvdChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAob2JqIGlzIFZlY3RvcjJEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRXF1YWxzKChWZWN0b3IyRCl0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFZlY3RvcjJEIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChYID09IG90aGVyLlgpICYmIChZID09IG90aGVyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBSZWZsZWN0KFZlY3RvcjJEIHZlY3RvciwgVmVjdG9yMkQgbm9ybWFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMkQgcmVzdWx0O1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZWZsZWN0KHJlZiBWZWN0b3IyRCB2ZWN0b3IsIHJlZiBWZWN0b3IyRCBub3JtYWwsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFguR2V0SGFzaENvZGUoKSArIFkuR2V0SGFzaENvZGUoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGhTcXVhcmVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoWCAqIFgpICsgKFkgKiBZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNYXgoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHZhbHVlMS5YID4gdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUxLlkgPiB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1heChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCA+IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSA+IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTWluKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh2YWx1ZTEuWCA8IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlMS5ZIDwgdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNaW4ocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggPCB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgPCB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE11bHRpcGx5KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNdWx0aXBseShWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOZWdhdGUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgPSAtdmFsdWUuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5lZ2F0ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTm9ybWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuICAgICAgICAgICAgWCAqPSB2YWw7XHJcbiAgICAgICAgICAgIFkgKj0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBOb3JtYWxpemUoVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gdmFsO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHZhbDtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5vcm1hbGl6ZShyZWYgVmVjdG9yMkQgdmFsdWUsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUuWCAqIHZhbDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZS5ZICogdmFsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFN1YnRyYWN0KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFN1YnRyYWN0KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VsdHVyZUluZm8gY3VycmVudEN1bHR1cmUgPSBDdWx0dXJlSW5mby5DdXJyZW50Q3VsdHVyZTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoY3VycmVudEN1bHR1cmUsIFwie3tYOnswfSBZOnsxfX19XCIsIG5ldyBvYmplY3RbXSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlguVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpLCB0aGlzLlkuVG9TdHJpbmcoY3VycmVudEN1bHR1cmUpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBPcGVyYXRvcnNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAtKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxLlggPT0gdmFsdWUyLlggJiYgdmFsdWUxLlkgPT0gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YICE9IHZhbHVlMi5YIHx8IHZhbHVlMS5ZICE9IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKyhWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKihWZWN0b3IyRCB2YWx1ZSwgZmxvYXQgc2NhbGVGYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKGZsb2F0IHNjYWxlRmFjdG9yLCBWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC8oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAvKFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gT3BlcmF0b3JzXHJcbiAgICB9XHJcbn0iLCIvLyBNSVQgTGljZW5zZSAtIENvcHlyaWdodCAoQykgVGhlIE1vbm8uWG5hIFRlYW1cclxuLy8gVGhpcyBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIGRlZmluZWQgaW5cclxuLy8gZmlsZSAnTElDRU5TRS50eHQnLCB3aGljaCBpcyBwYXJ0IG9mIHRoaXMgc291cmNlIGNvZGUgcGFja2FnZS5cclxuXHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkRpYWdub3N0aWNzO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlJ1bnRpbWUuU2VyaWFsaXphdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQmFzZVV0aWxzXHJcbntcclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBzdHJ1Y3QgVmVjdG9yM0QgOiBJRXF1YXRhYmxlPFZlY3RvcjNEPlxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgemVybyA9IG5ldyBWZWN0b3IzRCgwZiwgMGYsIDBmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IzRCBvbmUgPSBuZXcgVmVjdG9yM0QoMWYsIDFmLCAxZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdW5pdFggPSBuZXcgVmVjdG9yM0QoMWYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdW5pdFkgPSBuZXcgVmVjdG9yM0QoMGYsIDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdW5pdFogPSBuZXcgVmVjdG9yM0QoMGYsIDBmLCAxZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgdXAgPSBuZXcgVmVjdG9yM0QoMGYsIDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgZG93biA9IG5ldyBWZWN0b3IzRCgwZiwgLTFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgcmlnaHQgPSBuZXcgVmVjdG9yM0QoMWYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgbGVmdCA9IG5ldyBWZWN0b3IzRCgtMWYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgZm9yd2FyZCA9IG5ldyBWZWN0b3IzRCgwZiwgMGYsIC0xZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0QgYmFja3dhcmQgPSBuZXcgVmVjdG9yM0QoMGYsIDBmLCAxZik7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgZmxvYXQgWDtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGZsb2F0IFk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBaO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDAsIDAsIDAuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFplcm9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB6ZXJvOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDEsIDEsIDEuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE9uZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIG9uZTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHdpdGggY29tcG9uZW50cyAxLCAwLCAwLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBVbml0WFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRYOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDAsIDEsIDAuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFVuaXRZXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmV0dXJucyBhIDxzZWU+VmVjdG9yMzwvc2VlPiB3aXRoIGNvbXBvbmVudHMgMCwgMCwgMS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgVW5pdFpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBVcFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVwOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIERvd25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBkb3duOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFJpZ2h0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gcmlnaHQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTGVmdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGxlZnQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgRm9yd2FyZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGZvcndhcmQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgQmFja3dhcmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBiYWNrd2FyZDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yM0QoZmxvYXQgeCwgZmxvYXQgeSwgZmxvYXQgeilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHk7XHJcbiAgICAgICAgICAgIHRoaXMuWiA9IHo7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjNEKGZsb2F0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLlogPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yM0QoVmVjdG9yMkQgdmFsdWUsIGZsb2F0IHopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB2YWx1ZS5YO1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB2YWx1ZS5ZO1xyXG4gICAgICAgICAgICB0aGlzLlogPSB6O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIGFkZGl0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmQgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3RvciB0byBhZGQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3RvciB0byBhZGQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIGFkZGl0aW9uLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIEFkZChWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBlcmZvcm1zIHZlY3RvciBhZGRpdGlvbiBvbiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4gYW5kXHJcbiAgICAgICAgLy8vIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUyXCIvPiwgc3RvcmluZyB0aGUgcmVzdWx0IG9mIHRoZVxyXG4gICAgICAgIC8vLyBhZGRpdGlvbiBpbiA8cGFyYW1yZWYgbmFtZT1cInJlc3VsdFwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSByZXN1bHQgb2YgdGhlIHZlY3RvciBhZGRpdGlvbi48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBZGQocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSArIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aICsgdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBDcm9zcyhWZWN0b3IzRCB2ZWN0b3IxLCBWZWN0b3IzRCB2ZWN0b3IyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3Jvc3MocmVmIHZlY3RvcjEsIHJlZiB2ZWN0b3IyLCBvdXQgdmVjdG9yMSk7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWN0b3IxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIENyb3NzKHJlZiBWZWN0b3IzRCB2ZWN0b3IxLCByZWYgVmVjdG9yM0QgdmVjdG9yMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gdmVjdG9yMS5ZICogdmVjdG9yMi5aIC0gdmVjdG9yMi5ZICogdmVjdG9yMS5aO1xyXG4gICAgICAgICAgICB2YXIgeSA9IC0odmVjdG9yMS5YICogdmVjdG9yMi5aIC0gdmVjdG9yMi5YICogdmVjdG9yMS5aKTtcclxuICAgICAgICAgICAgdmFyIHogPSB2ZWN0b3IxLlggKiB2ZWN0b3IyLlkgLSB2ZWN0b3IyLlggKiB2ZWN0b3IxLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0geDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB5O1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlKFZlY3RvcjNEIHZlY3RvcjEsIFZlY3RvcjNEIHZlY3RvcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCByZXN1bHQ7XHJcbiAgICAgICAgICAgIERpc3RhbmNlU3F1YXJlZChyZWYgdmVjdG9yMSwgcmVmIHZlY3RvcjIsIG91dCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguU3FydChyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHZhbHVlMSwgcmVmIHZhbHVlMiwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IChmbG9hdClNYXRoLlNxcnQocmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2VTcXVhcmVkKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHZhbHVlMSwgcmVmIHZhbHVlMiwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2VTcXVhcmVkKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQgPSAodmFsdWUxLlggLSB2YWx1ZTIuWCkgKiAodmFsdWUxLlggLSB2YWx1ZTIuWCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAodmFsdWUxLlkgLSB2YWx1ZTIuWSkgKiAodmFsdWUxLlkgLSB2YWx1ZTIuWSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAodmFsdWUxLlogLSB2YWx1ZTIuWikgKiAodmFsdWUxLlogLSB2YWx1ZTIuWik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIERpdmlkZShWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIERpdmlkZShWZWN0b3IzRCB2YWx1ZTEsIGZsb2F0IHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IDEgLyB2YWx1ZTI7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIGZsb2F0IGRpdmlzb3IsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aXNvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAqIGZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAvIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aIC8gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERvdChWZWN0b3IzRCB2ZWN0b3IxLCBWZWN0b3IzRCB2ZWN0b3IyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZlY3RvcjEuWCAqIHZlY3RvcjIuWCArIHZlY3RvcjEuWSAqIHZlY3RvcjIuWSArIHZlY3RvcjEuWiAqIHZlY3RvcjIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEb3QocmVmIFZlY3RvcjNEIHZlY3RvcjEsIHJlZiBWZWN0b3IzRCB2ZWN0b3IyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdmVjdG9yMS5YICogdmVjdG9yMi5YICsgdmVjdG9yMS5ZICogdmVjdG9yMi5ZICsgdmVjdG9yMS5aICogdmVjdG9yMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIShvYmogaXMgVmVjdG9yM0QpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdmFyIG90aGVyID0gKFZlY3RvcjNEKW9iajtcclxuICAgICAgICAgICAgcmV0dXJuIFggPT0gb3RoZXIuWCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFkgPT0gb3RoZXIuWSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIFogPT0gb3RoZXIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhWZWN0b3IzRCBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBYID09IG90aGVyLlggJiZcclxuICAgICAgICAgICAgICAgICAgICBZID09IG90aGVyLlkgJiZcclxuICAgICAgICAgICAgICAgICAgICBaID09IG90aGVyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KSh0aGlzLlggKyB0aGlzLlkgKyB0aGlzLlopO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGgoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHRoaXMsIHJlZiB6ZXJvLCBvdXQgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLlNxcnQocmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGhTcXVhcmVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHJlc3VsdDtcclxuICAgICAgICAgICAgRGlzdGFuY2VTcXVhcmVkKHJlZiB0aGlzLCByZWYgemVybywgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE11bHRpcGx5KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTXVsdGlwbHkoVmVjdG9yM0QgdmFsdWUxLCBmbG9hdCBzY2FsZUZhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlogKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjNEIHZhbHVlMSwgZmxvYXQgc2NhbGVGYWN0b3IsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAqIHZhbHVlMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHBvaW50aW5nIGluIHRoZSBvcHBvc2l0ZVxyXG4gICAgICAgIC8vLyBkaXJlY3Rpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2ZWN0b3IgdG8gbmVnYXRlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSB2ZWN0b3IgbmVnYXRpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4uPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgTmVnYXRlKFZlY3RvcjNEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBuZXcgVmVjdG9yM0QoLXZhbHVlLlgsIC12YWx1ZS5ZLCAtdmFsdWUuWik7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gU3RvcmVzIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHBvaW50aW5nIGluIHRoZSBvcHBvc2l0ZVxyXG4gICAgICAgIC8vLyBkaXJlY3Rpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4gaW4gPHBhcmFtcmVmIG5hbWU9XCJyZXN1bHRcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmVjdG9yIHRvIG5lZ2F0ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSB2ZWN0b3IgdGhhdCB0aGUgbmVnYXRpb24gb2YgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZVwiLz4gd2lsbCBiZSBzdG9yZWQgaW4uPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTmVnYXRlKHJlZiBWZWN0b3IzRCB2YWx1ZSwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gLXZhbHVlLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBOb3JtYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTm9ybWFsaXplKHJlZiB0aGlzLCBvdXQgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE5vcm1hbGl6ZShWZWN0b3IzRCB2ZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOb3JtYWxpemUocmVmIHZlY3Rvciwgb3V0IHZlY3Rvcik7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTm9ybWFsaXplKHJlZiBWZWN0b3IzRCB2YWx1ZSwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvcjtcclxuICAgICAgICAgICAgRGlzdGFuY2UocmVmIHZhbHVlLCByZWYgemVybywgb3V0IGZhY3Rvcik7XHJcbiAgICAgICAgICAgIGZhY3RvciA9IDFmIC8gZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlLlggKiBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUuWSAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZS5aICogZmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBSZWZsZWN0KFZlY3RvcjNEIHZlY3RvciwgVmVjdG9yM0Qgbm9ybWFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gSSBpcyB0aGUgb3JpZ2luYWwgYXJyYXlcclxuICAgICAgICAgICAgLy8gTiBpcyB0aGUgbm9ybWFsIG9mIHRoZSBpbmNpZGVudCBwbGFuZVxyXG4gICAgICAgICAgICAvLyBSID0gSSAtICgyICogTiAqICggRG90UHJvZHVjdFsgSSxOXSApKVxyXG4gICAgICAgICAgICBWZWN0b3IzRCByZWZsZWN0ZWRWZWN0b3I7XHJcbiAgICAgICAgICAgIC8vIGlubGluZSB0aGUgZG90UHJvZHVjdCBoZXJlIGluc3RlYWQgb2YgY2FsbGluZyBtZXRob2RcclxuICAgICAgICAgICAgZmxvYXQgZG90UHJvZHVjdCA9ICgodmVjdG9yLlggKiBub3JtYWwuWCkgKyAodmVjdG9yLlkgKiBub3JtYWwuWSkpICsgKHZlY3Rvci5aICogbm9ybWFsLlopO1xyXG4gICAgICAgICAgICByZWZsZWN0ZWRWZWN0b3IuWCA9IHZlY3Rvci5YIC0gKDIuMGYgKiBub3JtYWwuWCkgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgICAgICByZWZsZWN0ZWRWZWN0b3IuWSA9IHZlY3Rvci5ZIC0gKDIuMGYgKiBub3JtYWwuWSkgKiBkb3RQcm9kdWN0O1xyXG4gICAgICAgICAgICByZWZsZWN0ZWRWZWN0b3IuWiA9IHZlY3Rvci5aIC0gKDIuMGYgKiBub3JtYWwuWikgKiBkb3RQcm9kdWN0O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlZmxlY3RlZFZlY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZWZsZWN0KHJlZiBWZWN0b3IzRCB2ZWN0b3IsIHJlZiBWZWN0b3IzRCBub3JtYWwsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBJIGlzIHRoZSBvcmlnaW5hbCBhcnJheVxyXG4gICAgICAgICAgICAvLyBOIGlzIHRoZSBub3JtYWwgb2YgdGhlIGluY2lkZW50IHBsYW5lXHJcbiAgICAgICAgICAgIC8vIFIgPSBJIC0gKDIgKiBOICogKCBEb3RQcm9kdWN0WyBJLE5dICkpXHJcblxyXG4gICAgICAgICAgICAvLyBpbmxpbmUgdGhlIGRvdFByb2R1Y3QgaGVyZSBpbnN0ZWFkIG9mIGNhbGxpbmcgbWV0aG9kXHJcbiAgICAgICAgICAgIGZsb2F0IGRvdFByb2R1Y3QgPSAoKHZlY3Rvci5YICogbm9ybWFsLlgpICsgKHZlY3Rvci5ZICogbm9ybWFsLlkpKSArICh2ZWN0b3IuWiAqIG5vcm1hbC5aKTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2ZWN0b3IuWCAtICgyLjBmICogbm9ybWFsLlgpICogZG90UHJvZHVjdDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2ZWN0b3IuWSAtICgyLjBmICogbm9ybWFsLlkpICogZG90UHJvZHVjdDtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2ZWN0b3IuWiAtICgyLjBmICogbm9ybWFsLlopICogZG90UHJvZHVjdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIHN1YnRyYWN0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmQgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIHZlY3RvciB0byBiZSBzdWJ0cmFjdGVkIGZyb20uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgdmVjdG9yIHRvIGJlIHN1YnRyYWN0ZWQgZnJvbSA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIHN1YnRyYWN0aW9uLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFN1YnRyYWN0KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAtPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGVyZm9ybXMgdmVjdG9yIHN1YnRyYWN0aW9uIG9uIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUxXCIvPiBhbmQgPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTJcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIHZlY3RvciB0byBiZSBzdWJ0cmFjdGVkIGZyb20uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgdmVjdG9yIHRvIGJlIHN1YnRyYWN0ZWQgZnJvbSA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIHRoZSB2ZWN0b3Igc3VidHJhY3Rpb24uPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU3VidHJhY3QocmVmIFZlY3RvcjNEIHZhbHVlMSwgcmVmIFZlY3RvcjNEIHZhbHVlMiwgb3V0IFZlY3RvcjNEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IHZhbHVlMS5aIC0gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdHJpbmcgRGVidWdEaXNwbGF5U3RyaW5nXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Db25jYXQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5YLlRvU3RyaW5nKCksIFwiICBcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlkuVG9TdHJpbmcoKSwgXCIgIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWi5Ub1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIgc2IgPSBuZXcgU3RyaW5nQnVpbGRlcigzMik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIntYOlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKHRoaXMuWCk7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIiBZOlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKHRoaXMuWSk7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIiBaOlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kKHRoaXMuWik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZChcIn1cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBzYi5Ub1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvLy8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8vLyBUcmFuc2Zvcm1zIGEgdmVjdG9yIGJ5IGEgcXVhdGVybmlvbiByb3RhdGlvbi5cclxuICAgICAgICAvLy8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vLy8gPHBhcmFtIG5hbWU9XCJ2ZWNcIj5UaGUgdmVjdG9yIHRvIHRyYW5zZm9ybS48L3BhcmFtPlxyXG4gICAgICAgIC8vLy8vIDxwYXJhbSBuYW1lPVwicXVhdFwiPlRoZSBxdWF0ZXJuaW9uIHRvIHJvdGF0ZSB0aGUgdmVjdG9yIGJ5LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIHRoZSBvcGVyYXRpb24uPC9wYXJhbT5cclxuICAgICAgICAvLyAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFRyYW5zZm9ybShyZWYgVmVjdG9yMyB2ZWMsIHJlZiBRdWF0ZXJuaW9uIHF1YXQsIG91dCBWZWN0b3IzIHJlc3VsdClcclxuICAgICAgICAvLyAgICAgICAge1xyXG4gICAgICAgIC8vXHRcdC8vIFRha2VuIGZyb20gdGhlIE9wZW50VEsgaW1wbGVtZW50YXRpb24gb2YgVmVjdG9yM1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gU2luY2UgdmVjLlcgPT0gMCwgd2UgY2FuIG9wdGltaXplIHF1YXQgKiB2ZWMgKiBxdWF0Xi0xIGFzIGZvbGxvd3M6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyB2ZWMgKyAyLjAgKiBjcm9zcyhxdWF0Lnh5eiwgY3Jvc3MocXVhdC54eXosIHZlYykgKyBxdWF0LncgKiB2ZWMpXHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzIHh5eiA9IHF1YXQuWHl6LCB0ZW1wLCB0ZW1wMjtcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMuQ3Jvc3MocmVmIHh5eiwgcmVmIHZlYywgb3V0IHRlbXApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMy5NdWx0aXBseShyZWYgdmVjLCBxdWF0LlcsIG91dCB0ZW1wMik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkFkZChyZWYgdGVtcCwgcmVmIHRlbXAyLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkNyb3NzKHJlZiB4eXosIHJlZiB0ZW1wLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLk11bHRpcGx5KHJlZiB0ZW1wLCAyLCBvdXQgdGVtcCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkFkZChyZWYgdmVjLCByZWYgdGVtcCwgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgbWV0aG9kc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBPcGVyYXRvcnNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YID09IHZhbHVlMi5YXHJcbiAgICAgICAgICAgICAgICAmJiB2YWx1ZTEuWSA9PSB2YWx1ZTIuWVxyXG4gICAgICAgICAgICAgICAgJiYgdmFsdWUxLlogPT0gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gISh2YWx1ZTEgPT0gdmFsdWUyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgKyhWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yIC0oVmVjdG9yM0QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBWZWN0b3IzRCgtdmFsdWUuWCwgLXZhbHVlLlksIC12YWx1ZS5aKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAtKFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAtPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgKihWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKj0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yICooVmVjdG9yM0QgdmFsdWUsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWiAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAqKGZsb2F0IHNjYWxlRmFjdG9yLCBWZWN0b3IzRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlogKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgLyhWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yIC8oVmVjdG9yM0QgdmFsdWUsIGZsb2F0IGRpdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aWRlcjtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5aICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZURhdGFcclxuICAgIHtcclxuICAgICAgICBzdHJpbmcgbGFiZWw7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxUaWNrPiB1bml0cyA9IG5ldyBMaXN0PFRpY2s+KCk7XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxpbnQ+IHRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlRGF0YShzdHJpbmcgbGFiZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBGaW5kQnlMYWJlbChMaXN0PE1vdmVEYXRhPiBtb3ZlRGF0YXMsIHN0cmluZyBsYWJlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbW92ZURhdGFzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKG1vdmVEYXRhc1tpXSE9bnVsbClcclxuICAgICAgICAgICAgICAgICAgICBpZiAobW92ZURhdGFzW2ldLmxhYmVsID09IGxhYmVsKSByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUaWNrIFxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIENvbmRpdGlvbiBjb25kaXRpb247XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxvYmplY3Q+IHRoaW5nc1RvSGFwcGVuID0gbmV3IExpc3Q8b2JqZWN0PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGljayhvYmplY3QgYWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpbmdzVG9IYXBwZW4uQWRkKGFjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBDb25kaXRpb25cclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCByZWFkb25seSBDb25kaXRpb25UeXBlIHR5cGU7XHJcbiAgICAgICAgaW50ZXJuYWwgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldDtcclxuICAgICAgICBpbnRlcm5hbCByZWFkb25seSBCYXNlVXRpbHMuVmVjdG9yMkQgdmVjdG9yO1xyXG5cclxuICAgICAgICBwdWJsaWMgQ29uZGl0aW9uKENvbmRpdGlvblR5cGUgdHlwZSwgVGFyZ2V0IHRhcmdldCwgQmFzZVV0aWxzLlZlY3RvcjJEIHZlY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLnZlY3RvciA9IHZlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gQ29uZGl0aW9uVHlwZVxyXG4gICAge1xyXG4gICAgICAgIENhbk1vdmVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU3VtbW9uRW50aXR5XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBlbmVteVdoaWNoO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBWZWN0b3IyRCBwcmVmZXJlbnRpYWxSb3dDb2x1bW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdW1tb25FbnRpdHkoaW50IGVuZW15V2hpY2gsIFZlY3RvcjJEIHByZWZlcmVudGlhbFJvd0NvbHVtbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlXaGljaCA9IGVuZW15V2hpY2g7XHJcbiAgICAgICAgICAgIHRoaXMucHJlZmVyZW50aWFsUm93Q29sdW1uID0gcHJlZmVyZW50aWFsUm93Q29sdW1uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RhdGljIFN1bW1vbkVudGl0eSBFbmVteShpbnQgdiwgVmVjdG9yMkQgdmVjdG9yMkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFN1bW1vbkVudGl0eSh2LCB2ZWN0b3IyRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQW5pbWF0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEFyZWEgYXJlYSA9IG51bGw7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldCA9IFRhcmdldC5Ob25lO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgQW5pbWF0aW9uKFRhcmdldCB0YXJnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcHVibGljIEFuaW1hdGlvbihBcmVhIGFyZWEpXHJcbiAgICAgICAgLy97XHJcbiAgICAgICAgLy8gICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgcHVibGljIEFuaW1hdGlvbihUYXJnZXQgdGFyZ2V0LCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbmltYXRpb24oQXJlYSBhcmVhLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmUsIFRhcmdldCB0YXJnZXQgPSBUYXJnZXQuTm9uZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW92ZUFjdGlvblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBUYXJnZXQgdGFyZ2V0O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXNlVXRpbHMuVmVjdG9yMkQgZGlzdGFuY2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlQWN0aW9uKFRhcmdldCB0YXJnZXQsIEJhc2VVdGlscy5WZWN0b3IyRCBhbW91bnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9IGFtb3VudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERlYWxEYW1hZ2VBY3Rpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldCA9IFRhcmdldC5Ob25lO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBBcmVhIGFyZWE7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBkYW1hZ2U7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudDtcclxuXHJcbiAgICAgICAgcHVibGljIERlYWxEYW1hZ2VBY3Rpb24oQXJlYSBhcmVhLCBpbnQgZGFtYWdlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSBhcmVhO1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gVGFyZ2V0LkFyZWE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQgdGFyZ2V0LCBpbnQgZGFtYWdlLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBcmVhXHJcbiAgICB7XHJcbiAgICAgICAgLy9wdWJsaWMgcmVhZG9ubHkgQXJlYSBhcmVhO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBUYXJnZXQgdGFyZ2V0O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBMaXN0PFZlY3RvcjJEPiBwb2ludHMgPSBuZXcgTGlzdDxWZWN0b3IyRD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIEFyZWEoVGFyZ2V0IHRhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBUYXJnZXRcclxuICAgIHtcclxuICAgICAgICBOb25lLCAgU2VsZiwgQ2xvc2VzdFRhcmdldCwgQ2xvc2VzdFRhcmdldFgsIEFyZWEgICBcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBc3luY1Rhc2tzXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBc3luY1RyYWNrXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBEZWxheWVkQWN0aW9uc1xyXG4gICAge1xyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IHRpbWVzID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxJTGlzdD4gbGlzdHMgPSBuZXcgTGlzdDxJTGlzdD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0aW1lcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lc1tpXSAtPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGlmICh0aW1lc1tpXSA8PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEV4ZWN1dGUoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5kVGFzayhpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKGludCBpKTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGQoZmxvYXQgdGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpbWVzLkFkZCh0aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZXMuQ291bnQgPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRW5kVGFzayhpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpbWVzLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbCBpbiBsaXN0cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbC5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQXN5bmNUYXNrU2V0dGVyPFQ+IDogRGVsYXllZEFjdGlvbnNcclxuICAgIHtcclxuICAgICAgICBMaXN0PFQ+IFRvVmFsdWUgPSBuZXcgTGlzdDxUPigpO1xyXG4gICAgICAgIExpc3Q8QWN0aW9uPFQ+PiBzZXR0ZXJzID0gbmV3IExpc3Q8QWN0aW9uPFQ+PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoVCBlLCBBY3Rpb248VD4gc2V0dGVyLCBmbG9hdCB0aW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVG9WYWx1ZS5BZGQoZSk7XHJcbiAgICAgICAgICAgIHNldHRlcnMuQWRkKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248VD4pc2V0dGVyKTtcclxuICAgICAgICAgICAgYmFzZS5BZGQodGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBvdmVycmlkZSB2b2lkIEV4ZWN1dGUoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXR0ZXJzW2ldKFRvVmFsdWVbaV0pO1xyXG4gICAgICAgICAgICBUb1ZhbHVlLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBzZXR0ZXJzLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkhhcHBzO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVNYWluXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8QmF0dGxlRW50aXR5PiBlbnRpdGllcyA9IG5ldyBMaXN0PEJhdHRsZUVudGl0eT4oKTtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlU3RhdGUgYmF0dGxlU3RhdGUgPSBuZXcgQmF0dGxlU3RhdGUoKTtcclxuICAgICAgICBwdWJsaWMgSGFwcE1hbmFnZXIgaGFwcE1hbmFnZXIgPSBuZXcgSGFwcE1hbmFnZXIoKTtcclxuICAgICAgICBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBWZWN0b3IyRD4gbW92ZW1lbnRNb3ZlcyA9IG5ldyBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBWZWN0b3IyRD4oKTtcclxuICAgICAgICAvL0RpY3Rpb25hcnk8TW92ZVR5cGUsIFBvaW50PiBhdHRhY2tNb3ZlcyA9IG5ldyBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBQb2ludD4oKTtcclxuICAgICAgICBNb3ZlVHlwZVtdIGVuZW15TW92ZXM7XHJcbiAgICAgICAgLy9wdWJsaWMgTGlzdDxJbnB1dD4gaW5wdXRzID0gbmV3IExpc3Q8VHVybmJhc2VkLklucHV0PigpO1xyXG4gICAgICAgIHB1YmxpYyBJbnB1dEhvbGRlciBpbnB1dHMgPSBuZXcgSW5wdXRIb2xkZXIoKTtcclxuICAgICAgICBwdWJsaWMgTGlzdDxNb3ZlVHlwZT4gcGxheWVySGFuZEZpeGVkID0gbmV3IExpc3Q8TW92ZVR5cGU+KCk7XHJcbiAgICAgICAgcHVibGljIExpc3Q8TW92ZVR5cGU+IHBsYXllckhhbmRVbmZpeGVkID0gbmV3IExpc3Q8TW92ZVR5cGU+KCk7XHJcbiAgICAgICAgcHVibGljIExpc3Q8TW92ZVR5cGU+IHBsYXllckhhbmRQb29sID0gbmV3IExpc3Q8TW92ZVR5cGU+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCB0aW1lVG9DaG9vc2VNYXggPSAxNWY7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IHRpbWVUb0Nob29zZSA9IC0xO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlUmVzdWx0IGJhdHRsZVJlc3VsdCA9IG5ldyBCYXR0bGVSZXN1bHQoKTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBCYXR0bGVDb25maWd1cmUoQmF0dGxlQ29uZmlnIGJhdHRsZUNvbmZpZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChiYXR0bGVDb25maWcgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlQ29uZmlnID0gbmV3IEJhdHRsZUNvbmZpZyhuZWVkS2lsbEFsbEVuZW1pZXM6dHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5CYXR0bGVDb25maWcgPSBiYXR0bGVDb25maWc7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50IG5FbmVtaWVzO1xyXG4gICAgICAgIHB1YmxpYyBNb3ZlRGF0YUV4ZWN1dGVyIE1vdmVEYXRhRXhlY3V0ZXI7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBUaW1lU3RhbXAgdGltZVN0YW1wO1xyXG4gICAgICAgIHByaXZhdGUgUXVpY2tBY2Nlc3NvclR3bzxCYXR0bGVFbnRpdHksIFBpY2t1cEluZm8+IHBpY2t1cEFjY2Vzc29yO1xyXG4gICAgICAgIGludGVybmFsIEVDU0ludGVncmF0aW9uIGVjc0ludGVnO1xyXG5cclxuICAgICAgICBwdWJsaWMgQWN0aW9uIEVuZW15R2VuZXJhdGVNb3ZlcztcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZUNvbmZpZyBCYXR0bGVDb25maWcgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBCb2FyZFdpZHRoIHsgZ2V0OyBpbnRlcm5hbCBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IEJvYXJkSGVpZ2h0IHsgZ2V0OyBpbnRlcm5hbCBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZU1haW4oaW50IG1vZGUsIEVDU01hbmFnZXIgZWNzLCBUaW1lU3RhbXAgdGltZVN0YW1wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy90aGlzLmVjcyA9IGVjcztcclxuICAgICAgICAgICAgdGhpcy50aW1lU3RhbXAgPSB0aW1lU3RhbXA7XHJcbiAgICAgICAgICAgIHBpY2t1cEFjY2Vzc29yID0gZWNzLlF1aWNrQWNjZXNzb3IyPEJhdHRsZUVudGl0eSwgUGlja3VwSW5mbz4oKTtcclxuICAgICAgICAgICAgbW92ZW1lbnRNb3Zlcy5BZGQoTW92ZVR5cGUuTW92ZVVwLCBWZWN0b3IyRC5Vbml0WSk7XHJcbiAgICAgICAgICAgIG1vdmVtZW50TW92ZXMuQWRkKE1vdmVUeXBlLk1vdmVEb3duLCAtVmVjdG9yMkQuVW5pdFkpO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlTGVmdCwgLVZlY3RvcjJELlVuaXRYKTtcclxuICAgICAgICAgICAgbW92ZW1lbnRNb3Zlcy5BZGQoTW92ZVR5cGUuTW92ZVJpZ2h0LCBWZWN0b3IyRC5Vbml0WCk7XHJcblxyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kRml4ZWQuQ2xlYXIoKTtcclxuICAgICAgICAgICAgcGxheWVySGFuZEZpeGVkLkFkZChNb3ZlVHlwZS5Nb3ZlUmlnaHQpO1xyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kRml4ZWQuQWRkKE1vdmVUeXBlLk1vdmVMZWZ0KTtcclxuICAgICAgICAgICAgcGxheWVySGFuZEZpeGVkLkFkZChNb3ZlVHlwZS5Nb3ZlRG93bik7XHJcbiAgICAgICAgICAgIHBsYXllckhhbmRGaXhlZC5BZGQoTW92ZVR5cGUuTW92ZVVwKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRVbmZpeGVkLkFkZChNb3ZlVHlwZS5Ob3JtYWxTaG90KTtcclxuICAgICAgICAgICAgICAgIGVuZW15TW92ZXMgPSBuZXcgTW92ZVR5cGVbXSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVVwLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVEb3duLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Ob3JtYWxTaG90LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRVbmZpeGVkLkFkZChNb3ZlVHlwZS5GaXJlKTtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRVbmZpeGVkLkFkZChNb3ZlVHlwZS5JY2UpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZFVuZml4ZWQuQWRkKE1vdmVUeXBlLlRodW5kZXIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBlbmVteU1vdmVzID0gbmV3IE1vdmVUeXBlW10ge1xyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVEb3duLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVVcCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuRmlyZSxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5JY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuVGh1bmRlcixcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vcGxheWVySGFuZC5BZGQoTW92ZVR5cGUuTm9ybWFsU2hvdCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBJc1ZpY3RvcnkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJhdHRsZVJlc3VsdC5yZXN1bHQgPT0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEJhc2ljQ29uZmlnKEJhdHRsZUJhc2ljQ29uZmlnIGJhc2ljQ29uZmlnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZS5WYWwgPSBiYXNpY0NvbmZpZy5uVHVybnM7XHJcbiAgICAgICAgICAgIG5FbmVtaWVzID0gYmFzaWNDb25maWcubkVuZW1pZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBCYXR0bGVFbnRpdHkgaGVybyA9IG5ldyBCYXR0bGVFbnRpdHkoKTtcclxuXHJcbiAgICAgICAgICAgIGhlcm8ucG9zLlNldCgxLCAxKTtcclxuICAgICAgICAgICAgaGVyby5taW5Qb3MuU2V0KDAsIDApO1xyXG4gICAgICAgICAgICBoZXJvLm1heFBvcy5TZXQoMiwgMik7XHJcbiAgICAgICAgICAgIGhlcm8uVHlwZSA9IEVudGl0eVR5cGUuaGVybztcclxuICAgICAgICAgICAgaGVyby5saWZlID0gMjtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBoZXJvLm1vdmVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBoZXJvLm1vdmVzW2ldID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBlbnRpdGllcy5BZGQoaGVybyk7XHJcbiAgICAgICAgICAgIGVjc0ludGVnLkhlcm9DcmVhdGVkKGhlcm8pO1xyXG4gICAgICAgICAgICBlY3NJbnRlZy5TcGF3bkVuZW1pZXMoKTtcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vR2FtZUVudGl0eSBwaWNrdXAgPSBuZXcgR2FtZUVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgLy9waWNrdXAuVHlwZSA9IEVudGl0eVR5cGUucGlja3VwO1xyXG4gICAgICAgICAgICAgICAgLy9waWNrdXAucG9zLlNldCgwLCAyKTtcclxuICAgICAgICAgICAgICAgIC8vcGlja3VwLmxpZmUgPSAyO1xyXG4gICAgICAgICAgICAgICAgLy9waWNrdXAuZ3JhcGhpYyA9IDQ7XHJcbiAgICAgICAgICAgICAgICAvL2VudGl0aWVzLkFkZChwaWNrdXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBCYXR0bGVFbnRpdHkgcGFuZWxFZmZlY3QgPSBuZXcgQmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LlR5cGUgPSBFbnRpdHlUeXBlLnBhbmVsZWZmZWN0O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5wb3MuU2V0KDAsIDIpO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5saWZlID0gNTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuZ3JhcGhpYyA9IDU7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnJhbmRvbVBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuZHJhd0xpZmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuZHJhd1R1cm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgUmFuZG9tUG9zaXRpb24ocGFuZWxFZmZlY3QpO1xyXG4gICAgICAgICAgICAvLyAgICBlbnRpdGllcy5BZGQocGFuZWxFZmZlY3QpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBCYXR0bGVFbnRpdHkgcGFuZWxFZmZlY3QgPSBuZXcgQmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LlR5cGUgPSBFbnRpdHlUeXBlLnBhbmVsZWZmZWN0O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5wb3MuU2V0KDAsIDIpO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5saWZlID0gNTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuZ3JhcGhpYyA9IDU7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnJhbmRvbVBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuZHJhd0xpZmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuZHJhd1R1cm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgUmFuZG9tUG9zaXRpb24ocGFuZWxFZmZlY3QpO1xyXG4gICAgICAgICAgICAvLyAgICBlbnRpdGllcy5BZGQocGFuZWxFZmZlY3QpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIFJlc2V0KCk7XHJcbiAgICAgICAgICAgIEV4ZWN1dGVQaGFzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZUVudGl0eSBOZXdCYXR0bGVFbnRpdHkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQmF0dGxlRW50aXR5IGJhdHRsZUVudGl0eSA9IG5ldyBCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgZW50aXRpZXMuQWRkKGJhdHRsZUVudGl0eSk7XHJcbiAgICAgICAgICAgIHJldHVybiBiYXR0bGVFbnRpdHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZW50aXRpZXNbaV0ubGlmZSA9IGVudGl0aWVzW2ldLm1heExpZmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlKTtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUudHVybi5WYWwgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS50b3RhbFR1cm5zID0gMDtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5ID0gMDtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93LlZhbCA9IDA7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsID0gMTtcclxuICAgICAgICAgICAgYmF0dGxlUmVzdWx0LnJlc3VsdCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIElzT3ZlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlUmVzdWx0LnJlc3VsdCAhPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGaW5pc2hQcmV2aW91c1RpY2soKTtcclxuICAgICAgICAgICAgYm9vbCBoZXJvQWxpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYm9vbCBlbmVteUFsaXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGJvb2wgcGlja3VwT2JsaWdhdG9yeUV4aXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5UeXBlID09IEVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGlmZSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZW15QWxpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uVHlwZSA9PSBFbnRpdHlUeXBlLmhlcm8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGlmZSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9BbGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0aGlzLnBpY2t1cEFjY2Vzc29yLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGlja3VwID0gcGlja3VwQWNjZXNzb3IuQ29tcDIoaSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGlja3VwLm5lY2Vzc2FyeUZvclZpY3RvcnkgJiYgcGlja3VwQWNjZXNzb3IuQ29tcDEoaSkuQWxpdmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGlja3VwT2JsaWdhdG9yeUV4aXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWhlcm9BbGl2ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlUmVzdWx0LnJlc3VsdCA9IDI7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCghZW5lbXlBbGl2ZXx8ICFCYXR0bGVDb25maWcubmVlZEtpbGxBbGxFbmVtaWVzKSAmJiAhcGlja3VwT2JsaWdhdG9yeUV4aXN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVSZXN1bHQucmVzdWx0ID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBoYXBwTWFuYWdlci5UaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aW1lU3RhbXAuQWR2YW5jZSgxKTtcclxuICAgICAgICAgICAgICAgIEV4ZWN1dGVQaGFzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRpbWVUb0Nob29zZSA+IDAgJiYgYmF0dGxlU3RhdGUucGhhc2UgPT0gQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lVG9DaG9vc2UgLT0gZGVsdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGltZVRvQ2hvb3NlIDw9IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRmluaXNoUHJldmlvdXNUaWNrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJhdHRsZVBoYXNlIHByZXZpb3VzUGhhc2UgPSBiYXR0bGVTdGF0ZS5waGFzZTtcclxuICAgICAgICAgICAgc3dpdGNoIChwcmV2aW91c1BoYXNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkVuZW15TW92ZUNob2ljZTpcclxuICAgICAgICAgICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5IYW5kUmVjaGFyZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5IYW5kUmVjaGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuUGlja0hhbmRzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuUGlja0hhbmRzOlxyXG4gICAgICAgICAgICAgICAgICAgIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmU6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdyA+PSBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib29sIG5vTW9yZVVuaXRzVG9BY3RUaGlzVHVybiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBpX2luaXRpYWwgPSBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaV9pbml0aWFsIDwgZW50aXRpZXMuQ291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSBpX2luaXRpYWw7IGkgPCBlbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdGllc1tpXS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vTW9yZVVuaXRzVG9BY3RUaGlzVHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9Nb3JlVW5pdHNUb0FjdFRoaXNUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmF0dGxlU3RhdGUudHVybiA+PSBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUucmFuZG9tUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJhbmRvbVBvc2l0aW9uKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUudHVybiA9IGJhdHRsZVN0YXRlLnR1cm4gKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLnRvdGFsVHVybnMgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSYW5kb21Qb3NpdGlvbihCYXR0bGVFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUucG9zLlggPSBSYW5kb21TdXBwbGllci5SYW5nZSgwLCA1KTtcclxuICAgICAgICAgICAgZS5wb3MuWSA9IFJhbmRvbVN1cHBsaWVyLlJhbmdlKDAsIDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlIHBoYXNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQmF0dGxlUGhhc2UgcHJldmlvdXNQaGFzZSA9IGJhdHRsZVN0YXRlLnBoYXNlO1xyXG4gICAgICAgICAgICBpZiAocGhhc2UgPT0gcHJldmlvdXNQaGFzZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAocGhhc2UgPT0gQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICB7XHJcblBpZHJvaC5CYXNlVXRpbHMuRXh0ZW5zaW9ucy5TaHVmZmxlPGdsb2JhbDo6UGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGU+KCAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kUG9vbCk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kVW5maXhlZC5DbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgaW50IGNvbW1hbmRzVG9BZGQgPSAzO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmRzVG9BZGQgPiBwbGF5ZXJIYW5kUG9vbC5Db3VudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1RvQWRkID0gcGxheWVySGFuZFBvb2wuQ291bnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvbW1hbmRzVG9BZGQ7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kVW5maXhlZC5BZGQocGxheWVySGFuZFBvb2xbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB0aW1lVG9DaG9vc2UgPSB0aW1lVG9DaG9vc2VNYXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzUGhhc2UgPT0gQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLnR1cm4uVmFsID0gMDtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsID0gMDtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsID0gMTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZS5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUucGhhc2UgPSBwaGFzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBFeGVjdXRlUGhhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBoYXNlID0gYmF0dGxlU3RhdGUucGhhc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocGhhc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlOlxyXG4gICAgICAgICAgICAgICAgICAgIGVjc0ludGVnLlNwYXduRW5lbWllcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVuZW15R2VuZXJhdGVNb3ZlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5IYW5kUmVjaGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLlBpY2tIYW5kczpcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaGkgaW4gcGxheWVySGFuZEZpeGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzLkFkZChuZXcgVHVybmJhc2VkLklucHV0KElucHV0VHlwZS5Nb3ZlLCAoaW50KWhpKSwgSW5wdXRUYWdzLk1PVkVGSVgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaGkgaW4gcGxheWVySGFuZFVuZml4ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1vdmUsIChpbnQpaGkpLCBJbnB1dFRhZ3MuTU9WRVVORklYKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzLkFkZChuZXcgVHVybmJhc2VkLklucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuUmVkbyksIElucHV0VGFncy5NSVNDKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5Eb25lKSwgSW5wdXRUYWdzLk1JU0MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5FeGVjdXRlTW92ZTpcclxuICAgICAgICAgICAgICAgICAgICBlY3NJbnRlZy5TcGF3bkVuZW1pZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBFeGVjdXRlTW92ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbnB1dERvbmUoSW5wdXQgaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTW92ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTW92ZVR5cGUgYXJnMSA9IChNb3ZlVHlwZSlpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiSU5QVVRURUQxXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllckhhbmRGaXhlZC5Db250YWlucyhhcmcxKSB8fCBwbGF5ZXJIYW5kVW5maXhlZC5Db250YWlucyhhcmcxKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJJTlBVVFRFRDJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZUNob3NlbihhcmcxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5NaXNjQmF0dGxlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBNaXNjQmF0dGxlSW5wdXQgbWlzYyA9IChNaXNjQmF0dGxlSW5wdXQpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgIGlmIChtaXNjID09IE1pc2NCYXR0bGVJbnB1dC5SZWRvKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLmhlcm8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZS5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5tb3Zlc1tpXSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3Zlc1tpXSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnQgdmFsdWUgPSBlLm1vdmVzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gLTEgfHwgaSA9PSBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdmVzW2kgLSAxXSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1pc2MgPT0gTWlzY0JhdHRsZUlucHV0LkRvbmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIEJhdHRsZURlY2lkZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGhlcm9lcyA9IDA7XHJcbiAgICAgICAgICAgIGludCBlbmVtaWVzID0gMDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5oZXJvKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLkFsaXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvZXMrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbWllcysrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBoZXJvZXMgPT0gMCB8fCBlbmVtaWVzID09IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBNb3ZlQ2hvc2VuKE1vdmVUeXBlIG1vdmVUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5oZXJvKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZS5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgdmFsdWUgPSBlLm1vdmVzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3Zlc1tpXSA9IChpbnQpIG1vdmVUeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFeGVjdXRlTW92ZXMoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcImJsYVwiICsgYmF0dGxlU3RhdGUudHVybi5WYWwpO1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuUmVhZCgpO1xyXG4gICAgICAgICAgICBCYXR0bGVFbnRpdHkgYXR0YWNrZXIgPSBlbnRpdGllc1tiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHldO1xyXG4gICAgICAgICAgICBpbnQgdHVybiA9IGJhdHRsZVN0YXRlLnR1cm47XHJcbiAgICAgICAgICAgIEV4ZWN1dGVNb3ZlKGF0dGFja2VyLCB0dXJuKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEV4ZWN1dGVNb3ZlKEJhdHRsZUVudGl0eSBhY3RvciwgaW50IHR1cm4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBNb3ZlRGF0YUV4ZWN1dGVyLkV4ZWN1dGVNb3ZlKGFjdG9yLCB0dXJuKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgQ2FsY3VsYXRlQXR0YWNrTXVsdGlwbGllcihCYXR0bGVFbnRpdHkgYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYmFzZUQgPSBhY3Rvci5kYW1hZ2VNdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUgIT0gYWN0b3IpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUucG9zID09IGFjdG9yLnBvcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5wYW5lbGVmZmVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZUQgKj0gMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZUQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IENhbGN1bGF0ZURlZmVuZGVyTXVsdGlwbGllcihCYXR0bGVFbnRpdHkgYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYmFzZUQgPSAxO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUgIT0gYWN0b3IpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUucG9zID09IGFjdG9yLnBvcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5wYW5lbGVmZmVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZUQgKj0gMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZUQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgQmF0dGxlU3RhdGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWYWx1ZSB0dXJuID0gbmV3IFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgdG90YWxUdXJucztcclxuICAgICAgICAgICAgcHVibGljIFZhbHVlIHR1cm5zUGVyUGhhc2UgPSBuZXcgVmFsdWUoKTtcclxuICAgICAgICAgICAgcHVibGljIFZhbHVlIG1vdmVUaWNrX05vdyA9IG5ldyBWYWx1ZSgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IG1vdmVUaWNrX1RvdGFsID0gMDtcclxuICAgICAgICAgICAgcHVibGljIGludCBhY3RpbmdFbnRpdHkgPSAwO1xyXG4gICAgICAgICAgICBwdWJsaWMgQmF0dGxlUGhhc2UgcGhhc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgQmF0dGxlRW50aXR5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IGxpZmU7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBwb3MgPSBuZXcgVmVjdG9yMkQoKTtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIG1pblBvcyA9IG5ldyBWZWN0b3IyRCgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgbWF4UG9zID0gbmV3IFZlY3RvcjJEKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnRbXSBtb3ZlcyA9IG5ldyBpbnRbMTBdO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IGdyYXBoaWM7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgZ3JhcGhpY1JlcGVhdGVkSW5kZXg7XHJcbiAgICAgICAgICAgIHB1YmxpYyBmbG9hdCBkYW1hZ2VNdWx0aXBsaWVyID0gMTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgYm9vbCBkcmF3TGlmZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGludGVybmFsIGJvb2wgZHJhd1R1cm4gPSB0cnVlO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBib29sIHJhbmRvbVBvc2l0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHB1YmxpYyBFbGVtZW50IGVsZW1lbnQgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmU7XHJcbiAgICAgICAgICAgIGludGVybmFsIGludCBtYXhMaWZlID0gMztcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBFbnRpdHlUeXBlIFR5cGUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgUG9zaXRpb25WMkQgeyBnZXQgeyByZXR1cm4gbmV3IEJhc2VVdGlscy5WZWN0b3IyRChwb3MuWCwgcG9zLlkpOyB9IH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIERlYWQgeyBnZXQgeyByZXR1cm4gbGlmZSA8PSAwOyB9IH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIEFsaXZlIHsgZ2V0IHsgcmV0dXJuICF0aGlzLkRlYWQ7IH0gfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIE1vdmVUeXBlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEb05vdGhpbmcsXHJcbiAgICAgICAgICAgIE1vdmVVcCxcclxuICAgICAgICAgICAgTW92ZUxlZnQsXHJcbiAgICAgICAgICAgIE1vdmVEb3duLFxyXG4gICAgICAgICAgICBNb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgIE5vcm1hbFNob3QsXHJcbiAgICAgICAgICAgIEZpcmUsXHJcbiAgICAgICAgICAgIEljZSxcclxuICAgICAgICAgICAgVGh1bmRlcixcclxuICAgICAgICAgICAgSWNlQm9tYixcclxuICAgICAgICAgICAgVGh1bmRlckJvbWIsXHJcbiAgICAgICAgICAgIFN1bW1vbkVudGl0eVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gSGFwcFRhZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQXR0YWNrSGl0LFxyXG4gICAgICAgICAgICBBdHRhY2tNaXNzLFxyXG4gICAgICAgICAgICBEYW1hZ2VUYWtlbixcclxuICAgICAgICAgICAgTW92ZW1lbnRGYWlsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBCYXR0bGVQaGFzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRW5lbXlNb3ZlQ2hvaWNlLFxyXG4gICAgICAgICAgICBIYW5kUmVjaGFyZ2UsXHJcbiAgICAgICAgICAgIFBpY2tIYW5kcyxcclxuICAgICAgICAgICAgRXhlY3V0ZU1vdmUsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBFbnRpdHlUeXBlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBoZXJvLCBlbmVteSwgcGlja3VwLCBwYW5lbGVmZmVjdFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gRWxlbWVudFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRmlyZSwgSWNlLCBUaHVuZGVyLFxyXG4gICAgICAgICAgICBOb25lXHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgaW50IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Cb2FyZFdpZHRoPTY7cHJpdmF0ZSBpbnQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0JvYXJkSGVpZ2h0PTM7fVxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIFZhbHVlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IFZhbCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnVtIHZhbEFzRW51bSB7IHNldCB7IFZhbCA9IENvbnZlcnQuVG9TaW5nbGUodmFsdWUpOyB9IH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXQoaW50IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWYWwgPSB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWYWx1ZSBvcGVyYXRvciArKFZhbHVlIGMxLCBmbG9hdCBjMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGMxLlZhbCArPSBjMjtcclxuICAgICAgICAgICAgcmV0dXJuIGMxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBvcGVyYXRvciAtKFZhbHVlIGMxLCBmbG9hdCBjMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBjMS5WYWwgLSBjMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShWYWx1ZSBjMSwgVmFsdWUgYzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBib29sIGMybnVsbCA9IG9iamVjdC5SZWZlcmVuY2VFcXVhbHMoYzIsIG51bGwpO1xyXG4gICAgICAgICAgICBib29sIGMxbnVsbCA9IG9iamVjdC5SZWZlcmVuY2VFcXVhbHMoYzEsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAoYzJudWxsICYmIGMxbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoYzFudWxsIHx8IGMybnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjMS5WYWwgPT0gYzIuVmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFZhbHVlIGMxLCBWYWx1ZSBjMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJvb2wgYzJudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMiwgbnVsbCk7XHJcbiAgICAgICAgICAgIGJvb2wgYzFudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmIChjMm51bGwgJiYgYzFudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoYzFudWxsIHx8IGMybnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGMxLlZhbCAhPSBjMi5WYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGltcGxpY2l0IG9wZXJhdG9yIGZsb2F0KFZhbHVlIGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZC5WYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGltcGxpY2l0IG9wZXJhdG9yIGludChWYWx1ZSBkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpZC5WYWw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVSZXN1bHRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RydWN0IEJhdHRsZUJhc2ljQ29uZmlnXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBuRW5lbWllcztcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IG5UdXJucztcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZUJhc2ljQ29uZmlnKGludCBuRW5lbWllcywgaW50IG5UdXJucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubkVuZW1pZXMgPSBuRW5lbWllcztcclxuICAgICAgICAgICAgdGhpcy5uVHVybnMgPSBuVHVybnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdHJ1Y3QgSW5wdXRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgSW5wdXRUeXBlIHR5cGU7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBhcmcxO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBJbnB1dChJbnB1dFR5cGUgdHlwZSwgaW50IGFyZzEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLmFyZzEgPSBhcmcxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElucHV0KElucHV0VHlwZSB0eXBlLCBFbnVtIGFyZzEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLmFyZzEgPSBDb252ZXJ0LlRvSW50MzIoYXJnMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIElucHV0VHlwZVxyXG4gICAge1xyXG4gICAgICAgIE5vbmUsIE1vdmUsIE1pc2NCYXR0bGVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBNaXNjQmF0dGxlSW5wdXRcclxuICAgIHtcclxuICAgICAgICBEb25lLCBSZWRvXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVTZXR1cFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBwdWJsaWMgQmF0dGxlTWFpbiBiYXR0bGVNYWluO1xyXG4gICAgICAgIHB1YmxpYyBUaW1lU3RhbXAgdGltZVN0YW1wO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlU2V0dXAoaW50IG1vZGUsIEJhdHRsZUJhc2ljQ29uZmlnIGJhdHRsZUJhc2ljQ29uZmlnLCBpbnQgZGlmZmljdWx0eSwgRUNTTWFuYWdlciBlY3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuICAgICAgICAgICAgdGltZVN0YW1wID0gbmV3IFRpbWVTdGFtcCgpO1xyXG4gICAgICAgICAgICBiYXR0bGVNYWluID0gbmV3IEJhdHRsZU1haW4obW9kZSwgZWNzLCB0aW1lU3RhbXApO1xyXG4gICAgICAgICAgICB2YXIgbWNwID0gbmV3IE1vdmVDcmVhdG9yUHJvZygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0YWdlcyA9IGVjcy5RdWlja0FjY2Vzc29yMTxTdGFnZURhdGE+KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZml4ZWRBdHRhY2sgPSBzdGFnZXMuRW50aXR5KGRpZmZpY3VsdHkpLkdldENvbXBvbmVudDxGaXhlZEF0dGFja1N0YWdlPigpO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVySGFuZFBvb2wgPSBiYXR0bGVNYWluLnBsYXllckhhbmRQb29sO1xyXG4gICAgICAgICAgICBpZiAoZml4ZWRBdHRhY2sgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBmaXhlZEF0dGFjay5tb3ZlcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kUG9vbC5BZGQoKEJhdHRsZU1haW4uTW92ZVR5cGUpaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kUG9vbC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlKTtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmRQb29sLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkljZSk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kUG9vbC5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc3RhZ2UgPSBzdGFnZXMuQ29tcDEoZGlmZmljdWx0eSk7XHJcbiAgICAgICAgICAgIHZhciBlbm15cyA9IHN0YWdlLmVuZW15U3Bhd25zO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBlbm15cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uTW92ZURhdGFFeGVjdXRlciA9IG5ldyBNb3ZlRGF0YUV4ZWN1dGVyKGJhdHRsZU1haW4sIG1jcC5tb3ZlRGF0YXMsIGVjcywgdGltZVN0YW1wKTtcclxuXHJcbiAgICAgICAgICAgIExpc3Q8c3RyaW5nPiBlbnRpdHlSZW5kZXJUZXh0cyA9IG5ldyBMaXN0PHN0cmluZz4oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlbmVteURhdGFzID0gbmV3IEVuZW15RGF0YUNyZWF0b3IoZW50aXR5UmVuZGVyVGV4dHMsbWNwKS5lbmVteURhdGFzO1xyXG4gICAgICAgICAgICB2YXIgYmF0dGxlU3RhdGUgPSBiYXR0bGVNYWluLmJhdHRsZVN0YXRlO1xyXG5cclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5CYXNpY0NvbmZpZyhiYXNpY0NvbmZpZzpiYXR0bGVCYXNpY0NvbmZpZyk7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uQmF0dGxlQ29uZmlndXJlKHN0YWdlLmJhdHRsZUNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW5lbXlGYWN0b3J5ID0gbmV3IFNwYXduRW50aXR5RmFjdG9yeShlY3MsIGVuZW15RGF0YXMsIGJhdHRsZU1haW4pO1xyXG4gICAgICAgICAgICBiYXR0bGVNYWluLmVjc0ludGVnID0gbmV3IEVDU0ludGVncmF0aW9uKGVuZW15RmFjdG9yeSwgZWNzKTtcclxuICAgICAgICAgICAgLy9iYXR0bGVNYWluLkVuZW15RmFjdG9yeSA9IGVuZW15RmFjdG9yeTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlbmVteUFpcyA9IGVjcy5RdWlja0FjY2Vzc29yMjxFbmVteUFJLCBCYXR0bGVNYWluLkJhdHRsZUVudGl0eT4oKTtcclxuICAgICAgICAgICAgdmFyIGVuZW15QWlTdGF0ZWxlc3MgPSBlY3MuQ3JlYXRlQWNjZXNzb3IobmVjZXNzYXJ5OiBuZXcgVHlwZVtdIHsgdHlwZW9mKEVuZW15QUkpIH0sIG5vdDogbmV3IFR5cGVbXSB7IHR5cGVvZihFbmVteUFJU3RhdGUpIH0pO1xyXG4gICAgICAgICAgICBiYXR0bGVNYWluLkVuZW15R2VuZXJhdGVNb3ZlcyA9ICgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChlbmVteUFpU3RhdGVsZXNzLkxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5lbXlBaVN0YXRlbGVzcy5HZXQoMCkuQWRkQ29tcG9uZW50PEVuZW15QUlTdGF0ZT4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGVuZW15QWlzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhaSA9IGVuZW15QWlzLkNvbXAxKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBiYXR0bGVyID0gZW5lbXlBaXMuQ29tcDIoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFpU3RhdGUgPSBlbmVteUFpcy5FbnRpdHkoaSkuR2V0Q29tcG9uZW50PEVuZW15QUlTdGF0ZT4oKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbW92ZXMgPSBhaS5tb3ZlcztcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2U7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBhaVBybyA9IChqKyBhaVN0YXRlLnByb2dyZXNzKSAlIG1vdmVzLkNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW92ZSA9IG1vdmVzW2FpUHJvXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vdmUgaXMgTW92ZVVzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZXIubW92ZXNbal0gPSAobW92ZSBhcyBNb3ZlVXNlKS5tb3ZlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYmUubW92ZXNbal0gPSA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFpU3RhdGUucHJvZ3Jlc3MgKz0gYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIGRhdGEgdGhhdCB3aWxsIGJlIGEgcGFydCBvZiBzdGFnZWRhdGEgc28gZWFjaCBzdGFnZSBjYW4gaGF2ZSBpdCdzIGNvbmZpZ1xyXG4gICAgLy8vIEl0IHdpbGwgYWxzbyBiZSBjb250YWluZWQgaW4gYmF0dGxlbWFpbi5cclxuICAgIC8vLyBTaG91bGQgYmUgc3RhdGljLCBvbmNlIGNyZWF0ZWQuXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIEJhdHRsZUNvbmZpZ1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBMaXN0PGludD4gZW5lbWllc1RvU3VtbW9uID1uZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvb2wgbmVlZEtpbGxBbGxFbmVtaWVzID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnKGludFtdIGVuZW1pZXNUb1N1bW1vbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllc1RvU3VtbW9uLkFkZFJhbmdlKGVuZW1pZXNUb1N1bW1vbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlQ29uZmlnKGJvb2wgbmVlZEtpbGxBbGxFbmVtaWVzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5uZWVkS2lsbEFsbEVuZW1pZXMgPSBuZWVkS2lsbEFsbEVuZW1pZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ29sb3JTdHVmZlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHN0cmluZyBHb29kTWFpbjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBuZXV0cmFsRGFyayA9IFwiIzE5MDEzYlwiO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIG5ldXRyYWxTdHJvbmcgPSBcIiMyYzNlNDNcIjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBzdHJpbmcgR29vZFN1YjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBzdHJpbmcgRXZpbE1haW47XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmdbXSBjb2xvcnMgPSBuZXcgc3RyaW5nWzIwXTtcclxuXHJcbiAgICAgICAgc3RhdGljIENvbG9yU3R1ZmYoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb2xvcnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yc1tpXSA9IFwiIzFBMUExQVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5IZXJvXSA9IFwiIzAwOWM4ZFwiO1xyXG4gICAgICAgICAgICAvL2NvbnN0IHN0cmluZyBoZXJvU3ViID0gXCIjMDA1ZjkxXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5IZXJvVHVybl0gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuRW5lbXldID0gXCIjZmYwMzUzXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5HcmlkSGVyb10gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRFbmVteV0gPSBcIiM4ZTAwNjBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteVR1cm5dID0gXCIjOGUwMDYwXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQm9hcmRdID0gXCIjMWU0ODZlXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuaW5wdXRLZXldID0gXCIjNjg4NjkwXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuV2luZG93TGFiZWxdID0gXCIjMWU0ODZlXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuRmlyZUF1cmFdID0gXCIjNzkzMTAwXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuSWNlQXVyYV0gPSBcIiMwMDU1OTBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5UaHVuZGVyQXVyYV0gPSBcIiMwMDU4M2RcIjtcclxuXHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvXSA9IFwiIzhhZDg5NlwiO1xyXG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgaGVyb1N1YiA9IFwiIzRjNmQ1MFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuSGVyb1R1cm5dID0gaGVyb1N1YjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15XSA9IFwiI2ZmNzY5NFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm9dID0gaGVyb1N1YjtcclxuICAgICAgICAgICAgY29uc3Qgc3RyaW5nIGVuZW15c3ViID0gXCIjYTc0NjRmXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkRW5lbXldID0gZW5lbXlzdWI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteVR1cm5dID0gZW5lbXlzdWI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkJvYXJkXSA9IFwiIzFlNDg2ZVwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5pbnB1dEtleV0gPSBcIiM2ODg2OTBcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuV2luZG93TGFiZWxdID0gXCIjMWU0ODZlXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkZpcmVBdXJhXSA9IFwiIzc5MzEwMFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5JY2VBdXJhXSA9IFwiIzAwNTU5MFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5UaHVuZGVyQXVyYV0gPSBcIiMwMDU4M2RcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuRmlyZVNob3RdID0gXCIjZjgyYjM2XCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkljZVNob3RdID0gXCIjMDA3ZWZmXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJTaG90XSA9IFwiI2EzN2MwMFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5CYWNrZ3JvdW5kSW5wdXRdID0gXCIjMDgwODA4XCI7XHJcblxyXG5cclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuaW5wdXRLZXldID0gXCIjOUU4NjY0XCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLklucHV0RGVzY3JpcHRpb25dID0gXCIjODA4MDgwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkJhY2tCYXR0bGVdID0gXCIjMDAwMDAwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkJhY2tncm91bmRJbnB1dF0gPSBcIiMxQTFBMUFcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9UdXJuXSA9IFwiIzAwQjJCMlwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXlUdXJuXSA9IFwiI0ZGMDA0MFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEVuZW15XSA9IFwiIzAwNDY4Q1wiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm9dID0gXCIjOEMwMDIzXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvXSA9IFwiIzY2RkZGRlwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXldID0gXCIjRDkwMDM2XCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLldpbmRvd0xhYmVsXSA9IFwiIzY2NjY2NlwiO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkRlYnVnRXh0cmFcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBEZWJ1Z0V4XHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIExpc3Q8c3RyaW5nPiBtZXNzYWdlcyA9IG5ldyBMaXN0PHN0cmluZz4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIExvZyhzdHJpbmcgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VzLkFkZCh2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG93KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnNvbGUuQ2xlYXIoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbWVzc2FnZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ29uc29sZS5SZWFkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgaW50ZXJuYWwgY2xhc3MgRUNTSW50ZWdyYXRpb25cclxuICAgIHtcclxuXHJcbiAgICAgICAgU3Bhd25FbnRpdHlGYWN0b3J5IGVuZW15RmFjdG9yeTtcclxuICAgICAgICBFQ1NNYW5hZ2VyIGVjcztcclxuXHJcbiAgICAgICAgcHVibGljIEVDU0ludGVncmF0aW9uKFNwYXduRW50aXR5RmFjdG9yeSBlbmVteUZhY3RvcnksIEVDU01hbmFnZXIgZWNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbmVteUZhY3RvcnkgPSBlbmVteUZhY3Rvcnk7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBIZXJvQ3JlYXRlZChCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBoZXJvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNwYXduRW5lbWllcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbmVteUZhY3RvcnkuU3Bhd24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEVuZW15QUlcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgTGlzdDxvYmplY3Q+IG1vdmVzID0gbmV3IExpc3Q8b2JqZWN0PigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBFbmVteUFJU3RhdGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IHByb2dyZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBMb29wXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8b2JqZWN0PiBhY3Rpb25zID0gbmV3IExpc3Q8b2JqZWN0PigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBNb3ZlVXNlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBtb3ZlO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVVzZShpbnQgbW92ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSA9IG1vdmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTcGF3bkVudGl0eUZhY3RvcnlcclxuICAgIHtcclxuXHJcbiAgICAgICAgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgTGlzdDxFbmVteURhdGE+IGVuZW15RGF0YXM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBCYXR0bGVNYWluIGJhdHRsZU1haW47XHJcbiAgICAgICAgcHJpdmF0ZSBRdWlja0FjY2Vzc29yT25lPFNwYXduRGF0YT4gc3Bhd25zO1xyXG5cclxuICAgICAgICBwdWJsaWMgU3Bhd25FbnRpdHlGYWN0b3J5KEVDU01hbmFnZXIgZWNzLCBMaXN0PEVuZW15RGF0YT4gZW5lbXlEYXRhcywgQmF0dGxlTWFpbiBiYXR0bGVNYWluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIC8vZWNzLlF1aWNrQWNjZXNzb3IxPEVuZW15RGF0YT4oKTtcclxuICAgICAgICAgICAgc3Bhd25zID0gZWNzLlF1aWNrQWNjZXNzb3IxPFNwYXduRGF0YT4oKTtcclxuICAgICAgICAgICAgdGhpcy5lbmVteURhdGFzID0gZW5lbXlEYXRhcztcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVNYWluID0gYmF0dGxlTWFpbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNwYXduKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBzcGF3bmVkID0gMDtcclxuICAgICAgICAgICAgLy9mb3IgKGludCBpID0gMDsgaSA8IHNwYXducy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB3aGlsZSAoc3Bhd25zLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU3Bhd25EYXRhIHNwYXduID0gc3Bhd25zLkNvbXAxKDApO1xyXG4gICAgICAgICAgICAgICAgc3Bhd25zLkVudGl0eSgwKS5SZW1vdmVDb21wb25lbnQoc3Bhd24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlkID0gc3Bhd24uaWQ7XHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkVudGl0eVR5cGUgZW50VHlwZSA9IChCYXR0bGVNYWluLkVudGl0eVR5cGUpc3Bhd24uZW50aXR5VHlwZTtcclxuICAgICAgICAgICAgICAgIGlmKGVudFR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmUgPSBiYXR0bGVNYWluLk5ld0JhdHRsZUVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLlR5cGUgPSBlbnRUeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIFBpY2t1cEluZm8gcGlja3VwID0gbmV3IFBpY2t1cEluZm8odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBpY2t1cEUgPSBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChwaWNrdXApO1xyXG4gICAgICAgICAgICAgICAgICAgIHBpY2t1cEUuQWRkQ29tcG9uZW50KGJlKTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5wb3MgPSBzcGF3bi5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBiZS5saWZlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5tYXhMaWZlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5kcmF3TGlmZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLmRyYXdUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUuZ3JhcGhpYyA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZW50VHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZW15QUkgPSBlbmVteURhdGFzW2lkXS5lbmVteUFJO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmVteSA9IGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KGVuZW15QUkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBiZSA9IGJhdHRsZU1haW4uTmV3QmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUucG9zID0gc3Bhd24ucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgYmUubGlmZSA9IGVuZW15RGF0YXNbaWRdLmhwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLm1heExpZmUgPSBiZS5saWZlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJlLmdyYXBoaWMgPSBlbmVteURhdGFzW2lkXS5yZW5kZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVudGl0aWVzID0gYmF0dGxlTWFpbi5lbnRpdGllcztcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtICE9IGJlICYmIGl0ZW0uZ3JhcGhpYyA9PSBiZS5ncmFwaGljKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZS5ncmFwaGljUmVwZWF0ZWRJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJlLm1pblBvcyA9IG5ldyBWZWN0b3IyRCgzLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBiZS5tYXhQb3MgPSBuZXcgVmVjdG9yMkQoNSwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgYmUuVHlwZSA9IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteTtcclxuICAgICAgICAgICAgICAgICAgICBlbmVteS5BZGRDb21wb25lbnQoYmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVuZW15QUlTdGF0ZSBlbmVteUFpU3RhdGUgPSBuZXcgRW5lbXlBSVN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5lbXlBaVN0YXRlLnByb2dyZXNzID0gc3Bhd25lZDtcclxuICAgICAgICAgICAgICAgICAgICBlbmVteS5BZGRDb21wb25lbnQoZW5lbXlBaVN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJTUEFXTlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzcGF3bmVkKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFBpY2t1cEluZm9cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgYm9vbCBuZWNlc3NhcnlGb3JWaWN0b3J5O1xyXG5cclxuICAgICAgICBwdWJsaWMgUGlja3VwSW5mbyhib29sIG5lY2Vzc2FyeUZvclZpY3RvcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5lY2Vzc2FyeUZvclZpY3RvcnkgPSBuZWNlc3NhcnlGb3JWaWN0b3J5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgRW5lbXlEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEVuZW15QUkgZW5lbXlBSTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGhwO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgcmVuZGVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgRW5lbXlEYXRhKEVuZW15QUkgZW5lbXlBSSwgaW50IGhwLCBpbnQgcmVuZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbmVteUFJID0gZW5lbXlBSTtcclxuICAgICAgICAgICAgdGhpcy5ocCA9IGhwO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlciA9IHJlbmRlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEVuZW15RGF0YUNyZWF0b3JcclxuICAgIHtcclxuICAgICAgICBMaXN0PHN0cmluZz4gcmVuZGVyVGV4dHM7XHJcbiAgICAgICAgcHVibGljIExpc3Q8RW5lbXlEYXRhPiBlbmVteURhdGFzID0gbmV3IExpc3Q8RW5lbXlEYXRhPigpO1xyXG4gICAgICAgIE1vdmVDcmVhdG9yUHJvZyBtb3ZlQ3JlYXRvclByb2c7XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmVteURhdGFDcmVhdG9yKExpc3Q8c3RyaW5nPiByZW5kZXJUZXh0cywgTW92ZUNyZWF0b3JQcm9nIG1vdmVDcmVhdG9yUHJvZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVGV4dHMgPSByZW5kZXJUZXh0cztcclxuICAgICAgICAgICAgdGhpcy5tb3ZlQ3JlYXRvclByb2cgPSBtb3ZlQ3JlYXRvclByb2c7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAgICAgTW92ZXMoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24sIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVSaWdodCwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyKVxyXG4gICAgICAgICAgICAgICAgKSwgaHA6MiwgcmVuZGVyVGV4dDpcIiVcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAgICAgTW92ZXMoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb05vdGhpbmcpXHJcbiAgICAgICAgICAgICAgICApLCBocDogMywgcmVuZGVyVGV4dDogXCIjXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuICAgICAgICAgICAgICAgTW92ZXMoXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyQm9tYixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlXHJcbi5Nb3ZlUmlnaHRcclxuICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgKSwgaHA6IDYsIHJlbmRlclRleHQ6IFwiJlwiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsXHJcbiAgICAgICAgICAgICAgICAgICBcIlN1bW1vblwiLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyQm9tYixcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlXHJcbi5GaXJlXHJcblxyXG5cclxuICAgICAgICAgICAgICAgKSwgaHA6IDQ1LCByZW5kZXJUZXh0OiBcIiRcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG5cclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVVcCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24sXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVEb3duLFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVcclxuLk1vdmVVcFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICksIGhwOiAzLCByZW5kZXJUZXh0OiBcIkhcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG5cclxuICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkljZSxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkRvTm90aGluZyxcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlXHJcbi5Eb05vdGhpbmdcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiSlwiKTtcclxuICAgICAgICAgICAgQWRkRW5lbXkoYWk6IEFjdGlvbnMoXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb05vdGhpbmcsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVxyXG4uRG9Ob3RoaW5nXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICksIGhwOiAzLCByZW5kZXJUZXh0OiBcIkxcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG5cclxuICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb05vdGhpbmcsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVxyXG4uRG9Ob3RoaW5nXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICksIGhwOiAzLCByZW5kZXJUZXh0OiBcIktcIik7XHJcbiAgICAgICAgICAgIC8vQWRkRW5lbXkoYWk6IEFjdGlvbnMoKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiJFwiKTtcclxuICAgICAgICAgICAgLy9BZGRFbmVteShhaTogQWN0aW9ucygpLCBocDogNSwgcmVuZGVyVGV4dDogXCIjXCIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgRW5lbXlBSSBBY3Rpb25zKHBhcmFtcyBvYmplY3RbXSBvYnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYWkgPSBuZXcgRW5lbXlBSSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG8gaW4gb2JzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAobyBpcyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhaS5tb3Zlcy5BZGQobmV3IE1vdmVVc2UoKGludClvKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobyBpcyBzdHJpbmcpXHJcbiAgICAgICAgICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYWkubW92ZXMuQWRkKG5ldyBNb3ZlVXNlKG1vdmVDcmVhdG9yUHJvZy5HZXRNb3ZlSWQobyBhcyBzdHJpbmcpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobyBpcyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVtdKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIG8gYXMgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGVbXSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFpLm1vdmVzLkFkZChuZXcgTW92ZVVzZSgoaW50KWl0ZW0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhaS5tb3Zlcy5BZGQobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVtdIE1vdmVzKHBhcmFtcyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVtdIG1vdmVzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vdmVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEFkZEVuZW15KEVuZW15QUkgYWksIGludCBocCwgc3RyaW5nIHJlbmRlclRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgcmVuZGVyID0gcmVuZGVyVGV4dHMuQ291bnQ7XHJcbiAgICAgICAgICAgIHJlbmRlclRleHRzLkFkZChyZW5kZXJUZXh0KTtcclxuICAgICAgICAgICAgZW5lbXlEYXRhcy5BZGQobmV3IEVuZW15RGF0YShhaSwgaHAsIHJlbmRlcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBTdGFnZURhdGFDcmVhdG9yXHJcbiAgICB7XHJcbiAgICAgICAgLy9wdWJsaWMgTGlzdDxTdGFnZURhdGE+IHN0YWdlcyA9IG5ldyBMaXN0PFN0YWdlRGF0YT4oKTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEVDU01hbmFnZXIgZWNzO1xyXG5cclxuICAgICAgICBwdWJsaWMgU3RhZ2VEYXRhQ3JlYXRvcihFQ1NNYW5hZ2VyIGVjcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICBBZGQobmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgwLCAwKSksXHJcbiAgICAgICAgICAgICAgICBQaWNrdXAoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgyLCAyKSlcclxuICAgICAgICAgICAgICAgICkuSGlkZUxpZmVVSSgpLCBuZXcgRml4ZWRBdHRhY2tTdGFnZSgpKTtcclxuICAgICAgICAgICAgQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhdHRsZUNvbmZpZyhuZWVkS2lsbEFsbEVuZW1pZXM6ZmFsc2UpLFxyXG4gICAgICAgICAgICAgICAgUGlja3VwKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMiwgMSkpLFxyXG4gICAgICAgICAgICAgICAgUGlja3VwKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMCwgMikpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoNCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSlcclxuICAgICAgICAgICAgICAgICkuSGlkZUxpZmVVSSgpLCBuZXcgRml4ZWRBdHRhY2tTdGFnZSgpKTtcclxuICAgICAgICAgICAgQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhdHRsZUNvbmZpZyhuZWVkS2lsbEFsbEVuZW1pZXM6IGZhbHNlKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDIsIDIpKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDEsIDIpKSxcclxuICAgICAgICAgICAgICAgIFBpY2t1cCgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIDIpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDUsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMikpXHJcbiAgICAgICAgICAgICAgICApLCBuZXcgRml4ZWRBdHRhY2tTdGFnZSgpKTtcclxuICAgICAgICAgICAgQWRkKG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoNiwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAwKSlcclxuICAgICAgICAgICAgICAgICksIG5ldyBGaXhlZEF0dGFja1N0YWdlKFxyXG4gICAgICAgICAgICAgICAgICAgIChpbnQpQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlKSk7XHJcbiAgICAgICAgICAgIEFkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgICBFbmVteSg0LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKVxyXG4gICAgICAgICAgICAgICApLCBuZXcgRml4ZWRBdHRhY2tTdGFnZShcclxuICAgICAgICAgICAgICAgICAgIChpbnQpQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlKSk7XHJcbiAgICAgICAgICAgIEFkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAvL0VuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpLFxyXG4gICAgICAgICAgICAgICBFbmVteSg1LCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKVxyXG4gICAgICAgICAgICAgICApLCBuZXcgRml4ZWRBdHRhY2tTdGFnZShcclxuICAgICAgICAgICAgICAgICAgIChpbnQpQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlKSk7XHJcbiAgICAgICAgICAgIEFkZChuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgIC8vRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAwKSksXHJcbiAgICAgICAgICAgICAgRW5lbXkoNSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSksXHJcbiAgICAgICAgICAgICAgRW5lbXkoNywgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAwKSlcclxuICAgICAgICAgICAgICApLCBuZXcgRml4ZWRBdHRhY2tTdGFnZShcclxuICAgICAgICAgICAgICAgICAgKGludClCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUsIChpbnQpQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyICkpO1xyXG4gICAgICAgICAgICBBZGQoXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICBFbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDApKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMikpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAyKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSgyLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgIG5ldyBTdGFnZURhdGEoXHJcbiAgICAgICAgICAgICAgICBFbmVteSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgRW5lbXkoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgzLCAyKSksXHJcbiAgICAgICAgICAgICAgICBFbmVteSgyLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDMsIDEpKSxcclxuICAgICAgICAgICAgICAgIEVuZW15KDIsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCYXR0bGVDb25maWcobmV3IGludFtdIHsgMSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBFbmVteSgzLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vLFxyXG4gICAgICAgICAgICAgICAgLy9uZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgLy9uZXcgRW5lbXlTcGF3bkRhdGEoMSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSksXHJcbiAgICAgICAgICAgICAgICAvL25ldyBFbmVteVNwYXduRGF0YSgxLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEFkZChwYXJhbXMgb2JqZWN0W10gY29tcHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGUgPSBlY3MuQ3JlYXRlRW50aXR5KCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGNvbXBzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlLkFkZENvbXBvbmVudChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgU3Bhd25EYXRhIFBpY2t1cChpbnQgdiwgVmVjdG9yMkQgdmVjdG9yMkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNwYXduRGF0YSh2LCB2ZWN0b3IyRCwgKGludClCYXR0bGVNYWluLkVudGl0eVR5cGUucGlja3VwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgU3Bhd25EYXRhIEVuZW15KGludCB2LCBWZWN0b3IyRCB2ZWN0b3IyRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3Bhd25EYXRhKHYsIHZlY3RvcjJELCAoaW50KUJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkKHBhcmFtcyBTdGFnZURhdGFbXSBzdGFnZURhdGExKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gc3RhZ2VEYXRhMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9zdGFnZXMuQWRkUmFuZ2Uoc3RhZ2VEYXRhMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBTdGFnZURhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxTcGF3bkRhdGE+IGVuZW15U3Bhd25zID0gbmV3IExpc3Q8U3Bhd25EYXRhPigpO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVDb25maWcgYmF0dGxlQ29uZmlnO1xyXG4gICAgICAgIHB1YmxpYyBib29sIGhpZGVMaWZlVUkgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlRGF0YShwYXJhbXMgU3Bhd25EYXRhW10gc3Bhd25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZW5lbXlTcGF3bnMuQWRkUmFuZ2Uoc3Bhd25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFnZURhdGEoQmF0dGxlQ29uZmlnIGJhdHRsZUNvbmZpZywgcGFyYW1zIFNwYXduRGF0YVtdIHNwYXducylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVuZW15U3Bhd25zLkFkZFJhbmdlKHNwYXducyk7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlQ29uZmlnID0gYmF0dGxlQ29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlRGF0YSBIaWRlTGlmZVVJKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGhpZGVMaWZlVUkgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEZpeGVkQXR0YWNrU3RhZ2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IG1vdmVzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgRml4ZWRBdHRhY2tTdGFnZShpbnQgbW92ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdmVzLkFkZChtb3ZlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBGaXhlZEF0dGFja1N0YWdlKHBhcmFtcyBpbnRbXSBtb3ZlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW92ZXMuQWRkUmFuZ2UobW92ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRml4ZWRBdHRhY2tTdGFnZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU3Bhd25EYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBpZDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGVudGl0eVR5cGU7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEJhc2VVdGlscy5WZWN0b3IyRCBwb3NpdGlvbjtcclxuXHJcbiAgICAgICAgcHVibGljIFNwYXduRGF0YShpbnQgaWQsIFZlY3RvcjJEIHBvc2l0aW9uLCBpbnQgdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLmVudGl0eVR5cGUgPSB0eXBlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuSGFwcHM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNb3ZlRGF0YUV4ZWN1dGVyXHJcbiAgICB7XHJcbiAgICAgICAgQmF0dGxlTWFpbiBiYXR0bGVNYWluO1xyXG4gICAgICAgIExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcztcclxuICAgICAgICBwcml2YXRlIEhhcHBNYW5hZ2VyIGhhcHBNYW5hZ2VyO1xyXG4gICAgICAgIHByaXZhdGUgTGlzdDxCYXR0bGVNYWluLkJhdHRsZUVudGl0eT4gZW50aXRpZXM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBUaW1lU3RhbXAgdGltZVN0YW1wO1xyXG4gICAgICAgIExpc3Q8VmVjdG9yMkQ+IGF1eCA9IG5ldyBMaXN0PFZlY3RvcjJEPigpO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIE1vdmVEYXRhRXhlY3V0ZXIoQmF0dGxlTWFpbiB0dXJuQmFzZSwgTGlzdDxNb3ZlRGF0YT4gbW92ZURhdGFzLCBFQ1NNYW5hZ2VyIGVjcywgVGltZVN0YW1wIHRpbWVTdGFtcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlTWFpbiA9IHR1cm5CYXNlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEYXRhcyA9IG1vdmVEYXRhcztcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIHRoaXMudGltZVN0YW1wID0gdGltZVN0YW1wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRXhlY3V0ZU1vdmUoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgYWN0b3IsIGludCB0dXJuKVxyXG4gICAgICAgIHtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgYmF0dGxlU3RhdGUgPSB0aGlzLmJhdHRsZU1haW4uYmF0dGxlU3RhdGU7XHJcbiAgICAgICAgICAgIGVudGl0aWVzID0gdGhpcy5iYXR0bGVNYWluLmVudGl0aWVzO1xyXG4gICAgICAgICAgICBpbnQgdXNlcklkID0gZW50aXRpZXMuSW5kZXhPZihhY3Rvcik7XHJcblxyXG4gICAgICAgICAgICB2YXIgbW92ZUlkID0gYWN0b3IubW92ZXNbdHVybl07XHJcbiAgICAgICAgICAgIGlmIChtb3ZlSWQgPCAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBtZCA9IG1vdmVEYXRhc1ttb3ZlSWRdO1xyXG4gICAgICAgICAgICBpZiAobWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbCA9IG1kLnVuaXRzLkNvdW50O1xyXG4gICAgICAgICAgICBpbnQgbW92ZVRpY2sgPSBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3c7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbWQudW5pdHNbbW92ZVRpY2tdLnRoaW5nc1RvSGFwcGVuO1xyXG4gICAgICAgICAgICBoYXBwTWFuYWdlciA9IGJhdHRsZU1haW4uaGFwcE1hbmFnZXI7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhIGluIGFjdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYSBpcyBNb3ZlQWN0aW9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVBY3Rpb24gbWEgPSBhIGFzIE1vdmVBY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBtYS5kaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rvci5wb3MgKz0gcDtcclxuICAgICAgICAgICAgICAgICAgICBib29sIGludmFsaWRNb3ZlID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3IucG9zLlggPCBhY3Rvci5taW5Qb3MuWFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhY3Rvci5wb3MuWSA8IGFjdG9yLm1pblBvcy5ZXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGFjdG9yLnBvcy5ZID4gYWN0b3IubWF4UG9zLllcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgYWN0b3IucG9zLlggPiBhY3Rvci5tYXhQb3MuWDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlICE9IGFjdG9yICYmIGUuQWxpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rvci5wb3MgPT0gZS5wb3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZE1vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBpY2t1cClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubGlmZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLmRhbWFnZU11bHRpcGxpZXIgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5wYW5lbGVmZmVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkTW92ZSkgYnJlYWs7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW52YWxpZE1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSW52YWxpZCBtb3ZlIGdlbmVyYXRlXCIgKyBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBhY3RvcklkID0gZW50aXRpZXMuSW5kZXhPZihhY3Rvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENyZWF0ZUhhcHAobWQsIG5ldyBIYXBwTW92ZURhdGEoYWN0b3JJZCksIG5ldyBIYXBwTW92ZW1lbnRGYWlsKGFjdG9yLnBvcykpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZU1haW4uaGFwcE1hbmFnZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5BZGQobmV3IEhhcHAoQmF0dGxlTWFpbi5IYXBwVGFnLk1vdmVtZW50RmFpbCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKGFjdG9ySWQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShhY3Rvci5wb3MuWCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKGFjdG9yLnBvcy5ZKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLnBvcyAtPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhIGlzIERlYWxEYW1hZ2VBY3Rpb24pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRkYSA9IGEgYXMgRGVhbERhbWFnZUFjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0YWNrRWxlbWVudCA9IGRkYS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZGEudGFyZ2V0ID09IFRhcmdldC5BcmVhKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZWEgPSBkZGEuYXJlYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZmVyZW5jZVVzZXJPZkFyZWEgPSBSZXNvbHZlVGFyZ2V0KGFjdG9yLCBlbnRpdGllcywgYXJlYS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgbWlycm9yaW5nWCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rvci5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSkgLy9lbmVtaWVzIGFjdCBvbiBvcHBvc2l0ZSBzaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pcnJvcmluZ1ggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgcG9pbnQgaW4gYXJlYS5wb2ludHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWFyY2hQb3MgPSBwb2ludCAqIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQobWlycm9yaW5nWCwgMSkgKyByZWZlcmVuY2VVc2VyT2ZBcmVhLnBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJTZWFyY2ggcG9pbnQgXCIrc2VhcmNoUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXRpZXNbaV0ucG9zID09IHNlYXJjaFBvcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlYWxEYW1hZ2UoYWN0b3IsIGRkYSwgZW50aXRpZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9maW5kIHRhcmdldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSB0YXJnZXQgPSBSZXNvbHZlVGFyZ2V0KGFjdG9yLCBlbnRpdGllcywgZGRhLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVhbERhbWFnZShhY3RvciwgZGRhLCB0YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhIGlzIFN1bW1vbkVudGl0eSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2UgPSBhIGFzIFN1bW1vbkVudGl0eTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5lbXlXaGljaCA9IHNlLmVuZW15V2hpY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZW15SWQgPSBiYXR0bGVNYWluLkJhdHRsZUNvbmZpZy5lbmVtaWVzVG9TdW1tb25bZW5lbXlXaGljaF07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVudGl0aWVzID0gYmF0dGxlTWFpbi5lbnRpdGllcztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb25zID0gR2V0RW1wdHlTcG90cyhzaWRlOjEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbnMuQ291bnQgPT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBWZWN0b3IyRCBzdW1tb25Qb3MgPSBzZS5wcmVmZXJlbnRpYWxSb3dDb2x1bW47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwb3NpdGlvbnMuQ29udGFpbnMoc3VtbW9uUG9zKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1vblBvcyA9IHBvc2l0aW9uc1swXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQobmV3IFNwYXduRGF0YShlbmVteUlkLCBzdW1tb25Qb3MsIChpbnQpQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYSBpcyBBbmltYXRpb24pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuaW0gPSBhIGFzIEFuaW1hdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSB0YXJnZXQgPSBSZXNvbHZlVGFyZ2V0KGFjdG9yLCBlbnRpdGllcywgYW5pbS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcmVhID0gYW5pbS5hcmVhO1xyXG4gICAgICAgICAgICAgICAgICAgIEhhcHBBcmVhIGhhcHBBcmVhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJlYSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZmVyZW5jZVVzZXJPZkFyZWEgPSBSZXNvbHZlVGFyZ2V0KGFjdG9yLCBlbnRpdGllcywgYXJlYS50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IG1pcnJvcmluZ1ggPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0b3IuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpIC8vZW5lbWllcyBhY3Qgb24gb3Bwb3NpdGUgc2lkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXJyb3JpbmdYID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcEFyZWEgPSBuZXcgSGFwcEFyZWEoYXJlYSwgcmVmZXJlbmNlVXNlck9mQXJlYS5wb3MsIG1pcnJvcmluZ1gpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpbnQgdGFyZ2V0SWQgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldElkID0gZW50aXRpZXMuSW5kZXhPZih0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIENyZWF0ZUhhcHAobWQsIGhhcHBBcmVhLCBuZXcgSGFwcE1vdmVEYXRhKHVzZXJJZCwgdGFyZ2V0SWQsIGFuaW0uZWxlbWVudCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW5pbS50YXJnZXQgIT0gVGFyZ2V0Lk5vbmUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwTWFuYWdlclxyXG4uQWRkKG5ldyBIYXBwKEJhdHRsZU1haW4uSGFwcFRhZy5BdHRhY2tIaXQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKGVudGl0aWVzLkluZGV4T2YodGFyZ2V0KSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUodXNlcklkKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZSgoaW50KWFuaW0uZWxlbWVudCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobW92ZVRpY2sgPT0gbWQudW5pdHMuQ291bnQgLSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBtZC51bml0cylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgYWN0IGluIGl0ZW0udGhpbmdzVG9IYXBwZW4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0IGlzIERlYWxEYW1hZ2VBY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENoYW5nZUVsZW1lbnQoYWN0b3IsIChhY3QgYXMgRGVhbERhbWFnZUFjdGlvbikuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIExpc3Q8VmVjdG9yMkQ+IEdldEVtcHR5U3BvdHMoaW50IHNpZGUgPSAtMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF1eC5DbGVhcigpO1xyXG4gICAgICAgICAgICBpbnQgb2ZmWCA9IDA7XHJcbiAgICAgICAgICAgIGlmIChzaWRlID09IDEpIG9mZlggPSAzO1xyXG4gICAgICAgICAgICBpbnQgd2lkdGggPSBiYXR0bGVNYWluLkJvYXJkV2lkdGggLyAyO1xyXG4gICAgICAgICAgICBpZiAoc2lkZSA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHdpZHRoID0gYmF0dGxlTWFpbi5Cb2FyZFdpZHRoO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgYmF0dGxlTWFpbi5Cb2FyZEhlaWdodDsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXguQWRkKG5ldyBWZWN0b3IyRChpK29mZlgsaikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBlbnRpdGllcyA9IGJhdHRsZU1haW4uZW50aXRpZXM7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5BbGl2ZSAmJiBhdXguQ29udGFpbnMoZS5wb3MpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5SZW1vdmUoZS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhdXg7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENoYW5nZUVsZW1lbnQoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgYWN0b3IsIEJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGFjdG9yLmVsZW1lbnQgPT0gZWxlbWVudCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBhY3Rvci5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdmFyIHRoID0gbmV3IEhhcHBUYWdzKChpbnQpTWlzY0hhcHBUYWdzLkNoYW5nZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudCh0aCwgbmV3IEhhcHBNb3ZlRGF0YShlbnRpdGllcy5JbmRleE9mKGFjdG9yKSwgLTEsIGVsZW1lbnQpKS5BZGRDb21wb25lbnQodGltZVN0YW1wLkdldFNuYXAoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ3JlYXRlSGFwcChNb3ZlRGF0YSBtZCwgb2JqZWN0IGNvbXAxLCBvYmplY3QgY29tcDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGggPSBuZXcgSGFwcFRhZ3MobWQudGFncyk7XHJcbiAgICAgICAgICAgIHZhciBlID0gZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQodGgsIHRpbWVTdGFtcC5HZXRTbmFwKCkpO1xyXG4gICAgICAgICAgICBpZiAoY29tcDEgIT0gbnVsbCkgZS5BZGRDb21wb25lbnQoY29tcDEpO1xyXG4gICAgICAgICAgICBpZiAoY29tcDIgIT0gbnVsbCkgZS5BZGRDb21wb25lbnQoY29tcDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENyZWF0ZUhhcHAoaW50IHRhZywgb2JqZWN0IGNvbXAxLCBvYmplY3QgY29tcDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGggPSBuZXcgSGFwcFRhZ3ModGFnKTtcclxuICAgICAgICAgICAgdmFyIGUgPSBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudCh0aCwgdGltZVN0YW1wLkdldFNuYXAoKSk7XHJcbiAgICAgICAgICAgIGlmIChjb21wMSAhPSBudWxsKSBlLkFkZENvbXBvbmVudChjb21wMSk7XHJcbiAgICAgICAgICAgIGlmIChjb21wMiAhPSBudWxsKSBlLkFkZENvbXBvbmVudChjb21wMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRGVhbERhbWFnZShCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBhY3RvciwgRGVhbERhbWFnZUFjdGlvbiBkZGEsIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IHRhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJhdHRsZU1haW4uRWxlbWVudCBhdHRhY2tFbGVtZW50ID0gZGRhLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGJvb2wgZWxlbWVudGFsQmxvY2sgPSBhdHRhY2tFbGVtZW50ID09IHRhcmdldC5lbGVtZW50ICYmIGF0dGFja0VsZW1lbnQgIT0gQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmU7XHJcbiAgICAgICAgICAgIGJvb2wgc3VwZXJFZmZlY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW50IGRhbWFnZSA9IDA7XHJcbiAgICAgICAgICAgIGludCB0YXJnZXRJZCA9IGVudGl0aWVzLkluZGV4T2YodGFyZ2V0KTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRhbEJsb2NrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtZW50YWxCbG9jaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbXVsID0gYmF0dGxlTWFpbi5DYWxjdWxhdGVBdHRhY2tNdWx0aXBsaWVyKGFjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBtdWwgKj0gYmF0dGxlTWFpbi5DYWxjdWxhdGVEZWZlbmRlck11bHRpcGxpZXIodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNrRWxlbWVudCA9PSBCYXR0bGVNYWluLkVsZW1lbnQuRmlyZSAmJiB0YXJnZXQuZWxlbWVudCA9PSBCYXR0bGVNYWluLkVsZW1lbnQuSWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGF0dGFja0VsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIgJiYgdGFyZ2V0LmVsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkZpcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgYXR0YWNrRWxlbWVudCA9PSBCYXR0bGVNYWluLkVsZW1lbnQuSWNlICYmIHRhcmdldC5lbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsICo9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyRWZmZWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYW1hZ2UgPSBkZGEuZGFtYWdlICogKGludCltdWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmxpZmUgLT0gZGFtYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdG9yLmRhbWFnZU11bHRpcGxpZXIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGhhcHBNYW5hZ2VyLkFkZChuZXcgSGFwcChCYXR0bGVNYWluLkhhcHBUYWcuRGFtYWdlVGFrZW4pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUodGFyZ2V0SWQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkNyZWF0ZUhhcHAoKGludClNaXNjSGFwcFRhZ3MuRGFtYWdlLCBuZXcgSGFwcERhbWFnZURhdGEodGFyZ2V0LmVsZW1lbnQsIGRkYS5lbGVtZW50LCBlbnRpdGllcy5JbmRleE9mKHRhcmdldCksIGRhbWFnZSwgc3VwZXJFZmZlY3RpdmUsIGVsZW1lbnRhbEJsb2NrKSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQubGlmZSA8PSAwICYmICFzdXBlckVmZmVjdGl2ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ3JlYXRlSGFwcCgoaW50KU1pc2NIYXBwVGFncy5EZWF0aCwgbmV3IEhhcHBNb3ZlRGF0YSh0YXJnZXRJZCksIG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBSZXNvbHZlVGFyZ2V0KEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGFjdG9yLCBMaXN0PEJhdHRsZU1haW4uQmF0dGxlRW50aXR5PiBlbnRpdGllcywgVGFyZ2V0IHRhcmdldFR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0VHlwZSA9PSBUYXJnZXQuU2VsZikgcmV0dXJuIGFjdG9yO1xyXG4gICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSB0YXJnZXQgPSBudWxsO1xyXG4gICAgICAgICAgICBmbG9hdCBtaW5EaXMgPSAxMDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUyIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGUyLkRlYWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdG9yLlR5cGUgIT0gZTIuVHlwZVxyXG4gICAgICAgICAgICAgICAgICAgICYmIGUyLlR5cGUgIT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBhbmVsZWZmZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgJiYgZTIuVHlwZSAhPSBCYXR0bGVNYWluLkVudGl0eVR5cGUucGlja3VwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgc2FtZUhlaWdodCA9IGFjdG9yLnBvcy5ZID09IGUyLnBvcy5ZO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2FtZUhlaWdodClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IGRpcyA9IGFjdG9yLnBvcy5YIC0gZTIucG9zLlg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXMgPCAwKSBkaXMgKj0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXMgPCBtaW5EaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpcyA9IGRpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGUyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBUYWdzXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8aW50PiB0YWdzID0gbmV3IExpc3Q8aW50PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcFRhZ3MoTGlzdDxpbnQ+IHRhZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ3MuQWRkUmFuZ2UodGFncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcFRhZ3MoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0YWdzLkFkZChpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gTWlzY0hhcHBUYWdze1xyXG4gICAgICAgIENoYW5nZUVsZW1lbnQgPSA1MDAsXHJcbiAgICAgICAgRGFtYWdlID0gNTAxLFxyXG4gICAgICAgIERlYXRoID0gNTAyXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBEYW1hZ2VEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEJhdHRsZU1haW4uRWxlbWVudCB0YXJnZXRFLCBkYW1hZ2VFO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgdGFyZ2V0O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgYW1vdW50O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBib29sIHN1cGVyRWZmZWN0aXZlO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBib29sIGVsZW1lbnRhbEJsb2NrO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcERhbWFnZURhdGEoQmF0dGxlTWFpbi5FbGVtZW50IHRhcmdldEUsIEJhdHRsZU1haW4uRWxlbWVudCBkYW1hZ2VFLCBpbnQgdGFyZ2V0LCBpbnQgYW1vdW50LCBib29sIHN1cGVyRWZmZWN0aXZlLCBib29sIGVsZW1lbnRhbEJsb2NrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRFID0gdGFyZ2V0RTtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2VFID0gZGFtYWdlRTtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuYW1vdW50ID0gYW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLnN1cGVyRWZmZWN0aXZlID0gc3VwZXJFZmZlY3RpdmU7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudGFsQmxvY2sgPSBlbGVtZW50YWxCbG9jaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBNb3ZlRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgdXNlcjtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHRhcmdldCA9IC0xO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IEJhdHRsZU1haW4uRWxlbWVudC5Ob25lO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcE1vdmVEYXRhKGludCB1c2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwTW92ZURhdGEoaW50IHVzZXIsIGludCB0YXJnZXQsIEJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwTW92ZW1lbnRGYWlsXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFZlY3RvcjJEIG1vdmVUbztcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBNb3ZlbWVudEZhaWwoVmVjdG9yMkQgbW92ZVRvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlVG8gPSBtb3ZlVG87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwQXJlYVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBBcmVhIGFyZWE7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEIG9mZnNldCA9IG5ldyBWZWN0b3IyRCgpO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgbWlycm9yaW5nWDtcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBBcmVhKEFyZWEgYXJlYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEFyZWEoQXJlYSBhcmVhLCBWZWN0b3IyRCBvZmZzZXQsIGludCBtaXJyb3JpbmdYKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIHRoaXMubWlycm9yaW5nWCA9IG1pcnJvcmluZ1g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuRGVidWdFeHRyYTtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5IYXBwc1xyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBDdXJyZW50VGltZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBMaXN0PEhhcHA+IEhhcHBzID0gbmV3IExpc3Q8SGFwcD4oKTtcclxuICAgICAgICBMaXN0PEhhcHBIYW5kbGVyPiBoYW5kbGVycyA9IG5ldyBMaXN0PEhhcHBIYW5kbGVyPigpO1xyXG4gICAgICAgIGludCBsYXRlc3RIYW5kbGVkID0gLTE7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZEhhbmRsZXIoSGFwcEhhbmRsZXIgaGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQoaGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVHJ5SGFuZGxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGxhdGVzdEhhbmRsZWQgIT0gQ3VycmVudFRpbWUpXHJcbiAgICAgICAgICAgICAgICBIYW5kbGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBIYW5kbGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGF0ZXN0SGFuZGxlZCA9IEN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaCBpbiBoYW5kbGVycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IEhhcHBzLkNvdW50IC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGNoZWNrIGFzc3VtZXMgaGFwcHMgYXJlIG9yZGVyZWQgYnkgdGltZSBzdGFtcFxyXG4gICAgICAgICAgICAgICAgICAgIC8vd2hpY2ggdGhleSBzaG91bGQgYmUgYXV0b21hdGljYWxseVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChIYXBwc1tpXS5UaW1lU3RhbXAgIT0gQ3VycmVudFRpbWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWJ1Z0V4LkxvZyhcIkhhcHBlbmluZyBub3QgZXF1YWwgdG8gY3VycmVudCB0aW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBoYXNUYWdzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdGFnc05lZWRlZCBpbiBoLm5lY2Vzc2FyeVRhZ3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUhhcHBzW2ldLkhhc1RhZyh0YWdzTmVlZGVkKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzVGFncyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1RhZ3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWJ1Z0V4LkxvZyhcIkhhcHBlbmluZyBoYW5kbGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoLkhhbmRsZShIYXBwc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlYnVnRXguTG9nKFwiSGFwcGVuaW5nIHRhZyBpcyBkaWZmZXJlbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcCBBZGQoSGFwcCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaC5UaW1lU3RhbXAgPSBDdXJyZW50VGltZTtcclxuICAgICAgICAgICAgSGFwcHMuQWRkKGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gaDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFRpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VycmVudFRpbWUrKztcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBcclxuICAgIHtcclxuICAgICAgICAvL3B1YmxpYyBzdHJpbmcgTWFpblRhZztcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IHRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIGludCBUaW1lU3RhbXA7XHJcbiAgICAgICAgTGlzdDxBdHRyaWJ1dGU+IGF0dHJzID0gbmV3IExpc3Q8QXR0cmlidXRlPigpO1xyXG5cclxuICAgICAgICAvL3B1YmxpYyBIYXBwKElDb252ZXJ0aWJsZSBjKVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vICAgIHRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihjKSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwKG9iamVjdCBtYWluVGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9NYWluVGFnID0gbWFpblRhZy5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICB0YWdzLkFkZChDb252ZXJ0LlRvSW50MzIobWFpblRhZykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEF0dHJpYnV0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IFZhbHVlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgQXR0cmlidXRlIFNldFZhbHVlKGZsb2F0IGYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFZhbHVlID0gZjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBUYWdIb2xkZXIgdGFncyA9IG5ldyBUYWdIb2xkZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwIEFkZEF0dHJpYnV0ZShBdHRyaWJ1dGUgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF0dHJzLkFkZChhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBpbnQgR2V0QXR0cmlidXRlX0ludChpbnQgaW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludClhdHRyc1tpbmRleF0uVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIEhhc1RhZyhpbnQgdGFnc05lZWRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YWdzLkNvbnRhaW5zKHRhZ3NOZWVkZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcEhhbmRsZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IG5lY2Vzc2FyeVRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIEFjdGlvbjxIYXBwPiBIYW5kbGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwSGFuZGxlcihvYmplY3QgbWFpblRhZywgQWN0aW9uPEhhcHA+IGhhbmRsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubmVjZXNzYXJ5VGFncy5BZGQoQ29udmVydC5Ub0ludDMyKG1haW5UYWcpKTtcclxuICAgICAgICAgICAgSGFuZGxlID0gaGFuZGxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGFnSG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8b2JqZWN0PiBUYWdzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBIYXNUYWcob2JqZWN0IHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGFncy5Db250YWlucyh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWRkKG9iamVjdCB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGFncy5BZGQodik7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgTGlzdDxvYmplY3Q+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19UYWdzPW5ldyBMaXN0PG9iamVjdD4oKTt9XHJcblxyXG5cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIElucHV0SG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8SW5wdXQ+IGlucHV0cyA9IG5ldyBMaXN0PElucHV0PigpO1xyXG4gICAgICAgIExpc3Q8SW5wdXRUYWdzPiB0YWdzID0gbmV3IExpc3Q8SW5wdXRUYWdzPigpO1xyXG5cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBDbGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnB1dHMuQ2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWRkKElucHV0IGlucHV0LCBJbnB1dFRhZ3MgdGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW5wdXRzLkFkZChpbnB1dCk7XHJcbiAgICAgICAgICAgIHRhZ3MuQWRkKHRhZyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBUYWdJcyhpbnQgaTIsIElucHV0VGFncyB0YWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGFncy5Db3VudCA8PSBpMikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGFnc1tpMl0gPT0gdGFnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBJbnB1dFRhZ3N7XHJcbiAgICAgICAgTk9ORSwgTU9WRUZJWCwgTU9WRVVORklYLCBNSVNDXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNb3ZlQ3JlYXRvclByb2dcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PE1vdmVEYXRhPiBtb3ZlRGF0YXMgPSBuZXcgTGlzdDxNb3ZlRGF0YT4oKTtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PE1vdmVSZW5kZXJEYXRhPiBtb3ZlUmVuZGVycyA9IG5ldyBMaXN0PE1vdmVSZW5kZXJEYXRhPigpO1xyXG4gICAgICAgIEFyZWFDcmVhdGlvblV0aWxzIGFyZWFVdGlscyA9IG5ldyBBcmVhQ3JlYXRpb25VdGlscygpO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZUNyZWF0b3JQcm9nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdmVEYXRhcy5BZGQobnVsbCk7IC8vZG8gbm90aGluZ1xyXG4gICAgICAgICAgICBCYXNlVXRpbHMuVmVjdG9yMkRbXSBkaXJlY3Rpb25zID0gbmV3IEJhc2VVdGlscy5WZWN0b3IyRFtdIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgwLCAxKSxcclxuICAgICAgICAgICAgICAgIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoLTEsIDApLFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgwLCAtMSksXHJcbiAgICAgICAgICAgICAgICBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDEsIDApLCBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc3RyaW5nW10gbW92ZUxhYmVscyA9IG5ldyBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgVXBcIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBMZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgRG93blwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIFJpZ2h0XCIsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHN0cmluZ1tdIG1vdmVBYnJldiA9IG5ldyBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgICAgICBcIl5cIixcclxuICAgICAgICAgICAgICAgIFwiPFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2XCIsXHJcbiAgICAgICAgICAgICAgICBcIj5cIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBkaXJlY3Rpb25zLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOZXdNb3ZlRGF0YShsYWJlbDptb3ZlTGFiZWxzW2ldLCBjb25kaXRpb246IG5ldyBDb25kaXRpb24oQ29uZGl0aW9uVHlwZS5DYW5Nb3ZlLCBUYXJnZXQuU2VsZiwgZGlyZWN0aW9uc1tpXSksIGFjdGlvbjogbmV3IE1vdmVBY3Rpb24oVGFyZ2V0LlNlbGYsIGRpcmVjdGlvbnNbaV0pLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuTW92ZW1lbnQsICBNb3ZlRGF0YVRhZ3MuSGVyb0luaXRpYWwpKTtcclxuICAgICAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShuYW1lOm1vdmVMYWJlbHNbaV0sIGFicmV2Om1vdmVBYnJldltpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJHdW5cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5Ob25lKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TaG9vdCkpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJHdW5cIiwgXCJHXCIpO1xyXG5cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJGaXJlZ3VuXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKG5ldyBBbmltYXRpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCBCYXR0bGVNYWluLkVsZW1lbnQuRmlyZSksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgMSwgQmF0dGxlTWFpbi5FbGVtZW50LkZpcmUpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkZpcmVndW5cIiwgXCJGR1wiKTtcclxuXHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiSWNlZ3VuXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKG5ldyBBbmltYXRpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCBCYXR0bGVNYWluLkVsZW1lbnQuSWNlKSwgbmV3IERlYWxEYW1hZ2VBY3Rpb24oVGFyZ2V0LkNsb3Nlc3RUYXJnZXRYLCAxLCBCYXR0bGVNYWluLkVsZW1lbnQuSWNlKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TaG9vdCkpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJJY2VndW5cIiwgXCJJR1wiKTtcclxuXHJcbiAgICAgICAgICAgIE5ld01vdmVEYXRhKFwiVGh1bmRlcmd1blwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TaG9vdCkpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJUaHVuZGVyZ3VuXCIsIFwiVEdcIik7XHJcblxyXG4gICAgICAgICAgICBBcmVhIGFyZWEgPSBBcmVhVXNlcigpLlJvd0ZvcndhcmQod2lkdGg6IDEsIFhEaXM6IDMpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkljZWJvbWJcIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihhcmVhLCBCYXR0bGVNYWluLkVsZW1lbnQuSWNlKSwgbmV3IERlYWxEYW1hZ2VBY3Rpb24oYXJlYSwgMSwgQmF0dGxlTWFpbi5FbGVtZW50LkljZSkpLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuQm9tYikpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJJY2Vib21iXCIsIFwiSUJcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIlRodW5kZXJib21iXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKG5ldyBBbmltYXRpb24oYXJlYSwgQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihhcmVhLCAxLCBCYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlcikpLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuQm9tYikpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJUaHVuZGVyYm9tYlwiLCBcIlRCXCIpO1xyXG5cclxuICAgICAgICAgICAgTmV3TW92ZURhdGEoXCJTdW1tb25cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24oU3VtbW9uRW50aXR5LkVuZW15KDAsIG5ldyBWZWN0b3IyRCg1LDApKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TdW1tb24pKTtcclxuICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKFwiU3VtbW9uXCIsIFwiU1VcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBpbnQgR2V0TW92ZUlkKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1vdmVEYXRhLkZpbmRCeUxhYmVsKG1vdmVEYXRhcywgdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIEFyZWFDcmVhdGlvblV0aWxzIEFyZWFVc2VyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFyZWFVdGlscy50YXJnZXQgPSBUYXJnZXQuU2VsZjtcclxuICAgICAgICAgICAgcmV0dXJuIGFyZWFVdGlscztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBBcmVhQ3JlYXRpb25VdGlsc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIFRhcmdldCB0YXJnZXQ7XHJcbiAgICAgICAgICAgIGludCBoZWlnaHQgPSAzO1xyXG5cclxuICAgICAgICAgICAgaW50ZXJuYWwgQXJlYSBSb3dGb3J3YXJkKGludCB3aWR0aCwgaW50IFhEaXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciByYSA9IG5ldyBBcmVhKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBpbnQgb2Zmc2V0WSA9IChpbnQpTWF0aC5GbG9vcigoZmxvYXQpaGVpZ2h0IC8gMmYpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmEucG9pbnRzLkFkZChuZXcgVmVjdG9yMkQoaStYRGlzLCBqLW9mZnNldFkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTmV3TW92ZVRleHRSZW5kZXJEYXRhKHN0cmluZyBuYW1lLCBzdHJpbmcgYWJyZXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3ZlUmVuZGVycy5BZGQobmV3IE1vdmVSZW5kZXJEYXRhKG5hbWUsIGFicmV2KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTmV3TW92ZURhdGEoc3RyaW5nIGxhYmVsLCBUaWNrW10gdGlja3MsIG9iamVjdFtdIHRhZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbXYgPSBuZXcgTW92ZURhdGEobGFiZWwpO1xyXG4gICAgICAgICAgICBtdi51bml0cy5BZGRSYW5nZSh0aWNrcyk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG12LnRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1vdmVEYXRhcy5BZGQobXYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE5ld01vdmVEYXRhKHN0cmluZyBsYWJlbCwgQ29uZGl0aW9uIGNvbmRpdGlvbiwgb2JqZWN0IGFjdGlvbiwgb2JqZWN0W10gdGFncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtdiA9IG5ldyBNb3ZlRGF0YShsYWJlbCk7XHJcbiAgICAgICAgICAgIFRpY2sgdGljayA9IG5ldyBUaWNrKCk7XHJcbiAgICAgICAgICAgIHRpY2suY29uZGl0aW9uID0gY29uZGl0aW9uO1xyXG4gICAgICAgICAgICB0aWNrLnRoaW5nc1RvSGFwcGVuLkFkZChhY3Rpb24pO1xyXG4gICAgICAgICAgICBtdi51bml0cy5BZGQodGljayk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG12LnRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW92ZURhdGFzLkFkZChtdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFRpY2tbXSBPbmVUaWNrUGVyQWN0aW9uKHBhcmFtcyBvYmplY3RbXSBhY3Rpb25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGlja1tdIHRpY2tzID0gbmV3IFRpY2tbYWN0aW9ucy5MZW5ndGhdO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRpY2tzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aWNrc1tpXSA9IG5ldyBUaWNrKGFjdGlvbnNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aWNrcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb2JqZWN0W10gVGFnQXJyYXkocGFyYW1zIG9iamVjdFtdIGFyZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJncztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdmVSZW5kZXJEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBMYWJlbDtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEFicmV2O1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVJlbmRlckRhdGEoc3RyaW5nIGxhYmVsLCBzdHJpbmcgYWJyZXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgICAgIHRoaXMuQWJyZXYgPSBhYnJldjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBY2Nlc3NvclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgTGVuZ3RoIHsgZ2V0IHsgcmV0dXJuIFNlbGVjdGVkRW50aXRpZXMuQ291bnQ7IH0gfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBUeXBlW10gVHlwZXNQcm9oaWJpdGVkIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVHlwZVtdIFR5cGVzTmVjZXNzYXJ5O1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8RW50aXR5PiBTZWxlY3RlZEVudGl0aWVzID0gbmV3IExpc3Q8RW50aXR5PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgQWNjZXNzb3IocGFyYW1zIFR5cGVbXSBzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVHlwZXNOZWNlc3NhcnkgPSBzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBFbnRpdHlBZGRlZChFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTZWxlY3RlZEVudGl0aWVzLkNvbnRhaW5zKGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBHZXQoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU2VsZWN0ZWRFbnRpdGllc1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFF1aWNrQWNjZXNzb3JPbmU8VDE+XHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBRdWlja0FjY2Vzc29yT25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yID0gbmV3IEFjY2Vzc29yKHR5cGVvZihUMSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgQWNjZXNzb3IgYWNjZXNzb3I7XHJcbiAgICAgICAgcHVibGljIGludCBDb3VudCB7IGdldCB7IHJldHVybiBhY2Nlc3Nvci5MZW5ndGg7IH0gfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgVDEgQ29tcDEoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllc1tpXS5HZXRDb21wb25lbnQ8VDE+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IEVudGl0eShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4gXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGludGVybmFsIEFjY2Vzc29yIGFjY2Vzc29yO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgTGVuZ3RoIHsgZ2V0IHsgcmV0dXJuIGFjY2Vzc29yLkxlbmd0aDsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUMSBDb21wMShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldLkdldENvbXBvbmVudDxUMT4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgRW50aXR5KGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXNbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUXVpY2tBY2Nlc3NvclR3bygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhY2Nlc3NvciA9IG5ldyBBY2Nlc3Nvcih0eXBlb2YoVDEpLCB0eXBlb2YoVDIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgVDIgQ29tcDIoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllc1tpXS5HZXRDb21wb25lbnQ8VDI+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guRUNTXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBFQ1NNYW5hZ2VyXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEVDU01hbmFnZXJbXSBtYW5hZ2VycyA9IG5ldyBFQ1NNYW5hZ2VyWzIwXTtcclxuICAgICAgICBEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPiBjb21wcyA9IG5ldyBEaWN0aW9uYXJ5PFR5cGUsIG9iamVjdFtdPigpO1xyXG4gICAgICAgIHByaXZhdGUgaW50IEVDU0lkO1xyXG5cclxuICAgICAgICBwcml2YXRlIEVDU01hbmFnZXIoKSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFByb2Nlc3NvckFjY2Vzc29yIENyZWF0ZVByb2Nlc3NvcihBY2Nlc3NvciBhY2Nlc3NvciwgQWN0aW9uPEFjY2Vzc29yPiBhY3Rpb24pXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9jZXNzb3JBY2Nlc3NvcihhY3Rpb24sIGFjY2Vzc29yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBY2Nlc3NvciBDcmVhdGVBY2Nlc3NvcihUeXBlW10gbmVjZXNzYXJ5LCBUeXBlW10gbm90KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGFjYyA9IG5ldyBBY2Nlc3NvcihuZWNlc3NhcnkpO1xyXG4gICAgICAgICAgICBhY2MuVHlwZXNQcm9oaWJpdGVkID0gbm90O1xyXG4gICAgICAgICAgICBBZGRBY2Nlc3NvcihhY2MpO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBRdWlja0FjY2Vzc29yVHdvPFQxLFQyPiBRdWlja0FjY2Vzc29yMjxUMSwgVDI+KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBhY2Nlc3NvciA9IG5ldyBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4oKTtcclxuICAgICAgICAgICAgQWRkQWNjZXNzb3IoYWNjZXNzb3IuYWNjZXNzb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUXVpY2tBY2Nlc3Nvck9uZTxUMT4gUXVpY2tBY2Nlc3NvcjE8VDE+KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFF1aWNrQWNjZXNzb3JPbmU8VDE+IGFjY2Vzc29yID0gbmV3IFF1aWNrQWNjZXNzb3JPbmU8VDE+KCk7XHJcbiAgICAgICAgICAgIEFkZEFjY2Vzc29yKGFjY2Vzc29yLmFjY2Vzc29yKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50IGVudGl0eUlkTWF4ID0gLTE7XHJcbiAgICAgICAgTGlzdDxBY2Nlc3Nvcj4gYWNjZXNzb3JzID0gbmV3IExpc3Q8QWNjZXNzb3I+KCk7XHJcblxyXG4gICAgICAgICNyZWdpb24gc3RhdGljIG1ldGhvZHNcclxuXHJcblxyXG4gICAgICAgIGludGVybmFsIHN0YXRpYyBFQ1NNYW5hZ2VyIEdldEluc3RhbmNlKEVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1hbmFnZXJzW2UuZWNzXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRUNTTWFuYWdlciBDcmVhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbWFuYWdlcnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChtYW5hZ2Vyc1tpXSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFuYWdlcnNbaV0gPSBuZXcgRUNTTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hbmFnZXJzW2ldLkVDU0lkID0gaTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFuYWdlcnNbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IENyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQob2JqZWN0IHYpXHJcbiAgICAgICAge1xyXG5FbnRpdHkgZTtcbiAgICAgICAgICAgIENyZWF0ZUVudGl0eShvdXQgZSk7XHJcbiAgICAgICAgICAgIEFkZENvbXBvbmVudChlLCB2KTtcclxuICAgICAgICAgICAgcmV0dXJuIGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IENyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQob2JqZWN0IHYsIG9iamVjdCB2MilcclxuICAgICAgICB7XHJcbkVudGl0eSBlO1xuICAgICAgICAgICAgQ3JlYXRlRW50aXR5KG91dCBlKTtcclxuICAgICAgICAgICAgQWRkQ29tcG9uZW50KGUsIHYpO1xyXG4gICAgICAgICAgICBBZGRDb21wb25lbnQoZSwgdjIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgQ3JlYXRlRW50aXR5KG91dCBFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVudGl0eUlkTWF4Kys7XHJcbiAgICAgICAgICAgIEVudGl0eSBlbnRpdHkgPSBuZXcgRW50aXR5KHRoaXMuRUNTSWQsIGVudGl0eUlkTWF4KTtcclxuICAgICAgICAgICAgZSA9IGVudGl0eTtcclxuICAgICAgICAgICAgcmV0dXJuIGVudGl0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgQ3JlYXRlRW50aXR5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVudGl0eUlkTWF4Kys7XHJcbiAgICAgICAgICAgIEVudGl0eSBlbnRpdHkgPSBuZXcgRW50aXR5KHRoaXMuRUNTSWQsIGVudGl0eUlkTWF4KTtcclxuICAgICAgICAgICAgcmV0dXJuIGVudGl0eTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgUHJvY2Vzc29yRmxleDxUMSxUMj4gUXVpY2tQcm9jZXNzb3JGbGV4PFQxLCBUMj4oQWN0aW9uPFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPj4gcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFByb2Nlc3NvckZsZXg8VDEsIFQyPiBwcm9jZXNzb3JGbGV4ID0gbmV3IFByb2Nlc3NvckZsZXg8VDEsIFQyPihwKTtcclxuICAgICAgICAgICAgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+IGFjY2Vzc29yID0gcHJvY2Vzc29yRmxleC5hY2Nlc3NvcjtcclxuICAgICAgICAgICAgQWNjZXNzb3IgYWNjZXNzb3IxID0gYWNjZXNzb3IuYWNjZXNzb3I7XHJcbiAgICAgICAgICAgIEFkZEFjY2Vzc29yKGFjY2Vzc29yMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzb3JGbGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEFkZEFjY2Vzc29yKEFjY2Vzc29yIGFjY2Vzc29yMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFjY2Vzc29ycy5BZGQoYWNjZXNzb3IxKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPD0gZW50aXR5SWRNYXg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlQWNjZXNzb3JFbnRpdHkoYWNjZXNzb3IxLCBpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVBY2Nlc3NvckVudGl0eShBY2Nlc3NvciBhY2Nlc3NvciwgaW50IGVudGl0eUlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRW50aXR5IGVudGl0eSA9IG5ldyBFbnRpdHkoRUNTSWQsIGVudGl0eUlkKTtcclxuICAgICAgICAgICAgYm9vbCBiZWxvbmcgPSBIYXNBbGxDb21wcyhhY2Nlc3Nvci5UeXBlc05lY2Vzc2FyeSwgZW50aXR5SWQpICYmIEhhc05vbmVPZlRoZXNlQ29tcHMoYWNjZXNzb3IuVHlwZXNQcm9oaWJpdGVkLCBlbnRpdHlJZCk7XHJcbiAgICAgICAgICAgIGJvb2wgbWVtYmVyID0gYWNjZXNzb3IuRW50aXR5QWRkZWQoZW50aXR5KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChiZWxvbmcgIT0gbWVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmVsb25nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXMuQWRkKGVudGl0eSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllcy5SZW1vdmUoZW50aXR5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKGl0ZW0uRW50aXR5QWRkZWQoZSkpXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vZWxzZVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgaWYgKEhhc0FsbENvbXBvbmVudHMoZSwgaXRlbS5UeXBlc05lY2Vzc2FyeSkpXHJcbiAgICAgICAgICAgIC8vICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGl0ZW0uU2VsZWN0ZWRFbnRpdGllcy5BZGQoZSk7XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGludGVybmFsIFQgQWRkQ29tcG9uZW50PFQ+KEVudGl0eSBlKSB3aGVyZSBUIDogbmV3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFQgdCA9IG5ldyBUKCk7XHJcbiAgICAgICAgICAgIEFkZENvbXBvbmVudChlLCB0KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkQ29tcG9uZW50KEVudGl0eSBlLCBvYmplY3QgdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR5cGUgdHlwZSA9IHQuR2V0VHlwZSgpO1xyXG4gICAgICAgICAgICBpZiAoIWNvbXBzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb21wcy5BZGQodHlwZSwgbmV3IG9iamVjdFszMDBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb21wc1t0eXBlXVtlLmlkXSA9IHQ7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGFjY2Vzc29ycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlQWNjZXNzb3JFbnRpdHkoaXRlbSwgZS5pZCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlQ29tcG9uZW50KEVudGl0eSBlLCBvYmplY3QgdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR5cGUgdHlwZSA9IHQuR2V0VHlwZSgpO1xyXG4gICAgICAgICAgICBpZiAoIWNvbXBzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb21wcy5BZGQodHlwZSwgbmV3IG9iamVjdFszMDBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb21wc1t0eXBlXVtlLmlkXSA9IG51bGw7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGFjY2Vzc29ycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlQWNjZXNzb3JFbnRpdHkoaXRlbSwgZS5pZCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgSGFzQWxsQ29tcG9uZW50cyhFbnRpdHkgZSwgVHlwZVtdIHR5cGVzTmVjZXNzYXJ5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGlkID0gZS5pZDtcclxuICAgICAgICAgICAgcmV0dXJuIEhhc0FsbENvbXBzKHR5cGVzTmVjZXNzYXJ5LCBpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgSGFzQWxsQ29tcHMoVHlwZVtdIHR5cGVzTmVjZXNzYXJ5LCBpbnQgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdHlwZSBpbiB0eXBlc05lY2Vzc2FyeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjb21wcy5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBzW3R5cGVdW2lkXSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBIYXNOb25lT2ZUaGVzZUNvbXBzKFR5cGVbXSB0eXBlc1Byb2hpYml0ZWQsIGludCBpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlc1Byb2hpYml0ZWQgPT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0eXBlIGluIHR5cGVzUHJvaGliaXRlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wc1t0eXBlXVtpZF0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVCBHZXRDb21wb25lbnQ8VD4oRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUeXBlIHR5cGUgPSB0eXBlb2YoVCk7XHJcbiAgICAgICAgICAgIGlmICghY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vY29tcHMuQWRkKHR5cGUsIG5ldyBvYmplY3RbMzAwXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmYXVsdChUKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKFQpIGNvbXBzW3R5cGVdW2UuaWRdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guRUNTXHJcbntcclxuICAgIHB1YmxpYyBzdHJ1Y3QgRW50aXR5IDogSUVxdWF0YWJsZTxFbnRpdHk+XHJcbiAgICB7XHJcbiAgICAgICAgcmVhZG9ubHkgaW50ZXJuYWwgaW50IGVjcztcclxuICAgICAgICByZWFkb25seSBpbnRlcm5hbCBpbnQgaWQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkoaW50IGVjcywgaW50IGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhFbnRpdHkgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gb3RoZXIuaWQgPT0gdGhpcy5pZCAmJiBvdGhlci5lY3MgPT0gdGhpcy5lY3M7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBFeHRlbnNpb25NZXRob2RzXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZW1vdmVDb21wb25lbnQodGhpcyBFbnRpdHkgZSwgb2JqZWN0IGNvbXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFQ1NNYW5hZ2VyLkdldEluc3RhbmNlKGUpLlJlbW92ZUNvbXBvbmVudChlLCBjb21wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBBZGRDb21wb25lbnQ8VD4odGhpcyBFbnRpdHkgZSkgd2hlcmUgVDogbmV3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBFQ1NNYW5hZ2VyLkdldEluc3RhbmNlKGUpLkFkZENvbXBvbmVudDxUPihlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEFkZENvbXBvbmVudCh0aGlzIEVudGl0eSBlLCBvYmplY3QgY29tcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVDU01hbmFnZXIuR2V0SW5zdGFuY2UoZSkuQWRkQ29tcG9uZW50KGUsIGNvbXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgR2V0Q29tcG9uZW50PFQ+KHRoaXMgRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRUNTTWFuYWdlci5HZXRJbnN0YW5jZShlKS5HZXRDb21wb25lbnQ8VD4oZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIFByb2Nlc3NvckZsZXg8VDEsIFQyPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgQWN0aW9uPFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPj4gcDtcclxuICAgICAgICBpbnRlcm5hbCBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4gYWNjZXNzb3I7XHJcblxyXG4gICAgICAgIHB1YmxpYyBQcm9jZXNzb3JGbGV4KEFjdGlvbjxRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4+IHApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnAgPSBwO1xyXG4gICAgICAgICAgICBhY2Nlc3NvciA9IG5ldyBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJ1bigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwKGFjY2Vzc29yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFByb2Nlc3NvckFjY2Vzc29yXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBBY3Rpb248QWNjZXNzb3I+IHA7XHJcblxyXG4gICAgICAgIEFjY2Vzc29yIGE7XHJcblxyXG4gICAgICAgIHB1YmxpYyBQcm9jZXNzb3JBY2Nlc3NvcihBY3Rpb248QWNjZXNzb3I+IHAsIEFjY2Vzc29yIGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnAgPSBwO1xyXG4gICAgICAgICAgICB0aGlzLmEgPSBhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUnVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHAoYSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0V29ybGRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZSBwYWxldHRlID0gRGVmYXVsdFBhbGV0dGVzLkM0S2lyb0themU7XHJcbiAgICAgICAgTGlzdDxUZXh0RW50aXR5PiBhY3RpdmVBZ2VudHMgPSBuZXcgTGlzdDxUZXh0RW50aXR5PigpO1xyXG4gICAgICAgIExpc3Q8VGV4dEVudGl0eT4gZnJlZUJvYXJkcyA9IG5ldyBMaXN0PFRleHRFbnRpdHk+KCk7XHJcbiAgICAgICAgTGlzdDxUZXh0QW5pbWF0aW9uPiBhbmltYXRpb25zID0gbmV3IExpc3Q8VGV4dEFuaW1hdGlvbj4oKTtcclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIG1haW5Cb2FyZDtcclxuICAgICAgICBpbnQgbGF0ZXN0SWQgPSAtMTtcclxuXHJcbiAgICAgICAgcHVibGljIFQgQWRkQW5pbWF0aW9uPFQ+KFQgdGEpIHdoZXJlIFQgOiBUZXh0QW5pbWF0aW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhbmltYXRpb25zLkFkZCh0YSk7XHJcbiAgICAgICAgICAgIHRhLlJlZ2lzdGVyTGlzdHMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdChpbnQgd2lkdGgsIGludCBoZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtYWluQm9hcmQgPSBuZXcgVGV4dEJvYXJkKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWFpbkJvYXJkLlJlc2V0KCk7XHJcbiAgICAgICAgICAgIERyYXdDaGlsZHJlbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0NoaWxkcmVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgYWN0aXZlQWdlbnRzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUFnZW50c1tpXS5SZXNldEFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFuaW0gaW4gYW5pbWF0aW9ucylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltLk1vZGlmeShhY3RpdmVBZ2VudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUFnZW50c1tpXS5mcmVlSWZJZGxlICYmICFhY3RpdmVBZ2VudHNbaV0uYW5pbWF0aW5nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZyZWVCb2FyZHMuQWRkKGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlQWdlbnRzLlJlbW92ZShhY3RpdmVBZ2VudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtYWluQm9hcmQuSW5zZXJ0KGFjdGl2ZUFnZW50c1tpXS5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRFbnRpdHkgR2V0RnJlZUVudGl0eShpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0RW50aXR5IHRlO1xyXG4gICAgICAgICAgICBpZiAoZnJlZUJvYXJkcy5Db3VudCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRlID0gZnJlZUJvYXJkc1tmcmVlQm9hcmRzLkNvdW50IC0gMV07XHJcbiAgICAgICAgICAgICAgICBmcmVlQm9hcmRzLlJlbW92ZUF0KGZyZWVCb2FyZHMuQ291bnQgLSAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRlID0gbmV3IFRleHRFbnRpdHkoKTtcclxuICAgICAgICAgICAgICAgIHRlLmlkID0gKytsYXRlc3RJZDtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFjdGl2ZUFnZW50cy5BZGQodGUpO1xyXG4gICAgICAgICAgICB0ZS5mcmVlSWZJZGxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRlLlNldFNpemUodywgaCk7XHJcbiAgICAgICAgICAgIHRlLlJlc2V0RnVsbCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEVudGl0eSBHZXRUZW1wRW50aXR5KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0ZSA9IEdldEZyZWVFbnRpdHkodywgaCk7XHJcbiAgICAgICAgICAgIHRlLmZyZWVJZklkbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZHZhbmNlVGltZShmbG9hdCB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFuaW0gaW4gYW5pbWF0aW9ucylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYW5pbS5VcGRhdGUodik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWFuaW0uSXNEb25lKCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRleHRFbnRpdHlcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IGlkO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgT3JpZ2luO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgQW5pbWF0aW9uO1xyXG4gICAgICAgIHB1YmxpYyBib29sIGZyZWVJZklkbGUgPSBmYWxzZTtcclxuICAgICAgICBpbnRlcm5hbCBib29sIGFuaW1hdGluZztcclxuXHJcbiAgICAgICAgcHVibGljIGludCBIZWlnaHQgeyBnZXQgeyByZXR1cm4gT3JpZ2luLkhlaWdodDsgfSB9XHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aCB7IGdldCB7IHJldHVybiBPcmlnaW4uV2lkdGg7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEFuaW1hdGlvbi5CYXNlRGF0YSBBbmltQmFzZShmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRleHRBbmltYXRpb24uQmFzZURhdGEobGVuZ3RoLCAwLCBpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBWZWN0b3IyRCBHZXRQb3NpdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gT3JpZ2luLlBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldEFuaW1hdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgQW5pbWF0aW9uLlNldChPcmlnaW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldEZ1bGwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3JpZ2luLlJlc2V0SW52aXNpYmxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldFBvc2l0aW9uKGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9yaWdpbi5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IyRCh4LHkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRQb3NpdGlvbihWZWN0b3IyRCB2ZWN0b3IyRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9yaWdpbi5Qb3NpdGlvbiA9IHZlY3RvcjJEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRTaXplKGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChPcmlnaW4gPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgT3JpZ2luID0gbmV3IFRleHRCb2FyZCh3LCBoKTtcclxuICAgICAgICAgICAgICAgIEFuaW1hdGlvbiA9IG5ldyBUZXh0Qm9hcmQodywgaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT3JpZ2luLlJlc2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgQW5pbWF0aW9uLlJlc2l6ZSh3LCBoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBEZWxheXNBbmltYXRpb24gOiBUZXh0QW5pbWF0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIERlbGF5KGZsb2F0IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGQobmV3IEJhc2VEYXRhKHYsIDAsIC0xKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUG9zaXRpb25BbmltYXRpb24gOiBUZXh0QW5pbWF0aW9uPFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YT5cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBQb3NpdGlvbkRhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkIHRhcmdldCA9IGVudGl0eS5BbmltYXRpb247XHJcbiAgICAgICAgICAgIGlmIChtYWluRGF0YS5wZXJtYW5lbnQpXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBlbnRpdHkuT3JpZ2luO1xyXG4gICAgICAgICAgICB0YXJnZXQuUG9zaXRpb24gPSBWZWN0b3IyRC5JbnRlcnBvbGF0ZVJvdW5kZWQobWFpbkRhdGEuc3RhcnRQb3NpdGlvbiwgbWFpbkRhdGEuZW5kUG9zaXRpb24sIHByb2dyZXNzIC8gbGVuZ3RoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IFBvc2l0aW9uRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvb2wgcGVybWFuZW50O1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb247XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgUG9zaXRpb25EYXRhKFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIFZlY3RvcjJEIGVuZFBvc2l0aW9uLCBib29sIHBlcm0gPSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVybWFuZW50ID0gcGVybTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVGV4dEFuaW1hdGlvbjxUPiA6IFRleHRBbmltYXRpb25cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgTGlzdDxUPiBtYWluRGF0YSA9IG5ldyBMaXN0PFQ+KCk7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5SZWdpc3Rlckxpc3QobWFpbkRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKEJhc2VEYXRhIGJhc2VEYXRhLCBUIG1haW5EKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5BZGQoYmFzZURhdGEpO1xyXG4gICAgICAgICAgICBtYWluRGF0YS5BZGQobWFpbkQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBpbnQgaW5kZXgsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBNb2RpZnkoZW50aXR5LCBtYWluRGF0YVtpbmRleF0sIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIFQgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbnRlcm5hbCBvdmVycmlkZSB2b2lkIEV4ZWN1dGUoaW50IGluZGV4LCBCYXNlRGF0YSBiYXNlRGF0YSlcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICB0aGlzLkV4ZWN1dGUobWFpbkRhdGFbaW5kZXhdLCBiYXNlRGF0YSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vcHVibGljIGFic3RyYWN0IHZvaWQgRXhlY3V0ZShUIG1haW5EYXRhLCBCYXNlRGF0YSBiYXNlRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFRleHRBbmltYXRpb25cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBCYXNlRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGxlbmd0aDtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IHByb2dyZXNzO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHRhcmdldDtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBCYXNlRGF0YShmbG9hdCBsZW5ndGgsIGZsb2F0IHByb2dyZXNzLCBpbnQgdGFyZ2V0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzcztcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IGxlbmd0aCA9IG5ldyBMaXN0PGZsb2F0PigpO1xyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IHByb2dyZXNzID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxpbnQ+IHRhcmdldHMgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgTGlzdDxJTGlzdD4gbGlzdHMgPSBuZXcgTGlzdDxJTGlzdD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJMaXN0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQobGVuZ3RoKTtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKHByb2dyZXNzKTtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKHRhcmdldHMpO1xyXG4gICAgICAgICAgICBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IHZvaWQgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcm9ncmVzcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1tpXSArPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc1tpXSA+PSBsZW5ndGhbaV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5kVGFzayhpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0V4ZWN1dGUoaSwgbmV3IEJhc2VEYXRhKGxlbmd0aFtpXSxwcm9ncmVzc1tpXSwgdGFyZ2V0c1tpXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2ludGVybmFsIGFic3RyYWN0IHZvaWQgRXhlY3V0ZShpbnQgaW5kZXgsIEJhc2VEYXRhIGJhc2VEYXRhKTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGQoQmFzZURhdGEgYmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm9ncmVzcy5BZGQoYmQucHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICB0YXJnZXRzLkFkZChiZC50YXJnZXQpO1xyXG4gICAgICAgICAgICBsZW5ndGguQWRkKGJkLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0RvbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbGlzdHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLkNvdW50ICE9IHByb2dyZXNzLkNvdW50KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBzLlRyaW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZ3Jlc3MuQ291bnQgPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRW5kVGFzayhpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBsIGluIGxpc3RzKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbC5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZWdpc3Rlckxpc3QoSUxpc3QgbWFpbkRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQobWFpbkRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcm9ncmVzcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYS5pZCA9PSB0YXJnZXRzW2ldKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE1vZGlmeShhLCBpLCBwcm9ncmVzc1tpXSwgbGVuZ3RoW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBhLmFuaW1hdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBpbnQgaW5kZXgsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUGFsZXR0ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmdbXSBIdG1sQ29sb3JzO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUocGFyYW1zIHN0cmluZ1tdIGNvbG9ycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEh0bWxDb2xvcnMgPSBjb2xvcnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBEZWZhdWx0UGFsZXR0ZXNcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBhbGV0dGUgQzRLaXJvS2F6ZSA9IG5ldyBQYWxldHRlKFwiIzMzMmM1MFwiLCBcIiM0Njg3OGZcIiwgXCIjOTRlMzQ0XCIsIFwiI2UyZjNlNFwiKTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBhbGV0dGUgQzRSZWFkZXIgPSBuZXcgUGFsZXR0ZShcIiMyNjI2MjZcIiwgXCIjOGI4Y2JhXCIsIFwiIzhiYmE5MVwiLCBcIiM2NDlmOGRcIik7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQYWxldHRlIEM0Tm92ZWwgPSBuZXcgUGFsZXR0ZShcIiMyNjI2MjZcIiwgXCIjMzQyZDQxXCIsIFwiI2I4YjhiOFwiLCBcIiM4YjhjYmFcIik7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBDNEJsYWNrID0gMDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0QmxhY2tOZXV0cmFsID0gMTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0V2hpdGVOZXV0cmFsID0gMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0V2hpdGUgPSAzO1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nLkdhbWVTY3JlZW5cclxue1xyXG4gICAgcHVibGljIHN0cnVjdCBNb3VzZUhvdmVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFJlY3QgcmVjdDtcclxuICAgICAgICBwdWJsaWMgaW50IHR5cGU7XHJcbiAgICAgICAgcHVibGljIGludCBpZDtcclxuXHJcbiAgICAgICAgcHVibGljIE1vdXNlSG92ZXIoUmVjdCByZWN0LCBpbnQgdHlwZSwgaW50IGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZWN0ID0gcmVjdDtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTW91c2VIb3Zlck1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxNb3VzZUhvdmVyPiBtb3VzZUhvdmVycyA9IG5ldyBMaXN0PE1vdXNlSG92ZXI+KCk7XHJcbiAgICAgICAgcHVibGljIExpc3Q8TW91c2VIb3Zlcj4gbW91c2VIb3ZlcnNBY3RpdmUgPSBuZXcgTGlzdDxNb3VzZUhvdmVyPigpO1xyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIG1vdXNlSU87XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUhvdmVyTWFuYWdlcihNb3VzZUlPIG1vdXNlSU8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlSU8gPSBtb3VzZUlPO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdXNlSG92ZXJzQWN0aXZlLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIG1vdXNlSG92ZXJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5yZWN0LkNvbnRhaW5zKG1vdXNlSU8ucG9zKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZUhvdmVyc0FjdGl2ZS5BZGQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRCb2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIE5PQ0hBTkdFQ0hBUiA9IChjaGFyKTE7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgSU5WSVNJQkxFQ0hBUiA9IChjaGFyKTI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBOT0NIQU5HRUNPTE9SID0gLTI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBJTlZJU0lCTEVDT0xPUiA9IC0xO1xyXG4gICAgICAgIGNoYXJbLF0gY2hhcnM7XHJcbiAgICAgICAgcHVibGljIGludFssXSBUZXh0Q29sb3IgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludFssXSBCYWNrQ29sb3IgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgLy9TdHJpbmdCdWlsZGVyIHN0cmluZ0J1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgIGludCBjdXJzb3JYID0gMDtcclxuICAgICAgICBpbnQgY3Vyc29yWSA9IDA7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEIFBvc2l0aW9uIHsgZ2V0OyBzZXQ7IH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9TZXRNYXhTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBSZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25DZW50ZXIoc3RyaW5nIG1lc3NhZ2UsIGludCBjb2xvciwgaW50IHhPZmYgPSAwLCBpbnQgeU9mZiA9IDAsIGJvb2wgYWxpZ25TdHJpbmcgPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHggPSAoV2lkdGgpIC8gMjtcclxuICAgICAgICAgICAgaWYgKGFsaWduU3RyaW5nKSB4IC09IG1lc3NhZ2UuTGVuZ3RoIC8gMjtcclxuICAgICAgICAgICAgaW50IHkgPSBIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBEcmF3KG1lc3NhZ2UsIHggKyB4T2ZmLCB5ICsgeU9mZiwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBTZXRNYXhTaXplKGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoYXJzID0gbmV3IGNoYXJbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgICAgIFRleHRDb2xvciA9IG5ldyBpbnRbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgICAgIEJhY2tDb2xvciA9IG5ldyBpbnRbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoJyAnLCAwLCAwLCBXaWR0aCwgSGVpZ2h0LCAwLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0SW52aXNpYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChJTlZJU0lCTEVDSEFSLCAwLCAwLCBXaWR0aCwgSGVpZ2h0LCBJTlZJU0lCTEVDT0xPUiwgSU5WSVNJQkxFQ09MT1IpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgV2lkdGggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluc2VydChUZXh0Qm9hcmQgc2Vjb25kQm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHNlY29uZEJvYXJkLldpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgc2Vjb25kQm9hcmQuSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHggPSAoaW50KXNlY29uZEJvYXJkLlBvc2l0aW9uLlggKyBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB5ID0gKGludClzZWNvbmRCb2FyZC5Qb3NpdGlvbi5ZICsgajtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4ID49IFdpZHRoIHx8IHkgPj0gSGVpZ2h0KSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuY2hhcnNbaSwgal0gIT0gSU5WSVNJQkxFQ0hBUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbeCwgeV0gPSBzZWNvbmRCb2FyZC5jaGFyc1tpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuVGV4dENvbG9yW2ksIGpdICE9IElOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Q29sb3JbeCwgeV0gPSBzZWNvbmRCb2FyZC5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZEJvYXJkLkJhY2tDb2xvcltpLCBqXSAhPSBJTlZJU0lCTEVDT0xPUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmFja0NvbG9yW3gsIHldID0gc2Vjb25kQm9hcmQuQmFja0NvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IEN1cnNvclhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBjdXJzb3JYOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JYID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGludCBDdXJzb3JZIHsgZ2V0IHsgcmV0dXJuIGN1cnNvclk7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd09uZURpZ2l0KGludCBpLCBpbnQgeCwgaW50IHksIGludCBjb2xvciA9IE5PQ0hBTkdFQ09MT1IsIGludCBiYWNrZ3JvdW5kID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoYXIgYyA9IChjaGFyKShpICsgJzAnKTtcclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgeCwgeSwgY29sb3IsIGJhY2tncm91bmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1R3b0RpZ2l0cyhpbnQgaSwgaW50IHgsIGludCB5LCBpbnQgY29sb3IgPSBOT0NIQU5HRUNPTE9SLCBpbnQgYmFja2dyb3VuZCA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3T25lRGlnaXQoaS8xMCx4LHksY29sb3IsYmFja2dyb3VuZCk7XHJcbiAgICAgICAgICAgIERyYXdPbmVEaWdpdChpICUxMCwgeCsxLCB5LCBjb2xvciwgYmFja2dyb3VuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIFNhbWVBcyhUZXh0Qm9hcmQgdGV4dEJvYXJkLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGFyc1t4LCB5XSA9PSB0ZXh0Qm9hcmQuY2hhcnNbeCwgeV1cclxuICAgICAgICAgICAgICAgICYmIHRoaXMuQmFja0NvbG9yW3gseV0gPT0gdGV4dEJvYXJkLkJhY2tDb2xvclt4LHldXHJcbiAgICAgICAgICAgICAgICAmJiB0aGlzLlRleHRDb2xvclt4LHldID09IHRleHRCb2FyZC5UZXh0Q29sb3JbeCx5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQ29weShUZXh0Qm9hcmQgdGV4dEJvYXJkLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJzW3gsIHldID0gdGV4dEJvYXJkLmNoYXJzW3gsIHldO1xyXG4gICAgICAgICAgICB0aGlzLlRleHRDb2xvclt4LCB5XSA9IHRleHRCb2FyZC5UZXh0Q29sb3JbeCwgeV07XHJcbiAgICAgICAgICAgIHRoaXMuQmFja0NvbG9yW3gsIHldID0gdGV4dEJvYXJkLkJhY2tDb2xvclt4LCB5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRHJhd19DdXJzb3JfVW5pY29kZUxhYmVsKGludCB2LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbGVuID0gRHJhd1VuaWNvZGVMYWJlbCh2LCBjdXJzb3JYLCBjdXJzb3JZLCBjb2xvcik7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbGVuOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEFkdmFuY2VDdXJzb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGludCBEcmF3VW5pY29kZUxhYmVsKGludCB1bmljb2RlLCBpbnQgeCwgaW50IHksIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh1bmljb2RlID49ICdhJyAmJiB1bmljb2RlIDw9ICd6Jykge1xyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIoKGNoYXIpKHVuaWNvZGUgKyAnQScgLSAnYScpLCB4LCB5LCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodW5pY29kZSA+PSAnMCcgJiYgdW5pY29kZSA8PSAnOScpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKChjaGFyKSh1bmljb2RlKSwgeCwgeSwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RyaW5nIGxhYmVsID0gXCJcIjtcclxuICAgICAgICAgICAgaWYgKHVuaWNvZGUgPT0gMzIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsID0gXCJTUEFDRVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIERyYXcobGFiZWwsIHgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsLkxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0KFRleHRCb2FyZCBvcmlnaW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBvc2l0aW9uID0gb3JpZ2luLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFdpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyc1tpLCBqXSA9IG9yaWdpbi5jaGFyc1tpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkJhY2tDb2xvcltpLCBqXSA9IG9yaWdpbi5CYWNrQ29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UZXh0Q29sb3JbaSwgal0gPSBvcmlnaW4uVGV4dENvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2l6ZShpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY2hhcnMgPT0gbnVsbCB8fCB3ID4gY2hhcnMuR2V0TGVuZ3RoKDApIHx8IGggPiBjaGFycy5HZXRMZW5ndGgoMSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNldE1heFNpemUodywgaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgV2lkdGggPSB3O1xyXG4gICAgICAgICAgICBIZWlnaHQgPSBoO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjaGFyIENoYXJBdChpbnQgaSwgaW50IGopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gY2hhcnNbaSwgal07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRDdXJzb3JBdChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdXJzb3JYID0geDtcclxuICAgICAgICAgICAgY3Vyc29yWSA9IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihzdHJpbmcgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjIGluIHYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdfQ3Vyc29yKGMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihzdHJpbmcgdiwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gdilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IoYywgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIENhbkRyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGN1cnJlbnRYID0gY3Vyc29yWDtcclxuICAgICAgICAgICAgaW50IGN1cnJlbnRZID0gY3Vyc29yWTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdi5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYm9vbCBsaW5lQnJlYWsgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJvb2wgc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzID0gKGkgPT0gMCB8fCB2W2ldID09ICcgJykgJiYgaSAhPSB2Lkxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAxOyBqIDwgdi5MZW5ndGggLSBpOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiArIGN1cnJlbnRYID49IFdpZHRoKSAvL3JlYWNoIGVuZCBvZiB0aGUgbGluZSB3aXRob3V0IGVuZGluZyB0aGUgd29yZCwgc2hvdWxkIGxpbmUgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaV0gPT0gJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKzsgLy9za2lwIHRocm91Z2ggdGhlIHNwYWNlIGlmIGl0J3MgYSBuZXcgbGluZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUJyZWFrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2W2kgKyBqXSA9PSAnICcpIC8vbmV3IHdvcmQgYmVnaW5zIHNvIG5vIG5lZWQgdG8gbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsaW5lQnJlYWspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFkrKztcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50WCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRYID49IFdpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRZKys7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRYID49IFdpZHRoIHx8IGN1cnJlbnRZID49IEhlaWdodCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEcmF3Q3Vyc29yUmVzdWx0IERyYXdfQ3Vyc29yX1NtYXJ0TGluZUJyZWFrKHN0cmluZyB2LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgb2ZmU3RhcnQgPSAwO1xyXG4gICAgICAgICAgICBpbnQgb2ZmRW5kID0gdi5MZW5ndGggLSAxO1xyXG4gICAgICAgICAgICByZXR1cm4gRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsodiwgY29sb3IsIG9mZlN0YXJ0LCBvZmZFbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERyYXdDdXJzb3JSZXN1bHQgRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYsIGludCBjb2xvciwgaW50IG9mZlN0YXJ0LCBpbnQgb2ZmRW5kKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFZlY3RvcjJEIHN0YXJ0ID0gbmV3IFZlY3RvcjJEKEN1cnNvclgsIEN1cnNvclkpO1xyXG4gICAgICAgICAgICBpbnQgZW5kSW5kZXggPSBvZmZFbmQgKyAxO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gb2ZmU3RhcnQ7IGkgPCBlbmRJbmRleDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgb3JpZ2luWCA9IGN1cnNvclg7XHJcbiAgICAgICAgICAgICAgICBib29sIGxpbmVCcmVhayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBzaG91bGRDaGVja0ZvckxpbmVCcmVha3MgPSAoaSA9PSAwIHx8IHZbaV0gPT0gJyAnKSAmJiBpICE9IGVuZEluZGV4IC0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChzaG91bGRDaGVja0ZvckxpbmVCcmVha3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDE7IGogPCBlbmRJbmRleCAtIGk7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqICsgb3JpZ2luWCA+PSBXaWR0aCkgLy9yZWFjaCBlbmQgb2YgdGhlIGxpbmUgd2l0aG91dCBlbmRpbmcgdGhlIHdvcmQsIHNob3VsZCBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2W2ldID09ICcgJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7IC8vc2tpcCB0aHJvdWdoIHRoZSBzcGFjZSBpZiBpdCdzIGEgbmV3IGxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVCcmVhayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpICsgal0gPT0gJyAnKSAvL25ldyB3b3JkIGJlZ2lucyBzbyBubyBuZWVkIHRvIGxpbmUgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZUJyZWFrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEN1cnNvck5ld0xpbmUoMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBEcmF3X0N1cnNvcih2W2ldLCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVmVjdG9yMkQgZW5kID0gbmV3IFZlY3RvcjJEKEN1cnNvclgsIEN1cnNvclkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IERyYXdDdXJzb3JSZXN1bHQoUG9zaXRpb25Ub0luZGV4KHN0YXJ0KSwgUG9zaXRpb25Ub0luZGV4KGVuZCksIHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgUG9zaXRpb25Ub0luZGV4KFZlY3RvcjJEIHN0YXJ0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpKHN0YXJ0LlggKyBzdGFydC5ZICogV2lkdGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd09uZURpZ2l0X0N1cnNvcihpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdfQ3Vyc29yKChjaGFyKShpICsgJzAnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihjaGFyIGMpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgY3Vyc29yWCwgY3Vyc29yWSk7XHJcbiAgICAgICAgICAgIEFkdmFuY2VDdXJzb3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKGNoYXIgYywgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIERyYXdDaGFyKGMsIGN1cnNvclgsIGN1cnNvclksIGNvbG9yKTtcclxuICAgICAgICAgICAgQWR2YW5jZUN1cnNvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWR2YW5jZUN1cnNvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdXJzb3JYKys7XHJcbiAgICAgICAgICAgIGlmIChjdXJzb3JYID49IFdpZHRoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JYID0gMDtcclxuICAgICAgICAgICAgICAgIGN1cnNvclkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQ3Vyc29yTmV3TGluZShpbnQgeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclkrKztcclxuICAgICAgICAgICAgY3Vyc29yWCA9IHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hhcihjaGFyIHYsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodiAhPSBOT0NIQU5HRUNIQVIpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJzW3gsIHldID0gdjtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0NoYXIoY2hhciB2LCBpbnQgeCwgaW50IHksIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIodiwgeCwgeSk7XHJcbiAgICAgICAgICAgIFNldENvbG9yKGNvbG9yLCB4LCB5KTtcclxuICAgICAgICAgICAgU2V0QmFja0NvbG9yKGJhY2tDb2xvciwgeCwgeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldEFsbChjaGFyIHRleHQsIGludCB0ZXh0Q29sb3IgPSBOT0NIQU5HRUNPTE9SLCBpbnQgYmFja0NvbG9yPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKHRleHQsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIHRleHRDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdXaXRoR3JpZChzdHJpbmcgdGV4dCwgaW50IHgsIGludCB5LCBpbnQgZ3JpZENvbG9yLCBpbnQgdGV4dENvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHdpZHRoID0gdGV4dC5MZW5ndGg7XHJcbiAgICAgICAgICAgIERyYXdHcmlkKHgsIHksIHdpZHRoICsgMiwgMywgZ3JpZENvbG9yKTtcclxuICAgICAgICAgICAgRHJhdyh0ZXh0LCB4ICsgMSwgeSArIDEsIHRleHRDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KHN0cmluZyB2LCBpbnQgeCwgaW50IHksIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHYuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCB4MiA9IHggKyBpO1xyXG4gICAgICAgICAgICAgICAgaW50IHkyID0geTtcclxuICAgICAgICAgICAgICAgIGlmKHgyID49IFdpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHgyIC09IFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHkyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhcih2W2ldLCB4MiwgeTIsIGNvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3V2l0aExpbmVicmVha3Moc3RyaW5nIHYsIGludCB4LCBpbnQgeSwgaW50IG5ld2xpbmVYLCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGxpbmVicmVha3MgPSAwO1xyXG4gICAgICAgICAgICBpbnQgeE9mZnNldG5ld2xpbmVzID0gMDtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB2Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgeDIgPSB4ICsgaSsgeE9mZnNldG5ld2xpbmVzO1xyXG4gICAgICAgICAgICAgICAgaW50IHkyID0geTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHgyID49IFdpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHgyIC09IFdpZHRoK25ld2xpbmVYO1xyXG4gICAgICAgICAgICAgICAgICAgIHkyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhcih2W2ldLCB4MiwgeTIrbGluZWJyZWFrcywgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBpZiAodltpXSA9PSAnXFxuJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lYnJlYWtzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgeE9mZnNldG5ld2xpbmVzICs9IG5ld2xpbmVYIC0geDItMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoSUVudW1lcmFibGU8Y2hhcj4gdiwgaW50IHgsIGludCB5LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkNvdW50PGNoYXI+KHYpOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdDaGFyKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRWxlbWVudEF0PGNoYXI+KHYsaSksIHggKyBpLCB5LCBjb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0dyaWQoaW50IHgsIGludCB5LCBpbnQgd2lkdGgsIGludCBoZWlnaHQsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoKGNoYXIpMTc5LCB4LCB5LCAxLCBoZWlnaHQsIGNvbG9yKTtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKChjaGFyKTE3OSwgeCArIHdpZHRoIC0gMSwgeSwgMSwgaGVpZ2h0LCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgoY2hhcikxOTYsIHgsIHksIHdpZHRoLCAxLCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgoY2hhcikxOTYsIHgsIHkgKyBoZWlnaHQgLSAxLCB3aWR0aCwgMSwgY29sb3IpO1xyXG5cclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKChjaGFyKTIxOCwgeCwgeSwgMSwgMSwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoKGNoYXIpMTkyLCB4LCAgICAgICAgICAgICAgeStoZWlnaHQtMSwgMSwgMSwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoKGNoYXIpMjE3LCB4K3dpZHRoLTEsICAgICAgeSsgaGVpZ2h0IC0gMSwgMSwgMSwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoKGNoYXIpMTkxLCB4ICsgd2lkdGggLSAxLCAgeSwgMSwgMSwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1JlcGVhdGVkKGNoYXIgYywgaW50IHgsIGludCB5LCBpbnQgd2lkdGgsIGludCBoZWlnaHQsIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0geDsgaSA8IHggKyB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0geTsgaiA8IHkgKyBoZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBEcmF3Q2hhcihjLCBpLCBqLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFNldEJhY2tDb2xvcihiYWNrQ29sb3IsIGksIGopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRDb2xvcihpbnQgY29sb3IsIGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb2xvciAhPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgVGV4dENvbG9yW3gsIHldID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRCYWNrQ29sb3IoaW50IGNvbG9yLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29sb3IgIT0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQmFja0NvbG9yW3gsIHldID0gY29sb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoc3RyaW5nIHYsIGludCB4MiwgaW50IHkyLCBvYmplY3QgaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdHcmlkKGludCB2MSwgaW50IHYyLCBpbnQgdjMsIGludCB2NCwgb2JqZWN0IGJvYXJkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IERyYXdDdXJzb3JSZXN1bHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgU3RhcnRJbmRleDtcclxuICAgICAgICAgICAgcHVibGljIGludCBFbmRJbmRleDtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIFN0YXJ0UG9zaXRpb247XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBFbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBEcmF3Q3Vyc29yUmVzdWx0KGludCBzdGFydEluZGV4LCBpbnQgZW5kSW5kZXgsIFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIFZlY3RvcjJEIGVuZFBvc2l0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTdGFydEluZGV4ID0gc3RhcnRJbmRleDtcclxuICAgICAgICAgICAgICAgIEVuZEluZGV4ID0gZW5kSW5kZXg7XHJcbiAgICAgICAgICAgICAgICBTdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIEVuZFBvc2l0aW9uID0gZW5kUG9zaXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0U2NyZWVuTiA6IElUZXh0U2NyZWVuLCBJTW91c2VJbnB1dCwgSUtleWJvYXJkSW5wdXRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVGV4dFdvcmxkIFRleHRXb3JsZDtcclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBVcGRhdGUoZmxvYXQgZikgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0U2NyZWVuTigpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRTY3JlZW5OKFRleHRXb3JsZCB0ZXh0V29ybGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0V29ybGQgPSB0ZXh0V29ybGQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgIHZvaWQgSW5pdChpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0V29ybGQgPSBuZXcgVGV4dFdvcmxkKCk7XHJcbiAgICAgICAgICAgIFRleHRXb3JsZC5Jbml0KHcsIGgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRleHRXb3JsZC5tYWluQm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE1vdXNlRXZlbnQoTW91c2VFdmVudHMgbW91c2VEb3duLCBpbnQgdjEsIGludCB2MilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIGludCBJbnB1dEFzTnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIElucHV0VW5pY29kZSAtIDQ4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSVRleHRTY3JlZW5cclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBUZXh0Qm9hcmQgR2V0Qm9hcmQoKTtcclxuICAgICAgICBcclxuICAgICAgICB2b2lkIFVwZGF0ZShmbG9hdCBmKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW50ZXJmYWNlIElNb3VzZUlucHV0XHJcbiAgICB7XHJcbiAgICAgICAgdm9pZCBNb3VzZUV2ZW50KE1vdXNlRXZlbnRzIGV2ZW50VHlwZSwgaW50IHYxLCBpbnQgdjIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSUtleWJvYXJkSW5wdXRcclxuICAgIHtcclxuICAgICAgICBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gTW91c2VFdmVudHNcclxuICAgIHsgXHJcbiAgICAgICAgTW91c2VEb3duLFxyXG4gICAgICAgIE5vbmVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFNjcmVlbkhvbGRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBJVGV4dFNjcmVlbiBTY3JlZW4geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBJTW91c2VJbnB1dCBNb3VzZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIElLZXlib2FyZElucHV0IEtleSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgU2V0QWxsKG9iamVjdCBkbnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTY3JlZW4gPSBkbnMgYXMgSVRleHRTY3JlZW47XHJcbiAgICAgICAgICAgIE1vdXNlID0gZG5zIGFzIElNb3VzZUlucHV0O1xyXG4gICAgICAgICAgICBLZXkgPSBkbnMgYXMgSUtleWJvYXJkSW5wdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcEhhbmRsaW5nXHJcbiAgICB7XHJcbiAgICAgICAgQmF0dGxlUmVuZGVyIGJhdHRsZVJlbmRlcjtcclxuICAgICAgICBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBwdWJsaWMgQWN0aW9uIEhhbmRsZTtcclxuICAgICAgICBMaXN0PEhhcHBIYW5kbGVyPiBoYW5kbGVycyA9IG5ldyBMaXN0PEhhcHBIYW5kbGVyPigpO1xyXG4gICAgICAgIHByaXZhdGUgUXVpY2tBY2Nlc3NvclR3bzxIYXBwVGFncywgVGltZVN0YW1wU25hcD4gaGFwcHM7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCBoaWdoZXN0SGFuZGxlZDtcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBIYW5kbGluZyhCYXR0bGVSZW5kZXIgYmF0dGxlUmVuZGVyLCBCYXR0bGVTZXR1cCBiYXR0bGVTZXR1cClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlUmVuZGVyID0gYmF0dGxlUmVuZGVyO1xyXG4gICAgICAgICAgICB2YXIgd29ybGQgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkO1xyXG4gICAgICAgICAgICB2YXIgcG9zQW5pbSA9IHdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLlBvc2l0aW9uQW5pbWF0aW9uPihuZXcgUG9zaXRpb25BbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHZhciBibGlua0FuaW0gPSB3b3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5CbGlua0FuaW0+KG5ldyBCbGlua0FuaW0oKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gYmF0dGxlU2V0dXAuZWNzO1xyXG4gICAgICAgICAgICB2YXIgYmF0dGxlTWFpbiA9IGJhdHRsZVNldHVwLmJhdHRsZU1haW47XHJcbiAgICAgICAgICAgIHZhciB0aW1lID0gYmF0dGxlU2V0dXAudGltZVN0YW1wO1xyXG4gICAgICAgICAgICBiYXR0bGVSZW5kZXIuSGFwcEhhbmRsaW5nID0gdGhpcztcclxuICAgICAgICAgICAgaGFwcHMgPSBlY3MuUXVpY2tBY2Nlc3NvcjI8SGFwcFRhZ3MsIFRpbWVTdGFtcFNuYXA+KCk7XHJcbiAgICAgICAgICAgIGhpZ2hlc3RIYW5kbGVkID0gLTE7XHJcblxyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQobmV3IEhhcHBIYW5kbGVyKChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGFtYWdlID0gZS5HZXRDb21wb25lbnQ8SGFwcERhbWFnZURhdGE+KCk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIGlmIChkYW1hZ2UuZWxlbWVudGFsQmxvY2spXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGRhbWFnZS5kYW1hZ2VFICsgXCIgYWJzb3JicyBcIiArIGRhbWFnZS50YXJnZXRFK1wiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSArPSBiYXR0bGVSZW5kZXIuR2V0RW50aXR5TmFtZShkYW1hZ2UudGFyZ2V0KStcIiBpcyB1bmFmZWN0dGVkLlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZSA9IGJhdHRsZVJlbmRlci5HZXRFbnRpdHlOYW1lKGRhbWFnZS50YXJnZXQpICsgXCIgZ2V0cyBoaXQhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhbWFnZS5zdXBlckVmZmVjdGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBkYW1hZ2UuZGFtYWdlRSArIFwiIHJhdmFnZXMgXCIgKyBkYW1hZ2UudGFyZ2V0RSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gYmF0dGxlUmVuZGVyLkdldEVudGl0eU5hbWUoZGFtYWdlLnRhcmdldCkrXCIgdGFrZXMgYSBoZWF2eSBoaXQhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihiYXR0bGVNYWluLmVudGl0aWVzW2RhbWFnZS50YXJnZXRdLnBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmxhc3QgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoNSwgNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibGFzdC5TZXRQb3NpdGlvbihwb3MgKyBuZXcgVmVjdG9yMkQoLTIsIC0yKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxhc3QuT3JpZ2luLkRyYXdSZXBlYXRlZCgnICcsIDEsIDEsIDMsIDMsIFRleHRCb2FyZC5JTlZJU0lCTEVDT0xPUiwgQmF0dGxlUmVuZGVyLkNvbG9ycy5FbmVteSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKGJsYXN0LkFuaW1CYXNlKDAuMmYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGRhbWFnZS5kYW1hZ2VFKSwgMC4wNWYpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21lc3NhZ2UgPSBiYXR0bGVSZW5kZXIuR2V0RW50aXR5TmFtZShkYW1hZ2UudGFyZ2V0KSArIFwiIGdldHMgaHVydFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBpZihtZXNzYWdlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlUmVuZGVyLlNob3dNZXNzYWdlKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkZWZlbmRlciA9IGJhdHRsZVJlbmRlci5iYXR0bGVyUmVuZGVyc1tkYW1hZ2UudGFyZ2V0XTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBmZSA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eShkZWZlbmRlci5XaWR0aCwgZGVmZW5kZXIuSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGlmICghZGFtYWdlLnN1cGVyRWZmZWN0aXZlICYmICFkYW1hZ2UuZWxlbWVudGFsQmxvY2sgJiYgYmF0dGxlTWFpbi5lbnRpdGllc1tkYW1hZ2UudGFyZ2V0XS5BbGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmZSA9IGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0VGVtcEVudGl0eSgzLCAzKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmFja0NvbG9yID0gQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja0NvbG9yID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeENvbG9yID0gQmF0dGxlUmVuZGVyLkVsZW1lbnRUb1Byb2pDb2xvcihkYW1hZ2UuZGFtYWdlRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhciBkYW1hZ2VDaGFyID0gJ1gnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihkYW1hZ2VDaGFyLCAxLCAwLCB4Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKGRhbWFnZUNoYXIsIDEsIDEsIHhDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoZGFtYWdlQ2hhciwgMSwgMiwgeENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihkYW1hZ2VDaGFyLCAwLCAxLCB4Q29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmUuT3JpZ2luLkRyYXdDaGFyKGRhbWFnZUNoYXIsIDIsIDEsIHhDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2ZlLk9yaWdpbi5EcmF3Q2hhcihUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCAwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBmZS5PcmlnaW4uUG9zaXRpb24gPSBkZWZlbmRlci5HZXRQb3NpdGlvbigpICsgbmV3IFZlY3RvcjJEKC0xLCAtMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoZmUuQW5pbUJhc2UoMC4zNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkNoYXIoJ1onLCAwLjA1ZikpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYmxpbmtBbmltLkFkZChmZS5BbmltQmFzZSgwLjM1ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQmFja0NvbG9yKEJhdHRsZVJlbmRlci5Db2xvcnMuSGVybywgMC4wNWYpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiQ0hBTkdFIEVMRVwiKTtcclxuXHJcbiAgICAgICAgICAgIH0sIE1pc2NIYXBwVGFncy5EYW1hZ2UpKTtcclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKG5ldyBIYXBwSGFuZGxlcigoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZCA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlRGF0YT4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBiYXR0bGVSZW5kZXIuU2hvd0JhdHRsZU1lc3NhZ2UoYmF0dGxlUmVuZGVyLkdldEVudGl0eU5hbWUoaG1kLnVzZXIpICsgXCIgaXMgZW1pdHRpbmcgXCIgKyBobWQuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJDSEFOR0UgRUxFXCIpO1xyXG5cclxuICAgICAgICAgICAgfSwgTWlzY0hhcHBUYWdzLkNoYW5nZUVsZW1lbnQpKTtcclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKG5ldyBIYXBwSGFuZGxlcigoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZCA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlRGF0YT4oKTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIGRlZmVuZGVyID0gYmF0dGxlUmVuZGVyLmJhdHRsZXJSZW5kZXJzW2htZC50YXJnZXRdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGJhdHRsZU1haW4uZW50aXRpZXNbaG1kLnVzZXJdLnBvcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmxhc3QgPSBiYXR0bGVSZW5kZXIudGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoMywzKTtcclxuICAgICAgICAgICAgICAgIGJsYXN0LlNldFBvc2l0aW9uKHBvcysgbmV3IFZlY3RvcjJEKC0xLC0xKSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGJsYXN0Lk9yaWdpbi5EcmF3UmVwZWF0ZWQoJyAnLDEsMSwgMSwxLCBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1IsIEJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChibGFzdC5BbmltQmFzZSgwLjJmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5CYWNrQ29sb3IoQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvLCAwLjA1ZikpO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiQ0hBTkdFIEVMRVwiKTtcclxuXHJcbiAgICAgICAgICAgIH0sIE1pc2NIYXBwVGFncy5EZWF0aCkpO1xyXG4gICAgICAgICAgICBBY3Rpb248RW50aXR5PiBtb3ZlTWlzcyA9IChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFITNcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG1kID0gZS5HZXRDb21wb25lbnQ8SGFwcE1vdmVEYXRhPigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZiA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlbWVudEZhaWw+KCk7XHJcbiAgICAgICAgICAgICAgICBpbnQgZUlkID0gaG1kLnVzZXI7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW92ZXIgPSBiYXR0bGVNYWluLmVudGl0aWVzW2VJZF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IG1vdmVyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvczIgPSBobWYubW92ZVRvO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvc0YgPSAocG9zICsgcG9zMikgLyAyO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBmZSA9IGJhdHRsZVJlbmRlci5iYXR0bGVyUmVuZGVyc1tlSWRdO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIk1vdmUgZmFpbFwiKTtcclxuICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKDAuMmYpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKG1vdmVyLlBvc2l0aW9uVjJEKSxcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3NGKSkpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQobmV3IEhhcHBIYW5kbGVyKG1vdmVNaXNzLCBNb3ZlRGF0YVRhZ3MuTW92ZW1lbnQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChuZXcgSGFwcEhhbmRsZXIoKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBoYSA9IGUuR2V0Q29tcG9uZW50PEhhcHBBcmVhPigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZCA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlRGF0YT4oKTtcclxuICAgICAgICAgICAgICAgIGludCBlSWQgPSBobWQudXNlcjtcclxuICAgICAgICAgICAgICAgIHZhciBtb3ZlciA9IGJhdHRsZU1haW4uZW50aXRpZXNbZUlkXTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIHVzZXJSZW5kZXIgPSBiYXR0bGVSZW5kZXIuYmF0dGxlckVudGl0aWVzW2VJZF07XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJlYSA9IGhhLmFyZWE7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9pbnRzID0gYXJlYS5wb2ludHM7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHVzZUVmZmVjdCA9IHdvcmxkLkdldFRlbXBFbnRpdHkoMSwgMSk7XHJcbiAgICAgICAgICAgICAgICB1c2VFZmZlY3QuU2V0UG9zaXRpb24oYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24obW92ZXIucG9zKSk7XHJcbiAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQodXNlRWZmZWN0LkFuaW1CYXNlKDAuNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGhtZC5lbGVtZW50KSwgMC4xNWYpKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHBvaW50cylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW50aXR5ID0gd29ybGQuR2V0VGVtcEVudGl0eSgxLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmluYWxQb3MgPSBpdGVtICogbmV3IFZlY3RvcjJEKGhhLm1pcnJvcmluZ1gsIDEpICsgaGEub2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbFBvcy5YIDwgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsUG9zLlkgPCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWxQb3MuWCA+IDUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbFBvcy5ZID4gMikgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKGZpbmFsUG9zLlhJbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShmaW5hbFBvcy5ZSW50KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oZmluYWxQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5TZXRQb3NpdGlvbihwb3MuWEludCwgcG9zLllJbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoZW50aXR5LkFuaW1CYXNlKDAuNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkJhY2tDb2xvcihCYXR0bGVSZW5kZXIuRWxlbWVudFRvUHJvakNvbG9yKGhtZC5lbGVtZW50KSwgMC4xNWYpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgTW92ZURhdGFUYWdzLkJvbWIpKTtcclxuICAgICAgICAgICAgSGFuZGxlID0gKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBTkRMRSFcIik7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCBuZXdIaWdoZXN0SGFuZGxlZCA9IGhpZ2hlc3RIYW5kbGVkO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBoYXBwcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJBRFZcIitiYXR0bGVSZW5kZXIuQ2FuQWR2YW5jZUdyYXBoaWNzKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYmF0dGxlUmVuZGVyLkNhbkFkdmFuY2VHcmFwaGljcygpKSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFncyA9IGhhcHBzLkNvbXAxKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwID4gaGlnaGVzdEhhbmRsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiBoaWdoZXN0SGFuZGxlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmV3SGlnaGVzdEhhbmRsZWQgPSBoYXBwcy5Db21wMihpKS5UaW1lU25hcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SGlnaGVzdEhhbmRsZWQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGhhbiBpbiBoYW5kbGVycylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBTkRMRSF4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbi5DYW5IYW5kbGUodGFncy50YWdzKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwICsgXCIgLSBcIiArIHRpbWUuQ3VycmVudFNuYXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJIQU5ETEUhMlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW4uSGFuZGxlcihoYXBwcy5FbnRpdHkoaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoaGFwcHMuQ29tcDIoaSkuVGltZVNuYXArXCIgLSBcIisgdGltZS5DdXJyZW50U25hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaGlnaGVzdEhhbmRsZWQgPSBuZXdIaWdoZXN0SGFuZGxlZDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgSGFwcEhhbmRsZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludGVybmFsIExpc3Q8aW50PiBuZWNlc3NhcnlUYWdzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBBY3Rpb248RW50aXR5PiBIYW5kbGVyO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEhhcHBIYW5kbGVyKEFjdGlvbjxFbnRpdHk+IGhhbmRsZXIsIHBhcmFtcyBvYmplY3RbXSB0YWdzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdCBpbiB0YWdzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5lY2Vzc2FyeVRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMih0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLkhhbmRsZXIgPSBoYW5kbGVyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnRlcm5hbCBib29sIENhbkhhbmRsZShMaXN0PGludD4gdGFncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbmVjZXNzYXJ5VGFncylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRhZ3MuQ29udGFpbnMoaXRlbSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBoaWdoZXN0SGFuZGxlZCA+PSBoYXBwcy5MZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSW5wdXRIYW5kbGluZ1xyXG4gICAge1xyXG4gICAgICAgIGludFtdIHVuZml4ZWRDb21tYW5kS2V5cyA9IHsnMScsICcyJywnMycsJzQnIH07XHJcbiAgICAgICAgRGljdGlvbmFyeTxJbnB1dCwgaW50PiBmaXhlZE1vdmVCdXR0b25zID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8SW5wdXQsIGludD4oKSwoX28xKT0+e19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLk5vcm1hbFNob3QpLCdnJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSksJ2YnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2UpLCdpJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYiksJ2InKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyQm9tYiksJ3knKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyKSwndCcpO19vMS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVSaWdodCksJ2QnKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXApLCd3Jyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24pLCdzJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQpLCdhJyk7X28xLkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5Eb25lKSxVbmljb2RlLlNwYWNlKTtfbzEuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LlJlZG8pLCdyJyk7cmV0dXJuIF9vMTt9KTtcclxuXHJcbiAgICAgICAgcHVibGljIGludCBHZXRGaXhlZE1vdmVVbmljb2RlKElucHV0IGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoZml4ZWRNb3ZlQnV0dG9ucy5UcnlHZXRWYWx1ZShpbnB1dCwgb3V0IHZhbHVlKSlcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElucHV0IFBpY2tpbmdIYW5kKGludCB1bmljb2RlS2V5LCBJbnB1dEhvbGRlciBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCIgaW5wdXQgKyBcIisoY2hhcil1bmljb2RlS2V5KTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gZml4ZWRNb3ZlQnV0dG9ucylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uVmFsdWUgPT0gdW5pY29kZUtleSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5LZXk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB1bmZpeGVkQ29tbWFuZEtleXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh1bmZpeGVkQ29tbWFuZEtleXNbaV0gPT0gdW5pY29kZUtleSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgdW5maXhlZENvbW1hbmRQb3MgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkyID0gMDsgaTIgPCBpbnB1dC5pbnB1dHMuQ291bnQ7IGkyKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuVGFnSXMoaTIsIElucHV0VGFncy5NT1ZFVU5GSVgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5maXhlZENvbW1hbmRQb3MgPT0gaSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQuaW5wdXRzW2kyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZml4ZWRDb21tYW5kUG9zKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHQoSW5wdXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1vdXNlSG92ZXJUZXh0XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdW10gdGV4dHMgPSBuZXcgc3RyaW5nWzJdW107XHJcbiAgICAgICAgcHVibGljIE1vdXNlSG92ZXJNYW5hZ2VyIGhvdmVyTWFuYWdlcjtcclxuICAgICAgICBwdWJsaWMgVGV4dEVudGl0eSBlbnRpdHk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUhvdmVyVGV4dChNb3VzZUhvdmVyTWFuYWdlciBob3Zlck1hbmFnZXIsIFRleHRFbnRpdHkgZW50aXR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ob3Zlck1hbmFnZXIgPSBob3Zlck1hbmFnZXI7XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gZW50aXR5O1xyXG4gICAgICAgICAgICAvL3RleHRzWzBdID0gbmV3IHN0cmluZ1tFbnVtLkdldFZhbHVlcyh0eXBlb2YoQmF0dGxlTWFpbi5Nb3ZlVHlwZSkpLkxlbmd0aF07XHJcbiAgICAgICAgICAgIHRleHRzWzBdID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgdXBcIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBsZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgZG93blwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIHJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICBcIlNob290cyBmb3J3YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBcIlNob290cyBmaXJlIGZvcndhcmRcIixcclxuICAgICAgICAgICAgICAgIFwiU2hvb3RzIGljZSBmb3J3YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBcIlNob290cyB0aHVuZGVyIGZvcndhcmRcIixcclxuICAgICAgICAgICAgICAgIFwiVGhyb3dzIGljZSBib21iIHRocmVlIHNxdWFyZXMgZm9yd2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJUaHJvd3MgdGh1bmRlciBib21iIHRocmVlIHNxdWFyZXMgZm9yd2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTdW1tb25zIGFub3RoZXIgZW5lbXlcIixcclxuICAgICAgICAgICAgICAgIFwiXCIsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbnRpdHkuUmVzZXRGdWxsKCk7XHJcbiAgICAgICAgICAgIGhvdmVyTWFuYWdlci5VcGRhdGUoKTtcclxuICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IGhvdmVyTWFuYWdlci5tb3VzZUhvdmVyc0FjdGl2ZTtcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZS5Db3VudCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBpZCA9IGFjdGl2ZVswXS5pZDtcclxuICAgICAgICAgICAgICAgIGlmKGlkID49IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHRleHQgPSB0ZXh0c1thY3RpdmVbMF0udHlwZV1baWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5PcmlnaW4uRHJhdyh0ZXh0LCAwLCAwLCAyKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeCA9IGFjdGl2ZVswXS5yZWN0LlggKyAxIC0gdGV4dC5MZW5ndGgvMjtcclxuICAgICAgICAgICAgICAgICAgICBlbnRpdHkuU2V0UG9zaXRpb24oeCwgYWN0aXZlWzBdLnJlY3QuWSArIDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuO1xyXG51c2luZyBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJhdHRsZVJlbmRlciA6IElUZXh0U2NyZWVuX1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgQmF0dGxlTWFpbiB0dXJuQmFzZVRyeTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFN0YWdlRGF0YSBzdGFnZURhdGE7XHJcbiAgICAgICAgcHJpdmF0ZSBQb3NpdGlvbkFuaW1hdGlvbiBwb3NBbmltO1xyXG4gICAgICAgIHByaXZhdGUgQ2hhckJ5Q2hhckFuaW1hdGlvbiBjaGFyQnlDaGFyQW5pbTtcclxuICAgICAgICBwcml2YXRlIERlbGF5c0FuaW1hdGlvbiBkZWxheUFuaW07XHJcbiAgICAgICAgcHVibGljIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgVGV4dEJvYXJkIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBpbnQgaW5wdXQ7XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGlucHV0OyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IHZhbHVlOyAvL0NvbnNvbGUuV3JpdGVMaW5lKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBIYW5kbGluZyBIYXBwSGFuZGxpbmcgeyBnZXQ7IGludGVybmFsIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBwdWJsaWMgTW91c2VJTyBNb3VzZSB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIE1vdXNlSG92ZXJNYW5hZ2VyIG1vdXNlSG92ZXI7XHJcblxyXG4gICAgICAgIC8vcHVibGljIExpc3Q8RGVsYXllZEFjdGlvbnM+IHRhc2tzID0gbmV3IExpc3Q8RGVsYXllZEFjdGlvbnM+KCk7XHJcbiAgICAgICAgRGljdGlvbmFyeTxvYmplY3QsIHN0cmluZz4gbW92ZUNoYXJzO1xyXG4gICAgICAgIERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+IG1vdmVEZXNjcmlwdGlvbnMgPSBuZXcgRGljdGlvbmFyeTxvYmplY3QsIHN0cmluZz4oKTtcclxuICAgICAgICBEaWN0aW9uYXJ5PE1pc2NCYXR0bGVJbnB1dCwgc3RyaW5nPiBtaXNjRGVzY3JpcHRpb25zID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8TWlzY0JhdHRsZUlucHV0LCBzdHJpbmc+KCksKF9vMSk9PntfbzEuQWRkKE1pc2NCYXR0bGVJbnB1dC5Eb25lLFwiRE9ORVwiKTtfbzEuQWRkKE1pc2NCYXR0bGVJbnB1dC5SZWRvLFwiUkVET1wiKTtyZXR1cm4gX28xO30pO1xyXG4gICAgICAgIHByaXZhdGUgRGljdGlvbmFyeTxJbnB1dCwgc3RyaW5nPiBtb3ZlQnV0dG9ucztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIGRlYnVnT24gPSB0cnVlO1xyXG4gICAgICAgIHByaXZhdGUgaW50IGdyaWRTY2FsZTtcclxuICAgICAgICBwcml2YXRlIGludCBncmlkT2Zmc2V0eDtcclxuICAgICAgICBwcml2YXRlIGludCBncmlkT2Zmc2V0eTtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PFRleHRFbnRpdHk+IGJhdHRsZXJSZW5kZXJzO1xyXG5cclxuICAgICAgICBjaGFyW11bXSBlbnRpdGllc0NoYXJzO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCBNZXNzYWdlRG9Ob3RIaWRlO1xyXG4gICAgICAgIHN0cmluZyBtZXNzYWdlID0gbnVsbDtcclxuICAgICAgICBwcml2YXRlIGJvb2wgd2FpdGluZ0Zvck1lc3NhZ2VJbnB1dDtcclxuICAgICAgICBwcml2YXRlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlIGxhc3RQaGFzZTtcclxuICAgICAgICBwcml2YXRlIFRleHRFbnRpdHkgbWVzc2FnZUVudDtcclxuXHJcbiAgICAgICAgcHVibGljIElucHV0SGFuZGxpbmcgaW5wdXRIID0gbmV3IElucHV0SGFuZGxpbmcoKTtcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZVJlbmRlcihCYXR0bGVNYWluIGJhdHRsZUxvZ2ljLCBTdGFnZURhdGEgc3RhZ2VEYXRhKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHN0cmluZ1tdIGVudGl0eVRleHRzID0geyBcIkBcIiwgXCImXCIsIFwiJVwiLCBcIiRcIiwgXCJPXCIsIFwiWFwiLCBcIkpcIiwgXCJZXCIsXCJaXCIgfTtcclxuICAgICAgICAgICAgZW50aXRpZXNDaGFycyA9IG5ldyBjaGFyW2VudGl0eVRleHRzLkxlbmd0aF1bXTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlbnRpdHlUZXh0cy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZW50aXRpZXNDaGFyc1tpXSA9IGVudGl0eVRleHRzW2ldLlRvQ2hhckFycmF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHR1cm5CYXNlVHJ5ID0gYmF0dGxlTG9naWM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2VEYXRhID0gc3RhZ2VEYXRhO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQgPSBuZXcgVGV4dFdvcmxkKCk7XHJcbiAgICAgICAgICAgIHBvc0FuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuUG9zaXRpb25BbmltYXRpb24+KG5ldyBQb3NpdGlvbkFuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgY2hhckJ5Q2hhckFuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuQ2hhckJ5Q2hhckFuaW1hdGlvbj4obmV3IENoYXJCeUNoYXJBbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIGRlbGF5QW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5EZWxheXNBbmltYXRpb24+KG5ldyBEZWxheXNBbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5Jbml0KDcwLCA0Nik7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZCA9IHRleHRXb3JsZC5tYWluQm9hcmQ7XHJcbiAgICAgICAgICAgIC8vVGV4dEJvYXJkID0gbmV3IFRleHRCb2FyZCg3MCwgMjUpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgcG9zQW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb24obmV3IFBvc2l0aW9uQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICB2YXIgYmxpbmtBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkJsaW5rQW5pbT4obmV3IEJsaW5rQW5pbSgpKTtcclxuXHJcbiAgICAgICAgICAgIGJhdHRsZXJSZW5kZXJzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICAgICAgVXBkYXRlQmF0dGxlUmVuZGVyQ291bnQoKTtcclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2VFbnQgPSB0ZXh0V29ybGQuR2V0RnJlZUVudGl0eSg0MCwgNCk7XHJcblxyXG4gICAgICAgICAgICB0dXJuQmFzZVRyeS5oYXBwTWFuYWdlci5BZGRIYW5kbGVyKG5ldyBIYXBwcy5IYXBwSGFuZGxlcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5IYXBwVGFnLkF0dGFja0hpdCwgKGgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlciA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2guR2V0QXR0cmlidXRlX0ludCgxKV07XHJcbiAgICAgICAgICAgICAgICBpbnQgZGVmZW5kZXJFSUQgPSBoLkdldEF0dHJpYnV0ZV9JbnQoMCk7XHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZGVmZW5kZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmVuZGVyRUlEID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZW5kZXIgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1tkZWZlbmRlckVJRF07XHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSAoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCloLkdldEF0dHJpYnV0ZV9JbnQoMik7XHJcbiAgICAgICAgICAgICAgICBUZXh0RW50aXR5IGZlID0gR2V0UHJvalRleHRFbnRpdHkoZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmVuZGVyICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGF0dGFja2VyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MyID0gZGVmZW5kZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhEaXMgPSBNYXRoLkFicyhwb3MuWCAtIHBvczIuWCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQgdGltZSA9IChmbG9hdCl4RGlzICogMC4xZjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoZmUuQW5pbUJhc2UodGltZSksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oYXR0YWNrZXIuUG9zaXRpb25WMkQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGRlZmVuZGVyLlBvc2l0aW9uVjJEKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBhdHRhY2tlci5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zMiA9IHBvcztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZXIuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvczIuWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zMi5YID0gNjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgeERpcyA9IE1hdGguQWJzKHBvcy5YIC0gcG9zMi5YKTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCB0aW1lID0gKGZsb2F0KXhEaXMgKiAwLjFmO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKHRpbWUpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvcyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zMikpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vdHVybkJhc2VUcnkuaGFwcE1hbmFnZXIuQWRkSGFuZGxlcihuZXcgSGFwcHMuSGFwcEhhbmRsZXIoQmF0dGxlTWFpbi5IYXBwVGFnLkRhbWFnZVRha2VuLCAoaCkgPT5cclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIHZhciBkZWZlbmRlciA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2guR2V0QXR0cmlidXRlX0ludCgwKV07XHJcbiAgICAgICAgICAgIC8vICAgIHZhciBmZSA9IHRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDEsIDEpO1xyXG4gICAgICAgICAgICAvLyAgICBmZS5PcmlnaW4uRHJhd0NoYXIoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgMCwgMCk7XHJcbiAgICAgICAgICAgIC8vICAgIGZlLk9yaWdpbi5Qb3NpdGlvbiA9IEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oZGVmZW5kZXIuUG9zaXRpb25WMkQpO1xyXG4gICAgICAgICAgICAvLyAgICBibGlua0FuaW0uQWRkKGZlLkFuaW1CYXNlKDAuNWYpLCBCbGlua0FuaW0uQmxpbmtEYXRhLkNoYXIoJyAnLCAwLjFmKSk7XHJcbiAgICAgICAgICAgIC8vICAgIC8vU2hvd01lc3NhZ2UoXCJHb3QgZGFtYWdlZFwiKTtcclxuICAgICAgICAgICAgLy99KSk7XHJcblxyXG4gICAgICAgICAgICB0dXJuQmFzZVRyeS5oYXBwTWFuYWdlci5BZGRIYW5kbGVyKG5ldyBIYXBwcy5IYXBwSGFuZGxlcihCYXR0bGVNYWluLkhhcHBUYWcuQXR0YWNrTWlzcywgKGgpID0+XHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYXR0YWNrZXIgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1toLkdldEF0dHJpYnV0ZV9JbnQoMCldO1xyXG4gICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50ID0gKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQpaC5HZXRBdHRyaWJ1dGVfSW50KDEpO1xyXG4gICAgICAgICAgICAgICAgVGV4dEVudGl0eSBmZSA9IEdldFByb2pUZXh0RW50aXR5KGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IGF0dGFja2VyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvczIgPSBwb3M7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZXIuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zMi5YID0gLTE7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zMi5YID0gNjtcclxuICAgICAgICAgICAgICAgIHZhciB4RGlzID0gTWF0aC5BYnMocG9zLlggLSBwb3MyLlgpO1xyXG4gICAgICAgICAgICAgICAgZmxvYXQgdGltZSA9IChmbG9hdCl4RGlzICogMC4xZjtcclxuICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKHRpbWUpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zKSxcclxuICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvczIpKSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcblxyXG4gICAgICAgICAgICBtb3ZlQ2hhcnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxvYmplY3QsIHN0cmluZz4oKSwoX28yKT0+e19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlLFwiRlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlLFwiSVwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlcixcIlRcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk5vcm1hbFNob3QsXCJHXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsVW5pY29kZS5SaWdodGFycm93MitcIlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwLFVuaWNvZGUuVXBhcnJvdzIrXCJcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVEb3duLFVuaWNvZGUuRG93bmFycm93MitcIlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsVW5pY29kZS5MZWZ0YXJyb3cyK1wiXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iLFwiSUJcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXJCb21iLFwiVEJcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlN1bW1vbkVudGl0eSxcIlNVXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb05vdGhpbmcsXCIgXCIpO3JldHVybiBfbzI7fSk7XHJcblxyXG4gICAgICAgICAgICBtb3ZlRGVzY3JpcHRpb25zID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+KCksKF9vMyk9PntfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlLFwiSWNlIFNob3RcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUsXCJGaXJlIFNob3RcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIsXCJUaHVuZGVyIFNob3RcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsXCJJY2UgQm9tYlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTm9ybWFsU2hvdCxcIkd1blwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0LFVuaWNvZGUuUmlnaHRhcnJvdzIrXCJcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVVcCxVbmljb2RlLlVwYXJyb3cyK1wiXCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93bixVbmljb2RlLkRvd25hcnJvdzIrXCJcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFVuaWNvZGUuTGVmdGFycm93MitcIlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXCJUaHVuZGVyIEJvbWJcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlN1bW1vbkVudGl0eSxcIlN1bW1vblwiKTtyZXR1cm4gX28zO30pO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9Db25zb2xlLlJlYWRMaW5lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlQmF0dGxlUmVuZGVyQ291bnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2hpbGUgKGJhdHRsZXJSZW5kZXJzLkNvdW50IDwgdGhpcy50dXJuQmFzZVRyeS5lbnRpdGllcy5Db3VudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlclJlbmRlcnMuQWRkKHRleHRXb3JsZC5HZXRGcmVlRW50aXR5KDIsIDIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RyaW5nIEdldEVudGl0eU5hbWUoaW50IHVzZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZ2FtZUVudGl0eSA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW3VzZXJdO1xyXG4gICAgICAgICAgICB2YXIgY2hhcnMgPSBHZXRDaGFyKGdhbWVFbnRpdHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHN0cmluZyhjaGFycykgKyAoZ2FtZUVudGl0eS5ncmFwaGljUmVwZWF0ZWRJbmRleCArIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0RW50aXR5IEdldFByb2pUZXh0RW50aXR5KFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmZSA9IHRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDEsIDEpO1xyXG4gICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoVGV4dEJvYXJkLklOVklTSUJMRUNIQVIsIDAsIDApO1xyXG4gICAgICAgICAgICBpbnQgZWxlbWVudENvbG9yID0gRWxlbWVudFRvUHJvakNvbG9yKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBmZS5PcmlnaW4uU2V0QmFja0NvbG9yKGVsZW1lbnRDb2xvciwgMCwgMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgSW5wdXRLZXkgaW5wdXQgPSAoSW5wdXRLZXkpSW5wdXQ7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dCAhPSBJbnB1dEtleS5OT05FICYmIHdhaXRpbmdGb3JNZXNzYWdlSW5wdXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdhaXRpbmdGb3JNZXNzYWdlSW5wdXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vaWYgKGlucHV0ICE9IElucHV0S2V5Lk5PTkUpIENvbnNvbGUuV3JpdGVMaW5lKGlucHV0KTtcclxuICAgICAgICAgICAgLy9pbnQgaW5wdXROdW1iZXIgPSBpbnB1dCAtICcwJztcclxuICAgICAgICAgICAgLy9pZiAoZGVidWdPbiAmJiBpbnB1dCA9PSAnaycpXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBEZWJ1Z0V4dHJhLkRlYnVnRXguU2hvdygpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIGlmIChsYXN0UGhhc2UgIT0gdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUucGhhc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9TaG93TWVzc2FnZShcIlBpY2sgeW91ciBjb21tYW5kc1wiLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLlNldEFsbChUZXh0Qm9hcmQuTk9DSEFOR0VDSEFSLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgQ29sb3JzLkZpcmVBdXJhKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdFBoYXNlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJYX19YXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEhpZGVNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuU2V0QWxsKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYXN0UGhhc2UgPSB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZTtcclxuICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlID09IEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoSW5wdXRVbmljb2RlID49IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0WCA9IGlucHV0SC5QaWNraW5nSGFuZChJbnB1dFVuaWNvZGUsIHR1cm5CYXNlVHJ5LmlucHV0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0WC50eXBlICE9IElucHV0VHlwZS5Ob25lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0dXJuQmFzZVRyeS5JbnB1dERvbmUoaW5wdXRYKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL2ZvcmVhY2ggKHZhciBpdGVtIGluIG1vdmVLZXlzKVxyXG4gICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAvLyAgICBpZiAoaXRlbS5WYWx1ZSA9PSBpbnB1dClcclxuICAgICAgICAgICAgICAgIC8vICAgIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0dXJuQmFzZVRyeS5JbnB1dERvbmUoaXRlbS5LZXkpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKENhbkFkdmFuY2VfTG9naWMoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0dXJuQmFzZVRyeS5UaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5IYW5kUmVjaGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlRpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kczpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5FeGVjdXRlTW92ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TeXN0ZW0uVGhyZWFkaW5nLlRocmVhZC5TbGVlcCgzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0dXJuQmFzZVRyeS5UaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBVcGRhdGVCYXR0bGVSZW5kZXJDb3VudCgpO1xyXG4gICAgICAgICAgICBEcmF3R3JhcGhpY3MoZGVsdGEpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENhbkFkdmFuY2VHcmFwaGljcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFdvcmxkLklzRG9uZSgpICYmICF3YWl0aW5nRm9yTWVzc2FnZUlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIENhbkFkdmFuY2VfTG9naWMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIENhbkFkdmFuY2VHcmFwaGljcygpICYmIEhhcHBIYW5kbGluZy5Jc0RvbmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dNZXNzYWdlKHN0cmluZyBzLCBib29sIHdhaXRGb3JJbnB1dCA9IHRydWUsIGJvb2wgZG9Ob3RIaWRlID0gZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLk1lc3NhZ2VEb05vdEhpZGUgPSBkb05vdEhpZGU7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBzO1xyXG4gICAgICAgICAgICBtZXNzYWdlRW50Lk9yaWdpbi5SZXNldEludmlzaWJsZSgpO1xyXG4gICAgICAgICAgICBmbG9hdCB0aW1lVG9Xcml0ZSA9IG1lc3NhZ2UuTGVuZ3RoICogMC4wMTVmO1xyXG4gICAgICAgICAgICBpZiAodGltZVRvV3JpdGUgPiAwLjRmKSB0aW1lVG9Xcml0ZSA9IDAuNGY7XHJcbiAgICAgICAgICAgIGNoYXJCeUNoYXJBbmltLkFkZChtZXNzYWdlRW50LkFuaW1CYXNlKHRpbWVUb1dyaXRlKSwgbmV3IENoYXJCeUNoYXJBbmltYXRpb24uQ2hhckJ5Q2hhckRhdGEoMCwgbWVzc2FnZS5MZW5ndGggKyAxKSk7XHJcbiAgICAgICAgICAgIGRlbGF5QW5pbS5EZWxheSh0aW1lVG9Xcml0ZSArIDAuOGYpO1xyXG5cclxuICAgICAgICAgICAgLy93YWl0aW5nRm9yTWVzc2FnZUlucHV0ID0gd2FpdEZvcklucHV0O1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJNOiBcIitzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEhpZGVNZXNzYWdlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICB3YWl0aW5nRm9yTWVzc2FnZUlucHV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIk06IFwiK3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0JhdHRsZU1lc3NhZ2Uoc3RyaW5nIHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIXR1cm5CYXNlVHJ5LkJhdHRsZURlY2lkZWQoKSlcclxuICAgICAgICAgICAgICAgIFNob3dNZXNzYWdlKHMpO1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJNOiBcIitzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdHcmFwaGljcyhmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vdXNlSG92ZXIubW91c2VIb3ZlcnMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgdHVybkJhc2VUcnkuVXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgLy9jbGVhciBncmlkXHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5SZXNldCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxhc3RQaGFzZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5TZXRBbGwoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIENvbG9ycy5CYWNrZ3JvdW5kSW5wdXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnQgY29udHJvbHNZID0gZ3JpZFNjYWxlICogMyArIDEwICsgMyArIDQ7XHJcbiAgICAgICAgICAgIGdyaWRTY2FsZSA9IDU7XHJcbiAgICAgICAgICAgIGdyaWRPZmZzZXR4ID0gMjtcclxuICAgICAgICAgICAgZ3JpZE9mZnNldHkgPSAxO1xyXG4gICAgICAgICAgICBpbnQgZW5lbXlHcmlkT2ZmWCA9IGdyaWRTY2FsZSAqIDM7XHJcbiAgICAgICAgICAgIGJvb2wgZHJhd0RvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1JlcGVhdGVkKCcgJywgZ3JpZE9mZnNldHgsIGdyaWRPZmZzZXR5LCBncmlkU2NhbGUgKiA2LCBncmlkU2NhbGUqMywgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIENvbG9ycy5CYWNrQmF0dGxlKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCAzICogZ3JpZFNjYWxlOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgMyAqIGdyaWRTY2FsZTsgaisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkcmF3RG90KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdDaGFyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRPZmZzZXR4ICsgaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZE9mZnNldHkgKyBqLCBDb2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0NoYXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkT2Zmc2V0eCArIGkgKyBlbmVteUdyaWRPZmZYLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZE9mZnNldHkgKyBqLCBDb2xvcnMuR3JpZEVuZW15KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgJSBncmlkU2NhbGUgPT0gMCAmJiBqICUgZ3JpZFNjYWxlID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdHcmlkKGkgKyBncmlkT2Zmc2V0eCArIGVuZW15R3JpZE9mZlgsIGogKyBncmlkT2Zmc2V0eSwgZ3JpZFNjYWxlLCBncmlkU2NhbGUsIENvbG9ycy5HcmlkRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0dyaWQoaSArIGdyaWRPZmZzZXR4LCBqICsgZ3JpZE9mZnNldHksIGdyaWRTY2FsZSwgZ3JpZFNjYWxlLCBDb2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5lbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZ2FtZUVudGl0eSA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBlYyA9IEdldENoYXIoZ2FtZUVudGl0eSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IGdhbWVFbnRpdHkuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICBCYXNlVXRpbHMuVmVjdG9yMkQgc2NyZWVuUG9zID0gQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbigoQmFzZVV0aWxzLlZlY3RvcjJEKXBvcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5UeXBlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuUG9zLlkgPSBzY3JlZW5Qb3MuWSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuUG9zLlggPSBzY3JlZW5Qb3MuWCAtIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2JhdHRsZXJFbnRpdGllc1tpXS5vcmlnaW4uUG9zaXRpb24gPSBzY3JlZW5Qb3M7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLlBvc2l0aW9uICE9IHNjcmVlblBvcyAmJiB0ZXh0V29ybGQuSXNEb25lKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoYmF0dGxlclJlbmRlcnNbaV0uQW5pbUJhc2UoMC4xNWYpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKGJhdHRsZXJSZW5kZXJzW2ldLk9yaWdpbi5Qb3NpdGlvbiwgc2NyZWVuUG9zLCB0cnVlKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGMgPSBDb2xvcnMuSGVybztcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LlR5cGUgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSkgYyA9IENvbG9ycy5FbmVteTtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LlR5cGUgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRW50aXR5VHlwZS5waWNrdXApIGMgPSBDb2xvcnMuaW5wdXRLZXk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5EZWFkKVxyXG4gICAgICAgICAgICAgICAgICAgIGMgPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1I7XHJcbiAgICAgICAgICAgICAgICBpbnQgYmMgPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1I7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuQWxpdmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50ID0gZ2FtZUVudGl0eS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGJjID0gRWxlbWVudFRvQXVyYUNvbG9yKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LkRlYWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBlYy5MZW5ndGggKyAxOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVyUmVuZGVyc1tpXS5PcmlnaW4uRHJhd0NoYXIoVGV4dEJvYXJkLklOVklTSUJMRUNIQVIsIGosIDAsIGMsIGJjKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZXJSZW5kZXJzW2ldLk9yaWdpbi5EcmF3KGVjLCAwLCAwLCBjLCBiYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmF0dGxlclJlbmRlcnNbaV0uT3JpZ2luLkRyYXdPbmVEaWdpdChnYW1lRW50aXR5LmdyYXBoaWNSZXBlYXRlZEluZGV4ICsgMSwgMCArIGVjLkxlbmd0aCwgMCwgYywgYmMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpbnQgdGV4dEJvYXJkSGVpZ2h0ID0gMyAqIGdyaWRTY2FsZTtcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vaW50IHkgPSAyO1xyXG4gICAgICAgICAgICAgICAgLy9pbnQgeCA9IDYgKiBncmlkU2NhbGUgKyAyMDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaW50IHggPSAzO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBEcmF3Q29udHJvbHMoY29udHJvbHNZLCB4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHVybkJhc2VUcnkudGltZVRvQ2hvb3NlID4gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IHJhdGlvID0gdHVybkJhc2VUcnkudGltZVRvQ2hvb3NlIC8gdHVybkJhc2VUcnkudGltZVRvQ2hvb3NlTWF4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1JlcGVhdGVkKCcgJywgeCwgY29udHJvbHNZICsgMTYsIChpbnQpKHJhdGlvICogMTUpLCAxLCBDb2xvcnMuQm9hcmQsIENvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3UmVwZWF0ZWQoJyAnLCB4IC0gMSwgY29udHJvbHNZIC0gMSwgMTUsIDE1LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnQgdHVybk9yZGVyWCA9IDYgKiBncmlkU2NhbGUgKyA1O1xyXG4gICAgICAgICAgICBpbnQgdHVybk9yZGVyWSA9IDI7XHJcbiAgICAgICAgICAgIHR1cm5PcmRlclggPSAyO1xyXG4gICAgICAgICAgICB0dXJuT3JkZXJZID0gMyAqIGdyaWRTY2FsZSArIDIgO1xyXG5cclxuICAgICAgICAgICAgRHJhd1R1cm5PcmRlcih0dXJuT3JkZXJYLCB0dXJuT3JkZXJZKTtcclxuICAgICAgICAgICAgaWYoIXN0YWdlRGF0YS5oaWRlTGlmZVVJKVxyXG4gICAgICAgICAgICAgICAgRHJhd0xpZmUodHVybk9yZGVyWCsyNSwgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGludCBYID0gMjtcclxuICAgICAgICAgICAgICAgIC8vY29uc3QgaW50IFkgPSAxNjtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VFbnQuU2V0UG9zaXRpb24oWCwgY29udHJvbHNZIC0gMik7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSAhPSBudWxsICYmICghQ2FuQWR2YW5jZUdyYXBoaWNzKCkpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdHcmlkKFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG1lc3NhZ2VFbnQuT3JpZ2luLlBvc2l0aW9uLlhJbnQsIG1lc3NhZ2VFbnQuT3JpZ2luLlBvc2l0aW9uLllJbnQsIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG1lc3NhZ2VFbnQuV2lkdGgsIG1lc3NhZ2VFbnQuSGVpZ2h0LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZUVudC5PcmlnaW4uRHJhd0dyaWQoMCwgMCwgNDAsIDQsIENvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUVudC5PcmlnaW4uRHJhd1dpdGhMaW5lYnJlYWtzKG1lc3NhZ2UsIDEsIDAsIDEsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFNZXNzYWdlRG9Ob3RIaWRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VFbnQuT3JpZ2luLlNldEFsbCgnICcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd1JlcGVhdGVkKCcgJyxYLCBZLCA0MCwgNCwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSgxKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoMSk7XHJcbiAgICAgICAgICAgIC8vdGV4dEJvYXJkLkRyYXdfQ3Vyc29yKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlLlRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgdGV4dFdvcmxkLkRyYXdDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuQWR2YW5jZVRpbWUoZGVsdGEpO1xyXG4gICAgICAgICAgICBpZiAoQ2FuQWR2YW5jZUdyYXBoaWNzKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEhhcHBIYW5kbGluZy5IYW5kbGUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChDYW5BZHZhbmNlR3JhcGhpY3MoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0dXJuQmFzZVRyeS5oYXBwTWFuYWdlci5UcnlIYW5kbGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2lmIChDYW5BZHZhbmNlKCkpXHJcbiAgICAgICAgICAgIC8ve1xyXG5cclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBFbGVtZW50VG9BdXJhQ29sb3IoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGJjID0gVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50LkZpcmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLkZpcmVBdXJhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuSWNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5JY2VBdXJhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuVGh1bmRlckF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBiYztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEVsZW1lbnRUb1Byb2pDb2xvcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgYmMgPSBDb2xvcnMuaW5wdXRLZXk7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuRmlyZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuRmlyZVNob3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5JY2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLkljZUF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5UaHVuZGVyQXVyYTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGJjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oQmFzZVV0aWxzLlZlY3RvcjJEIHBvcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gcG9zLlg7XHJcbiAgICAgICAgICAgIHZhciB5ID0gcG9zLlk7XHJcbiAgICAgICAgICAgIHZhciBzY3JlZW5Qb3MgPSBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKHggKiBncmlkU2NhbGUgKyBncmlkU2NhbGUgLyAyICsgZ3JpZE9mZnNldHgsIDIgKiBncmlkU2NhbGUgLSB5ICogZ3JpZFNjYWxlICsgZ3JpZFNjYWxlIC8gMiArIGdyaWRPZmZzZXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHNjcmVlblBvcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3Q29udHJvbHMoaW50IHksIGludCB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0dyaWQoeCAtIDIsIHkgLSAxLCAyMCwgMTUsIENvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh4LCB5KTtcclxuICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJDb250cm9sc1wiLCBDb2xvcnMuV2luZG93TGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgLy9JbnB1dFRhZ3MgaW5wdXRUYWcgPSBJbnB1dFRhZ3MuTU9WRUZJWDtcclxuICAgICAgICAgICAgaW50IHlPZmYgPSAwO1xyXG4gICAgICAgICAgICB5T2ZmID0gRHJhd0lucHV0c19GaXgoeSwgeCwgSW5wdXRUYWdzLk1PVkVGSVgsIHlPZmYpO1xyXG4gICAgICAgICAgICAvL3lPZmYrKztcclxuICAgICAgICAgICAgeU9mZiA9IERyYXdJbnB1dHNfRml4KHksIHgsIElucHV0VGFncy5NSVNDLCB5T2ZmKTtcclxuICAgICAgICAgICAgLy95T2ZmKys7XHJcbiAgICAgICAgICAgIC8veU9mZiA9IERyYXdJbnB1dHNfRml4KHksIHgsIElucHV0VGFncy5NT1ZFVU5GSVgsIHlPZmYpO1xyXG5cclxuICAgICAgICAgICAgaW50IGF0dGFja051bWJlciA9IDE7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuaW5wdXRzLmlucHV0cy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgeDIgPSB4O1xyXG4gICAgICAgICAgICAgICAgaW50IHkyID0geSArIDIgKyB5T2ZmO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdHVybkJhc2VUcnkuaW5wdXRzLmlucHV0c1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHVybkJhc2VUcnkuaW5wdXRzLlRhZ0lzKGksIElucHV0VGFncy5NT1ZFVU5GSVgpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHlPZmYrKztcclxuICAgICAgICAgICAgICAgICAgICB5T2ZmKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHVuaWNvZGUgPSAnMCcgKyBhdHRhY2tOdW1iZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrTnVtYmVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2VIb3Zlci5tb3VzZUhvdmVycy5BZGQobmV3IE1vdXNlSG92ZXIobmV3IFJlY3QoeDIgLSAyLCB5MiwgMjAsIDEpLCAwLCBpbnB1dC5hcmcxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0NoYXIoJ1snLCB4MiAtIDEsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCBsZW5ndGhCbmFtZSA9IFRleHRCb2FyZC5EcmF3VW5pY29kZUxhYmVsKHVuaWNvZGUsIHgyLCB5MiwgQ29sb3JzLmlucHV0S2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3Q2hhcignXScsIHgyICsgbGVuZ3RoQm5hbWUsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgZGVzY3JpcHRpb24gPSBzdHJpbmcuRW1wdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT0gSW5wdXRUeXBlLk1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZSBtID0gKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlKWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVEZXNjcmlwdGlvbnMuVHJ5R2V0VmFsdWUobSwgb3V0IGRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2NyaXB0aW9uID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gbS5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTWlzY0JhdHRsZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1pc2NCYXR0bGVJbnB1dCBhcmcxID0gKE1pc2NCYXR0bGVJbnB1dClpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IG1pc2NEZXNjcmlwdGlvbnNbYXJnMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3KGRlc2NyaXB0aW9uLCB4MiArIDIgKyA1LCB5MiwgQ29sb3JzLklucHV0RGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIGMgPSBtb3ZlQ2hhcnNbbW92ZV07XHJcbiAgICAgICAgICAgICAgICAvL0RyYXdNb3ZlKG1vdmUsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3KGMsIHgyICsgMywgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3V2l0aEdyaWQoYytcIlwiLCB4MiwgeSArIDIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW50IERyYXdJbnB1dHNfRml4KGludCB5LCBpbnQgeCwgSW5wdXRUYWdzIGlucHV0VGFnLCBpbnQgeU9mZilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmlucHV0cy5pbnB1dHMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHgyID0geDtcclxuICAgICAgICAgICAgICAgIGludCB5MiA9IHkgKyAyICsgeU9mZjtcclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHR1cm5CYXNlVHJ5LmlucHV0cy5pbnB1dHNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmlucHV0cy5UYWdJcyhpLCBpbnB1dFRhZykpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVuaWNvZGUgPSBpbnB1dEguR2V0Rml4ZWRNb3ZlVW5pY29kZShpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGZvcmNlSW5wdXRMYWJlbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGZvcmNlQ29tbWFuZExhYmVsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodW5pY29kZSA9PSAndycpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JjZUlucHV0TGFiZWwgPSBcIldBU0RcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2VDb21tYW5kTGFiZWwgPSBcIlwiICsgVW5pY29kZS5VcGFycm93MiArIFVuaWNvZGUuTGVmdGFycm93MiArIFVuaWNvZGUuRG93bmFycm93MiArIFVuaWNvZGUuUmlnaHRhcnJvdzI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1bmljb2RlID09ICdhJyB8fCB1bmljb2RlID09ICdzJyB8fCB1bmljb2RlID09ICdkJylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB5T2ZmKys7XHJcbiAgICAgICAgICAgICAgICAgICAgeU9mZisrO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2VIb3Zlci5tb3VzZUhvdmVycy5BZGQobmV3IE1vdXNlSG92ZXIobmV3IFJlY3QoeDIgLSAyLCB5MiwgMjAsIDEpLCAwLCBpbnB1dC5hcmcxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd0NoYXIoJ1snLCB4MiAtIDEsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCBsZW5ndGhCbmFtZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlSW5wdXRMYWJlbCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGhCbmFtZSA9IFRleHRCb2FyZC5EcmF3VW5pY29kZUxhYmVsKHVuaWNvZGUsIHgyLCB5MiwgQ29sb3JzLmlucHV0S2V5KTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhmb3JjZUlucHV0TGFiZWwsIHgyLCB5MiwgQ29sb3JzLmlucHV0S2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoQm5hbWUgPSBmb3JjZUlucHV0TGFiZWwuTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3Q2hhcignXScsIHgyICsgbGVuZ3RoQm5hbWUsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgZGVzY3JpcHRpb24gPSBzdHJpbmcuRW1wdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT0gSW5wdXRUeXBlLk1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2VDb21tYW5kTGFiZWwgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBmb3JjZUNvbW1hbmRMYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlIG0gPSAoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVEZXNjcmlwdGlvbnMuVHJ5R2V0VmFsdWUobSwgb3V0IGRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXNjcmlwdGlvbiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gbS5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT0gSW5wdXRUeXBlLk1pc2NCYXR0bGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNaXNjQmF0dGxlSW5wdXQgYXJnMSA9IChNaXNjQmF0dGxlSW5wdXQpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBtaXNjRGVzY3JpcHRpb25zW2FyZzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhkZXNjcmlwdGlvbiwgeDIgKyAyICsgNSwgeTIsIENvbG9ycy5JbnB1dERlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBjID0gbW92ZUNoYXJzW21vdmVdO1xyXG4gICAgICAgICAgICAgICAgLy9EcmF3TW92ZShtb3ZlLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhdyhjLCB4MiArIDMsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd1dpdGhHcmlkKGMrXCJcIiwgeDIsIHkgKyAyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geU9mZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3TGlmZShpbnQgdHVybk9yZGVyWCwgaW50IHR1cm5PcmRlclkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3R3JpZCh0dXJuT3JkZXJYIC0gMSwgdHVybk9yZGVyWSAtIDEsIDIwLCA5LCBDb2xvcnMuV2luZG93TGFiZWwpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuU2V0Q3Vyc29yQXQodHVybk9yZGVyWCArIDEsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJMaWZlXCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh0dXJuT3JkZXJYICsgOCwgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihcIkVsZW1lbnRcIiwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuICAgICAgICAgICAgaW50IGluZGV4ID0gLTE7IC8vdXNpbmcgdGhpcyBiZWNhdXNlIG5vdCBhbGwgdW5pdHMgZ2V0IGRyYXduXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlXHJcblxyXG4gICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZSA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlLmRyYXdMaWZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFlLkRlYWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3IgPSBDb2xvcnMuSGVyb1R1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IENvbG9ycy5FbmVteVR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdPbmVEaWdpdF9DdXJzb3IoKGludCllLmxpZmUuVmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeE9mZiA9IHR1cm5PcmRlclggKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB5T2ZmID0gdHVybk9yZGVyWSArIDIgKyBpbmRleCoyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vRHJhd0VudGl0eUNoYXIoZSwgY29sb3IsIHhPZmYsIHlPZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKEdldENoYXIoZSksIHhPZmYsIHR1cm5PcmRlclkgKyAyLCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdUd29EaWdpdHMoKGludCllLmxpZmUsIHhPZmYsIHlPZmYsIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgZWxlbWVudCA9IHN0cmluZy5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGUuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5GaXJlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IFwiRmlyZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5JY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gXCJJY2VcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlcjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBcIlRodW5kZXJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlQ29sb3IgPSBFbGVtZW50VG9BdXJhQ29sb3IoZS5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoZWxlbWVudCwgeE9mZiArIDcsIHlPZmYsIGVDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd09uZURpZ2l0X0N1cnNvcigoaW50KWUubGlmZS5WYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoeDogMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3VHVybk9yZGVyKGludCB0dXJuT3JkZXJYLCBpbnQgdHVybk9yZGVyWSwgYm9vbCBob3Jpem9udGFsID0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZhbHVlIHR1cm5zUGVyUGhhc2UgPSB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuU2V0Q3Vyc29yQXQodHVybk9yZGVyWCszLCB0dXJuT3JkZXJZKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKFwiQ29tbWFuZHNcIiwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuXHJcbiAgICAgICAgICAgIGludCBkcmF3aW5nSWQgPSAtMTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0dXJuQmFzZVRyeS5lbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZSA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlLmRyYXdUdXJuKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFlLkRlYWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhd2luZ0lkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IGNvbG9yID0gQ29sb3JzLkhlcm9UdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBDb2xvcnMuRW5lbXlUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd09uZURpZ2l0X0N1cnNvcigoaW50KWUubGlmZS5WYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4T2ZmID0gdHVybk9yZGVyWCArIDEgKyBkcmF3aW5nSWQgKiAzO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB5RW50aXR5ID0gdHVybk9yZGVyWSArIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHlGaXJzdE1vdmUgPSB0dXJuT3JkZXJZICsgMztcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeEZpcnN0TW92ZSA9IHhPZmY7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvcml6b250YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeE9mZiA9IHR1cm5PcmRlclg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHlFbnRpdHkgPSB0dXJuT3JkZXJZKzIrZHJhd2luZ0lkKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHlGaXJzdE1vdmUgPSB5RW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4Rmlyc3RNb3ZlID0gdHVybk9yZGVyWCszO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBEcmF3RW50aXR5Q2hhcihlLCBjb2xvciwgeE9mZiwgeUVudGl0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHhGaXJzdE1vdmUsIHlGaXJzdE1vdmUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpMiA9IDA7IGkyIDwgdHVybnNQZXJQaGFzZTsgaTIrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBjb2xvcjIgPSBjb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRyYXdpbmdJZCA9PSB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgJiYgaTIgPT0gdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUudHVybiAmJiB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjIgPSBDb2xvcnMuSGVybztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkyIDwgdHVybnNQZXJQaGFzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGMgPSBHZXRDaGFyT2ZNb3ZlKGUsIGkyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlSG92ZXIubW91c2VIb3ZlcnMuQWRkKG5ldyBNb3VzZUhvdmVyKG5ldyBSZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5DdXJzb3JYLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5DdXJzb3JZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsIGUubW92ZXNbaTJdKSk7IC8vYWRkIGhlcmUuLi4/IEBfQFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKGMsIGNvbG9yMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaG9yaXpvbnRhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gYy5MZW5ndGg7IGogPCAzOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuQWR2YW5jZUN1cnNvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3X0N1cnNvcignICcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKCcgJywgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChob3Jpem9udGFsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoeDogeEZpcnN0TW92ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoeDogMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3RW50aXR5Q2hhcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZSwgaW50IGNvbG9yLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjaGFyW10gY2hhcnMgPSBHZXRDaGFyKGUpO1xyXG5cclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoY2hhcnMsIHgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgLy9pZiAoZS5ncmFwaGljUmVwZWF0ZWRJbmRleCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3T25lRGlnaXQoZS5ncmFwaGljUmVwZWF0ZWRJbmRleCArIDEsIHggKyBjaGFycy5MZW5ndGgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgR2V0Q2hhck9mTW92ZShCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBlLCBpbnQgaTIpXHJcbiAgICAgICAge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IGUubW92ZXNbaTJdO1xyXG4gICAgICAgICAgICBpZiAodmFsID49IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW92ZUNoYXJzWyhCYXR0bGVNYWluLk1vdmVUeXBlKXZhbF07XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIiBcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjaGFyW10gR2V0Q2hhcihCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBnYW1lRW50aXR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVudGl0aWVzQ2hhcnNbZ2FtZUVudGl0eS5ncmFwaGljXTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd01vdmUoVmFsdWUgbW92ZSwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG1vdmUuVmFsID49IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEJhdHRsZU1haW4uTW92ZVR5cGUgbSA9IChCYXR0bGVNYWluLk1vdmVUeXBlKW1vdmUuVmFsO1xyXG4gICAgICAgICAgICAgICAgRHJhd01vdmUobSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKCcgJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd01vdmUoQmF0dGxlTWFpbi5Nb3ZlVHlwZSBtb3ZlLCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYyA9IG1vdmVDaGFyc1ttb3ZlXTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKGMsIGNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRleHRCb2FyZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgQ29sb3JzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEdyaWRIZXJvID0gMTtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBHcmlkRW5lbXkgPSAyO1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEhlcm8gPSAzO1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEVuZW15ID0gNDtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBIZXJvVHVybiA9IDU7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgRW5lbXlUdXJuID0gNjtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBpbnB1dEtleSA9IDc7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQm9hcmQgPSA4O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IFdpbmRvd0xhYmVsID0gOTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBGaXJlQXVyYSA9IDEwO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEljZUF1cmEgPSAxMTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBUaHVuZGVyQXVyYSA9IDEyO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEZpcmVTaG90ID0gMTM7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgSWNlU2hvdCA9IDE0O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IFRodW5kZXJTaG90ID0gMTU7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQmFja2dyb3VuZElucHV0ID0gMTY7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgSW5wdXREZXNjcmlwdGlvbiA9IDE3O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEJhY2tCYXR0bGUgPSAxODtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBJbnB1dEtleVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTk9ORSwgTEVGVCwgUklHSFQsIERPV04sIFVQLCBGSVJFLCBSRURPLCBET05FLFxyXG4gICAgICAgICAgICBJQ0UsXHJcbiAgICAgICAgICAgIFRIVU5ERVIsXHJcbiAgICAgICAgICAgIE5PUk1BTFNIT1RcclxuICAgICAgICB9XHJcblxuXHJcblxyXG4gICAgXG5wcml2YXRlIGludCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fSW5wdXRVbmljb2RlPS0xO31cclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmcuR2FtZVNjcmVlbjtcclxudXNpbmcgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR2FtZU1haW4gOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEJhdHRsZU1haW4gYmF0dGxlTWFpbjtcclxuICAgICAgICBwcml2YXRlIEJhdHRsZVJlbmRlciBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBNb2RlU2VsZWN0aW9uU2NyZWVuIG1vZGVTZWxlY3Rpb25TY3JlZW47XHJcbiAgICAgICAgSVRleHRTY3JlZW5fIG1haW5EcmF3O1xyXG4gICAgICAgIHByaXZhdGUgUmVzdWx0U2NyZWVuIHJlc3VsdFNjcmVlbjtcclxuICAgICAgICAvL0lUZXh0U2NyZWVuW10gc2NyZWVucyA9IG5ldyBJVGV4dFNjcmVlbls1XTtcclxuICAgICAgICBpbnQgZGlmZmljdWx0eTtcclxuICAgICAgICBpbnRbXSBlbmVteUFtb3VudCA9IG5ldyBpbnRbXSAgIHsgMSwgMSwgMiwgMSwgMiwgMywgMiwgMywgMSwgMiwgMywgMyB9O1xyXG4gICAgICAgIGludFtdIHR1cm5BbW91bnQgPSBuZXcgaW50W10geyAyLCA0LCAyLCA2LCA0LCAyLCA2LCA0LCA4LCA4LCA2LCA4IH07XHJcbiAgICAgICAgcHJpdmF0ZSBNb3VzZUhvdmVyVGV4dCBtb3VzZUhvdmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgR2FtZU1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZVNlbGVjdGlvblNjcmVlbiA9IG5ldyBNb2RlU2VsZWN0aW9uU2NyZWVuKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuLm1vZGUgPSAxO1xyXG4gICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuLndhbm5hTGVhdmUgPSAxO1xyXG4gICAgICAgICAgICBtYWluRHJhdyA9IG1vZGVTZWxlY3Rpb25TY3JlZW47XHJcbiAgICAgICAgICAgIC8vUmVzZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpbnQgbW9kZSA9IG1vZGVTZWxlY3Rpb25TY3JlZW4ubW9kZTtcclxuICAgICAgICAgICAgYm9vbCB0aW1lQXR0YWNrID0gbW9kZVNlbGVjdGlvblNjcmVlbi50aW1lQXR0YWNrO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVjcyA9IEVDU01hbmFnZXIuQ3JlYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBTdGFnZURhdGFDcmVhdG9yIHNkYyA9IG5ldyBTdGFnZURhdGFDcmVhdG9yKGVjcyk7XHJcbiAgICAgICAgICAgIHZhciBzdGFnZXMgPSBlY3MuUXVpY2tBY2Nlc3NvcjE8U3RhZ2VEYXRhPigpO1xyXG4gICAgICAgICAgICAvL3ZhciBzdGFnZXMgPSBzZGMuc3RhZ2VzO1xyXG5cclxuICAgICAgICAgICAgaW50IGQgPSBkaWZmaWN1bHR5O1xyXG4gICAgICAgICAgICBpZiAoc3RhZ2VzLkNvdW50IDw9IGQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1haW5EcmF3ID0gbW9kZVNlbGVjdGlvblNjcmVlbjtcclxuICAgICAgICAgICAgICAgIG1vZGVTZWxlY3Rpb25TY3JlZW4uUmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIGRpZmZpY3VsdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vZCA9IDIwMDtcclxuICAgICAgICAgICAgaWYgKGQgPj0gZW5lbXlBbW91bnQuTGVuZ3RoKSBkID0gZW5lbXlBbW91bnQuTGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgaW50IG5FbmVtaWVzID0gZW5lbXlBbW91bnRbZF07XHJcblxyXG4gICAgICAgICAgICBCYXR0bGVTZXR1cCBiYXR0bGVTZXR1cCA9IG5ldyBCYXR0bGVTZXR1cChtb2RlLCBuZXcgQmF0dGxlQmFzaWNDb25maWcoblR1cm5zOiA1LCBuRW5lbWllczogbkVuZW1pZXMpLCBkaWZmaWN1bHR5LCBlY3MpO1xyXG4gICAgICAgICAgICBiYXR0bGVNYWluID0gYmF0dGxlU2V0dXAuYmF0dGxlTWFpbjtcclxuXHJcblxyXG4gICAgICAgICAgICAvL2Vjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG5ldyBFbmVteVNwYXduRGF0YSgwLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDQsIDEpKSk7XHJcbiAgICAgICAgICAgIC8vZWNzLkNyZWF0ZUVudGl0eVdpdGhDb21wb25lbnQobmV3IEVuZW15U3Bhd25EYXRhKDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpKTtcclxuXHJcblxyXG4gICAgICAgICAgICBmbG9hdCB0aW1lVG9DaG9vc2UgPSAtMTtcclxuICAgICAgICAgICAgaWYgKHRpbWVBdHRhY2spXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpbWVUb0Nob29zZSA9ICg1ZiAqIHR1cm5BbW91bnRbZF0pICogbkVuZW1pZXM7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiYXR0bGVNYWluLnRpbWVUb0Nob29zZU1heCA9IHRpbWVUb0Nob29zZTtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5Jbml0KCk7XHJcbiAgICAgICAgICAgIGJhdHRsZVJlbmRlciA9IG5ldyBCYXR0bGVSZW5kZXIoYmF0dGxlTWFpbiwgc3RhZ2VEYXRhOnN0YWdlcy5Db21wMShkaWZmaWN1bHR5KSk7XHJcbiAgICAgICAgICAgIG5ldyBIYXBwSGFuZGxpbmcoYmF0dGxlUmVuZGVyLCBiYXR0bGVTZXR1cCk7XHJcbiAgICAgICAgICAgIG1haW5EcmF3ID0gYmF0dGxlUmVuZGVyO1xyXG4gICAgICAgICAgICByZXN1bHRTY3JlZW4gPSBuZXcgUmVzdWx0U2NyZWVuKCk7XHJcbiAgICAgICAgICAgIHJlc3VsdFNjcmVlbi5iYXR0bGVSZXN1bHQgPSBiYXR0bGVNYWluLmJhdHRsZVJlc3VsdDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIE1vdXNlSG92ZXJNYW5hZ2VyIGhvdmVyTWFuYWdlciA9IG5ldyBNb3VzZUhvdmVyTWFuYWdlcihNb3VzZSk7XHJcbiAgICAgICAgICAgIGhvdmVyTWFuYWdlci5tb3VzZUhvdmVycy5BZGQobmV3IE1vdXNlSG92ZXIobmV3IEJhc2VVdGlscy5SZWN0KDUsNSw1LDUpLCAwLDApKTtcclxuICAgICAgICAgICAgbW91c2VIb3ZlciA9IG5ldyBNb3VzZUhvdmVyVGV4dChob3Zlck1hbmFnZXIsIGJhdHRsZVJlbmRlci50ZXh0V29ybGQuR2V0RnJlZUVudGl0eSg1MCwgMSkpO1xyXG5cclxuICAgICAgICAgICAgYmF0dGxlUmVuZGVyLm1vdXNlSG92ZXIgPSBob3Zlck1hbmFnZXI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dCB7IHNldCB7IG1haW5EcmF3LklucHV0ID0gdmFsdWU7IH0gZ2V0IHsgcmV0dXJuICdjJzsgfSB9XHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dFVuaWNvZGUgeyBzZXQgeyBtYWluRHJhdy5JbnB1dFVuaWNvZGUgPSB2YWx1ZTsgfSBnZXQgeyByZXR1cm4gJ2MnOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIE1vdXNlSU8gTW91c2UgeyBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KGZsb2F0IGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3VzZUhvdmVyLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBtYWluRHJhdy5EcmF3KGYpO1xyXG4gICAgICAgICAgICBtYWluRHJhdy5Nb3VzZSA9IE1vdXNlO1xyXG4gICAgICAgICAgICBpZiAobWFpbkRyYXcgPT0gYmF0dGxlUmVuZGVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmF0dGxlTWFpbi5Jc092ZXIoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmF0dGxlTWFpbi5Jc1ZpY3RvcnkoKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZpY3VsdHkrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0U2NyZWVuLkVudGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkRyYXcgPSByZXN1bHRTY3JlZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1haW5EcmF3ID09IHJlc3VsdFNjcmVlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdFNjcmVlbi53YW5uYUxlYXZlID09IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWFpbkRyYXcgPT0gbW9kZVNlbGVjdGlvblNjcmVlbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vZGVTZWxlY3Rpb25TY3JlZW4ud2FubmFMZWF2ZSA9PSAxKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYWluRHJhdy5HZXRCb2FyZCgpO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIE1vdXNlSU8gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX01vdXNlPW5ldyBNb3VzZUlPKCk7fVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBSZXN1bHRTY3JlZW4gOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcbiAgICAgICAgc3RyaW5nIHlvdVdpbiA9IFwiWW91IFdpblwiO1xyXG4gICAgICAgIHB1YmxpYyBNb3VzZUlPIE1vdXNlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBzdHJpbmcgeW91TG9zZSA9IFwiWW91IGxvc2VcIjtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlUmVzdWx0IGJhdHRsZVJlc3VsdDtcclxuICAgICAgICBwdWJsaWMgUmVzdWx0U2NyZWVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZCA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkluaXQoNzAsIDI1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGludCB3YW5uYUxlYXZlO1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0IHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0VW5pY29kZSB7IHNldDsgZ2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEVudGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKElucHV0VW5pY29kZSA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0cmluZyBtZXNzYWdlID0geW91V2luO1xyXG4gICAgICAgICAgICBpZiAoYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAyKSBtZXNzYWdlID0geW91TG9zZTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIobWVzc2FnZSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuQm9hcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGVzdEdhbWUgOiBJVGV4dEdhbWVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVGV4dFNjcmVlbkhvbGRlciBTY3JlZW5Ib2xkZXIgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlIEdldFBhbGV0dGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIERlZmF1bHRQYWxldHRlcy5DNE5vdmVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdChpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0U2NyZWVuTiBzY3JlZW4gPSBuZXcgVGVzdFNjcmVlbigpO1xyXG4gICAgICAgICAgICBTY3JlZW5Ib2xkZXIuU2V0QWxsKHNjcmVlbik7XHJcbiAgICAgICAgICAgIHNjcmVlbi5Jbml0KHcsIGgpO1xyXG4gICAgICAgICAgICBzY3JlZW4uR2V0Qm9hcmQoKS5EcmF3KFwiVGVzdFwiLCAwLDAsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgVGV4dFNjcmVlbkhvbGRlciBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fU2NyZWVuSG9sZGVyPW5ldyBUZXh0U2NyZWVuSG9sZGVyKCk7fVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUZXN0U2NyZWVuIDogVGV4dFNjcmVlbk5cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZy5HYW1lU2NyZWVuO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlR1cm5CYXNlZC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNb2RlU2VsZWN0aW9uU2NyZWVuIDogSVRleHRTY3JlZW5fXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0V29ybGQgdGV4dFdvcmxkO1xyXG4gICAgICAgIHN0cmluZyB5b3VXaW4gPSBcIllvdSBXaW5cIjtcclxuICAgICAgICBzdHJpbmcgeW91TG9zZSA9IFwiWW91IGxvc2VcIjtcclxuICAgICAgICBwdWJsaWMgTW91c2VJTyBNb3VzZSB7IHNldDsgZ2V0OyB9XHJcbiAgICAgICAgaW50IHNlbGVjdGlvbjtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlUmVzdWx0IGJhdHRsZVJlc3VsdDtcclxuICAgICAgICBwdWJsaWMgTW9kZVNlbGVjdGlvblNjcmVlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQgPSBuZXcgVGV4dFdvcmxkKCk7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5Jbml0KDcwLCAyNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgd2FubmFMZWF2ZTtcclxuICAgICAgICBwdWJsaWMgaW50IG1vZGU7XHJcbiAgICAgICAgcHVibGljIGJvb2wgdGltZUF0dGFjayA9IGZhbHNlO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgc2NyZWVuU3RhZ2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXQgeyBzZXQ7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyBnZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRW50ZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2FubmFMZWF2ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KGZsb2F0IGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLlJlc2V0KCk7XHJcbiAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkgaWsgPSAoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleSkgSW5wdXQ7XHJcbiAgICAgICAgICAgIG1vZGUgPSAtMTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3KFwiUHJvZ0JhdHRsZSBQcm90b3R5cGUgdjAuM1wiLCAxLCAxLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhdyhcIkEgZ2FtZSBieSBQaWRyb2hcIiwgMSwgMiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICBpZiAoc2NyZWVuU3RhZ2UgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChpaylcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkxFRlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmVlblN0YWdlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUF0dGFjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuUklHSFQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmVlblN0YWdlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUF0dGFjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5ET1dOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXR0YWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5VUDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVBdHRhY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIlt3XSBWYW5pbGxhXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA0LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbYV0gRWxlbWVudGFsXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA1LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbc10gVmFuaWxsYSBUaW1lIEF0dGFja1wiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNiwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW2RdIEVsZW1lbnRhbCBUaW1lIEF0dGFja1wiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNywgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2NyZWVuU3RhZ2UgPT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlrID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuVVApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaWsgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5ET1dOKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlblN0YWdlID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiRWxlbWVudGFsIE1vZGVcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IC01KTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiRmlyZSBiZWF0cyBJY2UsIEljZSBiZWF0cyBUaHVuZGVyLCBUaHVuZGVyIGJlYXRzIGZpcmVcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IC0yKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiU2FtZSBlbGVtZW50ID0gbm8gZGFtYWdlXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiAwKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiSXQgaXMgYmVzdCB0byBoYXZlIGhhZCBzb21lIGV4cGVyaWVuY2Ugd2l0aCB2YW5pbGxhIG1vZGVcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDEpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbd10gU3RhcnQgRWxlbWVudGFsIE1vZGVcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDQsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIltzXSBHbyBiYWNrXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA1LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKG1vZGUgPj0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2FubmFMZWF2ZSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vc3RyaW5nIG1lc3NhZ2UgPSB5b3VXaW47XHJcbiAgICAgICAgICAgIC8vaWYgKGJhdHRsZVJlc3VsdC5yZXN1bHQgPT0gMikgbWVzc2FnZSA9IHlvdUxvc2U7XHJcbiAgICAgICAgICAgIC8vdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIobWVzc2FnZSwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZSA9IC0xO1xyXG4gICAgICAgICAgICB3YW5uYUxlYXZlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHRXb3JsZC5tYWluQm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJsaW5rQW5pbSA6IFRleHRBbmltYXRpb248QmxpbmtBbmltLkJsaW5rRGF0YT5cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIEJsaW5rRGF0YSBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGEsIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICBmbG9hdCBhdXggPSBwcm9ncmVzcztcclxuICAgICAgICAgICAgYm9vbCBibGluayA9IHRydWU7XHJcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmxpbmspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4IC09IG1haW5EYXRhLmJsaW5rQWN0aXZlVGltZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXggLT0gbWFpbkRhdGEuYmxpbmtJbmFjdGl2ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhdXggPCAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsaW5rID0gIWJsaW5rO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghYmxpbmspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVudGl0eS5BbmltYXRpb24uU2V0QWxsKG1haW5EYXRhLnRleHQsIG1haW5EYXRhLnRleHRDb2xvciwgbWFpbkRhdGEuYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgQmxpbmtEYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY2hhciB0ZXh0O1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGJhY2tDb2xvciwgdGV4dENvbG9yO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgYmxpbmtBY3RpdmVUaW1lO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgYmxpbmtJbmFjdGl2ZTtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBCbGlua0RhdGEoY2hhciB0ZXh0LCBpbnQgYmFja0NvbG9yLCBpbnQgdGV4dENvbG9yLCBmbG9hdCBibGlua0FjdGl2ZVRpbWUsIGZsb2F0IGJsaW5rSW5hY3RpdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tDb2xvciA9IGJhY2tDb2xvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbG9yID0gdGV4dENvbG9yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ibGlua0FjdGl2ZVRpbWUgPSBibGlua0FjdGl2ZVRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsaW5rSW5hY3RpdmUgPSBibGlua0luYWN0aXZlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIEJsaW5rRGF0YSBCYWNrQ29sb3IoaW50IGJhY2tDb2xvciwgZmxvYXQgYmxpbmtEdXJhdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCbGlua0RhdGEoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgYmFja0NvbG9yLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgYmxpbmtEdXJhdGlvbiwgYmxpbmtEdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgQmxpbmtEYXRhIENoYXIoY2hhciBjLCBmbG9hdCBibGlua0R1cmF0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJsaW5rRGF0YShjLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIGJsaW5rRHVyYXRpb24sIGJsaW5rRHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ2hhckJ5Q2hhckFuaW1hdGlvbiA6IFRleHRBbmltYXRpb248Q2hhckJ5Q2hhckFuaW1hdGlvbi5DaGFyQnlDaGFyRGF0YT5cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIENoYXJCeUNoYXJEYXRhIG1haW5EYXRhLCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Nb2RpZnkoZW50aXR5LCBtYWluRGF0YSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgICAgIGZsb2F0IHJhdGlvID0gcHJvZ3Jlc3MgLyBsZW5ndGg7XHJcbiAgICAgICAgICAgIGZsb2F0IGxlbmd0aFRleHQgPSBtYWluRGF0YS5jaGFyRW5kIC0gbWFpbkRhdGEuY2hhclN0YXJ0O1xyXG4gICAgICAgICAgICBpbnQgbGluZUJyZWFrcyA9IDA7XHJcbiAgICAgICAgICAgIGludCBvZmZzZXRlZFBlcm0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gbWFpbkRhdGEuY2hhclN0YXJ0OyBpIDwgbWFpbkRhdGEuY2hhckVuZDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgb2Zmc2V0ZWQgPSBpICsgb2Zmc2V0ZWRQZXJtO1xyXG4gICAgICAgICAgICAgICAgaW50IGxpbmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRiID0gZW50aXR5LkFuaW1hdGlvbjtcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChvZmZzZXRlZCA+PSB0Yi5XaWR0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lKys7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ZWQgLT0gdGIuV2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZW50aXR5Lk9yaWdpbi5DaGFyQXQob2Zmc2V0ZWQsIGxpbmUgKyBsaW5lQnJlYWtzKSA9PSAnXFxuJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWtzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ZWRQZXJtIC09IG9mZnNldGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldGVkID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpID4gKChsZW5ndGhUZXh0ICogcmF0aW8pICsgbWFpbkRhdGEuY2hhclN0YXJ0KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0Yi5EcmF3Q2hhcignICcsIG9mZnNldGVkLCBsaW5lICsgbGluZUJyZWFrcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90Yi5EcmF3KFwiXCIgKyBpLCA2LCA1LCAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgQ2hhckJ5Q2hhckRhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludGVybmFsIGludCBjaGFyU3RhcnQ7XHJcbiAgICAgICAgICAgIGludGVybmFsIGludCBjaGFyRW5kO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIENoYXJCeUNoYXJEYXRhKGludCBjaGFyU3RhcnQsIGludCBjaGFyRW5kKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJTdGFydCA9IGNoYXJTdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhckVuZCA9IGNoYXJFbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0KfQo=
