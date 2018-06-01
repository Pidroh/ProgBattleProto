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
                //colors[i] = "#1f2026";
                BridgeBuild.App.colors[System.Array.index(i, BridgeBuild.App.colors)] = Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(i, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)];
            }
            //colors[Colors.Board] = "#705373";
            //colors[Colors.Hero]      = "#7ee5da";
            //colors[Colors.GridHero]  = "#2d4eb3";
            //colors[Colors.GridEnemy] = "#732e5c";
            //colors[Colors.Enemy] = "#e5c17e";

            //colors[Colors.inputKey] = "#c2cc52";
            //colors[Colors.WindowLabel] = "#705373";
            //colors[Colors.HeroTurn] = colors[Colors.Hero];
            //colors[Colors.EnemyTurn] = colors[Colors.Enemy];


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
                var ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.NONE;
                //Console.Write(unicode);

                switch (unicode) {
                    case 32: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.DONE;
                        break;
                    case 102: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.FIRE;
                        break;
                    case 103: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.NORMALSHOT;
                        break;
                    case 105: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.ICE;
                        break;
                    case 116: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.THUNDER;
                        break;
                    case 119: 
                    case 38: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.UP;
                        break;
                    case 97: 
                    case 37: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.LEFT;
                        break;
                    case 115: 
                    case 40: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.DOWN;
                        break;
                    case 39: 
                    case 100: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.RIGHT;
                        break;
                    case 114: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.REDO;
                        break;
                    default: 
                        break;
                }
                //buffer = a.CharCode;
                BridgeBuild.App.buffer = ik;
                BridgeBuild.App.bufferOn = true;
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
                colors: null
            },
            methods: {
                SetupGame: function (gr, TextBoard) {

                    var rnd = new System.Random.ctor();
                    Pidroh.BaseUtils.RandomSupplier.Generate = function () {
                        return rnd.NextDouble();
                    };
                    gr.v = new Pidroh.ConsoleApp.Turnbased.GameMain();
                    TextBoard.v = gr.v.GetBoard();

                },
                TestEntitySystem: function () {

                },
                UpdateGame: function () {
                    BridgeBuild.App.TextBoard = BridgeBuild.App.gr.GetBoard();
                    BridgeBuild.App.gr.Draw(0.033);
                    if (BridgeBuild.App.bufferOn) {
                        BridgeBuild.App.gr.Input = (BridgeBuild.App.buffer) & 65535;
                        BridgeBuild.App.bufferOn = false;
                    } else {
                        BridgeBuild.App.gr.Input = 0;
                    }
                    clear();
                    for (var j = 0; j < BridgeBuild.App.TextBoard.Height; j = (j + 1) | 0) {
                        for (var i = 0; i < BridgeBuild.App.TextBoard.Width; i = (i + 1) | 0) {
                            draw(i, j, BridgeBuild.App.colors[System.Array.index(BridgeBuild.App.TextBoard.TextColor.get([i, j]), BridgeBuild.App.colors)], BridgeBuild.App.colors[System.Array.index(BridgeBuild.App.TextBoard.BackColor.get([i, j]), BridgeBuild.App.colors)], "" + String.fromCharCode(BridgeBuild.App.TextBoard.CharAt(i, j)));
                            //sb.Append(TextBoard.CharAt(i, j));

                        }
                    }
                    //Console.Write("...");
                    //text.InnerHTML = sb.ToString();
                    window.setTimeout(BridgeBuild.App.UpdateGame, 33);
                }
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
            ctor: function (area) {
                this.$initialize();
                this.area = area;
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
            playerHand: null,
            attackDatas: null,
            timeToChooseMax: 0,
            timeToChoose: 0,
            battleResult: null,
            nEnemies: 0,
            MoveDataExecuter: null,
            ecs: null,
            timeStamp: null,
            EnemyFactory: null,
            EnemyGenerateMoves: null
        },
        ctors: {
            init: function () {
                this.entities = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity)).ctor();
                this.battleState = new Pidroh.ConsoleApp.Turnbased.BattleMain.BattleState();
                this.happManager = new Pidroh.ConsoleApp.Turnbased.Happs.HappManager();
                this.movementMoves = new (System.Collections.Generic.Dictionary$2(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType,Pidroh.BaseUtils.Vector2D))();
                this.inputs = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.Input)).ctor();
                this.playerHand = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)).ctor();
                this.attackDatas = System.Array.init([new Pidroh.ConsoleApp.Turnbased.BattleMain.AttackMove.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder), new Pidroh.ConsoleApp.Turnbased.BattleMain.AttackMove.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire), new Pidroh.ConsoleApp.Turnbased.BattleMain.AttackMove.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.Element.None, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot), new Pidroh.ConsoleApp.Turnbased.BattleMain.AttackMove.$ctor1(Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice)], Pidroh.ConsoleApp.Turnbased.BattleMain.AttackMove);
                this.timeToChooseMax = 15.0;
                this.timeToChoose = -1;
                this.battleResult = new Pidroh.ConsoleApp.Turnbased.BattleResult();
            },
            ctor: function (mode, ecs, timeStamp) {
                this.$initialize();
                this.ecs = ecs;
                this.timeStamp = timeStamp;
                ecs.QuickAccessor1(Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity);
                this.movementMoves.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.BaseUtils.Vector2D.UnitY.$clone());
                this.movementMoves.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.BaseUtils.Vector2D.op_UnaryNegation(Pidroh.BaseUtils.Vector2D.UnitY.$clone()));
                this.movementMoves.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.BaseUtils.Vector2D.op_UnaryNegation(Pidroh.BaseUtils.Vector2D.UnitX.$clone()));
                this.movementMoves.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.BaseUtils.Vector2D.UnitX.$clone());

                this.playerHand.clear();
                this.playerHand.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight);
                this.playerHand.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft);
                this.playerHand.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown);
                this.playerHand.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp);

                if (mode === 0) {
                    this.playerHand.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot);
                    this.enemyMoves = System.Array.init([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot], Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType);
                } else {
                    this.playerHand.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire);
                    this.playerHand.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice);
                    this.playerHand.add(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder);

                    this.enemyMoves = System.Array.init([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder], Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType);
                }

                //playerHand.Add(MoveType.NormalShot);

            }
        },
        methods: {
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

                this.EnemyFactory.Spawn();

                //for (int i = 0; i < nEnemies; i++)
                //{
                //    BattleEntity enemy = new BattleEntity();
                //    enemy.pos.Set(3 + i, 1);
                //    enemy.minPos.Set(3, 0);
                //    enemy.maxPos.Set(5, 2);
                //    enemy.life = 2;
                //    enemy.graphic = 1 + i;
                //    enemy.Type = EntityType.enemy;
                //    entities.Add(enemy);
                //}

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
                }if (!heroAlive) {
                    this.battleResult.result = 2;

                } else if (!enemyAlive) {
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
                            for (var i = 0; i < e.moves.length; i = (i + 1) | 0) {
                                e.moves[System.Array.index(i, e.moves)] = -1;
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
                var $t;
                var phase = this.battleState.phase;
                switch (phase) {
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.EnemyMoveChoice: 
                        this.EnemyGenerateMoves();
                        break;
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.HandRecharge: 
                        break;
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands: 
                        this.inputs.clear();
                        $t = Bridge.getEnumerator(this.playerHand);
                        try {
                            while ($t.moveNext()) {
                                var hi = $t.Current;
                                this.inputs.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor2(Pidroh.ConsoleApp.Turnbased.InputType.Move, hi));
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }this.inputs.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))));
                        this.inputs.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))));
                        break;
                    case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ExecuteMove: 
                        this.ExecuteMoves();
                        break;
                    default: 
                        break;
                }
            },
            InputDone: function (input) {
                var $t;
                //Console.Write("INPUTTED");
                if (input.type === Pidroh.ConsoleApp.Turnbased.InputType.Move) {
                    var arg1 = input.arg1;
                    //Console.Write("INPUTTED1");
                    if (this.playerHand.contains(arg1)) {
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

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleMain.AttackMove", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.ConsoleApp.Turnbased.BattleMain.AttackMove(); }
            }
        },
        fields: {
            element: 0,
            moveType: 0
        },
        ctors: {
            $ctor1: function (element, moveType) {
                this.$initialize();
                this.element = element;
                this.moveType = moveType;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3502392602, this.element, this.moveType]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.ConsoleApp.Turnbased.BattleMain.AttackMove)) {
                    return false;
                }
                return Bridge.equals(this.element, o.element) && Bridge.equals(this.moveType, o.moveType);
            },
            $clone: function (to) {
                var s = to || new Pidroh.ConsoleApp.Turnbased.BattleMain.AttackMove();
                s.element = this.element;
                s.moveType = this.moveType;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity", {
        $kind: "nested class",
        fields: {
            life: 0,
            active: null,
            pos: null,
            minPos: null,
            maxPos: null,
            value: null,
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
                ThunderBomb: 10
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
                ThunderShot: 0
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
            ctor: function (mode, battleBasicConfig, difficulty, stages) {
                var $t;
                this.$initialize();
                this.ecs = Pidroh.ECS.ECSManager.Create();
                this.timeStamp = new Pidroh.BaseUtils.TimeStamp();
                this.battleMain = new Pidroh.ConsoleApp.Turnbased.BattleMain(mode, this.ecs, this.timeStamp);
                var mcp = new Pidroh.ConsoleApp.Turnbased.MoveCreatorProg();


                var stage = stages.getItem(difficulty);
                var enmys = stage.enemySpawns;
                $t = Bridge.getEnumerator(enmys);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        this.ecs.CreateEntityWithComponent(item);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.battleMain.MoveDataExecuter = new Pidroh.ConsoleApp.Turnbased.MoveDataExecuter(this.battleMain, mcp.moveDatas, this.ecs, this.timeStamp);

                var entityRenderTexts = new (System.Collections.Generic.List$1(System.String)).ctor();

                var enemyDatas = new Pidroh.ConsoleApp.Turnbased.EnemyDataCreator(entityRenderTexts).enemyDatas;
                var battleState = this.battleMain.battleState;

                this.battleMain.BasicConfig(battleBasicConfig);


                var enemyFactory = new Pidroh.ConsoleApp.Turnbased.EnemyEntityFactory(this.ecs, enemyDatas, this.battleMain);
                this.battleMain.EnemyFactory = enemyFactory;

                var enemyAis = this.ecs.QuickAccessor2(Pidroh.ConsoleApp.Turnbased.EnemyAI, Pidroh.ConsoleApp.Turnbased.BattleMain.BattleEntity);
                var enemyAiStateless = this.ecs.CreateAccessor(System.Array.init([Pidroh.ConsoleApp.Turnbased.EnemyAI], Function), System.Array.init([Pidroh.ConsoleApp.Turnbased.EnemyAIState], Function));
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
                        Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(i, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#131313";
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
            enemyDatas: null
        },
        ctors: {
            init: function () {
                this.enemyDatas = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.EnemyData)).ctor();
            },
            ctor: function (renderTexts) {
                this.$initialize();
                this.renderTexts = renderTexts;

                this.AddEnemy(this.Actions([this.Moves([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder])]), 2, "%");
                this.AddEnemy(this.Actions([this.Moves([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing])]), 3, "#");
                this.AddEnemy(this.Actions([this.Moves([Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight])]), 6, "&");
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
                            }} else {
                            ai.moves.add(o);
                        }
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

    Bridge.define("Pidroh.ConsoleApp.Turnbased.EnemyEntityFactory", {
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
                this.spawns = ecs.QuickAccessor1(Pidroh.ConsoleApp.Turnbased.EnemySpawnData);
                this.enemyDatas = enemyDatas;
                this.battleMain = battleMain;
            }
        },
        methods: {
            Spawn: function () {
                var $t;
                for (var i = 0; i < this.spawns.Count; i = (i + 1) | 0) {
                    var spawn = this.spawns.Comp1(i);
                    var id = spawn.enemyId;
                    var enemyAI = this.enemyDatas.getItem(id).enemyAI;
                    var enemy = this.ecs.CreateEntityWithComponent(enemyAI);
                    var be = this.battleMain.NewBattleEntity();
                    be.pos = spawn.position.$clone();
                    be.life = this.enemyDatas.getItem(id).hp;
                    be.maxLife = be.life;
                    be.graphic = this.enemyDatas.getItem(id).render;
                    var entities = this.battleMain.entities;
                    $t = Bridge.getEnumerator(entities);
                    try {
                        while ($t.moveNext()) {
                            var item = $t.Current;
                            if (!Bridge.referenceEquals(item, be) && item.graphic === be.graphic) {
                                be.graphicRepeatedIndex = (be.graphicRepeatedIndex + 1) | 0;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }be.minPos = new Pidroh.BaseUtils.Vector2D.$ctor2(3, 0);
                    be.maxPos = new Pidroh.BaseUtils.Vector2D.$ctor2(5, 2);
                    be.Type = Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy;
                    Pidroh.ECS.ExtensionMethods.AddComponent$1(enemy, be);
                    var enemyAiState = new Pidroh.ConsoleApp.Turnbased.EnemyAIState();
                    enemyAiState.progress = i;
                    Pidroh.ECS.ExtensionMethods.AddComponent$1(enemy, enemyAiState);
                    //Console.Write("SPAWN");

                }
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.EnemySpawnData", {
        fields: {
            enemyId: 0,
            position: null
        },
        ctors: {
            init: function () {
                this.position = new Pidroh.BaseUtils.Vector2D();
            },
            ctor: function (enemyId, position) {
                this.$initialize();
                this.enemyId = enemyId;
                this.position = position.$clone();
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

    Bridge.define("Pidroh.ConsoleApp.Turnbased.InputType", {
        $kind: "enum",
        statics: {
            fields: {
                Move: 0,
                MiscBattle: 1
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

                this.NewMoveData$1("Firegun", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire)]), this.TagArray([Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Shoot, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));
                this.NewMoveTextRenderData("Firegun", "FG");

                this.NewMoveData$1("Icegun", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice)]), this.TagArray([Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Shoot, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));
                this.NewMoveTextRenderData("Icegun", "IG");

                this.NewMoveData$1("Thundergun", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.$ctor1(Pidroh.ConsoleApp.Turnbased.Target.ClosestTargetX, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder)]), this.TagArray([Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Shoot, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));
                this.NewMoveTextRenderData("Thundergun", "TG");

                var area = this.AreaUser().RowForward(1, 3);
                this.NewMoveData$1("Icebomb", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.ctor(area), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.ctor(area, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice)]), this.TagArray([Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Bomb, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));
                this.NewMoveTextRenderData("Icebomb", "IB");

                this.NewMoveData$1("Thunderbomb", this.OneTickPerAction([new Pidroh.ConsoleApp.Turnbased.Animation.ctor(area), new Pidroh.ConsoleApp.Turnbased.DealDamageAction.ctor(area, 1, Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder)]), this.TagArray([Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Bomb, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));
                this.NewMoveTextRenderData("Thunderbomb", "TB");
            }
        },
        methods: {
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
                        if (Bridge.referenceEquals(moveDatas.getItem(i).label, label)) {
                            return i;
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
            turnBase: null,
            moveDatas: null,
            happManager: null,
            entities: null,
            ecs: null,
            timeStamp: null
        },
        ctors: {
            ctor: function (turnBase, moveDatas, ecs, timeStamp) {
                this.$initialize();
                this.turnBase = turnBase;
                this.moveDatas = moveDatas;
                this.ecs = ecs;
                this.timeStamp = timeStamp;
            }
        },
        methods: {
            ExecuteMove: function (actor, turn) {
                var $t, $t1, $t2;


                var battleState = this.turnBase.battleState;
                this.entities = this.turnBase.entities;
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
                this.happManager = this.turnBase.happManager;

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


                                this.turnBase.happManager.Add(new Pidroh.ConsoleApp.Turnbased.Happs.Happ(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag.MovementFail, Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag)))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(actorId)).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(actor.pos.X)).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(actor.pos.Y));

                                battleState.moveTick_Total = 1;
                                actor.pos = Pidroh.BaseUtils.Vector2D.op_Subtraction(actor.pos.$clone(), p.$clone());
                            }
                        }
                        if (Bridge.is(a, Pidroh.ConsoleApp.Turnbased.DealDamageAction)) {
                            var dda = Bridge.as(a, Pidroh.ConsoleApp.Turnbased.DealDamageAction);
                            var attackElement = dda.element;
                            actor.element = attackElement;
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

            },
            CreateHapp: function (md, comp1, comp2) {
                var th = new Pidroh.ConsoleApp.Turnbased.HappTags(md.tags);
                var e = this.ecs.CreateEntityWithComponent$1(th, this.timeStamp.GetSnap());
                if (comp1 != null) {
                    Pidroh.ECS.ExtensionMethods.AddComponent$1(e, comp1);
                }
                if (comp2 != null) {
                    Pidroh.ECS.ExtensionMethods.AddComponent$1(e, comp2);
                }
            },
            DealDamage: function (actor, dda, target) {
                var elementalBlock = actor.element === target.element && actor.element !== Pidroh.ConsoleApp.Turnbased.BattleMain.Element.None;
                if (elementalBlock) {
                }
                {
                    if (!elementalBlock) {
                        var mul = this.turnBase.CalculateAttackMultiplier(actor);
                        mul *= this.turnBase.CalculateDefenderMultiplier(target);
                        if ((actor.element === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire && target.element === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice) || (actor.element === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder && target.element === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Fire) || (actor.element === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Ice && target.element === Pidroh.ConsoleApp.Turnbased.BattleMain.Element.Thunder)) {
                            mul *= 3;
                        }


                        target.life = (target.life - (Bridge.Int.mul(dda.damage, Bridge.Int.clip32(mul)))) | 0;
                        actor.damageMultiplier = 1;
                        this.happManager.Add(new Pidroh.ConsoleApp.Turnbased.Happs.Happ(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag.DamageTaken, Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag)))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(this.entities.indexOf(target)));
                    }
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
                Bomb: 3
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

    Bridge.define("Pidroh.ConsoleApp.Turnbased.StageData", {
        fields: {
            enemySpawns: null
        },
        ctors: {
            init: function () {
                this.enemySpawns = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.EnemySpawnData)).ctor();
            },
            ctor: function (spawns) {
                if (spawns === void 0) { spawns = []; }

                this.$initialize();
                this.enemySpawns.AddRange(spawns);
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.StageDataCreator", {
        fields: {
            stages: null
        },
        ctors: {
            init: function () {
                this.stages = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.StageData)).ctor();
            },
            ctor: function () {
                this.$initialize();
                this.Add([new Pidroh.ConsoleApp.Turnbased.StageData([new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(0, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 0))]), new Pidroh.ConsoleApp.Turnbased.StageData([new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(0, new Pidroh.BaseUtils.Vector2D.$ctor2(4, 1)), new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(1, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]), new Pidroh.ConsoleApp.Turnbased.StageData([new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(0, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 0)), new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(0, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 2))]), new Pidroh.ConsoleApp.Turnbased.StageData([new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(1, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 2)), new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(2, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))]), new Pidroh.ConsoleApp.Turnbased.StageData([new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(0, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 2)), new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(2, new Pidroh.BaseUtils.Vector2D.$ctor2(3, 1)), new Pidroh.ConsoleApp.Turnbased.EnemySpawnData(2, new Pidroh.BaseUtils.Vector2D.$ctor2(5, 1))])]);

            }
        },
        methods: {
            Add: function (stageData1) {
                if (stageData1 === void 0) { stageData1 = []; }
                this.stages.AddRange(stageData1);
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
                this.CreateEntity(e);
                this.AddComponent(e.v, v);
                return e.v;
            },
            CreateEntityWithComponent$1: function (v, v2) {
                var e = { v : new Pidroh.ECS.Entity() };
                this.CreateEntity(e);
                this.AddComponent(e.v, v);
                this.AddComponent(e.v, v2);
                return e.v;
            },
            CreateEntity: function (e) {
                this.entityIdMax = (this.entityIdMax + 1) | 0;
                var entity = new Pidroh.ECS.Entity.$ctor1(this.ECSId, this.entityIdMax);
                e.v = entity;
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
            Draw_Cursor_UnicodeLabel: function (v, color) {
                var len = this.DrawUnicodeLabel(v, this.cursorX, this.cursorY, color);
                for (var i = 0; i < len; i = (i + 1) | 0) {
                    this.AdvanceCursor();
                }

            },
            DrawUnicodeLabel: function (unicode, x, y, color) {
                if (unicode >= 97 && unicode <= 122) {
                    this.DrawChar$1((unicode & 65535), x, y, color);
                    return 1;
                }
                var label = "";
                if (unicode === 32) {
                    label = "space";
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
                var endIndex = (offEnd + 1) | 0;
                var start = new Pidroh.BaseUtils.Vector2D.$ctor2(this.CursorX, this.CursorY);
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
            DrawGrid: function (x, y, width, height, color) {

                this.DrawRepeated(124, x, y, 1, height, color);
                this.DrawRepeated(124, ((((x + width) | 0) - 1) | 0), y, 1, height, color);
                this.DrawRepeated(45, x, y, width, 1, color);
                this.DrawRepeated(45, x, ((((y + height) | 0) - 1) | 0), width, 1, color);
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
            handlers: null
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
                var happs = this.ecs.QuickAccessor2(Pidroh.ConsoleApp.Turnbased.HappTags, Pidroh.BaseUtils.TimeStampSnap);
                var highestHandled = -1;
                var moveMiss = function (e) {
                    //Console.WriteLine("HANDLE!3");
                    var hmd = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.HappMoveData, e);
                    var hmf = Pidroh.ECS.ExtensionMethods.GetComponent(Pidroh.ConsoleApp.Turnbased.HappMovementFail, e);
                    var eId = hmd.user;
                    var mover = battleMain.entities.getItem(eId);

                    var pos = mover.PositionV2D.$clone();
                    var pos2 = hmf.moveTo.$clone();
                    var posF = Pidroh.BaseUtils.Vector2D.op_Division$1((Pidroh.BaseUtils.Vector2D.op_Addition(pos.$clone(), pos2.$clone())), 2);

                    var fe = battleRender.battlerEntities[System.Array.index(eId, battleRender.battlerEntities)];
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
                    blinkAnim.Add$1(useEffect.AnimBase(0.5), Pidroh.TextRendering.BlinkAnim.BlinkData.BackColor(2, 0.15));
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
                            blinkAnim.Add$1(entity.AnimBase(0.5), Pidroh.TextRendering.BlinkAnim.BlinkData.BackColor(2, 0.15));
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }}, [Bridge.box(Pidroh.ConsoleApp.Turnbased.MoveDataTags.Bomb, Pidroh.ConsoleApp.Turnbased.MoveDataTags, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MoveDataTags))]));

                this.Handle = Bridge.fn.bind(this, function () {
                    var $t;
                    //Console.WriteLine("HANDLE!");
                    var newHighestHandled = highestHandled;
                    for (var i = 0; i < happs.Length; i = (i + 1) | 0) {
                        var tags = happs.Comp1(i);
                        if (happs.Comp2(i).TimeSnap > highestHandled) {
                            newHighestHandled = happs.Comp2(i).TimeSnap;
                            //Console.WriteLine("HANDLE!");
                            $t = Bridge.getEnumerator(this.handlers);
                            try {
                                while ($t.moveNext()) {
                                    var han = $t.Current;
                                    //Console.WriteLine("HANDLE!x");
                                    if (han.CanHandle(tags.tags)) {
                                        //Console.WriteLine(happs.Comp2(i).TimeSnap + " - " + time.CurrentSnap);
                                        //Console.WriteLine("HANDLE!2");
                                        han.Handler(happs.Entity(i));
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
                    highestHandled = newHighestHandled;
                });

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
            posAnim: null,
            textWorld: null,
            TextBoard: null,
            input: 0,
            HappHandling: null,
            moveChars: null,
            moveDescriptions: null,
            miscDescriptions: null,
            moveButtons: null,
            moveKeys: null,
            debugOn: false,
            gridScale: 0,
            gridOffsetx: 0,
            gridOffsety: 0,
            battlerEntities: null,
            entitiesChars: null
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
            "Draw", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Draw",
            "GetBoard", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$GetBoard"
        ],
        ctors: {
            init: function () {
                this.moveDescriptions = new (System.Collections.Generic.Dictionary$2(System.Object,System.String))();
                this.miscDescriptions = function (_o1) {
                        _o1.add(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done, "Done");
                        _o1.add(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo, "Redo");
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(Pidroh.ConsoleApp.Turnbased.MiscBattleInput,System.String))());
                this.debugOn = true;
            },
            ctor: function (battleLogic) {
                var $t;
                this.$initialize();

                var entityTexts = System.Array.init([
                    "@", 
                    "&", 
                    "%", 
                    "$", 
                    "X2", 
                    "X3"
                ], System.String);
                this.entitiesChars = System.Array.init(entityTexts.length, null, System.Array.type(System.Char));
                for (var i = 0; i < entityTexts.length; i = (i + 1) | 0) {
                    this.entitiesChars[System.Array.index(i, this.entitiesChars)] = ($t = entityTexts[System.Array.index(i, entityTexts)], System.String.toCharArray($t, 0, $t.length));
                }

                this.turnBaseTry = battleLogic;

                this.textWorld = new Pidroh.TextRendering.TextWorld();
                this.posAnim = this.textWorld.AddAnimation(Bridge.global.Pidroh.TextRendering.PositionAnimation, new Pidroh.TextRendering.PositionAnimation());
                this.textWorld.Init(70, 25);
                this.TextBoard = this.textWorld.mainBoard;
                //TextBoard = new TextBoard(70, 25);

                //var posAnim = textWorld.AddAnimation(new PositionAnimation());
                var blinkAnim = this.textWorld.AddAnimation(Bridge.global.Pidroh.TextRendering.BlinkAnim, new Pidroh.TextRendering.BlinkAnim());

                this.battlerEntities = System.Array.init(this.turnBaseTry.entities.Count, null, Pidroh.TextRendering.TextEntity);
                for (var i1 = 0; i1 < this.battlerEntities.length; i1 = (i1 + 1) | 0) {
                    this.battlerEntities[System.Array.index(i1, this.battlerEntities)] = this.textWorld.GetFreeEntity(2, 2);
                }

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

                this.turnBaseTry.happManager.AddHandler(new Pidroh.ConsoleApp.Turnbased.Happs.HappHandler(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag.DamageTaken, Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.HappTag)), Bridge.fn.bind(this, function (h) {
                    var defender = this.turnBaseTry.entities.getItem(h.GetAttribute_Int(0));
                    var fe = this.textWorld.GetTempEntity(1, 1);
                    fe.Origin.DrawChar(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, 0, 0);
                    fe.Origin.Position = this.BattleEntityToScreenPosition(defender.PositionV2D.$clone());
                    blinkAnim.Add$1(fe.AnimBase(0.5), Pidroh.TextRendering.BlinkAnim.BlinkData.Char(32, 0.1));
                })));

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

                //turnBaseTry.happManager.AddHandler(new Happs.HappHandler(BattleMain.HappTag.MovementFail, (h) =>
                //{
                //    int eId = h.GetAttribute_Int(0);
                //    var mover = turnBaseTry.entities[eId];
                //    var x = h.GetAttribute_Int(1);
                //    var y = h.GetAttribute_Int(2);
                //    var pos = mover.PositionV2D;
                //    var pos2 = new BaseUtils.Vector2D((float)x, (float)y);
                //    var posF = (pos + pos2) / 2;

                //    var fe = battlerEntities[eId];
                //    //Console.WriteLine("Move fail");
                //    posAnim.Add(fe.AnimBase(0.2f), new PositionAnimation.PositionData(
                //        BattleEntityToScreenPosition(mover.PositionV2D),
                //        BattleEntityToScreenPosition(posF)));
                //}));

                this.moveChars = function (_o2) {
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "F");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "I");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "T");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "G");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), ">");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "^");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "v");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "<");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "IB");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "TB");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.DoNothing, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), " ");
                        return _o2;
                    }(new (System.Collections.Generic.Dictionary$2(System.Object,System.String))());

                this.moveDescriptions = function (_o3) {
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Ice Shot");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Fire Shot");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Thunder Shot");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Ice Bomb");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Gun");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), ">");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "^");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "v");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "<");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType)), "Thunder Bomb");
                        return _o3;
                    }(new (System.Collections.Generic.Dictionary$2(System.Object,System.String))());

                this.moveButtons = function (_o4) {
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), "g");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), "f");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), "i");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.IceBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), "b");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.ThunderBomb, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), "y");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), "t");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), "d");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), "w");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), "s");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), "a");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))), "Space");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))), "r");
                        return _o4;
                    }(new (System.Collections.Generic.Dictionary$2(Pidroh.ConsoleApp.Turnbased.Input,System.String))());

                this.moveKeys = function (_o5) {
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Thunder, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.THUNDER);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.ICE);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.FIRE);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.NormalShot, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.NORMALSHOT);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.RIGHT);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.UP);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.DOWN);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.BattleMain.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.LEFT);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.DONE);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.REDO);
                        return _o5;
                    }(new (System.Collections.Generic.Dictionary$2(Pidroh.ConsoleApp.Turnbased.Input,Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey))());

                //Console.ReadLine();
            }
        },
        methods: {
            GetProjTextEntity: function (element) {
                var fe = this.textWorld.GetTempEntity(1, 1);
                fe.Origin.DrawChar(Pidroh.TextRendering.TextBoard.INVISIBLECHAR, 0, 0);
                var elementColor = Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToProjColor(element);
                fe.Origin.SetBackColor(elementColor, 0, 0);
                return fe;
            },
            Draw: function (delta) {
                var $t;

                var input = this.Input;
                //if (input != InputKey.NONE) Console.WriteLine(input);
                //int inputNumber = input - '0';
                //if (debugOn && input == 'k')
                //{
                //    DebugExtra.DebugEx.Show();
                //}
                if (this.textWorld.IsDone()) {
                    switch (this.turnBaseTry.battleState.phase) {
                        case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.EnemyMoveChoice: 
                            this.turnBaseTry.Tick();
                            break;
                        case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.HandRecharge: 
                            this.turnBaseTry.Tick();
                            break;
                        case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands: 
                            $t = Bridge.getEnumerator(this.moveKeys);
                            try {
                                while ($t.moveNext()) {
                                    var item = $t.Current;
                                    if (item.value === input) {

                                        this.turnBaseTry.InputDone(item.key);
                                    }
                                }
                            } finally {
                                if (Bridge.is($t, System.IDisposable)) {
                                    $t.System$IDisposable$Dispose();
                                }
                            }break;
                        case Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ExecuteMove: 
                            //System.Threading.Thread.Sleep(300);
                            this.turnBaseTry.Tick();
                            break;
                        default: 
                            break;
                    }
                }

                this.DrawGraphics(delta);

            },
            DrawGraphics: function (delta) {
                this.turnBaseTry.Update(delta);
                //clear grid
                this.TextBoard.Reset();

                this.gridScale = 4;
                this.gridOffsetx = 2;
                this.gridOffsety = 1;
                var enemyGridOffX = Bridge.Int.mul(this.gridScale, 3);
                var drawDot = false;
                for (var i = 0; i < Bridge.Int.mul(3, this.gridScale); i = (i + 1) | 0) {
                    for (var j = 0; j < Bridge.Int.mul(3, this.gridScale); j = (j + 1) | 0) {
                        if (drawDot) {
                            this.TextBoard.DrawChar$1(46, ((this.gridOffsetx + i) | 0), ((this.gridOffsety + j) | 0), Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero);
                            this.TextBoard.DrawChar$1(46, ((((this.gridOffsetx + i) | 0) + enemyGridOffX) | 0), ((this.gridOffsety + j) | 0), Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridEnemy);
                        }
                        if (i % this.gridScale === 0 && j % this.gridScale === 0) {

                            this.TextBoard.DrawGrid(((((i + this.gridOffsetx) | 0) + enemyGridOffX) | 0), ((j + this.gridOffsety) | 0), ((this.gridScale + 1) | 0), ((this.gridScale + 1) | 0), Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridEnemy);
                            this.TextBoard.DrawGrid(((i + this.gridOffsetx) | 0), ((j + this.gridOffsety) | 0), ((this.gridScale + 1) | 0), ((this.gridScale + 1) | 0), Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero);
                        }
                    }
                }
                //for (int i = 0; i < 6; i++)
                //{
                //    for (int j = 0; j < 3; j++)
                //    {
                //        TextBoard.DrawChar(
                //            ' ',
                //            i * scale + scale / 2,
                //            2 * scale - j * scale + scale / 2);
                //    }
                //}
                // DrawMove entity
                for (var i1 = 0; i1 < this.turnBaseTry.entities.Count; i1 = (i1 + 1) | 0) {

                    var gameEntity = this.turnBaseTry.entities.getItem(i1);

                    var ec = this.GetChar(gameEntity);

                    //if (gameEntity.Dead)
                    //{
                    //    for (int j = 0; j < ec.Length; j++)
                    //    {
                    //        ec[j] = TextBoard.INVISIBLECHAR;
                    //    }
                    //}
                    var pos = gameEntity.PositionV2D.$clone();
                    var screenPos = this.BattleEntityToScreenPosition(pos);
                    if (gameEntity.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.paneleffect) {
                        screenPos.Y = screenPos.Y + 1;
                        screenPos.X = screenPos.X - 1;
                    }
                    //battlerEntities[i].origin.Position = screenPos;
                    if (Pidroh.BaseUtils.Vector2D.op_Inequality(this.battlerEntities[System.Array.index(i1, this.battlerEntities)].Origin.Position.$clone(), screenPos.$clone()) && this.textWorld.IsDone()) {
                        this.posAnim.Add$1(this.battlerEntities[System.Array.index(i1, this.battlerEntities)].AnimBase(0.15), new Pidroh.TextRendering.PositionAnimation.PositionData.$ctor1(this.battlerEntities[System.Array.index(i1, this.battlerEntities)].Origin.Position.$clone(), screenPos.$clone(), true));
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
                            this.battlerEntities[System.Array.index(i1, this.battlerEntities)].Origin.DrawChar$1(32, j1, 0, c, bc);
                        }

                    } else {
                        this.battlerEntities[System.Array.index(i1, this.battlerEntities)].Origin.Draw(ec, 0, 0, c, bc);
                        this.battlerEntities[System.Array.index(i1, this.battlerEntities)].Origin.DrawOneDigit(((gameEntity.graphicRepeatedIndex + 1) | 0), ((0 + ec.length) | 0), 0, c, bc);
                    }


                    //battlerEntities[i].origin.SetColor(c, 0, 0);



                    //TextBoard.DrawChar(
                    //    ec,
                    //    x1,
                    //    y1);
                }


                var textBoardHeight = Bridge.Int.mul(3, this.gridScale);

                {
                    var y = 2;
                    var x = (Bridge.Int.mul(6, this.gridScale) + 26) | 0;

                    if (this.turnBaseTry.battleState.phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.PickHands) {
                        this.DrawControls(y, x);
                        if (this.turnBaseTry.timeToChoose > 0) {
                            var ratio = this.turnBaseTry.timeToChoose / this.turnBaseTry.timeToChooseMax;
                            this.TextBoard.DrawRepeated(32, x, ((y + 16) | 0), Bridge.Int.clip32(ratio * 15), 1, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Board, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero);
                        }
                    } else {
                        this.TextBoard.DrawRepeated(32, ((x - 1) | 0), ((y - 1) | 0), 15, 15, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Board);
                    }
                }

                var turnOrderX = (Bridge.Int.mul(6, this.gridScale) + 10) | 0;
                var turnOrderY = 2;

                this.DrawTurnOrder(turnOrderX, turnOrderY);
                this.DrawLife(3, 16);


                this.TextBoard.CursorNewLine(1);
                this.TextBoard.CursorNewLine(1);
                //textBoard.Draw_Cursor(turnBaseTry.battleState.phase.ToString());

                this.textWorld.DrawChildren();
                this.textWorld.AdvanceTime(delta);
                if (this.textWorld.IsDone()) {
                    this.turnBaseTry.happManager.TryHandle();
                    this.HappHandling.Handle();
                }

            },
            BattleEntityToScreenPosition: function (pos) {
                var x = pos.X;
                var y = pos.Y;
                var screenPos = new Pidroh.BaseUtils.Vector2D.$ctor2(x * this.gridScale + ((Bridge.Int.div(this.gridScale, 2)) | 0) + this.gridOffsetx, Bridge.Int.mul(2, this.gridScale) - y * this.gridScale + ((Bridge.Int.div(this.gridScale, 2)) | 0) + this.gridOffsety);
                return screenPos.$clone();
            },
            DrawControls: function (y, x) {
                this.TextBoard.DrawGrid(((x - 2) | 0), ((y - 1) | 0), 20, 15, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Board);
                this.TextBoard.SetCursorAt(x, y);
                this.TextBoard.Draw_Cursor$3("Controls", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);

                for (var i = 0; i < this.turnBaseTry.inputs.Count; i = (i + 1) | 0) {
                    var x2 = (x + 1) | 0;
                    var y2 = (((y + 2) | 0) + i) | 0;
                    var input = this.turnBaseTry.inputs.getItem(i);
                    var buttonName = { };
                    if (this.moveButtons.tryGetValue(input, buttonName)) {
                    } else {
                        buttonName.v = "UN";
                    }

                    var lengthBname = buttonName.v.length;

                    this.TextBoard.DrawChar$1(91, ((x2 - 1) | 0), y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn);
                    this.TextBoard.DrawChar$1(93, ((x2 + lengthBname) | 0), y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn);

                    //TurnBaseTryValues.MoveType move = turnBaseTry.playerHand[i];

                    this.TextBoard.Draw$1(buttonName.v, x2, y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey);
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
                    this.TextBoard.Draw$1(description.v, ((((x2 + 2) | 0) + lengthBname) | 0), y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn);
                    //var c = moveChars[move];
                    //DrawMove(move, Colors.HeroTurn);
                    //TextBoard.Draw(c, x2 + 3, y2, Colors.HeroTurn);
                    //TextBoard.DrawWithGrid(c+"", x2, y + 2, Colors.HeroTurn);
                }
            },
            DrawLife: function (turnOrderX, turnOrderY) {
                this.TextBoard.DrawGrid(((turnOrderX - 1) | 0), ((turnOrderY - 1) | 0), 20, 9, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);
                this.TextBoard.SetCursorAt(((turnOrderX + 1) | 0), turnOrderY);
                this.TextBoard.Draw_Cursor$3("Life", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);
                this.TextBoard.SetCursorAt(((turnOrderX + 8) | 0), turnOrderY);
                this.TextBoard.Draw_Cursor$3("Element", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);
                var index = -1; //using this because not all units get drawn
                for (var i = 0; i < this.turnBaseTry.entities.Count; i = (i + 1) | 0) {
                    index = (index + 1) | 0;
                    var e = this.turnBaseTry.entities.getItem(index);
                    if (!e.drawLife) {
                        index = (index - 1) | 0;
                        continue;
                    }
                    if (!e.Dead) {
                        var color = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn;
                        if (e.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy) {
                            color = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.EnemyTurn;
                        }
                        //TextBoard.DrawOneDigit_Cursor((int)e.life.Val);
                        var xOff = (turnOrderX + 1) | 0;
                        var yOff = (((turnOrderY + 2) | 0) + index) | 0;
                        this.DrawEntityChar(e, color, xOff, yOff);
                        //TextBoard.DrawChar(GetChar(e), xOff, turnOrderY + 2, color);
                        this.TextBoard.DrawOneDigit(e.life, ((xOff + 3) | 0), yOff, color);
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
            DrawTurnOrder: function (turnOrderX, turnOrderY) {
                var turnsPerPhase = this.turnBaseTry.battleState.turnsPerPhase;
                this.TextBoard.DrawGrid(((turnOrderX - 1) | 0), ((turnOrderY - 1) | 0), 14, ((6 + Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(turnsPerPhase)) | 0), Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Board);
                this.TextBoard.SetCursorAt(turnOrderX, turnOrderY);
                this.TextBoard.Draw_Cursor$3("Turn Order", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);

                for (var i = 0; i < this.turnBaseTry.entities.Count; i = (i + 1) | 0) {
                    var e = this.turnBaseTry.entities.getItem(i);
                    if (!e.drawTurn) {
                        continue;
                    }
                    if (!e.Dead) {
                        var color = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn;
                        if (e.Type === Pidroh.ConsoleApp.Turnbased.BattleMain.EntityType.enemy) {
                            color = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.EnemyTurn;
                        }

                        //TextBoard.DrawOneDigit_Cursor((int)e.life.Val);
                        var xOff = (((turnOrderX + 1) | 0) + Bridge.Int.mul(i, 3)) | 0;

                        var y = (turnOrderY + 2) | 0;
                        this.DrawEntityChar(e, color, xOff, y);
                        this.TextBoard.SetCursorAt(xOff, ((turnOrderY + 3) | 0));

                        for (var i2 = 0; i2 < Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(turnsPerPhase); i2 = (i2 + 1) | 0) {
                            var color2 = color;
                            if (i === this.turnBaseTry.battleState.actingEntity && i2 === Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(this.turnBaseTry.battleState.turn) && this.turnBaseTry.battleState.phase === Pidroh.ConsoleApp.Turnbased.BattleMain.BattlePhase.ExecuteMove) {
                                color2 = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero;
                            }

                            if (i2 < Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(turnsPerPhase) && e.moves[System.Array.index(i2, e.moves)] != null) {
                                var c = this.GetCharOfMove(e, i2);
                                this.TextBoard.Draw_Cursor$3(c, color2);

                                //TextBoard.Draw_Cursor(' ');
                            } else {
                                this.TextBoard.Draw_Cursor$1(32, color);
                            }
                            this.TextBoard.CursorNewLine(xOff);
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
                //char ec = '@';
                //if (gameEntity.Type == TurnBaseTryValues.EntityType.enemy)
                //{
                //    if(gameEntity.graphic == 1)
                //        ec = '&';
                //    if (gameEntity.graphic == 2)
                //        ec = '%';
                //    if (gameEntity.graphic == 3)
                //        ec = '$';
                //}

                //return ec;
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
            turnAmount: null
        },
        props: {
            Input: {
                get: function () {
                    return 99;
                },
                set: function (value) {
                    this.mainDraw.Pidroh$ConsoleApp$Turnbased$ITextScreen_$Input = value;
                }
            }
        },
        alias: [
            "Input", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Input",
            "Draw", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Draw",
            "GetBoard", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$GetBoard"
        ],
        ctors: {
            init: function () {
                this.enemyAmount = System.Array.init([1, 1, 2, 1, 2, 3, 2, 3, 1, 2, 3, 3], System.Int32);
                this.turnAmount = System.Array.init([2, 4, 2, 6, 4, 2, 6, 4, 8, 8, 6, 8], System.Int32);
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

                var sdc = new Pidroh.ConsoleApp.Turnbased.StageDataCreator();
                var stages = sdc.stages;

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

                var battleSetup = new Pidroh.ConsoleApp.Turnbased.BattleSetup(mode, new Pidroh.ConsoleApp.Turnbased.BattleBasicConfig.$ctor1(nEnemies, 5), this.difficulty, stages);
                this.battleMain = battleSetup.battleMain;
                var ecs = battleSetup.ecs;


                //ecs.CreateEntityWithComponent(new EnemySpawnData(0, new BaseUtils.Vector2D(4, 1)));
                //ecs.CreateEntityWithComponent(new EnemySpawnData(1, new BaseUtils.Vector2D(5, 1)));


                var timeToChoose = -1;
                if (timeAttack) {
                    timeToChoose = (5.0 * this.turnAmount[System.Array.index(d, this.turnAmount)]) * nEnemies;

                }
                this.battleMain.timeToChooseMax = timeToChoose;
                this.battleMain.Init();
                this.battleRender = new Pidroh.ConsoleApp.Turnbased.BattleRender(this.battleMain);
                new Pidroh.TurnBased.TextRendering.HappHandling(this.battleRender, battleSetup);
                this.mainDraw = this.battleRender;
                this.resultScreen = new Pidroh.ConsoleApp.Turnbased.ResultScreen();
                this.resultScreen.battleResult = this.battleMain.battleResult;

            },
            Draw: function (f) {
                this.mainDraw.Pidroh$ConsoleApp$Turnbased$ITextScreen_$Draw(f);
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
            youLose: null,
            battleResult: null,
            wannaLeave: 0,
            Input: 0
        },
        alias: [
            "Input", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Input",
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
                if (this.Input > 0) {
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
            selection: 0,
            battleResult: null,
            wannaLeave: 0,
            mode: 0,
            timeAttack: false,
            screenStage: 0,
            Input: 0
        },
        alias: [
            "Input", "Pidroh$ConsoleApp$Turnbased$ITextScreen_$Input",
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
                for (var i = mainData.charStart; i < mainData.charEnd; i = (i + 1) | 0) {
                    var offseted = i;
                    var line = 0;
                    var tb = entity.Animation;
                    while (offseted >= tb.Width) {
                        line = (line + 1) | 0;
                        offseted = (offseted - tb.Width) | 0;
                    }
                    if (i > ((lengthText * ratio) + mainData.charStart)) {
                        tb.DrawChar(32, offseted, line);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VCdWlsZC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9CYXNlVXRpbHMvUmFuZG9tU3VwcGxpZXIuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9UaW1lU3RhbXAuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL0Jhc2VVdGlscy9WZWN0b3IyRC5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvQmFzZVV0aWxzL1ZlY3RvcjNELmNzIiwiLi4vVHVybkJhc2VkTG9naWMvTW92ZURhdGEuY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0FzeW5jVGFza3MuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9CYXR0bGVNYWluLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvQmF0dGxlU2V0dXAuY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0NvbG9yU3R1ZmYuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9EZWJ1Z0V4dHJhL0RlYnVnRXguY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9FbmVteUFJLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvRW5lbXlGYWN0b3J5LmNzIiwiLi4vVHVybkJhc2VkTG9naWMvRW5lbXlEYXRhQ3JlYXRvci5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL01vdmVEYXRhRXhlY3V0ZXIuY3MiLCIuLi9UdXJuQmFzZWRMb2dpYy9IYXBwcy9IYXBwLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvTW92ZUNyZWF0b3JQcm9nLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvU3RhZ2VEYXRhLmNzIiwiLi4vLi4vVmlzdWFsU3R1ZGlvU29sdXRpb25SbWsvRUNTL0FjY2Vzc29yLmNzIiwiLi4vLi4vVmlzdWFsU3R1ZGlvU29sdXRpb25SbWsvRUNTL0VDU01hbmFnZXIuY3MiLCIuLi8uLi9WaXN1YWxTdHVkaW9Tb2x1dGlvblJtay9FQ1MvRW50aXR5LmNzIiwiLi4vLi4vVmlzdWFsU3R1ZGlvU29sdXRpb25SbWsvRUNTL1Byb2Nlc3NvckZsZXguY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9UZXh0V29ybGQuY3MiLCIuLi8uLi9SZXVzYWJsZVBpZHJvaFZTL1RleHRSZW5kZXJpbmdMb2dpYy9QYWxldHRlLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvVGV4dEJvYXJkLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvR2FtZVNjcmVlbi9JVGV4dFNjcmVlbk4uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0hhcHBIYW5kbGluZy5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvQmF0dGxlUmVuZGVyLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9HYW1lTWFpbi5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvUmVzdWx0U2NyZWVuLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvR2FtZVNjcmVlbi9UZXN0R2FtZS5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvTW9kZVNlbGVjdGlvblNjcmVlbi5jcyIsIi4uLy4uL1JldXNhYmxlUGlkcm9oVlMvVGV4dFJlbmRlcmluZ0xvZ2ljL0JsaW5rQW5pbWF0aW9uLmNzIiwiLi4vLi4vUmV1c2FibGVQaWRyb2hWUy9UZXh0UmVuZGVyaW5nTG9naWMvQ2hhckJ5Q2hhckFuaW1hdGlvbi5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7WUF3Q1lBOztZQUVBQSxxQ0FBY0EsbUNBQVFBO1lBQ3RCQSx5QkFBU0E7WUFDVEEsS0FBS0EsV0FBV0EsSUFBSUEsK0JBQWVBOztnQkFHL0JBLDBDQUFPQSxHQUFQQSwyQkFBWUEsaUVBQWtCQSxHQUFsQkE7Ozs7Ozs7Ozs7Ozs7O1lBY2hC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YUFBYUEsU0FBU0E7d0JBRTVCQSxnQkFBaUJBLFVBQVVBOzs7Ozs7Ozs7Ozs7Z0NYMklYQSxRQUFtQkEsVUFBdUJBLFVBQWdCQTtnQkFFbEZBLHdIQUFZQSxRQUFRQSxVQUFVQSxVQUFVQTtnQkFDeENBLGFBQW1CQTtnQkFDbkJBLElBQUlBO29CQUNBQSxTQUFTQTs7Z0JBQ2JBLGtCQUFrQkEsNkNBQTRCQSxpQ0FBd0JBLCtCQUFzQkEsV0FBV0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbi8vdXNpbmcgRUNTO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbi8vdXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZUJ1aWxkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnQgYnVmZmVyO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGJvb2wgYnVmZmVyT247XHJcbiAgICAgICAgLy9wcml2YXRlIHN0YXRpYyBIVE1MUHJlRWxlbWVudCB0ZXh0O1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEdhbWVNYWluIGdyO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFRleHRCb2FyZCBUZXh0Qm9hcmQ7XHJcbiAgICAgICAgLy9wcml2YXRlIHN0YXRpYyBTdHJpbmdCdWlsZGVyIHNiO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHN0cmluZ1tdIGNvbG9ycztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBTZXR1cEdhbWUob3V0IEdhbWVNYWluIGdyLCBvdXQgVGV4dEJvYXJkIFRleHRCb2FyZClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBSYW5kb20gcm5kID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgICAgICBSYW5kb21TdXBwbGllci5HZW5lcmF0ZSA9ICgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZmxvYXQpcm5kLk5leHREb3VibGUoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZ3IgPSBuZXcgR2FtZU1haW4oKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkID0gZ3IuR2V0Qm9hcmQoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRlc3RFbnRpdHlTeXN0ZW0oKTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkdhbWUgU3RhcnRcIik7XHJcbiAgICAgICAgICAgIFNldHVwR2FtZShvdXQgZ3IsIG91dCBUZXh0Qm9hcmQpO1xyXG4gICAgICAgICAgICBjb2xvcnMgPSBuZXcgc3RyaW5nWzIwXTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb2xvcnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vY29sb3JzW2ldID0gXCIjMWYyMDI2XCI7XHJcbiAgICAgICAgICAgICAgICBjb2xvcnNbaV0gPSBDb2xvclN0dWZmLmNvbG9yc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuQm9hcmRdID0gXCIjNzA1MzczXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5IZXJvXSAgICAgID0gXCIjN2VlNWRhXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5HcmlkSGVyb10gID0gXCIjMmQ0ZWIzXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5HcmlkRW5lbXldID0gXCIjNzMyZTVjXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5FbmVteV0gPSBcIiNlNWMxN2VcIjtcclxuXHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5pbnB1dEtleV0gPSBcIiNjMmNjNTJcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLldpbmRvd0xhYmVsXSA9IFwiIzcwNTM3M1wiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuSGVyb1R1cm5dID0gY29sb3JzW0NvbG9ycy5IZXJvXTtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkVuZW15VHVybl0gPSBjb2xvcnNbQ29sb3JzLkVuZW15XTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBuZXcgSFRNTFN0eWxlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBzdHlsZS5Jbm5lckhUTUwgPSBcImh0bWwsYm9keSB7Zm9udC1mYW1pbHk6IENvdXJpZXI7IGJhY2tncm91bmQtY29sb3I6IzFmMjUyNjsgaGVpZ2h0OiAxMDAlOyBjb2xvcjojODg4O31cIiArIFwiXFxuICNjYW52YXMtY29udGFpbmVyIHt3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyB0ZXh0LWFsaWduOmNlbnRlcjsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfSBcIjtcclxuICAgICAgICAgICAgRG9jdW1lbnQuSGVhZC5BcHBlbmRDaGlsZChzdHlsZSk7XHJcbiAgICAgICAgICAgIGJ1ZmZlciA9IDk7XHJcbiAgICAgICAgICAgIGJ1ZmZlck9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBEb2N1bWVudC5PbktleVByZXNzICs9IChLZXlib2FyZEV2ZW50IGEpID0+XHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnQgY29kZSA9IGEuS2V5Q29kZTtcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlID09IDApIGNvZGUgPSBhLkNoYXJDb2RlO1xyXG4gICAgICAgICAgICAgICAgaW50IHVuaWNvZGUgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleSBpayA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuTk9ORTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZSh1bmljb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHVuaWNvZGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWsgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkRPTkU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2YnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpayA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuRklSRTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlrID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5OT1JNQUxTSE9UO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdpJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWsgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LklDRTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlrID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5USFVOREVSO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd3JzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpayA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuVVA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2EnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlrID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5MRUZUO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpayA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuRE9XTjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOTpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWsgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LlJJR0hUO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWsgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LlJFRE87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2J1ZmZlciA9IGEuQ2hhckNvZGU7XHJcbiAgICAgICAgICAgICAgICBidWZmZXIgPSAoaW50KWlrO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyT24gPSB0cnVlO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgVXBkYXRlR2FtZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWZ0ZXIgYnVpbGRpbmcgKEN0cmwgKyBTaGlmdCArIEIpIHRoaXMgcHJvamVjdCwgXHJcbiAgICAgICAgICAgIC8vIGJyb3dzZSB0byB0aGUgL2Jpbi9EZWJ1ZyBvciAvYmluL1JlbGVhc2UgZm9sZGVyLlxyXG5cclxuICAgICAgICAgICAgLy8gQSBuZXcgYnJpZGdlLyBmb2xkZXIgaGFzIGJlZW4gY3JlYXRlZCBhbmRcclxuICAgICAgICAgICAgLy8gY29udGFpbnMgeW91ciBwcm9qZWN0cyBKYXZhU2NyaXB0IGZpbGVzLiBcclxuXHJcbiAgICAgICAgICAgIC8vIE9wZW4gdGhlIGJyaWRnZS9pbmRleC5odG1sIGZpbGUgaW4gYSBicm93c2VyIGJ5XHJcbiAgICAgICAgICAgIC8vIFJpZ2h0LUNsaWNrID4gT3BlbiBXaXRoLi4uLCB0aGVuIGNob29zZSBhXHJcbiAgICAgICAgICAgIC8vIHdlYiBicm93c2VyIGZyb20gdGhlIGxpc3RcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgYXBwbGljYXRpb24gd2lsbCB0aGVuIHJ1biBpbiBhIGJyb3dzZXIuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFRlc3RFbnRpdHlTeXN0ZW0oKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFVwZGF0ZUdhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dEJvYXJkID0gZ3IuR2V0Qm9hcmQoKTtcclxuICAgICAgICAgICAgZ3IuRHJhdygwLjAzM2YpO1xyXG4gICAgICAgICAgICBpZiAoYnVmZmVyT24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGdyLklucHV0ID0gKGNoYXIpYnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyT24gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGdyLklucHV0ID0gQ2hhci5NaW5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTY3JpcHQuQ2FsbChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IFRleHRCb2FyZC5IZWlnaHQ7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBUZXh0Qm9hcmQuV2lkdGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBTY3JpcHQuQ2FsbChcImRyYXdcIiwgaSwgaiwgY29sb3JzW1RleHRCb2FyZC5UZXh0Q29sb3JbaSwgal1dLCBjb2xvcnNbVGV4dEJvYXJkLkJhY2tDb2xvcltpLCBqXV0sIFwiXCIgKyBUZXh0Qm9hcmQuQ2hhckF0KGksIGopKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3NiLkFwcGVuZChUZXh0Qm9hcmQuQ2hhckF0KGksIGopKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiLi4uXCIpO1xyXG4gICAgICAgICAgICAvL3RleHQuSW5uZXJIVE1MID0gc2IuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgV2luZG93LlNldFRpbWVvdXQoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbilVcGRhdGVHYW1lLCAzMyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgc3RhdGljIHB1YmxpYyBjbGFzcyBSYW5kb21TdXBwbGllclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRnVuYzxmbG9hdD4gR2VuZXJhdGV7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IFJhbmdlKGludCBtaW4sIGludCBtYXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpIChHZW5lcmF0ZSgpICogKG1heC1taW4pK21pbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgUmFuZG9tRWxlbWVudDxUPihUW10gYXJyYXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbUmFuZ2UoMCwgYXJyYXkuTGVuZ3RoKV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRpbWVTdGFtcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBDdXJyZW50U25hcDtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVGltZVN0YW1wU25hcCBHZXRTbmFwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZVN0YW1wU25hcChDdXJyZW50U25hcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWR2YW5jZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEN1cnJlbnRTbmFwICs9IGRlbHRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RydWN0IFRpbWVTdGFtcFNuYXBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgVGltZVNuYXA7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUaW1lU3RhbXBTbmFwKGZsb2F0IHNuYXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUaW1lU25hcCA9IHNuYXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbi8vdXNpbmcgU3lzdGVtLkRyYXdpbmc7XHJcbnVzaW5nIFN5c3RlbS5HbG9iYWxpemF0aW9uO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5CYXNlVXRpbHNcclxue1xyXG4gICAgW1NlcmlhbGl6YWJsZV1cclxuICAgIHB1YmxpYyBzdHJ1Y3QgVmVjdG9yMkQgOiBJRXF1YXRhYmxlPFZlY3RvcjJEPlxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgemVyb1ZlY3RvciA9IG5ldyBWZWN0b3IyRCgwZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHVuaXRWZWN0b3IgPSBuZXcgVmVjdG9yMkQoMWYsIDFmKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB1bml0WFZlY3RvciA9IG5ldyBWZWN0b3IyRCgxZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHVuaXRZVmVjdG9yID0gbmV3IFZlY3RvcjJEKDBmLCAxZik7XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgWDtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgWTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgICMgcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgWEludCB7IGdldCB7IHJldHVybiAoaW50KVg7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgWUludCB7IGdldCB7IHJldHVybiAoaW50KVk7IH0gfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RhbnRzXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgWmVyb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHplcm9WZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgT25lXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBVbml0WFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRYVmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFVuaXRZXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFlWZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJvcGVydGllc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEKGZsb2F0IHgsIGZsb2F0IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB4O1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEKGZsb2F0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBJbnRlcnBvbGF0ZVJvdW5kZWQoVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgVmVjdG9yMkQgZW5kUG9zaXRpb24sIGZsb2F0IHJhdGlvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChzdGFydFBvc2l0aW9uICogKDEgLSByYXRpbykgKyBlbmRQb3NpdGlvbiAqIHJhdGlvKS5Sb3VuZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBWZWN0b3IyRCBSb3VuZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKChmbG9hdClNYXRoLlJvdW5kKFgpLCAoZmxvYXQpTWF0aC5Sb3VuZChZKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIEFkZChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBZGQocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSArIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2UoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLlNxcnQoKHYxICogdjEpICsgKHYyICogdjIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXN0YW5jZShyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IChmbG9hdClNYXRoLlNxcnQoKHYxICogdjEpICsgKHYyICogdjIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2VTcXVhcmVkKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiAodjEgKiB2MSkgKyAodjIgKiB2Mik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2VTcXVhcmVkKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHYxICogdjEpICsgKHYyICogdjIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXQoaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCA9IHg7XHJcbiAgICAgICAgICAgIFkgPSB5O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgRGl2aWRlKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC89IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpdmlkZShyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAvIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZIC8gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIERpdmlkZShWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IGRpdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aWRlcjtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IGRpdmlkZXIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aWRlcjtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIGZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRG90KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZTEuWCAqIHZhbHVlMi5YKSArICh2YWx1ZTEuWSAqIHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEb3QocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICh2YWx1ZTEuWCAqIHZhbHVlMi5YKSArICh2YWx1ZTEuWSAqIHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEVxdWFscyhvYmplY3Qgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG9iaiBpcyBWZWN0b3IyRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVxdWFscygoVmVjdG9yMkQpdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhWZWN0b3IyRCBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoWCA9PSBvdGhlci5YKSAmJiAoWSA9PSBvdGhlci5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgUmVmbGVjdChWZWN0b3IyRCB2ZWN0b3IsIFZlY3RvcjJEIG5vcm1hbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlY3RvcjJEIHJlc3VsdDtcclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gMi4wZiAqICgodmVjdG9yLlggKiBub3JtYWwuWCkgKyAodmVjdG9yLlkgKiBub3JtYWwuWSkpO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZlY3Rvci5YIC0gKG5vcm1hbC5YICogdmFsKTtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2ZWN0b3IuWSAtIChub3JtYWwuWSAqIHZhbCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUmVmbGVjdChyZWYgVmVjdG9yMkQgdmVjdG9yLCByZWYgVmVjdG9yMkQgbm9ybWFsLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gMi4wZiAqICgodmVjdG9yLlggKiBub3JtYWwuWCkgKyAodmVjdG9yLlkgKiBub3JtYWwuWSkpO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZlY3Rvci5YIC0gKG5vcm1hbC5YICogdmFsKTtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2ZWN0b3IuWSAtIChub3JtYWwuWSAqIHZhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBYLkdldEhhc2hDb2RlKCkgKyBZLkdldEhhc2hDb2RlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IExlbmd0aCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguU3FydCgoWCAqIFgpICsgKFkgKiBZKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoU3F1YXJlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKFggKiBYKSArIChZICogWSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTWF4KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh2YWx1ZTEuWCA+IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlMS5ZID4gdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYXgocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggPiB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgPiB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE1pbihWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQodmFsdWUxLlggPCB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTEuWSA8IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWluKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIDwgdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZIDwgdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNdWx0aXBseShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTXVsdGlwbHkoVmVjdG9yMkQgdmFsdWUxLCBmbG9hdCBzY2FsZUZhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNdWx0aXBseShyZWYgVmVjdG9yMkQgdmFsdWUxLCBmbG9hdCBzY2FsZUZhY3Rvciwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTmVnYXRlKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBOZWdhdGUocmVmIFZlY3RvcjJEIHZhbHVlLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSAtdmFsdWUuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSAtdmFsdWUuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE5vcm1hbGl6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgoWCAqIFgpICsgKFkgKiBZKSk7XHJcbiAgICAgICAgICAgIFggKj0gdmFsO1xyXG4gICAgICAgICAgICBZICo9IHZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTm9ybWFsaXplKFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gMS4wZiAvIChmbG9hdClNYXRoLlNxcnQoKHZhbHVlLlggKiB2YWx1ZS5YKSArICh2YWx1ZS5ZICogdmFsdWUuWSkpO1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHZhbDtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSB2YWw7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBOb3JtYWxpemUocmVmIFZlY3RvcjJEIHZhbHVlLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gMS4wZiAvIChmbG9hdClNYXRoLlNxcnQoKHZhbHVlLlggKiB2YWx1ZS5YKSArICh2YWx1ZS5ZICogdmFsdWUuWSkpO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlLlggKiB2YWw7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUuWSAqIHZhbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBTdWJ0cmFjdChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC09IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAtPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTdWJ0cmFjdChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAtIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEN1bHR1cmVJbmZvIGN1cnJlbnRDdWx0dXJlID0gQ3VsdHVyZUluZm8uQ3VycmVudEN1bHR1cmU7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KGN1cnJlbnRDdWx0dXJlLCBcInt7WDp7MH0gWTp7MX19fVwiLCBuZXcgb2JqZWN0W10ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5YLlRvU3RyaW5nKGN1cnJlbnRDdWx0dXJlKSwgdGhpcy5ZLlRvU3RyaW5nKGN1cnJlbnRDdWx0dXJlKSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIE1ldGhvZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gT3BlcmF0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgLShWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggPSAtdmFsdWUuWDtcclxuICAgICAgICAgICAgdmFsdWUuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YID09IHZhbHVlMi5YICYmIHZhbHVlMS5ZID09IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciAhPShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTEuWCAhPSB2YWx1ZTIuWCB8fCB2YWx1ZTEuWSAhPSB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yICsoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCArPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAtKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLT0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC09IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKihWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yICooVmVjdG9yMkQgdmFsdWUsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgKihmbG9hdCBzY2FsZUZhY3RvciwgVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAvKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC89IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgLyhWZWN0b3IyRCB2YWx1ZTEsIGZsb2F0IGRpdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gZGl2aWRlcjtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIE9wZXJhdG9yc1xyXG4gICAgfVxyXG59IiwiLy8gTUlUIExpY2Vuc2UgLSBDb3B5cmlnaHQgKEMpIFRoZSBNb25vLlhuYSBUZWFtXHJcbi8vIFRoaXMgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyBkZWZpbmVkIGluXHJcbi8vIGZpbGUgJ0xJQ0VOU0UudHh0Jywgd2hpY2ggaXMgcGFydCBvZiB0aGlzIHNvdXJjZSBjb2RlIHBhY2thZ2UuXHJcblxyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5EaWFnbm9zdGljcztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5SdW50aW1lLlNlcmlhbGl6YXRpb247XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkJhc2VVdGlsc1xyXG57XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RydWN0IFZlY3RvcjNEIDogSUVxdWF0YWJsZTxWZWN0b3IzRD5cclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIHplcm8gPSBuZXcgVmVjdG9yM0QoMGYsIDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yM0Qgb25lID0gbmV3IFZlY3RvcjNEKDFmLCAxZiwgMWYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIHVuaXRYID0gbmV3IFZlY3RvcjNEKDFmLCAwZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIHVuaXRZID0gbmV3IFZlY3RvcjNEKDBmLCAxZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIHVuaXRaID0gbmV3IFZlY3RvcjNEKDBmLCAwZiwgMWYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIHVwID0gbmV3IFZlY3RvcjNEKDBmLCAxZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIGRvd24gPSBuZXcgVmVjdG9yM0QoMGYsIC0xZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIHJpZ2h0ID0gbmV3IFZlY3RvcjNEKDFmLCAwZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIGxlZnQgPSBuZXcgVmVjdG9yM0QoLTFmLCAwZiwgMGYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIGZvcndhcmQgPSBuZXcgVmVjdG9yM0QoMGYsIDBmLCAtMWYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjNEIGJhY2t3YXJkID0gbmV3IFZlY3RvcjNEKDBmLCAwZiwgMWYpO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFByaXZhdGUgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGZsb2F0IFg7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBZO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgZmxvYXQgWjtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHdpdGggY29tcG9uZW50cyAwLCAwLCAwLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBaZXJvXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gemVybzsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHdpdGggY29tcG9uZW50cyAxLCAxLCAxLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBPbmVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBvbmU7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmV0dXJucyBhIDxzZWU+VmVjdG9yMzwvc2VlPiB3aXRoIGNvbXBvbmVudHMgMSwgMCwgMC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgVW5pdFhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXR1cm5zIGEgPHNlZT5WZWN0b3IzPC9zZWU+IHdpdGggY29tcG9uZW50cyAwLCAxLCAwLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBVbml0WVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHVuaXRZOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJldHVybnMgYSA8c2VlPlZlY3RvcjM8L3NlZT4gd2l0aCBjb21wb25lbnRzIDAsIDAsIDEuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIFVuaXRaXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFo7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgVXBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1cDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBEb3duXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gZG93bjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBSaWdodFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHJpZ2h0OyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIExlZnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBsZWZ0OyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIEZvcndhcmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBmb3J3YXJkOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIEJhY2t3YXJkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gYmFja3dhcmQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHJvcGVydGllc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjNEKGZsb2F0IHgsIGZsb2F0IHksIGZsb2F0IHopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB4O1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB5O1xyXG4gICAgICAgICAgICB0aGlzLlogPSB6O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IzRChmbG9hdCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLlkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5aID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjNEKFZlY3RvcjJEIHZhbHVlLCBmbG9hdCB6KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5YID0gdmFsdWUuWDtcclxuICAgICAgICAgICAgdGhpcy5ZID0gdmFsdWUuWTtcclxuICAgICAgICAgICAgdGhpcy5aID0gejtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBlcmZvcm1zIHZlY3RvciBhZGRpdGlvbiBvbiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4gYW5kIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUyXCIvPi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IgdG8gYWRkLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IgdG8gYWRkLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSByZXN1bHQgb2YgdGhlIHZlY3RvciBhZGRpdGlvbi48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBBZGQoVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCArPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICs9IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBQZXJmb3JtcyB2ZWN0b3IgYWRkaXRpb24gb24gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTFcIi8+IGFuZFxyXG4gICAgICAgIC8vLyA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMlwiLz4sIHN0b3JpbmcgdGhlIHJlc3VsdCBvZiB0aGVcclxuICAgICAgICAvLy8gYWRkaXRpb24gaW4gPHBhcmFtcmVmIG5hbWU9XCJyZXN1bHRcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3RvciB0byBhZGQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3RvciB0byBhZGQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIHRoZSB2ZWN0b3IgYWRkaXRpb24uPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQWRkKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICsgdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKyB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiArIHZhbHVlMi5aO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgQ3Jvc3MoVmVjdG9yM0QgdmVjdG9yMSwgVmVjdG9yM0QgdmVjdG9yMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENyb3NzKHJlZiB2ZWN0b3IxLCByZWYgdmVjdG9yMiwgb3V0IHZlY3RvcjEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmVjdG9yMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBDcm9zcyhyZWYgVmVjdG9yM0QgdmVjdG9yMSwgcmVmIFZlY3RvcjNEIHZlY3RvcjIsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgeCA9IHZlY3RvcjEuWSAqIHZlY3RvcjIuWiAtIHZlY3RvcjIuWSAqIHZlY3RvcjEuWjtcclxuICAgICAgICAgICAgdmFyIHkgPSAtKHZlY3RvcjEuWCAqIHZlY3RvcjIuWiAtIHZlY3RvcjIuWCAqIHZlY3RvcjEuWik7XHJcbiAgICAgICAgICAgIHZhciB6ID0gdmVjdG9yMS5YICogdmVjdG9yMi5ZIC0gdmVjdG9yMi5YICogdmVjdG9yMS5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0geTtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB6O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEaXN0YW5jZShWZWN0b3IzRCB2ZWN0b3IxLCBWZWN0b3IzRCB2ZWN0b3IyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBEaXN0YW5jZVNxdWFyZWQocmVmIHZlY3RvcjEsIHJlZiB2ZWN0b3IyLCBvdXQgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLlNxcnQocmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXN0YW5jZShyZWYgVmVjdG9yM0QgdmFsdWUxLCByZWYgVmVjdG9yM0QgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGlzdGFuY2VTcXVhcmVkKHJlZiB2YWx1ZTEsIHJlZiB2YWx1ZTIsIG91dCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAoZmxvYXQpTWF0aC5TcXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlU3F1YXJlZChWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHJlc3VsdDtcclxuICAgICAgICAgICAgRGlzdGFuY2VTcXVhcmVkKHJlZiB2YWx1ZTEsIHJlZiB2YWx1ZTIsIG91dCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlU3F1YXJlZChyZWYgVmVjdG9yM0QgdmFsdWUxLCByZWYgVmVjdG9yM0QgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMS5YIC0gdmFsdWUyLlgpICogKHZhbHVlMS5YIC0gdmFsdWUyLlgpICtcclxuICAgICAgICAgICAgICAgICAgICAgKHZhbHVlMS5ZIC0gdmFsdWUyLlkpICogKHZhbHVlMS5ZIC0gdmFsdWUyLlkpICtcclxuICAgICAgICAgICAgICAgICAgICAgKHZhbHVlMS5aIC0gdmFsdWUyLlopICogKHZhbHVlMS5aIC0gdmFsdWUyLlopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBEaXZpZGUoVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aIC89IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBEaXZpZGUoVmVjdG9yM0QgdmFsdWUxLCBmbG9hdCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSAxIC8gdmFsdWUyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlogKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpdmlkZShyZWYgVmVjdG9yM0QgdmFsdWUxLCBmbG9hdCBkaXZpc29yLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMSAvIGRpdmlzb3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmFsdWUxLlogKiBmYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC8gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLyB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAvIHZhbHVlMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEb3QoVmVjdG9yM0QgdmVjdG9yMSwgVmVjdG9yM0QgdmVjdG9yMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWN0b3IxLlggKiB2ZWN0b3IyLlggKyB2ZWN0b3IxLlkgKiB2ZWN0b3IyLlkgKyB2ZWN0b3IxLlogKiB2ZWN0b3IyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRG90KHJlZiBWZWN0b3IzRCB2ZWN0b3IxLCByZWYgVmVjdG9yM0QgdmVjdG9yMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHZlY3RvcjEuWCAqIHZlY3RvcjIuWCArIHZlY3RvcjEuWSAqIHZlY3RvcjIuWSArIHZlY3RvcjEuWiAqIHZlY3RvcjIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEVxdWFscyhvYmplY3Qgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCEob2JqIGlzIFZlY3RvcjNEKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBvdGhlciA9IChWZWN0b3IzRClvYmo7XHJcbiAgICAgICAgICAgIHJldHVybiBYID09IG90aGVyLlggJiZcclxuICAgICAgICAgICAgICAgICAgICBZID09IG90aGVyLlkgJiZcclxuICAgICAgICAgICAgICAgICAgICBaID09IG90aGVyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBFcXVhbHMoVmVjdG9yM0Qgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gWCA9PSBvdGhlci5YICYmXHJcbiAgICAgICAgICAgICAgICAgICAgWSA9PSBvdGhlci5ZICYmXHJcbiAgICAgICAgICAgICAgICAgICAgWiA9PSBvdGhlci5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBHZXRIYXNoQ29kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludCkodGhpcy5YICsgdGhpcy5ZICsgdGhpcy5aKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHJlc3VsdDtcclxuICAgICAgICAgICAgRGlzdGFuY2VTcXVhcmVkKHJlZiB0aGlzLCByZWYgemVybywgb3V0IHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5TcXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoU3F1YXJlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCByZXN1bHQ7XHJcbiAgICAgICAgICAgIERpc3RhbmNlU3F1YXJlZChyZWYgdGhpcywgcmVmIHplcm8sIG91dCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBNdWx0aXBseShWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKj0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE11bHRpcGx5KFZlY3RvcjNEIHZhbHVlMSwgZmxvYXQgc2NhbGVGYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE11bHRpcGx5KHJlZiBWZWN0b3IzRCB2YWx1ZTEsIGZsb2F0IHNjYWxlRmFjdG9yLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmFsdWUxLlogKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNdWx0aXBseShyZWYgVmVjdG9yM0QgdmFsdWUxLCByZWYgVmVjdG9yM0QgdmFsdWUyLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmFsdWUxLlogKiB2YWx1ZTIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmV0dXJucyBhIDxzZWU+VmVjdG9yMzwvc2VlPiBwb2ludGluZyBpbiB0aGUgb3Bwb3NpdGVcclxuICAgICAgICAvLy8gZGlyZWN0aW9uIG9mIDxwYXJhbXJlZiBuYW1lPVwidmFsdWVcIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmVjdG9yIHRvIG5lZ2F0ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgdmVjdG9yIG5lZ2F0aW9uIG9mIDxwYXJhbXJlZiBuYW1lPVwidmFsdWVcIi8+LjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIE5lZ2F0ZShWZWN0b3IzRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gbmV3IFZlY3RvcjNEKC12YWx1ZS5YLCAtdmFsdWUuWSwgLXZhbHVlLlopO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFN0b3JlcyBhIDxzZWU+VmVjdG9yMzwvc2VlPiBwb2ludGluZyBpbiB0aGUgb3Bwb3NpdGVcclxuICAgICAgICAvLy8gZGlyZWN0aW9uIG9mIDxwYXJhbXJlZiBuYW1lPVwidmFsdWVcIi8+IGluIDxwYXJhbXJlZiBuYW1lPVwicmVzdWx0XCIvPi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIHZlY3RvciB0byBuZWdhdGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgdmVjdG9yIHRoYXQgdGhlIG5lZ2F0aW9uIG9mIDxwYXJhbXJlZiBuYW1lPVwidmFsdWVcIi8+IHdpbGwgYmUgc3RvcmVkIGluLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5lZ2F0ZShyZWYgVmVjdG9yM0QgdmFsdWUsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IC12YWx1ZS5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgICAgICByZXN1bHQuWiA9IC12YWx1ZS5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTm9ybWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5vcm1hbGl6ZShyZWYgdGhpcywgb3V0IHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBOb3JtYWxpemUoVmVjdG9yM0QgdmVjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTm9ybWFsaXplKHJlZiB2ZWN0b3IsIG91dCB2ZWN0b3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmVjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE5vcm1hbGl6ZShyZWYgVmVjdG9yM0QgdmFsdWUsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3I7XHJcbiAgICAgICAgICAgIERpc3RhbmNlKHJlZiB2YWx1ZSwgcmVmIHplcm8sIG91dCBmYWN0b3IpO1xyXG4gICAgICAgICAgICBmYWN0b3IgPSAxZiAvIGZhY3RvcjtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZS5YICogZmFjdG9yO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlLlkgKiBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmFsdWUuWiAqIGZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0QgUmVmbGVjdChWZWN0b3IzRCB2ZWN0b3IsIFZlY3RvcjNEIG5vcm1hbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIEkgaXMgdGhlIG9yaWdpbmFsIGFycmF5XHJcbiAgICAgICAgICAgIC8vIE4gaXMgdGhlIG5vcm1hbCBvZiB0aGUgaW5jaWRlbnQgcGxhbmVcclxuICAgICAgICAgICAgLy8gUiA9IEkgLSAoMiAqIE4gKiAoIERvdFByb2R1Y3RbIEksTl0gKSlcclxuICAgICAgICAgICAgVmVjdG9yM0QgcmVmbGVjdGVkVmVjdG9yO1xyXG4gICAgICAgICAgICAvLyBpbmxpbmUgdGhlIGRvdFByb2R1Y3QgaGVyZSBpbnN0ZWFkIG9mIGNhbGxpbmcgbWV0aG9kXHJcbiAgICAgICAgICAgIGZsb2F0IGRvdFByb2R1Y3QgPSAoKHZlY3Rvci5YICogbm9ybWFsLlgpICsgKHZlY3Rvci5ZICogbm9ybWFsLlkpKSArICh2ZWN0b3IuWiAqIG5vcm1hbC5aKTtcclxuICAgICAgICAgICAgcmVmbGVjdGVkVmVjdG9yLlggPSB2ZWN0b3IuWCAtICgyLjBmICogbm9ybWFsLlgpICogZG90UHJvZHVjdDtcclxuICAgICAgICAgICAgcmVmbGVjdGVkVmVjdG9yLlkgPSB2ZWN0b3IuWSAtICgyLjBmICogbm9ybWFsLlkpICogZG90UHJvZHVjdDtcclxuICAgICAgICAgICAgcmVmbGVjdGVkVmVjdG9yLlogPSB2ZWN0b3IuWiAtICgyLjBmICogbm9ybWFsLlopICogZG90UHJvZHVjdDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZWZsZWN0ZWRWZWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgUmVmbGVjdChyZWYgVmVjdG9yM0QgdmVjdG9yLCByZWYgVmVjdG9yM0Qgbm9ybWFsLCBvdXQgVmVjdG9yM0QgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gSSBpcyB0aGUgb3JpZ2luYWwgYXJyYXlcclxuICAgICAgICAgICAgLy8gTiBpcyB0aGUgbm9ybWFsIG9mIHRoZSBpbmNpZGVudCBwbGFuZVxyXG4gICAgICAgICAgICAvLyBSID0gSSAtICgyICogTiAqICggRG90UHJvZHVjdFsgSSxOXSApKVxyXG5cclxuICAgICAgICAgICAgLy8gaW5saW5lIHRoZSBkb3RQcm9kdWN0IGhlcmUgaW5zdGVhZCBvZiBjYWxsaW5nIG1ldGhvZFxyXG4gICAgICAgICAgICBmbG9hdCBkb3RQcm9kdWN0ID0gKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSkgKyAodmVjdG9yLlogKiBub3JtYWwuWik7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmVjdG9yLlggLSAoMi4wZiAqIG5vcm1hbC5YKSAqIGRvdFByb2R1Y3Q7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmVjdG9yLlkgLSAoMi4wZiAqIG5vcm1hbC5ZKSAqIGRvdFByb2R1Y3Q7XHJcbiAgICAgICAgICAgIHJlc3VsdC5aID0gdmVjdG9yLlogLSAoMi4wZiAqIG5vcm1hbC5aKSAqIGRvdFByb2R1Y3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBlcmZvcm1zIHZlY3RvciBzdWJ0cmFjdGlvbiBvbiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4gYW5kIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUyXCIvPi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSB2ZWN0b3IgdG8gYmUgc3VidHJhY3RlZCBmcm9tLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHZlY3RvciB0byBiZSBzdWJ0cmFjdGVkIGZyb20gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTFcIi8+LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSByZXN1bHQgb2YgdGhlIHZlY3RvciBzdWJ0cmFjdGlvbi48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBTdWJ0cmFjdChWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC09IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAtPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLT0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBlcmZvcm1zIHZlY3RvciBzdWJ0cmFjdGlvbiBvbiA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMVwiLz4gYW5kIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUyXCIvPi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSB2ZWN0b3IgdG8gYmUgc3VidHJhY3RlZCBmcm9tLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHZlY3RvciB0byBiZSBzdWJ0cmFjdGVkIGZyb20gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTFcIi8+LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIHN1YnRyYWN0aW9uLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFN1YnRyYWN0KHJlZiBWZWN0b3IzRCB2YWx1ZTEsIHJlZiBWZWN0b3IzRCB2YWx1ZTIsIG91dCBWZWN0b3IzRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YIC0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0LlogPSB2YWx1ZTEuWiAtIHZhbHVlMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RyaW5nIERlYnVnRGlzcGxheVN0cmluZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuQ29uY2F0KFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWC5Ub1N0cmluZygpLCBcIiAgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ZLlRvU3RyaW5nKCksIFwiICBcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlouVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTdHJpbmdCdWlsZGVyIHNiID0gbmV3IFN0cmluZ0J1aWxkZXIoMzIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmQoXCJ7WDpcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZCh0aGlzLlgpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmQoXCIgWTpcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZCh0aGlzLlkpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmQoXCIgWjpcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZCh0aGlzLlopO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmQoXCJ9XCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2IuVG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8vLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vLy8gVHJhbnNmb3JtcyBhIHZlY3RvciBieSBhIHF1YXRlcm5pb24gcm90YXRpb24uXHJcbiAgICAgICAgLy8vLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLy8vIDxwYXJhbSBuYW1lPVwidmVjXCI+VGhlIHZlY3RvciB0byB0cmFuc2Zvcm0uPC9wYXJhbT5cclxuICAgICAgICAvLy8vLyA8cGFyYW0gbmFtZT1cInF1YXRcIj5UaGUgcXVhdGVybmlvbiB0byByb3RhdGUgdGhlIHZlY3RvciBieS48L3BhcmFtPlxyXG4gICAgICAgIC8vLy8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+VGhlIHJlc3VsdCBvZiB0aGUgb3BlcmF0aW9uLjwvcGFyYW0+XHJcbiAgICAgICAgLy8gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBUcmFuc2Zvcm0ocmVmIFZlY3RvcjMgdmVjLCByZWYgUXVhdGVybmlvbiBxdWF0LCBvdXQgVmVjdG9yMyByZXN1bHQpXHJcbiAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAvL1x0XHQvLyBUYWtlbiBmcm9tIHRoZSBPcGVudFRLIGltcGxlbWVudGF0aW9uIG9mIFZlY3RvcjNcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vIFNpbmNlIHZlYy5XID09IDAsIHdlIGNhbiBvcHRpbWl6ZSBxdWF0ICogdmVjICogcXVhdF4tMSBhcyBmb2xsb3dzOlxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gdmVjICsgMi4wICogY3Jvc3MocXVhdC54eXosIGNyb3NzKHF1YXQueHl6LCB2ZWMpICsgcXVhdC53ICogdmVjKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMyB4eXogPSBxdWF0Llh5eiwgdGVtcCwgdGVtcDI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBWZWN0b3IzLkNyb3NzKHJlZiB4eXosIHJlZiB2ZWMsIG91dCB0ZW1wKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIFZlY3RvcjMuTXVsdGlwbHkocmVmIHZlYywgcXVhdC5XLCBvdXQgdGVtcDIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMy5BZGQocmVmIHRlbXAsIHJlZiB0ZW1wMiwgb3V0IHRlbXApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMy5Dcm9zcyhyZWYgeHl6LCByZWYgdGVtcCwgb3V0IHRlbXApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMy5NdWx0aXBseShyZWYgdGVtcCwgMiwgb3V0IHRlbXApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgVmVjdG9yMy5BZGQocmVmIHZlYywgcmVmIHRlbXAsIG91dCByZXN1bHQpO1xyXG4gICAgICAgIC8vICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gUHVibGljIG1ldGhvZHNcclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gT3BlcmF0b3JzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTEuWCA9PSB2YWx1ZTIuWFxyXG4gICAgICAgICAgICAgICAgJiYgdmFsdWUxLlkgPT0gdmFsdWUyLllcclxuICAgICAgICAgICAgICAgICYmIHZhbHVlMS5aID09IHZhbHVlMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFZlY3RvcjNEIHZhbHVlMSwgVmVjdG9yM0QgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICEodmFsdWUxID09IHZhbHVlMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yICsoVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCArPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICs9IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAtKFZlY3RvcjNEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBuZXcgVmVjdG9yM0QoLXZhbHVlLlgsIC12YWx1ZS5ZLCAtdmFsdWUuWik7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgLShWZWN0b3IzRCB2YWx1ZTEsIFZlY3RvcjNEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC09IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAtPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLT0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yICooVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICo9IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAqKFZlY3RvcjNEIHZhbHVlLCBmbG9hdCBzY2FsZUZhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlogKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yM0Qgb3BlcmF0b3IgKihmbG9hdCBzY2FsZUZhY3RvciwgVmVjdG9yM0QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5aICo9IHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjNEIG9wZXJhdG9yIC8oVmVjdG9yM0QgdmFsdWUxLCBWZWN0b3IzRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aIC89IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzRCBvcGVyYXRvciAvKFZlY3RvcjNEIHZhbHVlLCBmbG9hdCBkaXZpZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMSAvIGRpdmlkZXI7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICB2YWx1ZS5ZICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWiAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsInVzaW5nIFBpZHJvaC5CYXNlVXRpbHM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdmVEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgc3RyaW5nIGxhYmVsO1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8VGljaz4gdW5pdHMgPSBuZXcgTGlzdDxUaWNrPigpO1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8aW50PiB0YWdzID0gbmV3IExpc3Q8aW50PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZURhdGEoc3RyaW5nIGxhYmVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgRmluZEJ5TGFiZWwoTGlzdDxNb3ZlRGF0YT4gbW92ZURhdGFzLCBzdHJpbmcgbGFiZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IG1vdmVEYXRhcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW92ZURhdGFzW2ldLmxhYmVsID09IGxhYmVsKSByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUaWNrIFxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIENvbmRpdGlvbiBjb25kaXRpb247XHJcbiAgICAgICAgaW50ZXJuYWwgTGlzdDxvYmplY3Q+IHRoaW5nc1RvSGFwcGVuID0gbmV3IExpc3Q8b2JqZWN0PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGljayhvYmplY3QgYWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpbmdzVG9IYXBwZW4uQWRkKGFjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBDb25kaXRpb25cclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCByZWFkb25seSBDb25kaXRpb25UeXBlIHR5cGU7XHJcbiAgICAgICAgaW50ZXJuYWwgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldDtcclxuICAgICAgICBpbnRlcm5hbCByZWFkb25seSBCYXNlVXRpbHMuVmVjdG9yMkQgdmVjdG9yO1xyXG5cclxuICAgICAgICBwdWJsaWMgQ29uZGl0aW9uKENvbmRpdGlvblR5cGUgdHlwZSwgVGFyZ2V0IHRhcmdldCwgQmFzZVV0aWxzLlZlY3RvcjJEIHZlY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLnZlY3RvciA9IHZlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gQ29uZGl0aW9uVHlwZVxyXG4gICAge1xyXG4gICAgICAgIENhbk1vdmVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQW5pbWF0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IEFyZWEgYXJlYSA9IG51bGw7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldCA9IFRhcmdldC5Ob25lO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgQW5pbWF0aW9uKFRhcmdldCB0YXJnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBbmltYXRpb24oQXJlYSBhcmVhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdmVBY3Rpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVGFyZ2V0IHRhcmdldDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQmFzZVV0aWxzLlZlY3RvcjJEIGRpc3RhbmNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZUFjdGlvbihUYXJnZXQgdGFyZ2V0LCBCYXNlVXRpbHMuVmVjdG9yMkQgYW1vdW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzdGFuY2UgPSBhbW91bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBEZWFsRGFtYWdlQWN0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFRhcmdldCB0YXJnZXQgPSBUYXJnZXQuTm9uZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgQXJlYSBhcmVhO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgZGFtYWdlO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBEZWFsRGFtYWdlQWN0aW9uKEFyZWEgYXJlYSwgaW50IGRhbWFnZSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IFRhcmdldC5BcmVhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERlYWxEYW1hZ2VBY3Rpb24oVGFyZ2V0IHRhcmdldCwgaW50IGRhbWFnZSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3B1YmxpYyBjbGFzcyBBcmVhXHJcbiAgICAvL3tcclxuICAgICAgICBcclxuICAgIC8vfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBcmVhXHJcbiAgICB7XHJcbiAgICAgICAgLy9wdWJsaWMgcmVhZG9ubHkgQXJlYSBhcmVhO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBUYXJnZXQgdGFyZ2V0O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBMaXN0PFZlY3RvcjJEPiBwb2ludHMgPSBuZXcgTGlzdDxWZWN0b3IyRD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIEFyZWEoVGFyZ2V0IHRhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBUYXJnZXRcclxuICAgIHtcclxuICAgICAgICBOb25lLCAgU2VsZiwgQ2xvc2VzdFRhcmdldCwgQ2xvc2VzdFRhcmdldFgsIEFyZWEgICBcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBc3luY1Rhc2tzXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBc3luY1RyYWNrXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBEZWxheWVkQWN0aW9uc1xyXG4gICAge1xyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IHRpbWVzID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxJTGlzdD4gbGlzdHMgPSBuZXcgTGlzdDxJTGlzdD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB0aW1lcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lc1tpXSAtPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGlmICh0aW1lc1tpXSA8PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEV4ZWN1dGUoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5kVGFzayhpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgYWJzdHJhY3Qgdm9pZCBFeGVjdXRlKGludCBpKTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGQoZmxvYXQgdGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpbWVzLkFkZCh0aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRG9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZXMuQ291bnQgPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRW5kVGFzayhpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpbWVzLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbCBpbiBsaXN0cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbC5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQXN5bmNUYXNrU2V0dGVyPFQ+IDogRGVsYXllZEFjdGlvbnNcclxuICAgIHtcclxuICAgICAgICBMaXN0PFQ+IFRvVmFsdWUgPSBuZXcgTGlzdDxUPigpO1xyXG4gICAgICAgIExpc3Q8QWN0aW9uPFQ+PiBzZXR0ZXJzID0gbmV3IExpc3Q8QWN0aW9uPFQ+PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoVCBlLCBBY3Rpb248VD4gc2V0dGVyLCBmbG9hdCB0aW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVG9WYWx1ZS5BZGQoZSk7XHJcbiAgICAgICAgICAgIHNldHRlcnMuQWRkKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248VD4pc2V0dGVyKTtcclxuICAgICAgICAgICAgYmFzZS5BZGQodGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBvdmVycmlkZSB2b2lkIEV4ZWN1dGUoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXR0ZXJzW2ldKFRvVmFsdWVbaV0pO1xyXG4gICAgICAgICAgICBUb1ZhbHVlLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBzZXR0ZXJzLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkhhcHBzO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVNYWluXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8QmF0dGxlRW50aXR5PiBlbnRpdGllcyA9IG5ldyBMaXN0PEJhdHRsZUVudGl0eT4oKTtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlU3RhdGUgYmF0dGxlU3RhdGUgPSBuZXcgQmF0dGxlU3RhdGUoKTtcclxuICAgICAgICBwdWJsaWMgSGFwcE1hbmFnZXIgaGFwcE1hbmFnZXIgPSBuZXcgSGFwcE1hbmFnZXIoKTtcclxuICAgICAgICBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBWZWN0b3IyRD4gbW92ZW1lbnRNb3ZlcyA9IG5ldyBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBWZWN0b3IyRD4oKTtcclxuICAgICAgICAvL0RpY3Rpb25hcnk8TW92ZVR5cGUsIFBvaW50PiBhdHRhY2tNb3ZlcyA9IG5ldyBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBQb2ludD4oKTtcclxuICAgICAgICBNb3ZlVHlwZVtdIGVuZW15TW92ZXM7XHJcbiAgICAgICAgcHVibGljIExpc3Q8SW5wdXQ+IGlucHV0cyA9IG5ldyBMaXN0PFR1cm5iYXNlZC5JbnB1dD4oKTtcclxuICAgICAgICBwdWJsaWMgTGlzdDxNb3ZlVHlwZT4gcGxheWVySGFuZCA9IG5ldyBMaXN0PE1vdmVUeXBlPigpO1xyXG4gICAgICAgIHB1YmxpYyBBdHRhY2tNb3ZlW10gYXR0YWNrRGF0YXMgPSBuZXcgQXR0YWNrTW92ZVtdIHtcclxuICAgICAgICAgICAgbmV3IEF0dGFja01vdmUoRWxlbWVudC5UaHVuZGVyLCBNb3ZlVHlwZS5UaHVuZGVyKSxcclxuICAgICAgICAgICAgbmV3IEF0dGFja01vdmUoRWxlbWVudC5GaXJlLCBNb3ZlVHlwZS5GaXJlKSxcclxuICAgICAgICAgICAgbmV3IEF0dGFja01vdmUoRWxlbWVudC5Ob25lLCBNb3ZlVHlwZS5Ob3JtYWxTaG90KSxcclxuICAgICAgICAgICAgbmV3IEF0dGFja01vdmUoRWxlbWVudC5JY2UsIE1vdmVUeXBlLkljZSksXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgdGltZVRvQ2hvb3NlTWF4ID0gMTVmO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCB0aW1lVG9DaG9vc2UgPSAtMTtcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZVJlc3VsdCBiYXR0bGVSZXN1bHQgPSBuZXcgQmF0dGxlUmVzdWx0KCk7XHJcbiAgICAgICAgaW50IG5FbmVtaWVzO1xyXG4gICAgICAgIHB1YmxpYyBNb3ZlRGF0YUV4ZWN1dGVyIE1vdmVEYXRhRXhlY3V0ZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFRpbWVTdGFtcCB0aW1lU3RhbXA7XHJcbiAgICAgICAgaW50ZXJuYWwgRW5lbXlFbnRpdHlGYWN0b3J5IEVuZW15RmFjdG9yeTtcclxuICAgICAgICBwdWJsaWMgQWN0aW9uIEVuZW15R2VuZXJhdGVNb3ZlcztcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZU1haW4oaW50IG1vZGUsIEVDU01hbmFnZXIgZWNzLCBUaW1lU3RhbXAgdGltZVN0YW1wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIHRoaXMudGltZVN0YW1wID0gdGltZVN0YW1wO1xyXG4gICAgICAgICAgICBlY3MuUXVpY2tBY2Nlc3NvcjE8QmF0dGxlRW50aXR5PigpO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlVXAsIFZlY3RvcjJELlVuaXRZKTtcclxuICAgICAgICAgICAgbW92ZW1lbnRNb3Zlcy5BZGQoTW92ZVR5cGUuTW92ZURvd24sIC1WZWN0b3IyRC5Vbml0WSk7XHJcbiAgICAgICAgICAgIG1vdmVtZW50TW92ZXMuQWRkKE1vdmVUeXBlLk1vdmVMZWZ0LCAtVmVjdG9yMkQuVW5pdFgpO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlUmlnaHQsIFZlY3RvcjJELlVuaXRYKTtcclxuXHJcbiAgICAgICAgICAgIHBsYXllckhhbmQuQ2xlYXIoKTtcclxuICAgICAgICAgICAgcGxheWVySGFuZC5BZGQoTW92ZVR5cGUuTW92ZVJpZ2h0KTtcclxuICAgICAgICAgICAgcGxheWVySGFuZC5BZGQoTW92ZVR5cGUuTW92ZUxlZnQpO1xyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kLkFkZChNb3ZlVHlwZS5Nb3ZlRG93bik7XHJcbiAgICAgICAgICAgIHBsYXllckhhbmQuQWRkKE1vdmVUeXBlLk1vdmVVcCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZSA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kLkFkZChNb3ZlVHlwZS5Ob3JtYWxTaG90KTtcclxuICAgICAgICAgICAgICAgIGVuZW15TW92ZXMgPSBuZXcgTW92ZVR5cGVbXSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVVwLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVEb3duLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Ob3JtYWxTaG90LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmQuQWRkKE1vdmVUeXBlLkZpcmUpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZC5BZGQoTW92ZVR5cGUuSWNlKTtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmQuQWRkKE1vdmVUeXBlLlRodW5kZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGVuZW15TW92ZXMgPSBuZXcgTW92ZVR5cGVbXSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZURvd24sXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVVwLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk1vdmVSaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5GaXJlLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLkljZSxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5UaHVuZGVyLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9wbGF5ZXJIYW5kLkFkZChNb3ZlVHlwZS5Ob3JtYWxTaG90KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIElzVmljdG9yeSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQmFzaWNDb25maWcoQmF0dGxlQmFzaWNDb25maWcgYmFzaWNDb25maWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlLlZhbCA9IGJhc2ljQ29uZmlnLm5UdXJucztcclxuICAgICAgICAgICAgbkVuZW1pZXMgPSBiYXNpY0NvbmZpZy5uRW5lbWllcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIEJhdHRsZUVudGl0eSBoZXJvID0gbmV3IEJhdHRsZUVudGl0eSgpO1xyXG5cclxuICAgICAgICAgICAgaGVyby5wb3MuU2V0KDEsIDEpO1xyXG4gICAgICAgICAgICBoZXJvLm1pblBvcy5TZXQoMCwgMCk7XHJcbiAgICAgICAgICAgIGhlcm8ubWF4UG9zLlNldCgyLCAyKTtcclxuICAgICAgICAgICAgaGVyby5UeXBlID0gRW50aXR5VHlwZS5oZXJvO1xyXG4gICAgICAgICAgICBoZXJvLmxpZmUgPSAyO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGhlcm8ubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhlcm8ubW92ZXNbaV0gPSAtMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZW50aXRpZXMuQWRkKGhlcm8pO1xyXG5cclxuICAgICAgICAgICAgRW5lbXlGYWN0b3J5LlNwYXduKCk7XHJcblxyXG4gICAgICAgICAgICAvL2ZvciAoaW50IGkgPSAwOyBpIDwgbkVuZW1pZXM7IGkrKylcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIEJhdHRsZUVudGl0eSBlbmVteSA9IG5ldyBCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgLy8gICAgZW5lbXkucG9zLlNldCgzICsgaSwgMSk7XHJcbiAgICAgICAgICAgIC8vICAgIGVuZW15Lm1pblBvcy5TZXQoMywgMCk7XHJcbiAgICAgICAgICAgIC8vICAgIGVuZW15Lm1heFBvcy5TZXQoNSwgMik7XHJcbiAgICAgICAgICAgIC8vICAgIGVuZW15LmxpZmUgPSAyO1xyXG4gICAgICAgICAgICAvLyAgICBlbmVteS5ncmFwaGljID0gMSArIGk7XHJcbiAgICAgICAgICAgIC8vICAgIGVuZW15LlR5cGUgPSBFbnRpdHlUeXBlLmVuZW15O1xyXG4gICAgICAgICAgICAvLyAgICBlbnRpdGllcy5BZGQoZW5lbXkpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vR2FtZUVudGl0eSBwaWNrdXAgPSBuZXcgR2FtZUVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgLy9waWNrdXAuVHlwZSA9IEVudGl0eVR5cGUucGlja3VwO1xyXG4gICAgICAgICAgICAgICAgLy9waWNrdXAucG9zLlNldCgwLCAyKTtcclxuICAgICAgICAgICAgICAgIC8vcGlja3VwLmxpZmUgPSAyO1xyXG4gICAgICAgICAgICAgICAgLy9waWNrdXAuZ3JhcGhpYyA9IDQ7XHJcbiAgICAgICAgICAgICAgICAvL2VudGl0aWVzLkFkZChwaWNrdXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBCYXR0bGVFbnRpdHkgcGFuZWxFZmZlY3QgPSBuZXcgQmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LlR5cGUgPSBFbnRpdHlUeXBlLnBhbmVsZWZmZWN0O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5wb3MuU2V0KDAsIDIpO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5saWZlID0gNTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuZ3JhcGhpYyA9IDU7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnJhbmRvbVBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuZHJhd0xpZmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuZHJhd1R1cm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgUmFuZG9tUG9zaXRpb24ocGFuZWxFZmZlY3QpO1xyXG4gICAgICAgICAgICAvLyAgICBlbnRpdGllcy5BZGQocGFuZWxFZmZlY3QpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBCYXR0bGVFbnRpdHkgcGFuZWxFZmZlY3QgPSBuZXcgQmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LlR5cGUgPSBFbnRpdHlUeXBlLnBhbmVsZWZmZWN0O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5wb3MuU2V0KDAsIDIpO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5saWZlID0gNTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuZ3JhcGhpYyA9IDU7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnJhbmRvbVBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuZHJhd0xpZmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuZHJhd1R1cm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgUmFuZG9tUG9zaXRpb24ocGFuZWxFZmZlY3QpO1xyXG4gICAgICAgICAgICAvLyAgICBlbnRpdGllcy5BZGQocGFuZWxFZmZlY3QpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIFJlc2V0KCk7XHJcbiAgICAgICAgICAgIEV4ZWN1dGVQaGFzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZUVudGl0eSBOZXdCYXR0bGVFbnRpdHkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQmF0dGxlRW50aXR5IGJhdHRsZUVudGl0eSA9IG5ldyBCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgZW50aXRpZXMuQWRkKGJhdHRsZUVudGl0eSk7XHJcbiAgICAgICAgICAgIHJldHVybiBiYXR0bGVFbnRpdHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZW50aXRpZXNbaV0ubGlmZSA9IGVudGl0aWVzW2ldLm1heExpZmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlKTtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUudHVybi5WYWwgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS50b3RhbFR1cm5zID0gMDtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5ID0gMDtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93LlZhbCA9IDA7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsID0gMTtcclxuICAgICAgICAgICAgYmF0dGxlUmVzdWx0LnJlc3VsdCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIElzT3ZlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlUmVzdWx0LnJlc3VsdCAhPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGaW5pc2hQcmV2aW91c1RpY2soKTtcclxuICAgICAgICAgICAgYm9vbCBoZXJvQWxpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYm9vbCBlbmVteUFsaXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5UeXBlID09IEVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGlmZSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZW15QWxpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uVHlwZSA9PSBFbnRpdHlUeXBlLmhlcm8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGlmZSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9BbGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFoZXJvQWxpdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVJlc3VsdC5yZXN1bHQgPSAyO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICghZW5lbXlBbGl2ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlUmVzdWx0LnJlc3VsdCA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJhdHRsZVJlc3VsdC5yZXN1bHQgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaGFwcE1hbmFnZXIuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgdGltZVN0YW1wLkFkdmFuY2UoMSk7XHJcbiAgICAgICAgICAgICAgICBFeGVjdXRlUGhhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aW1lVG9DaG9vc2UgPiAwICYmIGJhdHRsZVN0YXRlLnBoYXNlID09IEJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZVRvQ2hvb3NlIC09IGRlbHRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVUb0Nob29zZSA8PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEZpbmlzaFByZXZpb3VzVGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCYXR0bGVQaGFzZSBwcmV2aW91c1BoYXNlID0gYmF0dGxlU3RhdGUucGhhc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocHJldmlvdXNQaGFzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuSGFuZFJlY2hhcmdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuSGFuZFJlY2hhcmdlOlxyXG4gICAgICAgICAgICAgICAgICAgIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlLlBpY2tIYW5kcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLlBpY2tIYW5kczpcclxuICAgICAgICAgICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5FeGVjdXRlTW92ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cgPj0gYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93LlZhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBub01vcmVVbml0c1RvQWN0VGhpc1R1cm4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgaV9pbml0aWFsID0gYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlfaW5pdGlhbCA8IGVudGl0aWVzLkNvdW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gaV9pbml0aWFsOyBpIDwgZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXRpZXNbaV0uQWxpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub01vcmVVbml0c1RvQWN0VGhpc1R1cm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vTW9yZVVuaXRzVG9BY3RUaGlzVHVybilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhdHRsZVN0YXRlLnR1cm4gPj0gYmF0dGxlU3RhdGUudHVybnNQZXJQaGFzZSAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLnJhbmRvbVBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSYW5kb21Qb3NpdGlvbihlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLnR1cm4gPSBiYXR0bGVTdGF0ZS50dXJuICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS50b3RhbFR1cm5zICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93LlZhbCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgUmFuZG9tUG9zaXRpb24oQmF0dGxlRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLnBvcy5YID0gUmFuZG9tU3VwcGxpZXIuUmFuZ2UoMCwgNSk7XHJcbiAgICAgICAgICAgIGUucG9zLlkgPSBSYW5kb21TdXBwbGllci5SYW5nZSgwLCAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZSBwaGFzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJhdHRsZVBoYXNlIHByZXZpb3VzUGhhc2UgPSBiYXR0bGVTdGF0ZS5waGFzZTtcclxuICAgICAgICAgICAgaWYgKHBoYXNlID09IHByZXZpb3VzUGhhc2UpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHBoYXNlID09IEJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZVRvQ2hvb3NlID0gdGltZVRvQ2hvb3NlTWF4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcmV2aW91c1BoYXNlID09IEJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS50dXJuLlZhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93LlZhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbCA9IDE7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGUubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLm1vdmVzW2ldID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLnBoYXNlID0gcGhhc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRXhlY3V0ZVBoYXNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBwaGFzZSA9IGJhdHRsZVN0YXRlLnBoYXNlO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHBoYXNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkVuZW15TW92ZUNob2ljZTpcclxuICAgICAgICAgICAgICAgICAgICBFbmVteUdlbmVyYXRlTW92ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuSGFuZFJlY2hhcmdlOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5QaWNrSGFuZHM6XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzLkNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGhpIGluIHBsYXllckhhbmQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1vdmUsIChpbnQpaGkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzLkFkZChuZXcgVHVybmJhc2VkLklucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuUmVkbykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LkRvbmUpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmU6XHJcbiAgICAgICAgICAgICAgICAgICAgRXhlY3V0ZU1vdmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5wdXREb25lKElucHV0IGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiSU5QVVRURURcIik7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5Nb3ZlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBNb3ZlVHlwZSBhcmcxID0gKE1vdmVUeXBlKWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJJTlBVVFRFRDFcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVySGFuZC5Db250YWlucyhhcmcxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZShcIklOUFVUVEVEMlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlQ2hvc2VuKGFyZzEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT0gSW5wdXRUeXBlLk1pc2NCYXR0bGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1pc2NCYXR0bGVJbnB1dCBtaXNjID0gKE1pc2NCYXR0bGVJbnB1dClpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1pc2MgPT0gTWlzY0JhdHRsZUlucHV0LlJlZG8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlLm1vdmVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLm1vdmVzW2ldID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdmVzW2ldID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludCB2YWx1ZSA9IGUubW92ZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAtMSB8fCBpID09IGJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaSAtIDFdID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobWlzYyA9PSBNaXNjQmF0dGxlSW5wdXQuRG9uZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE1vdmVDaG9zZW4oTW92ZVR5cGUgbW92ZVR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLmhlcm8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlLm1vdmVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCB2YWx1ZSA9IGUubW92ZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdmVzW2ldID0gKGludCkgbW92ZVR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wdWJsaWMgdm9pZCBFbmVteUdlbmVyYXRlTW92ZXMoKVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgIC8vICAgIHtcclxuICAgICAgICAvLyAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgIC8vICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGUubW92ZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgLy8gICAgICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKGUubW92ZXNbaV0gPT0gbnVsbClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0gPSBuZXcgVmFsdWUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy9lLm1vdmVzW2ldLlZhbCA9IDA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZS5tb3Zlc1tpXS52YWxBc0VudW0gPSBSYW5kb21TdXBwbGllci5SYW5kb21FbGVtZW50KGVuZW15TW92ZXMpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRXhlY3V0ZU1vdmVzKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJibGFcIiArIGJhdHRsZVN0YXRlLnR1cm4uVmFsKTtcclxuICAgICAgICAgICAgLy9Db25zb2xlLlJlYWQoKTtcclxuICAgICAgICAgICAgQmF0dGxlRW50aXR5IGF0dGFja2VyID0gZW50aXRpZXNbYmF0dGxlU3RhdGUuYWN0aW5nRW50aXR5XTtcclxuICAgICAgICAgICAgaW50IHR1cm4gPSBiYXR0bGVTdGF0ZS50dXJuO1xyXG4gICAgICAgICAgICBFeGVjdXRlTW92ZShhdHRhY2tlciwgdHVybik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFeGVjdXRlTW92ZShCYXR0bGVFbnRpdHkgYWN0b3IsIGludCB0dXJuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTW92ZURhdGFFeGVjdXRlci5FeGVjdXRlTW92ZShhY3RvciwgdHVybik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IENhbGN1bGF0ZUF0dGFja011bHRpcGxpZXIoQmF0dGxlRW50aXR5IGFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJhc2VEID0gYWN0b3IuZGFtYWdlTXVsdGlwbGllcjtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlICE9IGFjdG9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnBvcyA9PSBhY3Rvci5wb3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VEICo9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJhc2VEO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBDYWxjdWxhdGVEZWZlbmRlck11bHRpcGxpZXIoQmF0dGxlRW50aXR5IGFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJhc2VEID0gMTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlICE9IGFjdG9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnBvcyA9PSBhY3Rvci5wb3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VEICo9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJhc2VEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEJhdHRsZVN0YXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgVmFsdWUgdHVybiA9IG5ldyBWYWx1ZSgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IHRvdGFsVHVybnM7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWYWx1ZSB0dXJuc1BlclBoYXNlID0gbmV3IFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWYWx1ZSBtb3ZlVGlja19Ob3cgPSBuZXcgVmFsdWUoKTtcclxuICAgICAgICAgICAgcHVibGljIGludCBtb3ZlVGlja19Ub3RhbCA9IDA7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgYWN0aW5nRW50aXR5ID0gMDtcclxuICAgICAgICAgICAgcHVibGljIEJhdHRsZVBoYXNlIHBoYXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEJhdHRsZUVudGl0eVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGludCBsaWZlO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBWYWx1ZSBhY3RpdmU7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBwb3MgPSBuZXcgVmVjdG9yMkQoKTtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIG1pblBvcyA9IG5ldyBWZWN0b3IyRCgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgbWF4UG9zID0gbmV3IFZlY3RvcjJEKCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIFZhbHVlIHZhbHVlO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50W10gbW92ZXMgPSBuZXcgaW50WzEwXTtcclxuICAgICAgICAgICAgcHVibGljIGludCBncmFwaGljO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IGdyYXBoaWNSZXBlYXRlZEluZGV4O1xyXG4gICAgICAgICAgICBwdWJsaWMgZmxvYXQgZGFtYWdlTXVsdGlwbGllciA9IDE7XHJcbiAgICAgICAgICAgIGludGVybmFsIGJvb2wgZHJhd0xpZmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBib29sIGRyYXdUdXJuID0gdHJ1ZTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgYm9vbCByYW5kb21Qb3NpdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwdWJsaWMgRWxlbWVudCBlbGVtZW50ID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5Ob25lO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBpbnQgbWF4TGlmZSA9IDM7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgRW50aXR5VHlwZSBUeXBlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIFBvc2l0aW9uVjJEIHsgZ2V0IHsgcmV0dXJuIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQocG9zLlgsIHBvcy5ZKTsgfSB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBEZWFkIHsgZ2V0IHsgcmV0dXJuIGxpZmUgPD0gMDsgfSB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBBbGl2ZSB7IGdldCB7IHJldHVybiAhdGhpcy5EZWFkOyB9IH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBNb3ZlVHlwZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRG9Ob3RoaW5nLFxyXG4gICAgICAgICAgICBNb3ZlVXAsXHJcbiAgICAgICAgICAgIE1vdmVMZWZ0LFxyXG4gICAgICAgICAgICBNb3ZlRG93bixcclxuICAgICAgICAgICAgTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICBOb3JtYWxTaG90LFxyXG4gICAgICAgICAgICBGaXJlLFxyXG4gICAgICAgICAgICBJY2UsXHJcbiAgICAgICAgICAgIFRodW5kZXIsXHJcbiAgICAgICAgICAgIEljZUJvbWIsXHJcbiAgICAgICAgICAgIFRodW5kZXJCb21iXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IEF0dGFja01vdmVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBFbGVtZW50IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyBNb3ZlVHlwZSBtb3ZlVHlwZTtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBBdHRhY2tNb3ZlKEVsZW1lbnQgZWxlbWVudCwgTW92ZVR5cGUgbW92ZVR5cGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUeXBlID0gbW92ZVR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEhhcHBUYWdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEF0dGFja0hpdCxcclxuICAgICAgICAgICAgQXR0YWNrTWlzcyxcclxuICAgICAgICAgICAgRGFtYWdlVGFrZW4sXHJcbiAgICAgICAgICAgIE1vdmVtZW50RmFpbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gQmF0dGxlUGhhc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVuZW15TW92ZUNob2ljZSxcclxuICAgICAgICAgICAgSGFuZFJlY2hhcmdlLFxyXG4gICAgICAgICAgICBQaWNrSGFuZHMsXHJcbiAgICAgICAgICAgIEV4ZWN1dGVNb3ZlLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gRW50aXR5VHlwZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaGVybywgZW5lbXksIHBpY2t1cCwgcGFuZWxlZmZlY3RcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBFbGVtZW50XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGaXJlLCBJY2UsIFRodW5kZXIsXHJcbiAgICAgICAgICAgIE5vbmVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVmFsdWVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgVmFsIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudW0gdmFsQXNFbnVtIHsgc2V0IHsgVmFsID0gQ29udmVydC5Ub1NpbmdsZSh2YWx1ZSk7IH0gfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldChpbnQgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZhbCA9IHY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZhbHVlIG9wZXJhdG9yICsoVmFsdWUgYzEsIGZsb2F0IGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYzEuVmFsICs9IGMyO1xyXG4gICAgICAgICAgICByZXR1cm4gYzE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IG9wZXJhdG9yIC0oVmFsdWUgYzEsIGZsb2F0IGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGMxLlZhbCAtIGMyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFZhbHVlIGMxLCBWYWx1ZSBjMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJvb2wgYzJudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMiwgbnVsbCk7XHJcbiAgICAgICAgICAgIGJvb2wgYzFudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmIChjMm51bGwgJiYgYzFudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGlmIChjMW51bGwgfHwgYzJudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGMxLlZhbCA9PSBjMi5WYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oVmFsdWUgYzEsIFZhbHVlIGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYm9vbCBjMm51bGwgPSBvYmplY3QuUmVmZXJlbmNlRXF1YWxzKGMyLCBudWxsKTtcclxuICAgICAgICAgICAgYm9vbCBjMW51bGwgPSBvYmplY3QuUmVmZXJlbmNlRXF1YWxzKGMxLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKGMybnVsbCAmJiBjMW51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChjMW51bGwgfHwgYzJudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYzEuVmFsICE9IGMyLlZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW1wbGljaXQgb3BlcmF0b3IgZmxvYXQoVmFsdWUgZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBkLlZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW1wbGljaXQgb3BlcmF0b3IgaW50KFZhbHVlIGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludClkLlZhbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIEJhdHRsZVJlc3VsdFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdHJ1Y3QgQmF0dGxlQmFzaWNDb25maWdcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IG5FbmVtaWVzO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgblR1cm5zO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlQmFzaWNDb25maWcoaW50IG5FbmVtaWVzLCBpbnQgblR1cm5zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5uRW5lbWllcyA9IG5FbmVtaWVzO1xyXG4gICAgICAgICAgICB0aGlzLm5UdXJucyA9IG5UdXJucztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0cnVjdCBJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBJbnB1dFR5cGUgdHlwZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGFyZzE7XHJcblxyXG4gICAgICAgIHB1YmxpYyBJbnB1dChJbnB1dFR5cGUgdHlwZSwgaW50IGFyZzEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLmFyZzEgPSBhcmcxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElucHV0KElucHV0VHlwZSB0eXBlLCBFbnVtIGFyZzEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLmFyZzEgPSBDb252ZXJ0LlRvSW50MzIoYXJnMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIElucHV0VHlwZVxyXG4gICAge1xyXG4gICAgICAgIE1vdmUsIE1pc2NCYXR0bGVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBNaXNjQmF0dGxlSW5wdXRcclxuICAgIHtcclxuICAgICAgICBEb25lLCBSZWRvXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVTZXR1cFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBwdWJsaWMgQmF0dGxlTWFpbiBiYXR0bGVNYWluO1xyXG4gICAgICAgIHB1YmxpYyBUaW1lU3RhbXAgdGltZVN0YW1wO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlU2V0dXAoaW50IG1vZGUsIEJhdHRsZUJhc2ljQ29uZmlnIGJhdHRsZUJhc2ljQ29uZmlnLCBpbnQgZGlmZmljdWx0eSwgTGlzdDxTdGFnZURhdGE+IHN0YWdlcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVjcyA9IEVDU01hbmFnZXIuQ3JlYXRlKCkgO1xyXG4gICAgICAgICAgICB0aW1lU3RhbXAgPSBuZXcgVGltZVN0YW1wKCk7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4gPSBuZXcgQmF0dGxlTWFpbihtb2RlLCBlY3MsIHRpbWVTdGFtcCk7XHJcbiAgICAgICAgICAgIHZhciBtY3AgPSBuZXcgTW92ZUNyZWF0b3JQcm9nKCk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHN0YWdlID0gc3RhZ2VzW2RpZmZpY3VsdHldO1xyXG4gICAgICAgICAgICB2YXIgZW5teXMgPSBzdGFnZS5lbmVteVNwYXducztcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gZW5teXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBiYXR0bGVNYWluLk1vdmVEYXRhRXhlY3V0ZXIgPSBuZXcgTW92ZURhdGFFeGVjdXRlcihiYXR0bGVNYWluLCBtY3AubW92ZURhdGFzLCBlY3MsIHRpbWVTdGFtcCk7XHJcblxyXG4gICAgICAgICAgICBMaXN0PHN0cmluZz4gZW50aXR5UmVuZGVyVGV4dHMgPSBuZXcgTGlzdDxzdHJpbmc+KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW5lbXlEYXRhcyA9IG5ldyBFbmVteURhdGFDcmVhdG9yKGVudGl0eVJlbmRlclRleHRzKS5lbmVteURhdGFzO1xyXG4gICAgICAgICAgICB2YXIgYmF0dGxlU3RhdGUgPSBiYXR0bGVNYWluLmJhdHRsZVN0YXRlO1xyXG5cclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5CYXNpY0NvbmZpZyhiYXNpY0NvbmZpZzpiYXR0bGVCYXNpY0NvbmZpZyk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGVuZW15RmFjdG9yeSA9IG5ldyBFbmVteUVudGl0eUZhY3RvcnkoZWNzLCBlbmVteURhdGFzLCBiYXR0bGVNYWluKTtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5FbmVteUZhY3RvcnkgPSBlbmVteUZhY3Rvcnk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW5lbXlBaXMgPSBlY3MuUXVpY2tBY2Nlc3NvcjI8RW5lbXlBSSwgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHk+KCk7XHJcbiAgICAgICAgICAgIHZhciBlbmVteUFpU3RhdGVsZXNzID0gZWNzLkNyZWF0ZUFjY2Vzc29yKG5lY2Vzc2FyeTogbmV3IFR5cGVbXSB7IHR5cGVvZihFbmVteUFJKSB9LCBub3Q6IG5ldyBUeXBlW10geyB0eXBlb2YoRW5lbXlBSVN0YXRlKSB9KTtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbi5FbmVteUdlbmVyYXRlTW92ZXMgPSAoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW5lbXlBaVN0YXRlbGVzcy5MZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZW15QWlTdGF0ZWxlc3MuR2V0KDApLkFkZENvbXBvbmVudDxFbmVteUFJU3RhdGU+KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlbmVteUFpcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWkgPSBlbmVteUFpcy5Db21wMShpKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmF0dGxlciA9IGVuZW15QWlzLkNvbXAyKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhaVN0YXRlID0gZW5lbXlBaXMuRW50aXR5KGkpLkdldENvbXBvbmVudDxFbmVteUFJU3RhdGU+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmVzID0gYWkubW92ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgYWlQcm8gPSAoaisgYWlTdGF0ZS5wcm9ncmVzcykgJSBtb3Zlcy5Db3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmUgPSBtb3Zlc1thaVByb107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb3ZlIGlzIE1vdmVVc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVyLm1vdmVzW2pdID0gKG1vdmUgYXMgTW92ZVVzZSkubW92ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2JlLm1vdmVzW2pdID0gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhaVN0YXRlLnByb2dyZXNzICs9IGJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDb2xvclN0dWZmXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgc3RyaW5nIEdvb2RNYWluO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIG5ldXRyYWxEYXJrID0gXCIjMTkwMTNiXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgbmV1dHJhbFN0cm9uZyA9IFwiIzJjM2U0M1wiO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHN0cmluZyBHb29kU3ViO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHN0cmluZyBFdmlsTWFpbjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZ1tdIGNvbG9ycyA9IG5ldyBzdHJpbmdbMjBdO1xyXG5cclxuICAgICAgICBzdGF0aWMgQ29sb3JTdHVmZigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvbG9ycy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sb3JzW2ldID0gXCIjMTMxMzEzXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkhlcm9dID0gXCIjMDA5YzhkXCI7XHJcbiAgICAgICAgICAgIC8vY29uc3Qgc3RyaW5nIGhlcm9TdWIgPSBcIiMwMDVmOTFcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkhlcm9UdXJuXSA9IGhlcm9TdWI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5FbmVteV0gPSBcIiNmZjAzNTNcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkdyaWRIZXJvXSA9IGhlcm9TdWI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEVuZW15XSA9IFwiIzhlMDA2MFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15VHVybl0gPSBcIiM4ZTAwNjBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5Cb2FyZF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5pbnB1dEtleV0gPSBcIiM2ODg2OTBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5GaXJlQXVyYV0gPSBcIiM3OTMxMDBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5JY2VBdXJhXSA9IFwiIzAwNTU5MFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJBdXJhXSA9IFwiIzAwNTgzZFwiO1xyXG5cclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dID0gXCIjOGFkODk2XCI7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyBoZXJvU3ViID0gXCIjNGM2ZDUwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvVHVybl0gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXldID0gXCIjZmY3Njk0XCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVyb10gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgZW5lbXlzdWIgPSBcIiNhNzQ2NGZcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRFbmVteV0gPSBlbmVteXN1YjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15VHVybl0gPSBlbmVteXN1YjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQm9hcmRdID0gXCIjMWU0ODZlXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLmlucHV0S2V5XSA9IFwiIzY4ODY5MFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuRmlyZUF1cmFdID0gXCIjNzkzMTAwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkljZUF1cmFdID0gXCIjMDA1NTkwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJBdXJhXSA9IFwiIzAwNTgzZFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5GaXJlU2hvdF0gPSBcIiNmODJiMzZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuSWNlU2hvdF0gPSBcIiMwMDdlZmZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuVGh1bmRlclNob3RdID0gXCIjYTM3YzAwXCI7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkRlYnVnRXh0cmFcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBEZWJ1Z0V4XHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIExpc3Q8c3RyaW5nPiBtZXNzYWdlcyA9IG5ldyBMaXN0PHN0cmluZz4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIExvZyhzdHJpbmcgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VzLkFkZCh2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG93KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnNvbGUuQ2xlYXIoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbWVzc2FnZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ29uc29sZS5SZWFkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRW5lbXlBSVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBMaXN0PG9iamVjdD4gbW92ZXMgPSBuZXcgTGlzdDxvYmplY3Q+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEVuZW15QUlTdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgcHJvZ3Jlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIExvb3BcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxvYmplY3Q+IGFjdGlvbnMgPSBuZXcgTGlzdDxvYmplY3Q+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdmVVc2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IG1vdmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlVXNlKGludCBtb3ZlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlID0gbW92ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guRUNTO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEVuZW15RW50aXR5RmFjdG9yeVxyXG4gICAge1xyXG5cclxuICAgICAgICBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBMaXN0PEVuZW15RGF0YT4gZW5lbXlEYXRhcztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEJhdHRsZU1haW4gYmF0dGxlTWFpbjtcclxuICAgICAgICBwcml2YXRlIFF1aWNrQWNjZXNzb3JPbmU8RW5lbXlTcGF3bkRhdGE+IHNwYXducztcclxuXHJcbiAgICAgICAgcHVibGljIEVuZW15RW50aXR5RmFjdG9yeShFQ1NNYW5hZ2VyIGVjcywgTGlzdDxFbmVteURhdGE+IGVuZW15RGF0YXMsIEJhdHRsZU1haW4gYmF0dGxlTWFpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWNzID0gZWNzO1xyXG4gICAgICAgICAgICAvL2Vjcy5RdWlja0FjY2Vzc29yMTxFbmVteURhdGE+KCk7XHJcbiAgICAgICAgICAgIHNwYXducyA9IGVjcy5RdWlja0FjY2Vzc29yMTxFbmVteVNwYXduRGF0YT4oKTtcclxuICAgICAgICAgICAgdGhpcy5lbmVteURhdGFzID0gZW5lbXlEYXRhcztcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVNYWluID0gYmF0dGxlTWFpbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNwYXduKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgc3Bhd25zLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICBFbmVteVNwYXduRGF0YSBzcGF3biA9IHNwYXducy5Db21wMShpKTtcclxuICAgICAgICAgICAgICAgIHZhciBpZCA9IHNwYXduLmVuZW15SWQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW5lbXlBSSA9IGVuZW15RGF0YXNbaWRdLmVuZW15QUk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW5lbXkgPSBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChlbmVteUFJKTtcclxuICAgICAgICAgICAgICAgIHZhciBiZSA9IGJhdHRsZU1haW4uTmV3QmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICBiZS5wb3MgPSBzcGF3bi5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGJlLmxpZmUgPSBlbmVteURhdGFzW2lkXS5ocDtcclxuICAgICAgICAgICAgICAgIGJlLm1heExpZmUgPSBiZS5saWZlO1xyXG4gICAgICAgICAgICAgICAgYmUuZ3JhcGhpYyA9IGVuZW15RGF0YXNbaWRdLnJlbmRlcjtcclxuICAgICAgICAgICAgICAgIHZhciBlbnRpdGllcyA9IGJhdHRsZU1haW4uZW50aXRpZXM7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBlbnRpdGllcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSE9IGJlICYmIGl0ZW0uZ3JhcGhpYyA9PSBiZS5ncmFwaGljKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmUuZ3JhcGhpY1JlcGVhdGVkSW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBiZS5taW5Qb3MgPSBuZXcgVmVjdG9yMkQoMywgMCk7XHJcbiAgICAgICAgICAgICAgICBiZS5tYXhQb3MgPSBuZXcgVmVjdG9yMkQoNSwgMik7XHJcbiAgICAgICAgICAgICAgICBiZS5UeXBlID0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15O1xyXG4gICAgICAgICAgICAgICAgZW5lbXkuQWRkQ29tcG9uZW50KGJlKTtcclxuICAgICAgICAgICAgICAgIEVuZW15QUlTdGF0ZSBlbmVteUFpU3RhdGUgPSBuZXcgRW5lbXlBSVN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICBlbmVteUFpU3RhdGUucHJvZ3Jlc3MgPSBpO1xyXG4gICAgICAgICAgICAgICAgZW5lbXkuQWRkQ29tcG9uZW50KGVuZW15QWlTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCJTUEFXTlwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEVuZW15U3Bhd25EYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBlbmVteUlkO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXNlVXRpbHMuVmVjdG9yMkQgcG9zaXRpb247XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmVteVNwYXduRGF0YShpbnQgZW5lbXlJZCwgVmVjdG9yMkQgcG9zaXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15SWQgPSBlbmVteUlkO1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBFbmVteURhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgRW5lbXlBSSBlbmVteUFJO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgaHA7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCByZW5kZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmVteURhdGEoRW5lbXlBSSBlbmVteUFJLCBpbnQgaHAsIGludCByZW5kZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15QUkgPSBlbmVteUFJO1xyXG4gICAgICAgICAgICB0aGlzLmhwID0gaHA7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyID0gcmVuZGVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRW5lbXlEYXRhQ3JlYXRvclxyXG4gICAge1xyXG4gICAgICAgIExpc3Q8c3RyaW5nPiByZW5kZXJUZXh0cztcclxuICAgICAgICBwdWJsaWMgTGlzdDxFbmVteURhdGE+IGVuZW15RGF0YXMgPSBuZXcgTGlzdDxFbmVteURhdGE+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmVteURhdGFDcmVhdG9yKExpc3Q8c3RyaW5nPiByZW5kZXJUZXh0cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVGV4dHMgPSByZW5kZXJUZXh0cztcclxuXHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAgICAgTW92ZXMoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQsUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24sIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVSaWdodCwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyKVxyXG4gICAgICAgICAgICAgICAgKSwgaHA6MiwgcmVuZGVyVGV4dDpcIiVcIik7XHJcbiAgICAgICAgICAgIEFkZEVuZW15KGFpOiBBY3Rpb25zKFxyXG4gICAgICAgICAgICAgICAgTW92ZXMoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuRG9Ob3RoaW5nLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb05vdGhpbmcpXHJcbiAgICAgICAgICAgICAgICApLCBocDogMywgcmVuZGVyVGV4dDogXCIjXCIpO1xyXG4gICAgICAgICAgICBBZGRFbmVteShhaTogQWN0aW9ucyhcclxuICAgICAgICAgICAgICAgTW92ZXMoXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZS5JY2VCb21iLCBcclxuICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlckJvbWIsXHJcbiAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVxyXG4uTW92ZVJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICksIGhwOiA2LCByZW5kZXJUZXh0OiBcIiZcIik7XHJcbiAgICAgICAgICAgIC8vQWRkRW5lbXkoYWk6IEFjdGlvbnMoKSwgaHA6IDMsIHJlbmRlclRleHQ6IFwiJFwiKTtcclxuICAgICAgICAgICAgLy9BZGRFbmVteShhaTogQWN0aW9ucygpLCBocDogNSwgcmVuZGVyVGV4dDogXCIjXCIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgRW5lbXlBSSBBY3Rpb25zKHBhcmFtcyBvYmplY3RbXSBvYnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYWkgPSBuZXcgRW5lbXlBSSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG8gaW4gb2JzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAobyBpcyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZVtdKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBvIGFzIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlW10pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhaS5tb3Zlcy5BZGQobmV3IE1vdmVVc2UoKGludClpdGVtKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpLm1vdmVzLkFkZChvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlW10gTW92ZXMocGFyYW1zIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlW10gbW92ZXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbW92ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkRW5lbXkoRW5lbXlBSSBhaSwgaW50IGhwLCBzdHJpbmcgcmVuZGVyVGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCByZW5kZXIgPSByZW5kZXJUZXh0cy5Db3VudDtcclxuICAgICAgICAgICAgcmVuZGVyVGV4dHMuQWRkKHJlbmRlclRleHQpO1xyXG4gICAgICAgICAgICBlbmVteURhdGFzLkFkZChuZXcgRW5lbXlEYXRhKGFpLCBocCwgcmVuZGVyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5IYXBwcztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLkVDUztcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1vdmVEYXRhRXhlY3V0ZXJcclxuICAgIHtcclxuICAgICAgICBCYXR0bGVNYWluIHR1cm5CYXNlO1xyXG4gICAgICAgIExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcztcclxuICAgICAgICBwcml2YXRlIEhhcHBNYW5hZ2VyIGhhcHBNYW5hZ2VyO1xyXG4gICAgICAgIHByaXZhdGUgTGlzdDxCYXR0bGVNYWluLkJhdHRsZUVudGl0eT4gZW50aXRpZXM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBFQ1NNYW5hZ2VyIGVjcztcclxuICAgICAgICBUaW1lU3RhbXAgdGltZVN0YW1wO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZURhdGFFeGVjdXRlcihCYXR0bGVNYWluIHR1cm5CYXNlLCBMaXN0PE1vdmVEYXRhPiBtb3ZlRGF0YXMsIEVDU01hbmFnZXIgZWNzLCBUaW1lU3RhbXAgdGltZVN0YW1wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50dXJuQmFzZSA9IHR1cm5CYXNlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEYXRhcyA9IG1vdmVEYXRhcztcclxuICAgICAgICAgICAgdGhpcy5lY3MgPSBlY3M7XHJcbiAgICAgICAgICAgIHRoaXMudGltZVN0YW1wID0gdGltZVN0YW1wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRXhlY3V0ZU1vdmUoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgYWN0b3IsIGludCB0dXJuKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgYmF0dGxlU3RhdGUgPSB0aGlzLnR1cm5CYXNlLmJhdHRsZVN0YXRlO1xyXG4gICAgICAgICAgICBlbnRpdGllcyA9IHRoaXMudHVybkJhc2UuZW50aXRpZXM7XHJcbiAgICAgICAgICAgIGludCB1c2VySWQgPSBlbnRpdGllcy5JbmRleE9mKGFjdG9yKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtb3ZlSWQgPSBhY3Rvci5tb3Zlc1t0dXJuXTtcclxuICAgICAgICAgICAgaWYgKG1vdmVJZCA8IDApIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIG1kID0gbW92ZURhdGFzW21vdmVJZF07XHJcbiAgICAgICAgICAgIGlmIChtZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsID0gbWQudW5pdHMuQ291bnQ7XHJcbiAgICAgICAgICAgIGludCBtb3ZlVGljayA9IGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdztcclxuICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtZC51bml0c1ttb3ZlVGlja10udGhpbmdzVG9IYXBwZW47XHJcbiAgICAgICAgICAgIGhhcHBNYW5hZ2VyID0gdHVybkJhc2UuaGFwcE1hbmFnZXI7XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYSBpbiBhY3Rpb25zKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGEgaXMgTW92ZUFjdGlvbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlQWN0aW9uIG1hID0gYSBhcyBNb3ZlQWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwID0gbWEuZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0b3IucG9zICs9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBpbnZhbGlkTW92ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLnBvcy5YIDwgYWN0b3IubWluUG9zLlhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgYWN0b3IucG9zLlkgPCBhY3Rvci5taW5Qb3MuWVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhY3Rvci5wb3MuWSA+IGFjdG9yLm1heFBvcy5ZXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGFjdG9yLnBvcy5YID4gYWN0b3IubWF4UG9zLlg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZSAhPSBhY3RvciAmJiBlLkFsaXZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0b3IucG9zID09IGUucG9zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRNb3ZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5waWNrdXApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmxpZmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5kYW1hZ2VNdWx0aXBsaWVyID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZE1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW52YWxpZE1vdmUpIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGludmFsaWRNb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkludmFsaWQgbW92ZSBnZW5lcmF0ZVwiICsgYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93LlZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgYWN0b3JJZCA9IGVudGl0aWVzLkluZGV4T2YoYWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDcmVhdGVIYXBwKG1kLCBuZXcgSGFwcE1vdmVEYXRhKGFjdG9ySWQpLG5ldyBIYXBwTW92ZW1lbnRGYWlsKGFjdG9yLnBvcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlLmhhcHBNYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQWRkKG5ldyBIYXBwKEJhdHRsZU1haW4uSGFwcFRhZy5Nb3ZlbWVudEZhaWwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShhY3RvcklkKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoYWN0b3IucG9zLlgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShhY3Rvci5wb3MuWSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5wb3MgLT0gcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYSBpcyBEZWFsRGFtYWdlQWN0aW9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZGEgPSBhIGFzIERlYWxEYW1hZ2VBY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dGFja0VsZW1lbnQgPSBkZGEuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rvci5lbGVtZW50ID0gYXR0YWNrRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGRhLnRhcmdldCA9PSBUYXJnZXQuQXJlYSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmVhID0gZGRhLmFyZWE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZlcmVuY2VVc2VyT2ZBcmVhID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGFyZWEudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IG1pcnJvcmluZ1ggPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0b3IuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpIC8vZW5lbWllcyBhY3Qgb24gb3Bwb3NpdGUgc2lkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXJyb3JpbmdYID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHBvaW50IGluIGFyZWEucG9pbnRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VhcmNoUG9zID0gcG9pbnQgKiBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKG1pcnJvcmluZ1gsIDEpICsgcmVmZXJlbmNlVXNlck9mQXJlYS5wb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiU2VhcmNoIHBvaW50IFwiK3NlYXJjaFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0aWVzW2ldLnBvcyA9PSBzZWFyY2hQb3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWFsRGFtYWdlKGFjdG9yLCBkZGEsIGVudGl0aWVzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZmluZCB0YXJnZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgdGFyZ2V0ID0gUmVzb2x2ZVRhcmdldChhY3RvciwgZW50aXRpZXMsIGRkYS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlYWxEYW1hZ2UoYWN0b3IsIGRkYSwgdGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYSBpcyBBbmltYXRpb24pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuaW0gPSBhIGFzIEFuaW1hdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSB0YXJnZXQgPSBSZXNvbHZlVGFyZ2V0KGFjdG9yLCBlbnRpdGllcywgYW5pbS50YXJnZXQpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcmVhID0gYW5pbS5hcmVhO1xyXG4gICAgICAgICAgICAgICAgICAgIEhhcHBBcmVhIGhhcHBBcmVhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJlYSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZmVyZW5jZVVzZXJPZkFyZWEgPSBSZXNvbHZlVGFyZ2V0KGFjdG9yLCBlbnRpdGllcywgYXJlYS50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IG1pcnJvcmluZ1ggPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0b3IuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpIC8vZW5lbWllcyBhY3Qgb24gb3Bwb3NpdGUgc2lkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaXJyb3JpbmdYID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcEFyZWEgPSBuZXcgSGFwcEFyZWEoYXJlYSwgcmVmZXJlbmNlVXNlck9mQXJlYS5wb3MsIG1pcnJvcmluZ1gpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpbnQgdGFyZ2V0SWQgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0YXJnZXQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSBlbnRpdGllcy5JbmRleE9mKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3JlYXRlSGFwcChtZCwgaGFwcEFyZWEsIG5ldyBIYXBwTW92ZURhdGEodXNlcklkLCB0YXJnZXRJZCwgYW5pbS5lbGVtZW50KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmltLnRhcmdldCAhPSBUYXJnZXQuTm9uZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBNYW5hZ2VyXHJcbi5BZGQobmV3IEhhcHAoQmF0dGxlTWFpbi5IYXBwVGFnLkF0dGFja0hpdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoZW50aXRpZXMuSW5kZXhPZih0YXJnZXQpKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZSh1c2VySWQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKChpbnQpYW5pbS5lbGVtZW50KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDcmVhdGVIYXBwKE1vdmVEYXRhIG1kLCBvYmplY3QgY29tcDEsIG9iamVjdCBjb21wMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0aCA9IG5ldyBIYXBwVGFncyhtZC50YWdzKTtcclxuICAgICAgICAgICAgdmFyIGUgPSBlY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudCh0aCwgdGltZVN0YW1wLkdldFNuYXAoKSk7XHJcbiAgICAgICAgICAgIGlmKGNvbXAxIT0gbnVsbCllLkFkZENvbXBvbmVudChjb21wMSk7XHJcbiAgICAgICAgICAgIGlmIChjb21wMiAhPSBudWxsKSBlLkFkZENvbXBvbmVudChjb21wMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRGVhbERhbWFnZShCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBhY3RvciwgRGVhbERhbWFnZUFjdGlvbiBkZGEsIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IHRhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJvb2wgZWxlbWVudGFsQmxvY2sgPSBhY3Rvci5lbGVtZW50ID09IHRhcmdldC5lbGVtZW50ICYmIGFjdG9yLmVsZW1lbnQgIT0gQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmU7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50YWxCbG9jaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghZWxlbWVudGFsQmxvY2spXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG11bCA9IHR1cm5CYXNlLkNhbGN1bGF0ZUF0dGFja011bHRpcGxpZXIoYWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIG11bCAqPSB0dXJuQmFzZS5DYWxjdWxhdGVEZWZlbmRlck11bHRpcGxpZXIodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGFjdG9yLmVsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkZpcmUgJiYgdGFyZ2V0LmVsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkljZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgKGFjdG9yLmVsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIgJiYgdGFyZ2V0LmVsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LkZpcmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IChhY3Rvci5lbGVtZW50ID09IEJhdHRsZU1haW4uRWxlbWVudC5JY2UgJiYgdGFyZ2V0LmVsZW1lbnQgPT0gQmF0dGxlTWFpbi5FbGVtZW50LlRodW5kZXIpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsICo9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmxpZmUgLT0gZGRhLmRhbWFnZSAqIChpbnQpbXVsO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdG9yLmRhbWFnZU11bHRpcGxpZXIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhcHBNYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgLkFkZChuZXcgSGFwcChCYXR0bGVNYWluLkhhcHBUYWcuRGFtYWdlVGFrZW4pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoZW50aXRpZXMuSW5kZXhPZih0YXJnZXQpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IFJlc29sdmVUYXJnZXQoQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgYWN0b3IsIExpc3Q8QmF0dGxlTWFpbi5CYXR0bGVFbnRpdHk+IGVudGl0aWVzLCBUYXJnZXQgdGFyZ2V0VHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRUeXBlID09IFRhcmdldC5TZWxmKSByZXR1cm4gYWN0b3I7XHJcbiAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IHRhcmdldCA9IG51bGw7XHJcbiAgICAgICAgICAgIGZsb2F0IG1pbkRpcyA9IDEwO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZTIgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZTIuRGVhZCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0b3IuVHlwZSAhPSBlMi5UeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgZTIuVHlwZSAhPSBCYXR0bGVNYWluLkVudGl0eVR5cGUucGFuZWxlZmZlY3RcclxuICAgICAgICAgICAgICAgICAgICAmJiBlMi5UeXBlICE9IEJhdHRsZU1haW4uRW50aXR5VHlwZS5waWNrdXApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBzYW1lSGVpZ2h0ID0gYWN0b3IucG9zLlkgPT0gZTIucG9zLlk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzYW1lSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXQgZGlzID0gYWN0b3IucG9zLlggLSBlMi5wb3MuWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcyA8IDApIGRpcyAqPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcyA8IG1pbkRpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluRGlzID0gZGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gZTI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcFRhZ3NcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IHRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwVGFncyhMaXN0PGludD4gdGFncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGFncy5BZGRSYW5nZSh0YWdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBNb3ZlRGF0YVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgdXNlcjtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHRhcmdldCA9IC0xO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBCYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IEJhdHRsZU1haW4uRWxlbWVudC5Ob25lO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcE1vdmVEYXRhKGludCB1c2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwTW92ZURhdGEoaW50IHVzZXIsIGludCB0YXJnZXQsIEJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwTW92ZW1lbnRGYWlsXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFZlY3RvcjJEIG1vdmVUbztcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBNb3ZlbWVudEZhaWwoVmVjdG9yMkQgbW92ZVRvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlVG8gPSBtb3ZlVG87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIYXBwQXJlYVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBBcmVhIGFyZWE7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEIG9mZnNldCA9IG5ldyBWZWN0b3IyRCgpO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgbWlycm9yaW5nWDtcclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBBcmVhKEFyZWEgYXJlYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEFyZWEoQXJlYSBhcmVhLCBWZWN0b3IyRCBvZmZzZXQsIGludCBtaXJyb3JpbmdYKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhID0gYXJlYTtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIHRoaXMubWlycm9yaW5nWCA9IG1pcnJvcmluZ1g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuRGVidWdFeHRyYTtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5IYXBwc1xyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBDdXJyZW50VGltZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBMaXN0PEhhcHA+IEhhcHBzID0gbmV3IExpc3Q8SGFwcD4oKTtcclxuICAgICAgICBMaXN0PEhhcHBIYW5kbGVyPiBoYW5kbGVycyA9IG5ldyBMaXN0PEhhcHBIYW5kbGVyPigpO1xyXG4gICAgICAgIGludCBsYXRlc3RIYW5kbGVkID0gLTE7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZEhhbmRsZXIoSGFwcEhhbmRsZXIgaGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBoYW5kbGVycy5BZGQoaGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVHJ5SGFuZGxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGxhdGVzdEhhbmRsZWQgIT0gQ3VycmVudFRpbWUpXHJcbiAgICAgICAgICAgICAgICBIYW5kbGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBIYW5kbGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGF0ZXN0SGFuZGxlZCA9IEN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaCBpbiBoYW5kbGVycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IEhhcHBzLkNvdW50IC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGNoZWNrIGFzc3VtZXMgaGFwcHMgYXJlIG9yZGVyZWQgYnkgdGltZSBzdGFtcFxyXG4gICAgICAgICAgICAgICAgICAgIC8vd2hpY2ggdGhleSBzaG91bGQgYmUgYXV0b21hdGljYWxseVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChIYXBwc1tpXS5UaW1lU3RhbXAgIT0gQ3VycmVudFRpbWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWJ1Z0V4LkxvZyhcIkhhcHBlbmluZyBub3QgZXF1YWwgdG8gY3VycmVudCB0aW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBoYXNUYWdzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdGFnc05lZWRlZCBpbiBoLm5lY2Vzc2FyeVRhZ3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUhhcHBzW2ldLkhhc1RhZyh0YWdzTmVlZGVkKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzVGFncyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1RhZ3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWJ1Z0V4LkxvZyhcIkhhcHBlbmluZyBoYW5kbGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoLkhhbmRsZShIYXBwc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlYnVnRXguTG9nKFwiSGFwcGVuaW5nIHRhZyBpcyBkaWZmZXJlbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcCBBZGQoSGFwcCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaC5UaW1lU3RhbXAgPSBDdXJyZW50VGltZTtcclxuICAgICAgICAgICAgSGFwcHMuQWRkKGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gaDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFRpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VycmVudFRpbWUrKztcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBcclxuICAgIHtcclxuICAgICAgICAvL3B1YmxpYyBzdHJpbmcgTWFpblRhZztcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IHRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIGludCBUaW1lU3RhbXA7XHJcbiAgICAgICAgTGlzdDxBdHRyaWJ1dGU+IGF0dHJzID0gbmV3IExpc3Q8QXR0cmlidXRlPigpO1xyXG5cclxuICAgICAgICAvL3B1YmxpYyBIYXBwKElDb252ZXJ0aWJsZSBjKVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vICAgIHRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihjKSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwKG9iamVjdCBtYWluVGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9NYWluVGFnID0gbWFpblRhZy5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICB0YWdzLkFkZChDb252ZXJ0LlRvSW50MzIobWFpblRhZykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIEF0dHJpYnV0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IFZhbHVlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgQXR0cmlidXRlIFNldFZhbHVlKGZsb2F0IGYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFZhbHVlID0gZjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBUYWdIb2xkZXIgdGFncyA9IG5ldyBUYWdIb2xkZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwIEFkZEF0dHJpYnV0ZShBdHRyaWJ1dGUgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF0dHJzLkFkZChhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBpbnQgR2V0QXR0cmlidXRlX0ludChpbnQgaW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludClhdHRyc1tpbmRleF0uVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIEhhc1RhZyhpbnQgdGFnc05lZWRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YWdzLkNvbnRhaW5zKHRhZ3NOZWVkZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcEhhbmRsZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxpbnQ+IG5lY2Vzc2FyeVRhZ3MgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIEFjdGlvbjxIYXBwPiBIYW5kbGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwSGFuZGxlcihvYmplY3QgbWFpblRhZywgQWN0aW9uPEhhcHA+IGhhbmRsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubmVjZXNzYXJ5VGFncy5BZGQoQ29udmVydC5Ub0ludDMyKG1haW5UYWcpKTtcclxuICAgICAgICAgICAgSGFuZGxlID0gaGFuZGxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGFnSG9sZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8b2JqZWN0PiBUYWdzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBIYXNUYWcob2JqZWN0IHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGFncy5Db250YWlucyh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgQWRkKG9iamVjdCB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGFncy5BZGQodik7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgTGlzdDxvYmplY3Q+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19UYWdzPW5ldyBMaXN0PG9iamVjdD4oKTt9XHJcblxyXG5cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1vdmVDcmVhdG9yUHJvZ1xyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8TW92ZURhdGE+IG1vdmVEYXRhcyA9IG5ldyBMaXN0PE1vdmVEYXRhPigpO1xyXG4gICAgICAgIGludGVybmFsIExpc3Q8TW92ZVJlbmRlckRhdGE+IG1vdmVSZW5kZXJzID0gbmV3IExpc3Q8TW92ZVJlbmRlckRhdGE+KCk7XHJcbiAgICAgICAgQXJlYUNyZWF0aW9uVXRpbHMgYXJlYVV0aWxzID0gbmV3IEFyZWFDcmVhdGlvblV0aWxzKCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3ZlQ3JlYXRvclByb2coKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW92ZURhdGFzLkFkZChudWxsKTsgLy9kbyBub3RoaW5nXHJcbiAgICAgICAgICAgIEJhc2VVdGlscy5WZWN0b3IyRFtdIGRpcmVjdGlvbnMgPSBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEW10ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIDEpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgtMSwgMCksXHJcbiAgICAgICAgICAgICAgICBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDAsIC0xKSxcclxuICAgICAgICAgICAgICAgIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMSwgMCksIFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzdHJpbmdbXSBtb3ZlTGFiZWxzID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBVcFwiLFxyXG4gICAgICAgICAgICAgICAgXCJNb3ZlIExlZnRcIixcclxuICAgICAgICAgICAgICAgIFwiTW92ZSBEb3duXCIsXHJcbiAgICAgICAgICAgICAgICBcIk1vdmUgUmlnaHRcIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc3RyaW5nW10gbW92ZUFicmV2ID0gbmV3IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgICAgIFwiXlwiLFxyXG4gICAgICAgICAgICAgICAgXCI8XCIsXHJcbiAgICAgICAgICAgICAgICBcInZcIixcclxuICAgICAgICAgICAgICAgIFwiPlwiLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGRpcmVjdGlvbnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE5ld01vdmVEYXRhKGxhYmVsOm1vdmVMYWJlbHNbaV0sIGNvbmRpdGlvbjogbmV3IENvbmRpdGlvbihDb25kaXRpb25UeXBlLkNhbk1vdmUsIFRhcmdldC5TZWxmLCBkaXJlY3Rpb25zW2ldKSwgYWN0aW9uOiBuZXcgTW92ZUFjdGlvbihUYXJnZXQuU2VsZiwgZGlyZWN0aW9uc1tpXSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5Nb3ZlbWVudCwgIE1vdmVEYXRhVGFncy5IZXJvSW5pdGlhbCkpO1xyXG4gICAgICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKG5hbWU6bW92ZUxhYmVsc1tpXSwgYWJyZXY6bW92ZUFicmV2W2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkd1blwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgMSwgQmF0dGxlTWFpbi5FbGVtZW50Lk5vbmUpKSwgdGFnczogVGFnQXJyYXkoTW92ZURhdGFUYWdzLlNob290KSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIkd1blwiLCBcIkdcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkZpcmVndW5cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5GaXJlKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TaG9vdCkpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJGaXJlZ3VuXCIsIFwiRkdcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkljZWd1blwiLCB0aWNrczogT25lVGlja1BlckFjdGlvbihuZXcgQW5pbWF0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKFRhcmdldC5DbG9zZXN0VGFyZ2V0WCwgMSwgQmF0dGxlTWFpbi5FbGVtZW50LkljZSkpLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuU2hvb3QpKTtcclxuICAgICAgICAgICAgTmV3TW92ZVRleHRSZW5kZXJEYXRhKFwiSWNlZ3VuXCIsIFwiSUdcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIlRodW5kZXJndW5cIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgpLCBuZXcgRGVhbERhbWFnZUFjdGlvbihUYXJnZXQuQ2xvc2VzdFRhcmdldFgsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5TaG9vdCkpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJUaHVuZGVyZ3VuXCIsIFwiVEdcIik7XHJcblxyXG4gICAgICAgICAgICBBcmVhIGFyZWEgPSBBcmVhVXNlcigpLlJvd0ZvcndhcmQod2lkdGg6IDEsIFhEaXM6IDMpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIkljZWJvbWJcIiwgdGlja3M6IE9uZVRpY2tQZXJBY3Rpb24obmV3IEFuaW1hdGlvbihhcmVhKSwgbmV3IERlYWxEYW1hZ2VBY3Rpb24oYXJlYSwgMSwgQmF0dGxlTWFpbi5FbGVtZW50LkljZSkpLCB0YWdzOiBUYWdBcnJheShNb3ZlRGF0YVRhZ3MuQm9tYikpO1xyXG4gICAgICAgICAgICBOZXdNb3ZlVGV4dFJlbmRlckRhdGEoXCJJY2Vib21iXCIsIFwiSUJcIik7XHJcblxyXG4gICAgICAgICAgICBOZXdNb3ZlRGF0YShcIlRodW5kZXJib21iXCIsIHRpY2tzOiBPbmVUaWNrUGVyQWN0aW9uKG5ldyBBbmltYXRpb24oYXJlYSksIG5ldyBEZWFsRGFtYWdlQWN0aW9uKGFyZWEsIDEsIEJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKSksIHRhZ3M6IFRhZ0FycmF5KE1vdmVEYXRhVGFncy5Cb21iKSk7XHJcbiAgICAgICAgICAgIE5ld01vdmVUZXh0UmVuZGVyRGF0YShcIlRodW5kZXJib21iXCIsIFwiVEJcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIEFyZWFDcmVhdGlvblV0aWxzIEFyZWFVc2VyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFyZWFVdGlscy50YXJnZXQgPSBUYXJnZXQuU2VsZjtcclxuICAgICAgICAgICAgcmV0dXJuIGFyZWFVdGlscztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBBcmVhQ3JlYXRpb25VdGlsc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIFRhcmdldCB0YXJnZXQ7XHJcbiAgICAgICAgICAgIGludCBoZWlnaHQgPSAzO1xyXG5cclxuICAgICAgICAgICAgaW50ZXJuYWwgQXJlYSBSb3dGb3J3YXJkKGludCB3aWR0aCwgaW50IFhEaXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciByYSA9IG5ldyBBcmVhKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBpbnQgb2Zmc2V0WSA9IChpbnQpTWF0aC5GbG9vcigoZmxvYXQpaGVpZ2h0IC8gMmYpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmEucG9pbnRzLkFkZChuZXcgVmVjdG9yMkQoaStYRGlzLCBqLW9mZnNldFkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTmV3TW92ZVRleHRSZW5kZXJEYXRhKHN0cmluZyBuYW1lLCBzdHJpbmcgYWJyZXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3ZlUmVuZGVycy5BZGQobmV3IE1vdmVSZW5kZXJEYXRhKG5hbWUsIGFicmV2KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTmV3TW92ZURhdGEoc3RyaW5nIGxhYmVsLCBUaWNrW10gdGlja3MsIG9iamVjdFtdIHRhZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbXYgPSBuZXcgTW92ZURhdGEobGFiZWwpO1xyXG4gICAgICAgICAgICBtdi51bml0cy5BZGRSYW5nZSh0aWNrcyk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG12LnRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1vdmVEYXRhcy5BZGQobXYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE5ld01vdmVEYXRhKHN0cmluZyBsYWJlbCwgQ29uZGl0aW9uIGNvbmRpdGlvbiwgb2JqZWN0IGFjdGlvbiwgb2JqZWN0W10gdGFncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtdiA9IG5ldyBNb3ZlRGF0YShsYWJlbCk7XHJcbiAgICAgICAgICAgIFRpY2sgdGljayA9IG5ldyBUaWNrKCk7XHJcbiAgICAgICAgICAgIHRpY2suY29uZGl0aW9uID0gY29uZGl0aW9uO1xyXG4gICAgICAgICAgICB0aWNrLnRoaW5nc1RvSGFwcGVuLkFkZChhY3Rpb24pO1xyXG4gICAgICAgICAgICBtdi51bml0cy5BZGQodGljayk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG12LnRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMihpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW92ZURhdGFzLkFkZChtdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFRpY2tbXSBPbmVUaWNrUGVyQWN0aW9uKHBhcmFtcyBvYmplY3RbXSBhY3Rpb25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGlja1tdIHRpY2tzID0gbmV3IFRpY2tbYWN0aW9ucy5MZW5ndGhdO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRpY2tzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aWNrc1tpXSA9IG5ldyBUaWNrKGFjdGlvbnNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aWNrcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb2JqZWN0W10gVGFnQXJyYXkocGFyYW1zIG9iamVjdFtdIGFyZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJncztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1vdmVSZW5kZXJEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBMYWJlbDtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEFicmV2O1xyXG5cclxuICAgICAgICBwdWJsaWMgTW92ZVJlbmRlckRhdGEoc3RyaW5nIGxhYmVsLCBzdHJpbmcgYWJyZXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgICAgIHRoaXMuQWJyZXYgPSBhYnJldjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFN0YWdlRGF0YUNyZWF0b3Ige1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PFN0YWdlRGF0YT4gc3RhZ2VzID0gbmV3IExpc3Q8U3RhZ2VEYXRhPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgU3RhZ2VEYXRhQ3JlYXRvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGQoXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgbmV3IEVuZW15U3Bhd25EYXRhKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMCkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgbmV3IEVuZW15U3Bhd25EYXRhKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEVuZW15U3Bhd25EYXRhKDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgbmV3IEVuZW15U3Bhd25EYXRhKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMCkpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEVuZW15U3Bhd25EYXRhKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMikpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgbmV3IEVuZW15U3Bhd25EYXRhKDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMikpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEVuZW15U3Bhd25EYXRhKDIsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICBuZXcgU3RhZ2VEYXRhKFxyXG4gICAgICAgICAgICAgICAgbmV3IEVuZW15U3Bhd25EYXRhKDAsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMikpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEVuZW15U3Bhd25EYXRhKDIsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoMywgMSkpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEVuZW15U3Bhd25EYXRhKDIsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNSwgMSkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAvLyxcclxuICAgICAgICAgICAgICAgIC8vbmV3IFN0YWdlRGF0YShcclxuICAgICAgICAgICAgICAgIC8vbmV3IEVuZW15U3Bhd25EYXRhKDEsIG5ldyBCYXNlVXRpbHMuVmVjdG9yMkQoNCwgMSkpLFxyXG4gICAgICAgICAgICAgICAgLy9uZXcgRW5lbXlTcGF3bkRhdGEoMSwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg1LCAxKSkpXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZGQocGFyYW1zIFN0YWdlRGF0YVtdIHN0YWdlRGF0YTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGFnZXMuQWRkUmFuZ2Uoc3RhZ2VEYXRhMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBTdGFnZURhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxFbmVteVNwYXduRGF0YT4gZW5lbXlTcGF3bnMgPSBuZXcgTGlzdDxFbmVteVNwYXduRGF0YT4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlRGF0YShwYXJhbXMgRW5lbXlTcGF3bkRhdGFbXSBzcGF3bnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbmVteVNwYXducy5BZGRSYW5nZShzcGF3bnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guRUNTXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQWNjZXNzb3JcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IExlbmd0aCB7IGdldCB7IHJldHVybiBTZWxlY3RlZEVudGl0aWVzLkNvdW50OyB9IH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgVHlwZVtdIFR5cGVzUHJvaGliaXRlZCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIGludGVybmFsIFR5cGVbXSBUeXBlc05lY2Vzc2FyeTtcclxuICAgICAgICBpbnRlcm5hbCBMaXN0PEVudGl0eT4gU2VsZWN0ZWRFbnRpdGllcyA9IG5ldyBMaXN0PEVudGl0eT4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIEFjY2Vzc29yKHBhcmFtcyBUeXBlW10gcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR5cGVzTmVjZXNzYXJ5ID0gcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgRW50aXR5QWRkZWQoRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU2VsZWN0ZWRFbnRpdGllcy5Db250YWlucyhlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnRpdHkgR2V0KGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFNlbGVjdGVkRW50aXRpZXNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBRdWlja0FjY2Vzc29yT25lPFQxPlxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgUXVpY2tBY2Nlc3Nvck9uZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhY2Nlc3NvciA9IG5ldyBBY2Nlc3Nvcih0eXBlb2YoVDEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIEFjY2Vzc29yIGFjY2Vzc29yO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgQ291bnQgeyBnZXQgeyByZXR1cm4gYWNjZXNzb3IuTGVuZ3RoOyB9IH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIFQxIENvbXAxKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXNbaV0uR2V0Q29tcG9uZW50PFQxPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBFbnRpdHkoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllc1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xhc3MgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+IFxyXG4gICAge1xyXG5cclxuICAgICAgICBpbnRlcm5hbCBBY2Nlc3NvciBhY2Nlc3NvcjtcclxuICAgICAgICBwdWJsaWMgaW50IExlbmd0aCB7IGdldCB7IHJldHVybiBhY2Nlc3Nvci5MZW5ndGg7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgVDEgQ29tcDEoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzb3IuU2VsZWN0ZWRFbnRpdGllc1tpXS5HZXRDb21wb25lbnQ8VDE+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IEVudGl0eShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFF1aWNrQWNjZXNzb3JUd28oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWNjZXNzb3IgPSBuZXcgQWNjZXNzb3IodHlwZW9mKFQxKSwgdHlwZW9mKFQyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIFQyIENvbXAyKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXNbaV0uR2V0Q29tcG9uZW50PFQyPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkVDU1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRUNTTWFuYWdlclxyXG4gICAge1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBFQ1NNYW5hZ2VyW10gbWFuYWdlcnMgPSBuZXcgRUNTTWFuYWdlclsyMF07XHJcbiAgICAgICAgRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4gY29tcHMgPSBuZXcgRGljdGlvbmFyeTxUeXBlLCBvYmplY3RbXT4oKTtcclxuICAgICAgICBwcml2YXRlIGludCBFQ1NJZDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBFQ1NNYW5hZ2VyKCkgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQcm9jZXNzb3JBY2Nlc3NvciBDcmVhdGVQcm9jZXNzb3IoQWNjZXNzb3IgYWNjZXNzb3IsIEFjdGlvbjxBY2Nlc3Nvcj4gYWN0aW9uKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvY2Vzc29yQWNjZXNzb3IoYWN0aW9uLCBhY2Nlc3Nvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQWNjZXNzb3IgQ3JlYXRlQWNjZXNzb3IoVHlwZVtdIG5lY2Vzc2FyeSwgVHlwZVtdIG5vdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBhY2MgPSBuZXcgQWNjZXNzb3IobmVjZXNzYXJ5KTtcclxuICAgICAgICAgICAgYWNjLlR5cGVzUHJvaGliaXRlZCA9IG5vdDtcclxuICAgICAgICAgICAgQWRkQWNjZXNzb3IoYWNjKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUXVpY2tBY2Nlc3NvclR3bzxUMSxUMj4gUXVpY2tBY2Nlc3NvcjI8VDEsIFQyPigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4gYWNjZXNzb3IgPSBuZXcgUXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+KCk7XHJcbiAgICAgICAgICAgIEFkZEFjY2Vzc29yKGFjY2Vzc29yLmFjY2Vzc29yKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFF1aWNrQWNjZXNzb3JPbmU8VDE+IFF1aWNrQWNjZXNzb3IxPFQxPigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBRdWlja0FjY2Vzc29yT25lPFQxPiBhY2Nlc3NvciA9IG5ldyBRdWlja0FjY2Vzc29yT25lPFQxPigpO1xyXG4gICAgICAgICAgICBBZGRBY2Nlc3NvcihhY2Nlc3Nvci5hY2Nlc3Nvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3NvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludCBlbnRpdHlJZE1heCA9IC0xO1xyXG4gICAgICAgIExpc3Q8QWNjZXNzb3I+IGFjY2Vzc29ycyA9IG5ldyBMaXN0PEFjY2Vzc29yPigpO1xyXG5cclxuICAgICAgICAjcmVnaW9uIHN0YXRpYyBtZXRob2RzXHJcblxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdGF0aWMgRUNTTWFuYWdlciBHZXRJbnN0YW5jZShFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYW5hZ2Vyc1tlLmVjc107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEVDU01hbmFnZXIgQ3JlYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IG1hbmFnZXJzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFuYWdlcnNbaV0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hbmFnZXJzW2ldID0gbmV3IEVDU01hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYW5hZ2Vyc1tpXS5FQ1NJZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hbmFnZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBDcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG9iamVjdCB2KVxyXG4gICAgICAgIHtcclxuRW50aXR5IGU7XG4gICAgICAgICAgICBDcmVhdGVFbnRpdHkob3V0IGUpO1xyXG4gICAgICAgICAgICBBZGRDb21wb25lbnQoZSwgdik7XHJcbiAgICAgICAgICAgIHJldHVybiBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eSBDcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG9iamVjdCB2LCBvYmplY3QgdjIpXHJcbiAgICAgICAge1xyXG5FbnRpdHkgZTtcbiAgICAgICAgICAgIENyZWF0ZUVudGl0eShvdXQgZSk7XHJcbiAgICAgICAgICAgIEFkZENvbXBvbmVudChlLCB2KTtcclxuICAgICAgICAgICAgQWRkQ29tcG9uZW50KGUsIHYyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW50aXR5IENyZWF0ZUVudGl0eShvdXQgRW50aXR5IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbnRpdHlJZE1heCsrO1xyXG4gICAgICAgICAgICBFbnRpdHkgZW50aXR5ID0gbmV3IEVudGl0eSh0aGlzLkVDU0lkLCBlbnRpdHlJZE1heCk7XHJcbiAgICAgICAgICAgIGUgPSBlbnRpdHk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFByb2Nlc3NvckZsZXg8VDEsVDI+IFF1aWNrUHJvY2Vzc29yRmxleDxUMSwgVDI+KEFjdGlvbjxRdWlja0FjY2Vzc29yVHdvPFQxLCBUMj4+IHApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQcm9jZXNzb3JGbGV4PFQxLCBUMj4gcHJvY2Vzc29yRmxleCA9IG5ldyBQcm9jZXNzb3JGbGV4PFQxLCBUMj4ocCk7XHJcbiAgICAgICAgICAgIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBhY2Nlc3NvciA9IHByb2Nlc3NvckZsZXguYWNjZXNzb3I7XHJcbiAgICAgICAgICAgIEFjY2Vzc29yIGFjY2Vzc29yMSA9IGFjY2Vzc29yLmFjY2Vzc29yO1xyXG4gICAgICAgICAgICBBZGRBY2Nlc3NvcihhY2Nlc3NvcjEpO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzc29yRmxleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZGRBY2Nlc3NvcihBY2Nlc3NvciBhY2Nlc3NvcjEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhY2Nlc3NvcnMuQWRkKGFjY2Vzc29yMSk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDw9IGVudGl0eUlkTWF4OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVwZGF0ZUFjY2Vzc29yRW50aXR5KGFjY2Vzc29yMSwgaSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlQWNjZXNzb3JFbnRpdHkoQWNjZXNzb3IgYWNjZXNzb3IsIGludCBlbnRpdHlJZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVudGl0eSBlbnRpdHkgPSBuZXcgRW50aXR5KEVDU0lkLCBlbnRpdHlJZCk7XHJcbiAgICAgICAgICAgIGJvb2wgYmVsb25nID0gSGFzQWxsQ29tcHMoYWNjZXNzb3IuVHlwZXNOZWNlc3NhcnksIGVudGl0eUlkKSAmJiBIYXNOb25lT2ZUaGVzZUNvbXBzKGFjY2Vzc29yLlR5cGVzUHJvaGliaXRlZCwgZW50aXR5SWQpO1xyXG4gICAgICAgICAgICBib29sIG1lbWJlciA9IGFjY2Vzc29yLkVudGl0eUFkZGVkKGVudGl0eSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYmVsb25nICE9IG1lbWJlcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJlbG9uZylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2Nlc3Nvci5TZWxlY3RlZEVudGl0aWVzLkFkZChlbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yLlNlbGVjdGVkRW50aXRpZXMuUmVtb3ZlKGVudGl0eSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvL2lmIChpdGVtLkVudGl0eUFkZGVkKGUpKVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgY29udGludWU7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvL2Vsc2VcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIGlmIChIYXNBbGxDb21wb25lbnRzKGUsIGl0ZW0uVHlwZXNOZWNlc3NhcnkpKVxyXG4gICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpdGVtLlNlbGVjdGVkRW50aXRpZXMuQWRkKGUpO1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBpbnRlcm5hbCBUIEFkZENvbXBvbmVudDxUPihFbnRpdHkgZSkgd2hlcmUgVCA6IG5ldygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUIHQgPSBuZXcgVCgpO1xyXG4gICAgICAgICAgICBBZGRDb21wb25lbnQoZSwgdCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZENvbXBvbmVudChFbnRpdHkgZSwgb2JqZWN0IHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUeXBlIHR5cGUgPSB0LkdldFR5cGUoKTtcclxuICAgICAgICAgICAgaWYgKCFjb21wcy5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29tcHMuQWRkKHR5cGUsIG5ldyBvYmplY3RbMzAwXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29tcHNbdHlwZV1bZS5pZF0gPSB0O1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBhY2Nlc3NvcnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVwZGF0ZUFjY2Vzc29yRW50aXR5KGl0ZW0sIGUuaWQpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBIYXNBbGxDb21wb25lbnRzKEVudGl0eSBlLCBUeXBlW10gdHlwZXNOZWNlc3NhcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgaWQgPSBlLmlkO1xyXG4gICAgICAgICAgICByZXR1cm4gSGFzQWxsQ29tcHModHlwZXNOZWNlc3NhcnksIGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBIYXNBbGxDb21wcyhUeXBlW10gdHlwZXNOZWNlc3NhcnksIGludCBpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0eXBlIGluIHR5cGVzTmVjZXNzYXJ5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcHNbdHlwZV1baWRdID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIEhhc05vbmVPZlRoZXNlQ29tcHMoVHlwZVtdIHR5cGVzUHJvaGliaXRlZCwgaW50IGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVzUHJvaGliaXRlZCA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHR5cGUgaW4gdHlwZXNQcm9oaWJpdGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcHMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBzW3R5cGVdW2lkXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBUIEdldENvbXBvbmVudDxUPihFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR5cGUgdHlwZSA9IHR5cGVvZihUKTtcclxuICAgICAgICAgICAgaWYgKCFjb21wcy5Db250YWluc0tleSh0eXBlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9jb21wcy5BZGQodHlwZSwgbmV3IG9iamVjdFszMDBdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0KFQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAoVCkgY29tcHNbdHlwZV1bZS5pZF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5FQ1Ncclxue1xyXG4gICAgcHVibGljIHN0cnVjdCBFbnRpdHkgOiBJRXF1YXRhYmxlPEVudGl0eT5cclxuICAgIHtcclxuICAgICAgICByZWFkb25seSBpbnRlcm5hbCBpbnQgZWNzO1xyXG4gICAgICAgIHJlYWRvbmx5IGludGVybmFsIGludCBpZDtcclxuXHJcbiAgICAgICAgcHVibGljIEVudGl0eShpbnQgZWNzLCBpbnQgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGVjcztcclxuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKEVudGl0eSBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBvdGhlci5pZCA9PSB0aGlzLmlkICYmIG90aGVyLmVjcyA9PSB0aGlzLmVjcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBFeHRlbnNpb25NZXRob2RzXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUIEFkZENvbXBvbmVudDxUPih0aGlzIEVudGl0eSBlKSB3aGVyZSBUOiBuZXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEVDU01hbmFnZXIuR2V0SW5zdGFuY2UoZSkuQWRkQ29tcG9uZW50PFQ+KGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQWRkQ29tcG9uZW50KHRoaXMgRW50aXR5IGUsIG9iamVjdCBjb21wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRUNTTWFuYWdlci5HZXRJbnN0YW5jZShlKS5BZGRDb21wb25lbnQoZSwgY29tcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBHZXRDb21wb25lbnQ8VD4odGhpcyBFbnRpdHkgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBFQ1NNYW5hZ2VyLkdldEluc3RhbmNlKGUpLkdldENvbXBvbmVudDxUPihlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkVDU1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJvY2Vzc29yRmxleDxUMSwgVDI+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBBY3Rpb248UXVpY2tBY2Nlc3NvclR3bzxUMSwgVDI+PiBwO1xyXG4gICAgICAgIGludGVybmFsIFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPiBhY2Nlc3NvcjtcclxuXHJcbiAgICAgICAgcHVibGljIFByb2Nlc3NvckZsZXgoQWN0aW9uPFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPj4gcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucCA9IHA7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yID0gbmV3IFF1aWNrQWNjZXNzb3JUd288VDEsIFQyPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUnVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHAoYWNjZXNzb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUHJvY2Vzc29yQWNjZXNzb3JcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEFjdGlvbjxBY2Nlc3Nvcj4gcDtcclxuXHJcbiAgICAgICAgQWNjZXNzb3IgYTtcclxuXHJcbiAgICAgICAgcHVibGljIFByb2Nlc3NvckFjY2Vzc29yKEFjdGlvbjxBY2Nlc3Nvcj4gcCwgQWNjZXNzb3IgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucCA9IHA7XHJcbiAgICAgICAgICAgIHRoaXMuYSA9IGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSdW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcChhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRXb3JsZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBQYWxldHRlIHBhbGV0dGUgPSBEZWZhdWx0UGFsZXR0ZXMuQzRLaXJvS2F6ZTtcclxuICAgICAgICBMaXN0PFRleHRFbnRpdHk+IGFjdGl2ZUFnZW50cyA9IG5ldyBMaXN0PFRleHRFbnRpdHk+KCk7XHJcbiAgICAgICAgTGlzdDxUZXh0RW50aXR5PiBmcmVlQm9hcmRzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICBMaXN0PFRleHRBbmltYXRpb24+IGFuaW1hdGlvbnMgPSBuZXcgTGlzdDxUZXh0QW5pbWF0aW9uPigpO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgbWFpbkJvYXJkO1xyXG4gICAgICAgIGludCBsYXRlc3RJZCA9IC0xO1xyXG5cclxuICAgICAgICBwdWJsaWMgVCBBZGRBbmltYXRpb248VD4oVCB0YSkgd2hlcmUgVCA6IFRleHRBbmltYXRpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbnMuQWRkKHRhKTtcclxuICAgICAgICAgICAgdGEuUmVnaXN0ZXJMaXN0cygpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1haW5Cb2FyZCA9IG5ldyBUZXh0Qm9hcmQod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtYWluQm9hcmQuUmVzZXQoKTtcclxuICAgICAgICAgICAgRHJhd0NoaWxkcmVuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3Q2hpbGRyZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBhY3RpdmVBZ2VudHMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlQWdlbnRzW2ldLlJlc2V0QW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW0uTW9kaWZ5KGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlQWdlbnRzW2ldLmZyZWVJZklkbGUgJiYgIWFjdGl2ZUFnZW50c1tpXS5hbmltYXRpbmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJlZUJvYXJkcy5BZGQoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVBZ2VudHMuUmVtb3ZlKGFjdGl2ZUFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5Cb2FyZC5JbnNlcnQoYWN0aXZlQWdlbnRzW2ldLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEVudGl0eSBHZXRGcmVlRW50aXR5KGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRFbnRpdHkgdGU7XHJcbiAgICAgICAgICAgIGlmIChmcmVlQm9hcmRzLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGUgPSBmcmVlQm9hcmRzW2ZyZWVCb2FyZHMuQ291bnQgLSAxXTtcclxuICAgICAgICAgICAgICAgIGZyZWVCb2FyZHMuUmVtb3ZlQXQoZnJlZUJvYXJkcy5Db3VudCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGUgPSBuZXcgVGV4dEVudGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgdGUuaWQgPSArK2xhdGVzdElkO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWN0aXZlQWdlbnRzLkFkZCh0ZSk7XHJcbiAgICAgICAgICAgIHRlLmZyZWVJZklkbGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGUuU2V0U2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgdGUuUmVzZXRGdWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IEdldFRlbXBFbnRpdHkoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRlID0gR2V0RnJlZUVudGl0eSh3LCBoKTtcclxuICAgICAgICAgICAgdGUuZnJlZUlmSWRsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkdmFuY2VUaW1lKGZsb2F0IHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYW5pbSBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbmltLlVwZGF0ZSh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghYW5pbS5Jc0RvbmUoKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dEVudGl0eVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgaWQ7XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBPcmlnaW47XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBBbmltYXRpb247XHJcbiAgICAgICAgcHVibGljIGJvb2wgZnJlZUlmSWRsZSA9IGZhbHNlO1xyXG4gICAgICAgIGludGVybmFsIGJvb2wgYW5pbWF0aW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodCB7IGdldCB7IHJldHVybiBPcmlnaW4uSGVpZ2h0OyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRBbmltYXRpb24uQmFzZURhdGEgQW5pbUJhc2UoZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUZXh0QW5pbWF0aW9uLkJhc2VEYXRhKGxlbmd0aCwgMCwgaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldEFuaW1hdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgQW5pbWF0aW9uLlNldChPcmlnaW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldEZ1bGwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3JpZ2luLlJlc2V0SW52aXNpYmxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldFBvc2l0aW9uKGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9yaWdpbi5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IyRCh4LHkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRQb3NpdGlvbihWZWN0b3IyRCB2ZWN0b3IyRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9yaWdpbi5Qb3NpdGlvbiA9IHZlY3RvcjJEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRTaXplKGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChPcmlnaW4gPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgT3JpZ2luID0gbmV3IFRleHRCb2FyZCh3LCBoKTtcclxuICAgICAgICAgICAgICAgIEFuaW1hdGlvbiA9IG5ldyBUZXh0Qm9hcmQodywgaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT3JpZ2luLlJlc2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgQW5pbWF0aW9uLlJlc2l6ZSh3LCBoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUG9zaXRpb25BbmltYXRpb24gOiBUZXh0QW5pbWF0aW9uPFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YT5cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBQb3NpdGlvbkRhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkIHRhcmdldCA9IGVudGl0eS5BbmltYXRpb247XHJcbiAgICAgICAgICAgIGlmIChtYWluRGF0YS5wZXJtYW5lbnQpXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBlbnRpdHkuT3JpZ2luO1xyXG4gICAgICAgICAgICB0YXJnZXQuUG9zaXRpb24gPSBWZWN0b3IyRC5JbnRlcnBvbGF0ZVJvdW5kZWQobWFpbkRhdGEuc3RhcnRQb3NpdGlvbiwgbWFpbkRhdGEuZW5kUG9zaXRpb24sIHByb2dyZXNzIC8gbGVuZ3RoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IFBvc2l0aW9uRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvb2wgcGVybWFuZW50O1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb247XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgUG9zaXRpb25EYXRhKFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIFZlY3RvcjJEIGVuZFBvc2l0aW9uLCBib29sIHBlcm0gPSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVybWFuZW50ID0gcGVybTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVGV4dEFuaW1hdGlvbjxUPiA6IFRleHRBbmltYXRpb25cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgTGlzdDxUPiBtYWluRGF0YSA9IG5ldyBMaXN0PFQ+KCk7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5SZWdpc3Rlckxpc3QobWFpbkRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKEJhc2VEYXRhIGJhc2VEYXRhLCBUIG1haW5EKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5BZGQoYmFzZURhdGEpO1xyXG4gICAgICAgICAgICBtYWluRGF0YS5BZGQobWFpbkQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBpbnQgaW5kZXgsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBNb2RpZnkoZW50aXR5LCBtYWluRGF0YVtpbmRleF0sIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIFQgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbnRlcm5hbCBvdmVycmlkZSB2b2lkIEV4ZWN1dGUoaW50IGluZGV4LCBCYXNlRGF0YSBiYXNlRGF0YSlcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICB0aGlzLkV4ZWN1dGUobWFpbkRhdGFbaW5kZXhdLCBiYXNlRGF0YSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vcHVibGljIGFic3RyYWN0IHZvaWQgRXhlY3V0ZShUIG1haW5EYXRhLCBCYXNlRGF0YSBiYXNlRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFRleHRBbmltYXRpb25cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBCYXNlRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGxlbmd0aDtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IHByb2dyZXNzO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHRhcmdldDtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBCYXNlRGF0YShmbG9hdCBsZW5ndGgsIGZsb2F0IHByb2dyZXNzLCBpbnQgdGFyZ2V0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzcztcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IGxlbmd0aCA9IG5ldyBMaXN0PGZsb2F0PigpO1xyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IHByb2dyZXNzID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxpbnQ+IHRhcmdldHMgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgTGlzdDxJTGlzdD4gbGlzdHMgPSBuZXcgTGlzdDxJTGlzdD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJMaXN0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQobGVuZ3RoKTtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKHByb2dyZXNzKTtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKHRhcmdldHMpO1xyXG4gICAgICAgICAgICBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IHZvaWQgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcm9ncmVzcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1tpXSArPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc1tpXSA+PSBsZW5ndGhbaV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5kVGFzayhpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0V4ZWN1dGUoaSwgbmV3IEJhc2VEYXRhKGxlbmd0aFtpXSxwcm9ncmVzc1tpXSwgdGFyZ2V0c1tpXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2ludGVybmFsIGFic3RyYWN0IHZvaWQgRXhlY3V0ZShpbnQgaW5kZXgsIEJhc2VEYXRhIGJhc2VEYXRhKTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGQoQmFzZURhdGEgYmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm9ncmVzcy5BZGQoYmQucHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICB0YXJnZXRzLkFkZChiZC50YXJnZXQpO1xyXG4gICAgICAgICAgICBsZW5ndGguQWRkKGJkLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0RvbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbGlzdHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLkNvdW50ICE9IHByb2dyZXNzLkNvdW50KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBzLlRyaW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZ3Jlc3MuQ291bnQgPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRW5kVGFzayhpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBsIGluIGxpc3RzKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbC5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZWdpc3Rlckxpc3QoSUxpc3QgbWFpbkRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQobWFpbkRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcm9ncmVzcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYS5pZCA9PSB0YXJnZXRzW2ldKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE1vZGlmeShhLCBpLCBwcm9ncmVzc1tpXSwgbGVuZ3RoW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBhLmFuaW1hdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBpbnQgaW5kZXgsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUGFsZXR0ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmdbXSBIdG1sQ29sb3JzO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIFBhbGV0dGUocGFyYW1zIHN0cmluZ1tdIGNvbG9ycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEh0bWxDb2xvcnMgPSBjb2xvcnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBEZWZhdWx0UGFsZXR0ZXNcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBhbGV0dGUgQzRLaXJvS2F6ZSA9IG5ldyBQYWxldHRlKFwiIzMzMmM1MFwiLCBcIiM0Njg3OGZcIiwgXCIjOTRlMzQ0XCIsIFwiI2UyZjNlNFwiKTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBhbGV0dGUgQzRSZWFkZXIgPSBuZXcgUGFsZXR0ZShcIiMyNjI2MjZcIiwgXCIjOGI4Y2JhXCIsIFwiIzhiYmE5MVwiLCBcIiM2NDlmOGRcIik7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQYWxldHRlIEM0Tm92ZWwgPSBuZXcgUGFsZXR0ZShcIiMyNjI2MjZcIiwgXCIjMzQyZDQxXCIsIFwiI2I4YjhiOFwiLCBcIiM4YjhjYmFcIik7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBDNEJsYWNrID0gMDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0QmxhY2tOZXV0cmFsID0gMTtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0V2hpdGVOZXV0cmFsID0gMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEM0V2hpdGUgPSAzO1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRCb2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIE5PQ0hBTkdFQ0hBUiA9IChjaGFyKTE7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgSU5WSVNJQkxFQ0hBUiA9IChjaGFyKTI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBOT0NIQU5HRUNPTE9SID0gLTI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBJTlZJU0lCTEVDT0xPUiA9IC0xO1xyXG4gICAgICAgIGNoYXJbLF0gY2hhcnM7XHJcbiAgICAgICAgcHVibGljIGludFssXSBUZXh0Q29sb3IgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludFssXSBCYWNrQ29sb3IgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgLy9TdHJpbmdCdWlsZGVyIHN0cmluZ0J1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgIGludCBjdXJzb3JYID0gMDtcclxuICAgICAgICBpbnQgY3Vyc29yWSA9IDA7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEIFBvc2l0aW9uIHsgZ2V0OyBzZXQ7IH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9TZXRNYXhTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBSZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25DZW50ZXIoc3RyaW5nIG1lc3NhZ2UsIGludCBjb2xvciwgaW50IHhPZmYgPSAwLCBpbnQgeU9mZiA9IDAsIGJvb2wgYWxpZ25TdHJpbmcgPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHggPSAoV2lkdGgpIC8gMjtcclxuICAgICAgICAgICAgaWYgKGFsaWduU3RyaW5nKSB4IC09IG1lc3NhZ2UuTGVuZ3RoIC8gMjtcclxuICAgICAgICAgICAgaW50IHkgPSBIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBEcmF3KG1lc3NhZ2UsIHggKyB4T2ZmLCB5ICsgeU9mZiwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBTZXRNYXhTaXplKGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoYXJzID0gbmV3IGNoYXJbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgICAgIFRleHRDb2xvciA9IG5ldyBpbnRbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgICAgIEJhY2tDb2xvciA9IG5ldyBpbnRbd2lkdGgsIGhlaWdodF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoJyAnLCAwLCAwLCBXaWR0aCwgSGVpZ2h0LCAwLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0SW52aXNpYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZChJTlZJU0lCTEVDSEFSLCAwLCAwLCBXaWR0aCwgSGVpZ2h0LCBJTlZJU0lCTEVDT0xPUiwgSU5WSVNJQkxFQ09MT1IpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgV2lkdGggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluc2VydChUZXh0Qm9hcmQgc2Vjb25kQm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHNlY29uZEJvYXJkLldpZHRoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgc2Vjb25kQm9hcmQuSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHggPSAoaW50KXNlY29uZEJvYXJkLlBvc2l0aW9uLlggKyBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB5ID0gKGludClzZWNvbmRCb2FyZC5Qb3NpdGlvbi5ZICsgajtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuY2hhcnNbaSwgal0gIT0gSU5WSVNJQkxFQ0hBUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNbeCwgeV0gPSBzZWNvbmRCb2FyZC5jaGFyc1tpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuVGV4dENvbG9yW2ksIGpdICE9IElOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Q29sb3JbeCwgeV0gPSBzZWNvbmRCb2FyZC5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZEJvYXJkLkJhY2tDb2xvcltpLCBqXSAhPSBJTlZJU0lCTEVDT0xPUilcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmFja0NvbG9yW3gsIHldID0gc2Vjb25kQm9hcmQuQmFja0NvbG9yW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IEN1cnNvclhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBjdXJzb3JYOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JYID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGludCBDdXJzb3JZIHsgZ2V0IHsgcmV0dXJuIGN1cnNvclk7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd09uZURpZ2l0KGludCBpLCBpbnQgeCwgaW50IHksIGludCBjb2xvciA9IE5PQ0hBTkdFQ09MT1IsIGludCBiYWNrZ3JvdW5kID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoYXIgYyA9IChjaGFyKShpICsgJzAnKTtcclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgeCwgeSwgY29sb3IsIGJhY2tncm91bmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBEcmF3X0N1cnNvcl9Vbmljb2RlTGFiZWwoaW50IHYsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBsZW4gPSBEcmF3VW5pY29kZUxhYmVsKHYsIGN1cnNvclgsIGN1cnNvclksIGNvbG9yKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBsZW47IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQWR2YW5jZUN1cnNvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgaW50IERyYXdVbmljb2RlTGFiZWwoaW50IHVuaWNvZGUsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHVuaWNvZGUgPj0gJ2EnICYmIHVuaWNvZGUgPD0gJ3onKSB7XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhcigoY2hhcil1bmljb2RlLCB4LCB5LCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdHJpbmcgbGFiZWwgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAodW5pY29kZSA9PSAzMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWwgPSBcInNwYWNlXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgRHJhdyhsYWJlbCwgeCwgeSwgY29sb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbGFiZWwuTGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXQoVGV4dEJvYXJkIG9yaWdpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUG9zaXRpb24gPSBvcmlnaW4uUG9zaXRpb247XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBIZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJzW2ksIGpdID0gb3JpZ2luLmNoYXJzW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQmFja0NvbG9yW2ksIGpdID0gb3JpZ2luLkJhY2tDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRleHRDb2xvcltpLCBqXSA9IG9yaWdpbi5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzaXplKGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjaGFycyA9PSBudWxsIHx8IHcgPiBjaGFycy5HZXRMZW5ndGgoMCkgfHwgaCA+IGNoYXJzLkdldExlbmd0aCgxKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2V0TWF4U2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBXaWR0aCA9IHc7XHJcbiAgICAgICAgICAgIEhlaWdodCA9IGg7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNoYXIgQ2hhckF0KGludCBpLCBpbnQgailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGFyc1tpLCBqXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEN1cnNvckF0KGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclggPSB4O1xyXG4gICAgICAgICAgICBjdXJzb3JZID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gdilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IoYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKHN0cmluZyB2LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYyBpbiB2KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3X0N1cnNvcihjLCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgQ2FuRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgY3VycmVudFggPSBjdXJzb3JYO1xyXG4gICAgICAgICAgICBpbnQgY3VycmVudFkgPSBjdXJzb3JZO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB2Lkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBib29sIGxpbmVCcmVhayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBzaG91bGRDaGVja0ZvckxpbmVCcmVha3MgPSAoaSA9PSAwIHx8IHZbaV0gPT0gJyAnKSAmJiBpICE9IHYuTGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChzaG91bGRDaGVja0ZvckxpbmVCcmVha3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDE7IGogPCB2Lkxlbmd0aCAtIGk7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqICsgY3VycmVudFggPj0gV2lkdGgpIC8vcmVhY2ggZW5kIG9mIHRoZSBsaW5lIHdpdGhvdXQgZW5kaW5nIHRoZSB3b3JkLCBzaG91bGQgbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpXSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrOyAvL3NraXAgdGhyb3VnaCB0aGUgc3BhY2UgaWYgaXQncyBhIG5ldyBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWsgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaSArIGpdID09ICcgJykgLy9uZXcgd29yZCBiZWdpbnMgc28gbm8gbmVlZCB0byBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVCcmVhaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRYID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGN1cnJlbnRYKys7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFggPj0gV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFkrKztcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFggPj0gV2lkdGggfHwgY3VycmVudFkgPj0gSGVpZ2h0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERyYXdDdXJzb3JSZXN1bHQgRHJhd19DdXJzb3JfU21hcnRMaW5lQnJlYWsoc3RyaW5nIHYsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBvZmZTdGFydCA9IDA7XHJcbiAgICAgICAgICAgIGludCBvZmZFbmQgPSB2Lkxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIHJldHVybiBEcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayh2LCBjb2xvciwgb2ZmU3RhcnQsIG9mZkVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRHJhd0N1cnNvclJlc3VsdCBEcmF3X0N1cnNvcl9TbWFydExpbmVCcmVhayhzdHJpbmcgdiwgaW50IGNvbG9yLCBpbnQgb2ZmU3RhcnQsIGludCBvZmZFbmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgZW5kSW5kZXggPSBvZmZFbmQgKyAxO1xyXG4gICAgICAgICAgICBWZWN0b3IyRCBzdGFydCA9IG5ldyBWZWN0b3IyRChDdXJzb3JYLCBDdXJzb3JZKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IG9mZlN0YXJ0OyBpIDwgZW5kSW5kZXg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IG9yaWdpblggPSBjdXJzb3JYO1xyXG4gICAgICAgICAgICAgICAgYm9vbCBsaW5lQnJlYWsgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJvb2wgc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzID0gKGkgPT0gMCB8fCB2W2ldID09ICcgJykgJiYgaSAhPSBlbmRJbmRleCAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQ2hlY2tGb3JMaW5lQnJlYWtzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAxOyBqIDwgZW5kSW5kZXggLSBpOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiArIG9yaWdpblggPj0gV2lkdGgpIC8vcmVhY2ggZW5kIG9mIHRoZSBsaW5lIHdpdGhvdXQgZW5kaW5nIHRoZSB3b3JkLCBzaG91bGQgbGluZSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodltpXSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrOyAvL3NraXAgdGhyb3VnaCB0aGUgc3BhY2UgaWYgaXQncyBhIG5ldyBsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lQnJlYWsgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbaSArIGpdID09ICcgJykgLy9uZXcgd29yZCBiZWdpbnMgc28gbm8gbmVlZCB0byBsaW5lIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVCcmVhaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDdXJzb3JOZXdMaW5lKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IodltpXSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFZlY3RvcjJEIGVuZCA9IG5ldyBWZWN0b3IyRChDdXJzb3JYLCBDdXJzb3JZKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEcmF3Q3Vyc29yUmVzdWx0KFBvc2l0aW9uVG9JbmRleChzdGFydCksIFBvc2l0aW9uVG9JbmRleChlbmQpLCBzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW50IFBvc2l0aW9uVG9JbmRleChWZWN0b3IyRCBzdGFydClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KShzdGFydC5YICsgc3RhcnQuWSAqIFdpZHRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdPbmVEaWdpdF9DdXJzb3IoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3X0N1cnNvcigoY2hhcikoaSArICcwJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd19DdXJzb3IoY2hhciBjKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIERyYXdDaGFyKGMsIGN1cnNvclgsIGN1cnNvclkpO1xyXG4gICAgICAgICAgICBBZHZhbmNlQ3Vyc29yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihjaGFyIGMsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcihjLCBjdXJzb3JYLCBjdXJzb3JZLCBjb2xvcik7XHJcbiAgICAgICAgICAgIEFkdmFuY2VDdXJzb3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkdmFuY2VDdXJzb3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3Vyc29yWCsrO1xyXG4gICAgICAgICAgICBpZiAoY3Vyc29yWCA+PSBXaWR0aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWCA9IDA7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JZKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEN1cnNvck5ld0xpbmUoaW50IHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdXJzb3JZKys7XHJcbiAgICAgICAgICAgIGN1cnNvclggPSB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0NoYXIoY2hhciB2LCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHYgIT0gTk9DSEFOR0VDSEFSKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyc1t4LCB5XSA9IHY7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdDaGFyKGNoYXIgdiwgaW50IHgsIGludCB5LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIERyYXdDaGFyKHYsIHgsIHkpO1xyXG4gICAgICAgICAgICBTZXRDb2xvcihjb2xvciwgeCwgeSk7XHJcbiAgICAgICAgICAgIFNldEJhY2tDb2xvcihiYWNrQ29sb3IsIHgsIHkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRBbGwoY2hhciB0ZXh0LCBpbnQgdGV4dENvbG9yLCBpbnQgYmFja0NvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKHRleHQsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIHRleHRDb2xvciwgYmFja0NvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdXaXRoR3JpZChzdHJpbmcgdGV4dCwgaW50IHgsIGludCB5LCBpbnQgZ3JpZENvbG9yLCBpbnQgdGV4dENvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHdpZHRoID0gdGV4dC5MZW5ndGg7XHJcbiAgICAgICAgICAgIERyYXdHcmlkKHgsIHksIHdpZHRoICsgMiwgMywgZ3JpZENvbG9yKTtcclxuICAgICAgICAgICAgRHJhdyh0ZXh0LCB4ICsgMSwgeSArIDEsIHRleHRDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KHN0cmluZyB2LCBpbnQgeCwgaW50IHksIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHYuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCB4MiA9IHggKyBpO1xyXG4gICAgICAgICAgICAgICAgaW50IHkyID0geTtcclxuICAgICAgICAgICAgICAgIGlmKHgyID49IFdpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHgyIC09IFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHkyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhcih2W2ldLCB4MiwgeTIsIGNvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KElFbnVtZXJhYmxlPGNoYXI+IHYsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Db3VudDxjaGFyPih2KTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhcihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkVsZW1lbnRBdDxjaGFyPih2LGkpLCB4ICsgaSwgeSwgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdHcmlkKGludCB4LCBpbnQgeSwgaW50IHdpZHRoLCBpbnQgaGVpZ2h0LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKCd8JywgeCwgeSwgMSwgaGVpZ2h0LCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgnfCcsIHggKyB3aWR0aCAtIDEsIHksIDEsIGhlaWdodCwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoJy0nLCB4LCB5LCB3aWR0aCwgMSwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoJy0nLCB4LCB5ICsgaGVpZ2h0IC0gMSwgd2lkdGgsIDEsIGNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdSZXBlYXRlZChjaGFyIGMsIGludCB4LCBpbnQgeSwgaW50IHdpZHRoLCBpbnQgaGVpZ2h0LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IHg7IGkgPCB4ICsgd2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IHk7IGogPCB5ICsgaGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRHJhd0NoYXIoYywgaSwgaiwgY29sb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBTZXRCYWNrQ29sb3IoYmFja0NvbG9yLCBpLCBqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0Q29sb3IoaW50IGNvbG9yLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29sb3IgIT0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICAgICAgICAgIFRleHRDb2xvclt4LCB5XSA9IGNvbG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0QmFja0NvbG9yKGludCBjb2xvciwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbG9yICE9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEJhY2tDb2xvclt4LCB5XSA9IGNvbG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KHN0cmluZyB2LCBpbnQgeDIsIGludCB5Miwgb2JqZWN0IGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3R3JpZChpbnQgdjEsIGludCB2MiwgaW50IHYzLCBpbnQgdjQsIG9iamVjdCBib2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBEcmF3Q3Vyc29yUmVzdWx0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFN0YXJ0SW5kZXg7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgRW5kSW5kZXg7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyRCBTdGFydFBvc2l0aW9uO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMkQgRW5kUG9zaXRpb247XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgRHJhd0N1cnNvclJlc3VsdChpbnQgc3RhcnRJbmRleCwgaW50IGVuZEluZGV4LCBWZWN0b3IyRCBzdGFydFBvc2l0aW9uLCBWZWN0b3IyRCBlbmRQb3NpdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU3RhcnRJbmRleCA9IHN0YXJ0SW5kZXg7XHJcbiAgICAgICAgICAgICAgICBFbmRJbmRleCA9IGVuZEluZGV4O1xyXG4gICAgICAgICAgICAgICAgU3RhcnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBFbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dFNjcmVlbk4gOiBJVGV4dFNjcmVlbiwgSU1vdXNlSW5wdXQsIElLZXlib2FyZElucHV0XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFRleHRXb3JsZCBUZXh0V29ybGQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgVXBkYXRlKGZsb2F0IGYpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dFNjcmVlbk4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0U2NyZWVuTihUZXh0V29ybGQgdGV4dFdvcmxkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dFdvcmxkID0gdGV4dFdvcmxkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljICB2b2lkIEluaXQoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICBUZXh0V29ybGQuSW5pdCh3LCBoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBNb3VzZUV2ZW50KE1vdXNlRXZlbnRzIG1vdXNlRG93biwgaW50IHYxLCBpbnQgdjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXRVbmljb2RlIHsgc2V0OyBnZXQ7IH1cclxuICAgICAgICBpbnQgSW5wdXRBc051bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBJbnB1dFVuaWNvZGUgLSA0ODtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW50ZXJmYWNlIElUZXh0U2NyZWVuXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgVGV4dEJvYXJkIEdldEJvYXJkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdm9pZCBVcGRhdGUoZmxvYXQgZik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludGVyZmFjZSBJTW91c2VJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIHZvaWQgTW91c2VFdmVudChNb3VzZUV2ZW50cyBldmVudFR5cGUsIGludCB2MSwgaW50IHYyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW50ZXJmYWNlIElLZXlib2FyZElucHV0XHJcbiAgICB7XHJcbiAgICAgICAgaW50IElucHV0VW5pY29kZSB7IHNldDsgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIE1vdXNlRXZlbnRzXHJcbiAgICB7IFxyXG4gICAgICAgIE1vdXNlRG93bixcclxuICAgICAgICBOb25lXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRleHRTY3JlZW5Ib2xkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgSVRleHRTY3JlZW4gU2NyZWVuIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgSU1vdXNlSW5wdXQgTW91c2UgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBJS2V5Ym9hcmRJbnB1dCBLZXkgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldEFsbChvYmplY3QgZG5zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2NyZWVuID0gZG5zIGFzIElUZXh0U2NyZWVuO1xyXG4gICAgICAgICAgICBNb3VzZSA9IGRucyBhcyBJTW91c2VJbnB1dDtcclxuICAgICAgICAgICAgS2V5ID0gZG5zIGFzIElLZXlib2FyZElucHV0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQmFzZVV0aWxzO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5FQ1M7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhhcHBIYW5kbGluZ1xyXG4gICAge1xyXG4gICAgICAgIEJhdHRsZVJlbmRlciBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgRUNTTWFuYWdlciBlY3M7XHJcbiAgICAgICAgcHVibGljIEFjdGlvbiBIYW5kbGU7XHJcbiAgICAgICAgTGlzdDxIYXBwSGFuZGxlcj4gaGFuZGxlcnMgPSBuZXcgTGlzdDxIYXBwSGFuZGxlcj4oKTtcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBIYXBwSGFuZGxpbmcoQmF0dGxlUmVuZGVyIGJhdHRsZVJlbmRlciwgQmF0dGxlU2V0dXAgYmF0dGxlU2V0dXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJhdHRsZVJlbmRlciA9IGJhdHRsZVJlbmRlcjtcclxuICAgICAgICAgICAgdmFyIHdvcmxkID0gYmF0dGxlUmVuZGVyLnRleHRXb3JsZDtcclxuICAgICAgICAgICAgdmFyIHBvc0FuaW0gPSB3b3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5Qb3NpdGlvbkFuaW1hdGlvbj4obmV3IFBvc2l0aW9uQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICB2YXIgYmxpbmtBbmltID0gd29ybGQuQWRkQW5pbWF0aW9uPGdsb2JhbDo6UGlkcm9oLlRleHRSZW5kZXJpbmcuQmxpbmtBbmltPihuZXcgQmxpbmtBbmltKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmVjcyA9IGJhdHRsZVNldHVwLmVjcztcclxuICAgICAgICAgICAgdmFyIGJhdHRsZU1haW4gPSBiYXR0bGVTZXR1cC5iYXR0bGVNYWluO1xyXG4gICAgICAgICAgICB2YXIgdGltZSA9IGJhdHRsZVNldHVwLnRpbWVTdGFtcDtcclxuICAgICAgICAgICAgYmF0dGxlUmVuZGVyLkhhcHBIYW5kbGluZyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBoYXBwcyA9IGVjcy5RdWlja0FjY2Vzc29yMjxIYXBwVGFncywgVGltZVN0YW1wU25hcD4oKTtcclxuICAgICAgICAgICAgZmxvYXQgaGlnaGVzdEhhbmRsZWQgPSAtMTtcclxuICAgICAgICAgICAgQWN0aW9uPEVudGl0eT4gbW92ZU1pc3MgPSAoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBTkRMRSEzXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZCA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlRGF0YT4oKTtcclxuICAgICAgICAgICAgICAgIHZhciBobWYgPSBlLkdldENvbXBvbmVudDxIYXBwTW92ZW1lbnRGYWlsPigpO1xyXG4gICAgICAgICAgICAgICAgaW50IGVJZCA9IGhtZC51c2VyO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vdmVyID0gYmF0dGxlTWFpbi5lbnRpdGllc1tlSWRdO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gbW92ZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zMiA9IGhtZi5tb3ZlVG87XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zRiA9IChwb3MgKyBwb3MyKSAvIDI7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGZlID0gYmF0dGxlUmVuZGVyLmJhdHRsZXJFbnRpdGllc1tlSWRdO1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIk1vdmUgZmFpbFwiKTtcclxuICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKDAuMmYpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgIGJhdHRsZVJlbmRlci5CYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKG1vdmVyLlBvc2l0aW9uVjJEKSxcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3NGKSkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaGFuZGxlcnMuQWRkKG5ldyBIYXBwSGFuZGxlcihtb3ZlTWlzcywgTW92ZURhdGFUYWdzLk1vdmVtZW50KSk7XHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChuZXcgSGFwcEhhbmRsZXIoKGUpPT4gXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBoYSA9IGUuR2V0Q29tcG9uZW50PEhhcHBBcmVhPigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhtZCA9IGUuR2V0Q29tcG9uZW50PEhhcHBNb3ZlRGF0YT4oKTtcclxuICAgICAgICAgICAgICAgIGludCBlSWQgPSBobWQudXNlcjtcclxuICAgICAgICAgICAgICAgIHZhciBtb3ZlciA9IGJhdHRsZU1haW4uZW50aXRpZXNbZUlkXTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIHVzZXJSZW5kZXIgPSBiYXR0bGVSZW5kZXIuYmF0dGxlckVudGl0aWVzW2VJZF07XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJlYSA9IGhhLmFyZWE7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9pbnRzID0gYXJlYS5wb2ludHM7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHVzZUVmZmVjdCA9IHdvcmxkLkdldFRlbXBFbnRpdHkoMSwgMSk7XHJcbiAgICAgICAgICAgICAgICB1c2VFZmZlY3QuU2V0UG9zaXRpb24oYmF0dGxlUmVuZGVyLkJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24obW92ZXIucG9zKSk7XHJcbiAgICAgICAgICAgICAgICBibGlua0FuaW0uQWRkKHVzZUVmZmVjdC5BbmltQmFzZSgwLjVmKSwgQmxpbmtBbmltLkJsaW5rRGF0YS5CYWNrQ29sb3IoMiwgMC4xNWYpKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIHBvaW50cylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW50aXR5ID0gd29ybGQuR2V0VGVtcEVudGl0eSgxLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaW5hbFBvcyA9IGl0ZW0qbmV3IFZlY3RvcjJEKGhhLm1pcnJvcmluZ1gsMSkgKyBoYS5vZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsUG9zLlggPCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWxQb3MuWSA8IDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbFBvcy5YID4gNSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsUG9zLlkgPiAyKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoZmluYWxQb3MuWEludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKGZpbmFsUG9zLllJbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBiYXR0bGVSZW5kZXIuQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihmaW5hbFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5LlNldFBvc2l0aW9uKHBvcy5YSW50LCBwb3MuWUludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxpbmtBbmltLkFkZChlbnRpdHkuQW5pbUJhc2UoMC41ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQmFja0NvbG9yKDIsIDAuMTVmKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIE1vdmVEYXRhVGFncy5Cb21iKSk7XHJcblxyXG4gICAgICAgICAgICBIYW5kbGUgPSAoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFIVwiKTtcclxuICAgICAgICAgICAgICAgIGZsb2F0IG5ld0hpZ2hlc3RIYW5kbGVkID0gaGlnaGVzdEhhbmRsZWQ7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGhhcHBzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWdzID0gaGFwcHMuQ29tcDEoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwID4gaGlnaGVzdEhhbmRsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdIaWdoZXN0SGFuZGxlZCA9IGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiSEFORExFIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGhhbiBpbiBoYW5kbGVycylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkhBTkRMRSF4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbi5DYW5IYW5kbGUodGFncy50YWdzKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKGhhcHBzLkNvbXAyKGkpLlRpbWVTbmFwICsgXCIgLSBcIiArIHRpbWUuQ3VycmVudFNuYXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJIQU5ETEUhMlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW4uSGFuZGxlcihoYXBwcy5FbnRpdHkoaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoaGFwcHMuQ29tcDIoaSkuVGltZVNuYXArXCIgLSBcIisgdGltZS5DdXJyZW50U25hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaGlnaGVzdEhhbmRsZWQgPSBuZXdIaWdoZXN0SGFuZGxlZDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgSGFwcEhhbmRsZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludGVybmFsIExpc3Q8aW50PiBuZWNlc3NhcnlUYWdzID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBBY3Rpb248RW50aXR5PiBIYW5kbGVyO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEhhcHBIYW5kbGVyKEFjdGlvbjxFbnRpdHk+IGhhbmRsZXIsIHBhcmFtcyBvYmplY3RbXSB0YWdzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdCBpbiB0YWdzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5lY2Vzc2FyeVRhZ3MuQWRkKENvbnZlcnQuVG9JbnQzMih0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLkhhbmRsZXIgPSBoYW5kbGVyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnRlcm5hbCBib29sIENhbkhhbmRsZShMaXN0PGludD4gdGFncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbmVjZXNzYXJ5VGFncylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRhZ3MuQ29udGFpbnMoaXRlbSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkJhc2VVdGlscztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmF0dGxlUmVuZGVyIDogSVRleHRTY3JlZW5fXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBCYXR0bGVNYWluIHR1cm5CYXNlVHJ5O1xyXG4gICAgICAgIHByaXZhdGUgUG9zaXRpb25BbmltYXRpb24gcG9zQW5pbTtcclxuICAgICAgICBwdWJsaWMgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBUZXh0Qm9hcmQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIGludCBpbnB1dDtcclxuICAgICAgICBwdWJsaWMgaW50IElucHV0IHsgZ2V0IHsgcmV0dXJuIGlucHV0OyB9IHNldCB7IGlucHV0ID0gdmFsdWU7IC8vQ29uc29sZS5Xcml0ZUxpbmUodmFsdWUpO1xyXG4gICAgICAgICAgICB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHBIYW5kbGluZyBIYXBwSGFuZGxpbmcgeyBnZXQ7IGludGVybmFsIHNldDsgfVxyXG5cclxuICAgICAgICAvL3B1YmxpYyBMaXN0PERlbGF5ZWRBY3Rpb25zPiB0YXNrcyA9IG5ldyBMaXN0PERlbGF5ZWRBY3Rpb25zPigpO1xyXG4gICAgICAgIERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+IG1vdmVDaGFycztcclxuICAgICAgICBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPiBtb3ZlRGVzY3JpcHRpb25zID0gbmV3IERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+KCk7XHJcbiAgICAgICAgRGljdGlvbmFyeTxNaXNjQmF0dGxlSW5wdXQsIHN0cmluZz4gbWlzY0Rlc2NyaXB0aW9ucyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PE1pc2NCYXR0bGVJbnB1dCwgc3RyaW5nPigpLChfbzEpPT57X28xLkFkZChNaXNjQmF0dGxlSW5wdXQuRG9uZSxcIkRvbmVcIik7X28xLkFkZChNaXNjQmF0dGxlSW5wdXQuUmVkbyxcIlJlZG9cIik7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICBwcml2YXRlIERpY3Rpb25hcnk8SW5wdXQsIHN0cmluZz4gbW92ZUJ1dHRvbnM7XHJcbiAgICAgICAgcHJpdmF0ZSBEaWN0aW9uYXJ5PElucHV0LCBJbnB1dEtleT4gbW92ZUtleXM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBkZWJ1Z09uID0gdHJ1ZTtcclxuICAgICAgICBwcml2YXRlIGludCBncmlkU2NhbGU7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZ3JpZE9mZnNldHg7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZ3JpZE9mZnNldHk7XHJcbiAgICAgICAgaW50ZXJuYWwgVGV4dEVudGl0eVtdIGJhdHRsZXJFbnRpdGllcztcclxuXHJcbiAgICAgICAgY2hhcltdW10gZW50aXRpZXNDaGFycztcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVSZW5kZXIoQmF0dGxlTWFpbiBiYXR0bGVMb2dpYylcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBzdHJpbmdbXSBlbnRpdHlUZXh0cyA9IHsgXCJAXCIsIFwiJlwiLCBcIiVcIiwgXCIkXCIsIFwiWDJcIiwgXCJYM1wiIH07XHJcbiAgICAgICAgICAgIGVudGl0aWVzQ2hhcnMgPSBuZXcgY2hhcltlbnRpdHlUZXh0cy5MZW5ndGhdW107XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZW50aXR5VGV4dHMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVudGl0aWVzQ2hhcnNbaV0gPSBlbnRpdHlUZXh0c1tpXS5Ub0NoYXJBcnJheSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0dXJuQmFzZVRyeSA9IGJhdHRsZUxvZ2ljO1xyXG5cclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICBwb3NBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLlBvc2l0aW9uQW5pbWF0aW9uPihuZXcgUG9zaXRpb25BbmltYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5Jbml0KDcwLCAyNSk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZCA9IHRleHRXb3JsZC5tYWluQm9hcmQ7XHJcbiAgICAgICAgICAgIC8vVGV4dEJvYXJkID0gbmV3IFRleHRCb2FyZCg3MCwgMjUpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgcG9zQW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb24obmV3IFBvc2l0aW9uQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICB2YXIgYmxpbmtBbmltID0gdGV4dFdvcmxkLkFkZEFuaW1hdGlvbjxnbG9iYWw6OlBpZHJvaC5UZXh0UmVuZGVyaW5nLkJsaW5rQW5pbT4obmV3IEJsaW5rQW5pbSgpKTtcclxuXHJcbiAgICAgICAgICAgIGJhdHRsZXJFbnRpdGllcyA9IG5ldyBUZXh0RW50aXR5W3R1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50XTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBiYXR0bGVyRW50aXRpZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhdHRsZXJFbnRpdGllc1tpXSA9IHRleHRXb3JsZC5HZXRGcmVlRW50aXR5KDIsIDIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0dXJuQmFzZVRyeS5oYXBwTWFuYWdlci5BZGRIYW5kbGVyKG5ldyBIYXBwcy5IYXBwSGFuZGxlcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5IYXBwVGFnLkF0dGFja0hpdCwgKGgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlciA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2guR2V0QXR0cmlidXRlX0ludCgxKV07XHJcbiAgICAgICAgICAgICAgICBpbnQgZGVmZW5kZXJFSUQgPSBoLkdldEF0dHJpYnV0ZV9JbnQoMCk7XHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZGVmZW5kZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmVuZGVyRUlEID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZW5kZXIgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1tkZWZlbmRlckVJRF07XHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQgPSAoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCloLkdldEF0dHJpYnV0ZV9JbnQoMik7XHJcbiAgICAgICAgICAgICAgICBUZXh0RW50aXR5IGZlID0gR2V0UHJvalRleHRFbnRpdHkoZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmVuZGVyICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGF0dGFja2VyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MyID0gZGVmZW5kZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhEaXMgPSBNYXRoLkFicyhwb3MuWCAtIHBvczIuWCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQgdGltZSA9IChmbG9hdCl4RGlzICogMC4xZjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoZmUuQW5pbUJhc2UodGltZSksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oYXR0YWNrZXIuUG9zaXRpb25WMkQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGRlZmVuZGVyLlBvc2l0aW9uVjJEKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBhdHRhY2tlci5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zMiA9IHBvcztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZXIuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvczIuWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zMi5YID0gNjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgeERpcyA9IE1hdGguQWJzKHBvcy5YIC0gcG9zMi5YKTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCB0aW1lID0gKGZsb2F0KXhEaXMgKiAwLjFmO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKHRpbWUpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvcyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zMikpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICB0dXJuQmFzZVRyeS5oYXBwTWFuYWdlci5BZGRIYW5kbGVyKG5ldyBIYXBwcy5IYXBwSGFuZGxlcihCYXR0bGVNYWluLkhhcHBUYWcuRGFtYWdlVGFrZW4sIChoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmZW5kZXIgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1toLkdldEF0dHJpYnV0ZV9JbnQoMCldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZlID0gdGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoMSwgMSk7XHJcbiAgICAgICAgICAgICAgICBmZS5PcmlnaW4uRHJhd0NoYXIoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBmZS5PcmlnaW4uUG9zaXRpb24gPSBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGRlZmVuZGVyLlBvc2l0aW9uVjJEKTtcclxuICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoZmUuQW5pbUJhc2UoMC41ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQ2hhcignICcsIDAuMWYpKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdHVybkJhc2VUcnkuaGFwcE1hbmFnZXIuQWRkSGFuZGxlcihuZXcgSGFwcHMuSGFwcEhhbmRsZXIoQmF0dGxlTWFpbi5IYXBwVGFnLkF0dGFja01pc3MsIChoKSA9PlxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VyID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaC5HZXRBdHRyaWJ1dGVfSW50KDApXTtcclxuICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50KWguR2V0QXR0cmlidXRlX0ludCgxKTtcclxuICAgICAgICAgICAgICAgIFRleHRFbnRpdHkgZmUgPSBHZXRQcm9qVGV4dEVudGl0eShlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBhdHRhY2tlci5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MyID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VyLlR5cGUgPT0gQmF0dGxlTWFpbi5FbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAgICAgIHBvczIuWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHBvczIuWCA9IDY7XHJcbiAgICAgICAgICAgICAgICB2YXIgeERpcyA9IE1hdGguQWJzKHBvcy5YIC0gcG9zMi5YKTtcclxuICAgICAgICAgICAgICAgIGZsb2F0IHRpbWUgPSAoZmxvYXQpeERpcyAqIDAuMWY7XHJcbiAgICAgICAgICAgICAgICBwb3NBbmltLkFkZChmZS5BbmltQmFzZSh0aW1lKSwgbmV3IFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YShcclxuICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvcyksXHJcbiAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3MyKSkpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAvL3R1cm5CYXNlVHJ5LmhhcHBNYW5hZ2VyLkFkZEhhbmRsZXIobmV3IEhhcHBzLkhhcHBIYW5kbGVyKEJhdHRsZU1haW4uSGFwcFRhZy5Nb3ZlbWVudEZhaWwsIChoKSA9PlxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgaW50IGVJZCA9IGguR2V0QXR0cmlidXRlX0ludCgwKTtcclxuICAgICAgICAgICAgLy8gICAgdmFyIG1vdmVyID0gdHVybkJhc2VUcnkuZW50aXRpZXNbZUlkXTtcclxuICAgICAgICAgICAgLy8gICAgdmFyIHggPSBoLkdldEF0dHJpYnV0ZV9JbnQoMSk7XHJcbiAgICAgICAgICAgIC8vICAgIHZhciB5ID0gaC5HZXRBdHRyaWJ1dGVfSW50KDIpO1xyXG4gICAgICAgICAgICAvLyAgICB2YXIgcG9zID0gbW92ZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgIC8vICAgIHZhciBwb3MyID0gbmV3IEJhc2VVdGlscy5WZWN0b3IyRCgoZmxvYXQpeCwgKGZsb2F0KXkpO1xyXG4gICAgICAgICAgICAvLyAgICB2YXIgcG9zRiA9IChwb3MgKyBwb3MyKSAvIDI7XHJcblxyXG4gICAgICAgICAgICAvLyAgICB2YXIgZmUgPSBiYXR0bGVyRW50aXRpZXNbZUlkXTtcclxuICAgICAgICAgICAgLy8gICAgLy9Db25zb2xlLldyaXRlTGluZShcIk1vdmUgZmFpbFwiKTtcclxuICAgICAgICAgICAgLy8gICAgcG9zQW5pbS5BZGQoZmUuQW5pbUJhc2UoMC4yZiksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoXHJcbiAgICAgICAgICAgIC8vICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKG1vdmVyLlBvc2l0aW9uVjJEKSxcclxuICAgICAgICAgICAgLy8gICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zRikpKTtcclxuICAgICAgICAgICAgLy99KSk7XHJcblxyXG4gICAgICAgICAgICBtb3ZlQ2hhcnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxvYmplY3QsIHN0cmluZz4oKSwoX28yKT0+e19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlLFwiRlwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlLFwiSVwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuVGh1bmRlcixcIlRcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk5vcm1hbFNob3QsXCJHXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQsXCI+XCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXAsXCJeXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93bixcInZcIik7X28yLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0LFwiPFwiKTtfbzIuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlQm9tYixcIklCXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyQm9tYixcIlRCXCIpO19vMi5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Eb05vdGhpbmcsXCIgXCIpO3JldHVybiBfbzI7fSk7XHJcblxyXG4gICAgICAgICAgICBtb3ZlRGVzY3JpcHRpb25zID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+KCksKF9vMyk9PntfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuSWNlLFwiSWNlIFNob3RcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkZpcmUsXCJGaXJlIFNob3RcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIsXCJUaHVuZGVyIFNob3RcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIsXCJJY2UgQm9tYlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTm9ybWFsU2hvdCxcIkd1blwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVJpZ2h0LFwiPlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZVVwLFwiXlwiKTtfbzMuQWRkKEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZURvd24sXCJ2XCIpO19vMy5BZGQoQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlTGVmdCxcIjxcIik7X28zLkFkZChCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXJCb21iLFwiVGh1bmRlciBCb21iXCIpO3JldHVybiBfbzM7fSk7XHJcblxyXG4gICAgICAgICAgICBtb3ZlQnV0dG9ucyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PElucHV0LCBzdHJpbmc+KCksKF9vNCk9PntfbzQuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Ob3JtYWxTaG90KSxcImdcIik7X280LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuRmlyZSksXCJmXCIpO19vNC5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLkljZSksXCJpXCIpO19vNC5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLkljZUJvbWIpLFwiYlwiKTtfbzQuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5UaHVuZGVyQm9tYiksXCJ5XCIpO19vNC5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIpLFwidFwiKTtfbzQuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQpLFwiZFwiKTtfbzQuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXApLFwid1wiKTtfbzQuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93biksXCJzXCIpO19vNC5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLk1vdmVMZWZ0KSxcImFcIik7X280LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5Eb25lKSxcIlNwYWNlXCIpO19vNC5BZGQobmV3IElucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuUmVkbyksXCJyXCIpO3JldHVybiBfbzQ7fSk7XHJcblxyXG4gICAgICAgICAgICBtb3ZlS2V5cyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PElucHV0LCBJbnB1dEtleT4oKSwoX281KT0+e19vNS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLlRodW5kZXIpLElucHV0S2V5LlRIVU5ERVIpO19vNS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBCYXR0bGVNYWluLk1vdmVUeXBlLkljZSksSW5wdXRLZXkuSUNFKTtfbzUuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5GaXJlKSxJbnB1dEtleS5GSVJFKTtfbzUuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Ob3JtYWxTaG90KSxJbnB1dEtleS5OT1JNQUxTSE9UKTtfbzUuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlUmlnaHQpLElucHV0S2V5LlJJR0hUKTtfbzUuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlVXApLElucHV0S2V5LlVQKTtfbzUuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgQmF0dGxlTWFpbi5Nb3ZlVHlwZS5Nb3ZlRG93biksSW5wdXRLZXkuRE9XTik7X281LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIEJhdHRsZU1haW4uTW92ZVR5cGUuTW92ZUxlZnQpLElucHV0S2V5LkxFRlQpO19vNS5BZGQobmV3IElucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuRG9uZSksSW5wdXRLZXkuRE9ORSk7X281LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5SZWRvKSxJbnB1dEtleS5SRURPKTtyZXR1cm4gX281O30pO1xyXG5cclxuICAgICAgICAgICAgLy9Db25zb2xlLlJlYWRMaW5lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFRleHRFbnRpdHkgR2V0UHJvalRleHRFbnRpdHkoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZlID0gdGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoMSwgMSk7XHJcbiAgICAgICAgICAgIGZlLk9yaWdpbi5EcmF3Q2hhcihUZXh0Qm9hcmQuSU5WSVNJQkxFQ0hBUiwgMCwgMCk7XHJcbiAgICAgICAgICAgIGludCBlbGVtZW50Q29sb3IgPSBFbGVtZW50VG9Qcm9qQ29sb3IoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGZlLk9yaWdpbi5TZXRCYWNrQ29sb3IoZWxlbWVudENvbG9yLCAwLCAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBJbnB1dEtleSBpbnB1dCA9IChJbnB1dEtleSlJbnB1dDtcclxuICAgICAgICAgICAgLy9pZiAoaW5wdXQgIT0gSW5wdXRLZXkuTk9ORSkgQ29uc29sZS5Xcml0ZUxpbmUoaW5wdXQpO1xyXG4gICAgICAgICAgICAvL2ludCBpbnB1dE51bWJlciA9IGlucHV0IC0gJzAnO1xyXG4gICAgICAgICAgICAvL2lmIChkZWJ1Z09uICYmIGlucHV0ID09ICdrJylcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIERlYnVnRXh0cmEuRGVidWdFeC5TaG93KCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBpZiAodGV4dFdvcmxkLklzRG9uZSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlTWFpbi5CYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlRpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkhhbmRSZWNoYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZU1haW4uQmF0dGxlUGhhc2UuUGlja0hhbmRzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBtb3ZlS2V5cylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uVmFsdWUgPT0gaW5wdXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LklucHV0RG9uZShpdGVtLktleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1N5c3RlbS5UaHJlYWRpbmcuVGhyZWFkLlNsZWVwKDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlRpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBEcmF3R3JhcGhpY3MoZGVsdGEpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdHcmFwaGljcyhmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR1cm5CYXNlVHJ5LlVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgICAgIC8vY2xlYXIgZ3JpZFxyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuUmVzZXQoKTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRTY2FsZSA9IDQ7XHJcbiAgICAgICAgICAgIGdyaWRPZmZzZXR4ID0gMjtcclxuICAgICAgICAgICAgZ3JpZE9mZnNldHkgPSAxO1xyXG4gICAgICAgICAgICBpbnQgZW5lbXlHcmlkT2ZmWCA9IGdyaWRTY2FsZSAqIDM7XHJcbiAgICAgICAgICAgIGJvb2wgZHJhd0RvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IDMgKiBncmlkU2NhbGU7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCAzICogZ3JpZFNjYWxlOyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRyYXdEb3QpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0NoYXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZE9mZnNldHggKyBpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkT2Zmc2V0eSArIGosIENvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3Q2hhcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRPZmZzZXR4ICsgaSArIGVuZW15R3JpZE9mZlgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkT2Zmc2V0eSArIGosIENvbG9ycy5HcmlkRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSAlIGdyaWRTY2FsZSA9PSAwICYmIGogJSBncmlkU2NhbGUgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0dyaWQoaSArIGdyaWRPZmZzZXR4ICsgZW5lbXlHcmlkT2ZmWCwgaiArIGdyaWRPZmZzZXR5LCBncmlkU2NhbGUgKyAxLCBncmlkU2NhbGUgKyAxLCBDb2xvcnMuR3JpZEVuZW15KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdHcmlkKGkgKyBncmlkT2Zmc2V0eCwgaiArIGdyaWRPZmZzZXR5LCBncmlkU2NhbGUgKyAxLCBncmlkU2NhbGUgKyAxLCBDb2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2ZvciAoaW50IGkgPSAwOyBpIDwgNjsgaSsrKVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgZm9yIChpbnQgaiA9IDA7IGogPCAzOyBqKyspXHJcbiAgICAgICAgICAgIC8vICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIFRleHRCb2FyZC5EcmF3Q2hhcihcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAnICcsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaSAqIHNjYWxlICsgc2NhbGUgLyAyLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIDIgKiBzY2FsZSAtIGogKiBzY2FsZSArIHNjYWxlIC8gMik7XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vIERyYXdNb3ZlIGVudGl0eVxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBnYW1lRW50aXR5ID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVjID0gR2V0Q2hhcihnYW1lRW50aXR5KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9pZiAoZ2FtZUVudGl0eS5EZWFkKVxyXG4gICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAvLyAgICBmb3IgKGludCBqID0gMDsgaiA8IGVjLkxlbmd0aDsgaisrKVxyXG4gICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGVjW2pdID0gVGV4dEJvYXJkLklOVklTSUJMRUNIQVI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBnYW1lRW50aXR5LlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgQmFzZVV0aWxzLlZlY3RvcjJEIHNjcmVlblBvcyA9IEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oKEJhc2VVdGlscy5WZWN0b3IyRClwb3MpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuVHlwZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbnRpdHlUeXBlLnBhbmVsZWZmZWN0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlblBvcy5ZID0gc2NyZWVuUG9zLlkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlblBvcy5YID0gc2NyZWVuUG9zLlggLSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9iYXR0bGVyRW50aXRpZXNbaV0ub3JpZ2luLlBvc2l0aW9uID0gc2NyZWVuUG9zO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhdHRsZXJFbnRpdGllc1tpXS5PcmlnaW4uUG9zaXRpb24gIT0gc2NyZWVuUG9zICYmIHRleHRXb3JsZC5Jc0RvbmUoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NBbmltLkFkZChiYXR0bGVyRW50aXRpZXNbaV0uQW5pbUJhc2UoMC4xNWYpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKGJhdHRsZXJFbnRpdGllc1tpXS5PcmlnaW4uUG9zaXRpb24sIHNjcmVlblBvcywgdHJ1ZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjID0gQ29sb3JzLkhlcm87XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5UeXBlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpIGMgPSBDb2xvcnMuRW5lbXk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5UeXBlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVudGl0eVR5cGUucGlja3VwKSBjID0gQ29sb3JzLmlucHV0S2V5O1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuRGVhZClcclxuICAgICAgICAgICAgICAgICAgICBjID0gVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SO1xyXG4gICAgICAgICAgICAgICAgaW50IGJjID0gVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LkFsaXZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQgZWxlbWVudCA9IGdhbWVFbnRpdHkuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBiYyA9IEVsZW1lbnRUb0F1cmFDb2xvcihlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LkRlYWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBlYy5MZW5ndGgrMTsgaisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlckVudGl0aWVzW2ldLk9yaWdpbi5EcmF3Q2hhcignICcsIGosIDAsIGMsIGJjKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVyRW50aXRpZXNbaV0uT3JpZ2luLkRyYXcoZWMsIDAsIDAsIGMsIGJjKTtcclxuICAgICAgICAgICAgICAgICAgICBiYXR0bGVyRW50aXRpZXNbaV0uT3JpZ2luLkRyYXdPbmVEaWdpdChnYW1lRW50aXR5LmdyYXBoaWNSZXBlYXRlZEluZGV4KzEsIDArZWMuTGVuZ3RoLCAwLCBjLCBiYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAvL2JhdHRsZXJFbnRpdGllc1tpXS5vcmlnaW4uU2V0Q29sb3IoYywgMCwgMCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3Q2hhcihcclxuICAgICAgICAgICAgICAgIC8vICAgIGVjLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgeDEsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB5MSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpbnQgdGV4dEJvYXJkSGVpZ2h0ID0gMyAqIGdyaWRTY2FsZTtcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCB5ID0gMjtcclxuICAgICAgICAgICAgICAgIGludCB4ID0gNiAqIGdyaWRTY2FsZSArIDI2O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBEcmF3Q29udHJvbHMoeSwgeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LnRpbWVUb0Nob29zZSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdCByYXRpbyA9IHR1cm5CYXNlVHJ5LnRpbWVUb0Nob29zZSAvIHR1cm5CYXNlVHJ5LnRpbWVUb0Nob29zZU1heDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdSZXBlYXRlZCgnICcsIHgsIHkrMTYsIChpbnQpKHJhdGlvKjE1KSwgMSwgQ29sb3JzLkJvYXJkLCBDb2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1JlcGVhdGVkKCcgJywgeCAtIDEsIHkgLSAxLCAxNSwgMTUsIENvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGludCB0dXJuT3JkZXJYID0gNiAqIGdyaWRTY2FsZSArIDEwO1xyXG4gICAgICAgICAgICBpbnQgdHVybk9yZGVyWSA9IDI7XHJcblxyXG4gICAgICAgICAgICBEcmF3VHVybk9yZGVyKHR1cm5PcmRlclgsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBEcmF3TGlmZSgzLCAxNik7XHJcblxyXG5cclxuICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoMSk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5DdXJzb3JOZXdMaW5lKDEpO1xyXG4gICAgICAgICAgICAvL3RleHRCb2FyZC5EcmF3X0N1cnNvcih0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZS5Ub1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5EcmF3Q2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkFkdmFuY2VUaW1lKGRlbHRhKTtcclxuICAgICAgICAgICAgaWYgKHRleHRXb3JsZC5Jc0RvbmUoKSkge1xyXG4gICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuaGFwcE1hbmFnZXIuVHJ5SGFuZGxlKCk7XHJcbiAgICAgICAgICAgICAgICBIYXBwSGFuZGxpbmcuSGFuZGxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IEVsZW1lbnRUb0F1cmFDb2xvcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgYmMgPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1I7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuRmlyZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuRmlyZUF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5JY2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLkljZUF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5UaHVuZGVyQXVyYTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGJjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IEVsZW1lbnRUb1Byb2pDb2xvcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5FbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgYmMgPSBDb2xvcnMuaW5wdXRLZXk7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuRmlyZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuRmlyZVNob3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5JY2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLkljZUF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5UaHVuZGVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5UaHVuZGVyQXVyYTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGJjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oQmFzZVV0aWxzLlZlY3RvcjJEIHBvcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gcG9zLlg7XHJcbiAgICAgICAgICAgIHZhciB5ID0gcG9zLlk7XHJcbiAgICAgICAgICAgIHZhciBzY3JlZW5Qb3MgPSBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKHggKiBncmlkU2NhbGUgKyBncmlkU2NhbGUgLyAyICsgZ3JpZE9mZnNldHgsIDIgKiBncmlkU2NhbGUgLSB5ICogZ3JpZFNjYWxlICsgZ3JpZFNjYWxlIC8gMiArIGdyaWRPZmZzZXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHNjcmVlblBvcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3Q29udHJvbHMoaW50IHksIGludCB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdHcmlkKHggLSAyLCB5IC0gMSwgMjAsIDE1LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuU2V0Q3Vyc29yQXQoeCwgeSk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihcIkNvbnRyb2xzXCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmlucHV0cy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgeDIgPSB4ICsgMTtcclxuICAgICAgICAgICAgICAgIGludCB5MiA9IHkgKyAyICsgaTtcclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHR1cm5CYXNlVHJ5LmlucHV0c1tpXTtcclxuICAgICAgICAgICAgICAgIHN0cmluZyBidXR0b25OYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vdmVCdXR0b25zLlRyeUdldFZhbHVlKGlucHV0LCBvdXQgYnV0dG9uTmFtZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uTmFtZSA9IFwiVU5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpbnQgbGVuZ3RoQm5hbWUgPSBidXR0b25OYW1lLkxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0NoYXIoJ1snLCB4MiAtIDEsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdDaGFyKCddJywgeDIgKyBsZW5ndGhCbmFtZSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UdXJuQmFzZVRyeVZhbHVlcy5Nb3ZlVHlwZSBtb3ZlID0gdHVybkJhc2VUcnkucGxheWVySGFuZFtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhidXR0b25OYW1lLCB4MiwgeTIsIENvbG9ycy5pbnB1dEtleSk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgZGVzY3JpcHRpb24gPSBzdHJpbmcuRW1wdHk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTW92ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5Nb3ZlVHlwZSBtID0gKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLk1vdmVUeXBlKWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZURlc2NyaXB0aW9ucy5UcnlHZXRWYWx1ZShtLCBvdXQgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXNjcmlwdGlvbiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBtLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09IElucHV0VHlwZS5NaXNjQmF0dGxlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE1pc2NCYXR0bGVJbnB1dCBhcmcxID0gKE1pc2NCYXR0bGVJbnB1dClpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gbWlzY0Rlc2NyaXB0aW9uc1thcmcxXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3KGRlc2NyaXB0aW9uLCB4MiArIDIgKyBsZW5ndGhCbmFtZSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBjID0gbW92ZUNoYXJzW21vdmVdO1xyXG4gICAgICAgICAgICAgICAgLy9EcmF3TW92ZShtb3ZlLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhdyhjLCB4MiArIDMsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd1dpdGhHcmlkKGMrXCJcIiwgeDIsIHkgKyAyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRHJhd0xpZmUoaW50IHR1cm5PcmRlclgsIGludCB0dXJuT3JkZXJZKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdHcmlkKHR1cm5PcmRlclggLSAxLCB0dXJuT3JkZXJZIC0gMSwgMjAsIDksIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh0dXJuT3JkZXJYKzEsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJMaWZlXCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh0dXJuT3JkZXJYKzgsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJFbGVtZW50XCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcbiAgICAgICAgICAgIGludCBpbmRleCA9IC0xOyAvL3VzaW5nIHRoaXMgYmVjYXVzZSBub3QgYWxsIHVuaXRzIGdldCBkcmF3blxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLkJhdHRsZUVudGl0eSBlID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlLmRyYXdMaWZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4LS07XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuRGVhZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3IgPSBDb2xvcnMuSGVyb1R1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBCYXR0bGVNYWluLkVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IENvbG9ycy5FbmVteVR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdPbmVEaWdpdF9DdXJzb3IoKGludCllLmxpZmUuVmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeE9mZiA9IHR1cm5PcmRlclgrMTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeU9mZiA9IHR1cm5PcmRlclkgKyAyICsgaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgRHJhd0VudGl0eUNoYXIoZSwgY29sb3IsIHhPZmYsIHlPZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKEdldENoYXIoZSksIHhPZmYsIHR1cm5PcmRlclkgKyAyLCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdPbmVEaWdpdCgoaW50KWUubGlmZSwgeE9mZiArIDMsIHlPZmYsIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgZWxlbWVudCA9IHN0cmluZy5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGUuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5GaXJlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IFwiRmlyZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZU1haW4uRWxlbWVudC5JY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gXCJJY2VcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuVGh1bmRlcjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBcIlRodW5kZXJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVNYWluLkVsZW1lbnQuTm9uZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlQ29sb3IgPSBFbGVtZW50VG9BdXJhQ29sb3IoZS5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoZWxlbWVudCwgeE9mZiArNywgeU9mZiwgZUNvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3T25lRGlnaXRfQ3Vyc29yKChpbnQpZS5saWZlLlZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSh4OiAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdUdXJuT3JkZXIoaW50IHR1cm5PcmRlclgsIGludCB0dXJuT3JkZXJZKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmFsdWUgdHVybnNQZXJQaGFzZSA9IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2U7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3R3JpZCh0dXJuT3JkZXJYIC0gMSwgdHVybk9yZGVyWSAtIDEsIDE0LCA2ICsgdHVybnNQZXJQaGFzZSwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHR1cm5PcmRlclgsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJUdXJuIE9yZGVyXCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGUgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmICghZS5kcmF3VHVybilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghZS5EZWFkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGludCBjb2xvciA9IENvbG9ycy5IZXJvVHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEJhdHRsZU1haW4uRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gQ29sb3JzLkVuZW15VHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdPbmVEaWdpdF9DdXJzb3IoKGludCllLmxpZmUuVmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeE9mZiA9IHR1cm5PcmRlclggKyAxICsgaSAqIDM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGludCB5ID0gdHVybk9yZGVyWSArIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgRHJhd0VudGl0eUNoYXIoZSwgY29sb3IsIHhPZmYsIHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh4T2ZmLCB0dXJuT3JkZXJZICsgMyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkyID0gMDsgaTIgPCB0dXJuc1BlclBoYXNlOyBpMisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGNvbG9yMiA9IGNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgJiYgaTIgPT0gdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUudHVybiAmJiB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBCYXR0bGVNYWluLkJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjIgPSBDb2xvcnMuSGVybztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkyIDwgdHVybnNQZXJQaGFzZSAmJiBlLm1vdmVzW2kyXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgYyA9IEdldENoYXJPZk1vdmUoZSwgaTIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKGMsIGNvbG9yMik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd19DdXJzb3IoJyAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcignICcsIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSh4OiB4T2ZmKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoeDogMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3RW50aXR5Q2hhcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlTWFpbi5CYXR0bGVFbnRpdHkgZSwgaW50IGNvbG9yLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjaGFyW10gY2hhcnMgPSBHZXRDaGFyKGUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoY2hhcnMsIHgsIHksIGNvbG9yKTtcclxuICAgICAgICAgICAgLy9pZiAoZS5ncmFwaGljUmVwZWF0ZWRJbmRleCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3T25lRGlnaXQoZS5ncmFwaGljUmVwZWF0ZWRJbmRleCsxLCB4K2NoYXJzLkxlbmd0aCwgeSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0cmluZyBHZXRDaGFyT2ZNb3ZlKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGUsIGludCBpMilcclxuICAgICAgICB7XHJcblxyXG5cclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gZS5tb3Zlc1tpMl07XHJcbiAgICAgICAgICAgIGlmICh2YWwgPj0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiBtb3ZlQ2hhcnNbKEJhdHRsZU1haW4uTW92ZVR5cGUpdmFsXTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiIFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNoYXJbXSBHZXRDaGFyKEJhdHRsZU1haW4uQmF0dGxlRW50aXR5IGdhbWVFbnRpdHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZW50aXRpZXNDaGFyc1tnYW1lRW50aXR5LmdyYXBoaWNdO1xyXG4gICAgICAgICAgICAvL2NoYXIgZWMgPSAnQCc7XHJcbiAgICAgICAgICAgIC8vaWYgKGdhbWVFbnRpdHkuVHlwZSA9PSBUdXJuQmFzZVRyeVZhbHVlcy5FbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgaWYoZ2FtZUVudGl0eS5ncmFwaGljID09IDEpXHJcbiAgICAgICAgICAgIC8vICAgICAgICBlYyA9ICcmJztcclxuICAgICAgICAgICAgLy8gICAgaWYgKGdhbWVFbnRpdHkuZ3JhcGhpYyA9PSAyKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgZWMgPSAnJSc7XHJcbiAgICAgICAgICAgIC8vICAgIGlmIChnYW1lRW50aXR5LmdyYXBoaWMgPT0gMylcclxuICAgICAgICAgICAgLy8gICAgICAgIGVjID0gJyQnO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIC8vcmV0dXJuIGVjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdNb3ZlKFZhbHVlIG1vdmUsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChtb3ZlLlZhbCA+PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBCYXR0bGVNYWluLk1vdmVUeXBlIG0gPSAoQmF0dGxlTWFpbi5Nb3ZlVHlwZSltb3ZlLlZhbDtcclxuICAgICAgICAgICAgICAgIERyYXdNb3ZlKG0sIGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcignICcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdNb3ZlKEJhdHRsZU1haW4uTW92ZVR5cGUgbW92ZSwgaW50IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGMgPSBtb3ZlQ2hhcnNbbW92ZV07XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihjLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUZXh0Qm9hcmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGNsYXNzIENvbG9yc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBHcmlkSGVybyA9IDE7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgR3JpZEVuZW15ID0gMjtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBIZXJvID0gMztcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBFbmVteSA9IDQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgSGVyb1R1cm4gPSA1O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEVuZW15VHVybiA9IDY7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgaW5wdXRLZXkgPSA3O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEJvYXJkID0gODtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBXaW5kb3dMYWJlbCA9IDk7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgRmlyZUF1cmEgPSAxMDtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBJY2VBdXJhID0gMTE7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgVGh1bmRlckF1cmEgPSAxMjtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBGaXJlU2hvdCA9IDEzO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEljZVNob3QgPSAxNDtcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBUaHVuZGVyU2hvdCA9IDE1O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gSW5wdXRLZXlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5PTkUsIExFRlQsIFJJR0hULCBET1dOLCBVUCwgRklSRSwgUkVETywgRE9ORSxcclxuICAgICAgICAgICAgSUNFLFxyXG4gICAgICAgICAgICBUSFVOREVSLFxyXG4gICAgICAgICAgICBOT1JNQUxTSE9UXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgUGlkcm9oLkVDUztcclxudXNpbmcgUGlkcm9oLlRleHRSZW5kZXJpbmc7XHJcbnVzaW5nIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZztcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdhbWVNYWluIDogSVRleHRTY3JlZW5fXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBCYXR0bGVNYWluIGJhdHRsZU1haW47XHJcbiAgICAgICAgcHJpdmF0ZSBCYXR0bGVSZW5kZXIgYmF0dGxlUmVuZGVyO1xyXG4gICAgICAgIHByaXZhdGUgTW9kZVNlbGVjdGlvblNjcmVlbiBtb2RlU2VsZWN0aW9uU2NyZWVuO1xyXG4gICAgICAgIElUZXh0U2NyZWVuXyBtYWluRHJhdztcclxuICAgICAgICBwcml2YXRlIFJlc3VsdFNjcmVlbiByZXN1bHRTY3JlZW47XHJcbiAgICAgICAgLy9JVGV4dFNjcmVlbltdIHNjcmVlbnMgPSBuZXcgSVRleHRTY3JlZW5bNV07XHJcbiAgICAgICAgaW50IGRpZmZpY3VsdHk7XHJcbiAgICAgICAgaW50W10gZW5lbXlBbW91bnQgPSBuZXcgaW50W10gICB7IDEsIDEsIDIsIDEsIDIsIDMsIDIsIDMsIDEsIDIsIDMsIDMgfTtcclxuICAgICAgICBpbnRbXSB0dXJuQW1vdW50ID0gbmV3IGludFtdIHsgMiwgNCwgMiwgNiwgNCwgMiwgNiwgNCwgOCwgOCwgNiwgOCB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgR2FtZU1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZVNlbGVjdGlvblNjcmVlbiA9IG5ldyBNb2RlU2VsZWN0aW9uU2NyZWVuKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuLm1vZGUgPSAxO1xyXG4gICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuLndhbm5hTGVhdmUgPSAxO1xyXG4gICAgICAgICAgICBtYWluRHJhdyA9IG1vZGVTZWxlY3Rpb25TY3JlZW47XHJcbiAgICAgICAgICAgIC8vUmVzZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpbnQgbW9kZSA9IG1vZGVTZWxlY3Rpb25TY3JlZW4ubW9kZTtcclxuICAgICAgICAgICAgYm9vbCB0aW1lQXR0YWNrID0gbW9kZVNlbGVjdGlvblNjcmVlbi50aW1lQXR0YWNrO1xyXG5cclxuICAgICAgICAgICAgU3RhZ2VEYXRhQ3JlYXRvciBzZGMgPSBuZXcgU3RhZ2VEYXRhQ3JlYXRvcigpO1xyXG4gICAgICAgICAgICB2YXIgc3RhZ2VzID0gc2RjLnN0YWdlcztcclxuXHJcbiAgICAgICAgICAgIGludCBkID0gZGlmZmljdWx0eTtcclxuICAgICAgICAgICAgaWYgKHN0YWdlcy5Db3VudCA8PSBkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJhdyA9IG1vZGVTZWxlY3Rpb25TY3JlZW47XHJcbiAgICAgICAgICAgICAgICBtb2RlU2VsZWN0aW9uU2NyZWVuLlJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBkaWZmaWN1bHR5ID0gMDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2QgPSAyMDA7XHJcbiAgICAgICAgICAgIGlmIChkID49IGVuZW15QW1vdW50Lkxlbmd0aCkgZCA9IGVuZW15QW1vdW50Lkxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGludCBuRW5lbWllcyA9IGVuZW15QW1vdW50W2RdO1xyXG5cclxuICAgICAgICAgICAgQmF0dGxlU2V0dXAgYmF0dGxlU2V0dXAgPSBuZXcgQmF0dGxlU2V0dXAobW9kZSwgbmV3IEJhdHRsZUJhc2ljQ29uZmlnKG5UdXJuczogNSwgbkVuZW1pZXM6IG5FbmVtaWVzKSwgZGlmZmljdWx0eSwgc3RhZ2VzKTtcclxuICAgICAgICAgICAgYmF0dGxlTWFpbiA9IGJhdHRsZVNldHVwLmJhdHRsZU1haW47XHJcbiAgICAgICAgICAgIHZhciBlY3MgPSBiYXR0bGVTZXR1cC5lY3M7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9lY3MuQ3JlYXRlRW50aXR5V2l0aENvbXBvbmVudChuZXcgRW5lbXlTcGF3bkRhdGEoMCwgbmV3IEJhc2VVdGlscy5WZWN0b3IyRCg0LCAxKSkpO1xyXG4gICAgICAgICAgICAvL2Vjcy5DcmVhdGVFbnRpdHlXaXRoQ29tcG9uZW50KG5ldyBFbmVteVNwYXduRGF0YSgxLCBuZXcgQmFzZVV0aWxzLlZlY3RvcjJEKDUsIDEpKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgZmxvYXQgdGltZVRvQ2hvb3NlID0gLTE7XHJcbiAgICAgICAgICAgIGlmICh0aW1lQXR0YWNrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lVG9DaG9vc2UgPSAoNWYgKiB0dXJuQW1vdW50W2RdKSAqIG5FbmVtaWVzO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmF0dGxlTWFpbi50aW1lVG9DaG9vc2VNYXggPSB0aW1lVG9DaG9vc2U7XHJcbiAgICAgICAgICAgIGJhdHRsZU1haW4uSW5pdCgpO1xyXG4gICAgICAgICAgICBiYXR0bGVSZW5kZXIgPSBuZXcgQmF0dGxlUmVuZGVyKGJhdHRsZU1haW4pO1xyXG4gICAgICAgICAgICBuZXcgSGFwcEhhbmRsaW5nKGJhdHRsZVJlbmRlciwgYmF0dGxlU2V0dXApO1xyXG4gICAgICAgICAgICBtYWluRHJhdyA9IGJhdHRsZVJlbmRlcjtcclxuICAgICAgICAgICAgcmVzdWx0U2NyZWVuID0gbmV3IFJlc3VsdFNjcmVlbigpO1xyXG4gICAgICAgICAgICByZXN1bHRTY3JlZW4uYmF0dGxlUmVzdWx0ID0gYmF0dGxlTWFpbi5iYXR0bGVSZXN1bHQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dCB7IHNldCB7IG1haW5EcmF3LklucHV0ID0gdmFsdWU7IH0gZ2V0IHsgcmV0dXJuICdjJzsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1haW5EcmF3LkRyYXcoZik7XHJcbiAgICAgICAgICAgIGlmIChtYWluRHJhdyA9PSBiYXR0bGVSZW5kZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChiYXR0bGVNYWluLklzT3ZlcigpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXR0bGVNYWluLklzVmljdG9yeSgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmljdWx0eSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRTY3JlZW4uRW50ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYWluRHJhdyA9IHJlc3VsdFNjcmVlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWFpbkRyYXcgPT0gcmVzdWx0U2NyZWVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0U2NyZWVuLndhbm5hTGVhdmUgPT0gMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtYWluRHJhdyA9PSBtb2RlU2VsZWN0aW9uU2NyZWVuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9kZVNlbGVjdGlvblNjcmVlbi53YW5uYUxlYXZlID09IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQgR2V0Qm9hcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1haW5EcmF3LkdldEJvYXJkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBSZXN1bHRTY3JlZW4gOiBJVGV4dFNjcmVlbl9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcbiAgICAgICAgc3RyaW5nIHlvdVdpbiA9IFwiWW91IFdpblwiO1xyXG4gICAgICAgIHN0cmluZyB5b3VMb3NlID0gXCJZb3UgbG9zZVwiO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVSZXN1bHQgYmF0dGxlUmVzdWx0O1xyXG4gICAgICAgIHB1YmxpYyBSZXN1bHRTY3JlZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuSW5pdCg3MCwgMjUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IHdhbm5hTGVhdmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXQgeyBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFbnRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3YW5uYUxlYXZlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChJbnB1dCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0cmluZyBtZXNzYWdlID0geW91V2luO1xyXG4gICAgICAgICAgICBpZiAoYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAyKSBtZXNzYWdlID0geW91TG9zZTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIobWVzc2FnZSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuQm9hcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRlc3RHYW1lIDogSVRleHRHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFRleHRTY3JlZW5Ib2xkZXIgU2NyZWVuSG9sZGVyIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUGFsZXR0ZSBHZXRQYWxldHRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEZWZhdWx0UGFsZXR0ZXMuQzROb3ZlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dFNjcmVlbk4gc2NyZWVuID0gbmV3IFRlc3RTY3JlZW4oKTtcclxuICAgICAgICAgICAgU2NyZWVuSG9sZGVyLlNldEFsbChzY3JlZW4pO1xyXG4gICAgICAgICAgICBzY3JlZW4uSW5pdCh3LCBoKTtcclxuICAgICAgICAgICAgc2NyZWVuLkdldEJvYXJkKCkuRHJhdyhcIlRlc3RcIiwgMCwwLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBkZWx0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIFRleHRTY3JlZW5Ib2xkZXIgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1NjcmVlbkhvbGRlcj1uZXcgVGV4dFNjcmVlbkhvbGRlcigpO31cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGVzdFNjcmVlbiA6IFRleHRTY3JlZW5OXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKGZsb2F0IGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTW9kZVNlbGVjdGlvblNjcmVlbiA6IElUZXh0U2NyZWVuX1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuICAgICAgICBzdHJpbmcgeW91V2luID0gXCJZb3UgV2luXCI7XHJcbiAgICAgICAgc3RyaW5nIHlvdUxvc2UgPSBcIllvdSBsb3NlXCI7XHJcbiAgICAgICAgaW50IHNlbGVjdGlvbjtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlUmVzdWx0IGJhdHRsZVJlc3VsdDtcclxuICAgICAgICBwdWJsaWMgTW9kZVNlbGVjdGlvblNjcmVlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQgPSBuZXcgVGV4dFdvcmxkKCk7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5Jbml0KDcwLCAyNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgd2FubmFMZWF2ZTtcclxuICAgICAgICBwdWJsaWMgaW50IG1vZGU7XHJcbiAgICAgICAgcHVibGljIGJvb2wgdGltZUF0dGFjayA9IGZhbHNlO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgc2NyZWVuU3RhZ2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXQgeyBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFbnRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3YW5uYUxlYXZlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuUmVzZXQoKTtcclxuICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleSBpayA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5KSBJbnB1dDtcclxuICAgICAgICAgICAgbW9kZSA9IC0xO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXcoXCJQcm9nQmF0dGxlIFByb3RvdHlwZSB2MC4zXCIsIDEsIDEsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3KFwiQSBnYW1lIGJ5IFBpZHJvaFwiLCAxLCAyLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgIGlmIChzY3JlZW5TdGFnZSA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGlrKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuTEVGVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NyZWVuU3RhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5SSUdIVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NyZWVuU3RhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXR0YWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkRPV046XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVBdHRhY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LlVQOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUF0dGFjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3ddIFZhbmlsbGFcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDQsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIlthXSBFbGVtZW50YWxcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDUsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIltzXSBWYW5pbGxhIFRpbWUgQXR0YWNrXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA2LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbZF0gRWxlbWVudGFsIFRpbWUgQXR0YWNrXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA3LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzY3JlZW5TdGFnZSA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWsgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5VUClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpayA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkRPV04pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuU3RhZ2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJFbGVtZW50YWwgTW9kZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogLTUpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJGaXJlIGJlYXRzIEljZSwgSWNlIGJlYXRzIFRodW5kZXIsIFRodW5kZXIgYmVhdHMgZmlyZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogLTIpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJTYW1lIGVsZW1lbnQgPSBubyBkYW1hZ2VcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDApO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJJdCBpcyBiZXN0IHRvIGhhdmUgaGFkIHNvbWUgZXhwZXJpZW5jZSB3aXRoIHZhbmlsbGEgbW9kZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogMSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIlt3XSBTdGFydCBFbGVtZW50YWwgTW9kZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNCwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3NdIEdvIGJhY2tcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDUsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZSA+PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3YW5uYUxlYXZlID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy9zdHJpbmcgbWVzc2FnZSA9IHlvdVdpbjtcclxuICAgICAgICAgICAgLy9pZiAoYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAyKSBtZXNzYWdlID0geW91TG9zZTtcclxuICAgICAgICAgICAgLy90ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihtZXNzYWdlLCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlID0gLTE7XHJcbiAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UZXh0UmVuZGVyaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCbGlua0FuaW0gOiBUZXh0QW5pbWF0aW9uPEJsaW5rQW5pbS5CbGlua0RhdGE+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBCbGlua0RhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgZmxvYXQgYXV4ID0gcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIGJvb2wgYmxpbmsgPSB0cnVlO1xyXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJsaW5rKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eCAtPSBtYWluRGF0YS5ibGlua0FjdGl2ZVRpbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4IC09IG1haW5EYXRhLmJsaW5rSW5hY3RpdmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXV4IDwgMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBibGluayA9ICFibGluaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWJsaW5rKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbnRpdHkuQW5pbWF0aW9uLlNldEFsbChtYWluRGF0YS50ZXh0LCBtYWluRGF0YS50ZXh0Q29sb3IsIG1haW5EYXRhLmJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IEJsaW5rRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGNoYXIgdGV4dDtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGludCBiYWNrQ29sb3IsIHRleHRDb2xvcjtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGJsaW5rQWN0aXZlVGltZTtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGJsaW5rSW5hY3RpdmU7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQmxpbmtEYXRhKGNoYXIgdGV4dCwgaW50IGJhY2tDb2xvciwgaW50IHRleHRDb2xvciwgZmxvYXQgYmxpbmtBY3RpdmVUaW1lLCBmbG9hdCBibGlua0luYWN0aXZlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrQ29sb3IgPSBiYWNrQ29sb3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb2xvciA9IHRleHRDb2xvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxpbmtBY3RpdmVUaW1lID0gYmxpbmtBY3RpdmVUaW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ibGlua0luYWN0aXZlID0gYmxpbmtJbmFjdGl2ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0YXRpYyBCbGlua0RhdGEgQmFja0NvbG9yKGludCBiYWNrQ29sb3IsIGZsb2F0IGJsaW5rRHVyYXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmxpbmtEYXRhKFRleHRCb2FyZC5OT0NIQU5HRUNIQVIsIGJhY2tDb2xvciwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIGJsaW5rRHVyYXRpb24sIGJsaW5rRHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIEJsaW5rRGF0YSBDaGFyKGNoYXIgYywgZmxvYXQgYmxpbmtEdXJhdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCbGlua0RhdGEoYywgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIFRleHRCb2FyZC5OT0NIQU5HRUNPTE9SLCBibGlua0R1cmF0aW9uLCBibGlua0R1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENoYXJCeUNoYXJBbmltYXRpb24gOiBUZXh0QW5pbWF0aW9uPENoYXJCeUNoYXJBbmltYXRpb24uQ2hhckJ5Q2hhckRhdGE+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBDaGFyQnlDaGFyRGF0YSBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGEsIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICBmbG9hdCByYXRpbyA9IHByb2dyZXNzIC8gbGVuZ3RoO1xyXG4gICAgICAgICAgICBmbG9hdCBsZW5ndGhUZXh0ID0gbWFpbkRhdGEuY2hhckVuZCAtIG1haW5EYXRhLmNoYXJTdGFydDtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IG1haW5EYXRhLmNoYXJTdGFydDsgaSA8IG1haW5EYXRhLmNoYXJFbmQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IG9mZnNldGVkID0gaTtcclxuICAgICAgICAgICAgICAgIGludCBsaW5lID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciB0YiA9IGVudGl0eS5BbmltYXRpb247XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0ZWQgPj0gdGIuV2lkdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldGVkIC09IHRiLldpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPiAoKGxlbmd0aFRleHQgKiByYXRpbykgKyBtYWluRGF0YS5jaGFyU3RhcnQpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRiLkRyYXdDaGFyKCcgJywgb2Zmc2V0ZWQsIGxpbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGIuRHJhdyhcIlwiICsgaSwgNiwgNSwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIENoYXJCeUNoYXJEYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBpbnQgY2hhclN0YXJ0O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBpbnQgY2hhckVuZDtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBDaGFyQnlDaGFyRGF0YShpbnQgY2hhclN0YXJ0LCBpbnQgY2hhckVuZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFyU3RhcnQgPSBjaGFyU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJFbmQgPSBjaGFyRW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K
